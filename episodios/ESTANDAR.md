# Estándar de calidad de los vídeos de ASK Atom

**Fijado «sobre piedra» el 27 de octubre de 2026** por el usuario, tras la versión final del episodio 11 (Theranos):
«Este es el nivel de calidad de nuestros vídeos. Y no por ahorrar tiempo bajarlo por ninguna circunstancia. Todo, colores,
detalles, sombreados, animaciones, sonidos, música, voz, todo excelente; pero sobre todo el detalle de las escenas y
movimiento.» Sustituye y eleva el del 25 de octubre (episodio 10). Ningún episodio se entrega si no cumple todo lo de esta
lista.

- **Referencia de nivel:** el episodio 11 final.
  - Sus decorados están en `atomo/plato/escenas/th-comun.js` y sus escenas en `th-*.html` (commit `6455734`, con la
    corrección de los fundidos de `bf5a41a`).
  - Quince planos suyos, a su tamaño, están en **`episodios/referencia-ep11-1.jpg` y `referencia-ep11-2.jpg`**: es lo
    primero que se mira.
  - El vídeo (`atomo/build/salida/ep11.mp4`) solo existe en el contenedor donde se hizo, porque `build/` no va a git. Las
    escenas sí, y se capturan igual.
  - Para la narración, también el episodio 10 (`ov-*.html`).
- **Cómo se hace:** con la skill del proyecto `.claude/skills/hacer-video/` y el workflow
  `.claude/workflows/hacer-video-pasadas.js`, que llevan el proceso entero y las tres pasadas de calidad. Se sigue siempre:
  el usuario no tiene que volver a explicarlo.
- **Guías que lo completan:** `GUIA-ESTILO.md` (cómo se dibuja) y `GUIA-NARRATIVA.md` (cómo se cuenta).

## Nunca se baja el nivel

- **Ni por tiempo, ni por tamaño del episodio, ni por la tendencia.** Si algo no cabe en el plazo, se le pregunta al
  usuario antes; nunca se baja el listón en silencio.
- **Las pasadas de calidad son parte del trabajo,** no un extra: pasada de decorados, pasada de movimiento y pulido de los
  planos que se queden atrás. Entran en el presupuesto de horas.
- **Comparación obligatoria:** cada plano se pone al lado de planos del episodio 11 (o del 10) antes de darlo por bueno.
  Si no aguanta la comparación, no se entrega.
- **Etiquetas honestas:** solo se dice «Seguro» de lo comprobado con capturas o mediciones.
- **Lo que pasó en el 11** y no debe repetirse: la primera versión salió con paredes lisas, cielos de franjas, insertos sin
  fondo, personajes quietos y manos grandes fuera del canon, porque se dio por buena una sola pasada. El usuario la rechazó.
- **Y lo que se vio después** (revisión automática del 27/10): incluso el 11 final tenía fallos que nadie vio:
  - 9 fundidos rotos (cielos o paredes negras, restos de otro plano) en 7 escenas: 0:59, 1:17, 1:21, 1:30, 2:16, 4:52,
    5:28, 7:43 y 8:06. Los corrigen los kits desde `bf5a41a` y los detecta `medir-planos.mjs --fundidos`;
  - en la sala del consejo, gente que pasa por detrás pintada encima de los respaldos;
  - cuatro «planos» seguidos con la misma composición.

  Por eso la revisión la hacen, además de quien produce, un revisor y un escéptico con la hoja de cada plano.

## Imagen

- **Un plano nuevo cada 4–7 s,** con su propia composición: otro decorado, otro encuadre o un inserto de objeto.
  `medir-planos.mjs` avisa por debajo de 3,5 s y por encima de 7,2 s; un plano de 3,5–4 s solo vale como transición
  rápida (el 11 tiene alguno).
  - Un cambio de cámara sobre el mismo dibujo no cuenta como plano nuevo.
  - Solo puede tener un único plano una escena de menos de 7 s.
- **Cada plano tiene las tres cosas:**
  - detalle al nivel del episodio 11 final: texturas (vetas, juntas, tramas), sombreado con luz y sombra, brillos y
    reflejos, objetos y accesorios, y profundidad en tres términos (fondo, medio, primer plano);
  - vida de fondo animada: gente pequeña que pasa o trabaja, luces que parpadean, pantallas que cambian, vapor, viento,
    agua, nubes, pájaros, animales;
  - una acción con propósito de los personajes, sincronizada con la voz, que empieza y acaba dentro del plano. Nadie está
    tieso todo el plano.
- **Nada plano:** ni paredes lisas, ni cielos de franjas (degradado tramado, nubes de varios tamaños, pájaros, estelas),
  ni insertos sobre fondo liso (cada inserto va sobre su decorado o una mesa con objetos). Todo decorado pinta los
  320 × 180 píxeles en cada fotograma, porque si no quedan restos de fotogramas anteriores.
- **El gancho (los primeros 20 s) es la escena más trabajada del vídeo:** en el 4 se fue el 60 % de la gente en ese tramo.
- **Orden de dibujo:**
  - quien pasa por detrás de un mueble queda tapado por él;
  - lo que se ve por una ventana o una puerta (coches, gente, pájaros) se recorta a su hueco (`R.recorte`) en todas las
    escenas que reutilizan el decorado. En el 11, el coche de la calle cruzaba por dentro de la farmacia y del laboratorio.
- **Fundidos limpios:**
  - un fondo fijo se guarda en un búfer con `const prev = R.usar(b); …; R.usar(prev)`, nunca con `R.usar()` a secas;
  - la hoja de revisión no ve los fundidos (su columna de inicio es +0,4 s, ya fuera del fundido de 0,35 s). Se
    comprueban con `medir-planos.mjs <ep> --fundidos`: ROTO (el 10 % del cuadro o más) sale con 1 y se arregla;
    REVISAR (3–10 %) se mira a ojo en el corte +0,17 s.
- **Manos y cuerpos:** sin primeros planos. Una mano es siempre la canónica `mano(R, x, y, dir, manga)` de 14 px. El
  plano medio se hace con el decorado o con un vehículo; en una portada o una pantalla, el sprite chibi al doble.
- **De 6 a 8 gags cortos por episodio** (el 11 llevó 7), con máquinas, animales y objetos, nunca contra personas reales. Ejemplos del 10: el perro que recoge el periódico, el palito que se lleva el viento, el caramelo junto al Tic Tac, el gato en el teclado.
- **Mapas con costas reales:** `geo-ov.js`, generado desde Natural Earth con `herramientas/hacer_geo.py`, y `ov-mapas.js` (mapa de papel, Albers, relieve, chinchetas). Nunca polígonos a mano.
- **La acción va con la voz:** cada sello, chincheta o aparición cae cuando la voz inglesa dice la palabra (reparto por letras dentro de la frase o marcas).
- **La barra del año dice la verdad en cada plano:** `año` puede ser una función del tiempo.
- **Las reglas de siempre siguen:**
  - sin palabras en pantalla, solo números y símbolos;
  - personajes pequeños; el plano medio se hace con un vehículo o con el decorado;
  - Atom arriba a la derecha, grande y solo;
  - el pelo nunca tapa la cara;
  - coches y multitudes por delante de la gente;
  - la zona de Atom (x 278–318, y 4–44) y la barra del año (x 20–170, y 0–14) quedan como fondo tranquilo.
- **Revisión antes de entregar:**
  - se miden todos los planos (`atomo/herramientas/medir-planos.mjs <ep>`);
  - se saca la hoja de cada escena: `medir-planos.mjs <ep> --hoja <carpeta>` da una fila por plano con el inicio, el
    centro y el final, a 640 × 360, en imágenes de 5 planos como mucho. Ninguna imagen de revisión pasa de 2000 px,
    porque Read las reduce y se juzgaría en miniatura, que es lo que pasó con la primera revisión del 11;
  - se mira cada hoja al lado de la referencia, y además la revisan un revisor y un escéptico
    (`hacer-video-pasadas`, `paso: calidad`) hasta que no quede ningún plano por debajo;
  - los fundidos, con `medir-planos.mjs <ep> --fundidos` (`producir.sh` no renderiza si hay alguno ROTO);
  - al final, la tira de 20 fotogramas del montaje (`producir.sh` la deja en `atomo/build/salida/<ep>-tira.jpg`).

## Sonido

- **Voces:** inglés `am_puck` 0,85 y español `em_santa` 0,92, igualadas a −19 dB RMS.
- **Música con emoción en cada escena** (`herramientas/banda.cjs`): suspense, misterio, intriga o cierre, con golpes en los momentos clave. Tiene que oírse, también en el altavoz de un móvil.
- **Todas las melodías al mismo volumen percibido** (desde el 29/10/2026, el usuario: «hay melodías que suenan más fuertes
  que otras»): cada ánimo se iguala en LUFS (`ANIMO` en `banda.cjs`) y un nivelador frena los picos dentro de un tramo.
  Medido en el 15: los ánimos quedan dentro de 2 dB (antes, 4,2), la música en las pausas a unos −22 LUFS (antes −18,3,
  casi como la voz), los golpes unos 4 dB por encima y, bajo la voz, la mediana 13,9 dB por debajo (antes 7,1). No se
  baja más: a −26/−30 dB RMS el usuario dijo que «casi no se escucha».
- **Bajo el narrador, la música se aparta de verdad** (30/10/2026, el usuario con el 16: «la música sigue estando
  alta, molesta escuchar al narrador»): en el montaje baja 2 dB, deja hueco a la voz (−5 dB en 2,5 kHz) y la voz la
  comprime con razón 6. Medido en el 16: al hablar, la voz queda 23 dB por encima de la música (p10 10,9; antes 14,1 y
  3,2), y en las pausas la música vuelve a unos −27 LUFS.
- **Música continua:** nunca se corta ni vuelve a empezar en un cambio de escena ni en una cartela de año. Las escenas
  seguidas con el mismo ánimo suenan como un tramo, hay un lecho grave de principio a fin y cada cartela tiene su
  transición. Se mide: en los cambios de año la música baja como mucho 7,5 dB (el 11: 2,0–6,7), nunca al silencio.
  - La única excepción son los **golpes** (`golpes` en `plan.py`): la música se corta justo antes y entra un golpe grave
    en el silencio. Es a propósito: la versión C del gancho del 10, que eligió el usuario. Cerca de una cartela (menos de
    3 s), el golpe solo baja la música al 30 %.
- **Efectos discretos y sincronizados** con lo que pasa en pantalla (`herramientas/efectos.cjs`). Cada receta tiene su nivel
  en `NIVEL`, entre 5 y 17 dB por debajo de la voz según el sonido. Solo valen recetas que existen ahí.
- **La densidad, como en el 11:** algún efecto suena el 58 % del tiempo (entre 40 y 65), y cuando coincide con la voz queda
  por debajo una mediana de 15,6 dB en inglés y 14,9 en español, con un p10 de 8,3 y 8,5 (vale entre 13,5 y 19, con un
  p10 de 6 o más). Todo se mide en las dos
  pistas, porque el usuario oyó efectos altos solo en el español del 10.
- **Nivel final de las dos pistas:** −14 LUFS (±0,5), con el pico por debajo de −0,5 dBFS.
- **Todo se mide con una orden,** que sale con 1 si algo no cumple:
  `$VOZ/venv/bin/python atomo/herramientas/medir-sonido.py atomo/build/largo/<ep> episodios/<carpeta>/escenas.json --video … --pista …`.
  `producir.sh` la ejecuta al final.

## Subtítulos

- **Dos archivos,** `<ep>-en.srt` y `<ep>-es.srt`, partidos con `herramientas/subtitulos.py`:
  - en un signo, o delante de «que», «y», «that», «until»…;
  - nunca detrás de «de», «la», «the»….
- **Sin solapes;** cada subtítulo dura al menos 1 s y se lee a 20 caracteres por segundo como mucho.

## Narración

- **Narración canónica:** la de los guiones del 10 (v3) y del 11 (`GUIA-NARRATIVA.md`).
  - Prosa que fluye, una historia en escenas.
  - Ni telegráfica ni de preguntas y respuestas rápidas.
  - En temas abiertos (ovnis, misterios), el misterio queda abierto: sin descartar ni afirmar. En casos juzgados o
    comprobados (Theranos), solo hechos, con trato justo, y el ángulo de ASK Atom: explicar el porqué que otros no
    explican.

## Entrega (en el chat, siempre)

- **Con el guion:** el presupuesto de horas.
- **Al terminar, se envían los archivos:**
  - el vídeo con la voz principal;
  - la pista del otro idioma;
  - la miniatura de 1280 × 720;
  - los dos subtítulos;
  - la ficha `publicacion.md`.
- **Además, se pega en la respuesta, listo para copiar:**
  - los títulos (y las alternativas para la prueba A/B);
  - los capítulos con sus minutos, comprobados contra el montaje final;
  - las etiquetas en los dos idiomas;
  - los pasos para subirlo;
  - lo que hay que revisar antes de publicar.
- **Las descripciones completas en inglés y en español,** con las fuentes, se pegan también en el chat, no solo en el archivo.
