#!/bin/sh
# sheet.sh out.jpg a.jpg b.jpg ... → side-by-side contact sheet, each 432×768
out=$1; shift; n=$#; in=""; f=""; i=0
for x in "$@"; do in="$in -i $x"; f="$f[$i:v]scale=432:768[s$i];"; i=$((i+1)); done
st=""; i=0; for x in "$@"; do st="$st[s$i]"; i=$((i+1)); done
ffmpeg -y -loglevel error $in -filter_complex "$f${st}hstack=inputs=$n" -q:v 3 $out
