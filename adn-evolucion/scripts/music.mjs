// Banda sonora sintetizada (sin muestras ni licencias): colchón de acordes,
// bajo, campanillas en los momentos clave y soplos de ruido en los cortes,
// todo sincronizado con la línea de tiempo de la animación.
//   node scripts/music.mjs  → scripts/music.wav y src/assets/music.m4a
import { writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SR = 44100
const DUR = 60
const N = SR * DUR
const L = new Float32Array(N)
const R = new Float32Array(N)

const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12)
let seed = 12345
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296)

// Acordes (MIDI) por tramo. Re menor → Si♭ → Sol menor → Fa/Do → Re.
const CHORDS = [
  [0, 18.2, [50, 57, 60, 64, 65]], // Dm9
  [18.2, 29.2, [46, 53, 57, 60, 62]], // B♭maj9
  [29.2, 35.7, [43, 50, 53, 57, 58]], // Gm9
  [35.7, 45, [41, 48, 53, 57, 60]], // F
  [45, 54.6, [48, 55, 60, 64, 67]], // C
  [54.6, 60, [50, 57, 62, 65, 69]], // Dm
]

function env(t, a, b, att, rel) {
  if (t < a - 0.01 || t > b + rel) return 0
  const up = Math.min(1, Math.max(0, (t - a) / att))
  const down = t > b ? Math.max(0, 1 - (t - b) / rel) : 1
  return up * up * (3 - 2 * up) * down
}

// Colchón: cada nota es una suma de armónicos impares atenuados (sonido
// cálido, tipo cuerda sintética), con dos voces desafinadas en estéreo.
for (const [a, b, notes] of CHORDS) {
  notes.forEach((m, ni) => {
    const f = mtof(m)
    const det = [0.997, 1.003]
    const ph = [rand() * 6.28, rand() * 6.28]
    const s0 = Math.floor(Math.max(0, a - 0.05) * SR)
    const s1 = Math.min(N, Math.floor((b + 2.2) * SR))
    for (let i = s0; i < s1; i++) {
      const t = i / SR
      const e = env(t, a, b, 1.6, 2.0) * (ni === 0 ? 0.5 : 0.22)
      if (!e) continue
      for (let v = 0; v < 2; v++) {
        const w = 2 * Math.PI * f * det[v] * t + ph[v]
        const lfo = 1 + 0.003 * Math.sin(2 * Math.PI * 0.2 * t + v)
        const x = (Math.sin(w * lfo) + 0.28 * Math.sin(2 * w) + 0.12 * Math.sin(3 * w) + 0.05 * Math.sin(5 * w)) * e
        if (v === 0) L[i] += x
        else R[i] += x
      }
    }
  })
}

// Bajo profundo en la fundamental de cada acorde.
for (const [a, b, notes] of CHORDS) {
  const f = mtof(notes[0] - 12)
  for (let i = Math.floor(a * SR); i < Math.min(N, Math.floor((b + 1.5) * SR)); i++) {
    const t = i / SR
    const e = env(t, a, b, 2.5, 1.5) * 0.32
    const x = Math.sin(2 * Math.PI * f * t) * e
    L[i] += x
    R[i] += x
  }
}

// Campanillas: al montarse la hélice, al aparecer cada homínido y al final.
function bell(t0, m, gain = 0.25, pan = 0) {
  const f = mtof(m)
  const s0 = Math.floor(t0 * SR)
  const len = Math.floor(3.2 * SR)
  for (let i = 0; i < len && s0 + i < N; i++) {
    const t = i / SR
    const e = Math.exp(-t * 1.7) * Math.min(1, t * 300)
    const x = (Math.sin(2 * Math.PI * f * t) + 0.35 * Math.sin(2 * Math.PI * f * 2.76 * t) * Math.exp(-t * 3) + 0.15 * Math.sin(2 * Math.PI * f * 5.4 * t) * Math.exp(-t * 6)) * e * gain
    L[s0 + i] += x * (1 - pan) * 0.8
    R[s0 + i] += x * (1 + pan) * 0.8
  }
}
;[1.4, 2.4, 3.3, 4.1, 4.8].forEach((t, i) => bell(t, [74, 77, 81, 84, 86][i], 0.12, i % 2 ? 0.4 : -0.4))
bell(12.4, 81, 0.16, -0.3)
bell(13.2, 84, 0.14, 0.3)
;[30.4].forEach((t) => bell(t, 82, 0.2))
const species = [36.4, 39.9, 43.3, 46.3, 49.2, 51.7]
const scale = [72, 74, 77, 79, 81, 84]
species.forEach((t, i) => bell(t - 0.5, scale[i], 0.2, (i % 2 ? 1 : -1) * 0.3))
bell(55.4, 86, 0.16, 0.2)
bell(56.8, 81, 0.22, -0.2)
bell(57.2, 74, 0.22, 0.2)

// Soplos de ruido filtrado que suben hacia cada corte.
function whoosh(tc, dur = 1.2, gain = 0.18) {
  let lp = 0
  let lp2 = 0
  const s0 = Math.floor((tc - dur) * SR)
  const s1 = Math.floor((tc + 0.35) * SR)
  for (let i = s0; i < s1 && i < N; i++) {
    const t = i / SR
    const k = t < tc ? (t - (tc - dur)) / dur : 1 - (t - tc) / 0.35
    const cutoff = 0.01 + 0.25 * k * k
    const n = rand() * 2 - 1
    lp += cutoff * (n - lp)
    lp2 += cutoff * (lp - lp2)
    const x = lp2 * k * k * gain * 3
    L[i] += x
    R[i] += x * 0.9
  }
}
;[18.2, 29.2, 35.7].forEach((t) => whoosh(t))
whoosh(54.8, 1.6, 0.12)

// Reverb sencilla (Schroeder): 4 filtros peine + 2 pasatodo por canal.
function reverb(x, offs) {
  const combs = [1557, 1617, 1491, 1422].map((d) => ({ d: d + offs, buf: new Float32Array(d + offs), i: 0, fb: 0.82, lp: 0 }))
  const alls = [225, 556].map((d) => ({ d: d + offs, buf: new Float32Array(d + offs), i: 0 }))
  const out = new Float32Array(x.length)
  for (let n = 0; n < x.length; n++) {
    let y = 0
    for (const c of combs) {
      const v = c.buf[c.i]
      c.lp = v * 0.7 + c.lp * 0.3
      c.buf[c.i] = x[n] + c.lp * c.fb
      c.i = (c.i + 1) % c.d
      y += v
    }
    for (const a of alls) {
      const v = a.buf[a.i]
      const w = y + v * 0.5
      a.buf[a.i] = w
      a.i = (a.i + 1) % a.d
      y = v - w * 0.5
    }
    out[n] = y
  }
  return out
}
const wetL = reverb(L, 0)
const wetR = reverb(R, 23)

// Mezcla, fundido general y normalización.
let peak = 0
const mixL = new Float32Array(N)
const mixR = new Float32Array(N)
for (let i = 0; i < N; i++) {
  const t = i / SR
  const fade = Math.min(1, t / 1.2) * Math.min(1, (DUR - t) / 1.8)
  mixL[i] = (L[i] * 0.7 + wetL[i] * 0.12) * fade
  mixR[i] = (R[i] * 0.7 + wetR[i] * 0.12) * fade
  peak = Math.max(peak, Math.abs(mixL[i]), Math.abs(mixR[i]))
}
const g = 0.85 / peak
const buf = Buffer.alloc(44 + N * 4)
buf.write('RIFF', 0)
buf.writeUInt32LE(36 + N * 4, 4)
buf.write('WAVEfmt ', 8)
buf.writeUInt32LE(16, 16)
buf.writeUInt16LE(1, 20)
buf.writeUInt16LE(2, 22)
buf.writeUInt32LE(SR, 24)
buf.writeUInt32LE(SR * 4, 28)
buf.writeUInt16LE(4, 32)
buf.writeUInt16LE(16, 34)
buf.write('data', 36)
buf.writeUInt32LE(N * 4, 40)
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, mixL[i] * g)) * 32767), 44 + i * 4)
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, mixR[i] * g)) * 32767), 46 + i * 4)
}
const wav = resolve(root, 'scripts/music.wav')
writeFileSync(wav, buf)
execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', wav, '-c:a', 'aac', '-b:a', '96k', resolve(root, 'src/assets/music.m4a')])
console.log('música lista')
