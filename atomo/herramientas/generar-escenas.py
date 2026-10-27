"""Escribe el primer borrador de las escenas de un episodio (paso 6 de la skill hacer-video), con el andamiaje del 11.

    python3 atomo/herramientas/generar-escenas.py <pref> <ep> episodios/<carpeta>/borrador-escenas/*.py [--destino carpeta] [--pisar]

Cada módulo define E = {id: (titulo, comentario, cuerpo)}:
- comentario: el comentario de cabecera (/* … */ o // …) con lo que pasa en cada plano;
- cuerpo: el código de la escena. Tiene a mano T (<pref>-comun.js), EL (ELENCO_CHIBI), E, R, M, tramo, lerp, hex y
  en(k, f) = T.momento(M, k, f). Sus líneas «import …» suben arriba. Acaba con T.rodar(E, R, [[0, p1], [en('x', .4), p2], …],
  { efectos, cartela, año }).
Escribe atomo/plato/escenas/<id>.html (o en --destino). No pisa una escena que ya existe salvo con --pisar (para volver a
generar el borrador con la voz real, antes de las pasadas). Es solo para el primer borrador: desde la pasada de movimiento
las escenas se editan directamente en su .html y el generador ya no se vuelve a usar.
"""
import importlib.util
import os
import sys

args = sys.argv[1:]
destino = None
pisar = '--pisar' in args
args = [a for a in args if a != '--pisar']
if '--destino' in args:
    i = args.index('--destino')
    destino = args[i + 1]
    del args[i:i + 2]
pref, ep, modulos = args[0], args[1], args[2:]
raiz = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
destino = destino or os.path.join(raiz, 'atomo/plato/escenas')

todas = {}
for ruta in modulos:
    spec = importlib.util.spec_from_file_location(os.path.splitext(os.path.basename(ruta))[0], ruta)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    todas.update(m.E)

os.makedirs(destino, exist_ok=True)
ya = [i for i in todas if os.path.exists(os.path.join(destino, i + '.html'))]
if ya and not pisar:
    sys.exit(f'Ya existen {len(ya)} escenas ({", ".join(ya[:4])}{"…" if len(ya) > 4 else ""}) en {destino}: no las piso. '
             'Para volver a generar el borrador, --pisar; si ya pasaron las pasadas, edita los .html.')
for id_, (titulo, comentario, cuerpo) in todas.items():
    lineas = cuerpo.strip('\n').split('\n')
    imports_extra = ''.join(l + '\n' for l in lineas if l.startswith('import '))
    cuerpo = '\n'.join(l for l in lineas if not l.startswith('import '))
    html = f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{titulo} · {ep}</title>
<style>html, body {{ margin: 0; height: 100%; background: #04050d; overflow: hidden; }} canvas {{ display: block; position: fixed; inset: 0; }}</style>
</head>
<body>
<canvas id="lienzo"></canvas>
<script type="module">
{comentario}
import * as T from '/atomo/plato/escenas/{pref}-comun.js';
import {{ ELENCO_CHIBI as EL }} from '/atomo/plato/kits/pixel-chibi.js';
{imports_extra}const {{ E, R, M }} = await T.preparar('{id_}');
const {{ tramo, lerp, hex }} = R;
const en = (k, f) => T.momento(M, k, f);
{cuerpo}
</script>
</body>
</html>
'''
    open(os.path.join(destino, id_ + '.html'), 'w', encoding='utf-8').write(html)
print(f'{len(todas)} escenas en {destino}')
