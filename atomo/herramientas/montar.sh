#!/usr/bin/env bash
# Uso: herramientas/montar.sh <es|en> <salida.mp4>
# Une los fotogramas, la voz y la música (que baja sola cuando habla la voz)
# en un MP4 vertical listo para Shorts y TikTok (H.264, AAC, -14 LUFS).
set -euo pipefail
cd "$(dirname "$0")/.."
L=$1
SALIDA=$2
D=build/video/$L
AUDIO="[1:a]aresample=48000,pan=stereo|c0=c0|c1=c0,asplit=2[voz][llave];\
[2:a]volume=0.2[mus];\
[mus][llave]sidechaincompress=threshold=0.02:ratio=10:attack=20:release=400[fondo];\
[voz][fondo]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]"
if [ "${3:-}" = "--solo-audio" ]; then
  ffmpeg -y -loglevel error -f lavfi -i anullsrc -i $D/voz.wav -i $D/musica.wav -filter_complex "$AUDIO" -map "[a]" -ar 48000 "$SALIDA"
  exit 0
fi
ffmpeg -y -loglevel error -framerate 30 -i $D/fotos/%05d.jpg -i $D/voz.wav -i $D/musica.wav \
  -filter_complex "$AUDIO" -map 0:v -map "[a]" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -profile:v high -r 30 \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$SALIDA"
