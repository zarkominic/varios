// NC-MINI-CHIBI · las miniaturas del ep28 con chibis (regla del 09/11/2026: personas chibi del reparto al doble, nada de
// mascotas ni objetos con cara; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
// DERECHOS: ningún logotipo ni letra de Coca-Cola o Pepsi, ni onda blanca, ni disco rojo, ni botella de contorno: latas
// lisas rojas y azules.
//   0 · Seattle, 1985: Mullins, al doble, con su pancarta de la lata tachada bajo la lluvia, y la protesta detrás. «1985».
//   1 · la cámara acorazada se abre y Candler, al doble, mira el papelito con la fórmula. «1886».
//   2 · la centralita: una operadora, al doble, con los teléfonos que saltan. «1985».
//   3 · el escáner: el investigador, al doble, señala el cerebro que se ilumina con la lata roja. «2004».
import { atlanta, atlantaDelante, rebelion, rebelionDelante, hoy, hoyDelante, PIEZAS_NC } from '/atomo/plato/escenas/nc-comun.js';
import { figura, grado, halo, cifra } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_NC as EL } from '/atomo/plato/kits/pixel-chibi.js';
export function pintarNCchibi(R, t, n) {
  if (n === 0) {
    rebelion(R, t, { encuadre: 'calle' });
    rebelionDelante(R, t, { encuadre: 'calle' });
    grado(R, { tinte: '#2a3a5a', f: 0.15, desde: 0.72, max: 0.5 });
    halo(R, 200, 120, 60, 60, '#ffe0b0', 0.25);
    figura(R, EL.manifestante2, 250, 168, t, { dir: -1, sorpresa: true }, 1);
    figura(R, EL.mullins, 196, 180, t, { dir: -1, sorpresa: true, dedo: true }, 2);
    PIEZAS_NC.pancarta(R, 150, 176, { dibujo: 'lata', s: 2 });
    cifra(R, '1985', 60, 26, 20);
  } else if (n === 1) {
    atlanta(R, t, { encuadre: 'banco', abre: 1, papelito: true, guardia: false, vacia: true });
    atlantaDelante(R, t, { encuadre: 'banco', abre: 1, vacia: true });
    grado(R, { cx: 160, tinte: '#2a1a08', f: 0.15, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 100, 50, 50, '#ffe0a0', 0.3);
    figura(R, EL.candler, 140, 186, t, { dir: 1, sorpresa: true }, 2);
    cifra(R, '1886', 160, 12, 14);
  } else if (n === 2) {
    rebelion(R, t, { encuadre: 'centralita' });
    rebelionDelante(R, t, { encuadre: 'centralita' });
    grado(R, { cx: 160, tinte: '#3a1a1a', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 140, 46, 50, '#ffd0a0', 0.25);
    figura(R, EL.operadora, 160, 188, t, { dir: 1, sorpresa: true, brazos: 'arriba' }, 2);
    PIEZAS_NC.telefono(R, 128, 120, { suena: true, t, s: 2 });
    PIEZAS_NC.telefono(R, 196, 112, { suena: true, t: t + 0.3, s: 2 });
    cifra(R, '1985', 160, 12, 14);
  } else {
    hoy(R, t, { encuadre: 'escaner', camara: 'pantalla' });
    hoyDelante(R, t, { encuadre: 'escaner', camara: 'pantalla' });
    grado(R, { cx: 160, tinte: '#0a1a3a', f: 0.12, rx: 120, desde: 0.75, max: 0.5 });
    halo(R, 160, 150, 46, 40, '#a8d0ff', 0.2);
    figura(R, EL.investigador, 150, 190, t, { dir: 1, sorpresa: true, dedo: true }, 2);
    PIEZAS_NC.lata(R, 196, 176, { color: 'rojo', s: 2 });
    cifra(R, '2004', 160, 12, 14);
  }
}
