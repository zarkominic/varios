import guion from './guion.json';
import { PIZARRAS } from './pizarra.js';
import { rig } from './rig.js';
import { decir, callar, voz, vocesEnEspanol } from './voz.js';

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const escapar = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function iniciarInterfaz() {
  const $ = (s) => document.querySelector(s);
  const escenario = $('#escenario');
  const pizarra = $('#pizarra');
  const subtitulo = $('#subtitulo');
  const play = $('#play');
  const estado = $('#estado');
  const btnReproducir = $('#btn-reproducir');
  const btnDetener = $('#btn-detener');
  const usarVoz = $('#usar-voz');
  const selVoz = $('#voz');
  const avisoVoz = $('#aviso-voz');
  const frase = $('#frase');
  const btnDecir = $('#btn-decir');

  $('#segmentos').innerHTML = guion.escenas.map(() => '<span><i></i></span>').join('');
  const barras = [...document.querySelectorAll('#segmentos i')];
  $('#guion-json').textContent = JSON.stringify(guion, null, 2);

  let ronda = 0;

  // --- Escena -------------------------------------------------------------
  function marcarFichas() {
    document.querySelectorAll('[data-expresion]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.expresion === rig.expresion)));
    document.querySelectorAll('[data-gesto]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.gesto === rig.gesto)));
  }

  function aplicarEscena(i) {
    const e = guion.escenas[i];
    pizarra.innerHTML = PIZARRAS[e.pizarra]?.() ?? '';
    escenario.dataset.cielo = e.cielo;
    rig.expresion = e.expresion;
    rig.gesto = e.gesto;
    rig.ladear = e.texto.trim().startsWith('¿');
    barras.forEach((b, k) => (b.style.width = k < i ? '100%' : '0%'));
    marcarFichas();
  }

  // Subtítulos por bloques cortos, con las palabras ya dichas resaltadas.
  function prepararSubtitulo(texto) {
    const palabras = [...texto.matchAll(/\S+/g)].map((m) => ({ ini: m.index, fin: m.index + m[0].length, txt: m[0] }));
    const bloques = [];
    let actual = [];
    for (const p of palabras) {
      const largo = actual.reduce((a, w) => a + w.txt.length + 1, 0);
      const ultima = actual[actual.length - 1];
      if (actual.length && (largo + p.txt.length > 30 || /[.?!:]$/.test(ultima.txt))) {
        bloques.push(actual);
        actual = [];
      }
      actual.push(p);
    }
    if (actual.length) bloques.push(actual);

    subtitulo.hidden = false;
    let visible = -1;
    let spans = [];
    return (indice) => {
      let k = bloques.findIndex((b) => indice < b[b.length - 1].fin + 1);
      if (k === -1) k = bloques.length - 1;
      if (k !== visible) {
        visible = k;
        subtitulo.innerHTML = `<span class="caja">${bloques[k].map((p) => `<span>${escapar(p.txt)}</span>`).join(' ')}</span>`;
        spans = [...subtitulo.querySelectorAll('.caja > span')];
      }
      bloques[k].forEach((p, n) => spans[n].classList.toggle('dicho', p.ini < indice));
    };
  }

  function reposo() {
    rig.gesto = 'reposo';
    rig.ladear = false;
    subtitulo.hidden = true;
    marcarFichas();
  }

  async function reproducir() {
    const mia = ++ronda;
    play.hidden = true;
    btnDetener.disabled = false;
    for (let i = 0; i < guion.escenas.length; i++) {
      if (mia !== ronda) return;
      const e = guion.escenas[i];
      aplicarEscena(i);
      const sub = prepararSubtitulo(e.texto);
      await decir(e.texto, {
        alAvanzar: (indice) => {
          sub(indice);
          barras[i].style.width = `${Math.min(100, (indice / e.texto.length) * 100)}%`;
        },
      });
      if (mia !== ronda) return;
      await esperar(450);
    }
    if (mia !== ronda) return;
    reposo();
    play.querySelector('span').textContent = 'Repetir';
    play.hidden = false;
    btnDetener.disabled = true;
  }

  function detener() {
    ronda++;
    callar();
    reposo();
    play.hidden = false;
    btnDetener.disabled = true;
  }

  // --- Voz ----------------------------------------------------------------
  let lista = [];
  function rellenarVoces() {
    lista = vocesEnEspanol();
    selVoz.innerHTML = lista.map((v, k) => `<option value="${k}">${escapar(v.name)} · ${escapar(v.lang)}</option>`).join('');
    voz.elegida = lista[0] ?? null;
    const hay = lista.length > 0;
    selVoz.hidden = !hay;
    usarVoz.disabled = !hay;
    avisoVoz.textContent = hay
      ? 'La voz es la de tu navegador y cambia según el dispositivo. Para publicar usarías tu voz grabada o una voz como Piper.'
      : 'Tu navegador no tiene voz en español: Nia moverá los labios al ritmo de los subtítulos, pero sin sonido.';
  }
  window.speechSynthesis?.addEventListener?.('voiceschanged', rellenarVoces);
  rellenarVoces();
  selVoz.addEventListener('change', () => (voz.elegida = lista[Number(selVoz.value)] ?? null));
  usarVoz.addEventListener('change', () => {
    voz.activa = usarVoz.checked;
    selVoz.disabled = !usarVoz.checked;
  });

  // --- Controles ----------------------------------------------------------
  play.addEventListener('click', reproducir);
  btnReproducir.addEventListener('click', reproducir);
  btnDetener.addEventListener('click', detener);

  btnDecir.addEventListener('click', async () => {
    const texto = frase.value.trim();
    if (!texto) return;
    const mia = ++ronda;
    play.hidden = true;
    btnDetener.disabled = false;
    if (rig.gesto === 'reposo') rig.gesto = 'explicar';
    rig.ladear = texto.startsWith('¿');
    marcarFichas();
    await decir(texto, { alAvanzar: prepararSubtitulo(texto) });
    if (mia !== ronda) return;
    reposo();
    play.hidden = false;
    btnDetener.disabled = true;
  });

  document.querySelectorAll('[data-expresion]').forEach((b) =>
    b.addEventListener('click', () => {
      rig.expresion = b.dataset.expresion;
      marcarFichas();
    }),
  );
  document.querySelectorAll('[data-gesto]').forEach((b) =>
    b.addEventListener('click', () => {
      rig.gesto = b.dataset.gesto;
      marcarFichas();
    }),
  );

  // Estado inicial: primera escena preparada, a la espera de reproducir.
  aplicarEscena(0);
  rig.expresion = 'sonriente';
  rig.gesto = 'reposo';
  rig.ladear = false;
  barras.forEach((b) => (b.style.width = '0%'));
  marcarFichas();

  window.__nia = { rig, aplicarEscena };

  return {
    personajeListo() {
      estado.hidden = true;
      play.disabled = false;
      btnReproducir.disabled = false;
      btnDecir.disabled = false;
      escenario.classList.add('listo');
    },
    errorAlCargar() {
      estado.textContent = 'No se pudo cargar a Nia. Recarga la página para intentarlo de nuevo.';
    },
  };
}
