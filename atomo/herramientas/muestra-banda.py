"""Muestra de la banda sonora de UN episodio, para que el usuario la apruebe junto con su guion (desde el episodio 13).

    python3 atomo/herramientas/muestra-banda.py episodios/<carpeta>/escenas.json <salida.mp3> [--segundos 12]

La banda depende del tema y del guion: se diseña en el paso 2 de la skill hacer-video («banda» en plan.py) y esta
muestra se hace con ella, nunca con una banda genérica. Toma de escenas.json la banda y los ánimos en el orden en que
aparecen (cada uno una vez), monta una línea de tiempo de mentira (un tramo por ánimo, con la transición de una cartela
de año entre el segundo y el tercero), hace la música con banda.cjs tal cual sonará en el episodio, la normaliza a
−14 LUFS y la pasa a mp3. Imprime en qué segundo empieza cada ánimo.
"""
import json
import os
import subprocess
import sys
import tempfile

raiz = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
plan_ep = json.load(open(sys.argv[1], encoding='utf-8'))
salida = os.path.abspath(sys.argv[2])
seg = float(sys.argv[sys.argv.index('--segundos') + 1]) if '--segundos' in sys.argv else 12.0
if 'banda' not in plan_ep:
    sys.exit('escenas.json no tiene «banda»: defínela en plan.py con el guion (paso 2 de la skill)')
animos = []
for e in plan_ep['escenas']:
    if e.get('animo') and e['animo'] not in animos:
        animos.append(e['animo'])
d = tempfile.mkdtemp(prefix='muestra-banda-')
escenas, plan, t = [], [], 0.0
for k, a in enumerate(animos):
    escenas.append({'id': f'm{k}', 'inicio': t, 'duracion': seg, 'marcas': {}})
    plan.append({'id': f'm{k}', 'animo': a, 'cartela': k == 2})
    t += seg
json.dump({'duracion': t, 'escenas': escenas}, open(os.path.join(d, 'linea.json'), 'w'))
json.dump({'banda': plan_ep['banda'], 'escenas': plan}, open(os.path.join(d, 'escenas.json'), 'w'))
subprocess.run(['node', 'herramientas/banda.cjs', d, os.path.join(d, 'escenas.json')], cwd=os.path.join(raiz, 'atomo'), check=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(d, 'musica.wav'), '-af', 'loudnorm=I=-14:TP=-1.5', '-ar', '44100',
                '-b:a', '192k', salida], check=True)
for k, a in enumerate(animos):
    print(f'{int(k * seg // 60)}:{int(k * seg % 60):02d}  {a}' + ('  (entra con la transición de una cartela de año)' if k == 2 else ''))
print(salida)
