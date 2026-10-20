"""Segunda comprobación de la voz, independiente de la de cada clip: las pistas ya montadas, enteras.

Uso: python verificar_pistas.py <guion.json> <carpeta_linea> [en] [es]

locutar_frases.py revisa cada clip antes de estirarlo y colocarlo. Esto oye el resultado final
(voz-<idioma>.wav) con Whisper medium y lo compara con el guion palabra a palabra, para detectar lo
que el estiramiento o el montaje hayan podido romper. Escribe <carpeta_linea>/verificacion.json.

Ojo: en audios largos Whisper a veces se salta una frase entera. Si una diferencia es «no oído» de
varias palabras, vuelve a transcribir ese tramo solo antes de darla por buena.
"""
import difflib, json, re, sys, unicodedata
import numpy as np, soundfile as sf
from faster_whisper import WhisperModel

guion_path, D, *idiomas = sys.argv[1:]
idiomas = idiomas or ['en', 'es']
g = json.load(open(guion_path))

def norm(w):
    w = unicodedata.normalize('NFD', w.lower())
    return re.sub(r'[^a-z0-9]', '', ''.join(c for c in w if unicodedata.category(c) != 'Mn'))

modelo = WhisperModel('medium', device='cpu', compute_type='int8', cpu_threads=4)
out = {}
for l in idiomas:
    a, sr = sf.read(f'{D}/voz-{l}.wav')
    a16 = np.interp(np.linspace(0, len(a) - 1, int(len(a) * 16000 / sr)), np.arange(len(a)), a).astype(np.float32)
    segs, _ = modelo.transcribe(a16, language=l, beam_size=5, word_timestamps=True, condition_on_previous_text=False)
    oidas = [(x, w.start) for s in segs for w in s.words for x in w.word.strip().replace('-', ' ').split() if norm(x)]
    esp = [norm(x) for e in g['escenas'] for f in e['frases'] for x in f.get(f'{l}_voz', f[l]).replace('-', ' ').split() if norm(x)]
    o = [norm(x) for x, _ in oidas]
    sm = difflib.SequenceMatcher(a=esp, b=o, autojunk=False)
    dif = []
    for op, a0, a1, b0, b1 in sm.get_opcodes():
        e_, o_ = esp[a0:a1], o[b0:b1]
        if op == 'equal' or ''.join(e_) == ''.join(o_) or any(re.search(r'\d', x) for x in o_):
            continue
        t = oidas[min(b0, len(oidas) - 1)][1] if oidas else 0.0
        dif.append({'t': round(t, 1), 'guion': ' '.join(e_), 'oido': ' '.join(o_)})
    iguales = sum(b.size for b in sm.get_matching_blocks())
    out[l] = {'palabras': len(esp), 'iguales': iguales, 'diferencias': dif}
    print(f'{l}: {iguales} de {len(esp)} palabras iguales; {len(dif)} diferencias', flush=True)
    for d in dif:
        print(f"   {int(d['t'] // 60)}:{d['t'] % 60:04.1f} guion «{d['guion']}» · oído «{d['oido']}»")
json.dump(out, open(f'{D}/verificacion.json', 'w'), ensure_ascii=False, indent=1)
