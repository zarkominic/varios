"""Nivelador por voz (desde el 41, aprobado de oído por el usuario el 19/11/2026).

El problema: en el 39 y el 40 el usuario oyó que «entre frase y frase cambia el volumen: va bajando hacia el final de la
oración y luego sube al iniciarla». Medido en el 41: en inglés cada oración caía de media 3–4 dB del primer cuarto al
último, y en español algo menos. dynaudnorm, speechnorm y acompressor (ffmpeg) no lo arreglaban: los silencios entre
oraciones los confunden (suben el ruido o reinician la ganancia).

Lo que hace: mide la sonoridad en marcos de 10 ms, calcula la sonoridad local SOLO con los marcos de voz (umbral −45 dB)
en una ventana corta, y aplica la ganancia que lleva cada tramo a la mediana de la pista (como mucho ±maxdb). En los
silencios mantiene la ganancia (no sube el ruido). Suaviza 0,12 s y limita picos a 0,98. No mueve nada en el tiempo.

Uso como orden, sobre una pista ya locutada (no la vuelve a nivelar si ya lo está):
    python3 atomo/herramientas/nivelar_voz.py atomo/build/largo/<ep>
"""
import json, os, sys
import numpy as np, soundfile as sf

# Ventana y tope por idioma, elegidos midiendo la caída por oración en el 41 (caida: ES 0,4 dB, EN 1,5 dB de mediana).
AJUSTE = {'es': (0.25, 9.0), 'en': (0.15, 12.0)}

def nivelar(x, sr, ventana=0.25, maxdb=9.0, suave=0.12):
    h = int(0.01 * sr); n = len(x) // h
    if n == 0:
        return x
    e = np.sqrt(np.mean(x[:n * h].reshape(n, h) ** 2, axis=1)) + 1e-9
    voz = 20 * np.log10(e) > -45
    if not voz.any():
        return x
    k = max(1, int(ventana / 0.01)); ker = np.ones(k)
    ps = np.convolve(np.where(voz, e ** 2, 0.0), ker, 'same'); cs = np.convolve(voz.astype(float), ker, 'same')
    with np.errstate(divide='ignore', invalid='ignore'):
        loc = np.where(cs > k * 0.3, 10 * np.log10(ps / np.maximum(cs, 1e-9) + 1e-18), np.nan)
    g = np.clip(np.nanmedian(loc[voz]) - loc, -maxdb, maxdb)
    idx = np.where(~np.isnan(g))[0]
    if len(idx) == 0:
        return x
    g = np.interp(np.arange(n), idx, g[idx])
    ks = max(1, int(suave / 0.01)); g = np.convolve(g, np.ones(ks) / ks, 'same')
    y = x * 10 ** (np.interp(np.arange(len(x)), np.arange(n) * h + h / 2, g) / 20)
    pk = np.max(np.abs(y))
    return y * (0.98 / pk) if pk > 0.98 else y

def nivelar_idioma(x, sr, l):
    v, m = AJUSTE.get(l, AJUSTE['es'])
    return nivelar(x, sr, v, m)

if __name__ == '__main__':
    D = sys.argv[1]
    marca = f'{D}/nivelado.json'
    hecho = json.load(open(marca)) if os.path.exists(marca) else {}
    FPS = 30
    energia = {}
    for l in ('en', 'es'):
        x, sr = sf.read(f'{D}/voz-{l}.wav')
        if not hecho.get(l):
            x = nivelar_idioma(x, sr, l)
            sf.write(f'{D}/voz-{l}.wav', x, sr)
            hecho[l] = list(AJUSTE[l])
            print(f'voz-{l}.wav nivelada', AJUSTE[l])
        else:
            print(f'voz-{l}.wav ya estaba nivelada')
        v = sr // FPS; nf = int(np.ceil(len(x) / v))
        en = np.array([np.sqrt(np.mean(x[i * v:(i + 1) * v] ** 2)) for i in range(nf)])
        energia[l] = np.clip(en / np.percentile(en[en > 0], 95), 0, 1)
    json.dump(hecho, open(marca, 'w'))
    # La energía de linea.json (la boca de los personajes) se rehace con la voz nivelada.
    lj = f'{D}/linea.json'
    if os.path.exists(lj):
        L = json.load(open(lj)); nf = L['fotogramas']
        comun = np.maximum(*(np.pad(energia[l], (0, max(0, nf - len(energia[l]))))[:nf] for l in ('en', 'es')))
        L['energia'] = [round(float(x), 3) for x in comun]
        json.dump(L, open(lj, 'w'), ensure_ascii=False)
        print('linea.json: energía rehecha')
