# Del ADN al sapiens

Animación 3D de 60 segundos hecha con React Three Fiber: la doble hélice, el
genoma humano en cifras, la comparación con el chimpancé y 7 millones de años
de evolución homínida.

- **Web interactiva:** [`../adn-evolucion.html`](../adn-evolucion.html), un único
  archivo que se abre sin servidor, con controles de reproducción, línea de
  tiempo y sonido.
- **Vídeo:** `adn-evolucion.mp4` (1920×1080, 30 fps, con banda sonora), que se
  renderiza fotograma a fotograma desde la propia escena.

## Guion

| Tiempo | Capítulo | Qué se ve |
|---|---|---|
| 0–18 s | 01 · El código | 3.000 partículas forman la doble hélice; primer plano de los pares A–T (2 puentes de hidrógeno) y C–G (3) |
| 18–29 s | 02 · El genoma | Del núcleo salen los 46 cromosomas en cariotipo (longitudes y centrómeros reales); cifras clave y el 99,9 % |
| 29–36 s | 03 · Parentesco | Secuencias humana y de chimpancé alineadas; las diferencias aparecen a su densidad real (~1,2 %) |
| 36–60 s | 04 · Homínidos | Eje temporal logarítmico con *Sahelanthropus*, *A. afarensis*, *H. habilis*, *H. erectus*, neandertales y sapiens; volumen cerebral; flujo genético neandertal |

## Cómo está hecho

- `src/clock.js`: un único reloj gobierna todo. Ninguna escena usa el delta
  de R3F, así que el mismo instante se dibuja igual en el navegador y en el
  render del vídeo.
- `src/scenes/`: una escena por capítulo. Los homínidos (`hominin.js`) son
  esculturas generadas por código: un campo de distancias con signo (cápsulas
  y elipsoides con unión suave) poligonizado con *marching cubes*. Cambian
  postura, proporciones, caja torácica, hocico y bóveda craneal, que crece con
  la raíz cúbica del volumen cerebral.
- `src/Overlay.jsx`: rótulos, cifras y fundidos, animados en el mismo
  fotograma que la escena 3D.
- `scripts/music.mjs`: banda sonora sintetizada (sin muestras ni licencias),
  sincronizada con los cortes.
- `scripts/render.mjs`: abre la página con `?capture`, fija el tiempo de cada
  fotograma y lo pasa a ffmpeg.

## Comandos

```bash
npm install
npm run dev                  # desarrollo
npm run build                # genera ../adn-evolucion.html (archivo único)
node scripts/music.mjs       # regenera la música (scripts/music.wav y src/assets/music.m4a)
node scripts/render.mjs      # renderiza adn-evolucion.mp4 (necesita Chromium y ffmpeg)
node scripts/render.mjs --stills 5,20,45 --scale 0.5   # capturas sueltas para revisar
```

## Fuentes de las cifras

Consorcio T2T (2022) para el tamaño del genoma; Chimpanzee Sequencing and
Analysis Consortium (2005) para el ~98,8 % y los ~35 millones de diferencias;
Green et al. (2010) y trabajos posteriores para el ~2 % de ADN neandertal;
Smithsonian Human Origins Program para fechas y volúmenes craneales. Las cifras
están redondeadas y cada especie tiene rangos amplios.
