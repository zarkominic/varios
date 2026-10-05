import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { clock, CUTS } from './clock'
import { helixToWorld, pairMid, pairDir, FOCUS } from './scenes/Helix'
import { SPECIES } from './scenes/Evolution'

const v = (x, y, z) => new THREE.Vector3(x, y, z)

// Cada plano tiene su pista de cámara; entre planos hay corte (tapado por el
// fundido a negro del Overlay). Dentro de una pista, posición y punto de mira
// siguen curvas Catmull-Rom que pasan por cada clave en su instante.
function makeTrack(keys) {
  const pos = new THREE.CatmullRomCurve3(keys.map((k) => k.p), false, 'centripetal')
  const look = new THREE.CatmullRomCurve3(keys.map((k) => k.l), false, 'centripetal')
  return { keys, pos, look, t0: keys[0].t, t1: keys[keys.length - 1].t }
}

function sample(track, t, outP, outL) {
  const { keys } = track
  const n = keys.length - 1
  let i = 0
  while (i < n - 1 && t > keys[i + 1].t) i++
  const a = keys[i].t
  const b = keys[i + 1].t
  const u = THREE.MathUtils.clamp((t - a) / (b - a), 0, 1)
  const g = (i + u) / n
  const fov = THREE.MathUtils.lerp(keys[i].fov ?? 38, keys[i + 1].fov ?? 38, u)
  track.pos.getPoint(g, outP)
  track.look.getPoint(g, outL)
  return fov
}

// Plano de cada homínido: la cámara llega un poco antes de que aparezca, se
// desliza despacio mientras está en pantalla y salta al siguiente.
function evoKeys() {
  const look = v(0.5, 0.8, 0)
  const keys = [{ t: 35.7, p: v(2.6, 2.4, 7.6), l: v(0.4, 0.7, 1.0), fov: 38 }]
  SPECIES.forEach((s, i) => {
    const fig = v(s.x, 0, s.z)
    const H = s.body.h
    const off = v(1.35, 0.8 + 0.2 * H, 2.6 + 0.85 * H)
    const next = SPECIES[i + 1]?.at ?? 55
    const arrive = i === 0 ? 37.6 : s.at - 0.5
    keys.push({ t: arrive, p: fig.clone().add(off), l: fig.clone().add(look), fov: 38 })
    keys.push({ t: next - 1.0, p: fig.clone().add(off).add(v(-0.25, -0.06, -0.35)), l: fig.clone().add(look).add(v(0.1, 0, 0)), fov: 37 })
  })
  keys.push({ t: 56.4, p: v(15.5, 7.2, 15.0), l: v(14.6, 0.3, -4.6), fov: 38 })
  keys.push({ t: 60.0, p: v(15.2, 10.0, 19.5), l: v(14.8, -0.3, -4.8), fov: 38 })
  return keys
}

export default function CameraRig() {
  const camera = useThree((s) => s.camera)

  const tracks = useMemo(() => {
    // Primer plano del par A–T / C–G, calculado sobre la hélice ya detenida.
    const tStop = 13.5
    const mid = helixToWorld(pairMid(FOCUS).add(pairMid(FOCUS + 1)).multiplyScalar(0.5), tStop)
    const axis = helixToWorld(v(0, 1, 0), tStop).normalize()
    const rung = helixToWorld(pairDir(FOCUS), tStop).normalize()
    const n = rung.clone().cross(axis).normalize()
    if (n.z < 0) n.negate()
    const close = mid.clone().addScaledVector(n, 4.4).addScaledVector(axis, 0.35)
    const closer = mid.clone().addScaledVector(n, 3.5).addScaledVector(axis, -0.1).addScaledVector(rung, 0.3)

    return [
      makeTrack([
        { t: 0, p: v(-4, 0.5, 30), l: v(-5.5, 0, 0), fov: 36 },
        { t: 4.5, p: v(-1.5, 1.2, 19), l: v(-3.6, 0, 0), fov: 38 },
        { t: 8.5, p: v(7.5, 2.4, 11), l: v(0, 0, 0), fov: 38 },
        { t: 11.5, p: mid.clone().addScaledVector(n, 6).add(v(1, 0.8, 0)), l: mid.clone().multiplyScalar(0.7), fov: 38 },
        { t: 13.8, p: close, l: mid, fov: 36 },
        { t: 18.4, p: closer, l: mid.clone().addScaledVector(axis, -0.1), fov: 34 },
      ]),
      makeTrack([
        { t: 18.2, p: v(0.2, 0.1, 3.0), l: v(0.2, 0, 0), fov: 40 },
        { t: 20.6, p: v(0.8, 0.5, 11.5), l: v(1.0, 0, 0), fov: 40 },
        { t: 23.5, p: v(1.2, 0.2, 16.4), l: v(1.0, -0.4, 0), fov: 38 },
        { t: 29.4, p: v(2.0, -0.3, 15.0), l: v(1.5, -0.45, 0), fov: 38 },
      ]),
      makeTrack([
        { t: 29.2, p: v(-3.2, 1.6, 9.4), l: v(0.4, 0, 0), fov: 38 },
        { t: 32.5, p: v(-0.6, 0.6, 8.6), l: v(0.8, 0, 0), fov: 38 },
        { t: 35.9, p: v(2.6, -0.4, 8.8), l: v(1.2, 0, 0), fov: 40 },
      ]),
      makeTrack(evoKeys()),
    ]
  }, [])

  const tmp = useMemo(() => ({ p: new THREE.Vector3(), l: new THREE.Vector3() }), [])

  useFrame(() => {
    const t = clock.t
    const bounds = [0, ...CUTS, Infinity]
    let idx = 0
    while (idx < CUTS.length && t >= bounds[idx + 1]) idx++
    const track = tracks[idx]
    const fov = sample(track, THREE.MathUtils.clamp(t, track.t0, track.t1), tmp.p, tmp.l)
    // Pequeño temblor de cámara al hombro, determinista.
    tmp.p.x += Math.sin(t * 0.7) * 0.04 + Math.sin(t * 1.9) * 0.012
    tmp.p.y += Math.sin(t * 0.9 + 1) * 0.03 + Math.sin(t * 2.3) * 0.01
    camera.position.copy(tmp.p)
    camera.lookAt(tmp.l)
    if (camera.fov !== fov) {
      camera.fov = fov
      camera.updateProjectionMatrix()
    }
  }, -2)

  return null
}
