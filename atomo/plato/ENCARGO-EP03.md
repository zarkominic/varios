# Encargo de las escenas del episodio 3: «El tamaño de todo» (guion v4)

El guion aprobado (v4) está en `episodios/03-el-tamano-de-todo/guion.md`. El reparto en escenas, en `episodios/03-el-tamano-de-todo/escenas.json`. De los dos sale `guion.json`, que es lo que leen la voz y el plató.

Cada escena es una página `atomo/plato/escenas/<id>.html` (por ejemplo `ep3-pelo.html`). Valen todas las reglas de `atomo/plato/CONTRATO.md`; aquí va lo propio del episodio.

## Cada escena

- **Carga:** `escena('<id>', 'ep03')`.
  - Las marcas reales están en `atomo/plato/escenas/marcas-ep03.json`. Hay una marca por frase con el nombre de `guion.json`, en el instante en que empieza la frase, y `<marca>_fin` cuando acaba la frase en inglés. `frases` da el intervalo de cada frase y `cartela`, el número del salto si la escena abre capítulo.
  - Lee siempre los tiempos con `E.marca(...)`: la voz puede volver a locutarse y las marcas cambiar.
- **Qué contar:** en `guion.json`, cada frase de la escena lleva su `visual` (lo que se ve mientras se dice); la escena lleva además `empieza_con` y `termina_con`.
  - Es el guion visual aprobado: hazlo concreto y bonito, pero no inventes contenido nuevo.
  - La composición cambia cada 4–6 s, alternando plano general, plano medio y detalle.
- **Sin palabras en pantalla.**
  - Se permiten números enteros y unidades (`10⁻⁴ m`, `km`, `s`, `2019`), potencias de diez, `?`, `!`, `✓`, `✗`, flechas y `½`.
  - Nada de decimales, separadores de miles ni nombres.
- **Voz:** en inglés y en español, sobre la misma imagen. Cada golpe va a su marca de frase. Las palabras sueltas dentro de una frase no tienen marca: no ates nada a ellas.
- **Cartela:** si la escena tiene `cartela`, se pone con `cartela(...)` del kit (misma API en los tres kits adultos, documentada al principio de cada uno). Está quieta de 0 a 0,75 s y se va hacia 1,2 s; la voz entra a 1,5 s.
- **Atom:**
  - Está en todas las escenas y es siempre el mismo: el del kit de su estilo.
  - Late con `E.energia(t)` y no tapa la explicación.
  - Se tiene que leer en el móvil.
- **La regla:** la regla de nogal y latón del kit de plastilina, con su marcador, en el borde derecho. Sale en las escenas de plastilina que mueven la escala; en las de papel e isométrico, no.
- **La persona** sigue `atomo/plato/HUMANO.md`. Usa la del kit y no hagas otra.
- **Coste:**
  - Plastilina y papel: stop-motion con `paso: 1/12`. Plastilina, ≤ 5 s por fotograma dibujado; papel, ≤ 1 s.
  - Isométrico: 30 fps, ≤ 1 s por fotograma.
  - La escena tiene que estar lista (`window.__listo`) en menos de 60 s con otra escena cargando a la vez.

## Estilo y kits

- **Plastilina adulta**, la base: plató, persona, Atom, regla, cartela y viaje.
  - `kits/plastilina-adulta.js`: plató, piezas, persona, Atom, regla, cartela, post y `crearPlato`.
  - `kits/plastilina-cosmos-adulta.js`: el mundo con zoom continuo, de la calle a la galaxia.
  - Referencias: `escenas/prueba-plastilina-adulta.html` y `escenas/cosmos-plastilina-adulta.html`.
- **Papel** (`kits/papel-adulta.js`) e **isométrico** (`kits/isometrico-adulta.js`):
  - Solo para las comparaciones y anécdotas que se cierran en sí mismas (ver `episodios/GUIA-NARRATIVA.md`).
  - Misma paleta, mismo Atom y misma cartela. Referencia: `escenas/muestra-paleta-ep03.html`.
- **Los kits compartidos son de solo lectura** mientras se producen las escenas, porque hay varias escenas haciéndose a la vez.
  - Si un lote necesita una pieza nueva que van a usar varias de sus escenas (el ojo, el microscopio, el estadio…), va en un kit propio del lote: `kits/ep03-<tema>.js`.
  - Si de verdad hace falta cambiar un kit compartido, dilo en el informe y no lo cambies.
- **Transición en las escenas de comparación:** entran y salen por corte, igual que todas. Su primer y su último fotograma se componen para enlazar con la escena de plastilina vecina: el mismo objeto en el mismo sitio de la pantalla.

## Continuidad

Las escenas de plastilina son un solo viaje de cámara. Cada una empieza donde se quedó la anterior (`empieza_con` = `termina_con` de la escena de plastilina previa): el mismo encuadre, el mismo objeto y la regla en la misma potencia.

## Probar y entregar

```
node estilos/herramientas/capturar.mjs atomo/plato/escenas/<id>.html <instantes> --formato 16:9 --salida <carpeta>
```

- Captura un instante por frase, justo después de su marca, y también el fotograma 0 y el último.
- Comprueba que no hay errores en la página y que cada golpe cae en su marca.
- Si sale una persona, pasa `atomo/herramientas/guias-humano.py`.
- Entrega:
  - la ruta de la escena;
  - una hoja de contacto (`montage`);
  - una hoja a tamaño de móvil (480 px de ancho);
  - el coste por fotograma;
  - los puntos flojos.
- No toques escenas ni kits de otros.
- No hagas commit.
