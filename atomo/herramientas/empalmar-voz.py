# Uso: $VOZ/venv/bin/python -I atomo/herramientas/empalmar-voz.py atomo/build/largo/<ep> <carpeta de calmar-voz.py>
# Pone en voz-es.wav, en su sitio y con el mismo nivel, las tomas elegidas por calmar-voz.py; luego producir.sh --desde montar.
import json, sys, numpy as np, soundfile as sf
D, C = sys.argv[1], sys.argv[2]
L = json.load(open(f'{D}/linea.json')); E = json.load(open(f'{C}/elegidas.json'))
a, SR = sf.read(f'{D}/voz-es.wav'); mono = a.ndim == 1
pos = {}; n = 0
for e in L['escenas']:
    fr = e['frases']
    for i, (t0, t1) in enumerate(fr):
        n += 1; pos[n] = (e['inicio'] + t0, e['inicio'] + (fr[i+1][0] if i + 1 < len(fr) else e['duracion']))
for k, tomas in E.items():
    k = int(k); A, B = pos[k]
    partes = []
    for i, t in enumerate(tomas):
        x, _ = sf.read(f'{C}/f{k}-o{i}-s{t[0]}.wav'); partes.append(x)
        if i + 1 < len(tomas): partes.append(np.zeros(int(0.32 * SR)))
    nuevo = np.concatenate(partes)
    ia, ib = int(A * SR), int(B * SR); viejo = a[ia:ib] if mono else a[ia:ib].mean(1)
    v = np.flatnonzero(np.abs(viejo) > 0.01 * np.abs(viejo).max()); fin_viejo = v[-1] / SR
    rv = np.sqrt((viejo[v[0]:v[-1]] ** 2).mean()); rn = np.sqrt((nuevo ** 2).mean()); nuevo *= min(rv / rn, 0.93 / np.abs(nuevo).max())
    hueco = (ib - ia) / SR - 0.2
    print(f'frase {k}: antes {fin_viejo:.2f} s, ahora {len(nuevo)/SR:.2f} s, sitio {hueco:.2f} s, pico {np.abs(nuevo).max():.2f}')
    assert len(nuevo) / SR <= hueco, 'no cabe'
    seg = np.zeros(ib - ia); seg[v[0]:v[0] + len(nuevo)] = nuevo
    if mono: a[ia:ib] = seg
    else: a[ia:ib] = seg[:, None]
sf.write(f'{D}/voz-es.wav', a, SR)
