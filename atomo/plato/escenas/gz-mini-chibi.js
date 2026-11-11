// GZ-MINI-CHIBI · las miniaturas del ep30 con chibis (regla del 09/11/2026: personas chibi del reparto al doble, nada de
// mascotas ni objetos con cara; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
//   0 · Giza al atardecer arriba y, bajo la arena, los pozos en espiral en plano azul («según ellos»); Biondi, al doble,
//       los mira. «650».
//   1 · los pozos en espiral de cerca, en plano azul; Biondi, al doble, en el centro. «650».
//   2 · la cara norte de Keops: el técnico, al doble, mete la cámara por la rendija. «2023».
//   3 · el laberinto: Heródoto, al doble, ante la escalera que baja a la oscuridad. «450».
import { giza, plano, keops, keopsDelante, hawara, hawaraDelante } from '/atomo/plato/escenas/gz-comun.js';
import { figura, grado, halo, cifra } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_CHIBI as EL } from '/atomo/plato/kits/pixel-chibi.js';
let arriba = null;
// pinta el decorado de arriba en su búfer y lo pega encima de lo que haya, hasta la fila y0 (con un borde de arena)
function pegarArriba(R, t, y0, pinta) {
  if (!arriba) arriba = R.nuevo();
  const prev = R.usar(arriba); pinta(); R.usar(prev);
  const B = R.buf;
  for (let y = 0; y < y0; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = arriba[y * 320 + x];
}
export function pintarGZchibi(R, t, n) {
  if (n === 0) {
    plano(R, t, { encuadre: 'corte', camara: 'pozos', baja: 0.6 });
    pegarArriba(R, t, 112, () => giza(R, t, { encuadre: 'meseta', hora: 'atardecer' }));
    for (let x = 0; x < 320; x++) { R.pset(x, 112, R.PAL.ORO ? R.PAL.ORO[1] : 0xffd060); }
    grado(R, { tinte: '#0a1430', f: 0.12, desde: 0.75, max: 0.5 });
    halo(R, 160, 150, 150, 30, '#5ae0f0', 0.35);
    halo(R, 150, 40, 60, 40, '#ffd060', 0.25);
    figura(R, EL.biondi, 252, 178, t, { dir: -1, sorpresa: true }, 2);
    cifra(R, '650', 60, 150, 20);
  } else if (n === 1) {
    plano(R, t, { encuadre: 'corte', camara: 'pozos', baja: 0.4 });
    grado(R, { cx: 160, tinte: '#0a1430', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 140, 46, 50, '#5ae0f0', 0.3);
    figura(R, EL.biondi, 160, 176, t, { dir: 1, sorpresa: true }, 2);
    cifra(R, '650', 160, 12, 14);
  } else if (n === 2) {
    keops(R, t, { encuadre: 'norte', entra: 0.8 });
    keopsDelante(R, t, { encuadre: 'norte', entra: 0.8 });
    grado(R, { cx: 160, tinte: '#2a1a08', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 140, 46, 50, '#ffe0b0', 0.25);
    figura(R, EL.tecnicoEgipcio, 160, 176, t, { dir: -1, sorpresa: true }, 2);
    cifra(R, '2023', 160, 12, 14);
  } else {
    hawara(R, t, { encuadre: 'escalera' });
    hawaraDelante(R, t, { encuadre: 'escalera' });
    grado(R, { cx: 160, tinte: '#2a1a08', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 140, 46, 50, '#ffd0a0', 0.25);
    figura(R, EL.herodoto, 150, 176, t, { dir: 1, sorpresa: true }, 2);
    cifra(R, '450', 160, 12, 14);
  }
}
