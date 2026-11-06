"""Lo que suspendió la pasada de calidad de un episodio, por tipo de fallo y por escena (paso 15 de la skill hacer-video).

    python3 atomo/herramientas/aprendizaje.py <journal.jsonl del workflow de calidad> [<otro journal> …]

Lee los resultados de revisor, escéptico y verificador (sus «planos» con «fallos») y cuenta los fallos por tipo (los
ocho de NIVEL-RESUMEN.md y algunos más) y las escenas con más fallos. Es lo que se apunta en episodios/APRENDIZAJES.md
para comparar un episodio con el anterior y decidir qué se refuerza en el borrador.
"""
import collections
import json
import re
import sys

TIPOS = {
    'composición repetida': r'repet|mismo encuadre|composici',
    'algo no se lee': r'pequeñ|no se lee|legib|tamañ|diminut|se pierde',
    'orden de dibujo / flota': r'tapa|delante|detrás|orden de dibujo|flota|encima de',
    'brazo o mano': r'brazo|mano|manga',
    'sincronía con la voz': r'sincron|llega tarde|antes de que|palabra|desfas',
    'quieto o sin vida': r'quiet|estátic|estatic|sin vida|tieso|no se mueve',
    'liso o poco detalle': r'liso|vací|vaci|poco detalle|pobre|sin textura',
    'zona de Atom o barra del año': r'zona de atom|barra del año|detrás de atom',
    'letras en pantalla': r'letra|texto',
}
tipos, escenas, total, planos = collections.Counter(), collections.Counter(), 0, set()
for ruta in sys.argv[1:]:
    for linea in open(ruta, encoding='utf-8'):
        x = json.loads(linea)
        if x.get('type') != 'result' or not isinstance(x.get('result'), dict):
            continue
        for p in x['result'].get('planos') or []:
            if not isinstance(p, dict) or not p.get('fallos'):
                continue
            planos.add((p.get('escena'), p.get('plano')))
            for f in p['fallos']:
                s = (f if isinstance(f, str) else json.dumps(f, ensure_ascii=False)).lower()
                total += 1
                escenas[p.get('escena', '?')] += 1
                for k, pat in TIPOS.items():
                    if re.search(pat, s):
                        tipos[k] += 1
print(f'{total} fallos en {len(planos)} planos distintos')
for k, n in tipos.most_common():
    print(f'  {n:3}  {k}')
print('escenas con más fallos: ' + ', '.join(f'{e} ({n})' for e, n in escenas.most_common(6)))
