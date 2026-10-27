"""Integra en el archivo de decorados de un episodio (atomo/plato/escenas/<pref>-comun.js) lo que hizo cada agente de
una pasada de decorados (desde el episodio 11).

    python3 atomo/herramientas/integrar-decorados.py atomo/plato/escenas/th-comun.js \\
        --copia atomo/plato/escenas/_tmp_A/th-comun.js farmacia,sillonDelante,revista \\
        --copia atomo/plato/escenas/_tmp_B/th-comun.js insertoTubos,cucharaMesa …

Cada agente trabaja en su copia (_tmp_<G>/<pref>-comun.js) y la deja probada con capturas; la copia es la verdad.
Para cada copia:
- cambia en el archivo cada función de su lista por el bloque de la copia: desde las líneas // de encima (sin la
  cabecera de sección «// ── …») hasta la siguiente declaración de nivel superior o la siguiente cabecera de sección;
- añade al final las declaraciones nuevas de la copia (auxiliares <g>_…, con sus comentarios): se evalúan después de
  C, pal y hex, así que el final del archivo es un sitio seguro;
- AVISA, sin tocarlas, de las funciones que la copia cambió y no son de su lista (por ejemplo cielo(), que es de
  todos) y de los import nuevos: eso se mira a mano.
Después quita las cabeceras de sección repetidas. Al terminar hay que comprobar la sintaxis (copiar a .mjs y
node --check) y capturar las escenas.

También acepta, como en el episodio 11, diarios de workflow (journal.jsonl) cuyos agentes devuelven
{functions: [{name, code}], helpers}: python3 … th-comun.js <journal.jsonl> [<journal.jsonl> …]
"""
import json
import re
import sys

DECL = re.compile(r'^(?:export )?(?:async )?(?:function\*? |const |let |class )([A-Za-z_$][\w$]*)', re.M)
SIGUE = re.compile(r'\n(// [^\n]*\n)*(export )?(async )?(function|const|let|class) |\n// ── ')


def declaraciones(s):
    return {m.group(1): m for m in DECL.finditer(s)}


def bloque(s, nombre):
    """(inicio, fin) del bloque de la declaración de nivel superior «nombre» en s, con su comentario de encima."""
    m = declaraciones(s).get(nombre)
    if not m:
        return None
    lineas = s[:m.start()].split('\n')
    n = len(lineas) - 1
    while n > 0 and lineas[n - 1].startswith('//') and not lineas[n - 1].startswith('// ──'):
        n -= 1
    inicio = len('\n'.join(lineas[:n])) + (1 if n else 0)
    m2 = SIGUE.search(s, m.end())
    fin = m2.start() + 1 if m2 else len(s)
    return inicio, fin


def texto(s, nombre):
    b = bloque(s, nombre)
    return s[b[0]:b[1]].strip('\n') if b else None


def cambiar(s, nombre, codigo):
    b = bloque(s, nombre)
    return s[:b[0]] + codigo.strip('\n') + '\n' + s[b[1]:] if b else None


ruta, resto = sys.argv[1], sys.argv[2:]
s = open(ruta, encoding='utf-8').read()
original = s
hechas, faltan, avisos = [], [], []

i = 0
while i < len(resto):
    if resto[i] == '--copia':
        copia, lista = resto[i + 1], [f for f in resto[i + 2].split(',') if f]
        i += 3
        c = open(copia, encoding='utf-8').read()
        for f in lista:
            codigo = texto(c, f)
            nuevo = cambiar(s, f, codigo) if codigo else None
            if nuevo is None:
                faltan.append(f'{f} ({copia})')
                continue
            s = nuevo
            hechas.append(f)
        de_orig, de_copia = declaraciones(original), declaraciones(c)
        nuevas = [n for n in de_copia if n not in de_orig and n not in declaraciones(s)]
        for n in nuevas:
            s = s.rstrip('\n') + '\n\n' + texto(c, n) + '\n'
        if nuevas:
            hechas.append(f'+{len(nuevas)} auxiliares de {copia}')
        for n in de_copia:
            if n in de_orig and n not in lista and texto(c, n) != texto(original, n):
                avisos.append(f'{copia} también cambia «{n}», que no es de su lista: no se ha integrado; míralo a mano')
        imp_o = set(re.findall(r'^import .*$', original, re.M))
        for l in re.findall(r'^import .*$', c, re.M):
            if l not in imp_o:
                avisos.append(f'{copia} trae un import nuevo: {l}')
    else:
        for linea in open(resto[i], encoding='utf-8'):
            d = json.loads(linea)
            if d.get('type') != 'result' or not isinstance(d.get('result'), dict):
                continue
            r = d['result']
            for f in r.get('functions', []):
                nuevo = cambiar(s, f['name'], f['code'])
                if nuevo is None:
                    faltan.append(f['name'])
                    continue
                s = nuevo
                hechas.append(f['name'])
            if r.get('helpers', '').strip():
                s = s.rstrip('\n') + '\n\n' + r['helpers'].strip('\n') + '\n'
        i += 1

# las cabeceras de sección repetidas
vistas, salida = set(), []
for l in s.split('\n'):
    if l.startswith('// ── '):
        if l in vistas:
            continue
        vistas.add(l)
    salida.append(l)
open(ruta, 'w', encoding='utf-8').write('\n'.join(salida))
print(f'{len(hechas)} integradas: {", ".join(hechas)}')
if faltan:
    print(f'NO ENCONTRADAS (añádelas a mano): {", ".join(faltan)}')
for a in avisos:
    print('AVISO:', a)
