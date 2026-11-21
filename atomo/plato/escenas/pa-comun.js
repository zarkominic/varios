// Fontanería y decorados del episodio 44 (Paul Atreides: por qué el héroe de Dune es el villano), con el canon del 43
// (relato hablado, ATOM EN ESCENA con atom-personaje.js y PAUSAS «fíjate» en gris azulado), al nivel de
// episodios/ESTANDAR.md: el detalle de siempre. Reutiliza A el planeta de arena NUESTRO del 33 (du-comun.js: planeta,
// planetaDelante) y F el estudio de las pausas del 43 (hm-comun.js: estudio, estudioDelante), y añade: B la ciudadela de
// Arrakeen (ciudadela), C Caladan (caladan), D la conspiración (conspiracion) y E el sietch Tabr (sietch).
// DERECHOS: NADA de las películas de Dune (ni actores, ni vestuario, ni naves, ni arquitectura, ni el diseño de sus
// gusanos, ni sus colores característicos): todo es NUESTRO, a partir de lo que dice el libro. Sin letras (solo números y
// símbolos). Personajes: ELENCO_PA (pixel-chibi.js), por sus atributos. LA VIOLENCIA NUNCA SE VE (la guerra santa, con
// mapas y luces; la quemapiedras, un destello de lejos; las muertes se cuentan; nada de armas en uso, cuerpos ni sangre).
// CADA ENCUADRE TRAE DOS CÁMARAS (o.camara: 'general' y la otra de su cabecera); lo que va delante de los personajes, en
// <x>Delante. Desde el 43 la esquina de Atom ya no hace falta dejarla vacía; la barra del tiempo (x 20–170, y 0–14), sí.
//
//   import * as T from '/atomo/plato/escenas/pa-comun.js';
//   const { E, R, M } = await T.preparar('pa-gancho');
//   T.rodar(E, R, [[0, (t) => T.ciudadela(R, t, { encuadre: 'trono' })]], { año: 12 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
// el reparto del 44 por su nombre (ELENCO_CHIBI lo pisan las uniones posteriores: lo aprendido en el 43)
export { ELENCO_PA as PA } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { mapa } from '/atomo/plato/escenas/fa-comun.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas } from '/atomo/plato/escenas/ov-comun.js';
import { a_cifras } from '/atomo/plato/escenas/do-comun.js';
import * as AT from '/atomo/plato/escenas/atom-personaje.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, brazo, silla, visto, tinte, monitorGrande, halcon, fugaz, motas, chincheta, tela, mapa, ELENCO_CHIBI, a_cifras, AT };
// A · el planeta de arena NUESTRO (del 33) y F · el estudio de las pausas (del 43): se usan tal cual
export { planeta, planetaDelante } from '/atomo/plato/escenas/du-comun.js';
export { estudio, estudioDelante } from '/atomo/plato/escenas/hm-comun.js';

const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    // el desierto: arena, sombra de duna, roca
    arena: '#d8a868', arenaS: '#a8784a', roca: '#6a4a3a', rocaS: '#3e2a24',
    // la ciudadela: piedra de arenisca pulida, bronce, sombra fresca, los estandartes verde y negro
    piedra: '#c8b088', piedraS: '#8a7458', bronce: '#b88a3a', bronceL: '#e8c060', estandarte: '#2a4a3a', estandarteN: '#1a1620',
    // Caladan: el mar gris verdoso, la piedra húmeda, el verde de los Atreides
    mar: '#4a6a72', marL: '#8aaab0', piedraH: '#6a6e72', verdeAt: '#2e6a4a',
    // la especia: el azul de los ojos y el naranja del polvo
    especiaAzul: '#5a8ae8', especia: '#e88a3a',
  }),
};

export async function preparar(id) {
  const E = await escena(id, 'ep44');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra del tiempo va en años desde la llegada a Arrakis (los libros cuentan el tiempo así: «doce años después»):
  // la duna (0–2, lo que ya se vio en las películas) y la corona (12–13, El Mesías)
  Object.assign(R.ICONOS, {
    duna: ['.......', '.......', '...##..', '..####.', '.######', '#######', '#######'],
    corona: ['#.#.#.#', '#######', '#.###.#', '#######', '.#####.', '.......', '.......'],
  });
  R.tramosTiempo([[0, 3, R.PALA.ORO, 'duna'], [11, 14, R.PALA.ROJO, 'corona']]);
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

// ── B · La ciudadela de Arrakeen ─────────────────────────────────────────────────────────────────────────────────────
// La ciudadela del emperador Paul, doce años después: arenisca pulida en sillares con sus juntas y sus poros, bronce,
// sombra fresca y estandartes verde oscuro y negro con un halcón y una corona de oro como SÍMBOLOS (sin letras). NADA
// de la arquitectura de las películas: arcos apuntados, celosías de rombos, vigas de palmera, torres de viento del
// desierto y el agua que se guarda como un tesoro (cuencos, cántaros). Cada encuadre pinta lo fijo en un búfer (una
// copia por fotograma) y encima lo vivo: estandartes que se mecen, polvo en los haces de luz, llamas, agua que brilla.
// o.encuadre:
//   'trono' (por omisión): EL SALÓN DEL TRONO en perspectiva (fuga en x 160, y 80): muro del fondo x 96–224, y 18–108,
//     con el gran nicho apuntado (x 130–190) y su celosía encendida detrás del trono; muros laterales de sillares con
//     cuatro columnas acanaladas por lado, celosías altas (x 54–70 y 250–266) que echan haces de luz con polvo,
//     estandartes que se mecen (dos en el fondo, uno en cada lado), suelo de losas pulidas con reflejos y la alfombra
//     de especia con orla de oro hasta la tarima. La tarima: tres escalones (frentes en y 122, 129 y 136; el suelo de
//     delante empieza en y 141). El trono de piedra y bronce con el halcón arriba: el que se sienta, R.actor(x 153,
//     pies 122). Guardias Fremen pequeños de fondo (dos junto a los muros, pies y 128, x 62 y 252; dos junto al fondo,
//     pies y 108, x 101 y 213) que parpadean y cambian el peso; un acólito rellena el cuenco del fondo; dos cuencos de agua
//     con brillo en pedestales (x 78 y 242, pies 146). Suelo de los personajes de la sala: y 150, libre x 40–280.
//     o.vacio true: el trono vacío, con la corona de oro dejada en el asiento (el final). o.cunas 0 | 1 | 2: cunas de
//     madera al pie de la escalinata (x 108–132 y 188–212, pies 146; devuelve .cunas). o.luz 'dia' | 'noche': de noche,
//     luna azul por la celosía y antorchas en las columnas (x 50 y 270, y 70) que tiemblan.
//     Cámara 'tarima': la tarima de cerca y de lado: el trono a la derecha (asiento x 213–243, y 127: el sentado,
//     R.actor(x 221, pies 134)), el respaldo alto con el halcón de bronce, la escalinata (peldaños x 190–206; plataforma
//     y 135 desde x 206), una columna a la izquierda (x 6–34), el muro con dos celosías altas y sus haces, y abajo una
//     arquería por la que se ve una galería donde pasan sacerdotes pequeños con estandartes. Para un actor sentado y
//     otro de pie delante (suelo 150, x 60–188). Delante: el pebetero de bronce con humo (x 10–38, abajo); otro pebetero arde en la plataforma (x 300).
//   'balcon': EL BALCÓN SOBRE LA MULTITUD: desde la logia, detrás de los que se asoman: el suelo del balcón (pies en
//     y 132, x 90–230), la balaustrada al fondo (pasamanos y 110–115, balaustres y 116–127, zócalo y 128–131), y abajo
//     la plaza inmensa llena de peregrinos (cientos de cabecitas en filas que se mecen, brazos que se alzan en oleadas,
//     banderolas), la avenida, la ciudad de arenisca con cúpulas y torres de viento, las murallas de roca y el desierto
//     hasta el horizonte (y 46); cielo de tarde tramado con nubes de polvo de tres tonos a tres velocidades, dos lunas
//     pálidas (x 196, y 30 y x 226, y 22) y halcones. o.aclaman 0–1 (o una función de t): la multitud alza los brazos y
//     salta (para el gag de Atom). Delante: la columna y la cortina de la logia a la izquierda (x 0–26) y dos tinajas
//     de bronce con plantas del desierto (x 262–318, y 142–179).
//     Cámara 'multitud': a ras de la plaza, entre los peregrinos, mirando arriba a la fachada enorme de la ciudadela
//     (gradas de sillares, ventanas apuntadas, dos estandartes gigantes, torres de viento) con el balcón lejano en el
//     centro (x 160, pies y 46; o.figura true por omisión: una figura diminuta que saluda; la puerta del balcón asoma
//     como pabellón hasta y 23, x 148–172); la grada de arriba es baja (cornisa en y 28, almenas solo en x 72–108 y
//     208–244), así que bajo la cifra del año (x 140–154, y 12–20) queda cielo vivo; la multitud del medio en
//     filas (y 108–150) y, en ciudadelaDelante, cabezas y espaldas de primer término (y 148–179) con brazos que se alzan.
//   'aposentos': LAS HABITACIONES DE PAUL Y CHANI, de noche: muros de sillares a la luz de la lámpara de aceite que cuelga
//     (x 120, llama en y 44) y tiembla, vigas de palmera, el mapa estelar grande en marco de bronce (x 22–112, y 26–92;
//     o.mapa 0–1: los planetas que se apagan uno a uno, solo luces; devuelve los 18 puntos en .mapa con {x, y, on}),
//     la ventana alta en arco (x 130–166, y 30–118, alféizar y 118) con la luna, estrellas y la ciudad lejana con luces,
//     el tapiz de colores del desierto (x 188–226), el diván con cojines bajo el mapa (x 34–116, y 117–143), alfombras,
//     un pebetero con humo, una mariposa nocturna junto a la lámpara; o.cuna 0 | 1 | 2: cunas vacías (x 2–30 y 196–226,
//     pies 150; devuelve .cuna). A la derecha, el pasillo: la puerta entreabierta (hueco x 252–290, y 96–150; la hoja
//     abierta x 282–290) por la que se ve el pasillo con una antorcha: ahí cabe Irulan sola (x 256–276, pies 150).
//     Suelo y 150, libre x 34–240.
//     Cámara 'cocina': la cocina, por la tarde: el fogón de piedra con dos bocas encendidas y la olla que echa vapor
//     (x 8–96), la campana de la chimenea, estantes con tarros y ollas de barro, ristras de dátiles y hierbas que se
//     mecen, la ventanita en arco con luz de tarde (x 222–250, y 40–74) y su haz, cántaros grandes de agua con gotas
//     (x 262–314), cestas de dátiles y de especia y un ratón del desierto que salta por el estante. Delante: la mesa
//     (tablero y 140–147, x 112–236) con el cuenco (x 172–192, borde y 135, fondo 142: donde Irulan echa las gotas; o.sinCuenco
//     true lo quita, para que la escena pinte el suyo), una
//     jarra, pan y un plato de dátiles. Irulan de pie detrás de la mesa: suelo 150, x 130–168 (asoman cabeza y hombros).
// Devuelve { encuadre, camara, suelo, libre, trono?, balcon?, mapa?, cuna?, cunas?, cuenco?, puerta?, ventana? }.
// Llama a ciudadelaDelante después de los actores (pebeteros del salón, el de la tarima, la logia y las tinajas del
// balcón, la multitud de primer término, la mesa de la cocina), con las mismas opciones.
export function ciudadela(R, t, o = {}) {
  const enc = o.encuadre ?? 'trono', cam = o.camara ?? 'general', noche = o.luz === 'noche';
  if (enc === 'balcon') {
    if (cam === 'multitud') return a_fachada(R, t, o);
    return a_balcon(R, t, o);
  }
  if (enc === 'aposentos') {
    if (cam === 'cocina') return a_cocina(R, t, o);
    return a_aposentos(R, t, o);
  }
  if (cam === 'tarima') return a_tarima(R, t, o, noche);
  return a_trono(R, t, o, noche);
}
// lo que va por delante de los personajes en la ciudadela (después de los actores, con las mismas opciones)
export function ciudadelaDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'trono', cam = o.camara ?? 'general', noche = o.luz === 'noche';
  if (enc === 'balcon') { if (cam === 'multitud') a_multitudDelante(R, t, a_aclaman(o, t)); else a_logia(R, t); return {}; }
  if (enc === 'aposentos') { if (cam === 'cocina') return a_mesaCocina(R, t, o); return {}; }
  if (cam === 'tarima') { a_pebetero(R, 24, 179, t, 0.9, noche); return {}; }
  a_pebetero(R, 18, 179, t, 1, noche); a_pebetero(R, 302, 179, t, 1, noche);
  return {};
}
// ── C · Caladan ────────────────────────────────────────────────────────────────────────────────────────────────────
// El planeta de mares de los Atreides, el recuerdo (frase 5): gris verdoso, lluvia, piedra húmeda. NUESTRO (nada de las
// películas: un castillo de piedra de los nuestros, con almenas, torres de tejado cónico de pizarra y el halcón como
// símbolo, sin letras).
// o.encuadre 'castillo' (el único; también se acepta sin dar):
//   cámara 'general': EL PASEO DE LA MURALLA, de tarde con lluvia. Cielo de tormenta tramado verdoso con jirones de nubes
//     en tres capas a tres velocidades y nubes bajas que pasan por delante del castillo; el mar gris verdoso con olas que
//     corren y crestas de espuma hasta el horizonte (y 80); a la izquierda, un islote con un faro cuyo haz gira (x 50,
//     linterna en y 53) y un velero que cabecea; en el centro y la derecha, el castillo sobre el acantilado de roca
//     oscura con musgo y estratos (las olas rompen al pie, y 112–124, con rociones de espuma): la muralla (x 154–262),
//     la torre del homenaje (x 196–230, tejado cónico, ventanas encendidas que tiemblan) con el estandarte verde del
//     halcón que ondea (x 214–236, y 2–10), y una torre menor (x 158–174). Delante, a la derecha, un torreón cercano de
//     sillares (x 266–320, y 46–142) con su saetera encendida y un farol de hierro que cuelga en x 258, y 100–111 (su luz
//     tiembla y se refleja en el suelo). El parapeto almenado de primer término (almenas y 110–124, muro y 124–142, con
//     musgo y chorreones) y el PASEO de losas mojadas (y 142–180) con charcos donde la lluvia hace anillos y el reguero
//     del canalón que corre; junto al torreón, un barril de agua de lluvia (x 238–258, y 127–150) y un rollo de cuerda
//     (x 224–236, y 145–149). Gaviotas que planean (fuera de la barra del año y de la esquina de Atom).
//     Suelo de los personajes: y 152, libre x 30–218 (delante del parapeto; la cabeza queda sobre el muro de piedra).
//   cámara 'ventana': LA SALA DEL CASTILLO por dentro: muros de sillares cálidos con vigas de madera arriba; a la
//     izquierda la chimenea encendida (boca x 24–72, y 98–148; llamas, chispas y su luz que tiembla en muro y suelo), con
//     candeleros en la repisa y un perro que duerme en la piedra del hogar (x 34–58, y 148–157, respira); en el centro
//     la VENTANA grande en arco (hueco x 122–198, y 22–110) con vidrieras emplomadas: fuera, la tormenta sobre el mar,
//     el faro, las olas y la lluvia, y gotas que resbalan por el cristal; en el alféizar una vela y un barquito de
//     madera; un tapiz verde con el halcón dorado (x 222–268, y 24–104), un aplique con antorcha (x 100 y x 274), una
//     alacena con cartas enrolladas y un globo de Caladan (x 276–318, y 52–150) y la mesa con el mapa del mar (tablero
//     x 228–312, borde y 122; el mapa con islas, dos barquitos y la rosa de los vientos). Suelo de madera con una alfombra
//     verde. Suelo de los personajes: y 150, libre x 60–226 (el duque, Jessica y el niño delante de la ventana).
// o.lluvia 0–1 (por omisión 1): cuánta lluvia cae. o.faro false: el faro apagado.
// Devuelve { encuadre, camara, suelo, libre, ventana?, chimenea?, mesa?, farol?, faro?, barril?, perro?, alfombra? }.
// Llama a caladanDelante después de los actores: en 'general', la cortina de lluvia de delante (gotas gruesas) y las
// salpicaduras en el paseo; en 'ventana', el candelero de hierro de primer término (x 0–18, y 92–180) con su vela.
export function caladan(R, t, o = {}) {
  const cam = o.camara === 'ventana' ? 'ventana' : 'general';
  return cam === 'ventana' ? b_calSala(R, t, o) : b_calPaseo(R, t, o);
}
// lo que va por delante de los personajes en Caladan (después de los actores, con las mismas opciones)
export function caladanDelante(R, t, o = {}) {
  const { pset, linea, rect, disco } = R, P = b_PC;
  if (o.camara === 'ventana') {
    // el candelero de hierro de primer término, con su vela que tiembla y la gota de cera
    rect(6, 118, 9, 180, P.hierro); rect(6, 118, 6, 180, P.hierroL);
    rect(1, 116, 14, 118, P.hierro); rect(1, 116, 14, 116, P.hierroL); for (const x of [1, 14]) rect(x, 112, x, 116, P.hierro);
    rect(4, 104, 11, 115, P.cera); rect(4, 104, 5, 115, P.ceraL); rect(10, 106, 11, 115, P.ceraS); pset(9, 108, P.ceraL); pset(9, 109, P.ceraL);
    const f = Math.sin(t * 11) + Math.sin(t * 17.3) * 0.6;
    disco(7.5 + f * 0.4, 99, 2.4, P.fuego2); disco(7.5 + f * 0.6, 97.5, 1.6, P.fuego1); pset(7 + Math.round(f * 0.7), 95, P.fuego1); linea(7, 101, 7, 103, P.hierro);
    for (let y = 92; y < 112; y++) for (let x = 0; x < 18; x++) { const d = Math.hypot(x - 7.5, y - 99); if (d > 5 && d < 11 && b_umbral(x, y) < 0.18 * (1 - d / 11) * 3) b_luzPx(R, x, y, P.fuego1, 0.35); }
    rect(0, 176, 18, 179, P.hierroS); rect(2, 172, 13, 176, P.hierro); rect(2, 172, 13, 172, P.hierroL);
    return {};
  }
  // la cortina de lluvia de delante (gotas largas y claras) y las salpicaduras sobre las losas del paseo
  const ll = o.lluvia ?? 1; if (ll <= 0) return {};
  b_lluvia(R, t, Math.round(46 * ll), 0.55, 0, 180, P.gotaL, P.gota, 9, 260);
  for (let k = 0; k < Math.round(22 * ll); k++) { const per = 0.5 + h(k, 1, 720) * 0.5, u = ((t + h(k, 2, 720) * 3) % per) / per; if (u > 0.4) continue;
    const x = Math.round(h(k, 3, 720) * 300 + 10 + Math.floor((t + h(k, 2, 720) * 3) / per) * 37) % 316, y = 145 + Math.round(h(k, 4, 720) * 33), s = u < 0.2 ? 1 : 2;
    pset(x - s, y - s, P.gotaL); pset(x + s, y - s, P.gotaL); if (u < 0.2) pset(x, y - 2, P.gotaL); pset(x, y, P.gota); }
  return {};
}
// ── D · La conspiración ──────────────────────────────────────────────────────────────────────────────────────────────
// Donde conspiran la Bene Gesserit, la Cofradía y los Tleilaxu. NUESTRO (nada de las películas: ni la sala, ni el
// navegante, ni los tanques; formas propias, sin letras). El navegante es SOLO gas naranja y una silueta difusa.
// o.encuadre:
//   'sala': LA SALA SECRETA, una cámara redonda y oscura. Cámara 'general': el muro curvo de paneles de metal oscuro con
//     remaches y pilastras de piedra con bandas de latón, la cornisa con una corona de lucecitas, el zócalo de piedra; a
//     la izquierda una puerta de cámara acorazada redonda (centro x 36, y 100; pernos, volante, borde de latón); en el
//     fondo una consola con pantallas de puntos que cambian y pilotos que parpadean (x 150–206, y 58–100); en el centro
//     la MESA DE LUZ (centro x 126, tablero x 82–170 desde y 145, en conspiracionDelante) con un mapa de estrellas que
//     gira en el tablero y un holograma de puntos que flota encima (centro x 126, y 114); a la derecha el TANQUE DEL
//     NAVEGANTE: cristal x 224–278, y 48–146 (tapa y 36–48, base de latón con manómetros y volante y 146–158), lleno de
//     gas naranja que remolina, burbujas y una silueta difusa que flota (formas suaves, nunca un monstruo); tuberías que
//     suben al techo y una que sale de la base y corre por el zócalo (y 116–120) hasta una válvula (x 200, y 112) que
//     suelta vapor. La luz naranja del tanque y la azul de la mesa iluminan la franja y 120–150 y el suelo pulido.
//     Suelo de los personajes y 150: a los lados de la mesa, x 40–80 y x 172–216 (detrás de la mesa, x 84–168, se ven
//     de cintura para arriba: el tablero los tapa desde y 145). Atom junto al cristal en x 210–216 para el gag del vaho.
//     Cámara 'tanque': el tanque de cerca: el cristal ocupa el centro (x 84–236, y 16–172) con el gas que remolina en
//     grande, burbujas, la silueta difusa, gotitas de condensación y los reflejos curvos; arriba, la tapa de metal (y 0–16,
//     tranquila bajo la barra del año); abajo, el anillo de latón con pernos (y 172–178) y la rejilla del suelo; a los
//     lados tuberías gruesas, manómetros con aguja, un volante y respiraderos que echan vapor.
//     Suelo y 179 (Atom, de ~17 px, delante del cristal: su cara en y ≈ 170), libre x 40–280. o.reflejo x: un reflejo
//     pálido (y 118–162) de quien está delante, en el cristal.
//     En las dos cámaras: o.vaho [x, y] empaña el cristal en ese punto (una mancha de vaho de radio 9 en 'general' y 13
//     en 'tanque', con su goteo, recortada al cristal), o.vahoF 0–1 (por omisión 1) la hace aparecer o desvanecerse, y
//     o.caraVaho 0–1 dibuja con el dedo una carita en el vaho (0,15 el ojo izquierdo, 0,35 el derecho, de 0,45 a 1 la
//     sonrisa): el trazo limpia el vaho y deja ver el gas. o.vaho true: en el sitio por omisión ([231, 136] en
//     'general', junto a Atom en x 212; [160, 160] en 'tanque').
//   'laboratorio': EL LABORATORIO DE LOS TLEILAXU. Cámara 'general': una nave larga en perspectiva (fuga en x 160,
//     y 78): techo con vigas, bandejas de cables y lámparas colgadas que se mecen; a cada lado una hilera de tanques de
//     cultivo verdes que se pierden al fondo (dentro, siluetas dormidas encogidas, sin detalle; burbujas y pilotos que
//     parpadean), tuberías a lo largo de las paredes, el suelo de baldosas mojadas con los reflejos verdes y la rejilla
//     del pasillo; al fondo, en el muro (x 84–236, y 50–115), el tanque grande del centro (cristal x 142–178, y 58–104)
//     con su luz más viva; dos técnicos diminutos pasan por el fondo. o.hayt true: en ese tanque, un hombre de pelo
//     rizado con los ojos de metal que brillan (solo la cabeza con los rizos, los ojos y los hombros en sombra).
//     Delante (conspiracionDelante), dos bancos de trabajo de primer término: a la izquierda x 0–46 (frascos que
//     burbujean, un microscopio) y a la derecha x 276–320 (gradilla de tubos y un monitor con una onda); tablero y 146.
//     Suelo y 150, libre x 50–270.
//     Cámara 'tanques': de cerca, tres tanques en fila (cristal x 34–92, 130–188 y 226–284; y 26–136; bases con panel
//     de barras, pilotos y el pictograma de la doble hélice, y 136–158) con su luz verde en el suelo; dentro, siluetas
//     dormidas; con o.hayt, el del centro es Hayt (más grande: rizos, ojos de metal que destellan, hombros). Cables y
//     tubos bajan de las tapas al líquido; el muro de azulejos verdosos con tuberías entre los tanques. Suelo y 170,
//     libre x 20–300 (delante de los tanques; quien toca el del centro, en x 140–176).
// Devuelve { encuadre, camara, suelo, libre, tanque, mesa?, vaho?, tanques? }. Llama a conspiracionDelante después de los
// actores (la mesa de luz en 'sala' general; los bancos en 'laboratorio' general; en las demás, nada).
export function conspiracion(R, t, o = {}) {
  const enc = o.encuadre === 'laboratorio' ? 'laboratorio' : 'sala';
  if (enc === 'sala') return o.camara === 'tanque' ? b_tanqueCerca(R, t, o) : b_salaSecreta(R, t, o);
  return o.camara === 'tanques' ? b_tanquesCerca(R, t, o) : b_labTleilaxu(R, t, o);
}
// lo que va por delante de los personajes en la conspiración (después de los actores, con las mismas opciones)
export function conspiracionDelante(R, t, o = {}) {
  const { pset, rect, disco, linea, poligono } = R, P = b_PD;
  if (o.encuadre === 'laboratorio') {
    if (o.camara === 'tanques') return {};
    // los dos bancos de trabajo de primer término
    for (const [x0, x1, dir] of [[-2, 46, 1], [276, 322, -1]]) {
      rect(x0, 146, x1, 150, P.banco); rect(x0, 146, x1, 146, P.bancoL); rect(x0, 150, x1, 151, P.m0);
      rect(x0, 151, x1, 180, P.m1); for (let y = 156; y < 180; y += 8) { rect(x0 + 2, y, x1 - 2, y + 6, P.m2); rect(x0 + 2, y, x1 - 2, y, P.m3); rect((x0 + x1) / 2 - 3, y + 3, (x0 + x1) / 2 + 3, y + 3, P.laton); }
      for (let x = x0; x <= x1; x++) if (h(x, 1, 800) < 0.2) pset(x, 147, P.bancoL);
    }
    // a la izquierda: dos matraces que burbujean (verde y ámbar), un microscopio y un cuaderno de trazos
    for (const [cx, c, cL] of [[10, P.v3, P.v4], [26, P.ambar, P.ambarL]]) { poligono([[cx - 2, 128], [cx + 2, 128], [cx + 2, 134], [cx + 7, 145], [cx - 7, 145], [cx - 2, 134]], P.cristal); poligono([[cx - 3, 136], [cx + 3, 136], [cx + 6, 144], [cx - 6, 144]], c); rect(cx - 4, 138, cx - 3, 143, cL);
      for (let k = 0; k < 3; k++) { const u = ((t * 1.3 + k * 0.33 + cx) % 1); pset(cx - 1 + k, Math.round(143 - u * 8), cL); if (u > 0.7) pset(cx + (k - 1) * 2, Math.round(126 - (u - 0.7) * 20), P.vapor); } rect(cx - 3, 127, cx + 3, 128, P.m4); }
    rect(36, 126, 39, 145, P.m3); rect(33, 143, 44, 145, P.m4); rect(35, 124, 42, 127, P.m4); rect(39, 128, 43, 130, P.m3); pset(41, 133, Math.floor(t * 2) % 2 ? P.v4 : P.v2); rect(38, 136, 44, 137, P.m4);
    // a la derecha: la gradilla de tubos de colores y el monitor con la onda que corre
    rect(280, 136, 300, 145, P.m3); for (let k = 0; k < 6; k++) { const x = 282 + k * 3; rect(x, 128, x + 1, 140, P.cristal); rect(x, 134 - (k % 3), x + 1, 140, [P.v3, P.ambar, P.rojo][k % 3]); }
    rect(302, 116, 320, 145, P.m0); rect(304, 118, 320, 134, P.pantalla); for (let x = 304; x < 320; x++) pset(x, Math.round(126 + Math.sin(x * 0.7 - t * 6) * 4 * (x % 7 === 0 ? 1.4 : 1)), P.v4); rect(309, 135, 312, 145, P.m2);
    return {};
  }
  if (o.camara === 'tanque') return {};
  // la mesa de luz: el tablero redondo (el mapa de estrellas que gira encima), el canto de latón y el pie
  const cx = 126, cy = 152, rx = 44, ry = 7;
  poligono([[cx - 20, 160], [cx + 20, 160], [cx + 14, 172], [cx - 14, 172]], (x, y) => [P.m1, P.m2, P.m3][Math.max(0, Math.min(2, Math.floor(2.2 - Math.abs(x - cx + 6) / 9 + b_umbral(x, y) * 0.5)))]);
  for (let y = 171; y < 176; y++) for (let x = cx - 26; x <= cx + 26; x++) if (((x - cx) / 26) ** 2 + ((y - 173) / 3) ** 2 < 1) pset(x, y, y === 171 ? P.m3 : P.m1);
  for (let y = cy - ry; y <= cy + ry + 5; y++) for (let x = cx - rx; x <= cx + rx; x++) { const e = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2, e2 = ((x - cx) / rx) ** 2 + ((y - cy - 5) / ry) ** 2;
    if (e <= 1) pset(x, y, e > 0.82 ? (y < cy ? P.latonL : P.laton) : P.a0); else if (e2 <= 1 && y > cy) pset(x, y, y > cy + ry + 3 ? P.m1 : (x - cx) < -rx * 0.5 ? P.latonL : P.laton); }
  // el mapa de estrellas que gira, aplastado en el tablero, con dos órbitas y el resplandor
  for (let k = 0; k < 46; k++) { const r = 4 + h(k, 1, 801) * 33, a = h(k, 2, 801) * 6.28 + t * (0.25 + 4 / r), x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r * 0.16);
    if (((x - cx) / (rx - 4)) ** 2 + ((y - cy) / (ry - 1)) ** 2 < 1) pset(x, y, k % 7 === 0 ? P.a4 : k % 3 ? P.a2 : P.a3); }
  for (let a = 0; a < 6.28; a += 0.06) { const r = 18; pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.16), ((a * 10 + t * 4) | 0) % 3 ? P.a1 : P.a2); }
  disco(cx, cy, 1.5, P.a4); for (let x = cx - rx + 6; x < cx + rx - 6; x += 7) pset(x, cy + ry + 2, Math.floor(t * 3 + x) % 4 ? P.a2 : P.a4);
  return { mesa: { centro: [cx, cy], rx, tablero: cy - ry } };
}
// ── E · El sietch Tabr ───────────────────────────────────────────────────────────────────────────────────────────────
// La cueva Fremen por dentro: roca tallada, luz cálida de lámparas, telas y alfombras, el agua guardada. NUESTRO (del
// libro, nada de las películas). Todo lo fijo de cada encuadre va en un búfer (c_capa) con la luz ya cocida en la roca;
// en cada fotograma solo se pinta lo que vive: agua, llamas, gente diminuta, polvo, nubes, cortinas y caminos de luz.
// o.encuadre:
//   'sala': LA SALA COMÚN: una caverna amplia tallada en la roca, con bóveda oscura y costillas talladas; a la izquierda
//     una galería alta (cornisa y 64, x 6–100, tres puertas en arco y barandilla) con su escalera tallada que sube desde
//     el suelo (x 40, y 136 → x 100, y 66); a la derecha otra galería (cornisa y 92, x 222–319, tres puertas) con su
//     escalera (x 262, y 136 → x 228, y 96) y una cornisa más alta (y 52, x 232–272); gente diminuta que pasea por las
//     galerías, sube la escalera con un cántaro y llena una jarra; cuatro lámparas de aceite colgadas que tiemblan; un
//     telar con su tejedora (x 2–30), un tapiz, cántaros, sacos y cestas de especia (x 270–318), cojines, una alfombra
//     grande con rombos (y 148–172) y el polvo dorado que flota. Al fondo, en un gran nicho en arco (x 114–206,
//     y 41–114), LOS DEPÓSITOS DE AGUA: el caño de piedra que vierte un chorro en la alberca (agua x 104–216, y 113–123,
//     borde delantero y 124–136) con un brillo azul que ondula, anillos donde cae el chorro y reflejos que bailan en el
//     nicho. Suelo y 152, libre x 30–260 (la alberca queda por encima de las cabezas, a y 113–136).
//     Cámara 'entrada': la boca del sietch desde fuera al atardecer: el cielo tramado del ocaso con el sol medio hundido
//     (x 56, y 104), nubes de tres tonos a tres velocidades, las dos lunas (x 122, y 40 y x 152, y 27) y estrellas que
//     salen; dunas lejanas en tres términos con una caravana diminuta de Fremen por la cresta y un halcón; la pared de
//     roca de una meseta (x ≥ 150, cima en y 46–54) con estratos, grietas y su cara izquierda encendida por el ocaso; una
//     REPISA en x 204–242, y 70 (para la figura que vigila: pies en x 220, y 70) con asideros tallados que bajan; la boca
//     (una grieta en x 238–270, y 106–152) con la luz cálida de dentro, una cortina y sombras que pasan, que derrama luz
//     sobre la arena; huellas que llegan hasta ella y arena que vuela. Suelo de la arena y 152, x 20–200.
//   'cuarto': EL CUARTO DE LAS CUNAS, de noche: un cuarto pequeño de roca con bóveda baja, una lámpara de aceite de barro
//     en un nicho (x 79, y 103) que tiembla, un tapiz colgado (x 106–142), un estante tallado con telas dobladas, un pájaro
//     de madera y dátiles, un friso de triángulos bajo la bóveda, manojos de hierbas y un móvil de tela que gira sobre las cunas, cortinas de tela a los lados, cojines y alfombras; por un respiradero del techo (x 190, y 12)
//     se ven estrellas y baja un haz de luna con polvo que cae sobre las cunas; un ratoncito del desierto se asoma de su
//     agujero (x 268, y 140). En la pared, un sol tallado sobre el nicho, un baliset colgado (x 44), una sarta de anillos
//     de agua y un calabacino (x 166–184), un halcón tallado sobre el estante; en el suelo, un pebetero que humea
//     (x 269, y 160) y una polilla que ronda la lámpara. Dos cunas tejidas sobre balancines que se mecen (cuna 1 centro x 168, cuna 2 x 204, base
//     y 150; cada una ~28 × 16 px). o.cunas: 1 | 2 (por omisión 1); o.segunda 0–1: la segunda aparece con un destello
//     (con cunas 2 y sin segunda, ya está); o.bebes true: un bebé dormido en cada cuna, que respira; o.mece (por
//     omisión true). Nada del parto: solo la calma de después. Suelo y 150, libre x 40–220.
//     Cámara 'puerta': desde el pasillo de roca fría (de noche, en perspectiva), la puerta en arco del fondo (hueco
//     x 136–184, y 86–150) con la cortina entreabierta que se mece y la luz cálida que sale y se derrama por el suelo del
//     pasillo; dentro se ve el cuarto (la lámpara, el tapiz y, SOLO con o.cunas, el borde de una cuna). Paredes de sillares
//     con frisos de pictogramas, bóveda con juntas, un farol que cuelga y se mece (x 212), medallones tallados en el fondo
//     (x 106 y 214, y 64), un banco con cesto (x 194–232, y 138–150), un tapiz y una hornacina a la derecha, una sarta de
//     anillos de agua (x 230) y arena al pie de las paredes. Nichos con candiles en las paredes, un odre de
//     agua colgado, dos nervios de piedra que cruzan el pasillo, una tubería de rocío que gotea en un cuenco, una boca lateral oscura (x 257–274) por la que a veces pasa alguien con un candil, una estera hasta
//     la puerta. Suelo y 150 (delante de la puerta, x 120–200).
//   'laberinto': UN LABERINTO DE CAMINOS DE LUZ sobre la arena de noche (la visión de Paul): un cielo de noche con
//     estrellas, la banda de la galaxia, dos lunas finas y nubes plateadas; la arena azul oscura con ondas en
//     perspectiva (horizonte y 74); decenas de caminos dorados que se bifurcan desde el centro (x 160, y 150) hacia el
//     horizonte, con chispas que corren por ellos hacia fuera y un charco de luz a los pies de Paul.
//     o.apagados 0–1: de 0 a 0,85 los caminos se apagan uno a uno (parpadean y quedan como un surco gris azulado) hasta
//     que solo queda UNO encendido; de 0,9 a 1 se apaga también el último (Paul a oscuras: solo la luna). Con 1, todo
//     apagado. El árbol y el superviviente son siempre los mismos en las dos cámaras.
//     Cámara 'alto': el mismo laberinto visto desde arriba, como un árbol de luz que nace abajo en el centro
//     (x 160, y 166) y se abre hacia arriba, sobre la arena con ondas y sombras de nubes que pasan.
// Devuelve { encuadre, camara, suelo, libre, cunas?, alberca?, roca?, boca?, puerta?, centro?, vivo?, encendidos? }.
// Llama a sietchDelante después de los actores (la columna de roca y la peña de la sala, las peñas y la arena que vuela
// de la entrada, la cortina del cuarto, el arco del pasillo, las chispas del laberinto).
export function sietch(R, t, o = {}) {
  const enc = o.encuadre ?? 'sala', cam = o.camara ?? 'general';
  if (enc === 'cuarto') return cam === 'puerta' ? c_puerta(R, t, o) : c_cuarto(R, t, o);
  if (enc === 'laberinto') return c_laberinto(R, t, o, cam === 'alto');
  return cam === 'entrada' ? c_entrada(R, t, o) : c_sala(R, t, o);
}
// Lo que va por delante de los personajes en cada encuadre (mismas opciones que sietch). Nada cruza la zona libre.
export function sietchDelante(R, t, o = {}) {
  const enc = o.encuadre ?? 'sala', cam = o.camara ?? 'general';
  if (enc === 'sala' && cam !== 'entrada') {
    // la columna de roca de la derecha (x 304–319) y la peña baja de la izquierda (x 0–24, y 158–179)
    for (let y = 0; y < 180; y++) { const xb = 304 + Math.round(2 * Math.sin(y * 0.09) + Math.sin(y * 0.31)); for (let x = xb; x < 320; x++) { const borde = x - xb; R.pset(x, y, c_tono(C_ROCA, (borde < 2 ? 3.2 : 1.6) + c_tex(x, y, 5) * 0.9 + (y > 150 ? 0.4 : 0), x, y)); } R.pset(xb - 1, y, C_ROCA[0]); }
    R.poligono([[0, 179], [0, 160], [6, 156], [14, 157], [22, 163], [26, 172], [27, 179]], (x, y) => c_tono(C_ROCA, 1.4 + (y < 162 ? 1.6 : 0) + c_tex(x, y, 6) * 0.9 + (26 - x) * 0.04, x, y));
    return {};
  }
  if (enc === 'sala') {
    // las peñas de primer término abajo a la derecha, encendidas por el ocaso, y la arena que vuela por delante
    R.poligono([[262, 179], [268, 166], [278, 160], [290, 162], [300, 156], [312, 158], [319, 154], [319, 179]], (x, y) => c_tono(C_ROCA_T, 1.2 + c_tex(x, y, 8) * 1.1 + (y < 166 ? 2.4 : 0) - (x - 262) * 0.01, x, y));
    for (const [x0, y0] of [[268, 166], [278, 160], [300, 156], [312, 158]]) R.linea(x0, y0, x0 + 8, y0 - 1, C_ROCA_T[8]);
    for (let k = 0; k < 14; k++) { const x = ((h(k, 3, 30) * 360 + t * (70 + h(k, 4, 30) * 40)) % 360) - 20, y = 150 + h(k, 5, 30) * 28 + Math.sin(t * 3 + k) * 2; for (let i = 0; i < 4; i++) c_mezP(R, Math.round(x - i * 2), Math.round(y), C_ARENA_T[9], 0.5 - i * 0.1); }
    return {};
  }
  if (enc === 'cuarto' && cam !== 'puerta') {
    // la cortina de primer término, a la izquierda (x 0–26), que se mece despacio
    const sw = Math.sin(t * 0.8) * 1.5;
    for (let y = 0; y < 180; y++) { const xb = Math.round(20 + (y > 40 ? (y - 40) * 0.04 : 0) + sw * (y / 180)); for (let x = 0; x <= xb; x++) { const pl = Math.sin(x * 0.7 + y * 0.02) * 0.9; R.pset(x, y, c_tono(C_TELA_R, 2 + pl + (xb - x < 2 ? 1.4 : 0) - (y < 20 ? 1 : 0) + ((y % 22) < 2 ? 1.2 : 0), x, y)); } R.pset(xb + 1, y, C_TELA_R[0]); }
    // el cordón que la recoge, con su borla
    R.linea(0, 92, 22, 96, hex('#c89a3a')); R.rect(21, 96, 23, 101, hex('#e8c060')); R.pset(22, 102 + Math.round(Math.sin(t * 1.3)), hex('#c89a3a'));
    return {};
  }
  if (enc === 'cuarto') {
    // el arco de roca del pasillo, de primer término (x 0–12, x 308–319 y la clave arriba)
    for (let y = 0; y < 180; y++) for (const [a, b] of [[0, 10 + Math.round(Math.sin(y * 0.2))], [309 + Math.round(Math.sin(y * 0.17)), 319]]) for (let x = a; x <= b; x++) R.pset(x, y, c_tono(C_FRIO, 0.8 + c_tex(x, y, 9) * 0.7 + (x === b && a === 0 ? 1.2 : 0), x, y));
    for (let x = 0; x < 320; x++) { const yb = 5 + Math.round(Math.sin(x * 0.08) * 1.5); for (let y = 0; y <= yb; y++) R.pset(x, y, c_tono(C_FRIO, 0.6 + c_tex(x, y, 9) * 0.6, x, y)); }
    return {};
  }
  if (enc === 'laberinto') {
    // chispas de luz que flotan por delante, más con más caminos encendidos
    const n = Math.round(4 + 14 * (1 - Math.min(1, (o.apagados ?? 0) / 0.9)));
    for (let k = 0; k < n; k++) { const u = (t * (0.05 + h(k, 1, 40) * 0.05) + h(k, 2, 40)) % 1, x = Math.round(40 + h(k, 3, 40) * 240 + Math.sin(t * 0.7 + k) * 8), y = Math.round(176 - u * 110); if (Math.sin(t * 4 + k * 3) > -0.4) { c_mezP(R, x, y, hex('#fff0b0'), 0.8); c_mezP(R, x + 1, y, hex('#e8c060'), 0.4); c_mezP(R, x, y + 1, hex('#e8c060'), 0.4); } }
  }
  return {};
}
// la paleta propia de la ciudadela: arenisca a la luz (p*) y a la sombra fresca (s*), bronce, los estandartes, la alfombra
// de especia, el agua, el cielo de polvo, las dunas, la noche, las telas de los peregrinos, el barro y el fuego
const a_P = pal({
  pL: '#ecd8b2', p: '#d6bc90', pM: '#c4a67c', pS: '#a28460', pD: '#7a6046', pJ: '#8c7052', pK: '#3e3024',
  sL: '#b89e7e', s: '#9c8064', sM: '#8a6e56', sS: '#725c48', sD: '#54443a', sJ: '#62503e',
  bz: '#b88a3a', bzL: '#f0cc70', bzS: '#7a5422', bzD: '#4a3214',
  vd: '#2a4a3a', vdL: '#3e6a52', vdS: '#1a3226', ng: '#1e1a24', ngL: '#34303e', ngS: '#121016',
  al: '#8a3a22', alL: '#b0542e', alS: '#5e2416', alO: '#d89a40',
  ag: '#3a7ab0', agL: '#9ad4f0', agS: '#24507a',
  luz: '#fff2cc', luzS: '#f8dc98',
  ci0: '#8a8cb0', ci1: '#a8a0b4', ci2: '#c6aaa4', ci3: '#e0b894', ci4: '#f0cc9c',
  nu0: '#f6e4c8', nu1: '#dcbca8', nu2: '#b49aa2',
  du: '#e0b47a', duL: '#f0cc94', duS: '#c09062', duD: '#9a7450', roca: '#8a6450', rocaS: '#6a4a3e',
  luna: '#f2eee2', lunaS: '#cfcac6',
  n0: '#0a0e20', n1: '#141a36', n2: '#20284a', n3: '#2e3660',
  t1: '#a08a6a', t2: '#6e5c4a', t3: '#4a5a7a', t4: '#8a4a3a', t5: '#d0bea0', t6: '#5a6a4a', t7: '#3a3440', piel: '#c48a68', pielS: '#9a684c',
  mad: '#7a4a2a', madL: '#a46c3c', madS: '#4a2c18', barro: '#b0623a', barroL: '#d48c56', barroS: '#7a3e22',
  fu: '#f8a830', fuL: '#fff0a0', fuS: '#d0501a', datil: '#6a2a14', datilL: '#9a4a24', esp: '#e88a3a', espL: '#f8b060',
  tap1: '#8a2e2a', tap2: '#d0a040', tap3: '#2e3e6a', tap4: '#e0d0b0', ojo: '#6aa0ff',
});

const a_K = hex('#16100c');

const a_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// umbral de la trama ordenada 4×4 (0–1) en (x, y)
const a_b4 = (x, y) => (a_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// la capa fija de cada variante: se pinta una vez en un búfer y en cada fotograma se copia entera (una pasada)
const a_capas = new Map();

function a_capa(R, clave, dibuja) {
  let b = a_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); a_capas.set(clave, b); }
  R.copiar(b);
}

// una capa con huecos (lo que va DELANTE de algo vivo, como la balaustrada delante de la multitud): solo copia lo pintado,
// y solo en las filas y0–y1
const a_VACIO = 0x01020304;

function a_capaEncima(R, clave, y0, y1, dibuja) {
  let b = a_capas.get(clave);
  if (!b) { b = R.nuevo(); b.fill(a_VACIO); const prev = R.usar(b); dibuja(); R.usar(prev); a_capas.set(clave, b); }
  const P = R.buf;
  for (let i = y0 * 320, n = (y1 + 1) * 320; i < n; i++) { const c = b[i]; if (c !== a_VACIO) P[i] = c; }
}

// mezcla dos colores: a = 0 deja c, a = 1 da d
function a_mezcla(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// tiñe el píxel (x, y) hacia el color c en la medida m (luz cálida, luna, sombra)
function a_tinte(R, x, y, m, c) { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, a_mezcla(R.pget(x, y), c, m)); }

// dentro de un arco apuntado de semiancho a, centro cx, arranque en ys y pie en yb (la clave queda 1,48·a por encima de ys)
function a_enArco(x, y, cx, ys, a, yb) {
  const dx = x + 0.5 - cx; if (Math.abs(dx) > a || y > yb) return false; if (y >= ys) return true;
  const r = a * 1.6, dy = y + 0.5 - ys; return Math.hypot(dx + a - r, dy) <= r && Math.hypot(dx - a + r, dy) <= r;
}

// el hueco de la celosía de rombos (paso p): true donde pasa la luz
const a_hueco = (x, y, p = 6) => { const u = ((x + y) % p + p) % p, v = ((x - y) % p + p) % p; return u > 1 && v > 1; };

// sillares de arenisca: hiladas de bloques al tresbolillo con su junta, el tono propio de cada bloque, un filo de luz
// arriba y a la izquierda, sombra abajo y poros. cols = [L, M, M2, S, J]; o.alto, o.ancho, o.k, o.dentro(x, y)
function a_sillares(R, x0, y0, x1, y1, cols, o = {}) {
  const al = o.alto ?? 8, an = o.ancho ?? 18, k = o.k ?? 0, [L, M, M2, S, J] = cols;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) {
    const fy = y - y0 + 64 * al, fila = Math.floor(fy / al), ry = fy - fila * al, off = (fila % 2) * (an >> 1) + Math.floor(h(fila, 7, k) * 6);
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
      if (o.dentro && !o.dentro(x, y)) continue;
      const fx = x - x0 + off + 64 * an, col = Math.floor(fx / an), rx = fx - col * an, v = h(col, fila, k), r = h(x, y, k + 3);
      let c;
      if (ry === 0 || rx === 0) c = J;
      else if (ry === al - 1 || rx === an - 1) c = S;
      else if (ry === 1 || rx === 1) c = L;
      else c = r > 0.95 ? S : r < 0.03 ? L : (v < 0.3 ? M2 : M);
      if (c !== J && v > 0.86 && ry > 2 && Math.abs(rx - an * 0.5 - (v - 0.86) * 40) < 1 && ry < al - 2) c = S;   // una grieta fina en algún bloque
      R.pset(x, y, c);
    }
  }
}

// la trama de luz (o de sombra) sobre lo ya pintado: dentro(x, y) → fuerza 0–1; color de la luz c
function a_luzTramada(R, x0, y0, x1, y1, dentro, c, m = 0.18) {
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const f = dentro(x, y); if (f > 0 && f > a_b4(x, y) * 0.9) a_tinte(R, x, y, m * Math.min(1, f + 0.3), c);
  }
}

// el halcón de los Atreides y la corona, como símbolos de oro (sprites)
const a_HALCON = ['....#....', '#..###..#', '##.###.##', '.#######.', '..#####..', '...###...', '..#.#.#..'];

const a_CORONA = ['#.#.#.#', '#######', '#.#.#.#', '#######'];

// un estandarte que cuelga de su barra de bronce y se mece con el aire: tela verde (o negra) con orla de bronce, pliegues
// que se mueven, remate en punta con borla y el símbolo de oro (o.simbolo 'halcon' | 'corona')
function a_estandarte(R, x, y, w, alto, t, o = {}) {
  const fase = o.fase ?? x * 0.13, amp = o.amp ?? 1.4, ng = o.negro, B = ng ? a_P.ng : a_P.vd, BL = ng ? a_P.ngL : a_P.vdL, BS = ng ? a_P.ngS : a_P.vdS;
  const dxf = (j) => Math.round((Math.sin(t * 1.25 + fase - j * 0.08) * amp + Math.sin(t * 2.3 + fase * 1.7) * 0.4) * (j / alto));
  R.rect(x - 2, y - 2, x + w + 1, y, a_K); R.rect(x - 1, y - 1, x + w, y - 1, a_P.bzL); R.rect(x - 1, y, x + w, y, a_P.bzS);
  R.disco(x - 2, y - 1, 1.6, a_P.bz); R.disco(x + w + 1, y - 1, 1.6, a_P.bz); R.pset(x - 3, y - 2, a_P.bzL); R.pset(x + w, y - 2, a_P.bzL);
  const punta = Math.max(3, w >> 1);
  for (let j = 0; j < alto + punta; j++) {
    const d = dxf(j), i0 = j >= alto ? j - alto + 1 : 0, i1 = w - 1 - i0; if (i0 > i1) break;
    for (let i = i0; i <= i1; i++) {
      let c;
      if (i === i0 || i === i1 || j === 0) c = a_K;
      else if (i === i0 + 1 || i === i1 - 1 || j >= alto + punta - 3 + (i0 > 0 ? 0 : 9)) c = a_P.bz;
      else { const f = Math.sin(i * 0.8 + t * 1.25 + fase - j * 0.05); c = f > 0.55 ? BL : f < -0.6 ? BS : B; }
      if (j === 2 && i > i0 + 1 && i < i1 - 1) c = a_P.bzS;
      if (j === alto - 2 && i > i0 + 1 && i < i1 - 1) c = (i % 2) ? a_P.bzL : a_P.bz;
      R.pset(x + i + d, y + 1 + j, c);
    }
  }
  // la borla de la punta
  const jb = alto + punta - 1, db = dxf(jb); R.pset(x + (w >> 1) + db, y + jb + 1, a_P.bzL); R.pset(x + (w >> 1) + db, y + jb + 2, a_P.bz); R.pset(x + (w >> 1) + db, y + jb + 3, a_P.bzS);
  // el símbolo de oro, que se mece con la tela
  const S = o.simbolo === 'corona' ? a_CORONA : a_HALCON, sw = S[0].length, sy = y + Math.round(alto * 0.36), ds = dxf(sy - y);
  if (w >= sw + 4) R.sprite(S, x + ((w - sw) >> 1) + ds, sy, { '#': a_P.bzL, '.': null });
  else R.rect(x + (w >> 1) - 1 + ds, sy, x + (w >> 1) + 1 + ds, sy + 2, a_P.bzL);
}
// un cuenco de agua de piedra sobre su pedestal (pies en yb): el agua brilla y tiembla, una gota cae de vez en cuando
function a_cuenco(R, cx, yb, t, s = 1, noche = false) {
  const { rect, pset, disco } = R, w = Math.round(5 * s), hp = Math.round(16 * s);
  rect(cx - w - 2, yb - 3, cx + w + 2, yb, a_K); rect(cx - w - 1, yb - 2, cx + w + 1, yb, a_P.pS); rect(cx - w - 1, yb - 2, cx + w + 1, yb - 2, a_P.pL);
  rect(cx - 3, yb - hp, cx + 3, yb - 3, a_K); rect(cx - 2, yb - hp, cx + 2, yb - 3, a_P.p); rect(cx - 2, yb - hp, cx - 2, yb - 3, a_P.pL); rect(cx + 2, yb - hp, cx + 2, yb - 3, a_P.pS);
  rect(cx - 3, yb - Math.round(hp * 0.55), cx + 3, yb - Math.round(hp * 0.55) + 1, a_P.bz);
  const ty = yb - hp, r = Math.round(9 * s);
  rect(cx - r - 1, ty - 4, cx + r + 1, ty, a_K); rect(cx - r, ty - 4, cx + r, ty - 1, a_P.pM); rect(cx - r, ty - 4, cx + r, ty - 4, a_P.pL); rect(cx - r + 1, ty - 1, cx + r - 1, ty - 1, a_P.pS);
  for (let x = cx - r + 1; x < cx + r; x += 3) pset(x, ty - 2, a_P.bz);
  // la superficie del agua, con su brillo que corre
  rect(cx - r + 1, ty - 6, cx + r - 1, ty - 5, a_K); rect(cx - r + 2, ty - 6, cx + r - 2, ty - 5, noche ? a_P.agS : a_P.ag);
  const g = Math.round(cx - r + 3 + ((t * 3 + cx) % (2 * r - 5)));
  pset(g, ty - 6, a_P.agL); pset(g + 1, ty - 6, a_P.agL); if (Math.sin(t * 2.1 + cx) > 0.3) pset(cx - 2, ty - 5, a_P.agL);
}
// una cuna de madera vacía con su manta verde (pies en yb, ancho 26): se mece un poco
function a_cuna(R, x, yb, t, k = 0) {
  const { rect, pset, linea } = R, m = Math.round(Math.sin(t * 1.1 + k) * 0.8);
  rect(x + 2, yb - 1, x + 24, yb, a_K); linea(x, yb - 2, x + 6 + m, yb - 1, a_P.madS); linea(x + 20 + m, yb - 1, x + 26, yb - 2, a_P.madS);
  rect(x + 2, yb - 14, x + 24, yb - 3, a_K); rect(x + 3, yb - 13, x + 23, yb - 4, a_P.mad); rect(x + 3, yb - 13, x + 23, yb - 12, a_P.madL); rect(x + 3, yb - 5, x + 23, yb - 4, a_P.madS);
  for (let i = x + 6; i < x + 22; i += 4) rect(i, yb - 11, i + 1, yb - 6, a_P.madS);
  rect(x + 1, yb - 20, x + 3, yb - 3, a_K); rect(x + 23, yb - 20, x + 25, yb - 3, a_K); pset(x + 2, yb - 19, a_P.madL); pset(x + 24, yb - 19, a_P.madL); rect(x + 2, yb - 18, x + 2, yb - 4, a_P.mad); rect(x + 24, yb - 18, x + 24, yb - 4, a_P.mad);
  rect(x + 4, yb - 15, x + 22, yb - 13, a_P.vd); rect(x + 4, yb - 15, x + 22, yb - 15, a_P.vdL); pset(x + 13, yb - 14, a_P.bzL); rect(x + 5, yb - 13, x + 7, yb - 9, a_P.vd); rect(x + 5, yb - 13, x + 5, yb - 9, a_P.vdS);
}
// un guardia Fremen de fondo, pequeño (alto ≈ 14·s): capucha y capa pardas, traje destilador gris, ojos azules que
// parpadean, la lanza ceremonial apoyada (quieta, nunca en uso); cambia el peso de vez en cuando
function a_guardia(R, x, yb, t, s = 1, dir = 1, k = 0) {
  const { rect, pset, linea } = R, H = Math.round(14 * s), w = Math.max(3, Math.round(3 * s)), sh = (t * 0.3 + k * 0.37) % 4 < 0.4 ? dir : 0;
  const xc = x + sh, yH = yb - H;
  linea(xc + 4 * dir * s, yb, xc + 4 * dir * s, yH - Math.round(5 * s), a_P.madS); pset(Math.round(xc + 4 * dir * s), yH - Math.round(5 * s) - 1, a_P.bzL);
  for (let j = 0; j < H; j++) { const u = j / H, ww = Math.round(w * (0.7 + u * 0.6)); rect(xc - ww, yH + j, xc + ww, yH + j, a_K); if (ww > 1) rect(xc - ww + 1, yH + j, xc + ww - 1, yH + j, j < H * 0.3 ? a_P.t2 : (j + k) % 5 === 0 ? a_P.t7 : a_P.t2); }
  rect(xc - w + 1 + (dir > 0 ? 1 : 0), yH + Math.round(H * 0.32), xc - w + 1 + (dir > 0 ? 1 : 0), yb - 2, a_P.t1);
  rect(xc - 1, yH + 2, xc + 1, yH + 3, a_P.pielS);
  if ((t + k * 1.3) % 3.7 > 0.12) { pset(xc - 1 + (dir > 0 ? 1 : 0), yH + 2, a_P.ojo); pset(xc + (dir > 0 ? 1 : 0), yH + 2, a_P.ojo); }
  pset(xc + 4 * dir * s - dir, yH + Math.round(H * 0.45), a_P.t2);
}

// el pebetero de bronce de primer término (pies en yb): trípode, cuenco con brasas, llamas que bailan y el humo que sube
function a_pebetero(R, cx, yb, t, s = 1, noche = false) {
  const { rect, pset, linea, disco } = R, hh = Math.round(30 * s);
  for (const d of [-1, 0, 1]) { linea(cx + d * 9 * s, yb, cx + d * 3, yb - hh + 8, a_K); linea(cx + d * 9 * s + (d >= 0 ? -1 : 1), yb, cx + d * 3 + (d >= 0 ? -1 : 1), yb - hh + 8, d < 0 ? a_P.bzL : a_P.bz); }
  rect(cx - 2, yb - hh + 4, cx + 2, yb - hh + 10, a_K); rect(cx - 1, yb - hh + 4, cx + 1, yb - hh + 10, a_P.bz);
  const top = yb - hh;
  R.poligono([[cx - 13 * s, top - 2], [cx + 13 * s + 1, top - 2], [cx + 8 * s + 1, top + 5], [cx - 8 * s, top + 5]], a_K);
  R.poligono([[cx - 12 * s, top - 1], [cx + 12 * s, top - 1], [cx + 7 * s, top + 4], [cx - 7 * s, top + 4]], (x, y) => (y === top - 1 ? a_P.bzL : x < cx - 4 ? a_P.bzL : x > cx + 5 ? a_P.bzS : a_P.bz));
  for (let i = -10; i <= 10; i += 4) pset(cx + i * s, top + 1, a_P.bzD);
  // las brasas y las llamas
  for (let i = -9; i <= 9; i++) { const b = h(i, Math.floor(t * 6), 5); pset(cx + i * s, top - 2, b > 0.6 ? a_P.fuL : b > 0.25 ? a_P.fu : a_P.fuS); }
  for (let k = 0; k < 7; k++) { const fx = cx + (k - 3) * 3 * s, a = 4 + Math.round((Math.sin(t * 9 + k * 2.1) + 1) * 2.5 * s);
    for (let j = 0; j < a; j++) { const w = j < a * 0.5 ? 1 : 0, ox = Math.round(Math.sin(t * 11 + k + j * 0.6)); const c = j < a * 0.35 ? a_P.fuL : j < a * 0.7 ? a_P.fu : a_P.fuS; pset(fx + ox, top - 3 - j, c); if (w) pset(fx + ox + 1, top - 3 - j, c); } }
  // el humo que sube y se deshace, gris claro y tramado
  for (let k = 0; k < 18; k++) { const u = ((t * 0.35 + k / 18) % 1), y = top - 10 - u * 70 * s, x = cx + Math.sin(u * 7 + k + t * 0.8) * (3 + u * 10);
    if (y < 46) continue; const c = noche ? a_P.n3 : a_P.nu1; if (((k + Math.floor(t * 8)) % 3) || u < 0.7) { pset(Math.round(x), Math.round(y), c); if (u < 0.6) pset(Math.round(x) + 1, Math.round(y), c); } }
  // el resplandor en lo que tiene cerca
  for (let j = -18; j <= 6; j++) for (let i = -20; i <= 20; i++) { const d = Math.hypot(i, j * 1.4) / 22; if (d < 1 && (i + j + 64) % 2 === 0 && (1 - d) * 0.5 > a_b4(cx + i, top + j)) a_tinte(R, cx + i, top + j, noche ? 0.16 : 0.07, a_P.fu); }
}

// las motas de polvo que flotan en un haz: n motas, en el paralelogramo que baja de (x0, y0) con ancho w, deriva dx por fila
function a_polvo(R, t, x0, y0, w, alto, dx, n, k = 0, c = a_P.luz) {
  for (let i = 0; i < n; i++) { const u = (h(i, 1, k) + t * (0.02 + h(i, 2, k) * 0.03)) % 1, y = y0 + u * alto, x = x0 + h(i, 3, k) * w + (y - y0) * dx + Math.sin(t * 0.7 + i) * 2;
    if (Math.sin(t * 1.3 + i * 2.1) > -0.3) R.pset(Math.round(x), Math.round(y), c); }
}

const a_FX = 160, a_FY = 80;

const a_sueloI = (x) => 108 + (96 - x) * 0.4375, a_sueloD = (x) => 108 + (x - 224) * 0.4375;

const a_techoI = (x) => 18 - (96 - x) * 0.97, a_techoD = (x) => 18 - (x - 224) * 0.97;

const a_COLS = [12, 48, 72, 87];

function a_tronoFijo(R, noche, vacio, cunas) {
  const { rect, pset, linea, poligono, disco } = R;
  const PIE = [a_P.pL, a_P.p, a_P.pM, a_P.pS, a_P.pJ], SOM = [a_P.sL, a_P.s, a_P.sM, a_P.sS, a_P.sJ];
  // el techo: bóveda en sombra con sus nervios hacia el fondo (tranquila: ahí va la barra del año)
  for (let y = 0; y < 60; y++) for (let x = 0; x < 320; x++) { if (y > 18 && x >= 96 && x <= 224) continue; if (x < 96 && y > a_techoI(x)) continue; if (x > 224 && y > a_techoD(x)) continue;
    const d = Math.abs(x - a_FX) / Math.max(1, a_FY - y), u = Math.floor(d * 6); pset(x, y, (Math.abs(d * 6 - u - 0.5) > 0.44) ? a_P.sD : ((x + y) % 2 && y > 10 ? a_P.sS : a_P.sD)); }
  for (let y = 0; y <= 18; y += 6) rect(96, 18 - y, 224, 18 - y, a_P.sS);
  // los muros laterales en perspectiva: sillares que encogen hacia el fondo, más oscuros cerca (la luz viene del fondo)
  for (let x = 0; x < 320; x++) {
    if (x >= 96 && x <= 224) continue; const izq = x < 96, dist = Math.abs(x - a_FX), y0 = Math.max(0, Math.ceil(izq ? a_techoI(x) : a_techoD(x))), y1 = Math.floor(izq ? a_sueloI(x) : a_sueloD(x));
    const z = 1 / dist, col = Math.floor(z / 0.0021), rz = (z / 0.0021) - col;
    for (let y = y0; y <= y1 && y < 180; y++) { const v = (y - a_FY) / dist, f = Math.floor(v / 0.105 + 40), rv = v / 0.105 + 40 - f, nb = h(col + (f % 2) * 7, f, 11);
      let c = rv < 0.1 || (Math.abs(rz - (f % 2) * 0.5) < 0.06 * (60 / dist) + 0.02) ? a_P.sJ : rv < 0.22 ? a_P.sL : rv > 0.88 ? a_P.sS : nb < 0.3 ? a_P.sM : a_P.s;
      const r = h(x, y, 12); if (c === a_P.s || c === a_P.sM) c = r > 0.95 ? a_P.sS : r < 0.03 ? a_P.sL : c;
      if (dist > 120 && (x + y) % 2 === 0 && c !== a_P.sJ) c = a_mezcla(c, a_P.sD, 0.35);
      pset(x, y, c); }
  }
  // el friso tallado que corre por los muros laterales (una banda de rombos de bronce a media altura)
  for (let x = 0; x < 320; x++) { if (x >= 96 && x <= 224) continue; const dist = Math.abs(x - a_FX), ya = Math.round(a_FY - 0.36 * dist), alto = Math.max(2, Math.round(dist * 0.05));
    for (let j = 0; j < alto; j++) pset(x, ya + j, j === 0 ? a_P.pL : j === alto - 1 ? a_P.sD : ((x + j * 2) % 6 < 2 ? a_P.bz : a_P.pS)); }
  // el muro del fondo, a la luz que entra por la celosía
  a_sillares(R, 96, 18, 224, 108, PIE, { alto: 6, ancho: 14, k: 21 });
  rect(96, 18, 224, 19, a_P.pK); rect(96, 104, 224, 108, a_P.pS); rect(96, 104, 224, 104, a_P.pL);
  for (let x = 96; x <= 224; x++) { pset(x, 22, (x % 4 < 2) ? a_P.bz : a_P.bzS); pset(x, 23, a_P.pD); }
  // el gran nicho apuntado con su moldura y la celosía encendida
  const NX = 160, NYS = 64, NA = 30;
  for (let y = 18; y <= 108; y++) for (let x = NX - NA - 6; x <= NX + NA + 6; x++) {
    if (a_enArco(x, y, NX, NYS, NA, 108)) continue;
    if (a_enArco(x, y, NX, NYS, NA + 2, 108)) pset(x, y, x < NX ? a_P.pL : a_P.pS);
    else if (a_enArco(x, y, NX, NYS, NA + 5, 108)) pset(x, y, ((x + y) % 3 === 0) ? a_P.bzS : a_P.pM);
    else if (a_enArco(x, y, NX, NYS, NA + 6, 108)) pset(x, y, a_P.pD);
  }
  for (let y = 18; y <= 108; y++) for (let x = NX - NA; x <= NX + NA; x++) {
    if (!a_enArco(x, y, NX, NYS, NA, 108)) continue;
    if (y < 82) { const hu = a_hueco(x, y, 6), cen = Math.hypot(x - NX, y - 52) < 9;
      pset(x, y, cen ? (Math.hypot(x - NX, y - 52) > 7 ? a_P.bz : (hu ? (noche ? a_P.agL : a_P.luz) : a_P.bzS)) : hu ? (noche ? (y < 50 ? a_P.agL : a_P.ci0) : (y < 50 ? a_P.luz : a_P.luzS)) : (x < NX ? a_P.pM : a_P.pS)); }
    else pset(x, y, y === 82 ? a_P.pK : (x + y) % 2 ? a_P.sS : a_P.sD);
  }
  // la estrella de ocho puntas en el centro de la celosía
  for (let a = 0; a < 8; a++) { const an = a * Math.PI / 4; linea(NX, 52, Math.round(NX + Math.cos(an) * 6), Math.round(52 + Math.sin(an) * 6), a_P.bzL); }
  rect(NX - 26, 81, NX + 26, 83, a_P.pL); rect(NX - 26, 83, NX + 26, 83, a_P.pD);
  // los dos estandartes del fondo cuelgan aparte (vivos); aquí, sus ganchos de bronce y la sombra en el muro
  for (const bx of [104, 202]) { rect(bx + 2, 30, bx + 16, 92, a_P.pS); for (let y = 30; y < 92; y += 2) pset(bx + 1, y, a_P.pD); }
  // lámparas de bronce colgadas del fondo
  for (const lx of [124, 196]) { linea(lx, 18, lx, 34, a_P.bzS); poligono([[lx - 4, 34], [lx + 5, 34], [lx + 3, 39], [lx - 2, 39]], a_P.bz); rect(lx - 3, 34, lx + 3, 34, a_P.bzL); pset(lx, 40, a_P.fuL); }
  // el suelo de losas pulidas en perspectiva, con sus juntas, vetas y los reflejos de las columnas y de la celosía
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) {
    if (y <= 108 && x >= 96 && x <= 224) continue; if (x < 96 && y <= a_sueloI(x)) continue; if (x > 224 && y <= a_sueloD(x)) continue;
    const dist = y - a_FY, X = (x - a_FX) / dist, Z = 1 / dist, tx = X / 0.28, tz = Z / 0.0026, ix = Math.floor(tx), iz = Math.floor(tz);
    const fx = tx - ix, fz = tz - iz, junta = fx < 0.05 + 2 / dist * 0.2 || fz < 0.06;
    let c = junta ? a_P.pD : ((ix + iz) % 2 ? a_P.pM : a_P.p);
    if (!junta) { const vt = Math.sin(tx * 9 + tz * 4 + h(ix, iz, 3) * 6); if (Math.abs(vt) < 0.07) c = a_P.pS; if (h(x, y, 31) > 0.97) c = a_P.pL; }
    pset(x, y, c);
  }
  // reflejos en las losas: el brillo de la celosía en el centro, y una franja tenue bajo cada columna
  for (let y = 109; y < 180; y++) for (let x = 120; x < 200; x++) { const u = Math.abs(x - NX) / (24 + (y - 108) * 0.35); if (u < 1 && (1 - u) * 0.8 > a_b4(x, y) + (y - 109) / 90) a_tinte(R, x, y, 0.22, noche ? a_P.agL : a_P.luz); }
  // la tarima: plataforma y tres escalones con su filo de luz y una línea de bronce embutida
  poligono([[112, 106], [208, 106], [214, 121], [106, 121]], (x, y) => (h(x, y, 41) > 0.96 ? a_P.pS : (x + y) % 9 === 0 ? a_P.pM : a_P.p));
  rect(106, 121, 214, 121, a_P.pL);
  const ESC = [[104, 216, 122, 126], [98, 222, 129, 133], [92, 228, 136, 140]], HUE = [[102, 218, 127, 128], [96, 224, 134, 135]];
  for (const [a, b, y0, y1] of ESC) { rect(a, y0, b, y1, a_P.pM); rect(a, y0, b, y0, a_P.pS); rect(a, y1, b, y1, a_P.pD); for (let x = a + 3; x < b; x += 12) pset(x, y0 + 2, a_P.bz); rect(a, y0 + 1, a + 1, y1, a_P.pS); rect(b - 1, y0 + 1, b, y1, a_P.pD); }
  for (const [a, b, y0, y1] of HUE) { rect(a, y0, b, y1, a_P.pL); rect(a, y1, b, y1, a_P.p); }
  // la alfombra de especia con orla de oro, de la tarima hasta abajo (en perspectiva)
  for (let y = 107; y < 180; y++) { const half = Math.round((y - a_FY) * 0.32), x0 = a_FX - half, x1 = a_FX + half, enT = y < 122;
    if (y >= 122 && y <= 140) { const e = ESC.find(([, , a, b]) => y >= a && y <= b); if (e) { rect(x0, y, x1, y, y === e[2] ? a_P.alS : a_P.al); pset(x0, y, a_P.alO); pset(x1, y, a_P.alO); continue; } }
    for (let x = x0; x <= x1; x++) { const bx = Math.min(x - x0, x1 - x), dist = y - a_FY, X = (x - a_FX) / dist, Z = 1 / dist;
      let c = bx === 0 ? a_P.alS : bx <= Math.max(1, half * 0.12) ? a_P.alO : a_P.al;
      if (c === a_P.al) { const m = Math.abs(((Z / 0.0045) % 1) - 0.5) * 2 + Math.abs(X) * 6; c = m < 0.5 ? a_P.alL : m < 0.62 ? a_P.alO : (h(x, y, 51) > 0.9 ? a_P.alS : a_P.al); }
      pset(x, y, c); } }
  // el trono: respaldo alto apuntado con paneles tallados y el halcón de bronce arriba, brazos y asiento con cojín verde
  for (let y = 58; y <= 121; y++) for (let x = 138; x <= 182; x++) {
    const enR = a_enArco(x, y, 160, 74, 15, 106), enRi = a_enArco(x, y, 160, 75, 11, 104);
    if (enR) pset(x, y, !enRi ? (x < 160 ? a_P.pL : a_P.pS) : (Math.abs(x - 160) < 6 && y > 70 && y < 100 ? ((x + y) % 4 === 0 ? a_P.vdL : a_P.vd) : (y % 6 === 0 ? a_P.pS : x < 156 ? a_P.p : a_P.pM)));
  }
  for (let y = 70; y < 100; y++) { pset(153, y, a_P.bzL); pset(167, y, a_P.bzS); }
  R.sprite(a_HALCON, 156, 58, { '#': a_P.bzL, '.': null }); R.sprite(['.###.', '#####', '.#.#.'], 158, 65, { '#': a_P.bz, '.': null });
  for (const [x0, x1] of [[136, 147], [173, 184]]) { rect(x0, 96, x1, 112, a_K); rect(x0 + 1, 97, x1 - 1, 111, a_P.pM); rect(x0 + 1, 97, x1 - 1, 98, a_P.pL); rect(x0 + 1, 106, x1 - 1, 107, a_P.bz); disco(x0 < 160 ? x0 + 2 : x1 - 2, 96, 2.5, a_P.bz); pset(x0 < 160 ? x0 + 1 : x1 - 3, 95, a_P.bzL); }
  rect(146, 104, 174, 120, a_K); rect(147, 105, 173, 119, a_P.pM); rect(147, 105, 173, 108, a_P.vd); rect(147, 105, 173, 105, a_P.vdL); rect(150, 111, 170, 117, a_P.pS); rect(151, 112, 169, 116, a_P.p); disco(160, 114, 2, a_P.bz);
  if (vacio) { R.sprite(['#.#.#.#', '#######', '#.#.#.#', '#######'], 157, 101, { '#': a_P.bzL, '.': null }); rect(157, 104, 163, 104, a_P.bzS); pset(160, 102, a_P.tap1); }
  // las columnas: fuste acanalado con luz a la izquierda, anillos de bronce, capitel con dentículos y basa escalonada
  const columna = (xc, izq) => {
    const dist = Math.abs(xc - a_FX), w = Math.max(4, Math.round(dist * 0.15)), yb = Math.round((izq ? a_sueloI(xc) : a_sueloD(xc)) + dist * 0.1), x0 = xc - w, x1 = xc + w;
    const yCap = Math.round(a_FY - dist * 0.74);
    for (let y = Math.max(0, yCap); y <= yb; y++) for (let x = x0; x <= x1; x++) { const u = (x - x0) / (x1 - x0), fl = Math.floor(u * 6), ru = u * 6 - fl;
      let c = u < 0.08 || u > 0.94 ? a_P.sD : ru < 0.2 ? a_P.sS : u < 0.35 ? a_P.sL : u < 0.7 ? a_P.s : a_P.sM;
      if ((dist > 125 && y < 50) || (x > 276 && y < 46)) c = (x + y) % 2 ? a_P.sS : a_P.sM;   // la columna de la esquina, tranquila arriba
      pset(x, y, c); }
    for (const v of [0.3, -0.1]) { const yy = Math.round(a_FY + v * dist); if (yy > yCap && yy < yb - 4) { rect(x0 - 1, yy, x1 + 1, yy + Math.max(1, Math.round(dist * 0.02)), a_P.bz); rect(x0 - 1, yy, x1 + 1, yy, a_P.bzL); } }
    if (yCap > 0) { rect(x0 - 3, yCap - 4, x1 + 3, yCap, a_P.sS); rect(x0 - 3, yCap - 4, x1 + 3, yCap - 4, a_P.sL); for (let x = x0 - 2; x <= x1 + 2; x += 3) pset(x, yCap - 2, a_P.sD); }
    rect(x0 - 2, yb - 4, x1 + 2, yb, a_P.sS); rect(x0 - 2, yb - 4, x1 + 2, yb - 4, a_P.sL); rect(x0 - 3, yb - 1, x1 + 3, yb + 1, a_P.sD); rect(x0 - 3, yb - 1, x1 + 3, yb - 1, a_P.sM);
  };
  // las celosías altas de los muros laterales (antes de las columnas, que van delante)
  for (const [cx, izq] of [[62, true], [258, false]]) {
    const dist = Math.abs(cx - a_FX), a = Math.round(dist * 0.08), ys = Math.round(a_FY - dist * 0.36), yb = Math.round(a_FY - dist * 0.04);
    for (let y = ys - 2 * a; y <= yb + 2; y++) for (let x = cx - a - 3; x <= cx + a + 3; x++) {
      if (a_enArco(x, y, cx, ys, a, yb)) pset(x, y, a_hueco(x, y, 5) ? (noche ? a_P.agL : a_P.luz) : (izq ? a_P.sS : a_P.sM));
      else if (a_enArco(x, y, cx, ys, a + 2, yb + 2)) pset(x, y, x < cx ? a_P.sL : a_P.sD);
    }
  }
  for (const xc of a_COLS) columna(xc, true);
  for (const xc of a_COLS) columna(320 - xc, false);
  // los haces de luz de las celosías laterales, que cruzan el salón hasta el suelo (tramados)
  const haz = (x0, y0, x1, y1, an, fu) => a_luzTramada(R, Math.min(x0, x1) - an, y0, Math.max(x0, x1) + an, y1, (x, y) => { const u = (y - y0) / (y1 - y0), xc = x0 + (x1 - x0) * u, w = an * (0.5 + u * 0.7); const d = Math.abs(x - xc) / w; return d < 1 ? (1 - d) * fu * (1 - u * 0.3) : 0; }, noche ? a_P.agL : a_P.luz, noche ? 0.12 : 0.2);
  haz(62, 46, 128, 160, 6, 0.8); haz(258, 46, 192, 160, 6, 0.8);
  haz(160, 70, 160, 172, 18, 0.55);
  // las cunas al pie de la escalinata
  if (cunas >= 1) a_cuna(R, 108, 146, 0, 0); if (cunas >= 2) a_cuna(R, 188, 146, 0, 1);
  // de noche: todo a la luz de la luna azul, y las antorchas calientan su columna
  if (noche) {
    const P = R.buf; for (let i = 0; i < P.length; i++) P[i] = a_mezcla(P[i], a_P.n1, 0.55);
    for (const [ax, ay] of [[50, 70], [270, 70]]) for (let j = -34; j <= 40; j++) for (let i = -34; i <= 34; i++) { const d = Math.hypot(i, j) / 36; if (d < 1 && (1 - d) * 0.9 > a_b4(ax + i, ay + j) + 0.1) a_tinte(R, ax + i, ay + j, 0.28 * (1 - d), a_P.fu); }
    for (let y = 26; y < 82; y++) for (let x = 130; x <= 190; x++) if (a_enArco(x, y, NX, NYS, NA, 108) && a_hueco(x, y, 6) && Math.hypot(x - NX, y - 52) > 7) pset(x, y, y < 50 ? a_P.agL : a_P.ci0);
  }
}

function a_trono(R, t, o, noche) {
  const vacio = !!o.vacio, cunas = o.cunas ?? 0;
  a_capa(R, `trono|${noche}|${vacio}|${cunas}`, () => a_tronoFijo(R, noche, vacio, cunas));
  // los estandartes que se mecen: dos en el fondo, uno en cada muro lateral
  a_estandarte(R, 104, 30, 14, 52, t, { simbolo: 'halcon', fase: 0 });
  a_estandarte(R, 202, 30, 14, 52, t, { simbolo: 'corona', negro: true, fase: 1.7 });
  a_estandarte(R, 28, 34, 12, 60, t, { simbolo: 'halcon', fase: 0.8, amp: 1.8 });
  a_estandarte(R, 280, 50, 12, 56, t, { simbolo: 'corona', negro: true, fase: 2.5, amp: 1.8 });
  // los guardias Fremen de fondo y el acólito que rellena el cuenco del fondo
  a_guardia(R, 101, 108, t, 0.78, 1, 1); a_guardia(R, 219, 108, t, 0.78, -1, 2);
  a_guardia(R, 62, 128, t, 1.05, 1, 3); a_guardia(R, 258, 128, t, 1.05, -1, 4);
  a_cuenco(R, 78, 146, t, 1, noche); a_cuenco(R, 242, 146, t + 1.3, 1, noche);
  // el agua que cae del cántaro del acólito en el cuenco de la izquierda, de vez en cuando
  { const f = (t % 9) / 9, x = 70, y = 118; if (f > 0.55 && f < 0.85) for (let j = 0; j < 8; j++) if ((j + Math.floor(t * 12)) % 3) R.pset(x + 8, y - 4 + j, a_P.agL); }
  // las antorchas de noche, en las columnas
  if (noche) for (const [ax, ay] of [[50, 70], [270, 70]]) { R.rect(ax - 1, ay, ax + 1, ay + 8, a_P.madS); R.rect(ax - 2, ay - 1, ax + 2, ay, a_P.bz);
    for (let k = 0; k < 3; k++) { const a = 4 + Math.round((Math.sin(t * 10 + k * 2) + 1) * 2); for (let j = 0; j < a; j++) R.pset(ax - 1 + k + Math.round(Math.sin(t * 13 + j + k)), ay - 2 - j, j < 2 ? a_P.fuL : j < 4 ? a_P.fu : a_P.fuS); } }
  // el polvo que flota en los haces
  const cp = noche ? a_P.agL : a_P.luz;
  a_polvo(R, t, 62, 52, 10, 100, 0.58, 16, 1, cp); a_polvo(R, t, 248, 52, 10, 100, -0.58, 16, 2, cp); a_polvo(R, t, 146, 76, 28, 90, 0, 22, 3, cp);
  const cunasD = cunas ? [{ x: 108, w: 26, suelo: 146 }, { x: 188, w: 26, suelo: 146 }].slice(0, cunas) : undefined;
  return { encuadre: 'trono', camara: 'general', suelo: 150, libre: [40, 280], trono: { x: 160, y: 118, actorX: 153, pies: 122, tarima: [92, 228], escalones: [122, 129, 136] }, cunas: cunasD, cuencos: [[78, 146], [242, 146]] };
}
function a_tarimaFijo(R, noche, vacio) {
  const { rect, pset, linea, poligono, disco } = R;
  const PIE = [a_P.pL, a_P.p, a_P.pM, a_P.pS, a_P.pJ];
  // el muro del salón de lado: sillares grandes, friso de bronce y dos celosías altas apuntadas
  a_sillares(R, 0, 0, 319, 96, PIE, { alto: 9, ancho: 22, k: 61 });
  for (let y = 0; y < 97; y++) for (let x = 0; x < 320; x++) { const s = (y < 20 ? (20 - y) / 20 : 0) * 0.6 + (x > 260 && y < 50 ? 0.25 : 0); if (s > a_b4(x, y)) a_tinte(R, x, y, 0.25, a_P.sD); }
  for (let x = 0; x < 320; x++) { pset(x, 84, a_P.pL); pset(x, 85, (x % 6 < 3) ? a_P.bz : a_P.bzS); pset(x, 86, a_P.bzS); pset(x, 87, a_P.pD); }
  // manchas de humo de las lámparas y del tiempo en la piedra
  for (let y = 0; y < 84; y++) for (let x = 0; x < 320; x++) { const n = Math.sin(x * 0.05 + Math.sin(y * 0.06) * 1.4) + Math.sin(x * 0.13 - y * 0.04); if (n > 1.2 && a_b4(x, y) < (n - 1.2) * 1.2) a_tinte(R, x, y, 0.16, a_P.pK); }
  // el friso tallado bajo las celosías (y 74–83): una cenefa de rombos y estrellas en relieve, con su luz arriba
  rect(0, 73, 319, 73, a_P.pD); rect(0, 74, 319, 74, a_P.pL);
  for (let y = 75; y <= 83; y++) for (let x = 0; x < 320; x++) { const u = (x % 12) - 5.5, v = y - 79, d = Math.abs(u) + Math.abs(v) * 1.3;
    pset(x, y, d < 1.6 ? a_P.bzL : d < 2.6 ? a_P.bz : (d < 5 && d > 4) ? (u + v < 0 ? a_P.pL : a_P.pS) : x % 12 === 0 && Math.abs(v) < 3 ? a_P.pD : (y === 83 ? a_P.pS : a_P.p)); }
  // el medallón de piedra entre las dos celosías: el halcón de bronce en un círculo de rayos
  for (let j = -13; j <= 13; j++) for (let i = -13; i <= 13; i++) { const d = Math.hypot(i, j); if (d > 13.5) continue; const an = Math.atan2(j, i), ray = Math.sin(an * 12) > 0;
    pset(121 + i, 38 + j, d > 12.5 ? a_P.pD : d > 11 ? (i + j < 0 ? a_P.pL : a_P.pS) : d > 8 ? (ray ? a_P.bz : a_P.pM) : d > 7 ? a_P.bzS : a_P.pS); }
  R.sprite(a_HALCON, 117, 35, { '#': a_P.bzL, '.': null });
  for (const cx of [74, 168]) { for (let y = 8; y <= 70; y++) for (let x = cx - 22; x <= cx + 22; x++) {
      if (a_enArco(x, y, cx, 36, 15, 68)) pset(x, y, a_hueco(x, y, 6) ? (noche ? (y < 40 ? a_P.agL : a_P.ci0) : (y < 40 ? a_P.luz : a_P.luzS)) : (x < cx ? a_P.pM : a_P.pS));
      else if (a_enArco(x, y, cx, 36, 17, 70)) pset(x, y, x < cx ? a_P.pL : a_P.pD);
      else if (a_enArco(x, y, cx, 36, 20, 71)) pset(x, y, (x + y) % 3 ? a_P.pM : a_P.bzS); }
    rect(cx - 19, 70, cx + 19, 72, a_P.pL); rect(cx - 19, 72, cx + 19, 72, a_P.pD); }
  // la arquería de abajo: arcos apuntados que dejan ver la galería, más oscura, con su muro del fondo y sus lámparas
  for (let y = 88; y < 150; y++) for (let x = 0; x < 320; x++) pset(x, y, a_P.pM);
  a_sillares(R, 0, 88, 319, 149, [a_P.pL, a_P.p, a_P.pM, a_P.pS, a_P.pJ], { alto: 8, ancho: 20, k: 62 });
  for (const ax of [96, 150, 204]) for (let y = 92; y < 150; y++) for (let x = ax - 22; x <= ax + 22; x++) {
    if (a_enArco(x, y, ax, 112, 16, 149)) { const fondo = y < 140; pset(x, y, fondo ? ((y % 7 === 0 || (x + (Math.floor(y / 7) % 2) * 6) % 12 === 0) ? a_P.sJ : (h(x, y, 63) > 0.93 ? a_P.sS : a_P.sM)) : (y === 140 ? a_P.sD : a_P.sS)); }
    else if (a_enArco(x, y, ax, 112, 18, 149)) pset(x, y, x < ax ? a_P.pL : a_P.pS);
  }
  for (const ax of [96, 150, 204]) { linea(ax, 92, ax, 100, a_P.bzS); rect(ax - 2, 100, ax + 2, 102, a_P.bz); pset(ax, 103, a_P.fuL); for (let j = -6; j <= 8; j++) for (let i = -8; i <= 8; i++) if (Math.hypot(i, j) < 8 && (i + j) % 2 === 0) a_tinte(R, ax + i, 104 + j, 0.2, a_P.fu); }
  // el suelo de losas pulidas, de lado: franjas que se ensanchan hacia nosotros, juntas, vetas y reflejos
  for (let y = 150; y < 180; y++) { const u = (y - 150) / 30; for (let x = 0; x < 320; x++) { const w = 18 + u * 18, ix = Math.floor((x + (y - 150) * 0.4) / w), fz = Math.floor(Math.pow(y - 150, 0.8) / 4);
    let c = ((x + (y - 150) * 0.4) % w) < 1 || (Math.pow(y - 150, 0.8) % 4) < 0.5 ? a_P.pD : (ix + fz) % 2 ? a_P.pM : a_P.p;
    if (h(x, y, 64) > 0.97) c = a_P.pL; pset(x, y, c); } }
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const r = Math.abs(x - 20) < 12 || Math.abs(x - 258) < 22; if (r && (x + y) % 2 === 0 && (y - 150) / 30 < a_b4(x, y) + 0.5) a_tinte(R, x, y, 0.18, a_P.pL); }
  // la alfombra de especia, de lado, que sube la escalinata
  for (let y = 152; y < 164; y++) rect(0, y, 190, y, y === 152 || y === 163 ? a_P.alO : y === 153 ? a_P.alS : ((Math.floor(y / 2) % 2) ? a_P.al : a_P.alL));
  for (let x = 4; x < 190; x += 10) { pset(x, 157, a_P.alO); pset(x + 1, 158, a_P.alO); pset(x - 1, 158, a_P.alO); pset(x, 159, a_P.alO); }
  // la plataforma y los peldaños, de perfil
  rect(206, 135, 319, 179, a_P.pM); rect(206, 135, 319, 136, a_P.pL); rect(206, 137, 319, 137, a_P.pS); for (let x = 210; x < 320; x += 14) { pset(x, 141, a_P.bz); pset(x + 1, 141, a_P.bzL); }
  a_sillares(R, 206, 142, 319, 179, [a_P.pL, a_P.p, a_P.pM, a_P.pS, a_P.pJ], { alto: 8, ancho: 24, k: 65 });
  rect(198, 140, 206, 179, a_P.pM); rect(198, 140, 206, 141, a_P.pL); rect(190, 145, 198, 179, a_P.pM); rect(190, 145, 198, 146, a_P.pL);
  rect(205, 140, 205, 179, a_P.pS); rect(197, 145, 197, 179, a_P.pS); rect(189, 150, 189, 179, a_P.pD);
  for (let y = 140; y < 152; y++) { const x0 = y < 145 ? 198 : 190; rect(x0, y, 206 + (y < 145 ? 0 : 0), y, y % 5 === 0 ? a_P.alO : a_P.al); }
  rect(190, 145, 198, 146, a_P.alO); rect(198, 140, 206, 141, a_P.alO);
  // el trono de lado: asiento de piedra con cojín verde, respaldo alto con paneles y el halcón de bronce arriba
  rect(208, 128, 238, 135, a_K); rect(209, 129, 237, 134, a_P.pM); rect(209, 129, 237, 129, a_P.pL); rect(213, 131, 233, 133, a_P.pS);
  rect(208, 125, 236, 128, a_K); rect(209, 125, 235, 127, a_P.vd); rect(209, 125, 235, 125, a_P.vdL); for (let x = 211; x < 235; x += 4) pset(x, 126, a_P.bzS);
  // el trono, de frente y a la derecha: respaldo alto apuntado con canto de piedra, marco de bronce, el paño verde con el
  // halcón y rayos de oro; encima, el halcón de bronce; brazos con remate y el asiento con su cojín (el sentado, x 221)
  for (let y = 44; y <= 130; y++) for (let x = 204; x <= 254; x++) {
    const fuera = a_enArco(x, y, 228, 74, 22, 130), marco = a_enArco(x, y, 228, 76, 19, 128), pano = a_enArco(x, y, 228, 78, 15, 126);
    if (!fuera) { if (a_enArco(x, y, 228, 74, 23, 130)) pset(x, y, a_K); continue; }
    if (!marco) pset(x, y, x < 216 ? a_P.pL : x > 240 ? a_P.pS : (h(x, y, 66) > 0.9 ? a_P.pM : a_P.p));
    else if (!pano) pset(x, y, (y % 4 === 0) ? a_P.bzS : x < 228 ? a_P.bzL : a_P.bz);
    else { const an = Math.atan2(y - 80, x - 228), ray = Math.abs(((an * 8 / Math.PI) % 1 + 1) % 1 - 0.5) < 0.09 && y < 100; pset(x, y, ray ? a_P.bzS : (x + y) % 5 === 0 ? a_P.vdS : Math.abs(x - 228) < 5 ? a_P.vdL : a_P.vd); }
  }
  R.sprite(a_HALCON, 224, 74, { '#': a_P.bzL, '.': null }); R.sprite(['.###.', '#####', '.#.#.'], 226, 81, { '#': a_P.bz, '.': null });
  R.sprite(a_HALCON, 224, 34, { '#': a_P.bzL, '.': null }); rect(225, 41, 231, 44, a_P.bz); rect(225, 41, 231, 41, a_P.bzL);
  for (const [x0, x1] of [[200, 212], [244, 256]]) { rect(x0, 110, x1, 135, a_K); rect(x0 + 1, 111, x1 - 1, 134, a_P.pM); rect(x0 + 1, 111, x1 - 1, 112, a_P.pL); rect(x0 + 1, 121, x1 - 1, 122, a_P.bz); rect(x1 - 1, 113, x1 - 1, 134, a_P.pS);
    R.disco((x0 + x1) / 2, 110, 3.5, a_K); R.disco((x0 + x1) / 2, 110, 2.6, (x) => (x < (x0 + x1) / 2 ? a_P.bzL : a_P.bz)); }
  rect(212, 122, 244, 135, a_K); rect(213, 127, 243, 134, a_P.pM); rect(213, 127, 243, 127, a_P.pL); rect(216, 129, 240, 133, a_P.pS); for (let x = 218; x < 240; x += 4) pset(x, 131, a_P.bz);
  rect(213, 122, 243, 126, a_P.vd); rect(213, 122, 243, 122, a_P.vdL); for (let x = 215; x < 243; x += 4) pset(x, 124, a_P.bzS);
  if (vacio) { R.sprite(a_CORONA, 225, 118, { '#': a_P.bzL, '.': null }); rect(225, 121, 231, 121, a_P.bzS); pset(228, 119, a_P.tap1); }
  // detrás del trono: el gran paño verde con el halcón, y el pebetero de la plataforma
  // la columna de la izquierda: fuste acanalado, anillos de bronce, basa
  for (let y = 0; y < 158; y++) for (let x = 6; x <= 34; x++) { const u = (x - 6) / 28, fl = (u * 7) % 1; pset(x, y, u < 0.05 || u > 0.95 ? a_K : fl < 0.18 ? a_P.pS : u < 0.3 ? a_P.pL : u < 0.7 ? a_P.p : a_P.pM); }
  for (const yy of [40, 100]) { rect(4, yy, 36, yy + 3, a_P.bz); rect(4, yy, 36, yy, a_P.bzL); rect(4, yy + 3, 36, yy + 3, a_P.bzS); }
  for (const [y0, y1] of [[14, 36], [112, 146]]) for (let y = y0; y <= y1; y++) for (let x = 8; x <= 32; x++) { const u = (x - 6) / 28, z = Math.abs(((y - y0) % 8) - 4) === Math.abs((x % 8) - 4); if (z) pset(x, y, u < 0.3 ? a_P.bzL : u < 0.7 ? a_P.bz : a_P.bzS); }
  for (let y = 0; y < 150; y++) for (let x = 35; x < 35 + 10 + Math.round(y * 0.03); x++) if ((x + y) % 2 === 0 || x < 40) a_tinte(R, x, y, 0.22, a_P.sD);
  rect(2, 146, 38, 152, a_K); rect(3, 147, 37, 151, a_P.pM); rect(3, 147, 37, 147, a_P.pL); rect(0, 152, 40, 158, a_K); rect(1, 153, 39, 157, a_P.pS); rect(1, 153, 39, 153, a_P.p);
  // los reflejos en las losas pulidas: la columna, los arcos oscuros de la galería y el trono
  for (let y = 159; y < 180; y++) for (let x = 0; x < 189; x++) { if ((x + y) % 2) continue; const u = (y - 159) / 21;
    if (x >= 6 && x <= 34 && u < a_b4(x, y) + 0.4) a_tinte(R, x, y, 0.25, x < 16 ? a_P.pL : a_P.pS);
    for (const ax of [96, 150, 204]) if (Math.abs(x - ax) < 12 - u * 6 && y < 172) a_tinte(R, x, y, 0.12, a_P.sD); }
  // el haz de luz de la celosía de la derecha, que baja hasta el suelo delante del trono
  const haz = (x0, y0, x1, y1, an) => a_luzTramada(R, Math.min(x0, x1) - an * 2, y0, Math.max(x0, x1) + an * 2, y1, (x, y) => { const u = (y - y0) / (y1 - y0), xc = x0 + (x1 - x0) * u, w = an * (0.6 + u * 0.8), d = Math.abs(x - xc) / w; return d < 1 ? (1 - d) * 0.9 : 0; }, noche ? a_P.agL : a_P.luz, noche ? 0.13 : 0.22);
  haz(168, 44, 132, 170, 12); haz(74, 44, 50, 150, 10);
  if (noche) { const P = R.buf; for (let i = 0; i < P.length; i++) P[i] = a_mezcla(P[i], a_P.n1, 0.55);
    for (let j = -40; j <= 40; j++) for (let i = -40; i <= 40; i++) { const d = Math.hypot(i, j) / 42; if (d < 1 && (1 - d) * 0.9 > a_b4(i + 280, j + 100) + 0.1) a_tinte(R, 280 + i, 100 + j, 0.3 * (1 - d), a_P.fu); } }
}
function a_tarima(R, t, o, noche) {
  a_capa(R, `tarima|${noche}|${!!o.vacio}`, () => a_tarimaFijo(R, noche, !!o.vacio));
  // por la arquería pasan, pequeños, sacerdotes con estandartes (recortados a cada arco)
  for (let k = 0; k < 3; k++) { const x = ((t * 7 + k * 60) % 220) + 50, ax = [96, 150, 204].find((a) => Math.abs(x - a) < 15); if (ax == null) continue;
    R.recorte([ax - 15, 100, ax + 15, 139]); const y = 139, bob = Math.floor(t * 4 + k) % 2;
    for (let j = 0; j < 12; j++) R.linea(x - 3, y - j, x + 3, y - j, j < 3 ? a_P.t5 : j > 9 ? a_P.pielS : (k % 2 ? a_P.t4 : a_P.t5));
    R.pset(x, y - 11 - bob, a_P.pielS); R.linea(x + 4, y - 4, x + 4, y - 22, a_P.madS); R.linea(x + 5, y - 22, x + 5, y - 15, k % 2 ? a_P.vd : a_P.ng); R.linea(x + 6, y - 21, x + 6, y - 16, k % 2 ? a_P.vd : a_P.ng); R.pset(x + 6, y - 19, a_P.bzL);
    R.recorte(null); }
  // el estandarte grande detrás del trono y el pebetero de la plataforma con su llama
  a_estandarte(R, 276, 50, 20, 62, t, { simbolo: 'halcon', fase: 0.3, amp: 1.2 });
  a_estandarte(R, 112, 92, 12, 34, t, { simbolo: 'corona', negro: true, fase: 1.1, amp: 1 });
  a_pebetero(R, 300, 135, t, 0.7, noche);
  a_polvo(R, t, 150, 50, 30, 110, -0.28, 26, 7, noche ? a_P.agL : a_P.luz); a_polvo(R, t, 64, 50, 22, 96, -0.19, 14, 8, noche ? a_P.agL : a_P.luz);
  return { encuadre: 'trono', camara: 'tarima', suelo: 150, libre: [60, 188], trono: { asiento: [213, 243], y: 127, actorX: 221, pies: 134, brazos: [[200, 212], [244, 256]] }, plataforma: { y: 135, x0: 206 }, peldaños: [[190, 198, 145], [198, 206, 140]] };
}
function a_cieloFijo(R, y0, y1, noche = false) {
  const C0 = noche ? [a_P.n0, a_P.n1, a_P.n2, a_P.n3] : [a_P.ci0, a_P.ci1, a_P.ci2, a_P.ci3, a_P.ci4];
  for (let y = y0; y <= y1; y++) { const u = (y - y0) / Math.max(1, y1 - y0) * (C0.length - 1), i = Math.floor(u), f = u - i;
    for (let x = 0; x < 320; x++) R.pset(x, y, C0[Math.min(C0.length - 1, i + (f > a_b4(x, y) ? 1 : 0))]); }
  // las dos lunas, pálidas, con sus mares y su halo tenue
  for (const [mx, my, r] of [[196, 30, 6], [226, 22, 3]]) {
    for (let j = -r - 4; j <= r + 4; j++) for (let i = -r - 4; i <= r + 4; i++) { const d = Math.hypot(i, j); if (d > r && d < r + 4 && (i + j) % 2 === 0) a_tinte(R, mx + i, my + j, 0.12, a_P.luna); }
    R.disco(mx, my, r, (x, y) => (x - mx + (y - my) > r * 0.6 ? a_P.lunaS : a_P.luna));
    if (r > 4) { R.pset(mx - 2, my - 1, a_P.lunaS); R.pset(mx - 1, my - 1, a_P.lunaS); R.pset(mx + 1, my + 2, a_P.lunaS); R.pset(mx - 3, my + 2, a_P.lunaS); }
  }
}

// las nubes de polvo de tres tonos, a tres velocidades, y los halcones: solo donde hay cielo (máscara)
function a_cieloVivo(R, t, mask, y0, y1) {
  const capas = [[0.8, a_P.nu2, 3, 22], [1.6, a_P.nu1, 4, 30], [2.8, a_P.nu0, 3, 40]];
  capas.forEach(([v, col, n, w], c) => { for (let k = 0; k < n; k++) {
    const cx = ((h(k, c, 81) * 420 + t * v * (1 + c * 0.2)) % 420) - 50, cy = y0 + 6 + h(k, c + 4, 81) * (y1 - y0 - 12) * (c === 0 ? 0.5 : 1);
    for (let j = -3; j <= 3; j++) for (let i = -w; i <= w; i++) { const e = (i / w) ** 2 + (j / (3 + (i % 3 === 0 ? 0.5 : 0))) ** 2; if (e > 1) continue;
      const x = Math.round(cx + i), y = Math.round(cy + j); if (x < 0 || x > 319 || y < 0 || y > 179 || !mask[y * 320 + x]) continue;
      if ((x > 278 && y < 46) || (x < 172 && y < 21)) { if ((x + y) % 2) continue; }
      R.pset(x, y, j < -1 ? a_P.nu0 : j > 1 ? (c ? a_P.nu2 : a_P.ci1) : col); } } });
  for (let k = 0; k < 3; k++) { const a = t * 0.4 + k * 2.1, x = Math.round(100 + k * 40 + Math.cos(a) * 26), y = Math.round(30 + k * 4 + Math.sin(a) * 6), al = Math.floor(t * 5 + k) % 2;
    if (!mask[y * 320 + x]) continue; R.pset(x, y, a_P.ngL); R.pset(x - 1, y - al, a_P.ngL); R.pset(x + 1, y - al, a_P.ngL); R.pset(x - 2, y - al * 2 + 1, a_P.ngL); R.pset(x + 2, y - al * 2 + 1, a_P.ngL); }
}
// la máscara del cielo de un búfer fijo (los píxeles que son cielo), una vez por clave
const a_mascaras = new Map();

function a_mascara(clave, y1, esCielo) {
  let m = a_mascaras.get(clave); if (m) return m; m = new Uint8Array(320 * 180);
  for (let y = 0; y <= y1; y++) for (let x = 0; x < 320; x++) m[y * 320 + x] = esCielo(x, y) ? 1 : 0;
  a_mascaras.set(clave, m); return m;
}

// la ciudad de arenisca entre yTop y yBot: casas de azotea, cúpulas, torres de viento, ventanitas; s = escala
function a_ciudad(R, x0, x1, yb, s, k, tonos) {
  const [L, M, S, D] = tonos;
  for (let x = x0; x < x1;) { const w = Math.round((8 + h(x, 1, k) * 14) * s), al = Math.round((6 + h(x, 2, k) * 12) * s), tipo = h(x, 3, k);
    const top = yb - al; R.rect(x, top, x + w, yb, M); R.rect(x, top, x + w, top, L); R.rect(x + w, top, x + w, yb, S); R.rect(x, top + 1, x, yb, L);
    if (tipo < 0.25) R.disco(x + w / 2, top, w * 0.38, (px, py) => (px < x + w / 2 ? L : S));
    else if (tipo < 0.42) { const tw = Math.max(2, Math.round(3 * s)), th = Math.round(8 * s); R.rect(x + 1, top - th, x + 1 + tw, top, M); R.rect(x + 1, top - th, x + 1 + tw, top - th, L); R.rect(x + 1, top - th + 1, x + 1 + tw, top - th + 1, D); }
    for (let wy = top + 2; wy < yb - 1; wy += Math.max(3, Math.round(4 * s))) for (let wx = x + 2; wx < x + w - 1; wx += Math.max(3, Math.round(4 * s))) if (h(wx, wy, k) > 0.45) R.pset(wx, wy, D);
    x += w + (h(x, 4, k) > 0.7 ? 1 : 0);
  }
}

function a_balconFijo(R) {
  const { rect, pset, linea, poligono } = R;
  a_cieloFijo(R, 0, 46);
  // las murallas de roca a lo lejos y las dunas hasta el horizonte
  for (let x = 0; x < 320; x++) { const y = Math.round(40 + Math.sin(x * 0.05) * 2 + h(x >> 2, 1, 91) * 3 + (x > 240 ? -3 : 0)); for (let yy = y; yy <= 47; yy++) pset(x, yy, yy === y ? a_P.rocaS : (x + yy) % 3 ? a_P.roca : a_P.rocaS); }
  for (let y = 46; y < 56; y++) for (let x = 0; x < 320; x++) { const d = Math.sin(x * 0.07 + y * 0.6) + Math.sin(x * 0.023 - y); pset(x, y, d > 1.1 ? a_P.duL : d < -0.9 ? a_P.duS : a_P.du); }
  // la ciudad de arenisca en tres términos: lejos (pequeña, pálida), medio y cerca, con cúpulas y torres de viento
  a_ciudad(R, -4, 324, 58, 0.55, 92, [a_P.pL, a_P.pM, a_P.pS, a_P.pD]);
  a_ciudad(R, -8, 324, 66, 0.8, 93, [a_P.pL, a_P.p, a_P.pS, a_P.pD]);
  // una gran cúpula de bronce y dos torres lejanas (nuestras: torres de viento escalonadas)
  R.disco(70, 56, 8, (x, y) => (x < 68 ? a_P.bzL : x > 73 ? a_P.bzS : a_P.bz)); rect(62, 56, 78, 60, a_P.pM); linea(70, 47, 70, 44, a_P.bzS);
  for (const [tx, th] of [[252, 22], [118, 16]]) { rect(tx, 66 - th, tx + 6, 66, a_P.p); rect(tx, 66 - th, tx, 66, a_P.pL); rect(tx + 6, 66 - th, tx + 6, 66, a_P.pS); rect(tx - 1, 66 - th - 3, tx + 7, 66 - th, a_P.pM); for (let i = 0; i < 3; i++) rect(tx + 1 + i * 2, 66 - th - 2, tx + 1 + i * 2, 66 - th - 1, a_P.pD); }
  a_ciudad(R, -10, 330, 74, 1.1, 94, [a_P.pL, a_P.p, a_P.pM, a_P.pS]);
  // la plaza: losas en perspectiva desde arriba, la avenida, y la fuente del centro (el agua, un tesoro)
  for (let y = 74; y < 112; y++) for (let x = 0; x < 320; x++) { const d = y - 60, X = (x - 160) / d, ix = Math.floor(X / 0.5), iz = Math.floor(400 / d), av = Math.abs(x - 160) < 5 + (y - 76) * 0.45;
    pset(x, y, ((X / 0.5) % 1 + 1) % 1 < 0.06 || ((400 / d) % 1) < 0.1 ? a_P.pS : av ? ((ix + iz) % 2 ? a_P.pL : a_P.p) : (ix + iz) % 2 ? a_P.pM : a_P.p); }
  rect(0, 74, 319, 75, a_P.pS);
  // la muralla baja del fondo de la plaza, con su puerta, y dos obeliscos de bronce a los lados de la avenida
  rect(0, 72, 319, 76, a_P.pM); rect(0, 72, 319, 72, a_P.pL); for (let x = 2; x < 320; x += 6) rect(x, 70, x + 2, 71, a_P.pM);
  for (let y = 66; y <= 76; y++) for (let x = 150; x <= 170; x++) { if (a_enArco(x, y, 160, 71, 6, 76)) pset(x, y, a_P.pK); else if (a_enArco(x, y, 160, 71, 8, 76)) pset(x, y, a_P.pL); }
  for (const ox of [142, 178]) { poligono([[ox - 2, 84], [ox + 3, 84], [ox + 1, 66], [ox, 66]], a_K); poligono([[ox - 1, 83], [ox + 2, 83], [ox + 1, 67], [ox, 67]], (x) => (x <= ox ? a_P.bzL : a_P.bzS)); }
}

// la balaustrada y el suelo del balcón (lo que tapa a la multitud de la plaza): pasamanos, balaustres torneados, zócalo
function a_balaustrada(R) {
  const { rect, pset } = R;
  rect(0, 110, 319, 115, a_K); rect(0, 111, 319, 112, a_P.pL); rect(0, 113, 319, 114, a_P.p); rect(0, 115, 319, 115, a_P.pD);
  for (let x = 0; x < 320; x++) if (h(x, 113, 95) > 0.9) pset(x, 113, a_P.pM);
  for (let x = 3; x < 320; x += 9) {
    for (let y = 116; y <= 127; y++) { const u = (y - 116) / 11, w = u < 0.15 ? 2 : u < 0.4 ? 3 : u < 0.55 ? 1 : u < 0.85 ? 3 : 2;
      rect(x - w, y, x + w, y, a_K); if (w > 0) { rect(x - w + 1, y, x + w - 1, y, a_P.p); pset(x - w + 1, y, a_P.pL); pset(x + w - 1, y, a_P.pS); } }
  }
  rect(0, 128, 319, 131, a_K); rect(0, 128, 319, 129, a_P.pM); rect(0, 128, 319, 128, a_P.pL); rect(0, 130, 319, 131, a_P.pS);
  // el suelo del balcón: losas en perspectiva con un mosaico de estrellas de ocho puntas (piedra, bronce y verde)
  const ZS = [132, 136, 141, 147, 154, 162, 171, 180];
  for (let y = 132; y < 180; y++) { const iz = ZS.findIndex((z, i) => y >= z && y < ZS[i + 1]), z0 = ZS[iz], z1 = ZS[iz + 1], v = (y - z0) / (z1 - z0), w = 16 + (y - 132) * 0.7;
    for (let x = 0; x < 320; x++) { const X = (x - 160) / w, ix = Math.floor(X), u = X - ix;
      let c = u < 0.06 || y === z0 ? a_P.pD : (ix + iz) % 2 ? a_P.pM : a_P.p;
      const du = Math.abs(u - 0.5), dv = Math.abs(v - 0.5), est = Math.min(du + dv, Math.max(du, dv) * 1.3);
      if (c !== a_P.pD && est < 0.22 && z1 - z0 > 4) c = est < 0.1 ? ((ix + iz) % 2 ? a_P.vd : a_P.bz) : (ix + iz) % 2 ? a_P.bzS : a_P.vdL;
      if (h(x, y, 96) > 0.975) c = a_P.pL; pset(x, y, c); } }
  // la sombra de la balaustrada (sus balaustres en el suelo) y la de la logia, fresca, en la parte de abajo
  for (let y = 132; y < 140; y++) for (let x = 0; x < 320; x++) if (((x + (y - 132) * 2) % 9) < 4) a_tinte(R, x, y, 0.3, a_P.pD);
  for (let y = 158; y < 180; y++) for (let x = 0; x < 320; x++) { const borde = 158 + Math.abs(Math.sin((x - 20) / 300 * Math.PI)) * 6; if (y > borde || (y > borde - 2 && (x + y) % 2)) a_tinte(R, x, y, 0.42, a_P.sD); }
  // dos cántaros de agua sobre el suelo del balcón, junto a la balaustrada
  for (const cx of [62, 258]) { R.disco(cx, 128, 5, a_K); R.disco(cx, 128, 4, (x) => (x < cx ? a_P.barroL : a_P.barro)); rect(cx - 2, 121, cx + 2, 124, a_P.barroS); rect(cx - 3, 120, cx + 3, 120, a_P.barroL); R.rect(cx - 4, 132, cx + 4, 133, a_P.pD); }
}
// la multitud de la plaza, vista desde arriba: filas de cabecitas (más pequeñas cuanto más lejos) con mantos de colores,
// brazos que se alzan en oleadas y saltos; banderolas en sus palos. a = 0–1 cuánto aclaman
function a_plaza(R, t, a) {
  const T = [a_P.t1, a_P.t2, a_P.t3, a_P.t4, a_P.t5, a_P.t6, a_P.t7, a_P.tap1], cab = [a_P.t5, a_P.t2, a_P.t7, a_P.piel, a_P.t1, a_P.pielS];
  for (let f = 0; f < 17; f++) {
    const u = f / 16, y = Math.round(80 + f * 1.85 + u * u * 4), s = u < 0.3 ? 1 : u < 0.65 ? 2 : 3, paso = s === 1 ? 2.6 : s === 2 ? 3.6 : 5, carril = 5 + (y - 76) * 0.45;
    for (let n = 0, x = -6 + (f % 2) * paso * 0.5; x < 326; x += paso, n++) {
      const r = h(n, f, 97), xx = Math.round(x + (r - 0.5) * paso * 0.7); if (Math.abs(xx - 160) < carril + s) continue;
      const ola = Math.sin(xx * 0.05 - t * 3.4 + f * 0.25), sube = ola > 0.92 - a * 1.5 || (a > 0.5 && r > 1.3 - a * 0.6);
      const sal = a > 0.25 && sube && Math.sin(t * 9 + r * 20) > 0.1 ? Math.max(1, s - 1) : 0, yy = y - sal + (r > 0.75 ? Math.round(Math.sin(t * 1.7 + r * 8) * 0.6) : 0);
      const col = T[Math.floor(r * 8)], colS = a_mezcla(col, a_K, 0.35), ca = cab[Math.floor(h(n, f, 98) * 6)];
      if (s === 1) { R.pset(xx, yy, ca); R.pset(xx, yy + 1, col); if (sube) R.pset(xx + 1, yy - 1, a_P.piel); continue; }
      R.rect(xx - 1, yy + 1, xx + s - 1, yy + s + 1, col); R.rect(xx + s - 1, yy + 2, xx + s - 1, yy + s + 1, colS);
      R.rect(xx, yy - s + 2, xx + s - 2, yy, ca); if (s === 3) { R.pset(xx - 1, yy - 1, ca); R.pset(xx + 1, yy - 2, a_mezcla(ca, a_P.pL, 0.3)); }
      if (sube) { for (let j = 1; j <= s; j++) { R.pset(xx - 2, yy + 1 - j, a_P.piel); R.pset(xx + s, yy + 1 - j, a_P.piel); }
        if (a > 0.3 && s === 3 && r > 0.55) { const ag = Math.round(Math.sin(t * 10 + r * 30) * 2); for (let j = 0; j < 6; j++) { R.pset(xx + s + Math.round(ag * j / 6), yy - s - j, j > 2 ? a_P.vdL : a_P.t6); if (j > 2) R.pset(xx + s + Math.round(ag * j / 6) + 1, yy - s - j + 1, a_P.vd); } } }
    }
    // los guardias que flanquean la avenida, quietos, con su lanza ceremonial
    if (f % 3 === 1) for (const d of [-1, 1]) { const gx = Math.round(160 + d * (carril + 1)); R.rect(gx, y - s, gx, y + s, a_P.t7); R.pset(gx, y - s - 1, a_P.t2); R.linea(gx + d, y + s, gx + d, y - s - 3, a_P.madS); }
    // las banderolas en sus palos, que se agitan (verde y negro, alguna roja de peregrino)
    if (f % 4 === 2) for (let k = 0; k < 4; k++) { const bx = Math.round(26 + k * 82 + h(k, f, 99) * 30), by = y - 5 - s * 4, ag = 1 + a; if (Math.abs(bx - 160) < carril + 4) continue;
      R.linea(bx, y, bx, by, a_P.madS); const col = [a_P.vd, a_P.ng, a_P.tap1, a_P.vdL][k];
      for (let j = 0; j < 3 + s; j++) for (let i = 1; i <= 4 + s * 2; i++) R.pset(bx + i, by + j + Math.round(Math.sin(i * 0.8 - t * 6 * ag + k) * 0.7), (i + j) % 6 === 0 ? a_P.bzL : col); }
  }
}
function a_aclaman(o, t) { const v = typeof o.aclaman === 'function' ? o.aclaman(t) : o.aclaman ?? 0; return Math.max(0, Math.min(1, v)); }
function a_balcon(R, t, o) {
  const a = a_aclaman(o, t);
  a_capa(R, 'balcon', () => a_balconFijo(R));
  const m = a_mascara('balcon', 47, (x, y) => { const c = R.pget(x, y); return y < 47; });
  a_cieloVivo(R, t, m, 4, 40);
  // el humo de los hornos y de los pebeteros de la ciudad, que sube y se tuerce
  for (const [sx, sy] of [[40, 66], [150, 62], [228, 66]]) for (let k = 0; k < 8; k++) { const u = (t * 0.25 + k / 8) % 1, x = Math.round(sx + Math.sin(u * 5 + k) * 2 + u * 10), y = Math.round(sy - u * 16); if ((k + Math.floor(t * 3)) % 3) R.pset(x, y, a_P.nu1); }
  // lucecitas de las ventanas que se encienden en la ciudad (lámparas de la tarde)
  for (let k = 0; k < 14; k++) { const x = Math.round(h(k, 1, 88) * 320), y = Math.round(58 + h(k, 2, 88) * 14); if (Math.sin(t * 0.8 + k * 1.7) > 0.2) R.pset(x, y, a_P.fuL); }
  a_plaza(R, t, a);
  a_capaEncima(R, 'balaustrada', 108, 179, () => a_balaustrada(R));
  return { encuadre: 'balcon', camara: 'general', suelo: 132, libre: [90, 230], balcon: { baranda: 110, horizonte: 46, plaza: [76, 112], lunas: [[196, 30, 6], [226, 22, 3]] } };
}
// la logia en primer término: la columna y la cortina recogida a la izquierda, y dos tinajas de bronce con plantas
function a_logia(R, t) {
  const { rect, pset, linea, poligono } = R;
  for (let y = 0; y < 180; y++) for (let x = 0; x <= 18; x++) { const u = x / 18; pset(x, y, x === 18 ? a_K : u < 0.3 ? a_P.sM : u < 0.7 ? a_P.sS : a_P.sD); }
  for (const yy of [60, 128]) { rect(0, yy, 20, yy + 3, a_P.bzS); rect(0, yy, 20, yy, a_P.bz); }
  // la cortina verde recogida, que el aire de la tarde mueve
  for (let y = 0; y < 150; y++) { const recog = y > 70 && y < 86 ? 3 : 0, w = y < 70 ? 5 + Math.round(y * 0.05) : y < 86 ? 3 : 6 - Math.round((y - 86) * 0.03), d = Math.round(Math.sin(t * 1.4 + y * 0.07) * (y > 86 ? 1.5 : 0.6));
    for (let i = 0; i <= w; i++) pset(19 + i + d - recog, y, i === w ? a_K : (i + Math.floor(y / 9)) % 3 === 0 ? a_P.vdS : i < 2 ? a_P.vdL : a_P.vd); }
  rect(18, 76, 26, 79, a_P.bz); rect(18, 76, 26, 76, a_P.bzL); pset(24, 81, a_P.bzL); pset(24, 82, a_P.bz);
  // las tinajas de bronce con plantas del desierto (hojas duras que se mecen)
  for (const [cx, w] of [[276, 13], [306, 11]]) {
    const top = 179 - Math.round(w * 2.6);
    for (let y = top; y <= 179; y++) { const v = (y - top) / (179 - top), ww = Math.round(v < 0.1 ? w * 0.75 : v < 0.2 ? w * 0.5 : v < 0.85 ? w * (0.55 + Math.sin((v - 0.2) / 0.65 * Math.PI) * 0.45) : w * 0.6);
      rect(cx - ww - 1, y, cx + ww + 1, y, a_K); for (let x = cx - ww; x <= cx + ww; x++) { const u = (x - cx + ww) / (2 * ww + 1); pset(x, y, v < 0.1 ? (y === top ? a_P.bzL : a_P.bz) : u < 0.22 ? a_P.bzL : u < 0.32 && (y % 3) ? a_P.luz : u > 0.75 ? a_P.bzS : (v > 0.45 && v < 0.5) ? a_P.bzD : a_P.bz); } }
    for (let x = cx - w + 3; x < cx + w - 2; x += 3) pset(x, top + Math.round(w * 1.4), a_P.bzL);
    for (let k = 0; k < 7; k++) { const an = -Math.PI / 2 + (k - 3) * 0.32 + Math.sin(t * 1.5 + k + cx) * 0.06, L = 14 + (k % 3) * 5; linea(cx, top, Math.round(cx + Math.cos(an) * L), Math.round(top + Math.sin(an) * L), k % 2 ? a_P.t6 : a_P.vdL); }
  }
}

function a_fachadaFijo(R) {
  const { rect, pset, linea, poligono } = R;
  a_cieloFijo(R, 0, 90);
  // las torres de viento de los lados, más lejos: sillares, rendijas para el aire y su remate
  for (const [x0, x1, top] of [[0, 30, 34], [290, 320, 60]]) { a_sillares(R, x0, top, x1, 150, [a_P.pM, a_P.pS, a_P.pS, a_P.pD, a_P.pJ], { alto: 5, ancho: 10, k: 101 + x0 });
    rect(x0, top - 4, x1, top, a_P.pM); rect(x0, top - 4, x1, top - 4, a_P.pL); for (let x = x0 + 3; x < x1 - 2; x += 5) { rect(x, top + 3, x + 1, top + 13, a_P.pK); pset(x, top + 3, a_P.pD); } }
  // la fachada enorme, en tres gradas que se estrechan hacia arriba (la vemos desde abajo), con su sombra bajo cada cornisa;
  // la grada de arriba, baja (cornisa en y 28): bajo la cifra del año (x 140–154, y 12–20) queda cielo limpio
  const GR = [[18, 302, 88, 150, 7, 16], [42, 278, 46, 88, 6, 14], [74, 246, 32, 46, 5, 12]];
  for (const [x0, x1, y0, y1, al, an] of GR) { const arriba = y0 === GR[2][2];
    a_sillares(R, x0, y0, x1, y1, [a_P.pL, a_P.p, a_P.pM, a_P.pS, a_P.pJ], { alto: al, ancho: an, k: 102 + y0 });
    // pilastras: franjas salientes con su luz a la izquierda y su sombra a la derecha
    for (let px = x0 + 14; px < x1 - 10; px += 38) { rect(px, y0, px + 5, y1, a_P.p); rect(px, y0, px, y1, a_P.pL); rect(px + 5, y0, px + 6, y1, a_P.pS); for (let y = y0 + 3; y < y1; y += 9) { pset(px + 2, y, a_P.bz); pset(px + 3, y, a_P.bzL); } }
    rect(x0 - 3, y0 - 4, x1 + 3, y0, a_K); rect(x0 - 2, y0 - 3, x1 + 2, y0 - 2, a_P.pL); rect(x0 - 2, y0 - 1, x1 + 2, y0 - 1, a_P.pM); for (let x = x0 - 1; x <= x1 + 1; x += 3) pset(x, y0, a_P.pD);
    for (let y = y0 + 1; y < y0 + 6; y++) for (let x = x0; x <= x1; x++) if ((x + y) % 2 === 0 || y < y0 + 3) a_tinte(R, x, y, 0.32, a_P.sD);
    rect(x0, y0, x0, y1, a_P.pL); rect(x1, y0, x1, y1, a_P.pS);
    // las almenas escalonadas del remate de cada grada
    for (let x = x0 - 2; x < x1; x += 8) { if (arriba && x > 108 && x < 208) continue;   // la grada de arriba, sin almenas bajo la cifra del año ni sobre el balcón
      rect(x, y0 - 8, x + 4, y0 - 4, a_K); rect(x + 1, y0 - 7, x + 3, y0 - 4, a_P.pM); pset(x + 1, y0 - 7, a_P.pL); rect(x + 2, y0 - 10, x + 2, y0 - 8, a_K); }
  }
  // las filas de ventanas apuntadas, con celosía y alféizar
  const vent = (cx, yb, a, al) => { for (let y = yb - al - 2; y <= yb; y++) for (let x = cx - a - 2; x <= cx + a + 2; x++) { if (a_enArco(x, y, cx, yb - al + a, a, yb)) pset(x, y, a_hueco(x, y, 3) && y < yb - 3 ? a_P.pS : a_P.sD); else if (a_enArco(x, y, cx, yb - al + a, a + 1, yb)) pset(x, y, x < cx ? a_P.pL : a_P.pD); } rect(cx - a - 2, yb + 1, cx + a + 2, yb + 2, a_P.pL); rect(cx - a - 2, yb + 2, cx + a + 2, yb + 2, a_P.pD); };
  for (let x = 30; x < 296; x += 19) if (Math.abs(x - 160) > 36) vent(x, 126, 4, 22);
  for (let x = 56; x < 270; x += 16) if (Math.abs(x - 160) > 40) vent(x, 80, 3, 16);
  // en la grada de arriba, tan baja, un friso de saeteras con su dintel y, entre ellas, rosetas de bronce
  for (let x = 84; x < 240; x += 12) { if (Math.abs(x - 160) < 18) continue; rect(x - 1, 35, x + 1, 41, a_P.pD); rect(x, 36, x, 40, a_P.sD); pset(x - 1, 35, a_P.pL); rect(x - 2, 34, x + 2, 34, a_P.pL); rect(x - 1, 41, x + 1, 41, a_P.pL);
    if (Math.abs(x + 6 - 160) > 18 && x + 6 < 240) { pset(x + 6, 37, a_P.bz); pset(x + 6, 38, a_P.bzS); pset(x + 5, 37, a_P.bzL); pset(x + 7, 38, a_P.pS); } }
  // la gran puerta apuntada del pie: hojas de bronce con clavos, el marco tallado
  for (let y = 80; y <= 150; y++) for (let x = 128; x <= 192; x++) { if (a_enArco(x, y, 160, 118, 22, 150)) pset(x, y, Math.abs(x - 160) < 1 ? a_P.bzD : ((x - 140) % 7 === 0 && y % 6 === 3) ? a_P.bzL : (y - 96) % 18 === 0 ? a_P.bzS : x < 160 ? (x < 146 ? a_P.bzL : a_P.bz) : a_P.bzS); else if (a_enArco(x, y, 160, 118, 25, 150)) pset(x, y, (x + y) % 3 ? a_P.pL : a_P.bz); else if (a_enArco(x, y, 160, 118, 27, 150)) pset(x, y, a_P.pD); }
  R.sprite(a_HALCON, 156, 94, { '#': a_P.bzL, '.': null });
  // el balcón: puerta en arco con la lámpara dentro, saliente sobre ménsulas (la balaustrada se pinta delante de la figura);
  // el arco asoma sobre la cornisa baja como un pabellón, con su guardapolvo y la clave de bronce (tope en y 24, a la
  // derecha de la cifra del año)
  for (let y = 23; y <= 46; y++) for (let x = 144; x <= 176; x++) { if (a_enArco(x, y, 160, 37, 9, 46)) pset(x, y, y > 37 ? a_P.sD : (x + y) % 2 ? a_P.sS : a_P.sD); else if (a_enArco(x, y, 160, 37, 11, 46)) pset(x, y, x < 160 ? a_P.pL : a_P.pS); else if (a_enArco(x, y, 160, 37, 12, 46)) pset(x, y, a_K); }
  rect(159, 25, 161, 27, a_K); pset(160, 26, a_P.bzL); pset(159, 26, a_P.bz); pset(161, 26, a_P.bzS);
  for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (Math.hypot(i, j) < 6 && (i + j) % 2 === 0) a_tinte(R, 160 + i, 37 + j, 0.35, a_P.fu);
  rect(122, 46, 198, 51, a_K); rect(123, 47, 197, 48, a_P.pL); rect(123, 49, 197, 51, a_P.pS);
  for (let x = 126; x < 196; x += 7) { poligono([[x, 51], [x + 5, 51], [x + 3, 60]], a_K); poligono([[x + 1, 51], [x + 4, 51], [x + 3, 58]], (px) => (px < x + 3 ? a_P.pL : a_P.pM)); }
  for (let y = 52; y < 64; y++) for (let x = 124; x < 198; x++) if ((x + y) % 2 === 0) a_tinte(R, x, y, 0.25, a_P.sD);
  // la tarde viene de la izquierda: la mitad derecha de la fachada, en una sombra suave
  for (let y = 0; y < 150; y++) for (let x = 200; x < 304; x++) { const f = (x - 200) / 104 * 0.55; if (f > a_b4(x, y)) a_tinte(R, x, y, 0.16, a_P.sD); }
  // la plaza al fondo de la multitud
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, ((x + Math.floor(y / 4) * 7) % 22 === 0 || y % 5 === 0) ? a_P.pS : a_P.pM);
  rect(0, 150, 319, 151, a_P.pD);
}
function a_fachada(R, t, o) {
  const a = a_aclaman(o, t), figura = o.figura ?? true;
  a_capa(R, 'fachada', () => a_fachadaFijo(R));
  const m = a_mascara('fachada', 92, (x, y) => { if (x >= 15 && x <= 305 && y >= 80) return false; if (x >= 39 && x <= 281 && y >= 38) return false; if (x >= 71 && x <= 249 && y >= 28) return false; if (y >= 22 && ((x >= 71 && x <= 108) || (x >= 208 && x <= 249))) return false; if (x >= 147 && x <= 173 && y >= 24) return false; if (x <= 30 && y >= 29) return false; if (x >= 290 && y >= 55) return false; return true; });
  a_cieloVivo(R, t, m, 4, 70);
  // los estandartes gigantes que cuelgan de la fachada y se mecen, y los dos pequeños junto al balcón
  a_estandarte(R, 82, 92, 22, 46, t, { simbolo: 'halcon', fase: 0.2, amp: 1.4 }); a_estandarte(R, 216, 92, 22, 46, t, { simbolo: 'corona', negro: true, fase: 1.4, amp: 1.4 });
  a_estandarte(R, 106, 52, 12, 26, t, { simbolo: 'halcon', fase: 2.2, amp: 0.9 }); a_estandarte(R, 202, 52, 12, 26, t, { simbolo: 'halcon', fase: 2.9, amp: 0.9 });
  // la figura diminuta del balcón (de fondo; la escena puede quitarla con o.figura false): saluda cuando aclaman
  if (figura) { const x = 160, y = 46; R.rect(x - 1, y - 7, x + 1, y - 1, a_P.ng); R.pset(x - 1, y - 7, a_P.ngL); R.pset(x, y - 8, a_P.piel); R.pset(x, y - 9, a_P.ng);
    const br = a > 0.15 ? (Math.floor(t * 3) % 2) : 0; R.pset(x + 2, y - 6 - br, a_P.piel); R.pset(x + 2, y - 5, a_P.ng); R.pset(x - 2, y - 5, a_P.ng); }
  // la balaustrada del balcón, delante de la figura
  R.rect(122, 40, 198, 42, a_K); R.rect(123, 40, 197, 41, a_P.pL); for (let x = 125; x < 197; x += 4) { R.rect(x, 43, x + 1, 46, a_P.p); R.pset(x + 1, 43, a_P.pS); }
  // la multitud del medio: filas apretadas de mantos y capuchas, más grandes cuanto más cerca, que se mecen y alzan los brazos
  const T = [a_P.t1, a_P.t2, a_P.t3, a_P.t4, a_P.t5, a_P.t6, a_P.t7, a_P.tap1];
  for (let f = 0; f < 8; f++) { const y = 124 + f * 4, s = 1.6 + f * 0.35, paso = 5 + f * 0.9;
    for (let n = 0, x = -8 + (f % 2) * paso * 0.5; x < 328; x += paso, n++) { const r = h(n, f, 103), ola = Math.sin(x * 0.04 - t * 3 + f * 0.5), sube = ola > 0.85 - a * 1.5 || (a > 0.5 && r > 1.3 - a * 0.6);
      const sal = a > 0.25 && sube && Math.sin(t * 8 + r * 20) > 0.2 ? 1 + (f >> 2) : 0, xx = Math.round(x + (r - 0.5) * paso * 0.9 + Math.sin(t * 1.3 + r * 7) * 0.6), yy = y - sal + Math.round(h(n, f, 105) * 4 - 1), col = T[Math.floor(r * 8)], colS = a_mezcla(col, a_K, 0.35);
      const w = Math.max(1, Math.round(s + (h(n, f, 106) - 0.5) * 1.2)), cap = h(n, f, 104) > 0.5;
      if (sube) for (const d of [-1, 1]) { R.linea(xx + d * w, yy + 2, xx + d * (w + 2), yy - w - 3, a_K); R.linea(xx + d * w, yy + 3, xx + d * (w + 1), yy - w - 2, a_P.piel); }
      R.rect(xx - w - 1, yy + 1, xx + w + 1, yy + 6 + w * 2, a_K); R.rect(xx - w, yy + 2, xx + w, yy + 6 + w * 2, col); R.rect(xx + w, yy + 3, xx + w, yy + 6 + w * 2, colS); R.rect(xx - w, yy + 2, xx - w, yy + 6 + w * 2, a_mezcla(col, a_P.pL, 0.2));
      R.disco(xx, yy - w + 1, w + 1, a_K); R.disco(xx, yy - w + 1, w + 0.3, cap ? (px) => (px > xx ? colS : col) : (px, py) => (py > yy - w ? a_P.piel : a_P.t2));
      if (cap) R.pset(xx, yy - 2 * w, a_mezcla(col, a_P.pL, 0.3)); }
    if (f === 2 || f === 5) for (let k = 0; k < 3; k++) { const bx = 40 + k * 112 + f * 7, by = y - 22, col = [a_P.vd, a_P.ng, a_P.tap1][k]; R.linea(bx, y + 4, bx, by, a_P.madS); R.pset(bx, by - 1, a_P.bzL);
      for (let j = 0; j < 7; j++) for (let i = 1; i < 12; i++) R.pset(bx + i, by + j + Math.round(Math.sin(i * 0.7 - t * 5 * (1 + a) + k) * 0.8), i === 11 || j === 0 ? a_mezcla(col, a_K, 0.3) : (i + j) % 7 === 0 ? a_P.bzL : col); }
  }
  return { encuadre: 'balcon', camara: 'multitud', suelo: 179, libre: [], balcon: { x: 160, y: 46, figura }, puerta: { x0: 138, x1: 182, y: 150 } };
}
// la multitud de primer término (delante de todo): cabezas con capucha y espaldas, brazos que se alzan con la ola
function a_multitudDelante(R, t, a) {
  const T = [a_P.t2, a_P.t1, a_P.t4, a_P.t3, a_P.t7, a_P.t6];
  for (let k = 0; k < 12; k++) { const x = -8 + k * 29 + Math.round(h(k, 1, 104) * 8), y = 160 + Math.round(h(k, 2, 104) * 8), col = T[k % 6], colS = a_mezcla(col, a_K, 0.35), r = h(k, 3, 104);
    const ola = Math.sin(x * 0.03 - t * 3) > 0.75 - a * 1.4, sal = a > 0.3 && ola && Math.sin(t * 8 + k) > 0.3 ? 2 : 0, yy = y - sal + Math.round(Math.sin(t * 1.2 + k) * 0.7);
    if (ola) for (const d of [-1, 1]) { const bx = x + d * 9, by = yy - 8; R.linea(x + d * 6, yy + 4, bx, by, a_K); R.linea(x + d * 6 + d, yy + 4, bx + d, by, a_K); R.linea(x + d * 6, yy + 5, bx - d, by + 1, col); R.disco(bx, by - 2, 2.2, a_K); R.disco(bx, by - 2, 1.5, a_P.piel); }
    R.disco(x, yy + 16, 12, a_K); R.disco(x, yy + 16, 11, (px, py) => (px < x - 5 ? a_mezcla(col, a_P.pL, 0.15) : px > x + 5 ? colS : col));
    R.disco(x, yy - 1, 7, a_K); R.disco(x, yy - 1, 6, (px, py) => (py < yy - 4 ? a_mezcla(col, a_P.pL, 0.2) : px > x + 2 ? colS : col));
    R.linea(x - 4, yy + 4, x + 4, yy + 4, colS); if (r > 0.6) R.pset(x + 1, yy - 3, a_mezcla(col, a_P.pL, 0.3)); }
}

const a_MAPA = (() => { const p = []; for (let k = 0; k < 18; k++) p.push([Math.round(30 + h(k, 1, 111) * 74), Math.round(34 + h(k, 2, 111) * 50)]); return p; })();

function a_aposentosFijo(R, cuna) {
  const { rect, pset, linea, poligono, disco } = R;
  const NOC = [a_P.sL, a_P.s, a_P.sM, a_P.sS, a_P.sJ];
  // el muro de sillares a la luz baja (luego la lámpara lo calienta) y las vigas de palmera del techo
  a_sillares(R, 0, 14, 319, 150, NOC, { alto: 8, ancho: 18, k: 121 });
  for (let y = 0; y < 14; y++) for (let x = 0; x < 320; x++) pset(x, y, y % 5 === 4 ? a_P.madS : ((x + Math.floor(y / 5) * 9) % 23 === 0 ? a_P.madS : (x + y) % 7 === 0 ? a_P.mad : a_P.sD));
  rect(0, 13, 319, 15, a_P.madS); rect(0, 13, 319, 13, a_P.mad);
  for (let x = 6; x < 320; x += 23) { rect(x, 14, x + 3, 17, a_K); rect(x + 1, 14, x + 2, 16, a_P.mad); pset(x + 1, 14, a_P.madL); }   // las cabezas de las vigas
  // manchas de humo de siglos y grietas finas en la piedra vieja
  for (let y = 16; y < 122; y++) for (let x = 0; x < 320; x++) { const n = Math.sin(x * 0.045 + Math.sin(y * 0.07) * 1.5) + Math.sin(x * 0.11 - y * 0.03); if (n > 1.15 && a_b4(x, y) < (n - 1.15) * 1.3) a_tinte(R, x, y, 0.2, a_P.sD); }
  for (const [gx, gy, L] of [[176, 34, 24], [234, 28, 18], [10, 92, 16], [304, 92, 22], [262, 54, 14]]) { let x = gx; for (let j = 0; j < L; j++) { const r = h(j, gx, 127); x += r > 0.65 ? 1 : r < 0.25 ? -1 : 0; pset(x, gy + j, a_P.sD); if (r > 0.9) pset(x + 1, gy + j, a_P.sD); } }
  // el zócalo de azulejos (y 122–142): moldura de madera y estrellas de ocho puntas en azul y oro sobre crema, gastadas
  rect(0, 121, 319, 124, a_K); rect(0, 122, 319, 122, a_P.madL); rect(0, 123, 319, 123, a_P.mad);
  for (let y = 125; y <= 142; y++) for (let x = 0; x < 320; x++) { const u = (x % 10) - 4.5, v = ((y - 125) % 9) - 4, d = Math.abs(u) + Math.abs(v), m = Math.max(Math.abs(u), Math.abs(v));
    pset(x, y, x % 10 === 0 || (y - 125) % 9 === 8 ? a_P.sJ : d < 2.2 ? a_P.tap2 : (d < 4.6 && m < 3.6) ? a_P.tap3 : h(x, y, 126) > 0.9 ? a_P.sM : a_mezcla(a_P.tap4, a_P.sM, 0.45)); }
  rect(0, 142, 319, 142, a_P.sD);
  // el mapa estelar: marco de bronce, campo azul de noche con nebulosa tramada, órbitas y estrellas
  rect(20, 24, 114, 94, a_K); rect(21, 25, 113, 93, a_P.bzS); rect(21, 25, 113, 25, a_P.bzL); rect(21, 25, 21, 93, a_P.bzL); rect(23, 27, 111, 91, a_K);
  for (let y = 28; y <= 90; y++) for (let x = 24; x <= 110; x++) { const n = Math.sin(x * 0.11 + y * 0.07) + Math.sin(x * 0.05 - y * 0.13) * 0.8; pset(x, y, n > 1.1 && a_b4(x, y) < 0.5 ? a_P.n3 : n > 0.5 && a_b4(x, y) < 0.4 ? a_P.n2 : a_P.n1); }
  for (const [cx, cy, r] of [[67, 59, 14], [67, 59, 26], [67, 59, 38]]) for (let k = 0; k < r * 6; k++) { const an = k / (r * 6) * Math.PI * 2, x = Math.round(cx + Math.cos(an) * r), y = Math.round(cy + Math.sin(an) * r * 0.6); if (k % 3 === 0 && x > 23 && x < 111 && y > 27 && y < 91) pset(x, y, a_P.n3); }
  for (let k = 0; k < 40; k++) pset(24 + Math.floor(h(k, 5, 112) * 86), 28 + Math.floor(h(k, 6, 112) * 62), k % 4 ? a_P.ci0 : a_P.luna);
  disco(67, 59, 3, a_P.esp); pset(66, 58, a_P.espL);   // Arrakis en el centro, naranja
  for (let i = 0; i < 4; i++) { pset(22 + i * 30, 26, a_P.bzL); pset(22 + i * 30, 92, a_P.bzL); }
  // la ventana alta en arco: lo de fuera va aparte (vivo), aquí el marco, el alféizar y la jamba profunda
  for (let y = 22; y <= 120; y++) for (let x = 124; x <= 172; x++) { if (a_enArco(x, y, 148, 50, 18, 118)) continue; if (a_enArco(x, y, 148, 50, 21, 120)) pset(x, y, x < 148 ? a_P.sL : a_P.sS); else if (a_enArco(x, y, 148, 50, 22, 120)) pset(x, y, a_P.sD); }
  rect(126, 118, 170, 121, a_K); rect(127, 118, 169, 119, a_P.sL); rect(127, 120, 169, 121, a_P.sS);
  // un cántaro pequeño y una planta en el alféizar
  disco(134, 114, 3.5, a_K); disco(134, 114, 2.6, a_P.barro); rect(133, 109, 135, 111, a_P.barroS); pset(133, 113, a_P.barroL);
  // el tapiz de colores del desierto: franjas, rombos y flecos
  for (let y = 26; y <= 104; y++) for (let x = 188; x <= 226; x++) { const u = x - 188, v = y - 26, d = Math.abs(((u + 6) % 13) - 6) + Math.abs((v % 13) - 6);
    let c = u === 0 || u === 38 ? a_K : u < 3 || u > 35 ? a_P.tap3 : v % 26 < 3 ? a_P.tap2 : d < 3 ? a_P.tap4 : d < 5 ? a_P.tap2 : d === 5 ? a_K : a_P.tap1;
    if (y > 100) c = (x % 2) ? a_P.tap2 : null; if (c != null) pset(x, y, c); }
  rect(185, 24, 229, 25, a_P.madS); disco(185, 24.5, 1.8, a_P.bz); disco(229, 24.5, 1.8, a_P.bz);
  // el muro de la derecha: la puerta entreabierta al pasillo (hueco x 252–290) y el pasillo con su antorcha
  for (let y = 80; y <= 150; y++) for (let x = 244; x <= 298; x++) { const dentro = a_enArco(x, y, 271, 108, 19, 150), marco = a_enArco(x, y, 271, 108, 23, 150);
    if (dentro) { const fondo = y < 140; pset(x, y, fondo ? (((y - 80) % 7 === 0 || (x + (Math.floor((y - 80) / 7) % 2) * 5) % 11 === 0) ? a_P.n2 : a_P.n3) : ((x + y) % 5 === 0 ? a_P.n2 : a_P.n3)); }
    else if (marco) pset(x, y, x < 271 ? a_P.sL : a_P.sS); }
  rect(252, 140, 290, 140, a_P.n1);
  // la hoja de la puerta, abierta hacia dentro (madera con tachones de bronce)
  poligono([[282, 98], [291, 92], [291, 154], [282, 150]], a_K); poligono([[283, 99], [290, 94], [290, 152], [283, 149]], (x, y) => ((y + x) % 9 === 0 ? a_P.bz : x < 285 ? a_P.madL : a_P.mad));
  // el diván bajo el mapa, con cojines de colores
  rect(34, 128, 116, 143, a_K); rect(35, 129, 115, 142, a_P.tap3); rect(35, 129, 115, 130, a_mezcla(a_P.tap3, a_P.luna, 0.25)); for (let x = 38; x < 114; x += 6) pset(x, 136, a_P.tap2);
  for (const [cx, col, dy] of [[45, a_P.tap1, 0], [64, a_P.tap2, 1], [84, a_P.vd, 0], [104, a_P.tap1, 2]]) { const y0 = 117 + dy;
    rect(cx - 8, y0 + 1, cx + 8, y0 + 12, a_K); rect(cx - 9, y0 + 2, cx + 9, y0 + 11, a_K); rect(cx - 8, y0 + 2, cx + 8, y0 + 11, col); rect(cx - 7, y0 + 2, cx + 7, y0 + 3, a_mezcla(col, a_P.luna, 0.3)); rect(cx - 8, y0 + 10, cx + 8, y0 + 11, a_mezcla(col, a_K, 0.35));
    for (let i = -6; i <= 6; i += 3) pset(cx + i, y0 + 6 + (i % 2), a_P.bz); pset(cx - 9, y0 + 1, a_P.bzL); pset(cx + 9, y0 + 1, a_P.bzL); pset(cx - 9, y0 + 12, a_P.bzL); pset(cx + 9, y0 + 12, a_P.bzL); }
  // el suelo de piedra y las alfombras (una grande con su orla)
  for (let y = 143; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, ((x + (y >> 3) * 11) % 24 === 0 || y % 9 === 0) ? a_P.sJ : (h(x, y, 122) > 0.95 ? a_P.sS : a_P.sM));
  for (let y = 150; y < 178; y++) for (let x = 26; x < 248; x++) { const bx = Math.min(x - 26, 247 - x, y - 150, 177 - y), d = Math.abs(((x - 26) % 20) - 10) + Math.abs(((y - 150) % 14) - 7) * 1.4;
    pset(x, y, bx === 0 ? a_K : bx < 3 ? a_P.tap2 : bx < 4 ? a_K : d < 3 ? a_P.tap4 : d < 6 ? a_P.tap3 : (x + y) % 11 === 0 ? a_P.alL : a_P.tap1); }
  for (let x = 28; x < 247; x += 3) { pset(x, 178, a_P.tap4); pset(x, 149, a_P.tap4); }
  // el pebetero pequeño del suelo, junto al diván
  rect(118, 140, 126, 146, a_K); rect(119, 141, 125, 145, a_P.bz); rect(119, 141, 125, 141, a_P.bzL);
  // la repisa bajo el mapa: rollos de pergamino apilados, un astrolabio de bronce y dos tarros
  rect(22, 104, 112, 106, a_K); rect(23, 104, 111, 104, a_P.madL); rect(23, 105, 111, 105, a_P.mad);
  for (const xx of [30, 102]) { linea(xx, 107, xx + 3, 111, a_P.madS); linea(xx + 1, 107, xx + 4, 111, a_P.madS); }
  for (const [rx, ry, L] of [[28, 101, 14], [31, 98, 12], [42, 101, 10], [34, 95, 9]]) { rect(rx, ry, rx + L, ry + 3, a_K); rect(rx + 1, ry + 1, rx + L - 1, ry + 2, a_P.tap4); rect(rx + 1, ry + 2, rx + L - 1, ry + 2, a_P.t1); pset(rx + L, ry + 1, a_P.tap1); pset(rx, ry + 1, a_P.t5); }
  disco(70, 97, 6, a_K); disco(70, 97, 5, a_P.bzS); for (let k = 0; k < 24; k++) { const an = k / 24 * Math.PI * 2; pset(Math.round(70 + Math.cos(an) * 4), Math.round(97 + Math.sin(an) * 4), k % 3 ? a_P.bz : a_P.bzL); }
  linea(66, 97, 74, 97, a_P.bzL); linea(70, 93, 70, 101, a_P.bz); pset(70, 97, a_P.fuL); rect(67, 102, 73, 103, a_K); rect(68, 102, 72, 102, a_P.bz);
  for (const [jx, jc] of [[88, a_P.barro], [98, a_P.vdL]]) { disco(jx, 99, 4, a_K); disco(jx, 99, 3, jc); rect(jx - 1, 93, jx + 1, 96, a_K); rect(jx, 94, jx, 96, jc); pset(jx - 1, 98, a_P.luna); }
  // la hornacina entre el tapiz y la puerta: el arco hondo en sombra, una lamparilla de barro (la llama va viva) y un tarro
  for (let y = 46; y <= 92; y++) for (let x = 227; x <= 249; x++) { if (a_enArco(x, y, 238, 62, 7, 90)) pset(x, y, y > 86 ? a_P.sS : ((x + y) % 2 ? a_P.sD : a_P.sJ)); else if (a_enArco(x, y, 238, 62, 9, 92)) pset(x, y, x < 238 ? a_P.sL : a_P.sS); }
  rect(228, 90, 248, 93, a_K); rect(229, 90, 247, 91, a_P.sL); rect(229, 92, 247, 92, a_P.sS);
  poligono([[232, 86], [242, 86], [240, 89], [234, 89]], a_K); rect(234, 86, 240, 88, a_P.barro); pset(234, 86, a_P.barroL); linea(242, 86, 244, 85, a_P.barroS);
  disco(237, 75, 3, a_K); disco(237, 75, 2, a_P.bz); pset(236, 74, a_P.bzL); rect(236, 70, 238, 72, a_K);
  // el candil de pared de la izquierda: brazo de bronce y vela (la llama va viva)
  rect(1, 60, 3, 68, a_K); rect(2, 61, 2, 67, a_P.bz); linea(3, 64, 9, 58, a_P.bzS); linea(3, 65, 9, 59, a_P.bz); rect(6, 55, 13, 58, a_K); rect(7, 56, 12, 57, a_P.bz); pset(7, 56, a_P.bzL);
  rect(8, 47, 11, 55, a_K); rect(9, 48, 10, 55, a_P.tap4); pset(9, 48, a_P.luna); pset(11, 52, a_P.tap4);
  // la gran jarra de agua de bronce junto a la puerta, sobre su peana
  rect(296, 146, 318, 150, a_K); rect(297, 146, 317, 148, a_P.madL); rect(297, 149, 317, 149, a_P.madS);
  disco(307, 134, 10, a_K); disco(307, 134, 9, (x, y) => (x < 302 ? a_P.bzL : x > 312 ? a_P.bzS : (y + x) % 7 === 0 ? a_P.bzL : a_P.bz)); rect(303, 117, 311, 125, a_K); rect(304, 118, 310, 125, a_P.bz); rect(304, 118, 305, 125, a_P.bzL); rect(301, 115, 313, 117, a_K); rect(302, 115, 312, 116, a_P.bzL);
  for (let x = 299; x <= 315; x += 2) pset(x, 134 + ((x >> 1) % 2), a_P.bzS); linea(313, 120, 317, 128, a_K); linea(314, 120, 317, 126, a_P.bzS);
  // las cunas
  if (cuna >= 1) a_cuna(R, 2, 150, 0, 0); if (cuna >= 2) a_cuna(R, 198, 150, 0, 1);
  // todo en penumbra azul: la noche
  { const P = R.buf; for (let i = 0; i < P.length; i++) { const y = (i / 320) | 0, x = i % 320; if (x >= 23 && x <= 111 && y >= 27 && y <= 91) continue; P[i] = a_mezcla(P[i], a_P.n1, 0.45); } }
  // el rayo de luna que entra por la ventana y se posa en el suelo y la alfombra con la forma del arco
  a_luzTramada(R, 126, 118, 240, 179, (x, y) => { const u = (y - 118) / 61, xc = 150 + u * 34, w = 15 + u * 5, d = Math.abs(x - xc) / w; return d < 1 ? (1 - d * d) * (y > 146 ? 1 : 0.35) : 0; }, a_P.luna, 0.2);
  // la luz de la lámpara de aceite sobre el muro y el suelo (cálida, tramada, hacia abajo)
  for (let y = 14; y < 180; y++) for (let x = 0; x < 250; x++) { const d = Math.hypot(x - 120, (y - 56) * 0.85) / 130; if (d < 1 && (1 - d) ** 1.1 > a_b4(x, y) * 0.7) a_tinte(R, x, y, 0.5 * (1 - d) ** 0.8, a_P.fu); }
  // el pasillo: la luz de la antorcha, fría y sola
  for (let y = 86; y < 150; y++) for (let x = 252; x <= 290; x++) if (a_enArco(x, y, 271, 108, 19, 150)) { const d = Math.hypot(x - 262, y - 112) / 40; if (d < 1 && (1 - d) > a_b4(x, y) + 0.1) a_tinte(R, x, y, 0.35 * (1 - d), a_P.fu); }
}
function a_aposentos(R, t, o) {
  const cuna = o.cuna ?? 0, mapa = Math.max(0, Math.min(1, o.mapa ?? 0));
  a_capa(R, `aposentos|${cuna}`, () => a_aposentosFijo(R, cuna));
  // por la ventana: el cielo de noche con estrellas que titilan, la luna grande, la ciudad lejana con luces
  R.recorte([128, 26, 168, 117]);
  const enV = (x, y) => a_enArco(x, y, 148, 50, 18, 117);
  for (let y = 24; y <= 117; y++) for (let x = 130; x <= 166; x++) if (enV(x, y)) { const u = (y - 24) / 93; R.pset(x, y, u < 0.45 ? a_P.n0 : u < 0.7 ? (a_b4(x, y) < (u - 0.45) * 4 ? a_P.n2 : a_P.n1) : a_P.n2); }
  for (let k = 0; k < 14; k++) { const x = 131 + Math.floor(h(k, 1, 123) * 35), y = 30 + Math.floor(h(k, 2, 123) * 50); if (enV(x, y) && Math.sin(t * 2 + k * 1.9) > -0.4) R.pset(x, y, k % 3 ? a_P.ci0 : a_P.luna); }
  R.disco(156, 46, 6, (x, y) => (enV(x, y) ? (x + y > 202 + 3 ? a_P.lunaS : a_P.luna) : null) ?? a_P.luna); R.pset(154, 44, a_P.lunaS); R.pset(157, 48, a_P.lunaS);
  R.disco(139, 58, 2, a_P.lunaS);
  for (let x = 130; x <= 166; x++) { const top = 92 + Math.round(h(x >> 2, 1, 124) * 10 + (Math.abs(x - 146) < 3 ? -12 : 0)); for (let y = top; y <= 117; y++) if (enV(x, y)) R.pset(x, y, y === top ? a_P.n3 : a_P.n0); }
  for (let k = 0; k < 10; k++) { const x = 131 + Math.floor(h(k, 3, 125) * 35), y = 98 + Math.floor(h(k, 4, 125) * 18); if (enV(x, y) && R.pget(x, y) === a_P.n0 && Math.sin(t * 0.9 + k * 2.3) > -0.2) R.pset(x, y, a_P.fu); }
  // jirones de nube que pasan por delante de la luna, a dos velocidades, y un murciélago de vez en cuando
  for (let k = 0; k < 3; k++) { const v = 2.2 + k * 1.3, L = 12 + k * 4, cx = 122 + ((t * v + k * 23) % 58), cy = 40 + k * 11;
    for (let i = 0; i < L; i++) for (let j = 0; j < 2; j++) { const x = Math.round(cx + i), y = cy + j + Math.round(Math.sin(i * 0.5 + k) * 0.6); if (enV(x, y) && (j === 0 || (i > 2 && i < L - 3)) && (x + y) % (k === 2 ? 2 : 1) === 0) R.pset(x, y, j ? a_P.n3 : k === 0 ? a_P.ci0 : a_P.n3); } }
  { const f = (t % 9) / 9; if (f < 0.4) { const x = Math.round(170 - f / 0.4 * 44), y = Math.round(66 + Math.sin(f * 30) * 4), al = Math.floor(t * 12) % 2; for (const [i, j] of [[0, 0], [-1, -al], [-2, -1 + al], [1, -al], [2, -1 + al]]) if (enV(x + i, y + j)) R.pset(x + i, y + j, a_K); } }
  // los barrotes de la ventana y su sombra
  for (const bx of [140, 156]) R.linea(bx, 34, bx, 117, a_P.sD); R.linea(130, 76, 166, 76, a_P.sD);
  R.recorte(null);
  // la banderola del halcón entre la ventana y el tapiz, que se mece con el aire de la ventana
  a_estandarte(R, 174, 32, 9, 42, t, { simbolo: 'halcon', fase: 0.7, amp: 0.8 });
  // la vela del candil y la lamparilla de la hornacina: llamas que tiemblan y su halo
  for (const [fx, fy, r] of [[9.5, 46, 7], [237, 85, 6]]) { const a = 2 + Math.round((Math.sin(t * 11 + fx) + 1) * 1.2);
    for (let j = 0; j < a; j++) R.pset(Math.round(fx + Math.sin(t * 13 + j + fx) * 0.5), fy - j, j === 0 ? a_P.fuL : j < a - 1 ? a_P.fu : a_P.fuS);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / (r + Math.sin(t * 9 + fx)); if (d < 1 && (i + j) % 2 === 0 && (1 - d) > a_b4(Math.round(fx) + i, fy + j) + 0.2) a_tinte(R, Math.round(fx) + i, fy + j, 0.3, a_P.fu); } }
  // las motas que flotan en el rayo de luna, y el brillo que corre por la jarra
  a_polvo(R, t, 140, 120, 22, 56, 0.56, 12, 17, a_P.lunaS);
  R.pset(300 + Math.round((Math.sin(t * 0.8) + 1) * 2), 130 + Math.round(Math.sin(t * 0.8) * 2), a_P.fuL);
  // la cortina de gasa de la ventana, que se mueve con el aire de la noche
  for (let y = 30; y < 118; y++) { const d = Math.round(Math.sin(t * 1.2 + y * 0.08) * 1.5 + Math.sin(t * 0.7) * 1); for (let i = 0; i < 4; i++) { const x = 127 + i + d; if ((x + y) % 2 === 0 || i < 2) a_tinte(R, x, y, 0.4, a_P.luna); } }
  // el mapa: los planetas encendidos y los que se apagan uno a uno (el último en apagarse brilla rojo un instante)
  const nOff = mapa * a_MAPA.length, puntos = [];
  a_MAPA.forEach(([x, y], k) => { const on = k >= nOff, f = nOff - k; puntos.push({ x, y, on });
    if (on) { const p = Math.sin(t * 3 + k) > 0 ? a_P.fuL : a_P.luna; R.pset(x, y, p); R.pset(x - 1, y, a_P.agL); R.pset(x + 1, y, a_P.agL); R.pset(x, y - 1, a_P.agL); R.pset(x, y + 1, a_P.agL); }
    else if (f < 1) { R.pset(x, y, a_P.fuS); R.pset(x - 1, y, a_P.tap1); R.pset(x + 1, y, a_P.tap1); }
    else R.pset(x, y, a_P.n3); });
  // la lámpara de aceite colgada: cadenas, cuerpo de bronce calado, la llama que tiembla y su halo
  R.linea(120, 15, 120, 34, a_P.bzS); for (let y = 16; y < 34; y += 2) R.pset(120, y, a_P.bz);
  R.poligono([[112, 34], [129, 34], [125, 43], [116, 43]], a_K); R.poligono([[113, 35], [128, 35], [124, 42], [117, 42]], (x, y) => ((x + y) % 3 === 0 ? a_P.fu : x < 119 ? a_P.bzL : a_P.bz));
  const fl = Math.sin(t * 13) + Math.sin(t * 7.3) * 0.6, fa = 3 + Math.round(fl);
  for (let j = 0; j < fa + 2; j++) R.pset(120 + Math.round(Math.sin(t * 9 + j) * 0.6), 33 - j, j < 2 ? a_P.fuL : j < fa ? a_P.fu : a_P.fuS);
  for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) { const d = Math.hypot(i, j) / (10 + fl); if (d < 1 && (i + j) % 2 === 0 && (1 - d) > a_b4(120 + i, 30 + j) + 0.15) a_tinte(R, 120 + i, 30 + j, 0.25, a_P.fuL); }
  // la mariposa nocturna que da vueltas a la lámpara
  { const an = t * 2.6, x = Math.round(120 + Math.cos(an) * 12), y = Math.round(36 + Math.sin(an * 1.3) * 6), al = Math.floor(t * 14) % 2; R.pset(x, y, a_P.t5); R.pset(x - 1, y - al, a_P.t1); R.pset(x + 1, y - al, a_P.t1); }
  // el humo del pebetero del suelo
  for (let k = 0; k < 10; k++) { const u = (t * 0.3 + k / 10) % 1, x = Math.round(122 + Math.sin(u * 6 + k + t) * (1 + u * 5)), y = Math.round(138 - u * 40); if ((k + Math.floor(t * 6)) % 3) R.pset(x, y, a_P.n3); }
  R.pset(121, 139, Math.sin(t * 5) > 0 ? a_P.fuL : a_P.fu); R.pset(123, 139, a_P.fu);
  // la antorcha del pasillo, que tiembla
  R.rect(259, 112, 261, 120, a_P.madS); R.rect(258, 110, 262, 111, a_P.bz);
  for (let k = 0; k < 3; k++) { const a = 3 + Math.round((Math.sin(t * 10 + k * 2) + 1) * 1.5); for (let j = 0; j < a; j++) R.pset(259 + k + Math.round(Math.sin(t * 12 + j + k) * 0.6), 108 - j, j < 2 ? a_P.fuL : j < 3 ? a_P.fu : a_P.fuS); }
  // el tapiz se mece un poco en los flecos
  for (let x = 188; x <= 226; x += 2) R.pset(x + Math.round(Math.sin(t * 1.5 + x * 0.3) * 0.7), 106, a_P.tap2);
  const cunaD = cuna ? [{ x: 2, w: 26, suelo: 150 }, { x: 198, w: 26, suelo: 150 }].slice(0, cuna) : undefined;
  return { encuadre: 'aposentos', camara: 'general', suelo: 150, libre: [34, 240], mapa: puntos, cuna: cunaD, ventana: { x0: 130, x1: 166, y0: 30, y1: 118, alfeizar: 118 }, puerta: { x0: 252, x1: 290, y0: 96, y1: 150, libre: [256, 276] }, lampara: [120, 30] };
}
function a_cocinaFijo(R) {
  const { rect, pset, linea, poligono, disco } = R;
  // muros de sillares enlucidos (cálidos), con el enlucido caído aquí y allá
  a_sillares(R, 0, 0, 319, 150, [a_P.pL, a_P.p, a_P.pM, a_P.pS, a_P.pJ], { alto: 7, ancho: 16, k: 131 });
  for (let y = 0; y < 150; y++) for (let x = 0; x < 120; x++) { const d = Math.hypot(x - 52, (y - 40) * 1.4) / 80; if (d < 1 && (1 - d) * 0.8 > a_b4(x, y)) a_tinte(R, x, y, 0.22, a_P.pK); }
  for (let y = 0; y < 12; y++) for (let x = 0; x < 320; x++) if (a_b4(x, y) > y / 12) a_tinte(R, x, y, 0.3, a_P.sD);
  // el zócalo de azulejos detrás de la mesa (y 110–149): moldura de barro y rombos verdes y de oro sobre crema, gastados
  rect(100, 108, 319, 111, a_K); rect(100, 109, 319, 109, a_P.barroL); rect(100, 110, 319, 110, a_P.barro);
  for (let y = 112; y < 150; y++) for (let x = 100; x < 320; x++) { const u = (x - 100) % 9, v = (y - 112) % 9, d = Math.abs(u - 4) + Math.abs(v - 4);
    pset(x, y, u === 8 || v === 8 ? a_P.pJ : d < 2 ? a_P.bzL : d < 4 ? (h(x >> 3, y >> 3, 138) > 0.85 ? a_P.ag : a_P.vdL) : h(x, y, 139) > 0.93 ? a_P.pM : a_P.pL); }
  for (let y = 112; y < 150; y++) for (let x = 100; x < 320; x++) if (Math.sin(x * 0.07) + Math.sin(x * 0.023 + 1) > 1.3 && a_b4(x, y) < (y - 112) / 60) a_tinte(R, x, y, 0.22, a_P.pK);   // churretes de grasa y humo
  // la barra de los utensilios bajo la ventanita (los cazos cuelgan vivos) y la hornacina del candil, a la derecha
  rect(218, 86, 256, 88, a_K); rect(219, 87, 255, 87, a_P.bzS); for (const xx of [218, 256]) { rect(xx - 1, 85, xx + 1, 89, a_K); pset(xx, 86, a_P.bzL); }
  for (let y = 50; y <= 92; y++) for (let x = 280; x <= 306; x++) { if (a_enArco(x, y, 293, 66, 9, 88)) pset(x, y, y > 84 ? a_P.pS : (x + y) % 2 ? a_P.pD : a_P.pS); else if (a_enArco(x, y, 293, 66, 11, 90)) pset(x, y, x < 293 ? a_P.pL : a_P.pS); }
  rect(281, 88, 305, 91, a_K); rect(282, 88, 304, 89, a_P.pL); rect(282, 90, 304, 90, a_P.pS);
  poligono([[287, 84], [298, 84], [296, 87], [289, 87]], a_K); rect(289, 84, 296, 86, a_P.barro); pset(289, 84, a_P.barroL); linea(298, 84, 300, 83, a_P.barroS);
  // el fogón de piedra con dos bocas encendidas y la campana de la chimenea
  rect(6, 96, 98, 150, a_K); a_sillares(R, 7, 97, 97, 150, [a_P.pL, a_P.pM, a_P.pS, a_P.pS, a_P.pD], { alto: 6, ancho: 12, k: 133 });
  rect(4, 92, 100, 97, a_K); rect(5, 93, 99, 95, a_P.pL); rect(5, 96, 99, 96, a_P.pS);
  for (const cx of [30, 72]) for (let y = 104; y <= 140; y++) for (let x = cx - 14; x <= cx + 14; x++) { if (a_enArco(x, y, cx, 120, 10, 140)) pset(x, y, y > 132 ? a_P.fuS : a_P.pK); else if (a_enArco(x, y, cx, 120, 12, 140)) pset(x, y, a_P.pD); }
  poligono([[0, 40], [104, 40], [94, 86], [10, 86]], a_K); poligono([[1, 41], [103, 41], [93, 85], [11, 85]], (x, y) => (y % 9 === 0 ? a_P.pS : x < 30 ? a_P.pL : x > 80 ? a_P.pS : a_P.p));
  a_sillares(R, 0, 41, 104, 85, [a_P.pL, a_P.p, a_P.pM, a_P.pS, a_P.pJ], { alto: 6, ancho: 14, k: 139, dentro: (x, y) => x > 1 + (y - 41) * 10 / 44 && x < 103 - (y - 41) * 10 / 44 });
  a_sillares(R, 30, 0, 76, 40, [a_P.pM, a_P.pS, a_P.pS, a_P.pD, a_P.pJ], { alto: 6, ancho: 12, k: 140 }); rect(29, 0, 29, 40, a_K); rect(77, 0, 77, 40, a_K);
  for (let y = 41; y < 86; y++) for (let x = 0; x < 104; x++) { const d = Math.abs(x - 52) / 50 + (85 - y) / 90; if (R.pget(x, y) !== a_K && d < 0.9 && (0.9 - d) > a_b4(x, y) + 0.2) a_tinte(R, x, y, 0.35, a_P.pK); }
  rect(14, 62, 90, 65, a_K); rect(15, 63, 89, 64, a_P.bz); for (let x = 16; x < 89; x += 4) pset(x, 63, a_P.bzL);
  for (const [lx, l] of [[18, 12], [86, 10]]) { linea(lx, 66, lx, 66 + l, a_P.bzS); R.disco(lx, 68 + l, 2, a_P.bzS); }
  rect(8, 84, 96, 88, a_K); rect(9, 85, 95, 86, a_P.pL); rect(9, 87, 95, 87, a_P.pD); for (let x = 12; x < 94; x += 8) { rect(x, 85, x + 1, 86, a_P.madS); }
  for (let y = 0; y < 41; y++) rect(30, y, 76, y, y % 6 === 0 ? a_P.pS : a_P.pM);
  // ollas de cobre colgadas de la campana
  for (const [ox, oy] of [[22, 78], [52, 76], [82, 78]]) { linea(ox, 86, ox, oy + 6, a_K); disco(ox, oy + 10, 5, a_K); disco(ox, oy + 10, 4, (x) => (x < ox ? a_P.bzL : a_P.barro)); }
  // los estantes de madera con tarros, ollas de barro y cuencos
  for (const [y, x0, x1] of [[58, 118, 210], [84, 118, 210]]) { rect(x0, y, x1, y + 3, a_K); rect(x0 + 1, y + 1, x1 - 1, y + 1, a_P.madL); rect(x0 + 1, y + 2, x1 - 1, y + 2, a_P.mad); for (const xx of [x0 + 6, x1 - 6]) { linea(xx, y + 4, xx + 4, y + 10, a_P.madS); }
    for (let x = x0 + 4, k = 0; x < x1 - 8; k++) { const tipo = h(k, y, 134), w = 6 + Math.round(tipo * 6), hh = 8 + Math.round(h(k, y, 135) * 8);
      if (tipo < 0.4) { disco(x + w / 2, y - hh / 2, w / 2 + 0.5, a_K); disco(x + w / 2, y - hh / 2, w / 2 - 0.3, (px) => (px < x + w / 2 - 1 ? a_P.barroL : a_P.barro)); rect(x + w / 2 - 1, y - hh, x + w / 2 + 1, y - hh + 2, a_P.barroS); }
      else if (tipo < 0.7) { rect(x, y - hh, x + w, y - 1, a_K); rect(x + 1, y - hh + 1, x + w - 1, y - 1, tipo < 0.55 ? a_P.esp : a_P.datil); rect(x + 1, y - hh + 1, x + w - 1, y - hh + 2, a_P.t5); pset(x + 1, y - hh + 4, a_P.pL); }
      else { rect(x, y - 4, x + w, y - 1, a_K); rect(x + 1, y - 4, x + w - 1, y - 2, a_P.p); rect(x + 1, y - 4, x + w - 1, y - 4, a_P.pL); }
      x += w + 3; } }
  // ristras de dátiles y manojos de hierbas secas colgados de una viga
  rect(100, 18, 260, 21, a_K); rect(100, 19, 260, 20, a_P.mad); rect(100, 19, 260, 19, a_P.madL);
  // la ventanita en arco con la tarde, su marco y su alféizar (lo de fuera va vivo)
  for (let y = 34; y <= 78; y++) for (let x = 216; x <= 256; x++) { if (a_enArco(x, y, 236, 52, 14, 74)) continue; if (a_enArco(x, y, 236, 52, 17, 76)) pset(x, y, x < 236 ? a_P.pL : a_P.pS); }
  rect(218, 74, 254, 77, a_K); rect(219, 74, 253, 75, a_P.pL); rect(219, 76, 253, 77, a_P.pS);
  // los cántaros grandes de agua, con su tapa y el paño
  for (const [cx, r] of [[272, 14], [302, 12]]) { disco(cx, 150 - r, r, a_K); disco(cx, 150 - r, r - 1, (x, y) => (x < cx - r * 0.4 ? a_P.barroL : x > cx + r * 0.4 ? a_P.barroS : a_P.barro)); rect(cx - 5, 150 - 2 * r - 6, cx + 5, 150 - 2 * r + 2, a_K); rect(cx - 4, 150 - 2 * r - 5, cx + 4, 150 - 2 * r + 1, a_P.barro); rect(cx - 6, 150 - 2 * r - 8, cx + 6, 150 - 2 * r - 6, a_P.madS); rect(cx - 6, 150 - 2 * r - 8, cx + 6, 150 - 2 * r - 8, a_P.madL);
    for (let i = -r + 3; i < r - 2; i += 5) pset(cx + i, 150 - r + ((i * 3) % 7), a_P.barroS); }
  // las cestas de dátiles y de especia, en el suelo
  for (const [cx, col, colL] of [[230, a_P.datil, a_P.datilL], [252, a_P.esp, a_P.espL]]) { rect(cx - 9, 138, cx + 9, 150, a_K); for (let y = 139; y < 150; y++) for (let x = cx - 8; x <= cx + 8; x++) pset(x, y, (x + y) % 3 === 0 ? a_P.madS : (x - y) % 4 === 0 ? a_P.madL : a_P.mad);
    disco(cx, 138, 8, (x, y) => (y > 138 ? null : h(x, y, 136) > 0.6 ? colL : col) ?? col); rect(cx - 8, 138, cx + 8, 139, a_P.madL); }
  // el suelo de barro cocido
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const w = 16 + (y - 150) * 0.5; pset(x, y, ((x + (Math.floor((y - 150) / 6) % 2) * 8) % Math.round(w) === 0 || (y - 150) % 6 === 0) ? a_P.barroS : h(x, y, 137) > 0.94 ? a_P.barroL : a_P.barro); }
  rect(0, 150, 319, 151, a_P.barroS);
  // la estera de palma bajo la mesa, los sacos de grano y la escoba apoyada en el fogón
  for (let y = 162; y < 179; y++) for (let x = 104; x < 248; x++) { const b = Math.min(x - 104, 247 - x, y - 162, 178 - y); pset(x, y, b === 0 ? a_P.madS : ((x + (y >> 1)) % 4 < 2) !== ((y >> 1) % 2 === 0) ? a_P.du : a_P.duS); }
  for (const [sx, sw] of [[104, 9], [114, 8]]) { R.disco(sx, 143, sw * 0.8, a_K); rect(sx - sw + 1, 142, sx + sw - 1, 150, a_K); R.disco(sx, 143, sw * 0.8 - 1, a_P.t5); rect(sx - sw + 2, 143, sx + sw - 2, 149, a_P.t5); rect(sx + sw - 3, 143, sx + sw - 2, 149, a_P.t1); rect(sx - 2, 136, sx + 2, 137, a_P.madS); }
  // la leña apilada delante del fogón
  for (let k = 0; k < 9; k++) { const lx = 10 + (k % 4) * 9 + (k >= 4 ? 4 : 0) + (k >= 7 ? 4 : 0), ly = 172 - Math.floor(k / 4) * 7 - (k >= 7 ? 0 : 0); R.disco(lx, ly, 4, a_K); R.disco(lx, ly, 3.2, a_P.madL); pset(lx, ly, a_P.mad); pset(lx - 1, ly - 1, a_P.mad); R.anillo && pset(lx + 1, ly + 1, a_P.madS); }
  rect(4, 176, 50, 177, a_P.barroS);
  linea(100, 100, 96, 150, a_P.madS); linea(101, 100, 97, 150, a_P.madL); R.poligono([[93, 136], [99, 136], [101, 151], [90, 151]], (x, y) => ((x + y) % 2 ? a_P.du : a_P.duS));
  // el haz de luz de la tarde que entra por la ventanita y cae en el suelo
  a_luzTramada(R, 120, 52, 260, 179, (x, y) => { const u = (y - 52) / 120, xc = 236 - u * 90, w = 10 + u * 12, d = Math.abs(x - xc) / w; return d < 1 && y > 60 ? (1 - d) * 0.8 : 0; }, a_P.luz, 0.22);
}
function a_cocina(R, t, o) {
  a_capa(R, 'cocina', () => a_cocinaFijo(R));
  // por la ventanita: el cielo de la tarde, una duna y una palmera lejana
  R.recorte([222, 34, 250, 73]);
  for (let y = 30; y <= 73; y++) for (let x = 222; x <= 250; x++) if (a_enArco(x, y, 236, 52, 14, 73)) { const u = (y - 30) / 43; R.pset(x, y, u > 0.72 ? (Math.sin(x * 0.2 + y) > 0.6 ? a_P.duL : a_P.du) : u > 0.5 ? (a_b4(x, y) < 0.5 ? a_P.ci4 : a_P.ci3) : u > 0.3 ? a_P.ci3 : a_P.ci2); }
  { const nx = Math.round(222 + ((t * 2) % 40) - 6); for (let i = 0; i < 8; i++) R.pset(nx + i, 44, a_P.nu0); for (let i = 1; i < 6; i++) R.pset(nx + i, 45, a_P.nu1); }
  R.disco(244, 56, 2.5, a_P.fuL);
  { const f = (t % 7) / 7; if (f < 0.5) { const x = Math.round(252 - f * 64), y = Math.round(48 + Math.sin(f * 20) * 2), al = Math.floor(t * 10) % 2; R.pset(x, y, a_K); R.pset(x - 1, y - al, a_K); R.pset(x + 1, y - al, a_K); } }   // un pájaro que pasa
  for (const bx of [229, 243]) R.linea(bx, 40, bx, 73, a_P.pD); R.linea(222, 60, 250, 60, a_P.pD);
  R.recorte(null);
  // los cazos, el colador y la espumadera que cuelgan de su barra y se mecen un poco
  [[224, 14, 'cazo'], [234, 12, 'colador'], [244, 16, 'cuchara'], [252, 11, 'cazo']].forEach(([cx, L, tipo], k) => { const d = Math.sin(t * 1.1 + k * 1.7) * 0.9, ex = Math.round(cx + d);
    R.linea(cx, 88, ex, 88 + L, a_P.bzS); R.pset(cx, 89, a_P.bzL);
    if (tipo === 'cazo') { R.disco(ex, 91 + L, 3.5, a_K); R.disco(ex, 91 + L, 2.6, (x) => (x < ex ? a_P.bzL : a_P.barro)); }
    else if (tipo === 'colador') { R.disco(ex, 91 + L, 4.5, a_K); R.disco(ex, 91 + L, 3.6, (x, y) => ((x + y) % 2 ? a_P.bz : a_P.bzS)); }
    else { R.rect(ex - 2, 88 + L, ex + 2, 91 + L, a_K); R.rect(ex - 1, 88 + L, ex + 1, 90 + L, a_P.mad); } });
  // la llama del candil de la hornacina y su halo
  { const a = 2 + Math.round((Math.sin(t * 10) + 1) * 1.2); for (let j = 0; j < a; j++) R.pset(292 + Math.round(Math.sin(t * 12 + j) * 0.5), 83 - j, j === 0 ? a_P.fuL : j < a - 1 ? a_P.fu : a_P.fuS);
    for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j) / 7; if (d < 1 && (i + j) % 2 === 0 && (1 - d) > a_b4(292 + i, 80 + j) + 0.2) a_tinte(R, 292 + i, 80 + j, 0.28, a_P.fuL); } }
  // la salamanquesa que cruza el muro bajo los estantes, se para y sigue
  { const f = (t % 11) / 11, x = Math.round(212 - Math.min(1, f * 1.6) * 100), y = 100 + Math.round(Math.sin(f * 9) * 2), pata = Math.floor(t * 8) % 2;
    if (f < 0.75) { for (let i = 0; i < 5; i++) R.pset(x + i, y, i === 0 ? a_P.vdS : a_P.vdL); R.pset(x - 1, y, a_P.vd); R.pset(x, y - 1, a_K);
      for (let i = 5; i < 9; i++) R.pset(x + i, y + Math.round(Math.sin(i + t * 4) * 0.6), a_P.vd); R.pset(x + 1, y - 1 - pata, a_P.vd); R.pset(x + 1, y + 1 + pata, a_P.vd); R.pset(x + 4, y - 2 + pata, a_P.vd); R.pset(x + 4, y + 2 - pata, a_P.vd); } }
  // una mosca que ronda el plato de dátiles
  { const an = t * 5.3, x = Math.round(210 + Math.cos(an) * 9 + Math.sin(an * 2.3) * 3), y = Math.round(124 + Math.sin(an * 1.4) * 5); R.pset(x, y, a_K); if (Math.floor(t * 20) % 2) R.pset(x, y - 1, a_P.lunaS); }
  // el fuego de las dos bocas del fogón, que baila, y el vapor de la olla
  for (const cx of [30, 72]) for (let k = 0; k < 6; k++) { const fx = cx - 6 + k * 2 + Math.round(Math.sin(t * 9 + k) * 0.6), a = 3 + Math.round((Math.sin(t * 11 + k * 1.7 + cx) + 1) * 2.5);
    for (let j = 0; j < a; j++) R.pset(fx, 136 - j, j < 2 ? a_P.fuL : j < a - 1 ? a_P.fu : a_P.fuS); }
  R.rect(58, 84, 86, 92, a_K); R.rect(59, 85, 85, 91, a_P.pK); R.rect(60, 82, 84, 84, a_K); R.rect(61, 82, 83, 83, a_P.pD);
  R.rect(22, 85, 40, 92, a_K); R.rect(23, 85, 39, 91, a_P.barro); R.rect(23, 85, 39, 86, a_P.barroL);
  for (let k = 0; k < 12; k++) { const u = (t * 0.45 + k / 12) % 1, x = Math.round(31 + Math.sin(u * 6 + k + t * 1.5) * (2 + u * 6)), y = Math.round(84 - u * 34); if ((k + Math.floor(t * 7)) % 4) { R.pset(x, y, a_P.pL); if (u < 0.5) R.pset(x + 1, y, a_P.luz); } }
  // las ristras de dátiles y las hierbas, que se mecen
  for (let k = 0; k < 6; k++) { const x0 = 112 + k * 26, L = 14 + (k % 3) * 6, d = Math.sin(t * 1.3 + k) * 1.2;
    for (let j = 0; j < L; j++) { const x = Math.round(x0 + d * j / L); if (k % 2) { R.pset(x, 22 + j, a_P.t6); if (j % 3 === 0) { R.pset(x - 1, 22 + j, a_P.vdL); R.pset(x + 1, 22 + j, a_P.t6); } } else { R.pset(x, 22 + j, a_P.madS); if (j % 3 === 1) { R.pset(x - 1, 22 + j, a_P.datil); R.pset(x + 1, 22 + j, a_P.datilL); } } } }
  // las gotas que resbalan por los cántaros (el agua fresca)
  for (const [cx, r] of [[272, 14], [302, 12]]) for (let k = 0; k < 3; k++) { const u = (t * 0.2 + k / 3 + cx * 0.01) % 1; R.pset(cx - r + 5 + k * 7, Math.round(150 - 2 * r + 4 + u * r * 1.4), a_P.agL); }
  // el ratón del desierto que salta por el estante de arriba (y se para a mirar)
  { const f = (t % 8) / 8, x = Math.round(120 + f * 86), sal = f < 0.85 ? Math.abs(Math.sin(f * 40)) * 4 : 0, y = Math.round(57 - sal);
    const cuerpo = [[0, 0], [1, 0], [2, 0], [1, -1], [2, -1], [3, -1]]; for (const [i, j] of cuerpo) R.pset(x + i, y + j, a_P.duS); R.pset(x + 3, y - 2, a_P.duS); R.pset(x + 4, y - 1, a_P.duD); R.pset(x + 3, y - 1, a_K);
    for (let i = 1; i < 5; i++) R.pset(x - i, y - Math.round(i * 0.6), a_P.duD); R.pset(x - 5, y - 3, a_P.duL); }
  // el polvo en el haz de la ventanita
  a_polvo(R, t, 226, 62, 18, 100, -0.75, 18, 9, a_P.luz);
  return { encuadre: 'aposentos', camara: 'cocina', suelo: 150, libre: [120, 240], cuenco: { x: 182, x0: 172, x1: 192, borde: 135, fondo: 142 }, mesa: { x0: 112, x1: 236, tablero: 140 }, actorX: [130, 168], ventana: { x0: 222, x1: 250, y0: 40, y1: 74 } };
}
// la mesa de la cocina, por delante de Irulan: tablero de madera con vetas y su canto, patas, el cuenco de barro claro con
// agua (donde caen las gotas), una jarra, un pan y un plato de dátiles. o.sinCuenco true: la mesa sin el cuenco (la escena
// pinta el suyo, por ejemplo para apartarlo); por omisión el cuenco está
function a_mesaCocina(R, t, o = {}) {
  const { rect, pset, linea, disco } = R;
  rect(112, 140, 236, 148, a_K); for (let y = 141; y < 146; y++) for (let x = 113; x < 236; x++) pset(x, y, (Math.sin(x * 0.15 + y * 1.3) > 0.85) ? a_P.mad : y === 141 ? a_P.madL : (h(x, y, 141) > 0.92 ? a_P.mad : a_P.madL));
  rect(113, 146, 235, 148, a_P.madS); rect(113, 146, 235, 146, a_P.mad);
  for (const lx of [118, 226]) { rect(lx, 148, lx + 6, 179, a_K); rect(lx + 1, 148, lx + 5, 179, a_P.mad); rect(lx + 1, 148, lx + 1, 179, a_P.madL); rect(lx + 5, 148, lx + 5, 179, a_P.madS); }
  rect(124, 158, 226, 161, a_K); rect(124, 159, 226, 160, a_P.madS);
  // el cuenco (borde y 135, fondo 142) con su agua y el brillo, salvo con o.sinCuenco
  if (!o.sinCuenco) { R.poligono([[171, 135], [194, 135], [190, 142], [175, 142]], a_K); R.poligono([[172, 136], [193, 136], [189, 141], [176, 141]], (x, y) => (x < 178 ? a_P.pL : x > 188 ? a_P.pS : a_P.p));
    rect(173, 135, 192, 136, a_P.ag); rect(173, 135, 192, 135, a_K); pset(176 + Math.round((t * 2) % 14), 136, a_P.agL); }
  // la jarra de barro, el pan y el plato de dátiles
  disco(148, 136, 4.5, a_K); disco(148, 136, 3.6, (x) => (x < 147 ? a_P.barroL : a_P.barro)); rect(146, 128, 150, 132, a_K); rect(147, 129, 149, 132, a_P.barro); linea(152, 132, 154, 136, a_P.barroS);
  disco(210, 137, 5, a_K); disco(210, 137, 4, (x, y) => (y < 136 ? a_P.duL : a_P.du)); for (const xx of [207, 210, 213]) pset(xx, 135, a_P.duS);
  rect(124, 138, 140, 140, a_K); rect(125, 138, 139, 139, a_P.pL); for (const xx of [127, 130, 133, 136]) { pset(xx, 137, a_P.datil); pset(xx + 1, 137, a_P.datilL); }
  return {};
}
// la paleta de Caladan: el cielo de tormenta, el mar, la roca y la piedra húmeda, la madera, el fuego
const b_PC = pal({
  c0: '#262f34', c1: '#2f3a40', c2: '#3a474c', c3: '#465458', c4: '#55646a', c5: '#66767a', c6: '#7a8a8a',
  nn0: '#232a2e', nn1: '#323d42', nn2: '#4a585c', nl0: '#4a585c', nl1: '#5e6e70', nl2: '#7e8e8c',
  m0: '#1e3034', m1: '#263c40', m2: '#30484c', m3: '#3c565a', m4: '#4c6668', m5: '#5e7878', espuma: '#d6e2de', espumaS: '#9eb2b0',
  r0: '#1c1c20', r1: '#2a2a2e', r2: '#3a393c', r3: '#4c4a4b', r4: '#5e5b5a', musgo: '#3a5432', musgoL: '#56743e',
  f0: '#3a4248', f1: '#48525a', f2: '#58626a', f3: '#6c767c', f4: '#828c90',
  p0: '#2c2e32', p1: '#45484d', p2: '#5a5d62', p3: '#6e7176', p4: '#868a8e',
  pz0: '#20262e', pz1: '#2e3640', pz2: '#3e4854', pz3: '#525e6a',
  l0: '#26282c', l1: '#383b40', l2: '#4a4e54', l3: '#5e6268', l4: '#767a80', charco: '#4e5e66', charcoL: '#7a8e96',
  luz: '#f8c868', luzS: '#d88a30', luzL: '#fff0b8', hierro: '#24262c', hierroL: '#4a4e58', hierroS: '#16181c',
  gota: '#7a8c98', gotaL: '#aebcc6', faro: '#e8e2d2', faroR: '#a83a32', haz: '#f4ecc0', vela: '#d8d0bc', casco: '#4a3426',
  gav: '#e8ecea', gavS: '#8a9496',
  // la sala de dentro
  s0: '#2a201c', s1: '#463830', s2: '#5e4c40', s3: '#78644f', s4: '#94805f', viga: '#2a1c16', vigaL: '#4a3224', vigaS: '#1a120e',
  fuego0: '#8a2814', fuego1: '#fff2a8', fuego2: '#ffc040', fuego3: '#f07820', fuego4: '#b83a18', hollin: '#140e0c', brasa: '#ff6a28',
  tapiz: '#2e6a4a', tapizS: '#1e4a34', tapizL: '#4a8a62', oro: '#e8c060', oroS: '#a8803a',
  t0: '#2e2018', t1: '#4a3424', t2: '#634632', t3: '#7c5a40', t4: '#946e4e', alf: '#2a5a40', alfS: '#1e4430', alfB: '#8a3a2a',
  cera: '#efe6cc', ceraL: '#fffaf0', ceraS: '#c8bc9c', mapa: '#d8c8a0', mapaS: '#b8a47c', mapaMar: '#7aa0a8', mapaMarS: '#5e868e', isla: '#6a8a4a',
  globo: '#4a7aa0', globoL: '#7aaac8', perro: '#c8b89a', perroS: '#8a7a62', perroL: '#ece0c6', cristal: '#3a4c58',
});

// umbral del tramado ordenado 4 × 4 en (x, y), entre 0 y 1
const b_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const b_umbral = (x, y) => b_BAYER[((y & 3) << 2) | (x & 3)];

// mezcla dos colores del lienzo (0xAABBGGRR) en la proporción a
function b_mezcla(c1, c2, a) {
  const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0;
}

// tiñe un píxel ya pintado hacia c (luz o sombra local), respetando el recorte
function b_luzPx(R, x, y, c, a) { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, b_mezcla(R.pget(x, y), c, a)); }

// las capas fijas: lo que no se mueve se pinta una vez en un búfer de R.nuevo() y se copia en cada fotograma. dibuja(foto)
// pinta la capa; foto() guarda lo pintado hasta ese momento, y la máscara m vale 1 donde ese fondo (cielo, mar, cristal)
// sigue a la vista (para pintar encima nubes, olas o gas solo por detrás de lo demás); zona(x, y) limita la máscara
const b_CAPAS = new Map();

function b_capa(R, clave, dibuja, zona = null) {
  let c = b_CAPAS.get(clave);
  if (!c) {
    const b = R.nuevo(), prev = R.usar(b), m = new Uint8Array(320 * 180);
    let foto = null;
    const info = dibuja(() => (foto = b.slice()));
    if (foto) for (let i = 0; i < m.length; i++) m[i] = b[i] === foto[i] && (!zona || zona(i % 320, (i / 320) | 0)) ? 1 : 0;
    R.usar(prev); c = { b, m, info }; b_CAPAS.set(clave, c);
  }
  R.copiar(c.b);
  return c;
}

// degradado tramado de arriba abajo entre y0 e y1: P = [[fracción, color], …]; x0–x1 limita el ancho
function b_degradado(R, y0, y1, P, x0 = 0, x1 = 319) {
  for (let y = Math.max(0, y0); y < Math.min(180, y1); y++) { const u = (y - y0) / (y1 - y0);
    let i = 0; while (i + 1 < P.length && u >= P[i + 1][0]) i++;
    const a = P[i][1], b = P[Math.min(P.length - 1, i + 1)][1], p = i + 1 < P.length ? (u - P[i][0]) / (P[i + 1][0] - P[i][0]) : 0;
    for (let x = x0; x <= x1; x++) R.pset(x, y, b_umbral(x, y) < p ? b : a); }
}

// sillares: hiladas de piedra con juntas, cada bloque con su tono, canto de luz arriba y sombra abajo, y grano; P =
// [junta, sombra, cuerpo, luz, brillo]; o.luz(x, y): luz que se suma (cilindros, fuego); o.musgo(x, y): probabilidad de
// musgo; o.alto, o.ancho: el tamaño del bloque; o.k: semilla
function b_sillares(R, x0, y0, x1, y1, P, o = {}) {
  const hb = o.alto ?? 8, wb = o.ancho ?? 16, k = o.k ?? 0, M = o.musgoC;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) { const fila = Math.floor((y - y0) / hb), yy = (y - y0) % hb, des = (fila % 2) * (wb >> 1) + Math.floor(h(fila, k, 5) * 5);
    for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) { const col = Math.floor((x - x0 + des) / wb), xx = (x - x0 + des) % wb, w = wb - 1 - Math.floor(h(col, fila, k + 2) * 3);
      if (yy === hb - 1 || xx >= w) { R.pset(x, y, P[0]); continue; }
      let n = 2.1 + (h(col, fila, k) - 0.5) * 1.1 + (yy === 0 ? 0.9 : 0) + (xx === 0 ? 0.5 : 0) - (yy === hb - 2 ? 0.8 : 0) - (xx === w - 1 ? 0.5 : 0) + (h(x, y, k + 9) - 0.5) * 0.8;
      if (o.luz) n += o.luz(x, y);
      if (M && o.musgo && h(x >> 1, y, k + 3) < o.musgo(x, y)) { R.pset(x, y, n > 2.2 ? M[1] : M[0]); continue; }
      R.pset(x, y, P[Math.max(1, Math.min(P.length - 1, Math.floor(n + b_umbral(x, y) - 0.5)))]); } }
}

// la lluvia: trazos en diagonal que caen con el viento (n gotas, entre y0 e y1; L: largo; v: velocidad)
function b_lluvia(R, t, n, viento, y0, y1, c, c2, L0 = 5, v0 = 170) {
  const dx = 0.35 + viento * 0.9;
  for (let k = 0; k < n; k++) { const v = v0 + h(k, 1, 640) * 90, L = L0 + Math.round(h(k, 2, 640) * 4), alto = y1 - y0 + 30, ya = ((h(k, 4, 640) * 400 + t * v) % alto) + y0 - 15;
    const x = ((((h(k, 3, 640) * 420 + (ya - y0) * dx) % 420) + 420) % 420) - 50; for (let i = 0; i < L; i++) R.pset(Math.round(x - i * dx), Math.round(ya - i), i < 2 ? c : c2); }
}
// jirón de nube de tormenta (elipse de borde deshilachado), solo donde la máscara m deja: oscuro abajo, claro arriba
function b_jiron(B, m, cx, cy, rx, ry, sem, c0, c1, c2) {
  for (let y = Math.max(0, Math.floor(cy - ry)); y <= Math.min(179, Math.ceil(cy + ry)); y++) { const f = y * 320, dy = (y - cy) / ry;
    for (let x = Math.max(0, Math.floor(cx - rx)); x <= Math.min(319, Math.ceil(cx + rx)); x++) { if (!m[f + x]) continue; const e = ((x - cx) / rx) ** 2 + dy * dy + (h((x - cx) >> 2, y >> 1, sem) - 0.5) * 0.6;
      if (e < 1) B[f + x] = e > 0.7 ? (dy < 0 ? c2 : c0) : dy > 0.3 ? c0 : dy < -0.35 ? c2 : c1; } }
}

// el cielo de tormenta que se mueve (solo donde m deja, y por encima de hor): tres capas de jirones a tres velocidades
function b_nubesTormenta(R, t, m, hor, x0 = 0, x1 = 319, esc = 1, y0 = 0) {
  const Y = (f) => y0 + (hor - y0) * f;
  const B = R.buf, P = b_PC, an = x1 - x0 + 140;
  for (let k = 0; k < 7; k++) { const x = x0 - 70 + (((h(k, 1, 700) * an + t * 1.6) % an) + an) % an, y = Y(0.18 + h(k, 2, 700) * 0.5); b_jiron(B, m, x, y, (22 + h(k, 3, 700) * 18) * esc, (4 + h(k, 4, 700) * 3) * esc, k + 40, P.nl0, P.nl1, P.nl2); }
  for (let k = 0; k < 6; k++) { const x = x0 - 70 + (((h(k, 5, 700) * an + t * 4.2) % an) + an) % an, y = Y(0.08 + h(k, 6, 700) * 0.7); b_jiron(B, m, x, y, (30 + h(k, 7, 700) * 22) * esc, (6 + h(k, 8, 700) * 4) * esc, k + 50, P.c1, P.c3, P.c5); }
  for (let k = 0; k < 4; k++) { const x = x0 - 70 + (((h(k, 9, 700) * an + t * 9) % an) + an) % an, y = Y(0.55 + h(k, 10, 700) * 0.35); b_jiron(B, m, x, y, (26 + h(k, 11, 700) * 20) * esc, (3 + h(k, 12, 700) * 2) * esc, k + 60, P.nn0, P.nn1, P.nn2); }
}

// el mar que se mueve entre hor e yf (solo donde m deja): crestas que corren, más anchas cerca, con espuma
function b_olas(R, t, m, hor, yf, x0 = 0, x1 = 319) {
  const B = R.buf, P = b_PC, cols = [P.m0, P.m1, P.m2, P.m3, P.m4, P.m5];
  for (let y = hor + 1; y <= yf; y++) { const d = (y - hor) / (yf - hor), f = y * 320, fx = 0.55 - d * 0.42, vel = 0.9 + d * 1.8, base = 4.4 - d * 3.2;
    for (let x = x0; x <= x1; x++) { if (!m[f + x]) continue;
      const s = Math.sin(x * fx + Math.sin(x * 0.045 + y * 0.9) * 1.6 - t * vel + y * 1.9) + Math.sin(x * fx * 0.37 - t * vel * 0.6 + y * 0.7) * 0.5;
      let n = base + s * 0.6;
      if (s > 1.15 && h(x >> 1, y, Math.floor(t * 3) + (x >> 4)) < 0.55 + d * 0.3) { B[f + x] = s > 1.3 ? P.espuma : P.espumaS; continue; }
      B[f + x] = cols[Math.max(0, Math.min(5, Math.floor(n + b_umbral(x, y) - 0.5)))]; } }
}
// una gaviota que planea (aletea de vez en cuando), de tamaño s
function b_gaviota(R, x, y, t, k, s = 1) {
  const P = b_PC, al = Math.sin(t * 7 + k * 2) > 0.3 ? -1 : 1; x = Math.round(x); y = Math.round(y);
  R.pset(x, y, P.gav); R.pset(x + 1, y, P.gav); R.pset(x - 1, y + al, P.gav); R.pset(x + 2, y + al, P.gav);
  if (s > 1) { R.pset(x - 2, y + al, P.gavS); R.pset(x + 3, y + al, P.gavS); R.pset(x + 2, y + 1, P.gavS); }
}

// el estandarte verde del halcón que ondea, colgado de un mástil en (x, y) hacia la derecha, w × hh
function b_estandarte(R, x, y, w, hh, t) {
  const P = b_PC, HALCON = ['..#.#..', '.#####.', '#######', '.#.#.#.', '..###..'];
  R.linea(x, y - 1, x, y + hh + 8, P.hierro);
  for (let i = 1; i <= w; i++) { const dy = Math.round(Math.sin(t * 6 - i * 0.55) * 1.6 * (i / w)), sh = Math.cos(t * 6 - i * 0.55);
    for (let j = 0; j < hh; j++) { let c = sh > 0.4 ? P.tapizL : sh < -0.4 ? P.tapizS : P.tapiz; const fx = i - Math.round(w / 2 - 3), fy = j - Math.round(hh / 2 - 2);
      if (fx >= 0 && fx < 7 && fy >= 0 && fy < 5 && HALCON[fy][fx] === '#') c = sh < -0.4 ? P.oroS : P.oro;
      if (i === w && (j === 1 || j === hh - 2)) continue; R.pset(x + i, y + j + dy, c); } }
}

// una ventana encendida pequeña (la luz tiembla un poco)
function b_ventanita(R, x, y, w, hh, t, k) {
  const P = b_PC, f = Math.sin(t * (3 + k % 3) + k) * 0.5 + Math.sin(t * 7.3 + k * 2) * 0.3;
  R.rect(x - 1, y - 1, x + w, y + hh, P.hierroS);
  for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) R.pset(x + i, y + j, j === 0 ? P.luzS : f > 0.4 && (i + j) % 2 ? P.luzL : P.luz);
}
// EL PASEO DE LA MURALLA (cámara 'general')
function b_calPaseo(R, t, o) {
  const { pset, linea, rect, disco, poligono } = R, P = b_PC, HOR = 80, ll = o.lluvia ?? 1;
  const capa = b_capa(R, 'cal-paseo', (foto) => {
    // el cielo (tramado de verdoso oscuro arriba a gris claro en el horizonte) y el mar liso: lo demás se pinta encima
    b_degradado(R, 0, HOR + 1, [[0, P.c0], [0.22, P.c1], [0.42, P.c2], [0.62, P.c3], [0.8, P.c4], [0.93, P.c5]]);
    b_degradado(R, HOR + 1, 142, [[0, P.m4], [0.4, P.m3], [1, P.m2]]);
    foto();
    // la costa lejana a la izquierda y el islote del faro con sus rocas
    poligono([[0, 66], [10, 64], [22, 69], [34, 74], [44, 79], [0, 81]], (x, y) => (b_umbral(x, y) < 0.3 ? P.f1 : P.f0));
    poligono([[30, 86], [36, 78], [44, 75], [56, 74], [64, 77], [74, 82], [80, 86]], (x, y) => [P.r1, P.r2, P.r3][Math.max(0, Math.min(2, Math.floor(2.4 - (x - 30) / 30 + h(x, y, 3) * 0.8 - (y - 74) / 10)))]);
    for (let x = 32; x < 80; x++) if (h(x, 1, 4) < 0.5) pset(x, 85 - Math.floor(h(x, 2, 4) * 2), P.musgo);
    for (let y = 56; y < 78; y++) for (let x = 46; x <= 54; x++) { const banda = Math.floor((y - 56) / 5) % 2, l = x < 49 ? 1 : x > 52 ? -1 : 0; pset(x, y, banda ? (l < 0 ? hex('#7a2a24') : P.faroR) : l < 0 ? hex('#b8b2a4') : l > 0 ? C.blanco : P.faro); }
    rect(44, 55, 56, 56, P.hierro); rect(46, 49, 54, 54, P.hierro); rect(47, 50, 53, 53, P.luzS); rect(46, 47, 54, 48, P.faroR); pset(50, 46, P.hierro);
    // el acantilado del castillo: roca oscura con estratos, grietas y musgo; baja al mar entre x 130 y 262
    const caraY = (x) => 82 + Math.max(0, (152 - x) * 1.6);
    poligono([[128, 124], [134, 110], [142, 96], [150, 84], [160, 80], [320, 78], [320, 124]], (x, y) => {
      const est = Math.floor((y + Math.sin(x * 0.08) * 3) / 4), v = 2.2 - (y - 80) / 26 + (h(x >> 1, est, 7) - 0.5) * 1.2 + (x < 160 ? 0.6 : 0) + ((y + Math.round(Math.sin(x * 0.08) * 3)) % 4 === 0 ? -0.9 : 0);
      if (h(x >> 1, y >> 1, 8) < Math.max(0, 0.5 - (y - caraY(x)) / 10) * 0.8) return h(x, y, 9) < 0.5 ? P.musgo : P.musgoL;
      return [P.r0, P.r1, P.r2, P.r3, P.r4][Math.max(0, Math.min(4, Math.floor(v + b_umbral(x, y) - 0.3)))]; });
    for (let k = 0; k < 9; k++) { let x = 150 + h(k, 1, 10) * 110, y = 86 + h(k, 2, 10) * 10; for (let i = 0; i < 8; i++) { const nx = x + (h(k, i, 11) - 0.5) * 4, ny = y + 3; linea(Math.round(x), Math.round(y), Math.round(nx), Math.round(ny), P.r0); x = nx; y = ny; } }
    // el castillo lejano (velado por la lluvia): la muralla con almenas y ventanas, la torre menor y la del homenaje
    b_sillares(R, 154, 64, 262, 82, [P.f0, P.f1, P.f2, P.f3, P.f4], { alto: 4, ancho: 8, k: 20, luz: (x) => (x < 170 ? 0.4 : 0) });
    for (let x = 154; x < 262; x += 6) rect(x, 60, x + 2, 63, P.f2), pset(x, 60, P.f3), rect(x + 3, 63, x + 5, 63, P.f0);
    rect(154, 63, 262, 64, P.f3);
    b_sillares(R, 158, 40, 174, 64, [P.f0, P.f1, P.f2, P.f3, P.f4], { alto: 4, ancho: 6, k: 21, luz: (x) => 0.6 - (x - 158) / 12 });
    poligono([[155, 41], [166, 26], [177, 41]], (x, y) => [P.pz0, P.pz1, P.pz2, P.pz3][Math.max(0, Math.min(3, Math.floor(2.6 - (x - 155) / 9 + ((y % 3 === 0) ? -0.8 : 0) + b_umbral(x, y) * 0.6)))]);
    b_sillares(R, 196, 26, 230, 64, [P.f0, P.f1, P.f2, P.f3, P.f4], { alto: 4, ancho: 7, k: 22, luz: (x) => 0.7 - (x - 196) / 20 });
    for (let x = 194; x < 233; x += 5) rect(x, 22, x + 2, 25, P.f3); rect(194, 25, 232, 26, P.f4);
    poligono([[193, 23], [213, 6], [233, 23]], (x, y) => [P.pz0, P.pz1, P.pz2, P.pz3][Math.max(0, Math.min(3, Math.floor(2.7 - (x - 193) / 13 + ((y % 3 === 0) ? -0.8 : 0) + b_umbral(x, y) * 0.6)))]);
    linea(213, 6, 213, 2, P.hierro);
    // el torreón cercano de la derecha: cilindro de sillares con la luz por la izquierda, su corona de almenas y el tejado
    // cónico de pizarra en escamas; la saetera encendida
    b_sillares(R, 266, 70, 320, 142, [P.p0, P.p1, P.p2, P.p3, P.p4], { alto: 7, ancho: 11, k: 30, luz: (x) => { const u = (x - 293) / 27; return 0.7 - u * 1.1 - u * u * 1.2; }, musgoC: [P.musgo, P.musgoL], musgo: (x, y) => (y > 128 ? (y - 128) / 30 : 0) });
    for (let x = 264; x < 322; x += 9) { b_sillares(R, x, 62, x + 5, 70, [P.p0, P.p1, P.p2, P.p3, P.p4], { alto: 4, ancho: 6, k: 31 + x }); }
    rect(264, 69, 320, 70, P.p0);
    poligono([[262, 64], [293, 46], [324, 64]], (x, y) => { const fila = Math.floor((y - 46) / 3), esc = ((x + fila * 2) % 5) === 0 || (y - 46) % 3 === 0; return [P.pz0, P.pz1, P.pz2, P.pz3][Math.max(0, Math.min(3, Math.floor(2.8 - (x - 262) / 22 + (esc ? -0.9 : 0) + b_umbral(x, y) * 0.5)))]; });
    linea(262, 64, 293, 46, P.pz3); rect(289, 88, 292, 104, P.hierroS);
    // el parapeto almenado de primer término y su albardilla, con chorreones de agua y musgo abajo
    b_sillares(R, 0, 124, 266, 142, [P.p0, P.p1, P.p2, P.p3, P.p4], { alto: 6, ancho: 14, k: 40, musgoC: [P.musgo, P.musgoL], musgo: (x, y) => (y > 134 ? (y - 134) / 16 + (h(x >> 3, 1, 41) < 0.3 ? 0.2 : 0) : 0) });
    for (let x0 = -4; x0 < 262; x0 += 26) { b_sillares(R, x0, 110, x0 + 14, 122, [P.p0, P.p1, P.p2, P.p3, P.p4], { alto: 6, ancho: 15, k: 50 + x0 }); rect(x0, 109, x0 + 14, 110, P.p4); rect(x0 + 14, 110, x0 + 14, 122, P.p0); }
    rect(0, 122, 266, 124, P.p3); rect(0, 122, 266, 122, P.p4); rect(0, 124, 266, 124, P.p0);
    for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 1, 42) * 262), L = 4 + Math.round(h(k, 2, 42) * 10); for (let y = 125; y < 125 + L; y++) pset(x, y, b_mezcla(R.pget(x, y), P.p0, 0.45)); }
    // el paseo de losas mojadas: hiladas en perspectiva, cada losa con su tono, el canalón junto al muro y los charcos
    const filas = [142, 146, 151, 157, 164, 172, 181];
    for (let r = 0; r < filas.length - 1; r++) { const ya = filas[r], yb = filas[r + 1], an = 22 + r * 7;
      for (let y = ya; y < yb; y++) for (let x = 0; x < 320; x++) { const xs = x + (r % 2) * (an >> 1) + Math.round((x - 160) * (y - 142) * 0.006), col = Math.floor(xs / an), xx = ((xs % an) + an) % an;
        if (y === yb - 1 || xx === 0) { pset(x, y, P.l0); continue; }
        const n = 2 + (h(col, r, 60) - 0.5) * 1.2 + (y === ya ? 0.8 : 0) + (h(x, y, 61) - 0.5) * 0.7 - (x > 236 ? 0.2 : 0);
        pset(x, y, [P.l0, P.l1, P.l2, P.l3, P.l4][Math.max(1, Math.min(4, Math.floor(n + b_umbral(x, y) - 0.5)))]); } }
    rect(0, 142, 266, 143, P.hierroS); rect(0, 144, 266, 144, P.l1);
    for (const [cx, cy, rx, ry] of [[58, 168, 20, 3], [168, 158, 14, 2], [226, 174, 22, 3], [112, 150, 9, 1.5]])
      for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + (h(x >> 1, y, 62) - 0.5) * 0.3 < 1) pset(x, y, (y - cy) < -ry * 0.3 ? P.charcoL : b_umbral(x, y) < 0.5 ? P.charco : P.l1);
    // un barril de agua de lluvia y un rollo de cuerda junto al torreón
    for (let y = 128; y <= 150; y++) { const w = 8 + Math.round(Math.sin((y - 128) / 22 * Math.PI) * 2); for (let x = 248 - w; x <= 248 + w; x++) { const u = (x - 248) / w; pset(x, y, (y - 130) % 9 === 0 ? P.hierro : [P.t1, P.t2, P.t3, P.t2, P.t1][Math.max(0, Math.min(4, Math.floor((u + 1) * 2.5 - 0.6 + b_umbral(x, y) * 0.5)))]); if ((x - 248 + 40) % 5 === 0 && (y - 130) % 9) pset(x, y, P.t0); } }
    for (let x = 240; x <= 256; x++) { pset(x, 128, P.charco); pset(x, 127, P.t3); } pset(244, 128, P.charcoL);
    for (let k = 0; k < 3; k++) { const r = 6 - k * 1.5; for (let a = 0; a < 6.28; a += 0.2) pset(Math.round(230 + Math.cos(a) * r), Math.round(147 + Math.sin(a) * r * 0.4), k % 2 ? hex('#8a7a5a') : hex('#b0a07a')); }
    // el brazo del farol, clavado en el torreón
    linea(266, 96, 256, 96, P.hierro); linea(266, 95, 256, 95, P.hierroL); linea(266, 100, 260, 96, P.hierro); rect(266, 93, 268, 101, P.hierroS);
  });
  const B = R.buf, m = capa.m;
  // el cielo y el mar que se mueven
  b_nubesTormenta(R, t, m, HOR);
  b_olas(R, t, m, HOR, 141);
  // el haz del faro que gira (se ve como un abanico de luz que barre el cielo y el mar, y la linterna destella)
  if (o.faro !== false) { const a = t * 1.1, c = Math.cos(a), lx = 50, ly = 52, L = 70 * Math.abs(c), dir = c > 0 ? 1 : -1;
    for (let i = 4; i < L; i++) { const ab = 1 + i * 0.12, x = Math.round(lx + dir * i); for (let j = -ab; j <= ab; j++) { const y = Math.round(ly + j + i * 0.05); if (y >= 0 && x >= 0 && x < 320 && m[y * 320 + x]) B[y * 320 + x] = b_mezcla(B[y * 320 + x], P.haz, 0.42 * (1 - i / 75) * (1 - (Math.abs(j) / (ab + 1)) ** 2)); } }
    const brillo = Math.abs(c) < 0.25 ? P.luzL : P.luz; rect(47, 50, 53, 53, brillo); if (Math.abs(c) < 0.3) { for (const [dx, dy] of [[-4, 0], [4, 0], [0, -4], [-3, -3], [3, -3]]) pset(50 + dx, 51 + dy, P.haz); } }
  // un velero lejano que cruza despacio y cabecea
  { const x = Math.round(70 + ((t * 2.2) % 70)), y = 88 + Math.round(Math.sin(t * 2) * 0.6); if (x < 128) { rect(x - 4, y, x + 4, y + 1, P.casco); pset(x - 5, y, P.casco); linea(x, y - 1, x, y - 9, P.hierro); poligono([[x + 1, y - 9], [x + 6, y - 2], [x + 1, y - 2]], P.vela); poligono([[x - 1, y - 7], [x - 5, y - 2], [x - 1, y - 2]], P.vela); for (let i = -6; i < 7; i++) if (h(i, Math.floor(t * 4), 70) < 0.5) pset(x + i, y + 2, P.espumaS); } }
  // las olas que rompen al pie del acantilado: la franja de espuma que hierve y, cada pocos segundos, un roción
  for (let x = 128; x < 268; x++) { const yb = 121 - Math.round(Math.max(0, (150 - x) * 0.4)) + Math.round(Math.sin(x * 0.3 + t * 3) * 1.2); for (let y = yb - 2; y <= yb + 1; y++) if (h(x, y, Math.floor(t * 6)) < 0.6) pset(x, y, y === yb - 2 ? P.espuma : P.espumaS); }
  for (let k = 0; k < 4; k++) { const per = 3.2 + k * 0.7, u = ((t + k * 1.3) % per) / 1.4; if (u > 1) continue; const x0 = 140 + k * 32 + Math.round(h(k, Math.floor((t + k * 1.3) / per), 71) * 20);
    for (let i = 0; i < 26; i++) { const vx = (h(i, k, 72) - 0.5) * 22, vy = 22 + h(i, k, 73) * 20, x = Math.round(x0 + vx * u), y = Math.round(118 - vy * u + 34 * u * u); if (y < 120) pset(x, y, u < 0.6 ? P.espuma : P.espumaS); } }
  // la muralla del castillo: las ventanas encendidas que tiemblan y el estandarte del halcón que ondea
  [[180, 70], [192, 70], [244, 70], [252, 70], [204, 34], [218, 34], [204, 46], [218, 46], [211, 56], [165, 50]].forEach(([x, y], k) => b_ventanita(R, x, y, 3, 4, t, k));
  b_estandarte(R, 213, 2, 22, 8, t);
  // las nubes bajas que pasan por delante del castillo (jirones de niebla que tapan la torre a ratos)
  for (let k = 0; k < 3; k++) { const an = 420, x = (((h(k, 1, 74) * an + t * (6 + k * 2)) % an) + an) % an - 60, y = 38 + k * 14; for (let j = -3; j <= 3; j++) for (let i = -28; i <= 28; i++) { const xx = Math.round(x + i), yy = y + j; if (xx < 130 || xx > 264 || yy < 22 || yy > 82) continue; const e = (i / 28) ** 2 + (j / 3.5) ** 2 + (h(i >> 2, j, 75 + k) - 0.5) * 0.5; if (e < 1 && b_umbral(xx, yy) < 0.5 - e * 0.35) pset(xx, yy, P.nl1); } }
  // las gaviotas
  for (let k = 0; k < 4; k++) { const an = 360, x = (((h(k, 1, 76) * an + t * (8 + k * 3) * (k % 2 ? -1 : 1)) % an) + an) % an - 20, y = 42 + h(k, 2, 76) * 30 + Math.sin(t * 1.3 + k) * 4; if (x > 272 && y < 48) continue; b_gaviota(R, x, y, t, k, k < 2 ? 2 : 1); }
  // la lluvia de detrás (fina), el farol que tiembla con su halo y su reflejo, la saetera encendida
  b_lluvia(R, t, Math.round(110 * ll), 0.55, 0, 142, P.c6, P.c4, 4, 150);
  { const f = 0.75 + Math.sin(t * 9) * 0.12 + Math.sin(t * 23) * 0.08;
    for (let y = 84; y < 124; y++) for (let x = 236; x < 284; x++) { const d = Math.hypot(x - 258, (y - 106) * 1.2); if (d < 22) B[y * 320 + x] = b_mezcla(B[y * 320 + x], P.luz, (1 - d / 22) ** 2 * 0.4 * f); }
    linea(258, 96, 258, 100, P.hierro); rect(254, 100, 262, 102, P.hierro); rect(255, 103, 261, 109, P.hierro); rect(256, 103, 260, 108, f > 0.8 ? P.luzL : P.luz); pset(258, 104, P.luzS); rect(254, 110, 262, 111, P.hierro); pset(258, 112, P.hierro);
    for (let y = 146; y < 180; y++) { const w = 1 + (y - 146) * 0.06, dx = Math.sin(t * 4 + y * 0.9) * 1.2; for (let x = Math.round(258 + dx - w); x <= 258 + dx + w; x++) B[y * 320 + x] = b_mezcla(B[y * 320 + x], (y + Math.floor(t * 8)) % 3 ? P.luz : P.luzL, 0.5 * (1 - (y - 146) / 40)); }
    for (let y = 89; y < 104; y++) pset(290 + (y % 2), y, f > 0.8 ? P.luzL : P.luz); }
  // el reguero del canalón y los anillos de la lluvia en los charcos
  for (let x = 0; x < 266; x++) if (((x + Math.floor(t * 30)) % 9) < 2) pset(x, 143, P.gota);
  for (const [cx, cy, rx] of [[58, 168, 20], [168, 158, 14], [226, 174, 22], [112, 150, 9]]) for (let k = 0; k < 3; k++) { const per = 0.9 + k * 0.3, u = ((t + k * 0.37 + cx) % per) / per, n = Math.floor((t + k * 0.37 + cx) / per), x = Math.round(cx + (h(n, k, cx) - 0.5) * rx * 1.4), r = 1 + u * 4; if (u < 0.85) for (let a = 0; a < 6.28; a += 0.5) pset(Math.round(x + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * 0.35), P.charcoL); }
  return { encuadre: 'castillo', camara: 'general', suelo: 152, libre: [30, 218], barril: [248, 128, 150], cuerda: [230, 147], farol: [258, 106], faro: [50, 52], horizonte: HOR, castillo: [154, 6, 262, 82] };
}
// LA SALA DEL CASTILLO (cámara 'ventana')
function b_calSala(R, t, o) {
  const { pset, linea, rect, disco, poligono } = R, P = b_PC, W = [122, 22, 198, 110], HV = 84, ll = o.lluvia ?? 1;
  const enHueco = (x, y) => x >= W[0] && x <= W[2] && y <= W[3] && (y >= 60 || Math.hypot(x + 0.5 - 160, y + 0.5 - 60) <= 38);
  const luzFuego = (x, y) => 1.15 * Math.exp(-Math.hypot(x - 48, (y - 124) * 1.2) / 70) + 0.35 * Math.exp(-Math.hypot(x - 160, y - 70) / 60) - (y < 26 ? 0.45 : 0) - Math.max(0, (x - 240) / 110);
  const capa = b_capa(R, 'cal-sala', (foto) => {
    // el muro de sillares cálidos (la luz del fuego a la izquierda y la de la ventana en el centro)
    b_sillares(R, 0, 12, 319, 149, [P.s0, P.s1, P.s2, P.s3, P.s4], { alto: 9, ancho: 18, k: 80, luz: luzFuego });
    // fuera, en el hueco del arco: el cielo de tormenta y el mar
    for (let y = 22; y <= W[3]; y++) for (let x = W[0]; x <= W[2]; x++) if (enHueco(x, y)) { const u = (y - 22) / (HV - 22);
      pset(x, y, y <= HV ? [P.c1, P.c2, P.c3, P.c4, P.c5][Math.max(0, Math.min(4, Math.floor(u * 4.6 + b_umbral(x, y) - 0.3)))] : b_umbral(x, y) < 0.5 ? P.m3 : P.m4); }
    foto();
    // el faro en su islote y el cabo lejano
    poligono([[124, 86], [131, 81], [145, 80], [154, 86]], P.r1); for (let y = 74; y < 82; y++) for (let x = 137; x <= 140; x++) pset(x, y, Math.floor((y - 74) / 3) % 2 ? P.faroR : x > 139 ? hex('#b8b2a4') : P.faro);
    rect(136, 71, 141, 73, P.hierro); rect(137, 72, 140, 72, P.luz); rect(137, 70, 140, 70, P.faroR);
    poligono([[174, 85], [184, 80], [194, 77], [199, 76], [199, 85]], (x, y) => (b_umbral(x, y) < 0.4 ? P.f1 : P.f0));
    // el marco de piedra del arco (dovelas), las vidrieras emplomadas (rombos), el parteluz y el travesaño
    for (let a = Math.PI; a <= Math.PI * 2 + 0.01; a += 0.012) for (let r = 39; r < 46; r++) { const x = Math.round(160 + Math.cos(a) * r), y = Math.round(60 + Math.sin(a) * r), dov = Math.floor((a - Math.PI) / (Math.PI / 11)); pset(x, y, r === 39 ? P.s0 : r === 45 ? P.s1 : (Math.round((a - Math.PI) / (Math.PI / 11) * 10) % 10 === 0) ? P.s1 : [P.s3, P.s4, P.s3][dov % 3]); }
    for (const x0 of [115, 199]) { b_sillares(R, x0, 60, x0 + 6, 112, [P.s1, P.s2, P.s3, P.s4, P.s4], { alto: 8, ancho: 7, k: 81 + x0 }); }
    for (let y = 22; y <= W[3]; y++) for (let x = W[0]; x <= W[2]; x++) if (enHueco(x, y) && (((x - 160 + y) % 10 === 0) || ((x - 160 - y + 400) % 10 === 0)) && b_umbral(x, y) < 0.7) pset(x, y, P.hierro);
    rect(159, 22, 161, 110, P.hierro); rect(159, 22, 159, 110, P.hierroL); rect(122, 64, 198, 66, P.hierro); rect(122, 64, 198, 64, P.hierroL);
    // el alféizar hondo, con la vela y el barquito de madera
    rect(112, 110, 208, 118, P.s3); rect(112, 110, 208, 111, P.s4); rect(112, 118, 208, 119, P.s0); for (let x = 112; x < 208; x++) if (h(x, 3, 82) < 0.3) pset(x, 113 + Math.floor(h(x, 4, 82) * 4), P.s2);
    rect(128, 102, 131, 110, P.cera); rect(128, 102, 128, 110, P.ceraL); rect(126, 109, 133, 110, P.oroS); rect(126, 109, 133, 109, P.oro);
    rect(178, 106, 194, 108, P.casco); rect(176, 105, 196, 105, P.t3); pset(177, 106, P.casco); pset(195, 106, P.casco); rect(182, 109, 190, 109, P.t1); linea(186, 105, 186, 92, P.t1); poligono([[187, 93], [194, 103], [187, 103]], P.vela); poligono([[185, 95], [179, 103], [185, 103]], P.velaS ?? P.vela); rect(186, 91, 189, 92, P.faroR);
    // las vigas del techo con sus ménsulas
    rect(0, 0, 319, 11, P.viga); for (let x = 0; x < 320; x++) for (let y = 0; y < 11; y++) if (h(x >> 2, y, 83) < 0.25) pset(x, y, P.vigaS);
    rect(0, 11, 319, 12, P.vigaS); for (let x = 6; x < 320; x += 52) { rect(x, 0, x + 9, 16, P.vigaS); rect(x + 1, 0, x + 8, 14, P.vigaL); rect(x + 1, 12, x + 8, 13, P.viga); }
    // la chimenea: el pecho de piedra que sobresale, la repisa con candeleros, la boca en arco con hollín y los morillos
    b_sillares(R, 12, 12, 84, 86, [P.s0, P.s2, P.s3, P.s4, P.s4], { alto: 9, ancho: 14, k: 84, luz: (x, y) => 0.2 + (y > 60 ? 0.3 : 0) - (x > 78 ? 0.8 : 0) });
    rect(84, 12, 85, 86, P.s0);
    disco(48, 50, 13, P.s1); disco(48, 50, 12, P.s4); disco(48, 50, 10, P.tapiz); disco(47, 49, 8, P.tapizL); disco(48, 50, 7, P.tapiz);
    { const HAL = ['....#.#....', '...#####...', '.#########.', '###########', '#.#######.#', '...#.#.#...', '....###....', '...#...#...']; HAL.forEach((f, j) => { for (let i = 0; i < 11; i++) if (f[i] === '#') pset(43 + i, 46 + j, j < 3 ? P.oro : P.oroS); }); }
    for (let a = 0; a < 6.28; a += 0.3) pset(Math.round(48 + Math.cos(a) * 11), Math.round(50 + Math.sin(a) * 11), P.oroS);
    rect(8, 86, 88, 93, P.t2); rect(8, 86, 88, 86, P.t4); rect(8, 93, 88, 94, P.t0); for (let x = 10; x < 88; x += 3) pset(x, 89, P.t1);
    for (const x of [18, 76]) { rect(x - 1, 78, x + 1, 85, P.oroS); rect(x - 3, 84, x + 3, 85, P.oro); rect(x - 1, 72, x, 77, P.cera); }
    rect(40, 76, 56, 85, P.hierro); rect(41, 77, 55, 84, P.t1); for (let k = 0; k < 3; k++) rect(43 + k * 4, 79, 45 + k * 4, 84, [P.mapa, P.globo, P.oroS][k]);
    b_sillares(R, 14, 94, 82, 149, [P.s0, P.s2, P.s3, P.s4, P.s4], { alto: 9, ancho: 12, k: 85, luz: () => 0.9 });
    for (let y = 98; y <= 148; y++) for (let x = 24; x <= 72; x++) { if (y < 112 && Math.hypot(x - 48, (y - 112) * 1.7) > 24) continue; pset(x, y, y < 120 ? P.hollin : b_umbral(x, y) < (y - 120) / 40 ? P.s0 : P.hollin); }
    rect(10, 148, 86, 153, P.s2); rect(10, 148, 86, 148, P.s4); rect(10, 153, 86, 154, P.s0);
    for (const x of [30, 66]) { rect(x - 1, 134, x + 1, 148, P.hierro); rect(x - 2, 132, x + 2, 134, P.hierroL); }
    // el tapiz verde del halcón (barra, cenefa dorada, flecos), el aplique y la alacena con cartas y el globo de Caladan
    rect(219, 22, 271, 24, P.hierro); disco(219, 23, 2, P.oroS); disco(271, 23, 2, P.oroS);
    const HALCON = ['....#.#....', '...#####...', '.#########.', '###########', '#.#######.#', '...#.#.#...', '....###....', '...#...#...'];
    for (let y = 25; y < 104; y++) for (let x = 222; x <= 268; x++) { const borde = x < 225 || x > 265 || y < 28 || y > 100, pl = Math.sin((x - 222) * 0.9) * 0.3, sh = 0.5 - (x - 222) / 60 + pl;
      let c = borde ? ((x + y) % 3 === 0 ? P.oroS : P.oro) : sh > 0.3 ? P.tapizL : sh < -0.1 ? P.tapizS : P.tapiz;
      const fx = x - 240, fy = y - 52; if (!borde && fx >= 0 && fx < 11 && fy >= 0 && fy < 8 * 2 && HALCON[fy >> 1][fx] === '#') c = sh < -0.1 ? P.oroS : P.oro;
      if (!borde && (y === 36 || y === 88) && x > 228 && x < 262 && x % 2) c = P.oroS;
      pset(x, y, c); }
    for (let x = 223; x <= 267; x += 2) linea(x, 104, x, 106 + (x % 3), P.oroS);
    b_sillares(R, 276, 52, 318, 150, [P.t0, P.t1, P.t2, P.t3, P.t4], { alto: 98, ancho: 50, k: 86 });
    rect(276, 52, 318, 54, P.t4); rect(274, 50, 320, 52, P.t3); for (const y of [80, 108, 132]) { rect(278, y, 316, y + 2, P.t3); rect(278, y + 2, 316, y + 2, P.t0); }
    rect(279, 56, 315, 79, P.t0); rect(279, 83, 315, 107, P.t0); rect(279, 111, 315, 131, P.t0); rect(279, 135, 315, 148, P.t0);
    for (let k = 0; k < 7; k++) { const x = 281 + k * 5, y0 = 66 + Math.floor(h(k, 1, 87) * 6); rect(x, y0, x + 3, 79, [P.mapa, P.mapaS, P.cera, P.mapa][k % 4]); rect(x, y0, x + 3, y0, P.ceraL); pset(x + 1, y0 + 6, P.faroR); }
    disco(296, 96, 9, P.globo); for (let y = 87; y <= 105; y++) for (let x = 287; x <= 305; x++) if (Math.hypot(x - 296, y - 96) < 9 && h(x >> 1, y >> 1, 88) < 0.3) pset(x, y, P.isla); disco(293, 93, 2, P.globoL); linea(296, 105, 296, 107, P.oroS); rect(291, 106, 301, 107, P.oro); linea(286, 96, 296, 86, P.oroS);
    for (let k = 0; k < 5; k++) { rect(282 + k * 7, 120 + (k % 2) * 2, 286 + k * 7, 131, [P.t3, P.faroR, P.tapiz, P.mapaS, P.t4][k]); rect(282 + k * 7, 120 + (k % 2) * 2, 286 + k * 7, 120 + (k % 2) * 2, P.ceraL); }
    for (let k = 0; k < 3; k++) { disco(288 + k * 11, 143, 4, P.mapaS); disco(288 + k * 11, 143, 2, P.mapa); }
    // la mesa con el mapa del mar: el tablero en perspectiva, el mapa con islas, dos barquitos y la rosa de los vientos
    poligono([[232, 114], [308, 114], [314, 122], [226, 122]], (x, y) => (y === 114 ? P.t4 : [P.t2, P.t3][(x + y) % 5 === 0 ? 0 : 1]));
    poligono([[238, 115], [302, 115], [306, 121], [234, 121]], (x, y) => (h(x >> 2, y, 89) < 0.4 ? P.mapaMarS : P.mapaMar));
    for (const [cx, cy, r] of [[252, 117, 5], [284, 119, 4], [296, 116, 3]]) for (let y = cy - 2; y <= cy + 2; y++) for (let x = cx - r; x <= cx + r; x++) if (((x - cx) / r) ** 2 + ((y - cy) / 2.2) ** 2 + (h(x, y, 90) - 0.5) * 0.4 < 1) pset(x, y, P.isla);
    for (const [x, y] of [[266, 118], [276, 116]]) { rect(x, y, x + 2, y, P.casco); pset(x + 1, y - 1, P.vela); }
    for (const [dx, dy] of [[0, -2], [0, 2], [-3, 0], [3, 0]]) pset(240 + dx, 119 + dy, P.oro); pset(240, 119, P.faroR);
    rect(226, 122, 314, 127, P.t2); rect(226, 122, 314, 122, P.t4); rect(226, 127, 314, 128, P.t0); for (let x = 230; x < 312; x += 9) pset(x, 125, P.t1);
    for (const x of [230, 308]) { rect(x, 128, x + 4, 150, P.t1); rect(x, 128, x, 150, P.t3); rect(x - 1, 138, x + 5, 140, P.t2); }
    rect(244, 128, 300, 131, P.t1);
    // el suelo de tablas en perspectiva, con la alfombra verde de cenefa roja y dorada
    const tablas = [150, 154, 159, 165, 172, 180];
    for (let r = 0; r < tablas.length - 1; r++) for (let y = tablas[r]; y < tablas[r + 1]; y++) for (let x = 0; x < 320; x++) { const largo = 70 + r * 14, xs = x + h(r, 1, 91) * 60, tab = Math.floor(xs / largo), xx = xs % largo;
      if (y === tablas[r + 1] - 1 || xx < 1) { pset(x, y, P.t0); continue; }
      const veta = Math.sin(xs * 0.11 + y * 2.3 + tab * 4) > 0.86 ? -0.7 : 0, n = 2.1 + (h(tab, r, 91) - 0.5) * 0.9 + luzFuego(x, y) * 0.9 + veta + (y === tablas[r] ? 0.6 : 0) - (y - 150) / 50;
      if ((xx === 4 || xx === largo - 4) && y === tablas[r] + 2) { pset(x, y, P.hierroL); continue; }
      pset(x, y, [P.t0, P.t1, P.t2, P.t3, P.t4][Math.max(1, Math.min(4, Math.floor(n + b_umbral(x, y) - 0.5)))]); }
    poligono([[90, 155], [236, 155], [258, 176], [68, 176]], (x, y) => { const e = Math.min(y - 155, 176 - y, (x - 90 + (y - 155)) , 236 + (y - 155) - x); return e < 1 ? P.alfB : e < 3 ? ((x + y) % 4 < 2 ? P.oro : P.alfB) : ((Math.floor(x / 6) + Math.floor(y / 3)) % 5 === 0 ? P.tapizL : (x + y) % 2 && luzFuego(x, y) < 0.35 ? P.alfS : P.alf); });
    for (let x = 70; x < 258; x += 3) pset(x, 177, P.oroS);
    // el perro que duerme en la piedra del hogar (el cuerpo se pinta en cada fotograma: respira)
  }, enHueco);
  const B = R.buf, m = capa.m;
  // fuera: las nubes de tormenta, el mar y la lluvia, recortados al hueco de la ventana
  R.recorte([W[0], W[1], W[2], W[3]]);
  b_nubesTormenta(R, t, m, HV, W[0], W[2], 0.6, W[1]);
  b_olas(R, t, m, HV, W[3], W[0], W[2]);
  if (Math.cos(t * 1.1) > 0.85) for (const [dx, dy] of [[-3, 0], [3, 0], [0, -3]]) pset(138 + dx, 72 + dy, P.haz);
  for (let k = 0; k < Math.round(40 * ll); k++) { const x = W[0] + ((h(k, 1, 93) * 90 + t * 20) % 80), y = W[1] + ((h(k, 2, 93) * 100 + t * 140) % 92); if (m[Math.round(y) * 320 + Math.round(x)]) { pset(Math.round(x), Math.round(y), P.c6); pset(Math.round(x - 1), Math.round(y - 2), P.c5); } }
  // gotas que resbalan por el cristal (se paran, siguen) y su reguero
  for (let k = 0; k < 9; k++) { const x = W[0] + 3 + Math.round(h(k, 3, 94) * 72), per = 4 + h(k, 4, 94) * 3, u = ((t + k) % per) / per, y0 = 30 + h(k, 5, 94) * 30, y = Math.round(y0 + (u < 0.4 ? u * 20 : 8 + (u - 0.4) * 110)); if (y > W[3] - 1 || !enHueco(x, y)) continue;
    for (let j = 1; j < 6; j++) if (enHueco(x, y - j)) pset(x, y - j, b_mezcla(R.pget(x, y - j), P.gotaL, 0.35)); pset(x, y, P.gotaL); pset(x, y + 1, P.gota); }
  R.recorte(null);
  // el fuego: llamas que lamen, brasas, chispas que suben; y su luz que tiembla en el muro y el suelo
  const fl = Math.sin(t * 7) * 0.5 + Math.sin(t * 13.7) * 0.3 + Math.sin(t * 3.1) * 0.2;
  rect(34, 142, 62, 146, P.t1); rect(36, 140, 58, 142, P.t0); for (let x = 34; x < 62; x += 2) pset(x, 146, h(x, Math.floor(t * 4), 95) < 0.5 ? P.brasa : P.fuego4);
  for (let x = 30; x <= 66; x++) { const c = 1 - Math.abs(x - 48) / 19, alto = Math.max(0, c * (26 + fl * 5) + Math.sin(t * 9 + x * 0.8) * 4 + (h(x, Math.floor(t * 10), 96) - 0.5) * 6);
    for (let j = 0; j < alto; j++) { const u = j / alto, y = 143 - j; if (y < 100) break; const ondula = Math.round(Math.sin(t * 8 + j * 0.4 + x) * u * 1.5); pset(x + ondula, y, u < 0.25 ? P.fuego1 : u < 0.5 ? P.fuego2 : u < 0.8 ? P.fuego3 : P.fuego4); } }
  for (let k = 0; k < 7; k++) { const per = 1.4 + h(k, 1, 97) * 1.2, u = ((t + k * 0.4) % per) / per, x = Math.round(48 + (h(k, 2, 97) - 0.5) * 20 + Math.sin(t * 5 + k) * 3), y = Math.round(128 - u * 28); if (y > 100) pset(x, y, u < 0.5 ? P.fuego2 : P.brasa); }
  { const f = 0.55 + fl * 0.12; for (let y = 90; y < 180; y++) for (let x = 0; x < 120; x++) { if (x >= 24 && x <= 72 && y >= 98 && y <= 148) continue; const d = Math.hypot(x - 48, (y - 140) * 1.3); if (d < 80 && b_umbral(x, y) < (1 - d / 80) * f * 0.6) B[y * 320 + x] = b_mezcla(B[y * 320 + x], P.fuego2, 0.18); } }
  // el perro que duerme en el hogar: respira, mueve una oreja de vez en cuando
  { const r = Math.sin(t * 2.2) > 0 ? 1 : 0, x = 34, y = 156;
    rect(x - 3, y - 7 - r, x + 25, y + 1, P.s0); rect(x - 3, y - 7 - r, x + 1, y - 5, P.s2);
    rect(x + 4, y - 6 - r, x + 20, y, P.perro); rect(x + 4, y - 6 - r, x + 20, y - 6 - r, P.perroL); rect(x + 6, y - 1, x + 20, y, P.perroS);
    rect(x, y - 4, x + 6, y, P.perro); rect(x - 2, y - 2, x, y, P.perroS); pset(x - 2, y - 2, P.hierroS); pset(x + 2, y - 3, P.hierroS);
    pset(x + 4, y - 5 - (t % 6 < 0.3 ? 1 : 0), P.perroS); rect(x + 20, y - 2, x + 24, y - 1, P.perro); pset(x + 25, y - 1, P.perroL);
    if ((t % 3) < 1.5) { const u = (t % 3) / 1.5; pset(x - 3 - Math.round(u * 3), y - 6 - Math.round(u * 5), P.cera); } }
  // las antorchas de los apliques y la vela del alféizar (llamas que tiemblan, con su halo)
  for (const [x, y] of [[100, 54], [274, 54]]) { rect(x - 1, y + 3, x + 1, y + 12, P.t1); rect(x - 3, y + 10, x + 3, y + 11, P.hierro); rect(x - 2, y + 1, x + 2, y + 3, P.hierro);
    const f = Math.sin(t * 10 + x) + Math.sin(t * 16 + x) * 0.5; for (let yy = y - 14; yy < y + 12; yy++) for (let xx = x - 12; xx <= x + 12; xx++) { const d = Math.hypot(xx - x, (yy - y) * 1.1); if (d > 3 && d < 12 && b_umbral(xx, yy) < (1 - d / 12) * 0.5) B[yy * 320 + xx] = b_mezcla(B[yy * 320 + xx], P.fuego2, 0.25); }
    disco(x + f * 0.4, y - 1, 2.6, P.fuego3); disco(x + f * 0.6, y - 3, 1.8, P.fuego2); pset(x + Math.round(f), y - 6, P.fuego2); pset(x, y - 2, P.fuego1); }
  { const f = Math.sin(t * 12) * 0.5; pset(129 + Math.round(f), 99, P.fuego2); pset(129, 100, P.fuego1); pset(130, 100, P.fuego2); pset(129 + Math.round(f), 98, P.fuego3); }
  return { encuadre: 'castillo', camara: 'ventana', suelo: 150, libre: [60, 226], ventana: W, chimenea: [24, 98, 72, 148], mesa: { x: [226, 314], tablero: 122, mapa: [238, 114, 306, 121] }, perro: [44, 154], alfombra: [68, 155, 258, 176] };
}
// la paleta de la conspiración: metal oscuro, piedra, latón, el gas naranja, la luz azul, el verde de los tanques
const b_PD = pal({
  m0: '#0c0e14', m1: '#151922', m2: '#1f2530', m3: '#2c3440', m4: '#3e4856', m5: '#56627a',
  q0: '#121014', q1: '#1e1a20', q2: '#2a242a', q3: '#3a3238', q4: '#4c4248',
  laton: '#8a6a30', latonL: '#c8a050', latonS: '#5a4220', latonW: '#f0d890',
  g0: '#4a1a0c', g1: '#7a2c10', g2: '#b04a16', g3: '#e07828', g4: '#ffa844', g5: '#ffd890',
  a0: '#0c2440', a1: '#16406e', a2: '#3a86cc', a3: '#86ccff', a4: '#e0f4ff',
  vapor: '#8a929e', vaporL: '#c4cad2', vaho: '#e8dcd0', vahoS: '#c8b8a8',
  verde: '#4ae08a', rojo: '#e0503a', ambar: '#ffb030', ambarL: '#ffe08a',
  v0: '#081e18', v1: '#0e3228', v2: '#17503e', v3: '#2a7e5e', v4: '#6ad0a0', v5: '#c8ffe2', vS: '#05140f',
  z0: '#141c1a', z1: '#1c2826', z2: '#263432', z3: '#32423e', z4: '#42544e',
  banco: '#3a4048', bancoL: '#5a6470', cristal: '#9ab8c0', pantalla: '#0a2a1e', piel: '#5a8a74', pielL: '#7ab094', rizo: '#14201c', ojo: '#e4eef4', ojoS: '#8a9aa8',
});

// el gas naranja del navegante dentro del cristal (x0–x1, y0–y1): remolinos que suben despacio, más claro en el centro
// del cilindro y oscuro en los bordes; esc: el tamaño de los remolinos
function b_gas(R, t, x0, x1, y0, y1, esc = 1) {
  const B = R.buf, P = b_PD, cols = [P.g0, P.g1, P.g2, P.g3, P.g4, P.g5], cx = (x0 + x1) / 2, rx = (x1 - x0) / 2, f = 1 / esc;
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) {
    const u = (x - cx) / rx, xs = x * f, ys = y * f + t * 6;
    const s = Math.sin(xs * 0.21 + Math.sin(ys * 0.13 + t * 0.7) * 2.2) + Math.sin(ys * 0.17 - xs * 0.09 + Math.sin(xs * 0.11 - t * 0.5) * 1.8) * 0.8;
    const n = 2.6 + s * 0.75 - u * u * 2.2 - (y - y0) / (y1 - y0) * 0.3;
    B[y * 320 + x] = cols[Math.max(0, Math.min(5, Math.floor(n + b_umbral(x, y) - 0.5)))]; }
}

// la silueta difusa que flota dentro del gas: formas suaves (una cabeza grande y un cuerpo que se adelgaza), solo un
// oscurecimiento tramado, sin ojos ni detalle (nunca un monstruo)
function b_silueta(R, cx, cy, s, a = 0.55) {
  const B = R.buf, P = b_PD;
  for (let y = Math.round(cy - 20 * s); y <= cy + 30 * s; y++) for (let x = Math.round(cx - 14 * s); x <= cx + 14 * s; x++) {
    if (x < 0 || x > 319 || y < 0 || y > 179) continue;
    const dc = Math.hypot((x - cx) / (9 * s), (y - (cy - 10 * s)) / (8.5 * s)), dy = (y - (cy + 10 * s)) / (20 * s), dcu = Math.hypot((x - cx) / ((10 - dy * 5) * s), dy);
    const d = Math.min(dc, dcu); if (d > 1) continue; const k = (1 - d) * a * 2;
    if (b_umbral(x, y) < k) B[y * 320 + x] = b_mezcla(B[y * 320 + x], P.g0, 0.72 + (1 - d) * 0.2); else if (d > 0.82 && b_umbral(x, y) < 0.35) B[y * 320 + x] = b_mezcla(B[y * 320 + x], P.g4, 0.4); }
}

// el vaho en el cristal en (cx, cy), radio r, con fuerza f (0–1) y la carita que dibuja el dedo (cara 0–1): el trazo
// limpia el vaho; dentro de recorte [x0, y0, x1, y1] (el cristal)
function b_vaho(R, t, cx, cy, r, f, cara, cl) {
  const P = b_PD, ex = r * 0.38, ey = r * 0.22, sr = r * 0.5, gr = Math.max(1, r / 9);
  const limpio = (x, y) => {
    if (cara > 0.15 && Math.hypot(x - (cx - ex), y - (cy - ey)) <= gr) return true;
    if (cara > 0.35 && Math.hypot(x - (cx + ex), y - (cy - ey)) <= gr) return true;
    if (cara > 0.45) { const a = Math.atan2(y - (cy - r * 0.08), x - cx), d = Math.hypot(x - cx, y - (cy - r * 0.08)), hasta = 0.35 + (Math.PI - 0.7) * Math.min(1, (cara - 0.45) / 0.55);
      if (a > 0.35 && a < hasta && Math.abs(d - sr) <= gr * 0.75) return true; }
    return false; };
  for (let y = Math.floor(cy - r); y <= cy + r + 6; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
    if (x < cl[0] || x > cl[2] || y < cl[1] || y > cl[3]) continue;
    let d = Math.hypot((x - cx) / r, (y - cy) / (r * 0.92)) + (h(x >> 1, y >> 1, 805) - 0.5) * 0.25;
    if (y > cy + r * 0.5 && (x + 3) % Math.max(3, Math.round(r / 3)) === 0) d = Math.min(d, Math.hypot((x - cx) / r, 0) + (y - cy - r * 0.5) / (r * 0.9));   // el goteo
    if (d > 1 || limpio(x, y)) continue;
    const a = f * (d < 0.7 ? 0.62 : 0.62 * (1 - d) / 0.3); if (a <= 0.02) continue;
    R.pset(x, y, b_mezcla(R.pget(x, y), b_umbral(x, y) < 0.3 ? P.vaho : P.vahoS, a)); }
}
// una nube de vapor que sale de (x, y) cada per segundos y sube abriéndose
function b_vapor(R, t, x, y, per, k, dir = -1) {
  const P = b_PD, u = ((t + k * 1.7) % per) / 1.6; if (u > 1) return;
  for (let i = 0; i < 9; i++) { const vx = (h(i, k, 806) - 0.5) * 8 + dir * 4 * u, x1 = x + vx * u * 2, y1 = y - (6 + h(i, k, 807) * 14) * u, r = 1 + u * 3 * h(i, k, 808);
    R.disco(x1, y1, r, u < 0.5 ? P.vaporL : P.vapor); }
}

// un manómetro redondo con la aguja que tiembla
function b_manometro(R, x, y, r, t, k) {
  const P = b_PD; R.disco(x, y, r + 1, P.latonS); R.disco(x, y, r, P.latonL); R.disco(x, y, r - 1, P.a4);
  for (let a = 3.6; a < 6.0; a += 0.35) R.pset(Math.round(x + Math.cos(a) * (r - 2)), Math.round(y + Math.sin(a) * (r - 2)), P.m2);
  const a = 4.2 + 0.9 + Math.sin(t * 2 + k) * 0.3 + Math.sin(t * 13 + k) * 0.05; R.linea(x, y, Math.round(x + Math.cos(a) * (r - 2)), Math.round(y + Math.sin(a) * (r - 2)), P.rojo); R.pset(x, y, P.m0);
}

// un volante de válvula visto de frente
function b_volante(R, x, y, r) { const P = b_PD; for (let a = 0; a < 6.28; a += 0.15) R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), a > 3.6 && a < 5.6 ? P.latonL : P.laton); for (let k = 0; k < 4; k++) { const a = k * 1.57 + 0.4; R.linea(x, y, Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), P.latonS); } R.disco(x, y, 1.5, P.latonL); }

// remaches en una fila
function b_remaches(R, x0, x1, y, paso, c, cL) { for (let x = x0; x <= x1; x += paso) { R.pset(x, y, c); R.pset(x, y - 1, cL); } }

// LA SALA SECRETA (cámara 'general')
function b_salaSecreta(R, t, o) {
  const { pset, rect, disco, linea, poligono } = R, P = b_PD, G = [224, 48, 278, 146], TX = 251;
  const capa = b_capa(R, 'consp-sala', (foto) => {
    // la cúpula oscura con su corona de lucecitas y la cornisa
    for (let y = 0; y < 26; y++) for (let x = 0; x < 320; x++) pset(x, y, [P.m0, P.m1, P.q1][Math.max(0, Math.min(2, Math.floor(y / 12 + h(x >> 3, y >> 2, 810) * 0.6 + b_umbral(x, y) * 0.4)))]);
    for (let x = -10; x < 330; x += 34) linea(160 + (x - 160) * 0.4, 0, x, 22, P.m2);
    rect(0, 22, 319, 27, P.q2); rect(0, 22, 319, 22, P.q4); rect(0, 27, 319, 28, P.m0); b_remaches(R, 4, 316, 25, 8, P.laton, P.latonL);
    // el muro curvo: paneles de metal que se estrechan hacia los lados, con remaches, juntas y pilastras de piedra
    const ang = (x) => Math.asin(Math.max(-1, Math.min(1, (x - 160) / 175)));
    for (let y = 28; y < 128; y++) for (let x = 0; x < 320; x++) { const a = ang(x), panel = Math.floor((a + 1.6) / 0.16), fr = ((a + 1.6) / 0.16) % 1, pil = panel % 4 === 0;
      let n;
      if (pil) { const sill = Math.floor((y - 28) / 9); n = 2 + (h(sill, panel, 811) - 0.5) + ((y - 28) % 9 === 0 ? -1.2 : 0) + (fr < 0.15 ? 0.7 : fr > 0.85 ? -0.7 : 0) + (h(x, y, 812) - 0.5) * 0.6;
        if ((y === 50 || y === 100) && fr > 0.1 && fr < 0.9) { pset(x, y, fr < 0.4 ? P.latonL : P.laton); continue; }
        pset(x, y, [P.q0, P.q1, P.q2, P.q3, P.q4][Math.max(0, Math.min(4, Math.floor(n + b_umbral(x, y) - 0.5)))]); continue; }
      n = 1.9 + (h(panel, 0, 813) - 0.5) * 0.6 - Math.abs(a) * 0.9 + (fr < 0.06 ? -1.2 : fr < 0.14 ? 0.7 : 0) + (y === 70 ? -1.3 : y === 71 ? 0.8 : 0) + (h(x >> 1, y >> 2, 814) - 0.5) * 0.35;
      if ((y === 33 || y === 66 || y === 75 || y === 104) && Math.round(fr * 10) % 3 === 1) { pset(x, y, P.m5); continue; }
      pset(x, y, [P.m0, P.m1, P.m2, P.m3, P.m4][Math.max(0, Math.min(4, Math.floor(n + b_umbral(x, y) - 0.5)))]); }
    // el zócalo de piedra
    b_sillares(R, 0, 108, 319, 127, [P.q0, P.q1, P.q2, P.q3, P.q4], { alto: 10, ancho: 22, k: 815 });
    rect(0, 107, 319, 108, P.laton); rect(0, 107, 319, 107, P.latonL);
    // las lucecitas de la cornisa (las enciende el fotograma) y unas lámparas de pared
    for (const x of [64, 196, 300]) { rect(x - 3, 48, x + 3, 52, P.latonS); rect(x - 2, 52, x + 2, 55, P.ambar); rect(x - 1, 53, x + 1, 54, P.ambarL); for (let y = 56; y < 78; y++) for (let xx = x - (y - 56) / 2; xx <= x + (y - 56) / 2; xx++) if (b_umbral(Math.round(xx), y) < 0.22 * (1 - (y - 56) / 22)) pset(Math.round(xx), y, P.m4); }
    // la puerta acorazada redonda de la izquierda
    disco(36, 98, 31, P.m0); disco(36, 98, 29, (x, y) => [P.latonS, P.laton, P.latonL][Math.max(0, Math.min(2, Math.floor(1.4 - (x - 36) / 30 - (y - 98) / 30 + b_umbral(x, y) * 0.5)))]);
    disco(36, 98, 25, (x, y) => [P.m1, P.m2, P.m3, P.m4][Math.max(0, Math.min(3, Math.floor(1.8 - (x - 36) / 22 - (y - 98) / 30 + b_umbral(x, y) * 0.5)))]);
    for (let k = 0; k < 12; k++) { const a = k * 0.5236; disco(36 + Math.cos(a) * 27, 98 + Math.sin(a) * 27, 1.6, P.latonW); pset(Math.round(36 + Math.cos(a) * 27), Math.round(99 + Math.sin(a) * 27), P.latonS); }
    for (const r of [12, 19]) for (let a = 0; a < 6.28; a += 0.05) pset(Math.round(36 + Math.cos(a) * r), Math.round(98 + Math.sin(a) * r), P.m0);
    b_volante(R, 36, 98, 9); rect(64, 92, 70, 104, P.latonS); rect(65, 93, 69, 103, P.laton);
    // la consola del fondo (la llenan las pantallas del fotograma)
    rect(146, 56, 210, 104, P.m0); rect(147, 57, 209, 103, P.m2); rect(147, 57, 209, 57, P.m4); rect(150, 60, 176, 82, P.m0); rect(180, 60, 206, 82, P.m0);
    rect(150, 86, 206, 100, P.m1); for (let x = 154; x < 204; x += 6) { disco(x, 93, 1.5, P.m3); }
    // el suelo pulido: piedra oscura con anillos de latón incrustados y el reflejo del muro
    for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const e = Math.hypot((x - 126) / 2.6, (y - 152)), anillo = Math.abs(e - 18) < 0.6 || Math.abs(e - 34) < 0.7 || Math.abs(e - 54) < 0.8,
        losa = (Math.floor(Math.atan2(y - 152, (x - 126) / 2.6) * 4) + Math.floor(e / 16)) % 2, n = 1.6 + losa * 0.4 + (y - 128) / 60 + (h(x >> 2, y >> 1, 816) - 0.5) * 0.5;
      pset(x, y, anillo ? (y < 152 ? P.laton : P.latonS) : [P.q0, P.q1, P.q2, P.q3][Math.max(0, Math.min(3, Math.floor(n + b_umbral(x, y) - 0.5)))]); }
    rect(0, 128, 319, 128, P.m0);
    // el tanque del navegante: la tapa con pernos, las tuberías al techo, la base de latón con manómetros y la tubería
    // del suelo hasta la válvula
    for (const x of [232, 268]) { rect(x - 3, 0, x + 3, 36, P.m1); rect(x - 2, 0, x - 1, 36, P.m3); rect(x + 2, 0, x + 3, 36, P.m0); for (const y of [12, 28]) { rect(x - 4, y, x + 4, y + 2, P.laton); rect(x - 4, y, x + 4, y, P.latonL); } }
    poligono([[218, 48], [222, 38], [280, 38], [284, 48]], (x, y) => [P.m1, P.m2, P.m3, P.m4][Math.max(0, Math.min(3, Math.floor(2.6 - (x - 218) / 22 + b_umbral(x, y) * 0.5)))]);
    rect(216, 46, 286, 49, P.laton); rect(216, 46, 286, 46, P.latonL); b_remaches(R, 219, 284, 48, 5, P.latonS, P.latonW);
    rect(216, 146, 286, 148, P.laton); rect(216, 146, 286, 146, P.latonL);
    poligono([[214, 148], [288, 148], [292, 158], [210, 158]], (x, y) => [P.latonS, P.laton, P.latonL][Math.max(0, Math.min(2, Math.floor(1.8 - (x - 214) / 40 + ((y - 148) % 4 === 0 ? -0.8 : 0) + b_umbral(x, y) * 0.5)))]);
    rect(210, 158, 292, 159, P.m0);
    // la tubería que sale de la base y corre por el zócalo hasta la válvula
    rect(208, 116, 216, 120, P.m2); rect(160, 116, 216, 120, P.m2); rect(160, 116, 216, 116, P.m4); rect(160, 120, 216, 120, P.m0); rect(212, 116, 216, 150, P.m2); rect(212, 116, 212, 150, P.m4);
    rect(196, 112, 204, 124, P.latonS); rect(197, 113, 203, 123, P.laton); rect(156, 114, 160, 122, P.m3);
    b_salaEstandarte(R); b_salaEstante(R);
    foto();
  }, (x, y) => x >= G[0] && x <= G[2] && y >= G[1] && y <= G[3]);
  const B = R.buf;
  // la luz que tiembla: la corona de lucecitas, el haz azul de la mesa y el naranja del tanque sobre el muro y el suelo
  for (let k = 0; k < 15; k++) { const x = 10 + k * 18, on = Math.sin(t * 2 + k * 1.3) > -0.6; pset(x, 30, on ? P.ambarL : P.latonS); if (on) { pset(x - 1, 30, P.ambar); pset(x + 1, 30, P.ambar); } }
  const pulso = 0.85 + Math.sin(t * 1.7) * 0.1 + Math.sin(t * 5.3) * 0.05;
  for (let y = 60; y < 180; y++) for (let x = 150; x < 320; x++) { if (x >= G[0] && x <= G[2] && y >= G[1] && y <= G[3]) continue; const d = Math.hypot((x - TX) / 1.3, y - 120); if (d < 90) { const a = (1 - d / 90) ** 2 * 0.42 * pulso; if (a > 0.02) B[y * 320 + x] = b_mezcla(B[y * 320 + x], P.g3, a); } }
  for (let y = 96; y < 180; y++) for (let x = 60; x < 196; x++) { const d = Math.hypot((x - 126) / 1.8, (y - 140) * 1.1); if (d < 40) { const a = (1 - d / 40) ** 2 * 0.35; B[y * 320 + x] = b_mezcla(B[y * 320 + x], P.a2, a); } }
  // la consola: dos pantallas de puntos que cambian y los pilotos que parpadean
  R.recorte([150, 60, 176, 82]); for (let k = 0; k < 14; k++) { const x = 151 + ((k * 7 + Math.floor(t * 3)) % 25), y = 61 + Math.round(10 + Math.sin(k * 0.9 + t) * 8); pset(x, y, k % 4 ? P.a2 : P.a4); } R.recorte(null);
  for (let x = 181; x < 206; x++) { const y = Math.round(71 + Math.sin(x * 0.5 - t * 4) * 5 * Math.sin(t * 0.7 + x * 0.05)); pset(x, y, P.verde); }
  for (let k = 0; k < 9; k++) pset(154 + k * 6, 93, Math.sin(t * (2 + k % 3) + k * 2) > 0.2 ? [P.verde, P.ambar, P.rojo][k % 3] : P.m3);
  // el holograma: un racimo de estrellas que gira despacio sobre la mesa, con su cono de luz
  for (let y = 100; y < 146; y++) { const w = 8 + (y - 100) * 0.65; for (let x = Math.round(126 - w); x <= 126 + w; x++) if (b_umbral(x, y) < 0.1 + (y - 100) / 46 * 0.12 && Math.abs(x - 126) > w * 0.2) B[y * 320 + x] = b_mezcla(B[y * 320 + x], P.a3, 0.3); }
  for (let k = 0; k < 40; k++) { const a = h(k, 1, 820) * 6.28 + t * 0.4, el = (h(k, 2, 820) - 0.5) * 2.4, r = 6 + h(k, 3, 820) * 16, x = Math.round(126 + Math.cos(a) * r * Math.cos(el)), y = Math.round(114 + Math.sin(el) * r * 0.7 + Math.sin(a) * r * 0.2);
    pset(x, y, Math.sin(a) > 0 ? (k % 5 ? P.a3 : P.a4) : P.a2); }
  // el tanque: el gas que remolina, las burbujas, la silueta difusa, los reflejos y el borde del cristal
  b_gas(R, t, G[0], G[2], G[1], G[3], 0.8);
  b_silueta(R, TX + Math.sin(t * 0.6) * 3, 92 + Math.sin(t * 0.9) * 3, 1, 0.5);
  for (let k = 0; k < 12; k++) { const per = 2 + h(k, 1, 821) * 2, u = ((t + k * 0.6) % per) / per, x = Math.round(G[0] + 5 + h(k, 2, 821) * 44 + Math.sin(t * 3 + k) * 1.5), y = Math.round(G[3] - 2 - u * 86); pset(x, y, P.g5); if (k % 3 === 0) { pset(x + 1, y, P.g4); pset(x, y - 1, P.g4); } }
  for (let y = G[1]; y <= G[3]; y++) { pset(G[0], y, P.g0); pset(G[0] + 1, y, P.g1); pset(G[2], y, P.g0); pset(G[2] - 1, y, P.g1); if ((y + 1) % 3) { pset(G[0] + 5, y, P.g5); pset(G[0] + 6, y, b_mezcla(R.pget(G[0] + 6, y), P.g5, 0.5)); } if (y % 4 === 0) pset(G[2] - 6, y, P.g4); }
  // los manómetros y la válvula que suelta vapor
  b_manometro(R, 230, 153, 4, t, 1); b_manometro(R, 272, 153, 4, t, 2); b_volante(R, 251, 153, 4);
  b_vapor(R, t, 200, 112, 3.6, 1); b_vapor(R, t, 218, 42, 4.4, 2, -1);
  b_salaVida(R, t);
  // el vaho con la carita
  let vaho = null;
  if (o.vaho) { const [vx, vy] = o.vaho === true ? [231, 136] : o.vaho; vaho = [vx, vy]; b_vaho(R, t, vx, vy, 9, o.vahoF ?? 1, o.caraVaho ?? 0, [G[0] + 1, G[1], G[2] - 1, G[3]]); }
  return { encuadre: 'sala', camara: 'general', suelo: 150, libre: [40, 214], laterales: [[40, 80], [172, 214]], tanque: { cristal: G, centro: [TX, 92], base: 158, valvula: [200, 112] }, mesa: { centro: [126, 152], rx: 44, tablero: 145, holograma: [126, 114] }, puerta: [36, 98, 31], consola: [146, 56, 210, 104], vaho };
}
// EL TANQUE DE CERCA (cámara 'tanque')
function b_tanqueCerca(R, t, o) {
  const { pset, rect, disco, linea, poligono } = R, P = b_PD, G = [84, 16, 236, 172];
  b_capa(R, 'consp-tanque', () => {
    // el muro de la cámara: paneles remachados que se oscurecen hacia los lados, tuberías gruesas, volantes
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const pnl = Math.floor(x / 26), fr = x % 26, n = 2 + (h(pnl, Math.floor(y / 44), 830) - 0.5) * 0.7 - Math.abs(x - 160) / 140 + (fr === 0 ? -1.4 : fr === 1 ? 0.7 : 0) + (y % 44 === 0 ? -1.3 : y % 44 === 1 ? 0.6 : 0) + (h(x >> 1, y >> 2, 831) - 0.5) * 0.35;
      pset(x, y, [P.m0, P.m1, P.m2, P.m3, P.m4][Math.max(0, Math.min(4, Math.floor(n + b_umbral(x, y) - 0.5)))]); }
    for (let y = 4; y < 180; y += 44) for (let x = 3; x < 320; x += 26) { pset(x, y, P.m4); pset(x + 20, y, P.m4); pset(x, y + 38, P.m4); pset(x + 20, y + 38, P.m4); }
    for (const [x, w] of [[14, 12], [298, 12], [52, 6], [262, 6]]) { for (let y = 0; y < 180; y++) for (let i = 0; i < w; i++) { const u = i / (w - 1); pset(x + i, y, [P.m1, P.m3, P.m4, P.m3, P.m2, P.m1][Math.floor(u * 5.99)]); }
      for (let y = x > 270 ? 66 : 20; y < 180; y += 46) { rect(x - 2, y, x + w + 1, y + 3, P.laton); rect(x - 2, y, x + w + 1, y, P.latonL); rect(x - 2, y + 3, x + w + 1, y + 3, P.latonS); } }
    // la tapa del tanque (tranquila: bajo la barra del año) y el anillo de latón de la base, con pernos
    for (let y = 0; y < 16; y++) for (let x = 76; x <= 244; x++) pset(x, y, [P.m1, P.m2, P.m2, P.m3][Math.max(0, Math.min(3, Math.floor(2 - Math.abs(x - 130) / 70 + b_umbral(x, y) * 0.5)))]);
    rect(76, 14, 244, 16, P.latonS); rect(76, 14, 244, 14, P.laton);
    for (let y = 172; y < 178; y++) for (let x = 76; x <= 244; x++) pset(x, y, [P.latonS, P.laton, P.latonL, P.latonW][Math.max(0, Math.min(3, Math.floor(2 - Math.abs(x - 120) / 60 + (y === 172 ? 1 : 0) - (y > 176 ? 1 : 0) + b_umbral(x, y) * 0.6)))]);
    for (let x = 82; x < 242; x += 12) { pset(x, 175, P.latonS); pset(x - 1, 174, P.latonW); }
    // la rejilla del suelo
    for (let y = 178; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, (x % 4 === 0 || y === 178) ? P.m0 : P.m3);
    // los manómetros y los respiraderos de los lados (fuera de la esquina de Atom)
    rect(28, 64, 50, 104, P.m0); rect(29, 65, 49, 103, P.m2); rect(272, 74, 294, 114, P.m0); rect(273, 75, 293, 113, P.m2);
    for (const [x, y] of [[20, 140], [300, 140]]) { rect(x - 7, y - 4, x + 7, y + 4, P.m0); for (let k = -5; k <= 5; k += 2) rect(x + k, y - 3, x + k, y + 3, P.m3); }
    b_tanqueCercaFijo(R);
  });
  const B = R.buf;
  b_manometro(R, 39, 76, 7, t, 3); b_manometro(R, 39, 94, 5, t, 4); b_manometro(R, 283, 88, 7, t, 5); b_volante(R, 283, 104, 6);
  for (let k = 0; k < 3; k++) pset(32 + k * 7, 101, Math.sin(t * 3 + k * 2) > 0 ? [P.verde, P.ambar, P.rojo][k] : P.m3);
  b_tanqueCercaVida(R, t);
  b_vapor(R, t, 20, 136, 3.8, 3); b_vapor(R, t, 300, 136, 4.6, 4, 1);
  // el gas en grande, la silueta difusa, las burbujas
  b_gas(R, t, G[0], G[2], G[1], G[3], 2.2);
  b_silueta(R, 160 + Math.sin(t * 0.5) * 6, 80 + Math.sin(t * 0.8) * 4, 2.6, 0.45);
  for (let k = 0; k < 18; k++) { const per = 2.5 + h(k, 1, 832) * 2.5, u = ((t + k * 0.5) % per) / per, x = Math.round(G[0] + 8 + h(k, 2, 832) * 136 + Math.sin(t * 2 + k) * 3), y = Math.round(G[3] - 4 - u * 150), r = 1 + (k % 3);
    if (y < G[1] + 2) continue; for (let a = 0; a < 6.28; a += 0.4) pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r), P.g4); pset(x - Math.round(r / 2), y - Math.round(r / 2), P.g5); }
  // el cristal: los bordes oscuros por la curva, los reflejos largos, las gotitas de condensación y el reflejo pálido
  for (let y = G[1]; y <= G[3]; y++) { for (let i = 0; i < 6; i++) { B[y * 320 + G[0] + i] = b_mezcla(B[y * 320 + G[0] + i], P.m0, 0.6 - i * 0.1); B[y * 320 + G[2] - i] = b_mezcla(B[y * 320 + G[2] - i], P.m0, 0.6 - i * 0.1); }
    for (let i = 0; i < 4; i++) B[y * 320 + 98 + i] = b_mezcla(B[y * 320 + 98 + i], P.g5, i === 1 ? 0.7 : 0.35); if (y % 3) B[y * 320 + 106] = b_mezcla(B[y * 320 + 106], P.g5, 0.4); B[y * 320 + 220] = b_mezcla(B[y * 320 + 220], P.g4, 0.4); }
  for (let k = 0; k < 60; k++) { const x = G[0] + 8 + Math.floor(h(k, 1, 833) * 136), y = G[1] + 6 + Math.floor(h(k, 2, 833) * 140); pset(x, y, P.g5); pset(x, y + 1, P.g1); }
  for (let k = 0; k < 4; k++) { const per = 5 + k, u = ((t + k * 1.9) % per) / per, x = G[0] + 20 + k * 34, y = Math.round(G[1] + 20 + u * 120); for (let j = 0; j < 8; j++) if (y - j > G[1]) pset(x, y - j, b_mezcla(R.pget(x, y - j), P.g5, 0.3)); pset(x, y, P.g5); pset(x, y + 1, P.g1); }
  if (o.reflejo != null) for (let y = 116; y < G[3]; y++) for (let x = o.reflejo - 12; x <= o.reflejo + 12; x++) if (x > G[0] && x < G[2] && Math.hypot((x - o.reflejo) / 12, (y - 140) / 22) < 1 && b_umbral(x, y) < 0.35) pset(x, y, b_mezcla(R.pget(x, y), P.g5, 0.35));
  let vaho = null;
  if (o.vaho) { const [vx, vy] = o.vaho === true ? [160, 160] : o.vaho; vaho = [vx, vy]; b_vaho(R, t, vx, vy, 13, o.vahoF ?? 1, o.caraVaho ?? 0, [G[0] + 6, G[1], G[2] - 6, G[3]]); }
  return { encuadre: 'sala', camara: 'tanque', suelo: 179, libre: [40, 280], tanque: { cristal: G, centro: [160, 80], base: 172 }, vaho };
}
// una silueta dormida encogida dentro de un tanque de cultivo (cabeza y bulto, sin detalle de cuerpo), tramada
function b_durmiente(R, cx, cy, s, c, a = 0.6) {
  for (let y = Math.round(cy - 12 * s); y <= cy + 12 * s; y++) for (let x = Math.round(cx - 9 * s); x <= cx + 9 * s; x++) {
    const dc = Math.hypot((x - (cx - 1 * s)) / (4.2 * s), (y - (cy - 7.5 * s)) / (4.2 * s)), dcu = Math.hypot((x - cx) / (6.5 * s), (y - (cy + 3 * s)) / (9 * s)), d = Math.min(dc, dcu);
    if (d < 1 && b_umbral(x, y) < a * (d < 0.75 ? 1 : (1 - d) * 4)) R.pset(x, y, c); }
}

// Hayt en su tanque: la cabeza con los rizos, los ojos de metal que destellan y los hombros en sombra (escala s)
function b_hayt(R, cx, cy, s, t) {
  const P = b_PD;
  for (let y = Math.round(cy + 5 * s); y <= cy + 22 * s; y++) for (let x = Math.round(cx - 11 * s); x <= cx + 11 * s; x++) { const hom = Math.hypot((x - cx) / (10 * s), (y - (cy + 10 * s)) / (4 * s)), tor = Math.abs(x - cx) < (8 - (y - cy - 10 * s) / s * 0.25) * s && y > cy + 10 * s, fade = 1 - (y - cy - 5 * s) / (17 * s);
    if ((hom < 1 || tor) && b_umbral(x, y) < 0.75 * fade) R.pset(x, y, b_umbral(x, y) < 0.3 ? P.v2 : P.v1); }
  R.rect(Math.round(cx - 1.5 * s), Math.round(cy + 3.5 * s), Math.round(cx + 1.5 * s), Math.round(cy + 6 * s), P.piel);
  R.disco(cx, cy, 4.6 * s, (x, y) => ((x - cx) < -1 * s ? P.pielL : P.piel));
  for (let k = 0; k < 15; k++) { const a = Math.PI * (0.86 + k * 0.092), r = (4.4 + (k % 2) * 0.9) * s, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * 0.95 - 0.6 * s; R.disco(x, y, (1.3 + (k % 2) * 0.4) * s, P.rizo); R.pset(Math.round(x - 0.5 * s), Math.round(y - 0.6 * s), P.v3); }
  for (let k = 0; k < 6; k++) { const x = cx - 3.2 * s + k * 1.3 * s; R.disco(x, cy - 4 * s + (k % 2) * 0.6 * s, 1.2 * s, P.rizo); }
  const br = Math.sin(t * 3) > 0.6, ex = Math.max(1, Math.round(1.6 * s)), ey = Math.round(cy + 0.5 * s);
  for (const dx of [-ex, ex]) { const x = Math.round(cx + dx); R.pset(x, ey, br ? C.blanco : P.ojo); if (s > 1.2) { R.pset(x + 1, ey, P.ojoS); R.pset(x, ey + 1, P.ojoS); } if (br) { R.pset(x, ey - 1, P.ojo); R.pset(x - 1, ey, P.ojoS); R.pset(x + 1, ey, P.ojoS); } }
}
// un tanque de cultivo verde (centro cx, cristal de x0 a x1 y de yt a yb; s escala): tapa, cristal con el líquido
// iluminado, la silueta dormida y la base con su piloto. Lo fijo; las burbujas las pone el fotograma
function b_tanqueVerde(R, cx, w, yt, yb, s, k, vivo = 1) {
  const P = b_PD, x0 = Math.round(cx - w / 2), x1 = Math.round(cx + w / 2), cols = [P.vS, P.v0, P.v1, P.v2, P.v3, P.v4];
  for (let y = yt; y <= yb; y++) for (let x = x0; x <= x1; x++) { const u = (x - cx) / (w / 2), n = (2.3 + vivo * 0.9) - u * u * 2.4 - (y - yt) / (yb - yt) * 0.5 + (Math.sin(y * 0.6 / s + x * 0.2) > 0.9 ? 0.6 : 0); R.pset(x, y, cols[Math.max(0, Math.min(5, Math.floor(n + b_umbral(x, y) - 0.5)))]); }
  b_durmiente(R, cx + (h(k, 1, 840) - 0.5) * w * 0.15, (yt + yb) / 2 + 2 * s, w / 26 * 1.1, P.v0, 0.8);
  for (let y = yt; y <= yb; y++) { R.pset(x0, y, P.vS); R.pset(x1, y, P.vS); if (w > 10) R.pset(x0 + Math.max(1, Math.round(w * 0.18)), y, P.v5); }
  const tc = Math.max(2, Math.round(5 * s)), tb = Math.max(3, Math.round(8 * s));
  for (let y = yt - tc; y < yt; y++) for (let x = x0 - 1; x <= x1 + 1; x++) R.pset(x, y, y === yt - tc ? P.m4 : x < cx ? P.m3 : P.m2);
  for (let y = yb + 1; y <= yb + tb; y++) for (let x = x0 - 2; x <= x1 + 2; x++) R.pset(x, y, y === yb + 1 ? P.laton : y === yb + tb ? P.m0 : x < cx - w * 0.2 ? P.m3 : P.m2);
  if (s > 0.5) { R.linea(cx - w * 0.2, yt - tc, cx - w * 0.15, yt - tc - 6 * s, P.m1); R.linea(cx + w * 0.25, yt - tc, cx + w * 0.3, yt - tc - 9 * s, P.m1); }
  return { x0, x1, yt, yb, base: yb + tb, piloto: [Math.round(cx + w * 0.3), Math.round(yb + tb / 2)] };
}
// la perspectiva de la nave del laboratorio: la escala f (1 cerca) → el suelo, el techo y las paredes
const b_LAB = { fx: 160, fy: 78, suelo: (f) => 78 + 92 * f, techo: (f) => 78 - 70 * f, pared: (f, lado) => 160 + lado * 190 * f };

const b_LAB_TANQUES = [0.43, 0.5, 0.6, 0.75, 0.95];

// EL LABORATORIO DE LOS TLEILAXU (cámara 'general')
function b_labTleilaxu(R, t, o) {
  const { pset, rect, disco, linea, poligono } = R, P = b_PD, L = b_LAB, FB = 0.4, HT = [142, 58, 178, 104];
  const capa = b_capa(R, 'consp-lab', () => {
    const tanques = [];
    // el techo oscuro con las vigas que fugan y las bandejas de cables
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, P.z0);
    for (let y = 0; y < L.techo(FB); y++) for (let x = 0; x < 320; x++) pset(x, y, b_umbral(x, y) < 0.3 + (1 - y / 50) * 0.3 ? P.m0 : P.m1);
    for (let k = -6; k <= 6; k++) linea(160 + k * 8, L.techo(FB), 160 + k * 60, 0, P.m2);
    for (const f of [0.5, 0.62, 0.78, 0.98]) { const y = Math.round(L.techo(f)), x0 = Math.round(L.pared(f, -1)), x1 = Math.round(L.pared(f, 1)); rect(x0, y - Math.round(3 * f), x1, y, P.m2); rect(x0, y - Math.round(3 * f), x1, y - Math.round(3 * f), P.m3); }
    // las paredes laterales: azulejos verdosos que fugan, con dos tuberías a lo largo
    for (const lado of [-1, 1]) poligono(lado < 0 ? [[0, 0], [L.pared(FB, -1), L.techo(FB)], [L.pared(FB, -1), L.suelo(FB)], [0, 180]] : [[320, 0], [L.pared(FB, 1), L.techo(FB)], [L.pared(FB, 1), L.suelo(FB)], [320, 180]], (x, y) => {
      const f = Math.abs(x - 160) / 190, yr = (y - 78) / Math.max(0.01, f), fila = Math.floor(yr / 10), col = Math.floor(Math.log(Math.max(0.01, f)) * 22);
      const junta = Math.abs(yr - fila * 10) < 1 / f || h(col, 0, 841) < 0;
      return junta ? P.z1 : [P.z1, P.z2, P.z3][Math.max(0, Math.min(2, Math.floor(1.4 + (h(col, fila, 842) - 0.5) * 0.8 + b_umbral(x, y) * 0.4 - (1 - f) * 0.6)))]; });
    for (const lado of [-1, 1]) for (const [hy, c] of [[-40, P.m3], [-36, P.laton], [30, P.m3]]) { const xa = L.pared(1, lado), xb = L.pared(FB, lado); linea(xa, 78 + hy, xb, 78 + hy * FB, c); linea(xa, 79 + hy, xb, 78 + hy * FB + 1, P.m0); }
    // el muro del fondo con su tanque grande, las tuberías y los paneles
    for (let y = Math.round(L.techo(FB)); y <= L.suelo(FB); y++) for (let x = Math.round(L.pared(FB, -1)); x <= L.pared(FB, 1); x++) pset(x, y, (x % 12 === 0 || y % 8 === 0) ? P.z1 : b_umbral(x, y) < 0.5 ? P.z2 : P.z3);
    for (const x of [96, 112, 208, 224]) { rect(x, 50, x + 2, 112, P.m2); rect(x, 50, x, 112, P.m4); }
    rect(120, 64, 134, 92, P.m0); rect(121, 65, 133, 91, P.pantalla); rect(186, 64, 200, 92, P.m0); rect(187, 65, 199, 91, P.pantalla);
    // el suelo de baldosas mojadas que fugan, con la rejilla del pasillo y los reflejos verdes de los tanques
    for (let y = Math.ceil(L.suelo(FB)); y < 180; y++) { const f = (y - 78) / 92; for (let x = 0; x < 320; x++) { const xr = (x - 160) / f, fila = Math.floor(1 / f * 12), junta = Math.abs(xr % 24) < 1 / f + 0.3 || Math.abs((1 / f * 12) - fila) < 0.12 * (1 / f);
      if (Math.abs(xr) < 26) { pset(x, y, Math.abs(xr) > 24 ? P.laton : (Math.round(xr) % 5 === 0 || y % 3 === 0) ? P.m2 : P.m3); continue; }
      pset(x, y, junta ? P.z0 : [P.z1, P.z2, P.z3][Math.max(0, Math.min(2, Math.floor(1 + f * 1.2 + (h(Math.floor(xr / 24), fila, 843) - 0.5) * 0.7 + b_umbral(x, y) * 0.4 - 0.3)))]); } }
    // los tanques de las hileras, de lejos a cerca (lo lejos se apaga)
    for (const lado of [-1, 1]) for (const f of b_LAB_TANQUES) { const cx = Math.round(160 + lado * 150 * f), yb = Math.round(L.suelo(f) - 12 * f), yt = Math.round(yb - 96 * f), w = Math.round(30 * f);
      tanques.push({ ...b_tanqueVerde(R, cx, w, yt, yb, f, Math.round(f * 100) + lado, f < 0.6 ? 0.6 : 1), f, cx, w }); }
    for (const tq of tanques) for (let y = tq.base + 1; y < Math.min(180, tq.base + 40 * tq.f); y++) for (let x = tq.x0; x <= tq.x1; x++) if (b_umbral(x, y) < 0.45 * (1 - (y - tq.base) / (40 * tq.f))) pset(x, y, b_mezcla(R.pget(x, y), P.v3, 0.5));
    // el tanque grande del fondo
    tanques.push({ ...b_tanqueVerde(R, 160, HT[2] - HT[0], HT[1], HT[3], 1.1, 77, 1.3), f: FB, cx: 160, w: HT[2] - HT[0], central: true });
    for (let y = HT[3] + 10; y < 140; y++) for (let x = 140; x < 181; x++) if (b_umbral(x, y) < 0.5 * (1 - (y - HT[3] - 10) / 26)) pset(x, y, b_mezcla(R.pget(x, y), P.v3, 0.5));
    // cables que bajan del techo y serpentean por el suelo
    for (let k = 0; k < 4; k++) { const x0 = 40 + k * 80; let px = x0, py = 0; for (let y = 0; y < 30; y++) { const x = x0 + Math.sin(y * 0.15 + k) * 4; pset(Math.round(x), y, P.m0); } }
    b_labFijo(R);
    return tanques;
  });
  const tanques = capa.info;
  // el tanque grande: si o.hayt, Hayt en él (si no, una silueta dormida, ya pintada)
  if (o.hayt) { R.recorte([HT[0] + 1, HT[1], HT[2] - 1, HT[3]]); for (let y = HT[1]; y <= HT[3]; y++) for (let x = HT[0] + 1; x < HT[2]; x++) { const u = (x - 160) / 18; pset(x, y, [P.v1, P.v2, P.v3, P.v4][Math.max(0, Math.min(3, Math.floor(3.2 - u * u * 2.4 + b_umbral(x, y) - 0.5 - (y - HT[1]) / 60)))]); }
    b_hayt(R, 160, 72 + Math.round(Math.sin(t * 0.8) * 1.5), 1.4, t); pset(HT[0] + 6, HT[1] + 3, P.v5); R.recorte(null); for (let y = HT[1]; y <= HT[3]; y++) { pset(HT[0] + 6, y, P.v5); } }
  // las burbujas de cada tanque y sus pilotos que parpadean
  for (const tq of tanques) { const n = Math.max(1, Math.round(tq.w / 8));
    for (let k = 0; k < n; k++) { const per = 1.6 + h(k, tq.cx, 844) * 1.5, u = ((t + k * 0.7 + tq.cx * 0.1) % per) / per, x = Math.round(tq.x0 + 2 + h(k, tq.cx, 845) * (tq.x1 - tq.x0 - 4)), y = Math.round(tq.yb - 1 - u * (tq.yb - tq.yt - 2)); pset(x, y, P.v5); }
    const on = Math.sin(t * 2.5 + tq.cx) > -0.3; pset(tq.piloto[0], tq.piloto[1], on ? (tq.central ? P.ambar : P.verde) : P.m3); if (tq.f > 0.7 && on) pset(tq.piloto[0] + 1, tq.piloto[1], P.verde); }
  b_labVida(R, t);
  // las pantallas del fondo, las lámparas colgadas que se mecen con su cono de luz, los técnicos diminutos del fondo
  for (const [x0, ph] of [[121, 0], [187, 2]]) for (let x = x0; x <= x0 + 12; x++) pset(x, Math.round(78 + Math.sin(x * 0.8 - t * 5 + ph) * 4 * Math.sin(t + ph)), P.v4);
  for (const [x, y, L0, k] of [[104, 0, 22, 0], [216, 0, 22, 1], [160, 0, 30, 2]]) { const sw = Math.sin(t * 0.9 + k * 2) * 2, lx = Math.round(x + sw), ly = y + L0; linea(x, y, lx, ly, P.m0); rect(lx - 4, ly, lx + 4, ly + 2, P.m3); rect(lx - 3, ly + 3, lx + 3, ly + 3, P.v5);
    for (let yy = ly + 4; yy < ly + 34; yy++) { const w = (yy - ly) * 0.45; for (let xx = Math.round(lx - w); xx <= lx + w; xx++) if (b_umbral(xx, yy) < 0.16 * (1 - (yy - ly) / 34)) pset(xx, yy, P.v3); } }
  for (let k = 0; k < 2; k++) { const per = 14, u = ((t + k * 7) % per) / per, dir = k ? -1 : 1, x = Math.round(dir > 0 ? 128 + u * 64 : 192 - u * 64), y = 116 + k * 3, paso = Math.floor(t * 6) % 2;
    rect(x - 1, y - 9, x + 1, y - 3, P.vapor); rect(x - 1, y - 11, x + 1, y - 10, P.pielL); rect(x - 1, y - 2, x - 1, y - paso, P.m0); rect(x + 1, y - 2, x + 1, y - 1 + paso, P.m0); if (k === 0) rect(x + 2, y - 7, x + 3, y - 5, P.cristal); }
  return { encuadre: 'laboratorio', camara: 'general', suelo: 150, libre: [50, 270], tanque: { cristal: HT, centro: [160, 72] }, fuga: [160, 78], bancos: [[0, 46, 146], [276, 320, 146]] };
}
// LOS TRES TANQUES DE CERCA (cámara 'tanques')
function b_tanquesCerca(R, t, o) {
  const { pset, rect, disco, linea, poligono } = R, P = b_PD, XS = [63, 159, 255], W = 58, YT = 26, YB = 136;
  b_capa(R, 'consp-tanques', () => {
    // el muro de azulejos verdosos con su luz de abajo, las tuberías entre los tanques y el zócalo
    for (let y = 0; y < 158; y++) for (let x = 0; x < 320; x++) { const junta = x % 10 === 0 || y % 10 === 0, n = 1.6 + (h(x / 10 | 0, y / 10 | 0, 850) - 0.5) * 0.6 + (y / 158) * 0.6 - (y < 20 ? 0.5 : 0) + ((x % 10 === 1 || y % 10 === 1) ? 0.4 : 0);
      pset(x, y, junta ? P.z0 : [P.z1, P.z2, P.z3, P.z4][Math.max(0, Math.min(3, Math.floor(n + b_umbral(x, y) - 0.5)))]); }
    b_tanquesMuro(R);
    for (const x of [111, 207]) { for (let y = 0; y < 158; y++) for (let i = 0; i < 7; i++) pset(x + i, y, [P.m1, P.m3, P.m4, P.m3, P.m2, P.m1, P.m0][i]); for (let y = 30; y < 158; y += 40) { rect(x - 1, y, x + 7, y + 2, P.laton); rect(x - 1, y, x + 7, y, P.latonL); } }
    for (const x of [6, 300]) { rect(x, 0, x + 4, 158, P.m2); rect(x, 0, x, 158, P.m4); }
    rect(0, 150, 319, 158, P.m1); rect(0, 150, 319, 150, P.m3);
    // el suelo de baldosas con el brillo verde bajo cada tanque
    for (let y = 158; y < 180; y++) for (let x = 0; x < 320; x++) { const f = (y - 150) / 30, xr = (x - 160) / f, junta = Math.abs(xr % 30) < 1.2 || (y - 158) % 7 === 0;
      let c = junta ? P.z0 : b_umbral(x, y) < 0.5 ? P.z2 : P.z1; for (const cx of XS) { const d = Math.abs(x - cx) / 34 + (y - 158) / 26; if (d < 1 && b_umbral(x, y) < (1 - d) * 0.8) c = b_mezcla(c, P.v3, 0.55); } pset(x, y, c); }
    // los tres tanques: tapas, cristal, bases con el panel de barras y el pictograma de la doble hélice
    for (const cx of XS) { const x0 = cx - W / 2, x1 = cx + W / 2;
      for (let y = 19; y < YT; y++) for (let x = x0 - 4; x <= x1 + 4; x++) pset(x, y, y === 19 ? P.m4 : y === YT - 1 ? P.laton : [P.m1, P.m2, P.m3][Math.max(0, Math.min(2, Math.floor(2 - (x - x0) / 30 + b_umbral(x, y) * 0.5)))]);
      b_remaches(R, x0 - 2, x1 + 2, 23, 6, P.m0, P.m4);
      for (let y = YB + 1; y < 158; y++) for (let x = x0 - 6; x <= x1 + 6; x++) pset(x, y, y === YB + 1 ? P.latonL : y < YB + 4 ? P.laton : y === 157 ? P.m0 : [P.m1, P.m2, P.m3][Math.max(0, Math.min(2, Math.floor(2.2 - (x - x0 + 6) / 34 + b_umbral(x, y) * 0.5)))]);
      rect(cx - 18, 142, cx + 18, 153, P.m0); rect(cx - 17, 143, cx + 17, 152, P.pantalla);
      const HEL = ['#...#', '.#.#.', '..#..', '.#.#.', '#...#', '.#.#.', '..#..']; HEL.forEach((f, j) => { for (let i = 0; i < 5; i++) if (f[i] === '#') pset(cx + 22 + i, 142 + j * 1.5, j % 3 === 2 ? P.v5 : P.v4); });
      // cables y tubos que bajan de la tapa al líquido
      for (const dx of [-14, 10]) { linea(cx + dx, 0, cx + dx, 19, P.m0); linea(cx + dx + 1, 0, cx + dx + 1, 19, P.m2); } }
    b_tanquesExtra(R);
  });
  // el líquido que se mueve en cada tanque (luz de cáusticas), las siluetas o Hayt, las burbujas, los reflejos
  const B = R.buf, cols = [P.vS, P.v0, P.v1, P.v2, P.v3, P.v4];
  XS.forEach((cx, i) => { const x0 = cx - W / 2, x1 = cx + W / 2;
    for (let y = YT; y <= YB; y++) for (let x = x0; x <= x1; x++) { const u = (x - cx) / (W / 2), ca = Math.sin(x * 0.3 + Math.sin(y * 0.2 + t * 1.3 + i) * 1.6 + t * 0.8) + Math.sin(y * 0.25 - t * 1.1 + x * 0.05) * 0.6;
      const n = 3.3 - u * u * 2.6 - (y - YT) / (YB - YT) * 0.4 + (ca > 1.25 ? 0.9 : 0); B[y * 320 + x] = cols[Math.max(0, Math.min(5, Math.floor(n + b_umbral(x, y) - 0.5)))]; }
    for (const dx of [-14, 10]) { const xx = cx + dx; for (let y = YT; y < YT + 30 + (dx > 0 ? 10 : 0); y++) pset(Math.round(xx + Math.sin(y * 0.2 + t + i) * 1.5), y, P.v1); }
    R.recorte([x0 + 1, YT, x1 - 1, YB]);
    if (i === 1 && o.hayt) b_hayt(R, cx, 70 + Math.round(Math.sin(t * 0.8) * 2), 1.7, t);
    else b_durmiente(R, cx + Math.sin(t * 0.5 + i) * 2, 84 + Math.round(Math.sin(t * 0.7 + i * 2) * 2), 1.8, P.v0, 0.8);
    for (let k = 0; k < 7; k++) { const per = 1.8 + h(k, i, 851) * 1.6, uu = ((t + k * 0.5 + i) % per) / per, bx = Math.round(x0 + 4 + h(k, i, 852) * (W - 8) + Math.sin(t * 3 + k) * 1.2), by = Math.round(YB - 2 - uu * (YB - YT - 4)); pset(bx, by, P.v5); if (k % 3 === 0) { pset(bx + 1, by, P.v4); pset(bx, by + 1, P.v4); } }
    R.recorte(null);
    for (let y = YT; y <= YB; y++) { pset(x0, y, P.vS); pset(x1, y, P.vS); pset(x0 + 1, y, P.v1); pset(x0 + 7, y, P.v5); if (y % 3) pset(x0 + 9, y, P.v4); pset(x1 - 5, y, y % 2 ? P.v4 : P.v3); }
    // el panel de la base: barras que suben y bajan y un piloto
    for (let k = 0; k < 7; k++) { const hgt = 2 + Math.round((Math.sin(t * 1.5 + k * 0.9 + i * 2) * 0.5 + 0.5) * 6); rect(cx - 15 + k * 5, 152 - hgt, cx - 13 + k * 5, 151, k === 6 ? P.ambar : P.v4); }
    pset(cx - 22, 147, Math.sin(t * 3 + i * 2) > 0 ? P.verde : P.m3); pset(cx - 22, 150, i === 1 && o.hayt && Math.sin(t * 5) > 0 ? P.rojo : P.m3); });
  b_tanquesVida(R, t);
  return { encuadre: 'laboratorio', camara: 'tanques', suelo: 170, libre: [20, 300], tanques: XS.map((cx) => ({ cx, cristal: [cx - W / 2, YT, cx + W / 2, YB], base: 158 })), tanque: { cristal: [XS[1] - W / 2, YT, XS[1] + W / 2, YB], centro: [XS[1], 66] } };
}
// la capa fija de un decorado: se pinta una vez en un búfer aparte y en cada fotograma se copia entera; clave por variante
const c_capas = new Map();

function c_capa(R, clave, dibuja) {
  let b = c_capas.get(clave);
  if (!b) { b = R.nuevo(); const prev = R.usar(b); dibuja(); R.usar(prev); c_capas.set(clave, b); }
  return b;
}

// mezcla dos colores: a = 0 deja c, a = 1 da d
function c_mez(c, d, a) {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
}

// mezcla un píxel con un color (respeta el recorte)
function c_mezP(R, x, y, col, a) { if (x < 0 || x > 319 || y < 0 || y > 179) return; R.pset(x, y, c_mez(R.pget(x, y), col, a)); }

// tramado ordenado 4×4 (0–1)
const c_BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

const c_b4 = (x, y) => (c_BAYER[((y & 3) << 2) | (x & 3)] + 0.5) / 16;

// un tono de una rampa con tramado entre dos escalones
function c_tono(rampa, v, x, y) { const n = rampa.length - 1; if (v <= 0) return rampa[0]; if (v >= n) return rampa[n]; const i = Math.floor(v); return rampa[(v - i) > c_b4(x, y) ? i + 1 : i]; }

// el relieve de la roca tallada (≈ −1…1): estratos ondulados, manchas, marcas de cincel y granos claros
function c_tex(x, y, k = 0) {
  const est = Math.sin(y * 0.55 + Math.sin(x * 0.045 + k) * 2.2 + Math.sin(x * 0.13) * 0.6);
  let v = est * 0.35 + (h(x >> 1, y >> 1, k) - 0.5) * 0.7 + (h(x >> 3, y >> 2, k + 3) - 0.5) * 0.8;
  if (h(x >> 2, y, k + 7) > 0.93) v -= 0.9;
  if (h(x, y >> 1, k + 9) > 0.97) v += 0.6;
  return v;
}

// un halo de luz que se MEZCLA con lo que hay (no lo tapa): la textura sigue viéndose debajo
function c_brillo(R, cx, cy, r, col, a) {
  for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
    const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r; if (d >= 1) continue;
    const q = Math.round(((1 - d) * (1 - d) * a + (c_b4(x, y) - 0.5) * 0.08) * 10) / 10; if (q > 0) c_mezP(R, x, y, col, Math.min(1, q));
  }
}

const c_hx = (a) => a.map(hex);

const C_ROCA = c_hx(['#120a08', '#1e120c', '#2c1a12', '#3e2618', '#54341e', '#6c4426', '#88582e', '#a46e3a', '#c08a4c', '#dcaa66']);

const C_SUELO = c_hx(['#160e0a', '#24180f', '#382616', '#4e361e', '#664828', '#805c32', '#9c7440', '#b88e54', '#d4ac70']);

const C_AGUA = c_hx(['#0a1e34', '#10304e', '#18486e', '#245e8a', '#3a7eae', '#62a8d4', '#a8dcf4', '#e8faff']);

const C_LATON = c_hx(['#3a2410', '#6a4620', '#a87c34', '#e0b858']);

const C_TELA_R = c_hx(['#2a0e0c', '#4a1a14', '#6e281c', '#923a24', '#b45430', '#cc7240']);

const C_TELA_A = c_hx(['#0e1020', '#1a1e38', '#262e52', '#34406a', '#4a5886', '#6a7aa4']);

const C_FRIO = c_hx(['#07070d', '#0d0d17', '#151521', '#1f1e2c', '#2a2838', '#373244', '#463e50', '#584c5c', '#6c5c66']);

const C_ROCA_T = c_hx(['#1e1220', '#2c1a28', '#3c222e', '#502c34', '#66383a', '#7e4640', '#985646', '#b4684c', '#d08254', '#e8a060', '#f6c27a']);

const C_ARENA_T = c_hx(['#2e1c26', '#46282c', '#603630', '#7c4634', '#9a5a3a', '#b87042', '#d08a4e', '#e4a45e', '#f2c278', '#fadc9c']);

const C_CIELO_T = c_hx(['#1a1630', '#262040', '#38284e', '#4e3058', '#6a385c', '#8a445e', '#ac545c', '#cc6a5a', '#e4865a', '#f2a862', '#f8c87a', '#fce4a0']);

const C_NOCHE = c_hx(['#06060e', '#0a0a18', '#0e1022', '#14162e', '#1a1e3a', '#222848', '#2c3456', '#384266']);

const C_ARENA_N = c_hx(['#08080f', '#0e0e1a', '#141626', '#1c1e32', '#24283e', '#2e324a', '#3a3e58', '#4a4c68', '#5e5e7a']);

const C_ORO = c_hx(['#3a2614', '#6a4220', '#a86a2c', '#e0a040', '#f6cc6a', '#fff0b0', '#fffbe8']);

// una lámpara de aceite de latón colgada de su cadena, con la llama que tiembla y su halo (mezclado)
function c_lampara(R, x, y, t, k, yTecho = 16) {
  for (let yy = yTecho; yy < y - 7; yy++) R.pset(x, yy, (yy & 1) ? C_LATON[0] : C_LATON[1]);
  const f = 0.75 + 0.25 * Math.sin(t * 9 + k * 2) * Math.sin(t * 5.3 + k);
  c_brillo(R, x, y - 3, 13 + f * 3, hex('#ffc070'), 0.42 * f);
  R.pset(x, y - 7, C_LATON[2]); R.linea(x, y - 7, x - 4, y - 1, C_LATON[1]); R.linea(x, y - 7, x + 4, y - 1, C_LATON[1]);
  const fl = Math.floor(t * 11 + k * 3) % 3;
  R.pset(x, y - 2, hex('#fff2c0')); R.pset(x, y - 3, hex('#ffd060')); if (fl) R.pset(x + (fl === 2 ? 1 : 0), y - 4, hex('#ff9030')); R.pset(x - 1, y - 2, hex('#ff9a30')); R.pset(x + 1, y - 2, hex('#ffb040'));
  R.rect(x - 4, y - 1, x + 4, y, C_LATON[2]); R.rect(x - 3, y + 1, x + 3, y + 1, C_LATON[1]); R.rect(x - 2, y + 2, x + 2, y + 2, C_LATON[0]);
  R.pset(x, y + 3, C_LATON[1]); R.pset(x, y + 4, C_LATON[2]); R.pset(x - 3, y - 1, C_LATON[3]); R.pset(x - 2, y, C_LATON[3]); R.pset(x + 4, y, C_LATON[1]);
}
// una figurita Fremen de fondo (8 px): capucha, cara, túnica con su pliegue y piernas que andan; o.dir, o.anda,
// o.carga (un cántaro en la cabeza), o.brazo (mueve un brazo: trabaja), o.ropa (índice de color)
const C_FIG = ['.hh..', 'hhhs.', '.hss.', '.rrr.', 'rrRr.', 'rrRr.', '.rrr.'];

const C_ROPAS = [['#3e3228', '#5a4a3c', '#26201a'], ['#2e3644', '#46526c', '#1c222e'], ['#4e3426', '#6c4c38', '#2c1c14'], ['#3a3a2c', '#565644', '#24241a'], ['#3a2e40', '#56485e', '#221a28']].map(c_hx);

function c_gente(R, x, y, t, k, o = {}) {
  const ropa = C_ROPAS[(o.ropa ?? k) % 5], piel = hex(['#a8704a', '#8a5a3a', '#b47e58'][k % 3]);
  x = Math.round(x) - 2; y = Math.round(y);
  const dir = o.dir ?? 1, paso = o.anda ? (Math.floor(t * 5 + k * 0.7) & 1) : 0;
  R.sprite(C_FIG, x, y - 7, { h: ropa[2], s: piel, r: ropa[0], R: ropa[1] }, dir < 0);
  if (paso) { R.pset(x + 1, y, ropa[2]); R.pset(x + 3, y, ropa[2]); } else { R.pset(x + 2, y, ropa[2]); R.pset(x + 1, y, ropa[2]); }
  if (o.carga) { R.rect(x + 1, y - 10, x + 3, y - 8, hex('#9a5a34')); R.pset(x + 1, y - 10, hex('#c47a48')); R.pset(x + 2, y - 11, hex('#6a3a20')); }
  if (o.brazo) { const b = Math.round(Math.sin(t * 3 + k) * 1.2); R.pset(dir > 0 ? x + 4 : x, y - 4 + b, piel); R.pset(dir > 0 ? x + 5 : x - 1, y - 4 + b, piel); }
}
// una nube de tres tonos (sombra, cuerpo, filo encendido por abajo); solo pinta donde puede(x, y)
function c_nube(R, cx, cy, w, k, tonos, puede) {
  const n = 4 + (k % 3);
  for (let p = 0; p < n; p++) {
    const f = (p + 0.5) / n, r = w * (0.13 + 0.13 * Math.sin(f * Math.PI)) * (0.8 + h(p, k, 12) * 0.4);
    const px = cx + (f - 0.5) * w * 0.85 + (h(p, k, 11) - 0.5) * 6, py = cy - Math.sin(f * Math.PI) * r * 0.45 + (h(p, k, 13) - 0.5) * 3;
    for (let y = Math.floor(py - r * 0.75); y <= cy + 2; y++) for (let x = Math.floor(px - r); x <= px + r; x++) {
      const dx = (x - px) / r, dy = (y - py) / (r * 0.75), d = dx * dx + dy * dy; if (d > 1) continue;
      if (!puede(x, y)) continue;
      if (d > 0.78 && c_b4(x, y) > 0.5) continue;
      let v = dy > 0.5 ? 2.6 : dy > 0.05 ? 1.8 : dy > -0.5 ? 1.1 : 0.3;
      v += (h(x >> 1, y, k + 14) - 0.5) * 0.9 + (dx < -0.3 && dy > 0 ? 0.5 : 0);
      if (y >= cy + 1) v = 3;
      R.pset(x, y, tonos[Math.max(0, Math.min(3, Math.round(v)))]);
    }
  }
}

const C_SALA_LUCES = [[38, 34, 1, 54], [104, 40, 1, 58], [214, 40, 1, 58], [256, 30, 0.8, 44]];

function c_salaLuz(x, y) { let v = 0; for (const [lx, ly, s, r] of C_SALA_LUCES) { const d2 = ((x - lx) ** 2 + ((y - ly) * 1.15) ** 2) / (r * r); v += s / (1 + d2 * 2.2); } return v; }
const c_salaTecho = (x) => 22 + Math.round(6 * Math.sin(x * 0.04 + 1) + 3 * Math.sin(x * 0.11));

const c_enNicho = (x, y) => (Math.abs(x - 160) <= 44 && y >= 70 && y <= 114) || (y < 70 && (x - 160) ** 2 + ((y - 70) * 1.55) ** 2 <= 44 * 44);

// la escalera tallada: escalones [x, y] de cada peldaño (el borde de la huella)
const c_escIzq = Array.from({ length: 18 }, (_, i) => [40 + Math.round(i * 3.5), 136 - i * 4]);

const c_escDer = Array.from({ length: 10 }, (_, i) => [262 - Math.round(i * 3.4), 136 - i * 4]);

const C_GALERIAS = [{ y: 64, x0: 6, x1: 100, puertas: [22, 50, 78] }, { y: 92, x0: 222, x1: 319, puertas: [238, 268, 300] }, { y: 52, x0: 232, x1: 272, puertas: [252] }];

// la barandilla de piedra de una galería (va por delante de la gente que pasea por ella)
function c_baranda(R, g) {
  for (let x = g.x0 + 2; x <= g.x1 - 1; x++) { R.pset(x, g.y - 6, C_ROCA[(x & 7) ? 6 : 5]); R.pset(x, g.y - 5, C_ROCA[3]); }
  for (let x = g.x0 + 3; x <= g.x1 - 2; x += 5) { R.rect(x, g.y - 4, x + 1, g.y - 1, C_ROCA[4]); R.pset(x, g.y - 4, C_ROCA[6]); R.pset(x + 1, g.y - 1, C_ROCA[2]); }
}

function c_salaFijo(R) {
  const { pset, rect, linea, poligono } = R, AZUL = hex('#3a78b8');
  // 1 · la roca: bóveda oscura con costillas, paredes con la luz de las lámparas cocida y el brillo azul del agua
  for (let y = 0; y < 137; y++) for (let x = 0; x < 320; x++) {
    const L = c_salaLuz(x, y), tx = c_tex(x, y), techo = y < c_salaTecho(x);
    let v;
    if (techo) v = 0.5 + L * 2.6 + tx * 0.8 + (Math.sin(x * 0.19 + Math.sin(y * 0.2) * 2) > 0.85 ? -0.8 : 0) - (y < 8 ? 0.4 : 0);
    else if (c_enNicho(x, y)) v = 0.9 + L * 1.4 + tx * 0.6 + (y - 40) * 0.012;
    else v = 1.5 + L * 5 + tx * 1.1 + (y > 120 ? (y - 120) * 0.05 : 0);
    let c = c_tono(C_ROCA, v, x, y);
    const a = 0.55 * Math.exp(-(((x - 160) / 64) ** 2) - (((y - 108) / 34) ** 2)) * (c_enNicho(x, y) ? 1.3 : 1);
    if (a > 0.05) c = c_mez(c, AZUL, Math.round((a + (c_b4(x, y) - 0.5) * 0.1) * 8) / 8);
    pset(x, y, c);
  }
  // el filo de la bóveda (una línea de luz) y las grietas
  for (let x = 0; x < 320; x++) { const yt = c_salaTecho(x); pset(x, yt, c_tono(C_ROCA, 2 + c_salaLuz(x, yt) * 4, x, yt)); pset(x, yt - 1, C_ROCA[1]); }
  for (const [x0, y0, n] of [[12, 30, 26], [146, 20, 14], [292, 60, 30], [196, 24, 12], [60, 96, 18]]) { let x = x0; for (let i = 0; i < n; i++) { x += Math.round(h(i, x0, 2) * 2 - 1); pset(x, y0 + i, C_ROCA[1]); if (i & 1) pset(x + 1, y0 + i, C_ROCA[5]); } }
  // 2 · el gran nicho del agua: dovelas talladas alrededor del arco y el caño de piedra
  for (let a = 0; a <= Math.PI; a += 0.012) { for (let rr = 44; rr <= 49; rr++) { const x = Math.round(160 + Math.cos(a) * rr), y = Math.round(70 - Math.sin(a) * rr / 1.55); const junta = Math.floor(a * 14) !== Math.floor((a + 0.012) * 14); pset(x, y, junta ? C_ROCA[1] : c_tono(C_ROCA, (rr < 46 ? 3 : 5) + c_salaLuz(x, y) * 3 + (x < 160 ? 0.8 : 0), x, y)); } }
  for (const s of [-1, 1]) for (let y = 70; y <= 114; y++) for (let i = 44; i <= 49; i++) { const x = 160 + s * i; pset(x, y, (y % 9 === 0) ? C_ROCA[1] : c_tono(C_ROCA, (i < 46 ? 3 : 5) + c_salaLuz(x, y) * 3 + (s < 0 ? 0.8 : 0), x, y)); }
  // el canal tallado que baja por el fondo del nicho y la cabeza de piedra del caño
  rect(157, 34, 163, 92, C_ROCA[1]); rect(158, 34, 162, 92, hex('#10202e')); for (let y = 34; y < 92; y += 6) { rect(156, y, 164, y, C_ROCA[3]); pset(156, y, C_ROCA[5]); }
  poligono([[153, 90], [167, 90], [165, 97], [155, 97]], (x, y) => c_tono(C_ROCA, 3.5 + (x < 159 ? 1.5 : 0) + c_tex(x, y) * 0.6, x, y)); rect(158, 97, 162, 98, C_ROCA[2]);
  // 3 · las galerías: puertas en arco con su luz de dentro, cornisas con luz y sombra
  for (const g of C_GALERIAS) {
    for (const px of g.puertas) {
      const y0 = g.y - 22;
      for (let y = y0; y <= g.y; y++) for (let x = px - 7; x <= px + 7; x++) {
        const dentro = y >= y0 + 7 || (x - px) ** 2 + ((y - y0 - 7) * 1.0) ** 2 <= 49; if (!dentro) continue;
        const u = (y - y0) / 22; pset(x, y, c_tono(c_hx(['#0c0606', '#1e0e08', '#3a1c0c', '#6a3414', '#a45a20', '#d88a34']), u * u * 4.2 + (c_b4(x, y) - 0.5) * 0.4, x, y));
      }
      for (let y = y0; y <= g.y; y++) { const yy = y - y0 - 7, dx = yy < 0 ? Math.round(Math.sqrt(Math.max(0, 49 - yy * yy))) : 7; pset(px - dx - 1, y, C_ROCA[7]); pset(px + dx + 1, y, C_ROCA[1]); }
    }
    for (let x = g.x0; x <= g.x1; x++) { pset(x, g.y, C_ROCA[8]); pset(x, g.y + 1, C_ROCA[5]); pset(x, g.y + 2, C_ROCA[4]); pset(x, g.y + 3, C_ROCA[2]); for (let y = g.y + 4; y < g.y + 8; y++) if ((x + y) % (y - g.y - 2) === 0) pset(x, y, C_ROCA[1]); }
    c_baranda(R, g);
  }
  // una cortina a medio correr en la primera puerta de la derecha (la de la izquierda se mueve en cada fotograma)
  for (let y = 70; y <= 92; y++) for (let x = 231; x <= 236; x++) pset(x, y, c_tono(C_TELA_A, 2 + Math.sin(x * 1.2) * 0.8 + ((y % 7) < 1 ? 1 : 0), x, y));
  // 4 · las escaleras talladas: cada peldaño con su huella encendida y su tabica en sombra; la zanca, en sombra
  for (const [esc, dir] of [[c_escIzq, 1], [c_escDer, -1]]) {
    for (let i = 0; i < esc.length; i++) { const [x, y] = esc[i], w = 5;
      const xa = dir > 0 ? x : x - w + 1;
      for (let yy = y; yy < y + 4; yy++) for (let xx = xa; xx < xa + w; xx++) pset(xx, yy, c_tono(C_ROCA, (yy === y ? 7.2 : 3.4) + c_salaLuz(xx, yy) * 2 + c_tex(xx, yy) * 0.5, xx, yy));
      for (let yy = y + 4; yy < 137; yy++) { const xx = dir > 0 ? xa + w - 1 : xa; if (pset && yy < y + 8) pset(xx, yy, C_ROCA[2]); }
      pset(dir > 0 ? xa : xa + w - 1, y, C_ROCA[9]);
    }
  }
  // 5 · el tapiz bajo la galería izquierda (x 8–32, y 70–98) y el friso de triángulos tallados sobre el nicho
  for (let y = 70; y <= 98; y++) for (let x = 8; x <= 32; x++) {
    const u = x - 8, v = y - 70, bor = u < 2 || u > 22 || v < 2;
    const rombo = (Math.abs((u % 8) - 4) + Math.abs((v % 10) - 5)) < 4;
    let c = bor ? C_TELA_A[2] : rombo ? ((Math.abs((u % 8) - 4) + Math.abs((v % 10) - 5)) < 2 ? hex('#e8c060') : C_TELA_R[4]) : C_TELA_R[2];
    pset(x, y, c_mez(c, C_ROCA[0], 0.25 + (x > 26 ? 0.15 : 0)));
  }
  for (let x = 8; x <= 32; x += 2) pset(x, 99, C_TELA_R[3]); rect(6, 69, 34, 69, C_LATON[1]);
  // 6 · el telar (x 2–30, y 104–140): postes y travesaños de madera, la urdimbre y la tela ya tejida
  const MAD = c_hx(['#2a160c', '#4a2a14', '#6e4420', '#946030']);
  rect(3, 104, 5, 140, MAD[1]); rect(28, 104, 30, 140, MAD[1]); pset(3, 104, MAD[3]); rect(1, 104, 32, 106, MAD[2]); rect(1, 104, 32, 104, MAD[3]); rect(1, 132, 32, 134, MAD[2]);
  for (let x = 7; x <= 26; x++) { for (let y = 107; y < 120; y++) pset(x, y, (x & 1) ? hex('#d8c8a0') : hex('#9a8a6a')); for (let y = 120; y < 132; y++) { const v = y - 120, rombo = Math.abs(((x - 7) % 6) - 3) + Math.abs((v % 6) - 3) < 3; pset(x, y, rombo ? hex('#e8c060') : (v % 6 === 0 ? C_TELA_A[3] : C_TELA_R[3])); } }
  rect(4, 135, 30, 140, MAD[0]);
  // 7 · cántaros, sacos y cestas de especia a la derecha (x 270–318)
  const BARRO = c_hx(['#3a1a0e', '#6a3418', '#9a5228', '#c4743c', '#e09858']);
  for (const [cx, cy, r] of [[280, 128, 7], [296, 124, 9], [312, 130, 6], [288, 136, 5]]) { for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const dx = (x - cx) / r, dy = (y - cy) / r; if (dx * dx + dy * dy > 1) continue; pset(x, y, c_tono(BARRO, 2.4 - dx * 1.6 - dy * 0.6 + (h(x, y, 4) - 0.5) * 0.4, x, y)); }
    rect(cx - 2, cy - r - 3, cx + 2, cy - r, BARRO[1]); rect(cx - 3, cy - r - 3, cx + 3, cy - r - 3, BARRO[3]); pset(cx - Math.round(r * 0.5), cy - Math.round(r * 0.4), BARRO[4]); rect(cx - r + 1, cy - 1, cx + r - 1, cy - 1, BARRO[1]); }
  for (const [x0, col] of [[270, '#e88a3a'], [302, '#c86a2a']]) { rect(x0, 137, x0 + 12, 141, hex('#5a3a1c')); for (let x = x0; x <= x0 + 12; x++) pset(x, 137 + ((x & 1) ? 1 : 2), hex('#8a5a2c')); for (let x = x0 + 1; x < x0 + 12; x++) { pset(x, 136, hex(col)); if (h(x, 1, 5) > 0.4) pset(x, 135, hex(col)); } }
  // 8 · el suelo: losas en perspectiva con juntas, arena acumulada y la luz de las lámparas
  const FILAS = [137, 140, 144, 149, 155, 162, 170, 179];
  for (let y = 137; y < 180; y++) {
    const fila = FILAS.findIndex((f) => f > y), junta = FILAS.includes(y), prof = (y - 40) / 140;
    for (let x = 0; x < 320; x++) {
      let L = 0; for (const [lx, , s] of C_SALA_LUCES) L += s / (1 + ((x - lx) / 60) ** 2 * 1.5); L *= 0.6 + 0.4 * (y - 137) / 43;
      const u = (x - 160) / prof + 160 + fila * 11, vj = (u % 26 + 26) % 26 < 1.4 / prof;
      let v = 1.8 + L * 3.2 + c_tex(x, y, 2) * 0.7 + (h((x >> 3) + fila * 7, fila, 6) - 0.5) * 0.9;
      if (junta || vj) v -= 1.6;
      if (h(x >> 4, y >> 2, 8) > 0.72) v += 0.8;   // arena que se acumula
      let c = c_tono(C_SUELO, v, x, y);
      const a = 0.4 * Math.exp(-(((x - 160) / 70) ** 2) - (((y - 137) / 8) ** 2)); if (a > 0.06) c = c_mez(c, AZUL, Math.round(a * 8) / 8);
      pset(x, y, c);
    }
  }
  // 9 · la alberca: el borde de atrás, el hueco del agua (se pinta en cada fotograma), la albardilla y el frente de sillares
  rect(112, 110, 208, 112, C_ROCA[6]); rect(112, 110, 208, 110, C_ROCA[8]);
  for (let y = 124; y <= 126; y++) for (let x = 102 - (y - 124); x <= 218 + (y - 124); x++) pset(x, y, c_tono(C_ROCA, (y === 124 ? 8.4 : 6.6) + c_tex(x, y, 3) * 0.5, x, y));
  for (let y = 127; y <= 136; y++) for (let x = 100; x <= 220; x++) { const fila = y < 132 ? 0 : 1, sj = ((x - 100 + fila * 9) % 18) === 0 || y === 132; pset(x, y, sj ? C_ROCA[2] : c_tono(C_ROCA, 4.4 + c_tex(x, y, 4) * 0.8 - (y - 127) * 0.12 + (x < 112 ? 0.6 : 0), x, y)); }
  for (const s of [-1, 1]) for (let y = 110; y <= 126; y++) { const x = s < 0 ? 112 - Math.round((y - 110) * 0.6) : 208 + Math.round((y - 110) * 0.6); pset(x, y, C_ROCA[s < 0 ? 7 : 3]); pset(x - s, y, C_ROCA[5]); }
  // una jarra y un cazo de latón junto a la alberca
  rect(224, 128, 229, 136, hex('#9a5228')); rect(225, 126, 228, 127, hex('#6a3418')); pset(224, 129, hex('#e09858')); linea(96, 134, 92, 128, C_LATON[2]); rect(95, 134, 98, 136, C_LATON[2]);
  // 10 · la alfombra grande con rombos, su cenefa y los flecos; cojines a los lados
  const AL = c_hx(['#4a1612', '#6e2418', '#9a3a20', '#b07a30', '#d8b070', '#22284a', '#3a4472']);
  poligono([[74, 148], [246, 148], [258, 172], [62, 172]], (x, y) => {
    const v = (y - 148) / 24, xl = 74 - 12 * v, xr = 246 + 12 * v, u = (x - xl) / (xr - xl);
    const bU = u < 0.05 || u > 0.95, bV = v < 0.1 || v > 0.88, bor = bU || bV, filo = (u > 0.05 && u < 0.07) || (u > 0.93 && u < 0.95) || (v > 0.1 && v < 0.16) || (v > 0.82 && v < 0.88);
    const ru = (u * 9) % 1, rv = (v * 2.2 + 0.1) % 1, d = Math.abs(ru - 0.5) * 2 + Math.abs(rv - 0.5) * 2;
    let c = filo ? AL[4] : bor ? (((Math.round(x * 0.5) + y) % 4) < 2 ? AL[5] : AL[6]) : d < 0.5 ? (d < 0.22 ? AL[4] : AL[3]) : d < 0.62 ? AL[0] : AL[1];
    if (!bor && !filo && h(x, y, 13) > 0.85) c = AL[2];
    return c_mez(c, C_ROCA[0], 0.18 + (h(x >> 2, y, 14) - 0.5) * 0.1);
  });
  for (let x = 62; x <= 258; x += 2) { pset(x, 173, AL[4]); pset(x, 174, AL[3]); }
  for (const [x0, y0, col] of [[34, 141, '#7a3a24'], [48, 144, '#2e3a62'], [262, 142, '#7a5a2a']]) { for (let y = y0; y < y0 + 8; y++) for (let x = x0; x < x0 + 14; x++) { const dx = (x - x0 - 6.5) / 7, dy = (y - y0 - 3.5) / 4; if (dx * dx + dy * dy > 1.05) continue; pset(x, y, c_mez(hex(col), dy < -0.2 ? hex('#e8c080') : C_ROCA[0], dy < -0.2 ? 0.3 : dy > 0.4 ? 0.4 : 0)); } pset(x0 + 7, y0 + 4, hex('#e8c060')); }
}

function c_sala(R, t, o) {
  R.copiar(c_capa(R, 'sala', () => c_salaFijo(R)));
  const { pset } = R;
  // los reflejos del agua que bailan en el fondo del nicho
  for (let y = 44; y < 110; y++) for (let x = 117; x <= 203; x++) {
    if (!c_enNicho(x, y) || (x >= 156 && x <= 164 && y < 98)) continue;
    const s = Math.sin(x * 0.31 + t * 1.3 + Math.sin(y * 0.21 - t * 0.9) * 2.2) * Math.sin(y * 0.37 - t * 1.1 + x * 0.07);
    if (s > 0.62) c_mezP(R, x, y, hex('#7ac4ee'), s > 0.85 ? 0.45 : 0.25);
  }
  // el hilo de agua del canal y el chorro del caño
  for (let y = 36; y < 92; y++) if (((y + Math.floor(t * 30)) % 7) < 2) pset(160, y, C_AGUA[5]);
  for (let y = 98; y < 114; y++) { const ph = (y * 3 - t * 60) % 9; pset(159, y, C_AGUA[4]); pset(160, y, ph < 4 ? C_AGUA[7] : C_AGUA[6]); pset(161, y, C_AGUA[3]); }
  // el agua de la alberca: ondas, el reflejo de las lámparas y los anillos donde cae el chorro
  for (let y = 113; y <= 123; y++) { const xl = 112 - Math.round((y - 113) * 0.8), xr = 208 + Math.round((y - 113) * 0.8);
    for (let x = xl + 1; x < xr; x++) {
      let v = 2.4 + 1.1 * Math.sin(x * 0.21 - t * 1.7 + Math.sin(y * 0.9 + t * 0.8) * 1.6) + 0.7 * Math.sin(x * 0.05 + y * 0.6 + t * 1.1) + (y - 113) * 0.12;
      for (const lx of [104, 214]) if (Math.abs(x - lx + (y - 113) * 0.3) < 3) v += 2 * (0.5 + 0.5 * Math.sin(t * 6 + y + x));
      const d = Math.hypot(x - 160, (y - 116) * 3), rr = (t * 9) % 16, rr2 = (t * 9 + 8) % 16;
      if (Math.abs(d - rr) < 0.8 || Math.abs(d - rr2) < 0.8) v += 2 * (1 - Math.min(rr, rr2) / 16);
      pset(x, y, c_tono(C_AGUA, v, x, y));
    } }
  for (let k = 0; k < 4; k++) { const a = t * 4 + k * 1.7, s = (a % 1); pset(160 + Math.round(Math.cos(k * 2) * s * 4), 113 - Math.round(Math.sin(s * Math.PI) * 3), C_AGUA[7]); }
  // la gente diminuta de las galerías (por detrás de la barandilla), la que sube por la escalera y la que llena la jarra
  const ida = (a, b, vel, ph) => { const u = ((t * vel + ph) % 2 + 2) % 2; return u < 1 ? [a + (b - a) * u, 1] : [b - (b - a) * (u - 1), -1]; };
  for (const [g, k, vel, ph] of [[0, 0, 0.05, 0.3], [0, 3, 0.04, 1.4], [1, 1, 0.045, 0.7], [1, 4, 0.035, 1.8]]) { const G = C_GALERIAS[g], [x, d] = ida(G.x0 + 6, G.x1 - 8, vel, ph); c_gente(R, x, G.y - 1, t, k, { dir: d, anda: true, carga: k === 3 }); }
  c_gente(R, 246, 51, t, 2, { dir: -1, brazo: true });
  for (const g of C_GALERIAS) c_baranda(R, g);
  { const u = ((t * 0.06 + 0.2) % 1), i = Math.min(16.99, u * 17), a = c_escIzq[Math.floor(i)], b = c_escIzq[Math.floor(i) + 1], f = i % 1; c_gente(R, a[0] + (b[0] - a[0]) * f + 2, a[1] + (b[1] - a[1]) * f - 1, t, 3, { dir: 1, anda: true, carga: true, ropa: 1 }); }
  c_gente(R, 232, 136, t, 0, { dir: -1, brazo: true, ropa: 2 });
  // el telar: la lanzadera que va y viene y la tejedora de espaldas
  { const u = Math.sin(t * 1.4), x = Math.round(16 + u * 9); pset(x, 120, hex('#e8c060')); pset(x + 1, 120, hex('#6e4420')); pset(x - 1, 120, hex('#6e4420'));
    const tj = c_hx(['#2e3644', '#46526c']), y0 = 140; R.rect(13, y0 - 6, 19, y0 - 1, tj[0]); R.rect(14, y0 - 6, 18, y0 - 5, tj[1]); R.rect(14, y0 - 9, 18, y0 - 7, hex('#2a1e18')); R.pset(15, y0 - 9, hex('#3a2a20'));
    R.pset(13 + Math.round(u * 2), y0 - 5, hex('#a8704a')); R.pset(19 + Math.round(u * 2), y0 - 5, hex('#a8704a')); }
  // la cortina de la puerta de la izquierda de la galería alta, que se mece
  for (let y = 46; y <= 63; y++) { const xr = 76 + Math.round(Math.sin(t * 1.2 + y * 0.12) * ((y - 46) / 17) * 2); for (let x = 71; x <= xr; x++) pset(x, y, c_tono(C_TELA_R, 2.2 + Math.sin(x * 1.3) * 0.8 + (x === xr ? 1.2 : 0), x, y)); }
  // las lámparas colgadas
  for (let k = 0; k < C_SALA_LUCES.length; k++) { const [x, y] = C_SALA_LUCES[k]; c_lampara(R, x, y + 4, t, k, x > 170 && x < 270 ? 2 : 16); }
  // el polvo dorado que flota en la luz
  for (let k = 0; k < 40; k++) { const x = Math.round(((h(k, 1, 20) * 340 + t * (1.5 + h(k, 2, 20) * 3)) % 340) - 10), y = Math.round(30 + h(k, 3, 20) * 104 + Math.sin(t * 0.6 + k) * 4); if (Math.sin(t * 1.7 + k * 2.3) > -0.3) c_mezP(R, x, y, hex('#ffe0a0'), 0.55); }
  // un ratoncito que cruza por el pie de la pared del fondo de vez en cuando
  { const u = (t % 13) / 3; if (u < 1) { const x = Math.round(236 + u * 30), y = 137 - (Math.floor(t * 8) & 1); pset(x, y, hex('#b08860')); pset(x + 1, y, hex('#c49a70')); pset(x + 2, y - 1, hex('#c49a70')); pset(x - 1, y, hex('#806040')); pset(x - 2, y - 1, hex('#806040')); } }
  return { encuadre: 'sala', camara: 'general', suelo: 152, libre: [30, 260], alberca: { x0: 104, x1: 216, y0: 113, y1: 123, borde: 124, frente: 136, caño: [160, 97] }, galerias: C_GALERIAS.map((g) => ({ y: g.y, x0: g.x0, x1: g.x1 })) };
}
const c_mesaTop = (x) => 50 + Math.round(2.5 * Math.sin(x * 0.13) + 1.5 * Math.sin(x * 0.37 + 1));

const c_mesaIzq = (y) => Math.round(184 - (y - 50) * 0.32 + 3 * Math.sin(y * 0.21) + 2 * Math.sin(y * 0.53));

const c_esMesa = (x, y) => y >= c_mesaTop(x) && x >= c_mesaIzq(y) && y <= 156;

const c_dunaA = (x) => 101 + 2 * Math.sin(x * 0.02 + 1) + 1.5 * Math.sin(x * 0.07);

const c_dunaB = (x) => 109 + 5 * Math.sin(x * 0.018 + 2) + 2 * Math.sin(x * 0.05);

const c_dunaC = (x) => 124 + 7 * Math.sin(x * 0.012 + 0.5) + 3 * Math.sin(x * 0.04);

const C_BOCA = [[238, 153], [240, 130], [243, 117], [249, 108], [256, 106], [262, 111], [266, 122], [269, 138], [271, 153]];

let c_cieloMask = null, c_bocaMask = null;

function c_entradaFijo(R) {
  const { pset, rect, linea, poligono, disco } = R, sx = 56, sy = 104;
  c_cieloMask = new Uint8Array(320 * 180); c_bocaMask = new Uint8Array(320 * 180);
  // el sol medio hundido (antes que las dunas, que lo tapan)
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c;
    if (c_esMesa(x, y)) {
      // la meseta: estratos, grietas verticales, la cara izquierda encendida por el ocaso y la base en sombra
      const xl = c_mesaIzq(y), dentro = x - xl, banda = Math.floor((y + 2 * Math.sin(x * 0.1)) / 7), tb = (h(banda, 3, 21) - 0.5) * 1.4;
      let v = 2.6 + tb + c_tex(x, y, 21) * 1.0 + ((y + Math.round(2 * Math.sin(x * 0.1))) % 7 === 0 ? -1.2 : 0);
      const fc = Math.sin(x * 0.19 + Math.sin(y * 0.03 + x * 0.01) * 0.7);
      if (dentro < 12) v += 3.6 - dentro * 0.18; else v += fc > 0.55 ? 1.5 : fc < -0.75 ? -0.9 : 0;
      if (Math.abs(Math.sin(x * 0.083 + Math.sin(y * 0.05) * 1.2)) < 0.04 && h(x >> 4, y >> 4, 29) > 0.45) v -= 2;
      if (y < c_mesaTop(x) + 2) v += 2.5;
      v -= Math.max(0, (y - 128) * 0.06);
      c = c_tono(C_ROCA_T, v, x, y);
    } else if (y < c_dunaA(x)) {
      c_cieloMask[y * 320 + x] = 1;
      const g = Math.exp(-(((x - sx) / 95) ** 2) - (((y - sy) / 46) ** 2));
      c = c_tono(C_CIELO_T, Math.pow(y / 104, 1.3) * 7.4 + g * 3.6 + (h(x >> 2, y >> 1, 22) - 0.5) * 0.35, x, y);
      const ds = Math.hypot(x - sx, y - sy); if (ds < 11) c = ds < 9 ? (ds < 7 ? hex('#fff8dc') : hex('#ffe8a8')) : hex('#fcc878');
    } else if (y < c_dunaB(x)) { const s = c_dunaA(x + 1) - c_dunaA(x - 1); c = c_tono(C_ARENA_T, 3.2 - (y - c_dunaA(x)) * 0.1 + s * 1.2 + (y - c_dunaA(x) < 1 ? 1.5 : 0) + Math.exp(-(((x - sx) / 60) ** 2)) * 2, x, y); c = c_mez(c, hex('#8a5a7a'), 0.35); }
    else if (y < c_dunaC(x)) { const s = c_dunaB(x + 1) - c_dunaB(x - 1); c = c_tono(C_ARENA_T, 3.6 + s * 1.6 - (y - c_dunaB(x)) * 0.05 + (y - c_dunaB(x) < 1 ? 2 : 0) + Math.sin(x * 0.4 + y * 2.3) * 0.3, x, y); c = c_mez(c, hex('#7a4a6a'), 0.2); }
    else {
      const yC = c_dunaC(x), s = c_dunaC(x + 1) - c_dunaC(x - 1), cerca = (y - yC) / 50;
      let v = 4.6 + s * 1.4 + (y - yC < 1 ? 2.2 : 0) + Math.sin(x * 0.02 + y * 0.06) * 0.8 + (Math.sin(x * 0.35 + y * 1.9 + Math.sin(x * 0.06) * 3) > 0.55 ? 0.9 + cerca : -0.2) * (0.6 + cerca * 0.6) - Math.max(0, (x - 150) * 0.012) + (h(x, y, 23) > 0.94 ? 1 : 0);
      if (x > 150 && y < 162) v -= (162 - y) * 0.02 * (x - 150) / 30;   // la sombra de la meseta
      c = c_tono(C_ARENA_T, v, x, y);
      if (Math.sin(x * 0.05 + 2) * Math.sin(y * 0.21) > 0.7 && h(x >> 3, y >> 2, 30) > 0.6 && x < 150) c = c_mez(c, hex('#e86a2a'), 0.3);   // vetas de especia
      if (h(x >> 1, y >> 1, 31) > 0.993) c = C_ARENA_T[2];
    }
    pset(x, y, c);
  }
  // las dos lunas (las nubes pasan por delante): la grande con sus mares y la pequeña
  for (const [mx, my, r] of [[122, 40, 7], [152, 27, 3.5]]) disco(mx, my, r, (x, y, d) => { const l = (x - mx) * -0.5 + (y - my) * -0.3; let c = d > 0.85 ? hex('#c8bcd8') : l > 0 ? hex('#f6f0f8') : hex('#e2d8ec'); if (r > 5 && h(x, y, 24) > 0.78 && d < 0.8) c = hex('#c4b8d4'); return c; });
  disco(119, 38, 2, hex('#d0c4dc')); disco(125, 43, 1.5, hex('#cec2da'));
  // la repisa de la vigía (x 204–242, y 70): su suelo encendido, el canto y la sombra que echa
  for (let x = 202; x <= 244; x++) { const e = Math.round(Math.sin(x * 0.7) * 0.6); pset(x, 70 + e, C_ROCA_T[10]); pset(x, 71 + e, C_ROCA_T[8]); pset(x, 72 + e, C_ROCA_T[6]); pset(x, 73 + e, C_ROCA_T[4]); for (let y = 74; y < 79; y++) pset(x, y + e, c_mez(R.pget(x, y + e), C_ROCA_T[0], 0.55 - (y - 74) * 0.1)); }
  for (let y = 56; y < 70; y++) for (let x = 206; x <= 240; x++) pset(x, y, c_mez(R.pget(x, y), C_ROCA_T[2], 0.35));   // el hueco detrás de la vigía, en sombra
  // los asideros tallados que bajan zigzagueando de la repisa a la arena
  for (let i = 0; i < 12; i++) { const x = 214 + (i & 1 ? 8 : 0) + Math.round(Math.sin(i) * 2), y = 80 + i * 6; rect(x, y, x + 3, y + 1, C_ROCA_T[1]); rect(x, y - 1, x + 3, y - 1, C_ROCA_T[8]); }
  // la boca: la grieta con la luz de dentro (degradado cálido), el filo encendido y la luz que se derrama en la arena
  poligono(C_BOCA, (x, y) => { c_bocaMask[y * 320 + x] = 1; const u = (y - 106) / 47, d = Math.abs(x - 255) / 12; return c_tono(c_hx(['#1a0a08', '#3a1a0c', '#6a3212', '#a4581c', '#d8862c', '#f4b450', '#ffe090']), 1 + u * 4.6 - d * 1.2 + (c_b4(x, y) - 0.5) * 0.3, x, y); });
  for (let i = 0; i < C_BOCA.length - 1; i++) linea(C_BOCA[i][0], C_BOCA[i][1], C_BOCA[i + 1][0], C_BOCA[i + 1][1], i < 4 ? hex('#f0a050') : hex('#b0603a'));
  for (let y = 148; y < 166; y++) for (let x = 210; x < 300; x++) { const d = ((x - 255) / 44) ** 2 + ((y - 154) / 9) ** 2; if (d < 1 && !c_bocaMask[y * 320 + x]) c_mezP(R, x, y, hex('#ffb860'), Math.round((1 - d) * 0.55 * 6 + (c_b4(x, y) - 0.5)) / 6); }
  c_entradaMas(R);
  // las piedras caídas al pie de la meseta y las huellas que llegan hasta la boca
  for (const [x, y, r] of [[160, 152, 4], [172, 156, 3], [206, 154, 5], [282, 156, 4], [228, 158, 2]]) { disco(x, y, r, (xx, yy) => c_tono(C_ROCA_T, 3 + (xx < x ? 3 : 0) + (yy < y ? 1 : -1) + c_tex(xx, yy, 25) * 0.6, xx, yy)); for (let i = -r; i <= r + 2; i++) c_mezP(R, x + i + 2, y + r + 1, C_ARENA_T[1], 0.5); }
  for (let s = 0; s < 1; s += 0.028) { const x = Math.round(14 + s * 228), y = Math.round(176 - s * 24 + Math.sin(s * 6) * 3) + ((Math.round(s / 0.028) & 1) ? 1 : -1); pset(x, y, C_ARENA_T[3]); pset(x + 1, y, C_ARENA_T[4]); pset(x, y - 1, C_ARENA_T[8]); }
}
function c_entrada(R, t, o) {
  R.copiar(c_capa(R, 'entrada', () => c_entradaFijo(R)));
  const { pset } = R, cielo = (x, y) => x >= 0 && x < 320 && y >= 0 && y < 180 && c_cieloMask[y * 320 + x] === 1;
  // las estrellas que van saliendo (lejos de la barra del año y de Atom)
  for (let k = 0; k < 30; k++) { const x = Math.round(46 + h(k, 1, 26) * 228), y = Math.round(17 + h(k, 2, 26) * 40); if (!cielo(x, y) || (x > 108 && x < 160 && y > 20 && y < 50)) continue; const b = Math.sin(t * (1.2 + (k % 4) * 0.5) + k * 2); if (b > -0.1) pset(x, y, b > 0.7 ? hex('#fff4e8') : hex('#b8a0c8')); }
  // las nubes del ocaso, en tres capas a tres velocidades (las de abajo, encendidas por el sol)
  for (const [x0, y, w, v, k, tn] of [[30, 30, 70, 0.6, 0, 0], [200, 24, 56, 0.8, 1, 0], [120, 58, 64, 1.4, 2, 1], [280, 64, 50, 1.2, 3, 1], [60, 80, 80, 2.2, 4, 2], [210, 86, 60, 2.6, 5, 2]]) {
    const cx = ((x0 + t * v) % 420 + 420) % 420 - 50;
    const T3 = [c_hx(['#3a2a52', '#4e3460', '#6a4470', '#8a5878']), c_hx(['#5a3458', '#7a405e', '#b05a62', '#e88a6a']), c_hx(['#6a3a54', '#9a4a5a', '#d8705e', '#fcb070'])][tn];
    c_nube(R, cx, y, w, k, T3, cielo);
  }
  // el halcón que gira alto sobre las dunas
  { const a = t * 0.5, x = Math.round(84 + Math.cos(a) * 26), y = Math.round(62 + Math.sin(a) * 6), b = Math.round(Math.sin(t * 3)); for (let i = -3; i <= 3; i++) if (cielo(x + i, y)) pset(x + i, y - (Math.abs(i) > 1 ? b : 0), hex('#2a1a2a')); pset(x, y + 1, hex('#2a1a2a')); }
  // la caravana diminuta de Fremen por la cresta de la duna lejana
  R.recorte([0, 0, 146, 179]);
  for (let k = 0; k < 5; k++) { const x = Math.round(((t * 2.2 + 140 - k * 7) % 180) - 20), y = Math.round(c_dunaB(x)) - 1, p = (Math.floor(t * 4) + k) & 1; R.linea(x, y - 3, x, y - 1, hex('#3a2230')); pset(x, y - 4, hex('#4a2a38')); pset(x - p, y, hex('#3a2230')); pset(x + 1 - p, y, hex('#3a2230')); if (k === 2) { pset(x + 1, y - 3, hex('#3a2230')); pset(x + 1, y - 4, hex('#3a2230')); } }
  R.recorte(null);
  // dentro de la boca: la luz que tiembla, una cortina a un lado y sombras que pasan
  const fl = 0.8 + 0.2 * Math.sin(t * 7) * Math.sin(t * 3.1);
  R.recorte([236, 104, 272, 153]);
  for (let y = 112; y < 153; y++) { const xr = 249 + Math.round(Math.sin(t * 1.1 + y * 0.1) * ((y - 112) / 40) * 2); for (let x = 240; x <= xr; x++) if (c_bocaMask[y * 320 + x]) pset(x, y, c_tono(C_TELA_R, 2 + Math.sin(x * 1.4) * 0.7 + (x === xr ? 1.6 : 0) + (y - 112) * 0.03, x, y)); }
  { const u = (t % 9) / 3.5; if (u < 1) { const x = Math.round(274 - u * 22); for (let y = 134; y < 153; y++) for (let i = 0; i < 5; i++) if (c_bocaMask[y * 320 + x + i] && (y > 136 || (i > 0 && i < 4))) c_mezP(R, x + i, y, hex('#2a1008'), 0.6); } }
  R.recorte(null);
  c_brillo(R, 255, 150, 20 * fl, hex('#ffc070'), 0.25);
  // la arena que vuela a ras de suelo y la que cae de la cima de la meseta
  for (let k = 0; k < 34; k++) { const x = Math.round(((h(k, 1, 27) * 380 + t * (40 + h(k, 2, 27) * 40)) % 380) - 30), y = Math.round(132 + h(k, 3, 27) * 46 + Math.sin(t * 2 + k) * 1.5), n = 2 + (k % 4); for (let i = 0; i < n; i++) c_mezP(R, x - i, y, C_ARENA_T[9], 0.45 - i * 0.08); }
  for (let k = 0; k < 10; k++) { const x0 = 196 + k * 12, u = ((t * 0.5 + h(k, 1, 28)) % 1); const x = Math.round(x0 - u * 18), y = c_mesaTop(x0) - 1 + Math.round(u * 6); if (cielo(x, y)) c_mezP(R, x, y, C_ARENA_T[8], 0.6 * (1 - u)); }
  return { encuadre: 'sala', camara: 'entrada', suelo: 152, libre: [20, 200], roca: { x: 220, y: 70, x0: 204, x1: 242 }, boca: { x: 255, y: 152, x0: 238, x1: 271, arriba: 106 }, sol: [56, 104], lunas: [[122, 40], [152, 27]] };
}
const c_cuartoTecho = (x) => 14 + Math.round(((x - 160) / 160) ** 2 * 26);

const C_HAZ = [[186, 16], [194, 16], [230, 150], [178, 150]];

function c_enHaz(x, y) { if (y < 16 || y > 150) return false; const u = (y - 16) / 134, xl = 186 + (178 - 186) * u, xr = 194 + (230 - 194) * u; return x >= xl && x <= xr; }
function c_cuartoFijo(R) {
  const { pset, rect, linea, poligono, disco } = R, LUNA = hex('#8aa0d8');
  // la roca del cuarto con la luz de la lámpara del nicho cocida, la bóveda baja y el haz de luna
  for (let y = 0; y < 140; y++) for (let x = 0; x < 320; x++) {
    const d2 = ((x - 79) ** 2 + ((y - 98) * 1.2) ** 2) / (100 * 100), L = 1 / (1 + d2 * 2.6), techo = y < c_cuartoTecho(x);
    let v = techo ? 0.4 + L * 3 + c_tex(x, y, 31) * 0.7 : 1.2 + L * 6 + c_tex(x, y, 31) * 1.1 + (y > 126 ? (y - 126) * 0.06 : 0) + c_estratoC(x, y);
    let c = c_tono(C_ROCA, v, x, y);
    if (c_enHaz(x, y) && ((x + y) & 1)) c = c_mez(c, LUNA, 0.22);
    pset(x, y, c);
  }
  for (let x = 0; x < 320; x++) { const y = c_cuartoTecho(x); pset(x, y, C_ROCA[1]); pset(x, y + 1, c_tono(C_ROCA, 2.6 + 3 / (1 + ((x - 79) / 90) ** 2), x, y)); }
  // el friso tallado de triángulos que sigue la bóveda y dos manojos de hierbas secas colgados
  for (let x = 36; x < 284; x++) { const y = c_cuartoTecho(x) + 7, k = x % 6, y0 = y - (k < 3 ? k : 6 - k); for (let yy = y0; yy <= y; yy++) pset(x, yy, c_tono(C_ROCA, (yy === y0 ? 6.5 : 4.4) + 2 / (1 + ((x - 79) / 80) ** 2), x, yy)); pset(x, y + 1, C_ROCA[1]); }
  for (const [x, y] of [[52, 26], [262, 28]]) { linea(x, y, x, y + 6, C_ROCA[1]); for (let i = -3; i <= 3; i++) linea(x, y + 6, x + i, y + 16 + Math.abs(i), i & 1 ? hex('#6a7a3a') : hex('#8a8a4a')); rect(x - 1, y + 6, x + 1, y + 7, hex('#a8783a')); }
  // el respiradero del techo con su cielo de noche (las estrellas se encienden en cada fotograma)
  for (let y = 6; y <= 18; y++) for (let x = 182; x <= 198; x++) { const d = ((x - 190) / 8) ** 2 + ((y - 12) / 6) ** 2; if (d <= 1) pset(x, y, d > 0.7 ? C_ROCA[2] : c_tono(C_NOCHE, 3 + (y - 6) * 0.15, x, y)); else if (d < 1.4) pset(x, y, C_ROCA[1]); }
  // el nicho de la lámpara (arco x 62–96), su repisa y dos tarritos
  for (let y = 65; y <= 104; y++) for (let x = 62; x <= 96; x++) { const dentro = y >= 82 || (x - 79) ** 2 + (y - 82) ** 2 <= 17 * 17; if (!dentro) continue; const L = 1 / (1 + (((x - 79) ** 2 + (y - 100) ** 2) / 400)); pset(x, y, c_tono(C_ROCA, 1.6 + L * 6.4 + c_tex(x, y, 32) * 0.6, x, y)); }
  for (let y = 65; y <= 104; y++) { const yy = y - 82, dx = yy < 0 ? Math.round(Math.sqrt(Math.max(0, 289 - yy * yy))) : 17; pset(79 - dx - 1, y, C_ROCA[2]); pset(79 + dx + 1, y, C_ROCA[8]); }
  rect(60, 105, 98, 106, C_ROCA[8]); rect(60, 107, 98, 108, C_ROCA[3]);
  for (const [cx, col] of [[68, '#7a4a2a'], [90, '#4a5a6a']]) { rect(cx - 2, 99, cx + 2, 104, hex(col)); rect(cx - 1, 97, cx + 1, 98, hex(col)); pset(cx - 1, 100, hex('#e8c080')); }
  // el tapiz colgado de su vara (x 106–142, y 50–106): bandas, rombos y una cenefa
  rect(103, 48, 145, 49, hex('#6e4420')); pset(103, 48, hex('#946030')); pset(145, 48, hex('#946030'));
  for (let y = 50; y <= 104; y++) for (let x = 106; x <= 142; x++) {
    const u = x - 106, v = y - 50, bor = u < 3 || u > 33, banda = (v % 18) < 3;
    const du = Math.abs((u % 12) - 6), dv = Math.abs(((v + 6) % 18) - 9) ;
    let c = bor ? C_TELA_A[3] : banda ? hex('#d8b060') : du + dv < 6 ? (du + dv < 3 ? hex('#e8d8b0') : C_TELA_A[3]) : C_TELA_R[3];
    if (bor && (v & 3) === 0) c = hex('#d8b060');
    const L = 1 / (1 + (((x - 79) ** 2 + (y - 98) ** 2) / 4000));
    pset(x, y, c_mez(c, C_ROCA[0], 0.55 - L * 0.4 + (x & 1 ? 0.05 : 0)));
  }
  // el estante tallado de la derecha (x 228–266, y 62–90): telas dobladas, un cuenco de dátiles, una taza y un pájaro de madera
  for (let y = 62; y <= 90; y++) for (let x = 228; x <= 266; x++) pset(x, y, c_tono(C_ROCA, 1.3 + c_tex(x, y, 33) * 0.5 + (y - 62) * 0.03, x, y));
  rect(226, 91, 268, 92, C_ROCA[6]); rect(226, 93, 268, 93, C_ROCA[2]); for (let y = 62; y <= 90; y++) { pset(227, y, C_ROCA[5]); pset(267, y, C_ROCA[1]); }
  for (const [y, col] of [[87, '#6e281c'], [84, '#34406a'], [81, '#b07a30'], [78, '#e8d8b0']]) { rect(230, y, 244, y + 2, hex(col)); pset(230, y, c_mez(hex(col), hex('#ffffff'), 0.3)); rect(244, y + 1, 244, y + 2, C_ROCA[1]); }
  rect(248, 86, 256, 90, hex('#7a4a2a')); rect(247, 85, 257, 85, hex('#9a6a3a')); for (let x = 249; x <= 255; x += 2) pset(x, 84, hex('#4a2010'));
  rect(260, 85, 263, 90, hex('#c8b088')); pset(260, 86, hex('#f0e0c0'));
  { const B = hex('#a87a46'); rect(251, 75, 257, 78, B); pset(258, 76, B); pset(259, 75, hex('#c4995a')); pset(250, 74, B); pset(249, 73, B); rect(252, 79, 253, 81, hex('#6e4420')); rect(250, 81, 256, 81, hex('#6e4420')); pset(257, 76, hex('#1a1010')); pset(253, 75, hex('#c4995a')); }
  // las cortinas de los lados (la izquierda, rojiza y recogida; la derecha, añil con bandas)
  for (let y = 0; y < 150; y++) {
    const xl = 34 - Math.round(Math.max(0, 1 - Math.abs(y - 92) / 60) * 12);
    for (let x = 0; x <= xl; x++) pset(x, y, c_tono(C_TELA_R, 1.6 + Math.sin(x * 0.8 + y * 0.03) * 0.8 + (x > xl - 2 ? 1.2 : 0) + (y > 120 ? -0.4 : 0), x, y));
    const xr = 284 + Math.round(Math.max(0, 1 - Math.abs(y - 96) / 70) * 6);
    for (let x = xr; x < 320; x++) pset(x, y, c_tono(C_TELA_A, 1.8 + Math.sin(x * 0.9 - y * 0.02) * 0.9 + (x < xr + 2 ? 1 : 0) + ((y % 26) < 3 ? 1.4 : 0), x, y));
  }
  // el suelo: roca con arena y dos alfombras superpuestas; cojines al pie del tapiz y del nicho
  for (let y = 138; y < 180; y++) for (let x = 0; x < 320; x++) { const L = 1 / (1 + ((x - 90) / 110) ** 2); pset(x, y, c_tono(C_SUELO, 1.6 + L * 3.4 + c_tex(x, y, 34) * 0.7 + (h(x >> 3, y >> 1, 35) > 0.7 ? 0.8 : 0), x, y)); }
  for (let x = 0; x < 320; x++) pset(x, 138, C_ROCA[2]);
  const AL = c_hx(['#4a1612', '#7a2a1a', '#a84a26', '#c8903c', '#e8c890', '#26304e', '#3c4a76']);
  poligono([[44, 146], [236, 146], [252, 176], [30, 176]], (x, y) => { const v = (y - 146) / 30, u = (x - (44 - 14 * v)) / (192 + 30 * v), bor = u < 0.06 || u > 0.94 || v < 0.12 || v > 0.86; const fr = Math.abs(((u * 12) % 1) - 0.5) + Math.abs(((v * 3) % 1) - 0.5); let c = bor ? ((Math.round(u * 60) % 3) ? AL[5] : AL[3]) : fr < 0.28 ? (fr < 0.12 ? AL[4] : AL[3]) : ((Math.round(v * 9)) % 2 ? AL[1] : AL[0]); const L = 1 / (1 + ((x - 90) / 120) ** 2); return c_mez(c, C_ROCA[0], 0.45 - L * 0.3); });
  for (let x = 30; x <= 252; x += 2) pset(x, 177, AL[4]);
  poligono([[150, 140], [240, 140], [246, 152], [146, 152]], (x, y) => c_mez(((x >> 1) + (y >> 1)) % 4 < 2 ? AL[6] : AL[5], hex('#e8c890'), (y % 4 === 0) ? 0.25 : 0));
  for (const [x0, y0, col] of [[36, 128, '#8a3a24'], [48, 131, '#b07a30'], [104, 130, '#34406a'], [120, 132, '#7a2a1a'], [264, 132, '#4a5a3a']]) { for (let y = y0; y < y0 + 10; y++) for (let x = x0; x < x0 + 16; x++) { const dx = (x - x0 - 7.5) / 8, dy = (y - y0 - 4.5) / 5; if (dx * dx + dy * dy > 1.05) continue; const L = 1 / (1 + ((x - 79) / 70) ** 2); pset(x, y, c_mez(hex(col), dy < -0.3 ? hex('#ffd8a0') : C_ROCA[0], dy < -0.3 ? 0.25 * L + 0.05 : dy > 0.4 ? 0.5 : 0.3 - L * 0.2)); } pset(x0 + 8, y0 + 5, hex('#e8c060')); pset(x0 + 1, y0 + 2, hex('#e8c060')); }
  // el agujero del ratón al pie de la pared y un cántaro de agua con su cazo junto a la cortina
  disco(268, 137, 3, C_ROCA[0]); for (let x = 265; x <= 271; x++) pset(x, 139, C_SUELO[2]);
  { const BAR = c_hx(['#3a1a0e', '#6a3418', '#9a5228', '#c4743c']); for (let y = 122; y <= 140; y++) for (let x = 246; x <= 260; x++) { const dx = (x - 253) / 7, dy = (y - 132) / 8; if (dx * dx + dy * dy > 1 && y > 125) continue; if (y <= 125 && Math.abs(x - 253) > 3) continue; pset(x, y, c_tono(BAR, 2.6 - dx * 1.4 - dy * 0.5, x, y)); } pset(250, 128, BAR[3]); linea(256, 121, 262, 116, C_LATON[2]); }
  c_cuartoMas(R);
}
// una cuna tejida sobre balancines, que se mece; o.bebe: un bebé dormido que respira; a 0–1 (aparece)
function c_cuna(R, cx, base, t, k, o = {}) {
  const ang = o.mece === false ? 0 : Math.sin(t * 1.3 + k * 1.7) * 0.07, MIM = c_hx(['#3a2410', '#6a4420', '#946030', '#c08a48', '#e0b070']);
  const P = (x, y, c) => { const dy = Math.round((x - cx) * ang * -1 * 0), dx = Math.round((base - y) * ang); R.pset(x + dx, y + dy + (Math.abs(x - cx) > 10 ? Math.round((x - cx) * ang * 0.4) : 0), c); };
  // los balancines curvos
  for (let x = cx - 15; x <= cx + 15; x++) { const u = (x - cx) / 15, y = base - 1 - Math.round((u * u) * 3); P(x, y, MIM[1]); P(x, y + 1, MIM[0]); if (Math.abs(u) < 0.95) P(x, y - 1, MIM[2]); }
  P(cx - 9, base - 4, MIM[1]); P(cx + 9, base - 4, MIM[1]); P(cx - 9, base - 3, MIM[1]); P(cx + 9, base - 3, MIM[1]);
  // la canasta: el tejido en diagonal, sombreado (luz de la lámpara por la izquierda), con el borde enrollado
  for (let y = base - 15; y <= base - 5; y++) { const w = 13 - Math.round((y - (base - 15)) * 0.25); for (let x = cx - w; x <= cx + w; x++) { const u = (x - cx) / w, teje = ((x + y) & 3) < 2 ? ((x - y) & 3) < 2 : ((x - y) & 3) >= 2; P(x, y, c_tono(MIM, 2.3 - u * 1.1 + (teje ? 0.6 : -0.4) - (y - base + 15) * 0.05, x, y)); } }
  for (let x = cx - 14; x <= cx + 14; x++) { P(x, base - 16, (x & 1) ? MIM[4] : MIM[3]); P(x, base - 15, MIM[2]); }
  // la manta de dentro (crema con una banda azul y otra ocre) y, si hay bebé, su cabecita con gorro, que respira
  const res = Math.sin(t * 2.2 + k) > 0.3 ? 1 : 0;
  for (let x = cx - 11; x <= cx + 8; x++) { const yb = base - 17 - Math.round(Math.sin((x - cx + 11) / 19 * Math.PI) * (o.bebe ? 2 + res : 1)); for (let y = yb; y < base - 16; y++) P(x, y, (x - cx + 20) % 7 < 2 ? hex('#4a6aa8') : (x - cx + 20) % 7 === 3 ? hex('#d8a040') : hex('#ece2cc')); P(x, yb, hex('#fff6e4')); }
  if (o.bebe) { const hx0 = cx + 10; for (let j = -3; j <= 2; j++) for (let i = -3; i <= 3; i++) if (i * i + j * j <= 9) P(hx0 + i, base - 19 + j, j < -1 ? hex('#e8d8b0') : hex('#d8a07a')); P(hx0 - 1, base - 19, hex('#8a5a3a')); P(hx0 + 1, base - 19, hex('#8a5a3a')); P(hx0, base - 18, hex('#e09a8a')); P(hx0 - 2, base - 22, hex('#fff6e4')); }
  // el toldito de tela sobre la cabecera
  for (let y = base - 26; y <= base - 15; y++) { const w = Math.round(Math.sqrt(Math.max(0, 1 - ((y - (base - 15)) / 11) ** 2)) * 6); for (let x = cx + 13 - w; x <= cx + 13; x++) P(x, y, c_tono(C_TELA_A, 2.4 + (x === cx + 13 - w ? 1.6 : 0) + Math.sin(x * 1.1) * 0.5, x, y)); }
  P(cx + 13, base - 27, hex('#e8c060'));
}
function c_cuarto(R, t, o) {
  R.copiar(c_capa(R, 'cuarto', () => c_cuartoFijo(R)));
  const { pset } = R;
  // las estrellas del respiradero
  R.recorte([184, 7, 196, 16]);
  for (let k = 0; k < 6; k++) { const x = 184 + Math.round(h(k, 1, 36) * 12), y = 8 + Math.round(h(k, 2, 36) * 8); if (Math.sin(t * (1.5 + k * 0.4) + k) > -0.2) pset(x, y, k === 2 ? hex('#ffffff') : hex('#a8b4e8')); }
  R.recorte(null);
  // la lámpara de barro del nicho: la llama que tiembla y su luz sobre la pared
  { const f = 0.8 + 0.2 * Math.sin(t * 8) * Math.sin(t * 3.7), x = 79, y = 103;
    c_brillo(R, x, y - 6, 26 + f * 4, hex('#ffb860'), 0.32 * f);
    R.rect(x - 4, y - 1, x + 4, y + 1, hex('#8a4a24')); R.rect(x - 3, y + 1, x + 3, y + 1, hex('#5a2a14')); R.pset(x + 5, y - 1, hex('#8a4a24')); R.pset(x - 4, y - 1, hex('#c4743c'));
    const fl = Math.floor(t * 10) % 3; pset(x + 4, y - 2, hex('#fff2c0')); pset(x + 4, y - 3, hex('#ffd060')); pset(x + 4 + (fl === 1 ? 1 : 0), y - 4, hex('#ff9030')); if (fl === 2) pset(x + 4, y - 5, hex('#ff9030')); }
  // el móvil de tela colgado sobre las cunas: una varilla que gira despacio con tres figuritas (luna, estrella, pájaro)
  { const x0 = 186, y0 = 34, a = Math.sin(t * 0.6) * 9; R.linea(x0, c_cuartoTecho(x0) + 1, x0, y0, C_ROCA[2]); R.linea(x0 - Math.round(a), y0, x0 + Math.round(a), y0, hex('#a8783a'));
    const piezas = [[-a, '#e8d8b0'], [0, '#e8c060'], [a, '#6a7aa4']]; piezas.forEach(([dx, col], i) => { const x = Math.round(x0 + dx), y = y0 + 4 + i * 2 + Math.round(Math.sin(t * 1.4 + i) * 1); R.linea(x, y0, x, y - 2, C_ROCA[3]); R.disco(x, y, 2, hex(col)); R.pset(x - 1, y - 1, hex('#fff6e4')); }); }
  c_cuartoVida(R, t);
  // los flecos del tapiz que se mecen
  for (let x = 106; x <= 142; x += 2) { const s = Math.round(Math.sin(t * 1.2 + x * 0.2) * 0.8); pset(x + s, 105, hex('#b09060')); pset(x + s, 106, hex('#8a6a40')); }
  // las cunas
  const n = (o.cunas ?? 1) >= 2 ? 2 : 1, seg = o.segunda ?? 1;
  c_cuna(R, 168, 150, t, 0, { bebe: !!o.bebes, mece: o.mece });
  if (n === 2 && seg > 0) {
    c_cuna(R, 204, 150, t, 1, { bebe: !!o.bebes, mece: o.mece });
    if (seg < 1) for (let k = 0; k < 5; k++) { const a = k * 1.26 + seg * 3, r = 10 + seg * 8, x = Math.round(204 + Math.cos(a) * r), y = Math.round(138 + Math.sin(a) * r * 0.6), c = hex('#fff0b0'); pset(x, y, c); pset(x - 1, y, hex('#e8c060')); pset(x + 1, y, hex('#e8c060')); pset(x, y - 1, hex('#e8c060')); pset(x, y + 1, hex('#e8c060')); }
  }
  // el polvo que cae despacio por el haz de luna
  for (let k = 0; k < 18; k++) { const y = Math.round(20 + ((h(k, 1, 37) * 130 + t * (3 + h(k, 2, 37) * 3)) % 130)), u = (y - 16) / 134, x = Math.round(186 + (178 - 186) * u + h(k, 3, 37) * (8 + 44 * u) + Math.sin(t + k) * 1.5); if (c_enHaz(x, y)) c_mezP(R, x, y, hex('#d8e0ff'), 0.55); }
  // el ratoncito del desierto que se asoma de su agujero
  { const u = t % 9; if (u > 2 && u < 5.5) { const s = Math.min(1, (u - 2) * 3, (5.5 - u) * 3), x = 268 - Math.round(s * 4), y = 137; const M = hex('#b08860'), Mo = hex('#806040');
      pset(x, y, M); pset(x - 1, y, M); pset(x - 2, y + 1, M); pset(x, y + 1, M); pset(x - 1, y + 1, Mo); pset(x - 1, y - 1, Mo); pset(x, y - 2, hex('#e0b090')); pset(x - 3, y + 1, hex('#e09a8a')); if (Math.sin(t * 9) > 0) pset(x - 4, y, hex('#d8c8b0')); pset(x - 2, y, hex('#100808')); } }
  const r = { encuadre: 'cuarto', camara: 'general', suelo: 150, libre: [40, 220], cunas: [[168, 150], [204, 150]], lampara: [79, 103], haz: [204, 150] };
  return r;
}
const c_PF = 46, c_PB = 150, c_PL = 84, c_PR = 236;   // la pared del fondo

function c_puertaFijo(R, cuna) {
  const { pset, rect, poligono } = R;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    let c, v;
    const warm = Math.exp(-(((x - 160) / 46) ** 2) - (((y - 128) / 40) ** 2));
    if (x >= c_PL && x <= c_PR && y >= c_PF && y <= c_PB) {   // la pared del fondo, con sillares tallados
      const fila = Math.floor((y - c_PF) / 9), junta = (y - c_PF) % 9 === 0 || ((x - c_PL + (fila & 1) * 11) % 22) === 0;
      v = 2 + c_tex(x, y, 41) * 0.9 + (junta ? -1.3 : 0) + warm * 3.6;
    } else if (y < c_PF && y < c_PF * Math.min(x, 320 - x) / c_PL || (y < c_PF && x >= c_PL && x <= c_PR)) {   // el techo
      v = 0.9 + c_tex(x, y, 42) * 0.8 + (Math.sin((x - 160) / Math.max(4, c_PF - y) * 6) > 0.9 ? -0.6 : 0) + warm * 1.2;
    } else if (y >= c_PB && y >= c_PB + (180 - c_PB) * (x < c_PL ? (c_PL - x) / c_PL : x > c_PR ? (x - c_PR) / (320 - c_PR) : 0)) {   // el suelo
      const prof = (y - 96) / 84, u = (x - 160) / prof, f = Math.floor(Math.log(prof) * 9);
      const junta = ((u + f * 13) % 30 + 30) % 30 < 1.3 / prof || Math.floor(Math.log((y + 1 - 96) / 84) * 9) !== f;
      v = 1.4 + c_tex(x, y, 43) * 0.6 + (junta ? -1 : 0) + (h(x >> 3, y >> 1, 44) > 0.75 ? 0.7 : 0) + warm * 2.2;
    } else {   // las paredes de los lados, en perspectiva (estratos que fugan hacia la puerta)
      const izq = x < 160, s = izq ? x / c_PL : (320 - x) / (320 - c_PR), yt = c_PF * s, yb = 180 - (180 - c_PB) * s, vv = (y - yt) / (yb - yt);
      const ws = izq ? x : 320 - x;
      v = 1.9 + c_tex(Math.round(ws * 2.4), Math.round(vv * 120), izq ? 45 : 46) * 1.3 + (Math.sin(vv * 34 + Math.sin(ws * 0.1)) > 0.92 ? -0.9 : 0) + s * 0.6 + warm * 1.4;
    }
    c = c_tono(C_FRIO, v, x, y);
    { const q = Math.round((warm * 0.5 + (c_b4(x, y) - 0.5) * 0.08) * 10) / 10; if (q > 0) c = c_mez(c, hex('#a85a24'), q); }
    pset(x, y, c);
  }
  c_puertaMas(R);
  // los nervios de piedra que cruzan el pasillo (techo y paredes) a dos profundidades
  for (const s of [0.32, 0.68]) { const g = Math.round(7 - s * 4);
    for (let i = 0; i < g; i++) { const ss = s + i * 0.016, x0 = Math.round(84 * ss), x1 = 319 - x0, y0 = Math.round(46 * ss), y1 = Math.round(180 - 30 * ss);
      const tono = (x, y) => c_tono(C_FRIO, (i === 0 ? 5.6 : i === g - 1 ? 1.8 : 3.8) + c_tex(x, y, 44) * 0.5 + Math.exp(-(((x - 160) / 60) ** 2)) * 1.2, x, y);
      for (let x = x0; x <= x1; x++) pset(x, y0, tono(x, y0)); for (let y = y0; y <= y1; y++) { pset(x0, y, tono(x0, y)); pset(x1, y, tono(x1, y)); } } }
  // la tubería de la trampa de rocío por la pared derecha, con sus abrazaderas, y el cuenco donde gotea
  { const py = (x) => { const s = (320 - x) / 84; return Math.round(46 * s + 0.7 * ((180 - 30 * s) - 46 * s)); };
    for (let x = 237; x < 320; x++) { const y = py(x); pset(x, y - 1, C_FRIO[7]); pset(x, y, C_LATON[1]); pset(x, y + 1, C_LATON[0]); if (x % 14 === 0) { pset(x, y - 2, C_FRIO[6]); pset(x, y + 2, C_FRIO[1]); } }
    rect(291, 172, 301, 174, hex('#6a3418')); rect(292, 175, 300, 175, hex('#3a1a0e')); pset(291, 172, hex('#c4743c')); rect(292, 172, 300, 172, hex('#2a4a6a')); }
  // el estante tallado de la pared izquierda, cerca, con cántaros, y una cuerda enrollada colgada de una estaca
  poligono([[10, 104], [28, 110], [28, 128], [10, 124]], (x, y) => c_tono(C_FRIO, 0.4 + (x - 10) * 0.05, x, y)); R.linea(10, 124, 28, 128, C_FRIO[7]);
  for (const [cx, col] of [[15, '#6a3418'], [23, '#4a5a6a']]) { rect(cx - 2, 116 + (cx >> 3), cx + 2, 123 + (cx >> 3), hex(col)); pset(cx - 2, 117 + (cx >> 3), hex('#c4a080')); }
  { pset(30, 66, C_FRIO[7]); pset(31, 66, C_FRIO[7]); for (let a = 0; a < 6.3; a += 0.15) for (const r of [5, 4]) pset(Math.round(30 + Math.cos(a) * r), Math.round(74 + Math.sin(a) * r * 1.2), r === 5 ? hex('#8a6a40') : hex('#5a4228')); }
  // las aristas del pasillo
  R.linea(0, 0, c_PL, c_PF, C_FRIO[0]); R.linea(320, 0, c_PR, c_PF, C_FRIO[0]); R.linea(0, 180, c_PL, c_PB, C_FRIO[5]); R.linea(319, 180, c_PR, c_PB, C_FRIO[5]);
  R.linea(c_PL, c_PF, c_PL, c_PB, C_FRIO[1]); R.linea(c_PR, c_PF, c_PR, c_PB, C_FRIO[5]);
  // el cuarto de dentro, visto por el hueco: pared cálida, la lámpara, el tapiz y (solo con o.cunas) el borde de una cuna
  for (let y = 86; y <= 150; y++) for (let x = 136; x <= 184; x++) {
    if (y < 110 && (x - 160) ** 2 + (y - 110) ** 2 > 24 * 24) continue;
    const L = 1 / (1 + (((x - 168) ** 2 + (y - 112) ** 2) / 300));
    let c = y > 140 ? c_tono(C_SUELO, 3 + L * 3 + c_tex(x, y, 47) * 0.5, x, y) : c_tono(C_ROCA, 3 + L * 5.5 + c_tex(x, y, 47) * 0.8, x, y);
    if (y > 141 && y < 147 && x > 140) c = ((x >> 1) + y) % 4 < 2 ? hex('#7a2a1a') : hex('#c8903c');
    if (x >= 142 && x <= 156 && y >= 96 && y <= 124) c = c_mez(((x - 142) % 6 < 2 || (y - 96) % 9 < 2) ? hex('#d8b060') : C_TELA_R[3], C_ROCA[0], 0.3);
    pset(x, y, c);
  }
  if (cuna) {
    for (let y = 132; y <= 148; y++) for (let x = 170; x <= 184; x++) { const w = ((x + y) & 3) < 2; if (y < 134) pset(x, y, (x & 1) ? hex('#e0b070') : hex('#c08a48')); else pset(x, y, w ? hex('#946030') : hex('#6a4420')); }
    for (let x = 168; x <= 184; x++) pset(x, 131, hex('#ece2cc'));
  }
  rect(166, 112, 171, 114, hex('#8a4a24'));
  // el marco de piedra de la puerta: jambas, el arco de dovelas y el friso de triángulos encima
  for (let y = 110; y <= 150; y++) for (const x0 of [131, 185]) for (let x = x0; x < x0 + 5; x++) pset(x, y, (y % 8 === 0) ? C_FRIO[1] : c_tono(C_FRIO, 4.6 + (x0 < 160 ? (x - x0) * 0.25 : (x0 + 4 - x) * 0.25) + c_tex(x, y, 48) * 0.5, x, y));
  for (let a = 0; a <= Math.PI; a += 0.01) for (let r = 24; r <= 29; r++) { const x = Math.round(160 + Math.cos(a) * r), y = Math.round(110 - Math.sin(a) * r), junta = Math.floor(a * 9) !== Math.floor((a + 0.01) * 9); pset(x, y, junta ? C_FRIO[1] : c_tono(C_FRIO, 4.4 + (r < 26 ? 1.4 : 0) + c_tex(x, y, 48) * 0.5, x, y)); }
  for (let x = 126; x <= 194; x++) { const k = (x - 126) % 6, y0 = 76 - (k < 3 ? k : 6 - k); for (let y = y0; y <= 76; y++) pset(x, y, c_tono(C_FRIO, 4 + (y === y0 ? 2 : 0), x, y)); pset(x, 77, C_FRIO[1]); }
  // los nichos con candil de las paredes (las llamas, en cada fotograma), el odre de agua colgado y la boca lateral oscura
  for (const [x, y] of [[38, 88], [282, 92]]) { for (let j = -6; j <= 4; j++) for (let i = -4; i <= 4; i++) if (j >= -2 || i * i + (j + 2) ** 2 <= 16) pset(x + i, y + j, c_tono(C_FRIO, 0.6 + (j + 6) * 0.1, x + i, y + j)); R.rect(x - 5, y + 5, x + 5, y + 5, C_FRIO[6]); }
  { const OD = c_hx(['#2a160c', '#4a2c18', '#6e4428', '#946038']); R.linea(58, 82, 58, 90, OD[0]); for (let y = 90; y <= 112; y++) for (let x = 50; x <= 66; x++) { const dx = (x - 58) / 8, dy = (y - 102) / 11; if (dx * dx + dy * dy > 1 || (y < 94 && Math.abs(x - 58) > 3)) continue; pset(x, y, c_tono(OD, 1.6 - dx * 1.2 - dy * 0.6 + (h(x, y, 49) - 0.5) * 0.4, x, y)); } pset(55, 98, OD[3]); pset(54, 100, OD[3]); }
  poligono([[257, 108], [274, 98], [274, 172], [257, 162]], (x, y) => c_tono(C_FRIO, 0.2 + (x - 257) * 0.03 + (c_b4(x, y) - 0.5) * 0.4, x, y));
  R.linea(257, 108, 257, 162, C_FRIO[5]); R.linea(274, 98, 274, 172, C_FRIO[2]);
  // la estera que va del pasillo a la puerta y unas alfombras enrolladas contra la pared
  poligono([[146, 151], [174, 151], [200, 180], [120, 180]], (x, y) => { const v = (y - 151) / 29, u = (x - (146 - 26 * v)) / (28 + 52 * v), st = Math.floor(u * 7); return c_mez(st === 0 || st === 6 ? hex('#26304e') : st % 2 ? hex('#7a2a1a') : hex('#a8783a'), C_FRIO[0], 0.45 + (h(x >> 2, y, 50) - 0.5) * 0.1); });
  for (const [x0, y0] of [[14, 150], [22, 156]]) { for (let y = y0; y < y0 + 7; y++) for (let x = x0; x < x0 + 26; x++) pset(x, y, c_tono(c_hx(['#1a0c0a', '#3a1a12', '#6e281c', '#923a24']), 1.8 + (y === y0 ? 1.2 : 0) - (y - y0) * 0.2 + ((x - x0) % 8 === 0 ? -1 : 0), x, y)); }
}
function c_puerta(R, t, o) {
  R.copiar(c_capa(R, o.cunas ? 'puerta-cuna' : 'puerta', () => c_puertaFijo(R, !!o.cunas)));
  const { pset } = R, f = 0.82 + 0.18 * Math.sin(t * 7.3) * Math.sin(t * 2.9);
  // las cortinas de la puerta: la izquierda tapa casi la mitad del hueco, la derecha un poco; se mecen
  const gL = (y) => 154 + Math.round(Math.sin(t * 0.9) * 1.5 + Math.sin(t * 1.7 + y * 0.08) * ((y - 86) / 64) * 2);
  const gR = (y) => 174 + Math.round(Math.sin(t * 0.9 + 1) * 1 + Math.sin(t * 1.5 + y * 0.07) * ((y - 86) / 64) * 1.5);
  R.recorte([136, 84, 184, 150]);
  for (let y = 86; y <= 150; y++) { const xa = y < 110 ? 160 - Math.floor(Math.sqrt(Math.max(0, 576 - (y - 110) ** 2))) : 136, xb = y < 110 ? 160 + Math.floor(Math.sqrt(Math.max(0, 576 - (y - 110) ** 2))) : 184;
    const l = gL(y), r = gR(y);
    for (let x = xa; x <= Math.min(l, xb); x++) { const banda = ((y + 4) % 16) < 3; pset(x, y, c_tono(banda ? c_hx(['#2a1a0a', '#6a4a1a', '#a8783a', '#d8a850', '#f0c870']) : C_TELA_R, 1.6 + Math.sin(x * 0.9) * 0.7 + (l - x < 3 ? 2.2 * f : 0), x, y)); }
    for (let x = Math.max(r, xa); x <= xb; x++) { const banda = ((y + 4) % 16) < 3; pset(x, y, c_tono(banda ? c_hx(['#0e1020', '#2a3050', '#4a5886', '#8a98c0']) : C_TELA_A, 1.4 + Math.sin(x * 1.1) * 0.6 + (x - r < 2 ? 2 * f : 0), x, y)); }
  }
  R.recorte(null);
  R.rect(132, 85, 188, 85, C_LATON[1]); pset(132, 85, C_LATON[3]); pset(188, 85, C_LATON[3]);
  // la luz cálida que sale por la rendija y se derrama por el suelo del pasillo (tiembla con la lámpara)
  for (let y = 151; y < 180; y++) { const u = (y - 150) / 30, l = 160 + (gL(150) - 160) * (1 + u * 1.6), r = 160 + (gR(150) - 160) * (1 + u * 1.6), a = (0.55 - u * 0.35) * f;
    for (let x = Math.floor(l); x <= Math.ceil(r); x++) { const e = Math.min(x - l, r - x) / 4; const q = Math.round(Math.min(1, e) * a * 6 + (c_b4(x, y) - 0.5) * 0.6) / 6; if (q > 0) c_mezP(R, x, y, hex('#ffb860'), q); } }
  c_brillo(R, 164, 118, 30, hex('#ffa850'), 0.12 * f);
  // la gota que cae de la tubería al cuenco
  { const u = (t * 0.7) % 1, y = Math.round(lerp(126, 171, u * u)); pset(296, y, hex('#9ac8f0')); if (u > 0.92) { pset(294, 170, hex('#9ac8f0')); pset(298, 170, hex('#9ac8f0')); } }
  // los candiles de los nichos y su luz
  for (const [x, y, k] of [[38, 88, 0], [282, 92, 1]]) { const g = 0.7 + 0.3 * Math.sin(t * 8 + k * 2) * Math.sin(t * 3 + k); c_brillo(R, x, y, 16, hex('#ffa850'), 0.35 * g); R.rect(x - 2, y + 2, x + 2, y + 3, hex('#8a4a24')); pset(x, y + 1, hex('#fff2c0')); pset(x, y, hex('#ffd060')); if (g > 0.75) pset(x, y - 1, hex('#ff9030')); }
  c_puertaVida(R, t);
  // alguien con un candil pasa a veces por la boca lateral
  { const u = (t % 11) / 4; if (u < 1) { R.recorte([258, 100, 273, 170]); const x = Math.round(256 + u * 20); c_gente(R, x, 158, t, 1, { dir: 1, anda: true }); c_brillo(R, x + 4, 150, 8, hex('#ffb860'), 0.5); pset(x + 4, 151, hex('#fff0b0')); R.recorte(null); } }
  // polvo en la luz de la puerta
  for (let k = 0; k < 14; k++) { const x = Math.round(144 + h(k, 1, 51) * 36 + Math.sin(t * 0.5 + k) * 3), y = Math.round(100 + ((h(k, 2, 51) * 70 + t * 2) % 76)); c_mezP(R, x, y, hex('#ffe0a0'), 0.4); }
  return { encuadre: 'cuarto', camara: 'puerta', suelo: 150, libre: [120, 200], puerta: { x0: 136, x1: 184, y0: 86, y1: 150, rendija: [gL(150), gR(150)] } };
}
let c_arbol = null;

// el árbol de caminos (siempre el mismo): segmentos en el plano del suelo (x lateral, z profundidad, z = 1 a los pies de
// Paul), cada uno con las hojas que cuelgan de él; las hojas se apagan en un orden fijo y la superviviente va la última
function c_arbolLuz() {
  if (c_arbol) return c_arbol;
  let sem = 4417; const rnd = () => { sem = (sem * 16807) % 2147483647; return sem / 2147483647; };
  const segs = [], hojas = [];
  const rama = (x, z, ang, nivel) => {
    const z1 = z * (1.5 + rnd() * 0.3), x1 = x + (z1 - z) * Math.tan(ang) * 0.9, b = (rnd() - 0.5) * 0.3 * (z1 - z);
    const pts = []; for (let i = 0; i <= 10; i++) { const u = i / 10; pts.push([x + (x1 - x) * u + Math.sin(u * Math.PI) * b, z + (z1 - z) * u]); }
    const s = { pts, hojas: [], nivel }; segs.push(s);
    if (nivel >= 4 || z1 > 13) { s.hojas.push(hojas.length); hojas.push(s); return s; }
    const n = rnd() < 0.35 ? 3 : 2, abre = 0.42 - nivel * 0.05;
    for (let k = 0; k < n; k++) { const a = ang + (n === 2 ? (k ? 1 : -1) * abre * (0.7 + rnd() * 0.5) : (k - 1) * abre * 1.1); const c = rama(x1, z1, Math.max(-1.05, Math.min(1.05, a)), nivel + 1); s.hojas.push(...c.hojas); }
    return s;
  };
  for (const a of [-0.95, -0.42, 0.05, 0.5, 1.0]) rama(0, 1, a, 0);
  // el orden en que se apagan (al azar fijo) y la superviviente: la que acaba más cerca de un punto lejano a la derecha
  const N = hojas.length; let viva = 0, mejor = 1e9;
  hojas.forEach((s, i) => { const [x, z] = s.pts[10], d = Math.abs(x / z - 0.28) + Math.abs(z - 12) * 0.05; if (d < mejor) { mejor = d; viva = i; } });
  const orden = hojas.map((_, i) => i).filter((i) => i !== viva).map((i) => [i, rnd()]).sort((a, b) => a[1] - b[1]).map((p) => p[0]);
  orden.push(viva); const rango = new Array(N); orden.forEach((i, r) => { rango[i] = r; });
  c_arbol = { segs, hojas, rango, viva, N };
  return c_arbol;
}
const c_pGen = (x, z) => [160 + x * 82 / z, 74 + 76 / z];

const c_pAlto = (x, z) => { const th = Math.atan(x / z), r = Math.log(z) / Math.log(17); return [160 + Math.sin(th) * r * 200, 166 - Math.cos(th) * r * 150]; };

function c_laberintoFijo(R, alto) {
  const { pset, disco } = R;
  if (!alto) {
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      let c;
      const hz = 74 + Math.round(Math.sin(x * 0.03) * 1.5 + Math.sin(x * 0.11 + 2) * 0.8);
      if (y < hz) {
        const banda = Math.exp(-(((y - 12 - x * 0.12) / 14) ** 2)), bm = banda * (0.6 + 0.4 * Math.sin(x * 0.13 + y * 0.2) * h(x >> 2, y >> 2, 52));
        c = c_tono(C_NOCHE, 1 + (y / hz) * 4.2 + bm * 2 + (h(x >> 1, y >> 1, 53) - 0.5) * 0.3, x, y);
        const st = h(x, y, 54); if (st > 0.992 || (bm > 0.4 && st > 0.975)) c = st > 0.997 ? hex('#e8e8ff') : hex('#7a80b0');
      } else {
        const prof = (y - 72) / 108, z = 76 / Math.max(1, y - 74 + 0.5), fila = Math.sin(z * 9 + Math.sin(x * 0.02 + z) * 1.5);
        let v = 2.4 + (1 - prof) * 1.2 + (fila > 0.4 ? 1 : fila < -0.6 ? -0.6 : 0) * (0.6 + prof * 1.6) + Math.sin(x * 0.015 + 76 / Math.max(1, y - 73) * 2) * 0.7 + c_tex(x, y, 55) * 0.4 + (y === hz ? 2 : 0) + (h(x, y, 56) > 0.985 ? 2 : 0);
        c = c_tono(C_ARENA_N, v, x, y);
      }
      pset(x, y, c);
    }
    // las dunas lejanas sobre el horizonte, con su filo de luna
    for (let x = 0; x < 320; x++) { const hh = Math.max(0, Math.round(4 * Math.sin(x * 0.021 + 1) + 2 * Math.sin(x * 0.07))); for (let y = 74 - hh; y < 74; y++) pset(x, y, c_tono(C_ARENA_N, y === 74 - hh ? 5 : 2.2, x, y)); }
    // dos lunas finas, en creciente
    for (const [mx, my, r] of [[206, 34, 5], [232, 24, 3]]) { disco(mx, my, r, hex('#f0ecff')); disco(mx + r * 0.45, my - r * 0.2, r * 0.9, C_NOCHE[2]); }
  } else {
    // la arena vista desde arriba: ondas, sombras de duna, piedrecitas
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      const dn = Math.sin(x * 0.018 + y * 0.012 + Math.sin(y * 0.03) * 1.2), on = Math.sin(x * 0.42 + y * 0.18 + Math.sin(y * 0.05 + x * 0.01) * 3);
      let v = 2.6 + dn * 1.2 + on * 0.5 + c_tex(x, y, 57) * 0.35 + (dn > 0.75 ? 1 : 0) - (Math.hypot(x - 160, y - 90) / 200) * 1.4;
      if (h(x >> 1, y >> 1, 58) > 0.992) v -= 1.6;
      pset(x, y, c_tono(C_ARENA_N, v, x, y));
    }
  }
  c_laberintoMas(R, alto);
}
function c_laberinto(R, t, o, alto) {
  R.copiar(c_capa(R, alto ? 'laberinto-alto' : 'laberinto', () => c_laberintoFijo(R, alto)));
  const A = c_arbolLuz(), P = alto ? c_pAlto : c_pGen, u = Math.max(0, Math.min(1, o.apagados ?? 0));
  const { pset } = R;
  // las nubes de plata que pasan (en el cielo) o sus sombras sobre la arena (desde arriba)
  if (!alto) { const cielo = (x, y) => y < 72 && y >= 0 && x >= 0 && x < 320;
    for (const [x0, y, w, v, k, tn] of [[40, 22, 60, 0.7, 0, 0], [220, 52, 70, 1.3, 1, 1], [120, 62, 50, 2, 2, 1]]) { const cx = ((x0 + t * v) % 420 + 420) % 420 - 50; c_nube(R, cx, y, w, k, [c_hx(['#10142a', '#181e38', '#242c4a', '#3a4466']), c_hx(['#141a30', '#1e2640', '#2e3a58', '#5a6a8e'])][tn], cielo); }
  } else for (let k = 0; k < 2; k++) { const cx = ((60 + k * 170 + t * 6) % 440) - 60, cy = 50 + k * 70; for (let y = cy - 20; y < cy + 20; y++) for (let x = Math.round(cx - 46); x < cx + 46; x++) { const d = ((x - cx) / 46) ** 2 + ((y - cy) / 20) ** 2 + Math.sin(x * 0.2 + y * 0.3) * 0.1; if (d < 1 && ((x + y) & 1)) c_mezP(R, x, y, C_ARENA_N[0], 0.35); } }
  c_laberintoVida(R, t, alto);
  // el brillo de cada hoja (1 encendida, 0 apagada) y de cada segmento (el de su hoja más encendida)
  const q = u < 0.85 ? u / 0.85 * (A.N - 1) : A.N - 1, ult = u < 0.9 ? 1 : Math.max(0, 1 - (u - 0.9) / 0.1);
  const bH = A.rango.map((r) => r === A.N - 1 ? ult : Math.max(0, Math.min(1, r + 1 - q)));
  let enc = 0; for (const b of bH) if (b > 0.5) enc++;
  const frac = enc / A.N;
  // el charco de luz a los pies de Paul (y, a oscuras, solo la luna)
  const cx0 = alto ? 160 : 160, cy0 = alto ? 166 : 150;
  c_brillo(R, cx0, cy0, 22 + 24 * Math.sqrt(frac), hex('#f6cc6a'), 0.15 + 0.4 * Math.max(frac, ult * 0.4));
  c_brillo(R, cx0, cy0, 18, hex('#8a9ad0'), 0.18);
  // los caminos: primero los apagados (un surco gris azulado) y luego los encendidos (núcleo claro, halo dorado y chispas)
  const OFF = hex('#3a3e5c'), OFF2 = hex('#2a2c44');
  const segB = A.segs.map((s) => Math.max(...s.hojas.map((i) => bH[i])));
  const ancho = (z) => alto ? (z < 2.5 ? 2 : 1) : (z < 1.8 ? 3 : z < 3.5 ? 2 : 1);
  for (let pas = 0; pas < 2; pas++) A.segs.forEach((s, si) => {
    let b = segB[si]; if (b > 0 && b < 1) b *= 0.55 + 0.45 * Math.abs(Math.sin(t * 23 + si * 1.7));
    if ((pas === 0) !== (b < 0.05)) return;
    for (let i = 0; i < 10; i++) {
      const [ax, ay] = P(...s.pts[i]), [bx, by] = P(...s.pts[i + 1]), w = ancho(s.pts[i][1]);
      R.linea(ax, ay, bx, by, (x, y) => {
        if (b < 0.05) { c_mezP(R, x, y, OFF, 0.7); if (w > 1) c_mezP(R, x, y + 1, OFF2, 0.6); return null; }
        for (let j = -w; j <= w; j++) { if (alto) { c_mezP(R, x + j, y, C_ORO[3], 0.5 * b); } else c_mezP(R, x, y + j, C_ORO[3], (Math.abs(j) === w ? 0.3 : 0.6) * b); }
        if (w > 1) { if (alto) c_mezP(R, x, y + 1, C_ORO[5], b); else c_mezP(R, x, y + 1, C_ORO[4], b); }
        return c_mez(R.pget(x, y), C_ORO[6], b);
      });
    }
    // las chispas que corren hacia fuera por los caminos encendidos
    if (b >= 0.05) for (let k = 0; k < 2; k++) { const f = ((t * (0.35 + (si % 3) * 0.08) + si * 0.37 + k * 0.5) % 1) * 10, i = Math.floor(f), [ax, ay] = P(...s.pts[i]), [bx, by] = P(...s.pts[Math.min(10, i + 1)]), x = Math.round(ax + (bx - ax) * (f - i)), y = Math.round(ay + (by - ay) * (f - i)); pset(x, y, hex('#ffffff')); c_mezP(R, x + 1, y, C_ORO[5], 0.8 * b); c_mezP(R, x - 1, y, C_ORO[5], 0.8 * b); c_mezP(R, x, y - 1, C_ORO[5], 0.6 * b); }
  });
  // el final del superviviente: un destello que late (la meta de la visión)
  const vs = A.hojas[A.viva], [vx, vy] = P(...vs.pts[10]);
  if (ult > 0.05) { const p = 0.6 + 0.4 * Math.sin(t * 3); c_brillo(R, vx, vy, 6 + p * 3, C_ORO[5], 0.6 * ult); pset(Math.round(vx), Math.round(vy), hex('#ffffff')); }
  const camino = vs.pts.map((p) => P(...p).map(Math.round));
  return { encuadre: 'laberinto', camara: alto ? 'alto' : 'general', suelo: alto ? 166 : 150, libre: [40, 280], centro: [cx0, cy0], vivo: [Math.round(vx), Math.round(vy)], encendidos: enc, total: A.N, camino, horizonte: alto ? null : 74 };
}
// el estandarte de la sala secreta (x 72–92, y 32–92): paño violeta oscuro con orla de latón y el ojo de la orden
// como pictograma; lo fijo (la borla que se mece la pone b_salaVida)
function b_salaEstandarte(R) {
  const { pset, rect, linea } = R, P = b_PD, V = [hex('#1e1426'), hex('#2e1e3a'), hex('#40294f'), hex('#563868')];
  rect(70, 31, 94, 33, P.laton); rect(70, 31, 94, 31, P.latonL); pset(69, 32, P.latonW); pset(95, 32, P.latonW);
  for (let y = 34; y <= 88; y++) { for (let x = 73; x <= 91; x++) {
    if (y > 80 && Math.abs(x - 82) > (88 - y) * 1.2) continue;
    const pl = Math.sin((x - 73) * 0.9) * 0.7, n = 1.6 + pl - (y - 34) / 80 + (x < 75 ? -0.6 : x > 89 ? -0.4 : 0);
    pset(x, y, (x === 74 || x === 90) && y < 81 ? P.laton : V[Math.max(0, Math.min(3, Math.floor(n + b_umbral(x, y) - 0.5)))]); } }
  linea(74, 81, 82, 88, P.laton); linea(90, 81, 82, 88, P.laton);
  // el ojo de la orden: almendra de latón con la pupila y tres rayos
  for (let x = 76; x <= 88; x++) { const a = Math.round(Math.sqrt(Math.max(0, 1 - ((x - 82) / 6.5) ** 2)) * 3.4); pset(x, 56 - a, P.latonL); pset(x, 56 + a, P.laton); }
  R.disco(82, 56, 1.8, P.latonW); pset(82, 56, P.m0); for (const [dx, dy] of [[-4, -7], [0, -8], [4, -7]]) linea(82 + dx * 0.6, 56 + dy * 0.6, 82 + dx, 56 + dy, P.laton);
  for (let y = 66; y <= 74; y += 4) linea(78, y, 86, y, P.latonS);
}

// la estantería del flanco derecho de la sala secreta (x 288–318, y 84–146): estuches de pergaminos con tapas de
// latón, legajos atados, un frasco y la base del planetario de latón (los planetas que giran los pone b_salaVida)
function b_salaEstante(R) {
  const { pset, rect, disco } = R, P = b_PD, W = [hex('#2a1a14'), hex('#3e281c'), hex('#563a26'), hex('#6e4c30')];
  rect(287, 84, 319, 147, P.m0);
  for (let y = 85; y <= 146; y++) for (let x = 288; x <= 319; x++) pset(x, y, W[Math.max(0, Math.min(3, Math.floor(0.6 + (x - 288) / 40 + b_umbral(x, y) * 0.6)))]);
  for (const x of [288, 289, 318, 319]) rect(x, 84, x, 147, x < 300 ? P.latonS : P.laton);
  for (const y of [96, 116, 136]) { rect(288, y, 319, y + 2, P.laton); rect(288, y, 319, y, P.latonL); rect(288, y + 3, 319, y + 3, P.m0); }
  // estuches de pergaminos apilados (tubos vistos por la boca)
  for (let k = 0; k < 6; k++) { const x = 293 + (k % 3) * 7, y = 111 - Math.floor(k / 3) * 6; disco(x, y, 2.8, P.m0); disco(x, y, 2.2, k % 2 ? P.laton : P.latonS); disco(x - 0.5, y - 0.5, 1, P.latonW); pset(x, y + 1, P.m0); }
  rect(312, 101, 316, 115, P.m0); rect(313, 102, 315, 114, W[3]); rect(313, 106, 315, 106, P.latonL); rect(313, 110, 315, 110, P.latonL);
  // legajos atados y un frasco de tinta
  for (let k = 0; k < 4; k++) { const x = 292 + k * 5, hh = 12 + (k % 2) * 3; rect(x, 135 - hh, x + 3, 135, P.m0); rect(x + 1, 136 - hh, x + 3, 134, [hex('#c8b890'), hex('#a8986c'), hex('#d8c8a0'), hex('#b0a078')][k]); pset(x + 1, 128 - (k % 2), P.rojo); rect(x, 129, x + 3, 129, P.latonS); }
  rect(311, 127, 316, 135, P.m0); rect(312, 128, 315, 134, P.a1); pset(312, 129, P.a3); rect(313, 125, 314, 127, P.m3);
  // la base del planetario (sobre el estante de arriba)
  rect(300, 93, 308, 95, P.latonS); rect(303, 86, 305, 93, P.laton); rect(301, 93, 307, 93, P.latonL);
  for (let y = 138; y <= 146; y++) for (let x = 290; x <= 317; x++) if (b_umbral(x, y) < 0.3) pset(x, y, W[0]);
}

// la vida de la sala secreta: el planetario que gira, la borla del estandarte, el reflejo naranja del tanque en el
// suelo pulido y el autómata de latón que limpia el suelo de la izquierda (pasa por delante, bajo los pies: y 164–173)
function b_salaVida(R, t) {
  const { pset, rect, disco, linea } = R, P = b_PD;
  // el planetario: el sol de latón y tres planetas en sus anillos
  disco(304, 86, 2.2, P.ambarL); pset(304, 85, P.latonW);
  for (const [r, v, c, k] of [[5, 1.1, P.a3, 0], [8, 0.7, P.g4, 1], [11, 0.45, P.verde, 2]]) { const a = t * v + k * 2.1, x = Math.round(304 + Math.cos(a) * r), y = Math.round(86 + Math.sin(a) * r * 0.35);
    pset(x, y, c); if (k === 2) pset(x + 1, y, c); if (Math.sin(a) < 0 && k < 2) pset(x, y + 1, P.m0); }
  // la borla del estandarte que se mece
  const bx = Math.round(82 + Math.sin(t * 1.3) * 1.2); linea(82, 88, bx, 92, P.laton); pset(bx, 93, P.latonL); pset(bx - 1, 94, P.laton); pset(bx + 1, 94, P.laton); pset(bx, 95, P.latonS);
  // el reflejo del tanque en el suelo pulido, que tiembla con el gas
  for (let y = 160; y < 180; y++) { const v = 1 - (y - 160) / 20, ond = Math.round(Math.sin(y * 0.9 + t * 3) * 1.5); for (let x = 226; x <= 276; x++) { const u = Math.abs(x - 251) / 26; if (b_umbral(x + ond, y) < v * (1 - u * u) * 0.5) b_luzPx(R, x, y, (y + Math.floor(t * 4)) % 5 ? P.g3 : P.g4, 0.45); } }
  // el autómata de latón: un escarabajo con cúpula que va y viene limpiando, con su piloto y una estela que brilla
  const per = 12, u = (t % per) / per, ida = u < 0.5, xb = Math.round(ida ? 12 + u * 2 * 52 : 64 - (u - 0.5) * 2 * 52), yb = 167, d = ida ? 1 : -1, paso = Math.floor(t * 8) % 2;
  for (let k = 1; k < 7; k++) { const xs = xb - d * (6 + k * 3); if (xs > 4 && xs < 72 && b_umbral(xs, yb) < 0.7 - k * 0.1) pset(xs, yb, P.m4); }
  rect(xb - 5, yb - 2, xb + 5, yb, P.m0); rect(xb - 4, yb - 2, xb + 4, yb - 1, P.laton);
  for (let x = -4; x <= 4; x++) { const hh = Math.round(Math.sqrt(1 - (x / 4.5) ** 2) * 4); for (let y = 1; y <= hh; y++) pset(xb + x, yb - 2 - y, y === hh ? P.m0 : x * d > 1 ? P.latonW : x * d > -2 ? P.latonL : P.laton); }
  pset(xb + d * 3, yb - 4, Math.sin(t * 6) > 0 ? P.a3 : P.a1); pset(xb + d * 5, yb - 1, P.m3); pset(xb + d * 6, yb - 1 - paso, P.m4);
  for (const dx of [-3, 2]) pset(xb + dx + paso, yb + 1, P.m0);
}

// lo fijo del tanque de cerca a los lados del cristal: la tubería que entra en la tapa con bridas, el letrero de peligro
// (triángulo con la llama), el armario de control de la izquierda (x 32–74, y 114–177) con su pantalla y su rejilla,
// los cables que bajan a él, el armario de ampollas de la derecha (x 248–292, y 122–177), el disco de aviso y los
// cables que cuelgan entre las tuberías (todo fuera de la esquina de Atom y de la barra del año)
function b_tanqueCercaFijo(R) {
  const { pset, rect, disco, linea, poligono } = R, P = b_PD;
  for (let x = 0; x <= 80; x++) for (let i = 0; i < 6; i++) pset(x, 30 + i, [P.m1, P.m3, P.m4, P.m3, P.m2, P.m0][i]);
  for (const x of [8, 40, 74]) { rect(x, 28, x + 3, 37, P.laton); rect(x, 28, x + 3, 28, P.latonL); rect(x + 3, 28, x + 3, 37, P.latonS); pset(x + 1, 30, P.latonW); pset(x + 1, 35, P.latonW); }
  poligono([[64, 43], [72, 57], [56, 57]], P.m0); poligono([[64, 45], [70, 56], [58, 56]], P.ambar); linea(64, 46, 59, 55, P.ambarL);
  for (const [x, y] of [[64, 49], [63, 51], [64, 51], [65, 51], [62, 53], [63, 53], [64, 53], [65, 53], [66, 53], [63, 54], [64, 54], [65, 54]]) pset(x, y, P.m0); pset(64, 52, P.ambar);
  // los cables que bajan al armario
  for (let k = 0; k < 3; k++) for (let y = 58; y < 115; y++) { const x = Math.round(60 + k * 3 + Math.sin(y * 0.09 + k) * 1.5 + (y > 100 ? (y - 100) * 0.1 : 0)); pset(x, y, k === 1 ? P.rojo : P.m0); pset(x + 1, y, P.m2); }
  // el armario de control de la izquierda
  rect(32, 114, 74, 177, P.m0); rect(33, 115, 73, 176, P.m2); rect(33, 115, 73, 115, P.m4); rect(33, 116, 33, 176, P.m3); rect(73, 116, 73, 176, P.m1);
  rect(36, 118, 58, 132, P.m0); rect(37, 119, 57, 131, P.pantalla); rect(37, 119, 57, 119, P.v1);
  rect(59, 118, 71, 132, P.m1); rect(36, 135, 71, 136, P.latonS); rect(36, 135, 71, 135, P.laton);
  for (let y = 140; y <= 170; y += 3) { rect(37, y, 69, y, P.m0); rect(37, y + 1, 69, y + 1, P.m3); }
  for (const [x, y] of [[35, 117], [71, 117], [35, 174], [71, 174]]) { pset(x, y, P.m4); pset(x, y + 1, P.m0); }
  rect(42, 160, 50, 166, P.m1); rect(43, 161, 49, 165, P.latonS); pset(46, 163, P.latonW);
  // los cables que cuelgan entre las tuberías de la derecha
  for (let k = 0; k < 3; k++) for (let x = 268; x <= 297; x++) { const u = (x - 268) / 29, y = Math.round(56 + k * 3 + Math.sin(u * Math.PI) * (7 + k * 2)); pset(x, y, [P.m0, P.ambar, P.m0][k]); pset(x, y + 1, P.m2); }
  // el disco de aviso (círculo de ámbar con tres gajos) y el armario de ampollas de la derecha
  disco(254, 100, 6, P.m0); disco(254, 100, 5, P.ambar);
  for (let y = -5; y <= 5; y++) for (let x = -5; x <= 5; x++) { const r = Math.hypot(x, y), a = Math.atan2(y, x) + 1.57; if (r > 1.5 && r < 4.6 && Math.floor((a + 6.28) / 1.047) % 2 === 0) pset(254 + x, 100 + y, P.m0); }
  pset(254, 100, P.m0);
  rect(248, 122, 292, 177, P.m0); rect(249, 123, 291, 176, P.m2); rect(249, 123, 291, 123, P.m4); rect(291, 124, 291, 176, P.m1);
  rect(252, 126, 288, 150, P.m0); rect(253, 127, 287, 149, P.m1); rect(253, 149, 287, 150, P.laton);
  for (let k = 0; k < 5; k++) { const x = 255 + k * 7; rect(x, 129, x + 4, 147, P.m0); rect(x + 1, 130, x + 3, 146, P.g0); rect(x + 1, 128, x + 3, 129, P.laton); }
  for (let y = 155; y <= 172; y += 6) { rect(252, y, 288, y + 4, P.m1); rect(252, y, 288, y, P.m3); rect(268, y + 2, 272, y + 2, P.latonL); }
  rect(282, 116, 290, 122, P.m0); rect(283, 117, 289, 121, P.m3);
}

// la vida del tanque de cerca: la luz del gas en los flancos, la pantalla con su onda, los botones, las ampollas que se
// llenan y vacían, la baliza que gira y la gota que cae de la brida junto al cristal
function b_tanqueCercaVida(R, t) {
  const { pset, rect, linea } = R, P = b_PD, B = R.buf, pul = 0.8 + Math.sin(t * 1.7) * 0.12 + Math.sin(t * 5.1) * 0.06;
  for (const [xa, xb, lado] of [[52, 83, -1], [237, 268, 1]]) for (let y = 16; y < 178; y++) for (let x = xa; x <= xb; x++) { const d = lado < 0 ? 84 - x : x - 236, a = (1 - d / 32) ** 2 * 0.38 * pul; if (a > 0.03) B[y * 320 + x] = b_mezcla(B[y * 320 + x], P.g3, a); }
  for (let x = 37; x <= 57; x++) pset(x, Math.round(125 + Math.sin(x * 0.7 - t * 6) * 3.5 * Math.sin(t * 0.9 + 0.5)), P.v4);
  pset(37 + Math.floor((t * 12) % 21), 129, P.v5);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const on = Math.sin(t * (1.5 + (i + j) % 3) + i * 2 + j * 3) > 0.1; rect(60 + i * 4, 120 + j * 4, 61 + i * 4, 121 + j * 4, on ? [P.verde, P.ambar, P.rojo][(i + j * 2) % 3] : P.m3); }
  for (let k = 0; k < 5; k++) { const x = 256 + k * 7, lv = Math.round((0.55 + 0.35 * Math.sin(t * 0.8 + k * 1.3)) * 16);
    for (let y = 146 - lv; y <= 146; y++) { pset(x, y, y === 146 - lv ? P.g5 : P.g3); pset(x + 1, y, y === 146 - lv ? P.g4 : P.g2); pset(x + 2, y, P.g1); }
    const bu = ((t * 1.4 + k * 0.37) % 1); if (lv > 4) pset(x + 1, Math.round(146 - bu * lv), P.g5); }
  const bz = Math.sin(t * 4); rect(284, 118, 288, 120, bz > 0 ? P.rojo : hex('#7a2a20')); if (bz > 0.5) { pset(283, 117, P.rojo); pset(289, 117, P.rojo); pset(286, 116, P.ambarL); pset(286, 115, P.rojo); }
  const per = 2.4, u = (t % per) / per; if (u < 0.75) { const y = Math.round(37 + (u / 0.75) ** 2 * 134); pset(76, y, P.vaporL); pset(76, y - 1, P.vapor); }
  else { const s = Math.round((u - 0.75) * 16); pset(76 - s, 171 - (s > 2 ? 0 : 1), P.vaporL); pset(76 + s, 171 - (s > 2 ? 0 : 1), P.vaporL); }
}

// lo fijo de los tres tanques de cerca, detrás de ellos: los chorretones de humedad en los azulejos y las dos tuberías
// horizontales (y 100–110) con collarines
function b_tanquesMuro(R) {
  const { pset, rect } = R, P = b_PD;
  for (let k = 0; k < 16; k++) { const x = Math.floor(h(k, 1, 860) * 316) + 2, y0 = 20 + Math.floor(h(k, 2, 860) * 70), L = 18 + Math.floor(h(k, 3, 860) * 40);
    for (let y = y0; y < y0 + L && y < 150; y++) { const a = 1 - (y - y0) / L; if (b_umbral(x, y) < 0.8 * a) pset(x, y, P.z0); if (b_umbral(x + 1, y) < 0.35 * a) pset(x + 1, y, P.z1); } }
  for (const [y, w] of [[100, 5], [108, 3]]) { for (let x = 0; x < 320; x++) for (let i = 0; i < w; i++) pset(x, y + i, w === 5 ? [P.m1, P.m3, P.m4, P.m2, P.m0][i] : [P.m2, P.m4, P.m0][i]);
    for (let x = 4; x < 320; x += 48) { rect(x, y - 1, x + 2, y + w, P.laton); rect(x, y - 1, x, y + w, P.latonL); } }
}

// lo fijo de los tres tanques de cerca, delante del muro: la estantería de frascos de la izquierda (x 12–28), el
// cuadro de mandos de la derecha (x 291–317, y 56–120) con sus mangueras, la pantalla y el letrero de peligro del
// hueco izquierdo, la pantallita del hueco derecho (x 215–224) y, en el suelo, los sumideros, las mangueras planas y
// el charco (x 146–176, y 172–177)
function b_tanquesExtra(R) {
  const { pset, rect, disco, linea } = R, P = b_PD;
  rect(11, 40, 12, 149, P.m1); rect(24, 40, 25, 149, P.m1); rect(11, 40, 11, 149, P.m4);
  for (const y of [62, 88, 114, 140]) { rect(11, y, 25, y + 1, P.laton); rect(11, y, 25, y, P.latonL); rect(11, y + 2, 25, y + 2, P.m0);
    for (const [x, c] of [[13, y % 3 ? P.v3 : P.v2], [19, P.v2]]) { rect(x, y - 11, x + 4, y - 1, P.vS); rect(x + 1, y - 10, x + 3, y - 1, c); rect(x + 1, y - 10, x + 3, y - 9, P.v4); rect(x, y - 13, x + 4, y - 12, P.m3); R.disco(x + 2, y - 5, 1, P.v0); pset(x + 1, y - 7, P.v5); } }
  rect(290, 56, 318, 121, P.m0); rect(291, 57, 317, 120, P.m2); rect(291, 57, 317, 57, P.m4); rect(291, 58, 291, 120, P.m3);
  rect(294, 76, 314, 88, P.m0); rect(295, 77, 313, 87, P.pantalla); for (let k = 0; k < 4; k++) { rect(295, 92 + k * 6, 313, 95 + k * 6, P.m1); rect(296, 93 + k * 6, 300, 94 + k * 6, P.m3); }
  for (let k = 0; k < 2; k++) for (let y = 121; y < 159; y++) { const x = Math.round(297 + k * 10 + Math.sin((y - 121) * 0.12 + k * 2) * 3); pset(x, y, P.m0); pset(x + 1, y, k ? P.ambar : P.m3); }
  rect(95, 44, 109, 58, P.m0); rect(96, 45, 108, 57, P.pantalla);
  disco(123, 51, 5, P.m0); disco(123, 51, 4, P.ambar); for (let a = 0; a < 3; a++) { const an = a * 2.09 - 1.57; R.disco(123 + Math.cos(an) * 2, 51 + Math.sin(an) * 2, 1.2, P.m0); } pset(123, 51, P.ambar);
  rect(214, 50, 225, 62, P.m0); rect(215, 51, 224, 61, P.pantalla);
  for (const x of [105, 201]) { rect(x, 172, x + 12, 175, P.m0); for (let i = x + 1; i < x + 12; i += 2) rect(i, 173, i, 174, P.m3); }
  for (let x = 120; x < 156; x++) { const y = Math.round(162 + Math.sin(x * 0.18) * 1.5 + (x - 120) * 0.02); pset(x, y, P.m0); pset(x, y - 1, P.m3); }
  for (let x = 198; x < 236; x++) { const y = Math.round(166 - Math.sin(x * 0.15) * 1.2); pset(x, y, P.m0); pset(x, y - 1, P.v1); }
  for (let y = 172; y <= 177; y++) for (let x = 146; x <= 176; x++) { const d = Math.hypot((x - 161) / 15, (y - 174.5) / 3); if (d < 1) pset(x, y, b_mezcla(R.pget(x, y), d < 0.6 ? P.v3 : P.v2, 0.6)); }
}

// la vida de los tres tanques de cerca: las pantallas, los manómetros y los pilotos del cuadro, la burbuja que sube
// en un frasco y la gota que cae de la base del tanque del centro en el charco
function b_tanquesVida(R, t) {
  const { pset, rect } = R, P = b_PD;
  for (let k = 0; k < 5; k++) { const hh = 2 + Math.round((Math.sin(t * 2 + k * 1.4) * 0.5 + 0.5) * 9); rect(97 + k * 2 + (k > 2 ? k - 2 : 0), 56 - hh, 97 + k * 2 + (k > 2 ? k - 2 : 0), 56, k === 3 ? P.ambar : P.v4); }
  for (let x = 296; x <= 312; x++) pset(x, Math.round(82 + Math.sin(x * 0.9 - t * 5) * 3 * Math.sin(t * 0.7)), P.v4);
  b_manometro(R, 300, 67, 6, t, 6); for (let k = 0; k < 3; k++) pset(311, 62 + k * 4, Math.sin(t * 3 + k * 2) > 0 ? [P.verde, P.ambar, P.rojo][k] : P.m3);
  for (let k = 0; k < 4; k++) pset(304 + (k % 2) * 8, 93 + k * 6, Math.sin(t * 2.5 + k * 1.7) > 0 ? [P.verde, P.ambar, P.verde, P.rojo][k] : P.m3);
  for (let k = 0; k < 6; k++) pset(216 + ((k * 3 + Math.floor(t * 4)) % 8), 52 + ((k * 5 + Math.floor(t * 2)) % 9), k % 2 ? P.v4 : P.v3);
  b_manometro(R, 101, 74, 4, t, 8);
  for (let k = 0; k < 2; k++) { const per = 1.6 + k * 0.5, u = ((t + k * 0.8) % per) / per, x = 14 + k * 6, y0 = k ? 113 : 87; pset(x + 1, Math.round(y0 - 2 - u * 8), P.v5); }
  const per = 2.8, u = (t % per) / per;
  if (u < 0.35) pset(165, Math.round(158 + (u / 0.35) ** 2 * 16), P.v5);
  else { const s = (u - 0.35) / 0.65, rx = Math.round(2 + s * 12), ry = Math.max(1, Math.round(rx / 5)); for (let a = 0; a < 6.28; a += 0.25) pset(Math.round(165 + Math.cos(a) * rx), Math.round(174.5 + Math.sin(a) * ry), s < 0.6 ? P.v5 : P.v4); }
}

// lo fijo del laboratorio grande: la bandeja de cables y los apliques de ámbar de las paredes laterales, el carril del techo (y 31–33, x 56–264) con sus soportes, los charcos con el reflejo
// verde de los tanques, los sumideros y el carrito de frascos (x 100–118, y 116–130) junto a la hilera de la izquierda
function b_labFijo(R) {
  const { pset, rect, linea } = R, P = b_PD, L0x = (f, lado) => 160 + lado * 190 * f;
  for (const lado of [-1, 1]) { linea(L0x(1, lado), 78 - 58, L0x(0.4, lado), 78 - 58 * 0.4, P.m0); linea(L0x(1, lado), 79 - 58, L0x(0.4, lado), 79 - 58 * 0.4, P.m3); linea(L0x(1, lado), 80 - 58, L0x(0.4, lado), 80 - 58 * 0.4, P.m1);
    for (const f of [0.46, 0.55, 0.67, 0.82, 1]) { const x = Math.round(L0x(f, lado)), y = Math.round(78 - 48 * f), s = Math.max(2, Math.round(3 * f)); if (x > 266 || x < 2) continue;   // fuera de la esquina de Atom rect(x - s, y - s, x + s, y + s, P.m0); rect(x - s + 1, y - s + 1, x + s - 1, y + s - 1, P.ambar); rect(x - s + 1, y - s + 1, x, y, P.ambarL); pset(x - s, y + s, P.latonS);
      for (let yy = y + s + 1; yy < y + s + 1 + 10 * f; yy++) for (let xx = x - 3; xx <= x + 3; xx++) if (b_umbral(xx, yy) < 0.4 * (1 - (yy - y) / (12 * f + 1))) pset(xx, yy, b_mezcla(R.pget(xx, yy), P.ambar, 0.3)); } }
  rect(56, 31, 264, 33, P.m2); rect(56, 31, 264, 31, P.m4); rect(56, 34, 264, 34, P.m0); for (let x = 60; x <= 262; x += 26) { linea(x, 0, x, 30, P.m1); pset(x, 31, P.latonL); }
  for (const [cx, cy, rx, ry] of [[58, 162, 18, 3], [262, 168, 22, 4], [104, 140, 10, 2], [218, 138, 12, 2], [30, 174, 14, 3]]) for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) {
    const d = Math.hypot((x - cx) / rx, (y - cy) / ry) + (h(x >> 1, y, 870) - 0.5) * 0.3; if (d > 1) continue; const ref = Math.abs(x - cx - rx * 0.2) < rx * 0.22;
    pset(x, y, d > 0.82 ? b_mezcla(R.pget(x, y), P.v2, 0.5) : ref && b_umbral(x, y) < 0.5 ? b_mezcla(P.v2, P.v3, (y - cy + ry) / (2 * ry)) : b_mezcla(R.pget(x, y), P.m0, 0.45)); }
  for (const [cx, cy] of [[40, 158], [284, 172]]) { rect(cx - 7, cy - 1, cx + 7, cy + 1, P.m0); for (let x = cx - 6; x <= cx + 6; x += 2) pset(x, cy, P.m3); }
  // los cables gruesos que salen de las bases de los tanques y cruzan el suelo hasta el pasillo, y las chapas de aviso
  for (const lado of [-1, 1]) for (let k = 0; k < 2; k++) { let px = null, py = null; for (let i = 0; i <= 40; i++) { const u = i / 40, x = Math.round(160 + lado * (118 - k * 40 - u * (70 - k * 30))), y = Math.round(142 + k * 6 + u * (14 - k * 4) + Math.sin(u * 6 + k) * 2);
    if (px !== null) { linea(px, py, x, y, P.m0); linea(px, py - 1, x, y - 1, k ? P.m3 : P.v1); } px = x; py = y; } }
  for (const [x0, y0] of [[62, 152], [244, 156]]) for (let y = 0; y < 4; y++) for (let x = 0; x < 16; x++) pset(x0 + x + y, y0 + y, ((x + y) >> 1) % 2 ? P.m0 : P.ambar);
  // el carrito de frascos
  rect(100, 118, 118, 119, P.m4); rect(100, 125, 118, 126, P.m3); rect(100, 118, 101, 130, P.m2); rect(117, 118, 118, 130, P.m2); rect(98, 116, 100, 117, P.m4);
  for (const [x, y] of [[100, 131], [117, 131]]) { pset(x, y, P.m0); pset(x + 1, y, P.m3); }
  for (let k = 0; k < 4; k++) { const x = 103 + k * 4, c = [P.v3, P.ambar, P.v4, P.v2][k]; rect(x, 113, x + 2, 117, P.vS); rect(x, 114, x + 2, 117, c); pset(x, 114, P.v5); pset(x + 1, 112, P.m3); }
  for (let k = 0; k < 3; k++) { const x = 104 + k * 5; rect(x, 121, x + 3, 124, P.m1); pset(x + 1, 121, P.v3); }
}

// la vida del laboratorio grande: la grúa del techo que va y viene por el carril con un bidón colgado, los anillos de
// las gotas en los charcos y los brillos del carrito
function b_labVida(R, t) {
  const { pset, rect, linea } = R, P = b_PD;
  const gx = Math.round(160 + Math.sin(t * 0.22) * 84), L = Math.round(10 + Math.sin(t * 0.5) * 3), sw = Math.round(Math.cos(t * 0.22) * 1.5);
  rect(gx - 5, 29, gx + 5, 32, P.m3); rect(gx - 5, 29, gx + 5, 29, P.m5); pset(gx - 3, 34, P.m0); pset(gx + 3, 34, P.m0); pset(gx + 4, 30, Math.sin(t * 5) > 0 ? P.ambar : P.m2);
  linea(gx, 33, gx + sw, 33 + L, P.m0); rect(gx + sw - 3, 34 + L, gx + sw + 3, 42 + L, P.m0); rect(gx + sw - 2, 35 + L, gx + sw + 2, 41 + L, P.v3); rect(gx + sw - 2, 35 + L, gx + sw - 2, 41 + L, P.v4); rect(gx + sw - 3, 38 + L, gx + sw + 3, 38 + L, P.laton);
  for (const [cx, cy, rx, ry, k] of [[58, 162, 18, 3, 0], [262, 168, 22, 4, 1], [30, 174, 14, 3, 2]]) { const per = 2.2 + k * 0.7, u = ((t + k * 1.1) % per) / per, x0 = cx + Math.round((h(k, Math.floor((t + k * 1.1) / per), 871) - 0.5) * rx), r = 1 + u * 7;
    for (let a = 0; a < 6.28; a += 0.3) { const x = Math.round(x0 + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r * ry / rx * 0.9); if (Math.hypot((x - cx) / rx, (y - cy) / ry) < 1) pset(x, y, u < 0.5 ? P.v5 : P.v4); } }
  for (const [cx, cy, rx, k] of [[58, 162, 18, 0], [262, 168, 22, 1], [104, 140, 10, 2], [218, 138, 12, 3], [30, 174, 14, 4]]) { const x = Math.round(cx + rx * 0.2 + Math.sin(t * 1.3 + k) * rx * 0.3); pset(x, cy, P.v5); pset(x + 1, cy, P.v4); }
  if (Math.sin(t * 1.7) > 0.7) pset(104, 114, P.v5); if (Math.sin(t * 2.3 + 1) > 0.7) pset(112, 114, P.v5);
}

// pictogramas tallados de 5 × 5 (sol, halcón, gota, dunas, mano): marcas de los Fremen en la roca, nunca letras
const C_PICTO = [
  ['..#..', '#.#.#', '.###.', '#.#.#', '..#..'],
  ['#...#', '##.##', '.###.', '..#..', '.#.#.'],
  ['..#..', '.###.', '#####', '#####', '.###.'],
  ['.....', '.#...', '#.#.#', '...#.', '.....'],
  ['#.#.#', '#.#.#', '#####', '.####', '..##.'],
];

// un pictograma tallado en (x, y) con lado 5·e: el surco oscuro y su filo de luz debajo (la luz viene de arriba)
function c_picto(R, x, y, k, e, oscuro, luz) {
  const m = C_PICTO[k % C_PICTO.length];
  for (let j = 0; j < 5 * e; j++) for (let i = 0; i < 5 * e; i++) if (m[Math.floor(j / e)][Math.floor(i / e)] === '#') {
    c_mezP(R, x + i, y + j, oscuro, 0.75);
    if (m[Math.floor((j + 1) / e)]?.[Math.floor(i / e)] !== '#') c_mezP(R, x + i, y + j + 1, luz, 0.45);
  }
}

// la estría de los estratos de la pared del cuarto (se suma al tono): una línea oscura con su filo claro encima
const c_estratoC = (x, y) => { const e = Math.sin(y * 0.55 + Math.sin(x * 0.035) * 2.4 + Math.sin(x * 0.11) * 0.6); return e > 0.95 ? -0.9 : e > 0.84 ? 0.35 : 0; };

// una grieta de la roca: la quebrada oscura con un filo encendido a un lado
function c_grieta(R, pts, oscuro, luz) {
  for (let i = 0; i + 1 < pts.length; i++) { const [a, b] = pts[i], [c, d] = pts[i + 1]; R.linea(a, b, c, d, oscuro); R.linea(a + 1, b, c + 1, d, (x, y) => c_mez(R.pget(x, y), luz, 0.35)); }
}

// lo que se añade al cuarto de las cunas (en su capa fija): grietas, el sol tallado sobre el nicho, el baliset colgado,
// la sarta de anillos de agua y un calabacino junto al haz, el halcón tallado sobre el estante y el pebetero del suelo
function c_cuartoMas(R) {
  const { pset, rect, linea, disco } = R, L = (x, y) => 1 / (1 + (((x - 79) ** 2 + ((y - 98) * 1.2) ** 2) / 10000) * 2.6);
  for (const g of [[[150, 28], [156, 44], [153, 58], [158, 72]], [[212, 26], [216, 38], [214, 50]], [[272, 96], [276, 108], [274, 120]], [[100, 116], [96, 124], [99, 132]]]) c_grieta(R, g, C_ROCA[1], C_ROCA[7]);
  // el sol tallado sobre el nicho, encendido por la lámpara
  { const cx = 79, cy = 50;
    for (let y = cy - 10; y <= cy + 10; y++) for (let x = cx - 10; x <= cx + 10; x++) { const d = Math.hypot(x - cx, y - cy), a = Math.atan2(y - cy, x - cx);
      if (d <= 5) pset(x, y, c_tono(C_ROCA, 3 + L(x, y) * 5 + (x + y < cx + cy ? 1.2 : -0.6), x, y));
      else if (d <= 6.2) pset(x, y, C_ROCA[1]);
      else if (d <= 10 && Math.abs(((a / (Math.PI / 6)) % 1 + 1) % 1 - 0.5) < 0.16) pset(x, y, c_tono(C_ROCA, 2 + L(x, y) * 4.5 + (y < cy ? 1 : -0.4), x, y)); }
    pset(cx - 2, cy - 2, C_ROCA[9]); pset(cx - 1, cy - 3, C_ROCA[8]); }
  // el baliset colgado de una estaca, a la izquierda: caja redonda con su boca, mástil, clavijas y cuerdas
  { const MD = c_hx(['#2a160a', '#4e2c14', '#7a4a22', '#a8743a', '#d0a060']);
    linea(44, 42, 44, 46, C_ROCA[1]); pset(43, 42, MD[3]); pset(45, 42, MD[3]);
    for (let y = 46; y <= 70; y++) for (let x = 43; x <= 45; x++) pset(x, y, x === 43 ? MD[3] : x === 45 ? MD[1] : MD[2]);
    for (const y of [48, 51, 54]) { pset(42, y, MD[4]); pset(46, y, MD[1]); }
    for (let y = 70; y <= 85; y++) for (let x = 37; x <= 51; x++) { const dx = (x - 44) / 7, dy = (y - 78) / 7.5, d = dx * dx + dy * dy; if (d > 1) continue; pset(x, y, d > 0.8 ? MD[0] : c_tono(MD, 2.4 - dx * 1.2 - dy * 0.8 + ((x + y) % 5 === 0 ? 0.3 : 0), x, y)); }
    disco(44, 77, 2, MD[0]); pset(43, 76, hex('#120804'));
    for (const x of [43, 45]) for (let y = 47; y <= 83; y++) if (!(y >= 75 && y <= 79 && Math.abs(x - 44) <= 1 && y !== 75)) pset(x, y, y % 2 ? hex('#e8d8b0') : hex('#c8b890'));
    rect(41, 82, 47, 82, MD[0]); }
  // la sarta de anillos de agua colgada de una estaca y un calabacino con su cordón
  { pset(166, 45, C_ROCA[1]); pset(167, 45, C_ROCA[7]); linea(166, 46, 166, 84, hex('#6a4a2a'));
    for (let k = 0; k < 6; k++) { const y = 52 + k * 6, sh = k % 2; for (let i = -3; i <= 3; i++) for (let j = -2; j <= 2; j++) { const d = (i / 3.2) ** 2 + (j / 2.2) ** 2; if (d > 1 || d < 0.35) continue; pset(166 + i + sh, y + j, i + j < 0 ? C_LATON[3] : i + j > 1 ? C_LATON[0] : C_LATON[2]); } }
    linea(176, 46, 177, 60, hex('#6a4a2a'));
    for (let y = 60; y <= 76; y++) for (let x = 170; x <= 184; x++) { const dx = (x - 177) / (y < 66 ? 3.5 : 7), dy = (y - (y < 66 ? 63 : 70)) / (y < 66 ? 3.5 : 6.5), d = dx * dx + dy * dy; if (d > 1) continue; pset(x, y, c_tono(c_hx(['#3a2a10', '#6a5220', '#9a7a34', '#c8a850']), 2.2 - dx * 1.3 - dy * 0.5, x, y)); } }
  // el halcón tallado sobre el estante
  c_picto(R, 239, 39, 1, 2, C_ROCA[1], C_ROCA[6]);
  // el pebetero de latón del suelo, a la derecha de la alfombra (el humo, en cada fotograma)
  { for (let x = 262; x <= 276; x++) for (let y = 156; y <= 162; y++) { const d = ((x - 269) / 7.5) ** 2 + ((y - 156) / 6.5) ** 2; if (y > 156 && d > 1) continue; pset(x, y, y === 156 ? C_LATON[3] : c_tono(C_LATON, 2.3 - (x - 269) * 0.12 - (y - 156) * 0.15, x, y)); }
    for (const x of [264, 269, 274]) { pset(x, 163, C_LATON[0]); pset(x, 164, C_LATON[0]); }
    for (let i = -7; i <= 9; i++) c_mezP(R, 269 + i, 165, C_ROCA[0], 0.5);
    for (let x = 264; x <= 274; x++) pset(x, 155, (x & 1) ? hex('#3a2010') : hex('#a84a24')); }
}

// el humo del pebetero, una polilla que ronda la lámpara del nicho (en cada fotograma)
function c_cuartoVida(R, t) {
  for (let k = 0; k < 16; k++) { const u = ((t * 0.22 + k / 16) % 1), y = Math.round(153 - u * 46), x = Math.round(269 + Math.sin(u * 7 + t * 0.9) * (2 + u * 7) + Math.sin(t * 0.4) * u * 4); c_mezP(R, x, y, hex('#c8c0b8'), 0.42 * (1 - u)); if (u < 0.6) c_mezP(R, x + 1, y, hex('#a8a098'), 0.25 * (1 - u)); }
  if (Math.sin(t * 9) > -0.5) R.pset(269, 154, hex('#ff9030'));
  const a = t * 2.3, x = Math.round(79 + Math.cos(a) * 9 + Math.sin(a * 2.7) * 2), y = Math.round(94 + Math.sin(a * 1.4) * 5), ala = Math.floor(t * 18) & 1;
  R.pset(x, y, hex('#d8c8a0')); R.pset(x + (ala ? -1 : 1), y - ala, hex('#b8a880')); R.pset(x, y + 1, hex('#6a5a40'));
}

// un punto de las paredes del pasillo: s 0 (el borde de la pantalla) – 1 (la pared del fondo); vv 0 arriba – 1 abajo
const c_pPared = (s, vv, lado) => { const x = lado < 0 ? c_PL * s : 320 - (320 - c_PR) * s, yt = c_PF * s, yb = 180 - (180 - c_PB) * s; return [x, yt + vv * (yb - yt)]; };

// lo que se añade al pasillo (en su capa fija): juntas de la bóveda, hollín sobre los candiles, los frisos de
// pictogramas de las dos paredes, el tapiz de la derecha, la hornacina con cántaros, los medallones del fondo, el banco
// con su cesto, la sarta de anillos de agua, la arena que se acumula al pie de las paredes y lo que hay en el suelo
function c_puertaMas(R) {
  const { pset, rect, linea, poligono } = R;
  // los sillares de las dos paredes en perspectiva: hiladas con su junta oscura y el canto claro, y llagas que fugan
  for (const lado of [-1, 1]) for (let i = 0; i < 84; i++) {
    const X = lado < 0 ? i : 319 - i, s = i / c_PL, s1 = (i + 1) / c_PL, col = Math.floor(-Math.log(1.06 - s) * 7), col1 = Math.floor(-Math.log(1.06 - s1) * 7);
    const yt = c_PF * s, yb = 180 - (180 - c_PB) * s, alto = (yb - yt) / 15;
    for (let y = Math.ceil(yt) + 1; y < yb - 1; y++) { const r = (y - yt) / alto, fila = Math.floor(r), fr = (r - fila) * alto;
      const llaga = ((col + (fila & 1)) & 1) === 0 && col !== col1;
      if (fr < 0.9 || llaga) c_mezP(R, X, y, C_FRIO[0], 0.42); else if (fr < 1.9) c_mezP(R, X, y, C_FRIO[7], 0.16); else if (h(col, fila + (lado > 0 ? 50 : 0), 69) > 0.7) c_mezP(R, X, y, C_FRIO[6], 0.08); }
  }
  // la bóveda: juntas longitudinales que fugan a la puerta y transversales cada vez más juntas
  for (let y = 0; y < c_PF; y++) { const s = y / c_PF, x0 = c_PL * s, w = 320 - 2 * c_PL * s, fila = Math.floor(-Math.log(1.03 - s) * 5), fila1 = Math.floor(-Math.log(1.03 - (y + 1) / c_PF) * 5);
    for (let x = Math.ceil(x0); x < x0 + w; x++) { const u = (x - x0) / w, col = Math.floor(u * 12 + (fila & 1) * 0.5), ju = Math.abs(((u * 12 + (fila & 1) * 0.5) % 1) - 0.5) > 0.5 - 0.6 / (w / 12);
      let c = R.pget(x, y); if (ju || fila !== fila1) c = c_mez(c, C_FRIO[0], 0.55); else c = c_mez(c, (h(col, fila, 60) > 0.5 ? C_FRIO[4] : C_FRIO[1]), Math.abs(h(col, fila, 60) - 0.5) * 0.5); pset(x, y, c); } }
  // el hollín que suben los candiles
  for (const [cx, cy] of [[38, 88], [282, 92]]) for (let y = cy - 30; y < cy - 6; y++) for (let x = cx - 7; x <= cx + 7; x++) { const u = (cy - 6 - y) / 24, w = 3 + u * 4; if (Math.abs(x - cx - Math.sin(u * 4) * 2) < w && c_b4(x, y) < 0.7 - u * 0.5) c_mezP(R, x, y, hex('#06060a'), 0.35); }
  // los frisos de pictogramas tallados que corren por las dos paredes hacia la puerta
  for (const [lado, v0, v1] of [[-1, 0.16, 0.235], [1, 0.3, 0.375]]) {
    let q = 0;
    for (let i = 0; i <= 160; i++) { const s = 0.04 + i / 160 * 0.93, [x, ya] = c_pPared(s, v0, lado), [, yb] = c_pPared(s, v1, lado), [xn] = c_pPared(s + 0.93 / 160, v0, lado), X = Math.round(x), bh = yb - ya;
      if (Math.round(xn) === X) continue;
      for (let y = Math.round(ya) - 1; y <= Math.round(yb) + 1; y++) { const c = R.pget(X, y); pset(X, y, y < ya ? c_mez(c, C_FRIO[7], 0.4) : y > yb ? c_mez(c, C_FRIO[0], 0.6) : c_mez(c, C_FRIO[5], 0.3)); }
      q += 1 / Math.max(3, bh); const cel = Math.floor(q / 1.5), f = (q % 1.5); if (f >= 1.05) continue;
      const m = C_PICTO[(cel * 3 + (lado > 0 ? 1 : 0)) % C_PICTO.length], ci = Math.min(4, Math.floor(f / 1.05 * 5));
      for (let y = Math.round(ya + bh * 0.12); y <= Math.round(yb - bh * 0.12); y++) { const ri = Math.min(4, Math.floor((y - ya - bh * 0.12) / (bh * 0.76) * 5)); if (m[ri]?.[ci] === '#') pset(X, y, C_FRIO[1]); }
    }
  }
  // el tapiz colgado de la pared derecha, en perspectiva (bajo el friso, encima del candil no)
  { const s0 = 0.06, s1 = 0.3, v0 = 0.44, v1 = 0.64, TA = c_hx(['#1a0c0a', '#3a1610', '#6e281c', '#923a24', '#b45430', '#c8903c', '#26304e', '#3c4a76']);
    const [xa] = c_pPared(s0, v0, 1), [xb] = c_pPared(s1, v0, 1);
    for (let X = Math.round(xb); X <= Math.round(xa); X++) { const s = (320 - X) / (320 - c_PR), u = (s - s0) / (s1 - s0), [, ya] = c_pPared(s, v0, 1), [, yb] = c_pPared(s, v1, 1);
      for (let y = Math.round(ya); y <= Math.round(yb) + (X % 3 === 0 ? 2 : 1); y++) { const v = (y - ya) / (yb - ya);
        if (v > 1) { pset(X, y, TA[5]); continue; }
        const du = Math.abs(((u * 4) % 1) - 0.5), dv = Math.abs(((v * 3) % 1) - 0.5), rombo = du + dv < 0.32, borde = u < 0.08 || u > 0.92 || v < 0.07;
        const c = borde ? (Math.floor(v * 20) % 2 ? TA[5] : TA[6]) : rombo ? (du + dv < 0.14 ? TA[5] : TA[7]) : (Math.floor(v * 6) % 2 ? TA[3] : TA[2]);
        pset(X, y, c_mez(c, TA[0], 0.35 + (Math.sin(u * 30) > 0.6 ? 0.2 : 0))); } }
    { const [x0, y0] = c_pPared(s0, v0 - 0.01, 1), [x1, y1] = c_pPared(s1, v0 - 0.01, 1); linea(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), C_LATON[1]); } }
  // la hornacina de la pared derecha, junto a la boca lateral, con dos cántaros
  { const x0 = 241, y0 = 66; for (let y = y0; y <= y0 + 14; y++) for (let x = x0; x <= x0 + 11; x++) { if (y < y0 + 5 && (x - x0 - 5.5) ** 2 + (y - y0 - 5) ** 2 > 30) continue; pset(x, y, c_tono(C_FRIO, 0.3 + (y - y0) * 0.06, x, y)); }
    rect(x0 - 1, y0 + 15, x0 + 12, y0 + 15, C_FRIO[6]); rect(x0 + 2, y0 + 8, x0 + 5, y0 + 14, hex('#6a3418')); pset(x0 + 2, y0 + 9, hex('#c4743c')); rect(x0 + 3, y0 + 6, x0 + 4, y0 + 7, hex('#6a3418'));
    rect(x0 + 7, y0 + 10, x0 + 10, y0 + 14, hex('#4a5a6a')); pset(x0 + 7, y0 + 10, hex('#8a9aaa')); }
  // los dos medallones tallados de la pared del fondo (el sol y el halcón), encendidos por la luz de la puerta
  for (const [cx, cy, k] of [[106, 64, 0], [214, 64, 1]]) {
    const w = Math.exp(-(((cx - 160) / 46) ** 2) - (((cy - 128) / 40) ** 2));
    for (let y = cy - 10; y <= cy + 10; y++) for (let x = cx - 10; x <= cx + 10; x++) { const d = Math.hypot(x - cx, y - cy); if (d > 10) continue;
      pset(x, y, d > 8.6 ? C_FRIO[1] : d > 7.4 ? c_tono(C_FRIO, 4.4 + w * 3 + (y < cy ? 1.2 : -0.8), x, y) : c_tono(C_FRIO, 2.6 + w * 3 + c_tex(x, y, 61) * 0.4, x, y)); }
    c_picto(R, cx - 5, cy - 5, k, 2, C_FRIO[0], C_FRIO[6]);
  }
  // el banco de piedra a la derecha de la puerta, con un cesto, una tela doblada y un candil apagado
  { for (let y = 138; y <= 150; y++) for (let x = 194; x <= 232; x++) pset(x, y, y <= 140 ? c_tono(C_FRIO, 5 + (x < 210 ? 1 : 0), x, y) : c_tono(C_FRIO, 2.2 + c_tex(x, y, 62) * 0.5 - (y - 140) * 0.08 + (x < 205 ? 0.8 : 0), x, y));
    for (let x = 194; x <= 232; x++) pset(x, 151, C_FRIO[0]);
    for (let y = 127; y <= 137; y++) for (let x = 198; x <= 210; x++) { const teje = ((x + y) & 3) < 2; pset(x, y, y === 127 ? hex('#c8a060') : teje ? hex('#8a6230') : hex('#5e4220')); }
    rect(200, 125, 208, 126, hex('#4a6a3a')); pset(202, 124, hex('#6a8a4a')); pset(206, 124, hex('#d8a040'));
    rect(214, 133, 228, 137, hex('#34406a')); rect(214, 133, 228, 133, hex('#5a6a9a')); rect(215, 135, 227, 135, hex('#c8903c'));
    rect(222, 130, 226, 132, hex('#6a3418')); pset(227, 130, hex('#6a3418')); pset(222, 130, hex('#a85a2a')); }
  // la sarta de anillos de agua colgada de una estaca, a la derecha del banco
  { pset(230, 92, C_FRIO[7]); pset(231, 92, C_FRIO[7]); linea(230, 93, 230, 120, hex('#4a3a2a'));
    for (let k = 0; k < 5; k++) { const y = 98 + k * 5; for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) { const d = (i / 2.4) ** 2 + (j / 1.9) ** 2; if (d > 1 || d < 0.3) continue; pset(230 + i, y + j, i + j < 0 ? C_LATON[3] : C_LATON[1]); } } }
  // la arena que el viento mete y se acumula al pie de las dos paredes del pasillo
  for (let y = c_PB; y < 180; y++) for (const lado of [-1, 1]) { const s = 1 - (y - c_PB) / (180 - c_PB), xe = lado < 0 ? c_PL * s : 320 - (320 - c_PR) * s, w = 3 + (1 - s) * 9;
    for (let i = 0; i < w; i++) { const x = Math.round(xe - lado * i), a = (1 - i / w) * 0.55; if (c_b4(x, y) < a + Math.sin(x * 0.3 + y * 0.5) * 0.1) c_mezP(R, x, y, (i < 2 ? hex('#8a7058') : hex('#5a4a3e')), 0.6); } }
  // lo que hay en el suelo, fuera del paso: un cántaro a la izquierda; a la derecha un cesto con dátiles y unas sandalias
  { for (let y = 160; y <= 174; y++) for (let x = 40; x <= 52; x++) { const dx = (x - 46) / 6, dy = (y - 168) / 6.5; if (dx * dx + dy * dy > 1 && !(y < 163 && Math.abs(x - 46) <= 2)) continue; pset(x, y, c_tono(c_hx(['#1e0e08', '#3a1a0e', '#6a3418', '#9a5228', '#c4743c']), 2.2 + dx * 1.2 - dy * 0.5, x, y)); }
    for (let i = -7; i <= 8; i++) c_mezP(R, 46 + i, 175, C_FRIO[0], 0.6);
    for (let y = 162; y <= 172; y++) for (let x = 238; x <= 254; x++) { const teje = ((x - y) & 3) < 2; pset(x, y, y === 162 ? hex('#b08a50') : c_mez(teje ? hex('#7a5628') : hex('#4e3618'), C_FRIO[0], 0.25)); }
    for (let x = 240; x <= 252; x += 2) { pset(x, 161, hex('#5a2a14')); pset(x + 1, 160, hex('#7a3a1a')); }
    for (let i = -9; i <= 10; i++) c_mezP(R, 246 + i, 173, C_FRIO[0], 0.6);
    for (const x0 of [214, 222]) { rect(x0, 172, x0 + 5, 175, hex('#5a3a20')); rect(x0 + 1, 173, x0 + 4, 174, hex('#7a5232')); pset(x0 + 2, 171, hex('#3a2414')); } }
}

// la vida del pasillo en cada fotograma: el farol que cuelga de la bóveda y se mece, y una polilla en el candil derecho
function c_puertaVida(R, t) {
  const a = Math.sin(t * 0.9) * 0.08, x1 = Math.round(212 + a * 28), y1 = 26;
  R.linea(212, 0, x1, y1, (x, y) => ((x + y) & 1 ? C_LATON[1] : C_LATON[0]));
  const f = 0.75 + 0.25 * Math.sin(t * 7.7) * Math.sin(t * 3.1);
  c_brillo(R, x1, y1 + 6, 20, hex('#ffb860'), 0.22 * f);
  R.rect(x1 - 3, y1 + 1, x1 + 3, y1 + 1, C_LATON[2]); R.rect(x1 - 2, y1 + 2, x1 + 2, y1 + 8, C_LATON[0]); R.rect(x1 - 1, y1 + 3, x1 + 1, y1 + 7, hex('#ffd060'));
  R.pset(x1, y1 + 5, hex('#fff2c0')); if (f > 0.8) R.pset(x1, y1 + 3, hex('#ffffff')); R.rect(x1 - 3, y1 + 9, x1 + 3, y1 + 9, C_LATON[2]); R.pset(x1, y1 + 10, C_LATON[1]);
  R.pset(x1 - 2, y1 + 2, C_LATON[3]); R.pset(x1 + 2, y1 + 8, C_LATON[1]);
  const b = t * 2.6, mx = Math.round(282 + Math.cos(b) * 7 + Math.sin(b * 3.1) * 1.5), my = Math.round(86 + Math.sin(b * 1.3) * 4), ala = Math.floor(t * 20) & 1;
  R.pset(mx, my, hex('#d8c8a0')); R.pset(mx + (ala ? -1 : 1), my - ala, hex('#a89878'));
}

// lo que se añade al laberinto (en su capa fija). General: las mesetas lejanas con la lucecita de un sietch y las
// rocas de la llanura, frías, a la luna. Alto: rocas vistas desde arriba con su sombra y matas secas
function c_laberintoMas(R, alto) {
  const { pset } = R;
  if (!alto) {
    for (const [x0, x1, top, k] of [[0, 74, 58, 0], [244, 320, 62, 1]]) for (let x = x0; x < x1; x++) {
      const u = (x - x0) / (x1 - x0), cima = Math.round(top + (u < 0.15 ? (0.15 - u) * 60 : u > 0.85 ? (u - 0.85) * 60 : 0) + Math.sin(x * 0.4) * 0.8 + (h(x >> 2, k, 63) - 0.5) * 2);
      for (let y = cima; y < 74; y++) pset(x, y, y === cima ? C_ARENA_N[k ? 5 : 4] : c_tono(C_NOCHE, 1.6 + (y - cima) * 0.05 + (Math.sin(x * 0.7 + y * 0.2) > 0.85 ? 0.6 : 0) + (k && u < 0.3 ? 0.7 : 0), x, y));
    }
    pset(38, 68, hex('#e8a050')); pset(39, 68, hex('#a86a30')); pset(52, 70, hex('#c88a40'));
    for (const [cx, cy, r] of [[22, 98, 4], [300, 90, 3], [14, 142, 8], [304, 128, 6], [84, 102, 2], [244, 97, 2], [118, 118, 2]]) {
      for (let y = cy - r; y <= cy + 1; y++) for (let x = cx - r - 1; x <= cx + r + 1; x++) { const d = ((x - cx) / (r + 1)) ** 2 + ((y - cy) / r) ** 2; if (d > 1) continue; pset(x, y, c_tono(C_ARENA_N, 2 + (x - cx) / r * 1.6 - (y - cy) / r * 0.9 + c_tex(x, y, 64) * 0.4, x, y)); }
      for (let i = -r - 4; i <= r; i++) c_mezP(R, cx + i - 2, cy + 2, C_ARENA_N[0], 0.55);
    }
  } else {
    for (const [cx, cy, r] of [[26, 40, 6], [296, 72, 7], [18, 128, 5], [302, 150, 6], [246, 28, 3], [60, 168, 3], [262, 112, 2]]) {
      for (let y = cy - r; y <= cy + r + 3; y++) for (let x = cx - r; x <= cx + r + 4; x++) { const d = ((x - cx - 3) / r) ** 2 + ((y - cy - 2) / r) ** 2; if (d <= 1) c_mezP(R, x, y, C_ARENA_N[0], 0.5); }
      for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const d = ((x - cx) / r) ** 2 + ((y - cy) / (r * 0.85)) ** 2 + Math.sin(Math.atan2(y - cy, x - cx) * 5) * 0.08; if (d > 1) continue; pset(x, y, c_tono(C_ARENA_N, 3 + (x - cx) / r * 1.2 - (y - cy) / r * 1.2 + c_tex(x, y, 65) * 0.4, x, y)); }
    }
    for (const [cx, cy] of [[70, 40], [270, 100], [36, 96], [232, 158], [120, 150], [292, 36]]) for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2, l = 3 + (k % 3); R.linea(cx, cy, Math.round(cx + Math.cos(a) * l), Math.round(cy + Math.sin(a) * l), k % 2 ? C_ARENA_N[4] : C_ARENA_N[1]); }
  }
}

// la vida del laberinto en cada fotograma: una estrella fugaz de vez en cuando y estrellas que titilan (general), y
// regueros de arena que el viento arrastra por el suelo (las dos cámaras)
function c_laberintoVida(R, t, alto) {
  if (!alto) {
    const u = (t % 9) / 0.9; if (u < 1) { const x = Math.round(250 - u * 70), y = Math.round(24 + u * 22); for (let i = 0; i < 8; i++) c_mezP(R, x + i, y - Math.round(i * 0.3), hex('#e8ecff'), 0.9 - i * 0.11); }
    for (let k = 0; k < 9; k++) { const x = Math.round(178 + h(k, 1, 66) * 96), y = Math.round(22 + h(k, 2, 66) * 44); if (Math.sin(t * (2 + k * 0.4) + k * 2) > 0.4) { R.pset(x, y, hex('#f0f0ff')); c_mezP(R, x + 1, y, hex('#9aa0d0'), 0.6); c_mezP(R, x - 1, y, hex('#9aa0d0'), 0.6); c_mezP(R, x, y - 1, hex('#9aa0d0'), 0.6); c_mezP(R, x, y + 1, hex('#9aa0d0'), 0.6); } }
  }
  for (let k = 0; k < 10; k++) { const y0 = alto ? 20 + h(k, 3, 67) * 150 : 84 + h(k, 3, 67) * 80, x = ((h(k, 4, 67) * 380 + t * (alto ? 18 : 24) * (0.7 + h(k, 5, 67) * 0.6)) % 380) - 30, n = alto ? 10 : Math.round(4 + (y0 - 74) / 10);
    for (let i = 0; i < n; i++) c_mezP(R, Math.round(x - i), Math.round(y0 + Math.sin((x - i) * 0.08 + k) * 1.5), C_ARENA_N[7], 0.32 * (1 - i / n)); }
}

// las ondas de la arena de primer término de la entrada (crestas al sol, valles en sombra), guijarros y dos matas secas
function c_entradaMas(R) {
  const { pset, linea } = R;
  for (let y = 158; y < 180; y++) for (let x = 0; x < 206; x++) {
    const r = Math.sin(x * 0.11 + y * 0.85 + Math.sin(x * 0.035) * 2.2), k = (y - 156) / 24;
    if (r > 0.9) c_mezP(R, x, y, C_ARENA_T[8], 0.3 * k + 0.1); else if (r < -0.88) c_mezP(R, x, y, C_ARENA_T[3], 0.32 * k + 0.08);
  }
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 1, 68) * 205), y = Math.round(160 + h(k, 2, 68) * 19); pset(x, y, C_ROCA_T[3]); pset(x + 1, y, C_ROCA_T[6]); c_mezP(R, x - 1, y + 1, C_ARENA_T[2], 0.5); }
  for (const [cx, cy] of [[118, 177], [196, 170], [70, 163]]) { for (let k = 0; k < 9; k++) { const a = Math.PI * (0.12 + k / 8 * 0.76), l = 4 + (k % 3) * 2; linea(cx, cy, Math.round(cx - Math.cos(a) * l), Math.round(cy - Math.sin(a) * l), k % 2 ? C_ROCA_T[2] : C_ROCA_T[5]); } for (let i = -6; i <= 6; i++) c_mezP(R, cx + i + 2, cy + 1, C_ARENA_T[2], 0.45); }
}
