# varios — notas para Claude

Aquí vive la serie de vídeos **«ASK Atom»**: vídeos narrativos para YouTube, con el audio en inglés como pista principal
y el español como pista extra. El código de producción está en `atomo/`; cada episodio tiene su carpeta en `episodios/`.

## «hacer video»

Cuando el usuario diga **«hacer video»** (o «haz un video», «nuevo episodio», `/hacer-video`), o pida rehacer o mejorar
un episodio o una parte de uno (guion, voz, escenas, render, música, publicación), se usa la skill
**`.claude/skills/hacer-video/`** y se sigue tal cual. El usuario no tiene que volver a explicar el nivel ni el proceso.

## El nivel de calidad está escrito en piedra

- El estándar es **`episodios/ESTANDAR.md`** y la referencia, el **episodio 11 final** (Theranos), que se ve en
  `episodios/referencia-ep11-1.jpg` y `-2.jpg`. Palabras del usuario: «todo excelente; pero sobre todo el detalle de las
  escenas y movimiento», y «no por ahorrar tiempo bajarlo por ninguna circunstancia».
- **Nunca se baja la calidad para ganar tiempo.** Si algo no cabe, se pregunta antes; nada de recortes en silencio.
- **Las tres pasadas con agentes son obligatorias:** movimiento, decorados y calidad (revisor, escéptico y pulido), con el
  workflow `.claude/workflows/hacer-video-pasadas.js`.
- **El canon no se cambia sin preguntar:** estilo, manos canónicas, voces, música (`banda.cjs`), narración.
- **Solo herramientas gratis** («nada de pagadas»): nada de ElevenLabs ni de servicios de pago.
- **Entrega en el chat:** los archivos con SendUserFile, y los títulos, las descripciones, las etiquetas y los pasos
  pegados en la respuesta. El usuario no abre archivos del repositorio: lo que tenga que leer o aprobar (el guion, por
  ejemplo) se le pega entero en el chat.

## Cómo hablar con el usuario

- En español, como asesor y no como asistente: lo incómodo primero, con las etiquetas [Seguro]/[Probable]/[Supuesto].
- Con cada guion, el presupuesto de horas.
- No se cede ante una insistencia que no traiga información nueva.
- Si pregunta «¿por qué…?», se le responde. No se toca nada que no haya pedido cambiar.
