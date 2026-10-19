// Fontanería común de las escenas del vídeo largo (atomo/plato/escenas/*.html).
//
//   import { escena } from '/atomo/plato/escena.js';
//   const E = await escena('luna');
//   E.marca('d', 14.4)   → segundos (desde el inicio de la escena) en que se dice la palabra clave 'd'
//   E.energia(t)         → energía de la voz en t (0..1), para que el átomo late al hablar
//   E.iniciar(dibujar, { paso: 1 / 12 })   → conecta la escena con el renderizador y la vista previa
//
// Al renderizar, render-escenas.mjs inyecta window.ESCENA (duración, marcas, energía, veredictos).
// Al abrir la página a mano no existe: se usan las marcas de marcas-<episodio>.json y una energía
// simulada, y la escena se reproduce en bucle. Con ?captura en la URL no se anima sola (la usan
// render-escenas.mjs y estilos/herramientas/capturar.mjs, que llaman a window.__frame(t)).

const captura = new URLSearchParams(location.search).has('captura');

export async function escena(id, episodio = 'ep02') {
  let E = window.ESCENA;
  if (!E) {
    const todas = await (await fetch(`/atomo/plato/escenas/marcas-${episodio}.json`)).json();
    E = { ...todas[id.startsWith('marcador') ? 'marcador-1' : id], id };
    const n = Number(new URLSearchParams(location.search).get('n'));
    if (id.startsWith('marcador') && n) Object.assign(E, todas[`marcador-${n}`] ?? {});
  }
  const fps = E.fps ?? 30;
  return {
    ...E,
    fps,
    marca(nombre, porDefecto = 0) {
      const v = E.marcas?.[nombre];
      return typeof v === 'number' ? v : porDefecto;
    },
    energia(t) {
      if (Array.isArray(E.energia) && E.energia.length) {
        const i = Math.max(0, Math.min(E.energia.length - 1, Math.floor(t * fps)));
        return E.energia[i];
      }
      // Vista previa: un latido suave mientras habla la voz.
      const [v0, v1] = E.voz ?? [0.5, E.duracion - 0.6];
      return t > v0 && t < v1 ? 0.35 + 0.35 * Math.abs(Math.sin(t * 9.3) * Math.sin(t * 3.1)) : 0;
    },
    iniciar(dibujar, { paso = 0 } = {}) {
      window.__paso = paso;
      window.__frame = async (t) => dibujar(Math.max(0, Math.min(E.duracion, t)));
      if (!captura) {
        const t0 = performance.now();
        const bucle = async (ahora) => {
          let t = ((ahora - t0) / 1000) % E.duracion;
          if (paso > 0) t = Math.floor(t / paso) * paso;
          await dibujar(t);
          requestAnimationFrame(bucle);
        };
        requestAnimationFrame(bucle);
      }
      window.__listo = true;
    },
  };
}
