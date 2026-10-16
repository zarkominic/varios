// Página de render: dibuja el vídeo fotograma a fotograma (1080x1920) a partir de
// build/video/<idioma>/linea.json. La controla herramientas/render-video.mjs.
import { createRoot } from 'react-dom/client';
import { Canvas, advance } from '@react-three/fiber';
import * as THREE from 'three';
import { Atomo, Estrellas, Resplandor } from './Atomo.jsx';
import { rig } from './estado.js';
import { reloj } from './tiempo.js';

const SERIE = { es: 'Lo que no te explicaron en clase', en: "What school didn't teach you" };
const suave = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : 1 - (1 - x) ** 3);
const escapar = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Bloques cortos de subtítulo (estilo TikTok): hasta ~18 letras o hasta un signo de puntuación.
function bloques(palabras) {
  const res = [];
  let actual = [];
  for (const w of palabras) {
    const largo = actual.reduce((a, x) => a + x.p.length + 1, 0);
    const previa = actual[actual.length - 1];
    if (actual.length && (largo + w.p.length > 18 || /[.?!:;,]$/.test(previa.p) || previa.e !== w.e)) {
      res.push(actual);
      actual = [];
    }
    actual.push(w);
  }
  if (actual.length) res.push(actual);
  return res.map((b) => ({ palabras: b, i: b[0].i, f: b[b.length - 1].f }));
}

async function iniciar() {
  const idioma = new URLSearchParams(location.search).get('idioma') ?? 'es';
  const linea = await (await fetch(`build/video/${idioma}/linea.json`)).json();
  await document.fonts.ready;
  const subs = bloques(linea.palabras);
  const $serie = document.getElementById('serie');
  const $rotulo = document.getElementById('rotulo');
  const $sub = document.getElementById('subtitulo');
  $serie.textContent = SERIE[idioma] ?? SERIE.es;

  const primera = linea.escenas[0];
  rig.forma = primera.forma;
  rig.inicioForma = -1.8; // la primera forma ya está formada en el fotograma 0
  reloj.modo = 'fijo';
  reloj.t = 0;
  reloj.dt = 1 / linea.fps;

  let rotuloActual = -1;
  let bloqueActual = -1;

  function overlays(t) {
    // Escena actual.
    let k = 0;
    for (let j = 0; j < linea.escenas.length; j++) if (linea.escenas[j].inicio <= t) k = j;
    const esc = linea.escenas[k];
    if (rig.forma !== esc.forma) {
      rig.forma = esc.forma;
      rig.inicioForma = esc.inicio;
    }
    // Rótulo: entra con un fundido de 0,6 s al empezar la voz de la escena.
    if (rotuloActual !== k) {
      $rotulo.textContent = esc.rotulo;
      rotuloActual = k;
    }
    const a = k === 0 ? 1 : suave((t - esc.voz_inicio + 0.15) / 0.6);
    $rotulo.style.opacity = a.toFixed(3);
    $rotulo.style.transform = `translate(-50%, ${((1 - a) * -14).toFixed(1)}px)`;
    $rotulo.style.filter = a < 1 ? `blur(${((1 - a) * 6).toFixed(1)}px)` : 'none';
    // Subtítulo: el bloque que se está diciendo, con la palabra actual resaltada.
    let b = -1;
    for (let j = 0; j < subs.length; j++) if (subs[j].i <= t + 0.05) b = j;
    const visible = b >= 0 && t <= subs[b].f + 0.35;
    $sub.style.visibility = visible ? 'visible' : 'hidden';
    if (!visible) return;
    if (b !== bloqueActual) {
      $sub.innerHTML = `<span class="caja">${subs[b].palabras.map((w) => `<span>${escapar(w.p)}</span>`).join(' ')}</span>`;
      bloqueActual = b;
    }
    const spans = $sub.querySelectorAll('.caja > span');
    subs[b].palabras.forEach((w, n) => spans[n].classList.toggle('ahora', w.i <= t + 0.05 && (n === subs[b].palabras.length - 1 || subs[b].palabras[n + 1].i > t + 0.05)));
    const entrada = suave((t - subs[b].i + 0.05) / 0.12);
    $sub.style.transform = `translateX(-50%) scale(${(0.92 + 0.08 * entrada).toFixed(3)})`;
  }

  createRoot(document.getElementById('lienzo')).render(
    <Canvas
      frameloop="never"
      dpr={1}
      gl={{ antialias: false, preserveDrawingBuffer: true, toneMapping: THREE.NoToneMapping }}
      camera={{ fov: 40, position: [0, 0.3, 7], near: 0.1, far: 60 }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color('#05081a');
        // Calentamiento: simula de t0 a t1 en pasos gruesos sin capturar (para trocear el render).
        window.__calentar = (t0, t1, paso = 0.1) => {
          reloj.sinDibujo = true;
          for (let t = t0; t < t1; t += paso) {
            reloj.dt = paso;
            reloj.t = t;
            reloj.energia = linea.energia[Math.min(linea.energia.length - 1, Math.floor(t * linea.fps))] ?? 0;
            overlays(t);
            advance(performance.now());
          }
          reloj.sinDibujo = false;
          reloj.dt = 1 / linea.fps;
        };
        window.__fotograma = (n) => {
          const t = n / linea.fps;
          reloj.t = t;
          reloj.dt = 1 / linea.fps;
          reloj.energia = linea.energia[n] ?? 0;
          overlays(t);
          advance(performance.now());
        };
        window.__linea = { fotogramas: linea.fotogramas, fps: linea.fps, escenas: linea.escenas.map((e) => e.inicio) };
        setTimeout(() => (window.__listo = true), 50);
      }}
    >
      <Estrellas />
      <Atomo />
      <Resplandor />
    </Canvas>,
  );
}

iniciar();
