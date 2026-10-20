"""Renderiza y monta la prueba de identidad visual: los mismos 12 s en varios estilos.

Uso: python atomo/plato/prueba-identidad/montar.py [--solo-montar]

Escribe en atomo/build/prueba-identidad/:
  linea.json                las escenas una tras otra, para render-escenas.mjs
  fotos/                    los fotogramas
  prueba-seguidas.mp4       las versiones una detrás de otra, con su nombre arriba
  prueba-cuadricula.mp4     las nueve a la vez en una cuadrícula de 3x3
El nombre de cada estilo va escrito en el vídeo solo para compararlos; no es material publicable.
"""
import json, os, subprocess, sys
import numpy as np, soundfile as sf

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
D = os.path.join(RAIZ, 'atomo/build/prueba-identidad')
ESTILOS = [('papel', 'Recortes de papel'), ('isometrico', 'Isométrico'), ('plastilina', 'Plastilina'),
           ('mixta', 'Mixta: Atom de plastilina + papel'), ('comic', 'Cómic'), ('dibujo', 'Dibujo a mano'),
           ('deco', 'Art déco'), ('fisica', 'Física'), ('pixel', 'Pixel art')]
FPS = 30
FUENTE = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

marcas = json.load(open(os.path.join(RAIZ, 'atomo/plato/escenas/marcas-prueba.json')))
voz, sr = sf.read(os.path.join(D, 'voz-en.wav'))
dur = marcas['prueba-papel']['duracion']
n_esc = int(round(dur * FPS))
v = sr // FPS
en = np.array([np.sqrt(np.mean(voz[i * v:(i + 1) * v] ** 2)) if i * v < len(voz) else 0.0 for i in range(n_esc)])
en = np.clip(en / np.percentile(en[en > 0], 95), 0, 1).round(3).tolist()

escenas = []
for k, (e, _) in enumerate(ESTILOS):
    m = marcas[f'prueba-{e}']
    escenas.append({'id': f'prueba-{e}', 'inicio': round(k * n_esc / FPS, 4), 'duracion': m['duracion'],
                    'marcas': m['marcas'], 'voz': m['voz']})
linea = {'fps': FPS, 'fotogramas': n_esc * len(ESTILOS), 'duracion': n_esc * len(ESTILOS) / FPS,
         'escenas': escenas, 'energia': en * len(ESTILOS)}
json.dump(linea, open(os.path.join(D, 'linea.json'), 'w'), ensure_ascii=False)

if '--solo-montar' not in sys.argv:
    subprocess.run(['node', 'herramientas/render-escenas.mjs', D, '--trabajadores', '3'], cwd=os.path.join(RAIZ, 'atomo'), check=True)

def rotulo(texto, x, y, tam):
    t = texto.replace(':', '\\:')
    return f"drawtext=fontfile={FUENTE}:text='{t}':x={x}:y={y}:fontsize={tam}:fontcolor=white:box=1:boxcolor=black@0.55:boxborderw=12"

# Una detrás de otra: el audio se repite en cada versión.
filtros = ','.join(rotulo(f'{k + 1}/{len(ESTILOS)} · {nombre}', 40, 30, 40) + f":enable='between(t,{k * n_esc / FPS},{(k + 1) * n_esc / FPS})'"
                   for k, (_, nombre) in enumerate(ESTILOS))
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(FPS), '-i', f'{D}/fotos/%05d.jpg',
                '-stream_loop', str(len(ESTILOS) - 1), '-i', f'{D}/voz-en.wav',
                '-vf', filtros, '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-pix_fmt', 'yuv420p',
                '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', f'{D}/prueba-seguidas.mp4'], check=True)

# Cuadrícula de 3x3: las nueve a la vez, con el audio una sola vez.
entradas, partes = [], []
for k, (_, nombre) in enumerate(ESTILOS):
    # De los fotogramas, no de prueba-seguidas.mp4, que ya lleva su rótulo y saldría doble.
    entradas += ['-framerate', str(FPS), '-start_number', str(k * n_esc), '-i', f'{D}/fotos/%05d.jpg']
    partes.append(f"[{k}:v]trim=end_frame={n_esc},setpts=PTS-STARTPTS,scale=640:360,drawbox=x=0:y=0:w=640:h=46:color=black@0.55:t=fill,"
                  f"drawtext=fontfile={FUENTE}:text='{nombre.replace(':', chr(92) + ':')}':x=12:y=10:fontsize=24:fontcolor=white[v{k}]")
pos = '|'.join(f'{(k % 3) * 640}_{(k // 3) * 360}' for k in range(len(ESTILOS)))
grafo = ';'.join(partes) + ';' + ''.join(f'[v{k}]' for k in range(len(ESTILOS))) + f'xstack=inputs={len(ESTILOS)}:layout={pos}[v]'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *entradas, '-i', f'{D}/voz-en.wav', '-filter_complex', grafo,
                '-map', '[v]', '-map', f'{len(ESTILOS)}:a', '-c:v', 'libx264', '-crf', '20', '-preset', 'medium',
                '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart',
                f'{D}/prueba-cuadricula.mp4'], check=True)
print('Hecho:', f'{D}/prueba-seguidas.mp4', f'{D}/prueba-cuadricula.mp4')
