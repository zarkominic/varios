"""short-dp: an original 1930s hot-jazz cue (120 BPM, F major, 52.98 s) with a sting on every cut + foley on the actions,
mixed under Atom's CLEAN voice (no radio filter). Writes out/mix-en.wav and out/mix-es.wav (same music + foley).
Run: $LIB/.venv/bin/python mix.py      (loudness to −14 LUFS / −1.5 dBTP is done afterwards with ffmpeg loudnorm, see build.sh)
Band (core/audio/sampler.py): stride piano (honky-tonk upright), tuba oom, ukulele on 2 & 4 (banjo stand-in), brushes + snare,
clarinet lead, plunger-ish muted trumpet answers, trombone smears, full-band stings. No glockenspiel, music box or bells."""
import os, sys, json
import numpy as np
import soundfile as sf
from scipy.signal import resample_poly
from scipy.ndimage import uniform_filter1d
HERE = os.path.dirname(os.path.abspath(__file__))
LIB = os.environ.get('LIB', '/root/.cache/ask-atom/lemo-opuscar')
sys.path.insert(0, LIB)
from core.audio import sampler as S          # noqa: E402
from core.audio import sfx as X              # noqa: E402
from core.audio.sfx import SR, add, hp, lp, bp, t_, norm   # noqa: E402

VOZ = '/home/user/varios/atomo/build/largo/short-dp'
DUR = 52.984; N = int(DUR * SR) + 1; BEAT = .5
CUTS = [5.474, 17.659, 32.34, 43.541]
S.seed(31)
rng = np.random.default_rng(1931)
MUS = np.zeros((N, 2), np.float32); FX = np.zeros((N, 2), np.float32)
LEAD = {'tuba_stac': .022, 'tuba': .025, 'trumpet': .018, 'trumpet_mute': .02, 'trombone': .02, 'trombone_stac': .015, 'clarinet': .015, 'clarinet_stac': .008}
def nt(inst, p, d, v=.7, at=0.0, g=1.0, pan=0.0):
    if at < 0 or at >= DUR: return
    add(MUS, S.note(inst, p, d, v), max(0, at - LEAD.get(inst, 0)), g, pan)
def sw(b):                       # swung beat position → seconds (eighths 2:1)
    w, f = divmod(b, 1.0); return (w + (2 / 3 if abs(f - .5) < 1e-6 else f)) * BEAT
def m(p): return S.midi(p)
def nm(x): return S.name(x)

# —— harmony: 2 beats per chord slot, one bar = 4 beats = 2 s ——
PROG = ['F', 'F', 'D7', 'D7', 'G7', 'G7', 'C7', 'C7', 'F', 'F7', 'Bb', 'Bdim', 'F', 'D7', 'G7', 'C7']   # per half-bar
CH = {'F': ['F', 'A', 'C'], 'F7': ['F', 'A', 'Eb'], 'D7': ['D', 'F#', 'C'], 'G7': ['G', 'B', 'F'], 'C7': ['C', 'E', 'Bb'], 'Bb': ['Bb', 'D', 'F'], 'Bdim': ['B', 'D', 'Ab']}
ROOT = {'F': 'F', 'F7': 'F', 'D7': 'D', 'G7': 'G', 'C7': 'C', 'Bb': 'Bb', 'Bdim': 'B'}
FIFTH = {'F': 'C', 'F7': 'C', 'D7': 'A', 'G7': 'D', 'C7': 'G', 'Bb': 'F', 'Bdim': 'F'}
def chord_at(beat): return PROG[int(beat // 2) % len(PROG)]
def voicing(c, octv=3):   # close voicing around A3–F4
    out = []
    for n in CH[c]:
        x = m(n + str(octv));
        while x < m('G3'): x += 12
        while x > m('F4'): x -= 12
        out.append(nm(x))
    return out

NB = int(DUR / BEAT) + 1
# band stops: a short hush right before each cut (so the sting hits), and stop-time under the stamping
def stopped(t):
    for c in CUTS:
        if c - .32 < t < c: return True
    return False
# —— rhythm section ——
for b in range(NB):
    t = b * BEAT
    if stopped(t) or t > DUR - .45: continue
    c = chord_at(b); on = b % 2 == 0
    if on:   # stride left hand: bass (root on 1, fifth on 3) + tuba
        bn = ROOT[c] if b % 4 == 0 else FIFTH[c]
        nt('honky_tonk', bn + '2', .32, .6, t, .85, -.15); nt('honky_tonk', bn + '3', .3, .5, t, .55, -.15)
        nt('tuba_stac', bn + '1' if bn in ('F', 'G', 'A', 'Bb', 'B') else bn + '2', .3, .62, t, 1.15, -.1)
    else:    # chord stab on 2 & 4 + ukulele strum + snare tap
        for p in voicing(c): nt('honky_tonk', p, .14, .52, t, .42, .1)
        add(MUS, S.chord('ukulele', [nm(m(p) + 12) for p in voicing(c)], .2, .55, strum=.012), t - .012, .32, .35)
        add(MUS, S.hit('snare', 'on', .26), t, .32, .15)
    # brushes: a swept noise per beat
    d = .42; tt = t_(d); swp = bp(rng.standard_normal(len(tt)), 1800, 7000) * np.sin(np.pi * tt / d) ** 1.5 * .045
    add(MUS, swp.astype(np.float32), t, 1.0, .2)

# —— melody: an original 4-bar syncopated tune (clarinet), answered by the muted trumpet; restated with variations ——
# phrase in (beat, scale-degree-offset from chord root as pitch name, dur beats)
TUNE = [(0, 'C5', .5), (.5, 'A4', .5), (1, 'C5', 1), (2.5, 'D5', .5), (3, 'C5', .5), (3.5, 'A4', 1.5),       # bar 1–2 (F, D7)
        (5, 'F#4', .5), (5.5, 'A4', .5), (6, 'D5', 1.5), (8, 'B4', .5), (8.5, 'D5', .5), (9, 'F5', 1),        # G7
        (10.5, 'E5', .5), (11, 'D5', .5), (11.5, 'C5', .5), (12, 'Bb4', .5), (12.5, 'G4', .5), (13, 'E4', 2.0)]  # C7
TUNE2 = [(0, 'F5', .5), (.5, 'C5', .5), (1, 'A4', .5), (1.5, 'F4', 1), (2.5, 'Eb5', 1.5), (4, 'D5', .5), (4.5, 'Bb4', .5), (5, 'F4', 1),
         (6, 'Ab4', .5), (6.5, 'B4', .5), (7, 'D5', 1), (8, 'C5', .5), (8.5, 'A4', .5), (9, 'F#4', .5), (9.5, 'A4', 1),
         (10.5, 'B4', .5), (11, 'D5', .5), (11.5, 'F5', 1), (12.5, 'E5', .5), (13, 'C5', 2.5)]
def phrase(t0, tune, inst='clarinet', g=.75, pan=.25, tr=0, vel=.66):
    for b, p, d in tune:
        t = t0 + sw(b)
        if stopped(t): continue
        nt(inst if d >= 1 else inst + ('_stac' if inst in ('clarinet', 'trombone') else ''), nm(m(p) + tr), d * BEAT * .95, vel, t, g, pan)
phrase(0.0, TUNE, g=.6)                                     # shot 1 (intro, light)
phrase(8.0, TUNE2, g=.62)                                   # shot 2
phrase(16.0, TUNE, 'trumpet_mute', .62, -.25)               # into shot 3, the muted trumpet takes it
phrase(24.0, TUNE2, g=.66)
phrase(40.0, TUNE, g=.62)                                   # shot 5 (after the stop-time)
phrase(48.0, TUNE2[:14], 'clarinet', .66)
# trumpet / trombone answers in the gaps
for t, p in [(3.0, 'A4'), (3.33, 'C5'), (11.0, 'D5'), (11.33, 'F5'), (19.0, 'C5'), (27.0, 'Bb4'), (27.33, 'D5'), (35.0, 'A4'), (43.0, 'E5'), (51.0, 'D5')]:
    if not stopped(t): nt('trumpet_mute', p, .2, .58, t, .5, -.25)
for t, p0, p1 in [(7.5, 'F3', 'A3'), (23.5, 'C3', 'E3'), (31.0, 'Bb2', 'D3'), (47.5, 'F3', 'A3')]:   # trombone smears (two notes, a glide feel)
    nt('trombone', p0, .2, .6, t, .55, -.1); nt('trombone', p1, .35, .65, t + .18, .55, -.1)

# —— stings on the cuts: full-band stab + cymbal, and a little snare roll leading in ——
STING = {0: ['C5', 'A4', 'F3', 'F2'], 1: ['D5', 'B4', 'G3', 'G2'], 2: ['E5', 'C5', 'C4', 'C2'], 3: ['F5', 'C5', 'A3', 'F2']}
for i, c in enumerate(CUTS):
    add(MUS, S.hit('snare', 'roll', .28, dur=.3), c - .32, .3, .15)
    for inst, p, g, pan in zip(['trumpet', 'clarinet', 'trombone', 'tuba'], STING[i], [.7, .55, .65, 1.0], [-.2, .25, -.1, -.1]): nt(inst, p, .38, .8, c, g, pan)
    for p in ['F3', 'A3', 'C4']: nt('honky_tonk', p, .35, .6, c, .45, .1)
    add(MUS, S.hit('sus_cymbal', 'hit', .5), c, .32, .3)
# stop-time hits under the stamping (shot 4): band hits with each stamp
for h in [1.45, 2.0, 2.55, 3.1]:
    t = CUTS[2] + h
    nt('tuba_stac', 'C2', .25, .7, t, 1.1, -.1); nt('trombone_stac', 'C3', .2, .7, t, .6, -.1); add(MUS, S.hit('bass_drum', None, .55), t, .5, 0)
# final ta-da at the end of the iris
TF = 43.541 + 9.12
for inst, p, g, pan in [('trumpet', 'F5', .75, -.2), ('clarinet', 'A5', .55, .25), ('trombone', 'C4', .7, -.1), ('tuba', 'F2', 1.1, -.1)]: nt(inst, p, DUR - TF - .02, .8, TF, g, pan)
for p in ['F2', 'F3', 'A3', 'C4', 'F4']: nt('honky_tonk', p, DUR - TF, .65, TF, .5, 0)
add(MUS, S.hit('sus_cymbal', 'hit', .55), TF, .35, .3)

# ———————————————— foley ————————————————
def slide(f0, f1, d, v=1.0):
    tt = t_(d); f = f0 * (f1 / f0) ** (tt / d) * (1 + .012 * np.sin(2 * np.pi * 6 * tt)); ph = 2 * np.pi * np.cumsum(f) / SR
    x = np.sin(ph) + .15 * np.sin(2 * ph); e = np.minimum(1, tt / .02) * np.minimum(1, (d - tt) / .04); return norm(x * e) * v
def rip(d=.22, v=1.0):        # paper tearing: crackly band-passed noise bursts
    n = rng.standard_normal(int(d * SR)); g = (rng.random(len(n)) > .7) * 1.0; g = uniform_filter1d(g, 40)
    tt = t_(d); return norm(bp(n * g, 1500, 7000) * np.minimum(1, tt / .01) * (1 - tt / d) ** .5) * v
def flutter(d, rate=14, v=1.0):   # wings / paper flutter: AM-noise
    tt = t_(d); n = bp(rng.standard_normal(len(tt)), 300, 2500); return norm(n * (.5 + .5 * np.sin(2 * np.pi * rate * tt)) ** 2 * np.sin(np.pi * tt / d) ** .5) * v
def cloth(d=.45, v=1.0):      # a sheet sliding down
    tt = t_(d); n = lp(bp(rng.standard_normal(len(tt)), 200, 3000), 2200); return norm(n * np.sin(np.pi * tt / d) ** 1.2) * v
def boing(f=180, d=.6, v=1.0):
    tt = t_(d); fr = f * (1 + .35 * np.exp(-tt * 7) * np.sin(2 * np.pi * 14 * tt)); ph = 2 * np.pi * np.cumsum(fr) / SR
    return norm((np.sin(ph) + .3 * np.sin(3 * ph)) * np.exp(-tt * 5)) * v
def sand(d, v=1.0):
    tt = t_(d); n = hp(rng.standard_normal(len(tt)), 3000) * .3; gr = (rng.random(len(tt)) > .9975) * rng.standard_normal(len(tt)) * 3
    return norm(lp(n + hp(gr, 2000), 9000) * np.minimum(1, tt / .2) * np.minimum(1, (d - tt) / .2)) * v
def flick(v=1.0): return norm(hp(rng.standard_normal(int(.04 * SR)), 2000) * np.exp(-t_(.04) / .006)) * v
def fx(x, at, g=1.0, pan=0.0): add(FX, np.asarray(x, np.float32), at, g, pan)

# shot 1
fx(X.creak(), .55, .25, .2)
fx(slide(500, 1400, .2), .8, .2, -.3); fx(X.click(.8), 1.0, .3, -.3)
fx(rip(.25), 1.2, .55, -.3); fx(X.pop(), 1.45, .3, -.3)
fx(flutter(1.8, 9), 1.5, .16, -.4); fx(X.clack(.7), 3.32, .25, -.4)
for c, pan in [(1.62, -.5), (2.68, 0), (3.44, .4)]: fx(cloth(.3), c, .25, pan); fx(X.thump(.5, 90), c + .36, .35, pan)
# shot 2
s = CUTS[0]
fx(X.whoosh(.5), s + .1, .3); fx(X.thump(1, 60), s + .62, .55); fx(X.creak(), s + .66, .2)
fx(sand(6.75), s + 3.0, .09, .05)
for c in (3.0, 5.5, 7.55): fx(X.click(.6), s + c, .25)
fx(X.click(1.6), s + 9.6, .3)
fx(boing(220), s + 10.45, .45, .2); fx(X.clack(1.2), s + 10.45, .4, .2); fx(X.clack(.8), s + 11.0, .35, .25)
fx(X.creak(), s + 10.75, .35, .2); fx(X.whoosh(.6), s + 10.8, .3, .2)
fx(slide(600, 1500, .3), s + 10.5, .18, -.3); fx(X.thump(.6, 80), s + 11.05, .35, -.3)
# shot 3
s = CUTS[1]
for c, pan in [(.9, -.5), (2.9, 0), (6.55, .5)]: fx(cloth(.42), s + c, .4, pan); fx(X.thump(.35, 110), s + c + .4, .3, pan)
fx(X.rumble(.9), s + 1.55, .4, -.5); fx(hp(rng.standard_normal(int(.08 * SR)), 1500) * np.exp(-t_(.08) / .02), s + 1.55, .25, -.5)
fx(flutter(.95, 16), s + 4.38, .3, .1); fx(X.pop(), s + 5.3, .3); fx(boing(300, .4), s + 5.32, .2)
fx(X.pop(), s + 7.15, .3, .5)
for i, p in enumerate(['C6', 'E6', 'G6']): add(FX, S.note('xylophone', p, .2, .35), s + 7.2 + i * .25, .12, .5)
fx(slide(1600, 500, .5), s + 8.95, .2, .5); fx(X.thump(.5, 120), s + 9.45, .35, .5); fx(X.pop(), s + 9.47, .2, .5)
for i in range(6): fx(flick(), s + 11.3 + i * .133, .3, -.4)
fx(X.pop(), s + 12.1, .3, -.4)
# shot 4
s = CUTS[2]
fx(X.whoosh(.5), s + .9, .3)
for h in [1.45, 2.0, 2.55, 3.1]: fx(X.thump(1, 75), s + h, .5); fx(X.clack(.6), s + h, .35); fx(X.whoosh(.25), s + h + .12, .12)
fx(X.whoosh(.5), s + 3.15, .25, .3)
for c in (3.45, 3.55, 3.65): fx(X.pop(), s + c, .15)
fx(X.click(.9), s + 4.85, .25, .3)
for i, c in enumerate([5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0]):
    fx(X.creak(), s + c, .35, .2); fx(slide(400 + i * 90, 520 + i * 110, .22), s + c, .12, -.1); fx(X.clack(.9 + i * .05), s + c + .03, .2, .35)
fx(X.pop(), s + 8.3, .45); fx(boing(160, .5), s + 8.32, .3); fx(X.whoosh(.35), s + 8.3, .3, -.3); fx(X.thump(1, 65), s + 8.62, .5, -.3)
fx(flutter(1.1, 16), s + 8.35, .25, 0)
for i, p in enumerate(['G6', 'E6', 'G6', 'E6']): add(FX, S.note('xylophone', p, .12, .3), s + 8.7 + i * .2, .1, -.3)
for i in range(6): fx(X.clack(1.3), s + 8.75 + i * .11, .15, .35)
# shot 5
s = CUTS[3]
fx(flutter(.75, 16), s + .05, .25, .2); fx(X.pop(), s + 1.25, .35); fx(X.whoosh(.35), s + 5.1, .2)
fx(X.whoosh(.25), s + 6.9, .2); fx(X.pop(), s + 7.0, .3); fx(X.click(1.1), s + 8.35, .2, .2)
fx(X.whoosh(.35), s + 8.62, .22); fx(X.whoosh(.3), s + 9.1, .22)

# ———————————————— optical pass on music + foley, film noise bed ————————————————
def optical(x):
    z = np.stack([hp(lp(x[:, c], 6800, 2), 90, 2) for c in range(2)], 1)
    tt = np.arange(N) / SR; dl = (.00035 * np.sin(2 * np.pi * .6 * tt) + .00008 * np.sin(2 * np.pi * 7 * tt)) * SR
    idx = np.clip(np.arange(N) - 40 + dl, 0, N - 1); i0 = idx.astype(int); fr = idx - i0; i1 = np.minimum(i0 + 1, N - 1)
    z = z[i0] * (1 - fr)[:, None] + z[i1] * fr[:, None]
    return np.tanh(z * 1.3) / np.tanh(1.3)
mus = optical(MUS / (np.abs(MUS).max() + 1e-9) * .8)
fxo = optical(FX / (np.abs(FX).max() + 1e-9) * .8)
R2 = np.random.default_rng(7)
bed = bp(R2.standard_normal(N), 800, 6000) * .0025
crk = np.zeros(N)
for p in (R2.random(int(DUR * 7)) * (N - 200)).astype(int): L = R2.integers(8, 60); crk[p:p + L] += R2.standard_normal(L) * np.exp(-np.arange(L) / 10) * (.015 + R2.random() * .03)
bed += hp(crk, 900)

def build(lang):
    y, sr = sf.read(os.path.join(VOZ, f'voz-{lang}.wav'))
    if y.ndim > 1: y = y.mean(1)
    if sr != SR: y = resample_poly(y, SR, sr)
    v = np.zeros(N); v[:min(N, len(y))] = y[:N]
    # duck: voice activity (smoothed envelope) → −8 dB on music, −3 dB on foley
    env = uniform_filter1d(np.abs(v), int(.05 * SR)); act = (env > np.percentile(env[env > 1e-5], 20) * .5).astype(float)
    act = uniform_filter1d(act, int(.25 * SR)); act = np.clip(act * 1.5, 0, 1)
    gm = 10 ** (-8 * act / 20); gf = 10 ** (-3 * act / 20)
    vrms = np.sqrt(np.mean(v[act > .5] ** 2)); mrms = np.sqrt(np.mean(mus ** 2))
    musg = mus * (vrms / mrms) * 10 ** (-6 / 20)          # music sits 6 dB under the voice before ducking → ~14 dB under while he speaks
    mix = musg * gm[:, None] + fxo * (vrms / mrms) * .9 * gf[:, None] + v[:, None] + bed[:, None] * vrms * 4
    fade = np.ones(N); nf = int(.08 * SR); fade[-nf:] = np.linspace(1, 0, nf)
    mix *= fade[:, None]
    mix = mix / np.abs(mix).max() * .8
    os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
    sf.write(os.path.join(HERE, 'out', f'mix-{lang}.wav'), mix.astype(np.float32), SR)
    db = lambda x: 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-12)
    a = act > .5
    print(lang, 'voice', round(db(v[a]), 1), 'dB | music under voice', round(db((musg * gm[:, None])[a]), 1), 'dB | music alone', round(db(musg[~a]), 1), 'dB')
for L in ('en', 'es'): build(L)
