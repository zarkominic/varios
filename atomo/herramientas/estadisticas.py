#!/usr/bin/env python3
"""estadisticas.py - resume la exportación de YouTube Studio para saber qué funciona en el canal.

    python3 atomo/herramientas/estadisticas.py episodios/estadisticas/<fecha>

La carpeta es la del zip «Contenido» de YouTube Studio (Analytics → Contenido → exportar), descomprimido:
«Datos de la tabla.csv» (un vídeo por fila) y, si está, «Datos del gráfico.csv» (visualizaciones por día de los
vídeos más vistos). Regla aprobada por el usuario el 03/11/2026: se mira en el arranque de cada episodio (paso 0).

Imprime, de más a menos visto: las visualizaciones, los días publicados, la media por día, los tres primeros días
(si hay datos por día), el % que se quedó viendo (solo lo da en los Shorts) y la longitud del título. No interpreta:
la lectura la hace quien lo usa, con las etiquetas de siempre.
"""
import csv, collections, datetime as dt, os, sys


def fecha(s):
    return dt.datetime.strptime(s.strip(), '%b %d, %Y').date()


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    d = sys.argv[1]
    tabla = list(csv.DictReader(open(os.path.join(d, 'Datos de la tabla.csv'), encoding='utf-8-sig')))
    por_dia = collections.defaultdict(dict)
    g = os.path.join(d, 'Datos del gráfico.csv')
    if os.path.exists(g):
        for r in csv.DictReader(open(g, encoding='utf-8-sig')):
            if 'Visualizaciones' in r:   # el gráfico puede ser de otra métrica (p. ej. el % visto)
                por_dia[r['Contenido']][r['Fecha']] = int(r['Visualizaciones'] or 0)
    filas = [r for r in tabla if r['Contenido'] != 'Total']
    hasta = max(dt.date.fromisoformat(f) for v in por_dia.values() for f in v) if por_dia else None
    total = next((r for r in tabla if r['Contenido'] == 'Total'), None)
    if total:
        print(f"Total: {total['Visualizaciones']} visualizaciones\n")
    ricos = 'Impresiones de la miniatura' in (filas[0] if filas else {})
    if ricos:
        print('clics = impresiones × CTR: las visitas que llegan pinchando la miniatura dentro de YouTube. Si las '
              'visualizaciones son muchas más, vienen de fuera (enlaces, anuncios, reproducción automática).\n')
    extra = f" {'interes.':>8} {'impr.':>6} {'CTR':>5} {'clics':>5} {'%visto':>6} {'media':>7}" if ricos else ''
    print(f"{'vis.':>6} {'días':>4} {'/día':>6}  {'días 0-2':14} {'quedan':>6}{extra} {'car.':>4}  título")
    for r in sorted(filas, key=lambda r: -int(r['Visualizaciones'] or 0)):
        p = fecha(r['Hora de publicación del vídeo'])
        fin = hasta or dt.date.today()
        dias = max(1, (fin - p).days + 1)
        vis = int(r['Visualizaciones'] or 0)
        seq = por_dia.get(r['Contenido'])
        primeros = '-' if not seq else str([seq.get(str(p + dt.timedelta(i)), 0) for i in range(3)])
        quedan = r.get('Se quedaron viendo (%)') or '-'
        corto = int(r['Duración'] or 0) <= 60
        extra = ''
        if ricos:
            imp = int(r['Impresiones de la miniatura'] or 0); ctr = float(r['Porcentaje de clics de las miniaturas (%)'] or 0)
            extra = (f" {r['Visualizaciones interesadas'] or '-':>8} {imp:6d} {ctr:5.2f} {imp * ctr / 100:5.0f}"
                     f" {r['Porcentaje medio visto (%)'] or '-':>6} {r['Duración media de las visualizaciones'] or '-':>7}")
        print(f"{vis:6d} {dias:4d} {vis / dias:6.0f}  {primeros:14} {quedan:>6}{extra} {len(r['Título del vídeo']):4d}  "
              f"{'[Short] ' if corto else ''}{r['Título del vídeo']}")
    if hasta:
        print(f"\nDatos por día hasta el {hasta}; los «días» se cuentan hasta esa fecha.")


if __name__ == '__main__':
    main()
