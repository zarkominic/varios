E = {}

# piezas comunes de las tres escenas (van al principio de cada cuerpo)
COMUN = r'''
const K = hex('#141018');
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const azar = (a, b = 0) => { const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return s - Math.floor(s); };
const caja = (x0, y0, x1, y1, c, b = K) => { R.rect(x0, y0, x1, y1, b); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, c); };
// oscurece (o aclara) una zona hacia un color, con un poco de trama: para dejar tranquila la esquina de Atom o la barra
const velo = (x0, y0, x1, y1, col, a) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, mez(R.pget(x, y), col, a)); };
// la taza de café de Banner (5 × 5, con su asa), (x, y) arriba a la izquierda; humo: el vapor que sube
const taza = (x, y, t, humo = true) => { R.rect(x, y, x + 4, y + 5, K); R.rect(x + 1, y + 1, x + 3, y + 4, hex('#f2eee2')); R.pset(x + 1, y + 1, hex('#5a3a24')); R.pset(x + 2, y + 1, hex('#5a3a24')); R.pset(x + 3, y + 1, hex('#5a3a24'));
  R.pset(x + 5, y + 2, K); R.pset(x + 6, y + 3, K); R.pset(x + 5, y + 4, K); R.pset(x + 3, y + 4, hex('#c8c4bc'));
  if (humo) for (let k = 0; k < 3; k++) { const f = (t * 0.9 + k / 3) % 1; R.pset(Math.round(x + 2 + Math.sin(t * 3 + k * 2) * 1.2), Math.round(y - 1 - f * 7), f > 0.6 ? hex('#8a8a90') : hex('#c8c8d0')); } };
// un actor del reparto dibujado a escala (silueta en una pantalla): col(c) da el color de cada píxel
const BUFA = R.nuevo();
const actorT = (def, x, suelo, t, o, col, a) => escalado(def, x - 12, suelo - 40, 1, t, o, (c) => mez(c, col, a));
const escalado = (def, x0, y0, s, t, o, col, clip = null) => { R.recorte(null); const prev = R.usar(BUFA); BUFA.fill(0); R.actor(def, 20, 44, t, o); R.usar(prev);
  for (let j = 4; j < 46; j++) for (let i = 8; i < 44; i++) { const c = BUFA[j * 320 + i]; if (!c) continue; const cc = col ? col(c, i, j) : c; for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) { const px = x0 + (i - 8) * s + a, py = y0 + (j - 4) * s + b; if (!clip || (px >= clip[0] && px <= clip[2] && py >= clip[1] && py <= clip[3])) R.pset(px, py, cc); } } };
'''

E['dd-bunker'] = ('El búnker', '''// DD-BUNKER (frases 6–8). Once planos:
// 1. el pasillo del búnker: Banner llega con su taza de café, se para ante la puerta estanca y da un sorbo; un ratón cruza;
// 2. lo que graba su cámara: habla con su tablilla («report»); en «green light» la luz verde entra y se vuelve, sorprendido;
// 3. la sala entera, verde: la voz de Doom (la máscara en la luz), «Hulk roars» (Banner es Hulk y la sala tiembla),
//    «vanish» (destello) y queda el símbolo humeando, la silla volcada y la taza;
// 4. a ras de suelo: el símbolo y la taza que da vueltas y se para (gag 2); en «Why» sale un «?» verde;
// 5. el escenario de la sala envolvente: los Russo llegan a sus sillas; en la pantalla, la silueta de Hulk con «?»; uno
//    niega, el otro se encoge de hombros («won't confirm»);
// 6. la sala de los Vengadores: el holograma de la máscara de Doom y Banner que da vueltas a su alrededor («revolves»);
// 7. la pared del salón: la mano arranca el 12 del taco y deja el 13 («November 13th»); con el mando enciende la tele y
//    sale el reestreno, el símbolo verde («Disney Plus»);
// 8. (cómic) Victor, encapuchado, sube por la montaña nevada hacia el monasterio; «1964» en el cartucho;
// 9. (cómic) llega a la fragua; los monjes sacan la máscara al rojo de las brasas y la martillean («forge»);
// 10. (cómic) de cerca: la máscara en las tenazas, el vapor y la capucha que se inclina («put it on before it had cooled»);
// 11. las dos imágenes juntas: el búnker vacío que grababa la cámara y la máscara del cómic; dos círculos y «=» («a nod»).''', COMUN + r'''
const A = (f) => en('bunker', f), B = (f) => en('porque', f), C = (f) => en('mascara', f);
const P2 = A(0.241), P3 = A(0.585), P4 = A(0.851), P5 = B(0.177), P6 = B(0.483), P7 = B(0.766), P8 = C(0), P9 = C(0.241), P10 = C(0.606), P11 = C(0.83);
const VERDE = hex('#3ae88a'), VERDES = hex('#1a8a4a');
// 1 · el pasillo: Banner llega con su café y da un sorbo junto a la puerta
const p1 = (t) => {
  const o = { encuadre: 'pasillo' }; T.bunker(R, t, o);
  const u = tramo(t, 0.15, A(0.16)), x = Math.round(lerp(14, 150, u)), sorbo = t > A(0.17) && t < A(0.23);
  // el ratón que cruza el suelo, por delante de las cajas
  const ur = tramo(t, 0.6, 2.2); if (ur > 0 && ur < 1) { const rx = Math.round(lerp(250, 40, ur)), ry = 158 - (Math.floor(t * 12) % 2); R.rect(rx, ry - 2, rx + 5, ry, K); R.rect(rx + 1, ry - 1, rx + 4, ry - 1, hex('#8a8490')); R.pset(rx, ry - 3, hex('#c88a9a')); R.linea(rx + 6, ry - 1, rx + 9, ry - 2 + (Math.floor(t * 8) % 2), hex('#c88a9a')); }
  const a = R.actor(EL.bannerDD, x, 160, t, { dir: 1, anda: u > 0 && u < 1, sostiene: sorbo ? [x + 13, 160 - 30] : true, sonrisa: sorbo });
  taza(a.mano[0] - 1, a.mano[1] - 5, t);
  T.bunkerDelante(R, t, o);
};
// 2 · lo que graba la cámara: habla con la tablilla; la luz verde entra y él se vuelve
const p2 = (t) => {
  const v = tramo(t, A(0.467), A(0.551)), o = { encuadre: 'bunker', camara: 'camara', verde: v, foco: [160, 120] }; T.bunker(R, t, o);
  const vuelve = t > A(0.49), x = Math.round(lerp(132, 140, tramo(t, A(0.49), A(0.53))));
  const habla = !vuelve && Math.sin(t * 7) > -0.2, dedo = !vuelve && (t % 2.2) > 1.4;
  const a = R.actor(EL.bannerDD, x, 170, t, { dir: vuelve ? -1 : 1, habla, dedo, sorpresa: vuelve, sostiene: dedo ? undefined : true });
  if (!dedo) { const [mx, my] = a.mano; caja(mx - 3, my - 7, mx + 3, my + 2, hex('#8a5a30')); R.rect(mx - 2, my - 5, mx + 2, my + 1, hex('#f2eee2')); R.rect(mx - 1, my - 8, mx + 1, my - 7, hex('#c8c4bc')); for (const yy of [-4, -2, 0]) R.linea(mx - 1, my + yy, mx + 1, my + yy, hex('#7a7e86')); }
  T.bunkerDelante(R, t, o);
};
// 3 · la sala entera en verde: la voz de Doom, Hulk ruge, desaparecen y queda el símbolo
const p3 = (t) => {
  const voz = A(0.631), hulk = A(0.699), van = A(0.796), vac = t > van + 0.12;
  const ruge = tramo(t, hulk - 0.1, hulk + 0.15) * (1 - tramo(t, van - 0.1, van + 0.1));
  const o = { encuadre: 'bunker', verde: vac ? 0.7 - tramo(t, van + 0.12, P4 - 0.1) * 0.5 : 0.7, ruge, vacio: vac ? 1 : 0, taza: 0, foco: [150, 110] };
  T.bunker(R, t, o);
  T.bunkerDelante(R, t, o);
  if (!vac) {
    if (t < hulk) actorT(EL.bannerDD, 120, 158, t, { dir: 1, sorpresa: true, brazos: t > voz }, VERDE, 0.3);
    else actorT(EL.hulk, 118, 158, t, { dir: 1, brazos: Math.floor(t * 4) % 2 === 0, enfado: true, habla: true, salto: Math.floor(t * 6) % 3 === 0 ? 1 : 0 }, VERDE, 0.2);
  }
  // la voz de Doom: la máscara se asoma en la luz, latiendo
  const m = tramo(t, voz - 0.1, voz + 0.4) * (1 - tramo(t, van - 0.2, van));
  if (m > 0.05 && Math.sin(t * 9) > -0.6) R.icono('mascara', 136, 40, m > 0.6 ? hex('#c8ffe0') : VERDE, VERDES, 4);
  // el destello de «vanish»
  const f = 1 - Math.min(1, Math.abs(t - van) / 0.18); if (f > 0) velo(0, 0, 319, 179, hex('#eafff2'), f * 0.85);
  if (t > hulk - 0.05 && t < hulk + 0.12) velo(0, 0, 319, 179, hex('#c8ffd8'), 0.5);
};
// 4 · a ras de suelo: el símbolo humea y la taza da vueltas hasta pararse; «?»
const p4 = (t) => {
  const o = { encuadre: 'pasillo', camara: 'suelo', taza: tramo(t, P4, B(0.14)) }; T.bunker(R, t, o);
  for (const [hx, hy, k] of [[40, 150, 0], [64, 166, 1], [236, 162, 2], [274, 146, 3]]) { const w = 16, d = Math.round(Math.sin(t * 1.3 + k) * (k === 3 ? 1 : 0)); R.poligono([[hx, hy + d], [hx + w, hy - 3 + d], [hx + w + 4, hy + 7], [hx + 4, hy + 10]], K); R.poligono([[hx + 1, hy + 1 + d], [hx + w, hy - 2 + d], [hx + w + 3, hy + 6], [hx + 4, hy + 9]], hex('#e8e4d8'));
    for (let l = 0; l < 3; l++) R.linea(hx + 4, hy + 3 + l * 2, hx + w - 2, hy + l * 2, hex('#8a8e9a')); }
  const q = tramo(t, B(0) - 0.1, B(0) + 0.35); if (q > 0) { const y = Math.round(lerp(110, 52, q)); R.icono('?', 148, y, Math.sin(t * 8) > 0 ? VERDE : hex('#c8ffe0'), K, 5); }
  T.bunkerDelante(R, t, o);
  velo(0, 0, 180, 22, hex('#1a1a20'), 0.55); velo(272, 0, 319, 50, hex('#1a1a20'), 0.6);
};
// 5 · la sala envolvente: los Russo, la silueta de Hulk con «?»
const p5 = (t) => {
  const o = { encuadre: 'reunion', camara: 'pantalla', vacia: true }; const g = T.sala(R, t, o), [x0, y0, x1, y1] = g.pantalla;
  for (let y = y0; y <= y1; y++) R.rect(x0, y, x1, y, mez(hex('#14102a'), hex('#3a1a4a'), (y - y0) / (y1 - y0)));
  for (let k = 0; k < 30; k++) { const sx = x0 + Math.floor(azar(k, 1) * (x1 - x0)), sy = y0 + Math.floor(azar(k, 2) * 50); if (Math.sin(t * 2 + k) > 0) R.pset(sx, sy, hex('#c8c8f0')); }
  for (let x = x0; x <= x1; x++) { const hh = 8 + Math.floor(azar(Math.floor(x / 7), 3) * 16); R.rect(x, y1 - hh, x, y1, hex('#0e0c18')); if ((x % 7) === 3 && azar(Math.floor(x / 7), Math.floor(t)) > 0.5) R.pset(x, y1 - hh + 4, hex('#e8c86a')); }
  const lat = 0.5 + 0.5 * Math.sin(t * 3);
  R.recorte([x0, y0, x1, y1]); R.halo(160, 62, 34, [hex('#1a2a3a'), hex('#1a3a3a'), hex('#1a5a4a')], 0.8);
  R.recorte(null); escalado(EL.hulk, 121, y0 - 2, 2, 0, { dir: 1, quieto: true }, (c) => mez(c, hex('#0a2a16'), 0.55 - 0.15 * lat), [x0, y0, x1, y1]);
  const q = tramo(t, B(0.42), B(0.45)); if (q > 0) R.icono('?', 182, y0 + 8, Math.sin(t * 9) > 0 ? hex('#ffffff') : VERDE, K, 4);
  const ll = tramo(t, P5 + 0.1, B(0.23)), dudan = t > B(0.223) && t < B(0.32), hombros = t > B(0.292) && t < B(0.38), miran = t > B(0.42);
  R.actor(EL.russoJoeDD, Math.round(lerp(92, 118, ll)), 165, t, { dir: miran ? 1 : (dudan ? (Math.floor(t * 6) % 2 ? 1 : -1) : 1), anda: ll > 0 && ll < 1, habla: dudan, dedo: miran && t < B(0.47) });
  R.actor(EL.russoAnthonyDD, Math.round(lerp(232, 190, ll)), 165, t, { dir: miran ? -1 : -1, anda: ll > 0 && ll < 1, brazos: hombros, sonrisa: hombros });
  T.salaDelante(R, t, o);
};
// 6 · la sala de los Vengadores: el holograma de la máscara y Banner que da vueltas a su alrededor
const BANNERITO = ['..kkk..', '.kHHHk.', '.kSSSk.', '.kgSgk.', '..kSk..', '.kCCCk.', 'kCCCCCk', '.kCCCk.', '.kFkFk.', '.kk.kk.'];
const p6 = (t) => {
  const o = { encuadre: 'reunion' }; T.sala(R, t, o);
  const cx = 160, cy = 104, on = tramo(t, P6, P6 + 0.5), gira = B(0.657);
  for (let y = cy - 20; y <= cy + 20; y++) for (let x = cx - 20; x <= cx + 20; x++) if (Math.hypot(x - cx, (y - cy) * 1.1) < 19) R.pset(x, y, mez(R.pget(x, y), hex('#0e2a3c'), 0.8 * on));
  if (on > 0.3) R.icono('mascara', cx - 14, cy - 16, (Math.floor(t * 10) % 7) ? hex('#5ae8a0') : hex('#c8ffe0'), hex('#0e5a3a'), 4);
  const ban = tramo(t, B(0.517), B(0.53));
  if (ban > 0) { const a = Math.PI + Math.max(0, t - gira) * 2.4, rx = 40, ry = 10, bx = Math.round(cx + Math.cos(a) * rx), by = Math.round(cy + 2 + Math.sin(a) * ry);
    for (let k = 0; k < 48; k++) { const b = k / 48 * Math.PI * 2; if ((k + Math.floor(t * 6)) % 3) { const ox = Math.round(cx + Math.cos(b) * rx), oy = Math.round(cy + 2 + Math.sin(b) * ry); R.pset(ox, oy, hex('#a8f0ff')); R.pset(ox, oy + 1, hex('#3a8ab8')); } }
    for (let j = 0; j < BANNERITO.length; j++) for (let i = 0; i < 7; i++) { const ch = BANNERITO[j][i]; if (ch === '.') continue; const col = { k: hex('#0e2a3c'), H: hex('#5a7aa8'), S: hex('#c8f0f8'), g: hex('#0e2a3c'), C: hex('#a89ae8'), F: hex('#6a7ac8') }[ch]; R.rect(bx - 7 + i * 2, by - 12 + j * 2, bx - 6 + i * 2, by - 11 + j * 2, col); } }
  const apunta = t > B(0.517) && t < B(0.62);
  R.actor(EL.russoJoeDD, 100, 160, t, { dir: 1, dedo: apunta, habla: apunta && Math.sin(t * 8) > 0 });
  R.actor(EL.russoAnthonyDD, 206, 160, t, { dir: -1, sonrisa: t > B(0.66), habla: t > B(0.66) && t < B(0.72) && Math.sin(t * 7) > 0, dedo: t > B(0.70) });
  T.salaDelante(R, t, o);
};
// 7 · la pared del salón de cerca (fondo local): la mano arranca el 12 del taco y queda el 13; con el mando enciende la
// tele y sale el reestreno (el símbolo verde)
const ROJOS = ['#ffd0c0', '#ff7a6a', '#e83a3a', '#b8202a', '#6a1018'].map(hex);
const BUFP = R.nuevo(); let paredOK = false;
const paredSalon = () => { R.recorte(null); const prev = R.usar(BUFP);
  // papel pintado crema con rayas y rombos pequeños, el zócalo de madera con cuarterones y la moldura
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) { const r = x % 16, rb = !((y < 24 && x < 180) || (x > 266 && y < 54)) && (((x + 8) % 16 === 0 && y % 16 === 8) || (((x + 8) % 16 === 1 || (x + 8) % 16 === 15) && (y % 16 === 7 || y % 16 === 9))); R.pset(x, y, rb ? hex('#b89a6a') : r < 2 ? hex('#e2d2ae') : r === 8 ? hex('#ddcba4') : hex('#ecdfc0')); }
  R.rect(0, 130, 319, 135, hex('#7a4a28')); R.rect(0, 130, 319, 130, hex('#a8703c')); R.rect(0, 135, 319, 135, hex('#3a2414'));
  for (let y = 136; y < 180; y++) for (let x = 0; x < 320; x++) { const v = Math.sin(x * 0.11 + Math.sin(y * 0.4) * 1.5) > 0.7; R.pset(x, y, v ? hex('#7a4a28') : hex('#8e5a30')); }
  for (let k = 0; k < 6; k++) { const x0 = 6 + k * 53; caja(x0, 142, x0 + 44, 174, hex('#8e5a30'), hex('#5a3418')); R.rect(x0 + 1, 143, x0 + 43, 143, hex('#b8803c')); }
  // un cuadro con un paisaje, el interruptor y un enchufe
  caja(126, 34, 166, 64, hex('#8a6a3a'), hex('#5a3a1a')); for (let y = 38; y <= 60; y++) R.linea(130, y, 162, y, y < 50 ? hex('#a8c8e8') : hex('#5a8a4a')); R.poligono([[130, 52], [142, 42], [154, 52]], hex('#7a8aa8')); R.disco(156, 44, 3, hex('#f6e8a0'));
  caja(132, 92, 140, 104, hex('#f2eee2'), hex('#a8a090')); R.rect(135, 95, 137, 99, hex('#c8c4bc'));
  // el mueble bajo de la tele, con su consola y una planta; la tele apagada
  caja(176, 112, 314, 130, hex('#6a4024'), K); R.rect(177, 113, 313, 114, hex('#8e5a30')); caja(196, 118, 232, 126, hex('#2a2a30')); R.pset(228, 122, hex('#5ae88a'));
  R.rect(292, 96, 306, 112, K); R.rect(293, 97, 305, 111, hex('#b85a3a')); for (const [i, h] of [[295, 18], [299, 26], [303, 16]]) R.rect(i, 96 - h, i + 2, 96, hex('#3a7a3a'));
  caja(180, 52, 286, 110, hex('#14141c'), K); R.rect(232, 110, 236, 112, K);
  R.usar(prev); paredOK = true; };
const p7 = (t) => {
  if (!paredOK) paredSalon(); R.copiar(BUFP);
  T.gato(R, 262, 111, t, { dir: -1 });
  // la tele: apagada con su reflejo; en «Disney Plus» se enciende con el reestreno
  const toca = B(0.944), luz = tramo(t, toca, toca + 0.3), sx0 = 184, sy0 = 56, sx1 = 282, sy1 = 106;
  if (luz <= 0) { for (let y = sy0; y <= sy1; y++) R.linea(sx0, y, sx1, y, hex('#1a1c26')); R.poligono([[sx0 + 10, sy0], [sx0 + 30, sy0], [sx0 + 8, sy1], [sx0 - 0, sy1]], hex('#262a36')); }
  else { R.recorte([sx0, sy0, sx1, sy1]); for (let y = sy0; y <= sy1; y++) R.linea(sx0, y, sx1, y, mez(hex('#2a2a28'), hex('#4a4a44'), (y - sy0) / (sy1 - sy0)));
    R.halo(233, 82, 30, [hex('#1a3a2a'), hex('#1a6a3a'), hex('#3ab86a')], 0.8 * luz); a_simb(233, 90, 26, 8, t, luz); taza(204, 94, t, false); R.recorte(null);
    if (t < toca + 0.15) velo(sx0, sy0, sx1, sy1, hex('#ffffff'), 0.7); }
  // el taco de calendario colgado de su clavo: la cabecera roja con el mes, el 13 debajo del 12
  const cx0 = 14, cy0 = 40, arr = B(0.8), u = tramo(t, arr - 0.05, arr + 0.5);
  R.linea(cx0 + 28, cy0 - 12, cx0 + 8, cy0 + 2, hex('#8a6a4a')); R.linea(cx0 + 28, cy0 - 12, cx0 + 48, cy0 + 2, hex('#8a6a4a')); R.disco(cx0 + 28, cy0 - 12, 2, hex('#5a5e6a'));
  caja(cx0 - 2, cy0, cx0 + 58, cy0 + 72, hex('#8a6a4a')); caja(cx0, cy0 + 2, cx0 + 56, cy0 + 70, hex('#f6f2e6')); R.rect(cx0 + 1, cy0 + 3, cx0 + 55, cy0 + 16, hex('#c8303a')); R.rect(cx0 + 1, cy0 + 16, cx0 + 55, cy0 + 16, hex('#8a1e28'));
  R.numero('11', cx0 + 28, cy0 + 13, { centro: true, rampa: ['#ffffff', '#fff0e0', '#ffe0d0', '#ffd0c0', '#ffc0b0'].map(hex) });
  R.numero('13', cx0 + 28, cy0 + 52, { tam: 16, centro: true, rampa: ROJOS });
  for (let i = 0; i < 7; i++) R.pset(cx0 + 6 + i * 7, cy0 + 64, hex('#c8c4bc'));
  const ro = tramo(t, arr + 0.5, arr + 1.1); for (let s = 0; s < ro * 50; s++) { const a = -Math.PI / 2 + s / 50 * Math.PI * 2.1; R.rect(Math.round(cx0 + 28 + Math.cos(a) * 20), Math.round(cy0 + 44 + Math.sin(a) * 14), Math.round(cx0 + 29 + Math.cos(a) * 20), Math.round(cy0 + 44 + Math.sin(a) * 14), hex('#e83a3a')); }
  if (u < 1) { const hx = Math.round(lerp(0, 90, u * u)), hy = Math.round(lerp(0, 60, u)), rot = Math.round(u * 6); R.poligono([[cx0 + hx, cy0 + 17 + hy], [cx0 + 56 + hx, cy0 + 17 + hy + rot], [cx0 + 56 + hx - rot, cy0 + 70 + hy + rot], [cx0 + hx - rot, cy0 + 70 + hy]], K);
    caja(cx0 + hx + 1, cy0 + 18 + hy, cx0 + 55 + hx, cy0 + 69 + hy, hex('#fbf8ee')); R.numero('12', cx0 + 28 + hx, cy0 + 52 + hy, { tam: 16, centro: true, rampa: ['#c8c8d0', '#8a8e9a', '#4a4e5a', '#2a2e3a', '#141018'].map(hex) }); }
  // la mano que arranca la hoja; después, la otra mano con el mando hacia la tele
  const va = tramo(t, P7 + 0.15, arr - 0.05), sal = tramo(t, arr + 0.3, arr + 0.9);
  if (sal < 1) { const wx = lerp(-8, cx0 + 22, va) + u * 20 - sal * 34, wy = lerp(116, cy0 + 34, va) + u * 10 + sal * 12; T.brazo(R, -4, 102, Math.round(wx), Math.round(wy), '#2a3a5a', 1, {}); }
  const ma = tramo(t, toca - 0.9, toca - 0.2) * (1 - tramo(t, P8 - 0.9, P8 - 0.2)), pul = t > toca - 0.08 && t < toca + 0.12 ? 2 : 0;
  if (ma > 0.02) { const wx = Math.round(lerp(336, 296, ma)), wy = Math.round(lerp(196, 152, ma)) + pul; T.brazo(R, 330, 178, wx, wy, '#2a3a5a', -1, {}); R.rect(wx - 11, wy - 9, wx - 7, wy + 1, K); R.rect(wx - 10, wy - 8, wx - 8, wy, hex('#2a2a34')); R.pset(wx - 9, wy - 7, pul ? hex('#ff5a4a') : hex('#c8303a')); }
};
// a_simb: el símbolo verde canónico, pequeño (para pantallas y fotos)
const a_simb = (cx, cy, rx, ry, t, a = 1) => T.a_simbolo ? T.a_simbolo(R, cx, cy, rx, ry, t, { brillo: a }) : null;
// 8 · (cómic) la montaña: Victor sube encapuchado hacia el monasterio; «1964»
const BUFM = R.nuevo(); let montOK = false;
const montana = () => {
  R.recorte(null); const prev = R.usar(BUFM);
  const TI = K, CI = [hex('#cfe4dc'), hex('#a4cec4'), hex('#f0c8b0')];
  for (let y = 8; y <= 171; y++) for (let x = 9; x <= 310; x++) { const f = (y - 8) / 90; R.pset(x, y, f < 0.45 ? CI[0] : f < 0.85 ? CI[1] : CI[2]); }
  const sierra = (base, alto, paso, semilla, col, colS, nieve) => { const pts = [[9, 171]]; for (let x = 9; x <= 311; x += paso) pts.push([x, base - alto * (0.4 + 0.6 * azar(x, semilla)) * (0.6 + 0.4 * Math.sin(x * 0.02 + semilla))]); pts.push([311, 171]);
    R.poligono(pts, col); for (let i = 1; i < pts.length - 2; i++) { R.linea(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], TI); const [ax, ay] = pts[i]; if (nieve && ay < base - alto * 0.55) R.poligono([[ax - 6, ay + 7], [ax, ay], [ax + 6, ay + 7], [ax + 2, ay + 5], [ax - 2, ay + 8]], nieve); }
    for (let x = 9; x < 311; x += 3) for (let y = base - 10; y < 171; y += 3) if ((x + y) % 6 === 0 && R.pget(x, y) === col) R.pset(x, y, colS); };
  sierra(92, 60, 18, 1, hex('#9a9cbc'), hex('#727496'), hex('#f4eedc'));
  sierra(122, 46, 14, 2, hex('#7a7c9c'), hex('#5c5e7e'), hex('#e8e2d0'));
  // el monasterio en lo alto de la loma, a la derecha
  R.poligono([[150, 171], [180, 112], [214, 86], [252, 82], [300, 98], [311, 104], [311, 171]], hex('#f4eedc'));
  R.linea(150, 171, 180, 112, TI); R.linea(180, 112, 214, 86, TI); R.linea(214, 86, 252, 82, TI); R.linea(252, 82, 300, 98, TI); R.linea(300, 98, 311, 104, TI);
  caja(222, 62, 256, 84, hex('#efe2c4'), TI); R.rect(223, 63, 255, 66, hex('#8a2e2e')); R.poligono([[220, 62], [239, 52], [258, 62]], hex('#8a2e2e')); R.linea(220, 62, 239, 52, TI); R.linea(239, 52, 258, 62, TI);
  R.rect(238, 47, 240, 52, hex('#e8b848')); for (const wx of [227, 236, 245]) R.poligono([[wx, 70], [wx + 5, 70], [wx + 4, 76], [wx + 1, 76]], TI); R.rect(249, 74, 253, 83, hex('#cc4a3a')); R.rect(249, 74, 253, 74, TI);
  caja(258, 70, 268, 84, hex('#cdbc98'), TI);
  // el camino en zigzag por la nieve, con piedras y matas
  const cam = [[30, 171], [90, 158], [60, 146], [128, 132], [104, 120], [170, 108], [214, 90]];
  for (let i = 0; i < cam.length - 1; i++) for (let w = -3; w <= 3; w++) R.linea(cam[i][0], cam[i][1] + w * 0.4, cam[i + 1][0], cam[i + 1][1] + w * 0.4, w === -3 || w === 3 ? hex('#aab6cc') : hex('#d8d4c8'));
  for (let k = 0; k < 26; k++) { const rx = 12 + Math.floor(azar(k, 7) * 290), ry = 112 + Math.floor(azar(k, 8) * 56); if (R.pget(rx, ry) === hex('#f4eedc')) { caja(rx, ry, rx + 4 + (k % 3), ry + 3, hex('#727496'), TI); R.rect(rx + 1, ry, rx + 3, ry, hex('#f4eedc')); } }
  for (let x = 9; x < 311; x += 4) for (let y = 100; y < 171; y += 4) if ((x + y) % 8 === 0 && R.pget(x, y) === hex('#f4eedc')) R.pset(x, y, hex('#aab6cc'));
  // un chorten de piedra junto al camino
  caja(54, 128, 70, 142, hex('#efe2c4'), TI); R.poligono([[52, 128], [62, 116], [72, 128]], hex('#efe2c4')); R.linea(52, 128, 62, 116, TI); R.linea(62, 116, 72, 128, TI); R.rect(61, 110, 63, 116, hex('#e8b848'));
  // abetos nevados en las laderas de la izquierda y en el pie de la loma
  const abeto = (x, y, h) => { R.rect(x, y - 2, x + 1, y, hex('#4a3020')); for (let k = 0; k < 3; k++) { const yy = y - 2 - k * Math.round(h / 3), w = 6 - k * 2; R.poligono([[x - w, yy], [x + 1, yy - Math.round(h / 2)], [x + w + 1, yy]], hex('#3a5e34')); R.linea(x - w, yy, x + 1, yy - Math.round(h / 2), TI); R.linea(x + 1, yy - Math.round(h / 2), x + w + 1, yy, TI); R.linea(x - w + 1, yy - 1, x - 1, yy - 2, hex('#f4eedc')); } };
  for (const [x, y, hh] of [[20, 136, 14], [34, 140, 12], [112, 150, 16], [126, 160, 14], [96, 166, 18], [140, 168, 12], [16, 160, 18], [200, 160, 12], [10, 120, 10], [44, 118, 9], [74, 112, 9]]) abeto(x, y, hh);
  // sombras rayadas en las laderas nevadas y montoncitos de nieve
  for (let k = 0; k < 140; k++) { const x = 160 + Math.floor(azar(k, 11) * 150), y = 104 + Math.floor(azar(k, 12) * 64); if (R.pget(x, y) === hex('#f4eedc') || R.pget(x, y) === hex('#aab6cc')) for (let i = 0; i < 6; i++) R.pset(x + i, y + Math.floor(i / 2), hex('#aab6cc')); }
  for (const [x, y, hh] of [[236, 150, 14], [258, 166, 16], [290, 140, 12], [300, 162, 18], [212, 132, 10]]) abeto(x, y, hh);
  for (let k = 0; k < 30; k++) { const x = 170 + Math.floor(azar(k, 13) * 136), y = 120 + Math.floor(azar(k, 14) * 46); R.linea(x, y, x + 8, y - 2, TI); R.linea(x + 1, y - 1, x + 7, y - 3, hex('#f4eedc')); }
  for (let x = 9; x < 160; x += 2) for (let y = 104; y < 171; y += 2) if (R.pget(x, y) === hex('#7a7c9c') && (x * 3 + y) % 7 === 0) R.linea(x, y, x + 2, y + 2, hex('#5c5e7e'));
  R.usar(prev); montOK = true;
};
const p8 = (t) => {
  T.comic(R, t, { encuadre: 'fragua' });
  if (!montOK) montana();
  for (let y = 8; y <= 171; y++) for (let x = 9; x <= 310; x++) R.pset(x, y, BUFM[y * 320 + x]);
  // las nubes que pasan, el humo de la fragua y su chispa (el martilleo, lejos)
  for (const [x0, y, w, v] of [[40, 30, 30, 3], [150, 22, 40, 2], [230, 40, 24, 4]]) { const x = ((x0 + t * v) % 330) - 10; R.disco(x, y, w / 4, K); R.disco(x + w / 4, y - 2, w / 4, K); R.disco(x, y, w / 4 - 1, hex('#f6eed6')); R.disco(x + w / 4, y - 2, w / 4 - 1, hex('#f6eed6')); R.disco(x + w / 2, y + 1, w / 5, K); R.disco(x + w / 2, y + 1, w / 5 - 1, hex('#f6eed6')); }
  for (let k = 0; k < 6; k++) { const f = (t * 0.4 + k / 6) % 1; R.disco(263 + f * 8 + Math.sin(t + k) * 2, 68 - f * 26, 1.5 + f * 2.5, f > 0.6 ? hex('#c8cec0') : hex('#a8aeb0')); }
  if ((t % 1.1) < 0.12) { R.icono('!', 274, 72, hex('#e8b848'), K, 1); }
  // las banderitas de oración que ondean en una cuerda
  for (let k = 0; k < 9; k++) { const x = 140 + k * 9, y = 96 + Math.round(Math.abs(k - 4) * 1.2), c = ['#4270aa', '#f6eed6', '#cc4a3a', '#5a8a48', '#e8b848'][k % 5]; R.pset(x, y - 1, K); R.poligono([[x, y], [x + 6, y], [x + 3 + Math.round(Math.sin(t * 6 + k)), y + 6]], hex(c)); }
  R.linea(136, 95, 222, 95, K);
  // Victor sube por el camino, encapuchado, con un hatillo
  const u = tramo(t, P8 + 0.1, P9 - 0.2), tr = [[24, 171], [84, 158], [62, 146], [118, 134]];
  const seg = Math.min(2.999, u * 3), i = Math.floor(seg), f = seg - i, vx = lerp(tr[i][0], tr[i + 1][0], f), vy = lerp(tr[i][1], tr[i + 1][1], f);
  for (let k = 0; k < 40; k++) { const uu = k / 40; if (uu > u - 0.03) break; const sg = Math.min(2.999, uu * 3), ii = Math.floor(sg), ff = sg - ii; R.pset(Math.round(lerp(tr[ii][0], tr[ii + 1][0], ff)) + (k % 2 ? 2 : -2), Math.round(lerp(tr[ii][1], tr[ii + 1][1], ff)) - 1, hex('#8a92aa')); }
  R.actor(EL.doomJovenDD, Math.round(vx) - 7, Math.round(vy) - 2, t, { dir: tr[i + 1][0] > tr[i][0] ? 1 : -1, anda: u > 0 && u < 1 });
  // la nieve
  for (let k = 0; k < 60; k++) { const x = 9 + ((azar(k, 3) * 302 + t * 10) % 302), y = 8 + ((azar(k, 4) * 164 + t * (14 + 8 * azar(k, 5))) % 164); R.pset(Math.round(x), Math.round(y), hex('#fbf6ea')); }
  T.comicDelante(R, t, { encuadre: 'fragua' });
  // el cartucho del año
  const c = tramo(t, C(0.15), C(0.15) + 0.25); if (c > 0) { const w = Math.round(46 * c); caja(14, 22, 14 + Math.max(4, w), 38, hex('#f6d860')); if (c > 0.8) R.numero('1964', 37, 34, { centro: true, rampa: ['#2a2030', '#141018', '#141018', '#141018', '#141018'].map(hex) }); }
};
// 9 · (cómic) la fragua del monasterio: llega Victor; los monjes sacan la máscara y la martillean
const p9 = (t) => {
  const saca = C(0.524), forja = C(0.58), m = t < saca ? 0.1 : lerp(0.2, 0.55, tramo(t, saca, saca + 0.6));
  const o = { encuadre: 'fragua', mascara: m }; T.comic(R, t, o);
  const u = tramo(t, P9 + 0.1, C(0.37)), vx = Math.round(lerp(52, 96, u));
  R.actor(EL.doomJovenDD, vx, 150, t, { dir: 1, anda: u > 0 && u < 1 });
  // el monje del fuelle: empuja y suelta
  const sopla = Math.floor(t * 2.4) % 2 === 0;
  R.actor(EL.monjeDD, 244, 150, t, { dir: 1, brazos: sopla, sonrisa: !sopla });
  // el monje del martillo: se inclina ante Victor y, al sacar la máscara, la golpea
  const mx = 140, golpe = t > forja ? ((t - forja) % 0.36) / 0.36 : -1, inclina = t > C(0.38) && t < C(0.46);
  const a = R.actor(EL.monjeDD, mx, 150, t, { dir: 1, salto: inclina ? 0 : 0, triste: inclina, sostiene: [mx + 20, golpe >= 0 ? (golpe < 0.5 ? 116 : 128) : 124] });
  const [hx, hy] = a.mano; R.linea(hx, hy, hx + 5, hy - 4, hex('#6a4a2a')); R.linea(hx + 1, hy, hx + 6, hy - 4, hex('#4a3020')); caja(hx + 4, hy - 8, hx + 9, hy - 3, hex('#7a7e86'));
  if (golpe >= 0 && golpe < 0.3) for (let k = 0; k < 6; k++) { const an = k * 1.05 + t * 5, r = 4 + golpe * 20; R.pset(Math.round(172 + Math.cos(an) * r), Math.round(126 - Math.abs(Math.sin(an)) * r), k % 2 ? hex('#ffe08a') : hex('#ff8a3a')); }
  // el segundo monje saca la máscara de las brasas con las tenazas
  R.actor(EL.monjeDD, 192, 150, t, { dir: 1, sostiene: t > saca - 0.6 && t < saca + 0.5 ? [208, 124] : true });
  T.comicDelante(R, t, o);
};
// 10 · (cómic) de cerca: la máscara al rojo en las tenazas, el vapor; la capucha se inclina para ponérsela
const p10 = (t) => {
  const pone = C(0.694), enfria = C(0.775), o = { encuadre: 'fragua', camara: 'vapor', calor: 1 - tramo(t, P10, enfria) * 0.75 }; T.comic(R, t, o);
  const b = tramo(t, pone, pone + 0.5) * (1 - tramo(t, enfria + 0.2, enfria + 1));
  for (let k = 0; k < 14; k++) { const f = (t * 0.7 + k / 14) % 1, x = 120 + azar(k, 2) * 90 + Math.sin(t * 2 + k) * 6, y = 150 - f * 120, r = 4 + f * 10 * (0.5 + b);
    if (b > 0.05 || k < 5) { R.disco(x, y, r + 1, hex('#c8cec0')); R.disco(x, y, r, hex('#f6eed6')); } }
  T.comicDelante(R, t, o);
};
// 11 · el guiño: la película (lo que grababa la cámara, el búnker vacío) junto al cómic (la máscara en el vapor); «=»
const BUF1 = R.nuevo(), BUF2 = R.nuevo();
const p11 = (t) => {
  let prev = R.usar(BUF1); const o1 = { encuadre: 'bunker', camara: 'camara', vacio: 1, verde: 0.25, taza: tramo(t, P11, P11 + 3) }; T.bunker(R, t, o1); T.bunkerDelante(R, t, o1); R.usar(prev);
  prev = R.usar(BUF2); const o2 = { encuadre: 'fragua', camara: 'vapor', calor: 0.35 }; T.comic(R, t, o2); T.comicDelante(R, t, o2); R.usar(prev);
  for (let y = 0; y < 180; y++) { for (let x = 0; x < 160; x++) R.pset(x, y, BUF1[y * 320 + x + 80]); for (let x = 160; x < 320; x++) R.pset(x, y, BUF2[y * 320 + x - 74]); }
  R.rect(157, 0, 162, 179, K); R.rect(159, 0, 160, 179, hex('#f6f2e6'));
  // la esquina de Atom, en papel de cómic (como el escalón de las viñetas)
  R.rect(268, 0, 319, 52, K); R.rect(271, 0, 319, 49, hex('#f0e4c0')); for (let k = 0; k < 30; k++) R.pset(272 + Math.floor(azar(k, 1) * 46), Math.floor(azar(k, 2) * 48), hex('#dccb9c'));
  // los dos círculos de rotulador (el símbolo y la máscara) y el «=» en «a nod»
  const ci = tramo(t, C(0.9), C(0.9) + 0.9);
  for (const [k, cx, cy, rx, ry] of [[0, 80, 158, 36, 14], [1, 252, 98, 46, 56]]) { const e = Math.min(1, ci * 2 - k * 0.8); if (e <= 0) continue; for (let s2 = 0; s2 < e * 90; s2++) { const an = -Math.PI / 2 + s2 / 90 * Math.PI * 2.1; const px = Math.round(cx + Math.cos(an) * rx), py = Math.round(cy + Math.sin(an) * ry); R.rect(px, py, px + 1, py + 1, hex('#f6c83a')); } }
  const ig = tramo(t, C(0.941) - 0.1, C(0.941) + 0.2); if (ig > 0) { caja(146, 80, 173, 104, hex('#f6d860')); const s = Math.max(1, Math.round(3 * ig)); R.rect(151, 86, 168, 86 + s, K); R.rect(151, 96, 168, 96 + s, K); }
};
const efectos = [[0.4, 'vapor'], [A(0.2), 'burbujas'], [P2 + 0.15, 'bip'], [A(0.467), 'zumbido'], [A(0.551), 'rafaga'], [A(0.631), 'trueno'], [A(0.699), 'boom'], [A(0.796), 'flash'], [A(0.82), 'golpecito'],
  [P4 + 0.3, 'vapor'], [B(0), 'pop'], [B(0.14), 'golpecito'], [P5 + 0.1, 'publico'], [B(0.42), 'pop'], [B(0.517), 'brillo'], [B(0.657), 'whoosh'],
  [B(0.8), 'papel'], [B(0.944), 'bip'], [B(0.944) + 0.2, 'zumbido'], [P8 + 0.2, 'viento'], [C(0.155), 'pop'], [P9 + 0.2, 'puerta'], [C(0.524), 'vapor'], [C(0.58), 'toc'], [C(0.58) + 0.36, 'toc'],
  [C(0.694), 'vapor'], [C(0.775), 'burbujas'], [P11 + 0.2, 'whoosh'], [C(0.9), 'lapiz'], [C(0.941), 'brillo']];
const año = (t) => (t >= P8 && t < P11 ? null : 2026);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9], [P10, p10], [P11, p11]], { efectos, año });
''')

E['dd-visionquest'] = ('VisionQuest', '''// DD-VISIONQUEST (frases 9–10). Seis planos:
// 1. el salón de Atom: el calendario de noviembre (se rodea el 10); en la tele, el menú de la serie: el cursor llega al
//    último episodio («last episode») y se abre la imagen del sintezoide rojo con su gema; la mano con el mando;
// 2. otra tele, la de la habitación en penumbra: corren los créditos y, en «Wundagore», vuelve la montaña en ruinas;
// 3. un cine en 2022: en la pantalla, el derrumbe de Wundagore (la Bruja Escarlata con su onda roja, las rocas que caen);
//    al público le saltan las palomitas;
// 4. el piso de Ultron: se encienden dos apliques («two scenes»); entra Ultron, calvo y con gafas, y se para ante la
//    ventana con la ciudad bajo la lluvia («new look»);
// 5. de cerca, en el alféizar: su mano levanta la memoria USB con su etiqueta rosa que se ilumina («Jocasta»);
// 6. Atom aparta esa imagen a un lado («belongs to the series») y queda la cumbre de Wundagore: en «second» late la luz
//    verde y la gente del pueblo la señala.''', COMUN + r'''
const V = (f) => en('vision', f), U = (f) => en('ultron', f);
const P2 = V(0.367), P3 = V(0.725), P4 = U(-0.003), P5 = U(0.386), P6 = U(0.699);
const VERDE = hex('#3ae88a');
// el sintezoide de la serie: piel roja, traje verde y la gema amarilla (variante del héroe del 19)
const SINTE = { ...EL.steve, pal: { ...EL.steve.pal, H: hex('#c8303a'), h: hex('#a8202a'), S: hex('#d84a4a'), s: hex('#a83030'), C: hex('#3a7a4a'), c: hex('#2a5a38'), W: hex('#3a7a4a'), G: hex('#e8b830'), I: hex('#2a5a38'), F: hex('#3a7a4a'), n: hex('#2a5a38'), X: hex('#e8b830'), r: hex('#2a5a38') } };
// 1 · el salón de Atom: el calendario, el menú de la serie y el último episodio
const menu = (R, t, [x0, y0, x1, y1]) => {
  for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, mez(hex('#0a0e2a'), hex('#1a1e4a'), (y - y0) / (y1 - y0)));
  const abre = tramo(t, V(0.207), V(0.207) + 0.5), sel = Math.min(4, Math.floor(tramo(t, 0.8, V(0.171)) * 4.999));
  // la cabecera: el sintezoide pequeño ante la gema que brilla
  const bx0 = x0 + 6, by0 = y0 + 5, bx1 = x1 - 6, by1 = y0 + 38;
  caja(bx0, by0, bx1, by1, hex('#2a1a3a'), hex('#5a4a8a')); for (let y = by0 + 1; y < by1; y++) R.linea(bx0 + 1, y, bx1 - 1, y, mez(hex('#3a1a3a'), hex('#e87a3a'), Math.max(0, (y - by0) / (by1 - by0) - 0.3)));
  R.disco(bx1 - 22, by0 + 14, 7, hex('#e8b830')); R.disco(bx1 - 22, by0 + 14, 4, hex('#fff0a0'));
  escalado(SINTE, bx0 + 10, by0 - 6, 1, t, { dir: 1, quieto: true }, null, [bx0 + 1, by0 + 1, bx1 - 1, by1 - 1]); R.recorte([x0, y0, x1, y1]);
  for (let k = 0; k < 3; k++) R.rect(bx0 + 40, by0 + 8 + k * 6, bx0 + 40 + [36, 26, 30][k], by0 + 10 + k * 6, k ? hex('#8a8ab8') : hex('#e8e8f8'));
  // la fila de episodios y el cursor que llega al último
  for (let k = 0; k < 5; k++) { const cx = x0 + 8 + k * 22, cy = y0 + 46; caja(cx, cy, cx + 19, cy + 14, [hex('#3a2a5a'), hex('#5a2a2a'), hex('#2a4a3a'), hex('#4a3a2a'), hex('#3a6a4a')][k], hex('#14141e'));
    R.disco(cx + 6 + k, cy + 7, 3, [hex('#e8b830'), hex('#c8303a'), hex('#5ae8a0'), hex('#e87a3a'), hex('#e8b830')][k]); R.rect(cx + 2, cy + 11, cx + 17, cy + 12, hex('#14141e'));
    if (k === sel && Math.floor(t * 4) % 4) { R.linea(cx - 1, cy - 1, cx + 20, cy - 1, hex('#ffffff')); R.linea(cx - 1, cy + 15, cx + 20, cy + 15, hex('#ffffff')); R.linea(cx - 1, cy - 1, cx - 1, cy + 15, hex('#ffffff')); R.linea(cx + 20, cy - 1, cx + 20, cy + 15, hex('#ffffff')); } }
  for (let k = 0; k < 5; k++) R.rect(x0 + 8 + k * 22, y0 + 64, x0 + 8 + k * 22 + 12, y0 + 65, hex('#5a5a8a'));
  // el último episodio se abre a toda la pantalla
  if (abre > 0) { const cx = x0 + 8 + 4 * 22, cy = y0 + 46, ax0 = Math.round(lerp(cx, x0, abre)), ay0 = Math.round(lerp(cy, y0, abre)), ax1 = Math.round(lerp(cx + 19, x1, abre)), ay1 = Math.round(lerp(cy + 14, y1, abre));
    for (let y = ay0; y <= ay1; y++) R.linea(ax0, y, ax1, y, mez(hex('#1a1030'), hex('#6a2a3a'), (y - ay0) / Math.max(1, ay1 - ay0)));
    for (let k = 0; k < 20; k++) R.pset(ax0 + Math.floor(azar(k, 1) * (ax1 - ax0)), ay0 + Math.floor(azar(k, 2) * (ay1 - ay0) * 0.6), Math.sin(t * 3 + k) > 0 ? hex('#ffffff') : hex('#8a8ab0'));
    if (abre >= 1) { R.halo(x0 + 60, y0 + 30, 22, [hex('#3a2a3a'), hex('#6a4a3a'), hex('#a87a3a')], 0.9); escalado(SINTE, x0 + 24, y0 + 6, 2, t, { dir: 1, sonrisa: true }, null, [x0, y0, x1, y1]); R.recorte([x0, y0, x1, y1]);
      const gx = x0 + 24 + (27 - 8) * 2, gy = y0 + 6 + (21 - 4) * 2; R.disco(gx, gy, 2, hex('#fff0a0')); if (Math.sin(t * 6) > 0) R.disco(gx, gy, 4, hex('#e8b830')); R.disco(gx, gy, 1.5, hex('#ffffff')); } }
};
const p1 = (t) => {
  const o = { encuadre: 'estudio', camara: 'tele', mes: 11, inicio: 0, diasMes: 30, tachados: [1, 2, 3, 4, 5, 6, 7, 8, 9], imagen: menu };
  T.estudio(R, t, o);
  // el 10 del calendario, rodeado a rotulador
  const ro = tramo(t, V(0.076), V(0.076) + 0.6); for (let s = 0; s < ro * 40; s++) { const a = -Math.PI / 2 + s / 40 * Math.PI * 2.1; R.rect(Math.round(57 + Math.cos(a) * 7), Math.round(67 + Math.sin(a) * 6), Math.round(57 + Math.cos(a) * 7), Math.round(67 + Math.sin(a) * 6), hex('#e83a3a')); }
  T.estudioDelante(R, t, o);
  // la mano con el mando: pulsa cada vez que el cursor avanza
  const pulsa = (t > 0.8 && t < V(0.2) && (t * 1.4) % 1 < 0.2) ? 2 : 0, sal = tramo(t, 0, 0.6) * (1 - tramo(t, P2 - 0.8, P2 - 0.1));
  const wx = Math.round(lerp(10, 42, sal)), wy = Math.round(lerp(200, 164, sal)) + pulsa;
  if (sal > 0.02) { T.brazo(R, 8, 194, wx, wy, '#3a4a6a', 1, {}); R.rect(wx + 7, wy - 9, wx + 11, wy + 1, K); R.rect(wx + 8, wy - 8, wx + 10, wy, hex('#2a2a34')); R.pset(wx + 9, wy - 7, pulsa ? hex('#ff5a4a') : hex('#c8303a')); R.pset(wx + 9, wy - 4, hex('#8a8a9a')); }
};
// 2 · la tele de la habitación en penumbra: los créditos y, en «Wundagore», las ruinas
const p2 = (t) => {
  const vuelve = V(0.535), o = { encuadre: 'cumbre', camara: 'tele', canal: 'ruinas' }; const g = T.wundagore(R, t, o), [x0, y0, x1, y1] = g.pantalla;
  if (t < vuelve) { R.recorte([x0, y0, x1, y1]); for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, hex('#06060c'));
    const sc = (t - P2) * 16; for (let k = 0; k < 40; k++) { const y = Math.round(y0 + 4 + k * 8 - sc); if (y < y0 - 2 || y > y1) continue; const w1 = 14 + Math.floor(azar(k, 1) * 26), w2 = 10 + Math.floor(azar(k, 2) * 30);
      R.linea(x0 + 76 - w1, y, x0 + 76, y, hex('#a8a8b8')); R.linea(x0 + 84, y, x0 + 84 + w2, y, hex('#e8e8f0')); if (k % 6 === 0) R.linea(x0 + 60, y - 3, x0 + 100, y - 3, hex('#e8c86a')); }
    R.recorte(null); }
  else { const f = 1 - tramo(t, vuelve, vuelve + 0.3); if (f > 0) velo(x0, y0, x1, y1, hex('#ffffff'), f * 0.8); }
  T.gato(R, 40, 141, t, { dir: 1 });
};
// 3 · un cine en 2022: el derrumbe de Wundagore en la pantalla; al público le saltan las palomitas
const BUFR = R.nuevo();
const p3 = (t) => {
  const o = { encuadre: 'imax', camara: 'sala', peli: 'doom' }; const g = T.cine(R, t, o), [x0, y0, x1, y1] = g.pantalla;
  const prev = R.usar(BUFR); const or = { encuadre: 'ruinas', recuerdo: 1 }; T.wundagore(R, t, or);
  const cae = tramo(t, P3, V(0.932)); if (cae < 0.55) R.actor(EL.wandaDD, 196, 104, t, { dir: -1, brazos: true, enfado: true });
  T.wundagoreDelante(R, t, or); R.usar(prev);
  const sx0 = x0 + 4, sy0 = y0 + 4, sx1 = x1 - 4, sy1 = y1 - 3;
  for (let y = sy0; y <= sy1; y++) for (let x = sx0; x <= sx1; x++) { const bx = Math.floor((x - sx0) / (sx1 - sx0) * 319), by = 34 + Math.floor((y - sy0) / (sy1 - sy0) * 118); R.pset(x, y, mez(BUFR[by * 320 + bx], hex('#0a0a14'), 0.12)); }
  // las palomitas que saltan de un cubo de la fila de delante, en «brought down»
  const sal = tramo(t, P3 + 0.3, P3 + 1.6); if (sal > 0 && sal < 1) for (let k = 0; k < 9; k++) { const vx = (azar(k, 3) - 0.5) * 50, vy = 40 + azar(k, 4) * 30, tt = sal * 1.4; const px = Math.round(160 + vx * tt), py = Math.round(150 - vy * tt + 60 * tt * tt); R.rect(px, py, px + 1, py + 1, hex('#fff4c8')); R.pset(px, py, hex('#e8c86a')); }
  T.cineDelante(R, t, o);
};
// 4 · el piso de Ultron: dos apliques que se encienden, Ultron entra y se para ante la ventana con lluvia
const BUFU = R.nuevo(); let pisoOK = false;
const piso = () => {
  R.recorte(null); const prev = R.usar(BUFU);
  // pared de hormigón pulido con juntas y manchas; techo; suelo de tablas oscuras
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const n = azar(x >> 1, y >> 1); R.pset(x, y, (x % 40 === 0 || y % 36 === 0) ? hex('#1a2026') : n > 0.9 ? hex('#3a444c') : n < 0.1 ? hex('#262e34') : hex('#2e383e')); }
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const pl = Math.floor((x + (y % 2) * 0) / 46 + (y - 150) / 6); R.pset(x, y, y % 6 === 0 ? hex('#1a120e') : (azar(pl, y) > 0.85 ? hex('#4a3020') : (pl % 2 ? hex('#3a2618') : hex('#42301e')))); }
  R.rect(0, 148, 319, 150, hex('#14100c'));
  // la ventana grande con el marco de acero
  caja(146, 28, 272, 134, hex('#0a1020'), hex('#0c0e12'));
  // la estantería con piezas de robot, libros y una cabeza de maniquí metálica
  caja(14, 34, 112, 38, hex('#5a4a3a')); caja(14, 66, 112, 70, hex('#5a4a3a')); caja(14, 98, 112, 102, hex('#5a4a3a'));
  for (let k = 0; k < 12; k++) { const x = 18 + k * 7, hh = 14 + (k * 5) % 9; caja(x, 66 - hh, x + 5, 65, [hex('#7a2a2a'), hex('#2a4a7a'), hex('#6a6a3a'), hex('#3a3a46')][k % 4]); }
  for (let k = 0; k < 5; k++) { const gx = 22 + k * 18; R.disco(gx, 30, 5, K); R.disco(gx, 30, 4, hex('#8a8e9a')); R.disco(gx, 30, 1.5, K); for (let a = 0; a < 8; a++) R.pset(Math.round(gx + Math.cos(a * 0.785) * 5.5), Math.round(30 + Math.sin(a * 0.785) * 5.5), hex('#8a8e9a')); }
  R.disco(84, 88, 8, K); R.disco(84, 88, 7, hex('#a8acb8')); R.rect(80, 86, 82, 87, K); R.rect(86, 86, 88, 87, K); R.rect(77, 95, 91, 97, hex('#5a5e6a'));
  for (let k = 0; k < 3; k++) { caja(20 + k * 16, 84, 32 + k * 16, 97, hex('#4a4e5a')); R.rect(23 + k * 16, 87, 29 + k * 16, 90, hex('#2a6a8a')); }
  // el banco de trabajo con dos monitores y un brazo robótico desmontado
  caja(10, 116, 128, 122, hex('#4a3a2a')); R.rect(16, 122, 19, 148, hex('#2a2018')); R.rect(118, 122, 121, 148, hex('#2a2018'));
  caja(20, 92 + 10, 52, 114, hex('#14181e')); caja(58, 98, 92, 114, hex('#14181e')); R.rect(34, 114, 38, 116, hex('#2a2a30')); R.rect(73, 114, 77, 116, hex('#2a2a30'));
  R.linea(96, 114, 104, 104, hex('#8a8e9a')); R.linea(104, 104, 114, 108, hex('#8a8e9a')); R.disco(104, 104, 2, hex('#5a5e6a')); R.disco(114, 108, 2, hex('#c8303a'));
  // el sillón de cuero y la lámpara de pie a la derecha
  caja(280, 112, 314, 148, hex('#3a2418')); caja(276, 124, 318, 136, hex('#4a2e1e')); R.rect(282, 114, 312, 118, hex('#5a3a26'));
  R.rect(298, 56, 299, 110, hex('#2a2a30')); R.poligono([[290, 56], [308, 56], [304, 46], [294, 46]], hex('#c8a060')); R.linea(290, 56, 308, 56, K);
  // la alfombra gris con cenefa, un plano de un robot enmarcado y el cable que cuelga
  for (let y = 158; y < 178; y++) for (let x = 140; x < 280; x++) { const bx = x - 140, by = y - 158; R.pset(x, y, (bx < 3 || bx > 136 || by < 2 || by > 17) ? hex('#5a2a2a') : ((bx + by * 2) % 12 < 2 ? hex('#4a4e5a') : hex('#3a3e4a'))); }
  caja(114, 44, 140, 66, hex('#1e3a6a'), hex('#8a7a5a')); for (let k = 0; k < 4; k++) R.linea(117, 47 + k * 5, 137, 47 + k * 5, hex('#3a5a8a')); R.disco(127, 52, 4, hex('#c8d8f0')); R.rect(124, 56, 130, 63, hex('#c8d8f0')); R.rect(126, 52, 126, 52, hex('#1e3a6a')); R.rect(128, 52, 128, 52, hex('#1e3a6a'));
  for (let y = 0; y < 150; y++) { R.pset(136 + Math.round(Math.sin(y * 0.05) * 1), y, y > 70 ? hex('#1a1e24') : hex('#14181c')); }
  R.usar(prev); pisoOK = true;
};
const lluviaCiudad = (t, x0, y0, x1, y1, cerca = false) => {
  R.recorte([x0, y0, x1, y1]);
  for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, mez(hex('#0a0e22'), hex('#2a2a4a'), (y - y0) / (y1 - y0)));
  for (let k = 0; k < 24; k++) { const bx = x0 + Math.floor(azar(k, 9) * (x1 - x0)), bw = 8 + Math.floor(azar(k, 10) * 14), bh = 20 + Math.floor(azar(k, 11) * (y1 - y0) * 0.7), far = k < 12;
    R.poligono([[bx, y1 + 1], [bx, y1 - bh], [bx + bw, y1 - bh], [bx + bw, y1 + 1]], far ? hex('#161a30') : hex('#0c0e1c'));
    for (let wy = y1 - bh + 3; wy < y1; wy += 4) for (let wx = bx + 2; wx < bx + bw - 1; wx += 3) if (azar(wx, wy + Math.floor(t / 3) * (k % 3 === 0 ? 1 : 0)) > 0.62) R.pset(wx, wy, far ? hex('#8a7a4a') : hex('#e8c86a')); }
  if (cerca) for (let k = 0; k < 14; k++) { const bx = x0 + azar(k, 20) * (x1 - x0), by = y0 + azar(k, 21) * (y1 - y0); if (by < 30 || (bx > 264 && by < 56)) continue; R.disco(bx, by, 4 + azar(k, 22) * 5, mez(hex('#2a2a4a'), [hex('#e8c86a'), hex('#e83a5a'), hex('#5ac8e8')][k % 3], 0.35)); }
  for (let k = 0; k < 50; k++) { const lx = x0 + ((azar(k, 5) * (x1 - x0) + t * 6) % (x1 - x0)), ly = y0 + ((azar(k, 6) * (y1 - y0) + t * 90) % (y1 - y0)); R.linea(Math.round(lx), Math.round(ly), Math.round(lx - 1), Math.round(ly + 4), hex('#6a7aa8')); }
  R.recorte(null);
};
const p4 = (t) => {
  if (!pisoOK) piso(); R.copiar(BUFU);
  lluviaCiudad(t, 147, 29, 271, 133);
  R.rect(208, 29, 210, 133, hex('#0c0e12')); R.rect(147, 80, 271, 82, hex('#0c0e12')); R.rect(146, 134, 272, 138, hex('#2a2e36'));
  if (Math.floor(t * 0.7) % 5 === 0 && (t % 1.43) < 0.08) velo(147, 29, 271, 133, hex('#c8d8ff'), 0.5);
  // los dos apliques de la pared: uno en «two», el otro en «scenes»
  for (const [ax, tt] of [[128, U(0.079)], [290, U(0.096)]]) { const on = t > tt; R.rect(ax - 3, 70, ax + 3, 76, K); R.rect(ax - 2, 71, ax + 2, 75, on ? hex('#fff0b0') : hex('#5a5040')); if (on) R.halo(ax, 72, 16, [hex('#2e383e'), hex('#4a4a3e'), hex('#6a604a')], 0.6); }
  // Ultron entra y se para ante la ventana; se ajusta las gafas en «new look»
  const u = tramo(t, U(0.12), U(0.25)), x = Math.round(lerp(-16, 196, u)), gafas = t > U(0.332) - 0.1 && t < U(0.332) + 0.7;
  R.actor(EL.ultronDD, x, 160, t, { dir: 1, anda: u > 0 && u < 1, dedo: gafas });
  // su reflejo en el cristal
  if (u > 0.6) for (let j = 0; j < 22; j++) for (let i = 0; i < 12; i++) { const px = x + 2 + i, py = 110 + j; if (px > 147 && px < 271 && py < 133 && (i + j) % 3 === 0) R.pset(px, py, mez(R.pget(px, py), hex('#5a6a8a'), 0.4)); }
};
// 5 · en el alféizar: la mano levanta la memoria USB con su etiqueta rosa
const p5 = (t) => {
  lluviaCiudad(t, 0, 0, 319, 118, true);
  velo(0, 0, 319, 24, hex('#0a0e22'), 0.6); velo(272, 0, 319, 50, hex('#0a0e22'), 0.6);
  // gotas que resbalan por el cristal
  for (let k = 0; k < 12; k++) { const gx = 10 + Math.floor(azar(k, 31) * 300), gy = Math.floor((azar(k, 32) * 118 + t * (10 + k)) % 118); R.disco(gx, gy, 1.5, hex('#a8b8d8')); R.linea(gx, gy - 6, gx, gy - 1, hex('#4a5a7a')); }
  R.rect(0, 58, 319, 61, hex('#0c0e12')); R.rect(150, 24, 154, 118, hex('#0c0e12'));
  // el alféizar de madera con vetas y sus cosas
  for (let y = 118; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y < 122 ? hex('#6a4a30') : (Math.sin(x * 0.08 + Math.sin(y * 0.5) * 2 + y * 0.3) > 0.7 ? hex('#4a3020') : hex('#5a3a26')));
  R.rect(0, 118, 319, 118, K); R.rect(0, 123, 319, 123, hex('#3a2418'));
  R.rect(30, 108, 50, 132, K); R.rect(31, 109, 49, 131, hex('#b85a3a')); R.rect(31, 109, 49, 112, hex('#d87a4a')); for (const [i, h] of [[34, 22], [40, 30], [45, 18]]) { R.rect(i, 108 - h, i + 3, 108, hex('#3a7a3a')); R.pset(i + 1, 108 - h + 3, hex('#a8e8a0')); }
  R.rect(250, 126, 300, 132, K); R.rect(251, 127, 299, 131, hex('#2a4a7a')); R.rect(254, 120, 296, 126, K); R.rect(255, 121, 295, 125, hex('#7a2a2a'));
  R.disco(268, 140, 6, K); R.disco(282, 140, 6, K); R.disco(268, 140, 5, hex('#3a4a5a')); R.disco(282, 140, 5, hex('#3a4a5a')); R.linea(273, 139, 277, 139, K);
  // la mano con la memoria: sube hacia la luz y la etiqueta se enciende en «Jocasta»
  const sube = tramo(t, P5 + 0.2, U(0.504)), wx = Math.round(lerp(158, 168, sube)), wy = Math.round(lerp(184, 140, sube)) + Math.round(Math.sin(t * 2) * 1);
  T.brazo(R, 156, 186, wx, wy, '#2a2832', 1, { puno: '#16141c' });
  const ux = wx + 6, uy = wy - 30, luz = tramo(t, U(0.619), U(0.619) + 0.3);
  if (luz > 0) R.halo(ux + 7, uy + 16, 22, [hex('#3a1a3a'), hex('#6a2a5a'), hex('#a84a8a')], 0.6 * luz);
  R.rect(ux, uy, ux + 14, uy + 28, K); R.rect(ux + 1, uy + 1, ux + 13, uy + 27, hex('#a8acb8')); R.rect(ux + 1, uy + 1, ux + 3, uy + 27, hex('#e8e8f0')); R.rect(ux + 11, uy + 1, ux + 13, uy + 27, hex('#7a7e8a'));
  R.rect(ux + 3, uy - 9, ux + 11, uy, K); R.rect(ux + 4, uy - 8, ux + 10, uy - 1, hex('#d8d8e0')); R.rect(ux + 5, uy - 6, ux + 6, uy - 5, K); R.rect(ux + 8, uy - 6, ux + 9, uy - 5, K);
  R.rect(ux + 2, uy + 8, ux + 12, uy + 22, K); R.rect(ux + 3, uy + 9, ux + 11, uy + 21, luz > 0 && Math.sin(t * 8) > -0.5 ? hex('#ff8ad8') : hex('#c85a9a'));
  for (const [i, j] of [[5, 12], [6, 12], [8, 12], [9, 12], [5, 13], [9, 13], [6, 16], [7, 17], [8, 16]]) R.pset(ux + i, uy + j, luz > 0 ? hex('#ffffff') : hex('#f0c8e0'));
  R.rect(ux + 4, uy + 24, ux + 10, uy + 25, hex('#5a5e6a'));
};
// 6 · Atom aparta la escena de Ultron y queda la cumbre: la luz verde late en «second»
const BUFW = R.nuevo();
const p6 = (t) => {
  const v = tramo(t, U(0.95), U(0.98)), o = { encuadre: 'cumbre', verde: v > 0 ? 0.6 + 0.4 * Math.sin(t * 5) * v : 0 };
  T.wundagore(R, t, o);
  // dos vecinos en la cornisa: uno con farol camina, el otro señala la cumbre
  const u = tramo(t, P6 + 0.6, U(0.86)), x = Math.round(lerp(20, 70, u));
  const a = R.actor(EL.senor30, x, 172, t, { dir: 1, anda: u > 0 && u < 1, sostiene: true, sorpresa: t > U(0.959) });
  R.rect(a.mano[0] - 1, a.mano[1], a.mano[0] + 2, a.mano[1] + 5, K); R.rect(a.mano[0], a.mano[1] + 1, a.mano[0] + 1, a.mano[1] + 4, Math.sin(t * 9) > -0.3 ? hex('#ffd060') : hex('#e8a030'));
  R.actor(EL.chica, 100, 172, t, { dir: 1, dedo: t > U(0.887), sorpresa: t > U(0.959), habla: t > U(0.887) && t < U(0.94) && Math.sin(t * 7) > 0 });
  T.wundagoreDelante(R, t, o);
  // la escena de Ultron que se aparta a la izquierda
  const ap = tramo(t, P6, U(0.771)); if (ap < 1) { const prev = R.usar(BUFW); p5(t); R.usar(prev); const off = Math.round(ap * ap * 330);
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320 - off; x++) R.pset(x, y, BUFW[y * 320 + x + off]); R.rect(320 - off, 0, 322 - off, 179, K); }
};
const efectos = [[0.6, 'bip'], [V(0.076), 'lapiz'], [V(0.171), 'bip'], [V(0.207), 'brillo'], [P2 + 0.2, 'zumbido'], [V(0.535), 'whoosh'], [V(0.55), 'viento'], [P3 + 0.3, 'avalancha'], [P3 + 0.5, 'publico'],
  [U(0.079), 'interruptor'], [U(0.096), 'interruptor'], [P4 + 0.2, 'lluvia'], [U(0.2), 'toc'], [P5 + 0.2, 'lluvia'], [U(0.504), 'brillo'], [U(0.619), 'bip'], [P6, 'whoosh'], [U(0.8), 'viento'], [U(0.959), 'zumbido']];
const año = (t) => (t >= P3 && t < P4 ? 2022 : 2026);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6]], { efectos, año });
''')

E['dd-wanda'] = ('Wanda', '''// DD-WANDA (frases 11–13). Nueve planos:
// 1. las ruinas de Wundagore: la luz verde se abre paso entre las piedras; Doom llega y, en «lifts», levanta las rocas con
//    su poder: en el hueco aparece Wanda, tumbada, como dormida;
// 2. de cerca, en el hueco: el resplandor verde sobre su cara mientras él le habla; en el golpe («awaken») abre los ojos
//    de golpe y chispea su magia roja; todo se funde a negro («fades to black»);
// 3. el corcho de Atom (sale del negro): la mano clava la foto de Wanda («Wanda isn't the only Maximoff»);
// 4. de cerca, la foto de 2015: Pietro cruza la calle a toda velocidad y se para; en «died» la foto se vuelve sepia;
// 5. el móvil sobre el escritorio: el dedo pulsa y Tommy corre por su barrio con su estela; en «like his uncle» llega al
//    lado la foto de Pietro;
// 6. el plató del bosque: un operario trae una silla de director roja y la deja vacía; «?» («any Maximoff»); en
//    «Elizabeth Olsen» se enciende un foco sobre ella y él se encoge de hombros;
// 7. (cómic) Latveria de noche: el castillo en su peña; los cartuchos «2010» → «2012»; Wanda llega por el camino;
// 8. (cómic) dentro del castillo, la boda: Wanda con velo y ramo, desorientada («?», «no memory»); Doom le tiende la mano
//    («marry him»); en «catastrophe» le chispea la magia roja;
// 9. las dos imágenes juntas: el cómic a la izquierda y la película a la derecha; en «resemblance», el «=».''', COMUN + r'''
const W = (f) => en('awaken', f), X = (f) => en('maximoff', f), Y = (f) => en('cruzada', f);
const P2 = W(0.38), P3 = W(1.003), P4 = X(0.151), P5 = X(0.439), P6 = X(0.694), P7 = Y(0), P8 = Y(0.354), P9 = Y(0.737);
const VERDE = hex('#3ae88a'), BLANCO = hex('#ffffff');
// un actor tumbado (girado 90°, la cabeza a la izquierda y la cara hacia arriba), a escala s; (cx, cy) el centro
const tumbado = (def, cx, cy, s, t, o, col = null) => { R.recorte(null); const prev = R.usar(BUFA); BUFA.fill(0); R.actor(def, 20, 44, t, o); R.usar(prev);
  for (let j = 4; j < 46; j++) for (let i = 8; i < 44; i++) { const c = BUFA[j * 320 + i]; if (!c) continue; const X0 = cx + (j - 32) * s, Y0 = cy - (i - 27) * s; for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) R.pset(X0 + a, Y0 + b, col ? col(c) : c); } };
const chispas = (cx, cy, r, t, n = 10) => { for (let k = 0; k < n; k++) { const a = k * 2.4 + t * 6, rr = r * (0.6 + 0.4 * Math.sin(t * 9 + k)); R.pset(Math.round(cx + Math.cos(a) * rr), Math.round(cy + Math.sin(a) * rr * 0.7), k % 2 ? hex('#ff3a5a') : hex('#ffb0c0')); } };
// 1 · las ruinas: la luz verde; Doom llega y levanta las rocas; Wanda en el hueco
const p1 = (t) => {
  const o = { encuadre: 'ruinas', verde: tramo(t, 0.4, W(0.12)), levanta: tramo(t, W(0.206), W(0.36)) };
  T.wundagore(R, t, o);
  if (o.levanta > 0) tumbado(EL.wandaDD, 204, 147, 1, t, { dir: 1, parpadea: true, quieto: true });
  const u = tramo(t, 0.3, W(0.19)), x = Math.round(lerp(8, 118, u));
  R.actor(EL.doom, x, 160, t, { dir: 1, anda: u > 0 && u < 1, brazos: t > W(0.206) });
  T.wundagoreDelante(R, t, o);
  if (t > W(0.206)) chispas(x + 7, 132, 12, t, 8);
};
// 2 · el hueco de cerca: el resplandor verde; en «awaken» abre los ojos; fundido a negro
const p2 = (t) => {
  const golpe = W(0.641), o = { encuadre: 'ruinas', camara: 'cara', reflejo: Math.min(1, tramo(t, P2, golpe) * 0.7 + (t > golpe ? 0.3 : 0)), negro: tramo(t, W(0.876), W(0.96)) };
  T.wundagore(R, t, o);
  const abre = t > golpe;
  tumbado(EL.wandaDD, 176, 122, 2, t, { dir: 1, parpadea: !abre, sorpresa: abre, quieto: true });
  if (abre && t < golpe + 2.2) chispas(146, 116, 26, t, 16);
  const f = 1 - Math.min(1, Math.abs(t - golpe) / 0.2); if (f > 0) velo(0, 0, 319, 179, hex('#d8ffe8'), f * 0.7);
  T.wundagoreDelante(R, t, o);
};
// 3 · el corcho: sale del negro y la mano clava la foto de Wanda
const foto = (r, dy, pinta) => { const [x0, y0, x1, y1] = r; caja(x0, y0 + dy, x1, y1 + dy, hex('#f6f2e6')); const a = x0 + 4, b = y0 + 4 + dy, c = x1 - 4, d = y1 - 12 + dy; pinta(a, b, c, d); };
const fotoWanda = (a, b, c, d, t) => { for (let y = b; y <= d; y++) R.linea(a, y, c, y, mez(hex('#2a1030'), hex('#8a2a4a'), (y - b) / (d - b))); for (let k = 0; k < 8; k++) R.pset(a + Math.floor(azar(k, 1) * (c - a)), b + Math.floor(azar(k, 2) * (d - b) * 0.5), hex('#ff8aa8'));
  escalado(EL.wandaDD, Math.round((a + c) / 2) - 19, d - 40, 1, t, { dir: 1, sonrisa: true }, null, [a, b, c, d]); R.recorte(null); };
const p3 = (t) => {
  const o = { encuadre: 'pared' }; const g = T.estudio(R, t, o), F = g.fotos;
  const sube = tramo(t, X(0) - 0.6, X(0) + 0.05), dy = Math.round((1 - sube) * 120);
  foto(F[0], dy, (a, b, c, d) => fotoWanda(a, b, c, d, t));
  T.estudioDelante(R, t, o);
  if (t < X(0) + 0.5) T.brazo(R, -4, Math.round(F[0][1] + dy + 54), F[0][0] - 2, Math.round(F[0][1] + dy + 32), '#2a3a5a', 1, {});
  if (sube >= 1) { const q = tramo(t, X(0) + 0.6, X(0) + 1); if (q > 0 && Math.floor(t * 3) % 3) { const [a, b, c, d] = F[3]; R.icono('?', Math.round((a + c) / 2) - 13, b + 6, hex('#e83a3a'), K, 5); } }
  const n = 1 - tramo(t, P3, P3 + 0.9); if (n > 0) velo(0, 0, 319, 179, hex('#000000'), n);
};
// el corcho de fondo para los insertos (fijo, en un búfer)
const BUFC = R.nuevo(); let corchoOK = false;
const corcho = () => { R.recorte(null); const prev = R.usar(BUFC);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const n = azar(x, y), m = azar(x >> 2, y >> 2); R.pset(x, y, n > 0.93 ? hex('#7a5430') : n < 0.08 ? hex('#d8a868') : m > 0.6 ? hex('#b8864a') : hex('#c4925a')); }
  R.usar(prev); corchoOK = true; };
// 4 · la foto de 2015: Pietro cruza la calle a toda velocidad; en «died» se vuelve sepia
const BUFS = R.nuevo(); let calleOK = false;
const calle = (x0, y0, x1, y1) => { R.recorte(null); const prev = R.usar(BUFS); BUFS.fill(0);
  for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, mez(hex('#a8c8e8'), hex('#e8e0d0'), (y - y0) / (y1 - y0) * 1.4));
  for (const [cx, cy, w] of [[110, 44, 18], [200, 38, 24]]) { R.disco(cx, cy, w / 3, hex('#f6f6f6')); R.disco(cx + w / 3, cy - 2, w / 3, hex('#f6f6f6')); R.disco(cx + w / 1.6, cy + 1, w / 4, hex('#e8e8f0')); }
  const casas = [[72, 22, '#c8a87a', '#8a3a2a'], [96, 28, '#a8b8a0', '#6a4a3a'], [126, 20, '#d8c8a8', '#8a3a2a'], [148, 30, '#b89a8a', '#4a3a3a'], [180, 24, '#c8b088', '#8a3a2a'], [206, 26, '#a8a8b8', '#6a4a3a'], [234, 22, '#d0b890', '#8a3a2a']];
  for (const [cx, w, cpar, ctej] of casas) { const top = y0 + 26 + (cx * 7) % 14, base = y1 - 30; caja(cx, top, cx + w, base, hex(cpar)); R.poligono([[cx - 2, top], [cx + w / 2, top - 10], [cx + w + 2, top]], hex(ctej)); R.linea(cx - 2, top, cx + w / 2, top - 10, K); R.linea(cx + w / 2, top - 10, cx + w + 2, top, K);
    for (let wy = top + 5; wy < base - 8; wy += 10) for (let wx = cx + 4; wx < cx + w - 4; wx += 8) { caja(wx, wy, wx + 4, wy + 6, hex('#3a4a6a')); R.pset(wx + 1, wy + 1, hex('#a8c8e8')); }
    caja(cx + w / 2 - 3, base - 10, cx + w / 2 + 3, base, hex('#5a3a24')); }
  for (let y = y1 - 30; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, ((x + (y % 4 < 2 ? 0 : 3)) % 6 === 0 || y % 4 === 0) ? hex('#6a6a70') : hex('#8a8a90'));
  R.rect(x0, y1 - 31, x1, y1 - 30, hex('#5a5a60')); for (let x = x0 + 6; x < x1; x += 40) { R.rect(x, y1 - 58, x + 1, y1 - 30, K); R.disco(x + 1, y1 - 60, 3, hex('#e8d8a0')); }
  R.usar(prev); calleOK = true; };
const p4 = (t) => {
  if (!corchoOK) corcho(); R.copiar(BUFC);
  const ix0 = 72, iy0 = 28, ix1 = 248, iy1 = 140;
  R.rect(66, 26, 258, 176, hex('#5a3a20')); caja(62, 22, 254, 172, hex('#f6f2e6'), hex('#b8b0a0'));
  if (!calleOK) calle(ix0, iy0, ix1, iy1);
  const sep = tramo(t, X(0.264), X(0.264) + 1.2), SEP = hex('#a8865a');
  for (let y = iy0; y <= iy1; y++) for (let x = ix0; x <= ix1; x++) R.pset(x, y, BUFS[y * 320 + x]);
  // Pietro cruza a toda velocidad con su estela y se para en el centro
  const u = tramo(t, P4 + 0.1, P4 + 1.2), px = Math.round(lerp(ix0 - 60, 120, u));
  R.recorte([ix0, iy0, ix1, iy1]); if (u > 0 && u < 1) for (let k = 0; k < 6; k++) R.linea(Math.max(ix0, px - 60 + k * 4), 112 + k * 5, px + 10, 112 + k * 5, k % 2 ? hex('#5a8ae8') : hex('#d8e0f0')); R.recorte(null);
  escalado(EL.pietroDD, px, iy1 - 82, 2, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: u >= 1, dedo: u >= 1 && t > X(0.23) }, null, [ix0, iy0, ix1, iy1]);
  if (sep > 0) for (let y = iy0; y <= iy1; y++) for (let x = ix0; x <= ix1; x++) { const c = R.pget(x, y), l = ((c & 255) + ((c >>> 8) & 255) + ((c >>> 16) & 255)) / 3 / 255; R.pset(x, y, mez(c, mez(hex('#3a2a1a'), hex('#f0d8a8'), l), sep * 0.85)); }
  R.numero('2015', 158, 162, { centro: true, rampa: ['#3a3a4a', '#2a2a3a', '#2a2a3a', '#1a1a2a', '#141018'].map(hex) });
  R.disco(158, 24, 4, K); R.disco(158, 24, 3, hex('#e83a3a')); R.pset(157, 23, hex('#ffb0b0'));
  for (const [tx, ty] of [[62, 160], [240, 22]]) { R.rect(tx, ty, tx + 14, ty + 6, hex('#e8e0b0')); }
  velo(0, 0, 319, 21, hex('#6a4a2a'), 0.22); velo(272, 21, 319, 50, hex('#6a4a2a'), 0.22);
};
// 5 · el móvil en el escritorio: Tommy corre; llega la foto de Pietro al lado
const BUFE = R.nuevo(); let mesaOK = false;
const mesa = () => { R.recorte(null); const prev = R.usar(BUFE);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const tabla = Math.floor(y / 30), v = Math.sin(x * 0.05 + Math.sin(y * 0.3 + tabla) * 2 + tabla * 3); R.pset(x, y, y % 30 === 0 ? hex('#3a2414') : v > 0.75 ? hex('#7a4a28') : v < -0.8 ? hex('#a8703c') : hex('#8e5a30')); }
  // una taza vista desde arriba, un boli, unas llaves, migas de palomitas
  R.disco(52, 120, 15, K); R.disco(52, 120, 14, hex('#f2eee2')); R.disco(52, 120, 11, hex('#4a2a14')); R.disco(48, 116, 3, hex('#6a4024')); R.rect(66, 116, 72, 124, K); R.rect(67, 117, 71, 123, hex('#f2eee2'));
  R.linea(30, 60, 70, 76, K); R.linea(30, 61, 70, 77, hex('#2a4a9a')); R.linea(31, 62, 69, 77, hex('#2a4a9a')); R.rect(68, 75, 72, 78, hex('#e8e8f0'));
  R.disco(270, 150, 6, K); R.disco(270, 150, 5, hex('#c8a040')); R.disco(270, 150, 2, K); R.rect(274, 152, 290, 154, hex('#a8acb8')); R.rect(286, 150, 290, 156, hex('#a8acb8'));
  for (let k = 0; k < 9; k++) { const x = 20 + Math.floor(azar(k, 3) * 80), y = 150 + Math.floor(azar(k, 4) * 26); R.rect(x, y, x + 2, y + 1, hex('#fff4c8')); }
  R.usar(prev); mesaOK = true; };
const BUFB = R.nuevo(); let barrioOK = false;
const barrio = (x0, y0, x1, y1) => { R.recorte(null); const prev = R.usar(BUFB); BUFB.fill(0);
  for (let y = y0; y <= y1; y++) R.linea(x0, y, x1, y, mez(hex('#5aa8e8'), hex('#c8e0f0'), (y - y0) / (y1 - y0)));
  for (let k = 0; k < 3; k++) { const hx = x0 + 4 + k * 24, top = y0 + 50 + (k % 2) * 6; caja(hx, top, hx + 20, y1 - 46, [hex('#e8e0d0'), hex('#c8d8e8'), hex('#e8d0b0')][k]); R.poligono([[hx - 2, top], [hx + 10, top - 12], [hx + 22, top]], hex('#6a4a3a')); R.linea(hx - 2, top, hx + 10, top - 12, K); R.linea(hx + 10, top - 12, hx + 22, top, K); caja(hx + 4, top + 6, hx + 9, top + 12, hex('#3a5a8a')); caja(hx + 12, top + 14, hx + 17, y1 - 46, hex('#8a3a2a')); }
  for (let k = 0; k < 4; k++) { const tx = x0 + 6 + k * 18; R.rect(tx, y1 - 60, tx + 1, y1 - 46, hex('#5a3a24')); R.disco(tx + 1, y1 - 64, 6, hex('#3a8a3a')); R.disco(tx - 1, y1 - 62, 3, hex('#5aa84a')); }
  R.rect(x0, y1 - 46, x1, y1 - 40, hex('#5aa84a')); for (let y = y1 - 40; y <= y1; y++) R.linea(x0, y, x1, y, (y % 6 === 0) ? hex('#a8a8a0') : hex('#c8c8c0'));
  R.usar(prev); barrioOK = true; };
const p5 = (t) => {
  if (!mesaOK) mesa(); R.copiar(BUFE);
  // el móvil
  const mx0 = 116, my0 = 18, mx1 = 204, my1 = 172; R.rect(mx0 + 3, my0 + 4, mx1 + 3, my1 + 4, hex('#3a2414')); caja(mx0, my0, mx1, my1, hex('#1a1a22')); R.rect(mx0 + 2, my0 + 2, mx1 - 2, my0 + 3, hex('#3a3a46'));
  const sx0 = mx0 + 5, sy0 = my0 + 12, sx1 = mx1 - 5, sy1 = my1 - 12; if (!barrioOK) barrio(sx0, sy0, sx1, sy1);
  for (let y = sy0; y <= sy1; y++) for (let x = sx0; x <= sx1; x++) R.pset(x, y, BUFB[y * 320 + x]);
  const play = X(0.439) + 0.35, u = t > play ? ((t - play) / 1.3) % 1 : -1, tx = Math.round(lerp(sx0 - 40, sx1 + 6, Math.max(0, u)));
  if (u >= 0) { for (let k = 0; k < 5; k++) R.linea(Math.max(sx0, tx - 46 + k * 3), sy1 - 30 + k * 4, Math.min(sx1, tx + 6), sy1 - 30 + k * 4, k % 2 ? hex('#e8e8f0') : hex('#5ae88a'));
    escalado(EL.tommyDD, tx, sy1 - 82, 2, t, { dir: 1, anda: true }, null, [sx0, sy0, sx1, sy1]); R.recorte(null); }
  else { R.disco(160, 140, 10, hex('#14141e')); R.poligono([[156, 134], [156, 146], [166, 140]], BLANCO); }
  R.rect(sx0, sy1 - 6, sx1, sy1 - 5, hex('#3a3a46')); R.rect(sx0, sy1 - 6, sx0 + Math.round((sx1 - sx0) * tramo(t, play, P6)), sy1 - 5, hex('#e83a3a'));
  R.rect(156, my1 - 7, 164, my1 - 6, hex('#5a5a66'));
  // el dedo que pulsa el play
  const dd = tramo(t, P5, play) * (1 - tramo(t, play + 0.2, play + 0.8)); if (dd > 0) T.brazo(R, 198, 188, Math.round(lerp(204, 174, dd)), Math.round(lerp(198, 146, dd)), '#2a3a5a', -1, {});
  // la foto de Pietro llega al lado, en «like his uncle»
  const ll = tramo(t, X(0.6), X(0.64)); if (ll > 0) { if (!calleOK) calle(72, 28, 248, 140); const fx = Math.round(lerp(330, 220, ll)), fy = 56; R.rect(fx + 3, fy + 3, fx + 77, fy + 91, hex('#3a2414')); caja(fx, fy, fx + 74, fy + 88, hex('#f6f2e6'));
    for (let y = fy + 5; y <= fy + 66; y++) for (let x = fx + 5; x <= fx + 69; x++) { const sx = 72 + Math.floor((x - fx - 5) / 64 * 176), sy = 28 + Math.floor((y - fy - 5) / 61 * 112); const c = BUFS[sy * 320 + sx] || hex('#c8b090'); const l = ((c & 255) + ((c >>> 8) & 255) + ((c >>> 16) & 255)) / 765; R.pset(x, y, mez(hex('#3a2a1a'), hex('#f0d8a8'), l)); }
    escalado(EL.pietroDD, fx + 18, fy + 26, 1, t, { dir: 1, sonrisa: true }, (c) => { const l = ((c & 255) + ((c >>> 8) & 255) + ((c >>> 16) & 255)) / 765; return mez(hex('#3a2a1a'), hex('#f0d8a8'), l); }, [fx + 5, fy + 5, fx + 69, fy + 66]); R.recorte(null);
    R.numero('2015', fx + 37, fy + 82, { centro: true, rampa: ['#3a3a4a', '#2a2a3a', '#2a2a3a', '#1a1a2a', '#141018'].map(hex) }); }
  velo(0, 0, 319, 21, hex('#5a3418'), 0.2); velo(272, 21, 319, 50, hex('#5a3418'), 0.2);
};
// 6 · el plató del bosque: la silla de director roja que queda vacía
const silla = (x, y, back, t) => { // (x, y) = el pie izquierdo; 16 × 22
  R.linea(x, y, x + 14, y - 10, hex('#8a5a30')); R.linea(x + 14, y, x, y - 10, hex('#8a5a30')); R.linea(x + 1, y, x + 15, y - 10, hex('#5a3a20'));
  R.rect(x - 1, y - 12, x + 15, y - 10, K); R.rect(x, y - 12, x + 14, y - 11, back); R.rect(x, y - 22, x + 1, y - 10, hex('#8a5a30')); R.rect(x + 13, y - 22, x + 14, y - 10, hex('#8a5a30'));
  R.rect(x + 1, y - 21, x + 13, y - 16, K); R.rect(x + 2, y - 20, x + 12, y - 17, back); R.rect(x + 2, y - 17, x + 12, y - 17, mez(back, K, 0.4)); };
const p6 = (t) => {
  const o = { encuadre: 'bosque' }; T.plato(R, t, o);
  silla(60, 158, hex('#2a4a9a'), t); silla(84, 158, hex('#3a8a4a'), t); silla(204, 158, hex('#e8b830'), t);
  const deja = X(0.79), u = tramo(t, P6 + 0.2, deja), ox = Math.round(lerp(300, 156, u)), va = tramo(t, X(0.96), X(0.96) + 1.2);
  const foco = tramo(t, X(0.939), X(0.939) + 0.3);
  if (foco > 0) { for (let y = 20; y < 160; y++) { const w = 4 + (y - 20) * 0.12; for (let x = Math.round(146 - w); x <= 146 + w; x++) R.pset(x, y, mez(R.pget(x, y), hex('#fff0b0'), 0.25 * foco)); } R.disco(146, 160, 18 * foco, (x, y) => mez(R.pget(x, y), hex('#fff0b0'), 0.3)); }
  if (u >= 1) silla(138, 158, hex('#c8303a'), t);
  R.actor(EL.camarografo, 30, 158, t, { dir: 1, dedo: t > X(0.81) && t < X(0.9) });
  const x2 = u < 1 ? ox : Math.round(lerp(162, 330, va));
  const a = R.actor(EL.operario, x2, 158, t, { dir: u < 1 || va > 0 ? (va > 0 ? 1 : -1) : -1, anda: (u > 0 && u < 1) || (va > 0 && va < 1), sostiene: u < 1 ? true : undefined, brazos: u >= 1 && va === 0 && t > X(0.94) });
  if (u < 1) silla(a.mano[0] - 16, a.mano[1] + 10, hex('#c8303a'), t);
  const q = tramo(t, X(0.804), X(0.804) + 0.3); if (q > 0) R.icono('?', 140, Math.round(lerp(130, 104, q)), Math.sin(t * 7) > 0 ? hex('#ffffff') : hex('#e83a3a'), K, 3);
  T.platoDelante(R, t, o);
};
// 7 · (cómic) Latveria de noche: el castillo en su peña; los cartuchos 2010 → 2012; Wanda llega
const BUFL = R.nuevo(); let latOK = false;
const latveria = () => { R.recorte(null); const prev = R.usar(BUFL); const TI = K;
  for (let y = 8; y <= 171; y++) for (let x = 9; x <= 310; x++) R.pset(x, y, y < 70 ? hex('#2a3a6a') : y < 120 ? hex('#3a4a7a') : hex('#4a4a6a'));
  for (let k = 0; k < 50; k++) R.pset(12 + Math.floor(azar(k, 1) * 296), 10 + Math.floor(azar(k, 2) * 90), hex('#f6eed6'));
  R.disco(92, 62, 16, TI); R.disco(92, 62, 15, hex('#f6e8b0')); R.disco(86, 58, 3, hex('#d8c890')); R.disco(98, 68, 2, hex('#d8c890'));
  const monte = [[9, 171], [9, 118], [40, 100], [80, 112], [120, 92], [150, 104], [170, 70], [196, 64], [228, 72], [262, 98], [300, 92], [311, 100], [311, 171]];
  R.poligono(monte, hex('#2a2a46')); for (let i = 1; i < monte.length - 2; i++) R.linea(monte[i][0], monte[i][1], monte[i + 1][0], monte[i + 1][1], TI);
  for (let x = 9; x < 311; x += 3) for (let y = 70; y < 171; y += 3) if ((x + y) % 9 === 0 && R.pget(x, y) === hex('#2a2a46')) R.linea(x, y, x + 2, y + 2, hex('#1e1e36'));
  // el castillo: murallas almenadas, torres con tejados verdes cónicos, ventanas encendidas
  const torre = (x, top, w, alto) => { caja(x, top, x + w, top + alto, hex('#6a6a7a'), TI); for (let y = top + 4; y < top + alto; y += 5) R.linea(x + 1, y, x + w - 1, y, hex('#5a5a6a')); R.poligono([[x - 3, top], [x + w / 2, top - w * 1.2], [x + w + 3, top]], hex('#2a6a3a')); R.linea(x - 3, top, x + w / 2, top - w * 1.2, TI); R.linea(x + w / 2, top - w * 1.2, x + w + 3, top, TI);
    for (let y = top + 6; y < top + alto - 6; y += 10) { caja(x + w / 2 - 2, y, x + w / 2 + 2, y + 5, hex('#f6d860'), TI); } R.linea(x + w / 2, top - w * 1.2, x + w / 2, top - w * 1.2 - 8, TI); };
  caja(150, 78, 250, 112, hex('#6a6a7a'), TI); for (let x = 150; x < 250; x += 8) R.rect(x, 74, x + 4, 78, TI), R.rect(x + 1, 75, x + 3, 78, hex('#6a6a7a'));
  for (let y = 82; y < 112; y += 6) for (let x = 152 + (y % 12 ? 4 : 0); x < 248; x += 8) R.linea(x, y, x + 4, y, hex('#5a5a6a'));
  torre(140, 58, 16, 54); torre(186, 40, 22, 72); torre(240, 56, 16, 56); caja(194, 96, 210, 112, hex('#2a1a14'), TI);
  // el camino que sube y el pueblo al pie
  const cam = [[20, 171], [70, 160], [50, 150], [120, 140], [150, 126], [196, 112]];
  for (let i = 0; i < cam.length - 1; i++) for (let w = -2; w <= 2; w++) R.linea(cam[i][0], cam[i][1] + w, cam[i + 1][0], cam[i + 1][1] + w, Math.abs(w) === 2 ? TI : hex('#8a7a5a'));
  for (let k = 0; k < 9; k++) { const hx = 150 + k * 18, hy = 146 + (k % 3) * 6; caja(hx, hy, hx + 13, hy + 12, hex('#8a6a4a'), TI); R.poligono([[hx - 2, hy], [hx + 6, hy - 7], [hx + 15, hy]], hex('#6a2a2a')); R.linea(hx - 2, hy, hx + 6, hy - 7, TI); R.linea(hx + 6, hy - 7, hx + 15, hy, TI); caja(hx + 4, hy + 4, hx + 8, hy + 8, hex('#f6d860'), TI); }
  R.usar(prev); latOK = true; };
const p7 = (t) => {
  T.comic(R, t, { encuadre: 'latveria' });
  if (!latOK) latveria();
  for (let y = 8; y <= 171; y++) for (let x = 9; x <= 310; x++) R.pset(x, y, BUFL[y * 320 + x]);
  // los estandartes verdes que ondean en las torres y las nubes que pasan ante la luna
  for (const [bx, by] of [[148, 32], [197, 6], [248, 30]]) { if (by < 8) continue; for (let i = 0; i < 12; i++) { const yy = by + Math.round(Math.sin(t * 5 + i * 0.6) * 1.5); R.linea(bx + i, yy, bx + i, yy + 6, i % 4 === 0 ? hex('#1a4a26') : hex('#3a8a4a')); } R.linea(bx, by, bx + 12, by, K); }
  for (const [x0, y, w, v] of [[20, 50, 26, 4], [120, 30, 34, 3]]) { const x = 9 + ((x0 + t * v) % 300); R.disco(x, y, w / 4, K); R.disco(x, y, w / 4 - 1, hex('#6a7aa8')); R.disco(x + w / 3, y - 2, w / 4, K); R.disco(x + w / 3, y - 2, w / 4 - 1, hex('#6a7aa8')); }
  // los robots de guardia por la muralla
  for (let k = 0; k < 3; k++) { const gx = 156 + ((k * 30 + t * 8) % 88); R.rect(gx, 68, gx + 3, 74, K); R.rect(gx + 1, 69, gx + 2, 73, hex('#9a9eaa')); R.pset(gx + 1, 69, (Math.floor(t * 3 + k) % 2) ? hex('#5ae88a') : hex('#c8303a')); }
  // Wanda sube por el camino
  const u = tramo(t, P7 + 0.4, P8 - 0.2), tr = [[30, 168], [70, 160], [52, 150], [118, 140]], sg = Math.min(2.999, u * 3), i = Math.floor(sg), f = sg - i;
  R.actor(EL.wandaDD, Math.round(lerp(tr[i][0], tr[i + 1][0], f)) - 7, Math.round(lerp(tr[i][1], tr[i + 1][1], f)), t, { dir: tr[i + 1][0] > tr[i][0] ? 1 : -1, anda: u > 0 && u < 1, triste: true });
  for (let k = 0; k < 40; k++) { const x = 9 + ((azar(k, 3) * 302 + t * 4) % 302), y = 8 + ((azar(k, 4) * 164 + t * 12) % 164); if (k % 3 === 0) R.pset(Math.round(x), Math.round(y), hex('#c8d0e8')); }
  T.comicDelante(R, t, { encuadre: 'latveria' });
  // los cartuchos: 2010 → 2012
  const c1 = tramo(t, Y(0.213) - 0.1, Y(0.213) + 0.15), c2 = tramo(t, Y(0.273) - 0.1, Y(0.273) + 0.15), tinta = ['#2a2030', '#141018', '#141018', '#141018', '#141018'].map(hex);
  if (c1 > 0) { caja(14, 22, 14 + Math.max(4, Math.round(44 * c1)), 38, hex('#f6d860')); if (c1 >= 1) R.numero('2010', 36, 34, { centro: true, rampa: tinta }); }
  if (c2 > 0) { R.linea(60, 30, 68, 30, K); R.linea(66, 28, 68, 30, K); R.linea(66, 32, 68, 30, K); caja(70, 22, 70 + Math.max(4, Math.round(44 * c2)), 38, hex('#f6d860')); if (c2 >= 1) R.numero('2012', 92, 34, { centro: true, rampa: tinta }); }
};
// 8 · (cómic) la boda en el castillo: Wanda con velo, desorientada; Doom le tiende la mano
const velo2 = (hx, hy, dir) => { const b = -dir; R.poligono([[hx - 3, hy - 1], [hx + 4, hy - 1], [hx + b * 4, hy + 10], [hx + b * 9, hy + 24], [hx + b * 13, hy + 24], [hx + b * 7, hy + 6]], (x, y) => mez(R.pget(x, y), BLANCO, 0.6));
  for (let i = -3; i <= 3; i++) R.pset(hx + i, hy, i % 2 ? hex('#f6f2e6') : hex('#ffb0c0')); };
const p8 = (t) => {
  const o = { encuadre: 'latveria', boda: 1 }; T.comic(R, t, o);
  const duda = t > Y(0.402) && t < Y(0.58), mira = duda ? (Math.floor(t * 1.6) % 2 ? 1 : -1) : 1, cat = Y(0.655);
  const ent = tramo(t, P8 + 0.2, Y(0.45)), wx = Math.round(lerp(58, 128, ent)), dv = tramo(t, Y(0.56), Y(0.6)), dx = Math.round(lerp(204, 172, dv));
  const w = R.actor(EL.wandaDD, wx, 160, t, { anda: ent > 0 && ent < 1, dir: ent < 1 ? 1 : mira, sostiene: t < cat ? true : undefined, sorpresa: t > cat && t < cat + 1.2, brazos: t > cat && t < cat + 1.2 });
  if (t < cat) { const [mx, my] = w.mano; for (const [i, j, c] of [[0, -2, '#ffffff'], [-2, -1, '#ffb0c0'], [2, -1, '#ffffff'], [-1, -3, '#ffb0c0'], [1, -3, '#ffffff'], [0, 0, '#3a8a4a'], [0, 2, '#3a8a4a']]) R.rect(mx + i, my + j, mx + i + 1, my + j + 1, hex(c)); }
  velo2(w.cabeza[0], w.cabeza[1], mira);
  R.actor(EL.doom, dx, 160, t, { dir: -1, anda: dv > 0 && dv < 1, dedo: t > Y(0.582) && t < Y(0.7), habla: t > Y(0.56) && t < Y(0.62) && Math.sin(t * 7) > 0 });
  if (t > Y(0.526) && t < cat && Math.floor(t * 3) % 3) R.icono('?', w.cabeza[0] - 2, w.cabeza[1] - 14, hex('#ffffff'), K, 2);
  if (t > cat && t < cat + 1.6) chispas(w.cabeza[0], w.cabeza[1] + 10, 16, t, 14);
  T.comicDelante(R, t, o);
};
// 9 · el cómic y la película, juntos; «=»
const BUFD = R.nuevo(), BUFF = R.nuevo(); let dipOK = false;
const p9 = (t) => {
  if (!dipOK) { const prev = R.usar(BUFD); p8(Y(0.6)); R.usar(prev); dipOK = true; }
  const prev = R.usar(BUFF); const o = { encuadre: 'ruinas', verde: 0.7, levanta: 1 }; T.wundagore(R, t, o); tumbado(EL.wandaDD, 204, 147, 1, t, { dir: 1, sorpresa: true, quieto: true });
  R.actor(EL.doom, 168, 160, t, { dir: 1, dedo: Math.sin(t * 1.5) > 0.3 }); T.wundagoreDelante(R, t, o); R.usar(prev);
  const off = 0;
  for (let y = 0; y < 180; y++) { for (let x = 0; x < 160; x++) R.pset(x, y, BUFF[y * 320 + x + 100]); for (let x = 160; x < 320; x++) R.pset(x, y, BUFD[y * 320 + x - 80]); }
  R.rect(157, 0, 162, 179, K); R.rect(159, 0, 160, 179, hex('#f6f2e6'));
  R.rect(268, 0, 319, 52, K); R.rect(271, 0, 319, 49, hex('#f0e4c0')); for (let k = 0; k < 30; k++) R.pset(272 + Math.floor(azar(k, 1) * 46), Math.floor(azar(k, 2) * 48), hex('#dccb9c'));
  // los dos marcadores: Wanda y Doom en cada lado, que se rodean a la vez
  const ma = tramo(t, Y(0.8), Y(0.8) + 0.8); if (ma > 0) for (const [cx, cy, rx, ry] of [[88, 150, 32, 16], [238, 150, 38, 16]]) for (let s2 = 0; s2 < ma * 60; s2++) { const an = -Math.PI / 2 + s2 / 60 * Math.PI * 2.1; R.rect(Math.round(cx + Math.cos(an) * rx), Math.round(cy + Math.sin(an) * ry), Math.round(cx + Math.cos(an) * rx) + 1, Math.round(cy + Math.sin(an) * ry), hex('#f6c83a')); }
  const ig = tramo(t, Y(0.934) - 0.1, Y(0.934) + 0.2); if (ig > 0) { const s = Math.round(4 + 6 * ig); caja(146, 80, 173, 104, hex('#f6d860')); R.rect(151, 86, 168, 86 + Math.max(1, s / 3), K); R.rect(151, 96, 168, 96 + Math.max(1, s / 3), K); }
};
const efectos = [[0.5, 'zumbido'], [W(0.206), 'avalancha'], [W(0.3), 'rafaga'], [W(0.641), 'flash'], [W(0.66), 'brillo'], [W(0.876), 'viento'], [P3 + 0.4, 'papel'], [X(0) + 0.05, 'golpecito'],
  [P4 + 0.1, 'whoosh'], [X(0.264), 'papel'], [X(0.439) + 0.35, 'golpecito'], [X(0.45), 'whoosh'], [X(0.6), 'papel'], [X(0.79), 'toc'], [X(0.804), 'pop'], [X(0.939), 'interruptor'],
  [P7 + 0.3, 'viento'], [Y(0.213), 'pop'], [Y(0.273), 'pop'], [P8 + 0.2, 'campana'], [Y(0.526), 'pop'], [Y(0.655), 'flash'], [P9 + 0.1, 'whoosh'], [Y(0.934), 'brillo']];
const año = (t) => (t >= P7 && t < P9 ? null : t >= P4 && t < P5 ? 2015 : 2026);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8], [P9, p9]], { efectos, año });
''')
