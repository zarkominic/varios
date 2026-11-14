// VM-MINI-CHIBI · las miniaturas del ep25 con chibis (regla del 09/11/2026: personas chibi del reparto al doble, nada de
// mascotas ni objetos con cara; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (se recortan al centro, x 110–211).
//   0 · la sala de Yale de noche: el libro brilla en oro en su atril y la bibliotecaria, al doble, lo señala. «1404».
//   1 · la página de cerca con los signos en oro y una investigadora, al doble, que se asoma con la lupa. «1404».
//   2 · el ocular del microscopio con la mosca, y Newbold, al doble, que la señala sorprendido. «1921».
//   3 · la pantalla de la gráfica con un gran «no» rojo y un investigador, al doble, que se lleva las manos a la cabeza. «2019».
import { biblioteca, bibliotecaDelante, descifradores, descifradoresDelante, laboratorio, laboratorioDelante, PIEZAS_VM } from '/atomo/plato/escenas/vm-comun.js';
import { figura, grado, halo, cifra } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_CHIBI as EL } from '/atomo/plato/kits/pixel-chibi.js';
const ROJO = 0xff2a28e0 >>> 0;
const noRojo = (R, cx, cy, r) => {
  for (let a = 0; a < 260; a++) { const an = a / 260 * Math.PI * 2; for (let w = 0; w < 3; w++) R.pset(Math.round(cx + Math.cos(an) * (r - w)), Math.round(cy + Math.sin(an) * (r - w)), ROJO); }
  const d = r * 0.68; for (let w = -1; w <= 1; w++) R.linea(Math.round(cx - d + w), Math.round(cy - d), Math.round(cx + d + w), Math.round(cy + d), ROJO);
};
export function pintarVMchibi(R, t, n) {
  if (n === 0) {
    biblioteca(R, t, { encuadre: 'biblioteca', brilla: 1 });
    bibliotecaDelante(R, t, { encuadre: 'biblioteca', brilla: 1 });
    halo(R, 160, 116, 70, 46, '#ffd060', 0.45);                 // el libro que brilla en el atril
    for (let k = 0; k < 12; k++) { const an = -Math.PI / 2 + (k - 5.5) * 0.22; R.linea(160, 112, Math.round(160 + Math.cos(an) * 44), Math.round(112 + Math.sin(an) * 44), 0xff90e0ff >>> 0); }
    grado(R, { tinte: '#2a1a08', f: 0.15, desde: 0.7, max: 0.55 });
    halo(R, 92, 130, 50, 56, '#ffb85a', 0.25);
    figura(R, EL.bibliotecaria, 92, 178, t, { dir: 1, sorpresa: true, dedo: true }, 2);
    cifra(R, '1404', 60, 24, 20);
  } else if (n === 1) {
    biblioteca(R, t, { encuadre: 'pagina', pagina: 'planta', brilla: 1 });
    grado(R, { cx: 160, tinte: '#2a1a08', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 150, 140, 50, 50, '#ffe0a0', 0.25);
    figura(R, EL.investigadoraIA, 146, 190, t, { dir: 1, sorpresa: true, sostiene: true, cosa: (R2, m) => PIEZAS_VM.lupa(R2, m[0] + 4, m[1] + 2) }, 2);
    cifra(R, '1404', 160, 12, 14);
  } else if (n === 2) {
    descifradores(R, t, { encuadre: 'filadelfia', camara: 'ocular', mosca: 0.6 });
    grado(R, { cx: 160, tinte: '#1a1408', f: 0.1, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 150, 150, 46, 40, '#ffe0a0', 0.25);
    figura(R, EL.newbold, 146, 192, t, { dir: 1, sorpresa: true, dedo: true }, 2);
    cifra(R, '1921', 160, 12, 14);
  } else {
    laboratorio(R, t, { encuadre: 'ordenadores', camara: 'grafica', baila: 0.5 });
    laboratorioDelante(R, t, { encuadre: 'ordenadores', camara: 'grafica', baila: 0.5 });
    noRojo(R, 160, 76, 34);
    grado(R, { cx: 160, tinte: '#0a1a3a', f: 0.15, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 150, 46, 40, '#a8d0ff', 0.2);
    figura(R, EL.investigadorIA, 160, 192, t, { dir: -1, brazos: 'arriba', sorpresa: true }, 2);
    cifra(R, '2019', 160, 12, 14);
  }
}
