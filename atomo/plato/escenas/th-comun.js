// Fontanería y decorados del episodio 11 (Theranos) en el estilo canónico pixel chibi, al nivel de episodios/ESTANDAR.md.
// Ocho decorados: A la farmacia Walgreens (2013), B la ciencia de la gota (insertos), C Stanford (2003), D la sede de
// Theranos, E la sala del consejo, F el laboratorio, G la redacción del Wall Street Journal (2015), H hoy (tribunal,
// prisión, cine). Reutiliza del episodio 10 la paleta, rodar, la mano y la silla, y los mapas de papel.
//
//   import { preparar, rodar, farmacia } from '/atomo/plato/escenas/th-comun.js';
//   const { E, R, M } = await preparar('th-gancho');
//   rodar(E, R, [[0, (t) => farmacia(R, t)]], { año: 2013 });
import { escena } from '/atomo/plato/escena.js';
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { conChibi, ELENCO_CHIBI, tela } from '/atomo/plato/kits/pixel-chibi.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { albersEEUU, mapaPapel, chincheta } from '/atomo/plato/escenas/ov-mapas.js';
import { C as COV, rodar as rodarOv, primerT, cielo, arbol, bandada, viento, gato, mano, silla, visto, tinte, monitorGrande } from '/atomo/plato/escenas/ov-comun.js';

export { primerT, cielo, arbol, bandada, viento, gato, mano, silla, visto, tinte, monitorGrande };
const pal = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, hex(v)]));
export const C = {
  ...COV,
  ...pal({
    sangre: '#c8283a', sangreS: '#8a1828', sangreL: '#f06070', plasma: '#f0d890',
    baldosa: '#e8e4dc', baldosaS: '#d4d0c8', estante: '#c8ccd4', estanteS: '#9aa0ac', rojoW: '#d8283a',
    tealT: '#3aa8a0', tealTS: '#2a7a74', verdeT: '#8ac84a', amarilloT: '#f0c840',
    piedraS2: '#d8b88a', piedraSS: '#b8946a', tejaS: '#b8503a', tejaSS: '#8a3828',
    cristalO: '#9ac8e0', cristalOS: '#6a98b8', moqueta: '#5a6478', moquetaS: '#4a5466',
    caoba: '#6a3420', caobaS: '#4a2214', caobaL: '#8a4a2c', cuero: '#3a2420',
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
  const E = await escena(id, 'ep11');
  const R = conChibi(await crearRoma(document.getElementById('lienzo')));
  // la barra de tiempo: la idea (2003–2012), la fama (2013–2015) y la caída (2016–2026)
  R.tramosTiempo([[2003, 2012, R.PALA.AZUL, 'reloj'], [2013, 2015, R.PALA.ORO, 'factura'], [2016, 2026, R.PALA.ROJO, 'candado']]);
  conAtomGrande(R);
  return { E, R, M: (k, d) => E.marca(k, d) };
}
export const rodar = rodarOv;

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export function lerp(a, b, u) { return a + (b - a) * u; }

// el logotipo de Theranos, sin letras: un círculo de puntos que crecen hacia fuera, en verde azulado (como una flor)
export function logoTheranos(R, cx, cy, s = 1, t = 0) {
  for (let anillo = 0; anillo < 3; anillo++) { const n = 6 + anillo * 6, r = (3 + anillo * 4) * s; for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2 + anillo * 0.3 + Math.sin(t * 0.5) * 0.05, x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r); R.disco(x, y, Math.max(0, Math.round((anillo === 2 ? 1 : anillo === 1 ? 1 : 0) * s)), anillo === 2 ? C.verdeT : C.tealT); R.pset(x, y, anillo === 0 ? C.tealTS : C.tealT); } }
  R.disco(cx, cy, Math.round(1.5 * s), C.tealTS);
}
// el tubito de Theranos (el «nanotainer»): del tamaño de una uña, con tapón de color y un poco de sangre dentro
export function tubito(R, x, y, s = 1, lleno = 1, tapon = C.verdeT) {
  const w = 2 * s, hgt = 6 * s; R.rect(x - w, y - hgt, x + w, y, C.k); R.rect(x - w + 1, y - hgt + 1, x + w - 1, y - 1, C.blanco);
  if (lleno > 0) R.rect(x - w + 1, Math.round(y - 1 - (hgt - 3) * lleno), x + w - 1, y - 1, C.sangre);
  R.rect(x - w - 1, y - hgt - 2 * s, x + w + 1, y - hgt, C.k); R.rect(x - w, y - hgt - 2 * s + 1, x + w, y - hgt - 1, tapon);
}

// ── A · la farmacia Walgreens de Palo Alto (2013) ──────────────────────────────────────────────────────────────────
// Techo con plafones encendidos, la franja roja de la cadena (sin letras), carteles de pasillo con su número, estanterías
// de colores, el mostrador de la farmacia al fondo con la cruz que late, la puerta automática con la calle soleada (pasa un
// coche), cestas apiladas y el cono amarillo de suelo mojado. o.rincon (por defecto): el rincón de Theranos con su panel,
// el logotipo, el respaldo del sillón y la bandeja de tubitos; o.cerrado: el panel tapado con una «X»; o.puerta (0–1): la
// puerta se abre. El brazo y el asiento del sillón van por delante de la clienta: sillonDelante()
export function farmacia(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#f0ece4')); rect(0, 0, 319, 14, hex('#d8d4cc')); for (let x = 0; x < 320; x += 16) rect(x, 0, x, 14, hex('#ccc8c0'));
  for (let k = 0; k < 6; k++) { const x = 8 + k * 54; rect(x, 12, x + 34, 14, C.blanco); for (let y = 15; y < 34; y++) for (let xx = x - (y - 15) / 2; xx < x + 34 + (y - 15) / 2; xx++) if ((Math.round(xx) + y) % 5 === 0) pset(Math.round(xx), y, hex('#f8f4ec')); }
  // la franja roja de la cadena con su punteado blanco
  rect(0, 22, 319, 31, C.rojoW); rect(0, 31, 319, 31, hex('#a81e2c')); for (let x = 0; x < 320; x += 40) disco(x + 20, 26, 2, C.blanco);
  // el mostrador de la farmacia al fondo: estantes de cajitas, la cruz que late y la ventanilla
  rect(110, 34, 214, 92, hex('#e0dcd4')); rect(110, 74, 214, 92, hex('#c8c0b4')); rect(110, 74, 214, 75, hex('#a89c8c'));
  for (let k = 0; k < 3; k++) { const x = 118 + k * 32; rect(x, 40, x + 24, 70, hex('#d0ccc4')); for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) rect(x + 2 + i * 6, 42 + j * 7, x + 5 + i * 6, 47 + j * 7, [C.blanco, hex('#e8a8a8'), hex('#a8c8e8'), hex('#f0e0a0')][(i + j + k) % 4]); }
  const late = Math.sin(t * 2.4) > 0.2; if (late) rect(154, 34, 170, 50, hex('#f8c8c8')); rect(156, 36, 168, 48, C.rojoW); rect(160, 38, 164, 46, C.blanco); rect(158, 40, 166, 44, C.blanco);
  rect(132, 76, 192, 80, hex('#f4f0e8')); for (const x of [140, 176]) { rect(x, 66, x + 8, 76, C.k); rect(x + 1, 67, x + 7, 75, hex('#2a3a5a')); pset(x + 2, 68, hex('#5a8ac8')); }   // las cajas registradoras
  // estanterías de pasillo a los lados, con productos de colores y el cartel colgante de cada pasillo con su número
  for (const [x0, n] of [[0, 3], [236, 4]]) { rect(x0, 36, x0 + 83, 130, C.estanteS); rect(x0 + 2, 38, x0 + 81, 128, C.estante);
    for (let j = 0; j < 5; j++) { const y = 46 + j * 17; rect(x0 + 2, y + 12, x0 + 81, y + 13, C.estanteS);
      for (let i = 0; i < 10; i++) { const px = x0 + 4 + i * 8, alto = 6 + Math.round(h(i, j + x0, 30) * 5), col = [hex('#e84a4a'), hex('#4a8ae8'), hex('#f0c040'), hex('#5ab85a'), hex('#e87ab8'), hex('#f2f2f2'), hex('#8a5ad8')][Math.floor(h(i, j + x0, 31) * 7)];
        rect(px, y + 12 - alto, px + 6, y + 11, C.k); rect(px + 1, y + 13 - alto, px + 5, y + 11, col); pset(px + 2, y + 14 - alto, C.blanco); }
      if (j === 2) for (let i = 0; i < 3; i++) { const px = x0 + 8 + i * 26; rect(px, y + 14, px + 10, y + 18, C.k); rect(px + 1, y + 15, px + 9, y + 17, C.amarilloT); } }   // las etiquetas de oferta
    const cx = x0 + (x0 ? 22 : 42), sw = Math.round(Math.sin(t * 0.9 + x0) * 1); linea(cx - 8, 14, cx - 8 + sw, 20, C.metalD); linea(cx + 8, 14, cx + 8 + sw, 20, C.metalD);
    rect(cx - 12 + sw, 20, cx + 12 + sw, 34, C.k); rect(cx - 11 + sw, 21, cx + 11 + sw, 33, hex('#2a5aa8')); R.numero(String(n), cx + 1 + sw, 31, { color: C.blanco, centro: true, sombra: false }); }
  // el rincón de Theranos: panel blanco con el logotipo, el respaldo del sillón y la bandeja de tubitos
  if (o.rincon !== false) {
    rect(90, 92, 230, 140, hex('#f8f8fa')); rect(90, 92, 230, 93, hex('#d8d8e0')); rect(90, 139, 230, 140, hex('#d8d8e0')); logoTheranos(R, 118, 110, 1, t);
    if (o.cerrado) { rect(146, 98, 226, 136, hex('#d8d8dc')); for (let k = 0; k < 6; k++) rect(146, 100 + k * 6, 226, 100 + k * 6, hex('#c8c8cc')); R.icono('X', 180, 110, C.rojoW, hex('#d8d8dc'), 2); }
    else { rect(150, 100, 157, 132, C.k); rect(151, 101, 156, 131, C.tealT); rect(151, 101, 152, 131, C.tealTS); rect(153, 132, 155, 140, C.metalD);   // el respaldo
      rect(204, 112, 226, 114, C.k); rect(205, 113, 225, 113, C.metalL); rect(214, 114, 216, 138, C.metalD); rect(208, 138, 222, 139, C.metalD);
      for (let k = 0; k < 4; k++) tubito(R, 207 + k * 5, 112, 1, k < 2 ? 1 : 0, [C.verdeT, C.amarilloT, C.tealT, C.rojoW][k]);
      rect(194, 100, 226, 106, C.k); rect(195, 101, 225, 105, hex('#e8f4f4')); for (let k = 0; k < 5; k++) rect(198 + k * 6, 102, 201 + k * 6, 104, [C.tealT, C.verdeT, C.amarilloT, C.tealT, C.verdeT][k]); }   // el estante de cartuchos
  } else { rect(90, 92, 230, 140, hex('#ece8e0')); for (let k = 0; k < 6; k++) { const x = 98 + k * 22; rect(x, 100, x + 16, 134, C.k); rect(x + 1, 101, x + 15, 133, [hex('#f0c040'), hex('#4a8ae8'), hex('#e84a4a')][k % 3]); rect(x + 1, 116, x + 15, 117, C.blanco); } }   // de nuevo, estantes de colores
  // el suelo de baldosas con reflejos de los plafones
  rect(0, 140, 319, 179, C.baldosa); for (let x = 0; x < 320; x += 20) linea(x, 140, x + (x - 160) * 0.4, 179, C.baldosaS); for (const y of [146, 154, 165]) rect(0, y, 319, y, C.baldosaS);
  for (let k = 0; k < 6; k++) for (let y = 148; y < 160; y += 2) rect(18 + k * 54, y, 34 + k * 54, y, hex('#f8f6f0'));
  // la puerta automática: la calle soleada con la acera, una palmera y un coche que pasa; las hojas de cristal se abren
  rect(0, 88, 30, 140, C.k); rect(0, 90, 28, 112, C.cielo2); rect(0, 112, 28, 126, hex('#c8c4bc')); rect(0, 126, 28, 140, C.acera);
  { const cx = Math.round(((t * 22) % 140) - 50); rect(cx, 114, cx + 22, 122, C.k); rect(cx + 1, 115, cx + 21, 121, hex('#3a6ac8')); rect(cx + 5, 112, cx + 16, 115, C.k); rect(cx + 6, 113, cx + 15, 115, C.cristal); disco(cx + 5, 123, 2, C.k); disco(cx + 17, 123, 2, C.k); }
  linea(22, 126, 21, 96, C.cortezaS); for (let k = 0; k < 5; k++) { const a = k * 1.2 + 0.4; for (let d = 0; d < 9; d++) pset(Math.round(21 + Math.cos(a) * d), Math.round(96 + Math.sin(a) * d * 0.5 + d * d / 30), C.hierbaS); }
  rect(29, 88, 30, 140, C.k); const ab = Math.round((o.puerta ?? 0) * 12); for (const [a, b] of [[0, 14 - ab], [14 + ab, 28]]) if (b > a) { for (let y = 92; y < 140; y += 6) rect(a, y, b, y, C.cristalS); rect(b, 90, b, 140, C.metalL); }
  rect(0, 86, 31, 88, C.metalD); disco(15, 87, 1, (o.puerta ?? 0) > 0 ? C.verdeL : C.rojo);
  // las cestas rojas apiladas junto a la puerta y el cono de suelo mojado
  for (let k = 0; k < 4; k++) { const y = 150 - k * 3; rect(36, y - 4, 52, y, C.k); rect(37, y - 3, 51, y - 1, C.rojoW); } rect(40, 134, 41, 138, C.k); rect(48, 134, 49, 138, C.k);
  poligono([[296, 172], [304, 150], [312, 172]], C.k); poligono([[298, 171], [304, 153], [310, 171]], C.amarilloT); R.icono('!', 302, 160, C.k, C.amarilloT);
}
// el brazo y el asiento del sillón de extracción, por delante de la persona sentada (x: borde izquierdo del sillón)
export function sillonDelante(R, x = 150, suelo = 140) {
  const { rect } = R; rect(x, suelo - 16, x + 30, suelo - 10, C.k); rect(x + 1, suelo - 15, x + 29, suelo - 11, C.tealT); rect(x + 1, suelo - 11, x + 29, suelo - 11, C.tealTS);
  rect(x + 22, suelo - 24, x + 42, suelo - 20, C.k); rect(x + 23, suelo - 23, x + 41, suelo - 21, C.tealT); rect(x + 26, suelo - 20, x + 28, suelo - 16, C.metalD);
  rect(x + 13, suelo - 10, x + 16, suelo, C.metalD); rect(x + 6, suelo - 1, x + 24, suelo, C.metalD);
}
// una mano con guante de nitrilo que entra desde la derecha (para sostener tubitos o la lupa)
export function guante(R, x, y, dir = -1) {
  const { rect, poligono } = R, g = hex('#7a8ae0'), gS = hex('#5a68c0'), f = (u) => Math.round(x - dir * u);
  poligono([[f(0), y - 6], [f(30), y - 8], [f(60), y - 10], [f(60), y + 10], [f(30), y + 8], [f(0), y + 7]].map(([a, b]) => [a, b]), C.k);
  poligono([[f(1), y - 5], [f(30), y - 7], [f(59), y - 9], [f(59), y + 9], [f(30), y + 7], [f(1), y + 6]], g);
  for (const dy of [-3, 1]) rect(Math.min(f(-8), f(2)), y + dy, Math.max(f(-8), f(2)), y + dy + 2, C.k), rect(Math.min(f(-7), f(2)), y + dy, Math.max(f(-7), f(2)), y + dy + 1, g);
  rect(Math.min(f(4), f(24)), y + 4, Math.max(f(4), f(24)), y + 4, gS); rect(Math.min(f(60), f(70)), y - 11, Math.max(f(60), f(70)), y + 11, hex('#f4f4f8'));
}
// el inserto del pinchazo: una mano abierta con el dedo; la lanceta baja y pica (o.pica 0–1), brota la gota (o.gota 0–1)
// y una mano con guante acerca el tubito y la recoge (o.recoge 0–1); al fondo, la farmacia desenfocada
export function insertoDedo(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x += 4) rect(x, y, x + 3, y, ((x >> 4) + (y >> 4)) % 2 ? hex('#ece8e0') : hex('#e4e0d8'));
  for (let k = 0; k < 6; k++) { const cx = 20 + k * 56, cy = 40 + (k % 2) * 30; for (let j = -10; j <= 10; j++) for (let i = -16; i <= 16; i++) if ((i / 16) ** 2 + (j / 10) ** 2 < 1 && (i + j) % 2) pset(cx + i, cy + j, [hex('#f0b0b0'), hex('#b0c8f0'), hex('#f0e0a0')][k % 3]); }
  rect(0, 126, 319, 179, hex('#d8d8e0')); rect(0, 126, 319, 127, hex('#b8b8c4')); rect(20, 132, 120, 136, hex('#c8c8d4'));   // la mesita y el empapador
  // la mano, grande, con el índice extendido hacia la derecha
  const piel = hex('#f6c290'), pielS = hex('#d48a5a');
  poligono([[0, 104], [90, 96], [120, 100], [124, 120], [90, 128], [0, 130]], C.k); poligono([[0, 106], [90, 98], [118, 102], [121, 118], [90, 126], [0, 128]], piel);
  poligono([[116, 104], [196, 100], [206, 104], [206, 114], [196, 118], [116, 118]], C.k); poligono([[118, 106], [196, 102], [204, 105], [204, 113], [196, 116], [118, 116]], piel);
  rect(184, 103, 200, 112, hex('#f8d8c0')); rect(140, 115, 196, 116, pielS); for (const x of [150, 172]) linea(x, 104, x + 2, 114, pielS);   // la uña y los pliegues
  for (const [a, b] of [[96, 120], [100, 124]]) linea(a, b, a + 18, b + 2, pielS);
  rect(0, 102, 20, 132, C.k); rect(0, 103, 19, 131, hex('#c84a4a')); for (let y = 105; y < 131; y += 3) rect(0, y, 18, y, hex('#a03434'));   // la manga de la rebeca roja
  // la lanceta (un pequeño aparato con muelle) que baja, pica y vuelve a subir
  const p = o.pica ?? 0, ly = Math.round(lerp(10, 98, Math.min(1, p)) - (p > 1 ? (p - 1) * 60 : 0));
  if (p > 0 && p < 1.8) { rect(192, ly - 34, 206, ly - 4, C.k); rect(193, ly - 33, 205, ly - 5, C.tealT); rect(193, ly - 33, 205, ly - 26, C.verdeT); rect(196, ly - 4, 202, ly, C.k); rect(197, ly - 4, 201, ly - 1, C.metalL); if (p > 0.95 && p < 1.1) for (const [dx, dy] of [[-8, 2], [8, 2], [-6, -3], [6, -3]]) pset(199 + dx, ly + dy, C.k); }
  // la gota que brota en la yema
  const g = o.gota ?? 0; if (g > 0) { const r = Math.round(1 + g * 5); disco(198, 101 - r, r, C.sangreS); disco(198, 101 - r, r - 1, C.sangre); pset(197 - Math.round(r / 3), 100 - r - Math.round(r / 2), C.sangreL); }
  // el tubito, del tamaño de una uña, que acerca una mano con guante y se llena
  const rc = o.recoge ?? 0; if (rc > 0) { const tx = Math.round(lerp(330, 206, Math.min(1, rc * 1.6))), ll = Math.max(0, Math.min(1, rc * 1.6 - 0.6)); tubito(R, tx, 98, 2, ll, C.verdeT); guante(R, tx + 6, 94, -1); }
}
// ── B · la ciencia de la gota (insertos) ──────────────────────────────────────────────────────────────────────────
// el brazo con la aguja y los tubos (o.tubos: cuántos se llenan, 0–3), y la cucharadita al lado (o.cuchara)
export function insertoTubos(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#e8eef4')); for (let y = 0; y < 180; y += 3) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 40) < 0.08) pset(x, y, hex('#dce4ec'));
  rect(0, 130, 319, 179, hex('#c8d4e0')); rect(0, 130, 319, 131, hex('#a8b4c4'));
  // el brazo extendido sobre el apoyabrazos, con la goma y la aguja en la vena
  const piel = hex('#f6c290'), pielS = hex('#d48a5a');
  poligono([[0, 96], [180, 104], [184, 122], [0, 124]], C.k); poligono([[0, 98], [178, 106], [181, 120], [0, 122]], piel); rect(0, 106, 179, 107, pielS);
  rect(40, 96, 50, 124, C.k); rect(41, 97, 49, 123, hex('#4a8ae8'));   // la goma
  linea(80, 108, 150, 110, hex('#8a6ab8'));   // la vena
  rect(118, 100, 140, 106, C.k); rect(119, 101, 139, 105, C.blanco); linea(116, 106, 110, 109, C.metalD);   // la aguja con su soporte
  // los tubos de vena que se llenan y la cucharadita
  const n = o.tubos ?? 0; for (let k = 0; k < 3; k++) { const x = 200 + k * 26, y0 = 60, y1 = 126; rect(x - 7, y0, x + 7, y1, C.k); rect(x - 6, y0 + 1, x + 6, y1 - 1, hex('#f4f8fc'));
    const f = Math.max(0, Math.min(1, n - k)); if (f > 0) rect(x - 6, Math.round(y1 - 1 - (y1 - y0 - 14) * f), x + 6, y1 - 1, C.sangre); rect(x - 8, y0 - 10, x + 8, y0, C.k); rect(x - 7, y0 - 9, x + 7, y0 - 1, [C.rojoW, C.tealT, hex('#8a5ad8')][k]); pset(x - 4, y0 + 6, C.blanco); }
  if (o.cuchara) { const x = 92, y = 152; poligono([[x - 50, y + 2], [x - 2, y - 2], [x - 2, y + 4], [x - 50, y + 6]], C.metalS); for (let j = -8; j <= 8; j++) for (let i = -14; i <= 14; i++) { const e = (i / 14) ** 2 + (j / 8) ** 2; if (e < 1) pset(x + 12 + i, y + j, e > 0.82 ? C.metalD : j < -3 ? C.metalL : C.metal); }
    for (let j = -5; j <= 5; j++) for (let i = -10; i <= 10; i++) if ((i / 10) ** 2 + (j / 5) ** 2 < 1) pset(x + 12 + i, y + j, j < -2 ? C.sangreL : C.sangre); }
}
// la máquina que cuenta moléculas: una muestra pasa por un tubo y las moléculas de colores van saliendo a un contador;
// o.rara: la molécula escasa (dorada) que hay que encontrar entre muchas grises, como una aguja en un pajar
export function insertoMoleculas(R, t, o = {}) {
  const { rect, pset, disco, linea } = R;
  rect(0, 0, 319, 179, hex('#1e2a3a')); for (let y = 0; y < 180; y += 2) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 41) < 0.05) pset(x, y, hex('#24324a'));
  // el chorro de muestra que entra por la izquierda y las moléculas que flotan en el plasma
  rect(0, 70, 319, 110, hex('#f0d890')); rect(0, 70, 319, 71, hex('#c8b070')); rect(0, 109, 319, 110, hex('#c8b070'));
  const tipos = [[C.sangre, 3], [hex('#4a8ae8'), 2], [hex('#5ab85a'), 2], [hex('#e8a040'), 2], [hex('#a8a8b8'), 1]];
  for (let k = 0; k < 70; k++) { const [c, r] = o.rara ? [hex('#a8a8b8'), 1] : tipos[k % tipos.length], x = Math.round(((h(k, 1, 42) * 360 + t * (20 + k % 9)) % 360) - 20), y = Math.round(76 + h(k, 2, 42) * 28 + Math.sin(t * 2 + k) * 2); disco(x, y, r, c); }
  if (o.rara) { const x = Math.round(((t * 18) % 360) - 20), y = 90 + Math.round(Math.sin(t * 3) * 6); disco(x, y, 3, C.oroL); disco(x, y, 2, C.oro); if (Math.sin(t * 6) > 0) for (let r = 4; r < 7; r++) { pset(x + r, y, C.oroL); pset(x - r, y, C.oroL); pset(x, y - r, C.oroL); } }
  // el detector (un ojo electrónico) y el contador con barras
  rect(140, 30, 180, 66, C.k); rect(142, 32, 178, 64, C.metalS); disco(160, 50, 9, C.k); disco(160, 50, 8, hex('#0a2a18')); disco(160, 50, 3, Math.sin(t * 8) > 0 ? hex('#3ae07a') : hex('#1a6a3a')); for (let y = 66; y < 76; y += 2) pset(160, y, hex('#3ae07a'));
  rect(204, 120, 314, 172, C.k); rect(206, 122, 312, 170, hex('#0a1a2a'));
  const vals = o.rara ? [0.08, 0, 0.05, 0] : [0.8, 0.55, 0.42, 0.66]; vals.forEach((v, k) => { const a = Math.round(40 * Math.min(1, v * (0.6 + 0.4 * Math.abs(Math.sin(t + k))))), col = o.rara ? C.oro : tipos[k][0]; rect(214 + k * 24, 166 - a, 230 + k * 24, 166, col); });
  rect(6, 120, 120, 172, C.k); rect(8, 122, 118, 170, hex('#2a3a4a')); for (let k = 0; k < 4; k++) disco(30 + k * 24, 146, 6, k === Math.floor(t * 2) % 4 ? hex('#5ab0e8') : hex('#3a4a5a'));
}
// la gota frente a la cucharadita: «÷ 100» dibujado (la fuente no tiene el signo), y el líquido de los tejidos que se
// cuela en la gota (o.tejido 0–1)
export function gotaCuchara(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#e8eef4')); for (let y = 0; y < 140; y += 3) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 46) < 0.06) pset(x, y, hex('#dce4ec'));
  rect(0, 140, 319, 179, hex('#c8d4e0')); rect(0, 140, 319, 141, hex('#a8b4c4'));
  // la cucharadita llena, a la izquierda, con su reflejo
  poligono([[6, 128], [72, 120], [72, 128], [6, 136]], C.k); poligono([[8, 129], [72, 121], [72, 127], [8, 134]], C.metal);
  for (let j = -17; j <= 17; j++) for (let i = -29; i <= 29; i++) { const e = (i / 29) ** 2 + (j / 17) ** 2; if (e < 1) pset(100 + i, 122 + j, e > 0.86 ? C.k : e > 0.7 ? C.metalD : C.metal); }
  for (let j = -12; j <= 12; j++) for (let i = -23; i <= 23; i++) if ((i / 23) ** 2 + (j / 12) ** 2 < 1) pset(100 + i, 120 + j, j < -7 ? C.sangreL : j > 6 ? C.sangreS : C.sangre);
  rect(88, 112, 96, 113, hex('#f8a0a8'));
  // el signo «÷» y el 100, en el centro
  const sx = 160, sy = 64; rect(sx - 13, sy - 2, sx + 13, sy + 2, C.k); rect(sx - 12, sy - 1, sx + 12, sy + 1, C.sangreS); for (const dy of [-9, 9]) { disco(sx, sy + dy, 3, C.k); disco(sx, sy + dy, 2, C.sangreS); }
  R.numero('100', sx + 50, sy + 8, { centro: true, tam: 16 });
  // la mano a la derecha con el índice hacia arriba y la gota diminuta en la yema
  const piel = hex('#f6c290'), pielS = hex('#d48a5a');
  poligono([[232, 179], [234, 150], [252, 142], [290, 142], [300, 156], [300, 179]], C.k); poligono([[234, 179], [236, 151], [253, 144], [289, 144], [298, 157], [298, 179]], piel);
  for (const x of [262, 274, 286]) { rect(x - 5, 140, x + 5, 150, C.k); rect(x - 4, 141, x + 4, 150, piel); rect(x - 4, 146, x + 4, 146, pielS); }   // los nudillos de los dedos doblados
  rect(244, 112, 256, 150, C.k); rect(245, 113, 255, 150, piel); rect(247, 113, 253, 118, hex('#f8d8c0')); rect(245, 130, 255, 130, pielS); rect(245, 140, 255, 140, pielS);
  disco(250, 109, 3, C.sangreS); disco(250, 109, 2, C.sangre); pset(249, 108, C.sangreL);
  // el líquido de los tejidos: gotitas transparentes que se acercan y se mezclan con la gota
  const e = o.tejido ?? 0; if (e > 0) for (let k = 0; k < 10; k++) { const a = k * 0.63 + t * 0.6, r = 16 - e * 12; disco(Math.round(250 + Math.cos(a) * r), Math.round(109 + Math.sin(a) * r * 0.7), 1, hex('#a8d8f0')); pset(Math.round(250 + Math.cos(a) * r), Math.round(108 + Math.sin(a) * r * 0.7), C.blanco); }
  if (e > 0.6) { disco(250, 109, 3, hex('#e87888')); pset(249, 108, C.blanco); }
  linea(132, 122, 226, 112, hex('#a8b4c4'));
}
// el medidor de azúcar de casa: el aparatito con su tira, la gota y el número en la pantalla
export function medidorAzucar(R, t, o = {}) {
  const { rect, pset, disco } = R;
  rect(0, 0, 319, 179, hex('#f0e8dc')); for (let y = 0; y < 180; y += 4) for (let x = 0; x < 320; x++) if (h(x >> 3, y, 43) < 0.08) pset(x, y, hex('#e8dccc'));
  rect(0, 128, 319, 179, C.maderaL); rect(0, 128, 319, 130, C.madera); for (let y = 136; y < 180; y += 8) rect(0, y, 319, y, C.madera);
  rect(110, 50, 190, 130, C.k); rect(112, 52, 188, 128, hex('#3a4a6a')); rect(120, 60, 180, 90, C.k); rect(122, 62, 178, 88, hex('#a8c8a0'));
  R.numero(String(o.valor ?? 98), 150, 84, { color: hex('#1a2a1a'), centro: true, tam: 16, sombra: false });
  for (const x of [130, 150, 170]) { disco(x, 106, 5, C.k); disco(x, 106, 4, C.metalS); }
  rect(140, 128, 160, 150, C.k); rect(142, 128, 158, 148, C.blanco); disco(150, 144, 2, C.sangre);
}

// ── C · Stanford (2003) ──────────────────────────────────────────────────────────────────────────────────────────
// El patio principal con sus arcos de piedra arenisca y tejados rojos, la torre al fondo, palmeras, bicicletas que pasan
// y estudiantes; la hierba y el camino; o.tarde: luz de atardecer
export function stanford(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, hor = 112;
  cielo(R, t, { hor, aves: true, tarde: o.tarde, sol: o.tarde ? [70, 60, 9] : [240, 24, 8] });
  // la torre al fondo
  rect(214, 40, 230, hor, C.piedraSS); rect(215, 41, 229, hor, C.piedraS2); poligono([[212, 40], [222, 26], [232, 40]], C.tejaS); for (let y = 48; y < 100; y += 12) rect(219, y, 225, y + 6, C.k);
  // la galería de arcos: muro de arenisca, tejado de teja roja y arcos con sombra
  rect(0, 62, 319, hor, C.piedraSS); rect(0, 64, 319, hor, C.piedraS2); poligono([[0, 62], [0, 52], [319, 52], [319, 62]], C.tejaS); for (let x = 0; x < 320; x += 4) rect(x, 52, x + 1, 61, C.tejaSS);
  for (let k = 0; k < 9; k++) { const x = 6 + k * 36; rect(x, 74, x + 26, hor, hex('#7a5a40')); for (let a = 0; a <= Math.PI; a += 0.05) { const xx = Math.round(x + 13 - Math.cos(a) * 13), yy = Math.round(74 - Math.sin(a) * 8); rect(xx, yy, xx, 74, hex('#7a5a40')); } rect(x + 2, 92, x + 24, hor, hex('#5a4030')); rect(x - 4, 66, x - 1, hor, C.piedraSS); }
  for (let y = 66; y < hor; y += 6) for (let x = 0; x < 320; x++) if ((x + y * 3) % 23 === 0) pset(x, y, C.piedraSS);
  // la hierba, el camino y las palmeras
  rect(0, hor, 319, 179, C.hierba); for (let k = 0; k < 80; k++) pset(Math.round(h(k, 1, 44) * 320), hor + 2 + Math.round(h(k, 2, 44) * 66), C.hierbaL);
  poligono([[120, 179], [200, 179], [176, hor], [144, hor]], C.camino); for (let y = hor + 6; y < 180; y += 8) rect(150 - (y - hor) / 3, y, 170 + (y - hor) / 3, y, C.caminoS);
  for (const [px, ph] of [[40, 70], [280, 64], [96, 52]]) { const m = Math.round(Math.sin(t + px) * 2); linea(px, 170 - (px === 96 ? 30 : 0), px + 2, 170 - ph - (px === 96 ? 30 : 0), C.cortezaS); const top = [px + 2 + m, 170 - ph - (px === 96 ? 30 : 0)];
    for (let k = 0; k < 7; k++) { const a = k * 0.9 + 0.3; for (let d = 0; d < 16; d++) pset(Math.round(top[0] + Math.cos(a) * d), Math.round(top[1] + Math.sin(a) * d * 0.5 + (d * d) / 40), d % 3 ? C.hierbaS : C.hierba); } disco(top[0], top[1] + 2, 2, C.maderaS); }
  // bicicletas que pasan por el camino del fondo
  for (let k = 0; k < 2; k++) { const u = ((t * 0.08 + k * 0.5) % 1), x = Math.round(lerp(-30, 350, u)), y = hor + 6 + k * 3; for (const dx of [0, 10]) { R.disco(x + dx, y, 3, C.k); R.disco(x + dx, y, 2, C.hierba); } R.linea(x, y, x + 10, y, C.rojo); R.rect(x + 4, y - 9, x + 7, y - 3, k ? C.azulL : C.amarillo); R.disco(x + 5, y - 11, 2, hex('#f6c290')); }
}
// el cuarto de la residencia de noche: la ventana con el campus a oscuras, el corcho con notas, la estantería de libros,
// el cartel de una jeringa tachada (le daban miedo las agujas), la silla; la mesa va por delante: cuartoMesa()
export function cuarto(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#4a4a6a')); for (let x = 0; x < 320; x += 20) rect(x, 0, x, 128, hex('#44445e'));
  rect(200, 16, 290, 84, C.k); rect(202, 18, 288, 82, C.noche2); for (let k = 0; k < 10; k++) if ((t * 2 + k) % 5 > 0.4) pset(206 + (k * 37) % 80, 22 + (k * 23) % 30, C.blanco);
  for (let x = 202; x < 288; x += 7) { const a = 6 + (x * 13) % 12; rect(x, 82 - a, x + 5, 82, hex('#2a2a40')); if ((x / 7 | 0) % 3 === 0) pset(x + 2, 82 - a + 3, C.oroL); } rect(244, 18, 245, 82, C.k); rect(200, 84, 290, 86, C.maderaS);
  rect(246, 34, 256, 52, hex('#3a3a58')); poligono([[244, 34], [251, 26], [258, 34]], hex('#3a3a58')); pset(251, 40, C.oroL);   // la torre del campus, a lo lejos
  rect(20, 20, 90, 70, C.maderaL); rect(22, 22, 88, 68, hex('#c8a070')); for (let k = 0; k < 6; k++) { const x = 26 + (k % 3) * 20, y = 26 + Math.floor(k / 3) * 20; rect(x, y, x + 14, y + 14, [C.amarillo, hex('#f0a0c0'), C.blanco, hex('#a0e0f0')][k % 4]); disco(x + 7, y + 1, 1, C.rojo); for (let l = 0; l < 3; l++) rect(x + 2, y + 5 + l * 3, x + 11 - l * 2, y + 5 + l * 3, hex('#8a8aa0')); }
  // el cartel de la jeringa tachada
  rect(110, 24, 150, 64, C.k); rect(111, 25, 149, 63, C.blanco); rect(118, 42, 140, 47, C.k); rect(119, 43, 139, 46, hex('#c8e8f8')); rect(140, 44, 146, 45, C.metalD); rect(114, 41, 118, 48, C.k); for (let i = 0; i < 26; i++) { rect(113 + i * 1.3, 30 + i, 115 + i * 1.3, 31 + i, C.rojo); }
  // la estantería con libros de colores
  rect(4, 78, 70, 128, C.maderaS); for (const y of [92, 110, 126]) { rect(4, y, 70, y + 2, C.madera); for (let k = 0; k < 9; k++) { const hh = 9 + Math.round(h(k, y, 47) * 5); rect(7 + k * 7, y - hh, 12 + k * 7, y - 1, C.k); rect(8 + k * 7, y - hh + 1, 11 + k * 7, y - 1, [C.rojo, C.azulL, C.amarillo, hex('#5ab85a'), hex('#8a5ad8')][k % 5]); } }
  // el suelo y la silla, de la que solo se ve el respaldo por encima de la mesa
  rect(0, 128, 319, 179, hex('#6a5a4a')); for (let y = 134; y < 180; y += 8) rect(0, y, 319, y, hex('#5a4a3a'));
  rect(110, 100, 138, 128, C.k); rect(111, 101, 137, 127, hex('#3a5a8a')); rect(111, 101, 137, 103, hex('#4a6a9a'));
}
// la mesa del cuarto por delante de Holmes: flexo encendido con su charco de luz, libreta con el aparato que se va
// dibujando (o.dibujo 0–1), apuntes, la lata de refresco y la taza con lápices
export function cuartoMesa(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(60, 124, 300, 130, C.k); rect(61, 125, 299, 129, C.madera); rect(61, 125, 299, 125, C.maderaL); rect(66, 130, 296, 165, C.maderaS); rect(70, 134, 292, 161, C.madera); rect(178, 140, 186, 142, C.oroS);
  // el flexo con su luz en la mesa
  linea(236, 124, 244, 98, C.metalD); linea(244, 98, 226, 88, C.metalD); poligono([[218, 92], [232, 84], [236, 92], [224, 98]], C.k); poligono([[220, 92], [232, 86], [234, 92], [224, 96]], C.verde); rect(230, 124, 244, 125, C.k);
  for (let y = 98; y < 124; y++) for (let x = 200; x < 250; x++) if ((x + y) % 3 === 0 && Math.abs(x - 222) < (y - 96) * 1.1) pset(x, y, hex('#e8e0a0'));
  // la libreta con el aparato: una cajita, una gota y flechas hacia decenas de casillas
  rect(150, 116, 210, 124, C.k); rect(151, 117, 209, 123, C.blanco); const d = o.dibujo ?? 0;
  if (d > 0.1) { rect(154, 118, 154 + Math.round(12 * Math.min(1, d * 3)), 122, hex('#3a3a6a')); }
  if (d > 0.35) { disco(172, 120, 2, C.sangre); }
  if (d > 0.55) for (let k = 0; k < Math.min(6, Math.round((d - 0.55) * 14)); k++) rect(180 + k * 4, 118 + (k % 2) * 3, 182 + k * 4, 119 + (k % 2) * 3, hex('#3a3a6a'));
  for (let k = 0; k < 5; k++) { const x = 90 + k * 9, y = 123 - (k % 2); rect(x, y - 1, x + 7, y, C.papel); }
  rect(264, 116, 270, 124, C.k); rect(265, 117, 269, 123, C.rojo); pset(266, 118, C.blanco);
  rect(274, 116, 282, 124, C.k); rect(275, 117, 281, 123, hex('#e8e0d0')); for (const [x, c] of [[276, C.amarillo], [278, C.azulL], [280, C.rojo]]) rect(x, 110 + (x % 3), x, 116, c);
}
// ── D · la sede de Theranos en Palo Alto ─────────────────────────────────────────────────────────────────────────
// La oficina por dentro: plafones, paredes de cristal con salas detrás (pantallas y sillas), el letrero colgante con el
// logotipo, la puerta con lector de tarjeta y su luz, moqueta y plantas. o.apaga (0–1): los plafones se apagan uno a
// uno y la sala se queda a oscuras; o.descuelga (0–1): el letrero se suelta de un cable, se inclina y cae
export function sede(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, ap = o.apaga ?? 0;
  rect(0, 0, 319, 179, hex('#e8ecf0')); rect(0, 0, 319, 10, hex('#c8ccd4'));
  for (let k = 0; k < 5; k++) { const x = 14 + k * 62, on = ap < (k + 1) / 6; rect(x, 9, x + 40, 11, on ? C.blanco : hex('#8a8e98')); if (on) for (let y = 12; y < 24; y++) for (let xx = x - (y - 12); xx < x + 40 + (y - 12); xx++) if ((xx + y) % 4 === 0) pset(xx, y, hex('#f4f6f8')); }
  // las paredes de cristal con sus montantes y reflejos, y las salas de detrás con mesas, pantallas y sillas
  for (let k = 0; k < 4; k++) { const x0 = 10 + k * 78, x1 = x0 + 70; rect(x0, 26, x1, 120, C.cristalOS); rect(x0 + 1, 27, x1 - 1, 119, C.cristalO); for (let i = 0; i < 20; i++) pset(x0 + 6 + i, 32 + i * 2, C.blanco);
    rect(x0 + 10, 86, x1 - 10, 90, C.blanco); rect(x0 + 14, 90, x0 + 15, 104, C.metalD); rect(x1 - 15, 90, x1 - 14, 104, C.metalD);
    for (const sx of [x0 + 18, x0 + 40]) { rect(sx, 72, sx + 16, 86, C.k); rect(sx + 1, 73, sx + 15, 85, (Math.floor(t * 0.5 + sx) % 4) ? hex('#2a3a5a') : hex('#3a5a8a')); rect(sx + 7, 86, sx + 9, 88, C.k); }
    for (const sx of [x0 + 16, x0 + 44]) { rect(sx, 92, sx + 10, 100, hex('#3a3a4a')); rect(sx + 4, 100, sx + 6, 106, C.metalD); }
    rect(x1 + 1, 26, x1 + 7, 120, C.metalL); rect(x1 + 1, 26, x1 + 1, 120, C.metalS); }
  // el letrero colgante con el logotipo
  const dq = o.descuelga ?? 0, ang = dq < 0.4 ? dq / 0.4 * 0.5 : 0.5, cae = dq < 0.4 ? 0 : (dq - 0.4) / 0.6 * 120;
  { const cx = 160, cy = Math.round(46 + cae), c = Math.cos(ang), sn = Math.sin(ang), q = (u, v) => [Math.round(cx + u * c - v * sn), Math.round(cy + u * sn + v * c)];
    if (dq < 0.4) { linea(cx - 24, 10, ...q(-24, -12), C.metalD); } if (dq === 0) linea(cx + 24, 10, ...q(24, -12), C.metalD); else if (dq < 0.4) linea(cx + 24, 10, cx + 26, 20, C.metalD);
    poligono([q(-30, -12), q(30, -12), q(30, 12), q(-30, 12)], C.k); poligono([q(-29, -11), q(29, -11), q(29, 11), q(-29, 11)], C.blanco); if (cy < 150) logoTheranos(R, q(0, 0)[0], q(0, 0)[1], 0.8, t); }
  // la puerta con lector de tarjeta y su luz
  rect(286, 40, 318, 120, C.metalS); rect(288, 42, 316, 120, C.metalL); rect(290, 70, 296, 80, C.k); pset(293, 72, Math.floor(t * 1.5) % 3 ? C.rojo : C.verdeL); rect(310, 76, 312, 86, C.metalD);
  // el suelo de moqueta y las plantas
  rect(0, 120, 319, 179, C.moqueta); for (let y = 124; y < 180; y += 5) for (let x = 0; x < 320; x += 8) pset(x + (y % 10), y, C.moquetaS);
  for (const x of [80, 238]) { rect(x - 6, 104, x + 6, 120, C.k); rect(x - 5, 105, x + 5, 119, C.blanco); const m = Math.round(Math.sin(t * 0.8 + x) * 1); disco(x + m, 98, 8, C.verde); disco(x - 3 + m, 94, 5, C.verdeL); disco(x + 4, 100, 4, C.hierbaS); }
  if (ap > 0) tinte(R, 0, 179, [18, 22, 44], Math.min(0.72, ap * 0.8));
}
// el armario del despacho con diez jerséis negros de cuello alto idénticos en sus perchas (gag)
export function armario(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#d8d4cc')); rect(30, 10, 290, 170, C.k); rect(32, 12, 288, 170, hex('#f4f2ee')); rect(36, 30, 284, 32, C.metalD);
  const abre = o.abre ?? 1; for (let k = 0; k < 10; k++) { const x = 46 + k * 24, sw = Math.round(Math.sin(t * 2 + k) * (abre < 1 ? 1 : 0.4));
    linea(x + 8, 32, x + 8, 38, C.metalD); poligono([[x, 46 + sw], [x + 8, 38], [x + 16, 46 + sw]], C.metalD);
    rect(x, 44, x + 16, 120, C.k); rect(x + 1, 45, x + 15, 119, hex('#1e1e28')); rect(x + 4, 40, x + 12, 46, hex('#1e1e28')); rect(x + 4, 40, x + 12, 41, C.k); for (let y = 48; y < 118; y += 4) pset(x + 4 + (y % 8), y, hex('#2a2a36')); }
  rect(36, 130, 284, 132, C.maderaS); for (let k = 0; k < 6; k++) { rect(50 + k * 38, 138, 74 + k * 38, 150, C.k); rect(51 + k * 38, 139, 73 + k * 38, 149, hex('#1e1e28')); }   // zapatos negros
  if (abre < 1) { const w = Math.round((1 - abre) * 128); rect(32, 12, 32 + w, 170, C.maderaL); rect(288 - w, 12, 288, 170, C.maderaL); rect(32 + w - 2, 80, 32 + w, 100, C.oro); rect(288 - w, 80, 290 - w, 100, C.oro); }
}
// la máquina Edison: caja blanca del tamaño de una impresora, con pantalla táctil, la ranura del cartucho y una luz;
// o.humo (0–1): falla, pita y echa humo; o.papel (0–1): escupe un papel en blanco; o.sabana (0–1): una sábana la tapa
export function edison(R, x, y, t, o = {}) {
  const { rect, pset, disco, poligono } = R, s = o.s ?? 1, W = Math.round(40 * s), H = Math.round(34 * s);
  rect(x - W, y - H, x + W, y, C.k); rect(x - W + 1, y - H + 1, x + W - 1, y - 1, hex('#f4f6f8')); rect(x - W + 1, y - H + 1, x + W - 1, y - H + Math.round(4 * s), hex('#e0e4ea'));
  rect(x - Math.round(30 * s), y - Math.round(28 * s), x + Math.round(4 * s), y - Math.round(10 * s), C.k); rect(x - Math.round(29 * s), y - Math.round(27 * s), x + Math.round(3 * s), y - Math.round(11 * s), o.humo ? hex('#8a2a2a') : hex('#3a6a8a'));
  logoTheranos(R, x - Math.round(13 * s), y - Math.round(19 * s), 0.5 * s, t);
  rect(x + Math.round(12 * s), y - Math.round(22 * s), x + Math.round(32 * s), y - Math.round(18 * s), C.k); disco(x + Math.round(22 * s), y - Math.round(8 * s), Math.round(2 * s), o.humo && Math.sin(t * 12) > 0 ? C.rojo : C.verdeL);
  const p = o.papel ?? 0; if (p > 0) { const l = Math.round(p * 30 * s); rect(x + Math.round(12 * s), y - Math.round(22 * s) - l, x + Math.round(32 * s), y - Math.round(22 * s), C.k); rect(x + Math.round(13 * s), y - Math.round(22 * s) - l + 1, x + Math.round(31 * s), y - Math.round(22 * s), C.blanco); }
  const hu = o.humo ?? 0; if (hu > 0) for (let k = 0; k < 8; k++) { const u = ((t * 0.7 + k / 8) % 1), px = Math.round(x + Math.sin(k + t) * 6 * s - u * 10), py = Math.round(y - H - u * 50 * s); disco(px, py, Math.round((2 + u * 6) * s * hu), u > 0.6 ? C.grisL : C.gris); }
  const sb = o.sabana ?? 0; if (sb > 0) { const top = Math.round(lerp(y - H - 40, y - H - 4, Math.min(1, sb))); poligono([[x - W - 6, y + 2], [x - W - 2, top + 6], [x, top], [x + W + 2, top + 6], [x + W + 6, y + 2]], C.k); poligono([[x - W - 5, y + 1], [x - W - 1, top + 7], [x, top + 1], [x + W + 1, top + 7], [x + W + 5, y + 1]], hex('#f0f0f4')); for (let k = 0; k < 4; k++) R.linea(x - W + 10 + k * 18, top + 8, x - W + 6 + k * 20, y, hex('#d8d8e0')); }
}

// ── E · el consejo y el dinero ───────────────────────────────────────────────────────────────────────────────────
// La sala del consejo: paneles de caoba, dos ventanales con las colinas de Silicon Valley (nubes que pasan), retratos con
// marco dorado, la bandera de EE. UU. y otra con flecos, lámparas colgantes y los respaldos altos de cuero. La mesa va
// por delante de los consejeros: consejoMesa()
export function consejo(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, C.caoba); for (let x = 0; x < 320; x += 24) { rect(x, 0, x, 179, C.caobaS); rect(x + 1, 0, x + 1, 179, C.caobaL); }
  rect(0, 0, 319, 6, C.caobaS); rect(0, 112, 319, 116, C.caobaS);
  // los ventanales: cielo, colinas verdes y doradas, las nubes que pasan
  for (const x0 of [70, 196]) { rect(x0, 16, x0 + 70, 84, C.k); rect(x0 + 2, 18, x0 + 68, 82, C.cielo2); rect(x0 + 2, 18, x0 + 68, 40, C.cielo1);
    for (let k = 0; k < 2; k++) { const nx = x0 + 2 + Math.round(((t * 3 + k * 40 + x0) % 90)) - 10; if (nx > x0 && nx < x0 + 60) { disco(nx, 30 + k * 8, 4, C.blanco); disco(nx + 5, 31 + k * 8, 3, C.blanco); } }
    for (let x = x0 + 2; x <= x0 + 68; x++) { const y1 = 62 + Math.round(Math.sin(x * 0.07) * 6), y2 = 70 + Math.round(Math.sin(x * 0.11 + 1) * 4); rect(x, y1, x, 82, hex('#8aa860')); rect(x, y2, x, 82, hex('#d8b860')); }
    rect(x0 + 34, 18, x0 + 36, 82, C.k); rect(x0 + 2, 50, x0 + 68, 51, C.k); rect(x0 - 2, 84, x0 + 72, 87, C.caobaL); }
  // retratos con marco dorado (siluetas con traje) entre los ventanales y a los lados
  for (const x of [18, 154, 280]) { rect(x - 13, 22, x + 13, 58, C.k); rect(x - 12, 23, x + 12, 57, C.oro); rect(x - 10, 25, x + 10, 55, hex('#3a3040')); disco(x, 36, 5, hex('#5a4a50')); poligono([[x - 9, 55], [x - 7, 45], [x + 7, 45], [x + 9, 55]], hex('#2a2430')); }
  // la bandera de EE. UU. (barras y cantón con puntos) y su mástil dorado, con un leve vaivén
  { const bx = 150, by = 64; rect(bx - 1, by - 4, bx, 112, C.oro); disco(bx, by - 5, 2, C.oro);
    for (let j = 0; j < 13; j++) for (let i = 0; i < 26; i++) { const yy = by + j + Math.round(Math.sin(t * 2 + i * 0.3) * 1); pset(bx + 1 + i, yy, j % 2 ? C.blanco : C.rojo); }
    for (let j = 0; j < 7; j++) for (let i = 0; i < 11; i++) { const yy = by + j + Math.round(Math.sin(t * 2 + i * 0.3) * 1); pset(bx + 1 + i, yy, (i + j) % 2 ? hex('#2a3a8a') : C.blanco); } }
  // las lámparas colgantes
  for (const x of [60, 160, 260]) { linea(x, 0, x, 92, C.k); poligono([[x - 8, 100], [x - 4, 92], [x + 4, 92], [x + 8, 100]], C.oroS); rect(x - 7, 100, x + 7, 101, C.oroL); }
  // los respaldos altos de cuero de las sillas
  for (const x of o.sillas ?? [56, 100, 144, 188, 232]) { rect(x - 1, 102, x + 17, 132, C.k); rect(x, 103, x + 16, 132, C.cuero); for (let y = 108; y < 130; y += 6) for (let i = 2; i < 16; i += 6) pset(x + i, y, hex('#5a3a30')); }
  rect(0, 116, 319, 179, C.moqueta);
}
// la mesa larga de caoba vista de frente, con vasos de agua, carpetas, micrófonos y el dinero que entra (o.dinero 0–1:
// fajos que caen sobre la mesa y se apilan)
export function consejoMesa(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  poligono([[20, 128], [300, 128], [316, 138], [4, 138]], C.k); poligono([[22, 129], [298, 129], [313, 137], [7, 137]], C.caobaL); rect(4, 138, 316, 179, C.k); rect(6, 139, 314, 179, C.caoba); for (let x = 30; x < 300; x += 60) rect(x, 144, x + 40, 172, C.caobaS);
  for (let k = 0; k < 5; k++) { const x = 60 + k * 44; rect(x, 124, x + 4, 131, C.k); rect(x + 1, 125, x + 3, 130, hex('#c8e8f8')); pset(x + 1, 126, C.blanco); rect(x + 8, 129, x + 22, 132, C.k); rect(x + 9, 129, x + 21, 131, k % 2 ? C.ocre : hex('#4a6aa8')); linea(x + 26, 130, x + 30, 120, C.k); disco(x + 30, 119, 1, C.k); }
  const d = o.dinero ?? 0; if (d > 0) for (let k = 0; k < 14; k++) { const u = Math.min(1, Math.max(0, d * 1.6 - k * 0.05)), x = 40 + (k * 53) % 240, y0 = -10 - (k % 4) * 12, pila = Math.floor(k / 5), yF = 127 - pila * 3, y = Math.round(lerp(y0, yF, u * u)); if (u <= 0) continue;
    rect(x, y - 3, x + 12, y, C.k); rect(x + 1, y - 2, x + 11, y - 1, hex('#7ab86a')); rect(x + 5, y - 2, x + 7, y - 1, hex('#4a8a4a')); if (u < 1) { pset(x - 2, y - 6, hex('#7ab86a')); } }
}
// el contador de la valoración: una placa con dígitos de 16 px y comas, como un marcador; v es el número (puede ser
// fraccionario: o.rueda hace girar los dígitos como una tragaperras hacia ese valor)
export function contador(R, t, v, o = {}) {
  const { rect, disco } = R, s = '$' + Math.round(Math.max(0, v)).toLocaleString('en-US'), w = s.length * 16 + 20, x0 = Math.round(160 - w / 2), y0 = o.y ?? 72;
  rect(x0 - 4, y0 - 4, x0 + w + 4, y0 + 34, C.k); rect(x0 - 3, y0 - 3, x0 + w + 3, y0 + 33, C.oroS); rect(x0, y0, x0 + w, y0 + 30, hex('#141a2a'));
  for (let k = 0; k < 12; k++) disco(x0 - 3 + Math.round(k * (w + 6) / 11), y0 - 3, 1, Math.floor(t * 6 + k) % 3 === 0 ? C.oroL : C.oro);
  if (o.rueda) { let x = x0 + 10, i = 0; for (const ch of s) { if (/\d/.test(ch)) { const v0 = (+ch + Math.floor(t * 9 + i * 0.37)) % 10, p = (t * 9 + i * 0.37) % 1; R.numero(String(v0), x + 8, y0 + 24 + Math.round(p * 24), { tam: 16, centro: true }); R.numero(String((v0 + 1) % 10), x + 8, y0 + 24 + Math.round((p - 1) * 24), { tam: 16, centro: true }); } else R.numero(ch, x + 8, y0 + 24, { tam: 16, centro: true }); x += 16; i++; }
    rect(x0 - 4, y0 - 30, x0 + w + 4, y0 - 4, o.fondo ?? C.caoba); rect(x0 - 4, y0 + 35, x0 + w + 4, y0 + 60, o.fondo ?? C.caoba); rect(x0 - 4, y0 - 4, x0 + w + 4, y0 - 3, C.k); rect(x0 - 3, y0 - 3, x0 + w + 3, y0 - 1, C.oroS); rect(x0 - 4, y0 + 33, x0 + w + 4, y0 + 34, C.k); rect(x0 - 3, y0 + 31, x0 + w + 3, y0 + 32, C.oroS); }
  else R.numero(s, 160, y0 + 24, { tam: 16, centro: true, rampa: o.rojo ? R.PALA.ROJO : undefined });
}
// la portada de revista en un quiosco: cabecera en barras de color (sin letras), la silueta con jersey negro de cuello
// alto y melena rubia, sin rasgos; la corona y el «$» de la lista de fortunas. o.tachada: una «X» roja la cruza
export function revista(R, t, o = {}) {
  const { rect, pset, disco, poligono } = R;
  rect(0, 0, 319, 179, hex('#3a4a5a')); for (let k = 0; k < 6; k++) { const x = k * 56 - 6; rect(x, 20, x + 44, 80, C.k); rect(x + 1, 21, x + 43, 79, [hex('#e8c040'), hex('#4a8ae8'), hex('#e84a4a'), hex('#5ab85a'), hex('#e87ab8'), hex('#f2f2f2')][k]); rect(x + 4, 26, x + 40, 30, C.k); }   // otras revistas detrás
  rect(0, 80, 319, 86, C.maderaS); rect(0, 140, 319, 179, C.maderaS); rect(0, 140, 319, 142, C.maderaL);
  const x0 = 100, x1 = 220, y0 = 34, y1 = 170; rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, C.k); rect(x0, y0, x1, y1, hex('#f4f0e8'));
  rect(x0 + 6, y0 + 6, x1 - 6, y0 + 22, C.rojoW); for (let k = 0; k < 7; k++) rect(x0 + 12 + k * 14, y0 + 9, x0 + 20 + k * 14, y0 + 19, C.blanco);
  // la silueta: melena rubia detrás de los hombros, cabeza sin rasgos, jersey negro de cuello alto
  disco(160, 92, 24, hex('#d8b860')); rect(136, 92, 184, 128, hex('#d8b860')); disco(160, 86, 17, hex('#e8c8a0')); rect(150, 100, 170, 112, hex('#e8c8a0'));
  poligono([[118, y1 - 2], [124, 128], [146, 114], [174, 114], [196, 128], [202, y1 - 2]], hex('#1e1e28')); rect(148, 106, 172, 118, hex('#1e1e28')); rect(150, 106, 170, 107, hex('#2a2a36'));
  R.icono('corona', 196, y0 + 30, C.oro, C.k, 2); R.numero('$', 120, y0 + 50, { tam: 16 });
  for (let k = 0; k < 4; k++) rect(x0 + 8, y1 - 30 + k * 6, x0 + 40 - (k % 2) * 10, y1 - 28 + k * 6, hex('#8a8a9a'));
  if (o.tachada) { const u = Math.min(1, o.tachada); for (let i = 0; i < Math.round(110 * u); i++) { R.rect(x0 + 4 + i, y0 + 10 + i * 1.1, x0 + 8 + i, y0 + 13 + i * 1.1, C.rojo); R.rect(x1 - 8 - i, y0 + 10 + i * 1.1, x1 - 4 - i, y0 + 13 + i * 1.1, C.rojo); } }
}

// ── F · el laboratorio ───────────────────────────────────────────────────────────────────────────────────────────
// Pared verde pálido con tubos de ventilación y plafones, la pantalla de controles de calidad (puntos que se salen de
// las líneas en rojo con o.rojo), tres cajas Edison en un banco a la izquierda, dos analizadores comerciales enormes a la
// derecha con su carrusel de tubos que gira y su cinta, la centrífuga, la nevera con gradillas y la puerta con lector
export function laboratorio(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#dde8e2')); rect(0, 0, 319, 12, hex('#c4d0ca')); rect(0, 12, 319, 18, hex('#b4c0ba')); for (let x = 0; x < 320; x += 30) rect(x, 12, x + 1, 18, hex('#9aa8a2'));
  for (let k = 0; k < 4; k++) rect(20 + k * 80, 4, 64 + k * 80, 6, C.blanco);
  // la pantalla de controles de calidad: tres líneas y los puntos del día
  const px0 = 116, py0 = 26; rect(px0, py0, px0 + 74, py0 + 40, C.k); rect(px0 + 2, py0 + 2, px0 + 72, py0 + 38, hex('#0e1a24'));
  for (const [dy, c] of [[8, hex('#c84a4a')], [20, hex('#5ab85a')], [32, hex('#c84a4a')]]) for (let x = px0 + 4; x < px0 + 70; x += 2) pset(x, py0 + dy, c);
  for (let k = 0; k < 12; k++) { const x = px0 + 6 + k * 5, malo = o.rojo && k > 5 && k % 2 === 0, y = py0 + 20 + Math.round((h(k, 1, 48) - 0.5) * 12) + (malo ? (k % 4 ? -16 : 16) : 0); disco(x, Math.max(py0 + 3, Math.min(py0 + 37, y)), 1, malo ? (Math.sin(t * 8) > 0 ? C.rojo : C.sangreL) : hex('#8ad0f0')); }
  if (o.rojo) disco(px0 + 78, py0 + 4, 3, Math.sin(t * 8) > 0 ? C.rojo : C.rojoS);
  // el banco de la izquierda con tres Edison (pequeñas) y una gradilla
  rect(0, 108, 110, 112, C.k); rect(0, 109, 110, 111, C.metalL); rect(0, 112, 110, 140, hex('#c8d0d8')); for (let x = 4; x < 110; x += 26) rect(x, 114, x + 22, 138, hex('#b8c0c8'));
  for (let k = 0; k < 3; k++) if (!(o.sinEdison ?? []).includes(k)) edison(R, 18 + k * 34, 108, t, { s: 0.38, humo: o.humoEdison === k ? 1 : 0, sabana: o.sabanaEdison === k ? 1 : 0 });
  // los dos analizadores comerciales, grandes: carcasa gris, ventana con el carrusel girando, pantalla y cinta de tubos
  for (const [x0, col] of [[196, hex('#e4e8ee')], [256, hex('#e8e4dc')]]) { rect(x0, 40, x0 + 56, 140, C.k); rect(x0 + 1, 41, x0 + 55, 139, col); rect(x0 + 1, 41, x0 + 55, 46, C.metalL);
    rect(x0 + 6, 54, x0 + 50, 84, C.k); rect(x0 + 7, 55, x0 + 49, 83, hex('#2a3a4a')); const cx = x0 + 28, cy = 69; for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2 + t * 1.2; const tx = Math.round(cx + Math.cos(a) * 14), ty = Math.round(cy + Math.sin(a) * 9); rect(tx - 1, ty - 3, tx + 1, ty + 2, C.blanco); pset(tx, ty - 3, [C.rojoW, C.tealT, C.amarilloT, hex('#8a5ad8')][k % 4]); }
    rect(x0 + 8, 92, x0 + 30, 106, C.k); rect(x0 + 9, 93, x0 + 29, 105, hex('#3a6a8a')); for (let k = 0; k < 3; k++) rect(x0 + 11, 95 + k * 3, x0 + 11 + Math.round(10 + Math.sin(t * 2 + k + x0) * 6), 96 + k * 3, hex('#8ad0f0'));
    for (let k = 0; k < 3; k++) disco(x0 + 38 + k * 5, 98, 1, Math.floor(t * 3 + k) % 3 === 0 ? C.verdeL : hex('#3a5a3a')); rect(x0 + 4, 112, x0 + 52, 136, hex('#d0d4da')); for (let y = 116; y < 136; y += 5) rect(x0 + 6, y, x0 + 50, y, hex('#b8bcc4')); }
  rect(190, 132, 319, 136, C.k); for (let x = 192; x < 320; x += 6) { const xx = 192 + ((x - 192 + Math.round(t * 10)) % 128); rect(xx, 127, xx + 1, 132, C.blanco); pset(xx, 127, C.tealT); }   // la cinta con tubos
  // la centrífuga que gira y la nevera con gradillas
  rect(118, 100, 146, 140, C.k); rect(119, 101, 145, 139, C.metalL); disco(132, 114, 10, C.k); disco(132, 114, 9, C.metal); for (let k = 0; k < 4; k++) { const a = t * 14 + k * Math.PI / 2; disco(Math.round(132 + Math.cos(a) * 6), Math.round(114 + Math.sin(a) * 6), 1, C.k); } rect(122, 128, 142, 130, C.metalD);
  rect(150, 70, 186, 140, C.k); rect(151, 71, 185, 139, hex('#c8e0f0')); for (const y of [86, 104, 122]) { rect(152, y, 184, y + 1, C.metalD); for (let k = 0; k < 7; k++) { rect(154 + k * 4, y - 8, 155 + k * 4, y - 1, C.blanco); pset(154 + k * 4, y - 8, [C.rojoW, C.tealT, C.amarilloT][k % 3]); } } rect(182, 96, 184, 112, C.metalD);
  // el suelo de vinilo con brillo
  rect(0, 140, 319, 179, hex('#b8c8c4')); for (let y = 146; y < 180; y += 8) rect(0, y, 319, y, hex('#a8b8b4')); for (let k = 0; k < 8; k++) rect(10 + k * 40, 150, 26 + k * 40, 150, hex('#d0dcd8'));
}
// el inserto de la dilución: la gota cae en un tubo grande de agua (o.u 0–1: cae, se mezcla y se queda rosa pálido); con
// o.lupa (0–1) una mano con guante mueve una lupa buscando las pocas moléculas doradas que quedan (gag)
export function insertoDiluye(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, u = o.u ?? 0;
  rect(0, 0, 319, 179, hex('#dde8e2')); for (let y = 0; y < 180; y += 3) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 49) < 0.05) pset(x, y, hex('#d0dcd6'));
  rect(0, 150, 319, 179, hex('#c8d0d8')); rect(0, 150, 319, 151, hex('#a8b0b8'));
  // la gradilla y el tubo grande, con el agua
  rect(100, 140, 220, 150, C.k); rect(101, 141, 219, 149, C.metalL); const x0 = 140, x1 = 180, y0 = 30, y1 = 146;
  rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0, x1 - 1, y1 - 1, hex('#f4f8fc')); const nivel = 52;
  const mezcla = Math.max(0, Math.min(1, (u - 0.35) / 0.45)), col = mezcla > 0.6 ? hex('#f4d8dc') : mezcla > 0.2 ? hex('#f0b8c0') : hex('#c8e4f4');
  rect(x0 + 1, nivel, x1 - 1, y1 - 1, col); if (mezcla > 0 && mezcla < 0.7) for (let k = 0; k < 18; k++) { const yy = Math.round(nivel + 4 + h(k, 1, 50) * 80 * mezcla), xx = Math.round(x0 + 6 + h(k, 2, 50) * 28 + Math.sin(t * 2 + k) * 2); disco(xx, yy, 1, C.sangre); }
  for (let y = nivel; y < y1; y += 4) pset(x0 + 4, y, C.blanco); for (let k = 0; k < 4; k++) rect(x1 - 6, nivel + 10 + k * 20, x1 - 2, nivel + 10 + k * 20, hex('#8a9aa8'));
  // la gota que cae desde la pipeta
  rect(152, 0, 168, 12, C.k); rect(153, 0, 167, 11, C.blanco); poligono([[154, 12], [166, 12], [161, 26], [159, 26]], C.k); poligono([[156, 12], [164, 12], [160, 24]], hex('#f4f8fc'));
  if (u > 0 && u < 0.4) { const gy = Math.round(lerp(28, nivel, u / 0.4)); disco(160, gy, 3, C.sangreS); disco(160, gy, 2, C.sangre); } if (u >= 0.38 && u < 0.5) for (let k = 0; k < 6; k++) pset(160 + Math.round(Math.cos(k) * 5), nivel - 1 - (k % 2), C.blanco);
  // las moléculas raras: muy pocas, doradas, que se esconden en el agua
  const n = Math.round(lerp(10, 3, mezcla)); for (let k = 0; k < (u > 0.4 ? n : 0); k++) { const xx = Math.round(x0 + 8 + h(k, 3, 51) * 24 + Math.sin(t + k) * 3), yy = Math.round(nivel + 10 + h(k, 4, 51) * 80 * (0.3 + mezcla * 0.7)); pset(xx, yy, C.oro); }
  const lp = o.lupa ?? 0; if (lp > 0) { const lx = Math.round(160 + Math.sin(t * 1.3) * 18), ly = Math.round(lerp(200, 100, Math.min(1, lp * 2)) + Math.cos(t * 0.9) * 22);
    disco(lx, ly, 17, C.k); disco(lx, ly, 15, hex('#e4f0f8')); for (let j = -14; j <= 14; j++) for (let i = -14; i <= 14; i++) if (i * i + j * j < 196) { const c = R.pget(lx + i, ly + j); if (c === col) pset(lx + i, ly + j, hex('#f8eef0')); } pset(lx - 6, ly - 8, C.blanco); pset(lx - 7, ly - 7, C.blanco);
    const ox = Math.round(x0 + 8 + h(0, 3, 51) * 24 + Math.sin(t) * 3); if (Math.abs(ox - lx) < 12) R.icono('?', lx + 20, ly - 26, C.rojo, C.k, 2);
    linea(lx + 12, ly + 12, lx + 30, ly + 30, C.k); linea(lx + 13, ly + 12, lx + 31, ly + 30, C.maderaS); linea(lx + 12, ly + 13, lx + 30, ly + 31, C.maderaS); guante(R, lx + 34, ly + 34, -1); }
}
// la pantalla de un ordenador de cerca: o.modo 'correo' (un sobre que se escribe con líneas y sale volando, o.envia 0–1)
// o 'respuesta' (llega un sobre rojo con «!» que tiembla, y sus líneas en rojo); o.modo 'resultados': filas de números
// con algunos en rojo (o.rojos 0–1)
export function pantalla(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#2a2e3a')); for (let y = 0; y < 180; y += 4) rect(0, y, 319, y, hex('#262a36'));
  rect(40, 14, 280, 158, C.k); rect(44, 18, 276, 150, hex('#eef2f6')); rect(44, 18, 276, 28, hex('#c8d0dc')); for (const [x, c] of [[50, C.rojo], [58, C.amarillo], [66, C.verdeL]]) disco(x, 23, 2, c);
  rect(150, 158, 170, 168, C.k); rect(120, 168, 200, 172, C.k);
  if (o.modo === 'resultados') { for (let k = 0; k < 9; k++) { const y = 36 + k * 12, malo = (o.rojos ?? 0) * 9 > k && k % 2 === 1; rect(54, y, 120, y + 6, hex('#c8d0dc')); R.numero(String(Math.round(40 + h(k, 1, 52) * 160)), 190, y + 7, { color: malo ? C.rojo : C.k, sombra: false }); if (malo) R.icono('!', 230, y, C.rojo, hex('#eef2f6')); } return; }
  const resp = o.modo === 'respuesta', v = resp ? Math.round(Math.sin(t * 30) * 2) : 0, env = o.envia ?? 0, ex = Math.round(160 + v + env * 200), ey = Math.round(84 - env * 60);
  if (env < 1) { rect(ex - 50, ey - 30, ex + 50, ey + 30, C.k); rect(ex - 49, ey - 29, ex + 49, ey + 29, resp ? hex('#f8d8d8') : C.blanco); linea(ex - 49, ey - 29, ex, ey + 4, C.k); linea(ex + 49, ey - 29, ex, ey + 4, C.k);
    const n = resp ? 5 : Math.round((o.escribe ?? 1) * 5); for (let k = 0; k < n; k++) rect(ex - 40, ey + 8 + k * 4, ex + 40 - (k * 13) % 30, ey + 9 + k * 4, resp ? C.rojo : hex('#5a6a8a'));
    if (resp) { disco(ex + 44, ey - 26, 9, C.k); disco(ex + 44, ey - 26, 8, C.rojo); R.icono('!', ex + 43, ey - 31, C.blanco, C.rojoS); } }
  if (env > 0 && env < 1) for (let k = 1; k < 6; k++) pset(ex - k * 10, ey + k * 3, hex('#8a9aa8'));
}
// la calle de Palo Alto: casas bajas de estilo californiano con sus tejados, robles, coches aparcados, la acera y la
// calzada; o.noche: farolas encendidas y ventanas con luz
export function calle(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, hor = 96;
  cielo(R, t, { hor, aves: !o.noche, noche: o.noche, tarde: o.tarde });
  for (let k = 0; k < 4; k++) { const x = -10 + k * 86, c = [hex('#e8d8b8'), hex('#c8d8e0'), hex('#f0e0c8'), hex('#d8c8d8')][k];
    poligono([[x - 4, 70], [x + 36, 52], [x + 76, 70]], C.k); poligono([[x - 2, 69], [x + 36, 54], [x + 74, 69]], C.tejaS); rect(x, 70, x + 72, 108, C.k); rect(x + 1, 71, x + 71, 107, c);
    for (const wx of [x + 8, x + 48]) { rect(wx, 78, wx + 16, 92, C.k); rect(wx + 1, 79, wx + 15, 91, o.noche ? (k % 2 ? hex('#f0d080') : hex('#3a3a5a')) : C.cristal); rect(wx + 8, 79, wx + 8, 91, C.k); }
    rect(x + 30, 84, x + 42, 108, C.k); rect(x + 31, 85, x + 41, 107, C.maderaL); pset(x + 39, 96, C.oro); }
  for (const x of [80, 250]) arbol(R, x, 112, t, { tipo: 'verde', s: 2 });
  rect(0, 108, 319, 116, C.hierba); rect(0, 116, 319, 124, C.acera); for (let x = 0; x < 320; x += 16) rect(x, 116, x, 124, C.aceraS); rect(0, 124, 319, 179, C.asfalto); for (let x = 0; x < 320; x += 32) rect(x + Math.round(0), 150, x + 16, 151, C.linea);
  if (o.noche) for (const x of [40, 200]) { rect(x, 70, x + 2, 124, C.metalD); rect(x - 4, 68, x + 6, 70, C.metalD); for (let y = 70; y < 124; y++) for (let xx = x - (y - 70) / 3; xx < x + 2 + (y - 70) / 3; xx++) if ((Math.round(xx) + y) % 3 === 0) pset(Math.round(xx), y, hex('#5a5a48')); }
  cocheAparcado(R, 120, 136, hex('#c8c8d0')); cocheAparcado(R, 272, 136, hex('#8a3a3a'));
}
function cocheAparcado(R, x, suelo, c) { R.rect(x - 20, suelo - 9, x + 20, suelo - 2, C.k); R.rect(x - 19, suelo - 8, x + 19, suelo - 3, c); R.rect(x - 12, suelo - 15, x + 10, suelo - 8, C.k); R.rect(x - 11, suelo - 14, x + 9, suelo - 9, C.cristal); for (const dx of [-12, 12]) { R.disco(x + dx, suelo - 1, 4, C.k); R.disco(x + dx, suelo - 1, 2, C.metal); } }
// el coche oscuro que sigue a alguien: berlina negra con lunas tintadas (x: centro, suelo); o.dir: hacia dónde va
export function cocheOscuro(R, x, suelo, t, o = {}) {
  const { rect, disco, pset } = R, d = o.dir ?? 1, f = (u) => Math.round(x + u * d), r = (a, b, y0, y1, c) => rect(Math.min(f(a), f(b)), y0, Math.max(f(a), f(b)), y1, c);
  r(-30, 30, suelo - 12, suelo - 2, C.k); r(-29, 29, suelo - 11, suelo - 3, hex('#22242c')); r(-16, 14, suelo - 20, suelo - 11, C.k); r(-15, 13, suelo - 19, suelo - 12, hex('#3a4050')); r(-1, 0, suelo - 19, suelo - 12, C.k);
  r(26, 29, suelo - 9, suelo - 7, C.amarillo); r(-29, -27, suelo - 9, suelo - 7, C.rojo); r(-29, 29, suelo - 6, suelo - 6, hex('#3a3c46'));
  for (const u of [-18, 18]) { disco(f(u), suelo - 1, 5, C.k); disco(f(u), suelo - 1, 2, C.metal); pset(f(u) + Math.round(Math.cos(t * 12) * 2), suelo - 1 + Math.round(Math.sin(t * 12) * 2), C.k); }
}

// ── G · la redacción, la rotativa y la televisión ────────────────────────────────────────────────────────────────
// La redacción del periódico en Nueva York: ventanales con los rascacielos, tres relojes de pared con distintas horas,
// las teles colgadas con gráficos de bolsa que se mueven, filas de mesas con pantallas y pilas de papeles; la mesa del
// periodista va por delante: redaccionMesa()
export function redaccion(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#d8d4cc')); rect(0, 0, 319, 8, hex('#b8b4ac'));
  rect(0, 16, 319, 76, C.k); rect(0, 18, 319, 74, o.noche ? C.noche2 : C.cielo3);
  for (let k = 0; k < 18; k++) { const x = k * 18 + Math.round(h(k, 1, 53) * 6), hh = 20 + Math.round(h(k, 2, 53) * 40); rect(x, 74 - hh, x + 14, 74, k % 2 ? hex('#8a94a8') : hex('#a4acbc')); for (let y = 78 - hh; y < 72; y += 4) for (let i = 2; i < 13; i += 3) if (h(k * 7 + i, y, 54) < (o.noche ? 0.5 : 0.25)) pset(x + i, y, o.noche ? C.oroL : hex('#c8d4e4')); }
  rect(140, 22, 144, 74, hex('#7a849a')); poligono([[138, 22], [142, 10], [146, 22]], hex('#7a849a'));
  for (let x = 0; x < 320; x += 64) rect(x, 18, x + 2, 74, C.k);
  // los tres relojes de pared (Nueva York, Londres, Tokio)
  for (const [x, hr] of [[40, 10], [74, 15], [108, 0]]) { disco(x, 90, 9, C.k); disco(x, 90, 8, C.blanco); const a = ((hr % 12) / 12 + t / 7200) * Math.PI * 2 - Math.PI / 2, m = (t / 60) * Math.PI * 2 - Math.PI / 2; linea(x, 90, Math.round(x + Math.cos(a) * 4), Math.round(90 + Math.sin(a) * 4), C.k); linea(x, 90, Math.round(x + Math.cos(m) * 6), Math.round(90 + Math.sin(m) * 6), C.k); }
  // las teles con gráficos de bolsa
  for (const x of [180, 248]) { rect(x, 80, x + 52, 108, C.k); rect(x + 2, 82, x + 50, 106, hex('#0e1a2a')); let y = 96; for (let i = 0; i < 46; i++) { y += Math.round(Math.sin(i * 0.8 + t * 2 + x) * 1.5); y = Math.max(84, Math.min(104, y)); pset(x + 3 + i, y, i % 9 < 5 ? C.verdeL : C.rojo); } rect(x + 24, 108, x + 28, 112, C.k); }
  // filas de mesas con pantallas, al fondo
  rect(0, 116, 319, 179, hex('#7a7e8a')); for (let y = 120; y < 180; y += 6) for (let x = 0; x < 320; x += 10) pset(x + (y % 12), y, hex('#6e7280'));
  for (let k = 0; k < 6; k++) { const x = 6 + k * 54; rect(x, 118, x + 44, 122, C.k); rect(x + 1, 119, x + 43, 121, hex('#e8e4dc')); rect(x + 12, 108, x + 28, 118, C.k); rect(x + 13, 109, x + 27, 117, hex('#3a5a8a')); for (let p = 0; p < 3; p++) rect(x + 32, 116 - p * 2, x + 42, 117 - p * 2, C.papel); }
}
// la mesa del periodista por delante de él: libreta en la que se van llenando líneas (o.notas 0–1), el teléfono negro
// que suena (o.suena) y el teléfono rojo de los abogados (o.abogados: suena y tiembla, con la balanza encima; o.tapa 0–1:
// el periodista le echa encima una pila de periódicos y sigue dando saltitos debajo)
export function redaccionMesa(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(40, 148, 300, 154, C.k); rect(41, 149, 299, 153, hex('#e8e4dc')); rect(46, 154, 294, 179, hex('#5a5e6a')); rect(48, 156, 292, 179, hex('#6a6e7a'));
  rect(190, 128, 226, 148, C.k); rect(191, 129, 225, 147, hex('#2a3a5a')); for (let k = 0; k < 4; k++) rect(194, 132 + k * 4, 194 + Math.round(10 + h(k, 1, 55) * 20), 133 + k * 4, hex('#8ab0d8')); rect(206, 148, 210, 149, C.k);
  rect(70, 142, 100, 148, C.k); rect(71, 143, 99, 147, C.papel); const n = Math.round((o.notas ?? 0) * 4); for (let k = 0; k < n; k++) rect(74, 144 + k, 74 + 8 + (k * 7) % 14, 144 + k, hex('#3a3a6a'));
  const v1 = (o.suena ? Math.round(Math.sin(t * 50) * 1) : 0) + 50; rect(110 + v1, 140, 132 + v1, 148, C.k); rect(111 + v1, 141, 131 + v1, 147, hex('#2a2430')); rect(108 + v1, 137 - Math.round((o.cuelga ?? 0) * 20), 134 + v1, 140 - Math.round((o.cuelga ?? 0) * 20), C.k);
  if (o.suena && Math.floor(t * 4) % 2) for (const dx of [-6, 30]) linea(160 + dx, 132, 160 + dx + (dx < 0 ? -4 : 4), 128, C.k);
  if (o.abogados) { const tp = o.tapa ?? 0, sa = Math.round(Math.abs(Math.sin(t * (tp > 0.9 ? 9 : 25))) * (tp > 0.9 ? 3 : 2)), x = 262, y = 148 - sa;
    rect(x - 12, y - 8, x + 12, y, C.k); rect(x - 11, y - 7, x + 11, y - 1, C.rojo); rect(x - 14, y - 11, x + 14, y - 8, C.k); rect(x - 13, y - 10, x + 13, y - 9, C.rojoS);
    if (tp < 0.9 && Math.floor(t * 4) % 2) { R.icono('balanza', x - 3, y - 22, C.oro, C.k, 1); linea(x - 18, y - 12, x - 22, y - 16, C.k); linea(x + 18, y - 12, x + 22, y - 16, C.k); }
    if (tp > 0) { const yy = Math.round(lerp(100, y - 12, Math.min(1, tp))); for (let k = 0; k < 5; k++) { rect(x - 18 + (k % 2), yy - k * 3, x + 18 - (k % 2), yy - k * 3 + 2, C.k); rect(x - 17 + (k % 2), yy - k * 3, x + 17 - (k % 2), yy - k * 3 + 1, hex('#ece4d0')); } } }
}
// la rotativa: rodillos enormes que giran, la banda de papel que serpentea entre ellos y la cinta por la que salen los
// periódicos doblados, que se apilan; en cada portada, la gota y la caja con «?»
export function rotativa(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#3a3e48')); for (let x = 0; x < 320; x += 40) rect(x, 0, x + 1, 179, hex('#34383f')); for (let k = 0; k < 4; k++) rect(20 + k * 80, 2, 60 + k * 80, 4, hex('#f0e8c0'));
  rect(10, 26, 220, 132, C.k); rect(12, 28, 218, 130, hex('#5a6270')); for (let x = 16; x < 218; x += 30) rect(x, 30, x + 1, 128, hex('#4a5260'));
  const rod = [[40, 50], [90, 80], [140, 50], [190, 80], [40, 110], [140, 110]]; for (let i = 0; i < rod.length - 1; i++) { const [a, b] = rod[i], [c, d] = rod[i + 1]; linea(a, b + 12, c, d - 12, hex('#f4f0e4')); linea(a + 1, b + 12, c + 1, d - 12, hex('#f4f0e4')); }
  for (const [x, y] of rod) { disco(x, y, 13, C.k); disco(x, y, 12, C.metal); disco(x, y, 4, C.metalD); for (let k = 0; k < 4; k++) { const a = t * 6 + k * Math.PI / 2; linea(x, y, Math.round(x + Math.cos(a) * 10), Math.round(y + Math.sin(a) * 10), C.metalS); } }
  for (const [x, c] of [[64, hex('#2a8ad8')], [114, hex('#d82a8a')], [164, hex('#e8d82a')]]) { rect(x, 12, x + 14, 26, C.k); rect(x + 1, 13, x + 13, 25, c); }   // los depósitos de tinta
  // la cinta y los periódicos que salen y se apilan
  rect(200, 134, 319, 140, C.k); rect(200, 135, 319, 139, C.metalS); for (let x = 200; x < 320; x += 8) pset(x + Math.round(t * 20) % 8, 137, C.metalD);
  for (let k = 0; k < 6; k++) { const x = 206 + ((k * 22 + Math.round(t * 30)) % 110), y = 134; if (x > 290) continue; rect(x, y - 6, x + 16, y, C.k); rect(x + 1, y - 5, x + 15, y - 1, hex('#ece4d0')); disco(x + 5, y - 3, 1, C.sangre); rect(x + 9, y - 4, x + 13, y - 2, C.k); }
  const pila = Math.min(14, Math.floor((o.u ?? 1) * 14)); for (let k = 0; k < pila; k++) { rect(292, 170 - k * 3, 318, 172 - k * 3, C.k); rect(293, 170 - k * 3, 317, 171 - k * 3, hex('#ece4d0')); }
  rect(0, 140, 319, 179, hex('#2a2e36')); for (let y = 146; y < 180; y += 6) rect(0, y, 319, y, hex('#24282f'));
}
// la portada del periódico en las manos: cabecera en trazos góticos (sin letras), el titular en barras gruesas, el dibujo
// de la caja Edison con «?» y la gota de sangre, y columnas de texto en gris; o.abre (0–1) la despliega
export function portada(R, t, o = {}) {
  const { rect, pset, disco } = R, a = o.abre ?? 1;
  rect(0, 0, 319, 179, hex('#5a5e68')); for (let k = 0; k < 8; k++) { const cx = 20 + k * 42, cy = 30 + (k % 3) * 40; for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) if (i * i + j * j < 64 && (i + j) % 2) pset(cx + i, cy + j, hex('#6a6e7a')); }
  const x0 = 64, x1 = 256, y0 = 20, y1 = Math.round(20 + 150 * a); rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, C.k); rect(x0, y0, x1, y1, hex('#f2eee4'));
  const ve = (yy) => yy < y1 - 2;
  if (ve(44)) { for (let k = 0, x = x0 + 22; x < x1 - 22; k++, x += 7) { const alto = 8 + Math.round(h(k, 1, 56) * 6), yb = y0 + 19; rect(x, yb - alto, x + 2, yb, C.k); pset(x - 1, yb - alto, C.k); pset(x + 3, yb - alto + 1, C.k); } rect(x0 + 6, y0 + 23, x1 - 6, y0 + 23, C.k); rect(x0 + 6, y0 + 25, x1 - 6, y0 + 25, C.k); }
  if (ve(70)) { rect(x0 + 10, y0 + 32, x1 - 10, y0 + 38, C.k); rect(x0 + 10, y0 + 42, x1 - 60, y0 + 48, C.k); }
  if (ve(140)) { const fx = x0 + 10, fy = y0 + 56; rect(fx, fy, fx + 100, fy + 66, hex('#e4e0d4')); edison(R, fx + 50, fy + 56, t, { s: 0.8 }); R.icono('?', fx + 82, fy + 6, C.k, hex('#e4e0d4'), 2); disco(fx + 14, fy + 14, 6, C.k); disco(fx + 14, fy + 14, 5, C.sangre);
    for (let k = 0; k < 10; k++) rect(fx + 108, fy + 2 + k * 6, x1 - 10 - (k % 3) * 6, fy + 3 + k * 6, hex('#9a968a')); }
  if (ve(168)) for (let k = 0; k < 3; k++) rect(x0 + 10, y0 + 128 + k * 6, x1 - 10 - k * 20, y0 + 129 + k * 6, hex('#9a968a'));
  mano(R, x0 + 4, Math.round(y0 + 30 + 60 * a), 1, '#a8c8e8'); mano(R, x1 - 4, Math.round(y0 + 30 + 60 * a), -1, '#a8c8e8');
}
// el plató de televisión: fondo azul con la silueta de una ciudad y luces, dos sillas y una mesita, la pantalla con el
// logotipo, los focos del techo y dos cámaras en primer plano con su luz roja de grabación (van por delante: platoCamaras)
export function plato(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#141a30')); for (let k = 0; k < 6; k++) { const x = 20 + k * 56; linea(x, 0, x, 10, C.metalD); poligono([[x - 6, 10], [x + 6, 10], [x + 4, 18], [x - 4, 18]], C.k); disco(x, 18, 2, C.oroL); }
  rect(30, 30, 290, 120, hex('#1e3a7a')); for (let k = 0; k < 14; k++) { const x = 34 + k * 18, hh = 16 + Math.round(h(k, 1, 57) * 30); rect(x, 120 - hh, x + 14, 120, hex('#2a4a8a')); for (let y = 124 - hh; y < 118; y += 4) if (h(k, y, 58) < 0.4) pset(x + 4 + (y % 6), y, hex('#8ab0f0')); }
  rect(190, 40, 270, 90, C.k); rect(192, 42, 268, 88, hex('#e8f4f4')); logoTheranos(R, 230, 65, 1.2, t);
  rect(0, 120, 319, 179, hex('#2a3046')); poligono([[50, 140], [270, 140], [300, 179], [20, 179]], hex('#3a4462')); for (let y = 144; y < 179; y += 6) rect(40, y, 280, y, hex('#344060'));
  for (const x of [110, 190]) { rect(x - 10, 122, x + 10, 136, C.k); rect(x - 9, 123, x + 9, 135, hex('#c8c8d4')); rect(x - 2, 136, x + 2, 146, C.metalD); }
  rect(140, 132, 160, 136, C.k); rect(141, 133, 159, 135, C.blanco); rect(148, 136, 152, 146, C.metalD); rect(144, 128, 147, 132, hex('#c8e8f8'));
}
export function platoCamaras(R, t) {
  const { rect, disco, linea } = R;
  for (const [x, d] of [[40, 1], [282, -1]]) { linea(x - 10, 179, x, 150, C.k); linea(x + 10, 179, x, 150, C.k); linea(x, 179, x, 150, C.k); rect(x - 16, 130, x + 16, 150, C.k); rect(x - 15, 131, x + 15, 149, hex('#3a3e48')); rect(x + 15 * d, 134, x + 24 * d, 146, C.k); disco(x + 24 * d, 140, 5, C.k); disco(x + 24 * d, 140, 3, hex('#4a6a9a')); disco(x - 10 * d, 134, 2, Math.floor(t * 2) % 2 ? C.rojo : C.rojoS); }
}

// ── H · hoy: el tribunal, la prisión, el cine, la charla y el laboratorio de hoy ────────────────────────────────────
// La sala del tribunal federal de San José: paneles de madera clara, el sello redondo en la pared, las dos banderas, el
// estrado alto del juez, el banco de los testigos, la tribuna del jurado con doce bustos a la derecha (atentos,
// parpadean) y el público. Las mesas de las partes van por delante: tribunalDelante()
export function tribunal(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#c8a878')); for (let x = 0; x < 320; x += 20) { rect(x, 0, x, 110, hex('#b8986a')); } rect(0, 0, 319, 8, hex('#a8885a'));
  disco(160, 30, 15, C.k); disco(160, 30, 14, C.oro); disco(160, 30, 11, hex('#2a3a7a')); R.icono('balanza', 157, 26, C.oroL, C.k, 1); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(160 + Math.cos(a) * 12.5), Math.round(30 + Math.sin(a) * 12.5), C.oroL); }
  for (const bx of [110, 202]) { rect(bx, 20, bx + 1, 96, C.oro); disco(bx, 19, 2, C.oro); for (let j = 0; j < 12; j++) for (let i = 0; i < 16; i++) pset(bx + 2 + i, 22 + j + Math.round(Math.sin(t * 1.5 + i * 0.4)), bx < 160 ? (j < 6 && i < 7 ? ((i + j) % 2 ? hex('#2a3a8a') : C.blanco) : j % 2 ? C.blanco : C.rojo) : hex('#3a5a9a')); }
  if (o.detras) o.detras(R, t);   // el juez, que solo asoma por encima del estrado
  // el estrado del juez
  rect(118, 60, 202, 100, C.k); rect(119, 61, 201, 99, C.madera); rect(119, 61, 201, 64, C.maderaL); for (let x = 126; x < 200; x += 18) rect(x, 68, x + 12, 94, C.maderaS);
  // la tribuna del jurado con doce bustos
  rect(220, 70, 319, 120, C.k); rect(221, 71, 319, 119, C.maderaS); const tipos = ['rizos', 'calvo', 'mujer', 'rizos', 'mujer', 'calvo'];
  for (let k = 0; k < 12; k++) { const x = 226 + (k % 6) * 15, y = 74 + Math.floor(k / 6) * 20; R.busto(tipos[(k + 2) % 6], tela(['#4a6aa8', '#a84a4a', '#5a8a5a', '#8a6a4a', '#6a4a8a', '#c8a050'][k % 6], '#3a3a4a'), x, y, t); if (k < 6) rect(222, 87, 319, 92, C.madera); }
  rect(220, 108, 319, 120, C.madera); rect(220, 108, 319, 109, C.maderaL);
  // el banco de testigos y el suelo
  rect(80, 84, 116, 110, C.k); rect(81, 85, 115, 109, C.madera); rect(81, 85, 115, 87, C.maderaL);
  rect(0, 110, 319, 179, hex('#5a4a6a')); for (let y = 114; y < 180; y += 6) for (let x = 0; x < 320; x += 12) pset(x + (y % 12), y, hex('#4e405e'));
  // el público a la izquierda, en bancos
  for (let k = 0; k < 6; k++) { const x = 4 + (k % 3) * 22, y = 86 + Math.floor(k / 3) * 14; R.busto(tipos[k], tela(['#8a8a9a', '#4a5a7a', '#7a5a4a'][k % 3], '#3a3a4a'), x, y, t); } rect(0, 98, 74, 102, C.madera); rect(0, 112, 74, 116, C.madera);
}
export function tribunalDelante(R, t) {
  const { rect } = R; for (const [a, b] of [[40, 130], [180, 270]]) { rect(a, 148, b, 152, C.k); rect(a + 1, 149, b - 1, 151, C.maderaL); rect(a + 4, 152, b - 4, 179, C.madera); rect(a + 4, 152, b - 4, 153, C.maderaS); for (let k = 0; k < 3; k++) rect(a + 14 + k * 26, 144, a + 30 + k * 26, 148, k % 2 ? hex('#e8e4dc') : C.ocre); }
  rect(0, 172, 319, 179, C.maderaS); for (let x = 0; x < 320; x += 12) rect(x, 166, x + 2, 172, C.maderaS); rect(0, 165, 319, 166, C.madera);   // la barandilla
}
// el mazo de cerca: el bloque redondo y el mazo que sube y golpea (o.golpe: segundos del golpe; antes sube despacio)
export function mazo(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#3a2a20')); for (let y = 0; y < 180; y += 3) for (let x = 0; x < 320; x++) if (h(x >> 3, y, 59) < 0.07) pset(x, y, hex('#4a3426'));
  rect(0, 126, 319, 179, C.madera); rect(0, 126, 319, 128, C.maderaL); for (let y = 134; y < 180; y += 7) rect(0, y, 319, y, C.maderaS);
  for (let j = -6; j <= 6; j++) for (let i = -40; i <= 40; i++) if ((i / 40) ** 2 + (j / 6) ** 2 < 1) pset(160 + i, 124 + j, j < 0 ? C.maderaL : C.maderaS); rect(122, 124, 198, 132, C.k); rect(123, 124, 197, 131, C.madera);
  const g = o.golpe ?? 1e9, d = t - g, ang = d < -1.2 ? 0.2 : d < 0 ? lerp(0.2, -0.9, (d + 1.2) / 1.2) : d < 0.08 ? lerp(-0.9, 0.3, d / 0.08) : 0.3 - Math.min(0.3, (d - 0.08) * 0.6);
  const px = 230, py = 100, ca = Math.cos(ang), sa = Math.sin(ang), q = (u, v) => [Math.round(px + u * ca - v * sa), Math.round(py + u * sa + v * ca)];
  poligono([q(-4, 0), q(4, 0), q(4, 70), q(-4, 70)], C.k); poligono([q(-3, 0), q(3, 0), q(3, 69), q(-3, 69)], C.maderaL);
  const hx = q(0, -4); poligono([q(-26, -16), q(26, -16), q(26, 8), q(-26, 8)], C.k); poligono([q(-25, -15), q(25, -15), q(25, 7), q(-25, 7)], C.madera); poligono([q(-20, -15), q(-16, -15), q(-16, 7), q(-20, 7)], C.oro); poligono([q(16, -15), q(20, -15), q(20, 7), q(16, 7)], C.oro);
  if (d >= 0.04 && d < 0.4) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI - Math.PI, r = 30 + (d - 0.04) * 80; linea(Math.round(166 + Math.cos(a) * r * 0.6), Math.round(118 + Math.sin(a) * r * 0.4), Math.round(166 + Math.cos(a) * (r + 8) * 0.6), Math.round(118 + Math.sin(a) * (r + 8) * 0.4), C.oroL); }
}
// el veredicto en dos columnas, sobre la pizarra de la sala: a la izquierda los inversores (la bolsa de dinero) y a la
// derecha los pacientes (la gota); debajo de cada una, los cargos por los que la condenan; o.u (0–1) va llenando
export function veredicto(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, u = o.u ?? 1;
  rect(0, 0, 319, 179, hex('#2a3a34')); for (let y = 0; y < 180; y += 2) for (let x = 0; x < 320; x++) if (h(x >> 1, y, 60) < 0.05) pset(x, y, hex('#344640'));
  rect(0, 0, 319, 4, C.madera); rect(0, 172, 319, 179, C.madera); rect(158, 20, 160, 160, hex('#c8d4cc'));
  disco(80, 52, 16, C.k); disco(80, 52, 15, hex('#c8a860')); poligono([[72, 36], [88, 36], [84, 30], [76, 30]], C.k); poligono([[74, 35], [86, 35], [83, 31], [77, 31]], hex('#c8a860')); rect(74, 36, 86, 38, C.k); R.numero('$', 81, 60, { tam: 16, centro: true }); R.icono('gota', 226, 34, C.sangreL, C.k, 4);
  const marcas = [[80, 4, true], [240, 4, false]]; for (const [cx, n, culpa] of marcas) for (let k = 0; k < n; k++) { const vis = u * 8 > k + (culpa ? 0 : 4); if (!vis) continue; const x = cx - 36 + k * 20, y = 110;
    if (culpa) { R.icono('X', x, y, C.rojo, C.k, 3); } else { disco(x + 7, y + 7, 7, hex('#c8d4cc')); disco(x + 7, y + 7, 5, hex('#2a3a34')); } }
  if (u > 0.9) { R.numero('4', 80, 160, { tam: 16, centro: true }); R.numero('0', 240, 160, { tam: 16, centro: true }); }
}
// las dos condenas como barras de calendario, en meses: Holmes 135, Balwani 155 (o.u 0–1 las hace crecer); los dos
// personajes pequeños delante de cada barra los pone la escena
export function condenas(R, t, o = {}) {
  const { rect, pset } = R, u = o.u ?? 1;
  rect(0, 0, 319, 179, hex('#2a2e3a')); for (let y = 0; y < 180; y += 4) rect(0, y, 319, y, hex('#262a36'));
  for (const [y, meses, c] of [[60, 135, hex('#e8c040')], [116, 155, hex('#c84a4a')]]) { const w = Math.round(meses * 1.2 * Math.min(1, u)); rect(66, y, 66 + w, y + 22, C.k); rect(67, y + 1, 65 + w, y + 21, c); for (let m = 12; m < meses * Math.min(1, u); m += 12) rect(66 + Math.round(m * 1.2), y + 1, 66 + Math.round(m * 1.2), y + 21, C.k);
    if (u > 0.95) R.numero(String(meses), 76 + w, y + 18, { tam: 16 }); }
  for (const y of [60, 116]) { rect(40, y + 2, 58, y + 20, C.k); rect(41, y + 3, 57, y + 19, C.blanco); rect(41, y + 3, 57, y + 7, C.rojo); for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) pset(44 + i * 4, y + 10 + j * 3, C.k); }
}
// el campo federal de Texas al amanecer: cielo que se aclara, llanura con hierba seca, edificios bajos de ladrillo
// claro, el mástil con la bandera, el depósito de agua, la entrada con su barrera y un tramo de valla; un coche llega
// (o.coche 0–1); o.carta (0–1): un sobre sale volando hacia el cielo como un pájaro
export function prision(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, hor = 104;
  for (let y = 0; y < hor; y++) rect(0, y, 319, y, y < 30 ? C.tarde1 : y < 60 ? C.tarde2 : y < 88 ? C.tarde3 : C.tarde4);
  disco(60, hor - 2, 12, C.solL); disco(60, hor - 2, 9, C.sol); for (let k = 0; k < 3; k++) rect(10 + k * 90, 40 + k * 8, 50 + k * 90, 42 + k * 8, hex('#d8708a'));
  bandada(R, t, { x: 120, y: 40 });
  rect(0, hor, 319, 179, hex('#b8a870')); for (let k = 0; k < 120; k++) pset(Math.round(h(k, 1, 61) * 320), hor + 2 + Math.round(h(k, 2, 61) * 74), hex('#a08850'));
  rect(250, 48, 252, hor, C.metalD); disco(251, 46, 9, C.k); disco(251, 46, 8, C.metalL); rect(244, 52, 258, 54, C.metalD);   // el depósito de agua
  for (const [x0, x1, y0] of [[110, 200, 80], [196, 240, 86], [70, 112, 88]]) { rect(x0, y0, x1, hor + 8, C.k); rect(x0 + 1, y0 + 1, x1 - 1, hor + 8, hex('#d8c8a8')); rect(x0, y0 - 2, x1, y0, hex('#8a7a6a')); for (let x = x0 + 6; x < x1 - 6; x += 10) { rect(x, y0 + 8, x + 5, y0 + 13, C.k); pset(x + 2, y0 + 10, h(x, y0, 62) < 0.4 ? C.oroL : hex('#4a4a5a')); } }
  rect(220, 56, 221, 112, C.metalL); for (let j = 0; j < 10; j++) for (let i = 0; i < 14; i++) pset(222 + i, 57 + j + Math.round(Math.sin(t * 2 + i * 0.4)), j < 5 && i < 6 ? ((i + j) % 2 ? hex('#2a3a8a') : C.blanco) : j % 2 ? C.blanco : C.rojo);
  rect(0, 118, 319, 124, hex('#a8a090')); poligono([[140, 179], [180, 179], [166, 124], [156, 124]], hex('#8a8478'));
  for (let x = 0; x < 120; x += 3) { rect(x, 106, x, 118, hex('#9a9aa8')); } for (let y = 106; y < 118; y += 3) rect(0, y, 120, y, hex('#9a9aa8')); rect(0, 104, 120, 105, C.metalD);
  rect(184, 112, 186, 124, C.metalD); rect(186, 113, 222, 114, C.blanco); for (let x = 190; x < 222; x += 8) rect(x, 113, x + 3, 114, C.rojo);
  const c = o.coche ?? -1; if (c >= 0) cocheOscuro(R, Math.round(lerp(-40, 150, Math.min(1, c))), 150 - Math.round(Math.min(1, c) * 10), t, { dir: 1 });
  const ca = o.carta ?? 0; if (ca > 0) { const x = Math.round(lerp(150, 330, ca)), y = Math.round(lerp(96, 20, ca) + Math.sin(ca * 18) * 4); rect(x - 6, y - 4, x + 6, y + 4, C.k); rect(x - 5, y - 3, x + 5, y + 3, C.blanco); linea(x - 5, y - 3, x, y, C.k); linea(x + 5, y - 3, x, y, C.k); const al = Math.floor(t * 8) % 2; linea(x - 6, y - 4, x - 12, y - 8 + al * 6, C.blanco); linea(x + 6, y - 4, x + 12, y - 8 + al * 6, C.blanco); }
}
// el cine por fuera, al anochecer: la marquesina con bombillas que corren, el cartel con la silueta del jersey negro, la
// gota y la cámara, la taquilla con su luz y la acera (la cola de gente la pone la escena; los coches, por delante)
export function cine(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  cielo(R, t, { hor: 70, tarde: true, aves: false });
  rect(0, 30, 319, 70, hex('#3a3046')); for (let k = 0; k < 12; k++) { const x = k * 28; rect(x, 40 - (k % 3) * 6, x + 22, 70, hex('#2e2638')); for (let y = 46 - (k % 3) * 6; y < 68; y += 5) if (h(k, y, 63) < 0.5) pset(x + 6 + (y % 9), y, C.oroL); }
  rect(40, 50, 280, 132, C.k); rect(42, 52, 278, 132, hex('#8a2a3a')); for (let y = 56; y < 130; y += 6) rect(42, y, 278, y, hex('#7a2232'));
  rect(30, 40, 290, 62, C.k); rect(32, 42, 288, 60, hex('#f0e0b0')); for (let k = 0; k < 64; k++) { const on = (k + Math.floor(t * 8)) % 4 === 0, x = 34 + (k % 32) * 8, y = k < 32 ? 44 : 58; disco(x, y, 1, on ? C.oroL : hex('#a88840')); }
  for (let k = 0; k < 3; k++) rect(70 + k * 70, 47, 110 + k * 70, 54, hex('#1e1e28'));   // los «letreros» de la marquesina, en barras
  // el cartel de la película: la silueta, la gota y la cámara
  const cx = 82; rect(cx - 22, 70, cx + 22, 126, C.k); rect(cx - 20, 72, cx + 20, 124, hex('#141822')); disco(cx, 92, 9, hex('#d8b860')); disco(cx, 90, 7, hex('#e8c8a0')); R.poligono([[cx - 16, 124], [cx - 12, 104], [cx + 12, 104], [cx + 16, 124]], hex('#2a2a36')); rect(cx - 4, 98, cx + 4, 106, hex('#2a2a36'));
  disco(cx + 12, 78, 3, C.sangre); R.icono('camara', cx - 18, 76, C.blanco, C.k, 1);
  // las puertas de cristal con la luz de dentro y la taquilla
  for (const x of [140, 176]) { rect(x, 74, x + 30, 132, C.k); rect(x + 1, 75, x + 29, 132, hex('#f8d890')); rect(x + 14, 75, x + 15, 132, C.k); disco(x + 10, 104, 1, C.oro); disco(x + 19, 104, 1, C.oro); }
  rect(226, 80, 266, 120, C.k); rect(228, 82, 264, 106, hex('#f8e8b0')); disco(246, 94, 4, hex('#e8c8a0')); rect(242, 98, 250, 106, C.rojo); rect(226, 106, 266, 120, hex('#6a1a2a'));
  rect(0, 132, 319, 150, C.acera); for (let x = 0; x < 320; x += 20) rect(x, 132, x, 150, C.aceraS); rect(0, 150, 319, 179, C.asfalto); for (let x = 0; x < 320; x += 32) rect(x, 165, x + 16, 166, C.linea);
}
// la sala del cine por dentro: la pantalla con la película (una figura diminuta que camina por un pasillo y una cámara
// que la sigue), el haz del proyector con motas, y las cabezas del público en filas, de espaldas
export function salaCine(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#141018')); rect(30, 14, 290, 112, C.k); rect(32, 16, 288, 110, hex('#d8dce4'));
  rect(32, 16, 288, 70, hex('#c8ccd8')); for (let k = 0; k < 6; k++) rect(40 + k * 44, 30, 64 + k * 44, 70, hex('#b8bcc8'));
  const fx = Math.round(60 + ((t * 14) % 200)); rect(32, 96, 288, 110, hex('#a8acb8'));
  R.actor(ELENCO_CHIBI.holmes, fx, 100, t, { dir: 1, anda: true }); R.actor(ELENCO_CHIBI.sudadera, fx - 30, 100, t, { dir: 1, anda: true }); rect(fx - 22, 76, fx - 10, 84, C.k); rect(fx - 21, 77, fx - 11, 83, hex('#3a3e48')); rect(fx - 10, 78, fx - 6, 82, C.k); disco(fx - 18, 76, 1, C.rojo);   // el cámara que la sigue, con la cámara al hombro
  for (let y = 0; y < 16; y++) for (let x = 140; x < 180; x++) if ((x + y * 2) % 7 === 0) pset(x, y, hex('#3a3440'));
  for (let k = 0; k < 14; k++) { const x = Math.round(150 + h(k, 1, 64) * 20 + Math.sin(t + k) * 3), y = Math.round(20 + ((h(k, 2, 64) * 90 + t * 4) % 90)); pset(x, y, hex('#e8e0c0')); }
  for (let fila = 0; fila < 3; fila++) for (let k = 0; k < 12; k++) { const x = 6 + k * 27 + (fila % 2) * 12, y = 130 + fila * 18; disco(x, y, 8, C.k); disco(x, y - 1, 7, [hex('#2a2430'), hex('#3a2a20'), hex('#4a3a2a'), hex('#1e1a24')][(k + fila) % 4]); rect(x - 11, y + 6, x + 11, y + 18, hex('#1a141e')); }
  rect(0, 170, 319, 179, hex('#2a0a14'));
}
// la charla de Erika: el escenario con la pantalla (la balanza y luego «?» → «✓» con o.visto), el atril, focos y el
// público de espaldas en primer plano
export function charla(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#1a1e2e')); for (let k = 0; k < 5; k++) { const x = 30 + k * 64; disco(x, 6, 3, C.oroL); for (let y = 8; y < 100; y++) for (let xx = x - (y - 8) / 4; xx < x + (y - 8) / 4; xx++) if ((Math.round(xx) + y) % 5 === 0) pset(Math.round(xx), y, hex('#2a2e40')); }
  rect(80, 16, 240, 92, C.k); rect(82, 18, 238, 90, hex('#f4f6f8')); if (o.visto) { R.icono('?', 120, 36, C.k, hex('#f4f6f8'), 4); linea(150, 54, 170, 54, C.k); poligono([[170, 50], [176, 54], [170, 58]], C.k); visto(R, 186, 40, 3); } else R.icono('balanza', 146, 36, hex('#3a5a8a'), C.k, 4);
  rect(0, 100, 319, 112, hex('#5a3a2a')); rect(0, 100, 319, 101, hex('#7a5a3a')); rect(220, 80, 236, 104, C.k); rect(221, 81, 235, 103, hex('#3a3a4a')); disco(228, 80, 2, C.k);
  for (let fila = 0; fila < 3; fila++) for (let k = 0; k < 13; k++) { const x = 4 + k * 25 + (fila % 2) * 12, y = 134 + fila * 16; disco(x, y, 8, C.k); disco(x, y - 1, 7, [hex('#3a2a20'), hex('#6a4a2a'), hex('#1e1a24'), hex('#c8a060')][(k * 3 + fila) % 4]); rect(x - 11, y + 6, x + 11, y + 18, [hex('#3a5a8a'), hex('#8a3a3a'), hex('#4a6a4a')][(k + fila) % 3]); }
}
// el laboratorio de hoy: luminoso, con un microchip de cristal en la mesa por el que corren gotitas por canales, pipetas
// multicanal, una pantalla con barras y tres casillas con «✓», y ventanas con árboles
export function labHoy(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#f0f4f6')); for (const x0 of [10, 230]) { rect(x0, 16, x0 + 80, 76, C.k); rect(x0 + 2, 18, x0 + 78, 74, C.cielo3); for (let k = 0; k < 3; k++) disco(x0 + 16 + k * 24, 62 - (k % 2) * 6, 12, C.hierba); rect(x0 + 40, 18, x0 + 41, 74, C.k); }
  rect(110, 20, 210, 76, C.k); rect(112, 22, 208, 74, hex('#0e1a24')); for (let k = 0; k < 6; k++) { const a = 10 + Math.round((0.5 + 0.5 * Math.sin(t + k)) * 26); rect(120 + k * 10, 66 - a, 126 + k * 10, 66, hex('#5ab0e8')); } for (let k = 0; k < 3; k++) { rect(184, 30 + k * 14, 196, 40 + k * 14, hex('#2a3a4a')); visto(R, 186, 32 + k * 14, 1); }
  rect(0, 108, 319, 114, C.k); rect(0, 109, 319, 113, C.blanco); rect(0, 114, 319, 179, hex('#d8e0e4')); for (let x = 10; x < 320; x += 60) rect(x, 118, x + 50, 170, hex('#c8d0d4'));
  // el chip de cristal sobre la mesa, con sus canales y gotitas que corren
  rect(120, 96, 200, 108, C.k); rect(121, 97, 199, 107, hex('#c8ecf4')); for (let x = 124; x < 196; x++) pset(x, 102, hex('#7ab8c8')); for (const x of [140, 160, 180]) for (let y = 99; y < 106; y++) pset(x, y, hex('#7ab8c8'));
  for (let k = 0; k < 5; k++) { const x = 124 + Math.round((t * 18 + k * 15) % 72); disco(x, 102, 1, C.sangre); }
  for (const x of [60, 250]) { rect(x, 80, x + 6, 108, C.k); rect(x + 1, 81, x + 5, 107, C.blanco); rect(x - 4, 76, x + 10, 82, C.k); rect(x - 3, 77, x + 9, 81, C.tealT); }
  for (let k = 0; k < 6; k++) { rect(214 + k * 6, 100, 218 + k * 6, 108, C.k); rect(215 + k * 6, 103, 217 + k * 6, 107, C.sangre); }
}
// una gota de sangre enorme sobre fondo oscuro, con brillos, que late despacio y deja ver por dentro las moléculas de
// colores (para la presentación de Atom)
export function gotaGigante(R, t, o = {}) {
  const { rect, pset, disco } = R; rect(0, 0, 319, 179, hex('#120a14')); for (let k = 0; k < 90; k++) pset(Math.round(h(k, 1, 65) * 320), Math.round(h(k, 2, 65) * 180), hex('#2a1a2a'));
  const s = 1 + 0.03 * Math.sin(t * 5), cx = 150, cy = 104;
  for (let y = -70; y <= 50; y++) for (let x = -50; x <= 50; x++) { const yy = y / s, xx = x / s, dentro = yy > -10 ? xx * xx + yy * yy * 1.1 < 46 * 46 : Math.abs(xx) < (yy + 66) * 0.82 && yy > -66; if (!dentro) continue; const sh = xx + yy * 0.6;
    pset(cx + x, cy + y, sh < -40 ? C.sangreL : sh > 30 ? C.sangreS : C.sangre); }
  for (let k = 0; k < 24; k++) { const x = Math.round(cx + Math.sin(k * 2.1 + t * 0.4) * 28), y = Math.round(cy + 10 + Math.cos(k * 1.7 + t * 0.5) * 24); disco(x, y, 1 + (k % 3 === 0 ? 1 : 0), [hex('#f0a0b0'), hex('#f8d8a0'), hex('#a8c8f0')][k % 3]); }
  disco(cx - 22, cy - 6, 5, hex('#f8b8c0')); disco(cx - 25, cy - 9, 2, C.blanco);
}
// el efecto de rebobinar (u 0–1): rayas horizontales que se desplazan, bandas de color corridas y el «◀◀» en una esquina
export function rebobinar(R, t, u) {
  if (u <= 0) return; const { rect, pset, poligono } = R;
  for (let k = 0; k < 6; k++) { const y = Math.round((k * 37 + t * 220) % 180); for (let x = 0; x < 320; x++) { const c = R.pget(x, y); pset((x + 6) % 320, y, c); } rect(0, y, 319, y, hex('#f4f4f8')); }
  for (let y = 0; y < 180; y += 2) for (let x = 0; x < 320; x += 1) if (h(x >> 3, y, 66 + Math.floor(t * 12)) < 0.02 * u) pset(x, y, C.blanco);
  if (Math.floor(t * 3) % 2 === 0) { for (const dx of [0, 12]) { poligono([[30 + dx, 150], [42 + dx, 142], [42 + dx, 158]], C.k); poligono([[31 + dx, 150], [41 + dx, 144], [41 + dx, 156]], C.blanco); } }
}

// ── piezas pequeñas para las escenas ─────────────────────────────────────────────────────────────────────────────
// el instante en que la voz inglesa dice algo dentro de la frase de la marca k: f es la fracción de letras (0–1)
export const momento = (M, k, f) => { const a = M(k, 0), b = M(k + '_fin', a + 12); return a + (b - a) * f; };
export const LUGARES = { paloAlto: [-122.14, 37.44], phoenix: [-112.07, 33.45], sanJose: [-121.89, 37.34], bryan: [-96.37, 30.67], nuevaYork: [-74.0, 40.71] };
// el mapa de papel de EE. UU. (o.zoom 0–1 acerca la cámara hasta Arizona); devuelve la proyección
export function mapa(R, t, o = {}) {
  const z = o.zoom ?? 0, P = albersEEUU([20, 14, 300, 170], { zoom: lerp(1, 6, z), centro: [lerp(-96, -112.1, z), lerp(37.5, 33.6, z)] });
  mapaPapel(R, t, P, { eeuu: true, rosa: [44, 150], mesa: 6 }); return P;
}
// las ~40 farmacias de la zona de Phoenix, repartidas alrededor de la ciudad (lon, lat)
export const FARMACIAS_AZ = Array.from({ length: 40 }, (_, k) => [-112.07 + (h(k, 1, 70) - 0.5) * 0.9, 33.45 + (h(k, 2, 70) - 0.5) * 0.55]);
export { chincheta };
// el pajar del refrán, en un prado al atardecer: el montón de heno, la aguja que brilla de vez en cuando y un granjero
// diminuto que busca con una lupa enorme (lo pone la escena)
export function pajar(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, hor = 100; cielo(R, t, { hor, tarde: true, aves: true });
  rect(0, hor, 319, 179, C.hierba); for (let k = 0; k < 120; k++) pset(Math.round(h(k, 1, 71) * 320), hor + 2 + Math.round(h(k, 2, 71) * 76), C.hierbaL);
  for (let x = 0; x < 320; x += 6) { rect(x, hor - 4, x + 1, hor + 6, C.maderaS); } rect(0, hor - 2, 319, hor - 1, C.madera);   // la valla
  for (let y = 60; y < 150; y++) { const w = Math.round(Math.sqrt(Math.max(0, 1 - ((150 - y) / 90) ** 2)) * 70); rect(160 - w, y, 160 + w, y, C.k); if (w > 1) rect(161 - w, y, 159 + w, y, y % 4 ? C.paja : C.pajaS); }
  for (let k = 0; k < 160; k++) { const a = h(k, 3, 72) * Math.PI, r = h(k, 4, 72) * 64, x = Math.round(160 + Math.cos(a) * r), y = Math.round(148 - Math.sin(a) * r * 1.3); linea(x, y, x + 3, y - 2, C.pajaL); }
  const bx = 142, by = 118; if (Math.sin(t * 2.2) > 0.7) { pset(bx, by, C.blanco); for (let r = 2; r < 5; r++) { pset(bx + r, by, C.blanco); pset(bx - r, by, C.blanco); pset(bx, by - r, C.blanco); pset(bx, by + r, C.blanco); } } else pset(bx, by, C.metalL);
  rect(0, 150, 319, 179, C.hierbaS); for (let k = 0; k < 4; k++) { const vx = Math.round(((t * 6 + k * 90) % 400) - 40); linea(vx, 160 + k * 4, vx + 6, 158 + k * 4, C.pajaL); }   // briznas que vuela el viento
}
// la lupa grande en la mano de alguien (x, y: centro del cristal)
export function lupa(R, x, y, r = 8) { const { disco, linea, pset } = R; disco(x, y, r + 1, C.k); disco(x, y, r, hex('#c8e8f8')); pset(x - Math.round(r / 3), y - Math.round(r / 2), C.blanco); linea(x + r, y + r, x + r + 6, y + r + 6, C.k); linea(x + r + 1, y + r, x + r + 7, y + r + 6, C.maderaS); }
// la rejilla de las más de 200 pruebas: 20 × 10 casillas grises; las pocas que hace la Edison, en verde azulado
export function rejillaPruebas(R, t, o = {}) {
  const { rect, pset } = R; rect(0, 0, 319, 179, hex('#1e2430')); const u = o.u ?? 1;
  for (let j = 0; j < 10; j++) for (let i = 0; i < 20; i++) { const k = j * 20 + i, x = 40 + i * 12, y = 34 + j * 12; if (k / 200 > u) continue; const edison = [3, 27, 58, 91, 120, 166, 188, 141, 72, 13, 104, 152].includes(k);
    rect(x, y, x + 9, y + 9, C.k); rect(x + 1, y + 1, x + 8, y + 8, edison && o.marca ? (Math.sin(t * 4 + k) > -0.6 ? C.tealT : C.verdeT) : hex('#4a5262')); }
  if (u >= 1) R.numero('200+', 160, 168, { tam: 16, centro: true });
}
// el papel de la confidencialidad que se firma: la hoja con renglones, la línea de la firma y el bolígrafo que la hace
// (o.firma 0–1); el candado arriba
export function firmaPapel(R, t, o = {}) {
  const { rect, pset, linea } = R; rect(0, 0, 319, 179, hex('#5a6270')); rect(0, 120, 319, 179, C.madera); rect(0, 120, 319, 121, C.maderaL);
  rect(90, 20, 230, 170, C.k); rect(91, 21, 229, 169, C.blanco); R.icono('candado', 150, 30, C.k, C.grisL, 3);
  for (let k = 0; k < 10; k++) rect(104, 62 + k * 7, 216 - (k * 17) % 40, 63 + k * 7, hex('#9aa0ac')); rect(130, 150, 210, 150, C.k);
  const f = o.firma ?? 0, n = Math.round(f * 70); let px = 134, py = 146; for (let i = 0; i < n; i++) { const x = 134 + i, y = 146 + Math.round(Math.sin(i * 0.5) * 3 - (i % 13 < 3 ? 3 : 0)); linea(px, py, x, y, hex('#2a3a8a')); px = x; py = y; }
  if (f < 1) { linea(px, py, px + 10, py - 26, C.k); linea(px + 1, py, px + 11, py - 26, hex('#3a4a8a')); linea(px + 2, py, px + 12, py - 26, C.k); mano(R, px + 14, py - 22, -1, '#3a3a4a'); }
}
// el lazo de regalo sobre la caja Edison: dos cintas rojas cruzadas y la lazada encima, con destellos
export function lazo(R, x, y, t, s = 1) {
  const { rect, disco, pset } = R, W = Math.round(40 * s), H = Math.round(34 * s); rect(x - 3, y - H, x + 3, y, C.rojo); rect(x - W, y - Math.round(H / 2) - 3, x + W, y - Math.round(H / 2) + 3, C.rojo);
  for (const d of [-1, 1]) { disco(x + d * 9, y - H - 6, 8, C.k); disco(x + d * 9, y - H - 6, 7, C.rojo); disco(x + d * 9, y - H - 6, 3, C.rojoS); } disco(x, y - H - 4, 4, C.k); disco(x, y - H - 4, 3, C.rojo);
  for (let k = 0; k < 4; k++) if (Math.sin(t * 5 + k * 2) > 0.5) { const sx = x - W + Math.round(h(k, 1, 73) * 2 * W), sy = y - H - 10 - Math.round(h(k, 2, 73) * 20); pset(sx, sy, C.oroL); pset(sx + 1, sy, C.oroL); pset(sx - 1, sy, C.oroL); pset(sx, sy + 1, C.oroL); pset(sx, sy - 1, C.oroL); }
}
// la bombilla (por el inventor), que se enciende con o.luz
export function bombilla(R, x, y, luz = 1) {
  const { disco, rect, pset } = R; if (luz) for (let r = 20; r > 12; r -= 3) disco(x, y, r, r > 17 ? hex('#fff4c0') : hex('#fff0a0')); disco(x, y, 11, C.k); disco(x, y, 10, luz ? C.solL : hex('#e8eef4')); rect(x - 5, y + 9, x + 5, y + 18, C.k); for (let k = 0; k < 4; k++) rect(x - 4, y + 10 + k * 2, x + 4, y + 10 + k * 2, C.metal); pset(x - 4, y - 4, C.blanco);
}
// el chip de cerca: cristal con canales y gotitas que corren hacia tres casillas, cada una con su resultado «✓»
export function chipCerca(R, t, o = {}) {
  const { rect, pset, disco, linea } = R; rect(0, 0, 319, 179, hex('#f0f4f6')); rect(0, 140, 319, 179, hex('#d8e0e4'));
  rect(40, 40, 280, 136, C.k); rect(42, 42, 278, 134, hex('#d8f0f6')); for (let y = 44; y < 132; y += 6) pset(48 + (y % 12), y, C.blanco);
  for (let x = 60; x < 250; x++) { pset(x, 88, hex('#7ab8c8')); pset(x, 89, hex('#7ab8c8')); } for (const [x, y] of [[120, 60], [170, 60], [220, 60]]) { for (let yy = y; yy < 88; yy++) { pset(x, yy, hex('#7ab8c8')); pset(x + 1, yy, hex('#7ab8c8')); } disco(x, y - 4, 7, C.k); disco(x, y - 4, 6, hex('#eaf6fa')); if ((o.u ?? 1) > 0.5 + (x - 120) / 300) R.dibujo && visto(R, x - 5, y - 9, 1); }
  disco(60, 88, 8, C.k); disco(60, 88, 7, C.sangre); pset(57, 85, C.sangreL);
  for (let k = 0; k < 7; k++) { const x = 66 + Math.round((t * 30 + k * 27) % 180); disco(x, 88, 1, C.sangre); }
}
// la promesa: el tubito en el centro y decenas de iconos de pruebas que salen de la gota en abanico (o.u 0–1)
export function promesa(R, t, o = {}) {
  const { rect, pset, disco } = R, u = o.u ?? 1; rect(0, 0, 319, 179, hex('#f4f6f8')); for (let y = 0; y < 180; y += 3) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 74) < 0.04) pset(x, y, hex('#e8ecf0'));
  for (let r = 70; r > 20; r -= 10) for (let a = 0; a < 6.28; a += 0.05) pset(Math.round(160 + Math.cos(a) * r * 1.6), Math.round(100 + Math.sin(a) * r * 0.9), hex('#e4eaf0'));
  tubito(R, 160, 120, 4, 1, C.verdeT);
  const ic = ['gota', 'reloj', 'balanza', '?', 'corona', 'pila', 'luna', 'factura']; const n = Math.round(u * 32);
  for (let k = 0; k < n; k++) { const a = -Math.PI + (k + 0.5) / 32 * Math.PI, r = 50 + (k % 3) * 24 + Math.sin(t * 2 + k) * 2, x = Math.round(160 + Math.cos(a) * r * 1.6), y = Math.round(98 + Math.sin(a) * r * 0.95);
    rect(x - 6, y - 6, x + 6, y + 6, C.k); rect(x - 5, y - 5, x + 5, y + 5, [C.tealT, C.verdeT, C.amarilloT, hex('#e8a8b8')][k % 4]); if (ic[k % 8] === 'gota') disco(x, y, 2, C.sangre); else R.icono(ic[k % 8], x - 3, y - 3, C.k, [C.tealT, C.verdeT, C.amarilloT, hex('#e8a8b8')][k % 4]); }
}
// las decenas de pruebas que intentan caber en una gota: los iconos hacen cola, chocan contra la gota y rebotan (gag)
export function noCaben(R, t, o = {}) {
  const { rect, pset, disco } = R; rect(0, 0, 319, 179, hex('#e8eef4')); rect(0, 140, 319, 179, hex('#c8d4e0'));
  disco(200, 100, 18, C.k); disco(200, 100, 17, C.sangre); disco(194, 94, 4, C.sangreL); for (let y = 70; y < 84; y++) { const w = Math.round((y - 70) / 2); rect(200 - w, y, 200 + w, y, C.sangre); }
  for (let k = 0; k < 14; k++) { const fase = (t * 0.8 + k * 0.29) % 2, x = fase < 1 ? Math.round(lerp(-20, 178, fase)) : Math.round(lerp(178, 120 - (k % 4) * 20, fase - 1)), y = Math.round(100 + (k % 3 - 1) * 10 - (fase > 1 ? Math.sin((fase - 1) * Math.PI) * 30 : 0));
    if (x < -10) continue; rect(x - 5, y - 5, x + 5, y + 5, C.k); rect(x - 4, y - 4, x + 4, y + 4, [C.tealT, C.verdeT, C.amarilloT, hex('#e8a8b8')][k % 4]); if (fase > 1 && fase < 1.25) R.icono('X', x - 2, y - 14, C.rojo, C.k); }
  R.numero('1', 200, 140, { tam: 16, centro: true });
}
// el tubo enorme que piden las máquinas grandes, al lado del tubito diminuto de Theranos, con una «?» entre los dos
export function tuboContraTubito(R, t) {
  const { rect, pset } = R; rect(0, 0, 319, 179, hex('#dde8e2')); rect(0, 150, 319, 179, hex('#c8d0d8')); rect(0, 150, 319, 151, hex('#a8b0b8'));
  rect(70, 20, 120, 150, C.k); rect(71, 21, 119, 149, hex('#f4f8fc')); rect(71, 50, 119, 149, C.sangre); rect(66, 8, 124, 20, C.k); rect(67, 9, 123, 19, C.rojoW); for (let y = 54; y < 148; y += 6) pset(75, y, C.sangreL);
  tubito(R, 230, 150, 2, 1, C.verdeT); R.icono('?', 158, 70, C.rojo, C.k, 4); for (let k = 0; k < 3; k++) rect(150 + k * 8, 100, 154 + k * 8, 102, C.k);
}
// los tres antiguos empleados al teléfono, en tres viñetas (la escena pone a cada uno dentro de la suya)
export function vinetas(R, t, n = 3) { const { rect } = R; rect(0, 0, 319, 179, hex('#2a2e3a')); for (let k = 0; k < n; k++) { const x0 = 8 + k * 104; rect(x0, 30, x0 + 96, 150, C.k); rect(x0 + 2, 32, x0 + 94, 148, [hex('#e8e0d0'), hex('#d8e4ec'), hex('#ece0e8')][k]); rect(x0 + 2, 120, x0 + 94, 148, [hex('#c8b898'), hex('#a8b8c8'), hex('#c8a8b8')][k]); rect(x0 + 60, 50, x0 + 86, 74, C.k); rect(x0 + 61, 51, x0 + 85, 73, C.cristal); } }
// el auricular en la mano de un personaje pequeño (junto a la cabeza)
export function auricular(R, x, y, dir = 1) { const { rect } = R; rect(x, y - 6, x + 2 * dir, y + 6, C.k); rect(x - 1 * dir, y - 7, x + 3 * dir, y - 5, C.k); rect(x - 1 * dir, y + 5, x + 3 * dir, y + 7, C.k); }
// la carpeta de la acusación: el sello de la balanza, hojas, y el sello rojo que cae (o.sello 0–1)
export function acusacion(R, t, o = {}) {
  const { rect, disco, pset } = R; rect(0, 0, 319, 179, hex('#3a3e48')); rect(0, 130, 319, 179, C.madera); rect(0, 130, 319, 131, C.maderaL);
  rect(70, 20, 250, 170, C.k); rect(71, 21, 249, 169, C.ocre); rect(84, 30, 236, 166, C.blanco); disco(160, 56, 16, C.k); disco(160, 56, 15, hex('#2a3a7a')); R.icono('balanza', 157, 52, C.oroL, C.k, 1); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(160 + Math.cos(a) * 13), Math.round(56 + Math.sin(a) * 13), C.oroL); }
  for (let k = 0; k < 8; k++) rect(96, 82 + k * 8, 224 - (k * 13) % 40, 83 + k * 8, hex('#9aa0ac'));
  const s = o.sello ?? 0; if (s > 0) { const sz = Math.round(lerp(60, 26, Math.min(1, s * 1.3))); rect(196 - sz, 128 - sz / 2, 196 + sz, 128 + sz / 2, C.rojo); rect(199 - sz, 131 - sz / 2, 193 + sz, 125 + sz / 2, C.blanco); R.icono('X', 190, 122, C.rojo, C.blanco, 2); }
}
