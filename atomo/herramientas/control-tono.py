# Compara, frase a frase, el tramo de 2 s con el tono más alto de voz-es-antes.wav y voz-es.wav (sobre la mediana de cada
# pista, sin errores de octava). Más de +30 Hz suena a que la voz se dispara. Uso: python control-tono.py atomo/build/largo/<ep>
import json, sys, numpy as np, soundfile as sf
D = sys.argv[1]; L = json.load(open(f'{D}/linea.json'))
def f0(x, SR):
    x = x - x.mean(); c = np.correlate(x, x, 'full')[len(x)-1:]
    if c[0] <= 0: return np.nan
    k = SR // 400 + np.argmax(c[SR // 400:SR // 70]); return SR / k if c[k] / c[0] > 0.5 else np.nan
def perfil(f):
    a, SR = sf.read(f); a = a.mean(1) if a.ndim > 1 else a; W = SR // 4; T = []
    for j in range(0, len(a) - W, W):
        w = a[j:j+W]; e = np.sqrt((w**2).mean())
        T.append((j / SR, e, f0(w[:2048], SR) if e > 0.03 else np.nan))
    T = np.array(T); med = np.nanmedian(T[:, 2]); T[(T[:, 2] > 1.6 * med) | (T[:, 2] < med / 1.6), 2] = np.nan
    return T, med
A, ma = perfil(f'{D}/voz-es-antes.wav'); B, mb = perfil(f'{D}/voz-es.wav')
print(f'mediana antes {ma:.0f} Hz, ahora {mb:.0f} Hz')
n = 0; ca = cb = 0
for e in L['escenas']:
    fr = e['frases']
    for i, (t0, t1) in enumerate(fr):
        n += 1; s0 = e['inicio'] + t0; s1 = e['inicio'] + (fr[i+1][0] if i + 1 < len(fr) else e['duracion'])
        def pk(T, med):
            s = T[(T[:, 0] >= s0) & (T[:, 0] < s1), 2]; s = s[np.isfinite(s)]
            if len(s) < 8: return 0
            return max(np.median(s[k:k+8]) for k in range(len(s) - 7)) - med
        pa, pb = pk(A, ma), pk(B, mb); ca += pa > 30; cb += pb > 30
        print(f'frase {n:2d}: antes +{pa:3.0f} Hz   ahora +{pb:3.0f} Hz' + ('   <<' if pb > 30 else ''))
print(f'frases con un tramo de 2 s a más de +30 Hz: antes {ca}, ahora {cb}')
