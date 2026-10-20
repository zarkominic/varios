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
5. **Voz.** Antes de locutar, elegir voz comparando muestras. En inglés, Kokoro tiene voces mejor valoradas que `am_fenrir`. Las muestras del episodio 3 están hechas ya con el método frase a frase.

Con esto, la única revisión manual será la lista de clips señalados, normalmente vacía o de dos o tres frases.
