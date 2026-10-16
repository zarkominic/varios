# Átomo narrador

Un átomo hecho de 7.000 partículas de luz que narra el tema y se transforma en lo que explica. Está hecho con React Three Fiber y three.js, con resplandor (bloom), cámara que viaja entre escenas y subtítulos sincronizados con la voz.

## Probarlo

```bash
npm install
npm run build          # genera app.js
python3 -m http.server # y abre http://localhost:8000
```

## Piezas

- `src/Atomo.jsx`: la transformación entre formas, el latido al hablar, la cámara y el resplandor.
- `src/formas.js`: las formas del primer ejemplo (`atomo`, `prisma`, `ondas`, `rayleigh`, `tierra`, `atardecer`) y el encuadre de cámara de cada una.
- `src/formas/`: una forma por archivo. Cada módulo exporta `forma(i, t, p, c, ts)` (coloca la partícula `i`; `ts` es el tiempo desde que empezó su escena) y `camara`. Se registran en `src/formas/indice.js`. Las utilidades comunes están en `src/formas/base.js` y `ejemplo_esfera.js` sirve de plantilla.
- `src/guion.json`: el guion de la página de demostración (`index.html`).

## Fabricar un episodio

El guion aprobado vive en `../episodios/<episodio>/guion.json`, con `forma_id` y `rotulo` por escena en cada idioma.

1. **Probar una forma nueva** sin renderizar el vídeo:
   `node herramientas/foto-forma.mjs <forma> 0,2,4` guarda capturas en `build/fotos/`, con las zonas que tapan el rótulo y los subtítulos marcadas.
2. **Locutar** cada escena con Kokoro (Santa en español, Fenrir en inglés) en WAV llamados `espanol-NN.wav` e `ingles-NN.wav`.
3. **Preparar el audio** de cada idioma: tiempos de cada palabra (Whisper), energía de la voz por fotograma y pista completa.
   `python herramientas/preparar_audio.py ../episodios/<episodio>/guion.json <carpeta_wavs> es build/video/es`
4. **Música original** sincronizada con las transformaciones:
   `python herramientas/musica.py build/video/es/linea.json build/video/es/musica.wav`
5. **Compilar la página de render**:
   `npx esbuild src/video.jsx --bundle --format=esm --jsx=automatic --outfile=build/video.js`
6. **Renderizar** los fotogramas 1080x1920 en paralelo (unos 10-15 min por idioma sin GPU):
   `node herramientas/render-video.mjs es --trabajadores 3`
   Para revisar escenas sueltas antes: `node herramientas/muestras-video.mjs es 0,10,20`.
7. **Montar el MP4** (H.264, AAC, -14 LUFS, la música baja sola cuando habla la voz):
   `herramientas/montar.sh es salida.mp4`
