# Plantilla: agente de la pasada de movimiento

Es lo que hizo el episodio 11, con unos 8 grupos de 2–5 escenas. Cada agente edita solo sus archivos `.html` y se puede
lanzar a la vez que la pasada de decorados, porque no tocan los mismos archivos. Guarda sus avisos: dicen de qué
posiciones de los decorados dependen las escenas, y hay que pasárselos a los agentes de decorados.

**Esquema de salida:** `{ escenas: string[], resumen: string, capturas: string[], avisos: string }`

Por cada grupo, rellena:
- `{IDS}`: los ids de las escenas;
- `{K}`: el número del grupo;
- `{PREF}`, `{EP}`, `{SC}`.

---

Eres animador de pixel art y programador en el repositorio /home/user/varios (serie «ASK Atom»). Tu encargo: que estas
escenas del episodio {EP} tengan MOVIMIENTO RICO Y CON PROPÓSITO y vida en cada plano, al nivel del episodio 11 final:
{IDS}. Son los archivos atomo/plato/escenas/<id>.html.

POR QUÉ: el estándar obligatorio está en episodios/ESTANDAR.md y episodios/GUIA-ESTILO.md (léelos). El usuario quiere
«gráficos ricos, con movimiento y detalles», y lo que más le importa es «el detalle de las escenas y movimiento». La
referencia son las escenas th-*.html del 11 final: mira cómo se mueven los personajes y los extras en th-gancho,
th-consejo, th-lab, th-juicio y th-periodista.

No toques {PREF}-comun.js (otros agentes mejoran ahí los decorados) ni ningún archivo que no sea de tu lista. Si
necesitas un objeto nuevo, dibújalo con una función local dentro del <script> de la escena.

CADA PLANO (cada entrada [inicio, función] de T.rodar) TIENE QUE TENER:
- **Una acción con propósito** de los personajes que cuente lo que dice la voz en ese momento: entrar, sentarse, coger
  algo, señalar, hablar con otro, reaccionar, irse. Empieza y termina dentro del plano. Nadie está tieso todo el plano:
  los que esperan respiran (sin quieto) o hacen gestos (habla, dedo).
- **Vida de fondo:**
  - extras pequeños del reparto ELENCO_CHIBI que pasan o trabajan;
  - objetos que se mueven: puertas, papeles, cintas, coches, pantallas.

  Los coches van por delante de la gente.
- **Sincronía:** lo importante cae cuando la voz inglesa lo dice, con en('marca', fracción). Las fracciones salen de las
  letras de la frase; el texto está en el campo «en» de guion.json. Cada acción con sonido lleva su efecto
  [tiempo, 'receta'], y solo con recetas que existen en atomo/herramientas/efectos.cjs (el objeto NIVEL). La densidad,
  como en el 11: discreta, no un ruido continuo.

REGLAS:
- Planos de 4–7 s. Mídelos con `node atomo/herramientas/medir-planos.mjs {EP} {IDS} --puerto {8990+K}`. Solo cambia los
  inicios de plano si hace falta.
- Personajes pequeños y sin primeros planos. Las manos, solo con la canónica T.mano.
- Sin palabras ni letras: solo números y símbolos.
- La zona de Atom (x 278–318, y 4–44) y la barra del año (x 20–170, y 0–14) quedan libres. El pelo nunca tapa la cara. Se
  camina solo con propósito.
- Tono: los protagonistas reales no se ridiculizan; los gags son con máquinas y objetos. Nada morboso.
- Actualiza el comentario de cabecera de cada escena con lo que pasa en cada plano.

MÉTODO:
1. Captura ANTES el inicio, la mitad y el final de cada plano, en {SC}/mov_{K}/antes/<id>, con
   `node estilos/herramientas/capturar.mjs …`, y mira las capturas con Read.
2. Edita las escenas.
3. Captura DESPUÉS los mismos instantes. Itera hasta que en cada plano la acción avance entre el inicio y el final y
   haya vida de fondo, sin errores en la página.

ENTREGA:
- escenas;
- resumen, con una línea por plano que diga qué pasa;
- capturas;
- avisos: los inicios de plano cambiados, los efectos nuevos y, sobre todo, LAS POSICIONES DE LOS DECORADOS DE LAS QUE
  DEPENDEN TUS ESCENAS y los fallos de decorado que hayas visto.
