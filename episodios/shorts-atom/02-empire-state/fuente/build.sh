#!/bin/sh
# build.sh — mux the short (ffmpeg 6: our own version of core/render/mux.sh): two-pass loudnorm → −14 LUFS,
# a 4× oversampled limiter so the AAC stays ≤ −1.5 dBTP, film grain 3 on the picture.
# Needs out/video.mp4 (node core/render/video.mjs … --size 1080x1920) and out/mix-en.wav / mix-es.wav (python mix.py).
set -e
D=$(cd "$(dirname "$0")" && pwd); cd "$D"
LIM=${LIM:--2.2}
norm() {   # $1 in.wav  $2 out.wav
  M=$(ffmpeg -hide_banner -nostats -i "$1" -af loudnorm=I=-14:TP=-2:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
  g() { echo "$M" | grep "\"$1\"" | sed 's/.*: "\(.*\)".*/\1/'; }
  L=$(awk -v d="$LIM" 'BEGIN { printf "%.4f", 10 ^ (d / 20) }')
  ffmpeg -y -loglevel error -i "$1" -af "loudnorm=I=-14:TP=-2:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aresample=192000,alimiter=limit=$L:attack=5:release=150:level=disabled,aresample=48000" -c:a pcm_s24le "$2"
}
norm out/mix-en.wav out/mix-en-n.wav
norm out/mix-es.wav out/mix-es-n.wav
ffmpeg -y -loglevel error -i out/video.mp4 -i out/mix-en-n.wav -map 0:v -map 1:a -vf "fps=24,noise=c0s=3:allf=t,format=yuv420p" \
  -c:v libx264 -preset slow -crf 17 -profile:v high -movflags +faststart -c:a aac -b:a 192k -shortest short-es.mp4
ffmpeg -y -loglevel error -i out/mix-es-n.wav -c:a aac -b:a 192k short-es-es.m4a
cp /home/user/varios/atomo/build/largo/short-es/subtitulos-en.srt short-es-en.srt
cp /home/user/varios/atomo/build/largo/short-es/subtitulos-es.srt short-es-es.srt
for f in short-es.mp4 short-es-es.m4a; do
  echo "== $f"; ffmpeg -hide_banner -nostats -i $f -map 0:a -af ebur128=peak=true -f null - 2>&1 | grep -A12 "Summary" | grep -E "I:|Peak:"
done
