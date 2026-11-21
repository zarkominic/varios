// TE-MINI-CHIBI · las miniaturas verticales de los Shorts del ep17 (hechos el 10/11/2026, a partir del vídeo montado),
// con chibis del reparto al doble, nada de mascotas ni objetos con cara, luz de cine. Lo importante va en la franja
// central (x 110–211), que es lo que queda al recortar a 9:16.
//   1 · las Rocosas: Forrest Fenn, al doble, con el cofre abierto que brilla. «2010».
//   2 · París de noche, 1307: un templario, al doble, sorprendido, y otro templario detrás. «1307».
//   3 · la cueva de Qumrán: el arqueólogo, al doble, con el rollo de cobre que brilla. «1952».
import { temple, hoy, desierto, cofre, rollo } from '/atomo/plato/escenas/te-comun.js';
import { figura, grado, halo, cifra } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_CHIBI as EL } from '/atomo/plato/kits/pixel-chibi.js';
export function pintarTEchibi(R, t, n) {
  if (n === 1) {
    hoy(R, t, { encuadre: 'rocosas' });
    grado(R, { cx: 160, tinte: '#1a2a3a', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 150, 50, 40, '#ffd060', 0.35);
    figura(R, EL.fenn, 138, 174, t, { dir: 1, sorpresa: true }, 2);
    cofre(R, 182, 166, t, { abre: 1, brillo: 1, s: 1.6, k: 3 });
    cifra(R, '2010', 160, 12, 14);
  } else if (n === 2) {
    temple(R, t, { encuadre: 'calle', luz: 'noche' });
    grado(R, { cx: 160, tinte: '#0a1030', f: 0.15, rx: 110, desde: 0.72, max: 0.55 });
    halo(R, 160, 140, 46, 50, '#ffb060', 0.3);
    figura(R, EL.templario2, 196, 150, t, { dir: -1, sorpresa: true }, 1);
    figura(R, EL.templario, 146, 176, t, { dir: 1, sorpresa: true }, 2);
    cifra(R, '1307', 160, 12, 14);
  } else {
    desierto(R, t, { encuadre: 'qumran', camara: 'cueva' });
    grado(R, { cx: 160, tinte: '#2a1a08', f: 0.14, rx: 110, desde: 0.72, max: 0.55 });
    halo(R, 172, 150, 44, 40, '#ffc070', 0.35);
    figura(R, EL.arqueologo, 132, 176, t, { dir: 1, sorpresa: true }, 2);
    rollo(R, 184, 166, t, { s: 1.6 });
    cifra(R, '1952', 160, 12, 14);
  }
}
