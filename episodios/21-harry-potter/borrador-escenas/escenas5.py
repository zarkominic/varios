E = {}
E['hp-banquete'] = ('El banquete', '''// HP-BANQUETE (frase 17), 1991, sin cartela. Cuatro planos:
// 1. el Gran Comedor desde la puerta: en «feast» chispea la comida de las mesas; McGonagall sube al estrado con el sombrero,
//    lo deja en el taburete en «hat» y desenrolla la lista en «names»; Hermione, la primera de la fila, echa a andar;
//    corta en «sings»;
// 2. la mesa de los profesores de cerca: el sombrero canta en el taburete (notas que suben) y la snitch se tapa los oídos
//    (gag 4); en «done» calla y los de primero aplauden; Dumbledore se levanta en «stands», sonríe en «smiles» y abre los
//    brazos en «says»; Snape frunce el ceño; corta antes de «Nitwit»;
// 3. (fondo local) desde la mesa de Gryffindor: los cuatro globos sin letras salen de Dumbledore, uno en cada palabra
//    (Nitwit, Blubber, Oddment, Tweak); Ron se queda con el muslo en el aire, Hermione con un «?», el sapo de Neville salta
//    a la mesa; en «sits» Dumbledore se sienta y los globos se van;
// 4. lo alto de la torre de noche, «as if nothing had happened»: Harry sale a mirar por el telescopio, Ron bosteza en el
//    banco; una lechuza cruza delante de la luna.''', r'''
const s = (f) => en('sombrero', f);
const P2 = s(0.219), P3 = s(0.602), P4 = s(0.878);
const FEAST = s(0.035), HAT = s(0.107), NAMES = s(0.153), SINGS = s(0.227), DONE = s(0.361), STANDS = s(0.409), SMILES = s(0.451), SAYS = s(0.493);
const W = [s(0.646), s(0.698), s(0.749), s(0.803)], SITS = s(0.853);
const PZ = T.PIEZAS_HP;
const H = (a, b, k) => { let n = (a * 374761393 + b * 668265263 + k * 1442695041) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], bay = (x, y) => (B4[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const mez = (c, d, a) => { const ch = (k) => Math.round(((c >>> k) & 255) * (1 - a) + ((d >>> k) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };
const tine = (x, y, c, a) => { const p = R.pget(x, y); if (p) R.pset(x, y, mez(p, c, a)); };
const K = hex('#1a1424'), ORO = hex('#f0c040'), OROS = hex('#a87a20'), CREMA = hex('#fff4d8');
// la nota musical (♪) con su sombra
const nota = (x, y, c) => { x = Math.round(x); y = Math.round(y); for (const [d, col] of [[1, K], [0, c]]) { R.rect(x + d, y + d - 1, x + d + 2, y + d + 1, col); R.rect(x + d + 2, y + d - 7, x + d + 2, y + d, col); R.rect(x + d + 3, y + d - 7, x + d + 4, y + d - 6, col); R.pset(x + d + 5, y + d - 5, col); } };
// la Z del sueño (símbolo)
const zeta = (x, y, c, e = 1) => { x = Math.round(x); y = Math.round(y); for (const [d, col] of [[1, K], [0, c]]) { R.rect(x + d, y + d, x + d + 3 * e, y + d + e - 1, col); R.rect(x + d + 2 * e, y + d + e, x + d + 3 * e - 1, y + d + 2 * e - 1, col); R.rect(x + d + e, y + d + 2 * e, x + d + 2 * e - 1, y + d + 3 * e - 1, col); R.rect(x + d, y + d + 3 * e, x + d + 3 * e, y + d + 4 * e - 1, col); } };
// el destello de cuatro puntas
const chispa = (x, y, r, c) => { x = Math.round(x); y = Math.round(y); R.linea(x - r, y, x + r, y, c); R.linea(x, y - r, x, y + r, c); R.pset(x, y, CREMA); };
// el globo de palabras SIN letras: cada uno con su símbolo (!, estrella, espiral, ?); (x, y) = la punta de la cola
const globo = (x, y, u, k, t) => {
  if (u <= 0) return; const e = Math.min(1, u * 2.2), w = Math.round(4 + 10 * e), h = Math.round(4 + 8 * e), cx = x + (k % 2 ? 10 : -10), cy = y - 8 - h;
  R.poligono([[x, y], [cx - 4, cy + h - 2], [cx + 4, cy + h - 2]], K); R.disco(cx, cy, 0, K);
  R.rect(cx - w - 1, cy - h, cx + w + 1, cy + h, K); R.rect(cx - w, cy - h - 1, cx + w, cy + h + 1, K);
  R.rect(cx - w, cy - h + 1, cx + w, cy + h - 1, CREMA); R.rect(cx - w + 1, cy - h, cx + w - 1, cy + h, CREMA);
  R.poligono([[x + 1, y - 2], [cx - 2, cy + h - 1], [cx + 2, cy + h - 1]], CREMA);
  R.rect(cx - w + 1, cy + h - 1, cx + w - 1, cy + h, hex('#d8c8a8'));
  if (e < 1) return;
  const col = [hex('#d83a3a'), hex('#e8a020'), hex('#7a3aa8'), hex('#2a6ad8')][k];
  if (k === 0) R.icono('!', cx - 4, cy - 7, col, K, 2);
  else if (k === 3) R.icono('?', cx - 4, cy - 7, col, K, 2);
  else if (k === 1) { const p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5 + Math.sin(t * 3) * 0.1, r = i % 2 ? 3 : 7; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } R.poligono(p, col); R.pset(cx - 1, cy - 2, CREMA); }
  else { for (let a = 0; a < 15; a += 0.12) { const r = a * 0.5; R.rect(Math.round(cx + Math.cos(a + t * 4) * r), Math.round(cy + Math.sin(a + t * 4) * r), Math.round(cx + Math.cos(a + t * 4) * r), Math.round(cy + Math.sin(a + t * 4) * r) + 1, col); } }
};

// 1 · el Gran Comedor desde la puerta
const p1 = (t) => {
  T.hogwarts(R, t, { encuadre: 'comedor', lleno: 0.9 });
  // la comida aparece en las mesas: chispas sobre las fuentes en «feast»
  const f = tramo(t, FEAST - 0.1, FEAST + 0.9);
  if (f > 0 && f < 1) for (let i = 0; i < 16; i++) { const m = i % 4, k = Math.floor(i / 4), x = [44, 112, 208, 276][m] + (m < 2 ? 14 : -14) * k * 0.4 + (m < 2 ? 1 : -1) * k * 6, y = 168 - k * 16; const r = Math.round(3 * Math.sin(Math.PI * tramo(f, i * 0.03, i * 0.03 + 0.5))); if (r > 0) chispa(x, y, r, hex('#fff0a0')); }
  // la fila de los de primero en el pasillo, mirando al estrado
  const her = tramo(t, NAMES + 0.25, P2 + 0.2);
  R.actor(EL.hermione, Math.round(lerp(152, 156, her)), Math.round(lerp(165, 150, her)), t, { dir: 1, anda: her > 0 && her < 1, sonrisa: her > 0 });
  R.actor(EL.neville, 166, 169, t, { dir: -1, sorpresa: t > NAMES && t < NAMES + 0.8 });
  R.actor(EL.ron, 140, 172, t, { dir: 1, habla: t > HAT + 0.3 && t < NAMES && Math.sin(t * 9) > 0 });
  R.actor(EL.harry, 158, 177, t, { dir: -1, sonrisa: t > FEAST + 0.2 });
  // McGonagall sube al estrado con el sombrero, lo deja en el taburete y desenrolla la lista
  const v = tramo(t, 0.3, HAT - 0.15), mx = Math.round(lerp(100, 136, v)), deja = tramo(t, HAT - 0.15, HAT + 0.25);
  const mc = R.actor(EL.mcgonagall, mx, 110, t, { dir: 1, anda: v > 0 && v < 1, sostiene: t < NAMES ? [mx + 19, 98] : [mx + 18, 96], sonrisa: false });
  const hx = deja < 1 ? lerp(mc.mano[0] + 3, 160, deja) : 160, hy = deja < 1 ? lerp(mc.mano[1] + 6, 106, deja) : 106;
  if (t > NAMES) { R.rect(mc.mano[0] - 2, mc.mano[1] - 2, mc.mano[0] + 2, mc.mano[1] + 9, hex('#c8b070')); R.rect(mc.mano[0] - 1, mc.mano[1] - 1, mc.mano[0] + 1, mc.mano[1] + 8, hex('#f0dca0')); for (let j = 1; j < 8; j += 2) R.pset(mc.mano[0], mc.mano[1] + j, hex('#8a7a5a')); }
  PZ.sombrero(R, hx, hy, { t, canta: t > NAMES });
};

// 2 · la mesa de los profesores: el sombrero canta y la snitch se tapa los oídos
const p2 = (t) => {
  const o = { encuadre: 'comedor', camara: 'mesa' };
  T.hogwarts(R, t, o);
  const tiembla = Math.floor(t * 6) % 2;
  R.actor(EL.quirrell, 45 + tiembla, 147, t, { dir: 1, sorpresa: t > SAYS && t < SAYS + 1.2 });
  R.actor(EL.snape, 93, 147, t, { dir: 1, enfado: true });
  const up = tramo(t, STANDS, STANDS + 0.45);
  R.actor(EL.dumbledore, 153, Math.round(lerp(152, 141, up)), t, { dir: 1, sonrisa: t > SMILES, brazos: t > SAYS, habla: t > SAYS && Math.sin(t * 10) > 0.3 });
  R.actor(EL.flitwick, 213, 147, t, { dir: -1, sonrisa: true, dedo: t > DONE && t < DONE + 0.9 });
  R.actor(EL.hagrid, 261, 148, t, { dir: -1, sonrisa: true, brazos: t > DONE && t < DONE + 0.9 && Math.floor(t * 7) % 2 });
  T.hogwartsDelante(R, t, o);
  // los de primero, delante de la mesa: escuchan y aplauden cuando acaba
  const aplaude = t > DONE + 0.05 && t < DONE + 0.95, pal = (k) => aplaude && Math.floor(t * 8 + k) % 2 === 0;
  R.actor(EL.harry, 46, 176, t, { dir: 1, brazos: pal(0), sonrisa: aplaude || t > STANDS });
  R.actor(EL.ron, 64, 177, t, { dir: 1, brazos: pal(1), sorpresa: t > STANDS && t < STANDS + 0.8 });
  R.actor(EL.hermione, 82, 176, t, { dir: 1, brazos: pal(0), sonrisa: true });
  R.actor(EL.neville, 238, 177, t, { dir: -1, brazos: pal(1), sorpresa: t < DONE });
  R.actor(EL.alumna, 256, 176, t, { dir: -1, brazos: pal(0) });
  R.actor(EL.alumno, 274, 177, t, { dir: -1, brazos: pal(1), sonrisa: aplaude });
  // McGonagall, de pie junto al taburete con la lista
  const mc = R.actor(EL.mcgonagall, 118, 177, t, { dir: 1, sostiene: [136, 160] });
  R.rect(mc.mano[0] - 2, mc.mano[1] - 3, mc.mano[0] + 2, mc.mano[1] + 9, hex('#c8b070')); R.rect(mc.mano[0] - 1, mc.mano[1] - 2, mc.mano[0] + 1, mc.mano[1] + 8, hex('#f0dca0'));
  // el sombrero en el taburete: canta hasta «done»
  const canta = t < DONE;
  PZ.sombrero(R, 160, 165, { t, canta, s: 1 });
  if (canta) for (let i = 0; i < 4; i++) { const u = ((t - P2) * 0.55 + i * 0.25) % 1; if (t - P2 > i * 0.4) nota(156 + Math.sin(u * 7 + i) * 14 + (i % 2 ? 10 : -14) * u, 150 - u * 46, [ORO, hex('#f0a0b0'), hex('#8ad07a'), hex('#b8e0f0')][i]); }
  // la snitch entra, se tapa los oídos mientras canta y se alegra cuando calla; luego se va hacia arriba
  const llega = tramo(t, SINGS + 0.15, SINGS + 0.75), va = tramo(t, SAYS + 0.2, P3 - 0.2);
  const sx = lerp(330, 206, llega) - lerp(0, 150, va), sy = lerp(110, 140, llega) - lerp(0, 56, va);
  T.snitch(R, Math.round(sx), Math.round(sy), t, { s: 2, cara: llega >= 1 && canta ? 'tapaOidos' : t > DONE ? 'feliz' : 'normal', vuela: canta ? 0.25 : 1 });
};

// 3 · fondo local: el comedor visto desde la mesa de Gryffindor
const cache = {};
const capa = (clave, pinta, encima = false) => { if (!cache[clave]) { const b = R.nuevo(), prev = R.usar(b); pinta(); R.usar(prev); cache[clave] = b; }
  if (!encima) { R.copiar(cache[clave]); return; } const B = R.buf, b = cache[clave]; for (let i = 0; i < b.length; i++) if (b[i]) B[i] = b[i]; };
const VENT = [[16, 40, 50, 96], [270, 294, 52, 96]];
const pintaFondo = () => {
  const { rect, pset, linea, disco, poligono } = R;
  for (let y = 0; y < 34; y++) for (let x = 0; x < 320; x++) { const u = y / 40 + (H(x >> 3, y >> 2, 1) - 0.5) * 0.2; pset(x, y, u > bay(x, y) ? hex('#232c58') : hex('#161c40')); }
  for (let x = 0; x < 270; x++) { const yc = 30 - x * 0.07; for (let y = Math.round(yc - 6); y <= Math.round(yc + 6); y++) if (y >= 0 && y < 34 && H(x, y, 2) < 0.4 * (1 - Math.abs(y - yc) / 6)) pset(x, y, H(x, y, 3) < 0.3 ? hex('#4a5490') : hex('#323c70')); }
  for (let i = 0; i < 80; i++) { const x = Math.floor(H(i, 3, 4) * 320), y = Math.floor(H(i, 4, 4) * 33); if ((x > 262 && y < 46) || (x > 14 && x < 176 && y < 16)) continue; pset(x, y, H(i, 5, 4) < 0.3 ? hex('#fff4c8') : hex('#8a9ad0')); }
  // la cornisa con dentículos
  rect(0, 34, 319, 41, hex('#5a5878')); rect(0, 34, 319, 34, hex('#9a98b8')); rect(0, 35, 319, 35, hex('#7a7898')); rect(0, 41, 319, 41, hex('#24223a'));
  for (let x = 1; x < 320; x += 6) { rect(x, 37, x + 2, 39, hex('#3a3858')); pset(x, 37, hex('#6a6888')); }
  // el muro de sillares, con la luz cálida de las velas en el centro
  for (let y = 42; y < 100; y++) { const fila = Math.floor((y - 42) / 8); for (let x = 0; x < 320; x++) {
    const xo = x + (fila & 1) * 9, j = (y - 42) % 8 === 7 || xo % 18 === 0, q = H(Math.floor(xo / 18), fila, 7), r = H(x, y, 8);
    let c = j ? hex('#2e2c40') : q < 0.25 ? hex('#4e4c66') : q > 0.8 ? hex('#6a6884') : hex('#5c5a76');
    if (!j && (y - 42) % 8 === 0) c = hex('#76748f'); if (!j && r < 0.05) c = hex('#46445e'); if (j && r > 0.93) c = hex('#3a5a3a');
    const d = Math.hypot((x - 160) * 0.8, y - 70), a = Math.max(0, 0.32 - d / 300); if (a > bay(x, y) * 0.5) c = mez(c, hex('#d8a060'), a);
    pset(x, y, c); } }
  // dos ventanales ojivales emplomados con la luna
  for (const [x0, x1, y0, y1] of VENT) { const cx = (x0 + x1) / 2, r = (x1 - x0) / 2, dentro = (x, y) => y >= y0 + r ? x >= x0 && x <= x1 : Math.hypot(x - cx, y - (y0 + r)) <= r;
    for (let y = y0 - 3; y <= y1 + 2; y++) for (let x = x0 - 3; x <= x1 + 3; x++) { const mx = y >= y0 + r ? x >= x0 - 3 && x <= x1 + 3 : Math.hypot(x - cx, y - (y0 + r)) <= r + 3; if (mx) pset(x, y, (x + y) % 5 ? hex('#8a88a4') : hex('#7a7894')); }
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (dentro(x, y)) { const a = ((x - x0) + (y - y0)) % 6, b = ((x - x0) - (y - y0) + 600) % 6; pset(x, y, a === 0 || b === 0 ? hex('#141a38') : (y - y0) < 20 && H(x, y, 9) < 0.18 ? hex('#4a5aa0') : hex('#24306a')); }
    rect(Math.round(cx), y0, Math.round(cx), y1, hex('#4a4866')); rect(x0 - 4, y1 + 1, x1 + 4, y1 + 4, hex('#6a6884')); rect(x0 - 4, y1 + 1, x1 + 4, y1 + 1, hex('#a8a6c0')); }
  disco(28, 62, 4, hex('#e8e4c8')); disco(29, 61, 3, hex('#fff8e0')); pset(27, 63, hex('#c8c4a8'));
  // el estrado de madera con sus cuarterones
  rect(0, 100, 319, 112, hex('#5a3a22')); rect(0, 100, 319, 100, hex('#9a6a3e')); rect(0, 101, 319, 101, hex('#7a522e')); rect(0, 112, 319, 112, hex('#24160c'));
  for (let x = 4; x < 320; x += 24) { rect(x, 103, x + 19, 110, hex('#4a2e1a')); rect(x + 1, 104, x + 18, 109, hex('#6a4426')); rect(x + 1, 104, x + 18, 104, hex('#8a5a34')); pset(x + 10, 106, hex('#c89a4a')); }
  // las losas en perspectiva con reflejos
  for (let y = 113; y < 180; y++) { const fy = [118, 124, 131, 140, 151, 164, 181].findIndex((v) => y < v); for (let x = 0; x < 320; x++) {
    const ux = (x - 160) / (y - 70) * 3.4 + fy * 0.5, j = [118, 124, 131, 140, 151, 164].includes(y) || ((ux % 1) + 1) % 1 < 0.05, q = H(Math.floor(ux), fy, 11);
    let c = j ? hex('#2a2834') : q < 0.3 ? hex('#4a4656') : q < 0.65 ? hex('#544f62') : hex('#5e5a6e'); if (!j && H(x, y, 12) < 0.04) c = hex('#6e6a80');
    if (!j && Math.abs(x - 160) < 26 - (y - 113) * 0.2 && bay(x, y) < 0.3) c = mez(c, hex('#d8a060'), 0.35); pset(x, y, c); } }
  rect(0, 113, 319, 113, hex('#1e1c28'));
  // las mesas de en medio (las otras casas), con platos dorados y copas
  for (const [x0, x1] of [[0, 60], [260, 319]]) { rect(x0, 124, x1, 127, hex('#8a5a30')); rect(x0, 124, x1, 124, hex('#c08a50')); rect(x0, 128, x1, 136, hex('#4a2e1a')); rect(x0, 128, x1, 128, hex('#2a1a0e'));
    for (let x = x0 + 6; x < x1 - 4; x += 14) { rect(x, 123, x + 5, 124, OROS); rect(x + 1, 123, x + 4, 123, ORO); rect(x + 8, 119, x + 9, 123, ORO); pset(x + 8, 119, CREMA); }
    for (let x = x0 + 2; x < x1; x += 30) { rect(x, 129, x + 1, 136, hex('#2a1a0e')); } }
};
// la mesa de Gryffindor de delante con la comida (tapa a los chicos de cintura para abajo)
const pintaMesa = () => {
  const { rect, pset, disco, linea, poligono } = R;
  rect(0, 150, 319, 156, hex('#8a5a30')); rect(0, 150, 319, 150, hex('#d8a060')); rect(0, 151, 319, 151, hex('#b07a44'));
  for (let x = 0; x < 320; x++) { if (H(x, 1, 12) < 0.25) pset(x, 152 + (x % 4), hex('#6e4424')); if (H(x, 2, 12) < 0.1) pset(x, 154, hex('#a87240')); }
  rect(0, 157, 319, 179, hex('#5a3820')); rect(0, 157, 319, 158, hex('#2a1a0e'));
  for (let x = 0; x < 320; x += 46) { rect(x, 159, x, 179, hex('#3a2414')); rect(x + 4, 162, x + 41, 175, hex('#4a2e1a')); rect(x + 5, 163, x + 40, 174, hex('#6a4426')); rect(x + 5, 163, x + 40, 163, hex('#8a5a34')); disco(x + 22, 168, 3, hex('#4a2e1a')); pset(x + 22, 167, hex('#c89a4a')); }
  // los paños rojo y oro que cuelgan del canto
  for (let x = 23; x < 320; x += 46) { for (let y = 157; y < 172; y++) { const w = Math.round(9 - Math.abs(y - 157) * 0.2 - (y > 166 ? (y - 166) * 1.4 : 0)); if (w > 0) { R.rect(x - w, y, x + w, y, (y + x) % 7 === 0 ? hex('#7a1418') : hex('#a82a2a')); R.pset(x - w, y, hex('#5a0e10')); R.pset(x + w, y, hex('#5a0e10')); } } R.rect(x - 9, 157, x + 9, 158, ORO); R.disco(x, 172, 2, ORO); }
  for (let i = 0; i < 160; i++) { const x = Math.floor(H(i, 6, 13) * 320), y = 160 + Math.floor(H(i, 7, 13) * 19); pset(x, y, hex('#4e301c')); }
  // platos dorados
  for (const x of [70, 102, 206, 238, 28, 292]) { rect(x - 7, 149, x + 7, 151, OROS); rect(x - 6, 148, x + 6, 149, ORO); rect(x - 4, 148, x + 4, 148, hex('#fff0a0')); }
  // copas
  for (const x of [86, 120, 190, 222, 44, 270]) { rect(x - 2, 141, x + 2, 145, OROS); rect(x - 1, 141, x + 1, 144, ORO); pset(x - 1, 142, CREMA); rect(x, 146, x, 148, OROS); rect(x - 2, 149, x + 2, 149, OROS); }
  // el pavo asado en su fuente
  rect(136, 148, 172, 151, hex('#c8c8d8')); rect(138, 147, 170, 147, hex('#e8e8f0')); disco(154, 141, 8, hex('#7a3a14')); disco(153, 140, 7, hex('#b8641e')); disco(151, 138, 3, hex('#e09040')); rect(162, 142, 168, 144, hex('#b8641e')); rect(167, 141, 169, 141, CREMA); rect(139, 142, 145, 144, hex('#b8641e')); rect(137, 141, 139, 141, CREMA);
  for (const [x, c] of [[142, hex('#5aa83a')], [166, hex('#5aa83a')], [147, hex('#e84a3a')]]) disco(x, 147, 1, c);
  // la jarra de zumo de calabaza
  rect(20, 136, 30, 149, K); rect(21, 137, 29, 148, hex('#e8803a')); rect(21, 137, 29, 139, hex('#f8b060')); rect(30, 139, 32, 145, K); rect(22, 141, 23, 146, hex('#f8c890')); rect(19, 135, 31, 136, hex('#c8c8d8'));
  // el pudin, el pan y el cuenco de guisantes
  disco(296, 142, 7, hex('#5a2a14')); disco(296, 141, 6, hex('#7a3a1a')); rect(290, 136, 302, 138, CREMA); disco(296, 134, 2, hex('#d83a3a')); pset(295, 133, hex('#5aa83a')); rect(286, 148, 306, 150, hex('#c8c8d8'));
  for (const [x, y] of [[176, 146], [184, 147]]) { disco(x, y, 3, hex('#a86a2a')); disco(x, y - 1, 2, hex('#d89a4a')); }
  rect(122, 145, 132, 149, hex('#e8e8f0')); rect(123, 144, 131, 145, hex('#3a8a2a')); for (let x = 124; x < 131; x += 2) pset(x, 144, hex('#7ad04a'));
  // el candelabro de tres brazos (las llamas se animan aparte)
  rect(258, 128, 259, 149, OROS); rect(250, 134, 267, 135, OROS); for (const x of [250, 258, 266]) { rect(x, 128, x + 1, 134, ORO); rect(x - 1, 122, x + 2, 127, CREMA); } rect(254, 148, 263, 149, ORO);
};
const p3 = (t) => {
  capa('fondo', pintaFondo);
  // estandartes que se mecen y antorchas
  for (const [bx, c, cs, ani] of [[70, hex('#b8282a'), hex('#7a1418'), ORO], [232, hex('#e8c030'), hex('#a8801a'), hex('#2a2a2a')]]) {
    R.rect(bx - 2, 44, bx + 20, 46, OROS); for (let y = 47; y < 88; y++) { const sw = Math.round(Math.sin(t * 1.8 + y * 0.08 + bx) * (y - 47) / 30); const w = y > 80 ? Math.round((88 - y) * 1.2) : 9; R.rect(bx + 9 - w + sw, y, bx + 9 + w + sw, y, (y % 6 === 0) ? cs : c); R.pset(bx + 9 - w + sw, y, cs); }
    R.disco(bx + 9 + Math.round(Math.sin(t * 1.8 + 62 * 0.08 + bx)), 62, 4, ani); R.disco(bx + 8, 60, 2, ani); }
  for (const tx of [52, 268]) { R.rect(tx - 1, 70, tx + 1, 78, hex('#3a2a1a')); R.rect(tx - 2, 68, tx + 2, 69, hex('#2a1c10')); const fl = Math.sin(t * 13 + tx) > 0; R.disco(tx, 65, 2, hex('#f08020')); R.rect(tx - 1, fl ? 60 : 61, tx + 1, 65, hex('#f8c040')); R.pset(tx, fl ? 59 : 60, CREMA); for (let i = 0; i < 6; i++) tine(tx - 8 + i * 3, 66 + (i % 2), hex('#f8b050'), 0.25); }
  // los profesores en la mesa alta: Dumbledore de pie, que se sienta en «sits»
  const baja = tramo(t, SITS, SITS + 0.35), hablando = W.some((w) => t > w - 0.05 && t < w + 0.45);
  R.actor(EL.mcgonagall, 104, 102, t, { dir: 1, sorpresa: t > W[0] && t < W[0] + 0.7 });
  R.actor(EL.snape, 196, 102, t, { dir: -1, enfado: true });
  R.actor(EL.dumbledore, 153, Math.round(lerp(95, 102, baja)), t, { dir: 1, brazos: baja < 0.5 && t < SITS, habla: hablando, sonrisa: !hablando });
  R.actor(EL.hagrid, 236, 103, t, { dir: -1, sonrisa: true, brazos: t > W[3] + 0.3 && t < SITS });
  R.actor(EL.quirrell, 74, 102, t, { dir: 1, sorpresa: t > W[1] });
  // la mesa alta (delante de los profesores)
  R.rect(62, 87, 258, 89, hex('#e8dcc0')); R.rect(62, 87, 258, 87, CREMA); R.rect(62, 90, 258, 99, hex('#d8c8a0')); R.rect(62, 98, 258, 99, ORO); R.rect(150, 90, 170, 99, hex('#a82a2a')); R.rect(150, 98, 170, 99, ORO);
  for (let x = 66; x < 258; x += 8) R.pset(x, 94, hex('#c0ac80')); for (const x of [90, 128, 186, 220]) { R.rect(x - 1, 82, x + 1, 86, ORO); R.pset(x, 82, CREMA); }
  // el fantasma que cruza despacio por el fondo (translúcido)
  { const gx = Math.round(lerp(250, 70, tramo(t, P3, P4))), gy = 112 + Math.round(Math.sin(t * 2) * 2);
    for (let y = -16; y < 8; y++) for (let x = -6; x <= 6; x++) { const r = y < -8 ? Math.hypot(x, y + 12) <= 4.5 : Math.abs(x) <= 5 - (y > 2 ? (y - 2) * 0.4 : 0) + Math.sin(t * 6 + y) * 0.5; if (r) tine(gx + x, gy + y, hex('#e8f4ff'), 0.45); }
    R.pset(gx - 2, gy - 13, hex('#3a4a6a')); R.pset(gx + 1, gy - 13, hex('#3a4a6a')); }
  // los alumnos de las otras mesas
  for (const [d, x, k] of [[EL.alumno, 6, 1], [EL.alumna, 34, 1], [EL.alumno, 270, -1], [EL.alumna, 298, -1]]) R.actor(d, x, 134, t, { dir: k, sorpresa: W.some((w) => t > w && t < w + 0.4) && x % 3 === 0, habla: Math.sin(t * 5 + x) > 0.7 });
  R.rect(0, 124, 60, 136, hex('#4a2e1a')); R.rect(260, 124, 319, 136, hex('#4a2e1a'));
  for (const [x0, x1] of [[0, 60], [260, 319]]) { R.rect(x0, 124, x1, 126, hex('#8a5a30')); R.rect(x0, 124, x1, 124, hex('#c08a50')); for (let x = x0 + 6; x < x1 - 4; x += 14) { R.rect(x, 122, x + 5, 124, OROS); R.rect(x + 1, 122, x + 4, 122, ORO); R.rect(x + 8, 118, x + 9, 123, ORO); } }
  // velas que flotan
  for (let i = 0; i < 14; i++) { const vx = 8 + ((i * 53) % 300), vy = 18 + ((i * 29) % 44) + Math.round(Math.sin(t * 1.5 + i) * 2); if ((vx > 262 && vy < 50) || (vx > 14 && vx < 176 && vy < 20)) continue;
    R.rect(vx, vy, vx + 1, vy + 5, CREMA); R.pset(vx + 1, vy + 5, hex('#c8b890')); R.pset(vx, vy - 1, Math.sin(t * 11 + i) > 0 ? hex('#f8c040') : hex('#f08020')); R.pset(vx, vy - 2, hex('#fff0a0')); }
  // los cuatro globos, uno en cada palabra; se van cuando se sienta
  const sale = tramo(t, SITS - 0.1, SITS + 0.3);
  // izquierda, derecha, izquierda, derecha: cada globo nuevo echa al de su lado
  for (let k = 0; k < 4; k++) { const u = tramo(t, W[k], W[k] + 0.3), fuera = k < 2 ? tramo(t, W[k + 2] - 0.15, W[k + 2]) : sale; if (u > 0 && fuera < 1) globo(k % 2 ? 176 : 144, Math.round(70 - Math.sin(t * 2 + k) * 1.5 - (1 - u) * 4), fuera > 0 ? 1 - fuera : u, k, t); }
  // los de Gryffindor, detrás de su mesa
  const ron = R.actor(EL.ron, 96, 157, t, { dir: 1, sostiene: t > W[0] && t < SITS ? [113, 132] : [112, 140], sorpresa: t > W[0] && t < SITS, habla: (t < W[0] || t > SITS + 0.2) && Math.sin(t * 12) > 0 });
  R.actor(EL.harry, 64, 157, t, { dir: 1, sonrisa: t > W[2], sorpresa: t > W[0] && t < W[2] });
  R.actor(EL.hermione, 200, 157, t, { dir: -1, sorpresa: t > W[3] && t < SITS });
  R.actor(EL.nevilleSapo, 232, 157, t, { dir: -1, sorpresa: t > W[3] - 0.3 });
  if (t > W[1] && t < SITS) R.bocadillo(214, 126, { icono: '?' });
  capa('mesa', pintaMesa, true);
  // el muslo de Ron en la mano (por delante de la mesa)
  { const [mx, my] = ron.mano; R.disco(mx + 2, my - 3, 3, hex('#7a3a14')); R.disco(mx + 2, my - 4, 2, hex('#c8762a')); R.rect(mx, my - 1, mx + 1, my + 2, CREMA); }
  // el sapo de Neville salta a la mesa en «Tweak»
  { const u = tramo(t, W[3] - 0.2, W[3] + 0.5), sx = lerp(232, 222, u), sy = lerp(152, 149, u) - Math.sin(u * Math.PI) * 12; if (u > 0) PZ.sapo(R, Math.round(sx), Math.round(sy), { t }); }
  for (const x of [250, 258, 266]) { const fl = Math.sin(t * 12 + x) > 0; R.pset(x, 121, hex('#f08020')); R.rect(x, fl ? 118 : 119, x + 1, 120, hex('#f8c040')); R.pset(x, fl ? 117 : 118, CREMA); }
};

// 4 · lo alto de la torre, de noche, como si nada
const p4 = (t) => {
  T.exterior(R, t, { encuadre: 'torre' });
  // la lechuza cruza por delante de la luna
  { const u = tramo(t, P4 + 0.3, P4 + 3.6); if (u > 0 && u < 1) PZ.lechuza(R, Math.round(lerp(266, -20, u)), Math.round(64 - Math.sin(u * 3.1) * 14), { t, vuela: true }); }
  // Ron se sienta en el banco y bosteza
  const r = tramo(t, P4 + 0.2, P4 + 1.6), rx = Math.round(lerp(30, 104, r));
  R.actor(EL.ron, rx, 160, t, { dir: 1, anda: r > 0 && r < 1, sorpresa: t > P4 + 2.0 && t < P4 + 2.8, brazos: t > P4 + 2.0 && t < P4 + 2.8, parpadea: t > P4 + 2.9 });
  if (t > P4 + 3.0) for (let i = 0; i < 2; i++) { const u = ((t - P4 - 3.0) * 0.6 + i * 0.5) % 1; zeta(rx + 14 + u * 10, 128 - u * 14, hex('#b8d0f8')); }
  // Harry sale de la garita y mira por el telescopio
  const h = tramo(t, P4 + 0.1, P4 + 2.3), hx = Math.round(lerp(120, 226, h));
  R.actor(EL.harry, hx, 160, t, { dir: 1, anda: h > 0 && h < 1, sonrisa: h >= 1, sostiene: h >= 1 ? [hx + 18, 136] : false });
  if (h >= 1 && Math.sin(t * 2) > 0.6) chispa(286, 102, 2, hex('#fff8c0'));
  // una lechuza posada en el pretil, que se esponja y gira la cabeza
  PZ.lechuza(R, 178, 97, { t, dir: Math.sin(t * 0.9) > 0 ? 1 : -1 });
};
const efectos = [[FEAST, 'brillo'], [HAT + 0.1, 'golpecito'], [DONE + 0.1, 'palmada'], [W[0], 'pop'], [W[1], 'pop'], [W[2], 'pop'], [W[3], 'pop'], [SITS + 0.3, 'golpecito'], [P4 + 0.4, 'viento']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1991 });
''')

E['hp-binns'] = ('El profesor Binns', '''// HP-BINNS (frase 18), 1991, sin cartela. Tres planos:
// 1. la pizarra del aula: «classes begin», entran Harry, Ron y Neville; Hermione señala; un borrador vuela solo, limpia
//    un trozo y la tiza dibuja un rollo de película que tacha con una X en «never appears in the movies»; corta en
//    «History»;
// 2. la sala común junto al fuego, «Professor Binns»: el viejo profesor lee en la butaca con su manta, se duerme en «fell
//    asleep» (zetas), el fuego chisporrotea en «fire» y en «got up» su fantasma se levanta y lo deja durmiendo;
// 3. el aula con pupitres: el fantasma sale de la pared junto a la chimenea en «without his body», flota hasta la mesa y
//    da clase en «kept teaching»; los alumnos se duermen uno a uno (zetas) salvo Hermione, que toma apuntes.''', r'''
const b = (f) => en('binns', f);
const P2 = b(0.339), P3 = b(0.806);
const BEGIN = b(0.064), NEVER = b(0.190), MOVIES = b(0.283), PROF = b(0.461), ASLEEP = b(0.627), FIRE = b(0.695), GOT = b(0.782), TEACH = b(0.921);
const PZ = T.PIEZAS_HP, K = hex('#1a1424'), TIZA = hex('#f0f4e8');
const zeta = (x, y, c, e = 1) => { x = Math.round(x); y = Math.round(y); for (const [d, col] of [[1, K], [0, c]]) { R.rect(x + d, y + d, x + d + 3 * e, y + d + e - 1, col); R.rect(x + d + 2 * e, y + d + e, x + d + 3 * e - 1, y + d + 2 * e - 1, col); R.rect(x + d + e, y + d + 2 * e, x + d + 2 * e - 1, y + d + 3 * e - 1, col); R.rect(x + d, y + d + 3 * e, x + d + 3 * e, y + d + 4 * e - 1, col); } };
const zetas = (x, y, t0, t, n = 2) => { if (t < t0) return; for (let i = 0; i < n; i++) { const u = ((t - t0) * 0.7 + i / n) % 1; if (t - t0 > i * 0.5) zeta(x + u * 8 + Math.sin(u * 6) * 2, y - u * 16, hex('#b8d0f8'), u > 0.5 ? 2 : 1); } };
// una línea de tiza que se dibuja hasta la fracción u (2 px, con su polvo)
const mez = (c, d, a) => { const ch = (k) => Math.round(((c >>> k) & 255) * (1 - a) + ((d >>> k) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };
const halo = (cx, cy, r, a = 0.3) => { for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) { const d = Math.hypot(x - cx, (y - cy) * 0.8) / r; if (d < 1) { const p = R.pget(x, y); if (p) R.pset(x, y, mez(p, hex('#d8f0ff'), a * (1 - d))); } } };
const tiza = (x0, y0, x1, y1, u) => { if (u <= 0) return; const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0)); for (let i = 0; i <= n * Math.min(1, u); i++) { const x = Math.round(x0 + (x1 - x0) * i / n), y = Math.round(y0 + (y1 - y0) * i / n); R.pset(x, y, TIZA); if ((i * 7) % 5 < 3) R.pset(x + 1, y, hex('#c8d4c0')); } };

// 1 · la pizarra: el borrador limpia y la tiza tacha una película
let muestra = null;
const p1 = (t) => {
  const o = { encuadre: 'aula', camara: 'pizarra' };
  T.hogwarts(R, t, o);
  if (!muestra) { const n = new Map(); for (let y = 30; y < 96; y += 1) for (let x = 46; x < 256; x += 1) { const c = R.pget(x, y); n.set(c, (n.get(c) || 0) + 1); } muestra = [...n.entries()].sort((a, b2) => b2[1] - a[1]).slice(0, 2).map((e) => e[0]); }
  // el borrador vuela solo y limpia de izquierda a derecha
  const lim = tramo(t, BEGIN + 0.4, NEVER - 0.05), bx = Math.round(lerp(96, 186, lim));
  if (lim > 0) { for (let y = 28; y <= 64; y++) for (let x = 98; x <= Math.min(184, bx); x++) R.pset(x, y, ((x * 7 + y * 13) % 11) < 3 ? muestra[1] : muestra[0]);
    for (let i = 0; i < 26; i++) { const x = 100 + ((i * 37) % 84), y = 30 + ((i * 13) % 34); if (x < bx) R.pset(x, y, hex('#5a7a6a')); } }
  if (lim > 0 && lim < 1) { const by = 46 + Math.round(Math.sin(t * 18) * 8); R.rect(bx - 6, by - 4, bx + 6, by + 3, K); R.rect(bx - 5, by - 3, bx + 5, by - 1, hex('#a8763a')); R.rect(bx - 5, by, bx + 5, by + 2, hex('#e8e0d0')); R.rect(bx - 5, by - 3, bx + 5, by - 3, hex('#c89a5a'));
    for (let i = 0; i < 5; i++) R.pset(bx - 8 - i * 2, by + ((i * 3) % 7) - 3, hex('#d0d8c8')); }
  // la tiza dibuja un rollo de película (fotogramas y perforaciones) y lo tacha en «never appears»
  const d = tramo(t, NEVER - 0.05, NEVER + 0.8);
  tiza(110, 34, 174, 34, d * 2); tiza(110, 58, 174, 58, d * 2 - 0.4); tiza(110, 34, 110, 58, d * 2 - 0.6); tiza(174, 34, 174, 58, d * 2 - 0.8);
  if (d > 0.5) { for (let x = 114; x < 172; x += 6) { R.rect(x, 36, x + 2, 37, TIZA); R.rect(x, 55, x + 2, 56, TIZA); } for (const x of [130, 152]) tiza(x, 39, x, 53, (d - 0.5) * 2); }
  if (d > 0.7) { R.disco(120, 46, 3, TIZA); R.disco(120, 46, 2, hex('#2e4a3a')); R.rect(140, 42, 146, 50, TIZA); R.rect(141, 43, 145, 49, hex('#2e4a3a')); R.poligono([[160, 42], [168, 46], [160, 50]], TIZA); }
  const x = tramo(t, MOVIES - 0.55, MOVIES + 0.05);
  if (x > 0) { const c = hex('#f07a6a'); const n = Math.min(1, x); for (let i = 0; i < 80 * n; i++) { R.rect(Math.round(102 + i), Math.round(28 + i * 0.45), Math.round(104 + i), Math.round(29 + i * 0.45), c); } for (let i = 0; i < 80 * Math.max(0, x - 0.15) / 0.85; i++) { R.rect(Math.round(180 - i), Math.round(28 + i * 0.45), Math.round(182 - i), Math.round(29 + i * 0.45), c); } }
  T.hogwartsDelante(R, t, o);
  // la tiza que vuela sola
  if (d > 0 && x < 1) { const tx = x > 0 ? lerp(102, 182, x) : lerp(110, 174, Math.min(1, d * 2)), ty = x > 0 ? lerp(28, 64, x) : 34; R.rect(Math.round(tx) + 1, Math.round(ty) - 4, Math.round(tx) + 2, Math.round(ty), TIZA); R.pset(Math.round(tx) + 2, Math.round(ty) - 4, K); }
  // entran los alumnos
  const a = tramo(t, 0.2, BEGIN + 0.9), n = tramo(t, MOVIES - 0.9, P2 - 0.1);
  R.actor(EL.harry, Math.round(lerp(-4, 72, a)), 174, t, { dir: 1, anda: a > 0 && a < 1, sorpresa: t > MOVIES - 0.3 && t < MOVIES + 0.6 });
  R.actor(EL.ron, Math.round(lerp(-26, 94, a)), 175, t, { dir: 1, anda: a > 0 && a < 1, sorpresa: t > MOVIES - 0.3 });
  R.actor(EL.nevilleSapo, Math.round(lerp(-24, 40, n)), 176, t, { dir: 1, anda: n > 0 && n < 1 });
  const h = tramo(t, 0.4, BEGIN + 1.1);
  R.actor(EL.hermione, Math.round(lerp(336, 220, h)), 174, t, { dir: -1, anda: h > 0 && h < 1, dedo: t > NEVER + 0.1 && t < MOVIES + 0.3, sonrisa: t > MOVIES });
  R.actor(EL.alumna, Math.round(lerp(352, 246, h)), 176, t, { dir: -1, anda: h > 0 && h < 1 });
};

// 2 · el profesor se duerme junto al fuego y su fantasma se levanta
const p2 = (t) => {
  const o = { encuadre: 'sala' };
  T.hogwarts(R, t, o);
  // chispas del fuego en «fire»
  const f = tramo(t, FIRE - 0.2, FIRE + 1.0);
  if (f > 0 && f < 1) for (let i = 0; i < 12; i++) { const u = (f * 1.4 + i / 12) % 1; R.pset(Math.round(96 + i * 3 + Math.sin(u * 9 + i) * 4), Math.round(108 - u * 34), u < 0.5 ? hex('#fff0a0') : hex('#f08020')); }
  const duerme = t > ASLEEP - 0.1, cae = tramo(t, ASLEEP - 0.3, ASLEEP + 0.2);
  // el cuerpo, que sigue dormido en la butaca
  const cuerpo = R.actor(EL.binns, 178, 141, t, { dir: -1, opaco: true, parpadea: duerme, sonrisa: !duerme, sostiene: [168, Math.round(lerp(122, 130, cae))] });
  // la manta de cuadros sobre las rodillas
  for (let y = 129; y <= 141; y++) for (let x = 172; x <= 194; x++) { const c = (Math.floor(x / 3) + Math.floor(y / 3)) % 2 ? hex('#3a6a4a') : hex('#a83a3a'); R.pset(x, y, (x % 6 === 0 || y % 6 === 0) ? hex('#e8c860') : c); }
  R.rect(171, 128, 195, 128, K); R.rect(171, 128, 171, 141, K);
  // el libro abierto que cae sobre la manta
  PZ.libro(R, cuerpo.mano[0], cuerpo.mano[1] + 6, { abierto: true, t });
  zetas(184, 104, ASLEEP + 0.1, t, 3);
  // el fantasma se levanta del cuerpo en «got up» y flota hacia la chimenea
  const g = tramo(t, GOT - 0.35, P2 + 0.0 + (P3 - GOT) * 0.9);
  if (g > 0) { halo(Math.round(lerp(178, 140, g)) + 7, Math.round(lerp(141, 118, Math.min(1, g * 1.6))) - 14, 18, 0.35 * Math.min(1, g * 3)); R.actor(EL.binns, Math.round(lerp(178, 140, g)), Math.round(lerp(141, 118, Math.min(1, g * 1.6))), t, { dir: -1, sonrisa: g > 0.3, dedo: g > 0.5 }); }
};

// 3 · el fantasma sale de la pared y da clase; los alumnos se duermen
const p3 = (t) => {
  const o = { encuadre: 'aula' };
  T.hogwarts(R, t, o);
  // los alumnos en sus pupitres
  const dormido = (k) => t > TEACH + 0.3 + k * 0.38;
  const filaA = [[EL.ron, 30, 1, 0], [EL.harry, 72, 1, 2], [EL.hermione, 228, -1, -1], [EL.neville, 270, -1, 1]];
  const filaB = [[EL.alumno, 30, 1, 3], [EL.alumna, 72, 1, 4], [EL.alumno, 228, -1, 5], [EL.alumna, 270, -1, 6]];
  for (const [d, x, dir, k] of filaA) { const z = k >= 0 && dormido(k); R.actor(d, x, 136 + (z ? 2 : 0), t, { dir, parpadea: z, sorpresa: t < P3 + 1.2 && t > P3 + 0.2, sostiene: k < 0 && t > P3 + 1.4 ? [x - 4, 120] : false }); }
  for (const [d, x, dir, k] of filaB) { const z = dormido(k); R.actor(d, x, 172 + (z ? 2 : 0), t, { dir, parpadea: z, sorpresa: t < P3 + 1.2 && t > P3 + 0.2 }); }
  // el profesor fantasma: sale de la pared junto a la chimenea, cruza y se pone detrás de la mesa
  const sal = tramo(t, P3 + 0.05, P3 + 0.9), va = tramo(t, P3 + 0.9, TEACH - 0.25);
  const gx = Math.round(sal < 1 ? lerp(40, 92, sal) : lerp(92, 153, va)), gy = Math.round(sal < 1 ? 110 : lerp(110, 124, va));
  halo(gx + 7, gy - 13, 20, 0.4);
  if (sal < 1) R.recorte([57, 0, 319, 179]);
  R.actor(EL.binns, gx, gy + Math.round(Math.sin(t * 2.4) * 1.5), t, { dir: 1, habla: t > TEACH - 0.2 && Math.sin(t * 9) > 0, dedo: t > TEACH - 0.2 && Math.floor(t * 1.5) % 2 === 0, sonrisa: t < TEACH - 0.2 });
  R.recorte(null);
  T.hogwartsDelante(R, t, o);
  // Hermione toma apuntes con su pluma
  if (t > P3 + 1.4) { const px = 224 + Math.round(Math.sin(t * 9) * 2); R.linea(px, 118, px + 4, 112, hex('#f0f0f8')); R.pset(px + 4, 112, hex('#c8c8d8')); R.pset(px, 119, K); }
  for (const [x, y, k] of [[30, 106, 0], [72, 106, 2], [270, 106, 1], [30, 142, 3], [72, 142, 4], [228, 142, 5], [270, 142, 6]]) if (dormido(k)) zetas(x + 12, y, TEACH + 0.3 + k * 0.38, t, 2);
};
const efectos = [[BEGIN + 0.45, 'whoosh'], [NEVER, 'lapiz'], [MOVIES - 0.5, 'lapiz'], [GOT - 0.3, 'brillo'], [P3 + 0.1, 'whoosh'], [TEACH + 1.0, 'tic']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1991 });
''')

E['hp-flauta'] = ('La flauta y el dragón', '''// HP-FLAUTA (frase 19), 1991–1992, sin cartela. Tres planos:
// 1. la puerta de la cabaña nevada en Navidad: Hagrid abre, sale y le da a Harry una flauta en «gives»; Harry la coge en
//    «flute»; Hagrid se señala orgulloso en «carved himself» y Harry la toca (notas); corta en «that»;
// 2. la cabaña desde lejos, meses después: Harry toca la flauta y la sombra de tres cabezas (solo la sombra, con orejas
//    caídas) va bajando hasta dormirse en «sleep»; en «Norbert» Hagrid sale de casa con el bebé dragón en brazos y Harry
//    señala hacia la torre;
// 3. las almenas a medianoche: Harry y Hermione traen la caja con Norberto; llegan cuatro escobas en «Charlie Weasley's
//    friends», bajan las cuerdas y la suben en «pick him up»; el dragón estornuda una chispa que chamusca a la snitch (gag
//    5) y las escobas se lo llevan mientras los chicos dicen adiós.''', r'''
const f = (x) => en('flauta', x);
const P2 = f(0.261), P3 = f(0.623);
const GIVES = f(0.069), FLUTE = f(0.111), CARVED = f(0.145), PUTS = f(0.306), SLEEP = f(0.417), NORBERT = f(0.488), DRAGON = f(0.526), AWAY = f(0.584);
const CHARLIE = f(0.691), PICK = f(0.770), UP = f(0.803), TALLEST = f(0.930);
const PZ = T.PIEZAS_HP, K = hex('#1a1424'), ORO = hex('#f0c040');
const nota = (x, y, c) => { x = Math.round(x); y = Math.round(y); for (const [d, col] of [[1, K], [0, c]]) { R.rect(x + d, y + d - 1, x + d + 2, y + d + 1, col); R.rect(x + d + 2, y + d - 7, x + d + 2, y + d, col); R.rect(x + d + 3, y + d - 7, x + d + 4, y + d - 6, col); R.pset(x + d + 5, y + d - 5, col); } };
const zeta = (x, y, c, e = 1) => { x = Math.round(x); y = Math.round(y); for (const [d, col] of [[1, K], [0, c]]) { R.rect(x + d, y + d, x + d + 3 * e, y + d + e - 1, col); R.rect(x + d + 2 * e, y + d + e, x + d + 3 * e - 1, y + d + 2 * e - 1, col); R.rect(x + d + e, y + d + 2 * e, x + d + 2 * e - 1, y + d + 3 * e - 1, col); R.rect(x + d, y + d + 3 * e, x + d + 3 * e, y + d + 4 * e - 1, col); } };
const mez = (c, d, a) => { const ch = (k) => Math.round(((c >>> k) & 255) * (1 - a) + ((d >>> k) & 255) * a); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };
const tine = (x, y, c, a) => { const p = R.pget(x, y); if (p) R.pset(x, y, mez(p, c, a)); };
// copos de nieve que caen por delante, a dos velocidades
const nieve = (t, n = 46) => { for (let i = 0; i < n; i++) { const v = i % 2 ? 14 : 22, x = Math.round((i * 67 + Math.sin(t * 1.3 + i) * 6 + t * 4) % 320), y = Math.round((i * 41 + t * v) % 190) - 6; if ((x > 276 && y < 46) || (x > 18 && x < 172 && y < 16)) continue; R.pset(x, y, hex('#ffffff')); if (i % 3 === 0) R.pset(x + 1, y, hex('#d8e4f4')); } };
const notas = (x, y, t0, t, dir = 1) => { if (t < t0) return; for (let i = 0; i < 3; i++) { const u = ((t - t0) * 0.6 + i / 3) % 1; if (t - t0 > i * 0.35) nota(x + dir * u * 22 + Math.sin(u * 8 + i) * 3, y - u * 26, [ORO, hex('#f0a0b0'), hex('#b8e0f0')][i]); } };

// 1 · Hagrid le da la flauta a Harry en la puerta
const p1 = (t) => {
  const o = { encuadre: 'cabana', camara: 'puerta', puerta: tramo(t, 0.25, 0.85) };
  T.exterior(R, t, o);
  const sale = tramo(t, 0.8, GIVES - 0.1), hx = Math.round(lerp(124, 150, sale));
  const da = tramo(t, GIVES - 0.1, FLUTE - 0.15), pasa = tramo(t, FLUTE - 0.15, FLUTE + 0.15), toca = t > CARVED + 0.65;
  const hg = o.puerta < 0.6 ? { mano: [hx + 22, 138] } : R.actor(EL.hagrid, hx, 170, t, { dir: 1, anda: sale > 0 && sale < 1, sonrisa: true, sostiene: t > GIVES - 0.2 && pasa < 1 ? [Math.round(lerp(hx + 22, 190, da)), Math.round(lerp(138, 146, da))] : false, dedo: t > CARVED && t < CARVED + 0.9 });
  const yaH = pasa >= 1;
  const hr = R.actor(EL.harry, 222, 170, t, { dir: -1, sostiene: t > GIVES + 0.1 ? (toca ? [216, 153] : [206, 151]) : false, sonrisa: yaH && !toca, sorpresa: t > GIVES && !yaH });
  // la flauta: de la mano de Hagrid a la de Harry, y luego a la boca
  if (t > GIVES - 0.2) { const a = pasa < 1 ? hg.mano : hr.mano, b2 = hr.mano, u = pasa > 0 && pasa < 1 ? pasa : (yaH ? 1 : 0); const fx = lerp(a[0], b2[0], u), fy = lerp(a[1], b2[1], u); PZ.flauta(R, Math.round(fx - 4), Math.round(fy + 2), { t }); }
  if (toca) notas(hr.mano[0] - 10, hr.mano[1] - 6, CARVED + 0.8, t, -1);
  // las virutas de madera junto a las botas (la ha tallado él)
  for (const [x, y] of [[176, 169], [182, 170], [188, 168], [173, 170]]) { R.pset(x, y, hex('#d8a860')); R.pset(x + 1, y - 1, hex('#b8803a')); }
  nieve(t);
};

// 2 · meses después: la flauta duerme a la sombra de las tres cabezas; Hagrid sale con Norberto
const p2 = (t) => {
  const o = { encuadre: 'cabana' };
  T.exterior(R, t, o);
  // la sombra de tres cabezas en la nieve (solo la sombra, orejas caídas): baja hasta dormirse
  const baja = tramo(t, PUTS, SLEEP + 0.2);
  const cabezas = [[16, 134], [34, 126], [52, 136]];
  for (let y = 120; y < 172; y++) for (let x = 0; x < 72; x++) {
    let dentro = y > 150 + Math.sin(x * 0.2) * 2 && x < 50 - (y - 150) * 0.3;   // el lomo que sale de la izquierda
    for (let k = 0; k < 3; k++) { const [cx, cy0] = cabezas[k], cy = cy0 + baja * (16 - k * 2) + Math.sin(t * 1.4 + k) * (1 - baja) * 2;
      if (Math.hypot((x - cx) * 0.9, y - cy) < 7.5) dentro = true;                                                                     // la cabeza
      if (x > cx && x < cx + 12 && y > cy - 2 + (x - cx) * 0.1 && y < cy + 4) dentro = true;                                             // el hocico
      if (Math.hypot(x - (cx - 4), (y - (cy + 6 + baja * 2)) * 0.6) < 3.2) dentro = true;                                                 // la oreja caída
      if (x > cx - 6 && x < cx + 4 && y > cy && y < 160) dentro = true; }                                                               // el cuello
    if (dentro) tine(x, y, hex('#2e2e66'), 0.55); }
  if (t > SLEEP) for (let k = 0; k < 3; k++) { const u = ((t - SLEEP) * 0.6 + k / 3) % 1; zeta(cabezas[k][0] + 6 + u * 6, cabezas[k][1] + 4 - u * 18, hex('#b8d0f8'), u > 0.5 ? 2 : 1); }
  // Harry toca para la sombra; cuando sale Hagrid, se vuelve y señala la torre
  const mira = t > NORBERT + 0.2, senala = t > AWAY - 0.1;
  const hr = R.actor(EL.harry, 66, 166, t, { dir: mira ? 1 : -1, sostiene: !mira ? [62, 149] : false, sonrisa: mira, dedo: senala });
  if (!mira) { PZ.flauta(R, hr.mano[0] - 4, hr.mano[1] + 2, { t }); notas(hr.mano[0] - 8, hr.mano[1] - 6, P2 + 0.3, t, -1); }
  // Hagrid sale de la cabaña con el bebé dragón en brazos
  const s = tramo(t, NORBERT - 0.3, DRAGON + 0.4), gx = Math.round(lerp(160, 188, s)), gy = Math.round(lerp(152, 165, s));
  if (s > 0) { const hg = R.actor(EL.hagrid, gx, gy, t, { dir: -1, anda: s < 1, sostiene: true, triste: t > AWAY, sonrisa: t < AWAY });
    PZ.dragon(R, hg.mano[0], hg.mano[1] + 4, { t, dir: -1 });
    const h = tramo(t, DRAGON, DRAGON + 1.2); if (h > 0 && h < 1) for (let i = 0; i < 3; i++) { const r = 1 + Math.round((h * 3 + i) % 3); R.disco(hg.mano[0] - 10 - i * 4, hg.mano[1] - 6 - h * 10 - i * 3, r, hex('#c8c8d0')); } }
};

// 3 · las almenas a medianoche: las escobas se llevan la caja con Norberto
const brazos = (ne, t) => [[150, 62], [184, 52], [218, 68], [250, 56]].map(([fx, fy], k) => { const u = Math.max(0, Math.min(1, ne * 1.4 - k * 0.12)), e = u * u * (3 - 2 * u); return [lerp(370 + k * 34, fx, e), lerp(20 + k * 10, fy, e) + Math.sin(t * 2.2 + k) * 2]; });
const caja = (x, y, t, estornudo) => {
  // el dragón asoma por arriba, la caja de tablas por delante
  PZ.dragon(R, Math.round(x + 2), Math.round(y - 12), { t, estornudo });
  R.rect(x - 14, y - 16, x + 14, y, K); R.rect(x - 13, y - 15, x + 13, y - 1, hex('#a8763a'));
  for (const yy of [y - 11, y - 6]) R.rect(x - 13, yy, x + 13, yy, hex('#6a4420'));
  R.rect(x - 13, y - 15, x + 13, y - 15, hex('#d8a860')); R.rect(x - 13, y - 15, x - 12, y - 1, hex('#7a5028')); R.rect(x + 12, y - 15, x + 13, y - 1, hex('#7a5028'));
  R.linea(x - 12, y - 14, x + 11, y - 2, hex('#7a5028'));
  for (const xx of [x - 10, x + 10]) R.pset(xx, y - 13, hex('#3a3a3a'));
  for (let i = 0; i < 4; i++) R.pset(x - 9 + i * 6, y - 4, hex('#5a3818'));
};
const p3 = (t) => {
  const ne = tramo(t, CHARLIE - 0.5, PICK - 0.2) - tramo(t, TALLEST, TALLEST + 4.4);
  const o = { encuadre: 'torre', camara: 'almenas', escobas: ne };
  T.exterior(R, t, o);
  const B = brazos(ne, t), [x1, y1] = B[1], [x2, y2] = B[2];
  // los chicos traen la caja y la dejan; luego dicen adiós
  const trae = tramo(t, P3, P3 + 1.2), cx0 = Math.round(lerp(40, 160, trae));
  const cuerda = tramo(t, PICK - 0.2, UP), sube = tramo(t, UP, UP + 1.0);
  const cuelga = [(x1 + x2) / 2, Math.max(y1, y2) + 46];
  const cx = sube > 0 ? lerp(160, cuelga[0], sube) : cx0, cy = sube > 0 ? lerp(168, cuelga[1], sube) : 168;
  const adios = t > TALLEST - 0.2;
  R.actor(EL.harry, Math.round(cx0 - 34 + (trae >= 1 ? -8 : 0)), 168, t, { dir: 1, anda: trae > 0 && trae < 1, sostiene: trae < 1 ? [cx0 - 14, 154] : false, dedo: adios && Math.floor(t * 4) % 2 === 0, sonrisa: adios });
  R.actor(EL.hermione, Math.round(cx0 + 18 + (trae >= 1 ? 10 : 0)), 168, t, { dir: -1, anda: trae > 0 && trae < 1, sostiene: trae < 1 ? [cx0 + 14, 154] : false, brazos: adios && Math.floor(t * 4 + 1) % 2 === 0, sorpresa: t > PICK && t < PICK + 1.2 });
  // las cuerdas bajan desde dos escobas y se enganchan a la caja
  if (cuerda > 0) for (const [bx, by, dx] of [[x1, y1, -10], [x2, y2, 10]]) { const ex = cx + dx, ey = cy - 16; R.linea(Math.round(bx), Math.round(by + 1), Math.round(lerp(bx, ex, cuerda)), Math.round(lerp(by + 1, ey, cuerda)), hex('#c8a870')); }
  const estornudo = t > f(0.86) && t < f(0.86) + 0.5;
  caja(Math.round(cx), Math.round(cy), t, estornudo);
  // la chispa del estornudo, del hocico a la snitch
  if (estornudo) { const u = tramo(t, f(0.86), f(0.86) + 0.25), nx = cx + 9, ny = cy - 22; for (let i = 0; i < 6; i++) { const a = i * 1.05 + t * 9, r = 2 + u * 6; R.linea(Math.round(nx + u * 16), Math.round(ny - u * 4), Math.round(nx + u * 16 + Math.cos(a) * r), Math.round(ny - u * 4 + Math.sin(a) * r), i % 2 ? hex('#f8d040') : hex('#f07a2a')); } R.disco(Math.round(nx + u * 16), Math.round(ny - u * 4), 2, hex('#fff8c0')); }
  // la snitch se acerca a curiosear; la chispa del estornudo le chamusca las alas
  const sx = Math.round(cx + 30 + Math.sin(t * 3) * 3), sy = Math.round(cy - 26);
  const quema = t > f(0.86) + 0.1;
  if (t > UP - 0.3) { T.snitch(R, quema ? sx + Math.round(tramo(t, f(0.86) + 0.1, f(0.86) + 1.4) * 70) : sx, quema ? sy - Math.round(tramo(t, f(0.86) + 0.1, f(0.86) + 1.4) * 40) : sy, t, { s: 2, cara: quema ? 'susto' : 'feliz', vuela: 0.3 });
    if (quema) { const u = tramo(t, f(0.86) + 0.1, f(0.86) + 1.4), qx = sx + u * 70, qy = sy - u * 40; for (let i = 0; i < 4; i++) R.disco(Math.round(qx - 12 - i * 5), Math.round(qy - 10 - i * 2 + Math.sin(t * 6 + i)), 2 - (i > 1 ? 1 : 0), hex('#5a5a62')); for (const dx of [-14, 12]) { R.pset(Math.round(qx + dx), Math.round(qy - 8), K); R.pset(Math.round(qx + dx + 1), Math.round(qy - 9), K); } } }
};
const efectos = [[0.3, 'puerta'], [FLUTE, 'pop'], [DRAGON + 0.1, 'vapor'], [CHARLIE - 0.3, 'whoosh'], [UP, 'golpecito'], [f(0.86), 'pop'], [TALLEST, 'whoosh']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: (t) => (t < P2 ? 1991 : 1992) });
''')
