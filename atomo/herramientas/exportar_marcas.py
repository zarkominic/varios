"""Copia duración, marcas y veredictos de cada escena de linea.json al archivo de marcas que usan
las páginas de escena en la vista previa (atomo/plato/escenas/marcas-<episodio>.json).

Uso: python exportar_marcas.py <linea.json> <salida.json>
"""
import json, sys
L = json.load(open(sys.argv[1]))
veredictos = [e['veredicto'] for e in L['escenas'] if e.get('veredicto')]
out = {}
for e in L['escenas']:
    d = {'duracion': e['duracion'], 'marcas': e['marcas'], 'voz': e.get('voz'), 'fps': L['fps']}
    if e.get('veredicto'):
        d.update(n=e['n'], veredicto=e['veredicto'])
    if e.get('veredicto') or e['id'] in ('gancho', 'recuento', 'despedida'):
        d['resultados'] = veredictos
    out[e['id']] = d
json.dump(out, open(sys.argv[2], 'w'), ensure_ascii=False, indent=1)
print(len(out), 'escenas ->', sys.argv[2])
