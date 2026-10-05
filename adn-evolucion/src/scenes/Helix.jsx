import { useMemo, useRef, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { clock, rng, smooth, span, ramp, easeOut, clamp, BASE_COLORS, PAIR, SCENES } from '../clock'

// Geometría de la doble hélice (B-ADN estilizado): 10,5 pares por vuelta y las
// dos hebras separadas ~140° en vez de 180°, que es lo que abre el surco mayor
// y el menor. Escala libre: 1 unidad = radio de la hélice.
export const N = 84
const RADIUS = 1
const RISE = 0.3
const TWIST = (Math.PI * 2) / 10.5
const OFFSET = (Math.PI * 140) / 180
export const FOCUS = 46 // par que enfoca el primer plano (A–T), y el siguiente C–G
export const TILT = new THREE.Euler(0.15, 0, 0.62)

const yOf = (i) => (i - (N - 1) / 2) * RISE
const strandPoint = (i, s, out = new THREE.Vector3()) => {
  const a = i * TWIST + (s ? OFFSET : 0)
  return out.set(Math.cos(a) * RADIUS, yOf(i), Math.sin(a) * RADIUS)
}

// Giro de la hélice: constante y luego frena hasta pararse para el primer plano.
export function helixAngle(t) {
  const v = 0.35
  if (t < 10) return v * t
  const u = Math.min(t - 10, 3)
  return v * 10 + v * (u - (u * u) / 6)
}

// Secuencia fija con el par enfocado forzado a A–T y el siguiente a C–G.
export const SEQ = (() => {
  const r = rng(7)
  const s = Array.from({ length: N }, () => 'ATCG'[Math.floor(r() * 4)])
  s[FOCUS] = 'A'
  s[FOCUS + 1] = 'G'
  return s
})()

// Posición en el mundo de un punto local de la hélice en el instante t.
const _m = new THREE.Matrix4()
const _q = new THREE.Quaternion()
const _qs = new THREE.Quaternion()
export function helixToWorld(local, t, out = new THREE.Vector3()) {
  _q.setFromEuler(TILT)
  _qs.setFromAxisAngle(new THREE.Vector3(0, 1, 0), helixAngle(t))
  _q.multiply(_qs)
  return out.copy(local).applyQuaternion(_q)
}
export function pairMid(i, out = new THREE.Vector3()) {
  const a = strandPoint(i, 0)
  const b = strandPoint(i, 1)
  return out.copy(a).add(b).multiplyScalar(0.5)
}
export function pairDir(i) {
  return strandPoint(i, 1).sub(strandPoint(i, 0)).normalize()
}

// Momento en que cada par queda montado durante la intro (del centro hacia
// fuera, como una cremallera que cierra en las dos direcciones).
const assembleAt = (i) => 1.2 + (Math.abs(i - N / 2) / (N / 2)) * 3.6

const up = new THREE.Vector3(0, 1, 0)

export default function Helix() {
  const group = useRef()
  const spin = useRef()
  const spheres = useRef()
  const rungs = useRef()
  const bonds = useRef()
  const tubes = useRef([])
  const labelRefs = useRef([])

  const data = useMemo(() => {
    const r = rng(3)
    // Cada esfera y cada medio peldaño llega desde un punto disperso.
    const from = Array.from({ length: N * 2 }, () =>
      new THREE.Vector3((r() - 0.5) * 18, (r() - 0.5) * 14, (r() - 0.5) * 10 - 2)
    )
    const bondCounts = SEQ.map((b) => (b === 'A' || b === 'T' ? 2 : 3))
    const totalBonds = bondCounts.reduce((a, b) => a + b, 0)
    const curves = [0, 1].map(
      (s) =>
        new THREE.CatmullRomCurve3(
          Array.from({ length: N * 4 }, (_, k) => {
            const i = k / 4
            const a = i * TWIST + (s ? OFFSET : 0)
            return new THREE.Vector3(Math.cos(a) * RADIUS, yOf(i), Math.sin(a) * RADIUS)
          })
        )
    )
    const tubeGeos = curves.map((c) => new THREE.TubeGeometry(c, N * 8, 0.055, 8, false))
    return { from, bondCounts, totalBonds, tubeGeos }
  }, [])

  // Colores por instancia (fijos).
  useLayoutEffect(() => {
    const c = new THREE.Color()
    for (let i = 0; i < N; i++) {
      const b1 = SEQ[i]
      const b2 = PAIR[b1]
      rungs.current.setColorAt(i * 2, c.set(BASE_COLORS[b1]))
      rungs.current.setColorAt(i * 2 + 1, c.set(BASE_COLORS[b2]))
      spheres.current.setColorAt(i * 2, c.set('#dfe9ff'))
      spheres.current.setColorAt(i * 2 + 1, c.set('#c9d8ff'))
    }
    rungs.current.instanceColor.needsUpdate = true
    spheres.current.instanceColor.needsUpdate = true
  }, [])

  const tmp = useMemo(
    () => ({
      m: new THREE.Matrix4(),
      p: new THREE.Vector3(),
      a: new THREE.Vector3(),
      b: new THREE.Vector3(),
      mid: new THREE.Vector3(),
      d: new THREE.Vector3(),
      q: new THREE.Quaternion(),
      s: new THREE.Vector3(),
      side: new THREE.Vector3(),
    }),
    []
  )

  useFrame(() => {
    const t = clock.t
    const [t0, t1] = SCENES.helix
    const vis = t >= t0 && t <= t1
    group.current.visible = vis
    // Los rótulos HTML no heredan la visibilidad del grupo: se apagan a mano.
    const lab = vis ? span(t, 12.4, 18.0, 0.8, 0.5) : 0
    labelRefs.current.forEach((el) => {
      if (el) el.style.opacity = lab
    })
    if (!vis) return
    spin.current.rotation.y = helixAngle(t)
    const { m, p, a, b, mid, d, q, s, side } = tmp
    let bi = 0
    for (let i = 0; i < N; i++) {
      const k = easeOut(ramp(t, assembleAt(i) - 1.4, assembleAt(i)))
      strandPoint(i, 0, a)
      strandPoint(i, 1, b)
      for (let st = 0; st < 2; st++) {
        const target = st ? b : a
        p.copy(data.from[i * 2 + st]).lerp(target, k)
        const sc = 0.16 * (0.25 + 0.75 * k)
        m.compose(p, q.identity(), s.setScalar(sc))
        spheres.current.setMatrixAt(i * 2 + st, m)
      }
      // Medio peldaño de cada base: del esqueleto hacia el centro, con hueco
      // en el medio donde van los puentes de hidrógeno.
      mid.copy(a).add(b).multiplyScalar(0.5)
      d.copy(b).sub(a)
      const len = d.length()
      d.normalize()
      q.setFromUnitVectors(up, d)
      const half = len / 2 - 0.09
      const grow = smooth(t, assembleAt(i) - 0.2, assembleAt(i) + 0.5)
      for (let st = 0; st < 2; st++) {
        const start = st ? b : a
        const dir = st ? -1 : 1
        p.copy(start).addScaledVector(d, (dir * half * grow) / 2)
        m.compose(p, q, s.set(1, Math.max(half * grow, 0.0001), 1))
        rungs.current.setMatrixAt(i * 2 + st, m)
      }
      // Puentes de hidrógeno: 2 (A–T) o 3 (C–G) puntos en el hueco central.
      side.set(0, 1, 0).cross(d).normalize()
      const n = data.bondCounts[i]
      for (let j = 0; j < n; j++) {
        const off = (j - (n - 1) / 2) * 0.075
        p.copy(mid).addScaledVector(up, off * 1.0).addScaledVector(side, off * 0.2)
        m.compose(p, q.identity(), s.setScalar(0.024 * grow))
        bonds.current.setMatrixAt(bi++, m)
      }
    }
    spheres.current.instanceMatrix.needsUpdate = true
    rungs.current.instanceMatrix.needsUpdate = true
    bonds.current.instanceMatrix.needsUpdate = true

    // Hebras: se dibujan a medida que la cremallera cierra.
    const reveal = smooth(t, 1.4, 5.4)
    tubes.current.forEach((tube) => {
      if (!tube) return
      const total = tube.geometry.index.count
      // Desde el centro hacia los extremos.
      const mid = Math.floor(total / 2 / 48) * 48
      const halfCount = Math.floor((total / 2) * reveal / 48) * 48
      tube.geometry.setDrawRange(mid - halfCount, halfCount * 2)
    })

  })

  const focusLabels = useMemo(() => {
    const items = []
    for (const i of [FOCUS, FOCUS + 1]) {
      const a = strandPoint(i, 0)
      const b = strandPoint(i, 1)
      const dir = b.clone().sub(a).normalize()
      items.push({ pos: a.clone().addScaledVector(dir, -0.32), letter: SEQ[i], key: `${i}a` })
      items.push({ pos: b.clone().addScaledVector(dir, 0.32), letter: PAIR[SEQ[i]], key: `${i}b` })
    }
    return items
  }, [])

  return (
    <group ref={group}>
      <group rotation={TILT}>
        <group ref={spin}>
          <instancedMesh ref={spheres} args={[null, null, N * 2]} frustumCulled={false}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshPhysicalMaterial roughness={0.25} metalness={0.1} clearcoat={1} clearcoatRoughness={0.2} />
          </instancedMesh>
          <instancedMesh ref={rungs} args={[null, null, N * 2]} frustumCulled={false}>
            <cylinderGeometry args={[0.075, 0.075, 1, 14, 1]} />
            <meshStandardMaterial roughness={0.35} metalness={0.05} emissive="#ffffff" emissiveIntensity={0.08} />
          </instancedMesh>
          <instancedMesh ref={bonds} args={[null, null, data.totalBonds]} frustumCulled={false}>
            <sphereGeometry args={[1, 10, 8]} />
            <meshBasicMaterial color="#f4fbff" toneMapped={false} />
          </instancedMesh>
          {data.tubeGeos.map((g, s) => (
            <mesh key={s} ref={(el) => (tubes.current[s] = el)} geometry={g} frustumCulled={false}>
              <meshPhysicalMaterial
                color={s ? '#9fb7ff' : '#c4d4ff'}
                roughness={0.3}
                metalness={0.2}
                clearcoat={0.6}
                emissive={s ? '#3d55c8' : '#5b6fd6'}
                emissiveIntensity={0.25}
              />
            </mesh>
          ))}
          {focusLabels.map((l, k) => (
            <Html key={l.key} position={l.pos} center zIndexRange={[20, 10]}>
              <div
                ref={(el) => (labelRefs.current[k] = el)}
                className="base-tag"
                style={{ '--c': BASE_COLORS[l.letter], opacity: 0 }}
              >
                {l.letter}
              </div>
            </Html>
          ))}
        </group>
      </group>
      <Dust />
    </group>
  )
}

// Polvo de nucleótidos: 3000 puntos que convergen sobre la hélice en la intro
// y luego quedan flotando. Todo el movimiento va en el shader.
function Dust() {
  const mat = useRef()
  const geo = useMemo(() => {
    const r = rng(11)
    const count = 3000
    const start = new Float32Array(count * 3)
    const end = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const seed = new Float32Array(count)
    const palette = Object.values(BASE_COLORS).map((h) => new THREE.Color(h))
    const v = new THREE.Vector3()
    const q = new THREE.Quaternion().setFromEuler(TILT)
    for (let i = 0; i < count; i++) {
      const th = r() * Math.PI * 2
      const ph = Math.acos(2 * r() - 1)
      const rad = 12 + r() * 22
      start.set([Math.sin(ph) * Math.cos(th) * rad, Math.sin(ph) * Math.sin(th) * rad, Math.cos(ph) * rad], i * 3)
      // Destino: una nube alrededor de la hélice inclinada.
      const along = (r() - 0.5) * N * RISE * 1.2
      const ang = r() * Math.PI * 2
      const rr = 1.6 + Math.pow(r(), 0.6) * 6
      v.set(Math.cos(ang) * rr, along, Math.sin(ang) * rr).applyQuaternion(q)
      end.set([v.x, v.y, v.z], i * 3)
      const c = r() < 0.35 ? palette[Math.floor(r() * 4)] : new THREE.Color('#9fb3e8')
      col.set([c.r, c.g, c.b], i * 3)
      seed[i] = r()
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(end, 3))
    g.setAttribute('aStart', new THREE.BufferAttribute(start, 3))
    g.setAttribute('aColor', new THREE.BufferAttribute(col, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    return g
  }, [])

  const uniforms = useMemo(() => ({ uT: { value: 0 }, uFade: { value: 1 } }), [])

  useFrame(() => {
    uniforms.uT.value = clock.t
    uniforms.uFade.value = 1 - smooth(clock.t, 16.5, 18.3)
  })

  return (
    <points geometry={geo} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={/* glsl */ `
          uniform float uT;
          attribute vec3 aStart;
          attribute vec3 aColor;
          attribute float aSeed;
          varying vec3 vColor;
          varying float vA;
          void main() {
            float delay = aSeed * 1.6;
            float k = clamp((uT - 0.2 - delay) / 3.6, 0.0, 1.0);
            k = 1.0 - pow(1.0 - k, 3.0);
            vec3 drift = vec3(sin(uT * 0.4 + aSeed * 40.0), cos(uT * 0.3 + aSeed * 23.0), sin(uT * 0.25 + aSeed * 11.0)) * 0.35;
            vec3 p = mix(aStart, position + drift, k);
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = min((1.2 + aSeed * 2.6) * (60.0 / -mv.z), 14.0);
            vColor = aColor;
            vA = 0.35 + 0.65 * k;
          }
        `}
        fragmentShader={/* glsl */ `
          uniform float uFade;
          varying vec3 vColor;
          varying float vA;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.0, d);
            gl_FragColor = vec4(vColor * a * 1.4, a * vA * uFade * 0.8);
          }
        `}
      />
    </points>
  )
}

export const _internal = { strandPoint, clamp }
