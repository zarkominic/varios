"""Capítulos de YouTube de un episodio, sacados del montaje (paso 11 de la skill hacer-video).

    python3 atomo/herramientas/capitulos.py <ep> episodios/<carpeta>

Cada capítulo empieza en el «inicio» (atomo/build/largo/<ep>/linea.json) de la escena que lleva la primera frase de un
acto (guion.json, frases con «acto»); el primero, en 0:00. Imprime «m:ss  título del acto» con los títulos de los
«## N · …» de guion.md, en español: los títulos cortos para la ficha (en los dos idiomas) se escriben a partir de estos.
"""
import json
import os
import re
import sys

ep, carpeta = sys.argv[1], sys.argv[2]
raiz = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
linea = json.load(open(os.path.join(raiz, 'atomo/build/largo', ep, 'linea.json'), encoding='utf-8'))
guion = json.load(open(os.path.join(raiz, carpeta, 'guion.json'), encoding='utf-8'))
md = open(os.path.join(raiz, carpeta, 'guion.md'), encoding='utf-8').read().split('## Datos')[0]
titulos = [t.strip() for t in re.findall(r'^## \d+ · (.+)$', md, re.M)]
inicio = {e['id']: e['inicio'] for e in linea['escenas']}
tiempos = [0.0] + [inicio[e['id']] for e in guion['escenas'] if any(f.get('acto') for f in e['frases']) and inicio.get(e['id'], 0) > 0]
if len(tiempos) != len(titulos):
    print(f'AVISO: {len(tiempos)} comienzos de acto y {len(titulos)} títulos «## N ·» en guion.md', file=sys.stderr)
for k, t in enumerate(tiempos):
    print(f'{int(t // 60)}:{int(t % 60):02d}  {titulos[k] if k < len(titulos) else "?"}')
