"""Prepara la línea de tiempo común de un vídeo largo con dos pistas de audio (español e inglés).

Uso: python preparar_largo.py <guion.json> <carpeta_wavs> <salida>

Las imágenes son las mismas para los dos idiomas, así que cada palabra clave (marca) tiene que
sonar en el mismo instante en las dos pistas. Para cada escena con voz:
  1. Whisper da el tiempo de cada palabra del guion en las dos voces.
  2. Las marcas que existen en los dos idiomas (y en el mismo orden) parten la voz en tramos.
  3. Cada tramo se acelera o frena como mucho un 8 % en cada idioma para que duren lo mismo; si no
     basta, el idioma más corto alarga las pausas de sus signos de puntuación en ese tramo (más
     los puntos que las comas), sin abrir huecos entre palabras de una misma frase.
  Los cortes entre tramos caen en el silencio de verdad más cercano a cada palabra clave (o, si no
  lo hay, en el valle de energía entre dos palabras), cada trozo se estira con rubberband y se une al
  siguiente con un fundido cruzado de 12 ms: así no se recorta, no se repite ni se entrecorta la voz.
La pausa tras el número de cada afirmación ("pausa_tras_primera") ya viene en la voz de
locutar_escenas.py; aquí no se alarga más (solo se alargan pausas de menos de 0,7 s).
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

def estirar(audio, sr, t0, t1, tempo, margen=0.25):
    """El trozo [t0, t1) de audio con la duración cambiada sin cambiar el tono (rubberband de ffmpeg,
    que respeta los tiempos al milisegundo; atempo los adelanta ~20 ms). Se estira con margen a los
    dos lados y luego se recorta, porque el principio y el final de lo que se estira salen peor."""
    i0, i1 = int(t0 * sr), int(t1 * sr)
    if abs(tempo - 1) < 1e-3:
        return audio[i0:i1].copy()
    m0, m1 = max(0, i0 - int(margen * sr)), min(len(audio), i1 + int(margen * sr))
    with tempfile.TemporaryDirectory() as d:
        sf.write(f'{d}/a.wav', audio[m0:m1], sr)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{d}/a.wav', '-filter:a', f'rubberband=tempo={tempo:.5f}', f'{d}/b.wav'], check=True)
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

def silencios(env, minimo=0.03):
    """Tramos (inicio, fin) en que la voz calla de verdad durante al menos `minimo` segundos."""
    tt, rms = env
    umbral = 0.06 * np.percentile(rms, 95)
    tramos, ini = [], None
    for t, r in zip(tt, rms):
        if r < umbral:
            ini = t if ini is None else ini
        else:
            if ini is not None and t - ini >= minimo:
                tramos.append((ini, t))
            ini = None
    if ini is not None:
        tramos.append((ini, tt[-1]))
    return tramos

def punto_de_corte(env, ws, antes=0.3, despues=0.05):
    """Dónde cortar cerca del inicio ws de una palabra: en el silencio de verdad más cercano (Whisper
    se equivoca a veces en ±0,2 s); si no hay ninguno, en el valle de energía más hondo justo
    alrededor, que suele ser la frontera entre dos palabras."""
    cerca = [(abs((a + b) / 2 - ws), (a + b) / 2) for a, b in silencios(env) if ws - antes <= (a + b) / 2 <= ws + despues]
    if cerca:
        return min(cerca)[1]
    tt, rms = env
    liso = np.convolve(rms, np.ones(8) / 8, 'same')
    i = np.where((tt >= ws - 0.15) & (tt <= ws + 0.04))[0]
    return float(tt[i[np.argmin(liso[i])]]) if len(i) else ws

def fronteras(env, pal, t):
    """Pausas de puntuación del guion (tras . ? ! : ; , …): (instante, peso). El instante es el valle
    de energía más cercano a la frontera que da Whisper; el peso, lo fuerte que es el signo."""
    tt, rms = env
    liso = np.convolve(rms, np.ones(8) / 8, 'same')
    out = []
    for i in range(len(pal) - 1):
        signo = pal[i].rstrip('»"\'')[-1:]
        peso = {'.': 3, '?': 3, '!': 3, '…': 2, ':': 2, ';': 2, ',': 1}.get(signo)
        if peso:
            b = (t[i][1] + t[i + 1][0]) / 2
            k = np.where((tt >= b - 0.2) & (tt <= b + 0.2))[0]
            if len(k):
                out.append((float(tt[k[np.argmin(liso[k])]]), peso))
    return out

def pausas(env, t0, t1, n=3):
    """Las n pausas de frase más largas entre t0 y t1, como (centro, duración), en orden. Solo
    cuentan los silencios de al menos 0,15 s (los que la voz hace en comas y puntos); los huecos
    entre palabras de una misma frase son más cortos y alargarlos suena a corte."""
    tramos = [((a + b) / 2, b - a) for a, b in silencios(env, 0.15) if t0 <= (a + b) / 2 <= t1 and b - a < 0.7]
    return sorted(sorted(tramos, key=lambda x: -x[1])[:n])

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
    # Destino común de cada palabra clave (D) y tempo de cada idioma en cada tramo.
    D, tempos = [ENTRADA], {l: [] for l in IDIOMAS}
    for (n0, a0, b0), (n1, a1, b1) in zip(cortes, cortes[1:]):
        largo = {'es': a1 - a0, 'en': b1 - b0}
        lo, hi = max(largo.values()) / MAX_TEMPO, min(largo.values()) * MAX_TEMPO
        T = min(max(sum(largo.values()) / 2, lo), hi) if lo <= hi else lo
        for l in IDIOMAS:
            tempos[l].append(max(min(largo[l] / T, MAX_TEMPO), 1 / MAX_TEMPO))
        D.append(D[-1] + T)
    t_local = D[-1]
    duracion = t_local + SALIDA
    salida_audio, mapa = {}, {l: [] for l in IDIOMAS}   # tramos (origen_ini, origen_fin, destino_ini, tempo, pausa_en, pausa)
    for l, k in (('es', 1), ('en', 2)):
        audio = datos[l]['audio']
        env = envolvente(audio, sr)
        ws = [c[k] for c in cortes]                       # inicio de cada palabra clave (y fin de la última)
        # Cortes físicos en el silencio de verdad más cercano a cada palabra clave; el primero y el
        # último, fuera de la voz para no perder ni el ataque de la primera palabra ni la cola de la última.
        habla = [x for x in env[0][env[1] >= 0.06 * np.percentile(env[1], 95)]]
        c = [max(0.0, habla[0] - 0.04)]                                   # justo antes de que empiece a hablar
        c += [punto_de_corte(env, ws[j]) for j in range(1, len(ws) - 1)]
        c += [min(len(audio) / sr, habla[-1] + 0.08)]                     # justo después de que acabe
        signos = fronteras(env, datos[l]['pal'], datos[l]['t'])
        # Tramos de este idioma: de palabra clave a palabra clave. Si un tramo necesita una pausa y no
        # tiene ningún signo de puntuación donde ponerla, se une al siguiente (esa palabra clave queda
        # algo desplazada en este idioma): una pausa larga en mitad de una frase suena a corte.
        n = len(ws) - 1
        def signos_en(a, b):
            return [x for x in signos if ws[a] + 0.1 <= x[0] <= ws[b] - 0.1]
        tramos, a = [], 0
        while a < n:
            b = a + 1
            while True:
                tempo = max(min((ws[b] - ws[a]) / (D[b] - D[a]), MAX_TEMPO), 1 / MAX_TEMPO)
                falta = (D[b] - D[a]) - (ws[b] - ws[a]) / tempo
                if b == n or falta <= 0.15 or signos_en(a, b) or pausas(env, ws[a] + 0.1, ws[b] - 0.1):
                    break
                b += 1
            if b - a > 1:
                print(f"  {e['id']} {l}: sin pausa natural hasta «{cortes[b][0]}»; «{'», «'.join(x[0] for x in cortes[a + 1:b])}» no se alinea en este idioma")
            tramos.append((a, b, tempo))
            a = b
        buf = np.zeros(int(round(duracion * sr)) + sr)
        for k, (a, b, tempo) in enumerate(tramos):
            inicio = D[a] - (ws[a] - c[a]) / tempo                     # la palabra clave cae en D[a]
            sig = D[b] - (ws[b] - c[b]) / tramos[k + 1][2] if k + 1 < len(tramos) else None
            X = 0.012                                                     # fundido cruzado en las uniones
            x0, x1 = max(0.0, c[a] - X), min(len(audio) / sr, c[b] + X)
            trozo = estirar(audio, sr, x0, x1, tempo)
            colocar = inicio - (c[a] - x0) / tempo                         # el trozo empieza X antes del corte
            pausa = max(0.0, sig - (inicio + (c[b] - c[a]) / tempo)) if sig is not None else 0.0
            # El silencio que falta va a los signos de puntuación del tramo (los tres más fuertes), o si
            # no hay ninguno a sus pausas de frase, o (solo si es corto) justo antes de la siguiente clave.
            donde = []
            if pausa > 0.01:
                donde = sorted(sorted(signos_en(a, b), key=lambda x: -x[1])[:3]) or pausas(env, ws[a] + 0.1, ws[b] - 0.1) or [(c[b], 1.0)]
            huecos = [(q, pausa * d / sum(d for _, d in donde)) for q, d in donde]   # más a los signos más fuertes
            cortes_q = [int(round((q - x0) / tempo * sr)) for q, _ in huecos]
            trozos = np.split(trozo, cortes_q)
            n8 = int(sr * 0.008)                                          # fundido a cada lado del silencio añadido
            for i in range(len(trozos) - 1):
                if len(trozos[i]) > n8:
                    trozos[i][-n8:] *= np.linspace(1, 0, n8)
                if len(trozos[i + 1]) > n8:
                    trozos[i + 1][:n8] *= np.linspace(0, 1, n8)
            partes = [trozos[0]]
            for (q, h), t_ in zip(huecos, trozos[1:]):
                partes += [np.zeros(int(round(h * sr))), t_]
            trozo = fundido(np.concatenate(partes), sr, ms=X * 1000 / tempo)
            p = max(0, int(round(colocar * sr)))
            buf[p:p + len(trozo)] += trozo[:len(buf) - p]
            mapa[l].append((c[a], c[b], inicio, tempo, huecos))
            if os.environ.get('DEPURAR') == e['id']:
                print(f"  {l} {cortes[a][0]:>12s}→{cortes[b][0]:<12s} corte {c[a]:6.2f}->{c[b]:6.2f} destino {inicio:6.2f} tempo {tempo:.3f} pausa {pausa:.2f} en {[round(q, 2) for q, _ in huecos]}")
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
