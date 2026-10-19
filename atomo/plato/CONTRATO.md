# Contrato de las escenas del vídeo largo

Cada escena es una página `atomo/plato/escenas/<id>.html` que dibuja un instante concreto a 1920x1080. `herramientas/render-escenas.mjs` la renderiza fotograma a fotograma. Los marcadores (`marcador-1` … `marcador-6`) comparten `marcador.html`.

## Lo obligatorio

1. **Fontanería común.** La página importa `/atomo/plato/escena.js` y llama a `escena('<id>')`. Así recibe:
   - `duracion`: la duración de la escena.
   - `marca(nombre)`: los segundos desde el inicio de la escena en que se dice cada palabra clave. Cada marca tiene además `<nombre>_fin`, el final de esa palabra.
   - `energia(t)`: la energía de la voz.
   - `n`, `veredicto` y `resultados`: solo en los marcadores.

   Después, la página llama a `E.iniciar(dibujar, { paso })`. `dibujar(t)` tiene que dibujar exactamente el instante `t` (entre 0 y `duracion`), sin depender de lo dibujado antes. Si la escena hace una simulación, la calcula desde 0 con paso fijo y la guarda en caché. El azar siempre lleva semilla.
2. **Sincronía.** Cada cambio visual importante cae en su marca: empieza un poco antes, entre 0,1 y 0,3 s, y está completo al decirse la palabra. No uses tiempos fijos para lo que tiene marca. La voz empieza a los 0,5 s y termina 0,6 s antes del final de la escena. En el instante 0 ya hay una imagen compuesta, porque se entra por corte, y lo último se asienta y queda quieto.
3. **Un solo vídeo para dos idiomas.** La misma imagen va con la pista en español y con la pista en inglés, y los subtítulos los pone YouTube. Por eso no puede haber palabras en pantalla en ningún idioma. Solo se permiten:
   - símbolos: ✓, ✗, flechas, ½, °, %, «24 h», «12 h», «km»;
   - números, años y siglas: 1962, MIT;
   - las letras N, S y E, y la D y la C de la Luna.

   Los números van sin separador de miles ni decimales: 23½°, ½ %, no 23,5° ni 0,5 %.
4. **El átomo narrador** aparece en cada escena, dibujado en el estilo de la escena: núcleo y tres electrones en órbitas inclinadas. Late con `energia(t)`, porque habla él. Es un presentador discreto, no tapa la explicación.
5. **Encuadre 16:9.** Lo importante va dentro de x 100–1820 e y 60–1020. Evita poner contenido clave por debajo de y≈880, que es donde YouTube pone los subtítulos. Si el lienzo no es 16:9, se ajusta con bandas.
6. **Recursos.** Se permiten Google Fonts y three.js 0.170.0, este último con el mismo import map que los demos de `estilos/`. Nada más: ni imágenes ni otras librerías. Las texturas son procedurales.
7. **Coste de render.** Se mide en este servidor sin GPU con `estilos/herramientas/capturar.mjs`:
   - Papel e isométrico: ≤ 1 s por fotograma.
   - Plastilina: ≤ 5 s por fotograma dibujado.
   - Papel y plastilina son stop-motion a 12 fps: `E.iniciar(dibujar, { paso: 1 / 12 })`. El renderizador copia los fotogramas repetidos.

## Kits por estilo

Lo común de cada estilo va en `atomo/plato/kits/<estilo>.js` (`papel.js`, `isometrico.js`, `plastilina.js`): el lienzo, la luz, los materiales, el átomo y las piezas que se repiten. Así todas las escenas de un estilo se ven iguales y cada página contiene solo su coreografía.

La referencia visual de cada estilo es su demo aprobado: `estilos/06-recortes-papel.html`, `estilos/08-isometrico.html` y `estilos/10-arcilla-3d.html`. Se puede reutilizar su código.

## Probar

Al abrir la página sin `?captura`, la escena se reproduce en bucle con las marcas reales de `atomo/plato/escenas/marcas-ep02.json`. Para capturar instantes concretos:

```
node estilos/herramientas/capturar.mjs atomo/plato/escenas/<id>.html <t1,t2,…> --formato 16:9 --salida <carpeta>
```

En un marcador, `?n=3` elige cuál.
