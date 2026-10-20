# Encargo de las escenas del episodio 3: «El tamaño de todo»

El guion aprobado está en `episodios/03-el-tamano-de-todo/guion.json`: 32 escenas y 98 frases. Cada escena es una página `atomo/plato/escenas/<id>.html` (por ejemplo `ep3-pelo.html`). Valen todas las reglas de `atomo/plato/CONTRATO.md`; aquí va lo propio del episodio.

## Cada escena

- **Carga:** `escena('<id>', 'ep03')`. Las marcas reales están en `atomo/plato/escenas/marcas-ep03.json`. Hay una marca por frase con el nombre de `guion.json`, en el instante en que empieza la frase, y `<marca>_fin` cuando acaba la frase en inglés. `frases` da el intervalo de cada frase.
- **Qué contar:** el campo `visual` de la escena en `guion.json`, con las frases que lo acompañan. Es la idea, no un corsé. Haz que cada frase tenga su imagen y que la composición cambie cada 4–6 s: plano general, plano medio y detalle.
- **Sin palabras en pantalla.** Se permiten números y unidades (`10⁻⁴ m`, `km`, `s`, `min`, `2019`, `11½`), potencias de diez, `?`, `!`, `✓`, `✗`, flechas y `½`. Nada de «0,1 mm» ni separadores de miles.
- **Voz:** hay voz en inglés y en español sobre la misma imagen. Cada golpe va a su marca de frase, y así cae bien en los dos idiomas. Las palabras sueltas dentro de una frase no tienen marca: no ates nada a ellas.
- **Cartela:** si la escena tiene `cartela` (por ejemplo `−4`), su primer segundo (0 – 1,2 s, antes de la voz) muestra el número del salto, grande, con la pieza de cartela del kit. Después pasa a la escena.
- **Atom:**
  - Está en todas las escenas y es siempre el mismo personaje: núcleo y tres electrones en órbitas inclinadas.
  - Late con `E.energia(t)` y no tapa la explicación.
  - En papel y en isométrico se dibuja en ese estilo, pero con la forma y los colores de la plastilina adulta.
- **La regla:**
  - Es el ancla del viaje: la regla de potencias de diez con su marcador.
  - Sale en todas las escenas de plastilina que mueven la escala, y siempre en el mismo sitio (el borde derecho) y con el mismo diseño, que es la pieza del kit.
  - En las escenas de comparación (papel e isométrico) no sale.
- **Coste:**
  - Plastilina y papel: stop-motion con `paso: 1/12`. Plastilina, ≤ 5 s por fotograma dibujado; papel, ≤ 1 s.
  - Isométrico: 30 fps, ≤ 1 s por fotograma.

## Estilo

- **Plastilina adulta** (`kits/plastilina-adulta.js`):
  - Es la base: Atom, la persona (`HUMANO.md`), la regla, la cartela y el viaje.
  - Paleta terrosa con acento ámbar o terracota y luz de cine. La referencia es `prueba-plastilina-adulta.html` y `cosmos-plastilina-adulta.html`.
- **Papel** (`kits/papel.js`) e **isométrico** (`kits/isometrico.js`):
  - Solo para las comparaciones que se cierran en sí mismas (ver `episodios/GUIA-NARRATIVA.md`).
  - Comparten la paleta de la plastilina adulta.
- **Transición en las escenas de comparación:** entran y salen por corte, igual que todas, pero su primer y su último fotograma se componen para enlazar con la escena de plastilina vecina: el mismo objeto en el mismo sitio de la pantalla.

## Continuidad

Las escenas de plastilina son un solo viaje de cámara. Cada escena empieza donde se quedó la anterior: el mismo encuadre, el mismo objeto y la regla en la misma potencia.

| escena | empieza con | termina con |
|---|---|---|
| ep3-hola | Atom de cerca en el plató | Atom diminuto junto a la yema de un dedo |
| ep3-manzana | la yema del dedo con Atom; entra una manzana | la manzana-Tierra cortada, con cerezas |
| ep3-promesa | la regla entera | el «?» lejos de la persona |
| ep3-saltos | la regla con la persona en 10⁰ | la persona en el 0, marcador en 10⁰ |
| ep3-pelo | la persona en 10⁰ | el pelo como tronco, marcador en 10⁻⁴; un velo oscuro |
| ep3-celulas | dentro del velo, el pelo al fondo | un glóbulo rojo junto a la regla en 10⁻⁵ |
| ep3-virus | el glóbulo rojo enorme al fondo | la onda de luz junto al virus, 10⁻⁷ |
| ep3-adn | el virus al fondo | el carrete de ADN, 10⁻⁹ |
| ep3-atomo | Atom en su sitio de la regla, 10⁻¹⁰ | la pizarrita con «!» |
| ep3-silla | la persona sentada | el terrón de azúcar guardado en un rincón |
| ep3-quarks | el núcleo llenando la imagen, 10⁻¹⁵ | los puntos sin borde |
| ep3-planck | la regla bajando hacia la niebla | la persona en 10⁰ mirando arriba |
| ep3-tierra | la persona mirando arriba | la Tierra y la Luna, 10⁸ |
| ep3-sol | la Tierra y la Luna pequeñas | el Sol lleno de Tierras, 10⁹ |
| ep3-neutrones | el terrón de azúcar | la estrella de neutrones junto a una ciudad, 10⁴ |
| ep3-luz | el Sol y la Tierra, 10¹⁶ | el Sol apagado y su luz aún viajando |
| ep3-galaxia | campo de estrellas | la Vía Láctea con la flecha, 10²¹ |
| ep3-andromeda | la Vía Láctea | las dos galaxias acercándose, 10²² |
| ep3-universo | Andrómeda y la Vía Láctea | el espacio estirándose, 10²⁷ |
| ep3-centro | la regla entera | la persona gigante en su universo |
| ep3-despedida | el gigante de átomos | Atom de cerca con el bocadillo «?» |

## Probar y entregar

```
node estilos/herramientas/capturar.mjs atomo/plato/escenas/<id>.html <instantes> --formato 16:9 --salida <carpeta>
```

- Captura un instante por frase, justo después de su marca, y el último fotograma.
- Comprueba que no hay errores en la página y que cada golpe cae en su marca.
- Si sale una persona, pasa `atomo/herramientas/guias-humano.py`.
- Entrega la ruta, una hoja de contacto (`montage`), el coste por fotograma y los puntos flojos.
- No toques escenas ni kits de otros. Si necesitas cambiar un kit, avisa en el informe.
- No hagas commit.
