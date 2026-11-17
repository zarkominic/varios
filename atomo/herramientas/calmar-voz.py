# Uso: $VOZ/venv/bin/python -I atomo/herramientas/calmar-voz.py atomo/build/largo/<ep> episodios/<carpeta>/guion.json <frases,…> <carpeta_salida> [semillas]
# Después, empalmar con las tomas elegidas (ver APRENDIZAJES, ep37).
# Rehace frases españolas de un episodio montado con otras tomas de ZONOS3 (otra semilla), oración a oración, y se queda
# con la toma que menos sube (volumen y tono del último tercio frente al primero). Escribe un informe y los clips elegidos.
import json, sys, re, os, subprocess, tempfile, numpy as np, soundfile as sf
from math import gcd
from scipy.signal import resample_poly
D, guion, frases, out = sys.argv[1], sys.argv[2], [int(x) for x in sys.argv[3].split(',')], sys.argv[4]
SEMILLAS = [int(x) for x in (sys.argv[5] if len(sys.argv) > 5 else '1,2,3,4,5').split(',')]
g = json.load(open(guion)); V = g['voces']['es']; M = '/root/.cache/ask-atom/voz/modelos'
CLI = '/root/.cache/ask-atom/voz/zonos3/repo/servers/ggml/build/zonos3-cli'
SR = 24000; os.makedirs(out, exist_ok=True)
def f0(x):
    x = x - x.mean(); c = np.correlate(x, x, 'full')[len(x)-1:]
    if c[0] <= 0: return np.nan
    k = SR // 400 + np.argmax(c[SR // 400:SR // 70]); return SR / k if c[k] / c[0] > 0.45 else np.nan
def subida(a):
    W = SR // 2; r, p = [], []
    for j in range(0, len(a) - W, W):
        w = a[j:j+W]; e = np.sqrt((w**2).mean())
        if e < 0.01 * np.abs(a).max(): continue
        r.append(20*np.log10(e)); p.append(f0(w[:2048]))
    if len(r) < 3: return 0, 0, np.nanmedian(p) if p else 0
    k = max(1, len(r)//3); r, p = np.array(r), np.array(p)
    return r[-k:].mean() - r[:k].mean(), np.nanmedian(p[-k:]) - np.nanmedian(p[:k]), np.nanmedian(p)
def recortar(a):
    e = np.abs(a); i = np.where(e > 0.01 * e.max())[0]
    return a[max(0, i[0] - 240):i[-1] + 480] if len(i) else a
def toma(texto, semilla):
    with tempfile.TemporaryDirectory() as d:
        o = [CLI, f'{M}/zonos3/backbone-ptq.gguf', '--cpu', '--tts', texto, f'{d}/z.wav', '--speaker-embedding',
             f"{M}/zonos3/voces/{V['voz']}.embedding.npy", '--seed', str(semilla), '--headroom-db', str(V.get('headroom', 3))]
        for c, x in sorted(V['controles'].items()): o += ['--control', f'{c}={x}']
        subprocess.run(o, check=True, capture_output=True); a, sr = sf.read(f'{d}/z.wav')
    if a.ndim > 1: a = a.mean(1)
    k = gcd(SR, sr); return recortar(resample_poly(a, SR // k, sr // k) if sr != SR else a)
def cuento(t):
    return [x for x in re.split(r'(?<=[.?!])\s+', t) if x.strip()]
n = 0; textos = {}
for e in g['escenas']:
    for f in e['frases']:
        n += 1
        if n in frases: textos[n] = f.get('es_voz', f['es'])
inf = {}
for n, t in textos.items():
    partes = []
    for i, o in enumerate(cuento(t)):
        res = []
        for s in SEMILLAS:
            a = toma(o, s); dv, dp, med = subida(a)
            nota = max(0, dv) + max(0, dp) / 8 + max(0, med - 150) / 10
            res.append((nota, s, dv, dp, med, len(a) / SR)); sf.write(f'{out}/f{n}-o{i}-s{s}.wav', a, SR)
            print(f'frase {n} oración {i} semilla {s}: volumen {dv:+.1f} dB, tono {dp:+.0f} Hz, tono medio {med:.0f}, {len(a)/SR:.1f} s, nota {nota:.1f}', flush=True)
        res.sort(); partes.append(res[0][1:])
    inf[n] = partes
json.dump(inf, open(f'{out}/elegidas.json', 'w'), indent=1)
