"""Un Short vertical (1080×1920) sacado de un episodio ya hecho, sin dibujar nada nuevo (desde el 17, aprobado por el
usuario el 01/11/2026: «como parte del proceso del vídeo grande, hacer 3 shorts»).

    VOZ=$(bash atomo/herramientas/preparar-voz.sh) && $VOZ/venv/bin/python atomo/herramientas/short.py atomo/build/largo/ep16 1.3-21.6,22.1-56.2 atomo/build/salida/ep16-short1

Los tramos son segundos del montaje del episodio (los de linea.json); se pegan en orden. Hacen falta los fotogramas de
esos tramos en <ep>/fotos (si se borraron: render-escenas.mjs <ep> --solo <ids>) y voz-en.wav, voz-es.wav, musica.wav y
efectos.wav. Escribe:
- <salida>.mp4: el Short con la voz inglesa (pista principal), −14 LUFS;
- <salida>-es.m4a: la pista en español, de la misma duración, para subirla como pista de audio extra;
- <salida>-en.srt y <salida>-es.srt: los subtítulos de cada idioma con los tiempos del Short.
La imagen: el vídeo a todo lo ancho en el centro (1080×608) sobre el mismo plano ampliado, difuminado y oscurecido; sin
letras (el canon del canal). El sonido: la mezcla «B» de montar-largo.sh (se lee de allí), con fundidos cortos en cada
unión.
"""
import os, re, subprocess, sys, tempfile
import numpy as np, soundfile as sf

D, tramos_txt, salida = sys.argv[1:4]
tramos = [tuple(map(float, t.split('-'))) for t in tramos_txt.split(',')]
FPS, FUNDE = 30, 0.12
raiz = os.path.dirname(os.path.abspath(__file__))
montar = open(os.path.join(raiz, 'montar-largo.sh')).read()
MUS = re.search(r'\[ -f "\$D/musica-banda.json" \] && MUS="([^"]+)"', montar).group(1)
EFXF = re.search(r'EFXF="([^"]+)"', montar).group(1)
LIM = re.search(r'(alimiter=[^,]+),loudnorm', montar).group(1)

def ganancia(voz):
    v, sr = sf.read(voz); v = v if v.ndim == 1 else v[:, 0]; w = int(.4 * sr)
    r = [20 * np.log10(np.sqrt(np.mean(v[i:i + w] ** 2)) + 1e-12) for i in range(0, len(v) - w, w)]
    return round(-19 - np.median([x for x in r if x > -40]), 2)

def corre(*a):
    subprocess.run(a, check=True)

tmp = tempfile.mkdtemp()
# 1. la mezcla completa de cada idioma (voz, música y efectos, como en el montaje), sin normalizar
for l in ('en', 'es'):
    g = ganancia(f'{D}/voz-{l}.wav')
    corre('ffmpeg', '-y', '-loglevel', 'error', '-i', f'{D}/voz-{l}.wav', '-i', f'{D}/musica.wav', '-i', f'{D}/efectos.wav', '-filter_complex',
          f'[0:a]aresample=48000,aformat=sample_fmts=flt,volume={g}dB,pan=stereo|c0=c0|c1=c0,asplit=3[voz][llave][llave2];[1:a]{MUS}[fondo];'
          f'[2:a]aresample=48000,{EFXF}[efx];[voz][fondo][efx]amix=inputs=3:duration=first:normalize=0,{LIM}[a]', '-map', '[a]', f'{tmp}/mezcla-{l}.wav')
    # 2. los tramos, con un fundido corto en cada unión, y la normalización final a −14 LUFS
    a, sr = sf.read(f'{tmp}/mezcla-{l}.wav'); trozos = []
    for t0, t1 in tramos:
        x = a[int(t0 * sr):int(t1 * sr)].copy(); n = int(FUNDE * sr)
        x[:n] *= np.linspace(0, 1, n)[:, None]; x[-n:] *= np.linspace(1, 0, n)[:, None]; trozos.append(x)
    sf.write(f'{tmp}/corte-{l}.wav', np.concatenate(trozos), sr)
    corre('ffmpeg', '-y', '-loglevel', 'error', '-i', f'{tmp}/corte-{l}.wav', '-af', 'loudnorm=I=-14:TP=-2:LRA=11', '-ar', '48000', f'{tmp}/short-{l}.wav')
# 3. la imagen vertical, tramo a tramo, y la unión
partes = []
for k, (t0, t1) in enumerate(tramos):
    f0, n = round(t0 * FPS), round((t1 - t0) * FPS)
    corre('ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(FPS), '-start_number', str(f0), '-i', f'{D}/fotos/%05d.jpg', '-frames:v', str(n),
          '-filter_complex', '[0:v]split[a][b];[a]scale=-2:1920:flags=neighbor,crop=1080:1920,boxblur=24:2,eq=brightness=-0.28:saturation=0.8[fondo];'
          '[b]scale=1080:608:flags=neighbor[fr];[fondo][fr]overlay=0:656,format=yuv420p[v]', '-map', '[v]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
          '-r', str(FPS), f'{tmp}/p{k}.mp4')
    partes.append(f"file '{tmp}/p{k}.mp4'")
open(f'{tmp}/lista.txt', 'w').write('\n'.join(partes))
corre('ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', f'{tmp}/lista.txt', '-i', f'{tmp}/short-en.wav', '-map', '0:v', '-map', '1:a',
      '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-metadata:s:a:0', 'language=eng', '-shortest', '-movflags', '+faststart', f'{salida}.mp4')
corre('ffmpeg', '-y', '-loglevel', 'error', '-i', f'{tmp}/short-es.wav', '-c:a', 'aac', '-b:a', '192k', f'{salida}-es.m4a')
# 4. los subtítulos de cada idioma, con los tiempos del Short
def lee(f):
    b = re.split(r'\n\s*\n', open(f, encoding='utf-8').read().strip())
    s = lambda x: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + float(r.replace(',', '.')))(*x.split(':'))
    out = []
    for blk in b:
        ls = blk.splitlines()
        if len(ls) >= 3 and '-->' in ls[1]:
            a_, b_ = ls[1].split(' --> '); out.append((s(a_.strip()), s(b_.strip()), '\n'.join(ls[2:])))
    return out
def ts(x):
    ms = int(round(x * 1000)); return f'{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}'
for l in ('en', 'es'):
    cues, base, n = [], 0.0, 1
    for t0, t1 in tramos:
        for a_, b_, txt in lee(f'{D}/subtitulos-{l}.srt'):
            if b_ <= t0 + 0.2 or a_ >= t1 - 0.2: continue
            cues.append(f'{n}\n{ts(base + max(a_, t0) - t0)} --> {ts(base + min(b_, t1) - t0)}\n{txt}\n'); n += 1
        base += t1 - t0
    open(f'{salida}-{l}.srt', 'w', encoding='utf-8').write('\n'.join(cues))
dur = sum(t1 - t0 for t0, t1 in tramos)
print(f'{salida}.mp4: {dur:.1f} s, 1080×1920, voz inglesa; {salida}-es.m4a; subtítulos en y es ({n - 1} en español)')
