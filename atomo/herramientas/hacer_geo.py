# Uso: python3 herramientas/hacer_geo.py <carpeta> plato/escenas/geo-ov.js, con <carpeta> que contenga
#   https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json, …/world-atlas@2.0.2/countries-110m.json y
#   https://cdn.jsdelivr.net/npm/us-atlas@3.0.1/states-10m.json
# Convierte los atlas TopoJSON (world-atlas 2.0.2 y us-atlas 3.0.1, Natural Earth y Census, dominio público / ISC) en un
# módulo JS con polígonos simplificados (lon, lat con un decimal o dos) para los mapas del episodio 10.
import json, sys
src, out = sys.argv[1], sys.argv[2]

def arcos(topo):
    sx, sy = topo['transform']['scale']; tx, ty = topo['transform']['translate']; A = []
    for arc in topo['arcs']:
        x = y = 0; pts = []
        for dx, dy in arc: x += dx; y += dy; pts.append((x * sx + tx, y * sy + ty))
        A.append(pts)
    return A
def anillo(A, idx):
    pts = []
    for i in idx:
        a = A[i] if i >= 0 else A[~i][::-1]
        pts.extend(a if not pts else a[1:])
    # desenrolla las longitudes: un anillo que cruza el antimeridiano (Rusia) no salta de 180 a −180
    for k in range(1, len(pts)):
        d = pts[k][0] - pts[k - 1][0]
        if d > 180: pts[k:] = [(x - 360, y) for x, y in pts[k:]]
        elif d < -180: pts[k:] = [(x + 360, y) for x, y in pts[k:]]
    return pts
def poligonos(A, g):
    if g['type'] == 'Polygon': return [anillo(A, g['arcs'][0])]
    if g['type'] == 'MultiPolygon': return [anillo(A, p[0]) for p in g['arcs']]
    return []
def dp(pts, tol):
    if len(pts) < 4: return pts
    def rec(a, b):
        (x1, y1), (x2, y2) = pts[a], pts[b]; dmax, imax = 0, a
        L = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5 or 1e-9
        for i in range(a + 1, b):
            x, y = pts[i]; d = abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / L if L > 1e-6 else ((x - x1) ** 2 + (y - y1) ** 2) ** 0.5
            if d > dmax: dmax, imax = d, i
        return rec(a, imax)[:-1] + rec(imax, b) if dmax > tol else [pts[a], pts[b]]
    return rec(0, len(pts) - 1)
def area(p): return abs(sum(p[i][0] * p[i - 1][1] - p[i - 1][0] * p[i][1] for i in range(len(p)))) / 2
def fmt(polys, tol, dec, amin):
    r = []
    for p in polys:
        if area(p) < amin: continue
        q = dp(p, tol)
        if len(q) >= 4: r.append([[round(x, dec), round(y, dec)] for x, y in q])
    return r

w = json.load(open(f'{src}/countries-110m.json')); Aw = arcos(w)
land = json.load(open(f'{src}/land-110m.json')); Al = arcos(land)
TIERRA = fmt([p for g in land['objects']['land']['geometries'] for p in poligonos(Al, g)], 0.3, 1, 1.5)
pais = {g['properties']['name']: g for g in w['objects']['countries']['geometries']}
P = lambda n, tol=0.2: fmt(poligonos(Aw, pais[n]), tol, 1, 0.3)
URSS = ['Russia', 'Ukraine', 'Belarus', 'Kazakhstan', 'Uzbekistan', 'Turkmenistan', 'Kyrgyzstan', 'Tajikistan', 'Georgia', 'Armenia', 'Azerbaijan', 'Moldova', 'Lithuania', 'Latvia', 'Estonia']
s = json.load(open(f'{src}/states-10m.json')); As = arcos(s)
dentro = lambda p: all(-126 < x < -65 and 24 < y < 50 for x, y in p)
nacion = [p for g in s['objects']['nation']['geometries'] for p in poligonos(As, g) if dentro(p)]
# las fronteras entre estados: los arcos que comparten dos estados de los 48 de abajo
uso = {}
for g in s['objects']['states']['geometries']:
    if g['properties']['name'] in ('Alaska', 'Hawaii', 'Puerto Rico', 'Guam', 'American Samoa', 'United States Virgin Islands', 'Commonwealth of the Northern Mariana Islands'): continue
    polys = g['arcs'] if g['type'] == 'MultiPolygon' else [g['arcs']]
    for poly in polys:
        for ring in poly:
            for i in ring: uso[i if i >= 0 else ~i] = uso.get(i if i >= 0 else ~i, 0) + 1
lineas = [[[round(x, 2), round(y, 2)] for x, y in dp(As[i], 0.04)] for i, n in uso.items() if n == 2]
js = ['// Mapas del episodio 10: polígonos de tierra, países y estados (lon, lat), simplificados con Douglas-Peucker.',
      '// Fuente: Natural Earth (dominio público) a través de world-atlas 2.0.2 y us-atlas 3.0.1 (ISC). Generado con',
      '// hacer_geo.py; no se edita a mano.',
      f'export const TIERRA = {json.dumps(TIERRA, separators=(",", ":"))};',
      f'export const EEUU_P = {json.dumps(P("United States of America"), separators=(",", ":"))};',
      f'export const URSS_P = {json.dumps([p for n in URSS for p in P(n)], separators=(",", ":"))};',
      f'export const CANADA_P = {json.dumps(P("Canada"), separators=(",", ":"))};',
      f'export const MEXICO_P = {json.dumps(P("Mexico"), separators=(",", ":"))};',
      f'export const EEUU48 = {json.dumps(fmt(nacion, 0.05, 2, 0.05), separators=(",", ":"))};',
      f'export const ESTADOS = {json.dumps(lineas, separators=(",", ":"))};']
open(out, 'w').write('\n'.join(js) + '\n')
print(len(TIERRA), sum(len(p) for p in TIERRA), len(lineas), sum(len(l) for l in lineas))
