# Átomo narrador

Un átomo hecho de 7.000 partículas de luz que narra el tema y se transforma en lo que explica. Está hecho con React Three Fiber y three.js, con resplandor (bloom), cámara que viaja entre escenas y subtítulos sincronizados con la voz.

## Probarlo

```bash
npm install
npm run build          # genera app.js
python3 -m http.server # y abre http://localhost:8000
```

## Hacer otro vídeo

- `src/guion.json`: el guion. Cada escena tiene `texto`, `forma` y `rotulo`.
- `src/formas.js`: las formas disponibles (`atomo`, `prisma`, `ondas`, `rayleigh`, `tierra`, `atardecer`) y el encuadre de cámara de cada una. Una forma es una función que coloca cada partícula; las nuevas se añaden aquí y se reutilizan en otros temas.
- `src/Atomo.jsx`: la transformación entre formas, el latido al hablar, la cámara y el resplandor.
