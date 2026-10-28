#!/usr/bin/env bash
# Control del sonido SIN render ni agentes (desde el 13), para no descubrir los fallos de sonido en la producción:
#   bash atomo/herramientas/control-sonido.sh ep13 13-futbol-americano
# Recoge los efectos que declaran las escenas (render-escenas.mjs --efectos), hace efectos.wav y musica.wav como la
# producción y los mide contra ESTANDAR.md: % del tiempo con efectos (40–65; por escena, para saber dónde faltan),
# voz − efectos y la caída de la música en las cartelas. Unos minutos. Se pasa al acabar el borrador de escenas (paso 6)
# y otra vez tras la calidad (paso 9); en el 13 estos fallos salieron en la producción y costaron dos vueltas.
set -euo pipefail
EP=${1:?episodio (ep13)}; CARPETA=${2:?carpeta de episodios/ (13-tema)}
cd "$(dirname "$0")/../.."
VOZ=${VOZ:-$HOME/.cache/ask-atom/voz}; PY=$VOZ/venv/bin/python
L=atomo/build/largo/$EP; PLAN=episodios/$CARPETA/escenas.json
(cd atomo && node herramientas/render-escenas.mjs "build/largo/$EP" --efectos > /dev/null)
(cd atomo && node herramientas/efectos.cjs "build/largo/$EP" | tail -1)
(cd atomo && node herramientas/banda.cjs "build/largo/$EP" "../$PLAN" | tail -1)
"$PY" atomo/herramientas/medir-sonido.py "$L" "$PLAN" --por-escena
