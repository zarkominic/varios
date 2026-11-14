"""Un Short vertical (1080×1920) sacado de un episodio ya hecho, sin dibujar nada nuevo (desde el 17, aprobado por el
usuario el 01/11/2026: «como parte del proceso del vídeo grande, hacer 3 shorts»).

    VOZ=$(bash atomo/herramientas/preparar-voz.sh) && $VOZ/venv/bin/python atomo/herramientas/short.py atomo/build/largo/ep16 1.3-21.6,22.1-56.2 atomo/build/salida/ep16-short1

Los tramos son segundos del montaje del episodio (los de linea.json); se pegan en orden. Hacen falta los fotogramas de
esos tramos en <ep>/fotos (si se borraron: render-escenas.mjs <ep> --solo <ids>) y voz-en.wav, voz-es.wav, musica.wav y
efectos.wav. Escribe:
- <salida>.mp4: el Short con la voz inglesa (pista principal), −14 LUFS;
- <salida>-es.m4a: la pista en español, de la misma duración, para subirla como pista de audio extra;
- <salida>-en.srt y <salida>-es.srt: los subtítulos de cada idioma con los tiempos del Short.
La imagen: cada plano recortado en cuadrado (1080×1080) donde hay más movimiento, en el centro, sobre el mismo plano
ampliado, difuminado y oscurecido; sin letras (el canon del canal). El sonido: la mezcla «B» de montar-largo.sh (se lee de allí), con fundidos cortos en cada
unión.
"""
import os, re, shutil, subprocess, sys, tempfile
import numpy as np, soundfile as sf

D, tramos_txt, salida = sys.argv[1:4]
# --x k=x,k=x: fija a mano la x (0–140, en el lienzo de 320) del recorte del plano k del Short (0 = el primero, -1 = el
# último), cuando el recorte automático deja fuera algo que cuenta (una cifra, el objeto del gag)
FIJAS = dict((int(a_), int(b_)) for a_, b_ in (p_.split('=') for p_ in sys.argv[5].split(','))) if len(sys.argv) > 5 and sys.argv[4] == '--x' else {}
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
# 3. la imagen vertical: cada plano, recortado en cuadrado (1080×1080, el 56 % de la pantalla; elegido por el usuario el
#    12/11/2026 con una muestra del 33, frente al 32 % del cuadro entero y a la columna 9:16, que perdía media acción)
#    donde más movimiento hay, sobre el mismo plano ampliado, difuminado y oscurecido
def carga(a, n):
    """n fotogramas seguidos desde el a, en gris y a 320×180 (con ffmpeg: el entorno de la voz no tiene Pillow)."""
    r = subprocess.run(['ffmpeg', '-loglevel', 'error', '-framerate', str(FPS), '-start_number', str(a), '-i', f'{D}/fotos/%05d.jpg', '-frames:v', str(n),
                        '-vf', 'scale=320:180,format=gray', '-f', 'rawvideo', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(r, np.uint8).reshape(-1, 180, 320).astype(np.float32)
def cortes_del_episodio():
    """Los fotogramas donde cambia el plano, de medir-planos.mjs (las duraciones de cada escena) y linea.json."""
    import json
    ini = {e['id']: e['inicio'] for e in json.load(open(f'{D}/linea.json'))['escenas']}
    ep = os.path.basename(os.path.normpath(D))
    txt = subprocess.run(['node', os.path.join(raiz, 'medir-planos.mjs'), ep], capture_output=True, text=True, cwd=os.path.dirname(os.path.dirname(raiz))).stdout
    out = []
    for ln in txt.splitlines():
        c = ln.split()
        if len(c) < 3 or c[0] not in ini: continue
        t = ini[c[0]]; out.append(t)
        for d in c[2:]:
            t += float(d.rstrip('<!')); out.append(t)
    return sorted(round(x * FPS) for x in out)
def ventana(a, b, w=180):
    """La x (en el lienzo de 320) del recorte de ancho w con más movimiento entre los fotogramas a y b."""
    q = min(10, (b - a) // 4); F = carga(a + q, max(2, b - a - 2 * q))[::3]
    if len(F) < 2: return (320 - w) // 2
    m = (np.abs(np.diff(F, axis=0)) > 12).sum(0).astype(np.float32)
    m[:22, :] = 0                                        # la barra del año y el icono de Atom no cuentan
    col = m.sum(0)
    if col.sum() < 1: return (320 - w) // 2
    x = int(np.convolve(col, np.ones(w), 'valid').argmax()); sub = col[x:x + w]
    cx = x + (sub * np.arange(w)).sum() / (sub.sum() + 1e-6)
    return int(round(min(max(cx - w / 2, max(0, x - w * 0.15)), min(320 - w, x + w * 0.15))))
CORTES = cortes_del_episodio()
Y_CUADRO = 250   # el cuadrado va arriba (y 250–1330): debajo quedan libres los subtítulos de YouTube y sus botones
segs = []
for t0, t1 in tramos:
    f0 = round(t0 * FPS); f1 = f0 + round((t1 - t0) * FPS); lim = [f0]
    for fc in CORTES:
        if f0 + 20 < fc < f1 - 20:                       # el corte de verdad: el mayor salto de imagen cerca del previsto
            lim.append(fc - 18 + int(np.abs(np.diff(carga(fc - 19, 37), axis=0)).mean((1, 2)).argmax()))
    lim.append(f1)
    segs += [(a, b) for a, b in zip(lim, lim[1:]) if b > a]
partes = []
for k, (a, b) in enumerate(segs):
    if True:
        x = FIJAS.get(k, FIJAS.get(k - len(segs), None))
        x = ventana(a, b) if x is None else x
        print(f'  plano {k}: fotogramas {a}–{b}, recorte en x {x}')
        corre('ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(FPS), '-start_number', str(a), '-i', f'{D}/fotos/%05d.jpg', '-frames:v', str(b - a),
              '-filter_complex', '[0:v]split[a][b];[a]scale=-2:1920:flags=neighbor,crop=1080:1920,boxblur=24:2,eq=brightness=-0.28:saturation=0.8[fondo];'
              f'[b]scale=1920:1080:flags=neighbor,crop=1080:1080:{x * 6}:0[fr];[fondo][fr]overlay=0:{Y_CUADRO},format=yuv420p[v]', '-map', '[v]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
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
shutil.rmtree(tmp, ignore_errors=True)   # las mezclas temporales ocupan ~230 MB por Short (se acumulaban en /tmp)
dur = sum(t1 - t0 for t0, t1 in tramos)
print(f'{salida}.mp4: {dur:.1f} s, 1080×1920, voz inglesa; {salida}-es.m4a; subtítulos en y es ({n - 1} en español)')
