# Estándar de calidad de los vídeos de ASK Atom

**Fijado «sobre piedra» el 27 de octubre de 2026** por el usuario, tras la versión final del episodio 11 (Theranos):
«Este es el nivel de calidad de nuestros vídeos. Y no por ahorrar tiempo bajarlo por ninguna circunstancia. Todo, colores,
detalles, sombreados, animaciones, sonidos, música, voz, todo excelente; pero sobre todo el detalle de las escenas y
movimiento.» Sustituye y eleva el del 25 de octubre (episodio 10). Ningún episodio se entrega si no cumple todo lo de esta
lista.

- **Referencia de nivel:** el episodio 11 final. Es el vídeo `atomo/build/salida/ep11.mp4`, con los decorados de
  `atomo/plato/escenas/th-comun.js` y las escenas `th-*.html` (commit `6455734`). Para la narración y el sonido, también el
  episodio 10 (`ov-*.html`).
- **Cómo se hace:** la skill del proyecto `.claude/skills/episodio-ask-atom/` (el proceso entero, con las tres pasadas de
  calidad y las plantillas de los agentes). Se sigue siempre; el usuario no tiene que volver a explicarlo.
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

## Imagen

- **Un plano nuevo cada 4–7 s,** con su propia composición: otro decorado, otro encuadre o un inserto de objeto.
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
- **Manos y cuerpos:** sin primeros planos. Una mano es siempre la canónica `mano(R, x, y, dir, manga)` de 14 px. El
  plano medio se hace con el decorado o con un vehículo; en una portada o una pantalla, el sprite chibi al doble.
- **Al menos un gag por cada 2–3 minutos.** Ejemplos del 10: el perro que recoge el periódico, el palito que se lleva el viento, el caramelo junto al Tic Tac, el gato en el teclado.
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
  - se captura cada plano en su centro (`medir-planos.mjs <ep> --centros` y `estilos/herramientas/capturar.mjs`);
  - se mira cada captura al lado de las de referencia;
  - al final, una tira de 20 fotogramas del montaje.

## Sonido

- **Voces:** inglés `am_puck` 0,85 y español `em_santa` 0,92, igualadas a −19 dB RMS.
- **Música con emoción en cada escena** (`herramientas/banda.cjs`): suspense, misterio, intriga o cierre, con golpes en los momentos clave. Tiene que oírse, también en el altavoz de un móvil.
- **Música continua:** nunca se corta ni vuelve a empezar en un cambio de escena ni en una cartela de año. Las escenas
  seguidas con el mismo ánimo suenan como un tramo, hay un lecho grave de principio a fin y cada cartela tiene su
  transición. Se mide: en los cambios de año la música baja como mucho unos 7 dB, nunca al silencio.
- **Efectos discretos y sincronizados** con lo que pasa en pantalla (`herramientas/efectos.cjs`), entre 10 y 14 dB por debajo de la voz. Solo recetas que existen en `NIVEL`; la densidad, como en los episodios 10 y 11 (algún efecto en un 45–56 % del tiempo, mediana unos 16 dB por debajo de la voz).
- **Nivel final de las dos pistas:** −14 LUFS (±0,5), con el pico por debajo de −0,5 dBFS. Se mide con `ffmpeg -i <archivo> -af ebur128=peak=true -f null -`.

## Subtítulos

- **Dos archivos,** `<ep>-en.srt` y `<ep>-es.srt`, partidos con `herramientas/subtitulos.py`:
  - en un signo, o delante de «que», «y», «that», «until»…;
  - nunca detrás de «de», «la», «the»….
- **Sin solapes;** cada subtítulo dura al menos 1 s y se lee a 20 caracteres por segundo como mucho.

## Narración

- **Narración canónica:** la del guion v3 del episodio 10 (`GUIA-NARRATIVA.md`).
  - Prosa que fluye, una historia en escenas.
  - Ni telegráfica ni de preguntas y respuestas rápidas.
  - El misterio queda abierto: sin descartar ni afirmar.

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
