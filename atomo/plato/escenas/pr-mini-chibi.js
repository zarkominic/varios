// PR-MINI-CHIBI · las miniaturas del ep29 con chibis (regla del 09/11/2026: personas chibi del reparto al doble, nada de
// mascotas ni objetos con cara; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
//   0 · el pergamino de 1513 con la costa del sur encendida en oro (la «Antártida») y Piri Reis, al doble, que la señala. «1513».
//   1 · la galera de Kemal Reis: Kemal, al doble, con la carta de Colón en la mano. «1501».
//   2 · el aula de Hapgood: Hapgood, al doble, con su copia del mapa. «1960».
//   3 · el taller de Galípoli: Piri Reis, al doble, en su mesa de dibujo. «1513».
import { pergamino, mar, marDelante, america, americaDelante, galipoli, galipoliDelante } from '/atomo/plato/escenas/pr-comun.js';
import { figura, grado, halo, cifra } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_CHIBI as EL, PIEZAS_PR as P } from '/atomo/plato/kits/pixel-chibi.js';
const lupa = (R2, m) => P.lupa(R2, m[0] + 3, m[1] - 6);
const carta = (R2, m) => P.carta(R2, m[0] - 4, m[1] - 8);
export function pintarPRchibi(R, t, n) {
  if (n === 0) {
    pergamino(R, t, { vista: 'sur', borde: true, ilumina: 'sur' });
    grado(R, { tinte: '#2a1a08', f: 0.14, desde: 0.72, max: 0.55 });
    halo(R, 70, 92, 80, 34, '#ffd060', 0.45);
    halo(R, 200, 100, 90, 30, '#ffd060', 0.35);
    halo(R, 236, 132, 44, 50, '#ffe0b0', 0.3);
    figura(R, EL.piri, 222, 168, t, { dir: -1, sorpresa: true, dedo: true }, 2);
    cifra(R, '1513', 60, 24, 20);
  } else if (n === 1) {
    mar(R, t, { encuadre: 'galera' });
    marDelante(R, t, { encuadre: 'galera' });
    grado(R, { cx: 160, tinte: '#1a2a3a', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 140, 46, 50, '#ffe0b0', 0.25);
    figura(R, EL.prisionero, 196, 156, t, { dir: -1 }, 1);
    figura(R, EL.kemal, 132, 176, t, { dir: 1, sorpresa: true, dedo: true }, 2);
    P.carta(R, 186, 160, { s: 1.4 });
    cifra(R, '1501', 160, 12, 14);
  } else if (n === 2) {
    america(R, t, { encuadre: 'aula' });
    americaDelante(R, t, { encuadre: 'aula' });
    grado(R, { cx: 160, tinte: '#2a1a0a', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 140, 46, 50, '#ffe0b0', 0.25);
    figura(R, EL.hapgood, 130, 176, t, { dir: 1, sorpresa: true, dedo: true }, 2);
    P.carta(R, 184, 150, { s: 1.4 });
    cifra(R, '1960', 160, 12, 14);
  } else {
    galipoli(R, t, { encuadre: 'taller' });
    galipoliDelante(R, t, { encuadre: 'taller' });
    grado(R, { cx: 160, tinte: '#2a1a08', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 140, 46, 50, '#ffd0a0', 0.25);
    figura(R, EL.piri, 140, 176, t, { dir: 1, sorpresa: true, sostiene: true, cosa: lupa }, 2);
    cifra(R, '1513', 160, 12, 14);
  }
}
