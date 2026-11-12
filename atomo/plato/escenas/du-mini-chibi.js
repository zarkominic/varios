// DU-MINI-CHIBI · las miniaturas del ep33 con chibis (personas chibi del reparto al doble, nada de mascotas ni objetos
// con cara; luz de cine). n = 0: la principal (16:9); 1–3: los Shorts (recorte al centro, x 110–211).
//   1 · Short 1: el pasillo de las editoriales, Herbert al doble y triste, con su manuscrito atado.
//   2 · Short 2: la oficina de Chilton, Lanier al doble y sonriente, con nuestro libro.
//   3 · Short 3: la oficina de París, Jodorowsky al doble, con el guion del tamaño de un listín.
//   0 · Nuestro planeta al ocaso, con sus dos lunas: Herbert, al doble, con el manuscrito rechazado; «20» y una X roja.
import { planeta, planetaDelante, oregon, oregonDelante, editoriales, editorialesDelante, cine, cineDelante, salas, salasDelante } from '/atomo/plato/escenas/du-comun.js';
import { figura, grado, halo, cifra } from '/atomo/plato/escenas/mini-chibi.js';
import { ELENCO_CHIBI as EL, PIEZAS_DU as P } from '/atomo/plato/kits/pixel-chibi.js';
const ROJO = 0xff2828d8, ROJO2 = 0xff101080;
function equis(R, cx, cy, r, g) {
  for (let i = -r; i <= r; i++) for (let k = -g; k <= g; k++) {
    for (const [x, y] of [[cx + i + k, cy + i], [cx + i + k, cy - i]]) { R.pset(x + 1, y + 1, ROJO2); }
  }
  for (let i = -r; i <= r; i++) for (let k = -g; k <= g; k++) { R.pset(cx + i + k, cy + i, ROJO); R.pset(cx + i + k, cy - i, ROJO); }
}
export function pintarDUchibi(R, t, n) {
  if (n === 0) {
    const o = { encuadre: 'desierto', hora: 'ocaso', brillo: 0.6 };
    planeta(R, t, o);
    grado(R, { tinte: '#1a0820', f: 0.14, desde: 0.7, max: 0.55 });
    halo(R, 118, 112, 60, 62, '#ffe2a0', 0.42);
    planetaDelante(R, t, o);
    P.manuscrito(R, 152, 150, { s: 2 });
    figura(R, EL.herbert, 114, 150, t, { dir: 1, triste: true }, 2);
    cifra(R, '20', 42, 58, 36);
    equis(R, 88, 39, 11, 2);
  }
  if (n === 1) {
    const o = { encuadre: 'pasillo' };
    editoriales(R, t, o);
    grado(R, { tinte: '#141020', f: 0.14, desde: 0.6, max: 0.6 });
    halo(R, 160, 116, 60, 64, '#ffe8b0', 0.34);
    editorialesDelante(R, t, o);
    P.manuscrito(R, 186, 152, { s: 2 });
    figura(R, EL.herbert, 148, 152, t, { dir: 1, triste: true }, 2);
  }
  if (n === 2) {
    const o = { encuadre: 'chilton' };
    editoriales(R, t, o);
    grado(R, { tinte: '#141020', f: 0.12, desde: 0.6, max: 0.6 });
    halo(R, 160, 112, 60, 64, '#ffe8b0', 0.34);
    editorialesDelante(R, t, o);
    halo(R, 138, 118, 26, 26, '#ffd870', 0.5);
    P.libro(R, 138, 139, { s: 2 });
    figura(R, EL.lanier, 184, 160, t, { dir: -1, sonrisa: true }, 2);
  }
  if (n === 3) {
    const o = { encuadre: 'plato', camara: 'oficina', lugar: 'paris' };
    cine(R, t, o);
    grado(R, { tinte: '#141020', f: 0.12, desde: 0.6, max: 0.6 });
    halo(R, 160, 112, 60, 64, '#ffe8b0', 0.34);
    cineDelante(R, t, o);
    P.listin(R, 188, 152, { s: 2 });
    figura(R, EL.jodorowsky, 146, 152, t, { dir: 1, sonrisa: true }, 2);
  }
}
