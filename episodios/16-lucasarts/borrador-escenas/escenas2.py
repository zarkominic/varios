E = {}

E['la-maniac'] = ('Maniac Mansion', '''// LA-MANIAC (frases 7–8), 1987, cartela «1987». Cuatro planos:
// 1. el estudio de 1987: el programador de gafas entra con su taza, la deja en la mesa y se pone a teclear; en
//    «Ron Gilbert» señala su monitor y sonríe; la diseñadora teclea en la máquina de escribir y otro cruza con disquetes;
// 2. inserto de la mesa: la mano en el ratón; el código compila con su barra; en «finish» hace clic y la pantalla de
//    fósforo pasa al juego (la mansión de noche en píxeles gordos); en «horror» un relámpago; en «laughs» un tentáculo
//    asoma por el tejado y la luna se ríe;
// 3. la mansión de 1987 de noche, el porche: tres chavales (cámara, radiocasete, linterna) suben la escalinata a
//    hurtadillas; la primera llama, en «sneaks» la puerta se abre sola con luz verde y se cuelan uno a uno;
// 4. el pasillo: los chavales entran en fila; en «Fred» el científico salta de su puerta; en «friend» se oye a la amiga
//    tras la puerta cerrada; en «each one plays differently» el flash de la cámara, la música de la radio (el científico
//    baila) y la linterna que alumbra la puerta.''', r'''
const a = (f) => en('maniac', f), b = (f) => en('chavales', f);
const P2 = a(0.415), P3 = a(0.878), P4 = b(0.361);
const progr = a(0.246), gilbert = a(0.314), acaba = a(0.559), horror = a(0.76), risa = a(0.804), raros = a(0.941);
const chicos = b(0.061), cuela = b(0.129), fred = b(0.534), amiga = b(0.645), cada = b(0.765), juega = b(0.823), distinto = b(0.894);
const { rect, pset } = R, K = T.C.k;
const mez = (c, d, u) => { const ch = (s) => Math.round(((c >>> s) & 255) * (1 - u) + ((d >>> s) & 255) * u); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };
const bay = (x, y) => [0, 0.5, 0.75, 0.25][(y & 1) * 2 + (x & 1)];
// los cacharros de los chavales, en la mano: la cámara de fotos, el radiocasete y la linterna
const camara = (x, y) => { rect(x - 4, y - 3, x + 4, y + 3, K); rect(x - 3, y - 2, x + 3, y + 2, hex('#3a3a46')); rect(x - 3, y - 2, x + 3, y - 2, hex('#6a6a7a')); R.disco(x, y, 1.6, hex('#8ad8ff')); pset(x, y, K); rect(x + 1, y - 5, x + 3, y - 3, K); pset(x + 2, y - 4, hex('#e8e8f0')); pset(x - 2, y - 1, hex('#f04a3a')); };
const radio = (x, y, t, suena) => { const v = suena ? Math.round(Math.sin(t * 30)) : 0; rect(x - 7, y - 4, x + 7, y + 3, K); rect(x - 6, y - 3, x + 6, y + 2, hex('#8a8e9a')); rect(x - 6, y - 3, x + 6, y - 3, hex('#b8bcc8'));
  R.disco(x - 3, y, 2 + (v > 0 ? 0.5 : 0), K); R.disco(x + 3, y, 2 + (v < 0 ? 0.5 : 0), K); pset(x - 3, y, hex('#c8ccd8')); pset(x + 3, y, hex('#c8ccd8')); rect(x - 1, y - 2, x + 1, y - 2, hex('#f04a3a')); rect(x - 5, y - 6, x + 5, y - 5, K); pset(x - 5, y - 4, K); pset(x + 5, y - 4, K); };
const linterna = (x, y, dir) => { rect(x - 4, y - 1, x + 4, y + 1, K); rect(x - 3, y, x + 3, y, hex('#c83a3a')); const cx = dir > 0 ? x + 5 : x - 5; rect(cx - 1, y - 2, cx + 1, y + 2, K); pset(cx, y - 1, hex('#fff0a0')); pset(cx, y, hex('#fff0a0')); pset(cx, y + 1, hex('#fff0a0')); };
const taza = (x, y) => { rect(x - 3, y - 4, x + 3, y + 1, K); rect(x - 2, y - 3, x + 2, y, hex('#e8e2d2')); rect(x - 2, y - 3, x + 2, y - 3, hex('#5a3418')); rect(x + 4, y - 3, x + 5, y - 1, K); };
const disquetes = (x, y) => { for (let k = 0; k < 4; k++) { const c = [hex('#c83a3a'), hex('#3a6ab8'), hex('#3a3a4a'), hex('#e8c040')][k], yy = y - k * 2; rect(x - 5, yy - 2, x + 5, yy, K); rect(x - 4, yy - 1, x + 4, yy - 1, c); pset(x + 2, yy - 1, hex('#f2eee2')); } };

// 1 · el estudio de 1987
const p1 = (t) => {
  T.estudio(R, t, { encuadre: 'oficina', anyo: 1987 });
  const tec = Math.floor(t * 8) % 2;
  // la diseñadora teclea en la máquina de escribir de la mesa C; levanta la vista y sonríe cuando el otro señala
  R.actor(EL.disenadora, 198, 152, t, { dir: 1, sostiene: t > gilbert + 0.2 && t < gilbert + 1.1 ? undefined : [224, 126 + tec], sonrisa: t > gilbert + 0.2, quieto: false });
  // el programador entra por la derecha con su taza: cruza por delante de las mesas y sube hasta su puesto (mesa B)
  const u1 = tramo(t, 0.5, 3.1), u2 = tramo(t, 3.1, 3.8), anda = (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1);
  const x = Math.round(u2 > 0 ? lerp(112, 92, u2) : lerp(330, 112, u1)), y = Math.round(u2 > 0 ? lerp(170, 152, u2) : 170);
  const sentado = t > 3.8, dejada = t > 4.1, señala = t > gilbert && t < gilbert + 1.1;
  if (dejada) taza(116, 122);
  const r = R.actor(EL.disenador, x, y, t, { dir: sentado ? 1 : -1, anda, sostiene: !dejada ? true : señala ? undefined : [120 + tec * 3, 127 + tec], dedo: señala, sonrisa: señala || t > gilbert + 1.1, habla: señala && Math.sin(t * 9) > 0 });
  if (!dejada) taza(r.mano[0] + (sentado ? 2 : -1), r.mano[1] + 1);
  // en primer término, un compañero cruza con una pila de disquetes
  const u3 = tramo(t, 1.2, 6.4); if (u3 > 0 && u3 < 1) { const q = R.actor(EL.disenador2, Math.round(lerp(-20, 330, u3)), 176, t, { dir: 1, anda: true, sostiene: true }); disquetes(q.mano[0] + 1, q.mano[1] + 1); }
};

// 2 · inserto: la mano en el ratón, el código que compila y, con el clic, el juego
const FOS = ['#03100a', '#08281a', '#0e4a26', '#1e7a3a', '#3ac868', '#8af0a8', '#e0ffe8'].map(hex);
const pantallaJuego = (R, x0, y0, x1, y1, t) => {
  const cl = [x0 + 1, y0 + 1, x1 - 1, y1 - 1], H = cl[3] - cl[1];
  const r = (a0, b0, a1, b1, c) => { const A = Math.max(a0, cl[0]), B = Math.max(b0, cl[1]), C2 = Math.min(a1, cl[2]), D = Math.min(b1, cl[3]); if (A <= C2 && B <= D) rect(A, B, C2, D, c); };
  const u = tramo(t, acaba + 0.05, acaba + 0.55), yW = cl[1] + Math.round(u * (H + 1));
  // el código: renglones de rayitas que suben, el cursor que parpadea y la barra de compilar
  if (u < 1) { r(cl[0], yW, cl[2], cl[3], FOS[0]); const sc = t * 7, base = Math.floor(sc);
    for (let l = -1; l < 15; l++) { const n = base + l, yy = Math.round(cl[1] + 3 + l * 5 - (sc - base) * 5); if (yy < yW || yy > cl[3] - 12) continue;
      let xx = cl[0] + 4 + Math.floor(((n * 7919) % 5)) * 6; const piezas = 2 + ((n * 31) % 4);
      for (let p = 0; p < piezas && xx < cl[2] - 8; p++) { const w = 6 + ((n * 13 + p * 17) % 22); r(xx, yy, Math.min(xx + w, cl[2] - 6), yy + 1, p === 0 ? FOS[5] : (n + p) % 3 ? FOS[4] : FOS[3]); xx += w + 4; } }
    const pb = tramo(t, P2, acaba), bx0 = cl[0] + 12, bx1 = cl[2] - 12, by = cl[3] - 9;
    if (by >= yW) { r(bx0 - 1, by - 1, bx1 + 1, by + 5, FOS[4]); r(bx0, by, bx1, by + 4, FOS[0]); r(bx0 + 1, by + 1, bx0 + 1 + Math.round((bx1 - bx0 - 2) * pb), by + 3, FOS[5]); if (Math.floor(t * 3) % 2) r(cl[2] - 8, by - 9, cl[2] - 5, by - 4, FOS[5]); } }
  if (yW <= cl[1]) return;
  R.recorte([cl[0], cl[1], cl[2], Math.min(cl[3], yW - 1)]);
  const flash = (t > horror && t < horror + 0.12) || (t > horror + 0.22 && t < horror + 0.34), hz = cl[1] + 52;
  // el cielo tramado de fósforo con estrellas; la luna (que se ríe en «laughs»)
  for (let yy = cl[1]; yy < Math.min(hz, yW); yy++) for (let xx = cl[0]; xx <= cl[2]; xx++) pset(xx, yy, flash ? (bay(xx, yy) < 0.5 ? FOS[6] : FOS[5]) : ((yy - cl[1]) / 52 + bay(xx >> 1, yy >> 1) * 0.5 > 0.7 ? FOS[1] : FOS[0]));
  if (!flash) for (let k = 0; k < 22; k++) { const sx = cl[0] + ((k * 53) % 178), sy = cl[1] + 2 + ((k * 29) % 36); if (Math.sin(t * 3 + k * 1.7) > -0.3) { r(sx, sy, sx, sy, FOS[k % 3 ? 4 : 6]); } }
  const lx = cl[0] + 148, ly = cl[1] + 15; R.disco(lx, ly, 8, flash ? FOS[6] : FOS[5]); R.disco(lx + 2, ly - 2, 2, FOS[4]); R.disco(lx - 3, ly + 3, 1.5, FOS[4]);
  if (t > risa) { const ab = Math.sin(t * 14) > 0 ? 1 : 0; r(lx - 4, ly - 3, lx - 3, ly - 2, FOS[1]); r(lx + 2, ly - 3, lx + 3, ly - 2, FOS[1]); r(lx - 4, ly + 2, lx + 4, ly + 2 + ab, FOS[1]); pset(lx - 5, ly + 1, FOS[1]); pset(lx + 5, ly + 1, FOS[1]); }
  // los murciélagos que cruzan
  for (let k = 0; k < 3; k++) { const bx = cl[0] + ((t * (14 + k * 5) + k * 60) % 200) - 10, byy = cl[1] + 10 + k * 9 + Math.round(Math.sin(t * 4 + k) * 2), al = Math.sin(t * 16 + k) > 0 ? -1 : 1; r(bx - 2, byy + al, bx - 1, byy + al, FOS[0]); r(bx, byy, bx, byy + 1, FOS[0]); r(bx + 1, byy + al, bx + 2, byy + al, FOS[0]); }
  // la colina y la mansión en píxeles gordos (de 2 px): cuerpo, torre torcida, torrecilla, tejados, ventanas encendidas
  const S = flash ? FOS[0] : FOS[2], SL = flash ? FOS[0] : FOS[3], mx = cl[0] + 56, my = hz;
  R.poligono([[cl[0], my + 2], [cl[0] + 40, my - 6], [cl[0] + 130, my - 6], [cl[2], my + 4], [cl[2], cl[3]], [cl[0], cl[3]]], flash ? FOS[1] : FOS[1]);
  for (let xx = cl[0]; xx <= cl[2]; xx += 2) for (let yy = my - 4; yy <= cl[3]; yy += 2) if (((xx * 7 + yy * 13) % 11) === 0) r(xx, yy, xx + 1, yy + 1, FOS[2]);
  r(mx, my - 30, mx + 70, my - 4, S); r(mx + 2, my - 28, mx + 68, my - 28, SL);
  R.poligono([[mx - 4, my - 30], [mx + 35, my - 46], [mx + 74, my - 30]], S); R.poligono([[mx + 4, my - 46], [mx + 10, my - 64], [mx + 16, my - 46]], S); r(mx + 4, my - 46, mx + 16, my - 30, S);
  R.poligono([[mx + 54, my - 36], [mx + 60, my - 52], [mx + 66, my - 36]], S); r(mx + 55, my - 36, mx + 65, my - 30, S); r(mx + 36, my - 52, mx + 40, my - 42, S);
  if (!flash) for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) { const wx = mx + 6 + i * 11, wy = my - 25 + j * 11, on = (i * 3 + j * 5 + Math.floor(t * 0.7)) % 7 !== 0; r(wx, wy, wx + 4, wy + 5, on ? FOS[5] : FOS[1]); if (on && (i + j) % 3 === 0) r(wx + 1, wy + 2, wx + 3, wy + 5, FOS[3]); }
  if (!flash) { r(mx + 8, my - 42, mx + 11, my - 38, FOS[6]); r(mx + 31, my - 11, mx + 39, my - 4, FOS[0]); r(mx + 32, my - 10, mx + 38, my - 4, FOS[4]); }
  // en «laughs», un tentáculo asoma por detrás del tejado, bota y saluda
  if (t > risa - 0.1) { const v = tramo(t, risa - 0.1, risa + 0.3), bo = Math.round(Math.abs(Math.sin((t - risa) * 9)) * 3 * (t < risa + 1.2 ? 1 : 0.3)), tx = mx + 24, ty = my - 40 - Math.round(v * 14) - bo;
    r(tx - 3, ty, tx + 3, my - 38, FOS[0]); r(tx - 2, ty + 1, tx + 2, my - 38, FOS[5]); r(tx - 2, ty + 1, tx - 2, my - 38, FOS[6]); r(tx - 2, ty + 3, tx - 1, ty + 4, FOS[0]); r(tx + 1, ty + 3, tx + 2, ty + 4, FOS[0]); r(tx - 1, ty + 7, tx + 1, ty + 7, FOS[0]); }
  // los rayos del relámpago
  if (flash) { let px0 = cl[0] + 110, py0 = cl[1]; for (let k = 0; k < 6; k++) { const nx = px0 + ((k * 37) % 13) - 6, ny = py0 + 7; R.linea(px0, py0, nx, ny, FOS[6]); R.linea(px0 + 1, py0, nx + 1, ny, FOS[5]); px0 = nx; py0 = ny; } }
  // el sendero con los tres chavales diminutos que se acercan
  for (let k = 0; k < 3; k++) { const kx = cl[0] + 10 + Math.round(tramo(t, acaba + 0.5, P3) * 40) + k * 7, ky = cl[3] - 6 - k; r(kx, ky - 5, kx + 2, ky, flash ? FOS[0] : FOS[5]); r(kx, ky - 7, kx + 2, ky - 6, flash ? FOS[0] : FOS[6]); }
  R.recorte(null);
};
const p2 = (t) => {
  T.estudio(R, t, { encuadre: 'oficina', camara: 'mesa', pantalla: pantallaJuego, raton: false });
  // el ratón y la mano que lo lleva; en «finish», el clic
  const clic = t > acaba && t < acaba + 0.25, dx = Math.round(Math.sin(t * 1.3) * 3 + tramo(t, P2, acaba) * -4), mx = 280 + dx;
  rect(mx, 144, mx + 11, 157, K); rect(mx + 1, 145, mx + 10, 156, hex('#e8e0c8')); rect(mx + 1, 145, mx + 10, 148, clic ? hex('#8a8272') : hex('#f6f0dc')); rect(mx + 5, 145, mx + 5, 149, K); rect(mx + 1, 149, mx + 10, 149, hex('#c8c0a8'));
  R.linea(mx + 5, 143, mx + 2, 132, hex('#3a3a3a'));
  T.brazo(R, 326, 196, mx + 13, 153 + (clic ? 1 : 0), '#8a3a3a', -1, { codo: [318, 176] });
  if (t > acaba && t < acaba + 0.4) { const rr = 3 + (t - acaba) * 30; for (let k = 0; k < 10; k++) { const an = k * 0.628; pset(Math.round(mx + 3 + Math.cos(an) * rr), Math.round(146 + Math.sin(an) * rr * 0.6), hex('#fff0a0')); } }
};

// 3 · la fachada de 1987 de noche, el porche: los chavales se cuelan
const p3 = (t) => {
  const g = T.mansion(R, t, { encuadre: 'fachada', camara: 'puerta', anyo: 1987, luz: 'noche' });
  const [dx0, dy0, dx1, dy1] = g.puerta, ab = tramo(t, cuela, cuela + 0.8);
  if (ab > 0) { // la puerta se abre sola hacia dentro: el interior oscuro con la luz verde que late, las dos hojas que se estrechan
    const late = 0.5 + Math.sin(t * 5) * 0.2;
    for (let yy = dy0 + 1; yy <= dy1; yy++) for (let xx = dx0 + 1; xx <= dx1 - 1; xx++) { const q = (yy - dy0) / (dy1 - dy0), c = q * late + bay(xx, yy) * 0.25 > 0.5 ? hex('#1e5a2a') : q * late + bay(xx, yy) * 0.25 > 0.3 ? hex('#0e2a16') : hex('#06120a'); pset(xx, yy, c); }
    const w = Math.round((dx1 - dx0) / 2 * (1 - ab * 0.75)), mid = Math.round((dx0 + dx1) / 2);
    for (const [e0, e1] of [[dx0 + 1, dx0 + w], [dx1 - w, dx1 - 1]]) { rect(e0, dy0 + 1, e1, dy1, hex('#4a2418')); rect(e0, dy0 + 1, e1, dy0 + 2, hex('#6a3a24')); for (let yy = dy0 + 6; yy < dy1 - 2; yy += 9) rect(e0 + 1, yy, e1 - 1, yy, hex('#2a140c')); }
    for (let yy = dy1 + 1; yy <= dy1 + 14; yy++) { const half = Math.round((mid - dx0) * ab * (1 + (yy - dy1) * 0.08)); for (let xx = mid - half; xx <= mid + half; xx++) if (bay(xx, yy) < 0.5 - (yy - dy1) * 0.03) { const c = R.pget(xx, yy); if (c) pset(xx, yy, mez(c, hex('#6ae87a'), 0.35)); } }
  }
  // los tres chavales: suben la escalinata a hurtadillas, la primera llama y, abierta la puerta, se cuelan uno a uno
  const mid = Math.round((dx0 + dx1) / 2) - 7, ys = dy1, quien = [
    { d: EL.chicaRara, x0: -20, xp: 132, t0: P3 + 0.1, sube: chicos - 0.6, espera: mid, entra: cuela + 0.7, cosa: 'camara' },
    { d: EL.roquero, x0: -40, xp: 120, t0: P3 + 0.6, sube: chicos - 0.1, espera: mid - 20, entra: cuela + 1.4, cosa: 'radio' },
    { d: EL.empollon, x0: 340, xp: 196, t0: P3 + 0.4, sube: chicos + 0.2, espera: mid + 22, entra: cuela + 1.9, cosa: 'linterna' }];
  const pintar = [];
  for (const q of quien) {
    const u1 = tramo(t, q.t0, q.sube), u2 = tramo(t, q.sube, q.sube + 1.1), u3 = tramo(t, q.entra, q.entra + 0.5), u4 = tramo(t, q.entra + 0.5, q.entra + 0.9);
    let x = lerp(q.x0, q.xp, u1), y = 176, dir = q.x0 < 0 ? 1 : -1;
    if (u2 > 0) { x = lerp(q.xp, q.espera, u2); y = lerp(176, ys, u2); }
    if (u3 > 0) { x = lerp(q.espera, mid, u3); y = ys; dir = q.espera < mid ? 1 : -1; }
    if (u4 >= 1) continue;
    const anda = (u1 > 0 && u1 < 1) || (u2 > 0 && u2 < 1) || (u3 > 0 && u3 < 1) || (u4 > 0);
    const mira = !anda && Math.sin(t * 2.2 + q.xp) > 0.2;
    pintar.push({ q, x: Math.round(x), y: Math.round(y), dir: anda ? dir : mira ? -dir : dir, anda, u4 });
  }
  pintar.sort((p, q) => p.y - q.y);
  for (const p of pintar) {
    const llama = p.q.cosa === 'camara' && t > chicos && t < cuela - 0.05, shh = p.q.cosa === 'radio' && t > chicos + 0.3 && t < cuela + 1;
    const r = R.actor(p.q.d, p.x, p.y, t, { dir: llama ? 1 : p.dir, anda: p.anda, sostiene: llama ? [mid + 12, p.y - 14 + (Math.floor(t * 8) % 2) * 2] : true, dedo: shh && !p.anda, sorpresa: t > cuela && t < cuela + 0.6 });
    if (!llama) { if (p.q.cosa === 'camara') camara(r.mano[0], r.mano[1]); else if (p.q.cosa === 'radio') radio(r.mano[0], r.mano[1], t, false); else linterna(r.mano[0], r.mano[1], p.dir); }
    if (p.u4 > 0) for (let yy = p.y - 30; yy <= p.y; yy++) for (let xx = p.x - 4; xx <= p.x + 20; xx++) if (xx > dx0 && xx < dx1 && yy > dy0 && yy <= dy1) { const c = R.pget(xx, yy); if (c) pset(xx, yy, mez(c, hex('#06120a'), Math.min(1, p.u4 * 1.3))); }
  }
  if (t > chicos && t < cuela - 0.1) R.bocadillo(mid + 18, dy0 + 18, { icono: '?' });
};

// 4 · el pasillo: el científico, la amiga encerrada y cada chaval con su cacharro
const p4 = (t) => {
  const g = T.mansion(R, t, { encuadre: 'pasillo', anyo: 1987 });
  const s = g.suelo;
  // la luz verde que sale de la puerta entreabierta del científico
  if (t > fred - 0.5 && t < fred + 0.4) { const v = Math.sin(t * 40) > 0; for (let yy = 70; yy < s; yy++) for (let xx = 52; xx < 52 + (yy - 60) * 0.6; xx++) if (v && bay(xx, yy) < 0.5) { const c = R.pget(xx, yy); if (c) pset(xx, yy, mez(c, hex('#6ae87a'), 0.4)); } }
  // los chavales entran en fila por la derecha y se paran en seco
  const fila = [[EL.chicaRara, 172, 0, 'camara'], [EL.roquero, 200, 0.35, 'radio'], [EL.empollon, 230, 0.7, 'linterna']];
  const sx = 34, sal = tramo(t, fred - 0.15, fred + 0.25), baila = t > juega + 0.1, deslumbra = t > cada + 0.05 && t < cada + 0.9;
  for (const [d, xf, dt, cosa] of fila) {
    const u = tramo(t, P4 + dt, fred - 0.2 + dt * 0.5), x = Math.round(lerp(340 + dt * 30, xf, u)), anda = u > 0 && u < 1;
    let sost = true, dir = -1, dedo = false;
    if (cosa === 'camara' && t > amiga - 0.3 && t < cada - 0.1) { sost = undefined; dedo = true; }
    if (cosa === 'camara' && t > cada - 0.1 && t < cada + 0.7) sost = [x - 3, s - 20];
    if (cosa === 'radio' && t > juega - 0.1) sost = [x - 2, s - 21];
    if (cosa === 'linterna' && t > distinto - 0.1) sost = [x - 4, s - 15];
    const r = R.actor(d, x, s, t, { dir, anda, sostiene: sost, dedo, sorpresa: t > fred && t < fred + 0.9, sonrisa: t > cada + 0.9 });
    if (sost) { if (cosa === 'camara') camara(r.mano[0], r.mano[1]); else if (cosa === 'radio') radio(r.mano[0], r.mano[1], t, t > juega); else linterna(r.mano[0], r.mano[1], -1); }
    if (t > fred + 0.1 && t < fred + 0.8) R.bocadillo(x + 8, s - 30, { icono: '!' });
    // el flash de la cámara
    if (cosa === 'camara' && t > cada && t < cada + 0.18) { R.disco(r.mano[0] - 2, r.mano[1] - 2, 9, hex('#ffffff')); for (let k = 0; k < 8; k++) { const an = k * 0.785; R.linea(r.mano[0] - 2, r.mano[1] - 2, Math.round(r.mano[0] - 2 + Math.cos(an) * 22), Math.round(r.mano[1] - 2 + Math.sin(an) * 22), hex('#fff8c8')); } }
    // las notas de la radio, que suben haciendo eses
    if (cosa === 'radio' && t > juega) for (let k = 0; k < 5; k++) { const w = ((t - juega) * 0.8 + k / 5) % 1, nx = Math.round(r.mano[0] - 4 - w * 40 + Math.sin(w * 9 + k) * 3), ny = Math.round(r.mano[1] - 6 - w * 34); if (t - juega < k * 0.2) continue;
      const c = [hex('#f0c040'), hex('#f08ac8'), hex('#8ad8ff')][k % 3]; rect(nx, ny - 5, nx, ny, K); R.disco(nx - 1, ny + 1, 1.6, K); pset(nx - 1, ny + 1, c); rect(nx + 1, ny - 5, nx + 2, ny - 4, K); }
    // el haz de la linterna, tramado, hasta la puerta cerrada
    if (cosa === 'linterna' && t > distinto) { const lx = r.mano[0] - 5, ly = r.mano[1], v = tramo(t, distinto, distinto + 0.3);
      for (let xx = Math.round(lerp(lx, 150, v)); xx < lx; xx++) { const q = (lx - xx) / (lx - 150), half = 2 + q * 30; for (let yy = Math.round(ly - half - q * 20); yy <= ly + half - q * 20; yy++) if (bay(xx, yy) < 0.5) { const c = R.pget(xx, yy); if (c) pset(xx, yy, mez(c, hex('#fff4b0'), 0.45)); } } }
  }
  // el científico salta de su puerta; deslumbrado por el flash; con la música se pone a bailar
  if (t > fred - 0.25) {
    const x = Math.round(lerp(18, sx, sal)), bote = baila ? Math.round(Math.abs(Math.sin(t * 9)) * 4) : Math.round(Math.sin(sal * Math.PI) * 6);
    R.actor(EL.cientifico, x, s, t, { dir: baila ? (Math.floor(t * 3) % 2 ? 1 : -1) : 1, salto: bote, enfado: t < cada, brazos: t > fred && t < fred + 0.6 || deslumbra, sorpresa: deslumbra, sonrisa: baila, dedo: t > fred + 0.6 && t < cada });
    if (deslumbra) for (let k = 0; k < 3; k++) { const an = t * 8 + k * 2.1; pset(Math.round(x + 7 + Math.cos(an) * 8), Math.round(s - 30 + Math.sin(an) * 3), hex('#fff0a0')); }
  }
  // la amiga encerrada tras la puerta de las tablas: la puerta tiembla y sale un «!»
  if (t > amiga - 0.3 && t < amiga + 1.2) { R.bocadillo(160, 52 + Math.round(Math.sin(t * 12)), { icono: '!' }); if (Math.sin(t * 30) > 0) { rect(140, 70, 141, 74, hex('#e8e0c8')); rect(179, 90, 180, 94, hex('#e8e0c8')); } }
};
const efectos = [[0.3, 'tecleo'], [4.3, 'golpecito'], [P2 + 0.3, 'tecleo'], [acaba, 'bip'], [horror, 'trueno'], [risa, 'boing'], [chicos, 'toc'], [cuela, 'puerta'], [fred, 'boing'], [amiga, 'golpecito'], [cada + 0.02, 'flash'], [distinto, 'interruptor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { cartela: '1987', efectos, año: 1987 });
''')

E['la-scumm'] = ('SCUMM', '''// LA-SCUMM (frases 9–11). Cinco planos:
// 1. la pizarra del estudio: el diseñador explica y en la pizarra aparecen los verbos en pictogramas («a tool called
//    SCUMM»); «instead of typing on the keyboard»: un teclado dibujado y, en «keyboard», tachado en rojo; los
//    compañeros se ríen; al final, las flechas a una pantalla con su línea de verbos;
// 2. la pantalla del ordenador de la mansión: un cuarto del juego con el chaval; el cursor baja a la línea de verbos,
//    pulsa «abrir» en «open» y luego la puerta en «the objects»: la puerta se abre, asoma el tentáculo y el chaval va;
// 3. el corcho de la sala de reuniones: el equipo se ríe en «joke»; clavan una tira con los cinco pictogramas de la
//    palabra, uno por cada palabra de «Script Creation Utility for Maniac Mansion»; el «?» de la diseñadora se vuelve
//    una sonrisa en «Mansion»;
// 4. la fila de siete disquetes de juegos distintos con la misma línea de verbos: el cursor pulsa el verbo de cada uno,
//    la barra del año corre de 1987 a 1997 y en «10» salta un «10»;
// 5. tres disquetes de cerca: en «row of verbs» los tres verbos se encienden a la vez, en ola; en «LucasArts'
//    signature» cae el sello dorado de la casa sobre cada uno y brillan.''', r'''
const a = (f) => en('scumm', f), b = (f) => en('nombre', f), c = (f) => en('firma', f);
const P2 = a(0.548), P3 = b(0), P4 = b(0.688), P5 = c(0);
const invento = a(0.118), scumm = a(0.205), envez = a(0.308), teclado = a(0.458), verbo = a(0.608), abrir = a(0.762), coger = a(0.818), objeto = a(0.925);
const broma = b(0.064), risa = b(0.1), significa = b(0.219), w1 = b(0.312), w2 = b(0.347), w3 = b(0.413), w4 = b(0.483), w5 = b(0.569), diez = b(0.897);
const fila = c(0.167), casa = c(0.376), firma = c(0.643);
const { rect, pset } = R, K = T.C.k;
const mez = (c1, d, u) => { const ch = (s) => Math.round(((c1 >>> s) & 255) * (1 - u) + ((d >>> s) & 255) * u); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };
const ruta = (t, kf) => { if (t <= kf[0][0]) return kf[0].slice(1); for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const [t0, x0, y0] = kf[i - 1], [t1, x1, y1] = kf[i], u = (t - t0) / (t1 - t0), e = u * u * (3 - 2 * u); return [lerp(x0, x1, e), lerp(y0, y1, e)]; } return kf[kf.length - 1].slice(1); };
const centro = (bt) => [(bt[0] + bt[2]) / 2, (bt[1] + bt[3]) / 2];

// 1 · la pizarra: los verbos, el teclado tachado y la pantalla
const tecladoPizarra = (t) => { // un teclado dibujado a rotulador (x 90–118, y 58–76) que se tacha en «keyboard»
  const u = tramo(t, envez, envez + 1.0), col = hex('#1c1222'), n = Math.floor(u * 40);
  const pts = []; for (let i = 90; i <= 118; i++) pts.push([i, 60]); for (let j = 60; j <= 74; j++) pts.push([118, j]); for (let i = 118; i >= 90; i--) pts.push([i, 74]); for (let j = 74; j >= 60; j--) pts.push([90, j]);
  const m = Math.floor(u * pts.length); for (let k = 0; k < m; k++) pset(pts[k][0], pts[k][1], col);
  if (u > 0.6) for (let f = 0; f < 3; f++) for (let i = 0; i < 6; i++) if ((f * 6 + i) < (u - 0.6) * 45) rect(93 + i * 4 + (f === 1 ? 1 : 0), 63 + f * 3, 94 + i * 4 + (f === 1 ? 1 : 0), 64 + f * 3, col);
  if (u > 0.9) rect(98, 72, 110, 72, col);
  const x = tramo(t, teclado - 0.05, teclado + 0.35), rojo = hex('#d8282a');
  if (x > 0) { const l = Math.round(x * 32); for (let k = 0; k < l; k++) { const px = 87 + k, py1 = 56 + Math.round(k * 0.66), py2 = 78 - Math.round(k * 0.66); for (let d = 0; d < 2; d++) { pset(px, py1 + d, rojo); if (x > 0.5) pset(px, py2 + d, rojo); } } }
};
// en primer término: a la izquierda, el mueble bajo con el ordenador de pruebas (en su pantalla, la línea de verbos en
// miniatura y el cursor que va y viene), manuales y una taza; a la derecha, una caja de cartón con disquetes y cables
const delante1 = (t) => {
  const MAD = [hex('#5a3418'), hex('#7a4a24'), hex('#9a6234'), hex('#b47a44')];
  rect(0, 150, 86, 179, K); rect(1, 151, 85, 179, MAD[1]); rect(1, 151, 85, 153, MAD[3]); rect(1, 154, 85, 154, MAD[0]);
  for (let y = 156; y < 180; y++) for (let x = 2; x < 85; x++) if (Math.sin(x * 0.3 + y * 0.9 + Math.sin(y * 0.4) * 3) > 0.85) pset(x, y, MAD[0]);
  for (const dx of [6, 46]) { rect(dx, 160, dx + 34, 176, K); rect(dx + 1, 161, dx + 33, 175, MAD[2]); rect(dx + 14, 166, dx + 20, 167, hex('#d8c070')); }
  // el ordenador: la CPU beige y el monitor con su pantalla de fósforo
  rect(8, 138, 52, 150, K); rect(9, 139, 51, 149, hex('#d8d0b8')); rect(9, 139, 51, 140, hex('#f0e8d0')); rect(30, 143, 46, 145, K); pset(14, 144, Math.floor(t * 3) % 2 ? hex('#f04a3a') : hex('#5a2a24'));
  rect(12, 110, 48, 138, K); rect(13, 111, 47, 137, hex('#e0d8c0')); rect(13, 111, 47, 112, hex('#f8f0dc')); rect(16, 114, 44, 132, K);
  for (let y = 115; y < 132; y++) for (let x = 17; x < 44; x++) pset(x, y, (y % 2) ? hex('#08281a') : hex('#0a2e1e'));
  T.verbos(R, t, { caja: [17, 125, 43, 131], paleta: 'fosforo', activo: Math.floor(t * 1.5) % 9 });
  const cx = 30 + Math.round(Math.sin(t * 1.3) * 9), cy = 119 + Math.round(Math.cos(t * 1.7) * 3); pset(cx, cy, hex('#d8ffe0')); pset(cx - 1, cy, hex('#5af08a')); pset(cx + 1, cy, hex('#5af08a')); pset(cx, cy - 1, hex('#5af08a')); pset(cx, cy + 1, hex('#5af08a'));
  // los manuales apilados y la taza que humea
  for (let k = 0; k < 4; k++) { const c = [hex('#c83a3a'), hex('#3a6ab8'), hex('#e8c040'), hex('#3a8a4a')][k], y = 146 - k * 4; rect(56 + (k % 2), y - 3, 80 - (k % 2), y, K); rect(57 + (k % 2), y - 2, 79 - (k % 2), y - 1, c); rect(57 + (k % 2), y - 2, 59 + (k % 2), y - 1, hex('#f2eee2')); }
  rect(64, 126, 72, 134, K); rect(65, 127, 71, 133, hex('#f2eee2')); rect(72, 128, 74, 131, K); for (let k = 0; k < 3; k++) { const v = (t * 0.7 + k / 3) % 1; pset(Math.round(68 + Math.sin(v * 6 + k) * 2), Math.round(124 - v * 12), v > 0.5 ? hex('#c8c0b0') : hex('#f2eee2')); }
  // la caja de cartón con disquetes y un cable enrollado
  rect(226, 158, 272, 179, K); rect(227, 159, 271, 179, hex('#c8945a')); rect(227, 159, 271, 161, hex('#e0b07a')); rect(248, 159, 250, 179, hex('#a8743c')); for (let k = 0; k < 9; k++) { const c = [hex('#c83a3a'), hex('#3a6ab8'), hex('#3a3a4a'), hex('#e8c040')][k % 4]; rect(230 + k * 4, 151 + (k % 3), 233 + k * 4, 159, K); rect(231 + k * 4, 152 + (k % 3), 232 + k * 4, 158, c); }
  R.poligono([[226, 159], [216, 152], [222, 150], [228, 158]], hex('#b48450'));
  for (let k = 0; k < 3; k++) { R.disco(292, 172, 8 - k * 2.5, K); R.disco(292, 172, 7 - k * 2.5, hex('#3a3a46')); } R.linea(298, 168, 318, 150, hex('#3a3a46'));
};
const p1 = (t) => {
  const tr = (5 / 9) * tramo(t, invento - 0.3, envez - 0.1) + (3 / 9) * tramo(t, teclado + 0.3, P2 - 0.05);
  T.estudio(R, t, { encuadre: 'pizarra', trazo: tr, sonrisa: 0, hoja: Math.min(0.95, 0.15 + t * 0.12) });
  tecladoPizarra(t);
  // el diseñador explica: señala la pizarra y habla; se gira a los compañeros cuando tacha el teclado
  const xD = Math.round(lerp(100, 136, tramo(t, envez - 0.4, envez + 0.4))), mira = t > teclado + 0.1 && t < teclado + 0.9;
  R.actor(EL.disenador, xD, 152, t, { dir: mira ? -1 : 1, dedo: !mira && t > 0.6, habla: Math.sin(t * 8) > 0 && t > 0.5 && t < P2 - 0.2, sonrisa: mira });
  // la diseñadora mira, se sorprende con el tachón y se ríe; el compañero escribe a máquina al fondo
  const ri = t > teclado + 0.1 && t < teclado + 0.8;
  R.actor(EL.disenadora, 196, 152, t, { dir: -1, sorpresa: t > teclado - 0.05 && t < teclado + 0.15, sonrisa: t > teclado + 0.15, salto: ri ? Math.round(Math.abs(Math.sin(t * 14)) * 2) : 0, dedo: t > invento && t < scumm + 0.6 });
  const tec = Math.floor(t * 7) % 2; R.actor(EL.disenador2, 250, 152, t, { dir: 1, sostiene: ri ? undefined : [266 + tec * 2, 125 + tec], sonrisa: ri, brazos: ri });
  if (ri) R.bocadillo(205, 120, { icono: '!' });
  delante1(t);
};

// 2 · la pantalla del ordenador de la mansión, con la línea de verbos
const sala = (R, t, S) => {
  const [x0, y0, x1] = S, yS = 111, cl = [x0 + 1, y0 + 1, x1 - 1, yS];
  R.recorte(cl);
  // el papel pintado de rayas con flores, el friso de madera y el suelo de tablas
  for (let y = cl[1]; y < 84; y++) for (let x = cl[0]; x <= cl[2]; x++) pset(x, y, (x % 8 === 0) ? hex('#5a2a4a') : ((x + y) % 4 === 0 && (y % 8) < 4) ? hex('#8a4a6a') : hex('#743a5a'));
  for (let x = cl[0] + 4; x <= cl[2]; x += 8) for (let y = cl[1] + 4; y < 80; y += 9) { pset(x, y, hex('#c86a8a')); pset(x - 1, y + 1, hex('#c86a8a')); pset(x + 1, y + 1, hex('#c86a8a')); pset(x, y + 2, hex('#5a8a4a')); }
  for (let y = 84; y < 96; y++) for (let x = cl[0]; x <= cl[2]; x++) pset(x, y, y === 84 ? hex('#c8945a') : (x % 14 === 0) ? hex('#4a2a14') : y < 86 ? hex('#8a5428') : hex('#6a3e1c'));
  for (let y = 96; y <= yS; y++) for (let x = cl[0]; x <= cl[2]; x++) pset(x, y, ((x + (y % 2) * 0) % 24 === (y * 3) % 24) ? hex('#3a2010') : (y % 5 === 0) ? hex('#5a3418') : hex('#7a4a24'));
  // la ventana con la luna y la noche, el retrato, la lámpara de pie y la planta
  rect(60, 32, 92, 70, K); rect(61, 33, 91, 69, hex('#1a2a5a')); for (let k = 0; k < 6; k++) pset(64 + k * 5, 36 + (k * 7) % 20, hex('#f2eee2')); R.disco(84, 42, 5, hex('#f8f0c0')); R.disco(86, 41, 4, hex('#1a2a5a'));
  rect(76, 33, 77, 69, hex('#c8945a')); rect(61, 51, 91, 52, hex('#c8945a')); rect(58, 30, 94, 32, hex('#8a2a2a')); rect(56, 33, 60, 72, hex('#a83a3a')); rect(92, 33, 96, 72, hex('#a83a3a'));
  for (let y = 34; y < 72; y += 3) { pset(58, y, hex('#6a1a1a')); pset(94, y, hex('#6a1a1a')); }
  rect(120, 34, 146, 66, K); rect(121, 35, 145, 65, hex('#c89a3a')); rect(123, 37, 143, 63, hex('#3a4a3a')); R.disco(133, 46, 5, hex('#e8c8a0')); rect(127, 52, 139, 63, hex('#4a2a6a')); pset(131, 45, K); pset(135, 45, K);
  const ojo = Math.round(Math.sin(t * 1.5)); pset(131 + ojo, 45, K); pset(135 + ojo, 45, K);
  rect(160, 60, 161, 95, K); R.poligono([[152, 50], [170, 50], [166, 60], [156, 60]], hex('#e8c060')); if (Math.sin(t * 7) > -0.8) for (let k = 0; k < 6; k++) pset(154 + k * 3, 62 + (k % 2), hex('#f8e8a0'));
  rect(248, 88, 262, 100, K); rect(249, 89, 261, 99, hex('#a8582a')); for (let k = 0; k < 5; k++) R.linea(255, 88, 247 + k * 4, 70 + Math.round(Math.sin(t * 2 + k) * 2), hex('#3a8a3a'));
  R.recorte(null);
};
const p2 = (t) => {
  const vb = { caja: [45, 112, 274, 145] };
  T.mansion(R, t, { encuadre: 'cuarto', camara: 'pantalla', anyo: 1987, pantalla: (R2, t2, S) => {
    sala(R, t, S);
    // la puerta del cuarto (x 190–222): se abre en «the objects»; dentro, luz y el tentáculo morado que saluda
    const ab = tramo(t, objeto + 0.15, objeto + 0.6), dx0 = 190, dx1 = 222, dy0 = 50, dy1 = 99;
    rect(dx0 - 3, dy0 - 3, dx1 + 3, dy1, K); rect(dx0 - 2, dy0 - 2, dx1 + 2, dy1, hex('#c8945a'));
    rect(dx0, dy0, dx1, dy1, hex('#f8f0b0')); for (let y = dy0; y <= dy1; y += 2) for (let x = dx0; x <= dx1; x++) if ((x + y) % 4 === 0) pset(x, y, hex('#e8d880'));
    if (ab > 0.3) T.tentaculo(R, 206, dy1, t, { s: 1, color: 'morado', expresion: 'feliz', brazos: 1, pose: 'saluda', dir: -1 });
    const w = Math.round((dx1 - dx0) * (1 - ab * 0.82));
    rect(dx0, dy0, dx0 + w, dy1, hex('#6a3418')); rect(dx0, dy0, dx0 + w, dy0, hex('#8a4a24')); if (w > 8) { rect(dx0 + 3, dy0 + 4, dx0 + w - 3, dy0 + 20, hex('#5a2a12')); rect(dx0 + 3, dy0 + 26, dx0 + w - 3, dy1 - 5, hex('#5a2a12')); R.disco(dx0 + w - 4, 76, 1.5, hex('#e8c040')); }
    if (ab > 0) for (let y = dy1 + 1; y <= 111; y++) for (let x = dx0 + w; x <= dx1 + (y - dy1) * 1.2; x++) if ((x + y) % 2 === 0) { const c0 = R.pget(x, y); if (c0) pset(x, y, mez(c0, hex('#f8e8a0'), 0.4)); }
    // el chaval del juego: espera, mira la puerta y, abierta, va hacia ella
    const ux = tramo(t, objeto + 0.7, objeto + 1.8), kx = Math.round(lerp(104, 168, ux));
    R.actor(EL.empollon, kx, 105, t, { dir: 1, anda: ux > 0 && ux < 1, sorpresa: t > objeto + 0.3 && t < objeto + 0.8, sonrisa: ux > 0 });
    // la línea de verbos y el cursor: baja a los verbos, pulsa «abrir», luego la puerta
    const act = t > abrir - 0.1 ? 3 : t > verbo - 0.2 && t < coger ? Math.min(3, Math.floor((t - verbo + 0.2) * 3)) : -1, pul = tramo(t, abrir, abrir + 0.3);
    const r = T.verbos(R, t, { ...vb, activo: act, pulsa: pul > 0 && pul < 1 ? pul : 0, frase: t > abrir ? [3, t > objeto ? 'puerta' : null] : null, inventario: ['llave', 'moneda', 'mapa'] });
    const bA = centro(r.botones[3]), bM = centro(r.botones[0]);
    const cur = ruta(t, [[P2, 150, 60], [a(0.58), 150, 66], [verbo - 0.1, bM[0], bM[1]], [verbo + 0.5, bM[0] + 20, bM[1]], [abrir - 0.15, bA[0], bA[1]], [abrir + 0.3, bA[0], bA[1]], [objeto - 0.15, 206, 74], [objeto + 1, 206, 74], [objeto + 1.6, 230, 60]]);
    T.verbos(R, t, { barra: false, cursor: cur });
    if (t > objeto - 0.1 && t < objeto + 0.25) { const rr = (t - objeto + 0.1) * 40; for (let k = 0; k < 8; k++) { const an = k * 0.785; pset(Math.round(cur[0] + Math.cos(an) * rr), Math.round(cur[1] + Math.sin(an) * rr), hex('#fff0a0')); } }
  } });
};

// 3 · el corcho: la palabra hecha de pictogramas y las risas del equipo
const pictoTira = (t) => {
  const v = tramo(t, significa - 0.2, significa + 0.3); if (v <= 0) return;
  const x0 = 58, y0 = 24 - Math.round((1 - v) * 6), x1 = 250, y1 = 56;
  rect(x0 + 2, y0 + 2, x1 + 2, y1 + 2, hex('#6a4a2a')); rect(x0, y0, x1, y1, K); rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, hex('#f6f2ea')); rect(x0 + 1, y1 - 1, x1 - 1, y1 - 1, hex('#d8d0c0'));
  for (const xx of [x0 + 4, x1 - 4]) { R.disco(xx, y0 + 3, 2, hex('#c83a3a')); pset(xx - 1, y0 + 2, hex('#f08a8a')); }
  const ws = [w1, w2, w3, w4, w5], col = [hex('#2a4fa8'), hex('#c87a1a'), hex('#3a8a4a'), hex('#5a5a6a'), hex('#8a3ac8')];
  for (let k = 0; k < 5; k++) { const u = tramo(t, ws[k] - 0.1, ws[k] + 0.15); if (u <= 0) continue; const cx = x0 + 22 + k * 37, cy = y0 + 16, s2 = u < 1 ? 1 + Math.sin(u * Math.PI) * 0.4 : 1, cc = col[k];
    rect(cx - 15, cy - 12, cx + 15, cy + 12, cc); rect(cx - 14, cy - 11, cx + 14, cy + 11, hex('#fbfaf6'));
    if (k === 0) { rect(cx - 7, cy - 8, cx + 7, cy + 8, cc); rect(cx - 6, cy - 7, cx + 6, cy + 7, hex('#f6eeb8')); for (let l = 0; l < 5; l++) rect(cx - 4, cy - 5 + l * 3, cx + 4 - (l % 2) * 3, cy - 5 + l * 3, cc); }
    if (k === 1) { const r0 = Math.round(8 * s2); for (let i = 0; i < 10; i++) { const an = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r0 * 0.45 : r0; R.linea(cx, cy, Math.round(cx + Math.cos(an) * q), Math.round(cy + Math.sin(an) * q), cc); } }
    if (k === 2) { R.linea(cx - 7, cy + 7, cx + 3, cy - 3, cc); R.linea(cx - 6, cy + 7, cx + 4, cy - 3, cc); R.linea(cx - 7, cy + 6, cx + 3, cy - 4, cc); R.disco(cx + 5, cy - 5, 4, cc); R.disco(cx + 7, cy - 7, 2, hex('#fbfaf6')); }
    if (k === 3) { R.linea(cx - 8, cy, cx + 7, cy, cc); R.linea(cx - 8, cy + 1, cx + 7, cy + 1, cc); for (let d = 0; d < 5; d++) { pset(cx + 7 - d, cy - d, cc); pset(cx + 7 - d, cy + 1 + d, cc); } }
    if (k === 4) { rect(cx - 9, cy - 1, cx + 9, cy + 8, cc); R.poligono([[cx - 11, cy - 1], [cx, cy - 9], [cx + 11, cy - 1]], cc); rect(cx - 7, cy - 8, cx - 5, cy - 3, cc); for (let i = 0; i < 3; i++) rect(cx - 6 + i * 5, cy + 1, cx - 4 + i * 5, cy + 3, hex('#f0d040')); rect(cx - 1, cy + 4, cx + 1, cy + 8, hex('#fbfaf6')); }
  }
};
const p3 = (t) => {
  T.estudio(R, t, { encuadre: 'pizarra', camara: 'corcho' });
  pictoTira(t);
  // el equipo detrás de la mesa: se ríen de la broma, miran la tira y vuelven a reírse en «Mansion»
  const ri = (t > risa - 0.1 && t < risa + 1.0) || t > w5 + 0.1, bo = (k) => ri ? Math.round(Math.abs(Math.sin(t * 13 + k)) * 3) : 0;
  R.actor(EL.disenador, 80, 150, t, { dir: 1, sonrisa: ri, salto: bo(0), dedo: t > w1 - 0.2 && t < w4, habla: !ri && Math.sin(t * 9) > 0 && t > significa - 0.4 && t < w5 });
  R.actor(EL.disenadora, 150, 150, t, { dir: -1, sonrisa: t > w5 || ri, salto: bo(1), sorpresa: t > significa && t < significa + 0.5 });
  R.actor(EL.disenador2, 220, 150, t, { dir: -1, sonrisa: ri, salto: bo(2), brazos: t > w5 + 0.1 && t < w5 + 0.9 });
  // el «?» de la diseñadora se vuelve una sonrisa
  if (t > significa + 0.2 && t < P4) { const bx = 158, by = 112; if (t < w5) R.bocadillo(bx, by, { icono: '?' }); else { rect(bx - 6, by - 11, bx + 6, by + 1, K); rect(bx - 5, by - 10, bx + 5, by, hex('#f2eee2')); pset(bx - 1, by + 2, K); pset(bx, by + 2, K); pset(bx - 1, by + 1, hex('#f2eee2'));
    rect(bx - 3, by - 8, bx - 2, by - 6, K); rect(bx + 2, by - 8, bx + 3, by - 6, K); pset(bx - 4, by - 4, K); rect(bx - 3, by - 3, bx + 3, by - 3, K); pset(bx + 4, by - 4, K); } }
  if (ri && t < risa + 1.0) for (let k = 0; k < 2; k++) R.bocadillo(95 + k * 140, 112 - Math.round(Math.abs(Math.sin(t * 6 + k)) * 3), { icono: '!' });
};

// 4 · los siete disquetes: el cursor pulsa el mismo verbo en cada uno y corren los años
const p4 = (t) => {
  const g = T.estudio(R, t, { encuadre: 'disquetes' }), D = g.disquetes, n = D.length, u = tramo(t, P4 + 0.2, diez - 0.15), k = Math.min(n - 1, Math.floor(u * n));
  const cajaV = (d) => { const s = 5, x = d[0], y = d[1], w = 8 * s, ex0 = x + Math.round(1.2 * s), ey0 = y + Math.round(3.2 * s), ex1 = x + w - Math.round(1.2 * s), ey1 = y + w - 2, vy = ey1 - Math.max(5, Math.round((ey1 - ey0) * 0.32)); return [ex0 + 1, vy, ex1 - 1, ey1 - 1]; };
  for (let i = 0; i <= k && u > 0; i++) { const d = D[i], on = i === k && u < 1; T.verbos(R, t, { caja: cajaV(d), activo: 3 });
    if (on) { const v = Math.sin(t * 12) > 0; for (let x = d[0] - 2; x <= d[2] + 2; x++) { pset(x, d[1] - 2, v ? hex('#f0c040') : hex('#fff0a0')); pset(x, d[3] + 2, v ? hex('#f0c040') : hex('#fff0a0')); } for (let y = d[1] - 2; y <= d[3] + 2; y++) { pset(d[0] - 2, y, v ? hex('#f0c040') : hex('#fff0a0')); pset(d[2] + 2, y, v ? hex('#f0c040') : hex('#fff0a0')); } }
    // la marca verde de hecho, encima de cada uno
    const cx = Math.round((d[0] + d[2]) / 2), cy = d[1] - 8; for (let q = 0; q < 3; q++) { R.linea(cx - 4, cy + q, cx - 1, cy + 3 + q, hex('#2a8a3a')); R.linea(cx - 1, cy + 3 + q, cx + 5, cy - 3 + q, hex('#2a8a3a')); }
  }
  // el cursor salta de disquete en disquete y pulsa
  const d = D[k], cv = cajaV(d), fr = (u * n) % 1, cur = u <= 0 ? [20, 150] : [lerp((cv[0] + cv[2]) / 2 - 30, (cv[0] + cv[2]) / 2, Math.min(1, fr * 3)), (cv[1] + cv[3]) / 2 - Math.round(Math.sin(Math.min(1, fr * 3) * Math.PI) * 14)];
  if (u < 1) T.verbos(R, t, { barra: false, cursor: cur });
  // en «10», el número salta en la pared
  const v = tramo(t, diez - 0.1, diez + 0.2); if (v > 0) { const yy = Math.round(lerp(64, 50, v) + (v < 1 ? 0 : Math.sin(t * 5) * 1)); R.numero('10', 178, yy, { tam: 16, centro: true }); }
};

// 5 · tres disquetes de cerca: la misma línea de verbos y el sello de la casa
const p5 = (t) => {
  const g = T.estudio(R, t, { encuadre: 'disquetes', camara: 'cerca', sello: tramo(t, casa - 0.1, firma + 0.2) }), D = g.disquetes;
  const ola = tramo(t, fila - 0.3, c(0.33));
  D.forEach((d, i) => { const x = d[0], y = d[1], cj = [x + 14, y + 70, x + 74, y + 85];
    if (ola > 0 && ola < 1) T.verbos(R, t, { caja: cj, activo: Math.min(8, Math.floor(ola * 9)), pulsa: 0 });
    // el destello del sello al posarse
    const tl = casa - 0.1 + (firma + 0.3 - casa) * (i + 1) / 3, v = tramo(t, tl - 0.05, tl + 0.35); if (v > 0 && v < 1) { const sx = x + 11, sy = y + 11, rr = 6 + v * 14; for (let k = 0; k < 12; k++) { const an = k * 0.524 + v; pset(Math.round(sx + Math.cos(an) * rr), Math.round(sy + Math.sin(an) * rr), k % 2 ? hex('#fff0a0') : hex('#ffffff')); } }
  });
  // el cursor recorre la fila de verbos de un disquete a otro mientras se encienden
  const cur = ruta(t, [[P5, 30, 150], [fila, 60, 142], [c(0.33), 260, 142], [casa, 250, 132], [firma + 0.5, 210, 150]]);
  T.verbos(R, t, { barra: false, cursor: cur });
};
const año = (t) => t < P4 + 0.2 ? 1987 : Math.min(1997, 1987 + Math.floor(tramo(t, P4 + 0.2, diez + 0.1) * 10.99));
const efectos = [[invento, 'lapiz'], [envez + 0.1, 'lapiz'], [teclado, 'golpecito'], [abrir, 'bip'], [objeto, 'bip'], [objeto + 0.2, 'puerta'], [risa, 'palmada'], [significa, 'papel'], [w5, 'pop'], [P4 + 0.6, 'bip'], [diez, 'pop'], [fila, 'brillo'], [casa + 0.2, 'sello'], [firma + 0.2, 'sello']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')

E['la-manifiesto'] = ('El manifiesto', '''// LA-MANIFIESTO (frases 12–14), 1989, cartela «1989». Seis planos:
// 1. el cuarto del ordenador de la mansión: un chaval juega; en «die» la pantalla se pone roja con la calavera de fin
//    de juego; se sobresalta y se queda triste;
// 2. (desde «knowing») la puerta cerrada para siempre del pasillo, de cerca: el chaval del juego llega, llama y empuja;
//    le sale un «?»; en «unable to ever finish» el candado late y una telaraña crece entre él y la puerta;
// 3. el estudio en 1989: el diseñador escribe a máquina en «writes a manifesto»; dos compañeros llegan, leen por encima
//    de su hombro y se ríen en «very Gilbert title»;
// 4. inserto: la hoja en la máquina de escribir, con las manos que teclean: el título y, en «suck», un pulgar abajo
//    en rojo; «a rule»: un recuadro con un «1»; «never die»: una calavera que se tacha; «stuck»: un candado tachado;
// 5. la pantalla del ordenador de los noventa: el cursor pulsa «usar» con el tentáculo morado: no pasa nada («X»,
//    pone los ojos en blanco) en «wrong»; prueba otra cosa, «coger» la llave: «!», la llave al inventario; en
//    «the game» el juego sonríe;
// 6. dentro del juego: el tentáculo verde aplaude entre confeti y, en «keep looking», el cursor pulsa «mirar» y el
//    tentáculo señala la puerta abierta.''', r'''
const a = (f) => en('morir', f), b = (f) => en('manifiesto', f), c = (f) => en('prueba', f);
const P2 = a(0.57), P3 = b(0.026), P4 = b(0.456), P5 = b(1), P6 = c(0.488);
const muere = a(0.296), atasca = a(0.483), sabe = a(0.57), nunca = a(0.736);
const escribe = b(0.166), titulo = b(0.313), titulo2 = b(0.379), chupa = b(0.552), propone = b(0.625), regla = b(0.685), jamas = b(0.815), muerte = b(0.838), atasco = b(0.956);
const mal = c(0.072), prueba = c(0.227), otra = c(0.312), juego = c(0.488), mirar = c(0.874);
const { rect, pset } = R, K = T.C.k;
const mez = (c1, d, u) => { const ch = (s) => Math.round(((c1 >>> s) & 255) * (1 - u) + ((d >>> s) & 255) * u); return ((255 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)) >>> 0; };
const bay = (x, y) => [0, 0.5, 0.75, 0.25][(y & 1) * 2 + (x & 1)];
const h = (x, y, s = 0) => { const v = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); };
const ruta = (t, kf) => { if (t <= kf[0][0]) return kf[0].slice(1); for (let i = 1; i < kf.length; i++) if (t < kf[i][0]) { const [t0, x0, y0] = kf[i - 1], [t1, x1, y1] = kf[i], u = (t - t0) / (t1 - t0), e = u * u * (3 - 2 * u); return [lerp(x0, x1, e), lerp(y0, y1, e)]; } return kf[kf.length - 1].slice(1); };
const centro = (bt) => [(bt[0] + bt[2]) / 2, (bt[1] + bt[3]) / 2];
const calavera = (cx, cy, s, c1, c2) => { R.disco(cx, cy - s, 3 * s, c1); rect(cx - 2 * s, cy + s, cx + 2 * s, cy + 3 * s, c1); R.disco(cx - Math.round(1.3 * s), cy - s, s * 0.9, c2); R.disco(cx + Math.round(1.3 * s), cy - s, s * 0.9, c2); rect(cx, cy + s - 1, cx, cy + s, c2); for (let i = -1; i <= 1; i++) rect(cx + i * s, cy + 2 * s, cx + i * s, cy + 3 * s, c2); };

// 1 · el cuarto de la mansión: el chaval juega y muere
const p1 = (t) => {
  T.mansion(R, t, { encuadre: 'cuarto', anyo: 1987, pantalla: (R2, t2, S) => {
    const [x0, y0, x1, y1] = S, cl = [x0 + 1, y0 + 1, x1 - 1, y1 - 1];
    if (t < muere) { // el juego: un pasillo diminuto con un chaval que anda y una sombra que se acerca
      rect(cl[0], cl[1], cl[2], cl[3] - 6, hex('#3a2a5a')); rect(cl[0], cl[3] - 5, cl[2], cl[3], hex('#5a3a2a')); for (let x = cl[0] + 2; x < cl[2]; x += 6) rect(x, cl[1] + 3, x + 2, cl[3] - 8, hex('#4a3a6a'));
      const kx = cl[0] + Math.round((t * 4) % (cl[2] - cl[0] - 3)); rect(kx, cl[3] - 9, kx + 1, cl[3] - 6, hex('#f0d040')); pset(kx, cl[3] - 10, hex('#f2c8a0'));
      const sx = cl[2] - Math.round(tramo(t, 0.5, muere) * 12); rect(sx - 2, cl[3] - 12, sx, cl[3] - 6, hex('#1a1020')); pset(sx - 1, cl[3] - 11, hex('#f04a3a'));
    } else { // fin del juego: la pantalla roja que parpadea con la calavera
      const on = Math.floor((t - muere) * 3) % 2 === 0; rect(cl[0], cl[1], cl[2], cl[3], on ? hex('#a81818') : hex('#5a0a0a'));
      calavera(Math.round((cl[0] + cl[2]) / 2), Math.round((cl[1] + cl[3]) / 2), 2, hex('#f2eee2'), on ? hex('#a81818') : hex('#5a0a0a'));
    }
  } });
  // el chaval, de pie ante la mesa, con la mano en el teclado; en «die» se sobresalta y se viene abajo
  const tec = Math.floor(t * 6) % 2, susto = t > muere && t < muere + 0.5;
  const ux = tramo(t, 0.2, 1.0), x = Math.round(lerp(118, 140, ux));
  R.actor(EL.chico, x, 160, t, { dir: 1, anda: ux > 0 && ux < 1, sostiene: t > 1.0 && t < muere ? [158 + tec * 2, 135 + tec] : undefined, sorpresa: susto, triste: t > muere + 0.5, brazos: susto, salto: susto ? 3 : 0, sonrisa: t > 1.0 && t < muere - 0.6 });
  if (t > muere + 0.2) R.bocadillo(x + 8, 128, { icono: 'calavera' });
};

// 2 · la puerta cerrada para siempre: el chaval se atasca
const p2 = (t) => {
  const g = T.mansion(R, t, { encuadre: 'pasillo', camara: 'puerta', anyo: 1987 }), s = g.suelo, [dx0, dy0, dx1, dy1] = g.puerta;
  const ux = tramo(t, P2 + 0.05, P2 + 0.85), x = Math.round(lerp(10, dx0 - 18, ux));
  const llama = t > P2 + 0.9 && t < P2 + 1.6, empuja = t > P2 + 1.6 && t < P2 + 2.3, rendido = t > nunca + 0.9;
  const r = R.actor(EL.empollon, x, s, t, { dir: 1, anda: ux > 0 && ux < 1, sostiene: llama ? [dx0 - 1, s - 18 + (Math.floor(t * 6) % 2) * 2] : empuja ? [dx0, s - 14] : undefined, triste: rendido, sorpresa: t > P2 + 2.3 && t < P2 + 2.6, salto: empuja ? (Math.floor(t * 10) % 2) : 0 });
  if (t > P2 + 2.3 && t < nunca + 0.9) R.bocadillo(x + 8, s - 30, { icono: '?' });
  if (rendido) R.bocadillo(x + 8, s - 30, { icono: 'reloj' });
  // el candado de la puerta late en «unable to ever finish»
  const [cx, cy] = g.cerradura; if (t > nunca - 0.1) { const v = Math.sin(t * 10) > 0; for (let k = 0; k < 40; k++) { const an = k * 0.157; for (const rr of [16 + (v ? 2 : 0), 17 + (v ? 2 : 0)]) pset(Math.round(cx + Math.cos(an) * rr), Math.round(cy - 2 + Math.sin(an) * rr), v ? hex('#ff5a3a') : hex('#c83a3a')); } R.icono('X', cx - 16, cy - 30, hex('#ff5a3a'), K, 2); }
  // la telaraña que crece en la esquina entre el chaval y la puerta (el tiempo pasa)
  const tw = tramo(t, nunca + 0.5, P3 - 0.2); if (tw > 0) { const ox = dx0 - 1, oy = s - 40, L = Math.round(tw * 28); for (let k = 0; k < 5; k++) { const an = Math.PI * (0.55 + k * 0.11); R.linea(ox, oy, Math.round(ox + Math.cos(an) * L), Math.round(oy - Math.sin(an) * L * -1), hex('#d8dce8')); }
    for (let rr = 6; rr < L; rr += 6) for (let k = 0; k < 4; k++) { const a0 = Math.PI * (0.55 + k * 0.11), a1 = Math.PI * (0.55 + (k + 1) * 0.11); R.linea(Math.round(ox + Math.cos(a0) * rr), Math.round(oy + Math.sin(a0) * rr), Math.round(ox + Math.cos(a1) * rr), Math.round(oy + Math.sin(a1) * rr), hex('#a8acb8')); }
    if (tw > 0.6) { const sy = oy + Math.round(Math.sin(t * 2) * 3 + L * 0.6); R.linea(ox - 6, oy, ox - 6, sy, hex('#a8acb8')); R.disco(ox - 6, sy + 1, 1.6, K); } }
};

// 3 · el estudio de 1989: el diseñador escribe a máquina y el equipo lee por encima del hombro
const p3 = (t) => {
  T.estudio(R, t, { encuadre: 'oficina', anyo: 1988, hoja: Math.min(1, 0.05 + tramo(t, escribe - 0.3, P4 - 0.1) * 0.95) });
  const tec = Math.floor(t * 9) % 2, ri = t > titulo + 0.2 && t < P4 + 1;
  R.actor(EL.disenador, 278, 152, t, { dir: -1, sostiene: t > escribe - 0.4 && !(t > titulo2 && t < titulo2 + 0.6) ? [258 - tec * 3, 124 + tec] : undefined, sonrisa: t > titulo2, habla: t > titulo2 && t < titulo2 + 0.6, dedo: t > titulo2 && t < titulo2 + 0.6 });
  // la diseñadora viene de la izquierda y se asoma; el otro entra por la derecha y lee por encima
  const u1 = tramo(t, P3 + 0.3, escribe + 0.8), x1 = Math.round(lerp(-20, 200, u1));
  R.actor(EL.disenadora, x1, 158, t, { dir: 1, anda: u1 > 0 && u1 < 1, sonrisa: ri, salto: ri ? Math.round(Math.abs(Math.sin(t * 12)) * 2) : 0, dedo: t > titulo - 0.4 && t < titulo + 0.2 });
  const u2 = tramo(t, escribe, titulo - 0.3), x2 = Math.round(lerp(340, 298, u2));
  R.actor(EL.disenador2, x2, 160, t, { dir: -1, anda: u2 > 0 && u2 < 1, sonrisa: ri, salto: ri ? Math.round(Math.abs(Math.sin(t * 12 + 1)) * 2) : 0, brazos: t > titulo + 0.2 && t < titulo + 0.8 });
  if (ri && t < titulo + 1.0) { R.bocadillo(x1 + 8, 128, { icono: '!' }); R.bocadillo(x2 + 8, 130, { icono: '!' }); }
};

// 4 · inserto: la hoja en la máquina de escribir (fondo propio, pintado entero)
let fondo4 = null;
const pintaMesa = () => {
  // la pared de yeso tramado con el friso, la mesa de madera con vetas y, en ella, la taza, lápices, disquetes y bolas de papel
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let col;
    if (y < 62) col = (h(x >> 1, y >> 1, 3) + bay(x, y) * 0.3 > 0.85) ? hex('#d8ccb0') : (y % 30 === 0) ? hex('#c8bc9e') : hex('#e6dcc2');
    else if (y < 70) col = y === 62 ? hex('#5a3418') : (x % 16 === 0) ? hex('#4a2a14') : y < 64 ? hex('#a8743c') : hex('#8a5a2c');
    else { const v = Math.sin(x * 0.045 + Math.sin(y * 0.21) * 2.2 + y * 0.02) + h(x >> 2, y, 7) * 0.5; col = v > 1.05 ? hex('#7a4a24') : v > 0.4 ? hex('#a46a38') : v > -0.6 ? hex('#b47a44') : hex('#c48a50'); if (y === 70) col = hex('#d8a46a'); }
    pset(x, y, col); }
  // el corcho del fondo con dos bocetos y el calendario
  rect(10, 10, 70, 56, K); rect(11, 11, 69, 55, hex('#b88a5a')); for (let k = 0; k < 120; k++) pset(12 + Math.floor(h(k, 1, 9) * 56), 12 + Math.floor(h(k, 2, 9) * 42), hex('#a07446'));
  rect(16, 16, 36, 34, hex('#f4f0e6')); R.disco(26, 24, 5, hex('#8a3ac8')); rect(24, 26, 28, 32, hex('#8a3ac8')); pset(24, 23, K); pset(28, 23, K); R.disco(18, 17, 1.5, hex('#c83a3a'));
  rect(42, 30, 64, 50, hex('#f4f0e6')); R.poligono([[46, 44], [53, 34], [60, 44]], hex('#3a6ab8')); rect(46, 44, 60, 47, hex('#6a3a1a')); R.disco(53, 31, 1.5, hex('#3a8a4a'));
  rect(252, 12, 274, 46, K); rect(253, 13, 273, 45, hex('#f4f0e6')); rect(253, 13, 273, 18, hex('#c83a3a')); for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) rect(255 + i * 4, 21 + j * 6, 256 + i * 4, 22 + j * 6, hex('#8a8aa0'));
  // la taza con su asa, el bote de lápices, los disquetes, las bolas de papel (borradores) y las gafas
  rect(18, 118, 40, 146, K); rect(19, 119, 39, 145, hex('#c83a3a')); rect(19, 119, 39, 121, hex('#e86a5a')); rect(36, 120, 39, 145, hex('#8a2424')); rect(40, 124, 46, 138, K); rect(41, 126, 44, 136, hex('#c83a3a')); rect(20, 120, 38, 123, hex('#3a2010'));
  rect(274, 96, 296, 132, K); rect(275, 97, 295, 131, hex('#3a6ab8')); rect(275, 97, 277, 131, hex('#5a8ad8'));
  for (let k = 0; k < 4; k++) { const lx = 278 + k * 5; R.linea(lx, 96, lx - 2 + k, 72 + k * 3, K); R.linea(lx + 1, 96, lx - 1 + k, 72 + k * 3, [hex('#e8c040'), hex('#c83a3a'), hex('#3a8a4a'), hex('#e8c040')][k]); }
  for (const [x, y, c] of [[16, 152, hex('#3a3a4a')], [30, 160, hex('#c83a3a')]]) { rect(x, y, x + 18, y + 18, K); rect(x + 1, y + 1, x + 17, y + 17, c); rect(x + 4, y + 1, x + 13, y + 6, hex('#c8ccd8')); rect(x + 3, y + 9, x + 15, y + 17, hex('#f2eee2')); }
  for (const [x, y, r0] of [[294, 150, 8], [278, 164, 7], [306, 170, 6]]) { R.disco(x + 1, y + 2, r0, hex('#6a4220')); R.disco(x, y, r0, hex('#e8e2d2')); for (let k = 0; k < 6; k++) R.linea(x - r0 + 2 + k * 2, y - r0 + 3 + (k % 3), x - 2 + k, y + r0 - 3, hex('#b8b0a0')); pset(x - 2, y - 3, hex('#ffffff')); }
};
const p4 = (t) => {
  if (!fondo4) { fondo4 = R.nuevo(); const prev = R.usar(fondo4); pintaMesa(); R.usar(prev); }
  R.buf.set(fondo4);
  // el vapor de la taza
  for (let k = 0; k < 4; k++) { const v = (t * 0.6 + k / 4) % 1; R.disco(Math.round(29 + Math.sin(v * 7 + k) * 3), Math.round(116 - v * 26), 1 + v * 2, v > 0.6 ? hex('#d8d0c0') : hex('#f2eee2')); }
  // la hoja: sube con cada renglón y corre con el carro
  const ty = tramo(t, P4, atasco + 0.3), lineas = 2 + Math.floor(ty * 13), car = ((t * 3.2) % 1), px0 = 104 - Math.round(car * 6), py0 = 18 + Math.round((1 - ty) * 14), px1 = px0 + 118, py1 = 124;
  rect(px0 + 3, py0 + 3, px1 + 3, py1, hex('#8a6a4a')); rect(px0, py0, px1, py1, K); rect(px0 + 1, py0 + 1, px1 - 1, py1, hex('#f8f4ea')); rect(px1 - 1, py0 + 1, px1 - 1, py1, hex('#ded6c4'));
  for (let k = 0; k < 40; k++) pset(px0 + 2 + Math.floor(h(k, 3, 2) * 114), py0 + 2 + Math.floor(h(k, 4, 2) * 100), hex('#ece6d6'));
  const tinta = hex('#3a3a4a'), rojo = hex('#d8282a'), lx = px0 + 10;
  // el título (renglón grueso y subrayado) y su pulgar abajo en rojo en «suck»
  const tt = tramo(t, P4 + 0.05, chupa - 0.1); if (tt > 0) { const w = Math.round(tt * 58); rect(lx + 18, py0 + 8, lx + 18 + w, py0 + 10, K); if (tt >= 1) rect(lx + 18, py0 + 13, lx + 76, py0 + 13, tinta); }
  const pu = tramo(t, chupa - 0.05, chupa + 0.35); if (pu > 0) { const cx = lx + 92, cy = py0 + 14; R.recorte([cx - 8, cy - 14, cx + 8, cy - 14 + Math.round(pu * 26)]);
    rect(cx - 4, cy - 13, cx + 4, cy - 11, rojo); for (let i = -5; i <= 5; i++) { pset(cx + i, cy - 10, rojo); pset(cx + i, cy + 1, rojo); } for (let j = -10; j <= 1; j++) { pset(cx - 6, cy + j, rojo); pset(cx + 6, cy + j, rojo); }
    for (const j of [-7, -4, -1]) R.linea(cx + 1, cy + j, cx + 6, cy + j, rojo); R.linea(cx - 5, cy + 2, cx - 5, cy + 9, rojo); R.linea(cx - 1, cy + 2, cx - 1, cy + 9, rojo); R.linea(cx - 4, cy + 10, cx - 2, cy + 10, rojo); rect(cx - 4, cy + 2, cx - 2, cy + 9, hex('#f8d8d0')); R.recorte(null); }
  // los renglones del cuerpo (sin letras: palabras de rayitas)
  const cuerpo = Math.max(0, Math.min(6, Math.floor(tramo(t, chupa + 0.2, propone) * 7)));
  for (let l = 0; l < cuerpo; l++) { let xx = lx; const yy = py0 + 20 + l * 5; for (let p = 0; p < 7 && xx < px1 - 14; p++) { const w = 4 + Math.floor(h(l, p, 5) * 9); rect(xx, yy, Math.min(xx + w, px1 - 10), yy, tinta); xx += w + 3; } }
  // la regla: un recuadro con un «1»
  const rg = tramo(t, propone, regla + 0.2); if (rg > 0) { const ry = py0 + 54, w = Math.round(rg * 96); R.linea(lx - 2, ry, lx - 2 + w, ry, rojo); R.linea(lx - 2, ry + 26, lx - 2 + w, ry + 26, rojo); if (rg > 0.9) { R.linea(lx - 2, ry, lx - 2, ry + 26, rojo); R.linea(lx + 94, ry, lx + 94, ry + 26, rojo); } if (rg > 0.4) R.numero('1', lx + 6, ry + 19, { tam: 8 }); }
  // «never die»: la calavera que se tacha; «stuck»: el candado tachado
  const ry = py0 + 54, cv = tramo(t, jamas - 0.2, jamas + 0.2); if (cv > 0) { calavera(lx + 40, ry + 13, 2, tinta, hex('#f8f4ea')); }
  const x1 = tramo(t, muerte - 0.05, muerte + 0.25); if (x1 > 0) { const L = Math.round(x1 * 16); for (let d = 0; d < 2; d++) { R.linea(lx + 32 + d, ry + 5, lx + 32 + d + L, ry + 5 + L, rojo); R.linea(lx + 48 + d, ry + 5, lx + 48 + d - L, ry + 5 + L, rojo); } }
  const cd = tramo(t, b(0.87) - 0.1, b(0.87) + 0.2); if (cd > 0) { const cx = lx + 72, cy = ry + 15; rect(cx - 6, cy - 2, cx + 6, cy + 7, tinta); rect(cx - 5, cy - 1, cx + 5, cy + 6, hex('#c8a040')); pset(cx, cy + 2, K); rect(cx, cy + 3, cx, cy + 4, K);
    for (let a0 = Math.PI; a0 <= Math.PI * 2; a0 += 0.15) { pset(Math.round(cx + Math.cos(a0) * 4), Math.round(cy - 2 + Math.sin(a0) * 6), tinta); pset(Math.round(cx + Math.cos(a0) * 5), Math.round(cy - 2 + Math.sin(a0) * 6), tinta); } }
  const x2 = tramo(t, atasco - 0.25, atasco + 0.05); if (x2 > 0) { const L = Math.round(x2 * 18); for (let d = 0; d < 2; d++) { R.linea(lx + 63 + d, ry + 4, lx + 63 + d + L, ry + 4 + L, rojo); R.linea(lx + 81 + d, ry + 4, lx + 81 + d - L, ry + 4 + L, rojo); } }
  // la máquina de escribir: el rodillo con sus mandos, la guía del papel, el cuerpo verde con brillo y las teclas
  const MQ = [hex('#1e2a2a'), hex('#2e4040'), hex('#46605a'), hex('#6a8a80'), hex('#9ab8aa')];
  rect(60 - Math.round(car * 6), 118, 262 - Math.round(car * 6), 132, K); rect(61 - Math.round(car * 6), 119, 261 - Math.round(car * 6), 131, MQ[0]); rect(61 - Math.round(car * 6), 121, 261 - Math.round(car * 6), 123, MQ[2]);
  for (const ex of [52, 262]) { const xx = ex - Math.round(car * 6); rect(xx, 116, xx + 10, 134, K); rect(xx + 1, 117, xx + 9, 133, MQ[1]); rect(xx + 2, 118, xx + 8, 120, MQ[3]); }
  R.poligono([[30, 132], [290, 132], [310, 180], [10, 180]], K); R.poligono([[31, 133], [289, 133], [308, 180], [12, 180]], MQ[1]); rect(32, 133, 288, 136, MQ[3]); rect(30, 137, 290, 138, MQ[2]);
  rect(130, 132, 190, 140, K); rect(131, 133, 189, 139, MQ[0]); const golpe = Math.floor(t * 10) % 3 === 0 && t < atasco + 0.4; for (let k = 0; k < 9; k++) { const ang = Math.PI * (0.15 + k * 0.0875), ln = 10; R.linea(160, 140, Math.round(160 + Math.cos(ang) * ln * (k === 4 && golpe ? 0.3 : 1)), Math.round(140 - Math.sin(ang) * ln * (k === 4 && golpe ? 1.9 : 1)), MQ[4]); }
  // el timbre del margen (latón) y la palanca de retorno del carro
  R.disco(38 - Math.round(car * 6), 124, 3, hex('#c8a040')); R.linea(40 - Math.round(car * 6), 114, 22 - Math.round(car * 6), 104, K); R.linea(40 - Math.round(car * 6), 115, 22 - Math.round(car * 6), 105, hex('#c8ccd4'));
  const teclas = []; for (let f = 0; f < 4; f++) for (let i = 0; i < 11 - (f === 3 ? 4 : 0); i++) teclas.push([62 + f * 6 + i * 18 + (f === 3 ? 36 : 0), 144 + f * 9]);
  const pulsada = Math.floor(t * 9) % teclas.length;
  teclas.forEach(([kx, ky], i) => { const ab = i === pulsada || i === (pulsada * 7) % teclas.length ? 1 : 0; R.disco(kx, ky + 1 + ab, 4, K); R.disco(kx, ky + ab, 3.5, hex('#e8e2d2')); R.disco(kx, ky + ab, 2.5, hex('#c8c0b0')); pset(kx - 1, ky - 1 + ab, hex('#ffffff')); });
  rect(110, 176, 210, 179, K); rect(111, 176, 209, 178, hex('#c8c0b0'));
  // las manos que teclean, con su brazo canónico desde abajo
  const tk1 = teclas[pulsada], tk2 = teclas[(pulsada * 7) % teclas.length], mm = t < atasco + 0.4;
  const h1 = mm ? [Math.max(112, Math.min(150, tk1[0] + 6)), 166 + (Math.floor(t * 9) % 2)] : [126, 170], h2 = mm ? [Math.min(206, Math.max(176, tk2[0] - 6)), 166 + (Math.floor(t * 9 + 1) % 2)] : [196, 170];
  T.brazo(R, h1[0] - 26, 190, h1[0], h1[1], '#8a3a3a', 1, { codo: [h1[0] - 20, 178] });
  T.brazo(R, h2[0] + 26, 190, h2[0], h2[1], '#8a3a3a', -1, { codo: [h2[0] + 20, 178] });
};

// 5 · la pantalla de los noventa: probar, equivocarse y probar otra cosa
const p5 = (t) => {
  T.hoy(R, t, { encuadre: 'cuarto90', camara: 'pantalla', pantalla: (R2, x0, y0, x1, y1, t2) => {
    const cl = [x0 + 1, y0 + 1, x1 - 1, y1 - 1], W = cl[2] - cl[0], H = cl[3] - cl[1], yV = cl[3] - Math.round(H * 0.3), suelo = yV - 8;
    R.recorte([cl[0], cl[1], cl[2], yV - 1]);
    // la cocina de la mansión: azulejos, alacena, ventana con la luna y una puerta de despensa
    for (let y = cl[1]; y < suelo - 22; y++) for (let x = cl[0]; x <= cl[2]; x++) pset(x, y, ((x - cl[0]) % 10 === 0 || (y - cl[1]) % 10 === 0) ? hex('#3a6a6a') : ((x + y) % 7 === 0) ? hex('#6aa8a0') : hex('#5a9a92'));
    for (let y = suelo - 22; y <= yV - 1; y++) for (let x = cl[0]; x <= cl[2]; x++) pset(x, y, y < suelo ? (((x >> 3) + (y >> 3)) % 2 ? hex('#e8e2d2') : hex('#c8c0b0')) : (((x >> 4) + (y >> 2)) % 2 ? hex('#8a5a2c') : hex('#7a4a24')));
    const vx = cl[0] + 20; rect(vx, cl[1] + 8, vx + 30, cl[1] + 34, K); rect(vx + 1, cl[1] + 9, vx + 29, cl[1] + 33, hex('#1a2a5a')); R.disco(vx + 21, cl[1] + 16, 4, hex('#f8f0c0')); rect(vx + 15, cl[1] + 9, vx + 15, cl[1] + 33, hex('#c8945a')); rect(vx + 1, cl[1] + 21, vx + 29, cl[1] + 21, hex('#c8945a'));
    const ax = cl[0] + 70; rect(ax, cl[1] + 6, ax + 40, cl[1] + 26, K); rect(ax + 1, cl[1] + 7, ax + 39, cl[1] + 25, hex('#a8743c')); rect(ax + 20, cl[1] + 7, ax + 20, cl[1] + 25, K); for (let k = 0; k < 4; k++) R.disco(ax + 6 + k * 9, suelo - 30, 2, [hex('#c83a3a'), hex('#e8c040'), hex('#3a8a4a'), hex('#3a6ab8')][k]);
    rect(ax - 2, suelo - 27, ax + 42, suelo - 26, K);
    const px = cl[2] - 44; rect(px, cl[1] + 10, px + 26, suelo, K); rect(px + 1, cl[1] + 11, px + 25, suelo, hex('#6a3418')); rect(px + 4, cl[1] + 15, px + 22, cl[1] + 30, hex('#5a2a12')); R.disco(px + 21, suelo - 18, 1.5, hex('#e8c040'));
    // la mesa con la llave (hasta que la coge)
    const mx = cl[0] + 34, cogida = tramo(t, otra + 0.05, otra + 0.45); rect(mx, suelo - 12, mx + 30, suelo - 10, K); rect(mx + 1, suelo - 12, mx + 29, suelo - 11, hex('#a8743c')); rect(mx + 2, suelo - 10, mx + 3, suelo, K); rect(mx + 27, suelo - 10, mx + 28, suelo, K);
    const kx = Math.round(lerp(mx + 14, cl[2] - 20, cogida)), ky = Math.round(lerp(suelo - 15, cl[3] - 6, cogida)); if (cogida < 1) { rect(kx - 4, ky - 1, kx + 4, ky + 1, hex('#8a6a18')); rect(kx - 3, ky, kx + 3, ky, hex('#f0c840')); R.disco(kx - 4, ky, 2, hex('#f0c840')); pset(kx - 4, ky, hex('#8a6a18')); }
    // el tentáculo morado que guarda la despensa: se harta cuando le «usan»
    const harto = t > mal - 0.1 && t < prueba + 0.2, feliz = t > juego - 0.1;
    T.tentaculo(R, px - 12, suelo, t, { s: 1, color: 'morado', dir: -1, expresion: harto ? 'harto' : feliz ? 'feliz' : 'normal', inclina: harto ? Math.round(Math.sin(t * 3)) : 0 });
    R.actor(EL.chico, cl[0] + 70, suelo, t, { dir: 1, sorpresa: t > mal && t < mal + 0.5, sonrisa: t > otra + 0.2, salto: t > otra + 0.2 && t < otra + 0.7 ? 3 : 0, triste: t > mal + 0.5 && t < prueba });
    // los «X» y «!»
    if (t > mal - 0.05 && t < prueba) { const s2 = Math.min(1, (t - mal + 0.05) * 6); R.icono('X', px - 22, suelo - 44 - Math.round(s2 * 4), hex('#e83a3a'), K, 2); }
    if (t > otra - 0.05 && t < otra + 0.6) R.icono('!', mx + 10, suelo - 40 - Math.round(Math.abs(Math.sin(t * 8)) * 3), hex('#f0c840'), K, 2);
    // en «the game», el juego sonríe: una cara sonriente grande que aparece en el centro con rayitos
    const sj = tramo(t, otra + 0.35, otra + 0.75); if (sj > 0) { const cx = Math.round((cl[0] + cl[2]) / 2), cy = cl[1] + 26, rr = Math.round(sj * 14);
      for (let k = 0; k < 12; k++) { const an = k * 0.524 + t; R.linea(Math.round(cx + Math.cos(an) * (rr + 3)), Math.round(cy + Math.sin(an) * (rr + 3)), Math.round(cx + Math.cos(an) * (rr + 7)), Math.round(cy + Math.sin(an) * (rr + 7)), hex('#f8e870')); }
      R.disco(cx, cy, rr + 1, K); R.disco(cx, cy, rr, hex('#f8d838')); if (rr > 8) { R.disco(cx - 5, cy - 4, 1.8, K); R.disco(cx + 5, cy - 4, 1.8, K); for (let i = -7; i <= 7; i++) { const yy = Math.round(cy + 3 + (1 - (i / 7) ** 2) * 4); pset(cx + i, yy, K); pset(cx + i, yy + 1, K); } } }
    R.recorte(null);
    // la línea de verbos y el cursor: «usar» + tentáculo; luego «coger» + llave
    const fase2 = t > prueba;
    const act = t > otra - 0.4 ? 1 : t > prueba ? -1 : t > P5 + 0.6 ? 5 : -1;
    const r = T.verbos(R, t, { caja: [cl[0], yV, cl[2], cl[3]], activo: act, frase: t > P5 + 0.8 && t < prueba ? [5, null] : t > otra - 0.3 ? [1, cogida > 0 ? 'llave' : null] : null, inventario: cogida >= 1 ? ['moneda', 'llave'] : ['moneda'] });
    const bU = centro(r.botones[5]), bC = centro(r.botones[1]);
    const cur = ruta(t, [[P5, cl[0] + 120, cl[1] + 30], [P5 + 0.6, bU[0], bU[1]], [P5 + 1.0, bU[0], bU[1]], [mal - 0.3, px - 12, suelo - 14], [prueba, px - 12, suelo - 14], [otra - 0.45, bC[0], bC[1]], [otra - 0.3, bC[0], bC[1]], [otra, kx, suelo - 15], [juego + 1, kx + 30, cl[1] + 50]]);
    T.verbos(R, t, { barra: false, cursor: cur });
  } });
};

// 6 · dentro del juego: el tentáculo verde aplaude e invita a seguir mirando (fondo propio, pintado entero)
let fondo6 = null;
const pintaSala = () => {
  // la biblioteca de la mansión en el estilo del juego: papel pintado, friso, suelo de damero, estanterías, ventana, cuadro
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { let col;
    if (y < 104) col = (x % 12 === 0) ? hex('#2a5a4a') : ((x % 12 === 6) && (y % 10 < 5)) ? hex('#4a8a6a') : (bay(x, y) + (y / 104) * 0.4 > 0.9) ? hex('#2e6a54') : hex('#3a7a62');
    else if (y < 116) col = y === 104 ? hex('#d8a46a') : (x % 20 === 0) ? hex('#4a2a14') : y < 108 ? hex('#8a5428') : hex('#6a3e1c');
    else col = ((Math.floor((x - 160) / (8 + (y - 116) * 0.4)) + Math.floor((y - 116) / 5)) & 1) ? hex('#c8b898') : hex('#7a5a3a');
    pset(x, y, col); }
  // las dos estanterías llenas de libros de colores
  for (const [sx, sw, sy] of [[12, 80, 22], [214, 60, 50]]) { rect(sx, sy, sx + sw, 104, K); rect(sx + 1, sy + 1, sx + sw - 1, 103, hex('#5a3418')); rect(sx - 2, sy - 2, sx + sw + 2, sy, hex('#3a2010'));
    for (let f = 0; f < Math.floor((104 - sy) / 20); f++) { const yb = sy + 20 + f * 20; rect(sx + 1, yb, sx + sw - 1, yb + 2, hex('#8a5428')); let xx = sx + 3; let k = 0; while (xx < sx + sw - 4) { const w = 3 + Math.floor(h(sx + k, f, 8) * 4), hh = 12 + Math.floor(h(k, f + sx, 9) * 6), c = [hex('#c83a3a'), hex('#3a6ab8'), hex('#e8c040'), hex('#3a8a4a'), hex('#8a3ac8'), hex('#e8803a')][Math.floor(h(k, f, sx) * 6)];
      if (xx + w > sx + sw - 3) break; rect(xx, yb - hh, xx + w - 1, yb - 1, c); rect(xx, yb - hh, xx, yb - 1, mez(c, hex('#ffffff'), 0.3)); rect(xx + w - 1, yb - hh, xx + w - 1, yb - 1, mez(c, K, 0.35)); rect(xx, yb - hh + 3, xx + w - 1, yb - hh + 3, mez(c, hex('#f0d080'), 0.5)); xx += w + (h(k, f, 3) > 0.85 ? 3 : 0); k++; } } }
  // sobre la estantería baja de la derecha, un globo terráqueo y una calavera de atrezo
  R.disco(232, 40, 8, K); R.disco(232, 40, 7, hex('#3a6ab8')); R.disco(230, 38, 3, hex('#3a8a4a')); R.disco(235, 43, 2, hex('#3a8a4a')); rect(231, 48, 233, 48, K); rect(226, 48, 238, 49, hex('#c8a040'));
  R.disco(256, 43, 5, hex('#f2eee2')); rect(253, 46, 259, 48, hex('#f2eee2')); R.disco(254, 43, 1.2, K); R.disco(258, 43, 1.2, K);
  // la ventana con cortinas y la luna, el cuadro del tentáculo, la lámpara de araña
  rect(110, 18, 140, 70, K); rect(111, 19, 139, 69, hex('#1a2a5a')); R.disco(130, 32, 6, hex('#f8f0c0')); R.disco(132, 31, 5, hex('#1a2a5a')); for (let k = 0; k < 7; k++) pset(114 + (k * 11) % 24, 24 + (k * 13) % 40, hex('#f2eee2')); rect(125, 19, 125, 69, hex('#c8945a')); rect(111, 44, 139, 44, hex('#c8945a'));
  rect(104, 14, 146, 17, hex('#8a2a2a')); rect(102, 17, 110, 78, hex('#a83a3a')); rect(140, 17, 148, 78, hex('#a83a3a')); for (let y = 18; y < 78; y += 3) { pset(105, y, hex('#6a1a1a')); pset(144, y, hex('#6a1a1a')); }
  rect(160, 30, 200, 70, K); rect(161, 31, 199, 69, hex('#c89a3a')); rect(164, 34, 196, 66, hex('#2a3a4a')); R.disco(180, 48, 7, hex('#3ab84a')); rect(174, 48, 186, 62, hex('#3ab84a')); pset(177, 46, K); pset(183, 46, K); rect(176, 52, 184, 52, K);
  // la puerta del fondo, abierta, con luz
  rect(96, 82, 118, 116, K); rect(97, 83, 117, 116, hex('#f8f0b0')); for (let y = 84; y < 116; y += 2) for (let x = 97; x < 118; x++) if ((x + y) % 4 === 0) pset(x, y, hex('#e8d880')); rect(92, 82, 96, 116, hex('#6a3418'));
  // la alfombra
  R.poligono([[110, 132], [210, 132], [236, 148], [84, 148]], hex('#8a2a3a')); R.poligono([[116, 134], [204, 134], [226, 146], [94, 146]], hex('#a83a4a')); for (let x = 100; x < 222; x += 6) pset(x, 140, hex('#e8c040'));
  // el sillón y la mesita con el candelabro
  rect(30, 112, 62, 140, K); rect(31, 113, 61, 139, hex('#3a4a8a')); rect(31, 113, 61, 117, hex('#5a6aa8')); rect(26, 120, 32, 140, hex('#2a3a6a')); rect(60, 120, 66, 140, hex('#2a3a6a'));
  rect(254, 118, 290, 122, K); rect(255, 118, 289, 121, hex('#a8743c')); rect(258, 122, 260, 140, K); rect(284, 122, 286, 140, K); rect(268, 106, 276, 118, hex('#c8a040')); rect(271, 100, 273, 106, hex('#f2eee2'));
};
const p6 = (t) => {
  if (!fondo6) { fondo6 = R.nuevo(); const prev = R.usar(fondo6); pintaSala(); R.usar(prev); }
  R.buf.set(fondo6);
  // la llama del candelabro y la lámpara que se mece
  pset(272, 98 + (Math.sin(t * 9) > 0 ? 0 : 1), hex('#fff0a0')); pset(272, 97, hex('#f0a020'));
  const la = Math.sin(t * 1.4) * 4; R.linea(206, 0, Math.round(206 + la), 18, K); R.disco(Math.round(206 + la), 21, 5, hex('#c8a040')); for (let k = -2; k <= 2; k++) pset(Math.round(206 + la + k * 3), 26, hex('#fff0a0'));
  // la luz de la puerta abierta que parpadea con un «?» que invita
  if (t > mirar - 0.4) { const v = Math.sin(t * 6) > 0; R.icono('?', 102, 90 - (v ? 1 : 0), hex('#3a8a4a'), hex('#f8f0b0'), 2); }
  // el tentáculo verde aplaude (las manitas se juntan y se separan) y, en «keep looking», señala la puerta
  const aplaude = t < mirar - 0.2, golpe = Math.floor(t * 8) % 2;
  const r = T.tentaculo(R, 168, 146, t, { s: 2, color: 'verde', expresion: 'feliz', brazos: 1, pose: aplaude ? (golpe ? 'arriba' : 'normal') : 'saluda', dir: aplaude ? 1 : -1, salto: aplaude ? Math.round(Math.abs(Math.sin(t * 8)) * 3) : 0 });
  if (aplaude && golpe) for (let k = 0; k < 4; k++) { const an = k * 1.57 + 0.78; pset(Math.round(168 + Math.cos(an) * 8), Math.round(146 - 72 + Math.sin(an) * 5), hex('#fff0a0')); }
  // el confeti que cae
  for (let k = 0; k < 46; k++) { const sp = 18 + h(k, 1, 4) * 26, y = ((t - P6 + 0.2) * sp + h(k, 2, 4) * 160) % 160 - 10, x = Math.round(h(k, 3, 4) * 320 + Math.sin(t * 3 + k) * 4); if (t < P6 + h(k, 5, 4) * 0.5 || y < 0) continue; const c = [hex('#f04a3a'), hex('#f0c040'), hex('#3ab8f0'), hex('#8ae87a'), hex('#e87ad8')][k % 5], fl = Math.floor(t * 8 + k) % 2; rect(x, Math.round(y), x + (fl ? 1 : 0), Math.round(y) + (fl ? 0 : 1), c); }
  // la línea de verbos y el cursor: va a «mirar» y lo pulsa en «keep looking»
  const r2 = T.verbos(R, t, { activo: t > mirar - 0.3 ? 0 : -1, pulsa: tramo(t, mirar, mirar + 0.3) < 1 ? tramo(t, mirar, mirar + 0.3) : 0, frase: t > mirar ? [0, 'puerta'] : null, inventario: ['moneda', 'llave', 'mapa', 'hamster'] });
  const bM = centro(r2.botones[0]);
  T.verbos(R, t, { barra: false, cursor: ruta(t, [[P6, 240, 60], [mirar - 0.6, 200, 120], [mirar - 0.15, bM[0], bM[1]], [mirar + 0.5, bM[0], bM[1]], [mirar + 1.2, 108, 100]]) });
};
const efectos = [[1.3, 'tecleo'], [muere, 'aviso'], [P2 + 1.0, 'toc'], [P2 + 1.7, 'golpecito'], [nunca, 'cerrojo'], [escribe, 'tecleo'], [titulo + 0.2, 'palmada'], [P4 + 0.3, 'tecleo'], [chupa, 'lapiz'], [regla, 'lapiz'], [muerte, 'lapiz'], [atasco - 0.1, 'lapiz'], [P5 + 0.9, 'bip'], [mal, 'boing'], [otra - 0.35, 'bip'], [otra + 0.1, 'pop'], [otra + 0.45, 'brillo'], [P6 + 0.2, 'palmada'], [mirar, 'bip']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { cartela: '1989', efectos, año: 1989 });
''')
