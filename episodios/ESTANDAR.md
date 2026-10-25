# Estándar mínimo de calidad (desde el episodio 10)

**Fijado el 25 de octubre de 2026** por el usuario, tras el episodio 10 (ovnis): «Este debe ser nuestro nuevo estándar. Nada
de bajar de este estándar en futuros vídeos.» Ningún episodio se entrega si no cumple todo lo de esta lista.

- **Referencia:** `atomo/build/salida/ep10.mp4`, la pista `ep10-es.mp3`, y las escenas `atomo/plato/escenas/ov-*.html`.
- **Guías que lo completan:** `GUIA-ESTILO.md` (cómo se dibuja) y `GUIA-NARRATIVA.md` (cómo se cuenta).
- **Si una entrega no llega:** se dice antes de enviarla, con el motivo; no se entrega por debajo en silencio.

## Imagen

- **Un plano nuevo cada 4–7 s,** con su propia composición: otro decorado, otro encuadre o un inserto de objeto.
  - Un cambio de cámara sobre el mismo dibujo no cuenta como plano nuevo.
  - Solo puede tener un único plano una escena de menos de 7 s.
- **Cada plano tiene las tres cosas:**
  - detalle al nivel del gancho del episodio 10 (`ov-gancho`);
  - vida de fondo: viento, agua, luces, gente o animales;
  - una acción con propósito de los personajes.
- **Al menos un gag por cada 2–3 minutos.** Ejemplos del 10: el perro que recoge el periódico, el palito que se lleva el viento, el caramelo junto al Tic Tac, el gato en el teclado.
- **Mapas con costas reales:** `geo-ov.js`, generado desde Natural Earth con `herramientas/hacer_geo.py`, y `ov-mapas.js` (mapa de papel, Albers, relieve, chinchetas). Nunca polígonos a mano.
- **La acción va con la voz:** cada sello, chincheta o aparición cae cuando la voz inglesa dice la palabra (reparto por letras dentro de la frase o marcas).
- **La barra del año dice la verdad en cada plano:** `año` puede ser una función del tiempo.
- **Las reglas de siempre siguen:**
  - sin palabras en pantalla, solo números y símbolos;
  - personajes pequeños; el plano medio se hace con un vehículo o con el decorado;
  - Atom arriba a la derecha, grande y solo;
  - el pelo nunca tapa la cara;
  - coches y multitudes por delante de la gente.
- **Revisión antes de entregar:** se capturan todos los planos (`estilos/herramientas/capturar.mjs`) y se mira cada uno; luego una tira de 20 fotogramas del montaje final.

## Sonido

- **Voces:** inglés `am_puck` 0,85 y español `em_santa` 0,92, igualadas a −19 dB RMS.
- **Música con emoción en cada escena** (`herramientas/banda.cjs`): suspense, misterio, intriga o cierre, con golpes en los momentos clave. Tiene que oírse, también en el altavoz de un móvil.
- **Efectos discretos y sincronizados** con lo que pasa en pantalla (`herramientas/efectos.cjs`), entre 10 y 14 dB por debajo de la voz.
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
