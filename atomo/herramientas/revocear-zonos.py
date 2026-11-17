"""Vuelve a locutar con ZONOS3 la pista española de un episodio YA montado, sin mover la línea de tiempo del vídeo.

    $VOZ/venv/bin/python -I atomo/herramientas/revocear-zonos.py atomo/build/largo/<ep> episodios/<carpeta>/guion.json

Hecho para el 37 (17/11/2026): la emoción a 1 hacía subir el tono hasta el grito en 18 de 31 frases, y el usuario eligió
de oído la media emoción (0,5). Usa los controles de guion.json. Cada frase se locuta por oraciones (modo cuento, 0,32 s
entre una y otra) y empieza donde empezaba; de cada oración se queda con la toma que menos sube de tono (semilla 1, y la
2 o la 3 si la 1 sube más de 30 Hz sobre 140 Hz en algún tramo de 2 s). Si la frase no cabe hasta la siguiente, prueba
otras tomas y, como último recurso, la acelera hasta un 8 % con atempo. Al final, el nivelador lento (NIVELADOR_ES) y
reescribe voz-es.wav (guarda la de antes en voz-es-antes.wav). Después: producir.sh … --desde montar y los Shorts.
"""
import json, os, re, subprocess, sys, tempfile, numpy as np, soundfile as sf
from math import gcd
from scipy.signal import resample_poly
D, guion = sys.argv[1], sys.argv[2]
g = json.load(open(guion)); V = g['voces']['es']; L = json.load(open(f'{D}/linea.json'))
M = '/root/.cache/ask-atom/voz/modelos'; CLI = '/root/.cache/ask-atom/voz/zonos3/repo/servers/ggml/build/zonos3-cli'
NIVELADOR = 'dynaudnorm=f=300:g=11:p=0.5:m=4:r=0.1'
viejo, SR = sf.read(f'{D}/voz-es.wav'); viejo = viejo.mean(1) if viejo.ndim > 1 else viejo
CACHE = f'{D}/zonos-media'; os.makedirs(CACHE, exist_ok=True)

def f0(x):
    x = x - x.mean(); c = np.correlate(x, x, 'full')[len(x) - 1:]
    if c[0] <= 0: return np.nan
    k = SR // 400 + np.argmax(c[SR // 400:SR // 70]); return SR / k if c[k] / c[0] > 0.45 else np.nan
def pico(a):
    W = SR // 4; P = [f0(a[j:j + W][:2048]) for j in range(0, len(a) - W, W) if np.sqrt((a[j:j + W] ** 2).mean()) > 0.01 * np.abs(a).max()]
    P = np.array(P)
    return max([np.nanmedian(P[i:i + 8]) for i in range(len(P) - 8)] or [np.nanmedian(P) if len(P) else 0])
def recortar(a):
    e = np.abs(a); i = np.where(e > 0.01 * e.max())[0]
    return a[max(0, i[0] - 240):i[-1] + 480] if len(i) else a
def toma(texto, s):
    import hashlib
    f = f"{CACHE}/{hashlib.sha1(f'{sorted(V['controles'].items())}|{s}|{texto}'.encode()).hexdigest()[:16]}.wav"
    if not os.path.exists(f):
        with tempfile.TemporaryDirectory() as d:
            o = [CLI, f'{M}/zonos3/backbone-ptq.gguf', '--cpu', '--tts', texto, f'{d}/z.wav', '--speaker-embedding',
                 f"{M}/zonos3/voces/{V['voz']}.embedding.npy", '--seed', str(s), '--headroom-db', str(V.get('headroom', 3))]
            for c, x in sorted(V['controles'].items()): o += ['--control', f'{c}={x}']
            subprocess.run(o, check=True, capture_output=True); a, sr = sf.read(f'{d}/z.wav')
        a = a.mean(1) if a.ndim > 1 else a; k = gcd(SR, sr)
        sf.write(f, recortar(resample_poly(a, SR // k, sr // k) if sr != SR else a), SR)
    return sf.read(f)[0]
def oraciones(t):
    p = [x for x in re.split(r'(?<=[.?!])\s+', t) if x.strip()]; j = []
    for x in p:
        if j and re.search(r'(^|\s)[A-ZÁÉÍÓÚ]\.$', j[-1]): j[-1] += ' ' + x
        else: j.append(x)
    return j
def mejor(o, semillas):
    r = []
    for s in semillas:
        a = toma(o, s); r.append((pico(a), s, a))
        if r[-1][0] < 170: break
    return sorted(r, key=lambda x: x[0])
def atempo(a, k):
    with tempfile.TemporaryDirectory() as d:
        sf.write(f'{d}/a.wav', a, SR)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{d}/a.wav', '-af', f'atempo={k:.4f}', f'{d}/b.wav'], check=True)
        return sf.read(f'{d}/b.wav')[0]

nuevo = np.zeros_like(viejo); n = 0; textos = [f.get('es_voz', f['es']) for e in g['escenas'] for f in e['frases']]
for e in L['escenas']:
    fr = e['frases']
    for i, (t0, t1) in enumerate(fr):
        A = e['inicio'] + t0; B = e['inicio'] + (fr[i + 1][0] if i + 1 < len(fr) else e['duracion'])
        ia, ib = int(A * SR), int(B * SR); seg = viejo[ia:ib]
        v = np.flatnonzero(np.abs(seg) > 0.01 * np.abs(seg).max()); ini = v[0] if len(v) else 0
        sitio = (ib - ia - ini) / SR - 0.15
        tomas = [mejor(o, (1, 2, 3)) for o in oraciones(textos[n])]
        partes = []
        for k, t in enumerate(tomas):
            partes.append(t[0][2])
            if k + 1 < len(tomas): partes.append(np.zeros(int(0.32 * SR)))
        a = np.concatenate(partes); nota = ''
        if len(a) / SR > sitio:   # no cabe: la toma más corta de cada oración
            partes = []
            for k, t in enumerate(tomas):
                partes.append(min(t, key=lambda x: len(x[2]))[2])
                if k + 1 < len(tomas): partes.append(np.zeros(int(0.32 * SR)))
            a = np.concatenate(partes); nota = ' (tomas más cortas)'
        if len(a) / SR > sitio:
            k = min(1.08, len(a) / SR / sitio); a = atempo(a, k); nota += f' (atempo {k:.3f})'
        a = a[:int(sitio * SR)]
        rv = np.sqrt((seg[v[0]:v[-1]] ** 2).mean()) if len(v) else 0.1; a = a * min(rv / np.sqrt((a ** 2).mean()), 0.93 / np.abs(a).max())
        nuevo[ia + ini:ia + ini + len(a)] = a
        n += 1
        print(f'frase {n:2d}: {len(a)/SR:5.1f} s de {sitio:5.1f}, pico de tono {max(t[0][0] for t in tomas):.0f} Hz{nota}', flush=True)
os.replace(f'{D}/voz-es.wav', f'{D}/voz-es-antes.wav')
with tempfile.TemporaryDirectory() as d:
    sf.write(f'{d}/a.wav', nuevo, SR)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f'{d}/a.wav', '-af', NIVELADOR, '-c:a', 'pcm_s16le', f'{D}/voz-es.wav'], check=True)
print('hecho: voz-es.wav')
