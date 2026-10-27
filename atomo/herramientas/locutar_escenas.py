"""Locuta cada escena con voz de un guion.json (formato largo, un solo vídeo con dos pistas).

Uso: python locutar_escenas.py <guion.json> <salida> <carpeta_modelos> [velocidad_es]

Santa en español a la velocidad dada (0,92 por defecto, algo más pausado que en los Shorts).
Fenrir en inglés: primero a la misma velocidad y, si su escena dura bastante menos o más que la
española, se repite con la velocidad que la acerca (entre 0,80 y 1,00), para que luego haya que
estirar poco al alinear las dos pistas. Escribe <salida>/es-<id>.wav y en-<id>.wav.
"""
import json, sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro

guion, salida, modelos = sys.argv[1:4]
vel_es = float(sys.argv[4]) if len(sys.argv) > 4 else 0.92
# Lo que el sintetizador leería mal se le da escrito como se dice.
DECIR = {
    'es': [('el MIT', 'el eme i te'), ('1962', 'mil novecientos sesenta y dos'), ('1979', 'mil novecientos setenta y nueve')],
    'en': [('MIT', 'M I T'), ('1962', 'nineteen sixty-two'), ('1979', 'nineteen seventy-nine')],
}
k = Kokoro(f"{modelos}/kokoro-v1.0.onnx", f"{modelos}/voices-v1.0.bin")

def decir(texto, l):
    for a, d in DECIR[l]:
        texto = texto.replace(a, d)
    return texto

VOZ = {'es': ('em_santa', 'es'), 'en': ('am_fenrir', 'en-us')}

def locutar(e, l, vel):
    """Voz de la escena. Con "pausa_tras_primera", la primera palabra («Uno.», «One.») se dice aparte
    y se deja ese silencio detrás: el sintetizador no hace pausa de verdad tras ella."""
    texto = decir(e[l], l)
    if e.get('pausa_tras_primera'):
        primera, resto = texto.split(' ', 1)
        a, sr = k.create(primera, voice=VOZ[l][0], speed=vel, lang=VOZ[l][1])
        b, _ = k.create(resto, voice=VOZ[l][0], speed=vel, lang=VOZ[l][1])
        return np.concatenate([a, np.zeros(int(e['pausa_tras_primera'] * sr)), b]), sr
    return k.create(texto, voice=VOZ[l][0], speed=vel, lang=VOZ[l][1])

for e in json.load(open(guion))['escenas']:
    if e.get('muda'):
        continue
    a, sr = locutar(e, 'es', vel_es)
    sf.write(f"{salida}/es-{e['id']}.wav", a, sr)
    d_es = len(a) / sr
    vel = vel_es
    b, _ = locutar(e, 'en', vel)
    if not 0.92 < (len(b) / sr) / d_es < 1.08:
        vel = min(1.0, max(0.80, vel * (len(b) / sr) / d_es))
        b, _ = locutar(e, 'en', vel)
    sf.write(f"{salida}/en-{e['id']}.wav", b, sr)
    print(f"{e['id']:12s} es {d_es:5.1f} s · en {len(b)/sr:5.1f} s (velocidad {vel:.2f})", flush=True)
