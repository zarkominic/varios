// Estado compartido entre la interfaz y la escena 3D.
// voz.js escribe hablando/visema/pesoVisema; el átomo los usa para "latir" al hablar.
export const rig = {
  forma: 'atomo',
  hablando: false,
  visema: null,
  pesoVisema: 0,
  // Instantes clave de la escena actual (segundos desde que empezó su forma),
  // sacados de las palabras de la voz: { d: 4.3, d_fin: 4.5, sonrisa: 6.2, ... }
  marcas: null,
  idioma: 'es',
};
