import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { FORMAS, CAMARAS, N, DIR } from './formas.js';
import { rig } from './estado.js';
import { reloj } from './tiempo.js';

const DURACION = 1.8;
const suave = (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
const amortiguar = (a, b, v, dt) => a + (b - a) * (1 - Math.exp(-v * dt));

// Partículas con tamaño en unidades del mundo y brillo aditivo.
function materialParticulas() {
  return new THREE.ShaderMaterial({
    uniforms: { uEscala: { value: 1 }, uEnergia: { value: 0 }, uBrillo: { value: 0.32 } },
    vertexShader: /* glsl */ `
      attribute float aTam;
      attribute vec3 aColor;
      uniform float uEscala;
      uniform float uEnergia;
      uniform float uBrillo;
      varying vec3 vColor;
      void main() {
        vColor = aColor * uBrillo * (1.0 + uEnergia * 0.8);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aTam * uEscala / -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      void main() {
        vec2 d = gl_PointCoord - 0.5;
        float r = length(d) * 2.0;
        if (r > 1.0) discard;
        float a = exp(-r * r * 5.5);
        gl_FragColor = vec4(vColor * a, a);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

function Estrellas() {
  const geo = useMemo(() => {
    const n = 900;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const tam = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = -4 - Math.random() * 14;
      const k = 0.15 + Math.random() * 0.35;
      col.set([k * 0.8, k * 0.9, k * 1.2], i * 3);
      tam[i] = 0.03 + Math.random() * 0.06;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    g.setAttribute('aTam', new THREE.BufferAttribute(tam, 1));
    return g;
  }, []);
  const mat = useMemo(() => {
    const m = materialParticulas();
    m.uniforms.uBrillo.value = 1;
    return m;
  }, []);
  const { size, gl, camera } = useThree();
  useFrame(() => {
    mat.uniforms.uEscala.value = (size.height * gl.getPixelRatio()) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
  });
  return <points geometry={geo} material={mat} frustumCulled={false} />;
}

export function Atomo({ formas = FORMAS, camaras = CAMARAS } = {}) {
  const { size, gl, camera } = useThree();
  const mat = useMemo(materialParticulas, []);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    g.setAttribute('aColor', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    g.setAttribute('aTam', new THREE.BufferAttribute(new Float32Array(N), 1));
    return g;
  }, []);
  const grupo = useRef();
  const s = useRef({
    t: 0,
    actual: rig.forma,
    inicio: rig.inicioForma ?? -100,
    desdePos: new Float32Array(N * 3),
    desdeCol: new Float32Array(N * 3),
    desdeTam: new Float32Array(N),
    energia: 0,
    camPos: new THREE.Vector3(...(camaras[rig.forma] ?? CAMARAS.atomo).pos),
    camMira: new THREE.Vector3(...(camaras[rig.forma] ?? CAMARAS.atomo).mira),
  });
  const p = useMemo(() => new Float32Array(3), []);
  const c = useMemo(() => new Float32Array(3), []);

  useFrame((_, delta) => {
    const fijo = reloj.modo === 'fijo';
    const dt = fijo ? reloj.dt : Math.min(delta, 1 / 20);
    const e = s.current;
    e.t = fijo ? reloj.t : e.t + dt;
    const t = e.t;
    const pos = geo.attributes.position.array;
    const col = geo.attributes.aColor.array;
    const tam = geo.attributes.aTam.array;

    // ¿Nueva forma? Congelamos lo que se ve ahora y transformamos desde ahí.
    if (rig.forma !== e.actual && formas[rig.forma]) {
      e.desdePos.set(pos);
      e.desdeCol.set(col);
      e.desdeTam.set(tam);
      e.actual = rig.forma;
      e.inicio = rig.inicioForma ?? t;
    }
    const ts = t - e.inicio;
    const prog = reloj.sinTransicion ? 1 : Math.min(1, Math.max(0, ts / DURACION));
    const k = suave(prog);
    const remolino = Math.sin(Math.PI * k) * 0.7;
    const forma = formas[e.actual] ?? FORMAS.atomo;

    for (let i = 0; i < N; i++) {
      const j = i * 3;
      const tm = forma(i, t, p, c, ts);
      if (prog < 1) {
        // Retraso por partícula: la transformación avanza como una ola.
        const kk = suave(Math.min(1, Math.max(0, (prog - (i / N) * 0.25) / 0.75)));
        const w = Math.sin(Math.PI * kk) * remolino;
        pos[j] = e.desdePos[j] + (p[0] - e.desdePos[j]) * kk + DIR[j] * w;
        pos[j + 1] = e.desdePos[j + 1] + (p[1] - e.desdePos[j + 1]) * kk + DIR[j + 1] * w;
        pos[j + 2] = e.desdePos[j + 2] + (p[2] - e.desdePos[j + 2]) * kk + DIR[j + 2] * w;
        col[j] = e.desdeCol[j] + (c[0] - e.desdeCol[j]) * kk + w * 0.4;
        col[j + 1] = e.desdeCol[j + 1] + (c[1] - e.desdeCol[j + 1]) * kk + w * 0.5;
        col[j + 2] = e.desdeCol[j + 2] + (c[2] - e.desdeCol[j + 2]) * kk + w * 0.7;
        tam[i] = e.desdeTam[i] + (tm - e.desdeTam[i]) * kk;
      } else {
        pos[j] = p[0];
        pos[j + 1] = p[1];
        pos[j + 2] = p[2];
        col[j] = c[0];
        col[j + 1] = c[1];
        col[j + 2] = c[2];
        tam[i] = tm;
      }
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.aColor.needsUpdate = true;
    geo.attributes.aTam.needsUpdate = true;

    // Late al hablar.
    const objetivo = fijo && reloj.energia != null ? reloj.energia : rig.hablando ? (rig.visema ? rig.pesoVisema : 0.12) : 0;
    e.energia = amortiguar(e.energia, objetivo, 16, dt);
    mat.uniforms.uEnergia.value = e.energia;
    mat.uniforms.uEscala.value = (size.height * gl.getPixelRatio()) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    if (grupo.current) {
      const latido = 1 + 0.045 * e.energia;
      grupo.current.scale.setScalar(latido);
      const balanceo = camaras[e.actual]?.balanceo ?? (e.actual === 'atomo' ? 0 : 0.22);
      grupo.current.rotation.y = Math.sin(t * 0.35) * balanceo;
      grupo.current.position.y = Math.sin(t * 0.8) * 0.04;
    }

    // Cámara cinematográfica: viaja suavemente al encuadre de cada forma y respira.
    const cam = camaras[e.actual] ?? CAMARAS.atomo;
    e.camPos.x = amortiguar(e.camPos.x, cam.pos[0] + Math.sin(t * 0.21) * 0.25, 1.2, dt);
    e.camPos.y = amortiguar(e.camPos.y, cam.pos[1] + Math.sin(t * 0.17) * 0.12, 1.2, dt);
    e.camPos.z = amortiguar(e.camPos.z, cam.pos[2] - Math.sin(t * 0.13) * 0.2, 1.2, dt);
    e.camMira.x = amortiguar(e.camMira.x, cam.mira[0], 1.2, dt);
    e.camMira.y = amortiguar(e.camMira.y, cam.mira[1], 1.2, dt);
    e.camMira.z = amortiguar(e.camMira.z, cam.mira[2], 1.2, dt);
    camera.position.copy(e.camPos);
    camera.lookAt(e.camMira);
  });

  return (
    <group ref={grupo}>
      <points geometry={geo} material={mat} frustumCulled={false} />
    </group>
  );
}

// Resplandor (bloom): hace que las partículas brillen como luz real.
export function Resplandor() {
  const { gl, scene, camera, size } = useThree();
  const compositor = useMemo(() => {
    const comp = new EffectComposer(gl);
    comp.addPass(new RenderPass(scene, camera));
    comp.addPass(new UnrealBloomPass(new THREE.Vector2(256, 256), 0.75, 0.45, 0.32));
    comp.addPass(new OutputPass());
    return comp;
  }, [gl, scene, camera]);
  useEffect(() => {
    compositor.setPixelRatio(gl.getPixelRatio());
    compositor.setSize(size.width, size.height);
  }, [compositor, gl, size]);
  useFrame((_, dt) => compositor.render(dt), 1);
  return null;
}

export { Estrellas };
