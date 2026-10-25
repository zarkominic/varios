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
import { C as CAG, cielo, primerT, rodar as rodarAg, arbol } from '/atomo/plato/escenas/ag-comun.js';
import { halcon, bandada, viento, fugaz, gato, motas } from '/atomo/plato/escenas/eg-comun.js';

export { primerT, cielo, arbol, halcon, bandada, viento, fugaz, gato, motas };
const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...CAG,
  ...pal({
    marH: '#8cbce0', marP3: '#3c80c8', marP2: '#2c68b0', marP1: '#1f5294', marP0: '#173f75', marS: '#1a4682', espuma: '#f4fbff', espumaS: '#bcd8ee',
    metal: '#9aa4b4', metalS: '#6c7688', metalL: '#c8d0dc', metalD: '#4a5262', vidrio: '#2e4a6a', vidrioL: '#8ac0e0', fuego: '#ffb040', fuegoL: '#fff0a0',
    tictac: '#f6f8fa', tictacS: '#c4cad4', tictacL: '#ffffff', sombraMar: '#1a3c6c',
    monte0: '#8a9ac0', monte1: '#6c7ca6', monte2: '#56648c', monte3: '#3e4a6e', nieveL: '#ffffff', nieveM: '#dfe8f4', nieveD: '#a8b8d4', roca: '#5e5a6e', rocaS: '#46425a',
    bosque0: '#4a7a6a', bosque1: '#2e5e4a', bosque2: '#1e4636', bosque3: '#163628', avion: '#d8c060', avionS: '#a88c30', avionR: '#c83a3a',
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

// ── B · el monte Rainier, 1947 ───────────────────────────────────────────────────────────────────────────────────────
// Montañas en capas (lejanas azuladas), el Rainier enorme con su glaciar, el Adams lejos a la derecha, valles de pinos.
// o.dx: desplazamiento de cámara (paralaje: lo lejano se mueve menos); o.tarde: luz de atardecer; o.hor: base de los montes
export const RAINIER = [118, 32], ADAMS = [262, 58];
export function rainier(R, t, o = {}) {
  const { rect, pset, poligono } = R, dx = o.dx ?? 0, hor = o.hor ?? 108;
  cielo(R, t, { hor, aves: false, tarde: o.tarde, sol: o.tarde ? [280, hor - 30, 11] : [206, 20, 8] });
  const X = (x, k) => Math.round(x - dx * k);
  // sierra del fondo, azulada y con nieve en las cumbres
  const sierra = (pts, k, c, nieve) => { const q = pts.map(([x, y]) => [X(x, k), y]); poligono([...q, [X(400, k), hor + 6], [X(-80, k), hor + 6]], c); if (nieve) for (const [x, y] of q) { poligono([[x, y], [x - 4, y + 4], [x + 4, y + 4]], C.nieveM); } };
  sierra([[-80, 88], [-20, 76], [30, 84], [70, 72], [180, 80], [230, 70], [300, 82], [360, 74], [400, 86]], 0.15, C.monte0, true);
  // el Adams, lejos: un cono más pequeño, casi todo nieve
  { const [ax, ay] = [X(ADAMS[0], 0.18), ADAMS[1]]; poligono([[ax, ay], [ax - 34, hor], [ax + 36, hor]], C.monte1); poligono([[ax, ay], [ax - 14, ay + 12], [ax - 6, ay + 10], [ax + 2, ay + 14], [ax + 15, ay + 12]], C.nieveM); poligono([[ax, ay], [ax + 15, ay + 12], [ax + 6, ay + 13]], C.nieveD); }
  // el Rainier: el gran cono, con la nieve en lenguas irregulares, lado de sombra, roca con textura y neveros sueltos
  { const [rx, ry] = [X(RAINIER[0], 0.22), RAINIER[1]];
    poligono([[rx - 6, ry], [rx + 8, ry - 1], [rx + 74, hor], [rx - 82, hor]], C.monte1);
    poligono([[rx + 8, ry - 1], [rx + 74, hor], [rx + 20, hor]], C.monte2);
    for (let y = ry + 2; y < hor; y++) for (let x = rx - 82; x < rx + 74; x++) { const c = R.pget(x, y); if ((c === C.monte1 || c === C.monte2) && y % 4 === 0 && h(Math.floor(x / 5), y, 5) < 0.18 && h(x, y, 6) < 0.8) pset(x, y, c === C.monte1 ? C.roca : C.rocaS); }   // estratos de roca
    // la capa de nieve: borde de abajo en lenguas que bajan por las cañadas
    const cap = [[rx - 6, ry], [rx + 8, ry - 1]];
    for (let k = 0; k <= 30; k++) { const u = k / 30, x = rx + 34 - u * 74, y = ry + 24 + 9 * Math.max(0, Math.sin(u * Math.PI * 4.5 + 0.6)) ** 2 + 4 * Math.sin(u * 23) * h(k, 1, 6) - Math.abs(u - 0.5) * 8; cap.push([Math.round(x), Math.round(y)]); }
    poligono(cap, C.nieveL);
    for (let y = ry; y < ry + 50; y++) for (let x = rx; x < rx + 40; x++) if (R.pget(x, y) === C.nieveL && x - rx > (y - ry) * 0.25) pset(x, y, C.nieveD);   // nieve en sombra
    for (let k = 0; k < 5; k++) { const y0 = ry + 6 + k * 5; for (let x = rx - 30 + k * 2; x < rx - 6 + k; x++) if (R.pget(x, y0) === C.nieveL && (x + k) % 7 < 4) pset(x, y0, C.nieveM); }   // grietas del glaciar
    // neveros sueltos más abajo, de formas distintas
    for (let k = 0; k < 9; k++) { const x = rx - 60 + h(k, 3, 7) * 120, y = ry + 44 + h(k, 4, 7) * (hor - ry - 52), w = 2 + h(k, 5, 7) * 5; if (R.pget(Math.round(x), Math.round(y)) === C.monte1 || R.pget(Math.round(x), Math.round(y)) === C.monte2) poligono([[x, y], [x - w, y + 2 + w * 0.6], [x - w * 0.3, y + 1], [x + w * 0.6, y + 3 + w * 0.4]], C.nieveM); }
    R.nube(rx + 18 + Math.sin(t * 0.3) * 6, ry + 8, 18);
  }
  // colinas medias y valles de pinos, de lejos a cerca: el perfil se calcula columna a columna en coordenadas del mundo,
  // así el paisaje no se acaba por mucho que avance la cámara
  const perfil = (wx, base, amp, esc, sem) => base + amp * (Math.sin(wx / esc + sem) * 0.6 + Math.sin(wx / (esc * 0.43) + sem * 2) * 0.4);
  const colina = (k, base, amp, esc, c, cPino, cLuz, dens) => {
    for (let x = 0; x < 320; x++) { const y = Math.round(perfil(x + dx * k, base, amp, esc, k * 7)); rect(x, y, x, 179, c); if (h(x + Math.round(dx * k), 1, k) < 0.25) pset(x, y, cLuz); }
    const paso = Math.round(12 / dens), w0 = Math.floor((dx * k) / paso) - 2;
    for (let i = w0; i < w0 + 340 / paso + 4; i++) {
      if (h(i, k * 10, 1) < 0.35) continue;
      const wx = i * paso + h(i, k * 10, 2) * paso, x = Math.round(wx - dx * k), yb = Math.round(perfil(wx, base, amp, esc, k * 7) + 2 + h(i, k * 10, 3) * 8), sc = 0.5 + k * 0.9;
      poligono([[x, yb - 11 * sc], [x - 4 * sc, yb], [x + 4 * sc, yb]], cPino); poligono([[x, yb - 11 * sc], [x - 2 * sc, yb - 3], [x, yb - 3]], cLuz);
    }
  };
  colina(0.35, hor - 2, 4, 40, C.bosque0, C.bosque1, hex('#5a8a78'), 1.6);
  colina(0.6, hor + 12, 6, 55, C.bosque1, C.bosque2, C.bosque0, 1.3);
  colina(1, hor + 32, 7, 70, C.bosque2, C.bosque3, C.bosque1, 1.1);
  // primer plano: copas de pinos grandes, con luz y sombra, que enmarcan abajo
  for (let j = Math.floor(dx * 1.6 / 30) - 2, i = j; i < j + 14; i++) {
    const x = Math.round(i * 30 + h(i, 9, 9) * 16 - dx * 1.6), yb = 184 + Math.round(h(i, 8, 9) * 10), s2 = 2.2 + h(i, 7, 9) * 1.2, m = Math.round(Math.sin(t * 1.2 + i) * 1);
    for (let j = 0; j < 4; j++) { const w = (9 - j * 2) * s2 * 0.6, y = yb - j * 7 * s2 * 0.55; poligono([[x + m, y - 10 * s2 * 0.6], [x - w, y], [x + w, y]], j % 2 ? C.bosque3 : hex('#10281e')); poligono([[x + m, y - 10 * s2 * 0.6], [x - w * 0.5, y - 3], [x + m, y - 3]], C.bosque2); }
  }
  // un río que brilla en el valle
  for (let x = 0; x < 320; x++) { const y = Math.round(hor + 22 + Math.sin((x + dx * 0.6) * 0.04) * 4); if (R.pget(x, y) === C.bosque1) { pset(x, y, (x + Math.floor(t * 6)) % 9 ? C.marP3 : C.marL); } }
  // vida: un halcón y bandadas lejanas; el viento mueve jirones de nube
  halcon(R, t, 230, 36);
  for (let k = 0; k < 3; k++) { const x = Math.round(((k * 130 - t * 8 - dx * 0.5) % 420 + 420) % 420) - 50, y = 50 + k * 14; rect(x, y, x + 14 + k * 4, y, C.blanco); rect(x + 4, y - 1, x + 10, y - 1, C.blanco); }
}

// la avioneta de Arnold, de lado: ala alta, hélice que gira, el piloto pequeño en la ventanilla
const AVIONETA = [
  '...........kkkkkkkkkkkkkkk......',
  '...........kAAAAAAAAAAAAAk......',
  '.kk.........kkkkkkkkkkkkk.......',
  '.kAk.......kVVVvkVVVk...........',
  '.kAAk...kkkkVVVvkVVVkkkkk..k....',
  '.kAAAkkkaAAAAAAAAAAAAAAAAkkPk...',
  'kRRRRRRRRRRRRRRRRRRRRRRRRRkPk...',
  '.kaaaaaaaaaaaaaaaaaaaaaakkkPk...',
  '..kkkkkkkkkkkkkkkkkkkkkk...k....',
  '.................kk..kk.........',
  '................kWWk.kWWk.......',
  '.................kk...kk........',
];
export function avioneta(R, x, y, t, o = {}) {
  const dir = o.dir ?? 1, b = Math.round(Math.sin(t * 2.3) * 0.8), w = AVIONETA[0].length;
  const helice = Math.floor(t * 30) % 2 ? { P: C.metalS } : { P: C.k };
  R.dibujo(AVIONETA, Math.round(x - w / 2), Math.round(y - 6 + b), dir, { k: C.k, A: C.avion, a: C.avionS, R: C.avionR, V: C.vidrioL, v: C.vidrio, W: C.k, ...helice });
  // la cabeza del piloto en la ventanilla
  const px = Math.round(x + dir * 2), py = Math.round(y - 3 + b); R.pset(px, py, C.maderaS); R.pset(px + dir, py, C.k); R.pset(px, py - 1, C.maderaS);
}

// los nueve destellos: objetos brillantes en fila que ondulan como la cola de una cometa y destellan al sol
export function destellos(R, t, x0, y0, o = {}) {
  for (let k = 0; k < 9; k++) {
    const x = Math.round(x0 - k * (o.sep ?? 9)), y = Math.round(y0 + Math.sin(t * 6 - k * 0.8) * 3 + k * (o.caida ?? 0.4));
    const brilla = Math.sin(t * 9 + k * 1.3) > 0.3;
    // una media luna plateada que se inclina; al darle el sol, destella con cuatro rayos
    R.rect(x - 3, y, x + 3, y, C.k); R.rect(x - 2, y - 1, x + 2, y - 1, brilla ? C.blanco : C.metalL); R.rect(x - 3, y - 1, x - 3, y - 1, C.k); R.rect(x + 3, y - 1, x + 3, y - 1, C.k); R.rect(x - 1, y - 2, x + 1, y - 2, C.k);
    if (brilla) { for (let r = 2; r <= 4; r++) { R.pset(x, y - 1 - r, C.blanco); R.pset(x, y - 1 + r, C.oroL); R.pset(x - 2 - r, y - 1, C.oroL); R.pset(x + 2 + r, y - 1, C.oroL); } }
  }
}

// el tablero de la avioneta, de cerca: el reloj con su segundero, el altímetro y, por la ventanilla, los destellos que
// pasan de un monte a otro. p: 0–1 (el cronómetro corre mientras van del Rainier al Adams)
export function tablero(R, t, p) {
  const { rect, pset, disco } = R;
  rainier(R, t, { dx: 30, hor: 100 });
  destellos(R, t, 70 + p * 190, 70 + p * 4);
  // marco de la ventanilla y el tablero abajo
  rect(0, 0, 319, 5, C.k); rect(0, 0, 5, 179, C.k); rect(314, 0, 319, 179, C.k);
  rect(0, 118, 319, 179, C.maderaS); rect(0, 118, 319, 119, C.k); rect(0, 120, 319, 121, C.maderaL);
  for (let x = 6; x < 320; x += 26) pset(x, 170, C.maderaD);
  // reloj (izquierda) y altímetro (derecha), esferas con sus agujas
  const esfera = (cx, cy, r, ang, ang2) => { disco(cx, cy, r + 2, C.k); disco(cx, cy, r + 1, C.metalS); disco(cx, cy, r, C.papel);
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(cx + Math.cos(a) * (r - 2)), Math.round(cy + Math.sin(a) * (r - 2)), C.k); }
    R.linea(cx, cy, Math.round(cx + Math.cos(ang) * (r - 3)), Math.round(cy + Math.sin(ang) * (r - 3)), C.k);
    if (ang2 != null) R.linea(cx, cy, Math.round(cx + Math.cos(ang2) * (r - 6)), Math.round(cy + Math.sin(ang2) * (r - 6)), C.rojo);
    disco(cx, cy, 1, C.k); };
  esfera(110, 150, 18, -Math.PI / 2 + Math.floor(t * 4) / 4 * (Math.PI / 30) * 4, -Math.PI / 2 + 2.6);   // segundero que salta
  esfera(210, 150, 14, -Math.PI / 2 + 1.1 + Math.sin(t) * 0.05);
  rect(44, 138, 70, 162, C.k); rect(46, 140, 68, 160, C.metalD); R.linea(52, 158, 62, 142, C.metalL);       // palanca
  // vetas de la madera, tornillos, la brújula de bola, interruptores y una placa
  for (let k = 0; k < 9; k++) { const y = 126 + k * 6; for (let x = 0; x < 320; x++) if (h(Math.floor(x / 9), k, 11) < 0.5 && (x + k * 7) % 41 < 30 && R.pget(x, y) === C.maderaS) pset(x, y, hex('#4e2e16')); }
  for (const [x, y] of [[10, 126], [310, 126], [10, 172], [310, 172], [150, 126]]) { R.disco(x, y, 1, C.metal); pset(x, y, C.k); }
  R.disco(262, 138, 9, C.k); R.disco(262, 138, 8, hex('#2a2430')); R.rect(255, 138, 269, 138, C.oro);
  for (let k = 0; k < 3; k++) { const x = 248 + k * 10, y = 160; rect(x, y, x + 5, y + 5, C.k); rect(x + 1, y + 1, x + 4, y + 4, C.metalS); rect(x + 2, y - 3 + (k === 1 ? 0 : 2), x + 3, y + 1, C.metalL); }
  rect(140, 168, 180, 172, C.oroS); rect(141, 169, 179, 171, C.oro);
  // reflejo del sol que pasa por el cristal de la ventanilla
  for (let i = 0; i < 40; i++) { const x = Math.round(((t * 20) % 500) - 100 + i), y = 10 + i * 2; if (x > 6 && x < 313 && y < 116) { pset(x, y, C.blanco); pset(x + 3, y, C.cielo3); } }
  // la mano de Arnold sobre la palanca
  rect(58, 136, 64, 142, C.k); rect(59, 137, 63, 141, hex('#f6c290'));
}

// el aeródromo: hangar de chapa, manga de viento, la avioneta aparcada y el Rainier al fondo
export function aerodromo(R, t, o = {}) {
  const { rect, pset, poligono } = R, suelo = 146;
  rainier(R, t, { dx: 60, hor: 112, tarde: o.tarde });
  rect(0, 132, 319, 179, C.hierbaS); rect(0, 132, 319, 133, C.hierba);
  rect(0, 146, 319, 156, C.camino); rect(0, 146, 319, 146, C.caminoL); for (let x = 4; x < 320; x += 16) rect(x, 151, x + 7, 151, C.blanco);   // pista
  // hangar de chapa ondulada con el portón abierto
  poligono([[196, 104], [250, 92], [304, 104], [304, 146], [196, 146]], C.metal); poligono([[196, 104], [250, 92], [304, 104]], C.metalL);
  for (let x = 198; x < 304; x += 4) rect(x, 106, x, 145, C.metalS);
  rect(222, 116, 280, 146, C.metalD); rect(224, 118, 278, 146, hex('#2a2a36'));
  rect(196, 145, 304, 146, C.k);
  // manga de viento que se agita
  rect(176, 108, 176, 146, C.metalD); for (let i = 0; i < 4; i++) { const yy = 108 + i + Math.round(Math.sin(t * 4 + i) * 1); rect(178 + i * 3, yy, 180 + i * 3, yy + 3 - Math.min(2, i / 2), i % 2 ? C.blanco : C.naranja); }
  avioneta(R, 178, 138, 0, { dir: -1 });
  // un coche de los cuarenta aparcado, un surtidor de gasolina y una cerca de madera
  { const x = 16, y = 146; R.poligono([[x, y - 6], [x + 6, y - 12], [x + 22, y - 12], [x + 28, y - 6], [x + 34, y - 5], [x + 34, y - 1], [x, y - 1]], C.k);
    R.poligono([[x + 1, y - 6], [x + 7, y - 11], [x + 21, y - 11], [x + 27, y - 6], [x + 33, y - 4], [x + 33, y - 2], [x + 1, y - 2]], hex('#2a5a4a'));
    rect(x + 9, y - 10, x + 13, y - 7, C.vidrioL); rect(x + 15, y - 10, x + 20, y - 7, C.vidrioL); rect(x + 30, y - 4, x + 33, y - 3, C.oroL);
    for (const cx of [x + 8, x + 27]) { R.disco(cx, y - 1, 3, C.k); R.disco(cx, y - 1, 1, C.metal); } }
  { const x = 150; rect(x, 130, x + 6, 146, C.k); rect(x + 1, 131, x + 5, 145, C.rojo); rect(x + 2, 133, x + 4, 136, C.papel); rect(x + 7, 136, x + 7, 142, C.k); }
  for (let x = 0; x < 320; x += 12) { if (x > 190 && x < 306) continue; rect(x, 162, x + 1, 170, C.madera); } rect(0, 164, 189, 164, C.maderaL); rect(306, 164, 319, 164, C.maderaL);
  // dentro del hangar asoma el morro de otra avioneta
  rect(250, 132, 278, 136, C.avion); rect(250, 137, 278, 137, C.k); rect(276, 128, 278, 140, C.k);
  // flores y hierbas altas que mueve el viento
  for (let i = 0; i < 40; i++) { const x = Math.round(h(i, 3, 0) * 320), y = 158 + Math.round(h(i, 4, 0) * 20), m = Math.round(Math.sin(t * 3 + i) * 1); pset(x + m, y - 2, C.hierbaL); pset(x, y - 1, C.hierbaL); if (i % 5 === 0) pset(x + m, y - 3, C.amarillo); }
  viento(R, t);
}

// el dibujo del periodista: un plato con cúpula (lo que Arnold no dijo), en un bocadillo grande
export function bocadilloPlatillo(R, x, y) {
  R.rect(x - 14, y - 16, x + 14, y, C.k); R.rect(x - 13, y - 15, x + 13, y - 1, C.blanco);
  R.pset(x - 4, y + 1, C.k); R.pset(x - 3, y + 1, C.k); R.pset(x - 4, y + 2, C.k); R.pset(x - 3, y, C.blanco);
  R.rect(x - 9, y - 7, x + 9, y - 6, C.metalS); R.rect(x - 7, y - 8, x + 7, y - 8, C.metal); R.rect(x - 3, y - 11, x + 3, y - 9, C.vidrioL); R.rect(x - 2, y - 12, x + 2, y - 12, C.vidrioL);
  for (const dx of [-6, 0, 6]) R.pset(x + dx, y - 5, C.oro);
}
// lo que Arnold sí dijo: un platillo que rebota sobre el agua, con su trayectoria a saltos
export function rebote(R, x0, y0, t) {
  for (let k = 0; k < 3; k++) for (let i = 0; i <= 10; i++) { const x = x0 + k * 10 + i, y = Math.round(y0 - Math.sin((i / 10) * Math.PI) * (6 - k * 2)); if ((i + Math.floor(t * 8)) % 3) R.pset(x, y, C.blanco); }
  const u = (t * 0.8) % 1, k = Math.floor(u * 3), i = (u * 3 - k) * 10, x = Math.round(x0 + k * 10 + i), y = Math.round(y0 - Math.sin((i / 10) * Math.PI) * (6 - k * 2));
  R.rect(x - 2, y - 1, x + 2, y, C.metalL); R.rect(x - 4, y + 4, x + 34, y + 4, C.marP3);
}
