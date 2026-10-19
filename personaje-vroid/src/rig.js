// Estado compartido entre la interfaz (DOM) y el bucle de animación 3D.
// Se muta directamente para no provocar renders de React en cada fotograma.
export const rig = {
  expresion: 'neutral',
  gesto: 'reposo',
  hablando: false,
  visema: null, // 'aa' | 'ih' | 'ou' | 'ee' | 'oh' | null (boca cerrada)
  pesoVisema: 0,
  ladear: false,
};

// Expresiones del guion -> expresiones VRM (y cuánto se aplican).
export const EXPRESIONES = {
  neutral: { nombre: null, peso: 0 },
  feliz: { nombre: 'happy', peso: 0.65 },
  sonriente: { nombre: 'relaxed', peso: 0.8 },
  sorpresa: { nombre: 'surprised', peso: 0.75 },
  triste: { nombre: 'sad', peso: 0.8 },
  enfado: { nombre: 'angry', peso: 0.75 },
};

// Poses en el convenio de ejes de VRM 1.0 (radianes, orden XYZ).
// Para modelos VRM 0.x se invierten X y Z al aplicarlas.
const BRAZOS_ABAJO = {
  leftUpperArm: [0.05, 0, -1.22],
  rightUpperArm: [0.05, 0, 1.22],
  leftLowerArm: [0, -0.3, 0],
  rightLowerArm: [0, 0.3, 0],
  leftHand: [0, 0, -0.1],
  rightHand: [0, 0, 0.1],
};

export const POSES = {
  reposo: BRAZOS_ABAJO,
  explicar: {
    leftUpperArm: [-0.25, -0.2, -1.05],
    rightUpperArm: [-0.25, 0.2, 1.05],
    leftLowerArm: [0, -1.25, 0],
    rightLowerArm: [0, 1.25, 0],
    leftHand: [0, 0, 0],
    rightHand: [0, 0, 0],
  },
  senalar: {
    ...BRAZOS_ABAJO,
    rightUpperArm: [0, -0.05, -1.25],
    rightLowerArm: [0, 0.2, 0],
    rightHand: [0, 0, 0],
  },
  saludar: {
    ...BRAZOS_ABAJO,
    rightUpperArm: [0, 0.6, 0.25],
    rightLowerArm: [0, 0.2, -1.8],
    rightHand: [0, 0, 0],
  },
};
