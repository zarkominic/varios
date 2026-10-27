#!/usr/bin/env bash
# Comprueba que la máquina puede hacer un episodio de ASK Atom de principio a fin (paso 0 de la skill hacer-video).
# Dice qué falta y cómo ponerlo; sale con 1 si falta algo imprescindible. La voz se prepara aparte, con preparar-voz.sh.
#
#   bash atomo/herramientas/comprobar-entorno.sh
falta=0
ok() { echo "  ok    $1"; }
mal() { echo "  FALTA $1"; echo "        → $2"; falta=1; }
aviso() { echo "  OJO   $1"; echo "        → $2"; }

echo "Entorno para hacer un episodio:"
v=$(node -e 'console.log(process.versions.node.split(".")[0])' 2>/dev/null)
[ "${v:-0}" -ge 20 ] && ok "node $(node --version)" || mal "node 20 o más" "instala Node.js 20+ (https://nodejs.org)"

pw=$(npm root -g 2>/dev/null)/playwright
if [ -d "$pw" ] && node -e "require('$pw').chromium.launch().then(b=>b.close())" 2>/dev/null; then ok "playwright + chromium (global)"
else mal "playwright global con chromium (render, capturas, hojas de revisión)" "npm i -g playwright && npx playwright install --with-deps chromium"; fi

if command -v ffmpeg >/dev/null; then
  f=$(ffmpeg -hide_banner -filters 2>/dev/null); e=$(ffmpeg -hide_banner -encoders 2>/dev/null); antes=$falta; falta=0
  for x in rubberband ebur128 xstack drawtext; do grep -q " $x " <<<"$f" || mal "ffmpeg sin el filtro $x" "un ffmpeg completo (paquete ffmpeg de Debian/Ubuntu o el de ffmpeg.org)"; done
  for x in libx264 libmp3lame; do grep -q " $x " <<<"$e" || mal "ffmpeg sin $x" "un ffmpeg completo"; done
  [ $falta = 0 ] && ok "ffmpeg con rubberband, ebur128, xstack, drawtext, libx264 y libmp3lame"
  [ $antes = 1 ] && falta=1
else mal "ffmpeg" "apt-get install ffmpeg"; fi

python3 -c 'import sys; assert sys.version_info >= (3, 10)' 2>/dev/null && ok "python3 $(python3 -V | cut -d' ' -f2)" || mal "python3 3.10 o más" "instala Python 3.10+"
python3 -c 'import venv' 2>/dev/null || mal "el módulo venv de python3" "apt-get install python3-venv"
python3 -c 'import PIL' 2>/dev/null && ok "Pillow (tiras de capturar.mjs)" || mal "Pillow en el python3 del sistema" "pip install pillow (o apt-get install python3-pil)"

{ [ -f /usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf ] || [ -f /usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf ]; } \
  && ok "fuente para las etiquetas de las hojas" || aviso "no hay Liberation ni DejaVu: las hojas saldrán sin etiquetas" "apt-get install fonts-liberation"

for h in https://github.com https://huggingface.co https://fonts.googleapis.com https://fonts.gstatic.com; do
  curl -sS -o /dev/null -m 15 -I "$h" 2>/dev/null && ok "red: $h" || mal "red hasta $h (modelos de voz y Whisper; las fuentes de los números del canon)" "permite ese dominio en la red de la sesión o descarga los modelos a mano"
done

libre=$(df -Pk . | awk 'NR==2 {print int($4/1048576)}')
[ "$libre" -ge 6 ] && ok "disco libre: ${libre} GB" || mal "disco: hay ${libre} GB libres y un episodio necesita ~6 GB (fotogramas, pistas y voz)" "borra cachés que se puedan volver a bajar; no borres fotogramas de otros episodios sin preguntar"
n=$(nproc 2>/dev/null || echo 1)
[ "$n" -ge 4 ] && ok "$n núcleos" || aviso "$n núcleos: el render y los agentes irán lentos" "con 4 o más, render-escenas usa --trabajadores 4"

[ $falta = 0 ] && echo "Todo listo. Ahora: VOZ=\$(bash atomo/herramientas/preparar-voz.sh)" || echo "Falta algo: arréglalo antes de empezar."
exit $falta
