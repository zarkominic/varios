# varios

Proyectos sueltos de zarkominic. El principal es **ASK Atom**, una serie de vídeos narrativos para YouTube: pixel art
dibujado con código, voz en inglés (pista principal) y en español (pista extra), música y efectos sintetizados.

| Carpeta | Qué hay |
|---|---|
| `atomo/` | El motor de los vídeos: escenas (`plato/escenas/`), kits de dibujo, voz, render, sonido y montaje (`herramientas/`) |
| `episodios/` | Cada episodio (guion, plan, ficha de publicación) y las normas: `ESTANDAR.md`, `GUIA-ESTILO.md`, `GUIA-NARRATIVA.md` |
| `estilos/` | El muestrario de estilos visuales (se publica con GitHub Pages) |
| `.claude/` | La skill `hacer-video` y el workflow de sus pasadas de calidad, para Claude Code |

## Hacer un vídeo de ASK Atom con Claude Code

1. Clona el repositorio y abre Claude Code en su raíz.
2. Di **«hacer video»** (o escribe `/hacer-video`), con el tema si ya lo tienes.

La skill `.claude/skills/hacer-video/` lleva el proceso entero:

- propone el tema con datos y escribe el guion, que hay que aprobar;
- sin más preguntas, sigue con voz, decorados, escenas, las tres pasadas de calidad con agentes, render, música, efectos,
  subtítulos, miniatura y ficha de publicación;
- lo entrega todo en el chat.

El nivel mínimo es el del episodio 11. Está escrito en `episodios/ESTANDAR.md` y se ve en `episodios/referencia-ep11-1.jpg` y `-2.jpg`.

**Requisitos:**

- Node 20+, Playwright con Chromium instalado de forma global, ffmpeg completo (rubberband, libx264, libmp3lame), Python
  3.12 o 3.13 con venv (la voz se probó con 3.13), Pillow en el python3 del sistema, unos 8 GB libres (6 para el episodio
  y 1,5 para la voz) y red hasta GitHub, Hugging Face, PyPI y Google Fonts. Compruébalo con
  `bash atomo/herramientas/comprobar-entorno.sh`.
- La voz (Kokoro y Whisper, con las versiones fijadas en `atomo/herramientas/voz-requisitos.txt`) se instala con
  `bash atomo/herramientas/preparar-voz.sh`.
- Las pasadas de calidad usan los workflows de Claude Code, que lanzan varios agentes a la vez.

## Licencia

El código es **MIT** (`LICENSE`). El nombre «ASK Atom», el personaje Atom y el contenido de los episodios (guiones, voces,
vídeos, miniaturas) **no** entran en la licencia: son del canal. El material de terceros conserva su propia licencia.
