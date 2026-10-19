# Muestrario de estilos

Veinte demos animados en 16:9, todos con el tema del episodio 1 (el átomo se convierte en la Luna; en el norte se ve como una D y en el sur como una C). Galería para verlos en movimiento: https://claude.ai/artifact/MQJSo5GYKkgYaS7n2EysgE

En cada vídeo elegimos qué estilos usar. ★ marca los favoritos.

| | Estilo | Archivo | Nota (estilo / calidad) | Render (s/fotograma) | 5 min de vídeo* |
|---|---|---|---|---|---|
| ★ | Recortes de papel | `06-recortes-papel.html` | 8 / 8 | 0,80 | 1 h |
| ★ | Isométrico | `08-isometrico.html` | 8,5 / 8 | 0,54 | 41 min |
| ★ | Plastilina 3D | `10-arcilla-3d.html` | 8 / 7 | 9,68 | 12 h |
| ★ | Cómic | `12-comic.html` | 9 / 7,5 | 0,52 | 39 min |
| ★ | Dibujo a mano | `14-dibujo-a-mano.html` | 9 / 8 | 0,67 | 50 min |
| ★ | Física | `16-fisica.html` | 9 / 8,5 | 0,29 | 22 min |
| | Partículas | `01-particulas.html` | 9 / 8 | 2,02 | 2,5 h |
| | Metal líquido | `02-liquido.html` | 8,5 / 8 | 1,65 | 2,1 h |
| | Neón | `03-neon.html` | 9 / 8 | 0,68 | 51 min |
| | Cromo Y2K | `04-cromo-y2k.html` | 8 / 7 | 2,66 | 3,3 h |
| | Tipografía cinética | `05-tipografia-cinetica.html` | 9 / 8 | 0,24 | 18 min |
| | Holograma | `07-holografico.html` | 9 / 8 | 1,52 | 1,9 h |
| | ASCII | `09-ascii.html` | 9 / 8 | 0,21 | 16 min |
| | VHS retro | `11-vhs-retro.html` | 9 / 8 | 1,04 | 1,3 h |
| | Panel de aeropuerto | `13-split-flap.html` | 9 / 8 | 0,21 | 16 min |
| | Plano técnico | `15-plano-tecnico.html` | 9 / 8 | 0,27 | 20 min |
| ★ | Pixel art | `17-pixel-art.html` | 9 / 8 | 0,16 | 12 min |
| | Bauhaus | `18-bauhaus.html` | 7 / 7 | 0,23 | 17 min |
| ★ | Art déco | `19-art-deco.html` | 9 / 8 | 0,65 | 49 min |
| | Neobrutalismo | `20-neo-brutalismo.html` | 9 / 8 | 0,28 | 21 min |

\* 9.000 fotogramas (5 min a 30 fps) con dos procesos en paralelo, en el servidor sin tarjeta gráfica. Con GPU sería mucho menos.

La plastilina es la más lenta: conviene usarla en momentos cortos (gancho, marcadores, cierre) y no en un vídeo entero.

## Cómo están hechos

Cada demo es un HTML autocontenido. Solo carga Google Fonts y three.js 0.170.0 y expone `window.__frame(t)`, que dibuja exactamente el instante `t` (en segundos), así que la fábrica de vídeo puede renderizarlo fotograma a fotograma. Con `?captura` en la URL no se anima solo.

- `herramientas/capturar.mjs <estilo.html> <t1,t2,...> [--formato 16:9]`: captura instantes concretos y comprueba que el bucle cierra.
- `herramientas/miniaturas.mjs`: saca las miniaturas (`miniaturas/`) y mide el render de cada estilo (`miniaturas/medidas.json`).
