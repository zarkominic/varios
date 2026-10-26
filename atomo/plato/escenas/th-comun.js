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
  for (let k = 0; k < 13; k++) { const x = 6 + k * 25, y = 176; disco(x, y, 8, C.k); disco(x, y - 1, 7, [hex('#3a2a20'), hex('#c8a060'), hex('#1e1a24'), hex('#6a4a2a')][k % 4]); }   // las cabezas del público, de espaldas
}
// las dos condenas como barras de calendario, en meses: Holmes 135, Balwani 155 (o.u 0–1 las hace crecer); los dos
// personajes pequeños delante de cada barra los pone la escena
export function condenas(R, t, o = {}) {
  const { rect, pset } = R, u = o.u ?? 1;
  tribunal(R, t); tinte(R, 0, 179, [30, 30, 46], 0.72);
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
// el calendario de pared con la hoja del 30 (y el año), que pasa las hojas hasta quedarse en ella (o.u 0–1)
export function calendario(R, t, o = {}) {
  const { rect, pset } = R, u = o.u ?? 1; rect(0, 0, 319, 179, hex('#d8c8a8')); for (let y = 0; y < 180; y += 4) for (let x = 0; x < 320; x++) if (h(x >> 3, y, 77) < 0.06) pset(x, y, hex('#cdbc9a'));
  rect(110, 24, 210, 150, C.k); rect(112, 26, 208, 148, C.blanco); rect(112, 26, 208, 52, C.rojo); R.numero('2023', 160, 46, { tam: 16, centro: true, color: C.blanco });
  const dia = u < 1 ? 1 + Math.floor(u * 29) : 30; R.numero(String(dia), 160, 116, { tam: 32, centro: true, color: C.k });
  if (u < 1) { const y = Math.round(52 + ((t * 30) % 1) * 90); rect(112, 52, 208, y, hex('#f4f0e8')); rect(112, y, 208, y + 1, C.grisL); }
  for (let k = 0; k < 2; k++) { R.disco(140 + k * 40, 24, 3, C.k); R.disco(140 + k * 40, 24, 2, C.metal); }
  rect(240, 60, 290, 110, C.k); R.disco(265, 85, 22, C.k); R.disco(265, 85, 21, C.blanco); const a = t * 0.5; R.linea(265, 85, Math.round(265 + Math.cos(a) * 14), Math.round(85 + Math.sin(a) * 14), C.k); R.linea(265, 85, 265, 72, C.k); rect(0, 160, 319, 179, C.madera);
}
// el visor de la cámara del documental: la calle por dentro del encuadre, las esquinas, el punto rojo que parpadea y el
// contador de días; ella camina y la cámara la sigue
export function visor(R, t, o = {}) {
  calle(R, t, { tarde: true }); const { rect, pset } = R; const x = Math.round(80 + ((t * 10) % 140)); R.actor(ELENCO_CHIBI.holmes, x, 122, t, { dir: 1, anda: true });
  tinte(R, 0, 179, [40, 40, 50], 0.18); for (const [cx, cy, dx, dy] of [[20, 20, 1, 1], [300, 20, -1, 1], [20, 160, 1, -1], [300, 160, -1, -1]]) { rect(Math.min(cx, cx + dx * 16), cy, Math.max(cx, cx + dx * 16), cy + 1, C.blanco); rect(cx, Math.min(cy, cy + dy * 16), cx + 1, Math.max(cy, cy + dy * 16), C.blanco); }
  if (Math.floor(t * 2) % 2) R.disco(36, 34, 4, C.rojo); R.numero(String(o.dia ?? 34), 284, 160, { color: C.blanco, centro: true }); rect(150, 86, 170, 87, C.blanco); rect(159, 77, 160, 96, C.blanco);
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
