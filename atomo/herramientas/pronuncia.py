"""Propone, para el PRONUNCIA de un episodio nuevo, las pronunciaciones que ya se corrigieron en otros (desde el 13).

    python3 atomo/herramientas/pronuncia.py episodios/<carpeta>/guion.md [--anadir]

Lee las frases del guion (las filas | ES | EN | de antes de «## Datos») y busca en ellas cada entrada de
atomo/plato/pronuncia.json. Imprime las que salen, listas para pegar en PRONUNCIA['en'] y PRONUNCIA['es'] de su
hacer_guion.py. No cambia nada: algunas entradas son arreglos de una frase concreta y hay que mirarlas.

Con --anadir, al revés: guarda en pronuncia.json las entradas del PRONUNCIA del hacer_guion.py de esa carpeta que aún no
estén (hazlo al acabar la voz de cada episodio, con las que de verdad funcionaron).
"""
import ast
import json
import os
import re
import sys

raiz = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
ruta_dic = os.path.join(raiz, 'atomo/plato/pronuncia.json')
dic = json.load(open(ruta_dic, encoding='utf-8'))
guion = sys.argv[1]
carpeta = os.path.dirname(os.path.abspath(guion))

if '--anadir' in sys.argv:
    s = open(os.path.join(carpeta, 'hacer_guion.py'), encoding='utf-8').read()
    propio = ast.literal_eval(re.search(r'^PRONUNCIA = (\{.*?\n\})', s, re.M | re.S).group(1))
    ep, n = os.path.basename(carpeta), 0
    for l in ('en', 'es'):
        ya = {e[0] for e in dic[l]}
        for x, y in propio.get(l, []):
            if x not in ya:
                dic[l].append([x, y, ep]); n += 1
        dic[l].sort(key=lambda e: -len(e[0]))
    json.dump(dic, open(ruta_dic, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'{n} entradas nuevas de {ep} en pronuncia.json')
    sys.exit(0)

md = open(guion, encoding='utf-8').read().split('## Datos')[0]
filas = [[c.strip() for c in l.strip().strip('|').split('|')] for l in md.split('\n') if l.startswith('|') and l.count('|') >= 3]
texto = {'es': ' '.join(f[0] for f in filas if len(f) >= 2), 'en': ' '.join(f[1] for f in filas if len(f) >= 2)}
for l in ('en', 'es'):
    hay = [e for e in dic[l] if re.search(r'(?<![\w])' + re.escape(e[0]) + r'(?![\w])', texto[l])]
    print(f"PRONUNCIA['{l}'] (ya corregidas en otros episodios):")
    print('    ' + (', '.join(f"('{x}', '{y}')" for x, y, _ in hay) or '(ninguna)'))
    for x, y, ep in hay:
        print(f'      · {x} → {y}  ({ep})')
