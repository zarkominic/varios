"""Genera guion.json (el que leen locutar_frases.py y el plató) a partir de guion.md y escenas.json.

Uso: python3 episodios/45-victor-von-doom/hacer_guion.py

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
    if 2000 < a < 2010:
        return f'two thousand {UNI_EN[a - 2000]}'
    if bajo == 0:
        return 'two thousand' if a == 2000 else f'{dos_en(alto)} hundred'
    return f"{dos_en(alto)} {'oh-' + UNI_EN[bajo] if bajo < 10 else dos_en(bajo)}"

UNI_ES = ('cero uno dos tres cuatro cinco seis siete ocho nueve diez once doce trece catorce quince dieciséis '
          'diecisiete dieciocho diecinueve veinte veintiuno veintidós veintitrés veinticuatro veinticinco '
          'veintiséis veintisiete veintiocho veintinueve').split()
DEC_ES = {3: 'treinta', 4: 'cuarenta', 5: 'cincuenta', 6: 'sesenta', 7: 'setenta', 8: 'ochenta', 9: 'noventa'}
CEN_ES = {1: 'ciento', 2: 'doscientos', 3: 'trescientos', 4: 'cuatrocientos', 5: 'quinientos', 6: 'seiscientos',
          7: 'setecientos', 8: 'ochocientos', 9: 'novecientos'}

# Decena y unidad PEGADAS para la voz («ochentaiuno», «sesentaidós»): escrito «ochenta y uno», Kokoro en español
# suelta la cola («mil novecientos ochenta… y uno»). Lo oyó el usuario (14/11/2026) y se midió con Whisper: separado
# oye «1980 | y | dos»; pegado, «1982». Los subtítulos no cambian: salen del texto del guion, no de este.
ACENTO_ES = {'dos': 'dós', 'tres': 'trés', 'seis': 'séis'}
def pegado_es(dec, uni):
    # desde el 37, con ZONOS3, la decena y la unidad van separadas como se escriben («setenta y siete»): el pegado era un
    # arreglo para Kokoro, y la muestra de un minuto que aprobó el usuario (16/11/2026) las decía separadas
    return dec + ' y ' + uni

def dos_es(n):
    return UNI_ES[n] if n < 30 else (pegado_es(DEC_ES[n // 10], UNI_ES[n % 10]) if n % 10 else DEC_ES[n // 10])

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
    # cifras que no son años (y fechas en inglés), antes de leer los años
    for x, y in PREVIO[l]:
        texto = texto.replace(x, y)
    t = re.sub(r'\b(1[0-9]{3}|20[0-9]{2})\b', lambda m: (anyo_en if l == 'en' else anyo_es)(int(m.group(1))), texto)
    t = re.sub(r'\b([1-9][0-9]{2})\b', lambda m: (corto_en if l == 'en' else corto_es)(int(m.group(1))), t)
    if l == 'en':
        t = t.replace(' BC', ' B.C.')
    # Nombres que el sintetizador lee mal: se escriben como se dicen (en español, «Halloween» se dice «jálouin»)
    if l == 'es':   # también los números escritos con letra: «treinta y dos páginas» → «treintaidós páginas»
        t = re.sub(r'\b(treinta|cuarenta|cincuenta|sesenta|setenta|ochenta|noventa) y (uno|una|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve)\b',
                   lambda m: pegado_es(m.group(1), m.group(2)), t)
    for x, y in PRONUNCIA[l]:
        t = t.replace(x, y)
    return t

# Las fechas con día, como se dicen (antes de leer los años).
PREVIO = {
    'en': [],
    'es': [],
}
# Desde el 37, en español los nombres extranjeros van TAL CUAL (regla del 16/11/2026).
PRONUNCIA = {
    'en': [],
    # validadas con ZONOS3 y Whisper el 21/11/2026 (frase «Hoy te hablo de …»): tal cual salían «Doomstay», «Berner»,
    # «Sacred Words» y «la adveria»; escritas así se oyen bien. Los demás nombres se oyen bien tal cual.
    'es': [('Doomsday', 'Dúmsdei'), ('Werner', 'Vérner'), ('Secret Wars', 'Sícret Uórs'), ('Latveria', 'Lat veria')],
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
    x = {'id': e['id'], 'estilo': e['estilo'], 'animo': e.get('animo'), 'golpes': e.get('golpes', []), 'empieza_con': e['empieza_con'], 'termina_con': e['termina_con'],
         'produccion': e.get('produccion', ''), 'frases': frases}
    if e.get('cartela'):
        x['cartela'] = e['cartela']
    escenas.append(x)
assert usadas == list(range(1, len(filas) + 1)), 'faltan o sobran frases'

guion = {
    'serie': 'ASK Atom', 'numero': 45, 'estado': 'v1', 'formato': '16:9', 'rotulos': False,
    'titulo': {'en': 'Doctor Doom: The Villain Who Only Wanted His Mother Back',
               'es': 'Doctor Doom: el villano que solo quería recuperar a su madre'},
    'principal': 'en',
    # desde el 37, las voces elegidas a ciegas por el usuario el 16/11/2026 (atomo/plato/VOZ.md)
    'narracion': 'cuento',
    # desde el 43, el relato hablado (GUIA-NARRATIVA): cada párrafo de una vez, sin silencios dentro
    'parrafo_entero': True,
    # desde el 45 (el usuario, 21/11/2026, tras el final cortado del 44): «reduce la velocidad a como estaba antes, en
    # ambos idiomas»: inglés a 0,95 y español a su velocidad natural (sin 'ritmo'); las pausas cortas del 44 se quedan
    'pausas': {'respiro': 0.15, 'parrafo': 0.4, 'acto': 0.5, 'entrada': 0.2, 'salida': 0.25},
    'voces': {'en': {'motor': 'supertonic', 'voz': 'M1', 'lang': 'en', 'velocidad': 0.95},
              'es': {'motor': 'zonos3', 'voz': 'Rodrigo_es_M_1', 'lang': 'es',
                     'controles': {'mood.valence': 0.4, 'mood.arousal': 0.3}, 'headroom': 3}},
    'lotes': plan.get('lotes', []),
    'escenas': escenas,
}
json.dump(guion, open(f'{D}/guion.json', 'w'), ensure_ascii=False, indent=1)
print(len(escenas), 'escenas,', len(usadas), 'frases;', {s: sum(e['estilo'] == s for e in escenas) for s in ('pixel',)})
