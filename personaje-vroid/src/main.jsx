import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { Personaje, cargarVRM } from './Personaje.jsx';
import { iniciarInterfaz } from './interfaz.js';

const interfaz = iniciarInterfaz();

function Escena() {
  const [vrm, setVrm] = useState(null);
  useEffect(() => {
    cargarVRM().then(setVrm, (e) => {
      console.error(e);
      interfaz.errorAlCargar();
    });
  }, []);
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      camera={{ fov: 30, position: [0, 1.52, 2.6], rotation: [0, 0, 0], near: 0.1, far: 20 }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[1, 2, 3]} intensity={2.6} />
      {vrm && <Personaje vrm={vrm} alCargar={interfaz.personajeListo} />}
    </Canvas>
  );
}

createRoot(document.getElementById('lienzo')).render(<Escena />);
