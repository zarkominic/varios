"""Voz de un vídeo largo frase a frase, con control automático y el idioma principal marcando el ritmo.

Uso: python locutar_frases.py <guion.json> <salida> <carpeta_modelos> [--solo id1,id2] [--marcas <json>]

Sustituye a locutar_escenas.py + preparar_largo.py desde el episodio 3 (ver atomo/plato/VOZ.md):
  1. Cada frase de cada idioma es un clip propio (Kokoro). Nunca se corta una locución: las pausas
     solo van entre clips. Se locuta el texto «<idioma>_voz» si existe (cifras escritas como se
     dicen); los subtítulos usan el texto original.
  2. Control de cada clip con Whisper: palabras que faltan, sobran o se repiten, y huecos dentro de
     una palabra (como «cen…ter»). Un clip señalado se vuelve a sintetizar a otras velocidades; si
     ninguna sale limpia, se queda la mejor y va a la lista de <salida>/informe.json.
  3. Alineación por frases. Cada pareja de frases empieza a la vez en las dos pistas.
     - El idioma principal (guion «principal», inglés por defecto) va a su velocidad natural.
     - El otro se sintetiza a una velocidad que lo acerque (entre 0,85 y 1,10, para que siga sonando
       natural) y luego se estira entero con rubberband, como mucho un 10 % en cada sentido (desde el episodio 4: con un 5 % quedaban frases de casi 1 s de diferencia).
     - Si aun así es más largo, la frase ocupa lo que dure el más largo y el principal deja silencio
       detrás; si es más corto, el silencio lo deja él. Nunca se acelera una voz hasta que suene con prisa.
  4. Las marcas son el inicio de cada frase (con «_fin» al final de la frase principal), así caen
     igual en los dos idiomas.

Escribe en <salida>:
- linea.json: escenas con inicio, duración, voz, marcas y frases; palabras y energía;
- voz-en.wav, voz-es.wav, subtitulos-en.srt y subtitulos-es.srt;
- informe.json: cada clip con su velocidad, tempo y problemas;
- clips/: caché de síntesis y de Whisper.

Con --marcas, escribe además las marcas de cada escena para la vista previa del plató.
"""
import difflib, hashlib, json, os, re, subprocess, sys, tempfile, unicodedata
import numpy as np, soundfile as sf

args = sys.argv[1:]
opcion = lambda n: args.pop(args.index(n) + 1) if n in args else None
solo = opcion('--solo')
solo = solo.split(',') if solo else None
ruta_marcas = opcion('--marcas')
args = [a for a in args if a not in ('--solo', '--marcas')]
guion_path, salida, modelos = args[:3]

FPS, SR = 30, 24000
ENTRADA, ENTRADA_CARTELA, SALIDA = 0.5, 1.5, 0.7    # s de escena antes de hablar (con cartela, más) y después
ENTRADA_ACTO = 1.4                                  # s de silencio antes de la primera frase de un acto (un «título»)
PAUSA = {'.': 0.8, '?': 0.9, '!': 0.85, ':': 0.6}   # silencio tras la frase (un punto y aparte) según su último signo
# Silencio dentro de una frase, entre trozos. Kokoro comprime la puntuación: en el episodio 8 había
# comas con 0 s de pausa. Como en el modo por cláusulas de PyKokoro, la frase se locuta en trozos
# partidos por los signos y la pausa se pone entre clips, así nunca cae dentro de una palabra.
PAUSA_DENTRO = {',': 0.3, ';': 0.42, ':': 0.42, '—': 0.32, '.': 0.6, '?': 0.65, '!': 0.6}
RAPIDO, LENTO = 1.10, 0.90                          # cuánto se puede estirar el idioma que se adapta
VEL_MIN, VEL_MAX = 0.85, 1.10                       # velocidades de síntesis que siguen sonando naturales
# Pronunciaciones que se corrigen en los fonemas. «Atom» en americano lleva una t blanda (ˈæɾəm) y
# suena «Adam»; con t de verdad y vocal llena (ˈætʌm) se entiende el nombre del canal.
FONEMAS = {'en': [('ˈæɾəm', 'ˈætʌm')], 'es': []}

g = json.load(open(guion_path))
PRINCIPAL = g.get('principal', 'en')
OTRO = 'es' if PRINCIPAL == 'en' else 'en'
IDIOMAS = (PRINCIPAL, OTRO)
VOCES = g['voces']
CLIPS = os.path.join(salida, 'clips')
os.makedirs(CLIPS, exist_ok=True)

_kokoro = _whisper = _chatterbox = None
def chatterbox():
    """Chatterbox multilingüe (Resemble AI, licencia MIT), en CPU. Solo se usó en el inglés del episodio 9: era más
    expresivo que Kokoro, pero el usuario oyó ruido de fondo en las pausas y desde el 10 se volvió a Kokoro (am_puck). En
    español se inventa frases y coge acento. Se queda por si se vuelve a probar; el canon no lo usa ni lo instala."""
    global _chatterbox
    if _chatterbox is None:
        import torch
        _carga = torch.load
        torch.load = lambda *a, **k: _carga(*a, **{**k, 'map_location': 'cpu'})   # los pesos vienen guardados para CUDA
        from chatterbox.mtl_tts import ChatterboxMultilingualTTS
        _chatterbox = ChatterboxMultilingualTTS.from_pretrained(device=torch.device('cpu'))
    return _chatterbox
def kokoro():
    global _kokoro
    if _kokoro is None:
        from kokoro_onnx import Kokoro
        _kokoro = Kokoro(f'{modelos}/kokoro-v1.0.onnx', f'{modelos}/voices-v1.0.bin')
    return _kokoro

def whisper():
    global _whisper
    if _whisper is None:
        from faster_whisper import WhisperModel
        _whisper = WhisperModel('small', device='cpu', compute_type='int8')
    return _whisper

def recortar(a):
    """Quita el silencio de los bordes del clip, dejando 10 ms antes y 20 ms después."""
    e = np.abs(a)
    i = np.where(e > 0.01 * e.max())[0]
    return a[max(0, i[0] - 240):i[-1] + 480] if len(i) else a

def limpiar(a):
    """Bordes de un clip de Chatterbox: un afftdn ligero contra el siseo, recorte por la envolvente (a 32 dB del pico; los
    restos de menos de 40 ms, como chasquidos y respiraciones, no cuentan) y entrada y salida suaves. Sin esto, cada clip
    acaba con una cola de siseo que corta en seco al silencio (se oía como ruido de fondo en las pausas)."""
    with tempfile.TemporaryDirectory() as d:
        sf.write(f'{d}/a.wav', a, SR)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{d}/a.wav', '-af', 'afftdn=nf=-45:nr=12', f'{d}/b.wav'], check=True)
        a, _ = sf.read(f'{d}/b.wav')
    h = int(SR * 0.01); n = len(a) // h
    env = np.array([np.sqrt(np.mean(a[i * h:(i + 1) * h] ** 2)) for i in range(n)])
    voz = env > np.percentile(env, 95) * 10 ** (-32 / 20)
    idx = np.flatnonzero(np.diff(np.r_[0, voz.astype(int), 0])); tr = [(i, j) for i, j in zip(idx[::2], idx[1::2]) if j - i >= 4]
    if not tr:
        return a
    a = a[max(0, tr[0][0] * h - int(0.02 * SR)):min(len(a), tr[-1][1] * h + int(0.06 * SR))].copy()
    fi, fo = int(0.012 * SR), int(0.05 * SR)
    a[:fi] *= np.linspace(0, 1, fi); a[-fo:] *= np.linspace(1, 0, fo) ** 2
    return a

def sintetizar(texto, l, vel):
    v = VOCES[l]
    if v.get('motor') == 'chatterbox':
        # «vel» es aquí el número de intento: cada intento es otra toma (otra semilla), no otra velocidad
        ref = os.path.join(os.path.dirname(os.path.abspath(__file__)), v['ref'])
        clave = hashlib.sha1(f"cb|{v['ref']}|{v.get('exag', 0.6)}|{v.get('cfg', 0.4)}|{vel}|{texto}".encode()).hexdigest()[:16]
        f = f'{CLIPS}/{l}-{clave}.wav'
        if not os.path.exists(f):
            import torch
            torch.manual_seed(int(vel * 1000) + 7)
            m = chatterbox()
            w = m.generate(texto, language_id=l, audio_prompt_path=ref, exaggeration=v.get('exag', 0.6), cfg_weight=v.get('cfg', 0.4))
            a = w.squeeze().numpy()
            if m.sr != SR:
                a = np.interp(np.linspace(0, len(a) - 1, int(len(a) * SR / m.sr)), np.arange(len(a)), a)
            sf.write(f, limpiar(a), SR)
        a, _ = sf.read(f)
        return a, f
    clave = hashlib.sha1(f"{v['voz']}|{v['lang']}|{vel:.3f}|{texto}|{FONEMAS[l]}".encode()).hexdigest()[:16]
    f = f'{CLIPS}/{l}-{clave}.wav'
    if not os.path.exists(f):
        fon = kokoro().tokenizer.phonemize(texto, v['lang'])
        for x, y in FONEMAS[l]:
            fon = fon.replace(x, y)
        a, sr = kokoro().create(fon, voice=v['voz'], speed=vel, lang=v['lang'], is_phonemes=True)
        assert sr == SR
        sf.write(f, recortar(a), SR)
    a, _ = sf.read(f)
    return a, f

def norm(w):
    w = unicodedata.normalize('NFD', w.lower())
    return re.sub(r'[^a-z0-9]', '', ''.join(c for c in w if unicodedata.category(c) != 'Mn'))

def oir(f, l):
    """Palabras que oye Whisper en el clip: [(palabra, inicio, fin)], en caché."""
    cache = f[:-4] + '.whisper2.json'
    if os.path.exists(cache):
        return [tuple(x) for x in json.load(open(cache))]
    a, _ = sf.read(f)
    # Con 0,3 s de silencio alrededor: si el clip empieza en seco, Whisper oye mal la primera palabra.
    a = np.concatenate([np.zeros(int(0.3 * SR)), a, np.zeros(int(0.3 * SR))])
    a16 = np.interp(np.linspace(0, len(a) - 1, int(len(a) * 16000 / SR)), np.arange(len(a)), a).astype(np.float32)
    segs, _ = whisper().transcribe(a16, language=l, beam_size=5, word_timestamps=True)
    p = [(w.word.strip(), round(max(0.0, w.start - 0.3), 3), round(max(0.0, w.end - 0.3), 3)) for s in segs for w in s.words]
    json.dump(p, open(cache, 'w'), ensure_ascii=False)
    return p

# Letras deletreadas («a de ene» = ADN): Whisper las escribe juntas.
LETRAS = {'a': 'a', 'be': 'b', 'ce': 'c', 'de': 'd', 'e': 'e', 'efe': 'f', 'ge': 'g', 'hache': 'h', 'i': 'i',
          'jota': 'j', 'ka': 'k', 'ele': 'l', 'eme': 'm', 'ene': 'n', 'o': 'o', 'pe': 'p', 'cu': 'q', 'erre': 'r',
          'ese': 's', 'te': 't', 'u': 'u', 'uve': 'v', 'equis': 'x', 'zeta': 'z'}

def misma(e, o):
    """Si dos trozos son lo mismo dicho de otra forma: «light-day»/«light day», «mediría»/«me diría»,
    «a de ene»/«ADN», o palabras que solo cambian en una letra («you've»/«you», «our»/«are»)."""
    if ''.join(e) == ''.join(o) or ''.join(LETRAS.get(x, '?') for x in e) == ''.join(o):
        return True
    return len(e) == len(o) and all(difflib.SequenceMatcher(a=x, b=y).ratio() >= 0.6 for x, y in zip(e, o))

def problemas(texto, a, oidas):
    """Lo que falla en un clip comparado con su texto: (fallos, avisos), listas de textos legibles."""
    out = []
    esp = [norm(w) for w in texto.replace('-', ' ').split() if norm(w)]
    oid = [norm(x) for w, _, _ in oidas for x in w.replace('-', ' ').split() if norm(x)]
    sm = difflib.SequenceMatcher(a=esp, b=oid, autojunk=False)
    for op, a0, a1, b0, b1 in sm.get_opcodes():
        if op == 'equal':
            continue
        e, o = esp[a0:a1], oid[b0:b1]
        if any(re.search(r'\d', x) for x in o):          # cifras: Whisper escribe «12» por «twelve»
            continue
        if op == 'replace' and misma(e, o):
            continue
        if op == 'insert' and all(x in esp[max(0, a0 - 2):a0 + 2] for x in o):
            out.append(f"repite «{' '.join(o)}»")
        elif op == 'insert':
            out.append(f"sobra «{' '.join(o)}»")
        elif op == 'delete':
            out.append(f"falta «{' '.join(e)}»")
        else:
            out.append(f"«{' '.join(e)}» suena «{' '.join(o)}»")
    # Huecos dentro de una palabra con voz a los dos lados (al menos 80 ms). Las oclusiones de
    # consonantes («exacto», «mercurio») duran hasta ~0,17 s con esta voz, así que solo es fallo
    # (y se vuelve a sintetizar) un hueco de más de 0,2 s; entre 0,16 y 0,2 s queda como aviso para
    # escucharlo. Una palabra partida de verdad («cen…ter») suele salir además en el texto, porque
    # Whisper la oye como dos palabras.
    h, w = int(SR * 0.0025), int(SR * 0.01)
    n = max(1, (len(a) - w) // h)
    rms = np.sqrt(np.array([np.mean(a[i * h:i * h + w] ** 2) for i in range(n)]))
    umbral = 0.08 * np.percentile(rms, 95)
    avisos = []
    for pal, s, e in oidas:
        if e - s < 0.3 or re.search(r'\d', pal):   # «26,000» son varias palabras dichas
            continue
        i0, i1 = int((s + 0.06) * SR / h), int((e - 0.06) * SR / h)
        bajo = rms[i0:i1] < umbral
        k, largo = 0, 0.0
        for j, b in enumerate(bajo):
            k = k + 1 if b else 0
            if k and (~bajo[:j - k + 1]).sum() * h / SR >= 0.08 and (~bajo[j + 1:]).sum() * h / SR >= 0.08:
                largo = max(largo, k * h / SR)
        if largo > 0.2:
            out.append(f"hueco de {largo:.2f} s dentro de «{pal}»")
        elif largo > 0.16:
            avisos.append(f"escuchar «{pal}» (hueco de {largo:.2f} s)")
    return out, avisos

def clip_limpio(texto, l, velocidades):
    """El primer clip sin problemas entre las velocidades dadas; si no hay, el que menos tenga."""
    mejor = None
    for vel in velocidades:
        a, f = sintetizar(texto, l, vel)
        p, av = problemas(texto, a, oir(f, l))
        if mejor is None or len(p) < len(mejor[3]):
            mejor = (a, f, vel, p, av)
        if not p:
            break
    return mejor

# Corte tras un signo seguido de espacio. No se corta tras una inicial con punto («B.C.», «a. C.»).
CORTE = re.compile(r'(?<![\s.][A-Za-z]\.)(?<=[,;:.?!])\s+|\s+—\s+')

def trozos_voz(texto):
    """[(trozo, signo final)] de una frase, partida por sus signos; el último trozo lleva signo ''."""
    out, i = [], 0
    for m in CORTE.finditer(texto):
        t = texto[i:m.start()].strip()
        if t:
            out.append([t, '—' if '—' in m.group() else t[-1]])
        i = m.end()
    out.append([texto[i:].strip(), ''])
    # Un trozo de una sola palabra suena cortado (y Whisper lo oye mal): se pega al siguiente si acaba en coma
    # o dos puntos («So,», «Piénsalo:»), y al anterior si cierra la frase («persas.»).
    k = 0
    while len(out) > 1 and k < len(out):
        if len(out[k][0].split()) >= 2:
            k += 1
        elif k + 1 < len(out) and (out[k][1] in ',:' or k == 0):
            out[k + 1][0] = out[k][0] + ' ' + out[k + 1][0]; out.pop(k)
        else:
            out[k - 1][0] += ' ' + out[k][0]; out[k - 1][1] = out[k][1]; out.pop(k)
    return [tuple(x) for x in out]

def oraciones(texto):
    """Para Chatterbox, que hace bien sus comas: solo se parte por oraciones (y dos puntos)."""
    p = [x for x in re.split(r'(?<=[.?!:])\s+', texto) if x.strip()]
    return [(x, x[-1] if k + 1 < len(p) else '') for k, x in enumerate(p)]

def frase_voz(texto, l, velocidades):
    """La frase en trozos limpios unidos con su pausa: (audio, oídas, velocidad, fallos, avisos)."""
    partes, oidas, prob, av, vels, t = [], [], [], [], [], 0.0
    cb = VOCES[l].get('motor') == 'chatterbox'
    for trozo, signo in (oraciones(texto) if cb else trozos_voz(texto)):
        a, f, vel, p, v = clip_limpio(trozo, l, velocidades)
        oidas += [(w, s + t, x + t) for w, s, x in oir(f, l)]
        prob += p; av += v; vels.append(vel)
        partes.append(a)
        t += len(a) / SR
        if signo:
            sil = np.zeros(int(PAUSA_DENTRO[signo] * SR))
            partes.append(sil)
            t += len(sil) / SR
    return np.concatenate(partes), oidas, float(np.mean(vels)), prob, av

def estirar(a, tempo):
    if abs(tempo - 1) < 0.005:
        return a
    with tempfile.TemporaryDirectory() as d:
        sf.write(f'{d}/a.wav', a, SR)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'{d}/a.wav', '-filter:a', f'rubberband=tempo={tempo:.5f}', f'{d}/b.wav'], check=True)
        b, _ = sf.read(f'{d}/b.wav')
    return b

def pausa_tras(f):
    if 'pausa' in f:
        return f['pausa']
    return PAUSA.get(f[PRINCIPAL].rstrip('»"\'')[-1:], 0.55)

escenas = [e for e in g['escenas'] if not solo or e['id'] in solo]
pistas = {l: [] for l in IDIOMAS}
palabras = {l: [] for l in IDIOMAS}
subtitulos = {l: [] for l in IDIOMAS}
lineas, informe, t_global = [], [], 0.0
v0 = {l: VOCES[l].get('velocidad', 1.0) for l in IDIOMAS}
for e in escenas:
    entrada = ENTRADA_CARTELA if e.get('cartela') else ENTRADA
    if e['frases'][0].get('acto'):
        entrada = max(entrada, ENTRADA_ACTO)
    colocados, t = [], entrada
    marcas, frases = {}, []
    for k, f in enumerate(e['frases']):
        if k and f.get('acto'):
            t += ENTRADA_ACTO - pausa_tras(e['frases'][k - 1])
        texto = {l: f.get(f'{l}_voz', f[l]) for l in IDIOMAS}
        intentos_p = [0, 1, 2, 3] if VOCES[PRINCIPAL].get('motor') == 'chatterbox' else [v0[PRINCIPAL], v0[PRINCIPAL] - 0.03, v0[PRINCIPAL] + 0.03, v0[PRINCIPAL] + 0.05]
        a_p, oid_p, vel_p, prob_p, av_p = frase_voz(texto[PRINCIPAL], PRINCIPAL, intentos_p)
        d_p = len(a_p) / SR
        # El otro idioma: primero a su velocidad; si queda lejos, a la que lo acerca.
        a_o = frase_voz(texto[OTRO], OTRO, [v0[OTRO]])[0]
        r = len(a_o) / SR / d_p
        vel = v0[OTRO] if 0.95 <= r <= 1.05 else float(np.clip(v0[OTRO] * r / (1.03 if r > 1 else 0.98), VEL_MIN, VEL_MAX))
        a_o, oid_o, vel_o, prob_o, av_o = frase_voz(texto[OTRO], OTRO, [vel, max(VEL_MIN, vel - 0.04), min(VEL_MAX, vel + 0.04)])
        tempo = float(np.clip(len(a_o) / SR / d_p, LENTO, RAPIDO))
        oidas = {PRINCIPAL: oid_p, OTRO: [(w, s / tempo, x / tempo) for w, s, x in oid_o]}
        a_o = estirar(a_o, tempo)
        hueco = max(d_p, len(a_o) / SR)
        colocados.append((t, {PRINCIPAL: a_p, OTRO: a_o}))
        marcas[f['marca']] = round(t, 3)
        marcas[f['marca'] + '_fin'] = round(t + d_p, 3)
        frases.append([round(t, 3), round(t + hueco, 3)])
        for l, a in ((PRINCIPAL, a_p), (OTRO, a_o)):
            ini = t_global + t
            for w, s, x in oidas[l]:
                palabras[l].append({'p': w, 'i': round(ini + s, 3), 'f': round(ini + x, 3), 'escena': e['id']})
            subtitulos[l].append((ini, ini + len(a) / SR, f[l]))
        for l, vel_, tempo_, prob, av in ((PRINCIPAL, vel_p, 1.0, prob_p, av_p), (OTRO, vel_o, tempo, prob_o, av_o)):
            informe.append({'escena': e['id'], 'frase': f['n'], 'idioma': l, 'velocidad': round(vel_, 3),
                            'tempo': round(tempo_, 3), 'duracion': round(len(a_p if l == PRINCIPAL else a_o) / SR, 2),
                            'texto': texto[l], 'problemas': prob, 'avisos': av})
            if prob or av:
                print(f"  {'⚠' if prob else '·'} {e['id']} frase {f['n']} {l}: {'; '.join(prob + av)}", flush=True)
        t += hueco + (pausa_tras(f) if k + 1 < len(e['frases']) else 0)
    fin_voz = t
    duracion = round(fin_voz + SALIDA, 3)
    n = int(round(duracion * SR))
    for l in IDIOMAS:
        buf = np.zeros(n)
        for t0, a in colocados:
            i = int(round(t0 * SR))
            buf[i:i + len(a[l])] += a[l][:n - i]
        pistas[l].append(buf)
    linea = {'id': e['id'], 'estilo': e['estilo'], 'inicio': round(t_global, 3), 'duracion': duracion,
             'voz': [entrada, round(fin_voz, 3)], 'marcas': marcas, 'frases': frases}
    if e.get('cartela'):
        linea['cartela'] = e['cartela']
    lineas.append(linea)
    print(f"{e['id']:18s} {duracion:5.1f} s · {len(e['frases'])} frases", flush=True)
    t_global += duracion

energia = {}
for l in IDIOMAS:
    voz = np.concatenate(pistas[l])
    sf.write(f'{salida}/voz-{l}.wav', voz, SR)
    v = SR // FPS
    nf = int(np.ceil(len(voz) / v))
    en = np.array([np.sqrt(np.mean(voz[i * v:(i + 1) * v] ** 2)) for i in range(nf)])
    energia[l] = np.clip(en / np.percentile(en[en > 0], 95), 0, 1)

def hms(x):
    h, r = divmod(x, 3600); m, s = divmod(r, 60)
    return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{int(round((s % 1) * 1000)):03d}"

from subtitulos import trozos   # cortes legibles: en un signo o antes de «que», «y»…, nunca tras «de», «la», «the»…

for l in IDIOMAS:
    with open(f'{salida}/subtitulos-{l}.srt', 'w') as fsrt:
        k = 0
        for ini, fin, texto in subtitulos[l]:
            partes = trozos(texto)
            total = sum(len(p) for p in partes)
            t0 = ini
            for p in partes:
                t1 = t0 + (fin - ini) * len(p) / total
                k += 1
                fsrt.write(f"{k}\n{hms(t0)} --> {hms(t1 + (0.25 if p is partes[-1] else 0))}\n{p}\n\n")
                t0 = t1

nf = int(np.ceil(t_global * FPS))
comun = np.maximum(*(np.pad(energia[l], (0, max(0, nf - len(energia[l]))))[:nf] for l in IDIOMAS))
json.dump({'fps': FPS, 'duracion': round(t_global, 3), 'fotogramas': nf, 'principal': PRINCIPAL, 'escenas': lineas,
           'palabras': palabras, 'energia': [round(float(x), 3) for x in comun]},
          open(f'{salida}/linea.json', 'w'), ensure_ascii=False)
json.dump(informe, open(f'{salida}/informe.json', 'w'), ensure_ascii=False, indent=1)
if ruta_marcas:
    json.dump({x['id']: {'duracion': x['duracion'], 'marcas': x['marcas'], 'voz': x['voz'], 'fps': FPS, 'frases': x['frases'],
                         **({'cartela': x['cartela']} if 'cartela' in x else {})} for x in lineas},
              open(ruta_marcas, 'w'), ensure_ascii=False, indent=1)
senalados = [x for x in informe if x['problemas']]
avisados = [x for x in informe if x['avisos'] and not x['problemas']]
print(f"total {t_global:.1f} s ({int(t_global // 60)}:{int(t_global % 60):02d}), {nf} fotogramas; "
      f"{len(senalados)} de {len(informe)} clips con fallos y {len(avisados)} para escuchar (ver informe.json)")
