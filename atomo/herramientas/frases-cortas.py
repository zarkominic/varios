"""Revisión del canon de narración ANTES de presentar un guion (regla del usuario, 23/11/2026: «siempre haz esta
revisión antes de proponer un guion»).

    python3 atomo/herramientas/frases-cortas.py episodios/<carpeta>/guion.md [--max 9]

Lista, párrafo a párrafo (la columna ES de las filas de antes de «## Datos»), las oraciones de --max palabras o menos
(por omisión 9): las afirmaciones cortas y rápidas que suenan «a robot» («Los demás empiezan enseguida. Mary no.»,
«Y Mary escribe.»). Se permiten solo las del canon: la entrada de las pausas («Y fíjate en esto…»), la pregunta que
recoge la imagen del gancho y el cierre («Te leo en los comentarios.»); todo lo demás se reescribe como un momento
contado desde dentro, sin encadenar hechos. Sale con 1 si queda alguna que no sea del canon.
"""
import re
import sys

CANON = (r'^Y fíjate en esto', r'^¿Te acuerdas', r'^Te leo en los comentarios', r'^Y ahora te pregunto')
arch = sys.argv[1]
mx = int(sys.argv[sys.argv.index('--max') + 1]) if '--max' in sys.argv else 9
texto = open(arch, encoding='utf-8').read().split('## Datos')[0]
filas = [l.split(' | ')[0][2:] for l in texto.split('\n')
         if l.startswith('| ') and not l.startswith(('| **', '| ES', '| ---', '| Decorado'))]
malas = 0
for n, f in enumerate(filas, 1):
    oraciones = [o.strip() for o in re.split(r'(?<=[.!?»])\s+(?=[A-ZÁÉÍÓÚ¿«Y])', f) if o.strip()]
    for o in oraciones:
        if len(o.split()) <= mx:
            canon = any(re.match(c, o) for c in CANON)
            malas += not canon
            print(f'{"ok (canon)" if canon else "CORTA"}  {n:>2}  {o}')
print(f'{len(filas)} párrafos; {malas} oraciones cortas fuera del canon')
sys.exit(1 if malas else 0)
