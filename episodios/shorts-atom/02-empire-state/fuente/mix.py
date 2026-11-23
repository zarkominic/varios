"""short-es: an original 1930s hot-jazz cue (120 BPM, Bb major, 43.559 s) with a sting on every cut + foley on the actions,
mixed under Atom's CLEAN voice (no radio filter). Writes out/mix-en.wav and out/mix-es.wav (same music + foley).
Run: $LIB/.venv/bin/python mix.py      (loudness to −14 LUFS / −2 dBTP is done afterwards with ffmpeg loudnorm, see build.sh)
Band (core/audio/sampler.py), as in the first short: stride piano (honky-tonk upright), tuba oom, ukulele on 2 & 4 (banjo stand-in),
brushes + snare, clarinet lead, muted trumpet answers, trombone smears, full-band stings. Stop-time under the rivet toss and the
rattle, band hits on every floor that pops in the timelapse, a big hit on the light switch, a ta-da on the iris."""
import os, sys
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

VOZ = '/home/user/varios/atomo/build/largo/short-es'
DUR = 43.559; N = int(DUR * SR) + 1; BEAT = .5
CUTS = [10.637, 20.349, 31.397]
WHIPS = [3.0, 10.637 + 7.95]
S3, S4 = CUTS[1], CUTS[2]
S.seed(34)
rng = np.random.default_rng(1931)
MUS = np.zeros((N, 2), np.float32); FX = np.zeros((N, 2), np.float32)
LEAD = {'tuba_stac': .022, 'tuba': .025, 'trumpet': .018, 'trumpet_mute': .02, 'trombone': .02, 'trombone_stac': .015, 'clarinet': .015, 'clarinet_stac': .008}
def nt(inst, p, d, v=.7, at=0.0, g=1.0, pan=0.0):
    if at < 0 or at >= DUR: return
    add(MUS, S.note(inst, p, d, v), max(0, at - LEAD.get(inst, 0)), g, pan)
def sw(b): w, f = divmod(b, 1.0); return (w + (2 / 3 if abs(f - .5) < 1e-6 else f)) * BEAT
def m(p): return S.midi(p)
def nm(x): return S.name(x)

PROG = ['Bb', 'Bb', 'G7', 'G7', 'C7', 'C7', 'F7', 'F7', 'Bb', 'Bb7', 'Eb', 'Edim', 'Bb', 'G7', 'C7', 'F7']
CH = {'Bb': ['Bb', 'D', 'F'], 'Bb7': ['Bb', 'D', 'Ab'], 'G7': ['G', 'B', 'F'], 'C7': ['C', 'E', 'Bb'], 'F7': ['F', 'A', 'Eb'], 'Eb': ['Eb', 'G', 'Bb'], 'Edim': ['E', 'G', 'Db']}
ROOT = {'Bb': 'Bb', 'Bb7': 'Bb', 'G7': 'G', 'C7': 'C', 'F7': 'F', 'Eb': 'Eb', 'Edim': 'E'}
FIFTH = {'Bb': 'F', 'Bb7': 'F', 'G7': 'D', 'C7': 'G', 'F7': 'C', 'Eb': 'Bb', 'Edim': 'Bb'}
def chord_at(beat): return PROG[int(beat // 2) % len(PROG)]
def voicing(c):
    out = []
    for n in CH[c]:
        x = m(n + '3')
        while x < m('G3'): x += 12
        while x > m('F4'): x -= 12
        out.append(nm(x))
    return out

# where the band lays out: a hush before each cut/whip (so the sting hits), stop-time under the toss + catch and the rattle
STOPS = [(c - .32, c) for c in CUTS + WHIPS] + [(S3 + 3.3, S3 + 5.7), (S3 + 8.6, S3 + 9.7)]
def stopped(t): return any(a < t < b for a, b in STOPS)
NB = int(DUR / BEAT) + 1
for b in range(NB):
    t = b * BEAT
    if stopped(t) or t > DUR - .45: continue
    c = chord_at(b); on = b % 2 == 0
    soft = .55 if S4 + 4.3 < t < S4 + 6.7 else 1.0          # dusk: the band thins out until the switch
    if on:
        bn = ROOT[c] if b % 4 == 0 else FIFTH[c]
        nt('honky_tonk', bn + '2', .32, .6, t, .85 * soft, -.15); nt('honky_tonk', bn + '3', .3, .5, t, .55 * soft, -.15)
        nt('tuba_stac', bn + '1' if bn in ('F', 'G', 'A', 'Bb', 'B') else bn + '2', .3, .62, t, 1.15 * soft, -.1)
    else:
        for p in voicing(c): nt('honky_tonk', p, .14, .52, t, .42 * soft, .1)
        if soft == 1: add(MUS, S.chord('ukulele', [nm(m(p) + 12) for p in voicing(c)], .2, .55, strum=.012), t - .012, .32, .35)
        add(MUS, S.hit('snare', 'on', .26), t, .32 * soft, .15)
    d = .42; tt = t_(d); swp = bp(rng.standard_normal(len(tt)), 1800, 7000) * np.sin(np.pi * tt / d) ** 1.5 * .045
    add(MUS, swp.astype(np.float32), t, soft, .2)

# —— melody: an original syncopated 4-bar tune (clarinet) + its answer, restated with variations ——
TUNE = [(0, 'D5', .5), (.5, 'F5', .5), (1, 'D5', .5), (1.5, 'Bb4', 1), (2.5, 'C5', .5), (3, 'D5', 1.5),
        (4.5, 'B4', .5), (5, 'D5', .5), (5.5, 'F5', 1), (6.5, 'D5', 1),
        (8, 'E5', .5), (8.5, 'G5', .5), (9, 'E5', .5), (9.5, 'C5', 1), (10.5, 'Bb4', .5), (11, 'C5', 1),
        (12, 'A4', .5), (12.5, 'C5', .5), (13, 'Eb5', 1), (14, 'D5', 2)]
TUNE2 = [(0, 'F5', 1), (1, 'D5', .5), (1.5, 'Bb4', .5), (2, 'F4', 1), (3, 'Ab4', .5), (3.5, 'Bb4', 1.5),
         (5, 'Bb4', .5), (5.5, 'Eb5', .5), (6, 'G5', 1), (7, 'Eb5', 1),
         (8, 'D5', .5), (8.5, 'F5', .5), (9, 'D5', .5), (9.5, 'D5', .5), (10, 'B4', 1), (11, 'G4', 1),
         (12, 'C5', .5), (12.5, 'Eb5', .5), (13, 'F5', 1), (14, 'Bb4', 1.5)]
def phrase(t0, tune, inst='clarinet', g=.75, pan=.25, tr=0, vel=.66, upto=99):
    for b, p, d in tune:
        t = t0 + sw(b)
        if stopped(t) or t > upto: continue
        nt(inst if d >= 1 else inst + ('_stac' if inst in ('clarinet', 'trombone') else ''), nm(m(p) + tr), d * BEAT * .95, vel, t, g, pan)
phrase(0.0, TUNE, g=.58)
phrase(8.0, TUNE2, g=.6)
phrase(16.0, TUNE, 'trumpet_mute', .6, -.25)
phrase(24.0, TUNE2, g=.62)
phrase(32.0, TUNE, g=.6, upto=S4 + 4.2)                      # the timelapse
phrase(40.0, TUNE2, g=.64, upto=S4 + 11.9)                   # the question
for t, p in [(3.5, 'D5'), (3.83, 'F5'), (11.0, 'F5'), (11.33, 'A5'), (19.0, 'D5'), (27.0, 'C5'), (27.33, 'Eb5'), (43.0, 'F5')]:
    if not stopped(t): nt('trumpet_mute', p, .2, .58, t, .5, -.25)
for t, p0, p1 in [(7.5, 'Bb2', 'D3'), (15.5, 'F2', 'A2'), (23.0, 'Eb3', 'G3'), (39.5, 'Bb2', 'D3')]:
    if not stopped(t): nt('trombone', p0, .2, .6, t, .55, -.1); nt('trombone', p1, .35, .65, t + .18, .55, -.1)

# —— stings on the cuts and whips ——
STING = {0: ['D5', 'Bb4', 'F3', 'Bb1'], 1: ['E5', 'C5', 'G3', 'C2'], 2: ['F5', 'C5', 'A3', 'F2']}
for i, c in enumerate(CUTS):
    add(MUS, S.hit('snare', 'roll', .28, dur=.3), c - .32, .3, .15)
    for inst, p, g, pan in zip(['trumpet', 'clarinet', 'trombone', 'tuba'], STING[i], [.7, .55, .65, 1.0], [-.2, .25, -.1, -.1]): nt(inst, p, .38, .8, c, g, pan)
    for p in ['Bb2', 'D3', 'F3']: nt('honky_tonk', p, .35, .6, c, .45, .1)
    add(MUS, S.hit('sus_cymbal', 'hit', .5), c, .32, .3)
for c in WHIPS:
    add(MUS, S.hit('snare', 'roll', .28, dur=.3), c - .32, .25, .15); add(MUS, S.hit('sus_cymbal', 'hit', .4), c, .22, -.3)
# stop-time hits: the toss, the apex, the catch; the rattle gets a snare roll
for h, p in [(S3 + 3.55, 'F2'), (S3 + 4.2, 'Bb2'), (S3 + 5.52, 'Bb1')]:
    nt('tuba_stac', p, .25, .7, h, 1.1, -.1); nt('trombone_stac', nm(m(p) + 12), .2, .7, h, .55, -.1); add(MUS, S.hit('bass_drum', None, .55), h, .45, 0)
add(MUS, S.hit('snare', 'roll', .5, dur=.9), S3 + 8.7, .3, .1)
# the timelapse: a tuba + piano hit on every floor that pops, climbing
POPS4 = [.3, .75, 1.15, 1.6, 2.0, 2.5, 3.0, 3.22, 3.42, 3.6, 3.76, 3.9]
for i, p in enumerate(POPS4):
    nt('tuba_stac', nm(m('Bb1') + [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19][i]), .2, .6, S4 + p, .9, -.1)
    nt('honky_tonk', nm(m('Bb4') + [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19][i]), .15, .5, S4 + p, .35, .2)
# the switch: a full-band hit
SW = S4 + 6.76
for inst, p, g, pan in [('trumpet', 'F5', .75, -.2), ('clarinet', 'D5', .55, .25), ('trombone', 'Bb3', .7, -.1), ('tuba', 'Bb1', 1.1, -.1)]: nt(inst, p, .6, .85, SW, g, pan)
add(MUS, S.hit('sus_cymbal', 'hit', .6), SW, .4, .3)
# ta-da on the iris
TF = S4 + 11.98
for inst, p, g, pan in [('trumpet', 'D5', .75, -.2), ('clarinet', 'F5', .55, .25), ('trombone', 'Bb3', .7, -.1), ('tuba', 'Bb1', 1.1, -.1)]: nt(inst, p, DUR - TF - .02, .8, TF, g, pan)
for p in ['Bb1', 'Bb2', 'D3', 'F3', 'Bb3']: nt('honky_tonk', p, DUR - TF, .65, TF, .5, 0)
add(MUS, S.hit('sus_cymbal', 'hit', .55), TF, .35, .3)

# ———————————————— foley ————————————————
def env_ad(d, a=.01, r=.05): tt = t_(d); return np.minimum(1, tt / a) * np.minimum(1, (d - tt) / r)
def slide(f0, f1, d, v=1.0):
    tt = t_(d); f = f0 * (f1 / f0) ** (tt / d) * (1 + .012 * np.sin(2 * np.pi * 6 * tt)); ph = 2 * np.pi * np.cumsum(f) / SR
    return norm((np.sin(ph) + .15 * np.sin(2 * ph)) * env_ad(d, .02, .04)) * v
def flutter(d, rate=14, v=1.0):
    tt = t_(d); n = bp(rng.standard_normal(len(tt)), 300, 2500); return norm(n * (.5 + .5 * np.sin(2 * np.pi * rate * tt)) ** 2 * np.sin(np.pi * tt / d) ** .5) * v
def boing(f=180, d=.6, v=1.0):
    tt = t_(d); fr = f * (1 + .35 * np.exp(-tt * 7) * np.sin(2 * np.pi * 14 * tt)); ph = 2 * np.pi * np.cumsum(fr) / SR
    return norm((np.sin(ph) + .3 * np.sin(3 * ph)) * np.exp(-tt * 5)) * v
def clang(f0=420, d=1.1, v=1.0):         # struck steel: inharmonic partials + a click
    tt = t_(d); x = np.zeros(len(tt))
    for r, a, k in [(1, 1, 3.5), (2.76, .7, 5), (5.4, .45, 7), (8.93, .3, 9), (1.5, .3, 4)]: x += a * np.sin(2 * np.pi * f0 * r * tt + rng.random() * 6) * np.exp(-tt * k)
    x += hp(rng.standard_normal(len(tt)), 2000) * np.exp(-tt / .006) * 1.5
    return norm(x) * v
def tonk(v=1.0): return clang(rng.uniform(180, 240), .25, v)        # a footstep on a girder
def hiss(d, v=1.0, lo=2500):
    tt = t_(d); return norm(hp(rng.standard_normal(len(tt)), lo) * np.minimum(1, tt / .02) * np.exp(-tt / (d * .45))) * v
def rattle(d, rate=24, v=1.0):
    out = np.zeros(int(d * SR) + 1)
    for i in range(int(d * rate)):
        c = X.clack(1.4 + rng.random() * .2) * (.7 + .3 * rng.random()); p = int(i / rate * SR)
        out[p:p + len(c)] += c[:max(0, len(out) - p)]
    out += lp(rng.standard_normal(len(out)), 900) * .25 * np.sin(np.pi * np.arange(len(out)) / len(out))
    return norm(out) * v
def hum(d, f=60, v=1.0):
    tt = t_(d); x = sum(a * np.sin(2 * np.pi * f * k * tt) for k, a in [(1, 1), (2, .6), (3, .35), (5, .15)]) * (1 + .1 * np.sin(2 * np.pi * 2 * tt))
    return norm(x * np.minimum(1, tt / .25) * np.minimum(1, (d - tt) / 1.2)) * v
def engine(d, rate=11, v=1.0):
    tt = t_(d); pulses = (np.sin(2 * np.pi * rate * tt) > .6) * 1.0; n = lp(rng.standard_normal(len(tt)), 400) * lp(pulses, 60)
    return norm(n * env_ad(d, .2, .3)) * v
def horn(d=.32, v=1.0):
    tt = t_(d); x = np.sign(np.sin(2 * np.pi * 330 * tt)) * .5 + np.sign(np.sin(2 * np.pi * 415 * tt)) * .5
    return norm(lp(x, 2500) * env_ad(d, .01, .05)) * v
def squeal(d, v=1.0):
    tt = t_(d); f = 2300 * (1 + .02 * np.sin(2 * np.pi * 18 * tt)); return norm(np.sin(2 * np.pi * np.cumsum(f) / SR) * env_ad(d, .05, .15)) * v
def coo(v=1.0):
    tt = t_(.45); f = 360 - 60 * tt / .45 + 30 * np.sin(2 * np.pi * 9 * tt); x = np.sin(2 * np.pi * np.cumsum(f) / SR)
    return norm(lp(x, 900) * np.sin(np.pi * tt / .45)) * v
def drone(d, v=1.0):
    tt = t_(d); ph = 2 * np.pi * 92 * tt; x = sum(np.sin(k * ph) / k for k in range(1, 8)) * (1 + .3 * np.sin(2 * np.pi * 23 * tt))
    return norm(lp(x, 1800) * env_ad(d, .4, .6)) * v
def wind(d, v=1.0):
    tt = t_(d); n = bp(rng.standard_normal(len(tt)), 250, 1400) * (.6 + .4 * np.sin(2 * np.pi * .23 * tt) * np.sin(2 * np.pi * .07 * tt + 1))
    return norm(n * env_ad(d, .4, .4)) * v
def crackle(d, v=1.0):
    n = np.zeros(int(d * SR))
    for p in (rng.random(int(d * 40)) * (len(n) - 200)).astype(int): L = rng.integers(20, 120); n[p:p + L] += rng.standard_normal(L) * np.exp(-np.arange(L) / 12)
    return norm(hp(n, 1200) * env_ad(d, .2, .2)) * v
def whir(d, v=1.0):
    tt = t_(d); return norm(bp(rng.standard_normal(len(tt)), 600, 1600) * (.7 + .3 * np.sin(2 * np.pi * 7 * tt)) * env_ad(d, .3, .3)) * v
def fx(x, at, g=1.0, pan=0.0): add(FX, np.asarray(x, np.float32), at, g, pan)

# beds: city air in the wide/street, wind up on the steel, the forge blower + crackle
fx(lp(rng.standard_normal(int(3.0 * SR)), 700) * .5, 0, .12)
fx(wind(7.64), 3.0, .22, -.2); fx(wind(12.8), WHIPS[1], .2, .2); fx(wind(4.4), S4, .12)
fx(whir(7.6), 3.0, .07, -.4); fx(crackle(7.6), 3.0, .1, -.4); fx(whir(11.0), S3, .07, -.4); fx(crackle(11.0), S3, .1, -.4)
fx(lp(rng.standard_normal(int(7.95 * SR)), 900) * .6, CUTS[0], .12)
# ——— shot 1 ———
fx(drone(3.0), 0, .22, -.2)
fx(horn(.25), 1.3, .06, .5); fx(horn(.2), 2.1, .05, -.6)
for w in WHIPS: fx(X.whoosh(.5), w - .3, .4); fx(slide(400, 1600, .35), w - .3, .16)
fx(flutter(.68, 16), 3.0, .3, .5)
for pop in (3.68, 4.78):
    fx(X.pop(), pop, .35, .5); fx(boing(170, .6), pop + .02, .35, .5); fx(slide(300, 900, .35), pop + .02, .15, .5)
    fx(clang(360, .9), pop + .3, .4, .4); fx(X.thump(.6, 90), pop + .3, .3, .4)
fx(flutter(.5, 16), 4.28, .25, .4); fx(coo(), 4.1, .25, .5); fx(coo(), 5.5, .2, .5)
for i in range(10): fx(X.click(1.3), 5.4 + i * .055, .12, .1)             # derrick winch ratchet
fx(X.creak(), 5.4, .3, .1); fx(X.clack(.7), 5.95, .3, .1); add(FX, S.note('xylophone', 'Bb6', .25, .4), 5.97, .15, .2)
fx(X.whoosh(1.4), 6.35, .45); fx(flutter(1.9, 22), 6.5, .3, .2)
for i, c in enumerate([7.6, 8.2, 8.8]): fx(tonk(), c, .3, -.1 + i * .1)
fx(X.creak(), 8.0, .2, .1)
fx(flutter(.6, 16), 9.0, .25, -.3); fx(X.pop(), 9.6, .25, -.3); fx(coo(), 9.85, .25, -.3)
fx(slide(500, 1500, .3), 9.95, .18); add(FX, S.note('xylophone', 'F6', .3, .4), 10.25, .15)
# ——— shot 2 ———
s = CUTS[0]
fx(X.whoosh(.4), s, .35, .5); fx(squeal(.22), s + .38, .08, .4)
add(FX, S.note('xylophone', 'D6', .3, .45), s + .5, .2, .4)
fx(engine(1.9, 14), s, .2, -.5)
fx(engine(.85, 16), s + 2.15, .3, .4); fx(horn(), s + 2.45, .3, 0); fx(boing(220, .5), s + 2.47, .3, .4); fx(X.whoosh(.5), s + 2.3, .25)
fx(engine(3.8, 9), s + 4.15, .45, .3); fx(squeal(.45), s + 4.95, .12, -.1); fx(X.thump(.8, 60), s + 5.3, .45); fx(X.whoosh(.4), s + 5.2, .2)
add(FX, S.note('xylophone', 'Bb6', .3, .45), s + 5.52, .18, -.2)
for c in (6.14, 6.55): fx(X.pop(), s + c, .3, -.1); fx(boing(300, .35), s + c, .15, -.1)
fx(flutter(1.3, 16), s + 5.6, .25, .3); fx(X.pop(), s + 6.9, .2)
for i in range(12): fx(X.clack(1.6), s + 6.6 + i * .055, .14, 0)            # chain running down
fx(clang(700, .5), s + 7.3, .35); fx(X.creak(), s + 7.4, .35); fx(slide(300, 1200, .7), s + 7.4, .15)
fx(clang(300, 1.2), s + 9.02, .5, .1); fx(X.thump(1, 70), s + 9.02, .4); fx(X.click(1.5), s + 9.04, .3, .4)
for i in range(6): fx(X.clack(.9), s + 9.27 + i * .075, .18, .3 + i * .1)
fx(lp(rng.standard_normal(int(.45 * SR)), 300), s + 9.25, .25, .5)
# ——— shot 3 ———
s = S3
for i, c in enumerate([1.12, 1.45, 1.78, 2.08]): fx(X.pop(), s + c, .25, -.3 + i * .25); add(FX, S.note('xylophone', ['Bb5', 'D6', 'F6', 'Bb6'][i], .25, .45), s + c, .18, -.3 + i * .25)
for i in range(5): fx(X.clack(1.1 + i * .05), s + 2.3 + i * .05, .2, 0)        # the chain clinks
fx(hiss(.5), s + 2.95, .2, -.5); fx(crackle(.6), s + 2.95, .25, -.5)
fx(X.whoosh(.4), s + 3.5, .4, -.3); fx(slide(500, 1500, .62), s + 3.55, .2, -.2)
add(FX, S.note('xylophone', 'F6', .4, .5), s + 4.2, .2, -.1); fx(X.ding(), s + 4.22, .12, -.1)
fx(slide(1500, 600, .95), s + 4.57, .18, -.2)
fx(clang(520, 1.0), s + 5.52, .55, -.3); fx(hiss(.6), s + 5.55, .25, -.3); fx(X.thump(.6, 90), s + 5.52, .3, -.3)
fx(X.click(1.4), s + 6.5, .2, -.2); fx(slide(400, 700, .45), s + 6.6, .1, -.1)
fx(hiss(.5), s + 7.1, .35, 0); fx(X.clack(1.1), s + 7.1, .3, 0)
fx(X.thump(.6, 110), s + 8.3, .3, -.1); fx(hiss(.25, lo=4000), s + 8.35, .2, .2)
fx(rattle(.9), s + 8.7, .75, .05)
fx(hiss(.9, lo=3000), s + 9.6, .3, 0); fx(slide(1400, 1200, .3), s + 9.95, .08, .2)
fx(flutter(.95, 16), s + 9.6, .25, .5); fx(X.pop(), s + 10.55, .3); fx(boing(170, .5), s + 10.57, .3); fx(clang(360, .5), s + 10.85, .3)
# ——— shot 4 ———
s = S4
for i, p in enumerate(POPS4): fx(clang(300 + i * 25, .35), s + p, .25, -.1); fx(X.click(1.2), s + p + .02, .2, -.2)
for p in POPS4[:7]: fx(flutter(.22, 18), s + p, .12)
fx(slide(300, 1400, .45), s + 4.0, .2); add(FX, S.note('xylophone', 'Bb6', .4, .5), s + 4.45, .2)
fx(drone(2.8), s + 4.4, .14, -.4)
fx(X.creak(), s + 6.45, .3, .3); fx(clang(160, .6), SW, .55, .3); fx(X.thump(1, 55), SW, .55, .3); fx(crackle(.5), SW, .35, .3)
fx(slide(80, 300, .6), SW + .05, .2); fx(hum(5.2), SW + .05, .16, 0); fx(flutter(.5, 20), SW + .05, .15, -.2)
fx(X.pop(), s + 8.6, .3, .2)
fx(flutter(.9, 16), s + 9.4, .3, .2); fx(X.pop(), s + 10.3, .3, .2); fx(coo(), s + 10.5, .25, .2)
fx(slide(250, 800, .3), s + 10.33, .25, .2); fx(boing(140, .7), s + 10.38, .35, .2)
fx(X.whoosh(.35), s + 11.62, .25)

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
    env = uniform_filter1d(np.abs(v), int(.05 * SR)); act = (env > np.percentile(env[env > 1e-5], 20) * .5).astype(float)
    act = uniform_filter1d(act, int(.25 * SR)); act = np.clip(act * 1.5, 0, 1)
    gm = 10 ** (-8 * act / 20); gf = 10 ** (-3 * act / 20)
    vrms = np.sqrt(np.mean(v[act > .5] ** 2)); mrms = np.sqrt(np.mean(mus ** 2))
    musg = mus * (vrms / mrms) * 10 ** (-6 / 20)
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
