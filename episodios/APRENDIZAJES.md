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

### Fallos de calidad por tipo

| Tipo | Ep. 13 | Ep. 14 | Ep. 15 |
|---|---|---|---|
| Orden de dibujo / algo que flota | 20 | 14 | 25 |
| Composición repetida | 13 | 14 | 16 |
| Algo no se lee | 14 | 13 | 17 |
| Brazo o mano | 11 | 11 | 7 |
| Quieto o sin vida | 14 | 7 | 8 |
| Liso o poco detalle | 10 | 4 | 9 |
| Letras en pantalla | 4 | 0 | 2 |
| Zona de Atom o barra del año | 4 | 2 | 11 |
| **Total** | **96** | **65** | **107** (12 sin tipo) |

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

## Próximos temas (decididos por el usuario)

- **Episodio 16: LucasArts** (29/10/2026). Un homenaje a la mejor época de los juegos de PC de LucasArts: Día del
  Tentáculo, Monkey Island, Grim Fandango, Sam & Max (X-Wing, de pasada). Su arte, su forma de jugar y datos curiosos.
  **Nada de controversias ni de cómo les fue comercialmente** (palabras del usuario). Sin sprites, capturas, logos ni
  música de los juegos: homenaje dibujado por nosotros. Idea propuesta: el vídeo como una aventura gráfica (Atom dentro,
  línea de verbos y cursor); el gancho, «en estos juegos no podías morir»; el hilo, el secreto de Monkey Island.
- **Después, los archivos OVNI del gobierno** (entregas de PURSUE desde mayo de 2026): con gancho comercial (los casos
  que el Pentágono no sabe explicar), sin repetir lo del episodio 10; mejor justo después de una entrega nueva.
