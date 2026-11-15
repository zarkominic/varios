// JM-MINI-CHIBI · las miniaturas del ep35 con chibis (personas chibi del reparto al doble, nada de mascotas ni objetos
// con cara; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
//   0 · NUESTRA selva de videojuego (el claro): Van Allsburg, al doble, con cara de sorpresa ante NUESTRO tablero abierto en el
//       camino; y un «?» grande sobre el dosel oscuro (la palabra que no significa nada).
import { selva, selvaDelante, taller, tallerDelante, keene, keeneDelante } from '/atomo/plato/escenas/jm-comun.js';
import { figura, grado, halo, cifra, desplazar } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_CHIBI as EL, PIEZAS_JM as P } from '/atomo/plato/kits/pixel-chibi.js';
export function pintarJMchibi(R, t, n) {
  if (n === 0) {
    const o = { encuadre: 'claro' };
    selva(R, t, o);
    selvaDelante(R, t, o);
    grado(R, { tinte: '#06180c', f: 0.14, desde: 0.62, max: 0.6 });
    halo(R, 118, 128, 62, 44, '#fff0b0', 0.45);
    P.tablero(R, 118, 168, { s: 2, abierto: true, t });
    P.dados(R, 182, 172, { s: 2 });
    halo(R, 254, 110, 50, 70, '#fff0b0', 0.35);
    figura(R, EL.vanallsburg, 254, 178, t, { dir: -1, sorpresa: true }, 3);
    cifra(R, '?', 200, 52, 40);
  } else if (n === 1) {
    // Short 1 · la selva: Van Allsburg al doble, en el centro, con el «?» encima
    const o = { encuadre: 'claro' };
    selva(R, t, o); selvaDelante(R, t, o);
    grado(R, { cx: 160, tinte: '#06180c', f: 0.14, rx: 120, desde: 0.72, max: 0.55 });
    halo(R, 160, 126, 46, 58, '#fff0b0', 0.4);
    figura(R, EL.vanallsburg, 160, 176, t, { dir: 1, sorpresa: true }, 2);
    cifra(R, '?', 160, 56, 38);
  } else if (n === 2) {
    // Short 2 · la casa de noche, donde dibujaba: Van Allsburg al doble, y el año del nombre
    const o = { encuadre: 'casa' };
    taller(R, t, o);
    desplazar(R, 34);
    grado(R, { cx: 160, tinte: '#0a0c24', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 130, 46, 56, '#ffe0a0', 0.38);
    figura(R, EL.vanallsburg, 160, 176, t, { dir: 1, sonrisa: true }, 2);
    cifra(R, '1981', 160, 30, 16);
  } else if (n === 3) {
    // Short 3 · la pared de Keene con el letrero del zapato repintado: el pintor, al doble
    const o = { encuadre: 'pared', letrero: 1, buena: 1 };
    keene(R, t, o); keeneDelante(R, t, o);
    grado(R, { cx: 160, tinte: '#1a0a08', f: 0.1, rx: 120, desde: 0.78, max: 0.45 });
    halo(R, 160, 136, 44, 50, '#ffe2b0', 0.3);
    figura(R, EL.pintorJM, 160, 176, t, { dir: 1, sonrisa: true }, 2);
  }
}
