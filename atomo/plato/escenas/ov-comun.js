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
import { conChibi, ELENCO_CHIBI as EL_OV } from '/atomo/plato/kits/pixel-chibi.js';
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
    arena: '#e0b47a', arenaS: '#c8945a', arenaL: '#f0cc94', meseta: '#c8704a', mesetaS: '#9a4e34', mesetaL: '#e08a5a', mesetaF: '#d89a7a', mesetaFS: '#b87a62',
    matorral: '#7a8a4a', matorralS: '#56663a', yuca: '#6a8a5a', foil: '#e6ecf4', foilS: '#9aa8bc', noche1: '#141a3e', noche2: '#1e2650', noche3: '#2c3466',
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
  cielo(R, t, { hor, aves: false, tarde: o.tarde, sol: o.sol ?? [236, 22, 8] });
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
  R.actor(o.quien, cx + 22, cy + 3, t, { sorpresa: o.sorpresa, quieto: true, dir: o.dirPiloto ?? 1, dedo: o.rasca });
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

// la avioneta de cerca, a escala ×4 (el plano medio se hace con el vehículo): hélice que gira, Arnold en la ventanilla
// (o.mira: −1 mira atrás, 1 adelante) y o.reflejo (0–1): un destello que cruza el fuselaje
export function avionetaGrande(R, x, y, t, o = {}) {
  const e = 4, w = AVIONETA[0].length, b = Math.round(Math.sin(t * 2.3) * 2), pal = { k: C.k, A: C.avion, a: C.avionS, R: C.avionR, V: C.vidrioL, v: C.vidrio, W: C.k, P: Math.floor(t * 30) % 2 ? C.metalS : C.k };
  const x0 = Math.round(x - w * e / 2), y0 = Math.round(y - 6 * e + b);
  AVIONETA.forEach((f, j) => { for (let i = 0; i < w; i++) { const ch = f[i]; if (ch === '.' || !pal[ch]) continue; R.rect(x0 + i * e, y0 + j * e, x0 + i * e + e - 1, y0 + j * e + e - 1, pal[ch]); } });
  // remaches, la matrícula en números y la hélice como disco borroso
  for (let i = 3; i < 25; i += 3) R.pset(x0 + i * e + 2, y0 + 6 * e + 1, C.avionS); R.numero('7', x0 + 6 * e, y0 + 6 * e + 3, { color: C.k, sombra: false });
  for (let j = -14; j <= 14; j++) if (Math.abs(j) > 2 && (j + Math.floor(t * 40)) % 3) R.pset(x0 + 28 * e + 1, y0 + 6 * e + j, C.metalL);
  // Arnold en la ventanilla: cabeza, gorra y ojo, mirando a donde toca
  const hx = x0 + 15 * e, hy = y0 + 3 * e + 1, m = o.mira ?? 1; R.rect(hx - 4, hy - 1, hx + 3, hy + 7, hex('#f6c290')); R.rect(hx - 5, hy - 3, hx + 4, hy, hex('#5a4a3a')); R.rect(hx + (m > 0 ? 4 : -7), hy - 2, hx + (m > 0 ? 7 : -5), hy - 1, hex('#5a4a3a'));
  R.pset(hx + (m > 0 ? 1 : -2), hy + 2, C.k); R.pset(hx + (m > 0 ? 2 : -3), hy + 2, C.k); if (m < 0) R.rect(hx - 4, hy + 5, hx - 2, hy + 5, C.k);
  if (o.reflejo > 0 && o.reflejo < 1) { const rx = Math.round(x0 + o.reflejo * w * e); for (let j = 0; j < 8 * e; j++) { const xx = rx + Math.round(j * 0.4); R.pset(xx, y0 + j, C.blanco); R.pset(xx + 1, y0 + j, C.oroL); } }
}
// la ladera nevada del Rainier de cerca: grietas azules, rocas, nieve que vuela con el viento y los restos del avión
// militar medio enterrados (la cola con la estrella, un ala rota, piezas); la sombra de la avioneta pasa por encima
// (o.sombra: x de la sombra, o null)
export function laderaNieve(R, t, o = {}) {
  const { rect, pset, disco, poligono } = R;
  for (let y = 0; y < 40; y++) rect(0, y, 319, y, y < 20 ? C.cielo1 : C.cielo2);
  poligono([[0, 40], [120, 20], [200, 34], [320, 16], [320, 180], [0, 180]], C.nieveM);
  // la pendiente: bandas de sombra en diagonal, tramadas, y brillos sueltos
  for (let y = 16; y < 180; y++) for (let x = 0; x < 320; x++) if (R.pget(x, y) === C.nieveM) { const b = Math.sin((x * 0.6 + y) * 0.05) + Math.sin((x - y) * 0.021) * 0.6; if (b > 0.9 && (x + y) % 2) pset(x, y, C.nieveL); else if (b < -0.8 && (x + y) % 2) pset(x, y, C.nieveD); else if (h(x, y, 170) < 0.01) pset(x, y, C.blanco); }
  // grietas de hielo azul y rocas que asoman
  for (let k = 0; k < 6; k++) { const x = 20 + k * 52 + Math.round(h(k, 1, 171) * 20), y = 70 + Math.round(h(k, 2, 171) * 70), l = 18 + Math.round(h(k, 3, 171) * 20); poligono([[x, y], [x + l, y + 3], [x + l - 4, y + 5], [x + 2, y + 3]], hex('#5a8ab8')); R.linea(x, y, x + l, y + 3, C.k); }
  for (let k = 0; k < 9; k++) { const x = Math.round(h(k, 4, 171) * 320), y = 50 + Math.round(h(k, 5, 171) * 120), r = 3 + Math.round(h(k, 6, 171) * 5); poligono([[x - r, y + 2], [x - r / 2, y - r], [x + r, y - r / 2], [x + r, y + 2]].map(([a, b]) => [Math.round(a), Math.round(b)]), C.roca); rect(x - r, y - 1, x + r, y + 2, C.nieveL); }
  // los restos: el fuselaje medio enterrado, la cola con la estrella, un ala partida y piezas sueltas
  const cx = 168, cy = 118;
  poligono([[cx - 50, cy + 6], [cx + 30, cy - 4], [cx + 34, cy + 6], [cx - 48, cy + 14]], C.k); poligono([[cx - 48, cy + 7], [cx + 29, cy - 2], [cx + 32, cy + 6], [cx - 47, cy + 12]], hex('#7a8a6a'));
  poligono([[cx + 26, cy - 3], [cx + 40, cy - 30], [cx + 48, cy - 30], [cx + 40, cy + 2]], C.k); poligono([[cx + 28, cy - 3], [cx + 41, cy - 28], [cx + 46, cy - 28], [cx + 39, cy + 1]], hex('#8a9a7a'));
  disco(cx + 39, cy - 18, 4, hex('#2a4a8a')); pset(cx + 39, cy - 18, C.blanco); pset(cx + 38, cy - 18, C.blanco); pset(cx + 40, cy - 18, C.blanco); pset(cx + 39, cy - 19, C.blanco);
  poligono([[cx - 20, cy + 10], [cx - 64, cy + 30], [cx - 58, cy + 34], [cx - 14, cy + 14]], C.k); poligono([[cx - 20, cy + 11], [cx - 62, cy + 30], [cx - 58, cy + 32], [cx - 16, cy + 13]], hex('#8a9a7a'));
  for (let k = 0; k < 7; k++) { const x = cx - 80 + Math.round(h(k, 7, 171) * 160), y = cy + 18 + Math.round(h(k, 8, 171) * 30); rect(x, y, x + 3 + k % 3, y + 1, k % 2 ? hex('#7a8a6a') : C.metalD); }
  rect(cx - 50, cy + 12, cx + 34, cy + 16, C.nieveL);   // la nieve que lo va tapando
  if (o.sombra != null) { const x = Math.round(o.sombra); for (let j = -3; j <= 3; j++) for (let i = -14; i <= 14; i++) if ((i / 14) ** 2 + (j / 3) ** 2 < 1 && (i + j) % 2 === 0) pset(x + i, 96 + j + Math.round(i * 0.1), hex('#9aa8c4')); rect(x - 2, 90, x + 2, 102, hex('#9aa8c4')); }
  // nieve que levanta el viento
  for (let k = 0; k < 50; k++) { const x = Math.round((h(k, 9, 171) * 360 + t * (40 + k % 20)) % 360) - 20, y = Math.round(40 + h(k, 10, 171) * 140 + Math.sin(t * 3 + k) * 3); pset(x, y, C.blanco); if (k % 3 === 0) pset(x - 1, y, C.nieveL); }
}

// los nueve destellos: objetos brillantes en fila que ondulan como la cola de una cometa y destellan al sol
export function destellos(R, t, x0, y0, o = {}) {
  if (o.esc === 2) { for (let k = 0; k < 9; k++) { const x = Math.round(x0 - k * (o.sep ?? 18)), y = Math.round(y0 + Math.sin(t * 5 - k * 0.8) * 6 + k * (o.caida ?? 0.8)), brilla = Math.sin(t * 7 + k * 1.3) > 0.4, inc = Math.round(Math.sin(t * 5 - k * 0.8 + 1) * 2);
    R.poligono([[x - 7, y + inc], [x + 7, y - inc], [x + 5, y - 3 - inc], [x - 5, y - 3 + inc]], C.k); R.poligono([[x - 6, y - 1 + inc], [x + 6, y - 1 - inc], [x + 4, y - 3 - inc], [x - 4, y - 3 + inc]], brilla ? C.blanco : C.metalL); R.rect(x - 2, y - 4, x + 2, y - 4, C.k);
    if (brilla) for (let r = 3; r <= 8; r++) { const c = r > 6 ? C.oroL : C.blanco; R.pset(x, y - 2 - r, c); R.pset(x, y - 2 + r, c); R.pset(x - 3 - r, y - 2, c); R.pset(x + 3 + r, y - 2, c); if (r < 5) { R.pset(x + r, y - 2 - r, C.oroL); R.pset(x - r, y - 2 - r, C.oroL); } } } return; }
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
export function tablero(R, t, p, o = {}) {
  const { rect, pset, disco } = R;
  rainier(R, t, { dx: o.dx ?? 30, hor: 100 });
  if (o.destellos !== false) destellos(R, t, 70 + p * 190, 70 + p * 4);
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
  // o.nota: la nota de la recompensa sujeta al marco, con el avión perdido dibujado y «5000» con su «$»; se mueve con el aire
  if (o.nota) { const a = Math.round(Math.sin(t * 5) * 1), x = 236, y = 66 + a; rect(x, y, x + 40, y + 46, C.k); rect(x + 1, y + 1, x + 39, y + 45, C.papel); rect(x + 1, y + 1, x + 39, y + 3, C.papelS);
    rect(x + 6, y + 10, x + 34, y + 12, C.k); rect(x + 18, y + 6, x + 20, y + 18, C.k); rect(x + 6, y + 9, x + 8, y + 13, C.k); rect(x + 30, y + 8, x + 33, y + 11, C.k);   // el avión militar visto desde arriba
    R.numero('5000', x + 24, y + 38, { color: C.rojoS, sombra: false, centro: true }); for (const [i, j] of [[2, 0], [3, 0], [4, 0], [1, 1], [1, 2], [2, 3], [3, 3], [4, 4], [4, 5], [1, 6], [2, 6], [3, 6], [2.5, -1], [2.5, 7]]) R.pset(Math.round(x + 1 + i), y + 30 + j, C.rojoS);   // el «$»
    rect(x + 18, y - 3, x + 22, y + 1, C.k); rect(x + 19, y - 2, x + 21, y, C.metalL); }
}

// el reloj del tablero de cerca: esfera grande con números, la aguja de los minutos y el segundero que salta (o.seg:
// segundos que lleva contando), el bisel cromado, la madera alrededor y el pulgar de Arnold sobre el botón (o.pulsa)
export function relojCerca(R, t, o = {}) {
  const { rect, pset, disco, linea } = R, cx = 160, cy = 92, r = 62;
  rect(0, 0, 319, 179, C.maderaS); for (let k = 0; k < 24; k++) { const y = Math.round(h(k, 1, 172) * 180); for (let x = 0; x < 320; x++) if ((x + k * 13) % 47 < 34) pset(x, y + Math.round(Math.sin(x * 0.03 + k) * 2), hex('#4e2e16')); }
  for (const [x, y] of [[40, 30], [280, 30], [40, 154], [280, 154]]) { disco(x, y, 3, C.metal); linea(x - 2, y, x + 2, y, C.k); }
  disco(cx, cy, r + 6, C.k); disco(cx, cy, r + 5, C.metalS); disco(cx, cy, r + 3, C.metalL); disco(cx, cy, r + 1, C.k); disco(cx, cy, r, C.papel);
  for (let k = 0; k < 60; k++) { const a = k * Math.PI / 30 - Math.PI / 2, l = k % 5 ? 3 : 7; linea(Math.round(cx + Math.cos(a) * (r - 2)), Math.round(cy + Math.sin(a) * (r - 2)), Math.round(cx + Math.cos(a) * (r - 2 - l)), Math.round(cy + Math.sin(a) * (r - 2 - l)), C.k); }
  for (let k = 1; k <= 12; k++) { const a = k * Math.PI / 6 - Math.PI / 2; R.numero(String(k), Math.round(cx + Math.cos(a) * (r - 18)), Math.round(cy + Math.sin(a) * (r - 18)) + 4, { color: C.k, sombra: false, centro: true }); }
  const seg = o.seg ?? 0, sa = Math.floor(seg) * Math.PI / 30 - Math.PI / 2, ma = (3 + seg / 60) * Math.PI / 30 * 5 - Math.PI / 2;
  for (let w = -1; w <= 1; w++) linea(cx + w, cy, Math.round(cx + Math.cos(ma) * (r - 22)) + w, Math.round(cy + Math.sin(ma) * (r - 22)), C.k);
  linea(cx, cy, Math.round(cx + Math.cos(sa) * (r - 8)), Math.round(cy + Math.sin(sa) * (r - 8)), C.rojo); linea(cx, cy, Math.round(cx - Math.cos(sa) * 12), Math.round(cy - Math.sin(sa) * 12), C.rojo);
  disco(cx, cy, 3, C.k); disco(cx, cy, 1, C.oro);
  for (let i = 0; i < 30; i++) pset(cx - 40 + i, cy - 46 + Math.round(i * 0.6), C.blanco);   // el reflejo del cristal
  // la corona del cronómetro arriba y el pulgar que la aprieta
  rect(cx - 5, cy - r - 14, cx + 5, cy - r - 6, C.k); rect(cx - 4, cy - r - 13, cx + 4, cy - r - 7, C.metalL);
  if (o.pulsa) { const d = Math.round(o.pulsa * 3); disco(cx + 2, cy - r - 22 + d, 9, C.k); disco(cx + 2, cy - r - 22 + d, 8, hex('#f6c290')); rect(cx + 6, cy - r - 30 + d, cx + 40, cy - r - 18 + d, C.k); rect(cx + 7, cy - r - 29 + d, cx + 40, cy - r - 19 + d, hex('#f6c290')); rect(cx - 3, cy - r - 26 + d, cx + 4, cy - r - 24 + d, hex('#f8d8b8')); }
}
// la libreta de Arnold sobre la rodilla: el lápiz escribe el tiempo «1:42» (o.escribe 0–1) y luego dos barras crecen (o.barras
// 0–1): la de los aviones más rápidos de la época y la de los objetos, más del doble; al final «×2» (o.doble)
export function libreta(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R;
  rect(0, 0, 319, 179, hex('#5a4a3a')); for (let y = 0; y < 180; y += 3) for (let x = 0; x < 320; x++) if (h(x >> 1, y, 173) < 0.2) pset(x, y, hex('#4a3a2e'));   // el pantalón
  rect(54, 10, 266, 176, C.k); rect(55, 11, 265, 175, hex('#f4eedc')); for (let y = 26; y < 175; y += 9) rect(56, y, 264, y, hex('#b8c8d8')); rect(76, 11, 76, 175, hex('#d88a8a'));
  for (let x = 64; x < 260; x += 12) { disco(x, 10, 3, C.k); disco(x, 10, 2, C.metalL); }   // la espiral
  const e = o.escribe ?? 0, gl = ['1', ':', '4', '2'], n = Math.floor(e * 4.999);
  for (let k = 0; k < Math.min(4, n + (e > 0 ? 1 : 0)); k++) { const x = [90, 104, 110, 126][k]; if (gl[k] === ':') { rect(x, 40, x + 2, 42, hex('#3a3a6a')); rect(x, 48, x + 2, 50, hex('#3a3a6a')); } else R.numero(gl[k], x + 4, 54, { color: hex('#3a3a6a'), sombra: false, tam: 16 }); }
  // el reloj pequeño al lado del tiempo
  disco(184, 46, 8, hex('#3a3a6a')); disco(184, 46, 7, hex('#f4eedc')); linea(184, 46, 184, 41, hex('#3a3a6a')); linea(184, 46, 188, 47, hex('#3a3a6a'));
  const b = o.barras ?? 0;
  if (b > 0) { const y1 = 92, y2 = 126, x0 = 112;
    // los aviones de la época: un caza pequeño y su barra
    rect(84, y1 - 4, 100, y1 - 2, hex('#3a3a6a')); rect(90, y1 - 8, 92, y1 + 2, hex('#3a3a6a')); rect(97, y1 - 6, 99, y1 - 1, hex('#3a3a6a'));
    rect(x0, y1 - 7, x0 + Math.round(60 * Math.min(1, b * 2)), y1 + 3, hex('#7a8aa8')); rect(x0, y1 - 7, x0 + Math.round(60 * Math.min(1, b * 2)), y1 - 6, hex('#9aaac8'));
    // los objetos: la media luna brillante y su barra, más del doble
    poligono([[84, y2], [100, y2 - 2], [97, y2 - 6], [87, y2 - 4]], hex('#3a3a6a'));
    rect(x0, y2 - 7, x0 + Math.round(136 * Math.max(0, b * 2 - 1)), y2 + 3, C.oro); rect(x0, y2 - 7, x0 + Math.round(136 * Math.max(0, b * 2 - 1)), y2 - 6, C.oroL);
    linea(x0 + 60, y1 + 6, x0 + 60, y2 + 8, hex('#3a3a6a')); for (let y = y1 + 6; y < y2 + 8; y += 3) pset(x0 + 120, y, hex('#3a3a6a')); }
  if (o.doble) { R.numero('×2', 216, 160, { color: C.rojo, sombra: false, tam: 16, centro: true }); for (let a = 0; a < 6.28; a += 0.08) pset(Math.round(216 + Math.cos(a) * 22), Math.round(152 + Math.sin(a) * 14), C.rojo); }
  // el lápiz: sigue a lo que se escribe
  const px = b > 0 && b < 1 ? 112 + Math.round(b < 0.5 ? 60 * b * 2 : 136 * (b * 2 - 1)) : [90, 104, 110, 126][Math.min(3, n)] + 10, py = b > 0 && b < 1 ? (b < 0.5 ? 92 : 126) : 54;
  const wob = Math.round(Math.sin(t * 30) * (e > 0 && e < 1 ? 1 : 0));
  poligono([[px + wob, py], [px + 4 + wob, py - 6], [px + 46, py - 40], [px + 40, py - 46], [px - 2 + wob, py - 4]], C.k); poligono([[px + 2 + wob, py - 3], [px + 4 + wob, py - 5], [px + 42, py - 40], [px + 40, py - 42]], C.amarillo); poligono([[px + wob, py], [px + 3 + wob, py - 4], [px + wob - 1, py - 3]], hex('#e8c8a0')); pset(px + wob, py, C.k);
  rect(px + 38, py - 46, px + 46, py - 38, hex('#e88a9a'));
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
  if (o.avion !== false) avioneta(R, 178, 138, 0, { dir: -1 });
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

// un lago de montaña por la tarde, de cerca: orilla con pinos, el Rainier reflejado, juncos; un plato blanco rebota sobre
// el agua (o.u 0–1 a lo largo de cuatro saltos que se acortan) y en cada toque salpica y abre anillos
export function lagoRebote(R, t, o = {}) {
  const { rect, pset, disco, poligono } = R, hor = 84, u = o.u ?? 0;
  cielo(R, t, { hor, aves: false, sol: [260, 30, 9] });
  poligono([[60, hor], [118, 26], [176, hor]], C.monte1); poligono([[100, 40], [118, 26], [136, 40], [126, 38], [118, 44], [110, 38]], C.nieveL);
  for (let x = 0; x < 320; x += 6) { const a = 10 + Math.round(h(x, 1, 174) * 12); poligono([[x - 4, hor], [x + 3, hor - a], [x + 10, hor]], x % 12 ? C.bosque1 : C.bosque2); }
  rect(0, hor, 319, 179, hex('#3a78a8')); for (let y = hor; y < 180; y++) { const d = (y - hor) / 96; for (let x = 0; x < 320; x++) if (h(x >> 2, y, 175 + Math.floor(t * 2) % 3) < 0.05 + d * 0.05) pset(x, y, hex('#5a98c8')); }
  // el reflejo del monte, tembloroso
  for (let y = hor; y < hor + 50; y++) { const w = Math.round((58 - (y - hor) * 1.1) * Math.max(0, 1)), dx = Math.round(Math.sin(y * 0.8 + t * 3) * 1); if (w > 0) for (let x = 118 - w; x < 118 + w; x++) if ((x + y) % 2) pset(x + dx, y, (y - hor) > 40 ? hex('#7aa8d0') : hex('#4a6a9a')); }
  for (let y = hor; y < hor + 14; y++) { const dx = Math.round(Math.sin(y + t * 4) * 2); for (let x = 254; x < 266; x++) if ((x + y) % 2) pset(x + dx, y, C.solL); }   // el sol en el agua
  // juncos en primer plano que se mecen
  for (let k = 0; k < 14; k++) { const x = 6 + k * 7 + (k > 6 ? 200 : 0), m = Math.round(Math.sin(t * 2 + k) * 2); R.linea(x, 179, x + m, 150 + (k % 3) * 6, C.hierbaS); if (k % 3 === 0) rect(x + m - 1, 150 + (k % 3) * 6 - 6, x + m + 1, 150 + (k % 3) * 6, C.maderaS); }
  // el plato: cuatro saltos de x 30 a 290, cada uno más corto; salpica en cada toque
  const saltos = [[30, 110, 26], [110, 180, 18], [180, 236, 11], [236, 280, 5]], y0 = 128;
  for (let k = 0; k < saltos.length; k++) { const [a, b] = saltos[k], tk = (b - 30) / 250; if (u > tk) { const e = (u - tk) * 6; if (e < 1) { const r = Math.round(4 + e * 18); for (let ang = 0; ang < 6.28; ang += 0.15) pset(Math.round(b + Math.cos(ang) * r), Math.round(y0 + 3 + Math.sin(ang) * r * 0.3), hex('#d8ecf8')); if (e < 0.4) for (let i = -2; i <= 2; i++) disco(b + i * 3, y0 - Math.round((0.4 - e) * 20 * (1 - Math.abs(i) / 3)), 1, C.blanco); } } }
  if (u > 0 && u < 1) { const xx = 30 + u * 250; let k = saltos.findIndex(([a, b]) => xx >= a && xx <= b); if (k < 0) k = 3; const [a, b, alto] = saltos[k], f = (xx - a) / (b - a), y = Math.round(y0 - Math.sin(f * Math.PI) * alto), x = Math.round(xx);
    for (let j = -2; j <= 2; j++) for (let i = -7; i <= 7; i++) if ((i / 7) ** 2 + (j / 2.2) ** 2 < 1) pset(x + i, y + j, j < 0 ? C.blanco : hex('#c8d0dc')); pset(x - 5, y - 1, C.k); pset(x + 5, y - 1, C.k); rect(x - 6, y + 2, x + 6, y + 2, C.k);
    for (let i = 1; i < 6; i++) pset(x - 8 - i * 3, y + Math.round(Math.sin((f - i * 0.05) * Math.PI) * 0), hex('#d8ecf8')); }
}
// el mapa de EE. UU. con los periódicos que salen por todo el país (o.p 0–1): primero en Oregón, luego hacia el este;
// cada uno es un periódico pequeño con el platillo en portada
export function periodicosPais(R, t, P, p) {
  const ciudades = [[-118.8, 45.7], [-122.3, 47.6], [-122.4, 37.8], [-118.2, 34.1], [-112, 33.4], [-104.9, 39.7], [-111.9, 40.8], [-97.5, 35.5], [-96.8, 32.8], [-95.4, 29.8], [-93.3, 45], [-90.2, 38.6], [-87.6, 41.9], [-90.1, 30], [-84.4, 33.7], [-83, 42.3], [-81.7, 41.5], [-80.2, 25.8], [-77, 38.9], [-75.2, 40], [-74, 40.7], [-71.1, 42.4], [-86.8, 36.2], [-94.6, 39.1], [-100.8, 46.8], [-106.6, 35.1], [-115.1, 36.2], [-80.8, 35.2]];
  ciudades.map((c) => [c, Math.hypot(c[0] + 118.8, (c[1] - 45.7) * 1.3)]).sort((a, b) => a[1] - b[1]).forEach(([c, d], k) => {
    const e = (p * 60 - d) / 6; if (e <= 0) return; const [x, y] = P(c).map(Math.round), s = e < 1 ? Math.round(Math.sin(e * Math.PI) * 2) : 0;
    R.rect(x - 5 - s, y - 4 - s, x + 5 + s, y + 4 + s, C.k); R.rect(x - 4 - s, y - 3 - s, x + 4 + s, y + 3 + s, C.papel); R.rect(x - 4 - s, y - 3 - s, x + 4 + s, y - 2 - s, C.k);
    R.rect(x - 2, y, x + 2, y, C.metalS); R.pset(x, y - 1, C.metalS); });
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

// noche: oscurece y azulea todo lo que hay entre y0 e y1, salvo los colores de `deja` (ventanas encendidas, estrellas)
export function nocturno(R, y0, y1, deja = []) {
  const keep = new Set(deja);
  for (let y = Math.max(0, y0); y <= Math.min(179, y1); y++) for (let x = 0; x < 320; x++) {
    const c = R.pget(x, y); if (keep.has(c)) continue;
    const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
    R.pset(x, y, (0xff000000 | (Math.min(255, Math.round(b * 0.5 + 46)) << 16) | (Math.min(255, Math.round(g * 0.36 + 22)) << 8) | Math.min(255, Math.round(r * 0.32 + 18))) >>> 0);
  }
}

// ── C · el rancho de Nuevo México, 1947 ─────────────────────────────────────────────────────────────────────────────
// Mesetas rojizas en capas, matorral, yucas, el molino que gira, la cerca de alambre, la casa con porche y el cobertizo.
// o.noche (cielo estrellado, Vía Láctea y estrellas fugaces); o.tarde; o.restos (0–1: tiras brillantes por el suelo);
// o.ovejas (lista de x); o.casa (false para quitarla)
export function rancho(R, t, o = {}) {
  const { rect, pset, poligono } = R, hor = 112;
  if (o.noche) {
    for (let y = 0; y < hor; y++) rect(0, y, 319, y, y < 40 ? C.noche1 : y < 80 ? C.noche2 : C.noche3);
    // la Vía Láctea: una banda diagonal de polvo de estrellas
    for (let k = 0; k < 420; k++) { const u = h(k, 1, 20), x = Math.round(u * 340 - 10), y = Math.round(10 + u * 70 + (h(k, 2, 20) - 0.5) * 26); if (y < hor - 6) pset(x, y, h(k, 3, 20) < 0.3 ? C.noche3 : hex('#3e4680')); }
    for (let k = 0; k < 90; k++) { const x = Math.round(h(k, 4, 20) * 320), y = Math.round(h(k, 5, 20) * (hor - 8)); pset(x, y, Math.sin(t * 2 + k) > 0.6 ? C.blanco : C.grisL); if (k % 11 === 0 && Math.sin(t * 3 + k) > 0.8) { pset(x - 1, y, C.grisL); pset(x + 1, y, C.grisL); } }
    fugaz(R, t, 6);
    R.disco(210, 26, 8, hex('#e8e0c8')); R.disco(210, 26, 7, C.papel); R.disco(212, 24, 2, C.papelS); R.disco(207, 29, 1, C.papelS);   // la luna
  } else cielo(R, t, { hor, aves: false, tarde: o.tarde, sol: o.tarde ? [60, hor - 22, 11] : [250, 22, 8] });
  const sombra = (c) => c;   // de noche se oscurece todo al final (nocturno)
  // mesetas lejanas (más claras) y cercanas, con su sombra y estratos
  const meseta = (x0, x1, top, base, c, cs) => { poligono([[x0, base], [x0 + 8, top + 3], [x0 + 12, top], [x1 - 12, top], [x1 - 8, top + 3], [x1, base]], sombra(c)); poligono([[x1 - 12, top], [x1 - 8, top + 3], [x1, base], [x1 - 22, base]], sombra(cs)); for (let y = top + 6; y < base; y += 5) for (let x = x0 + 10; x < x1 - 10; x++) if ((x + y) % 13 < 8) pset(x, y, sombra(cs)); };
  meseta(-20, 90, 82, hor, C.mesetaF, C.mesetaFS); meseta(150, 230, 88, hor, C.mesetaF, C.mesetaFS); meseta(250, 340, 78, hor, C.mesetaF, C.mesetaFS);
  meseta(40, 130, 92, hor + 2, C.meseta, C.mesetaS); meseta(210, 290, 96, hor + 2, C.meseta, C.mesetaS);
  // el llano: arena con vetas y piedras
  for (let y = hor; y < 180; y++) rect(0, y, 319, y, sombra(y < hor + 10 ? C.arenaS : C.arena));
  for (let k = 0; k < 120; k++) { const x = Math.round(h(k, 6, 21) * 320), y = hor + 4 + Math.round(h(k, 7, 21) * 66); pset(x, y, sombra(k % 3 ? C.arenaS : C.arenaL)); if (k % 9 === 0) { rect(x, y, x + 2, y + 1, sombra(C.piedraS)); pset(x + 1, y, sombra(C.piedra)); } }
  // matorral y yucas
  for (let k = 0; k < 28; k++) { const x = Math.round(h(k, 8, 21) * 330 - 5), y = hor + 6 + Math.round(h(k, 9, 21) ** 1.5 * 60), s = 0.6 + (y - hor) / 70, m = Math.round(Math.sin(t * 2 + k) * 0.6);
    if (k % 6 === 0) { rect(x, y - 6 * s, x, y, sombra(C.matorralS)); for (let i = -3; i <= 3; i++) R.linea(x, Math.round(y - 6 * s), x + i * 2 + m, Math.round(y - 10 * s - Math.abs(i)), sombra(C.yuca)); }
    else { R.disco(x + m, y - Math.round(2 * s), Math.round(3 * s), sombra(C.matorralS)); R.disco(x - 1 + m, y - Math.round(3 * s), Math.round(2 * s), sombra(C.matorral)); } }
  // la cerca de alambre
  for (let x = -4; x < 330; x += 22) { rect(x, 118, x + 1, 128, sombra(C.maderaS)); }
  for (const y of [120, 124]) for (let x = 0; x < 320; x++) if ((x + y) % 3) pset(x, y + Math.round(Math.sin(x * 0.14) * 0.6), sombra(C.metalS));
  // el molino que gira con el viento
  { const mx = 262, my = 74; R.linea(mx - 6, 118, mx, my, sombra(C.metalD)); R.linea(mx + 6, 118, mx, my, sombra(C.metalD)); for (let y = 82; y < 118; y += 8) R.linea(mx - 6 + (y - 74) / 44 * 0 , y, mx + 6, y, sombra(C.metalS));
    const a0 = t * 2.4; for (let k = 0; k < 8; k++) { const a = a0 + k * Math.PI / 4; R.linea(mx, my, Math.round(mx + Math.cos(a) * 10), Math.round(my + Math.sin(a) * 10), sombra(C.metal)); }
    rect(mx + 1, my - 1, mx + 12, my, sombra(C.metalD)); poligono([[mx + 12, my - 4], [mx + 16, my - 4], [mx + 16, my + 3], [mx + 12, my + 3]], sombra(C.rojo)); R.disco(mx, my, 1, sombra(C.k));
    rect(mx - 9, 112, mx + 9, 118, sombra(C.metalD)); rect(mx - 8, 113, mx + 8, 113, o.noche ? hex('#3e4680') : C.marP3); }   // el abrevadero
  // la casa del rancho con porche y el cobertizo
  if (o.casa !== false) {
    const cx = 20; poligono([[cx, 100], [cx + 30, 88], [cx + 60, 100]], sombra(C.maderaS)); rect(cx + 2, 100, cx + 58, 128, sombra(C.madera)); for (let y = 102; y < 128; y += 3) rect(cx + 2, y, cx + 58, y, sombra(C.maderaS));
    rect(cx + 8, 108, cx + 18, 116, sombra(C.k)); rect(cx + 9, 109, cx + 17, 115, o.noche ? C.oroL : C.cristal); rect(cx + 40, 110, cx + 48, 128, sombra(C.maderaD));
    rect(cx - 4, 104, cx + 64, 105, sombra(C.maderaD)); for (const px of [cx - 3, cx + 30, cx + 63]) rect(px, 105, px, 128, sombra(C.maderaD));
    R.linea(cx + 50, 88, cx + 50, 80, sombra(C.k)); if (!o.noche) { pset(cx + 50, 78 - Math.floor(t * 2) % 3, C.grisL); pset(cx + 51, 75 - Math.floor(t * 2) % 3, C.grisL); }   // humo de la chimenea
    const sx = 96; rect(sx, 108, sx + 22, 128, sombra(C.maderaS)); poligono([[sx - 2, 108], [sx + 11, 102], [sx + 24, 108]], sombra(C.metalS)); rect(sx + 6, 114, sx + 16, 128, sombra(C.maderaD));
  }
  if (o.noche) { nocturno(R, hor - 50, 179, [C.oroL]); for (let y = 129; y < 142; y++) for (let x = 26 - (y - 129); x < 40 + (y - 129) * 0.6; x++) if ((x + y) % 2 === 0) pset(Math.round(x), y, hex('#6a5a5a')); }   // la luz de la ventana en el suelo
  // los restos: tiras de papel de aluminio que destellan, palitos y trozos de goma
  if (o.restos) for (let k = 0; k < Math.round(46 * o.restos); k++) { const x = 120 + Math.round(h(k, 10, 21) * 190), y = 132 + Math.round(h(k, 11, 21) * 40), tipo = k % 4;
    if (tipo === 0) { rect(x, y, x + 3, y, C.foil); pset(x + 1, y - 1, C.foilS); if (Math.sin(t * 5 + k * 1.7) > 0.7) { pset(x + 1, y - 2, C.blanco); pset(x - 1, y, C.blanco); pset(x + 4, y, C.blanco); } }
    else if (tipo === 1) R.linea(x, y, x + 5, y - 2, C.maderaL); else if (tipo === 2) { rect(x, y, x + 1, y + 1, C.k); } else { rect(x, y, x + 2, y, C.foilS); } }
  // vida: un halcón, una planta rodadora que cruza, polvo en el viento
  if (!o.noche) { halcon(R, t, 170, 40); const u = ((t * 0.12) % 1), rx = Math.round(-20 + u * 360), ry = 160 - Math.round(Math.abs(Math.sin(t * 3)) * 4); R.disco(rx, ry, 4, sombra(C.matorralS)); for (let a = 0; a < 6; a++) pset(rx + Math.round(Math.cos(a + t * 6) * 3), ry + Math.round(Math.sin(a + t * 6) * 3), sombra(C.tierraL)); viento(R, t, { y0: 130, y1: 170 }); }
}

// el campo de los restos a ras de suelo: el llano hasta las mesetas, sembrado de tiras de aluminio que destellan y se
// mueven con el viento, trozos de goma negra, palitos claros con cinta; matas y una yuca delante
export function campoRestos(R, t, o = {}) {
  const { rect, pset, poligono, linea } = R, hor = 70;
  cielo(R, t, { hor, aves: false, sol: [260, 20, 8] });
  poligono([[-10, hor], [10, 50], [70, 50], [90, hor]], C.mesetaF); poligono([[180, hor], [196, 54], [280, 54], [300, hor]], C.mesetaF); poligono([[60, hor], [76, 58], [150, 58], [170, hor]], C.meseta);
  for (let y = hor; y < 180; y++) rect(0, y, 319, y, y < hor + 6 ? C.arenaS : C.arena);
  for (let k = 0; k < 200; k++) { const y = hor + 2 + Math.round(h(k, 1, 176) ** 1.6 * 106), x = Math.round(h(k, 2, 176) * 320); pset(x, y, k % 3 ? C.arenaS : C.arenaL); }
  // los restos, más grandes cuanto más cerca (y más abajo)
  for (let k = 0; k < 70; k++) { const f = h(k, 3, 176) ** 1.4, y = Math.round(hor + 4 + f * 104), s = 1 + f * 3, x = Math.round(h(k, 4, 176) * 330 - 5 + Math.sin(t * 2 + k) * f * 2), tipo = k % 5;
    if (tipo < 2) { const l = Math.round(3 * s), a = Math.round(Math.sin(t * 3 + k) * s * 0.5); linea(x, y, x + l, y - a, C.foil); linea(x, y + 1, x + l, y + 1 - a, C.foilS); if (Math.sin(t * 4 + k * 1.7) > 0.75) { const g = Math.round(s * 1.5); for (let r = 1; r <= g; r++) { pset(x + 1, y - r, C.blanco); pset(x + 1 + r, y, C.blanco); pset(x + 1 - r, y, C.blanco); } } }
    else if (tipo === 2) { linea(x, y, x + Math.round(5 * s), y - Math.round(2 * s), C.maderaL); rect(x + Math.round(2 * s), y - Math.round(s), x + Math.round(3 * s), y - Math.round(s) + 1, C.rosa); }
    else if (tipo === 3) rect(x, y, x + Math.round(2 * s), y + Math.round(s * 0.7), C.k);
    else { rect(x, y, x + Math.round(2 * s), y, C.matorralS); } }
  for (let k = 0; k < 4; k++) { const x = 20 + k * 90, y = 172, m = Math.round(Math.sin(t * 2 + k)); for (let i = -4; i <= 4; i++) linea(x, y, x + i * 3 + m, y - 14 - Math.abs(i) * 2, k % 2 ? C.yuca : C.matorral); }
  viento(R, t);
}
// los restos de cerca, en el suelo: una hoja de papel de aluminio arrugada que brilla, un trozo de goma negra, palitos de
// balsa con cinta adhesiva de flores; una mano coge un palito (o.coge 0–1) y lo levanta: pesa tan poco que se le escapa
// con el viento (o.vuela)
export function insertoRestos(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, C.arena); for (let k = 0; k < 900; k++) { const x = Math.round(h(k, 1, 177) * 320), y = Math.round(h(k, 2, 177) * 180); pset(x, y, k % 3 ? C.arenaS : C.arenaL); if (k % 37 === 0) disco(x, y, 2, C.piedraS); }
  for (let k = 0; k < 5; k++) { const x = 20 + k * 70, y = 20 + (k % 2) * 140; for (let i = -5; i <= 5; i++) linea(x, y, x + i * 3, y - 10 - Math.abs(i), C.matorralS); }
  aluminio(R, 108, 108, 30, t, 3); aluminio(R, 70, 48, 14, t, 5);
  poligono([[190, 120], [232, 112], [240, 132], [196, 140]], C.k); poligono([[192, 121], [230, 114], [237, 131], [198, 138]], hex('#2a2a30')); linea(196, 124, 228, 118, hex('#4a4a52'));   // la goma
  // dos palitos en el suelo y el que coge la mano
  const palito = (x0, y0, x1, y1) => { linea(x0, y0, x1, y1, C.k); linea(x0, y0 - 1, x1, y1 - 1, hex('#e8d0a0')); linea(x0, y0 - 2, x1, y1 - 2, C.k); const mx = Math.round((x0 + x1) / 2), my = Math.round((y0 + y1) / 2); rect(mx - 4, my - 3, mx + 4, my + 1, hex('#f0e0c8')); pset(mx - 2, my - 1, C.rosa); pset(mx + 2, my - 2, C.rosa); pset(mx, my - 1, C.amarillo); };
  palito(30, 150, 90, 140); palito(150, 160, 220, 168);
  const c = o.coge ?? 0, v = o.vuela ?? 0, dx = Math.round(v * 140), dy = Math.round(c * -30 - v * 40 + Math.sin(v * 8) * 6);
  palito(196 + dx, 100 + dy, 256 + dx, 88 + dy + Math.round(v * 10));
  if (c > 0 && v < 0.2) mano(R, 228, 96 + dy, -1, '#7a5a3a');
  else if (c <= 0) { const u = R.tramo(t, (o.t0 ?? 0), (o.t0 ?? 0) + 0.6); if (u > 0) mano(R, Math.round(lerp(340, 228, u)), 96, -1, '#7a5a3a'); }
}
// el cobertizo del rancho de cerca: tablas, el tejado de chapa, la puerta abierta con la oscuridad dentro y el montón de
// restos que va creciendo (o.monton 0–1); herraduras, una pala, una lámpara de aceite y heno
export function cobertizo(R, t, o = {}) {
  const { rect, pset, poligono, disco, linea } = R;
  cielo(R, t, { hor: 120, aves: false });
  rect(0, 120, 319, 179, C.arena); for (let k = 0; k < 120; k++) pset(Math.round(h(k, 1, 178) * 320), 122 + Math.round(h(k, 2, 178) * 56), k % 2 ? C.arenaS : C.arenaL);
  poligono([[40, 40], [160, 14], [280, 40]], C.metalS); for (let x = 44; x < 278; x += 6) linea(x, 40 - Math.round((140 - Math.abs(x - 160)) * 0.22), x, 40, C.metal); rect(36, 40, 284, 43, C.k);
  rect(46, 43, 274, 150, C.madera); for (let x = 46; x < 274; x += 9) { rect(x, 43, x, 150, C.maderaS); for (let y = 50; y < 150; y += 30) pset(x + 4, y + (x % 5), C.maderaD); }
  rect(120, 60, 200, 150, C.k); rect(122, 62, 198, 150, hex('#2a1e16'));   // la puerta abierta, oscura
  for (let y = 120; y < 150; y++) for (let x = 124; x < 196; x++) if (h(x >> 1, y >> 1, 179) < 0.3) pset(x, y, C.pajaS);   // heno
  rect(200, 62, 230, 150, C.k); rect(201, 63, 229, 149, C.maderaL); for (let y = 66; y < 150; y += 8) rect(201, y, 229, y, C.madera); linea(203, 64, 227, 146, C.maderaS);   // la hoja de la puerta
  // el montón de restos dentro, que crece
  const m = o.monton ?? 0; for (let k = 0; k < Math.round(30 * m); k++) { const x = 140 + Math.round(h(k, 3, 179) * 40), y = 148 - Math.round(h(k, 4, 179) * 14 * m); if (k % 3) { rect(x, y, x + 4, y, C.foil); if (Math.sin(t * 4 + k) > 0.8) pset(x + 2, y - 1, C.blanco); } else linea(x, y, x + 6, y - 2, C.maderaL); }
  // herraduras, la pala y la lámpara de aceite
  for (let k = 0; k < 3; k++) { const x = 70 + k * 14, y = 76; for (let a = 0; a < 3.3; a += 0.3) pset(Math.round(x + Math.cos(a) * 4), Math.round(y - Math.sin(a) * 5), C.metalD); }
  linea(250, 70, 262, 148, C.maderaD); poligono([[258, 140], [268, 140], [266, 150], [258, 150]], C.metalS);
  rect(96, 96, 100, 104, C.k); rect(97, 97, 99, 103, C.oroL); disco(98, 95, 2, C.metalD);
  rect(60, 150, 260, 151, C.maderaD);
}
// la carretera de tierra hacia Roswell: postes del telégrafo, la señal con la flecha y «75», mesetas y polvo
export function carreteraRoswell(R, t, o = {}) {
  const { rect, pset, poligono, linea } = R, hor = 96;
  cielo(R, t, { hor, aves: false, sol: [70, 26, 8] });
  poligono([[150, hor], [170, 74], [260, 74], [280, hor]], C.mesetaF); poligono([[-20, hor], [0, 80], [60, 80], [80, hor]], C.mesetaF);
  // el pueblo al fondo: el depósito de agua y unas casas
  rect(286, 78, 296, 86, C.metalS); rect(290, 86, 291, hor, C.metalD); rect(286, 77, 296, 78, C.metalD); for (let k = 0; k < 4; k++) rect(262 + k * 8, 90 - (k % 2) * 2, 268 + k * 8, hor, hex('#c8b8a0'));
  rect(0, hor, 319, 179, C.arena); for (let k = 0; k < 150; k++) pset(Math.round(h(k, 1, 180) * 320), hor + 2 + Math.round(h(k, 2, 180) * 80), k % 2 ? C.arenaS : C.arenaL);
  poligono([[0, 150], [319, 104], [319, 112], [0, 172]], C.camino); for (let k = 0; k < 40; k++) { const x = k * 8, y = Math.round(161 - x * 0.16); pset(x, y + (k % 3), C.caminoS); }
  for (let k = 0; k < 6; k++) { const x = 30 + k * 56, y = Math.round(140 - x * 0.14), a = 40 - k * 3; rect(x, y - a, x + 1, y, C.maderaD); rect(x - 4, y - a, x + 5, y - a + 1, C.maderaD); if (k < 5) linea(x, y - a + 1, x + 56, Math.round(140 - (x + 56) * 0.14) - (a - 3) + 1, C.k); }
  // la señal: una flecha hacia el pueblo y el número de millas
  rect(214, 104, 215, 124, C.maderaD); rect(198, 98, 232, 108, C.k); rect(199, 99, 231, 107, C.blanco); R.numero('75', 210, 106, { color: C.k, sombra: false, centro: true }); poligono([[222, 101], [229, 103], [222, 106]], C.k);
  for (let k = 0; k < 10; k++) { const x = Math.round(h(k, 3, 180) * 320), y = 120 + Math.round(h(k, 4, 180) * 56); R.disco(x, y, 2, C.matorralS); R.disco(x - 1, y - 1, 1, C.matorral); }
  if (o.polvo != null) for (let k = 0; k < 16; k++) { const u = (t * 2 + k / 16) % 1, x = Math.round(o.polvo - 10 - u * 50 - k), y = Math.round(150 - (o.polvo - 10 - u * 50) * 0.14 - u * 14 + Math.sin(k) * 3); R.disco(x, y, 2 + Math.round(u * 4), u > 0.6 ? C.arenaL : C.caminoL); }
}

// el tren de globos del Proyecto Mogul: globos blancos en fila por un cable, con reflectores de radar y el micrófono
export function mogul(R, x, yBase, t, p = 1) {
  const n = 12, alto = 150;
  for (let k = 0; k < n; k++) {
    const f = k / (n - 1), y = Math.round(yBase - f * alto * p), xx = Math.round(x + Math.sin(t * 0.8 + f * 3) * 4 * f);
    if (k > 0) { const fp = (k - 1) / (n - 1), yp = Math.round(yBase - fp * alto * p), xp = Math.round(x + Math.sin(t * 0.8 + fp * 3) * 4 * fp); R.linea(xp, yp, xx, y, C.grisL); }
    if (k === 0) { rect(xx - 2, y - 3, xx + 2, y, C.k); R.rect(xx - 1, y - 2, xx + 1, y - 1, C.metalS); continue; }   // el micrófono
    if (k % 4 === 2) { poligono([[xx, y - 4], [xx - 4, y], [xx, y + 4], [xx + 4, y]], C.foil); pset(xx, y, C.blanco); continue; }   // reflector de radar
    R.disco(xx, y - 3, 4, C.k); R.disco(xx, y - 3, 3, C.blanco); pset(xx - 1, y - 5, C.nieveM);
  }
  function rect(a, b, c, d, col) { R.rect(a, b, c, d, col); }
  function poligono(p, c) { R.poligono(p, c); }
  function pset(a, b, c) { R.pset(a, b, c); }
}

// la camioneta de los cuarenta, de lado (mirando a la derecha), con caja atrás; o.carga: restos en la caja
export function camioneta(R, x, suelo, t, o = {}) {
  const dir = o.dir ?? 1, X = (u) => Math.round(x + u * dir), b = o.anda ? Math.floor(t * 8) % 2 : 0, y = suelo - b;
  const verde = hex('#4a6a8a'), verdeS = hex('#34506e');
  R.poligono([[X(-22), y - 8], [X(2), y - 8], [X(4), y - 18], [X(14), y - 18], [X(18), y - 10], [X(26), y - 9], [X(26), y - 3], [X(-22), y - 3]], C.k);
  R.poligono([[X(-21), y - 7], [X(3), y - 7], [X(5), y - 17], [X(13), y - 17], [X(17), y - 9], [X(25), y - 8], [X(25), y - 4], [X(-21), y - 4]], verde);
  R.rect(Math.min(X(6), X(12)), y - 15, Math.max(X(6), X(12)), y - 11, C.vidrioL); R.rect(Math.min(X(-21), X(2)), y - 5, Math.max(X(-21), X(2)), y - 4, verdeS);
  R.pset(X(25), y - 7, C.oroL);
  if (o.carga) for (let k = 0; k < 6; k++) R.pset(X(-18 + k * 3), y - 9 - (k % 2), k % 2 ? C.foil : C.maderaL);
  for (const u of [-14, 16]) { R.disco(X(u), y - 2, 4, C.k); R.disco(X(u), y - 2, 2, C.metalS); R.pset(X(u) + (Math.floor(t * 10) % 2 ? 1 : -1), y - 2, C.k); }
  if (o.anda) for (let k = 0; k < 6; k++) { const px = X(-26 - k * 4) , py = suelo - 2 - Math.round(h(k, Math.floor(t * 8), 30) * 4); R.disco(px, py, 1 + (k > 2 ? 1 : 0), C.arenaL); }   // polvareda
}

// un periódico que vuela con el viento, con un platillo dibujado en primera página (sin palabras)
export function periodico(R, x, y, t) {
  const a = Math.sin(t * 5) > 0;
  R.rect(x - 10, y - 7, x + 10, y + 7, C.k); R.rect(x - 9, y - 6, x + 9, y + 6, C.papel); R.rect(x - 9, y - 6, x + 9, y - 4, C.k);
  R.rect(x - 6, y, x + 6, y + 1, C.metalS); R.rect(x - 3, y - 2, x + 3, y - 1, C.vidrioL);
  for (let k = 0; k < 3; k++) R.rect(x - 8, y + 3 + k, x + (k === 2 ? 2 : 8), y + 3 + k, C.grisL);
  if (a) R.rect(x + 9, y - 6, x + 10, y + 6, C.papelS);
}

// ── el despacho de los años cuarenta y cincuenta (el general en 1947, el Libro Azul después) ────────────────────────
// Luz que entra por la persiana con motas de polvo, zócalo de madera, linóleo, tablón de corcho con fotos borrosas,
// puerta de cristal esmerilado (a veces pasa una silueta), perchero, radiador, fuente de agua, un compañero que teclea al
// fondo, ventilador de techo que mueve los papeles, humo del café y del cenicero.
// o.tono: 'madera' (Roswell) o 'verde' (Libro Azul); o.mapa; o.carpetas (0–1); o.bandera; o.apagado; o.luz; o.reloj;
// o.mesa (false: el escritorio se pinta aparte con mesaDespacho, después de los personajes, que quedan sentados detrás);
// o.companero (false para quitarlo); o.corcho
export function despacho(R, t, o = {}) {
  const { rect, pset, poligono, disco } = R, oscuro = o.apagado, verde = o.tono === 'verde' || o.mapa;
  const pared = oscuro ? hex('#262a36') : verde ? hex('#a8b494') : C.pared, paredS = oscuro ? hex('#20232e') : verde ? hex('#96a282') : C.paredS;
  rect(0, 0, 319, 140, pared);
  for (let y = 6; y < 100; y += 4) for (let x = (y * 7) % 11; x < 320; x += 11) if (h(x, y, 100) < 0.3) pset(x, y, paredS);   // textura del yeso
  rect(0, 0, 319, 5, paredS); rect(0, 5, 319, 5, oscuro ? hex('#1a1c24') : C.maderaD);   // moldura del techo
  // zócalo de madera con cuarterones
  rect(0, 100, 319, 140, oscuro ? hex('#2a2224') : C.maderaS); rect(0, 100, 319, 101, oscuro ? hex('#3a2e2e') : C.maderaL);
  for (let x = 4; x < 320; x += 26) { rect(x, 106, x + 20, 134, oscuro ? hex('#221c1e') : C.maderaD); rect(x + 1, 107, x + 19, 133, oscuro ? hex('#2a2224') : C.madera); }
  // suelo: linóleo a cuadros (Libro Azul) o tablones (Roswell)
  for (let y = 140; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, oscuro ? ((x >> 3) + (y >> 3)) % 2 ? hex('#22242c') : hex('#2a2c34') : verde ? ((x >> 3) + (y >> 3)) % 2 ? hex('#d8d0b8') : hex('#3a3a46') : (y % 6 === 0 ? C.maderaD : C.maderaS));
  // ventana con persiana: fuera, la base; la luz entra en rayos hasta el suelo, con motas de polvo que flotan
  rect(14, 18, 92, 86, C.k); rect(16, 20, 90, 84, oscuro ? C.noche2 : C.cielo2);
  if (!oscuro) { rect(16, 66, 90, 84, C.arena); rect(32, 54, 72, 66, C.metal); poligono([[32, 54], [52, 46], [72, 54]], C.metalL); const ax = Math.round(((t * 18) % 140) - 20); if (ax > 16 && ax < 84) { rect(ax, 34, ax + 6, 35, C.metalS); pset(ax + 3, 33, C.metalS); } }
  else for (let k = 0; k < 8; k++) pset(20 + k * 9, 24 + (k * 7) % 30, C.blanco);
  for (let y = 22; y < 84; y += 4) rect(16, y, 90, y + 1, oscuro ? hex('#3a3a50') : C.papelS);
  rect(52, 20, 52, 84, C.k); R.linea(88, 20, 88, 70, C.k); disco(88, 72, 1, C.oro);   // cordón de la persiana
  if (!oscuro) for (let k = 0; k < 7; k++) { for (let i = 0; i < 70; i++) { const x = 30 + k * 9 + i, y = 86 + i; if (y > 179) break; if ((x + y) % 3 === 0) { const c = R.pget(x, y); if (c !== C.k) pset(x, y, verde ? hex('#e8e4c0') : C.paredL ?? C.oroL); } } }
  if (!oscuro) for (let k = 0; k < 14; k++) { const x = Math.round(70 + h(k, 1, 101) * 60 + Math.sin(t * 0.5 + k) * 4), y = Math.round(100 + h(k, 2, 101) * 70 + Math.sin(t * 0.3 + k * 2) * 3); if (Math.sin(t + k) > -0.2) pset(x, y, C.blanco); }
  // radiador bajo la ventana
  if (o.companero === false || oscuro) { rect(22, 118, 84, 138, C.k); for (let x = 24; x < 84; x += 4) rect(x, 119, x + 2, 137, C.metalS); }
  // reloj de pared con segundero y un calendario con el año
  if (o.reloj !== false) { disco(120, 26, 10, C.k); disco(120, 26, 9, C.papel); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(120 + Math.cos(a) * 7), Math.round(26 + Math.sin(a) * 7), C.k); } R.linea(120, 26, 120 + Math.round(Math.cos(t * 0.05) * 5), 26 + Math.round(Math.sin(t * 0.05) * 5), C.k); const sg = Math.floor(t) * Math.PI / 30 - Math.PI / 2; R.linea(120, 26, 120 + Math.round(Math.cos(sg) * 8), 26 + Math.round(Math.sin(sg) * 8), C.rojo); }
  if (o.anio) { rect(104, 44, 136, 70, C.k); rect(105, 45, 135, 69, C.blanco); rect(105, 45, 135, 50, C.rojo); R.numero(String(o.anio), 120, 64, { centro: true, color: C.k, sombra: false }); }
  // tablón de corcho con fotos borrosas de ovnis y un hilo rojo que las une (Libro Azul)
  if (o.corcho ?? verde) { rect(142, 16, 214, 60, C.k); rect(143, 17, 213, 59, hex('#b88a5a')); for (let k = 0; k < 40; k++) pset(144 + Math.round(h(k, 3, 101) * 68), 18 + Math.round(h(k, 4, 101) * 40), hex('#9a7048'));
    const F = [[150, 22], [170, 34], [194, 22], [182, 46], [156, 44]]; for (let k = 0; k < F.length - 1; k++) R.linea(F[k][0] + 5, F[k][1] + 4, F[k + 1][0] + 5, F[k + 1][1] + 4, C.rojo);
    for (const [x, y] of F) { rect(x, y, x + 12, y + 9, C.blanco); rect(x + 1, y + 1, x + 11, y + 8, hex('#7a7e8a')); rect(x + 4, y + 4, x + 8, y + 5, hex('#c8ccd4')); pset(x + 6, y, C.rojo); } }
  // mapa de EE. UU. con chinchetas (Libro Azul)
  if (o.mapa) { rect(222, 16, 300, 60, C.k); rect(223, 17, 299, 59, C.papel); const P = (lon, lat) => [Math.round(225 + (lon + 126) / 60 * 72), Math.round(19 + (50 - lat) / 26 * 38)];
    poligono(EEUU_POL.map(([a, b]) => P(a, b)), C.verdeL); for (let k = 0; k < 18; k++) { const x = 232 + Math.round(h(k, 1, 40) * 58), y = 24 + Math.round(h(k, 2, 40) * 28); if (R.pget(x, y) === C.verdeL) { pset(x, y, k % 3 ? C.rojo : C.azul); pset(x, y - 1, C.k); } } }
  // bandera
  if (o.bandera !== false && !o.mapa) { rect(222, 26, 223, 140, C.oroS); const ondea = Math.round(Math.sin(t * 2) * 1); for (let j = 0; j < 13; j++) rect(224, 28 + j * 2 + (j % 2 ? ondea : 0), 246, 29 + j * 2 + (j % 2 ? ondea : 0), j % 2 ? C.blanco : C.rojo); rect(224, 28, 234, 41, C.azul); for (let k = 0; k < 6; k++) pset(226 + (k % 3) * 3, 30 + Math.floor(k / 3) * 5, C.blanco); }
  // archivadores, uno con el cajón abierto lleno de carpetas
  for (let k = 0; k < 2; k++) { const x = 264 + k * 26; rect(x, 76, x + 24, 140, C.k); rect(x + 1, 77, x + 23, 139, C.metalS); for (let j = 0; j < 4; j++) { rect(x + 3, 80 + j * 15, x + 21, 91 + j * 15, C.metal); rect(x + 9, 84 + j * 15, x + 15, 85 + j * 15, C.k); } }
  rect(262, 110, 290, 118, C.k); rect(263, 111, 289, 117, C.metal); for (let i = 0; i < 6; i++) rect(265 + i * 4, 106 - (i % 2), 267 + i * 4, 111, i % 2 ? C.papel : C.ocre);
  // puerta con cristal esmerilado: a veces pasa la silueta de alguien por el pasillo
  if (!o.mapa) { rect(250, 40, 262, 140, C.maderaD); } else { rect(150, 66, 186, 140, C.k); rect(151, 67, 185, 139, C.madera); rect(155, 71, 181, 98, hex('#d8dcd0')); disco(181, 116, 1, C.oro); const u = (t * 0.12) % 1; if (u < 0.3) { const sx = Math.round(150 + u / 0.3 * 40); for (let y = 76; y < 98; y++) for (let x = sx - 4; x < sx + 4; x++) if (x > 155 && x < 181 && (y > 80 || Math.abs(x - sx) < 3)) pset(x, y, hex('#a8aca0')); } }
  // perchero con sombrero y gabardina, y la fuente de agua con su burbuja
  rect(110, 96, 111, 140, C.maderaD); rect(104, 138, 117, 140, C.maderaD); rect(103, 94, 118, 96, C.maderaD); rect(103, 92, 109, 94, hex('#4a4a5a')); rect(112, 97, 117, 120, hex('#8a7a5a'));
  rect(126, 104, 136, 140, C.k); rect(127, 105, 135, 139, C.blanco); rect(126, 88, 136, 104, C.k); rect(127, 89, 135, 103, hex('#a8d0f0')); { const b = (t * 0.7) % 1; if (b < 0.6) pset(131, 102 - Math.round(b * 20), C.blanco); }
  // ventilador de techo y lámpara
  { rect(160, 0, 161, 8, C.k); const a = t * 9; for (let k = 0; k < 3; k++) { const ang = a + k * 2.09; R.linea(160, 9, Math.round(160 + Math.cos(ang) * 18), 9 + Math.round(Math.sin(ang) * 2), C.maderaD); } disco(160, 9, 2, C.k); }
  // un compañero al fondo que teclea, sentado en su mesa pequeña
  if (o.companero !== false && !oscuro) { R.actor(EL_OV.oficinista, 46, 136, t + 3, { dir: 1, habla: false, quieto: true }); rect(56, 124, 84, 128, C.k); rect(57, 125, 83, 127, C.madera); rect(58, 128, 60, 140, C.maderaD); rect(80, 128, 82, 140, C.maderaD); rect(64, 119, 76, 124, C.metalD); if (Math.floor(t * 8) % 2) pset(66 + Math.floor(t * 8) % 8, 122, C.metalL); }
  if (o.mesa !== false) mesaDespacho(R, t, o);
  // montañas de carpetas en el suelo
  if (o.carpetas) for (let k = 0; k < Math.round(60 * o.carpetas); k++) { const col = k % 6, fila = Math.floor(k / 6), x = 6 + col * 30 + (fila % 2) * 4, y = 176 - fila * 4; if (x > 100 && x < 214 && y > 140) continue; rect(x, y - 3, x + 18, y, C.k); rect(x + 1, y - 2, x + 17, y - 1, fila % 3 ? C.papel : C.ocre); }
  // papeles que el ventilador levanta de vez en cuando
  if (!oscuro && (t % 9) < 2.2) { const u = (t % 9) / 2.2; for (let k = 0; k < 3; k++) { const x = Math.round(130 + u * 60 + k * 10), y = Math.round(112 - Math.sin(u * Math.PI) * (16 + k * 4)); rect(x, y, x + 4, y + 2, C.blanco); pset(x + 4, y + 1, C.papelS); } }
}

// el escritorio del despacho, por delante de quien está sentado: teléfono de disco, lámpara con su cono de luz, máquina de
// escribir con el papel, bandejas, cenicero humeante, taza de café con vapor y la placa con el nombre (sin letras)
export function mesaDespacho(R, t, o = {}) {
  const { rect, pset, poligono, disco } = R, oscuro = o.apagado, x0 = o.x0 ?? 110;
  rect(x0, 122, x0 + 100, 150, C.k); rect(x0 + 1, 123, x0 + 99, 149, C.madera); rect(x0 + 1, 123, x0 + 99, 125, C.maderaL); for (let x = x0 + 4; x < x0 + 98; x += 12) rect(x, 128, x + 8, 128, C.maderaS);
  rect(x0 + 10, 132, x0 + 30, 149, C.maderaS); rect(x0 + 70, 132, x0 + 90, 149, C.maderaS); disco(x0 + 20, 140, 1, C.oro); disco(x0 + 80, 140, 1, C.oro);
  // teléfono de disco
  const suena = o.suena && Math.floor(t * 8) % 2; rect(x0 + 6, 114 - (suena ? 1 : 0), x0 + 18, 122, C.k); rect(x0 + 7, 115 - (suena ? 1 : 0), x0 + 17, 121, hex('#2a2430')); disco(x0 + 12, 118, 2, C.metalS); if (!o.colgado) R.linea(x0 + 6, 113, x0 + 18, 113, C.k);
  // bandejas de papeles, cenicero con humo, taza con vapor
  rect(x0 + 24, 116, x0 + 40, 122, C.k); rect(x0 + 25, 117, x0 + 39, 121, C.oroS); rect(x0 + 26, 115, x0 + 38, 116, C.papel);
  rect(x0 + 74, 119, x0 + 80, 122, C.metalD); if (!oscuro) for (let k = 0; k < 6; k++) pset(x0 + 77 + Math.round(Math.sin(t * 2 + k) * 1.5), 117 - k * 2 - Math.floor(t * 4) % 2, C.grisL);
  rect(x0 + 84, 115, x0 + 90, 122, C.k); rect(x0 + 85, 116, x0 + 89, 121, C.blanco); rect(x0 + 90, 117, x0 + 91, 119, C.k); if (!oscuro) for (let k = 0; k < 4; k++) pset(x0 + 87 + Math.round(Math.sin(t * 3 + k)), 113 - k * 2, C.grisL);
  // máquina de escribir con el papel que sube al teclear
  rect(x0 + 44, 114, x0 + 66, 122, C.k); rect(x0 + 45, 115, x0 + 65, 121, C.metalD); for (let i = 0; i < 5; i++) pset(x0 + 47 + i * 4, 119, C.metalL); const papel = 6 + Math.floor((o.teclea ? t * 3 : 0) % 6); rect(x0 + 48, 114 - papel, x0 + 62, 114, C.papel); for (let j = 1; j < papel; j += 2) rect(x0 + 50, 114 - j, x0 + 58, 114 - j, C.grisL);
  // lámpara verde de banquero con su cono de luz
  rect(x0 + 94, 108, x0 + 95, 122, C.metalD); poligono([[x0 + 88, 108], [x0 + 101, 108], [x0 + 98, 103], [x0 + 91, 103]], C.verde);
  if (!oscuro || o.luz) for (let y = 109; y < 122; y++) for (let x = x0 + 86 - (y - 109) / 2; x < x0 + 104 + (y - 109) / 2; x++) if ((x + y) % 2 && R.pget(Math.round(x), y) === C.madera) pset(Math.round(x), y, C.maderaL);
  rect(x0 + 40, 140, x0 + 60, 143, C.oroS);   // la placa
}

// ── insertos de objetos (planos de detalle: nunca de personajes) ─────────────────────────────────────────────────────
// la mesa de cerca, con un objeto grande en el centro; fondo desenfocado (la pared en bloques)
function mesaCerca(R, t, oscuro, tono = 'verde') { fondoDesenfocado(R, t, oscuro, tono); tablero2(R, 110, oscuro); }
// el despacho desenfocado detrás de un plano de detalle: la ventana brillante con la persiana, la bandera o el corcho, el
// archivador y la lámpara, en manchas grandes y suaves; motas de polvo que brillan en la luz
export function fondoDesenfocado(R, t, oscuro, tono = 'verde') {
  const { rect, pset, disco } = R, pared = oscuro ? hex('#262a36') : tono === 'verde' ? hex('#a8b494') : C.pared, pS = oscuro ? hex('#20232e') : tono === 'verde' ? hex('#9aa688') : C.paredS;
  rect(0, 0, 319, 179, pared); for (let y = 0; y < 180; y += 3) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 108) < 0.25) pset(x, y, pS);
  if (!oscuro) { for (let y = 10; y < 80; y++) for (let x = 20; x < 110; x++) { const d = Math.max(Math.abs(x - 65) / 45, Math.abs(y - 45) / 35); if (d < 1) pset(x, y, (y >> 2) % 2 ? hex('#e8f0f4') : hex('#c8dce8')); }
    if (tono === 'verde') rect(160, 14, 250, 70, hex('#b8925e')); else for (let j = 0; j < 7; j++) rect(170, 14 + j * 6, 230, 17 + j * 6, j % 2 ? hex('#e8d8d0') : hex('#c86a5a'));
    rect(262, 40, 310, 110, hex('#8a92a0')); disco(300, 20, 12, hex('#e8d090'));
    for (let k = 0; k < 16; k++) { const x = Math.round(30 + h(k, 1, 109) * 120 + Math.sin(t * 0.4 + k) * 5), y = Math.round(20 + h(k, 2, 109) * 80 + Math.sin(t * 0.3 + k) * 4); if (Math.sin(t * 1.3 + k) > 0) { pset(x, y, C.blanco); pset(x + 1, y, hex('#f4f0e0')); } } }
}
function tablero2(R, y0, oscuro) {
  const { rect, pset } = R;
  for (let y = y0; y < 180; y++) rect(0, y, 319, y, oscuro ? hex('#2a2224') : C.madera);
  for (let k = 0; k < 26; k++) { const y = y0 + 4 + Math.round(h(k, 1, 110) * 66); for (let x = 0; x < 320; x++) if (h(x >> 4, k, 111) < 0.7 && (x + k * 13) % 37 < 26) pset(x, y + Math.round(Math.sin(x * 0.05 + k) * 1), oscuro ? hex('#221c1e') : C.maderaS); }
  rect(0, y0, 319, y0 + 2, oscuro ? hex('#3a2e2e') : C.maderaL);
}
// una mano dibujada a mano (dorso, cuatro dedos y pulgar), con la manga; dir 1 entra desde la izquierda
const MANO = [
  '.....kkkkkk...',
  '....kSSSSSSkk.',
  'kkkkSSSSSSSSSk',
  'MMMkSSSSSSSSSk',
  'MMMkSSSSSSSssk',
  'MMMkSSSSSSssk.',
  'kkkkkSSSSskk..',
  '.....kkkkk....',
];
// la mano que baja (dedos hacia abajo), con el brazo que sale de (x0, y0): para coger algo del suelo
const MANO_ABAJO = MANO[0].split('').map((_, i) => MANO.map((f) => f[i]).join(''));
export function manoBaja(R, x0, y0, x, y, manga = '#5e6a44') {
  const n = Math.max(1, Math.ceil(Math.hypot(x - x0, y - y0))); for (let i = 0; i <= n; i++) { const px = Math.round(x0 + (x - x0) * i / n), py = Math.round(y0 + (y - 4 - y0) * i / n); R.rect(px - 3, py, px + 3, py, C.k); R.rect(px - 2, py, px + 2, py, hex(manga)); }
  R.dibujo(MANO_ABAJO, Math.round(x - 4), Math.round(y - 4), 1, { k: C.k, S: hex('#f6c290'), s: hex('#d48a5a'), M: hex(manga) });
}
export function mano(R, x, y, dir = 1, manga = '#5e6a44') {
  R.dibujo(MANO, Math.round(x - (dir > 0 ? 3 : 10)), Math.round(y - 4), dir, { k: C.k, S: hex('#f6c290'), s: hex('#d48a5a'), M: hex(manga) });
  const mx = dir > 0 ? x - 3 : x + 3; R.rect(Math.min(mx, mx - dir * 40), Math.round(y - 2), Math.max(mx, mx - dir * 40), Math.round(y + 2), hex(manga)); R.rect(Math.min(mx, mx - dir * 40), Math.round(y - 3), Math.max(mx, mx - dir * 40), Math.round(y - 3), C.k); R.rect(Math.min(mx, mx - dir * 40), Math.round(y + 3), Math.max(mx, mx - dir * 40), Math.round(y + 3), C.k);
}
// papel de aluminio arrugado: un polígono irregular con facetas de luz y sombra y brillos
export function aluminio(R, cx, cy, s, t, k = 0) {
  const P = []; for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2, r = s * (0.6 + 0.4 * h(i, k, 112)); P.push([Math.round(cx + Math.cos(a) * r * 1.4), Math.round(cy + Math.sin(a) * r * 0.6)]); }
  R.poligono(P.map(([x, y]) => [x + 1, y + 1]), C.k); R.poligono(P, C.foil);
  for (let i = 0; i < 5; i++) { const a = h(i, k, 113) * 6.28, r = s * 0.6 * h(i, k, 114); R.poligono([[cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.5], [cx + Math.cos(a + 0.8) * r * 0.5, cy + Math.sin(a + 0.8) * r * 0.3], [cx + Math.cos(a + 0.4) * s * 0.9, cy + Math.sin(a + 0.4) * s * 0.5]].map(([x, y]) => [Math.round(x), Math.round(y)]), i % 2 ? C.foilS : C.blanco); }
  if (Math.sin(t * 4 + k) > 0.7) { const gx = cx + Math.round(s * 0.3), gy = cy - Math.round(s * 0.2); R.pset(gx, gy, C.blanco); for (let r = 1; r < 4; r++) { R.pset(gx + r, gy, C.blanco); R.pset(gx - r, gy, C.blanco); R.pset(gx, gy + r, C.blanco); R.pset(gx, gy - r, C.blanco); } }
}
// el teléfono de disco, grande: o.suena (vibra y el auricular salta), o.mano (una mano lo descuelga o cuelga: 0–1)
export function insertoTelefono(R, t, o = {}) {
  mesaCerca(R, t); const { rect, disco, pset } = R, v = o.suena ? Math.round(Math.sin(t * 60) * 1.5) : 0, x = 160 + v, y = 120;
  rect(x - 46, y - 16, x + 46, y + 30, C.k); rect(x - 44, y - 14, x + 44, y + 28, hex('#2a2430')); rect(x - 40, y - 12, x + 40, y - 8, hex('#3a3446'));
  disco(x, y + 8, 18, C.k); disco(x, y + 8, 17, C.metal); for (let k = 0; k < 10; k++) { const a = k * 0.55 - 1.2; disco(Math.round(x + Math.cos(a) * 11), Math.round(y + 8 + Math.sin(a) * 11), 2, C.k); } disco(x, y + 8, 5, C.blanco);
  const sube = (o.suena ? Math.abs(Math.sin(t * 30)) * 3 : 0) + (o.mano ?? 0) * 40, hy = Math.round(y - 22 - sube);
  rect(x - 52, hy, x + 52, hy + 8, C.k); rect(x - 50, hy + 1, x + 50, hy + 7, hex('#2a2430')); rect(x - 54, hy - 4, x - 36, hy + 10, C.k); rect(x + 36, hy - 4, x + 54, hy + 10, C.k);
  if (o.mano) { rect(x + 40, hy - 14, x + 64, hy + 2, C.k); rect(x + 41, hy - 13, x + 63, hy + 1, hex('#f6c290')); rect(x + 64, hy - 10, x + 90, hy - 2, C.k); rect(x + 64, hy - 9, x + 90, hy - 3, hex('#4a5a8a')); }
  R.linea(x - 46, y + 20, x - 80, y + 40, C.k); R.linea(x - 80, y + 40, x - 140, y + 36, C.k);
  if (o.suena && Math.floor(t * 4) % 2) for (const [dx, dy] of [[-62, -30], [-70, -20], [62, -30], [70, -20]]) { R.linea(x + dx, y + dy, x + dx + Math.sign(dx) * 8, y + dy - 6, C.k); }
}
// una carpeta abierta: foto borrosa sujeta con un clip, hojas mecanografiadas, y un sello que cae (o.sello: 0–1, «?» o «✓»)
export function insertoCarpeta(R, t, o = {}) {
  mesaCerca(R, t, o.apagado); const { rect, pset, disco } = R;
  rect(60, 64, 260, 170, C.k); rect(61, 65, 259, 169, C.ocre); rect(62, 66, 158, 168, C.papel); rect(162, 66, 258, 168, C.papel);
  rect(74, 80, 146, 128, C.blanco); rect(76, 82, 144, 126, hex('#6a6e7a')); for (let y = 84; y < 126; y++) for (let x = 78; x < 144; x++) if (h(x, y, 102) < 0.15) pset(x, y, hex('#7a7e8a'));
  for (let j = -3; j <= 3; j++) for (let i = -12; i <= 12; i++) if ((i / 12) ** 2 + (j / 3.5) ** 2 < 1) pset(110 + i + (o.forma ?? 0), 104 + j, h(i, j, 103) < 0.6 ? hex('#d8dce4') : hex('#a8acb8'));
  rect(84, 78, 88, 90, C.metalL); rect(85, 78, 85, 90, C.metalS);   // el clip
  for (let k = 0; k < 12; k++) rect(172, 80 + k * 7, 172 + 60 + Math.round(h(k, 1, 104) * 20), 81 + k * 7, C.grisL);
  for (let k = 0; k < 5; k++) rect(74, 136 + k * 6, 74 + 50 + Math.round(h(k, 2, 104) * 20), 137 + k * 6, C.grisL);
  const s = o.sello ?? 0; if (s > 0) { const y = Math.round(150 - (1 - Math.min(1, s * 1.4)) * 80); if (s < 0.75) { rect(196, y - 50, 220, y - 14, C.k); rect(197, y - 49, 219, y - 15, C.maderaS); rect(192, y - 14, 224, y, C.k); rect(193, y - 13, 223, y - 1, C.maderaD); } else { if ((o.marca ?? '?') === '?') R.icono('?', 200, 136, C.rojo, C.papel, 3); else visto(R, 196, 136, 3); } }
}
// la máquina de escribir de cerca: las teclas suben y bajan y en el papel sale una cifra (o.cifra)
export function insertoMaquina(R, t, o = {}) {
  mesaCerca(R, t); const { rect, pset } = R;
  rect(90, 54, 230, 104, C.k); rect(92, 56, 228, 102, C.papel); for (let k = 0; k < 4; k++) rect(104, 64 + k * 6, 200 - k * 10, 65 + k * 6, C.grisL);
  if (o.cifra) R.numero(o.cifra, 160, 96, { centro: true, color: C.k, sombra: false, tam: 16 });
  rect(70, 100, 250, 116, C.k); rect(72, 102, 248, 114, C.metalD); rect(60, 104, 72, 110, C.metalS); rect(248, 104, 260, 110, C.metalS);
  rect(60, 116, 260, 178, C.k); rect(62, 118, 258, 176, hex('#3a3e4a'));
  for (let f = 0; f < 4; f++) for (let k = 0; k < 10 - (f % 2); k++) { const x = 76 + k * 18 + (f % 2) * 9, y = 126 + f * 12, baja = h(k, f, Math.floor(t * 9)) < 0.12 ? 2 : 0; R.disco(x, y + baja, 5, C.k); R.disco(x, y + baja, 4, C.metalL); pset(x - 1, y - 1 + baja, C.blanco); }
}

// ── D · Washington de noche, 1952 ───────────────────────────────────────────────────────────────────────────────────
// La ciudad con el Capitolio iluminado, el obelisco con su luz roja, la Casa Blanca, el Potomac con los reflejos y
// ventanas que se encienden y apagan. o.hor: línea del río
export function washington(R, t, o = {}) {
  const { rect, pset, poligono, disco } = R, hor = o.hor ?? 120;
  for (let y = 0; y < hor; y++) rect(0, y, 319, y, y < 50 ? C.noche1 : y < 95 ? C.noche2 : C.noche3);
  for (let k = 0; k < 70; k++) { const x = Math.round(h(k, 1, 50) * 320), y = Math.round(h(k, 2, 50) * 80); pset(x, y, Math.sin(t * 2 + k) > 0.5 ? C.blanco : C.grisL); }
  disco(60, 30, 7, hex('#e8e0c8')); disco(60, 30, 6, C.papel); disco(62, 28, 1, C.papelS);
  // edificios del fondo, con ventanas encendidas que cambian
  for (let k = 0; k < 22; k++) { const x = k * 15 - 4, w = 10 + Math.round(h(k, 3, 50) * 8), alto = 14 + Math.round(h(k, 4, 50) * 22); rect(x, hor - alto, x + w, hor, hex('#232a50'));
    for (let j = hor - alto + 3; j < hor - 2; j += 4) for (let i = x + 2; i < x + w - 1; i += 3) if (h(i, j, Math.floor(t * 0.4 + k)) < 0.35) pset(i, j, h(i, j, 9) < 0.5 ? C.oroL : C.amarillo); }
  // el obelisco con su luz roja que parpadea
  poligono([[96, hor], [99, 52], [101, 50], [103, 52], [106, hor]], hex('#c8c8d8')); poligono([[101, 50], [103, 52], [106, hor], [102, hor]], hex('#9a9ab0')); if (Math.sin(t * 3) > 0) { pset(101, 48, C.rojo); pset(101, 47, C.rojo); }
  // el Capitolio: cúpula blanca iluminada, columnas y alas
  { const cx = 200, base = hor; rect(cx - 52, base - 16, cx + 52, base, hex('#d8dce8')); rect(cx - 52, base - 17, cx + 52, base - 17, C.blanco); for (let x = cx - 50; x < cx + 50; x += 4) rect(x, base - 14, x, base - 2, hex('#a8acc0'));
    rect(cx - 18, base - 28, cx + 18, base - 16, hex('#e8ecf4')); for (let x = cx - 16; x < cx + 16; x += 3) rect(x, base - 26, x, base - 18, hex('#b8bccc'));
    for (let j = 0; j < 14; j++) { const w = Math.round(15 * Math.sqrt(1 - (j / 14) ** 2)); rect(cx - w, base - 29 - j, cx + w, base - 29 - j, j % 3 === 0 ? hex('#c8ccdc') : C.blanco); }
    rect(cx - 1, base - 50, cx + 1, base - 43, C.blanco); pset(cx, base - 51, C.oroL);
    for (let j = -30; j < 0; j++) for (let i = -40; i <= 40; i++) if ((i * i) / 1600 + (j * j) / 900 < 1 && (i + j) % 2 === 0 && R.pget(cx + i, base - 30 + j) === C.noche3) pset(cx + i, base - 30 + j, hex('#343c74')); }   // el resplandor de los focos
  // la Casa Blanca, pequeña a la izquierda
  rect(20, hor - 10, 58, hor, C.blanco); rect(34, hor - 14, 44, hor - 10, C.blanco); poligono([[33, hor - 14], [39, hor - 18], [45, hor - 14]], C.blanco); for (let x = 22; x < 58; x += 4) pset(x, hor - 6, C.oroL);
  // el Potomac: agua oscura con los reflejos de las luces temblando
  for (let y = hor; y < 180; y++) rect(0, y, 319, y, y < hor + 3 ? hex('#1a2048') : hex('#121838'));
  for (let y = hor + 1; y < 180; y += 2) for (let x = 0; x < 320; x++) { const c = R.pget(x, 2 * hor - y); if ((c === C.oroL || c === C.blanco || c === hex('#e8ecf4')) && h(x, y, Math.floor(t * 6)) < 0.5) pset(x + Math.round(Math.sin(t * 3 + y) * 1), y, c === C.oroL ? C.amarillo : hex('#8a90b8')); }
}

// los cazas de 1952 (ala recta, como el F-94), de lado; luz de navegación que parpadea
const CAZA52 = [
  '.kk...................',
  '.kGk..................',
  '.kGGk.......kkk.......',
  'kkGGGkkkkkkkVVkk......',
  'kFGGGGGGGGGGGGGGkkk...',
  '.kgggggggggggggggggk..',
  '..kkkkkkgggkkkkkkkk...',
  '........kkk...........',
];
export function caza52(R, x, y, t, o = {}) {
  const dir = o.dir ?? 1, w = CAZA52[0].length;
  R.dibujo(CAZA52, Math.round(x - w / 2), Math.round(y - 4), dir, { k: C.k, g: C.metalS, G: C.metal, V: C.vidrioL, F: Math.sin(t * 40) > 0 ? C.fuegoL : C.fuego });
  if (Math.sin(t * 6) > 0) R.pset(Math.round(x + dir * 2), Math.round(y - 1), C.rojo);
}

// la pantalla de radar verde: el haz que barre y deja estelas, los anillos y los puntos (pts: [[ángulo, radio 0–1], …])
export function radar(R, cx, cy, r, t, pts = [], o = {}) {
  const { pset, disco } = R, verde = hex('#3ae07a'), verdeS = hex('#1a6a3a'), fondo = hex('#0a2a18');
  disco(cx, cy, r + 3, C.k); disco(cx, cy, r + 2, C.metalS); disco(cx, cy, r, fondo);
  for (const f of [0.33, 0.66, 1]) for (let a = 0; a < Math.PI * 2; a += 0.03) pset(Math.round(cx + Math.cos(a) * r * f), Math.round(cy + Math.sin(a) * r * f), verdeS);
  for (let i = -r; i <= r; i += 2) { pset(cx + i, cy, verdeS); pset(cx, cy + i, verdeS); }
  const haz = (t * 1.3) % (Math.PI * 2);
  for (let k = 0; k < 14; k++) { const a = haz - k * 0.05; for (let d = 0; d < r; d++) if ((d + k) % (k < 3 ? 1 : 2) === 0) pset(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), k < 2 ? verde : verdeS); }
  for (const [a, d] of pts) { const x = Math.round(cx + Math.cos(a) * d * r), y = Math.round(cy + Math.sin(a) * d * r), edad = ((haz - a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2); if (edad < 4) { disco(x, y, 1, edad < 1 ? hex('#c8ffd8') : verde); } }
  if (o.marco !== false) for (const [dx, dy] of [[-r - 6, r + 2], [r + 6, r + 2]]) { R.disco(cx + dx, cy + dy, 2, C.k); R.pset(cx + dx, cy + dy, C.metal); }
}

// la torre de control de noche, por dentro: consola, la pantalla de radar grande y, por el cristal, la ciudad
export function torre(R, t, pts, o = {}) {
  const { rect } = R;
  washington(R, t, { hor: 96 });
  // el marco de los ventanales inclinados de la torre
  for (const x of [0, 104, 214, 318]) rect(x, 0, x + 3, 120, C.k);
  rect(0, 0, 319, 4, C.k);
  rect(0, 118, 319, 179, hex('#3a3e4e')); rect(0, 118, 319, 120, hex('#5a5e72')); for (let x = 8; x < 320; x += 30) { rect(x, 128, x + 16, 134, hex('#2a2e3a')); for (let i = 0; i < 4; i++) R.pset(x + 2 + i * 4, 131, Math.sin(t * 3 + x + i) > 0 ? C.verdeL : C.rojo); }
  radar(R, 210, 152, 24, t, pts);
  // tazas, papeles y una lámpara de flexo
  rect(260, 140, 266, 148, C.k); rect(261, 141, 265, 147, C.blanco); if (Math.sin(t * 2) > 0) R.pset(263, 137, C.grisL); R.pset(262, 135, C.grisL);
  rect(140, 144, 160, 150, C.papel); rect(141, 146, 158, 146, C.grisL);
}

// ── E · Nevada (el Área 51) y el cielo del atardecer ─────────────────────────────────────────────────────────────────
// El lago seco blanco y agrietado, la sierra parda, la calima que hace temblar el horizonte, hangares que se levantan
// (o.obra 0–1), la torre, la pista y un cartel de prohibido el paso sin palabras.
export function area51(R, t, o = {}) {
  const { rect, pset, poligono } = R, hor = 104, obra = o.obra ?? 1;
  cielo(R, t, { hor, aves: false, sol: [70, 26, 8], nubes: false });
  R.poligono([[0, hor], [0, 92], [80, 90], [160, 94], [240, 90], [319, 93], [319, hor]], hex('#a88a84'));   // la sierra del fondo, sin huecos
  for (const [x0, y0, k] of [[-20, 82, 0], [120, 76, 1], [230, 84, 2]]) { const pts = [[x0, hor]]; for (let i = 0; i <= 8; i++) pts.push([x0 + i * 16, y0 + Math.round(Math.sin(i * 1.7 + k) * 5 + (i === 0 || i === 8 ? 12 : 0))]); pts.push([x0 + 128, hor]); poligono(pts, k === 1 ? hex('#8a6a6a') : hex('#9a7a74')); }
  for (let y = 86; y < hor; y += 3) for (let x = 0; x < 320; x++) if (R.pget(x, y) === hex('#8a6a6a') && (x + y) % 9 < 3) pset(x, y, hex('#76585a'));
  // el lago seco: blanco con grietas hexagonales
  for (let y = hor; y < 180; y++) rect(0, y, 319, y, y < hor + 3 ? hex('#e8e0d0') : hex('#f2ece0'));
  for (let k = 0; k < 160; k++) { const x = Math.round(h(k, 1, 60) * 320), y = hor + 4 + Math.round(h(k, 2, 60) ** 1.3 * 72), l = 2 + Math.round((y - hor) / 12); for (let i = 0; i < l; i++) pset(x + i, y + (i % 2), hex('#d4cab4')); pset(x + l, y - 1, hex('#d4cab4')); }
  // la calima: el aire caliente hace temblar el borde del horizonte
  for (let y = hor - 4; y < hor + 2; y++) { const d = Math.round(Math.sin(t * 6 + y * 1.3) * 1.2); if (d) for (let x = 0; x < 320; x += 2) { const c = R.pget(x, y); pset(x + d, y, c); } }
  // la pista
  rect(0, 150, 319, 162, hex('#5a5a66')); rect(0, 150, 319, 150, hex('#7a7a86')); for (let x = 4; x < 320; x += 20) rect(x, 156, x + 10, 156, C.blanco);
  // hangares que se levantan, la torre y el cartel
  for (const [x, w] of [[150, 46], [202, 46], [254, 52]]) { const alto = Math.round(26 * Math.min(1, Math.max(0, obra * 3 - (x - 150) / 60))); if (alto < 2) { rect(x, 144, x + w, 146, C.maderaL); continue; }
    poligono([[x, 146 - alto + 6], [x + w / 2, 146 - alto], [x + w, 146 - alto + 6], [x + w, 146], [x, 146]], C.metal); for (let xx = x + 2; xx < x + w; xx += 4) rect(xx, 146 - alto + 8, xx, 145, C.metalS); rect(x + 8, 146 - Math.round(alto * 0.6), x + w - 8, 146, hex('#2a2a36')); }
  if (obra > 0.5) { rect(120, 112, 124, 146, C.metalD); rect(114, 104, 130, 112, C.k); rect(115, 105, 129, 111, C.vidrioL); if (Math.sin(t * 3) > 0) pset(122, 102, C.rojo); }
  rect(26, 132, 27, 148, C.maderaS); rect(16, 120, 38, 133, C.k); rect(17, 121, 37, 132, C.blanco); R.icono('X', 24, 123, C.rojo, C.blanco);
  // una grúa de la obra y polvo
  if (obra < 1) { R.linea(280, 146, 280, 96, C.amarillo); R.linea(280, 96, 312, 96, C.amarillo); R.linea(306, 96, 306, 110 + Math.round(Math.sin(t) * 3), C.k); viento(R, t, { y0: 130, y1: 150 }); }
  halcon(R, t, 200, 40);
}

// el U-2 de lado: fuselaje largo y fino, ala recta larguísima (de canto, una línea) y deriva alta; plateado
const U2 = [
  'kk..............................',
  'kGk.............................',
  'kGGk............................',
  'kGGGkkkkkkkkkkkkkkkkkkkkkkVVkk..',
  'kLLLLLLLLLLLLLLLLLLLLLLLLLLLLLkk',
  '.kGGGGGGGGGGGGGGGGGGGGGGGGGGGGk.',
  '..kkkkkkkkkkkkkkkkkkkkkkkkkkkk..',
];
export function u2(R, x, y, t, o = {}) {
  const dir = o.dir ?? 1, w = U2[0].length, brasa = o.brasa;
  const pal = brasa ? { k: hex('#8a3a1a'), G: C.fuego, L: C.fuegoL, V: C.fuegoL } : { k: C.k, G: C.metal, L: C.metalL, V: C.vidrioL };
  R.dibujo(U2, Math.round(x - w / 2), Math.round(y - 4), dir, pal);
  // el ala de canto: una raya larga a media altura, que asoma por delante y por detrás
  R.rect(Math.round(x - 30), Math.round(y), Math.round(x + 30), Math.round(y), brasa ? C.fuegoL : C.metalL);
  if (brasa) for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + t; R.pset(Math.round(x + Math.cos(a) * 34), Math.round(y + Math.sin(a) * 6), C.oroL); }
}

// el coche perseguidor de los cincuenta (familiar), de lado, corriendo; mirando a la derecha
export function cocheU2(R, x, suelo, t) {
  const b = Math.floor(t * 12) % 2, y = suelo - b;
  R.poligono([[x - 16, y - 4], [x - 12, y - 10], [x + 8, y - 10], [x + 12, y - 5], [x + 18, y - 4], [x + 18, y], [x - 16, y]], C.k);
  R.poligono([[x - 15, y - 4], [x - 11, y - 9], [x + 7, y - 9], [x + 11, y - 4], [x + 17, y - 3], [x + 17, y - 1], [x - 15, y - 1]], C.rojo);
  R.rect(x - 10, y - 8, x - 2, y - 5, C.vidrioL); R.rect(x, y - 8, x + 6, y - 5, C.vidrioL); R.pset(x + 17, y - 3, C.oroL);
  for (const cx of [x - 9, x + 11]) { R.disco(cx, y, 3, C.k); R.pset(cx, y, C.metal); }
  for (let k = 0; k < 6; k++) R.disco(x - 20 - k * 4, suelo - 1 - Math.round(h(k, Math.floor(t * 10), 61) * 3), 1 + (k > 2 ? 1 : 0), hex('#e8e0d0'));   // polvo del lago seco
}

// el cielo del atardecer visto desde un avión de línea: abajo ya es de noche, con las luces de los pueblos encendidas
export function atardecer(R, t, o = {}) {
  const { rect, pset } = R, hor = o.hor ?? 118;
  const bandas = [hex('#2a2a6a'), hex('#4a3a7a'), hex('#8a4a7a'), hex('#d0684a'), hex('#f0a050'), hex('#f8d080')];
  for (let y = 0; y < hor; y++) rect(0, y, 319, y, bandas[Math.min(5, Math.floor((y / hor) ** 1.4 * 6))]);
  for (let k = 0; k < 20; k++) { const x = Math.round(h(k, 1, 70) * 320), y = Math.round(h(k, 2, 70) * 30); if (Math.sin(t + k) > 0.3) pset(x, y, C.blanco); }
  R.disco(250, hor - 2, 10, hex('#ffd890')); R.disco(250, hor - 2, 8, hex('#fff0c0'));   // el sol que se pone
  for (const [x, y, w] of [[40, hor - 20, 60], [180, hor - 36, 40], [270, hor - 14, 50]]) for (let i = 0; i < w; i++) { pset(Math.round(((x + i + t * 4) % 380) - 30), y, hex('#e8805a')); if (i % 3) pset(Math.round(((x + i + 2 + t * 4) % 380) - 30), y + 1, hex('#a85a6a')); }
  // el suelo en sombra, con los pueblos que encienden sus luces
  for (let y = hor; y < 180; y++) rect(0, y, 319, y, y < hor + 2 ? hex('#3a2a4a') : hex('#1e1a34'));
  const luces = o.luces ?? 1;
  for (let k = 0; k < 18; k++) { const cx = Math.round(((h(k, 3, 70) * 360 - t * (o.vel ?? 6)) % 360 + 360) % 360) - 20, cy = hor + 6 + Math.round(h(k, 4, 70) ** 1.5 * 56);
    for (let j = 0; j < 5 + (k % 4) * 2; j++) if (h(k, j, 71) < luces) pset(cx + Math.round((h(k, j, 72) - 0.5) * 12), cy + Math.round((h(k, j, 73) - 0.5) * 5), h(k, j, 74) < 0.7 ? C.oroL : C.blanco); }
  // carreteras que se adivinan por los faros
  for (let k = 0; k < 4; k++) { const x = Math.round(((t * 20 + k * 90) % 360) - 20), y = hor + 22 + k * 12; pset(x, y, C.blanco); pset(x + 1, y, C.oroL); }
}

// el avión de línea de los cincuenta (cuatrimotor de hélice), de lado, con ventanillas encendidas
export function avionLinea(R, x, y, t, o = {}) {
  const { poligono, rect, pset } = R, X = (u) => Math.round(x + u), Y = (v) => Math.round(y + v);
  poligono([[X(-70), Y(-2)], [X(50), Y(-6)], [X(70), Y(-2)], [X(76), Y(2)], [X(66), Y(6)], [X(-70), Y(6)]], C.k);
  poligono([[X(-69), Y(-1)], [X(50), Y(-5)], [X(69), Y(-1)], [X(74), Y(2)], [X(65), Y(5)], [X(-69), Y(5)]], hex('#d8dce8'));
  rect(X(-66), Y(2), X(64), Y(3), C.azul);
  poligono([[X(-70), Y(-2)], [X(-58), Y(-2)], [X(-64), Y(-18)], [X(-72), Y(-18)]], hex('#c8ccd8')); rect(X(-71), Y(-16), X(-66), Y(-13), C.rojo);
  poligono([[X(-14), Y(3)], [X(16), Y(3)], [X(4), Y(9)], [X(-26), Y(9)]], hex('#a8acbc'));
  for (const u of [-18, 8]) { rect(X(u - 2), Y(4), X(u + 6), Y(7), C.metalS); const p = Math.floor(t * 30) % 2; R.linea(X(u + 7), Y(5 - 4 * p), X(u + 7), Y(7 + 3 * p), C.metalD); }
  for (let u = -54; u < 46; u += 6) { rect(X(u), Y(-2), X(u + 2), Y(0), C.k); pset(X(u + 1), Y(-1), C.oroL); }   // ventanillas encendidas
  rect(X(56), Y(-4), X(62), Y(-2), C.vidrio);
  if (Math.sin(t * 5) > 0) pset(X(-72), Y(-18), C.rojo);
}

// los asientos de la cabina (se pintan después de los pasajeros, que quedan sentados detrás del respaldo)
export function asientos(R) {
  for (let k = 0; k < 6; k++) { const x = 6 + k * 52; R.rect(x, 128, x + 22, 148, C.k); R.rect(x + 1, 129, x + 21, 147, hex('#3a5a8a')); R.rect(x + 1, 129, x + 21, 131, hex('#4a6a9a'));
    for (let y = 133; y < 147; y += 3) for (let i = x + 2 + (y % 2); i < x + 21; i += 3) R.pset(i, y, hex('#2e4a74'));   // tela del asiento
    R.rect(x + 5, 124, x + 17, 129, C.k); R.rect(x + 6, 125, x + 16, 128, C.blanco); R.rect(x + 22, 136, x + 26, 139, C.metalS); }
}
// la cabina de pasajeros de los cincuenta: ventanillas redondas, asientos, la luz del atardecer entrando
export function cabinaPasajeros(R, t) {
  const { rect, pset, disco } = R;
  rect(0, 0, 319, 179, hex('#c8bca8')); rect(0, 0, 319, 30, hex('#b0a490')); rect(0, 148, 319, 179, hex('#6a3a3a')); for (let x = 0; x < 320; x += 8) rect(x, 150, x + 3, 179, hex('#5a3030'));
  for (let k = 0; k < 6; k++) { const cx = 30 + k * 52, cy = 66; disco(cx, cy, 12, C.k); disco(cx, cy, 11, hex('#e8e4dc')); disco(cx, cy, 9, k < 3 ? hex('#f0a050') : hex('#d0684a')); for (let j = -9; j < 9; j++) for (let i = -9; i < 9; i++) if (i * i + j * j < 81 && cy + j > 70) pset(cx + i, cy + j, hex('#2a2244')); if (k === 3) { pset(cx + 3, cy - 6, C.blanco); pset(cx + 4, cy - 6, C.oroL); } }
  for (let y = 40; y < 100; y += 2) for (let x = 0; x < 320; x++) if (h(x >> 3, y, 75) < 0.04) pset(x, y, hex('#d8ccb0'));   // luz de atardecer en la pared
  // luces del techo, portaequipajes con maletas y sombreros, cortinillas a medio bajar
  for (let x = 12; x < 320; x += 26) { rect(x, 26, x + 10, 28, hex('#fff4d0')); rect(x - 1, 29, x + 11, 29, hex('#9a8e78')); }
  rect(0, 88, 319, 90, C.metalS); rect(0, 91, 319, 91, C.k); for (let x = 0; x < 320; x += 6) pset(x, 92, C.metalS);
  for (let k = 0; k < 9; k++) { const x = 8 + k * 36 + Math.round(h(k, 1, 76) * 8), w = 12 + Math.round(h(k, 2, 76) * 10), c = [C.maderaL, C.rojo, C.verde, C.ocre][k % 4]; rect(x, 80, x + w, 88, C.k); rect(x + 1, 81, x + w - 1, 87, c); rect(x + Math.round(w / 2) - 2, 78, x + Math.round(w / 2) + 2, 80, C.k); }
  for (let k = 0; k < 6; k++) { const cx = 30 + k * 52; rect(cx - 11, 52, cx + 11, 54 + (k % 2) * 3, hex('#8a6a5a')); }
  // luces de lectura sobre cada fila y manchas de luz de atardecer que se mueven por la pared con las nubes
  for (let k = 0; k < 6; k++) { const x = 18 + k * 52; rect(x, 94, x + 4, 96, C.k); if (k % 2 === 0) for (let y = 97; y < 112; y++) for (let i = -((y - 97) >> 2); i <= (y - 97) >> 2; i++) if ((i + y) % 2) pset(x + 2 + i, y, hex('#fff0c0')); }
  for (let k = 0; k < 6; k++) { const cx = 30 + k * 52, d = Math.round(((t * 6) + k * 20) % 60) - 30; for (let y = 82; y < 96; y++) for (let x = cx - 8 + d; x < cx + 8 + d; x++) if ((x + y) % 2 && R.pget(x, y) === hex('#c8bca8')) pset(x, y, hex('#e8b880')); }
  for (let y = 150; y < 180; y += 4) for (let x = (y % 8); x < 320; x += 8) pset(x, y, hex('#7a4a4a'));   // dibujo de la moqueta
}

// ── mapas dibujados a mano (el mapa del kit solo tiene el Viejo Mundo) ────────────────────────────────────────────────
export const LUGARES_OV = { rainier: [-121.76, 46.85], roswell: [-104.52, 33.39], washington: [-77.04, 38.9], area51: [-115.81, 37.24], nimitz: [-119.5, 31.2], moscu: [37.6, 55.75] };
const EEUU_POL = [[-124.7, 48.4], [-122.8, 49.0], [-95.2, 49.0], [-94.8, 49.4], [-89.6, 48.0], [-84.8, 46.5], [-82.5, 45.3], [-82.4, 43.0], [-79.0, 43.3], [-76.8, 43.6], [-75.0, 45.0], [-71.5, 45.0], [-69.2, 47.4], [-67.8, 47.1], [-67.0, 44.8], [-70.0, 43.8], [-70.6, 42.6], [-70.0, 41.8], [-71.9, 41.3], [-73.9, 40.6], [-74.1, 39.7], [-75.5, 38.8], [-76.0, 37.0], [-75.6, 35.2], [-77.9, 33.9], [-79.3, 33.0], [-81.0, 31.7], [-81.4, 30.0], [-80.0, 26.8], [-80.4, 25.2], [-81.8, 25.9], [-82.7, 27.7], [-83.0, 29.1], [-84.4, 30.0], [-86.5, 30.4], [-88.5, 30.4], [-89.6, 29.3], [-90.9, 29.1], [-93.8, 29.7], [-95.0, 29.2], [-97.2, 27.6], [-97.4, 25.9], [-99.1, 26.5], [-101.4, 29.8], [-103.2, 29.0], [-104.5, 29.6], [-106.5, 31.8], [-108.2, 31.8], [-111.1, 31.3], [-114.8, 32.5], [-117.1, 32.5], [-118.4, 34.0], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8], [-123.8, 39.8], [-124.2, 41.9], [-124.1, 43.7], [-124.0, 46.3]];
const CANADA_POL = [[-132, 53], [-60, 53], [-60, 44.5], [-67, 44.8], [-69.2, 47.4], [-71.5, 45.0], [-75, 45], [-82.4, 43], [-84.8, 46.5], [-95.2, 49], [-122.8, 49], [-124.7, 48.6], [-132, 50]];
const MEXICO_POL = [[-117.1, 32.5], [-114.8, 32.5], [-111.1, 31.3], [-106.5, 31.8], [-104.5, 29.6], [-103.2, 29.0], [-101.4, 29.8], [-99.1, 26.5], [-97.4, 25.9], [-97.7, 21], [-110, 21], [-112, 26], [-114.5, 30], [-116.5, 31.5]];
const LAGOS = [[[-92, 46.7], [-88, 48.5], [-84.6, 46.9], [-86.5, 46.4], [-90, 46.6]], [[-87.8, 42.2], [-86.4, 45.8], [-85.5, 45.4], [-86.4, 43.0]], [[-82.5, 45.3], [-81, 44.6], [-81.7, 43.3], [-83.3, 44.3]], [[-83.5, 41.7], [-79, 42.9], [-79.4, 42.3], [-82.5, 41.5]]];
const MUNDO_POL = {
  norteamerica: [[-168, 66], [-140, 70], [-110, 72], [-85, 70], [-75, 62], [-64, 60], [-56, 52], [-66, 45], [-70, 42], [-76, 35], [-81, 31], [-80, 26], [-82, 30], [-90, 29], [-97, 26], [-97, 20], [-90, 16], [-83, 10], [-80, 8], [-86, 13], [-95, 16], [-105, 20], [-110, 24], [-117, 32], [-122, 37], [-124, 42], [-124, 48], [-133, 57], [-150, 60], [-165, 62]],
  sudamerica: [[-80, 8], [-60, 10], [-50, 0], [-35, -8], [-40, -14], [-78, -14], [-81, -4]],
  groenlandia: [[-55, 60], [-45, 60], [-20, 70], [-20, 80], [-60, 80], [-70, 76]],
  eurasia: [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [5, 51], [8, 54], [10, 58], [5, 62], [15, 69], [30, 71], [45, 68], [60, 70], [80, 73], [100, 77], [115, 74], [140, 72], [160, 70], [180, 69], [180, 62], [163, 58], [155, 50], [142, 48], [135, 43], [128, 35], [121, 31], [122, 24], [110, 20], [108, 12], [100, 8], [95, 16], [90, 22], [80, 15], [77, 8], [73, 20], [67, 25], [57, 25], [50, 30], [48, 28], [35, 30], [30, 36], [27, 40], [20, 40], [15, 38], [12, 44], [8, 44], [3, 43], [-1, 37], [-5, 36]],
  africa: [[-17, 21], [-10, 30], [-5, 36], [10, 37], [20, 32], [32, 31], [35, 28], [43, 12], [51, 12], [42, 0], [40, -14], [12, -14], [10, 0], [8, 4], [-8, 5], [-17, 14]],
  britania: [[-6, 50], [2, 51], [0, 54], [-3, 58.5], [-6, 57]], japon: [[130, 31], [141, 36], [142, 41], [140, 44], [136, 35]], australia: [[114, -14], [142, -11], [150, -14], [120, -14]],
};
const URSS_POL = [[28, 46], [30, 52], [24, 55], [21, 57], [28, 60], [30, 70], [45, 68], [60, 70], [80, 73], [100, 77], [115, 74], [140, 72], [160, 70], [180, 69], [180, 62], [163, 58], [155, 50], [142, 48], [135, 43], [131, 43], [120, 50], [105, 50], [90, 50], [80, 45], [70, 40], [60, 37], [54, 37], [48, 42], [40, 43], [35, 46]];
// proyección plana sencilla: vista [lon0, lon1, lat0, lat1] sobre 320 × 180
const proy = (v) => ([lon, lat]) => [Math.round(((lon - v[0]) / (v[1] - v[0])) * 320), Math.round(((v[3] - lat) / (v[3] - v[2])) * 180)];
// mar con olas y destellos que se mueven, y sombras de nubes sobre la tierra
function marMapa(R, t) {
  R.rect(0, 0, 319, 179, C.marP2);
  for (let k = 0; k < 60; k++) { const x = Math.round(((k * 53 + t * 4) % 340) - 10), y = (k * 37) % 180; R.rect(x, y, x + 3, y, C.marP3); if (k % 5 === 0 && Math.sin(t * 2 + k) > 0.7) R.pset(x + 1, y - 1, C.marL); }
}
function tierra(R, pol, v, c, borde = C.k) {
  const P = pol.map(proy(v));
  R.poligono(P.map(([x, y]) => [x + 1, y]), borde); R.poligono(P.map(([x, y]) => [x - 1, y]), borde); R.poligono(P.map(([x, y]) => [x, y + 1]), borde); R.poligono(P.map(([x, y]) => [x, y - 1]), borde);
  R.poligono(P, c);
}
function textura(R, c, c2) { for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (R.pget(x, y) === c && h(x >> 1, y, 80) < 0.07) R.pset(x, y, c2); }
export const EEUU = [-127, -64, 22, 52];
// mapa de EE. UU. con los lugares de la historia que se encienden uno a uno (o.n: cuántos; o.barco: el portaaviones)
export function mapaEEUU(R, t, o = {}) {
  marMapa(R, t);
  tierra(R, CANADA_POL, EEUU, C.tierraL); tierra(R, MEXICO_POL, EEUU, C.tierraL);
  tierra(R, EEUU_POL, EEUU, C.hierba); textura(R, C.hierba, C.hierbaL);
  for (const l of LAGOS) tierra(R, l, EEUU, C.marP3, C.marP1);
  // sombras de nubes que pasan
  for (let k = 0; k < 2; k++) { const cx = ((k * 170 + t * 6) % 460) - 70, cy = 60 + k * 50; for (let y = cy - 10; y < cy + 10; y++) for (let x = Math.round(cx - 36); x < cx + 36; x++) { if ((x - cx) ** 2 / 1296 + (y - cy) ** 2 / 100 > 1) continue; const c = R.pget(x, y); if (c === C.hierba) R.pset(x, y, C.hierbaS); else if (c === C.marP2) R.pset(x, y, C.marP1); } }
  const P = proy(EEUU), orden = ['rainier', 'roswell', 'washington', 'area51'];
  orden.slice(0, o.n ?? 4).forEach((k) => { const [x, y] = P(LUGARES_OV[k]); R.punto(x, y, t, R.PALA.ORO, 3); });
  if (o.barco) { const [x, y] = P(LUGARES_OV.nimitz); R.rect(x - 7, y, x + 7, y + 1, C.metalD); R.rect(x - 1, y - 3, x + 1, y - 1, C.metalD); for (let i = 0; i < 10; i++) if ((i + Math.floor(t * 4)) % 3) R.pset(x - 8 - i, y + 1, C.espuma); }
}
export const MUNDO = [-170, 180, -14, 82];
// el mundo de 1947: EE. UU. en azul y la URSS en rojo, el resto de la tierra en ocre
export function mapaMundo(R, t) {
  marMapa(R, t);
  for (const pol of Object.values(MUNDO_POL)) tierra(R, pol, MUNDO, C.tierraL);
  textura(R, C.tierraL, C.camino);
  tierra(R, EEUU_POL, MUNDO, C.azulL, C.azul); tierra(R, URSS_POL, MUNDO, hex('#d86a5a'), C.rojoS);
  return proy(MUNDO);
}

// ── 1947 · la calle principal y el salón ────────────────────────────────────────────────────────────────────────────
// un coche de los cuarenta, de lado: guardabarros redondos, cabina en cúpula, cromados y ruedas de banda blanca
export function coche1947(R, x, suelo, t, o = {}) {
  const { rect, disco, pset } = R, d = o.dir ?? 1, c = o.color ?? hex('#3a5a4a'), cS = o.sombra ?? hex('#2a4236'), X = (i) => Math.round(x + (d > 0 ? i : 56 - i)), y = suelo - 7;
  const r = (a, b, y0, y1, col) => rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, col);
  disco(X(12), y - 2, 9, C.k); disco(X(44), y - 2, 9, C.k); r(4, 52, y - 9, y + 1, C.k);
  disco(X(12), y - 2, 8, c); disco(X(44), y - 2, 8, c); r(5, 51, y - 8, y, c); r(5, 51, y - 2, y, cS);
  disco(X(28), y - 12, 11, C.k); r(17, 39, y - 12, y - 8, C.k); disco(X(28), y - 12, 10, c); r(18, 38, y - 12, y - 8, c);
  r(20, 27, y - 19, y - 12, o.noche ? hex('#2a3a5a') : C.cristalS); r(30, 37, y - 19, y - 12, o.noche ? hex('#2a3a5a') : C.cristalS); r(28, 29, y - 20, y - 9, C.k);
  r(2, 6, y - 4, y - 2, C.metalL); r(50, 54, y - 4, y - 2, C.metalL); r(5, 51, y - 6, y - 6, C.metalL);
  pset(X(53), y - 7, o.noche ? C.oroL : C.amarillo); if (o.noche) for (let k = 1; k < 18; k++) for (let j = -Math.round(k / 4); j <= Math.round(k / 4); j++) if ((k + j) % 2) pset(X(53 + k), y - 7 + j, C.oroL);
  for (const cx of [12, 44]) { disco(X(cx), y + 1, 6, C.k); disco(X(cx), y + 1, 4, C.blanco); disco(X(cx), y + 1, 2, C.metalS); const a = t * 9 * d; pset(Math.round(X(cx) + Math.cos(a) * 3), Math.round(y + 1 + Math.sin(a) * 3), C.k); }
}
// la calle principal de un pueblo en 1947: fachadas de ladrillo con cornisa, escaparates con toldos de rayas, la barbería
// con su poste que gira, el cine con las bombillas que corren, la cafetería con la taza, guirnaldas de banderitas,
// farolas, acera y calle; confeti que cae (la guerra ha terminado). o.noche: de noche, con ventanas encendidas y farolas
export function calle1947(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, noche = !!o.noche;
  cielo(R, t, { hor: 100, noche, luna: [270, 26, 7] });
  const F = [[0, 30, '#a84a3a'], [62, 22, '#8a5a3a'], [128, 34, '#b06a4a'], [196, 18, '#7a4a3a'], [258, 28, '#a85a42']];
  for (const [x0, y0, col] of F) { const x1 = x0 + 62, base = hex(col);
    rect(x0, y0, x1, 130, C.k); rect(x0 + 1, y0 + 1, x1 - 1, 130, base);
    for (let y = y0 + 4; y < 100; y += 4) for (let x = x0 + 1 + ((y >> 2) % 2) * 3; x < x1; x += 6) pset(x, y, noche ? hex('#4a2a2a') : hex('#d8b098'));   // juntas del ladrillo
    rect(x0, y0, x1, y0 + 3, noche ? hex('#4a4a5a') : hex('#d8d0c0')); rect(x0 - 1, y0 + 3, x1 + 1, y0 + 4, C.k);   // cornisa
    for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) { const wx = x0 + 8 + i * 18, wy = y0 + 10 + j * 22; if (wy + 14 > 98) continue; const luz = noche ? h(i + x0, j, 160) < 0.6 : false;
      rect(wx, wy, wx + 10, wy + 14, C.k); rect(wx + 1, wy + 1, wx + 9, wy + 13, luz ? C.oroL : noche ? hex('#1e2650') : C.cristalS); rect(wx + 5, wy + 1, wx + 5, wy + 13, C.k); rect(wx + 1, wy + 7, wx + 9, wy + 7, C.k); rect(wx - 1, wy + 14, wx + 11, wy + 15, hex('#d8d0c0'));
      if (!luz && !noche) { pset(wx + 2, wy + 2, C.blanco); } }
    // el escaparate con su toldo de rayas
    rect(x0 + 4, 104, x1 - 4, 130, C.k); rect(x0 + 5, 105, x1 - 18, 129, noche ? hex('#e8c070') : C.cristal); rect(x1 - 16, 108, x1 - 5, 130, C.maderaS); pset(x1 - 7, 120, C.oro);
    for (let x = x0 + 2; x < x1 - 1; x++) { const raya = ((x - x0) >> 2) % 2; rect(x, 98, x, 103, raya ? C.blanco : [C.rojo, C.verde, C.azul, C.rojo, C.verde][F.findIndex((f) => f[0] === x0)]); } for (let x = x0 + 2; x < x1 - 1; x += 4) disco(x + 2, 104, 1, C.blanco);
  }
  // los letreros, sin letras: el poste de la barbería, la taza de la cafetería, el sombrero, el cine con su marquesina
  { const bx = 120, by = 104; rect(bx - 2, by - 14, bx + 2, by, C.k); for (let y = by - 13; y < by; y++) rect(bx - 1, y, bx + 1, y, ((y + Math.floor(t * 8)) % 6) < 2 ? C.rojo : ((y + Math.floor(t * 8)) % 6) < 4 ? C.blanco : C.azulL); disco(bx, by - 15, 2, C.metalL); }
  { const cx = 30, cy = 88; rect(cx - 9, cy - 6, cx + 9, cy + 6, C.k); rect(cx - 8, cy - 5, cx + 8, cy + 5, noche ? hex('#ff8a6a') : C.blanco); rect(cx - 4, cy - 2, cx + 2, cy + 3, C.rojo); pset(cx + 3, cy, C.rojo); pset(cx + 4, cy + 1, C.rojo); for (let k = 0; k < 2; k++) pset(cx - 2 + k * 2, cy - 4 - Math.round((t * 3 + k) % 2), C.grisL); }
  { const mx0 = 200, mx1 = 254, my = 74; rect(mx0, my, mx1, my + 18, C.k); rect(mx0 + 1, my + 1, mx1 - 1, my + 17, hex('#2a1a3a')); rect(mx0 + 6, my + 5, mx1 - 6, my + 13, hex('#f4e8c8'));
    for (let k = 0; k < 7; k++) { rect(mx0 + 9 + k * 6, my + 7, mx0 + 12 + k * 6, my + 11, k % 2 ? C.k : hex('#8a2a2a')); }   // la película del cartel: cuadros, sin letras
    for (let i = 0; i < 2 * (mx1 - mx0) + 36; i += 3) { const u = i < mx1 - mx0 ? [mx0 + i, my] : i < 2 * (mx1 - mx0) ? [mx0 + i - (mx1 - mx0), my + 18] : null; if (!u) continue; pset(u[0], u[1], (i / 3 + Math.floor(t * 8)) % 3 === 0 ? C.oroL : C.oroS); }
    rect(224, my - 18, 230, my, C.k); rect(225, my - 17, 229, my - 1, hex('#8a2a2a')); for (let j = 0; j < 4; j++) disco(227, my - 14 + j * 4, 1, (j + Math.floor(t * 4)) % 2 ? C.oroL : C.oro); }
  // guirnaldas de banderitas entre las fachadas
  for (let g = 0; g < 2; g++) { const x0 = g * 160, y0 = 50 + g * 6; for (let i = 0; i <= 160; i += 2) { const y = Math.round(y0 + Math.sin(i / 160 * Math.PI) * 14); pset(x0 + i, y, C.k); if (i % 8 === 0) { const c = [C.rojo, C.blanco, C.azulL][(i / 8) % 3], o2 = Math.round(Math.sin(t * 5 + i) * 1); poligono([[x0 + i - 2, y + 1], [x0 + i + 2, y + 1], [x0 + i + o2, y + 6]], c); } } }
  // acera, bordillo, farolas y calle
  rect(0, 130, 319, 140, noche ? hex('#6a6a7a') : C.acera); for (let x = 0; x < 320; x += 16) rect(x, 130, x, 140, noche ? hex('#5a5a6a') : C.aceraS); rect(0, 140, 319, 142, C.aceraS);
  rect(0, 142, 319, 179, noche ? hex('#2a2a36') : C.asfalto); for (let x = 0; x < 320; x += 24) rect(x + ((t * 0) | 0), 160, x + 12, 160, noche ? hex('#8a8a6a') : C.linea);
  for (const lx of [52, 186, 300]) { rect(lx, 98, lx + 1, 134, C.k); rect(lx - 3, 94, lx + 4, 98, C.k); rect(lx - 2, 95, lx + 3, 97, noche ? C.oroL : C.grisL);
    if (noche) for (let y = 98; y < 140; y++) for (let x = lx - (y - 98) / 2; x < lx + 2 + (y - 98) / 2; x++) if ((Math.round(x) + y) % 3 === 0) pset(Math.round(x), y, hex('#c8b070')); }
  // o.roswell: el Roswell de hoy, pueblo ovni: cabezas verdes en los escaparates, un platillo de neón en la marquesina,
  // las farolas con ojos negros y un platillo de atrezo colgado sobre la calle
  if (o.roswell) {
    for (const [x0] of F) { const cx = x0 + 24, cy = 116; R.disco(cx, cy, 6, C.k); R.disco(cx, cy, 5, hex('#6ac86a')); rect(cx - 3, cy + 4, cx + 3, cy + 8, hex('#6ac86a')); for (const d of [-1, 1]) { R.poligono([[cx + d, cy - 1], [cx + d * 4, cy - 2], [cx + d * 3, cy + 2]], C.k); } }
    for (const lx of [52, 186, 300]) { R.disco(lx + 1, 96, 4, C.k); R.disco(lx + 1, 96, 3, noche ? C.oroL : C.blanco); pset(lx - 1, 96, C.k); pset(lx + 3, 96, C.k); pset(lx, 97, C.k); pset(lx + 2, 97, C.k); }
    { const sx = 160, sy = 40 + Math.round(Math.sin(t * 1.5) * 2); R.linea(sx, 0, sx, sy - 6, C.k); R.disco(sx, sy - 3, 6, C.cristalS); for (let j = -3; j <= 3; j++) for (let i = -18; i <= 18; i++) if ((i / 18) ** 2 + (j / 3.5) ** 2 < 1) pset(sx + i, sy + j, (i + j) % 4 ? C.metalL : C.metal); for (let k = -2; k <= 2; k++) pset(sx + k * 7, sy + 1, Math.sin(t * 6 + k) > 0 ? C.oroL : C.rojo); }
    for (let i = 0; i < 2 * 54 + 36; i += 3) { const x = 200 + (i % 54), y = i < 54 ? 74 : 92; pset(x, y, (i / 3 + Math.floor(t * 8)) % 3 === 0 ? hex('#8aff8a') : hex('#3a8a3a')); }
  }
  if (!noche && !o.roswell) for (let k = 0; k < 40; k++) { const x = Math.round((h(k, 1, 161) * 320 + Math.sin(t * 2 + k) * 6) % 320), y = Math.round((h(k, 2, 161) * 180 + t * (10 + k % 5)) % 180); pset(x, y, [C.rojo, C.blanco, C.azulL, C.oroL][k % 4]); }   // confeti
}
// el salón de una casa en 1947, de noche: papel pintado de flores, la ventana con la noche y un foco que barre el cielo,
// la radio de mueble con el dial encendido y sus ondas (o.radio), la lámpara de pie, el reloj de pared, un cuadro, la
// alfombra; los sillones van aparte (sillon1947), por delante de quien se sienta
export function salon1947(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 140, hex('#5a6a5a')); for (let y = 6; y < 136; y += 10) for (let x = (y / 10 % 2) * 8; x < 320; x += 16) { pset(x, y, hex('#8a7a5a')); pset(x + 1, y, hex('#8a7a5a')); pset(x, y + 1, hex('#8a7a5a')); pset(x + 1, y - 1, hex('#6a5a4a')); }
  rect(0, 112, 319, 140, hex('#4a3a2a')); rect(0, 112, 319, 113, hex('#6a5a4a'));   // el zócalo de madera
  // la ventana: noche, estrellas, y el foco de un aeródromo que barre el cielo
  rect(196, 22, 270, 92, C.k); rect(198, 24, 268, 90, C.noche1); for (let k = 0; k < 14; k++) pset(200 + (k * 23) % 66, 26 + (k * 17) % 60, Math.sin(t * 2 + k) > 0 ? C.blanco : C.grisL);
  { const a = Math.sin(t * 0.5) * 0.6 - 1.57; for (let d = 0; d < 80; d++) for (let w = -Math.round(d / 10); w <= Math.round(d / 10); w++) { const x = Math.round(250 + Math.cos(a) * d + w), y = Math.round(92 + Math.sin(a) * d); if (x > 198 && x < 268 && y > 24 && y < 90 && (x + y) % 2) pset(x, y, hex('#3a4a7a')); } }
  for (let x = 198; x < 268; x += 6) rect(x, 82, x + 4, 90, hex('#1a1e30'));   // tejados del pueblo
  rect(233, 24, 234, 90, C.k); rect(198, 56, 268, 57, C.k); rect(194, 92, 272, 94, hex('#d8d0c0'));
  for (const [x0, d] of [[198, -1], [268, 1]]) for (let y = 18; y < 98; y++) { const w = 7 + Math.round(Math.sin(t * 0.7 + y * 0.1)); rect(d < 0 ? x0 - w : x0, y, d < 0 ? x0 : x0 + w, y, (y >> 2) % 2 ? hex('#a84a3a') : hex('#8a3a2a')); }
  rect(186, 16, 280, 17, C.oroS);
  // el reloj de pared y un cuadro con un barco
  disco(150, 30, 9, C.k); disco(150, 30, 8, hex('#e8dcc0')); linea(150, 30, Math.round(150 + Math.sin(t * 0.1) * 5), Math.round(30 - Math.cos(t * 0.1) * 5), C.k); linea(150, 30, Math.round(150 + Math.sin(t) * 7), Math.round(30 - Math.cos(t) * 7), C.k); rect(149, 40, 151, 52, C.oroS); disco(150, 54 + Math.round(Math.sin(t * 3)), 2, C.oro);
  rect(40, 26, 92, 60, C.oroS); rect(43, 29, 89, 57, hex('#8ab0c8')); rect(43, 48, 89, 57, hex('#3a6a9a')); poligono([[56, 47], [76, 47], [72, 51], [60, 51]], C.maderaS); rect(65, 34, 66, 47, C.k); poligono([[66, 35], [74, 45], [66, 45]], C.blanco);
  // la lámpara de pie con su luz cálida
  rect(110, 64, 111, 128, C.k); poligono([[102, 64], [119, 64], [115, 54], [106, 54]], hex('#e8c880')); rect(104, 128, 117, 130, C.k);
  for (let y = 64; y < 128; y++) for (let x = 100 - (y - 64) / 3; x < 121 + (y - 64) / 3; x++) if ((Math.round(x) + y) % 3 === 0 && R.pget(Math.round(x), y) !== C.k) pset(Math.round(x), y, hex('#8a8a6a'));
  // la radio de mueble: madera, tela del altavoz, el dial que brilla y los botones; ondas cuando suena
  rect(282, 70, 316, 128, C.k); rect(283, 71, 315, 127, C.madera); rect(283, 71, 315, 73, C.maderaL); disco(299, 82, 13, C.k); disco(299, 82, 12, C.maderaL);
  rect(287, 76, 311, 98, C.k); for (let y = 77; y < 98; y++) rect(288, y, 310, y, y % 2 ? hex('#c8b088') : hex('#a89068')); rect(289, 102, 309, 108, C.k); rect(290, 103, 308, 107, Math.sin(t * 9) > -0.8 ? hex('#ffd890') : hex('#e8b860')); rect(296 + Math.round(Math.sin(t * 0.3) * 6), 103, 296 + Math.round(Math.sin(t * 0.3) * 6), 107, C.rojo);
  for (const bx of [292, 306]) { disco(bx, 115, 3, C.k); disco(bx, 115, 2, C.oroS); } rect(286, 122, 312, 127, C.maderaS);
  if (o.radio) for (let k = 0; k < 3; k++) { const r = 6 + ((t * 10 + k * 6) % 18); for (let a = -2.4; a < -0.8; a += 0.12) pset(Math.round(299 + Math.cos(a) * r), Math.round(70 + Math.sin(a) * r), C.oroL); }
  // el suelo y la alfombra
  rect(0, 140, 319, 179, hex('#6a4a2e')); for (let y = 146; y < 180; y += 6) rect(0, y, 319, y, hex('#5a3e26'));
  poligono([[50, 146], [270, 146], [296, 176], [24, 176]], hex('#8a3a3a')); for (let x = 40; x < 290; x += 10) pset(x, 160, C.oro); rect(36, 172, 284, 172, C.oroS); rect(48, 150, 272, 150, C.oroS);
}
// un sillón de los cuarenta, de lado (se pinta después de quien se sienta): respaldo alto y brazo redondo
export function sillon1947(R, x, suelo, o = {}) {
  const { rect, disco } = R, c = o.color ?? hex('#7a5a3a'), cS = o.sombra ?? hex('#5a3e26'), d = o.dir ?? 1, bx = d > 0 ? x - 4 : x + 18;
  rect(bx - 1, suelo - 30, bx + 6, suelo - 6, C.k); rect(bx, suelo - 29, bx + 5, suelo - 7, c); disco(bx + 3, suelo - 30, 4, C.k); disco(bx + 3, suelo - 30, 3, c);
  rect(x - 4, suelo - 12, x + 24, suelo - 4, C.k); rect(x - 3, suelo - 11, x + 23, suelo - 5, c); rect(x - 3, suelo - 6, x + 23, suelo - 5, cS);
  const ax = d > 0 ? x + 18 : x - 4; rect(ax, suelo - 17, ax + 6, suelo - 4, C.k); rect(ax + 1, suelo - 16, ax + 5, suelo - 5, c); disco(ax + 3, suelo - 17, 3, C.k); disco(ax + 3, suelo - 17, 2, c);
  rect(x - 2, suelo - 4, x - 1, suelo, C.maderaD); rect(x + 21, suelo - 4, x + 22, suelo, C.maderaD);
}

// ── Mogul · la versión oficial que envejece, el informe de 1994, el lanzamiento y la estratosfera ───────────────────────
// la carpeta de la versión oficial (el globo meteorológico) en un estante: el polvo y la telaraña crecen con los años
// (o.polvo 0–1) y el año corre arriba en un calendario de pared (o.anio); o.tachada (0–1): una «X» roja la tacha
export function carpetaVieja(R, t, o = {}) {
  const { rect, pset, disco, linea } = R, p = o.polvo ?? 0;
  rect(0, 0, 319, 179, hex('#8a8e78')); for (let y = 0; y < 180; y += 3) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 181) < 0.12) pset(x, y, hex('#7a7e6a'));
  rect(0, 128, 319, 136, C.maderaS); rect(0, 128, 319, 129, C.maderaL); rect(0, 136, 319, 179, hex('#5a5e4a'));
  for (let k = 0; k < 7; k++) { const x = 10 + k * 22; if (x > 90 && x < 230) continue; rect(x, 70 + (k % 2) * 6, x + 18, 128, C.k); rect(x + 1, 71 + (k % 2) * 6, x + 17, 127, [C.ocre, hex('#8a6a4a'), C.ocreS][k % 3]); rect(x + 4, 90, x + 14, 96, C.papel); }
  // la carpeta: el globo con su cordel y el «✓» de la versión oficial
  const x0 = 104, y0 = 46; rect(x0, y0, x0 + 112, 128, C.k); rect(x0 + 1, y0 + 1, x0 + 111, 127, C.ocre); rect(x0 + 8, y0 + 8, x0 + 104, 120, C.papel);
  disco(x0 + 40, y0 + 34, 14, C.k); disco(x0 + 40, y0 + 34, 13, C.blanco); pset(x0 + 35, y0 + 28, C.grisL); linea(x0 + 40, y0 + 48, x0 + 44, y0 + 66, C.k); rect(x0 + 40, y0 + 66, x0 + 48, y0 + 70, C.metalD);
  visto(R, x0 + 66, y0 + 30, 2); for (let k = 0; k < 4; k++) rect(x0 + 16, y0 + 80 + k * 7, x0 + 90 - k * 8, y0 + 80 + k * 7, C.grisL);
  // el papel amarillea y se cubre de polvo
  for (let y = y0; y < 128; y++) for (let x = x0; x < x0 + 112; x++) if (h(x, y, 182) < p * 0.35) pset(x, y, h(x, y, 183) < 0.5 ? hex('#b8a888') : hex('#a89878'));
  if (p > 0.3) { const r = Math.round((p - 0.3) * 40); for (let a = 0; a < 1.6; a += 0.2) linea(x0 + 112, y0, Math.round(x0 + 112 - Math.cos(a) * r), Math.round(y0 + Math.sin(a) * r), C.grisL); for (let k = 1; k < 4; k++) for (let a = 0; a < 1.6; a += 0.1) pset(Math.round(x0 + 112 - Math.cos(a) * r * k / 4), Math.round(y0 + Math.sin(a) * r * k / 4), C.grisL); }
  // el calendario de pared con el año
  const cx0 = 236; rect(cx0, 20, cx0 + 56, 66, C.k); rect(cx0 + 1, 21, cx0 + 55, 65, C.blanco); rect(cx0 + 1, 21, cx0 + 55, 31, C.rojo); for (const x of [cx0 + 12, cx0 + 44]) { rect(x, 16, x + 2, 24, C.metalD); }
  R.numero(String(o.anio ?? 1947), cx0 + 28, 56, { color: C.k, sombra: false, centro: true, tam: 12 });
  if (o.hoja) { const u = o.hoja; R.poligono([[cx0 + 1, 31], [cx0 + 55, 31], [cx0 + 55 - u * 30, 31 - u * 20], [cx0 + 1 + u * 10, 31 - u * 26]], C.blanco); }
  const x = o.tachada ?? 0; if (x > 0) { const n = Math.round(x * 90); for (let i = 0; i < n; i++) for (let w = -2; w <= 2; w++) { pset(x0 + 12 + i + w, y0 + 8 + i * 0.8 | 0, C.rojo); if (x > 0.5) pset(x0 + 100 - i + w, y0 + 8 + i * 0.8 | 0, C.rojo); } }
}
// el informe de 1994 que cae sobre la mesa: un tomo gordo con el emblema de las alas y «1994» (o.cae 0–1)
export function informe1994(R, t, o = {}) {
  const { rect, pset, disco, poligono } = R, c = o.cae ?? 1, y = Math.round(lerp(-90, 60, Math.min(1, c * 1.2))), tiembla = c >= 0.83 && c < 0.95 ? 2 : 0;
  rect(0, 0, 319, 179, C.madera); for (let k = 0; k < 20; k++) { const yy = Math.round(h(k, 1, 184) * 180); for (let x = 0; x < 320; x++) if ((x + k * 13) % 41 < 30) pset(x, yy + Math.round(Math.sin(x * 0.04 + k)), C.maderaS); }
  rect(70, y + 6 + tiembla, 250, y + 96 + tiembla, C.k);
  rect(72, y + 8 + tiembla, 248, y + 94 + tiembla, hex('#2a3a6a')); rect(72, y + 84 + tiembla, 248, y + 94 + tiembla, C.papel); for (let k = 0; k < 4; k++) rect(72, y + 86 + k * 2 + tiembla, 248, y + 86 + k * 2 + tiembla, C.papelS);
  const cx = 160, cy = y + 36 + tiembla; disco(cx, cy, 12, C.oro); disco(cx, cy, 10, hex('#2a3a6a')); disco(cx, cy, 4, C.oro); poligono([[cx - 34, cy - 2], [cx - 10, cy - 4], [cx - 10, cy + 2], [cx - 30, cy + 4]], C.oro); poligono([[cx + 34, cy - 2], [cx + 10, cy - 4], [cx + 10, cy + 2], [cx + 30, cy + 4]], C.oro);
  R.numero('1994', cx, y + 74 + tiembla, { color: C.oro, sombra: false, centro: true, tam: 12 });
  if (c >= 0.83 && c < 1) for (let k = 0; k < 10; k++) { const a = k * 0.63, r = 100 + (c - 0.83) * 200; pset(Math.round(cx + Math.cos(a) * r * 0.9), Math.round(y + 96 + Math.sin(a) * 10), C.maderaL); }
}
// la estratosfera de noche: la curva de la Tierra abajo con nubes y luces, el cielo negro; el micrófono del tren de globos
// cuelga en primer plano y le llegan ondas desde un hongo pequeño en el horizonte (o.ondas 0–1)
export function estratosfera(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  rect(0, 0, 319, 179, hex('#05060f')); for (let k = 0; k < 120; k++) pset(Math.round(h(k, 1, 185) * 320), Math.round(h(k, 2, 185) * 120), Math.sin(t * 2 + k) > 0.5 ? C.blanco : C.grisL);
  for (let x = 0; x < 320; x++) { const y = Math.round(150 - Math.sqrt(Math.max(0, 400 ** 2 - (x - 160) ** 2)) + 400 - 20); for (let yy = y; yy < 180; yy++) pset(x, yy, yy < y + 2 ? hex('#5a8ad8') : yy < y + 4 ? hex('#2a4a8a') : (h(x >> 2, yy >> 1, 186) < 0.3 ? hex('#3a4a6a') : hex('#1a2a4a'))); if (h(x, 3, 186) < 0.05) pset(x, y + 10 + Math.round(h(x, 4, 186) * 20), C.oroL); }
  const hx = 280, hy = 140; disco(hx, hy - 6, 4, C.naranja); disco(hx, hy - 7, 3, C.oroL); rect(hx - 1, hy - 3, hx + 1, hy + 2, C.naranja);
  const w = o.ondas ?? 0; for (let k = 0; k < 4; k++) { const r = ((t * 30 + k * 40) % 160) * w; if (r < 4) continue; for (let a = 2.4; a < 3.9; a += 0.04) pset(Math.round(hx + Math.cos(a) * r), Math.round(hy - 6 + Math.sin(a) * r * 0.6), r > 120 ? hex('#5a6a8a') : hex('#8aa8d8')); }
  // el cable con los globos que suben fuera de cuadro y el micrófono con su caja
  const mx = 110 + Math.round(Math.sin(t * 0.8) * 3), my = 96; linea(mx, 0, mx, my - 12, C.grisL); disco(mx, 18, 9, C.k); disco(mx, 18, 8, C.blanco); disco(mx - 3, 15, 3, C.nieveM); poligono_(R, mx, 50);
  rect(mx - 9, my - 12, mx + 9, my + 8, C.k); rect(mx - 8, my - 11, mx + 8, my + 7, C.metalS); rect(mx - 8, my - 11, mx + 8, my - 9, C.metalL); for (let k = 0; k < 4; k++) rect(mx - 6 + k * 4, my - 6, mx - 5 + k * 4, my + 4, C.k);
  disco(mx, my + 14, 5, C.k); disco(mx, my + 14, 4, C.metalD); for (let k = 0; k < 3; k++) pset(mx - 2 + k * 2, my + 13, C.metalL);
  if (w > 0.2 && Math.sin(t * 8) > 0) disco(mx + 6, my - 9, 1, C.rojo);
}
function poligono_(R, x, y) { R.poligono([[x, y - 6], [x - 6, y], [x, y + 6], [x + 6, y]], C.foil); R.pset(x, y, C.blanco); }
// el lanzamiento de noche: el tren de globos sube desde el desierto, dos técnicos lo sueltan; focos y una camioneta
export function lanzamientoMogul(R, t, p) {
  rancho(R, t, { noche: true, casa: false });
  for (const fx of [70, 250]) { R.rect(fx, 120, fx + 2, 140, C.metalD); for (let y = 0; y < 120; y++) for (let x = fx - (120 - y) / 5; x < fx + 2 + (120 - y) / 5; x++) if ((Math.round(x) + y) % 3 === 0 && y > 20) R.pset(Math.round(x + (fx < 160 ? (120 - y) * 0.6 : -(120 - y) * 0.6)), y, hex('#3a4268')); }
  mogul(R, 160, 150 - Math.round(p * 40), t, 0.2 + 0.8 * p);
}

// ── F hoy · la sala de noche, el archivo del Pentágono, el porche ────────────────────────────────────────────────────
// o.pantalla(R, x0, y0, x1, y1, t): lo que sale en el monitor; o.gato: 'cola' | 'teclado'
export function salaHoy(R, t, o = {}) {
  const { rect, pset, disco, poligono } = R;
  rect(0, 0, 319, 140, hex('#3a4a5a')); for (let x = 0; x < 320; x += 24) rect(x, 0, x, 140, hex('#34424f')); rect(0, 140, 319, 179, hex('#6a4a3a')); for (let y = 146; y < 180; y += 5) rect(0, y, 319, y, hex('#5e4032'));
  rect(0, 136, 319, 139, hex('#2a3440'));
  // ventana: la ciudad de noche con ventanas encendidas, la luna y un avión que cruza
  rect(196, 20, 300, 96, C.k); rect(198, 22, 298, 94, C.noche2); R.disco(276, 36, 5, C.papel); for (let k = 0; k < 12; k++) { const x = 198 + k * 9, a = 10 + Math.round(h(k, 1, 90) * 30); rect(x, 94 - a, x + 7, 94, hex('#232a50')); for (let j = 94 - a + 2; j < 92; j += 3) for (let i = x + 1; i < x + 7; i += 2) if (h(i, j, Math.floor(t * 0.3)) < 0.3) pset(i, j, C.oroL); }
  { const ax = Math.round(((t * 10) % 140) + 190); if (ax < 296) { pset(ax, 30, C.blanco); if (Math.sin(t * 6) > 0) pset(ax - 2, 30, C.rojo); } }
  rect(246, 22, 247, 94, C.k); rect(198, 57, 298, 58, C.k);
  // cortinas que se mueven con el aire de la ventana, en su barra (por detrás del monitor)
  rect(186, 16, 310, 17, C.metalD); for (const x of [186, 310]) R.disco(x, 16, 1, C.oro);
  for (const [x0, d] of [[198, -1], [298, 1]]) for (let y = 18; y < 104; y++) { const w = 6 + Math.round(Math.sin(t * 0.8 + y * 0.08) * 1.5 + (y - 18) * 0.04); rect(d < 0 ? x0 - w : x0, y, d < 0 ? x0 : x0 + w, y, (y >> 2) % 2 ? hex('#8a3a4a') : hex('#7a3040')); pset(d < 0 ? x0 - w : x0 + w, y, hex('#5a2030')); }
  // estantería con libros, una planta y un póster de cohete
  rect(14, 30, 70, 136, C.k); rect(15, 31, 69, 135, C.maderaS); for (let j = 0; j < 4; j++) { rect(15, 52 + j * 26, 69, 54 + j * 26, C.madera); for (let k = 0; k < 9; k++) { const hh = 14 + Math.round(h(j, k, 91) * 6); rect(17 + k * 6, 52 + j * 26 - hh, 21 + k * 6, 51 + j * 26, [C.rojo, C.azulL, C.verde, C.oro, C.morado][(j + k) % 5]); } }
  rect(90, 30, 118, 70, C.k); rect(91, 31, 117, 69, hex('#1e2650')); poligono([[104, 38], [100, 58], [108, 58]], C.blanco); rect(102, 58, 106, 62, Math.sin(t * 9) > 0 ? C.fuego : C.fuegoL);   // póster
  R.disco(300, 120, 8, C.verde); R.disco(296, 116, 5, C.verdeL); rect(294, 126, 306, 136, C.ocre);
  // escritorio con el ordenador: el monitor ilumina la cara del que mira
  rect(110, 110, 230, 114, C.k); rect(111, 111, 229, 113, C.madera); rect(116, 114, 120, 136, C.maderaS); rect(220, 114, 224, 136, C.maderaS);
  rect(140, 70, 200, 106, C.k); rect(142, 72, 198, 104, hex('#1a2a3a')); rect(166, 106, 174, 110, C.k);
  if (o.pantalla) o.pantalla(R, 142, 72, 198, 104, t);
  for (let y = 106; y < 136; y++) for (let x = 130 + (y - 106); x < 210 - (y - 106); x++) if ((x + y) % 3 === 0 && R.pget(x, y) === hex('#3a4a5a')) pset(x, y, hex('#4a6070'));   // el resplandor del monitor
  rect(150, 107, 190, 109, C.k); rect(151, 107, 189, 108, C.metalS);   // teclado
  // la lámpara
  rect(214, 96, 215, 110, C.metalD); poligono([[208, 96], [221, 96], [218, 90], [211, 90]], C.oro); for (let y = 97; y < 110; y++) for (let x = 206 - (y - 97) / 3; x < 224 + (y - 97) / 3; x++) if ((x + y) % 2 && R.pget(Math.round(x), y) !== C.k) pset(Math.round(x), y, C.oroL);
  // guirnalda de luces cálidas, alfombra, la taza con vapor y el móvil que parpadea
  for (let x = 120; x < 320; x += 10) { const y = 14 + Math.round(Math.sin(x * 0.05) * 3); pset(x, y, C.k); pset(x, y + 1, Math.sin(t * 2 + x) > -0.3 ? [C.oroL, hex('#ff9a6a'), hex('#9ae0ff')][(x / 10) % 3 | 0] : C.oroS); }
  R.poligono([[60, 150], [260, 150], [290, 176], [30, 176]], hex('#7a4a5a')); for (let x = 50; x < 280; x += 12) rect(x, 158, x + 6, 158, hex('#9a6a7a')); rect(40, 168, 280, 168, hex('#9a6a7a'));
  rect(204, 104, 208, 110, C.k); rect(205, 105, 207, 109, C.blanco); for (let k = 0; k < 3; k++) pset(206 + Math.round(Math.sin(t * 3 + k)), 101 - k * 2, C.grisL);
  rect(124, 107, 132, 110, C.k); if (Math.floor(t * 1.5) % 4 === 0) pset(128, 108, C.verdeL);
  if (o.gato === 'teclado') { const x = 170, y = 106, pa = hex('#c8a060'), ps = hex('#8e6a38'); R.disco(x, y, 6, C.k); R.disco(x, y, 5, pa); for (const dx of [-3, 0, 3]) R.rect(x + dx, y - 4, x + dx, y - 1, ps); R.rect(x - 11, y + 1, x - 5, y + 2, pa); R.pset(x - 9, y + 1, ps); R.disco(x + 5, y - 3, 3, pa); R.pset(x + 4, y - 7, pa); R.pset(x + 7, y - 7, pa); R.pset(x + 5, y - 3, C.k); R.pset(x + 7, y - 3, C.k); if (Math.sin(t * 2) > 0.5) R.pset(x - 12, y, pa); else R.pset(x - 12, y + 2, pa); }
  else if (o.gato !== false) gato(R, 262, 136, t);
}

// la silla de oficina, por delante de quien está sentado al escritorio (se pinta después del personaje); gira con él
export function silla(R, x, y, dir = 1) {
  const bx = dir > 0 ? x - 10 : x + 7;   // el respaldo, a la espalda de quien se sienta (dir: hacia dónde mira)
  R.rect(x - 9, y - 2, x + 9, y + 2, C.k); R.rect(x - 8, y - 1, x + 8, y + 1, hex('#2a2e3a')); R.rect(bx, y - 22, bx + 3, y, C.k); R.rect(bx + 1, y - 21, bx + 2, y - 1, hex('#3a3e4a'));
  R.rect(x - 1, y + 2, x + 1, y + 10, C.metalD); R.rect(x - 8, y + 10, x + 8, y + 11, C.metalD); for (const dx of [-8, 0, 8]) R.disco(x + dx, y + 12, 1, C.k);
}
// el monitor de cerca, a pantalla casi completa: marco, reflejo, la webcam; o.pantalla dibuja lo de dentro (x0, y0, x1, y1)
export function monitorGrande(R, t, pantalla) {
  const { rect, pset } = R;
  rect(0, 0, 319, 179, hex('#2a3440')); for (let y = 0; y < 180; y += 4) for (let x = 0; x < 320; x++) if (h(x >> 3, y, 117) < 0.2) pset(x, y, hex('#34424f'));
  rect(26, 10, 294, 166, C.k); rect(30, 14, 290, 162, hex('#1a2a3a')); pantalla(R, 32, 16, 288, 158, t);
  for (let i = 0; i < 40; i++) { pset(40 + i, 20 + Math.round(i * 0.5), hex('#5a6a7a')); }   // reflejo
  pset(160, 12, C.metalS); rect(150, 166, 170, 176, C.k); rect(120, 176, 200, 179, C.k);
}

// el archivo del Pentágono: pasillo de archivadores que se pierde al fondo; un cajón se abre solo y deja salir luz
export function archivoPentagono(R, t, o = {}) {
  const { rect, pset, poligono } = R, abre = o.abre ?? 0;
  rect(0, 0, 319, 179, hex('#2a2e3a'));
  for (let x = 0; x < 320; x += 40) rect(x + 10, 0, x + 30, 4, hex('#fff4d0'));   // tubos de luz
  // archivadores en perspectiva a los dos lados
  for (let k = 0; k < 8; k++) { const f = 1 - k / 9, w = Math.round(30 * f), hgt = Math.round(110 * f), xl = Math.round(160 - 150 * f), xr = Math.round(160 + 150 * f) - w, y0 = Math.round(90 - hgt / 2 + 10);
    for (const x of [xl, xr]) { rect(x, y0, x + w, y0 + hgt, C.k); rect(x + 1, y0 + 1, x + w - 1, y0 + hgt - 1, k % 2 ? C.metalS : C.metal); for (let j = 1; j < 4; j++) rect(x + 2, y0 + Math.round(hgt * j / 4), x + w - 2, y0 + Math.round(hgt * j / 4), C.metalD); } }
  rect(0, 150, 319, 179, hex('#3a3e4a')); for (let x = 0; x < 320; x += 20) R.linea(160, 120, x, 179, hex('#323642'));
  // el cajón del frente que se abre, con luz dorada que sale
  const cx = 160, cy = 120; rect(cx - 30, cy - 40, cx + 30, cy + 30, C.k); rect(cx - 29, cy - 39, cx + 29, cy + 29, C.metal);
  for (let j = 0; j < 3; j++) { rect(cx - 26, cy - 34 + j * 22, cx + 26, cy - 16 + j * 22, C.metalS); rect(cx - 4, cy - 28 + j * 22, cx + 4, cy - 26 + j * 22, C.k); }
  if (abre > 0) { const d = Math.round(abre * 14); rect(cx - 28, cy - 12, cx + 28, cy + 6 + d, C.k); rect(cx - 27, cy - 11, cx + 27, cy + 5 + d, C.metalL); for (let i = 0; i < 9; i++) rect(cx - 24 + i * 6, cy - 16 - (i % 3), cx - 20 + i * 6, cy - 10, i % 2 ? C.papel : C.ocre);
    for (let y = 0; y < cy - 12; y++) for (let x = cx - 28 - (cy - 12 - y) / 3; x < cx + 28 + (cy - 12 - y) / 3; x++) if ((x + y + Math.floor(t * 8)) % 4 === 0) pset(Math.round(x), y, C.oroL); }
}

// el Pentágono desde el aire, al amanecer: los cinco anillos con sus patios de luz y los pasillos radiales, el patio
// central con árboles y el quiosco, aparcamientos llenos, coches por la autopista, el Potomac y, al fondo, el obelisco y
// el Capitolio; o.luces (0–1): ventanas que se encienden
export function pentagono(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, cx = 168, cy = 118, sq = 0.48, hor = 34;
  // cielo del amanecer y la ciudad al fondo
  for (let y = 0; y < hor; y++) rect(0, y, 319, y, y < 10 ? C.tarde1 : y < 18 ? C.tarde2 : y < 26 ? C.tarde3 : C.tarde4);
  disco(60, hor, 7, C.solL); disco(60, hor, 5, C.sol);
  for (let k = 0; k < 40; k++) { const x = k * 8, a = 2 + Math.round(h(k, 1, 130) * 6); rect(x, hor - a, x + 6, hor, hex('#6a5a7a')); }
  rect(232, hor - 22, 234, hor, hex('#e8dcd0')); pset(233, hor - 23, hex('#e8dcd0')); if (Math.sin(t * 3) > 0) pset(233, hor - 22, C.rojo);   // el obelisco
  disco(272, hor - 6, 5, hex('#e8dcd0')); rect(266, hor - 6, 278, hor, hex('#e8dcd0')); rect(271, hor - 13, 273, hor - 10, hex('#e8dcd0'));   // el Capitolio
  // el suelo: césped, el Potomac en diagonal, autopistas y aparcamientos
  rect(0, hor, 319, 179, hex('#6a8a5a')); for (let k = 0; k < 300; k++) pset(Math.round(h(k, 2, 130) * 320), hor + Math.round(h(k, 3, 130) * 146), hex('#5e7e50'));
  poligono([[0, hor], [130, hor], [60, 70], [0, 92]], hex('#4a6a9a')); for (let k = 0; k < 18; k++) { const x = Math.round(h(k, 4, 130) * 110), y = hor + 2 + Math.round(h(k, 5, 130) * 40); if (y < hor + 50 - x * 0.3 && Math.sin(t * 2 + k) > 0) rect(x, y, x + 3, y, hex('#8ab0d8')); }
  const autopista = [[0, 160], [80, 150], [170, 172], [320, 156]];
  for (let i = 0; i < 3; i++) for (let w = -4; w <= 4; w++) linea(autopista[i][0], autopista[i][1] + w, autopista[i + 1][0], autopista[i + 1][1] + w, w === 0 ? hex('#5a5a68') : C.asfalto);
  linea(250, hor + 4, 296, 179, C.asfalto); linea(251, hor + 4, 297, 179, C.asfalto); linea(252, hor + 4, 298, 179, C.asfalto);
  // los coches: por la autopista en los dos sentidos y por la carretera de la derecha
  for (let k = 0; k < 10; k++) { const u = ((t * 0.05 + k / 10) % 1), sent = k % 2 ? 1 : -1, uu = sent > 0 ? u : 1 - u, seg = Math.min(2, Math.floor(uu * 3)), f = uu * 3 - seg, [x0, y0] = autopista[seg], [x1, y1] = autopista[seg + 1];
    const x = Math.round(x0 + (x1 - x0) * f), y = Math.round(y0 + (y1 - y0) * f) + sent * 2; rect(x - 1, y, x + 1, y, [C.rojo, C.blanco, C.azulL, C.amarillo, C.grisL][k % 5]); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.06 + k / 3) % 1, x = Math.round(250 + 46 * u), y = Math.round(hor + 4 + (179 - hor - 4) * u); rect(x, y, x + 1, y, k % 2 ? C.blanco : C.rojo); }
  // aparcamientos con filas de coches de colores
  for (const [x0, y0, x1, y1] of [[20, 112, 92, 146], [236, 92, 300, 128], [118, 44, 214, 62]]) { rect(x0, y0, x1, y1, C.asfalto); for (let y = y0 + 2; y < y1 - 1; y += 4) for (let x = x0 + 2; x < x1 - 2; x += 3) if (h(x, y, 131) < 0.82) rect(x, y, x + 1, y + 1, [C.rojo, C.blanco, C.azulL, C.grisL, C.k, C.amarillo, C.verdeL][Math.floor(h(x, y, 132) * 7)]); }
  // árboles sueltos
  for (let k = 0; k < 26; k++) { const x = Math.round(h(k, 6, 130) * 320), y = Math.round(hor + 10 + h(k, 7, 130) * 136); if (Math.hypot((x - cx) / 1, (y - cy) / sq) < 100 || (x > 18 && x < 94 && y > 110 && y < 148)) continue; disco(x, y, 3, hex('#3a6a3a')); disco(x - 1, y - 1, 2, hex('#4a8a4a')); }
  // el edificio: un pentágono con altura (fachada más oscura debajo) y cinco anillos con patios de luz
  const P = (r, dy = 0) => Array.from({ length: 5 }, (_, k) => { const a = -Math.PI / 2 + k * 2 * Math.PI / 5 + Math.PI / 5; return [Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r * sq + dy)]; });
  poligono(P(92, 12), hex('#3a3e4a'));   // sombra
  poligono(P(86, 9), hex('#7a7e8a')); poligono(P(86), hex('#c4c8d0'));
  // ventanas de la fachada (las tres caras de delante): se encienden poco a poco
  const ext = P(86); for (let k = 0; k < 5; k++) { const [x0, y0] = ext[k], [x1, y1] = ext[(k + 1) % 5]; if ((y0 + y1) / 2 < cy) continue; const n = Math.round(Math.hypot(x1 - x0, y1 - y0) / 3);
    for (let i = 1; i < n; i++) { const x = Math.round(x0 + (x1 - x0) * i / n), y = Math.round(y0 + (y1 - y0) * i / n); for (const dy of [3, 6]) pset(x, y + dy, h(i, k * 9 + dy, 133) < (o.luces ?? 0.3) ? C.oroL : hex('#4a4e5a')); } }
  const anillos = [[76, '#6a6e78'], [73, '#b8bcc4'], [62, '#6a6e78'], [59, '#c4c8d0'], [48, '#6a6e78'], [45, '#b8bcc4']];
  for (const [r, c] of anillos) poligono(P(r), hex(c));
  // pasillos radiales entre anillos
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5 + Math.PI / 5, f = k % 2 ? 0.809 : 1; linea(Math.round(cx + Math.cos(a) * 34 * f), Math.round(cy + Math.sin(a) * 34 * f * sq), Math.round(cx + Math.cos(a) * 84 * f), Math.round(cy + Math.sin(a) * 84 * f * sq), hex('#a8acb4')); }
  // el patio central: la pared del fondo se ve; césped, caminos en estrella, árboles y el quiosco del centro; gente
  poligono(P(34), hex('#8a8e98')); poligono(P(33, 3), hex('#5a9a4a'));
  for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; linea(cx, cy + 2, Math.round(cx + Math.cos(a) * 28), Math.round(cy + 2 + Math.sin(a) * 28 * sq), C.camino); }
  for (let k = 0; k < 8; k++) { const a = k * 0.8, x = Math.round(cx + Math.cos(a) * 18), y = Math.round(cy + 3 + Math.sin(a) * 18 * sq); disco(x, y, 2, hex('#3a6a3a')); pset(x - 1, y - 1, hex('#5a9a4a')); }
  rect(cx - 3, cy, cx + 3, cy + 4, C.ocre); poligono([[cx - 5, cy], [cx, cy - 4], [cx + 5, cy]], C.rojoS);
  for (let k = 0; k < 4; k++) { const u = (t * 0.08 + k / 4) % 1, a = k * 1.6; pset(Math.round(cx + Math.cos(a) * 24 * (1 - u)), Math.round(cy + 2 + Math.sin(a) * 24 * sq * (1 - u)), C.k); }
  // la bandera en la entrada y una bandada que cruza
  rect(118, 150, 118, 162, C.metalD); for (let j = 0; j < 4; j++) rect(119, 150 + j, 125 + Math.round(Math.sin(t * 4 + j) * 1), 150 + j, j % 2 ? C.blanco : C.rojo); rect(119, 150, 121, 151, C.azul);
  bandada(R, t, { tipo: 'golondrina', n: 5, y: 22, cada: 8 });
}

// la sala del archivo, de frente y a la escala de la gente: estanterías altas con cajas numeradas al fondo, pasillos entre
// ellas que se pierden, tubos de luz (uno parpadea), una cámara con su luz roja, la señal verde de salida, el suelo
// encerado que refleja, y delante una fila de archivadores de cuatro cajones; o.abre (0–1) abre el cajón o.cajon
// (índice del archivador, 0–7) y sale la luz dorada
export function archivoSala(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, suelo = 150;
  rect(0, 0, 319, suelo, hex('#3a3e4c')); rect(0, 0, 319, 12, hex('#2a2e3a'));
  for (let k = 0; k < 4; k++) { const x = 20 + k * 80, mal = k === 2 && Math.sin(t * 23) * Math.sin(t * 3.1) > 0.3; rect(x, 12, x + 40, 14, C.k); rect(x + 1, 12, x + 39, 13, mal ? hex('#6a6a5a') : hex('#fff4d0'));
    if (!mal) for (let y = 15; y < 46; y++) for (let xx = x - (y - 15) / 3; xx < x + 40 + (y - 15) / 3; xx++) if ((Math.round(xx) + y) % 4 === 0) pset(Math.round(xx), y, hex('#464a5a')); }
  // conductos del aire y la tubería de los rociadores, con sus abrazaderas; el reloj de pared
  rect(0, 20, 319, 27, C.k); rect(0, 21, 319, 26, hex('#6a6e7a')); rect(0, 21, 319, 22, hex('#8a8e9a')); for (let x = 30; x < 320; x += 60) rect(x, 20, x + 2, 27, hex('#4a4e5a'));
  rect(0, 33, 319, 34, hex('#8a3a3a')); for (let x = 50; x < 320; x += 70) { rect(x, 35, x, 37, C.metalD); pset(x - 1, 38, C.metalL); pset(x + 1, 38, C.metalL); }
  disco(160, 38, 5, C.k); disco(160, 38, 4, C.blanco); const ah = t * 0.6, am = t * 6; linea(160, 38, Math.round(160 + Math.sin(ah) * 2), Math.round(38 - Math.cos(ah) * 2), C.k); linea(160, 38, Math.round(160 + Math.sin(am) * 3), Math.round(38 - Math.cos(am) * 3), C.k);
  // estanterías del fondo con cajas numeradas y los pasillos oscuros entre ellas
  for (let k = 0; k < 7; k++) { const x0 = k * 48 - 6, x1 = x0 + 38;
    rect(x0, 46, x1, 112, C.k); rect(x0 + 1, 47, x1 - 1, 112, hex('#5a5e6c'));
    for (let j = 0; j < 3; j++) { const y = 48 + j * 21; rect(x0 + 1, y + 18, x1 - 1, y + 19, hex('#7a7e8c'));
      for (let i = 0; i < 4; i++) { const bx = x0 + 3 + i * 9; if (h(k, j * 4 + i, 137) < 0.12) continue; rect(bx, y + 5, bx + 7, y + 17, C.k); rect(bx + 1, y + 6, bx + 6, y + 17, h(k, i + j, 138) < 0.5 ? hex('#c8a878') : hex('#b8986a')); rect(bx + 2, y + 9, bx + 5, y + 11, C.blanco); } }
    poligono([[x1, 46], [x1 + 10, 54], [x1 + 10, 106], [x1, 112]], hex('#1e2028')); for (let y = 60; y < 104; y += 12) rect(x1 + 2, y, x1 + 7, y + 1, hex('#2a2e3a')); }
  // la cámara de seguridad y la salida
  rect(296, 40, 312, 46, C.k); rect(297, 41, 309, 45, C.metal); rect(310, 36, 312, 40, C.metalD); if (Math.floor(t * 1.5) % 2) pset(298, 43, C.rojo);
  rect(10, 36, 26, 44, C.k); rect(11, 37, 25, 43, C.verde); disco(15, 38, 1, C.blanco); linea(15, 39, 15, 41, C.blanco); linea(15, 41, 13, 43, C.blanco); linea(15, 41, 17, 43, C.blanco); linea(15, 40, 18, 39, C.blanco); linea(19, 40, 23, 40, C.blanco);
  // el suelo encerado con el reflejo de los tubos
  rect(0, 112, 319, 179, hex('#4a4e5c')); for (let y = 114; y < 180; y += 6) rect(0, y, 319, y, hex('#444856')); for (let k = 0; k < 4; k++) for (let y = 156; y < 176; y += 2) rect(28 + k * 80, y, 52 + k * 80, y, hex('#5a5e6e'));
  // los archivadores de delante (tres cajones)
  for (let k = 0; k < 8; k++) { const x = 8 + k * 39, y0 = 122, y1 = suelo - 2, abre = k === o.cajon ? (o.abre ?? 0) : 0;
    rect(x, y0, x + 30, y1, C.k); rect(x + 1, y0 + 1, x + 29, y1, k % 2 ? C.metal : hex('#a4aebe')); rect(x + 1, y0 + 1, x + 29, y0 + 1, C.metalL);
    for (let j = 0; j < 3; j++) { const y = y0 + 3 + j * 8, sal = j === 0 ? Math.round(abre * 4) : 0;
      if (sal) { rect(x + 3, y - 4, x + 27, y, C.k); for (let i = 0; i < 8; i++) rect(x + 4 + i * 3, y - 5 - (i % 2), x + 5 + i * 3, y - 1, i % 3 ? C.papel : C.ocre); for (let yy = y0 - 50; yy < y - 4; yy++) for (let xx = x + 2 - (y - yy) / 4; xx < x + 28 + (y - yy) / 4; xx++) if ((Math.round(xx) + yy + Math.floor(t * 8)) % 3 === 0) pset(Math.round(xx), yy, C.oroL); }
      rect(x + 3, y + sal, x + 27, y + 6 + sal, C.k); rect(x + 4, y + 1 + sal, x + 26, y + 5 + sal, k % 2 ? C.metalS : C.metal); rect(x + 12, y + 3 + sal, x + 18, y + 3 + sal, C.metalL); rect(x + 13, y + 1 + sal, x + 17, y + 1 + sal, C.blanco); } }
}
// un carrito con cajas de archivo (se pinta delante de quien lo empuja)
export function carrito(R, x, suelo, t) {
  const { rect, disco } = R;
  rect(x, suelo - 14, x + 26, suelo - 12, C.k); rect(x + 1, suelo - 13, x + 25, suelo - 13, C.metalL); rect(x - 2, suelo - 26, x, suelo - 12, C.metalD);
  for (let i = 0; i < 2; i++) { rect(x + 2 + i * 12, suelo - 24, x + 12 + i * 12, suelo - 14, C.k); rect(x + 3 + i * 12, suelo - 23, x + 11 + i * 12, suelo - 15, hex('#c8a878')); rect(x + 5 + i * 12, suelo - 20, x + 9 + i * 12, suelo - 18, C.blanco); }
  for (const dx of [3, 23]) { disco(x + dx, suelo - 3, 3, C.k); disco(x + dx, suelo - 3, 1, C.metalS); }
}

// el cajón abierto visto desde arriba: carpetas colgantes con pestañas, unas con «✓» verde (resueltas) y otras con «?»
// rojo; o.dedo (0–1): un dedo recorre las pestañas y las va inclinando; o.saca (0–1): sube la carpeta del «?» elegida
export function cajonArriba(R, t, o = {}) {
  const { rect, pset, disco } = R, dedo = o.dedo ?? -1, saca = o.saca ?? 0, elegida = 7;
  rect(0, 0, 319, 179, hex('#2a2e3a')); for (let y = 0; y < 180; y += 2) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 134) < 0.12) pset(x, y, hex('#323644'));
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot(x - 160, y - 60) / 200; if ((x + y) % 3 === 0 && d < 0.5 && R.pget(x, y) !== C.k) pset(x, y, hex('#3a3e4c')); }   // el resplandor del tubo de luz
  rect(40, 4, 280, 179, C.k); rect(42, 6, 278, 179, C.metalD); rect(52, 14, 268, 179, hex('#1e2028'));
  rect(42, 6, 278, 9, C.metalL); rect(42, 6, 45, 179, C.metal); rect(275, 6, 278, 179, C.metalS);   // los cantos del cajón
  // las carpetas, de atrás (arriba) a delante (abajo); la pestaña de cada una con su marca. La elegida, al sacarla, se
  // pinta la última: sube hacia la cámara (más ancha y más arriba) con su sombra debajo
  const n = 12, marcas = ['✓', '✓', '?', '✓', '✓', '?', '✓', '?', '✓', '✓', '?', '✓'];
  const carpeta = (k, y, inclina, ancho = 0, grande = false) => {
    const col = [C.ocre, hex('#c8b070'), hex('#7a9a6a'), hex('#d8a050')][k % 4], x0 = 56 - ancho, x1 = 264 + ancho;
    rect(x0, y + inclina, x1, y + 10 + inclina + (grande ? 4 : 0), C.k); rect(x0 + 1, y + 1 + inclina, x1 - 1, y + 9 + inclina + (grande ? 4 : 0), col); rect(x0 + 1, y + 1 + inclina, x1 - 1, y + 2 + inclina, C.papel);
    for (let i = 0; i < 3; i++) rect(70 + i * 60 + Math.round(h(k, i, 135) * 30), y - 2 + inclina, 100 + i * 60 + Math.round(h(k, i, 135) * 30), y + inclina, C.papel);   // hojas que asoman
    const tx = 80 + Math.round(h(k, 9, 135) * 150), tw = grande ? 34 : 22, th = grande ? 16 : 9; rect(tx - 1, y - th + inclina, tx + tw, y + inclina, C.k); rect(tx, y - th + 1 + inclina, tx + tw - 1, y + inclina, C.blanco);
    if (marcas[k] === '?') R.icono('?', tx + (grande ? 12 : 9), y - th + 2 + inclina, C.rojo, C.blanco, grande ? 2 : 1); else visto(R, tx + 5, y - 7 + inclina, 1);
  };
  for (let k = 0; k < n; k++) { if (k === elegida && saca > 0) continue; const pasada = dedo >= 0 && k < Math.floor(dedo * n); carpeta(k, 30 + k * 12, pasada ? 3 : 0); }
  if (saca > 0) { const y = 30 + elegida * 12 - Math.round(saca * 22); for (let j = 0; j < 6; j++) for (let x = 60; x < 262; x += 2) if ((x + j) % 4 === 0) pset(x, 30 + elegida * 12 + 12 + j, hex('#14161c')); carpeta(elegida, y, 0, Math.round(saca * 8), saca > 0.5); }
  if (dedo >= 0 && dedo <= 1) { const k = Math.min(n - 1, Math.floor(dedo * n)), y = 30 + k * 12 + 10; mano(R, 150 + Math.round(Math.sin(t * 3) * 4), y, -1, '#2a3a5a'); }
}

// el porche de una casa por la mañana, con el periódico que llega volando. o.invierno: diciembre (nieve en el suelo y en
// el tejado, árboles pelados, copos que caen, luces de Navidad en el alero, corona en la puerta y humo en la chimenea)
export function porche(R, t, o = {}) {
  const { rect, pset, poligono } = R, inv = !!o.invierno, suelo = inv ? C.nieve : C.hierba;
  cielo(R, t, { hor: 110, sol: [60, 26, 8], invierno: inv });
  rect(0, 110, 319, 179, suelo); for (let k = 0; k < 60; k++) pset(Math.round(h(k, 1, 92) * 320), 112 + Math.round(h(k, 2, 92) * 66), inv ? C.nieveS : C.hierbaL);
  if (inv) for (let k = 0; k < 7; k++) { const x = k * 26 - 6, w = 20, y = 96 + Math.round(h(k, 1, 120) * 6);   // las casas de enfrente, lejos, con tejado nevado y una ventana encendida
    rect(x, y, x + w, 110, k % 2 ? C.inv1 : hex('#9aa4b8')); poligono([[x - 2, y], [x + w / 2, y - 8], [x + w + 2, y]], C.nieve); if (h(k, 2, 120) < 0.7) rect(x + 6, y + 4, x + 9, y + 7, Math.sin(t * 0.5 + k) > -0.7 ? C.oroL : C.oro); }
  // la chimenea con humo (en invierno)
  if (inv) { rect(286, 22, 298, 44, C.k); rect(287, 23, 297, 44, C.ladrillo); for (let y = 25; y < 44; y += 4) rect(287, y, 297, y, C.ladrilloS); rect(285, 20, 299, 23, C.nieve);
    for (let k = 0; k < 6; k++) { const u = ((t * 0.4 + k / 6) % 1), x = Math.round(292 + u * 18 + Math.sin(t + k) * 2), y = Math.round(16 - u * 30); R.disco(x, y, 2 + Math.round(u * 3), u > 0.7 ? C.inv3 : C.blanco); } }
  rect(170, 50, 319, 140, hex('#e8dcc4')); for (let y = 54; y < 140; y += 5) rect(170, y, 319, y, hex('#d4c8ae')); poligono([[160, 52], [244, 20], [330, 52]], C.rojoS);
  if (inv) { poligono([[162, 50], [244, 19], [328, 50], [244, 26]], C.nieve); for (let x = 166; x < 324; x += 3) pset(x, 51 + (x % 2), C.nieveS); }
  rect(196, 72, 222, 100, C.k); rect(198, 74, 220, 98, inv ? hex('#f0c870') : C.cristal); rect(254, 80, 278, 140, C.maderaS); R.disco(274, 112, 1, C.oro);
  if (inv) { rect(209, 74, 209, 98, C.k); rect(198, 86, 220, 86, C.k); poligono([[214, 78], [206, 98], [222, 98]], C.pino); for (let k = 0; k < 5; k++) if (Math.sin(t * 3 + k * 2) > 0) pset(210 + (k * 3) % 9, 84 + k * 3, [C.rojo, C.oroL, C.azulL][k % 3]);   // el árbol de Navidad tras la ventana
    R.disco(266, 96, 6, C.pino); R.disco(266, 96, 3, C.maderaS); pset(266, 102, C.rojo); pset(265, 103, C.rojo); pset(267, 103, C.rojo); }   // la corona
  rect(164, 130, 319, 140, C.madera); rect(164, 130, 319, 131, inv ? C.nieve : C.maderaL); for (const x of [170, 240, 312]) rect(x, 100, x + 3, 130, C.blanco);
  if (inv) for (let x = 164; x < 320; x += 6) { const y = 53 + Math.round(Math.sin((x - 164) * 0.08) * 2); pset(x, y, C.k); if (Math.sin(t * 2.5 + x * 0.7) > -0.2) pset(x, y + 1, [C.rojo, C.oroL, C.verdeL, C.azulL][(x / 6 | 0) % 4]); }   // luces en el alero
  rect(0, 150, 160, 162, inv ? C.nieveS : C.camino);   // la acera
  if (inv) { rect(0, 166, 319, 179, C.asfalto); rect(0, 166, 319, 167, C.nieveS); for (let x = 0; x < 320; x += 3) if (h(x, 3, 120) < 0.4) pset(x, 168 + Math.round(h(x, 4, 120) * 10), C.asfaltoS); for (let x = 10; x < 320; x += 30) rect(x, 175, x + 14, 175, C.blanco); }   // la calle
  if (inv) for (let x = 6; x < 156; x += 11) { pset(x, 154 + (x % 3), C.inv1); pset(x + 4, 157 + (x % 2), C.inv1); }   // huellas en la acera
  if (inv) { arbol(R, 60, 140, t, { tipo: 'invierno', s: 1.6 }); arbol(R, 130, 146, t + 1, { tipo: 'invierno', s: 1.2 }); }
  else { arbol(R, 60, 140, t, { tipo: 'verde', s: 1.6 }); arbol(R, 130, 146, t + 1, { tipo: 'verde', s: 1.2 }); bandada(R, t, { tipo: 'golondrina', n: 4, y: 40, cada: 9 }); }
  // valla blanca, buzón, flores (o nieve) y un aspersor que gira (en verano)
  for (let x = 0; x < 160; x += 6) { rect(x, 136, x + 3, 148, C.blanco); pset(x + 1, 135, C.blanco); if (inv) rect(x, 134, x + 3, 135, C.nieve); } rect(0, 140, 160, 141, C.blanco);
  rect(150, 124, 152, 148, C.maderaD); rect(144, 116, 158, 124, C.k); rect(145, 117, 157, 123, C.azulL); rect(158, 117, 159, 121, C.rojo); if (inv) rect(144, 114, 158, 116, C.nieve);
  if (!inv) { for (let k = 0; k < 16; k++) { const x = 168 + k * 9, y = 142; pset(x, y, [C.rojo, C.amarillo, C.rosa, C.blanco][k % 4]); pset(x, y + 1, C.hierbaS); }
    const a = t * 3; for (let k = 0; k < 8; k++) { const d = 4 + k * 3, x = Math.round(80 + Math.cos(a) * d), y = Math.round(160 + Math.sin(a) * d * 0.3) - Math.round(Math.sin(k / 8 * Math.PI) * 4); pset(x, y, C.cielo3); } pset(80, 160, C.metalD); }
  else { rect(172, 141, 312, 144, C.nieve); for (let k = 0; k < 3; k++) { const x = 70 + k * 6; R.disco(x + 30, 172 - k * 6, 5 - k, C.k); R.disco(x + 30, 172 - k * 6, 4 - k, C.blanco); } pset(100, 160, C.naranja); pset(101, 160, C.naranja); pset(99, 159, C.k); pset(101, 159, C.k); }   // un muñeco de nieve
}

// un coche aparcado con nieve encima, de lado (x: la esquina de atrás; se pinta delante de la gente)
export function cocheNevado(R, x, suelo, t) {
  const { rect, disco, pset } = R, y = suelo - 6;
  rect(x, y - 12, x + 52, y, C.k); rect(x + 1, y - 11, x + 51, y - 1, hex('#3a5a8a')); rect(x + 10, y - 20, x + 40, y - 11, C.k); rect(x + 11, y - 19, x + 39, y - 11, hex('#3a5a8a'));
  rect(x + 13, y - 18, x + 24, y - 12, C.cristalS); rect(x + 27, y - 18, x + 37, y - 12, C.cristalS); pset(x + 14, y - 17, C.blanco);
  rect(x + 9, y - 22, x + 41, y - 20, C.nieve); rect(x, y - 13, x + 10, y - 12, C.nieve); rect(x + 41, y - 13, x + 52, y - 12, C.nieve);
  rect(x + 50, y - 9, x + 52, y - 7, C.oroL); rect(x, y - 9, x + 1, y - 7, C.rojo);
  for (const cx of [x + 11, x + 41]) { disco(cx, y, 6, C.k); disco(cx, y, 4, hex('#4a4e5a')); disco(cx, y, 2, C.metalS); }
}

// el perro de la casa, de lado y a la escala de la puerta de cerca (unos 36 × 26 px): o.dir, o.anda (trota), o.baja (la
// cabeza al suelo, 0–1), o.lleva (el periódico en la boca); la cola no para
export function perro(R, x, suelo, t, o = {}) {
  const { rect, disco, pset } = R, d = o.dir ?? 1, X = (i) => Math.round(x + i * d), dorado = hex('#d89a4a'), doradoS = hex('#a86a2a'), doradoL = hex('#f0c070');
  const paso = o.anda ? Math.sin(t * 14) : 0, rebote = o.anda ? Math.round(Math.abs(paso)) : 0, y = suelo - 8 - rebote, baja = Math.round((o.baja ?? 0) * 9);
  // patas (las de atrás y las de delante, alternas al trotar)
  for (const [i, f] of [[4, 1], [8, -1], [22, -1], [26, 1]]) { const dx = Math.round(paso * f * 2); rect(Math.min(X(i + dx), X(i + dx + 2)), y + 2, Math.max(X(i + dx), X(i + dx + 2)), suelo - 1, C.k); rect(Math.min(X(i + dx), X(i + dx + 2)), y + 2, Math.max(X(i + dx), X(i + dx + 2)) - 1, suelo - 2, i % 2 ? doradoS : dorado); }
  // cuerpo y cola
  for (let j = -6; j <= 4; j++) for (let i = 0; i <= 30; i++) { const e = ((i - 15) / 15) ** 2 + (j / (j < 0 ? 6.5 : 5)) ** 2; if (e < 1) pset(X(i), y + j, e > 0.8 ? C.k : j > 1 ? doradoS : j < -3 ? doradoL : dorado); }
  const ca = Math.sin(t * 16) * 0.6 - 0.8; for (let k = 0; k < 9; k++) { const cx = X(-k * Math.cos(ca) * 0.9), cy = Math.round(y - 4 + k * Math.sin(ca) * 0.9 - k * 0.4); disco(cx, cy, 1, k > 6 ? doradoL : dorado); }
  // cabeza: cráneo, hocico, nariz, oreja caída, ojo, collar rojo con chapa
  const hx = 30, hy = y - 8 + baja; for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const e = (i / 6.5) ** 2 + (j / 6) ** 2; if (e < 1) pset(X(hx + i), hy + j, e > 0.75 ? C.k : dorado); }
  rect(Math.min(X(hx + 3), X(hx + 11)), hy + 1, Math.max(X(hx + 3), X(hx + 11)), hy + 6, C.k); rect(Math.min(X(hx + 4), X(hx + 10)), hy + 2, Math.max(X(hx + 4), X(hx + 10)), hy + 5, doradoL);
  rect(Math.min(X(hx + 10), X(hx + 12)), hy + 1, Math.max(X(hx + 10), X(hx + 12)), hy + 3, C.k);
  for (let j = 0; j < 9; j++) rect(Math.min(X(hx - 4), X(hx - 1)), hy - 4 + j, Math.max(X(hx - 4), X(hx - 1)), hy - 4 + j, j > 6 ? C.k : doradoS);
  if (Math.sin(t * 1.3) > -0.95) { pset(X(hx + 3), hy - 2, C.k); pset(X(hx + 3), hy - 3, C.k); } else pset(X(hx + 3), hy - 2, C.k);
  if (!o.lleva && !o.baja) { pset(X(hx + 6), hy + 6, C.rosa); pset(X(hx + 6), hy + 7, C.rosa); }   // la lengua fuera
  rect(Math.min(X(hx - 6), X(hx - 3)), hy + 4, Math.max(X(hx - 6), X(hx - 3)), hy + 6, C.rojo); pset(X(hx - 4), hy + 7, C.oroL);
  if (o.lleva) { const px = X(hx + 6); rect(px - 9, hy + 5, px + 9, hy + 9, C.k); rect(px - 8, hy + 6, px + 8, hy + 8, C.papel); rect(px - 1, hy + 6, px, hy + 8, C.rojo); }
}

// copos de nieve que caen (por delante de todo)
export function copos(R, t, n = 60, x0 = 0, x1 = 319) {
  for (let k = 0; k < n; k++) { const v = 8 + h(k, 1, 121) * 10, x = Math.round(x0 + ((h(k, 2, 121) * (x1 - x0) + Math.sin(t * 0.8 + k) * 6) % (x1 - x0 + 1))), y = Math.round((h(k, 3, 121) * 200 + t * v) % 200) - 10;
    R.pset(x, y, C.blanco); if (k % 4 === 0) { R.pset(x + 1, y, C.nieveS); R.pset(x, y + 1, C.nieveS); } }
}

// una bicicleta con cesta de periódicos; se pinta después del ciclista para taparle las piernas (x: la rueda de atrás)
export function bici(R, x, suelo, t, o = {}) {
  const { rect, pset, disco, linea } = R, r = 6, xa = x, xd = x + 20, y = suelo - r, g = t * 8;
  for (const cx of [xa, xd]) { disco(cx, y, r, C.k); disco(cx, y, r - 1, hex('#3a3e4a')); disco(cx, y, r - 2, o.fondo ?? C.nieve); for (let k = 0; k < 3; k++) { const a = g + k * Math.PI / 3; linea(Math.round(cx - Math.cos(a) * 4), Math.round(y - Math.sin(a) * 4), Math.round(cx + Math.cos(a) * 4), Math.round(y + Math.sin(a) * 4), C.metalS); } pset(cx, y, C.k); }
  linea(xa, y, xa + 9, y, C.rojo); linea(xa + 9, y, xa + 6, y - 9, C.rojo); linea(xa + 6, y - 9, xd - 3, y - 9, C.rojo); linea(xd - 3, y - 9, xd, y, C.rojo); linea(xa, y, xa + 6, y - 9, C.rojo); linea(xa + 9, y, xd - 3, y - 9, C.rojo);
  rect(xa + 4, y - 11, xa + 8, y - 10, C.k); linea(xd - 3, y - 9, xd - 2, y - 14, C.metalD); rect(xd - 4, y - 15, xd, y - 14, C.k);
  const p = g * 0.5; pset(Math.round(xa + 9 + Math.cos(p) * 3), Math.round(y + Math.sin(p) * 3), C.k);
  if (o.cesta !== false) { rect(xd - 2, y - 14, xd + 7, y - 8, C.k); rect(xd - 1, y - 13, xd + 6, y - 9, C.maderaL); for (let k = 0; k < (o.cesta ?? 3); k++) rect(xd + k * 2, y - 16, xd + k * 2 + 1, y - 13, C.papel); }
}

// la puerta de casa de cerca, en diciembre: siding, puerta con corona que se abre (o.abre 0–1) y deja salir la luz cálida
// del recibidor con el árbol de Navidad, farol encendido, felpudo, maceta nevada, escalones con nieve; o.diario: x del
// periódico enrollado en el suelo (null, nada)
export function puertaCerca(R, t, o = {}) {
  const { rect, pset, disco, poligono } = R, abre = o.abre ?? 0;
  rect(0, 0, 319, 179, hex('#e8dcc4')); for (let y = 4; y < 150; y += 7) { rect(0, y, 319, y, hex('#d4c8ae')); rect(0, y + 1, 319, y + 1, hex('#f0e6d2')); }
  rect(0, 0, 319, 8, C.blanco); for (let x = 0; x < 320; x += 10) { const y = 10 + Math.round(Math.sin(x * 0.05) * 2); R.linea(x, y, x + 10, 10 + Math.round(Math.sin((x + 10) * 0.05) * 2), C.k); if (Math.sin(t * 2.5 + x * 0.3) > -0.2) { pset(x + 5, y + 2, [C.rojo, C.oroL, C.verdeL, C.azulL][(x / 10 | 0) % 4]); pset(x + 5, y + 3, [C.rojo, C.oroL, C.verdeL, C.azulL][(x / 10 | 0) % 4]); } }
  // la ventana de la izquierda, con el árbol de Navidad por dentro
  rect(22, 34, 92, 112, C.blanco); rect(26, 38, 88, 108, C.k); rect(27, 39, 87, 107, hex('#f0c870')); rect(56, 39, 57, 107, C.blanco); rect(27, 72, 87, 73, C.blanco);
  poligono([[44, 50], [32, 104], [56, 104]], C.pino); poligono([[44, 50], [38, 76], [50, 76]], hex('#3a7a4a')); for (let k = 0; k < 9; k++) if (Math.sin(t * 3 + k * 1.7) > -0.2) disco(36 + (k * 7) % 18, 60 + k * 5, 1, [C.rojo, C.oroL, C.azulL][k % 3]); pset(44, 48, C.oroL); pset(43, 49, C.oroL); pset(45, 49, C.oroL);
  rect(16, 112, 98, 116, C.blanco); rect(16, 110, 98, 112, C.nieve);
  // la puerta: el hueco con la luz de dentro, y la hoja que gira hacia dentro
  const px0 = 130, px1 = 186, py0 = 30, py1 = 146;
  rect(px0 - 6, py0 - 6, px1 + 6, py1, C.blanco); rect(px0 - 1, py0 - 1, px1 + 1, py1, C.k);
  rect(px0, py0, px1, py1 - 1, hex('#f4d890')); rect(px0, py1 - 30, px1, py1 - 1, hex('#c89a6a')); for (let x = px0; x < px1; x += 8) rect(x, py1 - 30, x, py1 - 1, hex('#b0845a'));
  rect(px0 + 30, py0 + 20, px0 + 31, py1 - 30, hex('#e8c070')); poligono([[px1 - 10, py0 + 30], [px1 - 22, py1 - 34], [px1 + 2, py1 - 34]], C.pino);
  const w = Math.round((px1 - px0) * (1 - abre * 0.8)); rect(px0, py0, px0 + w, py1 - 1, C.k); rect(px0 + 1, py0 + 1, px0 + w - 1, py1 - 1, hex('#2a4a6a'));
  if (w > 20) { rect(px0 + 6, py0 + 8, px0 + w - 6, py0 + 50, hex('#24405c')); rect(px0 + 6, py0 + 60, px0 + w - 6, py1 - 10, hex('#24405c')); const cx = px0 + Math.round(w / 2); disco(cx, py0 + 34, 13, hex('#2a5a3a')); disco(cx, py0 + 34, 10, hex('#3a7a4a')); disco(cx, py0 + 34, 6, hex('#2a4a6a')); rect(cx - 2, py0 + 44, cx + 2, py0 + 50, C.rojo); for (let k = 0; k < 6; k++) { const a = k * 1.05; pset(Math.round(cx + Math.cos(a) * 11), Math.round(py0 + 34 + Math.sin(a) * 11), C.rojo); } rect(px0 + w - 8, py0 + 70, px0 + w - 5, py0 + 74, C.oro); }
  if (abre > 0.1) for (let y = py1; y < 179; y++) for (let x = px0 + Math.round((y - py1) * -0.5); x < px1 + Math.round((y - py1) * 0.5); x++) if ((x + y) % 2 === 0) pset(x, y, C.oroL);   // la luz que sale
  // farol, el número de la casa, la maceta con nieve
  rect(200, 50, 214, 70, C.k); rect(202, 52, 212, 68, Math.sin(t * 7) > -0.9 ? C.oroL : C.oro); rect(200, 46, 214, 50, C.k); rect(206, 44, 208, 46, C.k);
  for (let y = 40; y < 80; y++) for (let x = 192; x < 222; x++) if ((x + y) % 4 === 0 && Math.hypot(x - 207, y - 60) < 16 && R.pget(x, y) !== C.k) pset(x, y, hex('#fff4d0'));
  R.numero('42', 226, 46, { color: C.k, sombra: false });
  rect(240, 112, 266, 146, C.k); rect(241, 113, 265, 145, C.naranjaS); rect(238, 108, 268, 113, C.k); rect(239, 109, 267, 112, C.naranja); disco(253, 104, 9, C.pinoS); disco(253, 102, 6, C.pino); rect(244, 98, 262, 100, C.nieve);
  // el porche: tablones, felpudo, escalones con nieve
  rect(0, 146, 319, 179, C.madera); for (let y = 150; y < 180; y += 6) rect(0, y, 319, y, C.maderaS); rect(0, 146, 319, 147, C.maderaL);
  rect(120, 148, 196, 156, C.k); rect(121, 149, 195, 155, hex('#8a5a3a')); for (let x = 124; x < 194; x += 4) rect(x, 150, x, 154, hex('#6a4028'));
  for (let x = 0; x < 320; x++) if (h(x, 0, 122) < 0.5 && (x < 110 || x > 210)) rect(x, 146, x, 147 + Math.round(h(x, 1, 122) * 3), C.nieve);
  if (o.diario != null) { const x = Math.round(o.diario); rect(x - 9, 160, x + 9, 167, C.k); rect(x - 8, 161, x + 8, 166, C.papel); rect(x - 2, 161, x - 1, 166, C.rojo); R.disco(x + 8, 163, 3, C.k); R.disco(x + 8, 163, 2, C.papelS); }
}

// la portada de un periódico de hoy, sostenida con las dos manos (o.abre 0–1: se desenrolla): cabecera negra decorada (sin
// letras), el año, titulares en barras gruesas, la foto del vídeo de la Marina (gris, con la mancha blanca y la retícula) y
// el caza en una foto pequeña; copos que caen sobre el papel
export function portadaMano(R, t, o = {}) {
  const { rect, pset, disco } = R, a = o.abre ?? 1;
  // la calle nevada detrás, desenfocada: cielo gris, casas en manchas, nieve, y las luces de Navidad como círculos borrosos
  rect(0, 0, 319, 90, C.inv2); rect(0, 90, 319, 179, C.nieve); for (let y = 86; y < 94; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 && y > 90 - (x % 7)) pset(x, y, C.inv3);
  for (let k = 0; k < 4; k++) { const x = k * 90 - 10; for (let y = 40; y < 92; y++) for (let xx = x; xx < x + 60; xx++) if (y > 52 || (xx + y) % 2) pset(xx, y, k % 2 ? hex('#d8ccb4') : hex('#b8a8a0')); }
  for (let k = 0; k < 9; k++) { const cx = 14 + k * 37, cy = 34 + (k % 3) * 6, c = [hex('#e8b0a8'), hex('#f0e0a0'), hex('#a8d0e8')][k % 3]; for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) { const d = Math.hypot(i, j); if (d < 6 || (d < 7.5 && (i + j) % 2)) pset(cx + i, cy + j, c); } }
  const x0 = 64, x1 = 256, y0 = 24, y1 = Math.round(24 + 146 * a);
  rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, C.k); rect(x0, y0, x1, y1, hex('#f2eee4'));
  for (let y = y0; y < y1; y += 2) for (let x = x0; x < x1; x += 2) if (h(x, y, 124) < 0.06) pset(x, y, hex('#e0dccc'));
  const clip = (yy) => yy < y1 - 2;
  // la cabecera: trazos góticos de alturas distintas con serifas (dan la forma de un nombre sin escribir ninguno) y un escudo
  if (clip(32)) { for (let k = 0, x = x0 + 22; x < x1 - 22; k++, x += 7) { if (Math.abs(x - 160) < 8) continue; const alto = 8 + Math.round(h(k, 1, 126) * 6), yb = y0 + 19; rect(x, yb - alto, x + 2, yb, C.k); pset(x - 1, yb - alto, C.k); pset(x + 3, yb - alto + 1, C.k); pset(x + 3, yb, C.k); if (h(k, 2, 126) < 0.5) rect(x + 3, yb - alto + 3, x + 4, yb - alto + 4, C.k); }
    disco(160, y0 + 12, 6, C.k); disco(160, y0 + 12, 4, hex('#f2eee4')); pset(160, y0 + 10, C.k); rect(158, y0 + 12, 162, y0 + 13, C.k);
    rect(x0 + 6, y0 + 23, x1 - 6, y0 + 23, C.k); rect(x0 + 6, y0 + 25, x1 - 6, y0 + 25, C.k); }
  if (clip(52)) { rect(x0 + 10, y0 + 34, x1 - 50, y0 + 38, C.k); rect(x0 + 10, y0 + 41, x1 - 80, y0 + 45, C.k); }
  if (clip(110)) { const fx0 = x0 + 10, fx1 = x0 + 120, fy0 = y0 + 52, fy1 = y0 + 116;
    rect(fx0, fy0, fx1, fy1, hex('#4a4e54')); for (let y = fy0; y < fy1; y++) for (let x = fx0; x < fx1; x++) if (h(x, y, 125 + Math.floor(t * 8) % 3) < 0.12) pset(x, y, hex('#5a5e64'));
    const ox = Math.round((fx0 + fx1) / 2 + Math.sin(t * 0.7) * 4), oy = Math.round((fy0 + fy1) / 2); rect(ox - 7, oy - 2, ox + 7, oy + 2, hex('#eef0f2')); rect(ox - 5, oy - 3, ox + 5, oy + 3, hex('#eef0f2'));
    for (const [dx, dy] of [[-12, -8], [12, -8], [-12, 8], [12, 8]]) { rect(ox + dx - (dx < 0 ? 0 : 4), oy + dy, ox + dx + (dx < 0 ? 4 : 0), oy + dy, C.blanco); rect(ox + dx, oy + dy - (dy < 0 ? 0 : 4), ox + dx, oy + dy + (dy < 0 ? 4 : 0), C.blanco); }
    rect((fx0 + fx1) >> 1, fy0 + 3, (fx0 + fx1) >> 1, fy0 + 8, C.blanco); rect(fx0 + 4, fy1 - 6, fx0 + 18, fy1 - 6, C.blanco); R.numero('22', fx1 - 14, fy1 - 3, { color: C.blanco, sombra: false });
    for (let k = 0; k < 9; k++) rect(fx1 + 8, fy0 + 2 + k * 7, x1 - 10 - (k % 3) * 6, fy0 + 3 + k * 7, hex('#9a968a')); }
  if (clip(146)) { const fy = y0 + 122; rect(x0 + 10, fy, x0 + 70, fy + 18, hex('#8aa4c0')); caza(R, x0 + 34, fy + 9, t, {}); for (let k = 0; k < 3; k++) rect(x0 + 78, fy + 2 + k * 6, x1 - 10, fy + 3 + k * 6, hex('#9a968a')); }
  if (a < 1) { rect(x0 - 3, y1 - 3, x1 + 3, y1 + 5, C.k); rect(x0 - 2, y1 - 2, x1 + 2, y1 + 4, hex('#e0dccc')); rect(x0 - 2, y1 + 1, x1 + 2, y1 + 1, hex('#c8c4b4')); }
  mano(R, x0 + 4, Math.round(y0 + 30 + 60 * a), 1, '#6a3a4a'); mano(R, x1 - 4, Math.round(y0 + 30 + 60 * a), -1, '#6a3a4a');
  copos(R, t, 40);
}

// los iconos pequeños de lo que se identificó: globo, dron, pájaro, satélite y estrella brillante (Venus)
export function iconoIdentificado(R, x, y, k) {
  const { rect, pset, disco, linea } = R;
  if (k === 0) { disco(x, y - 2, 4, C.k); disco(x, y - 2, 3, C.blanco); pset(x - 1, y - 4, C.grisL); linea(x, y + 2, x + 1, y + 6, C.k); }
  else if (k === 1) { linea(x - 5, y - 3, x + 5, y + 3, C.k); linea(x - 5, y + 3, x + 5, y - 3, C.k); for (const [dx, dy] of [[-5, -3], [5, -3], [-5, 3], [5, 3]]) rect(x + dx - 2, y + dy, x + dx + 2, y + dy, C.grisS); rect(x - 1, y - 1, x + 1, y + 1, C.rojo); }
  else if (k === 2) { linea(x - 5, y - 2, x, y + 1, C.k); linea(x, y + 1, x + 5, y - 2, C.k); linea(x - 4, y - 2, x, y, C.k); }
  else if (k === 3) { rect(x - 2, y - 2, x + 2, y + 2, C.k); rect(x - 1, y - 1, x + 1, y + 1, C.oro); rect(x - 7, y - 1, x - 3, y + 1, C.azul); rect(x + 3, y - 1, x + 7, y + 1, C.azul); }
  else { disco(x, y, 2, C.oroL); for (let r = 3; r < 6; r++) { pset(x + r, y, C.oroL); pset(x - r, y, C.oroL); pset(x, y + r, C.oroL); pset(x, y - r, C.oroL); } }
}
// la oficina de análisis de hoy (2024): pared azul oscuro, una pared de pantallas (radar que barre, mapa con puntos, la
// imagen gris de un globo, una onda, barras y una órbita), luces del techo, mampara con persiana, una planta y la cafetera
// con vapor. La mesa de las pruebas va aparte (mesaAnalisis), después de quien está detrás.
export function oficinaAnalisis(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#1e2a44')); for (let x = 0; x < 320; x += 32) rect(x, 0, x, 120, hex('#243250'));
  rect(0, 0, 319, 6, hex('#14182a')); for (let x = 20; x < 320; x += 70) { rect(x, 6, x + 36, 7, hex('#e8f0ff')); for (let y = 8; y < 30; y++) for (let xx = x - (y - 8); xx < x + 36 + (y - 8); xx++) if ((xx + y) % 5 === 0) pset(xx, y, hex('#2a3a5a')); }
  // la pared de pantallas, 3 × 2
  const P = [[70, 22], [130, 22], [190, 22], [70, 62], [130, 62], [190, 62]];
  for (let k = 0; k < 6; k++) { const [x, y] = P[k]; rect(x - 1, y - 1, x + 57, y + 37, C.k); rect(x, y, x + 56, y + 36, hex('#0e1a2a'));
    if (k === 0) { const cx = x + 28, cy = y + 18; for (let r = 6; r < 18; r += 6) for (let a = 0; a < 6.28; a += 0.08) pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), hex('#1e5a3a')); const a = t * 2; for (let r = 0; r < 17; r++) pset(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), C.verdeL); for (const [px, py] of [[8, -6], [-10, 4]]) if (Math.sin(t * 2 - Math.atan2(py, px)) > 0.3) disco(cx + px, cy + py, 1, C.verdeL); }
    if (k === 1) { for (let j = 0; j < 30; j++) for (let i = 0; i < 52; i++) if (h(i >> 2, j >> 2, 140) < 0.35) pset(x + 2 + i, y + 3 + j, hex('#1e3a5a')); for (let n = 0; n < 9; n++) { const px = x + 4 + Math.round(h(n, 1, 141) * 48), py = y + 4 + Math.round(h(n, 2, 141) * 28); pset(px, py, Math.sin(t * 3 + n) > 0 ? C.amarillo : C.naranja); } }
    if (k === 2) { rect(x + 2, y + 2, x + 54, y + 34, hex('#3a3e44')); disco(x + 28, y + 15, 6, hex('#d8dce0')); linea(x + 28, y + 21, x + 30, y + 30, hex('#d8dce0')); visto(R, x + 44, y + 4, 1); }
    if (k === 3) for (let i = 0; i < 52; i++) { const v = Math.round(Math.sin(i * 0.5 + t * 6) * Math.sin(i * 0.13 + t) * 10); rect(x + 2 + i, y + 18 - Math.abs(v), x + 2 + i, y + 18 + Math.abs(v), hex('#3a8ac8')); }
    if (k === 4) for (let i = 0; i < 8; i++) { const a = 6 + Math.round((Math.sin(t * 0.7 + i) + 1) * 10); rect(x + 4 + i * 6, y + 33 - a, x + 7 + i * 6, y + 33, i % 2 ? hex('#3a8ac8') : hex('#5ab0e8')); }
    if (k === 5) { disco(x + 28, y + 18, 5, hex('#2a6ab0')); disco(x + 26, y + 17, 2, hex('#3a8a4a')); for (let a = 0; a < 6.28; a += 0.1) pset(Math.round(x + 28 + Math.cos(a) * 20), Math.round(y + 18 + Math.sin(a) * 7), hex('#3a4a6a')); const a = t * 0.8; disco(Math.round(x + 28 + Math.cos(a) * 20), Math.round(y + 18 + Math.sin(a) * 7), 1, C.blanco); } }
  // la mampara con persiana a la izquierda y la planta
  rect(0, 14, 52, 120, hex('#2a3a5a')); for (let y = 16; y < 118; y += 3) rect(2, y, 50, y, hex('#3a5070')); rect(52, 14, 53, 120, C.metalS); for (let y = 16; y < 118; y += 3) if (h(y, 0, 142) < 0.2) rect(2, y + 1, 50, y + 1, hex('#e8d090'));
  disco(290, 96, 10, hex('#2a6a3a')); disco(286, 92, 6, hex('#3a8a4a')); disco(296, 90, 5, hex('#3a8a4a')); rect(282, 104, 298, 120, C.k); rect(283, 105, 297, 119, hex('#e8e4dc'));
  // la mesita con la cafetera y su vapor
  rect(254, 104, 278, 106, C.k); rect(256, 106, 258, 120, C.metalD); rect(274, 106, 276, 120, C.metalD); rect(258, 90, 272, 104, C.k); rect(259, 91, 271, 103, hex('#2a2e3a')); pset(269, 93, Math.sin(t * 2) > 0 ? C.rojo : hex('#5a1a1a')); rect(262, 98, 266, 103, C.blanco);
  for (let k = 0; k < 3; k++) pset(264 + Math.round(Math.sin(t * 3 + k)), 95 - k * 2 - Math.round((t * 4 + k) % 3), C.grisL);
  // el suelo
  rect(0, 120, 319, 179, hex('#2a3044')); for (let y = 124; y < 180; y += 7) rect(0, y, 319, y, hex('#262c3e')); for (let x = 0; x < 320; x += 40) R.linea(160, 120, x - 80 + (x - 160), 179, hex('#262c3e'));
}
// la mesa de las pruebas, por delante de la analista: fotos de lo que se identificó, cada una con su «✓» cuando le toca
// (o.vistos: cuántas), una lupa y la caja con el platillo en la tapa que se abre (o.caja 0–1): dentro no hay nada
export function mesaAnalisis(R, t, o = {}) {
  const { rect, pset, disco, poligono } = R, y0 = 136;
  rect(40, y0, 280, y0 + 6, C.k); rect(41, y0 + 1, 279, y0 + 5, hex('#e8ecf0')); rect(41, y0 + 1, 279, y0 + 1, C.blanco); rect(50, y0 + 6, 270, y0 + 30, hex('#3a4258')); rect(50, y0 + 6, 270, y0 + 7, C.k);
  for (let k = 0; k < 5; k++) { const x = 58 + k * 26; rect(x, y0 - 14, x + 20, y0, C.k); rect(x + 1, y0 - 13, x + 19, y0 - 1, hex('#6a7a8a')); iconoIdentificado(R, x + 10, y0 - 7, k); if ((o.vistos ?? 0) > k) visto(R, x + 12, y0 - 18, 1); }
  // la caja, a la derecha, con el platillo dibujado en la tapa
  const c = o.caja ?? 0, bx = 200, tapa = Math.round(c * 14);
  rect(bx, y0 - 16, bx + 40, y0, C.k); rect(bx + 1, y0 - 15, bx + 39, y0 - 1, hex('#b89868'));
  if (c > 0) { rect(bx + 3, y0 - 15, bx + 37, y0 - 4, hex('#3a2a1a')); rect(bx + 3, y0 - 5, bx + 37, y0 - 3, hex('#2a1e12')); }
  rect(bx - 2, y0 - 20 - tapa, bx + 42, y0 - 16 - tapa, C.k); rect(bx - 1, y0 - 19 - tapa, bx + 41, y0 - 17 - tapa, hex('#c8a878'));
  { const cx = bx + 20, cy = y0 - 25 - tapa; poligono([[cx - 8, cy + 2], [cx + 8, cy + 2], [cx + 4, cy - 1], [cx - 4, cy - 1]], C.k); disco(cx, cy - 2, 3, C.k); pset(cx, cy - 2, C.cristal); }
}

// la orden del presidente de cerca, sobre el escritorio de madera oscura: el sello dorado con estrellas, líneas de texto,
// la línea de la firma que la pluma va trazando (o.firma 0–1) y el sello rojo con el candado abierto (o.sello 0–1); detrás,
// desenfocadas, las cortinas doradas y las banderas
export function ordenPresidencial(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  for (let x = 0; x < 320; x++) { const f = Math.sin(x * 0.35 + Math.sin(t * 0.6) * 0.3), c = f > 0.55 ? hex('#e0b860') : f > -0.2 ? hex('#c8a050') : f > -0.7 ? hex('#a87a38') : hex('#8a6028'); rect(x, 0, x, 89, c); }   // cortinas doradas con pliegues
  for (let y = 0; y < 90; y++) for (let x = 20; x < 70; x++) pset(x, y, (y >> 3) % 2 ? hex('#d8d0c8') : hex('#b84848'));   // la bandera
  for (let y = 0; y < 30; y++) for (let x = 20; x < 44; x++) if ((x + y) % 3) pset(x, y, hex('#3a4a8a'));
  for (let y = 0; y < 90; y++) for (let x = 250; x < 300; x++) pset(x, y, (y >> 3) % 2 ? hex('#3a4a8a') : hex('#4a5aa0'));
  // el escritorio
  rect(0, 86, 319, 179, hex('#4a2a1a')); for (let k = 0; k < 20; k++) { const y = 90 + Math.round(h(k, 1, 144) * 88); for (let x = 0; x < 320; x++) if ((x + k * 13) % 41 < 30) pset(x, y + Math.round(Math.sin(x * 0.04 + k) * 1), hex('#3a2014')); } rect(0, 86, 319, 88, hex('#6a3e26'));
  // el documento
  rect(80, 92, 240, 179, C.k); rect(81, 93, 239, 179, hex('#f4f0e6'));
  disco(160, 108, 10, C.oroS); disco(160, 108, 9, hex('#2a3a7a')); disco(160, 108, 5, C.oro); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(160 + Math.cos(a) * 7), Math.round(108 + Math.sin(a) * 7), C.blanco); }
  rect(110, 122, 210, 124, C.k); for (let k = 0; k < 6; k++) rect(94, 130 + k * 5, 226 - Math.round(h(k, 1, 145) * 30), 130 + k * 5, hex('#8a8680'));
  rect(150, 168, 226, 168, C.k);
  // la firma: una línea que va y viene, trazada hasta donde va la pluma
  const f = o.firma ?? 0, n = Math.round(f * 70); let px = 152, py = 163;
  for (let i = 0; i < n; i++) { const x = 152 + i, y = Math.round(163 + Math.sin(i * 0.5) * 3 + Math.sin(i * 0.17) * 2 - (i < 8 ? (8 - i) * 0.6 : 0)); linea(px, py, x, y, hex('#1a2a6a')); px = x; py = y; }
  if (f > 0 && f < 1) { poligono([[px, py], [px + 4, py - 3], [px + 30, py - 30], [px + 26, py - 34], [px + 1, py - 4]], C.k); poligono([[px + 2, py - 2], [px + 26, py - 29], [px + 25, py - 31], [px + 1, py - 3]], hex('#1a1a2a')); rect(px + 14, py - 18, px + 17, py - 16, C.oro); mano(R, px + 20, py - 18, -1, '#2a2e4a'); }
  // el sello rojo con el candado abierto
  const s = o.sello ?? 0; if (s > 0) { const y = Math.round(lerp(60, 146, Math.min(1, s * 1.4))); if (s < 0.72) { rect(98, y - 40, 118, y - 12, C.k); rect(99, y - 39, 117, y - 13, C.maderaS); rect(94, y - 12, 122, y, C.k); rect(95, y - 11, 121, y - 1, C.maderaD); }
    else { disco(108, 152, 13, C.rojo); disco(108, 152, 11, hex('#f4f0e6')); rect(102, 151, 114, 160, C.rojo); for (let a = Math.PI; a <= 2 * Math.PI; a += 0.15) pset(Math.round(104 + Math.cos(a) * 4), Math.round(151 + Math.sin(a) * 6) - 2, C.rojo); pset(108, 155, hex('#f4f0e6')); pset(108, 156, hex('#f4f0e6')); } }
}
// la pantalla de los archivos de 2026 (dentro de monitorGrande): una cuadrícula de miniaturas que llegan por tandas (o.n):
// vídeos de sensores (gris, con la mancha blanca y el triángulo de reproducir), audios de astronautas (onda y casco) e
// informes del FBI (hoja con líneas tachadas en negro); la barra de descarga abajo (o.barra 0–1) con su porcentaje
export function pantallaArchivos(R, x0, y0, x1, y1, t, o = {}) {
  const { rect, pset, disco, poligono } = R, n = o.n ?? 0;
  rect(x0, y0, x1, y1, hex('#e8ecf2')); rect(x0, y0, x1, y0 + 10, hex('#2a3a5a')); for (const [k, c] of [[0, C.rojo], [1, C.amarillo], [2, C.verdeL]]) disco(x0 + 6 + k * 7, y0 + 5, 2, c);
  disco(x1 - 14, y0 + 5, 3, C.oro); pset(x1 - 14, y0 + 5, hex('#2a3a5a'));   // el escudo de la web, sin letras
  for (let k = 0; k < Math.min(n, 15); k++) { const x = x0 + 8 + (k % 5) * 50, y = y0 + 16 + Math.floor(k / 5) * 38, tipo = [0, 1, 2, 0, 2, 1, 0, 2, 2, 0, 1, 2, 0, 0, 2][k];
    const nuevo = n - k < 1.6 && n - k > 0, dy = nuevo ? Math.round((1 - Math.min(1, (n - k) * 2)) * 6) : 0;
    rect(x - 1, y - 1 + dy, x + 42, y + 30 + dy, C.k);
    if (tipo === 0) { rect(x, y + dy, x + 41, y + 29 + dy, hex('#3a3e44')); for (let j = 0; j < 28; j += 2) for (let i = 0; i < 40; i += 3) if (h(i + k, j, 146) < 0.2) pset(x + 1 + i, y + 1 + j + dy, hex('#4a4e54')); rect(x + 16, y + 12 + dy, x + 24, y + 15 + dy, hex('#eef0f2')); poligono([[x + 4, y + 22 + dy], [x + 4, y + 27 + dy], [x + 8, y + 24 + dy]], C.blanco); }
    else if (tipo === 1) { rect(x, y + dy, x + 41, y + 29 + dy, hex('#1a2a4a')); for (let i = 0; i < 26; i++) { const v = Math.round(Math.abs(Math.sin(i * 0.9 + k) * 6)); rect(x + 14 + i, y + 15 - v + dy, x + 14 + i, y + 15 + v + dy, hex('#5ab0e8')); } disco(x + 7, y + 13 + dy, 5, C.blanco); disco(x + 7, y + 13 + dy, 3, hex('#d8a040')); }
    else { rect(x, y + dy, x + 41, y + 29 + dy, C.blanco); for (let j = 0; j < 6; j++) { const w = 30 - Math.round(h(k, j, 147) * 10); rect(x + 4, y + 4 + j * 4 + dy, x + 4 + w, y + 4 + j * 4 + dy, hex('#9a9aa0')); if (h(k, j, 148) < 0.4) rect(x + 8, y + 3 + j * 4 + dy, x + 8 + Math.round(w * 0.6), y + 5 + j * 4 + dy, C.k); } disco(x + 36, y + 24 + dy, 3, hex('#2a3a7a')); } }
  const b = o.barra ?? 0; rect(x0 + 8, y1 - 12, x1 - 50, y1 - 6, C.k); rect(x0 + 9, y1 - 11, x0 + 9 + Math.round((x1 - 50 - x0 - 18) * b), y1 - 7, C.verdeL);
  R.numero(String(Math.floor(b * 100)), x1 - 30, y1 - 5, { color: C.k, sombra: false, centro: true }); rect(x1 - 18, y1 - 12, x1 - 17, y1 - 11, C.k); rect(x1 - 13, y1 - 7, x1 - 12, y1 - 6, C.k); R.linea(x1 - 18, y1 - 6, x1 - 12, y1 - 12, C.k);   // un «%» dibujado
  if (o.cursor) { const [cx, cy] = o.cursor; poligono([[cx, cy], [cx, cy + 9], [cx + 3, cy + 7], [cx + 6, cy + 11], [cx + 7, cy + 10], [cx + 5, cy + 6], [cx + 8, cy + 6]], C.k); poligono([[cx + 1, cy + 2], [cx + 1, cy + 7], [cx + 3, cy + 6], [cx + 5, cy + 9], [cx + 4, cy + 5], [cx + 6, cy + 5]], C.blanco); }
}

// la instalación vigilada de noche: valla con focos, una garita, y las estrellas que tapa el triángulo al pasar
export function instalacion(R, t, o = {}) {
  const { rect, pset, poligono } = R, hor = 128;
  for (let y = 0; y < hor; y++) rect(0, y, 319, y, y < 60 ? C.noche1 : y < 100 ? C.noche2 : C.noche3);
  for (let k = 0; k < 110; k++) { const x = Math.round(h(k, 1, 93) * 320), y = Math.round(h(k, 2, 93) * (hor - 30)); pset(x, y, Math.sin(t * 2 + k) > 0.4 ? C.blanco : C.grisL); }
  // el triángulo negro: tapa las estrellas a su paso; sin luces de motor, con tres puntos apagados en las esquinas
  if (o.tri != null) { const cx = Math.round(-60 + o.tri * 440), cy = 44; const P = [[cx, cy - 18], [cx - 34, cy + 16], [cx + 34, cy + 16]]; poligono(P, hex('#0a0c1a')); for (const [x, y] of P) { R.disco(x, y + (y < cy ? 4 : -2), 1, hex('#3a3e5a')); } R.linea(P[1][0], P[1][1], P[2][0], P[2][1], hex('#1a1e34')); }
  rect(0, hor, 319, 179, hex('#2a2e3a')); for (let k = 0; k < 40; k++) pset(Math.round(h(k, 3, 93) * 320), hor + 2 + Math.round(h(k, 4, 93) * 50), hex('#3a3e4a'));
  // edificio sin ventanas, garita y la valla con alambre de espino
  rect(30, 92, 140, hor, hex('#3a3e4e')); rect(30, 92, 140, 94, hex('#4a4e60')); for (let x = 36; x < 140; x += 20) rect(x, 100, x + 8, 104, hex('#2a2e3a'));
  rect(232, 108, 256, hor, C.metalD); rect(236, 112, 252, 120, Math.sin(t * 0.5) > -0.8 ? C.oroL : C.oro); poligono([[228, 108], [244, 100], [260, 108]], C.metalS);
  for (let x = 0; x < 320; x += 14) rect(x, 118, x, 140, C.metalS); for (const y of [122, 130, 138]) for (let x = 0; x < 320; x++) if ((x + y) % 2) pset(x, y, C.metalS);
  for (let x = 0; x < 320; x += 5) { pset(x, 117, C.metal); pset(x + 2, 116, C.metal); }
  // focos que barren el suelo
  for (const [fx, fase] of [[160, 0], [290, 2]]) { rect(fx, 100, fx + 1, 118, C.metalD); rect(fx - 2, 98, fx + 3, 101, C.blanco); const a = Math.sin(t * 0.6 + fase) * 0.5 + 1.57; for (let d = 4; d < 70; d++) for (let w = -Math.round(d / 6); w <= Math.round(d / 6); w++) { const x = Math.round(fx + Math.cos(a) * d + w), y = Math.round(100 + Math.sin(a) * d); if ((x + y) % 2 && y < 180) pset(x, y, hex('#5a5e78')); } }
}

// la galaxia: zoom fuera desde la Tierra (p 0–1); las estrellas se encienden y alrededor de muchas giran planetas
export function galaxia(R, t, p) {
  const { rect, pset, disco } = R;
  rect(0, 0, 319, 179, hex('#06081a'));
  const z = 1 + (1 - p) * 8, cx = 160, cy = 92;
  for (let k = 0; k < 900; k++) { const brazo = k % 2, r = (h(k, 1, 94) ** 0.7) * 120, a = r * 0.05 + brazo * Math.PI + (h(k, 2, 94) - 0.5) * 0.7 + t * 0.03, x = cx + Math.cos(a) * r * z * 0.9, y = cy + Math.sin(a) * r * z * 0.42; if (x < 0 || x > 319 || y < 0 || y > 179) continue;
    if (h(k, 3, 94) > p * 1.2) continue; pset(Math.round(x), Math.round(y), h(k, 4, 94) < 0.2 ? hex('#ffd8a8') : h(k, 4, 94) < 0.5 ? C.blanco : hex('#a8b8ff')); }
  if (p > 0.3) { disco(cx, cy, Math.round(6 * z * 0.5), hex('#fff0c8')); disco(cx, cy, Math.round(3 * z * 0.5), C.blanco); }
  // planetas que giran alrededor de algunas estrellas
  for (let k = 0; k < 10 && p > 0.6; k++) { const sx = Math.round(30 + h(k, 5, 94) * 260), sy = Math.round(20 + h(k, 6, 94) * 140), a = t * (1 + k % 3) + k; disco(sx, sy, 1, C.oroL); pset(Math.round(sx + Math.cos(a) * 5), Math.round(sy + Math.sin(a) * 2), C.azulL); }
  if (p < 0.25) { const r = Math.round(10 + (0.25 - p) * 80); disco(cx, cy, r + 1, hex('#8ab8ff')); disco(cx, cy, r, C.marP3); disco(cx - Math.round(r / 3), cy - Math.round(r / 4), Math.round(r / 2.5), C.hierba); disco(cx + Math.round(r / 3), cy + Math.round(r / 4), Math.round(r / 3), C.hierba); }   // la Tierra al empezar
}

// una marca de visto bueno verde (no hay icono de «✓» en el kit)
export function visto(R, x, y, s = 1) { for (let i = 0; i < 4 * s; i++) { R.rect(x + i, y + i, x + i + s, y + i + s, C.verdeL); } for (let i = 0; i < 8 * s; i++) { R.rect(x + 4 * s + i, y + 4 * s - i, x + 4 * s + i + s, y + 4 * s - i + s, C.verdeL); } }

// tinte de color sobre una franja (atardecer): mezcla cada píxel con col en la proporción a
export function tinte(R, y0, y1, [cr, cg, cb], a) {
  for (let y = y0; y <= y1; y++) for (let x = 0; x < 320; x++) { const c = R.pget(x, y), r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
    R.pset(x, y, (0xff000000 | (Math.round(b + (cb - b) * a) << 16) | (Math.round(g + (cg - g) * a) << 8) | Math.round(r + (cr - r) * a)) >>> 0); }
}

// el archivador de cerca: un cajón se cierra (o.cierra 0–1) y el candado cae y se cierra (o.candado 0–1)
export function insertoArchivador(R, t, o = {}) {
  const { rect, pset, disco } = R;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x += 8) rect(x, y, x + 7, y, ((x >> 3) + (y >> 4)) % 3 ? hex('#a8b494') : hex('#9aa688'));
  rect(70, 10, 250, 180, C.k); rect(72, 12, 248, 180, C.metalS);
  for (let j = 0; j < 3; j++) { const y = 20 + j * 54, sal = j === 1 ? Math.round((1 - (o.cierra ?? 1)) * 26) : 0; rect(80, y + sal, 240, y + 46 + sal, C.k); rect(82, y + 2 + sal, 238, y + 44 + sal, C.metal); rect(82, y + 2 + sal, 238, y + 4 + sal, C.metalL);
    rect(146, y + 18 + sal, 174, y + 24 + sal, C.k); rect(148, y + 19 + sal, 172, y + 23 + sal, C.metalL);
    if (sal > 0) for (let i = 0; i < 12; i++) rect(88 + i * 12, y - 8 + sal - (i % 3), 96 + i * 12, y + 4 + sal, i % 2 ? C.papel : C.ocre); }
  const c = o.candado ?? 0; if (c > 0) { const y = Math.round(lerp(20, 98, Math.min(1, c * 1.3))), cerrado = c > 0.85; rect(150, y + 12, 170, y + 30, C.k); rect(151, y + 13, 169, y + 29, C.oro); disco(160, y + 20, 2, C.k); rect(159, y + 21, 161, y + 25, C.k);
    for (let a = 0; a <= Math.PI; a += 0.1) { const xx = Math.round(160 - Math.cos(a) * 7), yy = Math.round(y + 12 - Math.sin(a) * 9 - (cerrado ? 0 : 4)); pset(xx, yy, C.k); pset(xx, yy - 1, C.metalL); } }
}
function lerp(a, b, u) { return a + (b - a) * u; }

// la base aérea de Roswell en 1947: hangares, la torre, un bombardero B-29 en la pista y la entrada con la barrera
export function baseRoswell(R, t, o = {}) {
  const { rect, pset, poligono } = R, hor = 112;
  cielo(R, t, { hor, aves: false, sol: [250, 22, 8] });
  for (const [x0, top] of [[-20, 92], [180, 96]]) poligono([[x0, hor], [x0 + 10, top], [x0 + 140, top], [x0 + 150, hor]], C.mesetaF);
  rect(0, hor, 319, 179, C.arena); for (let k = 0; k < 80; k++) pset(Math.round(h(k, 1, 105) * 320), hor + 2 + Math.round(h(k, 2, 105) * 66), C.arenaS);
  rect(0, 136, 319, 148, hex('#6a6a76')); for (let x = 4; x < 320; x += 18) rect(x, 141, x + 9, 141, C.blanco);
  for (const [x, w] of [[150, 60], [218, 60]]) { poligono([[x, 104], [x + w / 2, 92], [x + w, 104], [x + w, 134], [x, 134]], C.metal); for (let xx = x + 2; xx < x + w; xx += 4) rect(xx, 106, xx, 133, C.metalS); rect(x + 10, 112, x + w - 10, 134, hex('#2a2a36')); }
  rect(284, 92, 288, 134, C.metalD); rect(278, 84, 294, 92, C.k); rect(279, 85, 293, 91, C.vidrioL);
  // el B-29: fuselaje plateado, cuatro motores con hélices que giran despacio, deriva alta
  { const x = 80, y = 128; rect(x - 40, y - 6, x + 40, y, C.k); rect(x - 39, y - 5, x + 39, y - 1, C.metalL); poligono([[x + 40, y - 6], [x + 48, y - 3], [x + 40, y]], C.metalL); rect(x + 38, y - 5, x + 44, y - 3, C.vidrioL);
    poligono([[x - 40, y - 6], [x - 30, y - 6], [x - 36, y - 20], [x - 42, y - 20]], C.metalL); rect(x - 20, y - 3, x + 22, y - 2, C.metalS);
    for (const u of [-14, -4, 8, 18]) { rect(x + u, y - 1, x + u + 4, y + 2, C.metalS); if (Math.floor(t * 6 + u) % 2) R.linea(x + u + 5, y - 3, x + u + 5, y + 4, C.k); }
    for (const u of [-30, 10]) { rect(x + u, y, x + u + 1, y + 6, C.k); R.disco(x + u, y + 7, 2, C.k); } }
  // la entrada: garita, barrera y un policía militar que saluda
  rect(250, 150, 270, 170, C.metalD); rect(252, 152, 268, 160, C.vidrioL); rect(196, 160, 250, 162, C.rojo); for (let x = 198; x < 250; x += 8) rect(x, 160, x + 3, 162, C.blanco);
  R.actor(EL_OV.general, 284, 172, t, { pal: { C: hex('#5e6a44') }, dedo: Math.sin(t * 0.8) > 0.5, quieto: true });
  halcon(R, t, 120, 40); viento(R, t, { y0: 150, y1: 178 });
}
// el periódico de cerca, en el suelo, que el viento hace aletear: el platillo en portada (sin palabras)
export function periodicoGrande(R, t) {
  const { rect, pset } = R;
  rect(0, 0, 319, 179, C.arena); for (let k = 0; k < 200; k++) pset(Math.round(h(k, 3, 106) * 320), Math.round(h(k, 4, 106) * 180), k % 3 ? C.arenaS : C.arenaL);
  const al = Math.round(Math.sin(t * 7) * 6);
  rect(60, 30, 260, 160, C.k); rect(62, 32, 258, 158, C.papel); rect(62, 32, 258, 46, C.k); for (let x = 70; x < 250; x += 10) rect(x, 38, x + 6, 40, C.papelS);
  rect(80, 56, 180, 120, C.k); rect(82, 58, 178, 118, hex('#8a8e9a')); for (let y = 60; y < 118; y++) for (let x = 84; x < 178; x++) if (h(x, y, 107) < 0.12) pset(x, y, hex('#9a9eaa'));
  rect(104, 88, 156, 96, C.metalS); rect(110, 86, 150, 88, C.metal); rect(120, 78, 140, 86, C.vidrioL); for (const dx of [-16, 0, 16]) pset(130 + dx, 98, C.oro);
  for (let k = 0; k < 12; k++) rect(190, 60 + k * 7, 190 + 40 + Math.round(h(k, 5, 106) * 20), 61 + k * 7, C.grisL); for (let k = 0; k < 5; k++) rect(82, 128 + k * 6, 82 + 90, 129 + k * 6, C.grisL);
  // la esquina que aletea
  R.poligono([[258, 158], [258 - 30, 158], [258, 158 - 30 - al]], C.papelS); R.linea(228, 158, 258, 128 - al, C.k);
  for (let k = 0; k < 6; k++) { const x = Math.round(((t * 80 + k * 70) % 380) - 30), y = 20 + k * 26; rect(x, y, x + 8, y, C.arenaL); }
}
// sacos de correo que se vacían: cartas e informes que caen al suelo
export function sacos(R, t, x, y, p) {
  for (let k = 0; k < 3; k++) { const sx = x + k * 26; R.disco(sx, y, 10, C.k); R.disco(sx, y, 9, hex('#a89a7a')); R.rect(sx - 3, y - 13, sx + 3, y - 9, hex('#8a7a5a')); }
  for (let k = 0; k < Math.round(24 * p); k++) { const u = (k * 0.37) % 1, cx = x + 20 + Math.round(Math.sin(k) * 40), cy = y + 8 + Math.round(u * 10); R.rect(cx - 4, cy - 2, cx + 4, cy + 2, C.k); R.rect(cx - 3, cy - 1, cx + 3, cy + 1, k % 3 ? C.blanco : C.ocre); }
}

// ── la sala de prensa de 1952 ──────────────────────────────────────────────────────────────────────────────────────────
// Paredes con zócalo, telón azul con pliegues, el escudo y dos banderas, focos del techo, la mesa larga con micrófonos de
// radio (se pinta aparte, mesaPrensa, después de los oficiales sentados) y el público en filas.
export function salaPrensa(R, t) {
  const { rect, pset, disco, poligono } = R;
  rect(0, 0, 319, 179, hex('#5a4a3a')); for (let x = 0; x < 320; x += 20) { rect(x, 30, x + 18, 110, hex('#6a5640')); rect(x + 2, 32, x + 16, 108, hex('#74604a')); }
  rect(60, 6, 260, 112, C.k); for (let x = 61; x < 260; x++) rect(x, 7, x, 111, (x % 10) < 5 ? hex('#2a3a6a') : hex('#334680'));
  for (let x = 61; x < 260; x += 10) for (let y = 7; y < 111; y += 2) if (h(x, y, 115) < 0.1) pset(x + 2, y, hex('#3a4e8e'));
  disco(160, 36, 16, C.oroS); disco(160, 36, 14, hex('#2a3a6a')); disco(160, 36, 9, C.oro); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; pset(Math.round(160 + Math.cos(a) * 12), Math.round(36 + Math.sin(a) * 12), C.oroL); }
  for (const bx of [80, 218]) { rect(bx, 12, bx + 1, 112, C.oroS); disco(bx, 11, 2, C.oro); const o = Math.round(Math.sin(t * 2 + bx) * 1); for (let j = 0; j < 13; j++) rect(bx + 2, 14 + j * 2 + (j % 2 ? o : 0), bx + 22, 15 + j * 2 + (j % 2 ? o : 0), j % 2 ? C.blanco : C.rojo); rect(bx + 2, 14, bx + 11, 27, C.azul); }
  // focos del techo: conos de luz con polvo que flota
  for (const fx of [110, 210]) { rect(fx - 4, 0, fx + 4, 3, C.k); for (let y = 4; y < 112; y++) for (let x = fx - 4 - (y >> 2); x < fx + 4 + (y >> 2); x++) if ((x + y) % 3 === 0) pset(x, y, hex('#4a5a9a')); }
  for (let k = 0; k < 12; k++) { const x = Math.round(100 + h(k, 1, 116) * 120 + Math.sin(t * 0.4 + k) * 4), y = Math.round(10 + h(k, 2, 116) * 90); if (Math.sin(t + k) > 0) pset(x, y, C.blanco); }
  rect(0, 112, 319, 179, hex('#3a2a22')); for (let y = 116; y < 180; y += 6) rect(0, y, 319, y, hex('#30221c'));
}
export function mesaPrensa(R, t) {
  const { rect, disco } = R;
  rect(70, 112, 250, 132, C.k); rect(71, 113, 249, 131, C.madera); rect(71, 113, 249, 115, C.maderaL); rect(70, 120, 250, 132, hex('#2a3a6a'));   // faldón azul
  for (let k = 0; k < 7; k++) { const x = 104 + k * 9, a = (k - 3) * 2; R.linea(x, 112, x + a, 100, C.k); rect(x + a - 2, 96, x + a + 2, 101, C.metalD); rect(x + a - 1, 97, x + a + 1, 100, C.metal); }   // micrófonos
  for (const x of [90, 220]) { rect(x, 106, x + 6, 112, C.k); rect(x + 1, 107, x + 5, 111, C.blanco); }   // vasos de agua
}
// el público: filas de cabezas con sombrero, libretas que se levantan, y fotógrafos de pie con cámara de flash
export function publicoPrensa(R, t, flash) {
  for (let f = 0; f < 2; f++) for (let k = 0; k < 13; k++) { const x = 4 + k * 24 + f * 12, y = 152 + f * 14; R.busto(['rizos', 'calvo', 'mujer', 'calvo'][(k + f) % 4], { C: hex(['#5e5e70', '#6a4a3a', '#4a5a6a'][(k + f) % 3]) }, x, y, t + k + f, {}); if ((k + f) % 4 === 1) { R.rect(x + 9, y + 2 - Math.round(Math.abs(Math.sin(t * 3 + k)) * 2), x + 13, y + 6, C.k); R.rect(x + 10, y + 3, x + 12, y + 5, C.papel); } }
  for (const [x, d] of [[18, 1], [300, -1]]) { R.actor(EL_OV.periodista, x, 150, t + x, { dir: d, sorpresa: flash }); R.rect(x + d * 6 - 3, 128, x + d * 6 + 3, 133, C.k); R.disco(x + d * 6, 126, 3, flash ? C.blanco : C.metalL); }
}
// un pasillo de oficinas en perspectiva: puertas con cristal esmerilado, focos, banco y fuente
export function pasillo(R, t) {
  const { rect, pset, poligono, linea } = R, vx = 160, vy = 84;
  rect(0, 0, 319, 179, hex('#a8b494'));
  poligono([[0, 0], [319, 0], [vx + 30, vy - 30], [vx - 30, vy - 30]], hex('#c8ccc0'));
  poligono([[0, 179], [319, 179], [vx + 30, vy + 30], [vx - 30, vy + 30]], hex('#3a3a46'));
  for (let k = 0; k < 12; k++) { const f = k / 12; for (let x = 0; x < 320; x++) { const y = Math.round(179 - (179 - vy - 30) * f ** 0.6); if (((x >> 4) + k) % 2) pset(x, y, hex('#d8d0b8')); } }
  poligono([[vx - 30, vy - 30], [vx + 30, vy - 30], [vx + 30, vy + 30], [vx - 30, vy + 30]], hex('#96a282'));
  for (const s of [-1, 1]) for (let k = 0; k < 4; k++) { const f = 1 - k * 0.22, x0 = Math.round(vx + s * (40 + 130 * f)), w = Math.round(24 * f), y0 = Math.round(vy - 50 * f), y1 = Math.round(vy + 60 * f); rect(Math.min(x0, x0 + s * w), y0, Math.max(x0, x0 + s * w), y1, C.k); rect(Math.min(x0, x0 + s * w) + 1, y0 + 1, Math.max(x0, x0 + s * w) - 1, y1 - 1, C.madera); rect(Math.min(x0, x0 + s * w) + 3, y0 + 4, Math.max(x0, x0 + s * w) - 3, y0 + Math.round(26 * f), hex('#d8dcd0')); }
  for (let k = 0; k < 4; k++) { const y = Math.round(4 + k * 8), w = Math.round(30 - k * 6); rect(vx - w, y, vx + w, y + 1, hex('#fff4d0')); }
  rect(250, 140, 300, 146, C.maderaD); rect(254, 146, 256, 158, C.maderaD); rect(294, 146, 296, 158, C.maderaD);
}
