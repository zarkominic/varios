"""Marcas provisionales de un episodio, para escribir y probar las escenas mientras se locuta la voz (paso 3 de la skill
hacer-video). Escribe el mismo formato que locutar_frases.py --marcas, con tiempos estimados.

    python3 atomo/herramientas/marcas-provisionales.py episodios/<carpeta>/guion.json atomo/plato/escenas/marcas-<ep>.json

- Cada frase dura lo que sus letras en inglés (el texto que se locuta) ÷ 15,5 letras por segundo (am_puck a 0,85).
- Antes de hablar, 0,5 s (1,5 s con cartela; 1,4 s al empezar un acto). Detrás de cada frase, la pausa de su último signo,
  como en locutar_frases.py. Al final, 0,7 s.
Se escribe ANTES de lanzar la locución, que lo sustituye por las marcas reales. Si ya hay voz (atomo/build/largo/<ep>/
linea.json), no lo pisa salvo con --pisar.
"""
import json
import os
import sys

pisar = '--pisar' in sys.argv
sys.argv = [a for a in sys.argv if a != '--pisar']
ep = os.path.basename(sys.argv[2]).removeprefix('marcas-').removesuffix('.json')
linea = os.path.join(os.path.dirname(__file__), '..', 'build', 'largo', ep, 'linea.json')
if os.path.exists(linea) and os.path.exists(sys.argv[2]) and not pisar:
    sys.exit(f'Ya hay voz de {ep} ({os.path.normpath(linea)}): {sys.argv[2]} tiene las marcas reales y no lo piso (--pisar para forzarlo).')

LETRAS_POR_S = 15.5
ENTRADA, ENTRADA_CARTELA, ENTRADA_ACTO, SALIDA = 0.5, 1.5, 1.4, 0.7
PAUSA = {'.': 0.8, '?': 0.9, '!': 0.85, ':': 0.6}

g = json.load(open(sys.argv[1], encoding='utf-8'))
principal = g.get('principal', 'en')
salida = {}
for e in g['escenas']:
    t = ENTRADA_CARTELA if e.get('cartela') else ENTRADA
    if e['frases'][0].get('acto'):
        t = max(t, ENTRADA_ACTO)
    voz0, marcas, frases = t, {}, []
    for k, f in enumerate(e['frases']):
        texto = f.get(f'{principal}_voz', f[principal])
        d = len(texto) / LETRAS_POR_S
        marcas[f['marca']] = round(t, 3)
        marcas[f['marca'] + '_fin'] = round(t + d, 3)
        frases.append([round(t, 3), round(t + d, 3)])
        t += d
        if k + 1 < len(e['frases']):
            t += f.get('pausa', PAUSA.get(f[principal].rstrip('»"\'')[-1:], 0.55))
    salida[e['id']] = {'duracion': round(t + SALIDA, 3), 'marcas': marcas, 'voz': [voz0, round(t, 3)], 'fps': 30,
                       'frases': frases, **({'cartela': e['cartela']} if e.get('cartela') else {})}
json.dump(salida, open(sys.argv[2], 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
total = sum(x['duracion'] for x in salida.values())
print(f'{len(salida)} escenas, {int(total // 60)}:{int(total % 60):02d} estimados → {sys.argv[2]} (provisional)')
