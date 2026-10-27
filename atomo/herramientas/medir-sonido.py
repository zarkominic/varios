"""Mide el sonido de un episodio contra ESTANDAR.md y sale con 1 si algo no cumple (desde el episodio 11).

    $VOZ/venv/bin/python atomo/herramientas/medir-sonido.py atomo/build/largo/ep11 episodios/11-theranos/escenas.json \\
        [--video atomo/build/salida/ep11.mp4] [--pista atomo/build/salida/ep11-es.mp3]

- Nivel final (con --video y --pista): −14 LUFS ±0,5 y pico por debajo de −0,5 dBFS, en las dos pistas (ebur128).
- Efectos (efectos.wav contra voz-en.wav y voz-es.wav, en ventanas de 0,5 s): el % del tiempo con algún efecto sonando
  (> −45 dB) y cuánto quedan por debajo de la voz cuando suenan a la vez (mediana y p10). Cada voz se lleva antes a
  −19 dB RMS, como hace montar-largo.sh al mezclar (Kokoro en español sale unos 5 dB más bajo): así se mide lo que se oye
  en cada pista.
- Música continua (musica.wav, ventanas de 0,1 s): en cada cartela de año, el nivel antes (−1,5…−0,5 s), el mínimo en
  ±2,5 s y el nivel después. La caída no pasa de ~7 dB y nunca llega al silencio.
Necesita numpy y soundfile: el python del entorno de voz ($VOZ/venv/bin/python).
"""
import json
import re
import subprocess
import sys

import numpy as np
import soundfile as sf

args = sys.argv[1:]
opcion = lambda n: args.pop(args.index(n) + 1) if n in args else None
video, pista = opcion('--video'), opcion('--pista')
D, plan = args[:2]
mal = []


def nota(ok, texto):
    print(('  ok    ' if ok else '  MAL   ') + texto)
    if not ok:
        mal.append(texto)


def mono(f):
    a, sr = sf.read(f)
    return (a.mean(1) if a.ndim > 1 else a), sr


def ventanas(x, sr, s):
    w = int(s * sr)
    n = len(x) // w
    return 10 * np.log10((x[:n * w].reshape(n, w) ** 2).mean(1) + 1e-12)


print('Nivel final:')
for f in (video, pista):
    if not f:
        continue
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', f, '-map', '0:a:0', '-af', 'ebur128=peak=true',
                        '-f', 'null', '-'], capture_output=True, text=True).stderr
    resumen = r[r.rfind('Summary:'):]
    lufs = float(re.search(r'I:\s+(-?[\d.]+) LUFS', resumen).group(1))
    pico = float(re.search(r'Peak:\s+(-?[\d.]+|-inf) dBFS', resumen).group(1))
    nota(abs(lufs + 14) <= 0.5 and pico < -0.5, f'{f}: {lufs:.1f} LUFS, pico {pico:.1f} dBFS (−14 ±0,5; pico < −0,5)')

print('Efectos:')
e, sr = mono(f'{D}/efectos.wav')
ed = ventanas(e, sr, 0.5)
activo = 100 * np.mean(ed > -45)
nota(40 <= activo <= 65, f'algún efecto sonando el {activo:.0f} % del tiempo (el 11: 58 %; entre 40 y 65)')
for l in ('en', 'es'):
    try:
        v, _ = mono(f'{D}/voz-{l}.wav')
    except Exception:
        continue
    r = ventanas(v, sr, 0.4)
    vd = ventanas(v, sr, 0.5) + (-19 - np.median(r[r > -40]))   # la ganancia que le da montar-largo.sh
    m = min(len(vd), len(ed))
    juntos = (vd[:m] > -35) & (ed[:m] > -45)
    d = vd[:m][juntos] - ed[:m][juntos]
    nota(13.5 <= np.median(d) <= 19 and np.percentile(d, 10) >= 6,
         f'voz {l} − efectos cuando suenan a la vez: mediana {np.median(d):.1f} dB, p10 {np.percentile(d, 10):.1f} dB '
         f'(el 11: 15,6 en inglés y 15,3 en español; mediana 13,5–19 y p10 de 6 o más)')

print('Música en los cambios de año:')
m, sr = mono(f'{D}/musica.wav')
md = ventanas(m, sr, 0.1)
linea = json.load(open(f'{D}/linea.json'))
cartela = {e['id']: e.get('cartela') for e in json.load(open(plan))['escenas']}
peor = 0
for e in linea['escenas']:
    t = e['inicio']
    if t < 1 or not cartela.get(e['id']):
        continue
    i = int(t * 10)
    antes, minimo, despues = md[i - 15:i - 5].mean(), md[max(0, i - 25):i + 25].min(), md[i + 5:i + 15].mean()
    caida = antes - minimo
    peor = max(peor, caida)
    nota(caida <= 8 and minimo > -60, f'{cartela[e["id"]]} {e["id"]:16} antes {antes:6.1f}  mínimo {minimo:6.1f}  '
                                     f'después {despues:6.1f} dB (cae {caida:.1f} dB)')
print(f'Peor caída de la música en una cartela: {peor:.1f} dB (el 11: 3–7 dB).')
if mal:
    print(f'{len(mal)} cosas no cumplen ESTANDAR.md: corrígelas antes de entregar.')
sys.exit(1 if mal else 0)
