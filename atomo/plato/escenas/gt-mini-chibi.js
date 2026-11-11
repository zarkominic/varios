// GT-MINI-CHIBI · las miniaturas del ep31 con chibis (regla del 09/11/2026: personas chibi del reparto al doble, nada de
// mascotas ni objetos con cara; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
//   0 · arriba, Dundee bajo la lluvia (el Tay, el puente y la colina); abajo, la ciudad de juguete vista
//       desde arriba con la persecución loca. Penn, al doble, la mira boquiabierto. «1995».
import { dundee, dundeeDelante, ciudad } from '/atomo/plato/escenas/gt-comun.js';
import { figura, grado, halo, cifra } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_CHIBI as EL, PIEZAS_GT as P } from '/atomo/plato/kits/pixel-chibi.js';
let arriba = null;
// pinta el decorado de arriba en su búfer y lo pega encima de lo que haya, hasta la fila y0
function pegarArriba(R, t, y0, pinta) {
  if (!arriba) arriba = R.nuevo();
  const prev = R.usar(arriba); pinta(); R.usar(prev);
  const B = R.buf;
  for (let y = 0; y < y0; y++) for (let x = 0; x < 320; x++) B[y * 320 + x] = arriba[y * 320 + x];
}
export function pintarGTchibi(R, t, n) {
  if (n === 0) {
    ciudad(R, t, { encuadre: 'arriba', persecucion: 0.95 });
    pegarArriba(R, t, 78, () => { const o = { encuadre: 'ciudad', año: 1990, lluvia: 0.6 };
      dundee(R, t, o); });
    for (let x = 0; x < 320; x++) { R.pset(x, 78, 0x2a2f3a); R.pset(x, 79, 0x1a1d26); }
    grado(R, { tinte: '#0a1020', f: 0.12, desde: 0.75, max: 0.5 });
    halo(R, 150, 128, 120, 34, '#ffe080', 0.2);
    halo(R, 150, 124, 60, 16, '#ff4060', 0.18);
    halo(R, 110, 50, 70, 30, '#ffd060', 0.18);
    // la persecución, al doble para que se lea en pequeño: el coche rojo huye por la avenida y dos policías detrás
    halo(R, 150, 126, 80, 18, '#ff3050', 0.22); halo(R, 96, 126, 50, 16, '#3070ff', 0.22);
    P.cocheJuguete(R, 196, 129, { color: '#e03030' });
    P.cochePolicia(R, 146, 129, { t: 0.1 });
    P.cochePolicia(R, 98, 130, { t: 0.3 });
    figura(R, EL.pennGT, 262, 178, t, { dir: -1, sorpresa: true }, 2);
    cifra(R, '1995', 58, 150, 20);
  }
}
