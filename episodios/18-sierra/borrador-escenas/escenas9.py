E = {}

# ayudas comunes a las tres escenas (cada escena es un .html suelto: se copian en cada cuerpo)
AY = r'''
const K = T.C.k, BL = hex('#ffffff');
const mez = (p, q, u) => { let r = 0; for (const s of [0, 8, 16]) { const ca = (p >>> s) & 255, cb = (q >>> s) & 255; r += Math.round(ca + (cb - ca) * u) * (1 << s); } return (0xff000000 + r) >>> 0; };
// resplandor: mezcla un disco con un color, en escalones con trama (pixel art), más fuerte en el centro
const luz = (cx, cy, r, col, a) => { cx = Math.round(cx); cy = Math.round(cy);
  for (let j = -r; j <= r; j++) for (let i = -r; i <= r; i++) { const d = Math.hypot(i, j) / r; if (d >= 1) continue; const x = cx + i, y = cy + j; if (x < 0 || y < 0 || x > 319 || y > 179) continue;
    const lv = a * (1 - d) ** 1.3 * 6; let l = Math.floor(lv); if (lv - l > (((x & 1) * 2 + (y & 1) * 3) % 4 + 0.5) / 4) l++; if (l <= 0) continue; R.pset(x, y, mez(R.pget(x, y), col, Math.min(0.85, l / 6))); } };
// el bocadillo redondeado con su rabito (x, y: la punta del rabito); devuelve el centro
const bocadillo = (x, y, w = 10, h = 18) => { x = Math.round(x); y = Math.round(y); const x0 = x - w, x1 = x + w, y1 = y - 4, y0 = y1 - h;
  R.rect(x0 + 1, y0, x1 - 1, y1, K); R.rect(x0, y0 + 1, x1, y1 - 1, K); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, BL); R.rect(x0 + 2, y1 - 1, x1 - 1, y1 - 1, hex('#d0d0dc'));
  for (let k = 0; k < 4; k++) { R.pset(x - 1 + (k >> 1), y1 + k, K); R.pset(x + (k >> 1), y1 + k, k < 3 ? BL : K); R.pset(x + 1 + (k >> 1), y1 + k, K); }
  return [x, Math.round((y0 + y1) / 2)]; };
const globo = (x, y, ic, col = K) => { const [cx, cy] = bocadillo(x, y); R.icono(ic, cx - 5, cy - 7, col, hex('#c8c8d0'), 2); };
// una estrellita de brillo (cruz de 5 px)
const chispa = (x, y, c = hex('#fff6c8')) => { x = Math.round(x); y = Math.round(y); R.pset(x, y, BL); for (const [i, j] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(x + i, y + j, c); R.pset(x + 2, y, hex('#e8c060')); R.pset(x - 2, y, hex('#e8c060')); R.pset(x, y + 2, hex('#e8c060')); R.pset(x, y - 2, hex('#e8c060')); };
// anillo de chispas que se abre (u 0–1)
const destello = (x, y, u, r0 = 4, r1 = 18, c = hex('#fff2b0')) => { if (u <= 0 || u >= 1) return; const r = r0 + (r1 - r0) * u;
  for (let k = 0; k < 16; k++) { if ((k + Math.floor(u * 5)) % 3 === 0) continue; const a = k / 16 * Math.PI * 2; R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.85), u < 0.6 ? c : hex('#e8c060')); } };
// ondas de voz (arcos) que salen de (x, y) hacia dir
const ondas = (x, y, dir, t, col = hex('#fff2b0')) => { for (let k = 0; k < 3; k++) { const r = 3 + ((t * 10 + k * 4) % 12); if (r > 14) continue;
  for (let a = -0.8; a <= 0.8; a += 0.12) { const px = Math.round(x + dir * Math.cos(a) * r), py = Math.round(y + Math.sin(a) * r * 1.2); R.pset(px, py, r > 10 ? mez(col, K, 0.4) : col); R.pset(px + dir, py, mez(col, K, 0.5)); } } };
'''

# ══════════════════════════════════════════════════════════════════════════════════════
E['si-gabriel'] = ('Gabriel', '''// SI-GABRIEL (frases 58–59), 1993. Tres planos:
// 1. «ciudad orleans general» de noche: la escritora entra por la izquierda con su cuaderno bajo las farolas de gas y se
//    para ante el escaparate de la librería; en «Gabrielle Knight» suena la campana de la torre (ondas); en «mystery»
//    le sale un «?» y se lleva el dedo a la barbilla. Al fondo pasa un vecino con su perro. Corta en «Jane».
// 2. «ciudad orleans, cámara librería»: junto a la puerta escribe en el cuaderno (el lápiz va y viene); en «and many
//    other worlds» del cuaderno salen tres mundos pequeños (un planeta con anillo, un castillo y una luna) que suben y
//    titilan; ella sonríe; la campanilla de la puerta se mece. Corta en «In».
// 3. «estudio cabina general»: el técnico enseña el CD tras el cristal en «CD version»; el actor de la bufanda entra
//    por la puerta y va al micro; en «Hollywood» se enciende la estrella dorada de la puerta; habla al micro (ondas) y en
//    «Tim Curry» el técnico y la escritora aplauden tras el cristal.''', AY + r'''
const g = (f) => en('gabriel', f), c = (f) => en('curry', f);
const P2 = g(0.578), P3 = c(0);
// un cuaderno de tapas rojas abierto (x, y: centro)
const cuaderno = (x, y, abierto = 1) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 5, y - 3, x + 5, y + 3, K); R.rect(x - 4, y - 2, x + 4, y + 2, hex('#b83a3a')); R.rect(x - 4, y - 2, x - 3, y + 2, hex('#e06a5a'));
  if (abierto) { R.rect(x - 4, y - 2, x + 4, y + 1, hex('#f2eee2')); R.pset(x, y - 2, hex('#c8c0b0')); R.pset(x, y - 1, hex('#c8c0b0')); R.pset(x, y, hex('#c8c0b0')); for (const dy of [-1, 1]) { R.pset(x - 3, y + dy - 0, hex('#7a8ac8')); R.pset(x - 2, y + dy, hex('#7a8ac8')); R.pset(x + 2, y + dy, hex('#7a8ac8')); R.pset(x + 3, y + dy, hex('#7a8ac8')); } } };
// los munditos que salen del cuaderno
const planeta = (x, y, t) => { x = Math.round(x); y = Math.round(y);
  for (let i = -13; i <= 13; i++) { const yy = y + Math.round(i * 0.3); if (i < -6 || i > 6) { R.pset(x + i, yy, hex('#e8c060')); R.pset(x + i, yy + 1, hex('#a8803a')); } }
  R.disco(x, y, 8, K); R.disco(x, y, 7, hex('#3a8ac8')); R.disco(x - 1, y - 1, 5, hex('#5ab0e8')); R.disco(x - 3, y - 3, 1, hex('#b8e8ff'));
  R.rect(x - 4, y + 1, x - 1, y + 3, hex('#5ab04a')); R.rect(x + 2, y - 4, x + 4, y - 2, hex('#5ab04a')); R.pset(x + 5, y + 2, hex('#2a5a8a')); R.pset(x + 4, y + 4, hex('#2a5a8a'));
  for (let i = -6; i <= 6; i++) { const yy = y + Math.round(i * 0.3) + 1; R.pset(x + i, yy + 2, i > 0 ? hex('#e8c060') : hex('#f0d890')); } };
const castillo = (x, y, t) => { x = Math.round(x); y = Math.round(y); const P = hex('#c8c0b0'), PS = hex('#8a8478'), TJ = hex('#3a5ab0');
  R.rect(x - 9, y - 4, x + 9, y + 7, K); R.rect(x - 8, y - 3, x + 8, y + 6, P); R.rect(x + 5, y - 3, x + 8, y + 6, PS);
  for (const dx of [-9, 5]) { R.rect(x + dx, y - 11, x + dx + 4, y - 3, K); R.rect(x + dx + 1, y - 10, x + dx + 3, y - 3, P); R.poligono([[x + dx - 1, y - 11], [x + dx + 5, y - 11], [x + dx + 2, y - 16]], TJ); R.pset(x + dx + 2, y - 7, K); }
  R.pset(x + 7, y - 17, hex('#e84a3a')); R.pset(x + 8, y - 17 + (Math.floor(t * 4) % 2), hex('#e84a3a')); R.linea(x + 7, y - 16, x + 7, y - 17, K);
  R.rect(x - 2, y + 1, x + 2, y + 6, K); R.rect(x - 1, y + 2, x + 1, y + 6, hex('#5a3a2a')); for (let i = -8; i <= 8; i += 3) R.pset(x + i, y - 4, K); };
const lunita = (x, y, t) => { x = Math.round(x); y = Math.round(y); R.disco(x, y, 8, K); R.disco(x, y, 7, hex('#f2e8b0')); R.disco(x + 4, y - 2, 6, hex('#1a1a3a')); R.pset(x - 4, y + 2, hex('#c8b870')); R.pset(x - 3, y - 3, hex('#c8b870')); R.pset(x - 5, y - 1, BL);
  if (Math.floor(t * 3) % 2) chispa(x + 10, y - 6, hex('#c8d8ff')); else chispa(x + 7, y + 7, hex('#c8d8ff')); };

// ── 1 · Nueva Orleans de noche: la escritora llega a la librería ──
const p1 = (t) => {
  const G = T.ciudad(R, t, { encuadre: 'orleans', luz: 'noche' }), S = G.suelo ?? 154;
  // el vecino con su perro, al fondo a la derecha, que cruza despacio hacia la izquierda
  { const u = tramo(t, 0, P2), vx = Math.round(lerp(330, 214, u));
    R.actor(EL.abuela, vx, S, t, { dir: -1, anda: u < 1 });
    const px = vx - 14, py = S, pa = Math.floor(t * 8) % 2;   // el perrito con su correa
    R.rect(px - 4, py - 5, px + 4, py - 2, K); R.rect(px - 3, py - 4, px + 3, py - 3, hex('#c8985a')); R.rect(px - 6, py - 7, px - 3, py - 4, K); R.rect(px - 5, py - 6, px - 4, py - 5, hex('#c8985a')); R.pset(px - 6, py - 6, K);
    R.pset(px + 5, py - 5 - pa, K); R.pset(px - 3, py - 1, K); R.pset(px - 2 + pa, py - 1, K); R.pset(px + 2, py - 1, K); R.pset(px + 3 - pa, py - 1, K);
    R.linea(px - 3, py - 6, vx + 2, S - 12, hex('#8a3a3a')); }
  // la escritora entra y se para ante el escaparate
  const u = tramo(t, 0.1, 2.5), ex = Math.round(lerp(-18, 128, 1 - (1 - u) ** 1.6)), piensa = t > g(0.447) && t < P2;
  const r = R.actor(EL.escritora, ex, S, t, { dir: 1, anda: u > 0 && u < 1, sostiene: piensa ? undefined : [ex + 16, S - 12], dedo: piensa, sonrisa: t > g(0.25) && !piensa });
  if (!piensa) cuaderno(r.mano[0] + 2, r.mano[1] + 1, 0);
  if (piensa) { const k = tramo(t, g(0.447), g(0.447) + 0.15); if (k >= 1) globo(ex + 8, S - 29, '?', hex('#3a5ab0')); }
  // la campana de la torre suena en «Gabrielle Knight»: ondas alrededor del campanario
  const ca = tramo(t, g(0.208), g(0.208) + 1.4); if (ca > 0 && ca < 1) for (let k = 0; k < 2; k++) { const v = (ca * 1.6 + k * 0.5) % 1, rr = 6 + v * 14;
    for (let a = 0; a < 6.28; a += 0.3) { const x = Math.round(203 + Math.cos(a) * rr), y = Math.round(22 + Math.sin(a) * rr * 0.6); if (y > 15 && x > 172 && x < 270) R.pset(x, y, mez(hex('#fff2b0'), hex('#2a2a4a'), v)); } }
};

// ── 2 · el escaparate de la librería: del cuaderno salen otros mundos ──
const p2 = (t) => {
  const sale = g(0.809), campana = tramo(t, c(0) - 1.2, c(0) - 0.2);
  const G = T.ciudad(R, t, { encuadre: 'orleans', camara: 'libreria', luz: 'noche', campana }), S = G.suelo ?? 164, ex = 200;
  const escribe = t < sale + 0.3, mira = t > sale;
  const r = R.actor(EL.escritora, ex, S, t, { dir: -1, sostiene: [ex - 3, S - 13], sonrisa: mira, sorpresa: t > sale && t < sale + 0.5 });
  const [mx, my] = r.mano; cuaderno(mx - 3, my, 1);
  // el lápiz que escribe en la página (va y viene)
  if (escribe) { const lx = mx - 6 + Math.round(Math.abs(Math.sin(t * 7)) * 5), ly = my - 1 - (Math.floor(t * 4) % 2); R.linea(lx, ly, lx + 3, ly - 5, hex('#e8c060')); R.pset(lx, ly, K); R.pset(lx + 3, ly - 5, hex('#f08a9a')); }
  // los tres mundos que salen del cuaderno y suben, cada uno con su destello
  const mundos = [[planeta, 120, 78, 0], [castillo, 156, 62, 0.22], [lunita, 194, 78, 0.44]];
  mundos.forEach(([f, x1, y1, d], k) => { const u = tramo(t, sale + d, sale + d + 1.0); if (u <= 0) return; const e = 1 - (1 - u) ** 2;
    const x = lerp(mx - 3, x1, e) + Math.sin(t * 2 + k) * 1.5, y = lerp(my - 6, y1, e) + Math.sin(t * 2.5 + k * 2) * 2;
    luz(x, y, 16, hex('#fff2b0'), 0.35); if (u < 1) { destello(x, y, u, 4, 16); for (let i = 1; i < 5; i++) R.pset(Math.round(lerp(mx - 3, x, i / 5)), Math.round(lerp(my - 6, y, i / 5)), hex('#fff2b0')); } f(x, y, t); });
};

// ── 3 · la cabina: el actor de Hollywood pone voz al héroe ──
const p3 = (t) => {
  const estrella = tramo(t, c(0.55), c(0.55) + 0.5);
  const G = T.estudio(R, t, { encuadre: 'cabina', estrella }), S = G.suelo ?? 158;
  const ts = (G.tecnico?.suelo ?? 110) - 5;
  // tras el cristal: el técnico enseña el CD y luego aplaude; la escritora mira y aplaude con él
  const aplaude = t > c(0.832), pal = aplaude && Math.floor(t * 8) % 2 === 0;
  const muestra = t > c(0.02) && t < c(0.4);
  const rt = R.actor(EL.tecnico, 204, ts, t, { dir: -1, sostiene: muestra ? [200, ts - 20] : undefined, brazos: pal, sonrisa: aplaude || muestra });
  if (muestra) { const [cx, cy] = rt.mano; R.disco(cx - 1, cy - 3, 5, K); R.disco(cx - 1, cy - 3, 4, hex('#c8ccd8')); R.pset(cx - 3, cy - 5, hex('#f07aa0')); R.pset(cx - 2, cy - 6, hex('#e8c060')); R.pset(cx, cy - 6, hex('#7ad0f0')); R.pset(cx + 1, cy - 5, hex('#a0f07a')); R.disco(cx - 1, cy - 3, 1, K); if (Math.floor(t * 4) % 2) chispa(cx + 4, cy - 8); }
  R.actor(EL.escritora, 232, ts, t, { dir: -1, brazos: aplaude && !pal, sonrisa: t > c(0.55) });
  T.i_estudioDelante(R, t, { encuadre: 'cabina' });
  // el actor entra por la puerta y va al micro; habla con ondas
  const u = tramo(t, c(0.1), c(0.45)), ax = Math.round(lerp(286, 120, u)), habla = t > c(0.6) && t < c(0.95);
  R.actor(EL.actor, ax, S, t, { dir: -1, anda: u > 0 && u < 1, habla: habla && Math.floor(t * 6) % 2 === 0, sonrisa: !habla && u >= 1 });
  if (t > c(0.6) && t < c(0.95)) ondas(ax - 1, S - 20, -1, t);
  if (estrella > 0 && estrella < 1) destello(295, 72, estrella, 3, 14);
};
const efectos = [[g(0.2), 'campana'], [g(0.81), 'brillo'], [P2 + 0.2, 'lapiz'], [c(0.05), 'brillo'], [c(0.12), 'puerta'], [c(0.55), 'brillo'], [c(0.84), 'palmada']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1993 });
''')

# ══════════════════════════════════════════════════════════════════════════════════════
E['si-retiro'] = ('Retiro', '''// SI-RETIRO (frases 60–61), 1999 → 2020. Tres planos:
// 1. «oficina mesa 1999»: Roberta en su mesa con el castillo en 3D en la pantalla; entra un compañero con una tarta con
//    una vela y, en «retired», ella sonríe y la vela brilla. Corta en «in».
// 2. «oficina general 1999» con banderines y globos (o.celebra): Roberta, con su caja de cosas, cruza hacia la puerta
//    mientras los compañeros la despiden; en «eight games» las ocho cajas con corona de la estantería se encienden una
//    tras otra; en la puerta se vuelve y dice adiós con la mano; nieve tras la cristalera. Corta en «But».
// 3. «hoy salón general» (2020): Ken y Roberta, mayores, en la mesa con sus portátiles y el puzle; un arcoíris de papel
//    en la ventana (la pandemia); en «Ken and Roberta» Ken le enseña su pantalla, se miran y sonríen, y en «together
//    again» sale un bocadillo con la lámpara de la cueva.''', AY + r'''
const a = (f) => en('ocho', f), b = (f) => en('pandemia', f);
const P2 = a(0.422), P3 = b(0);
const tarta = (x, y, t) => { x = Math.round(x); y = Math.round(y);
  R.rect(x - 10, y - 9, x + 10, y + 1, K); R.rect(x - 9, y - 8, x + 9, y, hex('#f2e0c8')); R.rect(x - 9, y - 4, x + 9, y - 3, hex('#c87a4a')); R.rect(x + 6, y - 8, x + 9, y, hex('#d8c4a8'));
  R.rect(x - 9, y - 8, x + 9, y - 7, hex('#f08aa0')); for (let i = -8; i <= 8; i += 3) R.pset(x + i, y - 6, hex('#f08aa0')); for (const i of [-6, -1, 4]) { R.pset(x + i, y - 9, hex('#e84a5a')); R.pset(x + i + 1, y - 9, hex('#c82a3a')); }
  R.rect(x - 12, y + 1, x + 12, y + 3, K); R.rect(x - 11, y + 1, x + 11, y + 2, hex('#d8d8e0')); R.rect(x - 11, y + 1, x + 11, y + 1, BL);
  R.rect(x - 1, y - 15, x, y - 10, K); R.pset(x, y - 14, hex('#7ab0e8')); R.pset(x, y - 12, hex('#7ab0e8')); R.pset(x - 1, y - 13, BL);
  const f = Math.floor(t * 9) % 2; R.rect(x - 1, y - 18, x + 1, y - 16, hex('#ffb040')); R.pset(x, y - 17, hex('#fff6c8')); R.pset(x - 1 + f, y - 19, hex('#ffd060')); R.pset(x, y - 20 + f, hex('#fff6c8')); };
const cajaMano = (x, y) => { x = Math.round(x); y = Math.round(y); R.rect(x - 6, y - 5, x + 6, y + 3, K); R.rect(x - 5, y - 4, x + 5, y + 2, hex('#c8a060')); R.rect(x - 5, y - 4, x + 5, y - 3, hex('#e0c080')); R.pset(x - 3, y - 6, hex('#3a8a3a')); R.pset(x - 2, y - 7, hex('#5ab04a')); R.pset(x + 2, y - 6, hex('#d84a3a')); R.rect(x + 1, y - 7, x + 3, y - 6, hex('#3a5ab0')); };
// la lámpara de latón de la cueva (pictograma para el bocadillo)
const lampara2 = (cx, cy, t) => { const L = hex('#d8a830'), LS = hex('#8a6420'), q = (x0, y0, x1, y1, c) => R.rect(cx + x0 * 2, cy + y0 * 2, cx + x1 * 2 + 1, cy + y1 * 2 + 1, c);
  q(-1, -7, 0, -6, K); q(-3, -5, 3, -5, K); q(-3, -4, 3, 3, K); q(-2, -4, 2, 2, hex('#fff2a0')); q(-1, -4, -1, 2, BL); q(0, -2 + (Math.floor(t * 6) % 2), 0, 0, hex('#e86a2a')); q(0, 1, 0, 1, hex('#ffb040'));
  q(-4, 3, 4, 4, K); q(-3, 3, 3, 3, L); q(-3, -4, -3, -4, L); q(3, -4, 3, -4, LS); q(2, 4, 3, 4, LS); };
const lampara = (cx, cy, t) => { const L = hex('#d8a830'), LS = hex('#8a6420');
  R.rect(cx - 1, cy - 7, cx + 1, cy - 6, K); R.rect(cx - 3, cy - 5, cx + 3, cy - 5, K); R.rect(cx - 3, cy - 4, cx + 3, cy + 3, K); R.rect(cx - 2, cy - 4, cx + 2, cy + 2, hex('#fff2a0')); R.pset(cx, cy - 1 - (Math.floor(t * 6) % 2), hex('#e86a2a')); R.pset(cx, cy, hex('#ffb040'));
  R.rect(cx - 4, cy + 3, cx + 4, cy + 4, K); R.rect(cx - 3, cy + 3, cx + 3, cy + 3, L); R.pset(cx - 3, cy - 4, L); R.pset(cx + 3, cy - 4, LS); };

// ── 1 · la mesa de Roberta en 1999: la tarta de despedida ──
const p1 = (t) => {
  const G = T.oficina(R, t, { epoca: 1999, camara: 'mesa' }), S = G.suelo ?? 154;
  const llega = tramo(t, 0.9, a(0.33)), cx = Math.round(lerp(338, 236, 1 - (1 - llega) ** 1.5)), ret = a(0.359);
  const rr = R.actor(EL.roberta, 92, S, t, { dir: t > ret - 0.4 ? 1 : 1, sostiene: t < ret - 0.5 ? [112, S - 8] : undefined, sonrisa: t > ret - 0.2, sorpresa: t > ret - 0.6 && t < ret - 0.2 });
  const rc = R.actor(EL.dibujante, cx, S, t, { dir: -1, anda: llega > 0 && llega < 1, sostiene: [cx - 4, S - 14], sonrisa: true });
  tarta(rc.mano[0] - 6, rc.mano[1] + 1, t);
  luz(rc.mano[0] - 6, rc.mano[1] - 16, 10, hex('#ffd890'), t > ret ? 0.5 : 0.25); if (t > ret) destello(rc.mano[0] - 6, rc.mano[1] - 16, tramo(t, ret, ret + 0.6), 3, 16);
  if (t > ret + 0.1) globo(108, S - 28, '!', hex('#c8303a'));
  T.d_oficinaDelante(R, t, { epoca: 1999, tecla: t < ret - 0.6 });
};

// ── 2 · la oficina de 1999 de fiesta: Roberta se despide; las ocho cajas se encienden ──
const p2 = (t) => {
  const G = T.oficina(R, t, { epoca: 1999, celebra: 1 }), S = G.suelo ?? 164;
  // las ocho cajas con corona se encienden una tras otra hasta «eight games»
  for (let i = 0; i < 8; i++) { const ti = lerp(a(0.683), a(0.89), i / 7), u = tramo(t, ti, ti + 0.35); if (u <= 0) continue; const x = 171 + 12 * i + 5, y = 93;
    luz(x, y, 10, hex('#fff2a0'), u < 1 ? 0.55 : 0.25); if (u < 1) destello(x, y, u, 4, 14); else if (Math.floor(t * 3 + i) % 4 === 0) chispa(x + 4, y - 9);
    const bo = u < 1 ? Math.round(Math.sin(u * Math.PI) * 2) : 0; R.rect(x - 6, y - 11 - bo, x + 6, y - 11 - bo, hex('#fff6c8')); R.rect(x - 6, y + 11, x + 6, y + 11, hex('#fff6c8')); }
  { const u8 = tramo(t, a(0.876), a(0.876) + 0.35); if (u8 > 0) { const yy = Math.round(lerp(80, 62, u8)); luz(219, yy - 8, 16, hex('#fff2a0'), 0.45); R.rect(207, yy - 20, 231, yy + 3, K); R.rect(208, yy - 19, 230, yy + 2, hex('#3a2418')); R.rect(208, yy - 19, 230, yy - 19, hex('#e8c060')); for (const [cy, r] of [[yy - 14, 4], [yy - 5, 5]]) { R.disco(219, cy, r + 1, K); R.disco(219, cy, r, hex('#f0c040')); R.disco(219, cy, r - 2, hex('#3a2418')); R.pset(219 - r + 1, cy - 1, hex('#fff2b0')); R.pset(219 - r + 1, cy, hex('#fff2b0')); } if (u8 < 1) destello(219, yy - 8, u8, 6, 22); } }
  // los compañeros despiden (agitan la mano)
  const adios = (k) => Math.floor(t * 4 + k) % 2 === 0;
  R.actor(EL.dibujante2, 118, S, t, { dir: 1, dedo: t > a(0.5) && adios(0), sonrisa: true });
  R.actor(EL.tecnico, 142, S, t, { dir: 1, dedo: t > a(0.6) && adios(1), sonrisa: true });
  // Roberta cruza con su caja hacia la puerta, se vuelve y dice adiós
  const u = tramo(t, P2 + 0.2, a(0.83)), rx = Math.round(lerp(168, 282, u)), vuelta = t > a(0.86);
  const r = R.actor(EL.roberta, rx, S, t, { dir: vuelta ? -1 : 1, anda: u > 0 && u < 1, sostiene: vuelta ? undefined : [rx + 14, S - 11], dedo: vuelta && Math.floor(t * 4) % 2 === 0, sonrisa: true });
  if (!vuelta) cajaMano(r.mano[0] + 1, r.mano[1]);
  else cajaMano(rx - 6, S - 3);
};

// ── 3 · hoy: el salón de Ken y Roberta en la pandemia ──
const p3 = (t) => {
  const G = T.hoy(R, t, { encuadre: 'salon', camara: 'general' }), S = G.suelo ?? 152;
  // un arcoíris de papel pegado en el ventanal (la pandemia)
  { const x0 = 22, y0 = 64; R.rect(x0 - 1, y0 - 1, x0 + 22, y0 + 13, hex('#a8a090')); R.rect(x0, y0, x0 + 21, y0 + 12, hex('#f8f4e8'));
    const cols = ['#e84a3a', '#f0a030', '#f0d840', '#5ab04a', '#3a8ae8', '#8a5ad8'];
    cols.forEach((cl, k) => { const r = 9 - k; for (let a2 = Math.PI; a2 <= 2 * Math.PI + 0.01; a2 += 0.12) R.pset(Math.round(x0 + 11 + Math.cos(a2) * r), Math.round(y0 + 11 + Math.sin(a2) * r * 0.95), hex(cl)); });
    R.pset(x0 + 1, y0 - 1, hex('#d8c870')); R.pset(x0 + 20, y0 - 1, hex('#d8c870'));
    const br = tramo(t, b(0.445), b(0.445) + 0.6); if (br > 0 && br < 1) destello(x0 + 11, y0 + 6, br, 3, 14); }
  const ense = t > b(0.623), mira = t > b(0.66), junt = t > b(0.755);
  R.actor(EL.robertaMayor, 148, S, t, { dir: 1, sostiene: !mira ? [160, S - 9] : undefined, sonrisa: junt, sorpresa: mira && !junt });
  R.actor(EL.kenMayor, ense ? 186 : 192, S, t, { dir: ense ? -1 : 1, sostiene: !ense ? [208, S - 9] : undefined, dedo: ense && !junt, sonrisa: junt });
  T.j_hoyDelante(R, t, { encuadre: 'salon', camara: 'general' });
  if (t > b(0.83)) { const u = tramo(t, b(0.83), b(0.83) + 0.2); const [cx, cy] = bocadillo(170, S - 28, Math.max(1, Math.round(15 * u)), Math.max(1, Math.round(26 * u))); if (u >= 1) { luz(cx, cy, 10, hex('#fff2a0'), 0.4); lampara2(cx - 1, cy + 1, t); } }
};
const efectos = [[0.4, 'tecleo'], [a(0.33), 'pop'], [a(0.36), 'brillo'], [P2 + 0.3, 'palmada'], [a(0.89), 'brillo'], [P3 + 0.4, 'tecleo'], [b(0.445), 'papel'], [b(0.84), 'pop']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P3 ? 1999 : 2020) });
''')

# ══════════════════════════════════════════════════════════════════════════════════════
E['si-cueva'] = ('Cueva', '''// SI-CUEVA (frases 62–63), 2023. Tres planos:
// 1. «hoy cueva 3d general»: el disquete con ojos entra en la cueva de polígonos con las gafas de RV en la mano; en
//    «choose?» se para con un «?»; en «Colossal Cave» la lámpara de latón se enciende y la cueva se ilumina; se pone las
//    gafas (o.gafas) y en «hooked» da un salto de asombro con un «!» (gag 8). Corta en «hooked».
// 2. «hoy cueva 3d, cámara mapa» (la vista por las gafas): en las lentes, primero la aventura de texto de 1979 (renglones
//    verdes, el cursor y el «1979»); en «Now in 3D» un barrido de luz la convierte en la cueva en 3D; en «virtual
//    reality» las luciérnagas se acercan flotando y un murciélago cruza. Corta en «Roberta».
// 3. «hoy salón, cámara mesa»: Roberta dibuja la cueva en la tableta y Ken la programa (la cueva gira en su monitor); en
//    «forty years earlier» se ilumina la foto de 1979 de la pared; en «home» se miran y sonríen. El disquete, con las
//    gafas en la frente, saluda desde la mesa.''', AY + r'''
const a = (f) => en('cueva3d', f), b = (f) => en('mesa', f);
const P2 = a(0.471), P3 = b(0);

// ── 1 · la cueva en 3D: el disquete se pone las gafas (gag 8) ──
const p1 = (t) => {
  const G = T.hoy(R, t, { encuadre: 'cueva', estilo: '3d', camara: 'general' }), S = G.suelo ?? 156;
  // la lámpara se enciende en «Colossal Cave»
  const enc = tramo(t, a(0.2), a(0.2) + 0.6); if (enc > 0) { luz(96, 126, 34, hex('#fff2a0'), 0.35 * enc); if (enc < 1) destello(96, 126, enc, 4, 26); }
  const u = tramo(t, 0.1, a(0.04)), dx = Math.round(lerp(306, 200, 1 - (1 - u) ** 1.5));
  const pone = tramo(t, a(0.31), a(0.31) + 0.7), asombro = t > a(0.42);
  const sal = asombro ? Math.round(Math.abs(Math.sin((t - a(0.42)) * 9)) * 4 * (1 - tramo(t, a(0.42) + 0.6, a(0.42) + 0.9))) : 0;
  const d = T.disquete(R, dx, S, t, { s: 1.5, dir: -1, corre: u > 0 && u < 1 ? 0.3 : 0, gafas: pone, expresion: asombro ? 'feliz' : t > a(0.2) ? 'normal' : 'susto', salto: sal });
  if (pone <= 0) T.gafasRV(R, d.mano[0] - 2, d.mano[1] + 4, t, { s: 1 });
  if (t > a(0.057) && t < a(0.2)) globo(dx, S - 30, '?', hex('#3a5ab0'));
  if (asombro) { globo(dx + 1, S - 32 - sal, '!', hex('#c8303a')); chispa(dx - 14, S - 30 + Math.round(Math.sin(t * 5) * 2)); chispa(dx + 14, S - 22 - Math.round(Math.sin(t * 5) * 2)); }
  T.j_hoyDelante(R, t, { encuadre: 'cueva', estilo: '3d', camara: 'general' });
};

// ── 2 · por las gafas: el texto de 1979 se vuelve cueva en 3D ──
const LENTES = [[98, 92], [222, 92]];
const dentro = (x, y) => LENTES.some(([cx, cy]) => ((x - cx) / 62) ** 2 + ((y - cy) / 66) ** 2 < 1);
const p2 = (t) => {
  T.hoy(R, t, { encuadre: 'cueva', estilo: '3d', camara: 'mapa' });
  const barr = tramo(t, a(0.734), a(0.734) + 0.7);   // el barrido de «Now in 3D»
  const corte = Math.round(lerp(20, 165, barr));
  if (barr < 1) {
    // la pantalla negra de la aventura de texto, recortada a cada lente, de corte hacia abajo
    for (const [cx, cy] of LENTES) {
      for (let y = Math.max(corte, cy - 66); y <= cy + 66; y++) { const w = Math.floor(62 * Math.sqrt(Math.max(0, 1 - ((y - cy) / 66) ** 2))); for (let x = cx - w; x <= cx + w; x++) R.pset(x, y, ((x + y) & 3) === 0 ? hex('#0e1a12') : hex('#08100a')); }
      // renglones verdes que se escriben (sin letras: trazos), el «1979» y el cursor
      const escritos = Math.min(5, Math.floor((t - P2) * 3) + 1), G1 = hex('#5ae86a'), G2 = hex('#2ab04a');
      for (let k = 0; k < escritos; k++) { const y = cy - 44 + k * 11; if (y < corte) continue; const L = [52, 36, 58, 30, 44][k], x0 = cx - 40, n = k === escritos - 1 ? Math.min(L, Math.floor(((t - P2) * 3 - k) * L)) : L;
        R.linea(x0, y - 2, x0 + 2, y, G1); R.linea(x0 + 2, y, x0, y + 2, G1);   // el «>» del indicador
        for (let i = 0; i < n; i++) { const pal = Math.floor((i * 5 + k * 7) / 6) % 5; if ((i % 6) === 5 || pal === 4 && i % 6 > 2) continue; R.rect(x0 + 6 + i, y - 2, x0 + 6 + i, y + 2, (i + k) % 3 ? G1 : G2); if (i % 2) R.pset(x0 + 6 + i, y - 2 + (i % 5), hex('#08100a')); } }
      const ky = cy - 44 + escritos * 11; if (ky >= corte && Math.floor(t * 3) % 2) R.rect(cx - 34, ky - 2, cx - 31, ky + 2, G1);
      if (t > a(0.545) && cy + 30 >= corte) { luz(cx, cy + 22, 22, hex('#5ae86a'), 0.25); R.numero('1979', cx, cy + 30, { tam: 16, centro: true, rampa: [hex('#e8ffe8'), hex('#b8ffc0'), G1, G1, G2] }); }
    }
    // la raya de luz del barrido
    if (barr > 0) for (const [cx, cy] of LENTES) for (let x = cx - 62; x <= cx + 62; x++) for (const dy of [0, 1]) if (dentro(x, corte + dy)) R.pset(x, corte + dy, dy ? hex('#7af0ff') : BL);
  }
  // en «virtual reality»: las luciérnagas se acercan y un murciélago cruza
  const vr = tramo(t, a(0.879), a(0.879) + 1.2);
  if (vr > 0) { for (let k = 0; k < 7; k++) { const ph = k * 0.9, s = 1 + vr * 2, ox = Math.sin(t * 1.3 + ph) * (20 + vr * 14), oy = Math.cos(t * 1.1 + ph * 1.3) * 18 - vr * 6;
      for (const [cx, cy] of LENTES) { const x = cx + ox + (cx > 150 ? -4 : 4), y = cy + oy; if (!dentro(x, y)) continue; luz(x, y, Math.round(3 + s * 2), hex('#c8ff7a'), 0.5); R.disco(Math.round(x), Math.round(y), Math.round(s * 0.6), hex('#f0ffb0')); } }
    const mx = lerp(10, 300, tramo(t, a(0.879) + 0.2, a(0.879) + 1.0)), my = 60 + Math.sin(t * 6) * 4, ala = Math.sin(t * 18) > 0;
    if (dentro(mx, my)) { R.rect(Math.round(mx) - 1, Math.round(my) - 1, Math.round(mx) + 1, Math.round(my) + 1, hex('#2a1a3a')); for (const s2 of [-1, 1]) { R.linea(Math.round(mx), Math.round(my), Math.round(mx + s2 * 6), Math.round(my + (ala ? -4 : 2)), hex('#2a1a3a')); R.linea(Math.round(mx + s2 * 6), Math.round(my + (ala ? -4 : 2)), Math.round(mx + s2 * 9), Math.round(my + (ala ? -1 : 4)), hex('#2a1a3a')); } } }
};

// ── 3 · el salón de cerca: Roberta dibuja y Ken programa, como en 1979 ──
const p3 = (t) => {
  const dib = tramo(t, P3, b(0.6)), ren = tramo(t, b(0.234), b(0.7));
  const op = { encuadre: 'salon', camara: 'mesa', dibujo: dib, render: ren };
  const G = T.hoy(R, t, op), S = G.suelo ?? 137;
  // la foto de 1979 se ilumina en «forty years earlier»
  const fo = tramo(t, b(0.655), b(0.655) + 0.8);
  if (fo > 0) { luz(160, 42, 40, hex('#fff2c8'), 0.45 * Math.min(1, fo * 2)); if (fo < 1) destello(160, 42, fo, 14, 44); const k = Math.floor(t * 4) % 4; chispa([130, 190, 190, 130][k], [18, 18, 68, 68][k]); chispa([190, 130, 130, 190][k], [68, 68, 18, 18][k]);
    for (let x = 129; x <= 191; x++) { R.pset(x, 15, hex('#fff2a0')); R.pset(x, 70, hex('#fff2a0')); } for (let y = 15; y <= 70; y++) { R.pset(129, y, hex('#fff2a0')); R.pset(191, y, hex('#fff2a0')); } }
  const casa = t > b(0.86);
  const D0 = T.j_hoyDelante(R, t, op);   // primera pasada solo para saber dónde está el lápiz
  const lap = D0.lapiz ?? [124, 146];
  R.actor(EL.robertaMayor, 128, S, t, { dir: 1, sostiene: casa ? undefined : lap, sonrisa: casa || dib > 0.6 });
  R.actor(EL.kenMayor, 196, S, t, { dir: casa ? -1 : 1, sostiene: casa ? undefined : [200 + Math.round(Math.abs(Math.sin(t * 9)) * 6), 146], sonrisa: casa });
  T.j_hoyDelante(R, t, op);
  // el disquete con las gafas en la frente saluda desde la mesa (al final)
  const dq = tramo(t, b(0.4), b(0.6));
  const dd = T.disquete(R, 292, 136, t, { s: 1, dir: -1, gafas: 0, expresion: 'feliz', saluda: t > b(0.86) ? 'mano' : undefined, salto: t > b(0.86) && t < b(0.86) + 0.5 ? 2 : 0 });
  T.gafasRV(R, 292, 136 - 19 - (t > b(0.86) && t < b(0.86) + 0.5 ? 2 : 0) - 1, t, { s: 1, puestas: true, brillo: tramo(t, b(0.88), b(0.88) + 0.6) });
};
const efectos = [[a(0.06), 'pop'], [a(0.2), 'brillo'], [a(0.32), 'whoosh'], [a(0.43), 'boing'], [P2 + 0.2, 'tecleo'], [a(0.734), 'whoosh'], [a(0.88), 'brillo'],
  [b(0.08), 'lapiz'], [b(0.27), 'tecleo'], [b(0.66), 'brillo']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 2023 });
''')
