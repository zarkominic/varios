import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, advance } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode, BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { clock, DURATION, smooth } from './clock'
import CameraRig from './CameraRig'
import Overlay, { ticks } from './Overlay'
import Helix from './scenes/Helix'
import Chromosomes from './scenes/Chromosomes'
import Compare from './scenes/Compare'
import Evolution from './scenes/Evolution'
import musicUrl from './assets/music.m4a'

// Avanza el reloj (salvo en captura, donde lo fija el script) y anima el
// texto en el mismo fotograma que la escena.
function Driver() {
  useFrame((_, dt) => {
    if (!clock.capture && clock.playing) {
      clock.t += Math.min(dt, 0.1)
      if (clock.t >= DURATION) {
        clock.t = DURATION
        clock.playing = false
        window.dispatchEvent(new Event('adn:ended'))
      }
    }
    ticks.forEach((f) => f(clock.t))
  }, -3)
  return null
}

// Fondo: esfera con degradado vertical cuyo color cambia con cada escena.
const PALETTES = [
  [0, '#0a1030', '#020309'],
  [18.2, '#120c33', '#030209'],
  [29.2, '#071a2b', '#020408'],
  [35.7, '#1b1830', '#05070d'],
  [60, '#1b1830', '#05070d'],
]
function Backdrop() {
  const uniforms = useMemo(
    () => ({ uTop: { value: new THREE.Color() }, uBottom: { value: new THREE.Color() } }),
    []
  )
  const cols = useMemo(() => PALETTES.map(([t, a, b]) => [t, new THREE.Color(a), new THREE.Color(b)]), [])
  useFrame(() => {
    const t = clock.t
    let i = 0
    while (i < cols.length - 2 && t > cols[i + 1][0]) i++
    const k = smooth(t, cols[i + 1][0] - 0.3, cols[i + 1][0] + 0.3)
    uniforms.uTop.value.copy(cols[i][1]).lerp(cols[i + 1][1], k)
    uniforms.uBottom.value.copy(cols[i][2]).lerp(cols[i + 1][2], k)
  })
  return (
    <mesh scale={200} renderOrder={-1}>
      <sphereGeometry args={[1, 32, 16]} />
      <shaderMaterial
        side={THREE.BackSide}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={/* glsl */ `varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`}
        fragmentShader={/* glsl */ `
          uniform vec3 uTop; uniform vec3 uBottom; varying vec3 vP;
          void main(){
            float h = smoothstep(-0.35, 0.6, vP.y);
            vec3 c = mix(uBottom, uTop, h);
            float glow = pow(max(0.0, 1.0 - abs(vP.y + 0.05) * 3.0), 3.0) * 0.12;
            gl_FragColor = vec4(c + glow * uTop * 2.0, 1.0);
          }
        `}
      />
    </mesh>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#9fb2ff" />
      <directionalLight position={[6, 9, 8]} intensity={2.4} color="#fff1dc" />
      <directionalLight position={[-8, 3, -6]} intensity={1.6} color="#6f8dff" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 6, 6]} scale={[12, 3, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.2} position={[-8, 1, 0]} rotation-y={Math.PI / 2} scale={[10, 4, 1]} color="#7c8cff" />
        <Lightformer form="ring" intensity={1.6} position={[8, 2, -2]} rotation-y={-Math.PI / 2} scale={4} color="#38d9c9" />
      </Environment>
    </>
  )
}

// Modo captura: el script de render fija el tiempo y pide un fotograma.
function CaptureBridge() {
  const gl = useThree((s) => s.gl)
  useEffect(() => {
    if (!clock.capture) return
    window.__adn = {
      ready: true,
      frame(t) {
        clock.t = t
        advance(performance.now())
        gl.getContext().finish()
        return true
      },
    }
  }, [gl])
  return null
}

function Controls() {
  const [playing, setPlaying] = useState(clock.playing)
  const [sound, setSound] = useState(false)
  const audio = useRef()
  const range = useRef()

  useEffect(() => {
    const onEnd = () => setPlaying(false)
    window.addEventListener('adn:ended', onEnd)
    const id = setInterval(() => {
      if (range.current && document.activeElement !== range.current) range.current.value = clock.t.toFixed(2)
    }, 120)
    return () => {
      window.removeEventListener('adn:ended', onEnd)
      clearInterval(id)
    }
  }, [])

  const syncAudio = (play) => {
    const a = audio.current
    if (!a) return
    a.currentTime = clock.t
    if (play && sound) a.play().catch(() => {})
    else a.pause()
  }
  const toggle = () => {
    if (clock.t >= DURATION) clock.t = 0
    clock.playing = !clock.playing
    setPlaying(clock.playing)
    syncAudio(clock.playing)
  }
  const restart = () => {
    clock.t = 0
    clock.playing = true
    setPlaying(true)
    syncAudio(true)
  }
  const toggleSound = () => {
    const next = !sound
    setSound(next)
    const a = audio.current
    a.currentTime = clock.t
    if (next && clock.playing) a.play().catch(() => {})
    else a.pause()
  }
  const scrub = (e) => {
    clock.t = Number(e.target.value)
    if (audio.current) audio.current.currentTime = clock.t
  }
  const fullscreen = () => {
    const el = document.querySelector('.stage')
    if (document.fullscreenElement) document.exitFullscreen?.()
    else el?.requestFullscreen?.().catch(() => {})
  }

  return (
    <div className="controls">
      <audio ref={audio} src={musicUrl} preload="auto" />
      <button type="button" onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproducir'}>
        {playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
        )}
      </button>
      <button type="button" onClick={restart} aria-label="Volver a empezar">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5a7 7 0 1 1-6.6 9.3l1.9-.6A5 5 0 1 0 12 7v3L7.5 6 12 2z" /></svg>
      </button>
      <input
        ref={range}
        id="scrub"
        type="range"
        min="0"
        max={DURATION}
        step="0.01"
        defaultValue="0"
        onInput={scrub}
        aria-label="Posición en la animación"
      />
      <button type="button" onClick={toggleSound} aria-pressed={sound} className="sound">
        {sound ? 'Sonido: sí' : 'Sonido: no'}
      </button>
      <button type="button" onClick={fullscreen} aria-label="Pantalla completa">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v2H6v4H4zm10 0h6v6h-2V6h-4zM4 14h2v4h4v2H4zm14 0h2v6h-6v-2h4z" /></svg>
      </button>
    </div>
  )
}

export default function App() {
  const capture = clock.capture
  return (
    <div className="viewport">
      <div className="stage">
        <Canvas
          frameloop={capture ? 'never' : 'always'}
          dpr={capture ? 1 : [1, 2]}
          gl={{ antialias: false, preserveDrawingBuffer: capture, powerPreference: 'high-performance' }}
          camera={{ fov: 36, near: 0.05, far: 500, position: [0, 0, 30] }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.NoToneMapping
            gl.outputColorSpace = THREE.SRGBColorSpace
          }}
        >
          <color attach="background" args={['#020309']} />
          <fog attach="fog" args={['#05070d', 30, 90]} />
          <Driver />
          <CameraRig />
          <Backdrop />
          <Lights />
          <Helix />
          <Chromosomes />
          <Compare />
          <Evolution />
          <EffectComposer multisampling={4} disableNormalPass>
            <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.62} luminanceSmoothing={0.25} radius={0.7} />
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
            <Vignette offset={0.3} darkness={0.62} />
            <Noise opacity={0.035} blendFunction={BlendFunction.SOFT_LIGHT} />
          </EffectComposer>
          <CaptureBridge />
        </Canvas>
        <Overlay />
        {!capture && <Controls />}
      </div>
    </div>
  )
}
