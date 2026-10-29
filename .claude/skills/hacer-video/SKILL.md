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
- **La banda de cada episodio la decide el tema** (desde el 13, por petición del usuario: «la música de fondo se está
  repitiendo de capítulo a capítulo… no todo es suspenso»; «la banda depende del tema que definamos y el guion»). Se
  diseña con el guion (paso 2.4) y se aprueba con él, con su muestra.
- **Solo herramientas gratis.**
- **Etiquetas honestas:** «Seguro» solo para lo comprobado con capturas o mediciones.

## Cuándo se para a preguntar

- El usuario aprueba **dos cosas**:
  - el **tema**, propuesto con datos;
  - el **guion**, con su banda sonora (y su muestra) y su presupuesto de horas.
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
| `<SC>` | Tu carpeta temporal (scratchpad); si no tienes, `${TMPDIR:-/tmp}/ask-atom-<ep>`. Es un marcador, como `<ep>`: escribe la ruta entera en cada orden |
| `VOZ` | La carpeta del entorno de voz (paso 0). **Cada llamada Bash empieza sin las variables de la anterior:** empieza cada orden que la use con `VOZ=$(bash atomo/herramientas/preparar-voz.sh) && …`, que responde al momento si ya está lista |
| `<ep>` | La clave del episodio (`ep12`) |
| `<pref>` | Su prefijo de dos letras (`th` fue el 11) |
| `<carpeta>` | Su carpeta en `episodios/` (`12-tema`) |

Todo se ejecuta desde la raíz del repositorio, salvo lo que diga `cd atomo`.

## El proceso

### 0. Arranque

0. Lee `episodios/APRENDIZAJES.md`: el historial de cifras y, sobre todo, el «Pendiente para el próximo» del último
   episodio. Lo que diga, se vigila o se prueba en este (y se mide en el paso 15).
1. `bash atomo/herramientas/comprobar-entorno.sh`. Comprueba:
   - node, Playwright con Chromium, ffmpeg completo, Python, Pillow y las fuentes;
   - la red hasta GitHub, Hugging Face y Google Fonts (de ahí salen las fuentes de los números del canon);
   - el disco: al menos **10 GB libres** (6 para el render, 1,5 para la voz si aún no está y margen para las capturas
     de las pasadas; en el 12 hubo que parar dos veces a liberar sitio a mitad de la producción, y en el 14 el render
     murió con el disco lleno: un episodio de 8:30 son ~15.000 fotogramas y ~7 GB). Si no los hay, libera ahora lo que
     se pueda regenerar (ver «Trampas conocidas») y, si hace falta, pregunta al usuario qué fotogramas de episodios ya
     publicados se pueden borrar; no a mitad del render. **Regla aprobada por el usuario (29/10/2026):** los fotogramas
     (`atomo/build/largo/<ep>/fotos`) del episodio anterior se borran al empezar el siguiente si ese ya está publicado,
     sin volver a preguntar (con su ruta literal); los de otros episodios, preguntando. **Cuando el usuario pide un
     episodio nuevo, el anterior ya está publicado** (palabras del usuario, 29/10/2026): no se le pregunta.

   Si falta algo, arréglalo antes de empezar o díselo al usuario.
2. `bash atomo/herramientas/preparar-voz.sh`. Tarda unos 6 minutos en un contenedor nuevo y nada si ya está; escribe la
   carpeta (por defecto `~/.cache/ask-atom/voz`, que es donde la busca `producir.sh`). Tiene que ser una carpeta de
   verdad, nunca un enlace a tu carpeta temporal: en el 12 lo era, se borró al hacer sitio y `producir.sh` se paró.
3. La rama de trabajo: la que diga la sesión; si no dice ninguna, crea `episodio-<ep>`. Commit al acabar cada bloque, y
   push si hay remoto con permiso (si no, sigue con commits locales y díselo al usuario en una línea).

### 1. Tema

1. Mira `episodios/tendencias/resumen.md` (lo actualiza `python3 atomo/herramientas/tendencias.py`, con el RSS de Google
   Trends de EE. UU.): da ideas, pero en el 11 no decidió nada. Después, busca con WebSearch noticias de EE. UU. de las últimas semanas: ciencia, salud, historia, tecnología, misterios,
   actualidad. El mercado es EE. UU., pero el tema tiene que interesar fuera.
2. Propón de 3 a 5 candidatos, ordenados por encaje con ASK Atom. Cada uno con:
   - una historia con personas, lugares y giros;
   - un porqué que explicar (el ángulo de ASK Atom);
   - nada morboso;
   - los datos etiquetados, los riesgos y tu recomendación;
   - **el gancho comercial** (regla del usuario, 29/10/2026: «hay que pensar siempre en el gancho comercial, no solo en
     tratar de explicar todo como una calculadora»): el título y la miniatura que se pinchan, y la pregunta o el misterio
     que engancha en los primeros segundos. Siempre cierto dentro del vídeo: un título que promete lo que el vídeo no da
     castiga la retención.
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
   - `## Cómo se cuenta` y `## Decorados (N)`. `hacer_guion.py` toma como frase toda fila de tabla de antes de `## Datos`,
     salvo las cabeceras `| ES | EN |`, los separadores `| --- |`, las filas cuya primera celda es exactamente `Decorado`
     y las que empiezan por `**`. Así que cualquier otra tabla (gags, presupuesto, decorados) lleva la primera celda en
     **negrita**. Comprueba después que `guion.json` tiene el número de frases que esperas.
   - Los actos, como `## N · Título`. Cada frase es una fila `| ES | EN |`, en orden.
   - `## Datos`, con las fuentes. Todo lo que va detrás de esta línea no se locuta.
2. Reglas del texto (`GUIA-NARRATIVA.md`):
   - un episodio completo de 8:30–9:30, es decir, 1.300–1.400 palabras en inglés;
   - el gancho primero y luego la frase de Atom;
   - prosa narrada, en escenas, con el ángulo de ASK Atom;
   - personas reales solo con hechos;
   - de 6 a 8 gags con objetos;
   - los años en cifras y las demás cifras en palabras;
   - el título con el tema o la persona delante, y con gancho comercial: que se pinche (un misterio, un giro, una cifra
     que sorprende, algo que no se sabía), no una ficha («cómo X llegó a ser Y» es de calculadora). El gancho del texto,
     el título y la miniatura cuentan lo mismo, y el vídeo lo cumple;
   - la explicación de ASK Atom, en una o dos frases por idea, dentro de la historia, nunca como una clase.
3. Cada dato dudoso, márcalo «[comprobar antes de locutar]» y resuélvelo con WebSearch antes del paso 3. Si no se
   confirma, reescribe la frase con lo comprobado. Antes de presentarlo, verifica el guion con **3 agentes escépticos,
   no más** (en el 12, ocho gastaron 1,2 M de tokens y casi todo lo útil salió de tres bloques): uno para la historia y
   las personas (anécdotas, leyendas, citas: lo que más falla), uno para la ciencia y las cifras, y uno para la actualidad
   y las fechas. Cada uno intenta tumbar los datos con fuentes primarias y devuelve solo lo que falla, con la frase
   corregida en los dos idiomas.
4. **La banda sonora del episodio**, a partir del tema y de lo que cuenta cada acto (no es una plantilla: dos
   episodios no suenan igual):
   - **Tono y modo** (`banda.tono`: do, re, mi, fa, sol, la, si, con # o b; `banda.modo`: mayor, menor, dorico,
     mixolidio o lidio). Distintos de los de los dos episodios anteriores (mira sus `escenas.json`; sin «banda», fue La
     menor). Un tema luminoso o de ciencia y asombro tira a mayor o lidio; uno de aventura, a mixolidio o dórico; uno
     oscuro, a menor.
   - **Tempo** (`banda.tempo`, 70–130) según el pulso de la historia.
   - **Motivo**: 8 notas en semitonos sobre la tónica (`banda.motivo`), propio del episodio, que se reconozca. Suena en
     la caja de música del misterio, en la marimba de la curiosidad y en las cartelas.
   - **Un ánimo por escena**, según lo que cuenta: `suspense`, `misterio`, `intriga`, `cierre` (los de siempre) y los
     nuevos `asombro`, `aventura`, `curiosidad`, `calma`, `epico` y `ternura` (qué es cada uno: la cabecera de
     `atomo/herramientas/banda.cjs`). Suspense, misterio e intriga juntos, como mucho un tercio del episodio salvo que
     el tema sea de misterio de verdad; al menos cuatro ánimos distintos; los golpes, solo en las dos o tres revelaciones.
   - En el guion va una tabla `| **Acto** | **Ánimo** | **Por qué** |` (primera celda en negrita) y la línea de la banda.
   - **La muestra:** con `plan.py` ya escrito (paso 3.1, que se puede adelantar), saca
     `python3 atomo/herramientas/muestra-banda.py episodios/<carpeta>/escenas.json <SC>/muestra-banda.mp3`
     (unos 12 s por ánimo, en el orden del episodio) y envíala con SendUserFile junto al guion. Yo no oigo: el que
     aprueba cómo suena es el usuario.
5. **Preséntalo en el chat**, en este orden:
   1. lo incómodo, primero;
   2. el commit, las frases, las palabras en inglés y la duración estimada [Probable];
   3. el título de trabajo y la alternativa A/B;
   4. **el texto en español entero**, acto por acto (**0 · El gancho**…), con una frase por línea;
   5. los gags;
   6. la banda: tono, modo, tempo, motivo, el ánimo de cada acto y por qué, con la muestra adjunta;
   7. la tabla del presupuesto de horas, sacada de la de esta skill (abajo), no de la del guion del 11, que se hizo sin
      las pasadas;
   8. lo que has cuidado y lo que hay que decidir.
6. **Espera la aprobación.** Lo normal es una o dos rondas.

### 3. Datos del guion y voz (en segundo plano)

1. Copia `plan.py` y `hacer_guion.py` del 11 a `episodios/<carpeta>/`. Cambia solo esto:
   - en `plan.py`:
     - el docstring con los decorados;
     - la lista `E` (id, cartela, frases, marcas, guion visual, ánimo de la música y golpes);
     - `BANDA = {'tono': …, 'modo': …, 'tempo': …, 'motivo': […]}` y que el `json.dump` final escriba también
       `'banda': BANDA` en `escenas.json` (sin ella, `banda.cjs` suena como en el 10–12);
     - el assert del número de frases;
   - en `hacer_guion.py`:
     - la línea `Uso:`;
     - `PREVIO` (las fechas con día y las cifras que no son años, en los dos idiomas);
     - `PRONUNCIA['es']` (los nombres propios escritos como se dicen, primero los compuestos). Empieza por lo que ya
       se corrigió en otros episodios: `python3 atomo/herramientas/pronuncia.py episodios/<carpeta>/guion.md` lo busca
       en el guion y lo deja listo para pegar (míralo: alguna entrada es el arreglo de una frase concreta);
     - `numero`, `estado` y `titulo`.
2. Genera, en este orden (`hacer_guion.py` lee `escenas.json`):
   `python3 episodios/<carpeta>/plan.py && python3 episodios/<carpeta>/hacer_guion.py`.
3. Escribe unas marcas provisionales, para escribir y probar las escenas mientras se locuta:
   `python3 atomo/herramientas/marcas-provisionales.py episodios/<carpeta>/guion.json atomo/plato/escenas/marcas-<ep>.json`
   (en el 11 se desvió un +4,6 % en total). Se pueden subir con el resto. Hazlo ANTES de lanzar la voz: la locución las
   sustituye por las reales al acabar, y la herramienta no pisa unas marcas reales.
4. Lanza la locución con Bash en segundo plano (`run_in_background`, `timeout` 3600000). Tarda unos 40 minutos y deja
   los clips en caché. Mientras tanto, sigue con los pasos 4–6:

   ```
   VOZ=$(bash atomo/herramientas/preparar-voz.sh) && cd atomo && $VOZ/venv/bin/python herramientas/locutar_frases.py ../episodios/<carpeta>/guion.json build/largo/<ep> $VOZ/modelos --marcas plato/escenas/marcas-<ep>.json
   ```
5. Al terminar, la voz vale si el log acaba en «total … clips con fallos y N para escuchar». Lee
   `atomo/build/largo/<ep>/informe.json`: es una lista con `problemas` y `avisos` por clip. Que el control lea a la inglesa los
   nombres escritos a la española es normal. Apunta las frases dudosas para que el usuario las escuche. Cuando la voz
   quede bien, guarda las pronunciaciones nuevas para los siguientes:
   `python3 atomo/herramientas/pronuncia.py episodios/<carpeta>/guion.md --anadir`.

### 4. Reparto

En `atomo/plato/kits/pixel-chibi.js`, detrás del último `Object.assign(ELENCO_CHIBI, …)`:
- añade `export const ELENCO_<PREF> = {…}`, con una entrada y un comentario (ropa, pelo) por personaje;
- reutiliza cabezas y cuerpos (`CAB_CORTO`, `CAB_CALVO`, `CUERPO_EUROPEO`…) y cambia la paleta (`CLARA()`/`MORENA()`,
  las letras de pelo y ropa). Así se hicieron los 15 personajes del 11;
- únelo con `Object.assign(ELENCO_CHIBI, ELENCO_<PREF>)`.

El pelo nunca tapa la cara.

Antes de seguir, repasa el guion visual de `escenas.json` frase a frase y comprueba que cada persona que aparece tiene
su entrada (también de niño o de mayor, si sale con otra edad): en el 14 faltó Roosevelt de niño y lo avisó un agente.

### 5. Decorados: la primera versión, tuya

En `atomo/plato/escenas/<pref>-comun.js`:
- copia la fontanería de `th-comun.js`:
  - las primeras ~60 líneas: imports, paleta `C`, `conAtomGrande`, `preparar(id)`, `rodar`, `h` y `lerp`;
  - `momento`, que está más abajo (`grep -n "export const momento" atomo/plato/escenas/th-comun.js`);
  - de `ov-comun.js`, importa y vuelve a exportar `mano` y `brazo` (el brazo canónico, desde el 13), como hace
    `fa-comun.js`, para que las escenas los tengan como `T.mano` y `T.brazo`;
  - en `preparar()`, cambia `escena(id, 'ep11')` por `escena(id, '<ep>')` y los `tramosTiempo` de la barra del año por
    los de tu episodio (un tramo por época, con su color y su icono). Si no, las escenas cargan las marcas del 11;
- escribe todos los decorados de la tabla del guion, con una función por decorado y sus opciones `o.*` para luz, estado y
  variantes;
- los insertos de objetos van siempre sobre su decorado o sobre una mesa con cosas;
- las piezas pequeñas.

**Cada encuadre trae dos cámaras** (aprobado el 29/10/2026): la general y otra más cerca o desde otro ángulo
(`o.camara: 'cerca'` u otra opción en su cabecera), con el mismo detalle. Así las escenas no repiten encuadre ni tienen
que pintar su propio fondo, que es donde más fallaron el orden de dibujo, la zona de Atom y «algo que no se lee» en el 15.
Nunca a costa del detalle de la general.

Cada encuadre se prueba con un personaje chibi de pie, a la escala de las escenas, junto a lo que tendrá que tocar: en el
13 se añadió un escritorio en el que los personajes no encajaban y no sirvió.

Captúralos en una página de prueba y arregla lo evidente. Ya en esta versión: nada liso, todo el lienzo pintado, lo de
fuera recortado a ventanas y puertas, y los fondos fijos con `const prev = R.usar(b); …; R.usar(prev)`. Repasa «Los
siete fallos que más suspendieron en el 12» de `episodios/NIVEL-RESUMEN.md`: es más barato no cometerlos aquí que
pagarlos en la pasada de calidad (en el 12, tres rondas y dos pasadas extra, unas 6 h y 15 M de tokens).

**Al integrar la primera versión, borra sus copias `_tmp_<G>/`** (con su ruta literal, una a una) antes de lanzar
cualquier otra pasada: la pasada de decorados usa las mismas letras y sus agentes toman una carpeta que ya existe por
un intento anterior y siguen desde ahí, con una copia vieja (en el 15 hubo que parar y relanzar la pasada por esto).

**El primer borrador de la miniatura va aquí, no al final** (paso 10): con los decorados recién hechos, compón
`<pref>-miniatura.html` y mírala también reducida a 320 × 180, que es como la ve el público en la lista de YouTube. En el
12, el tornado pálido se vio al final y hubo que rehacerlo.

### 6. Escenas: el primer borrador, ya con el movimiento

**0. Antes de lanzar, reparte tú los encuadres.** Con las notas de geometría de los decorados (`<SC>/geo<N>/`), escribe
`<SC>/encuadres-<ep>.md` con una línea por escena: qué decorado y qué encuadre (y qué luz o época) usa cada uno de sus
planos. Reglas: el mismo decorado y encuadre como mucho dos veces en el episodio, nunca en escenas vecinas, y si un
decorado central tiene que volver (el pozo del 14), cada vez con otra luz, otra época u otro estado. **Dentro de una
escena, un encuadre no se repite nunca** (aprobado el 29/10/2026): si la historia vuelve al mismo sitio, va con la otra
cámara del decorado (más cerca u otro ángulo), no solo con otra luz o estado. En el 15 el revisor contó como
composición repetida 10 planos que el reparto había puesto así (el puerto de 1625 y el de 1660, los tres salones). En las
`indicaciones` de cada grupo di qué encuadres le tocan. En el 14, sin este reparto, el pozo en corte salió 5 veces y la
composición repetida fue el fallo número uno de la calidad (14 de 65): el registro común no basta porque los grupos
trabajan a la vez.

Desde el 13 lo hacen los agentes, con el workflow `hacer-video-escenas` (`scriptPath:
'<raíz>/.claude/workflows/hacer-video-escenas.js'`), en unos 9 grupos de 2–3 escenas repartidos en 3 llamadas a la vez:
`{ ep, pref, carpeta, tema, elenco, geo: '<SC>/geo<N>', sc, grupos: [{ k, ids, archivo: 'escenas<k>.py', indicaciones }] }`.
Cada agente escribe su módulo `episodios/<carpeta>/borrador-escenas/escenas<k>.py`, lo genera en `_tmp_S<k>/` y lo
revisa con las hojas. El encargo ya lleva:
- el movimiento de la antigua pasada (acción con propósito, vida de fondo, sincronía);
- la lista de los ocho fallos de `NIVEL-RESUMEN.md`, que el agente pasa como si fuera el revisor antes de entregar (en
  el 13 la calidad suspendió 47 de 102 planos del borrador);
- el registro común de encuadres (`<SC>/encuadres-<ep>.md`), para no repetir el de otro grupo;
- el barrido de errores de sus escenas (`render-escenas.mjs --barrer --carpeta _tmp_S<k>`).

Guarda los `avisos` de cada grupo en `<SC>/avisos<N>.md`, haz commit de los módulos y, con todos:
1. `python3 atomo/herramientas/generar-escenas.py <pref> <ep> episodios/<carpeta>/borrador-escenas/escenas1.py … --pisar`
   (con la voz real, paso 3).
2. Mide: `node atomo/herramientas/medir-planos.mjs <ep>` («!» si pasa de 7,2 s, «<» si baja de 3,5 s), `--fundidos` y
   `--comprobar`.
3. **El control del sonido, ya aquí:** `bash atomo/herramientas/control-sonido.sh <ep> <carpeta>` (unos minutos, sin
   render ni agentes): % del tiempo con efectos, también por escena, voz − efectos y la música en cada cartela. Cada
   escena entre el 40 y el 60 %; las que marque «← poco» llevan efectos sincronizados con lo que se ve. En el 13 esto
   salió en la producción y costó dos vueltas y un agente.
4. Borra las `_tmp_S*` con su ruta literal, una a una, y haz commit. **Desde aquí el generador ya no se usa:** las
   escenas se editan en su `.html`.

Reglas de las escenas, para cuando las toques tú: un plano cada 4–7 s con su propia composición, cortado en la palabra
(`en('marca', fracción)`); cartelas y barra del año; efectos `[t, 'receta']` solo de `NIVEL` en `efectos.cjs`, como
mucho uno por segundo (el recorte automático de `efectos.cjs` por encima del 62 % es la red, no el método); los gags;
brazos con `T.brazo` y manos con `T.mano`, nunca uno propio.

### 7–9. Las tres pasadas, con el workflow guardado

**Cómo se llama:** `Workflow({ name: 'hacer-video-pasadas', args: {…} })`. Si no lo encuentra porque se creó a mitad de
sesión, usa `scriptPath: '<raíz del repo>/.claude/workflows/hacer-video-pasadas.js'`.

Todos los `args` llevan `paso`, `ep`, `pref`, `carpeta`, `tema` y `sc`. Cada workflow ejecuta 2 agentes a la vez. Para
ir más rápido, reparte los grupos en 3 llamadas a la vez, con grupos distintos.

**7. Movimiento, solo lo que no aguante** (en el 13, 15 min y 0,2 M de tokens; antes, 2 h y 4,6 M):
- el movimiento ya viene del borrador. Pasan por aquí las escenas con un QUIETO de `--comprobar` o con un aviso de
  acción pequeña o floja, en un grupo (`indicaciones` con el plano y lo que falla);
- `paso: 'movimiento'`, con `grupos: [{ ids: ['xx-reglas', 'xx-chips'], indicaciones: '…' }]`;
- cada agente da a cada plano una acción con propósito, vida de fondo, sincronía y efectos;
- **guarda sus `avisos`**: las posiciones de los decorados de las que dependen las escenas, los fallos de decorado que
  vieron y los «fondo local»;
- haz commit al acabar.

**8. Decorados, con fallos concretos** (1–1,5 h con 2–3 workflows; en el 13, 1,7 M de tokens frente a 3,5 M):
- reparte las funciones de `<pref>-comun.js` en unos 9 grupos (A, B, C…) de 4–7;
- `paso: 'decorados'`, con
  `grupos: [{ g: 'A', fns: [...], indicaciones: 'FALLO: … (de los avisos y de lo que has visto)', dependencias: 'posiciones que usan las escenas (de los avisos)' }]`;
- cada agente trabaja en su copia `_tmp_<G>/` (ya en `.gitignore`) y la deja probada;
- **integra cada workflow en cuanto termine**:
  1. ejecuta la orden `integrar` que devuelve;
  2. lee sus `AVISO` y `NO ENCONTRADAS`, y las notas de `geometria`;
  3. `cp atomo/plato/escenas/<pref>-comun.js <SC>/chk.mjs && node --check <SC>/chk.mjs`;
  4. saca las hojas de las escenas afectadas y míralas;
  5. haz commit («<Ep>: decorados al nivel del 11 (lote N): …»);
- cuando estén los tres, `grep -n 'PARCHE DECORADO' atomo/plato/escenas/<pref>-*.html` y quita los parches que ya no
  hagan falta;
- borra las copias `_tmp_*` integradas, con su ruta literal, una a una.

**9. Calidad** (unas 3–4 h):
1. **Lo que se mide solo, primero, y en texto.** Las hojas de todas las escenas NO se miran en tu conversación: cada
   hoja son unos 4.600 tokens que se vuelven a pagar en cada mensaje tuyo hasta que la conversación se resume (en el 12
   miraste unas 20 y se arrastraron horas). La revisión plano a plano contra la referencia la hace el workflow, con
   revisor y escéptico, en su primera ronda completa, con el mismo listón.

   Las hojas no ven los fundidos entre planos, así que compruébalos aparte con
   `node atomo/herramientas/medir-planos.mjs <ep> --fundidos`:
   - **ROTO** (el 10 % del cuadro o más, con negro o restos de otro plano): sale con 1 y hay que arreglarlo;
   - **REVISAR** (3–10 %): suele ser algo que se anima durante el fundido, pero se mira a ojo (`capturar.mjs` en el corte
     +0,17 s).

   En el 11 entregado había 9 fundidos ROTOS (18–48 % del cuadro) en 7 escenas, y nadie los vio.

   Y la red barata de lo grosero: `node atomo/herramientas/medir-planos.mjs <ep> --comprobar` (unos 5 min, sin
   agentes) da sospechas de zonas de un color, planos quietos, detalle detrás de Atom, planos repetidos seguidos y
   errores de página. Ojo: está calibrada para que el 11 casi no dé ninguna y en el 12, antes de la calidad, no dio
   ninguna; los fallos de criterio (poco detalle, brazos, orden de dibujo) solo los ven tus ojos y los agentes.
2. Con lo que ya sabes (fundidos ROTOS, sospechas de `--comprobar` que se confirmen, los «fondo local» y los fallos de
   decorado que dejaron en sus avisos las pasadas de movimiento y decorados), apunta un fallo concreto por plano, con
   el formato del workflow:
   `{ escena, plano, nota, fallos: [...], origen: 'escena' | 'decorado', funcion, encargo: 'qué hay hoy, qué debe haber y qué se mantiene' }`.
   Si no hay ninguno, el workflow empieza por la revisión completa.
3. Lanza `paso: 'calidad'`, con `lotes` de 4–6 escenas que cubran todas, `fallos` (tu lista, si la hay) y `rondas: 3`.
   El workflow hace esto:
   - pule tus fallos, si los hay: primero, y solo, el agente de los decorados; luego uno por escena. Si el agente de decorados ve
     que un fallo está en la escena y no en el decorado, lo devuelve y pasa al agente de esa escena en la misma ronda
     (en el 12 se perdió una ronda entera por eso);
   - **una revisión completa**: revisor y escéptico en todos los planos de todos los lotes;
   - pule lo suspendido y, desde ahí, **un verificador** por lote con escenas pulidas: puntúa entero cada plano pulido y
     busca regresiones en el resto de esas escenas, pero no reabre lo que ya aprobaron revisor y escéptico. En el 12, el
     escéptico encontraba algo nuevo en planos aprobados en cada ronda (41 → 20 → 12 → 4 → 2) y la pasada no acababa;
   - las notas del revisor van en `notas`, y `errores_pagina` es solo el error que da la herramienta (en el 12, una
     nota se tomó por un error de página);
   - el verificador y los pulidores sacan la hoja completa solo de los planos que tocan (`--planos`) y una hoja ligera
     (inicio y final, `--ligera`) del resto de la escena para las regresiones;
   - devuelve corto: lo que queda, los recuentos de cada ronda y el principio de los avisos. Los resúmenes enteros
     están en el `journal.jsonl` de su «Transcript dir»: léelos con `grep` solo si un aviso pide intervenir.

   **Tu ojo, al final y con medida:** cuando el workflow acabe, mira tú 3 o 4 hojas, no más. Elige las de los planos que
   aprobaron con la nota más justa (4), los que más rondas necesitaron y uno al azar. Sácalas con `--planos` y míralas
   junto a la referencia. Si alguno no aguanta, va a `quedan`.
4. Si devuelve `aprobado: false`, lo que queda en `quedan` se arregla tú o se le dice al usuario. Para arreglarlo tú,
   mira solo esos planos (`--planos`, o `capturar.mjs` en un instante). Nunca se entrega en
   silencio.
5. Vuelve a pasar `control-sonido.sh` (el pulido toca efectos) y haz commit.

### 10. Miniatura

`<pref>-miniatura.html`, copiada de `th-miniatura.html` y hecha después de las pasadas (usa los decorados por su nombre).
Es la imagen más trabajada del episodio:
- dos decorados de verdad, partidos por una diagonal (antes y después, promesa y realidad);
- el protagonista y uno o dos personajes con el sprite chibi al doble;
- una cifra o un año grande, y un símbolo;
- sin palabras;
- lo que promete el título.

El primer borrador ya se hizo con los decorados (paso 5); aquí se termina con los decorados finales. La captura y el
escalado los hace `producir.sh`. **Mírala** a tamaño completo y a 320 × 180 antes de enviarla.

### 11. Ficha de publicación

Copia `episodios/11-theranos/publicacion.md` y rellénala con la misma estructura mientras se renderiza. Deja los huecos
`{DURACION}`, `{CAPITULOS_EN}`, `{CAPITULOS_ES}` y `{AVISOS}`:
- **Capítulos:** `python3 atomo/herramientas/capitulos.py <ep> episodios/<carpeta>` da el minuto de cada acto, sacado
  del montaje (en el 11 coincide con los publicados), y su título del guion. Escribe a partir de ahí títulos cortos en
  los dos idiomas.
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
- **barrido**: `render-escenas.mjs --barrer` llama a cada instante que se va a dibujar, sin capturar (unos minutos), y
  para si alguna escena da error a mitad de plano (en el 13 un error que las hojas no veían rompió el render);
- **render**: de TODO el episodio, para que no se cuele ningún fotograma ni efecto de una versión vieja de las escenas.
  Antes comprueba el disco (6 GB libres, o 2 GB si ya hay fotogramas que sobrescribir) y después que están todos los
  fotogramas. Con `--faltan` solo dibuja lo que falte: es para seguir un render que se cortó sin que nada cambiara
  entre medias;
- **efectos** y **banda**;
- **montar**: monta con `montar-largo.sh` y comprueba que el mp4 y el mp3 son de ahora;
- **miniatura**;
- **control**:
  - el sonido, con `medir-sonido.py`: −14 LUFS, el pico, la densidad de efectos en las dos pistas y la música en cada
    cartela;
  - los subtítulos;
  - la tira de 20 fotogramas, en `atomo/build/salida/<ep>-tira.jpg`.

**Lee la salida filtrada**, no entera: `tail -45` del registro (el control y el resumen están al final) o `grep -E
"MAL|ERROR|ROTO|hecho"`. La locución, igual: `grep -E "⚠|·|total"` de su registro.

Si falla a medias, sigue desde ese paso con `--desde fundidos|render|efectos|banda|montar|miniatura|control` (un nombre mal escrito es un error). **Mira la tira y la
miniatura.** Rellena los huecos de la ficha.

### 13. Commit y push

Todo lo del repositorio (ver el paso 0 para la rama). `atomo/build/` no va a git.

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
   10. las horas reales frente a las del presupuesto;
   11. el resumen de la evaluación del paso 15.

### 15. Evaluación de lo aprendido (obligatoria, en cada episodio)

Al entregar, evalúa el proceso para que el siguiente sea mejor **sin sacrificar nada**: calidad, detalle, animación,
sonido y las tres pasadas se quedan como están; lo que se mejora es cómo se llega a ellos. Sigue
«Cómo se evalúa» de `episodios/APRENDIZAJES.md`:
1. las cifras (horas, tokens por fase, suspensos y rondas de la calidad, el control final) y los fallos por tipo con
   `python3 atomo/herramientas/aprendizaje.py <journal.jsonl del workflow de calidad>`, frente al episodio anterior;
2. lo que se rompió o se repitió, con su causa;
3. cada aprendizaje clasificado: los arreglos de herramienta se aplican (comprobando que los episodios anteriores salen
   idénticos); los cambios de proceso se proponen al usuario con la cifra que los justifica; lo que toca el canon solo se
   propone;
4. la entrada del episodio en `APRENDIZAJES.md`, con su «Pendiente para el próximo», y commit;
5. en la entrega, un resumen corto para el usuario: cifras frente al anterior, lo arreglado y lo propuesto.

Ve apuntando las cifras durante el episodio (los tokens de cada workflow llegan en su notificación): al final no se
pueden recuperar todas.

## Gastar pocos tokens sin bajar el nivel (aprobado por el usuario el 27/10/2026)

- **Los agentes leen `episodios/NIVEL-RESUMEN.md`**, una página, y no `ESTANDAR.md`, las guías ni `th-comun.js` enteros. Como
  modelo de código se les nombran 2–3 funciones o escenas concretas, que leen con `grep -n` y `sed -n`. Las dos imágenes de
  referencia sí las miran siempre.
- **Respuestas cortas:** fallos, posiciones de las que dependen y rutas de las hojas. Sin notas largas (en el 12 llegaban
  a 40.000 caracteres).
- **Imágenes:** las hojas de revisión a 640 × 360. La captura a 1920 × 1080 solo para un detalle concreto.
- **Verificación de datos:** 3 agentes (paso 2.3).
- **Aprobado el 28/10/2026, para el 13** (en el 12 se fueron unos 35 M de tokens en subagentes, 15 M de ellos en la
  calidad):
  - las hojas de todo el episodio no se miran en tu conversación: la revisión completa la hace el workflow y tú miras
    3–4 hojas al final (paso 9);
  - el verificador y los pulidores, con hojas solo de sus planos (`--planos`) y ligeras para el resto (`--ligera`);
  - los agentes juntan en un turno las órdenes y lecturas que no dependen unas de otras y no vuelven a abrir una imagen
    que ya miraron (cada turno reenvía todo lo leído);
  - el workflow de calidad devuelve corto, con el detalle en su `journal.jsonl`;
  - los registros largos (`producir.sh`, la locución) se leen filtrados;
  - lo que no se toca: las referencias en cada agente, la revisión completa con revisor y escéptico, las hojas a 640 px
    por fotograma y el modelo de los agentes.
  - Al entregar el 13, compara los tokens de cada fase con los del 12 (los da el resultado de cada workflow) y díselo
    al usuario con cifras.
- **Probado en el 13 y aprobado por el usuario el 28/10/2026** («quedó perfecto»; 13,6 M de tokens frente a 35 M):
  - borrador de escenas con el movimiento dentro (paso 6), y la pasada de movimiento solo para lo que no aguante;
  - pasada de decorados con la lista de fallos concretos de cada decorado;
  - la pasada de calidad sigue entera (revisor y escéptico en todos los planos una vez, pulido y verificador hasta que
    no quede nada): es la red;
  - y, con lo aprendido en el 13: el autorrevisor en el borrador con los fallos que más suspendieron, el registro común
    de encuadres, el brazo canónico (`T.brazo`, y `T.mano` con `sinManga`), el barrido de errores antes del render y en
    los agentes, el control del sonido en los pasos 6 y 9 (`control-sonido.sh`), los encuadres nuevos probados con un
    personaje y cuatro recetas de ambiente (`publico`, `maquina`, `coche`, `viento`).
- **Aprobado el 28/10/2026** (lo aprendido en el 12): los siete fallos en `NIVEL-RESUMEN.md` desde el primer borrador;
  el verificador en lugar del escéptico desde la segunda revisión; los fallos que vuelven solos a su escena; la miniatura
  con los decorados; el presupuesto de efectos; 10 GB libres al empezar; el integrador que coge las auxiliares cambiadas;
  el diccionario de pronunciación. Si el 13 sale por debajo del 12 en algo, se vuelve atrás y se le dice al usuario.

## Presupuesto de horas

Son horas de reloj de la sesión, calibradas con el 11 (26 escenas, 107 planos, ~50 decorados). Van siempre con
[Probable].

| Bloque | Horas |
|---|---|
| Tema y guion | 1–2 h, más las rondas del usuario |
| Voz | ~40 min, en segundo plano |
| Reparto, decorados y escenas, primer borrador (con el movimiento) | ~1,5 h |
| Pasada de movimiento (solo lo que no aguante) | ~15–30 min |
| Pasada de decorados (fallos concretos) e integración | ~1 h |
| Calidad: tu revisión, revisor y escéptico una vez, pulido y verificador | 3–4 h (el 12, con el método anterior: ~6 h) |
| Producción y control (render 10–16 min) | ~45 min |
| Miniatura, ficha y entrega | ~1 h |
| **Total** | **unas 8–10 h** (el 12 real: ~15 h; el 13, ~6,5 h desde el guion) |

## Trampas conocidas

- **Esperar a un proceso:**
  - Todo lo largo se lanza en UNA orden Bash con `run_in_background` y `timeout`, y se espera al aviso.
  - Nunca `nohup … &` con un bucle de `pgrep -f`: el bucle se encuentra a sí mismo y no acaba (en el 11 se perdieron
    70 min).
  - Ni `pkill -f` (mata su propia shell) ni `sleep N; …` (el arnés lo bloquea).
- **Una interrupción del usuario mata los workflows en marcha, sin aviso.**
  - Al lanzar cada workflow, apunta su «Transcript dir» (lo da el resultado de la herramienta Workflow: ahí están su
    `journal.jsonl` y los `agent-*.jsonl`). Después de cualquier interrupción, mira
    `ls -la --time-style=+%H:%M <Transcript dir>/agent-*.jsonl; date +%H:%M`.
    Si no crecen desde hace más de 10 min, han muerto.
  - Nunca le digas al usuario que «siguen» sin comprobarlo (en el 11 costó 3 h).
  - Relánzalos con `resumeFromRunId`. Solo funciona en la misma sesión y con la ejecución anterior parada: lo terminado
    sale de la caché. Tras un reinicio, o desde otra sesión, relanza solo los grupos que faltan; sus copias `_tmp_`
    siguen ahí y los agentes parten de ellas.
- **El disco lleno falla sin avisar.** La voz da «LibsndfileError: System error», node muere sin mensaje y una cadena con
  `;` termina con 0. Por eso `producir.sh` encadena con `set -e` y comprueba los fotogramas y las fechas. Para borrar:
  - solo lo que se puede regenerar (cachés de pip y npm, modelos que no usa el canon, tus capturas viejas). **Nunca**
    `~/.cache/ask-atom/voz` ni lo que enlace a ella: mira con `ls -la` y `readlink` antes de borrar una carpeta que
    «parece vieja» (en el 12 se borró el entorno de voz así);
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
- **La música no se toca sin preguntar.** `banda.cjs` ya hace música continua. La banda de cada episodio (tono, modo,
  tempo, motivo y ánimos) se decide con el guion y la aprueba el usuario con su muestra; después no se cambia por tu
  cuenta. Si algo suena raro, se mide con `medir-sonido.py` y se pregunta. Sin «banda» en `escenas.json`, `banda.cjs`
  suena exactamente como en el 10–12 (comprobado bit a bit con el 12).
- **Si el usuario pregunta «¿por qué…?», respóndele** y no toques nada. En el 11 se deshizo `banda.cjs` sin que nadie lo
  pidiera y tuvo que repetir la pregunta.
- **Un vídeo ya subido a YouTube no se vuelve a renderizar entero.** El arreglo se ajusta a lo publicado: por ejemplo,
  solo una pista en español nueva, con sus tiempos.
- **Todo arreglo de sonido va a las dos pistas,** y se mide en las dos.
