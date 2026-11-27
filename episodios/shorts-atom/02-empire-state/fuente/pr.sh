#!/bin/sh
# pr.sh outdir t1 t2 ... → stills in $D/outdir and a sheet outdir/sheet.jpg (6 cols)
D=$(cd "$(dirname "$0")" && pwd); o=$1; shift
rm -rf "$D/$o"; mkdir -p "$D/$o"
cd /root/.cache/ask-atom/lemo-opuscar && node core/render/still.mjs "$D" "$@" --out "$D/$o" --prefix s_ --size 1080x1920 2>&1 | grep -viE 'note|jpg' 
cd "$D" && python3 grid.py "$o/sheet.jpg" 6 $(for t in "$@"; do echo "$o/s_$t.jpg"; done)
