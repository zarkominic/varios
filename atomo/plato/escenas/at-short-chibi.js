// AT-SHORT-CHIBI · las miniaturas verticales de los Shorts del ep26 con chibis (regla del 09/11/2026: personas chibi del
// reparto al doble, nada de mascotas ni objetos con cara). Se recortan al centro (x 110–211) para 1080×1920.
//   1 · el entierro (1983): un chico del pueblo, al doble, ante el montón de cartuchos de la fosa, de noche.
//   2 · las cinco semanas (1982): Warshaw, al doble y agotado, ante el calendario gigante con el 1 de septiembre en rojo.
//   3 · la excavación (2014): la cuchara saca cartuchos de la tierra y una arqueóloga, al doble, lo señala sorprendida.
import { desierto, desiertoDelante, atari, atariDelante, PIEZAS_AT } from '/atomo/plato/escenas/at-comun.js';
import { figura, grado, halo, cifra } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_CHIBI as EL } from '/atomo/plato/kits/pixel-chibi.js';
export function pintarShortAT(R, t, n) {
  if (n === 1) {
    desierto(R, t, { encuadre: 'vertedero83', noche: true, camion: 0.55 });
    desiertoDelante(R, t, { encuadre: 'vertedero83', noche: true, camion: 0.55 });
    const COL = ['rojo', 'azul', 'amarillo', 'verde', 'naranja', 'morado'], ICO = ['foso', 'nave', 'flor'];
    let k = 0;
    for (let fila = 0; fila < 3; fila++) for (let i = 0; i < 7 - fila * 2; i++) {
      PIEZAS_AT.cartucho(R, 128 + fila * 12 + i * 13 + ((i * 7 + fila * 3) % 5), 150 - fila * 9 + ((i * 5) % 3), { color: COL[k % 6], icono: ICO[k % 3] }); k++;
    }
    PIEZAS_AT.cartucho(R, 176, 128, { color: 'rojo', icono: 'foso', s: 2 });
    grado(R, { cx: 160, tinte: '#1a2a5a', f: 0.2, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 150, 120, 50, 60, '#ffb85a', 0.3);
    figura(R, EL.chicoPueblo, 150, 178, t, { dir: 1, sorpresa: true, sostiene: true, cosa: (R2, m) => PIEZAS_AT.cartucho(R2, m[0] + 2, m[1] + 4, { color: 'azul', icono: 'nave' }) }, 2);
    cifra(R, '1983', 160, 12, 14);
  } else if (n === 2) {
    atari(R, t, { encuadre: 'oficinas', camara: 'calendario', mes: 8, dia: 31, marca: 1 });
    atariDelante(R, t, { encuadre: 'oficinas', camara: 'calendario', mes: 8, dia: 31, marca: 1 });
    grado(R, { cx: 160, tinte: '#2a1a3a', f: 0.15, rx: 120, desde: 0.75, max: 0.45 });
    halo(R, 170, 130, 46, 50, '#ffe0a0', 0.25);
    figura(R, EL.warshaw, 172, 178, t, { dir: -1, brazos: 'arriba' }, 2);
    cifra(R, '1982', 160, 12, 14);
  } else {
    desierto(R, t, { encuadre: 'excavacion14', camara: 'pala', saca: 0.85 });
    desiertoDelante(R, t, { encuadre: 'excavacion14', camara: 'pala', saca: 0.85 });
    PIEZAS_AT.cartucho(R, 170, 118, { color: 'rojo', icono: 'foso', s: 2 });
    grado(R, { cx: 160, tinte: '#3a2a10', f: 0.12, rx: 120, desde: 0.75, max: 0.45 });
    halo(R, 130, 130, 44, 50, '#ffffff', 0.2);
    figura(R, EL.arqueologa, 128, 178, t, { dir: 1, sorpresa: true, dedo: true }, 2);
    cifra(R, '2014', 160, 12, 14);
  }
}
