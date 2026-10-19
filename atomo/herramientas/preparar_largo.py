"""Prepara la línea de tiempo común de un vídeo largo con dos pistas de audio (español e inglés).

Uso: python preparar_largo.py <guion.json> <carpeta_wavs> <salida>

Las imágenes son las mismas para los dos idiomas, así que cada palabra clave (marca) tiene que
sonar en el mismo instante en las dos pistas. Para cada escena con voz:
  1. Whisper da el tiempo de cada palabra del guion en las dos voces.
  2. Las marcas que existen en los dos idiomas (y en el mismo orden) parten la voz en tramos.
  3. Cada tramo se acelera o frena como mucho un 8 % en cada idioma para que duren lo mismo; si no
     basta, el idioma más corto añade un silencio en su pausa más larga de ese tramo.
Las escenas mudas (marcadores) duran lo que diga el guion.

Escribe en <salida>: linea.json (escenas con inicio, duración y marcas en segundos desde el inicio
de la escena; palabras y energía por idioma), voz-es.wav, voz-en.wav y subtitulos-es.srt / -en.srt.
"""
import difflib, json, os, re, subprocess, sys, tempfile, unicodedata
import numpy as np, soundfile as sf
from faster_whisper import WhisperModel

guion_path, wav_dir, salida = sys.argv[1:4]
FPS = 30
ENTRADA = 0.5    # segundos de escena antes de que empiece a hablar
SALIDA = 0.6     # segundos de escena después de la última palabra
MAX_TEMPO = 1.08
IDIOMAS = ('es', 'en')

g = json.load(open(guion_path))
modelo = WhisperModel("small", device="cpu", compute_type="int8")

def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(ch for ch in w if unicodedata.category(ch) != "Mn")
    return re.sub(r"[^a-z0-9]", "", w)

def tiempos_palabras(audio, sr, texto, idioma):
    """Tiempo (inicio, fin) de cada palabra del texto del guion, con Whisper y relleno por interpolación."""
    n16 = int(len(audio) * 16000 / sr)
    a16 = np.interp(np.linspace(0, len(audio) - 1, n16), np.arange(len(audio)), audio).astype(np.float32)
    segs, _ = modelo.transcribe(a16, language=idioma, beam_size=5, word_timestamps=True)
    oidas = [w for s in segs for w in s.words]
    palabras = texto.split()
    sm = difflib.SequenceMatcher(a=[norm(w) for w in palabras], b=[norm(w.word) for w in oidas], autojunk=False)
    t = [None] * len(palabras)
    for b in sm.get_matching_blocks():
        for d in range(b.size):
            w = oidas[b.b + d]
            t[b.a + d] = (w.start, w.end)
    dur = len(audio) / sr
    conocidos = [(i, x) for i, x in enumerate(t) if x]
    anclas = [(-1, (0.0, 0.0))] + conocidos + [(len(palabras), (dur, dur))]
    for (i0, x0), (i1, x1) in zip(anclas, anclas[1:]):
        hueco = list(range(i0 + 1, i1))
        if not hueco:
            continue
        ini, fin = x0[1], x1[0]
        largos = [len(palabras[i]) + 1 for i in hueco]
        acc = ini
        for i, L in zip(hueco, largos):
            d = (fin - ini) * L / sum(largos)
            t[i] = (acc, acc + d)
            acc += d
    return palabras, t

def buscar(palabras, t, clave):
    token, _, n = clave.partition('#')
    c = [i for i, w in enumerate(palabras) if norm(w) == norm(token)]
    n = int(n or 1)
    return t[c[n - 1]] if len(c) >= n else None

def atempo(audio, sr, tempo):
    """Cambia la duración sin cambiar el tono (ffmpeg atempo)."""
    if abs(tempo - 1) < 1e-3 or len(audio) < sr * 0.05:
        return audio
    with tempfile.TemporaryDirectory() as d:
        sf.write(f'{d}/a.wav', audio, sr)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{d}/a.wav', '-filter:a', f'atempo={tempo:.5f}', f'{d}/b.wav'], check=True)
        b, _ = sf.read(f'{d}/b.wav')
    return b

def ajustar(audio, n):
    return audio[:n] if len(audio) >= n else np.concatenate([audio, np.zeros(n - len(audio))])

lineas, pistas = [], {l: [] for l in IDIOMAS}
palabras_out = {l: [] for l in IDIOMAS}
t_global, sr = 0.0, 24000
for e in g['escenas']:
    if e.get('muda'):
        d = e['duracion']
        for l in IDIOMAS:
            pistas[l].append(np.zeros(int(round(d * sr))))
        lineas.append({k: e[k] for k in ('id', 'estilo', 'n', 'veredicto') if k in e} | {'muda': True, 'inicio': round(t_global, 3), 'duracion': d, 'marcas': {}})
        t_global += d
        continue
    datos = {}
    for l in IDIOMAS:
        a, sr = sf.read(f"{wav_dir}/{l}-{e['id']}.wav")
        a = a.mean(1) if a.ndim > 1 else a
        pal, t = tiempos_palabras(a, sr, e[l], l)
        datos[l] = {'audio': a, 'pal': pal, 't': t}
    # Anclas: inicio y fin de la voz, y las marcas presentes en los dos idiomas en el mismo orden.
    anclas, sueltas = [], {}
    for nombre, claves in e['marcas'].items():
        te, ti = buscar(datos['es']['pal'], datos['es']['t'], claves['es']), buscar(datos['en']['pal'], datos['en']['t'], claves['en'])
        if te is None or ti is None:
            print(f"AVISO {e['id']}: falta la marca '{nombre}' en {'español' if te is None else 'inglés'}")
            if te is not None:
                sueltas[nombre] = te
            continue
        sueltas[nombre] = te
        anclas.append((nombre, te[0], ti[0]))
    anclas.sort(key=lambda x: x[1])
    ordenadas, ultimo_en = [], -1
    for a_ in anclas:   # se descartan las que en inglés van en otro orden
        if a_[2] > ultimo_en + 0.05:
            ordenadas.append(a_); ultimo_en = a_[2]
        else:
            print(f"AVISO {e['id']}: la marca '{a_[0]}' va en otro orden en inglés; no se alinea")
    ini = {l: datos[l]['t'][0][0] for l in IDIOMAS}
    fin = {l: datos[l]['t'][-1][1] for l in IDIOMAS}
    cortes = [('_inicio', ini['es'], ini['en'])] + [(n, a, b) for n, a, b in ordenadas if ini['es'] < a < fin['es'] and ini['en'] < b < fin['en']] + [('_fin', fin['es'], fin['en'])]
    salida_audio = {l: [np.zeros(int(round(ENTRADA * sr)))] for l in IDIOMAS}
    mapa = {l: [] for l in IDIOMAS}   # tramos (origen_ini, origen_fin, destino_ini, tempo, pausa_en, pausa)
    t_local = ENTRADA
    for (n0, a0, b0), (n1, a1, b1) in zip(cortes, cortes[1:]):
        largo = {'es': a1 - a0, 'en': b1 - b0}
        lo, hi = max(largo.values()) / MAX_TEMPO, min(largo.values()) * MAX_TEMPO
        T = min(max(sum(largo.values()) / 2, lo), hi) if lo <= hi else lo
        for l, (s0, s1) in (('es', (a0, a1)), ('en', (b0, b1))):
            tempo = max(min(largo[l] / T, MAX_TEMPO), 1 / MAX_TEMPO)
            hablado = largo[l] / tempo
            pausa = max(0.0, T - hablado)
            trozo = datos[l]['audio'][int(s0 * sr):int(s1 * sr)]
            # El silencio que falte va en la pausa más larga entre palabras de ese tramo.
            pal_t = [x for x in datos[l]['t'] if s0 <= x[0] < s1]
            corte = s1
            if pausa > 0 and len(pal_t) > 1:
                huecos = [(pal_t[i + 1][0] - pal_t[i][1], (pal_t[i][1] + pal_t[i + 1][0]) / 2) for i in range(len(pal_t) - 1)]
                corte = max(huecos)[1]
            p1 = atempo(datos[l]['audio'][int(s0 * sr):int(corte * sr)], sr, tempo)
            p2 = atempo(datos[l]['audio'][int(corte * sr):int(s1 * sr)], sr, tempo) if corte < s1 else np.zeros(0)
            bloque = np.concatenate([p1, np.zeros(int(round(pausa * sr))), p2])
            salida_audio[l].append(ajustar(bloque, int(round(T * sr))))
            mapa[l].append((s0, s1, t_local, tempo, corte, pausa))
        t_local += T
    for l in IDIOMAS:
        salida_audio[l].append(np.zeros(int(round(SALIDA * sr))))
    duracion = t_local + SALIDA

    def mover(x, l):
        for s0, s1, d0, tempo, corte, pausa in mapa[l]:
            if x < s1 or (s0, s1, d0, tempo, corte, pausa) == mapa[l][-1]:
                y = d0 + (max(x, s0) - s0) / tempo
                return y + (pausa if x >= corte else 0)
        return ENTRADA
    # Marcas en segundos desde el inicio de la escena, con la voz ya alineada (las del español mandan).
    marcas = {}
    for nombre, (te, te_fin) in sueltas.items():
        marcas[nombre] = round(mover(te, 'es'), 3)
        marcas[nombre + '_fin'] = round(mover(te_fin, 'es'), 3)
    for l in IDIOMAS:
        voz = np.concatenate(salida_audio[l])
        pistas[l].append(ajustar(voz, int(round(duracion * sr))))
        for w, (ws, we) in zip(datos[l]['pal'], datos[l]['t']):
            palabras_out[l].append({'p': w, 'i': round(t_global + mover(ws, l), 3), 'f': round(t_global + mover(we, l), 3), 'escena': e['id']})
    lineas.append({'id': e['id'], 'estilo': e['estilo'], 'inicio': round(t_global, 3), 'duracion': round(duracion, 3),
                   'voz': [ENTRADA, round(t_local, 3)], 'marcas': marcas})
    print(f"{e['id']:12s} {duracion:5.1f} s · {len(cortes) - 2} de {len(e['marcas'])} marcas alineadas en los dos idiomas", flush=True)
    t_global += duracion

os.makedirs(salida, exist_ok=True)
energia = {}
for l in IDIOMAS:
    voz = np.concatenate(pistas[l])
    sf.write(f'{salida}/voz-{l}.wav', voz, sr)
    v = sr // FPS
    n = int(np.ceil(len(voz) / v))
    en = np.array([np.sqrt(np.mean(voz[i * v:(i + 1) * v] ** 2)) for i in range(n)])
    energia[l] = np.clip(en / (np.percentile(en[en > 0], 95) if (en > 0).any() else 1), 0, 1)

def srt(palabras, ruta):
    """Subtítulos por frases cortas (corta en puntuación o a las 9 palabras)."""
    def hms(x):
        h, r = divmod(x, 3600); m, s = divmod(r, 60)
        return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{int(round((s % 1) * 1000)):03d}"
    bloques, actual = [], []
    for w in palabras:
        actual.append(w)
        if re.search(r'[.?!:;,]$', w['p']) and len(actual) >= 3 or len(actual) >= 9:
            bloques.append(actual); actual = []
    if actual:
        bloques.append(actual)
    with open(ruta, 'w') as f:
        for k, b in enumerate(bloques, 1):
            f.write(f"{k}\n{hms(b[0]['i'])} --> {hms(b[-1]['f'] + 0.25)}\n{' '.join(w['p'] for w in b)}\n\n")

for l in IDIOMAS:
    srt(palabras_out[l], f'{salida}/subtitulos-{l}.srt')
n = int(np.ceil(t_global * FPS))
comun = np.maximum(*(np.pad(energia[l], (0, max(0, n - len(energia[l]))))[:n] for l in IDIOMAS))
json.dump({'fps': FPS, 'duracion': round(t_global, 3), 'fotogramas': n, 'escenas': lineas, 'palabras': palabras_out,
           'energia': [round(float(x), 3) for x in comun]}, open(f'{salida}/linea.json', 'w'), ensure_ascii=False)
print(f"total {t_global:.1f} s ({int(t_global // 60)}:{int(t_global % 60):02d}), {n} fotogramas")
