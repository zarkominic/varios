// NX-MINI-CHIBI · las miniaturas del ep34 con chibis (personas chibi del reparto al doble, nada de mascotas ni objetos
// con cara; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
//   0 · La roca con forma de barco al atardecer, con el Ararat nevado: el capitán Durupınar, al doble, con su foto aérea;
//       y un «?» grande sobre el cielo oscuro.
import { ladera, laderaDelante } from '/atomo/plato/escenas/nx-comun.js';
import { figura, grado, halo, cifra } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_CHIBI as EL, PIEZAS_NX as P } from '/atomo/plato/kits/pixel-chibi.js';
export function pintarNXchibi(R, t, n) {
  if (n === 0) {
    const o = { encuadre: 'ladera', epoca: 1959, hora: 'tarde' };
    ladera(R, t, o);
    grado(R, { tinte: '#1a0820', f: 0.12, desde: 0.7, max: 0.55 });
    halo(R, 262, 118, 54, 60, '#ffe2a0', 0.4);
    laderaDelante(R, t, o);
    figura(R, EL.durupinar, 250, 172, t, { dir: -1, sorpresa: true }, 2);
    cifra(R, '?', 44, 58, 44);
  }
}
