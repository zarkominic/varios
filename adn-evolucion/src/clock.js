// Un único reloj gobierna toda la animación. Ninguna escena usa el delta de
// R3F ni el reloj de three: todas leen `clock.t`, así el mismo instante se
// dibuja igual en el navegador y en la captura fotograma a fotograma.
export const DURATION = 60

export const clock = {
  t: 0,
  playing: true,
  capture: new URLSearchParams(location.search).has('capture'),
}

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
export const lerp = (a, b, k) => a + (b - a) * k
export const ramp = (t, a, b) => clamp((t - a) / (b - a))
export const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
export const easeOut = (x) => 1 - Math.pow(1 - x, 3)
export const smooth = (t, a, b) => easeInOut(ramp(t, a, b))
// Sube en [a, a+fin], baja en [b-fout, b].
export const span = (t, a, b, fin = 0.6, fout = 0.6) =>
  smooth(t, a, a + fin) * (1 - smooth(t, b - fout, b))

// Pseudoaleatorio con semilla: la secuencia de bases y las partículas salen
// siempre iguales.
export function rng(seed = 1) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let r = Math.imul(s ^ (s >>> 15), 1 | s)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

// Escenas: los cortes coinciden con los fundidos a negro del Overlay.
export const SCENES = {
  helix: [0, 18.4],
  chromo: [18.0, 29.4],
  compare: [29.0, 35.9],
  evo: [35.5, 60],
}
export const CUTS = [18.2, 29.2, 35.7]
export const CHAPTERS = [
  { n: '01', label: 'El código', at: 0 },
  { n: '02', label: 'El genoma', at: 18.2 },
  { n: '03', label: 'Parentesco', at: 29.2 },
  { n: '04', label: 'Homínidos', at: 35.7 },
]

// Colores de las cuatro bases: se usan igual en 3D y en los rótulos.
export const BASE_COLORS = {
  A: '#ff6b81',
  T: '#ffc65c',
  C: '#38d9c9',
  G: '#8f8bff',
}
export const PAIR = { A: 'T', T: 'A', C: 'G', G: 'C' }
