import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { rig, POSES, EXPRESIONES } from './rig.js';

const esGLB = (buffer) => new TextDecoder().decode(new Uint8Array(buffer, 0, 4)) === 'glTF';

function base64ABuffer(texto) {
  const binario = atob(texto.trim());
  const bytes = new Uint8Array(binario.length);
  for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
  return bytes.buffer;
}

// Carga el modelo desde nia.vrm o, si no está (página publicada), desde su
// copia en base64. Las texturas se cargan con <img> para no depender de fetch.
export async function cargarVRM() {
  let datos = null;
  try {
    const r = await fetch('nia.vrm');
    if (r.ok) {
      const b = await r.arrayBuffer();
      if (esGLB(b)) datos = b;
    }
  } catch {
    // Seguimos con la copia en base64.
  }
  if (!datos) {
    const r = await fetch('nia-vrm.txt');
    if (!r.ok) throw new Error('No se encontró el modelo');
    datos = base64ABuffer(await r.text());
  }
  const loader = new GLTFLoader();
  loader.register((parser) => {
    parser.textureLoader = new TextureLoader(parser.options.manager);
    return { name: 'texturas_con_img' };
  });
  loader.register((parser) => new VRMLoaderPlugin(parser));
  const gltf = await loader.parseAsync(datos, '');
  return gltf.userData.vrm;
}

const VISEMAS = ['aa', 'ih', 'ou', 'ee', 'oh'];
const HUESOS = ['leftUpperArm', 'rightUpperArm', 'leftLowerArm', 'rightLowerArm', 'leftHand', 'rightHand'];

// Acerca a un valor de forma suave e independiente de los FPS.
const amortiguar = (actual, objetivo, velocidad, dt) =>
  actual + (objetivo - actual) * (1 - Math.exp(-velocidad * dt));

export function Personaje({ vrm, alCargar }) {
  const camara = useThree((s) => s.camera);
  const t = useRef({ tiempo: 0, proximoParpadeo: 2, parpadeo: 0, pesos: {} });

  useEffect(() => {
    VRMUtils.removeUnnecessaryVertices(vrm.scene);
    (VRMUtils.combineSkeletons ?? VRMUtils.removeUnnecessaryJoints)?.(vrm.scene);
    VRMUtils.rotateVRM0(vrm);
    vrm.scene.traverse((o) => {
      o.frustumCulled = false;
    });
    if (vrm.lookAt) vrm.lookAt.target = camara;
    alCargar?.(vrm);
  }, [vrm]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 20);
    const s = t.current;
    s.tiempo += dt;
    const tt = s.tiempo;
    const signo = vrm.meta?.metaVersion === '0' ? -1 : 1;
    const hueso = (n) => vrm.humanoid.getNormalizedBoneNode(n);
    const habla = rig.hablando ? 1 : 0;

    // Brazos: interpolar hacia la pose del gesto actual.
    const pose = POSES[rig.gesto] ?? POSES.reposo;
    for (const nombre of HUESOS) {
      const b = hueso(nombre);
      if (!b) continue;
      let [x, y, z] = pose[nombre] ?? [0, 0, 0];
      if (rig.gesto === 'explicar') {
        if (nombre === 'leftLowerArm') y += Math.sin(tt * 4.1) * 0.18 * habla;
        if (nombre === 'rightLowerArm') y += Math.sin(tt * 3.7 + 1) * 0.18 * habla;
        if (nombre === 'leftUpperArm') z += Math.sin(tt * 2.3) * 0.05 * habla;
      }
      if (rig.gesto === 'saludar' && nombre === 'rightLowerArm') z += Math.sin(tt * 9) * 0.35;
      if (rig.gesto === 'senalar' && nombre === 'rightUpperArm') z += Math.sin(tt * 2) * 0.03;
      b.rotation.x = amortiguar(b.rotation.x, x * signo, 7, dt);
      b.rotation.y = amortiguar(b.rotation.y, y, 7, dt);
      b.rotation.z = amortiguar(b.rotation.z, z * signo, 7, dt);
    }

    // Cuerpo: respiración y un leve balanceo; cabeza que asiente al hablar.
    const columna = hueso('spine');
    const pecho = hueso('chest');
    const cuello = hueso('neck');
    const cabeza = hueso('head');
    if (columna) {
      columna.rotation.z = Math.sin(tt * 0.7) * 0.02 * signo;
      columna.rotation.x = 0.03 * signo;
    }
    if (pecho) pecho.rotation.x = Math.sin(tt * 1.6) * 0.015 * signo;
    if (cuello) cuello.rotation.y = Math.sin(tt * 0.5) * 0.05;
    if (cabeza) {
      const asentir = Math.sin(tt * 5.3) * 0.035 * habla;
      cabeza.rotation.x = amortiguar(cabeza.rotation.x, asentir * signo, 10, dt);
      cabeza.rotation.z = amortiguar(cabeza.rotation.z, (rig.ladear ? 0.14 : 0) * signo, 4, dt);
    }

    // Expresiones: emoción + labios + parpadeo.
    const em = vrm.expressionManager;
    if (em) {
      const destino = {};
      const e = EXPRESIONES[rig.expresion] ?? EXPRESIONES.neutral;
      let nombreEmocion = e.nombre;
      if (nombreEmocion === 'surprised' && !em.getExpression('surprised') && em.getExpression('Surprised')) {
        nombreEmocion = 'Surprised';
      }
      for (const n of ['happy', 'relaxed', 'surprised', 'Surprised', 'sad', 'angry']) destino[n] = 0;
      if (nombreEmocion) destino[nombreEmocion] = e.peso * (rig.hablando && nombreEmocion !== 'relaxed' ? 0.7 : 1);
      for (const v of VISEMAS) destino[v] = rig.visema === v ? rig.pesoVisema : 0;
      for (const [n, objetivo] of Object.entries(destino)) {
        if (!em.getExpression(n)) continue;
        const rapidez = VISEMAS.includes(n) ? 22 : 5;
        s.pesos[n] = amortiguar(s.pesos[n] ?? 0, objetivo, rapidez, dt);
        em.setValue(n, s.pesos[n]);
      }

      // Parpadeo natural (no cuando sonríe con los ojos cerrados).
      if (tt > s.proximoParpadeo) {
        s.parpadeo = 0.0001;
        s.proximoParpadeo = tt + 2 + Math.random() * 3.5;
      }
      let cierre = 0;
      if (s.parpadeo > 0) {
        s.parpadeo += dt;
        const fase = s.parpadeo / 0.16;
        cierre = fase >= 1 ? 0 : Math.sin(fase * Math.PI);
        if (fase >= 1) s.parpadeo = 0;
      }
      if (nombreEmocion === 'happy') cierre = 0;
      em.setValue('blink', cierre);
    }

    // Pasos cortos para que la física del pelo sea estable aunque bajen los FPS.
    const pasos = Math.ceil(dt / (1 / 60));
    for (let k = 0; k < pasos; k++) vrm.update(dt / pasos);
  });

  return <primitive object={vrm.scene} />;
}
