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
     - El otro se sintetiza a una velocidad que lo acerque (entre 0,92 y 1,10, para que siga sonando
       natural) y luego se estira entero con rubberband, como mucho un 5 % en cada sentido.
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
ENTRADA, ENTRADA_CARTELA, SALIDA = 0.3, 1.2, 0.45   # s de escena antes de hablar (con cartela, más) y después
PAUSA = {'.': 0.32, '?': 0.45, '!': 0.4, ':': 0.3}  # silencio tras la frase según su último signo
RAPIDO, LENTO = 1.05, 0.95                          # cuánto se puede estirar el idioma que se adapta
VEL_MIN, VEL_MAX = 0.92, 1.10                       # velocidades de síntesis que siguen sonando naturales
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

_kokoro = _whisper = None
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

def sintetizar(texto, l, vel):
    v = VOCES[l]
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
    cache = f[:-4] + '.whisper.json'
    if os.path.exists(cache):
        return [tuple(x) for x in json.load(open(cache))]
    a, _ = sf.read(f)
    a16 = np.interp(np.linspace(0, len(a) - 1, int(len(a) * 16000 / SR)), np.arange(len(a)), a).astype(np.float32)
    segs, _ = whisper().transcribe(a16, language=l, beam_size=5, word_timestamps=True)
    p = [(w.word.strip(), round(w.start, 3), round(w.end, 3)) for s in segs for w in s.words]
    json.dump(p, open(cache, 'w'), ensure_ascii=False)
    return p

def problemas(texto, a, oidas):
    """Lo que falla en un clip comparado con su texto: (fallos, avisos), listas de textos legibles."""
    out = []
    esp = [norm(w) for w in texto.split() if norm(w)]
    oid = [norm(w) for w, _, _ in oidas if norm(w)]
    sm = difflib.SequenceMatcher(a=esp, b=oid, autojunk=False)
    for op, a0, a1, b0, b1 in sm.get_opcodes():
        if op == 'equal':
            continue
        e, o = esp[a0:a1], oid[b0:b1]
        if any(re.search(r'\d', x) for x in o):          # cifras: Whisper escribe «12» por «twelve»
            continue
        if op == 'replace' and len(e) == len(o) and all(difflib.SequenceMatcher(a=x, b=y).ratio() >= 0.6 for x, y in zip(e, o)):
            continue                                        # «you've»/«you», «our»/«are»: misma palabra
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
        if e - s < 0.3:
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
    return PAUSA.get(f[PRINCIPAL].rstrip('»"\'')[-1:], 0.32)

escenas = [e for e in g['escenas'] if not solo or e['id'] in solo]
pistas = {l: [] for l in IDIOMAS}
palabras = {l: [] for l in IDIOMAS}
subtitulos = {l: [] for l in IDIOMAS}
lineas, informe, t_global = [], [], 0.0
v0 = {l: VOCES[l]['velocidad'] for l in IDIOMAS}
for e in escenas:
    entrada = ENTRADA_CARTELA if e.get('cartela') else ENTRADA
    colocados, t = [], entrada
    marcas, frases = {}, []
    for k, f in enumerate(e['frases']):
        texto = {l: f.get(f'{l}_voz', f[l]) for l in IDIOMAS}
        a_p, f_p, vel_p, prob_p, av_p = clip_limpio(texto[PRINCIPAL], PRINCIPAL, [v0[PRINCIPAL], v0[PRINCIPAL] - 0.03, v0[PRINCIPAL] + 0.03, v0[PRINCIPAL] + 0.05])
        d_p = len(a_p) / SR
        # El otro idioma: primero a su velocidad; si queda lejos, a la que lo acerca.
        a_o, _ = sintetizar(texto[OTRO], OTRO, v0[OTRO])
        r = len(a_o) / SR / d_p
        vel = v0[OTRO] if 0.95 <= r <= 1.05 else float(np.clip(v0[OTRO] * r / (1.03 if r > 1 else 0.98), VEL_MIN, VEL_MAX))
        a_o, f_o, vel_o, prob_o, av_o = clip_limpio(texto[OTRO], OTRO, [vel, max(VEL_MIN, vel - 0.04), min(VEL_MAX, vel + 0.04)])
        tempo = float(np.clip(len(a_o) / SR / d_p, LENTO, RAPIDO))
        oidas = {PRINCIPAL: oir(f_p, PRINCIPAL), OTRO: [(w, s / tempo, x / tempo) for w, s, x in oir(f_o, OTRO)]}
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

def trozos(texto, maximo=84):
    """Parte una frase larga en trozos de subtítulo, por el signo más cercano a la mitad."""
    if len(texto) <= maximo:
        return [texto]
    cortes = [m.end() for m in re.finditer(r'[,:;] ', texto)] or [m.end() for m in re.finditer(r' ', texto)]
    c = min(cortes, key=lambda x: abs(x - len(texto) / 2))
    return trozos(texto[:c].strip(), maximo) + trozos(texto[c:].strip(), maximo)

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
