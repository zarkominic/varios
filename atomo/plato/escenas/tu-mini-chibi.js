// TU-MINI-CHIBI · las miniaturas del ep36 con chibis (personas chibi del reparto, nada de mascotas ni objetos con cara;
// la momia no se ve nunca; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
//   0 · LA PARED NORTE PINTADA de la cámara (NUESTRAS pinturas) con el contorno recto de la puerta escondida que asoma
//       bajo la pintura, con un halo frío; Carter, al triple, con cara de sorpresa; un «?» grande en la puerta.
import { tumba, tumbaDelante } from '/atomo/plato/escenas/tu-comun.js';
import { figura, grado, halo, cifra, desplazar } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_TU as EL, PIEZAS_TU as P } from '/atomo/plato/kits/pixel-chibi.js';
export function pintarTUchibi(R, t, n) {
  if (n === 0) {
    const o = { encuadre: 'pintada', camara: 'pared', raya: 1, luzRasante: 0.5, rectangulos: 1 };
    tumba(R, t, o);
    grado(R, { tinte: '#140a04', f: 0.12, desde: 0.55, max: 0.65 });
    // la puerta escondida (canon: x 150–224, y 52–148), como la ve el escáner: un contorno recto y frío bajo la pintura
    halo(R, 187, 100, 60, 66, '#9ad0ff', 0.32);
    const B = R.buf, az = [0xffffe0b0, 0xfff0c070];
    const linea = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (x >= 0 && x < 320 && y >= 0 && y < 180) B[y * 320 + x] = c; };
    for (const [d, c] of [[0, az[0]], [1, az[1]]]) { linea(150 - d, 52 - d, 224 + d, 52 - d, c); linea(150 - d, 52 - d, 150 - d, 148, c); linea(224 + d, 52 - d, 224 + d, 148, c); }
    linea(138, 46, 236, 47, az[1]);
    halo(R, 64, 124, 58, 66, '#ffd890', 0.42);
    figura(R, EL.carterTU, 64, 194, t, { dir: 1, sorpresa: true }, 3);
    cifra(R, '?', 187, 100, 34);
  }
}
