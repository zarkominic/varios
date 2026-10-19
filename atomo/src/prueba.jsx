// Banco de pruebas: dibuja UNA forma en un instante concreto de su escena,
// con las zonas que tapan el rótulo y los subtítulos marcadas.
import { createRoot } from 'react-dom/client';
import { Canvas, advance } from '@react-three/fiber';
import * as THREE from 'three';
import { Atomo, Estrellas, Resplandor } from './Atomo.jsx';
import { rig } from './estado.js';
import { reloj } from './tiempo.js';

export function arrancarPrueba(nombre, modulo) {
  rig.forma = nombre;
  rig.inicioForma = 100;
  reloj.modo = 'fijo';
  reloj.sinTransicion = true;
  reloj.t = 100;
  reloj.energia = 0;
  const formas = { [nombre]: modulo.forma };
  const camaras = { [nombre]: modulo.camara };
  createRoot(document.getElementById('lienzo')).render(
    <Canvas
      frameloop="never"
      dpr={1}
      gl={{ antialias: false, preserveDrawingBuffer: true, toneMapping: THREE.NoToneMapping }}
      camera={{ fov: 40, position: modulo.camara.pos, near: 0.1, far: 60 }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color('#05081a');
        window.__renderizar = (ts, energia = 0) => {
          reloj.t = 100 + ts;
          reloj.energia = energia;
          advance(performance.now());
        };
        setTimeout(() => (window.__listo = true), 50);
      }}
    >
      <Estrellas />
      <Atomo formas={formas} camaras={camaras} />
      <Resplandor />
    </Canvas>,
  );
}
