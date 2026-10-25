// Fontanería y decorados del episodio 10 (ovnis) en el estilo canónico pixel chibi (episodios/GUIA-ESTILO.md).
// Seis decorados que se repiten: A el Pacífico (2004), B el monte Rainier (1947), C el rancho de Nuevo México, D Washington
// de noche (1952), E Nevada y la cabina al atardecer, F las oficinas. La fontanería (rodar, efectos, Atom arriba a la
// derecha) es la del episodio 9.
//
//   import { preparar, rodar, pacifico, tictac, caza } from '/atomo/plato/escenas/ov-comun.js';
//   const { E, R, M } = await preparar('ov-gancho');
//   rodar(E, R, [[0, (t) => pacifico(R, t, { hierve: 1 })]], { año: 2004 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { C as CAG, cielo, primerT, rodar as rodarAg } from '/atomo/plato/escenas/ag-comun.js';

export { primerT, cielo };
const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...CAG,
  ...pal({
    marH: '#8cbce0', marP3: '#3c80c8', marP2: '#2c68b0', marP1: '#1f5294', marP0: '#173f75', marS: '#1a4682', espuma: '#f4fbff', espumaS: '#bcd8ee',
    metal: '#9aa4b4', metalS: '#6c7688', metalL: '#c8d0dc', metalD: '#4a5262', vidrio: '#2e4a6a', vidrioL: '#8ac0e0', fuego: '#ffb040', fuegoL: '#fff0a0',
    tictac: '#f6f8fa', tictacS: '#c4cad4', tictacL: '#ffffff', sombraMar: '#1a3c6c',
  }),
};

const ATOM = [297, 24];
// Atom arriba a la derecha, grande y solo (GUIA-ESTILO.md)
function conAtomGrande(R) {
  R.companero = (t, e = 0) => {
    const x = ATOM[0], y = ATOM[1] + Math.round(1.4 * Math.sin(2 * Math.PI * t / 2.6)), r = 13 + 2.4 * e;
    for (let j = -16; j <= 16; j++) for (let i = -16; i <= 16; i++) { const g = 1 - Math.hypot(i, j) / r; if (g > 0.35) R.pset(x + i, y + j, g > 0.75 ? R.PAL.GLOW[1] : R.PAL.GLOW[0]); }
    R.atomo(x, y, t, { r: 10, orbita: R.PAL.ATOM[7], energia: e });
  };
  R.caja = () => {};
}

export async function preparar(id) {
  const E = await escena(id, 'ep10');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra de tiempo: el primer ovni (1947–1969), el silencio (1970–2016) y los archivos (2017–2026)
  R.tramosTiempo([[1947, 1969, R.PALA.AZUL, 'luna'], [1970, 2016, R.PALA.ORO, 'candado'], [2017, 2026, R.PALA.ROJO, 'satelite']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarAg;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };

// ── A · el Pacífico ──────────────────────────────────────────────────────────────────────────────────────────────────
// o.hor: línea del horizonte; o.cerca: plano cercano (olas más grandes); o.hierve (0–1) en o.centro [x, y];
// o.portaaviones y o.crucero: x en el horizonte (null, sin barco); o.delfines; o.nubes.
export function pacifico(R, t, o = {}) {
  const { rect, pset } = R, hor = o.hor ?? 74, cerca = !!o.cerca;
  cielo(R, t, { hor, aves: false, sol: o.sol ?? [236, 22, 8] });
  // en alta mar no hay playa: la franja baja del cielo es bruma azulada
  for (let y = Math.max(0, hor - 12); y < hor; y++) for (let x = 0; x < 320; x++) if (R.pget(x, y) === C.bruma) pset(x, y, y < hor - 4 ? C.cielo3 : C.marH);
  // gaviotas de alta mar, lejos
  if (o.gaviotas !== false) for (let k = 0; k < 3; k++) R.gaviota(Math.round(((k * 97 + t * (6 + k)) % 360) - 20), 18 + k * 9 + Math.round(Math.sin(t * 0.8 + k) * 2), t, k);
  // el mar en bandas: bruma en el horizonte y más hondo cuanto más cerca
  for (let y = hor; y < 180; y++) {
    const f = (y - hor) / (180 - hor);
    rect(0, y, 319, y, f < 0.03 ? C.marH : f < (cerca ? 0.1 : 0.14) ? C.marP3 : f < 0.45 ? C.marP2 : C.marP1);
  }
  // sombras de nubes que pasan sobre el agua
  for (let k = 0; k < 2; k++) {
    const cx = ((k * 190 + t * 5) % 520) - 100, cy = hor + 30 + k * 40, rx = 70, ry = 9 + k * 5;
    for (let y = Math.max(hor + 4, cy - ry); y < Math.min(180, cy + ry); y++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - ((y - cy) / ry) ** 2))); for (let x = Math.max(0, Math.round(cx - w)); x < Math.min(320, cx + w); x++) { const c = R.pget(x, y); if (c === C.marP1) pset(x, y, C.marS); else if (c === C.marP2) pset(x, y, C.marP1); } }
  }
  // el camino del sol: destellos que bailan bajo el sol, más anchos cuanto más cerca
  const sx = (o.sol ?? [236])[0];
  for (let y = hor + 1; y < 180; y += 2) {
    const f = (y - hor) / (180 - hor), w = 2 + f * 22;
    for (let k = 0; k < 2 + f * 5; k++) { const x = Math.round(sx + (h(k, y, Math.floor(t * 4)) - 0.5) * 2 * w); if (h(k, y, Math.floor(t * 6) + 9) < 0.55) { pset(x, y, C.blanco); if (f > 0.4) pset(x + 1, y, C.marL); } }
  }
  // olas en perspectiva: cada cresta con su largo, su altura y su sitio (nada de papel pintado), con su sombra debajo;
  // avanzan y crecen hacia delante, y algunas rompen en borreguitos
  const filas = cerca ? 12 : 16;
  for (let r = 0; r < filas; r++) {
    const f = (r + 1) / filas, y0 = hor + 3 + (180 - hor - 6) * f ** 1.6, paso = 10 + 34 * f, v = 2 + 9 * f;
    for (let k = -1; k < 340 / paso; k++) {
      const a = h(k, r, 1), b = h(k, r, 2);
      if (a < 0.22) continue;                                                  // huecos: no todas las crestas existen
      const xx = Math.round(k * paso + (b - 0.5) * paso * 0.8 + ((t * v + r * 17) % paso)) - paso;
      const w = Math.round((2 + (cerca ? 18 : 12) * f) * (0.55 + a * 0.7)), yy = Math.round(y0 + (b - 0.5) * 4 * f + Math.sin(t * 1.4 + k + r) * (f > 0.5 ? 1 : 0));
      const alto = 1 + Math.round(f * 2 * a);
      for (let i = 0; i < w; i++) { const yc = yy - Math.round(Math.sin((i / w) * Math.PI) * alto); pset(xx + i, yc, i < w * 0.65 ? C.marL : C.marP3); pset(xx + i, yc + 1, C.marP0); }
      if (f > 0.5 && h(k, r, Math.floor(t * 1.2 + a * 5)) < 0.16) { const bx = xx + Math.round(w / 2); R.rect(bx - 2, yy - alto - 1, bx + 2, yy - alto - 1, C.espuma); pset(bx - 1, yy - alto - 2, C.espuma); pset(bx + 1, yy - alto - 2, C.espumaS); }
    }
    // vetas oscuras entre crestas, en el agua lejana
    if (f < 0.5) for (let k = 0; k < 6; k++) { const x = Math.round((h(k, r, 3) * 360 + t * v * 0.5) % 340) - 10, yv = Math.round(y0 + 2); R.rect(x, yv, x + 3 + Math.round(h(k, r, 4) * 6), yv, C.marP1); }
  }
  // barcos en el horizonte, con su estela
  if (o.portaaviones != null) portaaviones(R, o.portaaviones, hor, t);
  if (o.crucero != null) crucero(R, o.crucero, hor, t);
  if (o.delfines) delfines(R, t, o.delfines);
  if (o.hierve) hervor(R, t, o.centro ?? [160, 128], o.hierve, cerca ? 1.9 : 1);
}

// el portaaviones de lado, lejos: la cubierta plana, la isla con su antena y aviones diminutos en cubierta
const PORTA = [
  '...............kk..........................',
  '...............kGk.........................',
  '..............kGLGk........................',
  '..............kGGGk........................',
  'kkkkkkkkkkkkkkkGGGkkkkkkkkkkkkkkkkkkkkkkkk.',
  'kLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLk',
  '.kGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGk.',
  '..kgggggggggggggggggggggggggggggggggggggk..',
  '...kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk...',
];
const CRUCERO = [
  '.......k.....',
  '......kLk....',
  '.....kGGGk...',
  '...kkGGGGGk..',
  '.kkGGGGGGGGkk',
  'kgggggggggggk',
  '.kkkkkkkkkkk.',
];
const BARCO_PAL = () => ({ k: C.metalD, G: C.metalS, L: C.metal, g: hex('#3e4656') });
export function portaaviones(R, x, hor, t) {
  const y = hor - PORTA.length + 2 + Math.round(Math.sin(t * 0.8) * 0.4);
  R.dibujo(PORTA, x, y, 1, BARCO_PAL());
  for (const dx of [6, 13, 30]) { R.pset(x + dx, y + 4, C.metalD); R.pset(x + dx + 1, y + 4, C.metalD); }   // aviones en cubierta
  for (let i = 0; i < 26; i++) if ((i + Math.floor(t * 4)) % 3) R.pset(x - i - 1, hor + 1 + (i > 12 ? 1 : 0), C.espuma);   // estela
  if (Math.sin(t * 3) > 0.6) R.pset(x + 16, y - 1, C.rojo);                                                                // la luz de la antena
}
export function crucero(R, x, hor, t) {
  const y = hor - CRUCERO.length + 2 + Math.round(Math.sin(t * 1.1 + 1) * 0.4);
  R.dibujo(CRUCERO, x, y, 1, BARCO_PAL());
  // el radar: un panel que destella cada vuelta
  if ((t % 2.4) < 0.25) { R.pset(x + 7, y + 2, C.oroL); R.pset(x + 8, y + 2, C.oroL); }
  for (let i = 0; i < 12; i++) if ((i + Math.floor(t * 4)) % 3) R.pset(x - i - 1, hor + 1, C.espuma);
}

// delfines que saltan en arco, de dos en dos
export function delfines(R, t, [x0, y0] = [90, 110]) {
  for (const [d, dx] of [[0, 0], [0.35, 12]]) {
    const u = ((t + d) % 4.5) / 1.1;
    if (u > 1) continue;
    const x = Math.round(x0 + dx + u * 22), y = Math.round(y0 - Math.sin(u * Math.PI) * 9), ang = Math.cos(u * Math.PI);
    R.rect(x - 3, y, x + 3, y + 1, C.k); R.rect(x - 2, y, x + 2, y, C.metalS); R.pset(x + 3, y - (ang > 0 ? 1 : -1), C.k); R.pset(x - 1, y - 1, C.k);
    if (u < 0.15 || u > 0.85) for (let i = -3; i <= 3; i += 2) R.pset(x + i, y0 + 2 - Math.abs(i % 3), C.espuma);
  }
}

// el agua que hierve: un círculo de espuma que se agita, anillos que se abren y una sombra enorme debajo
export function hervor(R, t, [cx, cy], p, s = 1) {
  const rx = Math.round(18 * s * Math.min(1, p * 1.3)), ry = Math.max(2, Math.round(rx * 0.28));
  if (rx < 2) return;
  // la sombra de algo grande bajo la superficie
  for (let y = -ry - 2; y <= ry + 2; y++) for (let x = -rx - 6; x <= rx + 6; x++) if ((x / (rx + 6)) ** 2 + (y / (ry + 2)) ** 2 < 1 && R.pget(cx + x, cy + y) !== C.blanco) R.pset(cx + x, cy + y, C.sombraMar);
  // espuma: cada fotograma cambia, como agua que bulle
  const k0 = Math.floor(t * 15);
  for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) {
    const d = (x / rx) ** 2 + (y / ry) ** 2;
    if (d > 1) continue;
    const v = h(x, y, k0);
    if (v < 0.55 * p + (1 - d) * 0.25) R.pset(cx + x, cy + y, v < 0.22 ? C.espumaS : C.espuma);
  }
  // salpicaduras que saltan
  for (let k = 0; k < 6 * p; k++) { const a = h(k, k0, 3) * Math.PI * 2, r = 0.5 + h(k, k0, 4) * 0.5; R.pset(Math.round(cx + Math.cos(a) * rx * r), Math.round(cy + Math.sin(a) * ry * r - 2 - h(k, k0, 5) * 4 * s), C.espuma); }
  // anillos que se abren
  for (let k = 0; k < 2; k++) {
    const u = ((t * 0.6 + k * 0.5) % 1), ax = rx * (1.1 + u * 0.9), ay = ry * (1.1 + u * 0.9);
    if (h(k, Math.floor(t * 0.6 + k * 0.5), 7) > p) continue;
    for (let a = 0; a < Math.PI * 2; a += 0.08) if (Math.sin(a * 7 + t) > 0) R.pset(Math.round(cx + Math.cos(a) * ax), Math.round(cy + Math.sin(a) * ay), u < 0.6 ? C.marL : C.marP3);
  }
}

// el Tic Tac: una cápsula blanca y lisa, sin alas ni ventanas, que flota con un vaivén muy leve
const TICTAC = [
  '....kkkkkkkkkkk....',
  '..kkLLLWWWWWWWWkk..',
  '.kWLLWWWWWWWWWWWWk.',
  'kWLWWWWWWWWWWWWWWWk',
  'kWWWWWWWWWWWWWWWWWk',
  'kwWWWWWWWWWWWWWWWwk',
  '.kwwWWWWWWWWWWWwwk.',
  '..kkwwwwwwwwwwwkk..',
  '....kkkkkkkkkkk....',
];
export function tictac(R, x, y, t, o = {}) {
  const yy = Math.round(y + Math.sin(t * 2.2) * 0.8);
  if (o.sombra != null) for (let i = -7; i <= 7; i++) if (h(i, 0, Math.floor(t * 8)) < 0.85) R.pset(Math.round(x + i), o.sombra, C.sombraMar);
  R.dibujo(TICTAC, Math.round(x - 9), yy - 4, 1, { k: C.k, W: C.tictac, w: C.tictacS, L: C.tictacL });
}

// un F/A-18 de lado, en vuelo nivelado o en picado, con la llama de la tobera que parpadea
const CAZA = [
  '..kk......................',
  '..kgk.....................',
  '..kggk.........kkk........',
  '..kgggkkkkkkkkkVVvkk......',
  '.kgGGGGGGGGGGGGGGGGGkkk...',
  'kFgGGGLLLLLLLLLLLLLLGGGkkk',
  '.kgggggggggggggggggggggggk',
  '..kkkkkkkgggkkkkkkkkkkkk..',
  '.........kkk..............',
];
const CAZA_PICADO = [
  'kk......................',
  'kgk.....................',
  'kggk....................',
  '.kggkk..................',
  '.kgGGGkkk...............',
  '..kgGGGGGkkk............',
  '..FgGLLLGGGGkkkk........',
  '...kggLLLLLGGGVvkk......',
  '....kkgggLLLLLGGGGkk....',
  '......kkkgggggLLLGGGkk..',
  '.........kkkkgggggggGGk.',
  '..............kkkkkkkkk.',
];
export function caza(R, x, y, t, o = {}) {
  const g = o.picado ? CAZA_PICADO : CAZA, dir = o.dir ?? 1, fuego = Math.sin(t * 40) > 0 ? C.fuegoL : C.fuego;
  const w = g[0].length;
  R.dibujo(g, Math.round(x - w / 2), Math.round(y - g.length / 2), dir, { k: C.k, g: C.metalS, G: C.metal, L: C.metalL, V: C.vidrioL, v: C.vidrio, F: fuego });
  // estela de aire caliente detrás
  const cola = dir > 0 ? x - w / 2 - 1 : x + w / 2 + 1;
  for (let i = 1; i < 10; i++) if ((i + Math.floor(t * 20)) % 3 === 0) R.pset(Math.round(cola - dir * i), Math.round(y + (o.picado ? -2 - i * 0.5 : 0)), C.blanco);
}

// plano medio de un caza de perfil, en vuelo sobre el mar: el piloto, pequeño, asoma en la cúpula (nunca primer plano).
// o.quien: personaje (EL.fravor); o.sorpresa; o.hierve: el agua que hierve abajo, a lo lejos
export function cazaCerca(R, t, o = {}) {
  const { rect, pset, poligono } = R, cx = 150, cy = 84 + Math.round(Math.sin(t * 1.3) * 2);
  pacifico(R, t * 3, { hor: 104, portaaviones: null, crucero: null, gaviotas: false, hierve: o.hierve, centro: [250, 150], sol: [60, 24, 8] });
  for (let k = 0; k < 14; k++) { const y = 8 + Math.round(h(k, 7, 0) * 90), x = Math.round((((h(k, 8, 0) * 420) - t * 160) % 420 + 420) % 420) - 50; rect(x, y, x + 10 + Math.round(h(k, 9, 0) * 14), y, C.cielo3); }
  // el piloto, dentro: el fuselaje le tapa de los hombros para abajo
  R.actor(o.quien, cx + 22, cy + 3, t, { sorpresa: o.sorpresa, quieto: true });
  const X = (u) => cx + u, Y = (v) => cy + v, borde = (pts, c) => { poligono(pts.map(([x, y]) => [x + 1, y + 1]), C.k); poligono(pts.map(([x, y]) => [x - 1, y - 1]), C.k); poligono(pts, c); };
  borde([[X(-80), Y(5)], [X(-56), Y(5)], [X(-70), Y(13)], [X(-92), Y(13)]], C.metalS);                             // estabilizador
  borde([[X(-36), Y(5)], [X(14), Y(5)], [X(-26), Y(18)], [X(-60), Y(18)]], C.metalS);                              // ala
  borde([[X(-80), Y(-6)], [X(36), Y(-8)], [X(66), Y(-4)], [X(88), Y(1)], [X(66), Y(5)], [X(30), Y(9)], [X(-80), Y(9)]], C.metal);   // fuselaje
  rect(X(-78), Y(6), X(60), Y(8), C.metalS); rect(X(-70), Y(-5), X(34), Y(-5), C.metalL);
  borde([[X(-8), Y(8)], [X(24), Y(8)], [X(20), Y(14)], [X(-6), Y(14)]], C.metalS);                                 // toma de aire
  borde([[X(-80), Y(-6)], [X(-58), Y(-6)], [X(-68), Y(-32)], [X(-82), Y(-32)]], C.metal);                          // deriva
  rect(X(-80), Y(-30), X(-70), Y(-28), C.metalS);
  rect(X(-90), Y(-3), X(-81), Y(6), C.metalD); rect(X(-92), Y(-1), X(-91), Y(4), Math.sin(t * 40) > 0 ? C.fuegoL : C.fuego);   // tobera
  R.disco(X(4), Y(1), 3, C.azul); pset(X(4), Y(1), C.blanco); pset(X(3), Y(1), C.blanco); pset(X(5), Y(1), C.blanco);         // escarapela
  for (const u of [-50, -30, 40]) pset(X(u), Y(2), C.metalD);
  // la cúpula de cristal: marco y reflejos por encima del piloto
  for (let a = 0; a <= Math.PI; a += 0.01) { const x = Math.round(X(22) - Math.cos(a) * 20), y = Math.round(Y(-7) - Math.sin(a) * 12); pset(x, y, C.k); pset(x, y + 1, C.metalD); }
  for (let i = 0; i < 9; i++) { pset(X(26) + i, Y(-17) + Math.round(i * 0.5), C.vidrioL); pset(X(12) + Math.round(i * 0.5), Y(-15) + i, C.blanco); }
  // aire que corre por las alas
  for (let i = 0; i < 30; i++) if ((i + Math.floor(t * 30)) % 4 === 0) pset(X(-60) - i * 3, Y(18) + (i % 2), C.blanco);
}
