# Lo aprendido en cada episodio

Se escribe en el paso 15 de la skill `hacer-video`, al entregar cada episodio, y se lee en el paso 0 del siguiente.
Sirve para que cada vídeo mejore el proceso **sin bajar nada**: la calidad, el detalle de las escenas, las animaciones,
el sonido y las tres pasadas no se negocian (palabras del usuario: «no por ahorrar tiempo bajarlo por ninguna
circunstancia»; «no se sacrifica nada a cambio de esto»). Un cambio que ahorra tokens o tiempo pero quita una revisión,
una pasada o detalle no entra.

## Cómo se evalúa (paso 15)

1. **Las cifras**, en la tabla de abajo:
   - horas de reloj desde el guion v1 hasta la entrega;
   - tokens de los subagentes por fase (los da la notificación de cada workflow o agente: «subagent_tokens»);
   - la revisión completa de la calidad: planos revisados y suspendidos, y las rondas hasta cero;
   - los fallos por tipo: `python3 atomo/herramientas/aprendizaje.py <journal.jsonl del workflow de calidad>`;
   - el control final (`producir.sh`) a la primera o no, y por qué.
2. **Lo que se rompió o se repitió**, con su causa: herramientas que fallaron, vueltas de más, avisos de los agentes que
   salieron en varios grupos.
3. **Cada aprendizaje se clasifica:**
   - **arreglo de herramienta** (un fallo, un control que faltaba): se aplica, se comprueba que los episodios anteriores
     salen idénticos (md5 del sonido, hojas) y se apunta;
   - **cambio de proceso** (orden de pasos, encargos de los agentes): se le propone al usuario con la cifra que lo
     justifica y se aplica cuando dice que sí;
   - **cambio que toca el canon** (estilo, personajes, voces, música, narración): solo se propone; no se toca sin su sí.
4. **Se apunta aquí** el episodio, con «Pendiente para el próximo» (lo que el siguiente tiene que vigilar o probar).
5. **Se le cuenta al usuario** en la entrega: las cifras frente al episodio anterior, lo que se arregló y lo que se
   propone.

## Historial

| Ep. | Horas desde el guion | Tokens de subagentes | Calidad: suspensos en la revisión completa | Rondas | Fallos de calidad | Control final a la primera |
|---|---|---|---|---|---|---|
| 12 | ~15 h | ~35 M (15,2 M en calidad) | 41 | 5 + 2 pasadas extra | — | no (efectos al 75 %) |
| 13 | ~6,5 h | ~13,6 M (6,6 M en calidad) | 47 de 102 | 47 → 2 → 0 | 96 | no (efectos perdidos al cortarse el render; caída de la música en una cartela) |
| 14 | ~6,5 h (con un reinicio del contenedor) | ~12,5 M + el intento perdido (6,5 M en calidad) | 41 de 96 | 41 → 1 → 1 (aceptado: falso aviso) | 65 | no (disco lleno; NaN en un efecto) |
| 15 | ~8 h (28 escenas, 118 planos) | ~14,7 M (8,4 M en calidad) | 60 de 118 | 60 → 1 → 0 | 107 | no (el pico del mp4 en −0,5 dBFS) |
| 16 | sin medir (24 escenas, 104 planos) | ~10 M estimado (6,0 M en calidad, 0,5 M en la pasada de decorados) | 49 de 104 | 49 → 0 | 82 | no (−14,7 LUFS al bajar la música; arreglado con un limitador) |
| 17 | ~11 h de reloj (23 escenas, 101 planos) | ~12,3 M (7,4 M en calidad, 2,6 M en el borrador de escenas, 1,5 M en los decorados) | 48 de 101 | 48 → 2 → 0 | 95 | sí (primera vez desde el 13) |
| 18 | ~9 h de reloj (29 escenas, 101 planos; los 3 Shorts aparte) | ~13,2 M (6,4 M en calidad, 2,6 M en el borrador de escenas, 2,8 M en los decorados, 0,8 M en las pasadas de decorados y movimiento, 0,26 M en la verificación) | 49 de 101 | 49 → 2 → 0 | 87 | sí |
| 19 | ~11 h de reloj, estimadas (31 escenas, 147 planos; el reparto de 48 personajes aparte) | ~15,1 M (8,0 M en calidad, 3,3 M en el borrador de escenas, 2,6 M en los decorados, 0,5 M en la pasada de decorados, 0,6 M en datos, verificación y reparto) | 64 de 147 | 64 → 2 → 0 | 100 | no (el «18» de la placa se leía «1S»: re-render de una escena y montaje) |
| 20 | ~10 h de reloj desde el OK al guion (31 escenas, 97 planos; los 3 Shorts aparte) | ~12,6 M (6,6 M en calidad, 2,5 M en el borrador de escenas, 1,7 M en los decorados, 0,65 M en la pasada de decorados, 0,43 M en movimiento, 0,7 M en datos, verificación y reparto) | 55 de 97 | 4 previos → 55 → 0 | — | sí |
| 21 | ~11 h de reloj desde el OK al guion, con un reinicio del contenedor a mitad de las pasadas (29 escenas, 95 planos; los 3 Shorts aparte) | ~13 M (7,2 M en calidad, 2,4 M en el borrador de escenas, 1,6 M en los decorados, 0,7 M en la pasada de decorados, 0,4 M en movimiento, 0,6 M en reparto y miniaturas) | 58 de 95 | 3 previos → 58 → 0 | — | sí |
| 22 | ~13 h de reloj desde el OK al guion, con un reinicio del contenedor en la pasada de calidad (27 escenas, 98 planos; los 3 Shorts aparte) | ~15 M (4,6 M en calidad tras el reinicio y ~2,5 M antes, 2,8 M en el borrador de escenas, 1,5 M en los decorados, 0,7 M en la pasada de decorados, 0,4 M en movimiento, 0,9 M en investigación, verificación, reparto y miniaturas) | 46 de 98 | 4 previos → 46 → 0 | — | sí |

### Fallos de calidad por tipo

| Tipo | Ep. 13 | Ep. 14 | Ep. 15 | Ep. 16 | Ep. 17 |
|---|---|---|---|---|---|
| Orden de dibujo / algo que flota | 20 | 14 | 25 | 23 | 24 |
| Composición repetida | 13 | 14 | 16 | 9 | 9 |
| Algo no se lee | 14 | 13 | 17 | 4 | 15 |
| Brazo o mano | 11 | 11 | 7 | 14 | 6 |
| Quieto o sin vida | 14 | 7 | 8 | 4 | 13 |
| Liso o poco detalle | 10 | 4 | 9 | 14 | 12 |
| Letras en pantalla | 4 | 0 | 2 | 0 | 2 |
| Zona de Atom o barra del año | 4 | 2 | 11 | 10 | 14 |
| **Total** | **96** | **65** | **107** (12 sin tipo) | **82** | **95** |

## Episodio 14 · Oak Island (29/10/2026)

**Lo que funcionó:**
- La autorrevisión del borrador y el registro común de encuadres: los fallos de calidad bajaron un 32 % (96 → 65);
  «quieto» y «liso» se redujeron a la mitad y no hubo letras.
- El barrido de errores: ningún error a mitad de plano llegó al render.
- `control-sonido.sh` en el paso 6: el desequilibrio de efectos por escena se vio antes de la calidad.
- El workflow de escenas que sigue desde su módulo tras un reinicio: el reinicio del contenedor no perdió trabajo.

**Lo que no mejoró, con su causa:**
- **Composición repetida (13 → 14).** El registro común no basta: los grupos trabajan a la vez y las indicaciones
  mandaban el mismo decorado a varios (el pozo en corte salió 5 veces y su boca otras 5). Arreglo: el reparto de
  encuadres se planifica antes de lanzar las escenas (paso 6.0).
- **Brazo o mano (11 → 11).** Los agentes no usan `T.brazo` en los planos con personajes: la mano de 14 px es enorme al
  lado de un chibi de 25 px, y el sprite no tiene una pose de «sostener algo». Se dibujan brazos a mano y suspenden.
  Propuesta al usuario (toca el canon del chibi): una opción del actor para sostener un objeto en una posición, a su
  escala.

**Lo que se rompió y ya está arreglado:**
- **Disco lleno en el render.** 15.281 fotogramas ocupan 6,6 GB (unos 0,47 MB cada uno); la comprobación fija de 6 GB se
  quedó corta. `producir.sh` calcula ahora lo que hace falta a partir de los fotogramas.
- **Un NaN en un efecto** (la «aldea» sin `o.k`) estropeó la pista de efectos y el montaje falló al final. Arreglado, y
  `efectos.cjs` se para con el nombre del efecto si alguno da NaN. El sonido del 14 sale idéntico con el arreglo.
- **Falso aviso en el corte de la cartela** (REVISAR del 3–4 % en el 13 y en el 14): ese corte es seco y lo que cambia
  es el propio plano. `medir-planos --fundidos` ya no lo marca por debajo del 10 %.
- **Un personaje que faltaba** (Roosevelt niño): lo detectó un agente de decorados. El reparto se comprueba ahora contra
  el guion visual (paso 4).

**Pendiente para el próximo:**
- Medir si el reparto previo de encuadres baja la composición repetida (objetivo: menos de 5).
- La pose de «sostener» (`R.actor(…, { sostiene })`, aprobada el 29/10/2026): medir si bajan los fallos de brazo o mano.
- Liberar disco al empezar (paso 0) con el cálculo nuevo, no a mitad del render.

## Episodio 15 · Nueva York (29/10/2026)

**Lo que funcionó:**
- **La pose de sostener** (`R.actor(…, { sostiene })`): los fallos de brazo o mano bajaron de 11 a 7.
- **Liberar el disco al empezar** (paso 0, con la regla aprobada): 17 GB libres y ningún parón en el render.
- **El reparto de encuadres entre escenas:** solo 3 de las 16 repeticiones fueron entre escenas vecinas.
- **La pasada de decorados con fallos concretos**, en dos lotes: 1,3 M de tokens y unos 25 minutos.
- **La calidad cerró en tres rondas** (60 → 1 → 0), sin nada pendiente.

**Lo que no mejoró, con su causa:**
- **Composición repetida (14 → 16; el objetivo era menos de 5).** 10 de las 16 las creó mi propio reparto: permitía el
  mismo decorado y encuadre dos veces dentro de una escena con otra luz o estado (el puerto de 1625 y el de 1660, el
  salón del Congreso, el del Tribunal y el de la cena, el palacio antes y después de cortar la cuerda), y el revisor lo
  cuenta como repetición. Propuesta (cambio de proceso): dentro de una escena, un encuadre no vuelve nunca; si la
  historia pide el mismo sitio, con otra cámara (más cerca, otro ángulo), y los decorados ofrecen esa segunda cámara
  desde su primera versión.
- **Orden de dibujo (14 → 25), algo que no se lee (13 → 17) y zona de Atom o barra del año (2 → 11).** Se concentran en
  las escenas con más fondos locales (Hudson 13, Nueva Ámsterdam 8, Ellis 8): el reparto mandó muchos planos a fondos
  pintados por el agente de escenas, que no pasan por la prueba de los decorados. Va con la propuesta anterior: más
  encuadres en los decorados y menos fondos locales.
- **Tokens en calidad (6,5 → 8,4 M):** más planos (118 frente a 96) y más suspensos en la revisión completa.

**Lo que se rompió y ya está arreglado:**
- **La música caía en 5 cartelas** (hasta 12,8 dB, por los huecos de la aventura y el final del redoble épico).
  `banda.cjs` añade un colchón sostenido solo donde la caída pasa de 7,5 dB: el 13 y el 14 salen idénticos (md5) y la
  peor caída del 15 bajó a 6,5 dB.
- **El pico del mp4 inglés en −0,5 dBFS:** el AAC subía el pico pedido a −1,5. `montar-largo.sh` lo pide a −2 dB
  (`TP_MAX`).
- **Las copias `_tmp_<G>` de la primera versión de los decorados** seguían ahí al lanzar la pasada, y sus agentes iban a
  partir de una copia vieja: se paró a tiempo. La skill dice ahora que se borran al integrar.

**Pendiente para el próximo:**
- Aprobado el 29/10/2026 («mientras no afecten negativamente la calidad»): ningún encuadre repetido dentro de una
  escena y una segunda cámara en cada decorado (en la skill, pasos 5 y 6.0). Medir si baja la composición repetida (objetivo: menos de 5) y el orden de dibujo.
- Que el gancho comercial (regla nueva) se mida: el título y la miniatura, decididos en el paso 1.

## Episodio 16 · LucasArts (29–30/10/2026)

**Lo que funcionó:**
- **Ningún encuadre repetido dentro de una escena y dos cámaras por decorado** (aprobado el 29/10): la composición
  repetida bajó de 16 a 9, y «algo no se lee» de 17 a 4. No llega al objetivo (menos de 5): las 9 son repeticiones entre
  escenas (la fachada general salió tres veces, por el reparto).
- **La calidad cerró en dos rondas** (49 → 0) y el total de fallos bajó de 107 a 82.
- **La pasada de decorados con fallos concretos:** 2 agentes, 0,46 M de tokens y unos 20 minutos.

**Lo que no mejoró, con su causa:**
- **Brazo o mano (7 → 14) y liso o poco detalle (9 → 14).** Las piezas nuevas que no son humanas (los bracitos del
  tentáculo, las manos de esqueleto) no tenían mano canónica hasta la pasada de decorados, y los agentes de escenas
  pintaron sus propias manos; los fondos locales siguen trayendo zonas lisas. Propuesta: que cada pieza no humana traiga
  su mano desde la primera versión de los decorados.
- **Orden de dibujo (25 → 23):** casi igual. Varios vienen de auxiliares del decorado que pintan con `R.rect`, que no
  respeta el recorte (los avatares del foro, el paseante del taller): la escena los tapaba con parches.

**Lo que se rompió y ya está arreglado:**
- **La música** (el usuario: «hay melodías que suenan más fuertes que otras»): medido en el 13–15, los ánimos se
  separaban 4,2 dB en volumen percibido, los golpes iban 5 dB por encima y, al hablar, la voz quedaba solo 7 dB sobre
  la música (un 10 % del tiempo, por debajo). `banda.cjs` iguala ahora por LUFS con un nivelador de picos, y
  `montar-largo.sh` aparta más la música bajo la voz: 1,8 dB entre ánimos y 13,9 dB bajo la voz (en el 15).
- **El nivel final se quedó en −14,7 LUFS** al bajar la música (más picos sueltos sobre el nivel medio): un limitador a
  −6 dBFS antes de loudnorm lo deja en −14,0 con el pico a −2,5.

**Pendiente para el próximo:**
- Escuchar si el usuario da por buena la música nueva (más baja: −22 LUFS en las pausas); si dice que no se oye, se sube
  `ANIMO` en `banda.cjs`.
- Que `R.rect` respete el recorte, o que la prueba de decorados lo detecte, para no volver a los parches.

## Episodio 17 · Los tesoros perdidos (30–31/10/2026)

**Lo que funcionó:**
- **El control final pasó a la primera** (la primera vez desde el 13): −14,1/−14,0 LUFS con el limitador nuevo, la mezcla
  «B», la voz española entera y la densidad de efectos al 46 %.
- **Brazo o mano bajó de 14 a 6:** las piezas de este episodio (detector, cofre, rollo, copa) no necesitaban manos
  propias, y los agentes usaron `T.brazo` y `sostiene`.
- **La pasada de decorados con fallos concretos** (dos agentes, 0,5 M de tokens, 21 minutos) dejó 0 sospechas de
  `--comprobar` en los planos que tocó, y la de calidad cerró en tres rondas (48 → 2 → 0).
- **Los verificadores de datos** encontraron 11 frases que corregir, ninguna después.

**Lo que no mejoró, con su causa:**
- **«Algo no se lee» (4 → 15) y zona de Atom (10 → 14).** Casi todos en los fondos locales y en los insertos (las tiras
  del rollo, la montaña de lingotes: te-lista tuvo 11 fallos) y en decorados con mucho detalle arriba a la derecha.
  Propuesta: que la prueba de cada decorado pase ya `--comprobar` antes de integrarlo, no después de las escenas.
- **La densidad de efectos salió baja en el borrador (37 %)** y hubo que subirla en la calidad: los agentes de escenas,
  después de la queja del usuario, se quedaron cortos. Faltan recetas de campana y de carro en `efectos.cjs` (tocarlas
  es canon: hay que preguntar).

**Pendiente para el próximo:**
- Aprobado el 31/10/2026: las recetas `campana` y `carro` (ya en `efectos.cjs`) y `comprobar-decorados.mjs` antes de
  integrar los decorados (sin agentes). Medir en el próximo si bajan «algo no se lee» y la zona de Atom.

## Episodio 18 · Sierra (2/11/2026)

**Lo que funcionó:**
- **comprobar-decorados.mjs antes de integrar** (nuevo en este episodio): 77 encuadres comprobados sin agentes en tres tandas;
  dio 4 sospechas reales (el cielo negro del mundo de 16 colores, dos zonas lisas en «hoy», el papel pintado detrás de Atom) que
  fueron con fallo concreto a la pasada de decorados. **«Algo no se lee» bajó de 15 a 13** y, tras las pasadas, --comprobar dio
  0 sospechas en los 101 planos antes de la calidad.
- **El control final pasó a la primera** otra vez (−14,0 LUFS en las dos pistas, efectos al 49 %).
- **Los Shorts dentro del proceso** (paso 12b, primera vez): 36, 45 y 43 s, −14 LUFS, miniaturas verticales; ~25 min.
- **La pasada de movimiento solo para lo que no aguantaba** (un plano): 0,14 M de tokens.

**Lo que no mejoró, con su causa:**
- **Zona de Atom (14 → 16) y brazo o mano (6 → 15).** Los decorados con papel pintado y paredes de madera ponen textura
  contrastada arriba a la derecha (lo arregló la luz de techo b_luzTecho en la pasada de decorados, pero salió en la calidad en
  otras escenas). Brazo o mano subió porque este episodio tiene muchas manos que teclean, mueven ratones y pegan cromos.
- **Orden de dibujo, el fallo número uno (26).** Mesas «delante» (a_casaDelante, j_salonMesaDelante) que tapan a los personajes
  o que las escenas pintan antes de tiempo.
- **Planos cortos (3,6–3,9 s):** siete planos entre 3,5 y 4 s porque las frases eran cortas; los aceptaron revisor y escéptico.

**Pendiente para el próximo:**
- Proponer al usuario: que comprobar-decorados.mjs mida también la zona de Atom con un personaje puesto, y que las cabeceras de
  los decorados con mesa digan siempre «llama a <x>Delante después de los actores».
- El 19 (Doomsday) es de 12 minutos y con héroes reconocibles: el reparto lleva más trabajo; medir horas y tokens frente al 18.

## Episodio 19 · Avengers: Doomsday (3/11/2026)

**Lo que funcionó:**
- **Las mejoras del 18 aplicadas desde el principio:** «llama a <x>Delante después de los actores» en todas las cabeceras,
  manos siempre con T.brazo/T.mano, rincón de Atom en calma y umbral ATOM 100. **Orden de dibujo bajó de 26 a 20, Atom de 16
  a 10 y «no se lee» de 13 a 10**, en un episodio con un 45 % más de planos (147 frente a 101).
- **La hoja estática del reparto antes de nada** (pedida por el usuario): 48 personajes reconocibles por sus atributos,
  aprobados a la primera.
- **comprobar-decorados.mjs:** 0 sospechas en 66 encuadres; --comprobar, 3 en 147 planos. **Sin pasada de movimiento**
  (ningún QUIETO antes de la calidad).
- **El control de sonido y subtítulos, a la primera:** −14,0 LUFS en las dos pistas; 189 + 205 subtítulos sin ninguno fuera
  de norma.

**Lo que no mejoró, con su causa:**
- **R.numero pequeño lee el «8» como «S»** (las placas 838/828 y la fecha «18»). Se arregló con cifras propias (a_cifras),
  pero la fecha de una escena se escapó a la calidad y obligó a re-renderizar y montar otra vez. Regla: toda cifra en pantalla
  con a_cifras o mayor, nunca R.numero a escala 1.
- **Quieto (16) y brazo o mano (12):** muchos personajes a la vez en planos de reparto; el movimiento se reparte y alguno queda
  parado. Composición (16): los planos de grupo con 6–8 héroes se apelotonan.
- **Disco:** el render pidió 12,7 GB; hubo que borrar los fotogramas del 16 (con el OK del usuario). short.py ya borra sus
  temporales.
- **La miniatura vertical del Short 2** puso las placas en el borde de la columna 9:16 (cortadas): se rehízo con las dos Tierras
  apiladas dentro de x 110–210.

- **Rehecho el 03/11/2026, tras la retención del 11:** el gancho abre con el giro («The man who saved the universe as
  Iron Man is coming back on December 18… as the villain», 6 s, con su plano: la miniatura en movimiento). Calidad de
  las dos escenas tocadas: 6 → 0. Además, **el «8» de Press Start 2P se cambió en el kit (pixel-retro.js)** por un 8
  propio: el «838» del consejo salía «S3S» en el montaje entregado y nadie lo vio. 13:16, control a la primera.

**Pendiente para el próximo:**
- (Resuelto en el kit el 03/11: el 8 ya no se lee «S».) Proponer al usuario: que comprobar-decorados.mjs avise de R.numero con «8» a escala 1, y que los planos de grupo de más de
  5 personajes lleven siempre dos filas.
- Siguiente tema: los archivos OVNI del gobierno.

## Lo que dice el público · exportaciones del 03/11/2026 (6/10–2/11)

Datos: `episodios/estadisticas/2026-11-03/` (visualizaciones por día) y `2026-11-03b/` (impresiones, CTR, % visto).
Se leen con `python3 atomo/herramientas/estadisticas.py <carpeta>`. Sin la curva de retención por segundo todavía.
- [Seguro] **Las visitas de los tres «éxitos» casi no vienen de la miniatura dentro de YouTube.** Clics de miniatura
  (impresiones × CTR) frente a visualizaciones: tesoro pirata 36 frente a 17.465; OVNI 69 frente a 11.047; LucasArts 83
  frente a 5.720, y ninguno trae suscriptores. [Probable] Vienen de una promoción con anuncios o de enlaces de fuera:
  preguntado al usuario. **La lectura anterior («el título con secreto trae las visitas») queda en duda.**
- [Seguro] **El CTR de la miniatura es aceptable** en casi todos (templarios 4,96 %, LucasArts 4,54, huracanes 4,45,
  Nueva York 4,38, tesoro 4,27, Acción de Gracias 4,16; media del canal 2,82). Excepción: **Oak Island**, el que más
  enseñó YouTube (5.554 impresiones), con un 1,66 %: esa miniatura y ese título no funcionaron. Theranos 2,68; OVNI 2,23.
- [Seguro] **El problema es lo que se ven:** la gente pincha y se va en el primer minuto. Duración media: Acción de
  Gracias 0:33 (8 %), templarios 0:41 (8 %), Nueva York 1:01 (10 %), Sierra 1:04 (12 %), Oak Island 1:21 (16 %),
  Theranos 1:41 (19 %). Los que se ven más: OVNI 3:51 (42 %), LucasArts 33 %, tesoro 31 %, huracanes 30 %.
  [Probable] Con tan pocas impresiones (~1.500 por vídeo), YouTube no los empuja porque no retienen.
- [Probable] El arranque (gancho y primer acto) pierde a la gente; la curva de retención por segundo dirá en qué frase.
- [Seguro] **Shorts:** quien los ve los ve casi enteros (58–92 %), pero solo se queda entre el 20 y el 40 % de quienes
  los ven pasar, y YouTube apenas los enseña (2–247 impresiones). [Probable] El formato 16:9 con bandas borrosas.
- **Retención por segundo del 11 (Theranos)**, en `episodios/estadisticas/retencion-ep11/`:
  - [Seguro] **Hay tráfico de pago:** la curva separa orgánico, «anuncio de vídeo saltable» y «anuncio video
    discovery». Quien llega por el anuncio saltable se va casi todo en 10 s (de 90 % a 35 %).
  - [Seguro] **Orgánico (~53 personas):** quedan el 55 % a los 11 s, el 34 % a los 27 s y el 17 % a los 48 s. Frente a
    vídeos parecidos de YouTube, −17 puntos a los 11 s, −36 a los 27 s y −67 a los 48 s.
  - [Probable] **Causa:** el gancho empieza ambientando («In September 2013, at a Walgreens pharmacy in Palo Alto…») y
    el giro que promete el título (la máquina no funciona, la fundadora está en la cárcel) llega entre los 36 y los
    48 s, cuando ya se ha ido dos tercios de la gente. El 19 tiene la misma forma: «Robert Downey Jr.» llega a los ~35 s.
  - [Probable] Segunda caída hacia el 1:20 (de 15 % a 7,5 %), al empezar el relato desde el principio («It all begins
    in 2003»). Con 53 personas, cada escalón es una persona: tendencia, no prueba.
- El usuario ya renombró Sierra: «King's Quest and Space Quest: Games That Killed You».

## Episodio 20 · Los Juegos del Hambre: antes de Amanecer en la cosecha (4/11/2026)

**Lo que funcionó:**
- **El planteamiento del usuario** («qué quiere ver alguien antes de la película: qué debe saber, datos, pistas») dio un
  guion más útil que la crónica: lo que hay que recordar, el orden, lo que ya se sabe, quién es quién, las pistas y lo real.
- **La regla de los 10 s** aplicada desde el guion: la promesa del título es la primera frase y tiene su propio plano.
- **La verificación encontró 12 fallos**, entre ellos un destripe del libro nuevo (lo que perdió Haymitch, de Sinsajo).
- **El reparto con hoja estática y tres arreglos** (broche, Plutarch, Maysilee) aprobado a la primera.
- **El control final pasó a la primera** (−14,0 LUFS; 125 + 132 subtítulos sin ninguno fuera de norma; 8:30).

**Lo que no mejoró, con su causa:**
- **banda.cjs se rompía en silencio:** un golpe con un nombre que no era una marca («capitolio») llenó de NaN toda la
  música. Ahora salta el golpe y avisa. Regla: los golpes de plan.py son nombres de marcas de esa escena.
- **Encuadres que salen tres veces** (la plaza y la sala de control): el reparto de encuadres asignaba la plaza a demasiadas
  escenas. Se arreglaron en la calidad con fondos locales; el registro común no basta si el plan ya los repite.
- **Efectos:** la pasada de movimiento subió dos escenas de pocos efectos a demasiados (79 y 84 %): hay que medir
  después de la pasada, no estimar.
- **El broche (la pista principal) costó tres diseños**: los objetos pequeños que el guion hace protagonistas necesitan
  diseño de inserto desde el reparto.

**Pendiente para el próximo:**
- Harry Potter (estreno de la serie de HBO el 25/12/2026): publicar entre el 15 y el 22 de diciembre.
- Medir la retención del 19 y del 20 (gancho nuevo) en cuanto tengan una semana: ¿sube el público que queda a los 30 s?

## Próximos temas (decididos por el usuario)

- **Episodio 16: LucasArts** (29/10/2026, entregado el 30/10). Un homenaje a la mejor época de los juegos de PC de LucasArts: Día del
  Tentáculo, Monkey Island, Grim Fandango, Sam & Max (X-Wing, de pasada). Su arte, su forma de jugar y datos curiosos.
  **Nada de controversias ni de cómo les fue comercialmente** (palabras del usuario). Sin sprites, capturas, logos ni
  música de los juegos: homenaje dibujado por nosotros. Idea propuesta: el vídeo como una aventura gráfica (Atom dentro,
  línea de verbos y cursor); el gancho, «en estos juegos no podías morir»; el hilo, el secreto de Monkey Island.
- **Episodio 19: Avengers: Doomsday** (decidido el 02/11/2026, después del 18). La película de Marvel se estrena el 18/12/2026
  en EE. UU. (16/12 en Reino Unido). Palabras del usuario: «todo lo que hay que saber antes de la película, es decir, lo
  importante de otras pelis de Marvel previo a esto y cómo se concatena todo». Publicar 1–2 semanas antes del estreno. Solo
  datos confirmados (nada de filtraciones ni rumores) y volver a comprobarlos justo antes de locutar. Sin clips, música ni
  logos de Marvel: dibujado por nosotros. Decidido por el usuario el 02/11/2026: **un solo vídeo de unos 12 minutos** (~1.800 palabras; solo para este
  episodio), sin partes, y **los personajes reconocibles por sus atributos** («que se entienda cuáles son: un Hulk debe ser
  todo verde y más grande»), dibujados por nosotros en chibi, sin logos. Los 3 Shorts como piezas sueltas que llevan al largo.
- **Después, los archivos OVNI del gobierno** (entregas de PURSUE desde mayo de 2026): con gancho comercial (los casos
  que el Pentágono no sabe explicar), sin repetir lo del episodio 10; mejor justo después de una entrega nueva.

## Episodio 21 · Harry Potter en HBO (4–5/11/2026)

- **Narración como cuento (voz «B»):** primer episodio con `'narracion': 'cuento'` y el guion escrito en párrafos que
  encadenan. 8:24 con 34 párrafos y unas 1.390 palabras.
- **Nombres en español escritos como se dicen en México:** el reconocedor los entiende como el nombre real («Jari Póter»
  → «harry potter», «Uórik Déivis» → «warwick davis»): ese aviso es la señal de que suena bien, no un fallo. 29 de 68
  frases salen con aviso por esto; solo hay que escuchar los que dan un hueco o una palabra rara («Pivs» → «pips»).
- **El usuario pidió terminarlo sin aprobaciones suyas** (solo en este episodio). Pidió quitar el verde de las gafas
  de Harry (eran los ojos verdes dentro de los aros): sin verde, el aro entero quedaba negro (antifaz), y se arregló
  con un brillo claro en el cristal. A ×5 (miniatura) hubo que dibujar gafas propias de aro fino.
- **El reparto de encuadres con un script de comprobación** (máximo dos usos, nunca en escenas vecinas, nunca repetido
  dentro de una escena) salió limpio a la primera, pero los agentes añadieron planos por duración y el comedor general
  salió tres veces: la calidad lo arregló. Al repartir, contar con un plano más en las escenas de más de 20 s.
- **Reinicio del contenedor a mitad de las pasadas:** no se perdió nada; se retomaron los dos workflows con
  `resumeFromRunId` y los agentes siguieron desde sus copias `_tmp_<G>` y las escenas a medio editar. Hacer commit de
  lo que haya antes de retomar.
- **Un decorado de otro episodio** (la librería del 20) se coló en una escena; la pasada de decorados hizo una propia.
- Control final: un subtítulo inglés a 20,3 caracteres/s; se arregló moviendo 60 ms el corte con el siguiente.
- **Corrección del usuario tras la entrega:** el español decía «HB… O» y «Jari». Ahora «achebeó» (siglas en una palabra)
  y «Jarri» (r fuerte doble); regla en la skill. El control de la voz no lo podía ver: el reconocedor entendía el
  nombre real. Al rehacer la voz, la mezcla inglesa salió con un pico real de +0,1 dBFS (a 2:37) que ni un TP más bajo
  en loudnorm quitó; se arregló con un `alimiter` a 0,70 sobre el audio del mp4 (−14,1 LUFS, pico −3,1). El subtítulo
  rápido del cierre volvió al regenerar los SRT: se corrige también en `build/largo/<ep>/subtitulos-en.srt`.

## Episodio 22 · La Navidad estuvo prohibida (5–6/11/2026)

- **Tema global, no centrado en México** (corrección del usuario): el giro que sorprende en cualquier país (la Navidad
  estuvo prohibida) y los mitos que se repiten en todo el mundo; México es una parada más del viaje.
- **La vuelta al mundo como viaje por el calendario** (de septiembre en Filipinas al 6 de enero en Italia): el revisor
  de narración lo pidió para que una lista de países no suene a frases sueltas.
- **El reparto de encuadres con huecos libres:** con 98 planos y 54 encuadres no caben todos; se asignaron 66 y el resto
  lo eligieron los agentes de la lista «con un uso libre», con fondos locales o insertos. Salió sin repeticiones.
- **Disco:** el render pide ~9,5 GB; tras borrar los fotogramas del 21 quedaban 9,1. Se liberó con las capturas de
  trabajo del 21 en el scratchpad (ya entregado).
- **Reinicio del contenedor en la calidad:** se retomó con `resumeFromRunId` tras hacer commit de lo editado.


## Episodio 23 · Las tradiciones del año (6/11/2026)

- **Tema sugerido por YouTube Studio** («mitos históricos de tradiciones populares»), elegido por el usuario: todas las
  tradiciones, con Año Nuevo como entrada (el giro de las uvas de 1894 y no de 1909) y la Navidad fuera, porque ya tuvo
  su episodio.
- **La barra del año no baja de su escala:** en tr-samhain marcaba 731 y 800 con la barra empezando en 1415. Al escribir
  el año de un plano, comprobar que cae dentro de los tramos del episodio (o usar null para ocultarla).
- **Calidad:** 58 de 91 planos suspendidos en la primera revisión y uno al final (un brazo recto de 55 px en tr-huevos
  p4), que se arregló a mano con el codo doblado y la manga hundida en penumbra, como en tr-orleans p4.
- **Disco:** tras borrar los fotogramas del 22 quedaban 8,9 GB y el render pedía 9,0. Se liberaron 340 MB con hojas de
  revisión viejas del scratchpad. El render en sí tardó 11 minutos.
- **Miniatura:** la pieza del racimo a escala ×3 parecía una piña verde; se dibujó a resolución de lienzo, grano a grano,
  en una frutera sobre un velador.

## Episodio 24 · Los archivos desclasificados (7–8/11/2026)

- **Tema por la IA de YouTube Studio** (los archivos secretos retienen mejor: el de los ovnis, 3:52 de media) llevado a
  casos concretos con documento; la verificación tumbó 12 cosas (el «nadie confió en la paloma» de un almirante, «la
  mitad tachada», quién disparó al pykrete, «desclasificado» para lo que solo se publicó). El título que se propuso
  («It's in the Declassified Files») no cabía en 60 caracteres y además no era exacto: pasó a «The Report Is Real».
- **El reparto lo hizo un agente** (43 personajes y 10 piezas, con hoja estática) mientras se locutaba: ahorró tiempo sin
  pérdida de nivel.
- **Anacronismos de los agentes:** la pasada de movimiento metió a Reiffel (1958) en el laboratorio de Skinner (1940s).
  Al leer los resúmenes de las pasadas, buscar personajes fuera de su época.
- **Nada morboso, vigilado en el borrador:** el primer borrador de Pyke tenía un torpedo que escoraba un mercante; la
  calidad lo cambió por la amenaza sin impacto. Conviene decirlo en las indicaciones de las escenas de guerra.
- **Herramienta arreglada:** los SRT podían escribir «,1000» en los milisegundos (redondeo de 59,9996 s) y dar un
  subtítulo fuera de norma. `_hms` de subtitulos.py, locutar_frases.py y preparar_largo.py cuenta ahora en ms enteros.
- **Disco:** 7,7 GB libres al llegar al render (pide ~8,9). Se liberó borrando hojas de revisión ya usadas del scratchpad,
  carpeta a carpeta. El render tardó 11 minutos.

**Pendiente para el próximo:**
- Resultado de la prueba A/B de miniaturas del 23 (la simple con la uva frente a la de dos decorados): decide el estilo.
- Retención del 19 y el 20 (gancho nuevo) en cuanto el usuario la exporte.

## Episodio 26 · Atari enterró sus juegos en el desierto (8/11/2026)

- **Dos episodios a la vez** (el 26 y el 25): mientras corría la pasada de calidad del 26, el 25 hizo sus decorados y
  lanzó sus escenas. Funciona sin bajar el nivel; el aviso de «cambios sin guardar» salta a menudo por los agentes que
  trabajan: se guarda a mitad de pasada solo lo que ya terminó su comprobación.
- **Derechos vigilados desde el reparto:** sin E.T. (ni la luna con la bicicleta), sin marcianos de Space Invaders ni la
  boca del comecocos, sin logos. El juego inventado lleva un robotito naranja propio. Se pasó como fallo a la calidad
  para TODAS las escenas, y no apareció nada.
- **Miniaturas:** el usuario dijo que las de chibis «parecen para bebés». Se pasó al noir y luego pidió un punto
  intermedio: se hacen las dos (noir e intermedia, atardecer y objetos de colores) para la prueba A/B. A tamaño de lista,
  la noir pierde los objetos (los cartuchos eran una mancha gris): en la intermedia se reconocen.
- **Efectos de más:** la calidad dejó 9 escenas por encima del 65 % (motores, público y máquinas repetidos). Se quitaron
  unos 20 efectos largos repetidos: del 59 al 53 % en total. Al cierre (11 s) le quitamos efectos y siguió en el 84 %:
  no viene de su lista.
- **Disco:** 7,2 GB. Con el permiso del usuario se borraron los montajes de ep03–ep24 (atomo/build/largo, ~9 GB, se
  regeneran); los vídeos de build/salida quedan.

**Pendiente para el próximo:**
- Resultado de la prueba A/B noir frente a intermedia en el 26 (y el 25): decide el estilo de las miniaturas.
- Por qué at-cierre marca el 84 % de efectos sin tener casi efectos en su lista (¿efecto final del episodio?).

## Episodio 25 · El manuscrito Voynich (8–9/11/2026)

- **Hecho en paralelo con el 26:** decorados y escenas del 25 mientras el 26 pasaba su calidad y su render. Sin bajar el
  nivel; solo hay que guardar a menudo (el aviso de cambios sin guardar salta por los agentes).
- **Reinicio de la máquina a mitad de la calidad:** los cambios ya escritos seguían en disco; se guardaron y la pasada se
  reanudó con `resumeFromRunId` (los 28 agentes acabados no se repitieron). Conviene hacer commit antes de reanudar.
- **Tema abstracto (un libro):** funcionó como cacería de detectives; los insertos locales (páginas, fichas, pizarras)
  cargaron mucho: la mitad de los planos no usa decorado.
- **Signos inventados:** cuidado con que se lean como letras («D», «t», «C»); en las miniaturas se cambiaron por formas
  sin letra (palo cruzado, espiral).
- **QUIETO falso:** --comprobar compara solo el principio y el final del plano; un plano con acción que vuelve a su sitio
  (los tarros que saltan) sale QUIETO. Mirarlo antes de mandarlo a una pasada.
- **Disco:** se borraron los fotogramas del 26 (5,6 GB) antes del render del 25.
- **Miniaturas, 09/11/2026:** el usuario corrigió el noir: «está bien que aparezcan los chibi, es la esencia del canal,
  pero no uvitas con ojos, cositas muy de bebés». Se rehicieron las del 25 y el 26 (y sus Shorts) con el decorado real y
  personas chibi al doble (`mini-chibi.js`), luz de cine y nada de mascotas. Lo infantil eran las mascotas con cara, no
  los chibis.

## Episodio 27 · Tetris: el juego que se escapó de la Unión Soviética (9/11/2026)

- **Derechos del juego (Tetris Holding contra Xio, 2012):** el riesgo no vino de las piezas ni del pozo (se respetaron
  desde el encargo) sino de los NÚMEROS: tres pantallas (el terminal de 1984, la tele de 2023 y el ordenador del estudio
  de Atom) pintaban un contador que se leía como el marcador del juego. Dos los vieron los agentes; el tercero, la tira
  de control. Para un juego con dueño: «sin marcador ni contador en ninguna pantalla» desde el primer encargo.
- **Verificación:** 14 correcciones; la peor, «el primer juego del otro lado del Telón de Acero» (Hungría ya vendía
  juegos en Occidente) y «el primero en ganarle a un juego infinito» (fue el primero en colgarlo).
- **Música:** un golpe al principio de la escena de la cartela de 2023 hacía caer la música 7,7 dB; quitarlo bastó.
- **Retoque tras el render:** una escena se arregla con `render-escenas.mjs <carpeta> --solo <id>` y
  `producir.sh … --desde montar` (unos 6 min), sin volver a renderizar todo.
- **Disco:** se borraron los fotogramas del 25 antes del render.
