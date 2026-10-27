#!/usr/bin/env bash
# Produce un episodio de ASK Atom de las escenas al vídeo entregable, con un control en cada paso (paso 10 de la skill
# hacer-video). Si un paso falla, se para con un error y código 1: nada sale «bien» con un vídeo viejo.
#
#   bash atomo/herramientas/producir.sh ep12 12-tema xx [--desde fundidos|render|efectos|banda|montar|miniatura|control] [--faltan]
#
# Desde la raíz del repositorio, en UNA orden Bash con run_in_background (timeout 3600000): el render del 11 tardó 10–16 min
# con 4 trabajadores y todo junto, unos 30 min. VOZ es la carpeta del entorno de voz (por defecto la de preparar-voz.sh,
# ~/.cache/ask-atom/voz). Pasos:
#   fundidos   medir-planos.mjs --fundidos: ningún corte con negro ni restos en el fundido (si no, no se renderiza);
#   render     render-escenas.mjs de TODO el episodio, para que no quede ningún fotograma ni efecto de una versión vieja
#              de las escenas (con --faltan solo dibuja lo que falte: para seguir un render que se cortó, sin cambios entre
#              medias), y comprueba que están todos los fotogramas de linea.json;
#   efectos    efectos.cjs → efectos.wav;
#   banda      banda.cjs → musica.wav y musica-banda.json (sin él, el montaje usaría la música vieja de musica.py);
#   montar     montar-largo.sh → build/salida/<ep>.mp4, <ep>-es.mp3 y los dos .srt (los SRT los escribe la locución),
#              y comprueba que el mp4 y el mp3 son de ahora;
#   miniatura  <pref>-miniatura.html en t = 1, a 1280×720 → build/salida/<ep>-miniatura.jpg;
#   control    medir-sonido.py (LUFS, efectos, música en las cartelas), subtítulos (sin solapes, ≥ 1 s, ≤ 20 car./s)
#              y la tira de 20 fotogramas → build/salida/<ep>-tira.jpg (para mirarla).
set -euo pipefail
EP=${1:?episodio (ep12)}; CARPETA=${2:?carpeta de episodios/ (12-tema)}; PREF=${3:?prefijo de las escenas (xx)}
DESDE=fundidos; FALTAN=
shift 3; while [ $# -gt 0 ]; do case $1 in --desde) DESDE=${2:?paso}; shift 2;; --faltan) FALTAN=--faltan; shift;; *) echo "opción desconocida: $1" >&2; exit 1;; esac; done
VOZ=${VOZ:-$HOME/.cache/ask-atom/voz}; PY=$VOZ/venv/bin/python
[ -x "$PY" ] || { echo "ERROR: no hay entorno de voz en $VOZ: bash atomo/herramientas/preparar-voz.sh" >&2; exit 1; }
R=$(cd "$(dirname "$0")/../.." && pwd); cd "$R"
L=atomo/build/largo/$EP; S=atomo/build/salida/$EP; PLAN=episodios/$CARPETA/escenas.json
INICIO=$(date +%s)
pasos=(fundidos render efectos banda montar miniatura control)
toca() { local p; for p in "${pasos[@]}"; do [ "$p" = "$DESDE" ] && return 0; [ "$p" = "$1" ] && return 1; done; return 1; }
paso() { echo "── $(date +%H:%M:%S) $1"; }
falla() { echo "ERROR: $1" >&2; exit 1; }
[ -f "$L/linea.json" ] || falla "no hay $L/linea.json: primero la locución (paso 3)"
mkdir -p atomo/build/salida

if toca fundidos; then
  paso "fundidos"; node atomo/herramientas/medir-planos.mjs "$EP" --fundidos || falla "hay fundidos rotos: arréglalos antes de renderizar"
fi
if toca render; then
  libre=$(df -Pk . | awk 'NR==2 {print int($4/1048576)}'); hace=6
  [ -d "$L/fotos" ] && hace=2   # se sobrescriben, pero crecen con el detalle (en el 11, 1,5 GB al rehacerlos)
  [ "$libre" -ge $hace ] || falla "solo hay $libre GB libres y el render necesita $hace (si se llena, falla sin avisar)"
  paso "render ($L) ${FALTAN:-completo}"
  (cd atomo && node herramientas/render-escenas.mjs "build/largo/$EP" --trabajadores 4 $FALTAN)
  faltan=$("$PY" -c "import json,os,sys; d=sys.argv[1]; n=json.load(open(d+'/linea.json'))['fotogramas']; print(sum(not os.path.exists(f'{d}/fotos/{i:05d}.jpg') for i in range(n)))" "$L")
  [ "$faltan" = 0 ] || falla "faltan $faltan fotogramas después del render (¿disco lleno?)"
fi
if toca efectos; then paso efectos; (cd atomo && node herramientas/efectos.cjs "build/largo/$EP"); fi
if toca banda; then
  paso banda; (cd atomo && node herramientas/banda.cjs "build/largo/$EP" "../$PLAN")
  [ "$(stat -c %Y "$L/musica-banda.json")" -ge "$INICIO" ] || falla "banda.cjs no ha escrito musica-banda.json"
fi
if toca montar; then
  paso montar; (cd atomo && PYTHON="$PY" bash herramientas/montar-largo.sh "build/largo/$EP" "build/salida/$EP")
  for f in "$S.mp4" "$S-es.mp3"; do [ "$(stat -c %Y "$f")" -ge "$INICIO" ] || falla "$f es de antes de esta producción"; done
fi
if toca miniatura; then
  paso miniatura; T=$(mktemp -d)
  node estilos/herramientas/capturar.mjs "atomo/plato/escenas/$PREF-miniatura.html" 1 --salida "$T" --formato 16:9 | grep -q "sin errores" \
    || falla "la miniatura da errores en la página"
  ffmpeg -loglevel error -y -i "$T/$PREF-miniatura-t1.jpg" -vf scale=1280:720:flags=neighbor -q:v 2 "$S-miniatura.jpg"; rm -rf "$T"
fi
if toca control; then
  paso control
  for f in "$S.mp4" "$S-es.mp3" "$S-en.srt" "$S-es.srt" "$S-miniatura.jpg"; do [ -s "$f" ] || falla "falta $f"; done
  ok=0
  "$PY" atomo/herramientas/medir-sonido.py "$L" "$PLAN" --video "$S.mp4" --pista "$S-es.mp3" || ok=1
  python3 - "$S-en.srt" "$S-es.srt" <<'EOF' || ok=1
import sys
mal = 0
for f in sys.argv[1:]:
    b = open(f, encoding='utf-8').read().strip().split('\n\n'); fuera = 0; prev = 0
    s = lambda t: (lambda h, m, x: int(h) * 3600 + int(m) * 60 + float(x))(*t.replace(',', '.').split(':'))
    for x in b:
        l = x.split('\n'); a, c = [s(y) for y in l[1].split(' --> ')]; txt = ' '.join(l[2:])
        if a < prev - 1e-3 or c - a < 1 or len(txt) / (c - a) > 20: fuera += 1
        prev = c
    print(f'  {"ok   " if not fuera else "MAL  "} {f}: {len(b)} subtítulos, {fuera} fuera de norma')
    mal += fuera
sys.exit(1 if mal else 0)
EOF
  D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$S.mp4"); T=$(mktemp -d)
  for i in $(seq 0 19); do
    t=$(python3 -c "print(round(8 + $i * ($D - 16) / 19, 1))")
    ffmpeg -loglevel error -y -ss "$t" -i "$S.mp4" -frames:v 1 -vf scale=480:270 "$T/f$(printf %02d "$i").jpg"
  done
  ffmpeg -loglevel error -y -i "$T/f%02d.jpg" -vf tile=4x5 -frames:v 1 "$S-tira.jpg"; rm -rf "$T"
  echo "  duración $(python3 -c "d=$D; print(f'{int(d//60)}:{int(d%60):02d}')"); tira para mirar: $S-tira.jpg"
  [ $ok = 0 ] || falla "el control final no pasa: arréglalo antes de entregar"
fi
paso "hecho: $S.mp4, $S-es.mp3, $S-en.srt, $S-es.srt, $S-miniatura.jpg"
