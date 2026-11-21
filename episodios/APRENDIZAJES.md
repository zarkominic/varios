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

## Lo que dice el público · retención de Oak Island (ep14) y LucasArts (ep16), hasta el 19/11

Datos: `episodios/estadisticas/retencion-ep14/` (solo orgánico, ~210 visualizaciones) y `retencion-ep16/` (orgánico
~125 y anuncio saltable). Con Roanoke son tres curvas y dicen lo mismo.
- [Seguro] **La mitad se va entre los 11 y los 20 s.** Oak Island (orgánico): 77 % a los 5 s, 64 % a los 10, 49 % a los
  20, 28 % al minuto, 16 % a los 2:30 y 10 % al final. LucasArts (orgánico): 84 %, 60 %, 39 %, 26 % al minuto, 17 % a
  los 1:18 y 7 % al final.
- [Seguro] **El cuerpo aguanta:** pasado el minuto, Oak Island solo pierde 18 puntos en 7 minutos.
- [Seguro] **Anuncio y orgánico se van igual** en LucasArts (60 y 56 % a los 10 s; 26 y 24 % al minuto): no es el
  público del anuncio, es el arranque.
- [Probable] **Las tres primeras frases son ambientación y la promesa del título llega tarde:** Oak Island empieza «It's
  a summer day in 1795…» y «why it floods» no está en el gancho; LucasArts empieza en el río de lodo y la «secret rule» del
  título se pregunta a los 46–56 s, con el 26 % dentro; Roanoke empieza «In August 1590…» y «CROATOAN» llega a los 17 s.
- Añadido a la skill (paso 2.2): comprobar antes de presentar el guion que la primera oración en inglés tiene 15 palabras
  o menos con la promesa del título, y que el gancho no lleva lista.

## Lo que dice el público · retención de Roanoke (ep39, 18–19/11, 32 visualizaciones orgánicas)

Datos: `episodios/estadisticas/retencion-ep39/`. Muestra pequeña: una persona = 3,1 %.
- [Seguro] **El 78 % se va en los primeros 27 s:** 75 % a los 5 s, 56 % a los 11 s, 37,5 % a los 16 s, 28 % a los 21 s,
  22 % a los 27 s. Después, casi plano: 19 % hasta el minuto 2, 16 % hasta la mitad, 6 % al final.
- [Seguro] **Contra vídeos parecidos de YouTube:** peor en el gancho (−6 a −10 puntos del 1 al 4 %) y mejor en todo lo
  demás (+1 a +5 desde el 6 %). El cuerpo retiene; lo que falla es el arranque.
- [Probable] **Por qué:** la primera frase arranca con ambientación («In August 1590, John White finally made it back…»),
  no con la promesa del título («115 People Vanished and Left One Word»): la mitad se fue antes de oír «CROATOAN» (17 s),
  justo lo que la regla del 03/11 prohíbe. La segunda frase es un inventario («you'll meet a painter…, a baby…, a
  fleet…, trees…, archaeologists…») y durante ella se fue otro 15 %. La presentación de Atom (36 s) llega cuando ya solo
  queda el 19 %.
- Para los siguientes: la primera oración ES la promesa del título, en menos de 5 s y con su imagen; nada de lista de
  «por el camino vas a conocer»: como mucho una pregunta que abra el misterio.

## Lo que dice el público · exportación del 20/11/2026 (19/10–19/11)

Datos: `episodios/estadisticas/2026-11-20/` (102 vídeos: 31 largos, 71 Shorts). La media y el % visto se sacan de las horas.
- [Seguro] **5 vídeos hacen el 78 % de las visitas** (62.380 de 79.501): tesoro pirata, pirámides, Doomsday, OVNI y
  LucasArts. Llegaron casi sin clics en la miniatura (18–93 cada uno) y con picos de 3.000–5.000 al día: [Probable] son
  los que se promocionaron con anuncios. Entre los cinco, 4 suscriptores.
- [Seguro] **Lo orgánico es pequeño:** el resto de largos, 20–300 visitas. YouTube sí los enseña (Oak Island 9.456
  impresiones, Navidad 7.327, Dune 6.192, tradiciones 4.363, King's Quest 4.074), pero el CTR es del 0,8–1,6 %.
- [Seguro] **El CTR bajó en los recientes:** del 4–5 % (huracanes, LucasArts, tesoro, Nueva York, Acción de Gracias,
  4 tesoros, todos de octubre) al 1–3 % desde el 6/11. [Supuesto] Puede ser la miniatura, el tema o que YouTube los
  enseña a público más frío; no se puede separar sin prueba A/B.
- [Seguro] **Retención de los largos orgánicos: 4–17 % visto, 20–90 s de media** en vídeos de 8–9 min. La gente se va en
  el primer minuto. Mejores: Roanoke 92 s (17 %), Jumanji 78 s, Oak Island 79 s.
- [Seguro] **Shorts: 10.929 visitas en 71 Shorts y 6 suscriptores.** Visto: 10–20 % de media (4–10 s de 35–55 s). Los
  cuatro del 10/11 (Piri Reis, rollo de cobre, Coca-Cola) pasaron de 900; desde el 11/11 casi todos, menos de 100.
- [Seguro] **Cadencia:** del 9 al 18/11 salió un largo y tres Shorts casi cada día; ningún largo de esa tanda pasó de 300
  visitas orgánicas.

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

## Episodio 28 · La New Coke: el día que Estados Unidos se rebeló por un refresco (9/11/2026)

- **Derechos de dos marcas a la vez:** la regla en el `tema` del workflow de calidad («suspende el plano si aparece…»)
  funcionó: los revisores encontraron un cartel con la botella de contorno y otro con la ola blanca sobre rojo en el
  gancho, que el borrador había colado. Meter la lista de lo prohibido en el tema llega a todos los agentes sin tocar el
  workflow.
- **Calidad:** 46 de 95 planos suspendieron en la primera revisión y los 46 aprobaron en la segunda ronda.
- **Verificación:** 18 correcciones; la peor, «400.000 llamadas» (eran más de cuarenta mil llamadas y cartas).
- **Miniaturas de los Shorts:** recortar la principal (16:9) a la franja central dejó a Mullins cortado en el borde.
  Cada Short necesita su variante compuesta para el vertical (aquí, la n = 4 de `nc-mini-chibi.js`), y conviene
  repartirlas después de elegir los tramos, no antes.
- **`fallos` en la pasada de calidad salta la primera revisión completa:** para una revisión de derechos de todo el
  episodio no sirve; va en el tema.
- **Disco:** se borraron los fotogramas del 27 (5,1 GB) antes del render.

## Episodio 29 · El mapa de Piri Reis (10/11/2026)

- **El esqueleto de los decorados perdió el import de `escena`:** se copió la fontanería desde la línea 19 de un
  esqueleto viejo y la línea del import quedaba justo antes. Dos agentes lo avisaron y no rompió nada. Al copiar la
  fontanería, comprobar con `grep -c "^import { escena }"` que está.
- **Un mensaje del usuario a mitad de producción confunde a los agentes:** el usuario mandó «o no espera, revisa este
  video» (era para el ep30), y el agente de escenas del grupo 2 lo leyó como orden de parar el 29 y no hizo nada. Se
  relanzó con una ACLARACIÓN en las indicaciones. Cuando el usuario cambie de tema a mitad de un episodio, añadir esa
  aclaración a todo lo que se lance después.
- **Calidad:** 47 de 106 planos suspendieron en la primera revisión; en la segunda ronda quedaron 2, que se pulieron.
- **Verificación:** 17 correcciones. Las peores: Edhem no dirigía Topkapı (dirigía los museos de Turquía); en 1513 Piri
  Reis era capitán, no almirante; los cuatro mapas portugueses eran de Asia, no de Brasil; Hapgood no hablaba de
  navegantes de hace millones de años (hablaba de un desplazamiento de la corteza hace unos miles).
- **Voz:** «Piri Reis» en inglés sonaba «Peary rise»; con «Peeree Race» el control oye «Piri».
- **Herramienta:** `R.recorte` no afecta a `R.rect` (lo avisó un pulidor): un recorte hecho con `R.rect` puede salirse.
- **Shorts de un episodio viejo sin pistas:** cuando ya no quedan fotogramas ni pistas (el ep17), se cortan del vídeo
  montado con la misma composición (scratchpad/short_desde_mp4.py). En el ep17 Fenn ocupaba solo 39 s: un Short, no tres.
- **Miniaturas verticales:** una carta en la mano (`cosa`) tapa la cara del chibi al doble; mejor la pieza al lado.
- **Disco:** se borraron los fotogramas del 28 (5,8 GB) al empezar.

## Episodio 30 · Bajo las pirámides (11/11/2026)

- **Un tema que el usuario no ve como bulo:** lo que dicen los italianos se dibujó en un decorado propio, en plano azul
  («según ellos»), y lo comprobado en el estilo de siempre. Meter la regla en el `tema` de la calidad («suspende el
  plano si…») bastó para que revisores y pulidores la vigilaran en todo el episodio.
- **Verificación:** 11 correcciones (3 agentes). Lo que más pesó, del investigador previo: el artículo de 2022 era sobre
  Keops, no Kefrén, y se retiró el 10/08/2026; Nicole Ciccolo es del equipo, no una crítica.
- **Títulos:** el aprobado con el guion pasaba de 60 caracteres; se acortó en la ficha. Pasar `titulos.py` ya con el
  título del guion, antes de presentarlo.
- **Shorts con un tramo final de otra escena:** la voz española no cae en los mismos segundos que la inglesa dentro de
  una escena, así que un tramo corto del final (la frase del veredicto) dejaba el español a medias. Usar tramos que
  empiecen y acaben en un corte de escena o en un silencio de los dos idiomas (mirar `linea.json` → `palabras.es`).
- **Calidad:** 45 de 117 planos suspendieron en la primera revisión; en la segunda ronda quedó 1 y se pulió.
- **Disco:** el render pedía 9,9 GB; se borraron mis capturas viejas del scratchpad (ep25–ep28). Y un reinicio del
  contenedor cortó el primer render: todo estaba subido y bastó con relanzar `producir.sh`.
- **Voz:** «Khafre» sonaba «coffer» en inglés; con «Kafray», bien.

## Episodio 31 · La historia de GTA (11/11/2026)

- **Un juego con dueño, sin una sola imagen suya:** la ciudad es de juguete e inventada, sin interfaz, mapa ni marcador;
  los bichitos son los nuestros (naranjas, con fregona verde). Aun así, la calidad cazó un icono de la barra del año que
  parecía un marciano de recreativa: con un juego con dueño, también los iconos de 7×7 se miran.
- **Música en una cartela, 7,6 dB:** `banda.cjs` redondea el instante de la cartela y `medir-sonido.py` lo trunca, así
  que su relleno se quedaba justo en 7,5 y el control medía 7,6. Se arregló sin tocar el canon: la escena de antes pasó
  de «intriga» a «aventura» (2,9 dB). Pendiente de permiso: alinear las dos medidas en `banda.cjs`.
- **Golpe musical:** un golpe solo puede caer en el principio de una frase (las marcas son frases). Si el momento fuerte
  va a mitad de frase (aquí, la cifra de mil millones), o se parte la frase antes de locutar o el golpe va al principio.
- **Calidad:** 47 de 96 planos suspendieron en la revisión completa; 47 → 4 → 1, y el último (dos clientes apilados) lo
  arreglé yo. El fallo encargado de antemano (la cifra de «cinco» parecida al gancho) acabó en un plano nuevo y mejor.
- **Decorados:** la mesa de la oficina se borraba porque la moqueta se pintaba después; la pasada de decorados lo vio por
  la causa, no por el síntoma, y hubo que quitar el parche que había puesto la escena.
- **Shorts:** tramos en cortes de escena o en silencios de los dos idiomas (mirados en `palabras.es`), a la primera.
- **Control final a la primera:** sí (−14,1 y −14,0 LUFS; peor cartela 5,4 dB; 135/138 subtítulos, 0 fuera de norma).

Pendiente para el próximo: pasar `titulos.py` con el guion; si hay que poner un golpe a mitad de frase, partir la frase
antes de locutar.

## Episodio 32 · The Secret: los doce cofres de 1982 (11–12/11/2026)

- **Un libro con dueño, sin una sola pintura suya:** los cuadros son nuestros y se ven de lejos o en trozos; sin letras
  (solo números, rayas y símbolos). Las dos hojas de calendario de Boston («17» y «18») se dejaron y se le dijo al usuario.
- **Calidad:** 24 de 94 planos suspendieron en la revisión completa (el 31: 47 de 96); 24 → 2 → 0 en tres rondas, sin
  nada pendiente. 35 fallos: 9 «algo no se lee», 7 de orden de dibujo, 6 de la zona de Atom o la barra del año (las cifras
  del año bajan hasta y ≈ 20, no hasta 14: lo que haya en y 15–20 bajo x 20–45 las toca) y 6 de brazo. Los 7 fallos
  encargados de antemano (parches de decorado, brazos largos, dos composiciones repetidas) se arreglaron en la ronda 0.
- **Parches de decorado:** dos escenas tapaban con píxeles el auricular del teléfono; la pasada de decorados añadió
  `o.descolgado` y la calidad quitó los parches. Si una escena necesita quitar algo del decorado, se pide la opción.
- **Planos de más:** seis escenas salieron con un plano más de lo planeado (94 frente a 88) porque una oración pasaba
  de 7 s; no hubo que tocar nada, pero el plan de encuadres debe contar por oraciones, no por párrafos.
- **Sonido:** dos escenas cortas (la presentación y la excavadora) siguen marcadas «mucho» (83 % y 85 % de efectos) tras
  recortarlas; el total, 53 %. La cartela de 2004 cae 7,5 dB, justo en el límite.
- **Disco:** al empezar el render había 9,3 GB (hacían falta 8,3): se borraron las capturas temporales del 31 y las
  muestras de banda de `/tmp`. Tras el render quedan 3 GB.
- **Shorts:** tramos en cortes de escena, mirados en los dos idiomas, a la primera.
- **Control final a la primera:** sí (−14,1 y −14,0 LUFS; peor cartela 7,5 dB; 133 y 145 subtítulos, 0 fuera de norma).
- **Cifras:** unas 7 h desde el guion v1 (presupuesto: 9–11 h); calidad, 5,3 M de tokens y 2 h 27 min.

**Arreglado el 12/11/2026, a petición del usuario («corrige lo que haya que corregir para el próximo vídeo»):**
- `medir-sonido.py` redondea el instante de la cartela como `banda.cjs` (antes truncaba). No cambia el sonido: solo la
  medida. Comprobado en el 30 (idéntico), el 31 (peor cartela 5,4 → 5,8 dB) y el 32 (7,5 → 5,2 dB: el 7,5 era la ventana
  desplazada, no una caída real).
- En la skill: los Shorts saltan 1,42 s de las escenas con cartela y se mira el primer fotograma y cada empalme; el
  título se comprueba contra el guion antes de aprobarlo; la lista «para escuchar» se copia de `informe.json`; los
  encuadres se reparten por oraciones. En `NIVEL-RESUMEN.md`: nada en y 15–20 bajo las cifras del año.

Pendiente para el próximo: borrar los fotogramas del 32 al empezar; vigilar que las cinco correcciones de arriba se
cumplen (planos planeados = planos generados; ningún destello de cartela en los Shorts).

## Episodio 33 · Dune: el libro que nadie quería publicar (12/11/2026)

- **Un libro y tres películas con dueño, sin una imagen suya:** el planeta, las dos lunas y la loma bajo la arena son
  nuestros; los cines solo enseñan marquesinas, taquilla y butacas. La estatuilla es genérica (llama sobre esfera), pero
  de lejos recuerda a la de verdad: se le dijo al usuario.
- **Las cinco correcciones del 32, vigiladas:** el título pasó `titulos.py` con el guion; los Shorts saltan 1,42 s de
  cartela y cortan en silencios de los dos idiomas; la lista «para escuchar» sale de `informe.json`. Los planos: 101.
- **Calidad:** 32 de 101 planos suspendieron en la revisión completa (el 32: 24 de 94); 32 → 0 en la segunda ronda. 48
  fallos: 11 de brazo o mano, 10 de orden de dibujo, 9 «algo no se lee», 5 composiciones repetidas, 4 de la zona de Atom.
  Los brazos siguen siendo el fallo número uno: el borrador de escenas debe medir cada brazo (≤ 45 px) antes de entregar.
- **Un encargo mal descrito:** pedí arreglar «el inserto del contador» de la taquilla y la medida era del plano de los
  premios; el agente lo vio y arregló el plano correcto. El encargo debe copiar el plano y el instante de `--comprobar`.
- **Sonido:** tras el borrador, cuatro escenas pasaban de 70 % de efectos y dos no llegaban a 40 %; la pasada de
  movimiento las llevó a rango. Total final, 54 %.
- **Disco:** el render pedía 8,7 GB y había 8,4: `producir.sh` se paró (bien) y hubo que borrar capturas temporales de
  las pasadas. El render real ocupó 6,6 GB. Borrar las capturas de decorados y movimiento ANTES de lanzar la producción.
- **Subtítulos:** «H. R. Giger» se partió en «…artist H.» / «R. Giger…»; corregido a mano en el SRT. `subtitulos.py`
  no debería cortar tras una inicial con punto.
- **Miniatura:** la cifra en hueso pierde contraste sobre arena clara y un halo oscuro detrás parece una mancha: se
  subió al cielo oscuro. Con fondos claros, colocar la cifra sobre lo oscuro desde el primer borrador.
- **Shorts:** el Short 3 empezaba en «Y su plan…» sin decir de quién; se rehízo desde la frase anterior. Mirar la
  primera frase de cada Short como si no se hubiera visto el vídeo.
- **Control final a la primera:** sí (−14,0 y −14,0 LUFS; peor cartela 5,7 dB; 131 y 132 subtítulos, 0 fuera de norma).
- **Cifras:** tokens: decorados 2,28 M; escenas 2,93 M; movimiento 0,37 M; pasada de decorados 1,92 M; calidad 5,02 M
  (2 h 24 min).

- **Shorts en cuadrado (decisión del usuario, 12/11/2026):** preguntó por qué solo se usaba el 30 % de la pantalla;
  con dos muestras eligió el recorte cuadrado por plano (56 %). `short.py` lo hace solo desde ahora.

Pendiente para el próximo: borrar los fotogramas del 33 y las capturas de las pasadas antes del render; medir los brazos
en el borrador; proponer al usuario el arreglo de `subtitulos.py` para las iniciales («H. R.»).

## Episodio 34 · El Arca de Noé: lo que se sabe y lo que no (12–13/11/2026)

- **Un relato sagrado y una noticia sin confirmar:** a Noé no se le dibuja; los tres libros, cerrados e iguales; lo que
  dice el equipo, en plano azul «según ellos»; la hoguera del pastor, dentro de un globo de idea; las casillas de la
  lista se quedan vacías. Antes de entregar se buscó si había resultados de laboratorio (13/11: ninguno).
- **El reparto de encuadres repetía dentro de la escena:** la primera versión repetía encuadre en 12 de 20 escenas y se
  frenó antes de lanzar. Hubo que encargar 23 vistas nuevas de un solo plano (mesas, insertos, vistas) y rehacer el
  reparto. El reparto se comprueba con un script (ningún encuadre dos veces en una escena) ANTES de lanzar las escenas.
- **Un reinicio del contenedor a mitad de las escenas:** paró los tres workflows; con los módulos parciales subidos y
  `resumeFromRunId` no se perdió nada. Commit de lo parcial en cuanto un workflow largo lleva rato.
- **Calidad:** 44 de 102 planos suspendieron en la revisión completa (el 33: 32 de 101); 44 → 6 → 0. Otra vez los
  brazos: varios no caben en 45 px por la geometría del decorado (objetos lejos del borde); las salidas buenas fueron
  una pinza con mango (wyatt) y la mano pegada al canto del objeto (smith).
- **Símbolos pequeños que se leen como letras:** la media luna de 9 × 9 se leía «C» y la etiqueta de una caja, como
  texto; se taparon en las escenas. Los símbolos de un kit se miran a 640 px antes de usarlos.
- **Sonido:** antes de la pasada de movimiento, gancho 29 % y hola 75 %; después, todas entre 40 y 65 %. Total 50 %.
- **Disco:** había 5,5 GB y el render pedía ~8,7. Se liberó con los `musica.wav` y `efectos.wav` de los episodios 25–33
  (intermedios que se regeneran, 3,3 GB) y capturas temporales. El render dejó 2,0 GB libres.
- **Shorts:** el 3 salió a −14,6 LUFS (fuera de ±0,5) y se subió 0,55 dB sin tocar el vídeo. `short.py` debería
  nivelar en dos pasadas. Los cortes, solo en límites de párrafo: dentro de un párrafo el inglés y el español no
  coinciden.
- **Control final a la primera:** sí (−14,1 y −14,0 LUFS; peor cartela 4,9 dB; 148 y 150 subtítulos, 0 fuera de norma).
- **Cifras:** calidad 6,05 M de tokens (3 h 33 min, 34 agentes).

Pendiente para el próximo: comprobar el reparto de encuadres con script antes de lanzar; borrar los fotogramas del 34;
nivelar los Shorts en dos pasadas; mirar los símbolos de los kits a 640 px.

## Episodio 35 · Jumanji: la palabra que no significa nada (14–15/11/2026)

- **Derechos, el riesgo del episodio:** nada de las películas ni de las ilustraciones de los libros. Aun con la regla
  escrita en los encargos, los agentes de decorados dibujaron dos parecidos por su cuenta: el centro del tablero como una
  gema verde redonda (la cúpula del tablero de la película) y una casa flotando junto a un planeta con anillos (la
  portada de «Zathura»), esta última en tres sitios (la selva, la pantalla del cine y un cartel). Se vieron al mirar
  las hojas de contacto y por un aviso de un agente de escenas, y se rehicieron ANTES de las escenas: meta de latón con
  estrella roja y tablero de hojalata con planeta a rayas. En un tema con obra ajena, el encargo de decorados tiene que
  decir «no dibujes X» con el objeto concreto, no solo «nada de la película».
- **El español, con los años de corrido** (regla del usuario, 14/11): «mil novecientos ochentaidós» para la voz (los
  subtítulos no cambian) y comas solo de voz tras el año. Va en `hacer_guion.py` desde este episodio.
- **Barrido de opciones de los decorados antes de las escenas:** el integrador dejó fuera una sentencia suelta
  (`Object.assign(d_PICTOS…)`) y una vista rompía. Un agente barrió las 337 combinaciones de opciones y, de paso, puso
  las opciones reales en el plan de planos (65 de 93 líneas las llevaban inventadas o sin poner; 18 planos pedían algo
  que el decorado no daba). Ojo: `comprobar-decorados.mjs` sin `--hoja` pierde su primer argumento.
- **El plan de planos se cuenta por oraciones:** aun validado por script (93 planos), los agentes añadieron 9 vistas
  extra porque había oraciones de más de 7 s; acabó en 102 planos. Falta en el plan una lista de vistas libres.
- **Calidad:** 43 de 102 planos suspendieron en la revisión completa (el 34: 44 de 102); 43 → 1 → 0. Por tipo: orden de
  dibujo o algo que flota 23, brazo o mano 14, algo que no se lee 6. Al mirar yo después: el contador sumaba 2020 y el
  gancho decía 2027 (se pusieron los sumandos exactos), y el zapato del letrero era otro dibujo en la escena y en el
  decorado (se unificó).
- **Sonido:** antes de la pasada de movimiento, cinco escenas entre el 32 y el 37 % y el cierre en el 71 %; después,
  todas entre el 42 y el 67 % (pelo y taquilla, por encima de 60). Total 54 %.
- **Disco:** 8,9 GB antes del render (pedía ~8,7); quedó en 2,4. Se liberó con la música y los efectos del 34 y capturas.
- **Shorts:** el 1 salió a −14,7 LUFS y se subió 0,6 dB; en el 3 el recorte automático dejaba fuera el muro con las
  flores (`--x 4=0`).
- **Control final a la primera:** sí (−14,1 y −14,0 LUFS; peor cartela 6,4 dB; 144 y 141 subtítulos, 0 fuera de norma).
- **Cifras:** calidad 6,15 M de tokens (2 h 45 min, 38 agentes); decorados (primera versión) 2,47 M; escenas 2,64 M.

Pendiente para el próximo: borrar los fotogramas del 35; en temas con obra ajena, nombrar en el encargo los objetos
prohibidos; añadir al plan de planos una lista de vistas libres; barrer las opciones de los decorados al integrar;
nivelar los Shorts en dos pasadas.

## Episodio 36 · Tutankamón: los cuartos que nadie ha abierto (15–16/11/2026)

- **Un error de geografía que no vio ninguna pasada:** al fondo del Valle de los Reyes salía una pirámide lisa, de
  Guiza, en tres decorados (el valle, los acantilados de la necrópolis y la réplica). En la pasada de decorados se pidió
  el Qurn (cumbre natural) solo para la ladera, y las otras dos copias del pico no las revisó nadie. Lo vi yo al
  mirar un fundido de Carter; se arregló reusando el perfil del Qurn (`f_ldQurnTop`) en los tres sitios. Cuando un
  fallo de realidad aparece en un decorado, hay que buscar la misma forma en TODOS (grep de la fórmula, no solo del nombre).
- **El agujero de la vela, en la puerta equivocada:** se dibujó en la puerta de la escalera; Carter lo abrió en la
  segunda puerta. Se movió a tumba/pasillo. Las anécdotas con lugar exacto van en el plan de planos con su sitio.
- **Pasada de calidad cortada a medias:** una interrupción del turno mató el workflow (estado «killed») y se notó horas
  después porque el .output seguía vacío. Se reanudó con `resumeFromRunId`: 16 de 17 agentes salieron de la caché.
  Si el usuario interrumpe con un workflow en marcha, comprobar su estado en `workflows/<run>.json` al volver.
- **Calidad:** 46 de 98 planos suspendieron en la revisión completa (el 35: 43 de 102); 46 → 6 → 0. Dejó un PARCHE
  DECORADO en tu-turin (la tapa de la carpeta), que ya es más rico que el decorado: se queda.
- **Sonido:** antes de la pasada de movimiento, 33 %; después, todas entre el 41 y el 61 %. Total 48 %.
- **Disco:** 11 GB antes del render (se borraron los mp4 del 17 al 34, con permiso); quedó en 2,7.
- **Shorts:** en el 3, el tramo empezaba 0,06 s antes de la voz (tras la cartela «2026», que dura hasta el fotograma
  10514) y el fundido de 0,12 s se comía la primera sílaba: se adelantó a 350,5 (fotograma limpio, 0,18 s de margen).
  Antes de cortar, mirar la voz y el fotograma en el arranque de cada tramo, no solo el límite del párrafo. En el 1 el
  recorte dejaba el busto en el borde (`--x 5=40`). Segunda pasada de volumen: −14,0 / −14,1 / −14,1. El de los tres
  radares (73 s) no cabía sin cortar un párrafo.
- **Miniatura:** a 320×180, la cara de sorpresa de Carter (la del kit, canon) apenas se lee; lo que vende es el «?» y el
  contorno azul. Para la próxima, la emoción tiene que venir de la pose o de la composición, no de 3 px de boca.
- **Control final a la primera:** sí (−14,1 y −14,0 LUFS; peor cartela 7,3 dB; 139 y 143 subtítulos, 0 fuera de norma).
- **Cifras:** calidad 4,0 M de tokens en la parte reanudada (39 agentes, 1 h 57 min).

Pendiente para el próximo: borrar los fotogramas del 36; buscar en todos los decorados la forma de un fallo de
realidad, no solo en el que se vio; comprobar los workflows tras una interrupción; comprobar si Egipto dio el permiso de
perforar (si sí, rehacer la frase del permiso del 36).

## Episodio 37 · La señal «Wow!»: setenta y dos segundos que nadie ha vuelto a oír (16–17/11/2026)

- **Voces nuevas (primer episodio con ellas):** Supertonic 3 `M1` (inglés) y ZONOS3-Mini `Rodrigo` (español). ZONOS3
  lee bien los nombres ingleses tal cual, sin escribirlos a la mexicana; el pegado de frases se desactivó. Supertonic
  necesitó tres arreglos escritos: «Ah-tom» (Atom), «Setty» (SETI) y «Eeman» (Ehman). Aun así quedó «Kraus» como
  «cross»: siguiendo la regla del usuario («no lo corrijas en el audio, tenlo como regla»), va a la lista para escuchar
  y no se re-locuta.
- **Golpes de música a mitad de frase:** `banda.cjs` acepta ahora «marca+segundos» en los golpes; los tres del 37 caen
  en su palabra («Wow!», el segundo «Wow!» y el programa) sin volver a locutar nada.
- **Un NaN que se comía la música:** desde 126,97 s hasta el final la música salía en NaN. En la capa de suspense, la
  base de `**1.6` quedaba negativa por redondeo; el NaN pasaba al nivel y a la reverberación. Se arregló con
  `Math.max(0, …)`. No lo causaron los golpes (se comprobó con el `escenas.json` de antes). Si el control de sonido da
  algo raro, buscar NaN en el wav antes que en la mezcla.
- **Calidad:** 34 de 98 planos suspendieron en la revisión completa (el 36: 46); 34 → 4 → 0, en 3 rondas, con 35
  agentes, 5,6 M de tokens y 2 h 7 min. Un agente cambió `c_listadoArriba` en el decorado (la mano del boli rojo, sola
  con su puño, sin brazo palo) y otros lo dieron por hecho; se integró en el mismo commit.
- **Lo que vio el control y no la revisión:** después de la pasada de calidad, `--comprobar` marcó QUIETO el primer
  plano del cierre (0,8 %): la página del artículo pasaba sola, sin mano y sin cambiar de contenido. Se arregló a mano
  (una mano pasa del artículo anterior, con gráfico y tabla, al de 1959). Pasar `--comprobar` SIEMPRE tras la calidad.
- **Disco:** el render de 8:34 pidió 8,8 GB y había 7,6; `producir.sh` paró antes de dibujar (bien). Se liberó sin
  preguntar solo lo regenerable: `efectos.wav` y `musica.wav` del 35, 36 y 37 (1,1 GB; se rehacen en un minuto), las
  hojas de revisión de las pasadas y las cachés de pip y uv. Quedaron 2,9 GB tras el montaje.
- **Sonido:** efectos el 47–49 % del tiempo; cartelas 3,3 / 3,7 / 4,9 dB.
- **Shorts:** el gancho dura 34,6 s con su voz; se tomó entero hasta el corte de escena (35,1 s) para llegar al mínimo.
  Las miniaturas verticales necesitaron tres intentos: lo que se lee en el 16:9 no cabe en los 100 px centrales
  (el «Wow!» quedaba fuera); el papel tiene que ir dentro de x 110–210 desde el principio. Las pistas españolas de los Shorts salieron a −12,4 /
  −15,2 / −15,2 LUFS: segunda pasada (volumen + limitador) a −14,1 / −14,0 / −14,1; el mp4 inglés salió bien a la primera.
- **Control final a la primera:** sí (−14,1 y −13,7 LUFS; 136 y 142 subtítulos, 0 fuera de norma).

Pendiente para el próximo: borrar los fotogramas del 37; pasar `--comprobar` después de la calidad; vigilar en
Supertonic los apellidos alemanes (Kraus) y apuntarlos antes de locutar.
- **Grito en el español (avisado por el usuario, 0:20–0:33):** ZONOS3 con emoción, en oraciones largas, a veces sube volumen y tono hasta gritar. `control-gritos.py` encontró dos casos claros (frase 2, +5,7 dB y +42 Hz; frase 25, +7 dB y +48 Hz). `calmar-voz.py` probó 5 semillas por oración y `empalmar-voz.py` puso las más tranquilas en su sitio, sin mover el vídeo; se remontó y se rehízo el Short 1. Desde el 38: pasar `control-gritos.py` en cuanto acabe la locución, y oraciones españolas de menos de ~30 palabras.
- **Crecidas de volumen en el español (segundo aviso del usuario):** además de los gritos, ZONOS3 sube el volumen dentro de las frases (8 frases subían más de 2,5 dB del primer tercio al último; lo que sobresale de la mediana llegaba a 4,8 dB). Se niveló la pista con `dynaudnorm=f=300:g=11:p=0.5:m=4:r=0.1` (queda 1 frase y 2,2 dB); la variante más fuerte (g=7) dejaba 1,7 dB, pero aplana. Desde el 38 va dentro de `locutar_frases.py` (NIVELADOR_ES). «Atom» en inglés se escribe «At-um» (elegido de oído por el usuario entre cuatro muestras).
- **La emoción del español, a la mitad (elegido de oído por el usuario, muestra 2):** con `mood.valence`/`mood.arousal` a 1 constantes, la emoción se acumula en las oraciones largas y el tono sube hasta el grito (la guía de ZONOS3 lo describe; nuestro paquete de emociones no trae `steer_release`). A 0,5, la frase de Kraus pasó de +60 a +4 Hz; con `control-tono.py` (sin errores de octava), de 6 frases con un tramo de 2 s a más de +30 Hz quedaron 2, al borde (+35). `revocear-zonos.py` rehízo el español entero del 37 sin mover el vídeo (~45 min) y se remontó con los Shorts. Desde el 38, 0,5 en `hacer_guion.py` y `control-tono.py` tras la locución.
- **Ep38, voz:** con media emoción y el nivelador, `control-tono.py` dio 0 frases españolas con tramos a más de +30 Hz (en el 37, a 1: 18). Whisper oye «At-um» como «adam» (la t blanda americana, que es la elegida de oído).

## Episodio 38 · El Mary Celeste: el barco que navegaba sin nadie a bordo (17–18/11/2026)

- **Calidad:** 40 de 95 planos suspendieron en la revisión completa (el 37: 34 de 98); 40 → 0 en una ronda de pulido,
  con 33 agentes, 5,8 M de tokens y 2 h 25 min (el 37: 35 agentes, 5,6 M, 2 h 7 min). Los cuatro fallos dirigidos
  (barandillas dobles, coche sin caballo, trastos ilegibles, fundidos de pistas) se arreglaron en la ronda 0. Los fallos
  por tipo: orden de dibujo 19, poco detalle 12, brazo o mano 9, no se lee 9, quieto 9, composición repetida 6.
  Escenas con más: pistas (10), gibraltar (9), salida y manchester (7).
- **Los pulidores tocaron el decorado diciendo que no:** varios avisos decían «no he tocado mc-comun.js», pero el diff
  final tenía 366 líneas cambiadas en él (la cámara 'pasarela' en picado, nubes de temporal). Como el decorado es común,
  se pasó `--comprobar` (0 sospechas) y `--fundidos` en todo el episodio antes del commit. Lección: no fiarse del aviso;
  mirar `git diff --stat` del decorado tras la calidad.
- **Fundidos «REVISAR» que no son fallo:** seis cortes al 3–4 % (gancho, salida, abordo, pistas) daban lo mismo con el
  decorado de antes; son las olas y la espuma que parpadean. No se tocaron.
- **Disco:** quedaban 989 MB al empezar la producción. Se borraron los fotogramas del 37 (6 GB, regla aprobada) y aun
  así el render pidió 8,7 GB con 7,4 libres: se liberaron la caché de npm (338 MB), la música y los efectos del 37 y
  todas las hojas de las pasadas. Quedaron 2,2 GB tras el montaje. El scratchpad acumula ~1,5 GB de hojas por
  episodio: borrarlas al cerrar cada pasada.
- **Miniatura:** el catalejo de Deveau, pasado por `op.cosa`, quedó primero tapándole la cara (sostiene a la altura de
  los ojos); bajarlo 7 px lo deja en el pecho y se ve la sorpresa.
- **Shorts:** −14,0/−13,7, −14,3/−14,2 y −14,2/−14,4 LUFS a la primera (mp4/m4a); las pistas españolas ya salen bien
  con el nivelador. El Short 3 se salta la cartela de 1884 con dos tramos.
- **Control final a la primera:** sí (−14,1 y −14,0 LUFS; 145 y 140 subtítulos, 0 fuera de norma; cartelas 4,2 / 6,0 /
  4,2 dB; efectos el 48 % del tiempo).
- **Voz:** «Atom» oído «adam» y «Dei Gratia» oído «degracia» (frases 8, 9 y 16), a la lista para escuchar, sin re-locutar.

Pendiente para el próximo: borrar los fotogramas del 38 al empezar; borrar las hojas del scratchpad al cerrar cada
pasada; tras la calidad, mirar `git diff --stat` del decorado y, si cambió, `--comprobar` y `--fundidos` de todo el
episodio.

## Episodio 39 · Roanoke: la colonia que desapareció y dejó una palabra (18/11/2026)

- **Calidad:** 37 de 103 planos suspendieron en la revisión completa (el 38: 40 de 95); 37 → 0 en una ronda de pulido,
  con 22 agentes, 4,3 M de tokens y 1 h 51 min (el 38: 33 agentes, 5,8 M, 2 h 25 min). Fallos por tipo: orden de
  dibujo o flota 14, quieto 11, composición repetida 9, poco detalle 9, no se lee 8, zona de Atom o barra del año 6,
  brazo o mano 4. Escenas con más: objeto (11), árboles (8), familias y regreso (7).
- **El decorado tras la calidad:** esta vez el diff de `rk-comun.js` en la calidad fue de 10 líneas (el 38: 366). Se
  pasaron `--comprobar` (0 sospechas) y los fundidos de todo el episodio en `producir.sh`: solo «REVISAR» del 3–5 %, los
  mismos que antes de los decorados (mar y tormenta animados), ningún roto.
- **Golpe con desfase:** el golpe de las escamas sonaba 14 s antes del imán porque la marca cae al principio de la
  frase. Se arregló con «marca+segundos» (`escamas+14.1`) en `plan.py`, sin tocar `banda.cjs`.
- **Luz doble:** el cierre teñía de tarde un plano que el decorado ya pintaba con `luz:'tarde'`; se quitó el tinte de
  la escena. Lección: si el decorado tiene opción de luz, la escena no tiñe.
- **Miniatura:** el `dedo` de White le dejaba la mano delante de la cara (como el catalejo del 38). Con `sostiene` hacia
  el poste y un índice de 2 px dibujado con `op.cosa`, señala y se lee a 320 × 180. Ya van dos episodios: para señalar
  en una miniatura, `sostiene` + índice, no `dedo`.
- **Disco:** el render pedía 9,0 GB con 7,0 libres al acabar la calidad. Se borraron tres carpetas temporales de Shorts
  del 12/11 (670 MB), las hojas de las pasadas del 39 (~600 MB) y, con permiso del usuario, los MP4 largos del 35, 36 y
  37 y la caché de Whisper (~1 GB). Quedaron 2 GB tras el montaje. Las hojas del scratchpad se siguen acumulando: hay
  que borrarlas al cerrar cada pasada, como se dijo en el 38 y no se hizo.
- **Control final a la primera:** sí (−14,0 y −14,0 LUFS; 148 y 146 subtítulos, 0 fuera de norma; cartelas 7,5 / 5,2 /
  3,5 dB, la primera justo en el límite; efectos el 45 % del tiempo, cinco escenas entre el 36 y el 38 %).
- **Voz:** «Atom» oído «adam», «Raleigh» «rallick» (ES), falta «an» (EN 15), «Croatian» (EN 24), «Sitio X» «texio»
  (ES 23) y subidas de tono en ES 14 y 32: a la lista para escuchar, sin re-locutar (regla del usuario).
- **Shorts:** tramos de una sola pieza cada uno; el 2 y el 3 empiezan a 1,42 s de la cartela del año.

Pendiente para el próximo: borrar los fotogramas del 39 al empezar (regla aprobada); borrar las hojas del scratchpad al
cerrar cada pasada (sigue pendiente); cartelas: el 1587 cae 7,5 dB, en el máximo, vigilarlo en `banda.cjs` si se repite;
efectos: subir las escenas por debajo del 40 % en la pasada de movimiento aunque el total cumpla.

## Episodio 40 · Anticitera: el ordenador de hace 2000 años que salió del mar (19/11/2026)

- **Contenedor reiniciado dos veces** (en los decorados y en el borrador de escenas). No se perdió nada: los módulos
  hechos se guardaron con commit y los workflows se reanudaron con `resumeFromRunId`. Lección: hacer commit de cada
  módulo de borrador en cuanto existe, no al final.
- **Borrador de escenas:** 104 planos en 15 escenas; 4 sospechas de `--comprobar` (1 quieto, 2 lisos, 1 Atom) y
  efectos de más en dos escenas (rescate 81 %, eclipses 73 %). La red de efectos solo avisaba por abajo («← poco»); el
  exceso también hay que mandarlo a la calidad con su encargo.
- **Calidad:** 50 de 104 planos suspendieron en la revisión completa (el 39: 37 de 103); 50 → 0 en una ronda de pulido,
  con 29 agentes, 5,4 M de tokens y 2 h 10 min. Antes, 9 fallos dirigidos (de los avisos y de `--comprobar`) pulidos en
  la ronda 0.
- **Manivela que gira sola:** el decorado de la caja no dejaba sitio a nadie a la derecha. La pasada de decorados añadió
  un escabel con `geo.apoyo` y `geo.agarre`, y la calidad puso al artesano a girarla. Lección: un mecanismo que se mueve
  necesita en el decorado el sitio y el punto de agarre de quien lo mueve.
- **El decorado tras la calidad:** 62 líneas cambiadas en `ak-comun.js`; `--comprobar` de todo el episodio después:
  1 sospecha (detalle detrás de Atom en eclipses p1, 126 px con umbral 120, marginal) y fundidos sin rotos en
  `producir.sh`.
- **Miniatura:** la rueda del terrón brillaba poco a 320 × 180; tres halos superpuestos (ancho, medio y núcleo) y el
  grado más oscuro la convierten en el punto caliente, aunque sigue leyéndose como «algo que brilla» más que como rueda.
- **Disco:** con 9,8 GB libres y 9,3 GB pedidos, se borraron los MP4 del 38 y su carpeta de montaje (ya publicado).
  Las hojas de las pasadas (~400 MB) se borraron al cerrar, esta vez sí.
- **Control final a la primera:** sí (−14,0 y −14,0 LUFS; 156 y 159 subtítulos, 0 fuera de norma; cartelas 5,7 / 4,8 /
  3,6 / 7,0 / 2,2 dB; efectos el 58 % del tiempo, todas las escenas entre el 41 y el 68 %).
- **Voz:** «Atom» oído «adam», «Stais» (EN 8), «Saros» «seiro» (EN 21), «Hiparco» «y parco» (ES 19), «tan bien»
  «también» (ES 26) y subidas de tono en ES 2, 28, 29 y 32: a la lista para escuchar, sin re-locutar.
- **Shorts:** −14,5/−13,9, −14,2/−14,2 y −14,0/−14,1 LUFS; el 2 empieza a 1,42 s de la cartela de 1900.

Pendiente para el próximo: borrar los fotogramas del 40 al empezar (regla aprobada); commit de cada módulo de borrador
en cuanto exista; mandar a la calidad también las escenas con efectos por encima del 65 %; en los decorados con
mecanismos, pedir desde el encargo el sitio y el agarre de quien los mueve.

## Episodio 41 · Avengers: Doomsday, segunda parte, con los cómics (19/11/2026)

- **Volumen de la voz desigual entre frases** (petición del usuario: «normaliza el volumen, valida que no suceda tambien
  en ingles»). Medido: la mediana de caída entre oraciones era de 1,3 dB en español y de 3,9 dB en inglés (saltos de 2,4
  y 4,4 dB). Nuevo `atomo/herramientas/nivelar_voz.py`: un nivelador con puerta de voz (RMS de 10 ms, puerta a −45 dB,
  ganancia = mediana − nivel local solo sobre la voz, interpolada en los silencios y suavizada; ES ventana 0,25 s y
  máximo 9 dB, EN 0,15 s y 12 dB). Después: ES 0,4 dB de caída (p90 0,7), EN 1,5 dB (p90 2,4). `locutar_frases.py` lo
  aplica ya al escribir `voz-<l>.wav` y deja `nivelado.json`; en un episodio ya locutado se pasa una vez con la
  herramienta (rehace `linea.json['energia']`). El 39 y el 40 siguen sin nivelar (solo si el usuario lo pide).
- **Calidad:** 55 de 119 planos suspendieron en la revisión completa (el 40: 50 de 104); 55 → 0 en una ronda de pulido.
  Antes, 5 fallos dirigidos en la ronda 0 (dos parches de decorado ya innecesarios, el póster que caía mal, unos discos
  blancos sobre la máscara y el brazo del lápiz). 31 agentes, 5,9 M de tokens y 2 h 45 min. La calidad tocó también
  `do-comun.js`, que comparte el 19 (ya publicado).
- **Mi ojo:** 4 hojas (gancho p3–4, búnker p10, etiqueta p4, secret p9), las cuatro aguantan.
- **Control final:** no a la primera: un subtítulo inglés a 20,8 caracteres por segundo (el último párrafo). Se adelantó
  su entrada 0,21 s, dentro del silencio anterior. Luego: −14,0 y −13,9 LUFS; 167 y 172 subtítulos, 0 fuera de norma;
  efectos el 48 % del tiempo (todas las escenas entre el 39 y el 60 %); cartela 2,5 dB.
- **Short 1 mal planeado:** el tramo incluía la presentación de Atom, que la skill excluye. Sin ella el gancho dura 33,4 s
  (por debajo de 35); se le pegó un párrafo entero del cuerpo («Why does Doom want Hulk?…», 87,65–103,53). Los cortes
  van siempre en límites de PÁRRAFO: los comienzos de párrafo coinciden en las dos pistas, pero las oraciones de dentro
  no (en el 41, «Bruce Banner is recording» empezaba 0,2 s antes en español). Shorts: −14,1/−14,0, −14,0/−13,9 y
  −14,2/−14,2 LUFS.
- **Voz:** «Atom» «adam» (EN 3), «Latveria» «la adveria» (ES 13), falta «dollars» (EN 27), hueco antes de «subjects»
  (EN 30), «Feige» «faiji» (EN 32): a la lista para escuchar, sin re-locutar.
- **Tráiler final:** no había salido el 19/11 (se esperaba el 16 y el 18); el acto 8 lo dice y la ficha avisa.

Pendiente para el próximo: borrar los fotogramas del 41 al empezar; comprobar en el plan de Shorts que el gancho sin la
presentación de Atom llega a 35 s y, si no, pegarle un párrafo entero; mirar el nivel de voz del episodio nuevo con
`nivelado.json` (ya se nivela solo).

## Episodio 42 · GTA VI: la Florida real detrás de Leonida (20/11/2026)

- **Título:** el usuario pidió «el título del caimán». «GTA 6's Alligator Was Real» afirma más de lo comprobado (Rockstar
  no ha confirmado la fuente y Kotaku liga el plano a otro caso de 2013); se usó «GTA 6: The Real Florida Alligators Behind
  the Trailer» y se le avisó. El gancho dice «algo muy parecido pasó de verdad».
- **Guion:** 14 arreglos de los tres escépticos (aligátor y caimán, Britton Hill «sobre el nivel del mar», Wendy's sin la
  acusación, el caso de la piscina del tráiler que es otro, de 2019). El golpe del gancho caía en «trailer»: `caiman+9.8`.
- **Calidad:** 7 fallos dirigidos en la ronda 0; 43 de 104 planos suspendieron en la revisión completa (el 41: 55 de
  119); 43 → 2 → 0. 32 agentes, 3,3 M de tokens y 2 h 8 min. **El contenedor se reinició a media pasada:** se hizo commit
  de lo que había y se reanudó con `resumeFromRunId`; 15 resultados salieron del journal sin repetir.
- **Mi ojo:** 5 planos (everglades p9, leonida p2 y p6, jason p2 y p7, hoy p8), aguantan.
- **Sonido:** lf-caimanes con efectos el 33 % del tiempo (marca «poco»); seis efectos sincronizados más → 42 %. Total 48 %.
- **Miniatura:** el caimán a la altura del mostrador se comía el hocico con `tiendaDelante` (que va encima); bajado y a la
  izquierda, con «2018» en hueso arriba. A 320 × 180 se lee la boca roja y el ojo.
- **Disco:** 8,2 GB al render; se borraron las hojas de las pasadas (1,3 GB, regenerables) para pasar de 9 GB.
- **Voz:** «Atom» «adam» (EN 3), «Okeechobee» «okikyobi» (EN 7), «seis» «vi» (ES 12), «Kool-Aid Man» «cool aidman»
  (ES 14): a la lista para escuchar.

Pendiente para el próximo: borrar los fotogramas del 42 al empezar; si el contenedor se reinicia en una pasada, commit y
`resumeFromRunId` (funciona); mirar los efectos por escena antes de la calidad, no después.

## Episodio 43 · Haymitch: Amanecer en la cosecha, el canon nuevo (20/11/2026)

- **Canon nuevo, aprobado por el usuario:** relato hablado a lo Farid Dieck, locutado párrafo a párrafo; Atom en escena,
  con cara (ya no en la esquina); pausas «fíjate» en gris azulado; miniatura con 1–3 palabras; 12–14 min con aviso de
  destripes. La sospecha ATOM de `medir-planos --comprobar` y la regla de la «zona de Atom» quedan obsoletas: salen 4–5
  avisos ATOM y no hay que hacer nada. Un REPITE dentro de una pausa (el mundo congelado) es lo esperado.
- **El Vigilante:** `ELENCO_CHIBI.vigilante` lo pisaba el vigilante de Gävle del 22 (las uniones posteriores del kit
  sobrescriben). Solo chocan `vigilante` y `manifestante`. Arreglo: `export { ELENCO_JH as JH }` en hm-comun.js y
  `T.JH.vigilante` en las escenas. Para el próximo: buscar colisiones de nombres antes de usar `EL.<x>`.
- **Efectos nuevos** en efectos.cjs: `tapestop` (la entrada de la pausa, en vez de `cuelga`), `pasos({n, ritmo})`,
  `oca({n})` y `pajaros({n})`. Medidos con earshot: los pasos salen algo brillantes (3,7 kHz).
- **Calidad:** ronda 0 con 2 fallos dirigidos; 45 de 146 planos suspendieron en la revisión completa; 45 → 0 en la
  segunda. 21 agentes, 4,5 M de tokens y 2 h 11 min. **Una pasada cambió un decorado que otra escena congela:**
  hm-cosecha rehízo la sala de la tele y la pausa de hm-toma seguía congelando la copia vieja de `teleFinal`. El agente
  lo avisó pero no lo tocó («no es mi archivo»). Para el próximo: leer los avisos del workflow buscando «no casa» / «no
  es mi archivo» antes de dar la pasada por buena.
- **Miniatura:** tras la pasada de decorados el prado ya pintaba su bolsa de gominolas (`o.gominolas`) y la miniatura
  llevaba otra en la mano: dos bolsas. Ahora `gominolas: false` y la de la mano es la misma bolsa roja con lazo.
- **Shorts:** miniatura 3: el hacha a la altura de la cabeza de Haymitch parecía que le golpeaba; subida al destello del
  campo, lejos de él (la violencia nunca se ve, tampoco insinuada en una miniatura).
- **Disco:** 12:56 son 23.289 fotogramas y producir.sh pide 12,4 GB. Había 1,4 GB libres: 13 GB eran registros de
  agentes de pasadas de episodios ya publicados (`~/.claude/projects/…/subagents/workflows`). El usuario aprobó
  borrarlos (los anteriores al 19/11); también las pruebas del scratchpad, `/tmp/muestra-banda-*` y las cachés de pip y
  uv. Para el próximo: con episodios de 12–14 min, mirar el disco ANTES de la pasada de calidad.
- **Títulos:** los del guion pasaban de 60 caracteres y el A/B usaba «everything» (vago para `titulos.py`); se acortaron
  con el tema delante.
- **Sonido final:** −14,0/−14,1 LUFS, efectos el 46 % del tiempo, voz 17 dB sobre los efectos; earshot en cuatro tramos:
  rango de sonoridad 2–3 LU, sin saltos.
- **Voz:** «geese» «gs» (EN 6 y 38), «reshoot a» (EN 12), «blowgun» (EN 23), «la» «lo» (ES 4), «a» repetida (ES 18): a
  la lista para escuchar.

Pendiente para el próximo: borrar los fotogramas del 43 al empezar; mirar el disco antes de la calidad; buscar
colisiones en ELENCO_CHIBI; leer los avisos cruzados del workflow de calidad.

## Episodio 44 · Paul Atreides: por qué el héroe de Dune es el villano (21/11/2026)

- **Música nueva, canon desde el 44 (aprobado por el usuario de oído):** instrumentos sampleados con FluidSynth y
  FluidR3_GM (`atomo/herramientas/sonido/tramo_sf.py`, con `BANDA.sampleado` y `BANDA.paleta`), una paleta por episodio
  y nunca el mismo solista dos episodios seguidos; nada que suene a campanita (celesta, glockenspiel, caja de música,
  campanas, vibráfono, kalimba, marimba, dulcémele: un assert lo impide). **Fallo encontrado:** el MIDI no llevaba
  tempo y sonaba a 120 bpm; los tramos largos acababan antes y dejaban escenas 8 dB más bajas. Se arregló la base de los
  ticks y se le dijo al usuario que la muestra que aprobó sonaba demasiado rápida. Medido en el episodio: 4,7 dB entre la
  escena más baja y la más alta, sin caídas.
- **Ritmo de la narración, canon desde el 44** («un 10 % más rápido y sin pausas largas entre escenas»): inglés a 1.045,
  pausas cortas (respiro 0,15, párrafo 0,4, acto 0,5) y español con `ritmo: 'igualar'` (la velocidad de cada frase se
  ajusta a la duración de la inglesa, entre 15,5 y 21 bytes/s). El episodio pasó de 12:24 a 10:59. En español quedan
  silencios de hasta 3,1 s (mediana 1,5) donde la velocidad toca el tope.
- **Subtítulos:** con la voz más rápida, 3 subtítulos españoles pasaron de 20 caracteres/s; se arreglaron moviendo sus
  tiempos unas décimas hacia los huecos de al lado. Para el próximo: mirarlo antes del control final.
- **Reparto:** `sacerdote` ya existía en ELENCO_CHIBI; el nuevo se llama `sacerdotePA` (sí se buscaron colisiones).
- **Decorados:** la pasada encontró y arregló un sepia que se desbordaba (las velas salían turquesa: faltaba
  `Math.min(255, …)`), un cuenco tapado con parche (ahora `o.sinCuenco`) y una cuna que asomaba en el año 0.
- **Calidad:** 129 planos, 43 suspensos en la revisión completa → 2 al final (la «Y» de oro en las banderolas, que se
  arregló a mano poniendo el halcón por defecto). 27 agentes, 4,8 M de tokens, 1 h 46 min. **Ojo:** tres agentes
  editaron el html directamente (pa-gancho, pa-conspira, pa-trampa) y sus módulos `escenas1/4/5.py` ya no coinciden:
  **no regenerar esos módulos con `--pisar`** sin pasar antes los cambios al módulo.
- **Shorts:** el gancho, la etiqueta de Herbert y la trampa de ver el futuro (39–43 s).

- **Final cortado en español (lo oyó el usuario tras la entrega):** en la primera frase, «a propósito» suena «a
  propósi»: ZONOS3 se comió la última sílaba. [Supuesto] pasa con el ritmo `igualar` en el tope (21 bytes/s): la frase
  española no cabe en lo que dura la inglesa y el motor corta. El control de la voz no lo vio, porque Whisper completa la
  palabra por el contexto y `misma()` la da por buena. El usuario prefirió no rehacer el 44 («déjalo»), pero hay que
  tenerlo en cuenta en el 45.

Pendiente para el próximo: borrar los fotogramas del 44 al empezar; mirar los subtítulos españoles con el ritmo nuevo
antes del control; si se toca el 44, sincronizar escenas1/4/5.py con sus html antes de regenerar. **Finales cortados en
español (regla del usuario para el 45):** antes de locutar, probar con ZONOS3 la frase 1 del 44 a 21, 19 y 17 bytes/s para
saber si es el ritmo; añadir a `problemas()` un control del final de cada clip (la última palabra que oye Whisper tiene que
coincidir entera, y el clip no puede acabar en seco con energía alta en sus últimos 40 ms); si falla, otra toma y luego
menos ritmo. Escuchar o medir el final de cada frase española antes de entregar, empezando por el gancho.

**Cambio de canon (el usuario, 21/11/2026, tras el final cortado):** «reduce la velocidad a como estaba antes, en ambos
idiomas»: desde el 45, inglés a 0,95 y español sin `ritmo` (su velocidad natural), como en el 43. Las pausas cortas del 44
se mantienen. Con el español más lento pueden volver huecos de silencio donde la frase española sea más corta que la
inglesa: medirlos y decírselo.

## Episodio 45 · Victor von Doom: el villano que solo quería recuperar a su madre (21/11/2026)

- **La causa del final cortado (el «propósi(to)» del 44):** ZONOS3 genera como mucho 450 tramas (~29 s) por omisión y
  corta ahí SIN avisar (eos_frame=-1). En la primera voz del 45 se perdió el final de 13 de 39 párrafos españoles. Arreglo
  en `locutar_frases.py`: `--max 1500` y error si no hay EOS; clave de caché nueva (z3m). El control nuevo del final
  (última palabra entera y cola sin energía) se queda. [Probable] el 44 publicado tiene más párrafos largos cortados.
- **Narración (el usuario, tres rondas):** «frases cortas, afirmaciones rápidas… parecen de robot». No era la longitud de
  las oraciones sino ENCADENAR HECHOS (seis en una oración, aunque vayan con «y» y «así que»). Un momento por párrafo,
  contado desde dentro, a lo Farid; regla en GUIA-NARRATIVA. Episodios más largos: 19:16 con el acto de los enemigos
  (pedido por el usuario «por más que se alargue»).
- **Ritmo:** vuelta a la velocidad del 43 en los dos idiomas (inglés 0,95, español sin ritmo forzado), pedido por el
  usuario tras el final cortado. Con el arreglo de --max, el ritmo no era la causa.
- **Verificación con la web, no de memoria** (el usuario: «las comprobaciones que salgan de la web, valida bien todo»):
  al validar en la web salieron 5 detalles que los agentes habían dado por buenos de memoria (la habitación de Reed,
  Boris, Triumph and Torment —Cynthia se niega—, quién pregunta en Secret Wars, Doomquest). Pide a los escépticos que
  digan qué comprobaron en la web y qué de memoria, y valida lo segundo.
- **Pronunciación española:** probadas con ZONOS3 + Whisper en una frase de prueba; solo se reescriben las que fallan
  tal cual (Doomsday, Werner, Secret Wars, Latveria). Escritas «a la mexicana», otras (Víctor fon Dum, Téser) se oían peor.
- **Nombres de México:** «la Mole» (no «la Cosa»), «la Antorcha Humana», «la Mujer Invisible». La Mole con cuerpo ancho
  (moleVD): la de antes se veía flaca.
- **Música:** el «tin tin tin» es siempre una celesta (papel «color»); la mezcla, ratio 2,5: la música +3,7 dB bajo la voz
  (elegida de oído, muestras en inglés y en español). 1–3 dB no se distinguen de oído: las muestras, con diferencias de
  3–9 dB.
- **Decorados de episodios de películas:** el borrador de escenas usó decorados de do-comun.js (el laboratorio retro y el
  consejo de héroes de las películas); la calidad los cambió. Para el próximo: decir en el canon qué decorados de otros
  episodios están prohibidos.
- **Calidad:** 221 planos, 88 suspensos → 0. 35 agentes, 6,7 M de tokens, 2 h 49 min. Muchos agentes editaron el html: los
  módulos de borrador ya no coinciden con las escenas; NO regenerar con --pisar sin pasar los cambios.
- **Contenedor reiniciado:** se perdieron build/, la caché de la voz y el entorno; reinstalado (FluidSynth con
  apt-get update) en ~15 min.

Pendiente para el próximo: borrar los fotogramas del 45 al empezar; en el canon de las escenas, la lista de decorados de
otros episodios prohibidos; escépticos que separen web y memoria; revisar si el usuario quiere rehacer párrafos cortados
del 44.
