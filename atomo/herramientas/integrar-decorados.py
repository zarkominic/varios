"""Integra en el archivo de decorados de un episodio (atomo/plato/escenas/<pref>-comun.js) el código que devuelven los
agentes de una pasada de decorados (desde el episodio 11).

    python3 atomo/herramientas/integrar-decorados.py atomo/plato/escenas/th-comun.js <journal.jsonl> [<journal.jsonl> …]

Cada journal.jsonl es el diario de un workflow cuyos agentes devuelven {functions: [{name, code}], helpers, notas}
(la plantilla está en .claude/skills/episodio-ask-atom/plantillas/agente-decorados.md). Para cada función:
- busca su bloque en el archivo, desde las líneas // de encima (sin la cabecera de sección «// ── …») hasta el siguiente
  function/const/let de nivel superior o la siguiente cabecera de sección, y lo cambia por el código del agente;
- añade al final los auxiliares (helpers) de cada agente: se evalúan después de C, pal y hex, así que el final del
  archivo es un sitio seguro.
Después quita las cabeceras de sección repetidas («// ── …»), que aparecen cuando un agente devuelve la suya.
Al terminar hay que comprobar la sintaxis (copiar a .mjs y node --check) y capturar las escenas.
"""
import json
import re
import sys

ruta = sys.argv[1]
s = open(ruta, encoding='utf-8').read()


def bloque(nombre):
    m = re.search(r'^(export )?function ' + re.escape(nombre) + r'\(', s, re.M)
    if not m:
        return None
    lineas = s[:m.start()].split('\n')
    n = len(lineas) - 1
    while n > 0 and lineas[n - 1].startswith('//') and not lineas[n - 1].startswith('// ──'):
        n -= 1
    inicio = len('\n'.join(lineas[:n])) + 1
    m2 = re.search(r'\n(// [^\n]*\n)*(export )?(function|const|let) |\n// ── ', s[m.end():])
    fin = m.end() + m2.start() + 1 if m2 else len(s)
    return inicio, fin


hechas, faltan = [], []
for diario in sys.argv[2:]:
    for linea in open(diario, encoding='utf-8'):
        d = json.loads(linea)
        if d.get('type') != 'result' or not isinstance(d.get('result'), dict):
            continue
        r = d['result']
        for f in r.get('functions', []):
            b = bloque(f['name'])
            if not b:
                faltan.append(f['name'])
                continue
            s = s[:b[0]] + f['code'].strip('\n') + '\n' + s[b[1]:]
            hechas.append(f['name'])
        if r.get('helpers', '').strip():
            s = s.rstrip('\n') + '\n\n' + r['helpers'].strip('\n') + '\n'

# las cabeceras de sección repetidas
vistas, salida = set(), []
for l in s.split('\n'):
    if l.startswith('// ── '):
        if l in vistas:
            continue
        vistas.add(l)
    salida.append(l)
open(ruta, 'w', encoding='utf-8').write('\n'.join(salida))
print(f'{len(hechas)} funciones integradas: {", ".join(hechas)}')
if faltan:
    print(f'NO ENCONTRADAS en {ruta} (añádelas a mano): {", ".join(faltan)}')
