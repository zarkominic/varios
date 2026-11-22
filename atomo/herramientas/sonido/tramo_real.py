"""Toca con instrumentos grabados de verdad las pistas que compuso tramo_sf.py (banda.biblioteca = 'real').

Lo llama tramo_sf.py con el Python de la biblioteca Lemo-Opuscar (MIT; sus muestras: VSCO 2 CE, VCSL, Karoryfer y
FreePats, CC0, y el piano Salamander, CC BY 3.0, que pide crédito en la descripción).
Cada pista llega con sus notas (s, s, MIDI, velocidad), sus controles (el 11 son los crescendos) y su versión FluidR3 ya
tocada. Si el instrumento existe grabado, se toca con el sampler y se deja con el mismo nivel (RMS) que la versión
FluidR3, de modo que el equilibrio de la mezcla no cambia, solo el timbre. Si no existe (celesta, coro, flauta de pan…),
se usa la versión FluidR3 tal cual.

Uso: <lemo>/.venv/bin/python tramo_real.py <lemo> <pistas.json> <salida.wav>
"""
import json, sys
import numpy as np, soundfile as sf

LEMO, JS, SALIDA = sys.argv[1:4]
sys.path.insert(0, LEMO)
from core.audio import sampler as S          # noqa: E402
from core.audio.sfx import add               # noqa: E402

D = json.load(open(JS))
SR = 48000
N = int((D['segundos'] + 3) * SR)

# nombre de tramo_sf.py → instrumentos grabados por registro (nota MIDI mínima, nombre); el primero que la cubre.
# Las cuerdas de sección se reparten por registro como en una orquesta (contrabajos, chelos, violas, violines).
SECCION = [(55, 'violins'), (48, 'violas'), (36, 'cellos'), (0, 'contrabass')]
PIZZ = [(55, 'violins_pizz'), (48, 'violas_pizz'), (36, 'cellos_pizz'), (0, 'contrabass_pizz')]
MAPA = {'cuerdas': SECCION, 'cuerdas_lentas': SECCION, 'pizz': PIZZ, 'chelo': [(0, 'cellos')],
        'contrabajo': [(0, 'contrabass')], 'violin': [(55, 'violin'), (0, 'violas')], 'viola': [(0, 'violas')],
        'arpa': [(0, 'harp')], 'oboe': [(0, 'oboe')], 'fagot': [(0, 'bassoon')], 'clarinete': [(0, 'clarinet')],
        'flauta': [(0, 'flute')], 'trompa': [(0, 'horn')], 'trompeta': [(0, 'trumpet')],
        'metales': [(55, 'horn'), (0, 'trombone')], 'guitarra': [(0, 'guitar_nylon')], 'piano': [(0, 'piano')]}
ATAQUE = {'cuerdas_lentas': 0.25}            # las cuerdas lentas entran en fundido, como el programa 49 de GM


def expresion(ccs, t):
    """El controlador 11 (crescendos) en el instante t, de 0 a 1."""
    v = 1.0
    for tc, num, val in ccs:
        if num == 11 and tc <= t:
            v = val / 127
    return v


def rms(x):
    return float(np.sqrt(np.mean(np.square(x)) + 1e-12))


def leer(wav):
    x, sr = sf.read(wav, dtype='float32', always_2d=True)
    assert sr == SR, (wav, sr)
    out = np.zeros((N, 2), np.float32)
    n = min(N, len(x))
    out[:n] = x[:n, :2] if x.shape[1] > 1 else np.repeat(x[:n], 2, 1)
    return out


total = np.zeros((N, 2), np.float32)
seco = np.zeros((N, 2), np.float32)          # lo grabado, que pasa por la sala; lo de FluidR3 ya lleva su reverberación
informe = []
for p in D['pistas']:
    fluid = leer(p['fluid'])
    reg = MAPA.get(p['nombre'])
    if not reg or not p['notas']:
        total += fluid
        informe.append(f"{p['nombre']}: FluidR3")
        continue
    buf = np.zeros((N, 2), np.float32)
    pan = (p['pan'] - 64) / 64
    for t, dur, n, vel in p['notas']:
        inst = next(nm for lo, nm in reg if n >= lo)
        x = S.note(inst, n, dur, vel=vel / 127, attack=ATAQUE.get(p['nombre'], 0.0))
        add(buf, x, t, expresion(p['ccs'], t), pan)
    obj, got = rms(fluid), rms(buf)
    if got > 0:
        buf *= obj / got
    seco += buf
    informe.append(f"{p['nombre']}: {', '.join(nm for _, nm in reg)}")

# una sala para lo grabado (seca de origen), con más cola cuanto más reverberación pedía la pista en FluidR3
total += S.room(seco, size=.5, mix=.22)
pico = float(np.max(np.abs(total)))
if pico > 0.95:
    total *= 0.95 / pico
sf.write(SALIDA, total[:int(D['segundos'] * SR + 1.5 * SR)], SR)
print(' · '.join(informe), file=sys.stderr)
