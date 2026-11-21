"""Busca en la pista de voz de un episodio montado los tramos donde la voz sube hacia el grito: 3 s seguidos con el volumen
y el tono a la vez por encima de la mediana de la pista (+2,5 dB y +30 Hz), y por frase lo que sube del primer tercio al
último. Desde el 37: ZONOS3 con emoción, en párrafos largos, a veces sube hasta gritar (el usuario lo oyó de 0:20 a 0:33).

    $VOZ/venv/bin/python atomo/herramientas/control-gritos.py atomo/build/largo/<ep> es
"""
import json, sys, numpy as np, soundfile as sf
D = sys.argv[1]; L = json.load(open(f'{D}/linea.json')); a, SR = sf.read(f'{D}/voz-{sys.argv[2]}.wav')
if a.ndim > 1: a = a.mean(1)
def f0(x):
    x = x - x.mean(); c = np.correlate(x, x, 'full')[len(x)-1:]
    lo, hi = SR // 400, SR // 70
    if c[0] <= 0: return None
    k = lo + np.argmax(c[lo:hi]); return SR / k if c[k] / c[0] > 0.45 else None
n = 0; filas = []
for e in L['escenas']:
    fr = e['frases']
    for i, (t0, t1) in enumerate(fr):
        n += 1; A = e['inicio'] + t0; B = e['inicio'] + (fr[i+1][0] if i + 1 < len(fr) else e['duracion'])
        seg = a[int(A*SR):int(B*SR)]; W = int(0.5*SR); rms = []; ff = []; cen = []
        for j in range(0, len(seg) - W, W):
            w = seg[j:j+W]; r = np.sqrt((w**2).mean())
            if r < 0.01: continue
            rms.append(20*np.log10(r)); S = np.abs(np.fft.rfft(w)); fq = np.fft.rfftfreq(len(w), 1/SR); cen.append((S*fq).sum()/S.sum())
            v = f0(w[:2048]); ff.append(v if v else np.nan)
        if len(rms) < 6: continue
        k = len(rms) // 3; ff = np.array(ff)
        d = lambda x: np.nanmedian(x[-k:]) - np.nanmedian(x[:k])
        filas.append((n, A, d(np.array(rms)), d(ff), d(np.array(cen)), np.nanmax(ff[-k:]) if np.isfinite(ff[-k:]).any() else 0))
for n, A, dr, dp, dc, pm in filas:
    m = '  <<' if dr > 3 or dp > 25 or dc > 400 else ''
    print(f'{n:2d} {int(A//60)}:{A%60:05.2f}  volumen {dr:+5.1f} dB  tono {dp:+6.1f} Hz  brillo {dc:+6.0f} Hz  tono max final {pm:5.0f}{m}')
print('--- tramos de 3 s con tono y volumen altos a la vez (respecto a la mediana de la pista)')
W = int(0.5*SR); T = []
for j in range(0, len(a) - W, W):
    w = a[j:j+W]; r = np.sqrt((w**2).mean())
    if r < 0.01: continue
    T.append((j/SR, 20*np.log10(r), f0(w[:2048]) or np.nan))
T = np.array(T); mr = np.median(T[:,1]); mp = np.nanmedian(T[:,2])
print(f'mediana: {mr:.1f} dB, tono {mp:.0f} Hz')
for i in range(0, len(T) - 5):
    b = T[i:i+6]
    if np.median(b[:,1]) - mr > 2.5 and np.nanmedian(b[:,2]) - mp > 30:
        print(f'{int(b[0,0]//60)}:{b[0,0]%60:05.2f}  +{np.median(b[:,1])-mr:.1f} dB  +{np.nanmedian(b[:,2])-mp:.0f} Hz')
