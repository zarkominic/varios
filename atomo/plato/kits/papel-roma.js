// =====================================================================================
// Kit de RECORTES DE PAPEL · ROMA (episodio 5)
// -------------------------------------------------------------------------------------
// Encima de kits/papel-adulta.js (mismo papel: fibras, filos de tijera, sombra por altura, temblor de
// stop-motion a 12 fps, cartela, Atom de papel). Lo que añade:
//  · RO: la paleta romana, más viva que la adulta: mármol, terracota, ocre, púrpura imperial, laurel, oro,
//    cielo mediterráneo de atardecer y azul del mar. Cada escena usa los colores que necesite.
//  · romano(o): personaje de papel recortado con cara legible (ojos con pupila, cejas, nariz, boca, barba),
//    articulado (brazos, piernas, cabeza) y vestido según el papel: túnica, toga con banda, coraza, capa,
//    pieles; corona, laurel, casco con cresta, pelo largo o corto.
//  · columna(), frontón(), cortina(): piezas de arquitectura romana en papel.
//
//   import * as K from '/atomo/plato/kits/papel-roma.js';   // todo lo de papel-adulta, más lo de aquí
// =====================================================================================
import * as P from '/atomo/plato/kits/papel-adulta.js';
export * from '/atomo/plato/kits/papel-adulta.js';

const { TAU, PI } = P;

export const RO = {
  marmol: '#efe6d6', marmolD: '#d6c8b0', marmolS: '#b9a88c',
  terracota: '#c8613a', terracotaD: '#9c4527', terracotaL: '#e08a5f',
  ocre: '#d9a441', ocreD: '#a97a26', ocreL: '#f0c56d',
  purpura: '#6b2a5e', purpuraD: '#4a1a40', purpuraL: '#8e4a80',
  rojo: '#a8262b', rojoD: '#7a171c', rojoL: '#cf4a45',
  laurel: '#5f7d3a', laurelD: '#435a27', laurelL: '#86a554',
  oro: '#e2b043', oroD: '#b07f1e', oroL: '#f5d77e',
  bronce: '#a86b34', bronceD: '#7a4a20',
  cieloA: '#f2b880', cieloB: '#d9785a', cieloC: '#5a3a5e',  // atardecer: arriba, medio, noche
  azul: '#2f6f8f', azulD: '#1f4d66', azulL: '#5ea1b9',
  piel: '#e3b48f', pielD: '#c08a65', piel2: '#b27a54', piel2D: '#8c5a3a', piel3: '#f0caa6',
  pelo: '#3a2516', peloR: '#8a4a22', peloG: '#9a9088', peloN: '#1c1512', peloRub: '#c99a4a',
  lino: '#e9dcc0', linoD: '#cdbb98', piel_animal: '#7a5a3e', piel_animalD: '#5a4028',
  sombraT: '#2a1a1c',
};

const pg = (pts) => P.poligono(pts);
const pz = (path, col, o = {}) => P.papel(path, col, o);

/**
 * Personaje romano de papel. Origen en los pies (centro), mirando a la derecha (o.mirar = -1, a la izquierda).
 * Altura de diseño 300 px a escala 1 (o.escala).
 * o: { escala, mirar, id,
 *      piel, pelo, peinado ('corto' | 'largo' | 'calvo' | 'rizos'), barba ('no' | 'corta' | 'larga'),
 *      ropa ('tunica' | 'toga' | 'coraza' | 'pieles'), color (túnica), banda (color de la banda de la toga),
 *      capa (color o null), tocado ('no' | 'corona' | 'laurel' | 'casco' | 'diadema'), colorTocado,
 *      brazoD, brazoI (ángulos: 0 colgando, −π/2 hacia delante, −π arriba), cabeza (inclinación),
 *      paso (fase de andar 0–1), boca (0 cerrada … 1 abierta), cejas (−1 enfado … 1 sorpresa), ojos (0–1: abiertos),
 *      mano: función (g) que dibuja en la mano delantera, joven (cara más redonda y sin barba) }
 */
export function romano(o = {}) {
  const g = P.g, id = o.id ?? 1, s = o.escala ?? 1, m = o.mirar ?? 1;
  const piel = o.piel ?? RO.piel, pielD = P.mezcla(piel, '#000000', 0.22);
  const ropa = o.ropa ?? 'tunica', col = o.color ?? RO.lino, colD = P.mezcla(col, '#000000', 0.25);
  g.save(); g.scale(s * m, s);
  // ── piernas (sandalias o botas)
  const paso = o.paso ?? 0, sw = Math.sin(paso * TAU) * 0.28;
  const pierna = (sx, rot, sd) => {
    g.save(); g.translate(sx, -120); g.rotate(rot);
    pz(pg([[-11, 0], [11, 0], [9, 110], [-9, 110]]), ropa === 'pieles' ? RO.piel_animalD : piel, { d: 1.2, seed: id + sd, edge: 0.5 });
    // sandalia / bota
    pz(pg([[-12, 104], [12, 104], [24, 120], [-12, 120]]), ropa === 'coraza' ? RO.bronceD : RO.piel_animalD, { d: 1, seed: id + sd + 1, edge: 0.4 });
    if (ropa !== 'pieles') for (let k = 0; k < 3; k++) pz(P.rect(-10, 70 + k * 12, 20, 3), RO.piel_animalD, { d: 0.4, seed: id + sd + 2 + k, edge: 0.2 });
    g.restore();
  };
  pierna(-12, sw, 1); pierna(12, -sw, 5);
  // ── capa (detrás)
  if (o.capa) {
    const vu = Math.sin((o.t ?? 0) * 1.7 + id) * 6;
    pz(pg([[-34, -232], [30, -232], [44 + vu, -40], [-54 + vu, -36]]), o.capa, { d: 1.6, seed: id + 9 });
  }
  // ── brazo de atrás
  const brazo = (sx, ang, delante, sd) => {
    g.save(); g.translate(sx, -222); g.rotate(ang);
    const manga = ropa === 'coraza' ? RO.rojo : ropa === 'pieles' ? RO.piel_animal : col;
    pz(pg([[-12, -4], [12, -4], [10, 40], [-10, 40]]), delante ? manga : P.mezcla(manga, '#000000', 0.2), { d: 1.5, seed: id + sd });
    pz(pg([[-9, 38], [9, 38], [8, 86], [-8, 86]]), delante ? piel : pielD, { d: 1.4, seed: id + sd + 1, edge: 0.5 });
    g.translate(0, 92);
    pz(P.circulo(11, id + sd + 2, 0.05), delante ? piel : pielD, { d: 1.2, seed: id + sd + 2, edge: 0.4 });
    if (delante && o.mano) o.mano(g);
    g.restore();
  };
  brazo(-24, o.brazoI ?? 0.12, false, 20);
  // ── cuerpo
  const torso = pg([[-30, -236], [30, -236], [36, -118], [-36, -118]]);
  if (ropa === 'tunica') {
    pz(pg([[-30, -236], [30, -236], [42, -100], [-42, -100]]), col, { d: 1.8, seed: id + 30 });
    pz(P.rect(-36, -150, 72, 8, 2), o.banda ?? RO.piel_animalD, { d: 0.6, seed: id + 31, edge: 0.3 }); // cinturón
  } else if (ropa === 'toga') {
    pz(pg([[-32, -236], [32, -236], [44, -96], [-44, -96]]), col, { d: 1.8, seed: id + 30 });
    // el paño que cruza del hombro a la cadera, con su banda de color
    pz(pg([[-34, -236], [-8, -236], [40, -140], [36, -112], [14, -112]]), colD, { d: 2.2, seed: id + 32 });
    pz(pg([[-34, -236], [-26, -236], [40, -128], [38, -116]]), o.banda ?? RO.purpura, { d: 2.4, seed: id + 33, edge: 0.4 });
  } else if (ropa === 'coraza') {
    pz(pg([[-38, -110], [38, -110], [44, -96], [-44, -96]]), RO.rojo, { d: 1.5, seed: id + 34 });                 // falda roja
    for (let k = -3; k <= 3; k++) pz(P.rect(k * 11 - 4, -126, 9, 28, 2), RO.bronceD, { d: 1.6, seed: id + 35 + k, edge: 0.3 }); // tiras de cuero
    pz(torso, RO.bronce, { d: 2, seed: id + 36 });
    for (let k = 0; k < 4; k++) pz(P.rect(-28, -200 + k * 20, 56, 4, 2), RO.bronceD, { d: 0.5, seed: id + 40 + k, edge: 0.2 });
  } else if (ropa === 'pieles') {
    pz(pg([[-32, -236], [32, -236], [42, -104], [-42, -104]]), col, { d: 1.8, seed: id + 30 });
    g.save(); g.translate(-6, -206); pz(P.mancha(34, id + 37, 0.25, 11, 0.55), RO.piel_animal, { d: 2.4, seed: id + 38 }); g.restore();
  }
  // ── cuello y cabeza
  pz(P.rect(-8, -252, 16, 22, 4), pielD, { d: 1, seed: id + 50, edge: 0.4 });
  g.save(); g.translate(0, -282); g.rotate(o.cabeza ?? 0);
  const joven = !!o.joven;
  const cara = joven ? P.elipse(30, 32, id + 51, 0.02) : pg([[-28, -30], [22, -34], [32, -12], [34, 10], [26, 30], [4, 38], [-22, 30], [-30, 6]]);
  // pelo de atrás (largo)
  const pe = o.peinado ?? 'corto', colPelo = o.pelo ?? RO.pelo;
  if (pe === 'largo') pz(pg([[-34, -26], [6, -40], [20, -28], [-6, 10], [-12, 56], [-36, 52]]), colPelo, { d: 1.2, seed: id + 52 });
  pz(cara, piel, { d: 1.6, seed: id + 53, edge: 0.6 });
  // oreja
  g.save(); g.translate(-14, 2); pz(P.elipse(7, 10, id + 54, 0.05), pielD, { d: 1, seed: id + 54, edge: 0.3 }); g.restore();
  // nariz (pieza saliente hacia delante)
  pz(pg([[22, -8], [36, 8], [24, 12]]), piel, { d: 1.9, seed: id + 55, edge: 0.4 });
  // barba
  const ba = o.barba ?? 'no';
  if (ba === 'corta') pz(pg([[-24, 8], [28, 10], [26, 30], [4, 40], [-20, 30]]), colPelo, { d: 1.8, seed: id + 56 });
  if (ba === 'larga') pz(pg([[-26, 4], [30, 8], [28, 34], [8, 64], [-12, 58], [-24, 30]]), colPelo, { d: 1.8, seed: id + 56 });
  // ojo (de perfil a tres cuartos: un ojo grande y otro pequeño)
  const g2 = P.g, ab = o.ojos ?? (((o.t ?? 0) + id * 0.7 + 1.3) % 3.4 < 0.12 ? 0 : 1);
  const ojo = (x, y, r) => {
    if (ab < 0.3) { g2.fillStyle = P.mezcla(piel, '#000000', 0.5); g2.fillRect(x - r, y, r * 2, 2.5); return; }
    g2.fillStyle = RO.marmol; g2.beginPath(); g2.ellipse(x, y, r, r * 0.72 * ab, 0, 0, TAU); g2.fill();
    g2.fillStyle = '#1f1612'; g2.beginPath(); g2.arc(x + r * 0.3, y, r * 0.48, 0, TAU); g2.fill();
    g2.fillStyle = '#ffffff'; g2.beginPath(); g2.arc(x + r * 0.42, y - r * 0.22, r * 0.14, 0, TAU); g2.fill();
  };
  ojo(14, -10, 6.5); ojo(-4, -10, 5);
  // cejas
  const ce = o.cejas ?? 0;
  g2.strokeStyle = P.mezcla(colPelo, '#000000', 0.2); g2.lineWidth = 3.4; g2.lineCap = 'round';
  g2.beginPath(); g2.moveTo(6, -22 - ce * 3 + (ce < 0 ? -3 : 0)); g2.lineTo(22, -22 - ce * 3 - (ce < 0 ? -3 : 0)); g2.stroke();
  g2.beginPath(); g2.moveTo(-10, -21 - ce * 3); g2.lineTo(1, -21 - ce * 3); g2.stroke();
  // boca
  const bo = o.boca ?? 0;
  g2.strokeStyle = '#4a2420'; g2.lineWidth = 3;
  if (bo > 0.15) { g2.fillStyle = '#4a2420'; g2.beginPath(); g2.ellipse(14, 20, 7, 3 + 5 * bo, 0, 0, TAU); g2.fill(); }
  else { g2.beginPath(); g2.moveTo(6, 20 + (o.sonrisa ? -1 : 0)); g2.quadraticCurveTo(13, 20 + (o.sonrisa ? 4 : 0), 21, 19 + (o.sonrisa ? -2 : 0)); g2.stroke(); }
  // pelo de arriba
  if (pe !== 'calvo') {
    if (pe === 'rizos') for (let k = 0; k < 7; k++) { const a = PI * (1.02 + k / 6 * 0.9); g.save(); g.translate(Math.cos(a) * 26 - 4, -14 + Math.sin(a) * 26); pz(P.circulo(10, id + 60 + k, 0.08), colPelo, { d: 1.7, seed: id + 60 + k, edge: 0.4 }); g.restore(); }
    pz(pg([[-32, -14], [-30, -34], [-6, -44], [20, -40], [30, -26], [10, -28], [-12, -22], [-20, -6]]), colPelo, { d: 1.8, seed: id + 70 });
  }
  // tocado
  const to = o.tocado ?? 'no', ct = o.colorTocado;
  if (to === 'corona') {
    const cor = pg([[-30, -32], [-26, -64], [-16, -44], [-6, -70], [4, -44], [14, -68], [22, -42], [32, -60], [32, -30]]);
    pz(cor, ct ?? RO.oro, { d: 2.6, seed: id + 80 });
    for (const x of [-14, 4, 22]) { g.save(); g.translate(x, -38); pz(P.circulo(4, id + 81 + x, 0.05), RO.rojo, { d: 2.8, seed: id + 82, edge: 0.3 }); g.restore(); }
  } else if (to === 'laurel') {
    for (let k = 0; k < 9; k++) {
      const a = PI + k / 8 * PI * 0.95;
      g.save(); g.translate(Math.cos(a) * 30, -20 + Math.sin(a) * 26); g.rotate(a + PI / 2 + (k % 2 ? 0.4 : -0.4));
      pz(P.elipse(5, 11, id + 90 + k, 0.05), k % 2 ? RO.laurel : RO.laurelL, { d: 2.4, seed: id + 90 + k, edge: 0.3 });
      g.restore();
    }
  } else if (to === 'casco') {
    pz(pg([[-34, -6], [-34, -36], [-10, -50], [22, -46], [34, -26], [34, -10], [20, -14], [-20, -14]]), ct ?? RO.bronce, { d: 2.4, seed: id + 100 });
    pz(pg([[-28, -44], [-10, -76], [20, -78], [26, -50], [6, -50]]), RO.rojo, { d: 2.8, seed: id + 101 });  // cresta
    pz(pg([[-34, -10], [-22, -10], [-24, 22], [-34, 18]]), ct ?? RO.bronce, { d: 2.5, seed: id + 102, edge: 0.4 });  // carrillera
  } else if (to === 'diadema') {
    pz(P.rect(-30, -34, 62, 7, 3), ct ?? RO.oro, { d: 2.2, seed: id + 110, edge: 0.3 });
  }
  g.restore();
  // ── brazo de delante
  brazo(24, o.brazoD ?? -0.12, true, 120);
  g.restore();
}

/** columna romana de papel: centro de la base en (0,0), altura h */
export function columna(h = 420, o = {}) {
  const w = o.ancho ?? 56, col = o.color ?? RO.marmol, id = o.id ?? 1;
  pz(P.rect(-w * 0.75, -18, w * 1.5, 18, 2), RO.marmolD, { d: 2, seed: id });
  pz(P.rect(-w / 2, -h + 30, w, h - 48, 3), col, { d: 2.5, seed: id + 1 });
  for (let k = -2; k <= 2; k++) pz(P.rect(k * w * 0.18 - 2, -h + 40, 4, h - 68, 2), RO.marmolD, { d: 0.6, seed: id + 2 + k, edge: 0.2 });
  pz(P.rect(-w * 0.8, -h + 12, w * 1.6, 20, 3), RO.marmolD, { d: 2.6, seed: id + 8 });
  pz(P.rect(-w * 0.95, -h, w * 1.9, 14, 2), col, { d: 2.8, seed: id + 9 });
}

/** cortina de tela recortada (de púrpura imperial por defecto), con pliegues; ancho w y alto h desde (0,0) arriba */
export function cortina(w = 220, h = 600, o = {}) {
  const col = o.color ?? RO.purpura, id = o.id ?? 1, n = 5, vu = o.vaiven ?? 0;
  for (let k = 0; k < n; k++) {
    const x0 = k * w / n, x1 = (k + 1) * w / n;
    pz(pg([[x0, 0], [x1, 0], [x1 + vu * (k / n) + 4, h], [x0 + vu * (k / n) - 4, h]]), k % 2 ? col : P.mezcla(col, '#000000', 0.18), { d: 2 + k * 0.2, seed: id + k });
  }
  pz(P.rect(-10, -10, w + 20, 22, 4), RO.oro, { d: 3, seed: id + 20 });
}
