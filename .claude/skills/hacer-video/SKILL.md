---
name: hacer-video
description: Hace (o rehace) un episodio completo de ASK Atom tal cual se hizo el episodio 11 final, desde el tema hasta la entrega en el chat. Úsala siempre que el usuario diga «hacer video», «haz un video», «nuevo episodio» o «siguiente capítulo», pida rehacer o mejorar un episodio, o cualquier parte del proceso (tema, guion, voz, decorados, escenas, render, música, miniatura, publicación). El usuario no tiene que volver a explicar el nivel ni el proceso.
---

# Hacer video: un episodio de ASK Atom, tal cual el 11 final

**Antes de nada, lee:**
- `episodios/ESTANDAR.md` entero: el nivel, escrito en piedra;
- `episodios/GUIA-ESTILO.md`: cómo se dibuja;
- `episodios/GUIA-NARRATIVA.md`: cómo se cuenta y cómo se titula;
- `atomo/plato/VOZ.md`: el canon de la voz va arriba.

Mira con Read `episodios/referencia-ep11-1.jpg` y `-2.jpg`: son 15 planos del 11 final, y es el nivel mínimo de cada
plano. Las palabras del usuario: «todo excelente; pero sobre todo el detalle de las escenas y movimiento», y «no por
ahorrar tiempo bajarlo por ninguna circunstancia».

## Lo que no se negocia

- **Las tres pasadas con agentes:** movimiento, decorados y calidad (revisor, escéptico y pulido hasta que nada
  desentone). Se hacen con el workflow `.claude/workflows/hacer-video-pasadas.js`. La primera versión del 11 salió sin
  ellas («paredes vacías, cielos sin detalle… parece que te sigues ahorrando tiempo») y el usuario la rechazó.
- **Comparación lado a lado** de cada plano con la referencia. Si no aguanta, no pasa.
- **Si algo no cabe en el plazo, se pregunta.** No se baja el listón en silencio ni se propone acortar el episodio («eso
  no se cuestiona por el largo del video»).
- **El canon manda:** estilo pixel chibi, mano de 14 px, voces Kokoro `am_puck` 0,85 y `em_santa` 0,92, música
  `banda.cjs`, narración del 10 y del 11. No se cambia sin preguntar.
- **Solo herramientas gratis.**
- **Etiquetas honestas:** «Seguro» solo para lo comprobado con capturas o mediciones.

## Cuándo se para a preguntar

- El usuario aprueba **dos cosas**:
  - el **tema**, propuesto con datos;
  - el **guion**, con su presupuesto de horas.
- Después se produce **de corrido hasta la entrega**:
  - Al acabar cada bloque se informa en una línea, sin esperar respuesta.
  - Solo se para si algo obligaría a bajar el nivel, a tocar el canon o a borrar algo que no se puede regenerar.
  - No se mandan muestras intermedias si no las pide. La excepción es algo nuevo de verdad (otra voz, otro estilo): eso
    se enseña con una muestra antes.
- Si dice «hacer video» sin tema, se empieza por el paso 1. Si trae el tema, se comprueban sus datos (paso 1, corto) y
  se va al guion.
- El usuario no abre archivos del repositorio. Lo que tenga que leer o aprobar se le pega entero en el chat, y una imagen
  se le envía con SendUserFile. No describas una imagen como si la estuviera viendo si no se la has enviado.

## Variables

| Variable | Qué es |
|---|---|
| `SC` | Tu carpeta temporal (scratchpad); si no tienes, `${TMPDIR:-/tmp}/ask-atom-<ep>` |
| `VOZ` | La carpeta del entorno de voz (paso 0). **Cada llamada Bash empieza sin las variables de la anterior:** empieza cada orden que la use con `VOZ=$(bash atomo/herramientas/preparar-voz.sh) && …`, que responde al momento si ya está lista |
| `<ep>` | La clave del episodio (`ep12`) |
| `<pref>` | Su prefijo de dos letras (`th` fue el 11) |
| `<carpeta>` | Su carpeta en `episodios/` (`12-tema`) |

Todo se ejecuta desde la raíz del repositorio, salvo lo que diga `cd atomo`.

## El proceso

### 0. Arranque

1. `bash atomo/herramientas/comprobar-entorno.sh`. Comprueba:
   - node, Playwright con Chromium, ffmpeg completo, Python, Pillow y las fuentes;
   - la red hasta GitHub, Hugging Face y Google Fonts (de ahí salen las fuentes de los números del canon);
   - el disco: un episodio necesita unos 6 GB.

   Si falta algo, arréglalo antes de empezar o díselo al usuario.
2. `bash atomo/herramientas/preparar-voz.sh`. Tarda unos 6 minutos en un contenedor nuevo y nada si ya está; escribe la
   carpeta (por defecto `~/.cache/ask-atom/voz`, que es donde la busca `producir.sh`).
3. La rama de trabajo: la que diga la sesión. Commit y push al acabar cada bloque.

### 1. Tema

1. Busca con WebSearch noticias de EE. UU. de las últimas semanas: ciencia, salud, historia, tecnología, misterios,
   actualidad. El mercado es EE. UU., pero el tema tiene que interesar fuera.
2. Propón de 3 a 5 candidatos, ordenados por encaje con ASK Atom. Cada uno con:
   - una historia con personas, lugares y giros;
   - un porqué que explicar (el ángulo de ASK Atom);
   - nada morboso;
   - los datos etiquetados, los riesgos y tu recomendación.
3. Pide UN solo CSV de Google Trends que compare los candidatos en la misma gráfica. Si no, cada curva va de 0 a 100 por
   su cuenta y no se pueden comparar (en el 11 hicieron falta cinco subidas). Las instrucciones, al pie de la letra:
   1. En trends.google.com → Explorar, escribe el primer candidato.
   2. Pulsa «+ Comparar» y añade los demás, y también el nombre más buscado de cada uno: la persona, la película. En el
      11, «Elizabeth Holmes» se buscaba más que «Theranos».
   3. Elige «Estados Unidos» y «Últimos 90 días», y descarga el CSV de esa gráfica.
4. Guarda los CSV en `episodios/tendencias/` y haz commit.
5. Recomienda con los números. **Espera a que el usuario elija.**

### 2. Guion

1. Escribe `episodios/<carpeta>/guion.md` como el del 11 (`episodios/11-theranos/guion.md`). `hacer_guion.py` depende de
   su formato:
   - Cabecera:
     - `# Episodio N · Tema: subtítulo`;
     - **Estado** (versión y fecha);
     - **Por qué este tema** (las cifras de Trends);
     - **Formato**;
     - **Duración objetivo**: frases, palabras en inglés y minutos (palabras ÷ 150);
     - **Publicar**.
   - `## Cómo se cuenta` y `## Decorados (N)`. Las tablas que no son frases llevan la primera celda en **negrita** o
     empiezan por «Decorado».
   - Los actos, como `## N · Título`. Cada frase es una fila `| ES | EN |`, en orden.
   - `## Datos`, con las fuentes. Todo lo que va detrás de esta línea no se locuta.
2. Reglas del texto (`GUIA-NARRATIVA.md`):
   - un episodio completo de 8:30–9:30, es decir, 1.300–1.400 palabras en inglés;
   - el gancho primero y luego la frase de Atom;
   - prosa narrada, en escenas, con el ángulo de ASK Atom;
   - personas reales solo con hechos;
   - de 6 a 8 gags con objetos;
   - los años en cifras y las demás cifras en palabras;
   - el título con el tema o la persona delante.
3. Cada dato dudoso, márcalo «[comprobar antes de locutar]» y resuélvelo con WebSearch antes del paso 3. Si no se
   confirma, reescribe la frase con lo comprobado.
4. **Preséntalo en el chat**, en este orden:
   1. lo incómodo, primero;
   2. el commit, las frases, las palabras en inglés y la duración estimada [Probable];
   3. el título de trabajo y la alternativa A/B;
   4. **el texto en español entero**, acto por acto (**0 · El gancho**…), con una frase por línea;
   5. los gags;
   6. la tabla del presupuesto de horas (abajo);
   7. lo que has cuidado y lo que hay que decidir.
5. **Espera la aprobación.** Lo normal es una o dos rondas.

### 3. Datos del guion y voz (en segundo plano)

1. Copia `plan.py` y `hacer_guion.py` del 11 a `episodios/<carpeta>/`. Cambia solo esto:
   - en `plan.py`:
     - el docstring con los decorados;
     - la lista `E` (id, cartela, frases, marcas, guion visual, ánimo de la música y golpes);
     - el assert del número de frases;
   - en `hacer_guion.py`:
     - la línea `Uso:`;
     - `PREVIO` (las fechas con día y las cifras que no son años, en los dos idiomas);
     - `PRONUNCIA['es']` (los nombres propios escritos como se dicen, primero los compuestos);
     - `numero`, `estado` y `titulo`.
2. Genera, en este orden (`hacer_guion.py` lee `escenas.json`):
   `python3 episodios/<carpeta>/plan.py && python3 episodios/<carpeta>/hacer_guion.py`.
3. Lanza la locución con Bash en segundo plano (`run_in_background`, `timeout` 3600000). Tarda unos 40 minutos y deja
   los clips en caché. Mientras tanto, sigue con los pasos 4–6:

   ```
   VOZ=$(bash atomo/herramientas/preparar-voz.sh) && cd atomo && $VOZ/venv/bin/python herramientas/locutar_frases.py ../episodios/<carpeta>/guion.json build/largo/<ep> $VOZ/modelos --marcas plato/escenas/marcas-<ep>.json
   ```
4. Hasta que llegue, las escenas usan unas marcas provisionales. Las escribe
   `python3 atomo/herramientas/marcas-provisionales.py episodios/<carpeta>/guion.json atomo/plato/escenas/marcas-<ep>.json`
   (en el 11 se desvió un +4,6 % en total). Se pueden subir con el resto: la locución las sustituye por las reales.
5. Al terminar, la voz vale si el log acaba en «total … clips con fallos y N para escuchar». Lee
   `build/largo/<ep>/informe.json`: es una lista con `problemas` y `avisos` por clip. Que el control lea a la inglesa los
   nombres escritos a la española es normal. Apunta las frases dudosas para que el usuario las escuche.

### 4. Reparto

En `atomo/plato/kits/pixel-chibi.js`, detrás del último `Object.assign(ELENCO_CHIBI, …)`:
- añade `export const ELENCO_<PREF> = {…}`, con una entrada y un comentario (ropa, pelo) por personaje;
- reutiliza cabezas y cuerpos (`CAB_CORTO`, `CAB_CALVO`, `CUERPO_EUROPEO`…) y cambia la paleta (`CLARA()`/`MORENA()`,
  las letras de pelo y ropa). Así se hicieron los 15 personajes del 11;
- únelo con `Object.assign(ELENCO_CHIBI, ELENCO_<PREF>)`.

El pelo nunca tapa la cara.

### 5. Decorados: la primera versión, tuya

En `atomo/plato/escenas/<pref>-comun.js`:
- copia la fontanería de las primeras ~60 líneas de `th-comun.js`: imports, paleta `C`, `preparar(id)`, `rodar`,
  `momento`, `conAtomGrande`;
- escribe todos los decorados de la tabla del guion, con una función por decorado y sus opciones `o.*` para luz, estado y
  variantes;
- los insertos de objetos van siempre sobre su decorado o sobre una mesa con cosas;
- las piezas pequeñas.

Captúralos en una página de prueba y arregla lo evidente. Ya en esta versión: nada liso, todo el lienzo pintado, lo de
fuera recortado a ventanas y puertas, y los fondos fijos con `const prev = R.usar(b); …; R.usar(prev)`.

### 6. Escenas: el primer borrador

1. Escribe los módulos `episodios/<carpeta>/borrador-escenas/escenas1.py`… con `E[id] = (título, cabecera, cuerpo)`. El
   ejemplo es `episodios/11-theranos/borrador-escenas/`.
2. Genéralas con `python3 atomo/herramientas/generar-escenas.py <pref> <ep> episodios/<carpeta>/borrador-escenas/*.py`.
3. Reglas de las escenas:
   - un plano cada 4–7 s, con su propia composición, cortado en la palabra que toca (`en('marca', fracción)`);
   - cartelas de año y la barra del año;
   - efectos `[t, 'receta']`, solo con recetas de `NIVEL`;
   - los gags.
4. Con la voz real (paso 3), vuelve a generar con `--pisar` y mide: `node atomo/herramientas/medir-planos.mjs <ep>` («!»
   si pasa de 7,2 s, «<» si baja de 3,5 s). Sin `--pisar`, el generador no toca una escena que ya existe.
5. Commit. **Desde aquí el generador ya no se usa:** las escenas se editan en su `.html`.

### 7–9. Las tres pasadas, con el workflow guardado

**Cómo se llama:** `Workflow({ name: 'hacer-video-pasadas', args: {…} })`. Si no lo encuentra porque se creó a mitad de
sesión, usa `scriptPath: '<raíz del repo>/.claude/workflows/hacer-video-pasadas.js'`.

Todos los `args` llevan `paso`, `ep`, `pref`, `carpeta`, `tema` y `sc`. Cada workflow ejecuta 2 agentes a la vez. Para
ir más rápido, reparte los grupos en 3 llamadas a la vez, con grupos distintos.

**7. Movimiento** (unas 2 h):
- `paso: 'movimiento'`, con `grupos: [{ ids: ['xx-gancho', 'xx-vuelta', 'xx-hola'] }, …]`: unos 8 grupos de 2–5
  escenas;
- cada agente da a cada plano una acción con propósito, vida de fondo, sincronía y efectos;
- **guarda sus `avisos`**: las posiciones de los decorados de las que dependen las escenas, los fallos de decorado que
  vieron y los «fondo local»;
- haz commit al acabar.

**8. Decorados** (1–1,5 h con 3 workflows):
- reparte las funciones de `<pref>-comun.js` en unos 9 grupos (A, B, C…) de 4–7;
- `paso: 'decorados'`, con
  `grupos: [{ g: 'A', fns: [...], indicaciones: 'FALLO: … (de los avisos y de lo que has visto)', dependencias: 'posiciones que usan las escenas (de los avisos)' }]`;
- cada agente trabaja en su copia `_tmp_<G>/` (ya en `.gitignore`) y la deja probada;
- **integra cada workflow en cuanto termine**:
  1. ejecuta la orden `integrar` que devuelve;
  2. lee sus `AVISO` y `NO ENCONTRADAS`, y las notas de `geometria`;
  3. `cp atomo/plato/escenas/<pref>-comun.js $SC/chk.mjs && node --check $SC/chk.mjs`;
  4. saca las hojas de las escenas afectadas y míralas;
  5. haz commit («<Ep>: decorados al nivel del 11 (lote N): …»);
- cuando estén los tres, `grep -n 'PARCHE DECORADO' atomo/plato/escenas/<pref>-*.html` y quita los parches que ya no
  hagan falta;
- borra las copias `_tmp_*` integradas, con su ruta literal, una a una.

**9. Calidad** (unas 3–4 h):
1. **Tu revisión primero.** Saca las hojas de todas las escenas:
   `node atomo/herramientas/medir-planos.mjs <ep> --hoja $SC/rev`. Cada escena tiene una fila por plano (inicio, centro
   y final, a 640 × 360) y salen como mucho 5 planos por imagen. Ninguna imagen de revisión pasa de 2000 px, porque Read
   las reduce. Míralas todas junto a la referencia, y primero los «fondo local».

   Las hojas no ven los fundidos entre planos, así que compruébalos aparte con
   `node atomo/herramientas/medir-planos.mjs <ep> --fundidos`:
   - **ROTO** (el 10 % del cuadro o más, con negro o restos de otro plano): sale con 1 y hay que arreglarlo;
   - **REVISAR** (3–10 %): suele ser algo que se anima durante el fundido, pero se mira a ojo (`capturar.mjs` en el corte
     +0,17 s).

   En el 11 entregado había fundidos ROTOS en {N_ESCENAS} escenas y nadie los vio.
2. Por cada plano por debajo, apunta un fallo concreto, con el formato del workflow:
   `{ escena, plano, nota, fallos: [...], origen: 'escena' | 'decorado', funcion, encargo: 'qué hay hoy, qué debe haber y qué se mantiene' }`.
3. Lanza `paso: 'calidad'`, con `lotes` de 4–6 escenas que cubran todas, `fallos` (tu lista) y `rondas: 3`. El workflow
   hace esto:
   - pule tus fallos: primero, y solo, el agente de los decorados; luego uno por escena;
   - revisa con un revisor y un escéptico hasta que no quede nada o se acaben las rondas.
4. Si devuelve `aprobado: false`, lo que queda en `quedan` se arregla tú o se le dice al usuario. Nunca se entrega en
   silencio.
5. Commit.

### 10. Miniatura

`<pref>-miniatura.html`, copiada de `th-miniatura.html` y hecha después de las pasadas (usa los decorados por su nombre).
Es la imagen más trabajada del episodio:
- dos decorados de verdad, partidos por una diagonal (antes y después, promesa y realidad);
- el protagonista y uno o dos personajes con el sprite chibi al doble;
- una cifra o un año grande, y un símbolo;
- sin palabras;
- lo que promete el título.

La captura y el escalado los hace `producir.sh`. **Mírala** antes de enviarla.

### 11. Ficha de publicación

Copia `episodios/11-theranos/publicacion.md` y rellénala con la misma estructura mientras se renderiza. Deja los huecos
`{DURACION}`, `{CAPITULOS_EN}`, `{CAPITULOS_ES}` y `{AVISOS}`:
- **Capítulos:** el `inicio` en `atomo/build/largo/<ep>/linea.json` de la primera escena de cada acto, en m:ss, desde
  0:00, con títulos cortos en los dos idiomas.
- **Títulos:** el tema o la persona delante, sin minutos, con la alternativa A/B.
- **Lo demás:** las descripciones completas en los dos idiomas con las fuentes, las etiquetas, los pasos para subirlo y lo
  que hay que revisar antes de publicar (las frases dudosas de `informe.json`).

### 12. Producción y control

Lanza en UNA orden Bash con `run_in_background` y `timeout` 3600000. En el 11, el render tardó 10–16 min y todo
junto, unos 30:

```
bash atomo/herramientas/producir.sh <ep> <carpeta> <pref>
```

`producir.sh` hace esto, y se para con un error si algo falla:
- **fundidos**: con `medir-planos.mjs --fundidos`; con uno roto no se renderiza;
- **render**: de TODO el episodio, para que no se cuele ningún fotograma ni efecto de una versión vieja de las escenas.
  Antes comprueba el disco (6 GB libres, o 2 GB si ya hay fotogramas que sobrescribir) y después que están todos los
  fotogramas. Con `--faltan` solo dibuja lo que falte: es para seguir un render que se cortó sin que nada cambiara
  entre medias;
- **efectos** y **banda**;
- **montaje**: comprueba que el mp4 y el mp3 son de ahora;
- **miniatura**;
- **control**:
  - el sonido, con `medir-sonido.py`: −14 LUFS, el pico, la densidad de efectos en las dos pistas y la música en cada
    cartela;
  - los subtítulos;
  - la tira de 20 fotogramas, en `build/salida/<ep>-tira.jpg`.

Si falla a medias, sigue desde ese paso con `--desde render|efectos|banda|montar|miniatura|control`. **Mira la tira y la
miniatura.** Rellena los huecos de la ficha.

### 13. Commit y push

Todo lo del repositorio. `build/` no va a git.

### 14. Entrega en el chat

1. Envía los seis archivos con SendUserFile: vídeo, pista en español, miniatura, los dos SRT y la ficha.
2. Pega en la respuesta, en este orden:
   1. «Tienes que verlo y escucharlo tú: yo no oigo el vídeo», en una línea;
   2. qué cambió, si es una revisión;
   3. **Medido [Seguro]:** duración; LUFS y pico de las dos pistas; efectos (porcentaje del tiempo y dB bajo la voz);
      la peor caída de la música en una cartela; subtítulos (cuántos y cuántos fuera de norma). Todo sale de `producir.sh`;
   4. disco: qué se borró, si se borró algo;
   5. los títulos con el A/B;
   6. las descripciones completas en inglés y en español, con capítulos y fuentes;
   7. las etiquetas;
   8. los pasos para subirlo;
   9. lo que hay que revisar antes de publicar;
   10. las horas reales frente a las del presupuesto.

## Presupuesto de horas

Son horas de reloj de la sesión, calibradas con el 11 (26 escenas, 107 planos, ~50 decorados). Van siempre con
[Probable].

| Bloque | Horas |
|---|---|
| Tema y guion | 1–2 h, más las rondas del usuario |
| Voz | ~40 min, en segundo plano |
| Reparto, decorados y escenas, primer borrador | ~1 h |
| Pasada de movimiento | ~2 h |
| Pasada de decorados e integración | 1–1,5 h |
| Calidad: tu revisión, revisor, escéptico y pulido | 3–4 h |
| Producción y control (render 10–16 min) | ~45 min |
| Miniatura, ficha y entrega | ~1 h |
| **Total** | **unas 10–12 h** |

## Trampas conocidas

- **Esperar a un proceso:**
  - Todo lo largo se lanza en UNA orden Bash con `run_in_background` y `timeout`, y se espera al aviso.
  - Nunca `nohup … &` con un bucle de `pgrep -f`: el bucle se encuentra a sí mismo y no acaba (en el 11 se perdieron
    70 min).
  - Ni `pkill -f` (mata su propia shell) ni `sleep N; …` (el arnés lo bloquea).
- **Una interrupción del usuario mata los workflows en marcha, sin aviso.**
  - Después de cualquier interrupción, mira `ls -la --time-style=+%H:%M <Transcript dir>/agent-*.jsonl; date +%H:%M`.
    Si no crecen desde hace más de 10 min, han muerto.
  - Nunca le digas al usuario que «siguen» sin comprobarlo (en el 11 costó 3 h).
  - Relánzalos con `resumeFromRunId`. Solo funciona en la misma sesión y con la ejecución anterior parada: lo terminado
    sale de la caché. Tras un reinicio, o desde otra sesión, relanza solo los grupos que faltan; sus copias `_tmp_`
    siguen ahí y los agentes parten de ellas.
- **El disco lleno falla sin avisar.** La voz da «LibsndfileError: System error», node muere sin mensaje y una cadena con
  `;` termina con 0. Por eso `producir.sh` encadena con `set -e` y comprueba los fotogramas y las fechas. Para borrar:
  - solo lo que se puede regenerar (cachés de pip y npm, modelos que no usa el canon, tus capturas viejas);
  - con rutas literales, una carpeta por orden, sin comodines ni variables;
  - si el control de seguridad bloquea algo, no lo esquives: pregunta.
- **Un contenedor nuevo empieza vacío:** `build/`, el entorno de voz y `node_modules` no están en git. Repite el paso 0.
  Lo de la sesión anterior solo existe si se subió.
- **`R.rect` con x1 < x0 no pinta nada,** y no avisa.
- **Los fundidos entre planos:**
  - un decorado que deja de pintar un trozo, o que cambia de búfer con `R.usar()` a secas, deja negro o restos en el
    fundido;
  - la hoja de revisión no los ve: los comprueba `medir-planos.mjs --fundidos` (y `producir.sh` antes de renderizar);
  - los kits tienen `R.buf` vivo desde `bf5a41a`: antes, todo lo que se pintaba con `R.buf` caía fuera del fundido.
- **Manos grandes y primeros planos rompen el canon.** Usa la mano de 14 px y los insertos de objetos.
- **La música no se toca sin preguntar.** `banda.cjs` ya hace música continua; si algo suena raro, se mide con
  `medir-sonido.py` y se pregunta.
- **Si el usuario pregunta «¿por qué…?», respóndele** y no toques nada. En el 11 se deshizo `banda.cjs` sin que nadie lo
  pidiera y tuvo que repetir la pregunta.
- **Un vídeo ya subido a YouTube no se vuelve a renderizar entero.** El arreglo se ajusta a lo publicado: por ejemplo,
  solo una pista en español nueva, con sus tiempos.
- **Todo arreglo de sonido va a las dos pistas,** y se mide en las dos.
