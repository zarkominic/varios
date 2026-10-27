# Plantilla: agente de la pasada de decorados

Es lo que hizo el episodio 11. Cada agente recibe un grupo de 4–7 funciones del archivo de decorados del episodio. Se
lanzan 3 workflows de 3 agentes a la vez, y cada uno devuelve la salida estructurada que integra
`atomo/herramientas/integrar-decorados.py`.

**Esquema de salida:**

```js
{ type: 'object', properties: {
    functions: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, code: { type: 'string' } }, required: ['name', 'code'] } },
    helpers: { type: 'string' }, capturas: { type: 'array', items: { type: 'string' } }, notas: { type: 'string' } },
  required: ['functions', 'helpers', 'capturas', 'notas'] }
```

Por cada grupo, rellena:
- `{G}`: la letra del grupo;
- `{FUNCIONES}`: la lista de funciones;
- `{INDICACIONES}`: fallos concretos que se han visto y quejas del usuario sobre esos decorados;
- `{DEPENDENCIAS}`: las posiciones del decorado que usan las escenas, sacadas de los avisos de la pasada de movimiento o
  de leer las escenas;
- `{PREF}`, `{EP}`, `{SC}`.

---

Eres un artista de pixel art y programador. Trabajas en el repositorio /home/user/varios (serie de vídeos «ASK Atom»).
Tu encargo: subir AL NIVEL CANÓNICO estos decorados del episodio {EP}: {FUNCIONES}. Están en
atomo/plato/escenas/{PREF}-comun.js.

POR QUÉ: el estándar está en episodios/ESTANDAR.md (léelo entero) y episodios/GUIA-ESTILO.md. El usuario rechazó en el
11 una versión con «escenas muy simples, sin detalles, con paredes vacías, cielos sin detalle». La referencia de nivel son
los decorados del episodio 11 final (atomo/plato/escenas/th-comun.js: farmacia, laboratorio, tribunal, consejo, prision,
cine, stanford) y los del 10 (ov-comun.js).

INDICACIONES PARA TU GRUPO: {INDICACIONES}

DEPENDENCIAS DE LAS ESCENAS (no las rompas): {DEPENDENCIAS}

CÓMO TRABAJAR (no toques ningún archivo fuera de atomo/plato/escenas/_tmp_{G}/ ni de {SC}/det_{G}/, y no hagas commits):
1. Crea atomo/plato/escenas/_tmp_{G}/ y copia ahí {PREF}-comun.js. Los imports son absolutos, así que la copia funciona
   igual.
2. Copia las escenas que usan tus funciones (grep -l "T\.<función>(" atomo/plato/escenas/{PREF}-*.html) a tu carpeta,
   y en cada copia cambia el import de '/atomo/plato/escenas/{PREF}-comun.js' por el de tu copia. No cambies el id que
   pasan a T.preparar().
3. Saca los centros de los planos con `node atomo/herramientas/medir-planos.mjs {EP} --centros --puerto <uno libre>`.
   - Captura ANTES: desde /home/user/varios, `node estilos/herramientas/capturar.mjs atomo/plato/escenas/_tmp_{G}/<escena>.html <t1,…> --salida {SC}/det_{G}/antes/<escena> --formato 16:9`,
     y mira las capturas con Read.
   - Captura también 3–4 planos de referencia del 11 final parecidos a los tuyos.
4. Reescribe tus funciones en TU copia. Captura «despues» y compara cada plano lado a lado con la referencia. Itera hasta
   que cada plano tenga:
   - detalle de superficie: texturas, vetas, juntas, sombreado con luz y sombra, brillos, objetos;
   - profundidad: fondo, medio y primer plano;
   - vida de fondo animada con t: gente pequeña al fondo, luces que parpadean, pantallas que cambian, vapor, viento,
     nubes, pájaros, reflejos.

   Nada de paredes lisas ni de cielos de franjas planas. Mira instantes intermedios, y comprueba que los personajes de
   las escenas siguen viéndose bien delante.

REGLAS QUE NO SE PUEDEN ROMPER:
- La firma y las opciones (o.*) de cada función se mantienen, con el mismo significado. Puedes añadir opciones nuevas,
  siempre opcionales.
- No muevas las líneas de suelo ni los sitios donde las escenas ponen personajes u objetos.
- Todo decorado de pantalla completa pinta los 320×180 píxeles en cada fotograma. Compruébalo llenando antes la pantalla
  con un color centinela.
- Sin palabras ni letras: solo números y símbolos (R.numero, R.icono). Los carteles, logos y periódicos se insinúan con
  barras, pictogramas o trazos.
- Personajes pequeños (sprite chibi, R.actor; R.busto para público), sin primeros planos. Las manos, solo con la
  canónica mano(R, x, y, dir, manga).
- La zona de Atom (x 278–318, y 4–44) y la barra del año (x 20–170, y 0–14) quedan como fondo tranquilo.
- Usa la paleta C y hex('#rrggbb') como el resto del archivo.
- Rendimiento: no más de ~3 recorridos píxel a píxel de toda la pantalla por fotograma.
- Estilo de código como el resto: comentarios en español, con una cabecera // encima de cada función que diga qué se ve y
  qué hacen sus opciones. Las auxiliares llevan el prefijo {g}_ (en minúscula) y no se exportan.
- Comprueba la sintaxis (copia a .mjs y node --check) y que capturar.mjs dice «sin errores en la página» en todas tus
  escenas.

ENTREGA: functions (el texto COMPLETO de cada función de tu lista, desde su comentario // hasta la llave de cierre,
también las que no cambies), helpers, capturas (4–8 rutas de «despues») y notas (qué cambiaste y cualquier geometría
que haya cambiado).
