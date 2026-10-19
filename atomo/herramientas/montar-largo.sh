#!/usr/bin/env bash
# Uso: [PYTHON=<python con numpy, scipy y soundfile>] herramientas/montar-largo.sh <carpeta_linea> <salida_sin_extension>
# Monta un vídeo largo de dos idiomas a partir de render-escenas.mjs y preparar_largo.py:
#   <salida>.mp4      vídeo 1920x1080 con la pista en español (voz + música que baja sola)
#   <salida>-en.m4a   pista en inglés con la misma música, para añadirla en YouTube Studio
#   <salida>-es.srt / -en.srt   subtítulos
set -euo pipefail
cd "$(dirname "$0")/.."
D=$1
SALIDA=$2
# ffmpeg se para en el primer hueco de la secuencia: antes de montar, deben estar todos los fotogramas.
FALTAN=$("${PYTHON:-python3}" -c "import json,os,sys; d=sys.argv[1]; n=json.load(open(d+'/linea.json'))['fotogramas']; print(sum(not os.path.exists(f'{d}/fotos/{i:05d}.jpg') for i in range(n)))" "$D")
[ "$FALTAN" = 0 ] || { echo "Faltan $FALTAN fotogramas en $D/fotos: renderiza con --faltan" >&2; exit 1; }
[ -f "$D/musica.wav" ] ||"${PYTHON:-python3}" herramientas/musica.py "$D/linea.json" "$D/musica.wav"
mezcla() { # $1 = voz: la música baja cuando habla
  echo "[1:a]aresample=48000,pan=stereo|c0=c0|c1=c0,asplit=2[voz][llave];[2:a]volume=0.2[mus];[mus][llave]sidechaincompress=threshold=0.02:ratio=10:attack=20:release=400[fondo];[voz][fondo]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]"
}
ffmpeg -y -loglevel error -framerate 30 -i "$D/fotos/%05d.jpg" -i "$D/voz-es.wav" -i "$D/musica.wav" \
  -filter_complex "$(mezcla)" -map 0:v -map "[a]" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -profile:v high -r 30 \
  -c:a aac -b:a 192k -ar 48000 -metadata:s:a:0 language=spa -movflags +faststart -shortest "$SALIDA.mp4"
ffmpeg -y -loglevel error -f lavfi -i anullsrc -i "$D/voz-en.wav" -i "$D/musica.wav" \
  -filter_complex "$(mezcla)" -map "[a]" -c:a aac -b:a 192k -ar 48000 -metadata:s:a:0 language=eng "$SALIDA-en.m4a"
cp "$D/subtitulos-es.srt" "$SALIDA-es.srt"
cp "$D/subtitulos-en.srt" "$SALIDA-en.srt"
echo "Hecho: $SALIDA.mp4, $SALIDA-en.m4a y subtítulos"
