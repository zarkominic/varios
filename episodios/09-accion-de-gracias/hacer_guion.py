"""Genera guion.json (el que leen locutar_frases.py y el plató) a partir de guion.md y escenas.json.

Uso: python3 episodios/08-egipcios/hacer_guion.py

- guion.md manda en el texto: las frases son las filas | ES | EN | de sus tablas, en orden.
- escenas.json manda en el reparto: qué frases van en cada escena, su estilo, su cartela, el nombre de
  la marca de cada frase y el guion visual.
- Lo que el sintetizador leería mal se locuta escrito como se dice («<idioma>_voz»): los años (también los de tres
  cifras: «four seventy-six», «cuatrocientos setenta y seis»).
  Los subtítulos usan el texto original.
"""
import json, os, re

D = os.path.dirname(os.path.abspath(__file__))
md = open(f'{D}/guion.md').read().split('## Datos')[0]
filas = [(m.group(1), m.group(2)) for m in re.finditer(r'^\| (.+?) \| (.+?) \|$', md, re.M) if m.group(1) not in ('ES', '---', 'Decorado') and not m.group(1).startswith('**')]
plan = json.load(open(f'{D}/escenas.json'))
# Primera frase de cada acto («## N · …»): lleva un silencio más largo delante, como un título.
ACTOS, n = set(), 0
for linea in md.splitlines():
    if re.match(r'^## \d+ ·', linea):
        ACTOS.add(n + 1)
    m = re.match(r'^\| (.+?) \| (.+?) \|$', linea)
    if m and m.group(1) not in ('ES', '---', 'Decorado') and not m.group(1).startswith('**'):
        n += 1
assert n == len(filas)

UNI_EN = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split()
DEC_EN = {2: 'twenty', 3: 'thirty', 4: 'forty', 5: 'fifty', 6: 'sixty', 7: 'seventy', 8: 'eighty', 9: 'ninety'}

def dos_en(n):
    return UNI_EN[n] if n < 20 else DEC_EN[n // 10] + ('-' + UNI_EN[n % 10] if n % 10 else '')

def anyo_en(a):
    """1676 → sixteen seventy-six; 1909 → nineteen oh-nine; 2017 → twenty seventeen; 2000 → two thousand."""
    alto, bajo = divmod(a, 100)
    if bajo == 0:
        return 'two thousand' if a == 2000 else f'{dos_en(alto)} hundred'
    return f"{dos_en(alto)} {'oh-' + UNI_EN[bajo] if bajo < 10 else dos_en(bajo)}"

UNI_ES = ('cero uno dos tres cuatro cinco seis siete ocho nueve diez once doce trece catorce quince dieciséis '
          'diecisiete dieciocho diecinueve veinte veintiuno veintidós veintitrés veinticuatro veinticinco '
          'veintiséis veintisiete veintiocho veintinueve').split()
DEC_ES = {3: 'treinta', 4: 'cuarenta', 5: 'cincuenta', 6: 'sesenta', 7: 'setenta', 8: 'ochenta', 9: 'noventa'}
CEN_ES = {1: 'ciento', 2: 'doscientos', 3: 'trescientos', 4: 'cuatrocientos', 5: 'quinientos', 6: 'seiscientos',
          7: 'setecientos', 8: 'ochocientos', 9: 'novecientos'}

def dos_es(n):
    return UNI_ES[n] if n < 30 else DEC_ES[n // 10] + (' y ' + UNI_ES[n % 10] if n % 10 else '')

def anyo_es(a):
    """1676 → mil seiscientos setenta y seis; 2019 → dos mil diecinueve."""
    mil, resto = divmod(a, 1000)
    c, d = divmod(resto, 100)
    partes = ['mil' if mil == 1 else f'{UNI_ES[mil]} mil']
    if c:
        partes.append('cien' if c == 1 and d == 0 else CEN_ES[c])
    if d:
        partes.append(dos_es(d))
    return ' '.join(partes)

def corto_en(a):
    """Años de tres cifras como se dicen: 476 → four seventy-six; 509 → five oh-nine; 410 → four ten; 800 → eight hundred."""
    alto, bajo = divmod(a, 100)
    if bajo == 0:
        return f'{UNI_EN[alto]} hundred'
    return f"{UNI_EN[alto]} {'oh-' + UNI_EN[bajo] if bajo < 10 else dos_en(bajo)}"

def corto_es(a):
    c, d = divmod(a, 100)
    return ('cien' if c == 1 and d == 0 else CEN_ES[c]) + (' ' + dos_es(d) if d else '')

def hablado(texto, l):
    t = re.sub(r'\b(1[0-9]{3}|20[0-9]{2})\b', lambda m: (anyo_en if l == 'en' else anyo_es)(int(m.group(1))), texto)
    t = re.sub(r'\b([1-9][0-9]{2})\b', lambda m: (corto_en if l == 'en' else corto_es)(int(m.group(1))), t)
    if l == 'en':
        t = t.replace(' BC', ' B.C.')
    # Nombres que el sintetizador lee mal: se escriben como se dicen (en español, «Halloween» se dice «jálouin»)
    for x, y in PRONUNCIA[l]:
        t = t.replace(x, y)
    return t

PRONUNCIA = {
    # el inglés lo locuta Chatterbox, que lee bien los nombres; solo las décadas y los años que se dicen de otra forma
    'en': [('the 1950s', 'the nineteen-fifties'), ('the 1980s', 'the nineteen-eighties'), ('the 2010s', 'the twenty-tens'),
           ('twenty oh-five', 'two thousand five'), ('nineteen thirty-nine. November', 'Nineteen thirty-nine. November')],
    'es': [('Massachusetts', 'Masachúsets'), ('Mayflower', 'Méiflauer'), ('wampanoag', 'uampanóag'), ('Tisquantum', 'Tiskuántum'),
           ('Squanto', 'Skuánto'), ('Massasoit', 'Masasóit'), ('Sarah Josepha Hale', 'Sara Yoséfa Jéil'), ('Lincoln', 'Línkon'),
           ('Roosevelt', 'Rúsvelt'), ('Franksgiving', 'Fránksguivin'), ('Black Friday', 'blak fráidei'),
           ('Cyber Monday', 'sáiber mándei'), ('nuggets', 'náguets'), ('Santa Claus', 'Santa Clós')],
}

# Silencio tras las revelaciones grandes (s), para que se asienten; el resto, la pausa de locutar_frases.py.
# Desde la v5 van solo en el campo `pausas` de cada escena de escenas.json (los números de aquí eran los de la v4
# y, con el reparto v5, metían una pausa falsa tras la frase 58).
REVELACIONES = {}

escenas, usadas = [], []
for e in plan['escenas']:
    a, b = int(e['frase_ini']), int(e['frase_fin'])
    assert len(e['marcas']) == b - a + 1 == len(e['guion_visual']), e['id']
    frases = []
    pausas = {int(n): s for n, s in e.get('pausas', {}).items()}
    for k, marca, vis in zip(range(a, b + 1), e['marcas'], e['guion_visual']):
        es, en = filas[k - 1]
        f = {'n': k, 'marca': marca, 'es': es, 'en': en, 'visual': vis}
        if k in ACTOS and k > 1:
            f['acto'] = True
        if k in pausas:
            f['pausa'] = pausas[k]
        elif k in REVELACIONES and k < b:
            f['pausa'] = REVELACIONES[k]
        for l, t in (('es', es), ('en', en)):
            if hablado(t, l) != t:
                f[f'{l}_voz'] = hablado(t, l)
        frases.append(f)
        usadas.append(k)
    x = {'id': e['id'], 'estilo': e['estilo'], 'empieza_con': e['empieza_con'], 'termina_con': e['termina_con'],
         'produccion': e.get('produccion', ''), 'frases': frases}
    if e.get('cartela'):
        x['cartela'] = e['cartela']
    escenas.append(x)
assert usadas == list(range(1, len(filas) + 1)), 'faltan o sobran frases'

guion = {
    'serie': 'ASK Atom', 'numero': 9, 'estado': 'v2', 'formato': '16:9', 'rotulos': False,
    'titulo': {'en': "Thanksgiving & Black Friday in 8 Minutes: How a 1621 Harvest Dinner Became the Biggest Shopping Day",
               'es': 'Acción de Gracias y Black Friday en 8 minutos: cómo una cena de 1621 acabó en el mayor día de compras'},
    'principal': 'en',
    # desde el episodio 9, el inglés con Chatterbox imitando la voz de Atom (am_fenrir); el español sigue con Kokoro
    'voces': {'en': {'motor': 'chatterbox', 'ref': 'voces/atom-en.wav', 'exag': 0.6, 'cfg': 0.4},
              'es': {'voz': 'em_santa', 'lang': 'es', 'velocidad': 0.92}},
    'lotes': plan.get('lotes', []),
    'escenas': escenas,
}
json.dump(guion, open(f'{D}/guion.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas,', len(usadas), 'frases;', {s: sum(e['estilo'] == s for e in escenas) for s in ('pixel',)})
