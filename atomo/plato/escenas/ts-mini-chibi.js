// TS-MINI-CHIBI · las miniaturas del ep27 con chibis (regla del 09/11/2026: personas chibi del reparto al doble, nada de
// mascotas ni objetos con cara; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
// DERECHOS: nada del juego Tetris tal cual (solo corchetes verdes de texto), nada con forma de Game Boy, sin logos.
//   0 · Moscú, febrero de 1989: la Plaza Roja nevada de noche; Rogers, al doble, con abrigo y gorro de piel, levanta el
//       cartucho genérico; detrás, el guardia lo mira con desconfianza. «1989».
//   1 · el terminal de 1984 con los corchetes verdes y Pázhitnov, al doble, que se ha quedado jugando. «1984».
//   2 · la sala de Elorg: Bélikov, al doble, frunce el ceño ante el cartucho sobre la mesa. «1989».
//   3 · el salón de 2023: Gibson, al doble, con los cascos, grita de alegría con los brazos arriba. «2023».
import { centro, centroDelante, moscu, moscuDelante, hoy, hoyDelante, PIEZAS_TS } from '/atomo/plato/escenas/ts-comun.js';
import { figura, grado, halo, cifra, desplazar } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_TS as EL } from '/atomo/plato/kits/pixel-chibi.js';
export function pintarTSchibi(R, t, n) {
  if (n === 0) {
    moscu(R, t, { encuadre: 'plaza' });
    moscuDelante(R, t, { encuadre: 'plaza' });
    grado(R, { tinte: '#1a2a5a', f: 0.18, desde: 0.72, max: 0.5 });
    halo(R, 214, 120, 60, 60, '#ffd890', 0.25);
    figura(R, EL.guardia, 262, 170, t, { dir: -1, sorpresa: true }, 1);
    figura(R, EL.rogersAbrigo, 210, 178, t, { dir: -1, sonrisa: true, sostiene: true, cosa: (R2, m) => PIEZAS_TS.cartucho(R2, m[0], m[1] + 3, { color: 'rojo' }) }, 2);
    cifra(R, '1989', 60, 26, 20);
  } else if (n === 1) {
    centro(R, t, { encuadre: 'centro', camara: 'terminal' });
    centroDelante(R, t, { encuadre: 'centro', camara: 'terminal', fila: 0.4 });
    desplazar(R, 72);                                      // el terminal, al centro del recorte vertical
    grado(R, { cx: 160, tinte: '#0a2a14', f: 0.15, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 150, 50, 40, '#8affb0', 0.2);
    figura(R, EL.pazhitnov, 168, 184, t, { dir: -1, sorpresa: true, dedo: true }, 2);
    cifra(R, '1984', 160, 12, 14);
  } else if (n === 2) {
    moscu(R, t, { encuadre: 'elorg', camara: 'mesa' });
    moscuDelante(R, t, { encuadre: 'elorg', camara: 'mesa' });
    grado(R, { cx: 160, tinte: '#2a1a0a', f: 0.15, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 140, 40, 30, '#ffe0a0', 0.3);
    figura(R, EL.belikov, 160, 118, t, { dir: 1 }, 2);
    PIEZAS_TS.cartucho(R, 160, 172, { color: 'rojo', s: 2 });
    cifra(R, '1989', 160, 12, 14);
  } else {
    hoy(R, t, { encuadre: 'salon23' });
    hoyDelante(R, t, { encuadre: 'salon23' });
    grado(R, { cx: 160, tinte: '#2a0a3a', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 140, 50, 50, '#ffd0ff', 0.2);
    figura(R, EL.gibson, 160, 186, t, { dir: 1, sorpresa: true, brazos: 'arriba' }, 2);
    cifra(R, '2023', 160, 12, 14);
  }
}
