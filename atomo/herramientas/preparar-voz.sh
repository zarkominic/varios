#!/usr/bin/env bash
# Deja listo el entorno de voz de ASK Atom (ZONOS3-Mini, Supertonic 3, Kokoro y Whisper) y escribe su carpeta en la salida estándar.
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
# - zonos3/: el CLI de ZONOS3-Mini compilado (~0,5 GB); modelos/zonos3 (~1,2 GB) y modelos/supertonic3 (~0,4 GB).
# Si ya está todo, no hace nada. Ocupa ~3,5 GB.
set -euo pipefail
D=${1:-${VOZ:-$HOME/.cache/ask-atom/voz}}
H=$(cd "$(dirname "$0")" && pwd)
# el entorno vive en una carpeta de verdad: en el 12 era un enlace a la carpeta temporal de la sesión, se borró al hacer
# sitio en disco y producir.sh se paró sin voz
if [ -L "$D" ]; then echo "ERROR: $D es un enlace ($(readlink "$D")); el entorno de voz tiene que ser una carpeta de verdad" >&2; exit 1; fi
URL=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
declare -A MD5=([kokoro-v1.0.onnx]=9579b435abd94a5af3d00d3cd39df548 [voices-v1.0.bin]=29895103243c07818862043c051e1db0)
# Voces del canon desde el 37 (elegidas a ciegas por el usuario el 16/11/2026, atomo/plato/VOCES-ALTERNATIVAS.md):
# - español: ZONOS3-Mini (Zyphra, Apache-2.0), voz Rodrigo, con su CLI de C++/ggml compilada aquí (hace falta cmake y
#   cargo: su normalizador de texto es Rust), commit y pesos fijados;
# - inglés: Supertonic 3 (Supertone, OpenRAIL-M: hay que declarar que la voz es sintética), voz M1, paquete de pip.
# Kokoro se queda instalado: lo usan los episodios hasta el 36 si se rehacen.
Z_GIT=https://github.com/Zyphra/ZONOS3-Mini.git; Z_COMMIT=96d9e0ec1e39083ed336ac78f24e3dbc93721c0f
Z_HF=https://huggingface.co/Zyphra/ZONOS3-Mini/resolve/d2d142a86b1e6aeb4252679673c86ecd86177bf8/gguf
declare -A ZMD5=([backbone-ptq.gguf]=e8f9d21185262efd322eacb4bc0aa2a2 [zac-keep2.gguf]=97f9ea5bb6448caa8e2f76ca2f5526a0
  [spk-encoder.gguf]=0320fb848a914900ea164f841d818001 [steer.gguf]=a56745cf0c1f737456d5371ae0280f10
  [voces/Rodrigo_es_M_1.embedding.npy]=40c5cf8c4e13ce2db1a12c4eff9e5c87)
ZCLI="$D/zonos3/repo/servers/ggml/build/zonos3-cli"
req=$( (cat "$H/voz-requisitos.txt"; echo "$Z_COMMIT ${ZMD5[*]}") | md5sum | cut -d' ' -f1)
if [ "$(cat "$D/.lista" 2>/dev/null)" = "$req" ] && [ -x "$D/venv/bin/python" ] && [ -f "$D/modelos/kokoro-v1.0.onnx" ] && [ -f "$D/modelos/voices-v1.0.bin" ] \
   && [ -x "$ZCLI" ] && [ -f "$D/modelos/zonos3/backbone-ptq.gguf" ] && [ -f "$D/modelos/supertonic3/onnx/vocoder.onnx" ]; then
  echo "$D"; exit 0
fi
mkdir -p "$D/modelos/zonos3/voces"

if ! "$D/venv/bin/python" -c 'import kokoro_onnx, faster_whisper, scipy, soundfile, supertonic' 2>/dev/null; then
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

# ZONOS3-Mini: el CLI se compila con ggml en estático (BUILD_SHARED_LIBS=OFF: con librerías compartidas el binario
# guarda la ruta de la carpeta de compilación y deja de arrancar si se mueve); tarda ~10 min con 2 núcleos
if ! "$ZCLI" 2>&1 | grep -q "^usage" || [ "$(git -C "$D/zonos3/repo" rev-parse HEAD 2>/dev/null)" != "$Z_COMMIT" ]; then
  command -v cmake >/dev/null && command -v cargo >/dev/null || { echo "ZONOS3 necesita cmake y cargo (Rust)" >&2; exit 1; }
  echo "· compilando ZONOS3-Mini ($Z_COMMIT)" >&2
  rm -rf "$D/zonos3/repo"; mkdir -p "$D/zonos3/repo"
  git -C "$D/zonos3/repo" init -q && git -C "$D/zonos3/repo" remote add origin "$Z_GIT"
  git -C "$D/zonos3/repo" fetch -q --depth 1 origin "$Z_COMMIT" && git -C "$D/zonos3/repo" checkout -q FETCH_HEAD
  git -C "$D/zonos3/repo" submodule update -q --init --depth 1 servers/ggml/ggml third_party/zyphra-textnorm
  (cd "$D/zonos3/repo/servers/ggml" && cmake -B build -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF >&2 && cmake --build build -j2 --target zonos3-cli >&2)
fi
for m in "${!ZMD5[@]}"; do
  f="$D/modelos/zonos3/$m"
  if [ ! -f "$f" ] || [ "$(md5sum < "$f" | cut -d' ' -f1)" != "${ZMD5[$m]}" ]; then
    echo "· bajando ZONOS3 $m" >&2
    curl -sSL --retry 4 -o "$f.part" "$Z_HF/${m/voces\//voices/Spanish/}" && mv "$f.part" "$f"
    [ "$(md5sum < "$f" | cut -d' ' -f1)" = "${ZMD5[$m]}" ] || { echo "md5 distinto en $f" >&2; exit 1; }
  fi
done

# Whisper (el control de cada clip) y una frase de prueba con cada voz: Kokoro (hasta el 36), Supertonic 3 M1 (inglés)
# y ZONOS3 Rodrigo (español). Supertonic baja sus pesos a modelos/supertonic3 la primera vez.
"$D/venv/bin/python" - "$D/modelos" "$ZCLI" >&2 <<'EOF'
import os, subprocess, sys, tempfile
import soundfile as sf
from faster_whisper import WhisperModel
from kokoro_onnx import Kokoro
from supertonic import TTS
M, ZCLI = sys.argv[1:3]
WhisperModel('small', device='cpu', compute_type='int8')
k = Kokoro(f'{M}/kokoro-v1.0.onnx', f'{M}/voices-v1.0.bin')
for voz, lengua in (('am_puck', 'en-us'), ('em_santa', 'es')):
    a, sr = k.create('Atom.', voice=voz, speed=1.0, lang=lengua)
    assert len(a) > sr * 0.2, voz
st = TTS(model='supertonic-3', model_dir=f'{M}/supertonic3', auto_download=True)
a, _ = st.synthesize("I'm Atom.", voice_style=st.get_voice_style(voice_name='M1'), lang='en')
assert a.size > 44100 * 0.3, 'supertonic'
with tempfile.TemporaryDirectory() as d:
    subprocess.run([ZCLI, f'{M}/zonos3/backbone-ptq.gguf', '--cpu', '--tts', 'Soy Atom.', f'{d}/z.wav', '--speaker-embedding',
                    f'{M}/zonos3/voces/Rodrigo_es_M_1.embedding.npy', '--seed', '1'], check=True, capture_output=True)
    assert sf.info(f'{d}/z.wav').duration > 0.3, 'zonos3'
print('· voz lista: Whisper small, Kokoro, Supertonic 3 M1 y ZONOS3 Rodrigo', file=sys.stderr)
EOF
echo "$req" > "$D/.lista"
echo "$D"
