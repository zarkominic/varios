import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { clock, smooth, span, ramp, easeOut, SCENES } from '../clock'
import { buildHomininMesh } from './hominin'

// Eje de tiempo en escala logarítmica desplazada: x = K·(log10(7 Ma + 10 ka) −
// log10(años + 10 ka)). Así caben 7 millones de años y los últimos 40.000 en
// la misma escena sin que neandertales y sapiens queden apelotonados.
const K = 10.5
const OFF = 1e4
const LOG0 = Math.log10(7e6 + OFF)
export const xOfYears = (y) => K * (LOG0 - Math.log10(y + OFF))
const AXIS_Z = 2.4

// Datos: aparición/extinción aproximadas (años antes del presente), volumen
// endocraneal medio (cm³) y altura típica (m). Valores de referencia
// redondeados; cada especie tiene rangos amplios.
export const SPECIES = [
  {
    id: 'sahel', name: 'Sahelanthropus tchadensis', from: 7.0e6, to: 6.0e6, dates: '≈ 7 Ma', cc: 360,
    note: '¿Uno de los primeros bípedos?', at: 36.4, color: '#e9a23b',
    body: { h: 1.18, leg: 0.4, arm: 0.5, lean: 0.38, knee: 0.42, shoulders: 0.25, jaw: 1, brow: 1, bulk: 1.05, funnel: 1, glob: 0 },
  },
  {
    id: 'afar', name: 'Australopithecus afarensis', from: 3.9e6, to: 2.9e6, dates: '3,9 – 2,9 Ma', cc: 450,
    note: '«Lucy»: caminaba erguida', at: 39.9, color: '#d9b440',
    body: { h: 1.1, leg: 0.42, arm: 0.47, lean: 0.16, knee: 0.14, shoulders: 0.25, jaw: 0.85, brow: 0.75, bulk: 1.05, funnel: 1, glob: 0.1 },
  },
  {
    id: 'habilis', name: 'Homo habilis', from: 2.4e6, to: 1.4e6, dates: '2,4 – 1,4 Ma', cc: 610,
    note: 'Herramientas de piedra', at: 43.3, color: '#a8c24a',
    body: { h: 1.22, leg: 0.43, arm: 0.45, lean: 0.08, knee: 0.06, shoulders: 0.24, jaw: 0.7, brow: 0.6, bulk: 1, funnel: 0.5, glob: 0.2 },
  },
  {
    id: 'erectus', name: 'Homo erectus', from: 1.9e6, to: 1.1e5, dates: '1,9 Ma – 110 ka', cc: 900,
    note: 'El primero en salir de África', at: 46.3, color: '#5cc47e',
    body: { h: 1.66, leg: 0.48, arm: 0.41, lean: 0.02, knee: 0, shoulders: 0.24, jaw: 0.5, brow: 0.75, bulk: 1, funnel: 0, glob: 0.2 },
  },
  {
    id: 'neander', name: 'Homo neanderthalensis', from: 4.0e5, to: 4.0e4, dates: '400 – 40 ka', cc: 1450,
    note: 'Europa y Asia · robusto', at: 49.2, color: '#3cb7b0',
    body: { h: 1.62, leg: 0.45, arm: 0.41, lean: 0, knee: 0, shoulders: 0.27, jaw: 0.45, brow: 0.7, bulk: 1.2, funnel: 0, glob: 0.25 },
  },
  {
    id: 'sapiens', name: 'Homo sapiens', from: 3.0e5, to: 0, dates: '300 ka – hoy', cc: 1350,
    note: 'Nosotros', at: 51.7, color: '#4fa3e8',
    body: { h: 1.72, leg: 0.48, arm: 0.4, lean: 0, knee: 0, shoulders: 0.24, jaw: 0.15, brow: 0.05, bulk: 1, funnel: 0, glob: 1 },
  },
]
SPECIES.forEach((s, i) => {
  s.x = xOfYears(s.from)
  s.x2 = xOfYears(s.to)
  s.z = 1.0 - i * 2.2
})

const TICKS = [
  [7e6, '7 Ma'], [5e6, '5 Ma'], [3e6, '3 Ma'], [2e6, '2 Ma'], [1e6, '1 Ma'],
  [5e5, '500 ka'], [2e5, '200 ka'], [1e5, '100 ka'], [5e4, '50 ka'], [2e4, '20 ka'], [0, 'hoy'],
]
// Cruce neandertal–sapiens: hace unos 50–60 ka, fuera de África.
const GENE_FLOW_X = xOfYears(5.5e4)

export default function Evolution() {
  const group = useRef()
  const tickEls = useRef([])
  const axis = useRef()
  const gl = useThree((s) => s.gl)
  gl.localClippingEnabled = true

  useFrame(() => {
    const t = clock.t
    const [t0, t1] = SCENES.evo
    const vis = t >= t0 && t <= t1
    group.current.visible = vis
    tickEls.current.forEach((el, i) => {
      if (el) el.style.opacity = vis ? smooth(t, 36 + i * 0.12, 36.6 + i * 0.12) : 0
    })
    if (!vis) return
    const k = smooth(t, 35.8, 37.6)
    axis.current.scale.x = Math.max(k, 0.0001)
  })

  return (
    <group ref={group}>
      <Ground />
      {/* Eje temporal */}
      <group position={[-0.4, 0.02, AXIS_Z]}>
        <group ref={axis}>
          <mesh position={[15.25, 0, 0]}>
            <boxGeometry args={[30.5, 0.025, 0.025]} />
            <meshBasicMaterial color="#cfe0ff" toneMapped={false} />
          </mesh>
        </group>
      </group>
      {TICKS.map(([y, label], i) => {
        const x = xOfYears(y)
        return (
          <group key={label} position={[x, 0.02, AXIS_Z]}>
            <mesh position={[0, 0.06, 0]}>
              <boxGeometry args={[0.02, 0.12, 0.02]} />
              <meshBasicMaterial color="#cfe0ff" toneMapped={false} />
            </mesh>
            <Html position={[0, -0.05, 0.35]} center zIndexRange={[15, 5]}>
              <div ref={(el) => (tickEls.current[i] = el)} className="tick" style={{ opacity: 0 }}>
                {label}
              </div>
            </Html>
          </group>
        )
      })}
      {SPECIES.map((s, i) => (
        <Lane key={s.id} s={s} i={i} />
      ))}
      <GeneFlow />
    </group>
  )
}

function Ground() {
  const uniforms = useMemo(() => ({ uFade: { value: 0 } }), [])
  useFrame(() => {
    uniforms.uFade.value = smooth(clock.t, 35.6, 36.6)
  })
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[14, 0, -4]}>
      <planeGeometry args={[110, 70]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          varying vec2 vW;
          void main(){ vec4 w = modelMatrix*vec4(position,1.0); vW = w.xz; gl_Position = projectionMatrix*viewMatrix*w; }
        `}
        fragmentShader={/* glsl */ `
          uniform float uFade;
          varying vec2 vW;
          void main(){
            vec2 g = abs(fract(vW - 0.5) - 0.5) / fwidth(vW);
            float line = 1.0 - min(min(g.x, g.y), 1.0);
            float d = length((vW - vec2(14.0, -4.5)) * vec2(0.045, 0.075));
            float fade = smoothstep(1.0, 0.15, d);
            vec3 base = vec3(0.035, 0.05, 0.085);
            vec3 col = base + vec3(0.25, 0.35, 0.6) * line * 0.22;
            gl_FragColor = vec4(col, fade * uFade);
          }
        `}
      />
    </mesh>
  )
}

const WIDE_AT = 54.6

function Lane({ s, i }) {
  const bar = useRef()
  const fig = useRef()
  const scan = useRef()
  const ring = useRef()
  const card = useRef()
  const tag = useRef()
  const drop = useRef()
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), 0), [])
  const H = s.body.h
  const next = SPECIES[i + 1]?.at ?? WIDE_AT + 0.4

  useFrame(() => {
    const t = clock.t
    const vis = t >= SCENES.evo[0] && t <= SCENES.evo[1] ? 1 : 0
    // Ficha grande mientras la cámara está con esta especie; en el plano
    // general final solo queda el nombre.
    const cardOn = vis * smooth(t, s.at - 0.1, s.at + 0.6) * (1 - smooth(t, next - 1.0, next - 0.4))
    // Los nodos de <Html> se montan en otra raíz de React: pueden no existir aún.
    if (card.current) {
      card.current.style.opacity = cardOn.toFixed(3)
      card.current.style.transform = `translateY(${((1 - smooth(t, s.at - 0.1, s.at + 0.6)) * 12).toFixed(2)}px)`
    }
    if (tag.current) tag.current.style.opacity = (vis * smooth(t, WIDE_AT + 0.6, WIDE_AT + 1.4)).toFixed(3)
    if (!vis) return
    // Holograma que se solidifica: un plano de recorte sube por la figura.
    const rise = easeOut(ramp(t, s.at - 0.9, s.at + 0.7))
    const clipY = -0.05 + rise * (H + 0.35)
    plane.constant = clipY
    scan.current.position.y = clipY
    scan.current.scale.setScalar(rise > 0 && rise < 1 ? 1 : 0.0001)
    fig.current.visible = rise > 0
    ring.current.scale.setScalar(Math.max(easeOut(ramp(t, s.at - 1.1, s.at - 0.5)), 0.0001))
    // Barra de duración de la especie.
    const grow = easeOut(ramp(t, s.at - 0.2, s.at + 1.6))
    const len = Math.max((s.x2 - s.x) * grow, 0.0001)
    bar.current.scale.x = len
    bar.current.position.x = len / 2
    drop.current.scale.y = Math.max(smooth(t, s.at - 1.0, s.at - 0.2), 0.0001)
  })

  return (
    <group position={[s.x, 0, s.z]}>
      {/* Línea que baja desde el eje hasta el carril */}
      <mesh ref={drop} position={[0, 0.01, (AXIS_Z - s.z) / 2]}>
        <boxGeometry args={[0.02, 0.005, AXIS_Z - s.z]} />
        <meshBasicMaterial color={s.color} transparent opacity={0.45} toneMapped={false} />
      </mesh>
      <mesh ref={bar} position={[0, 0.04, 0]}>
        <boxGeometry args={[1, 0.06, 0.3]} />
        <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={0.9} roughness={0.4} toneMapped={false} />
      </mesh>
      <mesh ref={ring} position={[0, 0.075, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.36, 0.42, 48]} />
        <meshBasicMaterial color={s.color} toneMapped={false} />
      </mesh>
      <group ref={fig} position={[0, 0.08, 0]}>
        <Hominin id={s.id} body={s.body} cc={s.cc} plane={plane} accent={s.color} seed={i} />
      </group>
      <mesh ref={scan} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.42, 48]} />
        <meshBasicMaterial color={s.color} transparent opacity={0.55} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <Html position={[1.0, H * 0.52, 0]} center distanceFactor={3.6} zIndexRange={[30, 20]}>
        <div ref={card} className="species-card" style={{ '--c': s.color, opacity: 0 }}>
          <div className="species-name">{s.name}</div>
          <div className="species-meta">
            <span>{s.dates}</span>
            <span>{String(s.cc).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} cm³</span>
          </div>
          <div className="species-note">{s.note}</div>
        </div>
      </Html>
      <Html position={[0, H + 0.35, 0]} center zIndexRange={[25, 15]}>
        <div ref={tag} className="species-tag" style={{ '--c': s.color, opacity: 0 }}>
          {s.name.split(' ')[0] === 'Homo' ? `H. ${s.name.split(' ')[1]}` : s.name.split(' ')[0]}
        </div>
      </Html>
    </group>
  )
}

// Figura homínida: escultura generada en hominin.js a partir de las
// proporciones de cada especie. Aquí solo se le da material (con el plano de
// recorte del efecto holograma) y un leve balanceo.
function Hominin({ id, body, cc, plane, accent, seed }) {
  const ref = useRef()
  const mesh = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: '#b58a66',
      roughness: 0.38,
      metalness: 0.5,
      clearcoat: 0.4,
      clearcoatRoughness: 0.35,
      sheen: 0.7,
      sheenColor: new THREE.Color(accent),
      sheenRoughness: 0.4,
      clippingPlanes: [plane],
    })
    return buildHomininMesh(id, body, cc, mat)
  }, [id, body, cc, accent, plane])

  useFrame(() => {
    const t = clock.t
    if (!ref.current) return
    ref.current.rotation.y = 1.1 + Math.sin(t * 0.35 + seed) * 0.06
    ref.current.scale.set(1, 1 + Math.sin(t * 1.5 + seed) * 0.004, 1)
  })

  return (
    <group ref={ref}>
      <primitive object={mesh} />
    </group>
  )
}

// Flujo genético: un arco del carril neandertal al sapiens hace ~55 ka.
function GeneFlow() {
  const ref = useRef()
  const mat = useRef()
  const card = useRef()
  const nean = SPECIES[4]
  const sap = SPECIES[5]
  const geo = useMemo(() => {
    const a = new THREE.Vector3(GENE_FLOW_X, 0.1, nean.z)
    const b = new THREE.Vector3(GENE_FLOW_X, 0.1, sap.z)
    const c = new THREE.Vector3(GENE_FLOW_X, 3.2, (nean.z + sap.z) / 2)
    const curve = new THREE.QuadraticBezierCurve3(a, c, b)
    return new THREE.TubeGeometry(curve, 64, 0.075, 10, false)
  }, [])
  useFrame(() => {
    const t = clock.t
    const k = smooth(t, 55.2, 56.6)
    const total = geo.index.count
    geo.setDrawRange(0, Math.floor((total * k) / 60) * 60)
    ref.current.visible = k > 0
    if (card.current) card.current.style.opacity = t <= SCENES.evo[1] ? span(t, 56.0, 60.5, 0.6, 0.5) : 0
  })
  return (
    <group>
      <mesh ref={ref} geometry={geo}>
        <meshBasicMaterial ref={mat} color="#fff1c9" toneMapped={false} />
      </mesh>
      <Html position={[GENE_FLOW_X, 2.15, (nean.z + sap.z) / 2]} center zIndexRange={[30, 20]}>
        <div ref={card} className="flow-card" style={{ opacity: 0 }}>
          hasta un 2 % de ADN neandertal
        </div>
      </Html>
    </group>
  )
}
