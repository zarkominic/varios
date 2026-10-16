import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Atomo, Estrellas, Resplandor } from './Atomo.jsx';
import { iniciarInterfaz } from './interfaz.js';

const interfaz = iniciarInterfaz();

createRoot(document.getElementById('lienzo')).render(
  <Canvas
    dpr={[1, 1.75]}
    gl={{ antialias: false, preserveDrawingBuffer: true, toneMapping: THREE.NoToneMapping }}
    camera={{ fov: 40, position: [0, 0.3, 6.6], near: 0.1, far: 60 }}
    onCreated={({ scene }) => {
      scene.background = new THREE.Color('#05081a');
      interfaz.escenaLista();
    }}
  >
    <Estrellas />
    <Atomo />
    <Resplandor />
  </Canvas>,
);
