#!/usr/bin/env python3
"""titulos.py - comprueba los títulos de una ficha de publicación antes de entregarla.

    python3 atomo/herramientas/titulos.py episodios/<carpeta>/publicacion.md

Regla aprobada por el usuario el 03/11/2026 (idea sacada de la skill youtube-agent-skill de Jakeschincariol, sin
instalarla):
- 60 caracteres como mucho (sin contar « #Shorts»): el buscador de escritorio corta ahí y lo de detrás no se ve;
- en los primeros 40 (lo que enseña el móvil) tiene que estar lo que se reconoce: el tema, la persona, la película,
  el juego;
- nada de palabras vagas (everything, ultimate, amazing, todo, increíble...): una cifra, un nombre o una fecha en su lugar.
Lee todas las líneas de título de la ficha (los dos principales, las alternativas A/B y los de los Shorts) y dice cuáles
no cumplen. Sale con código 1 si alguno falla.
"""
import re, sys

ESCRITORIO, MOVIL = 60, 40
VAGAS = {'everything', 'ultimate', 'amazing', 'incredible', 'insane', 'crazy', 'epic', 'perfect', 'complete',
         'mindblowing', 'revolutionary', 'todo', 'increíble', 'increible', 'brutal', 'épico', 'epico', 'definitivo',
         'completo', 'alucinante'}


def titulos(md):
    out, seccion = [], ''
    for linea in md.splitlines():
        if linea.startswith('#'):
            seccion = linea.strip('# ').strip()
            continue
        m = re.match(r'^- (?:\*\*)?(EN|ES):(?:\*\*)? (.+)$', linea)
        if not m:
            continue
        texto = m.group(2).strip()
        es_titulo = (seccion.startswith('Títulos') or seccion.startswith('Short ')) and not texto.startswith('`')
        if seccion.startswith('Short ') and any(o[0] == seccion and o[1] == m.group(1) for o in out):
            es_titulo = False   # en los Shorts, la segunda línea EN/ES es la descripción
        if es_titulo:
            out.append((seccion, m.group(1), texto))
    return out


def comprobar(texto):
    t = re.sub(r'\s*#Shorts?\s*$', '', texto).strip()
    fallos = []
    if len(t) > ESCRITORIO:
        fallos.append(f'{len(t)} caracteres: el escritorio enseña «{t[:ESCRITORIO].rsplit(" ", 1)[0]}…»')
    vagas = sorted({w for w in re.findall(r"[a-záéíóúñü']+", t.lower()) if w in VAGAS})
    if vagas:
        fallos.append('palabras vagas: ' + ', '.join(vagas))
    return t, fallos


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    malos = 0
    for seccion, idioma, texto in titulos(open(sys.argv[1], encoding='utf-8').read()):
        t, fallos = comprobar(texto)
        movil = t[:MOVIL].rsplit(' ', 1)[0] if len(t) > MOVIL else t
        estado = 'FALLA' if fallos else 'ok'
        malos += bool(fallos)
        print(f'{estado:5} {idioma} {len(t):3} | {t}')
        print(f'      móvil: «{movil}»' + (' …' if len(t) > MOVIL else ''))
        for f in fallos:
            print('      - ' + f)
    print(f'\n{malos} título(s) que no cumplen.' if malos else '\nTodos los títulos cumplen.')
    sys.exit(1 if malos else 0)


if __name__ == '__main__':
    main()
