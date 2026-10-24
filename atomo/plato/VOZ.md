# La voz de los vídeos largos: qué falló en el episodio 2 y cómo se hará desde el 3

## Lo que falló, y por qué

Para que la misma imagen sirva a las dos pistas, `preparar_largo.py` cortaba cada locución larga en tramos entre palabras clave y estiraba o metía silencio en cada tramo. Todos los fallos que se oyeron vienen de cortar audio ya sintetizado guiándose por tiempos que no son exactos:

1. **«1962» partido («nineteen sixty… two»).**
   - Whisper devuelve «1962,» como una sola palabra, pero el sintetizador dice tres («nineteen sixty-two»). Whisper dio como final de esa palabra las 7,72 s, cuando el «two» acaba hacia las 7,85 s.
   - El silencio de alineación tenía que ir en la coma de detrás. Se buscó el valle de energía más cercano a esa frontera (±0,2 s) y el más hondo era la «t» de «sixty|two». Ahí se metieron 0,7 s de silencio.
   - Lo mismo puede pasar con cualquier número, sigla o palabra que se escriba distinto de como se dice.
2. **«center» partido.**
   - Esto no lo causó el montaje: la palabra sale idéntica a la de la voz original. Es el propio Kokoro, que pronuncia «cen…ter» con 140 ms de nasal y oclusión flojas en medio.
   - La voz inglesa elegida (`am_fenrir`) está entre las de calidad media de Kokoro, y en frases largas la prosodia se le degrada.
3. **Antes de este último arreglo:**
   - **«One» entrecortado y luego entero:** el corte de la pausa se puso donde Whisper creía que empezaba la segunda palabra, que estaba dentro de «One».
   - **Repeticiones:** atempo adelanta unos 20 ms lo que estira.
   - **Pausas largas a mitad de frase:** el silencio de alineación se ponía en el hueco más largo entre palabras, aunque no hubiera ningún signo de puntuación.

Cada arreglo tapó un caso, pero el planteamiento (cortar una locución larga por tiempos estimados) seguirá produciendo casos nuevos. Además, para encontrarlos hay que escucharlo todo.

## Cómo se hará desde el episodio 3

**No se corta nunca una locución. Se sintetiza frase a frase y se coloca.**

1. **El guion se escribe por frases emparejadas** español/inglés, y cada frase es un clip de voz independiente.
   - Una pausa solo puede ir entre clips, así que nunca cae dentro de una palabra.
   - Los números («Uno.», «One.») son un clip propio.
2. **El texto que se locuta se escribe como se dice**: «nineteen sixty-two», «mil novecientos sesenta y dos».
   - La forma con cifras («1962») solo se usa en los subtítulos.
   - Así Whisper y el guion casan palabra a palabra.
3. **Alineación por frases.**
   - Cada pareja de frases ocupa el mismo hueco en las dos pistas. Manda la más larga.
   - La más corta se estira entera, como mucho un 8 %, sin cortes (rubberband), y el resto es silencio después de la frase, donde la pausa es natural.
   - Las marcas para la imagen se toman de Whisper dentro de cada clip corto, donde se equivoca mucho menos, y siempre caen en su frase.
4. **Control automático de cada clip antes de montar**, para no tener que escuchar el vídeo entero:
   - **Texto:** Whisper transcribe el clip y se compara con el guion. Se avisa si sobra, falta o se repite alguna palabra.
   - **Pronunciación:** se avisa de las palabras que duran el doble de lo esperado o tienen un hueco dentro, como «cen…ter».
   - **Resíntesis:** los clips señalados se vuelven a sintetizar con otra velocidad o redacción. Si siguen mal, quedan en una lista corta para escucharlos.
5. **Voces fijas.** `am_fenrir` en inglés y `em_santa` en español. El inglés es el audio original del vídeo, así que manda:
   - El inglés se locuta a su velocidad natural y casi no se estira.
   - El español es el que se ajusta: velocidad, estiramiento de ±8 % y silencio entre frases.
   - En inglés no se dice «I'm Atom, an atom», que con esta voz suena «Adam, an Adam». La presentación fija está en `episodios/GUIA-NARRATIVA.md`.

Con esto, la única revisión manual será la lista de clips señalados, normalmente vacía o de dos o tres frases.

## Cómo quedó (`atomo/herramientas/locutar_frases.py`)

- **Clips:** cada frase y cada idioma es un clip de Kokoro, guardado en caché.
- **«Atom»:** se corrige en los fonemas. Pasa de `ˈæɾəm` (t blanda, suena «Adam») a `ˈætʌm`. Con eso Whisper ya oye «Atom».
- **Control:**
  - Whisper compara el texto y avisa si falta, sobra o se repite alguna palabra. Las cifras escritas con números y los cambios de una sola letra no cuentan.
  - También mide los huecos dentro de una palabra. Más de 0,2 s es un fallo y el clip se vuelve a sintetizar a otra velocidad. Entre 0,16 y 0,2 s es un aviso para escucharlo.
  - Las oclusiones normales de esta voz («exacto», «mercurio») llegan a 0,17 s.
- **Ritmo:**
  - El inglés va a 0,95.
  - El español se sintetiza a la velocidad que lo acerque, entre 0,92 y 1,10, y se estira como mucho un 5 %.
  - Si aun así es más largo, la frase dura lo que el español y el inglés deja silencio detrás. Una voz acelerada suena con prisa; un silencio tras la frase, no.
- **Marcas:** cada frase tiene la suya, al inicio (y `_fin` al final de la frase en inglés). Así la imagen cae igual en los dos idiomas.
- **Salida:** `informe.json` lista cada clip con su velocidad, tempo, fallos y avisos.

## Pausas dentro de la frase (desde el episodio 8)

- **El problema:** Kokoro comprime la puntuación. En el episodio 8 había comas con 0 s de pausa (mediana de 0,30 s), y no había silencio de más entre actos.
- **La solución:** la misma que el modo por cláusulas de PyKokoro. Cada frase se locuta en trozos partidos por sus signos, y el silencio se pone entre clips, así que nunca cae dentro de una palabra.
- **Pausas dentro de la frase:**
  - coma: 0,3 s;
  - punto y coma, dos puntos: 0,42 s;
  - raya: 0,32 s;
  - punto: 0,6 s;
  - interrogación: 0,65 s.
- **Pausas entre frases** (cada fila del guion es un punto y aparte):
  - punto: 0,8 s;
  - interrogación: 0,9 s;
  - exclamación: 0,85 s.
- **Antes de cada acto** (`## N ·` en el guion, marcado `acto` por `hacer_guion.py`): 1,4 s de silencio, como un título.
- **No se parte:**
  - después de una inicial con punto («B.C.», «a. C.»);
  - en una coma sin espacio («1,300»).
  - Una coma tras una sola palabra («So,») se queda pegada a lo que sigue.
