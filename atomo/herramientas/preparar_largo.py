"""Prepara la línea de tiempo común de un vídeo largo con dos pistas de audio (español e inglés).

Uso: python preparar_largo.py <guion.json> <carpeta_wavs> <salida>

Las imágenes son las mismas para los dos idiomas, así que cada palabra clave (marca) tiene que
sonar en el mismo instante en las dos pistas. Para cada escena con voz:
  1. Whisper da el tiempo de cada palabra del guion en las dos voces.
  2. Las marcas que existen en los dos idiomas (y en el mismo orden) parten la voz en tramos.
  3. Cada tramo se acelera o frena como mucho un 8 % en cada idioma para que duren lo mismo; si no
     basta, el idioma más corto alarga a partes iguales sus tres pausas más largas de ese tramo.
  Los cortes entre tramos caen en el silencio más hondo justo antes de cada palabra clave (nunca
  dentro de una palabra), los trozos se funden 5 ms en los bordes y se suman en su sitio: así no
  se recorta ni se entrecorta la voz.
Si la escena trae "pausa_tras_primera" (segundos), la primera palabra («Uno:», «One:») va seguida de
esa pausa en los dos idiomas.
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
    """Tiempo (inicio, fin) de cada palabra del texto del guion, con Whisper y relleno por interpolación.
    Se guarda en caché (junto a los wav) por audio y texto, porque Whisper es lo más lento."""
    import hashlib
    clave = hashlib.sha1(audio.tobytes() + texto.encode()).hexdigest()[:16]
    cache = f"{wav_dir}/whisper-{idioma}-{clave}.json"
    if os.path.exists(cache):
        palabras, t = json.load(open(cache))
        return palabras, [tuple(x) for x in t]
    palabras, t = _tiempos_palabras(audio, sr, texto, idioma)
    json.dump([palabras, t], open(cache, 'w'))
    return palabras, t

def _tiempos_palabras(audio, sr, texto, idioma):
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

def atempo(audio, sr, t0, t1, tempo, margen=0.25):
    """El trozo [t0, t1) de audio con la duración cambiada sin cambiar el tono (ffmpeg atempo).
    Se estira con margen a los dos lados y luego se recorta: atempo estropea el principio y el
    final de lo que recibe, y en trozos cortos (una palabra) se comería el sonido."""
    i0, i1 = int(t0 * sr), int(t1 * sr)
    if abs(tempo - 1) < 1e-3:
        return audio[i0:i1].copy()
    m0, m1 = max(0, i0 - int(margen * sr)), min(len(audio), i1 + int(margen * sr))
    with tempfile.TemporaryDirectory() as d:
        sf.write(f'{d}/a.wav', audio[m0:m1], sr)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{d}/a.wav', '-filter:a', f'atempo={tempo:.5f}', f'{d}/b.wav'], check=True)
        b, _ = sf.read(f'{d}/b.wav')
    ini, n = int(round((i0 - m0) / tempo)), int(round((i1 - i0) / tempo))
    return ajustar(b[ini:ini + n], n)

def ajustar(audio, n):
    return audio[:n] if len(audio) >= n else np.concatenate([audio, np.zeros(n - len(audio))])

def envolvente(audio, sr):
    """Energía (RMS) en ventanas de 10 ms cada 2,5 ms: (tiempos, rms)."""
    h, w = int(sr * 0.0025), int(sr * 0.01)
    n = max(1, (len(audio) - w) // h)
    rms = np.sqrt(np.array([np.mean(audio[i * h:i * h + w] ** 2) for i in range(n)]))
    return (np.arange(n) * h + w / 2) / sr, rms

def mas_callado(env, t0, t1):
    """Instante de menos energía entre t0 y t1."""
    tt, rms = env
    i = np.where((tt >= t0) & (tt <= t1))[0]
    return float(tt[i[np.argmin(rms[i])]]) if len(i) else (t0 + t1) / 2

def pausas(env, t0, t1, n=3):
    """Centros de los n silencios más largos (de al menos 60 ms) entre t0 y t1, en orden."""
    tt, rms = env
    umbral = 0.06 * np.percentile(rms, 95)
    tramos, ini = [], None
    for t, r in zip(tt, rms):
        if t0 <= t <= t1 and r < umbral:
            ini = t if ini is None else ini
        else:
            if ini is not None and t - ini >= 0.06:
                tramos.append((t - ini, (ini + t) / 2))
            ini = None
    return sorted(c for _, c in sorted(tramos, reverse=True)[:n])

def fundido(a, sr, ms=5):
    n = min(len(a) // 2, int(sr * ms / 1000))
    if n:
        a = a.copy()
        a[:n] *= np.linspace(0, 1, n)
        a[-n:] *= np.linspace(1, 0, n)
    return a

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
    extra = {}   # segundos de pausa añadidos antes de un corte
    if e.get('pausa_tras_primera'):
        segunda = ('_pausa', datos['es']['t'][1][0], datos['en']['t'][1][0])
        cortes = sorted([x for x in cortes if x[1] > segunda[1] + 0.05 or x[0] == '_inicio'] + [segunda], key=lambda x: x[1])
        extra['_pausa'] = e['pausa_tras_primera']
    # Destino común de cada palabra clave (D) y tempo de cada idioma en cada tramo.
    D, tempos = [ENTRADA], {l: [] for l in IDIOMAS}
    for (n0, a0, b0), (n1, a1, b1) in zip(cortes, cortes[1:]):
        largo = {'es': a1 - a0, 'en': b1 - b0}
        lo, hi = max(largo.values()) / MAX_TEMPO, min(largo.values()) * MAX_TEMPO
        T = min(max(sum(largo.values()) / 2, lo), hi) if lo <= hi else lo
        for l in IDIOMAS:
            tempos[l].append(max(min(largo[l] / T, MAX_TEMPO), 1 / MAX_TEMPO))
        D.append(D[-1] + T + extra.get(n1, 0))
    t_local = D[-1]
    duracion = t_local + SALIDA
    salida_audio, mapa = {}, {l: [] for l in IDIOMAS}   # tramos (origen_ini, origen_fin, destino_ini, tempo, pausa_en, pausa)
    for l, k in (('es', 1), ('en', 2)):
        audio = datos[l]['audio']
        env = envolvente(audio, sr)
        ws = [c[k] for c in cortes]                       # inicio de cada palabra clave (y fin de la última)
        # Cortes físicos en el silencio más hondo antes de cada palabra clave; el primero y el último,
        # fuera de la voz para no perder ni el ataque de la primera palabra ni la cola de la última.
        c = [mas_callado(env, max(0, ws[0] - 0.3), ws[0])]
        c += [mas_callado(env, max(ws[j] - 0.3, (ws[j - 1] + ws[j]) / 2), ws[j] + 0.02) for j in range(1, len(ws) - 1)]
        c += [mas_callado(env, ws[-1] + 0.05, min(len(audio) / sr, ws[-1] + 0.45))]
        buf = np.zeros(int(round(duracion * sr)) + sr)
        for j in range(len(ws) - 1):
            tempo = tempos[l][j]
            inicio = D[j] - (ws[j] - c[j]) / tempo                     # la palabra clave cae en D[j]
            sig = D[j + 1] - (ws[j + 1] - c[j + 1]) / tempos[l][min(j + 1, len(ws) - 2)] if j + 1 < len(ws) - 1 else None
            trozo = atempo(audio, sr, c[j], c[j + 1], tempo)
            pausa = max(0.0, sig - (inicio + len(trozo) / sr)) if sig is not None else 0.0
            # El silencio que falta se reparte entre las pausas más largas del tramo (o va antes de la
            # siguiente palabra clave si no hay ninguna), para que ninguna pausa quede demasiado larga.
            donde = (pausas(env, ws[j] + 0.1, ws[j + 1] - 0.1) or [c[j + 1]]) if pausa > 0.01 else []
            huecos = [(q, pausa / len(donde)) for q in donde]
            partes, prev = [], 0
            for q, h in huecos:
                m = int(round((q - c[j]) / tempo * sr))
                partes += [fundido(trozo[prev:m], sr), np.zeros(int(round(h * sr)))]
                prev = m
            trozo = np.concatenate(partes + [fundido(trozo[prev:], sr)])
            p = max(0, int(round(inicio * sr)))
            buf[p:p + len(trozo)] += trozo[:len(buf) - p]
            mapa[l].append((c[j], c[j + 1], inicio, tempo, huecos))
        salida_audio[l] = [buf[:int(round(duracion * sr))]]

    def mover(x, l):
        for k, (s0, s1, d0, tempo, huecos) in enumerate(mapa[l]):
            if x < s1 or k == len(mapa[l]) - 1:
                return d0 + (max(x, s0) - s0) / tempo + sum(h for q, h in huecos if x >= q)
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
            fin = b[-1]['f'] + 0.25
            if k < len(bloques):   # que no pise al siguiente
                fin = min(fin, bloques[k][0]['i'] - 0.02)
            f.write(f"{k}\n{hms(b[0]['i'])} --> {hms(fin)}\n{' '.join(w['p'] for w in b)}\n\n")

for l in IDIOMAS:
    srt(palabras_out[l], f'{salida}/subtitulos-{l}.srt')
n = int(np.ceil(t_global * FPS))
comun = np.maximum(*(np.pad(energia[l], (0, max(0, n - len(energia[l]))))[:n] for l in IDIOMAS))
json.dump({'fps': FPS, 'duracion': round(t_global, 3), 'fotogramas': n, 'escenas': lineas, 'palabras': palabras_out,
           'energia': [round(float(x), 3) for x in comun]}, open(f'{salida}/linea.json', 'w'), ensure_ascii=False)
print(f"total {t_global:.1f} s ({int(t_global // 60)}:{int(t_global % 60):02d}), {n} fotogramas")
