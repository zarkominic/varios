"""Vuelve a locutar el idioma que no es el principal SIN mover la línea de tiempo del vídeo (desde el 16).

    $VOZ/venv/bin/python atomo/herramientas/revocear-otro.py atomo/build/largo/ep16 episodios/16-lucasarts/guion.json

El 30/10/2026 el usuario eligió, de oído, la voz española «B»: cada frase locutada entera de una vez (sin partirla en
las comas) y sin estirarla con rubberband. locutar_frases.py ya lo hace así en los episodios nuevos; esto sirve para un
episodio ya montado: cada frase empieza donde empezaba y, si no cabe hasta la siguiente, se locuta un poco más rápido
con la velocidad propia de Kokoro (natural, sin estirar el audio), como mucho a 1,15. Reescribe voz-<otro>.wav.
"""
import json, sys
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
D, guion = sys.argv[1:3]
g = json.load(open(guion)); l = json.load(open(f'{D}/linea.json'))
PRINCIPAL = g.get('principal', 'en'); OTRO = 'es' if PRINCIPAL == 'en' else 'en'; V = g['voces'][OTRO]
K = Kokoro('/root/.cache/ask-atom/voz/modelos/kokoro-v1.0.onnx', '/root/.cache/ask-atom/voz/modelos/voices-v1.0.bin')
viejo, SR = sf.read(f'{D}/voz-{OTRO}.wav'); nuevo = np.zeros_like(viejo)
v0, MARGEN, MAX = V.get('velocidad', 1.0), 0.2, 1.15
def recorta(a):
    m = np.flatnonzero(np.abs(a) > 0.01 * np.abs(a).max())
    return a[max(0, m[0] - int(0.02 * SR)):m[-1] + int(0.06 * SR)] if len(m) else a
informe = []
for e, le in zip(g['escenas'], l['escenas']):
    for k, (f, (t0, t1)) in enumerate(zip(e['frases'], le['frases'])):
        tope = (le['frases'][k + 1][0] if k + 1 < len(le['frases']) else le['duracion']) - MARGEN - t0
        texto = f.get(f'{OTRO}_voz', f[OTRO]); vel = v0
        while True:
            a, sr = K.create(texto, voice=V['voz'], speed=vel, lang=V['lang']); assert sr == SR
            a = recorta(a)
            if len(a) / SR <= tope or vel >= MAX:
                break
            vel = min(MAX, vel * len(a) / SR / tope * 1.01)
        i = int(round((le['inicio'] + t0) * SR)); a = a[:len(nuevo) - i]
        nuevo[i:i + len(a)] += a
        informe.append({'escena': e['id'], 'frase': f['n'], 'velocidad': round(vel, 3), 'dura': round(len(a) / SR, 2), 'cabe': round(tope, 2)})
        if len(a) / SR > tope:
            print(f"  ⚠ {e['id']} frase {f['n']}: {len(a) / SR:.2f} s en {tope:.2f} s, aun a {vel:.2f}")
sf.write(f'{D}/voz-{OTRO}.wav', nuevo, SR)
json.dump(informe, open(f'{D}/informe-{OTRO}-entera.json', 'w'), ensure_ascii=False, indent=1)
vs = [x['velocidad'] for x in informe]
print(f"voz-{OTRO}.wav: {len(informe)} frases enteras; velocidad {min(vs):.2f}–{max(vs):.2f} (base {v0}), {sum(v > v0 + 0.001 for v in vs)} aceleradas")
