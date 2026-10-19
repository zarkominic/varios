"""Prepara el audio de un episodio para el render del vídeo.

Uso: python preparar_audio.py <guion.json> <carpeta_wavs_escenas> <idioma es|en> <salida_dir>

Lee los WAV de cada escena (<idioma>-NN.wav), los coloca en la línea de tiempo,
saca la energía de la voz por fotograma (30 fps), los tiempos de cada palabra con
Whisper (alineados con el texto del guion) y escribe linea.json y voz.wav.
"""
import difflib, json, re, sys, unicodedata
import numpy as np, soundfile as sf
from faster_whisper import WhisperModel

guion_path, wav_dir, idioma, salida = sys.argv[1:5]
FPS = 30
PAUSA = 0.5          # silencio entre escenas
ADELANTO = 0.35      # la forma empieza a transformarse antes de que hable la escena
COLA = 1.4           # segundos finales tras la última frase

g = json.load(open(guion_path))
clave = {"es": "espanol", "en": "ingles"}[idioma]
nombre_wav = {"es": "espanol", "en": "ingles"}[idioma]
escenas = g[clave]["escenas"] if clave in g else g[idioma]["escenas"]
modelo = WhisperModel("small", device="cpu", compute_type="int8")

def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(ch for ch in w if unicodedata.category(ch) != "Mn")
    return re.sub(r"[^a-z0-9]", "", w)

pistas, linea, palabras = [], [], []
t = 0.0
sr = None
for k, e in enumerate(escenas, 1):
    a, sr = sf.read(f"{wav_dir}/{nombre_wav}-{k:02d}.wav")
    if a.ndim > 1:
        a = a.mean(1)
    dur = len(a) / sr
    linea.append({"forma": e.get("forma_id", e.get("forma")), "rotulo": e["rotulo"], "texto": e["texto"],
                  "voz_inicio": round(t, 3), "voz_fin": round(t + dur, 3)})
    # Palabras del guion con tiempos de Whisper.
    n16 = int(len(a) * 16000 / sr)
    a16 = np.interp(np.linspace(0, len(a) - 1, n16), np.arange(len(a)), a).astype(np.float32)
    segs, _ = modelo.transcribe(a16, language=idioma, beam_size=5, word_timestamps=True)
    oidas = [w for s in segs for w in s.words]
    guion_w = e["texto"].split()
    sm = difflib.SequenceMatcher(a=[norm(w) for w in guion_w], b=[norm(w.word) for w in oidas], autojunk=False)
    tiempos = [None] * len(guion_w)
    for bloque in sm.get_matching_blocks():
        for d in range(bloque.size):
            w = oidas[bloque.b + d]
            tiempos[bloque.a + d] = (w.start, w.end)
    # Rellenar huecos interpolando por número de letras.
    conocidos = [(i, x) for i, x in enumerate(tiempos) if x]
    anclas = [(-1, (0.0, 0.0))] + conocidos + [(len(guion_w), (dur, dur))]
    for (i0, x0), (i1, x1) in zip(anclas, anclas[1:]):
        hueco = list(range(i0 + 1, i1))
        if not hueco:
            continue
        ini, fin = x0[1], x1[0]
        largos = [len(guion_w[i]) + 1 for i in hueco]
        acc = ini
        for i, L in zip(hueco, largos):
            d = (fin - ini) * L / sum(largos)
            tiempos[i] = (acc, acc + d)
            acc += d
    for w, (ws, we) in zip(guion_w, tiempos):
        palabras.append({"p": w, "i": round(t + ws, 3), "f": round(t + we, 3), "e": k - 1})
    pistas.append(a)
    t += dur
    if k < len(escenas):
        pistas.append(np.zeros(int(sr * PAUSA)))
        t += PAUSA
duracion = t + COLA
pistas.append(np.zeros(int(sr * COLA)))
voz = np.concatenate(pistas)
sf.write(f"{salida}/voz.wav", voz, sr)

# Cambio de forma: un poco antes de que empiece a hablar cada escena (la primera ya formada).
for k, esc in enumerate(linea):
    # La primera forma ya está formada en el fotograma 0: empezó 1,8 s "antes" (lo que dura una transformación).
    esc["inicio"] = -1.8 if k == 0 else round(max(0.0, esc["voz_inicio"] - ADELANTO), 3)

# Marcas: instante (segundos desde el inicio de la forma) en que se dice cada palabra clave.
# En el guion: "marcas": {"d": "d", "cod": "c#3"} = palabra normalizada y, opcional, su número de aparición.
for k, (esc, e) in enumerate(zip(linea, escenas)):
    propias = [w for w in palabras if w["e"] == k]
    esc["marcas"] = {}
    for nombre, clave in (e.get("marcas") or {}).items():
        token, _, n = clave.partition("#")
        candidatas = [w for w in propias if norm(w["p"]) == norm(token)]
        n = int(n or 1)
        if len(candidatas) < n:
            print(f"AVISO escena {k + 1}: no encuentro la palabra '{clave}' para la marca '{nombre}'")
            continue
        w = candidatas[n - 1]
        esc["marcas"][nombre] = round(w["i"] - esc["inicio"], 3)
        esc["marcas"][nombre + "_fin"] = round(w["f"] - esc["inicio"], 3)

# Energía de la voz por fotograma, normalizada (percentil 95 = 1).
n = int(np.ceil(duracion * FPS))
ventana = sr // FPS
energia = np.array([np.sqrt(np.mean(voz[i * ventana:(i + 1) * ventana] ** 2)) if i * ventana < len(voz) else 0.0 for i in range(n)])
ref = np.percentile(energia[energia > 0], 95) if (energia > 0).any() else 1.0
energia = np.clip(energia / ref, 0, 1)

# "rotulos": false en el guion oculta el rótulo de arriba en todo el episodio.
json.dump({"fps": FPS, "duracion": round(duracion, 3), "fotogramas": n, "rotulos": g.get("rotulos", True),
           "escenas": linea, "palabras": palabras,
           "energia": [round(float(x), 3) for x in energia]}, open(f"{salida}/linea.json", "w"), ensure_ascii=False)
print(idioma, f"duración {duracion:.1f}s, {n} fotogramas, {len(palabras)} palabras")
