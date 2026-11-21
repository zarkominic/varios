// Fontanería y decorados del episodio 45 (Victor von Doom: el villano que solo quería recuperar a su madre), con el canon
// del 43 (relato hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate» en gris azulado), al nivel de
// episodios/ESTANDAR.md: el detalle de siempre. Reutiliza F el estudio de las pausas del 43 (hm-comun.js) y el cine del
// 33 (du-comun.js: salas), y añade: A Latveria (latveria), B la universidad (universidad), C el Tíbet (tibet), D el
// reino de Mefisto (infierno) y E Battleworld (battleworld).
// DERECHOS: NADA de las películas ni de los cómics (ni viñetas, ni dibujos, ni logotipos, ni arquitectura reconocible):
// todo es NUESTRO, a partir de lo que cuenta la historia. Sin letras (solo números y símbolos). Personajes: ELENCO_VD y
// los de Marvel de ELENCO_CHIBI (doom, reed, sue, johnny, cosa, ironman, strange, monjeDD, doomJovenDD), por sus
// atributos. LA VIOLENCIA NUNCA SE VE (las muertes y el sacrificio se cuentan, con luz y de lejos; nada de armas en uso,
// cuerpos ni sangre). EL INFIERNO, ESTILIZADO: rocas, ríos de luz, cadenas y una puerta; nada morboso, nada de torturas.
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en
// <x>Delante. La barra del tiempo (x 20–170, y 0–14) se deja libre.
//
//   import * as T from '/atomo/plato/escenas/vd-comun.js';
//   const { E, R, M } = await T.preparar('vd-gancho');
//   T.rodar(E, R, [[0, (t) => T.latveria(R, t, { encuadre: 'tormenta' })]], {});
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
// el reparto del 45 por su nombre (ELENCO_CHIBI lo pisan las uniones posteriores: lo aprendido en el 43)
export { ELENCO_VD as VD } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';
import * as AT from '/atomo/plato/escenas/atom-personaje.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras, AT };
// F · el estudio de las pausas (del 43) y el cine del cierre (salas, del 33): se usan tal cual
export { estudio, estudioDelante } from '/atomo/plato/escenas/hm-comun.js';
export { salas, salasDelante } from '/atomo/plato/escenas/du-comun.js';

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // Latveria: nieve, pino oscuro, piedra gris, madera de los carromatos, el verde de Doom y el gris de su armadura
    nieve: '#e8ecf4', nieveS: '#a8b4c8', pino: '#24402e', pinoS: '#142a1e', piedra: '#8a8a94', piedraS: '#5a5a66',
    madera: '#7a4a2a', maderaS: '#4e2e1a', verdeDoom: '#2e7a3e', verdeDoomS: '#1e5a2a', acero: '#a8acbc', aceroS: '#6a6e80',
    // la universidad: ladrillo rojo, pizarra verde, la luz fría del laboratorio
    ladrillo: '#a84a3a', ladrilloS: '#7a3028', pizarra: '#2a4a3a', labLuz: '#a8e8ff',
    // el Tíbet: azafrán, granate y el cielo de altura
    azafran: '#e8a030', granate: '#7a1e28', cieloAlto: '#4a7ac8',
    // el infierno (estilizado): rojo profundo, brasa, la luz verde de las almas libres
    infierno: '#5a1418', infiernoS: '#2a0a10', brasa: '#e86a2a', almaLuz: '#a8ffc8',
    // Battleworld: el mosaico de mundos y el oro del dios emperador
    mosaico: '#6a5a8a', oroDios: '#f0c848',
  }),
};

export async function preparar(id) {
  const E = await escena(id, 'ep45');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo va en los años de los cómics (las escenas de la infancia van sin año): la máscara (1962–1999)
  // y la corona (2000–2026)
  Object.assign(R.ICONOS, {
    mascara: ['.#####.', '#######', '#.#.#.#', '#######', '##...##', '.#####.', '..###..'],
    corona: ['#.#.#.#', '#######', '#.###.#', '#######', '.#####.', '.......', '.......'],
  });
  R.tramosTiempo([[1962, 2000, R.PALA.VERDE ?? R.PALA.ORO, 'mascara'], [2000, 2027, R.PALA.ROJO, 'corona']]);
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


// ── A · Latveria ───────────────────────────────────────────────────────────────────────────────────────────────────────
// Un país pequeño y frío de montaña en el este de Europa (NUESTRO): pinos oscuros, nieve, piedra gris, aldeas de madera.
// Cada encuadre es un fondo fijo (búfer) + su vida animada con t; los cielos van tramados, con nubes de tres tonos a varias
// velocidades que pasan solo por el cielo (máscara), y la esquina de Atom (x 278–318, y 4–44) queda tranquila.
// o.encuadre:
//   'campamento': EL CAMPAMENTO ROMANÍ en un claro de la montaña, al atardecer: cielo de azul a rosa y naranja con nubes
//     y cuervos, dos cordilleras nevadas (la nieve rosa del ocaso), un bosque de pinos nevados, tres carromatos de lona en
//     arco con ruedas de radios amarillos (dos al fondo, x 22–62 y 196–232; uno grande a la derecha, x 262–319, suelo
//     152), con su farol y su ventanita encendidos y el humo de la chimenea; LA HOGUERA grande (x 184, y 142) con chispas,
//     humo y el resplandor naranja sobre la nieve; otra pequeña al fondo (x 96, y 124) con un caldero en su trípode; dos
//     caballos atados (x 4–50, y 138) que mueven la cola y pacen; ropa tendida que ondea; gente pequeña que pasa con un
//     cubo o un haz de leña, un hombre que parte leña y un perro dormido junto al fuego. Suelo y 150, libre x 30–260.
//     o.cuna true: una cuna de madera que se mece (x 112–134, suelo 150; devuelve .cuna [123, 150]).
//     Cámara 'carromato': dentro de un carromato de noche: el techo en arco de tablas con telas en guirnalda y amuletos
//     colgados que se mecen, la pared de tablas con un friso pintado, una ventanita (x 52–88, y 48–80) con la nieve que
//     cae fuera, una repisa (x 140–252, y 102) con tarros, cuencos y LA VELA (x 244, y 96) que tiembla y lo ilumina todo,
//     una estufa de hierro (x 262–292) con su brasa, la cama de mantas de retales (x 12–114, colcha en y 130), el suelo de
//     tablas con una alfombra, y EL BAÚL de Cynthia (x 170–230, y 128–150; o.baul 0–1: la tapa que se abre y la luz cálida
//     que sale, con motas doradas; o.libros true: tres libros con símbolos sobre la manta, x 50–100, y 124–130).
//     Suelo y 150, libre x 40–200.
//   'tormenta': LA MONTAÑA DE NOCHE EN LA TORMENTA DE NIEVE: nubes bajas que corren, ventisca en diagonal (tres capas a
//     distinta velocidad: dos aquí y la de delante en latveriaDelante), ventisca rasante sobre la nieve, pinos que se
//     doblan, rocas nevadas a los lados (x 0–36 y 226–296), la ladera que sube a la derecha con una loma de pinos al fondo,
//     antorchas lejanas (o.antorchas 0–1: hasta 5 luces naranjas con su portador que avanzan por la loma, x 200–310,
//     y 70–110); o.amanecer 0–1: el cielo se aclara a rosa (fundido tramado), las nubes se abren y la ventisca se calma.
//     Suelo y 152, libre x 30–220. Cámara 'abrigo': de cerca, el hueco entre dos rocas grandes (x 36–124 y 196–292) al pie
//     de un pino enorme cuyas ramas nevadas hacen de techo, para un adulto arrodillado que envuelve a un niño (x 120–200,
//     suelo 152): dentro del hueco cae poca nieve y despacio, una luz pálida (rosa y dorada con o.amanecer) baja sobre
//     ellos; fuera, la ventisca; de vez en cuando se desprende nieve de una rama. La nieve de delante, en latveriaDelante.
//   'baron': LA PUERTA DEL CASTILLO DEL BARÓN, de noche: la muralla de sillares grises con almenas nevadas, dos torres
//     redondas con tejado cónico y banderola, la torre de la puerta con el rastrillo alzado y la luz del patio dentro
//     (arco x 141–179, y 99–150; un centinela quieto dentro), dos estandartes azules con el ciervo que ondean, antorchas
//     que tiemblan, ventanas encendidas, centinelas pequeños que pasean por el adarve, el camino empedrado con rodadas,
//     cielo con luna, estrellas y nubes. Suelo y 150, libre x 30–290. o.lejos true: EL CASTILLO SOBRE SU COLINA visto
//     de lejos (castillo x 176–262, y 17–97, con el camino en zigzag; el bosque del valle y el pueblo con luces y humo al
//     pie) desde una loma nevada en primer término (suelo y 150, libre x 20–200) con un árbol seco (x 33) y rocas.
//     Cámara 'alcoba': dentro, una alcoba de piedra con un tapiz azul del ciervo, la puerta de roble entreabierta con la
//     luz del pasillo (x 40–80, y 82–150), una ventana ojival con la nieve (x 100–124, y 34–88), un aguamanil, la cama
//     con dosel y cortinas azules (x 150–250; la enferma acostada: el bulto que respira bajo la colcha, x 166–226, y la
//     cabeza en la almohada de perfil, ojos cerrados, x 222–238, y 110–122; colcha en y 124), un
//     candelabro de tres velas en la mesilla (x 252–268) y otra en el alféizar que se consumen (o.velas 0–1: más bajas,
//     la luz más débil), un sillón (x 272–306) y una alfombra. Suelo y 150; el curandero junto a la cama (x 120–150) y el
//     barón en la puerta (x 40–80).
//   'doomstadt': LA CIUDAD DE DOOM, años después, de noche con luna: un castillo enorme de piedra oscura sobre su peña,
//     con torres, estandartes verdes con el aro de cuatro puntas y ventanas de luz verde y blanca; en la torre más alta,
//     un balcón (x 150–170, y 60) con su ventanal de luz verde; un guardia de hierro en la ronda; debajo, la ciudad de tejados rojos y nieve con ventanas
//     encendidas, chimeneas con humo, una torre de reloj (x 262–274) y una cúpula (x 44), faroles y gente pequeña con
//     farol en la calle de delante (suelo y 170, libre x 20–300); la luna en x 62, y 36.
//     Cámara 'balcon': el balcón de la torre alta de cerca, de noche, para Doom AL DOBLE: la torre de sillares grandes con
//     sus esquinas, matacanes, almenas nevadas (desde y 24: la barra del año, sobre cielo) y carámbanos; el ventanal ojival emplomado (x 140–180, y 64–135) con la luz
//     verde (o.ventanal 0–1: de apagado a encendido; por defecto 1); dos estandartes verdes con el aro, dos antorchas
//     (x 113 y 207); el suelo de losas (y 136–143) con su canto y cinco ménsulas; detrás, dos torres de tejado verde,
//     la muralla con un guardia de hierro, los montes y la ciudad de abajo con luces y humo; luna (76, 36), estrellas,
//     nubes tramadas, cuervos y nieve. Suelo y 140, libre x 112–208 (.balcon {x0 140, x1 180, y 140}); la balaustrada
//     (pasamanos y 130, de x 104 a 216, entre dos pilares) va en latveriaDelante y tapa las piernas.
//     Cámara 'plaza': la plaza de la ciudad de día: casas de tres alturas con entramado y tejados rojos nevados, el
//     castillo de Doom a lo lejos, mercado con puestos y toldos de rayas (pan, manzanas, coles, quesos, cacharros), una
//     fuente con chorros (x 138–182, y 104–142), niños pequeños que juegan, palomas, y EN LAS VENTANAS ROBOTS con la cara
//     de hierro (ocho; o.robots 0–1: se giran a la vez hacia x o.mira, y los ojos se encienden). Suelo y 152, libre
//     x 30–280. Los puestos de delante (esquinas x 0–34 y 286–319), en latveriaDelante.
//   'trono': LA SALA DEL TRONO DE DOOM: piedra oscura en perspectiva, columnas, dos ventanales con haces de luna, dos
//     estandartes verdes con el aro de cuatro puntas (sin letras) y uno enorme detrás del trono, antorchas, braseros,
//     dos robots de guardia en sus nichos con los ojos que parpadean, una alfombra verde con ribete dorado hasta el estrado
//     y EL TRONO DE HIERRO (asiento en x 160, y 120; estrado x 112–208, y 124–150). Suelo y 150, libre x 40–280.
//     Cámara 'enemigos': la sala de los enemigos: una pared de metal con seis pantallas (0: la central grande
//     x 110–210, y 30–100; 1 y 2: izquierda arriba y abajo, x 44–98 (y 30–62 y 68–100); 3 y 4: derecha, x 220–272; 5: la
//     tira de abajo, x 110–210, y 108–118; las de la derecha acaban en x 272 para no entrar en la esquina de Atom);
//     o.pantallas: [las que se encienden] (por defecto [0]): las encendidas, con su fondo claro y las líneas de barrido,
//     listas para que la escena dibuje dentro (con R.recorte a su rectángulo);
//     las apagadas, en reposo con una onda verde que se mueve y un piloto que parpadea; armarios con pilotos, un
//     conducto, manómetros, la franja de aviso del zócalo y el resplandor frío de las pantallas en el suelo. El brillo
//     del cristal y LA MESA DE MANDO (x 60–260, y 146–166, más baja que el encargo para que asomen cabeza y hombros) van
//     en latveriaDelante. Doom de pie delante (x 150–170, suelo 152).
// Devuelve { encuadre, camara, suelo, libre, … } con lo de cada encuadre: fuego, cuna, carros (campamento); baul, cama,
// vela, ventana (carromato); antorchas (tormenta); hueco (abrigo); puerta (baron); cama, puerta, ventana, velas
// (alcoba); balcon (doomstadt); fuente, robots (plaza); trono, estrado (trono); pantallas, mesa (enemigos).
// Llama a latveriaDelante después de los actores (la nieve de primer término, la leña del campamento, la mesa de mando y
// el brillo de las pantallas, los puestos del mercado de delante).
export function latveria(R, t, o = {}) {
  const enc = a_LV[o.encuadre] ? o.encuadre : 'campamento', cam = o.camara && o.camara !== 'general' ? o.camara : 'general';
  const f = cam === 'general' ? a_LV[enc][0] : enc === 'doomstadt' && cam === 'balcon' ? a_lvBalcon : a_LV[enc][1];
  return { encuadre: enc, camara: cam, ...f(R, t, o) };
}
// Lo que va por delante de los personajes, según el encuadre: 'campamento' general, la leña y unas matas nevadas en las
// esquinas de abajo; 'tormenta' (las dos cámaras), la capa de ventisca de primer término (copos grandes y rápidos; en
// 'abrigo', menos dentro del hueco); 'baron' general y 'doomstadt', unos copos sueltos; 'doomstadt' cámara 'balcon',
// la balaustrada con nieve y la luz verde del ventanal (o.ventanal) y copos; 'plaza', los dos puestos de
// delante (izquierda: cestas de manzanas y coles; derecha: el de los cacharros, con su toldo); 'enemigos', el brillo del
// cristal de las pantallas (más en las encendidas) y LA MESA DE MANDO (x 60–260, y 146–166) con teclas, pilotos y una
// pantallita con su onda. Los demás encuadres no llevan nada delante. Devuelve {}.
export function latveriaDelante(R, t, o = {}) {
  const enc = a_LV[o.encuadre] ? o.encuadre : 'campamento', cam = o.camara && o.camara !== 'general' ? o.camara : 'general', am = o.amanecer ?? 0;
  if (enc === 'campamento' && cam === 'general') a_campDelante(R, t);
  else if (enc === 'tormenta') {
    const c = [a_mez(a_P.copoS, a_P.copoA, am), a_mez(a_P.copo, a_P.copoA, am * 0.6)];
    if (cam === 'general') a_copos(R, t, { n: Math.round(46 * (1 - 0.8 * am)), vx: -150 * (1 - 0.6 * am), vy: 95, sem: 31, c, tam: 2, estela: 3 });
    else { a_copos(R, t, { n: Math.round(34 * (1 - 0.8 * am)), vx: -130 * (1 - 0.6 * am), vy: 90, sem: 32, c, tam: 2, estela: 2, fuera: [118, 70, 202, 179] }); a_copos(R, t, { n: 4, vx: -8, vy: 14, sem: 33, c, tam: 2, x0: 120, x1: 200, y0: 60, y1: 160 }); }
  } else if ((enc === 'baron' && cam === 'general') || (enc === 'doomstadt' && cam === 'general')) a_copos(R, t, { n: 16, vx: -10, vy: 16, sem: 34, c: [a_P.copoS, a_P.copo], tam: 2 });
  else if (enc === 'doomstadt' && cam === 'balcon') a_balconDelante(R, t, o);
  else if (enc === 'doomstadt') a_plazaDelante(R, t);
  else if (enc === 'trono' && cam !== 'general') a_enemigosDelante(R, t, o);
  return {};
}
// ── B · La universidad ────────────────────────────────────────────────────────────────────────────────────────────────
// Una universidad de Estados Unidos a principios de los sesenta (NUESTRA, sin logotipos ni letras): ladrillo rojo,
// hiedra, columnas blancas, pizarras.
// o.encuadre:
//   'campus': EL CAMPUS de día en otoño. Cielo tramado con el sol (208, 22), nubes de tres tonos a tres velocidades,
//     gansos en uve y gorriones en la cornisa. Al fondo, la arboleda de otoño difuminada. A la izquierda, la residencia
//     (x 0–86) con su tejado de pizarra, buhardillas, chimenea que humea, ventanas (a ratos se asoma alguien) y la
//     hiedra roja; en el centro, el edificio principal (x 96–236) con frontón y óculo, seis columnas con su sombra,
//     la puerta de dos hojas (x 160–172, y 80–104), la bandera que ondea en el mástil (x 166, y 20–38) y la
//     escalinata (y 104–118) con jardineras de crisantemos; a la derecha, la torre del reloj (x 246–270, esfera en
//     (258, 52), agujas que se mueven, veleta) sobre el ala de ladrillo con hiedra. El césped a franjas con sombras
//     de los árboles y hojas caídas, el sendero de grava del fondo (y 122–127) por donde cruzan estudiantes diminutos
//     con libros y un ciclista, dos estudiantes sentados en la escalinata, el banco (x 52–76), las bicis aparcadas
//     (x 240–266), dos farolas (x 100 y 232) y el paseo de losas (y 140–164) donde se plantan los personajes; dos
//     arces grandes que se mecen (x 34 y 294) con hojas que caen, una ardilla que cruza el césped de delante.
//     Suelo y 152, libre x 30–280. Cámara 'pasillo': el pasillo de la residencia, frontal: techo de placas con dos
//     tubos fluorescentes (el segundo parpadea), pared de bloques pintados y zócalo de madera, el ventanal de la
//     izquierda (x 8–68, y 26–118: fuera, cielo con nubes, un arce que se mece, el ladrillo de enfrente y alguien que
//     pasa) con la luz que cae en diagonal sobre el suelo y las motas que flotan, el radiador, tres puertas de madera
//     con su número (212 en x 82–108, 214 en x 196–222 —por debajo de esta pasa a ratos la sombra de alguien—, 216 en
//     x 290–316), el tablón de corcho (x 116–186, y 50–94) con papelitos de rayas, una foto, un banderín y un
//     calendario (uno de los papeles se levanta con la corriente), la fuente de agua (x 140–160), las taquillas
//     numeradas (x 230–280) y el reloj de pared (256, 40). Suelo de linóleo a cuadros en perspectiva con brillos.
//     o.maleta (true o la x de su izquierda; por defecto 236): una maleta de cuero con correas y pegatinas en el suelo
//     (24 × 15, apoyada en y 152). o.noche: de noche (fuera, estrellas, luna y ventanas encendidas; los tubos dan
//     charcos de luz). Suelo y 150, libre x 70–284.
//   'laboratorio': EL LABORATORIO DE VICTOR, de noche: pared de bloques, tuberías en el techo, la ventana de hierro
//     (x 16–94, y 22–80: el campus dormido, la torre del reloj con la esfera encendida, ventanas que se encienden, la
//     luna y una nube que pasa), la estantería de frascos (x 106–172; dos burbujean), el banco de trabajo (x 14–104,
//     encimera y 108) con el osciloscopio (la onda corre), el aparato de válvulas que brillan, una bobina pequeña que
//     chisporrotea, el flexo y la taza que humea. LA MÁQUINA (x 172–278, y 22–150): un aro de acero (centro (225, 88),
//     radio 40) con remaches, doce bombillas que corren, tres antenas, dos bobinas de cobre y la plataforma con franjas
//     de peligro (x 174–276, y 136–150). La consola de mando (x 138–164, y 118–150) con dos relojes y LA PALANCA
//     (pivote (150, 120); o.palanca 0–1: de arriba a bajada). o.carga 0–1: el aro se enciende (remolino violeta y azul
//     dentro, arcos, un núcleo blanco al final), las bobinas se ponen al rojo, las agujas suben y la luz fría baña la
//     sala y el suelo. o.estalla 0–1: el destello (en universidadDelante), el humo que sale del aro, las chispas que
//     saltan y, después, la máquina rota (aro chamuscado y apagado, la antena doblada, tornillos por el suelo, una
//     bobina que aún chisporrotea); sin heridas. Suelo y 150, libre x 30–170. Cámara 'pizarra': la pizarra enorme
//     (x 14–266, y 24–132) llena de cálculos de tiza (cifras y símbolos, sin letras: sumas, raíces, integrales, una
//     matriz, una gráfica y el boceto del aro) con borrones; o.error [x, y] (centro del número equivocado, por defecto
//     [200, 96]): el «0.8» del error y, si se da o.error, el aro de tiza roja que lo rodea (o.rodea 0–1: el aro que se
//     va dibujando; por defecto entero). La repisa con tizas y el borrador (y 130–134), el reloj de pared (214, 13),
//     la bata colgada, el armario de frascos (x 278–316, y 52–140) y, a la derecha, la luz de la máquina que late
//     (más con o.carga). Suelo y 150, para dos estudiantes delante (x 70–230).
// Devuelve { encuadre, camara, suelo, libre, … } con las piezas de cada encuadre (véase geometría en cada auxiliar):
// campus: puerta, escalinata, reloj, sol; pasillo: puertas, ventana, maleta?; laboratorio: maquina, palanca, consola,
// mesa; pizarra: pizarra, error, repisa. Llama a universidadDelante después de los actores, con las mismas opciones:
// campus, las matas de la esquina y hojas que caen delante; pasillo, la papelera de la esquina y las motas de luz;
// laboratorio, la mesa de primer término (x 266–320, y 152–180), el cable del suelo, el humo de delante y el destello
// de o.estalla; pizarra, la esquina de la mesa con el cuaderno y el vaso de precipitados (x 0–60, y 156–180).
export function universidad(R, t, o = {}) {
  const encuadre = o.encuadre ?? 'campus', camara = o.camara ?? 'general';
  const g = encuadre === 'laboratorio' ? (camara === 'pizarra' ? b_pizarra(R, t, o) : b_laboratorio(R, t, o))
    : (camara === 'pasillo' ? b_pasillo(R, t, o) : b_campus(R, t, o));
  return { encuadre, camara, ...g };
}
// lo que va por delante de los personajes en cada encuadre de la universidad (mismas opciones que universidad)
export function universidadDelante(R, t, o = {}) {
  const encuadre = o.encuadre ?? 'campus', camara = o.camara ?? 'general';
  if (encuadre === 'laboratorio') { if (camara === 'pizarra') b_pizarraDelante(R, t, o); else b_laboratorioDelante(R, t, o); }
  else if (camara === 'pasillo') b_pasilloDelante(R, t, o); else b_campusDelante(R, t, o);
  return {};
}
// ── C · El Tíbet ────────────────────────────────────────────────────────────────────────────────────────────────────
// Cuatro planos de verdad (dos encuadres con dos cámaras), con el fondo fijo en búferes y la vida pintada cada fotograma.
// o.encuadre:
//   'montana' (cámara 'general'): LAS MONTAÑAS DEL TÍBET a pleno día. Cielo de altura tramado (cinco azules) con el sol
//     arriba a la derecha (x 236, y 26), cirros lentos, cúmulos de tres tonos y un banco de niebla en el valle, cada capa
//     a su velocidad, y el penacho de nieve que el viento arranca de las dos cumbres. Dos cordilleras: la lejana, de picos
//     enormes con caras al sol y a la sombra, canales de roca y bruma de altura; la media, más oscura y rocosa. El
//     MONASTERIO en el espolón de la derecha (x 196–306, y 56–112): muros encalados que se estrechan hacia arriba, el
//     friso granate, ventanas negras con dintel rojo, el pabellón de tejado rojo con el remate dorado que destella, la
//     puerta roja, una estupa blanca (x 186–200), la escalera en zigzag y dos monjes diminutos que pasean por la terraza
//     y suben la escalera; humo de enebro del quemador del tejado. Delante, el campo de nieve con ondas de viento, matas
//     secas y rocas, el muro de piedras mani (x 58–134, y 126–140) y el camino de losas (y 146–160) que va hacia la
//     escalera; dos mástiles (x 24 y x 168) con la cuerda de banderas de oración de cinco colores que ondean (sin
//     letras) y otra cuerda que sube del mástil al monasterio. Un quebrantahuesos que planea, dos chovas y la nieve que
//     cae (o.nieve 0–1, por defecto 0,35). o.ventisca 0–1: el cielo se cierra en gris, la nieve arrecia en diagonal (para
//     cuando Victor se desploma). Suelo y 152 (el camino), libre x 30–220.
//   'montana', cámara 'monasterio': EL PATIO DEL MONASTERIO. Arriba, el cielo tramado con nubes y un pico nevado tras el
//     tejado; los extremos de las vigas pintadas, el friso granate de ramas con discos dorados, el muro encalado con
//     brochazos y manchas de humedad. En el centro, el pórtico (x 112–208): dos columnas rojas con capitel de colores,
//     el dintel de vigas azules, verdes y rojas, la cortinilla blanca con ondas azules que mueve el aire (y 76–83) y LA
//     PUERTA ROJA de dos hojas con tachones dorados y aldabas (x 132–188, y 84–141; o.puerta 0–1 la abre hacia dentro y
//     sale la luz cálida de las lámparas de manteca). A los lados, ventanas de marco negro con geranios; a la izquierda la
//     galería de RUEDAS DE ORACIÓN doradas (x 14–102, y 100–139) que giran; a la derecha el QUEMADOR DE INCIENSO encalado
//     (x 228–264, y 108–142) con su humo de enebro que sube en volutas, y leña con una escoba (x 272–312). Palomas en la
//     cornisa, un monje asoma en la ventana alta, un novicio diminuto cruza al pie del muro. Suelo de losas en
//     perspectiva con nieve en las esquinas. Suelo y 150, libre x 30–300.
//   'forja' (cámara 'general'): LA FORJA del monasterio, de noche. Muro de mampostería con el resplandor naranja del horno
//     (que tiembla) y el azul de la luna por la ventana (x 58–98, y 24–62: el cielo con estrellas que titilan, un pico a
//     la luz de la luna y la nieve que cae, recortado a su hueco); vigas en el techo; el tablero con herramientas
//     colgadas (tenazas, martillos, lima, cinceles, x 22–122, y 66–100); la MESA con las piezas de la armadura gris (peto,
//     guantelete, greba, el casco sin cara, un rollo de planos con círculos y una vela; x 30–126, tablero y 126); EL
//     YUNQUE sobre su tocón (cara de golpeo x 146–180, y 136; el pico a la izquierda); la TINA de templar (x 190–214,
//     y 134–150) con el agua que refleja el fuego; EL HORNO de piedra a la derecha (x 222–312: el fuego vivo en la boca
//     x 240–288, y 96–114, brasas, la campana y la chimenea hasta el techo) con el fuelle de cuero (x 296–318) que bombea
//     un monje diminuto y aviva el fuego. Chispas que suben por la campana. o.fuego 0–1 (por defecto 1).
//     o.mascara 0–1: LA MÁSCARA de hierro en el yunque (centro x 163, y 131), con su calor: 1 al rojo blanco, 0,5 rojo
//     oscuro, 0 hierro gris y frío; mientras se enfría echa vapor y su luz naranja tiñe el yunque. Sin o.mascara (o con
//     o.sinMascara) el yunque queda vacío (la máscara la lleva la escena en la mano con c_mascara). Suelo y 150, libre
//     x 30–220.
//   'forja', cámara 'mascara': DE CERCA, EL YUNQUE Y LA MÁSCARA: la cara de golpeo de acero pulido con arañazos y el
//     pico, el agujero cuadrado, el martillo apoyado a la derecha, la máscara grande (centro x 160, y 94, 36 × 46 px) con
//     sus rendijas de los ojos, la nariz y la rejilla de la boca, al rojo según o.mascara (por defecto 1), con chispas,
//     vapor que sube al enfriarse y el resplandor; detrás, el muro desenfocado con el fuego y brasas que flotan
//     (bokeh). o.tenazas (por defecto true): las tenazas que la sujetan desde la izquierda; la mano de Victor que las
//     coge la pone tibetDelante con o.mano.
// Devuelve { encuadre, camara, suelo, libre, monasterio?, puerta?, yunque?, mascara?, horno?, mesa?, tina? }. Llama a
// tibetDelante después de los actores.
export function tibet(R, t, o = {}) {
  const encuadre = o.encuadre ?? 'montana', camara = o.camara ?? 'general';
  let r;
  if (encuadre === 'forja') r = camara === 'mascara' ? c_forjaCerca(R, t, o) : c_forja(R, t, o);
  else r = camara === 'monasterio' ? c_patio(R, t, o) : c_montana(R, t, o);
  return { encuadre, camara, ...r };
}
// Lo que va por delante de los personajes, con las mismas opciones que tibet():
//   'montana' general: los ventisqueros con rocas de las esquinas de abajo (x 0–34 y 286–319, y > 160) y los copos
//     grandes y rápidos de primer término (o.nieve, o.ventisca);
//   'monasterio': unos copos finos y una voluta de incienso que cruza;
//   'forja' general: el cubo de carbón con el mazo apoyado (x 0–30, y 150–180), las chispas y pavesas que suben
//     delante y el vapor de la máscara;
//   'mascara': el vapor de delante y, con o.mano, el brazo canónico de Victor (manga oscura, o.manga) que sujeta las
//     tenazas desde abajo a la izquierda.
export function tibetDelante(R, t, o = {}) {
  const encuadre = o.encuadre ?? 'montana', camara = o.camara ?? 'general';
  if (encuadre === 'forja') {
    if (camara === 'mascara') return c_mascaraDelante(R, t, o);
    return c_forjaDelante(R, t, o);
  }
  if (camara === 'monasterio') { c_copos(R, t, 10, 0.4, 1, 1); c_humo(R, t, 246, 70, 0.5, 40, 0.35); return {}; }
  return c_montanaDelante(R, t, o);
}
// ── D · El reino de Mefisto ─────────────────────────────────────────────────────────────────────────────────────────
// ESTILIZADO, nada morboso (sin torturas ni cuerpos): rocas rojas con vetas, ríos y cascadas de luz naranja, cadenas que
// se mecen, humo en tres tonos a tres velocidades, ceniza y brasas que suben, murciélagos lejanos; Mefisto NUNCA tiene
// cara: es una mano enorme de luz roja (o.mefisto).
// o.encuadre:
//   'camino': EL CAMINO DE LA NOCHE DE SAN JUAN. Cielo de cueva tramado (rojo oscuro arriba, brasa en el horizonte) con
//     humo que pasa, dos rocas flotantes que gotean luz, montes lejanos con dos cascadas de luz que caen a un río de luz
//     (y 98–108), dos agujas de roca (x 0–44 y 108–152) unidas por cadenas que se mecen, grietas que laten, y un sendero
//     de losas de luz (y 146–170 a la izquierda, 149–163 en x 200) que sube a LA PUERTA, tallada en un risco: marco de
//     dovelas (x 202–288, arco desde y 33), dos hojas de hierro con bandas y remaches, un anillo labrado y LA CERRADURA
//     DE LUZ (x 245, y 100, late), la rendija entre las hojas que brilla, dos antorchas y tres escalones (y 140–152).
//     Suelo y 152, libre x 30–200.
//     Cámara 'puerta': la puerta de cerca (marco x 104–228, arco desde y 24, hojas x 118–214, cerradura x 166, y 96),
//     cruzada por dos cadenas; a la izquierda, por un hueco del risco, el paisaje (cielo, río y una cascada); a los lados,
//     pilastras talladas y dos braseros (x 50 y 280); escalones y 138–152. Suelo y 152, libre x 90–240 (dos personajes
//     delante, x 100–200).
//     o.alma 0–1 (las dos cámaras): una luz blanca con forma de mujer (sin rasgos) sale de la cerradura y sube hasta
//     arriba dejando chispas (0–0,15 aparece, luego sube); o.abierta 0–1: la rendija se ensancha y sale más luz.
//   'trono': EL TRONO DE MEFISTO. Pared de roca con estratos y vetas de luz que laten, columnas como raíces trenzadas
//     (x 28, 92, 228, 292) que se abren en el suelo, un rosetón de fuego que gira detrás del trono (centro x 160, y 74,
//     r 44), dos braseros colgados de cadenas (x 112 y 208, se mecen), un canal de lava al pie de la pared (y 128–134) y
//     un suelo de obsidiana en perspectiva con reflejos y una alfombra hasta el trono. EL TRONO: respaldo con cinco
//     puntas (x 136–184, y 38–122), brazos x 128–146 y 174–192 (y 104–124), cojín y 118–124, frente y 122–140, escalones
//     y 140–152 (x 104–216); dos charcos de lava con burbujas (x 62 y 258, y ≈ 166). o.mefisto 0–1: la mano de luz
//     roja que se alza detrás del respaldo, a su derecha (x 160–215, dedos hasta y ≈ 20), con los dedos que se mecen.
//     o.rey true: Doom en el trono (la escena lo pone de pie en el asiento, x 153, suelo 126, e infiernoDelante pinta el
//     frente del asiento delante de sus piernas para que se lea sentado) y la sala es verde; o.verde 0–1 (por defecto 1
//     con o.rey, 0 sin él): la sala pasa de roja a verde desde el trono hacia fuera, tramado, poco a poco.
//     o.contratos 0–1: siete pergaminos que giran alrededor del trono (0 enteros; al subir, uno tras otro arden desde
//     abajo en llamas verdes y se deshacen en chispas de luz; 1 ya no queda ninguno). o.almas 0–1: luces verdes que suben
//     libres desde el suelo (cuántas). o.alma 0–1: una luz verde con forma de mujer que sube desde el trono (Valeria).
//     Suelo y 152, libre x 30–280 (el trono en el centro: los de pie, a sus lados, x 30–110 y 210–280).
//     Cámara 'contratos': DE CERCA: pared de bloques grandes de roca volcánica con juntas de lava que laten, EL GRAN
//     ANILLO de símbolos descentrado a la derecha (centro x 214, y 80, r 66; con o.almas se enciende entero y gira), un
//     zócalo (y 142–146) y el suelo de obsidiana (y 147–180, sin canal) con una grieta de lava en diagonal a la derecha;
//     seis pergaminos grandes (x 105–285, y 30–142; el primero, el que arde antes, en x 118, y 62) con o.contratos;
//     o.almas llena el cuadro de luces verdes. Raíces grandes de primer término (x 0–18 y 284–320, desde y 50) en
//     infiernoDelante. Suelo y 152, libre x 20–90 (Doom con los brazos arriba).
// Devuelve { encuadre, camara, suelo, libre, puerta?, cerradura?, alma?, trono?, asiento?, contratos? } (contratos: los
// rectángulos [x0, y0, x1, y1] de los pergaminos que aún no han ardido). Llama a infiernoDelante después de los actores.
export function infierno(R, t, o = {}) {
  const enc = o.encuadre ?? 'camino', cam = o.camara ?? 'general';
  if (enc === 'trono') return d_salaTrono(R, t, o, cam);
  return d_camino(R, t, o, cam);
}
// Lo que va DELANTE de los personajes (una sola vez, después de R.actor): en el camino, las rocas de las esquinas de
// abajo con su filo de luz y brasas grandes que suben; en el trono general, dos braseros de pie en las esquinas
// (x 4–28 y 292–316, y 100–180) y, con o.sentado (por defecto o.rey), el frente del asiento y los brazos del trono
// (x 128–192, y 104–140) para que Doom se lea sentado; en 'contratos', las dos raíces grandes de primer término y chispas verdes. Mismas o.
export function infiernoDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'camino', cam = o.camara ?? 'general';
  if (enc === 'trono') {
    const u = o.verde ?? (o.rey ? 1 : 0), K = d_K(R, u);
    if (cam === 'general') {
      if (o.sentado ?? o.rey) d_tronoFrente(R, K);
      d_brasero(R, t, 16, 124, K, 1); d_brasero(R, t, 304, 124, K, 2);
      d_ceniza(R, t, 10, 0, 320, 60, 180, 31, true, K);
    } else { d_raicesDelante(R, t, K); d_ceniza(R, t, 12, 90, 320, 40, 180, 37, true, K, true); }
    return {};
  }
  const P = D_ROJO, K = (n, i) => P[n][i];
  const roca = (pts, lado) => { R.poligono(pts, (x, y) => d_texRoca(R, P, x, y, 0.6)); d_filo(R, pts, lado, P.lava[2], P.roca[0]); };
  roca([[0, 156], [7, 149], [15, 151], [22, 160], [27, 172], [30, 180], [0, 180]], 1);
  roca([[320, 150], [312, 152], [303, 158], [297, 168], [294, 180], [320, 180]], -1);
  d_ceniza(R, t, 9, 0, 320, 40, 180, 41, true, K);
  return {};
}
// las dos raíces grandes de primer término de la cámara 'contratos': a la izquierda, una que baja del techo pegada al
// borde (x 0–18; quien entra por la izquierda sale de detrás de ella) y, a la derecha, una gruesa que entra por el borde
// (desde y 50, por debajo de la zona de Atom) y se curva hasta el suelo (x 284–320); filo de luz hacia el anillo,
// corteza con surcos, raicillas colgantes y una gota de luz que baja por cada una
function d_raicesDelante(R, t, K) {
  const raiz = (cxF, rF, y0, lado, sem) => {
    for (let y = y0; y < 180; y++) { const c = cxF(y), r = rF(y);
      for (let x = Math.floor(c - r); x <= Math.ceil(c + r); x++) { if (x < 0 || x > 319) continue; const u = (x + 0.5 - c) / r; if (Math.abs(u) > 1) continue;
        const l = u * lado; let v = l > 0.6 ? 4 : l > 0.15 ? 3 : l > -0.5 ? 2 : 1;
        if (((y + Math.round(u * 5) + sem) % 7 === 0) && Math.abs(u) < 0.8) v -= 1; if (h(x, y >> 1, sem) > 0.9) v -= 1; if (Math.abs(u) > 0.9) v = 0;
        R.pset(x, y, l > 0.85 ? K('lava', 1, x, y) : K('roca', Math.max(0, Math.min(5, v)), x, y)); } }
    const yG = y0 + 10 + ((t * 16 + sem * 13) % (170 - y0)), xG = Math.round(cxF(yG) + lado * rF(yG) * 0.55);
    R.disco(xG + 0.5, Math.round(yG) + 0.5, 1.3, K('lava', 4, xG, yG)); R.pset(xG, Math.round(yG) - 2, K('lava', 2, xG, yG));
  };
  raiz((y) => 6 + Math.sin(y * 0.05 + 1) * 3, (y) => 8 + (y > 160 ? (y - 160) * 0.5 : 0), 0, 1, 79);
  raiz((y) => 300 + 34 * Math.max(0, (92 - y) / 42) ** 2 + Math.sin(y * 0.06) * 4, (y) => 9 + (y - 50) / 130 * 5 + (y > 164 ? (y - 164) * 0.6 : 0), 50, -1, 80);
  // raicillas que cuelgan de la raíz derecha y se mecen
  for (let k = 0; k < 3; k++) { const y0 = 70 + k * 22, x0 = 300 + 34 * Math.max(0, (92 - y0) / 42) ** 2 - 10, L = 14 + k * 5;
    for (let j = 0; j < L; j++) { const x = Math.round(x0 - j * 0.3 + Math.sin(t * 1.2 + k + j * 0.2) * j * 0.08); R.pset(x, y0 + j, K('roca', j < L - 3 ? 2 : 3, x, y0 + j)); } }
}
// ── E · Battleworld ─────────────────────────────────────────────────────────────────────────────────────────────────
// Todo NUESTRO (ni la arquitectura ni las figuras de los cómics): un planeta de retales, una sala de oro, un juez de luz.
// o.encuadre:
//   'planeta' (cámara 'general'): BATTLEWORLD DESDE EL MIRADOR: el espacio tramado (nebulosas violeta y azul, estrellas
//     que titilan, una estrella fugaz de vez en cuando) y EL PLANETA COSIDO (centro x 160, y 82, r 48: el halo, por debajo de y 20) que gira despacio:
//     retales de desierto con dunas, hielo con grietas, selva, ciudades (con luces en el lado de noche), mar con olas y
//     brillo, volcán con vetas, praderas en parcelas, cristal violeta y montañas nevadas, unidos por COSTURAS DE LUZ
//     DORADA que laten, nubes finas que pasan y un halo de atmósfera. A los lados, LOS RESTOS DE OTROS DOS PLANETAS que
//     se deshacen (x 22–74, y 34–86 y x 232–270, y 80–116): pedazos que se separan con el núcleo al rojo y escombros que
//     se alejan. Delante, el MIRADOR de oro y mármol: barandilla de balaustres (y 124–142) con dos faroles que titilan,
//     dos centinelas diminutos con lanza (x 18 y 298) y el suelo de losas con vetas que refleja el planeta.
//     Suelo y 152 (pies en y 146–170), libre x 40–280. o.mirador false: sin mirador ni centinelas (el espacio llega
//     abajo; el planeta queda entero). o.giro: el ángulo del planeta (por defecto gira con t).
//   'planeta' cámara 'trono': EL TRONO DEL DIOS EMPERADOR: una sala de oro inmensa (bóveda de casetones en penumbra,
//     sillares de oro con vetas, columnatas a los lados con ventanales al espacio y un trozo del planeta), un NICHO con
//     EL ÁRBOL DE LUZ detrás del trono (ramas de oro, hojas que titilan, luz que cae), braseros con fuego a los dos lados
//     de la escalinata, una alfombra verde que baja, el suelo de mármol pulido en perspectiva con reflejos y dos guardias
//     diminutos en las columnatas. EL TRONO enorme: respaldo x 134–186, y 22–106 (corona de puntas y el aro de cuatro
//     puntas), alas x 124–196; ASIENTO a y 110 (cojín verde x 138–182) sobre el estrado (y 128): un chibi sentado se
//     planta con la cadera en y 110 y no llega al suelo (le cuelgan las piernas, hay 18 px). Escalinata y 128–148;
//     suelo y 152, libre x 40–110 y 210–280 (y delante de la escalinata). o.halo 0–1: el halo de oro detrás de la
//     cabeza del sentado (centro x 160, y 88), con rayos que giran. Los brazos del trono van en battleworldDelante.
//   'tribunal' (cámara 'general'): EL ESPACIO DEL JUEZ: un vacío de nebulosas con estrellas, y detrás LA FIGURA CÓSMICA
//     enorme en silueta (capucha y hombros x 42–278, y 16–150) rellena de cielo estrellado que se mueve, con un filo de
//     luz, y TRES CARAS DE LUZ (centro x 160, y 48: una dorada de frente, una plateada de perfil a la izquierda y una en
//     sombra a la derecha), rayos de luz que giran detrás. Abajo, un SUELO DE LUZ cristalino con ondas que salen de la
//     camilla. LA CAMILLA DE LUZ flota en x 138–182 (cara de arriba y 140) con LA NIÑA DORMIDA tumbada (pequeña, de
//     lado: pelo rubio a la izquierda, x 140–150; manta azul hasta x 178) bajo un HAZ DE LUZ CÁLIDA que baja y motas que
//     caen. o.despierta 0–1: la niña abre los ojos y alza la cabeza. o.desvanece 0–1: el polvo de luz del arrodillado (x
//     100–116, suelo 152): lo pinta battleworldDelante. Suelo y 152, libre x 30–130 y 190–280.
//   'tribunal' cámara 'globo': LA SALA DEL MUNDO del emperador, de noche: muros de sillería verde oscura, dos ventanales
//     en arco (x 24–68 y 248–292, y 40–122) con el cielo de noche, la luna, nubes que pasan y una ciudad lejana con luces,
//     estandartes verdes con el aro de cuatro puntas que ondean (x 80–96 y 224–240), braseros que titilan, el suelo de losas
//     pulidas con el reflejo verde. EL GLOBO TERRÁQUEO enorme (centro x 160, y 86, r 44: x 116–204) que gira sobre su
//     pie de bronce con el meridiano (pie x 136–184, y 130–152). o.banderas 0–1: banderitas verdes que se clavan una
//     tras otra en los continentes (16 en total, caen y ondean). o.destello 0–1: un destello verde lejano en el globo
//     (Europa del este), un anillo que se abre (sin heridas). Suelo y 152, libre x 30–112 y 208–290.
// Devuelve { encuadre, camara, suelo, libre, planeta?, trono?, halo?, nina?, camilla?, figura?, globo?, destello? }.
// Llama a battleworldDelante después de los actores (con las mismas opciones): los brazos del trono y las bases de las
// columnas de delante, las motas del mirador, el polvo de luz del que se desvanece, el polvo del juez.
export function battleworld(R, t, o = {}) {
  const encuadre = o.encuadre ?? 'planeta', camara = o.camara ?? 'general';
  const base = { encuadre, camara, suelo: 152 };
  if (encuadre === 'planeta' && camara === 'trono') return { ...base, ...e_salaTrono(R, t, o) };
  if (encuadre === 'planeta') return { ...base, ...e_vistaPlaneta(R, t, o) };
  if (camara === 'globo') return { ...base, ...e_salaGlobo(R, t, o) };
  return { ...base, ...e_juez(R, t, o) };
}
// Lo que va por delante de los personajes (misma o.encuadre / o.camara / opciones que battleworld):
//   trono: los dos brazos del trono (x 124–140 y 180–196, y 96–128: tapan los costados del que se sienta, nunca la cara)
//     y las bases de dos columnas enormes en los bordes (x 0–14 y 306–319, y 150–180);
//   planeta: el borde delantero del mirador (y 172–180) y motas de oro que flotan;
//   tribunal: el polvo de luz ambiental y, con o.desvanece 0–1, el del arrodillado (x 100–116, y 128–152) que sube;
//   globo: motas en el haz de las ventanas.
// Devuelve { polvo? } (el centro del polvo de luz del que se desvanece).
export function battleworldDelante(R, t, o = {}) {
  const encuadre = o.encuadre ?? 'planeta', camara = o.camara ?? 'general';
  if (encuadre === 'planeta' && camara === 'trono') { e_tronoDelante(R, t, o); return {}; }
  if (encuadre === 'planeta') { if (o.mirador !== false) e_miradorDelante(R, t); e_motas(R, t, 18, [20, 300, 40, 170], E_BW.oroL, E_BW.oro, 3); return {}; }
  if (camara === 'globo') { e_motas(R, t, 10, [24, 120, 68, 150], E_BW.lunaL, E_BW.luna, 5); e_motas(R, t, 10, [248, 120, 292, 150], E_BW.lunaL, E_BW.luna, 6); return {}; }
  e_motas(R, t, 22, [30, 60, 290, 176], E_BW.oroL, E_BW.alma, 7);
  return { polvo: e_polvoDesvanece(R, t, o.desvanece ?? 0) };
}
// la paleta propia de Latveria (las de cada encuadre)
const a_P = pal({
  k: '#14121a', copo: '#eef2fa', copoS: '#a8b4d0', copoA: '#fde4e4',
  fuegoL: '#fff4b0', fuego1: '#ffc040', fuego2: '#f07a2a', fuego3: '#c8402a', brasa: '#ff6a2a', humo: '#6a6478', humoN: '#2c2e40',
  tronco: '#5a3a24', troncoS: '#3a2416', piedra: '#6a6a78', piedraS: '#44444e', piedraL: '#8e8e9c',
  luzC: '#ffc46a', luzCL: '#fff0b8', ambar: '#ff9a4a',
  piel: '#e0aa80', pielS: '#b07a58',
});

const a_K = a_P.k;

// umbral del tramado ordenado 4 × 4 (transiciones tramadas limpias, sin ruido)
const a_BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const a_um = (x, y) => a_BAY[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a (0–1)
function a_mez(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// un fondo fijo por lienzo: cielo() pinta el cielo y resto() lo demás encima; se guarda el búfer y la máscara del cielo
// (1 donde se ve el cielo: ahí pasan las nubes y las estrellas)
const a_CACHE = new WeakMap();

function a_escena(R, clave, cielo, resto) {
  let m = a_CACHE.get(R); if (!m) a_CACHE.set(R, (m = {}));
  if (!m[clave]) {
    const s = R.nuevo(), b = R.nuevo(), prev = R.usar(s); if (cielo) cielo(); b.set(s); R.usar(b); resto(); R.usar(prev);
    const mk = new Uint8Array(57600); if (cielo) for (let i = 0; i < 57600; i++) mk[i] = b[i] === s[i] ? 1 : 0;
    m[clave] = { b, m: mk };
  }
  return m[clave];
}

// funde tramado dos fondos fijos (u = 0: el primero; 1: el segundo) en el lienzo: un solo recorrido
function a_fundir(R, b0, b1, u) {
  const B = R.buf; if (u <= 0.001) { B.set(b0); return; } if (u >= 0.999) { B.set(b1); return; }
  for (let y = 0; y < 180; y++) { const f = y * 320; for (let x = 0; x < 320; x++) B[f + x] = a_um(x, y) < u ? b1[f + x] : b0[f + x]; }
}

// un píxel que respeta una máscara (mk) y el borde
function a_ps(R, mk, x, y, c) { x = Math.round(x); y = Math.round(y); if (x < 0 || x > 319 || y < 0 || y > 179) return; const k = y * 320 + x; if (mk && !mk[k]) return; R.buf[k] = c; }

// un disco que solo pinta donde la máscara vale 1 (las nubes por detrás de montes y torres)
function a_discoM(R, mk, cx, cy, r, c) {
  const B = R.buf; cx = Math.round(cx); cy = Math.round(cy); r = Math.max(0, Math.round(r));
  for (let j = -r; j <= r; j++) { const y = cy + j; if (y < 0 || y > 179) continue; const w = Math.floor(Math.sqrt(r * r - j * j + 0.6));
    for (let i = -w; i <= w; i++) { const x = cx + i; if (x < 0 || x > 319) continue; const k = y * 320 + x; if (!mk || mk[k]) B[k] = c; } }
}

// degradado vertical tramado entre y0 e y1: P = [[fracción, color], …]; cada franja se funde con la siguiente
function a_grad(R, y0, y1, P) {
  const B = R.buf, n = y1 - y0;
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) {
    const f = (y - y0) / n; let i = 0; while (i + 1 < P.length && f >= P[i + 1][0]) i++;
    const fa = P[i][0], fb = i + 1 < P.length ? P[i + 1][0] : 1, u = (f - fa) / Math.max(0.001, fb - fa);
    let a = P[i][1], b = a, p = 0;
    if (u > 0.6 && i + 1 < P.length) { b = P[i + 1][1]; p = (u - 0.6) / 0.4 * 0.5; } else if (u < 0.4 && i > 0) { b = P[i - 1][1]; p = (0.4 - u) / 0.4 * 0.5; }
    const r = y * 320; if (p <= 0) B.fill(a, r, r + 320); else for (let x = 0; x < 320; x++) B[r + x] = a_um(x, y) < p ? b : a;
  }
}

// un cúmulo de tres tonos (sombra abajo, cuerpo, luz arriba) que solo se ve donde hay cielo; c = [sombra, cuerpo, luz]
function a_nube(R, mk, cx, cy, w, sem, c) {
  const n = 4 + Math.round(w / 14), bolas = [];
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n - 0.5, r = w * (0.13 + 0.15 * Math.cos(u * Math.PI) + 0.07 * h(i, sem, 311)); bolas.push([cx + u * w * 0.86, cy - r * 0.45 + (h(i, sem, 312) - 0.5) * w * 0.06, r]); }
  for (const [x, y, r] of bolas) a_discoM(R, mk, x, y + 1, r, c[0]);
  for (const [x, y, r] of bolas) a_discoM(R, mk, x, y, r, c[1]);
  for (const [x, y, r] of bolas) a_discoM(R, mk, x - 1, y - 2, r * 0.66, c[2]);
  const yb = Math.round(cy + w * 0.08); for (let x = Math.round(cx - w * 0.46); x <= Math.round(cx + w * 0.46); x++) { a_ps(R, mk, x, yb, c[0]); a_ps(R, mk, x, yb + 1, c[0]); }
}

// las nubes de un cielo: velos lejanos casi quietos, cúmulos medianos y grandes más rápidos (tres velocidades)
function a_nubes(R, mk, t, hor, c, o = {}) {
  const v = o.v ?? 1, n = o.n ?? 5;
  for (let k = 0; k < 4; k++) { const w = 30 + Math.round(h(k, 5, 302) * 40), x0 = ((h(k, 6, 302) * 440 + t * (0.8 + k * 0.3) * v) % 470) - 80, y = Math.max(24, Math.round(hor * (0.18 + k * 0.12)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (h(i >> 2, k, 303) < 0.2) continue; const e = Math.sin(i / w * Math.PI); a_ps(R, mk, x, y, e > 0.35 ? c[1] : c[0]); if (e > 0.6 && i % 4) a_ps(R, mk, x + 3, y - 1, c[2]); if (e > 0.5 && i % 5 === 0) a_ps(R, mk, x - 4, y + 1, c[0]); } }
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 30 + k * 12 : 14 + ((k * 7) % 10), vv = (cerca ? 4 + k * 1.4 : 1.5 + k * 0.4) * v, y = Math.round(cerca ? hor * (0.38 + k * 0.16) : hor * (0.26 + (k - 2) * 0.13)), x = ((h(k, 7, 302 + (o.sem ?? 0)) * 470 + t * vv) % 500) - 90;
    a_nube(R, mk, Math.round(x), y, w, k + (o.sem ?? 0), c); }
}

// los nubarrones de la tormenta: bancos largos y bajos que corren hacia la izquierda (los de abajo, más rápidos), con la
// panza en sombra y algún filo de luz; dens (0–1) los va abriendo; c = [sombra, cuerpo, luz]
function a_nubarrones(R, mk, t, c, v, dens) {
  for (let k = 0; k < 8; k++) { if (h(k, 9, 117) > dens + 0.15) continue; const L = 120 + Math.round(h(k, 1, 117) * 110), y = 12 + k * 10 + Math.round(h(k, 2, 117) * 4), x0 = (((h(k, 3, 117) * 520 - t * v * (5 + k * 1.6)) % 520) + 520) % 520 - 150;
    for (let i = 0; i < L; i += 7) { const r = Math.round(6 + Math.sin(i / L * Math.PI) * (6 + k) + h(i, k, 118) * 4), x = x0 + i; a_discoM(R, mk, x, y + 3, r, c[0]); }
    for (let i = 0; i < L; i += 7) { const r = Math.round(5 + Math.sin(i / L * Math.PI) * (5 + k) + h(i, k, 118) * 4), x = x0 + i; a_discoM(R, mk, x, y, r, c[1]); if (h(i, k, 119) < 0.4) a_discoM(R, mk, x - 2, y - r + 2, Math.max(1, r >> 2), c[2]); } }
}

// estrellas que titilan (solo en el cielo y fuera de la esquina de Atom)
function a_estrellas(R, mk, t, n, ymax, sem, c0, c1) {
  for (let k = 0; k < n; k++) { const x = Math.round(h(k, 1, sem) * 319), y = Math.round(h(k, 2, sem) ** 1.3 * ymax); if ((x > 272 && y < 48) || (y < 22 && x > 14 && x < 176)) continue; const tw = Math.sin(t * (1.3 + h(k, 3, sem) * 2.4) + k * 1.7);
    if (tw > -0.4) a_ps(R, mk, x, y, tw > 0.5 ? c1 : c0); if (k % 13 === 0 && tw > 0.7) { a_ps(R, mk, x - 1, y, c0); a_ps(R, mk, x + 1, y, c0); a_ps(R, mk, x, y - 1, c0); a_ps(R, mk, x, y + 1, c0); } }
}

// una luna con su halo tramado y sus manchas; c = [luna, sombra, halo]
function a_luna(R, mk, x, y, r, c) {
  for (let j = -r - 6; j <= r + 6; j++) for (let i = -r - 6; i <= r + 6; i++) { const d = Math.hypot(i, j), X = x + i, Y = y + j; if (X < 0 || X > 319 || Y < 0 || Y > 179) continue; const k = Y * 320 + X; if (mk && !mk[k]) continue;
    if (d <= r) R.buf[k] = d > r - 1 || (h(X >> 1, Y >> 1, 41) < 0.22 && d < r - 1.5) ? c[1] : c[0]; else if (d < r + 6 && a_um(X, Y) < (r + 6 - d) / 12) R.buf[k] = a_mez(R.buf[k], c[2], 0.3); }
}

// unos pájaros (cuervos) que cruzan aleteando
function a_pajaros(R, mk, t, n, y, v, c, sem = 0) {
  for (let k = 0; k < n; k++) { const x = Math.round(((h(k, 1, sem) * 400 + t * v * (0.8 + h(k, 2, sem) * 0.4)) % 420) - 50), yy = Math.round(y + h(k, 3, sem) * 16 + Math.sin(t * 0.7 + k) * 3), a = Math.floor(t * 5 + k * 2) % 2;
    if ((x > 266 && yy < 50) || (yy < 24 && x > 12 && x < 178)) continue; a_ps(R, mk, x, yy, c); a_ps(R, mk, x - 1, yy - a, c); a_ps(R, mk, x + 1, yy - a, c); a_ps(R, mk, x - 2, yy - 1 + a * 0, c); a_ps(R, mk, x + 2, yy - 1, c); }
}

// una cordillera de picos (suma de ondas en diente de sierra): roca con vetas, canales de nieve y las cumbres nevadas con
// su lado de luz (de cara a la izquierda) y su lado de sombra; abajo se funde tramada con la bruma. P = [roca, rocaS,
// nieve, nieveS, bruma]. Devuelve la cresta (la y de cada columna). Los picos no suben a la esquina de Atom.
function a_montes(R, y0, amp, yb, P, sem) {
  const tri = (u) => 1 - 2 * Math.abs(u - Math.floor(u) - 0.5), cr = new Array(320), B = R.buf;
  for (let x = 0; x < 320; x++) { const f = 0.55 * tri(x / 113 + sem * 0.37) + 0.3 * tri(x / 47 + sem * 0.71) + 0.15 * tri(x / 19 + sem * 1.3); let y = Math.round(y0 - amp * f); if (x > 268 && y < 50) y = 50; cr[x] = y; }
  for (let x = 0; x < 320; x++) {
    const top = cr[x], sl = cr[Math.min(319, x + 2)] - cr[Math.max(0, x - 2)], luz = sl <= 0, alt = (y0 - top) / amp;
    const nd = 2 + alt * amp * 0.42 + (h(x >> 1, 7, sem) - 0.5) * 5;
    for (let y = Math.max(0, top); y < yb; y++) {
      const d = y - top; let c;
      if (d < nd) c = luz ? (d === 0 || h(x, y, sem + 9) > 0.1 ? P[2] : P[3]) : P[3];
      else { c = luz ? P[0] : P[1]; if (h(x >> 1, y >> 2, sem + 3) < 0.08 && d < nd + 16) c = luz ? P[2] : P[3]; else if ((x + y * 2 + Math.round(h(x >> 3, 0, sem) * 9)) % 11 === 0) c = luz ? P[1] : P[0]; }
      const q = (y - (yb - 14)) / 14; if (q > 0 && a_um(x, y) < q) c = P[4];
      B[y * 320 + x] = c;
    }
  }
  return cr;
}

// un pino: tronco y pisos de ramas (luz a la izquierda, sombra a la derecha) con nieve en los filos y en las puntas;
// inc: cuánto se dobla la copa con el viento (px, negativo = a la izquierda). P = [sombra, cuerpo, luz, tronco, nieve, nieveS]
function a_pino(R, x, base, alto, P, inc = 0, nieve = true, sem = 0) {
  const n = Math.max(3, Math.round(alto / 8)), tr = Math.max(2, Math.round(alto * 0.12)), top = base - alto, cu = alto - tr;
  R.rect(x - (alto > 36 ? 1 : 0), base - tr - 2, x + (alto > 20 ? 1 : 0), base, P[3]);
  for (let i = 0; i < n; i++) {
    const ty0 = top + Math.round(i * cu * 0.8 / n), ty1 = top + Math.round((i + 1) * cu / n) + (i === n - 1 ? 0 : 2), wmax = alto * 0.34 * (0.3 + 0.7 * (i + 1) / n);
    for (let y = ty0; y <= ty1; y++) {
      if (y < 0 || y > 179) continue;
      const u = (y - ty0) / Math.max(1, ty1 - ty0), hw = Math.max(0.6, wmax * (0.12 + 0.88 * u)), b = (base - y) / alto, cx = x + inc * b * b, xa = Math.round(cx - hw), xb = Math.round(cx + hw);
      for (let xx = xa; xx <= xb; xx++) {
        if (xx < 0 || xx > 319) continue;
        const rel = (xx - cx) / hw; let c = rel < -0.3 ? P[2] : rel > 0.35 ? P[0] : P[1];
        if (y === ty1 || h(xx, y, sem) < 0.07) c = P[0];
        if (nieve) { const filo = Math.abs(rel) > 1 - 1.4 / hw && u < 0.85; if (filo) c = rel < 0.2 ? P[4] : P[5]; else if (u > 0.78 && Math.abs(rel) > 0.55 && h(xx, y, sem + 1) < 0.55) c = rel < 0 ? P[4] : P[5]; else if (h(xx, y, sem + 2) < 0.05) c = P[5]; }
        R.buf[y * 320 + xx] = c;
      }
    }
  }
}

// copos de nieve: o = { n, vx, vy, sem, c: [tenue, claro], tam (1|2), estela (px), x0, x1, y0, y1 (la caja donde se
// pintan), fuera: [x0, y0, x1, y1] (una caja donde NO se pintan), mk (máscara) }
function a_copos(R, t, o) {
  const x0 = o.x0 ?? 0, x1 = o.x1 ?? 319, y0 = o.y0 ?? 0, y1 = o.y1 ?? 179, W = x1 - x0 + 41, H = y1 - y0 + 1, sem = o.sem ?? 0, vx = o.vx, vy = o.vy, L = Math.hypot(vx, vy) || 1, F = o.fuera;
  const ps = (x, y, c) => { if (x < x0 || x > x1 || y < y0 || y > y1) return; if (F && x >= F[0] && x <= F[2] && y >= F[1] && y <= F[3]) return; a_ps(R, o.mk, x, y, c); };
  for (let k = 0; k < o.n; k++) {
    const va = 0.75 + h(k, 3, sem) * 0.5, x = Math.round(((h(k, 1, sem) * W + t * vx * va + Math.sin(t * (1 + h(k, 4, sem)) + k) * 3) % W + W) % W + x0 - 20), y = Math.round(((h(k, 2, sem) * H + t * vy * va) % H + H) % H + y0);
    const c = h(k, 5, sem) < 0.35 ? o.c[0] : o.c[1];
    if (o.estela) for (let i = 1; i <= o.estela; i++) ps(x - Math.round(vx / L * i), y - Math.round(vy / L * i), o.c[0]);
    ps(x, y, c); if ((o.tam ?? 1) > 1 && h(k, 6, sem) < 0.6) { ps(x + 1, y, c); ps(x, y + 1, c); ps(x + 1, y + 1, o.c[0]); }
  }
}

// un resplandor: mezcla el color c sobre lo que hay, más fuerte en el centro (a), en una elipse de radios r × ry
function a_luz(R, cx, cy, r, c, a, ry = r) {
  const B = R.buf; cx = Math.round(cx); cy = Math.round(cy);
  for (let y = Math.max(0, cy - ry); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, cx - r); x <= Math.min(319, cx + r); x++) {
    const d = Math.hypot((x - cx) / r, (y - cy) / ry); if (d >= 1) continue; const q = a * (1 - d) * (1 - d); if (q < 0.03) continue; const k = y * 320 + x; B[k] = a_mez(B[k], c, q); }
}

// una mancha tramada (humo, vaho, bruma): pinta c en una parte de los píxeles del disco, más en el centro
function a_mancha(R, cx, cy, r, c, a) {
  cx = Math.round(cx); cy = Math.round(cy); const rr = Math.round(r);
  for (let j = -rr; j <= rr; j++) for (let i = -rr; i <= rr; i++) { const d = Math.hypot(i, j) / (r + 0.01); if (d >= 1) continue; const x = cx + i, y = cy + j; if (x < 0 || x > 319 || y < 0 || y > 179) continue; if (a_um(x, y) < a * (1 - d * d)) R.buf[y * 320 + x] = c; }
}

// sillares de piedra entre (x0, y0) y (x1, y1): hiladas de alto hB y bloques de ancho wB a matajunta, cada bloque con su
// tono, su filo de luz arriba y de sombra abajo, grietas y musgo; P = [junta, cuerpo, sombra, luz, musgo]
function a_sillares(R, x0, y0, x1, y1, P, hB = 6, wB = 12, sem = 0) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const fila = Math.floor((y - y0) / hB), dy = (y - y0) % hB;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const off = (fila % 2) * (wB >> 1), col = Math.floor((x - x0 + off) / wB), dx = (x - x0 + off) % wB, q = h(col, fila, sem);
      let c = q < 0.3 ? P[2] : P[1];
      if (dy === hB - 1 || dx === wB - 1) c = P[0]; else if (dy === 0) c = q < 0.3 ? P[1] : P[3]; else if (dy === hB - 2 && h(x, y, sem + 1) < 0.5) c = P[2];
      else if (h(x, y, sem + 2) < 0.04) c = P[2]; else if (P[4] && dy > hB - 3 && h(x >> 1, fila, sem + 3) < 0.12) c = P[4];
      if (q > 0.93 && dx === ((col * 7) % (wB - 2)) + 1 && dy > 0 && dy < hB - 1) c = P[0];   // una grieta
      B[y * 320 + x] = c; } }
}

// tablas de madera entre (x0, y0) y (x1, y1), en vertical (o en horizontal con hz): vetas onduladas, nudos y juntas;
// P = [junta, cuerpo, sombra, luz]
function a_tablas(R, x0, y0, x1, y1, P, w = 8, hz = false, sem = 0) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const a = hz ? y - y0 : x - x0, b = hz ? x - x0 : y - y0, tb = Math.floor(a / w), da = a % w, q = h(tb, 0, sem);
    let c = q < 0.33 ? P[2] : P[1];
    if (da === w - 1) c = P[0]; else if (da === 0) c = P[3];
    else { const veta = Math.sin(b * 0.09 + tb * 3 + Math.sin(b * 0.031 + tb) * 2) * (w / 2.6) + w / 2; if (Math.abs(da - veta) < 0.6) c = q < 0.33 ? P[0] : P[2]; }
    const nx = Math.floor(h(tb, 1, sem) * 60), dn = Math.hypot(da - w / 2, (b % 60) - nx); if (dn < 1.6 && h(tb, Math.floor(b / 60), sem + 5) < 0.4) c = dn < 0.8 ? P[0] : P[2];   // nudos
    B[y * 320 + x] = c;
  }
}

// un estandarte que cuelga de su barra y ondea: pliegues de luz y sombra, el ribete, la cola en dos picos y el símbolo;
// P = [tela, sombra, luz, ribete, símbolo]; sim: 'ciervo' | 'doom'
function a_estandarte(R, x, y, w, alto, P, t, sim, fase = 0, amp = 1) {
  const { rect, pset } = R; rect(x - 2, y - 1, x + w + 1, y, a_K); pset(x - 3, y - 1, P[3]); pset(x + w + 2, y - 1, P[3]);
  for (let j = 0; j <= alto; j++) { const v = j / alto, dx = Math.round(Math.sin(t * 1.6 + fase + j * 0.16) * amp * v * 1.6), cola = j - (alto - w / 2);
    for (let i = 0; i < w; i++) { if (cola > 0 && Math.abs(i - (w - 1) / 2) < cola) continue;
      const pl = Math.sin(i * 0.8 + t * 1.6 + fase - j * 0.05); let c = pl > 0.6 ? P[2] : pl < -0.6 ? P[1] : P[0];
      if (i === 0 || i === w - 1 || (cola > 0 && Math.abs(i - (w - 1) / 2) < cola + 1)) c = a_K; else if (i === 1 || i === w - 2 || j === 2) c = P[3];
      pset(x + i + dx, y + 1 + j, c); } }
  const cx = x + Math.floor(w / 2) + Math.round(Math.sin(t * 1.6 + fase + alto * 0.064) * amp * 0.6), cy = y + Math.round(alto * 0.4);
  a_simbolo(R, cx, cy, sim, P[4], Math.max(2, Math.min(5, Math.floor(w / 2) - 3)));
}

// los símbolos sin letras: 'doom' (un aro con cuatro puntas) y 'ciervo' (la cabeza de un ciervo con su cornamenta)
function a_simbolo(R, cx, cy, sim, c, r = 3) {
  const { pset } = R;
  if (sim === 'doom') { for (let j = -r - 2; j <= r + 2; j++) for (let i = -r - 2; i <= r + 2; i++) { const d = Math.hypot(i, j); if (Math.abs(d - r) < 0.62 || (d > r && d <= r + 2.1 && (i === 0 || j === 0)) || (i === 0 && j === 0)) pset(cx + i, cy + j, c); } return; }
  const G = ['#.#...#.#', '.##...##.', '..#.#.#..', '...###...', '..#####..', '...###...', '...###...', '....#....'];
  G.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') pset(cx - 4 + i, cy - 4 + j, c); });
}

// una antorcha de pared: el soporte de hierro, el palo, la llama de tres tonos que tiembla y su resplandor
function a_antorcha(R, x, y, t, k = 0, glow = 0.3) {
  const { rect, pset } = R; rect(x - 2, y + 3, x + 2, y + 4, a_K); rect(x - 1, y, x + 1, y + 7, a_P.troncoS); pset(x, y, a_P.tronco);
  const f = Math.sin(t * 11 + k * 3) + Math.sin(t * 17 + k), hh = 5 + Math.round(f);
  a_luz(R, x, y - 3, 26, a_P.ambar, glow * (0.9 + f * 0.05), 22);
  for (let j = 0; j < hh; j++) { const w = j < hh - 2 ? 1 : 0, dx = j > 2 ? Math.round(Math.sin(t * 9 + k + j)) : 0; for (let i = -w; i <= w; i++) pset(x + i + dx, y - 1 - j, j < 2 && i === 0 ? a_P.fuegoL : j < hh - 2 ? a_P.fuego1 : a_P.fuego2); }
  pset(x - 2, y - 1, a_P.fuego2); pset(x + 2, y - 2, a_P.fuego3);
}

// una hoguera: corro de piedras, troncos cruzados con brasas, llamas de tres tonos que tiemblan, chispas que suben y humo
function a_hoguera(R, x, y, t, s = 1, humo = true) {
  const { pset, linea, disco } = R, H = Math.round(14 * s);
  linea(x - Math.round(7 * s), y - 1, x + Math.round(6 * s), y - Math.round(4 * s), a_P.troncoS); linea(x - Math.round(6 * s), y - Math.round(4 * s), x + Math.round(7 * s), y, a_P.tronco); linea(x - Math.round(6 * s), y, x + Math.round(6 * s), y - 1, a_P.troncoS);
  for (let i = -5; i <= 5; i++) if (h(i, Math.floor(t * 3), 79) < 0.5) pset(x + Math.round(i * s), y - 1 - (i & 1), a_P.brasa);
  for (let j = 0; j < H; j++) { const u = j / H, w = Math.pow(1 - u, 0.75) * 6 * s * (0.85 + 0.15 * Math.sin(t * 13 + j)), dx = Math.sin(t * 7 + j * 0.5) * u * 2.2 * s, wr = Math.round(w);
    for (let i = -wr; i <= wr; i++) { const rel = Math.abs(i) / (w + 0.01); if (u > 0.45 && h(i + 9, j + Math.floor(t * 12), 77) < (u - 0.4) * 1.3) continue; pset(x + i + Math.round(dx), y - 2 - j, rel < 0.38 && u < 0.55 ? a_P.fuegoL : rel < 0.72 && u < 0.85 ? a_P.fuego1 : u < 0.7 ? a_P.fuego2 : a_P.fuego3); } }
  for (let k = 0; k < 2; k++) { const u = (t * 2.1 + k * 0.5) % 1, lx = x + Math.round((k ? 3 : -3) * s + Math.sin(t * 6 + k) * 2), ly = y - H - Math.round(u * 6 * s); if (u < 0.7) { pset(lx, ly, a_P.fuego2); pset(lx, ly - 1, a_P.fuego3); } }
  for (let i = -3; i <= 3; i++) { const sx = x + Math.round(i * 3.4 * s), sy = y + (Math.abs(i) === 3 ? -1 : 1); disco(sx, sy, Math.max(1, Math.round(1.5 * s)), a_P.piedraS); pset(sx - 1, sy - 1, a_P.piedraL); }
  for (let k = 0; k < Math.round(9 * s); k++) { const u = (t * (0.45 + h(k, 4, 78) * 0.3) + h(k, 1, 78)) % 1, sx = x + Math.round(Math.sin(t * 2 + k * 2) * 3 + (h(k, 2, 78) - 0.5) * 14 * s * u), sy = y - H - Math.round(u * 46 * s); if (u < 0.85) pset(sx, sy, u < 0.35 ? a_P.fuegoL : u < 0.6 ? a_P.fuego1 : a_P.fuego3); }
  if (humo) for (let k = 0; k < 6; k++) { const u = (t * 0.11 + k / 6) % 1, cx = x + u * 30 * s + Math.sin(t * 0.8 + k) * 3, cy = y - H - 4 - u * 70 * s; a_mancha(R, cx, cy, (1.5 + u * 6) * s, u < 0.3 ? a_P.humo : a_P.humoN, 0.55 * (1 - u)); }
}

// una persona pequeña de fondo (unos 9 px): piernas que andan, abrigo o falda, cabeza con pañuelo o gorro; P = [ropa,
// pelo/gorro, piernas]; o.anda, o.dir, o.carga ('cubo' | 'lena' | 'farol' | 'antorcha'), o.hacha (parte leña)
function a_gente(R, x, suelo, t, P, o = {}) {
  const { pset, rect } = R, d = o.dir ?? 1, paso = o.anda ? Math.floor(t * 6 + x * 0.1) % 2 : 0; x = Math.round(x); suelo = Math.round(suelo);
  pset(x - 1 + paso, suelo, P[2]); pset(x + 1 - paso, suelo, P[2]); pset(x - 1, suelo - 1, P[2]); pset(x + 1, suelo - 1, P[2]);
  rect(x - 1, suelo - 6, x + 1, suelo - 2, P[0]); pset(x - 2, suelo - 2, P[0]); pset(x + 2, suelo - 2, P[0]); pset(x - d, suelo - 5, a_mez(P[0], a_K, 0.35));
  pset(x, suelo - 8, a_P.piel); pset(x + d, suelo - 7, a_P.piel); pset(x, suelo - 7, a_P.pielS); pset(x - d, suelo - 8, P[1]); pset(x, suelo - 9, P[1]); pset(x - d, suelo - 7, P[1]);
  if (o.carga === 'cubo') { pset(x + 2 * d, suelo - 4, a_P.piel); rect(Math.min(x + 2 * d, x + 3 * d), suelo - 3, Math.max(x + 2 * d, x + 3 * d), suelo - 2, hex('#7a7e8a')); }
  else if (o.carga === 'lena') { for (let i = -1; i <= 2; i++) pset(x + d * i, suelo - 6 - (i & 1), a_P.tronco); pset(x + d, suelo - 7, a_P.troncoS); }
  else if (o.carga === 'farol' || o.carga === 'antorcha') { pset(x + 2 * d, suelo - 5, a_P.piel); pset(x + 2 * d, suelo - 6, a_K); const f = Math.sin(t * 12 + x) > 0; pset(x + 2 * d, suelo - 7, f ? a_P.fuegoL : a_P.fuego1); if (o.carga === 'antorcha') pset(x + 2 * d, suelo - 8, a_P.fuego2); }
  if (o.hacha) { const u = (t * 1.2) % 1, alto = u < 0.5; pset(x + d, suelo - 6, a_P.piel); if (alto) { pset(x + d, suelo - 8, a_P.tronco); pset(x + d, suelo - 9, a_P.tronco); pset(x + 2 * d, suelo - 10, hex('#9aa0ac')); } else { pset(x + 2 * d, suelo - 5, a_P.tronco); pset(x + 3 * d, suelo - 4, a_P.tronco); pset(x + 4 * d, suelo - 4, hex('#9aa0ac')); } }
}

// geometría de un carromato (x: su borde izquierdo; s: escala)
function a_carroGeo(x, suelo, s) {
  const W = Math.round(58 * s), rr = Math.round(10 * s), y1 = suelo - Math.round(rr * 0.9), y0 = y1 - Math.round(24 * s), ya = y0 - Math.round(17 * s);
  return { x0: x, x1: x + W, y0, y1, ya, rr, suelo, s, ruedas: [[x + Math.round(11 * s), suelo - rr], [x + W - Math.round(12 * s), suelo - rr]], chim: [x + Math.round(W * 0.74), ya + Math.round(2 * s) - Math.round(6 * s)], farol: [x - Math.round(3 * s), y0 + Math.round(4 * s)], ventana: [x + Math.round(W * 0.38), y0 + Math.round(6 * s), x + Math.round(W * 0.56), y0 + Math.round(13 * s)] };
}

// un carromato romaní de lona en arco: la caja de madera pintada con tablas y adornos tallados, la ventanita, la lona
// con sus costillas y remiendos y nieve encima, dos ruedas grandes de radios pintados, las varas en el suelo, el porche con
// su escalerilla y la chimenea; P = { caja, cajaS, adorno, lona, lonaS, lonaL, rueda }
function a_carromato(R, x, suelo, s, P) {
  const g = a_carroGeo(x, suelo, s), { rect, linea, pset } = R, K = a_K, cx = (g.x0 + g.x1) / 2, rx = (g.x1 - g.x0) / 2 + 1, ry = g.y0 - g.ya;
  // las varas, apoyadas en la nieve por delante
  linea(g.x0 + 2, g.y1 - 2, g.x0 - Math.round(24 * s), suelo - 1, K); linea(g.x0 + 2, g.y1 - 1, g.x0 - Math.round(24 * s), suelo, a_P.troncoS); linea(g.x0 + 4, g.y1 - 1, g.x0 - Math.round(20 * s), suelo + 1, a_P.tronco);
  // la sombra en la nieve
  for (let xx = g.x0 - 2; xx <= g.x1 + 4; xx++) for (let j = 0; j < Math.max(2, Math.round(3 * s)); j++) { const y = suelo + j - 1; if (xx >= 0 && xx < 320 && y < 180 && a_um(xx, y) < 0.6) R.buf[y * 320 + xx] = a_mez(R.buf[y * 320 + xx], hex('#3a3a5a'), 0.45); }
  // la lona en arco con sus costillas y remiendos
  for (let y = g.ya; y <= g.y0; y++) { const u = (g.y0 - y) / ry, w = rx * Math.sqrt(Math.max(0, 1 - u * u));
    for (let xx = Math.round(cx - w); xx <= Math.round(cx + w); xx++) { const e = Math.abs(xx - cx) > w - 1.1 || y === g.ya, rel = (xx - cx) / (w + 0.01);
      let c = u > 0.62 ? P.lonaL : rel > 0.5 ? P.lonaS : P.lona; if ((xx - g.x0) % Math.max(4, Math.round(9 * s)) === 0) c = P.lonaS;
      if (h(xx >> 2, y >> 2, 51 + x) < 0.06) c = a_mez(c, P.adorno, 0.35);   // remiendos
      if (u > 0.82 && h(xx, y, 52) < 0.75) c = y === g.ya ? hex('#e8ecf6') : hex('#c8d0e4');   // nieve en el lomo
      pset(xx, y, e ? K : c); } }
  // la caja de madera: tablas, adornos y la ventanita
  rect(g.x0, g.y0, g.x1, g.y1, K); rect(g.x0 + 1, g.y0 + 1, g.x1 - 1, g.y1 - 1, P.caja);
  for (let xx = g.x0 + 3; xx < g.x1 - 1; xx += Math.max(3, Math.round(4 * s))) linea(xx, g.y0 + 3, xx, g.y1 - 3, P.cajaS);
  rect(g.x0 + 1, g.y0 + 1, g.x1 - 1, g.y0 + 2, P.adorno); rect(g.x0 + 1, g.y1 - 2, g.x1 - 1, g.y1 - 1, P.adorno);
  for (let xx = g.x0 + 2; xx < g.x1 - 1; xx += 3) { pset(xx, g.y0 + 2, P.cajaS); pset(xx + 1, g.y1 - 2, P.cajaS); }
  rect(g.x0 + 1, g.y0 + 1, g.x0 + 2, g.y1 - 1, P.adorno); rect(g.x1 - 2, g.y0 + 1, g.x1 - 1, g.y1 - 1, P.adorno);
  { const [a, b, c, d] = g.ventana; rect(a - 1, b - 1, c + 1, d + 1, K); rect(a, b, c, d, a_P.luzC); linea((a + c) >> 1, b, (a + c) >> 1, d, K); linea(a, (b + d) >> 1, c, (b + d) >> 1, K); rect(a, b, c, b, P.adorno); }
  // el porche con la escalerilla, delante (a la izquierda)
  rect(g.x0 - Math.round(4 * s), g.y1 - 2, g.x0, g.y1, K); for (let j = 1; j <= 3; j++) rect(g.x0 - Math.round((5 + j) * s), g.y1 + Math.round(j * 3 * s) - 2, g.x0 - Math.round((2 + j) * s), g.y1 + Math.round(j * 3 * s) - 2, a_P.tronco);
  // la chimenea
  rect(g.chim[0], g.chim[1], g.chim[0] + Math.max(1, Math.round(2 * s)), g.ya + Math.round(6 * s), K); rect(g.chim[0] - 1, g.chim[1], g.chim[0] + Math.max(1, Math.round(2 * s)) + 1, g.chim[1], hex('#3a3a44'));
  // las ruedas: llanta de hierro, radios pintados y el cubo
  for (const [wx, wy] of g.ruedas) { const r = g.rr;
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r + 0.3) continue; let c = null;
      if (d > r - 1.2) c = K; else if (d > r - 2.6) c = P.rueda[1]; else if (d < 2) c = d < 1 ? K : P.rueda[0]; else { const a = Math.atan2(j, i), sp = Math.abs(((a / (Math.PI / 5)) % 1 + 1) % 1 - 0.5); if (sp > 0.38) c = P.rueda[0]; }
      if (c !== null) pset(wx + i, wy + j, c); } }
  // el farol del porche
  { const [fx, fy] = g.farol; linea(fx, fy - 3, fx + 2, fy - 3, K); rect(fx - 1, fy - 2, fx + 1, fy + 1, K); pset(fx, fy - 1, a_P.luzCL); pset(fx, fy, a_P.luzC); }
  return g;
}

// un caballo pequeño de perfil (unos 22 × 16 px), con su manta: mueve la cola y de vez en cuando baja la cabeza a pacer;
// P = [cuerpo, sombra, crin, manta]
function a_caballo(R, x, suelo, t, P, dir = 1, k = 0) {
  const { pset } = R, X = (i) => x + i * dir, come = Math.sin(t * 0.35 + k * 2) > 0.3, cola = Math.round(Math.sin(t * 2.2 + k) * 1.5), resp = Math.sin(t * 2 + k) > 0.6 ? 1 : 0;
  for (const [lx, fase] of [[-7, 0], [-5, 1], [5, 0], [7, 1]]) for (let j = 0; j < 8; j++) { const y = suelo - j; pset(X(lx), y, j < 1 ? a_K : (fase ? P[1] : P[0])); }
  for (let j = -5; j <= 4; j++) for (let i = -9; i <= 9; i++) { if ((i / 9.6) ** 2 + (j / (5 + resp * 0.4)) ** 2 > 1) continue; let c = j < -2 ? a_mez(P[0], hex('#fff0d8'), 0.15) : j > 2 ? P[1] : P[0]; if (i > -4 && i < 3 && j < 1) c = j === -4 ? a_mez(P[3], a_K, 0.3) : (i + j) % 3 === 0 ? a_mez(P[3], hex('#e8c060'), 0.4) : P[3]; pset(X(i), suelo - 12 + j, c); }
  const hy = come ? suelo - 4 : suelo - 21, hx = come ? 12 : 13;
  for (let s = 0; s <= 6; s++) { const u = s / 6, nx = Math.round(7 + (hx - 7) * u), ny = Math.round(suelo - 14 + (hy + 2 - (suelo - 14)) * u); pset(X(nx), ny, P[0]); pset(X(nx + 1), ny, P[0]); pset(X(nx - 1), ny + 1, P[1]); pset(X(nx - 1), ny - 1, P[2]); }
  for (let i = 0; i < 5; i++) { pset(X(hx + i - 1), hy, P[0]); pset(X(hx + i - 1), hy + 1, i > 2 ? P[1] : P[0]); } pset(X(hx + 3), hy + 2, P[1]); pset(X(hx), hy - 1, P[2]); pset(X(hx + 1), hy - 1, P[0]); pset(X(hx + 1), hy, a_K);
  for (let j = 0; j < 8; j++) pset(X(-10 - (j > 3 ? cola : 0) - (j > 5 ? 1 : 0)), suelo - 14 + j, P[2]);
}

const a_PCA = pal({
  c0: '#1c2454', c1: '#2c3570', c2: '#48478a', c3: '#78579a', c4: '#b86488', c5: '#e8866e', c6: '#f8b47e', c7: '#fdd8a0',
  mR: '#5a5486', mRS: '#403e6a', mN: '#f6cac6', mNS: '#a08cb8', mB: '#c49cb0', m2R: '#3e3c66', m2RS: '#2e2c52', m2N: '#dcb2c2', m2NS: '#7a6c9c', m2B: '#5e5682',
  bS: '#16202c', b: '#1e2e38', bL: '#33464c', bT: '#2a1a14', bN: '#c4c4dc', bNS: '#8a8cb0',
  nv: '#cdd2e8', nvS: '#9ea6cc', nvL: '#eef0f8', nvD: '#7880aa', nvC: '#f6d4b4', barro: '#5e4a40', barroS: '#3e302c',
  n0: '#4a4680', n1: '#a06a96', n2: '#f0a898',
});

const a_CARROS = [
  { x: 22, suelo: 126, s: 0.66, P: { caja: '#2e6a4a', cajaS: '#1e4a34', adorno: '#e0b040', lona: '#7a6a8a', lonaS: '#54486a', lonaL: '#9a8aa8', rueda: ['#e0b040', '#3a2a1a'] } },
  { x: 198, suelo: 124, s: 0.6, P: { caja: '#2e4a8a', cajaS: '#1e3262', adorno: '#e8c050', lona: '#8a5a5a', lonaS: '#5e3a40', lonaL: '#a87a70', rueda: ['#c84a3a', '#3a2a1a'] } },
  { x: 262, suelo: 152, s: 1, P: { caja: '#a8302a', cajaS: '#7a1e1e', adorno: '#f0c040', lona: '#6a6a7e', lonaS: '#4a4a5c', lonaL: '#8a8a9c', rueda: ['#f0c040', '#3a2a1a'] } },
].map((c) => ({ ...c, P: Object.fromEntries(Object.entries(c.P).map(([k, v]) => [k, Array.isArray(v) ? v.map(hex) : hex(v)])) }));

function a_lvCampamento(R, t, o) {
  const P = a_PCA, FX = 184, FY = 142;
  const E = a_escena(R, 'campamento', () => {
    a_grad(R, 0, 108, [[0, P.c0], [0.16, P.c1], [0.32, P.c2], [0.47, P.c3], [0.6, P.c4], [0.72, P.c5], [0.84, P.c6], [0.94, P.c7]]);
    a_luz(R, 214, 100, 110, hex('#ffd8a0'), 0.35, 44);   // el resplandor del sol que acaba de ponerse
  }, () => {
    a_montes(R, 82, 42, 110, [P.mR, P.mRS, P.mN, P.mNS, P.mB], 1);
    a_montes(R, 98, 22, 118, [P.m2R, P.m2RS, P.m2N, P.m2NS, P.m2B], 2);
    // la nieve del claro: azul en la sombra del bosque, clara delante, con ondas del viento, brillos y la tierra pisada
    const B = R.buf;
    for (let y = 108; y < 180; y++) for (let x = 0; x < 320; x++) {
      const f = (y - 108) / 72; let c = f < 0.15 ? P.nvD : f < 0.35 ? (a_um(x, y) < (f - 0.15) * 5 ? P.nvS : P.nvD) : f < 0.6 ? (a_um(x, y) < (f - 0.35) * 4 ? P.nv : P.nvS) : P.nv;
      if (Math.sin(x * 0.07 + y * 0.9 + Math.sin(x * 0.02) * 4) > 0.93) c = f < 0.4 ? P.nvD : P.nvS;   // las ondas del viento
      if (h(x, y, 64) < 0.012) c = P.nvL;
      const dx = (x - FX) / 74, dy = (y - FY - 2) / 15, e = dx * dx + dy * dy, pa = Math.abs(y - (128 + (x - 40) * 0.12)) < 3 + (x - 40) * 0.02 && x > 40 && x < FX;   // la tierra pisada alrededor del fuego y el camino
      if (e < 1.3 && a_um(x, y) < (1.3 - e) * 0.9) c = P.nvS;   // la nieve pisada alrededor del fuego
      if ((e < 0.55 && h(x >> 2, y >> 1, 65) < 0.75 - e) || (pa && h(x >> 2, y >> 1, 66) < 0.35)) c = h(x, y, 67) < 0.25 ? P.barroS : h(x, y, 68) < 0.25 ? P.nvD : P.barro;
      B[y * 320 + x] = c; }
    // el bosque de pinos nevados detrás del claro (tres filas: las de atrás más pequeñas y más azules)
    const PB = [P.bS, P.b, P.bL, P.bT, P.bN, P.bNS], PB2 = [a_mez(P.bS, P.m2B, 0.35), a_mez(P.b, P.m2B, 0.35), a_mez(P.bL, P.m2B, 0.35), P.bT, a_mez(P.bN, P.m2N, 0.3), a_mez(P.bNS, P.m2B, 0.3)];
    for (let k = 0; k < 70; k++) { const x = Math.round(k * 4.7 + h(k, 1, 61) * 4) - 4; a_pino(R, x, 108 + Math.round(h(k, 2, 61) * 4), 12 + Math.round(h(k, 3, 61) * 10), PB2, 0, true, k); }
    for (let k = 0; k < 44; k++) { const x = Math.round(k * 7.6 + h(k, 1, 62) * 5) - 6; a_pino(R, x, 116 + Math.round(h(k, 2, 62) * 4), 16 + Math.round(h(k, 3, 62) * 16), PB, 0, true, k + 100); }
    // huellas que van y vienen
    for (let k = 0; k < 26; k++) { const x = Math.round(40 + k * 5.5), y = Math.round(130 + k * 0.6 + (k % 2) * 2); if (h(k, 0, 69) < 0.8) { R.pset(x, y, P.nvD); R.pset(x + 1, y, P.nvS); } }
    for (let k = 0; k < 14; k++) { const x = Math.round(240 - k * 4), y = Math.round(164 - k * 1.5 + (k % 2) * 2); R.pset(x, y, P.nvS); R.pset(x + 1, y, P.nvD); }
    // matas secas que asoman de la nieve
    for (let k = 0; k < 30; k++) { const x = Math.round(h(k, 1, 70) * 319), y = Math.round(122 + h(k, 2, 70) * 56); if (Math.abs(x - FX) < 60 && Math.abs(y - FY) < 16) continue; for (let i = 0; i < 4; i++) R.linea(x, y, x + i - 2, y - 2 - (i & 1) * 2, i & 1 ? hex('#8a7a5a') : hex('#6a5a44')); }
    // los carromatos (dos al fondo y el grande a la derecha)
    for (const c of a_CARROS) a_carromato(R, c.x, c.suelo, c.s, c.P);
    // el poste de los caballos, los barriles, el montón de leña, la rueda de repuesto y el tronco para sentarse
    { const { rect, pset, linea, disco } = R; rect(52, 120, 53, 138, a_K); rect(51, 119, 54, 120, a_P.tronco); linea(52, 124, 30, 128, hex('#a89070')); linea(52, 125, 12, 128, hex('#a89070'));
      for (const [bx, by] of [[86, 128], [93, 129]]) { rect(bx, by - 8, bx + 5, by, a_K); rect(bx + 1, by - 7, bx + 4, by - 1, hex('#7a4e2c')); rect(bx + 1, by - 6, bx + 4, by - 6, hex('#4a4a52')); rect(bx + 1, by - 2, bx + 4, by - 2, hex('#4a4a52')); pset(bx + 1, by - 5, hex('#9a6a3a')); rect(bx, by - 9, bx + 5, by - 8, hex('#e0e4f0')); }
      for (let j = 0; j < 4; j++) for (let i = 0; i < 6 - j; i++) { const lx = 236 + i * 4 + j * 2, ly = 132 - j * 3; disco(lx, ly, 1, a_P.troncoS); rect(lx - 1, ly - 1, lx + 1, ly + 1, a_P.tronco); pset(lx, ly, hex('#c89a5a')); }
      rect(237, 121, 255, 121, hex('#e8ecf6'));
      for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) { const d = Math.hypot(i, j); if (d < 5.4 && (d > 4.2 || (Math.abs(i) < 1 || Math.abs(j) < 1 || Math.abs(i - j) < 1) && d > 1)) pset(150 + i, 120 + j, d > 4.2 ? a_K : hex('#e0b040')); }
      rect(208, 138, 236, 141, a_K); rect(209, 138, 235, 140, a_P.tronco); rect(209, 138, 235, 138, hex('#e8ecf6')); for (let i = 211; i < 235; i += 5) pset(i, 140, a_P.troncoS); disco(208, 139, 2, hex('#c89a5a')); pset(208, 139, a_P.troncoS);
      // el caldero en su trípode, junto a la hoguera pequeña del fondo
      linea(90, 112, 96, 124, a_K); linea(102, 112, 96, 124, a_K); linea(96, 112, 96, 118, a_K); linea(89, 111, 103, 111, a_K); disco(96, 116, 3, hex('#2a2a30')); rect(93, 113, 99, 113, hex('#4a4a52')); }
  });
  R.copiar(E.b);
  // el cielo vivo: estrellas que salen arriba, nubes de tres tonos a tres velocidades y cuervos que cruzan
  a_estrellas(R, E.m, t, 24, 30, 71, hex('#6a6aa8'), hex('#e8e4f8'));
  a_nubes(R, E.m, t, 84, [P.n0, P.n1, P.n2], { n: 5, sem: 3 });
  a_pajaros(R, E.m, t, 3, 44, 7, hex('#2a2238'), 5);
  // el humo de las chimeneas de los carromatos
  for (const c of a_CARROS) { const g = a_carroGeo(c.x, c.suelo, c.s); for (let k = 0; k < 4; k++) { const u = (t * 0.09 + k / 4 + c.x * 0.01) % 1; a_mancha(R, g.chim[0] + u * 22 + Math.sin(t + k) * 2, g.chim[1] - 2 - u * 34, (1 + u * 4) * c.s, u < 0.4 ? hex('#8a7e98') : hex('#6a6488'), 0.6 * (1 - u)); }
    const fl = 0.18 + 0.05 * Math.sin(t * 9 + c.x); a_luz(R, g.farol[0], g.farol[1], Math.round(16 * c.s), a_P.luzC, fl, Math.round(12 * c.s)); a_luz(R, (g.ventana[0] + g.ventana[2]) / 2, (g.ventana[1] + g.ventana[3]) / 2, Math.round(12 * c.s), a_P.luzC, 0.12, Math.round(8 * c.s)); }
  // la ropa tendida, que ondea entre el carromato verde y un poste
  { const xa = 62, ya = 104, xb = 140, yb = 108, cols = [hex('#c84a4a'), hex('#e8d8b0'), hex('#4a6aa8'), hex('#e0b040'), hex('#7a4a8a')];
    R.linea(140, 108, 140, 124, a_K); for (let x = xa; x <= xb; x++) { const u = (x - xa) / (xb - xa); R.pset(x, Math.round(ya + (yb - ya) * u + Math.sin(u * Math.PI) * 4), hex('#3a3040')); }
    cols.forEach((c, i) => { const x = xa + 10 + i * 13, u = (x - xa) / (xb - xa), y = Math.round(ya + (yb - ya) * u + Math.sin(u * Math.PI) * 4), w = i % 2 ? 6 : 8, hh = i % 2 ? 9 : 6;
      for (let j = 1; j <= hh; j++) { const dx = Math.round(Math.sin(t * 2.2 + i + j * 0.3) * j / hh * 2); for (let ii = 0; ii < w; ii++) R.pset(x + ii + dx, y + j, j === hh || ii === w - 1 ? a_mez(c, a_K, 0.35) : (ii + j) % 5 === 0 ? a_mez(c, hex('#ffffff'), 0.25) : c); }
      R.pset(x + 1, y, a_K); R.pset(x + w - 2, y, a_K); }); }
  // los caballos atados al poste
  a_caballo(R, 18, 138, t, [hex('#6a4430'), hex('#4a2e20'), hex('#2a1a14'), hex('#a83a3a')], 1, 0);
  a_caballo(R, 38, 140, t, [hex('#d8ccbc'), hex('#a8988a'), hex('#5a4a40'), hex('#3a5a8a')], 1, 1);
  // la hoguera pequeña del fondo con el caldero que humea, y la grande del claro con su resplandor sobre la nieve
  a_hoguera(R, 96, 125, t, 0.55, false); for (let k = 0; k < 3; k++) { const u = (t * 0.3 + k / 3) % 1; a_mancha(R, 96 + Math.sin(t * 2 + k) * 2, 109 - u * 14, 1 + u * 2, hex('#c8c4d8'), 0.6 * (1 - u)); }
  a_luz(R, FX, FY - 6, 78, a_P.ambar, 0.34 + 0.04 * Math.sin(t * 8) + 0.03 * Math.sin(t * 13), 46);
  a_luz(R, 96, 122, 26, a_P.ambar, 0.25, 14);
  // gente pequeña del campamento: una mujer con un cubo, un muchacho con leña y un hombre que parte leña
  { const u = (t * 0.035) % 1, x = 70 + Math.abs(u * 2 - 1) * 120, d = u < 0.5 ? 1 : -1; a_gente(R, x, 126, t, [hex('#8a2a4a'), hex('#c84a3a'), hex('#3a2a2a')], { anda: true, dir: d, carga: 'cubo' }); }
  { const u = (t * 0.05 + 0.4) % 1, x = 300 - u * 150; if (u < 0.9) a_gente(R, x, 132, t, [hex('#4a5a3a'), hex('#2a2020'), hex('#2a2a2a')], { anda: true, dir: -1, carga: 'lena' }); }
  a_gente(R, 252, 130, t, [hex('#6a4a2a'), hex('#3a2a2a'), hex('#2a2020')], { hacha: true, dir: -1 }); { const u = (t * 1.2) % 1; if (u > 0.5 && u < 0.62) { R.pset(246, 127, hex('#c89a5a')); R.pset(244, 126, hex('#c89a5a')); } R.rect(245, 129, 248, 130, a_P.tronco); }
  // el perro dormido junto al fuego (respira)
  { const r = Math.sin(t * 2) > 0 ? 1 : 0, x = 214, y = 146; R.rect(x, y - 3 - r, x + 8, y, hex('#8a6a4a')); R.rect(x + 1, y - 1, x + 7, y, hex('#6a4a34')); R.rect(x + 8, y - 3, x + 11, y, hex('#8a6a4a')); R.pset(x + 10, y - 2, a_K); R.pset(x + 9, y - 4, hex('#5a4030')); R.pset(x - 1, y - 1, hex('#6a4a34')); R.pset(x - 2, y, hex('#6a4a34')); }
  a_hoguera(R, FX, FY, t, 1.15, true);
  const out = { suelo: 150, libre: [30, 260], fuego: [FX, FY], carros: a_CARROS.map((c) => { const g = a_carroGeo(c.x, c.suelo, c.s); return [g.x0, g.ya, g.x1, g.suelo]; }) };
  if (o.cuna) { const x = 112, s = 150, m = Math.sin(t * 1.6) * 1.2, { rect, linea, pset } = R;
    for (let i = 0; i <= 22; i++) { const u = i / 22, y = s - Math.round(Math.sin(u * Math.PI) * 2 + (u - 0.5) * m); pset(x + i, y, a_K); pset(x + i, y - 1, a_P.troncoS); }
    rect(x + 2, s - 12 - Math.round(m * 0.3), x + 20, s - 3, a_K); rect(x + 3, s - 11 - Math.round(m * 0.3), x + 19, s - 4, a_P.tronco); for (let i = x + 5; i < x + 19; i += 3) linea(i, s - 11, i, s - 5, a_P.troncoS);
    rect(x + 3, s - 13 - Math.round(m * 0.3), x + 19, s - 12, hex('#c84a4a')); for (let i = x + 4; i < x + 19; i += 2) pset(i, s - 13 - Math.round(m * 0.3), hex('#e0b040')); rect(x + 1, s - 16, x + 3, s - 4, a_K); rect(x + 19, s - 15, x + 21, s - 4, a_K); pset(x + 2, s - 17, hex('#e0b040')); pset(x + 20, s - 16, hex('#e0b040'));
    out.cuna = [x + 11, s]; }
  return out;
}

// lo de delante del campamento: el montón de leña con su hacha a la izquierda y matas nevadas en las esquinas
function a_campDelante(R, t) {
  const { rect, pset, disco, linea } = R;
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4 - j; i++) { const x = 4 + i * 7 + j * 3, y = 176 - j * 5; disco(x, y, 3, a_K); disco(x, y, 2, a_P.tronco); pset(x, y, hex('#d8aa6a')); pset(x - 1, y - 1, hex('#c89a5a')); }
  rect(2, 160, 30, 161, hex('#eef0f8')); linea(32, 170, 40, 160, a_P.tronco); rect(38, 158, 42, 160, hex('#9aa0ac')); pset(42, 159, hex('#d8dce4'));
  for (const [x0, s] of [[290, 1], [304, -1]]) for (let k = 0; k < 7; k++) { const x = x0 + k * 3 * s, a = Math.round(Math.sin(t * 1.8 + k) * 1); linea(x, 180, x + a + (k - 3), 166 + (k % 3) * 3, k % 2 ? hex('#6a5a44') : hex('#8a7a5a')); }
  rect(286, 177, 319, 179, hex('#dfe4f2')); for (let x = 286; x < 320; x += 2) pset(x, 176, hex('#c4cae0'));
}

const a_PCR = pal({ m: '#6e4024', mS: '#4c2a16', mL: '#925834', j: '#2a160c', te: '#2e1a10', teS: '#1e1008', rojo: '#9a2a2a', rojoS: '#6a1a1e', oro: '#d8a840', oroS: '#9a7428', verde: '#2a5a42', verdeS: '#1c3e2e', azul: '#2e4a7a', morado: '#5a2a6a', noche: '#141c3a', nocheS: '#0c1228', manta: '#8a3a3a' });

function a_lvCarromato(R, t, o) {
  const P = a_PCR, VX = 244, VY = 96, arco = (x) => Math.round(40 - 32 * Math.sqrt(Math.max(0, 1 - ((x - 160) / 176) ** 2)));
  const E = a_escena(R, 'carromato', null, () => {
    const { rect, pset, linea, disco } = R, B = R.buf;
    // el techo en arco: tablas curvas que se van hacia nosotros (más oscuras en las esquinas)
    // la pared de tablas
    a_tablas(R, 0, 0, 319, 149, [P.j, P.m, P.mS, P.mL], 9, false, 82);
    for (let x = 0; x < 320; x++) for (let y = 0; y < arco(x); y++) if (y < 44) { const ya = arco(x), banda = Math.floor((ya - y) / 5 + Math.abs(x - 160) * 0.02); let c = banda % 2 ? P.te : P.teS; if ((ya - y) % 5 === 0 || x % 40 === 0) c = P.j; else if (h(x >> 3, banda, 81) < 0.15) c = P.teS; B[y * 320 + x] = c; }   // el techo en arco con sus costillas
    for (let x = 0; x < 320; x++) { const ya = arco(x); pset(x, ya, P.j); pset(x, ya + 1, P.oroS); }
    // el friso pintado (rojo con volutas doradas) y el zócalo verde con paneles
    rect(0, 44, 319, 51, P.rojo); rect(0, 44, 319, 44, P.oroS); rect(0, 51, 319, 51, P.oroS); for (let x = 0; x < 320; x += 8) { pset(x + 3, 47, P.oro); pset(x + 4, 48, P.oro); pset(x + 5, 47, P.oro); pset(x + 1, 49, P.rojoS); pset(x + 7, 46, P.rojoS); }
    rect(0, 118, 319, 149, P.verde); rect(0, 118, 319, 119, P.oro); for (let x = 4; x < 316; x += 26) { rect(x, 123, x + 21, 145, P.verdeS); rect(x + 1, 124, x + 20, 144, P.verde); rect(x + 1, 124, x + 20, 124, P.oroS); pset(x + 10, 134, P.oro); pset(x + 9, 133, P.oroS); pset(x + 11, 135, P.oroS); }
    rect(0, 148, 319, 149, P.j);
    // la ventanita con sus cortinas (lo de fuera se pinta en cada fotograma)
    rect(49, 45, 91, 83, P.j); rect(50, 46, 90, 82, P.oroS); rect(52, 48, 88, 80, P.noche);
    for (let j = 0; j < 36; j++) { const w = Math.round(6 - j * 0.12); for (let i = 0; i < w; i++) { pset(50 + i, 46 + j, i === w - 1 ? P.rojoS : (i + j) % 4 === 0 ? P.rojoS : P.rojo); pset(90 - i, 46 + j, i === w - 1 ? P.rojoS : (i + j) % 4 === 0 ? P.rojoS : P.rojo); } }
    rect(48, 83, 92, 85, P.mL); rect(48, 85, 92, 85, P.j);
    // la repisa con tarros, cuencos, una figurita y ramos de hierbas que cuelgan debajo
    rect(140, 102, 252, 104, P.j); rect(140, 102, 252, 102, P.mL); for (const bx of [146, 246]) { linea(bx, 104, bx + 4, 110, P.j); pset(bx + 1, 105, P.mS); }
    [[150, 7, '#3a6a8a'], [158, 9, '#8a5a2a'], [166, 6, '#5a8a4a'], [190, 8, '#a83a3a'], [200, 5, '#d8c8a0'], [222, 7, '#5a4a8a']].forEach(([x, hh, c], i) => { rect(x, 101 - hh, x + 5, 101, a_K); rect(x + 1, 102 - hh, x + 4, 101, hex(c)); rect(x + 1, 102 - hh, x + 1, 101, a_mez(hex(c), hex('#ffffff'), 0.35)); rect(x + 1, 100 - hh, x + 4, 101 - hh, i % 2 ? hex('#c8a070') : a_K); });
    for (let i = 0; i < 9; i++) { pset(174 + i, 100, a_K); pset(174 + i, 101 - Math.round(Math.sin(i / 8 * Math.PI) * 2), P.mL); } rect(175, 98, 181, 100, P.mS);
    rect(210, 93, 214, 101, P.oroS); rect(211, 94, 213, 100, P.oro); pset(212, 92, P.oro);   // una figurita de latón
    for (const [x, c] of [[160, '#6a8a4a'], [186, '#8a7a4a'], [206, '#7a6a8a']]) { linea(x, 104, x, 108, a_K); for (let j = 0; j < 7; j++) for (let i = -2; i <= 2; i++) if (Math.abs(i) <= j / 3 + 0.5 && h(i, j, x) < 0.8) pset(x + i, 108 + j, j % 2 ? hex(c) : a_mez(hex(c), a_K, 0.3)); }
    // el portavelas (la llama se pinta en cada fotograma)
    rect(VX - 4, VY + 4, VX + 4, VY + 5, P.oroS); rect(VX - 3, VY + 3, VX + 3, VY + 3, P.oro); rect(VX + 4, VY + 2, VX + 5, VY + 3, P.oroS);
    // la estufa de hierro con su tubo hasta el techo
    rect(272, arco(274) + 2, 276, 118, a_K); rect(273, arco(274) + 2, 275, 118, hex('#2a2a30')); rect(270, 92, 278, 94, a_K);
    rect(262, 118, 292, 148, a_K); rect(263, 119, 291, 147, hex('#2e2e36')); rect(263, 119, 291, 120, hex('#4a4a56')); rect(266, 126, 288, 140, a_K); rect(267, 127, 287, 139, hex('#1a1a20')); rect(262, 148, 265, 150, a_K); rect(289, 148, 292, 150, a_K);
    for (let i = 268; i < 287; i += 3) linea(i, 128, i, 138, hex('#3a3a44'));
    // la cama de mantas: el marco de madera tallada, el colchón, la colcha de retales y las almohadas
    rect(8, 136, 116, 150, a_K); rect(9, 137, 115, 149, P.m); for (let x = 12; x < 114; x += 12) { rect(x, 139, x + 8, 147, P.mS); pset(x + 4, 143, P.oro); } rect(9, 137, 115, 137, P.oroS);
    rect(6, 116, 9, 150, a_K); rect(7, 115, 8, 149, P.mL); pset(7, 114, P.oro); rect(114, 124, 117, 150, a_K); rect(115, 123, 116, 149, P.mL); pset(115, 122, P.oro);
    const ret = ['#8a3a3a', '#d8a840', '#3a5a8a', '#4a7a4a', '#7a3a6a', '#c86a3a'].map(hex);
    for (let y = 128; y <= 136; y++) for (let x = 10; x <= 113; x++) { const c = ret[(Math.floor((x - 10) / 9) + Math.floor((y - 128) / 4) * 2) % 6]; pset(x, y, y === 128 ? a_mez(c, hex('#ffffff'), 0.25) : (x - 10) % 9 === 0 || (y - 128) % 4 === 0 ? a_mez(c, a_K, 0.35) : c); }
    for (let x = 10; x <= 113; x += 2) pset(x, 137, ret[(x >> 3) % 6]);   // los flecos
    rect(12, 121, 34, 128, a_K); rect(13, 122, 33, 127, hex('#e8dcc4')); rect(13, 126, 33, 127, hex('#c8b89c')); rect(36, 123, 52, 128, a_K); rect(37, 124, 51, 127, hex('#d8c8a8'));
    // el suelo de tablas y la alfombra tejida con su cenefa y flecos
    a_tablas(R, 0, 150, 319, 179, [P.j, P.mS, hex('#3a2010'), P.m], 6, true, 83);
    for (let y = 158; y <= 175; y++) for (let x = 118; x <= 262; x++) { const bx = x - 118, by = y - 158, borde = bx < 3 || bx > 141 || by < 2 || by > 15, dia = Math.abs(((bx % 18) - 9)) + Math.abs(by - 8) < 6;
      pset(x, y, borde ? (bx + by) % 2 ? P.oro : P.rojoS : dia ? ((bx % 18) === 9 && by === 8 ? P.oro : P.azul) : P.rojo); }
    for (let x = 118; x <= 262; x += 2) { pset(x, 176, P.oroS); pset(x + 1, 157, P.oroS); }
    // la luz de la vela y de la estufa: lo lejano se hunde en la penumbra (tramado)
    const osc = hex('#0e0a12');
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.min(Math.hypot(x - VX, (y - VY) * 1.1), Math.hypot(x - 277, y - 133) * 1.3, Math.hypot(x - 70, y - 64) * 1.6); const q = Math.min(0.68, Math.max(0, (d - 34) / 210)); if (q > 0) B[y * 320 + x] = a_mez(B[y * 320 + x], osc, q + (a_um(x, y) - 0.5) * 0.08); }
  });
  R.copiar(E.b);
  // fuera de la ventanita: la noche, los pinos nevados, el fuego lejano de otro carromato y la nieve que cae
  { const B = R.buf; for (let y = 48; y <= 80; y++) for (let x = 56; x <= 84; x++) { let c = y < 66 ? (a_um(x, y) < (y - 48) / 30 ? P.noche : P.nocheS) : P.noche; const cr = 66 + Math.round(Math.abs(((x + 3) % 9) - 4.5) * 2 - 6); if (y > cr) c = y > 74 ? hex('#8a94b8') : hex('#16202c'); if (y > 74 && h(x, y, 84) < 0.2) c = hex('#a8b4d0'); B[y * 320 + x] = c; }
    a_luz(R, 62, 74, 6, a_P.ambar, 0.6 + 0.1 * Math.sin(t * 9), 3); a_copos(R, t, { n: 14, vx: -4, vy: 9, sem: 85, c: [hex('#8a94b8'), hex('#e8ecf6')], x0: 56, x1: 84, y0: 48, y1: 80 }); if (Math.floor(t * 0.3) % 4 === 1) a_ps(R, null, 72, 52, hex('#e8ecf6')); }
  // los amuletos que cuelgan del techo y se mecen: un ojo azul, una herradura, una luna y un manojo de hierbas
  [[118, 48, 'ojo'], [146, 40, 'herradura'], [196, 44, 'luna'], [226, 50, 'hierbas'], [100, 38, 'ojo']].forEach(([x, largo, tipo], k) => {
    const y0 = arco(x) + 1, a = Math.sin(t * 1.1 + k * 1.7) * 0.08, ex = Math.round(x + Math.sin(a) * largo), ey = y0 + Math.round(Math.cos(a) * largo) - 14;
    R.linea(x, y0, ex, ey, hex('#5a4a3a'));
    if (tipo === 'ojo') { R.disco(ex, ey + 3, 3, hex('#2a5aa8')); R.disco(ex, ey + 3, 2, hex('#e8ecf6')); R.disco(ex, ey + 3, 1, hex('#4a8ad8')); R.pset(ex, ey + 3, a_K); }
    else if (tipo === 'herradura') { for (let j = 0; j < 7; j++) for (let i = -3; i <= 3; i++) { const d = Math.hypot(i, j - 3); if (d > 1.8 && d < 3.4 && j < 6) R.pset(ex + i, ey + 6 - j, j > 4 ? hex('#6a6a78') : hex('#9aa0ac')); } }
    else if (tipo === 'luna') { for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if (Math.hypot(i, j) < 3.3 && Math.hypot(i - 2, j - 1) > 2.6) R.pset(ex + i, ey + 4 + j, hex('#e0b040')); }
    else for (let j = 0; j < 9; j++) for (let i = -2; i <= 2; i++) if (Math.abs(i) <= j / 3 && h(i, j, 86) < 0.85) R.pset(ex + i + Math.round(a * j * 3), ey + j, j % 2 ? hex('#7a8a4a') : hex('#5a6a34'));
    R.pset(ex, ey, P.oro); });
  // las telas en guirnalda bajo el arco (se mecen apenas)
  for (let k = 0; k < 8; k++) { const xa = k * 40, xb = xa + 40, c = k % 2 ? P.rojo : P.morado, cs = k % 2 ? P.rojoS : hex('#3a1a4a'), s = Math.sin(t * 0.8 + k) * 0.6;
    for (let x = xa; x <= xb; x++) { const u = (x - xa) / 40, ya = arco(x) + 2, caida = Math.sin(u * Math.PI) * (7 + s); for (let y = ya; y <= ya + caida; y++) R.pset(x, Math.round(y), y > ya + caida - 1.2 ? P.oro : (x + Math.round(y)) % 5 === 0 ? cs : c); }
    R.pset(xa, arco(xa) + 4, P.oro); R.pset(xa, arco(xa) + 5, P.oroS); }
  // la vela que tiembla, con su halo, y la brasa de la estufa
  { const f = Math.sin(t * 9) * 0.6 + Math.sin(t * 23) * 0.4, alt = 7; R.rect(VX - 1, VY - alt + 3, VX + 1, VY + 2, hex('#ece0c4')); R.pset(VX + 1, VY - alt + 4, hex('#c8b898')); R.pset(VX - 1, VY - alt + 5, hex('#fff4dc'));
    a_luz(R, VX, VY - alt, 60, a_P.luzC, 0.16 + f * 0.03, 54); a_luz(R, VX, VY - alt, 14, a_P.luzCL, 0.35, 12);
    const fy = VY - alt + 2, dx = Math.round(f * 0.7); R.pset(VX, fy, hex('#3a2a1a')); R.pset(VX + dx, fy - 1, a_P.fuego1); R.pset(VX, fy - 1, a_P.fuegoL); R.pset(VX + dx, fy - 2, a_P.fuegoL); R.pset(VX + dx, fy - 3, a_P.fuego1); if (f > -0.2) R.pset(VX + dx, fy - 4, a_P.fuego2); }
  { const f = 0.5 + 0.5 * Math.sin(t * 2.3); for (let y = 128; y <= 138; y++) for (let x = 268; x <= 286; x += 3) if (h(x, y + Math.floor(t * 2), 87) < 0.18 + f * 0.12) R.pset(x, y, y > 134 ? a_P.brasa : a_P.fuego3); a_luz(R, 277, 140, 26, a_P.ambar, 0.18 + f * 0.06, 14); }
  // las motas de polvo que flotan en la luz
  for (let k = 0; k < 10; k++) { const x = Math.round(VX - 60 + h(k, 1, 88) * 90 + Math.sin(t * 0.4 + k) * 6), y = Math.round(60 + ((h(k, 2, 88) * 70 - t * 2) % 70 + 70) % 70); if (Math.sin(t * 2 + k) > -0.3) R.pset(x, y, hex('#e8c890')); }
  // el baúl de Cynthia: madera con herrajes; la tapa se abre (o.baul) y sale la luz cálida con motas doradas
  const u = Math.max(0, Math.min(1, o.baul ?? 0)), bx0 = 170, bx1 = 230, by0 = 128, by1 = 150, { rect, pset, linea } = R;
  rect(bx0, by0 + 4, bx1, by1, a_K); a_tablas(R, bx0 + 1, by0 + 5, bx1 - 1, by1 - 1, [P.j, hex('#7a4a28'), hex('#5a3418'), hex('#9a6234')], 4, true, 89);
  for (const x of [bx0 + 6, bx1 - 8]) { rect(x, by0 + 5, x + 2, by1 - 1, hex('#3a3a44')); pset(x + 1, by0 + 7, hex('#8a8a96')); pset(x + 1, by1 - 3, hex('#8a8a96')); }
  rect(bx0 + 1, by1 - 2, bx1 - 1, by1 - 1, hex('#3a3a44')); rect(bx0, by1, bx1, by1, a_K);
  if (u < 0.02) { rect(bx0 - 1, by0, bx1 + 1, by0 + 5, a_K); rect(bx0, by0 + 1, bx1, by0 + 4, hex('#8a5430')); rect(bx0, by0 + 1, bx1, by0 + 1, hex('#a8703c')); rect(bx0 + 6, by0 + 1, bx0 + 8, by0 + 4, hex('#3a3a44')); rect(bx1 - 8, by0 + 1, bx1 - 6, by0 + 4, hex('#3a3a44'));
    rect(197, by0 + 3, 203, by0 + 8, a_K); rect(198, by0 + 4, 202, by0 + 7, P.oro); pset(200, by0 + 6, a_K); }
  else {
    // dentro: el hueco oscuro, los lomos de libros y la luz que sube
    rect(bx0 + 1, by0 + 2, bx1 - 1, by0 + 6, hex('#2a1408')); [[176, '#5a2a6a'], [184, '#2e4a7a'], [191, '#8a2a2a'], [214, '#2a5a42'], [221, '#7a5a2a']].forEach(([x, c]) => { rect(x, by0 + 3, x + 5, by0 + 6, hex(c)); pset(x + 2, by0 + 4, P.oro); });
    const lh = Math.round(20 * u), ly = by0 + 2 - lh; rect(bx0 - 1, ly - 1, bx1 + 1, by0 + 2, a_K); rect(bx0, ly, bx1, by0 + 1, hex('#5a2a3a')); for (let y = ly + 2; y < by0; y += 3) rect(bx0 + 2, y, bx1 - 2, y, hex('#6a3448')); rect(bx0, by0 + 1, bx1, by0 + 1, hex('#8a5430'));
    rect(197, ly + 1, 203, ly + 3, P.oro);
    a_luz(R, 200, by0 - 4, 70, a_P.luzC, 0.35 * u, 46);
    for (let k = 0; k < 7; k++) { const x0 = 176 + k * 8, yb = by0 + 2; for (let j = 0; j < Math.round(34 * u); j++) { const x = x0 + Math.round(j * (k - 3) * 0.12), y = yb - j; if (y < 0) break; if (a_um(x, y) < 0.45 * u * (1 - j / 36)) pset(x, y, a_mez(R.pget(x, y), a_P.luzCL, 0.6)); } }
    for (let k = 0; k < 12; k++) { const v = (t * 0.25 + h(k, 1, 90)) % 1, x = Math.round(178 + h(k, 2, 90) * 44 + Math.sin(t * 2 + k) * 3), y = Math.round(by0 - v * 40 * u); if (v < 0.9) pset(x, y, v < 0.5 ? a_P.luzCL : P.oro); }
  }
  // los libros con símbolos sobre la manta
  if (o.libros) { [[52, '#5a2a6a', 'estrella'], [70, '#2e4a7a', 'ojo'], [86, '#7a2a2a', 'luna']].forEach(([x, c, s], i) => { const y = 128 - (i === 1 ? 1 : 0); rect(x, y - 4, x + 12, y, a_K); rect(x + 1, y - 3, x + 11, y - 1, hex(c)); rect(x + 1, y - 1, x + 11, y - 1, hex('#e8dcc4')); rect(x + 1, y - 3, x + 1, y - 1, a_mez(hex(c), a_K, 0.4));
      const cx = x + 6, cy = y - 2, g = P.oro; if (s === 'estrella') { pset(cx, cy - 1, g); pset(cx - 1, cy, g); pset(cx + 1, cy, g); pset(cx, cy + 1, g); pset(cx, cy, g); } else if (s === 'ojo') { pset(cx - 1, cy, g); pset(cx + 1, cy, g); pset(cx, cy - 1, g); pset(cx, cy + 1, g); pset(cx, cy, a_K); } else { pset(cx, cy - 1, g); pset(cx - 1, cy, g); pset(cx, cy + 1, g); } });
    rect(100, 121, 112, 128, a_K); rect(101, 122, 106, 127, hex('#f0e6cc')); rect(107, 122, 111, 127, hex('#e8dcc0')); R.disco(103, 124, 1, hex('#8a3a3a')); linea(108, 123, 110, 123, hex('#6a5a8a')); linea(108, 125, 110, 125, hex('#6a5a8a')); pset(104, 126, hex('#3a5a8a')); }
  return { suelo: 150, libre: [40, 200], baul: { x0: bx0, y0: by0, x1: bx1, y1: by1, luz: [200, by0 - 2] }, cama: { x0: 12, x1: 114, y: 130 }, vela: [VX, VY - 7], ventana: [52, 48, 88, 80] };
}

const a_PTN = pal({ c0: '#080c1a', c1: '#0e1426', c2: '#161e34', c3: '#202a42', c4: '#2c3650', mR: '#222a40', mRS: '#1a2034', mN: '#4a5674', mNS: '#36405c', mB: '#2c3650',
  lo: '#141c2c', loP: '#0c121e', nv: '#7a88aa', nvS: '#56628a', nvL: '#a4b2d0', nvD: '#3e4870', roca: '#3a3e52', rocaS: '#262a3a', rocaL: '#565c72', pS: '#0e1a1e', p: '#162628', pL: '#22383a', pT: '#1c140e', pN: '#a4b2d0', pNS: '#6a789c',
  n0: '#1a2236', n1: '#28324a', n2: '#3a4660' });

const a_PTA = pal({ c0: '#2a2a56', c1: '#4a4276', c2: '#7a5688', c3: '#b06c8e', c4: '#e0949a', c5: '#f6c4aa', mR: '#6a5a86', mRS: '#4e4470', mN: '#f0c4c8', mNS: '#a08aac', mB: '#c49cb0',
  lo: '#3a3458', loP: '#2a2648', nv: '#d8c8dc', nvS: '#a49ac0', nvL: '#fbe8e4', nvD: '#7a72a0', roca: '#5a5070', rocaS: '#40385a', rocaL: '#7a6e8a', pS: '#1e2632', p: '#283640', pL: '#3a4a52', pT: '#2a1e18', pN: '#f6e0e0', pNS: '#b4a4c4',
  n0: '#8a6a96', n1: '#d89aa4', n2: '#fde0d0' });

// el suelo de la tormenta: llano hasta x 200 y la ladera que sube a la derecha; la loma del fondo (antorchas)
const a_yLadera = (x) => (x < 200 ? 132 + Math.round(Math.sin(x * 0.05) * 1.5) : 132 - Math.round((x - 200) * 0.2));

const a_yLoma = (x) => Math.round(118 - Math.max(0, x - 120) * 0.24 + Math.sin(x * 0.09) * 2);

function a_tormentaFondo(R, P, amanece) {
  return a_escena(R, amanece ? 'tormenta1' : 'tormenta0', () => {
    a_grad(R, 0, 120, amanece ? [[0, P.c0], [0.2, P.c1], [0.4, P.c2], [0.6, P.c3], [0.78, P.c4], [0.92, P.c5]] : [[0, P.c0], [0.25, P.c1], [0.5, P.c2], [0.72, P.c3], [0.9, P.c4]]);
    if (amanece) a_luz(R, 230, 100, 130, hex('#ffe0c0'), 0.4, 40);
  }, () => {
    a_montes(R, 92, 36, 122, [P.mR, P.mRS, P.mN, P.mNS, P.mB], 4);
    // la loma del fondo, con su fila de pinos (por donde vienen las antorchas)
    const B = R.buf; for (let x = 0; x < 320; x++) for (let y = a_yLoma(x); y < 140; y++) B[y * 320 + x] = (y - a_yLoma(x)) < 2 ? P.nvD : a_um(x, y) < 0.3 ? P.loP : P.lo;
    for (let k = 0; k < 40; k++) { const x = Math.round(118 + k * 5.2 + h(k, 1, 91) * 3); a_pino(R, x, a_yLoma(x) + 2, 8 + Math.round(h(k, 2, 91) * 8), [P.loP, P.lo, a_mez(P.lo, P.nvD, 0.4), P.loP, a_mez(P.nvD, P.nv, 0.5), P.nvD], 0, true, k); }
    // la nieve del primer término: la ladera, con ventisqueros (ondas), brillos y piedras que asoman
    for (let x = 0; x < 320; x++) { const yl = a_yLadera(x); for (let y = yl; y < 180; y++) { const f = (y - yl) / (180 - yl); let c = f < 0.12 ? P.nvD : f < 0.4 ? (a_um(x, y) < (f - 0.12) * 3.5 ? P.nvS : P.nvD) : (a_um(x, y) < (f - 0.4) * 2.5 ? P.nv : P.nvS);
      const ola = Math.sin(x * 0.045 + y * 0.6 + Math.sin(x * 0.013 + y * 0.05) * 5); if (ola > 0.9) c = f < 0.4 ? P.nvS : P.nvL; else if (ola < -0.94) c = P.nvD; if (h(x, y, 92) < 0.01) c = P.nvL; B[y * 320 + x] = c; } }
    // matas secas, piedras y una rama caída que asoman de la nieve
    for (let k = 0; k < 26; k++) { const x = Math.round(40 + h(k, 1, 116) * 180), y = Math.round(138 + h(k, 2, 116) * 40); for (let i = 0; i < 4; i++) R.linea(x, y, x + i - 2 - (i & 1), y - 2 - (i & 1) * 2, i & 1 ? hex('#5a5048') : hex('#3e3836')); R.pset(x - 1, y + 1, P.nvD); }
    R.linea(150, 170, 176, 166, hex('#2a1e18')); R.linea(150, 171, 176, 167, hex('#3e2c20')); R.linea(160, 168, 166, 163, hex('#2a1e18')); R.linea(170, 167, 174, 162, hex('#2a1e18')); R.rect(152, 169, 174, 169, P.nvL);
    // las rocas nevadas, de aristas: el peñasco de la izquierda y el grupo de la derecha
    const PR = { r: P.roca, rS: P.rocaS, rL: P.rocaL, nv: P.nv, nvS: P.nvS, nvL: P.nvL };
    a_roca(R, 10, 162, 26, 20, PR, 93, true); a_roca(R, 32, 166, 13, 9, PR, 94, true); a_roca(R, 258, 156, 32, 17, PR, 95, true); a_roca(R, 232, 160, 13, 8, PR, 96, true); a_roca(R, 292, 160, 15, 12, PR, 97, true);
    for (let k = 0; k < 8; k++) { const x = Math.round(50 + h(k, 1, 98) * 170), y = Math.round(160 + h(k, 2, 98) * 16); R.rect(x, y, x + 2, y + 1, P.rocaS); R.rect(x, y - 1, x + 2, y - 1, P.nvL); }
  });
}
function a_lvTormenta(R, t, o) {
  const am = Math.max(0, Math.min(1, o.amanecer ?? 0)), N = a_PTN, A = a_PTA, E0 = a_tormentaFondo(R, N, false), E1 = am > 0 ? a_tormentaFondo(R, A, true) : E0;
  a_fundir(R, E0.b, E1.b, am);
  const mk = E0.m, mz = (k) => a_mez(N[k], A[k], am), calma = 1 - 0.85 * am;
  // las nubes bajas que corren con el viento (se abren al amanecer)
  a_bancos(R, mk, t, [mz('n0'), mz('n1'), mz('n2')], 3 * calma + 0.6, 1 - am * 0.6);
  if (am > 0.3) a_estrellas(R, mk, t, 10, 30, 99, hex('#c8b0d0'), hex('#fff0f0'));
  // las antorchas lejanas por la loma, con su portador
  const nA = Math.round(5 * Math.max(0, Math.min(1, o.antorchas ?? 0))), ant = [];
  for (let k = 0; k < nA; k++) { const x = Math.round(312 - ((t * 2.2 + k * 19) % 112)), y = a_yLoma(x) - 1 - (k % 2) * 3; ant.push([x, y - 7]);
    a_luz(R, x, y - 8, 12, a_P.ambar, 0.32 * (1 - am * 0.5), 10); a_gente(R, x - 1, y, t, [hex('#1a1a24'), hex('#14121a'), hex('#14121a')], { anda: true, dir: -1, carga: 'antorcha' });
    R.pset(x + 1, y - 9, a_P.fuego1); R.pset(x + 1, y - 10, Math.sin(t * 13 + k) > 0 ? a_P.fuegoL : a_P.fuego2); }
  // la ventisca de fondo (dos capas: lejana y media) y la rasante sobre la nieve
  const cs = [mz('nvS'), mz('nvL')];
  a_copos(R, t, { n: Math.round(110 * calma), vx: -70 * calma - 6, vy: 40, sem: 35, c: [mz('nvD'), mz('nvS')], tam: 1 });
  a_copos(R, t, { n: Math.round(70 * calma), vx: -110 * calma - 8, vy: 66, sem: 36, c: cs, tam: 1, estela: 2 });
  for (let k = 0; k < Math.round(9 * calma); k++) { const y = 140 + Math.round(h(k, 1, 37) * 36), x0 = Math.round(((h(k, 2, 37) * 400 - t * (90 + k * 9)) % 400 + 400) % 400) - 40, L = 20 + Math.round(h(k, 3, 37) * 30);
    for (let i = 0; i < L; i++) { const x = x0 + i, yy = y + Math.round(Math.sin(i * 0.2 + t * 3) * 1); if (a_um(x, yy) < 0.5 * Math.sin(i / L * Math.PI)) a_ps(R, null, x, yy, mz('nvL')); } }
  // los pinos que se doblan con el viento
  const PP = ['pS', 'p', 'pL', 'pT', 'pN', 'pNS'].map(mz);
  [[84, 133, 30], [128, 132, 22], [44, 134, 50], [246, 124, 62], [300, 112, 52], [176, 132, 16]].forEach(([x, b, al], k) => { const inc = -(4 + 3 * Math.sin(t * 1.7 + k * 1.3) + 2 * Math.sin(t * 4.1 + k)) * calma * al / 40; a_pino(R, x, b, al, PP, inc, true, k + 200); });
  return { suelo: 152, libre: [30, 220], antorchas: ant };
}
function a_abrigoFondo(R, P, amanece) {
  return a_escena(R, amanece ? 'abrigo1' : 'abrigo0', () => {
    a_grad(R, 0, 130, amanece ? [[0, P.c1], [0.3, P.c2], [0.6, P.c3], [0.85, P.c4]] : [[0, P.c1], [0.4, P.c2], [0.75, P.c3]]);
  }, () => {
    const B = R.buf, { pset } = R;
    // el bosque de detrás, en la bruma de la nieve (dos filas de pinos que se pierden)
    for (let k = 0; k < 36; k++) { const x = Math.round(k * 9.4 + h(k, 1, 101) * 6) - 6; a_pino(R, x, 122, 30 + Math.round(h(k, 2, 101) * 24), [a_mez(P.lo, P.c3, 0.5), a_mez(P.lo, P.c3, 0.4), a_mez(P.lo, P.c3, 0.25), P.loP, a_mez(P.nvD, P.c3, 0.3), a_mez(P.nvD, P.c3, 0.5)], 0, true, k + 300); }
    for (let k = 0; k < 26; k++) { const x = Math.round(k * 13 + h(k, 1, 102) * 8) - 4; a_pino(R, x, 128, 40 + Math.round(h(k, 2, 102) * 26), [P.loP, P.lo, a_mez(P.lo, P.nvD, 0.3), P.loP, P.nvD, a_mez(P.nvD, P.lo, 0.4)], 0, true, k + 340); }
    // la nieve del suelo, con un poco de musgo y agujas secas dentro del hueco
    for (let y = 126; y < 180; y++) for (let x = 0; x < 320; x++) { const f = (y - 126) / 54; let c = f < 0.2 ? P.nvD : (a_um(x, y) < (f - 0.2) * 2 ? P.nv : P.nvS); const ola = Math.sin(x * 0.05 + y * 0.7 + Math.sin(x * 0.02) * 4); if (ola > 0.92) c = P.nvL; else if (ola < -0.95) c = P.nvD;
      if (x > 128 && x < 192 && y > 140 && y < 160 && h(x, y, 103) < 0.08) c = h(x, y, 104) < 0.5 ? hex('#5a6a3a') : hex('#6a4e34'); B[y * 320 + x] = c; }
    // el pino enorme del centro: el tronco con corteza, raíces y las ramas bajas nevadas que hacen de techo
    for (let y = 0; y < 154; y++) { const w = 9 + y * 0.03 + Math.max(0, y - 124) * 0.7; for (let x = Math.round(160 - w); x <= Math.round(160 + w); x++) {
      const rel = (x - 160) / w, j = x - 160 + Math.round(Math.sin(y * 0.12 + Math.floor((x - 140) / 4)) * 1.2), m = ((j % 4) + 4) % 4, pl = Math.floor((j + 40) / 4);
      let c = rel < -0.5 ? hex('#5a4030') : rel > 0.4 ? hex('#2a1c14') : hex('#3e2c1e');
      if (Math.abs(rel) > 0.92) c = a_K;
      else if (m === 0 && h(pl, y >> 2, 105) < 0.85) c = hex('#22160e');   // las grietas de la corteza
      else if ((y + pl * 7) % 13 === 0) c = hex('#22160e');   // el corte entre placas
      else if (m === 1 && rel < 0.3) c = rel < -0.5 ? hex('#6e5240') : hex('#4e3828');   // el filo de luz de cada placa
      else if (rel < -0.45 && h(x, y, 106) < 0.12) c = a_mez(P.nvS, hex('#5a4030'), 0.4);   // nieve pegada del lado del viento
      else if (y > 118 && h(x >> 1, y >> 1, 124) < 0.07) c = hex('#4a5a3a');   // musgo
      pset(x, y, c); } }
    for (let r = 0; r < 4; r++) { const d = r < 2 ? -1 : 1, x0 = 160 + d * (8 + r % 2 * 4); for (let i = 0; i < 16; i++) { pset(x0 + d * i, 150 + Math.round(i * 0.25) + (r % 2), hex('#3e2c1e')); pset(x0 + d * i, 149 + Math.round(i * 0.25) + (r % 2), i % 3 ? P.nvS : hex('#5a4030')); } }
    // cada rama: la masa de agujas con mechones, el borde de abajo deshilachado, ramillas que cuelgan, la madera que
    // asoma y encima la nieve en bultos con su labio de sombra
    const rama = (x0, y0, x1, y1, g) => { const L = Math.hypot(x1 - x0, y1 - y0), d = Math.sign(x1 - x0) || 1;
      for (let i = 0; i <= L; i++) { const u = i / L, x = Math.round(x0 + (x1 - x0) * u), yc = y0 + (y1 - y0) * u + Math.sin(u * Math.PI) * 6, gg = g * (1 - u * 0.55);
        const arriba = Math.round(yc - gg), bajo = Math.round(yc + gg + 2 + h(x, 1, 120) * 3 + (h(x >> 1, 2, 120) < 0.3 ? 2 : 0)), nv = Math.max(1, Math.round((2 + Math.sin(i * 0.33 + x0) * 1.2 + h(x >> 2, 3, 120) * 1.8) * (1 - u * 0.4)));
        for (let y = arriba - nv; y <= bajo; y++) { let c;
          if (y < arriba) c = y === arriba - nv ? (h(x, y, 121) < 0.85 ? P.nvL : P.nv) : y === arriba - 1 ? (h(x, y, 122) < 0.5 ? P.nvS : P.nv) : h(x, y, 122) < 0.65 ? P.nvL : P.nv;
          else { const r = (y - arriba) / Math.max(1, bajo - arriba); c = r < 0.22 ? P.pL : r < 0.62 ? P.p : P.pS;
            if ((((x * 2 + y * 3 * d) % 5) + 5) % 5 === 0 && r > 0.12) c = r < 0.5 ? P.pS : P.p;   // los mechones de agujas
            if (y === bajo) c = P.pS; else if (r < 0.3 && h(x, y, 123) < 0.1) c = P.nvS; }
          pset(x, y, c); }
        if (u < 0.9 && h(i, 4, 120) < 0.35) pset(x, Math.round(yc), hex('#2a1c14'));
        if (h(x, 5, 120) < 0.2) { pset(x, bajo + 1, P.pS); if (h(x, 6, 120) < 0.45) pset(x, bajo + 2, P.pS); }
        if (i % 9 === 4 && u < 0.92) for (let k = 1; k <= 5; k++) { pset(x + d * k, bajo - 2 + k, k < 5 ? P.pS : P.p); pset(x + d * k, bajo - 3 + k, P.p); if (k === 1) pset(x + d * k, bajo - 4 + k, P.nv); }
      } };
    rama(146, 18, 30, 40, 6); rama(150, 46, 56, 70, 5); rama(174, 22, 274, 46, 6); rama(172, 52, 262, 74, 5); rama(140, 4, 70, 10, 4);
    // las dos rocas grandes que hacen el hueco (de aristas, con la cara de dentro a la luz), con su nieve, grietas y liquen
    const PR = { r: P.roca, rS: P.rocaS, rL: P.rocaL, nv: P.nv, nvS: P.nvS, nvL: P.nvL };
    a_roca(R, 78, 174, 44, 39, PR, 111, false); a_roca(R, 36, 178, 30, 20, PR, 112, false); a_roca(R, 246, 176, 48, 37, PR, 113, true); a_roca(R, 292, 178, 27, 19, PR, 114, true);
    // el ventisquero de primer término (por debajo de los pies)
    for (let x = 0; x < 320; x++) { const y0 = 168 + Math.round(Math.sin(x * 0.04) * 3 + Math.sin(x * 0.11) * 1.5); for (let y = y0; y < 180; y++) B[y * 320 + x] = y === y0 ? P.nvL : y < y0 + 3 ? P.nv : a_um(x, y) < 0.4 ? P.nvS : P.nv; }
  });
}
function a_lvAbrigo(R, t, o) {
  const am = Math.max(0, Math.min(1, o.amanecer ?? 0)), N = a_PTN, A = a_PTA, E0 = a_abrigoFondo(R, N, false), E1 = am > 0 ? a_abrigoFondo(R, A, true) : E0;
  a_fundir(R, E0.b, E1.b, am);
  const mk = E0.m, mz = (k) => a_mez(N[k], A[k], am), calma = 1 - 0.85 * am;
  // las estrellas y la luna entre las ramas (se apagan al amanecer), y las nubes de bordes tramados
  if (am < 0.7) { a_estrellas(R, mk, t, Math.round(50 * (1 - am / 0.7)), 100, 197, mz('nvD'), mz('nvL')); a_luna(R, mk, 234, 24, 8, [a_mez(hex('#eef0f8'), hex('#fff0e8'), am), hex('#b8c0d4'), hex('#dce4ff')]); }
  a_nubesT(R, mk, t, 110, [mz('n0'), mz('n1'), mz('n2')], { n: 5, v: 2.5 * calma + 0.5, sem: 11 });
  // fuera del hueco, la ventisca; dentro, unos pocos copos que caen despacio
  a_copos(R, t, { n: Math.round(150 * calma), vx: -90 * calma - 6, vy: 55, sem: 38, c: [mz('nvS'), mz('nvL')], tam: 1, estela: 1, fuera: [124, 80, 196, 179] });
  a_copos(R, t, { n: 7, vx: -4, vy: 10, sem: 39, c: [mz('nvS'), mz('nvL')], tam: 1, x0: 124, x1: 196, y0: 70, y1: 150 });
  // la luz pálida que baja sobre el hueco (luna entre las ramas; rosa y dorada al amanecer)
  const cl = a_mez(hex('#a8b8e8'), hex('#ffd8b0'), am), pul = 0.5 + 0.5 * Math.sin(t * 0.6);
  for (let y = 60; y < 156; y++) { const u = (y - 60) / 96, cx = 172 - u * 12, w = 10 + u * 26; for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) { const d = Math.abs(x - cx) / w; if (a_um(x, y) < (0.3 + 0.08 * pul + am * 0.12) * (1 - d) * (0.4 + u * 0.6)) R.pset(x, y, a_mez(R.pget(x, y), cl, 0.4)); } }
  a_luz(R, 160, 150, 50, cl, 0.26 + am * 0.14, 14);
  // la nieve que de vez en cuando se desprende de una rama
  for (let k = 0; k < 2; k++) { const T = 6 + k * 3, u = ((t + k * 4) % T) / 1.2, x0 = k ? 236 : 72, y0 = k ? 52 : 46; if (u < 1) for (let i = 0; i < 9; i++) a_ps(R, null, x0 + Math.round((h(i, k, 115) - 0.5) * 8 - u * 6), y0 + Math.round(u * u * (60 + i * 4) + h(i, 2, 115) * 4), i % 3 ? mz('nvL') : mz('nvS')); }
  return { suelo: 152, libre: [120, 200], hueco: { x0: 120, x1: 200, suelo: 152 } };
}
const a_PBA = pal({ c0: '#0a0e26', c1: '#121a3c', c2: '#1c2650', c3: '#283464', c4: '#344274', p: '#7a7c8c', pS: '#5a5c6c', pL: '#9a9cac', pJ: '#3e3e4c', musgo: '#4a5a4a', tej: '#3a3e5a', tejS: '#262a42', tejL: '#565c7c',
  azul: '#2a4a9a', azulS: '#1a3270', azulL: '#4a6ac0', blanco: '#e8ecf4', oro: '#d8b040', nv: '#b8c4e0', nvS: '#8090b8', nvL: '#e4ecf8', nvD: '#5a6894', pat: '#ffb860', patL: '#ffe0a0', n0: '#1a2244', n1: '#2a3460', n2: '#3e4a7a' });

function a_lvBaron(R, t, o) {
  const P = a_PBA;
  if (o.lejos) return a_baronLejos(R, t, o);
  const E = a_escena(R, 'baron', () => { a_grad(R, 0, 100, [[0, P.c0], [0.3, P.c1], [0.6, P.c2], [0.85, P.c3]]); }, () => {
    const { rect, pset, linea } = R, B = R.buf, PS = [P.pJ, P.p, P.pS, P.pL, P.musgo];
    // el torreón del fondo
    a_sillares(R, 96, 30, 224, 70, [P.pJ, P.pS, a_mez(P.pS, P.pJ, 0.4), P.p, null], 5, 10, 121); for (let x = 96; x <= 224; x += 8) rect(x, 26, x + 4, 30, P.pS); rect(96, 30, 224, 30, P.pL);
    for (const wx of [112, 140, 176, 204]) { rect(wx - 1, 40, wx + 5, 52, a_K); rect(wx, 41, wx + 4, 52, P.pat); rect(wx, 41, wx + 4, 42, P.patL); linea(wx + 2, 41, wx + 2, 52, a_K); }
    // la muralla de sillares con almenas nevadas y aspilleras
    a_sillares(R, 0, 62, 319, 150, PS, 7, 14, 122);
    for (let x = 0; x < 320; x += 12) { rect(x, 54, x + 7, 62, a_K); a_sillares(R, x + 1, 55, x + 6, 62, PS, 4, 6, 123 + x); rect(x + 1, 54, x + 6, 55, P.nvL); pset(x + 2, 56, P.nv); }
    rect(0, 62, 319, 63, P.pJ); rect(0, 64, 319, 64, P.nv);
    for (const ax of [30, 60, 100, 214, 254, 290]) { rect(ax, 80, ax + 1, 94, a_K); rect(ax - 1, 86, ax + 2, 87, a_K); }
    // las dos torres redondas con su tejado cónico
    const torre = (cx, top, w) => { for (let y = top; y < 150; y++) for (let x = cx - w; x <= cx + w; x++) { const rel = (x - cx) / w, fila = Math.floor((y - top) / 6), dx = Math.round((rel * 0.5 + 0.5) * 22 + (fila % 2) * 3); let c = rel < -0.4 ? P.pL : rel > 0.5 ? P.pS : P.p; if (Math.abs(rel) > 0.93) c = a_K; else if ((y - top) % 6 === 5 || dx % 5 === 0) c = P.pJ; else if (rel > 0.75) c = a_mez(P.pS, P.pJ, 0.5); B[y * 320 + x] = c; }
      for (let j = 0; j < 24; j++) { const ww = Math.round((w + 3) * j / 24); for (let x = cx - ww; x <= cx + ww; x++) { const rel = (x - cx) / (ww + 0.1); pset(x, top - 24 + j, Math.abs(rel) > 0.9 || j === 23 ? a_K : (x + j) % 4 === 0 ? P.tejS : rel < -0.3 ? P.tejL : rel > 0.4 ? P.tejS : P.tej); if (j > 2 && rel < -0.2 && h(x, j, 124) < 0.35) pset(x, top - 24 + j, P.nv); } }
      rect(cx - w - 3, top - 1, cx + w + 3, top + 1, a_K); rect(cx - w - 2, top - 1, cx + w + 2, top - 1, P.nvL);
      for (const wy of [top + 14, top + 40]) { rect(cx - 3, wy, cx + 2, wy + 8, a_K); rect(cx - 2, wy + 1, cx + 1, wy + 8, P.pat); pset(cx - 2, wy + 1, P.patL); rect(cx - 3, wy + 9, cx + 2, wy + 9, P.nv); } };
    torre(40, 48, 18); torre(256, 48, 18);
    // la torre de la puerta con el arco, el rastrillo alzado y la luz del patio al fondo
    a_sillares(R, 126, 44, 194, 150, PS, 7, 12, 125); for (let x = 126; x < 194; x += 10) { rect(x, 38, x + 6, 44, a_K); a_sillares(R, x + 1, 39, x + 5, 44, PS, 3, 5, 126 + x); rect(x + 1, 38, x + 5, 38, P.nvL); } rect(124, 44, 196, 45, P.pJ);
    for (let y = 96; y <= 150; y++) for (let x = 138; x <= 182; x++) { const dx = x - 160, dy = y - 118, d = Math.hypot(dx, dy); const dentro = Math.abs(dx) <= 19 && (dy >= 0 || d <= 19); const arco = Math.abs(dx) <= 22 && (dy >= 0 ? Math.abs(dx) > 19 : d > 19 && d <= 22);
      if (arco) { const a = Math.atan2(-dy, dx); B[y * 320 + x] = ((a / 0.3) % 1 + 1) % 1 < 0.14 ? P.pJ : dy < 0 ? P.pL : P.pS; } else if (dentro) { const f = (y - 100) / 50; let c = a_um(x, y) < f ? P.pat : a_mez(P.pat, hex('#a85a2a'), 0.5); if (y > 140) c = (x + y) % 3 ? hex('#c88a4a') : hex('#a86a3a'); if (y > 124 && y < 140 && (x === 146 || x === 174)) c = hex('#6a3a1a'); B[y * 320 + x] = c; } }
    for (let i = 0; i < 4; i++) { const px = 148 + i * 8, ph = 2 + (i % 2) * 6; rect(px, 100, px + 1, 101 + ph, a_K); }
    rect(142, 100, 178, 101, a_K); for (let x = 143; x < 178; x += 4) pset(x, 102, a_K);   // el rastrillo alzado
    for (const [x0, d] of [[141, 1], [179, -1]]) for (let y = 120; y <= 150; y++) for (let i = 0; i < 5; i++) pset(x0 + i * d, y, i === 4 ? a_K : (y % 6 === 0 ? hex('#3a2414') : hex('#6a4024')));   // las hojas de la puerta, abiertas
    // ventanas de la muralla, con su reja
    for (const [wx, wy] of [[86, 100], [226, 100], [10, 110], [300, 112]]) { rect(wx - 1, wy - 1, wx + 6, wy + 10, a_K); rect(wx, wy, wx + 5, wy + 9, P.pat); rect(wx, wy, wx + 5, wy + 1, P.patL); linea(wx + 2, wy, wx + 2, wy + 9, a_K); linea(wx, wy + 4, wx + 5, wy + 4, a_K); rect(wx - 1, wy + 10, wx + 6, wy + 10, P.nvL); }
    // el suelo: el camino de piedra hasta la puerta, con rodadas en la nieve, y los ventisqueros al pie del muro
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const f = (y - 150) / 30, xl = 140 - f * 50, xr = 180 + f * 50; let c;
      if (x > xl && x < xr) { const fila = Math.floor((y - 150) / (2 + f * 3)), dx = (x - 160) / (1 + f * 2.5) + fila * 2.5; c = ((y - 150) % Math.round(2 + f * 3) === 0 || ((dx % 5) + 5) % 5 < 0.6) ? P.pJ : h(Math.floor(dx / 5), fila, 127) < 0.3 ? P.pS : P.p; if (h(x, y, 128) < 0.25) c = P.nvS; if (Math.abs(x - 160 - (f * 22 + 8)) < 1.2 || Math.abs(x - 160 + (f * 22 + 8)) < 1.2) c = P.nvD; }
      else { c = a_um(x, y) < f * 1.4 ? P.nv : P.nvS; const ola = Math.sin(x * 0.06 + y * 0.8 + Math.sin(x * 0.03) * 3); if (ola > 0.9) c = P.nvL; if (h(x, y, 129) < 0.01) c = P.nvL; }
      B[y * 320 + x] = c; }
    for (let x = 0; x < 320; x++) { if (x > 136 && x < 184) continue; const hh = 3 + Math.round(Math.sin(x * 0.07) * 2 + h(x >> 2, 0, 130) * 2); for (let j = 0; j < hh; j++) pset(x, 150 - j, j === hh - 1 ? P.nvL : P.nv); }
  });
  R.copiar(E.b);
  a_estrellas(R, E.m, t, 60, 50, 131, hex('#7a84b8'), hex('#f0f2ff')); a_luna(R, E.m, 196, 20, 7, [hex('#f4ecd0'), hex('#c8c0a8'), hex('#fff8dc')]);
  a_nubes(R, E.m, t, 70, [P.n0, P.n1, P.n2], { n: 4, sem: 13 });
  // las banderolas de las torres y los dos estandartes del ciervo junto a la puerta
  for (const [x, y, k] of [[40, 28, 0], [256, 28, 1]]) { R.rect(x, y - 12, x, y, a_K); for (let j = 0; j < 4; j++) for (let i = 1; i <= 9 - j; i++) R.pset(x + i, y - 12 + j + Math.round(Math.sin(t * 5 + i * 0.6 + k) * 1), j === 0 ? P.azulL : P.azul); }
  a_estandarte(R, 98, 66, 16, 40, [P.azul, P.azulS, P.azulL, P.oro, P.blanco], t, 'ciervo', 0, 0.8);
  a_estandarte(R, 206, 66, 16, 40, [P.azul, P.azulS, P.azulL, P.oro, P.blanco], t, 'ciervo', 1.7, 0.8);
  // las antorchas de la puerta, la luz del patio y las ventanas que tiemblan
  a_antorcha(R, 130, 108, t, 0, 0.35); a_antorcha(R, 190, 108, t, 1, 0.35);
  a_luz(R, 160, 132, 36, P.pat, 0.18 + 0.04 * Math.sin(t * 7), 22);
  if (Math.floor(t * 0.4) % 3 === 0) R.rect(204, 41, 208, 52, hex('#3a2a20'));   // una ventana que se apaga
  // los centinelas que pasean por el adarve (asoman entre las almenas) y uno en la puerta del patio
  for (let k = 0; k < 2; k++) { const u = (t * 0.03 + k * 0.5) % 1, x = Math.round(k ? 300 - u * 280 : 20 + u * 280), d = k ? -1 : 1; a_gente(R, x, 61, t, [hex('#5a5e66'), hex('#2a2430'), hex('#2a2a30')], { anda: true, dir: d, carga: k ? 'farol' : null }); R.pset(x + 2 * d, 50, hex('#8a8a96')); R.linea(x + 2 * d, 51, x + 2 * d, 57, a_P.troncoS); }
  a_gente(R, 166, 140, t, [hex('#5a5e66'), hex('#2a2430'), hex('#2a2a30')], { dir: -1 });
  return { suelo: 150, libre: [30, 290], puerta: { x0: 141, x1: 179, y0: 99, y1: 150 } };
}

function a_baronLejos(R, t, o) {
  const P = a_PBA, col = (x) => Math.min(150, Math.round(94 + ((x - 218) / 62) ** 2 * 34));
  const E = a_escena(R, 'baronLejos', () => { a_grad(R, 0, 130, [[0, P.c0], [0.25, P.c1], [0.5, P.c2], [0.75, P.c3], [0.92, P.c4]]); }, () => {
    const { rect, pset, linea } = R, B = R.buf;
    a_montes(R, 98, 32, 124, [hex('#2e3656'), hex('#222a46'), hex('#8a98c0'), hex('#5a6890'), hex('#2e3656')], 5);
    // el valle: la nieve y tres filas de pinos que se pierden en la bruma
    for (let y = 116; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = a_um(x, y) < (y - 116) / 34 ? P.nvS : P.nvD;
    const PB = (a) => [a_mez(hex('#101a20'), P.c3, a), a_mez(hex('#18262c'), P.c3, a), a_mez(hex('#24363a'), P.c3, a), hex('#1a1410'), a_mez(P.nv, P.c3, a * 0.6), a_mez(P.nvS, P.c3, a)];
    for (let k = 0; k < 64; k++) { const x = Math.round(k * 5.1 + h(k, 1, 131) * 4) - 4; a_pino(R, x, 122 + Math.round(h(k, 2, 131) * 3), 8 + Math.round(h(k, 3, 131) * 7), PB(0.5), 0, true, k + 450); }
    for (let k = 0; k < 46; k++) { const x = Math.round(k * 7.2 + h(k, 1, 138) * 5) - 4; a_pino(R, x, 132 + Math.round(h(k, 2, 138) * 4), 12 + Math.round(h(k, 3, 138) * 9), PB(0.25), 0, true, k + 520); }
    // la colina del castillo, con el bosque que sube por las faldas y el camino en zigzag hasta la puerta
    for (let x = 150; x < 290; x++) for (let y = col(x); y < 150; y++) { let c = (y - col(x)) < 2 ? P.nvL : a_um(x, y) < 0.35 + (x - 218) / 200 ? P.nvS : P.nv; if (Math.sin(x * 0.2 + y * 0.9) > 0.94) c = P.nvS; B[y * 320 + x] = c; }
    for (let k = 0; k < 70; k++) { const x = Math.round(152 + h(k, 1, 132) * 136), base = col(x) + 6 + Math.round(h(k, 2, 132) * (150 - col(x) - 6)); if (Math.abs(x - 218) < 22 && base < 118) continue; a_pino(R, x, base, 7 + Math.round(h(k, 3, 132) * 7), PB(0.12), 0, true, k + 400); }
    const cam = [[196, 146], [232, 132], [204, 120], [226, 108], [212, 98]]; for (let i = 0; i < cam.length - 1; i++) { linea(cam[i][0], cam[i][1], cam[i + 1][0], cam[i + 1][1], P.nvD); linea(cam[i][0], cam[i][1] - 1, cam[i + 1][0], cam[i + 1][1] - 1, P.nvL); }
    // el castillo: muralla con almenas, el torreón, tres torres con tejado cónico y ventanas encendidas
    const S = [P.pJ, P.pS, a_mez(P.pS, P.pJ, 0.4), P.p, null];
    a_sillares(R, 178, 66, 260, 96, S, 3, 6, 133); for (let x = 178; x < 260; x += 4) { rect(x, 63, x + 2, 66, P.pS); pset(x, 63, P.nvL); pset(x + 1, 63, P.nvL); } rect(178, 66, 260, 66, P.pL);
    a_sillares(R, 202, 42, 236, 68, S, 3, 6, 134); for (let x = 202; x < 236; x += 4) { rect(x, 39, x + 2, 42, P.pS); pset(x, 39, P.nvL); }
    for (const [cx, top, w] of [[182, 52, 6], [256, 54, 6], [219, 30, 6]]) { rect(cx - w, top, cx + w, 96, P.pS); rect(cx - w, top, cx - w + 2, 96, P.p); rect(cx + w - 1, top, cx + w, 96, P.pJ); for (let y = top + 3; y < 96; y += 4) rect(cx - w, y, cx + w, y, P.pJ);
      for (let j = 0; j < 13; j++) { const ww = Math.round((w + 2) * j / 12); rect(cx - ww, top - 13 + j, cx + ww, top - 13 + j, j < 4 ? P.nvL : j % 3 ? P.tej : P.tejS); rect(cx - ww, top - 13 + j, cx - ww + Math.round(ww * 0.5), top - 13 + j, j < 4 ? P.nvL : P.tejL); } }
    rect(213, 84, 225, 96, a_K); rect(214, 86, 224, 96, P.pat); rect(214, 85, 224, 85, a_K); for (let y = 88; y < 96; y += 3) rect(214, y, 224, y, hex('#a86a2a'));   // la puerta con el rastrillo y la luz
    for (const [x, y] of [[208, 50], [214, 50], [224, 50], [230, 50], [190, 76], [244, 76], [182, 62], [256, 64], [219, 40], [200, 80], [238, 80]]) { rect(x, y, x + 1, y + 2, P.pat); pset(x, y, P.patL); }
    rect(176, 96, 262, 97, P.nvL);
    // las casas del pueblo al pie de la colina, con su nieve en el tejado
    for (let k = 0; k < 11; k++) { const x = 160 + k * 12 + Math.round(h(k, 1, 135) * 4), y = 140 + Math.round(h(k, 2, 135) * 6); rect(x, y - 6, x + 8, y, hex('#4a3a32')); rect(x + 6, y - 6, x + 8, y, hex('#3a2e2a')); for (let j = 0; j < 5; j++) rect(x - 1 + j, y - 6 - j, x + 9 - j, y - 6 - j, j > 1 ? P.nvL : P.nv); if (h(k, 3, 135) < 0.7) { rect(x + 2, y - 4, x + 3, y - 3, P.pat); } rect(x + 6, y - 12, x + 7, y - 8, hex('#3a2e2a')); }
    // la loma del primer término, nevada, con rocas y un pino seco
    for (let x = 0; x < 320; x++) { const y0 = Math.round(150 - Math.max(0, 1 - Math.abs(x - 100) / 170) * 8 + (x > 200 ? (x - 200) * 0.12 : 0)); for (let y = y0; y < 180; y++) { let c = y < y0 + 2 ? P.nvL : a_um(x, y) < (y - y0) / 40 ? P.nv : P.nvS; if (Math.sin(x * 0.06 + y * 0.8) > 0.93) c = P.nvD; if (h(x, y, 139) < 0.01) c = P.nvL; B[y * 320 + x] = c; } }
    for (const [x, y, w] of [[10, 156, 12], [270, 172, 16], [300, 168, 10]]) { for (let j = 0; j < w * 0.6; j++) for (let i = -w; i <= w; i++) if ((i / w) ** 2 + (j / (w * 0.6)) ** 2 < 1) pset(x + i, y - j, j > w * 0.38 ? (i < 0 ? P.nvL : P.nv) : i < -w * 0.3 ? P.p : i < w * 0.3 ? P.pS : P.pJ); }
    for (let k = 0; k < 14; k++) { const x = Math.round(20 + h(k, 1, 140) * 200), y = Math.round(150 + h(k, 2, 140) * 26); for (let i = 0; i < 4; i++) linea(x, y, x + i - 2, y - 2 - (i & 1) * 2, i & 1 ? hex('#5a5048') : hex('#3e3836')); }
    linea(36, 150, 32, 112, hex('#2a1e18')); linea(37, 150, 33, 112, hex('#3a2a20')); for (const [y, l, d] of [[118, 10, -1], [126, 14, 1], [136, 9, -1], [122, 7, 1]]) { linea(33, y, 33 + l * d, y - 5, hex('#2a1e18')); pset(33 + l * d, y - 6, P.nvL); pset(33 + l * d - d, y - 5, P.nvL); }
  });
  R.copiar(E.b);
  a_estrellas(R, E.m, t, 80, 80, 136, hex('#7a84b8'), hex('#f0f2ff')); a_luna(R, E.m, 86, 34, 9, [hex('#f4ecd0'), hex('#c8c0a8'), hex('#fff8dc')]);
  a_nubes(R, E.m, t, 90, [P.n0, P.n1, P.n2], { n: 4, sem: 17 });
  for (const [x, y, k] of [[219, 17, 0], [182, 39, 1], [256, 41, 2]]) { R.pset(x, y, a_K); R.pset(x, y + 1, a_K); for (let i = 1; i <= 4; i++) R.pset(x + i, y + Math.round(Math.sin(t * 5 + i + k)), P.azulL); }
  for (const [x, y] of [[208, 50], [224, 50], [190, 76], [244, 76], [219, 40]]) if (Math.sin(t * 3 + x) > 0.2) R.pset(x + 1, y + 1, P.patL);
  for (let k = 0; k < 11; k += 2) { const x = 166 + k * 12, y = 128; for (let j = 0; j < 3; j++) { const u = (t * 0.12 + j / 3 + k * 0.1) % 1; a_mancha(R, x + u * 10, y - u * 18, 1 + u * 2, hex('#5a6488'), 0.5 * (1 - u)); } }
  a_copos(R, t, { n: 30, vx: -6, vy: 10, sem: 137, c: [P.nvS, P.nvL], tam: 1 });
  return { suelo: 150, libre: [20, 200], castillo: [176, 17, 262, 97] };
}

function a_lvAlcoba(R, t, o) {
  const P = a_PBA, vel = Math.max(0, Math.min(1, o.velas ?? 0)), VC = [[256, 110], [260, 108], [264, 110]], VV = [112, 92];
  const E = a_escena(R, 'alcoba', null, () => {
    const { rect, pset, linea } = R, B = R.buf;
    a_sillares(R, 0, 0, 319, 149, [hex('#2e2e3a'), hex('#5a5a6a'), hex('#4a4a5a'), hex('#6e6e7e'), null], 8, 16, 141);
    // el tapiz azul del ciervo, colgado de su barra, con flecos
    rect(2, 18, 34, 19, a_K); for (let y = 20; y < 74; y++) for (let x = 4; x <= 32; x++) { let c = (x + y) % 2 ? P.azul : hex('#24408a'); if (x < 6 || x > 30 || y < 22 || y > 71) c = (x + y) % 3 ? P.oro : hex('#a8842a'); pset(x, y, c); }
    a_simbolo(R, 18, 44, 'ciervo', P.blanco); for (let x = 4; x <= 32; x += 2) pset(x, 74, P.oro);
    // la puerta de roble entreabierta (la luz del pasillo detrás)
    for (let y = 80; y <= 150; y++) for (let x = 38; x <= 82; x++) { const dx = x - 60, dy = y - 100, d = Math.hypot(dx, dy); const hueco = Math.abs(dx) <= 20 && (dy >= 0 || d <= 20), marco = Math.abs(dx) <= 22 && !hueco && (dy >= 0 || d <= 22);
      if (marco) B[y * 320 + x] = h(x, y, 142) < 0.5 ? hex('#7a7a8a') : hex('#6a6a7a'); else if (hueco) { const f = (y - 80) / 70; B[y * 320 + x] = a_um(x, y) < 0.5 + f * 0.3 ? hex('#e8a060') : hex('#c8804a'); } }
    a_sillares(R, 41, 84, 79, 150, [hex('#8a5a3a'), hex('#d89a5a'), hex('#c8884a'), hex('#e8b070'), null], 6, 10, 143);   // el pasillo iluminado
    for (let y = 82; y <= 150; y++) for (let x = 40; x <= 54; x++) { const dy = y - 100, d = Math.hypot(x - 60, dy); if (dy < 0 && d > 20) continue; let c = (x - 40) % 5 === 4 ? hex('#3a2414') : hex('#6a4024'); if (x === 40 || x === 54) c = a_K; if (y === 112 || y === 136) c = hex('#3a3a44'); pset(x, y, c); }
    pset(52, 124, P.oro); pset(52, 125, hex('#a8842a'));
    for (let y = 120; y <= 150; y++) for (let x = 56; x <= 80; x++) if (a_um(x, y) < 0.3 * (1 - (y - 120) / 30)) pset(x, y, hex('#f0b878'));
    // la ventana ojival con su alféizar
    for (let y = 30; y <= 92; y++) for (let x = 96; x <= 128; x++) { const dx = x - 112, dy = y - 46, d = Math.hypot(dx, dy); const hueco = Math.abs(dx) <= 12 && (dy >= 0 || d <= 12), marco = Math.abs(dx) <= 15 && !hueco && (dy >= 0 || d <= 15) && y <= 90; if (marco) B[y * 320 + x] = (y + x) % 7 === 0 ? hex('#4a4a5a') : hex('#7a7a8a'); else if (hueco) B[y * 320 + x] = hex('#141c3a'); }
    rect(94, 90, 130, 93, hex('#8a8a9a')); rect(94, 93, 130, 93, a_K); rect(94, 90, 130, 90, hex('#a8a8b8'));
    // el aguamanil: la mesita, la jofaina y la jarra, y un manojo de hierbas del curandero
    rect(92, 128, 112, 130, a_K); rect(93, 128, 111, 129, hex('#6a4024')); rect(94, 130, 95, 150, a_K); rect(109, 130, 110, 150, a_K); rect(94, 142, 110, 143, a_K);
    for (let i = 0; i < 12; i++) pset(96 + i, 127 - Math.round(Math.sin(i / 11 * Math.PI) * 2), hex('#d8dce4')); rect(97, 125, 107, 127, hex('#e8ecf4')); rect(104, 118, 108, 126, a_K); rect(105, 119, 107, 126, hex('#c8a070')); pset(108, 120, a_K);
    // el dosel de la cama: postes, cielo con cenefa y cortinas azules recogidas
    rect(148, 50, 151, 150, a_K); rect(149, 50, 150, 150, hex('#6a4024')); rect(250, 50, 253, 150, a_K); rect(251, 50, 252, 150, hex('#6a4024'));
    rect(146, 46, 256, 56, a_K); rect(147, 47, 255, 55, P.azulS); for (let x = 147; x < 256; x++) { const v = Math.round(Math.sin((x - 147) / 110 * Math.PI * 6) * 2); for (let y = 55; y < 58 + v; y++) pset(x, y, P.azul); pset(x, 58 + v, P.oro); } rect(147, 47, 255, 48, P.azulL);
    for (const [x0, d] of [[152, 1], [249, -1]]) for (let y = 58; y < 140; y++) { const w = y < 96 ? 12 - Math.round((y - 58) * 0.25) : y < 104 ? 3 : 3 + Math.round((y - 104) * 0.2); for (let i = 0; i < w; i++) pset(x0 + i * d, y, (i + Math.round(y * 0.2)) % 4 === 0 ? P.azulS : i < 2 ? P.azulL : P.azul); if (y === 98 || y === 99) for (let i = 0; i < 5; i++) pset(x0 + i * d, y, P.oro); }
    // la cabecera tallada, la cama con su colcha y el bulto de la enferma
    rect(230, 100, 249, 124, a_K); rect(231, 101, 248, 124, hex('#5a3418')); rect(234, 104, 245, 120, hex('#7a4a28')); pset(239, 103, P.oro);
    rect(152, 124, 248, 140, a_K); for (let y = 124; y < 140; y++) for (let x = 153; x < 248; x++) pset(x, y, y < 128 ? P.blanco : (x + y) % 6 === 0 ? P.azulS : (x >> 3) % 2 ? P.azul : hex('#3a5aa8')); for (let x = 153; x < 248; x += 2) pset(x, 140, P.oro);
    rect(152, 140, 248, 146, hex('#4a2a14')); rect(152, 146, 248, 150, a_K);
    rect(222, 116, 244, 124, a_K); rect(223, 117, 243, 123, P.blanco); rect(223, 122, 243, 123, hex('#c8ccd8'));
    // (la enferma, su bulto bajo la colcha y su cabeza en la almohada se pintan en cada fotograma: respira)
    // la mesilla, el sillón y la alfombra
    rect(252, 112, 270, 114, a_K); rect(253, 112, 269, 113, hex('#6a4024')); rect(254, 114, 268, 150, a_K); rect(255, 115, 267, 149, hex('#5a3418')); rect(257, 118, 265, 128, hex('#6a4024')); pset(261, 123, P.oro);
    rect(272, 108, 306, 150, a_K); rect(274, 110, 304, 128, hex('#7a2a3a')); for (let x = 276; x < 304; x += 6) pset(x, 118, hex('#d8a040')); rect(272, 128, 306, 136, hex('#8a3a4a')); rect(272, 128, 306, 128, hex('#a84a5a')); rect(272, 120, 276, 150, hex('#5a3418')); rect(302, 120, 306, 150, hex('#5a3418')); rect(273, 136, 305, 150, hex('#4a2a14'));
    a_tablas(R, 0, 150, 319, 179, [hex('#2a1a10'), hex('#5a3a22'), hex('#4a2e1a'), hex('#6e4a2c')], 6, true, 144);
    for (let y = 156; y <= 176; y++) for (let x = 100; x <= 300; x++) { const bx = x - 100, by = y - 156, borde = bx < 4 || bx > 196 || by < 3 || by > 17; pset(x, y, borde ? ((bx + by) % 3 ? P.oro : hex('#8a6a2a')) : (Math.abs((bx % 20) - 10) + Math.abs(by - 10) < 5 ? P.azulL : (bx + by) % 2 ? P.azul : P.azulS)); }
    // la penumbra: la luz baja con la distancia a las velas y a la puerta
    const osc = hex('#0a0a16');
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.min(Math.hypot(x - 260, (y - 108) * 1.1), Math.hypot(x - 60, (y - 130) * 0.8) * 1.1, Math.hypot(x - 112, y - 86) * 1.4); const q = Math.min(0.66, Math.max(0, (d - 36) / 190)); if (q > 0) B[y * 320 + x] = a_mez(B[y * 320 + x], osc, q + (a_um(x, y) - 0.5) * 0.08); }
  });
  R.copiar(E.b);
  // fuera de la ventana: la noche y la nieve que cae
  { const ins = (x, y) => Math.abs(x - 112) <= 12 && (y >= 46 || Math.hypot(x - 112, y - 46) <= 12) && y <= 89; for (let k = 0; k < 6; k++) { const x = 102 + k * 4, y = 80 + Math.round(Math.sin(k * 2) * 2); for (let j = y; j <= 89; j++) if (ins(x, j)) R.pset(x, j, hex('#1a2234')); }
    for (let k = 0; k < 24; k++) { const x = Math.round(100 + ((h(k, 1, 145) * 24 - t * 3 + Math.sin(t + k) * 2) % 24 + 24) % 24), y = Math.round(34 + ((h(k, 2, 145) * 56 + t * 9) % 56)); if (ins(x, y)) R.pset(x, y, k % 3 ? hex('#c8d0e4') : hex('#7a86a8')); }
    R.linea(112, 34, 112, 89, a_K); R.linea(100, 62, 124, 62, a_K); }
  // las velas que se consumen: el candelabro de la mesilla y la del alféizar
  const alto = Math.round(12 - vel * 9), luz = 1 - vel * 0.45;
  { const { rect, pset } = R; rect(254, 111, 266, 112, P.oro); rect(259, 104, 261, 111, P.oro); rect(255, 108, 265, 108, P.oro);
    VC.forEach(([x, y], k) => { const a = alto + (k === 1 ? 2 : 0), top = y - a; rect(x - 1, top, x + 1, y - 1, hex('#ece4cc')); pset(x + 1, top + 1, hex('#c8bc9c')); if (vel > 0.3) pset(x - 1, top + 2, hex('#ffffff')); const f = Math.sin(t * 9 + k * 2); pset(x, top - 1, a_P.fuego1); pset(x, top - 2, a_P.fuegoL); if (f > -0.3) pset(x + (f > 0.6 ? 1 : 0), top - 3, a_P.fuego2); });
    const [wx, wy] = VV, a = Math.round(8 - vel * 6); rect(wx - 3, wy - 1, wx + 3, wy - 1, P.oro); rect(wx - 1, wy - 1 - a, wx + 1, wy - 2, hex('#ece4cc')); pset(wx, wy - 2 - a, a_P.fuego1); pset(wx, wy - 3 - a, a_P.fuegoL); if (Math.sin(t * 11) > 0) pset(wx, wy - 4 - a, a_P.fuego2);
    a_luz(R, 260, 104 - alto, 80, a_P.luzC, (0.2 + 0.03 * Math.sin(t * 9)) * luz, 60); a_luz(R, wx, wy - a - 3, 26, a_P.luzC, 0.2 * luz, 22); }
  // LA BARONESA ENFERMA: el bulto bajo la colcha (pies, piernas, cadera y pecho, que sube y baja al respirar), con su
  // filo de luz de las velas, sus pliegues y su sombra; el embozo blanco doblado y la cabeza en la almohada (el pelo
  // rubio extendido hacia la cabecera, la cara pálida de perfil hacia la habitación, los ojos cerrados)
  { const { pset } = R, re = 0.5 + 0.5 * Math.sin(t * 1.5), PERF = [[166, 0], [168, 3], [172, 5], [176, 4], [180, 3.5], [192, 4], [200, 5.5], [206, 7.5], [212, 8], [218, 8.5], [223, 8], [226, 3]];
    const alt = (x) => { for (let k = 1; k < PERF.length; k++) if (x <= PERF[k][0]) { const [x0, a0] = PERF[k - 1], [x1, a1] = PERF[k], f = (x - x0) / (x1 - x0); return a0 + (a1 - a0) * (f * f * (3 - 2 * f)); } return 0; };
    const BO = hex('#1a2450'), CL = hex('#6a8ad8'), CM = hex('#3a5aa8'), CS = hex('#24408a');
    for (let x = 166; x <= 226; x++) { const a = alt(x) + (x > 200 ? re * 1.2 * Math.min(1, (x - 200) / 8) : 0), top = Math.round(124 - a); if (top >= 124) continue;
      for (let y = top; y <= 124; y++) { const d = y - top; let c = d === 0 ? BO : d === 1 ? (x < 214 ? CL : hex('#8aa4e8')) : d < 3 ? hex('#4a6ac0') : (x + y * 2) % 9 === 0 ? CS : CM;
        if (d > 1 && ((x === 179 || x === 199) || (x - y) % 13 === 0 && d > 2)) c = CS; if (d > 2 && y > 121) c = a_mez(c, a_K, 0.25); pset(x, y, c); } }
    // el embozo blanco doblado sobre el pecho, con su sombra, y la cenefa dorada
    for (let x = 212; x <= 224; x++) { const top = Math.round(124 - alt(x) - re * 1.2); pset(x, top, BO); pset(x, top + 1, P.blanco); pset(x, top + 2, P.blanco); pset(x, top + 3, hex('#c8ccd8')); if (x % 2) pset(x, top + 4, P.oro); }
    // la cabeza en la almohada (centro x 229, y 116): el pelo detrás y hacia la cabecera, la cara delante y libre
    const PE = hex('#d8b860'), PL = hex('#f0d890'), PS = hex('#a8883a'), PIEL = hex('#ecd6c8'), PIS = hex('#c8a898'), OJ = hex('#6a4a4a');
    for (let j = -6; j <= 5; j++) for (let i = -4; i <= 9; i++) { const dd = Math.hypot(i - 1.5, j * 1.15); if (dd > 6.2 || 116 + j > 123) continue; pset(229 + i, 116 + j, dd > 5.3 ? PS : (i + j) % 5 === 0 ? PL : i > 4 && j > 1 ? PS : PE); }
    for (let i = 0; i < 9; i++) pset(233 + i, 121 + (i % 3 === 0 ? 0 : 1), i % 2 ? PE : PS);   // mechones sobre la almohada
    for (let j = -3; j <= 3; j++) for (let i = -4; i <= 1; i++) { if (Math.hypot(i + 1.2, j * 1.05) > 3.4) continue; pset(227 + i, 117 + j, i === -4 || j === 3 ? PIS : PIEL); }
    pset(223, 117, PIEL); pset(224, 116, PIEL);                                   // la nariz
    pset(225, 116, OJ); pset(226, 116, OJ); pset(225, 115, PIS);                   // el ojo cerrado y la ceja
    pset(225, 119, hex('#c88a8a')); pset(226, 118, hex('#e0b4a8'));               // la boca y la mejilla
    pset(229, 113, PL); pset(230, 112, PL); pset(231, 113, PL);                    // el brillo de las velas en el pelo
    a_luz(R, 214, 118, 30, a_P.luzC, 0.12 + 0.03 * Math.sin(t * 9), 20); }
  // las motas en la luz de la puerta
  for (let k = 0; k < 8; k++) { const x = Math.round(48 + h(k, 1, 146) * 30 + Math.sin(t * 0.5 + k) * 3), y = Math.round(90 + ((h(k, 2, 146) * 56 - t * 2) % 56 + 56) % 56); if (Math.sin(t * 2 + k) > 0) R.pset(x, y, hex('#ffe0b0')); }
  return { suelo: 150, libre: [30, 150], cama: { x0: 150, x1: 250, y: 124 }, puerta: { x0: 40, x1: 80, y0: 80, y1: 150 }, ventana: [100, 34, 124, 88], velas: VC.map(([x, y]) => [x, y - alto]) };
}

const a_PDO = pal({ c0: '#060a1c', c1: '#0c1430', c2: '#141e44', c3: '#1e2a56', c4: '#2a3866', p: '#3e4250', pS: '#2a2e3a', pL: '#565a6a', pJ: '#1e2028', verde: '#2e7a3e', verdeS: '#1e5a2a', verdeL: '#4aa05a', oro: '#d8b040',
  vL: '#a8f0b0', vB: '#e8f4e0', teja: '#a83a2a', tejaS: '#7a2a20', tejaL: '#c85a3a', fach: '#c8b898', fachS: '#a89878', nv: '#c4cce4', nvS: '#8a96bc', nvL: '#eef2fc', pat: '#ffc070', n0: '#141c3c', n1: '#1e2a4e', n2: '#2c3a64' });

function a_lvDoomstadt(R, t, o) {
  const P = a_PDO;
  const E = a_escena(R, 'doomstadt', () => { a_grad(R, 0, 120, [[0, P.c0], [0.25, P.c1], [0.5, P.c2], [0.75, P.c3], [0.92, P.c4]]); }, () => {
    const { rect, pset, linea } = R, B = R.buf;
    a_montes(R, 100, 34, 128, [hex('#1e2440'), hex('#161a32'), hex('#6a7aa4'), hex('#46527c'), hex('#1e2440')], 6);
    // la peña del castillo
    for (let x = 60; x < 270; x++) { const top = Math.round(112 - Math.max(0, 1 - Math.abs(x - 160) / 110) * 22 + h(x >> 2, 0, 151) * 4); for (let y = top; y < 140; y++) { const rel = (x - 160) / 110; let c = rel < -0.2 ? hex('#3a3648') : hex('#26243a'); if ((x * 2 + y * 3) % 11 === 0) c = hex('#1a1828'); if (y - top < 2 || h(x >> 1, y >> 1, 152) < 0.06) c = P.nvS; B[y * 320 + x] = c; } }
    // el castillo: el cuerpo, las torres y la torre alta con el balcón
    const S = [P.pJ, P.p, P.pS, P.pL, null];
    a_sillares(R, 96, 64, 224, 112, S, 5, 10, 153); for (let x = 96; x < 224; x += 8) { rect(x, 58, x + 4, 64, P.pS); rect(x, 58, x + 4, 58, P.nvS); }
    const torre = (x0, x1, top, techo) => { a_sillares(R, x0, top, x1, 112, S, 5, 8, 154 + x0); rect(x0, top, x0 + 1, 112, P.pL); rect(x1 - 1, top, x1, 112, P.pJ); for (let x = x0 - 1; x <= x1; x += 4) rect(x, top - 5, x + 2, top, P.pS);
      if (techo) { const cx = (x0 + x1) / 2, w = (x1 - x0) / 2 + 2; for (let j = 0; j < techo; j++) { const ww = Math.round(w * j / techo); rect(Math.round(cx - ww), top - 5 - techo + j, Math.round(cx + ww), top - 5 - techo + j, j % 3 === 0 ? P.pJ : (j < techo / 3 ? P.verdeS : P.pS)); } } };
    torre(70, 90, 70, 14); torre(230, 250, 64, 16); torre(110, 128, 48, 0); torre(192, 210, 46, 0);
    // la torre más alta: el fuste, el balcón (y 60) con su barandilla y la aguja
    a_sillares(R, 148, 34, 172, 112, S, 5, 8, 155); rect(148, 34, 149, 112, P.pL); rect(171, 34, 172, 112, P.pJ);
    for (let j = 0; j < 12; j++) { const w = Math.round(13 * (j / 12)); rect(160 - w, 22 + j, 160 + w, 22 + j, j % 3 === 0 ? P.pJ : P.verdeS); }
    rect(144, 60, 176, 62, a_K); rect(145, 60, 175, 60, P.pL); for (let x = 146; x <= 174; x += 3) rect(x, 55, x, 59, a_K); rect(145, 54, 175, 55, P.pS); for (let i = 0; i < 6; i++) { pset(146 + i * 5, 63, P.pS); pset(147 + i * 5, 64, P.pJ); }
    rect(154, 44, 166, 59, a_K); for (let y = 45; y <= 59; y++) for (let x = 155; x <= 165; x++) { const d = Math.hypot(x - 160, y - 50); if (y >= 50 || d <= 5) pset(x, y, a_um(x, y) < 0.5 ? P.vB : P.vL); }   // el ventanal del balcón, con luz
    // ventanas del castillo: luz verde y blanca, filas
    const VEN = [[114, 76], [120, 76], [114, 88], [120, 88], [114, 100], [196, 76], [202, 76], [196, 88], [202, 88], [202, 100], [78, 82], [84, 94], [236, 78], [242, 92], [117, 56], [117, 66], [199, 54], [199, 64]];
    VEN.forEach(([x, y], k) => { rect(x - 1, y - 1, x + 2, y + 4, a_K); rect(x, y, x + 1, y + 3, k % 3 ? P.vL : P.pat); pset(x, y, k % 3 ? P.vB : hex('#ffe0a0')); });
    // la ciudad de tejados rojos con nieve, casas apretadas en hileras, ventanas encendidas y chimeneas
    for (let fila = 0; fila < 3; fila++) for (let k = 0; k < 18; k++) { const w = 14 + Math.round(h(k, fila, 157) * 8), x = k * 19 - 6 + fila * 7 + Math.round(h(k, fila + 3, 157) * 5), yb = 140 + fila * 14, alto = 12 + Math.round(h(k, fila + 6, 157) * 6), tj = Math.round(w * 0.45);
      rect(x, yb - alto, x + w, yb, a_K); rect(x + 1, yb - alto + 1, x + w - 1, yb, fila === 2 ? P.fach : a_mez(P.fach, P.c3, 0.35 - fila * 0.1)); rect(x + w - 3, yb - alto + 1, x + w - 1, yb, P.fachS);
      for (let wy = yb - alto + 4; wy < yb - 3; wy += 6) for (let wx = x + 3; wx < x + w - 3; wx += 5) { const on = h(wx, wy, 158) < 0.6; rect(wx, wy, wx + 1, wy + 2, on ? P.pat : hex('#2a2a3a')); if (on) pset(wx, wy, hex('#ffe8b0')); }
      for (let j = 0; j <= tj; j++) { const ww = Math.round((w / 2 + 2) * j / tj), cx = x + w / 2; for (let xx = Math.round(cx - ww); xx <= Math.round(cx + ww); xx++) { const tt = h(k, fila, 166), te = tt < 0.25 ? hex('#6a4a3a') : tt < 0.45 ? hex('#8a5a3a') : P.teja; pset(xx, yb - alto - tj + j, xx === Math.round(cx - ww) || xx === Math.round(cx + ww) ? a_K : j < tj * 0.5 ? (h(xx, j, 159) < 0.8 ? P.nvL : P.nv) : (xx + j) % 3 === 0 ? a_mez(te, a_K, 0.3) : xx < cx ? a_mez(te, hex('#ffffff'), 0.15) : te); } }
      if (h(k, fila, 160) < 0.6) { const cx = x + Math.round(w * 0.7); rect(cx, yb - alto - tj + 2, cx + 2, yb - alto - 2, P.tejaS); rect(cx - 1, yb - alto - tj + 1, cx + 3, yb - alto - tj + 2, P.nvL); } }
    // la torre del reloj del pueblo (la esfera sin números) y la cúpula de la iglesia
    { const tx = 262; rect(tx, 108, tx + 12, 158, a_K); rect(tx + 1, 109, tx + 11, 158, P.fach); rect(tx + 9, 109, tx + 11, 158, P.fachS); R.disco(tx + 6, 118, 4, a_K); R.disco(tx + 6, 118, 3, hex('#f0e8d0')); R.linea(tx + 6, 118, tx + 6, 116, a_K); R.linea(tx + 6, 118, tx + 8, 118, a_K);
      for (let j = 0; j < 12; j++) { const w = Math.round(7 * j / 12); rect(tx + 6 - w, 96 + j, tx + 6 + w, 96 + j, j < 5 ? P.nvL : P.tejaS); } rect(tx + 4, 128, tx + 8, 134, P.pat); }
    { const cx = 44; for (let j = 0; j < 9; j++) { const w = Math.round(Math.sqrt(1 - ((8 - j) / 9) ** 2) * 9); rect(cx - w, 118 + j, cx + w, 118 + j, j < 3 ? P.nvL : hex('#4a7a6a')); } rect(cx, 110, cx, 118, a_K); rect(cx - 2, 112, cx + 2, 112, a_K); }
    // la calle de delante: adoquines con nieve en los bordes
    for (let y = 168; y < 180; y++) for (let x = 0; x < 320; x++) { const f = Math.floor((y - 168) / 3), dx = (x + f * 3) % 7; let c = dx === 0 || (y - 168) % 3 === 2 ? hex('#2a2a36') : h(x >> 3, f, 161) < 0.3 ? hex('#4a4a5a') : hex('#3a3a4a'); if (y === 168 || h(x, y, 162) < 0.08) c = P.nvS; B[y * 320 + x] = c; }
  });
  R.copiar(E.b);
  a_estrellas(R, E.m, t, 70, 70, 163, hex('#7a84b8'), hex('#f0f2ff')); a_luna(R, E.m, 62, 36, 11, [hex('#f4ecd0'), hex('#c8c0a8'), hex('#fff8dc')]);
  a_nubesT(R, E.m, t, 80, [P.n0, P.n1, P.n2], { n: 4, sem: 19 });
  a_pajaros(R, E.m, t, 4, 30, 7, hex('#0a0c18'), 11);
  // la bruma que corre entre la peña y los tejados
  for (let k = 0; k < 7; k++) { const x = ((h(k, 1, 167) * 380 + t * (3 + k * 0.6)) % 380) - 30; a_mancha(R, x, 132 + (k % 3) * 3, 9 + (k % 3) * 3, P.n2, 0.28); }
  // la bandera de la aguja y los estandartes verdes con el aro de cuatro puntas
  R.rect(160, 15, 160, 22, a_K); for (let j = 0; j < 4; j++) for (let i = 1; i <= 9 - j; i++) R.pset(160 + i, 16 + j + Math.round(Math.sin(t * 5 + i * 0.6) * 0.6), j === 0 ? P.verdeL : P.verde);
  const PV = [P.verde, P.verdeS, P.verdeL, P.oro, P.oro];
  a_estandarte(R, 130, 64, 12, 34, PV, t, 'doom', 0, 0.6); a_estandarte(R, 178, 64, 12, 34, PV, t, 'doom', 1.4, 0.6); a_estandarte(R, 100, 72, 10, 24, PV, t, 'doom', 2.6, 0.5); a_estandarte(R, 212, 72, 10, 24, PV, t, 'doom', 3.3, 0.5);
  // ventanas que se encienden y se apagan, el humo de las chimeneas, los faroles de la calle y la gente con farol
  for (let k = 0; k < 6; k++) { const x = Math.round(20 + h(k, 1, 164) * 280), y = Math.round(140 + h(k, 2, 164) * 28); if (Math.floor(t * 0.5 + k) % 3 === 0) R.rect(x, y - 30, x + 1, y - 28, hex('#2a2a3a')); }
  for (let k = 0; k < 8; k++) { const x0 = 10 + k * 40 + Math.round(h(k, 1, 165) * 10), y0 = 112 + Math.round(h(k, 2, 165) * 22); for (let j = 0; j < 3; j++) { const u = (t * 0.1 + j / 3 + k * 0.13) % 1; a_mancha(R, x0 + u * 18, y0 - u * 26, 1 + u * 3, hex('#4a5070'), 0.5 * (1 - u)); } }
  for (const x of [30, 110, 210, 290]) { R.rect(x, 152, x, 167, a_K); R.rect(x - 2, 148, x + 2, 152, a_K); R.rect(x - 1, 149, x + 1, 151, P.pat); a_luz(R, x, 152, 18, P.pat, 0.25 + 0.03 * Math.sin(t * 6 + x), 12); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.03 + k * 0.33) % 1, d = k % 2 ? -1 : 1, x = d > 0 ? -10 + u * 340 : 330 - u * 340; a_gente(R, x, 172, t, [[hex('#3a3a5a'), hex('#5a2a2a'), hex('#2a4a3a')][k], hex('#2a2020'), hex('#1a1a20')], { anda: true, dir: d, carga: 'farol' }); }
  // los guardias de hierro que hacen la ronda por la muralla (un destello verde)
  { const u = (t * 0.05) % 1, x = Math.round(100 + Math.abs(u * 2 - 1) * 120); R.rect(x, 52, x + 1, 57, P.pS); R.pset(x + (u < 0.5 ? 1 : 0), 53, P.vL); }
  return { suelo: 170, libre: [20, 300], balcon: { x0: 150, x1: 170, y: 60 } };
}
const a_PPL = pal({ c0: '#4a86d0', c1: '#6aa0dc', c2: '#8cbce8', c3: '#b4d4ee', n0: '#a8c4e4', n1: '#dce8f6', n2: '#ffffff', mR: '#7a8aac', mRS: '#5e6c90', mN: '#f4f6fc', mNS: '#c4cce4', mB: '#a8bcd8',
  teja: '#b84a32', tejaS: '#8a3226', tejaL: '#d8704a', nv: '#e8eef8', nvS: '#b8c4dc', ent: '#5a3a24', ent2: '#4a2e1c', piedra: '#9a96a0', piedraS: '#787482', piedraL: '#b8b4bc', adoq: '#8a8494', adoqS: '#6a6474', adoqL: '#a8a2b0',
  hierro: '#7a7e8a', hierroS: '#4a4e5a', hierroL: '#a8acb8', capucha: '#2e7a3e', capuchaS: '#1e5a2a', agua: '#6ab0e0', aguaL: '#c8e8f8', aguaS: '#3a80b8' });

const a_FACH = ['#e0c890', '#c8d8b8', '#e8b8a8', '#b8c8d8', '#e8dcc4', '#d8b880'].map(hex);

// las casas de la plaza [x, ancho, alto del alero] y las ventanas donde se asoman los robots (una por casa)
const a_CASAS = [[0, 46, 40], [46, 38, 34], [84, 36, 46], [120, 40, 32], [160, 42, 32], [202, 38, 46], [240, 40, 44], [280, 40, 62]];

const a_ROBOTS = a_CASAS.map(([x, w, top], k) => [x + 5 + (k % 2 && w > 30 ? 12 : 0), top + 6 + (k % 3 === 2 ? 14 : 0)]);

function a_lvPlaza(R, t, o) {
  const P = a_PPL;
  const E = a_escena(R, 'plaza', () => { a_grad(R, 0, 60, [[0, P.c0], [0.35, P.c1], [0.7, P.c2], [0.9, P.c3]]); }, () => {
    const { rect, pset, linea } = R, B = R.buf;
    a_montes(R, 40, 18, 52, [P.mR, P.mRS, P.mN, P.mNS, P.mB], 8);
    // el castillo de Doom a lo lejos, sobre su peña (pequeño, en gris azulado)
    { const g = hex('#5a6280'), gS = hex('#4a506c'); for (let x = 196; x < 262; x++) { const top = Math.round(40 - Math.max(0, 1 - Math.abs(x - 229) / 33) * 6); for (let y = top; y < 46; y++) pset(x, y, gS); } rect(206, 26, 252, 36, g); rect(226, 16, 232, 36, g); for (let j = 0; j < 5; j++) rect(229 - j, 11 + j, 229 + j, 11 + j, gS); rect(208, 22, 213, 36, g); rect(245, 22, 250, 36, g); for (let x = 206; x < 252; x += 3) pset(x, 25, g); pset(229, 26, hex('#a8f0b0')); pset(229, 7, a_K); for (let i = 1; i <= 4; i++) pset(229 + i, 8, hex('#2e7a3e')); }
    // la fila de casas de tres alturas con entramado, tejados rojos nevados, contraventanas y jardineras
    a_CASAS.forEach(([x, w, top], k) => { const col = a_FACH[k % 6], colS = a_mez(col, hex('#6a5a5a'), 0.3), yb = 120;
      rect(x, top, x + w - 1, yb, a_K); for (let y = top + 1; y < yb; y++) for (let xx = x + 1; xx < x + w - 1; xx++) pset(xx, y, xx > x + w - 5 ? colS : h(xx, y, 171 + k) < 0.04 ? colS : col);
      if (k % 2 === 0) { for (let y = top + 12; y < yb - 20; y += 14) rect(x + 1, y, x + w - 2, y + 1, P.ent2); for (let xx = x + 1; xx < x + w; xx += 9) rect(xx, top + 1, xx + 1, yb - 20, P.ent); for (let y = top + 12; y < yb - 20; y += 14) for (let i = 0; i < 6; i++) pset(x + 3 + i, y + 2 + i, P.ent2); }
      const tj = Math.round(w * 0.4); for (let j = 0; j <= tj; j++) { const ww = Math.round((w / 2 + 3) * j / tj), cx = x + w / 2; for (let xx = Math.round(cx - ww); xx <= Math.round(cx + ww); xx++) pset(xx, top - tj + j, xx === Math.round(cx - ww) || xx === Math.round(cx + ww) || j === tj ? a_K : j < tj * 0.45 ? (h(xx, j, 172) < 0.85 ? P.nv : P.nvS) : (Math.round(xx * 0.5) + j) % 3 === 0 ? P.tejaS : xx < cx ? P.tejaL : P.teja); }
      if (k % 3 !== 1) { const cx = x + Math.round(w * 0.72); rect(cx, top - tj + 2, cx + 3, top - 2, a_K); rect(cx + 1, top - tj + 3, cx + 2, top - 2, P.tejaS); rect(cx - 1, top - tj + 1, cx + 4, top - tj + 2, P.nv); }
      // ventanas de los pisos (las de arriba, con robot; las demás con cortinas y macetas)
      for (let piso = 0; piso < 3; piso++) { const wy = top + 6 + piso * 14; if (wy > yb - 28) continue; for (let wx = x + 5; wx < x + w - 9; wx += 12) { rect(wx - 1, wy - 1, wx + 8, wy + 9, a_K); rect(wx, wy, wx + 7, wy + 8, hex('#3a4a5a')); rect(wx, wy, wx + 7, wy, hex('#8aa8c8')); pset(wx + 1, wy + 1, hex('#c8dcf0'));
        rect(wx - 3, wy - 1, wx - 2, wy + 9, k % 2 ? hex('#2e6a4a') : hex('#8a3a2a')); rect(wx + 9, wy - 1, wx + 10, wy + 9, k % 2 ? hex('#2e6a4a') : hex('#8a3a2a')); rect(wx - 1, wy + 9, wx + 8, wy + 11, P.ent); for (let i = 0; i < 8; i++) pset(wx + i, wy + 8, i % 2 ? hex('#d84a5a') : hex('#4a8a3a')); } }
      // la planta baja: tiendas con su arco, escaparate y toldo
      rect(x + 2, yb - 20, x + w - 3, yb - 19, P.ent); rect(x + 4, yb - 16, x + 13, yb, a_K); rect(x + 5, yb - 15, x + 12, yb, hex('#6a4024')); pset(x + 11, yb - 8, hex('#d8b040'));
      if (w > 34) { rect(x + 17, yb - 15, x + w - 5, yb - 6, a_K); rect(x + 18, yb - 14, x + w - 6, yb - 7, hex('#7a9ab8')); for (let i = x + 19; i < x + w - 6; i += 4) { rect(i, yb - 10, i + 2, yb - 7, [hex('#e0b040'), hex('#c84a4a'), hex('#8a5a2a')][(i >> 2) % 3]); } }
      for (let y = 0; y < 4; y++) for (let xx = x + 2; xx < x + w - 2; xx++) pset(xx, yb - 23 + y, ((xx >> 2) % 2) ? (k % 2 ? hex('#2e6a4a') : hex('#c84a4a')) : hex('#f0ece0'));
    });
    // los adoquines de la plaza en perspectiva, con nieve barrida a los lados
    for (let y = 120; y < 180; y++) { const f = (y - 120) / 60, hh = Math.max(2, Math.round(2 + f * 5)), fila = Math.floor((y - 120) / (2 + f * 3.4));
      for (let x = 0; x < 320; x++) { const w = 4 + f * 8, dx = ((x - 160) / (1 + f * 1.4) + fila * 3 + 640) % 7; let c = dx < 0.8 || (y - 120) % Math.max(2, Math.round(2 + f * 3.4)) === 0 ? P.adoqS : h(Math.floor(((x - 160) / (1 + f * 1.4) + fila * 3) / 7), fila, 173) < 0.3 ? P.adoqL : P.adoq;
        if ((x < 12 + f * 30 || x > 308 - f * 30) && h(x >> 1, y >> 1, 174) < 0.7) c = h(x, y, 175) < 0.5 ? P.nv : P.nvS; B[y * 320 + x] = c; } }
    // la fuente: la taza de piedra con su pilar (el agua se pinta en cada fotograma)
    for (let j = 0; j < 12; j++) for (let i = -22; i <= 22; i++) { const e = (i / 22) ** 2; if (j < 3 && e > 1 - j * 0.1) continue; pset(160 + i, 131 + j, j === 0 ? P.piedraL : j === 11 ? a_K : i < -12 ? P.piedraL : i > 12 ? P.piedraS : (i + j) % 6 === 0 ? P.piedraS : P.piedra); }
    for (let i = -20; i <= 20; i++) pset(160 + i, 133, P.aguaS); rect(157, 114, 163, 131, a_K); rect(158, 114, 162, 131, P.piedra); rect(158, 114, 158, 131, P.piedraL); rect(154, 112, 166, 114, a_K); rect(155, 112, 165, 113, P.piedraL);
    for (let j = 0; j < 5; j++) for (let i = -7; i <= 7; i++) if (Math.abs(i) <= 7 - j) pset(160 + i, 112 - j, j === 4 ? a_K : P.piedra);
  });
  R.copiar(E.b);
  a_nubes(R, E.m, t, 50, [P.n0, P.n1, P.n2], { n: 4, sem: 23 }); a_pajaros(R, E.m, t, 3, 10, 9, hex('#4a4e5a'), 7);
  // el humo de las chimeneas
  a_CASAS.filter((c, k) => k % 3 !== 1).forEach(([x, w, top], k) => { const cx = x + Math.round(w * 0.72) + 1, cy = top - Math.round(w * 0.4); for (let j = 0; j < 3; j++) { const u = (t * 0.12 + j / 3 + k * 0.2) % 1; if (cx + u * 16 > 270 && cy - u * 22 < 48) continue; a_mancha(R, cx + u * 16, cy - u * 22, 1 + u * 3, hex('#e8ecf4'), 0.55 * (1 - u)); } });
  // los robots de las ventanas: la cara de hierro con la capucha verde; con o.robots se giran a la vez hacia o.mira
  const u = Math.max(0, Math.min(1, o.robots ?? 0)), mira = o.mira ?? 160;
  for (const [wx, wy] of a_ROBOTS) { const cx = wx + 4, g = Math.max(-1, Math.min(1, (mira - cx) / 50)) * u, dx = Math.round(g * 1.4), { rect, pset } = R;
    rect(wx, wy + 1, wx + 7, wy + 8, P.capuchaS); rect(wx + 1, wy + 1, wx + 6, wy + 2, P.capucha); pset(wx, wy + 1, hex('#1a2a30')); pset(wx + 7, wy + 1, hex('#1a2a30'));
    const fx = wx + 1 + dx + 1; rect(fx, wy + 2, fx + 4, wy + 8, P.hierro); rect(fx, wy + 2, fx + 4, wy + 2, P.hierroL); rect(dx > 0 ? fx : fx + 4, wy + 3, dx > 0 ? fx : fx + 4, wy + 8, P.hierroS); if (dx <= 0) rect(fx, wy + 3, fx, wy + 7, P.hierroL);
    const on = u > 0.3 || Math.sin(t * 0.9 + wx) > 0.92, ojo = on ? hex('#d8ffd8') : hex('#4ac860'), ex = dx > 0 ? 1 : dx < 0 ? -1 : 0;
    rect(fx, wy + 4, fx + 4, wy + 4, a_K); pset(fx + 1 + Math.max(0, ex), wy + 4, ojo); pset(fx + 3 + Math.min(0, ex), wy + 4, ojo); pset(fx + 2, wy + 5, P.hierroL);
    rect(fx + 1, wy + 6, fx + 3, wy + 7, P.hierroS); pset(fx + 2, wy + 6, a_K); pset(fx + 2, wy + 7, a_K);
    if (on) a_luz(R, fx + 2, wy + 4, 5, hex('#a8f0b0'), 0.35, 3);
    rect(wx - 1, wy + 9, wx + 8, wy + 9, a_K); }
  // los chorros de la fuente y el agua que se mueve en la taza
  { for (const d of [-1, 1]) for (let i = 0; i < 14; i++) { const x = 160 + d * (2 + i), y = Math.round(110 - i * 0.9 + i * i * 0.12) + (i > 0 ? 0 : 0); R.pset(x, y, Math.floor(t * 8 + i) % 3 ? P.aguaL : P.agua); if (i > 10) R.pset(x, y + 1, P.agua); }
    R.pset(160, 106 - Math.round(Math.abs(Math.sin(t * 6))), P.aguaL); R.pset(160, 107, P.agua); R.pset(160, 108, P.aguaL);
    for (let i = -19; i <= 19; i++) { const s = Math.sin(i * 0.6 - t * 4); R.pset(160 + i, 132, s > 0.5 ? P.aguaL : P.agua); R.pset(160 + i, 133, s < -0.6 ? P.aguaL : P.aguaS); } }
  // los puestos del mercado detrás de los personajes: toldos de rayas que se mueven, mostradores con género y su vendedor
  [[44, hex('#c84a4a'), 'pan'], [92, hex('#2e7a5a'), 'manzanas'], [206, hex('#e0b040'), 'quesos'], [252, hex('#4a6ab0'), 'coles']].forEach(([x, c, g], k) => { const { rect, pset } = R, w = 34, y = 124;
    a_gente(R, x + 12 + Math.round(Math.sin(t * 0.9 + k) * 3), y - 4, t, [[hex('#6a3a2a'), hex('#3a5a7a'), hex('#7a2a4a'), hex('#4a5a2a')][k], hex('#3a2a1a'), hex('#2a2a2a')], { dir: k % 2 ? -1 : 1 });
    rect(x + 1, y - 18, x + 2, y + 12, a_P.troncoS); rect(x + w - 2, y - 18, x + w - 1, y + 12, a_P.troncoS);
    for (let j = 0; j < 5; j++) for (let i = -2; i < w + 2; i++) { const ondula = j === 4 && Math.floor((i + t * 6) / 3) % 2; if (j === 4 && (i % 4 === 0 || ondula)) continue; pset(x + i, y - 20 + j, j === 0 ? a_K : ((i >> 2) % 2) ? c : hex('#f4f0e4')); }
    rect(x, y, x + w, y + 12, a_K); rect(x + 1, y + 1, x + w - 1, y + 11, hex('#8a5a32')); for (let i = x + 3; i < x + w; i += 6) rect(i, y + 2, i, y + 11, hex('#6a4024')); rect(x + 1, y + 1, x + w - 1, y + 1, hex('#a87a4a'));
    for (let i = 0; i < 7; i++) { const gx = x + 3 + i * 4, gy = y - 2; if (g === 'pan') { rect(gx, gy - 1, gx + 3, gy, hex('#c8883a')); pset(gx + 1, gy - 2, hex('#e0a858')); } else if (g === 'manzanas') { pset(gx, gy, hex('#d83a3a')); pset(gx + 1, gy, hex('#c82a2a')); pset(gx + 2, gy, hex('#6aa83a')); pset(gx + 1, gy - 1, hex('#e85a4a')); }
      else if (g === 'quesos') { rect(gx, gy - 2, gx + 3, gy, hex('#f0c848')); pset(gx + 3, gy - 2, hex('#c8a030')); } else { R.disco(gx + 1, gy - 1, 2, hex('#6aa84a')); pset(gx + 1, gy - 2, hex('#a8d878')); } } });
  // niños que juegan alrededor de la fuente, palomas que picotean y una vendedora de paso
  for (let k = 0; k < 3; k++) { const v = (t * (0.11 + k * 0.02) + k * 0.31) % 1, ida = v < 0.5, x = k === 2 ? 196 + Math.abs(v * 2 - 1) * 84 : 34 + Math.abs(v * 2 - 1) * 96 + k * 8, y = 142 + (k % 2) * 2, sal = Math.round(Math.abs(Math.sin(t * 7 + k)) * (k === 1 ? 2 : 0));
    a_gente(R, x, y - sal, t, [[hex('#d84a4a'), hex('#4a7ad8'), hex('#e0b040')][k], hex('#3a2a1a'), hex('#2a2a3a')], { anda: true, dir: ida ? 1 : -1 }); }
  { const v = (t * 0.11) % 1, x = Math.round(42 + Math.abs(v * 2 - 1) * 96) + (v < 0.5 ? 4 : -4); R.disco(x, 139, 2, hex('#e8ecf4')); R.pset(x, 138, hex('#ffffff')); }   // la bola de nieve que persiguen
  for (let k = 0; k < 5; k++) { const x = Math.round(70 + k * 9 + (k > 2 ? 120 : 0) + Math.sin(t * 0.3 + k) * 3), y = 144 + (k % 2) * 3, p = Math.sin(t * 3 + k * 1.3) > 0.4 ? 1 : 0; R.rect(x, y - 2, x + 2, y - 1, hex('#8a8e9c')); R.pset(x + 3, y - 2 + p, hex('#6a6e7c')); R.pset(x + 3, y - 3 + p, hex('#5a7a7a')); R.pset(x, y, hex('#d88a5a')); R.pset(x - 1, y - 2, hex('#6a6e7c')); }
  return { suelo: 152, libre: [30, 280], fuente: { x0: 138, x1: 182, y0: 104, y1: 142 }, robots: a_ROBOTS.map(([x, y]) => [x + 4, y + 4]) };
}

// lo de delante de la plaza: los dos puestos de las esquinas (cestas de manzanas y coles; cacharros con su toldo)
function a_plazaDelante(R, t) {
  const { rect, pset, disco, linea } = R, mad = [hex('#2a160c'), hex('#8a5a32'), hex('#6a4024'), hex('#a87a4a')];
  // izquierda: la mesa de la frutera con su faldón de rayas, cestas de manzanas y coles y un saco de patatas
  a_tablas(R, 0, 150, 34, 154, mad, 3, true, 147); rect(0, 149, 35, 149, a_K);
  for (let y = 155; y < 180; y++) for (let x = 0; x <= 33; x++) { const ond = Math.round(Math.sin(t * 1.5 + y * 0.3) * 0.6); pset(x + ond, y, x === 33 ? a_K : ((x >> 2) % 2) ? hex('#c84a4a') : hex('#f0ece0')); }
  for (const [x, c, c2] of [[7, '#d83a3a', '#e86a5a'], [24, '#6aa84a', '#a8d878']]) { for (let j = 0; j < 7; j++) for (let i = -7; i <= 7; i++) if (Math.abs(i) < 7 - j * 0.3) pset(x + i, 149 - j, j === 0 || Math.abs(i) >= 6 - j * 0.3 ? hex('#5a3a1a') : (i + j) % 2 ? hex('#a87a3a') : hex('#8a6a2a'));
    for (let k = 0; k < 9; k++) { const bx = x - 5 + (k % 4) * 3 + (k > 3 ? 1 : 0), by = 141 - Math.floor(k / 4) * 2; disco(bx, by, 1, hex(c)); pset(bx - 1, by - 1, hex(c2)); } }
  rect(34, 166, 44, 179, a_K); rect(35, 167, 43, 179, hex('#b89a6a')); for (let y = 168; y < 180; y += 3) rect(35, y, 43, y, hex('#9a7a4a')); disco(39, 165, 3, hex('#b89a6a')); pset(38, 163, hex('#c8aa7a')); disco(37, 164, 1, hex('#a8885a')); disco(41, 164, 1, hex('#c8a060'));
  // derecha: el puesto de cacharros, con su toldo de rayas que ondea, cántaros y platos
  rect(287, 122, 288, 179, a_K); rect(318, 122, 319, 179, a_K);
  for (let j = 0; j < 6; j++) for (let x = 284; x < 320; x++) { const caida = j === 5 && Math.floor((x + t * 6) / 3) % 2; if (j === 5 && (x % 4 === 0)) continue; pset(x, 117 + j + (caida ? 1 : 0), j === 0 ? a_K : ((x >> 2) % 2) ? hex('#8a3a6a') : hex('#f4f0e4')); }
  a_tablas(R, 289, 144, 317, 179, mad, 4, false, 148); rect(286, 143, 319, 144, a_K); rect(287, 143, 319, 143, hex('#c8986a'));
  for (const [x, c, hh] of [[295, '#c86a3a', 9], [304, '#3a6aa8', 12], [313, '#d8c8a0', 8]]) { for (let j = 0; j < hh; j++) { const w = Math.round(3 + Math.sin(j / hh * Math.PI) * 1.5); for (let i = -w; i <= w; i++) pset(x + i, 142 - j, Math.abs(i) === w ? a_K : i < -1 ? a_mez(hex(c), hex('#ffffff'), 0.3) : i > 1 ? a_mez(hex(c), a_K, 0.25) : hex(c)); }
    rect(x - 1, 141 - hh, x + 1, 142 - hh, a_K); for (let i = -2; i <= 2; i++) pset(x + i, 138 - Math.round(hh / 2), hex('#f0e0b0')); }
  for (let k = 0; k < 3; k++) { const y = 150 + k * 9; rect(291, y, 315, y + 1, hex('#5a3418')); for (let i = 0; i < 3; i++) { disco(296 + i * 8, y - 3, 3, a_K); disco(296 + i * 8, y - 3, 2, [hex('#e8e0d0'), hex('#4a7ac8'), hex('#c8a040')][(i + k) % 3]); pset(296 + i * 8, y - 3, hex('#ffffff')); } }
}

const a_PTR = pal({ p: '#34363e', pS: '#24262e', pL: '#4a4c56', pJ: '#16171c', suelo: '#2a2c34', sueloL: '#3e404a', sueloS: '#1c1d24', verde: '#2e7a3e', verdeS: '#1e5a2a', verdeL: '#4aa05a', oro: '#d8b040', oroS: '#9a7a28',
  hierro: '#5a5e6a', hierroS: '#3a3e48', hierroL: '#8a8e9a', luna: '#a8b8e8', ojo: '#a8f0b0' });

function a_lvTrono(R, t, o) {
  const P = a_PTR;
  const E = a_escena(R, 'trono', null, () => {
    const { rect, pset, linea } = R, B = R.buf;
    a_sillares(R, 0, 0, 319, 118, [P.pJ, P.p, P.pS, P.pL, null], 9, 18, 181);
    // los ventanales altos con su vidriera verde y la noche detrás
    for (const cx of [44, 250]) for (let y = 16; y <= 84; y++) for (let x = cx - 14; x <= cx + 14; x++) { const dx = x - cx, dy = y - 30, d = Math.hypot(dx, dy), hueco = Math.abs(dx) <= 11 && (dy >= 0 || d <= 11), marco = Math.abs(dx) <= 14 && !hueco && (dy >= 0 || d <= 14);
      if (marco) B[y * 320 + x] = (y % 5 === 0) ? P.pJ : P.pL; else if (hueco) { let c = (x + y) % 9 === 0 ? hex('#a8b8e8') : a_um(x, y) < 0.5 ? hex('#141c3a') : hex('#1c2850'); if (dx === 0 || y === 50 || y === 66) c = a_K; else if (d < 7 && dy < 0) c = (x + y) % 2 ? P.verde : P.verdeS; B[y * 320 + x] = c; } }
    // las columnas con su capitel y su basa (cuatro, en perspectiva)
    for (const [x, w] of [[84, 10], [226, 10], [10, 16], [294, 16]]) { for (let y = 0; y < (w > 12 ? 180 : 122); y++) for (let i = 0; i < w; i++) { const rel = i / (w - 1); let c = rel < 0.25 ? P.pL : rel > 0.7 ? P.pS : P.p; if (i === 0 || i === w - 1) c = a_K; else if ((y + Math.round(i * 0.4)) % 14 === 0) c = P.pJ; B[y * 320 + x + i] = c; }
      rect(x - 2, w > 12 ? 4 : 10, x + w + 1, (w > 12 ? 4 : 10) + 4, a_K); rect(x - 1, w > 12 ? 5 : 11, x + w, (w > 12 ? 5 : 11) + 2, P.pL); if (w <= 12) { rect(x - 2, 116, x + w + 1, 121, a_K); rect(x - 1, 116, x + w, 119, P.pL); } }
    // el suelo de losas en perspectiva
    for (let y = 118; y < 180; y++) { const f = (y - 118) / 62, fila = Math.floor(Math.log(1 + f * 6) * 4);
      for (let x = 0; x < 320; x++) { const u = (x - 160) / (60 + f * 200) * 4; let c = h(Math.floor(u), fila, 182) < 0.4 ? P.sueloS : P.suelo; if (((u % 1) + 1) % 1 < 0.06 + f * 0.02 || Math.floor(Math.log(1 + (y + 1 - 118) / 62 * 6) * 4) !== fila) c = P.pJ; else if (h(x, y, 183) < 0.03) c = P.sueloL; B[y * 320 + x] = c; } }
    rect(0, 117, 319, 118, P.pJ);
    // la alfombra verde con su ribete dorado, del borde de abajo hasta el estrado
    for (let y = 150; y < 180; y++) { const f = (y - 150) / 30, w = 18 + f * 22; for (let x = Math.round(160 - w); x <= Math.round(160 + w); x++) { const e = Math.abs(x - 160) > w - 2; pset(x, y, e ? (Math.abs(x - 160) > w - 1 ? P.oroS : P.oro) : (x + y) % 7 === 0 ? P.verdeS : P.verde); } }
    // el estrado de tres escalones
    for (let s = 0; s < 3; s++) { const y0 = 124 + s * 9, w = 40 + s * 8; rect(160 - w - 1, y0, 160 + w + 1, y0 + 9, a_K); rect(160 - w, y0 + 1, 160 + w, y0 + 8, P.p); rect(160 - w, y0 + 1, 160 + w, y0 + 1, P.pL); rect(160 - w, y0 + 7, 160 + w, y0 + 8, P.pS); for (let x = 160 - w; x < 160 + w; x += 12) pset(x, y0 + 4, P.pJ); rect(160 - 16 + s, y0 + 1, 160 + 16 - s, y0 + 8, P.verde); rect(160 - 16 + s, y0 + 1, 160 + 16 - s, y0 + 1, P.verdeL); rect(160 - 17 + s, y0 + 1, 160 - 17 + s, y0 + 8, P.oro); rect(160 + 17 - s, y0 + 1, 160 + 17 - s, y0 + 8, P.oro); }
    // el trono de hierro: respaldo alto con puntas, brazos, el aro de cuatro puntas y el cojín verde
    for (let y = 60; y <= 124; y++) for (let x = 140; x <= 180; x++) { const dx = x - 160, inR = y >= 70 ? Math.abs(dx) <= 14 : Math.abs(dx) <= 14 && (y >= 70 - (14 - Math.abs(dx)) * 0.8 || (Math.abs(dx) % 7 === 0 && y >= 60)); if (!inR || y > 112) continue; const rel = dx / 14; let c = rel < -0.5 ? P.hierroL : rel > 0.5 ? P.hierroS : P.hierro; if (Math.abs(dx) === 14 || (y === 70 && Math.abs(dx) < 14)) c = a_K; else if (Math.abs(dx) === 11 && y > 72) c = P.hierroS; pset(x, y, c); }
    for (const sx of [146, 153, 160, 167, 174]) { const top = sx === 160 ? 52 : sx % 2 ? 58 : 60; linea(sx, top, sx, 70, a_K); pset(sx, top, P.hierroL); }
    a_simbolo(R, 160, 86, 'doom', P.oro, 5); rect(150, 100, 170, 112, P.verde); rect(150, 100, 170, 101, P.verdeL); for (let x = 151; x < 170; x += 4) pset(x, 106, P.verdeS);
    rect(138, 112, 182, 124, a_K); rect(139, 113, 181, 123, P.hierroS); rect(146, 116, 174, 120, P.verde); rect(146, 116, 174, 116, P.verdeL); rect(139, 113, 181, 113, P.hierroL);
    for (const [x0, d] of [[132, 1], [182, -1]]) { rect(Math.min(x0, x0 + 6 * d), 102, Math.max(x0, x0 + 6 * d), 124, a_K); rect(Math.min(x0, x0 + 6 * d) + 1, 103, Math.max(x0, x0 + 6 * d) - 1, 123, P.hierro); rect(Math.min(x0, x0 + 6 * d) - 1, 100, Math.max(x0, x0 + 6 * d) + 1, 103, a_K); rect(Math.min(x0, x0 + 6 * d), 101, Math.max(x0, x0 + 6 * d), 102, P.hierroL); }
    // los nichos de los robots de guardia y los braseros del estrado
    for (const nx of [104, 216]) { rect(nx - 9, 74, nx + 9, 117, a_K); rect(nx - 8, 75, nx + 8, 117, hex('#101116')); for (let j = 0; j < 8; j++) { const w = Math.round(8 * Math.sqrt(1 - ((7 - j) / 8) ** 2)); rect(nx - w, 67 + j, nx + w, 67 + j, j === 0 ? P.pL : a_K); }
      rect(nx - 4, 90, nx + 4, 114, P.hierroS); rect(nx - 3, 82, nx + 3, 90, P.verdeS); rect(nx - 2, 84, nx + 2, 90, P.hierro); rect(nx - 3, 94, nx + 3, 112, P.verdeS); rect(nx - 2, 94, nx + 2, 110, P.hierro); rect(nx - 6, 92, nx - 4, 106, P.verdeS); rect(nx + 4, 92, nx + 6, 106, P.verdeS); rect(nx - 3, 112, nx - 1, 117, P.hierroS); rect(nx + 1, 112, nx + 3, 117, P.hierroS); }
    for (const bx of [116, 204]) { rect(bx - 6, 118, bx + 6, 120, a_K); rect(bx - 5, 118, bx + 5, 119, P.hierroL); linea(bx - 4, 121, bx - 6, 124, a_K); linea(bx + 4, 121, bx + 6, 124, a_K); rect(bx - 1, 120, bx + 1, 124, a_K); }
  });
  R.copiar(E.b);
  // los haces de luna que entran por los ventanales, con motas de polvo
  for (const cx of [44, 250]) { for (let y = 30; y < 160; y++) { const u = (y - 30) / 130, x0 = cx + u * (cx < 160 ? 50 : -50), w = 10 + u * 12; for (let x = Math.round(x0 - w); x <= Math.round(x0 + w); x++) if (a_um(x, y) < 0.18 * (1 - u * 0.6) * (1 - Math.abs(x - x0) / w)) R.pset(x, y, a_mez(R.pget(x, y), P.luna, 0.4)); }
    for (let k = 0; k < 6; k++) { const v = ((t * 0.04 + h(k, cx, 184)) % 1), y = 40 + v * 110, x = cx + v * (cx < 160 ? 50 : -50) + Math.sin(t + k) * 6; R.pset(Math.round(x), Math.round(y), hex('#c8d4f0')); } }
  // los estandartes verdes de la pared y el grande de detrás del trono
  const PV = [P.verde, P.verdeS, P.verdeL, P.oro, P.oro];
  a_estandarte(R, 120, 20, 14, 48, PV, t, 'doom', 0, 0.6); a_estandarte(R, 186, 20, 14, 48, PV, t, 'doom', 1.5, 0.6);
  a_estandarte(R, 146, 18, 28, 34, PV, t, 'doom', 0.7, 0.4);
  // los ojos de los robots de guardia (parpadean de vez en cuando) y las antorchas de las columnas
  for (const [nx, k] of [[104, 0], [216, 1]]) { const on = Math.sin(t * 0.7 + k * 3) < 0.94; if (on) { R.pset(nx - 1, 86, P.ojo); R.pset(nx + 1, 86, P.ojo); a_luz(R, nx, 86, 6, P.ojo, 0.25, 4); } }
  a_antorcha(R, 89, 50, t, 0, 0.32); a_antorcha(R, 231, 50, t, 1, 0.32); a_antorcha(R, 18, 66, t, 2, 0.28); a_antorcha(R, 302, 70, t, 3, 0.28);
  // los braseros del estrado
  for (const [bx, k] of [[116, 0], [204, 1]]) { a_luz(R, bx, 112, 30, a_P.ambar, 0.26 + 0.04 * Math.sin(t * 8 + k), 22); for (let j = 0; j < 7; j++) { const w = Math.round((1 - j / 7) * 4 * (0.8 + 0.2 * Math.sin(t * 12 + j + k))), dx = Math.round(Math.sin(t * 6 + j * 0.6 + k) * j / 4); for (let i = -w; i <= w; i++) R.pset(bx + i + dx, 117 - j, Math.abs(i) < w / 2 && j < 4 ? a_P.fuegoL : j < 5 ? a_P.fuego1 : a_P.fuego2); }
    for (let s = 0; s < 3; s++) { const u = (t * 0.6 + s / 3 + k * 0.3) % 1; R.pset(bx + Math.round(Math.sin(t * 3 + s) * 3), Math.round(110 - u * 24), u < 0.5 ? a_P.fuego1 : a_P.fuego3); } }
  return { suelo: 150, libre: [40, 280], trono: { x: 160, y: 120, x0: 138, x1: 182 }, estrado: { x0: 112, x1: 208, y0: 124, y1: 150 } };
}

const a_PANT = [[110, 30, 210, 100], [44, 30, 98, 62], [44, 68, 98, 100], [220, 30, 272, 62], [220, 68, 272, 100], [110, 108, 210, 118]];

function a_lvEnemigos(R, t, o) {
  const P = a_PTR, on = new Set(o.pantallas ?? [0]);
  const E = a_escena(R, 'enemigos', null, () => {
    const { rect, pset, linea } = R, B = R.buf;
    // la pared de paneles de metal remachados, con conductos y cables
    for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const px = x % 40, py = y % 30; let c = (px === 0 || py === 0) ? hex('#14161c') : px === 1 || py === 1 ? hex('#3a3e4a') : h(x >> 2, y >> 2, 191) < 0.1 ? hex('#22252e') : hex('#2a2d36'); if ((px === 4 || px === 36) && (py === 4 || py === 26)) c = hex('#5a5e6a'); B[y * 320 + x] = c; }
    rect(0, 0, 319, 8, hex('#1a1c22')); for (let x = 0; x < 320; x += 6) pset(x, 7, hex('#3a3e4a'));
    for (const [x, c] of [[22, '#3a3e4a'], [26, '#2e6a3a'], [294, '#3a3e4a'], [298, '#6a2a2a']]) { const y0 = x > 200 ? 48 : 0; rect(x, y0, x + 2, 150, a_K); rect(x + 1, y0, x + 1, 150, hex(c)); for (let y = y0 + 10; y < 150; y += 24) rect(x - 1, y, x + 3, y + 2, hex('#5a5e6a')); }
    // los marcos de las seis pantallas
    for (const [x0, y0, x1, y1] of a_PANT) { rect(x0 - 4, y0 - 4, x1 + 4, y1 + 4, a_K); rect(x0 - 3, y0 - 3, x1 + 3, y1 + 3, hex('#4a4e5a')); rect(x0 - 3, y0 - 3, x1 + 3, y0 - 3, hex('#6a6e7a')); rect(x0 - 3, y1 + 3, x1 + 3, y1 + 3, hex('#2a2d36')); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, a_K); pset(x1 + 1, y1 + 3, hex('#a8f0b0')); }
    // el suelo de rejilla de metal
    for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const f = (y - 150) / 30, u = (x - 160) / (1 + f * 1.2); B[y * 320 + x] = ((Math.round(u) % 6 + 6) % 6 === 0 || (y - 150) % Math.max(2, Math.round(2 + f * 4)) === 0) ? hex('#16181e') : h(x >> 2, y, 192) < 0.2 ? hex('#3a3e4a') : hex('#2a2d36'); }
    rect(0, 149, 319, 150, hex('#4a4e5a'));
    // los armarios de máquinas a los lados, con sus pilotos (se encienden en cada fotograma)
    // el conducto de aire con sus abrazaderas, los manómetros y la franja de aviso del zócalo
    rect(34, 124, 284, 131, a_K); rect(35, 125, 283, 130, hex('#4a4e5a')); rect(35, 125, 283, 125, hex('#6a6e7a')); rect(35, 130, 283, 130, hex('#2a2d36')); for (let x = 44; x < 284; x += 30) { rect(x, 123, x + 2, 132, a_K); rect(x + 1, 124, x + 1, 131, hex('#7a7e8a')); }
    for (const [gx, gy] of [[108, 138], [212, 138]]) { R.disco(gx, gy, 4, a_K); R.disco(gx, gy, 3, hex('#d8dcd0')); linea(gx, gy, gx + 2, gy - 2, hex('#c84a3a')); pset(gx, gy, a_K); }
    for (let x = 34; x < 286; x++) for (let y = 140; y < 146; y++) pset(x, y, ((x + y) >> 2) % 2 ? hex('#c8a030') : hex('#2a2a2a'));
    for (const x0 of [2, 286]) { rect(x0, 48, x0 + 30, 150, a_K); rect(x0 + 1, 49, x0 + 29, 149, hex('#3a3e4a')); rect(x0 + 1, 49, x0 + 29, 49, hex('#5a5e6a')); for (let y = 54; y < 140; y += 14) { rect(x0 + 4, y, x0 + 26, y + 9, hex('#22252e')); for (let i = 0; i < 4; i++) R.disco(x0 + 8 + i * 5, y + 4, 1, hex('#14161c')); } }
  });
  R.copiar(E.b);
  // las pantallas: las encendidas con su fondo claro y las líneas de barrido; las apagadas con ruido tenue y un piloto
  const pant = a_PANT.map(([x0, y0, x1, y1], i) => {
    const vivo = on.has(i), B = R.buf, fl = Math.sin(t * 30 + i) > 0.9 ? 0.04 : 0;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { let c;
      if (vivo) { c = ((y + Math.floor(t * 20)) % 3 === 0) ? hex('#8ac4c8') : hex('#a8dcd8'); const v = Math.hypot((x - (x0 + x1) / 2) / (x1 - x0), (y - (y0 + y1) / 2) / (y1 - y0)); if (v > 0.42 && a_um(x, y) < (v - 0.42) * 3) c = hex('#6a9ca8'); if (fl) c = a_mez(c, hex('#ffffff'), 0.3); }
      else { const fase = (x - x0) / (x1 - x0) * 12 - t * 2 + i, yo = (y0 + y1) / 2 + Math.sin(fase) * (y1 - y0) * 0.22 * Math.sin(t * 0.7 + i); c = Math.abs(y - yo) < 0.8 ? hex('#2e6a4a') : (y % 2 ? hex('#0e1416') : hex('#121a1c')); if ((x - x0) % 12 === 0 && y % 2 === 0) c = hex('#1a2a2a'); }
      B[y * 320 + x] = c; }
    if (!vivo) R.pset(x1 - 3, y1 - 3, Math.floor(t * 1.5 + i) % 2 ? hex('#c84a3a') : hex('#4a1a1a'));
    return { x0, y0, x1, y1, on: vivo };
  });
  // el resplandor frío de las pantallas encendidas en el suelo y la pared
  for (const p of pant) if (p.on) a_luz(R, (p.x0 + p.x1) / 2, p.y1 + 30, Math.round((p.x1 - p.x0) * 0.7), hex('#a8e0e0'), 0.14, 30);
  // los pilotos de los armarios que parpadean y un barrido en la tira de abajo
  for (const x0 of [2, 286]) for (let y = 54; y < 140; y += 14) for (let i = 0; i < 4; i++) if (Math.sin(t * (2 + i) + y + x0) > 0.2) R.pset(x0 + 8 + i * 5, y + 4, [hex('#a8f0b0'), hex('#e8c050'), hex('#c84a3a'), hex('#6ab0e0')][(i + y) % 4]);
  return { suelo: 152, libre: [40, 280], pantallas: pant, mesa: { x0: 60, x1: 260, y0: 146, y1: 166 } };
}

// lo de delante de la sala de los enemigos: el brillo del cristal en las pantallas y la mesa de mando
function a_enemigosDelante(R, t, o) {
  const on = new Set(o.pantallas ?? [0]), { rect, pset } = R;
  a_PANT.forEach(([x0, y0, x1, y1], i) => { const a = on.has(i) ? 0.35 : 0.18;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const d = (x - x0) + (y - y0) * 0.9 - (x1 - x0) * 0.25; if ((d > 0 && d < 6) || (d > 10 && d < 12)) { if (a_um(x, y) < a) pset(x, y, a_mez(R.pget(x, y), hex('#ffffff'), 0.45)); } }
    pset(x0 + 1, y0 + 1, hex('#e8f4f4')); });
  // la mesa de mando (x 60–260, y 146–166): el tablero inclinado con teclas y pilotos, una palanca, el frente con remaches
  rect(60, 146, 260, 166, a_K); for (let y = 147; y <= 153; y++) for (let x = 61 + (153 - y); x <= 259 - (153 - y); x++) pset(x, y, y === 147 ? hex('#6a6e7a') : hex('#4a4e5a'));
  for (let x = 70; x < 252; x += 6) { if (x > 142 && x < 178) continue; const k = Math.floor(x / 6), lit = Math.sin(t * (1 + (k % 5) * 0.7) + k) > 0.3; rect(x, 149, x + 3, 150, lit ? [hex('#a8f0b0'), hex('#e8c050'), hex('#6ab0e0'), hex('#c84a3a')][k % 4] : hex('#2a2d36')); rect(x, 152, x + 3, 152, hex('#2a2d36')); }
  rect(146, 148, 174, 152, hex('#22252e')); for (let i = 0; i < 26; i++) pset(147 + i, 150 + Math.round(Math.sin(i * 0.6 + t * 5)), hex('#6ae0a0'));   // la pantallita de la mesa con su onda
  rect(61, 154, 259, 165, hex('#3a3e4a')); rect(61, 154, 259, 154, hex('#5a5e6a')); for (let x = 66; x < 258; x += 24) { pset(x, 157, hex('#6a6e7a')); pset(x, 162, hex('#6a6e7a')); rect(x + 6, 157, x + 16, 162, hex('#2a2d36')); }
  rect(60, 166, 260, 167, hex('#14161c'));
}

// el reparto de los encuadres: [general, la otra cámara]
const a_LV = { campamento: [a_lvCampamento, a_lvCarromato], tormenta: [a_lvTormenta, a_lvAbrigo], baron: [a_lvBaron, a_lvAlcoba], doomstadt: [a_lvDoomstadt, a_lvPlaza], trono: [a_lvTrono, a_lvEnemigos] };

const b_CACHE = new WeakMap();

// una capa fija: se pinta una vez en un búfer de R.nuevo() (lo que no se pinta queda a 0, hueco) y se guarda
function b_capa(R, clave, dibuja) {
  let m = b_CACHE.get(R); if (!m) b_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  return m[clave];
}

// copia entera una capa fija (el fondo)
function b_fijo(R, clave, dibuja) { R.copiar(b_capa(R, clave, dibuja)); }

// pone encima una capa fija con huecos (lo que es 0 deja ver lo que hay debajo: el cielo y las nubes que se mueven)
function b_encima(R, capa) { const B = R.buf; for (let i = 0; i < 57600; i++) { const c = capa[i]; if (c) B[i] = c; } }

// mezcla dos colores (a = 0: c; a = 1: d)
const b_mezcla = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

const b_lim = (u) => Math.max(0, Math.min(1, u));

const b_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el umbral de la trama ordenada 4 × 4 en (x, y), entre 0 y 1
const b_umbral = (x, y) => (b_BAYER[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// el color de la rampa cols para u (0–1), tramado
const b_rampa = (cols, u, x, y) => { const f = b_lim(u) * (cols.length - 1), i = Math.min(cols.length - 2, Math.floor(f)); return f - i > b_umbral(x, y) ? cols[i + 1] : cols[i]; };

// tiñe la caja [x0, y0, x1, y1] hacia col con fuerza a (con pset: respeta el recorte)
function b_velo(R, x0, y0, x1, y1, col, a) {
  if (a <= 0.01) return;
  for (let y = Math.max(0, Math.floor(y0)); y <= Math.min(179, y1); y++) for (let x = Math.max(0, Math.floor(x0)); x <= Math.min(319, x1); x++) R.pset(x, y, b_mezcla(R.pget(x, y), col, a));
}

// luz (o sombra) elíptica tramada en cuatro escalones alrededor de (cx, cy), radios rx y ry, hacia col con fuerza a
function b_halo(R, cx, cy, rx, ry, col, a) {
  if (a <= 0.01) return;
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, cy + ry); y++) for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, cx + rx); x++) {
    const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d >= 1) continue;
    const q = Math.floor((1 - Math.sqrt(d)) * 4 + b_umbral(x, y)) / 4; if (q > 0) R.pset(x, y, b_mezcla(R.pget(x, y), col, Math.min(0.9, q * a)));
  }
}

// las cifras y los símbolos de 3 × 5 (solo números y símbolos de matemáticas: nada de letras)
const b_DIG = {
  0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['##.', '..#', '.#.', '#..', '###'], 3: ['##.', '..#', '.#.', '..#', '##.'],
  4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '##.', '..#', '##.'], 6: ['.##', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'],
  8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '##.'], '.': ['.', '.', '.', '.', '#'], '+': ['...', '.#.', '###', '.#.', '...'],
  '-': ['...', '...', '###', '...', '...'], '=': ['...', '###', '...', '###', '...'], '×': ['...', '#.#', '.#.', '#.#', '...'], '/': ['..#', '..#', '.#.', '#..', '#..'],
  '(': ['.#', '#.', '#.', '#.', '.#'], ')': ['#.', '.#', '.#', '.#', '#.'], 'π': ['####', '.#.#', '.#.#', '.#.#', '.#.#'], 'Σ': ['###', '#..', '.#.', '#..', '###'],
  '√': ['...##', '...#.', '#..#.', '.#.#.', '..#..'], '∫': ['..#', '.#.', '.#.', '.#.', '#..'], '²': ['##', '.#', '#.', '##', '..'], '∞': ['.....', '.#.#.', '#.#.#', '.#.#.', '.....'],
  'Δ': ['..#..', '.#.#.', '.#.#.', '#...#', '#####'], '≈': ['....', '.#.#', '#.#.', '.#.#', '#.#.'], '>': ['#..', '.#.', '..#', '.#.', '#..'], ':': ['.', '#', '.', '#', '.'],
};

// el ancho en píxeles de un texto de cifras a la escala s
const b_ancho = (txt, s = 1) => { let w = 0; for (const ch of txt) { const g = b_DIG[ch]; w += g ? (g[0].length + 1) * s : 2 * s; } return w - s; };

// escribe cifras y símbolos en (x, y) = esquina de arriba; s, la escala; tiza: semilla del grano (0 = trazo limpio)
function b_cifras(R, txt, x, y, c, s = 1, tiza = 0) {
  let cx = Math.round(x); y = Math.round(y);
  for (const ch of txt) { const g = b_DIG[ch]; if (!g) { cx += 2 * s; continue; }
    g.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) { const px = cx + i * s + a, py = y + j * s + b; if (!tiza || h(px, py, tiza) < (s > 1 ? 0.86 : 0.94)) R.pset(px, py, c); } });
    cx += (g[0].length + 1) * s; }
  return cx - x;
}

// un trazo de tiza de (x0, y0) a (x1, y1), con su grano; g, el grueso
function b_tiza(R, x0, y0, x1, y1, c, k = 0, g = 1) {
  const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
  for (let i = 0; i <= n; i++) { const x = Math.round(x0 + (x1 - x0) * i / n), y = Math.round(y0 + (y1 - y0) * i / n); for (let a = 0; a < g; a++) for (let b = 0; b < g; b++) if (h(x + a, y + b, 130 + k) < 0.82) R.pset(x + a, y + b, c); }
}

// un aro (o elipse) de tiza, de a0 a a1 (radianes)
function b_aroTiza(R, cx, cy, rx, ry, c, k = 0, a0 = 0, a1 = Math.PI * 2, g = 1) {
  for (let a = a0; a < a1; a += 0.5 / Math.max(rx, ry)) { const x = Math.round(cx + Math.cos(a) * rx), y = Math.round(cy + Math.sin(a) * ry); for (let i = 0; i < g; i++) if (h(x + i, y, 140 + k) < 0.86) R.pset(x + i, y, c); }
}

// una nube de tres tonos (luz arriba a la izquierda, cuerpo, sombra en la base plana) de ancho w con centro (cx, cy)
function b_nube(R, cx, cy, w, [cL, c, cS], k = 0) {
  const bolas = [[-0.3, 0.04, 0.2], [-0.1, -0.1, 0.25], [0.14, -0.06, 0.23], [0.33, 0.06, 0.16], [0.04, 0.06, 0.22], [-0.42, 0.1, 0.12]];
  if (k % 2) bolas.push([0.24, -0.16, 0.14]);
  const base = cy + w * 0.12, x0 = Math.floor(cx - w * 0.56), x1 = Math.ceil(cx + w * 0.52), y0 = Math.floor(cy - w * 0.36);
  for (let y = y0; y <= base; y++) for (let x = x0; x <= x1; x++) {
    let luz = -9;
    for (const [bx, by, br] of bolas) { const dx = (x - cx) / w - bx, dy = ((y - cy) / w - by) * 1.35, d = Math.hypot(dx, dy); if (d < br) luz = Math.max(luz, (-dx * 0.6 - dy) / br + (1 - d / br) * 0.3); }
    if (luz < -8) continue;
    const v = luz - (y - (base - w * 0.1)) / (w * 0.1) * 0.5 * (y > base - w * 0.1 ? 1 : 0);
    R.pset(x, y, v > 0.5 + (b_umbral(x, y) - 0.5) * 0.3 ? cL : v < -0.1 + (b_umbral(x, y) - 0.5) * 0.3 ? cS : c);
  }
}

// una figurita de fondo (10 px): piernas que andan, cuerpo, brazos, cabeza y pelo; d, la dirección; k, la semilla;
// o.libros, o.cartera, o.quieta, o.sentada (en un escalón: las piernas hacia delante)
function b_figurita(R, x, suelo, t, k, o = {}) {
  const ps = R.pset, ropa = o.ropa ?? [hex('#a84a4a'), hex('#4a6a9a'), hex('#c89a3a'), hex('#5a8a5a'), hex('#7a5a9a'), hex('#d8d0c0'), hex('#2e5a7a')][k % 7];
  const pelo = [hex('#3a2a1a'), hex('#c89a4a'), hex('#1e1612'), hex('#8a4a22')][k % 4], piel = [hex('#f0c8a0'), hex('#c88a60'), hex('#8a5a3a'), hex('#f6d2b0')][(k >> 1) % 4];
  const pant = o.pant ?? [hex('#2e3448'), hex('#5a4a3a'), hex('#3a3a3a'), hex('#4a5a7a')][(k + 1) % 4], d = o.d ?? 1, quieta = o.quieta || o.sentada;
  const p = quieta ? 0 : Math.floor(t * 6 + k) % 2, ropaS = b_mezcla(ropa, hex('#1c1222'), 0.35); x = Math.round(x); suelo = Math.round(suelo);
  if (o.sentada) { for (let i = 0; i < 3; i++) ps(x + 1 + i * d, suelo - 3, pant); ps(x + 3 * d, suelo - 2, pant); ps(x + 3 * d, suelo - 1, hex('#2a1e1a')); }
  else for (let j = 1; j <= 3; j++) { ps(x + (p ? 1 : 0), suelo - j, j === 1 ? hex('#2a1e1a') : pant); ps(x + (p ? 1 : 2), suelo - j, j === 1 ? hex('#2a1e1a') : pant); }
  const y0 = o.sentada ? suelo - 3 : suelo;
  for (let j = 4; j <= 7; j++) for (let i = 0; i < 3; i++) ps(x + i, y0 - j, i === (d > 0 ? 0 : 2) ? ropaS : ropa);
  const brazo = quieta ? 0 : (p ? 1 : -1); ps(x + (d > 0 ? -1 : 3), y0 - 6 + (brazo > 0 ? 1 : 0), ropaS); ps(x + (d > 0 ? -1 : 3), y0 - 5, piel);
  for (let j = 8; j <= 10; j++) for (let i = 0; i < 3; i++) ps(x + i, y0 - j, j === 10 || (j === 9 && i === (d > 0 ? 0 : 2)) ? pelo : piel);
  if (o.libros) { const lx = x + (d > 0 ? 3 : -1); ps(lx, y0 - 6, hex('#c83a3a')); ps(lx, y0 - 5, hex('#2a4fa8')); ps(lx, y0 - 4, hex('#e8c040')); }
  if (o.cartera) { const lx = x + (d > 0 ? -1 : 3); ps(lx, y0 - 4, hex('#6a3a1e')); ps(lx, y0 - 3, hex('#4e2a14')); }
}

// un reloj de pared o de torre con su esfera, doce marcas y las agujas que se mueven (despacio) con t
function b_reloj(R, cx, cy, r, t, aro, k = 0) {
  R.disco(cx, cy, r + 1.5, hex('#1c1222')); R.disco(cx, cy, r + 0.5, aro); R.disco(cx, cy, r - 0.5, hex('#f2ead6')); R.disco(cx + 1, cy + 1, r - 2, hex('#e4dac2'));
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; R.pset(Math.round(cx + Math.cos(a) * (r - 1.6)), Math.round(cy + Math.sin(a) * (r - 1.6)), i % 3 ? hex('#8a8070') : hex('#1c1222')); }
  const am = -Math.PI / 2 + (t * 0.012 + 0.35 + k) * Math.PI * 2, ah = -Math.PI / 2 + (t * 0.001 + 0.82 + k * 0.3) * Math.PI * 2;
  R.linea(cx, cy, cx + Math.cos(ah) * (r * 0.5), cy + Math.sin(ah) * (r * 0.5), hex('#1c1222')); R.linea(cx, cy, cx + Math.cos(am) * (r * 0.8), cy + Math.sin(am) * (r * 0.8), hex('#1c1222'));
  if (r >= 6) { const as = -Math.PI / 2 + Math.floor(t) * Math.PI / 30; R.linea(cx, cy, cx + Math.cos(as) * (r * 0.8), cy + Math.sin(as) * (r * 0.8), hex('#c83a3a')); }
  R.pset(cx, cy, hex('#c8a040'));
}

// ladrillo a soga: hiladas de 3 px (2 de pieza y 1 de llaga), piezas de 7 px que se alternan, cada una con su tono;
// P = { base, claro, oscuro, quemado, junta }
function b_ladrillos(R, x0, y0, x1, y1, P, k = 0) {
  const B = R.buf;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const fila = Math.floor((y - y0) / 3), jy = (y - y0) % 3 === 2, arriba = (y - y0) % 3 === 0;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const u = x - x0 + (fila & 1) * 3, bx = Math.floor(u / 7);
      let c; if (jy || u % 7 === 6) c = P.junta;
      else { const v = h(bx, fila, k); c = v < 0.16 ? P.oscuro : v < 0.78 ? P.base : v < 0.94 ? P.claro : P.quemado; if (arriba && v > 0.3 && v < 0.78 && u % 7 < 4) c = P.claro; }
      B[y * 320 + x] = c; } }
}

// una ventana de guillotina con marco blanco, dintel y alféizar de piedra y el cristal que refleja el cielo
// (o.arco: remate de medio punto; o.cortina: color de la cortina; o.sombra: en la sombra del pórtico)
function b_ventana(R, x, y, w, hh, o = {}) {
  const { rect, pset } = R, k = hex('#1c1222'), marco = o.sombra ? hex('#b8b0a0') : hex('#f2eee2'), piedra = o.sombra ? hex('#a89c88') : hex('#e4d8bc'), cr0 = o.sombra ? hex('#3a4a5a') : hex('#6a8eb0'), cr1 = o.sombra ? hex('#4a5a6a') : hex('#a8c8e2');
  if (o.arco) { const r = (w + 1) / 2, cx = x + (w - 1) / 2; for (let j = 0; j <= r + 1; j++) for (let i = -r - 1; i <= r + 1; i++) { const d = Math.hypot(i, j); if (d > r + 1.5) continue; pset(Math.round(cx + i), y - j, d > r + 0.5 ? piedra : d > r - 0.6 ? marco : (j > r * 0.5 ? cr1 : cr0)); } }
  else { rect(x - 2, y - 3, x + w + 1, y - 1, piedra); rect(x - 2, y - 3, x + w + 1, y - 3, b_mezcla(piedra, C.blanco, 0.4)); if (!o.sombra) pset(x + Math.floor(w / 2), y - 2, hex('#c8b898')); }
  rect(x, y, x + w - 1, y + hh - 1, marco);
  for (let j = 1; j < hh - 1; j++) for (let i = 1; i < w - 1; i++) { const u = (i + j) % 11; pset(x + i, y + j, u < 2 && (i + j) < hh ? C.blanco : j < hh * 0.45 ? (i + j * 2 + 1) % 7 === 0 ? cr0 : cr1 : cr0); }
  rect(x, y + Math.floor(hh / 2) - 1, x + w - 1, y + Math.floor(hh / 2), marco); rect(x + Math.floor(w / 2), y, x + Math.floor(w / 2), y + hh - 1, marco);
  if (o.cortina) { rect(x + 1, y + 1, x + 2, y + hh - 2, o.cortina); rect(x + w - 3, y + 1, x + w - 2, y + Math.floor(hh / 2) - 2, o.cortina); }
  rect(x - 2, y + hh, x + w + 1, y + hh + 1, piedra); rect(x - 1, y + hh + 2, x + w, y + hh + 2, k);
}

// la copa de un árbol de otoño hecha de bolas de hojas con luz arriba a la izquierda, el borde mellado y huecos; se
// mece con t (más arriba que abajo); pal = [sombra, medio, luz, brillo]
function b_copa(R, cx, cy, r, t, pal, k = 0, fuerza = 1.4) {
  const bolas = [[0, 0.1, 0.72]];
  for (let i = 0; i < 9; i++) bolas.push([(h(k, i, 1) - 0.5) * 1.25, (h(k, i, 2) - 0.6) * 0.95, 0.34 + h(k, i, 3) * 0.2]);
  const x0 = Math.floor(cx - r * 1.05), x1 = Math.ceil(cx + r * 1.05), y0 = Math.floor(cy - r * 1.0), y1 = Math.ceil(cy + r * 0.85);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) {
    const sw = Math.sin(t * 1.3 + k * 2 + y * 0.05) * fuerza * (1 - (y - y0) / (y1 - y0)) + Math.sin(t * 3.1 + y * 0.4) * 0.35;
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
      const px = (x - sw - cx) / r, py = (y - cy) / r; let luz = -9;
      for (const [bx, by, br] of bolas) { const dx = px - bx, dy = py - by, d = Math.hypot(dx, dy); if (d < br) { const v = (-dx - dy * 1.2) / br * 0.55 + (1 - d / br) * 0.35; if (v > luz || d < br * 0.7) luz = v; } }
      if (luz < -8) continue;
      const n = h((x - Math.round(sw)) >> 1, y >> 1, 50 + k), borde = luz < -0.25;
      if (borde && n < 0.45) continue;                       // el borde mellado
      if (n > 0.965 && luz < 0.3) { R.pset(x, y, b_mezcla(pal[0], hex('#1c1222'), 0.4)); continue; }   // un hueco oscuro entre las hojas
      R.pset(x, y, b_rampa(pal, luz + 0.35 + (n - 0.5) * 0.55, x, y));
    } }
}

// el tronco de un árbol con su corteza, raíces y dos ramas que entran en la copa
function b_tronco(R, x, suelo, alto, ancho = 6) {
  const cor = [hex('#3a2a22'), hex('#5a4232'), hex('#7a5e46'), hex('#9a7e60')];
  for (let y = suelo - alto; y <= suelo; y++) { const u = (y - (suelo - alto)) / alto, w = Math.round(ancho * (0.6 + 0.4 * u) + (y > suelo - 4 ? (y - suelo + 4) : 0));
    for (let i = 0; i < w; i++) { const xx = x - Math.floor(w / 2) + i, v = i / (w - 1 || 1); R.pset(xx, y, i === 0 || i === w - 1 ? cor[0] : b_rampa(cor, 0.9 - v * 0.8 + (h(xx, y >> 1, 61) - 0.5) * 0.5, xx, y)); } }
  R.linea(x, suelo - alto + 6, x - 9, suelo - alto - 6, cor[1]); R.linea(x + 1, suelo - alto + 6, x - 8, suelo - alto - 6, cor[0]);
  R.linea(x + 1, suelo - alto + 3, x + 8, suelo - alto - 8, cor[1]); R.linea(x + 2, suelo - alto + 3, x + 9, suelo - alto - 8, cor[0]);
}

// hojas de otoño que caen girando, n hojas entre x0 y x1, desde y0 hasta y1; s, el tamaño (1 lejos, 2 cerca)
function b_hojas(R, t, n, x0, x1, y0, y1, s = 1, k = 0) {
  const cols = [hex('#e0703a'), hex('#c8442a'), hex('#f0a83a'), hex('#e8c84a'), hex('#b85a2a')];
  for (let i = 0; i < n; i++) { const v = 7 + h(i, 1, 70 + k) * 9, fase = h(i, 2, 70 + k), u = ((t * v / (y1 - y0) + fase) % 1), y = y0 + u * (y1 - y0);
    const x = x0 + h(i, 3, 70 + k) * (x1 - x0) + Math.sin(t * 1.8 + i * 2.1) * 6 + u * 14, gira = Math.floor(t * 5 + i) % 3, c = cols[(i + k) % 5], xx = Math.round(x), yy = Math.round(y);
    R.pset(xx, yy, c); if (gira) R.pset(xx + (gira === 1 ? 1 : -1), yy, b_mezcla(c, hex('#1c1222'), 0.25)); else R.pset(xx, yy + 1, c);
    if (s > 1) { R.pset(xx + 1, yy + 1, c); R.pset(xx - 1, yy, b_mezcla(c, C.blanco, 0.3)); if (gira === 2) R.pset(xx + 1, yy - 1, c); } }
}

// las losas de piedra en perspectiva (punto de fuga (160, fy)) entre y0 e y1, con sus juntas y su tono cada una
function b_losas(B, x0, x1, y0, y1, fy, filas, P, k = 0, clip = null) {
  for (let y = y0; y <= y1; y++) { const fila = filas.findIndex((v) => y < v), jy = filas.includes(y);
    for (let x = x0; x <= x1; x++) { if (clip && !clip(x, y)) continue; const u = (x - 160) / (y - fy) * 6 + (fila & 1) * 0.5, fu = ((u % 1) + 1) % 1, col = Math.floor(u);
      let c = jy || fu < 0.07 ? P.junta : h(col, fila, k) < 0.22 ? P.oscura : h(col, fila, k + 1) < 0.2 ? P.clara : P.base;
      if (!jy && fu >= 0.07 && fu < 0.16 && c !== P.junta) c = P.clara;   // el canto de cada losa recoge la luz
      if (h(x, y, k + 2) < 0.03) c = P.junta;
      B[y * 320 + x] = c; } }
}

function b_campus(R, t, o) {
  const { rect, pset, disco, linea, poligono } = R, K = hex('#1c1222');
  const L = { base: C.ladrillo, claro: hex('#bc5e46'), oscuro: C.ladrilloS, quemado: hex('#8e4a3e'), junta: hex('#b89a88') };
  const LS = { base: hex('#7e3a30'), claro: hex('#8e463a'), oscuro: hex('#602a24'), quemado: hex('#6a3430'), junta: hex('#8a7068') };   // el ladrillo en la sombra del pórtico
  const PI = hex('#ece2c8'), PIS = hex('#c8baa0'), PID = hex('#a2947c'), PIL = hex('#fff8e6');      // la piedra blanca
  const PZ = [hex('#3a3e4e'), hex('#4a5062'), hex('#5e6476'), hex('#767c8e')];                       // la pizarra del tejado
  // ── el cielo tramado con el sol (fijo)
  b_fijo(R, 'campusCielo', () => {
    const B = R.buf, cols = [hex('#4c84d4'), hex('#5a92da'), hex('#6ca2e2'), hex('#82b4e8'), hex('#9cc6ee'), hex('#b6d6f0'), hex('#d0e4f0')];
    for (let y = 0; y < 120; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = b_rampa(cols, y / 100 + (h(x >> 3, y >> 2, 7) - 0.5) * 0.05, x, y);
    b_halo(R, 208, 22, 30, 28, hex('#fff4d0'), 0.55); disco(208, 22, 8.5, hex('#ffe9a8')); disco(208, 22, 7, hex('#fff6d6')); disco(206, 20, 3, C.blanco);
  });
  // ── las nubes: lejanas y pálidas, medias y cercanas, cada capa a su velocidad
  const NL = [hex('#eef4f8'), hex('#d8e4ee'), hex('#bccde0')], NM = [C.blanco, hex('#e6eef6'), hex('#b4c6dc')];
  for (const [x0, y, w, v, n] of [[30, 50, 26, 1.2, NL], [190, 46, 34, 1.2, NL], [300, 54, 22, 1.2, NL], [90, 30, 40, 2.6, NM], [260, 26, 46, 2.6, NM], [10, 18, 56, 4.2, NM]])
    b_nube(R, ((x0 + t * v) % 440) - 60, y, w, n, x0);
  // los gansos que cruzan en uve hacia el sur
  { const u = (t % 17) / 17, gx = 360 - u * 440, gy = 34;
    for (let k2 = 0; k2 < 7; k2++) { const lado = k2 % 2 ? 1 : -1, n = Math.ceil(k2 / 2), x = Math.round(gx + n * 6), y = Math.round(gy + lado * n * 3), a = Math.sin(t * 9 + k2) > 0;
      pset(x, y, hex('#3a3a4a')); pset(x + 1, y, hex('#4a4a5a')); pset(x - 1, y, K); pset(x + 1, y + (a ? -1 : 1), hex('#5a5a6a')); pset(x + 2, y + (a ? -2 : 1), hex('#6a6a7a')); } }
  // ── lo fijo de delante del cielo (con huecos donde se ve): la arboleda, los edificios, el césped y el paseo
  b_encima(R, b_capa(R, 'campusFrente', () => {
    const B = R.buf;
    // la arboleda lejana de otoño, difuminada por la bruma
    const AL = [hex('#a88a7a'), hex('#bc9a80'), hex('#c8a684'), hex('#b4a48c'), hex('#d4b48c')];
    for (let x = 0; x < 320; x++) { const top = Math.round(62 + 4 * Math.sin(x * 0.11) + 3 * Math.sin(x * 0.29 + 2) + h(x >> 2, 1, 9) * 3);
      for (let y = top; y < 116; y++) { const v = h(x >> 1, y >> 1, 10); B[y * 320 + x] = y === top ? AL[4] : b_rampa(AL, 0.9 - (y - top) / 30 + (v - 0.5) * 0.5, x, y); } }
    // ── la residencia de la izquierda: tejado de pizarra con buhardillas, chimenea, fachada de ladrillo y ventanas
    for (let y = 50; y < 64; y++) for (let x = 0; x <= 88; x++) { const row = (y - 50) >> 1, u = (x + (row & 1) * 2) % 4; B[y * 320 + x] = y === 50 ? K : (y - 50) % 2 === 1 ? PZ[0] : u === 0 ? PZ[1] : h(x >> 2, row, 11) < 0.2 ? PZ[3] : PZ[2]; }
    rect(0, 63, 88, 63, PZ[0]);
    for (const dx of [14, 50]) { poligono([[dx - 2, 52], [dx + 7, 42], [dx + 16, 52]], K); poligono([[dx, 52], [dx + 7, 44], [dx + 14, 52]], PZ[2]); linea(dx + 7, 44, dx + 14, 51, PZ[0]);
      rect(dx + 2, 50, dx + 12, 60, K); rect(dx + 3, 51, dx + 11, 60, PI); rect(dx + 5, 52, dx + 9, 59, hex('#6a8eb0')); rect(dx + 7, 52, dx + 7, 59, PI); rect(dx + 5, 55, dx + 9, 55, PI); pset(dx + 5, 52, C.blanco); }
    rect(70, 38, 78, 52, K); b_ladrillos(R, 71, 39, 77, 51, L, 12); rect(69, 37, 79, 39, hex('#7a6e66')); rect(69, 37, 79, 37, hex('#9a8e86')); rect(73, 35, 75, 36, hex('#5a4e46'));
    rect(0, 64, 88, 67, PI); for (let x = 1; x < 88; x += 3) pset(x, 67, PIS); rect(0, 68, 88, 68, PID);
    b_ladrillos(R, 0, 69, 88, 113, L, 13); rect(0, 108, 88, 113, PIS); rect(0, 108, 88, 108, PI); for (let x = 0; x < 88; x += 11) rect(x, 109, x, 113, PID);
    for (const wx of [6, 22, 38, 54, 70]) { b_ventana(R, wx, 74, 9, 12, { cortina: (wx / 16 | 0) % 2 ? hex('#c8a060') : null }); b_ventana(R, wx, 93, 9, 11, {}); }
    // ── el edificio principal: las alas de ladrillo, la cornisa con dentículos y las ventanas de arco
    for (const [x0, x1] of [[96, 128], [204, 236]]) { rect(x0 - 1, 56, x1 + 1, 63, K); rect(x0, 57, x1, 62, PI); rect(x0, 57, x1, 57, PIL); for (let x = x0; x <= x1; x += 2) pset(x, 61, PIS); rect(x0, 62, x1, 62, PID);
      b_ladrillos(R, x0, 63, x1, 113, L, 14 + x0); for (const wx of [x0 + 5, x0 + 19]) b_ventana(R, wx, 74, 9, 22, { arco: true }); rect(x0, 104, x1, 113, PIS); rect(x0, 104, x1, 104, PI); for (let x = x0 + 3; x < x1; x += 9) rect(x, 106, x + 4, 109, hex('#4a4a52')); }
    // el muro del pórtico en sombra, con la puerta de dos hojas, su montante de abanico y dos ventanas
    b_ladrillos(R, 128, 64, 204, 104, LS, 20);
    b_ventana(R, 138, 74, 9, 20, { sombra: true }); b_ventana(R, 185, 74, 9, 20, { sombra: true });
    { const dx = 160; for (let j = 0; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j); if (d <= 7.5) pset(dx + 6 + i, 80 - j, d > 6.5 ? PIS : (Math.round(Math.atan2(j, i) * 3) % 2 ? hex('#3a4a5a') : hex('#5a6a7a'))); }
      rect(dx - 2, 80, dx + 14, 104, PIS); rect(dx, 81, dx + 12, 104, hex('#2a3428')); rect(dx + 6, 81, dx + 6, 104, K);
      for (const px of [dx + 1, dx + 7]) { rect(px, 83, px + 4, 91, hex('#36423a')); rect(px, 83, px + 4, 83, hex('#46524a')); rect(px, 94, px + 4, 102, hex('#36423a')); rect(px, 94, px + 4, 94, hex('#46524a')); }
      pset(dx + 5, 93, C.oro); pset(dx + 7, 93, C.oro); }
    // las sombras de las columnas sobre el muro
    for (const cx of [134, 146, 158, 174, 186, 198]) for (let y = 66; y < 104; y++) for (let x = cx + 4; x <= cx + 7; x++) if (x - cx - 4 < 3 || b_umbral(x, y) < 0.5) B[y * 320 + x] = b_mezcla(B[y * 320 + x], K, 0.35);
    // el entablamento y el frontón con su óculo
    rect(124, 56, 208, 65, K); rect(125, 57, 207, 64, PI); rect(125, 57, 207, 57, PIL); rect(125, 60, 207, 60, PIS); for (let x = 125; x < 207; x += 2) pset(x, 62, PIS); rect(125, 64, 207, 64, PID);
    poligono([[121, 57], [166, 35], [211, 57]], K); poligono([[124, 56], [166, 37], [208, 56]], PI); poligono([[132, 55], [166, 41], [200, 55]], PIS);
    linea(124, 56, 166, 37, PIL); linea(166, 37, 208, 56, PID); linea(131, 55, 166, 40, PID);
    disco(166, 50, 4.6, K); disco(166, 50, 3.6, PI); disco(166, 50, 2.6, hex('#5a7a98')); pset(165, 49, hex('#a8c8e2')); rect(166, 48, 166, 52, PI); rect(164, 50, 168, 50, PI);
    rect(166, 20, 166, 37, hex('#5a5a66')); pset(167, 20, hex('#8a8a96')); disco(166, 19, 1.2, C.oro);
    // las seis columnas: capitel, fuste con estrías, luz a la izquierda y sombra a la derecha, basa
    const COL = [PIS, PIL, PIL, PI, PI, PIS, PID];
    for (const cx of [134, 146, 158, 174, 186, 198]) { rect(cx - 4, 65, cx + 4, 67, K); rect(cx - 4, 65, cx + 4, 66, PI); rect(cx - 4, 65, cx + 4, 65, PIL); pset(cx - 4, 67, PIS); pset(cx + 4, 67, PIS);
      for (let y = 68; y < 101; y++) for (let i = -3; i <= 3; i++) B[y * 320 + cx + i] = i === -3 || i === 3 ? (i === 3 ? PID : PIS) : (y + i) % 9 === 0 && i === 1 ? PIS : COL[i + 3];
      rect(cx - 4, 101, cx + 4, 104, PIS); rect(cx - 4, 101, cx + 4, 101, PI); rect(cx - 4, 104, cx + 4, 104, PID); }
    // la escalinata: cinco peldaños que se ensanchan, con su huella clara y su tabica en sombra, y los muretes con las jardineras
    for (let i = 0; i < 5; i++) { const y = 104 + i * 3 + 1, xa = 126 - i * 3, xb = 206 + i * 3; rect(xa, y, xb, y, PIL); rect(xa, y + 1, xb, y + 2, PIS); for (let x = xa; x <= xb; x += 13) pset(x, y + 2, PID); }
    for (const [x0, x1] of [[112, 125], [207, 220]]) { rect(x0, 100, x1, 119, PIS); rect(x0, 100, x1, 101, PI); rect(x0, 119, x1, 119, PID); for (let y = 104; y < 119; y += 5) rect(x0, y, x1, y, PID);
      const cx = (x0 + x1) >> 1; rect(cx - 4, 94, cx + 4, 99, K); rect(cx - 3, 95, cx + 3, 99, hex('#c0603a')); rect(cx - 3, 95, cx + 3, 95, hex('#e08050'));
      for (let j = 0; j < 7; j++) for (let i = -5; i <= 5; i++) if (Math.hypot(i, (j - 3) * 1.3) < 5.2) pset(cx + i, 89 + j, [hex('#f0a830'), hex('#e8803a'), hex('#f8d050'), hex('#3a6a2a')][Math.floor(h(cx + i, j, 21) * 4)]); }
    // ── el ala derecha con la torre del reloj
    for (let y = 58; y < 68; y++) for (let x = 236; x < 320; x++) { const row = (y - 58) >> 1, u = (x + (row & 1) * 2) % 4; B[y * 320 + x] = y === 58 ? K : (y - 58) % 2 === 1 ? PZ[0] : u === 0 ? PZ[1] : h(x >> 2, row, 23) < 0.2 ? PZ[3] : PZ[2]; }
    rect(236, 68, 319, 71, PI); for (let x = 237; x < 320; x += 3) pset(x, 71, PIS); rect(236, 72, 319, 72, PID);
    b_ladrillos(R, 236, 73, 319, 115, L, 24); rect(236, 110, 319, 115, PIS); rect(236, 110, 319, 110, PI);
    for (const wx of [280, 296, 312]) { b_ventana(R, wx, 78, 8, 12, { cortina: wx === 296 ? hex('#5a7a4a') : null }); b_ventana(R, wx, 96, 8, 10, {}); }
    b_ventana(R, 240, 96, 8, 10, {});
    // la torre: cuerpo de ladrillo con esquinas de piedra, la esfera, el campanario con sus arcos y la aguja de cobre
    b_ladrillos(R, 247, 40, 269, 95, L, 25); for (let y = 40; y < 95; y += 4) { rect(247, y, 249 + ((y >> 2) & 1) * 2, y + 2, PI); rect(267 - ((y >> 2) & 1) * 2, y, 269, y + 2, PIS); }
    rect(246, 38, 270, 40, PI); rect(246, 38, 270, 38, PIL); rect(246, 40, 270, 40, PID);
    rect(248, 25, 268, 37, PI); rect(266, 25, 268, 37, PIS); rect(248, 25, 249, 37, PIL);
    for (const ax of [251, 260]) { rect(ax, 29, ax + 5, 37, hex('#2a2430')); for (let i = 0; i < 6; i++) pset(ax + i, 28 - (i > 0 && i < 5 ? 1 : 0), hex('#2a2430')); pset(ax + 2, 31, C.oroS); pset(ax + 3, 31, C.oroS); rect(ax + 1, 32, ax + 4, 34, C.oroS); rect(ax + 1, 32, ax + 2, 33, C.oro); }
    rect(246, 23, 270, 25, PIS); rect(246, 23, 270, 23, PIL);
    const CU = [hex('#3a6a62'), hex('#4e8a7e'), hex('#68a896'), hex('#8ac8b0')];
    for (let y = 8; y <= 22; y++) { const w = Math.round((y - 8) * 0.9); for (let x = 258 - w; x <= 258 + w; x++) pset(x, y, x === 258 - w || x === 258 + w ? K : b_rampa(CU, 0.85 - (x - 258 + w) / (2 * w + 1) * 0.8 + ((y % 3 === 0) ? -0.15 : 0), x, y)); }
    // la hiedra que trepa por las dos esquinas (roja y naranja en otoño, aún verde por dentro)
    const HI = [hex('#3a5a2a'), hex('#5a7a32'), hex('#a8402a'), hex('#c8602e'), hex('#e08a3a')];
    for (const [xa, xb, ya, sx] of [[0, 30, 68, 1], [292, 319, 74, -1], [96, 112, 80, 1]]) for (let y = ya; y < 110; y++) for (let x = xa; x <= xb; x++) {
      const lim = (sx > 0 ? x - xa : xb - x) - (y - ya) * 0.18 - h(x >> 1, y >> 1, 27) * 9; if (lim > 6) continue; const v = h(x, y, 28); if (v < 0.25) continue;
      B[y * 320 + x] = HI[Math.min(4, Math.floor(h(x >> 1, y >> 1, 29) * 3 + (v > 0.8 ? 2 : 0)))]; }
    // ── el césped a franjas, con hojas caídas, el sendero de grava del fondo, el camino de la escalinata y el paseo
    const CE = [hex('#3e7a2e'), hex('#4e8c36'), hex('#5e9e3e'), hex('#76b24a')];
    for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { const s = Math.floor((x - 160) / (y - 70) * 2.6) & 1, v = h(x, y, 31);
      let c = CE[1 + s]; if (v < 0.06) c = CE[0]; else if (v > 0.95) c = CE[3];
      if (y < 118 && h(x >> 1, y, 32) < 0.3) c = CE[0];
      const hoja = h(x, y, 33); if (hoja < 0.025 + (Math.abs(x - 36) < 30 || Math.abs(x - 294) < 28 ? 0.05 : 0)) c = [hex('#e0703a'), hex('#c8442a'), hex('#f0a83a'), hex('#e8c84a')][Math.floor(hoja * 1000) % 4];
      B[y * 320 + x] = c; }
    for (let y = 122; y <= 127; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 34); B[y * 320 + x] = y === 122 ? hex('#a89070') : y === 127 ? hex('#8a7a5a') : v < 0.15 ? hex('#b4a080') : v > 0.9 ? hex('#e8d8b4') : hex('#d4c29c'); }
    const P = { base: hex('#cfc3ac'), clara: hex('#e2d8c2'), oscura: hex('#b8aa90'), junta: hex('#968a74') };
    b_losas(B, 100, 232, 118, 139, 60, [122, 127, 133, 140], P, 35, (x, y) => { const u = (y - 118) / 22; return x >= 118 - u * 12 && x <= 214 + u * 12; });
    b_losas(B, 0, 319, 140, 165, 60, [143, 147, 152, 158, 165, 166], P, 36);
    for (let y = 141; y < 165; y++) for (let x = 0; x < 320; x++) { const v = h(x, y, 38); if (v < 0.012 + (Math.abs(x - 36) < 40 || Math.abs(x - 294) < 36 ? 0.018 : 0)) B[y * 320 + x] = [hex('#e0703a'), hex('#c8442a'), hex('#f0a83a'), hex('#b85a2a')][Math.floor(v * 4000) % 4]; }
    for (const lx of [100, 232]) for (let i = 0; i < 18; i++) { const x = lx - 2 - i, y = 141 + Math.round(i * 0.25); B[y * 320 + x] = b_mezcla(B[y * 320 + x], K, 0.3); B[y * 320 + x + 1] = b_mezcla(B[y * 320 + x + 1], K, 0.3); }
    rect(0, 140, 319, 140, P.clara); rect(0, 165, 319, 166, hex('#7a6e5a')); rect(0, 167, 319, 167, CE[0]);
    // las sombras moteadas de los árboles sobre el césped y el paseo
    for (const [cx, cy, rx, ry] of [[44, 138, 34, 7], [296, 140, 32, 7], [90, 116, 14, 3]]) for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) { if (x < 0 || x > 319) continue; const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2; if (d < 1 && h(x >> 1, y, 37) > d * 0.6 + 0.15) B[y * 320 + x] = b_mezcla(B[y * 320 + x], hex('#1c2a30'), 0.3); }
    // el banco de listones, la papelera y las bicis aparcadas
    { const bx = 52; for (const yy of [131, 133]) { rect(bx, yy, bx + 24, yy, hex('#6a4a2a')); rect(bx + 1, yy, bx + 23, yy, C.maderaL); } rect(bx, 136, bx + 24, 137, hex('#5a3a1e')); rect(bx + 1, 136, bx + 23, 136, C.maderaL);
      for (const lx of [bx + 1, bx + 22]) { rect(lx, 130, lx + 1, 141, hex('#2a3a2a')); pset(lx - 1, 141, hex('#2a3a2a')); } for (let x = bx; x <= bx + 24; x++) pset(x, 142, b_mezcla(P.base, K, 0.3)); }
    rect(88, 131, 95, 141, K); rect(89, 132, 94, 141, hex('#3e5a4a')); for (let x = 89; x < 95; x += 2) rect(x, 133, x, 140, hex('#2e4a3a')); rect(88, 130, 95, 131, hex('#5a7a6a'));
    rect(240, 134, 268, 135, hex('#8a8e9a')); for (const rx of [242, 252, 262]) rect(rx, 134, rx, 141, hex('#6a6e7a'));
    for (const [bx, col] of [[244, hex('#c83a3a')], [256, hex('#2a6ab0')]]) { for (const dx of [0, 9]) { R.anillo(bx + dx, 137, 3.6, K); pset(bx + dx, 137, hex('#8a8e9a')); }
      linea(bx, 137, bx + 4, 133, col); linea(bx + 4, 133, bx + 9, 137, col); linea(bx + 3, 133, bx + 7, 133, col); rect(bx + 2, 131, bx + 4, 131, K); linea(bx + 8, 133, bx + 9, 131, hex('#8a8e9a')); rect(bx + 8, 130, bx + 10, 130, K); }
  }));
  // ── la vida: el humo de la chimenea, la bandera, la veleta, el reloj, los gorriones y alguien que se asoma
  for (let i = 0; i < 6; i++) { const u = ((t * 0.32 + i / 6) % 1), r = 1 + u * 3, x = 74 + u * 16 + Math.sin(t * 1.5 + i) * 1.5, y = 33 - u * 20; if (y > 14) disco(x, y, r, b_mezcla(hex('#c8ccd4'), hex('#8a94a8'), u * 0.6)); }
  for (let i = 0; i < 11; i++) { const ond = Math.round(Math.sin(t * 7 - i * 0.8) * (i / 11) * 1.6); for (let j = 0; j < 7; j++) { const c = i < 5 && j < 4 ? ((i + j) % 2 && j % 2 ? C.blanco : hex('#2a3a8a')) : (j % 2 ? C.blanco : hex('#c8303a')); pset(167 + i, 21 + j + ond, c); } }
  { const a = Math.cos(Math.sin(t * 0.4) * 1.1), x0 = Math.round(258 - a * 4), x1 = Math.round(258 + a * 5); linea(258, 8, 258, 4, K); linea(x0, 4, x1, 4, K); pset(x1 - 1, 3, K); pset(x1 - 1, 5, K); pset(x0, 3, C.oroS); pset(x0 + 1, 3, C.oroS); pset(x0, 5, C.oroS); disco(258, 6, 1, C.oroS); }
  b_reloj(R, 258, 52, 7, t, hex('#c8a040'));
  for (const [px, k] of [[104, 0], [112, 1], [214, 2]]) { const pic = Math.sin(t * 4 + k * 2) > 0.6 ? 1 : 0; rect(px, 53, px + 2, 55, hex('#7a6a5a')); pset(px + 2 + pic, 53 + pic, hex('#5a4a3a')); pset(px + 3 + pic, 53 + pic, hex('#c89a3a')); pset(px, 54, hex('#9a8a78')); pset(px + 1, 56, K); }
  if (Math.floor(t / 3) % 3 === 1) { pset(42, 79, hex('#f0c8a0')); pset(43, 79, hex('#f0c8a0')); pset(42, 78, hex('#3a2a1a')); pset(43, 78, hex('#3a2a1a')); pset(42, 80, hex('#4a6a9a')); pset(43, 80, hex('#4a6a9a')); }
  // el arce pequeño entre la residencia y el edificio principal
  b_tronco(R, 90, 116, 16, 3); b_copa(R, 90, 92, 12, t, [hex('#8a6a1a'), hex('#c89a2a'), hex('#e8c84a'), hex('#f8e88a')], 3, 0.8);
  // los estudiantes: dos sentados en la escalinata (uno lee y pasa la página), cuatro que cruzan por el sendero y un ciclista
  b_figurita(R, 140, 113, t, 2, { sentada: true, d: 1, libros: Math.floor(t * 0.7) % 4 !== 0 }); b_figurita(R, 190, 110, t, 5, { sentada: true, d: -1 });
  for (let k = 0; k < 4; k++) { const d = k % 2 ? -1 : 1, v = 6 + k * 1.6, x = d > 0 ? ((t * v + k * 97) % 400) - 40 : 360 - ((t * v + k * 131) % 400); b_figurita(R, x, 126, t, k + 1, { d, libros: k !== 1, cartera: k === 1 }); }
  { const u = (t * 0.06) % 1, d = -1, x = Math.round(380 - u * 460), y = 126, g = t * 9;
    for (const dx of [0, 9]) { R.anillo(x + dx, y - 3, 3, K); pset(x + dx + Math.round(Math.cos(g) * 2), y - 3 + Math.round(Math.sin(g) * 2), K); }
    linea(x, y - 3, x + 4, y - 7, hex('#2a8a5a')); linea(x + 4, y - 7, x + 9, y - 3, hex('#2a8a5a')); linea(x + 1, y - 7, x + 5, y - 7, hex('#2a8a5a'));
    rect(x + 3, y - 13, x + 5, y - 8, hex('#e8c040')); disco(x + 4, y - 15, 1.6, hex('#c88a60')); rect(x + 3, y - 17, x + 5, y - 16, hex('#1e1612')); linea(x + 3, y - 11, x + 1, y - 8, hex('#c88a60')); linea(x + 4, y - 8, x + 4 + Math.round(Math.sin(g)), y - 4, hex('#2e3448')); void d; }
  // las farolas del paseo
  for (const lx of [100, 232]) { rect(lx, 112, lx + 1, 141, K); rect(lx - 1, 138, lx + 2, 141, K); rect(lx - 2, 104, lx + 3, 111, K); rect(lx - 1, 105, lx + 2, 110, hex('#e8ecdc')); pset(lx - 1, 105, C.blanco); rect(lx - 3, 103, lx + 4, 104, K); pset(lx, 101, K); pset(lx + 1, 102, K); rect(lx - 1, 111, lx + 2, 112, hex('#3a4a3a')); }
  // los dos arces grandes, que se mecen
  b_tronco(R, 36, 136, 36, 7); b_copa(R, 36, 94, 26, t, [hex('#7a2a1e'), hex('#b8442a'), hex('#e0703a'), hex('#f4a454')], 1);
  b_tronco(R, 294, 138, 36, 7); b_copa(R, 296, 96, 25, t + 1.7, [hex('#8a4a1a'), hex('#c8782a'), hex('#e8a83a'), hex('#f8d070')], 2);
  // hojas que caen de los arces, la ardilla que cruza el césped de delante
  b_hojas(R, t, 10, 10, 70, 80, 165, 1, 0); b_hojas(R, t, 10, 266, 320, 82, 166, 1, 3); b_hojas(R, t, 4, 80, 100, 90, 125, 1, 5);
  { const u = (t % 11) / 11, ax = Math.round(lerp(-12, 334, u)), ay = 174 - Math.round(Math.abs(Math.sin(t * 9)) * 3), g = hex('#8a6a4a'), gs = hex('#6a4a2e');
    rect(ax, ay - 2, ax + 3, ay, g); rect(ax + 3, ay - 3, ax + 4, ay - 2, g); pset(ax + 4, ay - 3, K); pset(ax + 3, ay - 4, gs); rect(ax - 2, ay - 5, ax - 1, ay - 1, gs); pset(ax - 1, ay - 6, gs); pset(ax, ay - 6, g); pset(ax + 1, ay + 1, gs); }
  return { suelo: 152, libre: [30, 280], horizonte: 112, sol: [208, 22], puerta: [160, 80, 172, 104], escalinata: [112, 104, 220, 119], reloj: [258, 52], paseo: [140, 165], banco: [52, 130, 76, 141] };
}

// lo de delante del campus: las matas de otoño de las dos esquinas de abajo, que se mecen, y hojas grandes que caen
function b_campusDelante(R, t, o) {
  for (const [cx, cy, r, k] of [[4, 178, 16, 7], [318, 176, 18, 8]]) b_copa(R, cx, cy, r, t, [hex('#5a2a1a'), hex('#9a3a22'), hex('#c8602e'), hex('#e8903a')], k, 0.8);
  b_hojas(R, t * 1.3, 6, 0, 320, -10, 186, 2, 9);
}

// una puerta de madera barnizada con su marco, dos cuarterones, el pomo de latón y la plaquita con el número
function b_puerta(R, x0, x1, y0, y1, num, noche) {
  const { rect, pset } = R, K = hex('#1c1222'), M = [hex('#5a3a22'), hex('#74502e'), hex('#8e6438'), hex('#a87a46')];
  rect(x0 - 3, y0 - 3, x1 + 3, y1, hex('#4a2e1a')); rect(x0 - 2, y0 - 2, x1 + 2, y1, M[2]); rect(x0 - 2, y0 - 2, x1 + 2, y0 - 2, M[3]); rect(x1 + 2, y0 - 2, x1 + 2, y1, M[0]);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, b_rampa(M, 0.55 + (h(x >> 2, y >> 3, 81) - 0.5) * 0.25 + (Math.sin(x * 0.9 + Math.sin(y * 0.08) * 3) * 0.12), x, y));
  for (const [ya, yb] of [[y0 + 5, y0 + 36], [y0 + 42, y1 - 6]]) { rect(x0 + 4, ya, x1 - 4, yb, M[1]); rect(x0 + 4, ya, x1 - 4, ya, M[0]); rect(x0 + 4, ya, x0 + 4, yb, M[0]); rect(x1 - 4, ya + 1, x1 - 4, yb, M[3]); rect(x0 + 5, yb, x1 - 4, yb, M[3]); }
  const px = Math.round((x0 + x1) / 2) - 6; rect(px, y0 + 10, px + 12, y0 + 18, K); rect(px + 1, y0 + 11, px + 11, y0 + 17, hex('#c8a040')); rect(px + 1, y0 + 11, px + 11, y0 + 11, hex('#f0d878'));
  b_cifras(R, num, px + 1, y0 + 12, hex('#3a2a14'));
  R.disco(x1 - 4, y0 + 46, 1.6, K); R.pset(x1 - 4, y0 + 46, hex('#e8c050')); R.pset(x1 - 5, y0 + 45, hex('#fff0a0')); rect(x1 - 5, y0 + 49, x1 - 3, y0 + 52, hex('#8a6a2a'));
  rect(x0, y1 - 1, x1, y1, noche ? hex('#e8c070') : hex('#2a1a12'));
}

// la maleta de cuero con dos correas, cantoneras de latón, el asa y pegatinas de viaje (sin letras), apoyada en suelo
function b_maleta(R, x, suelo) {
  const { rect, pset } = R, K = hex('#1c1222'), cu = [hex('#5a3418'), hex('#7a4a24'), hex('#9a6234'), hex('#b8804a')];
  for (let i = -2; i < 27; i++) pset(x + i, suelo + 1, b_mezcla(R.pget(x + i, suelo + 1), K, 0.35));
  rect(x, suelo - 15, x + 24, suelo, K);
  for (let y = suelo - 14; y < suelo; y++) for (let i = 1; i < 24; i++) pset(x + i, y, b_rampa(cu, 0.85 - (y - suelo + 14) / 14 * 0.6 + (h(x + i, y, 83) - 0.5) * 0.3, x + i, y));
  rect(x + 1, suelo - 14, x + 23, suelo - 14, cu[3]); rect(x + 1, suelo - 8, x + 23, suelo - 8, cu[0]);
  for (const sx of [x + 6, x + 17]) { rect(sx, suelo - 14, sx + 1, suelo - 1, hex('#c8a070')); rect(sx + 1, suelo - 14, sx + 1, suelo - 1, hex('#a8804a')); rect(sx - 1, suelo - 10, sx + 2, suelo - 9, hex('#e8c050')); }
  for (const [cx, cy] of [[x + 1, suelo - 14], [x + 22, suelo - 14], [x + 1, suelo - 2], [x + 22, suelo - 2]]) { rect(cx, cy, cx + 1, cy + 1, hex('#d8b050')); pset(cx, cy, hex('#f8e090')); }
  rect(x + 9, suelo - 18, x + 15, suelo - 18, K); rect(x + 9, suelo - 17, x + 9, suelo - 15, K); rect(x + 15, suelo - 17, x + 15, suelo - 15, K); rect(x + 10, suelo - 17, x + 14, suelo - 17, cu[2]);
  R.disco(x + 12, suelo - 5, 2.4, hex('#c83a3a')); pset(x + 11, suelo - 6, hex('#f8e090')); rect(x + 19, suelo - 6, x + 22, suelo - 3, hex('#2a6ab0')); pset(x + 20, suelo - 5, C.blanco); rect(x + 2, suelo - 12, x + 5, suelo - 10, hex('#e8c040')); pset(x + 3, suelo - 11, hex('#c83a3a'));
}

function b_pasillo(R, t, o) {
  const { rect, pset, disco, linea } = R, K = hex('#1c1222'), noche = !!o.noche;
  // fuera, por el ventanal: el cielo y el ladrillo de enfrente (fijo); de noche, b_fueraNoche
  const vent = [10, 28, 66, 116];   // el hueco del cristal del ventanal
  if (noche) b_fueraNoche(R, t, vent);
  else {
  b_fijo(R, 'pasilloFuera', () => {
    const B = R.buf, cols = noche ? [hex('#10163a'), hex('#182050'), hex('#222c62'), hex('#2e3a72')] : [hex('#5a92da'), hex('#78aae4'), hex('#98c2ec'), hex('#bcd8f0')];
    for (let y = 0; y < 130; y++) for (let x = 0; x < 80; x++) B[y * 320 + x] = b_rampa(cols, y / 110, x, y);
    if (noche) { disco(22, 40, 5.5, hex('#fff6d8')); disco(24, 39, 4.6, hex('#283464')); } else disco(52, 34, 5, hex('#fff6d6'));
    const L = { base: noche ? hex('#4a2a2a') : C.ladrillo, claro: noche ? hex('#5a3430') : hex('#bc5e46'), oscuro: noche ? hex('#3a2020') : C.ladrilloS, quemado: noche ? hex('#422424') : hex('#8e4a3e'), junta: noche ? hex('#3a2e34') : hex('#b89a88') };
    b_ladrillos(R, 30, 70, 79, 129, L, 90); rect(30, 66, 79, 69, noche ? hex('#5a5662') : hex('#ece2c8')); rect(30, 64, 79, 65, noche ? hex('#2a2a3a') : hex('#4a5062'));
    for (const wx of [36, 52, 68]) for (const wy of [76, 96]) { rect(wx, wy, wx + 6, wy + 9, noche ? hex('#2a2a3a') : hex('#f2eee2')); rect(wx + 1, wy + 1, wx + 5, wy + 8, noche ? ((wx + wy) % 3 ? hex('#f0c860') : hex('#3a3a52')) : hex('#7a9ab8')); rect(wx + 3, wy, wx + 3, wy + 9, noche ? hex('#2a2a3a') : hex('#f2eee2')); }
    for (let y = 112; y < 130; y++) for (let x = 0; x < 80; x++) B[y * 320 + x] = noche ? (h(x, y, 91) < 0.1 ? hex('#1a2a1e') : hex('#24382a')) : (h(x, y, 91) < 0.15 ? hex('#4e8c36') : hex('#5e9e3e'));
  });
  R.recorte(vent);
  for (const [x0, y, w, v] of [[0, 40, 26, 2], [40, 52, 18, 3.5]]) b_nube(R, 10 + ((x0 + t * v) % 90) - 20, y, w, [C.blanco, hex('#e6eef6'), hex('#b4c6dc')], x0);
  b_copa(R, 22, 74, 20, t, [hex('#7a2a1e'), hex('#b8442a'), hex('#e0703a'), hex('#f4a454')], 4, 1.6);
  { const u = (t * 0.07) % 1, x = Math.round(lerp(80, 0, u)); b_figurita(R, x, 114, t, 3, { d: -1, libros: true }); }
  b_hojas(R, t, 5, 4, 50, 40, 116, 1, 11);
  R.recorte(null);
  }
  // lo fijo de dentro, con el hueco del cristal
  b_encima(R, b_capa(R, noche ? 'pasilloN' : 'pasillo', () => {
    const B = R.buf;
    // el techo de placas fonoabsorbentes con sus agujeritos, y la moldura
    for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y % 7 === 6 || x % 24 === 0 ? hex('#b8b4a4') : ((x * 3 + y * 5) % 7 === 0 && h(x, y, 93) < 0.6) ? hex('#c8c4b4') : hex('#e4e0d0');
    rect(0, 14, 319, 16, hex('#c8b898')); rect(0, 14, 319, 14, hex('#ece2c8')); rect(0, 16, 319, 16, hex('#8a7a60'));
    for (const [x0, x1] of [[44, 96], [168, 220]]) { rect(x0, 2, x1, 7, hex('#8a8a90')); rect(x0 + 1, 3, x1 - 1, 6, hex('#d8dce0')); }
    // la pared de bloques pintados (crema), con la luz del ventanal a la izquierda
    const PB = [hex('#b4ae90'), hex('#c8c2a2'), hex('#d8d2b2'), hex('#e6e0c2')];
    for (let y = 17; y < 98; y++) for (let x = 0; x < 320; x++) { const fila = (y - 17) >> 3, u = x + (fila & 1) * 8, junta = (y - 17) % 8 === 7 || u % 16 === 15;
      const luz = 0.62 - Math.max(0, x - 70) / 600 + (h(u >> 4, fila, 94) - 0.5) * 0.12 + (h(x, y, 95) - 0.5) * 0.18;
      B[y * 320 + x] = junta ? (luz > 0.55 ? PB[1] : PB[0]) : b_rampa(PB, luz + ((y - 17) % 8 === 0 ? 0.15 : 0), x, y); }
    // el zócalo de tablas de roble, el pasamanos y el rodapié
    const MZ = [hex('#6a4426'), hex('#86582e'), hex('#a0703c'), hex('#b8864c')];
    rect(0, 98, 319, 101, MZ[1]); rect(0, 98, 319, 98, MZ[3]); rect(0, 101, 319, 101, MZ[0]);
    for (let y = 102; y < 135; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = x % 9 === 8 ? MZ[0] : x % 9 === 0 ? MZ[3] : b_rampa(MZ, 0.6 - Math.max(0, x - 70) / 700 + Math.sin((y + h(x / 9 | 0, 0, 96) * 40) * 0.5) * 0.08 + (h(x, y >> 2, 97) - 0.5) * 0.2, x, y);
    rect(0, 135, 319, 138, hex('#3a2414')); rect(0, 135, 319, 135, MZ[1]);
    // el suelo de linóleo a cuadros en perspectiva, encerado, con la luz del ventanal y los reflejos
    const LA = [hex('#c4b89c'), hex('#d8ceb2'), hex('#e6dcc2')], LV = [hex('#6e8068'), hex('#82947a'), hex('#94a68a')];
    for (let y = 139; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(900 / (y - 100)), col = Math.floor((x - 160) / (y - 100) * 2.4), cuadro = (fila + col) & 1, pal = cuadro ? LV : LA;
      let v = 0.45 + (h(x >> 1, y, 98) - 0.5) * 0.3; if (h(x, y, 99) < 0.02) v -= 0.4; if (((x + y * 2) % 37) < 2 && h(x >> 3, y >> 2, 100) < 0.4) v += 0.5;
      B[y * 320 + x] = b_rampa(pal, v, x, y); }
    rect(0, 139, 319, 139, hex('#2a1a10'));
    // el ventanal con su marco de madera pintada, los parteluces, el alféizar con la maceta y los libros, y el radiador
    const MB = [hex('#a8a290'), hex('#d0cab8'), hex('#ece8dc'), hex('#fbf8ee')];
    rect(6, 24, 70, 120, MB[0]); rect(7, 25, 69, 119, MB[2]); rect(7, 25, 69, 25, MB[3]); rect(69, 25, 69, 119, MB[1]);
    for (let y = 28; y <= 116; y++) for (let x = 10; x <= 66; x++) B[y * 320 + x] = 0;
    for (const mx of [28, 48]) { rect(mx - 1, 28, mx + 1, 116, MB[2]); rect(mx + 1, 28, mx + 1, 116, MB[1]); }
    for (const my of [56, 86]) { rect(10, my - 1, 66, my + 1, MB[2]); rect(10, my + 1, 66, my + 1, MB[1]); }
    rect(4, 117, 72, 121, MB[2]); rect(4, 117, 72, 117, MB[3]); rect(4, 121, 72, 121, MB[0]); rect(5, 122, 71, 122, hex('#8a7a60'));
    rect(52, 110, 60, 116, hex('#a8502e')); rect(52, 110, 60, 110, hex('#c8703e')); for (let j = 0; j < 9; j++) for (let i = -5; i <= 5; i++) if (Math.hypot(i, (j - 4) * 1.2) < 5 && h(i, j, 101) < 0.8) pset(56 + i, 101 + j, [hex('#3a6a2a'), hex('#5a8a3a'), hex('#7aaa4a')][Math.floor(h(i, j, 102) * 3)]);
    for (const [bx, by, bw, c] of [[14, 113, 12, hex('#2a4fa8')], [15, 110, 10, hex('#c83a3a')], [13, 107, 12, hex('#3a8a4a')]]) { rect(bx, by, bx + bw, by + 2, c); rect(bx, by, bx + bw, by, b_mezcla(c, C.blanco, 0.3)); rect(bx + bw, by, bx + bw, by + 2, hex('#f2eee2')); }
    rect(12, 124, 64, 136, hex('#8a8474')); for (let x = 13; x < 64; x += 3) { rect(x, 124, x + 1, 136, hex('#e2dccc')); rect(x + 1, 125, x + 1, 135, hex('#b8b2a2')); } rect(12, 123, 64, 124, hex('#f2eee2')); rect(14, 136, 16, 138, hex('#6a6454')); rect(60, 136, 62, 138, hex('#6a6454'));
    // las tres puertas, el tablón de corcho, la fuente de agua, las taquillas
    b_puerta(R, 82, 108, 54, 138, '212', noche); b_puerta(R, 196, 222, 54, 138, '214', noche); b_puerta(R, 290, 316, 54, 138, '216', noche);
    rect(114, 48, 188, 96, hex('#5a3a22')); rect(115, 49, 187, 95, hex('#8a5e36')); rect(115, 49, 187, 49, hex('#a87a46'));
    for (let y = 51; y <= 93; y++) for (let x = 117; x <= 185; x++) { const v = h(x, y, 103); B[y * 320 + x] = v < 0.18 ? hex('#a8763e') : v > 0.88 ? hex('#dcae6c') : hex('#c8945a'); }
    const papel = (x, y, w, hh, c, rayas, chin) => { rect(x + 1, y + 1, x + w + 1, y + hh + 1, hex('#8a5e36')); rect(x, y, x + w, y + hh, c); if (rayas) for (let j = y + 3; j < y + hh - 1; j += 2) rect(x + 2, j, x + w - 2 - ((j * 7) % 4), j, b_mezcla(c, K, 0.45)); disco(x + w / 2, y + 1, 1, chin); };
    papel(119, 54, 14, 18, hex('#f6f2ea'), true, hex('#c83a3a')); papel(137, 56, 11, 10, hex('#f0e08a'), true, hex('#2a4fa8'));
    papel(166, 53, 15, 12, hex('#f6f2ea'), false, hex('#3a8a4a')); rect(167, 54, 180, 60, hex('#8ac8e8')); rect(167, 60, 180, 64, hex('#5aa83a')); disco(176, 57, 1.5, hex('#fff4c8')); R.poligono([[168, 61], [172, 57], [176, 61]], hex('#7a8a9a'));
    R.poligono([[160, 70], [183, 74], [160, 78]], hex('#7a1e28')); linea(161, 74, 178, 74, hex('#f0d8a0')); rect(159, 70, 159, 78, hex('#5a3a22'));
    rect(120, 76, 141, 92, hex('#f6f2ea')); rect(120, 76, 141, 79, hex('#c83a3a')); b_cifras(R, '10', 126, 80, hex('#c83a3a'));
    for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) pset(122 + i * 3, 87 + j * 2, (i + j * 6) === 8 ? hex('#c83a3a') : hex('#8a8a8a'));
    papel(146, 82, 12, 9, hex('#f0b0c0'), true, hex('#e8c040')); papel(164, 81, 18, 11, hex('#f6f2ea'), true, hex('#c83a3a'));
    rect(142, 106, 158, 113, hex('#6a6e7a')); rect(143, 107, 157, 112, hex('#c8ccd8')); rect(144, 108, 156, 110, hex('#8a8e9a')); rect(143, 107, 157, 107, C.blanco); rect(148, 113, 152, 124, hex('#8a8e9a')); rect(149, 113, 149, 124, hex('#c8ccd8')); rect(152, 107, 153, 106, hex('#a8acb8'));
    const TQ = [hex('#4a5a52'), hex('#5e7066'), hex('#728478'), hex('#8a9c90')];
    rect(229, 58, 281, 139, K); rect(229, 58, 281, 60, TQ[3]);
    for (let k = 0; k < 5; k++) { const x0 = 230 + k * 10; for (let y = 61; y < 134; y++) for (let x = x0; x < x0 + 9; x++) B[y * 320 + x] = b_rampa(TQ, 0.75 - (x - x0) / 9 * 0.45 + (h(x, y >> 2, 104 + k) - 0.5) * 0.15, x, y);
      for (let j = 0; j < 4; j++) rect(x0 + 2, 64 + j * 2, x0 + 6, 64 + j * 2, TQ[0]); rect(x0 + 2, 74, x0 + 6, 78, hex('#c8c4b4')); b_cifras(R, String(31 + k).slice(1), x0 + 3, 74, K);
      rect(x0 + 7, 94, x0 + 7, 100, hex('#c8ccd8')); pset(x0 + 7, 101, TQ[0]); for (let j = 0; j < 3; j++) rect(x0 + 2, 124 + j * 2, x0 + 6, 124 + j * 2, TQ[0]); rect(x0 + 8, 61, x0 + 8, 133, K); }
    rect(229, 134, 281, 138, hex('#2a3430'));
    // el extintor colgado junto a la 212 (soporte, cuerpo rojo con su brillo, la manguera y el manómetro) y su placa
    rect(72, 88, 79, 94, hex('#8a1e1e')); rect(73, 89, 78, 93, hex('#d83a32')); pset(75, 90, C.blanco); pset(76, 91, C.blanco); pset(75, 92, C.blanco); pset(77, 90, hex('#ffd070'));
    rect(73, 105, 78, 107, hex('#3a3a44')); rect(74, 108, 78, 127, hex('#7a1414')); rect(74, 108, 77, 126, hex('#c8302a')); rect(75, 109, 75, 125, hex('#f07060')); rect(77, 109, 77, 126, hex('#981e1a'));
    rect(74, 114, 78, 117, hex('#e8e0c8')); rect(74, 114, 78, 114, hex('#b8b0a0')); rect(75, 104, 77, 107, hex('#2a2a30')); pset(76, 103, hex('#c8a040')); rect(78, 103, 79, 104, hex('#2a2a30'));
    linea(79, 104, 80, 112, hex('#1c1c22')); linea(80, 112, 79, 122, hex('#1c1c22')); rect(78, 122, 79, 124, hex('#3a3a44')); rect(74, 128, 78, 128, hex('#4e2a1a'));
    // la señal de salida que cuelga del techo (pictograma del hombrecillo que corre y la flecha, sin letras)
    rect(124, 17, 124, 19, hex('#4a4a52')); rect(138, 17, 138, 19, hex('#4a4a52')); b_salida(R, 120, 20, false);
    // la luz del ventanal: el haz en el aire y el trapecio que cae en el suelo, y los reflejos de las puertas en el cera
    if (!noche) { for (let y = 122; y < 180; y++) { const xa = 6 + (y - 122) * 0.9 + (y > 139 ? (y - 139) * 0.5 : 0), xb = 72 + (y - 122) * 1.2 + (y > 139 ? (y - 139) * 0.6 : 0);
        for (let x = Math.floor(xa); x <= xb; x++) if (y > 138 && b_umbral(x, y) < 0.6) B[y * 320 + x] = b_mezcla(B[y * 320 + x], hex('#fff4d8'), 0.35); }
      for (let y = 30; y < 139; y++) for (let x = 70; x < 70 + (y - 30) * 0.6; x++) if (b_umbral(x, y) < 0.12 && (x - 70) < 40) B[y * 320 + x] = b_mezcla(B[y * 320 + x], hex('#fff4d8'), 0.25); }
    for (const [x0, x1] of [[82, 108], [196, 222], [290, 316], [229, 281]]) for (let y = 140; y < 162; y++) for (let x = x0; x <= x1; x++) if (b_umbral(x, y) < 0.5 - (y - 140) / 44) B[y * 320 + x] = b_mezcla(B[y * 320 + x], hex('#6a4426'), 0.25);
    // de noche: todo más oscuro y azulado, y los charcos de luz de los tubos en la pared y en el suelo
    if (noche) { for (let i = 0; i < 57600; i++) if (B[i]) B[i] = b_mezcla(B[i], hex('#0e1230'), 0.62);
      for (const cx of [70, 194]) { b_halo(R, cx, 10, 80, 90, hex('#ffe8b0'), 0.55); b_halo(R, cx, 150, 70, 22, hex('#fff0c8'), 0.45); }
      for (const [x0, x1] of [[82, 108], [196, 222], [290, 316]]) for (let y = 139; y < 150; y++) for (let x = x0 - (y - 139); x <= x1 + (y - 139); x++) if (b_umbral(x, y) < 0.5 - (y - 139) / 24) B[y * 320 + x] = b_mezcla(B[y * 320 + x], hex('#e8c070'), 0.35);
      for (let y = 28; y <= 116; y++) for (let x = 10; x <= 66; x++) if (Math.abs(x - 28) > 1 && Math.abs(x - 48) > 1 && Math.abs(y - 56) > 1 && Math.abs(y - 86) > 1) B[y * 320 + x] = 0; }   // el cristal vuelve a ser hueco; los parteluces se quedan
  }));
  // la vida: los tubos (el segundo parpadea), el reloj, el papel que se levanta, la sombra que pasa por debajo de la 214
  for (const [x0, x1, k] of [[44, 96, 0], [168, 220, 1]]) { const on = !(k && (t % 6.1) < 0.3 && Math.sin(t * 60) > -0.3);
    rect(x0 + 1, 3, x1 - 1, 6, on ? C.blanco : hex('#a8acb4')); for (let x = x0 + 4; x < x1; x += 6) rect(x, 3, x, 6, on ? hex('#e8ecf0') : hex('#8a8e96'));
    if (on) for (let y = 7; y < 14; y++) for (let x = x0 - (y - 7) * 2; x <= x1 + (y - 7) * 2; x++) if ((x + y) % 3 === 0) pset(x, y, hex('#f6f4ea')); }
  b_reloj(R, 256, 40, 6, t, hex('#5a5a66'), 0.4);
  // de noche: la señal de salida encendida, la tele de la 212 por debajo de la puerta y una polilla en el tubo
  if (noche) { b_salida(R, 120, 20, true); b_halo(R, 131, 24, 18, 9, hex('#5af0a0'), 0.25);
    const tv = [hex('#6aa0e8'), hex('#a8c8f8'), hex('#4a7ad0'), hex('#e0e8ff')][Math.floor(t * 3.1 + Math.sin(t * 5)) & 3]; rect(83, 137, 107, 138, tv);
    for (let x = 80; x < 111; x++) if (b_umbral(x, 139) < 0.5) pset(x, 139, b_mezcla(R.pget(x, 139), tv, 0.4));
    const mx = Math.round(194 + Math.cos(t * 6.3) * 12 + Math.sin(t * 2.1) * 4), my = Math.round(9 + Math.sin(t * 9.7) * 2.5); pset(mx, my, hex('#c8b8a0')); pset(mx + (Math.sin(t * 40) > 0 ? 1 : -1), my, hex('#8a7a68')); }
  { const sube = Math.max(0, Math.sin(t * 1.7)) * 3 * (0.6 + 0.4 * Math.sin(t * 0.37)); for (let j = 0; j < 10; j++) { const dx = Math.round(sube * (j / 10) ** 2); rect(137 + dx, 56 + j, 148 + dx, 56 + j, j % 2 && j > 1 && j < 9 ? hex('#b4a460') : hex('#f0e08a')); } disco(142, 57, 1, hex('#2a4fa8')); }
  { const u = (t % 7) / 7; if (u > 0.3 && u < 0.6) { const sx = Math.round(lerp(196, 222, (u - 0.3) / 0.3)); rect(Math.max(196, sx - 3), 137, Math.min(222, sx + 3), 138, hex('#1c1222')); } }
  // las motas que flotan en la luz (de día)
  if (!noche) for (let k = 0; k < 14; k++) { const x = 70 + ((h(k, 1, 105) * 50 + t * (1.5 + h(k, 2, 105) * 2)) % 50) + h(k, 3, 105) * 30, y = 60 + ((h(k, 4, 105) * 80 + t * 3 * (k % 2 ? 1 : -0.6)) % 80 + 80) % 80; if (Math.sin(t * 2 + k) > -0.2) pset(Math.round(x), Math.round(y), hex('#fff8e0')); }
  let maleta = null;
  if (o.maleta) { const mx = o.maleta === true ? 236 : o.maleta; b_maleta(R, mx, 152); maleta = [mx, 134, mx + 24, 152]; }
  return { suelo: 150, libre: [70, 284], ventana: [6, 24, 70, 120], puertas: [[82, 54, 108, 138], [196, 54, 222, 138], [290, 54, 316, 138]], corcho: [114, 48, 188, 96], taquillas: [229, 58, 281, 138], fuente: [142, 106, 158, 124], reloj: [256, 40], maleta };
}
// lo de delante del pasillo: la papelera de la esquina y, de día, motas grandes que cruzan la luz
function b_pasilloDelante(R, t, o) {
  const { rect, pset } = R, K = hex('#1c1222'), x0 = 2;
  rect(x0, 158, x0 + 16, 180, K); for (let y = 159; y < 180; y++) for (let x = x0 + 1; x < x0 + 16; x++) pset(x, y, (x - x0) % 4 === 0 ? hex('#4a5a52') : b_rampa([hex('#5e7066'), hex('#728478'), hex('#8a9c90')], 0.9 - (x - x0) / 16, x, y));
  rect(x0 - 1, 157, x0 + 17, 159, hex('#8a9c90')); rect(x0 + 3, 154, x0 + 9, 157, hex('#f6f2ea')); pset(x0 + 5, 155, hex('#c8c2b0')); rect(x0 + 10, 155, x0 + 13, 157, hex('#e8c040'));
  if (o.noche) { const g = R.pget(x0 + 8, 170); pset(x0 + 8, 170, g); return; }
  for (let k = 0; k < 4; k++) { const x = (h(k, 1, 106) * 80 + t * (3 + k)) % 110 + 60, y = 120 + ((h(k, 2, 106) * 50 + t * 2) % 50); if (Math.sin(t * 1.5 + k) > 0) { pset(Math.round(x), Math.round(y), hex('#fffbe8')); pset(Math.round(x) + 1, Math.round(y), hex('#f8eccc')); } }
}

const b_LAB = { k: hex('#1c1222'), pared: [hex('#232838'), hex('#2c3244'), hex('#363e52'), hex('#424a60')], junta: hex('#1c2030'),
  suelo: [hex('#1e222c'), hex('#282c38'), hex('#323846'), hex('#3e4454')], ac: [hex('#3e4252'), hex('#6a6e80'), hex('#a8acbc'), hex('#d8dce8')],
  cobre: [hex('#5a2a14'), hex('#8a4a22'), hex('#c87a3a'), hex('#f0b070')], calido: hex('#f0b060'), frio: hex('#a8e8ff'), violeta: hex('#7a4ad8') };

// la pared de bloques de hormigón pintados en la penumbra, entre y0 e y1 (en el búfer)
function b_paredLab(B, y0, y1, k = 0) {
  const P = b_LAB.pared;
  for (let y = y0; y < y1; y++) { const fila = (y - y0) >> 3; for (let x = 0; x < 320; x++) { const u = x + (fila & 1) * 10, jn = (y - y0) % 8 === 7 || u % 20 === 19;
    B[y * 320 + x] = jn ? b_LAB.junta : b_rampa(P, 0.45 + ((y - y0) % 8 === 0 ? 0.2 : 0) + (h(u / 20 | 0, fila, 110 + k) - 0.5) * 0.25 + (h(x, y, 111) - 0.5) * 0.25, x, y); } }
}

// el suelo de hormigón con juntas, manchas y motas, entre y0 y 180
function b_sueloLab(B, y0) {
  const S = b_LAB.suelo;
  for (let y = y0; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 0.5 + (h(x >> 2, y >> 1, 112) - 0.5) * 0.3 + (h(x, y, 113) - 0.5) * 0.3 - (y - y0) * 0.004;
    if (Math.abs((x - 160) / (y - 60) * 3 % 1) < 0.02) v -= 0.4; if (h(x >> 3, y >> 2, 114) < 0.05) v -= 0.25;
    B[y * 320 + x] = b_rampa(S, v, x, y); }
}

// la máquina: plataforma, puntales, aro con remaches y bombillas, antenas y bobinas; carga 0–1 y roto (después de estallar)
function b_maquina(R, t, carga, roto) {
  const { rect, pset, disco, linea } = R, A = b_LAB.ac, K = b_LAB.k, cx = 225, cy = 88;
  // los puntales que sujetan el aro
  for (const [xb, xt] of [[196, 206], [254, 244]]) for (let i = -2; i <= 2; i++) linea(xb + i, 137, xt + i, 118, i === -2 ? A[3] : i === 2 ? A[0] : A[1 + (i > 0 ? 0 : 1)]);
  // el aro: un toro de acero con la luz arriba a la izquierda, juntas cada 30° y remaches
  for (let y = cy - 41; y <= cy + 41; y++) for (let x = cx - 41; x <= cx + 41; x++) { const dx = x - cx, dy = y - cy, r = Math.hypot(dx, dy); if (r > 40.6 || r < 32.4) continue;
    const a = Math.atan2(dy, dx), seg = ((a / (Math.PI / 6)) % 1 + 1) % 1, rr = (r - 32.5) / 8, n = (rr - 0.5) * 2;
    if (r > 39.6 || r < 33.4) { pset(x, y, K); continue; }
    let v = 0.5 + n * (-(dx + dy) / r) * 0.45 + (1 - Math.abs(n)) * 0.25; if (seg < 0.04 || seg > 0.98) v = 0.05; if (roto) { const q = h(x >> 1, y >> 1, 115); if (q < 0.35 && Math.abs(a + 1.2) < 1.4) v = -0.2; else v *= 0.75; }
    pset(x, y, v < 0 ? hex('#141218') : b_rampa(A, v, x, y)); }
  for (let i = 0; i < 12; i++) { const a = (i + 0.5) * Math.PI / 6; pset(Math.round(cx + Math.cos(a) * 36), Math.round(cy + Math.sin(a) * 36), roto ? A[0] : A[3]); pset(Math.round(cx + Math.cos(a) * 36) + 1, Math.round(cy + Math.sin(a) * 36) + 1, A[0]); }
  // dentro del aro: el remolino violeta y azul que crece con la carga, los arcos y el núcleo blanco
  if (carga > 0.02 && !roto) {
    for (let y = cy - 32; y <= cy + 32; y++) for (let x = cx - 32; x <= cx + 32; x++) { const dx = x - cx, dy = y - cy, r = Math.hypot(dx, dy); if (r > 32.4) continue;
      const a = Math.atan2(dy, dx), s = Math.sin(a * 3 + r * 0.32 - t * 5) * 0.5 + 0.5, k = carga * (0.35 + 0.65 * (1 - r / 33)) * (0.55 + 0.45 * s);
      const q = Math.floor(k * 4 + b_umbral(x, y)) / 4; if (q <= 0) continue; const c = s > 0.6 ? b_LAB.frio : b_LAB.violeta; pset(x, y, b_mezcla(R.pget(x, y), c, Math.min(0.95, q))); }
    if (carga > 0.45) for (let k = 0; k < 3; k++) { if (Math.sin(t * 23 + k * 7) < 0.2) continue; let a = h(k, Math.floor(t * 9), 116) * Math.PI * 2, px = cx + Math.cos(a) * 32, py = cy + Math.sin(a) * 32;
      for (let s = 0; s < 6; s++) { const nx = lerp(px, cx, 0.3) + (h(k, s, Math.floor(t * 12)) - 0.5) * 8, ny = lerp(py, cy, 0.3) + (h(s, k, Math.floor(t * 12) + 1) - 0.5) * 8; linea(px, py, nx, ny, s % 2 ? b_LAB.frio : C.blanco); px = nx; py = ny; } }
    if (carga > 0.75) { const r = 2 + (carga - 0.75) * 20 + Math.sin(t * 9) * 1; disco(cx, cy, r + 2, b_LAB.frio); disco(cx, cy, r, C.blanco); }
  }
  if (roto) for (let y = cy - 32; y <= cy + 32; y++) for (let x = cx - 32; x <= cx + 32; x++) { const r = Math.hypot(x - cx, y - cy); if (r > 32.4) continue; const q = Math.floor((1 - r / 33) * 3 + b_umbral(x, y) + (h(x >> 1, y >> 1, 117) - 0.5)) / 3; if (q > 0) pset(x, y, b_mezcla(R.pget(x, y), hex('#0c0a10'), Math.min(0.85, q))); }
  // las doce bombillas del borde, que corren más deprisa con la carga
  for (let i = 0; i < 12; i++) { const a = -Math.PI / 2 + i * Math.PI / 6, bx = Math.round(cx + Math.cos(a) * 43.5), by = Math.round(cy + Math.sin(a) * 43.5);
    const fase = ((i - Math.floor(t * (2 + carga * 14))) % 12 + 12) % 12, on = !roto && (carga > 0.02 ? fase < 2 + carga * 7 : (i === 0 && Math.sin(t * 3) > 0));
    const col = [hex('#f0c040'), hex('#e84a3a'), hex('#5ae08a')][i % 3];
    rect(bx - 1, by - 1, bx + 1, by + 1, K); rect(bx - 1, by - 1, bx, by, on ? col : b_mezcla(col, K, 0.7)); if (on) { pset(bx - 1, by - 1, C.blanco); if (carga > 0.4) { pset(bx - 2, by, b_mezcla(col, K, 0.3)); pset(bx + 1, by + 1, b_mezcla(col, K, 0.3)); } } }
  // las tres antenas con sus aisladores (la del centro, doblada si se ha roto) y los chispazos de las puntas
  const ants = [[225, 47, roto ? 236 : 225, roto ? 30 : 26], [199, 57, 188, 34], [251, 57, 262, 34]];
  for (const [x0, y0, x1, y1] of ants) { linea(x0, y0, x1, y1, K); linea(x0 + 1, y0, x1 + 1, y1, A[2]); disco(x1, y1 - 1, 2.2, K); disco(x1, y1 - 1, 1.4, carga > 0.5 && !roto ? b_LAB.frio : A[2]); pset(x1 - 1, y1 - 2, C.blanco);
    for (const u of [0.3, 0.6]) { const ix = Math.round(lerp(x0, x1, u)), iy = Math.round(lerp(y0, y1, u)); rect(ix - 1, iy, ix + 2, iy, hex('#e8e0d0')); } }
  if (carga > 0.5 && !roto && Math.sin(t * 17) > 0.1) { const [, , ax, ay] = ants[1], [, , bx, by] = ants[0]; let px = ax, py = ay - 1; for (let s = 1; s <= 6; s++) { const nx = lerp(ax, bx, s / 6), ny = lerp(ay, by, s / 6) - 2 + (h(s, Math.floor(t * 15), 118) - 0.5) * 6; linea(px, py, nx, ny, b_LAB.frio); px = nx; py = ny; } }
  // las bobinas de cobre de los lados, que se ponen al rojo con la carga
  for (const [x0, k] of [[171, 0], [265, 1]]) { const desp = roto && k === 0 ? 3 : 0;
    rect(x0 - 1, 72 - desp, x0 + 14, 75 - desp, K); rect(x0, 73 - desp, x0 + 13, 74 - desp, A[2]); rect(x0 - 1, 105, x0 + 14, 108, K); rect(x0, 106, x0 + 13, 107, A[1]);
    for (let y = 76; y < 105; y++) for (let x = x0; x <= x0 + 13; x++) { const u = (x - x0) / 13; let c = b_rampa(b_LAB.cobre, 0.95 - Math.abs(u - 0.3) * 1.5 - (y % 2 ? 0.25 : 0), x, y);
      if (carga > 0.4 && !roto) { const g = (carga - 0.4) * (0.7 + 0.3 * Math.sin(t * 8 + y * 0.4)); c = b_mezcla(c, hex('#ff8a3a'), Math.min(0.6, g)); } pset(x, y, c); }
    rect(x0 - 1, 75, x0 - 1, 105, K); rect(x0 + 14, 75, x0 + 14, 105, K); }
  // la plataforma con la chapa estriada, la franja de peligro, las rejillas y los remaches
  rect(174, 135, 276, 150, K); for (let x = 175; x < 276; x++) { pset(x, 136, A[3]); pset(x, 137, (x % 4 === 0) ? A[1] : A[2]); }
  for (let y = 139; y < 143; y++) for (let x = 175; x < 276; x++) pset(x, y, ((x + y) >> 2) % 2 ? hex('#e8c040') : hex('#2a2430'));
  for (let y = 144; y < 150; y++) for (let x = 175; x < 276; x++) pset(x, y, b_rampa(A, 0.4 - (y - 144) * 0.05 + (h(x, y, 119) - 0.5) * 0.2, x, y));
  for (let x = 180; x < 276; x += 12) { pset(x, 145, A[3]); pset(x, 148, A[0]); } for (let x = 214; x < 236; x += 2) rect(x, 145, x, 148, K);
}

function b_laboratorio(R, t, o) {
  const { rect, pset, disco, linea } = R, K = b_LAB.k, A = b_LAB.ac;
  const e = b_lim(o.estalla ?? 0), roto = e > 0.06, carga = roto ? 0 : b_lim(o.carga ?? 0), pal = b_lim(o.palanca ?? 0);
  // fuera, por la ventana: la noche sobre el campus (fijo)
  b_fijo(R, 'labFuera', () => {
    const B = R.buf, cols = [hex('#0e1230'), hex('#141a3e'), hex('#1c244c'), hex('#26305a')];
    for (let y = 0; y < 90; y++) for (let x = 0; x < 100; x++) B[y * 320 + x] = b_rampa(cols, y / 80, x, y);
    b_halo(R, 34, 36, 18, 18, hex('#3a4a7a'), 0.6); disco(34, 36, 5, hex('#f4f0d8')); disco(33, 35, 2, hex('#fffbe8')); pset(36, 38, hex('#d8d2b8')); pset(32, 38, hex('#d8d2b8'));
    for (let x = 16; x < 96; x++) { const top = Math.round(66 + Math.sin(x * 0.2) * 2 + h(x >> 2, 0, 120) * 3); for (let y = top; y < 82; y++) B[y * 320 + x] = hex('#0a0c1a'); }
    rect(50, 54, 96, 82, hex('#1a1424')); rect(64, 46, 96, 54, hex('#14101e')); rect(72, 30, 82, 56, hex('#1a1424')); R.poligono([[70, 31], [77, 18], [84, 31]], hex('#12202a'));
    disco(77, 40, 3.6, hex('#e8d090')); disco(77, 40, 2.6, hex('#fff0b8')); pset(77, 39, K); pset(78, 40, K);
  });
  const ven = [18, 24, 92, 78];
  R.recorte(ven);
  for (let k = 0; k < 22; k++) { const x = 18 + Math.floor(h(k, 1, 121) * 74), y = 24 + Math.floor(h(k, 2, 121) * 30); if (Math.sin(t * 1.7 + k * 2.3) > -0.2) pset(x, y, k % 5 ? hex('#a8b0d8') : C.blanco); }
  for (const [wx, wy, k] of [[54, 60, 0], [60, 60, 1], [66, 60, 2], [54, 68, 3], [60, 68, 4], [72, 60, 5], [86, 60, 6], [86, 68, 7], [66, 50, 8], [88, 50, 9]]) { const on = Math.sin(t * 0.4 + k * 1.9) > -0.3 && (Math.floor(t / 3 + k) % 5 !== 0); rect(wx, wy, wx + 2, wy + 3, on ? (k % 3 ? hex('#f0c860') : hex('#f8e0a0')) : hex('#2a2234')); }
  b_nube(R, ((t * 2.2) % 130) - 20, 32, 26, [hex('#3a4268'), hex('#2a3256'), hex('#202848')], 3);
  b_copa(R, 22, 70, 9, t, [hex('#06080e'), hex('#0c0e18'), hex('#121624'), hex('#1a1e2e')], 6, 1.2);
  R.recorte(null);
  // lo fijo de la sala (con el hueco de la ventana)
  b_encima(R, b_capa(R, 'lab', () => {
    const B = R.buf;
    b_paredLab(B, 12, 132); b_sueloLab(B, 133);
    // el techo de hormigón con las tuberías, sus abrazaderas y el conducto
    for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = b_rampa([hex('#161824'), hex('#1e2230'), hex('#262a3a')], 0.4 + (h(x >> 2, y >> 1, 122) - 0.5) * 0.4, x, y);
    for (const [y, c] of [[4, [hex('#3a3e4e'), hex('#5a5e70'), hex('#7a7e90')]], [8, [hex('#4a2e1e'), hex('#7a4a2a'), hex('#a8683a')]]]) { rect(0, y - 1, 319, y + 1, c[1]); rect(0, y - 1, 319, y - 1, c[2]); rect(0, y + 2, 319, y + 2, c[0]); for (let x = 12; x < 320; x += 46) rect(x, y - 2, x + 2, y + 2, hex('#14161e')); }
    rect(0, 12, 319, 13, hex('#14161e'));
    // la ventana de hierro: el marco, los parteluces, el alféizar
    rect(14, 20, 96, 82, hex('#14161e')); rect(15, 21, 95, 81, A[1]); rect(15, 21, 95, 21, A[2]);
    for (let y = 24; y <= 78; y++) for (let x = 18; x <= 92; x++) B[y * 320 + x] = 0;
    for (const mx of [36, 55, 74]) rect(mx, 24, mx + 1, 78, A[1]); for (const my of [42, 60]) rect(18, my, 92, my + 1, A[1]);
    rect(12, 82, 98, 85, A[1]); rect(12, 82, 98, 82, A[2]); rect(12, 85, 98, 85, hex('#14161e'));
    // la estantería metálica con frascos, matraces, libros y cajas
    for (const sx of [106, 171]) rect(sx, 22, sx + 1, 132, A[1]);
    for (const sy of [40, 62, 84, 106, 126]) { rect(106, sy, 172, sy + 1, A[2]); rect(106, sy + 2, 172, sy + 2, hex('#14161e')); }
    const frasco = (x, yb, w, hh, liq, nivel) => { rect(x, yb - hh, x + w, yb - 1, hex('#5a6a7a')); rect(x + 1, yb - hh + 1, x + w - 1, yb - 1, hex('#2a3444')); rect(x + 1, Math.round(yb - 1 - (hh - 2) * nivel), x + w - 1, yb - 1, liq); rect(x + 1, Math.round(yb - 1 - (hh - 2) * nivel), x + w - 1, Math.round(yb - 1 - (hh - 2) * nivel), b_mezcla(liq, C.blanco, 0.4)); rect(x + 1, yb - hh + 2, x + 1, yb - 3, hex('#a8c0d0')); rect(x + 1, yb - hh - 1, x + w - 1, yb - hh, hex('#6a4a2a')); };
    let fx = 109; for (const [w, hh, c, n] of [[5, 12, hex('#3aa86a'), 0.7], [4, 9, hex('#d8a030'), 0.5], [6, 14, hex('#3a6ad8'), 0.8], [4, 10, hex('#c83a5a'), 0.6], [5, 12, hex('#8a5ad8'), 0.4], [4, 8, hex('#e8e0a0'), 0.9], [5, 13, hex('#3aa86a'), 0.3], [4, 10, hex('#d86a3a'), 0.7], [5, 11, hex('#5ab8c8'), 0.6]]) { frasco(fx, 40, w, hh, c, n); fx += w + 2; }
    fx = 109; for (const [w, c] of [[3, hex('#7a2a2a')], [4, hex('#2a4a7a')], [3, hex('#3a6a3a')], [5, hex('#8a6a2a')], [3, hex('#5a2a5a')], [4, hex('#2a2a3a')]]) { const hh = 14 + (w % 2) * 2; rect(fx, 61 - hh, fx + w - 1, 61, c); rect(fx, 61 - hh, fx + w - 1, 61 - hh, b_mezcla(c, C.blanco, 0.3)); rect(fx + 1, 61 - hh + 3, fx + w - 2, 61 - hh + 4, hex('#c8b890')); fx += w + 1; }
    for (let j = 0; j < 7; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, (j - 3) * 1.6); if (d < 6 && d > 2.5) pset(150 + i, 54 + j, (i + j) % 2 ? b_LAB.cobre[2] : b_LAB.cobre[1]); }
    rect(160, 50, 169, 61, hex('#6a5a3a')); rect(160, 50, 169, 51, hex('#8a7a5a')); rect(163, 54, 166, 56, hex('#c8b890'));
    fx = 109; for (const [w, hh, c, n] of [[7, 12, hex('#5ab8c8'), 0.5], [5, 15, hex('#d8a030'), 0.6], [6, 10, hex('#3aa86a'), 0.8], [8, 14, hex('#c83a5a'), 0.3], [5, 9, hex('#e8e0a0'), 0.7], [6, 12, hex('#3a6ad8'), 0.6], [7, 13, hex('#8a5ad8'), 0.5]]) { frasco(fx, 84, w, hh, c, n); fx += w + 2; }
    rect(108, 92, 130, 105, hex('#5a4a32')); rect(108, 92, 130, 93, hex('#7a6a4a')); rect(132, 96, 150, 105, hex('#4a5a4a')); rect(132, 96, 150, 97, hex('#6a7a6a')); for (let x = 152; x < 170; x += 4) { disco(x + 2, 102, 2, hex('#3a3e4a')); pset(x + 1, 101, hex('#8a8e9a')); }
    rect(108, 112, 168, 125, hex('#2a2a36')); for (let x = 110; x < 168; x += 7) { rect(x, 114, x + 5, 125, hex('#3a3a48')); rect(x + 1, 116, x + 4, 117, hex('#a8a090')); }
    // el banco de trabajo: encimera de madera, faldón, patas y las cajas de debajo
    rect(14, 107, 104, 112, K); for (let x = 15; x < 104; x++) { pset(x, 108, hex('#a8743c')); pset(x, 109, h(x >> 2, 0, 123) < 0.3 ? hex('#6a4426') : hex('#83552c')); pset(x, 110, hex('#83552c')); pset(x, 111, hex('#5e3a1e')); }
    for (const lx of [16, 100]) rect(lx, 112, lx + 2, 132, hex('#3a2414')); rect(16, 126, 102, 127, hex('#3a2414'));
    for (const [bx, bw, c] of [[22, 22, hex('#5a4a32')], [48, 18, hex('#3a4a5a')], [70, 26, hex('#5a4a32')]]) { rect(bx, 116, bx + bw, 125, K); rect(bx + 1, 117, bx + bw - 1, 125, c); rect(bx + 1, 117, bx + bw - 1, 117, b_mezcla(c, C.blanco, 0.25)); rect(bx + bw / 2 - 2, 120, bx + bw / 2 + 2, 121, hex('#c8b890')); }
    // el osciloscopio, el aparato de válvulas, la bobina pequeña, el flexo, cuadernos y la taza
    rect(18, 88, 42, 107, K); rect(19, 89, 41, 106, hex('#6a6e7a')); rect(19, 89, 41, 89, hex('#9a9eaa')); rect(21, 91, 35, 103, hex('#14161e')); rect(22, 92, 34, 102, hex('#0e2a1a')); for (let i = 0; i < 3; i++) { disco(38, 93 + i * 4, 1.2, K); pset(38, 93 + i * 4, hex('#c8c8c8')); }
    rect(46, 96, 64, 107, K); rect(47, 97, 63, 106, hex('#5a4a3a')); rect(47, 97, 63, 97, hex('#7a6a5a')); for (const dx of [51, 59]) { disco(dx, 102, 2.4, K); disco(dx, 102, 1.6, hex('#e8dcc0')); }
    for (const tx of [49, 54, 59]) { rect(tx, 89, tx + 2, 96, hex('#3a3e4a')); rect(tx, 89, tx + 2, 89, hex('#8a9aa8')); }
    rect(66, 102, 76, 107, K); rect(67, 103, 75, 106, hex('#3a3e4a')); for (let y = 92; y < 102; y++) { rect(70, y, 72, y, y % 2 ? b_LAB.cobre[2] : b_LAB.cobre[1]); } for (let i = -4; i <= 4; i++) for (let j = -1; j <= 1; j++) if (Math.hypot(i / 4, j / 1.6) < 1) pset(71 + i, 89 + j, j < 0 ? A[3] : A[2]);
    rect(78, 104, 90, 107, hex('#e8e0c8')); rect(79, 103, 89, 104, hex('#f6f2ea')); for (let x = 80; x < 88; x += 2) pset(x, 105, hex('#8a8a9a')); rect(92, 106, 102, 107, hex('#3a3e4a'));
    linea(97, 106, 92, 94, A[1]); linea(92, 94, 84, 90, A[1]); R.poligono([[80, 88], [88, 86], [86, 93]], hex('#2e5a3a'));
    rect(98, 101, 102, 106, hex('#e8e0d0')); rect(98, 101, 102, 101, hex('#5a3a22')); pset(103, 103, hex('#e8e0d0'));
    // el enchufe de la pared y los cables del suelo que van a la consola y a las bobinas
    rect(124, 120, 130, 126, hex('#c8c4b4')); pset(126, 122, K); pset(128, 122, K); pset(126, 124, K); pset(128, 124, K);
    const cable = (pts, c) => { for (let i = 0; i + 1 < pts.length; i++) { linea(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], K); linea(pts[i][0], pts[i][1] - 1, pts[i + 1][0], pts[i + 1][1] - 1, c); } };
    cable([[127, 126], [126, 134], [130, 142], [138, 144]], hex('#3a3a4a'));
    cable([[178, 108], [176, 120], [170, 134], [166, 146]], hex('#7a2a2a')); cable([[272, 108], [280, 126], [286, 138], [300, 146], [320, 150]], hex('#2a3a6a'));
    cable([[60, 107], [58, 130], [70, 154], [110, 160], [150, 156], [176, 150]], hex('#2a4a3a'));
    // la luz cálida del flexo sobre el banco y la pared
    b_halo(R, 74, 104, 46, 30, b_LAB.calido, 0.32); b_halo(R, 74, 112, 30, 8, hex('#fff0c0'), 0.3);
    // la consola de mando con dos relojes, pilotos, interruptores y el pivote de la palanca
    rect(138, 118, 164, 150, K); for (let y = 119; y < 150; y++) for (let x = 139; x < 164; x++) pset(x, y, b_rampa([hex('#2e3a3a'), hex('#3e4e4c'), hex('#526662'), hex('#6a807a')], (y < 123 ? 0.85 : 0.55) - (x - 139) / 25 * 0.35 + (h(x, y, 124) - 0.5) * 0.15, x, y));
    rect(139, 123, 163, 123, hex('#1e2626')); for (const gx of [145, 157]) { disco(gx, 130, 4.4, K); disco(gx, 130, 3.6, hex('#e8e0c8')); for (let i = 0; i < 5; i++) { const a = -2.6 + i * 0.5; pset(Math.round(gx + Math.cos(a) * 3), Math.round(130 + Math.sin(a) * 3), i > 3 ? hex('#c83a3a') : hex('#5a5a5a')); } }
    for (const sx of [142, 148, 154, 160]) { rect(sx, 144, sx + 1, 145, hex('#c8c8c8')); pset(sx, 143, hex('#e8e8e8')); }
    rect(147, 117, 153, 121, K); rect(148, 118, 152, 120, A[2]);
  }));
  // ── la vida del laboratorio: la onda del osciloscopio, las válvulas, la bobina pequeña, el vapor de la taza, las burbujas
  for (let x = 22; x <= 34; x++) { const y = Math.round(97 + Math.sin(x * 0.7 - t * 6) * (2.5 + carga * 2) * Math.sin(t * 0.8 + x * 0.1)); pset(x, y, hex('#6aff9a')); pset(x, y + 1, hex('#2a8a4a')); }
  for (let i = 0; i < 3; i++) { const g = 0.6 + 0.4 * Math.sin(t * (5 + i) + i * 2); rect(50 + i * 5, 91, 50 + i * 5, 94, b_mezcla(hex('#7a3a1a'), hex('#ffb060'), g)); }
  for (const dx of [51, 59]) { const a = -2.4 + (Math.sin(t * 1.3 + dx) * 0.5 + 0.5) * 1.6 + carga; linea(dx, 102, dx + Math.cos(a) * 1.5, 102 + Math.sin(a) * 1.5, hex('#c83a3a')); }
  if ((t % 2.3) < 0.25) { let px = 71, py = 88; for (let s = 0; s < 4; s++) { const nx = 71 + (h(s, Math.floor(t * 20), 125) - 0.5) * 10, ny = 88 - s * 2 - 1; linea(px, py, nx, ny, b_LAB.frio); px = nx; py = ny; } }
  for (let i = 0; i < 3; i++) { const u = ((t * 0.4 + i / 3) % 1); pset(Math.round(100 + Math.sin(t * 2 + i) * 1.5 + u * 2), Math.round(99 - u * 10), b_mezcla(hex('#8a8e9a'), hex('#2c3244'), u)); }
  for (const [bx, yb, k] of [[127, 39, 0], [136, 83, 1]]) for (let i = 0; i < 2; i++) { const u = ((t * 0.7 + i * 0.5 + k * 0.3) % 1); pset(bx + i, Math.round(yb - 2 - u * 7), C.blanco); }
  { const a = t * 2.2, mx = Math.round(84 + Math.cos(a) * 6), my = Math.round(84 + Math.sin(a * 1.3) * 4); pset(mx, my, hex('#d8d0b8')); pset(mx + (Math.sin(t * 30) > 0 ? 1 : -1), my, hex('#a8a090')); }
  // la luz fría de la máquina sobre la sala y el suelo, que crece con la carga
  const brillo = roto ? 0 : 0.08 + carga * 0.4 + Math.sin(t * 6) * 0.03 * carga;
  b_halo(R, 225, 100, 110, 85, b_LAB.frio, brillo * 0.55);
  b_maquina(R, t, carga, roto);
  // los relojes de la consola, los pilotos y la palanca
  for (const [gx, k] of [[145, 0], [157, 1]]) { const a = lerp(-2.5, -0.7, carga) + Math.sin(t * 13 + k) * 0.06 * carga - (roto ? 0 : 0); linea(gx, 130, gx + Math.cos(a) * 3, 130 + Math.sin(a) * 3, K); }
  for (let i = 0; i < 4; i++) { const on = roto ? (i === 0 && Math.sin(t * 9) > 0) : (Math.floor(t * 3 + i * 1.7) % 3 === 0 || carga > i * 0.25); rect(141 + i * 6, 137, 142 + i * 6, 138, on ? [hex('#5ae08a'), hex('#f0c040'), hex('#f08a3a'), hex('#e84a3a')][i] : hex('#2a3030')); }
  const ang = lerp(-0.45, 1.35, pal), kx = 150 + Math.sin(ang) * 14, ky = 120 - Math.cos(ang) * 14;
  linea(150, 120, kx, ky, K); linea(151, 120, kx + 1, ky, A[2]); disco(kx, ky, 2.4, K); disco(kx, ky, 1.7, hex('#d83a3a')); pset(Math.round(kx) - 1, Math.round(ky) - 1, hex('#ff9a8a'));
  // la explosión (sin heridas): el humo que sale del aro, las chispas que saltan y, después, una bobina que chisporrotea
  if (roto) {
    const sc = (e - 0.06) / 0.94;
    if (sc < 0.55) for (let k = 0; k < 26; k++) { const vx = (h(k, 1, 126) - 0.5) * 220, vy = -40 - h(k, 2, 126) * 90, s = sc * 1.6, x = 225 + vx * s, y = 88 + vy * s + 140 * s * s; if (y > 150) continue; linea(x, y, x - vx * 0.03, y - (vy + 280 * s) * 0.03, k % 3 ? hex('#ffd060') : C.blanco); }
    for (let k = 0; k < 16; k++) { const u = b_lim(sc * 1.4 - h(k, 3, 127) * 0.3), r = 3 + u * (8 + h(k, 4, 127) * 10), x = 225 + (h(k, 5, 127) - 0.5) * 50 + Math.sin(t * 0.6 + k) * 4 + u * 10, y = 88 - u * (30 + h(k, 6, 127) * 60) + (h(k, 7, 127) - 0.5) * 30;
      if (u <= 0) continue; const a = 0.85 * (1 - u * 0.45);
      for (let yy = Math.floor(y - r); yy <= y + r; yy++) for (let xx = Math.floor(x - r); xx <= x + r; xx++) { const dx = xx - x, dy = yy - y, d = Math.hypot(dx, dy) / r; if (d > 1 || b_umbral(xx, yy) > a * (1.5 - d)) continue; R.pset(xx, yy, b_rampa([hex('#3a3a46'), hex('#5a5a68'), hex('#7a7a88'), hex('#9a9aa6')], 0.6 - (dx + dy) / r * 0.35, xx, yy)); } }
    if (sc > 0.3) { for (const [bx, by] of [[186, 152], [203, 155], [262, 153], [240, 157]]) { pset(bx, by, A[2]); pset(bx + 1, by, A[0]); }
      if (Math.sin(t * 11) > 0.6) for (let k = 0; k < 4; k++) pset(171 + Math.floor(h(k, Math.floor(t * 20), 128) * 14), 70 + Math.floor(h(k, 9, Math.floor(t * 20)) * 6), k % 2 ? hex('#ffd060') : C.blanco); }
  }
  return { suelo: 150, libre: [30, 170], maquina: { caja: [171, 22, 279, 150], aro: [225, 88, 40], plataforma: [174, 135, 276, 150] }, palanca: { x: 150, y: 120, pomo: [Math.round(kx), Math.round(ky)] }, consola: [138, 118, 164, 150], mesa: [14, 107, 104, 132], ventana: [14, 20, 96, 85], estanteria: [106, 22, 172, 132] };
}

// lo de delante del laboratorio: el cable del suelo, la mesa de primer término con la caja de herramientas, la llave
// inglesa y el vaso que burbujea, el humo de delante y el destello blanco de o.estalla (encima de todo)
function b_laboratorioDelante(R, t, o) {
  const { rect, pset, disco, linea } = R, K = b_LAB.k, A = b_LAB.ac, e = b_lim(o.estalla ?? 0), carga = e > 0.06 ? 0 : b_lim(o.carga ?? 0);
  for (let x = -2; x < 270; x++) { const y = Math.round(172 + Math.sin(x * 0.035 + 1) * 3); pset(x, y, K); pset(x, y - 1, hex('#5a2a2a')); pset(x, y + 1, K); }
  rect(266, 154, 320, 180, K); for (let y = 155; y < 160; y++) for (let x = 267; x < 320; x++) pset(x, y, b_rampa([hex('#5e3a1e'), hex('#83552c'), hex('#a8743c')], y === 155 ? 1 : 0.55 + (h(x >> 2, y, 129) - 0.5) * 0.4, x, y));
  for (let y = 160; y < 180; y++) for (let x = 267; x < 320; x++) pset(x, y, b_rampa([hex('#2a1a10'), hex('#3a2414'), hex('#5e3a1e')], 0.5 + (h(x >> 3, y >> 3, 130) - 0.5) * 0.3, x, y));
  rect(278, 142, 304, 154, K); rect(279, 143, 303, 154, hex('#b83a2a')); rect(279, 143, 303, 144, hex('#e05a3a')); rect(287, 139, 295, 142, K); rect(288, 140, 294, 141, A[2]); rect(281, 148, 301, 148, hex('#7a2218'));
  linea(306, 153, 318, 149, A[2]); linea(306, 154, 318, 150, A[1]); disco(318, 149, 2, A[2]); pset(318, 149, K);
  rect(270, 140, 276, 154, hex('#8aa8c0')); rect(271, 145, 275, 153, hex('#3a8ad8')); rect(271, 145, 275, 145, hex('#8ac8f0')); pset(271, 141, C.blanco);
  for (let i = 0; i < 3; i++) { const u = (t * 0.9 + i / 3) % 1; pset(272 + i, Math.round(152 - u * 7), C.blanco); }
  if (carga > 0) for (let y = 155; y < 160; y++) for (let x = 267; x < 290; x++) if (b_umbral(x, y) < carga * 0.4) pset(x, y, b_mezcla(R.pget(x, y), b_LAB.frio, 0.3));
  if (e > 0.06) { const sc = (e - 0.06) / 0.94; for (let k = 0; k < 5; k++) { const u = b_lim(sc * 1.2 - k * 0.08), r = 6 + u * 12, x = 150 + k * 30 + Math.sin(t * 0.5 + k) * 6 + u * 14, y = 150 - u * 30;
      if (u <= 0) continue; for (let yy = Math.floor(y - r); yy <= y + r; yy++) for (let xx = Math.floor(x - r); xx <= x + r; xx++) { const d = Math.hypot(xx - x, yy - y) / r; if (d > 1 || b_umbral(xx, yy) > 0.45 * (1 - u * 0.5) * (1.2 - d)) continue; pset(xx, yy, b_rampa([hex('#4a4a56'), hex('#6a6a78'), hex('#8a8a96')], 0.6 - (yy - y) / r * 0.3, xx, yy)); } } }
  const fl = e <= 0 ? 0 : e < 0.06 ? e / 0.06 : Math.max(0, 1 - (e - 0.06) / 0.2);
  if (fl > 0) { const B = R.buf; for (let i = 0; i < 57600; i++) B[i] = b_mezcla(B[i], hex('#ffffff'), Math.min(0.97, fl)); }
}

function b_pizarra(R, t, o) {
  const { rect, pset, disco, linea } = R, K = b_LAB.k, A = b_LAB.ac, carga = b_lim(o.carga ?? 0);
  const [ex, ey] = o.error ?? [200, 96];
  b_fijo(R, 'pizarra', () => {
    const B = R.buf;
    b_paredLab(B, 0, 140, 3); b_sueloLab(B, 140); rect(0, 138, 319, 140, hex('#14161e'));
    // la bata colgada de su percha y el interruptor
    rect(5, 52, 7, 54, A[2]); for (let y = 56; y < 104; y++) { const w = 4 + Math.round((y - 56) * 0.12); for (let x = 6 - w; x <= 6 + w; x++) pset(x, y, x === 6 + w || x === 6 - w ? hex('#9aa0a8') : b_rampa([hex('#b8bcc4'), hex('#d8dce0'), hex('#eef0f2')], 0.8 - (x - 6 + w) / (2 * w) * 0.6, x, y)); }
    linea(6, 57, 6, 103, hex('#a8acb4')); rect(2, 70, 4, 72, hex('#a8acb4'));
    // el marco de roble de la pizarra, la superficie verde con borrones y fantasmas de tiza viejos
    rect(12, 22, 268, 134, K); for (let y = 23; y < 134; y++) for (let x = 13; x < 268; x++) pset(x, y, b_rampa([hex('#5e3a1e'), hex('#83552c'), hex('#a8743c'), hex('#c8945a')], (y < 27 ? 0.85 : y > 129 ? 0.3 : x < 17 ? 0.7 : x > 263 ? 0.35 : 0.5) + (h(x >> 2, y, 131) - 0.5) * 0.3, x, y));
    const PZ = [hex('#1e3428'), hex('#243e30'), hex('#2a4a3a'), hex('#34584a'), hex('#406658')];
    for (let y = 27; y < 130; y++) for (let x = 17; x < 264; x++) { let v = 0.45 + (h(x >> 3, y >> 3, 132) - 0.5) * 0.2 + (h(x, y, 133) - 0.5) * 0.15 - Math.hypot(x - 140, (y - 70) * 1.6) / 600;
      const bor = Math.sin(x * 0.09 + Math.sin(y * 0.15) * 2) * Math.sin(y * 0.11 + x * 0.02); if (bor > 0.55 && h(x >> 4, y >> 4, 134) < 0.5) v += 0.22;
      B[y * 320 + x] = b_rampa(PZ, v, x, y); }
    for (let k = 0; k < 7; k++) { const gx = 30 + h(k, 1, 135) * 210, gy = 34 + h(k, 2, 135) * 80; b_cifras(R, String(Math.floor(h(k, 3, 135) * 9000)), gx, gy, hex('#3c6050'), 1, 136 + k); }
    // la repisa con las tizas y el borrador
    rect(14, 130, 266, 134, K); rect(15, 130, 265, 131, hex('#a8743c')); rect(15, 132, 265, 133, hex('#5e3a1e'));
    for (const [cx, c] of [[40, hex('#f2f0e8')], [46, hex('#f2f0e8')], [120, hex('#f0e08a')], [228, hex('#f0a0a0')]]) { rect(cx, 128, cx + 4, 129, c); pset(cx + 4, 129, b_mezcla(c, K, 0.3)); }
    rect(80, 126, 94, 129, hex('#6a4a2a')); rect(80, 126, 94, 126, hex('#8a6a4a')); rect(81, 128, 93, 129, hex('#c8b8a0'));
    for (let k = 0; k < 40; k++) pset(20 + Math.floor(h(k, 1, 137) * 240), 141 + Math.floor(h(k, 2, 137) * 6), hex('#6a7470'));
    // el armario de frascos de la derecha, con sus puertas de cristal
    rect(276, 50, 318, 140, K); rect(277, 51, 317, 139, hex('#5a6a6a')); rect(277, 51, 317, 52, hex('#7a8a8a'));
    for (const dx of [279, 298]) { rect(dx, 55, dx + 17, 112, hex('#3a4a4a')); rect(dx + 1, 56, dx + 16, 111, hex('#1e2a30'));
      for (const sy of [74, 94]) rect(dx + 1, sy, dx + 16, sy, hex('#6a7a7a'));
      for (let i = 0; i < 4; i++) for (const sy of [73, 93, 110]) { const c = [hex('#3aa86a'), hex('#d8a030'), hex('#3a6ad8'), hex('#c83a5a')][(i + sy) % 4]; rect(dx + 2 + i * 4, sy - 6, dx + 4 + i * 4, sy - 1, hex('#5a6a7a')); rect(dx + 2 + i * 4, sy - 4, dx + 4 + i * 4, sy - 1, c); }
      linea(dx + 2, 57, dx + 8, 63, hex('#6a8a9a')); rect(dx + 14 - (dx > 290 ? 12 : 0), 82, dx + 14 - (dx > 290 ? 12 : 0), 86, A[3]); }
    rect(279, 116, 315, 136, hex('#4a5a5a')); rect(279, 125, 315, 125, K); rect(295, 120, 299, 121, A[2]); rect(295, 129, 299, 130, A[2]);
  });
  // ── los cálculos de tiza (cifras y símbolos)
  const TZ = hex('#e8ece2'), TZ2 = hex('#c8d0c4'), AM = hex('#f0e08a'), RS = hex('#f0a0a0'), AZ = hex('#a0c8f0');
  b_cifras(R, '(3.7+1.2)×4=19.6', 24, 32, TZ, 1, 140); b_cifras(R, '√(81)/9', 24, 42, TZ2, 1, 141); b_cifras(R, '2π×6.4≈40.2', 24, 52, TZ, 1, 142); b_tiza(R, 22, 61, 82, 61, TZ2, 1); b_cifras(R, '∫ 0.5 ∞ = 1.25', 24, 64, AM, 1, 143);
  b_cifras(R, 'Δ=12²/7', 100, 34, TZ, 2, 144); b_cifras(R, '>1000', 100, 50, TZ2, 1, 145);
  for (const [i, n] of [[0, '1 0 4'], [1, '3 6 2'], [2, '7 1 9']]) b_cifras(R, n, 196, 34 + i * 7, TZ, 1, 146 + i); b_tiza(R, 193, 33, 193, 54, TZ, 2); b_tiza(R, 193, 33, 195, 33, TZ, 3); b_tiza(R, 193, 54, 195, 54, TZ, 4); b_tiza(R, 214, 33, 214, 54, TZ, 5); b_tiza(R, 212, 33, 214, 33, TZ, 6); b_tiza(R, 212, 54, 214, 54, TZ, 7);
  b_cifras(R, '=42', 218, 41, TZ, 1, 148); b_cifras(R, '7:3', 236, 32, AZ, 1, 149); b_cifras(R, '0.04', 236, 42, TZ2, 1, 150);
  // el boceto del aro, con antenas, flechas y cotas
  b_aroTiza(R, 52, 98, 14, 14, TZ, 1); b_aroTiza(R, 52, 98, 10, 10, TZ2, 2); b_tiza(R, 52, 84, 52, 76, TZ, 8); b_tiza(R, 43, 87, 37, 78, TZ, 9); b_tiza(R, 61, 87, 67, 78, TZ, 10);
  b_tiza(R, 70, 98, 86, 98, AM, 11); b_tiza(R, 86, 98, 83, 96, AM, 12); b_tiza(R, 86, 98, 83, 100, AM, 13); b_cifras(R, '40', 88, 95, AM, 1, 151); b_tiza(R, 38, 116, 66, 116, TZ2, 14); b_cifras(R, '80', 47, 119, TZ2, 1, 152);
  for (let i = 0; i < 6; i++) b_aroTiza(R, 52, 98, 4 - i * 0.6, 4 - i * 0.6, AZ, 20 + i, i, i + 2.5);
  // la gráfica con su onda y los puntos medidos
  b_tiza(R, 98, 120, 152, 120, TZ, 15); b_tiza(R, 100, 122, 100, 78, TZ, 16); b_tiza(R, 100, 78, 98, 81, TZ, 17); b_tiza(R, 152, 120, 149, 118, TZ, 18);
  const onda = (x) => Math.round(102 - Math.sin((x - 102) * 0.26) * 12 * Math.exp(-(x - 102) / 50));
  for (let x = 102; x < 150; x++) { const y = onda(x); if (h(x, y, 160) < 0.9) pset(x, y, RS); }
  for (let i = 0; i < 5; i++) { const x = 106 + i * 9, y = onda(x) + (i % 2 ? 2 : -2); pset(x, y, TZ); pset(x + 1, y, TZ); pset(x, y + 1, TZ); }
  b_cifras(R, '0', 94, 118, TZ2, 1, 153); b_cifras(R, '9.8', 136, 123, TZ2, 1, 154);
  // la línea del error: «1.6 ×» el número equivocado «= 3.2», y el aro rojo que lo rodea
  const w = b_ancho('0.8', 2), ax = Math.round(ex - w / 2), ay = Math.round(ey - 5);
  b_cifras(R, '1.6×', ax - b_ancho('1.6×', 2) - 9, ay, TZ, 2, 155); b_cifras(R, '0.8', ax, ay, TZ, 2, 156); b_cifras(R, '=3.2', ax + w + 9, ay, TZ, 2, 157);
  b_tiza(R, ax - 18, ay + 14, ax + w + 30, ay + 14, TZ2, 19); b_cifras(R, '≈', ax + w + 38, ay + 11, TZ2, 1, 158);
  if (o.error) { const u = b_lim(o.rodea ?? 1); if (u > 0) { b_aroTiza(R, ex, ey, w / 2 + 6, 9, hex('#f06a5a'), 30, -Math.PI * 0.6, -Math.PI * 0.6 + Math.PI * 2.15 * u, 2); } }
  // la vida: el reloj de pared, las motas de tiza que flotan en la luz y la luz de la máquina que late a la derecha
  b_reloj(R, 214, 13, 7, t, hex('#5a5a66'), 0.7);
  for (let k = 0; k < 16; k++) { const x = 20 + ((h(k, 1, 161) * 240 + t * (2 + h(k, 2, 161) * 3)) % 240), y = 40 + ((h(k, 3, 161) * 100 - t * (1 + k % 3)) % 100 + 100) % 100; if (Math.sin(t * 2.5 + k * 1.3) > -0.1) pset(Math.round(x), Math.round(y), hex('#dce4da')); }
  const lat = 0.12 + carga * 0.4 + Math.sin(t * (3 + carga * 6)) * (0.04 + carga * 0.08);
  for (let y = 20; y < 180; y++) for (let x = 268; x < 320; x++) { const k = lat * ((x - 268) / 52) ** 1.5 * (1 - Math.abs(y - 100) / 110); const q = Math.floor(k * 5 + b_umbral(x, y)) / 5; if (q > 0) pset(x, y, b_mezcla(R.pget(x, y), b_LAB.frio, Math.min(0.8, q))); }
  return { suelo: 150, libre: [70, 230], pizarra: [12, 22, 268, 134], escribible: [17, 27, 263, 129], error: [ex, ey], repisa: 130, tizas: [[42, 128], [122, 128]], borrador: [80, 126, 94, 129], reloj: [214, 13], armario: [276, 50, 318, 140] };
}

// lo de delante de la pizarra: la esquina de una mesa de laboratorio con el cuaderno abierto, el lápiz y un vaso de
// precipitados que burbujea (x 0–60, y 156–180)
function b_pizarraDelante(R, t, o) {
  const { rect, pset, linea } = R, K = b_LAB.k;
  rect(0, 158, 62, 180, K); for (let y = 159; y < 163; y++) for (let x = 0; x < 61; x++) pset(x, y, b_rampa([hex('#3a3e4e'), hex('#4e5466'), hex('#6a7084')], y === 159 ? 1 : 0.5, x, y));
  for (let y = 163; y < 180; y++) for (let x = 0; x < 61; x++) pset(x, y, b_rampa([hex('#1e2230'), hex('#262a3a')], 0.5 + (h(x >> 3, y >> 2, 162) - 0.5) * 0.4, x, y));
  rect(6, 154, 34, 160, hex('#e8e0c8')); rect(20, 154, 20, 160, hex('#a8a090')); for (let j = 155; j < 160; j += 2) { rect(8, j, 18, j, hex('#8a8a9a')); rect(22, j, 32 - (j % 3), j, hex('#8a8a9a')); }
  linea(10, 161, 26, 157, hex('#e8c040')); pset(26, 157, hex('#3a2a1a'));
  rect(42, 146, 52, 160, hex('#8aa8c0')); rect(43, 151, 51, 159, hex('#5ab86a')); rect(43, 151, 51, 151, hex('#9ae0a0')); pset(43, 147, C.blanco); rect(41, 145, 53, 145, hex('#a8c0d0'));
  for (let i = 0; i < 3; i++) { const u = (t * 1.1 + i / 3) % 1; pset(45 + i * 2, Math.round(158 - u * 8), C.blanco); }
}

// los fondos fijos de cada plano: se pintan una vez en su búfer y se copian en cada fotograma
const c_CACHE = new WeakMap();

function c_fijo(R, clave, dibuja) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); m[clave] = { b, datos: dibuja() }; R.usar(prev); }
  R.copiar(m[clave].b);
  return m[clave].datos;
}

// la trama ordenada (Bayer 4 × 4) de los degradados y las mezclas
const c_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const c_umbral = (x, y) => c_BAYER[((y & 3) << 2) | (x & 3)];

// mezcla de dos colores (en el orden de bytes del lienzo) en proporción k
const c_mix = (a, b, k) => { const ch = (s) => Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };

const c_lim = (u) => (u < 0 ? 0 : u > 1 ? 1 : u);

// tiñe un píxel hacia c en proporción k (luz, bruma, resplandor)
function c_tine(R, x, y, c, k) { x |= 0; y |= 0; if (x < 0 || x > 319 || y < 0 || y > 179 || k <= 0) return; const B = R.buf, i = y * 320 + x; B[i] = c_mix(B[i], c, Math.min(1, k)); }

// un resplandor redondo tramado (luz de fuego, de hierro al rojo): k en el centro que cae hasta 0 en el radio r
function c_resplandor(R, cx, cy, r, c, k, aplasta = 1) {
  for (let y = Math.floor(cy - r * aplasta); y <= cy + r * aplasta; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
    const d = Math.hypot(x - cx, (y - cy) / aplasta) / r; if (d >= 1) continue; c_tine(R, x, y, c, k * (1 - d) * (1 - d) * (0.75 + c_umbral(x, y) * 0.5)); }
}

// un degradado vertical tramado entre varios colores (cielos)
function c_degradado(R, y0, y1, cols, x0 = 0, x1 = 319) {
  const B = R.buf, n = cols.length - 1;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const u = (y - y0) / Math.max(1, y1 - y0) * n, i = Math.min(n - 1, Math.floor(u)), f = u - i;
    for (let x = x0; x <= x1; x++) B[y * 320 + x] = f > c_umbral(x, y) ? cols[i + 1] : cols[i]; }
}

// ruido suave de una dimensión (crestas, siluetas)
const c_ruido1 = (x, k) => { const i = Math.floor(x), f = x - i, s = f * f * (3 - 2 * f); return h(i, k, 9) * (1 - s) + h(i + 1, k, 9) * s; };

// nube de tres tonos (sombra abajo, cuerpo, luz arriba a la derecha) que solo se pinta por encima de lim[x] (la silueta
// de lo que tiene delante); ap < 1 la deja tramada (niebla)
function c_nube(R, cx, cy, w, lim, cols, ap = 1) {
  const bolas = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.32, 0.06, 0.22], [-0.08, -0.13, 0.24], [0.15, -0.09, 0.2], [-0.5, 0.12, 0.13], [0.52, 0.12, 0.12]];
  const capa = (dx0, dy0, fr, c) => { for (const [dx, dy, f] of bolas) { const bx = cx + dx * w + dx0, by = cy + dy * w + dy0, r = Math.max(1, f * w * fr);
    for (let y = Math.floor(by - r); y <= by + r; y++) for (let x = Math.floor(bx - r); x <= bx + r; x++) {
      if (x < 0 || x > 319 || y < 0 || (lim && y >= lim[x])) continue; if ((x - bx) ** 2 + (y - by) ** 2 > r * r) continue; if (ap < 1 && c_umbral(x, y) > ap) continue; R.pset(x, y, c); } } };
  capa(0, 1.5, 1, cols[0]); capa(0, 0, 0.98, cols[1]); capa(1, -1, 0.66, cols[2]);
}

// copos de nieve: n copos que caen con el viento (vx px/s), tamaño s (1 o 2), en la capa k
function c_copos(R, t, n, vx, s, k, cols = [hex('#ffffff'), hex('#dfe8f4')]) {
  for (let i = 0; i < n; i++) { const v = 14 + h(i, k, 3) * 16, x = Math.round(((h(i, k, 1) * 360 + t * v * vx + Math.sin(t * 1.3 + i) * 3) % 360 + 360) % 360 - 20), y = Math.round(((h(i, k, 2) * 200 + t * v) % 196) - 8);
    const c = cols[i & 1]; R.pset(x, y, c); if (s > 1) { R.pset(x + 1, y, c); R.pset(x, y + 1, c); R.pset(x + 1, y + 1, cols[1]); } }
}

// humo que sube en volutas desde (x, y): n bocanadas, que se ensanchan, se aclaran y se tuercen con el viento
function c_humo(R, t, x, y, viento = 0.4, alto = 50, k = 0.5, c0 = hex('#e8e4e0'), c1 = hex('#b8b4b8')) {
  for (let i = 0; i < 9; i++) { const u = ((t * 0.28 + i / 9) % 1), r = 1.5 + u * 6, px = x + Math.sin(t * 1.1 + i * 1.7 + u * 5) * (2 + u * 5) + u * alto * viento, py = y - u * alto;
    const a = k * (1 - u) * (u < 0.1 ? u * 10 : 1);
    for (let j = -r; j <= r; j++) for (let ii = -r; ii <= r; ii++) { if (ii * ii + j * j > r * r) continue; const xx = Math.round(px + ii), yy = Math.round(py + j); if (c_umbral(xx, yy) > a * 1.6) continue; c_tine(R, xx, yy, j < 0 ? c0 : c1, a); } }
}

// gente diminuta de fondo (6–9 px): un monje de túnica granate, de pie o andando (paso), mirando a d
function c_monjito(R, x, y, t, d = 1, anda = true, alto = 8, tunica = hex('#8a2430')) {
  const { pset, rect } = R, p = anda ? Math.floor(t * 5 + x) % 2 : 0, piel = hex('#c88a5a'), sS = hex('#5a1820');
  rect(x - 1, y - alto + 3, x + 1, y - 1, tunica); pset(x + (d > 0 ? -1 : 1), y - alto + 4, sS); pset(x - 2, y - 2, tunica); pset(x + 2, y - 2, tunica);
  pset(x - 1 + p, y, hex('#3a2a24')); pset(x + 1 - p, y, hex('#3a2a24')); rect(x - 1, y - alto + 3, x + 1, y - alto + 3, hex('#e8a030'));   // el chal azafrán
  rect(x - 1, y - alto + 1, x + 1, y - alto + 2, piel); pset(x + d, y - alto + 2, hex('#9a6a44')); pset(x, y - alto, hex('#3a2a24'));
}

// LA MÁSCARA DE HIERRO (exportada: la escena la pinta en la mano de Victor). Centro (cx, cy), escala s (1: 12 × 15 px;
// 3: 36 × 45), calor 0–1 (1 al rojo vivo, 0,5 rojo oscuro, 0 hierro gris). Una placa abombada de cara plana: la frente
// con su ceja de refuerzo, dos rendijas estrechas para los ojos, la arista de la nariz, la ranura de la boca, las dos
// costuras de las mejillas y los remaches; los bordes se enfrían antes que el centro. Por atributos: nada de los cómics.
export function c_mascara(R, cx, cy, calor = 0, s = 1, t = 0) {
  const a = 6 * s, b = 7.5 * s, cal = c_lim(calor);
  const G = [hex('#22222c'), hex('#44465a'), hex('#666a7c'), hex('#8e92a4'), hex('#bcc0ce')];
  const F = [hex('#4a1210'), hex('#7a1a14'), hex('#b02818'), hex('#d8401c'), hex('#f06a22'), hex('#ffa040')];
  const px = 1 / a, py = 1 / b;
  for (let y = Math.floor(cy - b) - 1; y <= cy + b + 1; y++) for (let x = Math.floor(cx - a) - 1; x <= cx + a + 1; x++) {
    const u = (x + 0.5 - cx) / a, v = (y + 0.5 - cy) / b;
    const W = v < -0.5 ? Math.sqrt(Math.max(0, 1 - ((v + 0.5) / 0.5) ** 2)) : 1 - 0.22 * Math.max(0, (v - 0.1) / 0.9) ** 2;
    if (v < -1 || v > 1 || Math.abs(u) > W) continue;
    const borde = Math.abs(u) > W - 1.1 * px || v > 1 - 1.1 * py || v < -1 + 1.1 * py;
    const ojo = v > -0.26 && v < -0.26 + Math.max(1.1 * py, 0.1) && Math.abs(u) > 0.16 && Math.abs(u) < 0.6;
    const boca = v > 0.5 && v < 0.5 + Math.max(1.1 * py, 0.09) && Math.abs(u) < 0.36;
    const ceja = v > -0.44 && v < -0.44 + Math.max(1.1 * py, 0.1) && Math.abs(u) < 0.7;
    const nariz = Math.abs(u) < Math.max(0.6 * px, 0.06) && v > -0.24 && v < 0.34;
    const costura = s > 1 && Math.abs(Math.abs(u) - 0.62) < 0.6 * px && v > -0.05 && v < 0.92;
    const remache = [[-0.8, -0.55], [0.8, -0.55], [-0.78, 0.25], [0.78, 0.25], [-0.62, 0.8], [0.62, 0.8]].some(([ru, rv]) => Math.abs(u - ru) * a < 0.6 + s * 0.35 && Math.abs(v - rv) * b < 0.6 + s * 0.35);
    // la luz, de arriba a la izquierda, sobre una cara abombada
    const luz = c_lim(0.42 - u * 0.32 - v * 0.3 + (1 - u * u) * 0.22);
    let gi = Math.min(4, Math.floor(luz * 4 + c_umbral(x, y) * 0.9));
    if (ceja) gi = Math.min(4, gi + 2); if (nariz) gi = u < 0 ? 4 : 1; if (remache) gi = 4; if (costura) gi = 0;
    let c = G[gi];
    if (ojo || boca) c = hex('#0e0a10'); else if (borde) c = G[0];
    // el calor: el centro aguanta más que los bordes; tramado en los saltos de color
    const local = cal * 1.2 - (Math.abs(u) * 0.32 + Math.abs(v) * 0.22) - (borde ? 0.1 : 0);
    if (local > 0.06 && !ojo && !boca) {
      const f = c_lim(local) * 4.6 + (gi - 2) * 0.5 + Math.sin(t * 6 + x * 0.9 + y * 0.6) * 0.12 + c_umbral(x, y) * 0.6 - 0.3, fi = Math.max(0, Math.min(5, Math.floor(f)));
      c = local < 0.2 ? c_mix(c, F[fi], (local - 0.06) / 0.14) : F[fi];
    } else if ((ojo || boca) && cal > 0.3) c = c_mix(hex('#0e0a10'), F[1], (cal - 0.3) * 0.7);
    R.pset(x, y, c);
  }
  if (s > 1) for (const d of [-1, 1]) { const x0 = Math.round(cx + d * (a + 1)), y0 = Math.round(cy - b * 0.35); R.rect(Math.min(x0, x0 + d * s), y0 - s, Math.max(x0, x0 + d * s), y0 + s, hex('#1c1a24')); R.pset(x0 + d, y0, cal > 0.5 ? hex('#b02818') : hex('#6e7282')); }
}

// el vapor de un hierro que se enfría en el agua o en el aire: bocanadas blancas que suben desde (x, y) de ancho w
function c_vapor(R, t, x, y, w, k) {
  if (k <= 0) return;
  for (let i = 0; i < 10; i++) { const u = (t * 0.55 + i / 10) % 1, px = x + (h(i, 1, 51) - 0.5) * w + Math.sin(t * 2 + i) * (2 + u * 6), py = y - u * 34, r = 1 + u * 5, a = k * (1 - u) * 0.8;
    for (let j = -r; j <= r; j++) for (let ii = -r; ii <= r; ii++) { if (ii * ii + j * j > r * r) continue; const xx = Math.round(px + ii), yy = Math.round(py + j); if (c_umbral(xx, yy) > a * 1.5) continue; c_tine(R, xx, yy, j < 0 ? hex('#ffffff') : hex('#c8ccd8'), a); } }
}

// chispas que saltan desde (x, y): n puntos que vuelan en arco y se apagan
function c_chispas(R, t, x, y, n, fuerza = 1, sube = 1) {
  const cols = [hex('#fff8c0'), hex('#ffd060'), hex('#f88a2a'), hex('#c83a1a')];
  for (let i = 0; i < n; i++) { const per = 0.9 + h(i, 7, 52) * 0.8, u = ((t + h(i, 3, 52) * 5) % per) / per, vx = (h(i, 4, 52) - 0.5) * 70 * fuerza, vy = -(20 + h(i, 5, 52) * 50) * fuerza * sube;
    const px = x + vx * u * per, py = y + vy * u * per + 60 * (u * per) ** 2, c = cols[Math.min(3, Math.floor(u * 4))];
    R.pset(Math.round(px), Math.round(py), c); if (u < 0.4) R.pset(Math.round(px - vx * 0.02), Math.round(py - vy * 0.02), cols[2]); }
}

// una bandera de oración (4 × 5 px) colgada de la cuerda en (x, y), que ondea
function c_banderita(R, t, x, y, c, k, viento = 1) {
  const cs = c_mix(c, hex('#1c1222'), 0.3);
  for (let i = 0; i < 4; i++) { const dy = Math.round(Math.sin(t * 6 * viento + k * 1.3 + i * 0.9) * 0.8 * (i / 3)), dx = Math.round(Math.sin(t * 5 + k) * 0.6 * viento);
    for (let j = 0; j < 5; j++) R.pset(x + i + Math.round(dx * j / 4), y + j + dy * (j > 1 ? 1 : 0), (i === 3 || j === 4) ? cs : (i === 1 && j === 2) ? c_mix(c, hex('#1c1222'), 0.45) : c); }
}

// una cuerda de banderas de (x0, y0) a (x1, y1) que se comba (comba px)
function c_cuerdaBanderas(R, t, x0, y0, x1, y1, comba, viento = 1, paso = 6) {
  const cols = [hex('#3a6ad0'), hex('#f2f2ec'), hex('#d03a3a'), hex('#3a9a4a'), hex('#e8c040')], n = Math.max(2, Math.round(Math.hypot(x1 - x0, y1 - y0)));
  const Y = (u) => y0 + (y1 - y0) * u + comba * Math.sin(Math.PI * u) + Math.sin(t * 2 + u * 6) * 0.6 * viento;
  for (let i = 0; i <= n; i++) { const u = i / n; R.pset(Math.round(x0 + (x1 - x0) * u), Math.round(Y(u)), hex('#3a3040')); }
  const m = Math.floor(Math.abs(x1 - x0) / paso);
  for (let k = 1; k < m; k++) { const u = k / m; c_banderita(R, t, Math.round(x0 + (x1 - x0) * u) - 2, Math.round(Y(u)) + 1, cols[k % 5], k, viento); }
}

// LAS MONTAÑAS: el fondo fijo (cielo, cordilleras, monasterio, nieve, camino, muro mani) y la vida encima
const c_P1 = [[30, 58, 0.75, 0.62], [98, 30, 0.72, 0.9], [168, 46, 0.8, 0.7], [232, 64, 0.62, 0.8], [300, 72, 0.7, 0.6]];

const c_P2 = [[-10, 92, 0.5, 0.45], [64, 86, 0.55, 0.6], [140, 98, 0.5, 0.5], [190, 96, 0.6, 0.5]];

function c_montanaFija(R) {
  const B = R.buf, { rect, pset, linea, poligono, disco } = R;
  // el cielo de altura y el sol
  c_degradado(R, 0, 112, [hex('#1e3f8a'), hex('#2a58aa'), hex('#3a72c4'), hex('#5a92d8'), hex('#8ab4e6'), hex('#b8d2f0')]);
  for (let y = 4; y < 50; y++) for (let x = 206; x < 268; x++) { const d = Math.hypot(x - 236, y - 26); if (d < 7) pset(x, y, d < 5.5 ? hex('#fffef0') : hex('#fff4c8')); else if (d < 30) c_tine(R, x, y, hex('#fff4d8'), (1 - d / 30) * 0.5 * (0.6 + c_umbral(x, y) * 0.8)); }
  // la cordillera lejana: cumbres, caras al sol (derecha) y a la sombra, canales de roca, bruma
  const sky1 = new Array(320), sky2 = new Array(320), cima = (P, x, k, amp) => { let m = 999, pi = 0; P.forEach(([px, py, sl, sr], i) => { const v = py + (x < px ? sl : sr) * Math.abs(x - px); if (v < m) { m = v; pi = i; } }); return [m + c_ruido1(x / 5, k) * amp + h(x, k, 4) * 1.2, pi]; };
  const dom1 = new Array(320), dom2 = new Array(320);
  for (let x = 0; x < 320; x++) { [sky1[x], dom1[x]] = cima(c_P1, x, 1, 4); sky1[x] = Math.round(sky1[x]); }
  for (let x = 0; x < 320; x++) { const [px, py] = c_P1[dom1[x]], lado = x >= px;
    for (let y = sky1[x]; y < 132; y++) { const d = y - sky1[x], s = (x - px) / (y - py + 6), q = ((s * 3.4 + c_ruido1(y / 6, dom1[x] + 20) * 0.35) % 1 + 1) % 1;
      const roca = (q < 0.09 && d > 5) || (y > 86 && h(x >> 1, y >> 1, 21) < (y - 86) / 70) || (d > 3 && h(x, y >> 1, 22) < 0.025);
      let c;
      if (roca) c = lado ? (q < 0.045 ? hex('#5a5470') : hex('#7a7490')) : (q < 0.045 ? hex('#34324a') : hex('#4a4864'));
      else if (lado) c = d < 2 ? hex('#ffffff') : q < 0.22 && c_umbral(x, y) < 0.5 ? hex('#d6e2f2') : (q > 0.85 ? hex('#ffffff') : hex('#eef3fa'));
      else c = d < 1 ? hex('#c8d6ee') : q < 0.22 ? hex('#8696c4') : (c_umbral(x, y) < 0.15 ? hex('#8696c4') : hex('#a2b4da'));
      B[y * 320 + x] = c_mix(c, hex('#b8cce8'), c_lim((y - 58) / 80) * 0.7); } }
  // la cordillera media y el espolón del monasterio, más cerca y más oscuros
  const espolon = (x) => (x < 174 ? 999 : x < 200 ? 106 + (200 - x) * 1.25 : 106 - (x - 200) * 0.05);
  for (let x = 0; x < 320; x++) { const [m, pi] = cima(c_P2, x, 2, 3); dom2[x] = pi; sky2[x] = Math.round(Math.min(m, espolon(x) + c_ruido1(x / 4, 5) * 2)); }
  for (let x = 0; x < 320; x++) { const esp = espolon(x) + c_ruido1(x / 4, 5) * 2 <= sky2[x] + 0.5, [px, py] = esp ? [200, 100] : c_P2[dom2[x]], lado = esp ? true : x >= px;
    for (let y = sky2[x]; y < 140; y++) { const d = y - sky2[x], s = (x - px) / (y - py + 8), q = ((s * 4 + c_ruido1(y / 4, 30 + dom2[x]) * 0.4) % 1 + 1) % 1;
      const nieve = (d < 3 + h(x >> 1, 3, 23) * 6 && !esp) || (q > 0.55 && q < 0.78 && h(x >> 2, y >> 2, 24) < 0.7) || (esp && h(x >> 2, y >> 1, 25) < 0.35);
      let c;
      if (nieve) c = lado ? (c_umbral(x, y) < 0.2 ? hex('#d0dcee') : hex('#e4ecf6')) : (c_umbral(x, y) < 0.3 ? hex('#7e8cb8') : hex('#98a8d0'));
      else { const g = h(x >> 1, y >> 1, 26); c = lado ? (g < 0.2 ? hex('#5e5468') : g < 0.75 ? hex('#7a6e7e') : hex('#988a94')) : (g < 0.3 ? hex('#3a3448') : hex('#4e4860')); if (esp && h(x >> 1, y >> 1, 27) < 0.12) c = hex('#8a7a4a'); }
      B[y * 320 + x] = c_mix(c, hex('#a8bcdc'), c_lim((y - 80) / 70) * 0.45); } }
  // ── el campo de nieve de delante, el camino de losas, las rocas y el muro mani
  const fg = (x) => Math.round(124 - 5 * Math.sin(x * 0.021 + 0.4) + c_ruido1(x / 6, 40) * 3);
  const caminoY = (x) => (x < 178 ? 153 - x * 0.012 : 150.9 - (x - 178) * 0.12), caminoW = (x) => (x < 178 ? 6.5 - x * 0.012 : Math.max(3, 4.4 - (x - 178) * 0.05));
  for (let x = 0; x < 320; x++) { const y0 = x < 196 ? fg(x) : 140;
    for (let y = y0; y < 180; y++) {
      const onda = ((x * 0.11 + y * 0.9 + c_ruido1(x / 9, y >> 3) * 2.2) % 1 + 1) % 1, d = y - y0;
      let c = d < 1 ? hex('#ffffff') : onda < 0.1 ? hex('#c6d2ea') : onda < 0.16 ? hex('#d8e2f2') : (c_umbral(x, y) < 0.06 ? hex('#ffffff') : hex('#e8eef8'));
      if (y > 166) c = c_mix(c, hex('#b8c8e4'), (y - 166) / 30);
      const cy = caminoY(x), cw = caminoW(x);
      if (Math.abs(y - cy) <= cw && x < 208) {   // las losas del camino, con nieve pisada en los bordes
        const fila = Math.floor((y - cy + cw) / 3.2), jx = (x + fila * 5) % (x < 178 ? 9 : 5) === 0, jy = ((y - cy + cw) % 3.2) < 0.8;
        c = jx || jy ? hex('#4e4a58') : h(x >> 2, fila, 41) < 0.3 ? hex('#6e6a78') : hex('#8a8494');
        if (Math.abs(y - cy) > cw - 1.2 && h(x, y, 42) < 0.6) c = hex('#d8e2f2');
        if (h(x, y, 43) < 0.04) c = hex('#e8eef8');
      }
      B[y * 320 + x] = c; } }
  // ── el monasterio en el espolón
  const blanco = hex('#f2eee4'), blancoS = hex('#c4c0c8'), blancoSS = hex('#a8a4b4'), granate = C.granate, rojo = hex('#a8302a'), rojoS = hex('#741c1c'), oro = hex('#e8b830'), oroS = hex('#a87a18'), negro = hex('#1c1222');
  const muro = (x0, x1, y0, y1, talud, sombraIzq = true) => {   // un muro encalado que se estrecha hacia arriba, con su friso
    for (let y = y0; y <= y1; y++) { const e = Math.round((y1 - y) * talud), a = x0 + e, b = x1 - e;
      for (let x = a; x <= b; x++) { let c = blanco; if (x - a < 3 && sombraIzq) c = blancoS; if (x === a) c = blancoSS; if (h(x, y >> 2, 31) < 0.08) c = hex('#e4ded2'); if (y > y1 - 3 && h(x, y, 32) < 0.5) c = hex('#d8d0c4'); B[y * 320 + x] = c; } }
    for (let y = y0; y <= y0 + 4; y++) { const e = Math.round((y1 - y) * talud); for (let x = x0 + e; x <= x1 - e; x++) B[y * 320 + x] = y === y0 + 4 ? negro : (x % 2 && h(x, y, 33) < 0.6 ? hex('#4e1a1c') : granate); }
    rect(x0 + Math.round((y1 - y0) * talud) - 1, y0 - 1, x1 - Math.round((y1 - y0) * talud) + 1, y0 - 1, negro);
  };
  const ventana = (x, y, w = 3, al = 4) => { rect(x - 1, y - 1, x + w, y + al, negro); rect(x, y, x + w - 1, y + al - 1, hex('#2a1e2a')); rect(x - 1, y - 2, x + w, y - 2, rojo); pset(x + w - 1, y, hex('#4a3a4a')); };
  muro(282, 306, 78, 110, 0.06);   // el ala derecha, alta
  for (const wy of [86, 95]) for (let wx = 286; wx < 302; wx += 7) ventana(wx, wy);
  muro(196, 224, 88, 112, 0.08);   // el ala izquierda, baja
  for (let wx = 200; wx < 220; wx += 7) ventana(wx, 98);
  muro(220, 286, 70, 108, 0.07);   // el templo principal
  for (const wy of [82, 92]) for (let wx = 228; wx < 280; wx += 8) if (!(wy === 92 && wx > 244 && wx < 262)) ventana(wx, wy, 4, wy === 82 ? 5 : 4);
  rect(246, 94, 258, 108, negro); rect(247, 95, 257, 108, rojo); rect(252, 95, 252, 108, rojoS); for (let y = 97; y < 108; y += 3) { pset(249, y, oro); pset(255, y, oro); } rect(245, 92, 259, 93, hex('#3a6ad0')); rect(245, 93, 259, 93, hex('#3a9a4a'));
  // el pabellón de tejado rojo con las esquinas levantadas y el remate dorado
  rect(238, 62, 266, 69, negro); rect(239, 63, 265, 69, hex('#e8c040')); for (let x = 240; x < 265; x += 3) rect(x, 64, x + 1, 68, oroS);
  poligono([[232, 63], [236, 56], [268, 56], [272, 63]], negro); poligono([[234, 62], [237, 57], [267, 57], [270, 62]], rojo); linea(234, 62, 270, 62, rojoS); for (let x = 238; x < 268; x += 3) linea(x, 58, x - 1, 61, rojoS);
  pset(231, 62, negro); pset(273, 62, negro); pset(230, 61, rojo); pset(274, 61, rojo);
  rect(250, 50, 254, 56, negro); rect(251, 51, 253, 55, oro); pset(251, 51, hex('#fff0a0')); rect(252, 47, 252, 50, oroS); disco(252, 47, 1, oro);
  for (const gx of [236, 268]) { rect(gx - 1, 53, gx + 1, 56, oroS); pset(gx, 52, oro); }
  // la estupa blanca y la escalera en zigzag hacia el camino
  { const x = 193; rect(x - 7, 128, x + 7, 133, blancoS); rect(x - 6, 128, x + 6, 132, blanco); rect(x - 5, 124, x + 5, 127, blanco); rect(x - 5, 127, x - 3, 127, blancoS); disco(x, 119, 5, blanco); for (let j = -5; j <= 5; j++) pset(x - Math.round(Math.sqrt(25 - j * j)), 119 + j, blancoS);
    rect(x - 1, 108, x + 1, 113, oro); pset(x - 1, 109, oroS); pset(x - 1, 111, oroS); disco(x, 107, 1, oro); rect(x - 7, 133, x + 7, 133, hex('#8a8494')); }
  for (let k = 0; k < 6; k++) { const y0 = 112 + k * 6, xa = k % 2 ? 214 : 204, xb = k % 2 ? 204 : 214; linea(xa, y0, xb, y0 + 6, hex('#8a8494')); linea(xa, y0 + 1, xb, y0 + 7, hex('#6e6a78')); }
  for (let x = 196; x < 312; x++) { B[112 * 320 + x] = hex('#8a8494'); B[113 * 320 + x] = hex('#5a5668'); }   // el borde de la terraza
  // matas secas y rocas con su gorro de nieve
  for (let k = 0; k < 40; k++) { const x = Math.round(h(k, 1, 44) * 318), y = Math.round(fg(x) + 3 + h(k, 2, 44) * 50); if (Math.abs(y - caminoY(x)) < caminoW(x) + 2 || (x > 180 && x < 220)) continue;
    for (let i = 0; i < 4; i++) linea(x + i - 1, y, x + i - 2 + (i & 1), y - 2 - (i % 3), i & 1 ? hex('#a8885a') : hex('#7a5e3a')); }
  const roca = (x, y, w, al) => { poligono([[x - w, y], [x - w + 2, y - al + 2], [x - 1, y - al], [x + w - 2, y - al + 1], [x + w, y]], hex('#2a2632'));
    poligono([[x - w + 1, y - 1], [x - w + 3, y - al + 3], [x - 1, y - al + 1], [x + w - 3, y - al + 2], [x + w - 1, y - 1]], hex('#4e4a5c'));
    poligono([[x, y - 1], [x - 1, y - al + 1], [x + w - 3, y - al + 2], [x + w - 1, y - 1]], hex('#7a7488'));
    linea(x - w + 3, y - al + 2, x + w - 3, y - al + 1, hex('#ffffff')); linea(x - w + 2, y - al + 3, x + w - 2, y - al + 2, hex('#e4ecf6')); rect(x - w, y, x + w, y + 1, hex('#a8b8d8')); };
  roca(10, 136, 9, 8); roca(150, 134, 6, 5); roca(232, 140, 8, 7); roca(276, 168, 11, 9); roca(120, 172, 7, 5);
  // el muro mani: piedras redondeadas con símbolos tallados y pintados (puntos y aros, sin letras) y su nieve encima
  for (let y = 128; y < 141; y++) for (let x = 58; x <= 134; x++) { const fila = Math.floor((y - 128) / 4), sx = (x + fila * 4) % 8, sy = (y - 128) % 4;
    let c = sx === 0 || sy === 3 ? hex('#3e3a4a') : h(Math.floor((x + fila * 4) / 8), fila, 45) < 0.3 ? hex('#6a6478') : hex('#847e90'); if (sy === 0 && sx > 0) c = hex('#9a94a4'); if (x === 134 || x === 58) c = hex('#3e3a4a'); B[y * 320 + x] = c; }
  for (let fila = 0; fila < 3; fila++) for (let x = 60 + fila * 4; x < 130; x += 8) { const k = Math.floor(h(x, fila, 46) * 4), y = 129 + fila * 4, cc = [hex('#f2eee4'), hex('#e8c040'), hex('#6a9ad8'), hex('#d86a5a')][k];
    if (k === 0) { pset(x + 2, y + 1, cc); pset(x + 4, y + 1, cc); } else if (k === 1) { pset(x + 3, y, cc); pset(x + 2, y + 1, cc); pset(x + 4, y + 1, cc); } else { pset(x + 2, y + 1, cc); pset(x + 3, y + 1, cc); pset(x + 5, y + 1, cc); } }
  for (let x = 57; x <= 135; x++) { const a = 1 + Math.round(h(x >> 2, 1, 47) * 1.6); rect(x, 127 - a, x, 127, hex('#f6f8fc')); pset(x, 128, hex('#c6d2ea')); }
  rect(58, 141, 134, 141, hex('#a8b8d8'));
  // los mástiles con su montón de piedras
  for (const [x, top, base] of [[24, 92, 140], [168, 98, 136]]) { rect(x, top, x + 1, base, hex('#5e3a1e')); rect(x + 1, top, x + 1, base, hex('#83552c')); pset(x, top - 1, hex('#e8b830'));
    for (let k = 0; k < 7; k++) { const sx = x - 5 + (k % 4) * 3, sy = base - Math.floor(k / 4) * 3; disco(sx + 1, sy, 2, k & 1 ? hex('#6e6a78') : hex('#8a8494')); pset(sx, sy - 2, hex('#ffffff')); } }
  c_montanaDetalle(R, fg);
  return { sky1, sky2, fg };
}
function c_montana(R, t, o) {
  const { sky1, sky2, fg } = c_fijo(R, 'montana', () => c_montanaFija(R)), vent = c_lim(o.ventisca ?? 0), nieve = o.nieve ?? 0.35;
  const NUBE = [hex('#b4c6e4'), hex('#e2ecf8'), hex('#ffffff')], NUBE2 = [hex('#9aaed4'), hex('#cad8ee'), hex('#eef4fc')];
  // cirros altos y lentos (por detrás de todo)
  for (let k = 0; k < 4; k++) { const x0 = ((k * 97 + t * 2.2) % 400) - 60, y = 18 + k * 7; for (let i = 0; i < 46 - k * 6; i++) { const x = Math.round(x0 + i), yy = y + Math.round(Math.sin(i * 0.2 + k) * 1.5); if (x >= 0 && x < 320 && yy < sky1[x] && (i + yy) % 3) c_tine(R, x, yy, hex('#e8f0fa'), 0.35 + 0.2 * Math.sin(i * 0.3)); } }
  // cúmulos (detrás de las cumbres) y el penacho de nieve de las dos cumbres altas
  for (let k = 0; k < 3; k++) { const v = 3.5 + k * 1.4, x = ((k * 131 + t * v) % 440) - 60; c_nube(R, x, 40 + k * 9, 30 + k * 6, sky1, NUBE); }
  for (const [px, py] of [[98, 30], [168, 46]]) for (let i = 0; i < 26; i++) { const u = ((t * 0.35 + i / 26) % 1), x = Math.round(px + 2 + u * 46 + Math.sin(i * 2.1) * 2), y = Math.round(py - 1 + u * 7 + Math.sin(t * 2 + i) * (1 + u * 3)); if (x < 320 && y < sky1[x] && c_umbral(x, y) < (1 - u) * 0.9) c_tine(R, x, y, hex('#ffffff'), (1 - u) * 0.8); }
  // el banco de niebla del valle, delante de la cordillera lejana y detrás de la media
  for (let k = 0; k < 4; k++) { const x = ((k * 97 + t * 6) % 460) - 70; c_nube(R, x, 92 + (k % 2) * 4, 40, sky2, NUBE2, 0.55); }
  // el quebrantahuesos que planea en círculos y dos chovas
  { const a = t * 0.35, x = Math.round(136 + Math.cos(a) * 34), y = Math.round(58 + Math.sin(a) * 9), b = Math.round(Math.sin(t * 1.4) * 0.6), c = hex('#3a3040');
    for (let i = -5; i <= 5; i++) R.pset(x + i, y - (Math.abs(i) > 2 ? b + (Math.abs(i) > 4 ? 1 : 0) : 0), c); R.pset(x, y + 1, c); R.pset(x + (Math.cos(a + 1.57) > 0 ? 1 : -1), y + 1, hex('#c8a070')); }
  for (let k = 0; k < 2; k++) { const u = ((t * 0.06 + k * 0.12) % 1), x = Math.round(lerp(-10, 340, u)), y = Math.round(70 - k * 6 + Math.sin(t * 2 + k) * 3), f = Math.floor(t * 8 + k * 3) % 2;
    R.pset(x, y, C.k); R.pset(x + 1, y, C.k); R.pset(x - 1, y - f, C.k); R.pset(x + 2, y - f, C.k); R.pset(x + 2, y + 1, hex('#e8c040')); }
  // el humo de enebro del quemador del tejado, el remate que destella y los monjes de la terraza
  c_humo(R, t, 279, 69, 0.5, 26, 0.45);
  if (Math.sin(t * 1.7) > 0.85) { R.pset(251, 46, hex('#ffffff')); R.pset(250, 47, hex('#fff0a0')); R.pset(253, 47, hex('#fff0a0')); R.pset(252, 45, hex('#fff0a0')); }
  { const u = (t * 0.05) % 1, x = Math.round(u < 0.5 ? lerp(226, 300, u * 2) : lerp(300, 226, (u - 0.5) * 2)); c_monjito(R, x, 111, t, u < 0.5 ? 1 : -1, true, 7); }
  { const u = (t * 0.07) % 1, kk = 5 - Math.min(5, Math.floor(u * 6)), f = u * 6 - Math.floor(u * 6), xa = kk % 2 ? 214 : 204, xb = kk % 2 ? 204 : 214; c_monjito(R, Math.round(lerp(xb, xa, f)), Math.round(lerp(118 + kk * 6, 112 + kk * 6, f)), t, xa > xb ? 1 : -1, true, 7); }
  // las banderas: la cuerda entre los mástiles y la que sube al monasterio
  c_cuerdaBanderas(R, t, 25, 93, 168, 99, 12, 1 + vent);
  c_cuerdaBanderas(R, t, 169, 99, 230, 72, 4, 1 + vent, 5);
  c_cuerdaBanderas(R, t, -4, 104, 24, 93, 3, 1 + vent, 6);
  c_montanaVida(R, t, fg, vent);
  // la nieve que cae (y la ventisca: el cielo se cierra y la nieve va en diagonal)
  if (vent > 0) { const B = R.buf, g = hex('#c8d0dc'), g2 = hex('#9aa6b8'); for (let i = 0; i < 57600; i++) { const y = (i / 320) | 0; B[i] = c_mix(B[i], y < 110 ? g2 : g, vent * (y < 110 ? 0.55 : 0.3)); } }
  c_copos(R, t, Math.round(30 + nieve * 60 + vent * 120), 0.3 + vent * 2.5, 1, 1);
  return { suelo: 152, libre: [30, 220], monasterio: [196, 56, 306, 112], puerta: [246, 94, 258, 108], escalera: [204, 112, 214, 148], sol: [236, 26] };
}
function c_montanaDelante(R, t, o) {
  const vent = c_lim(o.ventisca ?? 0), nieve = o.nieve ?? 0.35, { poligono, linea } = R;
  // los ventisqueros de las esquinas con una roca asomando
  poligono([[0, 160], [12, 158], [26, 166], [36, 180], [0, 180]], hex('#c6d2ea')); poligono([[0, 162], [11, 160], [24, 168], [32, 180], [0, 180]], hex('#eef3fa')); linea(0, 160, 12, 158, hex('#ffffff'));
  poligono([[6, 172], [9, 166], [15, 165], [18, 172]], hex('#4e4a5c')); linea(9, 166, 15, 165, hex('#ffffff'));
  poligono([[319, 158], [302, 162], [288, 172], [282, 180], [319, 180]], hex('#c6d2ea')); poligono([[319, 160], [303, 164], [291, 173], [287, 180], [319, 180]], hex('#eef3fa'));
  for (let k = 0; k < 4; k++) linea(300 + k * 4, 168 - (k & 1), 299 + k * 4, 172, hex('#a8885a'));
  c_copos(R, t, Math.round(8 + nieve * 14 + vent * 50), 0.5 + vent * 3, 2, 2);
  return {};
}

function c_patioFija(R) {
  const B = R.buf, { rect, pset, linea, poligono, disco } = R, negro = hex('#1c1222'), blanco = hex('#f0ece2'), granate = C.granate, rojo = hex('#a8302a'), rojoS = hex('#741c1c'), rojoL = hex('#c84a3a'), oro = hex('#e8b830'), oroS = hex('#a87a18');
  c_degradado(R, 0, 40, [hex('#1e3f8a'), hex('#2a58aa'), hex('#3e76c8'), hex('#6a9ade')]);
  // un pico nevado tras el tejado (a la izquierda, lejos de Atom)
  for (let x = 0; x < 250; x++) { const a1 = 10 + Math.abs(x - 92) * 0.62, a2 = 18 + Math.abs(x - 190) * 0.7, top = Math.round(Math.min(a1, a2) + c_ruido1(x / 4, 61) * 2.5), lado = x >= (a1 < a2 ? 92 : 190);
    for (let y = top; y < 40; y++) { const q = h(x >> 1, y >> 1, 62);
      B[y * 320 + x] = c_mix(q < 0.1 ? hex('#6a6880') : lado ? (y - top < 1 ? hex('#ffffff') : hex('#e8eef8')) : hex('#9fb0d6'), hex('#9ab8e0'), c_lim((y - 14) / 30) * 0.5); } }
  // los extremos de las vigas pintadas y el tejadillo
  rect(0, 32, 319, 35, negro); for (let x = 0; x < 320; x++) { B[33 * 320 + x] = x % 6 < 4 ? rojo : rojoS; B[34 * 320 + x] = rojoS; }
  for (let x = 2; x < 320; x += 6) { rect(x, 36, x + 3, 39, negro); if (x > 266) { rect(x, 36, x + 2, 38, hex('#5a3a2e')); continue; } rect(x, 36, x + 2, 38, [hex('#3a6ad0'), hex('#3a9a4a'), hex('#e8c040')][(x / 6 | 0) % 3]); pset(x, 36, hex('#f0f0f0')); }
  rect(0, 40, 319, 40, negro);
  // el friso de ramas granate con sus discos dorados
  for (let y = 41; y < 51; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = y === 50 ? negro : (h(x, y >> 2, 63) < 0.35 || x % 2 === 0 ? hex('#4e1a1c') : granate);
  for (let x = 30; x < 270; x += 40) { disco(x, 45, 3, negro); disco(x, 45, 2, oro); pset(x - 1, 44, hex('#fff0a0')); pset(x + 1, 46, oroS); }
  // el muro encalado con sus brochazos, la sombra del alero y las manchas de humedad de abajo
  for (let y = 51; y < 142; y++) for (let x = 0; x < 320; x++) { const br = ((x * 0.05 + c_ruido1(y / 11, x >> 5) * 0.9) % 1), q = h(x >> 1, y >> 2, 64);
    let c = br < 0.05 ? hex('#e2dcd0') : q < 0.05 ? hex('#d8d0c2') : blanco; if (y < 56) c = c_umbral(x, y) < (56 - y) / 5 ? hex('#c8c0b8') : c;
    if (y > 128 && h(x >> 2, 0, 65) * 14 > 142 - y) c = c_umbral(x, y) < 0.5 ? hex('#cfc4b0') : hex('#bfb2a0'); B[y * 320 + x] = c; }
  c_patioMuro(R);
  // el pórtico: columnas rojas, capiteles de colores, el dintel de vigas y la banda negra que enmarca la puerta
  poligono([[126, 141], [128, 66], [192, 66], [194, 141]], negro);
  for (const cx of [116, 204]) { rect(cx - 3, 66, cx + 3, 141, negro); rect(cx - 2, 70, cx + 2, 140, rojo); rect(cx - 2, 70, cx - 1, 140, rojoL); rect(cx + 2, 70, cx + 2, 140, rojoS);
    rect(cx - 5, 64, cx + 5, 69, negro); rect(cx - 4, 65, cx + 4, 66, hex('#3a6ad0')); rect(cx - 4, 67, cx + 4, 68, hex('#3a9a4a')); pset(cx, 65, oro); rect(cx - 4, 141, cx + 4, 142, hex('#8a8494')); }
  for (const [y, c] of [[56, hex('#3a6ad0')], [59, hex('#3a9a4a')], [62, rojo]]) { rect(104, y, 216, y + 2, negro); rect(105, y, 215, y + 1, c); for (let x = 106; x < 215; x += 4) pset(x, y, y === 62 ? oro : hex('#f0f0f0')); }
  rect(104, 65, 216, 65, negro);
  // la puerta roja de dos hojas: tachones dorados, aldabas y el escalón (el hueco, por si se abre, lo pinta c_patio)
  rect(132, 84, 188, 141, negro);
  for (let y = 85; y < 141; y++) for (let x = 133; x < 188; x++) { let c = (x === 160 || x === 159) ? rojoS : h(x >> 2, y, 66) < 0.2 ? hex('#982a26') : rojo; if (x === 133 || x === 161) c = rojoL; B[y * 320 + x] = c; }
  for (let y = 90; y < 138; y += 9) for (let x = 138; x < 186; x += 7) if (Math.abs(x - 160) > 3) { pset(x, y, oro); pset(x + 1, y + 1, oroS); }
  for (const ax of [154, 166]) { R.anillo(ax, 114, 3, oroS); disco(ax, 110, 2, oro); pset(ax - 1, 109, hex('#fff0a0')); }
  rect(128, 141, 192, 143, hex('#6e6a78')); rect(128, 141, 192, 141, hex('#a8a4b0'));
  // las ventanas de marco negro con celosía roja y geranios
  for (const wx of [44, 252]) { poligono([[wx - 4, 90], [wx - 2, 62], [wx + 26, 62], [wx + 28, 90]], negro); rect(wx, 66, wx + 22, 88, hex('#2a1e2a'));
    for (let y = 66; y < 89; y++) for (let x = wx; x <= wx + 22; x++) if ((x - wx) % 6 === 0 || (y - 66) % 6 === 0) pset(x, y, rojo); rect(wx - 2, 60, wx + 24, 61, rojo); rect(wx - 2, 59, wx + 24, 59, hex('#3a6ad0'));
    rect(wx - 2, 89, wx + 24, 93, hex('#5e3a1e')); rect(wx - 2, 89, wx + 24, 89, hex('#83552c')); }
  // la galería de las ruedas de oración: el tejadillo, los postes y el hueco en sombra
  rect(10, 98, 106, 101, negro); rect(11, 98, 105, 99, rojo); for (let x = 12; x < 105; x += 3) pset(x, 100, oro);
  rect(12, 102, 104, 139, hex('#3a2a2a')); for (let y = 102; y < 139; y++) for (let x = 12; x < 105; x++) if (h(x, y, 67) < 0.08) pset(x, y, hex('#4a3636'));
  for (const px of [11, 57, 104]) { rect(px - 1, 101, px + 1, 140, negro); rect(px, 102, px, 139, rojoL); }
  rect(12, 104, 104, 105, hex('#5e3a1e')); rect(12, 133, 104, 136, hex('#5e3a1e')); rect(12, 133, 104, 133, hex('#83552c')); rect(10, 140, 106, 141, hex('#8a8494'));
  // el quemador de incienso encalado (la boca la pinta c_patio)
  poligono([[230, 142], [232, 120], [236, 112], [256, 112], [260, 120], [262, 142]], negro); poligono([[231, 141], [233, 120], [237, 113], [255, 113], [259, 120], [261, 141]], blanco);
  for (let y = 113; y < 142; y++) for (let x = 231; x < 262; x++) if (R.pget(x, y) === blanco && (x < 238 || h(x, y, 68) < 0.1)) pset(x, y, hex('#d0c8bc'));
  rect(240, 104, 252, 112, negro); rect(241, 105, 251, 111, blanco); rect(241, 105, 243, 111, hex('#d0c8bc')); rect(243, 100, 249, 104, negro); rect(244, 101, 248, 103, hex('#a8302a'));
  rect(240, 126, 252, 134, negro); rect(241, 127, 251, 133, hex('#2a1a1a'));
  // la leña de enebro y la escoba de ramas
  for (let k = 0; k < 6; k++) { const y = 140 - (k % 3) * 4, x0 = 272 + (k > 2 ? 4 : 0); rect(x0, y - 3, x0 + 30, y, negro); rect(x0 + 1, y - 2, x0 + 29, y - 1, hex('#83552c')); rect(x0 + 1, y - 2, x0 + 29, y - 2, hex('#a8743c')); disco(x0 + 30, y - 1.5, 1.6, hex('#d8b47a')); }
  linea(268, 141, 280, 108, hex('#5e3a1e')); for (let i = -3; i <= 3; i++) linea(268, 141, 266 + i * 2, 146, hex('#a8885a'));
  // el suelo de losas en perspectiva, gastado, con nieve en las esquinas y la sombra del alero
  const ys = [142, 145, 149, 154, 160, 167, 175, 184];
  for (let y = 142; y < 180; y++) { const fila = ys.findIndex((v) => y < v) - 1, junta = ys.includes(y);
    for (let x = 0; x < 320; x++) { const u = (x - 160) / (y - 60) * 7 + (fila % 2) * 0.5, ju = ((u % 1) + 1) % 1 < 0.08;
      let c = junta || ju ? hex('#5a5668') : h(Math.floor(u), fila, 69) < 0.3 ? hex('#8a8494') : h(Math.floor(u), fila, 70) < 0.6 ? hex('#9a94a4') : hex('#a8a2b0');
      if (!junta && !ju && h(x, y, 71) < 0.05) c = hex('#b8b2c0');
      if (Math.abs(x - 160) < 26 - (180 - y) * 0.2 && !junta && h(x >> 1, y >> 1, 72) < 0.4) c = hex('#b0aab6');   // el paso gastado hacia la puerta
      const esq = Math.min(x, 319 - x) * 0.8 + (y - 142) * 0.9 + c_ruido1(x / 5 + y / 7, 73) * 8;
      if (esq < 14) c = esq < 7 ? hex('#eef3fa') : hex('#c6d2ea');
      if (y < 147) c = c_mix(c, hex('#3a3448'), 0.25);
      B[y * 320 + x] = c; } }
  return {};
}
function c_patio(R, t, o) {
  c_fijo(R, 'patio', () => c_patioFija(R));
  const { pset, rect } = R, abre = c_lim(o.puerta ?? 0);
  // nubes que pasan por encima del tejado
  const lim = new Array(320).fill(32), NUBE = [hex('#b4c6e4'), hex('#e2ecf8'), hex('#ffffff')];
  for (let k = 0; k < 3; k++) { const x = ((k * 140 + t * (3 + k * 1.5)) % 460) - 70; c_nube(R, x, 12 + k * 7, 22 + k * 5, lim, NUBE); }
  // las palomas de la cornisa
  for (let k = 0; k < 3; k++) { const x = 70 + k * 64 + (k === 1 ? Math.round(Math.sin(t * 0.4) * 6) : 0), pic = Math.sin(t * 3 + k * 2) > 0.6 ? 1 : 0;
    rect(x, 29, x + 3, 31, hex('#7a7e8e')); pset(x + 3 + pic, 28 + pic, hex('#5a5e6e')); pset(x + 4 + pic, 28 + pic, C.naranja); pset(x, 30, hex('#9aa0b0')); pset(x + 1, 32, C.k); }
  // la cortinilla blanca de ondas azules que mueve el aire
  for (let x = 128; x <= 192; x++) { const l = 5 + Math.round(Math.sin(t * 2.2 + x * 0.25) * 1 + Math.sin(t * 3.1 + x * 0.6) * 0.6);
    for (let j = 0; j <= l; j++) pset(x, 77 + j, j === l ? hex('#1c1222') : j === l - 2 ? hex('#3a6ad0') : (x + Math.round(t * 4)) % 8 === 0 ? hex('#d8dce8') : hex('#f6f6f0')); }
  // la puerta que se abre: el hueco de luz de las lámparas de manteca
  if (abre > 0) { const w = Math.round(abre * 26);
    for (let y = 85; y < 141; y++) for (let x = 160 - w; x < 160 + w; x++) { const fl = Math.sin(t * 9 + x * 0.3) * 0.04; pset(x, y, c_mix(hex('#3a1e14'), hex('#f8c060'), c_lim(0.5 - Math.hypot(x - 160, y - 128) / 60 + fl + c_umbral(x, y) * 0.15))); }
    for (let k = 0; k < 5; k++) { const lx = 146 + k * 7; if (Math.abs(lx - 160) < w) { pset(lx, 124 + (k & 1), hex('#fff8c0')); pset(lx, 125 + (k & 1), hex('#e8b830')); } }
    rect(160 - w - 2, 85, 160 - w, 140, hex('#741c1c')); rect(160 + w, 85, 160 + w + 2, 140, hex('#741c1c')); }
  // las ruedas de oración: cilindros dorados con bandas que giran
  for (let k = 0; k < 9; k++) { const x0 = 16 + k * 10, gira = t * (1.6 + (k % 3) * 0.3) + k;
    for (let y = 109; y < 131; y++) for (let i = 0; i < 7; i++) { const a = Math.asin((i - 3) / 3.6), u = ((a / Math.PI + gira) % 1 + 1) % 1, banda = y === 111 || y === 128 || (y > 114 && y < 125 && u < 0.18);
      let c = banda ? hex('#a87a18') : i < 2 ? hex('#c8961e') : i > 4 ? hex('#a87a18') : hex('#e8b830'); if (i === 2 && !banda) c = hex('#fff0a0'); if (y === 109 || y === 130) c = hex('#5e3a1e'); pset(x0 + i, y, c); }
    for (let y = 114; y < 125; y += 3) { const u = ((gira * 7 + y) % 7 + 7) % 7; if (u >= 1 && u < 6) pset(x0 + Math.round(u), y + 1, hex('#d03a3a')); }
    rect(x0 + 3, 106, x0 + 3, 108, hex('#3a2a24')); rect(x0 + 3, 131, x0 + 3, 132, hex('#3a2a24')); }
  // el incienso: la boca encendida y el humo de enebro que sube en volutas
  for (let x = 242; x < 251; x++) for (let y = 128; y < 134; y++) if (h(x, y + Math.floor(t * 4), 74) < 0.45) pset(x, y, h(x, y, 75) < 0.5 ? hex('#f88a2a') : hex('#c83a1a'));
  c_humo(R, t, 246, 100, 0.25, 62, 0.6);
  // un monje que asoma a la ventana de la derecha y el novicio que cruza al pie del muro
  if (Math.floor(t / 3) % 3 !== 1) { const x = 264, y = 88; rect(x - 2, y - 5, x + 2, y, hex('#8a2430')); rect(x - 1, y - 9, x + 1, y - 6, hex('#c88a5a')); pset(x, y - 10, hex('#3a2a24')); rect(x - 2, y - 5, x + 2, y - 5, hex('#e8a030')); }
  { const u = (t * 0.035) % 1, x = Math.round(lerp(-10, 330, u)); if (x < 108 || x > 214) c_monjito(R, x, 144, t, 1, true, 10); }
  c_patioVida(R, t);
  return { suelo: 150, libre: [30, 300], puerta: [132, 84, 188, 141], ruedas: [14, 100, 102, 139], incienso: [228, 108, 264, 142] };
}
// LA FORJA DE NOCHE: el muro, las vigas, el tablero, la mesa con la armadura, el yunque, la tina y el horno
function c_forjaFija(R) {
  const B = R.buf, { rect, pset, linea, poligono, disco } = R, negro = hex('#120c14'), luzF = hex('#f88a3a'), luna = hex('#5a7ab8');
  // el muro de mampostería: piedras irregulares por hiladas, cada una con su luz y su sombra; el fuego y la luna lo tiñen
  for (let y = 0; y < 150; y++) { const fila = Math.floor(y / 9), off = (fila % 2) * 7 + Math.floor(h(fila, 1, 80) * 5), yy = y % 9;
    for (let x = 0; x < 320; x++) { const xx = x + off, ancho = 14, col = Math.floor(xx / ancho), px = xx % ancho;
      const q = h(col, fila, 82); let c = q < 0.3 ? hex('#3e342e') : q < 0.7 ? hex('#4a3e36') : hex('#56483e');
      if (yy === 0 || px === 0 || (yy === 1 && (px === 1 || px === ancho - 1)) || (yy === 8 && (px === 1 || px === ancho - 1))) c = hex('#1e1618'); else if (yy === 1 || px === 1) c = c_mix(c, hex('#8a7058'), 0.35); else if (yy === 8 || px === ancho - 1) c = c_mix(c, hex('#1e1618'), 0.4); else if (h(x, y, 83) < 0.08) c = c_mix(c, hex('#1e1618'), 0.3);
      const dF = Math.hypot(x - 262, (y - 104) * 1.2), lF = c_lim(1 - dF / 230), dL = Math.hypot(x - 78, y - 70), lL = c_lim(1 - dL / 90) * 0.35;
      c = c_mix(c, hex('#0c0810'), c_lim(0.55 - lF * 0.6)); c = c_mix(c, luzF, lF * lF * 0.55 * (0.8 + c_umbral(x, y) * 0.4)); c = c_mix(c, luna, lL * (1 - lF));
      B[y * 320 + x] = c; } }
  // las vigas del techo (oscuras: la barra del año queda tranquila)
  rect(0, 0, 319, 7, hex('#1a1014')); for (let x = 0; x < 320; x++) if (h(x >> 3, 0, 84) < 0.5) pset(x, 3, hex('#2a1c18'));
  for (let k = 0; k < 6; k++) { const x = 8 + k * 56; rect(x, 8, x + 9, 13, negro); rect(x + 1, 8, x + 8, 12, hex('#3a2418')); rect(x + 1, 8, x + 8, 8, hex('#5a3a24')); }
  rect(0, 7, 319, 7, hex('#2a1c18'));
  // el hueco de la ventana (el cielo lo pinta c_forja) con su alféizar nevado
  poligono([[54, 64], [56, 20], [100, 20], [102, 64]], negro); rect(56, 62, 100, 66, hex('#5e3a1e')); rect(56, 62, 100, 62, hex('#e8eef8')); rect(56, 63, 100, 63, hex('#a8b8d8'));
  // el tablero de las herramientas
  rect(20, 66, 124, 100, negro); for (let y = 67; y < 100; y++) for (let x = 21; x < 124; x++) { const v = ((x * 0.07 + c_ruido1(y / 3, x >> 5) * 0.8) % 1); pset(x, y, (y - 67) % 8 === 7 ? hex('#2a1810') : v < 0.15 ? hex('#4a2e1c') : hex('#5e3a24')); }
  const metal = hex('#8a8e9e'), metalS = hex('#5a5e6e'), metalL = hex('#c8ccd8'), mango = hex('#a8743c');
  // tenazas, martillos, lima y cinceles colgados de sus clavos, con su sombra
  for (const [x, l] of [[28, 26], [36, 24]]) { linea(x + 1, 70, x + 4, 70 + l + 1, hex('#1a100c')); linea(x + 5, 70, x + 2, 70 + l + 1, hex('#1a100c')); linea(x, 69, x + 3, 69 + l, metalS); linea(x + 4, 69, x + 1, 69 + l, metal); pset(x + 2, 72, metalL); pset(x + 2, 68, hex('#1a1014')); }
  for (const [x, w] of [[50, 8], [64, 6], [76, 10]]) { rect(x + 1, 71, x + 2, 96, hex('#1a100c')); rect(x, 70, x + 1, 95, mango); rect(x, 70, x, 95, hex('#c89a5a')); rect(x - w / 2, 66 + 2, x + w / 2 + 1, 71, negro); rect(x - w / 2 + 1, 68, x + w / 2, 70, metal); rect(x - w / 2 + 1, 68, x + w / 2, 68, metalL); }
  rect(92, 70, 93, 94, metalS); rect(92, 70, 92, 94, metal); rect(92, 88, 93, 96, mango);
  for (const x of [102, 108, 114]) { rect(x, 72, x + 1, 90, metal); rect(x, 72, x, 90, metalL); rect(x, 84, x + 1, 92, mango); pset(x, 71, hex('#1a1014')); }
  // la mesa de las piezas de la armadura (la luz del fuego en el canto)
  rect(28, 124, 128, 128, negro); rect(29, 124, 127, 126, hex('#6a4228')); rect(29, 124, 127, 124, hex('#a8743c')); for (let x = 30; x < 127; x += 9) pset(x, 125, hex('#4e2e1a'));
  for (const lx of [32, 122]) { rect(lx, 128, lx + 3, 146, negro); rect(lx + 1, 128, lx + 2, 146, hex('#4e2e1a')); }
  rect(36, 136, 118, 137, hex('#3a2418'));
  // el peto (redondo, con remaches), el guantelete, la greba y el casco abierto
  for (let y = 104; y < 124; y++) for (let x = 40; x < 62; x++) { const u = (x - 51) / 11, v = (y - 114) / 10; if (u * u + v * v * 0.7 > 1 || (v < -0.6 && Math.abs(u) < 0.35)) continue; const l = c_lim(0.5 + u * 0.4 - v * 0.2); pset(x, y, u * u + v * v * 0.7 > 0.82 ? hex('#2a2a34') : l > 0.75 ? metalL : l > 0.45 ? metal : metalS); }
  for (const [rx, ry] of [[44, 108], [58, 108], [51, 120]]) pset(rx, ry, metalL); linea(51, 106, 51, 121, metalS);
  rect(68, 116, 80, 123, hex('#2a2a34')); rect(69, 117, 79, 122, metal); for (let x = 70; x < 79; x += 2) rect(x, 117, x, 122, metalS); rect(69, 117, 79, 117, metalL); rect(79, 119, 84, 122, hex('#2a2a34')); rect(80, 120, 83, 121, metal);
  rect(88, 108, 96, 123, hex('#2a2a34')); rect(89, 109, 95, 122, metal); rect(89, 109, 90, 122, metalL); rect(94, 109, 95, 122, metalS); rect(88, 114, 96, 115, hex('#2a2a34'));
  disco(110, 114, 9, hex('#2a2a34')); disco(110, 114, 8, metal); disco(108, 111, 4, metalL); rect(101, 115, 119, 124, hex('#6a4228')); rect(101, 115, 119, 115, hex('#2a2a34')); rect(104, 113, 116, 114, hex('#1c1a24'));
  // el rollo de planos con círculos y la vela
  rect(64, 121, 84, 123, hex('#d8c8a0')); rect(64, 121, 84, 121, hex('#f0e4c4')); disco(84, 122, 2, hex('#c8b48a')); R.anillo(72, 122, 1, hex('#7a5a3a'));
  rect(122, 116, 124, 123, hex('#e8dcc0')); rect(122, 116, 122, 123, hex('#fff4dc'));
  c_forjaMuro(R);
  // el suelo de tierra pisada y losas, con carbonilla, escoria y el brillo del fuego
  for (let y = 146; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 146) / (3 + (y - 146) * 0.15)), u = (x - 160) / (y - 100) * 5 + fila * 0.5, ju = ((u % 1) + 1) % 1 < 0.06;
    let c = ju ? hex('#1e1618') : h(Math.floor(u), fila, 85) < 0.4 ? hex('#3a302c') : hex('#463a32'); if (h(x, y, 86) < 0.05) c = hex('#1a1214'); if (h(x, y, 87) < 0.02) c = hex('#6a5a4a');
    const dF = Math.hypot(x - 262, (y - 140) * 2.2), lF = c_lim(1 - dF / 170); c = c_mix(c, hex('#0c0810'), c_lim(0.4 - lF)); c = c_mix(c, luzF, lF * lF * 0.6 * (0.8 + c_umbral(x, y) * 0.4)); B[y * 320 + x] = c; }
  rect(0, 145, 319, 146, hex('#1a1214'));
  // EL YUNQUE sobre su tocón: el pico, la cara de golpeo, la cintura, los pies; el agujero cuadrado
  { const ax = 163, cY = 136;   // cY: el borde de arriba de la cara de golpeo
    rect(ax - 12, cY + 12, ax + 12, cY + 18, negro); for (let y = cY + 13; y < cY + 18; y++) for (let x = ax - 11; x <= ax + 11; x++) pset(x, y, (x - ax + 11) % 5 === 0 ? hex('#3a2418') : y === cY + 13 ? hex('#a8743c') : hex('#6a4228'));
    R.anillo(ax + 1, cY + 13, 3, hex('#83552c')); rect(ax - 12, cY + 19, ax + 12, cY + 19, hex('#1a1214'));
    poligono([[ax - 10, cY + 12], [ax - 6, cY + 8], [ax + 6, cY + 8], [ax + 10, cY + 12]], negro); poligono([[ax - 9, cY + 11], [ax - 5, cY + 9], [ax + 5, cY + 9], [ax + 9, cY + 11]], hex('#3a3c48')); linea(ax - 5, cY + 9, ax + 5, cY + 9, hex('#6e7282'));
    rect(ax - 5, cY + 5, ax + 5, cY + 8, negro); rect(ax - 4, cY + 5, ax + 4, cY + 8, hex('#3a3c48')); rect(ax - 4, cY + 5, ax - 3, cY + 8, hex('#5a5e6e')); rect(ax + 3, cY + 5, ax + 4, cY + 8, hex('#7a5048'));
    poligono([[ax - 30, cY + 2], [ax - 17, cY - 1], [ax - 17, cY + 5], [ax - 24, cY + 4]], negro); poligono([[ax - 28, cY + 2], [ax - 17, cY], [ax - 17, cY + 4]], hex('#6e7282')); linea(ax - 27, cY + 1, ax - 17, cY, hex('#c8ccd8'));
    rect(ax - 17, cY - 1, ax + 19, cY + 5, negro); rect(ax - 16, cY, ax + 18, cY + 4, hex('#4a4c5a')); rect(ax - 16, cY, ax + 18, cY, hex('#d8dce6')); rect(ax - 16, cY + 1, ax + 18, cY + 1, hex('#8a8e9e'));
    rect(ax + 11, cY + 1, ax + 18, cY + 4, hex('#7a5a4a')); rect(ax + 12, cY, ax + 13, cY, hex('#1c1a24')); pset(ax + 16, cY, hex('#1c1a24'));
    for (const x of [ax - 12, ax - 4, ax + 6]) pset(x, cY + 3, hex('#3a3c48')); }
  // la tina de templar: un barreño de duelas con dos aros de hierro (el agua la pinta c_forja)
  { const cx = 202, rx = 12;
    for (let y = 134; y < 152; y++) for (let x = cx - rx - 1; x <= cx + rx + 1; x++) { const u = (x - cx) / (rx + 1), ens = Math.abs(u) <= 1 - (y > 146 ? (y - 146) * 0.02 : 0); if (!ens) continue;
      const duela = ((x - cx + 40) % 4) === 0, aro = y === 138 || y === 139 || y === 147 || y === 148, borde = Math.abs(u) > 0.92;
      let c = aro ? (y === 138 || y === 147 ? hex('#6e7282') : hex('#2a2a34')) : duela ? hex('#3a2418') : u > 0.45 ? hex('#b86a3a') : u < -0.5 ? hex('#4e2e1a') : hex('#7a4a2a');
      if (borde) c = negro; pset(x, y, c); }
    for (let i = -rx - 1; i <= rx + 1; i++) { const yy = Math.round(134 - Math.sqrt(Math.max(0, 1 - (i / (rx + 1)) ** 2)) * 2.5); pset(cx + i, yy, negro); pset(cx + i, 134 + Math.round(Math.sqrt(Math.max(0, 1 - (i / (rx + 1)) ** 2)) * 2), hex('#83552c')); }
    rect(cx - rx - 1, 152, cx + rx + 1, 152, hex('#1a1214')); }
  // EL HORNO: la base de piedra, la mesa de brasas, la boca, la campana y la chimenea
  poligono([[230, 92], [296, 92], [272, 30], [254, 30]], negro);
  for (let y = 31; y < 92; y++) for (let x = 231; x < 296; x++) { if (R.pget(x, y) !== negro) continue; const fila = Math.floor(y / 6), q = h(Math.floor((x + fila * 4) / 9), fila, 88); let c = q < 0.5 ? hex('#5a4a40') : hex('#6a5648'); if (y % 6 === 0 || (x + fila * 4) % 9 === 0) c = hex('#2a1e1c'); c = c_mix(c, luzF, c_lim((y - 50) / 50) * 0.45); if (x > 284 - (91 - y) * 0.3) c = c_mix(c, negro, 0.4); pset(x, y, c); }
  rect(254, 8, 272, 30, negro); for (let y = 8; y < 30; y++) for (let x = 255; x < 272; x++) pset(x, y, (y % 6 === 0 || (x + Math.floor(y / 6) * 4) % 9 === 0) ? hex('#1e1618') : hex('#3e3430'));
  rect(228, 90, 298, 94, negro); rect(229, 91, 297, 93, hex('#7a6a5a')); rect(229, 91, 297, 91, hex('#a8907a'));
  for (let y = 112; y < 150; y++) for (let x = 226; x < 304; x++) { const fila = Math.floor((y - 112) / 7), q = h(Math.floor((x + fila * 5) / 10), fila, 89); let c = q < 0.4 ? hex('#5a4a40') : q < 0.8 ? hex('#6a5648') : hex('#7a6454'); if ((y - 112) % 7 === 0 || (x + fila * 5) % 10 === 0) c = hex('#2a1e1c'); if (x > 296) c = c_mix(c, negro, 0.45); c = c_mix(c, luzF, 0.25); pset(x, y, c); }
  rect(225, 111, 305, 113, negro); rect(226, 111, 304, 112, hex('#a8907a'));
  poligono([[238, 112], [240, 95], [288, 95], [290, 112]], negro);
  // el fuelle de cuero (lo mueve c_forja) y el montón de carbón
  for (let k = 0; k < 10; k++) disco(240 + (k % 4) * 4 + Math.floor(k / 4) * 2, 150 - Math.floor(k / 4) * 3, 2, k & 1 ? hex('#1a1418') : hex('#2a2428'));   // el montón de carbón
  c_forjaSuelo(R);
  return {};
}
function c_forja(R, t, o) {
  c_fijo(R, 'forja', () => c_forjaFija(R));
  const { pset, rect, linea, poligono, disco } = R, fuego = c_lim(o.fuego ?? 1), sin = o.sinMascara || o.mascara == null || o.mascara === false, calor = sin ? 0 : c_lim(+o.mascara);
  // el fuelle: lo bombea el monje y aviva el fuego
  const bomba = (Math.sin(t * 2.4) + 1) / 2, aviva = fuego * (0.75 + bomba * 0.25);
  // la ventana: el cielo de noche con estrellas que titilan, un pico a la luz de la luna y la nieve, recortado a su hueco
  R.recorte([56, 20, 100, 61]);
  for (let y = 20; y < 62; y++) for (let x = 56; x <= 100; x++) { const pico = 34 + Math.abs(x - 84) * 0.8 + c_ruido1(x / 3, 90) * 2; let c = y < 40 ? hex('#141a3e') : hex('#1e2650');
    if (y >= pico) c = x > 84 ? (h(x >> 1, y >> 1, 91) < 0.1 ? hex('#4a4a6a') : hex('#c8d4ec')) : hex('#7a88b8'); pset(x, y, c); }
  for (let k = 0; k < 10; k++) { const x = 58 + Math.floor(h(k, 1, 92) * 40), y = 22 + Math.floor(h(k, 2, 92) * 14); if (Math.sin(t * 2 + k * 3) > -0.3) pset(x, y, k % 3 ? hex('#c8d0f0') : hex('#ffffff')); }
  disco(64, 28, 3, hex('#f2f0e0')); pset(63, 27, hex('#ffffff')); pset(65, 29, hex('#d8d4c0'));
  c_copos(R, t * 0.6, 14, 0.4, 1, 9);
  R.recorte(null);
  rect(77, 20, 79, 62, hex('#1c1222')); rect(56, 40, 100, 41, hex('#1c1222'));
  // el fuelle y el monje que lo bombea (gente de fondo, 10 px)
  { const x0 = 298, al = Math.round(4 + bomba * 6); poligono([[x0, 120], [x0 + 18, 120 - al], [x0 + 18, 122 + al], [x0, 124]], hex('#1c1222')); poligono([[x0 + 1, 121], [x0 + 17, 121 - al], [x0 + 17, 121 + al], [x0 + 1, 123]], hex('#7a4a2a'));
    for (let i = 4; i < 17; i += 4) linea(x0 + i, 121 - Math.round(al * i / 18), x0 + i, 122 + Math.round(al * i / 18), hex('#4e2e1a'));
    linea(x0 + 17, 121 - al, x0 + 21, 106, hex('#5e3a1e')); rect(x0, 121, x0 + 2, 123, hex('#2a2a34'));
    c_monjito(R, 312, 146, t, -1, false, 12); linea(309, 138, x0 + 20, 106 + Math.round(bomba * 2), hex('#8a2430')); }
  // el fuego vivo de la boca: llamas que lamen, brasas que palpitan
  for (let y = 96; y < 112; y++) for (let x = 241; x < 288; x++) { const u = (x - 264) / 23, base = (112 - y) / 16, n = c_ruido1(x / 3 + t * 3, Math.floor(y / 2 + t * 6)) * 0.6, f = c_lim((1 - u * u) * aviva * 1.2 - base * 0.9 + n * 0.5);
    pset(x, y, f > 0.75 ? hex('#fff4c0') : f > 0.55 ? hex('#ffd060') : f > 0.35 ? hex('#f88a2a') : f > 0.15 ? hex('#c83a1a') : hex('#3a1410')); }
  for (let x = 228; x < 302; x++) { const b = h(x, Math.floor(t * 3 + x * 0.1), 93); pset(x, 113, b < 0.3 * fuego ? hex('#f88a2a') : b < 0.5 ? hex('#7a2a1a') : hex('#2a1a1a')); }
  c_chispas(R, t, 264, 96, Math.round(10 * fuego), 0.5, 1.4);
  // el resplandor del fuego que tiembla en el muro y el suelo
  c_resplandor(R, 262, 104, 120 + bomba * 10, hex('#f8a040'), 0.16 * aviva + Math.sin(t * 13) * 0.02, 0.9);
  // el agua de la tina, con el fuego reflejado y las ondas
  for (let x = 191; x <= 213; x++) { const u = (x - 202) / 12, e = Math.sqrt(Math.max(0, 1 - u * u)) * 2; for (let y = Math.round(134 - e) + 1; y <= Math.round(134 + e) - 1; y++) { const r = Math.sin(x * 1.3 + t * 3 + y * 2) > 0.85 && Math.abs(u) < 0.6; pset(x, y, r ? hex('#f8a040') : y < 133 ? hex('#4a5a7a') : Math.abs(u) > 0.7 ? hex('#2a3a5a') : hex('#1e2a40')); } }
  // el farol de la cadena: la llama que tiembla y su luz en el muro
  { const f = Math.sin(t * 12) > 0 ? 1 : 0, s = Math.round(Math.sin(t * 3.1)); c_resplandor(R, 124, 39, 16, hex('#ffc060'), 0.3 + f * 0.05, 1);
    rect(122, 37, 126, 42, hex('#f8a040')); rect(123, 38 - f, 125, 41, hex('#ffd060')); pset(124 + s, 37 - f, hex('#fff4c0')); pset(124, 40, hex('#fff8e0')); rect(120, 39, 128, 39, hex('#3a2418')); }
  // el gato que dormita en el poyo caliente del horno: respira y mueve la punta de la cola
  { const x = 232, y = 110, r = Math.sin(t * 1.4) > 0 ? 1 : 0, c = hex('#5a4a44'), cS = hex('#2e2428'), cl = hex('#8a7466');
    rect(x - 5, y - 3 - r, x + 4, y, cS); rect(x - 4, y - 4 - r, x + 3, y - 1, c); rect(x - 3, y - 4 - r, x + 2, y - 4 - r, cl);
    rect(x + 3, y - 4, x + 7, y, cS); rect(x + 4, y - 4, x + 6, y - 1, c); pset(x + 4, y - 5, cS); pset(x + 6, y - 5, cS); pset(x + 5, y - 2, hex('#1a1214'));
    const cola = Math.sin(t * 0.9) > 0.5 ? -1 : 0; R.linea(x - 5, y - 1, x - 9, y + cola, cS); pset(x - 9, y - 1 + cola, c); c_tine(R, x + 7, y - 2, hex('#f8a040'), 0.4); }
  // el charco junto a la tina, con el fuego reflejado que tiembla
  for (let y = 154; y < 160; y++) for (let x = 178; x < 226; x++) { const u = Math.hypot((x - 202) / 24, (y - 157) / 3); if (u > 1) continue; const on = Math.sin(x * 0.7 + t * 4 + y * 3) > 0.6 && Math.abs(x - 212) < 12;
    pset(x, y, u > 0.85 ? hex('#1a1214') : on ? hex('#f8a040') : (x + y) & 1 ? hex('#2a2a3a') : hex('#1e2030')); }
  // LA MÁSCARA en el yunque, su luz y su vapor
  let mascara = null;
  if (!sin) { c_resplandor(R, 163, 134, 24, hex('#f86a2a'), calor * 0.5, 0.8); c_mascara(R, 163, 129, calor, 1, t); mascara = { x: 163, y: 129, calor };
    if (calor > 0.05 && calor < 0.9) c_vapor(R, t, 163, 123, 10, Math.min(1, (0.9 - calor) * 2) * (calor * 2)); }
  return { suelo: 150, libre: [30, 220], yunque: { x: 163, y: 136, cara: [146, 136, 181, 141], pico: [133, 137] }, mascara, horno: [222, 30, 312, 150], boca: [240, 96, 288, 112], mesa: [28, 124, 128, 146], tina: [189, 131, 215, 152], ventana: [56, 20, 100, 62] };
}
function c_forjaDelante(R, t, o) {
  const { rect, poligono, linea, disco } = R, fuego = c_lim(o.fuego ?? 1);
  // el cubo de carbón con el mazo apoyado, en la esquina de abajo a la izquierda
  poligono([[2, 180], [4, 160], [28, 160], [30, 180]], hex('#120c14')); poligono([[4, 179], [6, 162], [26, 162], [28, 179]], hex('#4a4c5a')); rect(6, 162, 26, 163, hex('#8a8e9e'));
  for (const y of [168, 175]) rect(5, y, 28, y, hex('#2a2a34')); for (let k = 0; k < 9; k++) disco(9 + (k % 5) * 4, 160 - Math.floor(k / 5) * 2, 2, k & 1 ? hex('#1a1418') : hex('#2e282c'));
  linea(30, 178, 42, 146, hex('#120c14')); linea(31, 178, 43, 146, hex('#a8743c')); rect(38, 141, 48, 147, hex('#120c14')); rect(39, 142, 47, 146, hex('#5a5e6e')); rect(39, 142, 47, 142, hex('#8a8e9e'));
  c_tine(R, 46, 144, hex('#f8a040'), 0.4);
  // pavesas que suben delante
  for (let i = 0; i < 6; i++) { const u = ((t * 0.18 + i / 6) % 1), x = Math.round(200 + h(i, 1, 94) * 110 + Math.sin(t * 2 + i) * 6), y = Math.round(170 - u * 150); if (u < 0.9) R.pset(x, y, u < 0.5 ? hex('#ffd060') : hex('#c83a1a')); }
  if (fuego > 0) c_chispas(R, t + 3, 264, 100, 4, 0.6, 1.2);
  return {};
}

// LA FORJA DE CERCA: el yunque grande y la máscara
function c_forjaCercaFija(R) {
  const B = R.buf, { rect, pset, linea, poligono, disco } = R;
  // el muro desenfocado: bloques grandes y blandos, con el fuego a la derecha
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 26), q = h(Math.floor((x + fila * 20) / 44), fila, 95), jy = (y % 26) < 2, jx = ((x + fila * 20) % 44) < 2;
    let c = q < 0.5 ? hex('#3a2e2a') : hex('#46382e'); if (jy || jx) c = hex('#221a1a');
    const dF = Math.hypot(x - 330, (y - 70) * 1.1), lF = c_lim(1 - dF / 260); c = c_mix(c, hex('#0c0810'), c_lim(0.5 - lF * 0.6)); c = c_mix(c, hex('#f88a3a'), lF * lF * 0.7 * (0.8 + c_umbral(x, y) * 0.4)); B[y * 320 + x] = c; }
  // el fuego desenfocado del horno, a la derecha
  for (const [x, y, r, c] of [[318, 70, 26, hex('#c83a1a')], [312, 76, 18, hex('#f88a2a')], [316, 80, 10, hex('#ffd060')]]) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d <= 1 && (d < 0.75 || c_umbral(x + i, y + j) < (1 - d) * 3)) pset(x + i, y + j, c); }
  // herramientas colgadas, desenfocadas (siluetas blandas: un martillo, unas tenazas, un aro) y una cadena que cuelga
  const blando = (x0, y0, x1, y1, c) => { for (let y = y0 - 1; y <= y1 + 1; y++) for (let x = x0 - 1; x <= x1 + 1; x++) { const fuera = x < x0 || x > x1 || y < y0 || y > y1; if (!fuera || c_umbral(x, y) < 0.5) c_tine(R, x, y, c, fuera ? 0.4 : 0.75); } };
  blando(36, 38, 40, 80, hex('#1a1214')); blando(26, 30, 50, 39, hex('#1a1214')); blando(27, 31, 49, 32, hex('#6a5a50'));
  for (let k = 0; k < 40; k++) { blando(76 + Math.round(k * 0.15), 18 + k, 78 + Math.round(k * 0.15), 18 + k, hex('#1a1214')); blando(92 - Math.round(k * 0.15), 18 + k, 94 - Math.round(k * 0.15), 18 + k, hex('#1a1214')); }
  for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; blando(Math.round(130 + Math.cos(a) * 12), Math.round(40 + Math.sin(a) * 12), Math.round(131 + Math.cos(a) * 12), Math.round(41 + Math.sin(a) * 12), hex('#2a1e1c')); }
  for (let y = 0; y < 76; y += 6) { blando(206, y, 210, y + 3, hex('#1a1214')); c_tine(R, 207, y + 1, hex('#f8a040'), 0.5); }
  // EL YUNQUE: el pico a la izquierda, la cara de golpeo pulida con arañazos y el costado en sombra
  poligono([[0, 118], [0, 104], [60, 112], [60, 124]], hex('#120c14')); poligono([[0, 116], [0, 106], [60, 113], [60, 122]], hex('#4a4c5a')); poligono([[0, 106], [60, 113], [60, 114], [0, 108]], hex('#c8ccd8'));
  rect(58, 110, 319, 180, hex('#120c14'));
  for (let y = 111; y < 180; y++) for (let x = 59; x < 320; x++) { let c;
    if (y < 122) { const v = (y - 111) / 11; c = v < 0.18 ? hex('#e4e8f0') : v < 0.45 ? hex('#a8acbc') : hex('#7a7e8e'); if (h(x >> 2, y, 96) < 0.06 || ((x + y * 3) % 29 === 0 && v > 0.2)) c = hex('#5a5e6e'); if (Math.abs(x - 140 - (y - 111) * 2) < 1 && v > 0.2) c = hex('#c8ccd8'); }
    else if (y === 122) c = hex('#2a2a34');
    else if (y < 128) { const v = (y - 123) / 5; c = v < 0.25 ? hex('#6e7282') : c_umbral(x, y) < v ? hex('#2a2c38') : hex('#4a4c5a'); }   // el canto de la cara
    else if (x < 104 + (y - 128) * 0.35) { c = y < 134 ? hex('#0e0a10') : (h(x >> 1, y >> 1, 99) < 0.12 ? hex('#2a2024') : hex('#1a1416')); }   // debajo del voladizo: el suelo en sombra
    else { const v = (y - 128) / 52, xl = 104 + (y - 128) * 0.35, marca = h(x >> 2, y >> 2, 97) < 0.12 && ((x & 3) + (y & 3)) % 3 === 0;
      c = x < xl + 2 ? hex('#5a5e6e') : c_umbral(x, y) < 0.35 - v * 0.3 ? hex('#4e5262') : v > 0.6 && c_umbral(x, y) < 0.3 ? hex('#22242e') : hex('#3a3c48'); if (marca) c = hex('#2a2c38'); if (y < 131) c = hex('#1a1820'); if (x > 304) c = hex('#2a2c38'); }
    c = c_mix(c, hex('#f88a3a'), c_lim((x - 160) / 300) * 0.25); B[y * 320 + x] = c; }
  rect(262, 112, 272, 118, hex('#120c14')); rect(263, 113, 271, 117, hex('#1c1a24'));   // el agujero cuadrado
  // el martillo apoyado a la derecha
  poligono([[238, 114], [248, 100], [312, 92], [312, 98], [250, 106]], hex('#120c14')); poligono([[240, 113], [249, 102], [312, 94], [312, 96], [250, 104]], hex('#a8743c'));
  rect(222, 96, 250, 116, hex('#120c14')); rect(223, 97, 249, 115, hex('#5a5e6e')); rect(223, 97, 249, 99, hex('#c8ccd8')); rect(223, 100, 224, 115, hex('#8a8e9e')); rect(246, 100, 249, 115, hex('#3a3c48'));
  c_forjaCercaDetalle(R);
  return {};
}
function c_forjaCerca(R, t, o) {
  c_fijo(R, 'forjaCerca', () => c_forjaCercaFija(R));
  const calor = c_lim(o.mascara ?? 1), cx = 160, cy = 94;
  // las brasas que flotan desenfocadas (bokeh)
  for (let i = 0; i < 9; i++) { const u = ((t * 0.08 + i / 9) % 1), x = Math.round(180 + h(i, 1, 98) * 140 + Math.sin(t + i) * 8), y = Math.round(110 - u * 120), r = 2 + Math.floor(h(i, 2, 98) * 3);
    for (let j = -r; j <= r; j++) for (let k = -r; k <= r; k++) { const d = Math.hypot(k, j) / r; if (d <= 1 && (d < 0.7 || ((x + k + y + j) & 1) === 0)) c_tine(R, x + k, y + j, hex('#ffb050'), 0.45 * (1 - u)); } }
  // el humo de la forja que cruza despacio el muro de arriba (dos bancos tramados a distinta velocidad)
  for (const [v, y0, k] of [[5, 22, 0], [9, 46, 1]]) { const x0 = ((t * v + k * 170) % 460) - 90;
    for (let y = y0 - 8; y <= y0 + 8; y++) for (let x = Math.max(0, Math.round(x0 - 60)); x <= Math.min(260, Math.round(x0 + 60)); x++) { const g = 1 - Math.hypot((x - x0) / 60, (y - y0) / 8) - c_ruido1(x / 9 + t * 0.3, y + k) * 0.35; if (g > 0 && g * 0.6 > c_umbral(x, y)) c_tine(R, x, y, hex('#6a5450'), 0.3); } }
  // el candil de la repisa, que tiembla
  { const f = 0.7 + Math.sin(t * 13) * 0.15 + Math.sin(t * 7.3) * 0.15; c_resplandor(R, 139, 53, 12, hex('#ffb050'), 0.35 * f, 1); for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (i * i + j * j <= 4.5) c_tine(R, 139 + i, 53 + j, hex('#ffe0a0'), (1 - Math.hypot(i, j) / 3) * f); }
  // el resplandor de la máscara sobre el yunque y la máscara; su reflejo tiembla en el costado pulido del yunque
  c_resplandor(R, cx, 112, 70, hex('#f86a2a'), calor * 0.55, 0.45); c_resplandor(R, cx, cy, 44, hex('#f8a040'), calor * 0.35, 1.1);
  if (calor > 0.05) for (let y = 130; y < 176; y++) { const w = 16 + (y - 130) * 0.3, sx = Math.round(Math.sin(t * 2 + y * 0.4) * 1.5); for (let x = Math.round(cx - w); x <= cx + w; x++) { const g = (1 - Math.abs(x - cx) / w) * (1 - (y - 130) / 50); if (g * calor * 1.3 > c_umbral(x + sx, y) + 0.1) c_tine(R, x + sx, y, (y + Math.floor(t * 3)) % 4 ? hex('#c8502a') : hex('#f8a040'), 0.5); } }
  // gotas de agua en la cara que chisporrotean y se evaporan con el calor
  for (let k = 0; k < 5; k++) { const per = 2.2 + k * 0.4, u = ((t + k * 0.9) % per) / per, x = 196 + k * 9 - (k > 2 ? 4 : 0), y = 116 + (k % 3); if (u > 0.85 * (1 - calor * 0.5)) continue;
    R.pset(x, y, hex('#e8f0ff')); R.pset(x + 1, y, hex('#8a9ab8')); if (calor > 0.3 && u > 0.5) { R.pset(x, y - 2 - Math.floor(u * 4), hex('#f0f0f0')); } }
  c_mascara(R, cx, cy, calor, 3, t);
  // las tenazas que la sujetan por el borde izquierdo: dos brazos largos de hierro desde la mano (x 40, y 99) y las bocas
  if (o.tenazas !== false) { const { linea, rect, pset } = R, c = hex('#1c1a24'), m = hex('#6e7282'), l = hex('#a8acbc');
    linea(40, 97, 136, 91, c); linea(40, 98, 136, 92, m); linea(40, 96, 136, 90, l);
    linea(40, 101, 136, 100, c); linea(40, 102, 136, 101, m); linea(40, 103, 136, 102, c);
    R.disco(118, 96, 2, c); pset(118, 95, l);
    rect(134, 86, 146, 91, c); rect(135, 87, 145, 89, m); rect(135, 87, 145, 87, l); rect(134, 99, 146, 104, c); rect(135, 100, 145, 102, m);
    for (const y of [90, 99]) c_tine(R, 141, y, hex('#f88a2a'), calor * 0.6); }
  // chispas mientras quema, y el vapor al enfriarse
  if (calor > 0.4) c_chispas(R, t, cx, cy + 10, Math.round(14 * calor), 1.2, 1);
  if (calor > 0.05 && calor < 0.95) c_vapor(R, t, cx, cy - 18, 30, Math.min(1, (0.95 - calor) * 2.5) * Math.min(1, calor * 3));
  return { suelo: 180, libre: [0, 0], mascara: { x: cx, y: cy, calor, ancho: 36, alto: 46 }, yunque: { cara: [0, 104, 319, 122] }, tenazas: { mano: [36, 99], boca: [140, 95] } };
}
function c_mascaraDelante(R, t, o) {
  const calor = c_lim(o.mascara ?? 1);
  if (calor > 0.05 && calor < 0.95) c_vapor(R, t + 1.3, 160, 70, 40, 0.5 * Math.min(1, (0.95 - calor) * 2.5));
  if (o.mano) brazo(R, -6, 132, 36, 99, o.manga ?? '#2e3a30', 1);
  return {};
}

// paletas del reino: roja (la de siempre) y verde (cuando Doom es el rey); mismas claves y mismos escalones
const d_pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Array.isArray(v) ? v.map(hex) : hex(v)]));

const D_ROJO = d_pal({
  cielo: ['#12040a', '#1c060e', '#2a0a12', '#3c0e16', '#561418', '#76201a', '#9a321c', '#c24c22'],
  humo: ['#1e080e', '#3a1218', '#5e2222', '#8e3a28'],
  lejos: ['#2a0c16', '#3a1220', '#4e1a26', '#6a2a2c'],
  roca: ['#1a080c', '#2e1016', '#46181c', '#642622', '#8a382a', '#b4523a'],
  lava: ['#7a1c10', '#c23a14', '#f06a1c', '#ffa83a', '#ffe08a', '#fff8d8'],
  piedra: ['#1e1620', '#2e2430', '#42343e', '#5a4852', '#76606a', '#9a8088'],
  hierro: ['#141014', '#262026', '#3c3238', '#5a4c50'],
  cadena: ['#1a1014', '#3e2c30', '#6e5450', '#a07a68'],
  luz: ['#a84a1c', '#e8862c', '#ffc458', '#fff0b0'],
  obsid: ['#0e0408', '#1a080c', '#2a0e14', '#40161a'],
  tela: ['#3a0810', '#5a0e18', '#7e1a22', '#c8902c'],
});

const D_VERDE = d_pal({
  cielo: ['#020c06', '#04140a', '#061e10', '#0a2a16', '#0e3a1e', '#165028', '#226a34', '#3a9048'],
  humo: ['#06140a', '#0e2416', '#1a3c22', '#2e6a36'],
  lejos: ['#081c10', '#0e2816', '#16361e', '#24502c'],
  roca: ['#040e08', '#0a1a10', '#122818', '#1c3c22', '#2a5a30', '#40804a'],
  lava: ['#0e4a20', '#1a7a34', '#2ab04a', '#5ae070', '#a8ffb0', '#eaffe8'],
  piedra: ['#101a16', '#18261e', '#22362a', '#304a38', '#42644c', '#5a8064'],
  hierro: ['#0a100c', '#141e18', '#1e2e24', '#2e4436'],
  cadena: ['#0a140e', '#1e3024', '#3a5a40', '#5a8a5c'],
  luz: ['#1e7a3a', '#3ab85a', '#7ae890', '#d8ffd8'],
  obsid: ['#020804', '#061008', '#0a1a10', '#122818'],
  tela: ['#06200e', '#0c3418', '#164e24', '#c8b04c'],
});

// la luz de las almas y del fuego de los contratos (verde de liberación) y la mano de Mefisto (rojo)
const D_ALMA = ['#1e7a3a', '#5ae890', '#a8ffc8', '#eafff0'].map(hex), D_BLANCA = ['#5a6a9a', '#a8c0ff', '#e0eaff', '#ffffff'].map(hex);

const D_MANO = ['#5a0a18', '#a8162a', '#e8303a', '#ff7a5a', '#ffd8c0'].map(hex);

const D_PERG = ['#7a5a3a', '#a88458', '#d8bc8c', '#eedcb4', '#fbf0d4'].map(hex);

// mezcla dos colores (u = 0 el primero, 1 el segundo)
const d_mez = (a, b, u) => { const f = (s) => Math.round(((a >>> s) & 255) * (1 - u) + ((b >>> s) & 255) * u); return (0xff000000 | (f(16) << 16) | (f(8) << 8) | f(0)) >>> 0; };

// fondo fijo por lienzo: se pinta una vez en un búfer (con su máscara de cielo si dibuja() la devuelve) y se reutiliza
const d_CACHE = new WeakMap();

function d_fondo(R, clave, dibuja) {
  let m = d_CACHE.get(R); if (!m) d_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); const extra = dibuja(b) || {}; R.usar(prev); m[clave] = { b, ...extra }; }
  return m[clave];
}

// ¿este píxel ya es verde? la sala cambia desde el trono hacia fuera, con borde tramado e irregular (u 0–1)
const d_esVerde = (R, x, y, u) => u <= 0 ? false : u >= 1 ? true : (u * 1.35 - Math.hypot(x - 160, (y - 95) * 1.3) / 250 + (h(x >> 3, y >> 3, 9) - 0.5) * 0.12) * 5 > R.b4(x, y);

// el selector de color de la sala: K(clave, escalón, x, y) da el rojo o el verde según d_esVerde
const d_K = (R, u) => u <= 0 ? (n, i) => D_ROJO[n][i] : u >= 1 ? (n, i) => D_VERDE[n][i] : (n, i, x, y) => (d_esVerde(R, x, y, u) ? D_VERDE : D_ROJO)[n][i];

// textura de roca: estratos ondulados, vetas y motas, en la rampa P.roca (b = brillo base)
function d_texRoca(R, P, x, y, b = 1.6) {
  const n = R.vnoise(x * 0.16, y * 0.07), estr = (y + Math.floor(R.vnoise(x * 0.05, 2.3) * 7)) % 9 === 0 ? -0.9 : 0;
  return R.tone(P.roca, b + n * 1.2 - 0.4 + estr + (h(x >> 1, y, 5) > 0.92 ? -0.8 : 0) + (h(x, y >> 1, 6) > 0.96 ? 0.8 : 0), x, y);
}

// filo de luz en el lado iluminado de un polígono (lado 1: la luz viene de la derecha) y contorno oscuro en el otro
function d_filo(R, pts, lado, luz, sombra) {
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; for (const [x, y] of pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  for (let y = Math.max(0, Math.ceil(y0)); y <= Math.min(179, y1); y++) for (let x = Math.max(0, Math.floor(x0)); x <= Math.min(319, x1); x++) {
    if (!R.dentro(pts, x + 0.5, y + 0.5)) continue;
    if (!R.dentro(pts, x + 0.5 + lado, y + 0.5) || !R.dentro(pts, x + 0.5, y - 0.5)) R.pset(x, y, luz);
    else if (!R.dentro(pts, x + 0.5 - lado, y + 0.5)) R.pset(x, y, sombra);
  }
}

// una roca o un risco: textura de roca y filos (lado de la luz, brillo base b)
function d_roca(R, P, pts, lado, b = 1.6) { R.poligono(pts, (x, y) => d_texRoca(R, P, x, y, b)); d_filo(R, pts, lado, P.roca[4], P.roca[0]); }

// cadena de eslabones entre dos puntos con su comba (que se mece con t); colores de K('cadena')
function d_cadena(R, x0, y0, x1, y1, comba, t, fase, K) {
  const L = Math.hypot(x1 - x0, y1 - y0), n = Math.max(4, Math.round(L / 3)), sw = Math.sin(t * 1.1 + fase) * 1.5;
  for (let i = 0; i <= n; i++) {
    const u = i / n, x = x0 + (x1 - x0) * u + sw * Math.sin(u * Math.PI) * 0.6, y = y0 + (y1 - y0) * u + (comba + sw) * Math.sin(u * Math.PI);
    const X = Math.round(x), Y = Math.round(y);
    if (i % 2) { R.pset(X, Y, K('cadena', 2, X, Y)); R.pset(X, Y + 1, K('cadena', 0, X, Y)); }
    else { R.pset(X - 1, Y, K('cadena', 1, X, Y)); R.pset(X + 1, Y, K('cadena', 1, X, Y)); R.pset(X, Y - 1, K('cadena', 3, X, Y)); R.pset(X, Y + 1, K('cadena', 0, X, Y)); }
  }
}

// cadena que cuelga recta de (x, y0) a y1, con un leve vaivén
function d_cadenaColgada(R, x, y0, y1, t, fase, K) {
  for (let y = y0; y <= y1; y++) { const X = Math.round(x + Math.sin(t * 0.9 + fase) * (y - y0) / (y1 - y0 + 1) * 1.5), e = (y - y0) % 4;
    if (e === 0 || e === 2) R.pset(X, y, K('cadena', e ? 1 : 3, X, y)); else { R.pset(X - 1, y, K('cadena', 2, X, y)); R.pset(X + 1, y, K('cadena', 1, X, y)); } }
}

// ceniza gris y brasas que suben con vaivén por [x0, x1] × [y0, y1]; grande: de primer término (2 px); verdes: chispas
function d_ceniza(R, t, n, x0, x1, y0, y1, k, grande, K, verdes) {
  const H = y1 - y0;
  for (let i = 0; i < n; i++) {
    const v = 6 + h(i, k) * 14, fy = ((h(i, k, 2) * H - t * v) % H + H) % H, y = Math.round(y0 + fy), x = Math.round(x0 + h(i, k, 3) * (x1 - x0) + Math.sin(t * 1.3 + i) * 4);
    const brasa = verdes || h(i, k, 4) > 0.55, apaga = fy / H;
    const c = verdes ? (apaga < 0.4 ? D_ALMA[1] : D_ALMA[3]) : brasa ? (apaga < 0.35 ? K('lava', 2, x, y) : K('lava', 4, x, y)) : K('humo', 3, x, y);
    R.pset(x, y, c); if (grande) { R.pset(x + 1, y, c); if (brasa) R.pset(x, y + 1, verdes ? D_ALMA[0] : K('lava', 1, x, y)); }
  }
}

// un murciélago lejano (silueta de 7 px que aletea), dando vueltas
function d_murcielago(R, x, y, t, c) {
  const f = Math.floor(t * 8) % 2, al = f ? [[-3, -1], [-2, -1], [2, -1], [3, -1]] : [[-3, 1], [-2, 0], [2, 0], [3, 1]];
  for (const [i, j] of [[-1, 0], [0, 0], [1, 0], [0, 1], ...al]) R.pset(Math.round(x) + i, Math.round(y) + j, c);
}

// nube de humo de tres tonos (sombra abajo, cuerpo, luz de brasa por debajo), solo sobre el cielo (máscara m)
function d_humo(R, cx, cy, w, P, m) {
  const B = [[0, 0, 0.32], [-0.32, 0.06, 0.22], [0.3, 0.05, 0.24], [-0.1, -0.12, 0.22], [0.14, -0.08, 0.2], [0.48, 0.1, 0.14], [-0.5, 0.1, 0.13]];
  const pon = (x, y, c) => { if (x >= 0 && x < 320 && y >= 0 && y < 180 && m[y * 320 + x]) R.pset(x, y, c); };
  const disco = (x0, y0, r, c) => { for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r + r) pon(x0 + i, y0 + j, c); };
  for (const [dx, dy, f] of B) disco(Math.round(cx + dx * w), Math.round(cy + dy * w), Math.max(1, Math.round(f * w)), P.humo[0]);
  for (const [dx, dy, f] of B) disco(Math.round(cx + dx * w), Math.round(cy + dy * w - 1), Math.max(1, Math.round(f * w * 0.92)), P.humo[1]);
  for (const [dx, dy, f] of B) if (dy >= 0) disco(Math.round(cx + dx * w), Math.round(cy + dy * w + f * w * 0.5), Math.max(1, Math.round(f * w * 0.45)), P.humo[2]);
  for (const [dx, dy, f] of B) if (dy > 0.04) for (let i = -Math.round(f * w * 0.5); i <= Math.round(f * w * 0.5); i += 2) pon(Math.round(cx + dx * w + i), Math.round(cy + dy * w + f * w * 0.95), P.humo[3]);
}

// llama pequeña (antorcha o brasero) en (x, y) = su base, alto a; K para el color (rojo o verde)
function d_llama(R, x, y, a, t, k, K) {
  for (let j = 0; j < a; j++) { const u = j / a, w = Math.round((1 - u) * (a * 0.34) + Math.sin(t * 11 + j * 0.9 + k) * 0.8), dx = Math.round(Math.sin(t * 7 + j * 0.5 + k) * u * 1.6);
    for (let i = -w; i <= w; i++) { const c = Math.abs(i) < w * 0.4 && u < 0.6 ? K('lava', u < 0.3 ? 5 : 4, x, y) : u < 0.45 ? K('lava', 3, x, y) : K('lava', 2, x, y); if (u > 0.7 && (i + j + Math.floor(t * 10)) % 2) continue; R.pset(x + i + dx, y - j, c); } }
}

// brasero de pie (trípode de hierro, cuenco con llama y halo) con las patas hasta y = pie; x es el centro, y el cuenco
function d_brasero(R, t, x, y, K, k, pie = 180) {
  const g = (dx) => K('hierro', dx, x, y), yp = Math.round(y + (pie - y) * 0.6);
  for (let j = y + 4; j <= pie; j++) { R.pset(x, j, g(2)); R.pset(x + 1, j, g(1)); }
  R.linea(x, yp, x - 8, pie, g(1)); R.linea(x + 1, yp, x + 9, pie, g(1)); R.linea(x - 5, Math.round((yp + pie) / 2), x + 6, Math.round((yp + pie) / 2), g(2));
  for (let j = 0; j < 6; j++) { const w = 9 - j; for (let i = -w; i <= w + 1; i++) R.pset(x + i, y + j, i < -w + 2 ? g(3) : j === 0 ? g(3) : g(j < 3 ? 2 : 1)); }
  for (let i = -8; i <= 9; i += 3) R.pset(x + i, y + 2, K('cadena', 3, x, y));
  for (let j = -2; j < 18; j++) for (let i = -14; i <= 14; i++) { const g2 = 1 - Math.hypot(i, (j + 6) * 1.3) / 15; if (g2 > 0 && g2 * 1.1 > R.b4(x + i, y - j) + 0.35) { const X = x + i, Y = y - j - 2; R.pset(X, Y, d_mez(R.pget(X, Y), K('lava', 3, X, Y), 0.35)); } }
  d_llama(R, x, y, 14, t, k, K);
}

// la mano de luz de Mefisto: palma abierta y dedos hacia arriba, de luz roja con halo (f 0–1 su intensidad); libre(x, y)
// dice dónde se puede pintar (lo que tapa el trono queda detrás)
function d_manoLuz(R, cx, cy, f, t, libre = () => true) {
  if (f <= 0) return;
  const sw = (i) => Math.sin(t * 1.4 + i * 1.7) * 1.2;
  const S = [[0, -2, 0, 9, 13], [-9, -11, -12 + sw(0), -35, 4.2], [-3, -13, -3 + sw(1), -42, 4.5], [4, -12, 6 + sw(2), -38, 4.3], [10, -9, 15 + sw(3), -29, 3.6], [-12, 2, -25 + sw(4), -11, 4.2], [0, 10, 0, 34, 9]];
  const sd = (x, y) => { let d = 1e9; for (const [ax, ay, bx, by, r] of S) { const vx = bx - ax, vy = by - ay, u = Math.max(0, Math.min(1, ((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy))); d = Math.min(d, Math.hypot(x - ax - vx * u, y - ay - vy * u) - r); } return d; };
  const lat = 0.85 + 0.15 * Math.sin(t * 2.2);
  for (let y = cy - 52; y <= cy + 46; y++) for (let x = cx - 40; x <= cx + 30; x++) {
    if (y < 15 || y > 179 || !libre(x, y)) continue;
    const d = sd(x - cx + 0.5, y - cy + 0.5); if (d > 8) continue;
    const fondo = y - cy > 26 ? Math.max(0, 1 - (y - cy - 26) / 18) : 1;   // la muñeca se pierde hacia abajo
    if (d < 0) {
      const raya = (d > -2.2 && d < -1.2) || (h(x >> 1, (y + Math.floor(t * 9)) >> 1, 3) > 0.9);
      const c = d < -5 ? (raya ? D_MANO[4] : D_MANO[3]) : d < -1.6 ? (raya ? D_MANO[3] : D_MANO[2]) : D_MANO[1];
      R.pset(x, y, d_mez(R.pget(x, y), c, f * fondo * (d < -5 ? lat * 0.9 : 0.95)));
    } else if (d < 1) R.pset(x, y, d_mez(R.pget(x, y), D_MANO[1], f * fondo));
    else { const g = 1 - (d - 1) / 7; if (g * f * fondo > R.b4(x, y) * 0.9) R.pset(x, y, d_mez(R.pget(x, y), D_MANO[1], 0.45 * g)); }
  }
}

// un alma de luz con forma de mujer (cabeza, melena, vestido que se abre y una estela; sin rasgos), centro de la
// cabeza en (cx, cy), f 0–1 su intensidad, cols la rampa (D_BLANCA o D_ALMA)
function d_almaMujer(R, cx, cy, f, t, cols, sc = 1.35) {
  if (f <= 0) return;
  const ond = (k) => Math.sin(t * 3 + k) * 1.2;
  const S = [[0, 0, 0, 0, 3.2], [0.6, 0, 1.4, 5, 2], [0, 4, 0, 5, 1.1], [-2, 6.5, 2, 6.5, 2], [0, 6, 0, 11, 2.4], [ond(0) * 0.3, 11, ond(0) * 0.3, 14, 3.2], [ond(1) * 0.3, 14, ond(1) * 0.6, 18, 4.6], [ond(2) * 0.6, 18, ond(2), 22, 6.2],
    [-3.4, 7, -7 + ond(3) * 0.5, 14, 1.1], [3.4, 7, 7 + ond(4) * 0.5, 14, 1.1]];
  const sd = (x, y) => { let d = 1e9; for (const [ax, ay, bx, by, r] of S) { const vx = bx - ax, vy = by - ay, l = vx * vx + vy * vy || 1, u = Math.max(0, Math.min(1, ((x - ax) * vx + (y - ay) * vy) / l)); d = Math.min(d, Math.hypot(x - ax - vx * u, y - ay - vy * u) - r); } return d; };
  for (let y = Math.round(cy) - 11; y <= Math.round(cy) + 56; y++) for (let x = Math.round(cx) - 17; x <= Math.round(cx) + 17; x++) {
    if (y < 0 || y > 179) continue;
    const ly = (y - cy + 0.5) / sc, d = sd((x - cx + 0.5) / sc, ly) * sc;
    if (d < 0) R.pset(x, y, d_mez(R.pget(x, y), d < -1.4 ? cols[3] : cols[2], f));
    else if (d < 0.9) R.pset(x, y, d_mez(R.pget(x, y), cols[1], f * 0.8));
    else if (d < 5) { const g = 1 - d / 5; if (g * f > R.b4(x, y) * 0.9 + 0.25) R.pset(x, y, d_mez(R.pget(x, y), cols[1], 0.4 * g)); }
    else if (ly > 22 && Math.abs((x - cx) / sc - ond(2)) < 3 - (ly - 22) / 8 && (1 - (ly - 22) / 22) * f > R.b4(x, y) + 0.15) R.pset(x, y, d_mez(R.pget(x, y), cols[1], 0.6));   // la estela
  }
  for (let i = 0; i < 10; i++) { const ph = (t * 0.7 + h(i, 7)) % 1, x = Math.round(cx + (h(i, 8) - 0.5) * 22 + Math.sin(t * 2 + i) * 2), y = Math.round(cy + 32 * sc / 1.35 + ph * 26);
    if ((1 - ph) * f > R.b4(x, y) + 0.2) R.pset(x, y, ph < 0.4 ? cols[3] : cols[2]); }
}

// el alma que sube: a f 0–0,15 aparece en (x, y0), luego sube hasta y1; devuelve dónde está su cabeza
function d_almaSube(R, t, f, x, y0, y1, cols) {
  if (!(f > 0)) return null;
  const a = Math.min(1, f / 0.15), s = f <= 0.15 ? 0 : (f - 0.15) / 0.85, e = s * s * (3 - 2 * s), y = y0 + (y1 - y0) * e, xx = x + Math.sin(t * 1.2) * 2 * s;
  d_almaMujer(R, xx, y, a * (f > 0.92 ? (1 - f) / 0.08 : 1), t, cols);
  return [Math.round(xx), Math.round(y)];
}

// luces verdes que suben libres (n de ellas): una bola con halo y una estela de chispas
function d_almas(R, t, n, x0, x1, y0, y1, k) {
  const H = y1 - y0;
  for (let i = 0; i < n; i++) {
    const v = 10 + h(i, k) * 14, fy = ((h(i, k, 2) * H - t * v) % H + H) % H, y = y0 + fy, x = x0 + h(i, k, 3) * (x1 - x0) + Math.sin(t * 1.6 + i * 2) * 3;
    const X = Math.round(x), Y = Math.round(y), a = Math.min(1, fy / 18, (H - fy) / 24);
    for (let j = -4; j <= 4; j++) for (let ii = -4; ii <= 4; ii++) { const g = 1 - Math.hypot(ii, j) / 4.5; if (g > 0 && g * a > R.b4(X + ii, Y + j) * 0.8 + 0.15) R.pset(X + ii, Y + j, d_mez(R.pget(X + ii, Y + j), D_ALMA[1], 0.5)); }
    if (a > 0.3) { R.disco(X + 0.5, Y + 0.5, 1.6, D_ALMA[2]); R.pset(X, Y, D_ALMA[3]); }
    for (let j = 1; j <= 5; j++) if ((1 - j / 6) * a > R.b4(X, Y + j * 2) + 0.2) R.pset(Math.round(X + Math.sin(t * 3 + j + i) * 1), Y + 2 + j * 2, j < 3 ? D_ALMA[2] : D_ALMA[1]);
  }
}

// un pergamino (contrato) de w × a centrado en (cx, cy): rollos arriba y abajo, renglones de trazos (sin letras), un
// garabato de firma y un sello de lacre. q 0–1,3: arde desde abajo en llamas verdes (q 1 ya no queda papel) y se
// deshace en chispas de luz que suben (hasta 1,3). Devuelve su rectángulo si aún queda papel.
function d_contrato(R, cx, cy, w, a, q, t, k) {
  const x0 = Math.round(cx - w / 2), x1 = x0 + w - 1, y0 = Math.round(cy - a / 2), y1 = y0 + a - 1;
  const yF = q <= 0 ? y1 + 1 : Math.round(y1 + 1 - (a + 2) * Math.min(1, q));
  const borde = (x) => Math.floor(h(x, k, 3) * 2 + Math.sin(x * 0.9 + t * 7 + k) * 0.9);
  const grande = a >= 24, rollo = grande ? 3 : 2;
  if (q < 1) {
    // sombra que el papel arroja (luz de la sala)
    for (let x = x0 + 2; x <= x1 + 2; x++) { const y = Math.min(yF - 1, y1) + 2; if (y > y0 + 4) R.pset(x, y, d_mez(R.pget(x, y), hex('#000000'), 0.35)); }
    for (let y = y0; y <= y1; y++) {
      for (let x = x0 - 1; x <= x1 + 1; x++) {
        if (y >= yF - borde(x)) continue;
        const enRollo = y < y0 + rollo || (q <= 0 && y > y1 - rollo);
        if (!enRollo && (x < x0 || x > x1)) continue;
        let c;
        if (enRollo) { const j = y < y0 + rollo ? y - y0 : y - (y1 - rollo + 1); c = j === 0 ? D_PERG[2] : j === rollo - 1 ? D_PERG[0] : D_PERG[3]; if (x === x0 - 1 || x === x1 + 1) c = D_PERG[1]; }
        else {
          const lx = x - x0, ly = y - y0 - rollo;
          c = lx === 0 ? D_PERG[4] : lx === w - 1 ? D_PERG[1] : h(x, y, k) > 0.86 ? D_PERG[2] : D_PERG[3];
          if (y === y0 + rollo) c = D_PERG[1];
          const renglon = grande ? (ly > 2 && ly % 3 === 0 && ly < a - rollo - 9) : (ly > 1 && ly % 2 === 0 && ly < a - rollo - 3);
          if (renglon && lx > 1 && lx < w - 2 && h(Math.floor((x + ly * 3) / (grande ? 4 : 3)), ly, k) > 0.25 && (x + ly) % (grande ? 4 : 3) !== 0) c = D_PERG[0];
          if (grande && ly === a - rollo - 6 && lx > 2 && lx < w * 0.55 && (Math.sin(lx * 1.3) > 0)) c = hex('#4a2a1a');
          if (grande && ly === a - rollo - 5 && lx > 2 && lx < w * 0.55 && (Math.sin(lx * 1.3) <= 0)) c = hex('#4a2a1a');
        }
        R.pset(x, y, c);
      }
    }
    // el sello de lacre
    const sx = x1 - (grande ? 5 : 2), sy = y1 - (grande ? 7 : 3);
    if (sy < yF - 2) { if (grande) { R.disco(sx + 0.5, sy + 0.5, 3, hex('#7a1420')); R.disco(sx + 0.5, sy + 0.5, 2.2, hex('#b0262e')); R.pset(sx - 1, sy - 1, hex('#e86a6a')); R.pset(sx, sy, hex('#7a1420')); }
      else { R.pset(sx, sy, hex('#b0262e')); R.pset(sx + 1, sy, hex('#7a1420')); } }
  }
  if (q > 0 && q < 1) {
    // el borde que arde (chamuscado y brasa) y las llamas verdes que suben de él
    for (let x = x0 - 1; x <= x1 + 1; x++) { const y = yF - borde(x); if (y < y0) continue; R.pset(x, y, hex('#2a1a10')); R.pset(x, y - 1, D_ALMA[3]);
      const fh = Math.round((grande ? 4 : 2) + h(x >> 1, k, 5) * (grande ? 6 : 3)) * (0.55 + 0.45 * Math.sin(t * 9 + x * 1.3 + k));
      for (let j = 1; j <= fh; j++) { const u = j / fh; if (u > 0.6 && (x + j + Math.floor(t * 12)) % 2) continue; R.pset(x + Math.round(Math.sin(t * 6 + j + x) * u), y - 1 - j, u < 0.3 ? D_ALMA[3] : u < 0.65 ? D_ALMA[2] : D_ALMA[1]); } }
  }
  if (q > 0 && q < 1.3) {
    // chispas de luz que suben de lo que ya ardió
    const n = grande ? 22 : 9, viva = q > 1 ? (1.3 - q) / 0.3 : Math.min(1, q * 4);
    for (let i = 0; i < n; i++) { const ph = (t * (0.5 + h(i, k, 6) * 0.4) + h(i, k, 7)) % 1, x = Math.round(x0 + h(i, k, 8) * w + Math.sin(t * 2 + i) * 3 * ph), y = Math.round(Math.min(yF, y1) + 2 - ph * (grande ? 40 : 18));
      if ((1 - ph) * viva > R.b4(x, y) + 0.1) R.pset(x, y, ph < 0.35 ? D_ALMA[3] : ph < 0.7 ? D_ALMA[2] : D_ALMA[1]); }
  }
  return q < 1 ? [x0, y0, x1, Math.min(y1, yF)] : null;
}

// cuánto ha ardido el contrato i de n cuando todos van por c (0–1): arden uno tras otro
const d_qContrato = (c, i, n) => c <= 0 ? 0 : Math.max(0, c * 1.75 - (i / Math.max(1, n - 1)) * 0.75) * 1.3;

// la puerta tallada: marco de dovelas (radio exterior rO, interior rI, centro del arco X, Yc, base yB), dos hojas de
// hierro con bandas, remaches y un anillo labrado alrededor de la cerradura (Ly); lado: de dónde viene la luz
function d_puerta(R, P, X, Yc, rO, rI, yB, Ly) {
  const dentroDe = (x, y, r) => y <= yB && (y >= Yc ? Math.abs(x - X) <= r : Math.hypot(x - X, y - Yc) <= r);
  const b1 = Yc + (yB - Yc) * 0.25, b2 = Yc + (yB - Yc) * 0.8, rA = rI * 0.5, rB = rI * 0.72;
  for (let y = Math.max(0, Yc - rO - 3); y <= yB; y++) for (let x = X - rO - 3; x <= X + rO + 3; x++) {
    if (dentroDe(x + 0.5, y + 0.5, rI)) {
      const lx = x + 0.5 - X, ax = Math.abs(lx), dl = Math.hypot(x + 0.5 - X, y + 0.5 - Ly);
      let v = 1.5 + R.vnoise(x * 0.3, y * 0.08) * 0.8 + Math.max(0, 1 - ax / 10) * 0.6, c = null;
      const g = Math.floor(ax) % 7; if (g === 0) v -= 1; else if (g === 1) v += 0.8;
      if (Math.abs(y - b1) < 2.5 || Math.abs(y - b2) < 2.5) { v = Math.abs(y - b1) < 1 || Math.abs(y - b2) < 1 ? 2.2 : 1.8; if ((Math.floor(ax) % 5 === 2) && (Math.abs(y - b1) < 0.6 || Math.abs(y - b2) < 0.6)) c = P.piedra[5]; }
      if (Math.abs(dl - rB) < 0.8) c = P.hierro[0]; else if (Math.abs(dl - rB - 1.2) < 0.6) c = P.hierro[3];
      if (Math.abs(dl - rA) < 0.8) c = P.hierro[0]; else if (Math.abs(dl - rA - 1.2) < 0.6) c = P.hierro[3];
      if (dl > rA + 2 && dl < rB - 1) { const an = Math.atan2(y - Ly, x - X), s = (an / (Math.PI / 6) + 12) % 1; if (s < 0.12) c = P.piedra[4]; else if (s < 0.25) c = P.hierro[0]; }
      if (!dentroDe(x + 0.5, y - 2.5, rI)) c = P.hierro[0];   // sombra bajo el arco
      if (ax < 1) c = P.hierro[0];
      R.pset(x, y, c ?? R.tone(P.hierro, v, x, y));
    } else if (dentroDe(x + 0.5, y + 0.5, rO)) {
      const d = y >= Yc ? Math.min(Math.abs(x + 0.5 - X) - rI, rO - Math.abs(x + 0.5 - X)) : Math.min(Math.hypot(x + 0.5 - X, y + 0.5 - Yc) - rI, rO - Math.hypot(x + 0.5 - X, y + 0.5 - Yc));
      const interior = y >= Yc ? Math.abs(x + 0.5 - X) - rI < 1.6 : Math.hypot(x + 0.5 - X, y + 0.5 - Yc) - rI < 1.6;
      let junta = false;
      if (y < Yc) { const an = Math.atan2(y + 0.5 - Yc, x + 0.5 - X) + Math.PI, s = an / (Math.PI / 9), f = s - Math.floor(s); junta = Math.min(f, 1 - f) * (rO * Math.PI / 9) < 0.7; }
      else { const k = Math.floor((y - Yc) / 9); junta = (y - Yc) % 9 === 0 || (Math.abs(Math.abs(x + 0.5 - X) - (rI + rO) / 2 - (k % 2 ? 2 : -2)) < 0.5); }
      const luz = (x < X ? 0.5 : -0.1) + (y > Yc + 30 ? 0.3 : 0);
      const c = interior ? P.piedra[0] : junta ? P.piedra[1] : d < 1 && y < Yc + 4 ? P.piedra[5] : R.tone(P.piedra, 2.4 + R.vnoise(x * 0.25, y * 0.25) * 1.1 - 0.5 + luz + (h(x, y, 4) > 0.93 ? -1 : 0), x, y);
      R.pset(x, y, c);
    } else if (dentroDe(x + 0.5, y + 0.5, rO + 2.5)) R.pset(x, y, P.roca[0]);
  }
  // la clave del arco con su símbolo tallado (un rombo con un punto)
  const ky = Math.round(Yc - (rO + rI) / 2);
  for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if (Math.abs(i) + Math.abs(j) === 3) { R.pset(X + i, ky + j, P.piedra[0]); R.pset(X + i, ky + j + 1, P.piedra[5]); }
  R.pset(X, ky, P.piedra[0]);
}

// escalones de piedra delante de la puerta: n peldaños desde y0 hasta yB, del ancho w0 al w1, centrados en X
function d_escalones(R, P, X, y0, yB, w0, w1, n) {
  const hh = (yB - y0 + 1) / n;
  for (let s = 0; s < n; s++) { const a = Math.round(y0 + s * hh), b = Math.round(y0 + (s + 1) * hh) - 1, w = Math.round(w0 + (w1 - w0) * s / Math.max(1, n - 1));
    for (let y = a; y <= b; y++) for (let x = X - w; x <= X + w; x++) R.pset(x, y, y === a ? P.piedra[5] : y === a + 1 ? P.piedra[4] : x === X - w || x === X + w ? P.piedra[1] : (x % 11 === 0 ? P.piedra[1] : R.tone(P.piedra, 2.6 + R.vnoise(x * 0.3, y) * 0.8 - (y - a) * 0.15 + Math.max(0, 1 - Math.abs(x - X) / 14) * 0.8, x, y))); }
}

// la cerradura de luz: un disco que late con el ojo de la llave, rayos que giran y un halo (f 0–1 abre más luz)
function d_cerradura(R, x, y, r, t, f, P) {
  const lat = 0.8 + 0.2 * Math.sin(t * 3.2);
  for (let j = -r * 2.4; j <= r * 2.4; j++) for (let i = -r * 2.4; i <= r * 2.4; i++) { const g = 1 - Math.hypot(i, j) / (r * 2.4); if (g > 0 && g * lat * (1 + f) > R.b4(x + i, y + j) + 0.45) R.pset(x + i, y + j, d_mez(R.pget(x + i, y + j), P.luz[2], 0.4)); }
  for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2 + t * 0.6; for (let s = r + 1; s <= r + 3 + (k % 2) * 2; s++) R.pset(Math.round(x + Math.cos(an) * s), Math.round(y + Math.sin(an) * s), k % 2 ? P.luz[1] : P.luz[2]); }
  R.disco(x + 0.5, y + 0.5, r, P.luz[1]); R.disco(x + 0.5, y + 0.5, r - 1, P.luz[2]); R.disco(x - 0.5, y - 0.5, r - 2.5, P.luz[3]);
  const kr = Math.max(1.5, r * 0.28); R.disco(x + 0.5, y - r * 0.2 + 0.5, kr, P.luz[0]); R.poligono([[x - kr * 0.6, y], [x + kr * 0.6 + 1, y], [x + kr + 1, y + r * 0.6], [x - kr, y + r * 0.6]], P.luz[0]);
}

// la rendija entre las hojas, que brilla y parpadea (más ancha con o.abierta)
function d_rendija(R, X, y0, y1, t, ab, P) {
  const w = Math.round(ab * 4);
  for (let y = y0; y <= y1; y++) { const fl = h(y >> 1, Math.floor(t * 8), 2); for (let i = -w; i <= w; i++) R.pset(X + i, y, Math.abs(i) === w && w > 0 ? P.luz[2] : fl > 0.5 ? P.luz[3] : P.luz[2]);
    if (fl > 0.75 || ab > 0.3) { R.pset(X - w - 1, y, P.luz[1]); R.pset(X + w + 1, y, P.luz[1]); } }
  if (ab > 0) for (let y = y1 + 1; y <= y1 + 14; y++) { const s = Math.round((y - y1) * (0.6 + ab)); for (let i = -w - s; i <= w + s; i++) if ((1 - (y - y1) / 15) * ab > R.b4(X + i, y) * 0.9) R.pset(X + i, y, d_mez(R.pget(X + i, y), P.luz[3], 0.45)); }
}

// el sendero de losas oscuras con juntas de luz: centro y anchura según x (se estrecha hacia la puerta)
const d_sendaY = (x) => 155 + (1 - x / 250) * 4 + 1.5 * Math.sin(x * 0.04), d_sendaW = (x) => 6.5 + (1 - x / 250) * 5;

function d_losaLuz(R, P, x, y, yc, w) {
  const fila = Math.floor((y - yc + 40) / 4), off = (fila & 1) * 3.5, junta = (y - yc + 40) % 4 === 0 || (x + off) % 7 < 1;
  const cerca = 1 - Math.abs(y - yc) / w, id = h(Math.floor((x + off) / 7), fila, 2);
  if (junta) return cerca > 0.3 ? (h(x >> 2, y, 3) > 0.5 ? P.luz[2] : P.luz[1]) : P.lava[1];
  const borde = (x + off) % 7 === 1 || (y - yc + 40) % 4 === 1;   // el canto de la losa, encendido por la luz de la junta
  return R.tone([P.roca[2], P.roca[3], P.lava[0], P.luz[0], P.luz[1]], 0.4 + cerca * 1.6 + id * 1.1 + (borde ? 0.9 : 0), x, y);
}

// los montes lejanos del camino: la cresta (y) en cada x
const d_cresta = (R, x) => Math.round(86 - 26 * R.vnoise(x * 0.035, 1.3) - 7 * R.vnoise(x * 0.12, 7));

// el río de luz: centro y media anchura en cada x
const d_rio = (R, x) => [103 + 2 * Math.sin(x * 0.045) + R.vnoise(x * 0.1, 5) * 1.5, 2.4 + R.vnoise(x * 0.07, 9) * 1.4];

// la llanura de roca con piedras sueltas y grietas de luz (devuelve los píxeles de las grietas, para que laten)
function d_llanura(R, P, y0, x0 = 0, x1 = 319) {
  for (let y = y0; y < 180; y++) for (let x = x0; x <= x1; x++) {
    const v = 1.3 + R.vnoise(x * 0.12, y * 0.3) * 1.0 - 0.5 + Math.max(0, 1 - (y - y0) / 14) * 1.3 - Math.max(0, (y - 150) / 30) * 0.9 + (h(x, y, 8) > 0.93 ? -0.7 : 0) + ((y * 3 + x) % 17 === 0 ? -0.5 : 0);
    R.pset(x, y, R.tone(P.roca, v, x, y));
  }
  for (let k = 0; k < 44; k++) { const x = Math.round(x0 + h(k, 31) * (x1 - x0)), y = Math.round(y0 + 3 + h(k, 32) * (176 - y0)), w = 1 + Math.round(h(k, 33) * 3 * (0.5 + (y - y0) / 60));
    for (let i = -w; i <= w; i++) { R.pset(x + i, y, P.roca[i < 0 ? 3 : 2]); R.pset(x + i, y + 1, P.roca[0]); } for (let i = 1 - w; i < w; i++) R.pset(x + i, y - 1, P.roca[4]); }
  const grietas = [];
  for (let k = 0; k < 9; k++) { let x = x0 + h(k, 41) * (x1 - x0), y = y0 + 6 + h(k, 42) * (170 - y0); const n = 10 + Math.round(h(k, 43) * 16), px = [];
    for (let i = 0; i < n; i++) { x += 1; y += (h(k, i, 44) - 0.5) * 1.4; const X = Math.round(x), Y = Math.round(y); if (X > x1) break; R.pset(X, Y - 1, P.roca[0]); R.pset(X, Y, P.lava[0]); R.pset(X, Y + 1, P.roca[1]); px.push([X, Y]); }
    grietas.push(px); }
  return grietas;
}

// el fondo fijo del camino (general): cielo, montes con dos cascadas de luz, el río, la llanura, las dos agujas, el risco
// con la puerta, los escalones y el sendero de losas de luz; devuelve la máscara del cielo (para el humo) y lo que late
function d_caminoFondo(R, P, b) {
  for (let y = 0; y < 122; y++) for (let x = 0; x < 320; x++) {
    const v = (y / 110) * 6 + (h(x >> 3, y >> 2, 3) - 0.5) * 0.5 + Math.max(0, 1 - Math.hypot(x - 120, (y - 102) * 2.6) / 170) * 1.6 - (x > 262 && y < 52 ? 0.7 : 0);
    R.pset(x, y, R.tone(P.cielo, v, x, y));
  }
  const snap = b.slice();
  // montes lejanos, con el filo encendido por el resplandor
  for (let x = 0; x < 320; x++) { const yA = d_cresta(R, x); for (let y = yA; y <= 106; y++) R.pset(x, y, y === yA ? P.lejos[3] : R.tone(P.lejos, 0.3 + (y - yA) / (106 - yA) * 2.6 + (h(x >> 1, y, 2) > 0.9 ? -0.7 : 0) + ((x + y * 2) % 23 === 0 ? 0.6 : 0), x, y)); }
  // dos cascadas de luz que bajan de los montes al río
  const caidas = [68, 156].map((cx) => { const y0 = d_cresta(R, cx) + 2; for (let y = y0; y <= 101; y++) for (let i = -2; i <= 2; i++) R.pset(cx + i + Math.round(Math.sin(y * 0.2) * 0.6), y, P.lava[Math.abs(i) === 2 ? 0 : i === 0 ? 3 : 2]); return [cx, y0, 101]; });
  // el río de luz
  const rio = [];
  for (let x = 0; x < 320; x++) { const [yc, hw] = d_rio(R, x); rio.push([yc, hw]); for (let y = Math.floor(yc - hw - 1); y <= Math.ceil(yc + hw + 1); y++) { const d = Math.abs(y - yc) / hw; R.pset(x, y, d > 1 ? P.lava[0] : R.tone(P.lava, 4.6 - d * 2.8, x, y)); } }
  const snapRio = b.slice();
  const grietas = d_llanura(R, P, 108);
  for (let x = 0; x < 320; x++) { const [yc, hw] = rio[x]; const yb = Math.ceil(yc + hw + 2); R.pset(x, yb, P.roca[4]); }   // la orilla encendida
  // las dos agujas de roca y el risco de la puerta
  d_roca(R, P, [[0, 38], [6, 34], [12, 42], [18, 52], [24, 70], [30, 96], [36, 124], [42, 151], [0, 151]], 1, 2.0);
  d_roca(R, P, [[104, 151], [110, 120], [116, 100], [122, 86], [128, 77], [134, 75], [140, 84], [146, 100], [150, 120], [156, 151]], 1, 2.0);
  d_roca(R, P, [[184, 153], [188, 104], [194, 70], [204, 46], [222, 26], [240, 18], [256, 17], [268, 24], [280, 46], [298, 54], [320, 48], [320, 153]], -1, 1.8);
  for (const [x0, y0, n] of [[196, 80, 40], [292, 70, 60], [214, 50, 18], [304, 62, 50]]) for (let j = 0; j < n; j++) { const x = x0 + Math.round(Math.sin(j * 0.3 + x0) * 1.5); R.pset(x, y0 + j, P.roca[0]); R.pset(x + 1, y0 + j, P.roca[3]); }
  // la puerta, los soportes de las antorchas y los escalones
  d_puerta(R, P, 245, 76, 43, 33, 140, 100);
  for (const x of [196, 294]) { R.rect(x - 1, 104, x + 1, 112, P.hierro[2]); R.pset(x - 1, 104, P.hierro[3]); R.rect(x - 2, 102, x + 2, 103, P.hierro[1]); }
  // el sendero de losas de luz, con su halo sobre la roca
  for (let x = 0; x <= 206; x++) { const yc = d_sendaY(x), w = d_sendaW(x);
    for (let y = Math.round(yc - w - 3); y <= Math.round(yc + w + 3); y++) { const d = Math.abs(y - yc); if (d <= w) R.pset(x, y, d_losaLuz(R, P, x, y, yc, w)); else { const g = 1 - (d - w) / 3.5; if (g > R.b4(x, y) * 0.8) R.pset(x, y, d_mez(R.pget(x, y), P.lava[2], 0.4 * g)); } } }
  d_escalones(R, P, 245, 140, 152, 40, 47, 3);
  const mask = new Uint8Array(320 * 180); for (let i = 0; i < 122 * 320; i++) mask[i] = b[i] === snap[i] ? 1 : 0;
  for (let x = 0; x < 320; x++) { const i = Math.round(rio[x][0]) * 320 + x; rio[x].push(b[i] === snapRio[i]); }   // ¿se ve el río aquí?
  return { mask, caidas, rio, grietas };
}

// el fondo fijo de la puerta de cerca: la pared del risco, un hueco con el paisaje, pilastras, puerta y escalones
function d_puertaFondo(R, P, b) {
  const HU = [[0, 28], [16, 22], [32, 30], [44, 52], [50, 84], [46, 112], [38, 130], [0, 134]];
  // la pared de roca, más oscura arriba (barra del tiempo y Atom tranquilos) y encendida cerca de la puerta
  for (let y = 0; y < 153; y++) for (let x = 0; x < 320; x++) R.pset(x, y, d_texRoca(R, P, x, y, 1.0 + Math.max(0, 1 - Math.hypot(x - 166, y - 100) / 150) * 1.4 - Math.max(0, (26 - y) / 26) * 0.9));
  // estalactitas oscuras sobre la puerta (fuera de la barra del tiempo)
  for (const [x, l] of [[184, 12], [196, 18], [206, 10], [232, 16], [246, 9], [262, 14]]) for (let j = 0; j < l; j++) { const w = Math.round((1 - j / l) * 2.5); for (let i = -w; i <= w; i++) R.pset(x + i, 14 + j, i === w ? P.roca[3] : P.roca[0]); }
  // el hueco: cielo, montes, una cascada y el río
  const enH = (x, y) => R.dentro(HU, x + 0.5, y + 0.5);
  const mask = new Uint8Array(320 * 180);
  for (let y = 18; y < 136; y++) for (let x = 0; x < 54; x++) {
    if (!enH(x, y)) { if (enH(x - 1, y) || enH(x, y - 1) || enH(x - 2, y)) R.pset(x, y, P.roca[4]); continue; }
    const cr = 92 - Math.round(14 * R.vnoise(x * 0.06, 3) + 4 * R.vnoise(x * 0.2, 1)), [yc, hw] = [116 + Math.sin(x * 0.1) * 1.5, 2.2];
    let c;
    if (y < cr) { c = R.tone(P.cielo, (y / 120) * 6.4 + (h(x >> 3, y >> 2, 3) - 0.5) * 0.5, x, y); mask[y * 320 + x] = 1; }
    else if (y < yc - hw - 1) c = y === cr ? P.lejos[3] : R.tone(P.lejos, 0.4 + (y - cr) / 20 * 2.4, x, y);
    else if (y <= yc + hw + 1) c = Math.abs(y - yc) > hw ? P.lava[0] : R.tone(P.lava, 4.4 - Math.abs(y - yc) / hw * 2.6, x, y);
    else c = R.tone(P.roca, 1.4 + R.vnoise(x * 0.2, y * 0.4) - (y - yc) * 0.04, x, y);
    R.pset(x, y, c);
  }
  for (let y = 0; y < 136; y++) for (let x = 0; x < 54; x++) if (enH(x, y) && !enH(x + 1, y)) R.pset(x, y, P.roca[0]);
  // dos pilastras talladas, con capitel y basa
  for (const cx of [74, 258]) {
    for (let y = 30; y <= 138; y++) for (let x = cx - 10; x <= cx + 10; x++) {
      const cap = y < 40 || y > 128, w = cap ? 10 : 8; if (Math.abs(x - cx) > w) continue;
      const lx = x - cx, ac = (lx + 10) % 4;
      let c = cap ? (y === 30 || y === 129 ? P.piedra[5] : y === 39 || y === 138 ? P.piedra[0] : R.tone(P.piedra, 2.8 + (cx < 166 ? lx : -lx) * 0.06, x, y)) : ac === 0 ? P.piedra[1] : ac === 1 ? P.piedra[4] : R.tone(P.piedra, 2.2 + (cx < 166 ? lx : -lx) * 0.07 + R.vnoise(x, y * 0.2) * 0.6, x, y);
      if (Math.abs(lx) === w) c = P.piedra[0];
      R.pset(x, y, c);
    }
    for (let i = -7; i <= 7; i += 7) { R.pset(cx + i, 34, P.piedra[0]); R.pset(cx + i, 35, P.piedra[5]); }
  }
  d_puerta(R, P, 166, 86, 62, 48, 138, 96);
  d_escalones(R, P, 166, 138, 152, 64, 76, 3);
  // el suelo: losas de luz delante de los escalones y roca a los lados
  d_llanura(R, P, 153, 0, 319);
  for (let x = 0; x < 320; x++) { const w = 7 + Math.max(0, (140 - x) * 0.04), yc = 168 - Math.min(x, 166) * 0.06 + Math.max(0, x - 166) * 0.06; if (x > 236) continue;
    for (let y = 153; y < 180; y++) { const d = Math.abs(y - yc); if (d <= w) R.pset(x, y, d_losaLuz(R, P, x, y, yc, w)); else if (d < w + 3) { const g = 1 - (d - w) / 3; if (g > R.b4(x, y) * 0.8) R.pset(x, y, d_mez(R.pget(x, y), P.lava[2], 0.4 * g)); } } }
  return { mask };
}

// el camino: copia el fondo fijo y pinta encima todo lo que se mueve
function d_camino(R, t, o, cam) {
  const P = D_ROJO, K = (n, i) => P[n][i], ab = o.abierta ?? 0;
  if (cam === 'puerta') {
    const F = d_fondo(R, 'vd-inf-puerta', (b) => d_puertaFondo(R, P, b)); R.copiar(F.b);
    for (let k = 0; k < 3; k++) d_humo(R, ((h(k, 71) * 140 + t * (2 + k * 2)) % 110) - 30, 40 + k * 14, 14 + k * 3, P, F.mask);
    for (let y = 70; y <= 114; y++) if (y > 92 - Math.round(14 * R.vnoise(22 * 0.06, 3) + 4 * R.vnoise(22 * 0.2, 1))) { R.pset(21, y, P.lava[2]); R.pset(22, y, (y * 2 - Math.floor(t * 40)) % 6 < 2 ? P.lava[5] : P.lava[3]); R.pset(23, y, P.lava[2]); }
    for (let x = 0; x < 48; x++) if ((x + Math.floor(t * 18)) % 9 < 2 && R.dentro([[0, 28], [16, 22], [32, 30], [44, 52], [50, 84], [46, 112], [38, 130], [0, 134]], x + 0.5, 116.5)) R.pset(x, Math.round(116 + Math.sin(x * 0.1) * 1.5), P.lava[5]);
    d_rendija(R, 166, 39, 137, t, ab, P);
    d_cadena(R, 120, 52, 212, 124, 5, t, 0, K); d_cadena(R, 212, 52, 120, 124, 5, t, 1.7, K);
    d_cerradura(R, 166, 96, 11, t, ab, P);
    c_infiernoRunas(R, t, P);
    d_brasero(R, t, 46, 112, K, 1, 152); d_brasero(R, t, 288, 112, K, 2, 152);
    d_ceniza(R, t, 46, 0, 320, 24, 180, 13, false, K);
    const al = d_almaSube(R, t, o.alma, 166, 90, 26, D_BLANCA);
    return { encuadre: 'camino', camara: 'puerta', suelo: 152, libre: [90, 240], puerta: [104, 24, 228, 152], cerradura: [166, 96], alma: al };
  }
  const F = d_fondo(R, 'vd-inf-camino', (b) => d_caminoFondo(R, P, b)); R.copiar(F.b);
  // humo en tres capas a tres velocidades
  for (const [v, w, n, y0, k] of [[1.2, 26, 3, 22, 1], [2.4, 32, 3, 42, 2], [4, 40, 2, 64, 3]]) for (let i = 0; i < n; i++) d_humo(R, ((h(i, k, 70) * 420 + t * v) % 420) - 50, y0 + Math.round(h(i, k, 71) * 10), w, P, F.mask);
  // dos rocas flotantes que gotean luz y se mecen
  for (const [cx, cy, w, k] of [[96, 46, 26, 0], [198, 36, 18, 1]]) {
    const y = cy + Math.round(Math.sin(t * 0.6 + k * 2) * 1.5), pts = [[cx - w / 2, y], [cx - w / 3, y - 3], [cx, y - 4], [cx + w / 3, y - 2], [cx + w / 2, y + 1], [cx + w / 4, y + 5], [cx + 1, y + w * 0.45], [cx - w / 4, y + 5]];
    R.poligono(pts, (x, yy) => d_texRoca(R, P, x, yy, 0.9)); d_filo(R, pts, 1, P.roca[4], P.roca[0]);
    for (let i = -w / 3; i <= w / 4; i++) { const X = Math.round(cx + i), Y = y + 3 + Math.round(Math.abs(i) < w / 6 ? 2 : 0); R.pset(X, Y, P.lava[1]); }
    const g = (t * 26 + k * 13) % 42; R.pset(cx + 1, Math.round(y + w * 0.45 + 1 + g), P.lava[4]); R.pset(cx + 1, Math.round(y + w * 0.45 + g), P.lava[2]);
  }
  // murciélagos lejanos
  for (let k = 0; k < 3; k++) d_murcielago(R, 60 + ((t * 12 + k * 70) % 190), 26 + k * 9 + Math.sin(t * 0.9 + k) * 5, t + k * 0.3, P.roca[0]);
  // las cascadas y el río que corren, las grietas que laten
  for (const [cx, y0, y1] of F.caidas) { for (let y = y0; y <= y1; y++) if ((y - Math.floor(t * 34) + cx) % 6 < 2) R.pset(cx + Math.round(Math.sin(y * 0.2) * 0.6), y, P.lava[5]);
    for (let i = 0; i < 5; i++) { const ph = (t * 2 + i * 0.2) % 1; R.pset(Math.round(cx + (i - 2) * ph * 4), Math.round(y1 + 1 - Math.sin(ph * Math.PI) * 4), P.lava[4]); } }
  for (let x = 0; x < 320; x++) { if ((x + Math.floor(t * 22)) % 13 >= 3) continue; const [yc, hw, ve] = F.rio[x]; if (ve) R.pset(x, Math.round(yc + Math.sin((x + t * 10) * 0.3) * hw * 0.4), P.lava[5]); }
  F.grietas.forEach((px, k) => { const l = 0.5 + 0.5 * Math.sin(t * 2.2 + k * 1.7); for (const [x, y] of px) R.pset(x, y, l > 0.7 ? P.lava[3] : l > 0.35 ? P.lava[2] : P.lava[1]); });
  // las cadenas entre las agujas y el risco
  d_cadena(R, 29, 92, 118, 100, 12, t, 0, K); d_cadena(R, 143, 104, 191, 92, 8, t, 1.3, K);
  // la luz que recorre el sendero hacia la puerta
  for (let x = 0; x <= 206; x++) { const yc = d_sendaY(x), w = d_sendaW(x);
    for (let y = Math.round(yc - w + 1); y <= Math.round(yc + w - 1); y++) { const ph = ((x + (y - yc) * 2 - t * 34) % 64 + 64) % 64; if (ph > 9) continue;
      const fila = Math.floor((y - yc + 40) / 4), off = (fila & 1) * 3.5; if ((y - yc + 40) % 4 === 0 || (x + off) % 7 < 1) R.pset(x, y, ph < 4 ? P.luz[3] : P.luz[2]); } }
  // la rendija, la cerradura y las antorchas
  d_rendija(R, 245, 44, 139, t, ab, P);
  d_cerradura(R, 245, 100, 7, t, ab, P);
  for (const [x, k] of [[196, 1], [294, 2]]) { for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) { const g = 1 - Math.hypot(i, j) / 8.5; if (g > 0 && g > R.b4(x + i, 96 + j) + 0.3) R.pset(x + i, 96 + j, d_mez(R.pget(x + i, 96 + j), P.lava[3], 0.3)); } d_llama(R, x, 101, 8, t, k, K); }
  d_ceniza(R, t, 56, 0, 320, 20, 180, 11, false, K);
  const al = d_almaSube(R, t, o.alma, 245, 92, 10, D_BLANCA);
  return { encuadre: 'camino', camara: 'general', suelo: 152, libre: [30, 200], puerta: [202, 33, 288, 152], cerradura: [245, 100], alma: al };
}
// una columna como una raíz: tres hebras trenzadas que bajan del techo y se abren en raíces sobre el suelo (pie);
// lado: hacia dónde está la luz (el trono)
function d_raiz(R, P, cx, w, lado, pie) {
  for (let s = 0; s < 3; s++) for (let y = 0; y <= pie; y++) {
    const xs = cx + Math.sin(y * 0.055 + s * 2.1) * w * 0.3, r = w * 0.22 + (y > pie - 26 ? (y - pie + 26) * 0.22 : 0) + (y < 22 ? (22 - y) * 0.35 : 0);
    const delante = Math.cos(y * 0.055 + s * 2.1) > 0, osc = y < 34 ? (34 - y) / 34 * 1.6 : 0;
    for (let x = Math.floor(xs - r); x <= Math.ceil(xs + r); x++) {
      const u = (x + 0.5 - xs) / r; if (Math.abs(u) > 1) continue;
      const l = u * lado; let v = l > 0.55 ? 4 : l > 0.1 ? 3.2 : l > -0.6 ? 2.2 : 1.2;
      if (!delante) v -= 0.8; if (Math.abs(u) > 0.86) v = 0.2; if (h(x, Math.floor(y / 3) + s * 7, 12) > 0.84) v -= 1;
      R.pset(x, y, R.tone(P.roca, v - osc, x, y));
    }
  }
  for (const sd of [-1, 1]) for (let i = 0; i <= 16; i++) { const u = i / 16, x = cx + sd * (w * 0.3 + u * w * 1.1), y = pie - 8 + u * u * 10, r = 3.2 - u * 2.2;
    R.disco(x, y + 0.5, r + 0.6, P.roca[0]); R.disco(x - sd * 0.4, y, r, P.roca[sd === lado ? 3 : 2]); }
}

// el trono de Mefisto: escalones, respaldo de cinco puntas con su panel acolchado e incrustaciones de luz, brazos con
// volutas, cojín y frente. K(clave, i, x, y) da el color (roja o verde); solo: 'frente' pinta solo brazos, cojín y frente
// (lo que va delante de quien se sienta); marca(x, y) anota los píxeles del trono (para la mano y el rosetón)
const D_RESPALDO = [[136, 123], [136, 58], [140, 50], [144, 58], [146, 58], [150, 44], [154, 56], [156, 56], [160, 38], [164, 56], [166, 56], [170, 44], [174, 58], [176, 58], [180, 50], [184, 58], [184, 123]];

function d_trono(R, K, solo, marca) {
  const pon = (x, y, c) => { R.pset(x, y, c); if (marca) marca(x, y); };
  if (solo !== 'frente') {
    // los escalones
    for (let s = 0; s < 3; s++) { const a = 140 + s * 4, w = 44 + s * 6; for (let y = a; y < a + 4 + (s === 2 ? 1 : 0); y++) for (let x = 160 - w; x <= 160 + w; x++) pon(x, y, y === a ? K('piedra', 5, x, y) : x === 160 - w || x === 160 + w ? K('piedra', 0, x, y) : (x + s * 5) % 13 === 0 ? K('piedra', 1, x, y) : R.tone([K('piedra', 1, x, y), K('piedra', 2, x, y), K('piedra', 3, x, y)], 1.2 + R.vnoise(x * 0.3, y) * 0.8 - (y - a) * 0.3, x, y)); }
    // el respaldo
    for (let y = 37; y <= 123; y++) for (let x = 135; x <= 185; x++) {
      if (!R.dentro(D_RESPALDO, x + 0.5, y + 0.5)) continue;
      const filo = !R.dentro(D_RESPALDO, x - 0.5, y + 0.5) || !R.dentro(D_RESPALDO, x + 1.5, y + 0.5) || !R.dentro(D_RESPALDO, x + 0.5, y - 0.5);
      let c;
      if (filo) c = K('lava', 3, x, y);
      else if (x >= 142 && x <= 178 && y >= 64 && y <= 116) {
        if (x === 142 || x === 178 || y === 64 || y === 116) c = K('lava', 2, x, y);
        else if (x === 143 || y === 65) c = K('piedra', 0, x, y);
        else { const a = (x - 143) % 6, b = (y - 66) % 6, d = Math.abs(a - 3) + Math.abs(b - 3); c = d === 0 ? K('tela', 3, x, y) : d === 1 ? K('tela', 0, x, y) : d < 3 ? K('tela', 2, x, y) : K('tela', 1, x, y); }
      } else c = R.tone([K('piedra', 0, x, y), K('piedra', 1, x, y), K('piedra', 2, x, y), K('piedra', 3, x, y)], 1.3 + R.vnoise(x * 0.25, y * 0.1) * 0.9 + (x < 160 ? 0.3 : -0.2), x, y);
      pon(x, y, c);
    }
    // el emblema del respaldo: un aro con tres puntas
    for (let a = 0; a < 40; a++) { const an = a / 40 * Math.PI * 2, x = Math.round(160 + Math.cos(an) * 4), y = Math.round(58 + Math.sin(an) * 4); pon(x, y, K('lava', 3, x, y)); }
    for (const [i, j] of [[0, -6], [-5, 3], [5, 3]]) { pon(160 + i, 58 + j, K('lava', 4, 160 + i, 58 + j)); }
    pon(160, 58, K('lava', 2, 160, 58));
  }
  // el cojín
  for (let y = 116; y <= 123; y++) for (let x = 142; x <= 178; x++) pon(x, y, y === 116 ? K('tela', 3, x, y) : y === 117 ? K('tela', 2, x, y) : y >= 122 ? K('tela', 0, x, y) : (x % 7 === 0 && y === 119) ? K('tela', 3, x, y) : K('tela', 1, x, y));
  // el frente del asiento, con su incrustación de luz y rombos tallados
  for (let y = 124; y <= 139; y++) for (let x = 132; x <= 188; x++) {
    let c = y === 124 ? K('piedra', 4, x, y) : x === 132 || x === 188 || y === 139 ? K('piedra', 0, x, y) : R.tone([K('piedra', 1, x, y), K('piedra', 2, x, y), K('piedra', 3, x, y)], 1.0 + R.vnoise(x * 0.3, y * 0.3) * 0.8 + (x < 160 ? 0.3 : 0), x, y);
    if ((y === 127 || y === 136) && x > 135 && x < 185) c = K('lava', 2, x, y);
    if (y > 128 && y < 135) { const d = Math.abs(((x - 136) % 10) - 5) + Math.abs(y - 131.5); if (d < 1.5) c = K('lava', 3, x, y); else if (d < 2.5) c = K('piedra', 0, x, y); }
    pon(x, y, c);
  }
  // los brazos, con sus volutas
  for (const [x0, x1, vx] of [[128, 146, 131], [174, 192, 189]]) {
    for (let y = 104; y <= 139; y++) for (let x = x0; x <= x1; x++) {
      if (y > 124 && (x > x0 + 4 && x < x1 - 4)) continue;
      const c = y === 104 ? K('piedra', 5, x, y) : y < 108 ? K('piedra', 4, x, y) : x === x0 || x === x1 ? K('piedra', 0, x, y) : y === 108 ? K('piedra', 1, x, y) : R.tone([K('piedra', 1, x, y), K('piedra', 2, x, y), K('piedra', 3, x, y)], 1.4 + R.vnoise(x * 0.4, y * 0.2) * 0.7 + (x0 < 160 ? 0.4 : 0), x, y);
      pon(x, y, c);
    }
    for (let a = 0; a < 28; a++) { const an = a / 28 * Math.PI * 2.6, r = 1 + a / 28 * 3.4, x = Math.round(vx + Math.cos(an) * r), y = Math.round(114 + Math.sin(an) * r); pon(x, y, K('lava', a > 18 ? 3 : 2, x, y)); }
    for (let x = x0 + 2; x <= x1 - 2; x++) pon(x, 120, K('lava', 1, x, 120));
  }
}

// lo de delante del trono para quien se sienta (con o.verde mezclado)
const d_tronoFrente = (R, K) => d_trono(R, K, 'frente');

// la pared de roca con estratos y vetas (devuelve las vetas, para que laten); claro: resplandor alrededor de (lx, ly)
function d_pared(R, P, y1, lx, ly) {
  for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) R.pset(x, y, d_texRoca(R, P, x, y, 1.0 + Math.max(0, 1 - Math.hypot(x - lx, (y - ly) * 1.2) / 130) * 1.6 - Math.max(0, (44 - y) / 44) * 1.1 - (x > 270 && y < 48 ? 0.4 : 0)));
  const vetas = [];
  for (let k = 0; k < 9; k++) { let x = 14 + k * 36 + h(k, 51) * 18, y = 48 + h(k, 52) * 30; const n = 22 + Math.round(h(k, 53) * 40), px = [];
    for (let i = 0; i < n && y < y1 - 6; i++) { y += 1; x += (h(k, i, 54) - 0.5) * 1.8; const X = Math.round(x), Y = Math.round(y); R.pset(X - 1, Y, P.roca[0]); R.pset(X, Y, P.lava[0]); R.pset(X + 1, Y, P.roca[4]); px.push([X, Y]); }
    vetas.push(px); }
  return vetas;
}

// el canal de lava al pie de la pared (y0–y1) con su borde de piedra
function d_canal(R, P, y0, y1) {
  const yc = (y0 + y1) / 2, hw = (y1 - y0) / 2;
  for (let y = y0 - 1; y <= y1 + 1; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === y0 - 1 ? P.piedra[4] : y === y1 + 1 ? P.piedra[1] : R.tone(P.lava, 4.2 - Math.abs(y - yc) / hw * 2.6 + R.vnoise(x * 0.2, y) * 0.6, x, y));
}

// el suelo de obsidiana en perspectiva (juntas, brillos y reflejos de las luces de la sala) desde y0, con charcos de
// lava [x, y, rx] (bordes de piedra) y grietas de luz
function d_suelo(R, P, y0, brillos, charcos = []) {
  const filas = [y0, y0 + 3, y0 + 7, y0 + 12, y0 + 18, y0 + 25, y0 + 33, y0 + 42];
  for (let y = y0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let v = 1.2 + R.vnoise(x * 0.08, y * 0.5) * 0.7;
    v += Math.max(0, 1 - (y - y0) / 9) * 2.2 * R.vnoise(x * 0.7, y * 0.05);
    for (const [bx, a] of brillos) v += Math.max(0, 1 - Math.abs(x - bx) / a) * (R.vnoise(x * 0.5, y * 0.08) * 1.4) * (1 - (y - y0) / 60);
    let c = R.tone(P.obsid, v, x, y);
    if (v > 2.6 && h(x, y, 61) > 0.5) c = P.lava[0];
    if (filas.includes(y)) c = P.obsid[3];
    const k = (x - 160) / Math.max(1, (y - 90) * 0.55); if (Math.abs(k - Math.round(k)) * (y - 90) * 0.55 < 0.5) c = P.obsid[3];
    R.pset(x, y, c);
  }
  for (let k = 0; k < 7; k++) { let x = h(k, 81) * 320, y = y0 + 8 + h(k, 82) * (170 - y0); for (let i = 0; i < 14; i++) { x += h(k, i, 83) > 0.5 ? 1 : -1; y += 0.5; const X = Math.round(x), Y = Math.round(y); R.pset(X, Y, P.lava[1]); R.pset(X + 1, Y, P.obsid[0]); } }
  for (const [cx, cy, rx] of charcos) for (let y = cy - 6; y <= cy + 6; y++) for (let x = cx - rx - 2; x <= cx + rx + 2; x++) {
    const d = Math.hypot((x + 0.5 - cx) / rx, (y + 0.5 - cy) / (rx * 0.32)); if (d > 1.25) continue;
    R.pset(x, y, d > 1 ? (y < cy ? P.piedra[1] : P.piedra[4]) : R.tone(P.lava, 4.2 - d * 2.4 + R.vnoise(x * 0.4, y) * 0.6, x, y));
  }
}

// el fondo fijo de la sala (general o 'contratos') en la paleta P; devuelve las vetas, las cascadas y la máscara del trono
function d_tronoFondo(R, P, cam, b) {
  const K = (n, i) => P[n][i], marcaT = new Uint8Array(320 * 180);
  if (cam === 'contratos') {
    // DE CERCA: la pared es de bloques grandes de roca volcánica (bisel de luz arriba a la izquierda, sombra abajo a la
    // derecha, grano y grietas), con juntas que son vetas de lava; el resplandor del anillo la aclara
    const vetas = [], CX = 214, CY = 80, RO = 66;
    for (let y = 0; y <= 141; y++) { const fila = Math.floor((y + 6) / 24), ly = (y + 6) % 24;
      for (let x = 0; x < 320; x++) { const desf = fila * 19 + Math.floor(h(fila, 7, 70) * 20), col = Math.floor((x + desf) / 44), lx = (x + desf) % 44;
        const brillo = Math.max(0, 1 - Math.hypot(x - CX, (y - CY) * 1.1) / 150) * 1.5 - Math.max(0, (40 - y) / 40) * 0.9;
        let v = 1.0 + brillo + R.vnoise(x * 0.12, y * 0.12) * 0.9 - 0.3 + (h(col, fila, 71) - 0.5) * 0.5;
        if (lx < 3 || ly < 3) v += 0.9; else if (lx > 40 || ly > 20) v -= 0.8;
        if (h(x >> 1, y >> 1, 72) > 0.93) v -= 0.7; if (h(x, y, 73) > 0.985) v += 0.9;
        let c = R.tone(P.roca, v, x, y);
        if (lx < 1 || ly < 1) c = h(col, fila, 74) > 0.55 ? P.lava[0] : P.roca[0];
        R.pset(x, y, c); } }
    // las juntas encendidas laten (cada junta de lava es una veta) y unas grietas que bajan por los bloques
    for (let fila = 0; fila < 7; fila++) { const desf = fila * 19 + Math.floor(h(fila, 7, 70) * 20), y = fila * 24 - 6; if (y < 0 || y > 141) continue;
      for (let col = 0; col < 9; col++) { if (h(col, fila, 74) <= 0.55) continue; const px = []; for (let x = col * 44 - desf; x < col * 44 - desf + 44; x++) if (x >= 0 && x < 320) px.push([x, y]); if (px.length) vetas.push(px); } }
    for (let k = 0; k < 7; k++) { let x = 10 + h(k, 75) * 300, y = 20 + h(k, 76) * 60; const px = [];
      for (let i = 0; i < 40 && y < 140; i++) { y += 1; x += (h(k, i, 77) - 0.5) * 2.2; const X = Math.round(x), Y = Math.round(y); R.pset(X - 1, Y, P.roca[0]); R.pset(X, Y, P.lava[0]); R.pset(X + 1, Y, P.roca[4]); px.push([X, Y]); }
      vetas.push(px); }
    // EL GRAN ANILLO de símbolos, más grande y a la derecha (centro x 214, y 80, r 66): corona de piedra, banda tallada,
    // dieciséis símbolos grandes, el aro de lava y los radios
    for (let y = CY - RO; y <= CY + RO; y++) for (let x = CX - RO; x <= CX + RO; x++) { const d = Math.hypot(x + 0.5 - CX, y + 0.5 - CY);
      if (d > RO || y < 0 || y > 145 || x > 319) continue;
      if (d > RO - 2) R.pset(x, y, P.roca[0]); else if (d > RO - 13) R.pset(x, y, d > RO - 3 ? P.piedra[5] : d < RO - 12 ? P.piedra[0] : R.tone(P.piedra, 2.2 + R.vnoise(x * 0.25, y * 0.25) * 0.9 + (x < CX && y < CY ? 0.5 : 0), x, y));
      else if (Math.abs(d - 36) < 1) R.pset(x, y, P.lava[1]); else if (Math.abs(d - 38) < 0.6) R.pset(x, y, P.piedra[4]); else if (d < 34) R.pset(x, y, R.tone(P.obsid, 1.0 + (1 - d / 34) * 1.4 + R.vnoise(x * 0.2, y * 0.2) * 0.5, x, y)); }
    for (let k = 0; k < 16; k++) { const an = k / 16 * Math.PI * 2, x = Math.round(CX + Math.cos(an) * (RO - 7)), y = Math.round(CY + Math.sin(an) * (RO - 7)), f = k % 3;
      if (f === 0) for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) { if (Math.abs(i) + Math.abs(j) === 3 || (i === 0 && j === 0)) R.pset(x + i, y + j, P.lava[1]); }
      else if (f === 1) { R.disco(x + 0.5, y + 0.5, 3, P.lava[1]); R.disco(x + 0.5, y + 0.5, 1.4, P.piedra[1]); }
      else for (let j = 0; j <= 5; j++) for (let i = -j; i <= j; i += Math.max(1, j * 2)) R.pset(x + i, y - 3 + j, P.lava[1]); }
    for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2; R.linea(Math.round(CX + Math.cos(an) * 12), Math.round(CY + Math.sin(an) * 12), Math.round(CX + Math.cos(an) * 34), Math.round(CY + Math.sin(an) * 34), P.lava[0]); }
    // el zócalo donde la pared toca el suelo (y 142–146)
    for (let y = 142; y <= 146; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y === 142 ? P.piedra[4] : y === 146 ? P.roca[0] : (x + (y > 144 ? 11 : 0)) % 22 === 0 ? P.piedra[0] : R.tone(P.piedra, 2.4 - (y - 142) * 0.3 + R.vnoise(x * 0.3, y) * 0.5, x, y));
    // el suelo de obsidiana más bajo y cerca (sin canal): refleja el anillo; una grieta de lava en diagonal a la derecha
    d_suelo(R, P, 147, [[214, 56], [60, 22]], []);
    { let x = 318, y = 147; const px = []; while (y < 180) { const w = 1 + Math.round((y - 147) / 14); for (let i = -w - 1; i <= w + 1; i++) R.pset(x + i, y, Math.abs(i) > w ? P.roca[0] : R.tone(P.lava, 3.8 - Math.abs(i) / (w + 0.5) * 2, x + i, y)); px.push([x, y]);
      y += 1; x += h(y, 3, 78) > 0.3 ? -2 : 0; }
      vetas.push(px); }
    return { vetas, caidas: [] };
  }
  const vetas = d_pared(R, P, 126, 160, 74);
  // dos cascadas de lava que salen de la pared
  const caidas = [[58, 64], [262, 70]];
  for (const [cx, y0] of caidas) { R.disco(cx + 0.5, y0, 4, P.roca[0]); for (let y = y0; y <= 127; y++) for (let i = -2; i <= 2; i++) R.pset(cx + i, y, P.lava[Math.abs(i) === 2 ? 0 : i === 0 ? 3 : 2]); }
  // el rosetón detrás del trono: hueco oscuro, corona de fuego en dovelas y marco de piedra
  for (let y = 26; y <= 122; y++) for (let x = 110; x <= 210; x++) { const d = Math.hypot(x + 0.5 - 160, y + 0.5 - 74); if (d > 47) continue;
    const an = Math.atan2(y + 0.5 - 74, x + 0.5 - 160), s = (an / (Math.PI / 8) + 16) % 1;
    R.pset(x, y, d > 45 ? P.roca[0] : d > 43.5 ? P.piedra[4] : d > 37 ? (s < 0.1 ? P.piedra[1] : R.tone(P.lava, 3.6 - Math.abs(d - 40.5) * 0.7, x, y)) : d > 35.8 ? P.piedra[1] : R.tone(P.obsid, 1.2 + (1 - d / 36) * 1.6, x, y)); }
  // las columnas raíz
  d_raiz(R, P, 28, 26, 1, 132); d_raiz(R, P, 92, 22, 1, 132); d_raiz(R, P, 228, 22, -1, 132); d_raiz(R, P, 292, 26, -1, 132);
  d_canal(R, P, 127, 133);
  d_suelo(R, P, 135, [[160, 60], [58, 14], [262, 14]], [[62, 168, 13], [258, 164, 11]]);
  // la alfombra hasta el trono, con cenefa clara y rombos
  for (let y = 152; y < 180; y++) { const u = (y - 152) / 28, a = Math.round(144 - u * 18), z = Math.round(176 + u * 18);
    for (let x = a; x <= z; x++) { const lx = x - a, rx = z - x; let c = lx === 0 || rx === 0 ? P.tela[0] : lx === 2 || rx === 2 ? P.tela[3] : R.tone(P.tela, 1.2 + R.vnoise(x * 0.4, y * 0.4) * 0.6 - u * 0.4, x, y);
      const d = Math.abs(x - 160) + Math.abs(((y - 152) % 8) - 4); if (d === 3) c = P.tela[3]; R.pset(x, y, c); } }
  d_trono(R, K, null, (x, y) => { if (x >= 0 && x < 320 && y >= 0 && y < 180) marcaT[y * 320 + x] = 1; });
  return { vetas, caidas, marcaT };
}

// la sala del trono: copia el fondo (rojo, verde o tramado entre los dos) y pinta encima lo que se mueve
function d_salaTrono(R, t, o, cam) {
  const u = o.verde ?? (o.rey ? 1 : 0), K = d_K(R, u);
  const FR = d_fondo(R, 'vd-inf-trono-r-' + cam, (b) => d_tronoFondo(R, D_ROJO, cam, b));
  const FV = u > 0 ? d_fondo(R, 'vd-inf-trono-v-' + cam, (b) => d_tronoFondo(R, D_VERDE, cam, b)) : null;
  if (u >= 1) R.copiar(FV.b); else { R.copiar(FR.b); if (u > 0) for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (d_esVerde(R, x, y, u)) R.pset(x, y, FV.b[y * 320 + x]); }
  const F = FR, libre = (x, y) => !F.marcaT || !F.marcaT[y * 320 + x];
  // las vetas que laten y la lava que corre por las cascadas y el canal
  F.vetas.forEach((px, k) => { const l = 0.5 + 0.5 * Math.sin(t * 1.8 + k * 1.3); for (const [x, y] of px) if (libre(x, y)) R.pset(x, y, K('lava', l > 0.7 ? 3 : l > 0.35 ? 2 : 1, x, y)); });
  const cy0 = cam === 'contratos' ? 140 : 127, cy1 = cam === 'contratos' ? 145 : 133;
  if (cam !== 'contratos') for (let x = 0; x < 320; x++) { if ((x - Math.floor(t * 20)) % 11 >= 3) continue; const y = Math.round((cy0 + cy1) / 2 + Math.sin(x * 0.4 + t) * 1.5); if (libre(x, y)) R.pset(x, y, K('lava', 5, x, y)); }
  for (const [cx, y0] of F.caidas) for (let y = y0; y <= cy0; y++) if ((y - Math.floor(t * 30)) % 6 < 2 && libre(cx, y)) R.pset(cx, y, K('lava', 5, cx, y));
  // burbujas que revientan en los charcos de lava del suelo
  for (const [cx, cy, rx, k] of cam === 'contratos' ? [[284, 165, 3, 0], [262, 176, 4, 1]] : [[62, 168, 13, 0], [258, 164, 11, 1]]) {
    const ph = (t * 0.8 + k * 0.5) % 1, bx = cx + Math.round((h(Math.floor(t * 0.8 + k * 0.5), k, 9) - 0.5) * rx), r = ph < 0.7 ? ph / 0.7 * 2 : 0;
    if (ph < 0.7) R.anillo(bx + 0.5, cy + 0.5, Math.max(0.8, r), K('lava', 5, bx, cy)); else for (const [i, j] of [[-2, -2], [2, -3], [0, -4]]) R.pset(bx + i, cy + j - Math.round((ph - 0.7) * 10), K('lava', 4, bx, cy));
  }
  c_infiernoSuelo(R, t, K, cy1 + 2, cam === 'contratos' ? [[214, 40], [60, 18]] : [[160, 30], [58, 8], [262, 8], [112, 6], [208, 6]], libre);
  // en 'contratos', el reflejo del anillo que tiembla en la obsidiana pulida (bajo el anillo, x 166–262)
  if (cam === 'contratos') for (let y = 148; y < 180; y++) { const sx = Math.round(Math.sin(t * 2.2 + y * 0.7) * 1.5), f = 1 - (y - 148) / 44;
    for (let x = 166; x <= 262; x++) { const d = Math.abs(x - 214), aro = Math.abs(d - 44 * (0.6 + 0.4 * (y - 148) / 32)) < 3 ? 0.5 : 0, g = (Math.max(0, 1 - d / 52) * 0.95 + aro) * f * (0.75 + 0.25 * Math.sin(y * 0.9 - t * 3));
      if ((y & 1 || d < 20) && g > R.b4(x, y) + 0.05) R.pset(x + sx, y, d_mez(R.pget(x + sx, y), K('lava', aro ? 3 : 2, x, y), 0.55)); } }
  // murciélagos junto al techo
  for (let k = 0; k < 2; k++) d_murcielago(R, 50 + ((t * 10 + k * 110) % 200), 30 + k * 8 + Math.sin(t * 1.1 + k) * 4, t + k * 0.4, K('roca', 0, 100, 30));
  let trono = null, asiento = null;
  if (cam === 'contratos') {
    // el anillo de la pared: los símbolos se encienden uno tras otro
    // (con o.almas, todo el anillo se enciende a la vez y el aro de dentro gira más deprisa)
    const lleno = Math.max(0, Math.min(1, o.almas ?? 0));
    for (let k = 0; k < 16; k++) { const an = k / 16 * Math.PI * 2, x = Math.round(214 + Math.cos(an) * 59), y = Math.round(80 + Math.sin(an) * 59), on = (Math.floor(t * 4) - k + 64) % 16 < 3 || lleno > 0.25 + (k % 4) * 0.15;
      if (on) for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) if (Math.hypot(i, j) < 4.2 && R.b4(x + i, y + j) < 0.6) R.pset(x + i, y + j, d_mez(R.pget(x + i, y + j), K('lava', 4, x, y), 0.5)); }
    for (let a = 0; a < 72; a++) { const an = a / 72 * Math.PI * 2 - t * (0.3 + lleno * 0.9); if (a % 3) continue; const x = Math.round(214 + Math.cos(an) * 36), y = Math.round(80 + Math.sin(an) * 36); R.pset(x, y, K('lava', 3, x, y)); R.pset(x, y + 1, K('lava', 2, x, y)); }
    if (lleno > 0) for (let y = 46; y <= 114; y++) for (let x = 180; x <= 248; x++) { const g = (1 - Math.hypot(x - 214, y - 80) / 34) * lleno; if (g > 0 && g > R.b4(x, y) + 0.2) R.pset(x, y, d_mez(R.pget(x, y), D_ALMA[1], 0.35)); }
  } else {
    // el rosetón: rayos de fuego que giran detrás del trono
    for (let k = 0; k < 12; k++) { const an = k / 12 * Math.PI * 2 + t * 0.35; for (let r = 8; r < 35; r++) { const x = Math.round(160 + Math.cos(an) * r), y = Math.round(74 + Math.sin(an) * r); if (!libre(x, y)) continue; if ((r + Math.floor(t * 10)) % 5 === 0) continue; R.pset(x, y, K('lava', r < 16 ? 1 : r < 26 ? 2 : 1, x, y)); } }
    // los braseros colgados de cadenas, que se mecen
    for (const [x, k] of [[112, 0], [208, 1]]) { const sw = Math.round(Math.sin(t * 0.9 + k * 2) * 1.5); d_cadenaColgada(R, x, 16, 54, t, k * 2, K);
      for (let j = 0; j < 4; j++) for (let i = -5 + j; i <= 5 - j; i++) R.pset(x + sw + i, 56 + j, j === 0 ? K('hierro', 3, x, 56) : K('hierro', j < 2 ? 2 : 1, x, 56));
      d_llama(R, x + sw, 55, 9, t, k + 3, K); }
    // la mano de Mefisto, detrás del respaldo
    if (o.mefisto > 0) d_manoLuz(R, 190, 64 + Math.round(Math.sin(t * 0.8) * 2), o.mefisto, t, libre);
    trono = [128, 38, 192, 152]; asiento = [153, 126];
  }
  // los contratos que arden, las almas y el alma que sube
  const conts = [];
  if (o.contratos != null) {
    const L = cam === 'contratos' ? [[118, 62, 26, 34], [170, 50, 30, 40], [228, 56, 32, 42], [268, 100, 34, 46], [150, 110, 28, 36], [214, 118, 36, 48]]
      : [[70, 64, 10, 13], [100, 44, 10, 13], [222, 46, 10, 13], [252, 70, 10, 13], [92, 100, 10, 13], [232, 102, 10, 13], [274, 90, 9, 12]];
    L.forEach(([x, y, w, a], i) => { const q = d_qContrato(o.contratos, i, L.length), cx = x + Math.sin(t * 0.7 + i * 1.9) * 2, cy = y + Math.sin(t * 1.1 + i * 2.3) * 2.5;
      if (cam === 'contratos' && q > 0 && q < 1.1) for (let yy = 150; yy < 176; yy++) for (let xx = Math.round(cx - w * 0.7); xx <= Math.round(cx + w * 0.7); xx++) { const g = 1 - Math.hypot((xx - cx) / (w * 0.7), (yy - 162) / 13); if (g > 0 && g > R.b4(xx, yy) + 0.25) R.pset(xx, yy, d_mez(R.pget(xx, yy), D_ALMA[1], 0.3)); }
      const r = d_contrato(R, Math.round(cx), Math.round(cy), w, a, q, t, i + 1); if (r) conts.push(r); });
  }
  if (o.almas > 0) { if (cam === 'contratos') { d_almas(R, t, Math.round(o.almas * 34), 24, 276, 48, 172, 5); d_almas(R, t, Math.round(o.almas * 20), 60, 270, 22, 120, 8); } else d_almas(R, t, Math.round(o.almas * 16), 36, 284, 22, 150, 5); }
  const al = d_almaSube(R, t, o.alma, o.almaX ?? (cam === 'contratos' ? 214 : 160), cam === 'contratos' ? 96 : 100, 22, D_ALMA);
  d_ceniza(R, t, 34, 0, 320, 24, 180, 17, false, K);
  return { encuadre: 'trono', camara: cam, suelo: 152, libre: cam === 'contratos' ? [20, 90] : [30, 280], trono, asiento, contratos: conts, alma: al };
}
// la paleta de Battleworld (oro del dios, espacio, mármol, verde imperial, la luz del juez)
const E_BW = pal({
  esp0: '#05050f', esp1: '#0a0a1e', esp2: '#121230', esp3: '#1c1a44', esp4: '#2a2258', esp5: '#3c2c70', esp6: '#563c8a', nebA0: '#102238', nebA1: '#1a3a5a', nebA2: '#2a5a7a',
  oroK: '#3a2808', oroD: '#6a4a10', oroS: '#a87a18', oroM: '#d8a830', oro: '#f0c848', oroL: '#fff0a0', oroB: '#fffbe0',
  mar0: '#efe6cc', mar1: '#d8c8a0', mar2: '#b8a47a', mar3: '#8a7650', marV: '#c8b07a',
  verde: '#2e7a3e', verdeL: '#4aa858', verdeS: '#1e5a2a', verdeD: '#123a1c', gema: '#6aff9a',
  luz0: '#fff6dc', luz1: '#ffe4a0', luz2: '#f0b860', alma: '#c8ffe0', plata: '#c8d8f0', plataS: '#7a8ab8', violeta: '#7a5ab0', violetaS: '#3a2a6a',
  piedra0: '#1e2622', piedra1: '#2a3430', piedra2: '#38443e', piedra3: '#4a5852', piedraL: '#66766e',
  noche0: '#0c1030', noche1: '#141a46', noche2: '#1e2860', noche3: '#2c3a78', luna: '#c8d4f0', lunaL: '#f4f6ff',
  bronce: '#a8722a', bronceL: '#e0a850', bronceS: '#6a4418', bronceD: '#3a2410',
  fuego: '#ffb040', fuegoL: '#fff0a0', fuegoR: '#e8602a', k: '#140c1a',
});

const E_TAU = Math.PI * 2;

const E_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// el umbral Bayer 4×4 (0–1) de un píxel, para tramar
const e_b4 = (x, y) => (E_B4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;

const e_cl = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

// un color a partir de r, g, b (0–255) y la mezcla de dos colores (u 0–1)
const e_rgb = (r, g, b) => (0xff000000 | (e_cl(Math.round(b), 0, 255) << 16) | (e_cl(Math.round(g), 0, 255) << 8) | e_cl(Math.round(r), 0, 255)) >>> 0;

const e_mix = (a, b, u) => e_rgb((a & 255) + ((b & 255) - (a & 255)) * u, ((a >> 8) & 255) + (((b >> 8) & 255) - ((a >> 8) & 255)) * u, ((a >> 16) & 255) + (((b >> 16) & 255) - ((a >> 16) & 255)) * u);

// funde el píxel que ya hay hacia un color (respeta R.recorte, porque pasa por pset)
function e_tinte(R, x, y, c, u) { if (x < 0 || x > 319 || y < 0 || y > 179 || u <= 0) return; R.pset(x, y, e_mix(R.pget(x, y), c, Math.min(1, u))); }

// el color de una rampa para un nivel continuo v (0 … n−1), tramado
const e_tono = (rampa, v, x, y) => rampa[e_cl(Math.floor(v + e_b4(x, y)), 0, rampa.length - 1)];

// ruido de valor suave (0–1), interpolado entre los nudos de h
function e_vn(x, y, k = 0) {
  const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(x0, y0, k), b = h(x0 + 1, y0, k), c = h(x0, y0 + 1, k), d = h(x0 + 1, y0 + 1, k);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

// un fondo fijo que se pinta una vez por lienzo en un búfer de R.nuevo() y luego se copia entero en cada fotograma
const E_CAPAS = new WeakMap();

function e_capa(R, clave, dibuja) {
  let m = E_CAPAS.get(R); if (!m) E_CAPAS.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}

// el espacio tramado: nebulosas en tres escalas (violeta y azul), polvo y estrellas de tres tamaños; rc = [x0, y0, x1, y1]
function e_espacio(R, sem = 0, rc = [0, 0, 319, 179]) {
  const ESP = [E_BW.esp0, E_BW.esp1, E_BW.esp2, E_BW.esp3, E_BW.esp4, E_BW.esp5, E_BW.esp6], AZ = [E_BW.esp1, E_BW.nebA0, E_BW.nebA1, E_BW.nebA2];
  for (let y = rc[1]; y <= rc[3]; y++) for (let x = rc[0]; x <= rc[2]; x++) {
    const n = 0.55 * e_vn(x / 46, y / 30, sem) + 0.3 * e_vn(x / 17, y / 13, sem + 1) + 0.15 * e_vn(x / 6, y / 6, sem + 2);
    const banda = Math.exp(-(((y - 60 - (x - 160) * 0.35 - sem * 9) / 46) ** 2));
    const az = e_vn(x / 34 + 9, y / 24, sem + 3);
    let c = az > 0.62 && n > 0.45 ? e_tono(AZ, (az - 0.62) * 9 + n * 0.8, x, y) : e_tono(ESP, Math.max(0, (n - 0.3) * 4.2 * (0.45 + banda) + banda * 0.9), x, y);
    const s = h(x, y, 9 + sem);
    if (s > 0.9965) c = s > 0.9993 ? E_BW.oroB : s > 0.998 ? E_BW.plata : E_BW.plataS;
    else if (s > 0.993 && n > 0.5) c = E_BW.esp6;
    R.pset(x, y, c);
  }
  // unas estrellas grandes en cruz y una galaxia lejana
  for (let k = 0; k < 9; k++) { const x = Math.round(rc[0] + h(k, 3, sem) * (rc[2] - rc[0])), y = Math.round(rc[1] + h(k, 4, sem) * (rc[3] - rc[1]));
    if (x > 270 && y < 48) continue; R.pset(x, y, E_BW.oroB); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(x + dx, y + dy, E_BW.plataS); }
}

// estrellas que titilan encima de un fondo (n estrellas dentro de rc; fuera de la zona de Atom); f(x, y) opcional: dónde sí
function e_titilan(R, t, n, rc, sem = 0, f = null) {
  for (let k = 0; k < n; k++) { const x = Math.round(rc[0] + h(k, 11, sem) * (rc[2] - rc[0])), y = Math.round(rc[1] + h(k, 12, sem) * (rc[3] - rc[1]));
    if ((x > 274 && y < 48) || (f && !f(x, y))) continue;
    const b = Math.sin(t * (1.3 + h(k, 13, sem) * 2.4) + k * 1.7);
    if (b > 0.55) { R.pset(x, y, E_BW.oroB); if (b > 0.9) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) e_tinte(R, x + dx, y + dy, E_BW.plata, 0.6); } else if (b > -0.2) R.pset(x, y, E_BW.plataS); }
}

// una estrella fugaz cada «periodo» segundos, en diagonal, dentro de rc (con estela que se apaga)
function e_fugaz(R, t, periodo, rc, sem = 0) {
  const n = Math.floor(t / periodo), u = (t - n * periodo) / 0.9; if (u > 1) return;
  const x0 = rc[0] + h(n, 1, sem) * (rc[2] - rc[0]) * 0.6, y0 = rc[1] + h(n, 2, sem) * (rc[3] - rc[1]) * 0.5;
  for (let i = 0; i < 16; i++) { const v = u - i * 0.018; if (v < 0) break; const x = Math.round(x0 + v * 90), y = Math.round(y0 + v * 34); if (x > 274 && y < 48) continue; e_tinte(R, x, y, i < 2 ? E_BW.oroB : E_BW.plata, 1 - i / 16); }
}

// motas de luz que flotan y suben despacio (n, dentro de rc), en dos colores; sem cambia el dibujo
function e_motas(R, t, n, rc, c1, c2, sem = 0) {
  const W = rc[2] - rc[0], H = rc[3] - rc[1];
  for (let k = 0; k < n; k++) { const v = (h(k, 21, sem) + t * (0.03 + h(k, 22, sem) * 0.05)) % 1, x = Math.round(rc[0] + ((h(k, 23, sem) * W + Math.sin(t * 0.7 + k) * 6) % W + W) % W), y = Math.round(rc[3] - v * H);
    if (x > 274 && y < 48) continue; const b = Math.sin(t * 3 + k * 2.1), c = b > 0.3 ? c1 : c2; if (b < -0.6) continue;
    R.pset(x, y, c); if (b > 0.85) { e_tinte(R, x + 1, y, c2, 0.5); e_tinte(R, x - 1, y, c2, 0.5); } }
}

// los retales: una rampa de cuatro tonos (noche, sombra, medio, luz) y un color de detalle, cada uno con su textura
const E_BIOMAS = [
  ['desierto', ['#2a1a10', '#8a5a2a', '#c8904a', '#e8b870'], '#f6d8a0'], ['hielo', ['#1a2236', '#7a8ab0', '#c8d8ec', '#f4f8ff'], '#7a9ac8'],
  ['selva', ['#0a1a10', '#14402a', '#2a6a3a', '#4a9a4a'], '#7ac85a'], ['ciudad', ['#14141c', '#3a3a4a', '#6a6a7a', '#a0a0b0'], '#ffe080'],
  ['mar', ['#081428', '#14305a', '#2a5a9a', '#4a8ac8'], '#a8d4f0'], ['volcan', ['#1a0a0a', '#3a1a1a', '#6a2a22', '#9a4a2a'], '#f08a30'],
  ['pradera', ['#141c0a', '#4a6a2a', '#7a9a3a', '#a8c050'], '#d0e070'], ['cristal', ['#140e24', '#3a2a5a', '#6a4a9a', '#9a7ac8'], '#e0c8ff'],
  ['montana', ['#141010', '#4a3a30', '#7a6a58', '#a89a88'], '#f4f4f8'], ['mar', ['#081428', '#123a5a', '#1e6a8a', '#3a9ab0'], '#a8e8f0'],
].map(([n, r, f]) => ({ n, r: r.map(hex), f: hex(f) }));

// las semillas de los retales, con peso (unos retales grandes, otros pequeños)
const E_SEM = Array.from({ length: 70 }, (_, k) => { const z = 2 * h(k, 1, 3) - 1, a = h(k, 2, 3) * E_TAU, s = Math.sqrt(1 - z * z); return [s * Math.cos(a), z, s * Math.sin(a), E_BIOMAS[(k * 7 + 3) % E_BIOMAS.length], h(k, 4, 3) ** 2 * 0.16]; });

// pinta el planeta en (cx, cy) con radio r; giro: el ángulo; las costuras de oro laten; nubes finas; halo de atmósfera
function e_mundo(R, t, cx, cy, r, giro) {
  const ct = Math.cos(0.38), st = Math.sin(0.38), cg = Math.cos(giro), sg = Math.sin(giro), R2 = r + 5;
  for (let y = Math.floor(cy - R2); y <= cy + R2; y++) for (let x = Math.floor(cx - R2); x <= cx + R2; x++) {
    if (x < 0 || x > 319 || y < 0 || y > 179) continue;
    const dx = (x + 0.5 - cx) / r, dy = (y + 0.5 - cy) / r, d2 = dx * dx + dy * dy;
    if (d2 > 1) { // la atmósfera: un anillo tramado, dorado del lado de la luz y azul del de la sombra
      const d = Math.sqrt(d2), a = 1 - (d - 1) * r / 5; if (a <= 0) continue; const ls = (-0.75 * dx - 0.4 * dy) / d;
      if (a * (0.35 + 0.5 * Math.max(0, ls)) > e_b4(x, y) * 0.9) e_tinte(R, x, y, ls > 0 ? E_BW.oroL : E_BW.nebA2, a * 0.7); continue; }
    const z = Math.sqrt(1 - d2), y1 = dy * ct - z * st, z1 = dy * st + z * ct, x2 = dx * cg + z1 * sg, z2 = -dx * sg + z1 * cg;
    // las costuras ondulan: el punto se tuerce un poco antes de buscar su retal
    const wx = x2 + Math.sin(y1 * 11 + z2 * 6) * 0.035, wy = y1 + Math.sin(z2 * 9 + x2 * 8) * 0.035, wz = z2 + Math.sin(x2 * 12 + y1 * 7) * 0.035;
    let b1 = -9, b2 = -9, bi = null;
    for (const s of E_SEM) { const p = s[0] * wx + s[1] * wy + s[2] * wz + s[4]; if (p > b1) { b2 = b1; b1 = p; bi = s[3]; } else if (p > b2) b2 = p; }
    const lon = Math.atan2(x2, z2), lat = Math.asin(e_cl(y1, -1, 1)), u = lon * r, v = lat * r, iu = Math.floor(u), iv = Math.floor(v);
    const lam = -0.7 * dx - 0.42 * dy + 0.5 * z, sh = e_cl(lam * 1.3 + 0.08), noche = sh < 0.16;
    let lv = sh * 2.9 + 0.1, c = null;
    switch (bi.n) {
      case 'desierto': { const du = Math.sin(u * 0.9 + Math.sin(v * 0.35) * 2.2); lv += du * 0.45; if (du > 0.82 && !noche) c = bi.f; break; }
      case 'hielo': { if (h(Math.floor(u / 3), Math.floor(v / 2), 5) > 0.86 && (iu + iv) % 3 === 0) c = bi.f; lv += (h(iu >> 1, iv >> 1, 6) - 0.5) * 0.6; break; }
      case 'selva': lv += (e_vn(u / 2.5, v / 2.5, 7) - 0.5) * 1.6; if (!noche && h(iu, iv, 8) > 0.93) c = bi.f; break;
      case 'ciudad': { const calle = ((iu % 4) + 4) % 4 === 0 || ((iv % 3) + 3) % 3 === 0; lv += calle ? -0.9 : (h(iu >> 2, iv >> 1, 9) - 0.4) * 0.8;
        if (!calle && sh < 0.3 && h(iu, iv, 10) > 0.55 && Math.sin(t * 2 + iu * 3 + iv) > -0.6) c = bi.f; break; }
      case 'mar': { const ola = ((iu * 2 + iv * 3 + Math.floor(t * 3)) % 11 + 11) % 11 === 0; lv += (e_vn(u / 6, v / 3 + t * 0.2, 11) - 0.5) * 0.7; if (ola && !noche) c = bi.f;
        const sp = (dx + 0.36) ** 2 + (dy + 0.3) ** 2; if (sp < 0.03 && h(x, y, 12) > sp * 25) c = E_BW.oroB; break; }
      case 'volcan': { const ve = Math.abs(Math.sin(u * 0.45 + Math.sin(v * 0.3) * 1.6) * Math.sin(v * 0.42)); lv += (h(iu >> 1, iv >> 1, 13) - 0.5) * 0.7;
        if (ve < 0.09) c = Math.sin(t * 2.5 + u * 0.2) > 0 ? bi.f : E_BW.fuegoR; break; }
      case 'pradera': { const pu = Math.floor(u / 6), pv = Math.floor(v / 4), cel = h(pu, pv, 14); lv += (cel - 0.5) * 1.1; if (!noche && ((iu % 6) + 6) % 6 === 0) lv -= 0.6; if (!noche && cel > 0.8 && (iu + iv) % 2 === 0) c = bi.f; break; }
      case 'cristal': { const f = ((iu + iv * 2) % 7 + 7) % 7; lv += f === 0 ? 0.9 : f === 3 ? -0.6 : 0; if (!noche && f === 0 && h(iu, iv, 15) > 0.7) c = bi.f; break; }
      case 'montana': { const m = e_vn(u / 3, v / 3, 16); lv += (m - 0.5) * 1.8; if (m > 0.68 && !noche) c = bi.f; break; }
    }
    if (!c) c = e_tono(bi.r, lv, x, y);
    // las nubes finas que pasan (más rápidas que el giro)
    const nu = e_vn(u / 9 + t * 0.35, v / 3.5, 17); if (nu > 0.7 && bi.n !== 'ciudad') c = e_mix(c, sh > 0.2 ? E_BW.mar0 : E_BW.esp3, (nu - 0.7) * 2.4 * (0.4 + sh * 0.6));
    // las costuras de luz dorada: más finas en el centro, latido que corre a lo largo
    const g = b1 - b2; if (g < 0.016) { const pul = 0.55 + 0.45 * Math.sin(t * 3 - lon * 5 + lat * 7), n = noche ? 0.55 : 1; c = g < 0.006 ? (pul > 0.6 && !noche ? E_BW.oroB : pul > 0.3 ? E_BW.oroL : E_BW.oro) : e_mix(c, pul > 0.5 ? E_BW.oro : E_BW.oroS, (0.4 + pul * 0.3) * n); }
    R.pset(x, y, c);
  }
}

// los restos de un planeta que se deshace: el disco con una parte rota en pedazos que se separan, el núcleo al rojo y
// escombros que se alejan en bucle. rampa de 4 tonos; lado: hacia dónde se rompe (ángulo)
function e_resto(R, t, cx, cy, r, rampa, lado, sem) {
  const P = Array.from({ length: 9 }, (_, k) => { const a = h(k, 1, sem) * E_TAU, d = Math.sqrt(h(k, 2, sem)) * r * 0.9, px = Math.cos(a) * d, py = Math.sin(a) * d;
    const roto = Math.cos(Math.atan2(py, px) - lado) > 0.25 && d > r * 0.3; return [px, py, roto]; });
  const pieza = (x, y) => { let b = 1e9, b2 = 1e9, bi = 0; for (let k = 0; k < P.length; k++) { const d = (x - P[k][0]) ** 2 + (y - P[k][1]) ** 2; if (d < b) { b2 = b; b = d; bi = k; } else if (d < b2) b2 = d; } return [bi, Math.sqrt(b2) - Math.sqrt(b)]; };
  // el núcleo al rojo que asoma por donde se ha roto, con su resplandor
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r * 0.55) continue; const X = cx + i, Y = cy + j; if (X > 274 && Y < 48) continue;
    R.pset(X, Y, e_tono([E_BW.fuegoR, E_BW.fuego, E_BW.fuegoL], (1 - d / (r * 0.55)) * 2.6 + Math.sin(t * 2 + d) * 0.3, X, Y)); }
  for (let k = 0; k < P.length; k++) {
    const [px, py, roto] = P[k], am = Math.atan2(py, px), sep = roto ? 3 + (k % 3) * 2.5 + Math.sin(t * 0.6 + k * 1.3 + sem) * 1.6 : 0, ox = Math.round(Math.cos(am) * sep), oy = Math.round(Math.sin(am) * sep);
    for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) {
      const d2 = x * x + y * y; if (d2 > r * r) continue; const [bi, g] = pieza(x, y); if (bi !== k) continue;
      const X = cx + x + ox, Y = cy + y + oy; if (X > 274 && Y < 48) continue;
      const z = Math.sqrt(1 - d2 / (r * r)), lam = (-0.7 * x - 0.45 * y) / r + 0.45 * z;
      let c = e_tono(rampa, e_cl(lam * 2.4 + 1.1 + (e_vn(x / 3, y / 3, sem) - 0.5) * 1.2, 0, 3), X, Y);
      if (h(x >> 1, y >> 1, sem + 1) > 0.93) c = rampa[Math.max(0, rampa.indexOf(c) - 1)];   // cráteres
      if (g < 1.2 && roto) c = Math.sin(t * 3 + x + y) > 0 ? E_BW.fuegoR : E_BW.fuego; else if (g < 0.8) c = rampa[0];
      R.pset(X, Y, c);
    }
  }
  for (let k = 0; k < 18; k++) { const u = (t * 0.06 + h(k, 31, sem)) % 1, a = lado + (h(k, 32, sem) - 0.5) * 1.6, d = r + 2 + u * 30, X = Math.round(cx + Math.cos(a) * d), Y = Math.round(cy + Math.sin(a) * d);
    if (X > 274 && Y < 48) continue; const c = u < 0.3 ? E_BW.fuego : rampa[h(k, 33, sem) > 0.5 ? 2 : 1]; R.pset(X, Y, c); if (k % 3 === 0 && u < 0.7) { R.pset(X + 1, Y, rampa[1]); R.pset(X, Y + 1, rampa[0]); } }
}

// un centinela diminuto (10 px) con lanza y capa, que respira y cambia el peso; dir 1 mira a la derecha
function e_centinela(R, x, suelo, t, dir = 1, capa = E_BW.verde) {
  const { rect, pset } = R, b = Math.sin(t * 2.2 + x) > 0.7 ? 1 : 0, K = E_BW.k;
  rect(x - 2, suelo - 9 + b, x + 2, suelo - 3, K); rect(x - 1, suelo - 8 + b, x + 1, suelo - 4, capa); pset(x - dir, suelo - 7 + b, E_BW.verdeS);
  rect(x - 1, suelo - 3, x - 1, suelo - 1, K); rect(x + 1, suelo - 3, x + 1, suelo - 1, K);
  rect(x - 1, suelo - 12 + b, x + 1, suelo - 10 + b, E_BW.oroM); pset(x, suelo - 13 + b, E_BW.oroL); pset(x + dir, suelo - 11 + b, K);
  R.linea(x + 3 * dir, suelo - 16, x + 3 * dir, suelo, E_BW.bronceS); pset(x + 3 * dir, suelo - 17, E_BW.oroL); pset(x + 3 * dir, suelo - 18, E_BW.oro);
}

// el mirador y el planeta
function e_vistaPlaneta(R, t, o) {
  const mir = o.mirador !== false, giro = o.giro ?? t * 0.07, P = mir ? [160, 82, 48] : [160, 90, 60];   // con mirador, el halo empieza en y ≥ 20 (la barra del año, sobre cielo)
  e_capa(R, 'bw-espacio', () => e_espacio(R, 0));
  e_titilan(R, t, 46, [0, 0, 319, mir ? 124 : 179], 1); e_fugaz(R, t, 7.3, [0, 16, 300, 110], 2);
  // un planeta lejano y una luna
  R.disco(98, 28, 5, E_BW.esp4); R.disco(97, 27, 4, E_BW.violeta); R.disco(96, 26, 2, E_BW.plataS); R.pset(95, 25, E_BW.plata);
  // los restos de los otros mundos
  e_resto(R, t, 46, 58, 20, [E_BW.esp2, hex('#2a4a7a'), hex('#4a7ab8'), hex('#a8c8f0')], 0.4, 3);
  e_resto(R, t, 250, 98, 14, [E_BW.esp2, hex('#5a2a2a'), hex('#9a4a3a'), hex('#d8885a')], Math.PI + 0.3, 5);
  // el resplandor de oro alrededor del planeta y el planeta
  for (let y = P[1] - P[2] - 14; y < P[1] + P[2] + 14; y++) for (let x = P[0] - P[2] - 14; x < P[0] + P[2] + 14; x++) { const d = Math.hypot(x - P[0], y - P[1]) - P[2]; if (d > 4 && d < 14 && (14 - d) / 10 * 0.5 > e_b4(x, y) + 0.12) e_tinte(R, x, y, E_BW.oroD, 0.45); }
  e_mundo(R, t, P[0], P[1], P[2], giro);
  if (mir) e_mirador(R, t, P);
  return { libre: [40, 280], planeta: { x: P[0], y: P[1], r: P[2] }, mirador: mir ? { baranda: [124, 142], suelo: [142, 180] } : null };
}

// el mirador: la barandilla de balaustres con dos faroles, los centinelas y el suelo de losas de mármol con vetas y el
// reflejo del planeta
function e_mirador(R, t, P) {
  const { rect, pset } = R;
  // el suelo en perspectiva (punto de fuga x 160, y 60), losas alternas, vetas y el reflejo dorado y azul del planeta
  for (let y = 142; y < 180; y++) { const z = (y - 60) / 82, fila = Math.floor((y - 142) / (3 + (y - 142) * 0.22));
    for (let x = 0; x < 320; x++) { const u = (x - 160) / z, col = Math.floor(u / 26 + 100), junta = Math.abs(((u / 26) % 1 + 1) % 1) < 0.045 / z * 1.4 || (y - 142) % (4 + Math.floor((y - 142) * 0.25)) === 0;
      const alt = (col + fila) & 1, ve = Math.abs(Math.sin(u * 0.13 + y * 0.6 + h(col, fila) * 9)) < 0.08;
      let c = e_tono([E_BW.oroD, E_BW.mar3, E_BW.mar2, E_BW.mar1, E_BW.mar0], 0.9 + alt * 1.5 + (y - 142) / 40 + (h(x >> 2, y, 4) - 0.5) * 0.6, x, y);
      if (ve) c = alt ? E_BW.marV : E_BW.mar2; if (junta) c = E_BW.oroS;
      const ref = Math.abs(x - P[0]) < P[2] * 0.8 && y < 165 ? (1 - Math.abs(x - P[0]) / (P[2] * 0.8)) * (165 - y) / 23 : 0;
      if (ref > 0 && ((x + y) & 1)) c = e_mix(c, (y + Math.floor(t * 4)) % 5 === 0 ? E_BW.oroL : E_BW.nebA2, ref * 0.5);
      for (const fx of [30, 282]) if (Math.abs(x - fx) < 3 && y < 160 && (x + y) % 2 === 0) c = e_mix(c, E_BW.fuego, 0.45 * (160 - y) / 18);
      pset(x, y, c); }
  }
  // la barandilla: pasamanos, balaustres de jarrón con luz y sombra, el zócalo
  rect(0, 124, 319, 127, E_BW.oroS); rect(0, 124, 319, 124, E_BW.oroL); rect(0, 125, 319, 125, E_BW.oro); rect(0, 128, 319, 128, E_BW.oroK);
  for (let x = 3; x < 320; x += 7) { if (x % 63 < 7) continue; const perfil = [2, 1, 1, 2, 3, 3, 2, 1, 1, 2];
    for (let j = 0; j < 10; j++) { const w = perfil[j]; rect(x - w, 129 + j, x + w, 129 + j, E_BW.mar1); pset(x - w, 129 + j, E_BW.mar0); pset(x + w, 129 + j, E_BW.mar3); } }
  rect(0, 139, 319, 142, E_BW.mar2); rect(0, 139, 319, 139, E_BW.mar0); rect(0, 142, 319, 142, E_BW.oroK);
  for (let x = 0; x < 320; x += 5) pset(x, 141, E_BW.mar3);
  // los pilares con faroles (cada 63 px)
  for (const px of [30, 93, 156, 219, 282]) { rect(px - 4, 118, px + 4, 142, E_BW.oroK); rect(px - 3, 118, px + 3, 141, E_BW.oroM); rect(px - 3, 118, px - 2, 141, E_BW.oroL); rect(px + 2, 120, px + 3, 141, E_BW.oroS);
    rect(px - 5, 116, px + 5, 118, E_BW.oroS); rect(px - 5, 116, px + 5, 116, E_BW.oroL);
    if (px === 30 || px === 282) { const fl = Math.sin(t * 9 + px) > 0 ? 1 : 0; rect(px - 2, 108, px + 2, 115, E_BW.oroK); rect(px - 1, 109, px + 1, 114, fl ? E_BW.fuegoL : E_BW.fuego); pset(px, 107 - fl, E_BW.oroL);
      for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (i * i + j * j < 36 && (i * i + j * j) / 36 < e_b4(px + i, 111 + j) * (0.8 + fl * 0.2) && (i * i + j * j > 6)) e_tinte(R, px + i, 111 + j, E_BW.fuego, 0.3); } }
  c_bwSueloMirador(R, t);
  e_centinela(R, 18, 147, t, 1); e_centinela(R, 300, 147, t + 1.3, -1);
}
function e_miradorDelante(R, t) {
  const { rect, pset } = R;
  rect(0, 174, 319, 179, E_BW.oroS); rect(0, 174, 319, 174, E_BW.oroL); rect(0, 175, 319, 175, E_BW.oro);
  for (let x = 4; x < 320; x += 16) { rect(x, 176, x + 7, 178, E_BW.oroM); pset(x + 3, 177, (Math.floor(t * 2) + x) % 48 === 4 ? E_BW.oroB : E_BW.gema); }
}

const E_TRONO = { x: 160, asiento: 110, estrado: 128, halo: [160, 88] };

function e_salaTrono(R, t, o) {
  const { rect, pset } = R;
  e_capa(R, 'bw-trono', () => e_salaTronoFija(R));
  // el árbol de luz: hojas que titilan y luz que cae de las ramas (dentro del nicho)
  R.recorte([66, 16, 254, 120]);
  for (const [x, y, k] of e_hojas()) { const b = Math.sin(t * (1.2 + (k % 5) * 0.4) + k * 2.3); if (b < -0.3) continue; const c = b > 0.75 ? E_BW.oroB : b > 0.3 ? E_BW.oroL : k % 3 ? E_BW.oro : E_BW.alma; pset(x, y, c); if (b > 0.9) { pset(x + 1, y, E_BW.oro); pset(x, y + 1, E_BW.oro); } }
  for (let k = 0; k < 26; k++) { const H = e_hojas(), [hx, hy] = H[(k * 13) % H.length], u = (t * 0.12 + h(k, 41)) % 1, x = Math.round(hx + Math.sin(u * 9 + k) * 3), y = Math.round(hy + u * 70); if (y < 122) pset(x, y, u < 0.6 ? E_BW.oroL : E_BW.oroM); }
  R.recorte(null);
  // los braseros a los lados de la escalinata
  for (const bx of [92, 228]) e_brasero(R, bx, 128, t);
  // el halo detrás de la cabeza del sentado
  const hl = o.halo ?? 0; if (hl > 0) {
    const [hx, hy] = E_TRONO.halo, rr = 11 + hl * 5;
    for (let j = -30; j <= 30; j++) for (let i = -30; i <= 30; i++) { const d = Math.hypot(i, j), a = Math.atan2(j, i) + t * 0.4, ray = Math.abs(Math.sin(a * 8)) > 0.86;
      if (d > rr + 2 && d < rr + 4 + hl * 14 && ray && (1 - (d - rr) / (4 + hl * 14)) * hl > e_b4(hx + i, hy + j)) e_tinte(R, hx + i, hy + j, E_BW.oroL, 0.6);
      if (d < rr + 5 && d > rr - 3) { const g = 1 - Math.abs(d - rr) / 3.2; if (g * hl > e_b4(hx + i, hy + j) * 0.8) e_tinte(R, hx + i, hy + j, Math.abs(d - rr) < 0.9 ? E_BW.oroB : E_BW.oro, 0.4 + g * 0.6); } }
  }
  c_bwSueloTrono(R, t);
  // guardias diminutos en las columnatas y el brillo que recorre la alfombra
  e_centinela(R, 34, 138, t, 1); e_centinela(R, 288, 138, t + 2, -1);
  const g = (t * 0.25) % 1; for (let i = 0; i < 4; i++) { const y = Math.round(150 + g * 30 - i); if (y > 148 && y < 180) e_tinte(R, 160 + ((i * 7) % 11) - 5, y, E_BW.verdeL, 0.6); }
  return { libre: [40, 280], suelo: 152, trono: { x: 160, asiento: [E_TRONO.x, E_TRONO.asiento], estrado: E_TRONO.estrado, respaldo: [134, 22, 186, 106] }, halo: { x: E_TRONO.halo[0], y: E_TRONO.halo[1], v: hl } };
}
// las hojas del árbol de luz (una vez): la lista [x, y, k] de los extremos de las ramas
let E_HOJAS = null;

function e_hojas() { if (!E_HOJAS) e_arbolLuz(null); return E_HOJAS; }

// el árbol de luz: un tronco que sube detrás del trono y ramas en abanico; sin R solo calcula las hojas
function e_arbolLuz(R) {
  const hojas = [];
  const rama = (x, y, ang, largo, grueso, prof, k) => {
    const x1 = x + Math.cos(ang) * largo, y1 = y + Math.sin(ang) * largo;
    if (R) { R.linea(x, y, x1, y1, (xx, yy) => { for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) if (Math.abs(i) + Math.abs(j) > grueso && (Math.abs(i) + Math.abs(j)) / 6 < e_b4(xx + i, yy + j) * 0.7) e_tinte(R, xx + i, yy + j, E_BW.oro, 0.35); return null; });
      for (let i = -grueso; i <= grueso; i++) R.linea(Math.round(x + i), Math.round(y), Math.round(x1 + i * 0.6), Math.round(y1), Math.abs(i) === grueso && grueso > 0 ? E_BW.oroM : grueso > 1 && Math.abs(i) === 0 ? E_BW.oroB : E_BW.oroL); }
    if (prof === 0) { if (R) for (let j = -6; j <= 6; j++) for (let i = -8; i <= 8; i++) { const d = Math.hypot(i / 8, j / 6); if (d < 1 && (1 - d) * 0.8 > e_b4(x1 + i, y1 + j)) e_tinte(R, Math.round(x1 + i), Math.round(y1 + j), (i + j) % 3 ? E_BW.oroM : E_BW.alma, 0.4 + (1 - d) * 0.3); }
      for (let n = 0; n < 7; n++) hojas.push([Math.round(x1 + (h(k, n, 1) - 0.5) * 12), Math.round(y1 + (h(k, n, 2) - 0.5) * 8), k * 7 + n]); return; }
    const ab = 0.42 + h(k, 0, 3) * 0.2;
    rama(x1, y1, ang - ab, largo * 0.74, Math.max(0, grueso - 1), prof - 1, k * 2 + 1); rama(x1, y1, ang + ab, largo * 0.74, Math.max(0, grueso - 1), prof - 1, k * 2 + 2);
  };
  rama(160, 124, -Math.PI / 2, 30, 3, 5, 1);
  E_HOJAS = hojas.filter(([x, y]) => x > 68 && x < 252 && y > 18 && y < 118);
}

// el fondo fijo de la sala: bóveda, sillares de oro, el nicho con el espacio y el árbol, columnatas con ventanales, el
// trono, el estrado, la escalinata con la alfombra y el suelo de mármol en perspectiva
function e_salaTronoFija(R) {
  const { rect, pset, poligono, linea, disco } = R;
  // la bóveda de casetones, en penumbra (la zona de Atom queda tranquila)
  for (let y = 0; y < 18; y++) for (let x = 0; x < 320; x++) { const cu = x % 24, cv = y % 9, borde = cu < 2 || cv < 2;
    pset(x, y, borde ? (cu === 0 || cv === 0 ? E_BW.oroK : E_BW.oroD) : e_tono([E_BW.oroK, E_BW.oroD, E_BW.oroS], 0.6 + (cv / 9) * 0.8 + (h(x >> 1, y) - 0.5) * 0.4 - (x > 270 ? 0.3 : 0), x, y)); }
  rect(0, 16, 319, 17, E_BW.oroS); rect(0, 16, 319, 16, E_BW.oroM);
  // la pared de sillares de oro con vetas, más oscura arriba
  for (let y = 18; y < 128; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor((y - 18) / 9), jx = (x + (fila & 1) * 11) % 22, jy = (y - 18) % 9;
    let c = e_tono([E_BW.oroK, E_BW.oroD, E_BW.oroS, E_BW.oroM], 1.3 + (y - 18) / 110 * 1.2 + (h(Math.floor((x + (fila & 1) * 11) / 22), fila, 2) - 0.5) * 0.7 + (h(x >> 1, y >> 1, 3) - 0.5) * 0.3 - (x > 268 && y < 50 ? 0.5 : 0), x, y);
    if (Math.abs(Math.sin(x * 0.21 + y * 0.5 + fila * 3)) < 0.05 && jx > 1) c = E_BW.oroD; if (jx === 0 || jy === 0) c = E_BW.oroK; else if (jy === 1 || jx === 1) c = e_mix(c, E_BW.oroL, 0.25);
    pset(x, y, c); }
  // el nicho en arco detrás del trono, con el espacio y la luz del árbol
  const nicho = (x, y) => { const dx = (x - 160) / 94; return y >= 20 && y < 124 && Math.abs(dx) < 1 && (y > 64 || ((x - 160) / 94) ** 2 + ((y - 64) / 46) ** 2 < 1); };
  for (let y = 16; y < 126; y++) for (let x = 60; x < 260; x++) { const n = nicho(x, y), n2 = !n && (nicho(x - 3, y) || nicho(x + 3, y) || nicho(x, y + 3) || nicho(x, y - 3));
    if (n) { const g = Math.exp(-(((x - 160) / 60) ** 2 + ((y - 70) / 50) ** 2)), s = h(x, y, 44); pset(x, y, s > 0.995 ? E_BW.plata : e_tono([E_BW.esp1, E_BW.esp3, E_BW.esp5, E_BW.oroD, E_BW.oroS], g * 4 + e_vn(x / 12, y / 10, 45) * 0.9, x, y)); }
    else if (n2) pset(x, y, (x + y) % 3 ? E_BW.oroM : E_BW.oroL); }
  for (let a = 0; a < 60; a++) { const an = Math.PI + a / 59 * Math.PI, x = Math.round(160 + Math.cos(an) * 99), y = Math.round(64 + Math.sin(an) * 50); rect(x - 1, y - 1, x + 1, y + 1, a % 5 === 0 ? E_BW.oroL : E_BW.oroS); }
  e_arbolLuz(R);
  // las columnatas: columnas acanaladas y, entre ellas, ventanales con el espacio y un trozo del planeta
  for (const [wx0, wx1] of [[16, 46], [274, 304]]) { const top = 44;
    for (let y = top; y < 118; y++) for (let x = wx0; x <= wx1; x++) { const ar = y > top + 8 || ((x - (wx0 + wx1) / 2) / ((wx1 - wx0) / 2)) ** 2 + ((y - top - 8) / 8) ** 2 < 1; if (!ar) continue;
      const s = h(x, y, 46); pset(x, y, s > 0.993 ? E_BW.plata : e_tono([E_BW.esp1, E_BW.esp2, E_BW.esp3, E_BW.esp4], e_vn(x / 9, y / 9, 47) * 2.6, x, y)); }
    const pc = wx0 < 100 ? [wx1 + 10, 110, 34] : [wx0 - 10, 110, 34]; R.recorte([wx0, top, wx1, 117]); e_mundo(R, 0, pc[0], pc[1], pc[2], wx0 < 100 ? 1.1 : 3.4); R.recorte(null);
    rect(wx0 - 2, 117, wx1 + 2, 120, E_BW.oroS); rect(wx0 - 2, 117, wx1 + 2, 117, E_BW.oroL); linea((wx0 + wx1) >> 1, top, (wx0 + wx1) >> 1, 116, E_BW.oroS); rect(wx0, 80, wx1, 80, E_BW.oroS); }
  for (const cx of [8, 54, 266, 312]) { for (let y = 22; y < 136; y++) for (let x = cx - 5; x <= cx + 5; x++) { const u = (x - cx + 5) / 10, fl = (x - cx + 5) % 3 === 0;
      pset(x, y, e_tono([E_BW.oroK, E_BW.oroD, E_BW.oroS, E_BW.oroM, E_BW.oroL], (1 - Math.abs(u - 0.32) * 2.2) * 3.4 + 0.6 - (fl ? 0.9 : 0) - (cx > 260 && y < 50 ? 1.2 : 0), x, y)); }
    rect(cx - 7, 22, cx + 7, 26, cx > 260 ? E_BW.oroD : E_BW.oroS); rect(cx - 7, 22, cx + 7, 22, cx > 260 ? E_BW.oroS : E_BW.oroL); rect(cx - 7, 130, cx + 7, 136, E_BW.oroS); rect(cx - 7, 130, cx + 7, 130, E_BW.oroL); }
  // el suelo de mármol pulido en perspectiva, con el reflejo del árbol y de las columnas
  for (let y = 128; y < 180; y++) { const z = (y - 70) / 58;
    for (let x = 0; x < 320; x++) { const u = (x - 160) / z, col = Math.floor(u / 22 + 100), fila = Math.floor((y - 128) / (2 + (y - 128) * 0.3)), alt = (col + fila) & 1;
      let c = e_tono([E_BW.mar3, E_BW.mar2, E_BW.mar1, E_BW.mar0], 0.8 + alt * 1.1 + (y - 128) / 40 + (h(x >> 1, y, 48) - 0.5) * 0.4, x, y);
      if (Math.abs(Math.sin(u * 0.17 + y * 0.9 + col)) < 0.06) c = E_BW.marV; if (Math.abs(((u / 22) % 1 + 1) % 1) < 0.05 / z) c = E_BW.oroS;
      const ref = Math.exp(-(((x - 160) / 70) ** 2)) * Math.max(0, 1 - (y - 128) / 46); if (ref * 0.7 > e_b4(x, y) + 0.1) c = e_mix(c, E_BW.oroL, 0.35);
      for (const cx of [8, 54, 266, 312]) if (Math.abs(x - cx) < 5 && y < 160 && (y & 1)) c = e_mix(c, E_BW.oroM, 0.35);
      pset(x, y, c); } }
  // el estrado y la escalinata con la alfombra verde
  rect(104, 120, 216, 128, E_BW.mar1); rect(104, 120, 216, 121, E_BW.mar0); rect(104, 128, 216, 129, E_BW.oroS);
  for (let s = 0; s < 4; s++) { const y0 = 130 + s * 5, w = 56 + s * 8; rect(160 - w, y0 - 1, 160 + w, y0 + 3, E_BW.mar2); rect(160 - w, y0 - 1, 160 + w, y0 - 1, E_BW.mar0); rect(160 - w, y0 + 3, 160 + w, y0 + 3, E_BW.mar3);
    for (let x = 160 - w; x <= 160 + w; x += 9) pset(x, y0 + 1, E_BW.marV); rect(160 - w, y0 - 1, 160 - w + 1, y0 + 3, E_BW.oroS); rect(160 + w - 1, y0 - 1, 160 + w, y0 + 3, E_BW.oroS); }
  for (let y = 120; y < 180; y++) { const w = 15 + Math.max(0, y - 128) * 0.35; for (let x = Math.round(160 - w); x <= 160 + w; x++) { const bo = x - (160 - w) < 2 || 160 + w - x < 2; const esc = y >= 129 && y < 150 && (y - 129) % 5 === 4;
      pset(x, y, bo ? E_BW.oroM : esc ? E_BW.verdeD : e_tono([E_BW.verdeD, E_BW.verdeS, E_BW.verde, E_BW.verdeL], 1.5 + (y < 128 ? 0.3 : 0) + (h(x, y, 49) - 0.5) * 0.6 - (x > 160 ? 0.4 : 0), x, y)); }
    if (y > 150 && y % 6 === 0) for (let x = Math.round(160 - w) + 4; x < 160 + w - 3; x += 6) pset(x, y, E_BW.oroM); }
  // EL TRONO: las alas, el respaldo con la corona y el aro de cuatro puntas, el asiento y las patas
  for (const [x0, x1] of [[124, 134], [186, 196]]) { const izq = x0 < 160;
    poligono([[x0, 128], [x0, 62], [izq ? x1 : x0, 48], [x1, 62], [x1, 128]], (x, y) => e_tono([E_BW.oroK, E_BW.oroS, E_BW.oroM, E_BW.oroL], (izq ? 2.2 - (x - x0) * 0.15 : 1.4 - (x - x0) * 0.12) + ((y % 7) === 0 ? -0.8 : 0), x, y)); }
  rect(134, 30, 186, 106, E_BW.oroK);
  for (let y = 31; y <= 105; y++) for (let x = 135; x <= 185; x++) { const u = (x - 135) / 50; pset(x, y, e_tono([E_BW.oroD, E_BW.oroS, E_BW.oroM, E_BW.oro, E_BW.oroL], 3.3 - u * 2.2 + (y % 12 === 0 ? -1 : 0), x, y)); }
  for (let k = 0; k < 7; k++) { const x = 136 + k * 8, alto = k === 3 ? 12 : k % 2 ? 6 : 8; poligono([[x - 3, 31], [x + 0.5, 31 - alto], [x + 4, 31]], (xx, yy) => (xx < x ? E_BW.oroL : E_BW.oroS)); pset(x, 31 - alto + 2, E_BW.gema); }
  rect(142, 40, 178, 100, E_BW.oroK); for (let y = 41; y < 100; y++) for (let x = 143; x < 178; x++) pset(x, y, e_tono([E_BW.verdeD, E_BW.verdeS, E_BW.verde, E_BW.verdeL], 2.4 - (x - 143) / 35 * 1.6 - (y - 41) / 59 * 0.6 + ((x * 3 + y * 2) % 9 === 0 ? 0.6 : 0), x, y));
  R.anillo(160, 56, 7, E_BW.oroL); R.anillo(160, 56, 6, E_BW.oroS); for (const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) { linea(160 + dx * 8, 56 + dy * 8, 160 + dx * 11, 56 + dy * 11, E_BW.oroL); pset(160 + dx * 12, 56 + dy * 12, E_BW.oro); }
  disco(160, 56, 2, E_BW.gema); pset(159, 55, E_BW.oroB);
  rect(136, 106, 184, 111, E_BW.verdeD); rect(137, 106, 183, 108, E_BW.verdeL); rect(137, 109, 183, 110, E_BW.verde); for (let x = 140; x < 182; x += 6) pset(x, 108, E_BW.verdeS);
  rect(134, 111, 186, 127, E_BW.oroK); for (let y = 112; y < 127; y++) for (let x = 135; x < 186; x++) { const re = (x - 135) % 10 === 0 || y === 116 || y === 123; pset(x, y, re ? E_BW.oroS : e_tono([E_BW.oroS, E_BW.oroM, E_BW.oro], 1.9 - (x - 135) / 50 * 1.3, x, y)); }
  disco(160, 119, 3, E_BW.oroK); disco(160, 119, 2, E_BW.verdeL); pset(159, 118, E_BW.oroB);
  for (const px of [134, 182]) { rect(px, 124, px + 4, 128, E_BW.oroS); rect(px, 124, px + 4, 124, E_BW.oroL); pset(px + 1, 128, E_BW.oroK); pset(px + 3, 128, E_BW.oroK); }
  // la sombra del trono en el estrado
  for (let x = 120; x < 202; x++) for (let y = 128; y < 131; y++) if ((x + y) & 1) e_tinte(R, x, y, E_BW.oroK, 0.4);
}

// un brasero de oro con fuego vivo y su luz (base en suelo)
function e_brasero(R, x, suelo, t) {
  const { rect, pset, disco } = R;
  rect(x - 1, suelo - 12, x + 1, suelo, E_BW.oroS); rect(x - 4, suelo - 1, x + 4, suelo, E_BW.oroK); rect(x - 3, suelo - 2, x + 3, suelo - 2, E_BW.oroM);
  rect(x - 6, suelo - 17, x + 6, suelo - 12, E_BW.oroK); rect(x - 5, suelo - 16, x + 5, suelo - 13, E_BW.oroM); rect(x - 5, suelo - 16, x + 5, suelo - 16, E_BW.oroL);
  for (let k = 0; k < 9; k++) { const u = ((t * 1.6 + h(k, 51)) % 1), fx = Math.round(x + (h(k, 52) - 0.5) * 9 + Math.sin(t * 7 + k) * 1.2), fy = Math.round(suelo - 17 - u * 11);
    const c = u < 0.3 ? E_BW.fuegoL : u < 0.65 ? E_BW.fuego : E_BW.fuegoR; pset(fx, fy, c); if (u < 0.5) pset(fx, fy + 1, c); }
  disco(x, suelo - 19, 2 + (Math.sin(t * 11 + x) > 0 ? 1 : 0), E_BW.fuego); pset(x, suelo - 20, E_BW.fuegoL);
  for (let j = -12; j <= 12; j++) for (let i = -12; i <= 12; i++) { const d = Math.hypot(i, j); if (d > 4 && d < 12 && (12 - d) / 20 > e_b4(x + i, suelo - 18 + j)) e_tinte(R, x + i, suelo - 18 + j, E_BW.fuego, 0.25); }
}

// los brazos del trono y las bases de las columnas del primer término (por delante del que se sienta)
function e_tronoDelante(R, t) {
  const { rect, pset } = R;
  for (const [x0, x1] of [[124, 140], [180, 196]]) { const izq = x0 < 160;
    for (let y = 98; y <= 127; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), rollo = y < 104;
      if (rollo && Math.hypot(u - 0.5, (y - 101) / 5) > 0.75 && y < 99) continue;
      pset(x, y, e_tono([E_BW.oroK, E_BW.oroS, E_BW.oroM, E_BW.oro, E_BW.oroL], (rollo ? 3.6 - (y - 98) * 0.4 : 2.6) - u * 1.5 + (y % 8 === 0 && !rollo ? -1 : 0), x, y)); }
    rect(x0, 104, x1, 104, E_BW.oroK); rect(x0, 127, x1, 127, E_BW.oroK); rect(izq ? x1 : x0, 98, izq ? x1 : x0, 127, E_BW.oroK);
    const gx = (x0 + x1) >> 1; R.disco(gx, 114, 2, E_BW.oroK); R.disco(gx, 114, 1, Math.sin(t * 2 + x0) > 0.6 ? E_BW.gema : E_BW.verdeL); pset(gx - 1, 101, E_BW.oroB); }
  for (const [x0, x1] of [[0, 13], [306, 319]]) { for (let y = 148; y < 180; y++) for (let x = x0; x <= x1; x++) pset(x, y, e_tono([E_BW.oroK, E_BW.oroD, E_BW.oroS, E_BW.oroM], 2.6 - Math.abs((x - x0) / (x1 - x0) - (x0 ? 0.2 : 0.8)) * 2.6 + (y < 152 ? 0.6 : 0), x, y));
    rect(x0, 148, x1, 148, E_BW.oroL); rect(x0, 160, x1, 161, E_BW.oroK); }
}

// la máscara de la figura cósmica (capucha y hombros): 1 dentro
let E_FIG = null;

function e_figura() {
  if (E_FIG) return E_FIG; const m = new Uint8Array(320 * 180);
  for (let y = 14; y < 152; y++) for (let x = 0; x < 320; x++) { const dx = x - 160;
    const capucha = (dx / 34) ** 2 + ((y - 50) / 36) ** 2 < 1 && y > 14, s = e_cl((y - 64) / 36), w = y > 64 ? 30 + 88 * s * s * (3 - 2 * s) + Math.max(0, y - 100) * 0.4 : 0;
    if (capucha || Math.abs(dx) < w) m[y * 320 + x] = 1; }
  return (E_FIG = m);
}

const e_enFig = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180 && e_figura()[y * 320 + x] === 1;

function e_juezFijo(R) {
  const { pset } = R; e_espacio(R, 4);
  // la figura: cielo estrellado de dentro, más oscuro que el vacío, con su filo de luz (oro a la izquierda, violeta a la derecha)
  for (let y = 14; y < 152; y++) for (let x = 0; x < 320; x++) { if (!e_enFig(x, y)) continue;
    const borde = !e_enFig(x - 2, y) || !e_enFig(x + 2, y) || !e_enFig(x, y - 2), borde1 = !e_enFig(x - 1, y) || !e_enFig(x + 1, y) || !e_enFig(x, y - 1);
    let c = e_tono([E_BW.esp0, E_BW.esp1, E_BW.esp2, E_BW.esp4, E_BW.violetaS], e_vn(x / 14, y / 11, 60) * 3 + e_vn(x / 5, y / 5, 61) * 0.9 - 0.4 + (Math.abs(Math.sin((x - 160) * 0.05 + y * 0.04)) < 0.1 ? 0.8 : 0), x, y);
    if (h(x, y, 62) > 0.992) c = E_BW.plata;
    if (borde1) c = x < 160 ? E_BW.oroL : E_BW.plata; else if (borde) c = x < 160 ? E_BW.oroM : E_BW.violeta;
    pset(x, y, c); }
  // los pliegues del manto: líneas de luz tenue
  for (const [x0, x1] of [[96, 70], [124, 112], [196, 208], [224, 250]]) R.linea(x0, 82, x1, 150, (x, y) => (e_enFig(x, y) && (y & 1) ? E_BW.violetaS : null));
  // las tres caras de luz: la de sombra (derecha), la plateada de perfil (izquierda) y la dorada de frente (centro)
  const cara = (cx, cy, rx, ry, rampa, luzX, perfil) => { for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx - 2; x <= cx + rx + 2; x++) {
    let dx = (x - cx) / rx; const dy = (y - cy) / ry; if (perfil) { const nariz = dy > -0.25 && dy < 0.15 ? 0.22 * (1 - Math.abs(dy + 0.05) * 5) : 0; dx += perfil * Math.max(0, nariz); }
    if (dx * dx + dy * dy > 1) continue; pset(x, y, e_tono(rampa, (1 - Math.hypot(dx - luzX, dy + 0.3)) * (rampa.length - 0.5) + 0.3, x, y)); } };
  cara(181, 52, 9, 13, [E_BW.esp1, E_BW.violetaS, E_BW.violeta], 0.5, 0);
  cara(139, 52, 9, 13, [E_BW.plataS, E_BW.plata, E_BW.lunaL], -0.4, -1);
  cara(160, 47, 11, 15, [E_BW.luz2, E_BW.luz1, E_BW.luz0, E_BW.oroB], -0.2, 0);
  // los rasgos, apenas: cejas y ojos cerrados, la nariz y la boca en tono de sombra (sin expresión)
  R.linea(154, 44, 157, 44, E_BW.luz2); R.linea(163, 44, 166, 44, E_BW.luz2); R.linea(160, 46, 160, 51, E_BW.luz1); R.linea(157, 55, 163, 55, E_BW.luz2);
  R.linea(133, 48, 136, 48, E_BW.plataS); R.linea(184, 48, 187, 48, E_BW.violeta);
  // el suelo de luz: un plano cristalino con un resplandor central y juntas hexagonales en perspectiva
  for (let y = 144; y < 180; y++) { const z = (y - 100) / 52; for (let x = 0; x < 320; x++) {
    const u = (x - 160) / z / 16, v = (y - 144) / (2 + (y - 144) * 0.25), g = Math.exp(-(((x - 160) / 110) ** 2 + ((y - 156) / 30) ** 2));
    const junta = Math.abs((u + (Math.floor(v) & 1) * 0.5) % 1) < 0.06 / z || (v % 1) < 0.12;
    let c = e_tono([E_BW.esp1, E_BW.esp3, E_BW.esp5, E_BW.violeta, E_BW.luz2], g * 3.6 + 0.4 + (h(x >> 1, y, 63) - 0.5) * 0.5, x, y);
    if (junta) c = e_mix(c, g > 0.4 ? E_BW.luz1 : E_BW.violeta, 0.55); pset(x, y, c); } }
  R.rect(0, 144, 319, 144, E_BW.violeta); for (let x = 0; x < 320; x++) if (Math.exp(-(((x - 160) / 90) ** 2)) > e_b4(x, 144)) pset(x, 144, E_BW.luz1);
}

// la niña dormida de lado sobre la camilla (pequeña: 34 × 9): la almohada, el pelo rubio, la cara, la manta azul que
// sube y baja con la respiración; despierta 0–1: abre los ojos y alza la cabeza. (x, y): la esquina de la almohada, y = la cara de arriba de la camilla
function e_ninaDormida(R, x, y, t, despierta = 0) {
  const { rect, pset } = R, K = E_BW.k, PIEL = hex('#f0c8a0'), PIELs = hex('#d8a07a'), PELO = hex('#f0d070'), PELOl = hex('#f8e4a0'), PELOs = hex('#c8a040'), MANTA = hex('#3a5ac8'), MANTAs = hex('#2a4498'), MANTAl = hex('#6a8ae0');
  const resp = Math.sin(t * 1.8) > 0 ? 1 : 0, alza = Math.round(despierta * 2);
  rect(x - 2, y - 4, x + 9, y - 1, K); rect(x - 1, y - 3, x + 8, y - 1, hex('#f2eee2')); rect(x - 1, y - 1, x + 8, y - 1, hex('#c8c0b0'));   // la almohada
  rect(x + 9, y - 7 - resp, x + 34, y - 1, K); rect(x + 10, y - 6 - resp, x + 33, y - 1, MANTA); rect(x + 10, y - 6 - resp, x + 33, y - 6 - resp, MANTAl); rect(x + 10, y - 2, x + 33, y - 1, MANTAs);
  for (let i = x + 13; i < x + 33; i += 5) { pset(i, y - 3, MANTAs); pset(i + 1, y - 4 - resp, MANTAl); } rect(x + 31, y - 8, x + 33, y - 6, MANTA); pset(x + 32, y - 8, MANTAl);   // los pies bajo la manta
  const hy = y - 10 - alza; rect(x, hy, x + 9, hy + 8, K); rect(x + 2, hy + 2, x + 8, hy + 7, PIEL); rect(x + 1, hy + 1, x + 4, hy + 7, PELO); rect(x + 1, hy + 1, x + 8, hy + 2, PELO);
  pset(x + 2, hy + 2, PELOl); pset(x + 3, hy + 1, PELOl); pset(x + 5, hy + 1, PELOl); rect(x - 2, hy + 5, x + 1, hy + 9, PELO); pset(x - 1, hy + 8, PELOs); pset(x + 1, hy + 6, PELOs);
  pset(x + 8, hy + 5, PIELs); pset(x + 7, hy + 6, hex('#e8a0a0'));
  if (despierta > 0.5) { pset(x + 6, hy + 4, K); pset(x + 6, hy + 3, PIEL); if (despierta > 0.8) pset(x + 7, hy + 7, hex('#c86a6a')); } else { pset(x + 6, hy + 4, PIELs); pset(x + 7, hy + 4, PIELs); }
}

function e_juez(R, t, o) {
  const { pset } = R, fig = e_figura(), dsp = o.despierta ?? 0;
  e_capa(R, 'bw-juez', () => e_juezFijo(R));
  // los rayos de luz que giran detrás de la cabeza (solo fuera de la figura) y las estrellas que titilan
  for (let j = -76; j <= 40; j++) for (let i = -110; i <= 110; i++) { const x = 160 + i, y = 48 + j; if (y < 15 || y > 143 || fig[y * 320 + x] || (x > 270 && y < 48)) continue;
    const d = Math.hypot(i, j), a = Math.atan2(j, i) + t * 0.05; if (d < 36 || d > 118) continue; const r = Math.sin(a * 11) * Math.sin(a * 5 + t * 0.3);
    if (r > 0.6 && (1 - (d - 36) / 82) * 0.75 > e_b4(x, y) + 0.15) e_tinte(R, x, y, E_BW.luz1, 0.22 + (r - 0.6) * 0.6); }
  e_titilan(R, t, 40, [0, 0, 319, 143], 6, (x, y) => !fig[y * 320 + x]);
  // las estrellas de dentro de la figura, que derivan despacio, y el latido de las caras
  for (let k = 0; k < 60; k++) { const x = Math.round(40 + ((h(k, 71) * 240 + t * (1 + h(k, 72) * 2)) % 240)), y = Math.round(18 + h(k, 73) * 132 + Math.sin(t * 0.4 + k) * 2);
    if (fig[y * 320 + x] && e_enFig(x - 2, y) && e_enFig(x + 2, y) && e_enFig(x, y - 2)) pset(x, y, Math.sin(t * 2 + k) > 0.4 ? E_BW.plata : E_BW.violeta); }
  for (let k = 0; k < 220; k++) for (let b = 0; b < 2; b++) { const rr = k * 0.17, a = k * 0.075 + b * Math.PI + t * 0.12, x = Math.round(160 + Math.cos(a) * rr * 1.5), y = Math.round(108 + Math.sin(a) * rr * 0.75 + h(k, b, 74) * 2 - 1);
    if (!fig[y * 320 + x] || h(k, b, 75) > 0.75) continue; const f = 1 - k / 220; pset(x, y, f > 0.75 ? E_BW.luz0 : h(k, b, 76) > 0.6 ? E_BW.plata : f > 0.4 ? E_BW.violeta : E_BW.esp6); }
  for (let j = -5; j <= 5; j++) for (let i = -8; i <= 8; i++) { const d = Math.hypot(i / 8, j / 5); if (d < 1 && (1 - d) > e_b4(160 + i, 108 + j) * 0.9) e_tinte(R, 160 + i, 108 + j, E_BW.luz0, 0.6 * (1 - d)); }
  const lat = 0.5 + 0.5 * Math.sin(t * 1.3); for (let y = 33; y < 62; y++) for (let x = 149; x < 172; x++) if (((x - 160) / 11) ** 2 + ((y - 47) / 15) ** 2 < 1 && lat * 0.35 > e_b4(x, y)) e_tinte(R, x, y, E_BW.oroB, 0.5);
  // las ondas en el suelo de luz que salen de la camilla
  for (let k = 0; k < 3; k++) { const u = ((t * 0.35 + k / 3) % 1), rx = 26 + u * 120, ry = 5 + u * 16; for (let a = 0; a < E_TAU; a += 1 / rx) { const x = Math.round(160 + Math.cos(a) * rx), y = Math.round(154 + Math.sin(a) * ry); if (y > 145 && (1 - u) > e_b4(x, y)) e_tinte(R, x, y, E_BW.luz1, 0.4 * (1 - u)); } }
  // el haz de luz cálida que baja sobre la niña
  for (let y = 15; y < 142; y++) { const w = 7 + (y - 15) * 0.13, ab = Math.sin(t * 0.8 + y * 0.05) * 0.06; for (let x = Math.round(160 - w); x <= 160 + w; x++) { const g = 1 - Math.abs(x - 160) / w; if ((g * (0.35 + ab) + (y > 110 ? 0.1 : 0)) > e_b4(x, y) * 0.9 + 0.12) e_tinte(R, x, y, E_BW.luz1, 0.28 + g * 0.2); } }
  // la camilla de luz que flota, su resplandor de debajo y la niña dormida
  const b = Math.round(Math.sin(t * 1.1)), cy = 140 + b;
  for (let j = 0; j < 7; j++) for (let i = -24; i <= 24; i++) if ((1 - Math.abs(i) / 24) * (1 - j / 7) > e_b4(160 + i, cy + 4 + j)) e_tinte(R, 160 + i, cy + 4 + j, E_BW.luz1, 0.5);
  R.rect(138, cy, 182, cy + 3, E_BW.luz2); R.rect(138, cy, 182, cy, E_BW.oroB); R.rect(139, cy + 1, 181, cy + 1, E_BW.luz0); R.rect(140, cy + 3, 180, cy + 3, E_BW.oroM);
  for (let x = 140; x < 182; x += 7) pset(x + Math.floor(t * 6) % 7, cy + 2, E_BW.oroB);
  e_ninaDormida(R, 142, cy, t, dsp);
  e_motas(R, t, 14, [146, 30, 174, 138], E_BW.oroB, E_BW.luz1, 8);
  return { libre: [30, 280], suelo: 152, camilla: { x0: 138, x1: 182, y: 140 }, nina: { x: 160, y: cy, cabeza: [147, cy - 6 - Math.round(dsp * 2)] }, figura: { x: 160, caras: 48, hombros: 90, x0: 42, x1: 278 }, arrodillado: { x: 100, suelo: 152 } };
}

// el polvo de luz del que se desvanece (u 0–1): motas doradas y verdes que suben del arrodillado (x 100–116, y 128–152)
// hacia la luz de la niña; devuelve el centro
function e_polvoDesvanece(R, t, u) {
  if (u <= 0) return null; const n = Math.round(20 + u * 130);
  for (let k = 0; k < n; k++) { const v = (h(k, 81) + t * (0.15 + h(k, 82) * 0.2)) % 1, x0 = 100 + h(k, 83) * 16, y0 = 128 + h(k, 84) * 24;
    const x = Math.round(x0 + v * (18 + h(k, 85) * 30) + Math.sin(t * 2 + k) * 2), y = Math.round(y0 - v * (30 + u * 40)); if (y < 16) continue;
    const c = v < 0.3 ? E_BW.oroB : k % 3 ? E_BW.oroL : E_BW.alma; R.pset(x, y, c); if (v < 0.35 && k % 2 === 0) { e_tinte(R, x + 1, y, E_BW.oro, 0.7); e_tinte(R, x, y + 1, E_BW.oro, 0.5); } }
  for (let j = -16; j <= 16; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i / 14, j / 16); if (d < 1 && (1 - d) * u * 0.7 > e_b4(108 + i, 138 + j)) e_tinte(R, 108 + i, 138 + j, E_BW.oroL, 0.35); }
  return [108, 140 - Math.round(u * 20)];
}

// el mapa del mundo en 48 × 24 casillas de 7,5° (de 180° O a 180° E y de 90° N a 90° S): # tierra, * hielo
const E_MUNDO = [
  '................................................',
  '........######..######..........##.#####........',
  '..####################....###.##################',
  '..###############..##..#..######################',
  '.......#########.........###.###################',
  '.......##########......########################.',
  '.......########........#..###################...',
  '........######.........###########.######..#....',
  '.........###..#.......#########.#######.........',
  '..........###........#########...###.##.........',
  '............##.......#########...#..##..#.......',
  '..............####....#######.......####........',
  '.............#######....#####........#####.##...',
  '..............######....#####........#..###.....',
  '...............####.....####.#......#####.......',
  '...............###.......###.......######.......',
  '...............##........##........#####........',
  '...............#...............................#',
  '...............#..............................#.',
  '...............#................................',
  '................................................',
  '................................................',
  '**********************************************..',
  '************************************************',
];

// ¿tierra (1), hielo (2) o mar (0) en esa longitud y latitud (grados)? con la costa desigualada por ruido
function e_tierra(lon, lat) {
  const fx = (lon + 180) / 7.5 + (e_vn(lon / 6, lat / 6, 90) - 0.5) * 0.7, fy = (90 - lat) / 7.5 + (e_vn(lon / 6 + 5, lat / 6, 91) - 0.5) * 0.7;
  const cx = ((Math.floor(fx) % 48) + 48) % 48, cy = e_cl(Math.floor(fy), 0, 23), c = E_MUNDO[cy][cx];
  return c === '#' ? 1 : c === '*' ? 2 : 0;
}

// las banderas del emperador: [longitud, latitud]
const E_BANDERAS = [[18, 50], [-98, 40], [24, 4], [92, 46], [-55, -12], [134, -26], [60, 60], [78, 22], [-110, 58], [112, 32], [45, 24], [138, 37], [-102, 22], [25, -28], [116, -2], [2, 46]];

function e_globo(R, t, cx, cy, r, giro, banderas, destello) {
  const { pset } = R, L0 = -giro, tl = 0.36, ct = Math.cos(tl), st = Math.sin(tl);
  const MAR = [E_BW.noche0, hex('#163a6a'), hex('#245a9a'), hex('#3a7ac0'), hex('#7ab0e0')], TIE = [hex('#1a2a14'), hex('#3a5a26'), hex('#5a8a3a'), hex('#8ab04a'), hex('#c8d07a')], ARI = [hex('#2a2010'), hex('#7a5a2a'), hex('#b0884a'), hex('#d8b070')], HIE = [hex('#4a5a7a'), hex('#a8b8d8'), hex('#e8f0ff'), hex('#ffffff')];
  for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) {
    const dx = (x + 0.5 - cx) / r, dy = (y + 0.5 - cy) / r, d2 = dx * dx + dy * dy; if (d2 > 1) continue;
    const z = Math.sqrt(1 - d2), y1 = dy * ct + z * st, z1 = -dy * st + z * ct, lat = -Math.asin(e_cl(y1, -1, 1)) * 180 / Math.PI, lon = ((Math.atan2(dx, z1) * 180 / Math.PI + L0 * 180 / Math.PI) % 360 + 540) % 360 - 180;
    const sh = e_cl((-0.55 * dx - 0.45 * dy + 0.7 * z) * 1.2 + 0.05), ti = e_tierra(lon, lat);
    let c;
    if (ti === 2) c = e_tono(HIE, sh * 3.3, x, y);
    else if (ti === 1) { const seco = (lat > 12 && lat < 36 && lon > -18 && lon < 60) || (lat > -32 && lat < -18 && lon > 115 && lon < 145) || (lat > 30 && lat < 48 && lon > 75 && lon < 110);
      c = e_tono(seco ? ARI : TIE, sh * (seco ? 3.3 : 4.0) + (e_vn(lon / 6, lat / 6, 92) - 0.5) * 0.9, x, y); if (Math.abs(lat) > 62) c = e_tono(HIE, sh * 3 + 0.2, x, y);
      else if (!e_tierra(lon + 2.2, lat) || !e_tierra(lon - 2.2, lat) || !e_tierra(lon, lat + 2.2) || !e_tierra(lon, lat - 2.2)) c = e_mix(c, TIE[0], 0.45); }
    else { c = e_tono(MAR, sh * 4.2 + (e_vn(lon / 8, lat / 5, 93) - 0.5) * 0.5, x, y); if (e_tierra(lon + 2, lat) || e_tierra(lon - 2, lat) || e_tierra(lon, lat + 2)) c = e_mix(c, MAR[4], 0.35); }
    // la rejilla de meridianos y paralelos del globo (de bronce, finos) y el brillo del barniz
    if ((Math.abs(lon % 30) < 0.9 || Math.abs(lat % 30) < 0.9) && (x + y) % 2 === 0) c = e_mix(c, E_BW.bronceL, 0.45);
    if ((dx + 0.42) ** 2 + (dy + 0.4) ** 2 < 0.02) c = e_mix(c, E_BW.lunaL, 0.6);
    pset(x, y, c);
  }
  R.anillo(cx, cy, r + 0.5, E_BW.k);
  const proy = (lon, lat) => { const la = lat * Math.PI / 180, lo = (lon * Math.PI / 180) - L0, px = Math.cos(la) * Math.sin(lo), py = -Math.sin(la), pz = Math.cos(la) * Math.cos(lo);
    const yy = py * ct - pz * st, zz = py * st + pz * ct; return [cx + px * r, cy + yy * r, zz]; };
  // las banderitas verdes, que caen una tras otra y ondean
  const n = banderas * E_BANDERAS.length;
  for (let k = 0; k < E_BANDERAS.length; k++) { const f = e_cl(n - k); if (f <= 0) continue; const [bx, by, bz] = proy(...E_BANDERAS[k]); if (bz < 0.2) continue;
    const caida = Math.round((1 - Math.min(1, f * 1.6)) * 10), X = Math.round(bx), Y = Math.round(by) - caida, w = Math.sin(t * 6 + k) > 0 ? 1 : 0;
    R.linea(X, Y, X, Y - 7, E_BW.k); pset(X, Y - 8, E_BW.oroL);
    R.rect(X + 1, Y - 7, X + 5, Y - 4, E_BW.verdeD); R.rect(X + 1, Y - 7, X + 4 + w, Y - 5, E_BW.verdeL); R.rect(X + 1, Y - 5, X + 4, Y - 5, E_BW.verde); pset(X + 3, Y - 6, E_BW.oroL);
    if (f < 0.9 && f > 0.6) for (const [dx, dy] of [[-2, 0], [2, 0], [0, 2]]) pset(X + dx, Y + dy, E_BW.oroL); }
  // el destello verde lejano (una batalla que no se ve, solo la luz)
  let pos = null; if (destello > 0) { const [px, py, pz] = E_BANDERAS.map((q) => proy(...q)).reduce((a, b) => (b[2] > a[2] ? b : a)); pos = [Math.round(px), Math.round(py)]; if (pz > 0) { const rr = 2 + destello * 14, a = 1 - destello;
    for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const d = Math.hypot(i, j); if ((d < rr && d > rr - 2) || d < 3 * a) { const X = pos[0] + i, Y = pos[1] + j; if ((X - cx) ** 2 + (Y - cy) ** 2 < r * r && a > e_b4(X, Y) * 0.7) e_tinte(R, X, Y, d < 3 ? hex('#e0ffe8') : E_BW.gema, 0.5 + a * 0.5); } } } }
  return pos;
}

function e_salaGloboFija(R) {
  const { rect, pset, linea } = R;
  // los muros de sillería verde oscura, con juntas, desconchones y la luz de los braseros
  for (let y = 0; y < 128; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 10), jx = (x + (fila & 1) * 13) % 26, jy = y % 10;
    let c = e_tono([E_BW.piedra0, E_BW.piedra1, E_BW.piedra2, E_BW.piedra3], 1.4 + (h(Math.floor((x + (fila & 1) * 13) / 26), fila, 94) - 0.5) * 1.1 + (h(x >> 1, y >> 1, 95) - 0.5) * 0.5 + y / 128 * 0.4 - (x > 268 && y < 50 ? 0.5 : 0), x, y);
    if (jx === 0 || jy === 0) c = E_BW.piedra0; else if (jy === 1 || jx === 1) c = e_mix(c, E_BW.piedraL, 0.2); if (h(x >> 2, y >> 2, 96) > 0.97) c = E_BW.piedra1; pset(x, y, c); }
  // la cornisa de arriba y el zócalo
  rect(0, 14, 319, 17, E_BW.piedra3); rect(0, 14, 319, 14, E_BW.piedraL); rect(0, 18, 319, 18, E_BW.piedra0);
  rect(0, 120, 319, 127, E_BW.piedra2); rect(0, 120, 319, 120, E_BW.piedraL); for (let x = 0; x < 320; x += 13) rect(x, 121, x, 127, E_BW.piedra0);
  // los ventanales en arco (el hueco se pinta en cada fotograma): el marco de piedra, el parteluz y la repisa
  for (const [x0, x1] of [[24, 68], [248, 292]]) { const mx = (x0 + x1) / 2, rx = (x1 - x0) / 2;
    for (let y = 30; y < 126; y++) for (let x = x0 - 5; x <= x1 + 5; x++) { const dy = y - 62, arco = (u, ext) => y >= 62 ? Math.abs(x - mx) <= rx + ext : ((x - mx) / (rx + ext)) ** 2 + (dy / (22 + ext)) ** 2 <= 1;
      if (arco(0, 0)) continue; if (arco(0, 5)) pset(x, y, ((Math.atan2(dy, x - mx) * 7) | 0) % 2 && y < 62 ? E_BW.piedra3 : (x + y) % 4 === 0 ? E_BW.piedra1 : E_BW.piedra2); }
    rect(x0 - 7, 122, x1 + 7, 126, E_BW.piedra3); rect(x0 - 7, 122, x1 + 7, 122, E_BW.piedraL); }
  // el suelo de losas pulidas en perspectiva, con el reflejo verde del globo
  for (let y = 128; y < 180; y++) { const z = (y - 70) / 58; for (let x = 0; x < 320; x++) { const u = (x - 160) / z, col = Math.floor(u / 30 + 100), fila = Math.floor((y - 128) / (3 + (y - 128) * 0.3));
    let c = e_tono([E_BW.piedra0, E_BW.piedra1, E_BW.piedra2, E_BW.piedra3], 1.2 + ((col + fila) & 1) * 0.7 + (h(x >> 1, y, 97) - 0.5) * 0.6 + (y - 128) / 60, x, y);
    if (Math.abs(((u / 30) % 1 + 1) % 1) < 0.04 / z) c = E_BW.piedra0;
    const ref = Math.exp(-(((x - 160) / 40) ** 2)) * Math.max(0, 1 - (y - 128) / 40); if (ref * 0.8 > e_b4(x, y) + 0.1) c = e_mix(c, (y & 1) ? hex('#2a5a7a') : E_BW.verde, 0.4);
    // la luz de luna que entra por los ventanales y cae en el suelo, con la sombra del parteluz
    for (const [w0, w1] of [[24, 68], [248, 292]]) { const k = (y - 128) * 0.7, a = w0 + 10 + k, b = w1 + 6 + k * 1.2, m = (a + b) / 2; if (y < 170 && x >= a && x <= b && Math.abs(x - m) > 1 && 0.55 * (1 - (y - 128) / 42) > e_b4(x, y)) c = e_mix(c, E_BW.luna, 0.22); }
    pset(x, y, c); } }
  rect(0, 128, 319, 128, E_BW.piedra0);
  // la alfombra verde con ribete de oro que llega al pie del globo
  for (let y = 140; y < 180; y++) { const w = 26 + (y - 140) * 0.6; for (let x = Math.round(160 - w); x <= 160 + w; x++) { const bo = x - (160 - w) < 2 || 160 + w - x < 2; pset(x, y, bo ? E_BW.oroS : e_tono([E_BW.verdeD, E_BW.verdeS, E_BW.verde], 1.3 + (h(x, y, 98) - 0.5) * 0.7 + (y % 7 === 0 ? -0.6 : 0), x, y)); } }
  // el pie de bronce del globo: la base, la columna con anillos y la cuna
  rect(132, 146, 188, 152, E_BW.bronceD); rect(134, 146, 186, 147, E_BW.bronceL); rect(134, 148, 186, 151, E_BW.bronce); for (let x = 138; x < 184; x += 8) pset(x, 149, E_BW.bronceS);
  for (let y = 130; y < 146; y++) { const w = y > 140 ? 9 : 5; for (let x = 160 - w; x <= 160 + w; x++) pset(x, y, e_tono([E_BW.bronceD, E_BW.bronceS, E_BW.bronce, E_BW.bronceL], 3.2 - (x - 160 + w) / (2 * w) * 2.6, x, y)); }
  rect(150, 138, 170, 140, E_BW.bronceS); rect(150, 138, 170, 138, E_BW.bronceL);
  for (let k = 0; k < 2; k++) { const s = k ? 1 : -1; linea(160, 132, 160 + s * 30, 124, E_BW.bronceD); linea(160, 131, 160 + s * 30, 123, E_BW.bronce); }
  // la sombra del pie en el suelo
  for (let y = 152; y < 156; y++) for (let x = 128; x < 192; x++) if ((x + y) & 1) e_tinte(R, x, y, E_BW.piedra0, 0.6);
  c_bwGloboDetalle(R);
}
// el cielo de noche de un ventanal, recortado a su arco: degradado tramado, estrellas, la luna, nubes de tres tonos a dos
// velocidades y una ciudad lejana con luces que se encienden y apagan
function e_ventanaNoche(R, t, x0, x1, luna) {
  const mx = (x0 + x1) / 2, rx = (x1 - x0) / 2, dentro = (x, y) => (y >= 62 ? x >= x0 && x <= x1 : ((x - mx) / rx) ** 2 + ((y - 62) / 22) ** 2 <= 1) && y >= 40 && y < 122;
  for (let y = 40; y < 122; y++) for (let x = x0; x <= x1; x++) { if (!dentro(x, y)) continue; const s = h(x, y, 99);
    R.pset(x, y, s > 0.985 && y < 100 ? (Math.sin(t * 2 + x * y) > 0 ? E_BW.lunaL : E_BW.luna) : e_tono([E_BW.noche0, E_BW.noche1, E_BW.noche2, E_BW.noche3], (y - 40) / 82 * 3.2, x, y)); }
  R.recorte([x0, 40, x1, 121]);
  if (luna) { R.disco(x0 + 14, 56, 6, E_BW.luna); R.disco(x0 + 16, 55, 5, E_BW.lunaL); R.disco(x0 + 18, 53, 5, E_BW.noche1); R.pset(x0 + 11, 57, E_BW.luna); }
  for (let k = 0; k < 4; k++) { const vel = k < 2 ? 1.6 : 3.2, w = 9 + k * 2, cxn = x0 - 12 + ((t * vel + k * 17 + (luna ? 0 : 9)) % (x1 - x0 + 24)), cyn = 66 + k * 7;
    R.disco(cxn, cyn + 1, w * 0.4, E_BW.noche1); R.disco(cxn + 3, cyn, w * 0.35, E_BW.noche2); R.disco(cxn - 2, cyn - 1, w * 0.25, E_BW.noche3); R.pset(cxn - 3, cyn - 3, E_BW.luna); }
  // la ciudad lejana: siluetas de tejados y torres, ventanas que se encienden
  for (let x = x0; x <= x1; x++) { const bh = 8 + Math.floor(h(Math.floor(x / 5), luna ? 1 : 2, 100) * 12) + (x % 17 === 0 ? 6 : 0); for (let y = 121 - bh; y < 122; y++) R.pset(x, y, E_BW.noche0); }
  for (let k = 0; k < 24; k++) { const x = x0 + 1 + Math.floor(h(k, 101, luna ? 1 : 2) * (x1 - x0 - 2)), y = 104 + Math.floor(h(k, 102, luna ? 1 : 2) * 16); if (Math.sin(t * 0.7 + k * 2.3) > -0.3 && R.pget(x, y) === E_BW.noche0) R.pset(x, y, k % 4 ? E_BW.fuego : E_BW.lunaL); }
  R.recorte(null);
  R.linea(mx, 40, mx, 121, E_BW.piedra2); R.linea(x0, 92, x1, 92, E_BW.piedra2);
}

// un estandarte verde con el aro de cuatro puntas que ondea (x0–x1, de y0 a y1, con su barra de oro)
function e_estandarte(R, x0, x1, y0, y1, t) {
  const { rect, pset } = R; rect(x0 - 3, y0 - 2, x1 + 3, y0, E_BW.oroS); rect(x0 - 3, y0 - 2, x1 + 3, y0 - 2, E_BW.oroL); pset(x0 - 4, y0 - 1, E_BW.oro); pset(x1 + 4, y0 - 1, E_BW.oro);
  for (let y = y0 + 1; y <= y1; y++) { const o = Math.round(Math.sin(t * 1.6 - y * 0.12 + x0) * (y - y0) / (y1 - y0) * 1.6), cola = y > y1 - 8 ? Math.round((y - (y1 - 8)) * 0.9) : 0;
    for (let x = x0 + o + (cola && x0 + o < (x0 + x1) / 2 ? 0 : 0); x <= x1 + o; x++) { const dc = Math.abs(x - o - (x0 + x1) / 2); if (y > y1 - 8 && dc < cola) continue;
      const pli = Math.sin((x - o - x0) * 0.8 + t * 1.6 - y * 0.1); pset(x, y, x === x0 + o || x === x1 + o ? E_BW.oroM : e_tono([E_BW.verdeD, E_BW.verdeS, E_BW.verde, E_BW.verdeL], 1.6 + pli * 0.9, x, y)); } }
  const cx = Math.round((x0 + x1) / 2 + Math.sin(t * 1.6 - 50 * 0.12 + x0) * 0.8), cy = y0 + 32; R.anillo(cx, cy, 4, E_BW.oroL);
  for (const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) { pset(cx + dx * 5, cy + dy * 5, E_BW.oro); pset(cx + dx * 6, cy + dy * 6, E_BW.oroL); } pset(cx, cy, E_BW.oroM);
}

function e_salaGlobo(R, t, o) {
  const giro = o.giro ?? (-0.3 + t * 0.12);
  e_capa(R, 'bw-globo', () => e_salaGloboFija(R));
  e_ventanaNoche(R, t, 24, 68, true); e_ventanaNoche(R, t, 248, 292, false);
  e_estandarte(R, 80, 96, 24, 96, t); e_estandarte(R, 224, 240, 24, 96, t + 1);
  for (const bx of [104, 216]) e_brasero(R, bx, 128, t);
  c_bwGloboVida(R, t);
  // el resplandor detrás del globo y el globo; luego el meridiano de bronce por delante de los bordes
  for (let j = -54; j <= 54; j++) for (let i = -54; i <= 54; i++) { const d = Math.hypot(i, j); if (d > 45 && d < 54 && (54 - d) / 18 > e_b4(160 + i, 86 + j) + 0.1) e_tinte(R, 160 + i, 86 + j, hex('#2a5a7a'), 0.4); }
  const pos = e_globo(R, t, 160, 86, 44, giro, o.banderas ?? 0, o.destello ?? 0);
  for (let a = -Math.PI * 0.62; a <= Math.PI * 1.62; a += 0.012) { const x = Math.round(160 + Math.cos(a - Math.PI / 2 + 0.36) * 48), y = Math.round(86 + Math.sin(a - Math.PI / 2 + 0.36) * 48); R.pset(x, y, E_BW.bronceS); R.pset(x, y - 1, E_BW.bronceL); if (Math.round(a * 20) % 9 === 0) R.pset(x + 1, y, E_BW.bronceD); }
  R.disco(160, 37, 2, E_BW.bronceL); R.pset(160, 37, E_BW.oroB);
  return { libre: [30, 290], suelo: 152, globo: { x: 160, y: 86, r: 44 }, destello: pos, ventanas: [[24, 40, 68, 122], [248, 40, 292, 122]] };
}
// una roca de aristas: un polígono irregular partido en caras planas (celdas de Voronoi), cada cara con el tono de hacia
// dónde mira (luz de arriba a la izquierda, o a la derecha si luzIzq es false), las aristas marcadas (filo oscuro o de
// luz), vetas, grietas con su filo de luz, manchas de liquen en las caras de los lados, nieve en las caras de arriba con
// su labio de sombra y un montoncito de nieve al pie. (cx, base): el centro del pie, enterrado en la nieve; rx, ry: medio
// ancho y medio alto (la roca sube hasta base − 2·ry); P = { r, rS, rL, nv, nvS, nvL }; nieve 0–1: cuánta lleva encima
function a_roca(R, cx, base, rx, ry, P, sem, luzIzq = true, nieve = 1) {
  const B = R.buf, cy = base - ry, n = 9 + Math.floor(h(sem, 1, 401) * 4), V = [];
  for (let i = 0; i < n; i++) { const a = Math.PI * 2 * (i + (h(i, sem, 402) - 0.5) * 0.45) / n - Math.PI / 2, f = 0.8 + h(i, sem, 403) * 0.2;
    let y = cy + Math.sin(a) * ry * f * 1.15; if (y > base + 2) y = base + 2 + h(i, sem, 404) * 2; V.push([cx + Math.cos(a) * rx * f, y]); }
  const den = (x, y) => { let c = false; for (let i = 0, j = n - 1; i < n; j = i++) { const [xi, yi] = V[i], [xj, yj] = V[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
  const x0 = Math.max(0, Math.floor(cx - rx - 1)), x1 = Math.min(319, Math.ceil(cx + rx + 1)), y0 = Math.max(0, Math.floor(cy - ry * 1.2 - 1)), y1 = Math.min(179, Math.ceil(base + 4));
  const W = x1 - x0 + 1, id = new Int16Array(W * (y1 - y0 + 1)).fill(-1), L = luzIzq ? [-0.5, -0.62, 0.6] : [0.5, -0.62, 0.6], S = [];
  // las caras: cada semilla con su normal (hacia fuera, torcida al azar) y su tono
  const ns = Math.max(6, Math.round(rx * ry / 70));
  for (let k = 0; S.length < ns && k < 300; k++) { const sx = cx + (h(k, sem, 405) - 0.5) * 2 * rx, sy = cy + (h(k, sem, 406) - 0.5) * 2 * ry; if (!den(sx, sy)) continue;
    let nx = (sx - cx) / rx * 0.8 + (h(k, sem, 407) - 0.5) * 0.7, ny = (sy - cy) / ry * 0.75 + (h(k, sem, 408) - 0.5) * 0.6 - 0.25; const q = Math.hypot(nx, ny); if (q > 0.95) { nx *= 0.95 / q; ny *= 0.95 / q; }
    S.push({ x: sx, y: sy, s: nx * L[0] + ny * L[1] + Math.sqrt(1 - nx * nx - ny * ny) * L[2], nv: nieve > 0 && ny < -0.5 - (1 - nieve) * 0.4 && sy < cy - ry * 0.2 }); }
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (!den(x + 0.5, y + 0.5)) continue; let b = 0, bd = 1e9;
    for (let k = 0; k < S.length; k++) { const dx = x - S[k].x, dy = (y - S[k].y) * 1.3, d = dx * dx + dy * dy; if (d < bd) { bd = d; b = k; } } id[(y - y0) * W + x - x0] = b; }
  const I = (x, y) => (x < x0 || x > x1 || y < y0 || y > y1 ? -1 : id[(y - y0) * W + x - x0]), dentro = (x, y) => I(x - 1, y) >= 0 && I(x + 1, y) >= 0 && I(x, y - 1) >= 0 && I(x, y + 1) >= 0;
  const rD = a_mez(P.rS, a_K, 0.45), tono = (s) => (s > 0.8 ? P.rL : s > 0.52 ? P.r : s > 0.26 ? P.rS : rD);
  const liq = [a_mez(P.r, hex('#9aac5a'), 0.45), a_mez(P.r, hex('#c8a85a'), 0.4), a_mez(P.rS, hex('#7a8a4a'), 0.45)];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const k = I(x, y); if (k < 0) continue; const f = S[k], up = I(x, y - 1), dn = I(x, y + 1), lf = I(x - 1, y), rt = I(x + 1, y); let c;
    if (up < 0 || lf < 0 || rt < 0 || dn < 0) c = a_K;
    else if (f.nv) { c = !S[dn].nv ? P.nvS : f.s > 0.55 ? (h(x, y, sem + 5) < 0.06 ? P.nv : P.nvL) : (h(x, y, sem + 5) < 0.1 ? P.nvS : P.nv);
      if (c !== P.nvS && (x + y * 3 + Math.round(Math.sin(x * 0.3 + sem) * 2)) % 9 === 0 && h(x >> 1, y, sem + 11) < 0.6) c = f.s > 0.55 ? P.nv : P.nvS; }   // las ondas que el viento marca en la nieve
    else { c = tono(f.s);
      if (S[up].nv) c = rD;   // la sombra bajo el labio de nieve
      else if (rt !== k || dn !== k) { const o2 = S[rt !== k ? rt : dn]; if (h(x, y, sem + 6) < 0.85) c = o2.s > f.s ? rD : tono(f.s + 0.3); }   // la arista
      else if (h(x, y, sem + 7) < 0.05) c = tono(f.s - 0.27);
      else if (h(x >> 1, y, sem + 8) < 0.035) c = tono(f.s + 0.27);
      else if ((x * 2 + y * 5 + Math.round(h(x >> 3, y >> 3, sem) * 6)) % 13 === 0 && h(x, y >> 1, sem + 9) < 0.5) c = tono(f.s - 0.27);   // las vetas
    }
    B[y * 320 + x] = c; }
  // la nieve que se queda en lo alto (bajo el contorno), más gruesa en el centro
  if (nieve > 0) for (let x = x0 + 1; x < x1; x++) { let y = y0; while (y <= y1 && I(x, y) < 0) y++; if (y > base - 4) continue; const rel = (x - cx) / rx; if (Math.abs(rel) > 0.85) continue;
    const d = Math.round((1 + h(x >> 1, 1, sem + 10) * 1.8) * nieve * (1 - Math.abs(rel) * 0.6));
    for (let j = 1; j <= d + 1; j++) { const yy = y + j; if (!dentro(x, yy)) break; B[yy * 320 + x] = j <= d ? ((luzIzq ? rel < 0.2 : rel > -0.2) ? P.nvL : P.nv) : P.nvS; } }
  // las grietas: bajan quebradas, con el filo de luz en el lado que mira a la luz
  for (let g = 0; g < 2 + Math.floor(rx / 18); g++) { let x = cx + (h(g, sem, 411) - 0.5) * rx * 1.1, y = cy - ry * (0.3 + h(g, sem, 412) * 0.5); const len = ry * (0.5 + h(g, sem, 413) * 0.6);
    for (let i = 0; i < len; i++) { x += (h(i, g, sem + 414) - 0.5) * 1.8; y += 1; const X = Math.round(x), Y = Math.round(y), k = I(X, Y); if (k < 0 || S[k].nv || !dentro(X, Y)) continue;
      B[Y * 320 + X] = rD; const lx = luzIzq ? X + 1 : X - 1, k2 = I(lx, Y); if (k2 >= 0 && !S[k2].nv && dentro(lx, Y) && h(i, g, sem + 415) < 0.7) B[Y * 320 + lx] = tono(S[k2].s + 0.27); } }
  // el liquen: manchitas de dos o tres tonos en las caras de los lados
  for (let g = 0; g < Math.round(rx * ry / 80); g++) { const lx = Math.round(cx + (h(g, sem, 416) - 0.5) * rx * 1.6), ly = Math.round(cy + (h(g, sem, 417) - 0.2) * ry * 0.9), c = liq[g % 3];
    for (let m = 0; m < 6; m++) { const X = lx + Math.round((h(g, m, sem + 418) - 0.5) * 4), Y = ly + Math.round((h(g, m, sem + 419) - 0.5) * 3), k = I(X, Y); if (k < 0 || S[k].nv || !dentro(X, Y)) continue; B[Y * 320 + X] = m === 0 ? liq[(g + 1) % 3] : c; } }
  // la nieve amontonada al pie
  for (let x = x0; x <= x1; x++) { const rel = (x - cx) / rx; if (Math.abs(rel) > 1) continue; const top = Math.round(base - 1 - (1 - rel * rel) * 2 - h(x >> 1, 3, sem) * 2);
    for (let y = top; y <= y1; y++) { if (I(x, y) < 0) continue; B[y * 320 + x] = y === top ? P.nvL : a_um(x, y) < 0.4 ? P.nvS : P.nv; } }
}

// una nube de bordes tramados y tres tonos: bolas = [[x, y, r], …] (una masa) con la base plana en yb. El campo es la
// mayor cercanía a alguna bola; el borde se deshace en trama contra el cielo y el tono va de la luz de arriba (c[2]) al
// cuerpo (c[1]) y a la panza en sombra (c[0]), con las transiciones tramadas; mk: solo donde hay cielo
function a_cumulo(R, mk, bolas, yb, c) {
  let x0 = 1e9, x1 = -1e9, y0 = 1e9; for (const [x, y, r] of bolas) { x0 = Math.min(x0, x - r); x1 = Math.max(x1, x + r); y0 = Math.min(y0, y - r); }
  x0 = Math.max(0, Math.floor(x0)); x1 = Math.min(319, Math.ceil(x1)); const top = Math.floor(y0); y0 = Math.max(0, top); const y1 = Math.min(179, Math.ceil(yb + 2)); if (x0 > x1 || y0 > y1) return;
  const W = x1 - x0 + 1, F = new Float32Array(W * (y1 - y0 + 1)), V = new Float32Array(W * (y1 - y0 + 1));
  for (const [bx, by, r] of bolas) for (let y = Math.max(y0, Math.floor(by - r)); y <= Math.min(y1, Math.ceil(by + r)); y++) for (let x = Math.max(x0, Math.floor(bx - r)); x <= Math.min(x1, Math.ceil(bx + r)); x++) {
    const d = Math.hypot(x - bx, y - by) / r; if (d >= 1) continue; const k = (y - y0) * W + x - x0; if (1 - d > F[k]) { F[k] = 1 - d; V[k] = (y - by + r) / (2 * r); } }
  const B = R.buf, alto = Math.max(1, yb - top);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const k = (y - y0) * W + x - x0; let f = F[k]; if (f <= 0) continue;
    const q = (y - (yb - 2)) / 3; if (q > 0) f -= q * 0.45;   // la base plana
    const u = a_um(x, y); if (f < 0.22 && u > f / 0.22) continue;   // el borde, tramado contra el cielo
    const i = y * 320 + x; if (mk && !mk[i]) continue;
    const s = V[k] * 0.55 + (y - top) / alto * 0.45 + (u - 0.5) * 0.24;
    B[i] = s < 0.34 ? c[2] : s < 0.64 ? c[1] : c[0]; }
}

// las nubes de un cielo con bordes tramados: velos lejanos casi quietos y cúmulos (a_cumulo) a tres velocidades; hor: la
// altura del horizonte; c = [sombra, cuerpo, luz]; o.n (cúmulos), o.v (velocidad), o.sem
function a_nubesT(R, mk, t, hor, c, o = {}) {
  const v = o.v ?? 1, n = o.n ?? 5, sem = o.sem ?? 0;
  for (let k = 0; k < 4; k++) { const w = 30 + Math.round(h(k, 5, 302 + sem) * 40), x0 = ((h(k, 6, 302 + sem) * 440 + t * (0.8 + k * 0.3) * v) % 470) - 80, y = Math.max(24, Math.round(hor * (0.18 + k * 0.12)));
    for (let i = 0; i < w; i++) { const x = Math.round(x0 + i); if (h(i >> 2, k, 303) < 0.2) continue; const e = Math.sin(i / w * Math.PI); if (a_um(x, y) < e * 1.4) a_ps(R, mk, x, y, e > 0.35 ? c[1] : c[0]); if (e > 0.6 && i % 4) a_ps(R, mk, x + 3, y - 1, c[2]); if (e > 0.5 && i % 5 === 0) a_ps(R, mk, x - 4, y + 1, c[0]); } }
  for (let k = n - 1; k >= 0; k--) { const cerca = k < 2, w = cerca ? 36 + k * 14 : 18 + ((k * 7) % 12), vv = (cerca ? 4 + k * 1.4 : 1.5 + k * 0.4) * v, yb = Math.round(cerca ? hor * (0.42 + k * 0.16) : hor * (0.3 + (k - 2) * 0.13)), cx = ((h(k, 7, 302 + sem) * 470 + t * vv) % 500) - 90;
    const nb = 4 + Math.round(w / 9), bolas = [];
    for (let i = 0; i < nb; i++) { const u = (i + 0.5) / nb - 0.5, r = w * (0.11 + 0.12 * Math.cos(u * Math.PI) + 0.06 * h(i, k + sem, 311)); bolas.push([cx + u * w * 0.95, yb - r * 0.45 - h(i, k + sem, 312) * w * 0.05, r]); }
    for (let i = 0; i < 2; i++) { const r = w * (0.15 + 0.05 * h(i, k + sem, 313)); bolas.push([cx + (h(i, k + sem, 314) - 0.5) * w * 0.45, yb - w * 0.18 - r * 0.35, r]); }
    a_cumulo(R, mk, bolas, yb, c); }
}

// los nubarrones de la tormenta con bordes tramados: bancos largos y bajos que corren hacia la izquierda (los de abajo,
// más rápidos), cada uno una fila de cúmulos con la panza plana en sombra y la cresta de luz; dens (0–1) los va abriendo
function a_bancos(R, mk, t, c, v, dens) {
  for (let k = 0; k < 8; k++) { if (h(k, 9, 117) > dens + 0.15) continue; const L = 120 + Math.round(h(k, 1, 117) * 110), y = 15 + k * 10 + Math.round(h(k, 2, 117) * 4), x0 = (((h(k, 3, 117) * 520 - t * v * (5 + k * 1.6)) % 520) + 520) % 520 - 150, bolas = [];
    for (let i = 0; i < L; i += 7) { const r = 4 + Math.sin(i / L * Math.PI) * (5 + k * 0.8) + h(i, k, 118) * 4; bolas.push([x0 + i, y - r * 0.3, r]); }
    a_cumulo(R, mk, bolas, y + 4, c); }
}

// la cámara 'balcon' de Doomstadt, de noche: la torre alta de cerca con su balcón (véase la cabecera de latveria). Dos
// fondos fijos, con el ventanal encendido (luz true) y apagado; o.ventanal (0–1) los funde
function a_balconFondo(R, luz) {
  const P = a_PDO;
  return a_escena(R, luz ? 'balcon1' : 'balcon0', () => { a_grad(R, 0, 150, [[0, P.c0], [0.22, P.c1], [0.48, P.c2], [0.72, P.c3], [0.9, P.c4]]); }, () => {
    const { rect, pset } = R, B = R.buf, S = [P.pJ, P.p, P.pS, P.pL, null], SL = [P.pJ, a_mez(P.p, P.c3, 0.35), a_mez(P.pS, P.c3, 0.35), a_mez(P.pL, P.c3, 0.3), null];
    // los montes lejanos y, abajo, el valle con la ciudad vista desde lo alto: hileras de casitas con nieve en los
    // tejados, ventanas encendidas, chimeneas y las calles con sus faroles
    a_montes(R, 114, 24, 134, [hex('#1e2440'), hex('#161a32'), hex('#6a7aa4'), hex('#46527c'), hex('#1a1e34')], 8);
    for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = a_um(x, y) < (y - 128) / 70 ? hex('#16182a') : hex('#1c2036');
    for (let fila = 0; fila < 7; fila++) { const yf = 134 + fila * 7 + Math.round(fila * fila * 0.3), s = 0.55 + fila * 0.12, os = 0.55 - fila * 0.06;
      for (let k = 0; k < 60; k++) { const w = Math.round((7 + h(k, fila, 171) * 5) * s), x = Math.round(k * 10 * s + fila * 5 + h(k, fila + 9, 171) * 4) - 8, yb = yf + Math.round((h(k, fila, 169) - 0.5) * 4), alto = Math.round((4 + h(k, fila + 3, 171) * 3) * s), tj = Math.max(2, Math.round(w * 0.4));
        if (x > 322) break;
        const fa = a_mez(P.fach, P.c2, os); rect(x, yb - alto, x + w, yb, a_mez(fa, a_K, 0.3)); rect(x + 1, yb - alto, x + w - 2, yb, fa); rect(x + w - 1, yb - alto, x + w - 1, yb, a_mez(P.fachS, P.c2, os));
        for (let wx = x + 2; wx < x + w - 1; wx += 3) if (h(wx, yb, 172) < 0.45) pset(wx, yb - Math.max(1, alto - 2), h(wx, yb, 173) < 0.7 ? P.pat : hex('#ffe8b0'));
        for (let j = 0; j < tj; j++) { const ww = Math.round((w / 2 + 1) * (j + 1) / tj), c2 = x + w / 2; for (let xx = Math.round(c2 - ww); xx <= Math.round(c2 + ww); xx++) pset(xx, yb - alto - tj + j, j < tj * 0.5 ? a_mez(h(xx, j, 170) < 0.8 ? P.nvL : P.nvS, P.c2, os * 0.6) : a_mez(xx < c2 ? P.tejaL : P.teja, P.c2, os)); }
        if (h(k, fila, 174) < 0.3) { const cx2 = x + Math.round(w * 0.7); rect(cx2, yb - alto - tj, cx2 + 1, yb - alto - 1, a_mez(P.tejaS, P.c2, os)); pset(cx2, yb - alto - tj - 1, a_mez(P.nvL, P.c2, os)); } }
      for (let x = 3; x < 320; x += 8) if (h(x >> 3, fila, 175) < 0.18) { pset(x, yf + 3, P.pat); pset(x, yf + 2, a_mez(P.pat, P.c2, 0.5)); } }
    // las otras torres del castillo a media distancia: tejado cónico verde con nieve, ventanas encendidas y la muralla
    // baja que las une, con sus almenas nevadas
    const torreM = (x0, x1, top, tip) => { a_sillares(R, x0, top, x1, 179, SL, 4, 7, 176 + x0); rect(x0, top, x0, 179, a_mez(P.pL, P.c3, 0.2)); rect(x1, top, x1, 179, P.pJ);
      for (let y = top; y < 180; y++) for (let x = x0; x <= x1; x++) if (a_um(x, y) < (x - x0) / (x1 - x0) * 0.5) B[y * 320 + x] = a_mez(B[y * 320 + x], a_K, 0.3);
      const cx = Math.round((x0 + x1) / 2), Hh = top - tip; for (let j = 0; j <= Hh; j++) { const ww = Math.round(((x1 - x0) / 2 + 3) * j / Hh);
        for (let xx = cx - ww; xx <= cx + ww; xx++) pset(xx, tip + j, xx === cx - ww || xx === cx + ww || j === Hh ? a_K : (xx * 2 + j * 3) % 7 === 0 ? P.verdeS : j < Hh * 0.28 || (h(xx, j, 177) < 0.22 && xx < cx) ? (xx < cx ? P.nvL : P.nvS) : xx < cx - ww * 0.3 ? P.verdeL : xx < cx + ww * 0.3 ? P.verde : P.verdeS); }
      rect(cx, tip - 7, cx, tip, a_K); rect(x0 - 2, top - 1, x1 + 2, top + 1, a_K); rect(x0 - 1, top - 1, x1 + 1, top - 1, P.nvS);
      for (let wy = top + 10; wy < 160; wy += 15) { const wx = cx - 1, on = h(wx, wy, 178) < 0.7; rect(wx - 1, wy - 1, wx + 2, wy + 5, a_K); rect(wx, wy, wx + 1, wy + 4, on ? (h(wx, wy, 179) < 0.6 ? P.vL : P.pat) : hex('#1a1c28')); if (on) pset(wx, wy, P.vB); } };
    torreM(22, 56, 76, 46); torreM(248, 276, 86, 58);
    for (const [a, b] of [[56, 92], [228, 248]]) { a_sillares(R, a, 153, b, 179, SL, 4, 7, 179 + a); rect(a, 152, b, 153, a_mez(P.pL, P.c3, 0.3)); for (let x = a + 1; x < b - 2; x += 6) { rect(x - 1, 146, x + 3, 152, a_K); rect(x, 147, x + 2, 152, a_mez(P.pS, P.c3, 0.3)); rect(x, 147, x + 2, 147, P.nvS); } }
    // la torre alta, de cerca: sillares grandes, la sombra que se ahonda hacia la derecha, las esquinas de piedra clara,
    // los matacanes, el parapeto y las almenas con nieve; carámbanos
    a_sillares(R, 92, 44, 228, 179, S, 7, 14, 181);
    for (let y = 44; y < 180; y++) for (let x = 176; x <= 228; x++) if (a_um(x, y) < (x - 176) / 80) B[y * 320 + x] = a_mez(B[y * 320 + x], a_K, 0.28);
    for (let y = 44, i = 0; y < 180; y += 7, i++) { const L = i % 2 ? 7 : 12; rect(92, y, 92 + L, y + 5, P.pL); rect(92, y + 6, 92 + L, y + 6, P.pJ); rect(92 + L, y, 92 + L, y + 6, P.pJ); if (h(i, 0, 189) < 0.5) pset(94, y + 2, P.p);
      rect(228 - L, y, 228, y + 5, a_mez(P.pS, a_K, 0.2)); rect(228 - L, y + 6, 228, y + 6, a_K); rect(228 - L, y, 228 - L, y + 6, P.pJ); }
    rect(91, 44, 91, 179, a_K); rect(229, 44, 229, 179, a_K);
    a_sillares(R, 88, 32, 232, 39, S, 4, 9, 190); rect(87, 31, 233, 31, a_K); rect(87, 39, 233, 39, a_K);
    for (let x = 90; x < 230; x += 8) { rect(x, 40, x + 4, 44, a_K); rect(x + 1, 40, x + 3, 43, P.pS); pset(x + 1, 40, P.pL); rect(x + 5, 40, x + 7, 43, hex('#0c0c14')); }
    // las almenas empiezan en y 24 (bajo las cifras del año, que llegan a y ≈ 20)
    for (let x = 88; x < 232; x += 13) { rect(x, 24, x + 8, 31, a_K); rect(x + 1, 25, x + 7, 31, P.p); rect(x + 1, 25, x + 2, 31, P.pL); rect(x + 6, 26, x + 7, 31, P.pS); for (let i = 0; i <= 8; i++) pset(x + i, 24 - (i > 1 && i < 7 && h(x, i, 191) < 0.6 ? 1 : 0), i === 0 || i === 8 ? P.nvS : P.nvL); }
    for (let x = 88; x < 232; x++) if (h(x, 0, 192) < 0.4) pset(x, 30, h(x, 1, 192) < 0.5 ? P.nvL : P.nv);
    for (let x = 89; x < 232; x += 3) if (h(x, 2, 192) < 0.4) { const L = 1 + Math.round(h(x, 3, 192) * 4); for (let j = 1; j <= L; j++) pset(x, 39 + j, j < L ? P.nvS : P.nvL); }
    // la luz del ventanal en la pared de alrededor
    if (luz) { a_luz(R, 160, 100, 62, P.verdeL, 0.22, 60); a_luz(R, 160, 140, 64, P.vL, 0.25, 12); }
    // el ventanal ojival (x 140–180, y 64–135): el marco de dovelas, el vidrio emplomado (encendido: la luz verde que
    // quema en el centro; apagado: verde muy oscuro con el reflejo de la luna), el parteluz y el travesaño
    const VX0 = 140, VX1 = 180, VY1 = 135, ACX = 160, ACY = 84, AR = 20;
    const vano = (x, y) => x >= VX0 && x <= VX1 && y <= VY1 && (y >= ACY || Math.hypot(x - ACX, y - ACY) <= AR);
    for (let y = 56; y <= VY1; y++) for (let x = VX0 - 7; x <= VX1 + 7; x++) { if (vano(x, y)) continue; const dd = y >= ACY ? Math.max(VX0 - x, x - VX1, 0) : Math.hypot(x - ACX, y - ACY) - AR; if (dd <= 0 || dd > 6) continue;
      let c; if (y >= ACY) { const seg = Math.floor((y - ACY) / 9); c = (y - ACY) % 9 === 8 ? P.pJ : seg % 2 ? P.pL : P.p; }
      else { const fa = (Math.atan2(y - ACY, x - ACX) + Math.PI) / (Math.PI / 9), seg = Math.floor(fa); c = fa - seg < 0.16 ? P.pJ : seg % 2 ? P.pL : P.p; if (seg === 4 && dd > 1) c = P.pL; }
      if (dd > 5.3) c = a_K; else if (dd < 1.3) c = P.pJ; else if (h(x, y, 182) < 0.07) c = P.pS; else if ((x > ACX + 2) && h(x, y, 183) < 0.3) c = a_mez(c, a_K, 0.25);
      if (luz && dd < 3) c = a_mez(c, P.vL, 0.18);
      pset(x, y, c); }
    for (let y = 60; y <= VY1; y++) for (let x = VX0; x <= VX1; x++) { if (!vano(x, y)) continue; let c; const rombo = (x - y + 400) % 8 === 0 || (x + y) % 8 === 0;
      if (luz) { const d = Math.hypot((x - 160) / 22, (y - 104) / 40); c = d < 0.45 ? P.vB : d < 0.8 ? (a_um(x, y) < (0.8 - d) / 0.35 ? P.vB : P.vL) : (a_um(x, y) < (1.1 - d) / 0.3 ? P.vL : P.verdeL); if (rombo) c = a_mez(c, P.verdeS, 0.5); }
      else { c = a_um(x, y) < 0.3 ? hex('#0e1a16') : hex('#142420'); if (rombo) c = hex('#08100e'); else if (x - y > 72 && x - y < 78) c = hex('#2a3e44'); }
      if (x === 159 || x === 160 || y === 100 || y === 101) c = a_K; else if (x === 161 || y === 102) c = luz ? P.verdeS : hex('#1e2a2a');
      pset(x, y, c); }
    // el suelo del balcón (y 136–143): losas en perspectiva con nieve en las juntas y en las esquinas, la luz verde del
    // ventanal; el canto con su moldura, las ménsulas de debajo con carámbanos y la sombra que echa sobre la pared
    for (let y = 150; y < 176; y++) for (let x = 100; x <= 220; x++) if (a_um(x, y) < (1 - (y - 150) / 26) * 0.75) B[y * 320 + x] = a_mez(B[y * 320 + x], a_K, 0.45);
    for (let y = 136; y <= 143; y++) { const u = (y - 136) / 7, xa = Math.round(108 - u * 6), xb = Math.round(212 + u * 6);
      for (let x = xa; x <= xb; x++) { const lx = Math.round(160 + (x - 160) / (1 + u * 0.1)); let c = (((lx % 12) + 12) % 12 === 0) || y === 139 ? P.pJ : u < 0.3 ? P.pS : P.p; if (c !== P.pJ && h(lx >> 2, y > 139 ? 1 : 0, 184) < 0.3) c = P.pL;
        if ((x - xa < 7 || xb - x < 7) && h(x, y, 185) < 0.65) c = h(x, y, 186) < 0.5 ? P.nv : P.nvL; else if (c === P.pJ && h(x, y, 187) < 0.4) c = P.nvS; else if (h(x, y, 188) < 0.03) c = P.nvL;
        if (luz && Math.abs(x - 160) < 26) c = a_mez(c, P.vL, 0.3 * (1 - Math.abs(x - 160) / 26)); pset(x, y, c); } }
    rect(100, 144, 220, 149, P.pS); rect(100, 144, 220, 144, P.pL); rect(100, 147, 220, 147, P.pJ); rect(100, 149, 220, 149, a_K); rect(99, 144, 99, 149, a_K); rect(221, 144, 221, 149, a_K);
    for (let x = 101; x < 220; x++) if (h(x, 4, 192) < 0.25) pset(x, 145, P.pJ);
    for (const cx of [110, 135, 160, 185, 210]) { rect(cx - 6, 150, cx + 6, 153, a_K); rect(cx - 5, 150, cx + 5, 152, P.p); rect(cx - 5, 150, cx - 3, 152, P.pL); rect(cx - 5, 154, cx + 5, 157, a_K); rect(cx - 4, 154, cx + 4, 156, P.pS); rect(cx - 4, 154, cx - 3, 156, P.p);
      rect(cx - 4, 158, cx + 4, 161, a_K); rect(cx - 3, 158, cx + 3, 160, P.pS); rect(cx - 2, 162, cx + 2, 164, a_K); rect(cx - 1, 162, cx + 1, 163, P.pJ); }
    for (let x = 101; x < 220; x += 2) if (h(x, 5, 192) < 0.35) { const L = 1 + Math.round(h(x, 6, 192) * 5); for (let j = 1; j <= L; j++) pset(x, 149 + j, j < L ? P.nvS : P.nvL); }
    // los soportes de las antorchas (las llamas, en el fotograma) y el musgo y la nieve en las juntas de la torre
    for (let k = 0; k < 120; k++) { const x = Math.round(93 + h(k, 1, 193) * 134), y = Math.round(40 + h(k, 2, 193) * 138); if (vano(x, y) || (x > 130 && x < 190 && y > 54 && y < 150)) continue; pset(x, y, h(k, 3, 193) < 0.6 ? a_mez(P.nvS, P.p, 0.4) : hex('#3a4a3e')); }
  });
}

function a_lvBalcon(R, t, o) {
  const P = a_PDO, lz = Math.max(0, Math.min(1, o.ventanal ?? 1)), E1 = a_balconFondo(R, true), E0 = lz < 1 ? a_balconFondo(R, false) : E1;
  a_fundir(R, E0.b, E1.b, lz); const mk = E1.m;
  a_estrellas(R, mk, t, 60, 110, 187, hex('#7a84b8'), hex('#f0f2ff')); a_luna(R, mk, 76, 36, 10, [hex('#f4ecd0'), hex('#c8c0a8'), hex('#fff8dc')]);
  a_nubesT(R, mk, t, 104, [P.n0, P.n1, P.n2], { n: 4, sem: 23, v: 1.3 });
  a_pajaros(R, mk, t, 3, 54, 9, hex('#0a0c18'), 7);
  // la vida del valle: luces que se encienden y se apagan, el humo de las chimeneas; un guardia de hierro en la muralla
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 194) * 319), y = Math.round(136 + h(k, 2, 194) * 40); if ((x > 20 && x < 58) || (x > 86 && x < 234) || (x > 246 && x < 278) || y > 146 && (x < 94 || x > 226)) continue; if (Math.floor(t * 0.5 + k * 0.7) % 3) R.pset(x, y, k % 3 ? P.pat : hex('#ffe8b0')); }
  for (let k = 0; k < 6; k++) { const x0 = [8, 64, 80, 236, 284, 304][k], y0 = 136 + (k % 3) * 4; for (let j = 0; j < 3; j++) { const u = (t * 0.12 + j / 3 + k * 0.17) % 1; a_mancha(R, x0 + u * 12, y0 - u * 22, 1 + u * 2.5, hex('#3a4062'), 0.45 * (1 - u)); } }
  { const u = (t * 0.06) % 1, x = Math.round(60 + Math.abs(u * 2 - 1) * 28); R.rect(x, 140, x + 2, 146, P.pS); R.rect(x, 138, x + 2, 139, P.pL); R.pset(x + (u < 0.5 ? 2 : 0), 139, Math.sin(t * 3) > -0.7 ? P.vL : P.pS); }
  // las banderolas de las torres de atrás, los estandartes junto al ventanal y las antorchas que tiemblan
  for (const [x, y, f] of [[39, 39, 0], [262, 51, 2]]) for (let j = 0; j < 3; j++) for (let i = 1; i <= 7 - j; i++) R.pset(x + i, y + j + Math.round(Math.sin(t * 5 + i * 0.6 + f) * 0.6), j === 0 ? P.verdeL : P.verde);
  const PV = [P.verde, P.verdeS, P.verdeL, P.oro, P.oro];
  a_estandarte(R, 106, 44, 14, 52, PV, t, 'doom', 0, 0.7); a_estandarte(R, 200, 44, 14, 52, PV, t, 'doom', 1.3, 0.7);
  a_antorcha(R, 113, 112, t, 0, 0.3); a_antorcha(R, 207, 112, t, 1, 0.3);
  if (lz > 0) a_luz(R, 160, 100, 22, P.vB, (0.1 + 0.05 * Math.sin(t * 2.3) + 0.03 * Math.sin(t * 7.1)) * lz, 34);
  // la nieve que cae por detrás de la balaustrada
  a_copos(R, t, { n: 40, vx: -12, vy: 14, sem: 42, c: [hex('#5a6890'), hex('#a8b4d0')], tam: 1 });
  return { suelo: 140, libre: [112, 208], balcon: { x0: 140, x1: 180, y: 140 }, ventanal: [140, 64, 180, 135], barandilla: { x0: 104, x1: 216, y: 130 } };
}

// lo de delante en la cámara 'balcon': la balaustrada de piedra (pasamanos y 130–133 con nieve, balaustres de jarrón hasta
// y 140, la base y 141–144) entre dos pilares (x 100–110 y 210–220), con la luz verde del ventanal; y unos copos sueltos
function a_balconDelante(R, t, o) {
  const P = a_PDO, { rect, pset } = R, lz = Math.max(0, Math.min(1, o.ventanal ?? 1));
  rect(104, 140, 216, 144, a_K); rect(105, 141, 215, 143, P.p); rect(105, 141, 215, 141, P.pL);
  const HW = [1, 1, 1, 2, 2, 2, 1];
  for (let x = 113; x <= 207; x += 6) for (let y = 134; y <= 140; y++) { const w = HW[y - 134]; for (let i = -w - 1; i <= w + 1; i++) pset(x + i, y, Math.abs(i) === w + 1 ? a_K : i < 0 ? P.pL : i === 0 ? P.p : P.pS); }
  rect(104, 130, 216, 133, a_K); rect(105, 131, 215, 132, P.p); rect(105, 131, 215, 131, P.pL);
  for (let x = 104; x <= 216; x++) { pset(x, 130, h(x, 0, 195) < 0.85 ? P.nvL : P.nv); if (h(x >> 1, 1, 195) < 0.45) pset(x, 129, P.nvL); if (h(x, 2, 195) < 0.15) pset(x, 128, P.nv); }
  for (const x0 of [100, 210]) { rect(x0, 124, x0 + 10, 144, a_K); rect(x0 + 1, 125, x0 + 9, 143, P.p); rect(x0 + 1, 125, x0 + 3, 143, P.pL); rect(x0 + 8, 125, x0 + 9, 143, P.pS); rect(x0 + 1, 134, x0 + 9, 134, P.pJ);
    rect(x0 - 1, 121, x0 + 11, 124, a_K); rect(x0, 122, x0 + 10, 123, P.pL); for (let i = -1; i <= 11; i++) pset(x0 + i, 120 - (i > 0 && i < 10 && h(x0, i, 196) < 0.5 ? 1 : 0), P.nvL); }
  if (lz > 0) a_luz(R, 160, 136, 44, P.vL, 0.28 * lz, 10);
  a_copos(R, t, { n: 16, vx: -16, vy: 20, sem: 43, c: [a_P.copoS, a_P.copo], tam: 2 });
}

// la señal de salida (caja verde con el hombrecillo que corre hacia la puerta y la flecha; sin letras) en (x, y), 19 × 7;
// encendida: los verdes más vivos y un brillo
function b_salida(R, x, y, on) {
  const { rect, pset } = R, V = on ? hex('#3ae08a') : hex('#2a8a5a'), B = on ? hex('#f0fff4') : hex('#c8dcd0');
  rect(x, y, x + 18, y + 7, hex('#1c2a24')); rect(x + 1, y + 1, x + 17, y + 6, V); rect(x + 1, y + 1, x + 17, y + 1, on ? hex('#a8ffd0') : hex('#4aa878'));
  for (const [i, j] of [[4, 2], [3, 3], [4, 3], [5, 3], [4, 4], [3, 5], [5, 5], [6, 4], [2, 4]]) pset(x + i, y + j, B);
  rect(x + 9, y + 2, x + 13, y + 5, B); rect(x + 10, y + 3, x + 12, y + 5, V);
  for (const [i, j] of [[14, 3], [15, 3], [16, 3], [15, 2], [15, 4]]) pset(x + i, y + j, B);
}

// lo que se ve de noche por el ventanal del pasillo (se pinta dentro del recorte del cristal, x 10–66, y 28–116): el
// cielo tramado con estrellas que titilan, la luna llena con sus mares y su halo, nubes oscuras de tres tonos que pasan
// despacio, la silueta lejana del campus (la cúpula y la antena con su luz roja que parpadea), la residencia de enfrente
// con sus ventanas (unas encendidas con cortina, una con la tele que cambia de color, una que se enciende y se apaga,
// alguien que cruza tras una), la acera con la farola y su charco de luz, un paseante y, delante de todo, el arce a
// contraluz: tronco, ramas que se mecen y las últimas hojas encendidas por la farola, que se van soltando
function b_fueraNoche(R, t, vent) {
  const { rect, pset, disco, linea } = R, K = hex('#1c1222');
  b_fijo(R, 'pasilloFueraN2', () => {
    const B = R.buf, cols = [hex('#0a0e2a'), hex('#121840'), hex('#1a2250'), hex('#242e60'), hex('#323c70')];
    for (let y = 0; y < 130; y++) for (let x = 0; x < 80; x++) B[y * 320 + x] = b_rampa(cols, (y - 24) / 80, x, y);
    for (let k = 0; k < 26; k++) { const x = 10 + Math.floor(h(k, 5, 120) * 56), y = 28 + Math.floor(h(k, 6, 120) * 26); B[y * 320 + x] = h(k, 7, 120) < 0.5 ? hex('#4a5490') : hex('#6a74a8'); }
    // la luna llena con su halo y sus mares
    b_halo(R, 21, 39, 15, 15, hex('#6a78b8'), 0.4);
    disco(21, 39, 5.6, hex('#fbf4dc')); for (const [x, y] of [[19, 37], [20, 37], [22, 40], [23, 40], [23, 41], [19, 41]]) pset(x, y, hex('#d8d0b4'));
    for (let a = 0; a < 6.3; a += 0.2) { const x = Math.round(21 + Math.cos(a) * 5), y = Math.round(39 + Math.sin(a) * 5); if (Math.cos(a) + Math.sin(a) > 0.6) pset(x, y, hex('#e0d6b8')); }
    // la silueta lejana del campus: la cúpula, los tejados y la antena (la luz roja va aparte)
    const SL = hex('#10142e'), SL2 = hex('#181e3e');
    for (let y = 60; y < 104; y++) for (let x = 10; x < 36; x++) { const cup = Math.hypot(x - 19, (y - 72) * 1.15) < 8 && y <= 72, blo = y >= 72, tej = y >= 76 && x > 26; if (cup || blo || tej) B[y * 320 + x] = (cup && x < 18 && y < 70) ? SL2 : SL; }
    rect(18, 60, 20, 63, SL); pset(19, 59, SL2); rect(31, 50, 32, 80, SL); for (let y = 56; y < 80; y += 4) linea(30, y, 33, y + 3, SL2);
    for (const [x, y] of [[12, 80], [15, 80], [24, 84], [12, 88], [28, 86], [33, 88]]) pset(x, y, hex('#8a6a3a'));
    // la residencia de enfrente: ladrillo de noche, cornisa, ventanas (oscuras: las luces van aparte)
    const L = { base: hex('#3e2428'), claro: hex('#4e2e30'), oscuro: hex('#2e1a1e'), quemado: hex('#361e22'), junta: hex('#2a2230') };
    b_ladrillos(R, 36, 54, 79, 104, L, 90);
    rect(35, 50, 79, 53, hex('#4a4658')); rect(35, 50, 79, 50, hex('#6a6678')); rect(35, 53, 79, 53, hex('#22202e'));
    for (let x = 37; x < 80; x += 4) pset(x, 52, hex('#2e2c3c'));
    for (const wx of [39, 52, 61]) for (const wy of [58, 72, 90]) { rect(wx - 1, wy - 1, wx + 6, wy + 9, hex('#22202c')); rect(wx, wy, wx + 5, wy + 8, hex('#141628')); pset(wx + 1, wy + 1, hex('#2a3058')); rect(wx - 1, wy + 9, wx + 6, wy + 9, hex('#5a5668')); rect(wx + 2, wy, wx + 3, wy + 8, hex('#22202c')); }
    rect(36, 100, 79, 104, hex('#2a2632')); rect(36, 100, 79, 100, hex('#4a4658'));
    // la acera de losas y el césped
    for (let y = 104; y < 112; y++) for (let x = 0; x < 80; x++) B[y * 320 + x] = (y === 104 || (x + (y > 107 ? 4 : 0)) % 9 === 0) ? hex('#22222e') : h(x, y, 121) < 0.2 ? hex('#34344a') : hex('#2c2c3e');
    for (let y = 112; y < 130; y++) for (let x = 0; x < 80; x++) B[y * 320 + x] = h(x, y, 122) < 0.12 ? hex('#0e1a14') : h(x >> 1, y, 123) < 0.3 ? hex('#1e3426') : hex('#16281e');
    // la farola: el poste, el farol y el charco de luz en la acera y la pared
    rect(42, 80, 43, 111, hex('#14141c')); rect(43, 82, 43, 110, hex('#3a3a48')); rect(40, 110, 45, 111, hex('#14141c'));
    rect(39, 74, 46, 76, hex('#14141c')); rect(40, 77, 45, 80, hex('#fff0b8')); rect(41, 77, 44, 77, C.blanco); rect(39, 81, 46, 81, hex('#14141c')); pset(42, 73, hex('#14141c'));
    b_halo(R, 43, 82, 18, 16, hex('#ffd890'), 0.42); b_halo(R, 42, 108, 22, 5, hex('#ffe0a0'), 0.5);
  });
  R.recorte(vent);
  // las estrellas que titilan, la luz roja de la antena y las nubes que pasan
  for (let k = 0; k < 14; k++) { const x = 10 + Math.floor(h(k, 1, 92) * 56), y = 28 + Math.floor(h(k, 2, 92) * 24); if (Math.hypot(x - 21, y - 39) > 9 && Math.sin(t * 2 + k * 1.7) > -0.2) pset(x, y, k % 4 ? hex('#c8d0f0') : C.blanco); }
  if (Math.sin(t * 3.2) > 0.2) { pset(31, 49, hex('#ff4a3a')); pset(32, 49, hex('#ff4a3a')); pset(31, 48, hex('#ff9a8a')); }
  for (const [x0, y, w, v] of [[0, 44, 22, 1.2], [50, 33, 16, 2.1]]) b_nube(R, 4 + ((x0 + t * v) % 84) - 14, y, w, [hex('#4a5486'), hex('#2e3866'), hex('#1e2650')], x0 + 3);
  // las ventanas de enfrente: unas encendidas con su cortina, la tele, la que se apaga, alguien que pasa
  const tele = [hex('#6aa0e8'), hex('#a8c8f8'), hex('#4a7ad0'), hex('#e0e8ff')][Math.floor(t * 3.3 + Math.sin(t * 7)) & 3];
  const luz = (wx, wy, c, cort) => { rect(wx, wy, wx + 5, wy + 8, c); rect(wx, wy, wx + 5, wy, b_mezcla(c, C.blanco, 0.3)); if (cort) { rect(wx, wy, wx + 1, wy + 8, cort); rect(wx + 5, wy, wx + 5, wy + 8, cort); } rect(wx + 2, wy, wx + 3, wy + 8, hex('#22202c')); };
  luz(61, 58, hex('#f0c060'), hex('#c84a3a')); luz(61, 72, tele, null); luz(52, 90, hex('#e8b050'), hex('#3a7a5a'));
  if ((t % 9) < 5.5) luz(52, 58, hex('#f6d890'), hex('#8a5aa8'));
  luz(39, 90, hex('#e0a848'), null);
  { const u = (t * 0.22) % 1.6; if (u < 1) { const sx = Math.round(39 + u * 6); for (let j = 0; j < 6; j++) for (let i = 0; i < 2; i++) pset(sx + i, 93 + j - (j === 0 && i ? 1 : 0), hex('#3a2418')); pset(sx, 92, hex('#3a2418')); } }
  // el paseante con la cartera, bajo la farola
  { const u = (t * 0.06 + 0.3) % 1, x = Math.round(lerp(72, 0, u)); b_figurita(R, x, 110, t, 5, { d: -1, cartera: true, ropa: hex('#4a4a6a'), pant: hex('#22263a') }); }
  // el arce a contraluz: las ramas se mecen; las hojas que quedan, encendidas del lado de la farola
  const ramas = [];
  const rama = (x, y, a, l, g, n, k) => {
    const sw = Math.sin(t * 1.3 + k * 1.7) * 0.025 * n + Math.sin(t * 3.1 + k) * 0.01 * n;
    const x1 = x + Math.cos(a + sw) * l, y1 = y + Math.sin(a + sw) * l;
    ramas.push([x, y, x1, y1, g]);
    if (n >= 4) { ramas.push(['h', x1, y1, k]); return; }
    rama(x1, y1, a - 0.42 - h(k, n, 124) * 0.2, l * 0.72, Math.max(1, g - 1), n + 1, k * 2 + 1);
    rama(x1, y1, a + 0.38 + h(k, n, 125) * 0.2, l * 0.7, Math.max(1, g - 1), n + 1, k * 2 + 2);
    if (n === 1) rama(x1, y1, a + 0.05, l * 0.55, 1, n + 2, k * 3 + 7);
  };
  rama(22, 113, -Math.PI / 2 - 0.05, 22, 4, 0, 1);
  const CO = [hex('#140e16'), hex('#2a2028'), hex('#4a3a3a'), hex('#7a5e4e')];
  for (const r of ramas) { if (r[0] === 'h') continue; const [x0, y0, x1, y1, g] = r;
    for (let i = 0; i < g; i++) linea(x0 - Math.floor(g / 2) + i, y0, x1 - Math.floor(g / 2) + i, y1, i === g - 1 && g > 1 ? CO[2] : i === 0 && g > 2 ? CO[0] : CO[1]);
    if (g > 1) linea(x0 + Math.ceil(g / 2), y0, x1 + Math.ceil(g / 2) - 1, y1, CO[3]); }
  for (const r of ramas) { if (r[0] !== 'h') continue; const [, x, y, k] = r;
    for (let i = 0; i < 9; i++) { const lx = Math.round(x + (h(k, i, 126) - 0.5) * 9), ly = Math.round(y + (h(k, i, 127) - 0.5) * 6); if (h(k, i, 128) < 0.25) continue;
      const cerca = Math.hypot(lx - 43, ly - 80) < 26, v = h(k, i, 129);
      pset(lx, ly, cerca ? (v < 0.4 ? hex('#f0a040') : v < 0.75 ? hex('#d86a2e') : hex('#ffd070')) : (v < 0.5 ? hex('#6a2a1e') : hex('#8a3e22'))); if (v > 0.6) pset(lx + 1, ly, cerca ? hex('#c8502a') : hex('#4a1e18')); } }
  b_hojas(R, t * 0.7, 3, 14, 40, 60, 112, 1, 13);
  R.recorte(null);
}

// el detalle fijo del campo de nieve: la tienda negra de pelo de yak de unos pastores con su corral de piedra, las
// huellas que bajan al camino, el montoncito de piedras talladas con su palo de banderas y los surcos que deja el viento
function c_montanaDetalle(R, fg) {
  const { rect, pset, linea, poligono } = R, negro = hex('#1c1222');
  // la tienda (x 138–158): lona negra tensada con vientos, la abertura del humo y el corral bajo de piedras
  { const x = 148, y = fg(148) + 4; poligono([[x - 10, y], [x - 7, y - 7], [x + 7, y - 7], [x + 10, y]], negro); poligono([[x - 9, y - 1], [x - 6, y - 6], [x + 6, y - 6], [x + 9, y - 1]], hex('#3a3040'));
    for (let i = -5; i <= 5; i += 2) linea(x + i, y - 6, x + i * 1.4, y - 1, hex('#2a2230')); rect(x - 1, y - 8, x + 1, y - 7, negro); rect(x - 2, y - 4, x + 1, y - 1, hex('#100a14'));
    linea(x - 10, y, x - 15, y + 2, hex('#5a5060')); linea(x + 10, y, x + 15, y + 2, hex('#5a5060')); rect(x - 9, y - 7, x + 9, y - 7, hex('#f6f8fc'));
    for (let i = 0; i < 9; i++) { const px = x - 22 + i * 2; pset(px, y + 1 - (i & 1), hex('#6e6a78')); pset(px, y - (i & 1), hex('#f6f8fc')); } }
  // las huellas que bajan de la estupa y cruzan la nieve hasta el camino
  for (let i = 0; i < 18; i++) { const u = i / 17, x = Math.round(lerp(236, 186, u) + Math.sin(u * 5) * 4), y = Math.round(lerp(142, 176, u)), d = i & 1 ? 2 : -2;
    pset(x + d, y, hex('#a8b8d8')); pset(x + d + 1, y, hex('#b8c8e4')); pset(x + d, y - 1, hex('#ffffff')); }
  for (let i = 0; i < 14; i++) { const x = 8 + i * 6, y = 172 - Math.round(i * 0.9) + (i & 1); pset(x, y, hex('#a8b8d8')); pset(x + 1, y, hex('#b8c8e4')); pset(x, y - 1, hex('#ffffff')); }
  // el montoncito de piedras talladas, con su palo y un jirón de tela
  { const x = 246, y = 174; for (let k = 0; k < 9; k++) { const sx = x - 6 + (k % 4) * 4 + (k > 3 ? 2 : 0) + (k > 6 ? 2 : 0), sy = y - (k > 3 ? 3 : 0) - (k > 6 ? 3 : 0); rect(sx - 2, sy - 2, sx + 1, sy, hex('#2a2632')); rect(sx - 1, sy - 2, sx + 1, sy - 1, k & 1 ? hex('#8a8494') : hex('#6e6a78')); pset(sx, sy - 1, [hex('#e8c040'), hex('#6a9ad8'), hex('#d86a5a')][k % 3]); pset(sx - 1, sy - 3, hex('#ffffff')); }
    rect(x, 152, x, 166, hex('#5e3a1e')); pset(x, 151, hex('#e8b830')); }
  // los surcos del viento en la nieve de abajo
  for (let k = 0; k < 16; k++) { const x0 = Math.floor(h(k, 1, 140) * 300), y0 = 162 + Math.floor(h(k, 2, 140) * 16), l = 8 + Math.floor(h(k, 3, 140) * 16); if (x0 > 228 && x0 < 262) continue;
    for (let i = 0; i < l; i++) { const y = y0 + Math.round(Math.sin(i * 0.35) * 1.2); pset(x0 + i, y, hex('#c6d2ea')); if (i % 3 === 0) pset(x0 + i, y - 1, hex('#ffffff')); } }
}

// la vida del campo de nieve (cada fotograma): dos caravanas de yaks con su pastor que cruzan despacio la loma (por
// detrás del muro mani), el humo de la tienda, y las rachas de nieve que el viento arrastra por el suelo
function c_montanaVida(R, t, fg, vent) {
  const { pset, rect } = R, yT = fg(148) + 4, oculto = (x, y) => (x >= 57 && x <= 135 && y >= 124) || (x >= 138 && x <= 158 && y >= yT - 7 && y <= yT);
  const px = (x, y, c) => { if (!oculto(x, y)) pset(x, y, c); };
  for (const off of [0, 130]) for (let k = 0; k < 4; k++) { const x = Math.round(((t * 2.6 + off) % 260) - 50 - k * 11); if (x < -8 || x > 184) continue; const y = fg(Math.max(0, Math.min(319, x))) + 1, p = Math.floor(t * 4 + k) % 2;
    if (k === 3) { // el pastor, con su chuba y su vara
      for (let j = 0; j < 6; j++) px(x, y - 1 - j, j > 3 ? hex('#c88a5a') : hex('#4a3428')); px(x + 1, y - 3, hex('#4a3428')); px(x - 1 + p, y, hex('#2a1a14')); px(x + 1 - p, y, hex('#2a1a14')); px(x, y - 7, hex('#2a1a14'));
      for (let j = 0; j < 8; j++) px(x + 2, y - j, hex('#8a6a44')); continue; }
    for (let i = -3; i <= 3; i++) for (let j = 1; j <= 3; j++) px(x + i, y - 1 - j, j === 3 && i > -2 ? hex('#3a2c28') : hex('#2a2020'));
    px(x - 1, y - 5, hex('#2a2020')); px(x, y - 5, hex('#2a2020'));   // la joroba
    for (let i = -2; i <= 1; i++) px(x + i, y - 5, i & 1 ? hex('#c84a3a') : hex('#3a6ad0'));   // la carga
    px(x + 4, y - 3, hex('#2a2020')); px(x + 5, y - 2, hex('#2a2020')); px(x + 4, y - 4, hex('#e8e0d0')); px(x + 5, y - 4, hex('#e8e0d0'));   // la cabeza y los cuernos
    px(x - 2 + p, y, hex('#1a1414')); px(x + 2 - p, y, hex('#1a1414')); px(x - 4, y - 2 - p, hex('#2a2020')); }
  c_humo(R, t, 148, fg(148) - 4, 0.6, 22, 0.35);
  // las rachas de nieve rasante
  const n = 9 + Math.round(vent * 10);
  for (let k = 0; k < n; k++) { const v = 30 + h(k, 4, 141) * 30, x0 = ((h(k, 5, 141) * 420 + t * v) % 420) - 60, y0 = 150 + Math.floor(h(k, 6, 141) * 28), l = 10 + Math.floor(h(k, 7, 141) * 14);
    for (let i = 0; i < l; i++) { const x = Math.round(x0 + i), y = y0 + Math.round(Math.sin((x + t * 20) * 0.15) * 1); if (x < 0 || x > 319) continue; const a = Math.sin(i / l * Math.PI); if (c_umbral(x, y) < a * 0.8) c_tine(R, x, y, hex('#ffffff'), 0.6 * a); } }
}

// EL PATIO DEL MONASTERIO
// el detalle del muro encalado del patio (fijo): churretes de cal bajo el alero, desconchones que enseñan la piedra,
// grietas, un mandala pintado a la izquierda, dos hornacinas para las lámparas de manteca (la llama la pinta c_patio) y
// un thangka colgado a la derecha (brocado azul, rojo y amarillo; la pintura solo insinúa una figura con su halo)
function c_patioMuro(R) {
  const B = R.buf, { rect, pset, disco, linea } = R, libre = (x) => !(x > 100 && x < 220) && !(x > 38 && x < 76) && !(x > 246 && x < 282);
  // los churretes de cal y de hollín que bajan del alero
  for (let k = 0; k < 46; k++) { const x = Math.floor(h(k, 1, 110) * 318); if (!libre(x)) continue; const l = 5 + Math.floor(h(k, 2, 110) * 20), osc = h(k, 3, 110) < 0.3;
    for (let j = 0; j < l; j++) { const y = 51 + j, i = y * 320 + x, u = 1 - j / l; B[i] = c_mix(B[i], osc ? hex('#9a9284') : hex('#d6cebe'), u * 0.55); if (j < l * 0.6 && h(k, j, 111) < 0.5) B[i + 1] = c_mix(B[i + 1], hex('#dcd4c4'), u * 0.4); } }
  // los desconchones: la cal se ha caído y asoma la piedra con su mortero
  for (const [cx, cy, rx, ry, k] of [[88, 68, 9, 6, 1], [238, 62, 7, 5, 2], [300, 118, 8, 6, 3], [8, 60, 6, 4, 4], [228, 132, 7, 4, 5], [211, 118, 4, 5, 6]]) {
    for (let y = cy - ry - 1; y <= cy + ry + 1; y++) for (let x = cx - rx - 1; x <= cx + rx + 1; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry) + (c_ruido1(x / 2 + y, k) - 0.5) * 0.5;
      if (d > 1.12 || x < 0 || x > 319) continue; if (d > 1) { B[y * 320 + x] = y > cy ? hex('#fbf8f0') : hex('#b0a694'); continue; }
      const fila = Math.floor((y + 40) / 4), sx = (x + fila * 3) % 7, sy = (y + 40) % 4; let c = h(Math.floor((x + fila * 3) / 7), fila, 112 + k) < 0.4 ? hex('#a89c8c') : h(Math.floor((x + fila * 3) / 7), fila, 113) < 0.5 ? hex('#8e8272') : hex('#b8ac9a');
      if (sx === 0 || sy === 3) c = hex('#6e6456'); else if (sy === 0) c = c_mix(c, hex('#e0d8c8'), 0.3); B[y * 320 + x] = c; } }
  // las grietas finas
  for (const [x0, y0, k] of [[30, 52, 1], [298, 52, 2], [236, 108, 3], [6, 112, 4]]) { let x = x0, y = y0; for (let i = 0; i < 26; i++) { x += h(k, i, 114) < 0.5 ? (h(k, i, 115) < 0.5 ? 1 : -1) : 0; y += 1; if (y > 140) break; pset(x, y, hex('#a09684')); pset(x + 1, y, hex('#faf6ee')); if (i === 12) { pset(x - 1, y + 1, hex('#a09684')); pset(x - 2, y + 2, hex('#a09684')); } } }
  // el mandala pintado (descolorido): el círculo de fuego, el palacio cuadrado con sus cuatro puertas y el loto del centro
  { const cx = 19, cy = 80; disco(cx + 1, cy + 1, 13, hex('#c8c0b2'));
    for (let y = cy - 13; y <= cy + 13; y++) for (let x = cx - 13; x <= cx + 13; x++) { const d = Math.hypot(x - cx, y - cy), ax = Math.abs(x - cx), ay = Math.abs(y - cy); if (d > 12.6) continue;
      let c = d > 11.4 ? (Math.floor(Math.atan2(y - cy, x - cx) * 5) & 1 ? hex('#d8a020') : hex('#c84a2a')) : d > 10.4 ? hex('#3a6ad0') : hex('#2a3a6a');
      if (ax <= 7 && ay <= 7) { c = ax === 7 || ay === 7 ? hex('#e8b830') : ax === 6 || ay === 6 ? hex('#a8302a') : hex('#3a9a4a'); if ((ax <= 1 && ay >= 6) || (ay <= 1 && ax >= 6)) c = hex('#f0ece2'); }
      if (d < 4.6) c = d < 1.5 ? hex('#d03a3a') : d < 3.4 ? hex('#f0ece2') : hex('#e8b830');
      if (c_umbral(x, y) < 0.18) c = c_mix(c, hex('#f0ece2'), 0.45); pset(x, y, c); }
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; pset(Math.round(cx + Math.cos(a) * 5.4), Math.round(cy + Math.sin(a) * 5.4), hex('#d86a8a')); } }
  // las hornacinas de las lámparas de manteca: arco oscuro, el cuenco de latón y el hollín encima
  for (const [nx, ny] of [[90, 88], [230, 86]]) { rect(nx - 6, ny - 7, nx + 6, ny + 6, hex('#8a8070')); disco(nx, ny - 6, 6, hex('#8a8070'));
    rect(nx - 5, ny - 6, nx + 5, ny + 5, hex('#3a2a2a')); disco(nx, ny - 6, 5, hex('#3a2a2a')); rect(nx - 5, ny + 5, nx + 5, ny + 6, hex('#d8d0c2')); rect(nx - 5, ny + 4, nx + 5, ny + 4, hex('#5a4038'));
    for (let j = 1; j < 10; j++) for (let i = -3; i <= 3; i++) if (c_umbral(nx + i, ny - 12 - j) < (1 - j / 10) * 0.5) c_tine(R, nx + i, ny - 12 - j, hex('#8a8478'), 0.5);
    rect(nx - 3, ny + 1, nx + 3, ny + 3, hex('#a87a18')); rect(nx - 3, ny + 1, nx + 3, ny + 1, hex('#f0c848')); pset(nx, ny, hex('#f8f0c8')); }
  // el thangka: varilla de arriba, velo amarillo recogido, brocado, la pintura y la varilla de abajo con sus pomos
  { const x0 = 292, x1 = 312, y0 = 64, y1 = 108;
    for (let y = y0 + 2; y <= y1 + 1; y++) for (let x = x0 + 1; x <= x1 + 1; x++) c_tine(R, x + 1, y, hex('#9a9284'), 0.35);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const bx = Math.min(x - x0, x1 - x), by = Math.min(y - y0, y1 - y - 6);
      let c = bx < 2 || by < 2 ? hex('#3a6ad0') : bx < 3 || by < 3 ? hex('#a8302a') : bx < 4 || by < 4 ? hex('#e8b830') : null;
      if (y > y1 - 8 && bx >= 2) c = (x + y) % 5 === 0 ? hex('#e8b830') : hex('#3a6ad0');
      if (!c) { const u = (y - y0 - 4) / (y1 - y0 - 14); c = u < 0.7 ? (c_umbral(x, y) < u * 0.7 ? hex('#5a9aa0') : hex('#3a7a8a')) : hex('#4a8a4a');
        const d = Math.hypot(x - 302, y - 80); if (d < 5.5) c = d > 4.5 ? hex('#f0c848') : hex('#f8e8a0');
        if (y >= 82 && y <= 94 && Math.abs(x - 302) <= (y - 80) * 0.45) c = Math.abs(x - 302) < 1 ? hex('#741c1c') : hex('#c84a3a');
        if (y >= 77 && y <= 81 && Math.abs(x - 302) <= 1.5 && Math.hypot(x - 302, y - 79) < 2.2) c = hex('#e8b830');
        if (y >= 94 && y <= 96 && Math.abs(x - 302) <= 6) c = (x & 1) ? hex('#e88aa8') : hex('#c85a7a'); }
      pset(x, y, c); }
    rect(x0 - 3, y0 - 1, x1 + 3, y0, hex('#5e3a1e')); pset(x0 - 3, y0 - 1, hex('#e8b830')); pset(x1 + 3, y0 - 1, hex('#e8b830'));
    rect(x0, y0 + 1, x1, y0 + 4, hex('#e8c040')); for (let x = x0; x <= x1; x += 3) pset(x, y0 + 4, hex('#a87a18'));
    rect(x0 - 2, y1 + 1, x1 + 2, y1 + 2, hex('#3a2418')); rect(x0 - 4, y1, x0 - 2, y1 + 3, hex('#e8b830')); rect(x1 + 2, y1, x1 + 4, y1 + 3, hex('#e8b830')); }
}

// la vida del patio (cada fotograma): las llamas de las lámparas de manteca, dos cuerdas de banderas bajo el alero, las
// cintas del thangka que mueve el aire, dos palomas que picotean en las losas y el mastín que duerme junto a la leña
// (respira y mueve la oreja)
function c_patioVida(R, t) {
  const { pset, rect, disco } = R;
  for (const [nx, ny, k] of [[90, 88, 0], [230, 86, 1]]) { const f = Math.sin(t * 11 + k * 3) > 0.3 ? 1 : 0, s = Math.round(Math.sin(t * 2.3 + k) * 0.6);
    c_resplandor(R, nx, ny - 3, 9, hex('#ffc860'), 0.32 + f * 0.06, 1.1);
    pset(nx + s, ny - 1, hex('#ffd060')); pset(nx + s, ny - 2, hex('#ffd060')); pset(nx + s, ny - 3 - f, hex('#fff4c0')); pset(nx, ny, hex('#fff8e0')); }
  c_cuerdaBanderas(R, t, -2, 54, 102, 60, 3, 0.7, 6);
  c_cuerdaBanderas(R, t, 218, 60, 290, 55, 3, 0.7, 6);
  for (const [x, k] of [[296, 0], [308, 1]]) for (let j = 0; j < 9; j++) { const dx = Math.round(Math.sin(t * 2.1 + k * 1.4 - j * 0.35) * j * 0.22); pset(x + dx, 69 + j, j & 1 ? hex('#3a9a4a') : hex('#d03a3a')); }
  // las palomas del suelo: el cuerpo, la cabeza que baja a picotear y las patitas
  for (const [x0, k] of [[78, 0], [96, 1]]) { const x = x0 + Math.round(Math.sin(t * 0.5 + k * 2) * 4), y = 170 + k * 3, pic = Math.sin(t * 4 + k * 2.5) > 0.4 ? 2 : 0, d = Math.cos(t * 0.5 + k * 2) > 0 ? 1 : -1;
    rect(x - 2, y - 3, x + 2, y - 1, hex('#7a7e8e')); rect(x - 2, y - 3, x + 1, y - 3, hex('#9aa0b0')); pset(x - 2 * d, y - 2, hex('#5a5e6e'));
    pset(x + 3 * d, y - 4 + pic, hex('#5a5e6e')); pset(x + 3 * d, y - 3 + pic, hex('#6a9a8a')); pset(x + 4 * d, y - 4 + pic, C.naranja); pset(x, y, hex('#c86a4a')); pset(x + d, y, hex('#c86a4a')); }
  // el mastín tibetano dormido, enroscado junto a la leña
  { const x = 306, y = 162, r = Math.sin(t * 1.6) > 0 ? 1 : 0, oreja = Math.sin(t * 0.7) > 0.93 ? 1 : 0;
    for (let j = 0; j < 4; j++) for (let i = -1; i < 18; i++) if ((j + 1) % 2 === 0 || c_umbral(x - 9 + i, y + 2 + j) < 0.5) c_tine(R, x - 9 + i, y + 2 + j, hex('#3a3448'), 0.35);
    disco(x, y - 1 - r * 0.5, 6 + r * 0.3, hex('#1e1a1e')); rect(x - 8, y - 2, x + 8, y + 1, hex('#1e1a1e')); rect(x - 7, y - 5 - r, x + 6, y - 2, hex('#2e2828')); rect(x - 5, y - 6 - r, x + 3, y - 6 - r, hex('#4a4040'));
    disco(x + 6, y - 5 - r, 3, hex('#4a3a30')); rect(x + 4, y - 7 - r, x + 8, y - 7 - r, hex('#6a5444'));   // la cola enroscada
    rect(x - 12, y - 3, x - 6, y + 1, hex('#2e2828')); rect(x - 13, y - 1, x - 11, y + 1, hex('#a8743c')); pset(x - 13, y, hex('#1e1a1e'));   // la cabeza sobre las patas
    pset(x - 10, y - 2, hex('#a8743c')); pset(x - 8, y - 2, hex('#a8743c')); pset(x - 9, y - 1, hex('#1e1a1e')); rect(x - 9, y - 4 - oreja, x - 7, y - 4, hex('#1e1a1e'));
    rect(x - 12, y + 1, x - 7, y + 2, hex('#a8743c')); pset(x - 11, y + 2, hex('#7a5430')); }
}

// el detalle fijo del muro de la forja: el mandil de cuero colgado, la muela de afilar con su bastidor y las barras de
// hierro apoyadas (a la izquierda), y entre la mesa y el horno una repisa con crisoles, tarros y un rollo de cuerda,
// clavos con herraduras y aros, y la cadena del techo con su gancho para el farol (la llama la pinta c_forja)
function c_forjaMuro(R) {
  const { rect, pset, linea, disco, poligono } = R, negro = hex('#120c14'), cuero = hex('#6a3a22'), cueroS = hex('#3e2214'), cueroL = hex('#94583a'), metal = hex('#8a8e9e'), metalS = hex('#4a4c5a'), metalL = hex('#c8ccd8');
  // el mandil de cuero colgado de un clavo
  pset(36, 22, metalL); linea(36, 22, 30, 28, cueroS); linea(36, 22, 42, 28, cueroS);
  poligono([[29, 28], [43, 28], [45, 54], [27, 54]], negro); poligono([[30, 29], [42, 29], [44, 53], [28, 53]], cuero);
  for (let y = 30; y < 53; y++) { pset(30 + Math.floor((y - 29) / 12), y, cueroL); pset(42 + Math.floor((y - 29) / 12), y, cueroS); if (y % 7 === 3) for (let x = 33; x < 41; x += 2) pset(x, y, cueroS); }
  rect(31, 40, 41, 41, cueroS); for (let k = 0; k < 6; k++) pset(32 + Math.floor(h(k, 1, 130) * 9), 32 + Math.floor(h(k, 2, 130) * 20), hex('#2a1810'));
  // la muela de afilar en su bastidor, con la manivela
  rect(4, 128, 24, 146, negro); rect(5, 140, 23, 141, hex('#5e3a1e')); rect(6, 128, 7, 146, hex('#83552c')); rect(21, 128, 22, 146, hex('#83552c'));
  disco(14, 128, 10, negro); disco(14, 128, 9, hex('#7a7468')); disco(13, 127, 6, hex('#8e887a')); R.anillo(14, 128, 9, hex('#5a5448'));
  for (let k = 0; k < 18; k++) { const a = k / 18 * Math.PI * 2; pset(Math.round(14 + Math.cos(a) * 7), Math.round(128 + Math.sin(a) * 7), hex('#6a6458')); }
  disco(14, 128, 2, metalS); pset(14, 128, metalL); linea(14, 128, 24, 122, metalS); rect(24, 119, 25, 123, hex('#a8743c'));
  // las barras de hierro apoyadas en el muro
  for (let k = 0; k < 4; k++) { const x0 = 2 + k * 3, x1 = 8 + k * 4; linea(x0, 146, x1, 102 + k * 3, negro); linea(x0 + 1, 146, x1 + 1, 102 + k * 3, k & 1 ? metal : metalS); pset(x1 + 1, 102 + k * 3, metalL); }
  // la repisa entre la mesa y el horno: crisoles, tarros de barro, el rollo de cuerda
  rect(134, 52, 216, 55, negro); rect(135, 52, 215, 53, hex('#6a4228')); rect(135, 52, 215, 52, hex('#a8743c'));
  for (const bx of [140, 210]) { poligono([[bx - 3, 55], [bx + 3, 55], [bx, 62]], negro); poligono([[bx - 2, 55], [bx + 2, 55], [bx, 60]], hex('#4e2e1a')); }
  for (const [x, w, al, c] of [[142, 3, 8, hex('#8a4a2a')], [152, 4, 11, hex('#a8643a')], [162, 3, 6, hex('#5a5e6e')], [172, 5, 9, hex('#7a3a24')], [184, 3, 7, hex('#a8643a')], [204, 4, 5, hex('#4a4c5a')]]) {
    rect(x - w - 1, 51 - al, x + w + 1, 51, negro); rect(x - w, 52 - al, x + w, 51, c); rect(x - w, 52 - al, x - w + 1, 51, c_mix(c, hex('#ffffff'), 0.25)); rect(x + w - 1, 52 - al, x + w, 51, c_mix(c, negro, 0.4));
    rect(x - w + 1, 51 - al, x + w - 1, 51 - al, c_mix(c, negro, 0.5)); if (al > 8) { rect(x - 1, 49 - al, x + 1, 50 - al, negro); pset(x, 50 - al, c); } }
  disco(194, 47, 4, negro); disco(194, 47, 3, hex('#a8885a')); R.anillo(194, 47, 2, hex('#7a5e3a')); pset(193, 46, hex('#d8b47a'));
  // los clavos con herraduras, aros y una sierra
  for (const [x, y] of [[146, 70], [158, 74], [170, 70]]) { pset(x, y - 1, metalL); for (let a = 0; a <= 16; a++) { const an = Math.PI * (0.1 + a / 16 * 0.8), px = Math.round(x + Math.cos(an) * 3), py = Math.round(y + 1 + Math.sin(an) * 4); pset(px, py, a < 8 ? metal : metalS); } }
  for (const [x, y, r] of [[186, 74, 5], [200, 76, 4]]) { pset(x, y - r - 1, metalL); R.anillo(x, y, r, metalS); R.anillo(x - 0.5, y - 0.5, r, metal); }
  rect(138, 84, 168, 87, negro); rect(139, 85, 160, 86, metal); for (let x = 139; x < 160; x += 2) pset(x, 87, metalS); rect(160, 84, 167, 87, hex('#a8743c')); pset(139, 85, metalL);
  // la cadena que baja de la viga con su gancho y el farol
  for (let y = 14; y < 32; y += 3) { R.anillo(124, y, 1, metalS); pset(124, y + 1, metal); }
  rect(119, 32, 129, 33, negro); rect(120, 34, 128, 44, negro); rect(121, 35, 127, 43, hex('#3a2418')); rect(120, 44, 128, 45, hex('#5a5e6e')); pset(124, 31, metalL);
}

// el detalle fijo del suelo de la forja: recortes de hierro, cascarilla alrededor del yunque, una barra tirada y huellas
function c_forjaSuelo(R) {
  const { pset, linea, rect } = R;
  for (let k = 0; k < 60; k++) { const a = h(k, 1, 131) * Math.PI * 2, d = 18 + h(k, 2, 131) * 24, x = Math.round(163 + Math.cos(a) * d), y = Math.round(158 + Math.sin(a) * d * 0.25); if (y < 152 || y > 179) continue; pset(x, y, k & 1 ? hex('#2a2a34') : hex('#5a4a44')); }
  for (const [x, y, l, k] of [[70, 166, 9, 0], [104, 172, 6, 1], [88, 158, 5, 2], [176, 174, 7, 3]]) { linea(x, y, x + l, y - (k & 1), hex('#1a1214')); linea(x, y - 1, x + l, y - 1 - (k & 1), hex('#6e7282')); pset(x + 1, y - 1, hex('#a8acbc')); }
  rect(122, 176, 150, 177, hex('#1a1214')); rect(122, 175, 150, 175, hex('#5a5e6e')); pset(124, 175, hex('#a8acbc'));
  for (let k = 0; k < 7; k++) { const x = 40 + k * 13, y = 164 + (k & 1) * 4; pset(x, y, hex('#2a201e')); pset(x + 1, y, hex('#2a201e')); pset(x, y + 1, hex('#2a201e')); }
}

// el detalle fijo del plano de cerca: en el muro desenfocado, una repisa con tarros y un candil, herraduras colgadas y
// un farol apagado; en el yunque, las marcas de los martillazos en la cara, la cascarilla y las vetas de forja del
// costado, el sello del herrero (un aro con una estrella, en relieve) y el martillo con su bisel y su cuña
function c_forjaCercaDetalle(R) {
  const { rect, pset, linea } = R, blando = (x0, y0, x1, y1, c, k = 0.7) => { for (let y = y0 - 1; y <= y1 + 1; y++) for (let x = x0 - 1; x <= x1 + 1; x++) { const fuera = x < x0 || x > x1 || y < y0 || y > y1; if (!fuera || c_umbral(x, y) < 0.5) c_tine(R, x, y, c, fuera ? k * 0.5 : k); } };
  // la repisa con sus tarros (siluetas blandas con el filo encendido por el fuego)
  blando(134, 58, 204, 61, hex('#1a1214')); blando(134, 58, 204, 58, hex('#7a5a40'), 0.5);
  for (const [x, w, al] of [[152, 4, 9], [163, 5, 12], [176, 3, 7], [186, 5, 10], [198, 3, 8]]) { blando(x - w, 58 - al, x + w, 57, hex('#1e1618'), 0.75); blando(x - 1, 56 - al, x + 1, 58 - al, hex('#1e1618'), 0.75); blando(x + w, 58 - al + 1, x + w, 56, hex('#c87a3a'), 0.45); }
  // las herraduras colgadas de sus clavos
  for (const [x, y] of [[100, 26], [112, 30], [124, 24]]) for (let a = 0; a <= 20; a++) { const an = Math.PI * (0.1 + a / 20 * 0.8), px = Math.round(x + Math.cos(an) * 4), py = Math.round(y + Math.sin(an) * 5); blando(px, py, px, py, hex('#1a1214'), 0.6); if (a < 4) c_tine(R, px + 1, py, hex('#c87a3a'), 0.4); }
  // el farol del muro (apagado: solo el reflejo del fuego en el cristal)
  blando(236, 26, 246, 42, hex('#1a1214'), 0.6); blando(238, 28, 244, 40, hex('#5a3a2a'), 0.5); blando(243, 30, 244, 38, hex('#f8a040'), 0.35); blando(240, 22, 242, 25, hex('#1a1214'), 0.6);
  // la cara de golpeo: las marcas de los martillazos (un hoyuelo con su sombra y su brillo)
  for (let k = 0; k < 26; k++) { const x = 70 + Math.floor(h(k, 1, 120) * 240), y = 113 + Math.floor(h(k, 2, 120) * 8); if (Math.abs(x - 160) < 22 || (x > 220 && x < 252) || (x > 260 && x < 274)) continue;
    pset(x, y, hex('#6a6e7e')); pset(x + 1, y, hex('#5a5e6e')); pset(x, y + 1, hex('#e8ecf4')); if (k % 3 === 0) pset(x + 2, y + 1, hex('#e8ecf4')); }
  // el costado: vetas de forja, cascarilla, el sello del herrero y gotas de agua secas
  for (let k = 0; k < 30; k++) { const x0 = 112 + Math.floor(h(k, 3, 121) * 186), y = 134 + Math.floor(h(k, 4, 121) * 44), l = 4 + Math.floor(h(k, 5, 121) * 14);
    if (x0 < 104 + (y - 128) * 0.35 + 4) continue; for (let i = 0; i < l; i++) pset(x0 + i, y + (i > l / 2 && k & 1 ? 1 : 0), k % 3 ? hex('#2e303c') : hex('#5a5e6e')); }
  for (let k = 0; k < 40; k++) { const x = 116 + Math.floor(h(k, 6, 122) * 186), y = 132 + Math.floor(h(k, 7, 122) * 46); if (x < 104 + (y - 128) * 0.35 + 3) continue; pset(x, y, hex('#6a4a3a')); if (k & 1) pset(x + 1, y, hex('#4a3a34')); }
  { const cx = 252, cy = 152; R.anillo(cx, cy, 8, hex('#22242e')); R.anillo(cx - 0.5, cy - 0.5, 7, hex('#5a5e6e')); R.anillo(cx, cy, 6, hex('#22242e'));
    for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * Math.PI * 2 / 5, b = a + Math.PI * 4 / 5; linea(Math.round(cx + Math.cos(a) * 4), Math.round(cy + Math.sin(a) * 4), Math.round(cx + Math.cos(b) * 4), Math.round(cy + Math.sin(b) * 4), hex('#6a6e7e')); }
    pset(cx - 1, cy - 1, hex('#8a8e9e')); }
  // el pulido del costado: dos bandas de reflejo en diagonal (la ventana y el fuego) y la base que se oscurece
  for (let y = 131; y < 180; y++) for (let x = Math.ceil(104 + (y - 128) * 0.35) + 2; x < 304; x++) { const q = ((x - y * 0.7) % 90 + 90) % 90;
    if (q < 7) c_tine(R, x, y, q < 2 ? hex('#a8acbc') : hex('#6e7282'), (q < 2 ? 0.55 : 0.4) * (c_umbral(x, y) < 0.7 ? 1 : 0.4));
    else if (q > 40 && q < 44) c_tine(R, x, y, hex('#5a5e6e'), 0.35);
    if (y > 168) c_tine(R, x, y, hex('#14121a'), (y - 168) / 16); }
  // el canto superior del costado, gastado y brillante
  for (let x = 106; x < 304; x++) if (h(x >> 1, 9, 123) < 0.55) pset(x, 128, hex('#7a7e8e'));
  // el martillo: bisel claro, las caras de golpe, la cuña del mango y el desgaste
  rect(223, 100, 249, 100, hex('#a8acbc')); rect(226, 101, 244, 113, hex('#6a6e7e')); for (let k = 0; k < 14; k++) pset(226 + Math.floor(h(k, 8, 124) * 18), 102 + Math.floor(h(k, 9, 124) * 11), k & 1 ? hex('#4a4e5c') : hex('#8a8e9e'));
  rect(222, 104, 222, 110, hex('#e4e8f0')); rect(250, 104, 250, 110, hex('#2a2c38')); rect(234, 96, 238, 97, hex('#3a2418')); pset(236, 96, hex('#c8ccd8'));
}

// la pared tallada de la puerta del reino (cada fotograma): dos columnas de signos (sin letras: aros, rombos, cruces y
// puntas) entre las pilastras y el marco, que se encienden uno tras otro de abajo arriba; a la derecha, un gran aro
// tallado en relieve con su anillo de luz que late, y dos venas de lava que gotean por la roca
function c_infiernoRunas(R, t, P) {
  const SIG = [[0b010, 0b101, 0b010, 0b101, 0b010], [0b111, 0b010, 0b111, 0b010, 0b111], [0b101, 0b010, 0b101, 0b010, 0b101], [0b010, 0b111, 0b010, 0b010, 0b111], [0b110, 0b011, 0b110, 0b011, 0b110]];
  for (const [cx, k0] of [[94, 0], [238, 3]]) for (let k = 0; k < 7; k++) { const y0 = 44 + k * 12, sg = SIG[(k + k0) % 5], on = ((Math.floor(t * 3) - (6 - k) - k0 + 70) % 10) < 3;
    R.rect(cx - 3, y0 - 1, cx + 3, y0 + 5, P.roca[1]); R.rect(cx - 3, y0 - 1, cx + 3, y0 - 1, P.roca[0]); R.rect(cx - 3, y0 + 5, cx + 3, y0 + 5, P.roca[4]);
    for (let j = 0; j < 5; j++) for (let i = 0; i < 3; i++) if (sg[j] & (4 >> i)) R.pset(cx - 1 + i, y0 + j, on ? P.lava[4] : P.lava[0]);
    if (on) for (let j = -2; j <= 6; j++) for (let i = -5; i <= 5; i++) if (R.b4(cx + i, y0 + j) < 0.22) R.pset(cx + i, y0 + j, d_mez(R.pget(cx + i, y0 + j), P.lava[3], 0.35)); }
  { const cx = 296, cy = 70, l = 0.5 + 0.5 * Math.sin(t * 1.3);
    for (let y = cy - 17; y <= cy + 17; y++) for (let x = cx - 17; x <= cx + 17; x++) { const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy); if (d > 16.5) continue;
      if (d > 15) R.pset(x, y, y < cy ? P.roca[0] : P.roca[4]); else if (d > 13) R.pset(x, y, y < cy ? P.roca[4] : P.roca[1]); else if (Math.abs(d - 9) < 0.7) R.pset(x, y, l > 0.6 ? P.lava[3] : P.lava[1]); else if (d < 3) R.pset(x, y, P.lava[l > 0.5 ? 4 : 2]); }
    for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2 + t * 0.2; R.pset(Math.round(cx + Math.cos(an) * 11.5), Math.round(cy + Math.sin(an) * 11.5), P.lava[2]); R.linea(Math.round(cx + Math.cos(an) * 4), Math.round(cy + Math.sin(an) * 4), Math.round(cx + Math.cos(an) * 7), Math.round(cy + Math.sin(an) * 7), P.roca[0]); } }
  for (const [vx, y0, y1, k] of [[312, 92, 150, 0], [276, 96, 140, 1]]) { for (let y = y0; y <= y1; y++) { const x = vx + Math.round(Math.sin(y * 0.3 + k) * 1.2); R.pset(x, y, (y - Math.floor(t * 18) + k * 5) % 9 < 2 ? P.lava[4] : P.lava[1]); R.pset(x + 1, y, P.roca[0]); }
    const g = (t * 30 + k * 20) % 40; R.pset(vx, Math.round(y1 + g * 0.3), P.lava[3]); }
}

// el suelo de obsidiana de la sala del trono, vivo (cada fotograma): el reflejo de la lava del canal que tiembla en
// franjas bajo cada fuente de luz [x, ancho], grietas finas que se encienden y se apagan, y unos guijarros de obsidiana
// con su filo de luz; K es la paleta (roja, verde o tramada), y0 la primera fila del suelo
function c_infiernoSuelo(R, t, K, y0, fuentes, libre) {
  for (const [fx, w] of fuentes) for (let y = y0; y < Math.min(180, y0 + 26); y++) { const f = 1 - (y - y0) / 26, sx = Math.round(Math.sin(t * 2.4 + y * 0.9) * 1.5);
    for (let x = fx - w; x <= fx + w; x++) { const X = x + sx; if (X < 0 || X > 319 || !libre(X, y)) continue; const g = f * (1 - Math.abs(x - fx) / w) * (0.6 + 0.4 * Math.sin(x * 0.8 + t * 3 + y));
      if (g > R.b4(X, y) + 0.22 && ((y & 1) || y < y0 + 8)) R.pset(X, y, K('lava', g > 0.75 ? 3 : g > 0.55 ? 2 : 1, X, y)); } }
  for (let k = 0; k < 6; k++) { const l = 0.5 + 0.5 * Math.sin(t * 1.5 + k * 2.1); if (l < 0.35) continue; let x = 20 + h(k, 1, 150) * 280, y = y0 + 12 + h(k, 2, 150) * (166 - y0);
    for (let i = 0; i < 12; i++) { x += h(k, i, 151) > 0.5 ? 1 : -1; y += 0.5; const X = Math.round(x), Y = Math.round(y); if (Y > 179 || !libre(X, Y)) continue; R.pset(X, Y, K('lava', l > 0.8 ? 3 : 2, X, Y)); } }
  for (let k = 0; k < 14; k++) { const x = Math.round(8 + h(k, 3, 152) * 304), y = Math.round(y0 + 16 + h(k, 4, 152) * (176 - y0 - 16)); if (Math.abs(x - 160) < 40 || !libre(x, y)) continue;
    R.pset(x, y, K('obsid', 0, x, y)); R.pset(x + 1, y, K('obsid', 0, x, y)); R.pset(x, y - 1, K('lava', 1, x, y)); if (k & 1) R.pset(x + 1, y - 1, K('obsid', 3, x, y)); }
}

// una losa de oro incrustada en un suelo en perspectiva: una estrella de cuatro puntas dentro de un aro, aplastada
// (sx, sy: semiejes en px) con su gema en el centro; b: brillo 0–1 que recorre el oro
function c_bwIncrusta(R, cx, cy, sx, sy, b = 0) {
  for (let y = Math.floor(cy - sy - 1); y <= cy + sy + 1; y++) for (let x = Math.floor(cx - sx - 1); x <= cx + sx + 1; x++) { const u = (x - cx) / sx, v = (y - cy) / sy, d = Math.hypot(u, v);
    const estrella = Math.pow(Math.abs(u), 0.5) + Math.pow(Math.abs(v), 0.5) < 0.95;
    if (Math.abs(d - 0.92) < 0.13) R.pset(x, y, y < cy ? E_BW.oroL : E_BW.oroS); else if (estrella && d < 0.85) R.pset(x, y, Math.abs(u) < 0.12 || Math.abs(v) < 0.12 ? (b > 0.5 ? E_BW.oroB : E_BW.oroL) : (u + v < 0 ? E_BW.oro : E_BW.oroM)); }
  R.pset(Math.round(cx), Math.round(cy), b > 0.8 ? E_BW.oroB : E_BW.gema);
}

// el suelo del mirador, vivo: losas de oro incrustadas en las juntas de la perspectiva, el reflejo de las estrellas que
// titila en el mármol pulido y el destello que corre por la cenefa de oro junto a la barandilla
function c_bwSueloMirador(R, t) {
  for (const [y, sy] of [[150, 2], [160, 3], [172, 4]]) { const z = (y - 60) / 82; for (let k = -3; k <= 3; k++) { const x = 160 + k * 52 * z; if (x < 6 || x > 314) continue; c_bwIncrusta(R, x, y, 4 + sy * 1.4, sy, (Math.sin(t * 1.5 - k * 0.8 + y) + 1) / 2); } }
  for (let x = 0; x < 320; x++) { const g = ((x - t * 40) % 160 + 160) % 160; R.pset(x, 143, g < 3 ? E_BW.oroB : (x % 6 < 3 ? E_BW.oroM : E_BW.oroS)); }
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 160) * 319), y = 145 + Math.round(h(k, 2, 160) * 26), b = Math.sin(t * (1.5 + h(k, 3, 160) * 2) + k * 2.3); if (b > 0.6) { R.pset(x, y, E_BW.oroB); if (b > 0.93) { e_tinte(R, x - 1, y, E_BW.plata, 0.6); e_tinte(R, x + 1, y, E_BW.plata, 0.6); } } }
}

// el suelo de la sala del trono, vivo: dos losas de oro incrustadas a los lados, el reflejo de los braseros que tiembla
// en el mármol y las motas de la luz del árbol que caen sobre la escalinata
function c_bwSueloTrono(R, t) {
  for (const [x, y, sx, sy, k] of [[62, 160, 11, 4, 0], [258, 160, 11, 4, 1], [40, 174, 14, 5, 2], [282, 174, 14, 5, 3]]) c_bwIncrusta(R, x, y, sx, sy, (Math.sin(t * 1.3 + k * 1.7) + 1) / 2);
  for (const bx of [92, 228]) for (let y = 130; y < 150; y++) { const f = 1 - (y - 130) / 20, sx = Math.round(Math.sin(t * 6 + y * 0.8 + bx) * 1.2);
    for (let i = -3; i <= 3; i++) if (f * (1 - Math.abs(i) / 4) > e_b4(bx + i + sx, y) + 0.15 && (y & 1)) e_tinte(R, bx + i + sx, y, (y + Math.floor(t * 8)) % 3 ? E_BW.fuego : E_BW.fuegoL, 0.5); }
}

// el detalle fijo de la sala del mundo: el friso tallado bajo la cornisa (aros de cuatro puntas entre molduras), dos
// trofeos de lanzas cruzadas con su escudo en los extremos, apliques de bronce para las antorchas y dos rosas de los
// vientos de oro incrustadas en las losas
function c_bwGloboDetalle(R) {
  const { rect, pset, linea } = R;
  rect(0, 21, 319, 29, E_BW.piedra2); rect(0, 21, 319, 21, E_BW.piedraL); rect(0, 29, 319, 29, E_BW.piedra0);
  for (let x = 8; x < 320; x += 16) { if (x > 270) { rect(x - 1, 24, x + 1, 26, E_BW.piedra1); continue; } R.anillo(x, 25, 3, E_BW.piedra0); R.anillo(x - 0.5, 24.5, 3, E_BW.piedraL); pset(x, 25, E_BW.bronceS); for (const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) pset(x + dx * 4, 25 + dy * 4, E_BW.piedra3); }
  for (const cx of [10, 310]) { const s = cx < 160 ? 1 : -1;
    linea(cx - 8, 112, cx + 8, 56, E_BW.bronceD); linea(cx + 8, 112, cx - 8, 56, E_BW.bronceD); linea(cx - 7, 112, cx + 9, 56, E_BW.bronce); linea(cx + 9, 112, cx - 7, 56, E_BW.bronce);
    for (const [px, py] of [[cx + 9, 56], [cx - 7, 56]]) { pset(px, py - 1, E_BW.oroL); pset(px, py - 2, E_BW.oro); pset(px - 1, py, E_BW.plata); pset(px + 1, py, E_BW.plata); }
    for (let y = 70; y < 96; y++) { const w = y < 86 ? 9 : 9 - (y - 86); for (let x = cx - w; x <= cx + w; x++) pset(x, y, Math.abs(x - cx) === w || y === 70 ? E_BW.oroS : e_tono([E_BW.verdeD, E_BW.verdeS, E_BW.verde, E_BW.verdeL], 2 - (x - cx) * s * 0.12 - (y - 70) * 0.03, x, y)); }
    R.anillo(cx, 81, 4, E_BW.oroL); pset(cx, 81, E_BW.oroM); for (const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) pset(cx + dx * 6, 81 + dy * 6, E_BW.oro); }
  for (const ax of [112, 208]) { rect(ax - 2, 60, ax + 2, 64, E_BW.bronceD); rect(ax - 1, 61, ax + 1, 63, E_BW.bronce); linea(ax, 64, ax, 70, E_BW.bronceS); rect(ax - 3, 52, ax + 3, 56, E_BW.bronceD); rect(ax - 2, 53, ax + 2, 55, E_BW.bronceL); }
  for (const [x, y, sx, sy] of [[56, 162, 16, 5], [264, 162, 16, 5]]) c_bwIncrusta(R, x, y, sx, sy, 0);
}

// la vida de la sala del mundo: las antorchas de los apliques (llama y su luz que tiembla en la sillería) y el brillo
// que recorre las rosas de los vientos del suelo
function c_bwGloboVida(R, t) {
  for (const [ax, k] of [[112, 0], [208, 1]]) { const f = Math.sin(t * 10 + k * 2) > 0 ? 1 : 0;
    for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) { const d = Math.hypot(i, j * 1.2); if (d > 3 && d < 14 && (14 - d) / 22 * (0.9 + f * 0.1) > e_b4(ax + i, 48 + j)) e_tinte(R, ax + i, 48 + j, E_BW.fuego, 0.25); }
    for (let n = 0; n < 6; n++) { const u = (t * 1.8 + n / 6) % 1, x = Math.round(ax + Math.sin(t * 8 + n) * 1.2 * (1 - u)), y = Math.round(51 - u * 8); R.pset(x, y, u < 0.3 ? E_BW.fuegoL : u < 0.7 ? E_BW.fuego : E_BW.fuegoR); }
    R.pset(ax, 51 - f, E_BW.fuegoL); }
  for (const [x, k] of [[56, 0], [264, 1]]) { const g = (Math.sin(t * 1.1 + k * 2) + 1) / 2; if (g > 0.6) c_bwIncrusta(R, x, 162, 16, 5, g); }
}
