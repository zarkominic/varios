// NX-MINI-CHIBI · las miniaturas del ep34 con chibis (personas chibi del reparto al doble, nada de mascotas ni objetos
// con cara; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
//   0 · La roca con forma de barco al atardecer, con el Ararat nevado: el capitán Durupınar, al doble, con su foto aérea;
//       y un «?» grande sobre el cielo oscuro.
//   1 · A pie de la forma, hoy: el geólogo Collins, al doble, con su duda. «?».
//   2 · La sala del Museo Británico: George Smith, al doble, con la tablilla en la mano. «1872».
//   3 · El sondeo en corte: el arqueólogo del equipo, al doble, delante del corte, señalando la perforadora. «2026».
import { ladera, laderaDelante, museo, museoDelante } from '/atomo/plato/escenas/nx-comun.js';
import { figura, grado, halo, cifra, desplazar } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_CHIBI as EL, PIEZAS_NX as P } from '/atomo/plato/kits/pixel-chibi.js';
export function pintarNXchibi(R, t, n) {
  if (n === 0) {
    const o = { encuadre: 'ladera', epoca: 1959, hora: 'tarde' };
    ladera(R, t, o);
    grado(R, { tinte: '#1a0820', f: 0.12, desde: 0.7, max: 0.55 });
    halo(R, 262, 118, 54, 60, '#ffe2a0', 0.4);
    laderaDelante(R, t, o);
    figura(R, EL.durupinar, 250, 172, t, { dir: -1, sorpresa: true }, 2);
    cifra(R, '?', 44, 58, 44);
  } else if (n === 1) {
    const o = { encuadre: 'ladera', camara: 'cerca', epoca: 2026, hora: 'tarde', gente: false };
    ladera(R, t, o);
    grado(R, { cx: 160, tinte: '#1a0820', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 132, 46, 54, '#ffe2a0', 0.3);
    laderaDelante(R, t, o);
    figura(R, EL.collins, 160, 176, t, { dir: 1, sorpresa: true }, 2);
    cifra(R, '?', 160, 44, 30);
  } else if (n === 2) {
    const o = { encuadre: 'sala' };
    museo(R, t, o);
    museoDelante(R, t, o);
    grado(R, { cx: 160, tinte: '#1a2a1a', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 136, 46, 52, '#ffe0b0', 0.28);
    figura(R, EL.smith, 156, 176, t, { dir: 1, sorpresa: true, sostiene: true, cosa: (R2, m) => P.fragmento(R2, m[0] + 2, m[1] - 6) }, 2);
    cifra(R, '1872', 160, 12, 14);
  } else if (n === 3) {
    const o = { encuadre: 'corte', camara: 'sondeo', fondo: 0.45 };
    ladera(R, t, o);
    laderaDelante(R, t, o);
    desplazar(R, -24);
    grado(R, { cx: 160, tinte: '#0a1a2a', f: 0.1, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 136, 136, 44, 50, '#ffe2a0', 0.3);
    figura(R, EL.arqueologoNX, 136, 176, t, { dir: 1, sorpresa: true }, 2);
    cifra(R, '2026', 150, 10, 14);
  }
}
