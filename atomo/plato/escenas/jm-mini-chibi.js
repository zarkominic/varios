// JM-MINI-CHIBI · las miniaturas del ep35 con chibis (personas chibi del reparto al doble, nada de mascotas ni objetos
// con cara; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
//   0 · NUESTRA selva de videojuego (el claro): Van Allsburg, al doble, con cara de sorpresa ante NUESTRO tablero abierto en el
//       camino; y un «?» grande sobre el dosel oscuro (la palabra que no significa nada).
import { selva, selvaDelante } from '/atomo/plato/escenas/jm-comun.js';
import { figura, grado, halo, cifra, desplazar } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_CHIBI as EL, PIEZAS_JM as P } from '/atomo/plato/kits/pixel-chibi.js';
export function pintarJMchibi(R, t, n) {
  if (n === 0) {
    const o = { encuadre: 'claro' };
    selva(R, t, o);
    selvaDelante(R, t, o);
    grado(R, { tinte: '#06180c', f: 0.14, desde: 0.62, max: 0.6 });
    halo(R, 236, 120, 58, 62, '#fff0b0', 0.42);
    halo(R, 150, 150, 40, 26, '#b8ffb0', 0.35);
    P.tablero(R, 150, 158, { s: 2, abierto: true });
    P.dados(R, 104, 166, { s: 2 });
    figura(R, EL.vanallsburg, 244, 176, t, { dir: -1, sorpresa: true }, 2);
    cifra(R, '?', 60, 62, 46);
  }
}
