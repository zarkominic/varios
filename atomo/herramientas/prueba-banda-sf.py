"""PRUEBA A (20/11/2026): la banda del 44 con instrumentos sampleados (FluidSynth + FluidR3_GM, licencia MIT).
Compone cada ánimo de escenas.json (unos 12 s, en el orden del episodio, como muestra-banda.py) con la paleta del
episodio y un arreglo propio por ánimo, escribe un MIDI y lo toca FluidSynth.
Uso: python3 banda_sf.py <escenas.json> <salida.wav> [--segundos 12]
"""
import json, os, struct, subprocess, sys

plan = json.load(open(sys.argv[1]))
salida = os.path.abspath(sys.argv[2])
SEG = float(sys.argv[sys.argv.index('--segundos') + 1]) if '--segundos' in sys.argv else 12.0
B = plan['banda']
NOTAS = {'do': 0, 're': 2, 'mi': 4, 'fa': 5, 'sol': 7, 'la': 9, 'si': 11}
MODOS = {'menor': [0, 2, 3, 5, 7, 8, 10], 'mayor': [0, 2, 4, 5, 7, 9, 11], 'dorico': [0, 2, 3, 5, 7, 9, 10],
         'mixolidio': [0, 2, 4, 5, 7, 9, 10], 'lidio': [0, 2, 4, 6, 7, 9, 11]}
TON = 48 + NOTAS[B['tono']]          # do3 + tónica
ESC = MODOS[B['modo']]
BPM = B['tempo']
MOT = B['motivo']
TPQ = 480
NEGRA = 60 / BPM

def grado(g, oct_=0):
    """grado de la escala (0 = tónica; admite negativos y >6) → nota MIDI"""
    o, k = divmod(g, 7)
    return TON + 12 * (o + oct_) + ESC[k]

def acorde(g, oct_=0):
    return [grado(g, oct_), grado(g + 2, oct_), grado(g + 4, oct_)]

# progresiones por ánimo (grados): en dórico el IV mayor (g=3) es el color
PROG = {'misterio': [0, 0, 5, 0], 'aventura': [0, 6, 3, 0], 'epico': [0, 5, 6, 3], 'intriga': [0, 0, 1, 0],
        'suspense': [0, 1, 0, 6], 'ternura': [0, 3, 5, 4], 'calma': [0, 3, 0, 3], 'cierre': [5, 3, 6, 0],
        'curiosidad': [0, 3, 4, 0], 'asombro': [0, 3, 5, 6]}

# paleta del episodio (programas General MIDI): desierto, coro, cuerdas, shehnai/oboe, arpa, timbal
PAL = {'coro': 52, 'cuerdas': 48, 'cuerdas_lentas': 49, 'chelo': 42, 'contrabajo': 43, 'pizz': 45, 'arpa': 46,
       'timbal': 47, 'oboe': 68, 'shehnai': 111, 'flauta': 73, 'trompa': 60, 'metales': 61, 'guitarra': 24,
       'piano': 0, 'celesta': 8, 'clarinete': 71, 'pad': 89}

class Pista:
    def __init__(self, prog, canal, vol=100, pan=64, rev=60):
        self.ev = []           # (tick, bytes)
        self.canal = canal
        self.ev.append((0, bytes([0xC0 | canal, prog])))
        self.ev.append((0, bytes([0xB0 | canal, 7, vol])))
        self.ev.append((0, bytes([0xB0 | canal, 10, pan])))
        self.ev.append((0, bytes([0xB0 | canal, 91, rev])))
    def nota(self, t, dur, n, vel):
        a, b = int(t * TPQ / NEGRA), int((t + dur) * TPQ / NEGRA)
        self.ev.append((a, bytes([0x90 | self.canal, n, max(1, min(127, int(vel)))])))
        self.ev.append((max(a + 1, b), bytes([0x80 | self.canal, n, 0])))
    def cc(self, t, num, val):
        self.ev.append((int(t * TPQ / NEGRA), bytes([0xB0 | self.canal, num, max(0, min(127, int(val)))])))
    def bytes_(self):
        out, ult = bytearray(), 0
        for tick, b in sorted(self.ev, key=lambda e: (e[0], e[1][0] & 0xF0 == 0x90)):
            d = tick - ult; ult = tick
            vlq = [d & 0x7F]; d >>= 7
            while d: vlq.insert(0, (d & 0x7F) | 0x80); d >>= 7
            out += bytes(vlq) + b
        out += b'\x00\xFF\x2F\x00'
        return b'MTrk' + struct.pack('>I', len(out)) + bytes(out)

pistas, canales = {}, iter([c for c in range(16) if c != 9])
def P(nombre, vol=100, pan=64, rev=60):
    if nombre not in pistas:
        pistas[nombre] = Pista(PAL[nombre], next(canales), vol, pan, rev)
    return pistas[nombre]

def cresc(p, t0, t1, v0, v1, pasos=24):   # expresión (CC 11) de v0 a v1
    for i in range(pasos + 1):
        p.cc(t0 + (t1 - t0) * i / pasos, 11, v0 + (v1 - v0) * i / pasos)

def motivo(p, t0, oct_, figura, vel, dur=None, transp=0):
    """el motivo del episodio (semitonos sobre la tónica) con un ritmo en negras"""
    t = t0
    for k, (st, f) in enumerate(zip(MOT, figura)):
        p.nota(t, (dur or f) * NEGRA * 0.95, TON + 12 * oct_ + st + transp, vel + (8 if k in (0, 4) else 0))
        t += f * NEGRA
    return t

def seccion(animo, t0, T):
    """un ánimo con su arreglo, de t0 a t0+T segundos"""
    prog = PROG.get(animo, PROG['misterio'])
    c = T / len(prog)
    if animo == 'misterio':
        cor, cb, sh, ar = P('coro', 90, 50, 90), P('contrabajo', 85), P('shehnai', 70, 80, 100), P('arpa', 70, 40, 80)
        cresc(cor, t0, t0 + 2, 30, 100)
        for i, g in enumerate(prog):
            for n in acorde(g, 1): cor.nota(t0 + i * c, c, n, 55)
            cb.nota(t0 + i * c, c, grado(g, -1), 60)
            for k in range(6): ar.nota(t0 + i * c + k * c / 6, c / 3, acorde(g, 2)[k % 3] + (12 if k > 2 else 0), 40 + 6 * (k % 3))
        motivo(sh, t0 + c * 0.5, 1, [1.5, 0.5, 1, 1, 2, 1, 1, 3], 70)
    elif animo == 'aventura':
        cu, pz, ti, tr = P('cuerdas', 95, 64, 50), P('pizz', 90, 40, 40), P('timbal', 100, 64, 40), P('trompa', 85, 85, 70)
        for i, g in enumerate(prog):
            a = acorde(g, 1)
            for k in range(int(c / (NEGRA / 2))):
                pz.nota(t0 + i * c + k * NEGRA / 2, NEGRA * 0.3, [grado(g, 0), a[1], a[2], a[1]][k % 4], 70 + (15 if k % 4 == 0 else 0))
            for n in a: cu.nota(t0 + i * c, c * 0.95, n, 55)
            for k in range(int(c / NEGRA)):
                if k % 2 == 0: ti.nota(t0 + i * c + k * NEGRA, NEGRA * 0.6, grado(0, -2) if k % 4 == 0 else grado(4, -2), 85)
        motivo(tr, t0 + c, 1, [0.5, 0.5, 1, 0.5, 0.5, 1, 1, 2], 80)
    elif animo == 'epico':
        cu, me, cor, ti, cb = P('cuerdas_lentas', 105, 50, 60), P('metales', 95, 78, 60), P('coro', 95, 64, 90), P('timbal', 105, 64, 50), P('contrabajo', 95)
        for p in (cu, me, cor): cresc(p, t0, t0 + T, 40, 127)
        for i, g in enumerate(prog):
            for n in acorde(g, 1) + [grado(g, 2)]: cu.nota(t0 + i * c, c, n, 75)
            for n in acorde(g, 1): cor.nota(t0 + i * c, c, n, 70)
            cb.nota(t0 + i * c, c, grado(g, -1), 80)
            me.nota(t0 + i * c, c * 0.5, grado(g, 0), 80); me.nota(t0 + i * c + c * 0.5, c * 0.45, grado(g + 4, 0), 75)
        n = 0
        while n * 0.12 < 2.4:   # redoble de timbal hasta el final
            ti.nota(t0 + T - 2.4 + n * 0.12, 0.11, grado(0, -2), 50 + n * 3); n += 1
        motivo(P('shehnai', 85, 70, 90), t0 + c * 1.0, 1, [1, 1, 1, 1, 1, 1, 1, 2], 85)
    elif animo == 'intriga':
        pz, cl, ce = P('pizz', 95, 50, 40), P('clarinete', 80, 80, 60), P('celesta', 60, 90, 90)
        for i, g in enumerate(prog):
            for k in range(int(c / (NEGRA / 2))):
                pz.nota(t0 + i * c + k * NEGRA / 2, NEGRA * 0.25, grado(g, -1) + (7 if k % 2 else 0), 60 + (20 if k % 4 == 0 else 0))
        motivo(cl, t0 + c * 0.5, 0, [0.5, 0.5, 1, 0.5, 0.5, 1, 0.5, 1.5], 65)
        motivo(ce, t0 + c * 2.5, 2, [0.5] * 8, 50)
    elif animo == 'suspense':
        ch, cb, ti, sh = P('chelo', 100, 50, 50), P('contrabajo', 95, 64, 40), P('timbal', 100, 64, 40), P('shehnai', 65, 85, 100)
        cresc(ch, t0, t0 + T, 50, 125); cresc(cb, t0, t0 + T, 50, 120)
        for i, g in enumerate(prog):   # trémolo de chelos
            k = 0
            while k * 0.09 < c:
                ch.nota(t0 + i * c + k * 0.09, 0.085, grado(g, 0) + (1 if i == len(prog) - 1 and k % 2 else 0), 60 + 30 * (i * c + k * 0.09) / T); k += 1
            cb.nota(t0 + i * c, c, grado(g, -1), 70)
        t, gap = t0, 1.0
        while t < t0 + T - 0.3:   # latido que se acelera
            ti.nota(t, 0.2, grado(0, -2), 70 + 40 * (t - t0) / T); ti.nota(t + 0.22, 0.2, grado(0, -2), 50 + 30 * (t - t0) / T)
            t += gap; gap = max(0.42, gap * 0.92)
        sh.nota(t0 + c * 2, c * 1.8, grado(5, 1), 55)
    elif animo == 'ternura':
        gu, fl, cu = P('guitarra', 95, 50, 60), P('flauta', 80, 80, 80), P('cuerdas_lentas', 70, 64, 80)
        for i, g in enumerate(prog):
            a = acorde(g, 0)
            pat = [grado(g, -1), a[1], a[2], grado(g, 1), a[2], a[1]]
            for k in range(int(c / (NEGRA / 2))):
                gu.nota(t0 + i * c + k * NEGRA / 2, NEGRA * 1.2, pat[k % 6], 60 + (12 if k % 6 == 0 else 0))
            for n in acorde(g, 1): cu.nota(t0 + i * c, c, n, 40)
        motivo(fl, t0 + c, 1, [1, 0.5, 0.5, 1, 1, 1, 1, 2], 65)
    elif animo == 'calma':
        pi, cu = P('piano', 85, 60, 90), P('cuerdas_lentas', 65, 64, 90)
        for i, g in enumerate(prog):
            a = acorde(g, 1)
            for k, n in enumerate([grado(g, -1), a[0], a[1], a[2], grado(g + 4, 1)]):
                pi.nota(t0 + i * c + k * NEGRA, c - k * NEGRA, n, 45 + (10 if k == 0 else 0))
            for n in acorde(g, 1): cu.nota(t0 + i * c, c, n, 35)
        motivo(pi, t0 + c * 2, 2, [1, 1, 1, 1, 1, 1, 1, 3], 40)
    elif animo == 'cierre':
        cu, ob, ar, cb = P('cuerdas_lentas', 95, 60, 80), P('oboe', 85, 75, 80), P('arpa', 80, 40, 80), P('contrabajo', 85)
        cresc(cu, t0 + T - 3, t0 + T, 110, 40)
        for i, g in enumerate(prog):
            for n in acorde(g, 1) + [grado(g, 2)]: cu.nota(t0 + i * c, c, n, 60)
            cb.nota(t0 + i * c, c, grado(g, -1), 65)
            for k in range(8): ar.nota(t0 + i * c + k * c / 8, c / 2, acorde(g, 1)[k % 3] + 12 * (k // 3 % 2), 45)
        motivo(ob, t0 + 0.5, 1, [1, 1, 1, 1, 1, 1, 1, 3], 70)
    else:
        seccion('misterio', t0, T)

# los ánimos, en el orden del episodio (sin repetir los seguidos)
animos = []
for e in plan['escenas']:
    if not animos or animos[-1] != e['animo']:
        animos.append(e['animo'])
cortes, wavs = [], []
base = os.path.splitext(salida)[0]
for i, a in enumerate(animos):
    # cada ánimo en su propio MIDI (16 canales no dan para toda la paleta) y luego se encadenan con un fundido corto
    pistas.clear(); canales = iter([c for c in range(16) if c != 9])
    seccion(a, 0.0, SEG - 0.4)
    mid, wav = f'{base}-{i:02d}.mid', f'{base}-{i:02d}.wav'
    with open(mid, 'wb') as f:
        f.write(b'MThd' + struct.pack('>IHHH', 6, 1, len(pistas), TPQ))
        for p in pistas.values():
            f.write(p.bytes_())
    subprocess.run(['fluidsynth', '-ni', '-g', '0.6', '-r', '44100', '-F', wav, '/usr/share/sounds/sf2/FluidR3_GM.sf2', mid],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    tmp = f'{base}-{i:02d}n.wav'   # cada ánimo a -20 LUFS y recortado a SEG + cola de 1 s
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', wav, '-af', f'atrim=0:{SEG + 1},loudnorm=I=-20:TP=-3,afade=t=out:st={SEG}:d=1', '-ar', '44100', tmp], check=True)
    wavs.append(tmp)
    cortes.append((round(i * SEG, 1), a))
ent = sum((['-i', w] for w in wavs), [])
fil = ''.join(f'[{k}]' for k in range(len(wavs)))
cad, ult = '', '[0]'
for k in range(1, len(wavs)):
    cad += f'{ult}[{k}]acrossfade=d=1:c1=tri:c2=tri[x{k}];'; ult = f'[x{k}]'
subprocess.run(['ffmpeg', '-v', 'error', '-y'] + ent + ['-filter_complex', cad.rstrip(';'), '-map', ult, salida], check=True)
for t, a in cortes:
    print(f'{int(t // 60)}:{int(t % 60):02d}  {a}')
