# Uso: python locutar.py <guion.md> <salida> <velocidad> <carpeta_modelos>
# Locuta cada bloque de un guion.md (líneas **ES:** / **EN:**) con Kokoro:
# Santa en español y Fenrir en inglés. Escribe <salida>/espanol-NN.wav e ingles-NN.wav.
import re, sys, soundfile as sf
from kokoro_onnx import Kokoro
guion, salida, velocidad, modelos = sys.argv[1], sys.argv[2], float(sys.argv[3]), sys.argv[4]
# Lo que el sintetizador leería mal se le da escrito como se dice.
DECIR = {
    'es': [('el MIT', 'el eme i te'), ('1962', 'mil novecientos sesenta y dos'), ('1979', 'mil novecientos setenta y nueve')],
    'en': [('MIT', 'M I T'), ('1962', 'nineteen sixty-two'), ('1979', 'nineteen seventy-nine')],
}
k = Kokoro(f"{modelos}/kokoro-v1.0.onnx", f"{modelos}/voices-v1.0.bin")
texto = open(guion).read()
for tag, l, voz, lang, nombre in (('**ES:**', 'es', 'em_santa', 'es', 'espanol'), ('**EN:**', 'en', 'am_fenrir', 'en-us', 'ingles')):
    bloques = [ln.split(tag, 1)[1].strip() for ln in texto.splitlines() if ln.startswith(tag)]
    total = 0
    for n, b in enumerate(bloques, 1):
        for a, d in DECIR[l]:
            b = b.replace(a, d)
        audio, sr = k.create(b, voice=voz, speed=velocidad, lang=lang)
        sf.write(f"{salida}/{nombre}-{n:02d}.wav", audio, sr)
        total += len(audio) / sr
        print(f"{nombre}-{n:02d}: {len(audio)/sr:5.1f} s")
    print(nombre, f"total {total:.1f} s")
