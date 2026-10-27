---
name: hacer-video
description: Hacer (o rehacer) un episodio completo de ASK Atom al nivel canónico del episodio 11 final, desde el tema hasta la entrega en el chat. Úsala siempre que el usuario pida un vídeo o episodio nuevo, un capítulo, rehacer o mejorar uno ya hecho, o cualquier parte del proceso (guion, voz, decorados, escenas, render, música, publicación). El usuario no tiene que volver a explicar el nivel ni el proceso.
---

# Episodio de ASK Atom, al nivel canónico

El nivel está escrito en piedra en `episodios/ESTANDAR.md`: léelo entero antes de empezar. La referencia es el episodio 11
final (`atomo/build/salida/ep11.mp4`; decorados en `atomo/plato/escenas/th-comun.js`, escenas `th-*.html`, commit
`6455734`). Lo que el usuario pidió, con sus palabras: «todo excelente; pero sobre todo el detalle de las escenas y
movimiento», y «no por ahorrar tiempo bajarlo por ninguna circunstancia».

Lee también `episodios/GUIA-ESTILO.md` (cómo se dibuja) y `episodios/GUIA-NARRATIVA.md` (cómo se cuenta). Como plantilla
de código, usa la carpeta del último episodio: `episodios/11-theranos/` (hacer_guion.py, plan.py, guion.md,
publicacion.md) y `atomo/plato/escenas/th-*`.

## Lo que no se negocia

- **Tres pasadas de calidad con agentes, siempre:** decorados, movimiento y pulido de los planos que queden atrás. La
  primera versión del 11 salió sin ellas («paredes vacías, cielos sin detalle… parece que te sigues ahorrando tiempo») y
  el usuario la rechazó. No se entrega nada que no haya pasado por las tres.
- **Comparación lado a lado** de cada plano con planos del 11 (o del 10). Si no aguanta, no pasa.
- **Si algo no cabe en el plazo, se pregunta.** No se baja el listón en silencio. Etiquetas honestas: «Seguro» solo para
  lo comprobado con capturas o mediciones.
- **El canon manda.** No se cambia nada que el usuario ya aprobó (el estilo, la música, las voces, la narración) sin
  preguntar. Si un arreglo pide tocar algo canónico, se hace el arreglo mínimo y se explica.

## El proceso

`SC` es la carpeta temporal (scratchpad) de la sesión; `<pref>` el prefijo de dos letras del episodio (th, ov…); `<ep>`
su clave (ep11…).

0. **Disco.** `df -h /`. Un render ocupa unos 3,5 GB de fotogramas, más unos 400 MB de pistas. Si falta espacio, borra
   cachés que se puedan volver a bajar (modelos que no se usen, `npm cache clean --force`, capturas viejas de la carpeta
   temporal). No borres carpetas de fotogramas de otros episodios: hay un control de seguridad que lo bloquea, y no hay
   que esquivarlo.
1. **Tema.** Mira `episodios/tendencias/resumen.md` (el registro diario del RSS de Google Trends, `atomo/herramientas/tendencias.py`)
   y los CSV que haya subido el usuario. Propón con datos y deja que decida.
2. **Guion.**
   - Escribe `guion.md` en la carpeta del episodio, con la narración canónica (prosa en escenas, gancho primero y luego
     la frase de Atom), datos con fuentes y el presupuesto de horas, que incluye las tres pasadas.
   - Espera la aprobación.
   - Después, `hacer_guion.py` genera `guion.json` (con PREVIO y PRONUNCIA para el español) y `plan.py` genera
     `escenas.json` (escenas, marcas, ánimo, golpes, cartelas y guion visual).
3. **Voz.** `cd atomo && $SC/voz/venv/bin/python herramientas/locutar_frases.py ../episodios/<carpeta>/guion.json build/largo/<ep> $SC/voz/modelos --marcas plato/escenas/marcas-<ep>.json`.
   Revisa `build/largo/<ep>/informe.json`: los nombres escritos a la española los lee el control como en inglés (es
   normal), pero apunta las frases dudosas para que el usuario las escuche.
4. **Reparto** en `atomo/plato/kits/pixel-chibi.js` (`ELENCO_<PREF>`, unido a `ELENCO_CHIBI`).
5. **Decorados**, primero los tuyos, en `atomo/plato/escenas/<pref>-comun.js`, con `preparar`, `rodar`, `momento` (la
   fracción de letras dentro de la frase) y una función por decorado con sus opciones. Captúralos en una página de
   prueba (`prueba-<pref>.html`) y corrige lo evidente.
6. **Escenas** `<pref>-*.html`: un plano cada 4–7 s, con el corte en la palabra que toca (`en('marca', fracción)`),
   cartelas de año, barra del año (que puede ser una función), efectos sincronizados y gags. Mide con
   `node atomo/herramientas/medir-planos.mjs <ep>`.
7. **Pasada de decorados con agentes** (workflow `.claude/workflows/hacer-video-pasadas.js`, `paso: decorados`).
   - Reparte los decorados en unos 9 grupos.
   - Con 4 núcleos cada workflow ejecuta 2 agentes a la vez, así que lanza 3 workflows de 3 agentes en paralelo.
   - Cada agente trabaja sobre su copia (`atomo/plato/escenas/_tmp_<G>/`, ya en .gitignore) y devuelve el código.
   - Integra con `python3 atomo/herramientas/integrar-decorados.py atomo/plato/escenas/<pref>-comun.js <journal.jsonl>…`.
   - Comprueba la sintaxis (`cp … x.mjs && node --check x.mjs`).
   - Pasa a cada agente la lista de posiciones de las que dependen las escenas, porque si no, las rompe.
8. **Pasada de movimiento con agentes** (mismo workflow, `paso: movimiento`). Son unos 8 grupos de escenas; cada agente
   edita solo sus `.html`. Se puede lanzar a la vez que la de decorados.
9. **Revisión completa.**
   - `node atomo/herramientas/medir-planos.mjs <ep> --centros > $SC/centros.txt`.
   - Captura cada plano con `node estilos/herramientas/capturar.mjs atomo/plato/escenas/<id>.html <t1,t2…> --salida $SC/rev/<id> --formato 16:9`
     y haz hojas de contacto con etiquetas (ffmpeg xstack + drawtext).
   - Mira todas las hojas. Lo que quede por debajo va a la **pasada de pulido** (mismo workflow, `paso: calidad`).
   - Repite hasta que nada desentone.
10. **Render y sonido** (desde `atomo/`):
    - `node herramientas/render-escenas.mjs build/largo/<ep> --trabajadores 4`;
    - `node herramientas/efectos.cjs build/largo/<ep>`;
    - `node herramientas/banda.cjs build/largo/<ep> ../episodios/<carpeta>/escenas.json`;
    - `PYTHON=$SC/voz/venv/bin/python bash herramientas/montar-largo.sh build/largo/<ep> build/salida/<ep>`.

    Lánzalo en segundo plano y comprueba al final que el mp4 tiene la hora nueva, porque si el disco se llena falla sin
    avisar. Mide `ffmpeg -i <archivo> -af ebur128=peak=true -f null -` en el vídeo y en la pista del otro idioma:
    −14 LUFS ±0,5, con el pico por debajo de −0,5 dBFS. Compara la densidad de efectos y la continuidad de la música
    con el 11, como se describe en ESTANDAR.md.
11. **Subtítulos.** Los genera el montaje. Comprueba que no hay solapes, que cada uno dura 1 s o más y que no pasan de
    20 caracteres por segundo.
12. **Miniatura.** `<pref>-miniatura.html`, capturada en t = 1 y escalada a 1280 × 720 con `flags=neighbor`. Mírala
    siempre antes de enviarla.
13. **Tira de 20 fotogramas** del mp4 final (`ffmpeg -ss … -frames:v 1` y `tile=4x5`). Mírala.
14. **Ficha** `publicacion.md`, con los capítulos sacados de `build/largo/<ep>/linea.json` (inicio de cada acto).
15. **Commit y push** en la rama de trabajo, después de cada bloque.
16. **Entrega en el chat:**
    - los seis archivos con SendUserFile: vídeo, pista del otro idioma, miniatura, los dos SRT y la ficha;
    - pegados en la respuesta: los títulos (y las alternativas A/B), las dos descripciones completas con capítulos y
      fuentes, las etiquetas, los pasos para subirlo y lo que hay que revisar antes de publicar.

## Trampas conocidas

- **Una interrupción del usuario también para los agentes que estén en marcha.** Después de cualquier interrupción, mira
  sus diarios (`…/subagents/workflows/<run>/agent-*.jsonl` y `journal.jsonl`). Si se pararon, relanza con lo que ya
  hicieron, que sigue en sus copias.
- **Los decorados que no pintan toda la pantalla dejan fantasmas,** restos de fotogramas anteriores. Compruébalo
  llenando la pantalla de un color centinela.
- **`R.rect` con x1 < x0 no pinta nada,** y no avisa.
- **Puertos:** cada copia de `medir-planos.mjs` a la vez necesita su propio `--puerto`.
- **Las manos grandes y los primeros planos rompen el canon.** Usa la mano de 14 px y los insertos de objetos.
- **La música no se toca sin preguntar.** `banda.cjs` ya da música continua; si algo suena raro, se mide y se pregunta.
