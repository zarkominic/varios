import { useMemo, useRef, useLayoutEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { clock, rng, smooth, span, BASE_COLORS, PAIR, SCENES } from '../clock'

// Dos secuencias alineadas, humano arriba y chimpancé abajo, como escaleras
// retorcidas que pasan de izquierda a derecha. Las diferencias aparecen a la
// densidad real (~1 de cada 80 letras ≈ 1,2 %), por eso el contador hace el
// resto del trabajo: a escala de genoma son ~35 millones de letras.
const M = 360
const SP = 0.34
const ROW = 1.45
const START_X = -9
export const FIRST_DIFF = 30

const seq = (() => {
  const r = rng(99)
  const human = Array.from({ length: M }, () => 'ATCG'[Math.floor(r() * 4)])
  const chimp = human.slice()
  const diffs = [FIRST_DIFF]
  let i = FIRST_DIFF
  while (i < M) {
    i += 60 + Math.floor(r() * 40)
    if (i < M) diffs.push(i)
  }
  for (const d of diffs) {
    const opts = 'ATCG'.split('').filter((b) => b !== human[d])
    chimp[d] = opts[Math.floor(r() * 3)]
  }
  return { human, chimp, diffs }
})()

// Desplazamiento de la secuencia: lento al principio (para leer la primera
// diferencia) y acelerando, como un avance rápido.
export function scroll(t) {
  const u = Math.max(0, t - 31.6)
  return 0.6 * Math.max(0, t - 29.2) + 0.9 * u * u
}
const xOf = (i, t) => START_X + i * SP - scroll(t)

export default function Compare() {
  const group = useRef()
  const ladders = [useRef(), useRef()]
  const rungs = [useRef(), useRef()]
  const links = [useRef(), useRef()]
  const beams = useRef()
  const tags = useRef()
  const tagEls = useRef([])
  const rowEls = useRef([])
  const rowGroup = useRef()
  const camera = useThree((st) => st.camera)

  useLayoutEffect(() => {
    const c = new THREE.Color()
    ;[seq.human, seq.chimp].forEach((s, li) => {
      for (let i = 0; i < M; i++) {
        rungs[li].current.setColorAt(i * 2, c.set(BASE_COLORS[s[i]]))
        rungs[li].current.setColorAt(i * 2 + 1, c.set(BASE_COLORS[PAIR[s[i]]]))
      }
      rungs[li].current.instanceColor.needsUpdate = true
    })
  }, [])

  const tmp = useMemo(
    () => ({
      m: new THREE.Matrix4(),
      p: new THREE.Vector3(),
      p2: new THREE.Vector3(),
      d: new THREE.Vector3(),
      q: new THREE.Quaternion(),
      q2: new THREE.Quaternion(),
      s: new THREE.Vector3(),
      ax: new THREE.Vector3(1, 0, 0),
      up: new THREE.Vector3(0, 1, 0),
    }),
    []
  )

  useFrame(() => {
    const t = clock.t
    const [t0, t1] = SCENES.compare
    const vis = t >= t0 && t <= t1
    group.current.visible = vis
    const tagOn = vis ? span(t, 30.4, 34.2, 0.5, 0.6) : 0
    tagEls.current.forEach((el) => el && (el.style.opacity = tagOn))
    const rowOn = vis ? span(t, 29.6, 35.6, 0.6, 0.5) : 0
    rowEls.current.forEach((el) => el && (el.style.opacity = rowOn))
    if (!vis) return
    // Los nombres de las filas acompañan a la cámara por el borde izquierdo.
    rowGroup.current.position.x = camera.position.x - 3.9
    const { m, p, p2, d, q, q2, s, ax, up } = tmp
    const fade = smooth(t, 29.2, 29.9) * (1 - smooth(t, 35.2, 35.8))
    for (let li = 0; li < 2; li++) {
      const y0 = li ? -ROW : ROW
      for (let i = 0; i < M; i++) {
        const x = xOf(i, t)
        const out = x < -14 || x > 14
        const twist = i * 0.42 + t * 0.6
        q.setFromAxisAngle(ax, twist)
        // Dos bolitas de esqueleto por par.
        for (let st = 0; st < 2; st++) {
          p.set(0, st ? -0.62 : 0.62, 0).applyQuaternion(q)
          p.x += x
          p.y += y0
          m.compose(p, q, s.setScalar(out ? 0 : 0.11 * fade))
          ladders[li].current.setMatrixAt(i * 2 + st, m)
          // Medio peldaño.
          p.set(0, st ? -0.31 : 0.31, 0).applyQuaternion(q)
          p.x += x
          p.y += y0
          m.compose(p, q, s.set(out ? 0 : fade, out ? 0 : 0.54 * fade, out ? 0 : fade))
          rungs[li].current.setMatrixAt(i * 2 + st, m)
          // Tramo de esqueleto hasta el par siguiente: hebras continuas.
          p.set(0, st ? -0.62 : 0.62, 0).applyQuaternion(q)
          p.x += x
          p.y += y0
          q2.setFromAxisAngle(ax, twist + 0.42)
          p2.set(0, st ? -0.62 : 0.62, 0).applyQuaternion(q2)
          p2.x += x + SP
          p2.y += y0
          d.copy(p2).sub(p)
          const len = d.length()
          p.add(p2).multiplyScalar(0.5)
          q2.setFromUnitVectors(up, d.normalize())
          m.compose(p, q2, s.set(out || i === M - 1 ? 0 : fade, len, out || i === M - 1 ? 0 : fade))
          links[li].current.setMatrixAt(i * 2 + st, m)
        }
      }
      ladders[li].current.instanceMatrix.needsUpdate = true
      rungs[li].current.instanceMatrix.needsUpdate = true
      links[li].current.instanceMatrix.needsUpdate = true
    }
    // Haz de luz que une cada diferencia entre las dos secuencias.
    seq.diffs.forEach((d, k) => {
      const x = xOf(d, t)
      const pulse = 0.75 + 0.25 * Math.sin(t * 8 + k)
      const on = Math.abs(x) < 14 ? fade : 0
      m.compose(p.set(x, 0, 0), q.identity(), s.set(on * 0.035 * pulse, on * (2 * ROW - 1.4), on * 0.035))
      beams.current.setMatrixAt(k, m)
    })
    beams.current.instanceMatrix.needsUpdate = true
    tags.current.position.set(xOf(FIRST_DIFF, t), 0, 0)
  })

  return (
    <group ref={group}>
      {[0, 1].map((li) => (
        <group key={li}>
          <instancedMesh ref={ladders[li]} args={[null, null, M * 2]} frustumCulled={false}>
            <sphereGeometry args={[1, 16, 12]} />
            <meshPhysicalMaterial color={li ? '#b9c6e6' : '#dfe9ff'} roughness={0.3} clearcoat={1} />
          </instancedMesh>
          <instancedMesh ref={links[li]} args={[null, null, M * 2]} frustumCulled={false}>
            <cylinderGeometry args={[0.045, 0.045, 1, 8, 1]} />
            <meshPhysicalMaterial color={li ? '#8fa0d8' : '#a9b9ff'} roughness={0.35} clearcoat={0.6} emissive="#3d55c8" emissiveIntensity={0.25} />
          </instancedMesh>
          <instancedMesh ref={rungs[li]} args={[null, null, M * 2]} frustumCulled={false}>
            <cylinderGeometry args={[0.07, 0.07, 1, 10, 1]} />
            <meshStandardMaterial roughness={0.4} emissive="#ffffff" emissiveIntensity={0.08} />
          </instancedMesh>
        </group>
      ))}
      <instancedMesh ref={beams} args={[null, null, seq.diffs.length]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#fff2c2" toneMapped={false} />
      </instancedMesh>
      <group ref={rowGroup}>
        {['Humano', 'Chimpancé'].map((name, k) => (
          <Html key={name} position={[0, k ? -ROW - 0.95 : ROW + 0.95, 0]} center zIndexRange={[20, 10]}>
            <div ref={(el) => (rowEls.current[k] = el)} className="row-tag" style={{ opacity: 0 }}>
              {name}
            </div>
          </Html>
        ))}
      </group>
      <group ref={tags}>
        {[
          [seq.human[FIRST_DIFF], ROW + 1.05],
          [seq.chimp[FIRST_DIFF], -ROW - 1.05],
        ].map(([b, y], k) => (
          <Html key={k} position={[0, y, 0]} center zIndexRange={[20, 10]}>
            <div ref={(el) => (tagEls.current[k] = el)} className="base-tag base-tag--diff" style={{ '--c': BASE_COLORS[b], opacity: 0 }}>
              {b}
            </div>
          </Html>
        ))}
      </group>
    </group>
  )
}
