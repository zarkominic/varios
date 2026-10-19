"""Música de fondo original (sin derechos de terceros) para un episodio.

Uso: python musica.py <linea.json> <salida.wav>

Genera un colchón ambiental suave (acordes que se funden), destellos agudos
como estrellas y un "whoosh" en cada transformación del átomo, todo sincronizado
con la línea de tiempo del vídeo. Determinista: siempre suena igual.
"""
import json, sys
import numpy as np, soundfile as sf
from scipy.signal import lfilter

linea = json.load(open(sys.argv[1]))
SR = 48000
dur = linea["duracion"]
n = int(dur * SR)
t = np.arange(n) / SR
rng = np.random.default_rng(7)

def nota(m):
    return 440.0 * 2 ** ((m - 69) / 12)

# Dos acordes que se alternan cada 8 s con fundido de 3 s: La m9 y Fa maj7(#11).
ACORDES = [[45, 52, 55, 59, 60, 64], [41, 48, 52, 55, 59, 64]]
periodo = 8.0
# Fundido senoidal continuo: La m9 en t = 0, 16, 32…; Fa maj7(#11) en t = 8, 24…
peso_b = 0.5 - 0.5 * np.cos(np.pi * t / periodo)
izq = np.zeros(n)
der = np.zeros(n)
for k, acorde in enumerate(ACORDES):
    peso = peso_b if k == 1 else 1 - peso_b
    for j, m in enumerate(acorde):
        f = nota(m)
        lfo = 0.75 + 0.25 * np.sin(2 * np.pi * (0.05 + 0.013 * j) * t + j)
        for lado, desaf in ((izq, -0.0015), (der, 0.0015)):
            fl = f * (1 + desaf * (1 + j * 0.3))
            onda = np.sin(2 * np.pi * fl * t) + 0.18 * np.sin(2 * np.pi * 2 * fl * t + 0.5)
            lado += onda * lfo * peso * (0.9 if m < 50 else 0.5)

# Destellos agudos (estrellas): notas de la escala en la octava 6, envolvente de campana.
ESCALA = [69, 71, 72, 76, 79, 81, 84]
for _ in range(int(dur / 1.6)):
    t0 = rng.uniform(0, dur - 3)
    f = nota(rng.choice(ESCALA) + 12)
    i0 = int(t0 * SR)
    L = int(2.8 * SR)
    tt = np.arange(L) / SR
    env = np.exp(-tt * 1.6) * (1 - np.exp(-tt * 60))
    s = np.sin(2 * np.pi * f * tt) * env * 0.12
    pan = rng.uniform(0.2, 0.8)
    fin = min(n, i0 + L)
    izq[i0:fin] += s[: fin - i0] * (1 - pan)
    der[i0:fin] += s[: fin - i0] * pan

# Golpe blando de plastilina en cada marcador (vídeo largo): el sello cae a los 0,5 s de la escena.
for esc in linea["escenas"]:
    if not esc.get("veredicto"):
        continue
    i0 = int((esc["inicio"] + 0.5) * SR)
    L = int(0.45 * SR)
    tt = np.arange(L) / SR
    tono = 110 if esc["veredicto"] == "✓" else 82
    golpe = (np.sin(2 * np.pi * tono * tt * (1 - 0.3 * tt)) * np.exp(-tt * 14) * 0.9
             + lfilter([0.08], [1, -0.9], rng.standard_normal(L)) * np.exp(-tt * 30) * 0.5)
    fin = min(n, i0 + L)
    izq[i0:fin] += golpe[: fin - i0]
    der[i0:fin] += golpe[: fin - i0]

# "Whoosh" en cada transformación: ruido filtrado que barre de grave a agudo.
for k, esc in enumerate(linea["escenas"]):
    if k == 0:
        continue
    t0 = esc["inicio"] - 0.15
    L = int(1.6 * SR)
    i0 = max(0, int(t0 * SR))
    ruido = rng.standard_normal(L)
    espectro = np.fft.rfft(ruido)
    freqs = np.fft.rfftfreq(L, 1 / SR)
    centro = 900
    espectro *= np.exp(-((np.log(freqs + 1) - np.log(centro)) ** 2) / 1.2)
    w = np.fft.irfft(espectro, L)
    tt = np.arange(L) / SR
    env = np.sin(np.pi * np.clip(tt / 1.6, 0, 1)) ** 2
    w = w / (np.abs(w).max() + 1e-9) * env * 0.35
    pan = np.clip(tt / 1.6, 0, 1)
    fin = min(n, i0 + L)
    izq[i0:fin] += w[: fin - i0] * (1 - pan[: fin - i0])
    der[i0:fin] += w[: fin - i0] * pan[: fin - i0]

# Paso bajo suave (un polo) y entrada/salida en fundido.

def pb(x, fc):
    a = np.exp(-2 * np.pi * fc / SR)
    return lfilter([1 - a], [1, -a], x)

izq, der = pb(izq, 3200), pb(der, 3200)
fundido = np.clip(t / 2.0, 0, 1) * np.clip((dur - t) / 2.5, 0, 1)
mezcla = np.stack([izq * fundido, der * fundido], axis=1)
mezcla /= np.abs(mezcla).max() + 1e-9
sf.write(sys.argv[2], (mezcla * 0.5).astype(np.float32), SR)
print("música", f"{dur:.1f}s")
