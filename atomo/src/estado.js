// Estado compartido entre la interfaz y la escena 3D.
// voz.js escribe hablando/visema/pesoVisema; el átomo los usa para "latir" al hablar.
export const rig = {
  forma: 'atomo',
  hablando: false,
  visema: null,
  pesoVisema: 0,
};
