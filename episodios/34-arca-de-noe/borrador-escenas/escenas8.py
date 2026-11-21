E = {}

# piezas pequeñas que usan las dos escenas (cada escena es un módulo aparte: se pega en las dos)
COMUN = r'''
const K = T.C.k ?? hex('#1c1222'), BLANCO = hex('#f6f2e6'), ROJO = hex('#d8343a'), ROJOS = hex('#8a1c24'), AMBAR = hex('#ffc84a'), CARBON = hex('#17131a'), CARBONL = hex('#4a4250');
const MANGA = '#4a6a8a';
// un aro de puntos que «camina» (lo pendiente, lo que se señala): solo pset, respeta R.recorte
const aro = (cx, cy, r, col, t, paso = 2) => { const n = Math.max(8, Math.round(r * 6.283 / paso)); for (let i = 0; i < n; i++) { if ((i + Math.floor(t * 6)) % 3 === 2) continue; const an = i / n * 6.283; R.pset(Math.round(cx + Math.cos(an) * r), Math.round(cy + Math.sin(an) * r), col); } };
// un marco de trazos que camina alrededor de [x0, y0, x1, y1]
const marco = (x0, y0, x1, y1, col, t, g = 1) => { const f = Math.floor(t * 8); for (let k = 0; k < g; k++) { for (let x = x0; x <= x1; x++) { if ((x + f) % 6 < 4) R.pset(x, y0 + k, col); if ((x - f + 600) % 6 < 4) R.pset(x, y1 - k, col); } for (let y = y0; y <= y1; y++) { if ((y - f + 600) % 6 < 4) R.pset(x0 + k, y, col); if ((y + f) % 6 < 4) R.pset(x1 - k, y, col); } } };
// un trocito negro (lo que «parece» madera quemada): mancha irregular con un filo claro para que se lea
const trocito = (x, y, k = 0, brillo = false) => { const f = [[[-3, -2, 2, 1], [-2, -3, 1, 2], [3, -1, 3, 0]], [[-2, -2, 3, 1], [-3, -1, 2, 2]], [[-3, -1, 3, 1], [-1, -3, 2, 2]]][k % 3];
  for (const [a, b, c, d] of f) R.rect(x + a - 1, y + b - 1, x + c + 1, y + d + 1, brillo ? AMBAR : CARBONL); for (const [a, b, c, d] of f) R.rect(x + a, y + b, x + c, y + d, CARBON); R.pset(x - 1, y - 1, CARBONL); R.pset(x + 1, y, CARBONL); };
// una oveja pequeña (11 × 8), de perfil: lana en dos tonos, cara oscura y patas que trotan
const OVEJA = ['..kkkkkk...', '.kLLLLLLkk.', 'kLLLLLLLkCk', 'kLLLLLLlCCC', 'kLlLLLllkCk', '.kllllllk..', '..k.kk.k...'], OVEJA2 = [...OVEJA.slice(0, 6), '.k..kk..k..'];
const oveja = (x, y, dir, t, k = 0) => R.dibujo(t && Math.sin(t * 9 + k * 2) > 0 ? OVEJA2 : OVEJA, x - 5, y - 7, dir, { k: K, L: hex('#f6f0e0'), l: hex('#c8beaa'), C: hex('#3a3038') });
// una nota de prensa (34 × 46): megáfono rojo, rayas y el sello con «?»
const nota = (x, y) => { R.rect(x - 1, y - 1, x + 34, y + 46, K); R.rect(x, y, x + 33, y + 45, BLANCO); R.rect(x + 31, y + 1, x + 33, y + 45, hex('#d8d2c2'));
  R.poligono([[x + 3, y + 7], [x + 6, y + 7], [x + 10, y + 4], [x + 10, y + 13], [x + 6, y + 10], [x + 3, y + 10]], ROJO); for (let j = -2; j <= 2; j++) { R.pset(x + 13 - (Math.abs(j) > 1 ? 1 : 0), y + 8 + j, ROJO); R.pset(x + 16 - (Math.abs(j) > 1 ? 1 : 0), y + 8 + j * 2, ROJO); }
  R.rect(x + 20, y + 5, x + 30, y + 6, hex('#4a4458')); for (let k = 0; k < 5; k++) R.rect(x + 3, y + 18 + k * 3, x + (k === 4 ? 14 : 29), y + 18 + k * 3, hex('#a8a6a0'));
  aro(x + 24, y + 37, 6, ROJO, 0, 1); R.icono('?', x + 22, y + 34, ROJO, hex('#f0b0a8'), 1); };
'''

E['nx-madera'] = ('La madera', '''// NX-MADERA (frase 25, marca «madera»), 2026. Cinco planos; golpe en «charred wood»:
// 1. insertos/permiso: sobre el capó, una mano coge el sello y estampa el permiso en «permit»; arranca el motor;
// 2. ladera/corte/sondeo: el tubo baja hasta los 20 m; parpadea la marca del 9; sube una cápsula por el tubo y, en «charred
//    wood», los trocitos negros de la bolsa de los 9 m destellan (golpe): el equipo, arriba, da un respingo, y un «?»;
// 3. insertos/fotos: el 10 del 11 en el bloc; caen las tres fotos, el puntero rojo las rodea y saltan los flashes;
// 4. ladera/cerca (2026, tarde): el fundador, con la mano en la cabeza, admite que puede tener otra explicación; el técnico
//    sostiene el testigo y el arqueólogo se pregunta «?»;
// 5. ladera general (1959, tarde) DENTRO DE UN GLOBO DE IDEA del fundador: un pastor llega con leña, enciende su hoguera
//    junto a las ovejas («fire»), y al final quedan unos tizones negros. Es una hipótesis: «?».''', COMUN + r'''
const a = (f) => en('madera', f);
const P2 = a(0.206), P3 = a(0.5255), P4 = a(0.6887), P5 = a(0.8895);
const permit = a(0.0945), nueve = a(0.329), sube = a(0.394), piezas = a(0.42), quemada = a(0.4906), wood = a(0.5145), nov = a(0.55), admite = a(0.738), otra = a(0.77), fire = a(0.9216), siglos = a(0.951);

// 1 · el permiso sellado
const p1 = (t) => {
  const s = tramo(t, permit - 1.06, permit + 1.06);
  const g = T.insertos(R, t, { encuadre: 'permiso', sello: s });
  const [sx, sy] = g.sello ?? [252, 124];
  const entra = tramo(t, 0.5, permit - 1.1), sale = tramo(t, permit + 1.1, permit + 1.9);
  if (entra > 0 && sale < 1) { const dy = Math.round((1 - entra) * 70 + sale * 80), hx = sx + 8 + Math.round((1 - entra) * 14), hy = sy + 1 + dy; T.brazo(R, hx + 20, hy + 46, hx, hy, MANGA, -1, { codo: [hx + 16, hy + 22] }); }
  // el motor arranca («they drilled»): tiemblan las llaves y el vaso
  if (t > permit + 1.2) for (let k = 0; k < 3; k++) { const on = Math.floor(t * 10 + k) % 3 === 0; if (on) { R.pset(30 - k * 2, 150 + k * 3, K); R.pset(48 + k * 2, 152 + k * 2, K); R.pset(236 - k, 164 - k * 2, K); R.pset(253 + k, 163 - k * 2, K); } }
  T.insertosDelante(R, t, { encuadre: 'permiso', sello: s });
};

// 2 · el sondeo: veinte metros, la marca del nueve y los trozos negros
const p2 = (t) => {
  const o = { encuadre: 'corte', camara: 'sondeo', fondo: 0.08 + 0.92 * tramo(t, P2 - 0.2, nueve - 0.4), gira: t < sube - 0.3, trozos: tramo(t, piezas, quemada) };
  const g = T.ladera(R, t, o), [bx, by] = g.bolsa ?? [200, 107], golpe = t >= quemada;
  // la marca del 9 parpadea cuando la voz la dice
  if (t > nueve && t < sube && Math.floor(t * 6) % 2) marco(247, 98, 275, 114, AMBAR, t, 2);
  // la cápsula con la muestra sube por el tubo
  const u = tramo(t, sube, piezas + 0.3); if (u > 0 && u < 1) { const y = Math.round(lerp(by, 50, u)); R.rect(193, y - 5, 199, y + 5, K); R.rect(194, y - 4, 198, y + 4, hex('#6a4a34')); R.rect(194, y - 4, 195, y + 4, hex('#9a7454')); R.rect(196, y - 1, 197, y, CARBON); }
  // el golpe: anillos que se abren desde la bolsa y un «?» (parece madera; no está comprobado)
  if (golpe) { const d = t - quemada; for (let k = 0; k < 2; k++) { const r = 6 + (d * 26 + k * 9) % 24; aro(bx, by, r, k ? BLANCO : AMBAR, t); } for (let k = 0; k < 4; k++) trocito(bx - 22 + k * 13 + (k % 2) * 2, by + (k % 2 ? -2 : 2), k, Math.floor(t * 8) % 2 === 0);
    const e = tramo(t, quemada, quemada + 0.25), qx = 138, qy = Math.round(lerp(104, 96, e)); R.rect(qx - 4, qy - 4, qx + 13, qy + 18, K); R.rect(qx - 3, qy - 3, qx + 12, qy + 17, BLANCO); R.icono('?', qx, qy, ROJO, ROJOS, 2); }
  // el equipo, arriba: el técnico atiende la torre, el fundador y el arqueólogo llegan y miran
  const v = tramo(t, P2 + 0.2, nueve - 0.6), fx = Math.round(lerp(36, 118, v)), ax = Math.round(lerp(-6, 82, tramo(t, P2 + 0.9, nueve)));
  R.actor(EL.arqueologoNX, ax, 52, t, { dir: 1, anda: t > P2 + 0.9 && t < nueve, sorpresa: golpe, salto: golpe ? Math.max(0, Math.sin((t - quemada) * 9)) * (t - quemada < 0.35 ? 3 : 0) : 0 });
  R.actor(EL.fundadorNX, fx, 52, t, { dir: 1, anda: v > 0 && v < 1, dedo: t > nueve && t < sube, habla: t > nueve && t < piezas && Math.sin(t * 8) > 0, sorpresa: golpe });
  const tec = R.actor(EL.tecnicoNX, 156, 52, t, { dir: 1, sostiene: t > piezas + 0.3 ? [176, 40] : [172, 36], sorpresa: golpe });
  if (t > piezas + 0.3) T.PIEZAS_NX.testigo(R, tec.mano[0] + 4, tec.mano[1] + 4, { s: 1, brillo: golpe, t });
  T.laderaDelante(R, t, o);
};

// 3 · las primeras fotos, el 10 de noviembre
const caen = [a(0.553), a(0.598), a(0.644)];
const p3 = (t) => {
  const cu = tramo(t, P3 + 0.15, caen[0]) + tramo(t, caen[0] + 0.2, caen[1]) + tramo(t, caen[1] + 0.2, caen[2]);
  const g = T.insertos(R, t, { encuadre: 'fotos', cuantas: cu });
  // la hoja del día en el bloc: 11 · 10
  R.rect(265, 55, 299, 91, K); R.rect(266, 56, 298, 90, BLANCO); R.rect(266, 56, 298, 66, ROJO); R.numero('11', 283, 65, { centro: true, color: BLANCO, sombra: false }); R.numero('10', 283, 87, { tam: 16, centro: true });
  for (const x of [271, 279, 287, 295]) { R.rect(x - 1, 53, x, 57, K); R.pset(x, 54, hex('#c8ccd8')); }
  if (t > nov && t < nov + 1.2 && Math.floor(t * 6) % 2) marco(263, 51, 301, 93, AMBAR, t, 2);
  // el puntero rojo rodea los trozos de la última foto que ha caído
  const cs = (g.centros ?? []).filter(Boolean), n = Math.min(cs.length, t >= caen[2] ? 3 : t >= caen[1] ? 2 : t >= caen[0] ? 1 : 0);
  if (n > 0) { const [cx, cy] = cs[n - 1], an = t * 6, px = Math.round(cx - 4 + Math.cos(an) * 15), py = Math.round(cy - 2 + Math.sin(an) * 9);
    for (let k = 1; k < 7; k++) R.pset(Math.round(cx - 4 + Math.cos(an - k * 0.22) * 15), Math.round(cy - 2 + Math.sin(an - k * 0.22) * 9), k < 3 ? hex('#ff8a8a') : ROJO);
    R.disco(px, py, 2, ROJO); R.pset(px, py, BLANCO); }
  T.insertosDelante(R, t, { encuadre: 'fotos', cuantas: cu });
  // los flashes de la prensa al caer cada foto
  for (const c of caen) { const d = t - c; if (d >= 0 && d < 0.2) { const m = d < 0.07 ? 70 : d < 0.14 ? 34 : 14; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const c = R.pget(x, y); R.pset(x, y, (0xff000000 | (Math.min(255, ((c >>> 16) & 255) + m) << 16) | (Math.min(255, ((c >>> 8) & 255) + m) << 8) | Math.min(255, (c & 255) + m)) >>> 0); } } }
};

// 4 · el fundador admite que puede tener otra explicación
const p4 = (t) => {
  const o = { camara: 'cerca', epoca: 2026, hora: 'tarde' };
  T.ladera(R, t, o);
  T.PIEZAS_NX.perforadora(R, 232, 152, { t, gira: false });
  const v = tramo(t, P4, admite - 0.2), fx = Math.round(lerp(112, 146, v)), duda = t > otra;
  const tec = R.actor(EL.tecnicoNX, 92, 160, t, { dir: 1, sostiene: [108, 146] });
  T.PIEZAS_NX.testigo(R, tec.mano[0] + 6, tec.mano[1] + 5, { s: 1, brillo: true, t });
  const arq = R.actor(EL.arqueologoNX, 196, 160, t, { dir: -1, sorpresa: duda && t < otra + 0.5, habla: t < admite - 0.3 && Math.sin(t * 9) > 0 });
  if (duda) R.bocadillo(arq.cabeza[0] + 2, arq.cabeza[1] - 4 - Math.round(tramo(t, otra, otra + 0.2) * 3), { icono: '?' });
  // la mano a la cabeza: se rasca mientras lo admite
  const rasca = t > admite ? [fx + 12 + (Math.floor(t * 6) % 2), 160 - 25] : null;
  R.actor(EL.fundadorNX, fx, 160, t, { dir: 1, anda: v > 0 && v < 1, habla: v >= 1 && Math.sin(t * 8) > -0.2, triste: duda, ...(rasca ? { sostiene: rasca } : {}) });
  // una oveja curiosa se asoma por la borda de la derecha
  oveja(Math.round(lerp(300, 262, tramo(t, P4 + 0.6, otra))), 150, -1, t, 3);
  T.laderaDelante(R, t, o);
};

// 5 · la hipótesis, dentro de un globo de idea: la hoguera de un pastor, hace siglos
const DISCOS = [[62, 68, 44], [112, 58, 40], [164, 56, 38], [208, 56, 38], [246, 80, 36], [46, 108, 36], [244, 112, 32], [60, 134, 36], [100, 137, 36], [140, 138, 36], [180, 138, 36], [220, 134, 36], [150, 92, 70]];
let NUBE = null, BUF = null;
const dentro = (x, y) => { for (const [cx, cy, r] of DISCOS) if ((x - cx) ** 2 + (y - cy) ** 2 < r * r) return true; return false; };
const hazNube = () => { NUBE = new Uint8Array(320 * 180); for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { if (!dentro(x, y)) continue;
  let m = 1; for (const [dx, dy] of [[4, 0], [-4, 0], [0, 4], [0, -4], [3, 3], [-3, 3], [3, -3], [-3, -3]]) if (!dentro(x + dx, y + dy)) m = 2;
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!dentro(x + dx, y + dy)) m = 3; NUBE[y * 320 + x] = m; } };
const F1 = hex('#17163a'), F2 = hex('#201f4a'), F3 = hex('#2c2a5e'), RIM = hex('#f4f0e4'), RIMS = hex('#c8c4dc');
const p5 = (t) => {
  if (!NUBE) { hazNube(); BUF = R.nuevo(); }
  const o = { epoca: 1959, hora: 'tarde' };
  const prev = R.usar(BUF);
  T.ladera(R, t, o);
  const llega = tramo(t, P5 + 0.1, fire - 0.15), px = Math.round(lerp(112, 134, llega)), fuego = tramo(t, fire, fire + 0.5), brasa = tramo(t, siglos + 1.1, siglos + 2.1), FX = 172, FY = 158;
  for (const [x, y, d, k] of [[66, 160, 1, 0], [92, 154, -1, 1], [112, 162, 1, 4], [216, 160, -1, 2], [238, 153, 1, 3]]) oveja(x + Math.round(Math.sin(t * 0.7 + k) * 2), y, d, Math.sin(t * 1.3 + k) > 0.6 ? t : 0, k);
  // el resplandor en el suelo
  if (fuego > 0) { const rr = Math.round((26 + Math.sin(t * 11) * 3) * fuego * (1 - brasa * 0.6)); for (let y = -5; y <= 5; y++) for (let x = -rr; x <= rr; x++) if ((x / rr) ** 2 + (y / 6) ** 2 < 1 && ((x + y + Math.floor(t * 8)) & 1)) R.pset(FX + x, FY + 1 + y, hex('#ffb84a')); }
  // la leña (que acaba en tizones negros) y las piedras
  const LE = brasa > 0.5 ? CARBON : hex('#6a4024'), LL = brasa > 0.5 ? CARBONL : hex('#a06a3a');
  if (llega >= 1) { for (const [x0, y0, x1, y1] of [[-8, 0, 7, -4], [-7, -4, 8, 0], [-3, 1, 4, -6]]) { R.linea(FX + x0, FY + y0 + 1, FX + x1, FY + y1 + 1, K); R.linea(FX + x0, FY + y0, FX + x1, FY + y1, LE); R.linea(FX + x0, FY + y0 - 1, FX + x1, FY + y1 - 1, LL); }
    for (const x of [-11, -6, 7, 11]) { R.rect(FX + x - 2, FY, FX + x + 2, FY + 3, K); R.rect(FX + x - 1, FY + 1, FX + x + 1, FY + 2, hex('#9a94a0')); } }
  // las llamas (tres lenguas de tres tonos) y el humo
  const alto = fuego * (1 - brasa * 0.85);
  if (alto > 0.05) for (const [dx, hh, col, f] of [[-6, 18, '#e8542a', 9], [5, 21, '#e8542a', 11], [0, 28, '#f08a2a', 13], [-2, 18, '#ffd04a', 10], [2, 11, '#fff2b0', 8]]) { const h2 = Math.round((hh + Math.sin(t * f + dx) * 4) * alto), w = Math.max(2, Math.round(h2 / 3.4)); R.poligono([[FX + dx - w, FY - 2], [FX + dx + Math.round(Math.sin(t * f * 0.7) * 2), FY - 2 - h2], [FX + dx + w, FY - 2]], hex(col)); }
  if (fuego > 0) for (let k = 0; k < 7; k++) { const e = ((t * 0.5 + k / 7) % 1), y = FY - 24 - e * 50, x = FX + Math.sin(e * 5 + k) * (3 + e * 7) + e * 10; R.disco(Math.round(x), Math.round(y), e < 0.5 ? 2 : 3, e < 0.6 ? hex('#8a7e8c') : hex('#b4a8b0')); }
  if (alto > 0.3) for (let k = 0; k < 4; k++) { const e = (t * 1.3 + k * 0.27) % 1; R.pset(Math.round(FX + Math.sin(k * 3 + t * 3) * 6), Math.round(FY - 8 - e * 26), AMBAR); }
  // el pastor: llega con la leña, se calienta las manos
  const pa = R.actor(EL.pastorNX, px, 159, t, { dir: 1, anda: llega > 0 && llega < 1, sonrisa: fuego >= 1 && brasa < 0.5, ...(llega < 1 ? { sostiene: true } : fuego > 0 ? { sostiene: [px + 22, 147] } : {}) });
  if (llega < 1) { const [mx, my] = pa.mano; for (let k = 0; k < 3; k++) { R.rect(mx - 3, my + k * 2 - 2, mx + 8, my + k * 2 - 1, K); R.rect(mx - 2, my + k * 2 - 2, mx + 7, my + k * 2 - 2, hex('#a06a3a')); } }
  T.laderaDelante(R, t, o);
  // los tizones negros que quedan, señalados
  if (brasa > 0.5) { aro(FX, FY - 2, 13, BLANCO, t); for (let k = 0; k < 3; k++) trocito(FX - 7 + k * 7, FY - 1 - (k % 2) * 3, k, Math.floor(t * 6) % 2 === 0); }
  R.usar(prev);
  // el fondo oscuro y el marco de nube
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const i = y * 320 + x, m = NUBE[i];
    R.pset(x, y, m === 1 ? BUF[i] : m === 2 ? ((x + y) % 7 === 0 ? RIMS : RIM) : m === 3 ? K : ((x * 3 + y * 5) % 23 === 0 ? F3 : ((x + y) & 1) && y > 90 + Math.sin(x * 0.05) * 20 ? F2 : F1)); }
  // las burbujas hasta la cabeza del fundador, que lo piensa
  const bur = [[293, 158, 2], [284, 153, 3], [273, 147, 5]];
  bur.forEach(([x, y, r], k) => { if (t < P5 + 0.1 + k * 0.12) return; const yy = y + Math.round(Math.sin(t * 2.4 + k) * 1); R.disco(x, yy, r + 2, K); R.disco(x, yy, r + 1, RIM); R.disco(x, yy, Math.max(0, r - 1), hex('#ffe9c0')); });
  const fu = R.actor(EL.fundadorNX, 296, 187, t, { dir: -1, sostiene: [296 + 3 + (Math.floor(t * 5) % 2), 187 - 26] });
  // es una hipótesis
  if (t > siglos - 0.2) { const qy = 132 + Math.round(Math.sin(t * 3) * 1.5); R.icono('?', 301, qy, AMBAR, K, 2); }
};

const efectos = [[permit, 'sello'], [permit + 1.25, 'arranque'], [P2 + 0.15, 'maquina'], [nueve, 'bip'], [quemada, 'toc'], [quemada + 0.3, 'brillo'], [caen[0], 'flash'], [caen[1], 'papel'], [caen[2], 'flash'], [otra, 'pop'], [fire, 'whoosh'], [siglos + 1.3, 'viento']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año: 2026 });
''')

E['nx-confirmar'] = ('Sin confirmar', '''// NX-CONFIRMAR (frases 26–27, marcas «claro» y «falta»), 2026. Nueve planos:
// 1. hoy/estudio/mesa: una nota de prensa con su megáfono; en «confirmed» una mano le planta un sello rojo con «?»;
// 2. insertos/revista: las notas de prensa se apilan; una mano da dos toques a la revista científica, que sigue cerrada, y
//    los tres huecos de revisión quedan vacíos;
// 3. insertos/sobres: una mano mete el trozo negro en el sobre 3; en «sent» los sobres avanzan… y no llegan: «?» en los
//    tres matraces vacíos;
// 4. ladera/corte en plano azul («según ellos»): el radar dibuja las rectas; un barrido las explica con capas y grietas
//    naturales de roca, que dan las mismas rectas;
// 5. hoy/lista: la geóloga de fuera entra, se pregunta «?» y señala la primera ficha (la excavación abierta): casilla vacía;
// 6. hoy/geologo/laboratorio vacío: la madera en su carro, sin datar (tres aros vacíos); lo de las marcas de corte, en una
//    ficha azul («según ellos»); un robot de limpieza pasa;
// 7. hoy/geologo: los de fuera esperan ante una bandeja vacía; la lupa no tiene nada que mirar; el hueco de la revista;
// 8. insertos/calendario: los meses de 2027 pasan; una mano coge el sello y espera: el hueco del permiso sigue vacío, «?»;
// 9. ladera general (2026, tarde): la ladera, esperando; el rebaño vuelve a casa y cae la tarde.''', COMUN + r'''
const a = (f) => en('claro', f), b = (f) => en('falta', f);
const P2 = a(0.1722), P3 = a(0.4722), P4 = a(0.8165), P5 = b(-0.015), P6 = b(0.2498), P7 = b(0.4963), P8 = b(0.7297), P9 = b(0.9173);
const confirmado = a(0.121), notas = a(0.196), revista = a(0.318), expertos = a(0.382), mete = a(0.546), enviado = a(0.63), noLlegan = a(0.763), rectas = a(0.86), capas = a(0.922);
const que = b(0.0255), abierta = b(0.0752), fuera = b(0.194), dice = b(0.372), cortes = b(0.4614), nadie = b(0.505), publicado = b(0.635), v2027 = b(0.8), siPermiso = b(0.86);

// 1 · la nota de prensa y el sello de «?»
const p1 = (t) => {
  const baja = tramo(t, confirmado - 0.22, confirmado), o = { encuadre: 'estudio', camara: 'mesa', mira: t > 1.6, gatoMira: 1 };
  T.hoy(R, t, o);
  // la nota (dibujada aquí: la pieza del kit ya trae el sello puesto)
  const NX = 254, NY = 114, tiembla = t >= confirmado && t < confirmado + 0.2 ? 1 : 0;
  R.rect(NX + 3, NY + 3, NX + 47, NY + 61, hex('#3a2416')); R.rect(NX - 1, NY - 1 + tiembla, NX + 45, NY + 59 + tiembla, K); R.rect(NX, NY + tiembla, NX + 44, NY + 58 + tiembla, BLANCO);
  R.rect(NX, NY + tiembla, NX + 44, NY + 3 + tiembla, hex('#3a5a8a'));
  // el megáfono, que «grita» hasta que cae el sello
  R.poligono([[NX + 5, NY + 12], [NX + 9, NY + 12], [NX + 15, NY + 8], [NX + 15, NY + 20], [NX + 9, NY + 16], [NX + 5, NY + 16]], ROJO); R.rect(NX + 6, NY + 17, NX + 8, NY + 20, ROJOS);
  if (t < confirmado) for (let k = 0; k < 3; k++) if ((Math.floor(t * 7) + k) % 3 !== 0) for (let j = -3 - k * 2; j <= 3 + k * 2; j++) R.pset(NX + 19 + k * 4 - Math.round(Math.abs(j) / 3), NY + 14 + j, ROJO);
  R.rect(NX + 20 + 12, NY + 8, NX + 40, NY + 9, hex('#8a8c98'));
  for (let k = 0; k < 7; k++) R.rect(NX + 5, NY + 25 + k * 4 + tiembla, NX + (k % 3 === 2 ? 26 : k > 3 ? 20 : 39), NY + 25 + k * 4 + tiembla, hex('#a8a6a0'));
  const SX = NX + 30, SY = NY + 42;
  if (t >= confirmado) { for (let r = 9; r <= 10; r++) aro(SX, SY, r, ROJO, 0, 1); aro(SX, SY, 12, ROJO, 0, 3); R.icono('?', SX - 4, SY - 7, ROJO, hex('#f0b0a8'), 2); }
  // la mano con el sello de caucho: entra por la derecha, golpea y se va
  const ent = tramo(t, confirmado - 1.1, confirmado - 0.25), sal = tramo(t, confirmado + 0.3, confirmado + 0.95);
  if (ent > 0 && sal < 1) { const bx = SX + Math.round((1 - ent) * 50 + sal * 60), byy = Math.round(lerp(SY - 22, SY + 3, baja) - (1 - ent) * 14 - sal * 26);
    R.rect(bx - 9, byy - 5, bx + 9, byy + 1, K); R.rect(bx - 8, byy - 4, bx + 8, byy - 2, hex('#7a2a2a')); R.rect(bx - 8, byy - 1, bx + 8, byy, ROJO);
    R.rect(bx - 4, byy - 16, bx + 4, byy - 5, K); R.rect(bx - 3, byy - 15, bx + 3, byy - 6, hex('#b07a3a')); R.rect(bx - 3, byy - 15, bx - 2, byy - 6, hex('#d8a05a'));
    T.brazo(R, bx + 46, byy - 34, bx + 8, byy - 12, MANGA, -1, { codo: [bx + 30, byy - 18] }); }
  T.hoyDelante(R, t, o);
};

// 2 · notas de prensa, no una revista científica
const p2 = (t) => {
  const o = { encuadre: 'revista', abierta: 0 };
  T.insertos(R, t, o);
  // más notas de prensa que llegan al montón, deslizándose desde la izquierda
  for (let k = 0; k < 3; k++) { const u = tramo(t, notas - 0.1 + k * 0.52, notas + 0.3 + k * 0.52); if (u <= 0) continue; const e = 1 - (1 - u) ** 2; nota(Math.round(lerp(-40, 12 + k * 3 - (k === 1 ? 6 : 0), e)), Math.round(lerp(110, 88 - k * 5, e))); }
  // la mano da dos toques a la revista cerrada
  const ent = tramo(t, revista - 0.7, revista - 0.1), sal = tramo(t, expertos - 0.3, expertos + 0.3);
  if (ent > 0 && sal < 1) { const toque = (t > revista && t < revista + 0.14) || (t > revista + 0.5 && t < revista + 0.64) ? 3 : 0, hx = 236 + Math.round((1 - ent) * 30 + sal * 40), hy = 138 + toque + Math.round((1 - ent) * 40 + sal * 46);
    T.brazo(R, hx + 34, hy + 44, hx, hy, MANGA, -1, { codo: [hx + 26, hy + 18] }); }
  if ((t > revista && t < revista + 0.25) || (t > revista + 0.5 && t < revista + 0.75)) for (let k = 0; k < 3; k++) R.linea(214 - k * 6, 128 - k * 2, 210 - k * 6, 124 - k * 2, BLANCO);
  // los tres huecos de la revisión de otros expertos, vacíos
  for (let k = 0; k < 3; k++) { const u = tramo(t, expertos + k * 0.35, expertos + 0.25 + k * 0.35); if (u <= 0) continue; const cx = 80 + k * 28, cy = 60 - Math.round((1 - u) * 4);
    R.disco(cx, cy, 12, K); R.disco(cx, cy, 11, hex('#2a5a44')); aro(cx, cy, 11, BLANCO, t + k); aro(cx, cy, 10, BLANCO, t + k); R.icono('lupa', cx - 3, cy - 4, hex('#9cc8ac'), hex('#1e4434')); }
  T.insertosDelante(R, t, o);
};

// 3 · nadie ha datado la madera: los sobres van de camino y los matraces siguen vacíos
const madero = (x, y) => { const P = [[-9, -1], [-4, -6], [6, -5], [10, 0], [5, 5], [-6, 4]]; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [-2, 0], [0, 2], [0, -2]]) R.poligono(P.map(([a2, b2]) => [x + a2 + dx, y + b2 + dy]), AMBAR);
  R.poligono(P.map(([a2, b2]) => [x + a2, y + b2]), CARBON); R.linea(x - 6, y - 1, x + 5, y - 3, CARBONL); R.linea(x - 3, y + 2, x + 6, y + 1, CARBONL); R.pset(x - 1, y - 4, CARBONL); R.pset(x + 2, y + 3, hex('#7a3a2a')); };
const p3 = (t) => {
  const o = { encuadre: 'sobres', viaje: tramo(t, enviado, noLlegan + 0.2) * 0.8 };
  const g = T.insertos(R, t, o), [sx, sy] = (g.sobres ?? [[37, 147], [61, 109], [47, 71]])[2] ?? [37, 147];
  // la mano trae el trozo negro y lo mete en el sobre de abajo
  const ent = tramo(t, P3 + 0.2, mete - 0.25), suelta = tramo(t, mete, mete + 0.25), sal = tramo(t, mete + 0.3, mete + 1);
  if (suelta > 0 && suelta < 1) madero(sx + 4, Math.round(lerp(sy - 18, sy - 2, suelta)));
  if (ent > 0 && sal < 1) { const hx = sx - 8 + Math.round(sal * 10), hy = sy - 20 + Math.round((1 - ent) * 54 + sal * 60); if (suelta <= 0) madero(hx + 13, hy + 2); T.brazo(R, hx - 22, hy + 44, hx, hy, MANGA, 1, { codo: [hx - 20, hy + 20] }); }
  // lo que no ha llegado: «?» sobre cada matraz vacío
  for (let k = 0; k < 3; k++) { const u = tramo(t, noLlegan - 0.5 + k * 0.3, noLlegan - 0.3 + k * 0.3); if (u <= 0 || (u >= 1 && Math.floor(t * 3 + k) % 4 === 0)) continue; const x = 264, y = 62 + k * 38 - Math.round((1 - u) * 3); R.icono('?', x, y, ROJO, hex('#f6d8d0'), 2); }
  // los sobres se paran antes de la rampa
  if (t > noLlegan + 0.2) for (let k = 0; k < 3; k++) { const y = 71 + k * 38; if (Math.floor(t * 5) % 2) for (let j = 0; j < 3; j++) R.linea(210 + j * 4, y - 6, 210 + j * 4, y + 6, AMBAR); }
  T.insertosDelante(R, t, o);
};

// 4 · el radar también dibuja rectas en capas naturales de roca
const FILAS = [95, 101, 108, 121], COLS = [124, 133, 142, 150, 166, 178, 194, 202, 212, 220], TONOS = ['#c88a5a', '#d8b46a', '#a89484', '#c06a4a', '#8a7a8a'];
const fondoCuenco = (x) => 133 - 37 * ((x - 172) / 74) ** 2;
const esAmbar = (c) => { const r = c & 255, g = (c >>> 8) & 255, bb = (c >>> 16) & 255; return r > 150 && g > 110 && r - bb > 70; };
const p4 = (t) => {
  const o = { encuadre: 'corte', plano: true, pasillos: 0.5 + 0.5 * tramo(t, P4, rectas + 0.5) };
  T.ladera(R, t, o);
  const u = tramo(t, capas - 0.3, capas + 1.1), xb = Math.round(lerp(96, 250, u));
  if (u > 0) { for (let x = 98; x <= Math.min(xb, 246); x++) { const yb = fondoCuenco(x); for (let y = 97; y < yb; y++) { if (esAmbar(R.pget(x, y))) continue;
        const k = y < 101 ? 0 : y < 108 ? 1 : y < 121 ? 2 : 3, borde = FILAS.includes(y) || y >= yb - 1, grieta = (k === 1 || k === 2) && COLS.includes(x - ((y >> 2) & 1)),
          trama = k === 0 ? (x + y) % 3 === 0 : k === 1 ? (x * 3 + y * 7) % 11 === 0 : k === 2 ? (y - 108) % 4 === 3 || (x + ((y - 108) >> 2) * 5) % 10 === 0 : (x + y * 2) % 6 === 0;
        R.pset(x, y, borde || grieta ? hex('#3a2416') : hex(trama ? ['#6a4a34', '#b8904a', '#8a4630', '#6c6c80'][k] : ['#8a6a4a', '#d8b46a', '#b86a4a', '#8e8ea2'][k])); } }
    // la línea del barrido
    if (u < 1) { for (let y = 90; y < 138; y++) R.pset(xb, y, (y + Math.floor(t * 12)) % 3 ? BLANCO : AMBAR); R.rect(xb - 3, 84, xb + 3, 89, K); R.rect(xb - 2, 85, xb + 2, 88, AMBAR); } }
  // el martillo de geólogo da la explicación: son capas y grietas de roca
  if (u > 0.5) T.PIEZAS_NX.martillo(R, 24, 73 - Math.round(Math.abs(Math.sin((t - capas) * 5)) * 4 * (t < capas + 2.6 ? 1 : 0)), { s: 2 });
  T.laderaDelante(R, t, o);
};

// 5 · lo que haría falta: la lista, con las casillas vacías
const p5 = (t) => {
  const o = { encuadre: 'lista', hechas: 0 };
  T.hoy(R, t, o);
  const luz = t > abierta;
  if (luz) { marco(19, 27, 71, 89, AMBAR, t, 2); if (Math.floor(t * 4) % 2) marco(25, 66, 41, 82, ROJO, t, 1); }
  const v = tramo(t, P5 + 0.1, abierta - 0.2), gx = Math.round(lerp(252, 170, v));
  const ge = R.actor(EL.geologa3NX, gx, 172, t, { dir: -1, anda: v > 0 && v < 1, dedo: luz, habla: luz && Math.sin(t * 8) > 0 });
  if (t > que - 0.3 && t < abierta) R.bocadillo(ge.cabeza[0], ge.cabeza[1] - 5, { icono: '?' });
  if (luz && t > fuera - 1.2) for (let k = 0; k < 3; k++) { const e = (t * 1.2 + k / 3) % 1; R.pset(46 + Math.round(Math.cos(k * 2.1) * (6 + e * 22)), 58 + Math.round(Math.sin(k * 2.1) * (6 + e * 22)), AMBAR); }
  T.hoyDelante(R, t, o);
};

// 6 · la madera, sin datar; las marcas de corte, «según ellos»
const p6 = (t) => {
  const o = { encuadre: 'geologo', camara: 'laboratorio', vacio: true };
  T.hoy(R, t, o);
  const CX = 150, CY = 134;
  // el foco sobre el carro
  for (let y = 60; y < CY + 2; y++) { const w = 6 + (y - 60) * 0.22; for (let x = Math.round(CX - w); x <= CX + w; x++) if (((x + y) & 1) === 0 && (y % 2 === 0)) { const c = R.pget(x, y); R.pset(x, y, (0xff000000 | (Math.min(255, ((c >>> 16) & 255) + 34) << 16) | (Math.min(255, ((c >>> 8) & 255) + 38) << 8) | Math.min(255, (c & 255) + 40)) >>> 0); } }
  // el carro de acero con la bandeja y el trozo
  R.rect(CX - 21, CY, CX + 21, CY + 4, K); R.rect(CX - 20, CY + 1, CX + 20, CY + 2, hex('#c8ccd8')); R.rect(CX - 20, CY + 3, CX + 20, CY + 3, hex('#8c90a4'));
  for (const x of [CX - 18, CX + 17]) { R.rect(x - 1, CY + 5, x + 1, 160, K); R.rect(x, CY + 5, x, 159, hex('#8c90a4')); R.disco(x, 162, 2, K); R.pset(x, 162, hex('#8c90a4')); }
  R.rect(CX - 19, 150, CX + 19, 152, K); R.rect(CX - 18, 151, CX + 18, 151, hex('#8c90a4'));
  R.rect(CX - 13, CY - 3, CX + 13, CY, K); R.rect(CX - 12, CY - 2, CX + 12, CY - 1, BLANCO);
  trocito(CX - 3, CY - 5, 0, false); trocito(CX + 5, CY - 4, 2, false);
  T.PIEZAS_NX.lupa(R, CX + 30, CY + 1, { s: 1 });
  // tres laboratorios, ninguna fecha: tres aros vacíos
  for (let k = 0; k < 3; k++) { const u = tramo(t, P6 + 0.5 + k * 0.4, P6 + 0.7 + k * 0.4); if (u <= 0) continue; const cx = CX - 18 + k * 18, cy = 106; R.disco(cx, cy, 6, hex('#20243a')); aro(cx, cy, 6, BLANCO, t + k); R.icono('?', cx - 2, cy - 3, AMBAR, K, 1); }
  // la ficha azul: lo que el equipo dice (marcas de corte)
  const f = tramo(t, dice, dice + 0.4);
  if (f > 0) { const x0 = 88, y0 = Math.round(lerp(150, 92, 1 - (1 - f) ** 2)), AZ = hex('#16305a'), AZL = hex('#3a5c96'), LIN = hex('#bcd4f4');
    R.rect(x0 - 1, y0 - 1, x0 + 39, y0 + 31, K); R.rect(x0, y0, x0 + 38, y0 + 30, AZ); for (let x = x0 + 4; x < x0 + 38; x += 6) R.rect(x, y0, x, y0 + 30, AZL); for (let y = y0 + 4; y < y0 + 30; y += 6) R.rect(x0, y, x0 + 38, y, AZL);
    R.poligono([[x0 + 6, y0 + 12], [x0 + 16, y0 + 7], [x0 + 31, y0 + 10], [x0 + 33, y0 + 20], [x0 + 20, y0 + 25], [x0 + 8, y0 + 22]], AZ);
    const P = [[x0 + 6, y0 + 12], [x0 + 16, y0 + 7], [x0 + 31, y0 + 10], [x0 + 33, y0 + 20], [x0 + 20, y0 + 25], [x0 + 8, y0 + 22]]; P.forEach(([x, y], i) => { const [x1, y1] = P[(i + 1) % P.length]; R.linea(x, y, x1, y1, LIN); });
    const n = Math.floor(tramo(t, cortes - 0.2, cortes + 0.5) * 3 + 0.01); for (let k = 0; k < n; k++) { R.linea(x0 + 12 + k * 6, y0 + 11, x0 + 15 + k * 6, y0 + 19, AMBAR); R.linea(x0 + 13 + k * 6, y0 + 11, x0 + 16 + k * 6, y0 + 19, AMBAR); }
    if (f >= 1) { for (let x = x0 + 39; x < CX - 14; x += 2) R.pset(x, Math.round(lerp(y0 + 16, CY - 5, (x - x0 - 39) / (CX - 14 - x0 - 39))), LIN); R.icono('?', x0 + 31, y0 + 2, AMBAR, K, 1); } }
  // el robot de limpieza, que cruza el suelo
  const rx = Math.round(lerp(40, 290, ((t - P6) / (P7 - P6)))), ry = 160; R.rect(rx - 8, ry - 3, rx + 8, ry + 1, K); R.rect(rx - 7, ry - 2, rx + 7, ry, hex('#5a6078')); R.rect(rx - 7, ry - 2, rx + 7, ry - 2, hex('#8c94b0')); R.pset(rx + 5, ry - 1, Math.floor(t * 4) % 2 ? hex('#5aff8a') : hex('#1a6a3a')); for (let k = 1; k < 5; k++) if ((k + Math.floor(t * 8)) % 2) R.pset(rx - 9 - k * 2, ry + 1, hex('#8c94b0'));
  T.hoyDelante(R, t, o);
};

// 7 · nadie de fuera lo ha examinado; nada publicado que revisar
const p7 = (t) => {
  const o = { encuadre: 'geologo' };
  T.hoy(R, t, o);
  // llega el geólogo por la derecha y mira el reloj
  const v = tramo(t, P7 + 0.2, publicado - 0.4), gx = Math.round(lerp(316, 250, v));
  R.actor(EL.geologa3NX, 104, 154, t, { dir: 1, habla: t > publicado && Math.sin(t * 8) > 0, dedo: t > publicado + 0.2, triste: t < publicado });
  const co = R.actor(EL.collins, 196, 154, t, { dir: -1, triste: t > nadie + 1.2, ...(t < nadie + 1.2 ? { sostiene: [190, 136] } : {}) });
  if (t < nadie + 1.2) T.PIEZAS_NX.lupa(R, co.mano[0] - 4, co.mano[1] + 6, { s: 1 });
  T.hoyDelante(R, t, o);
  // sobre la mesa: la bandeja vacía donde iría el trozo, y el hueco de la revista que no existe
  const TX = 171, TY = 146; R.rect(TX - 21, TY - 4, TX + 21, TY, K); R.rect(TX - 20, TY - 3, TX + 20, TY - 1, BLANCO); R.rect(TX - 20, TY - 1, TX + 20, TY - 1, hex('#c8c0b0'));
  marco(TX - 12, TY - 11, TX + 12, TY - 4, ROJO, t, 1);
  if (t > nadie - 0.3) { const e = tramo(t, nadie - 0.3, nadie), qy = TY - 34 - Math.round(e * 3); R.rect(TX - 8, qy - 3, TX + 8, qy + 17, K); R.rect(TX - 7, qy - 2, TX + 7, qy + 16, BLANCO); R.pset(TX, qy + 18, K); R.pset(TX - 1, qy + 18, K); R.pset(TX, qy + 19, K); R.icono('?', TX - 5, qy, ROJO, hex('#f0b0a8'), 2); }
  if (t >= nadie + 1.2) T.PIEZAS_NX.lupa(R, 222, 148, { s: 1 });
  if (t > publicado) { const u = tramo(t, publicado, publicado + 0.3), x0 = 127, y0 = 122 - Math.round(u * 4); R.rect(x0 - 1, y0 - 1, x0 + 19, y0 + 25, K); R.rect(x0, y0, x0 + 18, y0 + 24, hex('#e8eef6')); marco(x0 + 1, y0 + 1, x0 + 17, y0 + 23, hex('#3a5a8a'), t, 1); R.icono('?', x0 + 7, y0 + 8, hex('#3a5a8a'), hex('#c8d4e6'), 1); }
  R.actor(EL.geologo2NX, gx, 170, t, { dir: -1, anda: v > 0 && v < 1, ...(v >= 1 && t < publicado + 1.4 ? { sostiene: [gx - 2, 154 + (Math.floor(t * 4) % 2)] } : {}), triste: v >= 1 });
};

// 8 · 2027 y un permiso por sellar
const p8 = (t) => {
  const o = { encuadre: 'calendario' };
  T.insertos(R, t, o);
  // los meses que pasan, uno a uno
  const m = Math.min(11, Math.floor(tramo(t, P8 + 0.2, siPermiso - 0.2) * 12)); { const x = 97 + (m % 4) * 25, y = 62 + Math.floor(m / 4) * 29; marco(x - 2, y - 2, x + 22, y + 26, ROJO, t, 1); }
  if (t > v2027 - 0.1 && t < v2027 + 1 && Math.floor(t * 6) % 2) marco(93, 35, 195, 58, AMBAR, t, 2);
  // el hueco del sello sigue vacío
  if (t > siPermiso) { aro(247, 108, 13, ROJO, t); if (Math.floor(t * 3) % 3) R.icono('?', 245, 104, ROJO, hex('#f0d8c8'), 1); }
  // la mano coge el sello y espera, tamborileando
  const ent = tramo(t, siPermiso - 0.5, siPermiso + 0.1);
  if (ent > 0) { const hx = 292 + Math.round((1 - ent) * 34), hy = 127 - Math.round((1 - ent) * 8) + (t > siPermiso + 0.2 && Math.floor(t * 7) % 3 === 0 ? 1 : 0); T.brazo(R, hx + 38, hy - 16, hx, hy, MANGA, -1, { codo: [hx + 24, hy - 2] }); }
  T.insertosDelante(R, t, o);
};

// 9 · la ladera, esperando
const p9 = (t) => {
  const o = { epoca: 2026, hora: 'tarde' };
  T.ladera(R, t, o);
  // el rebaño vuelve a casa por la terraza, con su perro
  const u = (t - P9) / (E.duracion - P9);
  for (let k = 0; k < 5; k++) oveja(Math.round(lerp(-30, 150, u)) + k * 14 + (k % 2) * 3, 160 + (k % 3) * 2, 1, t, k);
  { const x = Math.round(lerp(-52, 128, u)), y = 165, p = Math.sin(t * 10) > 0 ? 1 : 0, PE = hex('#3a3038'); R.rect(x - 4, y - 5, x + 4, y - 2, K); R.rect(x - 3, y - 4, x + 3, y - 3, PE); R.rect(x + 4, y - 7, x + 7, y - 4, K); R.rect(x + 5, y - 6, x + 6, y - 5, PE); R.pset(x + 5, y - 8, K); R.pset(x - 5, y - 6, K); R.pset(x - 3 - p, y - 1, K); R.pset(x + 3 + p, y - 1, K); R.pset(x + 6, y - 6, BLANCO); }
  T.laderaDelante(R, t, o);
  // cae la tarde
  T.tinte(R, 46, 179, [46, 30, 84], 0.26 * tramo(t, P9 + 0.6, E.duracion - 0.3));
};

const efectos = [[confirmado, 'sello'], [notas + 0.3, 'papel'], [notas + 1.34, 'papel'], [revista, 'toc'], [revista + 0.5, 'toc'], [mete + 0.2, 'papel'], [enviado, 'maquina'], [noLlegan + 0.2, 'tic'], [P4 + 0.3, 'bip'], [capas - 0.3, 'whoosh'], [que, 'pop'], [abierta, 'interruptor'], [dice + 0.1, 'papel'], [cortes, 'lapiz'], [publicado, 'pop'], [v2027, 'tic'], [siPermiso + 0.1, 'golpecito'], [P9 + 0.4, 'viento']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9]], { efectos, año: 2026 });
''')
