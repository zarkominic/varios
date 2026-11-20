#!/usr/bin/env bash
# earshot (https://github.com/Leonxlnx/earshot, MIT, gratis y en local): «oídos» para el agente. Describe un audio en
# palabras, saca la transcripción de escucha segundo a segundo (timeline), dice si un efecto cae con el corte del vídeo
# y puntúa la mezcla. Pedido por el usuario el 20/11/2026 («nos va a servir para el audio»).
# Se instala en su propio entorno (no toca el de las voces) y descarga sus dos modelos (~1,1 GB) la primera vez.
# Escribe la ruta del ejecutable. Uso: E=$(bash atomo/herramientas/preparar-earshot.sh) && $E timeline archivo.mp3
set -e
D=/root/.cache/ask-atom/earshot
if [ ! -x "$D/bin/earshot" ]; then
  T=$(mktemp -d)
  git clone -q --depth 1 https://github.com/Leonxlnx/earshot "$T/earshot" >&2
  python3 -m venv "$D" >&2
  "$D/bin/python" -m pip install -q --upgrade pip >&2
  "$D/bin/python" -m pip install -q torch --index-url https://download.pytorch.org/whl/cpu >&2
  "$D/bin/python" -m pip install -q "$T/earshot[mcp]" >&2
  "$D/bin/earshot" doctor --fetch >&2
fi
echo "$D/bin/earshot"
