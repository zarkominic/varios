# varios — notas para Claude

Aquí vive la serie de vídeos **«ASK Atom»**: vídeos narrativos para YouTube, con el audio en inglés como pista principal
y el español como pista extra. El código de producción está en `atomo/`; cada episodio tiene su carpeta en `episodios/`.

## El nivel de calidad está escrito en piedra

- El estándar es **`episodios/ESTANDAR.md`** y la referencia es el **episodio 11 final** (Theranos, commit `6455734`).
  Palabras del usuario: «todo excelente; pero sobre todo el detalle de las escenas y movimiento», y «no por ahorrar tiempo
  bajarlo por ninguna circunstancia».
- **Cualquier petición de vídeo o episodio** (nuevo, rehacer, mejorar, o una parte: guion, voz, escenas, render, música,
  publicación) se hace con la skill **`.claude/skills/episodio-ask-atom/`**. El usuario no tiene que volver a explicar
  el nivel ni el proceso.
- **Nunca se baja la calidad para ganar tiempo.** Si algo no cabe, se pregunta antes; nada de recortes en silencio.
- **Las tres pasadas con agentes son obligatorias:** decorados, movimiento y pulido. También la comparación lado a lado de
  cada plano con el 11 (o el 10).
- **El canon no se cambia sin preguntar:** estilo, manos canónicas, voces, música (`banda.cjs`), narración.
- **Entrega en el chat:** los archivos con SendUserFile, y los títulos, las descripciones, las etiquetas y los pasos
  pegados en la respuesta.

## Cómo hablar con el usuario

En español, como asesor y no como asistente: lo incómodo primero, etiquetas [Seguro]/[Probable]/[Supuesto], con el
presupuesto de horas al proponer cada guion, y sin ceder ante una insistencia que no traiga información nueva.
