"""Renderiza y monta una prueba de identidad visual: el mismo fragmento en varios estilos.

Uso: python atomo/plato/prueba-identidad/montar.py [identidad|cosmos] [--estilos a,b,c] [--faltan] [--solo-montar]

  identidad   de la persona al pelo, 9 estilos (ENCARGO.md); es la prueba por defecto
  cosmos      de la persona a la Vía Láctea, 4 estilos (ENCARGO-COSMOS.md)
  --estilos   solo esos estilos, en una carpeta aparte para no pisar el render completo
  --faltan    renderiza solo los fotogramas que faltan (render-escenas.mjs --faltan)

Escribe en atomo/build/prueba-<prueba>[-<estilos>]/:
  linea.json                las escenas una tras otra, para render-escenas.mjs
  fotos/                    los fotogramas
  <prefijo>-seguidas.mp4    las versiones una detrás de otra, con su nombre arriba
  <prefijo>-cuadricula.mp4  todas a la vez en una cuadrícula
El nombre de cada estilo va escrito en el vídeo solo para compararlos; no es material publicable.
"""
import json, math, os, subprocess, sys
import numpy as np, soundfile as sf

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
NOMBRES = {'papel': 'Recortes de papel', 'isometrico': 'Isométrico', 'plastilina': 'Plastilina',
           'mixta': 'Mixta: Atom de plastilina + papel', 'comic': 'Cómic', 'dibujo': 'Dibujo a mano',
           'deco': 'Art déco', 'fisica': 'Física', 'pixel': 'Pixel art', 'particulas': 'Partículas',
           'plastilina-adulta': 'Plastilina adulta'}
PRUEBAS = {
    'identidad': {'carpeta': 'atomo/build/prueba-identidad', 'marcas': 'marcas-prueba.json', 'prefijo': 'prueba',
                  'estilos': ['papel', 'isometrico', 'plastilina', 'mixta', 'comic', 'dibujo', 'deco', 'fisica', 'pixel']},
    'cosmos': {'carpeta': 'atomo/build/prueba-cosmos', 'marcas': 'marcas-cosmos.json', 'prefijo': 'cosmos',
               'estilos': ['papel', 'comic', 'plastilina', 'particulas']},
}
FPS = 30
FUENTE = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

args = sys.argv[1:]
elegidos = args.pop(args.index('--estilos') + 1).split(',') if '--estilos' in args else None
prueba = PRUEBAS[next((a for a in args if not a.startswith('--')), 'identidad')]
p = prueba['prefijo']
VOZ = os.path.join(RAIZ, prueba['carpeta'], 'voz-en.wav')
D = os.path.join(RAIZ, prueba['carpeta'] + ('-' + '-'.join(elegidos) if elegidos else ''))
ESTILOS = [(e, NOMBRES[e]) for e in (elegidos or prueba['estilos'])]
os.makedirs(D, exist_ok=True)

marcas = json.load(open(os.path.join(RAIZ, 'atomo/plato/escenas', prueba['marcas'])))
voz, sr = sf.read(VOZ)
dur = marcas[f'{p}-{ESTILOS[0][0]}']['duracion']
n_esc = int(round(dur * FPS))
v = sr // FPS
en = np.array([np.sqrt(np.mean(voz[i * v:(i + 1) * v] ** 2)) if i * v < len(voz) else 0.0 for i in range(n_esc)])
en = np.clip(en / np.percentile(en[en > 0], 95), 0, 1).round(3).tolist()

escenas = []
for k, (e, _) in enumerate(ESTILOS):
    m = marcas[f'{p}-{e}']
    escenas.append({'id': f'{p}-{e}', 'inicio': round(k * n_esc / FPS, 4), 'duracion': m['duracion'],
                    'marcas': m['marcas'], 'voz': m['voz']})
linea = {'fps': FPS, 'fotogramas': n_esc * len(ESTILOS), 'duracion': n_esc * len(ESTILOS) / FPS,
         'escenas': escenas, 'energia': en * len(ESTILOS)}
json.dump(linea, open(os.path.join(D, 'linea.json'), 'w'), ensure_ascii=False)

if '--solo-montar' not in args:
    subprocess.run(['node', 'herramientas/render-escenas.mjs', D, '--trabajadores', '3', *(['--faltan'] if '--faltan' in args else [])], cwd=os.path.join(RAIZ, 'atomo'), check=True)

def rotulo(texto, x, y, tam):
    t = texto.replace(':', '\\:')
    return f"drawtext=fontfile={FUENTE}:text='{t}':x={x}:y={y}:fontsize={tam}:fontcolor=white:box=1:boxcolor=black@0.55:boxborderw=12"

# Una detrás de otra: el audio se repite en cada versión.
filtros = ','.join(rotulo(f'{k + 1}/{len(ESTILOS)} · {nombre}', 40, 30, 40) + f":enable='between(t,{k * n_esc / FPS},{(k + 1) * n_esc / FPS})'"
                   for k, (_, nombre) in enumerate(ESTILOS))
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(FPS), '-i', f'{D}/fotos/%05d.jpg',
                '-stream_loop', str(len(ESTILOS) - 1), '-i', VOZ,
                '-vf', filtros, '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-pix_fmt', 'yuv420p',
                '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', f'{D}/{p}-seguidas.mp4'], check=True)

# Cuadrícula: todas a la vez, con el audio una sola vez.
cols = math.ceil(math.sqrt(len(ESTILOS)))
filas = math.ceil(len(ESTILOS) / cols)
w, h = 1920 // cols, 1080 // filas
tam = h // 15
entradas, partes = [], []
for k, (_, nombre) in enumerate(ESTILOS):
    # De los fotogramas, no de <prefijo>-seguidas.mp4, que ya lleva su rótulo y saldría doble.
    entradas += ['-framerate', str(FPS), '-start_number', str(k * n_esc), '-i', f'{D}/fotos/%05d.jpg']
    partes.append(f"[{k}:v]trim=end_frame={n_esc},setpts=PTS-STARTPTS,scale={w}:{h},drawbox=x=0:y=0:w={w}:h={int(tam * 1.9)}:color=black@0.55:t=fill,"
                  f"drawtext=fontfile={FUENTE}:text='{nombre.replace(':', chr(92) + ':')}':x={tam // 2}:y={int(tam * 0.42)}:fontsize={tam}:fontcolor=white[v{k}]")
pos = '|'.join(f'{(k % cols) * w}_{(k // cols) * h}' for k in range(len(ESTILOS)))
grafo = ';'.join(partes) + ';' + ''.join(f'[v{k}]' for k in range(len(ESTILOS))) + f'xstack=inputs={len(ESTILOS)}:layout={pos}:fill=black[v]'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *entradas, '-i', VOZ, '-filter_complex', grafo,
                '-map', '[v]', '-map', f'{len(ESTILOS)}:a', '-c:v', 'libx264', '-crf', '20', '-preset', 'medium',
                '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart',
                f'{D}/{p}-cuadricula.mp4'], check=True)
print('Hecho:', f'{D}/{p}-seguidas.mp4', f'{D}/{p}-cuadricula.mp4')
