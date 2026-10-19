// Reloj compartido. En modo "vivo" el tiempo avanza con los fotogramas reales.
// En modo "fijo" (render de vídeo y pruebas) lo marca quien dibuja cada fotograma.
export const reloj = {
  modo: 'vivo',
  t: 0,
  dt: 1 / 30,
  energia: null, // en modo fijo: energía de la voz (0-1) del fotograma actual
  sinTransicion: false, // en pruebas: mostrar la forma ya formada
  sinDibujo: false, // al calentar la simulación: calcular sin dibujar
};
