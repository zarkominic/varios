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

### Fallos de calidad por tipo

| Tipo | Ep. 13 | Ep. 14 |
|---|---|---|
| Orden de dibujo / algo que flota | 20 | 14 |
| Composición repetida | 13 | 14 |
| Algo no se lee | 14 | 13 |
| Brazo o mano | 11 | 11 |
| Quieto o sin vida | 14 | 7 |
| Liso o poco detalle | 10 | 4 |
| Letras en pantalla | 4 | 0 |
| Zona de Atom o barra del año | 4 | 2 |
| **Total** | **96** | **65** |

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
- Si el usuario aprueba la pose de «sostener», medir si bajan los fallos de brazo o mano.
- Liberar disco al empezar (paso 0) con el cálculo nuevo, no a mitad del render.
