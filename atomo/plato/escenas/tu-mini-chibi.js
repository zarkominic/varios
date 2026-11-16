// TU-MINI-CHIBI · las miniaturas del ep36 con chibis (personas chibi del reparto, nada de mascotas ni objetos con cara;
// la momia no se ve nunca; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
//   0 · LA PARED NORTE PINTADA de la cámara (NUESTRAS pinturas) con el contorno recto de la puerta escondida que asoma
//       bajo la pintura, con un halo frío; Carter, al triple, con cara de sorpresa; un «?» grande en la puerta.
//   1 · Short 1 (las rayas bajo la pintura): la misma pared, con la puerta escondida en el centro; Reeves al doble la señala.
//   2 · Short 2 (cosas maravillosas): el pasillo de 1922 a la luz de la vela ante la segunda puerta; Carter al doble.
//   3 · Short 3 (pesar la montaña): la ladera con el gravímetro en su trípode; Eldamaty al doble y el año 2026.
import { tumba, tumbaDelante, ladera, laderaDelante } from '/atomo/plato/escenas/tu-comun.js';
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
    figura(R, EL.carterTU, 64, 188, t, { dir: 1, sorpresa: true }, 3);
    cifra(R, '?', 187, 100, 34);
  } else if (n === 1) {
    const o = { encuadre: 'pintada', camara: 'pared', raya: 1, luzRasante: 0.5, rectangulos: 1 };
    tumba(R, t, o);
    desplazar(R, -27);
    grado(R, { cx: 160, tinte: '#140a04', f: 0.12, rx: 120, desde: 0.72, max: 0.55 });
    halo(R, 160, 100, 44, 60, '#9ad0ff', 0.3);
    halo(R, 136, 134, 30, 44, '#ffd890', 0.35);
    figura(R, EL.reevesTU, 134, 178, t, { dir: 1, sonrisa: true }, 2);
    cifra(R, '?', 172, 56, 30);
  } else if (n === 2) {
    const o = { encuadre: 'pasillo', vela: 1 };
    tumba(R, t, o); tumbaDelante(R, t, o);
    desplazar(R, -72);   // la segunda puerta, con sus sellos, entra en la columna del Short
    grado(R, { cx: 160, tinte: '#1a0c02', f: 0.12, rx: 120, desde: 0.72, max: 0.6 });
    halo(R, 136, 128, 40, 56, '#ffcc70', 0.42);
    figura(R, EL.carterTU, 132, 178, t, { dir: 1, sorpresa: true }, 2);
    cifra(R, '1922', 160, 30, 16);
  } else if (n === 3) {
    const o = { encuadre: 'gravimetro' };
    ladera(R, t, o); laderaDelante(R, t, o);
    grado(R, { cx: 160, tinte: '#1a1004', f: 0.1, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 180, 132, 44, 52, '#fff0c0', 0.32);
    figura(R, EL.eldamatyTU, 178, 178, t, { dir: -1, sonrisa: true }, 2);
    cifra(R, '2026', 160, 30, 16);
  }
}
