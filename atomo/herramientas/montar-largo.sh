#!/usr/bin/env bash
# Uso: [PRINCIPAL=en|es] [PYTHON=<python con numpy, scipy y soundfile>] herramientas/montar-largo.sh <carpeta_linea> <salida_sin_extension>
# Monta un vídeo largo de dos idiomas a partir de render-escenas.mjs y preparar_largo.py.
# PRINCIPAL (inglés por defecto) es el idioma original del vídeo; el otro va como pista aparte:
#   <salida>.mp4          vídeo 1920x1080 con la voz del idioma principal + música que baja sola
#   <salida>-<otro>.mp3   pista del otro idioma con la misma música, para añadirla en YouTube Studio
#                         (MP3 a 320 kbps: YouTube admite MP3, WAV y FLAC como pista de audio)
#   <salida>-es.srt / -en.srt   subtítulos
set -euo pipefail
cd "$(dirname "$0")/.."
D=$1
SALIDA=$2
PRINCIPAL=${PRINCIPAL:-en}
case $PRINCIPAL in
  en) OTRO=es ;;
  es) OTRO=en ;;
  *) echo "PRINCIPAL tiene que ser en o es" >&2; exit 1 ;;
esac
iso() { [ "$1" = en ] && echo eng || echo spa; }
# ffmpeg se para en el primer hueco de la secuencia: antes de montar, deben estar todos los fotogramas.
FALTAN=$("${PYTHON:-python3}" -c "import json,os,sys; d=sys.argv[1]; n=json.load(open(d+'/linea.json'))['fotogramas']; print(sum(not os.path.exists(f'{d}/fotos/{i:05d}.jpg') for i in range(n)))" "$D")
[ "$FALTAN" = 0 ] || { echo "Faltan $FALTAN fotogramas en $D/fotos: renderiza con --faltan" >&2; exit 1; }
[ -f "$D/musica.wav" ] || "${PYTHON:-python3}" herramientas/musica.py "$D/linea.json" "$D/musica.wav"
mezcla() { # la entrada 1 es la voz: la música baja cuando habla
  echo "[1:a]aresample=48000,pan=stereo|c0=c0|c1=c0,asplit=2[voz][llave];[2:a]volume=0.2[mus];[mus][llave]sidechaincompress=threshold=0.02:ratio=10:attack=20:release=400[fondo];[voz][fondo]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]"
}
ffmpeg -y -loglevel error -framerate 30 -i "$D/fotos/%05d.jpg" -i "$D/voz-$PRINCIPAL.wav" -i "$D/musica.wav" \
  -filter_complex "$(mezcla)" -map 0:v -map "[a]" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -profile:v high -r 30 \
  -c:a aac -b:a 192k -ar 48000 -metadata:s:a:0 language=$(iso $PRINCIPAL) -movflags +faststart -shortest "$SALIDA.mp4"
ffmpeg -y -loglevel error -f lavfi -i anullsrc -i "$D/voz-$OTRO.wav" -i "$D/musica.wav" \
  -filter_complex "$(mezcla)" -map "[a]" -c:a libmp3lame -b:a 320k -ar 48000 -metadata language=$(iso $OTRO) "$SALIDA-$OTRO.mp3"
cp "$D/subtitulos-es.srt" "$SALIDA-es.srt"
cp "$D/subtitulos-en.srt" "$SALIDA-en.srt"
echo "Hecho: $SALIDA.mp4 ($PRINCIPAL), $SALIDA-$OTRO.mp3 y subtítulos"
