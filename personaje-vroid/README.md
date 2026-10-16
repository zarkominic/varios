# Clase con Nia

Personaje hecho con VRoid (formato `.vrm`) animado con React Three Fiber. Explica un tema en formato vertical (9:16) con voz, labios sincronizados, gestos, expresiones y una pizarra que se dibuja sola.

## Probarlo

```bash
npm install
npm run build          # genera app.js
python3 -m http.server # y abre http://localhost:8000
```

## Hacer otro vídeo

- `src/guion.json`: el guion. Cada escena tiene `texto`, `expresion` (neutral, feliz, sonriente, sorpresa, triste, enfado), `gesto` (reposo, explicar, senalar, saludar), `cielo` (dia, atardecer) y `pizarra`.
- `src/pizarra.js`: los dibujos de tiza de cada escena.
- `src/rig.js`: las poses de los gestos.

## Cambiar de personaje

Diseña el tuyo en VRoid Studio (gratis), expórtalo como `.vrm` y sustituye `nia.vrm`.

## Modelo

`nia.vrm` es `three-vrm-girl` de pixiv Inc., hecho con VRoid Studio y publicado en el repositorio de [three-vrm](https://github.com/pixiv/three-vrm). Su licencia (VRoid Hub) permite uso comercial y modificación; el crédito no es obligatorio.

## Siguiente paso

Exportar el MP4 vertical con Remotion (`@remotion/three`), con la voz grabada en lugar de la del navegador.
