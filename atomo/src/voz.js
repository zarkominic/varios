import { rig } from './estado.js';

// Cada vocal tiene su forma de boca (visema) en VRM.
const VOCALES = {
  a: 'aa', á: 'aa', e: 'ee', é: 'ee', i: 'ih', í: 'ih', y: 'ih',
  o: 'oh', ó: 'oh', u: 'ou', ú: 'ou', ü: 'ou',
};
const LABIOS_CERRADOS = new Set(['m', 'b', 'p']);
const PAUSA_CORTA = new Set([',', ';', ':']);
const PAUSA_LARGA = new Set(['.', '?', '!', '…']);

const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
const vivas = new Set(); // Chrome pierde el evento "end" si la frase se recoge de memoria.

export const voz = {
  activa: Boolean(synth),
  elegida: null,
};

export function vocesEnEspanol() {
  if (!synth) return [];
  return synth
    .getVoices()
    .filter((v) => v.lang?.toLowerCase().startsWith('es'))
    .sort((a, b) => puntuar(b) - puntuar(a));
}

function puntuar(v) {
  let p = 0;
  if (v.lang.toLowerCase() === 'es-es') p += 4;
  if (/natural|google|neural|online/i.test(v.name)) p += 2;
  if (v.localService) p += 1;
  return p;
}

let cancelarActual = null;

export function callar() {
  cancelarActual?.();
  cancelarActual = null;
  if (synth && (synth.speaking || synth.pending)) synth.cancel();
  rig.hablando = false;
  rig.visema = null;
}

// Dice un texto moviendo los labios. Con voz, se sincroniza con los eventos
// de palabra del navegador; sin voz, avanza a ritmo de lectura.
export function decir(texto, { alAvanzar } = {}) {
  // Chrome a veces ignora una frase lanzada justo después de cancelar otra.
  const ocupado = Boolean(synth && (synth.speaking || synth.pending));
  callar();
  return new Promise((resolver) => {
    let indice = 0;
    let cps = 14.5;
    let pausaHasta = 0;
    let ultimaPausa = -1;
    let ultimoLimite = null;
    let anterior = null;
    let terminado = false;
    let raf = 0;
    let previo = performance.now();
    const conVoz = voz.activa && synth && vocesEnEspanol().length > 0;
    let vozTerminada = !conVoz;

    const acabar = () => {
      if (terminado) return;
      terminado = true;
      cancelAnimationFrame(raf);
      clearTimeout(seguro);
      rig.hablando = false;
      rig.visema = null;
      alAvanzar?.(texto.length);
      resolver();
    };
    cancelarActual = acabar;

    const paso = (ahora) => {
      const dt = Math.min(0.1, (ahora - previo) / 1000);
      previo = ahora;
      if (ahora < pausaHasta) {
        rig.visema = null;
      } else if (indice < texto.length) {
        indice = Math.min(texto.length, indice + cps * dt);
        const pos = Math.floor(indice);
        const c = (texto[pos] || '').toLowerCase();
        if ((PAUSA_CORTA.has(c) || PAUSA_LARGA.has(c)) && pos !== ultimaPausa) {
          ultimaPausa = pos;
          pausaHasta = ahora + (PAUSA_LARGA.has(c) ? 330 : 200);
          rig.visema = null;
        } else if (VOCALES[c]) {
          anterior = VOCALES[c];
          rig.visema = anterior;
          rig.pesoVisema = 0.75 + Math.random() * 0.2;
        } else if (LABIOS_CERRADOS.has(c) || c === ' ') {
          rig.visema = null;
        } else {
          rig.visema = anterior;
          rig.pesoVisema = 0.35;
        }
      } else {
        rig.visema = null;
      }
      alAvanzar?.(indice);
      if (indice >= texto.length && vozTerminada) return acabar();
      raf = requestAnimationFrame(paso);
    };

    // Red de seguridad por si el navegador nunca avisa de que ha terminado.
    const estimado = texto.length / cps + 2;
    const seguro = setTimeout(acabar, (conVoz ? estimado * 2.5 : estimado + 4) * 1000);

    rig.hablando = true;
    if (conVoz) {
      const frase = new SpeechSynthesisUtterance(texto);
      frase.lang = 'es-ES';
      if (voz.elegida) frase.voice = voz.elegida;
      frase.rate = 1;
      frase.onboundary = (e) => {
        if (e.name && e.name !== 'word') return;
        const t = performance.now();
        if (ultimoLimite && e.charIndex > ultimoLimite.indice) {
          const medido = (e.charIndex - ultimoLimite.indice) / ((t - ultimoLimite.t) / 1000);
          cps = 0.6 * cps + 0.4 * Math.max(8, Math.min(24, medido));
        }
        ultimoLimite = { indice: e.charIndex, t };
        indice = e.charIndex;
        pausaHasta = 0;
      };
      frase.onend = frase.onerror = () => {
        vivas.delete(frase);
        vozTerminada = true;
        indice = texto.length;
      };
      vivas.add(frase);
      if (ocupado) setTimeout(() => !terminado && synth.speak(frase), 80);
      else synth.speak(frase);
    }
    raf = requestAnimationFrame(paso);
  });
}
