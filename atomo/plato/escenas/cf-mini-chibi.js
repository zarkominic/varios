// CF-MINI-CHIBI · las miniaturas del ep32 con chibis (regla del 09/11/2026: personas chibi del reparto al doble, nada de
// mascotas ni objetos con cara; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
//   0 · Grant Park en corte: Preiss, al doble, en el hoyo con su pala; debajo, enterrado, el cofrecito que brilla. «1982».
//   1 · Short 1: de noche, en el parque del fuerte, Preiss al doble con su pala de casi dos metros y el cofrecito a sus pies.
//   2 · Short 2: Grant Park de día, en corte: el chaval al doble en el hoyo, con el cofrecito y la esmeralda que brilla.
//   3 · Short 3: el parque de Boston en obras, en corte: Krupat al doble, boquiabierto, y la cuchara de la excavadora.
import { chicago, chicagoDelante, cleveland, clevelandDelante, boston, bostonDelante, editorial, editorialDelante, hoy, hoyDelante, b_gema } from '/atomo/plato/escenas/cf-comun.js';
import { figura, grado, halo, cifra, desplazar } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_CHIBI as EL, PIEZAS_CF as P } from '/atomo/plato/kits/pixel-chibi.js';
export function pintarCFchibi(R, t, n) {
  if (n === 0) {
    const o = { encuadre: 'parque', camara: 'hoyo', caja: 0, hora: 'tarde' };
    chicago(R, t, o);
    grado(R, { tinte: '#0a1020', f: 0.14, desde: 0.72, max: 0.55 });
    halo(R, 156, 164, 92, 34, '#ffd060', 0.72);
    halo(R, 156, 166, 40, 22, '#fff4c0', 0.6);
    P.cofre(R, 156, 176, { s: 2 });
    for (const [x, y] of [[118, 150], [196, 146], [128, 168], [190, 170]]) for (const [i, j, c] of [[0, 0, 0xffc0f4ff], [-1, 0, 0xff60d0ff], [1, 0, 0xff60d0ff], [0, -1, 0xff60d0ff], [0, 1, 0xff60d0ff]]) R.pset(x + i, y + j, c);
    halo(R, 156, 90, 46, 40, '#ffe0b0', 0.18);
    chicagoDelante(R, t, o);
    P.pala(R, 186, 123, { larga: true, s: 2 });
    figura(R, EL.preiss, 154, 123, t, { dir: 1, sorpresa: true }, 2);
    cifra(R, '1982', 262, 160, 20);
  }
  if (n === 1) {
    const o = { encuadre: 'parque', noche: true };
    hoy(R, t, o);
    grado(R, { tinte: '#060a1c', f: 0.16, desde: 0.6, max: 0.6 });
    halo(R, 160, 120, 64, 70, '#ffe6a8', 0.3);
    halo(R, 190, 150, 30, 18, '#ffd060', 0.7);
    P.cofre(R, 190, 160, { s: 2 });
    P.pala(R, 121, 160, { larga: true, s: 2 });
    figura(R, EL.preiss, 140, 160, t, { dir: 1, sonrisa: true }, 2);
    hoyDelante(R, t, o);
  }
  if (n === 2) {
    const o = { encuadre: 'parque', camara: 'hoyo', caja: 0, hora: 'dia' };
    chicago(R, t, o);
    grado(R, { tinte: '#0a1020', f: 0.1, desde: 0.74, max: 0.5 });
    halo(R, 160, 60, 50, 44, '#b8ffc8', 0.5);
    chicagoDelante(R, t, o);
    P.pala(R, 116, 123, { s: 2 });
    figura(R, EL.chico1CF, 134, 123, t, { dir: 1, sorpresa: true }, 2);
    halo(R, 186, 110, 30, 20, '#ffd060', 0.55);
    P.cofre(R, 186, 123, { s: 2 });
    b_gema(R, 186, 64, '#3cc858', 1, 7);
  }
  if (n === 3) {
    const o = { encuadre: 'obras', camara: 'hoyo', trozos: 1, hondo: 1 };
    boston(R, t, o);
    grado(R, { tinte: '#0a1020', f: 0.1, desde: 0.72, max: 0.5 });
    halo(R, 176, 150, 50, 24, '#ffd060', 0.55);
    P.excavadora(R, 222, 126, { dir: -1, s: 2, cuchara: 0.25 });
    figura(R, EL.krupat, 128, 126, t, { dir: 1, sorpresa: true }, 2);
    bostonDelante(R, t, o);
  }
}
