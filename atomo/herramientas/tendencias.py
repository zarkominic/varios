"""Registro de búsquedas en tendencia en EE. UU. (Google Trends, RSS oficial y público, sin clave).

Uso: python3 atomo/herramientas/tendencias.py [--geo US]

- Lee https://trends.google.com/trending/rss?geo=US: las búsquedas que se disparan ahora, con su tráfico aproximado y
  las noticias que las explican. El RSS solo da la foto del momento; el historial lo construye este registro.
- Añade lo nuevo a episodios/tendencias/registro.jsonl (una línea por búsqueda y día; si ya estaba ese día, se queda el
  tráfico más alto) y rehace episodios/tendencias/resumen.md: qué búsquedas se repiten en más días, con su tráfico y sus
  noticias, para elegir temas de episodio.
- Se ejecuta a diario con una tarea programada (decidido el 26 de octubre de 2026). Para comparar temas a fondo (interés en
  el tiempo, búsquedas relacionadas) el usuario exporta el CSV desde trends.google.com: esa parte de Google no admite
  lectura automática desde un servidor.
"""
import json
import os
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from collections import defaultdict
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

RAIZ = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', '..'))
CARPETA = os.path.join(RAIZ, 'episodios', 'tendencias')
geo = sys.argv[sys.argv.index('--geo') + 1] if '--geo' in sys.argv else 'US'
HT = '{https://trends.google.com/trending/rss}'


def trafico(t):
    """«2000+» → 2000; «1M+» → 1000000."""
    m = re.match(r'([\d.,]+)\s*([KM]?)', (t or '').replace(',', ''))
    if not m:
        return 0
    return int(float(m.group(1)) * {'': 1, 'K': 1_000, 'M': 1_000_000}[m.group(2)])


xml = urllib.request.urlopen(urllib.request.Request(f'https://trends.google.com/trending/rss?geo={geo}', headers={'User-Agent': 'ASK-Atom-tendencias'}), timeout=30).read()
ahora = datetime.now(timezone.utc)
nuevas = []
for it in ET.fromstring(xml).iter('item'):
    fecha = parsedate_to_datetime(it.findtext('pubDate')) if it.findtext('pubDate') else ahora
    noticias = [{'titulo': n.findtext(f'{HT}news_item_title'), 'url': n.findtext(f'{HT}news_item_url'), 'fuente': n.findtext(f'{HT}news_item_source')}
                for n in it.iter(f'{HT}news_item')]
    nuevas.append({'dia': fecha.astimezone(timezone.utc).date().isoformat(), 'busqueda': it.findtext('title').strip(), 'trafico': trafico(it.findtext(f'{HT}approx_traffic')),
                   'geo': geo, 'leido': ahora.isoformat(timespec='minutes'), 'noticias': noticias[:3]})

os.makedirs(CARPETA, exist_ok=True)
ruta = os.path.join(CARPETA, 'registro.jsonl')
registro = {}
if os.path.exists(ruta):
    for linea in open(ruta, encoding='utf-8'):
        r = json.loads(linea); registro[(r['dia'], r['geo'], r['busqueda'].lower())] = r
añadidas = 0
for r in nuevas:
    k = (r['dia'], r['geo'], r['busqueda'].lower())
    if k not in registro:
        añadidas += 1
    if k not in registro or r['trafico'] > registro[k]['trafico']:
        registro[k] = r
filas = sorted(registro.values(), key=lambda r: (r['dia'], -r['trafico']))
with open(ruta, 'w', encoding='utf-8') as f:
    for r in filas:
        f.write(json.dumps(r, ensure_ascii=False) + '\n')

# el resumen: búsquedas agrupadas, ordenadas por días en que aparecen y por tráfico
grupo = defaultdict(lambda: {'dias': set(), 'trafico': 0, 'noticias': []})
for r in filas:
    g = grupo[r['busqueda'].lower()]
    g['dias'].add(r['dia']); g['trafico'] = max(g['trafico'], r['trafico']); g['nombre'] = r['busqueda']
    for n in r['noticias']:
        if n['titulo'] and n['titulo'] not in [x['titulo'] for x in g['noticias']]:
            g['noticias'].append(n)
dias = sorted({r['dia'] for r in filas})
lineas = [f'# Búsquedas en tendencia en EE. UU.', '',
          f'Registro diario del RSS de Google Trends ({len(dias)} días: {dias[0]} → {dias[-1]}; {len(grupo)} búsquedas distintas).',
          'Generado por `atomo/herramientas/tendencias.py`; no se edita a mano.', '',
          '| Días | Tráfico máx. | Búsqueda | Noticia que la explica |', '|---:|---:|---|---|']
for g in sorted(grupo.values(), key=lambda g: (-len(g['dias']), -g['trafico'])):
    n = g['noticias'][0] if g['noticias'] else None
    noticia = f"[{n['titulo'].replace('|', '/')}]({n['url']}) ({n['fuente']})" if n else ''
    lineas.append(f"| {len(g['dias'])} | {g['trafico']:,} | {g['nombre'].replace('|', '/')} | {noticia} |".replace(',', '.'))
open(os.path.join(CARPETA, 'resumen.md'), 'w', encoding='utf-8').write('\n'.join(lineas) + '\n')
print(f'{len(nuevas)} en el RSS, {añadidas} nuevas; registro: {len(filas)} filas, {len(dias)} días')
