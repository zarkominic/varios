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
// Techo de placas con los plafones (uno parpadea a ratos), el detector de humo y la cámara de seguridad; la franja roja de la
// cadena; al fondo, el mostrador de la farmacia con su cajón de techo, estanterías de frascos de ámbar y cajas, la cruz que
// late, dos farmacéuticos con bata que van y vienen detrás del mostrador, las cajas registradoras con su pantalla, las bolsas
// de recetas y clientes que esperan o pasan por delante; en las paredes, el reloj con segundero, carteles con pictogramas y
// la pantalla de las cámaras; góndolas a los lados con productos de todas las formas y sus carteles de pasillo que se mecen;
// el suelo de baldosas con el reflejo de los plafones, la alfombrilla y la luz del sol que entra por la puerta automática,
// por cuyo cristal (y solo por él) se ven la calle, la palmera, los coches y la gente que pasa; las cestas, una planta, el
// cono amarillo y su charco. o.rincon (por defecto): el rincón de Theranos con su panel, el logotipo, el cartel de precios,
// el contenedor de agujas, el respaldo del sillón y la bandeja de tubitos; o.cerrado: el rincón con la persiana bajada y un
// papel con la «X»; o.rincon false: una góndola baja de ofertas; o.puerta (0–1): la puerta se abre. El brazo y el asiento
// del sillón van por delante de la clienta: sillonDelante()
export function farmacia(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, ab = Math.round(Math.max(0, Math.min(1, o.puerta ?? 0)) * 12);
  // la pared, con su gotelé, y el techo de placas con la rejilla
  rect(0, 15, 319, 139, a_F.pared); for (let k = 0; k < 140; k++) pset(Math.floor(h(k, 3, 200) * 320), 33 + Math.floor(h(k, 4, 200) * 60), a_F.paredS);
  rect(0, 0, 319, 14, a_F.techo); for (let x = 0; x < 320; x += 16) rect(x, 0, x, 13, a_F.techoS); rect(0, 6, 319, 6, a_F.techoS); rect(0, 14, 319, 14, a_F.techoS);
  for (let k = 0; k < 50; k++) { const x = Math.floor(h(k, 1, 200) * 320), y = 1 + Math.floor(h(k, 2, 200) * 12); if (x % 16 && y !== 6) pset(x, y, a_F.techoL); }
  // los plafones con sus dos tubos y el cono de luz en la pared; el quinto parpadea de vez en cuando
  for (let k = 0; k < 6; k++) {
    const x = 8 + k * 54, apagado = k === 4 && (t % 7.3) < 0.9 && Math.sin(t * 31) > -0.3;
    rect(x - 1, 9, x + 35, 13, a_F.troffer); rect(x, 10, x + 34, 12, apagado ? a_F.tuboOff : a_F.tubo); if (!apagado) rect(x + 1, 11, x + 33, 11, a_F.tuboS);
    if (!apagado) for (let y = 15; y < 34; y++) for (let xx = Math.round(x - (y - 15) / 2); xx < x + 34 + (y - 15) / 2; xx++) if ((xx + y) % 5 === 0) pset(xx, y, a_F.paredL);
  }
  disco(140, 15, 2, a_F.tubo); pset(140, 17, a_F.troffer); if ((t % 3) < 0.15) pset(141, 15, C.rojo);   // el detector de humo
  rect(205, 14, 207, 14, C.k); disco(206, 17, 3, hex('#2a2a34')); pset(205, 16, hex('#6a6a7a')); if (Math.floor(t * 1.2) % 2) pset(207, 18, C.rojo);   // la cámara de seguridad
  // la franja roja de la cadena con su punteado blanco, su brillo y su sombra
  rect(0, 22, 319, 31, C.rojoW); rect(0, 22, 319, 22, a_F.rojoL); rect(0, 30, 319, 31, a_F.rojoS); rect(0, 32, 319, 32, a_F.paredS);
  for (let x = 0; x < 320; x += 40) { disco(x + 20, 26, 2, C.blanco); pset(x + 19, 25, a_F.rojoL); }

  // ── el mostrador de la farmacia al fondo ──
  rect(108, 33, 216, 37, a_F.troffer); rect(108, 37, 216, 37, a_F.techoS); rect(110, 38, 214, 78, a_F.fondoM);
  for (let b = 0; b < 3; b++) {
    const x0 = 114 + b * 34; rect(x0, 40, x0 + 28, 77, a_F.estM); rect(x0 + 1, 41, x0 + 27, 77, a_F.estF);
    for (let j = 0; j < 4; j++) {
      const yb = 48 + j * 8;
      for (let i = 0; i < 6; i++) {
        const px = x0 + 2 + i * 4 + (j % 2), r = h(i, j + b * 5, 210), cl = a_PROD[Math.floor(h(i, j + b * 5, 211) * a_PROD.length)];
        if (r < 0.42) { rect(px, yb - 5, px + 2, yb - 1, a_F.ambar); pset(px, yb - 4, a_F.ambarL); pset(px + 2, yb - 2, a_F.ambarS); rect(px, yb - 6, px + 2, yb - 6, C.blanco); }   // frascos de ámbar con tapón blanco
        else if (r < 0.72) { rect(px, yb - 4, px + 2, yb - 1, C.blanco); pset(px + 1, yb - 3, cl[1]); pset(px + 2, yb - 1, a_F.tiraS); }   // cajitas
        else if (r < 0.88) { rect(px - 1, yb - 3, px + 3, yb - 1, cl[2]); rect(px, yb - 3, px + 2, yb - 3, cl[0]); }   // cestas de recetas
      }
      rect(x0 + 1, yb, x0 + 27, yb, a_F.estM);
    }
  }
  // la cruz que late, con su halo
  const late = Math.sin(t * 2.4) > 0.2;
  if (late) for (let y = 32; y <= 52; y++) for (let x = 151; x <= 173; x++) if ((x + y) % 2 === 0 && (x < 154 || x > 170 || y < 34 || y > 50)) pset(x, y, a_F.rosa);
  rect(154, 34, 170, 50, C.k); rect(155, 35, 169, 49, late ? C.rojoW : a_F.rojoS); rect(160, 37, 164, 47, C.blanco); rect(157, 40, 167, 44, C.blanco); pset(160, 37, a_F.rosa); pset(157, 40, a_F.rosa); rect(155, 35, 169, 35, late ? a_F.rojoL : C.rojoW);
  // los farmacéuticos con bata detrás del mostrador: uno va y viene entre las estanterías, la otra atiende y a veces se ríe
  { const v = Math.cos(t * 0.37), fx = Math.round(122 + (Math.sin(t * 0.37) * 0.5 + 0.5) * 60); R.busto('calvo', a_BATA, fx, 64 - (Math.abs(v) > 0.3 && Math.floor(t * 4) % 2 ? 1 : 0), t); }
  R.busto('mujer', a_BATA, 196, 65, t, { rie: Math.sin(t * 0.8) > 0.75 });
  // la encimera y el frente del mostrador, con sus cuarterones y el zócalo
  rect(110, 76, 214, 78, a_F.encim); rect(110, 79, 214, 79, a_F.encimS); rect(110, 80, 214, 92, a_F.frente);
  for (let x = 113; x < 210; x += 20) { rect(x, 82, x + 16, 88, a_F.frenteS); rect(x, 82, x + 16, 82, a_F.frenteD); }
  rect(110, 90, 214, 92, a_F.frenteD);
  // las cajas registradoras: pantalla con líneas que cambian, el lector de tarjetas con su luz; las bolsas de recetas
  for (const x of [140, 176]) {
    rect(x, 66, x + 9, 75, C.k); rect(x + 1, 67, x + 8, 74, a_F.pantalla); for (let l = 0; l < 3; l++) rect(x + 2, 68 + l * 2, x + 3 + ((Math.floor(t * 1.5) + l + x) % 5), 68 + l * 2, a_F.pantallaL);
    rect(x + 4, 75, x + 5, 76, C.k); rect(x + 11, 71, x + 15, 76, C.k); rect(x + 12, 72, x + 14, 75, hex('#5a5a6a')); pset(x + 13, 72, Math.floor(t * 2 + x) % 3 ? C.verdeL : C.rojo);
  }
  for (let k = 0; k < 3; k++) { const x = 115 + k * 7; rect(x, 69 + (k % 2), x + 5, 76, C.k); rect(x + 1, 70 + (k % 2), x + 4, 76, C.papel); rect(x + 1, 70 + (k % 2), x + 4, 70 + (k % 2), a_F.encimS); pset(x + 2, 73, C.rojoW); }
  // clientes al fondo: una espera en la caja y otro cruza despacio por delante del mostrador
  R.busto('mujer', a_CLIENTES[1], 186, 80, t, {});
  { const u = (t * 0.045 + 0.3) % 1, x = Math.round(lerp(80, 240, u)); R.busto('rizos', a_CLIENTES[(Math.floor(t * 0.045 + 0.3)) % 3 === 1 ? 0 : 2], x, 80 - (Math.floor(t * 4) % 2), t, {}); }
  // las paredes entre las góndolas: el reloj con segundero, el cartel del corazón, la pantalla de las cámaras y el del sol
  disco(97, 46, 8, C.k); disco(97, 46, 7, C.blanco); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(97 + Math.cos(a) * 6), Math.round(46 + Math.sin(a) * 6), a_F.gondD); }
  { const m = t * 0.02 - Math.PI / 2, sg = Math.floor(t) * Math.PI / 30 - Math.PI / 2; linea(97, 46, 97 + Math.round(Math.cos(m) * 4), 46 + Math.round(Math.sin(m) * 4), C.k); linea(97, 46, 97 + Math.round(Math.cos(sg) * 6), 46 + Math.round(Math.sin(sg) * 6), C.rojo); }
  rect(86, 58, 108, 84, C.k); rect(87, 59, 107, 83, hex('#3a7ad8')); rect(87, 59, 107, 60, hex('#5a9ae8')); R.dibujo(a_PICTO.corazon, 95, 62, 1, { '#': C.blanco });
  for (let x = 89; x < 106; x++) pset(x, 74 + (x === 96 ? -4 : x === 97 ? 3 : x === 98 ? -1 : 0), C.blanco); rect(89, 79, 101, 80, hex('#a8c8f0'));
  rect(225, 32, 226, 38, a_F.gondD); rect(216, 38, 234, 52, C.k); rect(217, 39, 233, 51, hex('#1a2230'));
  for (let q = 0; q < 4; q++) { const qx = 218 + (q % 2) * 8, qy = 40 + Math.floor(q / 2) * 6, esc = (Math.floor(t / 2.5) + q) % 4; rect(qx, qy, qx + 6, qy + 4, hex('#5a6470')); rect(qx, qy + 3, qx + 6, qy + 4, hex('#7a8490')); if (esc < 2) rect(qx + 1, qy + 1, qx + 1, qy + 2, hex('#9aa4b0')); if (esc === 1) pset(qx + 2 + Math.floor(t * 2) % 4, qy + 2, C.blanco); }
  rect(216, 58, 234, 84, C.k); rect(217, 59, 233, 83, C.amarilloT); disco(225, 66, 3, C.naranja); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; pset(Math.round(225 + Math.cos(a) * 5), Math.round(66 + Math.sin(a) * 5), C.naranja); }
  R.numero('50', 226, 81, { color: C.rojoW, centro: true, sombra: false });
  // las góndolas de los lados, con sus carteles de pasillo colgados que se mecen
  a_gondola(R, 0, 83, 36, 139, { semilla: 0, cab: hex('#2a5aa8'), picto: a_PICTO.capsula, lado: 1 });
  a_gondola(R, 236, 319, 36, 139, { semilla: 7, cab: hex('#2a5aa8'), picto: a_PICTO.corazon, lado: -1 });
  for (const [cx, n, pic] of [[42, 3, a_PICTO.capsula], [258, 4, a_PICTO.corazon]]) {
    const sw = Math.round(Math.sin(t * 0.9 + cx) * 1); linea(cx - 9, 15, cx - 9 + sw, 20, a_F.gondD); linea(cx + 9, 15, cx + 9 + sw, 20, a_F.gondD);
    rect(cx - 14 + sw, 20, cx + 14 + sw, 34, C.k); rect(cx - 13 + sw, 21, cx + 13 + sw, 33, hex('#2a5aa8')); rect(cx - 13 + sw, 21, cx + 13 + sw, 21, hex('#4a7ac8')); rect(cx - 13 + sw, 33, cx + 13 + sw, 33, hex('#1a3a78'));
    R.dibujo(pic, cx - 10 + sw, 25, 1, { '#': C.blanco }); R.numero(String(n), cx + 5 + sw, 31, { color: C.blanco, centro: true, sombra: false });
  }

  // ── el rincón de Theranos (o la góndola de ofertas, o la persiana bajada) ──
  if (o.rincon !== false) {
    rect(90, 92, 230, 140, C.k); rect(91, 93, 229, 139, a_F.panel); rect(91, 93, 229, 95, C.tealT); rect(91, 96, 229, 96, C.tealTS); rect(91, 133, 229, 139, a_F.panelS); rect(91, 133, 229, 133, a_F.panelD);
    for (const x of [134, 192]) rect(x, 97, x, 132, a_F.panelS);
    for (const xl of [118, 206]) for (let y = 97; y < 132; y++) for (let x = xl - 6 - (y - 97) / 3; x < xl + 6 + (y - 97) / 3; x++) if ((Math.round(x) + y) % 3 === 0) pset(Math.round(x), y, C.blanco);   // la luz de los focos
    logoTheranos(R, 112, 110, 1, t); for (let a = 0; a < 6.28; a += 0.1) pset(Math.round(112 + Math.cos(a) * 15), Math.round(110 + Math.sin(a) * 15), a_F.panelS);
    if (o.cerrado) {
      rect(144, 96, 228, 100, C.k); rect(145, 97, 227, 99, a_F.persianaS); rect(146, 100, 226, 136, C.k);
      for (let y = 101; y < 136; y += 3) { rect(147, y, 225, y + 1, a_F.persiana); rect(147, y, 225, y, a_F.persianaL); rect(147, y + 2, 225, y + 2, a_F.persianaS); }
      rect(176, 133, 196, 135, a_F.persianaS); rect(184, 132, 188, 135, C.k); disco(186, 131, 2, C.oroS); rect(185, 131, 187, 132, C.oro);   // el tirador y el candado
      rect(173, 105, 197, 125, C.k); rect(174, 106, 196, 124, C.blanco); rect(172, 104, 176, 106, a_F.papelT); rect(194, 104, 198, 106, a_F.papelT);
      R.icono('X', 180, 110, C.rojoW, C.blanco, 2);
    } else {
      // el cartel de precios del rincón: la gota y el precio
      rect(162, 100, 190, 124, C.k); rect(163, 101, 189, 123, C.blanco); rect(163, 101, 189, 104, C.tealT); R.dibujo(a_PICTO.gota, 166, 107, 1, { '#': C.sangre }); pset(167, 108, C.sangreL);
      R.numero('$3', 181, 115, { color: C.tealTS, centro: true, sombra: false }); for (let k = 0; k < 3; k++) rect(166, 117 + k * 2, 186 - k * 5, 117 + k * 2, a_F.panelD);
      // el contenedor rojo de las agujas usadas, en la pared
      rect(136, 116, 146, 130, C.k); rect(137, 119, 145, 129, C.rojoW); rect(137, 117, 145, 118, C.amarilloT); rect(139, 117, 143, 117, C.k); disco(141, 124, 3, C.blanco); pset(141, 124, C.k); pset(141, 122, C.k); pset(139, 125, C.k); pset(143, 125, C.k); pset(138, 120, a_F.rojoL);
      // el respaldo del sillón, acolchado, con su cabecero
      rect(149, 99, 158, 106, C.k); rect(150, 100, 157, 105, C.tealT); rect(150, 100, 157, 100, a_F.tealL);
      rect(150, 106, 157, 132, C.k); rect(151, 107, 156, 131, C.tealT); rect(151, 107, 152, 131, C.tealTS); for (let y = 112; y < 131; y += 6) rect(153, y, 156, y, C.tealTS); pset(155, 108, a_F.tealL);
      rect(153, 132, 155, 140, C.metalD); pset(154, 133, C.metalL);
      // el soporte con la bandeja de tubitos, el estante de cartuchos y la caja de guantes
      rect(204, 112, 226, 114, C.k); rect(205, 113, 225, 113, C.metalL); rect(214, 114, 216, 138, C.metalD); rect(215, 114, 215, 137, C.metal); rect(208, 138, 222, 139, C.metalD);
      for (let k = 0; k < 4; k++) tubito(R, 207 + k * 5, 112, 1, k < 2 ? 1 : 0, [C.verdeT, C.amarilloT, C.tealT, C.rojoW][k]);
      rect(194, 100, 226, 106, C.k); rect(195, 101, 225, 105, hex('#e8f4f4')); for (let k = 0; k < 5; k++) { rect(198 + k * 6, 102, 201 + k * 6, 104, [C.tealT, C.verdeT, C.amarilloT, C.tealT, C.verdeT][k]); pset(198 + k * 6, 102, C.blanco); }
    }
  } else {
    a_gondola(R, 92, 228, 92, 139, { semilla: 13, cab: C.rojoW, filas: 2 });
    rect(146, 82, 174, 92, C.k); rect(147, 83, 173, 91, C.amarilloT); R.numero('50%', 160, 90, { color: C.rojoW, centro: true, sombra: false });   // el cartel de la oferta
  }
  // la planta del rincón, que se mece con el aire de la puerta
  { const m = Math.round(Math.sin(t * 1.1) * 1.2); rect(84, 128, 96, 140, C.k); rect(85, 129, 95, 139, a_F.maceta); rect(93, 129, 95, 139, a_F.macetaS); rect(84, 128, 96, 129, a_F.macetaS);
    for (const [dx, dy, r] of [[0, -14, 5], [-4, -8, 4], [4, -9, 4], [-1, -20, 4], [3, -4, 3], [-3, -2, 3]]) disco(90 + dx + (dy < -10 ? m : 0), 128 + dy, r, dy < -10 ? C.hierbaS : C.hierba);
    for (const [dx, dy] of [[-2, -17], [2, -12], [-5, -9], [5, -6], [0, -22]]) pset(90 + dx + m, 128 + dy, C.hierbaL); }

  // ── el suelo de baldosas en perspectiva, con el reflejo de los plafones ──
  for (let y = 140; y < 180; y++) {
    const f = (y - 140) / 39, e = 1 + 0.4 * f, fila = y < 143 ? 0 : y < 147 ? 1 : y < 152 ? 2 : y < 158 ? 3 : y < 166 ? 4 : 5, lh = y === 143 || y === 147 || y === 152 || y === 158 || y === 166 || y === 176;
    let prev = Math.floor((160 - 160 / e) / 20);
    for (let x = 0; x < 320; x++) { const col = Math.floor((160 + (x - 160) / e) / 20); pset(x, y, lh || col !== prev ? a_F.junta : (col + fila) % 2 ? a_F.suelo : a_F.suelo2); prev = col; }
  }
  for (let k = 0; k < 6; k++) { const xc = 25 + k * 54; if (k === 4 && (t % 7.3) < 0.9 && Math.sin(t * 31) > -0.3) continue;
    for (let y = 142; y < 172; y++) { const e = 1 + 0.4 * (y - 140) / 39, xr = Math.round(160 + (xc - 160) * e), w = 6 - Math.floor((y - 142) / 6); for (let x = xr - w; x <= xr + w; x++) if ((x + y) % 2 === 0 && (y % 3 || Math.abs(x - xr) < 3)) pset(x, y, a_F.brillo); } }
  for (const [x0, x1] of [[0, 83], [236, 319], [90, 230]]) for (let y = 140; y < 143; y++) for (let x = x0; x <= x1; x++) if ((x + y) % 2 === 0 || y === 140) pset(x, y, a_F.sombra);
  for (let k = 0; k < 9; k++) { const x = Math.floor(h(k, 5, 200) * 300) + 10, y = 150 + Math.floor(h(k, 6, 200) * 26); rect(x, y, x + 2 + (k % 3), y, a_F.junta); }   // marcas de suelas
  // la luz del sol que entra por la puerta, con motas que flotan
  for (let y = 141; y < 168; y++) { const x0 = Math.round((y - 140) * 0.9), x1 = Math.round(30 + (y - 140) * (1.6 + ab * 0.06)); for (let x = x0; x <= x1; x++) if ((x + y) % 2 === 0) pset(x, y, a_F.luzSol); }
  for (let k = 0; k < 8; k++) { const x = Math.round(8 + h(k, 7, 200) * 40 + Math.sin(t * 0.5 + k) * 4), y = Math.round(150 - ((h(k, 8, 200) * 40 + t * 2) % 40)); if (Math.sin(t * 1.3 + k * 2) > -0.2) pset(x, y, C.blanco); }
  rect(0, 141, 36, 148, a_F.alfombraS); rect(1, 142, 35, 147, a_F.alfombra); for (let x = 3; x < 35; x += 3) rect(x, 143, x, 146, a_F.alfombraS);   // la alfombrilla

  // ── la puerta automática: por el cristal (y solo por él) se ven la calle, la palmera, los coches y la gente ──
  rect(0, 66, 30, 81, C.k); rect(1, 67, 29, 80, hex('#2a2a34')); R.numero('24', 15, 78, { color: C.rojoW, centro: true, sombra: false });   // abierto las 24 horas
  rect(0, 81, 31, 88, a_F.marco); rect(0, 81, 31, 81, a_F.marcoL); disco(15, 85, 1, ab > 0 ? C.verdeL : C.rojo);
  rect(0, 88, 31, 140, C.k);
  {
    const CL = [0, 90, 28, 139], rc = (x0, y0, x1, y1, c) => a_rect(R, CL, x0, y0, x1, y1, c); R.recorte(CL);
    rc(0, 90, 28, 95, C.cielo2); rc(0, 96, 28, 101, C.cielo3);
    { const nx = ((t * 2.5) % 70) - 24; for (const [dx, dy, r] of [[0, 1, 3], [4, -1, 4], [8, 1, 3]]) disco(nx + dx, 93 + dy, r, C.blanco); rc(nx - 2, 95, nx + 10, 96, C.nubeS ?? C.cielo3); }
    // la fachada de enfrente: tejado de teja, ventanas con toldo y el escaparate
    rc(0, 99, 28, 116, a_F.fachada); rc(0, 98, 28, 100, a_F.teja); rc(0, 101, 28, 101, a_F.tejaS); for (let x = 1; x < 28; x += 3) rc(x, 98, x, 99, a_F.tejaS);
    for (const x of [2, 12, 22]) { rc(x, 104, x + 4, 109, a_F.ventana); rc(x, 104, x + 1, 105, a_F.ventanaL); rc(x - 1, 103, x + 5, 103, a_F.toldo); }
    rc(0, 111, 28, 112, a_F.toldo); for (let x = 0; x < 28; x += 4) rc(x, 111, x + 1, 112, a_F.toldoL); rc(0, 113, 28, 116, a_F.ventana); rc(4, 113, 6, 116, a_F.ventanaL);
    disco(-2, 104, 6, a_F.copaS); disco(-1, 102, 5, a_F.copa); rc(-1, 108, 0, 116, C.cortezaS);   // el árbol de la acera de enfrente
    rc(0, 116, 28, 117, a_F.bordillo); rc(0, 118, 28, 126, a_F.asfalto); for (let x = -4; x < 30; x += 10) rc(x, 122, x + 4, 122, C.linea);
    { const ciclo = 8, n = Math.floor(t / ciclo), u = (t % ciclo) / ciclo, d = n % 2 ? -1 : 1, x = d > 0 ? Math.round(-36 + u * 110) : Math.round(64 - u * 110); a_vehiculo(R, rc, x, d > 0 ? 126 : 123, n % 4, d, t); }
    rc(0, 127, 28, 128, a_F.bordillo); rc(0, 129, 28, 139, C.acera); rc(0, 134, 28, 134, C.aceraS); rc(10, 129, 10, 139, C.aceraS);
    // la palmera que se mece y, a veces, alguien que pasa por la acera
    { const m = Math.round(Math.sin(t * 0.9) * 1.5); linea(22, 128, 21, 97, C.cortezaS); linea(23, 128, 22, 98, C.corteza); for (let y = 100; y < 128; y += 4) pset(22, y, C.k);
      for (let k = 0; k < 6; k++) { const a = k * 1.05 + 0.3; for (let d = 0; d < 9; d++) pset(Math.round(21 + m * (d / 9) + Math.cos(a) * d), Math.round(96 + Math.sin(a) * d * 0.5 + d * d / 30), d % 3 ? C.hierbaS : C.hierba); } }
    { const u = ((t + 5) % 11) / 11; if (u < 0.5) { const p = Math.floor((t + 5) / 11) % 3, px = Math.round(-18 + u / 0.5 * 64); R.actor([ELENCO_CHIBI.chica, ELENCO_CHIBI.senor30, ELENCO_CHIBI.chico][p], px, 139, t, { dir: 1, anda: true }); } }
    R.recorte(null);
  }
  // las dos hojas de cristal, que se abren hacia los lados: reflejos, la banda esmerilada y los puntos rojos de seguridad
  for (const [a, b] of [[0, 14 - ab], [14 + ab, 28]]) if (b > a) {
    for (let y = 91; y < 139; y++) { const xs = a + ((140 - y) >> 1) % Math.max(1, b - a); if (y % 2) { pset(xs, y, a_F.vidrioL); if (xs + 1 <= b) pset(xs + 1, y, a_F.vidrioL); } }
    for (let x = a; x <= b; x += 2) pset(x, 112, C.blanco); rect(a, 90, b, 90, C.metalL); rect(b, 90, b, 139, C.metalL); rect(a, 90, a, 139, C.metalS);
    for (let x = a + 2; x < b - 1; x += 3) pset(x, 101, C.rojoW);   // la franja de puntos rojos de seguridad
  }
  rect(29, 88, 30, 140, C.k); rect(0, 139, 30, 140, C.metalD);
  // las cestas rojas apiladas junto a la puerta
  for (let k = 0; k < 4; k++) { const y = 150 - k * 3; rect(36, y - 4, 52, y, C.k); rect(37, y - 3, 51, y - 1, C.rojoW); rect(37, y - 3, 51, y - 3, a_F.rojoL); for (let x = 39; x < 51; x += 3) pset(x, y - 1, a_F.rojoS); }
  rect(40, 134, 41, 138, C.k); rect(48, 134, 49, 138, C.k); rect(40, 133, 49, 133, C.k);
  // el cono amarillo de suelo mojado y su charco, con brillos que se mueven
  for (let j = -3; j <= 3; j++) for (let i = -18; i <= 18; i++) if ((i / 18) ** 2 + (j / 3) ** 2 < 1 && (i + j) % 2 === 0) pset(292 + i, 175 + j, hex('#d8e8f2'));
  for (let k = 0; k < 3; k++) { const x = 278 + ((Math.floor(t * 2) * 7 + k * 11) % 28); pset(x, 174 + (k % 2), C.blanco); }
  rect(294, 171, 314, 173, C.k); poligono([[296, 172], [304, 150], [312, 172]], C.k); poligono([[298, 171], [304, 153], [310, 171]], C.amarilloT); rect(300, 164, 308, 165, C.blanco); R.icono('!', 302, 157, C.k, C.amarilloT);
}
// el brazo y el asiento del sillón de extracción, por delante de la persona sentada (x: borde izquierdo del sillón):
// cojín acolchado con costuras y brillo, el reposabrazos con su almohadilla y su bisagra, la palanca, el pistón cromado y
// la base de cinco patas con ruedas
export function sillonDelante(R, x = 150, suelo = 140) {
  const { rect, pset, disco, linea } = R, s = suelo;
  rect(x, s - 16, x + 30, s - 10, C.k); rect(x + 1, s - 15, x + 29, s - 11, C.tealT); rect(x + 1, s - 15, x + 29, s - 15, a_F.tealL); rect(x + 1, s - 11, x + 29, s - 11, C.tealTS);
  for (let i = 6; i < 30; i += 7) pset(x + i, s - 13, C.tealTS); pset(x, s - 16, C.tealTS); pset(x + 30, s - 16, C.tealTS);
  linea(x + 4, s - 10, x + 1, s - 6, C.metalD); disco(x + 1, s - 6, 1, C.k);   // la palanca
  rect(x + 26, s - 20, x + 28, s - 16, C.metalD); pset(x + 27, s - 19, C.metalL); disco(x + 27, s - 18, 1, C.metalS);
  rect(x + 22, s - 25, x + 43, s - 20, C.k); rect(x + 23, s - 24, x + 42, s - 21, C.tealT); rect(x + 23, s - 24, x + 42, s - 24, a_F.tealL); rect(x + 23, s - 21, x + 42, s - 21, C.tealTS); pset(x + 22, s - 25, C.tealTS); pset(x + 43, s - 25, C.tealTS);
  rect(x + 12, s - 10, x + 17, s - 7, C.k); rect(x + 13, s - 9, x + 16, s - 8, C.metalS);   // el pistón: la funda y la barra cromada
  rect(x + 13, s - 7, x + 16, s - 2, C.metalD); rect(x + 14, s - 7, x + 14, s - 2, C.metalL);
  rect(x + 4, s - 2, x + 26, s - 1, C.metalD); rect(x + 4, s - 2, x + 26, s - 2, C.metalS);
  for (const dx of [5, 15, 25]) { disco(x + dx, s, 1, C.k); pset(x + dx, s - 1, C.k); }
}
// la mano de la enfermera o del técnico: la mano canónica del episodio 10 (sprite de 14 px) con la manga verde azulada
// del pijama sanitario; (x, y) es la muñeca y dir hacia dónde apunta
export function guante(R, x, y, dir = -1, manga = '#4aa8a0') { mano(R, x, y, dir, manga); }
// el inserto del pinchazo, de objetos sobre la mesita del rincón (los personajes siguen pequeños: las manos son las
// canónicas de 14 px): detrás, la farmacia desenfocada con clientes que pasan y el panel con el logotipo, la carta de
// precios con pictogramas, el diploma con su sello, el reloj con segundero, el dispensador de gel con su luz y la pantalla
// que va marcando pruebas; en la mesa, el empapador acolchado, la mano de la clienta apoyada en la almohadilla, la lanceta
// que baja y pica (o.pica 0–1, y vuelve a subir), la gota que brota en la yema (o.gota 0–1) y la mano de la enfermera que
// acerca el tubito y la recoge (o.recoge 0–1); alrededor, el contenedor de agujas, la caja de cartuchos abierta, la gasa, el
// sobre de alcohol, la tirita, el bolígrafo, el café de la enfermera que humea, la caja de guantes y la bandeja de tubitos
// con un brillo que pasa por el metal
export function insertoDedo(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  a_fondoRincon(R, t, 36, 92);
  for (let a = 0; a < 6.28; a += 0.07) { const r = 22 + Math.sin(a * 6 + t) * 0.6; if (Math.round(a * 20) % 2) pset(Math.round(160 + Math.cos(a) * r), Math.round(62 + Math.sin(a) * r * 0.95), a_F.mentaL); }
  logoTheranos(R, 160, 62, 1.4, t);
  // la carta de precios: cada prueba con su pictograma, una barra y su precio
  rect(28, 44, 86, 88, C.k); rect(29, 45, 85, 87, a_F.carta); rect(29, 45, 85, 49, C.tealT); rect(84, 50, 85, 87, a_F.cartaS); rect(29, 87, 85, 87, a_F.cartaS);
  [[a_PICTO.gota, C.sangre, '3'], [a_PICTO.corazon, C.rojoW, '6'], [a_PICTO.sol, C.naranja, '9'], [a_PICTO.capsula, C.tealT, '5']].forEach(([p, c, n], k) => {
    const y = 52 + k * 9; R.dibujo(p, 32, y, 1, { '#': c }); rect(40, y + 2, 66 - (k % 2) * 6, y + 2, a_F.cartaS); R.numero('$' + n, 77, y + 6, { color: C.k, centro: true, sombra: false, fina: true }); });
  // el diploma enmarcado con su sello rojo y su cinta, y el reloj de pared con segundero
  rect(98, 44, 128, 64, C.k); rect(99, 45, 127, 63, C.maderaL); rect(101, 47, 125, 61, a_F.carta); for (let k = 0; k < 3; k++) rect(104, 50 + k * 3, 122 - k * 4, 50 + k * 3, a_F.cartaS);
  disco(119, 58, 3, C.rojoW); pset(118, 57, a_F.rojoL); pset(117, 61, C.rojoW); pset(121, 61, C.rojoW);
  { const cx = 113, cy = 78, s = Math.floor(t) * Math.PI / 30 - Math.PI / 2, m = t * 0.02; disco(cx, cy, 8, C.k); disco(cx, cy, 7, a_F.cartaS); disco(cx, cy, 6, a_F.carta);
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(cx + Math.cos(a) * 5), Math.round(cy + Math.sin(a) * 5), a_F.gondD); }
    linea(cx, cy, cx + Math.round(Math.cos(m) * 3), cy + Math.round(Math.sin(m) * 3), C.k); linea(cx, cy, cx - 1, cy - 4, C.k); linea(cx, cy, cx + Math.round(Math.cos(s) * 5), cy + Math.round(Math.sin(s) * 5), C.rojo); pset(cx, cy, C.k); }
  // el dispensador de gel, con su luz que parpadea
  rect(186, 48, 197, 70, C.k); rect(187, 49, 196, 69, C.metalL); rect(187, 49, 196, 51, a_F.mentaL); rect(195, 52, 196, 69, C.metal); rect(189, 55, 193, 62, hex('#a8e0dc')); rect(190, 56, 190, 61, a_F.mentaL);
  rect(189, 70, 193, 72, C.k); rect(190, 71, 192, 71, C.metalS); pset(191, 53, Math.sin(t * 3.1) > 0 ? C.verdeL : hex('#3a5a3a'));
  // la pantalla de la pared: casillas de pruebas que se van marcando, y una barra que avanza
  rect(232, 44, 292, 82, C.k); rect(234, 46, 290, 80, hex('#1a2a3a')); const fase = (t * 0.6) % 6;
  for (let k = 0; k < 6; k++) { const x = 238 + (k % 3) * 17, y = 50 + Math.floor(k / 3) * 12; rect(x, y, x + 13, y + 9, hex('#2a3e54')); if (fase > k) { visto(R, x + 3, y + 1, 1); } else if (Math.floor(t * 4) % 2) pset(x + 6, y + 4, C.tealT); }
  rect(238, 75, 286, 77, hex('#2a3e54')); rect(238, 75, 238 + Math.round(48 * Math.min(1, fase / 6)), 77, C.tealT);
  // la mesita blanca, la luz del foco y el empapador acolchado
  a_mesa(R, 92);
  for (let y = 96; y < 180; y++) for (let x = 100; x < 230; x++) if ((x + y) % 4 === 0 && Math.hypot((x - 165) / 1.8, y - 112) < 34) pset(x, y, C.blanco);
  rect(94, 98, 200, 134, a_F.mesaS); rect(95, 99, 199, 133, a_F.empapador); for (let y = 101; y < 133; y += 4) for (let x = 97 + ((y >> 2) % 2) * 2; x < 199; x += 4) pset(x, y, a_F.empapadorS);
  rect(95, 133, 199, 134, a_F.mesaB);
  // el contenedor amarillo y rojo de las agujas, con su tapa y la ranura
  rect(4, 96, 26, 140, C.k); rect(5, 104, 25, 139, C.rojoW); rect(5, 104, 7, 139, a_F.rojoL); rect(22, 104, 25, 139, a_F.rojoS); rect(3, 96, 27, 103, C.k); rect(4, 97, 26, 102, C.amarilloT); rect(8, 99, 20, 100, C.k);
  disco(15, 120, 4, C.blanco); disco(15, 120, 2, C.k); for (const [dx, dy] of [[0, -4], [-4, 3], [4, 3]]) disco(15 + dx, 120 + dy, 1, C.k);
  rect(5, 140, 27, 141, a_F.mesaS);
  // la almohadilla azul, con la mano de la clienta apoyada (manga de la rebeca roja)
  rect(108, 108, 176, 122, C.k); rect(109, 109, 175, 121, hex('#8ab0d8')); rect(109, 109, 175, 110, hex('#a8c8e8')); rect(109, 120, 175, 121, hex('#6a90b8')); for (let x = 112; x < 174; x += 3) pset(x, 112, hex('#7aa0c8'));
  rect(110, 123, 176, 124, a_F.mesaS);
  mano(R, 150, 108, 1, '#c84a4a');
  // la lanceta: un cilindro pequeño con estrías y botón, que baja hasta la yema, pica y sube
  const p = o.pica ?? 0, ly = Math.round(lerp(40, 101, Math.min(1, p)) - (p > 1 ? (p - 1) * 60 : 0));
  if (p > 0 && p < 1.8) { rect(157, ly - 22, 165, ly - 2, C.k); rect(158, ly - 21, 164, ly - 3, C.tealT); rect(158, ly - 21, 159, ly - 3, a_F.tealL); rect(163, ly - 21, 164, ly - 3, C.tealTS); rect(158, ly - 21, 164, ly - 17, C.verdeT); for (let y = ly - 14; y < ly - 4; y += 2) rect(158, y, 164, y, C.tealTS); rect(159, ly - 24, 163, ly - 22, C.k); rect(160, ly - 2, 162, ly, C.metalD);
    if (p > 0.95 && p < 1.1) for (const [dx, dy] of [[-6, 0], [6, 0], [-4, -4], [4, -4]]) pset(161 + dx, ly + dy, C.k); }
  // la gota que brota en la yema
  const g = o.gota ?? 0; if (g > 0) { const r = Math.round(1 + g * 2); disco(161, 104 - r, r, C.sangreS); disco(161, 104 - r, Math.max(1, r - 1), C.sangre); pset(160, 103 - r, C.sangreL); }
  // la caja de cartuchos abierta, con la tapa levantada y los cartuchos en fila
  rect(30, 120, 80, 150, C.k); rect(31, 121, 79, 149, C.blanco); rect(31, 121, 79, 126, C.tealT); rect(31, 127, 79, 127, C.tealTS); logoTheranos(R, 55, 139, 0.6, t);
  poligono([[30, 120], [80, 120], [74, 110], [36, 110]], C.k); poligono([[32, 119], [78, 119], [73, 111], [37, 111]], hex('#e8f4f4'));
  for (let k = 0; k < 6; k++) { rect(36 + k * 7, 114, 40 + k * 7, 119, C.k); rect(37 + k * 7, 115, 39 + k * 7, 118, [C.tealT, C.verdeT, C.amarilloT][k % 3]); pset(37 + k * 7, 115, C.blanco); }
  rect(32, 150, 81, 151, a_F.mesaS);
  // la gasa doblada, el sobre de alcohol abierto con su toallita, la tirita y un bolígrafo
  rect(96, 140, 112, 150, C.k); rect(97, 141, 111, 149, hex('#f8f8fa')); for (let k = 0; k < 3; k++) rect(99, 143 + k * 2, 109, 143 + k * 2, hex('#e0e0e8')); rect(97, 151, 113, 151, a_F.mesaS);
  poligono([[118, 146], [136, 146], [136, 158], [122, 158], [118, 154]], C.k); poligono([[119, 147], [135, 147], [135, 157], [122, 157], [119, 154]], hex('#e8eef4')); rect(126, 149, 128, 155, hex('#3a7ad8')); rect(124, 151, 130, 153, hex('#3a7ad8'));
  rect(140, 152, 150, 158, hex('#c8d8e8')); rect(141, 153, 149, 157, C.blanco); pset(145, 155, hex('#f0b0b8')); pset(146, 155, hex('#f0b0b8'));
  rect(196, 150, 222, 156, C.k); rect(197, 151, 221, 155, hex('#e8c8a0')); rect(205, 151, 213, 155, hex('#f4e0c8')); for (const x of [199, 202, 216, 219]) pset(x, 153, hex('#c8a880')); rect(197, 157, 223, 157, a_F.mesaS);
  linea(160, 168, 186, 160, C.k); linea(160, 167, 186, 159, hex('#3a3a6a')); rect(184, 158, 187, 160, C.metalS);
  // el café de la enfermera, en su vaso de papel, que humea
  { const x = 206, y = 137; poligono([[x, y - 12], [x + 10, y - 12], [x + 9, y], [x + 1, y]], C.k); poligono([[x + 1, y - 11], [x + 9, y - 11], [x + 8, y - 1], [x + 2, y - 1]], C.blanco);
    rect(x + 2, y - 8, x + 8, y - 5, hex('#c8a070')); rect(x, y - 14, x + 10, y - 12, C.k); rect(x + 1, y - 13, x + 9, y - 13, hex('#4a3a34')); rect(x + 1, y + 1, x + 10, y + 1, a_F.mesaS);
    for (let k = 0; k < 6; k++) { const v = ((t * 0.45 + k / 6) % 1), sx = Math.round(x + 5 + Math.sin(v * 7 + k) * 2 + v * 2), sy = Math.round(y - 16 - v * 24); if (v < 0.85) { pset(sx, sy, hex('#dce4ea')); if (v > 0.25 && v < 0.7) pset(sx + 1, sy, hex('#c8d4dc')); } } }
  // la caja de guantes, con uno asomando, y la bandeja de tubitos con un brillo que pasa por el metal
  rect(250, 104, 298, 122, C.k); rect(251, 105, 297, 121, hex('#4a7ad8')); rect(251, 105, 297, 106, hex('#6a9ae8')); rect(262, 105, 286, 109, C.k); poligono([[268, 106], [280, 106], [278, 98], [272, 97]], hex('#a88ae8')); rect(272, 97, 278, 98, hex('#c8b0f0'));
  rect(254, 113, 262, 119, C.blanco); R.dibujo(a_PICTO.cruz, 257, 115, 1, { '#': hex('#4a7ad8') }); rect(252, 123, 299, 123, a_F.mesaS);
  rect(232, 128, 300, 150, C.k); rect(233, 129, 299, 149, C.metalL); rect(233, 129, 299, 130, C.blanco); rect(233, 148, 299, 149, C.metalS);
  { const b = ((t % 4.4) / 0.9); if (b < 1) { const bx = Math.round(233 + b * 70); for (let y = 131; y < 148; y++) { const x = bx - (y - 131) / 3; if (x > 233 && x < 299) { pset(Math.round(x), y, C.blanco); if (x + 1 < 299) pset(Math.round(x) + 1, y, C.blanco); } } } }
  for (let k = 0; k < 6; k++) tubito(R, 240 + k * 10, 146, 1, k < 2 ? 1 : 0, [C.verdeT, C.amarilloT, C.tealT, C.rojoW, C.verdeT, C.amarilloT][k]);
  rect(234, 151, 301, 152, a_F.mesaS);
  // la mano de la enfermera que acerca el tubito (del tamaño de una uña) y lo llena
  const rc = o.recoge ?? 0; if (rc > 0) { const tx = Math.round(lerp(340, 186, Math.min(1, rc * 1.6))), ll = Math.max(0, Math.min(1, rc * 1.6 - 0.6)); tubito(R, tx - 12, 108, 1, ll, C.verdeT); mano(R, tx, 104, -1, '#4aa8a0'); }
}
// el inserto del análisis de siempre, de objetos, en la cabina de extracciones de la farmacia: el tubo de goma que
// llega de la aguja (fuera del plano, en el brazo de la persona), con la sangre que corre, y el portatubos encajado en
// el tubo que se llena; la gradilla de alambre con los tubos de vena que se llenan (o.tubos: cuántos, 0–3), con su
// etiqueta y su tapón de color; la mano canónica de la enfermera que sujeta el que se llena, y la cucharadita al lado
// (o.cuchara), para comparar. Detrás, la mampara de la cabina (el cartel del brazo con las venas, el contenedor de
// agujas, las cajas de guantes, el gel que gotea, el compresor de repuesto colgado) y, por encima, la farmacia
// desenfocada con sus plafones, góndolas, la cruz que late y gente lejana (las escenas pintan sus clientes desenfocados
// sobre esos tonos); el soporte del que cuelga el reloj (la escena lo pone en (140, 32)). En la encimera: las
// toallitas, el algodón, las gasas, el cronómetro que cuenta, el compresor, la hoja de etiquetas, el esparadrapo y un
// bolígrafo
export function insertoTubos(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, n = o.tubos ?? 0, act = Math.min(2, Math.floor(n)), tx = 200 + act * 26;
  // la farmacia desenfocada, por encima de la mampara, y el soporte del reloj que cuelga del techo
  b_tienda(R, t, 0, 69, 3, [62, 30]);
  for (const x of [134, 146]) rect(x, 0, x, 19, b_C.cable); rect(130, 19, 150, 21, b_C.perfilS); rect(131, 19, 149, 19, b_C.perfilL); rect(139, 22, 141, 23, b_C.perfilS);
  // la mampara de la cabina
  b_mampara(R, 0, 319, 66, 121, { junta: 172, paso: 96 });
  // el cartel del brazo con las venas (sin letras): el marco, las chinchetas, el brazo, la diana del pinchazo y unas rayas
  rect(10, 74, 52, 114, C.k); rect(11, 75, 51, 113, hex('#fbfaf4')); rect(11, 75, 51, 79, C.tealT); rect(11, 112, 51, 113, hex('#e4e2d8'));
  poligono([[16, 111], [28, 111], [42, 84], [36, 80]], b_C.piel); poligono([[23, 111], [28, 111], [42, 84], [39, 82]], hex('#dca070')); disco(40, 79, 3.5, b_C.piel); for (const [dx, dy] of [[-3, -3], [-1, -5], [1, -5], [3, -4]]) rect(40 + dx, 79 + dy - 1, 40 + dx, 79 + dy + 1, b_C.piel);
  linea(20, 110, 37, 84, C.sangre); linea(21, 110, 38, 84, C.sangre); linea(25, 110, 39, 86, hex('#4a6ac8')); linea(25, 98, 30, 91, hex('#4a6ac8')); linea(23, 101, 19, 94, C.sangre);
  for (let a = 0; a < 6.28; a += 0.5) pset(Math.round(29 + Math.cos(a) * 4), Math.round(96 + Math.sin(a) * 4), C.rojo); pset(29, 96, C.rojo);
  for (let k = 0; k < 3; k++) rect(14, 100 + k * 4, 18 + (k * 7) % 12, 100 + k * 4, C.grisL);
  for (const x of [13, 49]) { disco(x, 77, 1.5, C.k); pset(x, 77, x < 30 ? C.rojo : C.amarilloT); }
  // el contenedor amarillo de agujas en su soporte, con la tapa roja y el símbolo de peligro
  rect(60, 78, 84, 80, C.metalD); rect(58, 81, 86, 110, C.k); rect(59, 82, 85, 109, C.amarilloT); rect(80, 82, 85, 109, b_mezcla(C.amarilloT, C.k, 0.2)); rect(59, 82, 63, 109, b_mezcla(C.amarilloT, C.blanco, 0.3));
  rect(57, 81, 87, 87, C.k); rect(58, 82, 86, 86, C.rojoW); rect(66, 83, 78, 84, C.k); rect(58, 82, 86, 82, b_mezcla(C.rojoW, C.blanco, 0.35));
  for (let k = 0; k < 3; k++) { const a = -Math.PI / 2 + k * 2.094; disco(72 + Math.cos(a) * 3, 97 + Math.sin(a) * 3, 2, C.k); } disco(72, 97, 1.5, C.amarilloT); pset(72, 97, C.k);
  // las cajas de guantes en su soporte, con los dedos azules y morados que asoman
  rect(94, 76, 152, 77, C.metalD); rect(94, 100, 152, 101, C.metalD); rect(94, 76, 95, 101, C.metalD); rect(151, 76, 152, 101, C.metalD);
  for (const [x, c] of [[97, hex('#4a8ae8')], [124, hex('#8a5ad8')]]) { rect(x, 79, x + 24, 98, C.k); rect(x + 1, 80, x + 23, 97, C.blanco); rect(x + 1, 92, x + 23, 97, c); rect(x + 19, 80, x + 23, 97, hex('#e4e8ee'));
    rect(x + 6, 83, x + 17, 86, C.k); for (let k = 0; k < 4; k++) rect(x + 7 + k * 3, 81 - (k % 2), x + 8 + k * 3, 85, c); rect(x + 1, 80, x + 18, 80, hex('#ffffff')); }
  // el gel de manos en la pared, que suelta una gota de vez en cuando
  rect(158, 74, 170, 98, C.k); rect(159, 75, 169, 97, C.blanco); rect(166, 75, 169, 97, hex('#dfe4ea')); rect(159, 83, 169, 90, hex('#9ad0e8')); rect(159, 83, 169, 83, hex('#c4e6f4')); rect(162, 98, 166, 100, C.grisS); rect(163, 100, 165, 102, C.grisS);
  { const u = (t % 3.4) / 3.4; if (u > 0.55) { const gy = Math.round(103 + (u - 0.55) * 40); if (gy < 121) { pset(164, gy, hex('#9ad0e8')); pset(164, gy + 1, hex('#c4e6f4')); } } }
  // una percha con el compresor de repuesto
  disco(300, 76, 1.5, C.metalD); linea(300, 77, 296, 82, hex('#3a6ac8')); linea(300, 77, 304, 84, hex('#3a6ac8')); rect(295, 82, 297, 90, hex('#3a6ac8')); rect(303, 84, 305, 92, hex('#3a6ac8'));
  // la encimera moteada, con la luz del plafón encima, y el zócalo de acero de la mampara
  rect(0, 119, 319, 121, b_C.acero); rect(0, 119, 319, 119, C.metalL); rect(0, 121, 319, 121, C.metalS);
  b_encimera(R, 122, 179, b_C.banco, b_C.bancoS, b_C.bancoL, 0); b_luz(R, 60, 124, 170, 179, -0.25, 0.28);
  // la gradilla de alambre: el marco de atrás, los tubos y el travesaño de delante
  b_sombra(R, 226, 130, 54, 2, 0.8);
  rect(176, 98, 274, 100, C.k); rect(177, 99, 273, 99, C.metalL); for (const x of [176, 271]) { rect(x, 98, x + 3, 129, C.k); rect(x + 1, 99, x + 2, 128, C.metal); }
  rect(174, 126, 276, 129, C.k); rect(175, 127, 275, 127, C.metalL); rect(175, 128, 275, 128, C.metalS);
  for (let k = 0; k < 3; k++) { const x = 200 + k * 26; b_tubo(R, x, 56, 126, 7, Math.max(0, Math.min(1, n - k)), [C.rojoW, C.tealT, hex('#8a5ad8')][k], { tapon: 10 }); }
  // un destello que recorre los cristales de vez en cuando
  { const u = (t % 5) / 5 * 260 - 40; for (let k = 0; k < 3; k++) { const x = 200 + k * 26; if (Math.abs(u - x) < 6) for (let y = 60; y < 120; y += 2) { const xx = x - 4 + Math.round((u - x + 6) / 2) + ((y >> 1) % 2), c = R.pget(xx, y); if (c !== C.k) pset(xx, y, b_mezcla(c, C.blanco, 0.6)); } } }
  rect(176, 110, 274, 116, C.k); rect(177, 111, 273, 115, C.metalL); rect(177, 115, 273, 115, C.metalS); rect(177, 111, 273, 111, C.blanco); for (let k = 0; k < 4; k++) rect(186 + k * 26, 112, 188 + k * 26, 114, C.metal);
  // el portatubos de plástico con la aguja de atrás, encajado en el tubo que se llena
  rect(tx - 9, 32, tx + 9, 46, C.k); rect(tx - 8, 33, tx + 8, 45, hex('#e8eef4')); rect(tx + 4, 33, tx + 8, 45, hex('#c8d2dc')); rect(tx - 7, 34, tx - 6, 44, C.blanco);
  rect(tx - 12, 44, tx + 12, 46, C.k); rect(tx - 11, 45, tx + 11, 45, hex('#f4f8fc')); rect(tx - 3, 26, tx + 3, 32, C.k); rect(tx - 2, 27, tx + 2, 31, hex('#f0f4f8')); rect(tx - 1, 27, tx + 1, 27, C.verdeT);
  // el tubo de goma, que cuelga desde la izquierda (desde el brazo) y sube hasta el portatubos; la sangre corre por él
  { const P = [], B = (u) => { const a = 1 - u; return [a * a * a * -6 + 3 * a * a * u * 120 + 3 * a * u * u * (tx - 6) + u * u * u * (tx - 2), a * a * a * 113 + 3 * a * a * u * 124 + 3 * a * u * u * 136 + u * u * u * 26]; };
    for (let i = 0; i <= 40; i++) P.push(B(i / 40));
    const corre = n > 0 && n < 3, lleno = n > 0;
    for (let i = 0; i < 40; i++) for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) linea(P[i][0] + dx, P[i][1] + dy, P[i + 1][0] + dx, P[i + 1][1] + dy, C.k);
    for (let i = 0; i < 40; i++) linea(P[i][0], P[i][1], P[i + 1][0], P[i + 1][1], (x, y, k) => (!lleno ? hex('#f2dade') : corre && ((i * 3 + k + Math.round(t * 30)) % 7) < 2 ? C.sangreL : C.sangre)); }
  if (n > 0 && n < 3) mano(R, 200 + Math.floor(n) * 26 + 18, 92, -1, '#4aa8a0');
  // en la encimera: las toallitas de alcohol (una abierta), el bote de algodón, las gasas, el cronómetro, el compresor,
  // las etiquetas, el esparadrapo y el bolígrafo
  b_sombra(R, 22, 147, 16, 2, 0.84);
  rect(8, 134, 24, 146, C.k); rect(9, 135, 23, 145, C.blanco); rect(9, 135, 23, 137, C.tealT); rect(15, 139, 17, 143, C.tealT); rect(14, 140, 18, 142, C.tealT);
  rect(22, 138, 38, 149, C.k); rect(23, 139, 37, 148, C.blanco); for (let x = 23; x < 38; x += 2) pset(x, 139, C.k); rect(26, 141, 34, 147, hex('#e8eef2')); rect(26, 141, 34, 141, hex('#f8fbfc'));
  b_sombra(R, 296, 131, 12, 2, 0.8); rect(284, 104, 308, 130, C.k); rect(285, 106, 307, 129, b_C.vidrio); rect(284, 101, 308, 105, C.k); rect(285, 102, 307, 104, C.metal); rect(285, 102, 307, 102, C.metalL);
  for (let k = 0; k < 7; k++) { const cx = 289 + (k % 4) * 5 + (k > 3 ? 2 : 0), cy = 125 - Math.floor(k / 4) * 5; disco(cx, cy, 3, hex('#dfe4ea')); disco(cx - 0.5, cy - 0.5, 2.2, C.blanco); } rect(303, 107, 304, 127, C.blanco);
  if (!o.cuchara) { b_sombra(R, 72, 152, 24, 2, 0.84); rect(48, 138, 96, 151, C.k); rect(49, 139, 95, 150, hex('#f4f2ea')); rect(49, 139, 55, 150, hex('#e2dccc')); rect(58, 141, 93, 148, hex('#dceaf2')); rect(58, 141, 93, 141, C.blanco);
    poligono([[64, 142], [70, 145], [64, 148]], C.verdeL); poligono([[76, 142], [70, 145], [76, 148]], C.verdeL); rect(69, 144, 71, 146, C.verde); linea(71, 145, 90, 145, C.metalS); for (let a = 0; a < 6.28; a += 0.4) pset(Math.round(84 + Math.cos(a) * 4), Math.round(145 + Math.sin(a) * 2), hex('#e8b8c0'));
    // el cronómetro de la enfermera, que cuenta los segundos
    b_sombra(R, 116, 170, 15, 2, 0.82); rect(102, 156, 130, 170, C.k); rect(103, 157, 129, 169, hex('#f0f2f4')); rect(105, 159, 127, 166, hex('#24343a')); rect(103, 168, 129, 169, hex('#c8ccd4')); rect(112, 154, 120, 156, C.k); rect(113, 155, 119, 155, C.rojoW);
    R.numero(String(Math.floor(t) % 60).padStart(2, '0'), 116, 165, { centro: true, color: hex('#7ae0a8'), sombra: false, fina: true }); if (Math.floor(t * 2) % 2) pset(126, 160, hex('#7ae0a8')); }
  b_sombra(R, 154, 168, 26, 3, 0.85); { let px = 0, py = 0; for (let i = 0; i <= 48; i++) { const u = i / 48, x = 136 + u * 52, y = 164 + Math.sin(u * 7.5) * 4 + u * 2; if (i) { linea(px, py - 2, x, y - 2, C.k); linea(px, py + 2, x, y + 2, C.k); } px = x; py = y; }
    for (let i = 0; i <= 48; i++) { const u = i / 48, x = 136 + u * 52, y = 164 + Math.sin(u * 7.5) * 4 + u * 2; rect(Math.round(x), Math.round(y) - 1, Math.round(x), Math.round(y) + 1, hex('#4a8ae8')); pset(Math.round(x), Math.round(y) - 1, hex('#8ab8f4')); } }
  b_sombra(R, 299, 157, 18, 2, 0.84); rect(281, 138, 317, 155, C.k); rect(282, 139, 316, 154, C.blanco); for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) { const x = 284 + i * 16, y = 141 + j * 5; rect(x, y, x + 13, y + 3, hex('#f0f2f4')); rect(x, y, x + 1, y + 3, [C.rojoW, C.tealT, hex('#8a5ad8')][j]); for (let b = 3; b < 13; b += 2) if (h(b, j * 2 + i, 333) < 0.6) rect(x + b, y + 1, x + b, y + 2, C.k); }
  b_sombra(R, 300, 175, 9, 2, 0.8); disco(299, 169, 7, C.k); disco(299, 169, 6, C.blanco); disco(299, 169, 6, (x, y, r) => (r > 0.8 ? hex('#e4e8ec') : C.blanco)); disco(299, 169, 3, C.k); disco(299, 169, 2, b_C.banco); pset(296, 165, C.blanco);
  b_sombra(R, 252, 174, 22, 1, 0.84); linea(232, 173, 270, 167, C.k); linea(232, 172, 270, 166, C.k); linea(233, 171, 268, 166, hex('#2a4fa8')); linea(233, 172, 268, 167, hex('#4a78d0')); rect(268, 165, 272, 167, C.metalL); pset(232, 173, C.metalD);
  b_sombra(R, 236, 148, 16, 2, 0.84); for (let k = 0; k < 3; k++) { rect(222 + k, 138 - k * 2, 248 + k, 146 - k * 2, C.k); rect(223 + k, 139 - k * 2, 247 + k, 145 - k * 2, C.blanco); for (let x = 225 + k; x < 247; x += 3) pset(x, 142 - k * 2, hex('#e0e4ea')); }
  // la cucharadita, para comparar
  if (o.cuchara) b_cuchara(R, 104, 152, 14, 8, 44, 156, t);
}
// la máquina que cuenta moléculas, por dentro: placas atornilladas con su bisel; arriba, el módulo láser con su franja de
// aviso y el triángulo, el ventilador que gira, el cable de fibra naranja que llega al detector (x 140–180, y 30–66, con
// sus aletas de refrigeración y el ojo verde que late en (160, 50), apuntando al capilar) y la placa de circuitos con
// chips, condensadores y lucecitas (detrás del contador que pone la escena, en x 188–228); en el centro, el capilar de
// cristal (y 64–116) por el que corre el plasma en vetas (más deprisa en el centro), con el haz del detector y moléculas de
// formas distintas (discos, anticuerpos en «Y», anillos, cadenas) entre y 76 y 104; abajo, la bomba peristáltica con su
// rotor que gira y empuja la muestra por el tubo, las luces de estado y el caudal, otra placa con su ventilador, y la
// pantalla con la traza que corre (un pico por molécula) y el histograma de barras. o.rara: la molécula escasa (dorada)
// que hay que encontrar entre muchas grises, como una aguja en un pajar (las barras se quedan casi a cero)
export function insertoMoleculas(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R;
  rect(0, 0, 319, 179, hex('#121a26'));
  c_placa(R, 1, 1, 133, 62); c_placa(R, 135, 1, 185, 62, hex('#1a2433')); c_placa(R, 187, 1, 275, 62); c_placa(R, 277, 1, 318, 62);
  c_placa(R, 1, 117, 123, 178); c_placa(R, 125, 117, 201, 178, hex('#1a2433')); c_placa(R, 203, 117, 318, 178);
  for (let k = 0; k < 4; k++) rect(286, 48 + k * 3, 309, 48 + k * 3, hex('#0c121c'));   // la rejilla de ventilación, bajo Atom
  // el módulo láser: aletas, la franja de aviso, el triángulo y la apertura con su luz
  rect(12, 30, 84, 50, C.k); rect(13, 31, 83, 49, hex('#3a4658')); rect(13, 31, 83, 32, hex('#5a6a7e')); for (let x = 16; x < 80; x += 4) rect(x, 25, x + 1, 29, hex('#4a5668'));
  for (let y = 42; y <= 47; y++) for (let x = 15; x <= 34; x++) pset(x, y, ((x + y) >> 1) % 2 ? C.amarilloT : C.k);
  poligono([[44, 45], [50, 34], [56, 45]], C.k); poligono([[46, 44], [50, 36], [54, 44]], C.amarilloT); pset(50, 40, C.k); pset(49, 41, C.k); pset(51, 41, C.k); pset(50, 42, C.k);
  rect(84, 35, 90, 44, C.k); rect(85, 36, 89, 43, C.metalS); disco(89, 39.5, 1.5, Math.sin(t * 6) > 0 ? hex('#3ae07a') : hex('#1a6a3a'));
  for (let k = 0; k < 3; k++) pset(62 + k * 4, 36, Math.floor(t * 3 + k) % 3 === 0 ? C.rojo : hex('#4a2a2a'));
  // el ventilador que gira, con su rejilla
  { const cx = 111, cy = 37; rect(97, 23, 125, 51, C.k); rect(98, 24, 124, 50, hex('#2a3646')); disco(cx, cy, 12, C.k); disco(cx, cy, 11, hex('#141c28'));
    for (let b = 0; b < 5; b++) { const a = t * 9 + b * 1.2566; poligono([[cx, cy], [Math.round(cx + Math.cos(a) * 10), Math.round(cy + Math.sin(a) * 10)], [Math.round(cx + Math.cos(a + 0.5) * 10), Math.round(cy + Math.sin(a + 0.5) * 10)]], hex('#6a7a8e')); }
    disco(cx, cy, 3, C.k); disco(cx, cy, 2, C.metalS); for (let y = 28; y <= 46; y += 4) for (let x = 100; x <= 122; x += 2) if (Math.hypot(x - cx, y - cy) < 12) pset(x, y, hex('#3a4658'));
    for (const [x, y] of [[99, 25], [122, 25], [99, 48], [122, 48]]) pset(x, y, C.metalL); }
  // el cable de fibra naranja que va del láser al detector
  for (let i = 0; i <= 50; i++) { const s = i / 50, x = Math.round(lerp(90, 140, s)), y = Math.round(lerp(42, 56, s) + Math.sin(s * Math.PI) * 9); pset(x, y, hex('#e88a3a')); pset(x, y + 1, hex('#b05a24')); }
  // el detector: aletas de refrigeración, la carcasa con tornillos, el ojo que late y la boquilla con el haz
  rect(142, 15, 178, 29, C.k); for (let x = 143; x < 178; x += 3) { rect(x, 16, x + 1, 28, hex('#8a96a6')); pset(x, 16, hex('#b8c4d0')); }
  rect(140, 30, 180, 66, C.k); rect(141, 31, 179, 65, C.metalS); rect(141, 31, 179, 32, C.metal); rect(141, 64, 179, 65, C.metalD); for (const [x, y] of [[143, 34], [177, 34], [143, 61], [177, 61]]) pset(x, y, C.metalL);
  disco(160, 50, 10, C.k); disco(160, 50, 9, hex('#2a3446')); disco(160, 50, 8, C.k); disco(160, 50, 7, hex('#0a2a18')); disco(160, 50, 4, hex('#12402a')); disco(160, 50, 3, Math.sin(t * 8) > 0 ? hex('#3ae07a') : hex('#1a6a3a')); pset(157, 47, C.blanco); pset(156, 48, hex('#8ab0a0'));
  pset(145, 37, Math.floor(t * 2) % 2 ? C.verdeL : hex('#2a4a2a')); pset(148, 37, C.amarilloT);
  rect(155, 60, 165, 66, C.k); rect(156, 61, 164, 65, C.metalD); rect(158, 65, 162, 66, hex('#1a6a3a'));
  // la placa de circuitos (por detrás del contador de la escena): pistas, chips, condensadores y lucecitas
  rect(189, 18, 271, 61, C.k); rect(190, 19, 270, 60, hex('#1e4a32'));
  for (let k = 0; k < 8; k++) { const y = 22 + k * 5, x1 = 196 + Math.round(h(k, 1, 175) * 70); rect(192, y, x1, y, hex('#2e6a46')); rect(x1, y, x1, y + 3, hex('#2e6a46')); pset(x1, y + 3, C.oroS); }
  for (const [x, y, w, hh] of [[252, 23, 14, 11], [234, 46, 16, 10], [196, 46, 10, 8]]) { rect(x, y, x + w, y + hh, C.k); rect(x + 1, y + 1, x + w - 1, y + hh - 1, hex('#22262e')); for (let i = x + 1; i < x + w; i += 2) { pset(i, y - 1, C.metalL); pset(i, y + hh + 1, C.metalL); } pset(x + 2, y + 2, hex('#4a4e58')); }
  for (const [x, c] of [[214, hex('#3a5ab8')], [222, hex('#3a5ab8')], [262, hex('#c8a040')]]) { disco(x, 56, 2.5, C.k); disco(x, 56, 1.5, c); pset(x - 1, 55, C.blanco); }
  for (let k = 0; k < 4; k++) pset(256 + k * 3, 41, Math.floor(t * 4 + k * 1.7) % 3 ? hex('#2a4a2a') : C.verdeL); pset(268, 41, Math.sin(t * 5) > 0.6 ? C.rojo : hex('#4a2a2a'));
  for (let x = 192; x < 270; x += 3) pset(x, 59, C.oro);
  // el capilar de cristal y el plasma que corre en vetas (más deprisa en el centro)
  rect(0, 64, 319, 69, C.k); rect(0, 65, 319, 65, hex('#5a7890')); rect(0, 66, 319, 66, hex('#c8e0f0')); rect(0, 67, 319, 69, hex('#8aa8c0'));
  rect(0, 70, 319, 110, hex('#f0d890')); rect(0, 70, 319, 71, hex('#c8b070')); rect(0, 109, 319, 110, hex('#c8b070'));
  rect(0, 111, 319, 116, C.k); rect(0, 111, 319, 113, hex('#8aa8c0')); rect(0, 114, 319, 114, hex('#c8e0f0'));
  for (const y of [74, 79, 85, 91, 97, 103, 107]) { const v = 18 + 52 * (1 - ((y - 90) / 20) ** 2); for (let k = 0; k < 14; k++) { const x = Math.round(((k * 26 + h(k, y, 43) * 14 + t * v) % 364) - 22); rect(x, y, x + 5 + (k % 3) * 2, y, hex('#f6e6b0')); } }
  for (let y = 72; y < 109; y++) for (let x = 157; x <= 163; x++) if (((x + y) & 1) && (Math.abs(x - 160) < 2 || Math.sin(t * 8) > 0)) pset(x, y, hex('#e4f0b4'));   // el haz del detector
  // las abrazaderas que sujetan el capilar
  for (const cx of [44, 276]) { rect(cx - 6, 58, cx + 6, 69, C.k); rect(cx - 5, 59, cx + 5, 68, C.metalS); rect(cx - 5, 59, cx + 5, 59, C.metal); rect(cx - 6, 111, cx + 6, 122, C.k); rect(cx - 5, 112, cx + 5, 121, C.metalS); pset(cx, 62, C.metalL); pset(cx, 118, C.metalL); }
  // las moléculas de la muestra, de formas distintas
  const tipos = [[hex('#f8ecc8'), 'disco'], [hex('#3a6ad8'), 'y'], [hex('#3a9a4a'), 'anillo'], [hex('#e8803a'), 'cadena'], [hex('#8a8a9e'), 'punto']];
  for (let k = 0; k < 64; k++) { const [c, f] = o.rara ? [hex('#a8a8b8'), 'punto'] : tipos[k % tipos.length], x = Math.round(((h(k, 1, 42) * 360 + t * (20 + k % 9)) % 360) - 20), y = Math.round(76 + h(k, 2, 42) * 28 + Math.sin(t * 2 + k) * 2); c_molecula(R, x, y, f, c); }
  if (o.rara) { const x = Math.round(((t * 18) % 360) - 20), y = 90 + Math.round(Math.sin(t * 3) * 6); disco(x, y, 3, C.oroL); disco(x, y, 2, C.oro); if (Math.sin(t * 6) > 0) for (let r = 4; r < 7; r++) { pset(x + r, y, C.oroL); pset(x - r, y, C.oroL); pset(x, y - r, C.oroL); } }
  for (let y = 66; y < 76; y += 2) pset(160, y, hex('#3ae07a'));
  // la bomba peristáltica: el rotor con sus tres rodillos aprieta el tubo y empuja la muestra hacia el capilar
  { const px = 36, py = 147; disco(px, py, 19, C.k); disco(px, py, 18, hex('#2a3446')); for (const r of [13, 14, 15]) R.anillo(px, py, r, r === 14 ? hex('#d8a878') : hex('#8a5a30'));
    for (let k = 0; k < 3; k++) { const a = t * 3 + k * 2.094, rx = Math.round(px + Math.cos(a) * 9), ry = Math.round(py + Math.sin(a) * 9); linea(px, py, rx, ry, C.metalD); disco(rx, ry, 3, C.k); disco(rx, ry, 2, C.metalL); disco(Math.round(px + Math.cos(a) * 14), Math.round(py + Math.sin(a) * 14), 1.5, hex('#6a4020')); }
    disco(px, py, 3, C.k); disco(px, py, 2, C.metal); pset(px - 1, py - 1, C.metalL);
    rect(48, 117, 52, 140, C.k); rect(49, 117, 51, 140, hex('#d8a878')); for (let k = 0; k < 4; k++) { const y = Math.round(139 - ((t * 18 + k * 6) % 23)); rect(49, y, 51, y + 1, C.sangre); } }
  // las luces de estado y el caudal
  for (let k = 0; k < 4; k++) { const on = k === Math.floor(t * 2) % 4; disco(78 + k * 10, 128, 3, C.k); disco(78 + k * 10, 128, 2, on ? hex('#5ab0e8') : hex('#2a3a4a')); if (on) pset(77 + k * 10, 127, C.blanco); }
  rect(70, 138, 116, 170, C.k); rect(71, 139, 115, 169, hex('#0a1a10')); R.numero(String(41 + Math.floor(t * 1.5) % 3), 93, 156, { color: hex('#5ae08a'), centro: true, sombra: false });
  for (let k = 0; k < 6; k++) { const a = 2 + Math.round((0.5 + 0.5 * Math.sin(t * 3 + k)) * 6); rect(76 + k * 6, 166 - a, 79 + k * 6, 166, hex('#2a8a4a')); }
  // la otra placa: chips, condensadores y su ventilador
  rect(130, 122, 158, 172, hex('#1e4a32')); for (let k = 0; k < 6; k++) rect(132, 126 + k * 8, 156, 126 + k * 8, hex('#2e6a46'));
  rect(134, 130, 146, 140, C.k); rect(135, 131, 145, 139, hex('#22262e')); rect(136, 150, 152, 158, C.k); rect(137, 151, 151, 157, hex('#22262e')); for (const y of [146, 164]) { disco(140, y, 2.5, C.k); disco(140, y, 1.5, hex('#3a5ab8')); }
  pset(154, 132, Math.floor(t * 3) % 2 ? C.verdeL : hex('#2a4a2a'));
  { const cx = 180, cy = 147; disco(cx, cy, 14, C.k); disco(cx, cy, 13, hex('#141c28')); for (let b = 0; b < 6; b++) { const a = -t * 7 + b * 1.047; poligono([[cx, cy], [Math.round(cx + Math.cos(a) * 12), Math.round(cy + Math.sin(a) * 12)], [Math.round(cx + Math.cos(a + 0.42) * 12), Math.round(cy + Math.sin(a + 0.42) * 12)]], hex('#5a6a7e')); } disco(cx, cy, 3, C.k); disco(cx, cy, 2, C.metalS); }
  // la pantalla: la traza que corre (un pico por molécula que pasa) y el histograma de barras
  rect(206, 120, 314, 172, C.k); rect(208, 122, 312, 170, hex('#0a1a2a'));
  for (let x = 212; x < 310; x += 8) for (let y = 126; y < 168; y += 4) pset(x, y, hex('#12283a'));
  { let ppx = 210, ppy = 142; for (let x = 210; x <= 310; x++) { const g = (x + t * 50) / 26, fq = g - Math.floor(g), alto = o.rara ? (h(Math.floor(g), 2, 44) > 0.9 ? 8 : 1) : 4 + 8 * h(Math.floor(g), 1, 44), y = Math.round(142 - (Math.abs(fq - 0.5) < 0.08 ? alto * (1 - Math.abs(fq - 0.5) / 0.08) : 0) + (h(x, Math.floor(t * 8), 45) < 0.2 ? 1 : 0)); linea(ppx, ppy, x, y, hex('#5ae08a')); ppx = x; ppy = y; } }
  rect(212, 168, 308, 168, hex('#3a5a7a'));
  const vals = o.rara ? [0.08, 0, 0.05, 0] : [0.8, 0.55, 0.42, 0.66]; vals.forEach((v, k) => { const a = Math.round(20 * Math.min(1, v * (0.6 + 0.4 * Math.abs(Math.sin(t + k))))), col = o.rara ? C.oro : tipos[k][0], x = 218 + k * 24; if (a > 0) { rect(x, 167 - a, x + 14, 167, col); rect(x, 167 - a, x + 14, 167 - a, C.blanco); } });
}
// la gota frente a la cucharadita, en la cabina de extracciones: a la izquierda la cucharadita llena, apoyada en la
// encimera; a la derecha, la mano canónica (con su manga hasta el borde) con la gota en la yema y unas ondas que la
// señalan; entre las dos, «÷ 100» (el signo dibujado: la fuente no lo tiene). Detrás, la mampara con su trama, una caja
// de guantes y el contenedor de agujas; el panel alto de la derecha, donde la escena cuelga el reloj (282, 76); por
// encima, la farmacia desenfocada (plafones, góndolas, la cruz que late, gente lejana: las escenas pintan sus clientes
// sobre esos tonos). En la encimera, la caja de lancetas, la bandeja con tubitos, el pinchador, la toallita abierta y
// el algodón con su puntito. o.tejido (0–1): gotitas transparentes del líquido de los tejidos que se acercan y se
// mezclan con la gota
export function gotaCuchara(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  // la farmacia desenfocada por encima de la mampara
  b_tienda(R, t, 0, 87, 8, [30, 44]);
  // el panel alto de la derecha (en él cuelga el reloj de la escena), con una ficha clavada y una percha
  rect(258, 48, 319, 139, b_C.tela); for (let y = 52; y <= 139; y += 2) for (let x = 258 + ((y >> 1) & 1) * 2; x <= 319; x += 4) pset(x, y, b_C.telaS);
  rect(258, 48, 260, 139, b_C.perfil); rect(258, 48, 258, 139, b_C.perfilL); rect(260, 48, 260, 139, b_C.perfilS); rect(258, 46, 319, 49, b_C.perfil); rect(258, 46, 319, 46, b_C.perfilL); rect(258, 49, 319, 49, b_C.perfilS); rect(257, 45, 319, 45, b_C.perfilS);
  rect(296, 94, 314, 114, C.k); rect(297, 95, 313, 113, hex('#fbfaf4')); R.icono('gota', 302, 98, C.sangre, hex('#fbfaf4')); for (let k = 0; k < 2; k++) rect(299, 107 + k * 3, 311 - k * 4, 107 + k * 3, C.grisL); disco(305, 95, 1, C.rojo);
  // la mampara de la cabina
  b_mampara(R, 0, 257, 84, 139, { junta: 70, paso: 92 });
  // la caja de guantes en su soporte y el contenedor de agujas
  rect(14, 92, 48, 93, C.metalD); rect(14, 92, 15, 114, C.metalD); rect(47, 92, 48, 114, C.metalD); rect(14, 113, 48, 114, C.metalD);
  rect(17, 95, 45, 112, C.k); rect(18, 96, 44, 111, C.blanco); rect(18, 106, 44, 111, hex('#4a8ae8')); rect(40, 96, 44, 111, hex('#e4e8ee')); rect(24, 98, 36, 101, C.k); for (let k = 0; k < 4; k++) rect(25 + k * 3, 96 - (k % 2), 26 + k * 3, 100, hex('#4a8ae8')); rect(18, 96, 39, 96, hex('#ffffff'));
  rect(200, 96, 222, 98, C.metalD); rect(198, 99, 224, 124, C.k); rect(199, 100, 223, 123, C.amarilloT); rect(219, 100, 223, 123, b_mezcla(C.amarilloT, C.k, 0.2)); rect(199, 100, 202, 123, b_mezcla(C.amarilloT, C.blanco, 0.3));
  rect(197, 99, 225, 104, C.k); rect(198, 100, 224, 103, C.rojoW); rect(205, 101, 217, 101, C.k); rect(198, 100, 224, 100, b_mezcla(C.rojoW, C.blanco, 0.35));
  for (let k = 0; k < 3; k++) { const a = -Math.PI / 2 + k * 2.094; disco(211 + Math.cos(a) * 3, 113 + Math.sin(a) * 3, 2, C.k); } disco(211, 113, 1.5, C.amarilloT); pset(211, 113, C.k);
  // la encimera
  b_encimera(R, 140, 179, b_C.banco, b_C.bancoS, b_C.bancoL, 3); rect(0, 139, 319, 139, C.metalS);
  // la cucharadita llena, con el mango apoyado en la encimera
  b_sombra(R, 100, 141, 30, 2, 0.78);
  { poligono([[72, 124], [8, 150], [10, 161], [73, 135]], C.k); poligono([[72, 126], [10, 152], [11, 159], [73, 133]], C.metal); linea(72, 127, 11, 152, C.metalL); linea(46, 138, 28, 145, C.blanco); linea(73, 133, 12, 159, C.metalS); disco(10, 156, 5, C.k); disco(10, 156, 4, C.metal); pset(8, 153, C.metalL); pset(9, 153, C.blanco); }
  for (let j = -17; j <= 17; j++) for (let i = -29; i <= 29; i++) { const e = (i / 29) ** 2 + (j / 17) ** 2; if (e < 1) pset(100 + i, 122 + j, e > 0.86 ? C.k : e > 0.66 ? (j < -4 ? (i < 0 ? C.blanco : C.metalL) : j > 6 ? C.metalD : C.metal) : C.metalS); }
  for (let j = -12; j <= 12; j++) for (let i = -23; i <= 23; i++) { const e = (i / 23) ** 2 + (j / 12) ** 2; if (e < 1) pset(100 + i, 120 + j, j < -7 ? C.sangreL : j > 6 ? C.sangreS : e > 0.82 ? hex('#b82234') : C.sangre); }
  { const tw = Math.round(Math.sin(t * 1.7)); rect(86 + tw, 112, 96 + tw, 113, hex('#f8a0a8')); pset(85 + tw, 113, hex('#f8a0a8')); pset(88 + tw, 112, C.blanco); pset(112 - tw, 126, hex('#e05a6a')); }
  // «÷ 100»
  const sx = 160, sy = 64; rect(sx - 13, sy - 2, sx + 13, sy + 2, C.k); rect(sx - 12, sy - 1, sx + 12, sy + 1, C.sangreS); for (const dy of [-9, 9]) { disco(sx, sy + dy, 3, C.k); disco(sx, sy + dy, 2, C.sangreS); }
  R.numero('100', sx + 50, sy + 8, { tam: 16, centro: true });
  // en la encimera: la bandeja con los tubitos de Theranos, el pinchador, la toallita abierta y el algodón
  b_sombra(R, 214, 166, 34, 2, 0.82); rect(180, 152, 248, 166, C.k); rect(181, 153, 247, 165, C.blanco); rect(181, 163, 247, 165, hex('#e4e8ec')); rect(181, 153, 247, 153, hex('#ffffff'));
  for (let k = 0; k < 7; k++) tubito(R, 188 + k * 9, 162, 1, k < 3 ? 1 : 0, [C.verdeT, C.amarilloT, C.tealT, C.rojoW][k % 4]);
  b_sombra(R, 150, 172, 16, 1, 0.82); rect(134, 168, 166, 172, C.k); rect(135, 169, 158, 171, C.tealT); rect(135, 169, 158, 169, hex('#6ac8c0')); rect(159, 169, 165, 171, C.metalL); rect(144, 166, 148, 168, C.k); rect(145, 167, 147, 167, C.verdeT);
  b_sombra(R, 44, 177, 22, 2, 0.84); rect(24, 162, 64, 176, C.k); rect(25, 163, 63, 175, C.blanco); rect(25, 163, 63, 166, C.tealT); rect(25, 172, 63, 175, hex('#e4e8ec')); for (let k = 0; k < 4; k++) { rect(29 + k * 8, 168, 33 + k * 8, 170, C.k); rect(30 + k * 8, 169, 32 + k * 8, 169, [C.tealT, C.verdeT, C.amarilloT, C.rojoW][k]); }
  b_sombra(R, 268, 170, 14, 2, 0.84); rect(256, 160, 280, 172, C.k); rect(257, 161, 279, 171, C.blanco); for (let x = 257; x < 280; x += 2) pset(x, 161, C.k); rect(261, 163, 275, 169, hex('#e8eef2')); rect(261, 163, 275, 163, C.blanco);
  b_sombra(R, 296, 162, 8, 2, 0.84); disco(296, 158, 6, C.k); disco(296, 158, 5, C.blanco); disco(294, 156, 2, hex('#ffffff')); disco(298, 160, 1, C.sangre);
  // la mano canónica que entra por la derecha, con la gota en la yema del índice
  mano(R, 262, 124, -1, '#c84a4a'); b_manga(R, 262, 124, -1, '#c84a4a'); const gx = 251, gy = 121;
  disco(gx, gy, 2, C.sangreS); pset(gx, gy, C.sangre); pset(gx - 1, gy - 1, C.sangreL);
  for (let r = 0; r < 3; r++) for (let a = 0; a < 6.28; a += 0.4) if ((a * 10 | 0) % 2) pset(Math.round(gx + Math.cos(a) * (6 + r * 3 + (t * 4) % 3)), Math.round(gy + Math.sin(a) * (6 + r * 3 + (t * 4) % 3)), hex('#d8dce8'));   // ondas que señalan la gota diminuta
  const e = o.tejido ?? 0; if (e > 0) for (let k = 0; k < 8; k++) { const a = k * 0.8 + t * 0.6, r = 12 - e * 9; pset(Math.round(gx + Math.cos(a) * r), Math.round(gy + Math.sin(a) * r * 0.7), hex('#7ab8e0')); }
  if (e > 0.6) pset(gx + 1, gy, hex('#e87888'));
}
// el medidor de azúcar de casa, en la mesa del salón: el aparatito (la carcasa con su brillo, la pantalla con su marco,
// los iconos de la pila y de la memoria, los tres botones con sus flechas y la lucecita que parpadea) con su tira (la
// ranura, los contactos dorados y la ventanita de la punta, que se tiñe con la gota); en la mesa, el mantel de lino, la
// funda abierta con el pinchador, el bote de tiras, las gafas y un cerco de café. Detrás, el papel pintado de rayas con
// sus rombos (el hueco de la izquierda, x 12–100 e y 24–96, queda liso con los mismos tonos que x 220–300 e y 6–40: la
// escena pone ahí su ventana), la moldura del techo, la lámpara que cuelga con una polilla que la ronda, el reloj de
// péndulo que oscila, la foto enmarcada, la balda con libros y un cactus, el interruptor y el zócalo de madera.
// o.valor: el número de la pantalla ('' la deja vacía y la tira aún limpia)
export function medidorAzucar(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, P = b_C, valor = String(o.valor ?? 98);
  // el papel pintado: rayas finas y un rombo pequeño cada 16 px (los mismos tonos en toda la pared)
  rect(0, 0, 319, 127, P.papelP);
  for (let x = 0; x < 320; x += 8) { rect(x, 0, x + 1, 127, P.papelPL); rect(x + 4, 0, x + 4, 127, P.papelPS); }
  for (let y = 4; y < 128; y += 16) for (let x = 2; x < 320; x += 8) { const yy = y + ((x >> 3) & 1) * 8; if (yy > 127) continue; pset(x + 4, yy - 1, P.papelPM); pset(x + 3, yy, P.papelPM); pset(x + 5, yy, P.papelPM); pset(x + 4, yy + 1, P.papelPM); }
  // la moldura del techo
  rect(0, 0, 319, 3, P.zocalo); rect(0, 3, 319, 3, P.zocaloS); rect(0, 0, 319, 0, P.zocaloL);
  // el zócalo de madera blanca con su moldura y los cuarterones (detrás de la mesa)
  rect(0, 100, 319, 127, P.zocalo); rect(0, 100, 319, 101, P.zocaloL); rect(0, 102, 319, 103, P.zocaloS); for (let x = 4; x < 320; x += 44) { rect(x, 107, x + 38, 127, P.zocaloS); rect(x + 1, 108, x + 37, 127, P.zocalo); rect(x + 1, 108, x + 37, 108, P.zocaloL); }
  // la lámpara que cuelga del techo, con su luz, y una polilla que la ronda
  rect(200, 4, 200, 15, C.k); poligono([[190, 26], [194, 15], [206, 15], [210, 26]], C.k); poligono([[192, 25], [195, 16], [205, 16], [208, 25]], hex('#e8c070')); rect(195, 16, 197, 24, hex('#f4dca0')); rect(191, 25, 209, 26, hex('#b88a3a'));
  for (let y = 27; y < 44; y++) for (let x = 182; x < 219; x++) if (((x + y) & 1) && Math.hypot((x - 200) * 0.8, (y - 27) * 1.3) < 18 - (y - 27) * 0.4) pset(x, y, hex('#f8eed8'));
  disco(200, 27, 2, hex('#fff6d0')); { const a = t * 3.1, mx = Math.round(200 + Math.cos(a) * 9 + Math.sin(a * 2.3) * 2), my = Math.round(32 + Math.sin(a * 1.7) * 5), al = Math.floor(t * 18) % 2; pset(mx, my, hex('#8a7a6a')); pset(mx - 1, my - al, hex('#b8a890')); pset(mx + 1, my - al, hex('#b8a890')); }
  // el reloj de péndulo: la caja de madera, la esfera, la puerta de cristal y el péndulo que oscila
  rect(222, 28, 254, 96, C.k); rect(223, 29, 253, 95, C.madera); rect(223, 29, 253, 30, C.maderaL); rect(250, 31, 253, 95, C.maderaS); poligono([[220, 29], [238, 18], [256, 29]], C.k); poligono([[223, 28], [238, 20], [253, 28]], C.maderaL);
  disco(238, 44, 10, C.k); disco(238, 44, 9, hex('#f6f0e0')); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(238 + Math.cos(a) * 7), Math.round(44 + Math.sin(a) * 7), k % 3 ? C.grisL : C.k); }
  linea(238, 44, 238, 38, C.k); linea(238, 44, 242, 46, C.k); pset(238, 44, C.oroS);
  rect(228, 58, 248, 90, C.k); rect(229, 59, 247, 89, hex('#4a3020')); { const an = Math.sin(t * Math.PI) * 0.32, bx = Math.round(238 + Math.sin(an) * 22), by = Math.round(60 + Math.cos(an) * 22); linea(238, 60, bx, by, C.oroS); disco(bx, by, 3, C.k); disco(bx, by, 2, C.oro); pset(bx - 1, by - 1, C.oroL); }
  for (let y = 60; y < 88; y += 3) pset(230 + ((y / 3) % 2), y, hex('#6a5040')); rect(229, 59, 230, 70, hex('#7a6050'));
  rect(226, 92, 250, 95, C.maderaD);
  // la foto enmarcada: un paisaje con dos figuritas
  rect(262, 52, 292, 78, C.k); rect(263, 53, 291, 77, C.maderaL); rect(266, 56, 288, 74, C.k); rect(267, 57, 287, 73, C.cielo2); rect(267, 68, 287, 73, C.hierba); disco(283, 61, 2, C.solL);
  for (const [x, c] of [[273, C.rojo], [279, C.azulL]]) { disco(x, 64, 1.5, b_C.piel); rect(x - 1, 66, x + 1, 70, c); pset(x - 1, 71, C.k); pset(x + 1, 71, C.k); }
  // la balda con libros y un cactus en su maceta
  rect(256, 90, 316, 92, C.k); rect(257, 90, 315, 91, C.maderaL); rect(262, 93, 264, 97, C.maderaS); rect(306, 93, 308, 97, C.maderaS);
  for (let k = 0; k < 6; k++) { const x = 259 + k * 5, al = 12 + (k * 5) % 6; rect(x, 90 - al, x + 4, 89, C.k); rect(x + 1, 91 - al, x + 3, 89, [C.rojo, C.azulL, C.ocre, C.verde, hex('#8a5ad8'), C.rojoS][k]); pset(x + 2, 93 - al, C.blanco); }
  poligono([[290, 78], [304, 78], [302, 90], [292, 90]], C.k); poligono([[291, 79], [303, 79], [301, 89], [293, 89]], C.naranja); rect(291, 79, 303, 80, hex('#f0a060'));
  rect(294, 66, 300, 78, C.k); rect(295, 67, 299, 77, C.verde); rect(295, 67, 296, 77, C.verdeL); for (const y of [69, 73, 76]) { pset(294, y, C.blanco); pset(300, y + 1, C.blanco); } rect(291, 70, 293, 74, C.k); rect(292, 71, 293, 73, C.verde); if (Math.sin(t * 0.6) > 0.7) pset(297, 65, C.rosa);
  // el interruptor de la luz
  rect(304, 106, 311, 117, C.k); rect(305, 107, 310, 116, C.blanco); rect(307, 109, 308, 113, P.zocaloS);
  // la mesa de madera con la luz de la ventana y el mantel de lino
  b_madera(R, 0, 128, 319, 179, b_C.mesa, b_C.mesaS, b_C.mesaL, b_C.mesaD, 4, 12); b_luz(R, 8, 129, 90, 179, 0.45, 0.22);
  rect(92, 128, 210, 179, P.lino); for (let y = 130; y < 180; y += 3) for (let x = 93 + (y % 2); x < 210; x += 4) pset(x, y, P.linoS); rect(92, 128, 93, 179, P.linoS); rect(209, 128, 210, 179, P.linoS); for (let y = 131; y < 180; y += 4) { pset(96, y, P.linoL); pset(206, y, P.linoL); }
  // el cerco de café y las gafas de leer
  for (let a = 0; a < 6.28; a += 0.25) if (Math.sin(a * 3) > -0.6) pset(Math.round(30 + Math.cos(a) * 8), Math.round(170 + Math.sin(a) * 4), b_C.mesaD);
  b_sombra(R, 18, 141, 14, 2, 0.8); for (const x of [10, 24]) { disco(x, 136, 5, C.k); disco(x, 136, 4, hex('#d8eef6')); pset(x - 2, 134, C.blanco); } rect(15, 135, 19, 135, C.k); linea(5, 135, 0, 132, C.k); linea(29, 135, 33, 131, C.k);
  // la funda abierta con el pinchador y el bote de tiras
  b_sombra(R, 136, 175, 30, 3, 0.8); rect(110, 158, 164, 178, C.k); rect(111, 159, 163, 177, hex('#3a3e4a')); rect(111, 159, 163, 160, hex('#5a5e6a')); for (let x = 112; x < 163; x += 3) pset(x, 176, hex('#8a8e9a'));
  rect(116, 164, 150, 170, C.k); rect(117, 165, 144, 169, C.tealT); rect(117, 165, 144, 165, hex('#6ac8c0')); rect(145, 166, 149, 168, C.metalL); rect(126, 162, 130, 164, C.k); rect(127, 163, 129, 163, hex('#e86a8a'));
  b_sombra(R, 100, 156, 6, 2, 0.8); rect(95, 136, 105, 154, C.k); rect(96, 140, 104, 153, C.blanco); rect(102, 140, 104, 153, hex('#dfe4ea')); rect(94, 134, 106, 140, C.k); rect(95, 135, 105, 139, C.verdeT); rect(96, 145, 104, 148, C.tealT);
  // el medidor: sombra, carcasa redondeada con su brillo y su borde de luz
  b_sombra(R, 150, 131, 44, 3, 0.75);
  rect(112, 50, 188, 130, C.k); rect(110, 52, 190, 128, C.k); rect(112, 52, 188, 128, hex('#3a4a6a')); rect(111, 53, 111, 127, hex('#3a4a6a')); rect(189, 53, 189, 127, hex('#2a3854'));
  rect(113, 52, 186, 53, hex('#5a6e94')); rect(112, 54, 113, 120, hex('#4e6088')); rect(184, 56, 188, 126, hex('#2e3c5a')); rect(114, 124, 186, 127, hex('#2e3c5a'));
  // la pantalla: el marco, el cristal y lo que muestra
  rect(118, 58, 182, 92, hex('#1e2a40')); rect(120, 60, 180, 90, C.k); rect(122, 62, 178, 88, hex('#a8c8a0')); rect(122, 62, 178, 62, hex('#90b088')); rect(122, 62, 122, 88, hex('#90b088'));
  rect(170, 64, 175, 67, hex('#4a6a48')); pset(176, 65, hex('#4a6a48')); rect(171, 65, 172, 66, hex('#a8c8a0'));   // la pila
  rect(125, 64, 129, 64, hex('#4a6a48')); rect(125, 66, 129, 66, hex('#4a6a48')); rect(125, 68, 128, 68, hex('#4a6a48'));   // la memoria
  if (valor !== '') R.numero(valor, 150, 84, { color: hex('#1a2a1a'), centro: true, tam: 16, sombra: false });
  linea(158, 63, 176, 81, hex('#b8d4b0')); linea(162, 63, 177, 78, hex('#b8d4b0'));   // el reflejo del cristal
  // los tres botones con sus flechas y la luz que parpadea
  for (const x of [130, 150, 170]) { disco(x, 107, 5, hex('#1e2a40')); disco(x, 106, 5, C.k); disco(x, 106, 4, C.metalS); disco(x - 1, 105, 2, C.metalL); }
  pset(130, 115, C.metalL); rect(129, 116, 131, 116, C.metalL); rect(149, 115, 151, 115, C.metalL); pset(150, 116, C.metalL); disco(170, 116, 1, C.metalL);
  disco(182, 98, 1.5, C.k); pset(182, 98, Math.floor(t * 1.5) % 2 ? C.verdeL : hex('#2a5a3a'));
  // la tira: la ranura, los contactos dorados y la ventanita de la punta
  rect(138, 126, 162, 130, C.k); rect(140, 127, 160, 128, hex('#141a28'));
  rect(140, 128, 160, 150, C.k); rect(142, 128, 158, 148, C.blanco); rect(156, 128, 158, 148, hex('#e4e8ee'));
  for (const x of [145, 149, 153]) rect(x, 129, x + 1, 134, C.oro); rect(142, 136, 158, 137, hex('#5aa8d8'));
  rect(146, 141, 154, 147, hex('#d8dce4')); rect(147, 142, 153, 146, hex('#eef0f4'));
  if (valor !== '') { disco(150, 144, 2, C.sangre); pset(149, 143, C.sangreL); }
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
  for (const x of o.sillas ?? [56, 100, 144, 188, 232]) { rect(x - 1, 112, x + 17, 142, C.k); rect(x, 113, x + 16, 142, C.cuero); for (let y = 118; y < 140; y += 6) for (let i = 2; i < 16; i += 6) pset(x + i, y, hex('#5a3a30')); }
  rect(0, 116, 319, 179, C.moqueta);
}
// la mesa larga de caoba vista de frente, con vasos de agua, carpetas, micrófonos y el dinero que entra (o.dinero 0–1:
// fajos que caen sobre la mesa y se apilan)
export function consejoMesa(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  poligono([[20, 140], [300, 140], [316, 150], [4, 150]], C.k); poligono([[22, 141], [298, 141], [313, 149], [7, 149]], C.caobaL); rect(4, 150, 316, 179, C.k); rect(6, 151, 314, 179, C.caoba); for (let x = 30; x < 300; x += 60) rect(x, 156, x + 40, 176, C.caobaS);
  for (let k = 0; k < 5; k++) { const x = 52 + k * 44; rect(x, 136, x + 4, 143, C.k); rect(x + 1, 137, x + 3, 142, hex('#c8e8f8')); pset(x + 1, 138, C.blanco); rect(x + 8, 141, x + 22, 144, C.k); rect(x + 9, 141, x + 21, 143, k % 2 ? C.ocre : hex('#4a6aa8')); }
  const d = o.dinero ?? 0; if (d > 0) for (let k = 0; k < 14; k++) { const u = Math.min(1, Math.max(0, d * 1.6 - k * 0.05)), xF = k % 2 ? 22 : 284, x = Math.round(lerp(40 + (k * 53) % 240, xF, u)), y0 = -10 - (k % 4) * 12, yF = 145 - Math.floor(k / 2) * 3, y = Math.round(lerp(y0, yF, u * u)); if (u <= 0) continue;
    rect(x, y - 3, x + 12, y, C.k); rect(x + 1, y - 2, x + 11, y - 1, hex('#7ab86a')); rect(x + 5, y - 2, x + 7, y - 1, hex('#4a8a4a')); if (u < 1) { pset(x - 2, y - 6, hex('#7ab86a')); } }
}
// el contador de la valoración: una placa con dígitos de 16 px y comas, como un marcador; v es el número (puede ser
// fraccionario: o.rueda hace girar los dígitos como una tragaperras hacia ese valor)
export function contador(R, t, v, o = {}) {
  const { rect, disco, pset } = R, s = '$' + Math.round(Math.max(0, v)).toLocaleString('en-US'), w = s.length * 16 + 20, x0 = Math.round(160 - w / 2), y0 = o.y ?? 72;
  rect(x0 - 4, y0 - 4, x0 + w + 4, y0 + 34, C.k); rect(x0 - 3, y0 - 3, x0 + w + 3, y0 + 33, C.oroS); rect(x0, y0, x0 + w, y0 + 30, hex('#141a2a'));
  for (let k = 0; k < 12; k++) disco(x0 - 3 + Math.round(k * (w + 6) / 11), y0 - 3, 1, Math.floor(t * 6 + k) % 3 === 0 ? C.oroL : C.oro);
  if (o.rueda) { const buf = contador.buf ?? (contador.buf = R.nuevo()), prev = R.usar(buf); rect(0, 0, 319, 179, hex('#141a2a')); let x = x0 + 10, i = 0;
    for (const ch of s) { if (/\d/.test(ch)) { const v0 = (+ch + Math.floor(t * 9 + i * 0.37)) % 10, p = (t * 9 + i * 0.37) % 1; R.numero(String(v0), x + 8, y0 + 24 + Math.round(p * 24), { tam: 16, centro: true }); R.numero(String((v0 + 1) % 10), x + 8, y0 + 24 + Math.round((p - 1) * 24), { tam: 16, centro: true }); } else R.numero(ch, x + 8, y0 + 24, { tam: 16, centro: true }); x += 16; i++; }
    R.usar(prev); for (let yy = y0; yy <= y0 + 30; yy++) for (let xx = x0; xx <= x0 + w; xx++) pset(xx, yy, buf[yy * 320 + xx]); }
  else R.numero(s, 160, y0 + 24, { tam: 16, centro: true, rampa: o.rojo ? R.PALA.ROJO : undefined });
}
// la portada de revista en el quiosco: arriba, la viga del quiosco con su ristra de bombillas (las de la derecha
// parpadean) y la barra de alambre con las pinzas; el expositor de revistas (cada una con su cabecera en bloques, una foto
// con un retrato o un pictograma y los titulares en trazos) con las etiquetas de precio entre ellas, sobre un fondo liso del color de
// siempre, #3a4a5a, para que la escena pueda tapar las revistas k = 0, 1 y 4 (x = k·56−6, y 20–80) con portadas suyas;
// la balda de madera; debajo, a la izquierda, los periódicos colgados de un cordel con pinzas, que se mecen con el aire del
// ventilador, y a la derecha el expositor de chocolatinas, el ventilador que gira y la máquina de bolas; el mostrador de
// madera con sus vetas, el gato que dormita y mueve la cola, el platillo de monedas que brillan y el café que humea. En el
// centro, la portada: cabecera en bloques blancos sobre rojo (sin letras), la foto de estudio con su foco y la silueta de
// jersey negro y melena rubia (el sprite chibi canónico al doble), la corona y el «$» de la lista de fortunas, los
// titulares en barras, el código de barras, el grosor de las páginas, su sombra y un brillo que pasa por el papel satinado.
// o.tachada (0–1): una «X» roja la cruza
export function revista(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, fondo = hex('#3a4a5a'), fondoS = hex('#324050'), fondoD = hex('#2a3644'), fondoL = hex('#46566a');
  rect(0, 0, 319, 179, fondo);
  // la viga del quiosco y la ristra de bombillas (quietas bajo la barra del año y bajo Atom; las demás parpadean en cadena)
  rect(0, 0, 319, 6, C.maderaD); rect(0, 6, 319, 6, C.k); for (let x = 3; x < 320; x += 23) rect(x, 2, x + 6 + (x % 5), 2, C.maderaS);
  for (let x = 0; x < 276; x++) pset(x, 9 + Math.round(2 * Math.sin(Math.PI * (x % 32) / 32)), C.k);
  for (let x = 0; x < 276; x += 32) rect(x, 7, x, 9, C.k);
  for (let k = 0; k < 17; k++) { const x = 8 + k * 16, y = 10 + Math.round(2 * Math.sin(Math.PI * (x % 32) / 32)), vivo = x < 172 || Math.sin(t * 3 - k * 0.9) > -0.4;
    rect(x, y, x, y + 1, C.k); disco(x, y + 3, 1, vivo ? C.oroL : C.oroS); if (vivo) { pset(x, y + 3, C.blanco); if (x >= 172) { pset(x - 2, y + 3, C.oroS); pset(x + 2, y + 3, C.oroS); pset(x, y + 5, C.oroS); } } }
  // la barra de alambre del expositor y las pinzas de cada revista
  rect(0, 15, 319, 16, C.metalD); rect(0, 15, 319, 15, C.metalL); for (let x = 12; x < 320; x += 40) rect(x, 13, x + 1, 17, C.metalD);
  // el expositor: seis revistas con su cabecera, su foto y sus titulares
  const COL = ['#e8c040', '#4a8ae8', '#e84a4a', '#5ab85a', '#e87ab8', '#f2f2f2'].map(hex), PIC = [a_PICTO.sol, a_PICTO.corazon, a_PICTO.capsula, a_PICTO.gota, a_PICTO.corazon, a_PICTO.sol];
  for (let k = 0; k < 6; k++) {
    const x = k * 56 - 6, c = COL[k], claro = k === 5;
    rect(x, 20, x + 44, 80, C.k); rect(x + 1, 21, x + 43, 79, c); rect(x + 1, 21, x + 43, 21, k === 5 ? C.blanco : a_PROD[[2, 1, 0, 3, 4, 5][k]][0]);
    rect(x + 4, 24, x + 40, 31, claro ? C.k : C.blanco); for (let b = 0; b < 4; b++) rect(x + 6 + b * 9, 26, x + 11 + b * 9 - (b % 2), 29, claro ? C.blanco : c);
    rect(x + 4, 34, x + 40, 62, C.k); rect(x + 5, 35, x + 39, 61, claro ? hex('#d8e4f0') : hex('#f4f0e8')); rect(x + 5, 55, x + 39, 61, claro ? hex('#c4d4e4') : hex('#e4dccc'));
    if (k % 2 === 0 || k === 5) {   // un retrato: hombros, cuello, cara y pelo, sin rasgos
      const ropa = claro ? hex('#2a4a8a') : a_PROD[[2, 1, 0, 3, 4, 5][k]][2], pelo = [hex('#6a3a1a'), hex('#d8b860'), hex('#2a1e1a')][k % 3];
      poligono([[x + 11, 61], [x + 14, 54], [x + 30, 54], [x + 33, 61]], ropa); rect(x + 20, 50, x + 24, 54, hex('#e0a878'));
      disco(x + 22, 46, 5, hex('#f0c8a0')); rect(x + 17, 40, x + 27, 43, pelo); rect(x + 17, 44, x + 18, 49, pelo); pset(x + 26, 44, pelo);
    } else a_picto(R, PIC[k], x + 17, 43, 2, c);
    for (let l = 0; l < 3; l++) rect(x + 5, 66 + l * 4, x + 30 - ((l + k) % 3) * 6, 67 + l * 4, claro ? C.k : C.blanco);
    disco(x + 37, 70, 4, claro ? C.rojoW : C.amarilloT); pset(x + 36, 69, C.blanco);
    rect(x + 21, 13, x + 23, 19, C.metalS); pset(x + 22, 13, C.metalL);   // la pinza (por encima de la revista)
  }
  // las etiquetas de precio entre las revistas (solo en los huecos que la escena no tapa)
  for (const x of [41, 98, 153, 209, 266]) { linea(x + 3, 17, x + 3, 63, fondoS); rect(x, 63, x + 6, 71, C.k); rect(x + 1, 64, x + 5, 70, C.blanco); rect(x + 1, 64, x + 5, 65, C.rojoW); pset(x + 3, 68, C.k); }
  // la balda de madera, con su canto, el portaprecios y la sombra en la pared
  rect(0, 81, 319, 81, C.maderaL); rect(0, 82, 319, 85, C.madera); for (let x = 5; x < 320; x += 17) rect(x, 83, x + 4 + (x % 3), 83, C.maderaS); rect(0, 86, 319, 86, C.maderaD); rect(0, 87, 319, 88, fondoD);
  // la pared de abajo: tablas verticales con sus clavos
  for (let x = 6; x < 320; x += 12) { rect(x, 89, x, 139, fondoS); pset(x + 1, 89, fondoL); pset(x - 3, 94 + (x % 5), fondoD); pset(x - 3, 130 + (x % 4), fondoD); }

  // ── a la izquierda: los periódicos colgados del cordel, que se mecen ──
  const aire = 0.6 + 0.4 * Math.sin(t * 0.7);
  for (let x = 0; x < 98; x++) pset(x, 91 + Math.round(1.5 * Math.sin(Math.PI * x / 98)), hex('#c8b48a'));
  for (const [x0, w, alto, f] of [[5, 38, 40, 0], [53, 38, 36, 1.7]]) {
    const sw = Math.sin(t * 2.1 + f) * 2.2 * aire, y0 = 93;
    for (let j = 0; j <= alto; j++) {
      const dx = Math.round(sw * (j / alto) ** 1.6), xa = x0 + dx, xb = x0 + w + dx + (j > alto - 5 ? Math.round(sw * 0.6) : 0);
      if (j === 0 || j === alto) { rect(xa, y0 + j, xb, y0 + j, C.k); continue; }
      pset(xa, y0 + j, C.k); pset(xb, y0 + j, C.k); rect(xa + 1, y0 + j, xb - 1, y0 + j, hex('#ece6d6'));
      if (j >= 2 && j <= 6) rect(xa + 3, y0 + j, xb - 3, y0 + j, j === 2 || j === 6 ? hex('#ece6d6') : hex('#3a3440'));
      else if (j >= 9 && j <= 22) { rect(xa + 3, y0 + j, xa + 18, y0 + j, j < 20 && j > 16 ? hex('#5a5a68') : hex('#8a8a98')); if (j % 2 === 0) rect(xa + 21, y0 + j, xb - 3, y0 + j, hex('#b4ae9e')); }
      else if (j > 24 && j < alto - 3 && j % 2 === 0) { rect(xa + 3, y0 + j, xa + 16, y0 + j, hex('#b4ae9e')); rect(xa + 20, y0 + j, xb - 3 - (j % 4), y0 + j, hex('#b4ae9e')); }
      if (j > alto - 5) pset(xb - 1, y0 + j, hex('#c8c0ac'));
    }
    disco(x0 + 10, 108, 3, hex('#5a5a68')); rect(x0 + 7, 110, x0 + 13, 113, hex('#5a5a68'));   // la silueta de la foto
    for (const px of [x0 + 4, x0 + w - 5]) { rect(px, 89, px + 2, 95, C.k); rect(px + 1, 90, px + 1, 94, C.madera); }   // las pinzas
  }
  // ── a la derecha: el expositor de chocolatinas, el ventilador y la máquina de bolas ──
  rect(225, 92, 292, 139, C.k); rect(226, 93, 291, 139, hex('#4a3a2e'));
  for (let f = 0; f < 3; f++) { const yb = 106 + f * 15; for (let i = 0; i < 9; i++) { const x = 229 + i * 7, cl = a_PROD[(i * 3 + f * 5) % a_PROD.length], al = 9 + ((i + f) % 3);
      rect(x, yb - al, x + 5, yb, C.k); rect(x + 1, yb - al + 1, x + 4, yb, cl[1]); rect(x + 1, yb - al + 1, x + 4, yb - al + 2, cl[0]); rect(x + 1, yb - 3, x + 4, yb - 3, C.blanco); pset(x + 4, yb - 1, cl[2]); }
    rect(226, yb + 1, 291, yb + 2, C.metalL); rect(226, yb + 3, 291, yb + 3, C.metalD); }
  { const cx = 306, cy = 99, a = t * 13;   // el ventilador de pared, que gira
    rect(304, 108, 308, 113, C.k); rect(305, 109, 307, 112, C.metalS); rect(300, 113, 312, 115, C.k); rect(301, 114, 311, 114, C.metalD);
    for (let b = 0; b < 3; b++) { const g = a + b * 2.094; for (let r = 2; r <= 7; r++) { const x = Math.round(cx + Math.cos(g) * r), y = Math.round(cy + Math.sin(g) * r); pset(x, y, hex('#a8c8e0')); pset(Math.round(cx + Math.cos(g + 0.3) * r), Math.round(cy + Math.sin(g + 0.3) * r), hex('#8ab0d0')); } }
    for (let g = 0; g < 6.28; g += 0.2) pset(Math.round(cx + Math.cos(g) * 9), Math.round(cy + Math.sin(g) * 9), C.metalD); for (let g = 0; g < 6.28; g += 0.79) linea(cx, cy, Math.round(cx + Math.cos(g) * 9), Math.round(cy + Math.sin(g) * 9), C.metalS);
    disco(cx, cy, 2, C.k); pset(cx, cy, C.metalL); }
  { const cx = 307, cy = 126;   // la máquina de bolas: el globo de cristal con bolas de colores y la base roja
    disco(cx, cy, 8, C.k); disco(cx, cy, 7, hex('#d8eef4')); for (let k = 0; k < 14; k++) { const a = k * 2.4, r = (k % 4) * 1.7; disco(Math.round(cx + Math.cos(a) * r), Math.round(cy + 2 + Math.sin(a) * r * 0.8), 1, [C.rojoW, C.amarilloT, C.verdeT, hex('#4a8ae8'), hex('#e87ab8')][k % 5]); }
    pset(cx - 4, cy - 4, C.blanco); pset(cx - 3, cy - 5, C.blanco); rect(cx - 6, cy + 7, cx + 6, cy + 14, C.k); rect(cx - 5, cy + 8, cx + 5, cy + 13, C.rojoW); rect(cx - 5, cy + 8, cx + 5, cy + 8, a_F.rojoL); rect(cx - 1, cy + 10, cx + 1, cy + 12, C.metalL); }

  // ── el mostrador de madera: tablas, vetas, el gato, las monedas y el café ──
  rect(0, 140, 319, 179, C.madera); rect(0, 140, 319, 140, C.maderaD); rect(0, 141, 319, 141, C.maderaS);
  for (const y of [151, 163, 175]) rect(0, y, 319, y, C.maderaS);
  for (let k = 0; k < 60; k++) { const x = Math.floor(h(k, 1, 250) * 320), y = 143 + Math.floor(h(k, 2, 250) * 36); if (y % 12 !== 7) rect(x, y, x + 3 + (k % 6), y, k % 3 ? C.maderaL : C.maderaS); }
  for (const [x, y] of [[40, 152], [130, 152], [250, 152], [90, 164], [200, 164], [300, 164], [20, 176], [160, 176], [280, 176]]) rect(x, y - 11, x, y - 1, C.maderaS);
  gato(R, 84, 158, t, { dir: -1 });
  { for (let j = -2; j <= 2; j++) for (let i = -9; i <= 9; i++) if ((i / 9) ** 2 + (j / 2.6) ** 2 < 1) pset(66 + i, 170 + j, Math.abs(j) === 2 || Math.abs(i) > 7 ? C.metalD : C.metalL);
    for (const [dx, dy] of [[-4, -1], [0, 0], [3, -1], [-1, 1]]) { disco(66 + dx, 170 + dy, 1, C.oro); pset(66 + dx, 169 + dy, C.oroL); }
    if ((t % 2.7) < 0.3) { pset(66, 167, C.blanco); pset(65, 166, C.blanco); pset(67, 166, C.blanco); } }
  { const x = 232, y = 160; rect(x, y - 10, x + 8, y, C.k); rect(x + 1, y - 9, x + 7, y - 1, C.blanco); rect(x + 1, y - 6, x + 7, y - 4, hex('#c8583a')); rect(x + 1, y - 9, x + 7, y - 9, hex('#8a5a3a')); rect(x + 9, y - 7, x + 10, y - 3, C.k);
    for (let k = 0; k < 6; k++) { const u2 = ((t * 0.5 + k / 6) % 1), sx = Math.round(x + 4 + Math.sin(u2 * 6 + k) * 2 + u2 * 3), sy = Math.round(y - 12 - u2 * 26); if (u2 < 0.85) { pset(sx, sy, hex('#d8d4cc')); if (u2 > 0.3) pset(sx + 1, sy, hex('#b8bcc4')); } } }

  // ── la portada del centro ──
  const x0 = 100, x1 = 220, y0 = 34, y1 = 170;
  for (let y = 81; y <= y1 + 4; y++) for (let x = x1 + 3; x <= x1 + 5; x++) if ((x + y) % 2 === 0 || x === x1 + 3) pset(x, y, y > 139 ? C.maderaS : fondoD);   // la sombra
  for (let x = x0 + 2; x <= x1 + 5; x++) for (let y = y1 + 3; y <= y1 + 5; y++) if ((x + y) % 2 === 0 || y === y1 + 3) pset(x, y, C.maderaS);
  rect(x0 - 2, y0 - 2, x1 + 2, y1 + 2, C.k); rect(x0, y0, x1, y1, hex('#f4f0e8')); rect(x1 - 1, y0 + 1, x1, y1, hex('#d8d0c0')); rect(x0, y1 - 1, x1, y1, hex('#d8d0c0'));
  // la cabecera: bloques blancos de distintos anchos sobre rojo, con su filete
  rect(x0 + 6, y0 + 6, x1 - 6, y0 + 22, C.rojoW); rect(x0 + 6, y0 + 6, x1 - 6, y0 + 6, a_F.rojoL); rect(x0 + 6, y0 + 22, x1 - 6, y0 + 22, a_F.rojoS);
  { let x = x0 + 11; for (const w of [9, 12, 7, 11, 9, 13, 8, 10]) { if (x + w > x1 - 10) break; rect(x, y0 + 9, x + w, y0 + 19, C.blanco); rect(x + 1, y0 + 19, x + w, y0 + 19, hex('#f0c0c4')); x += w + 3; } }
  rect(x0 + 6, y0 + 24, x1 - 6, y0 + 24, C.k); rect(x0 + 6, y0 + 25, x0 + 40, y0 + 25, hex('#8a8a9a'));
  // la foto de estudio: el fondo en dos tonos, el foco detrás de ella y el suelo del estudio
  rect(x0 + 8, y0 + 28, x1 - 8, y1 - 36, hex('#e8d8b8')); rect(x0 + 8, y1 - 52, x1 - 8, y1 - 36, hex('#dccaa4'));
  for (let j = -30; j <= 30; j++) for (let i = -36; i <= 36; i++) { const d = (i / 36) ** 2 + (j / 30) ** 2; if (d < 1 && (d < 0.4 || (i + j) % 2 === 0)) pset(161 + i, 98 + j, d < 0.4 ? hex('#f4ead4') : hex('#eee0c4')); }
  rect(x0 + 8, y0 + 28, x1 - 8, y0 + 28, hex('#d0bc94')); rect(x0 + 8, y0 + 28, x0 + 8, y1 - 36, hex('#d0bc94'));
  { const buf = R.nuevo(), VACIO = 0x01020304, prev = R.usar(buf); buf.fill(VACIO); R.actor(ELENCO_CHIBI.holmes, 2, 30, 0.5, { quieto: true, sonrisa: true }); R.usar(prev);
    for (let y = 2; y <= 30; y++) for (let x = 0; x <= 20; x++) { const c = buf[y * 320 + x]; if (c === VACIO) continue; rect(140 + x * 2, 70 + y * 2, 141 + x * 2, 71 + y * 2, c); } }
  for (let i = -14; i <= 14; i++) if ((i + 1) % 2 === 0) pset(161 + i, 133, hex('#c8b48a'));   // su sombra en el suelo del estudio
  R.icono('corona', 196, y0 + 30, C.oro, C.k, 2); R.numero('$', 120, y0 + 50, { tam: 16 });
  // los titulares en barras, el número y el código de barras
  for (let k = 0; k < 4; k++) rect(x0 + 8, y1 - 30 + k * 6, x0 + 40 - (k % 2) * 10, y1 - 28 + k * 6, hex('#8a8a9a'));
  rect(x0 + 48, y1 - 30, x0 + 80, y1 - 28, C.rojoW); for (let k = 1; k < 4; k++) rect(x0 + 48, y1 - 30 + k * 6, x0 + 76 - (k % 2) * 8, y1 - 29 + k * 6, hex('#b4b4c0'));
  rect(x1 - 30, y1 - 22, x1 - 8, y1 - 6, C.k); rect(x1 - 29, y1 - 21, x1 - 9, y1 - 7, C.blanco); for (let x = x1 - 27; x < x1 - 10; x++) if (h(x, 1, 251) > 0.42) rect(x, y1 - 19, x, y1 - 10, C.k);
  // el brillo que pasa por el papel satinado
  { const p = (t % 5.2) / 1.3; if (p < 1) { const s = Math.round(x0 - 40 + p * (x1 - x0 + 80)); for (let y = y0; y <= y1; y++) for (let x = Math.max(x0, s - (y - y0) / 2); x < Math.min(x1, s + 8 - (y - y0) / 2); x++) if ((Math.round(x) + y) % 2 === 0) pset(Math.round(x), y, C.blanco); } }
  if (o.tachada) { const u = Math.min(1, o.tachada); for (let i = 0; i < Math.round(110 * u); i++) { R.rect(x0 + 4 + i, y0 + 10 + i * 1.1, x0 + 8 + i, y0 + 13 + i * 1.1, C.rojo); R.rect(x1 - 8 - i, y0 + 10 + i * 1.1, x1 - 4 - i, y0 + 13 + i * 1.1, C.rojo); } }
}
// ── F · el laboratorio ───────────────────────────────────────────────────────────────────────────────────────────
// El laboratorio por dentro, a pleno trabajo. Arriba, el techo de placas con los plafones (uno parpadea a ratos), el
// detector de humo con su luz y los conductos de ventilación (de la rejilla sale aire y ondea una cinta); al fondo, la
// pared de paneles con su pasamanos y su zócalo. A la izquierda, la campana de flujo sobre el banco (la primera Edison
// trabaja dentro; el ventilador gira y la cinta del cristal ondea), la ventana con la persiana a medio bajar (fuera, las
// palmeras, una nube, la nave de enfrente y alguien que pasa), los pictogramas de seguridad, la tubería de gas con su llave
// y la regleta de enchufes; las tres cajas Edison en el banco de acero con sus armarios. En el centro, la pantalla de
// controles de calidad (un cursor la recorre; con o.rojo los puntos se salen de las líneas en rojo y la baliza de su
// derecha gira), el lavaojos, la centrífuga con su contador y la nevera de gradillas con el termómetro y el vaho. A la
// derecha, los dos analizadores comerciales enormes con su baliza de estado, el carrusel de tubos que gira, el brazo de la
// pipeta que va y viene, la pantalla, las luces y la impresora (de la primera sale la tira de resultados), la cinta de
// tubos con el lector de códigos y el extintor. Suelo de vinilo con juntas, brillos, reflejos y la franja de seguridad.
// o.rojo: alarma (pantalla en rojo, baliza y luces rojas); o.humoEdison / o.sabanaEdison: índice (0–2) de la Edison que
// echa humo o que está tapada; o.sinEdison: lista de las que no se pintan
export function laboratorio(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, L = g_LAB;
  // la pared de paneles: juntas con su brillo, motas del vinilo, el pasamanos de protección y el zócalo
  rect(0, 0, 319, 179, L.pared);
  for (let k = 0; k < 150; k++) pset(Math.floor(h(k, 1, 300) * 320), 17 + Math.floor(h(k, 2, 300) * 116), L.paredS);
  for (let x = 40; x < 320; x += 40) { rect(x, 17, x, 132, L.junta); rect(x + 1, 17, x + 1, 132, L.paredL); }
  rect(0, 95, 319, 98, L.guarda); rect(0, 95, 319, 95, L.paredL); rect(0, 98, 319, 98, L.junta);
  rect(0, 133, 319, 139, L.zocalo); rect(0, 133, 319, 133, L.zocaloL);
  // el techo de placas: los plafones (el segundo parpadea a ratos), el detector de humo con su luz y los rociadores
  rect(0, 0, 319, 13, L.techo); rect(0, 6, 319, 6, L.techoS); for (let x = 8; x < 320; x += 32) rect(x, 0, x, 13, L.techoS);
  rect(0, 14, 319, 16, L.cornisa); rect(0, 14, 319, 14, L.paredL);
  for (const [x0, x1, k] of [[180, 228, 0], [236, 270, 1]]) { const on = !(k && (t % 7.3) < 0.25 && Math.sin(t * 70) > -0.2);
    rect(x0, 1, x1, 6, C.k); rect(x0 + 1, 2, x1 - 1, 5, on ? C.blanco : L.techoS); for (let x = x0 + 5; x < x1; x += 5) rect(x, 2, x, 5, on ? L.difusor : L.techo);
    if (on) for (let y = 7; y < 14; y++) for (let x = x0 - (y - 7); x <= x1 + (y - 7); x++) if ((x + y) % 4 === 0) pset(x, y, L.brillo); }
  disco(233, 11, 2, C.k); disco(233, 11, 1, C.blanco); if ((t % 2.4) < 0.15) pset(233, 12, C.rojo);
  for (const x of [6, 252]) { rect(x - 1, 13, x + 1, 13, C.metalS); pset(x, 12, C.metalD); }
  // los conductos: el de la campana sube al techo y el grande corre por encima de los analizadores, con su rejilla de
  // salida (la cinta roja ondea con el aire) y los cables que bajan a las máquinas
  g_conductoH(R, 0, 32, 17); g_conductoV(R, 14, 17, 30);
  g_conductoV(R, 266, 12, 24); g_conductoH(R, 202, 275, 17);
  rect(212, 25, 228, 28, C.k); rect(213, 25, 227, 27, C.metalL); for (let x = 215; x < 227; x += 3) rect(x, 26, x, 27, C.metalS);
  for (let i = 0; i < 5; i++) pset(Math.round(224 + Math.sin(t * 9 + i * 0.8) * i * 0.6), 29 + i, i % 2 ? C.rojoS : C.rojo);
  for (const xa of [242, 259]) { linea(xa, 25, xa + 2, 31, hex('#2a2e36')); linea(xa + 2, 31, xa + 1, 39, hex('#2a2e36')); linea(xa + 3, 25, xa + 5, 32, C.verdeT); linea(xa + 5, 32, xa + 4, 39, C.verdeT); }

  // la campana de flujo laminar sobre el banco (la primera Edison trabaja dentro): carcasa con el ventilador que gira y el
  // medidor de caudal, la luz de dentro, la gradilla, el cristal de guillotina con sus reflejos y la cinta que ondea
  rect(0, 30, 45, 107, C.k); rect(0, 31, 44, 45, L.campana); rect(0, 44, 44, 45, L.campanaS); rect(0, 31, 44, 31, C.blanco);
  disco(11, 38, 6, C.k); disco(11, 38, 5, L.rejilla); for (let k = 0; k < 3; k++) { const a = t * 11 + k * 2.09; linea(11, 38, Math.round(11 + Math.cos(a) * 4), Math.round(38 + Math.sin(a) * 4), C.metalL); } disco(11, 38, 1, C.k);
  rect(24, 34, 41, 41, C.k); rect(25, 35, 40, 40, hex('#14261a')); rect(26, 37, 26 + Math.round(9 + Math.sin(t * 1.7) * 2), 38, C.verdeL); pset(39, 36, Math.floor(t * 2) % 2 ? C.verdeL : hex('#2a4a2a'));
  rect(1, 46, 43, 106, L.dentro); rect(1, 46, 43, 47, C.blanco); rect(41, 46, 43, 106, L.campanaS); for (let x = 3; x < 41; x += 3) pset(x, 105, L.campanaS);
  rect(34, 99, 41, 106, C.k); rect(35, 100, 40, 105, C.metalL); for (let k = 0; k < 3; k++) { rect(35 + k * 2, 93, 35 + k * 2, 99, C.blanco); pset(35 + k * 2, 93, [C.rojoW, C.tealT, C.amarilloT][k]); pset(35 + k * 2, 98, C.sangre); }
  rect(0, 50, 44, 51, C.metalS); for (let y = 52; y < 86; y++) for (let x = 1 + (y % 3); x < 43; x += 3) pset(x, y, L.cristal);
  for (const d of [6, 20]) { linea(d, 85, d + 14, 52, L.reflejo); linea(d + 2, 85, d + 16, 52, L.reflejo); }
  rect(0, 86, 44, 88, C.k); rect(1, 87, 43, 87, C.metalL); rect(15, 89, 29, 89, C.metalD);
  for (let i = 0; i < 5; i++) pset(Math.round(39 - Math.sin(t * 13 + i) * i * 0.5 - i * 0.4), 89 + i, i % 2 ? C.rojoS : C.rojo);

  // la ventana con la persiana a medio bajar: fuera, el cielo de la bahía con una nube que pasa, las colinas, la nave de
  // enfrente (alguien cruza delante), dos palmeras que se mecen y un pájaro; el cordón de la persiana se balancea
  rect(48, 20, 109, 65, C.k); rect(49, 21, 108, 64, C.blanco);
  const W0 = 51, W1 = 106, V0 = 23, V1 = 62;
  rect(W0, V0, W1, 42, C.cielo2); rect(W0, 43, W1, V1, C.cielo3);
  R.recorte([W0, V0, W1, V1]);
  g_nube(R, W0 - 16 + ((t * 2.5) % 90), 37, 12);
  poligono([[W0, 50], [64, 46], [78, 49], [92, 44], [W1 + 1, 48], [W1 + 1, V1 + 1], [W0, V1 + 1]], L.colina);
  rect(W0, 53, 96, V1, L.nave); rect(W0, 53, 96, 53, L.naveS); for (let x = W0 + 3; x < 94; x += 7) rect(x, 56, x + 3, 58, L.naveV);
  { const u = (t / 11) % 1, px = Math.round(W0 - 4 + u * 64); if (px < 95) { rect(px, 58, px + 1, 61, hex('#3a5a8a')); rect(px, 56, px + 1, 57, hex('#e0b090')); pset(px + (Math.floor(t * 6) % 2), 62, hex('#3a3a4a')); } }
  g_palmera(R, 99, V1, 24, t); g_palmera(R, 58, V1, 15, t, 2);
  { const u = ((t + 3) / 7) % 1, bx = Math.round(W0 - 6 + u * 70), by = Math.round(31 + Math.sin(t * 2) * 2), al = Math.sin(t * 14) > 0; if (Math.floor((t + 3) / 7) % 2 === 0) { pset(bx, by, C.k); pset(bx - 1, by - (al ? 1 : 0), C.k); pset(bx + 1, by - (al ? 1 : 0), C.k); } }
  R.recorte(null);
  for (let y = V0; y < 32; y++) rect(W0 - 1, y, W1 + 1, y, y % 2 ? L.lama : L.lamaS);
  rect(W0 - 1, 32, W1 + 1, 33, L.lamaS); rect(W0 - 1, 34, W1 + 1, 34, C.k);
  for (let y = 38; y < V1; y += 5) { rect(W0, y, W1, y, L.lama); rect(W0, y + 1, W1, y + 1, L.lamaS); }
  { const sw = Math.round(Math.sin(t * 1.3) * 1.5); linea(103, 34, 103 + sw, 50, C.k); rect(102 + sw, 50, 104 + sw, 53, L.lamaS); }
  rect(46, 64, 111, 66, C.k); rect(47, 64, 110, 65, C.blanco);
  // los pictogramas de seguridad (sin letras) bajo la ventana
  [['bio', 50], ['peligro', 64], ['guantes', 78], ['gafas', 91]].forEach(([k, x]) => g_pictograma(R, k, x, 68));
  // la tubería de gas (amarilla) que baja con su llave hasta el grifo del banco, el tubo de la luz que baja del techo a su
  // caja y la regleta de enchufes con los cables de las Edison
  rect(44, 80, 107, 83, C.k); rect(44, 81, 106, 82, C.amarilloT); rect(44, 81, 106, 81, L.gasL);
  rect(103, 80, 107, 101, C.k); rect(104, 81, 106, 101, C.amarilloT); rect(104, 81, 104, 101, L.gasL);
  rect(101, 77, 109, 78, C.rojo); rect(104, 78, 106, 79, C.k);
  rect(102, 101, 108, 103, C.k); rect(103, 102, 107, 102, C.metalL); rect(104, 104, 106, 107, C.metalD); rect(102, 104, 103, 105, C.rojo);
  rect(111, 17, 112, 86, C.metalS); rect(111, 17, 111, 86, C.metalL); for (const y of [30, 56]) rect(110, y, 113, y + 1, C.metalD); rect(108, 84, 114, 91, C.k); rect(109, 85, 113, 90, C.metalL); pset(111, 87, C.metalD);
  rect(46, 87, 100, 92, C.k); rect(47, 88, 99, 91, L.regleta); for (let x = 50; x < 90; x += 8) { rect(x, 89, x + 3, 90, hex('#b8bcc4')); pset(x + 1, 89, C.k); pset(x + 2, 90, C.k); }
  rect(92, 88, 97, 91, C.rojo); pset(94, 89, C.oroL); rect(101, 89, 107, 89, C.k); for (const x of [57, 85]) rect(x, 92, x, 94, C.k);

  // la pantalla de controles de calidad (las tres líneas y los puntos del día; un cursor la recorre) con su soporte; la
  // baliza de alarma a su derecha (con o.rojo gira y destella)
  const px0 = 116, py0 = 26;
  rect(px0 + 34, py0 + 42, px0 + 40, py0 + 45, C.metalD);
  rect(px0 - 2, py0 - 2, px0 + 76, py0 + 42, C.k); rect(px0 - 1, py0 - 1, px0 + 75, py0 + 41, L.bisel); rect(px0, py0, px0 + 74, py0 + 40, C.k); rect(px0 + 2, py0 + 2, px0 + 72, py0 + 38, L.pantalla);
  for (let x = px0 + 12; x < px0 + 72; x += 12) for (let y = py0 + 3; y < py0 + 38; y += 2) pset(x, y, L.rejillaP);
  rect(px0 + 4, py0 + 3, px0 + 12, py0 + 4, hex('#2a4a6a')); rect(px0 + 14, py0 + 3, px0 + 22, py0 + 4, hex('#1e3448')); rect(px0 + 62, py0 + 3, px0 + 70, py0 + 4, o.rojo && Math.sin(t * 8) > 0 ? C.rojo : hex('#2a5a3a'));
  { const cx = px0 + 4 + Math.floor((t * 14) % 66); rect(cx, py0 + 6, cx, py0 + 37, L.cursor); }
  for (const [dy, c] of [[8, hex('#c84a4a')], [20, hex('#5ab85a')], [32, hex('#c84a4a')]]) for (let x = px0 + 4; x < px0 + 70; x += 2) pset(x, py0 + dy, c);
  for (let k = 0; k < 12; k++) { const x = px0 + 6 + k * 5, malo = o.rojo && k > 5 && k % 2 === 0, y = py0 + 20 + Math.round((h(k, 1, 48) - 0.5) * 12) + (malo ? (k % 4 ? -16 : 16) : 0);
    if (k === 11 && !malo && Math.floor(t * 2.5) % 2) continue; disco(x, Math.max(py0 + 3, Math.min(py0 + 37, y)), 1, malo ? (Math.sin(t * 8) > 0 ? C.rojo : C.sangreL) : hex('#8ad0f0')); }
  for (let i = 0; i < 8; i++) pset(px0 + 52 + i, py0 + 5 + i, L.reflejoP);
  pset(px0 + 37, py0 + 41, C.verdeL);
  { const bx = 196, by = 30, f = o.rojo && Math.sin(t * 10) > -0.3;
    rect(bx - 3, by + 3, bx + 3, by + 5, C.metalD); rect(bx - 4, by + 5, bx + 4, by + 5, C.k);
    disco(bx, by, 3, C.k); disco(bx, by, 2, f ? C.rojo : hex('#7a2a2a')); pset(bx - 1, by - 1, f ? C.sangreL : hex('#a85a5a'));
    if (o.rojo) for (let k = 0; k < 2; k++) { const a = t * 6 + k * Math.PI; for (let d = 5; d < 11; d += 2) pset(Math.round(bx + Math.cos(a) * d), Math.round(by + Math.sin(a) * d * 0.6), C.sangreL); } }
  // el lavaojos de emergencia bajo la pantalla: el cartel verde, el tubo, la pila con sus dos duchas de tapa amarilla y
  // el tirador
  g_pictograma(R, 'lavaojos', 118, 72);
  rect(139, 76, 142, 99, C.k); rect(140, 76, 141, 99, C.metal);
  poligono([[123, 88], [147, 88], [143, 96], [127, 96]], C.k); poligono([[125, 89], [145, 89], [142, 95], [128, 95]], L.lavaojos); rect(126, 89, 144, 89, hex('#6ac88a'));
  for (const x of [130, 138]) { rect(x - 2, 84, x + 2, 88, C.k); rect(x - 1, 85, x + 1, 87, C.amarilloT); }
  rect(145, 84, 148, 92, C.k); rect(146, 85, 147, 91, C.amarilloT);

  // el banco de acero inoxidable con los armarios debajo (puertas con tirador y zócalo) y las tres Edison
  rect(0, 108, 110, 112, C.k); rect(0, 109, 110, 111, C.metalL); rect(0, 109, 110, 109, C.blanco);
  rect(0, 112, 110, 139, L.armario); rect(0, 113, 110, 113, L.armarioS);
  for (let x = 4; x < 110; x += 26) { rect(x, 115, x + 22, 134, L.puerta); rect(x, 115, x + 22, 115, L.armarioL); rect(x + 22, 115, x + 22, 134, L.armarioS); rect(x + 9, 118, x + 13, 119, C.metalD); pset(x + 9, 118, C.metalL); }
  rect(0, 136, 110, 139, L.zocaloA);
  for (let k = 0; k < 3; k++) if (!(o.sinEdison ?? []).includes(k)) edison(R, 18 + k * 34, 108, t, { s: 0.38, humo: o.humoEdison === k ? 1 : 0, sabana: o.sabanaEdison === k ? 1 : 0 });

  // la centrífuga: la tapa con su ventanilla (el rotor gira con sus tubos), el contador de vueltas y la luz de marcha
  rect(118, 100, 146, 139, C.k); rect(119, 101, 145, 138, C.metalL); rect(119, 101, 145, 103, C.blanco); rect(119, 105, 145, 105, C.metalS); rect(119, 134, 145, 138, C.metal); rect(144, 106, 145, 133, C.metal);
  disco(132, 115, 9, C.k); disco(132, 115, 8, hex('#4a5464'));
  for (let k = 0; k < 4; k++) { const a = t * 14 + k * Math.PI / 2, ex = Math.round(132 + Math.cos(a) * 6), ey = Math.round(115 + Math.sin(a) * 6); linea(132, 115, ex, ey, C.metalS); pset(ex, ey, [C.rojoW, C.tealT, C.amarilloT, C.sangre][k]); }
  R.anillo(132, 115, 4, hex('#6a7484')); disco(132, 115, 1, C.metalL); pset(128, 110, C.blanco); pset(129, 109, C.blanco);
  rect(121, 125, 143, 131, C.k); rect(122, 126, 142, 130, hex('#14261a')); g_digitos(R, 3990 + Math.round(Math.sin(t * 3) * 9 + 9), 124, 126, C.verdeL);
  pset(141, 136, Math.floor(t * 3) % 2 ? C.verdeL : hex('#3a5a3a'));
  // la nevera de muestras: la puerta de cristal con su luz fría, tres baldas de gradillas, el termómetro digital, los
  // reflejos, el vaho que se arrastra abajo y la rejilla del motor
  rect(150, 70, 186, 140, C.k); rect(151, 71, 185, 139, C.metalL); rect(151, 71, 151, 139, C.blanco);
  rect(166, 72, 180, 78, C.k); rect(167, 73, 179, 77, hex('#0e1a24')); g_digitos(R, 4, 171, 73, hex('#8ad0f0')); pset(175, 73, hex('#8ad0f0')); pset(178, 75, Math.floor(t) % 2 ? C.verdeL : hex('#2a4a2a'));
  rect(153, 80, 181, 130, C.k); rect(154, 81, 180, 129, L.frio); rect(154, 81, 180, 82, C.blanco);
  for (const y of [94, 110, 126]) { rect(154, y, 180, y + 1, C.metalD); for (let k = 0; k < 6; k++) { rect(156 + k * 4, y - 8, 157 + k * 4, y - 1, C.blanco); rect(156 + k * 4, y - 8, 157 + k * 4, y - 8, [C.rojoW, C.tealT, C.amarilloT][k % 3]); if (k % 2 === 0) rect(156 + k * 4, y - 4, 157 + k * 4, y - 1, C.sangre); } }
  for (let i = 0; i < 44; i += 2) { pset(158 + Math.round(i * 0.3), 127 - i, L.reflejoF); pset(161 + Math.round(i * 0.3), 127 - i, L.reflejoF); }
  for (let k = 0; k < 6; k++) { const u = (t * 0.22 + k / 6) % 1; pset(154 + Math.round(u * 26), 128 - (k % 2), C.blanco); }
  rect(182, 96, 184, 112, C.metalD); rect(182, 96, 182, 112, C.metalL);
  rect(153, 132, 183, 138, C.metalS); for (let y = 133; y < 138; y += 2) rect(154, y, 182, y, C.metalD);

  // los dos analizadores comerciales, grandes: la baliza de estado (verde; ámbar a ratos; roja con o.rojo), la tapa con el
  // hueco de la placa de la marca y su franja de color, el costado en sombra, el carrusel de tubos que gira con el brazo de
  // la pipeta que va y viene, la pantalla táctil, las luces, la impresora (de la primera sale la tira de resultados) y la
  // puerta de los reactivos con su rejilla
  for (const [x0, col, colS, banda, sx] of [[196, hex('#e4e8ee'), hex('#c8ced8'), C.tealT, 236], [256, hex('#e8e4dc'), hex('#d0c8ba'), hex('#d8783a'), 268]]) {
    const rj = o.rojo && Math.sin(t * 9) > 0, am = !o.rojo && ((t + x0 * 0.03) % 6) < 0.6 && Math.sin(t * 12) > 0;
    rect(sx, 37, sx + 1, 40, C.metalD); rect(sx - 1, 28, sx + 2, 37, C.k); rect(sx, 29, sx + 1, 30, rj ? C.rojo : hex('#6a2a2a')); rect(sx, 32, sx + 1, 33, am ? C.amarilloT : hex('#6a5a2a')); rect(sx, 35, sx + 1, 36, o.rojo ? hex('#2a4a2a') : C.verdeL);
    rect(x0, 40, x0 + 56, 140, C.k); rect(x0 + 1, 41, x0 + 55, 139, col); rect(x0 + 51, 47, x0 + 55, 139, colS);
    rect(x0 + 1, 41, x0 + 55, 46, C.metalL); rect(x0 + 1, 41, x0 + 55, 41, C.blanco); rect(x0 + 1, 47, x0 + 55, 47, colS);
    rect(x0 + 7, 44, x0 + 19, 51, colS); rect(x0 + 8, 45, x0 + 18, 50, col); rect(x0 + 22, 49, x0 + 48, 50, banda);
    rect(x0 + 6, 54, x0 + 50, 84, C.k); rect(x0 + 7, 55, x0 + 49, 83, L.dentroA); rect(x0 + 7, 55, x0 + 49, 56, L.dentroAL);
    const cx = x0 + 28, cy = 69;
    for (let j = -10; j <= 10; j++) { const w = Math.round(Math.sqrt(1 - (j / 10.5) ** 2) * 18); rect(cx - w, cy + 2 + j, cx + w, cy + 2 + j, j < -7 ? L.platoL : L.plato); }
    for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2 + t * 1.2, tx = Math.round(cx + Math.cos(a) * 14), ty = Math.round(cy + Math.sin(a) * 9); rect(tx - 1, ty - 3, tx + 1, ty + 2, C.blanco); pset(tx, ty - 3, [C.rojoW, C.tealT, C.amarilloT, hex('#8a5ad8')][k % 4]); if (k % 3 === 0) pset(tx, ty + 1, C.sangre); }
    disco(cx, cy + 1, 3, C.metalD); pset(cx, cy, C.metalL);
    rect(x0 + 8, 58, x0 + 48, 58, C.metalS); { const ax = cx + Math.round(Math.sin(t * 1.6 + x0) * 16), p = 2 + Math.round(Math.max(0, Math.sin(t * 3.2 + x0)) * 7); rect(ax - 2, 57, ax + 2, 60, C.k); rect(ax - 1, 58, ax + 1, 59, C.metalL); rect(ax, 61, ax, 60 + p, C.blanco); }
    for (const d of [9, 13]) linea(x0 + d, 82, x0 + d + 12, 57, L.reflejoA);
    rect(x0 + 8, 92, x0 + 30, 106, C.k); rect(x0 + 9, 93, x0 + 29, 105, hex('#3a6a8a')); rect(x0 + 9, 93, x0 + 29, 94, hex('#5a8aaa'));
    for (let k = 0; k < 3; k++) rect(x0 + 11, 96 + k * 3, x0 + 11 + Math.round(10 + Math.sin(t * 2 + k + x0) * 6), 97 + k * 3, o.rojo && k === 1 ? C.sangreL : hex('#8ad0f0'));
    rect(x0 + 10, 104, x0 + 10 + Math.floor(((t * 0.35 + x0 * 0.01) % 1) * 18), 104, C.verdeL);
    for (let k = 0; k < 3; k++) disco(x0 + 38 + k * 5, 98, 1, Math.floor(t * 3 + k) % 3 === 0 ? C.verdeL : hex('#3a5a3a'));
    rect(x0 + 38, 103, x0 + 52, 105, C.k); rect(x0 + 39, 104, x0 + 51, 104, hex('#3a3e48'));
    rect(x0 + 4, 109, x0 + 50, 126, colS); rect(x0 + 5, 110, x0 + 49, 126, col); for (let y = 112; y < 124; y += 2) rect(x0 + 8, y, x0 + 24, y, colS);
    rect(x0 + 40, 115, x0 + 46, 116, C.metalD); pset(x0 + 40, 115, C.metalL); rect(x0 + 29, 112, x0 + 35, 117, C.k); rect(x0 + 30, 113, x0 + 34, 116, C.amarilloT); pset(x0 + 32, 114, C.k);
  }
  // el lector de códigos de la cinta, que dispara su luz roja sobre los tubos
  rect(226, 119, 234, 126, C.k); rect(227, 120, 233, 125, C.metalD); pset(232, 121, Math.floor(t * 5) % 2 ? C.rojo : C.rojoS); if (Math.floor(t * 5) % 3 === 0) rect(230, 127, 230, 131, C.rojo);
  // la cinta de tubos: la goma con sus tacos que avanzan, la barandilla con sus tornillos y las patas; los tubos viajan
  // hacia los analizadores
  rect(190, 132, 319, 136, C.k); rect(190, 132, 319, 132, L.goma); for (let x = 190 + Math.round(t * 10) % 6; x < 320; x += 6) pset(x, 132, L.gomaL);
  rect(190, 134, 319, 135, C.metalS); for (let x = 194; x < 320; x += 12) pset(x, 134, C.metalL);
  for (const x of [204, 254, 304]) rect(x, 137, x + 1, 139, C.metalD);
  for (let k = 0; k < 22; k++) { if (h(k, 5, 301) < 0.25) continue; const xx = 192 + ((k * 6 + Math.round(t * 10)) % 128); rect(xx, 128, xx + 1, 131, C.blanco); rect(xx, 127, xx + 1, 127, [C.tealT, C.rojoW, C.amarilloT, hex('#8a5ad8')][k % 4]); if (k % 2) pset(xx, 130, C.sangre); }
  // el extintor colgado a la derecha, con su cartel
  rect(313, 86, 319, 96, C.k); rect(314, 87, 319, 95, C.rojo); rect(316, 89, 317, 93, C.blanco); pset(318, 89, C.blanco);
  rect(313, 112, 319, 113, C.metalD); rect(315, 99, 318, 99, C.metalD); rect(314, 100, 318, 125, C.k); rect(315, 103, 317, 124, C.rojo); rect(315, 103, 315, 124, hex('#e86a6a')); rect(315, 101, 317, 102, C.metalD); linea(318, 101, 319, 109, C.k);

  // el suelo de vinilo: juntas en perspectiva, la sombra al pie de las máquinas, el reflejo de los analizadores, los
  // brillos de los plafones, el sumidero y la franja de seguridad delante de la cinta
  rect(0, 140, 319, 179, L.suelo); rect(0, 140, 319, 141, L.sueloS);
  for (const y of [147, 156, 168]) rect(0, y, 319, y, L.sueloJ);
  for (let k = -5; k <= 15; k++) { const xa = k * 30; linea(xa, 142, Math.round(160 + (xa - 160) * 1.8), 179, L.sueloJ); }
  for (const y of [143, 146, 150]) { rect(198, y, 250, y, L.reflejoS); rect(258, y, 310, y, L.reflejoS); rect(152, y + 1, 184, y + 1, L.reflejoS); rect(4, y + 1, 106, y + 1, L.reflejoS); }
  for (const [x, y, w] of [[188, 160, 26], [240, 163, 18], [196, 172, 30], [60, 158, 22], [14, 170, 30], [120, 176, 24]]) { rect(x, y, x + w, y, L.brilloS); rect(x + 4, y + 2, x + w - 6, y + 2, L.brilloS); }
  rect(166, 168, 180, 172, C.k); rect(167, 169, 179, 171, C.metalD); for (let x = 169; x < 179; x += 2) rect(x, 169, x, 171, C.k);
  for (let y = 141; y <= 142; y++) for (let x = 190; x < 320; x++) pset(x, y, ((x + y) >> 2) % 2 ? C.amarilloT : C.k);
}
// el inserto de la dilución, en el banco del laboratorio: la pared de azulejos con su brillo, el estante de frascos (un
// cuentagotas, un frasco de reactivo, un matraz, un tarro y un aforado), el cartel de seguridad (sin letras), la ventana
// al laboratorio grande (pasa un técnico, el robot trabaja), el reloj de pared, el botiquín, el agitador magnético con su
// vaso (el líquido gira y el imán da vueltas), el frasco azul, el temporizador que cuenta, la gradilla pequeña de tubitos
// y el banco de resina negra con reflejos. En el centro, la gradilla de alambre con tubitos y el tubo grande de agua
// (x 140–180, boca en y 30, agua desde y 52, fondo en y 146), con su labio, su brillo que baja, el menisco, las marcas y
// una cinta de color. o.u (0–1): la gota cae desde la punta de la pipeta (que llega en diagonal desde arriba a la
// derecha, fuera de la barra del año, y luego se retira), salpica, se hunde en una nube roja que se enrosca y se reparte,
// y el agua se queda rosa pálido con pocas moléculas doradas que brillan; o.lupa (0–1): una mano con guante mueve una
// lupa que agranda de verdad lo que hay detrás, buscando las moléculas doradas (gag: «?» cuando pasa junto a una y no la
// ve)
export function insertoDiluye(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, u = o.u ?? 0;
  const x0 = 140, x1 = 180, y0 = 30, y1 = 146, nivel = 52;
  // la pared de azulejos, cada uno con su brillo
  rect(0, 0, 319, 149, hex('#e4ece8'));
  for (let y = 7; y < 150; y += 8) { rect(0, y, 319, y, hex('#cfdcd5')); for (let x = (y >> 3) % 2 ? 0 : 8; x < 320; x += 16) { rect(x, y - 7, x, y - 1, hex('#cfdcd5')); pset(x + 2, y - 6, hex('#f2f7f4')); pset(x + 3, y - 6, hex('#f2f7f4')); } }
  // el estante con frascos, a la izquierda (por debajo de la barra del año y del número del año, y por encima del frasco
  // lavador de las escenas): un cuentagotas, un frasco de reactivo, un matraz, un tarro y un aforado
  rect(4, 40, 64, 41, hex('#d2ddd7')); rect(4, 37, 64, 39, C.metalL); rect(4, 39, 64, 39, C.metalS); for (const x of [10, 56]) { rect(x, 40, x + 1, 45, C.metalS); linea(x + 1, 45, x + 5, 41, C.metalS); }
  rect(6, 26, 14, 36, C.k); rect(7, 27, 13, 35, hex('#a8642a')); rect(8, 22, 12, 26, C.k); rect(9, 23, 11, 25, hex('#3a3a4a')); pset(8, 29, hex('#d89a5a'));
  rect(17, 24, 27, 36, C.k); rect(18, 25, 26, 35, hex('#eef4f6')); rect(18, 29, 26, 35, hex('#9ac8e8')); rect(19, 22, 25, 24, C.k); rect(20, 23, 24, 23, hex('#2a5ab8')); rect(18, 30, 26, 33, C.blanco); rect(20, 31, 24, 32, hex('#2a5ab8'));
  poligono([[29, 36], [34, 26], [34, 22], [38, 22], [38, 26], [43, 36]], C.k); poligono([[31, 35], [35, 27], [35, 23], [37, 23], [37, 27], [41, 35]], hex('#eef6f8')); poligono([[31, 35], [33, 31], [39, 31], [41, 35]], hex('#7ad08a'));
  rect(45, 29, 52, 36, C.k); rect(46, 30, 51, 35, hex('#6a4a2a')); rect(46, 28, 51, 29, C.k);
  disco(58, 32, 4.5, C.k); disco(58, 32, 3.5, hex('#eef4f6')); rect(55, 32, 61, 35, hex('#a888e0')); rect(57, 23, 59, 28, C.k); pset(58, 24, hex('#eef4f6')); pset(56, 30, C.blanco);
  // el cartel de seguridad, sin letras: la banda azul, las gafas y la gota en círculos y unas rayas
  rect(90, 54, 126, 90, C.k); rect(91, 55, 125, 89, hex('#f8f8f4')); rect(91, 55, 125, 61, hex('#2a5ab8'));
  for (const cx of [100, 116]) { disco(cx, 70, 6, hex('#2a5ab8')); } disco(98, 70, 2, C.blanco); disco(102, 70, 2, C.blanco); rect(99, 69, 101, 69, C.blanco); R.icono('gota', 113, 66, C.blanco, hex('#2a5ab8'));
  for (let k = 0; k < 3; k++) rect(95, 80 + k * 3, 121 - k * 6, 80 + k * 3, hex('#9aa0ac')); pset(124, 56, C.blanco);
  // la ventana al laboratorio grande y el reloj de pared
  c_salaVecina(R, t + 7, 204, 18, 272, 84);
  { const cx = 238, cy = 104; disco(cx, cy, 10, C.k); disco(cx, cy, 9, C.blanco); for (let k = 0; k < 12; k++) { const g = k / 12 * Math.PI * 2; pset(Math.round(cx + Math.cos(g) * 7), Math.round(cy + Math.sin(g) * 7), k % 3 ? C.metalS : C.k); }
    const sg = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2, mn = (35 + t / 60) / 60 * Math.PI * 2 - Math.PI / 2;
    linea(cx, cy, Math.round(cx + Math.cos(mn) * 6), Math.round(cy + Math.sin(mn) * 6), C.k); linea(cx, cy, cx - 3, cy + 2, C.k); linea(cx, cy, Math.round(cx + Math.cos(sg) * 8), Math.round(cy + Math.sin(sg) * 8), C.rojo); }
  // el botiquín (por debajo de Atom)
  rect(286, 58, 312, 84, C.k); rect(287, 59, 311, 83, hex('#3a9a5a')); rect(287, 59, 311, 60, hex('#5aba7a')); rect(297, 63, 301, 79, C.blanco); rect(291, 69, 307, 73, C.blanco); rect(296, 56, 302, 58, C.k);
  // el agitador magnético con su vaso: el líquido gira, el imán da vueltas y la luz parpadea
  rect(22, 136, 74, 149, C.k); rect(23, 137, 73, 148, hex('#eef0f2')); rect(23, 137, 73, 138, C.blanco); rect(23, 145, 73, 148, hex('#d4d8dc'));
  disco(64, 141, 2.5, C.k); disco(64, 141, 1.5, C.metalS); pset(30, 141, Math.floor(t * 2) % 2 ? C.verdeL : hex('#2a5a3a')); rect(34, 141, 50, 141, hex('#c8ccd2'));
  rect(28, 98, 68, 136, C.k); rect(29, 98, 67, 135, hex('#f2f8fb')); rect(26, 96, 31, 98, C.k); rect(27, 97, 30, 97, hex('#f2f8fb'));
  for (let x = 29; x <= 67; x++) { const dip = Math.max(0, 7 - Math.abs(x - 48) * 0.45), y = Math.round(112 + dip); rect(x, y, x, 135, x > 63 ? hex('#e0a8b4') : hex('#f0c4cc')); pset(x, y, hex('#f8dce0')); }
  for (let k = 0; k < 6; k++) { const g = t * 6 + k * 1.05; pset(Math.round(48 + Math.cos(g) * 14), Math.round(118 + k * 2.5 + Math.sin(g) * 1.5), hex('#f8dce0')); }
  { const dx = Math.round(Math.cos(t * 14) * 7); rect(48 - Math.abs(dx), 131, 48 + Math.abs(dx), 133, C.k); rect(48 - Math.abs(dx) + 1, 132, 48 + Math.abs(dx) - 1, 132, C.blanco); }
  for (let y = 104; y < 132; y += 6) rect(31, y, 34, y, C.metalS); rect(64, 100, 65, 133, hex('#ffffff'));
  // el frasco azul de reactivo, con su etiqueta sin letras
  rect(80, 116, 96, 149, C.k); rect(81, 117, 95, 148, hex('#e8eef2')); rect(81, 128, 95, 148, hex('#9ac8e8')); rect(84, 108, 92, 116, C.k); rect(85, 109, 91, 115, hex('#2a5ab8')); rect(81, 132, 95, 140, C.blanco); rect(83, 135, 93, 136, hex('#2a5ab8')); rect(82, 120, 82, 146, hex('#f8fbfc'));
  // el temporizador que cuenta y la gradilla pequeña de tubitos de colores
  rect(236, 133, 272, 149, C.k); rect(237, 134, 271, 148, hex('#f0f2f4')); rect(239, 136, 263, 147, C.k); rect(240, 137, 262, 146, hex('#a8c8a0'));
  R.numero(String(Math.floor(t + 23) % 60).padStart(2, '0'), 251, 146, { color: hex('#1a2a1a'), centro: true, sombra: false }); pset(267, 137, Math.floor(t * 2) % 2 ? C.rojo : hex('#5a2a2a')); disco(267, 143, 1.5, C.metalS);
  for (let k = 0; k < 5; k++) { const x = 284 + k * 6; rect(x, 128, x + 3, 141, C.k); rect(x + 1, 130, x + 2, 140, C.blanco); rect(x + 1, 135 - (k % 3), x + 2, 140, [C.sangre, hex('#f0c8d0'), C.amarilloT][k % 3]); rect(x, 126, x + 3, 128, [C.rojoW, C.tealT, C.amarilloT, hex('#8a5ad8'), C.verdeT][k]); }
  rect(282, 140, 316, 149, C.k); rect(283, 141, 315, 148, C.amarilloT); for (let k = 0; k < 5; k++) rect(285 + k * 6, 143, 287 + k * 6, 144, hex('#b8901c'));
  // el banco de resina negra, con el brillo del canto y los reflejos de lo que hay encima; los armarios de debajo
  rect(0, 150, 319, 156, hex('#2e3640')); rect(0, 150, 319, 150, hex('#5a6672')); rect(0, 151, 319, 151, hex('#404a56'));
  for (const [a, b] of [[24, 72], [81, 95], [100, 220], [237, 271], [283, 315]]) for (let x = a; x <= b; x += 2) pset(x, 153, hex('#46525e'));
  rect(0, 157, 319, 158, hex('#1e242c')); rect(0, 159, 319, 179, hex('#c8d0d8')); for (let x = 0; x < 320; x += 64) { rect(x, 159, x, 179, hex('#a8b0b8')); rect(x + 26, 166, x + 38, 167, C.metalD); rect(x + 26, 166, x + 38, 166, C.metalL); }
  // los tubitos de la gradilla, a los lados del tubo grande
  for (const [x, c, f] of [[108, C.rojoW, 0.7], [118, C.tealT, 0], [128, hex('#8a5ad8'), 0.4], [200, C.amarilloT, 0.6], [210, C.verdeT, 0]]) {
    rect(x - 3, 116, x + 3, 146, C.k); rect(x - 2, 117, x + 2, 145, hex('#f2f8fc')); if (f) rect(x - 2, Math.round(145 - 26 * f), x + 2, 145, f > 0.5 ? hex('#f0c8d0') : hex('#e8a0a8')); rect(x - 4, 111, x + 4, 116, C.k); rect(x - 3, 112, x + 3, 115, c); pset(x - 1, 119, C.blanco); }
  // el tubo grande: el color del agua según la mezcla (azul → rosa pálido)
  const mezcla = Math.max(0, Math.min(1, (u - 0.35) / 0.45)), q = Math.round(mezcla * 5) / 5, col = c_rgb(lerp(200, 244, q), lerp(228, 216, q), lerp(244, 220, q)), colS = c_rgb(lerp(160, 214, q), lerp(196, 176, q), lerp(222, 186, q));
  rect(x0 - 2, y0 - 2, x1 + 2, y0 + 1, C.k); rect(x0 - 1, y0 - 1, x1 + 1, y0, hex('#f8fbfd'));
  rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#f4f8fc')); rect(x1 - 4, y0 + 1, x1 - 2, nivel - 1, hex('#e0eaf2'));
  rect(x0 + 1, nivel, x1 - 1, y1 - 1, col); rect(x1 - 4, nivel, x1 - 2, y1 - 1, colS); rect(x0 + 1, nivel, x0 + 2, nivel, colS); rect(x0 + 1, nivel - 1, x0 + 1, nivel - 1, col); rect(x1 - 1, nivel - 1, x1 - 1, nivel - 1, col); rect(x0 + 3, nivel, x1 - 5, nivel, c_rgb(lerp(230, 250, q), lerp(244, 236, q), lerp(252, 238, q)));
  rect(x0 + 3, y0 + 3, x0 + 4, y1 - 6, hex('#ffffff'));
  for (let k = 0; k < 9; k++) { const y = nivel + 8 + k * 10; rect(x1 - (k % 2 ? 9 : 13), y, x1 - 5, y, hex('#8a9aa8')); }
  rect(x0 + 26, y0 + 4, x1 - 3, y0 + 12, C.k); rect(x0 + 27, y0 + 5, x1 - 4, y0 + 11, hex('#f8f0c8')); rect(x0 + 29, y0 + 7, x1 - 6, y0 + 8, C.rojoW);
  { const gy = y0 + 4 + Math.round((t * 26) % 150); if (gy < y1 - 8) rect(x0 + 3, gy, x0 + 4, gy + 5, hex('#d0e8f8')); if (gy - 1 < y1 - 8) pset(x0 + 5, gy + 2, hex('#ffffff')); }
  // la nube roja de la gota que se enrosca y se reparte
  const nube = Math.max(0, Math.min(1, (u - 0.4) / 0.42));
  if (nube > 0 && nube < 1) { const prof = 6 + nube * 72, ancho = 2 + nube * 14;
    for (let k = 0; k < 54; k++) { const f = k / 54, yy = Math.round(nivel + 3 + f * prof), g = f * 9 + t * 2.6 + k * 0.37, rad = ancho * (0.25 + 0.75 * f) * (0.6 + 0.4 * h(k, 5, 50)), xx = Math.round(160 + Math.cos(g) * rad);
      if (xx < x0 + 2 || xx > x1 - 5 || yy > y1 - 2) continue; const fuerte = (1 - nube) > h(k, 6, 50), c = fuerte ? (k % 3 ? C.sangre : C.sangreS) : hex('#e890a0');
      if (fuerte && nube < 0.45 && k % 3 === 0) disco(xx, yy, 1, c); else pset(xx, yy, c); } }
  // las moléculas raras: muy pocas, doradas, que brillan de vez en cuando
  const n = Math.round(lerp(10, 3, mezcla)); for (let k = 0; k < (u > 0.4 ? n : 0); k++) { const xx = Math.round(x0 + 8 + h(k, 3, 51) * 24 + Math.sin(t + k) * 3), yy = Math.round(nivel + 10 + h(k, 4, 51) * 80 * (0.3 + mezcla * 0.7));
    pset(xx, yy, C.oro); if (Math.sin(t * 3 + k * 2) > 0.85) { pset(xx + 1, yy, C.oroL); pset(xx - 1, yy, C.oroL); pset(xx, yy - 1, C.oroL); pset(xx, yy + 1, C.oroL); } }
  // la gota que cae desde la punta de la pipeta y la salpicadura
  if (u > 0 && u < 0.4) { const gy = Math.round(lerp(29, nivel - 2, u / 0.4)); disco(160, gy, 2.5, C.sangreS); disco(160, gy, 1.5, C.sangre); pset(160, gy - 3, C.sangreS); pset(160, gy - 4, C.sangreS); pset(159, gy - 1, C.sangreL); }
  if (u >= 0.38 && u < 0.52) { const s = (u - 0.38) / 0.14; for (let i = -1; i <= 1; i += 2) for (let r = 0; r < 3; r++) pset(160 + i * Math.round(3 + s * 12 + r), nivel - (r === 1 ? 1 : 0), hex('#f8fbfd'));
    for (let k = 0; k < 4; k++) pset(154 + k * 4, Math.round(nivel - 2 - Math.sin(s * Math.PI) * (3 + (k % 2) * 3)), C.blanco); }
  // la gradilla de alambre, por delante de los tubos
  rect(100, 140, 220, 143, C.k); rect(101, 141, 219, 142, C.metalL); rect(100, 147, 220, 150, C.k); rect(101, 148, 219, 149, C.metal); for (const x of [102, 218]) rect(x - 1, 140, x + 1, 150, C.metalD);
  for (let x = 106; x < 216; x += 10) pset(x, 142, C.metalS);
  // la pipeta automática, en diagonal desde arriba a la derecha; con la gota en la punta hasta que la suelta y luego se va
  { const ret = Math.max(0, Math.min(1, (u - 0.42) / 0.12)), dx = 0.77, dy = -0.64, px = 0.64, py = 0.77, off = ret * 80 + Math.sin(t * 2.3) * 0.6 * (1 - ret), tx = 161 + dx * off, ty = 27 + dy * off;
    const P = (s, w) => [Math.round(tx + dx * s + px * w), Math.round(ty + dy * s + py * w)];
    poligono([P(-1, -1.5), P(-1, 1.5), P(13, 3.5), P(13, -3.5)], C.k); poligono([P(0, -0.6), P(0, 0.6), P(12, 2.5), P(12, -2.5)], hex('#eef6f8'));
    poligono([P(13, -5), P(13, 5), P(70, 5), P(70, -5)], C.k); poligono([P(14, -4), P(14, 4), P(70, 4), P(70, -4)], C.tealT); poligono([P(14, 1.5), P(14, 4), P(70, 4), P(70, 1.5)], C.tealTS);
    poligono([P(15, -4), P(15, 4), P(19, 4), P(19, -4)], hex('#e8ecf0')); poligono([P(30, -4), P(30, -2), P(60, -2), P(60, -4)], hex('#8ae0d8'));
    if (u <= 0) { pset(Math.round(tx), Math.round(ty + 1), C.sangre); pset(Math.round(tx) - 1, Math.round(ty + 1), C.sangre); pset(Math.round(tx), Math.round(ty + 2), C.sangreS); } }
  // la lupa con guante: agranda lo que hay detrás y busca las moléculas doradas
  const lp = o.lupa ?? 0; if (lp > 0) { const lx = Math.round(160 + Math.sin(t * 1.3) * 18), ly = Math.round(lerp(200, 100, Math.min(1, lp * 2)) + Math.cos(t * 0.9) * 22);
    c_lupaAumenta(R, lx, ly, 15, 2); R.anillo(lx, ly, 15.5, C.metalL); for (let a = 0; a < 6.28; a += 0.02) { pset(Math.round(lx + Math.cos(a) * 16), Math.round(ly + Math.sin(a) * 16), C.k); pset(Math.round(lx + Math.cos(a) * 17), Math.round(ly + Math.sin(a) * 17), C.k); }
    pset(lx - 7, ly - 9, C.blanco); pset(lx - 8, ly - 8, C.blanco); pset(lx - 9, ly - 6, C.blanco);
    const ox = Math.round(x0 + 8 + h(0, 3, 51) * 24 + Math.sin(t) * 3); if (Math.abs(ox - lx) < 12) R.icono('?', lx + 20, ly - 26, C.rojo, C.k, 2);
    linea(lx + 12, ly + 12, lx + 30, ly + 30, C.k); linea(lx + 13, ly + 12, lx + 31, ly + 30, C.maderaS); linea(lx + 12, ly + 13, lx + 30, ly + 31, C.maderaS); linea(lx + 14, ly + 12, lx + 31, ly + 29, C.k); guante(R, lx + 34, ly + 34, -1); }
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
// La redacción del periódico en Nueva York. Arriba, el techo con sus plafones; los ventanales con Manhattan en tres capas
// (a lo lejos, las siluetas con el Empire State —su luz roja parpadea— y el Chrysler; en medio, los edificios con sus
// ventanas, los depósitos de agua de los tejados y el vapor de las chimeneas; a la izquierda, la fachada de enfrente), las
// nubes y un avión que cruzan, un destello del sol que corre por los cristales, el estor medio bajado y los reflejos del
// vidrio. Debajo, la cinta luminosa de la bolsa, que corre con flechas y cifras; en la pared, los tres relojes (Nueva
// York, Londres y Tokio) con su segundero, el tablón de corcho con recortes, fotos e hilo rojo, las dos teles (la bolsa,
// con la línea que avanza, y el telediario, con la presentadora y un gráfico que cambia) y una portada enmarcada. Al
// fondo, las filas de mesas: tres compañeros entre sus pantallas (uno teclea, otra habla por teléfono, otro bebe café),
// pantallas que cambian, sillas vacías, el ventilador de mesa, la pila de periódicos, el ficus que se mece y el
// archivador; la moqueta con el pasillo. La mesa del periodista va por delante: redaccionMesa(). o.noche: cielo con
// estrellas y ventanas encendidas que se apagan y se encienden
export function redaccion(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, N = !!o.noche, P = g_RED;
  // el techo de placas con los plafones y la banda de encima de los ventanales
  rect(0, 0, 319, 15, P.techo); rect(0, 7, 319, 7, P.techoS); for (let x = 12; x < 320; x += 40) rect(x, 0, x, 11, P.techoS);
  for (const [x0, x1] of [[182, 228], [236, 270]]) { rect(x0, 1, x1, 5, C.k); rect(x0 + 1, 2, x1 - 1, 4, N ? hex('#fff0c8') : C.blanco); for (let x = x0 + 5; x < x1; x += 5) pset(x, 3, P.techoS); }
  rect(0, 12, 319, 15, P.soffit); rect(0, 12, 319, 12, P.techoS);

  // los ventanales: el cielo con sus nubes y un avión (de noche, estrellas)
  rect(0, 16, 319, 76, C.k);
  if (N) { rect(0, 17, 319, 44, C.noche1); rect(0, 45, 319, 75, C.noche2); for (let k = 0; k < 30; k++) { const x = (k * 71 + 13) % 320, y = 18 + (k * 37) % 30; if (x < 272 || y > 46) pset(x, y, Math.sin(t * 2 + k) > 0.4 ? C.blanco : C.grisL); } }
  else { rect(0, 17, 319, 33, C.cielo2); rect(0, 34, 319, 55, C.cielo3); rect(0, 56, 319, 75, P.bruma); }
  R.recorte([0, 17, 255, 75]);
  if (!N) for (let k = 0; k < 2; k++) g_nube(R, ((t * (3 + k) + k * 150) % 340) - 40, 27 + k * 7, 15 - k * 3);
  { const u = (t % 26) / 9; if (u < 1) { const ax = Math.round(lerp(262, -20, u)), ay = 24 - Math.round(u * 3), c = N ? C.grisS : C.blanco;
    rect(ax, ay, ax + 6, ay, c); pset(ax + 5, ay - 1, c); pset(ax + 2, ay + 1, N ? C.grisS : C.grisL); if (!N) for (let i = 1; i < 30; i += 2) pset(ax + 7 + i, ay, P.estela); if (Math.floor(t * 3) % 2) pset(ax, ay, C.rojo); } }
  R.recorte(null);
  // Manhattan a lo lejos: siluetas, el Empire State (su antena parpadea) y la corona del Chrysler
  const lej = N ? P.lejosN : P.lejos;
  for (let k = 0; k < 27; k++) { const x = k * 12 - 4, hh = 12 + Math.round(h(k, 1, 410) * (x > 256 ? 14 : 20)); rect(x, 75 - hh, x + 10, 75, lej); if (h(k, 2, 410) < 0.4 && x < 262) rect(x + 4, 72 - hh, x + 5, 75 - hh, lej); }
  rect(133, 40, 147, 75, lej); rect(135, 34, 145, 40, lej); rect(137, 28, 143, 34, lej); rect(139, 24, 141, 28, lej); rect(140, 22, 140, 24, lej); if (Math.floor(t * 1.5) % 2) pset(140, 22, C.rojo);
  rect(163, 40, 173, 75, lej); for (let i = 0; i < 4; i++) disco(168, 40 - i * 4, 5 - i, P.cromo); rect(168, 22, 168, 27, P.cromo);
  for (let i = 0; i < 4; i++) { const r = 5 - i; for (let s = -r + 1; s < r; s += 2) pset(168 + s, 39 - i * 4, C.grisS); }
  // en medio, los edificios con sus ventanas, depósitos de agua en los tejados, vapor y la luz roja de una antena
  for (let k = 0; k < 13; k++) {
    const x = k * 26 - 12 + Math.round(h(k, 3, 410) * 6), w = 16 + Math.round(h(k, 4, 410) * 6), alto = x > 250 ? 22 + Math.round(h(k, 5, 410) * 6) : 24 + Math.round(h(k, 5, 410) * 18), top = 75 - alto;
    const c = N ? (k % 2 ? P.medioN1 : P.medioN2) : (k % 2 ? P.medio1 : P.medio2);
    rect(x, top, x + w, 75, c); if (!N) rect(x, top, x + w, top, P.medioL);
    for (let y = top + 3; y < 73; y += 4) for (let i = 2; i < w - 1; i += 3) {
      if (N) { if (h(k * 31 + i, y, Math.floor(t * 0.12 + h(i, y, 9) * 5)) < 0.42) rect(x + i, y, x + i + 1, y + 1, P.ventN); }
      else rect(x + i, y, x + i + 1, y + 1, h(k * 31 + i, y, 411) < 0.3 ? P.ventD : P.ventO); }
    if (x < 250 && h(k, 6, 410) < 0.5) { const tx = x + 3 + Math.round(h(k, 7, 410) * (w - 9)); rect(tx, top - 3, tx, top - 1, C.k); rect(tx + 5, top - 3, tx + 5, top - 1, C.k); rect(tx - 1, top - 9, tx + 6, top - 4, P.deposito); rect(tx - 1, top - 7, tx + 6, top - 7, P.depositoS); poligono([[tx - 1, top - 9], [tx + 2.5, top - 12], [tx + 6, top - 9]], P.depositoS); }
    if (k === 2 || k === 6) for (let p = 0; p < 4; p++) { const u = (t * 0.35 + p / 4) % 1; disco(x + w - 3 + u * 6 + Math.sin(t + p) * 1.5, top - 2 - u * 11, 1 + u * 2, N ? P.lejosN : P.vapor); }
    if (k === 9) { rect(x + 8, top - 10, x + 8, top, C.k); if (Math.floor(t * 1.2) % 2) pset(x + 8, top - 10, C.rojo); }
  }
  // a la izquierda, la fachada del edificio de enfrente; el destello del sol corre por sus ventanas
  { const c = N ? P.cercaN : P.cerca; rect(0, 24, 34, 75, c); if (!N) rect(0, 24, 34, 24, P.medioL);
    for (let y = 28; y < 74; y += 5) for (let x = 3; x < 32; x += 5) rect(x, y, x + 3, y + 3, N ? (h(x, y, Math.floor(t * 0.1) + 412) < 0.5 ? P.ventN : C.k) : (h(x, y, 412) < 0.3 ? P.ventD : P.ventC));
    if (!N) { const gx = Math.round((t * 18) % 120) - 40; for (let y = 28; y < 74; y++) { const xx = gx + Math.round((74 - y) * 0.5); if (xx > 1 && xx < 33 && R.pget(xx, y) !== c) pset(xx, y, C.blanco); } } }
  // los montantes de aluminio, el estor medio bajado y los reflejos del vidrio
  rect(0, 16, 319, 16, C.k); rect(0, 17, 319, 17, P.alu);
  for (const x of [64, 128, 192, 256]) { rect(x - 1, 16, x + 2, 76, C.k); rect(x, 17, x + 1, 75, P.alu); rect(x, 17, x, 75, P.aluL); }
  rect(66, 18, 126, 31, P.estor); for (let y = 21; y < 31; y += 3) rect(66, y, 126, y, P.estorS); rect(66, 31, 126, 32, P.estorS); rect(66, 33, 126, 33, C.k); linea(122, 33, 122, 39, C.k); pset(122, 40, P.estorS);
  for (const x0 of [2, 66, 130, 194, 258]) for (let i = 0; i < 16; i += 2) for (const d of [30, 34]) { const x = x0 + d + i, y = 72 - i * 3; if (x < 278 || y > 46) pset(x, y, N ? hex('#3a4270') : P.reflejo); }
  rect(0, 76, 319, 78, P.alfeizar); rect(0, 76, 319, 76, C.blanco); rect(0, 78, 319, 78, P.paredS);

  // la cinta luminosa de la bolsa, que corre: flechas verdes que suben y rojas que bajan, con sus cifras
  rect(0, 79, 319, 87, C.k); rect(0, 80, 319, 86, P.ticker);
  R.recorte([0, 80, 319, 86]);
  for (let i = 0; i < 12; i++) { const x = Math.round(((i * 34 - t * 16) % 408 + 408) % 408) - 44, sube = h(i, 1, 413) > 0.4, c = sube ? C.verdeL : hex('#e85a4a');
    for (let j = 0; j < 3; j++) { const y = sube ? 82 + j : 84 - j; for (let xx = x + 2 - j; xx <= x + 2 + j; xx++) pset(xx, y, c); }
    g_digitos(R, (10 + Math.floor(h(i, 2, 413) * 89)) + '.' + Math.floor(h(i, 3, 413) * 9), x + 7, 81, sube ? hex('#c8f0a8') : hex('#f8b8a8')); }
  R.recorte(null);

  // la pared: los tres relojes (Nueva York, Londres y Tokio) con su segundero
  rect(0, 88, 319, 121, P.pared); for (let x = 48; x < 320; x += 64) rect(x, 88, x, 121, P.paredS);
  [[22, 10], [44, 15], [66, 0]].forEach(([x, hr]) => { disco(x, 96, 7, C.k); disco(x, 96, 6, C.blanco); for (let k = 0; k < 4; k++) pset(x + [0, 5, 0, -5][k], 96 + [-5, 0, 5, 0][k], C.grisS);
    const a = ((hr % 12) / 12 + t / 43200) * Math.PI * 2 - Math.PI / 2, m = (t / 3600 + 0.17) * Math.PI * 2 - Math.PI / 2, s = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2;
    linea(x, 96, Math.round(x + Math.cos(a) * 3), Math.round(96 + Math.sin(a) * 3), C.k); linea(x, 96, Math.round(x + Math.cos(m) * 5), Math.round(96 + Math.sin(m) * 5), C.k); linea(x, 96, Math.round(x + Math.cos(s) * 5), Math.round(96 + Math.sin(s) * 5), C.rojo); pset(x, 96, C.k); });
  // el tablón de corcho con los recortes, las fotos, las chinchetas y el hilo rojo que los une
  rect(80, 89, 140, 103, C.k); rect(81, 90, 139, 102, P.corcho); for (let k = 0; k < 30; k++) pset(82 + Math.floor(h(k, 1, 414) * 56), 91 + Math.floor(h(k, 2, 414) * 11), P.corchoS);
  const NOTAS = [[84, 92, 0], [95, 94, 1], [107, 91, 0], [119, 94, 2], [130, 92, 0]];
  for (const [x, y, k] of NOTAS) { rect(x, y, x + 7, y + 7, k === 1 ? hex('#8aa4c0') : k === 2 ? hex('#f0e090') : C.blanco); if (k === 0) for (let j = 2; j < 7; j += 2) rect(x + 1, y + j, x + 5 - (j % 4 ? 1 : 0), y + j, C.grisL); if (k === 1) { rect(x + 2, y + 2, x + 5, y + 5, hex('#5a6a8a')); pset(x + 3, y + 3, hex('#f0c8a0')); } if (k === 2) for (let j = 2; j < 7; j += 2) rect(x + 1, y + j, x + 6, y + j, hex('#c8b860')); }
  for (let i = 0; i + 1 < NOTAS.length; i++) linea(NOTAS[i][0] + 3, NOTAS[i][1], NOTAS[i + 1][0] + 3, NOTAS[i + 1][1], C.rojo);
  for (const [x, y] of NOTAS) { pset(x + 3, y, C.rojoS); pset(x + 3, y - 1, C.rojo); }
  // la tele de la bolsa: la línea avanza sobre su rejilla, con el área de debajo y la cifra del día
  rect(150, 88, 194, 104, C.k); rect(151, 89, 193, 103, P.tele); rect(152, 90, 192, 102, P.bolsa);
  for (let x = 156; x < 192; x += 8) for (let y = 91; y < 102; y += 2) pset(x, y, P.bolsaR);
  { let prev = null; for (let i = 0; i < 40; i++) { const y = Math.max(92, Math.min(101, Math.round(97 - Math.sin(i * 0.45 + t * 0.9) * 2 - Math.sin(i * 0.17 + t * 0.4) * 2 - i * 0.06))); for (let yy = y + 1; yy <= 101; yy += 2) pset(152 + i, yy, hex('#1e4a2a')); pset(152 + i, y, C.verdeL); if (prev !== null && Math.abs(prev - y) > 1) rect(152 + i, Math.min(prev, y), 152 + i, Math.max(prev, y), C.verdeL); prev = y; } }
  g_digitos(R, '+1.2', 178, 90, hex('#c8f0a8'));
  // la tele del telediario: la presentadora, el gráfico que cambia (la gota con «?», unas barras, la bolsa de dinero), el
  // rótulo de abajo que corre y la luz de «en directo»
  rect(200, 88, 244, 104, C.k); rect(201, 89, 243, 103, P.tele); rect(202, 90, 242, 102, P.noticias); rect(202, 90, 242, 93, P.noticiasS);
  R.busto('mujer', tela('#c83a5a', '#a02a48', { H: '#3a2418', V: '#3a2418' }), 205, 90, t, { rie: Math.sin(t * 7) > 0.2 });
  { const g = Math.floor(t / 3) % 3; rect(221, 91, 241, 99, C.blanco); rect(222, 92, 240, 98, hex('#dce8f4'));
    if (g === 0) { R.icono('gota', 224, 92, C.sangre, hex('#dce8f4')); R.icono('?', 233, 92, C.k, hex('#dce8f4')); }
    else if (g === 1) for (let k = 0; k < 5; k++) { const hb = 2 + Math.round((0.5 + 0.5 * Math.sin(t * 2 + k)) * 4); rect(224 + k * 3, 98 - hb, 225 + k * 3, 98, k === 4 ? C.rojo : C.azulL); }
    else R.icono('bolsa', 227, 91, C.oro, hex('#dce8f4')); }
  rect(202, 100, 242, 102, C.rojo); R.recorte([203, 101, 241, 101]); for (let k = 0; k < 6; k++) { const x = Math.round(((k * 9 - t * 12) % 54 + 54) % 54) + 196; rect(x, 101, x + 5, 101, C.blanco); } R.recorte(null);
  if (Math.floor(t * 2) % 2) pset(240, 91, C.rojo);
  // la portada enmarcada en la pared
  rect(249, 89, 265, 104, C.k); rect(250, 90, 264, 103, hex('#c8a46a')); rect(251, 91, 263, 102, hex('#f2eee4')); for (let x = 253; x < 262; x += 2) rect(x, 92, x, 93, C.k); rect(252, 95, 262, 96, C.k); rect(252, 98, 256, 101, C.grisL); for (let y = 98; y < 102; y += 2) rect(258, y, 262, y, C.grisL);

  // la moqueta, con su dibujo, la sombra de las mesas y la alfombra del pasillo por donde pasa la gente
  rect(0, 122, 319, 179, P.moqueta); for (let y = 132; y < 180; y += 6) for (let x = (y % 12 ? 0 : 5); x < 320; x += 10) pset(x, y, P.moquetaS);
  rect(0, 128, 319, 130, P.sombra); rect(0, 133, 319, 146, P.pasillo); rect(0, 133, 319, 133, P.moquetaL); rect(0, 146, 319, 146, P.moquetaS); for (let x = 3; x < 320; x += 8) { pset(x, 136, P.moquetaL); pset(x + 4, 143, P.moquetaL); }

  // al fondo, las mesas: los compañeros entre sus pantallas, las pantallas que cambian, las sillas vacías y lo de encima
  const mesa = (x0) => { rect(x0, 118, x0 + 44, 122, C.k); rect(x0 + 1, 119, x0 + 43, 121, P.mesa); rect(x0 + 1, 119, x0 + 43, 119, C.blanco); rect(x0 + 2, 122, x0 + 42, 127, P.panel); rect(x0 + 2, 122, x0 + 42, 122, P.panelS); rect(x0 + 2, 127, x0 + 42, 127, P.panelS); };
  const espalda = (x, w = 13) => { rect(x, 106, x + w, 117, C.k); rect(x + 1, 107, x + w - 1, 116, P.espalda); rect(x + 1, 107, x + w - 1, 107, P.espaldaL); rect(x + (w >> 1) - 1, 117, x + (w >> 1) + 1, 117, C.k); };
  const pantallita = (x, k) => { rect(x, 105, x + 15, 116, C.k); rect(x + 1, 106, x + 14, 115, P.pantalla); rect(x + 7, 116, x + 8, 117, C.k);
    if (k % 2) { let y = 112; for (let i = 0; i < 12; i++) { y = Math.max(107, Math.min(114, y + Math.round(Math.sin(i * 1.3 + t * 2 + k) * 1.2))); pset(x + 2 + i, y, C.verdeL); } }
    else for (let j = 0; j < 4; j++) { const yy = 107 + ((j * 2 + Math.floor(t * 1.5 + k)) % 8); rect(x + 2, yy, x + 2 + 4 + Math.floor(h(j + Math.floor(t * 1.5 + k), x, 415) * 8), yy, P.pantallaL); } };
  const silla = (x) => { rect(x + 1, 108, x + 11, 108, C.k); rect(x, 109, x + 12, 119, C.k); rect(x + 1, 109, x + 11, 118, P.silla); for (let y = 110; y < 118; y += 2) for (let i = x + 2 + (y % 4 ? 1 : 0); i < x + 11; i += 2) pset(i, y, P.sillaL);
    rect(x - 2, 115, x - 1, 121, C.k); rect(x + 13, 115, x + 14, 121, C.k); rect(x - 2, 120, x + 14, 122, C.k); rect(x - 1, 121, x + 13, 121, P.sillaL);
    rect(x + 5, 123, x + 7, 127, C.k); rect(x, 127, x + 12, 128, C.k); for (const dx of [0, 6, 12]) { pset(x + dx, 129, C.k); pset(x + dx, 130, C.metalS); } };
  const persona = (tipo, pal, bx, by) => { R.busto(tipo, pal.p, bx, by, t, { rie: pal.rie }); rect(bx + 1, by + 12, bx + 7, 117, pal.p.C); rect(bx, by + 12, bx, 117, C.k); rect(bx + 8, by + 12, bx + 8, 117, C.k); };
  // A · el redactor de la barba blanca teclea sin parar
  { const x0 = 4, ty = Math.floor(t * 5) % 5 === 0 ? 1 : 0; persona('calvo', { p: tela('#5a7aa8', '#3e5a88', { W: '#e8e8ee' }) }, x0 + 18, 104 + ty);
    espalda(x0 + 3); espalda(x0 + 29); mesa(x0); const f = Math.floor(t * 8) % 2; rect(x0 + 17, 119, x0 + 27, 119, hex('#4a4e58')); pset(x0 + 19 + f, 118, P.piel); pset(x0 + 25 - f, 118, P.piel);
    rect(x0 + 1, 113, x0 + 3, 117, C.k); rect(x0 + 2, 114, x0 + 2, 117, C.blanco); }
  // B · dos pantallas encendidas, la silla vacía y el teléfono con su luz de mensaje
  { const x0 = 56; pantallita(x0 + 4, 0); pantallita(x0 + 22, 1); mesa(x0); rect(x0 + 39, 114, x0 + 43, 118, C.k); rect(x0 + 40, 115, x0 + 42, 117, hex('#d8d0c0')); if (Math.floor(t * 1.5) % 2) pset(x0 + 42, 115, C.rojo); silla(x0 + 16); }
  // C · la redactora habla por teléfono, asiente y gesticula
  { const x0 = 108, by = 104 + (Math.floor(t * 0.8) % 2), bx = x0 + 18; persona('mujer', { p: tela('#5aa86a', '#3a8a4a', { H: '#5a3418', V: '#5a3418' }), rie: Math.sin(t * 6) > 0 }, bx, by);
    rect(bx + 8, by + 2, bx + 10, by + 8, C.k); pset(bx + 9, by + 3, hex('#4a4450')); espalda(x0 + 3); espalda(x0 + 29); mesa(x0);
    for (let j = 0; j < 3; j++) rect(x0 + 32 + (j % 2), 117 - j * 2, x0 + 41 + (j % 2), 118 - j * 2, j % 2 ? C.papel : hex('#e8dcc0')); }
  // D · la pantalla ancha, la pila de periódicos, el ventilador de mesa que gira y la silla vacía
  { const x0 = 160; rect(x0 + 13, 104, x0 + 35, 116, C.k); rect(x0 + 14, 105, x0 + 34, 115, P.pantalla); for (let j = 0; j < 3; j++) rect(x0 + 16, 107 + j * 3, x0 + 16 + 6 + ((j * 5 + Math.floor(t)) % 12), 107 + j * 3, P.pantallaL); rect(x0 + 23, 116, x0 + 25, 117, C.k);
    for (let j = 0; j < 6; j++) { rect(x0 + 1 + (j % 2), 117 - j * 2, x0 + 11 + (j % 2), 118 - j * 2, C.k); rect(x0 + 2 + (j % 2), 117 - j * 2, x0 + 10 + (j % 2), 117 - j * 2, hex('#ece4d0')); }
    rect(x0 + 40, 113, x0 + 41, 117, C.metalD); disco(x0 + 40, 110, 3, C.k); disco(x0 + 40, 110, 2, C.metalS); const a = t * 12; linea(x0 + 40, 110, Math.round(x0 + 40 + Math.cos(a) * 2), Math.round(110 + Math.sin(a) * 2), C.metalL);
    mesa(x0); silla(x0 + 20); }
  // E · el redactor de los rizos, con su taza (bebe de vez en cuando); el hueco de la derecha queda libre para los papeles
  { const x0 = 212, bx = x0 + 4, by = 104, bebe = (t % 7) < 1.1; persona('rizos', { p: tela('#c86a3a', '#a04a2a', { H: '#2c2232', h: '#54466a' }) }, bx, by);
    espalda(x0 + 14, 9); mesa(x0);
    if (bebe) { rect(bx + 5, by + 7, bx + 8, by + 11, C.k); rect(bx + 6, by + 8, bx + 7, by + 10, C.blanco); } else { rect(x0 + 1, 114, x0 + 4, 118, C.k); rect(x0 + 2, 115, x0 + 3, 117, C.blanco); }
    rect(x0 + 36, 109, x0 + 37, 118, C.metalD); poligono([[x0 + 32, 109], [x0 + 35, 105], [x0 + 41, 105], [x0 + 43, 109]], C.k); rect(x0 + 35, 109, x0 + 41, 109, hex('#fff0b0')); }
  // F · el ficus que se mece y el archivador
  rect(300, 96, 319, 127, C.k); rect(301, 97, 319, 127, P.archivo); for (const y of [104, 112, 120]) { rect(301, y, 319, y, P.archivoS); rect(308, y - 4, 313, y - 3, C.metalD); }
  poligono([[268, 114], [284, 114], [282, 127], [270, 127]], C.k); poligono([[269, 115], [283, 115], [281, 126], [271, 126]], P.maceta); rect(269, 115, 283, 116, P.macetaS);
  linea(276, 114, 277, 92, C.maderaS);
  for (let k = 0; k < 9; k++) { const lx = 276 + Math.round((h(k, 1, 416) - 0.5) * 18 + Math.sin(t * 0.9 + k) * 1), ly = 92 + Math.round(h(k, 2, 416) * 20); disco(lx, ly, 3, C.k); disco(lx, ly, 2.4, k % 3 ? C.verde : C.hierbaS); pset(lx - 1, ly - 1, C.verdeL); }
}
// la mesa del periodista por delante de él: el tablero con su canto, dos cajoneras con tiradores y, en medio, el hueco
// de las piernas con la papelera llena de bolas de papel; encima, la pantalla con el documento que se escribe (con notas
// adhesivas en el marco), el teclado y el ratón, el bote de lápices, las carpetas, la foto enmarcada, la grapadora, los
// clips, la libreta de espiral en la que se van llenando líneas (o.notas 0–1), el teléfono negro que suena
// (o.suena; o.cuelga: el auricular levantado, 0–1; negativo, no se pinta porque está en la mano de quien habla) y el
// teléfono rojo de los abogados (o.abogados: suena y tiembla, con la balanza encima; o.tapa 0–1: el periodista le echa
// encima una pila de periódicos y sigue dando saltitos debajo)
export function redaccionMesa(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, P = g_RED;
  // el tablero, las cajoneras y el hueco con la papelera
  rect(40, 148, 300, 154, C.k); rect(41, 149, 299, 152, P.mesa); rect(41, 149, 299, 149, C.blanco); rect(41, 153, 299, 153, P.mesaS);
  rect(46, 154, 294, 179, C.k); rect(47, 155, 293, 179, P.mesaF);
  for (const [a, b] of [[48, 104], [236, 292]]) { rect(a, 155, b, 179, P.cajonera); const mx = (a + b) >> 1;
    for (const y of [157, 166, 175]) { rect(a + 2, y, b - 2, y + 7, C.k); rect(a + 3, y + 1, b - 3, y + 6, P.cajon); rect(a + 3, y + 1, b - 3, y + 1, P.cajonL); rect(mx - 6, y + 3, mx + 6, y + 4, C.k); rect(mx - 5, y + 3, mx + 5, y + 3, C.metalL); } }
  rect(106, 155, 234, 179, P.hueco); rect(106, 155, 234, 158, P.huecoS); disco(170, 161, 2, C.k); pset(170, 161, P.huecoS);
  rect(206, 166, 226, 179, C.k); rect(207, 167, 225, 179, P.papelera); rect(207, 167, 225, 168, P.papeleraL); for (let x = 209; x < 225; x += 4) rect(x, 170, x, 178, P.papeleraL);
  for (const [x, y] of [[211, 165], [217, 164], [222, 166]]) { disco(x, y, 2.5, C.k); disco(x, y, 2, C.blanco); pset(x - 1, y, C.grisL); }
  // el brillo del tablero bajo la ventana
  for (let y = 149; y < 152; y++) for (let x = 244 + (y % 2) * 2; x < 298; x += 4) pset(x, y, C.blanco);
  // la libreta de espiral con las notas que se van llenando
  rect(70, 142, 100, 148, C.k); rect(71, 143, 99, 147, C.papel); for (let x = 73; x < 99; x += 3) pset(x, 142, C.metalL);
  const n = Math.round((o.notas ?? 0) * 4); for (let k = 0; k < n; k++) rect(74, 144 + k, 74 + 8 + (k * 7) % 14, 144 + k, hex('#3a3a6a'));
  // las carpetas, el bote de lápices y la mancha del café
  for (let j = 0; j < 3; j++) { rect(102, 147 - j * 2, 110, 148 - j * 2, C.k); rect(103, 147 - j * 2, 109, 147 - j * 2, j % 2 ? hex('#e8c86a') : C.ocre); }
  rect(142, 140, 150, 148, C.k); rect(143, 141, 149, 148, hex('#3a6ac8')); rect(143, 141, 143, 148, hex('#5a8ae8')); for (const [x, y, c] of [[144, 134, C.amarillo], [146, 136, C.rojo], [148, 135, C.k]]) { rect(x, y, x, 140, c); pset(x, y, C.k); }
  R.anillo(156, 151, 2, hex('#d8ccb4'));
  // la pantalla con el documento que se escribe y el cursor, con dos notas adhesivas; el teclado y el ratón
  rect(190, 128, 226, 148, C.k); rect(191, 129, 225, 146, hex('#2a3a5a')); rect(194, 131, 222, 145, hex('#e8eef6'));
  { const nl = 2 + Math.floor((t * 1.2) % 6); for (let k = 0; k < nl; k++) rect(196, 133 + k * 2, 196 + 8 + Math.floor(h(k, 1, 417) * 16), 133 + k * 2, hex('#6a7a9a'));
    if (Math.floor(t * 3) % 2) rect(196 + 9 + Math.floor(h(nl - 1, 1, 417) * 16), 132 + (nl - 1) * 2, 196 + 9 + Math.floor(h(nl - 1, 1, 417) * 16), 134 + (nl - 1) * 2, C.k); }
  rect(206, 147, 210, 149, C.k); rect(188, 127, 192, 131, hex('#f0e070')); pset(189, 129, hex('#c8b84a')); rect(223, 130, 227, 134, hex('#f0a0c0'));
  rect(194, 150, 222, 152, C.k); rect(195, 150, 221, 151, hex('#4a4e58')); for (let x = 196; x < 221; x += 2) pset(x, 150, hex('#7a7e88'));
  rect(227, 150, 230, 152, C.k); pset(228, 150, C.metalL);
  // la foto enmarcada (dos personas en un prado)
  rect(230, 138, 240, 147, C.k); rect(231, 139, 239, 146, hex('#c8a46a')); rect(232, 140, 238, 145, hex('#a8daf4')); rect(232, 143, 238, 145, C.hierba); pset(234, 142, C.k); pset(236, 142, C.rojo); pset(240, 148, C.k);
  // la grapadora y la bandeja de clips, bajas, a la derecha (detrás pasa gente de pie)
  rect(282, 144, 296, 148, C.k); rect(283, 145, 295, 147, hex('#3a3e48')); rect(283, 144, 293, 145, C.k); rect(284, 144, 292, 144, C.rojo); pset(294, 146, C.metalL);
  rect(272, 146, 279, 148, C.k); rect(273, 146, 278, 147, hex('#d8d0c0')); pset(274, 146, C.metalL); pset(276, 147, C.metalL);
  // el teléfono negro: la base con su teclado y su pantallita; el auricular en la horquilla, levantado o en la mano
  const v1 = o.suena ? Math.round(Math.sin(t * 50)) : 0, X = 160 + v1, cu = o.cuelga ?? 0;
  rect(X, 140, X + 22, 148, C.k); rect(X + 1, 141, X + 21, 147, P.telefono); rect(X + 1, 141, X + 21, 141, P.telefonoL);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) pset(X + 13 + i * 2, 143 + j * 2, hex('#8a8494'));
  rect(X + 3, 143, X + 9, 145, C.k); rect(X + 4, 144, X + 8, 144, o.suena && Math.floor(t * 6) % 2 ? C.verdeL : hex('#3a5a3a'));
  rect(X + 2, 138, X + 4, 140, C.k); rect(X + 18, 138, X + 20, 140, C.k);
  if (cu >= 0) { const dy = Math.round(cu * 20); rect(X - 2, 137 - dy, X + 24, 140 - dy, C.k); rect(X - 1, 138 - dy, X + 23, 139 - dy, P.telefono); rect(X - 1, 138 - dy, X + 23, 138 - dy, P.telefonoL); rect(X - 2, 136 - dy, X + 3, 136 - dy, C.k); rect(X + 19, 136 - dy, X + 24, 136 - dy, C.k);
    if (dy === 0) for (let i = 0; i < 6; i++) pset(X - 3 - (i % 2), 140 + i, C.k); }
  if (o.suena && Math.floor(t * 4) % 2) for (const dx of [-6, 30]) { linea(160 + dx, 132, 160 + dx + (dx < 0 ? -4 : 4), 128, C.k); linea(160 + dx + (dx < 0 ? -3 : 3), 135, 160 + dx + (dx < 0 ? -7 : 7), 132, C.k); }
  // el teléfono rojo de los abogados
  if (o.abogados) { const tp = o.tapa ?? 0, sa = Math.round(Math.abs(Math.sin(t * (tp > 0.9 ? 9 : 25))) * (tp > 0.9 ? 3 : 2)), x = 262, y = 148 - sa;
    rect(x - 12, y - 8, x + 12, y, C.k); rect(x - 11, y - 7, x + 11, y - 1, C.rojo); rect(x - 11, y - 7, x + 11, y - 7, hex('#e86a6a')); rect(x - 11, y - 1, x + 11, y - 1, C.rojoS);
    disco(x, y - 4, 3, C.k); disco(x, y - 4, 2, C.blanco); pset(x, y - 4, C.k); pset(x + 8, y - 4, Math.floor(t * 6) % 2 ? C.oroL : C.rojoS);
    rect(x - 14, y - 11, x + 14, y - 8, C.k); rect(x - 13, y - 10, x + 13, y - 9, C.rojoS); rect(x - 13, y - 10, x + 13, y - 10, C.rojo);
    if (tp < 0.9 && Math.floor(t * 4) % 2) { R.icono('balanza', x - 3, y - 22, C.oro, C.k, 1); linea(x - 18, y - 12, x - 22, y - 16, C.k); linea(x + 18, y - 12, x + 22, y - 16, C.k); }
    if (tp > 0) { const yy = Math.round(lerp(100, y - 12, Math.min(1, tp))); for (let k = 0; k < 5; k++) { rect(x - 18 + (k % 2), yy - k * 3, x + 18 - (k % 2), yy - k * 3 + 2, C.k); rect(x - 17 + (k % 2), yy - k * 3, x + 17 - (k % 2), yy - k * 3 + 1, hex('#ece4d0')); rect(x - 14 + (k % 2), yy - k * 3 + 1, x - 4 + (k % 2), yy - k * 3 + 1, hex('#a8a090')); } } }
}
// la rotativa, de noche: la nave de ladrillo con sus cerchas, la lámpara industrial que se mece con su cono de luz y motas
// de papel; la máquina con los seis rodillos que giran (entintados de cian, magenta, amarillo y negro), los engranajes de
// detrás, la banda de papel que serpentea con la impresión que corre, los depósitos de tinta con su nivel y sus burbujas,
// el panel de los tinteros, el manómetro que tiembla, la seta de parada, el contador de ejemplares y la boca del plegado
// por la que bajan los periódicos; la bobina gigante que gira a la izquierda; a la derecha, la pasarela con su barandilla
// y su escalera (un operario la recorre y se para a mirar) y los ventanales con la ciudad de noche; delante, la cinta por
// la que salen los periódicos doblados, que se apilan (o.u 0–1: cuánto ha crecido la pila); en cada portada, la gota y
// la caja con «?»
export function rotativa(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, P = g_ROT;
  // la pared de ladrillo, las cerchas del techo y la columna de acero
  rect(0, 0, 319, 139, P.pared);
  for (let y = 12, f = 0; y < 140; y += 4, f++) { rect(0, y, 319, y, P.llaga); for (let x = (f % 2) * 6; x < 320; x += 12) { rect(x, y + 1, x, y + 3, P.llaga); if (h(x, f, 420) < 0.07) rect(x + 1, y + 1, x + 11, y + 3, P.ladrilloV); } }
  rect(0, 0, 319, 2, P.acero); rect(0, 10, 319, 11, P.acero); for (let x = 0; x < 320; x += 16) { linea(x, 3, x + 8, 9, P.cercha); linea(x + 8, 9, x + 16, 3, P.cercha); }
  rect(222, 12, 228, 139, P.acero); rect(223, 12, 223, 139, P.aceroL); for (let y = 16; y < 139; y += 10) pset(226, y, P.aceroL);
  // los ventanales de la nave con la ciudad de noche: estrellas, edificios con ventanas que se encienden y se apagan, la luz
  // roja de una antena y un avión que cruza; algún cristal sucio y uno abatible abierto
  rect(233, 65, 301, 119, C.k); rect(234, 66, 300, 118, P.noche); rect(234, 66, 300, 84, P.nocheS);
  for (let k = 0; k < 14; k++) pset(236 + Math.floor(h(k, 1, 421) * 62), 68 + Math.floor(h(k, 2, 421) * 24), Math.sin(t * 2.3 + k) > 0.3 ? C.blanco : C.grisS);
  { const u = (t % 15) / 6; if (u < 1) { const ax = Math.round(300 - u * 66); pset(ax, 74, Math.floor(t * 3) % 2 ? C.rojo : C.blanco); pset(ax + 1, 74, C.grisS); } }
  for (let k = 0; k < 8; k++) { const x = 234 + k * 9, hh = 12 + Math.floor(h(k, 3, 421) * 18); rect(x, 118 - hh, x + 7, 118, P.ciudad);
    for (let y = 120 - hh; y < 117; y += 3) for (let i = 1; i < 7; i += 2) if (h(x + i, y, 421 + Math.floor(t * 0.2 + h(i, y, 3) * 4)) < 0.35) pset(x + i, y, P.ventana);
    if (k === 3) { rect(x + 3, 112 - hh, x + 3, 118 - hh, P.ciudad); if (Math.floor(t * 1.4) % 2) pset(x + 3, 112 - hh, C.rojo); } }
  for (const d of [0, 5]) linea(240 + d, 117, 262 + d, 67, P.reflejo);
  for (let x = 245; x < 300; x += 11) rect(x, 66, x, 118, C.k); for (let y = 75; y < 118; y += 9) rect(234, y, 300, y, C.k);
  rect(256, 84, 266, 92, C.k); rect(257, 85, 265, 86, P.aceroL); rect(257, 86, 265, 91, hex('#2a3460'));
  // la lámpara industrial que se mece, con su cono de luz y motas de papel que flotan
  { const lx = 250 + Math.round(Math.sin(t * 0.8) * 1.2);
    for (let y = 24; y < 100; y += 2) { const w = (y - 24) * 0.42; for (let x = Math.round(lx - w) + (y % 4 ? 1 : 0); x <= lx + w; x += 3) { const c0 = R.pget(x, y); if ((c0 === P.pared || c0 === P.llaga) && (x < 278 || y > 46)) pset(x, y, P.luzPared); } }
    for (let k = 0; k < 8; k++) { const u = (t * 0.06 + h(k, 1, 423)) % 1, my = Math.round(30 + h(k, 2, 423) * 64 + u * 10), mw = (my - 24) * 0.42, mx = Math.round(lx + (h(k, 3, 423) - 0.5) * 2 * mw + Math.sin(t + k) * 2); if (Math.sin(t * 2 + k) > -0.3 && (mx < 278 || my > 46)) pset(mx, my, hex('#d8d2b8')); }
    linea(250, 11, lx, 16, C.k); poligono([[lx - 7, 22], [lx - 4, 16], [lx + 4, 16], [lx + 7, 22]], C.k); poligono([[lx - 6, 21], [lx - 3, 17], [lx + 3, 17], [lx + 6, 21]], hex('#3a5a4a')); rect(lx - 3, 17, lx - 2, 18, hex('#5a7a6a')); rect(lx - 2, 22, lx + 2, 23, hex('#fff4c8')); }
  // la escalera, el operario que recorre la pasarela (se para a mirar abajo) y la pasarela con su barandilla amarilla
  rect(306, 62, 306, 133, P.aceroL); rect(314, 62, 314, 133, P.aceroL); for (let y = 66; y < 133; y += 6) rect(306, y, 314, y, P.aceroL);
  for (const x of [244, 292]) { linea(x, 62, x - 10, 74, P.acero); linea(x + 1, 62, x - 9, 74, P.acero); }
  { const u = (t % 16) / 16, anda = (u < 0.3) || (u > 0.5 && u < 0.8), x = Math.round(u < 0.3 ? lerp(232, 256, u / 0.3) : u < 0.5 ? 256 : u < 0.8 ? lerp(256, 232, (u - 0.5) / 0.3) : 232);
    R.actor(ELENCO_CHIBI.sudadera, x, 58, t, { dir: u < 0.3 || (u >= 0.8) ? 1 : -1, anda, tocado: 'gorra', pal: { C: hex('#4a6a9a'), c: hex('#3a5280') }, dedo: !anda && (t % 2) < 1 }); }
  rect(229, 58, 319, 61, C.k); rect(229, 58, 319, 59, P.rejilla); for (let x = 230; x < 320; x += 3) pset(x, 60, P.rejillaS);
  rect(229, 48, 319, 49, P.amarillo); rect(229, 49, 319, 49, P.amarilloS); rect(229, 53, 319, 53, P.amarillo); rect(229, 56, 319, 57, P.amarilloS); for (let x = 231; x < 320; x += 14) rect(x, 48, x + 1, 58, P.amarillo);
  // los depósitos de tinta (cian, magenta, amarillo y negro) con la mirilla del nivel y sus burbujas, y los tubos
  const TINTA = [[hex('#2a8ad8'), hex('#6ab8f0')], [hex('#d82a8a'), hex('#f06ab8')], [hex('#e8d82a'), hex('#f8f080')], [hex('#3a3a44'), hex('#6a6a78')]];
  TINTA.forEach(([c, cl], k) => { const x = 177 + k * 11; rect(x + 3, 26, x + 5, 29, C.metalD); rect(x, 12, x + 8, 26, C.k); rect(x + 1, 13, x + 7, 25, c); rect(x + 1, 13, x + 2, 25, cl); rect(x + 2, 10, x + 6, 12, C.metalD);
    rect(x + 5, 15, x + 6, 24, hex('#14161c')); const lv = 17 + k + Math.round(Math.sin(t * 0.3 + k)); rect(x + 5, lv, x + 6, 24, cl); pset(x + 5 + (Math.floor(t * 3 + k) % 2), 24 - Math.floor(((t * 1.3 + k * 0.3) % 1) * (24 - lv)), C.blanco); });
  // la máquina: el bastidor de acero con sus laterales atornillados, la viga de arriba y la base con franjas de peligro
  rect(10, 26, 220, 132, C.k); rect(11, 27, 219, 131, P.marco); rect(20, 35, 210, 121, P.interior); for (let x = 30; x < 210; x += 30) rect(x, 36, x + 1, 120, P.costilla);
  for (const x of [11, 211]) { rect(x, 27, x + 8, 131, P.placa); rect(x, 27, x, 131, P.placaL); for (let y = 31; y < 130; y += 8) pset(x + 4, y, P.placaL); }
  rect(11, 27, 219, 33, P.placaL); rect(11, 27, 219, 27, C.metalL); rect(11, 34, 219, 34, C.k);
  rect(20, 123, 210, 130, hex('#1c1c22')); for (let y = 124; y < 130; y++) for (let x = 20; x < 211; x++) if (((x + y) >> 2) % 2) pset(x, y, P.amarillo);
  g_pictograma(R, 'orejeras', 156, 36); g_pictograma(R, 'peligro', 169, 36);
  // los engranajes de detrás, la banda de papel que serpentea (la impresión corre por ella) y los seis rodillos
  g_engranaje(R, 65, 92, 12, t * 2.4, P.engranaje); g_engranaje(R, 165, 82, 10, -t * 2.9, P.engranaje);
  // la bobina gigante, que gira sobre su caballete
  linea(12, 118, 0, 139, P.acero); linea(13, 118, 1, 139, P.acero); linea(12, 118, 26, 139, P.acero); linea(13, 118, 27, 139, P.acero);
  disco(12, 118, 17, C.k); disco(12, 118, 16, P.papel); R.anillo(12, 118, 13, P.papelS); R.anillo(12, 118, 9, P.papelS); disco(12, 118, 5, C.metalD);
  for (let k = 0; k < 3; k++) { const a = -t * 3 + k * 2.09; linea(12, 118, Math.round(12 + Math.cos(a) * 4), Math.round(118 + Math.sin(a) * 4), C.metalL); } disco(12, 118, 1, C.k);
  const WEB = [[12, 101], [40, 97], [27, 50], [40, 37], [90, 93], [140, 37], [190, 93], [200, 100], [205, 114]];
  for (let i = 0; i + 1 < WEB.length; i++) { const [ax, ay] = WEB[i], [bx, by] = WEB[i + 1], Lg = Math.hypot(bx - ax, by - ay); linea(ax, ay, bx, by, P.papel); linea(ax + 1, ay, bx + 1, by, P.papelS);
    for (let s = (t * 40) % 7; s < Lg; s += 7) { const u = s / Lg; pset(Math.round(lerp(ax, bx, u)), Math.round(lerp(ay, by, u)), P.marca); } }
  const ROD = [[40, 50], [90, 80], [140, 50], [190, 80], [40, 110], [140, 110]];
  ROD.forEach(([x, y], i) => { disco(x, y, 13, C.k); disco(x, y, 12, C.metalS); disco(x - 1, y - 1, 11, C.metal); disco(x - 4, y - 4, 5, C.metalL);
    if (i < 4) { R.anillo(x, y, 11.5, TINTA[i][0]); R.anillo(x, y, 10.5, TINTA[i][1]); }
    for (let k = 0; k < 4; k++) { const a = t * 6 * (i % 2 ? -1 : 1) + k * Math.PI / 2; linea(x, y, Math.round(x + Math.cos(a) * 8), Math.round(y + Math.sin(a) * 8), C.metalS); }
    disco(x, y, 4, C.metalD); disco(x, y, 2, C.k); pset(x - 1, y - 1, C.metalL); });
  // el panel de los tinteros (correderas y luces), el manómetro que tiembla y la seta de parada
  rect(56, 64, 76, 76, C.k); rect(57, 65, 75, 75, hex('#22262e')); for (let k = 0; k < 5; k++) { const x = 59 + k * 4, ky = 68 + Math.round((0.5 + 0.5 * Math.sin(t * 0.6 + k * 1.7)) * 4); rect(x, 68, x, 74, hex('#4a5260')); rect(x - 1, ky, x + 1, ky + 1, C.metalL); pset(x, 66, Math.floor(t * 2 + k) % 4 ? TINTA[k % 4][1] : hex('#2a2e36')); }
  disco(100, 108, 7, C.k); disco(100, 108, 6, C.blanco); for (let k = 0; k < 5; k++) { const a = Math.PI * (0.8 + k * 0.35); pset(Math.round(100 + Math.cos(a) * 5), Math.round(108 + Math.sin(a) * 5), k > 3 ? C.rojo : C.k); }
  { const ag = Math.PI * 1.65 + Math.sin(t * 9) * 0.08 + Math.sin(t * 1.3) * 0.12; linea(100, 108, Math.round(100 + Math.cos(ag) * 5), Math.round(108 + Math.sin(ag) * 5), C.rojo); pset(100, 108, C.k); }
  rect(112, 102, 124, 114, C.k); rect(113, 103, 123, 113, C.amarilloT); disco(118, 108, 4, C.k); disco(118, 108, 3, C.rojo); pset(117, 107, C.sangreL);
  // el contador de ejemplares y la boca del plegado: los rodillos de salida giran y cada periódico baja por la rampa
  rect(193, 98, 217, 106, C.k); rect(194, 99, 216, 105, P.pantalla); g_digitos(R, String(10000 + Math.floor(Math.max(0, t) * 30 / 22)).slice(-5), 195, 100, C.verdeL);
  rect(196, 110, 219, 121, C.k); rect(197, 111, 218, 120, hex('#16181e'));
  for (const y of [113, 117]) { rect(198, y, 217, y + 1, C.metalS); rect(198, y, 217, y, C.metalL); for (let x = 198 + Math.floor(t * 12) % 4; x < 218; x += 4) pset(x, y + 1, C.metalD); }
  poligono([[197, 122], [218, 122], [221, 133], [201, 133]], C.k); poligono([[198, 122], [217, 122], [219, 132], [202, 132]], C.metalS);
  { const u = (t * 30 / 22) % 1, px = Math.round(202 + u * 3), py = Math.round(122 + u * 9); rect(px, py - 3, px + 14, py, C.k); rect(px + 1, py - 2, px + 13, py - 1, hex('#ece4d0')); }

  // el suelo de cemento: juntas, manchas de aceite, la línea de seguridad junto a la máquina, recortes de papel, la luz de
  // la lámpara y la rejilla del desagüe
  rect(0, 140, 319, 179, P.suelo); for (let y = 146; y < 180; y += 6) rect(0, y, 319, y, P.sueloS);
  for (let k = -4; k <= 14; k++) linea(k * 34, 141, Math.round(160 + (k * 34 - 160) * 1.7), 179, P.sueloS);
  for (const [x, y, r] of [[70, 158, 6], [150, 168, 8], [36, 172, 5], [190, 152, 4]]) for (let j = -r; j <= r; j++) { const w = Math.round(Math.sqrt(r * r - j * j) * 1.8); rect(x - w, y + Math.round(j * 0.4), x + w, y + Math.round(j * 0.4), P.mancha); }
  for (let y = 141; y <= 142; y++) for (let x = 0; x < 200; x++) pset(x, y, ((x + y) >> 2) % 2 ? P.amarillo : C.k);
  for (let k = 0; k < 9; k++) { const x = Math.floor(h(k, 1, 422) * 300) + 6, y = 148 + Math.floor(h(k, 2, 422) * 28); rect(x, y, x + 2, y, P.papelS); pset(x + 1, y - 1, P.papel); }
  for (let y = 144; y < 179; y += 3) { const w = 6 + (y - 144) * 0.5; for (let x = Math.round(250 - w); x < 250 + w; x += 4) pset(x + (y % 2), y, P.sueloL); }
  rect(120, 170, 134, 174, C.k); for (let x = 122; x < 134; x += 2) rect(x, 171, x, 173, P.aceroL);
  // la cinta y los periódicos que salen y se apilan
  rect(200, 134, 319, 140, C.k); rect(200, 135, 319, 139, C.metalS); rect(200, 135, 319, 135, C.metalL); for (let x = 200; x < 320; x += 8) pset(x + Math.round(t * 20) % 8, 137, C.metalD);
  for (const x of [214, 300]) rect(x, 141, x + 1, 145, P.aceroL);
  for (let k = 0; k < 6; k++) { const x = 206 + ((k * 22 + Math.round(t * 30)) % 110), y = 134; if (x > 290) continue; rect(x, y - 6, x + 16, y, C.k); rect(x + 1, y - 5, x + 15, y - 1, hex('#ece4d0')); rect(x + 2, y - 5, x + 14, y - 5, P.marca); disco(x + 5, y - 3, 1, C.sangre); rect(x + 9, y - 4, x + 13, y - 2, C.k); }
  const pila = Math.min(14, Math.floor((o.u ?? 1) * 14)); for (let k = 0; k < pila; k++) { rect(292, 170 - k * 3, 318, 172 - k * 3, C.k); rect(293, 170 - k * 3, 317, 171 - k * 3, hex('#ece4d0')); }
}
// la portada del periódico en las manos, en el desayuno. Detrás, la cocina por la mañana: la ventana con el sol bajo, una
// nube, los tejados de enfrente con la chimenea que humea, el árbol que se mece y el pájaro del cable; las cortinas de
// cuadros, la albahaca y el gato que mueve la cola en el alféizar, el rayo de sol con motas sobre los azulejos, el trapo
// colgado, los armarios de arriba; a la derecha, el reloj, la balda con la radio que suena (salen notas) y los tarros, el
// potos que cuelga y la nevera con imanes, una foto y un dibujo. El periódico: la cabecera en trazos góticos (sin letras)
// con la fecha en cifras, el titular en barras gruesas, la foto en grabado de la caja Edison con «?» y la gota de sangre,
// una columna con el retrato a puntos, columnas de texto en gris con sus filetes, un anuncio y el pliegue; o.abre (0–1)
// lo despliega
export function portada(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, a = o.abre ?? 1, P = g_POR;
  // la pared, la cenefa y los azulejos, y la mesa
  rect(0, 0, 319, 117, P.pared); for (let k = 0; k < 90; k++) pset(Math.floor(h(k, 1, 430) * 320), Math.floor(h(k, 2, 430) * 114), P.paredS);
  rect(0, 115, 319, 117, P.cenefa); rect(0, 117, 319, 117, P.cenefaS);
  rect(0, 118, 319, 159, P.azulejo); for (let y = 124; y < 160; y += 7) rect(0, y, 319, y, P.junta); for (let x = 5; x < 320; x += 7) rect(x, 118, x, 159, P.junta);
  rect(0, 160, 319, 179, C.madera); rect(0, 160, 319, 160, C.maderaL); for (let k = 0; k < 8; k++) rect(70 + k * 23, 165 + (k % 3) * 4, 84 + k * 23, 165 + (k % 3) * 4, C.maderaS);
  // los armarios de arriba, con su luz de debajo
  rect(172, 0, 276, 16, C.k); rect(173, 0, 275, 15, P.armario); for (let x = 173; x < 276; x += 26) { rect(x + 2, 1, x + 23, 13, P.armarioS); rect(x + 3, 2, x + 22, 12, P.armario); rect(x + 3, 2, x + 22, 2, P.armarioL); pset(x + (x % 52 === 17 ? 20 : 5), 10, C.oro); }
  for (let x = 174; x < 276; x += 2) pset(x, 17, P.luz);
  // la ventana: el cielo de la mañana, el sol bajo, una nube, los tejados con la chimenea que humea, el árbol que se mece,
  // el cable con su pájaro (da saltitos) y otro que pasa volando
  rect(3, 23, 59, 99, C.k); rect(4, 24, 58, 98, P.marco);
  const X0 = 6, X1 = 56, Y0 = 26, Y1 = 96;
  rect(X0, Y0, X1, 52, P.cielo1); rect(X0, 53, X1, 76, P.cielo2); rect(X0, 77, X1, Y1, P.cielo3);
  R.recorte([X0, Y0, X1, Y1]);
  disco(18, 80, 8, P.solH); disco(18, 80, 5, C.sol);
  g_nube(R, X0 - 14 + ((t * 2) % 76), 40, 11);
  for (let p = 0; p < 5; p++) { const u = (t * 0.35 + p / 5) % 1; disco(27.5 + u * 8 + Math.sin(t + p) * 1.5, 74 - u * 30, 1 + u * 2.5, P.humo); }
  poligono([[X0 - 2, 87], [16, 79], [34, 87]], P.tejado); rect(X0, 87, 32, Y1, P.casa); rect(10, 89, 15, 94, P.casaS); rect(20, 89, 25, 94, P.casaS); rect(26, 77, 29, 84, P.tejadoS);
  poligono([[30, 89], [46, 81], [62, 89]], P.tejadoS); rect(32, 89, X1, Y1, P.casaS); rect(38, 91, 43, 95, P.casa);
  { const m = Math.round(Math.sin(t * 1.1) * 1); rect(48, 70, 50, Y1, C.maderaS); for (const [x, y, r, c] of [[49, 57, 9, P.copaS], [46, 53, 7, P.copa], [52, 51, 6, P.copa], [48, 48, 4, P.copaL]]) disco(x + m, y, r, c); }
  for (let x = X0; x <= X1; x++) pset(x, 64 + Math.round(3 * (1 - ((x - 31) / 25) ** 2)), C.k);
  { const salta = (t % 4) < 0.25 ? 1 : 0, bx = 22, by = 64 + Math.round(3 * (1 - ((22 - 31) / 25) ** 2)) - 1 - salta; rect(bx - 1, by - 1, bx + 1, by, hex('#5a4a3a')); pset(bx + (Math.floor(t / 1.7) % 2 ? 2 : -2), by - 1, C.naranja); pset(bx + (Math.floor(t / 1.7) % 2 ? 1 : -1), by - 2, hex('#5a4a3a')); }
  { const u = (t % 9) / 4; if (u < 1) { const bx = Math.round(X1 - u * 56), by = Math.round(34 + Math.sin(t * 3) * 2), al = Math.sin(t * 14) > 0; pset(bx, by, C.k); pset(bx - 1, by - (al ? 1 : 0), C.k); pset(bx + 1, by - (al ? 1 : 0), C.k); } }
  R.recorte(null);
  rect(30, Y0, 31, Y1, P.marco); rect(X0, 60, X1, 61, P.marco);
  // las cortinas de cuadros, recogidas, que se mueven un poco; la barra
  for (const [x0, d] of [[0, 1], [62, -1]]) for (let y = 21; y < 100; y++) { const w = 8 + Math.round(Math.sin(t * 0.9 + y * 0.08) * (y > 70 ? 1 : 0)) - (y > 52 && y < 60 ? 3 : 0); for (let i = 0; i < w; i++) { const x = x0 + i * d; pset(x, y, ((x >> 1) + (y >> 1)) % 2 ? P.cortina : P.cortinaL); } }
  rect(0, 20, 63, 21, C.metalD);
  // el alféizar con la albahaca y el gato que mueve la cola
  rect(0, 99, 62, 102, C.k); rect(0, 99, 62, 101, P.alfeizar); rect(0, 99, 62, 99, C.blanco);
  rect(9, 92, 17, 98, C.k); rect(10, 93, 16, 98, P.maceta); for (const [dx, dy] of [[0, -3], [-2, -1], [2, -1], [-1, -5], [1, -4]]) disco(13 + dx, 91 + dy, 1.5, C.hierba);
  gato(R, 44, 98, t, { dir: -1 });
  // el rayo de sol sobre los azulejos, con motas que flotan, y el trapo colgado de su gancho
  for (let y = 118; y < 160; y++) { const xa = 10 + Math.round((y - 118) * 0.55); for (let x = xa + (y % 2); x < xa + 34; x += 2) if (R.pget(x, y) === P.azulejo) pset(x, y, P.luz); }
  for (let k = 0; k < 9; k++) { const u = (t * 0.05 + h(k, 1, 431)) % 1, x = Math.round(14 + u * 40 + Math.sin(t * 0.7 + k) * 3), y = Math.round(104 + h(k, 2, 431) * 50 - u * 8); if (Math.sin(t * 1.5 + k * 2) > -0.2) pset(x, y, C.blanco); }
  pset(10, 103, C.metalD); { const s = Math.round(Math.sin(t * 1.2)); rect(4, 104, 16, 105, C.k); for (let y = 105; y < 124; y++) for (let x = 5 + (y > 115 ? s : 0); x < 16 + (y > 115 ? s : 0); x++) pset(x, y, ((x >> 1) + (y >> 1)) % 2 ? P.trapo : C.blanco); }
  // a la derecha: el reloj (las siete y pico)
  { const cx = 266, cy = 26; disco(cx, cy, 8, C.k); disco(cx, cy, 7, C.blanco); for (let k = 0; k < 12; k++) { const g = k / 12 * Math.PI * 2; pset(Math.round(cx + Math.cos(g) * 6), Math.round(cy + Math.sin(g) * 6), k % 3 ? C.grisL : C.k); }
    const hr = (7 + 10 / 60) / 12 * Math.PI * 2 - Math.PI / 2, mn = (10 + t / 60) / 60 * Math.PI * 2 - Math.PI / 2, sg = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2;
    linea(cx, cy, Math.round(cx + Math.cos(hr) * 3), Math.round(cy + Math.sin(hr) * 3), C.k); linea(cx, cy, Math.round(cx + Math.cos(mn) * 5), Math.round(cy + Math.sin(mn) * 5), C.k); linea(cx, cy, Math.round(cx + Math.cos(sg) * 6), Math.round(cy + Math.sin(sg) * 6), C.rojo); pset(cx, cy, C.k); }
  // la balda con la radio (salen notas), los tarros y el potos que cuelga
  rect(258, 72, 319, 74, C.k); rect(258, 72, 319, 73, P.armario); rect(258, 72, 319, 72, P.armarioL); for (const x of [266, 310]) rect(x, 75, x + 1, 79, C.metalD);
  rect(260, 58, 280, 71, C.k); rect(261, 59, 279, 71, P.radio); rect(261, 59, 279, 60, P.radioL); for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) pset(263 + i * 2, 63 + j * 2, P.radioS);
  disco(274, 65, 3, C.k); disco(274, 65, 2, C.blanco); { const g = t * 0.5; pset(Math.round(274 + Math.cos(g) * 1.6), Math.round(65 + Math.sin(g) * 1.6), C.rojo); } linea(262, 58, 258, 46, C.k);
  for (let k = 0; k < 3; k++) { const u = (t * 0.4 + k / 3) % 1; if (u > 0.85) continue; const nx = Math.round(266 + k * 3 + Math.sin(u * 6 + k) * 2), ny = Math.round(55 - u * 14); rect(nx, ny, nx + 1, ny + 1, C.k); rect(nx + 2, ny - 4, nx + 2, ny + 1, C.k); pset(nx + 3, ny - 4, C.k); pset(nx + 3, ny - 3, C.k); }
  for (const [x, hh, c] of [[284, 9, C.rojo], [294, 7, C.amarillo], [303, 10, C.verde]]) { rect(x, 71 - hh, x + 7, 71, C.k); rect(x + 1, 72 - hh, x + 6, 71, P.tarro); rect(x, 69 - hh, x + 7, 71 - hh, c); rect(x + 2, 74 - hh, x + 2, 69, C.blanco); }
  // la nevera con sus imanes, el dibujo, la foto y la lista
  rect(284, 80, 319, 159, C.k); rect(285, 81, 319, 159, P.nevera); rect(285, 81, 286, 159, C.blanco); rect(316, 81, 319, 159, P.neveraS); rect(285, 103, 319, 103, P.neveraS); rect(289, 85, 290, 99, C.metalS); rect(289, 116, 290, 140, C.metalS);
  rect(296, 85, 312, 101, C.k); rect(297, 86, 311, 100, C.blanco); disco(301, 90, 2, C.amarillo); poligono([[302, 95], [306, 91], [310, 95]], C.rojo); rect(303, 95, 309, 99, C.ocre); rect(297, 99, 311, 100, C.hierba); disco(304, 85, 1, C.azul);
  rect(298, 115, 308, 123, C.k); rect(299, 116, 307, 122, hex('#8ac8e8')); rect(299, 120, 307, 122, C.hierba); pset(302, 119, C.k); pset(304, 119, C.rojo); disco(303, 115, 1, C.rojo);
  rect(302, 128, 314, 148, C.blanco); for (let y = 131; y < 147; y += 3) rect(304, y, 312 - (y % 2) * 2, y, C.grisL); disco(308, 128, 1.5, C.verdeL); disco(294, 132, 2, C.amarillo); rect(292, 140, 296, 144, C.rojo);
  for (let k = 0; k < 2; k++) { const x0 = 312 + k * 4; for (let y = 74; y < 92 + k * 10; y += 3) { const lx = x0 + Math.round(Math.sin(t * 0.8 + y * 0.2 + k) * 1.5); pset(lx, y, C.hierbaS); disco(lx + (y % 2 ? 1 : -1), y + 1, 1.5, y % 2 ? C.hierba : C.hierbaS); } }

  // el periódico
  const x0 = 64, x1 = 256, y0 = 20, y1 = Math.round(20 + 150 * a), yv = y1 - 2;
  rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, C.k); rect(x0, y0, x1, y1, P.papel);
  for (let y = y0 + 1; y < y1; y += 2) for (let x = x0 + (y % 4 ? 1 : 2); x < x1; x += 3) if (h(x, y, 432) < 0.07) pset(x, y, P.grano);
  rect(x1 - 1, y0, x1, y1, P.papelS);
  const cr = (ax, ay, bx, by, c) => { if (ay <= yv) rect(ax, ay, bx, Math.min(by, yv), c); };   // una barra, recortada por el doblez
  R.recorte([x0, y0, x1, yv]);
  // la cabecera en trazos góticos, con sus adornos, los filetes y la fecha
  for (let k = 0, x = x0 + 22; x < x1 - 22; k++, x += 7) { const alto = 8 + Math.round(h(k, 1, 56) * 6), yb = y0 + 19; cr(x, yb - alto, x + 2, yb, C.k); pset(x - 1, yb - alto, C.k); pset(x + 3, yb - alto + 1, C.k); if (h(k, 2, 56) < 0.4) cr(x + 3, yb - 4, x + 4, yb - 3, C.k); }
  for (const x of [x0 + 12, x1 - 12]) { pset(x, y0 + 10, C.k); pset(x - 1, y0 + 11, C.k); pset(x + 1, y0 + 11, C.k); pset(x, y0 + 12, C.k); }
  cr(x0 + 6, y0 + 23, x1 - 6, y0 + 23, C.k); cr(x0 + 6, y0 + 25, x1 - 6, y0 + 25, C.k); cr(x0 + 10, y0 + 28, x0 + 60, y0 + 28, P.gris); if (y0 + 30 <= yv) g_digitos(R, '2015', x1 - 26, y0 + 26, P.grisO);
  // el titular y el subtítulo
  cr(x0 + 10, y0 + 32, x1 - 10, y0 + 38, C.k); cr(x0 + 10, y0 + 42, x1 - 60, y0 + 48, C.k); cr(x0 + 10, y0 + 51, x1 - 88, y0 + 52, P.grisO);
  // la foto en grabado: la pared rayada, la mesa, la caja Edison con «?» y la gota de sangre; el pie de foto
  const fx = x0 + 10, fy = y0 + 56;
  cr(fx, fy, fx + 100, fy + 66, P.regla); cr(fx + 1, fy + 1, fx + 99, fy + 65, P.foto);
  if (fy + 1 <= yv) { R.recorte([fx + 1, fy + 1, fx + 99, Math.min(fy + 56, yv)]); for (let s = 0; s < 170; s += 4) linea(fx + s, fy, fx + s - 66, fy + 66, P.trama); R.recorte([x0, y0, x1, yv]); }
  cr(fx + 1, fy + 57, fx + 99, fy + 65, P.mesaFoto); for (let y = fy + 59; y < fy + 65; y += 2) cr(fx + 1, y, fx + 99, y, P.trama);
  if (fy + 56 <= yv) edison(R, fx + 50, fy + 56, t, { s: 0.8 });
  R.icono('?', fx + 82, fy + 6, C.k, P.foto, 2);
  disco(fx + 14, fy + 14, 6, C.k); disco(fx + 14, fy + 14, 5, C.sangre); pset(fx + 12, fy + 12, C.sangreL); pset(fx + 13, fy + 11, C.sangreL);
  cr(fx, fy + 68, fx + 70, fy + 68, P.gris);
  // la columna de la derecha: el antetítulo, las líneas de texto y el retrato a puntos (pelo recogido y cuello alto negro)
  const cx0 = fx + 108, cx1 = x1 - 10;
  cr(fx + 104, fy, fx + 104, fy + 66, P.regla); cr(cx0, fy + 2, cx0 + 48, fy + 4, P.grisO);
  for (let k = 0; k < 7; k++) cr(cx0, fy + 8 + k * 4, cx1 - (k === 6 ? 22 : (k % 3) * 2), fy + 8 + k * 4, P.gris);
  for (let y = fy + 38; y <= Math.min(fy + 64, yv); y++) for (let x = cx0; x <= cx0 + 22; x++) {
    const dx = x - (cx0 + 11), yy = y - (fy + 38), v = (dx / 4.5) ** 2 + ((yy - 10) / 5.5) ** 2, pelo = (dx / 6.5) ** 2 + ((yy - 8.5) / 7.5) ** 2 <= 1, mono = dx * dx + (yy - 1.5) ** 2 <= 8;
    const cuello = yy >= 15 && yy <= 18 && Math.abs(dx) <= 3, jersey = yy > 18 && Math.abs(dx) <= 4 + (yy - 18) * 1.1;
    let d = 0;
    if (jersey || cuello) d = Math.abs(dx) > 3 + (yy - 18) * 1.1 ? 0.55 : 0.88;
    else if (v <= 1) { if (yy === 9 && (dx === -2 || dx === 2)) d = 1; else if (yy === 13 && Math.abs(dx) <= 1) d = 0.8; else if (yy === 11 && dx === 1) d = 0.9; else d = v > 0.72 ? 0.5 : dx >= 2 ? 0.3 : 0.04; }
    else if (mono) d = 0.7; else if (pelo) d = 0.62;
    if (d > 0 && h(x, y, 433) < d) pset(x, y, C.k); }
  for (let k = 0; k < 7; k++) cr(cx0 + 26, fy + 40 + k * 4, cx1 - (k % 2) * 4, fy + 40 + k * 4, P.gris);
  // abajo: dos columnas de texto con sus filetes y un anuncio (un reloj de pulsera y su precio)
  const yb0 = y0 + 126;
  cr(x0 + 62, yb0, x0 + 62, yb0 + 20, P.regla); cr(x0 + 126, yb0, x0 + 126, yb0 + 20, P.regla);
  for (let k = 0; k < 5; k++) { const y = yb0 + 1 + k * 4; cr(x0 + 10, y, x0 + 58 - (k === 4 ? 14 : 0), y, P.gris); cr(x0 + 68, y, x0 + 122 - (k === 4 ? 20 : 0), y, P.gris); }
  cr(x0 + 131, yb0, x1 - 10, yb0 + 20, C.k); cr(x0 + 132, yb0 + 1, x1 - 11, yb0 + 19, P.papel);
  cr(x0 + 142, yb0 + 2, x0 + 146, yb0 + 4, C.k); cr(x0 + 142, yb0 + 16, x0 + 146, yb0 + 18, C.k); disco(x0 + 144, yb0 + 10, 5, C.k); disco(x0 + 144, yb0 + 10, 4, C.blanco); linea(x0 + 144, yb0 + 10, x0 + 144, yb0 + 7, C.k); linea(x0 + 144, yb0 + 10, x0 + 146, yb0 + 11, C.k);
  g_digitos(R, '$99', x0 + 154, yb0 + 4, C.k); cr(x0 + 154, yb0 + 12, x1 - 14, yb0 + 12, P.gris); cr(x0 + 154, yb0 + 15, x1 - 20, yb0 + 15, P.gris);
  // el pliegue de en medio (por los márgenes y entre columnas)
  for (const [ax, bx] of [[x0, fx - 1], [fx + 101, x1 - 1]]) { cr(ax, y0 + 75, bx, y0 + 75, P.pliegue); cr(ax, y0 + 76, bx, y0 + 76, C.blanco); }
  R.recorte(null);
  // el borde de la mitad que aún está doblada
  if (a < 1) { rect(x0 - 3, y1 - 3, x1 + 3, y1 + 5, C.k); rect(x0 - 2, y1 - 2, x1 + 2, y1 + 4, P.papelS); rect(x0 - 2, y1 + 1, x1 + 2, y1 + 1, P.pliegue); }
  mano(R, x0 + 4, Math.round(y0 + 30 + 60 * a), 1, '#a8c8e8'); mano(R, x1 - 4, Math.round(y0 + 30 + 60 * a), -1, '#a8c8e8');
}
// el plató de televisión de noche: la parrilla del techo con los focos (viseras, geles de colores); el
// fondo luminoso de la bahía (cielo tramado, la luna, estrellas, el puente colgante con sus luces que titilan, la ciudad en
// dos capas con ventanas que se encienden, la torre con su luz roja, un avión que cruza y el agua con reflejos que
// tiemblan); los paneles laterales con tiras de luz verde azulada que laten y los monitores con la señal del programa; la
// pantalla con el logotipo (x 190–270, y 40–90, colgada de dos cables), las dos butacas blancas, la mesita con el vaso y la
// taza humeante, el suelo brillante con los reflejos y la tarima con su tira de luz y marcas de cinta. Las dos cámaras van
// por delante: platoCamaras()
export function plato(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  // el techo y la parrilla de focos
  rect(0, 0, 319, 29, hex('#0e1226')); rect(0, 7, 319, 8, hex('#262a40')); rect(0, 2, 319, 2, hex('#1a1e34'));
  for (let x = 6; x < 320; x += 14) linea(x, 2, x + 7, 7, hex('#1e2238'));
  const GEL = ['#fff0b0', '#a8d8ff', '#ffc8a0', '#fff0b0', '#c8a8ff'].map(hex);
  [20, 76, 132, 230, 262].forEach((x, k) => { rect(x - 1, 8, x + 1, 10, hex('#3a3e52')); rect(x - 5, 10, x + 5, 17, C.k); rect(x - 4, 11, x + 4, 16, hex('#2e3244')); rect(x - 4, 11, x + 4, 11, hex('#4a4e64'));
    linea(x - 5, 17, x - 8, 21, hex('#2a2e40')); linea(x + 5, 17, x + 8, 21, hex('#2a2e40')); rect(x - 3, 17, x + 3, 18, GEL[k]); pset(x, 18, C.blanco); });
  // el fondo de la bahía de noche: cielo tramado, la luna, estrellas y un avión
  rect(26, 26, 293, 122, hex('#3a3e52')); rect(27, 27, 292, 121, hex('#1a1e30'));
  i_degradado(R, 30, 30, 290, 104, I_BAHIA, null, 1.25);
  R.halo(70, 46, 14, [hex('#1e2a62'), hex('#283270')], 1.0); disco(70, 46, 6, hex('#f0ead8')); disco(68, 45, 2, hex('#d8d0bc')); pset(72, 48, hex('#d8d0bc'));
  for (let k = 0; k < 28; k++) { const x = Math.round(32 + h(k, 1, 104) * 256), y = Math.round(32 + h(k, 2, 104) * 30); if ((x > 186 && x < 274 && y > 36) || x > 270) continue; if (Math.sin(t * (1.5 + k % 3) + k * 1.3) > -0.1) pset(x, y, k % 4 ? hex('#8a8ac8') : hex('#e8e8ff')); }
  { const u = (t / 24) % 1, ax = Math.round(288 - u * 270), ay = Math.round(48 + u * 6); if (ax > 30) { pset(ax, ay, hex('#6a6a8a')); pset(ax + 1, ay, hex('#6a6a8a')); if (Math.sin(t * 8) > 0.5) pset(ax - 1, ay, C.blanco); if (ax + 2 < 290) pset(ax + 2, ay, Math.floor(t * 1.5) % 2 ? C.rojo : hex('#5a2030')); } }
  // la ciudad en dos capas, la torre con su luz y las ventanas que se encienden y se apagan
  for (let x = 30, k = 0; x < 290; k++) { const w = 8 + Math.floor(h(k, 1, 105) * 12), top = 70 + Math.floor(h(k, 2, 105) * 18); rect(x, top, Math.min(290, x + w - 1), 104, hex('#2a2c66')); for (let wy = top + 3; wy < 102; wy += 4) for (let wx = x + 2; wx < x + w - 1 && wx < 290; wx += 3) if (h(wx, wy, 106) < 0.18) pset(wx, wy, hex('#6a6ab0')); x += w; }
  poligono([[146, 104], [158, 104], [152, 52]], hex('#1e2050')); rect(151, 46, 152, 52, hex('#1e2050')); pset(151, 45, Math.floor(t * 1.2) % 2 ? hex('#ff5a5a') : hex('#5a2030')); for (let y = 60; y < 102; y += 5) pset(152, y, hex('#f0c870'));
  for (let x = 120, k = 0; x < 290; k++) { const w = 10 + Math.floor(h(k, 3, 105) * 16), top = 78 + Math.floor(h(k, 4, 105) * 16); rect(x, top, Math.min(290, x + w - 1), 104, hex('#161838'));
    for (let wy = top + 3; wy < 102; wy += 4) for (let wx = x + 2; wx < x + w - 1 && wx < 290; wx += 3) { const on = h(wx, wy + Math.floor(t / 4 + k * 0.37), 107) < 0.24; if (on) pset(wx, wy, h(wx, wy, 108) < 0.6 ? hex('#f0c870') : hex('#a8e0ff')); } x += w; }
  // el puente colgante: torres, cables con sus luces y el tablero
  { const PU = hex('#3a2a4a'); for (const tx of [52, 108]) { rect(tx - 2, 62, tx + 2, 104, PU); rect(tx - 2, 70, tx + 2, 71, hex('#5a3a5a')); rect(tx - 2, 82, tx + 2, 83, hex('#5a3a5a')); pset(tx, 61, Math.floor(t * 1.5 + tx) % 2 ? hex('#ff5a5a') : hex('#6a2030')); }
    const cab = (x) => x < 52 ? 63 + (52 - x) * 0.9 : x <= 108 ? 63 + Math.sin((x - 52) / 56 * Math.PI) * 26 : 63 + (x - 108) * 0.9;
    for (let x = 30; x < 132; x++) { const y = Math.round(cab(x)); if (y < 94) { pset(x, y, PU); if (x % 4 === 0) { rect(x, y + 1, x, 93, hex('#2e2440')); if (Math.sin(t * 2 + x) > -0.3) pset(x, y, hex('#f8d890')); } } }
    rect(30, 94, 132, 96, PU); for (let x = 32; x < 132; x += 5) pset(x, 93, Math.sin(t * 3 + x * 0.7) > 0 ? hex('#fff0b0') : hex('#c89a50')); }
  // el agua de la bahía con los reflejos que tiemblan y el camino de la luna
  for (let y = 105; y <= 121; y++) rect(27, y, 292, y, y < 110 ? hex('#141c48') : hex('#0e1438'));
  for (let y = 106; y < 121; y += 2) { for (let k = 0; k < 14; k++) { const x = Math.round(36 + k * 18 + Math.sin(t * 2 + y + k) * 3); if (h(k, y, Math.floor(t * 3)) < 0.36) rect(x, y, x + 2 + (k % 3), y, k % 3 ? hex('#f0c870') : hex('#6a8ad8')); } const mx = Math.round(70 + Math.sin(t * 3 + y * 0.7) * (1 + (y - 105) / 6)); rect(mx - 2, y, mx + 2, y, hex('#d8d4c8')); }
  // los paneles de los lados: tiras de luz que laten y suben, y los monitores con la señal del programa
  for (const [x0, x1] of [[0, 25], [294, 319]]) { rect(x0, 22, x1, 121, hex('#181c30')); for (let y = 30; y < 122; y += 12) rect(x0, y, x1, y, hex('#10142a')); rect(x0 === 0 ? x1 : x0, 22, x0 === 0 ? x1 : x0, 121, hex('#2a2e46'));
    for (const sx of [x0 + 4, x1 - 4]) for (let y = x0 === 0 ? 24 : 48; y < 120; y++) { const v = (y + Math.floor(t * 14)) % 24; pset(sx, y, v < 3 ? hex('#c8fff4') : Math.sin(t * 2 + sx) > 0 ? C.tealT : C.tealTS); } }
  for (const [mx, k] of [[4, 0], [298, 1]]) { rect(mx + 8, 64, mx + 10, 74, hex('#3a3e52')); rect(mx, 52, mx + 18, 64, C.k); rect(mx + 1, 53, mx + 17, 63, hex('#1e3a7a'));
    if (Math.floor(t / 3 + k) % 2) { rect(mx + 1, 53, mx + 17, 63, hex('#e8f4f4')); disco(mx + 9, 58, 3, C.tealT); disco(mx + 9, 58, 1, C.verdeT); } else { rect(mx + 1, 60, mx + 17, 63, hex('#2a2c66')); pset(mx + 6, 58, hex('#d8b860')); rect(mx + 6, 59, mx + 6, 61, C.k); pset(mx + 12, 58, hex('#2c2232')); rect(mx + 12, 59, mx + 12, 61, hex('#8c8ca0')); } }
  // la pantalla con el logotipo, colgada de dos cables, con su brillo
  for (const x of [200, 260]) rect(x, 27, x, 39, hex('#3a3e52'));
  rect(190, 40, 270, 90, C.k); rect(192, 42, 268, 88, hex('#e8f4f4')); for (let y = 42; y <= 88; y++) if (y > 76) rect(192, y, 268, y, i_mezcla(hex('#e8f4f4'), hex('#c8e4e4'), (y - 76) / 14));
  logoTheranos(R, 230, 65, 1.2, t);
  { const p = Math.floor(t * 2) % 4; for (let k = 0; k < 4; k++) disco(218 + k * 8, 84, 1, k === p ? C.tealT : hex('#b8d0d0')); }
  // el suelo brillante del fondo, con los reflejos del decorado, y la tarima con su tira de luz y marcas de cinta
  rect(0, 122, 319, 179, hex('#1e2438')); for (let y = 123; y < 140; y++) for (let x = 30; x < 290; x += 3) { const c = R.pget(x, 104 - (y - 122) * 2); if ((c === hex('#f0c870') || c === hex('#a8e0ff') || c === hex('#fff0b0')) && i_b4(x, y) < 0.6) pset(x, y, i_mezcla(c, hex('#1e2438'), 0.55)); }
  rect(0, 122, 319, 122, hex('#2e3450'));
  poligono([[50, 140], [270, 140], [300, 179], [20, 179]], hex('#2e3650')); for (let y = 144; y < 179; y += 6) rect(Math.round(50 - (y - 140) * 0.77), y, Math.round(270 + (y - 140) * 0.77), y, hex('#344060'));
  for (let x = 50; x <= 270; x += 2) pset(x, 140, ((x >> 1) + Math.floor(t * 8)) % 12 === 0 ? hex('#c8fff4') : C.tealT); linea(50, 141, 20, 179, C.tealTS); linea(270, 141, 300, 179, C.tealTS);
  for (const [x, y] of [[106, 160], [186, 160], [150, 170]]) { linea(x - 2, y - 2, x + 2, y + 2, hex('#c8a040')); linea(x - 2, y + 2, x + 2, y - 2, hex('#c8a040')); }
  for (let i = 0; i < 40; i++) pset(8 + i, 150 + Math.round(Math.sin(i * 0.25) * 2), hex('#141828'));
  // las butacas blancas de cuero (respaldo, costura, brazos, pie cromado y base redonda)
  for (const x of [110, 190]) { rect(x - 10, 122, x + 10, 136, C.k); rect(x - 9, 123, x + 9, 135, hex('#e4e4ec')); rect(x - 9, 123, x + 9, 124, hex('#f8f8ff')); rect(x - 9, 131, x + 9, 135, hex('#c4c4d0')); rect(x, 125, x, 130, hex('#c4c4d0'));
    for (const dx of [-5, 5]) pset(x + dx, 128, hex('#a8a8b8')); rect(x - 11, 129, x - 9, 136, hex('#8a8a9a')); rect(x + 9, 129, x + 11, 136, hex('#8a8a9a'));
    rect(x - 2, 136, x + 2, 146, C.metalD); rect(x - 1, 136, x - 1, 146, C.metalL); rect(x - 7, 145, x + 7, 147, C.k); rect(x - 6, 145, x + 6, 146, C.metal); }
  // la mesita: el tablero, el pie, el vaso de agua y la taza humeante
  rect(140, 132, 160, 136, C.k); rect(141, 133, 159, 135, C.blanco); rect(141, 135, 159, 135, hex('#c8c8d4')); rect(148, 136, 152, 146, C.metalD); rect(149, 136, 149, 146, C.metalL); rect(144, 145, 156, 147, C.metal);
  rect(144, 127, 147, 132, hex('#8ab8d8')); rect(144, 129, 147, 132, hex('#c8e8f8')); pset(144, 127, C.blanco);
  rect(152, 128, 156, 132, C.k); rect(153, 129, 155, 131, hex('#c83a3a')); rect(156, 129, 157, 131, C.k); i_vapor(R, 154, 127, t, 0.6, hex('#8a94b8'), 10);
}
// las dos cámaras de estudio en primer plano (x 40, mirando a la derecha, y x 282, a la izquierda), sobre su pie de
// ruedas con el aro de mando: el cuerpo con paneles y rejilla, el visor encendido detrás, el objetivo largo con sus anillos
// y un brillo que corre por el cristal, el parasol, el asa, el piloto rojo que parpadea y el cable por el suelo
export function platoCamaras(R, t) {
  const { rect, disco, linea, pset } = R;
  for (const [x, d] of [[40, 1], [282, -1]]) { const X = (u) => x + u * d, r = (a, b, y0, y1, c) => rect(Math.min(X(a), X(b)), y0, Math.max(X(a), X(b)), y1, c);
    // el cable, el pie con sus ruedas y el aro de mando
    for (let i = 0; i <= 30; i++) pset(X(-i), 174 + Math.round(Math.sin(i * 0.3) * 2 + i * 0.15), hex('#141828'));
    linea(X(0), 166, X(-15), 175, C.k); linea(X(0), 166, X(15), 175, C.k); linea(X(0), 166, X(2), 177, C.k); for (const u of [-15, 15, 2]) { disco(X(u), 176 + (u === 2 ? 1 : 0), 2, C.k); pset(X(u), 176 + (u === 2 ? 1 : 0), C.metalS); }
    r(-3, 3, 150, 167, C.k); r(-2, 2, 150, 166, C.metalD); r(-1, -1, 150, 166, C.metalL);
    for (let i = -9; i <= 9; i++) { const yy = 158 + Math.round(Math.sqrt(Math.max(0, 1 - (i / 9) ** 2)) * 2); pset(x + i, yy, C.metal); pset(x + i, 316 - yy, C.metalD); }
    // el asa de mando, hacia atrás
    linea(X(-14), 141, X(-28), 151, C.k); linea(X(-14), 142, X(-28), 152, C.metalS); r(-31, -27, 150, 153, C.k);
    // el cuerpo: paneles, rejilla y la placa
    r(-16, 16, 130, 150, C.k); r(-15, 15, 131, 149, hex('#3a3e48')); r(-15, 15, 131, 131, hex('#5e626e')); r(-15, 15, 148, 149, hex('#2a2e36')); r(0, 0, 132, 147, hex('#2a2e36'));
    for (let y = 136; y < 146; y += 2) r(-12, -4, y, y, hex('#2a2e36')); r(4, 12, 136, 138, hex('#8a8e9a')); r(5, 10, 137, 137, hex('#c8ccd8'));
    // el visor encendido, detrás y arriba
    r(-16, -4, 123, 130, C.k); r(-15, -5, 124, 129, hex('#1e2a44')); r(-14, -6, 125, 128, hex('#3a6ab0')); pset(X(-11), 127, hex('#d8b860')); pset(X(-8), 127, hex('#2c2232')); r(-14, -6, 125, 125, hex('#8ab0e8'));
    // el objetivo: anillos, el parasol y el brillo que corre por el cristal
    r(15, 26, 134, 146, C.k); r(16, 25, 135, 145, hex('#2a2c34')); for (const u of [18, 21, 24]) r(u, u, 135, 145, hex('#4a4e5a')); r(16, 25, 135, 135, hex('#5a5e6a'));
    r(26, 29, 131, 149, C.k); r(27, 28, 132, 148, hex('#22242c'));
    disco(X(28), 140, 5, C.k); disco(X(28), 140, 4, hex('#2a3a5a')); disco(X(28), 140, 2, hex('#4a6a9a')); { const g = (t * 0.7) % 1; if (g < 0.3) pset(X(28) + Math.round((g / 0.3 - 0.5) * 6) * d, 138, C.blanco); else pset(X(27), 138, hex('#8ab0e0')); }
    // el piloto rojo encima, que parpadea, y el de delante
    r(6, 10, 127, 129, C.k); r(7, 9, 128, 128, Math.floor(t * 2) % 2 ? C.rojo : C.rojoS); disco(X(-10), 134, 1, Math.floor(t * 2) % 2 ? C.rojo : C.rojoS);
  }
}
// ── H · hoy: el tribunal, la prisión, el cine, la charla y el laboratorio de hoy ────────────────────────────────────
// La sala del tribunal federal de San José. Al fondo: el techo de placas con los focos empotrados (uno parpadea), los
// paneles de roble en relieve con su moldura y su zócalo, el gran respaldo de nogal con pilastras detrás del estrado, el
// sello con un brillo que recorre el aro, las dos banderas (la de EE. UU. y la de California) colgadas de sus mástiles y
// meciéndose con el aire acondicionado, el ventanal con la persiana (nubes, una palmera que se mece, pájaros) cuya luz cae
// en la moqueta con motas de polvo, la pantalla de las pruebas que cambia de diapositiva, la puerta del fondo con la sombra
// de quien pasa por el pasillo y el reloj encima, y un cuadro de las colinas de California. Delante: el sillón alto del
// juez, el estrado sobre su tarima (carpetas, jarra, micrófono y lámpara de banquero), la mesa del secretario con su
// monitor, el banco de los testigos, la tribuna del jurado con doce bustos en sus sillones (uno toma notas, otra bosteza,
// otro da cabezadas) y el público en tres filas de bancos (una se abanica). o.detras(R, t): lo que asoma por encima del
// estrado (el juez, con los pies en y 74 y x 152). Las mesas de las partes y la barandilla van por delante: tribunalDelante()
export function tribunal(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, B = h_TB, K = C.k, foco = !h_parpadeo(t, 7.3);
  // el techo de placas con los focos empotrados y la moldura con sus dentículos
  rect(0, 0, 319, 7, B.techo); rect(0, 3, 319, 3, B.techoS); for (let x = 12; x < 320; x += 24) rect(x, 0, x, 7, B.techoS);
  for (const fx of [40, 100, 160, 222, 258]) { rect(fx - 7, 5, fx + 7, 7, K); rect(fx - 6, 5, fx + 6, 6, fx !== 222 || foco ? C.blanco : B.techoS); }
  rect(0, 8, 319, 8, B.nogalS); rect(0, 9, 319, 9, B.nogalL); rect(0, 10, 319, 11, B.nogal); for (let x = 1; x < 320; x += 4) rect(x, 11, x + 1, 11, B.nogalS);
  // los paneles de roble: dos alturas de cuarterones, la moldura de en medio y el zócalo
  rect(0, 12, 319, 109, B.roble);
  for (let c = 0; c < 15; c++) { const x0 = -6 + c * 23, x1 = x0 + 22; rect(x0, 12, x0 + 1, 103, B.robleS);
    h_cuarteron(R, x0 + 4, 15, x1 - 3, 60, B.roble, B.robleL, B.robleD, B.robleV, c); h_cuarteron(R, x0 + 4, 70, x1 - 3, 100, B.roble, B.robleL, B.robleD, B.robleV, c + 20); }
  rect(0, 63, 319, 63, B.robleL); rect(0, 64, 319, 66, B.robleS); rect(0, 67, 319, 67, B.robleD);
  rect(0, 103, 319, 103, B.nogalL); rect(0, 104, 319, 109, B.nogal); rect(0, 108, 319, 109, B.nogalS);
  // la luz de los focos en lo alto de la pared, en abanico
  for (const fx of [40, 100, 222]) if (fx !== 222 || foco) for (let y = 12; y < 30; y++) for (let x = fx - (y - 6); x <= fx + (y - 6); x++) if ((x + y) % 2 === 0) h_aclara(R, x, y, 0.13 - (y - 12) * 0.007);
  // el gran respaldo de nogal detrás del estrado, con dos pilastras acanaladas y la luz cálida que baja sobre el sello
  rect(98, 12, 222, 62, K); rect(99, 12, 221, 62, B.nogal); h_cuarteron(R, 108, 16, 212, 58, B.nogal, B.nogalL, B.nogalS, B.nogalV, 40);
  for (const px of [99, 214]) { rect(px, 12, px + 7, 62, B.nogalL); rect(px + 1, 16, px + 6, 61, B.nogal); for (let i = 0; i < 3; i++) rect(px + 2 + i * 2, 18, px + 2 + i * 2, 59, B.nogalS); rect(px - 1, 12, px + 8, 15, B.nogalS); rect(px - 1, 12, px + 8, 12, B.nogalL); }
  for (let y = 12; y < 52; y++) for (let x = 122; x < 199; x++) if ((x + y) % 2 === 0 && ((x - 160) / 38) ** 2 + ((y - 12) / 40) ** 2 < 1) h_aclara(R, x, y, 0.09, [255, 214, 140]);
  // el sello del tribunal: aro dorado con cuentas, campo azul con trece estrellas y la balanza; un brillo recorre el aro
  { const sx = 160, sy = 27;
    disco(sx, sy, 16, K); disco(sx, sy, 15, (x, y) => (x + y < sx + sy - 6 ? C.oroL : x + y > sx + sy + 8 ? C.oroS : C.oro));
    for (let k = 0; k < 30; k++) { const a = k / 30 * Math.PI * 2; pset(Math.round(sx + Math.cos(a) * 13.5), Math.round(sy + Math.sin(a) * 13.5), C.oroS); }
    disco(sx, sy, 12, K); disco(sx, sy, 11, (x, y, d) => (d > 0.82 ? hex('#1e2c66') : hex('#26387a')));
    for (let k = 0; k < 13; k++) { const a = -Math.PI / 2 + (k - 6) * 0.33; pset(Math.round(sx + Math.cos(a) * 8.6), Math.round(sy + Math.sin(a) * 8.6), C.blanco); }
    R.icono('balanza', sx - 3, sy - 3, C.oroL, K, 1); rect(sx - 6, sy + 6, sx + 6, sy + 7, C.oroS); rect(sx - 5, sy + 6, sx + 5, sy + 6, C.oro);
    const g = (t % 5.5) / 1.1; if (g < 1) { const a = -2.4 + g * Math.PI * 2, gx = Math.round(sx + Math.cos(a) * 14), gy = Math.round(sy + Math.sin(a) * 14); if (gy > 15) pset(gx, gy, C.blanco); if (gy > 15) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) pset(gx + dx, gy + dy, C.oroL); } }
  // las banderas en sus mástiles
  h_mastil(R, 110, 1, t); h_mastil(R, 202, -1, t); h_bandera(R, 112, 23, 1, t, 'eeuu'); h_bandera(R, 200, 23, -1, t, 'california');
  // la pared de la izquierda: el ventanal y la pantalla de las pruebas; la de la derecha: la puerta con el reloj y el cuadro
  h_ventanal(R, t); h_pantallaPruebas(R, t); h_puerta(R, t); h_cuadro(R, t);
  // el sillón alto del juez, de cuero con botones, que asoma por encima del estrado
  rect(146, 40, 174, 62, K); rect(147, 41, 173, 62, B.cuero); rect(147, 41, 173, 42, B.cueroL); rect(172, 43, 173, 62, B.cueroS);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) { const bx = 150 + i * 6 + (j % 2) * 3, by = 45 + j * 5; pset(bx, by, B.cueroS); pset(bx - 1, by - 1, B.cueroL); }
  if (o.detras) o.detras(R, t);   // el juez, que solo asoma por encima del estrado
  // la mesa del juez por arriba: carpetas apiladas, la jarra de agua, el micrófono y la lámpara de banquero con su luz
  rect(121, 52, 141, 59, K); rect(122, 53, 140, 54, C.papel); rect(122, 55, 140, 56, hex('#4a6aa8')); rect(122, 57, 140, 58, C.ocre); rect(124, 50, 137, 52, K); rect(125, 51, 136, 51, C.blanco);
  rect(142, 51, 146, 59, K); rect(143, 52, 145, 58, B.cristal); rect(143, 55, 145, 58, B.agua); pset(143, 52, C.blanco); rect(147, 53, 147, 56, K);
  linea(177, 59, 177, 54, K); linea(177, 54, 174, 52, K); rect(172, 51, 174, 52, hex('#3a3a46')); pset(177, 59, Math.floor(t * 1.5) % 2 ? C.rojo : C.rojoS);
  rect(186, 57, 194, 59, K); rect(189, 50, 190, 57, C.oroS); poligono([[183, 51], [197, 51], [194, 46], [186, 46]], K); poligono([[184, 50], [196, 50], [193, 47], [187, 47]], C.verde); rect(187, 47, 193, 47, C.verdeL);
  // la tarima y el estrado: tapa con su vuelo y la luz de la lámpara, friso, cinco cuarterones con el medallón y el zócalo
  rect(110, 99, 210, 110, K); rect(111, 100, 209, 110, B.nogalS); rect(111, 100, 209, 100, B.nogalL);
  rect(118, 60, 202, 100, K); rect(119, 61, 201, 99, B.nogal);
  rect(116, 59, 204, 63, K); rect(117, 60, 203, 61, B.nogalL); rect(117, 62, 203, 62, B.nogal); for (let x = 182; x < 200; x++) if (x % 2) pset(x, 60, C.oroL);
  rect(119, 64, 201, 65, B.nogalS);
  for (let k = 0; k < 5; k++) { const x = 123 + k * 16; h_cuarteron(R, x, 68, x + 11, 92, B.nogal, B.nogalL, B.nogalS, B.nogalV, k + 50); }
  disco(161, 80, 4, K); disco(161, 80, 3, C.oro); pset(160, 79, C.oroL); pset(162, 82, C.oroS);
  rect(119, 95, 201, 99, B.nogalS); rect(119, 95, 201, 95, B.nogalL);
  // la mesa del secretario, a la derecha del estrado, con su monitor (las líneas suben mientras escribe)
  rect(205, 61, 216, 71, K); rect(206, 62, 215, 69, hex('#1a2a44')); for (let k = 0; k < 3; k++) { const yy = 63 + ((k * 2 + Math.floor(t * 2)) % 6); rect(207, yy, 207 + 3 + (k * 3 + Math.floor(t * 2)) % 6, yy, hex('#7ac8e8')); } rect(210, 70, 211, 71, C.metalD);
  rect(202, 71, 220, 104, K); rect(203, 72, 219, 104, B.nogal); rect(203, 72, 219, 73, B.nogalL); h_cuarteron(R, 206, 77, 216, 100, B.nogal, B.nogalL, B.nogalS, B.nogalV, 60);
  // el banco de los testigos: el respaldo del sillón vacío, el vaso, el micrófono y dos cuarterones
  rect(89, 72, 107, 86, K); rect(90, 73, 106, 86, B.cuero); rect(90, 73, 106, 74, B.cueroL);
  rect(79, 84, 117, 110, K); rect(80, 85, 116, 110, B.nogal); rect(78, 82, 118, 86, K); rect(79, 83, 117, 84, B.nogalL); rect(79, 85, 117, 85, B.nogal);
  h_cuarteron(R, 83, 89, 96, 106, B.nogal, B.nogalL, B.nogalS, B.nogalV, 70); h_cuarteron(R, 100, 89, 113, 106, B.nogal, B.nogalL, B.nogalS, B.nogalV, 71);
  linea(112, 82, 112, 77, K); linea(112, 77, 109, 75, K); rect(107, 74, 109, 75, hex('#3a3a46')); rect(84, 77, 87, 82, K); rect(85, 78, 86, 81, B.cristal); pset(85, 78, C.blanco);
  // la tribuna del jurado: sillones, doce bustos y la baranda entre las dos filas; uno toma notas, otra bosteza y otro da
  // cabezadas (cierra los ojos, baja la cabeza y se despierta de golpe)
  rect(220, 70, 319, 120, K); rect(221, 71, 319, 119, B.nogalS); rect(221, 71, 319, 71, B.nogal);
  for (let k = 0; k < 12; k++) { const x = 226 + (k % 6) * 15, y = 74 + Math.floor(k / 6) * 20, [tipo, tl] = h_JURADO[k];
    if (k === 6) { rect(221, 86, 319, 92, K); rect(221, 87, 319, 91, B.nogal); rect(221, 87, 319, 87, B.nogalL); }
    rect(x - 2, y - 3, x + 10, y + 11, K); rect(x - 1, y - 2, x + 9, y + 11, B.cuero); rect(x - 1, y - 2, x + 9, y - 2, B.cueroL);
    const fase = t % 12.5, duerme = k === 7 && fase > 8.6 && fase < 11.4, bosteza = k === 10 && (t % 13.7) < 0.9;
    R.busto(tipo, tl, x, y + (duerme && fase > 9.2 ? 1 : 0), duerme ? 260.05 - x * 0.07 : t + k * 0.9, { rie: bosteza });
    if (k === 1 || k === 9) { rect(x + 1, y + 8, x + 7, y + 11, K); rect(x + 2, y + 9, x + 6, y + 11, C.blanco); rect(x + 3, y + 10, x + 5, y + 10, C.grisL); const px = x + 4 + Math.round(Math.sin(t * 6 + k) * 2); pset(px, y + 9, C.amarillo); pset(px + 1, y + 8, C.amarillo); pset(px + 2, y + 7, hex('#f6c290')); } }
  rect(220, 106, 319, 120, K); rect(221, 107, 319, 120, B.nogal); rect(221, 107, 319, 108, B.nogalL);
  for (let k = 0; k < 6; k++) h_cuarteron(R, 225 + k * 16, 111, 236 + k * 16, 118, B.nogal, B.nogalL, B.nogalS, B.nogalV, 80 + k);
  // la moqueta: su dibujo de rombos (más separados cuanto más cerca), la sombra junto a los muebles y la luz de los focos
  rect(0, 110, 319, 179, B.moq); rect(0, 110, 319, 111, B.moqS); rect(110, 111, 210, 112, B.moqS); rect(220, 120, 319, 122, B.moqS);
  for (let r = 0; r < 10; r++) { const y = 114 + Math.round(r * 4 + r * r * 0.45); if (y > 176) break; const paso = 12 + r * 2, off = (r % 2) * (paso >> 1);
    for (let x = off; x < 320; x += paso) { pset(x, y, B.moqL); pset(x - 1, y + 1, B.moqL); pset(x + 1, y + 1, B.moqL); pset(x, y + 2, B.moqL); pset(x, y + 1, B.moqS); } }
  for (const fx of [100, 160, 222]) if (fx !== 222 || foco) for (let y = 126; y < 140; y++) for (let x = fx - 34; x <= fx + 34; x++) if ((x + y) % 2 === 0 && ((x - fx) / 34) ** 2 + ((y - 133) / 7) ** 2 < 1) pset(x, y, B.moqL);
  // el sol del ventanal en la moqueta, con la sombra de la cruz del marco
  for (let y = 116; y < 150; y++) { const d = (y - 116) * 1.05, xa = Math.round(16 + d), xb = Math.round(54 + d), xm = (xa + xb) >> 1;
    for (let x = xa; x <= xb; x++) { if (Math.abs(x - xm) < 2 || Math.abs(y - 132) < 2) continue; if ((x + y) % 2 === 0 || (x - xa > 2 && xb - x > 2 && y > 118 && y < 147)) h_aclara(R, x, y, 0.2, [255, 236, 190]); } }
  // el público, en tres filas de bancos con su respaldo y su remate; una del público se abanica con un papel
  [[72, [8, 30, 52]], [86, [4, 26, 48]], [100, [10, 32, 54]]].forEach(([y, xs], fila) => {
    xs.forEach((x, i) => { const k = fila * 3 + i, [tipo, tl] = h_PUBLICO[k]; R.busto(tipo, tl, x, y, t + k * 1.3);
      if (k === 4) { const ab = Math.round(Math.sin(t * 9) * 1.5); rect(x + 10, y + 2 + ab, x + 13, y + 7 + ab, K); rect(x + 11, y + 3 + ab, x + 12, y + 6 + ab, C.blanco); pset(x + 10, y + 8, hex('#f6c290')); } });
    rect(0, y + 12, 77, y + 16, K); rect(0, y + 13, 76, y + 15, B.nogal); rect(0, y + 13, 76, y + 13, B.nogalL); rect(74, y + 9, 78, y + 17, K); rect(75, y + 10, 77, y + 16, B.nogalL); rect(77, y + 10, 77, y + 16, B.nogalS); });
  // motas de polvo que flotan en la luz del ventanal
  for (let k = 0; k < 12; k++) { const fy = (h(k, 3, 121) * 80 + t * (2 + h(k, 4, 121) * 3)) % 80, x = Math.round(14 + fy * 0.55 + h(k, 5, 121) * 34 + Math.sin(t * 0.6 + k) * 2), y = Math.round(64 + fy); if (Math.sin(t * 1.4 + k * 2) > -0.2) pset(x, y, hex('#fff4d8')); }
}
// Lo que va por delante de los personajes en la sala: las dos mesas de las partes (tablero en y 148–152 con su brillo, frente
// de cuarterones) con lo que hay encima en los huecos que dejan los que se sientan (carpetas, el micrófono con su luz, la
// jarra y el vaso, el portátil de la fiscalía con la pantalla que cambia y la caja de pruebas), y la barandilla torneada
// con su portillo, en primer término
export function tribunalDelante(R, t) {
  const { rect, pset, linea } = R, K = C.k, B = h_TB;
  for (const [a, b] of [[40, 130], [180, 270]]) {
    rect(a + 3, 152, b - 3, 179, K); rect(a + 4, 153, b - 4, 179, C.madera); rect(a + 4, 153, b - 4, 155, C.maderaS);
    for (let x = a + 8; x + 17 < b - 4; x += 22) h_cuarteron(R, x, 158, x + 17, 179, C.madera, C.maderaL, C.maderaS, B.maderaV, x);
    rect(a, 148, b, 152, K); rect(a + 1, 149, b - 1, 150, C.maderaL); rect(a + 1, 151, b - 1, 151, C.madera);
    const g = ((t * 0.3 + a * 0.01) % 2) * (b - a); if (g < b - a - 6) rect(a + 1 + Math.round(g), 149, a + 6 + Math.round(g), 149, hex('#e8b880'));
  }
  // la mesa de la defensa: las carpetas, el micrófono con su luz, la jarra y el vaso
  rect(44, 141, 62, 148, K); rect(45, 142, 61, 143, hex('#2a2e3a')); rect(45, 144, 61, 145, hex('#2a3a6a')); rect(45, 146, 61, 147, hex('#6a2a2a')); for (const y of [142, 144, 146]) rect(57, y, 59, y, C.papel); rect(46, 140, 60, 140, C.papel); rect(46, 140, 46, 140, K);
  rect(64, 146, 68, 147, K); linea(66, 146, 66, 140, K); linea(66, 140, 68, 138, K); pset(69, 137, hex('#3a3a46')); pset(65, 146, Math.floor(t * 1.2) % 2 ? C.rojo : C.rojoS);
  rect(114, 136, 120, 148, K); rect(115, 137, 119, 147, B.cristal); rect(115, 141, 119, 147, B.agua); pset(115, 137, C.blanco); rect(121, 139, 121, 143, K);
  rect(123, 141, 127, 148, K); rect(124, 142, 126, 147, B.cristal); rect(124, 144, 126, 147, B.agua); pset(124, 142, C.blanco);
  // la mesa de la fiscalía: el portátil (la pantalla pasa de un documento a una tabla) y la caja de pruebas con su etiqueta roja
  rect(182, 137, 195, 147, K); rect(183, 138, 194, 146, hex('#1c2230')); const p = Math.floor(t / 2.7) % 2;
  if (p) { rect(184, 139, 193, 145, C.blanco); for (let k = 0; k < 3; k++) rect(185, 140 + k * 2, 191 - k, 140 + k * 2, C.grisL); } else for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) rect(184 + i * 3, 139 + j * 2, 185 + i * 3, 139 + j * 2, (i + j + Math.floor(t * 2)) % 4 ? hex('#5a9ad8') : C.amarillo);
  rect(180, 147, 197, 148, K); rect(181, 147, 196, 147, C.metalL);
  rect(199, 146, 203, 147, K); linea(201, 146, 201, 140, K); linea(201, 140, 203, 138, K); pset(204, 137, hex('#3a3a46'));
  for (let k = 0; k < 3; k++) { const y = 147 - k * 3, dx = (k % 2) * 2; rect(253 + dx, y - 3, 268 + dx, y, K); rect(254 + dx, y - 2, 267 + dx, y - 1, k % 2 ? hex('#e0c080') : C.ocre); rect(254 + dx, y - 2, 267 + dx, y - 2, hex('#ecd498')); rect(257 + dx + k * 3, y - 4, 260 + dx + k * 3, y - 3, [C.rojo, hex('#4a78d0'), C.verde][k]); }
  // la barandilla de la sala, en primer término: pasamanos redondeado, balaustres torneados y el portillo del centro
  rect(0, 172, 319, 179, K); rect(0, 173, 319, 179, C.maderaS); rect(0, 173, 319, 173, C.madera);
  for (let x = 4; x < 320; x += 10) { if (x > 140 && x < 176) continue; rect(x, 166, x + 2, 172, K); rect(x + 1, 166, x + 1, 172, C.madera); rect(x - 1, 168, x + 3, 170, K); rect(x, 168, x + 2, 169, C.maderaL); }
  rect(146, 166, 170, 172, K); rect(147, 167, 169, 171, C.madera); rect(147, 167, 169, 167, C.maderaL); pset(148, 169, C.oro); pset(168, 169, C.oro);
  for (const x of [142, 172]) { rect(x, 162, x + 4, 172, K); rect(x + 1, 163, x + 3, 172, C.madera); rect(x + 1, 163, x + 1, 172, C.maderaL); rect(x, 161, x + 4, 162, K); pset(x + 2, 161, C.oro); }
  rect(0, 164, 319, 166, K); rect(0, 165, 319, 165, C.maderaL); rect(0, 164, 319, 164, hex('#c8935a'));
}
// El mazo de cerca, sobre la mesa del juez. Detrás, la sala desenfocada (el ventanal de donde viene el rayo de luz, el sello
// y la bandera en manchas suaves, luces que brillan y el público, que se mueve en penumbra; de vez en cuando alguien cruza);
// delante, la mesa pulida con sus vetas y su reflejo, el vade de piel con el filete dorado, el portaplumas y el taco
// redondo torneado con sus anillos. El mazo lo sujeta por el extremo del mango la mano del juez (la canónica, con la manga
// de la toga), y ese extremo es su eje: en el segundo y pico antes de o.golpe sube despacio, baja de un tirón y la cabeza
// da de lleno en el taco justo en o.golpe (segundos); luego rebota y se queda apoyada (líneas de golpe, astillas, el taco
// se hunde un poco y una onda corre por la madera). Sin o.golpe, el mazo espera en alto sobre el taco. o.mano: false para
// quitar la mano
export function mazo(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, K = C.k, B = h_TB;
  h_salaDesenfocada(R, t);
  // la mesa: tablero pulido con vetas, el canto de delante, el reflejo de la ventana y el vade de piel
  rect(0, 126, 319, 179, C.madera);
  for (let k = 0; k < 22; k++) { const y = 132 + Math.round(h(k, 1, 124) * 46); for (let x = 0; x < 320; x++) if (h(x >> 4, k, 125) < 0.7 && (x + k * 13) % 41 < 30) pset(x, y + Math.round(Math.sin(x * 0.04 + k) * 1.2), C.maderaS); }
  rect(0, 126, 319, 127, C.maderaL); rect(0, 128, 319, 128, hex('#9a6834'));
  for (let y = 131; y < 179; y += 1) { const x0 = Math.round(10 + (y - 131) * 0.9); for (let x = x0; x < x0 + 30; x++) if ((x + y) % 3 === 0) h_aclara(R, x, y, 0.1); }
  rect(92, 140, 246, 176, K); rect(93, 141, 245, 175, hex('#2a4a3a')); rect(95, 143, 243, 173, hex('#c8a050')); rect(96, 144, 242, 172, hex('#2a4a3a')); rect(93, 141, 245, 141, hex('#3a5e4a'));
  for (let y = 145; y < 172; y += 2) for (let x = 97; x < 242; x++) if (h(x >> 1, y, 128) < 0.12) pset(x, y, hex('#24402f'));
  for (const [x, y] of [[93, 141], [234, 141], [93, 164], [234, 164]]) { rect(x, y, x + 11, y + 11, hex('#1e382c')); pset(x + (x < 100 ? 10 : 1), y + (y < 150 ? 10 : 1), hex('#c8a050')); }
  rect(188, 146, 232, 168, K); rect(189, 147, 231, 167, hex('#d8b878')); rect(189, 147, 231, 148, hex('#e8cc90')); rect(189, 155, 231, 156, hex('#b89858')); rect(207, 147, 210, 167, C.rojo); rect(207, 147, 207, 167, hex('#e05a5a'));
  for (let k = 0; k < 3; k++) rect(192, 150 + k * 2, 202 - k * 2, 150 + k * 2, hex('#a88848'));
  // el portaplumas con dos plumas
  rect(66, 116, 78, 128, K); rect(67, 117, 77, 127, C.oroS); rect(67, 117, 77, 118, C.oro); rect(67, 121, 77, 121, C.oro); linea(70, 116, 66, 102, K); linea(71, 116, 67, 102, hex('#2a3a7a')); linea(75, 116, 79, 104, K); linea(76, 116, 80, 104, hex('#1c1c24')); pset(67, 102, C.oroL); pset(80, 104, C.oroL);
  // el golpe: la postura del mazo (th: inclinación del mango sobre la horizontal; alza: cuánto sube el brazo)
  const g = o.golpe ?? 1e9, d = t - g;
  let th = 0.16, alza = 0;
  if (d >= -1.3 && d < -0.12) { const s = R.tramo(d, -1.3, -0.12); th = lerp(0.16, 1.15, s); alza = 14 * s; }
  else if (d >= -0.12 && d < 0) { const s = (d + 0.12) / 0.12; th = 1.15 * (1 - s * s); alza = 14 * (1 - s); }
  else if (d >= 0 && d < 0.26) th = 0.13 * Math.sin(d / 0.26 * Math.PI);
  else if (d >= 0.26) th = 0;
  const hunde = d >= 0 && d < 0.1 ? 1 : 0;
  // la onda que corre por la madera, bajo el taco
  if (d >= 0 && d < 0.48) { const rx = 46 + d * 120, ry = rx / 7; for (let a = 0; a < Math.PI * 2; a += 0.02) { const x = Math.round(160 + Math.cos(a) * rx), y = Math.round(130 + Math.sin(a) * ry); if (y > 128 && (Math.round(a * 50) % 3)) h_aclara(R, x, y, 0.35 * (1 - d / 0.48), [255, 230, 170]); } }
  // el taco: sombra, cuerpo torneado con sus surcos y la cara de arriba con los anillos de la veta
  for (let j = 0; j <= 4; j++) for (let i = -46; i <= 46; i++) if ((i / 46) ** 2 + (j / 4) ** 2 < 1 && (i + j) % 2 === 0) pset(160 + i, 132 + j, C.maderaS);
  { const y0 = 124 + hunde;
    rect(121, y0, 199, y0 + 8, K); for (let x = 122; x <= 198; x++) { const c = x < 132 ? B.mazoB : x > 186 ? B.mazoS : B.mazoL; rect(x, y0, x, y0 + 7, c); } rect(122, y0 + 3, 198, y0 + 3, B.mazoS); rect(122, y0 + 5, 198, y0 + 5, B.mazoB);
    for (let j = -6; j <= 6; j++) for (let i = -40; i <= 40; i++) { const e = (i / 40) ** 2 + (j / 6) ** 2; if (e >= 1) continue; const r = Math.sqrt(e); pset(160 + i, y0 + j, r > 0.9 ? K : r > 0.8 ? B.mazo : Math.floor(r * 6 + h(i >> 3, 0, 126) * 0.6) % 2 ? B.mazoB : B.mazoL); }
    for (let i = -24; i <= -6; i++) pset(160 + i, y0 - 4, hex('#d89058')); }
  // el mazo: cabeza torneada con dos aros dorados y las testas claras, mango con su empuñadura; gira sobre el extremo del mango
  const L = 78, px = 238, py = 108 - Math.round(alza), c = Math.cos(th), s = Math.sin(th), hx = px - L * c, hy = py - L * s;
  const q = (u, w) => [Math.round(hx - s * u + c * w), Math.round(hy + c * u + s * w)], pol = (pts, col) => poligono(pts.map(([u, w]) => q(u, w)), col);
  pol([[-3, 8], [3, 8], [3, 13], [-3, 13]], K); pol([[-2, 9], [2, 9], [2, 12], [-2, 12]], C.oro);
  pol([[-2, 12], [2, 12], [2, L - 11], [-2, L - 11]], K); pol([[-1, 12], [1, 12], [1, L - 11], [-1, L - 11]], B.mazoL); pol([[-1, 14], [0, 14], [0, L - 12], [-1, L - 12]], B.mazoB);
  pol([[-3, L - 12], [3, L - 12], [3, L + 4], [-3, L + 4]], K); pol([[-2, L - 11], [2, L - 11], [2, L + 3], [-2, L + 3]], B.mazo); for (const w of [L - 8, L - 4, L]) pol([[-2, w], [2, w], [2, w + 1], [-2, w + 1]], B.mazoS);
  pol([[-14, -7], [-12, -9], [12, -9], [14, -7], [14, 7], [12, 9], [-12, 9], [-14, 7]], K);
  pol([[-13, -6], [-11, -8], [11, -8], [13, -6], [13, 6], [11, 8], [-11, 8], [-13, 6]], B.mazo);
  pol([[-12, -7], [12, -7], [12, -4], [-12, -4]], B.mazoL); pol([[-11, -6], [11, -6], [11, -5], [-11, -5]], B.mazoB); pol([[-12, 5], [12, 5], [12, 7], [-12, 7]], B.mazoS);
  for (const u0 of [-10, 8]) { pol([[u0, -8], [u0 + 2, -8], [u0 + 2, 8], [u0, 8]], C.oroS); pol([[u0, -8], [u0 + 1, -8], [u0 + 1, 8], [u0, 8]], C.oro); }
  for (const u0 of [-13, 12]) pol([[u0, -6], [u0 + 1, -6], [u0 + 1, 6], [u0, 6]], B.mazoB);
  // la mano del juez, que lo sujeta por el extremo del mango
  if (o.mano !== false) mano(R, px + 6, py, -1, '#1c1c24');
  // el golpe: líneas de golpe, astillas que saltan y polvo
  if (d >= 0 && d < 0.38) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI - Math.PI + 0.2, r = 30 + d * 80; linea(Math.round(160 + Math.cos(a) * r * 0.7), Math.round(120 + Math.sin(a) * r * 0.4), Math.round(160 + Math.cos(a) * (r + 8) * 0.7), Math.round(120 + Math.sin(a) * (r + 8) * 0.4), C.oroL); }
  if (d >= 0 && d < 0.6) for (let k = 0; k < 7; k++) { const vx = (h(k, 1, 127) - 0.5) * 140, vy = 60 + h(k, 2, 127) * 60, x = Math.round(160 + vx * d), y = Math.round(121 - vy * d + 260 * d * d); if (y < 128) { pset(x, y, k % 2 ? B.mazoB : hex('#e8d8b0')); if (k % 3 === 0) pset(x + 1, y, B.mazoB); } }
}
// El veredicto en dos columnas, en la pizarra de la sala: el marco de madera, la pizarra con borrones de borrador, restos de
// cuentas viejas y el reflejo de una ventana que se desliza despacio; arriba, dibujadas a tiza, la bolsa del dinero de los
// inversores (izquierda) y la gota de los pacientes (derecha), cada una con su figurita y su subrayado; debajo, los cargos:
// cruces rojas para los inversores (culpable) y círculos para los pacientes (absuelta), con su raya de total y los números
// «4» y «0». Abajo, la repisa con las tizas y el borrador, el polvo de tiza que cae y las cabezas del público de espaldas
// (en x = 6 + 25k, y 176, que la escena puede mover). o.u (0–1) va llenando
export function veredicto(R, t, o = {}) {
  const { rect, pset, disco, poligono } = R, u = o.u ?? 1, P = h_PZ, K = C.k;
  // el marco y la pizarra, con su grano, los borrones del borrador y restos de cuentas viejas
  rect(0, 0, 319, 179, C.maderaS); rect(0, 0, 319, 2, C.madera); rect(0, 3, 319, 3, C.maderaL); rect(0, 0, 3, 179, C.madera); rect(316, 0, 319, 179, C.madera); rect(3, 0, 3, 179, C.maderaL);
  rect(4, 4, 315, 163, K); rect(5, 5, 314, 162, P.verde);
  for (let y = 6; y < 162; y += 2) for (let x = 5; x < 315; x++) if (h(x >> 1, y, 60) < 0.05) pset(x, y, P.verdeL);
  for (let k = 0; k < 6; k++) { const cx = 30 + h(k, 1, 131) * 260, cy = 30 + h(k, 2, 131) * 110, r = 18 + h(k, 3, 131) * 22, a0 = h(k, 4, 131) * 6;
    for (let a = a0; a < a0 + 2.2; a += 0.03) for (let dd = 0; dd < 7; dd++) { const x = Math.round(cx + Math.cos(a) * (r + dd)), y = Math.round(cy + Math.sin(a) * (r + dd) * 0.6); if (x > 5 && x < 314 && y > 5 && y < 162 && h(x, y, 132) < 0.5) pset(x, y, P.borron); } }
  for (const [gx, gy, n] of [[12, 136, 3], [172, 140, 2], [124, 92, 2]]) for (let l = 0; l < n; l++) for (let x = 0; x < 28 - l * 6; x++) if (h(x, l, 133 + gx) < 0.7) pset(gx + x, gy + l * 6 + Math.round(Math.sin(x * 0.7 + l) * 1.5), P.fantasma);
  // el reflejo de una ventana que se desliza despacio por la pizarra
  { const gx = Math.round(24 + (Math.sin(t * 0.13) * 0.5 + 0.5) * 210), gy = 82; for (let y = gy; y < gy + 22; y++) for (let x = gx + Math.round((y - gy) * 0.3); x < gx + 36 + Math.round((y - gy) * 0.3); x++) if (Math.abs(x - gx - 18 - Math.round((y - gy) * 0.3)) > 1 && Math.abs(y - gy - 10) > 0) h_aclara(R, x, y, 0.05, [220, 240, 230]); }
  // dos hojas sujetas con imanes (un gráfico y la foto de la caja del aparato), con la esquina que se levanta con el aire
  for (const [x0, y0, tipo, im] of [[12, 22, 0, C.rojo], [284, 54, 1, hex('#4a78d0')]]) { const lev = Math.round(Math.max(0, Math.sin(t * 1.3 + x0)) * 2);
    rect(x0 + 1, y0 + 1, x0 + 25, y0 + 31, hex('#1e2a26')); rect(x0, y0, x0 + 24, y0 + 30, C.blanco); rect(x0, y0 + 30, x0 + 24, y0 + 30, hex('#d8d4cc'));
    if (tipo === 0) { rect(x0 + 3, y0 + 26, x0 + 21, y0 + 26, C.grisS); [8, 13, 10, 18].forEach((a, k) => rect(x0 + 4 + k * 5, y0 + 26 - a, x0 + 7 + k * 5, y0 + 25, k === 3 ? C.rojo : hex('#4a78d0'))); }
    else { rect(x0 + 3, y0 + 4, x0 + 21, y0 + 24, hex('#3a4250')); rect(x0 + 6, y0 + 8, x0 + 18, y0 + 22, C.blanco); rect(x0 + 8, y0 + 10, x0 + 16, y0 + 14, hex('#1c2230')); pset(x0 + 10, y0 + 12, C.tealT); rect(x0 + 3, y0 + 26, x0 + 18, y0 + 26, C.grisL); }
    rect(x0 + 21 - lev, y0 + 27 - lev, x0 + 24, y0 + 30, P.verde); poligono([[x0 + 21 - lev, y0 + 30], [x0 + 24, y0 + 27 - lev], [x0 + 21 - lev, y0 + 27 - lev]], hex('#d8d4cc'));
    disco(x0 + 12, y0 + 1, 3, K); disco(x0 + 12, y0 + 1, 2, im); pset(x0 + 11, y0, C.blanco); }
  // la raya que separa las dos columnas
  for (let y = 20; y < 161; y++) for (let x = 158; x <= 160; x++) if (h(x, y, 134) < 0.86) pset(x, y, h(x, y, 135) < 0.3 ? P.tizaS : P.tiza);
  // la bolsa del dinero, a tiza amarilla, con su rayado de sombra, el lazo y el «$»
  h_aroTiza(R, 80, 55, 14, P.tizaA, 1, -1.05, 4.2, 2); h_tiza(R, 73, 43, 75, 35, P.tizaA, 2, 2); h_tiza(R, 86, 43, 84, 35, P.tizaA, 2, 3); h_tiza(R, 71, 31, 89, 31, P.tizaA, 1, 4); h_tiza(R, 71, 31, 75, 35, P.tizaA, 1, 5); h_tiza(R, 89, 31, 85, 35, P.tizaA, 1, 6);
  h_tiza(R, 72, 38, 88, 38, P.tizaR, 1, 7); h_aroTiza(R, 91, 40, 2, P.tizaR, 8);
  for (let k = 0; k < 4; k++) h_tiza(R, 80 + k * 3, 67, 92, 55 + k * 3, P.tizaAS, 1, 10 + k);
  R.numero('$', 81, 63, { tam: 16, centro: true, color: P.tizaA, contorno: false, sombra: false });
  h_figuraTiza(R, 112, 44, P.tiza, 'corbata', 20); h_tiza(R, 48, 76, 120, 77, P.tiza, 1, 21);
  // la gota de los pacientes, a tiza rosa, con su rayado y su brillo
  h_aroTiza(R, 240, 55, 12, P.tizaR, 30, -0.75, 3.9, 2); h_tiza(R, 231, 47, 240, 28, P.tizaR, 2, 31); h_tiza(R, 249, 47, 240, 28, P.tizaR, 2, 32);
  for (let k = 0; k < 4; k++) h_tiza(R, 240 + k * 3, 66, 250, 56 + k * 3, P.tizaRS, 1, 33 + k);
  h_aroTiza(R, 235, 50, 4, P.tiza, 40, 3.3, 4.6); h_figuraTiza(R, 206, 44, P.tiza, 'tirita', 41); h_tiza(R, 200, 76, 272, 77, P.tiza, 1, 42);
  // los cargos: cruces rojas (culpable) y círculos (absuelta), la raya del total y los números
  for (const [cx, culpa] of [[80, true], [240, false]]) for (let k = 0; k < 4; k++) { if (!(u * 8 > k + (culpa ? 0 : 4))) continue; const x = cx - 36 + k * 20, y = 110;
    if (culpa) { h_tiza(R, x, y, x + 14, y + 14, P.tizaR, 2, 50 + k); h_tiza(R, x + 14, y, x, y + 14, P.tizaR, 2, 60 + k); }
    else h_aroTiza(R, x + 7, y + 7, 7, P.tiza, 70 + k, 0, Math.PI * 2, 2); }
  if (u * 8 > 3.5) h_tiza(R, 40, 132, 122, 133, P.tizaS, 1, 80);
  if (u > 0.9) { h_tiza(R, 200, 132, 282, 133, P.tizaS, 1, 81); R.numero('4', 80, 160, { tam: 16, centro: true }); R.numero('0', 240, 160, { tam: 16, centro: true }); }
  // el polvo de tiza que cae despacio
  for (let k = 0; k < 8; k++) { const fy = (h(k, 1, 139) * 30 + t * (4 + h(k, 2, 139) * 4)) % 30, x = Math.round(20 + h(k, 3, 139) * 280 + Math.sin(t + k) * 2), y = Math.round(134 + fy); if (fy < 28) pset(x, y, P.tizaS); }
  // la repisa con las tizas, el polvo y el borrador
  rect(0, 163, 319, 171, K); rect(1, 164, 318, 170, C.madera); rect(1, 164, 318, 164, C.maderaL); rect(1, 169, 318, 170, C.maderaS);
  for (let x = 6; x < 314; x += 3) if (h(x, 1, 138) < 0.4) pset(x, 165, P.tizaS);
  for (const [x, l, c] of [[24, 9, P.tiza], [40, 6, P.tizaA], [52, 4, P.tiza], [262, 8, P.tizaR], [276, 5, P.tiza]]) { rect(x, 165, x + l, 167, K); rect(x, 165, x + l - 1, 166, c); }
  rect(288, 159, 306, 166, K); rect(289, 160, 305, 162, C.maderaL); rect(289, 163, 305, 165, hex('#8a8a96'));
  // las cabezas del público, de espaldas
  rect(0, 172, 319, 179, C.madera);
  for (let k = 0; k < 13; k++) { const x = 6 + k * 25, y = 176; disco(x, y, 8, K); disco(x, y - 1, 7, [hex('#3a2a20'), hex('#c8a060'), hex('#1e1a24'), hex('#6a4a2a')][k % 4]); }
}
// Las dos condenas como barras de calendario, en meses: Holmes 135 (dorada) y Balwani 155 (roja), sobre la sala en
// penumbra; los focos del techo siguen encendidos y echan dos haces de luz con motas de polvo; junto a cada barra, su
// calendarito de anillas. o.u (0–1) hace crecer las barras (con 0 no se pinta ninguna: la escena pone las suyas); los dos
// personajes pequeños delante de cada barra los pone la escena
export function condenas(R, t, o = {}) {
  const { rect, pset } = R, u = o.u ?? 1, K = C.k;
  tribunal(R, t); tinte(R, 0, 179, [30, 30, 46], 0.72);
  // los focos siguen encendidos y echan sus haces, con motas de polvo
  for (const fx of [100, 222]) { if (fx === 222 && h_parpadeo(t, 7.3)) continue; rect(fx - 6, 5, fx + 6, 6, C.blanco);
    for (let y = 8; y < 150; y++) { const a = (y - 8) * 0.3, x0 = Math.round(fx - 6 - a), x1 = Math.round(fx + 6 + a); for (let x = x0; x <= x1; x++) if ((x + y) % 2 === 0) h_aclara(R, x, y, 0.09 * (1 - (y - 8) / 170), [255, 236, 190]); } }
  for (let k = 0; k < 18; k++) { const fx = k % 2 ? 100 : 222, fy = (h(k, 1, 123) * 130 + t * (3 + h(k, 2, 123) * 3)) % 130, a = fy * 0.3, x = Math.round(fx + (h(k, 3, 123) - 0.5) * (12 + 2 * a) + Math.sin(t * 0.7 + k) * 2), y = Math.round(10 + fy); if (Math.sin(t * 1.6 + k * 2.3) > -0.3) pset(x, y, hex('#d8d0c0')); }
  for (const y of [60, 116]) h_calendarito(R, 40, y + 2);
  if (u > 0) for (const [y, meses, c, cl] of [[60, 135, hex('#e8c040'), hex('#f8e080')], [116, 155, hex('#c84a4a'), hex('#e87070')]]) { const m = meses * Math.min(1, u), w = Math.round(m * 1.2); if (w < 2) continue;
    rect(68, y + 23, 68 + w, y + 24, hex('#141420')); rect(66, y, 66 + w, y + 22, K); rect(67, y + 1, 65 + w, y + 21, c); rect(67, y + 1, 65 + w, y + 2, cl);
    for (let mm = 12; mm < m; mm += 12) rect(66 + Math.round(mm * 1.2), y + 1, 66 + Math.round(mm * 1.2), y + 21, K);
    if (u > 0.95) R.numero(String(meses), 76 + w, y + 18, { tam: 16 }); }
}
// el campo federal de Texas al amanecer: cielo tramado de añil a oro con las últimas estrellas y el lucero, nubes
// alargadas con el borde encendido por debajo, cirros rosados, el sol con su halo que asoma por la izquierda y la bruma
// sobre el horizonte; bandadas a contraluz y un halcón que gira; a lo lejos, colinas, mezquites, el tendido eléctrico con
// pájaros posados, una bomba de petróleo que cabecea y un camión con los faros encendidos; el depósito de agua sobre sus
// patas con su luz roja; los pabellones de ladrillo claro (juntas, luz rasante, azotea con máquinas y vapor, ventanas que
// reflejan el cielo o se encienden, la entrada con su marquesina, el escudo y los setos), el mástil con la bandera al
// viento, la garita, las farolas aún encendidas, la valla de malla con su alambre que brilla, el camino de grava y el de
// asfalto que baja hacia nosotros, hierba seca que se mece y rachas de polvo. o.coche (0–1): un coche oscuro llega;
// o.carta (0–1): un sobre sale volando hacia el cielo como un pájaro
export function prision(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, hor = 104;
  const sx = 60, sy = Math.round(hor - 7 - Math.min(4, t * 0.25));
  // el cielo del alba: degradado tramado, más claro alrededor del sol
  i_degradado(R, 0, 0, 319, hor - 1, I_ALBA, (x, y) => { const d = 1 - Math.hypot((x - sx) * 0.5, (y - sy) * 1.25) / 130; return d > 0 ? d * 1.9 : 0; }, 1.3);
  // las últimas estrellas, que se apagan, y el lucero (lejos de la barra del año y de la zona de Atom)
  for (let k = 0; k < 20; k++) { const x = Math.round(180 + h(k, 1, 90) * 94), y = Math.round(6 + h(k, 2, 90) * 30), b = Math.sin(t * (1.4 + (k % 4) * 0.6) + k * 2); if (b > -0.2) pset(x, y, b > 0.65 ? hex('#ece6fa') : hex('#7e7cb4')); }
  { const lx = 206, ly = 20, s = Math.sin(t * 2.3) > 0.2 ? 2 : 1; for (let r = 1; r <= s; r++) { pset(lx - r, ly, hex('#c8c0f0')); pset(lx + r, ly, hex('#c8c0f0')); pset(lx, ly - r, hex('#c8c0f0')); pset(lx, ly + r, hex('#c8c0f0')); } pset(lx, ly, C.blanco); }
  // el sol con su halo
  R.halo(sx, sy, 42, [hex('#f6aa6c'), hex('#fac67a'), hex('#fcdc96'), hex('#fdeebc')], 1.15);
  disco(sx, sy, 12, hex('#ffc46e')); disco(sx, sy, 11, hex('#ffe8a8')); disco(sx, sy, 10, hex('#fff6d8')); disco(sx - 1, sy - 1, 7, hex('#fffdf2'));
  // cirros altos, con el filo rosado, que se mecen despacio
  for (const [x0, y, w, k] of [[26, 26, 74, 0], [186, 31, 62, 1], [112, 40, 56, 2]]) { const dx = Math.round(Math.sin(t * 0.15 + k * 2) * 4);
    for (let i = 0; i < w; i++) { const e = Math.sin(i / w * Math.PI), yy = y + Math.round(Math.sin(i * 0.07 + k) * 1.4); if (e < 0.3 && (i & 1)) continue; pset(x0 + dx + i, yy, hex('#c47494')); if (e > 0.45 && h(i >> 2, k, 91) > 0.3) pset(x0 + dx + i, yy + 1, hex('#f2a29a')); } }
  // las nubes bajas, encendidas por debajo (más doradas cerca del sol); van despacio hacia la derecha
  for (const [x0, y, w, v, k] of [[20, 58, 86, 1.1, 0], [200, 66, 64, 0.7, 1], [330, 60, 52, 1.5, 2], [120, 76, 44, 0.9, 3]]) {
    const cx = ((x0 + t * v) % 440) - 60, cerca = Math.abs(cx - sx) < 80;
    i_nube(R, cx, y, w, k, cerca ? [hex('#9a5e86'), hex('#c8707e'), hex('#f6a670'), hex('#fde2a2')] : [hex('#5e4a86'), hex('#7c5690'), hex('#d27a8a'), hex('#f6b08c')]); }
  // la bandada en uve que cruza hacia el sol, un halcón que gira y golondrinas
  { const u = (t / 46 + 0.15) % 1, x0 = Math.round(340 - u * 420); for (let k = 0; k < 7; k++) { const lado = k % 2 ? 1 : -1, m = Math.ceil(k / 2), bx = x0 + m * 6, by = Math.round(55 + (340 - bx) * 0.03 + lado * m * 3), a = Math.sin(t * 7 + k) > 0;
      pset(bx, by, hex('#3a2e4a')); pset(bx - 1, by - (a ? 1 : -1), hex('#3a2e4a')); pset(bx + 1, by - (a ? 1 : -1), hex('#3a2e4a')); pset(bx - 2, by - (a ? 2 : -1), hex('#3a2e4a')); pset(bx + 2, by - (a ? 2 : -1), hex('#3a2e4a')); } }
  { const a = t * 0.45, hx = Math.round(150 + Math.cos(a) * 34), hy = Math.round(68 + Math.sin(a) * 7), b = Math.round(Math.sin(t * 2.2)); for (let i = -4; i <= 4; i++) pset(hx + i, hy - (Math.abs(i) > 2 ? b : 0), hex('#2e2438')); pset(hx, hy + 1, hex('#2e2438')); }
  bandada(R, t, { y: 62, n: 4, cada: 13, semilla: 2 });
  // la tierra, con la luz rasante del sol a ras de suelo
  i_degradado(R, 0, hor, 319, 179, I_TIERRA, (x, y) => { const d = 1 - Math.hypot((x - sx) * 0.35, (y - hor) * 1.6) / 90; return d > 0 ? -d * 1.4 : 0; }, 0.9);
  // las colinas lejanas, los mezquites y el tendido eléctrico a contraluz
  for (let x = 0; x < 320; x++) { const hh = Math.round(3 + 2.5 * Math.sin(x * 0.027 + 1) + 1.5 * Math.sin(x * 0.083)), cerca = Math.abs(x - sx) < 64; rect(x, hor - hh, x, hor - 1, cerca ? hex('#b47282') : hex('#80608a')); pset(x, hor - hh, cerca ? hex('#f8c094') : hex('#a87a94')); }
  for (const [x, s] of [[6, 4], [104, 3], [270, 5], [312, 4]]) { disco(x, hor - 3 - s, s, hex('#4e3e58')); disco(x + s, hor - 2 - s, s - 1, hex('#4e3e58')); rect(x, hor - 3, x, hor - 1, hex('#4e3e58')); }
  for (const x of [14, 48]) { rect(x, hor - 13, x, hor - 1, hex('#3e3048')); rect(x - 3, hor - 13, x + 3, hor - 13, hex('#3e3048')); }
  for (const [a, b] of [[-20, 14], [14, 48], [48, 82]]) for (const dy of [-11]) for (let x = a; x <= b; x++) pset(x, hor + dy + Math.round(Math.sin((x - a) / (b - a) * Math.PI) * 2.5), hex('#4a3a54'));
  for (const [x, k] of [[24, 0], [28, 1], [35, 2]]) { const vuela = (t + k * 3) % 11 < 1.2, y = hor - 11 + Math.round(Math.sin((x - 14) / 34 * Math.PI) * 2.5) - 1; if (vuela) { const u = ((t + k * 3) % 11) / 1.2; pset(x + Math.round(u * 6), y - Math.round(u * 8), hex('#3e3048')); } else { pset(x, y, hex('#3e3048')); pset(x, y - 1, hex('#3e3048')); } }
  { const pj = hex('#3e3446'), a = Math.sin(t * 1.6) * 0.32, px = 292, py = hor - 9; linea(287, hor - 1, px, py, pj); linea(297, hor - 1, px, py, pj); const ex = Math.round(Math.cos(a) * 8), ey = Math.round(Math.sin(a) * 8);
    linea(px - ex, py - ey, px + ex, py + ey, pj); rect(px - ex - 1, py - ey, px - ex, py - ey + 3, pj); linea(px + ex, py + ey, 299, hor - 3, pj); disco(299, hor - 3, 2, pj); rect(284, hor - 1, 302, hor - 1, pj); }
  { const u = (t / 26) % 1, x = Math.round(340 - u * 420), y = hor - 2; rect(x, y - 4, x + 9, y - 1, hex('#3e3446')); rect(x, y - 6, x + 3, y - 4, hex('#3e3446')); pset(x - 1, y - 2, hex('#fff2b0')); for (let i = 2; i < 7; i++) if (i_b4(x - i, y - 2) < 0.6 - i * 0.08) pset(x - i, y - 2, hex('#fde4a4')); pset(x + 9, y - 2, C.rojo); }
  // la bruma del amanecer sobre el horizonte, que se desplaza
  for (let y = hor - 12; y < hor + 7; y++) { const d = 1 - Math.abs(y - (hor - 2)) / 9.5; if (d <= 0) continue;
    for (let x = 0; x < 320; x++) { if ((x - sx) ** 2 + (y - sy) ** 2 < 160) continue; const n = 0.55 + 0.45 * Math.sin((x + t * 3) * 0.045 + Math.sin(x * 0.11 + y * 0.7) * 0.9); if (d * n * 0.85 > i_b4(x, y) + 0.12) pset(x, y, Math.abs(x - sx) < 70 ? hex('#fde2b8') : hex('#e2b4b0')); } }
  // el depósito de agua: el tanque cilíndrico con su tejado en cono, la pasarela con barandilla, las patas arriostradas,
  // la escalerilla y la luz roja de aviso; la luz del alba le da por la izquierda
  { const PAT = hex('#5a566c'), xa = (y) => Math.round(243 - (y - 58) * 5 / 46), xb = (y) => Math.round(259 + (y - 58) * 5 / 46);
    for (const [a, b] of [[243, 238], [247, 246], [255, 256], [259, 264]]) linea(a, 58, b, hor, PAT);
    for (const [ya, yb] of [[62, 74], [74, 87], [87, 100]]) { linea(xa(ya), ya, xb(yb), yb, PAT); linea(xb(ya), ya, xa(yb), yb, PAT); rect(xa(yb), yb, xb(yb), yb, PAT); }
    rect(250, 58, 250, hor, PAT); rect(252, 58, 252, hor, PAT); for (let y = 60; y < hor; y += 3) pset(251, y, PAT);
    for (let y = 42; y <= 57; y++) for (let x = 240; x <= 262; x++) { const u = (x - 251) / 11; pset(x, y, x === 240 || x === 262 ? C.k : u < -0.55 ? hex('#f6e2d2') : u < -0.1 ? hex('#d6cace') : u < 0.45 ? hex('#b2acc0') : hex('#8a86a0')); }
    rect(241, 48, 261, 48, hex('#9a90aa')); rect(241, 49, 245, 49, hex('#fff0e0'));
    poligono([[238, 43], [264, 43], [251, 32]], C.k); poligono([[240, 42], [251, 42], [251, 34]], hex('#d8bcc0')); poligono([[251, 42], [262, 42], [251, 34]], hex('#7e7a94'));
    rect(236, 57, 266, 58, C.k); rect(237, 54, 265, 54, PAT); for (let x = 237; x <= 265; x += 4) rect(x, 54, x, 56, PAT);
    rect(251, 29, 251, 32, C.k); pset(251, 28, Math.sin(t * 3) > 0 ? hex('#ff5a4a') : C.rojoS); if (Math.sin(t * 3) > 0) { pset(250, 28, hex('#c83a3a')); pset(252, 28, hex('#c83a3a')); } }
  // los pabellones de ladrillo claro, con la luz rasante por la izquierda
  const LAD = hex('#dcc6a0'), LADL = hex('#f6e2b6'), LADS = hex('#bca482'), JUN = hex('#c6ae88'), y1 = hor + 8;
  for (const [x0, x1, y0, k] of [[110, 200, 80, 0], [196, 240, 86, 1], [70, 112, 88, 2]]) {
    rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1, LAD);
    for (let y = y0 + 3; y < y1 - 3; y += 3) for (let x = x0 + 3 + ((y / 3) & 1) * 4; x < x1 - 2; x += 8) pset(x, y, JUN);   // las juntas
    rect(x0 + 1, y0 + 1, x0 + 1, y1, LADL); rect(x1 - 2, y0 + 1, x1 - 1, y1, LADS); rect(x0 + 1, y1 - 3, x1 - 1, y1, LADS);   // canto con luz, canto en sombra y zócalo
    rect(x0 - 1, y0 - 3, x1 + 1, y0, hex('#8a7a6a')); rect(x0 - 1, y0 - 3, x1 + 1, y0 - 3, hex('#f2c690')); rect(x0 - 1, y0, x1 + 1, y0, hex('#5e5048'));   // el pretil con el sol encima
    // las ventanas: unas reflejan el cielo del alba; otras se encienden y se apagan, y a veces pasa alguien
    const filas = y1 - y0 > 26 ? [y0 + 5, y0 + 16] : [y0 + 6];
    filas.forEach((wy, j) => { for (let x = x0 + 5, i = 0; x < x1 - 8; x += 10, i++) { if (k === 0 && j === 1 && x > 138 && x < 168) continue;
      const luz = h(x, wy + Math.floor((t + i * 1.7 + j * 2.3) / 6), 92) < 0.3;
      rect(x, wy, x + 6, wy + 7, C.k);
      if (luz) { rect(x + 1, wy + 1, x + 5, wy + 6, hex('#f8d27a')); rect(x + 1, wy + 5, x + 5, wy + 6, hex('#e0aa58')); if (h(i, j + Math.floor(t / 3), 93) < 0.25) rect(x + 2 + Math.floor(t * 2 % 3), wy + 3, x + 3 + Math.floor(t * 2 % 3), wy + 6, hex('#7a5a3a')); }
      else { rect(x + 1, wy + 1, x + 5, wy + 3, hex('#c87a8a')); rect(x + 1, wy + 4, x + 5, wy + 6, hex('#4a4466')); pset(x + 1, wy + 1, hex('#f6b08c')); }
      rect(x + 3, wy + 1, x + 3, wy + 6, hex('#5a4a52')); rect(x - 1, wy + 8, x + 7, wy + 8, LADL); } });
    // los setos al pie
    for (let x = x0 + 4; x < x1 - 2; x += 7) { if (k === 0 && x > 140 && x < 170) continue; disco(x, y1 - 2, 3, hex('#3e5232')); pset(x - 1, y1 - 5, hex('#8a9a4a')); pset(x - 2, y1 - 4, hex('#6a7a3a')); }
  }
  // la azotea: máquinas, respiraderos con vapor, la antena parabólica y la chimenea
  rect(124, 73, 138, 79, C.k); rect(125, 74, 137, 79, hex('#aaa6ac')); rect(125, 74, 137, 74, hex('#f0d8b0')); for (let x = 127; x < 136; x += 2) rect(x, 76, x, 78, hex('#7a7680'));
  rect(176, 75, 184, 79, C.k); rect(177, 76, 183, 79, hex('#9a96a0')); rect(186, 72, 188, 79, hex('#6a6a7a')); rect(186, 72, 186, 79, hex('#c8bcc0'));
  i_vapor(R, 187, 71, t, 0, hex('#e6d4dc'), 16); i_vapor(R, 131, 72, t, 1.7, hex('#e6d4dc'), 12);
  rect(80, 81, 84, 87, C.k); rect(81, 82, 83, 87, hex('#b4645a')); i_vapor(R, 82, 80, t, 3.1, hex('#b8a8b4'), 14);
  for (let j = -3; j <= 3; j++) for (let i = -4; i <= 4; i++) if ((i / 4) ** 2 + (j / 3) ** 2 < 1 && i < 2) pset(226 + i, 81 + j, i < -2 ? hex('#f0e2d0') : hex('#c8c4d0')); linea(226, 81, 230, 79, C.metalD); rect(225, 84, 227, 85, C.metalD);
  // la entrada principal: marquesina, puertas con luz, apliques, el escudo y la placa
  rect(142, 95, 168, 97, C.k); rect(143, 96, 167, 96, hex('#6a6a7a')); rect(145, 98, 165, 98, hex('#fff0c0'));
  rect(147, 99, 163, y1, C.k); rect(148, 100, 154, y1, hex('#f8e0a0')); rect(156, 100, 162, y1, hex('#f8e0a0')); rect(148, 106, 162, 106, hex('#e8c47a')); pset(153, 104, C.oroS); pset(157, 104, C.oroS);
  for (const x of [144, 166]) { R.halo(x, 102, 5, [hex('#f0d8a8'), hex('#fbe8c0')], 1.2); rect(x, 101, x, 103, hex('#fff6d0')); }
  disco(155, 88, 4, C.k); disco(155, 88, 3, hex('#c8a040')); disco(155, 88, 2, hex('#2a3a7a')); pset(155, 88, hex('#f0e0a0')); pset(154, 87, hex('#f0e0a0'));
  rect(122, 99, 138, 105, C.k); rect(123, 100, 137, 104, hex('#d8d0c0')); rect(125, 101, 135, 101, hex('#6a6a7a')); rect(125, 103, 131, 103, hex('#6a6a7a'));
  // el mástil con su bola dorada, la driza y la bandera que ondea (con sombra en los pliegues)
  rect(220, 56, 221, y1, hex('#c8c4cc')); rect(221, 56, 221, y1, hex('#7a7688')); disco(220, 55, 1, C.oroL); for (let y = 58; y < y1; y += 2) pset(222, y, hex('#9a96a6'));
  for (let j = 0; j < 10; j++) for (let i = 0; i < 14; i++) { const w = Math.sin(t * 2 + i * 0.4), c = j < 5 && i < 6 ? ((i + j) % 2 ? hex('#2a3a8a') : C.blanco) : j % 2 ? C.blanco : C.rojo; pset(222 + i, 57 + j + Math.round(w), Math.cos(t * 2 + i * 0.4) < -0.4 ? i_mezcla(c, C.k, 0.25) : c); }
  // la garita junto a la barrera, con su ventana encendida y el vigilante que lee dentro
  rect(244, 100, 262, 118, C.k); rect(245, 101, 261, 118, hex('#e8e2d6')); rect(245, 101, 245, 118, hex('#fff4dc')); rect(243, 98, 263, 100, hex('#5a5a6a')); rect(243, 98, 263, 98, hex('#f2c690'));
  rect(247, 104, 259, 110, C.k); rect(248, 105, 258, 109, hex('#f8d888')); { const gx = 252 + (Math.sin(t * 0.7) > 0.6 ? 1 : 0); disco(gx, 107, 2, hex('#3a3040')); rect(gx - 2, 109, gx + 2, 109, hex('#4a5a7a')); } rect(248, 110, 258, 110, hex('#c8c0b0'));
  // las farolas, todavía encendidas
  for (const [x, k] of [[128, 0], [270, 1]]) { rect(x, 84, x + 1, 117, hex('#5a5a6a')); rect(x, 84, x + 6, 85, hex('#5a5a6a')); rect(x + 4, 85, x + 8, 87, C.k); const on = !(k === 1 && Math.sin(t * 13) > 0.85); if (on) { R.halo(x + 6, 89, 6, [hex('#f2d8a8'), hex('#fbe6bc')], 1.1); rect(x + 5, 88, x + 7, 88, hex('#fff4c8')); } }
  // la valla de malla con su alambre de espino, que brilla donde le da el sol
  for (let y = 106; y <= 118; y++) for (let x = 0; x <= 120; x++) if ((x + y) % 5 === 0 || (x - y + 500) % 5 === 0) pset(x, y, Math.abs(x - sx) < 30 ? hex('#fff0c8') : hex('#aaa6b4'));
  for (let x = 0; x <= 120; x += 24) { rect(x, 100, x + 1, 118, hex('#5a5a6a')); pset(x, 100, hex('#f0d8b0')); }
  rect(0, 104, 120, 105, hex('#7a7a8a')); rect(0, 104, 120, 104, hex('#d8d0d4'));
  for (let x = 0; x <= 120; x++) pset(x, 101 + Math.round(Math.sin(x * 0.9) * 1.4), (x % 7 === 0 && Math.sin(t * 2 + x) > 0) ? hex('#fff6d8') : hex('#4a4a5a'));
  // el camino de grava, con las rodadas, y la barrera
  rect(0, 118, 319, 124, hex('#b4a88e')); rect(0, 118, 319, 118, hex('#d4c8aa')); rect(0, 124, 319, 124, hex('#968a72'));
  for (let x = 0; x < 320; x++) { if (x & 1) { pset(x, 120, hex('#a29680')); pset(x, 122, hex('#a29680')); } if (h(x, 1, 95) < 0.2) pset(x, 119 + Math.floor(h(x, 2, 95) * 5), h(x, 3, 95) < 0.5 ? hex('#8a7e68') : hex('#e2d6b8')); }
  rect(184, 112, 186, 124, hex('#4a4e5c')); rect(184, 112, 184, 124, hex('#9a9eac')); rect(186, 113, 222, 114, C.blanco); for (let x = 190; x < 222; x += 8) rect(x, 113, x + 3, 114, C.rojo); rect(221, 112, 222, 115, hex('#4a4e5c'));
  // el camino de asfalto que baja hacia nosotros, con su raya, grietas y bordes
  poligono([[140, 179], [180, 179], [166, 124], [156, 124]], hex('#8a8478'));
  linea(140, 179, 156, 124, hex('#aaa292')); linea(180, 179, 166, 124, hex('#6e6a60'));
  for (let y = 126; y < 179; y += Math.round(4 + (y - 124) * 0.12)) rect(160, y, 161, y + Math.round(1 + (y - 124) * 0.05), hex('#e2d8a8'));
  for (const [x, y, k] of [[150, 160, 0], [170, 142, 1], [154, 134, 2]]) for (let i = 0; i < 5; i++) pset(x + Math.round(i * (k - 1) * 0.6), y + i, hex('#6e6a60'));
  // hierba seca en matas que se mece con el viento, más grande cuanto más cerca, y alguna piedra
  for (let k = 0; k < 150; k++) { const f = h(k, 3, 93), y = Math.round(hor + 3 + f ** 1.5 * 74), x = Math.round(h(k, 4, 93) * 330) - 5;
    if ((y > 116 && y < 126) || (y < 119 && x < 268) || (y > 124 && Math.abs(x - 160) < 14 + (y - 124) * 0.38)) continue;
    const s = 0.8 + (y - hor) / 26, n = 2 + Math.round(s), sw = Math.sin(t * 2.2 + x * 0.07) * (s > 2 ? 1.2 : 0.6);
    for (let i = 0; i < n; i++) { const bx = x + i - (n >> 1), hh = Math.max(1, Math.round(s * (1.2 + h(k, i, 94) * 1.8))); linea(bx, y, Math.round(bx + sw * (i % 2 ? 1 : 0.6) + (i - n / 2) * 0.5), y - hh, i === 0 ? hex('#f0cc84') : i % 2 ? hex('#9c7e48') : hex('#c4a060')); }
    if (h(k, 5, 93) < 0.3) pset(x + 3, y, hex('#8a7a66')); }
  // matorrales con su sombra larga hacia la derecha
  for (const [x, y, s] of [[10, 160, 6], [304, 168, 7], [62, 138, 4], [268, 134, 4]]) { for (let i = 1; i <= s * 3; i++) if (i_b4(x + i, y) < 0.7) pset(x + i, y, hex('#8a6e46')); disco(x, y - s + 1, s + 1, C.k); disco(x, y - s + 1, s, hex('#4e5a34')); disco(x - 1, y - s, s - 1, hex('#76844a')); disco(x - 2, y - s - 1, Math.max(1, s - 3), hex('#9aa458'));
    for (let k = 0; k < s * 2; k++) { const dx = Math.round((h(k, x, 96) - 0.5) * s * 1.6), dy = Math.round((h(k, y, 96) - 0.5) * s * 1.6); pset(x + dx, y - s + 1 + dy, dy < -1 && dx < 1 ? hex('#c8c47a') : hex('#3e4a2a')); } rect(x - 1, y, x + 1, y, hex('#6a4a2a')); }
  // la sombra larga del mástil sobre la grava
  for (let i = 0; i < 40; i++) pset(222 + i * 2, 119 + Math.round(i * 0.12), hex('#968a72'));
  viento(R, t, { y0: 130, y1: 176, fuerza: 0.7, color: hex('#f0dcb0'), grano: hex('#c8a870') });
  const c = o.coche ?? -1; if (c >= 0) cocheOscuro(R, Math.round(lerp(-40, 150, Math.min(1, c))), 150 - Math.round(Math.min(1, c) * 10), t, { dir: 1 });
  const ca = o.carta ?? 0; if (ca > 0) { const x = Math.round(lerp(150, 330, ca)), y = Math.round(lerp(96, 20, ca) + Math.sin(ca * 18) * 4); rect(x - 6, y - 4, x + 6, y + 4, C.k); rect(x - 5, y - 3, x + 5, y + 3, C.blanco); linea(x - 5, y - 3, x, y, C.k); linea(x + 5, y - 3, x, y, C.k); const al = Math.floor(t * 8) % 2; linea(x - 6, y - 4, x - 12, y - 8 + al * 6, C.blanco); linea(x + 6, y - 4, x + 12, y - 8 + al * 6, C.blanco); }
}
// el cine por fuera, al anochecer: cielo tramado de añil a rosa con la luna creciente, las primeras estrellas y un avión
// que cruza con sus luces; la ciudad al fondo en dos capas, con ventanas que se encienden y una antena con su luz roja;
// a los lados, los vecinos con sus pisos (ventanas con luz, una tele que parpadea, alguien que pasa) y sus escaparates
// encendidos bajo el toldo: la cafetería con su taza de neón y la tienda de discos con un gato en el toldo; la fachada del
// cine: el pretil escalonado, el letrero vertical con bombillas que corren, la marquesina (bombillas que corren, renglones
// en trazos, el alero que echa luz sobre la fachada), el friso dorado, el cartel enmarcado con la silueta del jersey negro,
// la gota y la cámara, las puertas de cristal con el vestíbulo detrás (la alfombra, el mostrador de palomitas, alguien
// que cruza), la taquilla con la taquillera y sus pilastras de neón; la acera mojada con charcos de luz, las farolas con su
// halo y sus polillas, la calzada con los reflejos que tiemblan y el vapor de una alcantarilla. Las puertas van en
// x 140–206 (la de la derecha, 177–205 × 75–131, la abre la escena); la cola de gente la pone la escena; los coches, por
// delante
export function cine(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  // el cielo del anochecer, las primeras estrellas, la luna y un avión
  i_degradado(R, 0, 0, 319, 64, I_ANOCHECER, null, 1.1);
  for (let k = 0; k < 16; k++) { const x = Math.round(176 + h(k, 1, 96) * 72), y = Math.round(3 + h(k, 2, 96) * 16), b = Math.sin(t * (1.3 + (k % 3) * 0.7) + k); if (b > -0.2) pset(x, y, b > 0.6 ? hex('#ece6fa') : hex('#7a7ab8')); }
  { const mx = 214, my = 10, fondo = R.pget(mx + 7, my - 5); R.halo(mx, my, 13, [hex('#262a62'), hex('#30346e')], 1.0); disco(mx, my, 5, hex('#f4ecd0')); disco(mx + 2, my - 1, 4, fondo); pset(mx - 3, my + 2, hex('#d8ccb0')); pset(mx - 4, my, hex('#d8ccb0')); }
  { const u = (t / 38 + 0.35) % 1, ax = Math.round(266 - u * 290), ay = Math.round(18 + u * 8); if (ax > -4) { pset(ax, ay, hex('#5a5a7a')); pset(ax + 1, ay, hex('#5a5a7a')); if (Math.sin(t * 8) > 0.6) pset(ax - 1, ay, C.blanco); pset(ax + 2, ay, Math.floor(t * 1.5) % 2 ? C.rojo : hex('#5a2030')); } }
  // la ciudad al fondo: la capa lejana, más clara, y la cercana, con ventanas que se encienden y se apagan
  for (let x = -6, k = 0; x < 320; k++) { const w = 12 + Math.floor(h(k, 1, 97) * 14); let top = 16 + Math.floor(h(k, 2, 97) * 16); if (x < 200 && x + w > 136) top = Math.max(top, 24); if (x + w > 268) top = Math.max(top, 48);
    rect(x, top, x + w - 1, 64, hex('#3e3664')); rect(x, top, x + w - 1, top, hex('#54467a'));
    if (x + w < 268) for (let wy = top + 3; wy < 34; wy += 4) for (let wx = x + 2; wx < x + w - 2; wx += 3) if (h(wx, wy + Math.floor(t / 6 + k * 0.3), 98) < 0.14) pset(wx, wy, hex('#c8a090'));
    x += w; }
  for (let x = -4, k = 0; x < 320; k++) { const w = 16 + Math.floor(h(k, 3, 97) * 18); let top = 26 + Math.floor(h(k, 4, 97) * 10); if (x + w > 268) top = Math.max(top, 48);
    rect(x, top, x + w - 1, 64, hex('#2a2444')); if (h(k, 5, 97) < 0.5) rect(x + 3, top - 3, x + 8, top - 1, hex('#2a2444'));
    if (x + w < 268) for (let wy = top + 3; wy < 36; wy += 4) for (let wx = x + 2; wx < x + w - 2; wx += 4) if (h(wx, wy + Math.floor(t / 5 + k), 99) < 0.22) pset(wx, wy, h(wx, wy, 100) < 0.5 ? hex('#f0c870') : hex('#a8c8e8'));
    x += w; }
  rect(194, 13, 194, 26, hex('#2a2444')); for (let y = 16; y < 26; y += 3) { pset(193, y, hex('#2a2444')); pset(195, y, hex('#2a2444')); } pset(194, 12, Math.floor(t * 1.2) % 2 ? hex('#ff4a4a') : hex('#5a2030'));
  // el vecino de la izquierda: ladrillo, cornisa, cuatro ventanas y, abajo, la cafetería con su toldo y su taza de neón
  rect(0, 24, 39, 132, hex('#4a2e34')); for (let y = 27; y < 76; y += 3) for (let x = ((y / 3) & 1) * 3; x < 40; x += 6) pset(x, y, hex('#3e262c')); rect(0, 24, 39, 26, hex('#6a4a4a')); rect(0, 27, 39, 27, C.k);
  for (const [wx, wy, k] of [[4, 31, 0], [18, 31, 1], [4, 47, 2], [18, 47, 3]]) { rect(wx, wy, wx + 9, wy + 11, C.k); rect(wx - 1, wy + 12, wx + 10, wy + 12, hex('#7a5a5a'));
    if (k === 0) { rect(wx + 1, wy + 1, wx + 8, wy + 10, hex('#f2c878')); rect(wx + 1, wy + 1, wx + 3, wy + 10, hex('#c84a4a')); rect(wx + 6, wy + 1, wx + 8, wy + 10, hex('#c84a4a')); }
    else if (k === 1) { rect(wx + 1, wy + 1, wx + 8, wy + 10, Math.sin(t * 7) > 0.3 ? hex('#6a8ad8') : hex('#4a5ab0')); rect(wx + 1, wy + 8, wx + 8, wy + 10, hex('#2a2a4a')); }
    else if (k === 2) { rect(wx + 1, wy + 1, wx + 8, wy + 10, hex('#f2d088')); const p = (t % 9) / 9; if (p < 0.4) { const px = wx + 1 + Math.round(p / 0.4 * 7); rect(px, wy + 4, px + 1, wy + 10, hex('#5a3a3a')); pset(px, wy + 3, hex('#5a3a3a')); } }
    else rect(wx + 1, wy + 1, wx + 8, wy + 10, hex('#232a50'));
    rect(wx + 4, wy + 1, wx + 5, wy + 10, C.k); }
  for (let x = 0; x < 40; x++) { rect(x, 64, x, 71, ((x >> 2) & 1) ? hex('#e8e0c8') : hex('#2a7a5a')); if ((x & 3) === 1) pset(x, 72, ((x >> 2) & 1) ? hex('#e8e0c8') : hex('#2a7a5a')); } rect(0, 63, 39, 63, C.k);
  rect(0, 75, 39, 132, C.k); rect(2, 77, 37, 125, hex('#f0c27a')); rect(2, 77, 37, 79, hex('#f8dca0'));
  rect(4, 108, 37, 112, hex('#7a3a2a')); rect(4, 108, 37, 108, hex('#a8583a')); for (const x of [8, 18, 28]) { rect(x, 112, x, 120, hex('#3a2a2a')); rect(x - 2, 112, x + 2, 113, hex('#c83a3a')); }
  rect(4, 96, 37, 96, hex('#7a5a3a')); for (let k = 0; k < 7; k++) { const x = 5 + k * 4 + (k > 3 ? 2 : 0), hh = 3 + (k * 5) % 4; rect(x, 96 - hh, x + 2, 95, [hex('#c84a3a'), hex('#e8c040'), hex('#6a9a4a'), hex('#8a5a3a'), hex('#d87a3a'), hex('#4a6aa8'), hex('#c8a060')][k]); pset(x, 96 - hh, hex('#fff4d8')); }
  rect(24, 77, 24, 83, hex('#5a3a2a')); poligono([[20, 87], [28, 87], [26, 83], [22, 83]], hex('#2a5a4a')); rect(22, 87, 26, 87, hex('#fff4c8'));
  { const sorbo = (t % 6) > 4.6; rect(27, 112, 33, 120, hex('#3a2a3a')); disco(30, 108, 3, hex('#2a1e24')); pset(29, 105, hex('#4a3a3a')); if (sorbo) { rect(25, 106, 27, 108, C.blanco); pset(24, 107, C.blanco); } }
  { const on = Math.sin(t * 2.1) > -0.5 || Math.floor(t * 9) % 3; if (on) { const c = hex('#ff7ab8'); rect(14, 82, 22, 82, c); rect(14, 82, 14, 88, c); rect(22, 82, 22, 88, c); rect(15, 89, 21, 89, c); rect(23, 84, 25, 84, c); rect(25, 84, 25, 86, c); rect(23, 86, 25, 86, c); for (let q = 0; q < 2; q++) pset(16 + q * 3, 80 - Math.round((t * 3 + q) % 2), c); } }
  linea(2, 77, 14, 125, hex('#f8e0b0')); linea(3, 77, 15, 125, hex('#f8e0b0')); rect(0, 126, 39, 132, hex('#2a1e24'));
  // el vecino de la derecha: el piso con la tele y la tienda de discos con su toldo y un gato encima
  rect(281, 46, 319, 132, hex('#3a3a52')); for (let y = 50; y < 76; y += 4) rect(281, y, 319, y, hex('#323248')); rect(281, 46, 319, 48, hex('#5a5a72')); rect(281, 49, 319, 49, C.k);
  rect(296, 51, 310, 61, C.k); rect(297, 52, 309, 60, Math.sin(t * 5 + 1) > 0 ? hex('#7a9ae0') : hex('#5a6ac0')); rect(303, 52, 303, 60, C.k); rect(295, 62, 311, 63, hex('#5a4a3a')); for (const x of [297, 301, 306]) { pset(x, 61, hex('#c83a5a')); pset(x + 1, 61, hex('#e8c040')); }
  for (let x = 281; x < 320; x++) { rect(x, 66, x, 73, ((x >> 2) & 1) ? hex('#f0e8e0') : hex('#b83a3a')); if ((x & 3) === 1) pset(x, 74, ((x >> 2) & 1) ? hex('#f0e8e0') : hex('#b83a3a')); } rect(281, 65, 319, 65, C.k);
  gato(R, 291, 65, t, { dir: 1 });
  rect(281, 77, 319, 132, C.k); rect(284, 79, 317, 125, hex('#e8b870')); rect(284, 79, 317, 81, hex('#f8d498'));
  for (let j = 0; j < 3; j++) { rect(284, 92 + j * 11, 317, 92 + j * 11, hex('#6a4a2a')); for (let i = 0; i < 8; i++) rect(286 + i * 4, 84 + j * 11, 288 + i * 4, 91 + j * 11, [hex('#c83a3a'), hex('#3a6ac8'), hex('#e8c040'), hex('#2a2a36'), hex('#5aa86a'), hex('#e87a3a')][(i * 3 + j * 2) % 6]); }
  disco(300, 116, 6, C.k); disco(300, 116, 5, hex('#2a2a32')); disco(300, 116, 1, hex('#c83a3a')); pset(Math.round(300 + Math.cos(t * 4) * 4), Math.round(116 + Math.sin(t * 4) * 4), hex('#6a6a7a'));
  linea(286, 79, 296, 125, hex('#f8e0b0')); rect(281, 126, 319, 132, hex('#24242e'));
  // la fachada del cine: el pretil escalonado y la pared roja con paneles y su zócalo de granito
  rect(40, 34, 280, 40, hex('#c8a070')); for (let x = 42; x < 280; x += 8) { poligono([[x, 34], [x + 6, 34], [x + 3, 30]], hex('#c8a070')); pset(x + 3, 31, hex('#f0d0a0')); } rect(40, 34, 280, 34, hex('#e8c890')); for (let x = 48; x < 280; x += 16) rect(x, 35, x, 40, hex('#a8845a'));
  rect(40, 62, 280, 132, hex('#7a2232')); for (let x = 48; x < 278; x += 12) rect(x, 76, x, 122, hex('#6a1c2a')); rect(40, 122, 280, 132, hex('#1e1a24')); rect(40, 122, 280, 122, hex('#5a5068')); for (let x = 44; x < 278; x += 22) rect(x, 124, x + 8, 124, hex('#3a3444'));
  // la luz del alero de la marquesina, que baña lo alto de la fachada
  rect(40, 63, 280, 66, hex('#a8404a')); for (let y = 67; y < 74; y++) for (let x = 40; x <= 280; x++) if ((74 - y) / 8 > i_b4(x, y) + 0.05) pset(x, y, hex('#923442'));
  // el friso dorado sobre las puertas
  rect(136, 64, 210, 73, C.k); rect(137, 65, 209, 72, hex('#5a1824')); for (let x = 138; x < 209; x += 4) { pset(x, 70, C.oro); pset(x + 1, 69, C.oro); pset(x + 2, 68, C.oroL); pset(x + 3, 69, C.oro); } for (let k = 0; k < 9; k++) linea(173, 72, 173 + Math.round(Math.cos(Math.PI + k * Math.PI / 8) * 8), 72 + Math.round(Math.sin(Math.PI + k * Math.PI / 8) * 6), C.oroS);
  // el letrero vertical, con símbolos que se encienden uno a uno y bombillas que corren por el borde
  rect(254, 34, 258, 40, hex('#4a4a5a')); rect(250, 6, 262, 36, C.k); rect(251, 7, 261, 35, hex('#5a1424'));
  for (let k = 0; k < 4; k++) { const on = Math.floor(t * 2.5) % 5 > k - 1, cy = 11 + k * 7, c = on ? hex('#fff0c0') : hex('#8a5a4a'); if (k % 2) { disco(256, cy, 2, c); pset(256, cy, hex('#5a1424')); } else { pset(256, cy - 2, c); rect(254, cy - 1, 258, cy - 1, c); rect(255, cy, 257, cy, c); pset(254, cy + 1, c); pset(258, cy + 1, c); } }
  for (let y = 7; y < 36; y += 2) { const on = ((y >> 1) + Math.floor(t * 8)) % 3 === 0; pset(250, y, on ? C.oroL : hex('#a88840')); pset(262, y, ((y >> 1) + Math.floor(t * 8) + 1) % 3 === 0 ? C.oroL : hex('#a88840')); }
  // la marquesina: bombillas que corren, los renglones en trazos y las bombillas del alero
  rect(30, 40, 290, 62, C.k); rect(32, 42, 288, 60, hex('#f0e0b0')); rect(32, 42, 288, 42, hex('#fff4d0')); rect(32, 59, 288, 60, hex('#d8c490'));
  for (let k = 0; k < 64; k++) { const fase = (k + Math.floor(t * 8)) % 4, x = 34 + (k % 32) * 8, y = k < 32 ? 44 : 58; disco(x, y, 1, fase === 0 ? C.oroL : fase === 1 ? C.oro : hex('#a88840')); if (fase === 0) { pset(x, y - 2, hex('#fff8e0')); pset(x, y + 2, hex('#fff8e0')); } }
  for (const y of [46, 50, 54]) for (const x of [32, 287]) { const on = (y / 4 + Math.floor(t * 8)) % 2; pset(x, y, on ? C.oroL : hex('#a88840')); }
  for (let k = 0; k < 3; k++) { const x0 = 70 + k * 70, parpadea = k === 1 && (t % 7) < 0.35 && Math.floor(t * 20) % 2; rect(x0, 47, x0 + 40, 54, hex('#1e1e28')); if (parpadea) continue;
    for (const [fy, n] of [[49, 0], [52, 1]]) { let x = x0 + 3; for (let w = 0; x < x0 + 37 && w < 6; w++) { const L = 3 + Math.floor(h(k, w + n * 9, 101) * 7); rect(x, fy, Math.min(x + L, x0 + 37), fy + 1, k === 1 ? hex('#ff6a6a') : hex('#f0e0b0')); x += L + 3; } } }
  for (let x = 38; x < 286; x += 12) { rect(x, 62, x + 1, 62, hex('#fff0c0')); for (let y = 63; y < 68; y++) if (i_b4(x + (y & 1), y) < 0.6 - (y - 63) * 0.1) pset(x + (y & 1), y, hex('#c86a5a')); }
  // el cartel enmarcado de la película: la silueta del jersey negro, la gota, la cámara, renglones y bombillas alrededor
  const cx = 82; rect(cx - 22, 70, cx + 22, 126, C.k); rect(cx - 21, 71, cx + 21, 125, hex('#c8a040')); rect(cx - 20, 72, cx + 20, 124, hex('#141822'));
  for (let j = 0; j < 20; j++) rect(cx - 20, 104 + j, cx + 20, 104 + j, i_mezcla(hex('#141822'), hex('#3a2a3a'), j / 20));
  disco(cx, 92, 9, hex('#d8b860')); disco(cx - 2, 90, 4, hex('#f0d888')); disco(cx, 90, 7, hex('#e8c8a0')); disco(cx, 91, 7, hex('#d8b860')); rect(cx - 6, 86, cx + 6, 96, hex('#e8c8a0')); rect(cx - 8, 84, cx + 8, 87, hex('#d8b860')); rect(cx - 8, 84, cx - 6, 100, hex('#d8b860')); rect(cx + 6, 84, cx + 8, 100, hex('#d8b860'));
  pset(cx - 3, 91, C.k); pset(cx + 3, 91, C.k); rect(cx - 1, 95, cx + 1, 95, hex('#b85a5a'));
  poligono([[cx - 16, 124], [cx - 12, 104], [cx + 12, 104], [cx + 16, 124]], hex('#2a2a36')); rect(cx - 4, 98, cx + 4, 106, hex('#2a2a36')); rect(cx - 4, 98, cx + 4, 99, hex('#3a3a48')); linea(cx - 11, 106, cx - 14, 123, hex('#3a3a4a'));
  disco(cx + 12, 78, 3, C.sangre); pset(cx + 11, 77, C.sangreL); pset(cx + 12, 74, C.sangre); R.icono('camara', cx - 18, 76, C.blanco, C.k, 1);
  rect(cx - 8, 75, cx + 6, 75, hex('#c8a040')); rect(cx - 6, 78, cx + 2, 78, hex('#8a7a6a')); rect(cx - 14, 120, cx + 14, 121, hex('#f0e0b0')); rect(cx - 10, 118, cx + 10, 118, hex('#8a7a6a'));
  for (let i = 0; i < 6; i++) pset(cx - 18 + i * 2, 108 - i * 3, hex('#4a4a5e'));
  for (let k = 0; k < 22; k++) { const per = k < 6 ? [cx - 20 + k * 8, 69] : k < 11 ? [cx + 23, 74 + (k - 6) * 12] : k < 17 ? [cx + 20 - (k - 11) * 8, 127] : [cx - 23, 122 - (k - 17) * 12]; pset(per[0], per[1], (k + Math.floor(t * 4)) % 3 === 0 ? C.oroL : C.oroS); }
  // las puertas de cristal con el vestíbulo detrás: lámpara, mostrador de palomitas, alfombra y alguien que cruza
  for (const x of [140, 176]) { rect(x, 74, x + 30, 132, C.k);
    for (let y = 75; y <= 132; y++) rect(x + 1, y, x + 29, y, y < 100 ? hex('#f8d890') : y < 118 ? hex('#f0c87a') : hex('#a83a3a'));
    rect(x + 1, 118, x + 29, 118, hex('#c84a4a')); for (let i = 0; i < 3; i++) disco(x + 8 + i * 7, 79, 1, C.oroL); rect(x + 6, 77, x + 24, 77, C.oroS);
    if (x === 140) { rect(x + 3, 104, x + 13, 117, hex('#c8343a')); rect(x + 3, 104, x + 13, 105, hex('#f0e0b0')); rect(x + 5, 96, x + 11, 103, hex('#f8f0d8')); for (let i = 0; i < 4; i++) pset(x + 6 + i, 98 + (Math.floor(t * 6 + i) % 4), hex('#fff4c8')); }
    { const p = ((t + (x === 176 ? 4 : 0)) % 9) / 9; if (p < 0.5) { const px = x + 2 + Math.round(p / 0.5 * 25); rect(px, 108, px + 2, 117, hex('#6a3a3a')); disco(px + 1, 106, 1, hex('#5a3a2a')); } }
    rect(x + 14, 75, x + 15, 132, C.k); rect(x + 4, 103, x + 12, 104, C.oro); rect(x + 18, 103, x + 26, 104, C.oro); disco(x + 10, 104, 1, C.oro); disco(x + 19, 104, 1, C.oro);
    for (const d of [2, 17]) { linea(x + d, 90, x + d + 9, 76, hex('#fff2d0')); linea(x + d + 1, 92, x + d + 11, 77, hex('#fbe6b8')); } }
  // la taquilla: arco, cristal con la taquillera, la rejilla, la ranura y el precio
  rect(226, 80, 266, 120, C.k); rect(227, 81, 265, 119, hex('#c8a040')); rect(228, 82, 264, 106, hex('#f8e8b0')); rect(228, 82, 264, 84, hex('#fff6d8'));
  rect(228, 82, 230, 84, hex('#c8a040')); rect(262, 82, 264, 84, hex('#c8a040')); pset(231, 82, hex('#c8a040')); pset(261, 82, hex('#c8a040'));
  rect(234, 86, 258, 86, hex('#d8c890')); for (let i = 0; i < 4; i++) rect(236 + i * 6, 87, 239 + i * 6, 89, [hex('#c83a3a'), hex('#3a6ac8'), hex('#e8c040'), hex('#5aa86a')][i]);
  { const mira = Math.sin(t * 0.6) > 0.7 ? -1 : 0; disco(246, 94, 4, hex('#e8c8a0')); rect(242, 89, 250, 92, hex('#5a3418')); pset(242, 93, hex('#5a3418')); pset(250, 93, hex('#5a3418')); if ((t % 3.1) > 0.12) { pset(244 + mira, 94, C.k); pset(248 + mira, 94, C.k); } rect(245, 97, 247, 97, hex('#b85a5a')); rect(242, 98, 250, 106, C.rojo); rect(245, 98, 247, 100, C.blanco); }
  disco(246, 101, 3, hex('#c8a040')); for (let j = -2; j <= 2; j += 2) for (let i = -2; i <= 2; i += 2) pset(246 + i, 101 + j, hex('#6a5a3a'));
  rect(232, 104, 260, 106, hex('#8a6a3a')); rect(234, 105, 244, 105, C.k); rect(226, 106, 266, 120, hex('#6a1a2a')); rect(228, 108, 264, 108, C.oro); R.numero('9', 246, 118, { color: C.oroL, centro: true, sombra: false }); R.icono('bolsa', 230, 110, C.oro, hex('#3a0a14'), 1);
  // las pilastras de neón rosa, que laten (una parpadea de vez en cuando)
  for (const [x, k] of [[42, 0], [132, 1], [214, 2], [274, 3]]) { const on = !(k === 2 && (t % 5.3) < 0.4 && Math.floor(t * 18) % 2), v = 0.5 + 0.5 * Math.sin(t * 2 + k); if (!on) { rect(x + 1, 64, x + 2, 121, hex('#6a2a4a')); continue; }
    for (let y = 64; y < 122; y++) for (const dx of [-1, 4]) if (i_b4(x + dx, y) < 0.35 + v * 0.25) pset(x + dx, y, hex('#b8406a')); rect(x, 64, x + 3, 121, hex('#e85a98')); rect(x + 1, 64, x + 2, 121, hex('#ffd0e8')); }
  // la acera mojada: losas, la luz de la marquesina, los charcos de luz de las puertas y la taquilla, el bordillo
  rect(0, 132, 319, 150, hex('#5e5870')); rect(30, 133, 290, 136, hex('#6e6074')); for (let x = 30; x <= 290; x++) for (let y = 137; y < 140; y++) if ((140 - y) / 4 > i_b4(x, y)) pset(x, y, hex('#6a5e72'));
  for (const [x0, x1] of [[141, 169], [177, 205], [228, 264]]) { poligono([[x0, 133], [x1 + 1, 133], [x1 + 8, 145], [x0 - 7, 145]], hex('#7e6a74')); poligono([[x0 + 3, 133], [x1 - 2, 133], [x1 + 2, 140], [x0 - 1, 140]], hex('#94787a')); }
  for (let x = 0; x < 320; x += 20) rect(x, 132, x, 147, hex('#4e4860')); rect(0, 140, 319, 140, hex('#544e66'));
  for (let k = 0; k < 6; k++) { const x = Math.round(h(k, 1, 102) * 300) + 10, y = 136 + Math.round(h(k, 2, 102) * 9); if (Math.sin(t * 3 + k * 2) > 0.3) pset(x, y, hex('#f8e0b0')); }
  rect(0, 147, 319, 147, hex('#8a8498')); rect(0, 148, 319, 150, hex('#7a7488')); rect(0, 150, 319, 151, hex('#1e1c28'));
  // la calzada mojada, con los reflejos que tiemblan, la raya, la tapa de la alcantarilla y su vapor
  rect(0, 152, 319, 179, hex('#2a2838')); for (let k = 0; k < 60; k++) pset(Math.round(h(k, 1, 103) * 320), 152 + Math.round(h(k, 2, 103) * 27), hex('#34324a'));
  for (const [x, w, c, s] of [[8, 2, '#f8d890', 0.7], [312, 2, '#f8d890', 0.7], [20, 5, '#d8a870', 0.45], [300, 5, '#d0a068', 0.45], [44, 1, '#e86aa8', 0.6], [134, 1, '#e86aa8', 0.6], [216, 1, '#e86aa8', 0.6], [276, 1, '#e86aa8', 0.6], [155, 5, '#e8c080', 0.5], [191, 5, '#e8c080', 0.5], [246, 6, '#e8d098', 0.4], [100, 7, '#c8a070', 0.3], [228, 7, '#c8a070', 0.3]]) {
    const col = hex(c); for (let y = 153; y < 179; y += 2) { const f = 1 - (y - 153) / 30; if (h(x, y, Math.floor(t * 4 + x * 0.1)) > s * f + 0.12) continue; const ond = Math.round(Math.sin(y * 0.8 + t * 3 + x) * (0.5 + (y - 153) / 14)), L = Math.max(1, Math.round(w * (0.4 + f * 0.6))); rect(x - L + ond, y, x + L + ond, y, y < 160 ? col : i_mezcla(col, hex('#2a2838'), 0.35)); } }
  for (let x = 0; x < 320; x += 32) rect(x, 165, x + 16, 166, hex('#a89a50'));
  for (let j = -2; j <= 2; j++) for (let i = -9; i <= 9; i++) if ((i / 9) ** 2 + (j / 2.5) ** 2 < 1) pset(250 + i, 171 + j, (i + j) & 1 ? hex('#3a3848') : hex('#4a4858')); i_vapor(R, 250, 168, t, 0.4, hex('#8a86a0'), 24); i_vapor(R, 246, 169, t, 2.1, hex('#6e6a86'), 18);
  // las farolas en los extremos de la acera, con su halo, el charco de luz a sus pies y las polillas
  for (const x of [8, 312]) { R.halo(x, 60, 11, [hex('#4a3e62'), hex('#7a5e6a'), hex('#b88a76')], 1.6);
    for (let j = -2; j <= 2; j++) for (let i = -12; i <= 12; i++) if ((i / 12) ** 2 + (j / 2.5) ** 2 < 1) pset(x + i, 145 + j, (i / 12) ** 2 + (j / 2.5) ** 2 < 0.45 ? hex('#8a7a7e') : hex('#726678'));
    rect(x, 64, x + 1, 147, hex('#2a2a36')); rect(x + 1, 64, x + 1, 147, hex('#4a4a5e')); rect(x - 2, 141, x + 3, 147, hex('#2a2a36')); rect(x - 3, 146, x + 4, 147, hex('#3a3a4a')); rect(x - 3, 54, x + 4, 55, hex('#2a2a36')); rect(x - 2, 56, x + 3, 63, hex('#fff2c0')); rect(x - 2, 56, x - 2, 63, hex('#f8d890')); rect(x - 3, 64, x + 4, 64, hex('#2a2a36')); pset(x, 53, hex('#2a2a36')); pset(x + 1, 53, hex('#2a2a36'));
    for (let k = 0; k < 3; k++) { const a = t * (3 + k) + k * 2, px = Math.round(x + Math.cos(a) * (5 + k * 2)), py = Math.round(59 + Math.sin(a * 1.3) * 4); pset(px, py, hex('#e8dcc8')); } }
}
// la sala del cine por dentro, a oscuras: la bambalina de terciopelo con su fleco dorado, el telón rojo recogido a los
// lados que se mece un poco, las paredes acolchadas con los apliques art déco de luz tenue y la señal verde de salida, el
// escenario bajo la pantalla; en la pantalla, la película (planos de seis segundos con un corte entre ellos: el pasillo de
// una oficina, la escalinata del tribunal y una calle con palmeras al atardecer; en todos ella camina y el cámara la
// sigue, por detrás o de cara, y el fondo se desplaza con la cámara), con las esquinas en penumbra; el haz del proyector
// con motas que bailan y, de espaldas, el público en tres filas: peinados distintos, el filo de luz de la pantalla en lo
// alto de las cabezas, los respaldos rojos de las butacas, una pareja que se arrima, alguien que se ríe y un móvil que
// se enciende un momento (y el de al lado se vuelve)
export function salaCine(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  rect(0, 0, 319, 179, hex('#120e16'));
  // las paredes acolchadas, los apliques y la señal de salida
  for (let x = 0; x < 320; x++) { if (x > 31 && x < 289) continue; for (let y = 10; y < 124; y++) if ((x % 6) === 0) pset(x, y, hex('#1e1420')); else if ((x % 6) === 3 && (y % 12) === 6) pset(x, y, hex('#2a1a28')); }
  for (const [x, y] of [[8, 58], [312, 66]]) { R.halo(x, y - 3, 10, [hex('#2a1a22'), hex('#3e2828'), hex('#5a3a30')], 1.1); poligono([[x - 4, y - 6], [x + 4, y - 6], [x + 2, y], [x - 2, y]], C.oroS); rect(x - 3, y - 7, x + 3, y - 6, hex('#ffe0a0')); rect(x - 1, y, x + 1, y + 3, C.oroS); }
  rect(1, 18, 16, 28, C.k); rect(2, 19, 15, 27, hex('#1e8a4a')); R.icono('persona', 3, 20, hex('#d8ffd8'), hex('#0e5a2a'), 1); R.icono('flecha', 8, 21, hex('#d8ffd8'), hex('#0e5a2a'), 1); for (let x = 0; x < 18; x++) if (i_b4(x, 29) < 0.5) pset(x, 29, hex('#16402a'));
  // la pantalla: el marco negro y la película, recortada a su sitio
  rect(30, 14, 290, 112, C.k);
  const plano = Math.floor(t / 6) % 3, u = (t % 6) / 6, pan = Math.round(u * 26), fx = Math.round(66 + u * 112);
  const rr = (a, b, c, d, col) => rect(Math.max(32, a), Math.max(16, b), Math.min(288, c), Math.min(110, d), col);
  R.recorte([32, 16, 288, 110]);
  if (plano === 0) {   // el pasillo de una oficina: plafones, puertas con su ventanuco, el zócalo y el suelo brillante
    rr(32, 16, 288, 110, hex('#c4c8d4')); rr(32, 16, 288, 24, hex('#a4a8b6')); rr(32, 92, 288, 96, hex('#8a8e9c'));
    for (let k = 0; k < 8; k++) { const x = 20 + k * 44 - pan; rr(x, 19, x + 18, 21, hex('#f4f6fa')); rr(x + 4, 30, x + 24, 92, hex('#7a6248')); rr(x + 6, 32, x + 22, 92, hex('#9a7a58')); rr(x + 10, 38, x + 18, 50, hex('#d8e4ec')); rr(x + 19, 64, x + 21, 66, C.oroS); rr(x + 30, 50, x + 38, 60, hex('#b0b4c2')); }
    rr(32, 96, 288, 110, hex('#9ea4b4')); for (let k = 0; k < 8; k++) { const x = 26 + k * 44 - pan; rr(x, 100, x + 12, 101, hex('#c4cad8')); }
  } else if (plano === 1) {   // la escalinata del tribunal: cielo, el frontón, las columnas y los escalones
    for (let y = 16; y < 56; y++) rr(32, y, 288, y, i_mezcla(hex('#8ab0d8'), hex('#d8e4ec'), (y - 16) / 40));
    rr(32, 22, 288, 30, hex('#d4cec0')); poligono([[60 - pan, 22], [280 - pan, 22], [170 - pan, 14]], hex('#e0dace')); rr(32, 30, 288, 32, hex('#b8b2a4'));
    for (let k = 0; k < 10; k++) { const x = 30 + k * 28 - pan; rr(x, 32, x + 10, 86, hex('#e8e2d4')); rr(x + 7, 32, x + 10, 86, hex('#c4bcac')); rr(x - 1, 32, x + 11, 34, hex('#d0c8b8')); for (let j = 36; j < 86; j += 3) rr(x + 3, j, x + 3, j + 1, hex('#d0c8b8')); rr(x + 12, 34, x + 26, 86, hex('#6a6458')); }
    for (let j = 0; j < 6; j++) { rr(32, 86 + j * 4, 288, 87 + j * 4, hex('#d8d2c4')); rr(32, 88 + j * 4, 288, 89 + j * 4, hex('#b4ae9e')); }
  } else {   // una calle con palmeras al atardecer
    for (let y = 16; y < 80; y++) rr(32, y, 288, y, i_mezcla(hex('#e8a888'), hex('#f8dcb0'), (y - 16) / 64));
    disco(240 - pan, 60, 9, hex('#fff0c8'));
    for (let k = 0; k < 6; k++) { const x = 30 + k * 52 - pan; rr(x, 64, x + 36, 96, hex('#e0c8b0')); rr(x, 62, x + 36, 64, hex('#b86a50')); rr(x + 6, 72, x + 14, 82, hex('#8a9ab0')); rr(x + 22, 76, x + 30, 96, hex('#9a7a5a')); }
    for (let k = 0; k < 5; k++) { const x = 52 + k * 64 - pan; for (let y = 34; y < 96; y++) pset(x + Math.round(Math.sin(y * 0.05) * 2), y, hex('#6a5040')); for (let a = 0; a < 7; a++) { const g = a / 6 * Math.PI + Math.sin(t * 1.5 + k) * 0.08; linea(x + 1, 34, x + 1 + Math.round(Math.cos(Math.PI + g) * 12), 34 + Math.round(Math.abs(Math.sin(g)) * -4 + 6), hex('#4a6a3a')); } }
    rr(32, 96, 288, 110, hex('#c0b0a8')); rr(32, 96, 288, 97, hex('#e0d4cc'));
  }
  // en la película: ella camina; el cámara la sigue por detrás (o va delante, de cara a ella, en el plano 1)
  R.actor(ELENCO_CHIBI.holmes, fx, 100, t, { dir: 1, anda: true });
  const camX = plano === 1 ? fx + 34 : fx - 30, camD = plano === 1 ? -1 : 1;
  R.actor(ELENCO_CHIBI.sudadera, camX, 100, t + 0.4, { dir: camD, anda: true });
  { const bx = camD > 0 ? camX + 8 : camX - 5; rect(bx, 76, bx + 12, 84, C.k); rect(bx + 1, 77, bx + 11, 83, hex('#3a3e48')); rect(camD > 0 ? bx + 12 : bx - 4, 78, camD > 0 ? bx + 16 : bx, 82, C.k); disco(bx + (camD > 0 ? 3 : 9), 76, 1, Math.floor(t * 2) % 2 ? C.rojo : C.rojoS); }
  R.recorte(null);
  // las esquinas de la pantalla, en penumbra
  for (let y = 16; y <= 110; y++) for (let x = 32; x <= 288; x++) { const e = ((x - 160) / 128) ** 2 + ((y - 63) / 47) ** 2; if (e > 1.22 && i_b4(x, y) < (e - 1.22) * 1.3) pset(x, y, i_mezcla(R.pget(x, y), C.k, 0.35)); }
  const LUZ = [hex('#c8ccd8'), hex('#c8d8ec'), hex('#ecc8b0')][plano];
  // la bambalina y el telón recogido a los lados, con sus pliegues
  for (let x = 0; x < 320; x++) { const pl = Math.sin(x * 0.5) > 0; for (let y = 0; y <= 8; y++) { const luz = Math.abs(x - 160) < 24 + y * 5; pset(x, y, pl ? (luz ? hex('#8a2a34') : hex('#6a1a24')) : (luz ? hex('#62202a') : hex('#4e121a'))); } pset(x, 9, (x & 1) ? C.oroS : C.oro); if ((x % 3) === 0) pset(x, 10, C.oroS); }
  for (const [x0, d] of [[24, 1], [296, -1]]) for (let y = 11; y < 120; y++) { const ancho = 14 - Math.round(Math.max(0, 60 - Math.abs(y - 62)) / 10), m = y < 46 ? 0 : Math.round(Math.sin(t * 0.6 + y * 0.04) * 0.8);
    for (let i = 0; i <= ancho; i++) { const x = x0 + d * (i - ancho / 2) + m, f = Math.sin((i + y * 0.02) * 1.3); pset(Math.round(x), y, f > 0.4 ? hex('#8a2230') : f > -0.3 ? hex('#6a1a26') : hex('#4a1018')); } }
  for (const x of [24, 296]) { rect(x - 4, 60, x + 4, 62, C.oro); disco(x + (x < 160 ? 5 : -5), 64, 2, C.oroS); }
  // el escenario bajo la pantalla y las lucecitas del pasillo
  rect(30, 113, 290, 122, hex('#24161c')); rect(30, 113, 290, 113, hex('#4a2e30')); for (let x = 36; x < 288; x += 20) rect(x, 116, x + 12, 116, hex('#2e1c22'));
  rect(0, 122, 319, 179, hex('#160e14'));
  // las motas que bailan en el haz del proyector, que llega desde detrás de nosotros
  for (let k = 0; k < 14; k++) { const x = Math.round(180 + h(k, 1, 64) * 50 + Math.sin(t * 0.7 + k) * 5), y = Math.round(1 + ((h(k, 2, 64) * 40 + t * (2 + k % 3)) % 40)); if (Math.sin(t * 1.7 + k * 3) > -0.2) pset(x, y, hex('#f4ecd0')); }
  // el público de espaldas, en tres filas: cabezas, filo de luz, respaldos de las butacas y algún gesto
  const PELOS = [['#2a2430', '#1a1420'], ['#5a3a20', '#3a2414'], ['#8a5a2a', '#5a3a1a'], ['#c8a060', '#8a6a3a'], ['#1e1a24', '#100c14'], ['#8a8a98', '#5e5e6c']].map(([a, b]) => [hex(a), hex(b)]);
  const PIELES = [hex('#e8c09a'), hex('#c8885a'), hex('#8a5a3a'), hex('#f0c8a0')];
  const movil = (t % 11) < 1.6, gira = (t % 11) > 0.6 && (t % 11) < 1.8;
  for (let fila = 0; fila < 3; fila++) for (let k = 0; k < 12; k++) {
    let x = 6 + k * 27 + (fila % 2) * 12; const y = 130 + fila * 18 - (fila === 2 && k === 7 && (t % 7) < 2.2 && Math.sin(t * 11) > 0 ? 1 : 0), tipo = (k * 7 + fila * 3) % 6, pelo = PELOS[(k * 5 + fila) % 6], piel = PIELES[(k + fila * 2) % 4];
    if (fila === 1 && k === 4) x += 2; if (fila === 1 && k === 5) x -= 2;   // la pareja que se arrima
    if (fila === 0 && k === 8 && gira) x += 1;
    rect(x - 10, y + 5, x + 10, y + 18, hex('#1a141e'));
    i_cabeza(R, x, y, tipo, pelo, piel, i_mezcla(pelo[0], LUZ, 0.7));
    if (fila === 0 && k === 8 && gira) { pset(x - 8, y + 1, piel); pset(x - 7, y + 2, piel); }
    if (fila === 0 && k === 9 && movil) { for (let r = 6; r > 0; r -= 2) for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r && i_b4(x + i, y + 8 + j) < 0.4 - r * 0.05) pset(x + i, y + 8 + j, hex('#6a8ad0')); rect(x - 2, y + 6, x + 2, y + 9, hex('#c8e0ff')); for (let i = -4; i <= 4; i++) pset(x + i, y + 7 - Math.round(Math.sqrt(Math.max(0, 16 - i * i))), hex('#8aa8e8')); }
    // el respaldo de la butaca, por delante de la espalda
    rect(x - 11, y + 8, x + 11, y + 18, C.k); rect(x - 10, y + 9, x + 10, y + 18, hex('#5a1622')); rect(x - 10, y + 9, x + 10, y + 9, i_mezcla(hex('#8a2a36'), LUZ, 0.25)); rect(x - 1, y + 11, x, y + 18, hex('#460e18'));
  }
  rect(0, 172, 319, 179, hex('#2a0a14')); for (let x = 8; x < 320; x += 40) { pset(x, 175, hex('#e8a040')); pset(x + 1, 175, hex('#a86a2a')); }
}
// la charla de Erika hoy: la sala a oscuras, el fondo del escenario en paneles de listones con manchas de luz de colores
// que van y vienen, los focos colgados de sus cables con el haz tramado que barre el escenario y deja su charco de luz, las
// pancartas verticales con chevrones que se mecen, la gran pantalla con el resplandor alrededor (la balanza, con su
// renglón y el número de la diapositiva; con o.visto, «?» → «✓»), los altavoces, las plantas, el escenario de tablas con
// la alfombra roja redonda y la tira de luz del borde que corre, el atril con el portátil encendido, el micrófono y el
// vaso, la cámara que graba con su piloto rojo y, en primer plano, el público de espaldas (peinados distintos, el filo de
// luz del escenario en las cabezas, hombros de colores, respaldos) con alguien que mira el móvil. Las cabezas siguen la
// fórmula x = 4 + k·25 + (fila % 2)·12, y = 134 + fila·16 (la escena levanta manos, aplaude y hace fotos encima)
export function charla(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  // el fondo: paneles de listones y manchas de luz de colores que se mueven despacio
  rect(0, 0, 319, 99, hex('#141828')); for (let x = 2; x < 320; x += 5) rect(x, 12, x, 99, hex('#1a1f32')); for (const y of [40, 70]) rect(0, y, 319, y, hex('#0e1120'));
  R.halo(Math.round(90 + Math.sin(t * 0.3) * 50), 60, 46, [hex('#18283a'), hex('#1c3242'), hex('#223a4a')], 1.9);
  R.halo(Math.round(230 + Math.sin(t * 0.23 + 2) * 50), 58, 44, [hex('#22203c'), hex('#2a2648'), hex('#322c54')], 1.9);
  // los focos colgados y su haz tramado, que barre el escenario y deja un charco de luz
  const FOCOS = [8, 40, 200, 256];
  FOCOS.forEach((lx, k) => { const bx = lx + Math.round(Math.sin(t * 0.4 + k * 1.7) * 16);
    for (let y = 22; y < 100; y++) { const f = (y - 22) / 78, cx = lerp(lx, bx, f), w = 2 + f * 16; for (let x = Math.round(cx - w); x <= cx + w; x++) if (i_b4(x, y) < 0.13 + 0.06 * (1 - f)) pset(x, y, k % 2 ? hex('#2c3a52') : hex('#3a3a50')); }
  });
  // las pancartas verticales con chevrones, que se mecen un poco
  for (const [x0, k] of [[44, 0], [254, 1]]) { rect(x0 - 1, 24, x0 + 19, 25, hex('#5a5e70'));
    for (let y = 26; y < 96; y++) { const m = Math.round(Math.sin(t * 0.8 + k + y * 0.05) * (y - 26) / 70); rect(x0 + m, y, x0 + 18 + m, y, hex('#1e3a48')); pset(x0 + m, y, hex('#2e5a68')); const v = (y - 30) % 14; if (y > 30 && y < 90) { const a = Math.abs(v - 7); if (a < 6) { pset(x0 + 9 + m - (6 - a), y, hex('#e8f4f4')); pset(x0 + 9 + m + (6 - a), y, hex('#e8f4f4')); } } }
    poligono([[x0, 96], [x0 + 18, 96], [x0 + 9, 101]], hex('#1e3a48')); }
  // los altavoces apilados a los lados, con los conos que laten
  for (const x0 of [2, 298]) { rect(x0, 56, x0 + 18, 100, C.k); rect(x0 + 1, 57, x0 + 17, 99, hex('#22242e')); rect(x0 + 1, 77, x0 + 17, 78, C.k);
    for (const cy of [66, 88]) { const p = Math.sin(t * 9 + cy) > 0.6 ? 1 : 0; disco(x0 + 9, cy, 6, hex('#2e303c')); disco(x0 + 9, cy, 4 + p, hex('#3a3c4a')); disco(x0 + 9, cy, 2, hex('#1a1c24')); pset(x0 + 7, cy - 4, hex('#5a5c6a')); } }
  // la gran pantalla, con su resplandor alrededor
  for (let y = 8; y <= 100; y++) for (let x = 72; x <= 248; x++) { if (x >= 80 && x <= 240 && y >= 16 && y <= 92) continue; const d = Math.max(80 - x, x - 240, 16 - y, y - 92, 0); if (d <= 2) pset(x, y, hex('#283048')); else if ((1 - d / 7) * 0.5 > i_b4(x, y)) pset(x, y, hex('#222a40')); }
  rect(80, 16, 240, 92, C.k); rect(82, 18, 238, 90, hex('#f4f6f8'));
  rect(90, 23, 140, 25, hex('#9aa4b4')); rect(90, 28, 122, 29, hex('#c4ccd8')); rect(90, 83, 230, 83, C.tealT); for (let k = 0; k < 5; k++) disco(98 + k * 6, 87, 1, k === 2 ? C.tealT : hex('#c4ccd8')); R.numero('7', 228, 30, { color: hex('#9aa4b4'), sombra: false });
  if (o.visto) { R.icono('?', 120, 36, C.k, hex('#f4f6f8'), 4); linea(150, 54, 170, 54, C.k); poligono([[170, 50], [176, 54], [170, 58]], C.k); visto(R, 186, 40, 3); } else R.icono('balanza', 146, 36, hex('#3a5a8a'), C.k, 4);
  // los focos, colgados por delante de la pantalla
  FOCOS.forEach((lx, k) => { rect(lx, 0, lx, 14, hex('#2a2e3e')); rect(lx - 3, 14, lx + 3, 20, C.k); rect(lx - 2, 15, lx + 2, 19, hex('#3a3e4e')); rect(lx - 2, 15, lx - 2, 19, hex('#5a5e70')); rect(lx - 2, 20, lx + 2, 20, k % 2 ? hex('#c8f0ff') : C.oroL); pset(lx, 21, C.blanco); });
  // las plantas en sus macetas a los lados del escenario
  for (const x of [72, 286]) { rect(x - 5, 92, x + 5, 100, C.k); rect(x - 4, 93, x + 4, 100, hex('#c8c0b0')); rect(x - 4, 93, x + 4, 93, hex('#e8e0d0'));
    for (let a = 0; a < 7; a++) { const g = -Math.PI / 2 + (a - 3) * 0.4 + Math.sin(t * 0.9 + a) * 0.04, L = 10 + (a % 3) * 3; linea(x, 92, x + Math.round(Math.cos(g) * L), 92 + Math.round(Math.sin(g) * L), a % 2 ? hex('#3a7a4a') : hex('#5aa86a')); } }
  // el escenario de tablas, la alfombra roja redonda y la tira de luz del borde
  rect(0, 100, 319, 112, hex('#5a3a2a')); rect(0, 100, 319, 100, hex('#8a6040')); for (const y of [103, 106]) rect(0, y, 319, y, hex('#4e3224')); for (let k = 0; k < 24; k++) { const y = [101, 104, 107][k % 3], x = (k * 41) % 320; rect(x, y, x, y + 1, hex('#4e3224')); }
  FOCOS.forEach((lx, k) => { const bx = lx + Math.round(Math.sin(t * 0.4 + k * 1.7) * 16); for (let j = -2; j <= 2; j++) for (let i = -14; i <= 14; i++) { const e = (i / 14) ** 2 + (j / 2.5) ** 2; if (e < 0.55 || (e < 1 && i_b4(bx + i, 104 + j) < 0.5)) pset(bx + i, 104 + j, e < 0.55 ? hex('#8a6444') : hex('#74503a')); } });
  for (let j = -4; j <= 4; j++) for (let i = -34; i <= 34; i++) { const e = (i / 34) ** 2 + (j / 4.5) ** 2; if (e < 1) pset(157 + i, 104 + j, e > 0.8 ? hex('#7a1a28') : j < -2 ? hex('#c8404e') : hex('#a8283a')); }
  rect(0, 108, 319, 112, hex('#2e1e16')); for (let x = 1; x < 320; x += 4) pset(x, 110, ((x >> 2) + Math.floor(t * 6)) % 8 === 0 ? hex('#c8fff4') : C.tealT);
  // el atril: madera, el emblema, el portátil abierto con su luz, el micrófono y el vaso de agua
  rect(220, 82, 236, 104, C.k); rect(221, 83, 235, 104, hex('#4a3428')); rect(221, 83, 221, 104, hex('#7a5a40')); rect(221, 100, 235, 104, hex('#3a2820')); disco(228, 91, 3, C.tealT); disco(228, 91, 1, hex('#e8f4f4'));
  poligono([[217, 82], [239, 82], [237, 78], [219, 78]], C.k); poligono([[218, 81], [238, 81], [236, 79], [220, 79]], hex('#6a4a34'));
  rect(223, 72, 233, 78, C.k); rect(224, 73, 232, 77, hex('#b8bcc8')); disco(228, 75, 1, Math.sin(t * 2) > 0 ? C.blanco : hex('#d8dce8')); for (let x = 222; x < 235; x++) if (i_b4(x, 71) < 0.4) pset(x, 71, hex('#3a4a6a'));
  linea(236, 79, 238, 74, C.k); linea(238, 74, 236, 70, C.k); rect(234, 68, 237, 70, C.k); pset(235, 69, hex('#6a6a7a'));
  rect(217, 74, 219, 78, C.k); rect(218, 75, 218, 77, hex('#c8e8f8'));
  rect(0, 112, 319, 121, hex('#0e1120')); rect(0, 112, 319, 113, hex('#0c0e18')); for (let y = 114; y < 126; y++) if (y % 3 === 0) rect(0, y, 319, y, hex('#10131e'));
  rect(0, 122, 319, 179, hex('#0e1120'));
  // la cámara que graba desde el lado, con su piloto
  linea(12, 122, 8, 132, hex('#3a3a4a')); linea(12, 122, 16, 132, hex('#3a3a4a')); rect(5, 114, 19, 121, C.k); rect(6, 115, 18, 120, hex('#3a3e48')); rect(19, 115, 23, 119, C.k); pset(22, 117, hex('#5a8ac8')); pset(7, 113, Math.floor(t * 2) % 2 ? C.rojo : C.rojoS);
  // el público de espaldas: hombros de colores, la cabeza con el filo de luz y el respaldo; uno mira el móvil
  const PELOS = [['#3a2a20', '#241810'], ['#6a4a2a', '#4a321a'], ['#1e1a24', '#100c14'], ['#c8a060', '#8a6a3a'], ['#8a5a2a', '#5a3a1a'], ['#9a9aa8', '#6a6a78']].map(([a, b]) => [hex(a), hex(b)]);
  const ROPA = ['#3a5a8a', '#8a3a3a', '#4a6a4a', '#6a4a7a', '#c8a050', '#5a5a6a'].map(hex), PIELES = [hex('#e8c09a'), hex('#c8885a'), hex('#8a5a3a'), hex('#f0c8a0')];
  const movil = (t % 9) > 3 && (t % 9) < 6;
  for (let fila = 0; fila < 3; fila++) for (let k = 0; k < 13; k++) { const x = 4 + k * 25 + (fila % 2) * 12, y = 134 + fila * 16, ropa = ROPA[(k + fila * 2) % 6], pelo = PELOS[(k * 3 + fila) % 6];
    rect(x - 11, y + 5, x + 11, y + 18, C.k); rect(x - 10, y + 6, x + 10, y + 18, ropa); rect(x - 10, y + 6, x + 10, y + 6, i_mezcla(ropa, C.blanco, 0.3)); rect(x - 10, y + 12, x + 10, y + 18, i_mezcla(ropa, C.k, 0.25)); rect(x - 1, y + 7, x, y + 12, i_mezcla(ropa, C.k, 0.3));
    i_cabeza(R, x, y, (k * 5 + fila * 2) % 6, pelo, PIELES[(k + fila) % 4], i_mezcla(pelo[0], hex('#f8dca8'), 0.65));
    rect(x - 12, y + 14, x + 12, y + 18, hex('#232838')); rect(x - 12, y + 14, x + 12, y + 14, hex('#3a4256'));
    if (fila === 0 && k === 10 && movil) { rect(x + 4, y + 10, x + 7, y + 13, hex('#c8e0ff')); for (let i = -6; i <= 6; i++) for (let j = -3; j <= 3; j++) if (i_b4(x + 5 + i, y + 11 + j) < 0.25 - Math.abs(i) * 0.03) pset(x + 5 + i, y + 11 + j, hex('#6a8ad0')); pset(x + 3, y - 1, hex('#a8c0f0')); pset(x + 4, y, hex('#a8c0f0')); }
  }
}
// el laboratorio de hoy, luminoso y lleno de cosas: paneles blancos con juntas y el techo con su moldura; a la izquierda,
// la ventana al campus (x 10–90, y 16–76: nubes que pasan, colinas, un edificio de cristal y otro de arenisca, árboles
// que se mecen y un ciclista); la gran pantalla de la pared (rejilla, barras que suben y bajan, una curva que se dibuja,
// tres casillas con «✓» y la barra de progreso), el reloj con su segundero, la mampara de cristal al laboratorio vecino
// (un técnico que va y viene y el robot de pipetas), y, por debajo de Atom, el armario de reactivos y el analizador
// compacto con su pantalla; la regleta de enchufes y llaves de gas; en el banco (el borde, en y = 108), el microscopio con
// su luz, el carrusel de pipetas, la caja de puntas, el chip de cristal (x 120–200) con sus canales, pocillos de colores y
// gotitas que corren, y la gradilla de tubos; debajo, los armarios con cajones, el hueco del taburete con la papelera, el
// zócalo y el suelo de vinilo con reflejos. Sin opciones
export function labHoy(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R;
  const pared = hex('#eef3f5'), paredS = hex('#dde5e9'), paredL = hex('#f8fbfc');
  rect(0, 0, 319, 179, pared);
  for (let k = 0; k < 140; k++) pset(Math.round(h(k, 1, 161) * 320), 5 + Math.round(h(k, 2, 161) * 86), hex('#e6edf0'));   // el grano del panel
  rect(0, 0, 319, 2, hex('#dbe3e8')); rect(0, 3, 319, 3, hex('#c4ced4'));   // el techo
  for (const x of [5, 104, 213, 275]) { rect(x, 4, x, 91, paredS); rect(x + 1, 4, x + 1, 91, paredL); }   // las juntas de los paneles
  // la regleta de la pared: enchufes y llaves de gas de colores; y el frente de azulejo claro sobre el banco
  rect(0, 92, 319, 96, hex('#d6dee2')); rect(0, 92, 319, 92, hex('#b8c4cc')); rect(0, 96, 319, 96, hex('#c4ced4')); rect(0, 97, 319, 107, hex('#e8eef1'));
  for (let x = 8; x < 320; x += 12) rect(x, 97, x, 107, hex('#dfe6ea'));
  for (const x of [10, 96, 204, 262, 306]) { rect(x, 93, x + 5, 95, hex('#f6f8fa')); pset(x + 2, 94, C.k); pset(x + 4, 94, C.k); }
  for (const [x, c] of [[46, C.amarilloT], [86, hex('#4a7ac8')], [254, C.verdeT]]) { rect(x, 93, x + 2, 95, C.metalD); rect(x - 2, 92, x + 4, 92, c); }
  // la ventana al campus, con su alféizar
  c_ventanaCampus(R, t, 10, 16, 90, 76); rect(7, 77, 93, 78, paredL); rect(7, 79, 93, 79, hex('#c8d2d8'));
  // el reloj de pared, con el segundero
  { const cx = 100, cy = 32; disco(cx, cy, 8, C.k); disco(cx, cy, 7, C.blanco); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(cx + Math.cos(a) * 5.5), Math.round(cy + Math.sin(a) * 5.5), k % 3 ? C.metalS : C.k); }
    const sg = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2, mn = (22 + t / 60) / 60 * Math.PI * 2 - Math.PI / 2;
    linea(cx, cy, Math.round(cx + Math.cos(mn) * 5), Math.round(cy + Math.sin(mn) * 5), C.k); linea(cx, cy, cx + 3, cy - 2, C.k); linea(cx, cy, Math.round(cx + Math.cos(sg) * 6), Math.round(cy + Math.sin(sg) * 6), C.rojo); }
  // la gran pantalla: cabecera, rejilla, ejes, barras que suben y bajan, la curva que se va dibujando, las tres casillas
  // con «✓», la barra de progreso y la luz de encendido
  rect(109, 77, 211, 78, paredS); rect(110, 20, 210, 76, C.k); rect(112, 22, 208, 74, hex('#0e1a24'));
  rect(112, 22, 208, 26, hex('#16283a')); for (const [x, c] of [[115, C.rojo], [119, C.amarilloT], [123, C.verdeL]]) pset(x, 24, c); rect(130, 24, 162, 24, hex('#2a4a66')); rect(168, 24, 180, 24, hex('#2a4a66'));
  for (let y = 32; y <= 62; y += 6) for (let x = 118; x < 180; x += 2) pset(x, y, hex('#17293a'));
  rect(116, 30, 116, 66, hex('#3a5a7a')); rect(116, 66, 180, 66, hex('#3a5a7a'));
  for (let k = 0; k < 6; k++) { const a = 10 + Math.round((0.5 + 0.5 * Math.sin(t * 0.9 + k * 1.3)) * 24), x = 120 + k * 10; rect(x, 66 - a, x + 6, 65, hex('#5ab0e8')); rect(x + 5, 66 - a, x + 6, 65, hex('#3a88c0')); rect(x, 66 - a, x + 6, 66 - a, hex('#a8e0fa')); }
  { const n = Math.floor((t * 14) % 76); let px = 118, py = 46; for (let i = 1; i <= Math.min(n, 60); i++) { const x = 118 + i, y = Math.round(46 + Math.sin(i * 0.18 + 1) * 6 - i * 0.14); linea(px, py, x, y, C.amarilloT); px = x; py = y; } if (n <= 60) disco(px, py, 1, C.oroL); }
  for (let k = 0; k < 3; k++) { rect(184, 30 + k * 14, 196, 40 + k * 14, hex('#2a3a4a')); visto(R, 186, 32 + k * 14, 1); }
  { const f = (t * 0.25) % 1; rect(200, 30, 203, 66, hex('#1a2a3a')); rect(200, Math.round(66 - 36 * f), 203, 66, C.tealT); rect(200, Math.round(66 - 36 * f), 203, Math.round(66 - 36 * f), hex('#8ae8e0')); }
  for (let i = 0; i < 10; i++) pset(113 + i, 36 - i, hex('#1c3042'));   // el reflejo del cristal
  pset(205, 75, Math.floor(t * 1.2) % 2 ? C.verdeL : hex('#2a5a3a'));
  // la mampara al laboratorio vecino
  c_salaVecina(R, t, 216, 18, 272, 90);
  // por debajo de Atom: el armario de reactivos con sus frascos detrás del cristal
  rect(279, 50, 315, 83, C.k); rect(280, 51, 314, 82, hex('#d8e0e4'));
  for (const x0 of [282, 298]) { rect(x0, 53, x0 + 14, 80, hex('#d4eaf0')); rect(x0, 66, x0 + 14, 66, hex('#a8b4bc')); rect(x0, 80, x0 + 14, 80, hex('#a8b4bc')); }
  for (const [yb, fila] of [[65, 0], [79, 1]]) for (let k = 0; k < 6; k++) { const x = 283 + k * 5 + (k > 2 ? 1 : 0), hh = 5 + ((k + fila * 2) * 3) % 5, col = [hex('#a8642a'), hex('#4a7ac8'), hex('#eef6f8'), hex('#5aa86a'), hex('#c8a83a'), hex('#8a5ad8')][(k + fila * 3) % 6];
    rect(x, yb - hh, x + 3, yb, C.k); rect(x + 1, yb - hh + 1, x + 2, yb - 1, col); rect(x + 1, yb - hh - 1, x + 2, yb - hh, k % 2 ? C.rojo : C.k); }
  for (const x0 of [282, 298]) for (let i = 0; i < 6; i++) pset(x0 + 3 + i, 76 - i * 3, hex('#f4fbfd'));
  rect(296, 64, 296, 69, C.metalD); rect(298, 64, 298, 69, C.metalD);
  // el analizador compacto: la pantalla con el anillo que gira y las barritas, la ranura de los cartuchos y sus luces
  rect(277, 84, 317, 107, C.k); rect(278, 85, 316, 107, hex('#f2f4f6')); rect(278, 85, 316, 86, C.blanco); rect(278, 104, 316, 107, hex('#d8dee2'));
  rect(281, 89, 301, 101, C.k); rect(282, 90, 300, 100, hex('#12303e'));
  for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, on = (Math.floor(t * 6) - k + 80) % 8 < 3; pset(Math.round(287 + Math.cos(a) * 3), Math.round(95 + Math.sin(a) * 3), on ? hex('#5ae0d0') : hex('#2a5a66')); }
  for (let k = 0; k < 3; k++) rect(293, 92 + k * 3, 293 + Math.round(3 + 3 * (0.5 + 0.5 * Math.sin(t * 2 + k))), 92 + k * 3, hex('#8ad0f0'));
  rect(304, 95, 314, 97, C.k); rect(305, 96, 313, 96, hex('#4a5262'));
  pset(311, 89, Math.floor(t * 2) % 2 ? C.verdeL : hex('#2a5a3a')); pset(307, 89, (t % 3) < 0.4 ? C.amarilloT : hex('#5a4a2a'));
  // en el banco, a la izquierda: el microscopio con la luz de la platina, el carrusel de pipetas y la caja de puntas
  rect(16, 104, 40, 107, C.k); rect(17, 105, 39, 106, hex('#e8ecf0'));
  rect(33, 86, 38, 104, C.k); rect(34, 87, 37, 103, hex('#f2f4f6')); rect(18, 96, 36, 98, C.k); rect(19, 97, 35, 97, C.metalD);
  disco(26, 101, 2, Math.sin(t * 1.7) > -0.2 ? hex('#fff4c0') : hex('#f0e0a0')); pset(26, 101, C.blanco);
  rect(20, 82, 38, 88, C.k); rect(21, 83, 37, 87, hex('#f2f4f6')); rect(21, 87, 37, 87, hex('#d8dee2')); rect(24, 88, 28, 94, C.k); rect(25, 89, 27, 93, C.metal);
  linea(22, 82, 17, 76, C.k); linea(23, 82, 18, 76, C.metalD); linea(24, 82, 19, 76, C.k); rect(16, 75, 19, 76, C.k);
  disco(37, 95, 2, C.k); disco(37, 95, 1, C.metal);
  rect(54, 104, 70, 107, C.k); rect(55, 105, 69, 106, hex('#c8d0d8')); rect(61, 80, 62, 104, C.metalD); rect(56, 80, 67, 82, C.k); rect(57, 81, 66, 81, C.metalL);
  for (const [x, c] of [[55, C.tealT], [64, C.amarilloT], [59, C.verdeT]]) { rect(x, 83, x + 3, 92, C.k); rect(x + 1, 84, x + 2, 91, c); rect(x, 92, x + 3, 99, C.k); rect(x + 1, 92, x + 2, 98, C.blanco); rect(x + 1, 100, x + 2, 101, C.metalS); }
  rect(72, 99, 88, 107, C.k); rect(73, 100, 87, 106, hex('#7aa8e0')); rect(73, 100, 87, 101, hex('#a8c8f0')); poligono([[72, 99], [74, 91], [90, 91], [88, 99]], C.k); poligono([[74, 98], [75, 92], [89, 92], [87, 98]], hex('#b8d4f0'));
  for (let i = 0; i < 6; i++) { pset(75 + i * 2, 100, C.amarilloT); pset(75 + i * 2, 102, C.amarilloT); }
  // el chip de cristal: la cara de arriba con el canal, la entrada (x 123), tres pocillos de colores, los contactos
  // dorados, el canto, las gotitas que corren y un brillo que lo cruza
  rect(120, 96, 200, 107, C.k); rect(121, 97, 199, 103, hex('#d4f0f6')); rect(121, 104, 199, 106, hex('#9ccad6')); rect(121, 97, 199, 97, C.blanco); rect(121, 104, 199, 104, hex('#b8e0ea'));
  for (let x = 125; x < 186; x++) pset(x, 100, hex('#6aa8ba'));
  disco(123, 100, 2, hex('#6aa8ba')); pset(123, 100, C.sangre); pset(122, 100, C.sangre);
  for (const [x, c] of [[140, C.tealT], [158, C.amarilloT], [176, hex('#8a5ad8')]]) { rect(x, 98, x, 99, hex('#6aa8ba')); rect(x - 1, 98, x + 1, 98, c); }
  for (let k = 0; k < 5; k++) rect(188 + k * 2, 99, 188 + k * 2, 102, C.oro);
  for (let k = 0; k < 5; k++) { const x = 126 + Math.round((t * 18 + k * 13) % 60); pset(x, 100, C.sangre); pset(x - 1, 100, hex('#e8a0aa')); }
  { const g = (t % 5) / 0.7; if (g < 1) { const gx = Math.round(120 + g * 84); for (let y = 97; y < 104; y++) { const x = gx - (y - 97); if (x > 120 && x < 200) pset(x, y, C.blanco); } } }
  // la gradilla con seis tubos de sangre
  rect(212, 102, 250, 107, C.k); rect(213, 103, 249, 106, hex('#c8d0d8')); rect(213, 103, 249, 103, hex('#e4e8ec'));
  for (let k = 0; k < 6; k++) { const x = 215 + k * 6; rect(x, 93, x + 3, 104, C.k); rect(x + 1, 95, x + 2, 103, C.blanco); rect(x + 1, 98 + (k % 3), x + 2, 103, C.sangre); rect(x, 91, x + 3, 93, C.k); rect(x + 1, 92, x + 2, 92, [C.rojoW, C.tealT, C.amarilloT, hex('#8a5ad8')][k % 4]); pset(x + 1, 96, hex('#ffffff')); }
  // el borde del banco (y = 108) y su canto, con los reflejos de lo que hay encima
  rect(0, 108, 319, 108, C.k); rect(0, 109, 319, 112, hex('#fafcfd')); rect(0, 113, 319, 113, hex('#e4eaee')); rect(0, 114, 319, 116, hex('#c8d2d8')); rect(0, 117, 319, 117, hex('#9aa6ae'));
  for (const [a, b, c] of [[17, 39, hex('#e4eaee')], [55, 69, hex('#e4eaee')], [121, 199, hex('#dcf0f6')], [213, 249, hex('#e8e0e2')], [278, 316, hex('#e4eaee')]]) for (let x = a; x <= b; x += 2) pset(x, 110, c);
  // los armarios: cajón arriba y puerta abajo, con sus tiradores; el hueco del taburete con la papelera
  rect(0, 118, 319, 159, hex('#e6ecef'));
  for (const [a, b] of [[0, 43], [44, 87], [88, 131], [189, 232], [233, 276], [277, 319]]) { const m = (a + b) >> 1;
    rect(a, 118, a, 159, hex('#b8c4cc')); rect(a + 3, 120, b - 3, 130, hex('#d4dce1')); rect(a + 4, 121, b - 4, 129, hex('#eef2f4')); rect(m - 6, 125, m + 6, 126, C.metalD); rect(m - 6, 125, m + 6, 125, C.metalL);
    rect(a + 3, 133, b - 3, 157, hex('#d4dce1')); rect(a + 4, 134, b - 4, 156, hex('#eaeff2')); rect(b - 8, 140, b - 7, 150, C.metalD); rect(b - 8, 140, b - 8, 150, C.metalL); }
  rect(132, 118, 188, 164, hex('#b4c0c8')); rect(132, 118, 188, 121, hex('#9aa6ae')); rect(132, 118, 132, 164, hex('#a4b0b8')); rect(188, 118, 188, 164, hex('#a4b0b8'));
  rect(138, 144, 150, 164, C.k); rect(139, 145, 149, 163, C.amarilloT); rect(137, 142, 151, 145, C.k); rect(138, 143, 150, 144, C.rojo); poligono([[141, 158], [144, 151], [147, 158]], C.k); poligono([[142, 157], [144, 153], [146, 157]], C.amarilloT);
  rect(156, 138, 176, 142, C.k); rect(157, 139, 175, 141, hex('#3a4a6a')); rect(157, 139, 175, 139, hex('#5a6a8a')); rect(165, 143, 167, 158, C.metalD); rect(158, 158, 174, 159, C.metalD); for (const x of [158, 166, 174]) disco(x, 161, 1.5, C.k);
  // el zócalo y el suelo de vinilo, con las juntas y los reflejos de los armarios
  rect(0, 160, 131, 164, hex('#7e8a94')); rect(189, 160, 319, 164, hex('#7e8a94')); rect(0, 160, 131, 160, hex('#5e6a74')); rect(189, 160, 319, 160, hex('#5e6a74'));
  rect(0, 165, 319, 179, hex('#d4dce0')); rect(0, 171, 319, 171, hex('#c8d0d4'));
  for (let x = -40; x < 360; x += 40) linea(x, 165, Math.round(x + (x - 160) * 0.18), 179, hex('#c8d0d4'));
  for (const [a, b] of [[4, 40], [48, 84], [92, 128], [193, 229], [237, 273], [281, 316]]) for (let y = 166; y < 178; y += 2) for (let x = a + (y % 4 ? 1 : 0); x <= b; x += 6) pset(x, y, hex('#e2e8ec'));
}
// una gota de sangre enorme que flota en la oscuridad (para la presentación de Atom y las pruebas). El fondo es siempre
// oscuro (las escenas pintan por detrás de la gota solo donde el fondo es oscuro): una viñeta granate en cuatro tonos,
// glóbulos lejanos desenfocados que derivan, corrientes de plasma que serpentean y plaquetas que brillan apenas; un halo
// tenue rodea la gota y su reflejo cae debajo. La gota (centro en (150, 104), la punta arriba) tiene su contorno granate,
// cinco tonos de luz, el filo de luz que rebota abajo a la derecha, la cáustica de abajo, el reflejo de una ventana y un
// brillo en la punta; late despacio (sin(5t)) y deja ver por dentro glóbulos rojos que dan vueltas, un glóbulo blanco,
// plaquetas y las moléculas de colores; de vez en cuando le cruza un destello. Sin opciones
export function gotaGigante(R, t, o = {}) {
  const { rect, pset, disco } = R, s = 1 + 0.03 * Math.sin(t * 5), cx = 150, cy = 104;
  // la viñeta: fija, se pinta una vez y se copia
  c_fondoFijo(R, 'gotaGigante', () => { const F = [hex('#1e0e1c'), hex('#180b17'), hex('#120a14'), hex('#0c070e')];
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.hypot((x - cx) * 0.7, y - cy) / 34 + (((x & 1) + (y & 1) * 2) / 4 - 0.4) * 0.5; R.pset(x, y, F[Math.max(0, Math.min(3, Math.floor(d)))]); } });
  // glóbulos lejanos, desenfocados, que derivan despacio
  for (let k = 0; k < 9; k++) { const x = Math.round(((h(k, 1, 180) * 380 + t * (2 + k % 3)) % 380) - 30), y = Math.round(18 + h(k, 2, 180) * 150 + Math.sin(t * 0.3 + k) * 4), r = 7 + Math.round(h(k, 3, 180) * 6);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j); if (d > r) continue; if (d > r - 1.2) pset(x + i, y + j, hex('#2c1424')); else if (((x + i + y + j) & 1) && d > r * 0.4) pset(x + i, y + j, hex('#24101e')); } }
  // las corrientes de plasma que serpentean
  for (let k = 0; k < 4; k++) for (let i = 0; i < 90; i++) { const x = Math.round(((i * 4 + t * 7 * (k + 1)) % 360) - 20), y = Math.round(26 + k * 40 + Math.sin(i * 0.15 + t * 0.6 + k) * 8); if (i % 9 < 6) pset(x, y, hex('#28101e')); }
  // las plaquetas que brillan apenas
  for (let k = 0; k < 28; k++) { const x = Math.round(((h(k, 4, 180) * 330 - t * 3) % 330 + 330) % 330 - 5), y = Math.round(h(k, 5, 180) * 178); pset(x, y, Math.sin(t * 2 + k * 1.7) > 0.6 ? hex('#3a1626') : hex('#2a1220')); }
  // el reflejo de la gota debajo, que late con ella
  for (let j = -7; j <= 7; j++) for (let i = -60; i <= 60; i++) { const e = (i / (54 * s)) ** 2 + (j / 7) ** 2; if (e > 1) continue; const x = cx + i, y = 164 + j; if (e < 0.35) pset(x, y, hex('#3a1020')); else if ((x + y) & 1) pset(x, y, hex('#2a0c18')); }
  // la gota: el halo, el contorno, los tonos de luz, el filo de luz y la cáustica
  const dentro = (x, y, k = s) => { const yy = y / k, xx = x / k; return yy > -10 ? xx * xx + yy * yy * 1.1 < 2116 : yy > -66 && Math.abs(xx) < (yy + 66) * 0.82; };
  const BORDE = hex('#5e1424'), L2 = hex('#f06070'), L1 = hex('#de4456'), S1 = hex('#a82034'), RIM = hex('#c83a52'), CAU = hex('#f07a8a'), HALO = hex('#2e0f1e'), HALO2 = hex('#240c18'), late = Math.sin(t * 5) > 0.8;
  for (let y = -84; y <= 56; y++) for (let x = -58; x <= 58; x++) {
    if (!dentro(x, y)) { if (dentro(x, y, s * 1.1)) { if (((x + y) & 1) === 0 || late) pset(cx + x, cy + y, late ? hex('#3a1424') : HALO); } else if ((x & 1) && (y & 1) && dentro(x, y, s * 1.2)) pset(cx + x, cy + y, HALO2); continue; }
    if (!dentro(x - 1, y) || !dentro(x + 1, y) || !dentro(x, y - 1) || !dentro(x, y + 1)) { pset(cx + x, cy + y, BORDE); continue; }
    const xx = x / s, yy = y / s, sh = xx + yy * 0.6; let c = sh < -44 ? L2 : sh < -28 ? L1 : sh < 12 ? C.sangre : sh < 32 ? S1 : C.sangreS;
    if (sh > 16 && !dentro(x + 3, y + 3)) c = RIM;
    const e = (xx / 24) ** 2 + ((yy - 22) / 14) ** 2; if (yy > 24 && e > 0.72 && e < 1 && Math.abs(xx) < 22) c = CAU;
    pset(cx + x, cy + y, c);
  }
  // por dentro: glóbulos rojos que dan vueltas (de canto cuando giran), un glóbulo blanco con su núcleo, plaquetas y moléculas
  const punto = (x, y, c) => { if (dentro(x - cx, y - cy, s * 0.86)) pset(x, y, c); };
  for (let k = 0; k < 6; k++) { const gx = Math.round(cx + Math.sin(k * 2.3 + t * 0.35) * 26), gy = Math.round(cy + 6 + Math.cos(k * 1.9 + t * 0.28) * 24), r = 4 + (k % 2), an = 0.4 + 0.6 * Math.abs(Math.cos(t * 0.8 + k));
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i / an, j); if (d > r) continue; punto(gx + i, gy + j, d > r - 1.3 ? hex('#e8606e') : d < r * 0.5 ? hex('#a01c2e') : hex('#d23a4c')); } }
  { const wx = Math.round(cx - 10 + Math.sin(t * 0.2) * 12), wy = Math.round(cy + 18 + Math.cos(t * 0.25) * 6);
    for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { const d = Math.hypot(i, j); if (d <= 6) punto(wx + i, wy + j, d > 5 ? hex('#d8a0ac') : hex('#f4d0d8')); }
    for (const [i, j] of [[-2, -1], [1, -2], [2, 1]]) for (let jj = -1; jj <= 1; jj++) for (let ii = -1; ii <= 1; ii++) if (ii * ii + jj * jj < 2) punto(wx + i + ii, wy + j + jj, hex('#9a6aa8')); }
  for (let k = 0; k < 8; k++) { const x = Math.round(cx + Math.sin(k * 3.1 + t * 0.6) * 30), y = Math.round(cy + Math.cos(k * 2.3 + t * 0.5) * 28); punto(x, y, hex('#f4a0b0')); punto(x + 1, y, hex('#f4a0b0')); }
  for (let k = 0; k < 24; k++) { const x = Math.round(cx + Math.sin(k * 2.1 + t * 0.4) * 28), y = Math.round(cy + 10 + Math.cos(k * 1.7 + t * 0.5) * 24), c = [hex('#f0a0b0'), hex('#f8d8a0'), hex('#a8c8f0')][k % 3]; punto(x, y, c); if (k % 3 === 0) { punto(x + 1, y, c); punto(x, y + 1, c); punto(x + 1, y + 1, c); } }
  // los brillos: el reflejo de una ventana, el filo de la izquierda, la punta y el destello que la cruza de vez en cuando
  const X = (v) => Math.round(cx + v * s), Y = (v) => Math.round(cy + v * s);
  { const wx = X(-30), wy = Y(-19); rect(wx + 1, wy, wx + 12, wy + 9, hex('#f8b8c0')); rect(wx, wy + 1, wx + 13, wy + 8, hex('#f8b8c0')); rect(wx + 6, wy, wx + 7, wy + 9, hex('#e8707e')); rect(wx, wy + 4, wx + 13, wy + 4, hex('#e8707e')); rect(wx + 1, wy + 1, wx + 3, wy + 1, C.blanco); pset(wx + 1, wy + 2, C.blanco); }
  for (let a = 2.35; a < 3.4; a += 0.03) pset(Math.round(cx + Math.cos(a) * 40 * s), Math.round(cy + Math.sin(a) * 38 * s), hex('#f8a0ac'));
  R.linea(X(-6), Y(-56), X(-14), Y(-42), hex('#f8a0ac')); pset(X(-6), Y(-57), C.blanco);
  { const f = (t % 3.2) / 0.5; if (f < 1) { const gx = Math.round(cx - 46 + f * 92); for (let y = -60; y < 44; y++) for (let i = 0; i < 3; i++) { const x = gx + i - Math.round(y * 0.4); if (dentro(x - cx, y, s * 0.94)) pset(x, cy + y, i === 1 ? hex('#f8a8b4') : hex('#ee7a8a')); } } }
  if ((t % 2.6) < 0.4) { const g = Math.round(2 + Math.sin((t % 2.6) / 0.4 * Math.PI) * 3), x = X(-26), y = Y(-21); for (let r = -g; r <= g; r++) { pset(x + r, y, C.blanco); pset(x, y + r, C.blanco); } }
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
const disco_ = (R, x, y, c) => R.disco(x, y, 1, c);
// la rejilla de las más de 200 pruebas, en el panel luminoso de la farmacia: 20 × 10 casillas grises; las pocas que hace la Edison, en verde azulado
export function rejillaPruebas(R, t, o = {}) {
  const { rect, pset } = R; farmacia(R, t, { rincon: false }); rect(30, 26, 290, 176, C.k); rect(32, 28, 288, 174, hex('#1e2430')); const u = o.u ?? 1;
  for (let j = 0; j < 10; j++) for (let i = 0; i < 20; i++) { const k = j * 20 + i, x = 42 + i * 12, y = 34 + j * 12; if (k / 200 > u) continue; const edison = [3, 27, 58, 91, 120, 166, 188, 141, 72, 13, 104, 152].includes(k);
    rect(x, y, x + 9, y + 9, C.k); rect(x + 1, y + 1, x + 8, y + 8, edison && o.marca ? (Math.sin(t * 4 + k) > -0.6 ? C.tealT : C.verdeT) : hex('#4a5262')); }
  if (u >= 1) R.numero('200+', 160, 168, { tam: 16, centro: true }); for (let k = 0; k < 6; k++) disco_(R, 36 + k * 50, 26, Math.floor(t * 4 + k) % 2 ? C.oroL : C.oro);
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
// el chip de cerca, sobre el banco (plano de detalle): al fondo, el laboratorio desenfocado (luces del techo y frascos de
// colores en manchas suaves); el banco blanco con su grano, el reflejo de la ventana, motas de polvo en la luz y la sombra
// de alguien que pasa por delante de la luz; alrededor, la gradilla de tubitos, la caja de puntas, la libreta con el
// bolígrafo y el temporizador que cuenta los segundos. El chip de cristal (x 40–280, y 40–136) con su canto, su sombra,
// los contactos dorados y las pistas; la entrada de la muestra (x 60, y 88) con su gota, el canal principal (y 88) con un
// mezclador en zigzag, tres ramas que suben a tres cámaras (x 120, 170, 220; centro en y 56) y la salida de desechos;
// las gotitas corren por los canales. o.u (0–1): las cámaras se tiñen una a una y se marcan con «✓» (la de x 120 a partir
// de 0,5, la de 170 de 0,67 y la de 220 de 0,83), y por su rama suben gotitas; un destello recorre el cristal
export function chipCerca(R, t, o = {}) {
  const { rect, pset, disco, linea, poligono } = R, u = o.u ?? 1;
  // el laboratorio desenfocado: la pared, las luces del techo y los frascos del estante, en manchas
  rect(0, 0, 319, 27, hex('#e2eaee')); rect(0, 0, 319, 7, hex('#d6e0e6'));
  for (const [x, y, r, c] of [[40, 2, 9, hex('#f2f6f8')], [130, 2, 11, hex('#f2f6f8')], [220, 2, 9, hex('#f2f6f8')], [8, 20, 7, hex('#cfe0ea')], [26, 22, 5, hex('#f0dcc8')],
    [180, 20, 6, hex('#f0d0d0')], [198, 22, 5, hex('#cfdcf2')], [216, 19, 6, hex('#f2e6c0')], [236, 21, 5, hex('#cdeedd')], [254, 20, 6, hex('#e6d4ee')], [270, 23, 4, hex('#d0e4f0')]]) c_bokeh(R, x, y, r, c);
  // el banco: el grano, el reflejo de la ventana y la sombra de alguien que pasa
  const pasa = ((t + 3) % 11) / 11, sx = lerp(-140, 460, pasa), B0 = hex('#e9eef1'), B1 = hex('#dde4e8'), BL = hex('#f5f9fb'), S0 = hex('#d5dde2'), S1 = hex('#cbd4da');
  for (let y = 28; y < 180; y++) for (let x = 0; x < 320; x++) {
    const e = ((x - sx) / 80) ** 2 + ((y - 150) / 64) ** 2, sombra = e < 0.86 || (e < 1 && ((x + y) & 1)), ref = !sombra && y < 120 && x + (y - 28) * 0.6 > 6 && x + (y - 28) * 0.6 < 34, mota = (((x * 73) ^ (y * 151)) & 63) === 0;
    pset(x, y, ref ? BL : sombra ? (mota ? S1 : S0) : mota ? B1 : B0);
  }
  rect(0, 27, 319, 27, hex('#c8d2d8'));
  for (let k = 0; k < 12; k++) { const x = Math.round((h(k, 1, 171) * 320 + t * 5 + Math.sin(t * 0.7 + k) * 6) % 320), y = Math.round(32 + ((h(k, 2, 171) * 140 + t * (1.5 + k % 3)) % 140)); if (Math.sin(t * 1.4 + k * 2) > -0.2 && [B0, BL, S0].includes(R.pget(x, y))) pset(x, y, C.blanco); }
  // la gradilla de tubitos (vista desde arriba: los tapones de colores) y la caja de puntas amarillas
  rect(1, 38, 33, 78, S0); rect(0, 34, 31, 74, C.k); rect(0, 35, 30, 73, hex('#c8d0d8')); rect(0, 35, 30, 36, hex('#e4e8ec'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) { const x = 6 + i * 10, y = 42 + j * 9, k = (i + j * 3) % 5; disco(x, y, 3, C.k); disco(x, y, 2.5, k === 4 ? hex('#4a5262') : [C.tealT, C.rojoW, C.amarilloT, hex('#8a5ad8')][k]); if (k !== 4) pset(x - 1, y - 1, C.blanco); }
  rect(290, 54, 319, 122, S0); rect(286, 50, 319, 118, C.k); rect(287, 51, 319, 117, hex('#5a8ac8')); rect(287, 51, 319, 52, hex('#8ab0e0'));
  for (let j = 0; j < 7; j++) for (let i = 0; i < 4; i++) { const x = 292 + i * 7, y = 58 + j * 9; disco(x, y, 2, hex('#2a4a7a')); if (h(i, j, 170) > 0.15) { disco(x, y, 1, C.amarilloT); pset(x, y - 1, hex('#f8e8a0')); } }
  // la libreta con renglones y el bolígrafo; el temporizador que cuenta
  rect(2, 145, 54, 179, S1); rect(0, 140, 50, 179, C.k); rect(0, 141, 49, 179, hex('#fbfaf4')); rect(0, 141, 49, 142, hex('#e8e4d8'));
  for (let y = 148; y < 180; y += 6) rect(0, y, 49, y, hex('#b8cce4')); rect(8, 141, 8, 179, hex('#e8a0a0'));
  for (let k = 0; k < 3; k++) rect(12, 153 + k * 6, 40 - k * 7, 153 + k * 6, hex('#5a6a9a'));
  linea(24, 178, 56, 146, C.k); linea(25, 178, 57, 146, hex('#2a3a7a')); linea(26, 178, 58, 146, C.k); linea(23, 179, 24, 178, C.metalS); rect(53, 149, 55, 151, C.metalL);
  rect(278, 146, 320, 176, S0); rect(276, 142, 316, 172, C.k); rect(277, 143, 315, 171, hex('#3a4450')); rect(277, 143, 315, 144, hex('#5a6672'));
  rect(280, 147, 312, 161, C.k); rect(281, 148, 311, 160, hex('#a8c8a0')); R.numero(String(Math.floor(t + 17) % 60).padStart(2, '0'), 296, 158, { color: hex('#1a2a1a'), centro: true, sombra: false });
  for (const x of [284, 296, 308]) { disco(x, 166, 2, C.k); disco(x, 166, 1, C.metal); } pset(312, 145, Math.floor(t * 2) % 2 ? C.rojo : hex('#5a2a2a'));
  // el chip: su sombra, el cristal con su canto y sus esquinas, y una trama muy suave
  rect(46, 46, 286, 142, S1); rect(40, 40, 280, 136, C.k); rect(41, 41, 279, 130, hex('#d8f0f6')); rect(41, 131, 279, 135, hex('#9ccad6')); rect(41, 131, 279, 131, hex('#b8e0ea'));
  rect(41, 41, 279, 41, C.blanco); rect(41, 41, 41, 130, hex('#eaf8fb'));
  for (let y = 46; y < 128; y += 6) for (let x = 46 + (y % 12); x < 276; x += 12) pset(x, y, hex('#e8f8fb'));
  // los contactos dorados y las pistas que llevan a cada cámara
  for (let k = 0; k < 12; k++) { const x = 58 + k * 18; rect(x, 118, x + 8, 126, hex('#a87a18')); rect(x + 1, 119, x + 7, 125, C.oro); rect(x + 1, 119, x + 7, 119, C.oroL); }
  for (const x of [120, 170, 220]) { const kp = Math.round((x + 4 - 62) / 18), px = 62 + kp * 18; linea(x + 5, 64, x + 5, 112, hex('#c8b070')); linea(x + 5, 112, px, 112, hex('#c8b070')); linea(px, 112, px, 118, hex('#c8b070')); }
  // los canales: primero las paredes y luego el hueco (para que se unan bien)
  const PARED = hex('#5a98ac'), HUECO = hex('#bfe6ee'), CAM = [120, 170, 220];
  const via = [[60, 88], [70, 88], [70, 78], [78, 78], [78, 98], [86, 98], [86, 78], [94, 78], [94, 98], [102, 98], [102, 88], [262, 88]];
  const tramos = [...via.slice(1).map((p, i) => [via[i], p]), ...CAM.map((x) => [[x, 88], [x, 62]])];
  for (const g of [2, 1]) for (const [[ax, ay], [bx, by]] of tramos) rect(Math.min(ax, bx) - g, Math.min(ay, by) - g, Math.max(ax, bx) + g, Math.max(ay, by) + g, g === 2 ? PARED : HUECO);
  // las cámaras: el reactivo se tiñe cuando le toca, con los electrodos dorados al fondo, y su «✓»
  CAM.forEach((x, k) => { const on = u > 0.5 + (x - 120) / 300, col = [hex('#5ac8b8'), hex('#f0c860'), hex('#a888e0')][k];
    disco(x, 56, 9, C.k); disco(x, 56, 8, PARED); disco(x, 56, 7, on ? col : hex('#eef8fb')); for (let i = -1; i <= 1; i++) rect(x - 3, 58 + i * 2, x + 3, 58 + i * 2, on ? hex('#c8a040') : hex('#d8c890'));
    pset(x - 3, 52, C.blanco); pset(x - 2, 51, C.blanco);
    if (on) { if (Math.sin(t * 4 + k) > 0) R.anillo(x, 56, 11, col); for (let j = 0; j < 2; j++) { const y = Math.round(88 - ((t * 16 + j * 13 + k * 5) % 26)); pset(x, y, C.sangre); pset(x + 1, y, C.sangre); } visto(R, x - 5, 51, 1); } });
  // la salida de desechos y la entrada de la muestra, con su gota
  disco(266, 88, 7, C.k); disco(266, 88, 6, PARED); disco(266, 88, 4, hex('#d8a8b4'));
  disco(60, 88, 11, C.k); disco(60, 88, 10, hex('#8ab8c8')); disco(60, 88, 8, C.k); disco(60, 88, 7, C.sangre); disco(62, 90, 4, C.sangreS); disco(59, 87, 5, C.sangre); pset(57, 85, C.sangreL); pset(58, 85, C.sangreL); pset(57, 86, C.sangreL);
  // las gotitas que corren por el canal principal, con su estela
  { const L = via.slice(1).reduce((s, p, i) => s + Math.abs(p[0] - via[i][0]) + Math.abs(p[1] - via[i][1]), 0);
    for (let k = 0; k < 9; k++) { let d = (t * 30 + k * 31) % L; for (let i = 1; i < via.length; i++) { const [ax, ay] = via[i - 1], [bx, by] = via[i], l = Math.abs(bx - ax) + Math.abs(by - ay); if (d > l) { d -= l; continue; }
      const f = d / l, x = Math.round(ax + (bx - ax) * f), y = Math.round(ay + (by - ay) * f), dx = Math.sign(bx - ax), dy = Math.sign(by - ay);
      rect(x - 1, y - 1, x, y, C.sangre); pset(x - 1, y - 1, C.sangreL); pset(x - 2 * dx, y - 2 * dy, hex('#e8a0aa')); pset(x - 3 * dx, y - 3 * dy, hex('#d8c8d0')); break; } } }
  // el destello que cruza el cristal de vez en cuando
  { const g = (t % 6) / 0.9; if (g < 1) { const gx = lerp(-40, 330, g); for (let y = 41; y <= 130; y++) for (let i = 0; i < 5; i++) { const x = Math.round(gx - (y - 41) * 0.5 + i); if (x > 41 && x < 279 && (i < 3 || (y & 1))) { const c = R.pget(x, y); if (c === hex('#d8f0f6') || c === hex('#e8f8fb')) pset(x, y, hex('#f4fcfe')); } } } }
  // las esquinas redondeadas
  for (const [x, y] of [[40, 40], [280, 40], [40, 136]]) pset(x, y, R.pget(x + (x > 100 ? 1 : -1), y + (y > 100 ? 1 : -1)));
}
// la promesa, en el rincón de Theranos de la farmacia: el techo de placas con sus plafones (uno parpadea a ratos) y la
// cámara de seguridad, la franja roja de la cadena con el cartel de pasillo que se mece, las góndolas de los lados llenas de
// productos (por detrás de la de la derecha se asoma de vez en cuando un cliente curioso), el panel del rincón con sus
// juntas, el logotipo, el cartel de la gota, la pantalla de turnos que va cambiando de número y el dispensador de gel con
// su luz; en el centro, el foco que baja del techo con motas de polvo, los rayos que giran despacio detrás del tubito
// gigante (con su etiqueta, un reflejo que pasa, burbujas que suben y destellos alrededor) sobre una peana blanca, y el
// suelo de baldosas con el charco de luz y las ondas que salen de la peana. o.u (0–1): cuántos iconos de pruebas han salido
// ya de la gota en abanico; con u = 0 solo se pintan el fondo y el tubito (la escena dibuja los suyos)
export function promesa(R, t, o = {}) {
  const { rect, pset, disco, linea } = R, u = o.u ?? 1, luz = hex('#fff6d8'), luzS = hex('#f4e6b8');
  // el techo de placas, con su rejilla, los plafones y el carril del foco
  rect(0, 0, 319, 15, a_F.techo); for (let x = 0; x < 320; x += 16) rect(x, 0, x, 14, a_F.techoS); rect(0, 7, 319, 7, a_F.techoS); rect(0, 15, 319, 15, a_F.techoS);
  for (let k = 0; k < 40; k++) { const x = Math.floor(h(k, 1, 240) * 320), y = 1 + Math.floor(h(k, 2, 240) * 13); if (x % 16 && y !== 7) pset(x, y, a_F.techoL); }
  for (const x of [6, 60, 222, 276]) { const apagado = x === 222 && (t % 8.1) < 0.7 && Math.sin(t * 29) > -0.2; rect(x - 1, 9, x + 35, 14, a_F.troffer); rect(x, 10, x + 34, 13, apagado ? a_F.tuboOff : a_F.tubo); if (!apagado) rect(x + 1, 12, x + 33, 12, a_F.tuboS); }
  rect(128, 12, 192, 14, a_F.gondD); rect(128, 12, 192, 12, a_F.gondS);   // el carril de los focos
  rect(156, 15, 164, 19, C.k); rect(157, 15, 163, 18, C.metalS); rect(157, 15, 158, 18, C.metalL); rect(155, 19, 165, 20, C.k); rect(156, 19, 164, 19, luz);
  rect(250, 15, 252, 15, C.k); disco(251, 18, 3, hex('#2a2a34')); pset(250, 17, hex('#6a6a7a')); if (Math.floor(t * 1.2) % 2) pset(252, 19, C.rojo);   // la cámara de seguridad
  // la pared con su gotelé y la franja roja de la cadena
  rect(0, 16, 319, 139, a_F.pared); for (let k = 0; k < 160; k++) pset(Math.floor(h(k, 3, 241) * 320), 28 + Math.floor(h(k, 4, 241) * 110), a_F.paredS);
  rect(0, 21, 319, 29, C.rojoW); rect(0, 21, 319, 21, a_F.rojoL); rect(0, 28, 319, 29, a_F.rojoS); rect(0, 30, 319, 30, a_F.paredS);
  for (let x = 0; x < 320; x += 40) { disco(x + 20, 25, 2, C.blanco); pset(x + 19, 24, a_F.rojoL); }
  // ── el panel del rincón ──
  rect(60, 40, 260, 139, C.k); rect(61, 41, 259, 139, a_F.panel); rect(61, 41, 259, 44, C.tealT); rect(61, 41, 259, 41, a_F.tealL); rect(61, 45, 259, 45, C.tealTS); rect(61, 46, 259, 46, a_F.panelS);
  for (const x of [110, 210]) { rect(x, 47, x, 131, a_F.panelS); pset(x + 1, 47, a_F.panelD); for (const y of [50, 128]) { pset(x - 2, y, a_F.panelD); pset(x + 2, y, a_F.panelD); } }
  rect(61, 132, 259, 139, a_F.panelS); rect(61, 132, 259, 132, a_F.panelD); for (let x = 64; x < 258; x += 24) rect(x, 134, x + 1, 137, a_F.panelD);
  for (const xl of [86, 234]) for (let y = 47; y < 131; y++) for (let x = Math.round(xl - 5 - (y - 47) / 4); x < xl + 5 + (y - 47) / 4; x++) if ((x + y) % 3 === 0) pset(x, y, C.blanco);   // la luz de los focos laterales
  logoTheranos(R, 160, 60, 1.2, t);
  // el cartel de la gota: el pictograma grande, la flecha a muchos iconos pequeños y unas líneas
  rect(68, 54, 102, 100, C.k); rect(69, 55, 101, 99, C.blanco); rect(69, 55, 101, 59, C.tealT); rect(69, 60, 101, 60, C.tealTS);
  a_picto(R, a_PICTO.gota, 73, 66, 2, C.sangreS); a_picto(R, a_PICTO.gota, 72, 65, 2, C.sangre); rect(74, 69, 75, 71, C.sangreL);
  rect(84, 71, 88, 71, C.tealTS); pset(87, 70, C.tealTS); pset(87, 72, C.tealTS);
  for (let k = 0; k < 6; k++) { const ix = 90 + (k % 2) * 6, iy = 64 + Math.floor(k / 2) * 6; rect(ix, iy, ix + 4, iy + 4, C.k); rect(ix + 1, iy + 1, ix + 3, iy + 3, [C.tealT, C.verdeT, C.amarilloT][k % 3]); }
  for (let k = 0; k < 4; k++) rect(72, 84 + k * 3, 98 - (k % 2) * 8, 84 + k * 3, a_F.panelD);
  // la pantalla de turnos, que cambia de número con un aviso, y el dispensador de gel con su luz
  { const n = 7 + Math.floor((t + 1.3) / 4.5) % 90, cambia = ((t + 1.3) % 4.5) < 0.5; rect(220, 52, 252, 68, C.k); rect(222, 54, 250, 66, hex('#1a1416')); rect(222, 54, 250, 54, hex('#2e2428'));
    R.numero(String(n).padStart(2, '0'), 236, 64, { color: cambia && Math.floor(t * 8) % 2 ? C.amarilloT : C.rojoW, centro: true, sombra: false }); rect(234, 49, 238, 51, C.k); disco(236, 50, 1, cambia ? C.verdeL : hex('#3a5a3a')); }
  rect(228, 78, 240, 100, C.k); rect(229, 79, 239, 99, C.metalL); rect(229, 79, 239, 81, C.blanco); rect(238, 82, 239, 99, C.metal); rect(231, 86, 237, 92, hex('#cfe8ec')); rect(232, 87, 233, 91, C.blanco);
  rect(232, 100, 236, 102, C.k); rect(233, 101, 235, 101, C.metalS); pset(234, 84, Math.sin(t * 3) > 0 ? C.verdeL : hex('#3a5a3a'));
  // el cliente curioso, que de vez en cuando se asoma por detrás de la góndola de la derecha
  { const c = (t + 3) % 11, se = c < 1 ? 0 : c < 1.6 ? (c - 1) / 0.6 : c < 4.4 ? 1 : c < 5 ? 1 - (c - 4.4) / 0.6 : 0;
    if (se > 0) R.actor(ELENCO_CHIBI.senor30, 266 - Math.round(se * 9), 140, t, { dir: -1, quieto: true, sorpresa: se >= 1 && c > 2.2 && c < 3.6 }); }
  // las góndolas de los lados, con sus productos de todas las formas
  a_gondola(R, -26, 54, 40, 139, { semilla: 3, cab: hex('#2a5aa8'), picto: a_PICTO.sol, lado: 1 });
  a_gondola(R, 266, 346, 40, 139, { semilla: 11, cab: hex('#2a5aa8'), picto: a_PICTO.gota, lado: -1 });
  // el cartel de pasillo colgado, que se mece
  { const cx = 30, sw = Math.round(Math.sin(t * 0.9) * 1); linea(cx - 8, 16, cx - 8 + sw, 22, a_F.gondD); linea(cx + 8, 16, cx + 8 + sw, 22, a_F.gondD);
    rect(cx - 13 + sw, 22, cx + 13 + sw, 35, C.k); rect(cx - 12 + sw, 23, cx + 12 + sw, 34, hex('#2a5aa8')); rect(cx - 12 + sw, 23, cx + 12 + sw, 23, hex('#4a7ac8')); rect(cx - 12 + sw, 34, cx + 12 + sw, 34, hex('#1a3a78'));
    R.dibujo(a_PICTO.sol, cx - 9 + sw, 26, 1, { '#': C.blanco }); R.numero('5', cx + 5 + sw, 32, { color: C.blanco, centro: true, sombra: false }); }

  // ── el suelo de baldosas en perspectiva, con la sombra de los muebles, el charco de luz y las ondas ──
  for (let y = 140; y < 180; y++) {
    const e = 1 + 0.4 * (y - 140) / 39, lh = y === 144 || y === 149 || y === 156 || y === 165 || y === 176;
    let prev = Math.floor((160 - 160 / e) / 22);
    for (let x = 0; x < 320; x++) { const col = Math.floor((160 + (x - 160) / e) / 22); pset(x, y, lh || col !== prev ? a_F.junta : (col + (y < 144 ? 0 : y < 149 ? 1 : y < 156 ? 2 : y < 165 ? 3 : 4)) % 2 ? a_F.suelo : a_F.suelo2); prev = col; }
  }
  for (let y = 140; y < 143; y++) for (let x = 0; x < 320; x++) if ((x + y) % 2 === 0 || y === 140) pset(x, y, a_F.sombra);
  for (let j = -6; j <= 6; j++) for (let i = -50; i <= 50; i++) { const d = (i / 50) ** 2 + (j / 6) ** 2; if (d < 1 && (i + j) % 2 === 0 && (d < 0.45 || (i + 2 * j) % 4 === 0)) pset(160 + i, 165 + j, luz); }
  for (let i = -22; i <= 22; i++) for (let j = 0; j <= 2; j++) if (((i / 22) ** 2 + (j / 2.5) ** 2) < 1 && (i + j) % 2 === 0) pset(160 + i, 166 + j, a_F.sombra);
  for (let k = 0; k < 2; k++) { const f = ((t / 2.6) + k * 0.5) % 1, rx = 26 + f * 120, ry = 3 + f * 9, paso = f < 0.5 ? 2 : 3;
    for (let a = 0; a < 6.28; a += 1.6 / rx) { const x = Math.round(160 + Math.cos(a) * rx), y = Math.round(166 + Math.sin(a) * ry); if (y >= 141 && (x % paso === 0)) pset(x, y, f < 0.6 ? hex('#a8e0d8') : a_F.junta); } }
  // el foco del techo sobre el tubito, con motas de polvo
  for (let y = 21; y < 121; y++) { const w = 4 + (y - 21) * 0.2; for (let x = Math.round(160 - w); x <= Math.round(160 + w); x++) if ((x + y) % 3 === 0) pset(x, y, luz); }
  for (let k = 0; k < 14; k++) { const y = 26 + ((h(k, 1, 242) * 92 + t * (2 + k % 3)) % 92), w = 4 + (y - 21) * 0.2, x = Math.round(160 + (h(k, 2, 242) * 2 - 1) * w * 0.85 + Math.sin(t * 0.7 + k) * 2); if (Math.sin(t * 1.9 + k * 1.7) > -0.3) pset(x, Math.round(y), C.blanco); }
  // los rayos que giran despacio detrás del tubito
  for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2 + t * 0.18, l = 40 + Math.sin(t * 1.3 + k * 2.1) * 6, col = k % 2 ? luzS : hex('#cdeee8');
    for (let d = 18; d < l; d++) { if ((d + k) % 2) continue; const x = Math.round(160 + Math.cos(a) * d * 1.25), y = Math.round(104 + Math.sin(a) * d); if (y < 120 && y > 30) pset(x, y, col); } }
  // la peana blanca, con su placa del logotipo y su sombra
  rect(140, 121, 180, 126, C.k); rect(141, 122, 179, 125, C.blanco); rect(141, 125, 179, 125, a_F.panelS); rect(141, 122, 179, 122, luz);
  rect(144, 127, 176, 160, C.k); rect(145, 127, 175, 160, a_F.panel); rect(145, 127, 147, 160, C.blanco); rect(171, 127, 175, 160, a_F.panelS); rect(174, 127, 175, 160, a_F.panelD);
  rect(145, 127, 175, 128, a_F.panelD); rect(149, 136, 171, 137, C.tealT); logoTheranos(R, 160, 148, 0.45, t);
  rect(140, 160, 180, 165, C.k); rect(141, 161, 179, 164, C.blanco); rect(141, 164, 179, 164, a_F.panelS);
  // el tubito gigante: etiqueta, reflejo fijo, el destello que pasa, burbujas y destellos alrededor
  tubito(R, 160, 120, 4, 1, C.verdeT);
  rect(153, 89, 158, 89, C.verdeL); rect(154, 100, 154, 117, C.sangreL); rect(153, 106, 167, 111, C.blanco); rect(155, 108, 160, 108, a_F.panelD); disco(164, 108, 1, C.tealT);
  for (let k = 0; k < 4; k++) { const y = Math.round(118 - ((t * 7 + k * 5.3) % 20)); if (y < 106 || y > 111) pset(157 + k * 3, y, C.sangreL); }
  { const p = (t % 3.4) / 0.6; if (p < 1) { const x = Math.round(153 + p * 14); rect(x, 97, x, 119, C.blanco); if (x + 1 < 168) rect(x + 1, 97, x + 1, 119, luz); } }
  for (const [dx, dy, f] of [[-24, -14, 0], [26, -6, 1.3], [-17, 6, 2.1], [21, 12, 0.7], [-6, -28, 1.7]]) { const b = Math.sin(t * 2.6 + f * 3); if (b > 0.2) { const r = b > 0.8 ? 2 : 1, x = 160 + dx, y = 104 + dy; pset(x, y, C.blanco); for (let i = 1; i <= r; i++) { pset(x + i, y, C.oroL); pset(x - i, y, C.oroL); pset(x, y + i, C.oroL); pset(x, y - i, C.oroL); } } }

  // los iconos de pruebas que salen de la gota en abanico (solo si u > 0: la escena dibuja los suyos)
  const ic = ['gota', 'reloj', 'balanza', '?', 'corona', 'pila', 'luna', 'factura'], n = Math.round(u * 32);
  for (let k = 0; k < n; k++) { const a = -Math.PI + (k + 0.5) / 32 * Math.PI, r = 50 + (k % 3) * 24 + Math.sin(t * 2 + k) * 2, x = Math.round(160 + Math.cos(a) * r * 1.6), y = Math.round(98 + Math.sin(a) * r * 0.95), col = [C.tealT, C.verdeT, C.amarilloT, hex('#e8a8b8')][k % 4];
    rect(x - 6, y - 6, x + 6, y + 6, C.k); rect(x - 5, y - 5, x + 5, y + 5, col); if (ic[k % 8] === 'gota') disco(x, y, 2, C.sangre); else R.icono(ic[k % 8], x - 3, y - 3, C.k, col); }
}
// las decenas de pruebas que intentan caber en una gota (gag): los iconos hacen cola, chocan contra la gota y rebotan.
// Alrededor, la sala de muestras de Theranos: el techo con sus plafones, la pared verde salvia con la franja verde
// azulada y el logotipo, la pantalla grande con la cuadrícula de pruebas que se van encendiendo, la puerta de cristal
// por la que pasa gente pequeña, la ventana con nubes y los árboles de Palo Alto que se mecen, el banco del fondo con
// la centrífuga, los analizadores (luces que parpadean) y la gradilla, la planta, y el suelo de vinilo con los reflejos
// y la sombra de la gota; los personajes pisan en y ≈ 174
export function noCaben(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, P = b_C;
  // el techo con sus plafones y la pared con su textura
  rect(0, 0, 319, 9, hex('#e8ecec')); for (let x = 0; x < 320; x += 32) rect(x, 0, x, 9, hex('#d6dcdc')); rect(0, 9, 319, 10, hex('#c8d0d0'));
  for (let k = 0; k < 5; k++) { const x = 8 + k * 66; rect(x, 2, x + 30, 7, C.blanco); rect(x, 7, x + 30, 7, hex('#d8e0e0')); }
  rect(0, 11, 319, 139, P.salvia); for (let k = 0; k < 260; k++) pset(Math.round(h(k, 1, 390) * 319), 12 + Math.round(h(k, 2, 390) * 126), P.salviaS); rect(0, 11, 319, 12, P.salviaS);
  rect(0, 80, 319, 83, C.tealT); rect(0, 80, 319, 80, hex('#6ac8c0')); rect(0, 83, 319, 83, C.tealTS);
  // la puerta de cristal: el pasillo de detrás, la gente pequeña que pasa y el marco con su tirador
  rect(10, 30, 58, 138, P.pasillo); rect(10, 30, 58, 32, C.blanco); for (let y = 40; y < 138; y += 18) rect(10, y, 58, y, P.pasilloS); rect(10, 120, 58, 138, P.pasilloS);
  b_paseantes(R, t, 10, 30, 58, 138, 132, [[ELENCO_CHIBI.tecnico, 12, 0, 1], [ELENCO_CHIBI.sudadera, 12, 3.2, 1, 1]]);
  for (let i = 0; i < 18; i++) { pset(16 + i, 70 - i, b_mezcla(R.pget(16 + i, 70 - i), C.blanco, 0.5)); pset(30 + i, 120 - i, b_mezcla(R.pget(30 + i, 120 - i), C.blanco, 0.4)); }
  rect(6, 26, 62, 29, P.perfil); rect(6, 26, 9, 139, P.perfil); rect(59, 26, 62, 139, P.perfil); rect(6, 26, 62, 26, P.perfilL); rect(9, 29, 9, 139, P.perfilS); rect(62, 26, 62, 139, P.perfilS); rect(10, 90, 58, 92, P.perfil); rect(10, 92, 58, 92, P.perfilS);
  rect(52, 70, 54, 104, C.k); rect(53, 71, 53, 103, C.metalL);
  // la pantalla grande: la cuadrícula de pruebas que se van encendiendo una a una y la barra que avanza
  rect(72, 18, 158, 70, C.k); rect(74, 20, 156, 68, hex('#0e1a24')); rect(74, 20, 156, 23, hex('#1e2e3c'));
  { const ic = ['gota', 'reloj', 'balanza', 'corona', 'pila', 'luna'], col = [C.tealT, C.verdeT, C.amarilloT, hex('#e8a8b8')], on = Math.floor(t * 3) % 30;
    for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) { const k = j * 7 + i, x = 78 + i * 11, y = 26 + j * 9, lit = k <= on; rect(x, y, x + 8, y + 7, lit ? col[k % 4] : hex('#24384a'));
      if (lit) { if (ic[k % 6] === 'gota') { disco(x + 4, y + 4, 2, C.sangre); } else R.icono(ic[k % 6], x + 1, y + 1, C.k, col[k % 4]); } } }
  rect(78, 63, 152, 65, hex('#24384a')); rect(78, 63, 78 + Math.round(((t * 0.3) % 1) * 74), 65, C.tealT); rect(112, 70, 118, 76, C.metalD); rect(104, 76, 126, 77, C.metalD);
  // el logotipo de Theranos en la pared
  logoTheranos(R, 190, 38, 1, t);
  // la ventana con el cielo, las nubes y los árboles que se mecen
  rect(224, 20, 272, 74, C.k); rect(226, 22, 270, 72, C.cielo2); rect(226, 22, 270, 34, C.cielo1); rect(226, 56, 270, 72, C.cielo3);
  R.recorte([226, 22, 270, 72]); for (let k = 0; k < 2; k++) b_nube(R, 220 + ((t * (2 + k) + k * 30) % 70), 32 + k * 12, 10 - k * 2);
  for (let x = 226; x <= 270; x++) rect(x, 64 - Math.round(2 * Math.sin(x * 0.13)), x, 72, hex('#8ab89a')); b_roble(R, 236, 72, t, 7); b_roble(R, 258, 72, t * 1.1, 9); R.recorte(null);
  rect(247, 22, 248, 72, C.blanco); rect(226, 46, 270, 47, C.blanco); rect(222, 73, 274, 76, C.blanco); rect(222, 76, 274, 76, P.salviaS);
  // el banco del fondo: la encimera, los armarios y lo de encima (la centrífuga, los analizadores y la gradilla)
  rect(64, 108, 319, 111, C.blanco); rect(64, 108, 319, 108, hex('#ffffff')); rect(64, 111, 319, 111, hex('#c8d0d4')); rect(66, 112, 319, 139, hex('#e4eae8'));
  for (let k = 0; k < 6; k++) { const x = 68 + k * 42; rect(x, 115, x + 38, 137, hex('#d4dcda')); rect(x + 1, 116, x + 37, 136, hex('#eaf0ee')); rect(x + 15, 118, x + 23, 119, C.metalD); }
  rect(64, 112, 319, 113, hex('#c4ccca'));
  rect(70, 92, 100, 107, C.k); rect(71, 93, 99, 107, hex('#e8ecf0')); disco(85, 96, 7, C.k); disco(85, 96, 6, hex('#9ab0c4')); { const a = t * 10; pset(Math.round(85 + Math.cos(a) * 3), Math.round(96 + Math.sin(a) * 2), C.blanco); } rect(93, 101, 97, 104, Math.floor(t * 2) % 2 ? C.verdeL : hex('#2a5a3a'));
  for (let k = 0; k < 2; k++) { const x = 236 + k * 40; rect(x, 84, x + 34, 107, C.k); rect(x + 1, 85, x + 33, 107, C.blanco); rect(x + 1, 85, x + 33, 88, C.tealT); rect(x + 4, 91, x + 20, 100, hex('#24343a'));
    for (let i = 0; i < 4; i++) rect(x + 6, 93 + i * 2, x + 6 + Math.round(3 + 8 * Math.abs(Math.sin(t * (1.3 + k) + i))), 93 + i * 2, hex('#5ab0e8'));
    for (let i = 0; i < 3; i++) disco(x + 26, 92 + i * 4, 1, Math.sin(t * (4 + i) + k) > 0 ? [C.verdeL, C.amarilloT, C.rojo][i] : hex('#9aa4ac')); }
  rect(120, 101, 160, 107, C.k); rect(121, 102, 159, 106, C.metalL); for (let k = 0; k < 6; k++) { const x = 124 + k * 6; rect(x, 94, x + 2, 104, C.k); rect(x + 1, 98, x + 1, 103, C.sangre); rect(x, 92, x + 2, 94, [C.verdeT, C.amarilloT, C.tealT][k % 3]); }
  // la planta en su maceta, en la esquina, con las hojas que se mueven
  poligono([[294, 140], [314, 140], [311, 160], [297, 160]], C.k); poligono([[295, 141], [313, 141], [310, 159], [298, 159]], hex('#e8e4dc')); rect(295, 141, 313, 143, hex('#d0ccc2'));
  for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.32 + Math.sin(t * 0.9 + k) * 0.05, L = 16 + (k % 3) * 6; for (let d = 2; d < L; d++) { const x = Math.round(304 + Math.cos(a) * d), y = Math.round(140 + Math.sin(a) * d + (d * d) / (60 + k * 5)); pset(x, y, d < L - 4 ? C.hierbaS : C.hierba); pset(x + 1, y, C.hierbaD); } }
  // el suelo de vinilo en perspectiva, con el zócalo, las juntas y los reflejos de los plafones
  rect(0, 139, 319, 179, P.vinilo); rect(0, 139, 319, 140, P.viniloS);
  for (const y of [146, 155, 166]) rect(0, y, 319, y, P.viniloS); for (let k = -8; k < 16; k++) linea(160 + k * 22, 141, 160 + k * 40, 179, P.viniloS);
  for (let k = 0; k < 5; k++) { const x = 28 + k * 66; for (let j = -3; j <= 3; j++) { const w = Math.round(13 * Math.sqrt(1 - (j / 3.5) ** 2)); for (let i = -w; i <= w; i++) if (((x + i + j) & 1) === 0) pset(x + i, 146 + j, P.viniloL); } }
  b_sombra(R, 200, 170, 16, 2, 0.84);
  // la gota, con su brillo y el reflejo de la ventana
  disco(200, 100, 18, C.k); disco(200, 100, 17, C.sangre); for (let y = 70; y < 84; y++) { const w = Math.round((y - 70) / 2); rect(200 - w, y, 200 + w, y, C.sangre); pset(200 - w - 1, y, C.k); pset(200 + w + 1, y, C.k); } pset(200, 69, C.k);
  disco(200, 100, 17, (x, y, r) => (x - 200 + (y - 100) * 0.6 > 9 && r > 0.45 ? C.sangreS : C.sangre)); disco(194, 94, 4, C.sangreL); disco(193, 93, 1.5, C.blanco); rect(208, 104, 210, 108, hex('#e04a5c')); rect(206, 92, 207, 95, hex('#f07080'));
  for (let k = 0; k < 14; k++) { const fase = (t * 0.8 + k * 0.29) % 2, x = fase < 1 ? Math.round(lerp(-20, 178, fase)) : Math.round(lerp(178, 120 - (k % 4) * 20, fase - 1)), y = Math.round(100 + (k % 3 - 1) * 10 - (fase > 1 ? Math.sin((fase - 1) * Math.PI) * 30 : 0));
    if (x < -10) continue; rect(x - 5, y - 5, x + 5, y + 5, C.k); const col = [C.tealT, C.verdeT, C.amarilloT, hex('#e8a8b8')][k % 4], ic = ['gota', 'reloj', 'balanza', 'corona'][k % 4]; rect(x - 4, y - 4, x + 4, y + 4, col); if (ic === 'gota') disco(x, y, 2, C.sangre); else R.icono(ic, x - 3, y - 3, C.k, col);
    if (fase > 1 && fase < 1.25) R.icono('X', x - 2, y - 14, C.rojo, C.k); }
  R.numero('1', 200, 140, { tam: 16, centro: true });
}
// el tubo enorme que piden las máquinas grandes, al lado del tubito diminuto de Theranos, con una «?» entre los dos, en
// el banco del laboratorio: la pared de azulejo blanco con su junta y la franja verde azulada, la ventana interior al
// laboratorio (analizadores con luces y técnicos pequeños que pasan), el gráfico de controles con el punto del día que
// parpadea, el reloj, la balda con frascos de reactivo, la regleta de enchufes, el banco de resina oscura con sus
// brillos, la caja de puntas, la gradilla con tubos y la centrífuga que gira; el tubo grande lleva su etiqueta, su
// tapón rojo (de y 21 a 33, por debajo de la barra del año) y burbujitas que suben; la mano canónica sujeta el tubito.
// La escena mide con reglas en x 132 (y 22–150) y x 216 (y 112–131); por la izquierda entra la mano con el frasco
export function tuboContraTubito(R, t) {
  const { rect, pset, disco, poligono, linea } = R, P = b_C;
  // la ventana interior: el laboratorio de detrás, con sus analizadores, y los técnicos que pasan
  rect(184, 22, 268, 66, hex('#c9d8d0')); rect(184, 22, 268, 25, P.salviaL); rect(184, 40, 268, 43, C.tealT); for (let k = 0; k < 3; k++) rect(190 + k * 28, 22, 206 + k * 28, 23, C.blanco);
  for (let k = 0; k < 3; k++) { const x = 188 + k * 28; rect(x - 1, 44, x + 23, 66, hex('#6a7682')); rect(x, 45, x + 22, 66, hex('#dfe5ea')); rect(x, 45, x + 22, 46, C.blanco); rect(x + 3, 48, x + 14, 54, hex('#24343a')); for (let i = 0; i < 3; i++) pset(x + 17 + (i % 2) * 2, 48 + i * 2, Math.sin(t * (3 + k) + i * 2) > 0 ? [C.verdeL, C.amarilloT, hex('#5ab0e8')][i] : hex('#9aa4ac')); rect(x + 4, 50 + Math.round(Math.abs(Math.sin(t * 2 + k)) * 2), x + 4 + Math.round(4 + 4 * Math.abs(Math.sin(t * 1.3 + k))), 50 + Math.round(Math.abs(Math.sin(t * 2 + k)) * 2), hex('#5ab0e8')); }
  b_paseantes(R, t, 184, 22, 268, 66, 78, [[ELENCO_CHIBI.tecnico, 18, 0, 1], [ELENCO_CHIBI.tecnica, 14, 3.5, -1], [ELENCO_CHIBI.holmes, 11, 9, 1]]);
  // la pared de azulejo blanco a matajunta, con la franja verde azulada, alrededor de la ventana
  const azu = (x0, y0, x1, y1) => b_azulejos(R, x0, y0, x1, y1, 16, 8, P.azuB, P.azuBS, P.azuBJ, P.azuBL, 7, true);
  azu(0, 0, 319, 17); azu(0, 18, 179, 149); azu(273, 18, 319, 149); azu(180, 71, 272, 149);
  rect(0, 96, 319, 99, C.tealT); rect(0, 96, 319, 96, hex('#6ac8c0')); rect(0, 99, 319, 99, C.tealTS);
  // el marco de aluminio de la ventana
  rect(179, 17, 273, 21, P.perfil); rect(179, 67, 273, 70, P.perfil); rect(179, 17, 183, 70, P.perfil); rect(269, 17, 273, 70, P.perfil); rect(179, 17, 273, 17, P.perfilL); rect(183, 21, 269, 21, P.perfilS); rect(183, 21, 183, 67, P.perfilS); rect(179, 70, 273, 70, P.perfilS); rect(178, 16, 274, 16, P.perfilS);
  for (const [a, l] of [[0.22, 14], [0.7, 9]]) for (let i = 0; i < l; i++) { const x = Math.round(184 + 84 * a) + i, y = 64 - i; if (x < 269) { pset(x, y, b_mezcla(R.pget(x, y), C.blanco, 0.45)); pset(x + 1, y, b_mezcla(R.pget(x + 1, y), C.blanco, 0.3)); } }
  // el gráfico de controles de calidad, clavado: la cuadrícula, la media y los límites, y el punto del día que parpadea
  rect(6, 24, 58, 70, C.k); rect(7, 25, 57, 69, hex('#fbfaf4')); rect(7, 25, 57, 28, C.tealT); for (let x = 12; x < 57; x += 6) rect(x, 30, x, 67, hex('#e4e6ea')); for (const [y, c] of [[36, C.rojo], [42, C.amarilloT], [48, C.verde], [54, C.amarilloT], [60, C.rojo]]) for (let x = 9; x < 56; x += 2) pset(x, y, c);
  { let px = 0, py = 0; for (let k = 0; k < 8; k++) { const x = 10 + k * 6, y = Math.round(48 + (h(k, 1, 380) - 0.5) * 12); if (k) linea(px, py, x, y, hex('#3a4a8a')); if (k < 7 || Math.floor(t * 2) % 2) disco(x, y, 1, k === 7 ? C.rojo : hex('#3a4a8a')); px = x; py = y; } }
  disco(9, 27, 1, C.rojo); disco(55, 27, 1, C.amarilloT);
  // el reloj de pared
  b_reloj(R, 152, 36, 10, t);
  // la balda con frascos de reactivo (ámbar, de tapón azul y el frasco lavador)
  rect(276, 92, 319, 94, C.k); rect(277, 92, 319, 93, C.metalL); rect(286, 95, 288, 99, C.metalD); rect(310, 95, 312, 99, C.metalD);
  rect(279, 76, 289, 91, C.k); rect(280, 80, 288, 91, hex('#8a4a1a')); rect(280, 80, 281, 91, hex('#b06a2a')); rect(281, 75, 287, 79, C.k); rect(282, 76, 286, 78, C.k); rect(281, 84, 287, 88, hex('#f4f0e4'));
  rect(292, 80, 302, 91, C.k); rect(293, 81, 301, 91, hex('#e8f0f4')); rect(293, 86, 301, 91, hex('#c8e0f0')); rect(294, 77, 300, 80, C.k); rect(295, 78, 299, 79, hex('#3a6ac8'));
  rect(305, 78, 315, 91, C.k); rect(306, 79, 314, 91, hex('#f4f6f8')); rect(306, 86, 314, 91, hex('#d8e8f0')); rect(308, 75, 312, 78, C.k); linea(310, 75, 314, 70, C.k);
  // la regleta de enchufes en la pared, con su cable al banco
  rect(150, 118, 208, 124, C.k); rect(196, 125, 197, 150, C.k); rect(151, 119, 207, 123, C.blanco); for (let k = 0; k < 4; k++) { rect(155 + k * 13, 120, 156 + k * 13, 122, C.k); rect(159 + k * 13, 120, 159 + k * 13, 122, C.k); } rect(201, 120, 205, 122, C.rojo); if (Math.floor(t) % 4) pset(203, 121, hex('#ff8a8a'));
  // el banco de resina oscura con su canto de luz y los reflejos
  rect(0, 150, 319, 179, P.resina); rect(0, 150, 319, 150, P.resinaL); rect(0, 151, 319, 151, P.resinaM); for (let i = 0; i < 160; i++) pset(Math.round(h(i, 1, 381) * 319), 153 + Math.round(h(i, 2, 381) * 26), i % 2 ? P.resinaS : P.resinaM);
  for (const x0 of [30, 150, 250]) for (let y = 153; y < 168; y++) for (let i = 0; i < 14 - (y - 153) * 0.7; i++) if (((x0 + i + y) & 1) === 0) pset(x0 + i + Math.round((y - 153) * 0.4), y, P.resinaM);
  // la caja de puntas de pipeta y la gradilla con tubos
  b_sombra(R, 30, 151, 26, 2, 0.75); rect(6, 138, 54, 151, C.k); rect(7, 139, 53, 150, hex('#3a8ac8')); rect(7, 139, 53, 142, hex('#5aa8e8')); for (let k = 0; k < 8; k++) for (let j = 0; j < 2; j++) pset(10 + k * 6, 140 + j * 2, hex('#f0e870'));
  b_sombra(R, 172, 152, 26, 2, 0.75); rect(148, 136, 194, 138, C.k); rect(149, 137, 193, 137, C.metalL); for (const x of [148, 191]) rect(x, 136, x + 2, 150, C.k);
  for (let k = 0; k < 6; k++) { const x = 153 + k * 7; rect(x, 130, x + 4, 149, C.k); rect(x + 1, 133, x + 3, 148, k % 3 === 2 ? hex('#f0d890') : C.sangre); rect(x + 1, 131, x + 3, 132, hex('#eef6fa')); rect(x, 127, x + 4, 130, C.k); rect(x + 1, 128, x + 3, 129, [C.rojoW, hex('#8a5ad8'), C.amarilloT][k % 3]); pset(x + 3, 134, C.blanco); }
  rect(146, 144, 196, 147, C.k); rect(147, 145, 195, 146, C.metalL);
  // la centrífuga que gira, con su luz
  b_sombra(R, 290, 152, 26, 2, 0.75); rect(266, 136, 314, 151, C.k); rect(267, 137, 313, 150, hex('#e8ecf0')); rect(267, 147, 313, 150, hex('#c8ced6')); disco(290, 141, 9, C.k); disco(290, 141, 8, hex('#9ab0c4')); disco(290, 141, 6, hex('#5a6e84'));
  { const a = t * 9; for (let k = 0; k < 4; k++) { const b = a + k * Math.PI / 2; pset(Math.round(290 + Math.cos(b) * 4), Math.round(141 + Math.sin(b) * 3), C.blanco); } } rect(305, 141, 309, 144, C.k); rect(306, 142, 308, 143, Math.floor(t * 2) % 2 ? C.verdeL : hex('#2a5a3a'));
  // el tubo grande: el cristal, la sangre con sus brillos y burbujitas, la etiqueta y el tapón rojo
  b_sombra(R, 96, 151, 34, 2, 0.7);
  rect(70, 33, 120, 148, C.k); rect(71, 149, 119, 150, C.k); rect(71, 33, 119, 148, hex('#f4f8fc')); rect(112, 33, 119, 148, hex('#e2ecf4'));
  rect(71, 56, 119, 148, C.sangre); rect(72, 149, 118, 149, C.sangreS); rect(108, 56, 119, 148, C.sangreS); rect(71, 56, 119, 57, C.sangreL); for (let y = 60; y < 146; y += 6) pset(75, y, C.sangreL); rect(76, 60, 77, 140, hex('#e04a5c'));
  for (let k = 0; k < 5; k++) { const y = 148 - ((t * 10 + k * 7) % 40); pset(96 + (k % 3) * 4, Math.round(y), hex('#f8c8d0')); }
  rect(78, 96, 104, 132, C.k); rect(79, 97, 103, 131, hex('#fbfaf4')); rect(79, 97, 103, 100, C.rojoW); for (let x = 81, i = 0; x < 102; i++) { const w = h(i, 3, 382) < 0.4 ? 2 : 1; rect(x, 104, Math.min(101, x + w - 1), 116, C.k); x += w + 1 + (h(i, 4, 382) < 0.3 ? 1 : 0); } for (let k = 0; k < 3; k++) rect(81, 122 + k * 3, 98 - k * 6, 122 + k * 3, C.grisL);
  rect(114, 36, 115, 92, C.blanco); rect(114, 136, 115, 145, C.blanco); rect(113, 40, 113, 60, C.blanco);
  rect(65, 21, 125, 33, C.k); rect(66, 22, 124, 32, C.rojoW); rect(66, 22, 124, 23, b_mezcla(C.rojoW, C.blanco, 0.4)); for (let x = 69; x < 122; x += 3) rect(x, 25, x, 29, b_mezcla(C.rojoW, C.k, 0.3)); rect(66, 30, 124, 32, b_mezcla(C.rojoW, C.k, 0.3)); rect(118, 22, 124, 29, b_mezcla(C.rojoW, C.k, 0.2));
  // el tubito en la mano canónica (manga blanca hasta el borde) y la «?»
  const dy = Math.round(Math.sin(t * 2) * 2); tubito(R, 230, 130 + dy, 2, 1, C.verdeT); mano(R, 246, 126 + dy, -1, '#f4f4f8'); b_manga(R, 246, 126 + dy, -1, '#f4f4f8');
  R.icono('?', 158, 70, C.rojo, C.k, 4);
}
// los tres antiguos empleados al teléfono, en tres viñetas (la escena pone a cada uno dentro de la suya)
export function vinetas(R, t, n = 3) {
  const { rect, disco, pset, linea } = R; rect(0, 0, 319, 179, hex('#2a2e3a')); for (let y = 0; y < 180; y += 4) rect(0, y, 319, y, hex('#262a36'));
  for (let k = 0; k < n; k++) { const x0 = 8 + k * 104; rect(x0, 30, x0 + 96, 150, C.k); rect(x0 + 2, 32, x0 + 94, 148, [hex('#e8e0d0'), hex('#d8e4ec'), hex('#ece0e8')][k]); rect(x0 + 2, 120, x0 + 94, 148, [hex('#c8b898'), hex('#a8b8c8'), hex('#c8a8b8')][k]); rect(x0 + 2, 120, x0 + 94, 121, hex('#8a8a9a'));
    // la ventana de cada casa: cielo de día, de tarde o de noche, con su árbol o su luna
    rect(x0 + 60, 44, x0 + 86, 72, C.k); rect(x0 + 61, 45, x0 + 85, 71, [C.cielo2, C.tarde3, C.noche2][k]); rect(x0 + 73, 45, x0 + 73, 71, C.k);
    if (k === 0) disco(x0 + 66, 66, 5, C.hierba); if (k === 1) disco(x0 + 80, 64, 3, C.solL); if (k === 2) { disco(x0 + 80, 52, 3, C.papel); pset(x0 + 64 + Math.round(t) % 8, 50, C.blanco); }
    // la lámpara de pie, una planta, un cuadro y la mesita con la taza humeante
    rect(x0 + 10, 60, x0 + 11, 120, C.metalD); rect(x0 + 5, 54, x0 + 16, 60, C.k); rect(x0 + 6, 55, x0 + 15, 59, C.amarilloT);
    rect(x0 + 84, 108, x0 + 92, 120, C.k); rect(x0 + 85, 109, x0 + 91, 119, C.ocre); disco(x0 + 88, 103, 5, C.verde); disco(x0 + 86, 100, 3, C.verdeL);
    rect(x0 + 24, 44, x0 + 42, 58, C.k); rect(x0 + 25, 45, x0 + 41, 57, [hex('#8ab0d8'), hex('#d8a888'), hex('#a8c890')][k]);
    rect(x0 + 52, 112, x0 + 74, 114, C.maderaS); rect(x0 + 54, 114, x0 + 56, 122, C.maderaS); rect(x0 + 70, 114, x0 + 72, 122, C.maderaS); rect(x0 + 60, 107, x0 + 65, 112, C.blanco);
    for (let q = 0; q < 2; q++) { const y = 104 - Math.round(((t * 6 + q * 4 + k * 3) % 8)); pset(x0 + 62 + q, y, C.grisL); } }
}
// el auricular en la mano de un personaje pequeño (junto a la cabeza)
export function auricular(R, x, y, dir = 1) { const { rect } = R; rect(x, y - 6, x + 2 * dir, y + 6, C.k); rect(x - 1 * dir, y - 7, x + 3 * dir, y - 5, C.k); rect(x - 1 * dir, y + 5, x + 3 * dir, y + 7, C.k); }
// la carpeta de la acusación: el sello de la balanza, hojas, y el sello rojo que cae (o.sello 0–1)
export function acusacion(R, t, o = {}) {
  const { rect, disco, pset } = R; rect(0, 0, 319, 179, hex('#3a3e48')); rect(0, 130, 319, 179, C.madera); rect(0, 130, 319, 131, C.maderaL);
  rect(70, 20, 250, 170, C.k); rect(71, 21, 249, 169, C.ocre); rect(84, 30, 236, 166, C.blanco); disco(160, 56, 16, C.k); disco(160, 56, 15, hex('#2a3a7a')); R.icono('balanza', 157, 52, C.oroL, C.k, 1); for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pset(Math.round(160 + Math.cos(a) * 13), Math.round(56 + Math.sin(a) * 13), C.oroL); }
  for (let k = 0; k < 8; k++) rect(96, 82 + k * 8, 224 - (k * 13) % 40, 83 + k * 8, hex('#9aa0ac'));
  const s = o.sello ?? 0; if (s > 0) { const sz = Math.round(lerp(60, 26, Math.min(1, s * 1.3))); rect(196 - sz, 128 - sz / 2, 196 + sz, 128 + sz / 2, C.rojo); rect(199 - sz, 131 - sz / 2, 193 + sz, 125 + sz / 2, C.blanco); R.icono('X', 190, 122, C.rojo, C.blanco, 2); }
}

// la mesa de la cocina de cerca, para ver cuánto es «una cucharadita» de sangre: en el centro, sobre el salvamanteles
// de mimbre, la cucharadita llena; al lado, los tres tubos en su gradilla (tapones en x 228/246/264, y 58–66), el
// azucarero con sus terrones (una mosca ronda el azúcar), la taza humeante, la servilleta de cuadros y el plato con una
// galleta. Detrás, la cocina: la ventana (cristal x 22–88, y 20–68: la escena pinta ahí su nube y su pájaro, y pone el
// alféizar y el gato) con el cielo, las colinas, los tejados, un roble que se mece y una avioneta que cruza; el reloj,
// los armarios, los azulejos con la luz de debajo, los cacharros colgados que se mecen, la encimera con el taco de
// cuchillos, los botes, el frutero y la tetera que echa vapor en el fuego, y la nevera con imanes y un dibujo de niño
export function cucharaMesa(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, kS = (c) => b_mezcla(c, C.k, 0.45);
  // la pared con su textura y la moldura del techo
  rect(0, 0, 319, 111, b_C.cocina); for (let k = 0; k < 220; k++) pset(Math.round(h(k, 1, 370) * 319), Math.round(h(k, 2, 370) * 110), b_C.cocinaS);
  rect(0, 0, 319, 2, b_C.muebleL); rect(0, 3, 319, 3, b_C.cocinaS);
  // la ventana: el cielo (los mismos dos azules arriba y abajo, para la nube y el pájaro de la escena), una avioneta,
  // las colinas, los tejados y el roble a la izquierda
  rect(22, 20, 88, 68, C.cielo2); for (let y = 50; y <= 60; y++) for (let x = 22 + (y & 1); x <= 88; x += 2) if (y > 55 || ((x >> 1) + y) % 3 === 0) pset(x, y, C.cielo3); rect(22, 61, 88, 68, C.cielo3);
  { const u = (t * 7 + 30) % 160; if (u < 70) { const x = Math.round(88 - u), y = 27; rect(x, y, x + 4, y, hex('#e8eef4')); pset(x + 3, y - 1, hex('#e8eef4')); pset(x + 1, y + 1, hex('#8a94a6')); for (let i = 5; i < 22; i += 1) if (x + i <= 88 && (i < 12 || i % 2)) pset(x + i, y, hex('#d8e8f6')); } }
  for (let x = 22; x <= 88; x++) { const hy = 64 - Math.round(1.5 * Math.sin(x * 0.11) + 1.2 * Math.sin(x * 0.27 + 1)); rect(x, hy, x, 68, x < 56 ? hex('#9cb8b0') : hex('#a4c0b8')); }
  for (let k = 0; k < 3; k++) { const cx = 25 + k * 11, w = 4 + (k % 2), b = 68, al = 4; rect(cx - w, b - al, cx + w, b, k % 2 ? hex('#efe2c8') : hex('#e0cdb0')); poligono([[cx - w - 2, b - al + 1], [cx, b - al - 4], [cx + w + 2, b - al + 1]], k % 2 ? C.tejaS : C.tejaSS); pset(cx - 1, b - 2, hex('#6a8aa8')); }
  b_roble(R, 46, 68, t, 7);
  // el marco blanco, el parteluz, el travesaño y las cortinas recogidas
  rect(17, 15, 93, 19, C.blanco); rect(17, 15, 21, 70, C.blanco); rect(89, 15, 93, 70, C.blanco); rect(17, 15, 93, 15, hex('#ffffff')); rect(21, 19, 21, 69, hex('#d8d4cc')); rect(22, 19, 88, 19, hex('#d8d4cc')); rect(16, 14, 94, 14, kS(C.blanco)); rect(16, 14, 16, 70, kS(C.blanco)); rect(94, 14, 94, 70, kS(C.blanco));
  rect(54, 20, 55, 68, C.blanco); rect(56, 20, 56, 68, hex('#d8d4cc')); rect(22, 44, 88, 45, C.blanco); rect(22, 46, 53, 46, hex('#d8d4cc')); rect(57, 46, 88, 46, hex('#d8d4cc'));
  for (const [x0, lado] of [[9, -1], [94, 1]]) for (let y = 14; y <= 70; y++) { const cint = y > 48 && y < 53, w = cint ? 4 : 6 + Math.max(0, (y - 53) * 0.08) + (y > 53 ? Math.sin(t * 1.4 + y * 0.15) * 0.8 : 0); const xa = lado < 0 ? x0 + 8 - Math.round(w) : x0, xb = lado < 0 ? x0 + 7 : x0 + Math.round(w) - 1;
    for (let x = xa; x <= xb; x++) pset(x, y, ((x - xa) % 3) === 2 ? hex('#b84848') : (((x >> 1) + (y >> 1)) & 1) ? hex('#e87070') : C.blanco); if (cint) pset(lado < 0 ? xa : xb, y, C.k); }
  // el reloj de la cocina
  disco(106, 36, 9, kS(C.rojo)); disco(106, 36, 8, C.rojo); disco(106, 36, 6, C.blanco); for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2; pset(Math.round(106 + Math.cos(a) * 5), Math.round(36 + Math.sin(a) * 5), C.k); }
  linea(106, 36, 106, 32, C.k); linea(106, 36, 109, 37, C.k); { const s = Math.floor(t) * Math.PI / 30 - Math.PI / 2; linea(106, 36, 106 + Math.round(Math.cos(s) * 5), 36 + Math.round(Math.sin(s) * 5), C.rojoS); }
  // los azulejos de detrás de la encimera, con la luz de debajo de los armarios
  b_azulejos(R, 92, 52, 249, 85, 10, 5, b_C.azuC, b_C.azuCS, b_C.azuCJ, b_C.azuCL, 2, true);
  for (let y = 52; y < 64; y++) for (let x = 118; x <= 246; x++) if (((x + y) & 1) && (y - 52) < 12 - Math.abs(((x - 118) % 43) - 21) * 0.4) { const c = R.pget(x, y); pset(x, y, b_mezcla(c, hex('#fff4c8'), 0.4)); }
  // los armarios de arriba: tres puertas con su cuarterón y su tirador
  rect(116, 18, 248, 51, kS(b_C.mueble)); for (let k = 0; k < 3; k++) { const x = 118 + k * 43; rect(x, 20, x + 41, 49, b_C.mueble); rect(x + 4, 23, x + 37, 45, b_C.muebleS); rect(x + 5, 24, x + 36, 44, b_C.mueble); rect(x + 5, 24, x + 36, 24, b_C.muebleL); rect(x, 20, x, 49, b_C.muebleL); disco(x + (k === 1 ? 6 : 35), 42, 1.5, C.metalD); }
  rect(116, 50, 248, 51, b_C.muebleD);
  // la barra con los cacharros colgados, que se mecen un poco
  rect(124, 56, 172, 57, C.metalS); disco(124, 56, 1.5, C.metalD); disco(172, 56, 1.5, C.metalD);
  for (let k = 0; k < 4; k++) { const x = 130 + k * 12, m = Math.round(Math.sin(t * 0.9 + k * 1.3) * 1.2), c = [C.metal, C.maderaS, C.metal, hex('#3a3a46')][k]; pset(x, 58, C.metalD); linea(x, 59, x + m, 70, c);
    if (k === 0) { disco(x + m, 73, 3, C.metalD); disco(x + m, 72, 2, C.metal); } else if (k === 1) { rect(x + m - 2, 70, x + m + 2, 76, C.maderaS); rect(x + m - 1, 71, x + m + 1, 75, C.madera); } else if (k === 2) { for (let j = 0; j < 4; j++) { pset(x + m - 2 + j % 2, 71 + j * 2, C.metalL); pset(x + m + 2 - j % 2, 71 + j * 2, C.metalL); } pset(x + m, 79, C.metalL); } else { rect(x + m - 3, 70, x + m + 3, 75, hex('#3a3a46')); for (let j = 0; j < 3; j++) pset(x + m - 2 + j * 2, 72, hex('#6a6a7a')); } }
  // la encimera con lo de encima: el taco de cuchillos, tres botes, el frutero y el fuego con la tetera
  rect(90, 86, 250, 89, b_C.encimera); rect(90, 86, 250, 86, b_C.encimeraL); rect(90, 89, 250, 89, b_C.encimeraS);
  rect(90, 90, 250, 111, b_C.mueble); for (let k = 0; k < 4; k++) { const x = 92 + k * 40; rect(x, 95, x + 37, 110, b_C.muebleS); rect(x + 1, 96, x + 36, 109, b_C.mueble); rect(x + 14, 92, x + 23, 93, C.metalD); } rect(90, 90, 250, 90, b_C.muebleD);
  poligono([[96, 86], [99, 72], [109, 74], [108, 86]], kS(C.madera)); poligono([[97, 86], [100, 73], [108, 75], [107, 86]], C.madera); for (let k = 0; k < 3; k++) rect(100 + k * 3, 68 + k, 101 + k * 3, 73 + k, C.k);
  for (let k = 0; k < 3; k++) { const x = 114 + k * 10, al = [13, 10, 15][k], c = [C.paja, C.maderaL, hex('#4a2e1e')][k]; rect(x, 86 - al, x + 8, 85, kS(b_C.vidrio)); rect(x + 1, 87 - al, x + 7, 85, b_C.vidrio); rect(x + 1, 90 - al, x + 7, 85, c);
    if (k === 0) for (let j = 0; j < 4; j++) rect(x + 2 + j, 89 - al, x + 2 + j, 84, C.pajaS); else for (let j = 0; j < 6; j++) pset(x + 2 + (j * 3) % 5, 91 - al + j * 2, b_mezcla(c, C.k, 0.3)); rect(x, 84 - al, x + 8, 86 - al, k === 1 ? C.rojo : C.metal); pset(x + 6, 88 - al, C.blanco); }
  rect(146, 80, 172, 85, kS(hex('#4a78d0'))); rect(147, 80, 171, 84, hex('#4a78d0')); rect(149, 85, 169, 86, hex('#2a4fa8'));
  disco(153, 77, 4, C.naranja); pset(152, 75, hex('#ffc070')); disco(161, 77, 4, C.rojo); pset(160, 75, hex('#f08080')); rect(161, 72, 161, 73, C.maderaS); for (let i = 0; i < 9; i++) pset(163 + i, 78 - Math.round(Math.sin(i / 8 * Math.PI) * 4), C.amarillo); disco(167, 79, 1.5, hex('#7a3a8a'));
  rect(178, 84, 216, 86, hex('#2a2a32')); for (const x of [184, 206]) rect(x - 5, 84, x + 5, 84, hex('#4a4a56')); for (let k = 0; k < 3; k++) disco(186 + k * 10, 92, 1.5, hex('#3a3a46'));
  disco(190, 76, 9, C.k); disco(190, 76, 8, hex('#d84a3a')); rect(181, 78, 199, 84, C.k); rect(182, 78, 198, 83, hex('#d84a3a')); rect(182, 82, 198, 83, hex('#a8302a')); disco(187, 72, 3, hex('#f08070'));
  rect(188, 66, 192, 68, C.k); linea(183, 72, 186, 64, C.k); linea(186, 64, 194, 64, C.k); linea(194, 64, 197, 72, C.k); poligono([[182, 76], [174, 70], [176, 69], [183, 74]], C.k); poligono([[181, 75], [175, 70], [182, 74]], hex('#d84a3a'));
  for (let k = 0; k < 5; k++) { const u = ((t * 0.55 + k / 5) % 1), x = Math.round(174 - u * 6 + Math.sin(u * 6 + k) * 2), y = Math.round(68 - u * 20), r = u < 0.3 ? 1 : 2; disco(x, y, r, b_mezcla(C.blanco, b_C.azuC, u)); }
  // la nevera, con los imanes, un dibujo de niño, una foto y la lista de la compra (rayas)
  rect(250, 22, 319, 111, kS(b_C.nevera)); rect(251, 23, 319, 50, b_C.nevera); rect(251, 52, 319, 111, b_C.nevera); rect(251, 51, 319, 51, b_C.neveraS); rect(314, 23, 319, 111, b_C.neveraS); rect(251, 23, 319, 23, b_C.neveraL);
  rect(255, 36, 257, 48, C.metalS); rect(255, 56, 257, 78, C.metalS); rect(255, 36, 255, 48, C.metalL); rect(255, 56, 255, 78, C.metalL);
  rect(266, 57, 290, 79, C.grisL); rect(267, 58, 289, 78, C.blanco); disco(285, 62, 3, C.amarillo); poligono([[271, 69], [277, 63], [283, 69]], C.rojo); rect(272, 69, 282, 75, hex('#f4c070')); rect(276, 71, 278, 75, C.maderaS); rect(267, 76, 289, 77, C.hierba); pset(286, 72, C.k); rect(286, 73, 286, 75, C.k); disco(276, 57, 1.5, C.azulL);
  rect(294, 60, 310, 76, C.grisL); rect(295, 61, 309, 75, C.cielo2); rect(295, 71, 309, 75, C.hierba); disco(302, 68, 2, b_C.piel); rect(301, 70, 303, 73, C.rojo); disco(302, 59, 1.5, C.rojo);
  rect(270, 84, 284, 104, C.grisL); rect(271, 85, 283, 103, hex('#fbf8e8')); for (let k = 0; k < 6; k++) rect(273, 88 + k * 3, 276 + (k * 5) % 7, 88 + k * 3, C.azul); disco(277, 84, 1.5, C.verdeL);
  for (const [x, y, c] of [[296, 88, C.naranja], [304, 94, C.verdeL], [292, 100, C.rosa]]) { rect(x - 2, y - 2, x + 2, y + 2, kS(c)); rect(x - 1, y - 1, x + 1, y + 1, c); }
  // la mesa de madera con el sol de la ventana
  b_madera(R, 0, 112, 319, 179, b_C.mesa, b_C.mesaS, b_C.mesaL, b_C.mesaD, 1, 13); b_luz(R, 6, 113, 84, 179, 0.5, 0.22);
  // el salvamanteles de mimbre bajo la cuchara
  for (let j = -18; j <= 18; j++) { const w = Math.round(34 * Math.sqrt(1 - (j / 19) ** 2)); for (let x = 160 - w; x <= 160 + w; x++) { const y = 146 + j, e = ((x - 160) / 34) ** 2 + (j / 19) ** 2; pset(x, y, e > 0.86 ? C.pajaS : (((x >> 2) + (y >> 1)) & 1) ? C.paja : C.pajaL); } }
  for (let a = 0; a < 6.28; a += 0.05) pset(Math.round(160 + Math.cos(a) * 29), Math.round(146 + Math.sin(a) * 15), C.pajaS);
  // la cucharadita llena
  b_cuchara(R, 160, 142, 24, 14, 64, 156, t);
  // la gradilla con los tres tubos llenos
  b_sombra(R, 246, 121, 32, 2, 0.8); rect(216, 98, 276, 100, C.k); rect(217, 99, 275, 99, C.metalL); for (const x of [216, 273]) { rect(x, 98, x + 3, 121, C.k); rect(x + 1, 99, x + 2, 120, C.metal); } rect(214, 118, 278, 121, C.k); rect(215, 119, 277, 120, C.metalS);
  for (let k = 0; k < 3; k++) b_tubo(R, 228 + k * 18, 66, 120, 5, 0.78, [C.rojoW, C.tealT, hex('#8a5ad8')][k], { tapon: 8, hueco: 5 });
  rect(216, 108, 276, 112, C.k); rect(217, 109, 275, 111, C.metalL); rect(217, 111, 275, 111, C.metalS);
  // el azucarero de loza con su cucharilla, los terrones y una mosca que ronda el azúcar
  b_sombra(R, 33, 121, 17, 2, 0.8); rect(18, 98, 48, 120, C.k); rect(19, 99, 47, 119, C.blanco); rect(19, 116, 47, 119, hex('#e4e2dc')); rect(42, 99, 47, 119, hex('#e8e6e0')); rect(19, 104, 47, 107, hex('#4a78d0')); for (let x = 21; x < 46; x += 4) pset(x, 105, C.blanco);
  rect(16, 94, 50, 99, C.k); rect(17, 95, 49, 98, C.blanco); rect(17, 95, 49, 95, hex('#ffffff')); rect(29, 90, 37, 94, C.k); rect(30, 91, 36, 93, C.blanco); linea(44, 96, 52, 86, C.k); linea(45, 96, 53, 86, C.metalL);
  for (const [x, y] of [[54, 114], [62, 115], [58, 108]]) { rect(x, y, x + 6, y + 6, C.k); rect(x + 1, y + 1, x + 5, y + 5, C.blanco); rect(x + 1, y + 5, x + 5, y + 5, hex('#dcdad4')); pset(x + 2, y + 2, hex('#ffffff')); }
  for (let k = 0; k < 10; k++) pset(Math.round(52 + h(k, 1, 371) * 24), Math.round(122 + h(k, 2, 371) * 5), C.blanco);
  { const a = t * 2.6, r = 9 + Math.sin(t * 1.3) * 3, fx = Math.round(40 + Math.cos(a) * r * 1.4), fy = Math.round(84 + Math.sin(a * 1.3) * r * 0.6); pset(fx, fy, C.k); pset(fx + 1, fy, C.k); pset(fx, fy - 1, Math.floor(t * 20) % 2 ? C.grisL : C.blanco); pset(fx + 1, fy - 1, Math.floor(t * 20) % 2 ? C.blanco : C.grisL); }
  // la taza humeante
  b_sombra(R, 299, 121, 15, 2, 0.8); rect(286, 96, 312, 120, C.k); rect(287, 97, 311, 119, C.blanco); rect(306, 97, 311, 119, hex('#e4e2dc')); rect(287, 104, 311, 106, C.rojo); rect(287, 97, 311, 99, hex('#5a3420')); rect(287, 97, 311, 97, C.k);
  rect(312, 101, 317, 114, C.k); rect(313, 103, 315, 112, C.blanco); rect(312, 103, 312, 112, C.k);
  for (let q = 0; q < 6; q++) { const u = ((t * 0.5 + q / 6) % 1), x = Math.round(296 + (q % 3) * 5 + Math.sin(u * 7 + q) * 2), y = Math.round(93 - u * 18); pset(x, y, b_mezcla(C.blanco, b_C.neveraS, u)); if (u < 0.6) pset(x, y - 1, C.blanco); }
  // la servilleta de cuadros y el plato con una galleta y sus migas
  poligono([[14, 148], [58, 142], [64, 170], [20, 176]], C.k); poligono([[16, 149], [57, 143], [62, 169], [21, 174]], (x, y) => ((((x >> 2) + (y >> 2)) & 1) ? hex('#8ab0e8') : C.blanco)); linea(16, 149, 62, 169, hex('#6a90c8'));
  b_sombra(R, 268, 166, 28, 4, 0.8); for (let j = -9; j <= 9; j++) for (let i = -28; i <= 28; i++) { const e = (i / 28) ** 2 + (j / 9) ** 2; if (e <= 1) pset(268 + i, 160 + j, e > 0.9 ? C.k : e > 0.55 ? C.blanco : hex('#eceae4')); }
  disco(268, 158, 8, C.k); disco(268, 158, 7, C.ocre); disco(267, 157, 5, hex('#e8b060')); for (const [dx, dy] of [[-3, -2], [2, -3], [3, 2], [-2, 3], [0, 0]]) pset(268 + dx, 158 + dy, C.maderaD); for (let k = 0; k < 6; k++) pset(Math.round(250 + h(k, 3, 372) * 36), Math.round(161 + h(k, 4, 372) * 4), C.ocreS);
}
// El calendario de pared al amanecer: el papel pintado (rayas y florecitas) con su moldura; el clavo y el cordel del que
// cuelga el calendario (la cabecera roja con el año, los restos de las hojas arrancadas, el día grande, la fila de los días
// de la semana con el día marcado y la esquina que se levanta con la brisa); las cortinas a los lados de la ventana (la
// ventana la pone la escena) que se mecen; la mancha de sol de otra ventana, que baja despacio por la pared con sus motas;
// el reloj redondo con el segundero; un cuadrito; el radiador; la mesa con las llaves, la carta, un bolígrafo y una
// planta. o.u (0–1): las hojas se sueltan y salen volando hasta quedarse en el 30 (y se van amontonando en la mesa)
export function calendario(R, t, o = {}) {
  const { rect, pset, disco, poligono, linea } = R, u = o.u ?? 1, K = C.k, Q = h_CAL;
  // la pared empapelada y la moldura del techo
  rect(0, 0, 319, 159, Q.pared); for (let x = 0; x < 320; x += 14) rect(x, 8, x + 6, 159, Q.raya);
  for (let y = 18; y < 156; y += 14) for (let x = 10 + ((y / 14) % 2 ? 7 : 0); x < 320; x += 14) { pset(x, y, Q.flor); pset(x - 1, y + 1, Q.flor); pset(x + 1, y + 1, Q.flor); pset(x, y + 2, Q.flor); pset(x, y + 1, Q.florC); }
  rect(0, 0, 319, 5, Q.moldura); rect(0, 6, 319, 6, Q.molduraS); rect(0, 7, 319, 7, Q.moldura); for (let x = 2; x < 320; x += 5) pset(x, 3, Q.molduraS);
  // la mancha de sol de otra ventana, con la cruz del marco, que baja despacio mientras sale el sol; motas en la luz
  const sy = Math.round(96 + Math.min(12, t * 0.7));
  for (let y = sy; y < Math.min(158, sy + 54); y++) { const d = (y - sy) * 0.42, xa = Math.round(220 + d), xb = Math.round(306 + d * 0.5), xm = (xa + xb) >> 1;
    for (let x = xa; x <= Math.min(319, xb); x++) { if (Math.abs(x - xm) < 2 || Math.abs(y - sy - 26) < 2) continue; const borde = x - xa < 2 || xb - x < 2 || y - sy < 2 || sy + 53 - y < 2; if (!borde || (x + y) % 2) h_aclara(R, x, y, 0.34, [255, 214, 150]); } }
  for (let k = 0; k < 9; k++) { const fy = (h(k, 1, 141) * 50 + t * (1.5 + h(k, 2, 141) * 2)) % 50, x = Math.round(228 + h(k, 3, 141) * 80 + Math.sin(t * 0.5 + k) * 3), y = Math.round(sy + 52 - fy); if (Math.sin(t * 1.2 + k * 1.7) > -0.3) pset(x, y, hex('#fff4d0')); }
  // las cortinas a los lados de la ventana, con su barra; se mecen con la brisa, más abajo que arriba
  rect(0, 11, 112, 13, K); rect(0, 12, 112, 12, C.metalL); disco(112, 12, 2, K); disco(112, 12, 1, C.metalL);
  for (const [x0, w] of [[0, 12], [94, 14]]) for (let i = 0; i < w; i++) { const f = Math.sin(i * 1.15 + x0), col = f > 0.35 ? Q.cortinaL : f < -0.35 ? Q.cortinaS : Q.cortina;
    for (let y = 14; y < 122; y++) { const sw = Math.round(Math.sin(t * 1.1 + x0 + y * 0.03) * 2.2 * ((y - 14) / 108) ** 1.5); pset(x0 + i + sw, y, col); }
    pset(x0 + i, 13, i % 3 ? K : C.metalD); pset(x0 + i + Math.round(Math.sin(t * 1.1 + x0 + 3.6) * 2.2), 122, i % 2 ? Q.cortinaS : Q.cortina); }
  // el cuadrito (un paisaje de costa con el sol), colgado de su clavo
  linea(238, 12, 226, 19, Q.cordel); linea(238, 12, 250, 19, Q.cordel); disco(238, 12, 1, C.metalD);
  rect(222, 19, 254, 45, K); rect(223, 20, 253, 44, C.maderaL); rect(223, 44, 253, 44, C.maderaS); rect(226, 23, 250, 41, K);
  for (let y = 24; y <= 40; y++) rect(227, y, 249, y, y < 30 ? hex('#f0b080') : y < 34 ? hex('#f8d8a0') : hex('#4a88c0')); disco(242, 33, 3, C.sol); rect(227, 34, 249, 34, hex('#7ab0d8'));
  for (let k = 0; k < 3; k++) rect(229 + k * 7 + Math.round(Math.sin(t + k)), 37 + (k % 2) * 2, 232 + k * 7 + Math.round(Math.sin(t + k)), 37 + (k % 2) * 2, hex('#a8d0ec'));
  // el reloj redondo de madera, con el segundero (son casi las seis y media)
  h_reloj(R, 265, 84, 21, t, 6.47, C.maderaS);
  // el radiador bajo la ventana, con su llave
  rect(14, 122, 92, 155, K); rect(13, 120, 93, 122, K); rect(14, 121, 92, 121, Q.radiadorL);
  for (let x = 16; x < 90; x += 5) { rect(x, 123, x + 3, 154, Q.radiador); rect(x, 123, x, 154, Q.radiadorL); rect(x + 3, 123, x + 3, 154, Q.radiadorS); }
  rect(18, 155, 20, 159, K); rect(86, 155, 88, 159, K); disco(93, 150, 2, K); disco(93, 150, 1, C.rojoS);
  // la mesa: tablero con su canto, vetas y el cajón
  rect(0, 160, 319, 179, C.madera); rect(0, 160, 319, 161, C.maderaL); rect(0, 166, 319, 166, K); rect(0, 167, 319, 167, C.maderaL); rect(0, 165, 319, 165, C.maderaS);
  for (let k = 0; k < 6; k++) { const y = 169 + k * 2; for (let x = 0; x < 320; x++) if (h(x >> 3, k, 142) < 0.6) pset(x, y + Math.round(Math.sin(x * 0.05 + k)), C.maderaS); }
  rect(120, 170, 200, 179, K); rect(121, 171, 199, 179, C.madera); rect(121, 171, 199, 171, C.maderaL); rect(156, 174, 164, 175, C.oroS); rect(156, 174, 164, 174, C.oro);
  // en la mesa: las llaves con su llavero, la carta con el sello, un bolígrafo y la planta en su maceta
  rect(70, 156, 75, 160, K); rect(71, 157, 74, 159, C.rojo); disco(79, 158, 3, K); disco(79, 158, 2, C.metalL); disco(79, 158, 1, C.madera);
  rect(82, 157, 91, 158, K); rect(82, 157, 90, 157, C.metal); pset(88, 159, K); pset(90, 159, K); rect(81, 153, 88, 154, K); rect(81, 153, 87, 153, C.oro);
  poligono([[212, 160], [218, 151], [248, 151], [242, 160]], K); poligono([[214, 159], [219, 152], [247, 152], [241, 159]], C.blanco); linea(219, 152, 231, 157, C.grisL); linea(247, 152, 231, 157, C.grisL); rect(237, 153, 240, 155, hex('#4a6aa8'));
  linea(254, 158, 270, 154, K); linea(255, 158, 269, 155, hex('#2a4fa8')); pset(270, 154, C.oro);
  rect(290, 148, 304, 160, K); rect(291, 149, 303, 159, C.tejaS); rect(289, 147, 305, 150, K); rect(290, 148, 304, 149, hex('#d06848'));
  for (const [x, y, r] of [[294, 143, 3], [300, 142, 3], [297, 139, 3], [292, 139, 2], [302, 138, 2]]) { disco(x, y, r + 1, K); disco(x, y, r, C.verde); pset(x - 1, y - 1, C.verdeL); }
  // las hojas que ya han volado, amontonadas en la mesa
  const dia = u < 1 ? 1 + Math.floor(u * 29) : 30, mont = Math.min(6, Math.ceil((dia - 1) / 5));
  for (let k = 0; k < mont; k++) { const x = 250 + Math.round(h(k, 1, 143) * 18), y = 162 - k; poligono([[x, y], [x + 22, y - 1], [x + 24, y + 2], [x + 2, y + 3]], K); poligono([[x + 1, y], [x + 22, y], [x + 23, y + 2], [x + 2, y + 2]], k % 2 ? C.blanco : hex('#ece8e0')); }
  // el calendario: el clavo y el cordel, su sombra en la pared, la cabecera roja con el año y los restos de las hojas
  disco(160, 10, 2, K); disco(160, 10, 1, C.metalL); linea(159, 11, 141, 22, Q.cordel); linea(161, 11, 179, 22, Q.cordel);
  rect(113, 27, 213, 153, Q.sombra);
  rect(110, 24, 210, 150, K); rect(112, 26, 208, 148, C.blanco); rect(112, 140, 208, 148, hex('#ece8e0')); rect(112, 147, 208, 148, hex('#d8d0c0'));
  rect(112, 26, 208, 52, C.rojo); rect(112, 26, 208, 27, hex('#e05a5a')); rect(112, 51, 208, 52, C.rojoS); R.numero('2023', 160, 46, { tam: 16, centro: true, color: C.blanco });
  for (let x = 113; x < 208; x += 2) { const a = 1 + Math.floor(h(x, 0, 140) * 3); rect(x, 53, x + 1, 53 + a, hex('#e8e4dc')); pset(x, 53 + a, hex('#c8c4bc')); }
  for (let k = 0; k < 2; k++) { disco(140 + k * 40, 24, 3, K); disco(140 + k * 40, 24, 2, C.metal); pset(139 + k * 40, 23, C.metalL); }
  // la hoja del día: el número grande, la fila de los días de la semana (el del día marcado) y la esquina que se levanta
  R.numero(String(dia), 160, 116, { tam: 32, centro: true, color: K });
  for (let k = 0; k < 7; k++) { const x = 136 + k * 7; rect(x, 128, x + 4, 132, k === dia % 7 ? C.rojo : C.grisL); }
  { const L = u > 0 && u < 1 ? 9 : 4 + Math.round(Math.sin(t * 1.7) + 1); poligono([[208 - L, 148], [208, 148 - L], [208, 148]], hex('#d8d0c0')); poligono([[208 - L, 148], [208, 148 - L], [208 - L, 148 - L]], K); poligono([[208 - L + 1, 147], [207, 148 - L + 1], [208 - L + 1, 148 - L + 1]], hex('#f4f0e8')); }
  // las hojas que se sueltan: la de encima se levanta desde abajo y las anteriores salen volando, girando, hacia la mesa
  if (u > 0 && u < 1) {
    const yl = Math.round(148 - ((t * 14) % 1) * 92); rect(112, yl, 208, 148, hex('#f4f0e8')); rect(112, yl, 208, yl + 1, C.grisL); rect(112, yl + 2, 208, yl + 2, hex('#d8d4cc'));
    for (let k = 0; k < 3; k++) { const p = (t * 2.2 + k / 3) % 1, cx = 176 + p * 120, cy = 80 - p * 30 + p * p * 80, a = p * 6 + k, s = 1 - p * 0.4, c = Math.cos(a), sn = Math.sin(a), q = (x, y) => [Math.round(cx + (x * c - y * sn) * s), Math.round(cy + (x * sn + y * c) * s)];
      poligono([q(-15, -17), q(15, -17), q(15, 17), q(-15, 17)], K); poligono([q(-14, -16), q(14, -16), q(14, 16), q(-14, 16)], k % 2 ? C.blanco : hex('#f4f0e8')); poligono([q(-7, -6), q(7, -6), q(7, 8), q(-7, 8)], C.grisL); }
  }
}
// el visor de la cámara del documental, en panorámico: la calle a la caída de la tarde (calle()) dentro del encuadre y en
// penumbra fuera de él; las esquinas del encuadre que respiran, la retícula de tercios en puntos, el recuadro del enfoque
// que sigue la cara de ella (verde cuando enfoca), el punto rojo que parpadea, la batería, los vúmetros del sonido que
// bailan, el contador de tiempo que corre y el de días (o.dia) con su hojita de calendario; ella entra andando hasta el
// centro y allí se queda mirando a cámara (sin volver atrás de golpe). Nada del visor entra en la zona de Atom
export function visor(R, t, o = {}) {
  const { rect, pset, disco } = R; rect(0, 88, 319, 112, C.hierbaS);   // fondo de seguridad: entre casa y casa la calle deja huecos
  calle(R, t, { tarde: true });
  const u = Math.min(1, t / 9), x = Math.round(70 + u * 84), anda = u < 1;
  R.actor(ELENCO_CHIBI.holmes, x, 120, t, { dir: 1, anda, sonrisa: !anda && (t % 5) > 1.5 });
  // fuera del encuadre, en penumbra (arriba y abajo: el panorámico)
  tinte(R, 0, 47, [16, 16, 24], 0.55); tinte(R, 166, 179, [16, 16, 24], 0.55);
  // la retícula de tercios, en puntos
  for (let y = 52; y < 164; y += 6) { pset(113, y, hex('#d8d8e0')); pset(207, y, hex('#d8d8e0')); } for (let xx = 24; xx < 298; xx += 6) { pset(xx, 85, hex('#d8d8e0')); pset(xx, 126, hex('#d8d8e0')); }
  // las esquinas del encuadre, que respiran un píxel
  const b = Math.floor(t * 1.2) % 2;
  for (const [cx, cy, dx, dy] of [[20 - b, 50 - b, 1, 1], [300 + b, 50 - b, -1, 1], [20 - b, 162 + b, 1, -1], [300 + b, 162 + b, -1, -1]]) { rect(Math.min(cx, cx + dx * 14), Math.min(cy, cy + dy), Math.max(cx, cx + dx * 14), Math.max(cy, cy + dy), C.blanco); rect(Math.min(cx, cx + dx), Math.min(cy, cy + dy * 14), Math.max(cx, cx + dx), Math.max(cy, cy + dy * 14), C.blanco); }
  // el recuadro del enfoque en la cara: blanco mientras busca, verde cuando ella se para
  { const fx = x + 1, fy = 95, c = anda && Math.floor(t * 4) % 2 ? C.blanco : anda ? hex('#c8c8d0') : C.verdeL; for (const [ax, ay, ex, ey] of [[fx, fy, 1, 1], [fx + 13, fy, -1, 1], [fx, fy + 12, 1, -1], [fx + 13, fy + 12, -1, -1]]) { rect(Math.min(ax, ax + ex * 3), ay, Math.max(ax, ax + ex * 3), ay, c); rect(ax, Math.min(ay, ay + ey * 3), ax, Math.max(ay, ay + ey * 3), c); } }
  // el punto rojo de grabación, el contador de tiempo y la batería
  if (Math.floor(t * 2) % 2) { disco(32, 59, 3, C.rojo); pset(31, 58, hex('#ff9a9a')); } else disco(32, 59, 3, hex('#5a1a1a'));
  { const s = Math.floor(t) + 754, cad = `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; R.numero(cad, 42, 63, { color: C.blanco, fina: true }); }
  rect(270, 55, 286, 62, C.blanco); rect(271, 56, 285, 61, hex('#202028')); rect(287, 57, 288, 60, C.blanco); for (let k = 0; k < 3; k++) rect(272 + k * 5, 57, 275 + k * 5, 60, k < 2 || Math.floor(t * 1.5) % 2 ? hex('#8ae88a') : hex('#202028'));
  // los vúmetros del sonido, que bailan con la voz y la calle
  for (const [vx, k] of [[26, 0], [31, 1]]) { const n = Math.round(6 + Math.abs(Math.sin(t * 7.3 + k * 1.9) * Math.sin(t * 3.1 + k)) * 10); for (let i = 0; i < 16; i++) rect(vx, 157 - i * 2, vx + 3, 157 - i * 2, i < n ? (i > 13 ? C.rojo : i > 10 ? C.amarillo : hex('#6ad86a')) : hex('#3a3a44')); }
  // el contador de días, abajo a la derecha, con su hojita de calendario
  rect(256, 150, 264, 159, C.blanco); rect(257, 152, 263, 158, hex('#202028')); rect(256, 150, 264, 151, C.rojo); for (const dx of [258, 262]) pset(dx, 149, C.blanco);
  R.numero(String(o.dia ?? 34), 280, 159, { color: C.blanco, centro: true });
}
// colores de la farmacia y de sus insertos (las piezas del grupo A llevan el prefijo a_)
const a_F = pal({
  techo: '#d8d4cc', techoS: '#c6c2ba', techoL: '#e4e0d8', troffer: '#aeaaa2', tubo: '#fdfcf6', tuboS: '#e6e6de', tuboOff: '#b8b8b4',
  pared: '#f0ece4', paredS: '#e0dcd2', paredL: '#faf8f2', rojoS: '#a81e2c', rojoL: '#f0606e', rosa: '#f8c8c8',
  gond: '#c8ccd4', gondS: '#aab0ba', gondD: '#6e7480', gondL: '#e4e8ee', aguj: '#b2b8c2', tira: '#f6f6f2', tiraS: '#c8c8c0',
  fondoM: '#ddd6ca', estM: '#b4aa9a', estF: '#ebe5da', ambar: '#d08a2a', ambarS: '#985a1a', ambarL: '#f0b860',
  encim: '#f6f2ea', encimS: '#cfc6b8', frente: '#d4cab8', frenteS: '#beb29e', frenteD: '#8e8474', pantalla: '#2a3a5a', pantallaL: '#6a9ad8',
  suelo: '#ebe7df', suelo2: '#e3dfd6', junta: '#cdc8be', brillo: '#fbfaf6', sombra: '#d4d0c6', luzSol: '#fbf4dc', alfombra: '#4a4a56', alfombraS: '#3a3a44',
  marco: '#4e5664', marcoL: '#8a94a4', vidrioL: '#eaf6fc',
  fachada: '#ead8b4', fachadaS: '#cdb68e', teja: '#c0583a', tejaS: '#8e3a26', ventana: '#3a5a7a', ventanaL: '#8ab8d8', toldo: '#2a7a5a', toldoL: '#4a9a7a',
  asfalto: '#6a6a76', bordillo: '#d4d0c8', copa: '#4a8a3a', copaS: '#2e6a2a',
  panel: '#fafafc', panelS: '#ececf2', panelD: '#d6d6e0', tealL: '#6ad0c8',
  persiana: '#c4c6cc', persianaS: '#a2a4ac', persianaL: '#dedfe4', papelT: '#f0e6c8', maceta: '#e8e4dc', macetaS: '#bab4a8',
  mesa: '#f4f4f8', mesaS: '#dcdce6', mesaB: '#c8c8d4', empapador: '#eef4fa', empapadorS: '#d4e0ee',
  // el panel del rincón visto de cerca y el papel de sus carteles: con el rojo por debajo de 214 o el azul por debajo de 196,
  // para que las escenas que pintan clientes desenfocados solo sobre lo muy claro no los pongan delante del panel
  menta: '#d0eae6', mentaL: '#d4f6f2', mentaS: '#b8d8d4', mentaD: '#9cc4c0', carta: '#f3ebc0', cartaS: '#ddd0a0',
});
// colores de los productos de las estanterías: luz, cuerpo y sombra
const a_PROD = [['#f48080', '#e04a4a', '#a83030'], ['#86b4f4', '#4a8ae8', '#2e5ea8'], ['#fae080', '#f0c040', '#b88a20'], ['#8ad88a', '#5ab85a', '#3a8a3a'],
  ['#f6aad2', '#e87ab8', '#b05088'], ['#ffffff', '#eeeeea', '#c0c0bc'], ['#b896ec', '#8a5ad8', '#5e3aa0'], ['#f4b070', '#e8803a', '#b05a24'], ['#7ad8d8', '#3ab0b0', '#2a8080']].map((a) => a.map(hex));
// la bata blanca de los farmacéuticos y la ropa de los clientes del fondo (bustos)
const a_BATA = tela('#f4f4f8', '#c8c8d4', { W: '#e0e0e8', V: '#2a1e1a', H: '#2a1e1a' });
const a_CLIENTES = [tela('#e8803a', '#b05a24', { H: '#6a3a1a', h: '#8a5428' }), tela('#4a8ae8', '#2e5ea8', { H: '#1c1424', V: '#7a4a2a' }), tela('#8a5ad8', '#5e3aa0', { H: '#d8b860', h: '#b8903a' })];
// pictogramas pequeños de carteles (sin letras): cápsula, corazón, sol, gota, cruz
const a_PICTO = {
  capsula: ['..###.', '.#..##', '#..###', '##.##.', '.###..'],
  corazon: ['.#.#.', '#####', '#####', '.###.', '..#..'],
  sol: ['#.#.#', '.###.', '#####', '.###.', '#.#.#'],
  gota: ['..#..', '.###.', '#####', '#####', '.###.'],
  cruz: ['.#.', '###', '.#.'],
};

// recorta un rectángulo a la zona cl = [x0, y0, x1, y1] (R.recorte solo recorta pset, linea, poligono y disco)
function a_rect(R, cl, x0, y0, x1, y1, c) { R.rect(Math.max(Math.round(x0), cl[0]), Math.max(Math.round(y0), cl[1]), Math.min(Math.round(x1), cl[2]), Math.min(Math.round(y1), cl[3]), c); }
// un pictograma de a_PICTO (una rejilla de «#») a escala s y de un color
function a_picto(R, filas, x, y, s, c) { filas.forEach((f, j) => { for (let i = 0; i < f.length; i++) if (f[i] === '#') R.rect(x + i * s, y + j * s, x + i * s + s - 1, y + j * s + s - 1, c); }); }

// un producto de estantería apoyado en yb (w de ancho, alto de alto): tipo 0 caja con franja, 1 frasco con hombros, cuello
// y tapón, 2 bote bajo con tapa, 3 tubo o espray con su tapón; col = [luz, cuerpo, sombra]
function a_producto(R, x, yb, w, alto, [l, c, s], tipo) {
  const { rect, pset } = R, y0 = yb - alto;
  if (tipo === 0) {
    rect(x, y0, x + w, yb, C.k); rect(x + 1, y0 + 1, x + w - 1, yb, c); rect(x + 1, y0 + 1, x + w - 1, y0 + 1, l); rect(x + w - 1, y0 + 2, x + w - 1, yb, s);
    const m = y0 + Math.max(2, alto >> 1); rect(x + 1, m, x + w - 2, m + 1, C.blanco); if (w > 4) pset(x + 2, m, c);
  } else if (tipo === 1) {
    const cx = x + (w >> 1); rect(x, y0 + 3, x + w, yb, C.k); rect(x + 1, y0 + 4, x + w - 1, yb, c); rect(x + 1, y0 + 4, x + 1, yb - 1, l); rect(x + w - 1, y0 + 5, x + w - 1, yb, s);
    pset(x, y0 + 3, a_F.gond); pset(x + w, y0 + 3, a_F.gond); rect(cx - 1, y0, cx + 1, y0 + 3, C.k); pset(cx, y0 + 1, s);
    if (alto > 8) rect(x + 1, yb - 4, x + w - 1, yb - 3, C.blanco);
  } else if (tipo === 2) {
    const y = Math.max(y0, yb - 6); rect(x, y, x + w, yb, C.k); rect(x + 1, y + 2, x + w - 1, yb, c); rect(x + 1, y + 1, x + w - 1, y + 1, s); rect(x + 1, y + 2, x + 1, yb, l); pset(x + w - 1, yb - 1, s);
  } else {
    rect(x, y0 + 2, x + w, yb, C.k); rect(x + 1, y0 + 3, x + w - 1, yb, C.blanco); rect(x + 1, y0 + 3, x + w - 1, y0 + 5, c); rect(x + w - 1, y0 + 6, x + w - 1, yb, a_F.tiraS);
    rect(x + 1, y0, x + w - 1, y0 + 2, C.k); rect(x + 2, y0 + 1, x + w - 2, y0 + 1, s);
  }
}

// una góndola de pasillo vista de frente (x0–x1, y0–y1): cabecera de color con su pictograma, chapa perforada, baldas con
// la tira de precios y etiquetas de oferta colgando, productos variados (cajas, frascos, botes, tubos) con algún hueco, y el
// zócalo. o.filas, o.semilla, o.cab (color de la cabecera), o.picto, o.lado (1: se ve el costado derecho; −1: el izquierdo)
function a_gondola(R, x0, x1, y0, y1, o = {}) {
  const { rect, pset } = R, s = o.semilla ?? 0, filas = o.filas ?? 5, cab = o.cab ?? hex('#2a5aa8');
  rect(x0, y0, x1, y1, C.k); rect(x0 + 1, y0 + 1, x1 - 1, y1, a_F.gond);
  for (let y = y0 + 12; y < y1 - 10; y += 3) for (let x = x0 + 4 + (((y - y0) / 3) & 1) * 2; x < x1 - 3; x += 4) pset(x, y, a_F.aguj);
  rect(x0 + 1, y0 + 1, x1 - 1, y0 + 7, cab); rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, a_F.gondL); rect(x0 + 1, y0 + 8, x1 - 1, y0 + 8, C.k);
  if (o.picto) R.dibujo(o.picto, Math.round((x0 + x1) / 2) - (o.picto[0].length >> 1), y0 + 2, 1, { '#': C.blanco });
  rect(x0 + 1, y0 + 9, x0 + 2, y1, a_F.gondD); rect(x1 - 2, y0 + 9, x1 - 1, y1, a_F.gondD);
  const yI = y0 + 10, paso = Math.floor((y1 - 9 - yI) / filas);
  for (let j = 0; j < filas; j++) {
    const yb = yI + (j + 1) * paso - 3;
    for (let x = x0 + 4; ;) {
      const w = 4 + Math.floor(h(x, j + s, 31) * 4); if (x + w > x1 - 4) break;
      if (h(x, j + s, 30) > 0.08) a_producto(R, x, yb, w, Math.min(paso - 4, 5 + Math.floor(h(x, j + s, 33) * (paso - 8))), a_PROD[Math.floor(h(x, j + s, 32) * a_PROD.length)], Math.floor(h(x, j + s, 34) * 4));
      x += w + 2;
    }
    rect(x0 + 3, yb + 1, x1 - 3, yb + 2, a_F.tira); rect(x0 + 3, yb + 3, x1 - 3, yb + 3, a_F.gondD);
    for (let x = x0 + 6; x < x1 - 6; x += 9) pset(x, yb + 2, a_F.tiraS);   // las etiquetas de precio
    if (j === 2 || (j === filas - 1 && s % 2)) for (let k = 0; k < 3; k++) { const px = x0 + 8 + k * Math.floor((x1 - x0 - 16) / 3); rect(px, yb + 2, px + 8, yb + 6, C.k); rect(px + 1, yb + 3, px + 7, yb + 5, C.amarilloT); pset(px + 3, yb + 4, C.rojoW); pset(px + 5, yb + 4, C.rojoW); }
  }
  rect(x0 + 1, y1 - 8, x1 - 1, y1, a_F.gondD); rect(x0 + 1, y1 - 8, x1 - 1, y1 - 8, a_F.gondS);
  if (o.lado) { const xs = o.lado > 0 ? x1 - 4 : x0 + 1; rect(xs, y0 + 9, xs + 3, y1, a_F.gondS); rect(o.lado > 0 ? xs : xs + 3, y0 + 9, o.lado > 0 ? xs : xs + 3, y1, a_F.gondD); }
}

// un vehículo que pasa por la calle de la puerta (dibujado con rc, el rectángulo recortado): 0 coche azul, 1 furgoneta
// blanca, 2 coche rojo, 3 ciclista; x es el morro trasero, suelo la calzada, d el sentido
function a_vehiculo(R, rc, x, suelo, tipo, d, t) {
  const { disco, pset } = R, X = (i) => (d > 0 ? x + i : x - i);
  const caja = (i0, y0, i1, y1, c) => rc(Math.min(X(i0), X(i1)), y0, Math.max(X(i0), X(i1)), y1, c);
  if (tipo === 3) { for (const i of [2, 11]) { disco(X(i), suelo - 3, 3, C.k); disco(X(i), suelo - 3, 2, a_F.asfalto); } R.linea(X(2), suelo - 3, X(11), suelo - 3, C.rojo); caja(5, suelo - 13, 8, suelo - 6, C.amarillo); caja(5, suelo - 16, 8, suelo - 14, hex('#f6c290')); pset(X(6 + (Math.floor(t * 6) % 2)), suelo - 4, C.k); return; }
  const c = [hex('#3a6ac8'), C.blanco, C.rojo][tipo], cs = [hex('#2a4a98'), hex('#c8c8d0'), C.rojoS][tipo], largo = tipo === 1 ? 26 : 22, alto = tipo === 1 ? 14 : 9;
  caja(0, suelo - 4 - alto, largo, suelo - 3, C.k); caja(1, suelo - 3 - alto, largo - 1, suelo - 4, c); caja(1, suelo - 5, largo - 1, suelo - 4, cs);
  if (tipo === 1) { caja(largo - 8, suelo - 3 - alto, largo - 2, suelo - 10, C.cristal); caja(4, suelo - 12, 14, suelo - 11, hex('#3a8ae8')); }
  else { caja(5, suelo - 8 - alto, 16, suelo - 3 - alto, C.k); caja(6, suelo - 7 - alto, 15, suelo - 4 - alto, C.cristal); caja(10, suelo - 7 - alto, 10, suelo - 4 - alto, C.k); }
  caja(largo - 1, suelo - 8, largo, suelo - 7, C.oroL); caja(0, suelo - 8, 0, suelo - 7, C.rojo);
  for (const i of [5, largo - 5]) { disco(X(i), suelo - 2, 3, C.k); disco(X(i), suelo - 2, 1, C.metal); }
}

// mezcla dos colores del lienzo (k = 0: a; k = 1: b)
function a_mezcla(a, b, k) { let r = 0; for (const s of [0, 8, 16]) r |= Math.round(((a >>> s) & 255) * (1 - k) + ((b >>> s) & 255) * k) << s; return (r | 0xff000000) >>> 0; }
// los colores de la farmacia desenfocada que se ve detrás de los insertos: lo de lejos, mezclado con la pared
const a_DESEN = { prod: a_PROD.map((c) => a_mezcla(c[1], a_F.pared, 0.5)), cab: a_mezcla(hex('#2a5aa8'), a_F.pared, 0.5), gond: a_mezcla(a_F.gond, a_F.pared, 0.35),
  balda: a_mezcla(a_F.gondD, a_F.pared, 0.45), rojo: a_mezcla(C.rojoW, a_F.pared, 0.3), piel: a_mezcla(hex('#e8b890'), a_F.pared, 0.2) };

// el fondo de los insertos del rincón (cámara a la altura de la mesa): arriba, la farmacia desenfocada —las manchas de luz
// de los plafones (titilan las que no caen bajo la barra del año), la franja roja de la cadena, tres góndolas en bloques de
// color suave con sus cabeceras y baldas, y por delante, las cabezas borrosas de dos clientes que pasan—; debajo, el panel
// del rincón, verde agua muy claro (así lo que las escenas pintan «al fondo» sobre lo claro solo asoma por encima de él), con
// su franja verde azulada, las juntas con sus tornillos y los reflejos de dos focos. yp: dónde empieza el panel; y1: dónde
// acaba (el borde de la mesa)
function a_fondoRincon(R, t, yp = 36, y1 = 92) {
  const { rect, pset } = R, D = a_DESEN;
  rect(0, 0, 319, 4, a_F.techo); rect(0, 5, 319, yp - 1, a_F.pared);
  for (let k = 0; k < 6; k++) { const x = 6 + k * 62, f = x > 20 && x < 176 ? 1 : 0.8 + 0.2 * Math.sin(t * 1.7 + k * 2.3);
    for (let j = -4; j <= 5; j++) for (let i = -24; i <= 24; i++) { const d = (i / (24 * f)) ** 2 + (j / 5) ** 2; if (d < 1 && (d < 0.3 || (i + j) % 2 === 0)) pset(x + i, 1 + j, d < 0.3 ? a_F.tubo : a_F.paredL); } }
  // la franja roja, con los bordes deshechos
  rect(0, 10, 319, 13, C.rojoW); for (let x = 0; x < 320; x += 2) { pset(x, 9, D.rojo); pset(x + 1, 14, D.rojo); }
  for (let x = 20; x < 320; x += 40) { pset(x, 11, D.rojo); pset(x + 1, 12, D.rojo); }
  // las góndolas de lejos: cabecera azul, dos baldas de productos en bloques de color suave
  for (const [g0, g1, s] of [[-30, 86, 0], [112, 206, 1], [232, 350, 2]]) {
    rect(g0, 18, g1, yp - 1, D.gond); rect(g0, 18, g1, 21, D.cab); for (let x = g0; x <= g1; x += 2) { pset(x, 17, D.cab); pset(x + 1, 22, D.cab); }
    for (const [ya, yb] of [[23, 28], [30, yp - 1]]) {
      for (let x = g0 + 3; ;) { const w = 3 + Math.floor(h(x, ya + s, 222) * 4), al = (yb - ya) - Math.floor(h(x, ya, 223) * 3); if (x + w > g1 - 3) break;
        if (h(x, ya + s, 224) > 0.12) { rect(x, yb - al, x + w - 1, yb, D.prod[Math.floor(h(x, ya + s, 225) * D.prod.length)]); pset(x, yb - al, D.gond); pset(x + w - 1, yb - al, D.gond); } x += w + 1; }
      if (yb < yp - 1) rect(g0, yb + 1, g1, yb + 1, D.balda);
    }
    for (let y = 17; y < yp; y++) { if (y % 2) { pset(g0 - 1, y, D.gond); pset(g1 + 1, y, D.gond); } }
  }
  // las cabezas borrosas de los clientes que pasan por delante de las góndolas
  for (let k = 1; k >= 0; k--) {
    const u = (t * (0.035 + k * 0.012) + k * 0.55) % 1, x = k ? Math.round(360 - u * 400) : Math.round(-40 + u * 400), y = 28 - k * 2 + Math.round(Math.abs(Math.sin(t * 3.2 + k)) * 1), s = 1 - k * 0.15;
    const pelo = [a_mezcla(hex('#6a3a1a'), a_F.pared, 0.25), a_mezcla(hex('#d8b860'), a_F.pared, 0.25)][k], ropa = [a_mezcla(hex('#4a8ae8'), a_F.pared, 0.3), a_mezcla(hex('#e87a5a'), a_F.pared, 0.3)][k];
    for (let j = -8; j <= 12; j++) for (let i = -14; i <= 14; i++) {
      const cab = (i / (6.5 * s)) ** 2 + (j / (7 * s)) ** 2, hombro = (i / (13 * s)) ** 2 + ((j - 12 * s) / 6) ** 2; if (cab >= 1 && hombro >= 1) continue;
      if (((cab < 1 && cab > 0.7) || (cab >= 1 && hombro > 0.65)) && (i + j) % 2) continue;
      pset(x + i, y + j, cab < 1 ? (j < -3 + Math.abs(i) / 3 ? pelo : D.piel) : ropa);
    }
  }
  // el panel del rincón: verde agua muy claro, la franja, las juntas, los tornillos y la luz de los focos
  rect(0, yp, 319, y1, a_F.menta); rect(0, yp, 319, yp + 2, C.tealT); rect(0, yp, 319, yp, a_F.tealL); rect(0, yp + 3, 319, yp + 3, C.tealTS); rect(0, yp + 4, 319, yp + 4, a_F.mentaS);
  for (const xb of [20, 214]) for (let y = yp + 5; y < y1; y++) for (let x = xb; x < xb + 26; x++) if ((x + y) % 3 === 0 && x - xb < 26 - (y - yp) / 3) pset(x, y, a_F.mentaL);
  for (const xs of [90, 230]) { rect(xs, yp + 5, xs, y1, a_F.mentaD); rect(xs + 1, yp + 5, xs + 1, y1, a_F.mentaL); for (const y of [yp + 9, y1 - 5]) { pset(xs - 3, y, a_F.mentaD); pset(xs + 4, y, a_F.mentaD); } }
  rect(0, y1 - 1, 319, y1, a_F.mentaS);
}
// la mesa blanca de los insertos desde y0 (borde con su canto y luz), con algún reflejo
function a_mesa(R, y0) {
  const { rect, pset } = R; rect(0, y0, 319, 179, a_F.mesa); rect(0, y0, 319, y0 + 1, a_F.mesaB); rect(0, y0 + 2, 319, y0 + 2, a_F.mesaS);
  for (let k = 0; k < 70; k++) pset(Math.floor(h(k, 1, 230) * 320), y0 + 4 + Math.floor(h(k, 2, 230) * (176 - y0)), a_F.panelS);
}

// ── piezas de los decorados de la gota (b_): la farmacia desenfocada del fondo, la mampara de la cabina, paredes y mesas
// con textura, el reloj, la gente pequeña tras un cristal y los objetos de cerca (tubos de vena, cucharadita) ─────────
const b_C = pal({
  // la farmacia desenfocada: solo estos siete tonos (las escenas pintan sus clientes desenfocados encima de ellos)
  fondo: '#e6ecef', gondola: '#d6dfe6', luz: '#f6f8f9', prodR: '#ebcdd4', prodV: '#cde3d4', prodA: '#eee0bc', prodZ: '#c6d6ea',
  // la mampara de la cabina: tela con su trama y perfiles de aluminio
  tela: '#b6cfd2', telaS: '#a5c1c5', telaL: '#c8dddf', perfil: '#c2cad4', perfilS: '#8e98a6', perfilL: '#e8edf2', cable: '#a3abb6',
  // encimeras, azulejos, cocina, madera y cristal
  banco: '#d6dee6', bancoS: '#c2ccd6', bancoL: '#e8eef3', acero: '#c4ccd8',
  azuC: '#f4f6f8', azuCS: '#e2e8ee', azuCJ: '#c4ccd8', azuCL: '#ffffff',
  cocina: '#f2e4c6', cocinaS: '#e8d6b4', mueble: '#d4ac78', muebleS: '#ae8452', muebleL: '#e8c894', muebleD: '#8a6236',
  encimera: '#bdb4a2', encimeraS: '#9c927e', encimeraL: '#d6cebe', nevera: '#eef2f4', neveraS: '#cdd5de', neveraL: '#ffffff',
  mesa: '#b8844c', mesaS: '#9a6a38', mesaL: '#cc9a60', mesaD: '#7a5028',
  piel: '#f6c290', vidrio: '#eef6fa', vidrioS: '#cfe0ea',
  // el salón de casa: papel pintado, zócalo, mantel
  papelP: '#efe3cf', papelPS: '#e4d4bc', papelPL: '#f6ecdc', papelPM: '#d8c4a6', zocalo: '#f2ece2', zocaloS: '#d8cfc0', zocaloL: '#fbf8f2',
  lino: '#e8dcc8', linoS: '#d4c4aa', linoL: '#f4ecdc',
  // el laboratorio: azulejo blanco, banco de resina oscura, pared verde salvia
  azuB: '#f2f4f4', azuBS: '#e0e6e8', azuBJ: '#c6d0d4', azuBL: '#ffffff', resina: '#3c464e', resinaS: '#2e363e', resinaL: '#56626c', resinaM: '#48535c',
  salvia: '#dbe6df', salviaS: '#cddbd2', salviaL: '#e8f0ea', vinilo: '#d4dadc', viniloS: '#c2c9cc', viniloL: '#e6eaec', pasillo: '#eef2f2', pasilloS: '#dfe5e6',
});
// mezcla dos colores (a = 0: c; a = 1: d)
const b_mezcla = (c, d, a) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - a) + ((d >>> s) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };
const b_lim = (u) => Math.max(0, Math.min(1, u));
// la sombra blanda de un objeto: oscurece lo que haya debajo en una elipse (f: cuánto queda de la luz)
function b_sombra(R, cx, cy, rx, ry, f = 0.82) {
  cx = Math.round(cx); cy = Math.round(cy);
  for (let j = -ry; j <= ry; j++) { const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (j / (ry + 0.5)) ** 2))); for (let x = cx - w; x <= cx + w; x++) { const c = R.pget(x, cy + j); if (c) R.pset(x, cy + j, b_mezcla(c, C.k, 1 - f)); } }
}
// la luz que entra por una ventana: un paralelogramo tramado más claro (inclin: cuánto se tuerce por fila)
function b_luz(R, x0, y0, x1, y1, inclin, a = 0.3, col = C.blanco) {
  for (let y = y0; y <= y1; y++) { const d = Math.round((y - y0) * inclin); for (let x = x0 + d; x <= x1 + d; x++) if (((x + y) & 1) === 0) { const c = R.pget(x, y); if (c) R.pset(x, y, b_mezcla(c, col, a)); } }
}
// azulejos de w × a en la rejilla de toda la pantalla (así casan entre trozos), recortados a (x0, y0)–(x1, y1): la
// junta, el canto de luz de cada pieza, su esquina en sombra y alguna pieza más oscura; desfase: a matajunta
function b_azulejos(R, x0, y0, x1, y1, w, a, c, cS, cJ, cL, k = 0, desfase = false) {
  R.rect(x0, y0, x1, y1, cJ);
  for (let f = Math.floor(y0 / a); f * a <= y1; f++) { const y = f * a, dx = desfase && (f & 1) ? w >> 1 : 0;
    for (let x = Math.floor((x0 - dx) / w) * w + dx; x <= x1; x += w) {
      const xa = Math.max(x0, x + 1), xb = Math.min(x1, x + w - 1), ya = Math.max(y0, y + 1), yb = Math.min(y1, y + a - 1); if (xb < xa || yb < ya) continue;
      R.rect(xa, ya, xb, yb, h(x, y, 350 + k) < 0.14 ? cS : c); if (y + 1 >= y0) R.rect(xa, y + 1, xb, y + 1, cL); if (xb === x + w - 1 && yb === y + a - 1) R.pset(xb, yb, cS);
    } }
}
// tablero de madera visto de frente (tablas horizontales): juntas, vetas claras y oscuras, algún nudo y el canto de luz
function b_madera(R, x0, y0, x1, y1, c, cS, cL, cD, k = 0, tabla = 12) {
  const { rect } = R; rect(x0, y0, x1, y1, c);
  for (let y = y0 + 3, f = 0; y < y1; y += tabla, f++) {
    if (y + tabla - 1 < y1) rect(x0, y + tabla - 1, x1, y + tabla - 1, cD);
    for (let g = 0; g < 4; g++) { const gy = y + 1 + Math.round(h(f, g, 310 + k) * (tabla - 4)); let x = x0 - Math.round(h(f, g, 311 + k) * 24);
      while (x < x1) { const L = 8 + Math.round(h(x, gy, 312 + k) * 34); if (h(x, g, 313 + k) < 0.7 && gy < y1) rect(Math.max(x0, x), gy, Math.min(x1, x + L), gy, g === 3 ? cL : cS); x += L + 3 + Math.round(h(x, gy, 314 + k) * 12); } }
    if (h(f, 9, 315 + k) < 0.55 && y + 6 < y1) { const nx = x0 + 10 + Math.round(h(f, 7, 316 + k) * (x1 - x0 - 20)), ny = y + Math.round(tabla / 2) - 1; rect(nx - 4, ny, nx + 4, ny, cS); rect(nx - 2, ny - 1, nx + 2, ny + 1, cS); rect(nx - 1, ny, nx + 1, ny, cD); }
  }
  rect(x0, y0, x1, y0 + 1, cL); rect(x0, y0 + 2, x1, y0 + 2, cS);
}
// encimera vista desde arriba: el color, un moteado fijo de dos tonos y el canto de atrás
function b_encimera(R, y0, y1, c, cS, cL, k = 0) {
  R.rect(0, y0, 319, y1, c); const n = (y1 - y0) * 9;
  for (let i = 0; i < n; i++) R.pset(Math.round(h(i, 1, 360 + k) * 319), y0 + 2 + Math.round(h(i, 2, 360 + k) * (y1 - y0 - 2)), i % 3 ? cS : cL);
  R.rect(0, y0, 319, y0, cL); R.rect(0, y0 + 1, 319, y0 + 1, cS);
}
// una nube pequeña de tres tonos (sombra abajo, cuerpo, luz arriba)
function b_nube(R, cx, cy, w) {
  const [c1, c2, c3] = [C.blanco, hex('#e2ecf6'), hex('#b8cce2')], r = Math.max(2, w * 0.32), B = [[-w * 0.42, 1, r * 0.78], [0, -1, r], [w * 0.4, 0.5, r * 0.82]];
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy + 1, rr, c3);
  for (const [dx, dy, rr] of B) R.disco(cx + dx, cy + dy, rr * 0.95, c2);
  for (const [dx, dy, rr] of B) R.disco(cx + dx - 1, cy + dy - 1, rr * 0.6, c1);
}
// un roble de copa redonda que se mece (x, suelo: pie del tronco; r: tamaño)
function b_roble(R, x, suelo, t, r) {
  const m = Math.round(Math.sin(t * 1.1 + x) * 1); R.rect(x - 1, suelo - r, x + 1, suelo, C.cortezaS);
  const B = [[0, -r * 1.3, r * 0.72], [-r * 0.62, -r * 1.0, r * 0.56], [r * 0.62, -r * 1.05, r * 0.56], [-r * 0.22, -r * 1.75, r * 0.5], [r * 0.32, -r * 1.62, r * 0.46]];
  for (const [dx, dy, rr] of B) R.disco(x + dx + m, suelo + dy + 1, rr, C.hierbaD);
  for (const [dx, dy, rr] of B) R.disco(x + dx + m - 0.5, suelo + dy, rr * 0.86, C.hierbaS);
  for (const [dx, dy, rr] of B) R.disco(x + dx + m - 1.2, suelo + dy - 1.2, rr * 0.48, C.hierba);
  for (let k = 0; k < 7; k++) if (Math.sin(t * 3 + k * 2.1) > 0.2) R.pset(Math.round(x + m + (h(k, 1, 340) - 0.5) * r * 1.8), Math.round(suelo - r * 1.3 + (h(k, 2, 340) - 0.5) * r * 1.3), C.hierbaL);
}
// la farmacia desenfocada al fondo, entre y0 e y1 (por detrás de la mampara): los plafones del techo (uno parpadea),
// las góndolas con sus baldas de productos (top: la primera fila de productos), la cruz de la farmacia que late (cruz:
// [x, y]) y gente lejana que pasa por el pasillo; todo con solo los siete tonos de la farmacia de b_C, y los siete
// salen ya en la primera fila (las escenas toman de ahí los colores sobre los que pintan a sus clientes)
function b_tienda(R, t, y0, y1, top, cruz = [70, 30]) {
  const { rect, pset } = R, P = b_C, prods = [P.prodR, P.prodV, P.prodA, P.prodZ];
  rect(0, y0, 319, y1, P.fondo);
  for (let k = 0; k < 8; k++) { const x = 4 + k * 42; if (k === 5 && Math.sin(t * 13) > 0.5 && Math.sin(t * 0.9) > 0.4) continue; rect(x, y0, x + 24, y0 + 1, P.luz); for (let i = 1; i < 24; i += 2) pset(x + i, y0 + 2, P.luz); }
  // las góndolas: el lateral deshecho (desenfocado), el remate y las baldas con los productos, manchas sin contorno
  for (let g = 0; g < 8; g++) { const x0 = -14 + g * 46, x1 = x0 + 37;
    rect(x0, top - 2, x1, y1, P.gondola); for (let y = top - 2; y <= y1; y += 2) { pset(x0 - 1, y, P.gondola); pset(x1 + 1, y + 1, P.gondola); }
    for (let r = top, fila = 0; r + 8 <= y1; r += 12, fila++) {
      for (let i = 0, x = x0 + 2; x + 4 < x1; i++) { const w = 4 + ((g * 7 + i * 3 + fila * 5) % 3), al = 5 + ((g + i * 2 + fila) % 4), c = prods[(i + g + fila) % 4];
        rect(x, r + 8 - al, x + w - 1, r + 8, c); pset(x, r + 8 - al, P.gondola); pset(x + w - 1, r + 8 - al, P.gondola); if (al > 6) pset(x + 1, r + 9 - al, P.luz); x += w + 2; }
      rect(x0, r + 9, x1, r + 10, P.luz);
    } }
  // la cruz verde de la farmacia, al fondo, que late
  { const [cx, cy] = cruz, late = Math.sin(t * 2.4) > 0.1, c = late ? P.luz : P.prodV;
    rect(cx - 6, cy - 2, cx + 6, cy + 2, P.prodV); rect(cx - 2, cy - 6, cx + 2, cy + 6, P.prodV); rect(cx - 4, cy - 1, cx + 4, cy + 1, c); rect(cx - 1, cy - 4, cx + 1, cy + 4, c);
    for (const [dx, dy] of [[-7, 0], [7, 0], [0, -7], [0, 7]]) pset(cx + dx, cy + dy, P.prodV); }
  // gente lejana que pasa despacio por el pasillo (tramada, como desenfocada)
  for (let k = 0; k < 3; k++) { const d = k % 2 ? -1 : 1, u = (t * (5 + k * 2.5) + k * 137) % 420, x = Math.round(d > 0 ? u - 50 : 370 - u), c = k === 1 ? P.prodR : P.prodZ, yc = top + 20 + k * 3;
    for (let y = yc; y <= y1; y++) for (let xx = x - 8; xx <= x + 8; xx++) { if ((xx + y) & 1) continue; const cab = Math.hypot(xx - x, y - yc - 5) < 5, cu = y > yc + 10 && Math.abs(xx - x) < 7 - Math.max(0, yc + 13 - y); if (cab || cu) pset(xx, y, c); } }
}
// la mampara de la cabina entre (x0, y0) y (x1, y1): el perfil de aluminio de arriba con su brillo, la tela con su
// trama, la sombra que deja el perfil y las juntas verticales (junta: x de la primera; paso: cada cuánto)
function b_mampara(R, x0, x1, y0, y1, o = {}) {
  const { rect, pset } = R, P = b_C;
  rect(x0, y0 + 4, x1, y1, P.tela);
  for (let y = y0 + 6; y <= y1; y += 2) for (let x = x0 + ((y >> 1) & 1) * 2; x <= x1; x += 4) pset(x, y, P.telaS);
  for (let y = y0 + 7; y <= y1; y += 4) for (let x = x0 + 1 + ((y >> 2) & 1) * 2; x <= x1; x += 4) pset(x, y, P.telaL);
  rect(x0, y0 + 4, x1, y0 + 5, P.telaS);
  for (let x = o.junta ?? x0 + 63; x < x1; x += o.paso ?? 64) { rect(x, y0 + 4, x + 2, y1, P.perfil); rect(x + 2, y0 + 4, x + 2, y1, P.perfilS); rect(x, y0 + 4, x, y1, P.perfilL); }
  rect(x0, y0, x1, y0 + 3, P.perfil); rect(x0, y0, x1, y0, P.perfilL); rect(x0, y0 + 3, x1, y0 + 3, P.perfilS); rect(x0, y0 - 1, x1, y0 - 1, P.perfilS);
}
// el reloj de pared con su marco, las marcas de las horas y el segundero rojo que salta cada segundo
function b_reloj(R, cx, cy, r, t, marco = C.k) {
  R.disco(cx, cy + 1, r + 1, b_mezcla(marco, C.k, 0.4)); R.disco(cx, cy, r + 1, marco); R.disco(cx, cy, r - 1, C.blanco); R.disco(cx - 1, cy - 1, r - 3, hex('#fbfaf6'));
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; R.pset(Math.round(cx + Math.cos(a) * (r - 2)), Math.round(cy + Math.sin(a) * (r - 2)), k % 3 ? C.grisL : C.k); }
  R.linea(cx, cy, cx - 2, cy - 3, C.k); R.linea(cx, cy, cx + Math.round(r * 0.5), cy + 1, C.k); const s = Math.floor(t) / 60 * Math.PI * 2 - Math.PI / 2;
  R.linea(cx, cy, Math.round(cx + Math.cos(s) * (r - 2)), Math.round(cy + Math.sin(s) * (r - 2)), C.rojo); R.pset(cx, cy, C.k);
}
// gente pequeña (sprites chibi) que pasa por detrás de un cristal (x0, y0)–(x1, y1), con los pies en suelo; quien:
// lista de [personaje, velocidad px/s, fase s, dirección, y de más para los pies (opcional)]
function b_paseantes(R, t, x0, y0, x1, y1, suelo, quien) {
  R.recorte([x0, y0, x1, y1]);
  for (const [def, v, fase, d, dy = 0] of quien) { const L = x1 - x0 + 16, u = ((t + fase) * v) % (L + 12); if (u > L) continue; const x = d > 0 ? x0 - 15 + u : x1 + 1 - u; R.actor(def, Math.round(x), suelo + dy, t, { dir: d, anda: true }); }
  R.recorte(null);
}
// un tubo de extracción de cerca (x: centro; a: medio ancho; de y0 a y1, con el tapón de th px por encima de y0): el
// cristal con su brillo, la sangre (lleno 0–1: llega hasta y1 − 1 − (y1 − y0 − hueco)·lleno) con su menisco, la
// etiqueta con el código de barras y el tapón de goma de color, con su aro y sus estrías
function b_tubo(R, x, y0, y1, a, lleno, tapa, o = {}) {
  const { rect, pset } = R, th = o.tapon ?? Math.round(a * 1.4), hueco = o.hueco ?? 14;
  rect(x - a, y0, x + a, y1 - 2, C.k); rect(x - a + 1, y1 - 1, x + a - 1, y1, C.k);
  rect(x - a + 1, y0, x + a - 1, y1 - 2, b_C.vidrio); rect(x - a + 2, y1 - 1, x + a - 2, y1 - 1, b_C.vidrio); rect(x + a - 2, y0, x + a - 1, y1 - 2, b_C.vidrioS);
  const f = b_lim(lleno), top = Math.round(y1 - 1 - (y1 - y0 - hueco) * f);
  if (f > 0.01) { rect(x - a + 1, top, x + a - 1, y1 - 2, C.sangre); rect(x - a + 2, y1 - 1, x + a - 2, y1 - 1, C.sangreS); rect(x + a - 3, top, x + a - 1, y1 - 2, C.sangreS); if (y1 - 4 > top + 2) rect(x - a + 2, top + 2, x - a + 2, y1 - 4, hex('#e04a5c')); rect(x - a + 1, top, x + a - 1, top, C.sangreL); }
  // la etiqueta, arriba a la izquierda: la franja del color del tapón y el código de barras
  const ly0 = y0 + 3, ly1 = y0 + 3 + Math.round((y1 - y0) * 0.24), lx1 = x;
  rect(x - a + 1, ly0, lx1, ly1, hex('#fbfaf4')); rect(lx1 + 1, ly0, lx1 + 1, ly1, hex('#c4c8d0')); rect(x - a + 1, ly0, lx1, ly0 + 1, tapa);
  for (let yy = ly0 + 4; yy < ly1 - 1; yy++) if (h(x, yy, 320) < 0.55) rect(x - a + 2, yy, lx1 - 1, yy, C.k);
  // el brillo del cristal
  for (let yy = ly1 + 3; yy < y1 - 5; yy++) if (yy % 9 < 7) pset(x + 2, yy, C.blanco); if (a > 5) pset(x + 3, ly1 + 3, C.blanco);
  // el tapón: el borde, el aro de abajo, las estrías y el brillo de arriba
  const tS = b_mezcla(tapa, C.k, 0.3), tL = b_mezcla(tapa, C.blanco, 0.42);
  rect(x - a - 1, y0 - th, x + a + 1, y0, C.k); rect(x - a, y0 - th + 1, x + a, y0 - 1, tapa); rect(x - a, y0 - th + 1, x + a, y0 - th + 1, tL);
  for (let xx = x - a + 2; xx < x + a - 1; xx += 2) rect(xx, y0 - th + 3, xx, y0 - 4, tS); rect(x - a, y0 - 3, x + a, y0 - 3, C.k); rect(x - a, y0 - 2, x + a, y0 - 1, tS); rect(x + a - 1, y0 - th + 1, x + a, y0 - 4, tS);
  pset(x - a + 1, y0 - th + 2, tL);
}
// la cucharadita de cerca, llena de sangre: el cuenco (centro cx, cy; radios rx, ry) con el borde de acero y su reflejo,
// el mango hasta (hx, hy) con su brillo, y la sangre con el menisco y un destello que tiembla; o.sombra: su sombra
function b_cuchara(R, cx, cy, rx, ry, hx, hy, t, o = {}) {
  const { pset, disco, rect } = R;
  if (o.sombra !== false) b_sombra(R, (cx + hx) / 2 + 3, Math.max(cy + ry, hy) + 2, Math.abs(cx - hx) * 0.55 + rx * 0.6, Math.max(2, Math.round(ry * 0.3)), 0.8);
  // el mango: sale del cuenco y se ensancha hasta la punta redondeada
  const d = Math.hypot(hx - cx, hy - cy), sx = cx + (hx - cx) / d * rx * 0.8, sy = cy + (hy - cy) / d * ry * 0.8, n = Math.max(1, Math.round(Math.abs(hx - sx)));
  for (let i = 0; i <= n; i++) { const u = i / n, x = Math.round(lerp(sx, hx, u)), yc = lerp(sy, hy, u), w = 1.2 + 1.4 * u, a = Math.round(yc - w), b = Math.round(yc + w);
    rect(x, a - 1, x, b + 1, C.k); rect(x, a, x, b, C.metal); pset(x, a, u > 0.25 && u < 0.55 ? C.blanco : C.metalL); pset(x, b, C.metalS); }
  disco(hx, hy, 4, C.k); disco(hx, hy, 3, C.metal); pset(Math.round(hx) - 1, Math.round(hy) - 2, C.metalL); rect(Math.round(hx) - 1, Math.round(hy) + 2, Math.round(hx) + 1, Math.round(hy) + 2, C.metalS);
  // el cuenco: borde negro, el aro de acero con luz arriba y sombra abajo, y el fondo un poco más oscuro
  for (let j = -ry; j <= ry; j++) for (let i = -rx; i <= rx; i++) { const e = (i / rx) ** 2 + (j / ry) ** 2; if (e > 1) continue;
    pset(cx + i, cy + j, e > 0.86 ? C.k : e > 0.62 ? (j < -ry * 0.2 ? (i < 0 ? C.blanco : C.metalL) : j > ry * 0.35 ? C.metalD : C.metal) : C.metalS); }
  // la sangre, con el menisco claro arriba, el fondo más oscuro y el reflejo que tiembla
  const bx = rx * 0.74, by = ry * 0.62, tw = Math.round(Math.sin(t * 1.7) * 0.8);
  for (let j = -Math.ceil(by); j <= by; j++) for (let i = -Math.ceil(bx); i <= bx; i++) { const e = (i / bx) ** 2 + (j / by) ** 2; if (e > 1) continue;
    pset(cx + i, cy + 1 + j, e > 0.78 && j < 0 ? C.sangreL : j > by * 0.42 ? C.sangreS : e > 0.8 ? hex('#b82234') : C.sangre); }
  const rx0 = Math.round(cx - bx * 0.55) + tw, ry0 = Math.round(cy + 1 - by * 0.35); rect(rx0, ry0, rx0 + Math.round(bx * 0.4), ry0, hex('#f08898')); pset(rx0 - 1, ry0 + 1, hex('#f08898')); pset(rx0 + 1, ry0, C.blanco);
  pset(Math.round(cx + bx * 0.45) - tw, Math.round(cy + 1 + by * 0.2), hex('#e05a6a'));
}
// la manga que sigue a la mano canónica hasta el borde del plano (dir −1: la mano entra por la derecha)
function b_manga(R, x, y, dir, manga) {
  const m = hex(manga), [x0, x1] = dir < 0 ? [x + 43, 319] : [0, x - 43]; if (x1 < x0) return;
  R.rect(x0, y - 2, x1, y + 2, m); R.rect(x0, y - 3, x1, y - 3, C.k); R.rect(x0, y + 3, x1, y + 3, C.k); R.rect(x0, y + 2, x1, y + 2, b_mezcla(m, C.k, 0.25));
}

// ── auxiliares de los insertos y del laboratorio de hoy (prefijo c_, sin exportar) ─────────────────────────────────
// un fondo fijo que se pinta una sola vez por lienzo y luego se copia entero en cada fotograma (rápido)
const c_CACHE = new WeakMap();
function c_fondoFijo(R, clave, dibuja) {
  let m = c_CACHE.get(R); if (!m) c_CACHE.set(R, (m = {}));
  if (!m[clave]) { const b = R.nuevo(), prev = R.usar(b); dibuja(); R.usar(prev); m[clave] = b; }
  R.copiar(m[clave]);
}
// un color a partir de sus tres componentes (0–255)
const c_rgb = (r, g, b) => hex('#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join(''));
// una nube pequeña de tres tonos (sombra abajo, cuerpo, luz arriba) para las ventanas; la recorta R.recorte
function c_nube(R, cx, cy, w) {
  const B = [[0, 0, 0.3], [-0.3, 0.07, 0.21], [0.3, 0.06, 0.23], [-0.08, -0.13, 0.24], [0.14, -0.08, 0.2]], r = (f) => Math.max(1, Math.round(f * w));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w + 1), r(f), hex('#cfe2f0'));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w), Math.round(cy + dy * w), r(f), hex('#eaf4fb'));
  for (const [dx, dy, f] of B) R.disco(Math.round(cx + dx * w - 1), Math.round(cy + dy * w - 1), r(f * 0.7), C.blanco);
  R.linea(Math.round(cx - w * 0.5), Math.round(cy + w * 0.24), Math.round(cx + w * 0.5), Math.round(cy + w * 0.24), hex('#cfe2f0'));
}
// una mancha desenfocada (bokeh) de radio r: el centro lleno y el borde tramado
function c_bokeh(R, x, y, r, c) {
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d <= 1 && (d < 0.7 || ((x + i + y + j) & 1) === 0)) R.pset(x + i, y + j, c); }
}
// una placa del armazón de una máquina, con su bisel (luz arriba a la izquierda) y un tornillo en cada esquina
function c_placa(R, x0, y0, x1, y1, base = hex('#1e2a3a')) {
  const { rect, pset } = R; rect(x0, y0, x1, y1, hex('#0c121c')); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base);
  rect(x0 + 1, y0 + 1, x1 - 1, y0 + 1, hex('#2e3e52')); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, hex('#2a384a')); rect(x0 + 2, y1 - 1, x1 - 1, y1 - 1, hex('#141c28')); rect(x1 - 1, y0 + 2, x1 - 1, y1 - 1, hex('#141c28'));
  for (const [x, y] of [[x0 + 3, y0 + 3], [x1 - 4, y0 + 3], [x0 + 3, y1 - 4], [x1 - 4, y1 - 4]]) { pset(x, y, hex('#6a7a8e')); pset(x + 1, y, hex('#4a5a6e')); pset(x, y + 1, hex('#4a5a6e')); pset(x + 1, y + 1, hex('#0c121c')); }
}
// el técnico del laboratorio vecino (pelo rubio, para no confundirlo con los de las escenas)
const c_TECNICO = { ...ELENCO_CHIBI.tecnico, pal: { ...ELENCO_CHIBI.tecnico.pal, H: hex('#b8862e'), h: hex('#e0b050') } };
// la ventana al campus de hoy (marco de 2 px en x0–x1, y0–y1): arriba un azul liso (las escenas hacen pasar pájaros por
// ahí), nubes que pasan, colinas, un edificio de cristal con su retícula, la antena y un reflejo de sol que la recorre,
// otro de arenisca con tejado de teja y arcos, el césped con su camino, un ciclista que pasa, árboles que se mecen, el
// parteluz y los reflejos del cristal
function c_ventanaCampus(R, t, x0, y0, x1, y1) {
  const { rect, pset, disco, linea } = R, a = x0 + 2, b = y0 + 2, c = x1 - 2, d = y1 - 2;
  rect(x0, y0, x1, y1, C.k);
  rect(a, b, c, b + 21, C.cielo2); rect(a, b + 22, c, b + 30, hex('#8ecbf3')); rect(a, b + 31, c, d, C.cielo3);
  R.recorte([a, b, c, d]);
  for (const [k, yy, w, v] of [[0, b + 9, 22, 1.5], [1, b + 26, 15, 1.0], [2, b + 3, 11, 2.2]]) { const span = c - a + 2 * w + 30; c_nube(R, a - w + ((k * 47 + t * v) % span), yy, w); }
  R.recorte(null);
  // las colinas lejanas
  for (let x = a; x <= c; x++) { const yh = Math.round(b + 35 + Math.sin(x * 0.09) * 3 + Math.sin(x * 0.23 + 1) * 1.5); rect(x, yh, x, d, hex('#9cc4b4')); if (x % 5 === 0) pset(x, yh + 1, hex('#8ab4a4')); }
  // el edificio de cristal: retícula, ventanas que reflejan y un brillo que la recorre en diagonal; la antena con su luz
  { const gx0 = a + 5, gx1 = a + 23, gy0 = b + 18, gy1 = d - 7, br = ((t * 7) % 70) - 15;
    rect(gx0, gy0, gx1, gy1, hex('#4a6a84')); rect(gx0 + 1, gy0 + 1, gx1 - 1, gy1, hex('#7a9ab4'));
    for (let y = gy0 + 2; y < gy1 - 1; y += 3) for (let x = gx0 + 2; x < gx1 - 1; x += 3) { const luz = Math.abs((x - gx0) + (y - gy0) * 0.5 - br) < 3; rect(x, y, x + 1, y + 1, luz ? hex('#eef8fc') : (x * 3 + y) % 7 === 0 ? hex('#b8d8ea') : hex('#5a809c')); }
    rect(gx0 - 1, gy0 - 2, gx1 + 1, gy0 - 1, hex('#5a7a94')); rect(gx0 + 8, gy0 - 6, gx0 + 8, gy0 - 3, hex('#5a7a94')); pset(gx0 + 8, gy0 - 7, Math.sin(t * 3) > 0 ? C.rojo : hex('#7a2a2a')); }
  // el edificio de arenisca, con su tejado de teja roja y sus arcos
  { const sx0 = a + 30, sx1 = a + 62, sy0 = b + 32, sy1 = d - 7;
    rect(sx0, sy0, sx1, sy1, C.piedraSS); rect(sx0 + 1, sy0 + 1, sx1 - 1, sy1, C.piedraS2); rect(sx0 - 1, sy0 - 3, sx1 + 1, sy0, C.tejaS); for (let x = sx0; x <= sx1; x += 2) pset(x, sy0 - 2, C.tejaSS);
    for (let x = sx0 + 3; x < sx1 - 3; x += 6) { rect(x, sy0 + 6, x + 3, sy1, hex('#7a5a40')); pset(x, sy0 + 6, C.piedraS2); pset(x + 3, sy0 + 6, C.piedraS2); rect(x + 1, sy0 + 2, x + 2, sy0 + 3, hex('#8a6a4a')); } }
  // el césped, el camino y un ciclista que pasa
  rect(a, d - 6, c, d, C.hierba); rect(a, d - 3, c, d - 2, C.camino); for (let x = a; x <= c; x += 4) pset(x, d - 5, C.hierbaL);
  R.recorte([a, b, c, d]);
  { const span = c - a + 24, bx = Math.round(a - 12 + ((t * 9) % span)), by = d - 3; disco(bx, by, 1.5, C.k); disco(bx + 5, by, 1.5, C.k); linea(bx, by, bx + 3, by - 2, C.rojo); linea(bx + 3, by - 2, bx + 5, by, C.rojo); pset(bx + 2, by - 3, hex('#3a5ab8')); pset(bx + 2, by - 4, hex('#3a5ab8')); pset(bx + 3, by - 5, hex('#f6c290')); }
  // los árboles que se mecen
  arbol(R, a + 3, d, t, { tipo: 'verde', s: 0.75 }); arbol(R, a + 27, d, t + 2, { tipo: 'verde', s: 0.55 }); arbol(R, c - 5, d, t + 4, { tipo: 'verde', s: 0.8 });
  R.recorte(null);
  // el parteluz y los reflejos del cristal
  rect(x0 + 40, y0 + 2, x0 + 41, y1 - 2, C.k);
  R.recorte([a, b, c, d]); for (const sx of [a + 21, c - 15]) { linea(sx, d - 6, sx + 10, d - 26, hex('#d8eef8')); linea(sx + 3, d - 6, sx + 13, d - 26, hex('#d8eef8')); } R.recorte(null);
}
// el laboratorio vecino visto a través de un cristal (marco x0–x1, y0–y1): la pared del fondo con la luz del techo y el
// estante de frascos, la campana de gases iluminada con la cinta que ondea, el robot de pipetas que va y viene y baja su
// aguja a la placa, un técnico que pasea por detrás del banco (se le ve de los hombros arriba), el banco de enfrente y los
// reflejos del cristal, con el triángulo de aviso pegado
function c_salaVecina(R, t, x0, y0, x1, y1) {
  const { rect, pset, disco, linea } = R, a = x0 + 2, b = y0 + 2, c = x1 - 2, d = y1 - 2;
  rect(x0, y0, x1, y1, hex('#8a96a2')); rect(x0, y0, x1, y0, hex('#6a7682')); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 1, hex('#b4bec8')); rect(x1, y0, x1, y1, hex('#6a7682'));
  rect(a, b, c, d, hex('#dbe5ea')); rect(a, b, c, b + 2, hex('#c8d2d8')); rect(a + 4, b + 1, a + 16, b + 1, C.blanco); rect(a + 26, b + 1, a + 40, b + 1, C.blanco);
  // el estante de frascos
  rect(a, b + 15, c, b + 16, hex('#9aa6ae'));
  for (let k = 0; a + 2 + k * 6 + 3 < c; k++) { const x = a + 2 + k * 6, hh = 4 + (k * 5) % 4; rect(x, b + 14 - hh, x + 3, b + 14, C.k); rect(x + 1, b + 15 - hh, x + 2, b + 14, [hex('#a8642a'), hex('#4a7ac8'), hex('#e8f2f4'), hex('#5aa86a')][k % 4]); }
  // la campana de gases, iluminada por dentro, con un matraz y la cinta que ondea con el aire
  const hx0 = c - 21, hx1 = c - 1, hy0 = b + 21, hy1 = d - 8;
  rect(hx0, hy0, hx1, hy1, hex('#9aa6b0')); rect(hx0 + 2, hy0 + 3, hx1 - 2, hy1, hex('#eef8fa')); rect(hx0 + 2, hy0 + 3, hx1 - 2, hy0 + 4, hex('#fff8dc'));
  R.poligono([[hx0 + 7, hy1], [hx0 + 9, hy1 - 6], [hx0 + 11, hy1 - 6], [hx0 + 13, hy1]], hex('#8ad0b0')); rect(hx0 + 9, hy1 - 9, hx0 + 11, hy1 - 6, hex('#c8d8e0'));
  for (let i = 0; i < 5; i++) pset(hx0 + 4 + i, hy0 + 6 + Math.round(Math.sin(t * 8 + i) * 1 + i * 0.6), C.rojo);
  rect(hx0 + 2, hy0 + 2, hx1 - 2, hy0 + 2, C.metalD);
  // el robot de pipetas: pórtico, cabezal que va y viene y baja la aguja a la placa de pocillos; su luz parpadea
  { const rx0 = a + 2, rx1 = Math.min(hx0 - 4, a + 26), ry = b + 30, deck = d - 8, ox = 0.5 + 0.5 * Math.sin(t * 0.9), hxp = Math.round(rx0 + 4 + (rx1 - rx0 - 8) * ox), baja = Math.round(Math.max(0, Math.sin(t * 2.7)) * 5);
    rect(rx0, ry, rx0 + 1, deck, C.metalD); rect(rx1 - 1, ry, rx1, deck, C.metalD); rect(rx0, ry, rx1, ry + 2, hex('#eef0f2')); rect(rx0, ry + 2, rx1, ry + 2, C.metalS);
    rect(rx0 + 3, deck - 2, rx1 - 3, deck, C.k); for (let i = rx0 + 4; i < rx1 - 3; i += 2) pset(i, deck - 1, [C.sangre, C.amarilloT, C.tealT][(i >> 1) % 3]);
    rect(hxp, ry + 9, hxp, ry + 9 + baja, C.metalS); rect(hxp - 2, ry + 3, hxp + 2, ry + 8, C.k); rect(hxp - 1, ry + 4, hxp + 1, ry + 7, C.tealT); pset(rx0, ry - 1, Math.floor(t * 3) % 2 ? C.verdeL : C.metalD); }
  // el técnico que pasea por detrás del banco
  R.recorte([a, b, c, d]);
  { const v = Math.cos(t * 0.45), x = Math.round((a + c) / 2 + Math.sin(t * 0.45) * ((c - a) / 2 - 8)); R.actor(c_TECNICO, x, d + 2, t, { dir: v > 0 ? 1 : -1, anda: Math.abs(v) > 0.2 }); }
  R.recorte(null);
  // el banco de enfrente, con su canto y tres frascos
  rect(a, d - 7, c, d, hex('#c4ced4')); rect(a, d - 7, c, d - 7, hex('#e8eef0')); rect(a, d - 6, c, d - 6, hex('#9aa6ae')); for (let x = a + 3; x < c; x += 9) rect(x, d - 4, x + 5, d - 4, hex('#aab6be'));
  for (let x = a + 4; x < c - 4; x += 14) { rect(x, d - 11, x + 3, d - 7, C.k); rect(x + 1, d - 10, x + 2, d - 8, hex('#e8a0a8')); }
  // los reflejos del cristal y el aviso
  R.recorte([a, b, c, d]); for (const sx of [a + 8, a + 32]) { linea(sx, d - 2, sx + 12, d - 38, hex('#eef6fa')); linea(sx + 2, d - 2, sx + 14, d - 38, hex('#eef6fa')); } R.recorte(null);
  R.poligono([[a + 2, d - 1], [a + 6, d - 8], [a + 10, d - 1]], C.k); R.poligono([[a + 3, d - 2], [a + 6, d - 7], [a + 9, d - 2]], C.amarilloT); pset(a + 6, d - 5, C.k); pset(a + 6, d - 3, C.k);
}
// lo que hay detrás de una lupa de radio r, agrandado z veces de verdad (se copia antes de pintar encima)
function c_lupaAumenta(R, lx, ly, r, z = 2) {
  const n = Math.ceil(r / z) + 1, w = 2 * n + 1, src = new Array(w * w);
  for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) src[(j + n) * w + i + n] = R.pget(lx + i, ly + j);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) if (i * i + j * j <= r * r) R.pset(lx + i, ly + j, src[(Math.round(j / z) + n) * w + Math.round(i / z) + n]);
}
// una molécula pequeña de la muestra, según su forma: 'disco' (una gotita de grasa, con su borde), 'y' (anticuerpo),
// 'anillo', 'cadena' o 'punto'
function c_molecula(R, x, y, forma, c) {
  const { pset, rect } = R;
  if (forma === 'disco') { rect(x - 1, y - 2, x + 1, y + 2, hex('#a88a48')); rect(x - 2, y - 1, x + 2, y + 1, hex('#a88a48')); rect(x - 1, y - 1, x + 1, y + 1, c); pset(x - 1, y - 1, C.blanco); }
  else if (forma === 'y') { for (const [i, j] of [[0, 0], [0, 1], [0, 2], [-1, -1], [-2, -2], [1, -1], [2, -2]]) pset(x + i, y + j, c); pset(x - 2, y - 3, c); pset(x + 2, y - 3, c); }
  else if (forma === 'anillo') { for (const [i, j] of [[-1, -2], [0, -2], [1, -2], [-2, -1], [2, -1], [-2, 0], [2, 0], [-2, 1], [2, 1], [-1, 2], [0, 2], [1, 2]]) pset(x + i, y + j, c); }
  else if (forma === 'cadena') { rect(x - 4, y, x - 3, y + 1, c); rect(x - 1, y - 1, x, y, c); rect(x + 2, y, x + 3, y + 1, c); pset(x - 2, y, c); pset(x + 1, y, c); }
  else rect(x, y, x + 1, y + 1, c);
}

// la paleta del tribunal: roble claro de los paneles, nogal del estrado, cuero granate de los sillones, moqueta morada
const h_TB = pal({
  roble: '#c49a68', robleS: '#a88052', robleD: '#8a6640', robleL: '#dcb684', nogal: '#74482a', nogalS: '#56341c', nogalL: '#946238',
  techo: '#e6dece', techoS: '#cec4b0', cuero: '#5e2228', cueroL: '#7e343a', cueroS: '#40161a', moq: '#56466c', moqS: '#4a3c5e', moqL: '#645280',
  robleV: '#b88e5e', nogalV: '#663f24', maderaV: '#724a28', cristal: '#c8dce4', agua: '#8ab8d8', marco: '#ece6da', marcoS: '#c8c0b0', mazo: '#6a3a1e', mazoL: '#8e5430', mazoS: '#46220e', mazoB: '#b07040',
});
// el jurado (doce bustos) y el público (nueve), cada uno con su ropa, su pelo y su piel: nunca dos iguales seguidos
const h_JURADO = [
  ['rizos', tela('#4a6aa8', '#34508a', { H: '#3a2418', h: '#5a3a24' })], ['calvo', tela('#a84a4a', '#7a3434', { W: '#8c8ca0', S: '#e0a878', s: '#b87a4a' })],
  ['mujer', tela('#5a8a5a', '#3e6a3e', { V: '#b8943a', H: '#d8b860' })], ['rizos', tela('#8a6a4a', '#6a4e34', { H: '#1c1424', h: '#3a3046', S: '#a8704a', s: '#7e4e30' })],
  ['mujer', tela('#6a4a8a', '#4e346a', { V: '#1c1424', H: '#3a3046', S: '#c88a5a', s: '#9a6038' })], ['calvo', tela('#c8a050', '#a07c34', { W: '#f2f2f2' })],
  ['mujer', tela('#c86a8a', '#9a4e68', { V: '#6a3a1a', H: '#8a5428' })], ['rizos', tela('#3a3a4a', '#26262e', { H: '#c8a060', h: '#e0c080' })],
  ['calvo', tela('#4a7a8a', '#34606e', { W: '#3a2418', S: '#8a5a3a', s: '#6a4028' })], ['mujer', tela('#e8e0d0', '#c0b8a8', { V: '#8c8ca0', H: '#b8bccc' })],
  ['rizos', tela('#a8783a', '#7e5626', { H: '#6a3a1a', h: '#8a5428', S: '#e8b080' })], ['calvo', tela('#5a5a8a', '#42426a', { W: '#c8c4bc', S: '#d8a070', s: '#a87040' })],
];
const h_PUBLICO = [
  ['mujer', tela('#8a8a9a', '#6a6a7a', { V: '#3a2418', H: '#5a3a24' })], ['calvo', tela('#4a5a7a', '#36445e', { W: '#b8bccc' })], ['rizos', tela('#7a5a4a', '#5e4436', { H: '#c8a060', h: '#e0c080' })],
  ['rizos', tela('#3a5a4a', '#2a4436', { S: '#a8704a', s: '#7e4e30' })], ['mujer', tela('#a85a6a', '#84444f', { V: '#c8a060', H: '#e0c080' })], ['calvo', tela('#5a4a3a', '#44382a', { W: '#3a2418', S: '#e0a878', s: '#b87a4a' })],
  ['calvo', tela('#6a6a5a', '#4e4e42', { W: '#f2f2f2' })], ['rizos', tela('#4a4a6a', '#363650', { H: '#6a3a1a', h: '#8a5428' })], ['mujer', tela('#5a7a8a', '#44606e', { V: '#1c1424', H: '#3a3046', S: '#c88a5a', s: '#9a6038' })],
];
// los colores de las banderas, en tres tonos (tela, sombra del pliegue, luz del pliegue), y el oso de la de California
const h_BAND = { rojo: [C.rojo, C.rojoS, hex('#e05a5a')], blanco: [C.blanco, hex('#cfc8bc'), hex('#ffffff')], azul: [C.azul, hex('#1c3a80'), C.azulL],
  oso: [hex('#6a4a2a'), hex('#4a3018'), hex('#8a6438')], hierba: [C.verde, hex('#2a6a3a'), C.verdeL] };
const h_OSO = ['..###...', '.######.', '#######.', '.#.#.##.'];

// mezcla el píxel (x, y) con un color (m 0–1): luces, reflejos y penumbras sobre lo ya pintado
function h_aclara(R, x, y, m, [cr, cg, cb] = [255, 244, 214]) {
  if (x < 0 || x > 319 || y < 0 || y > 179) return; const c = R.pget(x, y), r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  R.pset(x, y, (0xff000000 | (Math.round(b + (cb - b) * m) << 16) | (Math.round(g + (cg - g) * m) << 8) | Math.round(r + (cr - r) * m)) >>> 0);
}
// el foco que falla: se apaga dos instantes seguidos, una vez por periodo (p, en segundos)
const h_parpadeo = (t, p) => { const u = t % p; return u < 0.08 || (u > 0.16 && u < 0.22); };
// un cuarterón de madera en relieve: bisel con luz arriba y a la izquierda y sombra abajo y a la derecha, el campo y dos vetas
function h_cuarteron(R, x0, y0, x1, y1, base, luz, sombra, veta, k = 0) {
  R.rect(x0, y0, x1, y1, sombra); R.rect(x0, y0, x1 - 1, y1 - 1, luz); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, base);
  if (x1 - x0 < 6 || y1 - y0 < 6) return;
  for (let i = 0; i < 2; i++) { const vx = x0 + 3 + Math.floor(h(k, i, 120) * (x1 - x0 - 6)), ya = i ? Math.round(y0 + (y1 - y0) * 0.35) : y0 + 2;
    for (let y = ya; y < y1 - 1; y++) if (h(vx, y, 121 + i) > 0.07) R.pset(Math.min(x1 - 2, Math.max(x0 + 2, vx + Math.round(Math.sin(y * 0.06 + k * 1.7 + i * 2) * 1.4))), y, veta); }
}
// un reloj de pared redondo: aro, esfera con sus marcas, las agujas (h0: la hora al empezar, en horas) y el segundero rojo
// que avanza a saltos
function h_reloj(R, cx, cy, r, t, h0, aro) {
  const { disco, pset, linea } = R, K = C.k;
  disco(cx, cy, r + 1, K); disco(cx, cy, r, aro); disco(cx - 1, cy - 1, r - 1, (x, y, d) => (d > 0.8 ? C.oroL : aro)); disco(cx, cy, r - 1, aro);
  disco(cx, cy, r - 2, K); disco(cx, cy, r - 3, (x, y) => (x + y < cx + cy - r * 0.6 ? C.blanco : hex('#ece6da')));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6, q = r - 5; pset(Math.round(cx + Math.cos(a) * q), Math.round(cy + Math.sin(a) * q), k % 3 ? C.grisS : K); if (k % 3 === 0 && r > 12) pset(Math.round(cx + Math.cos(a) * (q - 1)), Math.round(cy + Math.sin(a) * (q - 1)), K); }
  const hora = h0 + t / 3600, am = (hora % 1) * Math.PI * 2 - Math.PI / 2, ah = (hora % 12) / 12 * Math.PI * 2 - Math.PI / 2, as = Math.floor(t) * Math.PI / 30 - Math.PI / 2;
  linea(cx, cy, Math.round(cx + Math.cos(ah) * (r * 0.42)), Math.round(cy + Math.sin(ah) * (r * 0.42)), K);
  linea(cx, cy, Math.round(cx + Math.cos(am) * (r - 5)), Math.round(cy + Math.sin(am) * (r - 5)), K);
  linea(Math.round(cx - Math.cos(as) * 2), Math.round(cy - Math.sin(as) * 2), Math.round(cx + Math.cos(as) * (r - 4)), Math.round(cy + Math.sin(as) * (r - 4)), C.rojo);
  pset(cx, cy, C.oro);
}
// una bandera colgada de su mástil, sin viento: cae en pliegues que se mecen despacio con el aire acondicionado y acaba en
// flecos dorados. (x0, y0): la esquina junto al mástil; dir 1 cuelga hacia la derecha; tipo 'eeuu' o 'california'
function h_bandera(R, x0, y0, dir, t, tipo) {
  const W = 16, H = 26;
  for (let i = 0; i < W; i++) {
    const f = Math.sin(i * 0.9 + Math.sin(t * 0.6 + x0) * 0.9), luz = f > 0.4 ? 2 : f < -0.4 ? 1 : 0, x = x0 + i * dir, ya = y0 + Math.round(i * 0.3), alto = H + Math.round(f * 1.2) - Math.round(i * 0.15);
    R.pset(x, ya - 1, C.k);
    for (let j = 0; j < alto; j++) {
      let c;
      if (tipo === 'eeuu') c = i < 7 && j < 14 ? (i % 2 === 1 && j % 3 === 1 ? 'blanco' : 'azul') : Math.floor(j / 2) % 2 ? 'blanco' : 'rojo';
      else { c = j >= alto - 4 ? 'rojo' : 'blanco'; if ((i === 2 && j >= 3 && j <= 5) || (j === 4 && i >= 1 && i <= 3)) c = 'rojo'; const oi = i - 4, oj = j - 10; if (oi >= 0 && oi < 8 && oj >= 0 && oj < 4 && h_OSO[oj][oi] === '#') c = 'oso'; if (j === 14 && i >= 3 && i <= 12) c = 'hierba'; }
      R.pset(x, ya + j, h_BAND[c][luz]);
    }
    R.pset(x, ya + alto, i % 2 ? C.oro : C.oroS); if (i % 2 === 0) R.pset(x, ya + alto + 1, C.oroS);
  }
}
// el mástil dorado con su punta de lanza, la peana y el cordón con la borla que se mece (al lado contrario de la tela)
function h_mastil(R, x, dir, t) {
  const { rect, poligono, pset, linea, disco } = R;
  rect(x - 3, 104, x + 4, 108, C.k); rect(x - 2, 104, x + 3, 107, C.oroS); rect(x - 2, 104, x + 3, 104, C.oro);
  rect(x, 19, x + 1, 104, C.oroS); rect(x, 19, x, 104, C.oro);
  poligono([[x - 2, 18], [x + 0.5, 11], [x + 3, 18]], C.k); poligono([[x - 1, 17], [x + 0.5, 13], [x + 2, 17]], C.oro); pset(x, 14, C.oroL);
  disco(x + 0.5, 19, 2, C.k); disco(x + 0.5, 19, 1, C.oro);
  const b = Math.round(Math.sin(t * 0.8 + x) * 1.2), cx = x - 3 * dir; linea(x, 21, cx + b, 38, C.oroS); rect(cx + b - 1, 38, cx + b + 1, 42, C.oro); pset(cx + b - 1, 42, C.oroS); pset(cx + b + 1, 42, C.oroS);
}
// el ventanal de la sala con la persiana a medio bajar: el cielo de San José con nubes que pasan, la ciudad baja, una
// palmera que se mece y, de vez en cuando, dos pájaros que cruzan
function h_ventanal(R, t) {
  const { rect, pset } = R, K = C.k, B = h_TB, X0 = 8, X1 = 48, Y0 = 16, Y1 = 59;
  const rr = (a, b, c, d, col) => rect(Math.max(X0, a), Math.max(Y0, b), Math.min(X1, c), Math.min(Y1, d), col);
  rect(5, 13, 51, 62, K); rect(6, 14, 50, 61, B.marco); rect(7, 15, 49, 60, B.marcoS);
  for (let y = Y0; y <= Y1; y++) rect(X0, y, X1, y, y < 28 ? C.cielo1 : y < 41 ? C.cielo2 : C.cielo3);
  for (let k = 0; k < 2; k++) { const nx = Math.round(X0 - 14 + ((k * 31 + t * 1.5) % 56)), ny = 31 + k * 7; rr(nx + 2, ny - 1, nx + 8, ny - 1, C.blanco); rr(nx, ny, nx + 11, ny + 1, C.blanco); rr(nx + 1, ny + 2, nx + 10, ny + 2, hex('#d2ecfc')); }
  for (let k = 0; k < 6; k++) { const bx = X0 + k * 7, alto = 5 + Math.round(h(k, 1, 122) * 7); rr(bx, Y1 - alto, bx + 6, Y1, hex('#9aaabf')); rr(bx, Y1 - alto, bx + 6, Y1 - alto, hex('#b8c4d4')); for (let j = Y1 - alto + 2; j < Y1; j += 3) for (let i = bx + 1; i < bx + 6; i += 2) pset(i, j, Math.floor(t * 0.3 + i + j) % 7 ? hex('#c8d8e8') : hex('#f0e8b0')); }
  const m = Math.sin(t * 0.9) * 1.5; for (let j = 0; j < 20; j++) pset(Math.round(40 + Math.sin(j * 0.15) + m * j / 20), Y1 - j, C.cortezaS);
  const cx = Math.round(41 + m), cy = Y1 - 20;
  for (let k = 0; k < 6; k++) { const a = k * 1.05 + Math.sin(t * 1.3 + k) * 0.12; for (let d = 1; d < 9; d++) { const xx = Math.round(cx + Math.cos(a) * d), yy = Math.round(cy + Math.sin(a) * d * 0.5 + d * d / 22); if (xx >= X0 && xx <= X1 && yy >= Y0 && yy <= Y1) pset(xx, yy, d % 3 ? C.hierbaS : C.hierba); } }
  const u = (t % 8.5) / 3.2; if (u < 1) for (let k = 0; k < 2; k++) { const bx = Math.round(X1 + 2 - u * 46 + k * 5), by = Math.round(27 + k * 2 + Math.sin(u * 9 + k)), al = Math.floor(t * 8 + k) % 2; if (bx > X0 && bx < X1) { pset(bx, by, K); pset(bx - 1, by - al, K); pset(bx + 1, by - al, K); } }
  for (let y = Y0; y < Y0 + 9; y += 2) { rect(X0, y, X1, y, hex('#f0e8d8')); rect(X0, y + 1, X1, y + 1, hex('#c8bca4')); } rect(X0, Y0 + 9, X1, Y0 + 10, hex('#a89a80'));
  R.linea(X1 - 3, Y0 + 11, X1 - 3, Y0 + 22, hex('#a89a80')); pset(X1 - 3, Y0 + 23, C.oroS);
  rect(27, 15, 29, 60, B.marco); rect(29, 15, 29, 60, B.marcoS); rect(7, 37, 49, 38, B.marco); rect(7, 38, 49, 38, B.marcoS);
  rect(3, 61, 53, 64, K); rect(4, 62, 52, 63, hex('#f4eee2')); rect(4, 63, 52, 63, B.marcoS);
}
// la pantalla de las pruebas, en la pared: cambia de diapositiva cada pocos segundos (un gráfico de barras que crece, un
// documento con una línea marcada y una cruz roja, la foto de la caja del aparato) con un barrido al cambiar y un reflejo
function h_pantallaPruebas(R, t) {
  const { rect, pset } = R, K = C.k, x0 = 57, y0 = 25, x1 = 95, y1 = 45;
  rect(54, 22, 98, 48, K); rect(55, 23, 97, 47, hex('#2a2e38')); rect(74, 49, 77, 51, C.metalD); rect(73, 48, 78, 48, K);
  const n = Math.floor(t / 3.6) % 3, f = t % 3.6;
  if (n === 0) { rect(x0, y0, x1, y1, hex('#eef2f6')); rect(x0 + 3, y1 - 3, x1 - 3, y1 - 3, C.grisS); rect(x0 + 3, y0 + 2, x0 + 3, y1 - 3, C.grisS);
    [5, 8, 6, 10, 14].forEach((a, k) => { const bx = x0 + 6 + k * 6, al = Math.round(a * Math.min(1, f / 0.8)); if (al > 0) rect(bx, y1 - 3 - al, bx + 3, y1 - 4, k === 4 ? C.rojo : hex('#4a78d0')); }); }
  else if (n === 1) { rect(x0, y0, x1, y1, hex('#d8d4cc')); rect(x0 + 8, y0 + 1, x1 - 8, y1, C.blanco); for (let k = 0; k < 6; k++) rect(x0 + 11, y0 + 4 + k * 3, x1 - 11 - (k * 5) % 9, y0 + 4 + k * 3, C.grisL);
    if (f > 0.6) { rect(x0 + 10, y0 + 9, x1 - 10, y0 + 11, hex('#f8e870')); rect(x0 + 11, y0 + 10, x1 - 14, y0 + 10, C.grisS); } if (f > 1.4) R.icono('X', x1 - 13, y0 + 13, C.rojo, C.blanco); }
  else { rect(x0, y0, x1, y1, hex('#3a4250')); rect(x0 + 10, y0 + 3, x1 - 10, y1 - 2, K); rect(x0 + 11, y0 + 4, x1 - 11, y1 - 3, C.blanco); rect(x0 + 11, y1 - 5, x1 - 11, y1 - 3, hex('#d8d8dc'));
    rect(x0 + 14, y0 + 6, x1 - 14, y0 + 11, hex('#1c2230')); pset(x0 + 16, y0 + 8, C.tealT); pset(x0 + 17, y0 + 9, C.verdeT); for (let k = 0; k < 6; k++) pset(x0 + 15 + k * 2, y1 - 6, C.tealT); }
  if (f < 0.18) { const yy = y0 + Math.round(f / 0.18 * (y1 - y0)); rect(x0, yy, x1, yy, C.blanco); }
  for (let k = 0; k < 7; k++) { h_aclara(R, x0 + 22 + k, y0 + k, 0.3, [255, 255, 255]); h_aclara(R, x0 + 25 + k, y0 + k, 0.2, [255, 255, 255]); }
}
// la puerta del fondo con su ventanuco esmerilado (de vez en cuando pasa por el pasillo la sombra de alguien) y el reloj
// encima; la puerta se pierde detrás de la tribuna del jurado
function h_puerta(R, t) {
  const { rect, pset, disco } = R, K = C.k, B = h_TB;
  rect(223, 32, 255, 70, K); rect(224, 33, 254, 70, B.nogalL); rect(226, 35, 252, 70, B.nogal); rect(252, 35, 252, 70, B.nogalS);
  rect(230, 39, 248, 55, K); rect(231, 40, 247, 54, hex('#d8dcd4')); rect(231, 40, 247, 40, hex('#eef0ea'));
  const u = (t * 0.085 + 0.55) % 1; if (u < 0.3) { const sx = Math.round(226 + u / 0.3 * 26), g = hex('#a8aca4'), gs = hex('#9a9e96'); for (let y = 46; y <= 54; y++) for (let x = sx - 4; x <= sx + 4; x++) if (x >= 231 && x <= 247) pset(x, y, (x + y) % 2 ? g : gs); for (let y = 41; y <= 46; y++) for (let x = sx - 2; x <= sx + 2; x++) if (x >= 231 && x <= 247 && Math.hypot(x - sx, y - 43.5) < 2.8) pset(x, y, g); }
  h_cuarteron(R, 230, 59, 248, 70, B.nogal, B.nogalL, B.nogalS, B.nogalV, 77);
  h_reloj(R, 239, 22, 8, t, 10.12, B.nogal);
}
// el cuadro de las colinas doradas de California, con su marco de pan de oro (debajo del sitio de Atom)
function h_cuadro(R, t) {
  const { rect, pset, disco, poligono } = R, K = C.k;
  rect(261, 47, 315, 69, K); rect(262, 48, 314, 68, C.oroS); rect(262, 48, 313, 48, C.oroL); rect(262, 48, 262, 67, C.oro); rect(264, 50, 312, 66, K);
  for (let y = 51; y <= 65; y++) rect(265, y, 311, y, y < 55 ? hex('#7ab8e0') : hex('#a8d0ec'));
  rect(Math.round(270 + (t * 0.4) % 30), 53, Math.round(277 + (t * 0.4) % 30), 53, C.blanco);
  poligono([[265, 60], [280, 56], [296, 59], [311, 55], [311, 65], [265, 65]], hex('#c8943a')); poligono([[265, 63], [284, 59], [302, 62], [311, 61], [311, 65], [265, 65]], hex('#e0b050'));
  disco(292, 56, 4, hex('#3a6a3a')); disco(290, 55, 3, hex('#4a8a4a')); rect(292, 59, 292, 61, C.cortezaS);
}

// la sala vista desde la mesa del juez, desenfocada (fondo del plano del mazo): la pared de nogal con los paneles en franjas
// suaves, el ventanal brillante arriba a la izquierda (de donde viene el rayo de luz), el sello y la bandera en manchas,
// luces que brillan despacio y el público en penumbra, que se mueve; de vez en cuando alguien cruza
function h_salaDesenfocada(R, t) {
  const { rect, pset, disco } = R, F = [hex('#2e2018'), hex('#34241a'), hex('#3a291e'), hex('#402e22')];
  for (let y = 0; y < 126; y++) rect(0, y, 319, y, F[Math.min(3, Math.floor(y / 32))]);
  for (let k = 0; k < 8; k++) { const x0 = -14 + k * 46; rect(x0 + 4, 8, x0 + 32, 86, hex('#47331f')); for (let y = 8; y < 87; y += 2) { pset(x0 + 3, y, hex('#47331f')); pset(x0 + 33, y + 1, hex('#47331f')); } rect(x0 + 4, 88, x0 + 32, 88, hex('#3a291e')); }
  rect(0, 90, 319, 93, hex('#4e3826')); for (let x = 0; x < 320; x += 2) { pset(x, 89, hex('#4e3826')); pset(x + 1, 94, hex('#4e3826')); }
  // el ventanal, brillante y con las lamas de la persiana
  for (let y = 0; y < 38; y++) for (let x = 12; x < 90; x++) { const e = Math.max(Math.abs(x - 51) / 39, Math.abs(y - 14) / 24); if (e > 1) continue; const borde = e > 0.9 ? 2 : e > 0.8 ? 1 : 0; if (borde === 2 && (x + y) % 2) continue;
    pset(x, y, borde === 2 ? hex('#6a5038') : borde === 1 ? hex('#a8906c') : (y >> 2) % 2 ? hex('#e8dcc0') : hex('#d0c0a0')); }
  // el sello y la bandera, desenfocados
  disco(150, 50, 22, (x, y, d) => (d > 0.86 ? ((x + y) % 2 ? hex('#5a4424') : hex('#46321f')) : d > 0.56 ? hex('#8a6a30') : hex('#3a3c5e')));
  disco(144, 44, 4, hex('#a88a48'));
  for (let y = 40; y < 98; y++) for (let x = 226; x < 270; x++) { const borde = x < 228 || x > 267 || y < 42 || y > 95; if (borde && (x + y) % 2) continue; pset(x, y, x < 246 && y < 62 ? hex('#30386a') : Math.floor((y - 40) / 5) % 2 ? hex('#a89a88') : hex('#7a3a3a')); }
  // luces que brillan despacio (manchas redondas)
  for (const [x, y, r, k] of [[108, 36, 5, 0], [198, 14, 4, 1], [250, 24, 3, 2], [60, 70, 4, 3], [118, 84, 3, 4], [300, 72, 5, 5]]) { const v = 0.5 + 0.5 * Math.sin(t * 0.9 + k * 1.7);
    for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const e = Math.hypot(i, j) / r; if (e <= 1 && (e < 0.7 || (i + j) % 2 === 0)) pset(x + i, y + j, e >= 0.7 ? hex('#8a6a40') : v > 0.5 ? hex('#e8c888') : hex('#c8a870')); } }
  // el público en penumbra: hombros y cabezas que se mecen; de vez en cuando alguien cruza
  for (let k = 0; k < 11; k++) { const x = Math.round(14 + k * 29 + Math.sin(t * (0.6 + (k % 3) * 0.15) + k * 1.3) * 3), y = 110 + (k % 2) * 3, c = k % 3 ? hex('#22160f') : hex('#2a1c14'), cab = Math.round(Math.sin(t * 1.1 + k * 2.1) * 2);
    disco(x, y + 14, 12, c); disco(x + cab, y - 2 + (Math.sin(t * 0.9 + k) > 0.8 ? 1 : 0), 6, c); }
  const u = (t % 7) / 3.5; if (u < 1) { const x = Math.round(lerp(-20, 340, u)), y = 100 + Math.round(Math.abs(Math.sin(u * 20)) * 2); disco(x, y + 14, 11, hex('#1c120c')); disco(x, y - 4, 6, hex('#1c120c')); }
}
// el veredicto en dos columnas, en la pizarra de la sala (paleta de tiza)
const h_PZ = pal({ verde: '#2a3a34', verdeL: '#344640', borron: '#32433c', fantasma: '#3c4e47', tiza: '#e4ece6', tizaS: '#a8b8ac', tizaA: '#f0d878', tizaAS: '#b8a050', tizaR: '#f0707a', tizaRS: '#b84a54' });
// un trazo de tiza: una línea (de g px de grueso) con huecos y granos, como en una pizarra de verdad
function h_tiza(R, x0, y0, x1, y1, c, g = 1, k = 0) {
  const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
  for (let i = 0; i <= n; i++) { const x = Math.round(x0 + (x1 - x0) * i / n), y = Math.round(y0 + (y1 - y0) * i / n); for (let a = 0; a < g; a++) for (let b = 0; b < g; b++) if (h(x + a, y + b, 130 + k) < 0.84) R.pset(x + a, y + b, c); }
}
// un aro de tiza (cx, cy, radio r) con su grano; a0 y a1 (radianes) para dejarlo abierto; g, el grueso
function h_aroTiza(R, cx, cy, r, c, k = 0, a0 = 0, a1 = Math.PI * 2, g = 1) {
  for (let a = a0; a < a1; a += 0.6 / r) { const x = Math.round(cx + Math.cos(a) * r), y = Math.round(cy + Math.sin(a) * r); for (let i = 0; i < g; i++) if (h(x + i, y, 140 + k) < 0.86) R.pset(x + i, y, c); }
}
// una figurita de tiza (cabeza redonda y cuerpo) en (x, y) = la coronilla; corbata o una cruz de tirita
function h_figuraTiza(R, x, y, c, tipo, k) {
  h_aroTiza(R, x, y + 4, 4, c, k); const P = [[-8, 19], [-7, 13], [-4, 10], [4, 10], [7, 13], [8, 19]]; for (let i = 0; i + 1 < P.length; i++) h_tiza(R, x + P[i][0], y + P[i][1], x + P[i + 1][0], y + P[i + 1][1], c, 1, k + i);
  if (tipo === 'corbata') { h_tiza(R, x - 4, y + 10, x - 1, y + 15, c, 1, k + 7); h_tiza(R, x + 4, y + 10, x + 1, y + 15, c, 1, k + 8); for (let j = 11; j <= 16; j++) R.pset(x, y + j, j === 11 ? C.rojoS : C.rojo); }
  else { R.pset(x + 4, y + 14, C.rojo); R.pset(x + 3, y + 15, C.rojo); R.pset(x + 4, y + 15, C.rojo); R.pset(x + 5, y + 15, C.rojo); R.pset(x + 4, y + 16, C.rojo); }
}
// el calendarito de anillas que va junto a cada barra de condena (x, y: esquina de arriba; 19 × 19)
function h_calendarito(R, x, y) {
  const { rect, pset } = R, K = C.k;
  rect(x, y, x + 18, y + 18, K); rect(x + 1, y + 1, x + 17, y + 17, C.blanco); rect(x + 1, y + 1, x + 17, y + 5, C.rojo); rect(x + 1, y + 1, x + 17, y + 1, hex('#e05a5a')); rect(x + 1, y + 6, x + 17, y + 6, C.rojoS);
  for (const ax of [x + 5, x + 12]) { rect(ax, y - 2, ax + 1, y + 2, K); pset(ax, y - 1, C.metalL); }
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) pset(x + 4 + i * 4, y + 8 + j * 3, K);
  rect(x + 15, y + 15, x + 17, y + 17, hex('#d8d0c0')); pset(x + 17, y + 17, K); pset(x + 15, y + 15, K);
}

// la paleta del cuarto del calendario: papel pintado crema con rayas y florecitas, moldura, cortinas rosa viejo
const h_CAL = pal({ pared: '#dccaa6', raya: '#d4c09a', flor: '#c4ac84', florC: '#d89a8a', moldura: '#c8b490', molduraS: '#a8946c', sombra: '#c2ae88', cordel: '#6a5a4a',
  cortina: '#c89a9a', cortinaL: '#e0b8b4', cortinaS: '#a47676', radiador: '#9aaaa4', radiadorS: '#74847e', radiadorL: '#bcc8c2' });

// ── auxiliares de los decorados del laboratorio y del periódico (F y G) ──────────────────────────────────────────────
// las paletas de cada decorado
const g_LAB = pal({
  pared: '#dde8e2', paredS: '#d0ddd6', paredL: '#e9f1ed', junta: '#c6d4cd', guarda: '#c9d6d0', zocalo: '#9aaaa4', zocaloL: '#b4c2bc',
  techo: '#c8d4ce', techoS: '#bac6c0', cornisa: '#b4c0ba', difusor: '#e4ecf0', brillo: '#d8e4de',
  campana: '#e4e8ee', campanaS: '#b8c0ca', rejilla: '#5a6474', dentro: '#eef4f6', cristal: '#d4e8ee', reflejo: '#ffffff',
  colina: '#9ab8a8', nave: '#e8dcc0', naveS: '#b8a888', naveV: '#8aa4b8', lama: '#eeeae2', lamaS: '#c8c4bc',
  gasL: '#f8e080', regleta: '#f0f0f4', bisel: '#3a3e48', pantalla: '#0e1a24', rejillaP: '#16263a', cursor: '#1c3248', reflejoP: '#1e3040',
  lavaojos: '#3aa86a', armario: '#b8c0c8', armarioL: '#d4dae0', armarioS: '#9aa2ac', puerta: '#c8d0d8', zocaloA: '#8a929c',
  frio: '#c8e0f0', reflejoF: '#e4f2fa', dentroA: '#2a3a4a', dentroAL: '#4a6a7a', plato: '#22303e', platoL: '#3a4a5a', reflejoA: '#4a5e70',
  goma: '#3a3e48', gomaL: '#6a6e78', suelo: '#b8c8c4', sueloS: '#a4b4b0', sueloJ: '#adbdb9', reflejoS: '#c4d2ce', brilloS: '#d4e0dc',
});
const g_RED = pal({
  techo: '#cfcbc3', techoS: '#c2beb6', soffit: '#b8b4ac', alu: '#9aa2ae', aluL: '#c8ced8', bruma: '#d4e4ee', estela: '#eef6fb',
  lejos: '#b8c6d8', lejosN: '#2a3462', medio1: '#8a94a8', medio2: '#a0a8ba', medioL: '#c0c8d6', medioN1: '#1e2648', medioN2: '#262e54',
  ventD: '#c8d4e4', ventO: '#6e7890', ventN: '#f0d890', cerca: '#5a6274', cercaN: '#161c38', ventC: '#48505e', cromo: '#d0d6e0',
  deposito: '#8a5a3a', depositoS: '#5e3a24', vapor: '#eef2f6', estor: '#e8e2d4', estorS: '#cfc8b8', reflejo: '#e4eef6',
  alfeizar: '#c8c4bc', ticker: '#14181f', pared: '#d8d4cc', paredS: '#ccc8c0', corcho: '#b88a5a', corchoS: '#9a7048',
  tele: '#22262e', bolsa: '#0e1a2a', bolsaR: '#1a2a3a', noticias: '#2a4a8a', noticiasS: '#1e3870',
  mesa: '#e8e4dc', mesaS: '#b8b4aa', panel: '#9aa0ac', panelS: '#82889a', espalda: '#3a3e48', espaldaL: '#545866',
  pantalla: '#3a5a8a', pantallaL: '#8ab0d8', silla: '#2a2e3a', sillaL: '#454a5a', piel: '#f0c8a0',
  moqueta: '#767a88', moquetaS: '#6a6e7c', moquetaL: '#868a98', pasillo: '#80849a', sombra: '#5e6270',
  maceta: '#b8603a', macetaS: '#8a4428', archivo: '#9aa0ac', archivoS: '#7a8090',
  mesaF: '#5a5e6a', cajonera: '#6a6e7a', cajon: '#767a86', cajonL: '#8a8e9a', hueco: '#3e424c', huecoS: '#2e3238',
  papelera: '#4a5a7a', papeleraL: '#6a7a9a', telefono: '#2a2430', telefonoL: '#4a4450',
});
const g_ROT = pal({
  pared: '#3a3e48', llaga: '#33363f', ladrilloV: '#40444f', acero: '#2a2e36', aceroL: '#4a505c', cercha: '#33373f', luzPared: '#4a4a4c',
  marco: '#5a6270', interior: '#4c5462', costilla: '#454d5a', placa: '#4a5260', placaL: '#6a7280', engranaje: '#6e7684',
  papel: '#f4f0e4', papelS: '#d8d2c0', marca: '#8a8a90', rejilla: '#5a6270', rejillaS: '#3a404c', amarillo: '#d8b030', amarilloS: '#a88a20',
  noche: '#1e2650', nocheS: '#141a3e', ciudad: '#0e1228', ventana: '#f0d890', reflejo: '#2e3a6a',
  suelo: '#2a2e36', sueloS: '#24282f', mancha: '#212429', sueloL: '#363a42', pantalla: '#101a12',
});
const g_POR = pal({
  pared: '#f0e6d2', paredS: '#e6dcc6', azulejo: '#f4f0e8', junta: '#dcd4c4', cenefa: '#5a8ac8', cenefaS: '#3a6aa8',
  marco: '#fbf8f0', cielo1: '#a8d4f0', cielo2: '#cfe6f4', cielo3: '#f8e6c0', solH: '#fff0c0',
  tejado: '#9a4a4a', tejadoS: '#6e3434', casa: '#d4dae6', casaS: '#aab4c6', humo: '#eceef2',
  copa: '#5aa83a', copaS: '#3a7a28', copaL: '#8ad05a', cortina: '#e86a6a', cortinaL: '#f8f0ea', trapo: '#5a8ac8',
  alfeizar: '#e8e0d0', maceta: '#c86a3a', armario: '#a8743c', armarioS: '#83552c', armarioL: '#c8945a',
  nevera: '#f4f4f0', neveraS: '#d8d8d4', radio: '#3aa8a0', radioS: '#2a7a74', radioL: '#6ac8c0', tarro: '#e8dcc0',
  papel: '#f2eee4', papelS: '#e2ddcf', grano: '#e8e3d6', pliegue: '#d8d2c2', gris: '#9a968a', grisO: '#5a5850',
  foto: '#e4e0d4', trama: '#d6d2c4', mesaFoto: '#cfcabc', regla: '#b8b4a8', luz: '#fff8e4',
});

// números diminutos de 3 × 5 para pantallas, contadores y la fecha del periódico (solo cifras y signos); devuelve el ancho
const g_DIG = {
  0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['###', '..#', '###', '#..', '###'], 3: ['###', '..#', '.##', '..#', '###'],
  4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '###', '..#', '###'], 6: ['###', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'],
  8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '###'], '.': ['.', '.', '.', '.', '#'], '+': ['...', '.#.', '###', '.#.', '...'],
  '-': ['...', '...', '###', '...', '...'], '$': ['.##', '##.', '.#.', '.##', '##.'], '%': ['#.#', '..#', '.#.', '#..', '#.#'],
};
function g_digitos(R, s, x, y, c) {
  let cx = x;
  for (const ch of String(s)) { const g = g_DIG[ch]; if (!g) { cx += 2; continue; } for (let j = 0; j < 5; j++) for (let i = 0; i < g[j].length; i++) if (g[j][i] === '#') R.pset(cx + i, y + j, c); cx += g[0].length + 1; }
  return cx - x;
}
// los pictogramas de seguridad, sin letras (11 px de ancho): 'bio' (riesgo biológico) y 'peligro' («!») en el triángulo
// amarillo; 'guantes', 'gafas' y 'orejeras' en el círculo azul de obligación; 'lavaojos' (el ojo y el chorro) en el cuadro
// verde; (x, y): la esquina de arriba a la izquierda
const g_PICTO = {
  bio: ['.....k.....', '....kYk....', '....kkk....', '...kYkYk...', '...kYYYk...', '..kYYkYYk..', '..kYkYkYk..', '.kYkYYYkYk.', '.kYkkYkkYk.', 'kkkkkkkkkkk'],
  peligro: ['.....k.....', '....kYk....', '....kYk....', '...kYkYk...', '...kYkYk...', '..kYYkYYk..', '..kYYYYYk..', '.kYYYkYYYk.', '.kYYYYYYYk.', 'kkkkkkkkkkk'],
  guantes: ['...kkkkk...', '..kBBBBBk..', '.kBWBWBWBk.', 'kBBWBWBWBBk', 'kBBWBWBWBBk', 'kBWWWWWWBBk', 'kBBWWWWWBBk', 'kBBWWWWWBBk', '.kBBWWWBBk.', '..kBBBBBk..', '...kkkkk...'],
  gafas: ['...kkkkk...', '..kBBBBBk..', '.kBBBBBBBk.', 'kBBBBBBBBBk', 'kWWWWWWWWWk', 'kWkkWWWkkWk', 'kWkkWBWkkWk', 'kBWWWBWWWBk', '.kBBBBBBBk.', '..kBBBBBk..', '...kkkkk...'],
  orejeras: ['...kkkkk...', '..kBBBBBk..', '.kBBWWWBBk.', 'kBBWBBBWBBk', 'kBWBBBBBWBk', 'kWWWBBBWWWk', 'kWWWBBBWWWk', 'kWWWBBBWWWk', '.kBBBBBBBk.', '..kBBBBBk..', '...kkkkk...'],
  lavaojos: ['kkkkkkkkkkk', 'kGGGGGGGGGk', 'kGGWGGGWGGk', 'kGGWGGGWGGk', 'kGGGWGWGGGk', 'kGGGGGGGGGk', 'kGGWWWWWGGk', 'kGWWWkWWWGk', 'kGGWWWWWGGk', 'kGGGGGGGGGk', 'kkkkkkkkkkk'],
};
const g_PICTO_PAL = { k: C.k, Y: C.amarilloT, B: hex('#2a5ab8'), W: C.blanco, G: hex('#2a9a5a') };
function g_pictograma(R, tipo, x, y) { R.dibujo(g_PICTO[tipo], x, y, 1, g_PICTO_PAL); }
// una nube pequeña de tres tonos hecha solo con discos (así respeta R.recorte); w: el ancho
function g_nube(R, x, y, w) {
  const B = [[0, 0, 0.3], [-0.3, 0.08, 0.22], [0.3, 0.06, 0.24], [-0.1, -0.14, 0.24]];
  for (const [dx, dy, r] of B) R.disco(x + dx * w, y + dy * w + 1, r * w, hex('#c8d8e8'));
  for (const [dx, dy, r] of B) R.disco(x + dx * w, y + dy * w, r * w, hex('#e4eef6'));
  for (const [dx, dy, r] of B) R.disco(x + dx * w - 1, y + dy * w - 1, r * w * 0.72, C.blanco);
}
// una palmera que se mece (x, suelo: el pie del tronco; alto en px; k desfasa el vaivén)
function g_palmera(R, x, suelo, alto, t, k = 0) {
  const m = Math.sin(t * 1.3 + k) * 1.5;
  for (let j = 0; j <= alto; j++) { const u = j / alto, px = Math.round(x + Math.sin(u * 1.6) * 3 + m * u * u); R.pset(px, suelo - j, j % 3 ? C.corteza : C.cortezaS); R.pset(px + 1, suelo - j, C.cortezaS); }
  const tx = Math.round(x + Math.sin(1.6) * 3 + m), ty = suelo - alto;
  for (let f = 0; f < 6; f++) { const a = -Math.PI + f * Math.PI / 5 + Math.sin(t * 2 + f + k) * 0.1; for (let d = 1; d < 9; d++) R.pset(Math.round(tx + Math.cos(a) * d), Math.round(ty + Math.sin(a) * d * 0.6 + d * d / 22), d > 6 ? C.hierbaS : C.hierba); }
}
// los conductos de chapa: horizontal (8 px de alto, de x0 a x1) y vertical (10 px de ancho, de y0 a y1), con sus bandas
function g_conductoH(R, x0, x1, y) {
  const { rect, pset } = R;
  rect(x0, y, x1, y + 7, C.k); rect(x0, y + 1, x1, y + 6, C.metal); rect(x0, y + 1, x1, y + 2, C.metalL); rect(x0, y + 5, x1, y + 6, C.metalS);
  for (let x = x0 + 8; x < x1; x += 16) { rect(x, y + 1, x + 1, y + 6, C.metalS); pset(x + 1, y + 2, C.metalL); pset(x, y + 4, C.metalD); }
}
function g_conductoV(R, x, y0, y1) {
  const { rect } = R;
  rect(x, y0, x + 9, y1, C.k); rect(x + 1, y0, x + 8, y1, C.metal); rect(x + 1, y0, x + 2, y1, C.metalL); rect(x + 7, y0, x + 8, y1, C.metalS);
  for (let y = y0 + 6; y < y1; y += 12) rect(x + 1, y, x + 8, y + 1, C.metalS);
}
// una rueda dentada que gira (rot en radianes), con sus dientes, cuatro radios y el cubo
function g_engranaje(R, cx, cy, r, rot, col, n = 12) {
  const { rect, pset, disco, linea } = R;
  for (let i = 0; i < n; i++) { const a = rot + i / n * Math.PI * 2, x = Math.round(cx + Math.cos(a) * (r + 1)), y = Math.round(cy + Math.sin(a) * (r + 1)); rect(x - 1, y - 1, x + 1, y + 1, C.k); pset(x, y, col); }
  disco(cx, cy, r, C.k); disco(cx, cy, r - 1, col); disco(cx, cy, r - 3, C.metalS);
  for (let i = 0; i < 4; i++) { const a = rot + i * Math.PI / 2; linea(cx, cy, Math.round(cx + Math.cos(a) * (r - 2)), Math.round(cy + Math.sin(a) * (r - 2)), col); }
  disco(cx, cy, 2, C.k); pset(cx, cy, C.metalL);
}

// ── auxiliares de los decorados del plató y de hoy (prisión, cine, sala, charla, visor) ──────────────────────────────
// el umbral de la trama ordenada 4 × 4 (0–1): degradados, halos y brumas tramados, sin ruido
const I_B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const i_b4 = (x, y) => (I_B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
// mezcla dos colores de la paleta (f = 0, el primero; f = 1, el segundo)
const i_mezcla = (a, b, f) => { let r = 0xff000000; for (const s of [0, 8, 16]) { const p = (a >>> s) & 255, q = (b >>> s) & 255; r |= Math.round(p + (q - p) * f) << s; } return r >>> 0; };
// las rampas de los cielos: el alba de Texas, la tierra seca con la luz rasante, el anochecer de la calle y la bahía de noche
const I_ALBA = ['#222a5c', '#30347a', '#4c428a', '#7a4c8c', '#a8547e', '#d26c72', '#ee9064', '#f8b86e', '#fcd890', '#fdeab8'].map(hex);
const I_TIERRA = ['#e2bc86', '#cfa872', '#bb9562', '#a68255', '#93714a'].map(hex);
const I_ANOCHECER = ['#141a44', '#1c2256', '#282a68', '#3e3274', '#5e3a7a', '#8a467c', '#b8587a', '#e07c6e'].map(hex);
const I_BAHIA = ['#0a1034', '#101a48', '#1a2260', '#2a2a6c', '#443274', '#663c7a', '#8a4c7e'].map(hex);
// degradado vertical tramado en [x0, x1] × [y0, y1], de cols[0] arriba a cols[n] abajo; curva > 1 alarga los colores de
// arriba; luz(x, y), si se da, suma pasos de la rampa (el resplandor alrededor del sol, de la ciudad o del suelo)
function i_degradado(R, x0, y0, x1, y1, cols, luz = null, curva = 1) {
  const n = cols.length - 1, alto = Math.max(1, y1 - y0);
  for (let y = y0; y <= y1; y++) { const base = ((y - y0) / alto) ** curva * n;
    for (let x = x0; x <= x1; x++) { let v = luz ? base + luz(x, y) : base; v = v < 0 ? 0 : v > n ? n : v; let l = Math.floor(v); if (v - l > i_b4(x, y)) l++; R.pset(x, y, cols[l > n ? n : l]); } }
}
// nube alargada del alba o del anochecer, encendida por debajo: c = [arriba, cuerpo, luz, filo]; (cx, cy) es el centro
// de su base plana, w el ancho y k la semilla de su forma (de 3 a 7 bolas que se solapan)
function i_nube(R, cx, cy, w, k, c) {
  const n = 3 + Math.min(4, Math.floor(w / 16)), B = [];
  for (let i = 0; i < n; i++) { const u = i / (n - 1), m = 1 - Math.abs(u - 0.5) * 2; B.push([cx + (u - 0.5) * w * 0.78 + (h(k, i, 81) - 0.5) * 5, cy - 1 - m * (2 + h(k, i, 82) * 3), w * (0.13 + h(k, i, 83) * 0.09), 2 + m * 3 + h(k, i, 84) * 1.5]); }
  const den = (x, y) => { if (y > cy + 1) return false; for (const [bx, by, rx, ry] of B) { const a = (x - bx) / rx, b = (y - by) / ry; if (a * a + b * b < 1) return true; } return false; };
  const x0 = Math.floor(cx - w * 0.62), x1 = Math.ceil(cx + w * 0.62);
  for (let y = Math.floor(cy - 13); y <= cy + 1; y++) for (let x = Math.max(0, x0); x <= Math.min(319, x1); x++) if (den(x, y)) R.pset(x, y, !den(x, y + 1) ? c[3] : !den(x, y + 2) ? c[2] : !den(x, y - 1) ? c[0] : c[1]);
}
// vapor que sube de un tubo, de una taza o de una alcantarilla (x, y: la boca), en bocanadas redondas que crecen, se
// deshacen por el borde (tramado) y se las lleva el aire
function i_vapor(R, x, y, t, k = 0, col = C.blanco, alto = 18) {
  for (let i = 0; i < 3; i++) { const u = (t * 0.3 + i / 3 + k * 0.29) % 1, r = 1.6 + u * 3.4, cx = x + u * alto * 0.45 + Math.sin(u * 6 + k + t * 0.7) * 1.2, cy = y - u * alto;
    for (let yy = Math.floor(cy - r); yy <= cy + r; yy++) for (let xx = Math.floor(cx - r); xx <= cx + r; xx++) { const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy) / r; if (d > 1) continue; if (d < 0.7 && u < 0.6) R.pset(xx, yy, col); else if (i_b4(xx, yy) < (1.1 - u) * (1.3 - d)) R.pset(xx, yy, col); } }
}
// una cabeza del público vista de espaldas (centro x, y; radio 8 con el contorno): tipo 0 pelo corto, 1 calvo con su
// brillo y el pelo de la nuca, 2 moño, 3 coleta que cae sobre la espalda, 4 rizos, 5 gorra del revés; pelo = [luz,
// sombra]; borde: la luz que le llega por arriba (la pantalla, los focos), que deja un filo en lo alto de la cabeza
function i_cabeza(R, x, y, tipo, pelo, piel, borde) {
  const { disco, pset, rect } = R, [pl, ps] = pelo, nuca = (dy, c) => { for (let i = -6; i <= 6; i++) pset(x + i, y + Math.round(Math.sqrt(49 - i * i)) - dy, c); };
  rect(x - 2, y + 6, x + 2, y + 9, i_mezcla(piel, C.k, 0.35));   // el cuello
  if (tipo === 4) { for (let a = 0; a < 8; a++) disco(x + Math.round(Math.cos(a * 0.785) * 6), y + Math.round(Math.sin(a * 0.785) * 6), 3, C.k); disco(x, y, 8, C.k); for (let a = 0; a < 8; a++) disco(x + Math.round(Math.cos(a * 0.785) * 6), y + Math.round(Math.sin(a * 0.785) * 6), 2, ps); disco(x, y, 7, ps); disco(x - 1, y - 2, 4, pl); for (let a = 0; a < 5; a++) pset(x - 4 + a * 2, y - 8 + (a % 2), borde); return; }
  disco(x, y, 8, C.k);
  if (tipo === 1) { disco(x, y, 7, piel); disco(x - 1, y - 2, 4, i_mezcla(piel, C.blanco, 0.15)); pset(x - 3, y - 4, i_mezcla(piel, C.blanco, 0.6)); nuca(1, pl); nuca(2, ps); nuca(3, ps); }
  else if (tipo === 5) { const g = (x & 1) ? hex('#b8343a') : hex('#2e4a8a'); disco(x, y, 7, i_mezcla(g, C.k, 0.3)); disco(x, y - 1, 6, g); disco(x - 1, y - 3, 3, i_mezcla(g, C.blanco, 0.25)); nuca(1, ps); nuca(2, ps); rect(x - 1, y + 3, x + 1, y + 4, ps); pset(x, y - 7, i_mezcla(g, C.k, 0.4)); }
  else { disco(x, y, 7, ps); disco(x - 1, y - 1, 5, pl); for (let i = -3; i <= 3; i += 2) pset(x + i, y + 4 + (i & 2 ? 1 : 0), i_mezcla(ps, C.k, 0.3)); }
  if (tipo === 2) { disco(x, y - 8, 3, C.k); disco(x, y - 8, 2, pl); pset(x - 1, y - 9, borde); }
  if (tipo === 3) { rect(x - 2, y + 6, x + 2, y + 15, C.k); rect(x - 1, y + 6, x + 1, y + 14, ps); rect(x - 1, y + 9, x - 1, y + 13, pl); rect(x - 1, y + 7, x + 1, y + 7, hex('#c83a5a')); }
  pset(x - 8, y + 1, piel); pset(x + 8, y + 1, piel); pset(x - 8, y + 2, i_mezcla(piel, C.k, 0.3)); pset(x + 8, y + 2, i_mezcla(piel, C.k, 0.3));   // las orejas
  for (let i = -4; i <= 4; i++) pset(x + i, y - Math.round(Math.sqrt(49 - i * i)), Math.abs(i) < 4 ? borde : i_mezcla(borde, pl, 0.5));   // el filo de luz
}
