import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { clock, rng, smooth, ramp, easeOut, span, SCENES } from '../clock'

// Cariotipo humano (varón): 22 pares de autosomas + X e Y. Longitudes en
// megabases (GRCh38) y posición aproximada del centrómero como fracción del
// brazo corto p. Los 13, 14, 15, 21 y 22 son acrocéntricos (p muy corto).
const KARYO = [
  ['1', 248, 0.5], ['2', 242, 0.39], ['3', 198, 0.47], ['4', 190, 0.26], ['5', 181, 0.27],
  ['6', 171, 0.36], ['7', 159, 0.38], ['8', 145, 0.31], ['9', 138, 0.35], ['10', 134, 0.29],
  ['11', 135, 0.39], ['12', 133, 0.27], ['13', 114, 0.15], ['14', 107, 0.16], ['15', 102, 0.17],
  ['16', 90, 0.41], ['17', 83, 0.33], ['18', 80, 0.23], ['19', 59, 0.45], ['20', 64, 0.45],
  ['21', 47, 0.24], ['22', 51, 0.26], ['X', 156, 0.39], ['Y', 57, 0.18],
]
const ROWS = [
  ['1', '2', '3', '4', '5'],
  ['6', '7', '8', '9', '10', '11', '12'],
  ['13', '14', '15', '16', '17', '18'],
  ['19', '20', '21', '22', 'X', 'Y'],
]
const ROW_Y = [2.8, 0.55, -1.35, -3.0]
const SLOT = 1.62
const CENTER_X = 3.4
const UNIT = 1.95 / 248 // unidades 3D por megabase

const vert = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  varying float vY;
  void main() {
    vY = position.y;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
// Bandas G estilizadas: franjas oscuras pseudoaleatorias a lo largo del brazo,
// más un borde luminoso (fresnel) y una luz difusa sencilla.
const frag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uSeed;
  uniform float uOpacity;
  uniform float uGlow;
  varying vec3 vN;
  varying vec3 vV;
  varying float vY;
  float hash(float n) { return fract(sin(n) * 43758.5453); }
  void main() {
    float cell = floor(vY * 7.0 + uSeed * 13.0);
    float h = hash(cell + uSeed * 91.0);
    float band = h > 0.55 ? 0.42 : (h > 0.35 ? 0.72 : 1.0);
    float edge = smoothstep(0.0, 0.12, abs(fract(vY * 7.0 + uSeed * 13.0) - 0.5));
    band = mix(1.0, band, 0.85 + 0.15 * edge);
    vec3 L = normalize(vec3(0.4, 0.7, 0.6));
    float diff = 0.35 + 0.65 * max(dot(vN, L), 0.0);
    float fres = pow(1.0 - max(dot(vN, vV), 0.0), 2.2);
    vec3 col = uColor * band * diff + uColor * fres * 0.9 + vec3(1.0) * fres * 0.25;
    col += uColor * uGlow;
    gl_FragColor = vec4(col, uOpacity);
  }
`

export default function Chromosomes() {
  const group = useRef()
  const nucleus = useRef()
  const items = useRef([])
  const snps = useRef()

  const chromos = useMemo(() => {
    const r = rng(21)
    const list = []
    ROWS.forEach((row, ri) => {
      row.forEach((name, ci) => {
        const [, mb, pFrac] = KARYO.find((k) => k[0] === name)
        const x = CENTER_X + (ci - (row.length - 1) / 2) * SLOT
        const copies = name === 'X' || name === 'Y' ? [0] : [-0.3, 0.3]
        const hue = (KARYO.findIndex((k) => k[0] === name) / 24) * 0.82 + 0.52
        copies.forEach((dx) => {
          list.push({
            name,
            len: mb * UNIT,
            pFrac,
            target: new THREE.Vector3(x + (copies.length === 1 ? 0 : dx), ROW_Y[ri], 0),
            from: new THREE.Vector3((r() - 0.5) * 0.6, (r() - 0.5) * 0.6, (r() - 0.5) * 0.6),
            spin: new THREE.Euler(r() * 6, r() * 6, r() * 6),
            color: new THREE.Color().setHSL(hue % 1, 0.62, 0.6),
            seed: r() * 10,
            delay: 18.5 + list.length * 0.055,
          })
        })
      })
    })
    return list
  }, [])

  const mats = useMemo(
    () =>
      chromos.map(
        (c) =>
          new THREE.ShaderMaterial({
            vertexShader: vert,
            fragmentShader: frag,
            transparent: true,
            uniforms: {
              uColor: { value: c.color },
              uSeed: { value: c.seed },
              uOpacity: { value: 1 },
              uGlow: { value: 0 },
            },
          })
      ),
    [chromos]
  )

  // Variantes (SNP): puntitos que se encienden sobre los cromosomas.
  const snpData = useMemo(() => {
    const r = rng(5)
    return Array.from({ length: 140 }, () => {
      const ci = Math.floor(r() * chromos.length)
      return { ci, along: r() - 0.5, side: r() < 0.5 ? -1 : 1, at: 24.2 + r() * 2.6 }
    })
  }, [chromos])

  const tmp = useMemo(() => ({ m: new THREE.Matrix4(), p: new THREE.Vector3(), q: new THREE.Quaternion(), s: new THREE.Vector3(), e: new THREE.Euler() }), [])

  useFrame(() => {
    const t = clock.t
    const [t0, t1] = SCENES.chromo
    const vis = t >= t0 && t <= t1
    group.current.visible = vis
    if (!vis) return
    const fadeOut = 1 - smooth(t, 28.6, 29.3)
    chromos.forEach((c, i) => {
      const g = items.current[i]
      if (!g) return
      const k = easeOut(ramp(t, c.delay, c.delay + 1.5))
      g.position.copy(c.from).lerp(c.target, k)
      // Leve flotación una vez colocados.
      g.position.y += Math.sin(t * 0.9 + c.seed) * 0.03 * k
      g.rotation.set(c.spin.x * (1 - k), c.spin.y * (1 - k) + Math.sin(t * 0.5 + c.seed) * 0.06 * k, c.spin.z * (1 - k))
      g.scale.setScalar(0.15 + 0.85 * k)
      g.updateMatrixWorld(true)
      mats[i].uniforms.uOpacity.value = smooth(t, c.delay - 0.2, c.delay + 0.3) * fadeOut
      // Destello cuando se enciende la frase del 99,9 %: casi todo igual.
      mats[i].uniforms.uGlow.value = 0.25 * span(t, 23.8, 27.6, 0.6, 1.2) * (0.5 + 0.5 * Math.sin(t * 2 + c.seed))
    })
    const nk = smooth(t, 18.2, 18.8) * (1 - smooth(t, 19.0, 21.5))
    nucleus.current.scale.setScalar(0.6 + 2.4 * smooth(t, 18.2, 21.5))
    nucleus.current.material.uniforms.uOpacity.value = nk

    const { m, p, q, s } = tmp
    snpData.forEach((d, i) => {
      const c = chromos[d.ci]
      const g = items.current[d.ci]
      const on = smooth(t, d.at, d.at + 0.3) * fadeOut
      p.set(d.side * 0.115, d.along * c.len * 0.9, 0.13)
      if (g) p.applyMatrix4(g.matrixWorld)
      group.current.worldToLocal(p)
      m.compose(p, q.identity(), s.setScalar(0.055 * on * (1 + 0.3 * Math.sin(t * 6 + i))))
      snps.current.setMatrixAt(i, m)
    })
    snps.current.instanceMatrix.needsUpdate = true
  })

  const nucleusUniforms = useMemo(() => ({ uOpacity: { value: 0 } }), [])

  return (
    <group ref={group}>
      {chromos.map((c, i) => (
        <group key={i} ref={(el) => (items.current[i] = el)}>
          <Chromosome len={c.len} pFrac={c.pFrac} material={mats[i]} />
        </group>
      ))}
      <instancedMesh ref={snps} args={[null, null, snpData.length]} frustumCulled={false}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshBasicMaterial color="#fff6d6" toneMapped={false} />
      </instancedMesh>
      <mesh ref={nucleus}>
        <sphereGeometry args={[1, 48, 32]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={nucleusUniforms}
          vertexShader={/* glsl */ `
            varying vec3 vN; varying vec3 vV;
            void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN=normalize(normalMatrix*normal); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }
          `}
          fragmentShader={/* glsl */ `
            uniform float uOpacity; varying vec3 vN; varying vec3 vV;
            void main(){ float f = pow(1.0-abs(dot(vN,vV)),2.0); gl_FragColor = vec4(vec3(0.55,0.6,1.0)*f*1.6, f*uOpacity); }
          `}
        />
      </mesh>
    </group>
  )
}

// Un cromosoma metafásico: dos cromátidas hermanas unidas por el centrómero.
// Cada cromátida son dos cápsulas (brazo p arriba, brazo q abajo) que se
// abren ligeramente, lo que da la silueta en X.
function Chromosome({ len, pFrac, material }) {
  const r = 0.11
  const pLen = Math.max(len * pFrac - r, 0.02)
  const qLen = Math.max(len * (1 - pFrac) - r, 0.02)
  const parts = []
  for (const side of [-1, 1]) {
    parts.push({ l: pLen, y: 1, side })
    parts.push({ l: qLen, y: -1, side })
  }
  return (
    <group>
      {parts.map((p, k) => {
        // Cada brazo gira sobre su centro; se corrige x para que el extremo
        // del centrómero quede pegado a la cromátida hermana.
        const tilt = p.side * p.y * -0.09
        const half = p.l / 2 + r * 0.55
        const cx = p.side * 0.1 - p.y * half * Math.sin(tilt)
        return (
          <mesh
            key={k}
            material={material}
            position={[cx, p.y * half, 0]}
            rotation={[0, 0, tilt]}
          >
            <capsuleGeometry args={[r, p.l, 6, 16]} />
          </mesh>
        )
      })}
    </group>
  )
}
