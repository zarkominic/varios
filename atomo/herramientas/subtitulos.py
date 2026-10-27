"""Cortes de subtítulo legibles, en español y en inglés (desde el episodio 10).

Una frase larga se parte en trozos de como mucho `maximo` caracteres. Se prefiere cortar en un signo (coma, punto y coma,
dos puntos) cerca de la mitad; si no lo hay, en un espacio delante de una palabra que abre oración («que», «y», «hasta»,
«that», «until»…), y nunca detrás de una palabra que pide la siguiente («de», «la», «hacia», «the», «his»…), para que no
quede «mira hacia / abajo».

    from subtitulos import trozos
    trozos('un piloto de caza de la Marina mira hacia abajo y descubre que el mar está hirviendo,')

Uso como programa: python3 herramientas/subtitulos.py <entrada.srt> [<salida.srt>]
Vuelve a partir un SRT ya hecho con locutar_frases.py: junta los trozos de cada frase (van pegados, sin hueco entre
ellos) y los reparte otra vez, con el tiempo de cada trozo proporcional a sus letras.
"""
import re
import sys

ABRE = set('que y e o u pero hasta para porque donde cuando mientras aunque sino como según sin con desde '
           'that and or but until to where when while because which who whose as if so since though with without from'.split())
PIDE = set('de del al la el los las lo un una unos unas a en por su sus mi tu nuestro nuestra hacia sobre entre ante '
           'muy más tan cada este esta estos estas ese esa aquel aquella se le les me te nos y e o que ni '
           'the a an of in on at to for by his her its their our my your this that these those and or with from very '
           'more most as into onto than every own one two three four five six seven eight nine ten dos tres siete nueve '
           "saucer u-2's hundred according across ve es hasta".split())


def _limpia(w):
    return re.sub(r'[^\wáéíóúüñ]', '', w.lower())


def _coste(texto, c):
    """Coste de cortar en la posición c (justo después de un espacio): distancia a la mitad más penalizaciones."""
    antes, despues = texto[:c].split(), texto[c:].split()
    if not antes or not despues:
        return float('inf')
    coste = abs(c - len(texto) / 2) / len(texto)
    if re.search(r'[.?!]$', antes[-1]):
        coste -= 0.6
    elif re.search(r'[,:;]$', antes[-1]):
        coste -= 0.35
    if _limpia(antes[-1]) in PIDE:
        coste += 1.0
    if _limpia(despues[0]) in ABRE:
        coste -= 0.3
    if min(len(texto[:c].strip()), len(texto[c:].strip())) < 18:
        coste += 0.6
    return coste


def trozos(texto, maximo=84):
    texto = texto.strip()
    if len(texto) <= maximo:
        return [texto]
    cortes = [m.end() for m in re.finditer(r' ', texto)]
    c = min(cortes, key=lambda x: _coste(texto, x))
    return trozos(texto[:c], maximo) + trozos(texto[c:], maximo)


def _seg(t):
    h, m, s = t.replace(',', '.').split(':')
    return int(h) * 3600 + int(m) * 60 + float(s)


def _hms(x):
    h, r = divmod(x, 3600); m, s = divmod(r, 60)
    return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{int(round((s % 1) * 1000)):03d}"


def repartir(entrada, salida):
    bloques = [b.split('\n') for b in open(entrada, encoding='utf-8').read().strip().split('\n\n')]
    cues = [(_seg(b[1].split(' --> ')[0]), _seg(b[1].split(' --> ')[1]), ' '.join(b[2:])) for b in bloques]
    frases, actual = [], None
    for ini, fin, txt in cues:
        if actual and abs(ini - actual[1]) < 0.002:   # pegado al anterior: la misma frase
            actual = [actual[0], fin, actual[2] + ' ' + txt]
        else:
            if actual:
                frases.append(actual)
            actual = [ini, fin, txt]
    frases.append(actual)
    k, out = 0, []
    for ini, fin, txt in frases:
        partes = trozos(txt)
        fin_voz = fin - 0.25   # locutar_frases.py le da 0,25 s de cola al último trozo de cada frase
        total, t0 = sum(len(p) for p in partes), ini
        for p in partes:
            t1 = t0 + (fin_voz - ini) * len(p) / total
            k += 1
            out.append(f"{k}\n{_hms(t0)} --> {_hms(t1 + (0.25 if p is partes[-1] else 0))}\n{p}\n")
            t0 = t1
    open(salida, 'w', encoding='utf-8').write('\n'.join(out) + '\n')
    return len(frases), k


if __name__ == '__main__':
    e = sys.argv[1]
    n, k = repartir(e, sys.argv[2] if len(sys.argv) > 2 else e)
    print(f'{n} frases, {k} subtítulos')
