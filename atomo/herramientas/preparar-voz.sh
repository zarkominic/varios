#!/usr/bin/env bash
# Deja listo el entorno de voz de ASK Atom (Kokoro + Whisper) y escribe su carpeta en la salida estándar.
# Hace falta en cada contenedor nuevo: el venv y los modelos no están en git.
#
#   VOZ=$(bash atomo/herramientas/preparar-voz.sh [carpeta])      # por defecto ~/.cache/ask-atom/voz
#
# Cada llamada Bash empieza sin las variables de la anterior: repite esta línea al principio de cada una. Cuando el entorno
# ya está listo (marca .lista con el md5 de voz-requisitos.txt), responde al momento.
#   cd atomo && $VOZ/venv/bin/python herramientas/locutar_frases.py … $VOZ/modelos …
#   PYTHON=$VOZ/venv/bin/python bash herramientas/montar-largo.sh …
#
# - venv/: los mismos paquetes, versión a versión, que hicieron los episodios 8–11 (voz-requisitos.txt).
# - modelos/: kokoro-v1.0.onnx y voices-v1.0.bin, de las versiones de kokoro-onnx (se comprueba el md5).
# - Whisper «small» se baja a ~/.cache/huggingface la primera vez y se deja listo aquí.
# Si ya está todo, no hace nada. Ocupa ~1,5 GB (venv ~670 MB, modelos ~340 MB, Whisper ~480 MB).
set -euo pipefail
D=${1:-${VOZ:-$HOME/.cache/ask-atom/voz}}
H=$(cd "$(dirname "$0")" && pwd)
# el entorno vive en una carpeta de verdad: en el 12 era un enlace a la carpeta temporal de la sesión, se borró al hacer
# sitio en disco y producir.sh se paró sin voz
if [ -L "$D" ]; then echo "ERROR: $D es un enlace ($(readlink "$D")); el entorno de voz tiene que ser una carpeta de verdad" >&2; exit 1; fi
URL=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
declare -A MD5=([kokoro-v1.0.onnx]=9579b435abd94a5af3d00d3cd39df548 [voices-v1.0.bin]=29895103243c07818862043c051e1db0)
req=$(md5sum < "$H/voz-requisitos.txt" | cut -d' ' -f1)
if [ "$(cat "$D/.lista" 2>/dev/null)" = "$req" ] && [ -x "$D/venv/bin/python" ] && [ -f "$D/modelos/kokoro-v1.0.onnx" ] && [ -f "$D/modelos/voices-v1.0.bin" ]; then
  echo "$D"; exit 0
fi
mkdir -p "$D/modelos"

if ! "$D/venv/bin/python" -c 'import kokoro_onnx, faster_whisper, scipy, soundfile' 2>/dev/null; then
  echo "· creando el venv en $D/venv" >&2
  PY=$(for p in python3.13 python3.12 python3; do command -v $p >/dev/null && $p -c 'import sys; assert (3, 12) <= sys.version_info[:2] < (3, 14)' 2>/dev/null && { echo $p; break; }; done)
  [ -n "$PY" ] || { echo "hace falta Python 3.12 o 3.13 (las versiones de voz-requisitos.txt se probaron con 3.13)" >&2; exit 1; }
  "$PY" -m venv "$D/venv"
  "$D/venv/bin/pip" install -q --no-cache-dir --disable-pip-version-check -r "$H/voz-requisitos.txt" >&2
fi

for m in "${!MD5[@]}"; do
  f="$D/modelos/$m"
  if [ ! -f "$f" ] || [ "$(md5sum < "$f" | cut -d' ' -f1)" != "${MD5[$m]}" ]; then
    echo "· bajando $m" >&2
    curl -sSL --retry 4 -o "$f.part" "$URL/$m" && mv "$f.part" "$f"
    [ "$(md5sum < "$f" | cut -d' ' -f1)" = "${MD5[$m]}" ] || { echo "md5 distinto en $f" >&2; exit 1; }
  fi
done

# Whisper (el control de cada clip) y una frase de prueba con las dos voces del canon
"$D/venv/bin/python" - "$D/modelos" >&2 <<'EOF'
import sys
from faster_whisper import WhisperModel
from kokoro_onnx import Kokoro
WhisperModel('small', device='cpu', compute_type='int8')
k = Kokoro(f'{sys.argv[1]}/kokoro-v1.0.onnx', f'{sys.argv[1]}/voices-v1.0.bin')
for voz, lengua in (('am_puck', 'en-us'), ('em_santa', 'es')):
    a, sr = k.create('Atom.', voice=voz, speed=1.0, lang=lengua)
    assert len(a) > sr * 0.2, voz
print('· voz lista: Whisper small, am_puck y em_santa', file=sys.stderr)
EOF
echo "$req" > "$D/.lista"
echo "$D"
