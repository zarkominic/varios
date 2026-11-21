import re

# los instantes se escriben W(segundos de escena) y se convierten en en('marca', fracción) con las marcas reales de la voz
MARCAS = {'tr-argolla': ('argolla', 0.5, 20.439), 'tr-moda': ('moda', 0.9, 22.679), 'tr-cierre': ('cierre', 0.5, 9.62)}


def W(id_, cuerpo):
    k, a, b = MARCAS[id_]
    return re.sub(r'\bW\((\d+(?:\.\d+)?)\)', lambda m: f"en('{k}', {(float(m.group(1)) - a) / (b - a):.4f})", cuerpo)


# piezas comunes de las tres escenas (mezcla de colores, ruido)
COMUN = r'''
const mez = (c1, c2, a) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255; return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * a) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * a) << 8) | Math.round(r1 + ((c2 & 255) - r1) * a)) >>> 0; };
const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const K = T.C.k, BL = T.C.blanco, PZ = T.PIEZAS_TR;
const destello = (x, y, c = BL) => { R.pset(x, y, c); for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) R.pset(x + a, y + b, c); for (const [a, b] of [[2, 0], [-2, 0], [0, 2], [0, -2]]) R.pset(x + a, y + b, mez(c, K, 0.35)); };
'''

E = {}

E['tr-argolla'] = ('La argolla', '''// TR-ARGOLLA (frase 22), sin cartela; la barra dice 2026 salvo en el rollo romano. Cuatro planos:
// 1. el taller del joyero: la ayudanta entra con la bandeja de anillos; el joyero levanta la argolla («ring») y se la
//    pasa a la novia, que la recibe en el dedo («finger»); un pulso de luz sube de su mano al pecho y sale un corazón
//    («heart»); el novio da un saltito;  2. corte en «It's a lovely ancient idea»: sobre una mesa romana con su candil, un
//    papiro se desenrolla; la tinta dibuja la vena roja del anular al corazón («Roman writers»), los renglones y, en
//    «Egyptians», el sol y las pirámides;  3. corte en «but anatomy»: la lámina de cerca; la vena del anular se enciende,
//    sale una X y se apaga («doesn't back it up»); en «Every finger» se encienden las cinco; el joyero las señala;
//  4. corte en «And in many countries»: el mapa de Europa sobre la mesa del joyero; Alemania se tiñe con su chincheta
//    («Germany»), la ruta corre hasta Rusia («Russia»); en la tarjeta de la esquina, la argolla salta de la mano izquierda
//    a la derecha («right hand»).''', COMUN + r'''
const P2 = W(6.08), P3 = W(10.66), P4 = W(15.47);
const ANILLO = W(0.68), DEDO = W(1.14), VENA = W(3.17), CORAZON = W(5.31);
const ORO = hex('#f0c040'), OROS = hex('#a87a18'), ROJO = hex('#d8303a'), ROJOS = hex('#7a1424'), ROSA = hex('#ff8aa0');
const argolla = (x, y, t, s = 1) => { PZ.argolla(R, x, y + 3 * s, { t, s }); if (Math.sin(t * 6 + x) > 0.55) destello(x + 2 * s, y - 3 * s); };
const halo = (x, y, r, c, t) => { for (let a = 0; a < 24; a++) if ((a + Math.floor(t * 8)) % 3) { const g = a / 24 * Math.PI * 2; R.pset(Math.round(x + Math.cos(g) * r), Math.round(y + Math.sin(g) * r), c); } };

// 1 · el taller del joyero
const bandeja = (x, y, t) => {   // la bandeja de terciopelo con tres anillos, en la mano de la ayudanta
  R.rect(x - 7, y - 3, x + 7, y + 1, K); R.rect(x - 6, y - 2, x + 6, y, hex('#8a1a3a')); R.rect(x - 6, y - 2, x + 6, y - 2, hex('#b83a5a'));
  for (const [i, c] of [[-4, ORO], [0, hex('#d8dce8')], [4, ORO]]) { R.rect(x + i - 1, y - 2, x + i + 1, y - 1, c); R.pset(x + i, y - 1, hex('#5a0a20')); }
  if (Math.sin(t * 5) > 0.7) R.pset(x + 4, y - 3, BL);
};
const p1 = (t) => {
  const o = { encuadre: 'joyero' };
  T.fiestas(R, t, o);
  const ua = tramo(t, 0.2, 2.4), xa = Math.round(lerp(-18, 32, ua));
  const ay = R.actor(EL.ayudanta, xa, 166, t, { dir: 1, anda: ua > 0 && ua < 1, sostiene: t < CORAZON ? true : false, brazos: t >= CORAZON && t < CORAZON + 0.7, sonrisa: t > CORAZON - 0.2 });
  const sube = t > ANILLO - 0.35 && t < DEDO + 0.05;
  const jo = R.actor(EL.joyero, 134, 138, t, { dir: 1, sostiene: sube ? [154, 116] : false, sonrisa: t > DEDO, habla: t > VENA - 0.5 && t < CORAZON - 0.3 && Math.sin(t * 8) > 0 });
  const tiende = t > DEDO - 0.5;
  const nv = R.actor(EL.noviaBlanca, 214, 166, t, { dir: -1, sostiene: tiende ? [204, 152] : false, sonrisa: (t > DEDO + 0.3 && t < VENA) || t > CORAZON, sorpresa: t > VENA && t < CORAZON });
  const s = t > CORAZON && t < CORAZON + 0.6 ? Math.round(3 * Math.abs(Math.sin((t - CORAZON) * 10))) : 0;
  R.actor(EL.chicoHoy, 233, 166, t, { dir: -1, sonrisa: t > DEDO + 0.4, salto: s, habla: t > 1.9 && t < 2.8 && Math.sin(t * 9) > 0 });
  T.fiestasDelante(R, t, o);
  if (t < CORAZON) bandeja(ay.mano[0], ay.mano[1], t);
  // la argolla: en la mano del joyero, por el aire y en el dedo de la novia
  const u = tramo(t, DEDO - 0.05, DEDO + 0.4);
  if (sube && u === 0) { argolla(jo.mano[0], jo.mano[1] - 4, t, 2); halo(jo.mano[0], jo.mano[1] - 7, 9, hex('#fff0a0'), t); }
  else if (u > 0 && u < 1) { const x = lerp(154, nv.mano[0], u), y = lerp(112, nv.mano[1] - 3, u) - Math.sin(Math.PI * u) * 16; argolla(Math.round(x), Math.round(y), t, 2); for (let k = 1; k < 6; k++) { const f = Math.max(0, u - k * 0.05); R.pset(Math.round(lerp(154, nv.mano[0], f)), Math.round(lerp(112, nv.mano[1] - 3, f) - Math.sin(Math.PI * f) * 16) - 6, k < 3 ? hex('#fff0a0') : ORO); } }
  else if (u >= 1) { argolla(nv.mano[0], nv.mano[1] - 2, t); if (t < VENA) halo(nv.mano[0], nv.mano[1] - 3, 6 + Math.round(2 * Math.sin(t * 6)), hex('#fff0a0'), t); }
  // la vena: un pulso de luz sube de la mano al pecho y sale el corazón
  const pecho = [nv.cabeza[0] - 1, nv.cabeza[1] + 18], v = tramo(t, VENA, CORAZON);
  if (v > 0 && t < CORAZON + 0.3) {
    const [hx, hy] = nv.mano;
    for (let k = 0; k <= 24; k++) { const f = k / 24; if (f > v) break; const x = Math.round(lerp(hx, pecho[0], f)), y = Math.round(lerp(hy, pecho[1], f)) - Math.round(Math.sin(Math.PI * f) * 5); R.rect(x, y, x + 1, y + 1, f > v - 0.3 ? ROSA : ROJO); }
    if (v > 0.6) { const r = Math.round(2 + (v - 0.6) * 8); R.icono('corazon', pecho[0] - 3, pecho[1] - 3 - r, ROJO, ROJOS, 1); }
    const px = Math.round(lerp(hx, pecho[0], v)), py = Math.round(lerp(hy, pecho[1], v) - Math.sin(Math.PI * v) * 3); R.disco(px, py, 2, ROSA); R.pset(px, py, BL);
  }
  const c = tramo(t, CORAZON - 0.1, CORAZON + 1.6);
  if (c > 0 && c < 1 && !(c > 0.8 && Math.floor(t * 10) % 2)) { const y = Math.round(lerp(pecho[1] - 8, nv.cabeza[1] - 26, Math.min(1, c * 2.2))); R.icono('corazon', pecho[0] - 7, y, ROJO, ROJOS, 2); if (c < 0.35) for (const [a, b] of [[-11, 3], [11, 2], [-8, -6], [9, -7]]) destello(pecho[0] + a, y + 7 + b, ROSA); }
};

// 2 · el rollo romano: la mesa de nogal a la luz del candil, el papiro que se desenrolla y la tinta que dibuja
let BR = null;
const TINTA = hex('#3a2414'), OCRE = hex('#c8963e'), OCRES = hex('#9a6a2a'), AZUL = hex('#3a6ab0'), PAP = hex('#e6d2a0'), PAPS = hex('#cdb47c'), PAPL = hex('#f2e4b8');
const mesaRomana = () => {
  if (!BR) {
    BR = R.nuevo(); const prev = R.usar(BR);
    const M0 = hex('#6e3e22'), M1 = hex('#84502c'), M2 = hex('#4a2814'), NEG = hex('#120806');
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      const tabla = Math.floor((y + 10) / 48), yy = (y + 10) % 48;
      const veta = Math.sin(x * 0.04 + tabla * 7 + Math.sin(y * 0.33 + tabla * 3) * 1.8) + Math.sin(x * 0.19 + y * 0.8 + tabla) * 0.35;
      let c = veta > 0.62 ? M1 : veta < -0.9 ? M2 : M0;
      if (hh(x >> 2, y, tabla) > 0.97) c = M2;
      if (yy === 0) c = NEG; else if (yy === 1) c = M2; else if (yy === 2) c = mez(M0, NEG, 0.2);
      const d = Math.hypot((x - 158) / 1.3, (y - 100) * 1.05) / 150 + (x > 262 && y < 54 ? 0.5 : 0) + (y < 16 ? 0.35 : 0);
      R.pset(x, y, mez(c, NEG, Math.min(0.9, Math.max(0, d - 0.42) * 1.5)));
    }
    // nudos de la madera
    for (const [x, y] of [[226, 160], [112, 24], [300, 112]]) { R.disco(x, y, 3, M2); R.disco(x, y, 1.5, mez(M2, NEG, 0.5)); }
    // la tablilla de cera con su estilo de bronce
    R.rect(12, 114, 66, 166, K); R.rect(13, 115, 65, 165, hex('#8a5a32')); R.rect(17, 119, 61, 161, K); R.rect(18, 120, 60, 160, hex('#3a2a1c'));
    for (let j = 124; j < 158; j += 6) for (let i = 21; i < 58; i++) if (hh(i >> 1, j, 4) > 0.35) R.pset(i, j, hex('#6a5038'));
    R.rect(13, 115, 65, 115, hex('#b07a46')); R.linea(70, 120, 92, 160, K); R.linea(71, 120, 93, 160, hex('#c8a050')); R.pset(70, 119, hex('#f0d080'));
    // monedas
    for (const [x, y, c] of [[82, 166, OCRE], [92, 170, hex('#c8ccd8')], [76, 172, OCRE]]) { R.disco(x, y, 4, K); R.disco(x, y, 3, c); R.pset(x - 1, y - 1, BL); R.anillo(x, y, 2, mez(c, K, 0.35)); }
    // el tintero de bronce con sus cálamos
    R.disco(284, 148, 11, K); R.disco(284, 148, 10, hex('#7a5a2a')); R.disco(283, 147, 8, hex('#a8843e')); R.disco(284, 148, 4, K); R.disco(284, 148, 3, hex('#100810')); R.pset(280, 143, hex('#f0d890'));
    for (const [a, b] of [[[252, 166], [270, 128]], [[258, 170], [278, 134]]]) { R.linea(...a, ...b, K); R.linea(a[0] + 1, a[1], b[0] + 1, b[1], hex('#c8a868')); }
    // un rollo cerrado con su cinta, arriba
    R.rect(180, 18, 250, 30, K); R.rect(181, 19, 249, 29, PAPS); R.rect(181, 19, 249, 21, PAPL); R.rect(181, 27, 249, 29, hex('#a88a54'));
    R.rect(212, 18, 216, 30, hex('#8a1a24')); R.disco(178, 24, 4, K); R.disco(178, 24, 3, hex('#5a3418')); R.disco(252, 24, 4, K); R.disco(252, 24, 3, hex('#5a3418'));
    // el racimo y una hoja de parra
    PZ.racimo(R, 300, 98, { s: 1 });
    // la corona de laurel abajo, en el centro, y unas aceitunas en su cuenco
    for (let k = 0; k < 18; k++) { const a = Math.PI * (0.15 + k / 17 * 0.7), x = Math.round(176 + Math.cos(a) * 26), y = Math.round(150 + Math.sin(a) * 18); R.poligono([[x - 3, y], [x, y - 2], [x + 3, y], [x, y + 2]], k % 2 ? hex('#3a7a2a') : hex('#4e9a3a')); R.pset(x, y, hex('#2a5a1e')); }
    R.disco(126, 166, 9, K); R.disco(126, 166, 8, hex('#c0643a')); R.disco(126, 165, 6, hex('#8a3a1a')); for (const [a, b] of [[-2, -1], [2, 0], [0, 2], [-3, 2]]) { R.disco(126 + a, 165 + b, 1.6, hex('#3a4a1a')); R.pset(126 + a, 164 + b, hex('#7a8a4a')); } R.poligono([[292, 74], [304, 70], [310, 78], [302, 84], [294, 82]], hex('#3a7a2a')); R.linea(296, 78, 306, 76, hex('#2a5a1e'));
    R.usar(prev);
  }
  R.copiar(BR);
};
const candil = (t) => {   // el candil de barro con su llama, el halo que tiembla y una polilla
  const fl = 0.8 + 0.2 * Math.sin(t * 13) * Math.sin(t * 7.3);
  for (let y = 18; y <= 72; y++) for (let x = 14; x <= 84; x++) { const d = Math.hypot(x - 56, y - 44) / (26 * fl); if (d < 1 && hh(x, y, 1) > d * d) R.pset(x, y, mez(R.pget(x, y), hex('#ffd880'), 0.22 * (1 - d))); }
  R.disco(40, 46, 11, K); R.disco(40, 46, 10, hex('#9a4a26')); R.disco(39, 45, 8, hex('#c0643a')); R.disco(40, 46, 4, K); R.disco(40, 46, 3, hex('#3a1a0a'));
  R.poligono([[46, 42], [58, 43], [58, 49], [46, 50]], K); R.poligono([[47, 43], [57, 44], [57, 48], [47, 49]], hex('#b05a30')); R.rect(31, 44, 33, 48, hex('#7a3418'));
  const a = Math.round(Math.sin(t * 11) * 1.4); R.poligono([[57, 43], [66 + a, 46], [57, 49]], hex('#f08a20')); R.poligono([[57, 45], [63 + a, 46], [57, 47]], hex('#ffe070')); R.pset(57, 46, BL);
  const mx = Math.round(56 + Math.cos(t * 2.7) * 18), my = Math.round(40 + Math.sin(t * 3.9) * 10), w = Math.sin(t * 30) > 0;
  R.pset(mx, my, hex('#8a8070')); R.pset(mx + 1, my, hex('#8a8070')); R.pset(mx - 1, my + (w ? -1 : 1), hex('#c8bca0')); R.pset(mx + 2, my + (w ? -1 : 1), hex('#c8bca0'));
};
const p2 = (t) => {
  mesaRomana(); candil(t);
  const u = tramo(t, P2 + 0.62, P2 + 1.3), e = u * u * (3 - 2 * u);
  const xl = Math.round(lerp(152, 64, e)), xr = Math.round(lerp(166, 256, e)), y0 = 56, y1 = 140;
  for (let y = y0 + 5; y <= y1 + 6; y++) for (let x = xl + 2; x <= xr + 10; x++) R.pset(x, y, mez(R.pget(x, y), K, 0.45));
  for (let y = y0; y <= y1; y++) for (let x = xl; x <= xr; x++) {
    if ((y === y0 || y === y1) && hh(x, y, 9) < 0.3) continue;
    const fib = (y % 3 === 0 ? 1 : 0) + ((x + (y >> 3)) % 5 === 0 ? 1 : 0) + (hh(x, y, 2) > 0.94 ? 1 : 0);
    let c = fib >= 2 ? PAPS : fib === 1 && hh(x, y) > 0.5 ? mez(PAP, PAPS, 0.5) : PAP;
    if (y < y0 + 3 || y > y1 - 3) c = mez(c, OCRES, 0.35);
    if (hh(x >> 3, y >> 3, 5) > 0.9) c = mez(c, OCRES, 0.25);
    R.pset(x, y, c);
  }
  R.recorte([xl + 1, y0 + 2, xr - 1, y1 - 2]);
  // lo que ya estaba escrito: renglones viejos (sin letras: rayitas)
  const renglon = (x0, x1, y, n = 1, c = mez(TINTA, PAP, 0.35)) => { let x = x0; let k = 0; while (x < x0 + (x1 - x0) * n) { const l = 2 + Math.floor(hh(x, y, 7) * 5); R.linea(x, y, Math.min(x + l, x0 + (x1 - x0) * n), y, c); if (hh(x, y, 8) > 0.6) R.pset(x + 1, y - 1, c); x += l + 2; k++; } };
  for (const y of [64, 70, 76]) renglon(70, 146, y);
  for (const y of [64, 70]) renglon(214, 250, y);
  // la mano dibujada con la argolla en el anular
  const LH = [[186, 118], [186, 100], [178, 92], [181, 89], [188, 97], [188, 80], [191, 78], [192, 96], [193, 75], [196, 75], [197, 96], [198, 77], [201, 77], [202, 97], [203, 83], [206, 83], [206, 118]];
  for (let i = 0; i + 1 < LH.length; i++) R.linea(...LH[i], ...LH[i + 1], TINTA);
  R.linea(188, 118, 188, 128, TINTA); R.linea(204, 118, 204, 128, TINTA); R.linea(190, 106, 200, 108, mez(TINTA, PAP, 0.5));
  R.linea(197, 88, 202, 88, K); R.linea(197, 89, 202, 89, ORO); R.pset(198, 87, hex('#fff0a0'));
  // la vena roja del anular al corazón (la tinta corre con «Roman writers»)
  const VE = [[200, 92], [200, 104], [204, 112], [214, 108], [222, 98], [228, 90]];
  const pv = tramo(t, W(6.9), W(8.0));
  if (pv > 0) { const n = Math.floor(pv * 40); for (let k = 0; k <= n; k++) { const f = k / 40 * (VE.length - 1), i = Math.min(VE.length - 2, Math.floor(f)), q = f - i; const x = lerp(VE[i][0], VE[i + 1][0], q), y = lerp(VE[i][1], VE[i + 1][1], q); if (k % 3 !== 2) R.pset(Math.round(x), Math.round(y), hex('#b8302a')); if (k === n && pv < 1) destello(Math.round(x), Math.round(y), hex('#ffb0a0')); } }
  const pc = tramo(t, W(7.9), W(8.3));
  if (pc > 0) { const r = pc < 1 ? 1 + pc * 4 : 4 + (Math.sin(t * 6) > 0.6 ? 0.6 : 0), cx = 232, cy = 84; R.disco(cx - r * 0.5, cy - r * 0.3, r * 0.62, hex('#b8302a')); R.disco(cx + r * 0.5, cy - r * 0.3, r * 0.62, hex('#b8302a')); R.poligono([[cx - r * 1.1, cy - r * 0.1], [cx + r * 1.1, cy - r * 0.1], [cx, cy + r * 1.1]], hex('#b8302a')); R.pset(cx - Math.round(r * 0.6), cy - Math.round(r * 0.5), hex('#ff9a8a')); }
  // los renglones nuevos («writers credited…»)
  const pr = tramo(t, W(8.1), W(9.3));
  for (let k = 0; k < 3; k++) { const f = Math.max(0, Math.min(1, pr * 3 - k)); if (f > 0) renglon(212, 252, 116 + k * 7, f, TINTA); }
  // Egipto: el sol, las pirámides, la palmera y el Nilo («to the Egyptians»)
  const pe = tramo(t, W(9.3), W(10.4));
  if (pe > 0) {
    const sol = Math.min(1, pe * 5); R.disco(90, 86, 5 * sol, hex('#d8501a')); if (sol >= 1) { R.anillo(90, 86, 5, TINTA); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t * 0.3; R.linea(Math.round(90 + Math.cos(a) * 7), Math.round(86 + Math.sin(a) * 7), Math.round(90 + Math.cos(a) * 9), Math.round(86 + Math.sin(a) * 9), OCRES); } }
    const lado = (a, b, f) => R.linea(a[0], a[1], Math.round(lerp(a[0], b[0], f)), Math.round(lerp(a[1], b[1], f)), TINTA);
    const f1 = Math.max(0, Math.min(1, (pe - 0.1) * 3));
    if (pe > 0.45) { R.poligono([[112, 93], [93, 124], [112, 124]], OCRE); R.poligono([[112, 93], [112, 124], [131, 124]], OCRES); for (let y = 100; y < 124; y += 4) R.linea(Math.round(112 - (y - 93) * 0.6), y, Math.round(112 + (y - 93) * 0.6), y, mez(OCRES, TINTA, 0.3)); }
    lado([93, 124], [112, 92], f1); lado([112, 92], [131, 124], f1); lado([131, 124], [93, 124], f1);
    if (pe > 0.6) { R.poligono([[136, 104], [125, 124], [147, 124]], OCRE); R.poligono([[136, 104], [136, 124], [147, 124]], OCRES); R.linea(136, 104, 125, 124, TINTA); R.linea(136, 104, 147, 124, TINTA); R.linea(125, 124, 147, 124, TINTA); }
    if (pe > 0.72) { R.linea(76, 124, 78, 108, TINTA); R.linea(77, 124, 79, 108, OCRES); for (const [a, b] of [[-6, 2], [6, 2], [-4, -3], [4, -3], [0, -4]]) R.linea(78, 107, 78 + a, 107 + b, hex('#3a7a2a')); }
    const pn = Math.max(0, Math.min(1, (pe - 0.8) * 5)); for (let x = 70; x < 70 + 78 * pn; x++) { R.pset(x, Math.round(130 + Math.sin(x * 0.5 + t * 3) * 1.2), AZUL); R.pset(x, Math.round(133 + Math.sin(x * 0.5 + 1 + t * 3) * 1.2), mez(AZUL, PAP, 0.5)); }
  }
  R.recorte(null);
  // los dos rodillos de madera con sus pomos
  for (const xr0 of [xl - 7, xr + 1]) {
    R.rect(xr0, y0 - 2, xr0 + 6, y1 + 2, K); for (let i = 1; i <= 5; i++) R.rect(xr0 + i, y0 - 1, xr0 + i, y1 + 1, i < 2 ? PAPL : i < 4 ? PAP : PAPS);
    for (const y of [y0 - 5, y1 + 5]) { R.disco(xr0 + 3, y, 4, K); R.disco(xr0 + 3, y, 3, hex('#5a3418')); R.pset(xr0 + 2, y - 1, hex('#a8743c')); }
  }
};

// 3 · la lámina de cerca
const p3 = (t) => {
  const vena = tramo(t, P3 + 0.05, W(11.3)) * (1 - tramo(t, W(11.9), W(12.4))), todas = tramo(t, W(12.6), W(13.6));
  const o = { encuadre: 'joyero', camara: 'lamina', vena, todas };
  T.fiestas(R, t, o);
  R.actor(EL.joyero, 280, 159, t, { dir: -1, dedo: (t > P3 + 0.3 && t < W(11.3)) || (t > W(12.7) && t < W(14.4)), habla: t > W(11.2) && t < W(12.3) && Math.sin(t * 9) > 0, enfado: t > W(11.4) && t < W(12.4), sonrisa: t > W(13.0) });
  T.fiestasDelante(R, t, o);
  const x = tramo(t, W(11.5), W(11.7));
  if (x > 0 && t < W(12.5) && !(t > W(12.2) && Math.floor(t * 10) % 2)) R.icono('X', 243, 47, hex('#e83a3a'), hex('#5a0a10'), 2);
};

// 4 · el mapa de Europa en la mesa del joyero
let BM = null;
const RC = [8, 18, 262, 170], VI = [-2, 48, 40.5, 59];
const P = (lo, la) => R.proyMapa(lo, la, RC, VI).map(Math.round);
const mesaJoyero = () => {
  if (!BM) {
    BM = R.nuevo(); const prev = R.usar(BM);
    const M0 = hex('#8a5a32'), M1 = hex('#9e6a3c'), M2 = hex('#5e3a1e'), NEG = hex('#160c06');
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      const tabla = Math.floor(x / 64), xx = x % 64, veta = Math.sin(y * 0.05 + tabla * 5 + Math.sin(x * 0.3) * 1.2) + Math.sin(y * 0.21 + x * 0.6) * 0.3;
      let c = veta > 0.6 ? M1 : veta < -0.95 ? M2 : M0; if (xx === 0) c = NEG; else if (xx === 1) c = M2;
      const d = (x > 266 && y < 52 ? 0.75 : 0) + (y < 14 ? 0.6 : 0) + Math.hypot(x - 140, y - 100) / 420;
      R.pset(x, y, mez(c, NEG, Math.min(0.88, d)));
    }
    // a la derecha, las herramientas: el estuche abierto con su argolla, la lupa y los alicates
    R.rect(272, 136, 312, 166, K); R.rect(273, 137, 311, 165, hex('#2a1a3a')); R.rect(276, 152, 308, 162, hex('#8a1a3a')); R.rect(276, 140, 308, 150, hex('#6a1430')); R.rect(276, 152, 308, 152, hex('#b83a5a'));
    R.linea(292, 152, 292, 162, hex('#5a0a20'));
    R.disco(290, 96, 13, K); R.disco(290, 96, 12, hex('#c8ccd8')); R.disco(290, 96, 10, hex('#7aa8c8')); R.disco(287, 93, 4, hex('#c8e0f0')); R.linea(299, 106, 312, 124, K); R.linea(300, 105, 313, 123, hex('#5a3418')); R.linea(301, 105, 314, 122, hex('#7a4a24'));
    R.linea(276, 64, 300, 76, K); R.linea(276, 66, 300, 74, K); R.linea(277, 65, 299, 75, hex('#9a9eae')); R.linea(300, 76, 312, 82, hex('#c83a2a')); R.linea(300, 74, 312, 70, hex('#c83a2a')); R.disco(300, 75, 2, hex('#5a5e6e'));
    // la regla de latón abajo
    R.rect(20, 172, 200, 177, K); R.rect(21, 173, 199, 176, hex('#c8a04a')); for (let x = 24; x < 198; x += 4) R.rect(x, 173, x, x % 20 === 0 ? 175 : 174, hex('#7a5a1a'));
    R.usar(prev);
  }
  R.copiar(BM);
};
const ALEMANIA = [[6.0, 51.8], [6.1, 50.8], [6.4, 49.5], [7.6, 49.0], [7.6, 47.6], [9.5, 47.6], [10.2, 47.3], [13.0, 47.5], [13.8, 48.6], [12.1, 50.3], [14.8, 50.9], [14.6, 52.6], [14.2, 53.9], [12.0, 54.3], [10.9, 54.0], [9.9, 54.8], [8.6, 54.9], [8.6, 53.9], [7.0, 53.5], [7.0, 52.3]];
const RUSIA = [[27.8, 59.5], [28.0, 57.5], [28.2, 56.2], [30.9, 55.6], [31.8, 53.1], [32.7, 52.3], [34.3, 51.7], [35.4, 50.6], [38.2, 50.0], [40.0, 49.6], [39.7, 48.0], [38.3, 47.6], [39.2, 47.0], [38.3, 46.4], [37.6, 45.5], [36.7, 45.3], [37.4, 44.7], [38.8, 44.3], [40.0, 43.4], [42.5, 43.2], [46.0, 41.9], [49, 41.9], [49, 59.5]];
const RIOS = [[[6.0, 51.9], [7.0, 50.9], [7.6, 50.3], [8.3, 49.9], [8.4, 49.0], [7.6, 47.6]], [[9.0, 53.9], [10.6, 53.3], [11.8, 52.5], [12.4, 51.8], [13.7, 51.0], [14.3, 50.6]], [[18.8, 54.3], [18.6, 53.1], [20.0, 52.4], [21.0, 52.2], [21.5, 51.0], [19.5, 50.0]], [[8.5, 48.0], [11.0, 48.7], [13.5, 48.5], [16.4, 48.2], [18.9, 47.5], [19.0, 46.0], [20.5, 44.8], [22.6, 44.6], [25.0, 43.7], [28.0, 44.0], [29.6, 45.2]], [[33.0, 55.0], [30.5, 54.0], [30.5, 51.5], [30.5, 50.4], [32.5, 49.2], [35.0, 47.8], [33.5, 46.8], [32.5, 46.5]], [[38.5, 53.5], [39.2, 51.5], [40.0, 50.0], [42.0, 48.8], [41.0, 47.6], [39.5, 47.1]], [[33.0, 57.0], [36.0, 57.2], [38.0, 57.6], [40.0, 57.6], [42.0, 56.3], [44.0, 56.3], [46.0, 56.0], [48.5, 55.8]]];
const CIUDADES = [[2.35, 48.85], [12.5, 41.9], [16.37, 48.2], [21.0, 52.2], [30.5, 50.45], [-0.12, 51.5], [18.07, 59.3], [12.57, 55.68], [4.9, 52.37]];
const esMar = (c) => ((c >>> 16) & 255) > (c & 255) + 10;
const tinte = (pol, a, c, t) => {
  if (a <= 0) return; const pts = pol.map(([lo, la]) => P(lo, la)), lat = 0.62 * a + 0.08 * a * Math.sin(t * 4);
  R.recorte([RC[0] + 2, RC[1] + 2, RC[2] - 2, RC[3] - 2]);
  R.poligono(pts, (x, y) => { const c0 = R.pget(x, y); return esMar(c0) ? c0 : mez(c0, c, (x + y) % 3 === 0 ? lat + 0.2 : lat); });
  const n = Math.floor(pts.length * Math.min(1, a * 1.5));
  for (let i = 0; i < n; i++) R.linea(...pts[i], ...pts[(i + 1) % pts.length], mez(c, K, 0.55));
  R.recorte(null);
};
const p4 = (t) => {
  mesaJoyero();
  R.mapa(t, { rc: RC, vista: VI });
  // el mapa se vuelve de papel viejo: la tierra en sepia y el mar más apagado, para que los dos países se lean
  for (let y = RC[1] + 2; y < RC[3] - 1; y++) for (let x = RC[0] + 2; x < RC[2] - 1; x++) { const c = R.pget(x, y); R.pset(x, y, esMar(c) ? mez(c, hex('#6a8aa8'), 0.35) : mez(c, hex('#e6d6a8'), 0.62)); }
  // los ríos grabados (Rin, Elba, Vístula, Danubio, Dniéper, Don, Volga) y las ciudades en punto
  R.recorte([RC[0] + 2, RC[1] + 2, RC[2] - 2, RC[3] - 2]);
  for (const rio of RIOS) for (let i = 0; i + 1 < rio.length; i++) R.linea(...P(...rio[i]), ...P(...rio[i + 1]), (x, y) => (esMar(R.pget(x, y)) ? null : hex('#4a78b0')));
  for (const c of CIUDADES) { const [x, y] = P(...c); R.disco(x, y, 2, K); R.pset(x, y, hex('#e6d6a8')); }
  R.recorte(null);
  const DE = W(16.67), RU = W(17.29), DER = W(19.67);
  tinte(ALEMANIA, tramo(t, DE - 0.1, DE + 0.4), hex('#e89a20'), t);
  tinte(RUSIA, tramo(t, RU - 0.05, RU + 0.6), hex('#e89a20'), t);
  const be = P(13.4, 52.5), mo = P(37.6, 55.75), va = P(21.0, 52.2), mi = P(27.6, 53.9);
  const pr = tramo(t, DE + 0.15, RU + 0.3);
  if (pr > 0) R.ruta([be, [va[0], va[1] - 6], [mi[0], mi[1] - 8], mo], pr, hex('#b8202a'), { grueso: true });
  T.chincheta(R, be[0], be[1], t, hex('#d8303a'), { baja: tramo(t, DE - 0.3, DE), pulso: t > DE + 0.2 });
  T.chincheta(R, mo[0], mo[1], t, hex('#d8303a'), { baja: tramo(t, RU - 0.1, RU + 0.2), pulso: t > RU + 0.4 });
  // la tarjeta clavada en el mar con las dos manos: la argolla salta de la izquierda a la derecha
  const ct = tramo(t, P4 + 0.62, P4 + 1.0), cy = Math.round(lerp(196, 124, ct * ct * (3 - 2 * ct)));
  if (ct > 0) {
    R.rect(20, cy + 2, 116, cy + 46, mez(K, hex('#1a2a4a'), 0.3)); R.rect(16, cy - 2, 112, cy + 42, K); R.rect(17, cy - 1, 111, cy + 41, hex('#f4ead0'));
    for (let x = 18; x < 111; x += 2) if (hh(x, cy, 3) > 0.6) R.pset(x, cy + 40, hex('#d8c8a0'));
    R.rect(64, cy + 6, 64, cy + 36, hex('#d8c8a0'));
    const my = cy + 24;
    T.mano(R, 34, my, 1, '#e8e0cc', { sinManga: true }); T.mano(R, 94, my, -1, '#e8e0cc', { sinManga: true });
    const j = tramo(t, DER - 0.3, DER + 0.25), A = [42, my - 1], B = [86, my - 1];
    if (j <= 0) { argolla(A[0], A[1] + Math.round(t > W(18.9) && t < DER - 0.3 ? Math.abs(Math.sin(t * 14)) * -1 : 0), t); if (t > W(18.07)) halo(A[0] + 1, A[1] - 2, 7, hex('#e89a20'), t); }
    else if (j < 1) { const x = lerp(A[0], B[0], j), y = lerp(A[1], B[1], j) - Math.sin(Math.PI * j) * 16; argolla(Math.round(x), Math.round(y), t); for (let k = 1; k < 5; k++) { const f = Math.max(0, j - k * 0.06); R.pset(Math.round(lerp(A[0], B[0], f)), Math.round(lerp(A[1], B[1], f) - Math.sin(Math.PI * f) * 16) - 2, mez(hex('#f0c040'), hex('#f4ead0'), k * 0.2)); } }
    else { argolla(B[0], B[1], t); halo(B[0] + 1, B[1] - 2, 7 + Math.round(Math.sin(t * 6)), hex('#e89a20'), t); if (t < DER + 0.9) for (const [a, b] of [[-8, -6], [8, -7], [0, -11]]) destello(B[0] + a, B[1] + b, hex('#fff0a0')); if (t > DER + 0.3) R.icono('X', 31, my - 18, hex('#a8a090'), hex('#5a5448'), 1); }
    T.chincheta(R, 64, cy + 4, t, hex('#3a6ab0'), { baja: tramo(t, P4 + 0.95, P4 + 1.15) });
  }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  año: (t) => (t >= P2 && t < P3 ? null : 2026),
  efectos: [[DEDO + 0.4, 'brillo'], [CORAZON, 'pop'], [P2 + 0.62, 'papel'], [W(7.0), 'lapiz'], [W(9.35), 'lapiz'], [W(11.55), 'toc'], [W(12.65), 'brillo'], [W(16.67), 'golpecito'], [W(17.35), 'golpecito'], [W(19.45), 'boing'], [W(19.95), 'brillo']],
});
''')

E['tr-moda'] = ('Una moda', '''// TR-MODA (frase 23), 2026, sin cartela. Cuatro planos:
// 1. el salón de Atom: el chico en el sofá; la chica entra por la derecha con el álbum, lo deja en la mesita
//    («the same way») y lo señala;  2. corte en «A fashion»: el álbum abierto de cerca, sobre el mantel con el chocolate y
//    la vela; caen las estampas en su sitio: el vestido («fashion»), las uvas («joke»), el pastel, la liebre, la
//    tarjeta («cards») y el nabo («candy»); la de las uvas brilla en «grapes»;  3. corte en «And within a generation»: el
//    calendario de cerca; el chico sube al taburete, levanta la hoja y los meses vuelan solos; sonríe en «existed»;
//  4. corte en «But»: la medianoche: la familia brinda alrededor de la mesa («ours»), el chico llega con el pastel y
//    todos lo celebran juntos («who you celebrate them with») con el confeti.''', COMUN + r'''
const P2 = W(5.44), P3 = W(12.32), P4 = W(16.67);

// el álbum cerrado (de piel roja con cantoneras doradas) y abierto en la mesita
const albumCerrado = (x, y) => { R.rect(x - 6, y - 5, x + 6, y + 3, K); R.rect(x - 5, y - 4, x + 5, y + 2, hex('#a8283a')); R.rect(x - 5, y - 4, x - 4, y + 2, hex('#6a1424')); R.pset(x + 5, y - 4, hex('#f0c040')); R.pset(x + 5, y + 2, hex('#f0c040')); R.rect(x - 1, y - 2, x + 2, y, hex('#f0c040')); };
const albumAbierto = (x, y, t) => {
  R.rect(x - 16, y - 1, x + 16, y + 3, K); R.rect(x - 15, y, x + 15, y + 2, hex('#a8283a'));
  R.poligono([[x - 15, y], [x - 1, y - 1], [x - 1, y - 6], [x - 14, y - 5]], hex('#f2e8d0')); R.poligono([[x + 1, y - 1], [x + 15, y], [x + 14, y - 5], [x + 1, y - 6]], hex('#e8dcc0'));
  R.linea(x, y - 6, x, y, hex('#8a7a5a'));
  for (const [i, c] of [[-12, hex('#f6f6f6')], [-6, hex('#6a2a7a')], [3, hex('#d8303a')], [9, hex('#e07a20')]]) R.rect(x + i, y - 4, x + i + 2, y - 2, c);
};
const p1 = (t) => {
  const o = { encuadre: 'salon' };
  T.hoy(R, t, o);
  // el chico, sentado en el sofá, se gira hacia la chica que llega
  const llega = tramo(t, 0.4, 3.3), xc = Math.round(lerp(332, 160, llega));
  R.actor(EL.chicoHoy, 36, 150, t, { dir: 1, habla: t > 1.0 && t < 1.9 && Math.sin(t * 9) > 0, sorpresa: t > 3.4 && t < 3.9, sonrisa: t > 4.2 });
  const deja = W(4.6), pone = t > deja;
  const ch = R.actor(EL.chicaHoy, xc, 147, t, { dir: -1, anda: llega > 0 && llega < 1, sostiene: !pone ? [xc - 2, 132] : false, dedo: pone && t < deja + 0.8, sonrisa: pone, habla: pone && t > deja + 0.8 && Math.sin(t * 8) > 0 });
  T.hoyDelante(R, t, o);
  if (!pone) albumCerrado(ch.mano[0], ch.mano[1]);
  else albumAbierto(170, 155, t);
};

// 2 · el álbum abierto de cerca, sobre el mantel
let BA = null;
const RAN = [[22, 40], [80, 40], [51, 104], [150, 40], [208, 40], [179, 104]];   // las seis ranuras (esquina de arriba, 50 × 52)
const marcoEstampa = (x, y, fondo, suelo) => {
  R.rect(x, y, x + 49, y + 51, K); R.rect(x + 1, y + 1, x + 48, y + 50, hex('#fbf6ea'));
  for (let yy = y + 4; yy <= y + 44; yy++) R.rect(x + 4, yy, x + 45, yy, mez(fondo, BL, (yy - y) / 120));
  R.rect(x + 4, y + 36, x + 45, y + 44, suelo); for (let i = x + 5; i < x + 45; i += 3) R.pset(i, y + 37 + (i % 2), mez(suelo, K, 0.25));
  for (let i = x + 1; i <= x + 48; i += 2) { R.pset(i, y + 1, hex('#e6dcc6')); R.pset(i, y + 50, hex('#e6dcc6')); }
  const cin = hex(['#f0a0b8', '#a0d0f0', '#f0d870'][(x + y) % 3]);
  for (const [a, b, d] of [[x - 3, y + 6, 1], [x + 41, y - 2, 1]]) for (let i = 0; i < 11; i++) { R.pset(a + i, b - i * d * 0.5 | 0, cin); R.pset(a + i, (b - i * d * 0.5 | 0) + 1, cin); R.pset(a + i, (b - i * d * 0.5 | 0) + 2, mez(cin, BL, 0.4)); }
};
const ESTAMPAS = [
  (x, y, t) => { marcoEstampa(x, y, hex('#6a8ac8'), hex('#c83a3a')); for (const i of [x + 10, x + 38]) { R.rect(i, y + 12, i + 1, y + 36, hex('#f0c040')); R.pset(i, y + 11, hex('#fff0a0')); } R.actor(EL.noviaBlanca, x + 17, y + 42, t, { dir: 1, sonrisa: true }); },
  (x, y, t) => { marcoEstampa(x, y, hex('#1e2a5a'), hex('#5a4a5a')); R.disco(x + 36, y + 14, 6, K); R.disco(x + 36, y + 14, 5, hex('#f4ecd8')); R.linea(x + 36, y + 14, x + 36, y + 10, K); R.linea(x + 36, y + 14, x + 39, y + 14, K); for (let k = 0; k < 6; k++) R.pset(x + 8 + k * 5, y + 8 + (k * 7) % 9, hex('#f0e080')); PZ.racimo(R, x + 18, y + 40, { s: 2 }); },
  (x, y, t) => { marcoEstampa(x, y, hex('#f0b0c8'), hex('#a8743c')); PZ.pastel(R, x + 25, y + 42, { velas: 5, encendidas: 5, t }); },
  (x, y, t) => { marcoEstampa(x, y, hex('#8ac8e8'), hex('#5a9a3a')); PZ.liebre(R, x + 22, y + 40, { t }); for (const [i, c] of [[x + 38, 'rojo'], [x + 43, 'azul']]) PZ.huevo(R, i, y + 42, { color: c }); },
  (x, y, t) => { marcoEstampa(x, y, hex('#d8c8b0'), hex('#7a7680')); for (let i = x + 8; i < x + 44; i += 7) R.rect(i, y + 6, i + 1, y + 36, hex('#5a5662')); PZ.tarjeta(R, x + 25, y + 34, { s: 2 }); },
  (x, y, t) => { marcoEstampa(x, y, hex('#2a2440'), hex('#4a3a2a')); PZ.nabo(R, x + 25, y + 42, { s: 2, luz: 0.7 + 0.3 * Math.sin(t * 9) }); for (let k = 0; k < 4; k++) R.pset(x + 8 + k * 9, y + 9 + (k % 2) * 4, hex('#f0e080')); },
];
const mantel = () => {
  if (!BA) {
    BA = R.nuevo(); const prev = R.usar(BA);
    const V0 = hex('#2e5a3a'), V1 = hex('#3a6a46'), V2 = hex('#22442c'), NEG = hex('#0e1a12');
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
      const dam = Math.sin(x * 0.21) * Math.sin(y * 0.21) + Math.sin((x + y) * 0.07) * 0.6;
      let c = dam > 0.75 ? V1 : dam < -0.8 ? V2 : V0; if ((x + y) % 2 && hh(x, y) > 0.8) c = mez(c, V1, 0.5);
      const d = (x > 272 && y < 50 ? 0.7 : 0) + (y < 16 ? 0.5 : 0) + Math.hypot(x - 140, y - 100) / 360;
      R.pset(x, y, mez(c, NEG, Math.min(0.85, d)));
    }
    // el álbum: tapas de piel roja, las dos hojas con su papel y el lomo
    R.rect(6, 28, 274, 174, K); R.rect(7, 29, 273, 173, hex('#8a1a2a')); R.rect(7, 29, 273, 30, hex('#b83a4a'));
    for (const [x0, x1, c] of [[12, 136, hex('#f2e8d2')], [142, 268, hex('#ece0c6')]]) {
      R.rect(x0, 32, x1, 168, c); for (let y = 32; y <= 168; y++) for (let x = x0; x <= x1; x++) if (hh(x, y, 1) > 0.93) R.pset(x, y, mez(c, hex('#b8a888'), 0.3));
    }
    for (let y = 32; y <= 168; y++) { R.pset(136, y, hex('#a8987a')); R.pset(137, y, hex('#8a7a5a')); R.pset(138, y, K); R.pset(139, y, hex('#8a7a5a')); R.pset(140, y, hex('#9a8a6a')); R.pset(141, y, hex('#c8b898')); }
    // los adornos de las hojas: estrellitas y corazones pegados, una flor prensada, un billete de tren, la cinta del marcapáginas
    for (const [x, y, c] of [[38, 154, '#e8486a'], [122, 98, '#f0c040'], [160, 156, '#4aa8e8'], [254, 100, '#e8486a'], [30, 98, '#4aa8e8'], [252, 156, '#f0c040'], [112, 154, '#8ae84a']]) { const q = hex(c); R.pset(x, y - 2, q); R.rect(x - 2, y, x + 2, y, q); R.pset(x, y - 1, q); R.pset(x - 1, y + 1, q); R.pset(x + 1, y + 1, q); R.pset(x - 1, y + 2, q); R.pset(x + 1, y + 2, q); }
    for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; R.disco(Math.round(124 + Math.cos(a) * 3), Math.round(140 + Math.sin(a) * 3), 2, hex('#c8a0d8')); } R.disco(124, 140, 1.5, hex('#f0c040')); R.linea(124, 144, 120, 160, hex('#5a8a3a')); R.poligono([[121, 152], [116, 150], [120, 155]], hex('#5a8a3a'));
    R.rect(234, 148, 262, 160, K); R.rect(235, 149, 261, 159, hex('#e8d8a8')); R.rect(235, 149, 241, 159, hex('#c83a2a')); for (let x = 244; x < 260; x += 3) R.pset(x, 154, hex('#8a7a5a')); for (let y = 150; y < 159; y += 2) R.pset(243, y, hex('#8a7a5a'));
    R.rect(146, 166, 150, 179, K); R.rect(147, 166, 149, 179, hex('#e8486a')); R.poligono([[146, 179], [148, 176], [150, 179]], hex('#5a2a3a'));
    for (let y = 34; y < 168; y += 6) for (let x = 14; x < 268; x += 6) if (x < 134 || x > 144) R.pset(x, y, mez(hex('#f2e8d2'), hex('#c8b898'), 0.35));
    for (const [x, y] of [[7, 29], [267, 29], [7, 167], [267, 167]]) { R.rect(x, y, x + 6, y + 6, hex('#f0c040')); R.rect(x + 1, y + 1, x + 5, y + 5, hex('#c89a2a')); }
    // las ranuras vacías: las cuatro esquinitas de cada una
    for (const [x, y] of RAN) for (const [a, b, sx, sy] of [[x - 1, y - 1, 1, 1], [x + 50, y - 1, -1, 1], [x - 1, y + 52, 1, -1], [x + 50, y + 52, -1, -1]]) R.poligono([[a, b], [a + sx * 7, b], [a, b + sy * 7]], hex('#3a3a3a'));
    // la taza de chocolate, la cucharilla, el racimo y el confeti en el mantel
    R.disco(304, 120, 11, K); R.disco(304, 120, 10, hex('#f6f2e8')); R.disco(304, 120, 7, hex('#5a2e16')); R.disco(302, 118, 2, hex('#8a4e2a')); R.rect(294, 140, 316, 142, K); R.linea(296, 132, 314, 142, hex('#c8ccd8'));
    PZ.racimo(R, 302, 172, { s: 1 });
    for (let k = 0; k < 40; k++) { const x = Math.floor(hh(k, 1, 3) * 320), y = Math.floor(hh(k, 2, 3) * 180); if ((x > 14 && x < 292 && y > 22 && y < 174) || (x > 266 && y < 52)) continue; R.rect(x, y, x + 1, y, [hex('#e8486a'), hex('#f0c040'), hex('#4aa8e8'), hex('#8ae84a')][k % 4]); }
    // las tijeras y el bote de cola a la izquierda
    R.disco(8, 70, 6, K); R.disco(8, 70, 5, hex('#e8e0c8')); R.disco(8, 70, 3, hex('#f6f2e8')); R.rect(5, 60, 11, 64, K); R.rect(6, 61, 10, 63, hex('#c83a2a'));
    for (const d of [0, 4]) { R.linea(2 + d, 118, 12 + d, 150, K); } R.anillo(4, 114, 3, hex('#d83a2a')); R.anillo(11, 113, 3, hex('#d83a2a'));
    R.usar(prev);
  }
  R.copiar(BA);
};
const CAEN = [W(5.52), W(7.22), W(8.62), W(9.42), W(10.72), W(11.42)];
const p2 = (t) => {
  mantel();
  // el vapor de la taza
  for (let k = 0; k < 3; k++) { const f = (t * 0.6 + k / 3) % 1; R.pset(Math.round(302 + Math.sin(t * 3 + k) * 3), Math.round(110 - f * 22), mez(hex('#e8e0d8'), hex('#2e5a3a'), f)); R.pset(Math.round(303 + Math.sin(t * 3 + k + 1) * 3), Math.round(112 - f * 22), mez(hex('#e8e0d8'), hex('#2e5a3a'), f)); }
  // la luz de la vela que tiembla sobre las hojas
  const fl = Math.sin(t * 11) * Math.sin(t * 5.3);
  if (fl > 0.4) for (let y = 30; y < 166; y += 2) for (let x = 24 + (y % 4); x < 150; x += 4) R.pset(x, y, mez(R.pget(x, y), hex('#fff0c0'), 0.12));
  RAN.forEach(([x, y], k) => {
    const c = CAEN[k], u = tramo(t, c - 0.35, c);
    if (u <= 0) return;
    const e = 1 - (1 - u) * (1 - u), dy = Math.round((1 - e) * -14), so = Math.round(2 + (1 - e) * 7);
    for (let yy = y + so; yy <= y + 51 + so; yy++) for (let xx = x + so; xx <= x + 49 + so; xx++) if (xx > x + 49 || yy > y + 51 + dy || xx < x || yy < y + dy) R.pset(xx, yy, mez(R.pget(xx, yy), K, 0.35));
    ESTAMPAS[k](x, y + dy, t);
    if (u < 1 || t < c + 0.25) for (const [a, b] of [[-4, 4], [53, 6], [26, -5]]) destello(x + a, y + dy + b, hex('#fff0a0'));
  });
  // la estampa de las uvas brilla en «grapes»
  if (t > W(10.12) && t < W(10.7)) { const [x, y] = RAN[1]; for (let i = 0; i < 4; i++) destello(x + 10 + i * 10, y + 6 + (i % 2) * 30, BL); }
};

// 3 · el calendario de cerca: el chico sube al taburete y los meses vuelan
const p3 = (t) => {
  const GE = W(12.86), HOJA = W(13.3), VUELA = W(14.18), SIEMPRE = W(15.52);
  const sube = tramo(t, W(13.0), W(13.3)), hoja = tramo(t, HOJA, HOJA + 0.6);
  let mes = 12, h = hoja;
  if (t > VUELA) { const f = (t - VUELA) * 7 * (1 - tramo(t, SIEMPRE - 0.4, SIEMPRE)), n = Math.floor(f); mes = ((12 + n) % 12) + 1; h = Math.min(1, (f - n) * 1.6); if (t > SIEMPRE) { mes = 12; h = 0; } }
  else if (hoja >= 1) { mes = 1; h = 0; }
  const o = { encuadre: 'salon', camara: 'calendario', mes, hoja: h, dia: 31 };
  T.hoy(R, t, o);
  const an = tramo(t, P3 + 0.05, W(13.0)), x = Math.round(lerp(118, 190, an));
  const suelo = sube > 0 ? Math.round(lerp(168, 146, sube) - Math.sin(Math.PI * sube) * 6) : 168;
  R.actor(EL.chicoHoy, x, suelo, t, { dir: 1, anda: an > 0 && an < 1, dedo: t > HOJA - 0.2 && t < HOJA + 0.6, sorpresa: t > VUELA && t < SIEMPRE, sonrisa: t > SIEMPRE, brazos: t > SIEMPRE + 0.1 && t < SIEMPRE + 0.8 });
  // la niña mira desde abajo y aplaude cuando acaba
  R.actor(EL.chicaHoy, 238, 168, t, { dir: -1, habla: t > GE && t < GE + 0.8 && Math.sin(t * 9) > 0, sorpresa: t > VUELA + 0.2 && t < SIEMPRE, brazos: t > SIEMPRE && t < SIEMPRE + 0.7, sonrisa: t > SIEMPRE });
  T.hoyDelante(R, t, o);
  // las hojas que salen volando del calendario
  if (t > VUELA) for (let k = 0; k < 6; k++) { const f = ((t - VUELA) * 1.3 + k / 6) % 1; if (t - VUELA < k / 6 / 1.3) continue; const hx = Math.round(200 + f * 70 + Math.sin(t * 5 + k) * 6), hy = Math.round(60 + f * 90 + Math.sin(t * 3 + k * 2) * 8); if (hx > 270 && hy < 50) continue; R.rect(hx, hy, hx + 6, hy + 5, K); R.rect(hx + 1, hy + 1, hx + 5, hy + 4, hex('#f6f2e6')); R.rect(hx + 1, hy + 1, hx + 5, hy + 1, hex('#c8303a')); }
};

// 4 · la medianoche: la familia celebra junta
const p4 = (t) => {
  const NUESTRAS = W(17.97), IMPORTA = W(19.03), CON = W(21.13), PON = W(20.6);
  const o = { encuadre: 'medianoche', hora: 23.9, confeti: t < CON ? 0.3 : Math.min(1, 0.3 + (t - CON) * 1.5) };
  T.hoy(R, t, o);
  const fiesta = t > CON, bote = (k) => (fiesta ? Math.round(2 * Math.abs(Math.sin((t - CON) * 8 + k))) : 0);
  const alza = t > NUESTRAS - 0.2 && t < NUESTRAS + 1.4;
  R.actor(EL.abuela62, 104, 145, t, { dir: 1, sonrisa: true, habla: t > P4 + 0.2 && t < P4 + 1.2 && Math.sin(t * 8) > 0, brazos: fiesta, salto: bote(0) });
  const pa = R.actor(EL.padre62, 124, 145, t, { dir: 1, sostiene: alza ? [141, 124] : false, sonrisa: t > NUESTRAS, brazos: fiesta, salto: bote(1) });
  const ma = R.actor(EL.madre62, 172, 145, t, { dir: -1, sostiene: alza ? [168, 124] : false, sonrisa: t > NUESTRAS, habla: t > P4 + 1.2 && t < NUESTRAS - 0.3 && Math.sin(t * 8) > 0, brazos: fiesta, salto: bote(2) });
  R.actor(EL.chicaHoy, 148, 145, t, { dir: 1, sonrisa: true, sorpresa: t > IMPORTA + 0.4 && t < PON, brazos: fiesta, salto: bote(3) });
  const v = tramo(t, IMPORTA - 0.2, PON - 0.3), xc = Math.round(lerp(330, 196, v));
  const ch = R.actor(EL.chicoHoy, xc, 145, t, { dir: -1, anda: v > 0 && v < 1, sostiene: t < PON ? [xc - 3, 130] : false, sonrisa: true, brazos: fiesta, salto: bote(4) });
  T.hoyDelante(R, t, o);
  if (alza) { PZ.copa(R, pa.mano[0], pa.mano[1] + 2, {}); PZ.copa(R, ma.mano[0], ma.mano[1] + 2, {}); if (Math.abs(t - NUESTRAS) < 0.25) destello(155, 116, BL); }
  if (t < PON) { if (v > 0) PZ.pastel(R, ch.mano[0], ch.mano[1] + 6, { velas: 5, encendidas: 5, t }); }
  else PZ.pastel(R, 202, 148, { velas: 5, encendidas: 5, t });
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], {
  año: 2026,
  efectos: [[W(4.6), 'golpecito'], [W(5.52), 'sello'], [W(7.22), 'sello'], [W(9.42), 'sello'], [W(10.12), 'brillo'], [W(11.42), 'sello'], [W(13.35), 'papel'], [W(15.6), 'palmada'], [W(17.97), 'brillo'], [W(20.6), 'golpecito'], [W(21.2), 'palmada']],
});
''')

E['tr-cierre'] = ('El cierre', '''// TR-CIERRE (frase 24), 2026, sin cartela. Dos planos:
// 1. una fachada de noche con seis ventanas: en «what does your family do every year» se encienden una a una y cada
//    familia hace su tradición (uvas, pastel, calabaza, huevos, tarjeta, brindis); en «without knowing where it came
//    from» sale un «?» sobre cada ventana; por la calle pasa un señor y un coche por delante; nieva y hay fuegos;
//  2. corte en «Meanwhile»: la mesa de medianoche de cerca (gag 7): un haz de chispas baja de Atom («try to eat»), la uva
//    sube asustada («this grape»), se suelta en «again», cae a la mesa y se va corriendo; el reloj da las doce, confeti y
//    la familia lo celebra.''', COMUN + r'''
const P2 = W(5.92);

// 1 · la fachada
let BE = null;
const VEN = [[24, 48], [108, 48], [192, 48], [24, 102], [108, 102], [192, 102]];   // esquina de cada ventana (58 × 40)
const fachada = () => {
  if (!BE) {
    BE = R.nuevo(); const prev = R.usar(BE);
    const C1 = hex('#0e1230'), C2 = hex('#18204a'), C3 = hex('#26305e');
    for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const f = y / 60 + (hh(x, y) - 0.5) * 0.18; R.pset(x, y, f < 0.33 ? C1 : f < 0.66 ? C2 : C3); }
    for (let k = 0; k < 30; k++) { const x = Math.floor(hh(k, 4) * 320), y = Math.floor(hh(k, 5) * 28); if ((x > 270 && y < 46) || (x > 18 && x < 172 && y < 16)) continue; R.pset(x, y, hex('#d8e0f0')); }
    for (let k = 0; k < 6; k++) { const x = 30 + k * 40, y = 18 + (k % 3) * 3; R.pset(x, y, hex('#f0f4ff')); }
    // los tejados de al lado, en silueta, con ventanas
    R.rect(0, 50, 11, 160, hex('#141830')); R.rect(278, 60, 319, 160, hex('#141830')); R.rect(276, 56, 319, 60, hex('#0e1028'));
    for (const [x, y] of [[3, 70], [3, 100], [284, 76], [298, 76], [284, 108], [298, 108], [310, 108]]) { R.rect(x, y, x + 5, y + 8, hex('#3a3018')); R.rect(x + 1, y + 1, x + 4, y + 7, hex('#e8b84a')); }
    // la fachada de ladrillo
    const L0 = hex('#8a3a2a'), L1 = hex('#9e4a32'), L2 = hex('#6e2a1e'), JU = hex('#4a2a24');
    for (let y = 40; y < 158; y++) for (let x = 12; x < 273; x++) {
      const fila = Math.floor((y - 40) / 4), off = fila % 2 ? 4 : 0, junta = (y - 40) % 4 === 3 || (x + off) % 9 === 0;
      R.pset(x, y, junta ? JU : hh(Math.floor((x + off) / 9), fila, 2) > 0.7 ? L1 : hh(Math.floor((x + off) / 9), fila, 3) > 0.85 ? L2 : L0);
    }
    // la cornisa de piedra con dentículos y el zócalo
    R.rect(8, 30, 276, 40, K); R.rect(9, 31, 275, 35, hex('#b8b0a0')); R.rect(9, 36, 275, 39, hex('#8a8478')); for (let x = 12; x < 274; x += 6) R.rect(x, 37, x + 2, 39, hex('#5a564e'));
    R.rect(9, 30, 275, 31, hex('#e8eef6'));   // nieve en la cornisa
    R.rect(12, 148, 272, 158, hex('#8a8478')); R.rect(12, 148, 272, 149, hex('#b8b0a0')); for (let x = 12; x < 272; x += 23) R.rect(x, 146, x, 158, hex('#5a564e'));
    for (const x of [56, 140, 224]) { R.rect(x, 151, x + 12, 156, K); for (let i = x + 2; i < x + 12; i += 3) R.rect(i, 152, i, 155, hex('#3a3632')); }
    // los marcos de las ventanas: dintel, jambas y alféizar con nieve
    for (const [x, y] of VEN) { R.rect(x - 4, y - 6, x + 61, y - 1, K); R.rect(x - 3, y - 5, x + 60, y - 2, hex('#c8c0b0')); R.rect(x + 26, y - 6, x + 31, y - 1, hex('#e0d8c8')); R.rect(x - 2, y, x - 1, y + 40, hex('#d8d0c0')); R.rect(x + 58, y, x + 59, y + 40, hex('#d8d0c0')); R.rect(x - 5, y + 40, x + 62, y + 44, K); R.rect(x - 4, y + 41, x + 61, y + 43, hex('#b8b0a0')); R.rect(x - 4, y + 40, x + 61, y + 40, hex('#eef4fa')); }
    // la acera con losas y la calzada con nieve sucia
    R.rect(0, 158, 319, 168, hex('#7a7a84')); for (let x = 0; x < 320; x += 20) R.rect(x, 158, x, 168, hex('#5a5a64')); R.rect(0, 163, 319, 163, hex('#6a6a74'));
    R.rect(0, 168, 319, 170, hex('#b8b8c0')); R.rect(0, 171, 319, 179, hex('#3a3a46')); for (let x = 0; x < 320; x++) if (hh(x, 175) > 0.8) R.pset(x, 172 + Math.floor(hh(x, 1) * 7), hex('#8a8a98'));
    for (let x = 0; x < 320; x += 30) R.rect(x, 175, x + 12, 175, hex('#c8c8a0'));
    // la farola
    R.rect(299, 98, 301, 166, K); R.rect(300, 98, 300, 166, hex('#3a3a46')); R.rect(294, 88, 306, 98, K); R.rect(295, 89, 305, 97, hex('#f0d880')); R.rect(293, 86, 307, 88, K);
    R.usar(prev);
  }
  R.copiar(BE);
};
const PAREDES = ['#e8c870', '#f0b0c0', '#5a3a6a', '#b8e0a0', '#f0a0a8', '#a0c0e8'];
const CORTINAS = ['#a8283a', '#3a7aa8', '#e07a20', '#d8c040', '#8a2a6a', '#2a7a4a'];
const ESCENAS = [
  (x, y, t) => { R.disco(x + 48, y + 9, 5, K); R.disco(x + 48, y + 9, 4, hex('#f4ecd8')); R.linea(x + 48, y + 9, x + 48, y + 6, K); R.actor(EL.padre62, x + 6, y + 38, t, { dir: 1, habla: Math.sin(t * 12) > 0, sonrisa: Math.sin(t * 12) <= 0 }); R.actor(EL.nino62, x + 36, y + 38, t, { dir: -1, habla: Math.sin(t * 12 + 1) > 0 }); return () => { mesita(x, y); PZ.racimo(R, x + 29, y + 30, {}); }; },
  (x, y, t) => { R.actor(EL.madre62, x + 5, y + 38, t, { dir: 1, brazos: Math.sin(t * 9) > 0, sonrisa: true }); R.actor(EL.ninaDelantal, x + 37, y + 38, t, { dir: -1, sonrisa: true, salto: Math.round(Math.abs(Math.sin(t * 7)) * 2) }); return () => { mesita(x, y); PZ.pastel(R, x + 29, y + 30, { velas: 4, encendidas: 4, t }); }; },
  (x, y, t) => { R.actor(EL.brujita27, x + 5, y + 38, t, { dir: 1, sorpresa: Math.sin(t * 3) > 0, sonrisa: Math.sin(t * 3) <= 0 }); R.actor(EL.fantasma27, x + 37, y + 38 - Math.round(Math.abs(Math.sin(t * 4)) * 2), t, { dir: -1, brazos: true }); return () => { mesita(x, y); PZ.calabaza(R, x + 29, y + 30, { luz: 0.7 + 0.3 * Math.sin(t * 10), tallada: true }); }; },
  (x, y, t) => { R.actor(EL.ninaCampo, x + 6, y + 38, t, { dir: 1, dedo: Math.sin(t * 4) > 0, sonrisa: true }); R.actor(EL.ninoCampo, x + 36, y + 38, t, { dir: -1, sonrisa: true, habla: Math.sin(t * 7) > 0 }); return () => { mesita(x, y); PZ.cesta(R, x + 29, y + 30, { n: 4 }); }; },
  (x, y, t) => { const da = Math.sin(t * 2) > -0.2; const ch = R.actor(EL.chicoHoy, x + 9, y + 38, t, { dir: 1, sostiene: da ? [x + 28, y + 22] : false, sonrisa: true }); R.actor(EL.chicaHoy, x + 34, y + 38, t, { dir: -1, sorpresa: da && Math.sin(t * 2) < 0.4, sonrisa: true }); return () => { mesita(x, y); if (da) PZ.tarjeta(R, ch.mano[0], ch.mano[1] + 4, {}); if (Math.sin(t * 2) > 0.5) R.icono('corazon', x + 25, y + 3, hex('#e8486a'), hex('#7a1424'), 1); }; },
  (x, y, t) => { const ch = Math.sin(t * 2.5) > 0; const a = R.actor(EL.irlandes, x + 9, y + 38, t, { dir: 1, sostiene: [x + 26, y + ( ch ? 18 : 20)], sonrisa: true }); const b = R.actor(EL.irlandesa, x + 34, y + 38, t, { dir: -1, sostiene: [x + 31, y + (ch ? 18 : 20)], sonrisa: true }); return () => { mesita(x, y); PZ.copa(R, a.mano[0], a.mano[1] + 2, {}); PZ.copa(R, b.mano[0], b.mano[1] + 2, {}); if (ch && Math.sin(t * 2.5) < 0.3) destello(x + 29, y + 12); }; },
];
const mesita = (x, y) => { R.rect(x + 14, y + 30, x + 44, y + 33, K); R.rect(x + 15, y + 30, x + 43, y + 32, hex('#f6f0e4')); R.rect(x + 15, y + 33, x + 43, y + 39, hex('#e6dcc8')); for (let i = x + 16; i < x + 43; i += 4) R.pset(i, y + 38, hex('#c8b898')); };
const ventana = (k, t, luz) => {
  const [x, y] = VEN[k], r = [x, y, x + 57, y + 39];
  if (luz <= 0) {
    for (let j = y; j < y + 40; j++) R.rect(x, j, x + 57, j, mez(hex('#1a2040'), hex('#2a3460'), (j - y) / 40));
    R.rect(x + 4, y + 30, x + 50, y + 39, hex('#141a34'));
  } else {
    const pared = hex(PAREDES[k]);
    for (let j = y; j < y + 40; j++) for (let i = x; i < x + 58; i++) R.pset(i, j, (i - x) % 8 === 0 && (j - y) % 2 ? mez(pared, K, 0.12) : pared);
    R.rect(x + 18, y + 3, x + 30, y + 12, K); R.rect(x + 19, y + 4, x + 29, y + 11, mez(pared, hex('#3a6ab0'), 0.6));   // un cuadro
    R.rect(x + 28, y, x + 28, y + 4, K); R.disco(x + 28, y + 6, 3, hex('#fff0a0'));   // la lámpara
    R.recorte(r); const delante = ESCENAS[k](x, y, t); R.recorte(null); delante();
    if (luz < 1) for (let j = y; j < y + 40; j++) for (let i = x; i < x + 58; i++) if (hh(i, j, 6) > luz) R.pset(i, j, hex('#1a2040'));
  }
  // las cortinas recogidas
  const cc = hex(CORTINAS[k]); for (const [a, b] of [[x, x + 6], [x + 51, x + 57]]) { R.rect(a, y, b, y + 39, cc); for (let i = a + 1; i < b; i += 2) R.rect(i, y, i, y + 39, mez(cc, K, 0.3)); R.rect(a, y + 22, b, y + 23, hex('#f0c040')); }
  if (luz <= 0) R.rect(x + 7, y, x + 50, y + 39, mez(cc, K, 0.55));
  R.rect(x - 1, y + 39, x + 58, y + 39, hex('#d8d0c0'));
};
const p1 = (t) => {
  fachada();
  // fuegos lejanos por encima del tejado
  for (let k = 0; k < 3; k++) { const ph = (t * 0.55 + k * 0.37) % 1, cx = [60, 160, 240][k], cy = 18 + k * 2, c = [hex('#f0c040'), hex('#e8486a'), hex('#4ae8c8')][k]; if (ph < 0.6) { const r = ph * 18; for (let a = 0; a < 12; a++) { const ang = a * Math.PI / 6; const px = Math.round(cx + Math.cos(ang) * r), py = Math.round(cy + Math.sin(ang) * r * 0.7); if (py > 15 && py < 30 && px < 270) R.pset(px, py, ph > 0.45 ? mez(c, hex('#18204a'), 0.6) : c); } } }
  const ON = [W(2.18), W(2.56), W(2.88), W(3.14), W(3.48), W(3.84)];
  for (let k = 0; k < 6; k++) ventana(k, t, tramo(t, ON[k], ON[k] + 0.2));
  // los «?» de cada ventana
  const Q = [W(4.16), W(4.36), W(4.54), W(4.74), W(4.94), W(5.16)];
  for (let k = 0; k < 6; k++) {
    const q = tramo(t, Q[k], Q[k] + 0.2); if (q <= 0) continue;
    const [x, y] = VEN[k], bx = x + 22 + (k % 3 === 2 ? 0 : 0), by = y - 18 - (q < 1 ? Math.round((1 - q) * -4) : 0) + (q >= 1 ? Math.round(Math.sin(t * 4 + k) * 1) : 0);
    R.rect(bx - 1, by - 1, bx + 15, by + 12, K); R.rect(bx, by, bx + 14, by + 11, BL); R.poligono([[bx + 3, by + 11], [bx + 8, by + 11], [bx + 2, by + 16]], K); R.poligono([[bx + 4, by + 11], [bx + 7, by + 11], [bx + 4, by + 14]], BL);
    R.icono('?', bx + 4, by + 2, hex('#3a2a6a'), hex('#b8b0d8'), 1);
  }
  // la farola alumbra la acera
  for (let y = 100; y < 168; y++) for (let x = 284; x < 316; x++) { const d = Math.hypot((x - 300) * 1.4, y - 100) / 70; if (d < 1 && hh(x, y, Math.floor(t * 4)) > 0.55 + d * 0.4) R.pset(x, y, mez(R.pget(x, y), hex('#f0d880'), 0.2)); }
  // el señor que pasea por la acera
  const xs = Math.round(lerp(-16, 330, (t + 1.2) / 8)); R.actor(EL.erudito, xs, 166, t, { dir: 1, anda: true });
  // el coche que pasa por delante
  const xcar = Math.round(lerp(-50, 340, tramo(t, 0.3, 2.6)));
  if (xcar > -48 && xcar < 340) { R.rect(xcar, 168, xcar + 40, 176, K); R.rect(xcar + 1, 169, xcar + 39, 175, hex('#3a6ab0')); R.rect(xcar + 8, 162, xcar + 30, 169, K); R.rect(xcar + 9, 163, xcar + 18, 168, hex('#a8d0e8')); R.rect(xcar + 20, 163, xcar + 29, 168, hex('#a8d0e8')); R.rect(xcar + 1, 169, xcar + 39, 169, hex('#6a9ad8')); for (const w of [xcar + 8, xcar + 31]) { R.disco(w, 176, 3, K); R.disco(w, 176, 1, hex('#8a8a98')); } R.rect(xcar + 38, 170, xcar + 40, 172, hex('#fff0a0')); for (let i = 1; i < 18; i++) if (hh(i, Math.floor(t * 10)) > 0.4) R.pset(xcar + 40 + i, 170 + Math.round(i / 6), hex('#f0e0a0')); }
  // la nieve
  for (let k = 0; k < 50; k++) { const y = Math.round((hh(k, 1) * 190 + t * (12 + (k % 4) * 4)) % 190) - 5, x = Math.round((hh(k, 2) * 330 + Math.sin(t + k) * 5) % 330) - 5; if (x > 274 && y < 48) continue; if (x > 16 && x < 174 && y < 16) continue; R.pset(x, y, k % 3 ? hex('#eef4fa') : hex('#b8c8dc')); }
};

// 2 · la mesa a medianoche: el gag de la uva
const p2 = (t) => {
  const TRATA = W(6.64), COMER = W(7.42), UVA = W(7.88), OTRA = W(8.9), DOCE = OTRA + 0.5;
  const o = { encuadre: 'medianoche', camara: 'mesa', hora: 24 - DOCE / 3600, confeti: t < DOCE ? 0.15 : Math.min(1, 0.15 + (t - DOCE) * 2) };
  const g = T.hoy(R, t, o);
  const fiesta = t > DOCE, mira = t > TRATA;
  R.actor(EL.madre62, 85, 138, t, { dir: 1, sonrisa: !mira || fiesta, sorpresa: mira && !fiesta && t > UVA, brazos: fiesta, habla: t < TRATA && Math.sin(t * 8) > 0, salto: fiesta ? Math.round(2 * Math.abs(Math.sin(t * 8))) : 0 });
  R.actor(EL.padre62, 221, 138, t, { dir: -1, sonrisa: !mira || fiesta, sorpresa: mira && !fiesta && t > UVA, brazos: fiesta, salto: fiesta ? Math.round(2 * Math.abs(Math.sin(t * 8 + 1))) : 0 });
  T.hoyDelante(R, t, o);
  const [ux, uy] = g.uva ?? [167, 120];
  // el haz de chispas que baja de Atom
  const ATX = 286, ATY = 46;
  const haz = tramo(t, TRATA, TRATA + 0.6) * (1 - tramo(t, OTRA + 0.05, OTRA + 0.4));
  const sube = tramo(t, COMER, OTRA), es = sube * sube * (3 - 2 * sube);
  let gx = lerp(ux, 250, es), gy = lerp(uy + 8, 68, es) + Math.sin(t * 20) * (sube > 0 && sube < 1 ? 1 : 0);
  if (haz > 0) {
    const n = 26; for (let k = 0; k <= n; k++) { const f = k / n; if (f > haz) break; const x = lerp(ATX, gx, f) + Math.sin(t * 9 + k) * 2, y = lerp(ATY, gy - 8, f); R.pset(Math.round(x), Math.round(y), (k + Math.floor(t * 12)) % 3 ? hex('#7ae8ff') : BL); if (k % 5 === Math.floor(t * 10) % 5) destello(Math.round(x), Math.round(y), hex('#bff4ff')); }
  }
  // la uva: quieta, sube asustada, se suelta, cae y se va corriendo
  const cae = tramo(t, OTRA, OTRA + 0.45), corre = tramo(t, OTRA + 0.5, OTRA + 2.0);
  let cara = t < UVA ? 'normal' : 'susto', corriendo = sube > 0 && sube < 1;
  if (cae > 0) { gx = lerp(250, 214, cae); gy = lerp(68, 142, cae) - Math.sin(Math.PI * cae) * 14; corriendo = true; }
  if (corre > 0) { gx = lerp(214, -20, corre); gy = 142; cara = 'feliz'; corriendo = corre < 1; }
  if (sube > 0 && cae <= 0) for (let a = 0; a < 28; a++) { const g = a / 28 * Math.PI * 2 + t * 3, r = 13 + Math.sin(t * 10 + a) * 1.5; if (a % 2) R.pset(Math.round(gx + Math.cos(g) * r), Math.round(gy - 8 + Math.sin(g) * r), hex('#bff4ff')); }
  if (gx > -15) T.uva(R, Math.round(gx), Math.round(gy), t, { cara, corre: corriendo });
  if (sube > 0.1 && cae <= 0 && Math.floor(t * 6) % 2) R.icono('!', Math.round(gx) + 8, Math.round(gy) - 30, BL, K, 1);
  if (cae >= 1 && corre < 0.15) for (const [a, b] of [[-9, -2], [9, -3]]) destello(Math.round(gx) + a, Math.round(gy) + b, hex('#e0c8f0'));
};

T.rodar(E, R, [[0, p1], [P2, p2]], {
  año: 2026,
  efectos: [[0.5, 'coche'], [W(2.18), 'interruptor'], [W(4.16), 'pop'], [W(4.94), 'pop'], [W(6.7), 'brillo'], [W(7.42), 'whoosh'], [W(8.9), 'boing'], [W(8.9) + 0.5, 'campana'], [W(8.9) + 0.9, 'palmada']],
});
''')

for _k in list(E):
    _t, _c, _b = E[_k]
    E[_k] = (_t, _c, W(_k, _b))
