"""Un tramo de la banda con instrumentos sampleados (canon desde el 44, aprobado por el usuario el 20/11/2026 de oído:
«perfecto, nuevo canon»). Lo llama banda.cjs cuando escenas.json trae banda.sampleado: compone el ánimo durante
`segundos`, escribe un MIDI y lo toca FluidSynth con FluidR3_GM (licencia MIT, paquete fluid-soundfont-gm).

Por qué: con los instrumentos sintetizados en código cada ánimo tenía un solo arreglo y un solo timbre, y aunque cambiara
el tono «siempre es casi igual» (el usuario). Aquí cada episodio elige su paleta (banda.paleta) y cada vuelta de la
progresión cambia algo (capas que entran, el motivo en otra octava u otro instrumento, la progresión alternativa).

Uso: python3 tramo_sf.py '<json>' <salida.wav>
  json: {animo, segundos, tonica (MIDI de la tónica grave, la TONICA de banda.cjs), modo, tempo, motivo, paleta?, semilla?}
"""
import json, os, random, struct, subprocess, sys, tempfile

A = json.loads(sys.argv[1])
SALIDA = os.path.abspath(sys.argv[2])
SF2 = os.environ.get('ASK_ATOM_SF2', '/usr/share/sounds/sf2/FluidR3_GM.sf2')
MODOS = {'menor': [0, 2, 3, 5, 7, 8, 10], 'mayor': [0, 2, 4, 5, 7, 9, 11], 'dorico': [0, 2, 3, 5, 7, 9, 10],
         'mixolidio': [0, 2, 4, 5, 7, 9, 10], 'lidio': [0, 2, 4, 6, 7, 9, 11]}
ESC = MODOS[A.get('modo', 'menor')]
TON = int(A['tonica']) + 12          # tónica central (la TONICA de banda.cjs es grave)
NEGRA = 60 / float(A.get('tempo', 96))
MOT = A.get('motivo', [0, 3, 7, 6, 0, 3, 7, 5])
T = float(A['segundos'])
R = random.Random(A.get('semilla', 1))
TPQ = 480

# programas General MIDI; banda.paleta (en escenas.json) cambia los de su episodio: {"solista": "shehnai", ...}
GM = {'coro': 52, 'voces': 53, 'cuerdas': 48, 'cuerdas_lentas': 49, 'chelo': 42, 'contrabajo': 43, 'pizz': 45, 'arpa': 46,
      'timbal': 47, 'oboe': 68, 'corno_ingles': 69, 'fagot': 70, 'clarinete': 71, 'flauta': 73, 'flauta_pan': 75,
      'trompa': 60, 'metales': 61, 'trompeta': 56, 'guitarra': 24, 'guitarra_acero': 25, 'piano': 0, 'piano_e': 4,
      'celesta': 8, 'glock': 9, 'caja_musica': 10, 'vibrafono': 11, 'marimba': 12, 'campanas': 14, 'dulcimer': 15,
      'sitar': 104, 'koto': 107, 'kalimba': 108, 'shehnai': 111, 'gaita': 109, 'violin': 40, 'viola': 41, 'pad': 89,
      'pad_calido': 89, 'pad_coro': 91}
PAL = {'solista': 'oboe', 'color': 'arpa', 'cuerdas': 'cuerdas', 'lentas': 'cuerdas_lentas', 'grave': 'contrabajo',
       'coro': 'coro', 'percusion': 'timbal', 'metal': 'trompa', 'teclas': 'piano', 'punteo': 'guitarra',
       'madera': 'clarinete', 'aire': 'flauta'}
PAL.update(A.get('paleta') or {})
# Los arpegios agudos («color», en misterio y cierre) son el «tin tin tin»: el 20/11/2026 el usuario pidió quitar ese
# sonido y el 21/11/2026 precisó que, cuando lo haya, sea una CELESTA. Así que «color» es siempre la celesta, y el resto
# de campanitas sigue prohibido: ni glockenspiel, ni caja de música, ni campanas, ni vibráfono, ni kalimba, ni marimba
PAL['color'] = 'celesta'
PROHIBIDOS = {'glock', 'caja_musica', 'campanas', 'vibrafono', 'kalimba', 'marimba', 'dulcimer'}
assert not PROHIBIDOS & set(PAL.values()), f'paleta con campanitas: {PROHIBIDOS & set(PAL.values())}'

def grado(g, o=0):
    q, k = divmod(g, 7)
    return TON + 12 * (q + o) + ESC[k]

def acorde(g, o=0):
    return [grado(g, o), grado(g + 2, o), grado(g + 4, o)]

PROG = {'misterio': ([0, 0, 5, 0], [0, 3, 5, 6]), 'aventura': ([0, 6, 3, 0], [0, 4, 5, 3]), 'epico': ([0, 5, 6, 3], [5, 3, 0, 4]),
        'intriga': ([0, 0, 1, 0], [0, 6, 0, 1]), 'suspense': ([0, 1, 0, 6], [0, 0, 1, 1]), 'ternura': ([0, 3, 5, 4], [0, 5, 3, 4]),
        'calma': ([0, 3, 0, 3], [0, 5, 3, 0]), 'cierre': ([5, 3, 6, 0], [3, 4, 5, 0]), 'curiosidad': ([0, 3, 4, 0], [0, 1, 3, 4]),
        'asombro': ([0, 3, 5, 6], [0, 2, 3, 4]), 'pastoral': ([0, 3, 4, 0], [0, 5, 3, 4])}

class Pista:
    def __init__(self, prog, canal, vol, pan, rev):
        self.canal, self.ev = canal, [(0, bytes([0xC0 | canal, prog])), (0, bytes([0xB0 | canal, 7, vol])),
                                      (0, bytes([0xB0 | canal, 10, pan])), (0, bytes([0xB0 | canal, 91, rev]))]
    def tick(self, t):
        # los tiempos van en segundos y el MIDI no lleva indicación de tempo, así que FluidSynth lo toca a 120 por minuto
        # (una negra = 0,5 s): con TPQ / NEGRA todo sonaba más rápido y los tramos largos se acababan antes (20/11/2026)
        return int(round(t * TPQ / 0.5))
    def nota(self, t, dur, n, vel):
        if t >= T or n < 12 or n > 115:
            return
        dur = min(dur, T + 1.5 - t)
        a = self.tick(t); b = max(a + 1, self.tick(t + dur))
        self.ev += [(a, bytes([0x90 | self.canal, n, max(1, min(127, int(vel)))])), (b, bytes([0x80 | self.canal, n, 0]))]
    def cc(self, t, num, val):
        self.ev.append((self.tick(t), bytes([0xB0 | self.canal, num, max(0, min(127, int(val)))])))
    def datos(self):
        out, ult = bytearray(), 0
        for tick, b in sorted(self.ev, key=lambda e: (e[0], (e[1][0] & 0xF0) == 0x90)):
            d, ult = tick - ult, tick
            v = [d & 0x7F]; d >>= 7
            while d:
                v.insert(0, (d & 0x7F) | 0x80); d >>= 7
            out += bytes(v) + b
        out += b'\x00\xFF\x2F\x00'
        return b'MTrk' + struct.pack('>I', len(out)) + bytes(out)

pistas, libres = {}, [c for c in range(16) if c != 9]
def P(papel, vol=100, pan=64, rev=70):
    nombre = PAL.get(papel, papel)
    if nombre not in pistas:
        pistas[nombre] = Pista(GM[nombre], libres.pop(0), vol, pan, rev)
    return pistas[nombre]

def cresc(p, t0, t1, v0, v1, pasos=24):
    for i in range(pasos + 1):
        p.cc(t0 + (t1 - t0) * i / pasos, 11, v0 + (v1 - v0) * i / pasos)

FIGURAS = [[1.5, .5, 1, 1, 2, 1, 1, 3], [1, 1, 1, 1, 1, 1, 1, 2], [.5, .5, 1, .5, .5, 1, 1, 2], [1, .5, .5, 1, 1, 1, 1, 2]]
def motivo(p, t0, o, vel, fig=None, mitad=False):
    fig = fig or R.choice(FIGURAS)
    t, notas = t0, list(zip(MOT, fig))[:4 if mitad else 8]
    for k, (st, f) in enumerate(notas):
        p.nota(t, f * NEGRA * 0.95, TON + 12 * o + st, vel + (8 if k in (0, 4) else 0) + R.randint(-4, 4))
        t += f * NEGRA
    return t

def ciclos(animo, compases_por_acorde=2):
    """las vueltas de la progresión que caben en T: [(t_inicio, duración_acorde, grado, índice_vuelta)]"""
    c = compases_por_acorde * 4 * NEGRA
    a, b = PROG.get(animo, PROG['misterio'])
    out, t, v = [], 0.0, 0
    while t < T:
        for g in (a if v % 2 == 0 else b):
            if t >= T:
                break
            out.append((t, c, g, v)); t += c
        v += 1
    return out, c

def arreglo(animo):
    cic, c = ciclos(animo)
    nv = max(1, cic[-1][3] + 1)
    if animo == 'misterio':
        cor, cb, ar = P('coro', 90, 50, 95), P('grave', 85), P('color', 70, 40, 85)
        cresc(cor, 0, 2.5, 30, 100)
        for t, d, g, v in cic:
            for n in acorde(g, 0): cor.nota(t, d, n, 50)
            cb.nota(t, d, grado(g, -2), 58)
            if v % 2 == 1 or nv == 1:
                for k in range(6): ar.nota(t + k * d / 6, d / 3, acorde(g, 1)[k % 3] + (12 if k > 2 else 0), 38 + 6 * (k % 3))
        for t, d, g, v in cic[::4]:
            motivo(P('solista', 75, 80, 100) if v % 2 == 0 else P('madera', 65, 90, 100), t + d * 0.5, 1 if v % 2 == 0 else 0, 64)
    elif animo == 'aventura':
        cu, pz, ti = P('cuerdas', 95, 64, 50), P('pizz', 90, 40, 40), P('percusion', 100, 64, 40)
        for t, d, g, v in cic:
            a = acorde(g, 0)
            for k in range(int(d / (NEGRA / 2))):
                pz.nota(t + k * NEGRA / 2, NEGRA * 0.3, [grado(g, -1), a[1], a[2], a[1]][k % 4], 68 + (15 if k % 4 == 0 else 0))
            for n in a: cu.nota(t, d * 0.95, n, 50 + 6 * min(v, 3))
            for k in range(int(d / NEGRA)):
                if k % 2 == 0 and (v > 0 or k % 4 == 0): ti.nota(t + k * NEGRA, NEGRA * 0.6, grado(0, -2) if k % 4 == 0 else grado(4, -3), 82)
        for t, d, g, v in cic[1::4]:
            motivo(P('metal', 85, 85, 70) if v % 2 == 0 else P('solista', 80, 80, 80), t, 0, 78, FIGURAS[2])
    elif animo == 'epico':
        cu, me, cor, ti, cb = P('lentas', 105, 50, 60), P('metal', 95, 78, 60), P('coro', 95, 64, 95), P('percusion', 105, 64, 50), P('grave', 95)
        for p in (cu, me, cor): cresc(p, 0, T, 45, 127)
        for t, d, g, v in cic:
            for n in acorde(g, 0) + [grado(g, 1)]: cu.nota(t, d, n, 72)
            for n in acorde(g, 0): cor.nota(t, d, n, 66)
            cb.nota(t, d, grado(g, -2), 80)
            me.nota(t, d * 0.5, grado(g, -1), 78); me.nota(t + d * 0.5, d * 0.45, grado(g + 4, -1), 74)
        n = 0
        while n * 0.12 < 2.4:
            ti.nota(T - 2.6 + n * 0.12, 0.11, grado(0, -2), 48 + n * 3); n += 1
        for t, d, g, v in cic[1::4]:
            motivo(P('solista', 88, 70, 90), t, 1, 84, FIGURAS[1])
    elif animo == 'intriga':
        pz, ce = P('pizz', 95, 50, 40), P('aire', 65, 90, 90)
        for t, d, g, v in cic:
            for k in range(int(d / (NEGRA / 2))):
                pz.nota(t + k * NEGRA / 2, NEGRA * 0.25, grado(g, -1) + (7 if k % 2 else 0), 58 + (20 if k % 4 == 0 else 0))
        for i, (t, d, g, v) in enumerate(cic[::2]):
            motivo(P('madera', 80, 80, 60) if i % 2 == 0 else ce, t + d * 0.5, 0 if i % 2 == 0 else 1, 62 if i % 2 == 0 else 55, FIGURAS[2], mitad=True)
    elif animo == 'suspense':
        ch, cb, ti = P('chelo', 100, 50, 50), P('grave', 95, 64, 40), P('percusion', 100, 64, 40)
        cresc(ch, 0, T, 50, 125); cresc(cb, 0, T, 50, 120)
        for t, d, g, v in cic:
            k = 0
            while k * 0.09 < d:
                ch.nota(t + k * 0.09, 0.085, grado(g, -1) + (1 if k % 16 >= 8 else 0), 58 + 32 * (t + k * 0.09) / T); k += 1
            cb.nota(t, d, grado(g, -2), 70)
        t, gap = 0.4, 1.1
        while t < T - 0.3:
            ti.nota(t, 0.2, grado(0, -2), 66 + 40 * t / T); ti.nota(t + 0.22, 0.2, grado(0, -2), 48 + 30 * t / T)
            t += gap; gap = max(0.42, gap * 0.93)
        for t, d, g, v in cic[2::4]:
            P('solista', 65, 85, 100).nota(t, d * 1.6, grado(5, 0), 52)
    elif animo == 'ternura':
        gu, cu = P('punteo', 95, 50, 60), P('lentas', 70, 64, 85)
        for t, d, g, v in cic:
            a = acorde(g, -1)
            pat = [grado(g, -2), a[1], a[2], grado(g, 0), a[2], a[1]]
            for k in range(int(d / (NEGRA / 2))):
                gu.nota(t + k * NEGRA / 2, NEGRA * 1.2, pat[k % 6], 58 + (12 if k % 6 == 0 else 0))
            if v > 0:
                for n in acorde(g, 0): cu.nota(t, d, n, 38)
        for i, (t, d, g, v) in enumerate(cic[1::4]):
            motivo(P('aire', 80, 80, 85) if i % 2 == 0 else P('solista', 75, 75, 85), t, 1, 62, FIGURAS[3])
    elif animo == 'calma':
        pi, cu = P('teclas', 85, 60, 95), P('lentas', 65, 64, 95)
        for t, d, g, v in cic:
            a = acorde(g, 0)
            for k, n in enumerate([grado(g, -2), a[0], a[1], a[2], grado(g + 4, 0)]):
                pi.nota(t + k * NEGRA, d - k * NEGRA, n, 44 + (10 if k == 0 else 0))
            for n in acorde(g, 0): cu.nota(t, d, n, 33)
        for t, d, g, v in cic[2::4]:
            motivo(pi, t, 1, 40, FIGURAS[1])
    elif animo == 'cierre':
        cu, ar, cb = P('lentas', 95, 60, 85), P('color', 80, 40, 85), P('grave', 85)
        cresc(cu, max(0, T - 3), T, 110, 40)
        for t, d, g, v in cic:
            for n in acorde(g, 0) + [grado(g, 1)]: cu.nota(t, d, n, 58)
            cb.nota(t, d, grado(g, -2), 62)
            for k in range(8): ar.nota(t + k * d / 8, d / 2, acorde(g, 0)[k % 3] + 12 * (k // 3 % 2), 44)
        for t, d, g, v in cic[::4]:
            motivo(P('solista', 85, 75, 85), t + 0.5, 0, 68, FIGURAS[1])
    elif animo in ('curiosidad', 'asombro', 'pastoral'):
        ma, pz, cu = P('madera' if animo == 'curiosidad' else 'aire', 85, 60, 60), P('pizz', 85, 40, 40), P('lentas', 70, 64, 90)
        for t, d, g, v in cic:
            for k in range(int(d / (NEGRA / 2))):
                pz.nota(t + k * NEGRA / 2, NEGRA * 0.3, acorde(g, -1)[k % 3], 60)
            for n in acorde(g, 0): cu.nota(t, d, n, 40 + (15 if animo == 'asombro' else 0))
        for t, d, g, v in cic[::2]:
            motivo(ma if v % 2 == 0 else P('solista', 80, 80, 85), t, 1, 66, FIGURAS[2])
    else:
        return arreglo('misterio')

arreglo(A['animo'])
with tempfile.TemporaryDirectory() as tmp:
    mid = os.path.join(tmp, 'tramo.mid')
    with open(mid, 'wb') as f:
        f.write(b'MThd' + struct.pack('>IHHH', 6, 1, len(pistas), TPQ))
        for p in pistas.values():
            f.write(p.datos())
    subprocess.run(['fluidsynth', '-ni', '-g', '0.6', '-r', str(A.get('sr', 48000)), '-F', SALIDA, SF2, mid],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
