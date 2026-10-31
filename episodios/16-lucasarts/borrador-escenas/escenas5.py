E = {}

# ayudas comunes de las tres escenas (van al principio de cada cuerpo)
AY = r'''
const K = T.C.k, BL = hex('#f6f2e6'), AM = hex('#fff0a0'), ROJO = hex('#d83a2a');
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const mez = (c1, c2, a) => { a = Math.max(0, Math.min(1, a)); const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const suave = (u) => u * u * (3 - 2 * u);
// un rectángulo que respeta R.recorte (R.rect no lo hace)
const rr = (x0, y0, x1, y1, c) => { for (let y = Math.round(y0); y <= Math.round(y1); y++) for (let x = Math.round(x0); x <= Math.round(x1); x++) R.pset(x, y, c); };
// chispas que salen en estrella desde (x, y); u 0–1
const chispas = (x, y, u, c = AM, n = 8, r0 = 3, r1 = 15) => { if (u <= 0 || u >= 1) return;
  for (let k = 0; k < n; k++) { const an = k * 2 * Math.PI / n + 0.35, r = r0 + (r1 - r0) * u, px = Math.round(x + Math.cos(an) * r), py = Math.round(y + Math.sin(an) * r);
    R.pset(px, py, c); if (u < 0.55) { R.pset(px + 1, py, c); R.pset(px, py + 1, c); R.pset(px - 1, py, BL); } } };
// la nube de polvo de los dibujos animados (u 0–1)
const poof = (x, y, u, s = 1) => { if (u <= 0 || u >= 1) return; const r = (3 + 8 * suave(u)) * s, a = 1 - u;
  const C3 = [hex('#8a8a9a'), hex('#d0d0da'), hex('#f8f8fc')];
  for (let k = 0; k < 7; k++) { const an = k * 0.9 + 0.3, d = r * 0.75, cx = x + Math.cos(an) * d, cy = y + Math.sin(an) * d * 0.7, rd = Math.max(1, r * 0.5 * (0.5 + a * 0.6));
    R.disco(Math.round(cx), Math.round(cy + 1), rd + 1, C3[0]); R.disco(Math.round(cx), Math.round(cy), rd, C3[1]); R.disco(Math.round(cx - 1), Math.round(cy - 1), Math.max(1, rd - 2), C3[2]); } };
// estrellitas que giran sobre una cabeza (mareo)
const mareo = (x, y, t) => { for (let k = 0; k < 3; k++) { const an = t * 6 + k * 2.1, px = Math.round(x + Math.cos(an) * 8), py = Math.round(y + Math.sin(an) * 2.5);
  R.pset(px, py, AM); R.pset(px - 1, py, hex('#e8b830')); R.pset(px + 1, py, hex('#e8b830')); R.pset(px, py - 1, hex('#e8b830')); R.pset(px, py + 1, hex('#e8b830')); } };
// el jersey rojo con la franja amarilla (centro x, y), con recorte
const JR = hex('#d84a3a'), JRS = hex('#962a26'), JRL = hex('#f07a5a'), JY = hex('#f0c83a');
const jersey = (x, y, t = 0) => { x = Math.round(x); y = Math.round(y); const f = Math.round(Math.sin(t * 9) * 1);
  rr(x - 5, y - 4, x + 5, y + 4, K); rr(x - 4, y - 3, x + 4, y + 3, JR); rr(x - 4, y - 3, x - 3, y + 3, JRL);
  rr(x - 8, y - 3 + f, x - 5, y + 1 + f, K); rr(x - 7, y - 2 + f, x - 5, y + f, JR); rr(x + 5, y - 3 - f, x + 8, y + 1 - f, K); rr(x + 5, y - 2 - f, x + 7, y - f, JR);
  rr(x - 4, y, x + 4, y, JY); rr(x - 1, y - 3, x + 1, y - 3, BL); rr(x - 4, y + 3, x + 4, y + 3, JRS); };
// paleta del jersey para un chibi que se lo pone
const PJ = { C: JR, c: JRS, W: JR };
'''

E['la-epocas'] = ('Tres épocas', '''// LA-EPOCAS (frases 26–27), sin cartela; la barra del año dice 1793, 2193 y 1993. Cuatro planos, la misma casa en
// las tres épocas (la misma arquitectura: ventana, puerta, chimenea, reloj y escalera) y el inserto de la foto:
// 1. epocas 'pasado' general (1793): el retrete azul se materializa en la posada con un zumbido; el roquero sale en
//    «past» con el relámpago, mira asombrado; el caballero escribe en su atril y en «writing the Constitution» levanta el
//    pergamino con el sello rojo; el roquero le señala, sonriente. Gag: el tentáculo morado sale detrás del roquero con
//    peluca de padre fundador y se planta muy digno; tras «Constitution» el caballero lo ve y se queda con «?». Corta en
//    «Laverne».
// 2. epocas 'futuro' general (2193): el retrete rojo llega sobre la alfombra morada; la chica rara sale en «future»,
//    curiosa; en «tentacles» llega a saltos un tentáculo guardián y en «rule» se planta de conquistador; ella se asusta,
//    vuelve corriendo al retrete y cierra (el pestillo en rojo); el guardián se queda con «?». Corta en «and Bernard».
// 3. epocas 'presente' general (1993): el retrete verde llega al vestíbulo; el empollón sale en «present», contento de
//    estar en casa; en «Bernard» saluda a cámara; en «nerd with glasses» le brillan las gafas y se las sube; el tentáculo
//    verde entra a saltitos y le saluda. Corta en «is the only one».
// 4. fondo local: la cómoda del vestíbulo y, en la pared, la foto de 1987 de los cinco chavales ante la mansión; en
//    «only one» un rotulador rojo rodea al empollón; en «playable kids» el cursor en cruz pasa por los cinco; en «comes
//    back» los otros cuatro se destiñen, entra el empollón de hoy por la derecha y señala la foto, y el de la foto le
//    saluda.''', AY + r'''
const a = (f) => en('epocas', f), b = (f) => en('bernard', f);
const P2 = a(0.497), P3 = a(0.852), P4 = b(0.327);
// ── 1 · 1793 ─────────────────────────────────────────────────────────────────────────────────────────────────────
const RAYO = a(0.147), FUNDA = a(0.242), ESCRIBE = a(0.346), CONST = a(0.389);
const p1 = (t) => {
  T.epocas(R, t, { encuadre: 'pasado', rayo: RAYO });
  T.gato(R, 186, 136, t);
  const TX = 204, TY = 164, llega = tramo(t, 0.55, 1.35), sale = 2.25, salTe = 2.95;
  const puerta = tramo(t, 1.7, 2.0) - tramo(t, salTe + 0.75, salTe + 0.95);
  // el atril con la pluma y el tintero, delante de la mesa del fondo
  const AX = 98; rr(AX - 1, 138, AX + 15, 141, K); rr(AX, 139, AX + 14, 140, hex('#8a5a2a')); rr(AX + 6, 141, AX + 8, 162, K); rr(AX + 7, 141, AX + 7, 161, hex('#6a4220'));
  rr(AX + 2, 162, AX + 12, 164, K); rr(AX + 3, 162, AX + 11, 163, hex('#6a4220')); rr(AX + 1, 136, AX + 13, 138, hex('#f2e6c0')); rr(AX + 11, 134, AX + 13, 137, K); R.pset(AX + 12, 135, hex('#2a2a3a'));
  // el caballero escribe; en «writing» levanta el pergamino
  const muestra = tramo(t, ESCRIBE - 0.25, ESCRIBE + 0.15), mira = t > CONST + 0.45;
  const cx0 = 112, escribe = t < ESCRIBE - 0.25;
  const pos = escribe ? [AX + 6 + Math.round(Math.sin(t * 7) * 3), 134 + (Math.sin(t * 13) > 0.6 ? -1 : 0)] : [cx0 + 18, Math.round(lerp(134, 116, muestra))];
  const r1 = R.actor(EL.caballero, cx0, 158, t, { dir: escribe ? -1 : 1, sostiene: pos, sonrisa: !escribe && !mira, sorpresa: mira, habla: !escribe && t > CONST && t < CONST + 0.8 && Math.sin(t * 9) > 0 });
  if (escribe) { const [mx, my] = r1.mano; R.linea(mx, my, mx - 4, my - 7, K); R.linea(mx + 1, my - 1, mx - 3, my - 8, BL); R.pset(mx - 4, my - 8, hex('#c8c8d0')); }
  else { const [mx, my] = r1.mano; rr(mx - 6, my - 15, mx + 6, my + 1, K); rr(mx - 5, my - 14, mx + 5, my, hex('#f2e6c0')); rr(mx - 5, my - 14, mx + 5, my - 13, hex('#d8c898'));
    for (let k = 0; k < 5; k++) rr(mx - 4, my - 11 + k * 2, mx + (k % 2 ? 1 : 4), my - 11 + k * 2, hex('#6a5a4a'));
    R.disco(mx + 2, my - 2, 2, ROJO); R.pset(mx + 1, my - 3, hex('#ff8a6a')); if (muestra > 0.9 && t < CONST + 0.6) chispas(mx, my - 8, (t - ESCRIBE) / 1.1, AM, 6, 9, 15); }
  if (mira) R.bocadillo(cx0 + 7, 128, { icono: '?' });
  // el retrete azul del roquero se materializa en la sala
  const g = T.retrete(R, TX, TY, t, { color: 'azul', llega, puerta, capa: 'fondo' });
  const dentro = t < sale, x0 = TX - 7;
  if (dentro && puerta > 0.2) R.actor(EL.roquero, x0, TY - 1, t, { dir: -1, sorpresa: true });
  // el tentáculo morado con peluca espera dentro y sale detrás
  const te = tramo(t, salTe, salTe + 0.7), tx = Math.round(lerp(TX, 246, te));
  if (t < salTe && t > sale && puerta > 0.2) T.tentaculo(R, TX, TY - 1, t, { color: 'morado', accesorio: 'peluca', expresion: 'feliz', dir: 1 });
  T.retrete(R, TX, TY, t, { color: 'azul', llega, puerta, capa: 'frente' });
  if (llega > 0 && llega < 1) chispas(TX, TY - 20, llega, hex('#a8d8ff'), 10, 6, 26);
  if (t >= salTe) T.tentaculo(R, tx, TY + 4, t, { color: 'morado', accesorio: 'peluca', anda: te > 0 && te < 1, expresion: t > CONST + 0.6 ? 'malvado' : 'feliz', dir: t > salTe + 0.9 ? -1 : 1, inclina: t > salTe + 1.0 && t < CONST + 0.5 ? 0.4 : 0 });
  // el roquero sale en «past», mira asombrado y va hacia el caballero
  if (!dentro) {
    const u1 = tramo(t, sale, sale + 0.5), u2 = tramo(t, sale + 1.2, ESCRIBE - 0.1), x = Math.round(lerp(lerp(x0, 172, u1), 140, u2));
    const anda = (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1);
    R.actor(EL.roquero, x, 164, t, { dir: u1 >= 1 && u2 === 0 ? (Math.sin(t * 3) > 0 ? 1 : -1) : -1, anda, sorpresa: t < sale + 1.2 && !anda, sonrisa: t > ESCRIBE, dedo: t > CONST && t < P2 - 0.3, habla: t > CONST + 0.2 && t < CONST + 1 && Math.sin(t * 9) > 0 });
  }
};
// ── 2 · 2193 ─────────────────────────────────────────────────────────────────────────────────────────────────────
const FUT = a(0.6626), TENT = a(0.746), RULE = a(0.7786);
const p2 = (t) => {
  T.epocas(R, t, { encuadre: 'futuro' });
  const TX = 176, TY = 166, llega = tramo(t, P2 + 0.15, P2 + 0.85), huye = tramo(t, RULE + 0.15, RULE + 0.5);
  const puerta = tramo(t, FUT - 0.55, FUT - 0.3) - tramo(t, RULE + 0.5, RULE + 0.7);
  const sale = FUT - 0.2, x0 = TX - 7, fuera = t > sale && huye < 1;
  T.retrete(R, TX, TY, t, { color: 'rojo', llega, puerta, capa: 'fondo', ocupado: t > RULE + 0.7 });
  if (!fuera && puerta > 0.2) R.actor(EL.chicaRara, x0, TY - 1, t, { dir: 1, sorpresa: t > RULE, sonrisa: t < RULE });
  T.retrete(R, TX, TY, t, { color: 'rojo', llega, puerta, capa: 'frente', ocupado: t > RULE + 0.7 });
  if (llega > 0 && llega < 1) chispas(TX, TY - 20, llega, hex('#ffb0d0'), 10, 6, 26);
  if (fuera) {
    const u1 = tramo(t, sale, sale + 0.45), x = Math.round(huye > 0 ? lerp(208, x0, huye) : lerp(x0, 208, u1));
    R.actor(EL.chicaRara, x, 168, t, { dir: huye > 0 ? -1 : (u1 >= 1 && t < TENT ? (Math.sin(t * 2.5) > 0 ? 1 : -1) : 1), anda: (u1 > 0 && u1 < 1) || huye > 0, sonrisa: t < TENT, sorpresa: t >= TENT - 0.05 });
    if (t > TENT && huye === 0) R.bocadillo(x + 7, 132, { icono: '!' });
  }
  // el tentáculo guardián llega a saltos y se planta de conquistador en «rule»
  const g = tramo(t, TENT - 0.45, RULE - 0.05), gx = Math.round(lerp(350, 258, g));
  const r = T.tentaculo(R, gx, 172, t, { color: 'morado', s: 2, brazos: 1, anda: g > 0 && g < 1, pose: t > RULE ? 'arriba' : 'normal', expresion: 'malvado', dir: -1, habla: t > RULE && t < RULE + 0.6 });
  if (t > RULE - 0.05 && t < RULE + 0.45) chispas(gx, 116, (t - RULE + 0.05) / 0.5, hex('#d8a8ff'), 10, 16, 34);
  if (t > RULE + 0.75) R.bocadillo(gx + 18, 112, { icono: '?' });
};
// ── 3 · 1993 ─────────────────────────────────────────────────────────────────────────────────────────────────────
const AND = a(0.86), PRES = a(0.951), BERN = b(0), NERD = b(0.095), GLAS = b(0.157);
const p3 = (t) => {
  T.epocas(R, t, { encuadre: 'presente' });
  const TX = 222, TY = 164, llega = tramo(t, P3 + 0.1, P3 + 0.75), puerta = tramo(t, PRES - 0.35, PRES - 0.1) - tramo(t, PRES + 0.9, PRES + 1.1), sale = PRES;
  T.retrete(R, TX, TY, t, { color: 'verde', llega, puerta, capa: 'fondo' });
  if (t < sale && puerta > 0.2) R.actor(EL.empollon, TX - 7, TY - 1, t, { dir: -1, sonrisa: true });
  T.retrete(R, TX, TY, t, { color: 'verde', llega, puerta, capa: 'frente' });
  if (llega > 0 && llega < 1) chispas(TX, TY - 20, llega, hex('#b8ffb0'), 10, 6, 26);
  // el tentáculo verde entra a saltitos y saluda
  const v = tramo(t, PRES + 0.2, BERN - 0.1), vx = Math.round(lerp(-16, 96, v));
  T.tentaculo(R, vx, 166, t, { color: 'verde', brazos: tramo(t, BERN - 0.3, BERN), pose: t > BERN ? 'saluda' : 'normal', anda: v > 0 && v < 1, expresion: 'feliz', dir: 1 });
  if (t >= sale) {
    const u = tramo(t, sale, sale + 0.6), x = Math.round(lerp(TX - 7, 176, u)), saluda = t > BERN && t < NERD;
    const r = R.actor(EL.empollon, x, 170, t, { dir: t > BERN ? 1 : -1, anda: u > 0 && u < 1, sonrisa: t > sale + 0.4, dedo: saluda && Math.sin(t * 12) > -0.3 || (t > GLAS - 0.2 && t < GLAS + 0.4), salto: t > BERN && t < BERN + 0.3 ? 2 : 0 });
    // los bolígrafos del bolsillo
    const px = x + 4; R.rect(px, 152, px, 154, hex('#3a5ac8')); R.rect(px + 1, 151, px + 1, 154, ROJO); R.rect(px + 2, 152, px + 2, 154, K);
    // en «glasses», el destello de las gafas
    if (t > NERD && t < GLAS + 0.7) { const [hx, hy] = r.cabeza, gx = hx + 3, gy = hy + 5, s = Math.round(2 + 2 * Math.sin((t - NERD) * 10));
      R.linea(gx - s, gy, gx + s, gy, BL); R.linea(gx, gy - s, gx, gy + s, BL); R.pset(gx, gy, AM); }
  }
};
// ── 4 · la foto de los chavales de 1987 (fondo local) ────────────────────────────────────────────────────────────
const ONLY = b(0.378), MANIAC = b(0.479), PLAY = b(0.66), KIDS = b(0.744), COMES = b(0.872), BACK = b(0.915);
const FOTO = [100, 30, 220, 114], KX = [106, 128, 150, 172, 194], KIDS5 = [EL.chico, EL.chicaRara, EL.empollon, EL.roquero, EL.disenadora];
let FONDO4 = null;
const pinta4 = () => {
  const { rect, pset, poligono, disco, linea } = R;
  // el papel pintado verde azulado del vestíbulo, con su damasco y la moldura
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) { const dx = ((x + 6) % 16) - 8, dy = ((y + 2) % 20) - 10, rombo = Math.abs(dx) / 8 + Math.abs(dy) / 10 < 0.62, filo = Math.abs(Math.abs(dx) / 8 + Math.abs(dy) / 10 - 0.62) < 0.08;
    let c = hex('#2e7a7c'); if (rombo) c = hex('#358688'); if (filo) c = hex('#256668'); if (x % 16 === 0) c = hex('#286e70'); if ((x + y) % 2 && hh(x, y, 1) < 0.18) c = mez(c, K, 0.18); pset(x, y, c); }
  rect(0, 0, 319, 5, hex('#e8dcc0')); rect(0, 6, 319, 7, hex('#b8a888')); rect(0, 8, 319, 8, hex('#1e5a5c'));
  for (let x = 0; x < 320; x += 6) rect(x, 2, x + 2, 3, hex('#d0c4a4'));
  // el zócalo granate de cuarterones
  rect(0, 116, 319, 117, hex('#e8dcc0')); rect(0, 118, 319, 136, hex('#6a2a2e'));
  for (let x = 4; x < 320; x += 40) { rect(x, 121, x + 34, 133, hex('#521e22')); rect(x + 1, 122, x + 33, 132, hex('#7a3236')); rect(x + 1, 122, x + 33, 122, hex('#9a4a4c')); }
  // el marco dorado de la foto, con su sombra en la pared y el clavo
  rect(FOTO[0] - 7, FOTO[1] - 5, FOTO[2] + 9, FOTO[3] + 9, mez(hex('#2e7a7c'), K, 0.45));
  rect(FOTO[0] - 9, FOTO[1] - 7, FOTO[2] + 7, FOTO[3] + 7, K);
  for (let y = FOTO[1] - 6; y <= FOTO[3] + 6; y++) for (let x = FOTO[0] - 8; x <= FOTO[2] + 6; x++) { const b0 = Math.min(x - FOTO[0] + 8, FOTO[2] + 6 - x, y - FOTO[1] + 6, FOTO[3] + 6 - y);
    if (b0 > 5) continue; const luz = (x - FOTO[0] + 8 < 6 || y - FOTO[1] + 6 < 6) ? 1 : 0; pset(x, y, [hex('#8a6420'), hex('#c8982e'), hex('#e8c050'), hex('#fff0a0')][Math.min(3, (b0 === 2 ? 2 : b0 === 3 ? 1 : b0 === 1 ? 2 : 1) + luz)]);
    if ((b0 === 2) && ((x + y) % 5 === 0)) pset(x, y, hex('#a87a24')); }
  disco(160, 19, 2, K); pset(160, 18, hex('#c8c8d0'));
  // la foto: el borde blanco y la noche de 1987 con la mansión
  rect(FOTO[0] - 2, FOTO[1] - 2, FOTO[2] + 2, FOTO[3] + 2, hex('#f2ead8'));
  for (let y = FOTO[1]; y <= FOTO[3]; y++) for (let x = FOTO[0]; x <= FOTO[2]; x++) { const u = (y - FOTO[1]) / 80; pset(x, y, (x + y) % 2 && hh(x, y, 2) < 0.5 ? mez(hex('#1e2a5a'), hex('#4a3a6a'), u) : mez(hex('#18224e'), hex('#3a2e5a'), u)); }
  for (let k = 0; k < 30; k++) pset(FOTO[0] + 2 + Math.round(hh(k, 1, 3) * 116), FOTO[1] + 2 + Math.round(hh(k, 2, 3) * 30), hex('#e8e8f0'));
  disco(204, 44, 7, hex('#f2ecc8')); disco(206, 42, 6, hex('#fff8e0')); pset(202, 45, hex('#d8d0a8'));
  // la mansión: tejados, torre, chimeneas y ventanas encendidas
  const M1 = hex('#3a2a48'), M2 = hex('#4a3858'), M3 = hex('#5a4668');
  rect(116, 62, 196, 100, M2); poligono([[112, 64], [156, 44], [200, 64]], M1); rect(124, 50, 132, 62, M1); rect(176, 52, 182, 62, M1);
  rect(138, 54, 148, 100, M3); poligono([[136, 56], [143, 40], [150, 56]], M1); pset(143, 39, hex('#c8c8d0'));
  for (let y = 66; y < 100; y++) for (let x = 116; x <= 196; x++) if ((y % 6 === 0) && ((x + y) % 3 === 0)) pset(x, y, M1);
  for (const [wx, wy, on] of [[122, 70, 1], [130, 70, 0], [152, 70, 1], [160, 70, 1], [170, 70, 0], [180, 70, 1], [188, 70, 1], [122, 84, 0], [160, 84, 1], [180, 84, 1], [141, 62, 1]]) { rect(wx, wy, wx + 4, wy + 6, K); rect(wx + 1, wy + 1, wx + 3, wy + 5, on ? hex('#f0c850') : hex('#2a2038')); if (on) pset(wx + 1, wy + 1, hex('#fff0a0')); }
  rect(154, 88, 162, 100, K); rect(155, 89, 161, 100, hex('#5a3a28'));
  // el césped y el camino
  for (let y = 100; y <= FOTO[3]; y++) for (let x = FOTO[0]; x <= FOTO[2]; x++) pset(x, y, (x * 3 + y * 5) % 7 === 0 ? hex('#2a5a3a') : (y > 104 && Math.abs(x - 158) < (y - 96) * 0.6) ? hex('#6a6070') : hex('#1e4a2e'));
  // la cómoda de nogal, con vetas, cajones y tiradores de latón
  rect(18, 138, 302, 179, K); rect(14, 133, 306, 139, K);
  for (let y = 134; y <= 138; y++) for (let x = 15; x <= 305; x++) pset(x, y, y === 134 ? hex('#c8905a') : (Math.sin(x * 0.11 + y * 0.9 + Math.sin(x * 0.03) * 3) > 0.7 ? hex('#7a4a26') : hex('#9a6234')));
  for (let y = 140; y <= 179; y++) for (let x = 19; x <= 301; x++) pset(x, y, Math.sin(x * 0.09 + y * 0.35 + Math.sin(y * 0.2 + x * 0.01) * 2) > 0.75 ? hex('#6a3e20') : hex('#82502a'));
  for (const [x0, x1] of [[26, 104], [116, 204], [216, 294]]) { rect(x0, 144, x1, 160, K); rect(x0 + 1, 145, x1 - 1, 159, hex('#8a5a30')); rect(x0 + 1, 145, x1 - 1, 145, hex('#b07a44')); rect(x0 + 1, 159, x1 - 1, 159, hex('#5a341a'));
    const mx = (x0 + x1) >> 1; disco(mx, 152, 2, K); disco(mx, 152, 1.3, hex('#d8b048')); pset(mx - 1, 151, hex('#fff0a0'));
    rect(x0, 164, x1, 179, K); rect(x0 + 1, 165, x1 - 1, 179, hex('#8a5a30')); rect(x0 + 1, 165, x1 - 1, 165, hex('#b07a44')); disco(mx, 172, 2, K); disco(mx, 172, 1.3, hex('#d8b048')); }
  // el cajón de abajo a medio cerrar, con un calcetín de rayas que asoma
  rect(116, 164, 204, 167, hex('#3a2010')); for (let y = 166; y <= 178; y++) { const x = 150 + Math.round(Math.sin(y * 0.5) * 1); rect(x, y, x + 4, y, (y >> 1) % 2 ? BL : ROJO); pset(x - 1, y, K); pset(x + 5, y, K); } rect(149, 178, 157, 179, K);
  // sobre la cómoda: el tapete, los libros, la planta y el trofeo de ciencias
  rect(70, 131, 140, 133, hex('#e8e0d0')); for (let x = 70; x <= 140; x += 3) pset(x, 133, hex('#c8c0b0'));
  [[236, hex('#3a5a9a')], [242, hex('#c84a3a')], [248, hex('#3a8a5a')], [254, hex('#c8a040')]].forEach(([x, c], k) => { rect(x, 112 + k, x + 5, 133, K); rect(x + 1, 113 + k, x + 4, 133, c); rect(x + 1, 118 + k, x + 4, 118 + k, AM); });
  rect(266, 120, 280, 133, K); rect(267, 121, 279, 133, hex('#b8582a')); rect(267, 121, 279, 122, hex('#d8783a'));
  for (const [lx, ly] of [[268, 112], [273, 106], [278, 113], [271, 116], [276, 110]]) { R.linea(273, 121, lx, ly, hex('#2a6a3a')); disco(lx, ly, 2, hex('#3a9a4a')); pset(lx - 1, ly - 1, hex('#7ad86a')); }
  rect(186, 124, 196, 133, K); rect(187, 125, 195, 132, hex('#d8b048')); rect(189, 116, 193, 124, K); rect(190, 117, 192, 123, hex('#e8c858')); disco(191, 113, 4, K); disco(191, 113, 3, hex('#f0d060')); pset(190, 112, hex('#fff0a0'));
  // el reloj de pared, a la derecha (fuera de la zona de Atom)
  disco(292, 74, 11, K); disco(292, 74, 10, hex('#a87a3a')); disco(292, 74, 8, hex('#f2ead8')); for (let k = 0; k < 12; k++) pset(Math.round(292 + Math.cos(k * 0.5236) * 7), Math.round(74 + Math.sin(k * 0.5236) * 7), K);
  // el interruptor y un póster pequeño de un cohete a la izquierda
  rect(14, 40, 58, 96, K); rect(15, 41, 57, 95, hex('#1a1e3a')); for (let k = 0; k < 14; k++) pset(16 + Math.round(hh(k, 4, 5) * 40), 42 + Math.round(hh(k, 5, 5) * 52), hex('#e8e8f0'));
  rect(33, 52, 39, 80, BL); poligono([[33, 52], [36, 44], [39, 52]], ROJO); rect(31, 72, 33, 82, ROJO); rect(39, 72, 41, 82, ROJO); rect(35, 58, 37, 60, hex('#3a8ad8')); rect(34, 82, 38, 86, hex('#f0a020')); pset(36, 88, AM);
  rect(70, 92, 76, 102, K); rect(71, 93, 75, 101, hex('#e8e0d0')); rect(72, 95, 74, 99, hex('#c8c0b0'));
};
const p4 = (t) => {
  if (!FONDO4) { FONDO4 = R.nuevo(); const prev = R.usar(FONDO4); pinta4(); R.usar(prev); }
  R.copiar(FONDO4);
  // la lámpara de mesa con su luz cálida que tiembla y las motas en el haz
  const LX = 46; R.rect(LX - 3, 129, LX + 3, 133, K); R.rect(LX - 2, 130, LX + 2, 132, hex('#c8a040')); R.rect(LX, 110, LX, 129, K);
  R.poligono([[LX - 13, 112], [LX - 7, 94], [LX + 7, 94], [LX + 13, 112]], K); R.poligono([[LX - 12, 111], [LX - 6, 95], [LX + 6, 95], [LX + 12, 111]], hex('#f0d890'));
  const fl = 0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 3.1);
  for (let y = 112; y < 133; y++) for (let x = LX - 22; x <= LX + 22; x++) if (Math.abs(x - LX) < 12 + (y - 112) * 0.5 && (x + y) % 2 === 0) { const c = R.pget(x, y); R.pset(x, y, mez(c, hex('#fff0b0'), 0.18 * fl)); }
  for (let k = 0; k < 5; k++) { const my = 130 - ((t * 4 + k * 5) % 20), mx = LX - 8 + Math.round(hh(k, 9, 6) * 16 + Math.sin(t + k) * 2); R.pset(mx, Math.round(my), hex('#fff8d0')); }
  // la mosca que ronda la lámpara
  { const fx = Math.round(LX + Math.cos(t * 3.3) * 18 + Math.sin(t * 7) * 3), fy = Math.round(100 + Math.sin(t * 4.1) * 8); R.pset(fx, fy, K); R.pset(fx + 1, fy, K); if (Math.floor(t * 20) % 2) { R.pset(fx, fy - 1, hex('#c8d8e8')); R.pset(fx + 1, fy - 1, hex('#c8d8e8')); } }
  // las agujas del reloj de pared
  { const an = t * 0.8, am = t * 0.07; R.linea(292, 74, Math.round(292 + Math.cos(an - 1.57) * 6), Math.round(74 + Math.sin(an - 1.57) * 6), K); R.linea(292, 74, Math.round(292 + Math.cos(am) * 4), Math.round(74 + Math.sin(am) * 4), K); R.pset(292, 74, ROJO); }
  // el hámster en su bola que rueda por la cómoda
  { const hx = Math.round(206 + Math.sin(t * 0.9) * 10), hy = 126; R.disco(hx, hy, 7, K); R.disco(hx, hy, 6, hex('#b8e0f0')); T.bicho(R, hx, hy + 4, t, { quien: 'hamster', anda: true, dir: Math.cos(t * 0.9) > 0 ? 1 : -1 });
    for (let k = 0; k < 6; k++) { const an = k * 1.05 + t * 3 * (Math.cos(t * 0.9) > 0 ? 1 : -1); R.pset(Math.round(hx + Math.cos(an) * 6), Math.round(hy + Math.sin(an) * 6), hex('#e8f8ff')); } R.pset(hx - 3, hy - 4, BL); }
  // los cinco chavales de la foto (los otros cuatro se destiñen en «comes back»)
  const desti = tramo(t, COMES - 0.2, COMES + 0.4);
  R.recorte(FOTO);
  KIDS5.forEach((d, k) => { const esB = k === 2, x = KX[k], sal = esB && t > BACK + 0.1;
    R.actor(d, x, 110, t, { dir: 1, sonrisa: true, quieto: !sal, dedo: sal && Math.sin(t * 12) > -0.3 });
    if (!esB && desti > 0) for (let y = 80; y <= 112; y++) for (let xx = x; xx <= x + 15; xx++) { const c = R.pget(xx, y), r = c & 255, g = (c >> 8) & 255, bb = (c >> 16) & 255, l = (r * 0.3 + g * 0.55 + bb * 0.15);
      R.pset(xx, y, mez(c, (0xff000000 | (Math.round(l * 0.75) << 16) | (Math.round(l * 0.9) << 8) | Math.round(l)) >>> 0, desti * 0.85)); } });
  R.recorte(null);
  // un poco de tono antiguo: viñeta en las esquinas de la foto
  for (let y = FOTO[1]; y <= FOTO[3]; y++) for (let x = FOTO[0]; x <= FOTO[2]; x++) { const d = Math.max(Math.abs(x - 160) / 60, Math.abs(y - 72) / 42); if (d > 0.88 && (x + y) % 2) R.pset(x, y, mez(R.pget(x, y), hex('#2a1a10'), 0.35)); }
  // en «only one», el rotulador rojo rodea al empollón
  const circ = tramo(t, ONLY - 0.1, ONLY + 0.6);
  if (circ > 0) { const cx = KX[2] + 7, cy = 96; for (let i = 0; i <= Math.round(circ * 60); i++) { const an = -2.2 + i / 60 * Math.PI * 2.15, x = Math.round(cx + Math.cos(an) * 13), y = Math.round(cy + Math.sin(an) * 17); R.pset(x, y, ROJO); R.pset(x + 1, y, ROJO); R.pset(x, y + 1, hex('#a82a20')); } }
  // en «playable kids», el cursor en cruz salta de chaval en chaval
  if (t > PLAY - 0.4 && t < COMES) { const k = Math.min(4, Math.floor(tramo(t, PLAY - 0.4, KIDS + 0.3) * 5)), cx = KX[k] + 7, cy = 82;
    for (const [dx, dy] of [[-5, 0], [-4, 0], [-3, 0], [3, 0], [4, 0], [5, 0], [0, -5], [0, -4], [0, -3], [0, 3], [0, 4], [0, 5]]) { R.pset(cx + dx + 1, cy + dy + 1, K); R.pset(cx + dx, cy + dy, BL); }
    R.rect(KX[k] - 1, 112, KX[k] + 16, 112, AM); }
  // el empollón de hoy entra por la derecha y señala la foto
  const e = tramo(t, KIDS - 0.1, COMES + 0.1), ex = Math.round(lerp(334, 262, e));
  if (e > 0) R.actor(EL.empollon, ex, 178, t, { dir: -1, anda: e < 1, dedo: t > BACK - 0.1, sonrisa: t > COMES, sorpresa: e >= 1 && t < BACK - 0.1 });
  if (t > BACK + 0.1) chispas(KX[2] + 7, 90, (t - BACK - 0.1) / 0.8, AM, 8, 8, 20);
};
const efectos = [[0.75, 'zumbido'], [1.75, 'puerta'], [RAYO, 'trueno'], [2.95 + 0.15, 'boing'], [ESCRIBE, 'papel'], [P2 + 0.3, 'zumbido'], [RULE, 'boing'], [RULE + 0.65, 'cerrojo'],
  [P3 + 0.2, 'zumbido'], [GLAS, 'brillo'], [ONLY, 'lapiz'], [PLAY, 'bip'], [BACK + 0.1, 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < P2 ? 1793 : t < P3 ? 2193 : 1993) });
''')

E['la-objetos'] = ('Objetos por los retretes', '''// LA-OBJETOS (frases 28–29), sin cartela; la barra dice 1993, 1793 y 2193 según la época. Cinco planos:
// 1. epocas 'presente' cerca (el jardín): solo queda el retrete verde (los otros dos dejaron su marca chamuscada); el
//    empollón enseña un jersey rojo, abre la puerta y en «objects» lo lanza dentro; el hámster escapado cruza la losa y
//    se cuela detrás (gag); la puerta se cierra y en «toilets» el retrete tiembla, gira el reloj y suelta un destello.
//    Corta en «change».
// 2. epocas 'triple' cerca: en 1793 el retrete azul escupe el jersey a las manos del caballero y luego el hámster, que
//    sale mareado con sus estrellitas (gag); en «era» el caballero se pone el jersey (¡puf!); en «changes» le cambia la
//    camisa al empollón de 1993 y en «everything» a la chica rara de 2193, delante de la jaula: los tres de rojo, se miran y sonríen.
//    Corta en «in the Founding Fathers' era».
// 3. epocas 'pasado' 'cometa' (el tejado en la tormenta, con un farol que los alumbra): el caballero vuela la cometa; el
//    roquero llega corriendo y en
//    «helps» sujeta el hilo con él; en «kite» el rayo baja por el hilo hasta la llave: chispas en las manos, saltan del
//    susto. Corta en «and a tentacle's».
// 4. epocas 'futuro' cerca (la sala de las jaulas): el historial médico del tentáculo cuelga de la jaula (rayas rojas
//    y blancas, un recuadro azul con puntos y el tentáculo dibujado); la chica rara lo descuelga en «medical chart», va
//    de puntillas a su retrete y en «send back» lo tira dentro; destello; el guardián se da la vuelta en «future» y no
//    ve nada («?»). Corta en «ends up».
// 5. epocas 'pasado' cerca (el escritorio, 1793): el retrete azul tiembla, se abre en «ends up» y el historial vuela al
//    escritorio; el caballero lo recoge en «design», lo alza en un asta y en «American flag» se despliega como la
//    bandera de barras y estrellas, que ondea; el roquero lo celebra con los brazos arriba.''', AY + r'''
const a = (f) => en('objetos', f), b = (f) => en('franklin', f);
const P2 = a(0.51), P3 = b(-0.01), P4 = b(0.40), P5 = b(0.755);
// ── 1 · el jardín de 1993 ───────────────────────────────────────────────────────────────────────────────────────
const OBJ = a(0.162), THR = a(0.225), TOIL = a(0.283), AND1 = a(0.423);
const p1 = (t) => {
  T.epocas(R, t, { encuadre: 'presente', camara: 'cerca', retretes: false });
  // los otros dos retretes se fueron: su marca chamuscada y un hilo de humo
  for (const [x, c] of [[118, 'azul'], [206, 'rojo']]) T.retrete(R, x, 150, t, { color: c, viaje: 0.9 + 0.08 * ((t * 0.2) % 1) });
  const TX = 162, TY = 150, puerta = tramo(t, 0.75, 1.05) - tramo(t, THR + 0.25, THR + 0.4), viaje = 0.32 * tramo(t, TOIL - 0.05, TOIL + 0.5) * (1 - tramo(t, TOIL + 1.0, TOIL + 1.3));
  T.retrete(R, TX, TY, t, { color: 'verde', puerta, viaje });
  if (t > TOIL + 0.4 && t < TOIL + 1.3) { chispas(TX, TY - 46, (t - TOIL - 0.4) / 0.9, hex('#b8ffb0'), 10, 6, 30); chispas(TX, TY - 18, (t - TOIL - 0.5) / 0.8, AM, 8, 10, 26); }
  // el hámster escapado cruza la losa y se cuela detrás del jersey
  const hu = tramo(t, 0.2, THR - 0.05), hs = tramo(t, THR + 0.02, THR + 0.22);
  if (hs < 1) { const hx = hs > 0 ? lerp(140, TX, hs) : lerp(40, 140, hu), hy = hs > 0 ? 150 - Math.sin(hs * Math.PI) * 10 - hs * 6 : 152; T.bicho(R, Math.round(hx), Math.round(hy), t, { quien: 'hamster', anda: hu > 0 && hu < 1, dir: 1 }); }
  // el empollón con el jersey: lo enseña, abre y lo lanza dentro en «objects»
  const lanza = tramo(t, OBJ, THR + 0.05), x = 178;
  const mano = t < 0.75 ? [x - 3, 132 + Math.round(Math.sin(t * 6))] : t < OBJ ? [TX + 9, 134] : [x - 1, 128];
  const r = R.actor(EL.empollon, x, 156, t, { dir: -1, sostiene: t < OBJ + 0.1 ? mano : undefined, habla: t < 0.7 && Math.sin(t * 9) > 0, sonrisa: t < TOIL || t > TOIL + 1.1, sorpresa: t > TOIL + 0.2 && t < TOIL + 1.1, dedo: t > AND1 && t < P2 - 0.1 });
  if (lanza === 0) jersey(r.mano[0], r.mano[1] - 3, t * 0.2);
  else if (lanza < 1) jersey(lerp(r.mano[0], TX, lanza), lerp(124, 130, lanza) - Math.sin(lanza * Math.PI) * 18, t);
};
// ── 2 · las tres épocas a la vez ──────────────────────────────────────────────────────────────────────────────
const ERA = a(0.642), CHG = a(0.688), EVR = a(0.766), OTH = a(0.919);
const p2 = (t) => {
  const g = T.epocas(R, t, { encuadre: 'triple', camara: 'cerca', retretes: false });
  const [f0, f1, f2] = g.franjas, clip = (f) => R.recorte([f.x0, f.y0, f.x1, f.y1]);
  // 1793: el retrete azul (junto al escritorio) escupe el jersey y luego el hámster mareado
  clip(f0);
  const BX = 90, puerta = tramo(t, P2 + 0.1, P2 + 0.3), sale = tramo(t, P2 + 0.25, P2 + 0.7), cab = 22;
  T.retrete(R, BX, 152, t, { color: 'azul', puerta, viaje: 0.3 * (1 - tramo(t, P2, P2 + 0.25)) });
  const ham = tramo(t, P2 + 0.55, P2 + 0.95);
  if (ham > 0) { const hx = Math.round(lerp(BX - 4, 64, ham)), hy = Math.round(150 - Math.sin(ham * Math.PI) * 8); T.bicho(R, hx, hy, t, { quien: 'hamster', mareo: ham >= 1 ? 1 : 0, dir: -1 }); if (ham >= 1) mareo(hx, hy - 12, t); }
  const puesto = t > ERA + 0.1;
  const r0 = R.actor(EL.caballero, cab, 152, t, { dir: 1, sostiene: sale > 0 && !puesto ? [cab + 16, 132] : undefined, pal: puesto ? PJ : undefined, sorpresa: sale > 0 && sale < 1, sonrisa: puesto, dedo: t > OTH });
  if (sale > 0 && !puesto) jersey(lerp(BX - 8, r0.mano[0], sale), lerp(134, r0.mano[1] - 2, sale) - Math.sin(sale * Math.PI) * 14, t);
  poof(cab + 7, 136, (t - ERA) / 0.6);
  R.recorte(null);
  // 1993: el empollón junto al retrete verde
  clip(f1);
  for (const [x, c] of [[116, 'azul'], [204, 'rojo']]) T.retrete(R, x, 150, t, { color: c, viaje: 0.92 });
  T.retrete(R, 160, 150, t, { color: 'verde' });
  const r1 = R.actor(EL.empollon, 174, 156, t, { dir: -1, pal: t > CHG + 0.15 ? PJ : undefined, sorpresa: t > CHG + 0.15 && t < OTH, sonrisa: t > OTH || t < CHG, salto: t > CHG + 0.1 && t < CHG + 0.35 ? 2 : 0 });
  poof(181, 140, (t - CHG) / 0.6);
  R.recorte(null);
  // 2193: la chica rara, delante de la jaula grande
  clip(f2);
  const JX = 222;
  R.actor(EL.chicaRara, JX, 158, t, { dir: -1, pal: t > EVR + 0.15 ? PJ : undefined, sorpresa: t > EVR + 0.15 && t < OTH, brazos: t > OTH + 0.1, sonrisa: t > OTH, salto: t > EVR + 0.1 && t < EVR + 0.35 ? 2 : 0 });
  poof(JX + 7, 142, (t - EVR) / 0.6);
  R.recorte(null);
  // del jersey de 1793 salen flechas de luz hacia las otras épocas
  for (const [ti, x0, x1] of [[CHG - 0.25, 50, 170], [EVR - 0.25, 170, 266]]) { const u = tramo(t, ti, ti + 0.3); if (u > 0 && u < 1) { const x = Math.round(lerp(x0, x1, u)), y = Math.round(118 - Math.sin(u * Math.PI) * 26); R.disco(x, y, 3, AM); R.disco(x, y, 2, BL); for (let k = 1; k < 6; k++) R.pset(Math.round(lerp(x0, x1, Math.max(0, u - k * 0.03))), Math.round(118 - Math.sin(Math.max(0, u - k * 0.03) * Math.PI) * 26), JY); } }
};
// ── 3 · el tejado en la tormenta: la cometa ──────────────────────────────────────────────────────────────────
const HELP = b(0.196), FRANK = b(0.271), KITE = b(0.354);
let manoK = [160, 128];
const p3 = (t) => {
  const g = T.epocas(R, t, { encuadre: 'pasado', camara: 'cometa', rayo: KITE, mano: manoK });
  // el farol de la barandilla, que alumbra a los dos con luz cálida que tiembla
  { const lx = 100, ly = 124, fl = 0.8 + 0.2 * Math.sin(t * 11) * Math.sin(t * 4.3);
    for (let y = ly - 34; y <= 178; y++) for (let x = lx - 50; x <= lx + 95; x++) { const d = Math.hypot((x - lx) / 1.6, y - ly) / 50; if (d < 1 && (x + y) % 2 === 0) R.pset(x, y, mez(R.pget(x, y), hex('#ffc870'), 0.28 * (1 - d) * fl)); }
    R.rect(lx - 1, ly + 6, lx + 1, 150, K); R.rect(lx, ly + 6, lx, 150, hex('#5a4a3a')); R.rect(lx - 4, ly - 6, lx + 4, ly + 6, K); R.rect(lx - 3, ly - 4, lx + 3, ly + 4, mez(hex('#ffd080'), hex('#fff4c0'), fl - 0.6));
    R.rect(lx - 3, ly, lx + 3, ly, K); R.poligono([[lx - 5, ly - 6], [lx, ly - 10], [lx + 5, ly - 6]], K); R.pset(lx, ly - 11, K); R.pset(lx - 1, ly - 3, BL); }
  const choque = t > KITE && t < KITE + 0.7, jolt = choque ? (Math.floor(t * 20) % 2 ? 2 : 0) : 0;
  const ll = tramo(t, P3 + 0.2, HELP - 0.1), rx = Math.round(lerp(-20, 120, ll));
  const r1 = R.actor(EL.caballero, 140, 158, t, { dir: 1, sostiene: [158 + Math.round(Math.sin(t * 2) * 1), 128 - jolt], habla: t > FRANK && t < KITE - 0.1 && Math.sin(t * 9) > 0, sonrisa: t < KITE && t > HELP, sorpresa: choque, salto: jolt });
  manoK = r1.mano;
  R.actor(EL.roquero, rx, 158, t, { dir: 1, anda: ll > 0 && ll < 1, sostiene: ll >= 1 ? [156, 132 - jolt] : undefined, sonrisa: ll >= 1 && t < KITE, sorpresa: choque, salto: jolt, habla: ll >= 1 && t < FRANK && Math.sin(t * 8) > 0 });
  if (t > KITE - 0.05 && t < KITE + 0.9) { const u = (t - KITE + 0.05) / 0.95; chispas(manoK[0], manoK[1], u, AM, 10, 4, 18); chispas(g.llave[0], g.llave[1], u, hex('#c8e8ff'), 8, 3, 14);
    for (let k = 0; k < 3; k++) { let x = manoK[0], y = manoK[1]; for (let i = 0; i < 4; i++) { const nx = x + Math.round((hh(k, i, Math.floor(t * 12)) - 0.5) * 10), ny = y - 4; R.linea(x, y, nx, ny, hex('#e8f4ff')); x = nx; y = ny; } } }
  if (t > KITE + 0.7) R.bocadillo(150, 118, { icono: '!' });
};
// ── 4 · 2193: el historial médico del tentáculo ──────────────────────────────────────────────────────────────
const MED = b(0.489), SEND = b(0.616), FUT = b(0.684);
// el historial: tablilla marrón, hoja con rayas rojas, el recuadro azul con puntos y un tentáculo dibujado
const historial = (x, y, s = 1) => { x = Math.round(x); y = Math.round(y); const w = 9 * s, h = 12 * s;
  R.rect(x - w - 1, y - h - 1, x + w + 1, y + h + 1, K); R.rect(x - w, y - h, x + w, y + h, hex('#9a6a3a')); R.rect(x - w + 2, y - h + 3, x + w - 2, y + h - 2, BL);
  R.rect(x - 3, y - h - 2, x + 3, y - h + 1, K); R.rect(x - 2, y - h - 1, x + 2, y - h, hex('#c8c8d0'));
  for (let k = 0; k < 7; k++) if (k % 2 === 0) R.rect(x - w + 2, y - h + 4 + k * Math.round(3 * s), x + w - 2, y - h + 4 + k * Math.round(3 * s) + s, ROJO);
  R.rect(x - w + 2, y - h + 3, x - 1, y - h + 3 + 8 * s, hex('#2a4a9a')); for (let k = 0; k < 6; k++) R.pset(x - w + 4 + (k % 3) * 3, y - h + 5 + Math.floor(k / 3) * 4, BL);
  R.rect(x + w - 6, y + h - 9, x + w - 4, y + h - 4, T.C.morado); R.pset(x + w - 5, y + h - 8, BL); };
const p4 = (t) => {
  const g = T.epocas(R, t, { encuadre: 'futuro', camara: 'cerca' });
  const TX = 262, TY = 160, puerta = tramo(t, P4, P4 + 0.3) - tramo(t, SEND + 0.25, SEND + 0.4), destello = tramo(t, SEND + 0.4, SEND + 1.2);
  T.retrete(R, TX, TY, t, { color: 'rojo', puerta, viaje: 0.3 * destello * (1 - tramo(t, SEND + 1.2, SEND + 1.5)), ocupado: t > SEND + 0.4 });
  if (destello > 0.5) chispas(TX, TY - 46, (destello - 0.5) * 2, hex('#ffb0d0'), 10, 6, 30);
  // el historial cuelga de la jaula hasta que ella lo descuelga
  const coge = MED - 0.1, x0 = 196, lleva = tramo(t, MED + 0.25, SEND - 0.15), tira = tramo(t, SEND - 0.1, SEND + 0.25);
  if (t < coge) historial(184, 118, 1);
  const x = Math.round(lerp(x0, 236, lleva));
  const r = R.actor(EL.chicaRara, x, 166, t, { dir: lleva > 0 || tira > 0 ? 1 : -1, anda: lleva > 0 && lleva < 1, sostiene: t > coge - 0.3 && tira === 0 ? (t < coge ? [186, 124] : [x + 17, 140]) : undefined, sonrisa: t > MED || t > FUT, sorpresa: t > coge - 0.3 && t < coge + 0.2 });
  if (t >= coge && tira === 0) historial(r.mano[0] + 8, r.mano[1] - 10, 1);
  if (tira > 0 && tira < 1) historial(lerp(x + 15, TX, tira), lerp(128, 134, tira) - Math.sin(tira * Math.PI) * 14, 1);
  // el guardián patrulla de espaldas y se vuelve en «future»
  const gx = Math.round(70 + Math.sin(t * 0.9) * 10), vuelve = t > FUT;
  T.tentaculo(R, gx, 168, t, { color: 'morado', s: 2, brazos: 1, dir: vuelve ? 1 : -1, expresion: vuelve ? 'preocupado' : 'malvado', anda: !vuelve });
  if (t > FUT + 0.2) R.bocadillo(gx + 16, 104, { icono: '?' });
};
// ── 5 · 1793: el historial acaba en bandera ──────────────────────────────────────────────────────────────────
const ENDS = b(0.773), DES = b(0.841), AMER = b(0.907), FLAG = b(0.94);
const bandera = (x, y, t, u) => { // asta en x; arriba en y; u 0–1 se despliega
  const W = Math.round(4 + 34 * u), H = 22;
  for (let i = 0; i <= W; i++) { const ola = Math.round(Math.sin(i * 0.25 - t * 8) * 2 * (i / 38)), x1 = x + 2 + i;
    for (let j = 0; j < H; j++) { const yy = y + j + ola; let c = Math.floor(j / (H / 13)) % 2 ? BL : ROJO; if (i < 16 && j < 12) c = (i % 4 === 2 && j % 4 === 2) ? BL : hex('#2a3a8a');
      if (Math.sin(i * 0.25 - t * 8) > 0.6) c = mez(c, hex('#ffffff'), 0.18); else if (Math.sin(i * 0.25 - t * 8) < -0.6) c = mez(c, K, 0.2); R.pset(x1, yy, c); }
    R.pset(x1, y - 1 + ola, K); R.pset(x1, y + H + ola, K); }
  R.linea(x + 3 + W, y + Math.round(Math.sin(W * 0.25 - t * 8) * 2), x + 3 + W, y + H + Math.round(Math.sin(W * 0.25 - t * 8) * 2), K); };
const p5 = (t) => {
  const g = T.epocas(R, t, { encuadre: 'pasado', camara: 'cerca' });
  const TX = 110, TY = 160, viaje = 0.3 * tramo(t, P5, P5 + 0.2) * (1 - tramo(t, ENDS - 0.1, ENDS)), puerta = tramo(t, ENDS - 0.1, ENDS + 0.1);
  T.retrete(R, TX, TY, t, { color: 'azul', puerta, viaje });
  // el historial sale volando hasta el escritorio
  const vuela = tramo(t, ENDS, ENDS + 0.5), coge = DES, asta = tramo(t, AMER - 0.35, AMER), abre = tramo(t, AMER, FLAG + 0.3);
  if (vuela > 0 && t < coge) historial(lerp(TX, 152, vuela), lerp(136, 112, vuela) - Math.sin(vuela * Math.PI) * 26, 1);
  // el caballero lo recoge en «design» y lo alza en un asta
  const x = 196, alza = t > AMER - 0.35;
  const r = R.actor(EL.caballero, x, 160, t, { dir: -1, sostiene: t > coge - 0.3 ? (alza ? [x - 4, 128] : [x - 2, 132]) : undefined, sorpresa: vuela > 0 && t < coge, sonrisa: t > coge, habla: t > coge && t < AMER - 0.3 && Math.sin(t * 9) > 0 });
  if (t > coge - 0.3 && !alza) historial(r.mano[0] - 3, r.mano[1] - 6, 1);
  if (alza) { const [mx, my] = r.mano, top = my - Math.round(22 + 26 * asta); R.rect(mx, top, mx + 1, my + 10, K); R.rect(mx, top, mx, my + 10, hex('#c89a5a')); R.disco(mx, top - 1, 2, hex('#e8c050'));
    if (abre === 0) historial(mx + 6, top + 10, 1); else { bandera(mx + 1, top + 1, t, suave(abre)); poof(mx + 18, top + 10, (t - AMER) / 0.5); } }
  if (t > FLAG && t < FLAG + 1) chispas(r.mano[0] + 20, r.mano[1] - 40, (t - FLAG), AM, 10, 12, 30);
  // el roquero lo celebra
  R.actor(EL.roquero, 236, 160, t, { dir: -1, sorpresa: vuela > 0 && t < coge, brazos: t > FLAG + 0.1, sonrisa: t > coge, salto: t > FLAG + 0.1 ? Math.round(Math.abs(Math.sin((t - FLAG) * 8)) * 3) : 0 });
};
const efectos = [[0.8, 'puerta'], [OBJ, 'whoosh'], [THR + 0.3, 'puerta'], [TOIL + 0.1, 'zumbido'], [P2 + 0.15, 'puerta'], [P2 + 0.7, 'boing'], [ERA + 0.05, 'pop'], [CHG + 0.05, 'pop'], [EVR + 0.05, 'pop'],
  [HELP, 'golpecito'], [KITE, 'trueno'], [MED, 'papel'], [SEND, 'whoosh'], [SEND + 0.5, 'zumbido'], [ENDS, 'puerta'], [AMER + 0.1, 'rafaga'], [FLAG + 0.1, 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: (t) => (t < P3 ? 1993 : t < P4 ? 1793 : t < P5 ? 2193 : 1793) });
''')

E['la-cartoon'] = ('Dibujos animados y un regalo', '''// LA-CARTOON (frases 30–31), 1993, sin cartela. Cuatro planos; GOLPE en «regalo»:
// 1. mansion 'fachada' 'puerta' de día, con rebote: la casa bota y se estira como un dibujo clásico; el tentáculo morado
//    presume en el rellano y el verde mira; en «Chuck» cae un yunque (su sombra crece antes) y en «Jones» lo aplasta como
//    un acordeón; vuelve a estirarse mareado, con estrellitas, y el verde se ríe. Corta en «first».
// 2. estudio 'musica' general: la grabación de las voces; dos actores ante sus micrófonos con el guion; la segunda llega;
//    se enciende la luz roja de grabar en «day one»; en «voice acting» hablan por turnos y salen ondas de colores hacia los
//    micrófonos; el técnico de auriculares sube los mandos y en «CD-ROM» levanta el disco brillante. Corta en el silencio
//    antes de «and it hides a gift».
// 3. mansion 'cuarto' general: el ordenador viejo está tapado con una sábana y un lazo rojo, como un regalo; en «and it
//    hides» brilla el lazo (GOLPE); el empollón entra, en «gift» tira de la sábana, que sale volando con polvo; en
//    «computer» pulsa el botón y la pantalla se enciende con la mansión de 1987; salta de alegría. Corta en «you can play».
// 4. mansion 'cuarto' 'pantalla': el juego de 1987 en píxeles gordos; en «original» sale un «1987» dorado; en «a game
//    inside the game» la imagen se aleja y resulta estar dentro de otro ordenador, en el cuarto del juego, donde un
//    chaval de píxeles juega; el cursor en cruz hace clic en el ordenador en «game».''', AY + r'''
const a = (f) => en('chuck', f), b = (f) => en('regalo', f);
const P2 = a(0.40), P3 = b(-0.094), P4 = b(0.383);
// ── 1 · la fachada que bota y el yunque ─────────────────────────────────────────────────────────────────────────
const CLAS = a(0.111), CHUCK = a(0.218), JONES = a(0.242);
const yunque = (cx, by) => { cx = Math.round(cx); by = Math.round(by); const G = [hex('#2a2a34'), hex('#4a4a58'), hex('#6a6a7a'), hex('#9a9aac')];
  R.poligono([[cx - 15, by - 22], [cx + 13, by - 22], [cx + 13, by - 16], [cx + 6, by - 14], [cx + 6, by - 8], [cx + 11, by - 3], [cx + 11, by], [cx - 11, by], [cx - 11, by - 3], [cx - 6, by - 8], [cx - 6, by - 14], [cx - 9, by - 16], [cx - 22, by - 19]], K);
  R.poligono([[cx - 14, by - 21], [cx + 12, by - 21], [cx + 12, by - 17], [cx + 5, by - 15], [cx + 5, by - 8], [cx + 10, by - 3], [cx + 10, by - 1], [cx - 10, by - 1], [cx - 10, by - 3], [cx - 5, by - 8], [cx - 5, by - 15], [cx - 9, by - 17], [cx - 20, by - 19]], G[1]);
  R.rect(cx - 14, by - 21, cx + 12, by - 20, G[3]); R.rect(cx + 3, by - 15, cx + 5, by - 8, G[0]); R.rect(cx - 10, by - 2, cx + 10, by - 1, G[0]); R.pset(cx - 18, by - 19, G[2]); R.rect(cx - 4, by - 13, cx - 3, by - 9, G[2]); };
const p1 = (t) => {
  const pega = tramo(t, JONES, JONES + 0.12), vuelve = tramo(t, JONES + 0.55, JONES + 0.95);
  const rebote = 0.35 + 0.65 * Math.max(tramo(t, CLAS - 0.4, CLAS) * (1 - tramo(t, CLAS + 0.3, CHUCK)), pega * (1 - tramo(t, JONES + 0.3, JONES + 1.2)));
  const g = T.mansion(R, t, { encuadre: 'fachada', camara: 'puerta', luz: 'dia', anyo: 1993, rebote });
  const y = g.suelo, [dx0, , dx1] = g.puerta, mx = dx1 + 18, vx = dx0 - 22;
  // el verde mira desde la izquierda: se asombra, mira arriba y luego se ríe
  T.tentaculo(R, vx, y, t, { color: 'verde', s: 2, dir: 1, brazos: 1, expresion: t > JONES + 0.2 ? 'feliz' : t > CLAS ? 'sorpresa' : 'normal', habla: t > JONES + 0.3 && Math.sin(t * 14) > 0, mira: t > CHUCK - 0.4 && t < JONES ? [0.6, -1] : [1, 0], salto: t > CLAS && t < CLAS + 0.3 ? 6 : t > JONES + 0.3 ? Math.round(Math.abs(Math.sin(t * 12)) * 3) : 0 });
  // el morado presume; el yunque lo aplasta como un acordeón y vuelve a estirarse
  const aplasta = t < JONES ? 0 : (1 - vuelve) + (vuelve > 0 && vuelve < 1 ? Math.sin(vuelve * Math.PI * 3) * 0.25 * (1 - vuelve) : 0);
  const sombra = tramo(t, CHUCK - 0.5, JONES); if (sombra > 0 && t < JONES + 0.55) { const w = Math.round(4 + 12 * sombra); for (let i = -w; i <= w; i++) if ((i + y) % 2 === 0) R.pset(mx + i, y + 1, K); }
  const r = T.tentaculo(R, mx, y, t, { color: 'morado', s: 2, dir: -1, brazos: 1, pose: t < CHUCK - 0.2 ? 'arriba' : 'normal', expresion: t < CHUCK - 0.3 ? 'malvado' : t < JONES + 0.55 ? 'sorpresa' : 'harto', habla: t < CLAS + 0.4 && Math.sin(t * 9) > 0, mira: t > CHUCK - 0.5 && t < JONES ? [0, -1] : [-1, 0], aplasta: Math.max(0, aplasta) });
  const cae = tramo(t, CHUCK - 0.05, JONES);
  if (cae > 0) { const by = t < JONES + 0.55 ? lerp(-6, r.cima[1], cae * cae) : lerp(r.cima[1], y, tramo(t, JONES + 0.55, JONES + 0.85)), ax = t < JONES + 0.55 ? mx : lerp(mx, mx + 34, tramo(t, JONES + 0.55, JONES + 0.85));
    if (cae < 1) for (let k = 1; k < 4; k++) R.linea(mx - 10 + k * 6, by - 26 - k * 4, mx - 10 + k * 6, by - 34 - k * 6, hex('#e8f0ff'));
    yunque(ax, by); }
  if (t > JONES && t < JONES + 0.4) { chispas(mx, r.cima[1], (t - JONES) / 0.4, AM, 10, 10, 30); poof(mx, y - 4, (t - JONES) / 0.6, 1.3); }
  if (t > JONES + 0.9) mareo(mx, r.cima[1] - 6, t);
};
// ── 2 · la grabación de las voces ──────────────────────────────────────────────────────────────────────────────
const VOZ = a(0.685), DAY = a(0.80), CD = a(0.914);
const micro = (x, base, dir, t, on) => { // pie de micrófono con brazo hacia dir, la cápsula y el filtro
  const top = base - 40; R.linea(x - 6, base, x, base - 4, K); R.linea(x + 6, base, x, base - 4, K); R.linea(x, base - 2, x, base, K);
  R.rect(x, top, x + 1, base - 3, K); R.rect(x, top, x, base - 3, hex('#8a8a9a'));
  const mx = x + dir * 9, my = top - 3; R.linea(x, top, mx, my, K); R.linea(x, top + 1, mx, my + 1, hex('#6a6a7a'));
  R.rect(mx - 2, my - 4, mx + 2, my + 3, K); R.rect(mx - 1, my - 3, mx + 1, my + 2, hex('#b8b8c8')); for (let j = -3; j <= 2; j += 2) R.pset(mx, my + j, hex('#5a5a6a')); R.pset(mx - 1, my - 3, BL);
  const fx = mx + dir * 5; for (let k = 0; k < 16; k++) { const an = k / 16 * Math.PI * 2; R.pset(Math.round(fx + Math.cos(an) * 1.5), Math.round(my + Math.sin(an) * 4), k % 2 ? K : hex('#4a4a5a')); }
  if (on) R.pset(mx, my + 3, ROJO);
  return [mx, my]; };
const ondas = (x, y, dir, t, c) => { const cl = mez(c, BL, 0.5); for (let k = 0; k < 4; k++) { const r = 3 + ((t * 18 + k * 5) % 20); if (r > 20) continue;
  for (let i = -6; i <= 6; i++) { const an = i * 0.12, px = Math.round(x + dir * Math.cos(an) * r), py = Math.round(y + Math.sin(an) * r * 1.2); R.pset(px, py, c); R.pset(px + dir, py, r < 10 ? cl : c); } } };
const disco = (x, y, t) => { R.disco(x, y, 7, K); R.disco(x, y, 6, hex('#c8ccd8')); for (let k = 0; k < 24; k++) { const an = k / 24 * Math.PI * 2 + t * 4, r = 4.3, cs = [hex('#ff7a7a'), hex('#ffd85a'), hex('#7ae87a'), hex('#7ab8ff'), hex('#c87aff')];
  if (Math.sin(an * 2) > 0.2) R.pset(Math.round(x + Math.cos(an) * r), Math.round(y + Math.sin(an) * r), cs[k % 5]); } R.disco(x, y, 2, K); R.disco(x, y, 1, hex('#e8e8f0')); R.pset(x - 3, y - 4, BL); R.pset(x - 4, y - 3, BL); };
const guion = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 4, y - 7, x + 4, y + 2, K); R.rect(x - 3, y - 6, x + 3, y + 1, BL); for (let k = 0; k < 3; k++) R.rect(x - 2, y - 4 + k * 2, x + (k % 2 ? 1 : 2), y - 4 + k * 2, hex('#7a7a8a')); };
const p2 = (t) => {
  const g = T.estudio(R, t, { encuadre: 'musica', anyo: 1990, toca: t > VOZ - 0.4 && t < CD - 0.4 });
  // la luz roja de grabación, encima de la ventana del locutorio
  const rec = t > DAY - 0.1; R.rect(146, 18, 172, 27, K); R.rect(147, 19, 171, 26, rec ? hex('#e83a2a') : hex('#5a1a18')); if (rec) { R.rect(148, 20, 170, 21, hex('#ff8a6a')); R.disco(159, 23, 2, hex('#fff0d0')); for (let x = 140; x <= 178; x += 2) if (Math.sin(t * 6) > -0.2) { R.pset(x, 16, hex('#ff8a6a')); R.pset(x, 29, hex('#ff8a6a')); } }
  else R.disco(159, 23, 2, hex('#7a2a28'));
  // los dos actores de voz, cada uno con su micrófono y su guion
  const llega = tramo(t, P2 + 0.1, P2 + 1.2), xb = Math.round(lerp(334, 262, llega));
  const habA = t > VOZ - 0.3 && t < CD - 0.3 && Math.floor((t - VOZ) * 1.6) % 2 === 0, habB = t > VOZ - 0.3 && t < CD - 0.3 && !habA;
  const mA = micro(214, 166, -1, t, rec), mB = micro(250, 166, 1, t, rec);
  const ra = R.actor(EL.gobernadora, 192, 166, t, { dir: 1, sostiene: [205, 140 + (habA ? Math.round(Math.sin(t * 8)) : 0)], habla: habA && Math.sin(t * 11) > 0, sonrisa: !habA && t > VOZ, sorpresa: t > CD && t < CD + 0.4 });
  guion(ra.mano[0], ra.mano[1]);
  const rb = R.actor(EL.disenador2, xb, 166, t, { dir: -1, anda: llega > 0 && llega < 1, sostiene: llega >= 1 ? [xb - 3, 140] : undefined, habla: habB && Math.sin(t * 11 + 1) > 0, sonrisa: !habB && llega >= 1, dedo: t > CD + 0.4 });
  if (llega >= 1) guion(rb.mano[0], rb.mano[1]);
  if (habA) ondas(205, 138, 1, t, hex('#ff8a5a')); if (habB) ondas(xb + 1, 138, -1, t, hex('#5ac8ff'));
  // el técnico de auriculares a los mandos: en «CD-ROM» levanta el disco
  const sube = tramo(t, CD - 0.25, CD + 0.1), x = 108;
  const re = R.actor(EL.musico, x, g.sueloSinte, t, { dir: 1, tocado: 'auriculares', sostiene: sube > 0 ? [x + 16, Math.round(lerp(130, 104, sube))] : [x + 16 + Math.round(Math.sin(t * 5) * 3), 136], sonrisa: t > DAY, dedo: false });
  if (sube > 0) { disco(re.mano[0], re.mano[1] - 6, t); if (t > CD) chispas(re.mano[0], re.mano[1] - 6, (t - CD) / 0.8, AM, 10, 8, 22); }
};
// ── 3 · el ordenador tapado como un regalo ─────────────────────────────────────────────────────────────────────
const GIFT = b(0.073), COMP = b(0.212), MANS = b(0.304);
const ON = COMP + 0.15;
const p3 = (t) => {
  const pantalla = t < ON ? (R2, t2, S) => { R2.rect(S[0], S[1], S[2], S[3], hex('#14161c')); for (let k = 0; k < 6; k++) R2.pset(S[0] + 3 + k, S[1] + 2 + k, hex('#3a3e4a')); }
    : t < ON + 0.3 ? (R2, t2, S) => { R2.rect(S[0], S[1], S[2], S[3], hex('#14161c')); const u = (t - ON) / 0.3, cy = (S[1] + S[3]) >> 1, h = Math.round(u * (S[3] - S[1]) / 2); R2.rect(S[0], cy - h, S[2], cy + h, hex('#c8f0d8')); R2.rect(S[0], cy, S[2], cy, BL); } : undefined;
  const g = T.mansion(R, t, { encuadre: 'cuarto', luz: 'dia', pantalla });
  // la sábana con el lazo, que sale volando en «gift»
  const tira = tramo(t, GIFT, GIFT + 0.55), dx = tira * 70, dy = -tira * 46 - Math.sin(tira * Math.PI) * 10, sc = 1 - tira * 0.6;
  if (tira < 1) { const X = (x) => 177 + (x - 177) * sc + dx, Y = (y) => 98 + (y - 98) * sc + dy, temb = t > b(0) && t < GIFT ? Math.round(Math.sin(t * 40)) : 0;
    const P = [[154, 134], [152, 112], [158, 100], [177, 95], [196, 100], [202, 112], [200, 134]].map(([x, y]) => [Math.round(X(x) + temb), Math.round(Y(y))]);
    R.poligono(P, K); R.poligono(P.map(([x, y], i) => [x + (i < 3 ? 1 : i > 3 ? -1 : 0), y + (i === 3 ? 1 : 0)]), hex('#e8e4dc'));
    for (const fx of [160, 168, 186, 194]) R.linea(Math.round(X(fx)), Math.round(Y(104)), Math.round(X(fx - 2)), Math.round(Y(133)), hex('#b8b4ac'));
    R.linea(Math.round(X(177)), Math.round(Y(96)), Math.round(X(177)), Math.round(Y(134)), ROJO); R.linea(Math.round(X(153)), Math.round(Y(116)), Math.round(X(201)), Math.round(Y(116)), ROJO);
    const bx = Math.round(X(177)), by = Math.round(Y(95)); R.disco(bx - 4, by - 2, 3, K); R.disco(bx + 4, by - 2, 3, K); R.disco(bx - 4, by - 2, 2, ROJO); R.disco(bx + 4, by - 2, 2, ROJO); R.disco(bx, by - 1, 2, hex('#a82a20'));
    if (t > b(0) - 0.1 && t < GIFT + 0.4) chispas(bx, by - 2, ((t - b(0) + 0.1) % 0.6) / 0.6, AM, 8, 4, 12); }
  // el polvo que cae al quitarla
  if (t > GIFT && t < GIFT + 1.6) for (let k = 0; k < 18; k++) { const u = (t - GIFT) / 1.6, x = Math.round(158 + hh(k, 1, 7) * 40 + Math.sin(t * 3 + k) * 2), y = Math.round(96 + hh(k, 2, 7) * 10 + u * 30 * (0.5 + hh(k, 3, 7))); if (u < 0.9 || k % 2) R.pset(x, y, hex('#e8e0c8')); }
  // el empollón entra, tira de la sábana, pulsa el botón y salta
  const e = tramo(t, P3 + 0.05, b(0) + 0.35), x = Math.round(lerp(334, 206, e));
  const pos = t > GIFT - 0.25 && t < GIFT + 0.35 ? [Math.round(lerp(200, 216, tira)), Math.round(lerp(114, 100, tira))] : t > COMP - 0.25 && t < ON + 0.2 ? [194, 123] : undefined;
  R.actor(EL.empollon, x, 160, t, { dir: -1, anda: e > 0 && e < 1, sostiene: pos, sorpresa: t > GIFT + 0.35 && t < COMP - 0.25, sonrisa: t > MANS - 0.2 || (e >= 1 && t < GIFT), salto: t > MANS && t < MANS + 0.5 ? Math.round(Math.sin((t - MANS) / 0.5 * Math.PI) * 5) : 0 });
  if (t > ON && t < ON + 0.9) chispas(177, 117, (t - ON) / 0.9, hex('#c8f0d8'), 10, 12, 26);
};
// ── 4 · el juego dentro del juego ─────────────────────────────────────────────────────────────────────────────
const ORIG = b(0.53), GAMEA = b(0.838), INSIDE = b(0.877), GAMEB = b(0.94);
const S4 = [44, 20, 275, 146], SW = S4[2] - S4[0] + 1, SH = S4[3] - S4[1] + 1, JUEGO = new Uint32Array(SW * SH), SALA = new Uint32Array(SW * SH);
const MON = [98, 30, 145, 55];   // el hueco del monitor dentro del cuarto del juego (misma proporción que la pantalla)
const pintaSala = (t) => {
  const P = (x, y, c) => { if (x >= 0 && x < SW && y >= 0 && y < SH) SALA[y * SW + x] = c; };
  const RR = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) P(x, y, c); };
  // el cuarto del juego de 1987, en píxeles gordos de 2: pared con rayas, zócalo, suelo de tablas
  for (let y = 0; y < 86; y += 2) for (let x = 0; x < SW; x += 2) RR(x, y, x + 1, y + 1, (x >> 1) % 6 < 1 ? hex('#5a3a8a') : (x >> 1) % 6 === 3 && (y >> 1) % 4 === 0 ? hex('#8a6ab8') : hex('#6a4a9a'));
  RR(0, 80, SW - 1, 85, hex('#3a2a5a'));
  for (let y = 86; y < 98; y += 2) for (let x = 0; x < SW; x += 2) RR(x, y, x + 1, y + 1, (x >> 1) % 10 === 0 ? hex('#5a3418') : hex('#8a5a2a'));
  // la ventana con la luna, un póster y una lámpara
  RR(14, 14, 50, 50, K); RR(16, 16, 48, 48, hex('#1a2a5a')); RR(32, 16, 33, 48, K); RR(16, 32, 48, 33, K); RR(38, 20, 43, 25, hex('#f2ecc8'));
  RR(186, 16, 210, 46, K); RR(188, 18, 208, 44, hex('#e8c050')); RR(194, 24, 202, 38, hex('#c84a3a'));
  // la mesa y el monitor beige que enseña el juego
  RR(80, 62, 170, 66, K); RR(82, 62, 168, 64, hex('#a86a34')); RR(84, 66, 88, 86, hex('#6a3e1e')); RR(162, 66, 166, 86, hex('#6a3e1e'));
  RR(MON[0] - 5, MON[1] - 5, MON[2] + 5, MON[3] + 5, K); RR(MON[0] - 4, MON[1] - 4, MON[2] + 4, MON[3] + 4, hex('#d8ccb0')); RR(MON[0] - 4, MON[3] + 3, MON[2] + 4, MON[3] + 4, hex('#a8987a'));
  RR(112, MON[3] + 5, 132, 61, hex('#b8ac90')); RR(104, 58, 140, 61, hex('#d8ccb0'));
  for (let y = MON[1]; y <= MON[3]; y++) for (let x = MON[0]; x <= MON[2]; x++) { const sx = Math.floor((x - MON[0]) / (MON[2] - MON[0] + 1) * SW), sy = Math.floor((y - MON[1]) / (MON[3] - MON[1] + 1) * SH); P(x, y, JUEGO[sy * SW + sx]); }
  // el chaval de píxeles que juega, de pie junto a la mesa (gordo, de 2 en 2)
  const kx = 176, ky = 60, F = [['..HHHH..', '.HHHHHH.', '.HSSSSH.', '..SSSS..', '.CCCCCC.', 'CCCCCCCC', 'S.CCCC.S', '..FFFF..', '..F..F..', '.KK..KK.']];
  const COL = { H: hex('#5a3418'), S: hex('#f0c8a0'), C: hex('#3a8ad8'), F: hex('#3a3a5a'), K: K };
  F[0].forEach((fila, j) => [...fila].forEach((ch, i) => { if (ch !== '.') RR(kx + (7 - i) * 2, ky + j * 2 + (j === 6 && Math.floor(t * 4) % 2 ? -2 : 0), kx + (7 - i) * 2 + 1, ky + j * 2 + 1 + (j === 6 && Math.floor(t * 4) % 2 ? -2 : 0), COL[ch]); }));
  // la línea de verbos del juego, abajo
  RR(0, 100, SW - 1, SH - 1, hex('#0e0e18'));
  for (let k = 0; k < 9; k++) { const x = 6 + (k % 3) * 46, y = 104 + Math.floor(k / 3) * 7; RR(x, y, x + 36, y + 4, k === 5 && t > GAMEB - 0.3 ? hex('#f0e060') : hex('#3ab84a')); }
  for (let k = 0; k < 4; k++) RR(150 + (k % 2) * 38, 104 + Math.floor(k / 2) * 10, 180 + (k % 2) * 38, 111 + Math.floor(k / 2) * 10, [hex('#c84a3a'), hex('#3a6ad8'), hex('#e8c050'), hex('#8a8a9a')][k]);
};
const p4 = (t) => {
  T.mansion(R, t, { encuadre: 'cuarto', camara: 'pantalla', luz: 'dia' });
  // en «original», el año dorado del juego
  if (t > ORIG && t < GAMEA - 0.1) { const u = tramo(t, ORIG, ORIG + 0.3); R.recorte(S4); R.numero('1987', 160, Math.round(lerp(30, 52, suave(u))), { tam: 16, centro: true }); R.recorte(null); if (u < 1) chispas(160, 44, u, AM, 10, 20, 46); }
  // en «a game inside the game», la imagen se aleja: estaba dentro del monitor de otro cuarto de juego
  const z = suave(tramo(t, GAMEA - 0.05, INSIDE + 0.45));
  if (z > 0) {
    for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) JUEGO[y * SW + x] = R.pget(S4[0] + x, S4[1] + y);
    pintaSala(t);
    const v0 = [lerp(MON[0], 0, z), lerp(MON[1], 0, z)], vw = lerp(MON[2] - MON[0] + 1, SW, z), vh = lerp(MON[3] - MON[1] + 1, SH, z);
    for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) { const sx = Math.min(SW - 1, Math.floor(v0[0] + x / SW * vw)), sy = Math.min(SH - 1, Math.floor(v0[1] + y / SH * vh)); let c = SALA[sy * SW + sx]; if (y % 2) c = mez(c, K, 0.12); R.pset(S4[0] + x, S4[1] + y, c); }
    // el brillo del cristal y el cursor en cruz que hace clic en el ordenador
    for (let k = 0; k < 40; k++) { const x = S4[0] + 20 + k, y = S4[1] + 4 + Math.round(k * 0.4); if (k % 3) R.pset(x, y, mez(R.pget(x, y), BL, 0.25)); }
    if (z >= 1) { const u = tramo(t, INSIDE + 0.45, GAMEB), cx = Math.round(S4[0] + lerp(200, (MON[0] + MON[2]) / 2 * SW / SW, u)), cy = Math.round(S4[1] + lerp(110, (MON[1] + MON[3]) / 2, u));
      for (const [dx, dy] of [[-5, 0], [-4, 0], [-3, 0], [3, 0], [4, 0], [5, 0], [0, -5], [0, -4], [0, -3], [0, 3], [0, 4], [0, 5]]) { R.pset(cx + dx + 1, cy + dy + 1, K); R.pset(cx + dx, cy + dy, BL); }
      if (t > GAMEB) chispas(cx, cy, (t - GAMEB) / 0.7, AM, 8, 4, 16); }
  }
};
const efectos = [[CLAS, 'boing'], [CHUCK, 'whoosh'], [JONES, 'golpecito'], [JONES + 0.6, 'boing'], [DAY - 0.1, 'interruptor'], [VOZ, 'publico'], [CD, 'brillo'],
  [b(0), 'brillo'], [GIFT, 'whoosh'], [ON, 'interruptor'], [MANS, 'bip'], [ORIG, 'pop'], [GAMEA, 'whoosh'], [GAMEB, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1993 });
''')
