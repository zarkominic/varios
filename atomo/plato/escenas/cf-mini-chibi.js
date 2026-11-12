// CF-MINI-CHIBI · las miniaturas del ep32 con chibis (regla del 09/11/2026: personas chibi del reparto al doble, nada de
// mascotas ni objetos con cara; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
//   0 · Grant Park en corte: Preiss, al doble, en el hoyo con su pala; debajo, enterrado, el cofrecito que brilla. «1982».
import { chicago, chicagoDelante, cleveland, clevelandDelante, boston, bostonDelante, editorial, editorialDelante } from '/atomo/plato/escenas/cf-comun.js';
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
}
