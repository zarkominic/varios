E = {}

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['at-perdidas'] = ('Pérdidas', '''// AT-PERDIDAS (frase 13), 1983 → 1984. Cuatro planos:
// 1. la sala de juntas: la gráfica se desploma mientras la voz dice «lost hundreds of millions» y la cifra roja cuenta
//    hasta −536 («1983»); el ejecutivo de pie la señala; los consejeros se giran a mirarla, se asustan y a «alone» uno
//    hunde la cabeza; por la ventana, la ciudad con su helicóptero;
// 2. las oficinas: el dueño (traje azul) espera junto al cartel de venta (una flecha y una llave); entra el comprador,
//    se dan la mano y a «selling» el dueño le entrega la llave dorada; a «following year» la barra pasa a 1984 y el
//    comprador levanta la llave; detrás, un ejecutivo mira con pena por encima de su mesa y el oficinista cruza;
// 3. el quiosco de la calle: en la juguetería de enfrente el dependiente pega una X roja en el escaparate («stores»);
//    el quiosquero cuelga una revista con una lápida y un joystick («declared … dead»); un señor coge el periódico, lo
//    lee y se lleva un disgusto; una paloma picotea y sale volando; nubes y pájaros;
// 4. el inserto: la mano del quiosquero deja en el mostrador la revista del hula hoop; en la portada el aro rueda,
//    tumba al joystick («passing fad») y a «hula hoop» se sale de la portada, rueda por el mostrador, baila y cae.''', r'''
const A = (f) => en('perdidas', f);
const P2 = A(0.326), P3 = A(0.611), P4 = A(0.858);
const pierde = A(0.021), cientos = A(0.058), ano83 = A(0.191), solo = A(0.245);
const vende = A(0.409), consola = A(0.445), siguiente = A(0.526);
const tiendasW = A(0.644), prensa = A(0.707), declara = A(0.726), muerto = A(0.806);
const pasajera = A(0.858), moda = A(0.887), hula = A(0.951);
const H = hex, PZ = T.PIEZAS_AT;
const ru = (x, y, k = 0) => R.hash2(x + k * 101, y + k * 37);
const tono = (cols, v, x, y) => R.tone(cols.map(H), v, x, y);
const parp = (t, v = 7) => Math.sin(t * v) > 0;
// un búfer para lo que no se mueve de un fondo local (R.usar(prev), nunca R.usar() a secas)
const fijo = (dib) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); dib(); R.usar(prev); } R.copiar(b); }; };
// la llave dorada (en la mano: x, y es el puño)
const llave = (x, y, d = 1) => {
  const cx = x + 4 * d, a = Math.min(x + 7 * d, x + 17 * d), b = Math.max(x + 7 * d, x + 17 * d);
  R.rect(a, y - 2, b, y + 1, T.C.k); R.rect(a, y - 1, b, y, H('#f0c040')); R.rect(a, y - 1, b, y - 1, H('#fff0a0'));
  for (const k of [13, 16]) { R.rect(x + k * d - 1, y + 1, x + k * d + 1, y + 4, T.C.k); R.pset(x + k * d, y + 2, H('#e8b830')); R.pset(x + k * d, y + 3, H('#e8b830')); }
  R.disco(cx, y - 1, 4.4, T.C.k); R.disco(cx, y - 1, 3.4, H('#f0c040')); R.disco(cx, y - 1, 1.4, T.C.k); R.pset(cx - 2, y - 3, H('#fff0a0'));
};

// ── 1 · la sala de juntas: la gráfica se desploma ──
const p1 = (t) => {
  const g = tramo(t, pierde, ano83 + 0.2), n = Math.round(536 * tramo(t, cientos, ano83));
  const o = { encuadre: 'juntas', grafica: 0.3 + 0.7 * g, cifra: t > cientos ? '-' + n : null, sillas: [46, 92, 138, 232] };
  T.atari(R, t, o);
  const susto = (k) => t > ano83 + k * 0.15 && t < ano83 + 1.1 + k * 0.15;
  R.actor(EL.ejecutivoAtari, 39, 150, t, { dir: t > pierde + 0.3 ? 1 : -1, sorpresa: susto(0), triste: t > solo, habla: t < pierde && parp(t, 8) });
  R.actor(EL.ejecutivoAtari2, 85, 150 + (t > solo ? Math.round(3 * tramo(t, solo, solo + 0.5)) : 0), t, { dir: 1, sorpresa: susto(1), triste: t > solo });
  R.actor(EL.ejecutivo2, 131, 150, t, { dir: t > pierde + 0.6 ? 1 : -1, sorpresa: susto(2), dedo: t > solo + 0.3 && t < solo + 1.0, habla: t > solo + 0.3 && t < solo + 1.0 && parp(t, 8) });
  R.actor(EL.oficinista2, 225, 150, t, { dir: -1, sorpresa: susto(1), triste: t > solo + 0.2 });
  // el ejecutivo de pie, delante de la puerta: señala la gráfica que cae y luego niega con la cabeza
  const w = tramo(t, 0.1, pierde);
  R.actor(EL.ejecutivoWarner, Math.round(lerp(300, 266, w)), 150, t, { dir: -1, anda: w > 0 && w < 1, dedo: t > pierde && t < ano83 + 0.4, habla: t > pierde && t < ano83 && parp(t, 7), triste: t > solo });
  T.atariDelante(R, t, o);
};

// ── 2 · las oficinas: venden la parte de las consolas ──
const cartelVenta = (x, y, t) => {   // el cartel de venta en su caballete: una flecha que sale y una llave, sin letras
  const sw = Math.round(Math.sin(t * 2.2) * 0.6);
  R.linea(x + 2, y + 24, x + 6, y - 2, T.C.k); R.linea(x + 26, y + 24, x + 22, y - 2, T.C.k); R.linea(x + 3, y + 24, x + 7, y - 2, H('#8a5a2a')); R.linea(x + 25, y + 24, x + 21, y - 2, H('#8a5a2a'));
  R.rect(x, y - 18 + sw, x + 28, y + 2 + sw, T.C.k); R.rect(x + 1, y - 17 + sw, x + 27, y + 1 + sw, H('#f4ecd8')); R.rect(x + 1, y - 17 + sw, x + 27, y - 15 + sw, H('#c83a2a'));
  for (let i = 0; i < 26; i += 3) R.pset(x + 1 + i, y + 1 + sw, H('#d8ccb0'));
  // la flecha hacia fuera (derecha) y la llave
  R.rect(x + 4, y - 9 + sw, x + 14, y - 7 + sw, H('#c83a2a')); R.poligono([[x + 14, y - 12 + sw], [x + 19, y - 8 + sw], [x + 14, y - 4 + sw]], H('#c83a2a'));
  R.disco(x + 22, y - 3 + sw, 2.4, H('#c8961e')); R.pset(x + 22, y - 3 + sw, H('#f4ecd8')); R.rect(x + 22, y - 1 + sw, x + 22, y - 0 + sw, H('#c8961e'));
  R.rect(x + 4, y - 3 + sw, x + 16, y - 3 + sw, H('#a89880'));
};
const p2 = (t) => {
  const o = { encuadre: 'oficinas' };
  T.atari(R, t, o);
  cartelVenta(186, 136, t);
  // un mozo se lleva en su carretilla de mano las cajas de las consolas (la parte que se vende)
  const mz = tramo(t, P2 + 0.3, P3 + 0.2), mx = Math.round(lerp(70, 330, mz));
  R.actor(EL.operario, mx, 134, t, { dir: 1, anda: mz > 0 && mz < 1, sostiene: [mx + 20, 120] });
  R.linea(mx + 20, 120, mx + 24, 133, T.C.k); R.rect(mx + 20, 132, mx + 34, 133, T.C.k); R.disco(mx + 23, 134, 1.6, T.C.k);
  for (let k = 0; k < 3; k++) { const by = 132 - (k + 1) * 9; R.rect(mx + 22, by, mx + 34, by + 8, T.C.k); R.rect(mx + 23, by + 1, mx + 33, by + 7, H(k % 2 ? '#b8905a' : '#c8a06a')); R.rect(mx + 24, by + 3, mx + 32, by + 5, H('#5a3a1a')); R.rect(mx + 25, by + 4, mx + 31, by + 4, H('#1a1a1e')); }
  // el comprador entra por la izquierda, por detrás de la mesa, y se planta delante del dueño
  const e = tramo(t, P2 + 0.05, vende - 0.25), cx = Math.round(lerp(60, 128, e));
  const da = tramo(t, vende - 0.1, consola + 0.1), tiene = t > consola + 0.1, alza = t > siguiente - 0.1;
  const mano1 = R.actor(EL.ejecutivoWarner, 150, 150, t, { dir: -1, sostiene: !tiene ? [Math.round(lerp(158, 147, da)), 136] : false, dedo: t < vende - 0.4 && t > P2 + 0.8, habla: t > P2 + 0.9 && t < vende - 0.3 && parp(t, 7), sonrisa: t > siguiente, triste: tiene && t < siguiente });
  const mano2 = R.actor(EL.comprador, cx, 150, t, { dir: 1, anda: e > 0 && e < 1, sostiene: tiene ? (alza ? [cx + 15, 120] : [cx + 18, 134]) : da > 0.2 ? [cx + 20, 136] : false, brazos: false, sonrisa: tiene, habla: t > vende - 0.6 && t < vende - 0.1 && parp(t, 8) });
  if (!tiene) { const [hx, hy] = mano1.mano; llave(hx - 1, hy, -1); } else { const [hx, hy] = mano2.mano; llave(hx + 1, hy, 1); if (alza && Math.floor(t * 6) % 2) { R.pset(hx + 6, hy - 6, T.C.blanco); R.pset(hx + 5, hy - 7, H('#fff0a0')); R.pset(hx + 7, hy - 7, H('#fff0a0')); } }
  // detrás de la mesa de la derecha un ejecutivo mira la venta con pena
  R.actor(EL.ejecutivoAtari, 262, 150, t, { dir: -1, sorpresa: t > vende && t < vende + 0.9, triste: t > vende + 0.9 });
  T.atariDelante(R, t, o);
};

// ── 3 · el quiosco: la prensa los da por muertos ──
const cieloQ = (x, y) => tono(['#7ab8e8', '#8cc4ec', '#a2d0f0', '#b8dcf4'], 3.4 - y / 18, x, y);
// lo fijo con huecos (lo que no se pinta deja ver lo de detrás: el cielo con sus nubes)
const capa = (dib) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); dib(); R.usar(prev); } const B = R.buf; for (let i = 0; i < B.length; i++) if (b[i]) B[i] = b[i]; }; };
const cieloFijo = fijo(() => { for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) R.pset(x, y, cieloQ(x, y)); });
const fondoQ = capa(() => {
  const { rect, pset, linea } = R;
  // la ciudad lejana, azulada, con ventanas
  const torres = [[0, 30, 30], [26, 16, 22], [44, 40, 26], [66, 22, 18], [80, 8, 26], [104, 34, 20], [120, 20, 30], [148, 44, 22], [166, 26, 24], [186, 12, 20], [204, 30, 26], [228, 38, 22], [248, 50, 30]];
  for (const [x0, y0, w] of torres) { rect(x0, y0 + 14, x0 + w, 72, H('#8aa0bc')); rect(x0, y0 + 14, x0 + 1, 72, H('#a4b8d0')); for (let y = y0 + 18; y < 70; y += 5) for (let x = x0 + 3; x < x0 + w - 2; x += 4) pset(x, y, ru(x, y) > 0.6 ? H('#d8e4f0') : H('#6a809c')); }
  rect(80, 8, 82, 22, H('#6a809c'));
  // el edificio de piedra de la izquierda, con ventanas de guillotina y una cornisa; el callejón entre el quiosco y la tienda
  for (let y = 34; y < 141; y++) for (let x = 0; x < 34; x++) pset(x, y, (y - 34) % 8 === 7 ? H('#8a7a62') : tono(['#b8a682', '#c4b28e', '#d0be9a'], 1 + ru(x >> 1, y >> 1) * 1.5, x, y));
  rect(0, 32, 35, 35, H('#7a6a52')); rect(0, 36, 35, 36, H('#e0d0ac'));
  for (const [wx, wy] of [[4, 44], [19, 44], [4, 78], [19, 78]]) { rect(wx, wy, wx + 11, wy + 22, H('#4a3a2a')); rect(wx + 1, wy + 1, wx + 10, wy + 21, H('#5a7aa0')); rect(wx + 1, wy + 11, wx + 10, wy + 11, H('#4a3a2a')); rect(wx + 1, wy + 1, wx + 4, wy + 6, H('#9ab8d8')); rect(wx - 1, wy + 23, wx + 12, wy + 24, H('#e0d0ac')); }
  rect(4, 110, 30, 140, H('#3a2a1e')); rect(6, 112, 28, 140, H('#6a4a2e')); rect(16, 112, 17, 140, H('#3a2a1e')); R.disco(14, 126, 1, H('#e8c040')); R.disco(19, 126, 1, H('#e8c040')); rect(2, 106, 32, 109, H('#7a6a52'));
  for (let y = 46; y < 141; y++) for (let x = 180; x < 188; x++) pset(x, y, tono(['#4a4448', '#5a5458', '#6a6468'], 1 + ru(x, y >> 2) * 1.4, x, y));
  rect(181, 92, 187, 118, H('#3a5a3a')); rect(182, 93, 186, 117, H('#4a6a4a')); for (let y = 95; y < 117; y += 3) rect(182, y, 186, y, H('#3a5a3a'));
  rect(183, 50, 184, 140, H('#2a2a2e')); R.disco(184, 50, 2, H('#2a2a2e'));
  // la juguetería de enfrente (derecha): ladrillo, toldo de rayas y el escaparate (lo de dentro se pinta en cada fotograma)
  for (let y = 46; y < 142; y++) for (let x = 188; x < 320; x++) { const by = (y - 46) % 6, bx = (x + ((Math.floor((y - 46) / 6) % 2) * 5)) % 10; pset(x, y, by === 5 || bx === 9 ? H('#7a3a2a') : tono(['#9a4a32', '#a85238', '#b85e40'], 1 + ru(x >> 2, y >> 2) * 1.6, x, y)); }
  rect(188, 46, 192, 141, H('#6a3022'));
  for (let x = 196; x < 320; x++) for (let y = 56; y < 66; y++) pset(x, y, Math.floor((x - 196) / 8) % 2 ? H('#f4ecd8') : H('#d83a3a'));
  for (let x = 196; x < 320; x += 8) { rect(x, 66, x + 3, 68, H('#d83a3a')); rect(x + 4, 66, x + 7, 67, H('#f4ecd8')); }
  rect(196, 55, 319, 55, T.C.k);
  rect(204, 72, 306, 74, H('#3a2a20')); rect(204, 72, 206, 132, H('#3a2a20')); rect(304, 72, 306, 132, H('#3a2a20')); rect(204, 130, 306, 134, H('#5a4030'));
  rect(196, 134, 319, 141, H('#8a8a86')); for (let x = 196; x < 320; x += 6) pset(x, 137, H('#6a6a66'));
  // el quiosco (izquierda): tejado verde, toldo festoneado, paneles de revistas y la ventanilla
  rect(36, 36, 180, 40, T.C.k); rect(38, 37, 178, 39, H('#2a7a4a'));
  for (let x = 32; x < 186; x++) { const y0 = 41, y1 = 52 + (Math.abs(((x - 32) % 12) - 6) < 3 ? 2 : 0); for (let y = y0; y <= y1; y++) pset(x, y, Math.floor((x - 32) / 6) % 2 ? H('#f4ecd8') : H('#2a8a52')); pset(x, y1 + 1, H('#1a4a2a')); }
  rect(40, 54, 176, 140, H('#1e5a36')); rect(40, 54, 41, 140, H('#2e7a4a'));
  const revistas = ['#e85a3a', '#3a8ae8', '#f0c040', '#e84a9a', '#5ab85a', '#8a5ae8', '#f08a2a', '#3ac8c8', '#d83a3a', '#e8e0c8'];
  let k = 0;
  for (const [x0, x1] of [[44, 84], [134, 174]]) for (const y0 of [58, 82]) {
    linea(x0, y0 - 1, x1, y0 - 1, H('#c8c8c0'));
    for (let x = x0; x + 11 <= x1; x += 13) {
      const c = revistas[k++ % revistas.length]; rect(x, y0, x + 11, y0 + 18, T.C.k); rect(x + 1, y0 + 1, x + 10, y0 + 17, H(c)); rect(x + 1, y0 + 1, x + 10, y0 + 4, H(k % 3 ? '#f4f0e0' : '#1a1a1e'));
      rect(x + 3, y0 + 2, x + 8, y0 + 2, H(k % 3 ? '#c83a2a' : '#f0c040'));
      if (k % 4 === 0) R.disco(x + 5, y0 + 11, 3, H('#f4f0e0')); else if (k % 4 === 1) rect(x + 3, y0 + 8, x + 8, y0 + 14, H('#1a1a1e')); else if (k % 4 === 2) { R.disco(x + 5, y0 + 10, 2, H('#f6c290')); rect(x + 3, y0 + 13, x + 8, y0 + 16, H('#3a5aa8')); } else rect(x + 2, y0 + 12, x + 9, y0 + 13, H('#f4f0e0'));
      pset(x + 5, y0 - 1, H('#9a9a9a'));
    }
  }
  // la ventanilla: dentro oscuro con estantes de chicles y caramelos
  rect(86, 56, 132, 110, H('#2a2018')); for (let y = 60; y < 108; y += 9) { rect(88, y, 130, y, H('#4a3a2a')); for (let x = 89; x < 130; x += 3) pset(x, y - 1, H(revistas[(x + y) % revistas.length])); }
  rect(84, 54, 85, 112, T.C.k); rect(133, 54, 134, 112, T.C.k);
  // la radio de la repisa
  rect(118, 96, 130, 104, T.C.k); rect(119, 97, 129, 103, H('#c8a060')); R.disco(122, 100, 2, H('#3a2a1a')); rect(125, 98, 128, 99, H('#3a2a1a')); linea(129, 96, 133, 88, H('#9a9a9a'));
  // los montones de periódicos bajo la repisa: rayas negras de titular, sin letras, y una foto
  for (const [x0, x1] of [[44, 82], [88, 128], [136, 174]]) {
    rect(x0, 116, x1, 138, H('#d8d4c8')); for (let y = 117; y < 138; y += 3) rect(x0, y, x1, y, H('#b8b4a8'));
    rect(x0 + 2, 118, x1 - 2, 121, H('#1a1a1e')); for (let y = 124; y < 136; y += 2) for (let x = x0 + 2; x < x1 - 14; x += 1) if (ru(x, y) > 0.35) pset(x, y, H('#7a7670'));
    rect(x1 - 12, 124, x1 - 3, 132, H('#5a5650')); rect(x0, 138, x1, 140, H('#9a968c'));
  }
  // la acera: losas, chicles, una alcantarilla; el bordillo y la calzada
  for (let y = 140; y < 168; y++) for (let x = 0; x < 320; x++) { const j = (x + (y > 154 ? 14 : 0)) % 28 === 0 || y === 154; pset(x, y, j ? H('#8a8a84') : tono(['#a8a69e', '#b4b2aa', '#c0beb6'], 1.2 + ru(x >> 1, y) * 1.4 + (y - 140) / 40, x, y)); }
  for (const [x, y] of [[20, 160], [96, 158], [150, 162], [244, 150], [282, 164]]) { pset(x, y, H('#6a6a64')); pset(x + 1, y, H('#7a7a74')); }
  rect(0, 168, 319, 170, H('#d8d6ce')); rect(0, 171, 319, 171, H('#6a6a64'));
  for (let y = 172; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(['#3a3a40', '#46464c', '#525258'], 1 + ru(x, y) * 1.5, x, y));
  for (let x = 6; x < 320; x += 30) rect(x, 177, x + 14, 177, H('#e8c840'));
  // la papelera y la boca de riego
  rect(14, 124, 28, 152, T.C.k); rect(15, 125, 27, 151, H('#3a6a4a')); for (let y = 128; y < 150; y += 4) rect(15, y, 27, y, H('#2a5a3a')); rect(13, 122, 29, 125, H('#2a4a3a'));
  rect(296, 140, 304, 160, T.C.k); rect(297, 141, 303, 159, H('#c83a2a')); rect(294, 144, 306, 147, H('#a82a1a')); rect(297, 141, 303, 142, H('#e85a4a'));
});
const nubeQ = (cx, cy, s, t0) => { const c = ['#eef6fc', '#d8e8f4', '#b8cce0']; for (let k = 2; k >= 0; k--) for (const [dx, dy, r] of [[-8, 2, 5], [0, 0, 7], [9, 1, 6], [15, 3, 4]]) R.disco(cx + dx * s, cy + dy * s + k, r * s - k * 0.6, H(c[2 - k])); };
const p3 = (t) => {
  cieloFijo();
  R.recorte([0, 16, 268, 70]); for (let k = 0; k < 3; k++) { const v = [3, 5, 8][k], x = ((t * v + k * 97) % 320) - 40; nubeQ(Math.round(x), [24, 34, 28][k], [0.7, 1, 0.8][k]); } R.recorte(null);
  fondoQ();
  R.recorte([0, 16, 268, 46]); for (let k = 0; k < 2; k++) { const x = ((t * 16 + k * 150) % 260) - 20, y = 28 + k * 8 + Math.sin(t * 3 + k) * 2, a = Math.floor(t * 6 + k) % 2; R.linea(x - 2, y - a, x, y, T.C.k); R.linea(x, y, x + 2, y - a, T.C.k); } R.recorte(null);
  // dentro de la juguetería de enfrente: cajas en gradas y el dependiente pega una X roja en el cristal («stores»)
  R.recorte([207, 75, 303, 129]);
  for (let y = 75; y <= 129; y++) R.linea(207, y, 303, y, R.tone([H('#3a3040'), H('#4a4050'), H('#5a5060')], 1 + (y - 75) / 30, 0, y));
  for (let i = 0; i < 6; i++) { PZ.cajaCartucho(R, 222 + i * 14, 128, { color: ['rojo', 'azul', 'verde', 'naranja', 'morado', 'amarillo'][i] }); }
  for (let i = 0; i < 4; i++) PZ.cajaCartucho(R, 229 + i * 14, 108, { color: ['gris', 'rosa', 'turquesa', 'rojo'][i] });
  const dx = Math.round(lerp(290, 262, tramo(t, P3 + 0.1, tiendasW - 0.1)));
  R.actor(EL.dependiente, dx, 132, t, { dir: -1, anda: t > P3 + 0.1 && t < tiendasW - 0.1, dedo: t > tiendasW - 0.1 && t < tiendasW + 0.6, sorpresa: t > muerto && t < muerto + 0.8 });
  R.recorte(null);
  const xa = tramo(t, tiendasW - 0.05, tiendasW + 0.35);
  if (xa > 0) { const cx = 240, cy = 96, r = Math.round(8 * xa); for (let k = -r; k <= r; k++) for (const e of [0, 1]) { R.pset(cx + k + e, cy + k, H('#e82a2a')); R.pset(cx + k + e, cy - k, H('#e82a2a')); R.pset(cx + k + e + 1, cy + k, H('#a81a1a')); R.pset(cx + k + e + 1, cy - k, H('#a81a1a')); } }
  // reflejo del cristal
  for (let k = 0; k < 3; k++) R.linea(214 + k * 30, 128, 230 + k * 30, 78, H('#9a90a8'));
  // el quiosquero, dentro de la ventanilla: cuelga la revista nueva («declared»)
  const sube = tramo(t, prensa - 0.2, declara + 0.2), colgada = t > declara + 0.25;
  const q = R.actor(EL.periodista, 100, 122, t, { dir: 1, sostiene: !colgada && t > prensa - 0.3 ? [Math.round(lerp(114, 118, sube)), Math.round(lerp(108, 90, sube))] : false, habla: colgada && t < muerto && parp(t, 8), sonrisa: t < prensa - 0.3 });
  R.rect(84, 108, 134, 112, T.C.k); R.rect(85, 109, 133, 111, H('#2e7a4a'));   // la repisa, por delante de él
  // la revista de la lápida: negra, con la lápida gris y el joystick encima (sin letras)
  const rev = (x, y) => { R.rect(x, y, x + 15, y + 20, T.C.k); R.rect(x + 1, y + 1, x + 14, y + 19, H('#26262c')); R.rect(x + 1, y + 1, x + 14, y + 4, H('#c83a2a')); R.rect(x + 3, y + 2, x + 12, y + 2, H('#f4ecd8'));
    R.disco(x + 8, y + 11, 4, H('#9a9aa4')); R.rect(x + 4, y + 11, x + 12, y + 18, H('#9a9aa4')); R.rect(x + 4, y + 11, x + 4, y + 18, H('#c8c8d0')); R.rect(x + 6, y + 10, x + 10, y + 10, H('#5a5a64')); R.rect(x + 8, y + 9, x + 8, y + 13, H('#5a5a64')); R.rect(x + 6, y + 11, x + 10, y + 11, H('#5a5a64'));
    R.rect(x + 2, y + 18, x + 13, y + 19, H('#4a7a3a')); };
  if (colgada) { R.linea(102, 57, 132, 57, H('#c8c8c0')); const sw = Math.round(Math.sin((t - declara) * 7) * 1.5 * Math.exp(-(t - declara) * 1.5)); rev(110 + sw, 58); R.pset(117, 57, H('#9a9a9a')); }
  else if (t > prensa - 0.3) { const [hx, hy] = q.mano; rev(hx - 7, hy - 18); }
  // el señor que pasa, coge el periódico, lo lee y se lleva un disgusto
  const e = tramo(t, P3 + 0.05, tiendasW + 0.8), sx = Math.round(lerp(330, 150, e)), lee = t > tiendasW + 1.0;
  const s = R.actor(EL.senor30, sx, 156, t, { dir: lee ? 1 : -1, anda: e > 0 && e < 1, sostiene: lee ? [sx + 18, 136] : false, sorpresa: t > muerto - 0.1 && t < muerto + 0.7, triste: t > muerto + 0.7 });
  if (lee) { const [hx, hy] = s.mano; R.rect(hx - 1, hy - 12, hx + 9, hy + 2, T.C.k); R.rect(hx, hy - 11, hx + 8, hy + 1, H('#e8e4d8')); R.rect(hx + 1, hy - 10, hx + 7, hy - 8, H('#1a1a1e')); for (let y = hy - 6; y < hy; y += 2) R.rect(hx + 1, y, hx + 7, y, H('#8a8680'));
    if (t > muerto && t < muerto + 0.9) R.icono('!', sx + 6, 122, H('#f0c040'), T.C.k); }
  // una señora con su bolsa cruza por la acera de atrás
  const v = tramo(t, P3 + 0.6, P4 + 0.3), vx = Math.round(lerp(-20, 200, v));
  R.actor(EL.senora30, vx, 146, t, { dir: 1, anda: v > 0 && v < 1 });
  // la paloma: picotea y sale volando cuando llega el señor
  const vuela = tramo(t, tiendasW + 0.2, tiendasW + 1.6), px = Math.round(lerp(196, 240, vuela)), py = Math.round(lerp(162, 110, vuela));
  if (vuela <= 0) { const pic = Math.floor(t * 3) % 3 === 0 ? 1 : 0; R.rect(px, py - 3, px + 5, py, H('#7a7a8a')); R.rect(px + 5, py - 5 + pic, px + 7, py - 3 + pic, H('#6a6a7a')); R.pset(px + 8, py - 4 + pic, H('#e8a040')); R.pset(px + 2, py + 1, H('#e8a040')); R.pset(px + 4, py + 1, H('#e8a040')); R.pset(px + 1, py - 2, H('#9a9aaa')); }
  else if (vuela < 1) { const a = Math.floor(t * 10) % 2; R.rect(px, py - 2, px + 5, py, H('#7a7a8a')); R.linea(px + 1, py - 1, px - 2, py - 4 - a * 2, H('#5a5a6a')); R.linea(px + 4, py - 1, px + 7, py - 4 - a * 2, H('#5a5a6a')); }
  // el paquete de periódicos atado, recién dejado junto al quiosco
  R.rect(60, 146, 84, 156, T.C.k); R.rect(61, 147, 83, 155, H('#d8d4c8')); for (let y = 148; y < 155; y += 2) R.rect(61, y, 83, y, H('#b8b4a8')); R.rect(71, 146, 72, 156, H('#8a6a3a')); R.rect(60, 150, 84, 150, H('#8a6a3a'));
  // un taxi de 1983 pasa por delante, por la calzada
  const tx = Math.round(lerp(-70, 340, tramo(t, declara - 0.5, muerto + 0.9)));
  if (tx > -70 && tx < 340) { R.rect(tx, 162, tx + 52, 176, T.C.k); R.rect(tx + 1, 163, tx + 51, 175, H('#e8b818')); R.rect(tx + 12, 154, tx + 38, 163, T.C.k); R.rect(tx + 13, 155, tx + 37, 162, H('#e8b818')); R.rect(tx + 15, 156, tx + 24, 161, H('#7ab0d8')); R.rect(tx + 26, 156, tx + 35, 161, H('#7ab0d8')); R.rect(tx + 22, 151, tx + 28, 154, H('#f4f0e0'));
    R.rect(tx + 1, 168, tx + 51, 168, H('#1a1a1e')); for (let i = 3; i < 50; i += 6) R.rect(tx + i, 169, tx + i + 2, 170, i % 12 ? T.C.k : H('#f4f0e0')); R.rect(tx + 49, 165, tx + 51, 167, H('#fff0a0'));
    for (const wx of [tx + 10, tx + 42]) { R.disco(wx, 177, 4, T.C.k); R.disco(wx, 177, 2, H('#8a8a8a')); } }
};

// ── 4 · el inserto: la revista del hula hoop ──
const fondoI = fijo(() => {
  const { rect, pset } = R;
  // la pared del quiosco por dentro: tablas verdes con vetas, y arriba a la derecha la ventanita con cielo
  for (let y = 0; y < 124; y++) for (let x = 0; x < 320; x++) pset(x, y, x % 24 === 0 ? H('#123a22') : tono(['#1a4a2c', '#205634', '#26623c'], 1.2 + R.vnoise(x * 0.08, y * 0.6) * 1.2, x, y));
  for (let y = 0; y < 60; y++) for (let x = 272; x < 320; x++) pset(x, y, cieloQ(x, y + 20));
  rect(270, 0, 272, 62, T.C.k); rect(270, 60, 319, 62, T.C.k); rect(271, 59, 319, 59, H('#3a7a52'));
  // el expositor de revistas: tres filas con alambres y pinzas, portadas sin letras
  const revistas = ['#e85a3a', '#3a8ae8', '#f0c040', '#e84a9a', '#5ab85a', '#8a5ae8', '#f08a2a', '#3ac8c8', '#d83a3a', '#e8e0c8', '#4a4a8a'];
  let k = 0;
  for (const y0 of [20, 60]) {
    rect(4, y0 - 2, 266, y0 - 2, H('#b8b8b0'));
    for (let x = 6; x + 22 <= 266; x += 26) {
      const c = revistas[k++ % revistas.length], tipo = k % 5;
      rect(x, y0, x + 22, y0 + 32, T.C.k); rect(x + 1, y0 + 1, x + 21, y0 + 31, H(c)); rect(x + 1, y0 + 1, x + 21, y0 + 7, H(tipo % 2 ? '#f4f0e0' : '#1a1a1e'));
      rect(x + 4, y0 + 3, x + 18, y0 + 4, H(tipo % 2 ? '#c83a2a' : '#f0c040'));
      if (tipo === 0) { R.disco(x + 11, y0 + 19, 6, H('#f4f0e0')); R.disco(x + 11, y0 + 19, 3, H(c)); }
      else if (tipo === 1) { R.disco(x + 11, y0 + 16, 4, H('#f6c290')); rect(x + 6, y0 + 21, x + 16, y0 + 30, H('#3a5aa8')); }
      else if (tipo === 2) { rect(x + 4, y0 + 12, x + 18, y0 + 26, H('#1a1a1e')); rect(x + 6, y0 + 14, x + 16, y0 + 24, H('#3ac8c8')); }
      else if (tipo === 3) { for (let i = 0; i < 4; i++) rect(x + 4 + i * 4, y0 + 26 - i * 4, x + 6 + i * 4, y0 + 29, H('#f4f0e0')); }
      else { R.poligono([[x + 4, y0 + 28], [x + 11, y0 + 12], [x + 18, y0 + 28]], H('#7a4a2a')); R.disco(x + 15, y0 + 13, 2, H('#f0c040')); }
      for (let i = 0; i < 3; i++) rect(x + 3, y0 + 9 + i * 2, x + 3 + 6 + (i * 3) % 5, y0 + 9 + i * 2, H(tipo % 2 ? '#1a1a1e' : '#f4f0e0'));
      rect(x + 10, y0 - 3, x + 12, y0 + 1, H('#9a9a9a'));
    }
  }
  // tiras de chicles colgadas y un calendario de fotos (sin cifras de mes)
  for (let i = 0; i < 6; i++) { rect(10 + i * 7, 96, 14 + i * 7, 120, T.C.k); rect(11 + i * 7, 97, 13 + i * 7, 119, H(['#e84a9a', '#5ab85a', '#f0c040'][i % 3])); for (let y = 99; y < 119; y += 4) pset(12 + i * 7, y, H('#f4f0e0')); }
  // el mostrador de madera con vetas
  for (let y = 124; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 128 ? (y === 124 ? T.C.k : H('#b88a50')) : tono(['#6a4220', '#7a4e28', '#8a5a2e', '#9a6634'], 1.4 + Math.sin(x * 0.05 + R.vnoise(x * 0.02, y * 0.4) * 5) * 0.9 + ru(x, y) * 0.5, x, y));
  // periódicos doblados a la izquierda (rayas de titular y foto, sin letras)
  for (let k2 = 0; k2 < 3; k2++) { const y0 = 132 - k2 * 3, x0 = 8 + k2 * 2; rect(x0, y0, x0 + 70, y0 + 34, T.C.k); rect(x0 + 1, y0 + 1, x0 + 69, y0 + 33, H(k2 === 2 ? '#ece8dc' : '#d8d4c8')); }
  rect(14, 130, 72, 135, H('#1a1a1e')); rect(14, 138, 40, 156, H('#5a5650')); R.disco(27, 146, 5, H('#8a8680')); for (let y = 139; y < 160; y += 2) rect(44, y, 72, y, H('#9a968c'));
  // la bandeja de las monedas, la campanilla y un lápiz
  rect(232, 150, 280, 166, T.C.k); rect(233, 151, 279, 165, H('#5a5a64')); rect(234, 152, 278, 153, H('#7a7a84'));
  for (const [x, y, c] of [[240, 158, '#c8a040'], [248, 156, '#c8c8d0'], [256, 160, '#c8a040'], [266, 157, '#c8c8d0'], [272, 161, '#a87a30']]) { R.disco(x, y, 3, T.C.k); R.disco(x, y, 2, H(c)); R.pset(x - 1, y - 1, H('#fff0c0')); }
  R.disco(298, 156, 7, T.C.k); R.disco(298, 156, 6, H('#d8b040')); rect(291, 157, 305, 160, H('#a8801e')); rect(296, 147, 300, 149, T.C.k); pset(296, 152, H('#fff0a0'));
  R.linea(214, 170, 236, 162, T.C.k); R.linea(214, 171, 236, 163, H('#f0c040')); R.pset(236, 162, H('#e89a9a'));
});
const p4 = (t) => {
  fondoI();
  // la revista entra de la mano del quiosquero y se queda apoyada en su atril
  const entra = Math.min(1, Math.max(0, (t - P4 + 0.05) / 0.45)), rebote = entra >= 1 ? Math.round(3 * Math.exp(-(t - P4 - 0.4) * 6) * Math.abs(Math.sin((t - P4 - 0.4) * 18))) : 0;
  const x0 = 104, y0 = Math.round(lerp(-130, 30, entra * entra)) - rebote;
  const X0 = x0, X1 = x0 + 92, Y1 = y0 + 116;
  R.rect(X0 + 4, 147, X1 + 4, 150, H('#4a2a14'));   // sombra en el mostrador
  R.rect(X0, y0, X1, Y1, T.C.k); R.rect(X0 + 1, y0 + 1, X1 - 1, Y1 - 1, H('#f4ecd8'));
  // la cabecera de la revista: franja roja con una estrella y bloques de color (sin letras)
  R.rect(X0 + 1, y0 + 1, X1 - 1, y0 + 16, H('#d83a3a')); R.rect(X0 + 1, y0 + 16, X1 - 1, y0 + 17, H('#8a1a1a'));
  R.poligono([[X0 + 12, y0 + 3], [X0 + 15, y0 + 9], [X0 + 21, y0 + 9], [X0 + 16, y0 + 12], [X0 + 18, y0 + 16], [X0 + 12, y0 + 13], [X0 + 6, y0 + 16], [X0 + 8, y0 + 12], [X0 + 3, y0 + 9], [X0 + 9, y0 + 9]], H('#f0c040'));
  for (const [a, b, c] of [[26, 44, '#f4ecd8'], [48, 60, '#f0c040'], [64, 86, '#f4ecd8']]) R.rect(X0 + a, y0 + 6, X0 + b, y0 + 11, H(c));
  // la ilustración: cielo amarillo con rayos, el suelo rosa, el joystick de pie; el aro que rueda (sin personas)
  const IX0 = X0 + 6, IX1 = X1 - 6, IY0 = y0 + 22, IY1 = Y1 - 18, suelo = IY1 - 8;
  R.recorte([IX0, IY0, IX1, IY1]);
  for (let y = IY0; y <= IY1; y++) R.linea(IX0, y, IX1, y, y < suelo ? (Math.floor(y / 3) % 2 ? H('#f8d860') : H('#f4cc48')) : H('#e88aa8'));
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 8 + t * 0.4, cx = (IX0 + IX1) / 2, cy = suelo; R.linea(cx, cy, cx + Math.cos(a) * 80, cy - Math.abs(Math.sin(a)) * 80, H('#f8e488')); }
  R.linea(IX0, suelo, IX1, suelo, H('#a85a78'));
  const tumba = tramo(t, moda - 0.05, moda + 0.35);
  PZ.joystick(R, IX1 - 18 + Math.round(6 * tumba), suelo + Math.round(tumba * 2), { s: 2, inclina: Math.max(-1, Math.min(1, 1.6 * tumba)) });
  if (tumba > 0.9) for (const [dx, dy] of [[-4, -22], [4, -24], [10, -20]]) R.pset(IX1 - 12 + dx, suelo + dy + Math.round(Math.sin(t * 9 + dx) * 1), H('#8a6a1a'));
  R.recorte(null);
  // el aro: rueda por la portada, tumba al joystick y a «hula hoop» se sale y cae al mostrador
  const r = 13, giro = t * 9;
  const aro = (cx, cy, rx, ry, clip) => {
    if (clip) R.recorte(clip);
    const cols = ['#e83a3a', '#f0c040', '#3ac85a', '#3a8ae8'];
    for (let k = 0; k < 120; k++) { const a = k / 120 * Math.PI * 2, x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry, seg = Math.floor(((a + giro) / (Math.PI * 2)) * 8 + 800) % 4;
      R.disco(Math.round(x), Math.round(y), 1.6, T.C.k); }
    for (let k = 0; k < 120; k++) { const a = k / 120 * Math.PI * 2, x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry, seg = Math.floor(((a + giro) / (Math.PI * 2)) * 8 + 800) % 4;
      R.pset(Math.round(x), Math.round(y), H(cols[seg])); R.pset(Math.round(x), Math.round(y) - 1, H(cols[seg])); }
    if (clip) R.recorte(null);
  };
  const ida = tramo(t, P4 + 0.5, moda), sale = tramo(t, moda + 0.1, hula + 0.15);
  if (t < hula + 0.15) {
    const cx = Math.round(lerp(IX0 + 2, IX1 - 34, ida) + (IX1 + 30 - (IX1 - 34)) * sale), cy = suelo - r - 1;
    aro(cx, cy, r, r, sale < 0.4 ? [IX0, IY0, IX1, IY1] : null);
    for (let k = 1; k <= 3; k++) if (ida > 0 && ida < 1 || sale > 0) R.linea(cx - r - 3 - k * 3, cy - 6 + k * 4, cx - r - 6 - k * 5, cy - 6 + k * 4, H('#c8a040'));
  } else {
    // en el mostrador: cae de la portada, rueda, baila como una moneda y se queda tumbado
    const u = tramo(t, hula + 0.15, hula + 0.6), base = 168, cx0 = IX1 + 30;
    const rueda = tramo(t, hula + 0.55, hula + 1.1), cx = Math.round(cx0 + 40 * rueda);
    const baila = Math.max(0, Math.min(1, (t - hula - 1.1) / 1.0)), rx = r * (1 - baila * 0.0), ry = baila > 0 ? Math.max(2, r * (1 - baila)) : r;
    const cy = Math.round(lerp(suelo - r - 1, base - r, u) + (r - ry));
    if (baila > 0) { const w = Math.sin((t - hula) * 30) * (1 - baila) * 3; aro(cx + Math.round(w), Math.round(base - ry), Math.round(rx), Math.round(ry), null); }
    else aro(cx, cy, r, r, null);
    if (baila >= 1) for (const [dx, dy] of [[-18, -6], [18, -5], [0, -10]]) if (Math.floor(t * 5) % 2) R.pset(cx + dx, base - 4 + dy, H('#f4ecd8'));
  }
  // el atril y la sombra del lomo
  R.rect(X0 + 10, 146, X0 + 14, 152, T.C.k); R.rect(X1 - 14, 146, X1 - 10, 152, T.C.k); R.rect(X0 + 11, 147, X0 + 13, 151, H('#c8c8d0')); R.rect(X1 - 13, 147, X1 - 11, 151, H('#c8c8d0'));
  // pie de la portada: tres bloques de color y el código de barras
  R.rect(X0 + 6, Y1 - 13, X0 + 30, Y1 - 9, H('#3a8ae8')); R.rect(X0 + 34, Y1 - 13, X0 + 50, Y1 - 9, H('#5ab85a'));
  for (let i = 0; i < 20; i++) if (R.hash2(i, 3) > 0.4) R.rect(X1 - 28 + i, Y1 - 14, X1 - 28 + i, Y1 - 5, T.C.k);
  // el golpe de la revista en el atril levanta polvillo
  const pol = tramo(t, P4 + 0.38, P4 + 1.0);
  if (pol > 0 && pol < 1) for (let k = 0; k < 6; k++) R.pset(Math.round(X0 + 8 + k * 16 + (k % 2 ? 1 : -1) * pol * 6), Math.round(Y1 + 3 - pol * 8 - (k % 3)), H('#d8c8a8'));
};

const efectos = [[pierde + 0.2, 'whoosh'], [ano83 + 0.05, 'sello'], [solo + 0.1, 'golpecito'],
  [P2 + 0.3, 'puerta'], [vende + 0.15, 'cerrojo'], [siguiente + 0.05, 'brillo'],
  [tiendasW + 0.05, 'papel'], [tiendasW + 0.3, 'whoosh'], [declara + 0.25, 'toc'], [muerto, 'aviso'],
  [P4 + 0.4, 'papel'], [moda + 0.05, 'golpecito'], [hula + 0.6, 'toc'], [hula + 1.2, 'boing']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: (t) => (t < siguiente ? 1983 : 1984) });
''')

E['at-japon'] = ('Japón', '''// AT-JAPON (frase 14), 1983. Cuatro planos:
// 1. el mapa del Pacífico clavado en la pared: sobre EE. UU. una nube de tormenta que llueve y relampaguea («crisis»),
//    tres cartuchos que se tachan con una X roja y la flecha roja que baja («American one»); la mano del puntero da dos
//    golpecitos en EE. UU. y a la última sílaba cruza el océano hasta Japón, donde luce el sol;
// 2. la tienda de Tokio: un niño llega corriendo a la cola; a «Nintendo released» el vendedor saca la caja de la
//    consola roja y blanca y los niños saltan; a «cartridge console» el primero se va al mostrador a comprarla y la cola
//    avanza; por el escaparate pasa el tren elevado;
// 3. el escaparate desde la calle, de noche y con lluvia: llega otro niño corriendo; a «selling very well» saltan y un
//    padre pasa con su hijo cargado con la caja de la consola; los niños lo siguen con la mirada y charlan contentos
//    («nobody … the end of video games»);
// 4. el océano al atardecer: el carguero con las cajas de la consola deja atrás el monte de Japón y navega hacia
//    América; gaviotas, nubes de tres tonos; a «cross the ocean» suena la sirena con su penacho de vapor.''', r'''
import { CONTINENTES } from '/atomo/plato/kits/pixel-retro.js';
const J = (f) => en('japon', f);
const P2 = J(0.226), P3 = J(0.528), P4 = J(0.829);
const crisis = J(0.075), americana = J(0.165), japon = J(0.234), nintendo = J(0.376), saca = J(0.393), cartucho = J(0.455), consola = J(0.482);
const vende = J(0.596), bien = J(0.631), nadie = J(0.672), fin = J(0.766), cruza = J(0.943);
const H = hex, PZ = T.PIEZAS_AT;
const ru = (x, y, k = 0) => R.hash2(x + k * 101, y + k * 37);
const tono = (cols, v, x, y) => R.tone(cols.map(H), v, x, y);
const parp = (t, v = 7) => Math.sin(t * v) > 0;
const fijo = (dib) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); dib(); R.usar(prev); } R.copiar(b); }; };
const capa = (dib) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); dib(); R.usar(prev); } const B = R.buf; for (let i = 0; i < B.length; i++) if (b[i]) B[i] = b[i]; }; };
// la caja de la consola japonesa (roja y blanca, sin letras): x, y es el centro de abajo
const cajaJP = (x, y, s = 1) => { const w = 7 * s, h = 9 * s; R.rect(x - w - 1, y - h - 1, x + w + 1, y, T.C.k); R.rect(x - w, y - h, x + w, y - 1, H('#f2eee2')); R.rect(x - w, y - h, x + w, y - h + 2 * s, H('#c8303a')); R.rect(x - w + s, y - h + 4 * s, x + w - s, y - 3 * s, H('#a8282e')); R.rect(x - w + 2 * s, y - h + 5 * s, x + w - 2 * s, y - 4 * s, H('#f2eee2')); R.rect(x + w - 1, y - h, x + w, y - 1, H('#c8c0b0')); };

// ── 1 · el mapa del Pacífico: la crisis es de América ──
const MX0 = 8, MX1 = 268, MY0 = 20, MY1 = 166;
const PJ = (lon, lat) => { const l = lon < -30 ? lon + 360 : lon; return [MX0 + (l - 100) / 200 * (MX1 - MX0), MY0 + (62 - lat) / 76 * (MY1 - MY0)]; };
const mapaFijo = fijo(() => {
  const { rect, pset, linea } = R;
  // la pared: papel pintado verde oliva tranquilo, con su friso; a la derecha una lámpara de pie y un archivador
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(['#5a6a4e', '#627356', '#6a7c5e'], 1.2 + R.vnoise(x * 0.05, y * 0.05) * 0.8, x, y));
  for (let y = 172; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, y === 172 ? T.C.k : tono(['#5a3a1e', '#6a4626', '#7a522e'], 1.4 + Math.sin(x * 0.07 + y) * 0.7, x, y));
  // el marco de madera y el mar del mapa, con sus líneas de buril y la cuadrícula
  rect(MX0 - 5, MY0 - 5, MX1 + 5, MY1 + 5, T.C.k); rect(MX0 - 4, MY0 - 4, MX1 + 4, MY1 + 4, H('#7a4a24')); rect(MX0 - 4, MY0 - 4, MX1 + 4, MY0 - 3, H('#a06a38')); rect(MX0 - 1, MY0 - 1, MX1 + 1, MY1 + 1, H('#3a2414'));
  for (let y = MY0; y <= MY1; y++) for (let x = MX0; x <= MX1; x++) pset(x, y, tono(['#8ab4c8', '#9cc2d4', '#aed0de', '#c0dce6'], 2.2 + (R.vnoise(x * 0.04, y * 0.04) - 0.5) * 1.4 + (y - MY0) / 160, x, y));
  for (let y = MY0 + 4; y < MY1; y += 7) for (let x = MX0 + ((y * 7) % 11); x < MX1 - 4; x += 13) { pset(x, y, H('#7aa4ba')); pset(x + 1, y - 1, H('#7aa4ba')); pset(x + 2, y, H('#7aa4ba')); }
  for (let lon = 120; lon < 300; lon += 30) { const [x] = PJ(lon > 180 ? lon - 360 : lon, 0); for (let y = MY0; y < MY1; y += 3) pset(Math.round(x), y, H('#6a94aa')); }
  for (let lat = 0; lat <= 60; lat += 20) { const [, y] = PJ(150, lat); for (let x = MX0; x < MX1; x += 3) pset(x, Math.round(y), H('#6a94aa')); }
  // las tierras: tono de pergamino con punteado, costa en tinta y una línea de agua por fuera
  R.recorte([MX0, MY0, MX1, MY1]);
  const tierras = Object.entries(CONTINENTES);
  for (const [k, pts] of tierras) {
    if (k === 'groenlandia' || k === 'africa' || k === 'britania' || k === 'madagascar') continue;
    const pp = pts.map(([a, b]) => PJ(a, b).map(Math.round));
    R.poligono(pp.map(([x, y]) => [x + 1, y + 1]), H('#7aa4ba'));
    R.poligono(pp, (x, y) => tono(['#c8b88a', '#d4c498', '#e0d0a6'], 1.4 + (R.vnoise(x * 0.09, y * 0.09) - 0.5) * 1.6, x, y));
    for (let i = 0; i < pp.length; i++) { const [ax, ay] = pp[i], [bx, by] = pp[(i + 1) % pp.length]; linea(ax, ay, bx, by, H('#5a4a2e')); }
  }
  // los bosques y matas en tierra
  for (let k = 0; k < 400; k++) { const x = MX0 + Math.floor(ru(k, 1) * (MX1 - MX0)), y = MY0 + Math.floor(ru(k, 2) * (MY1 - MY0)); const c = R.pget(x, y); if (c === H('#d4c498') || c === H('#c8b88a')) { pset(x, y, H('#7a8a4a')); pset(x + 1, y, H('#6a7a3a')); pset(x, y - 1, H('#8a9a5a')); } }
  // Japón resaltado: más claro, con la costa más gruesa
  { const pp = CONTINENTES.japon.map(([a, b]) => PJ(a, b).map(Math.round)); R.poligono(pp, H('#f0e0b0')); for (let i = 0; i < pp.length; i++) { const [ax, ay] = pp[i], [bx, by] = pp[(i + 1) % pp.length]; linea(ax, ay, bx, by, H('#5a4a2e')); linea(ax + 1, ay, bx + 1, by, H('#5a4a2e')); } }
  R.recorte(null);
  // la rosa de los vientos en mitad del océano
  const [rx, ry] = [150, 128]; R.disco(rx, ry, 9, H('#c0dce6')); for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2; R.poligono([[rx + Math.cos(a) * 9, ry + Math.sin(a) * 9], [rx + Math.cos(a + 0.5) * 3, ry + Math.sin(a + 0.5) * 3], [rx, ry], [rx + Math.cos(a - 0.5) * 3, ry + Math.sin(a - 0.5) * 3]].map(([u, v]) => [Math.round(u), Math.round(v)]), k === 0 ? H('#c83a2a') : H('#3a4a5a')); }
  // la lámpara de pie y el archivador con una planta (a la derecha, por debajo de Atom)
  rect(288, 70, 290, 171, H('#2a2a2e')); R.poligono([[278, 70], [300, 70], [296, 56], [282, 56]], H('#e8d8a8')); linea(278, 70, 300, 70, H('#b8a878')); rect(282, 168, 296, 171, H('#2a2a2e'));
  for (let y = 71; y < 100; y++) for (let x = 276 - (y - 71) / 2; x < 302 + (y - 71) / 2; x++) if (ru(x, y) > 0.7) pset(Math.round(x), y, H('#7a8a6a'));
  rect(276, 120, 316, 171, T.C.k); rect(277, 121, 315, 170, H('#7a7e86')); for (const y of [124, 140, 156]) { rect(279, y, 313, y + 13, H('#8a8e96')); rect(292, y + 5, 300, y + 6, H('#3a3a40')); }
  rect(300, 104, 312, 120, T.C.k); rect(301, 105, 311, 119, H('#b8603a')); for (const [dx, dy] of [[-4, -10], [0, -14], [4, -9], [-2, -6], [3, -5]]) { R.disco(306 + dx, 104 + dy, 3, H('#3a7a3a')); R.pset(306 + dx, 103 + dy, H('#5aaa5a')); }
});
const nubeT = (cx, cy, t, luz) => { const c = luz ? ['#e8e8f0', '#c8c8d4', '#a0a0b0'] : ['#8a8a96', '#6a6a78', '#4a4a58']; for (let k = 0; k < 3; k++) for (const [dx, dy, r] of [[-12, 3, 6], [-4, -1, 8], [6, 0, 9], [15, 4, 6]]) R.disco(cx + dx, cy + dy + k * 1.5, r - k * 1.6, H(c[k])); };
const p1 = (t) => {
  mapaFijo();
  // EE. UU.: la nube de tormenta que llueve, el rayo, los cartuchos tachados y la flecha roja
  R.recorte([MX0, MY0, MX1, MY1]);
  const [ux, uy] = PJ(-98, 39), ncx = Math.round(ux - 6 + Math.sin(t * 0.8) * 3), ncy = MY0 + 14;
  for (let k = 0; k < 26; k++) { const x = ncx - 22 + (k * 7) % 46, y0 = ncy + 8 + ((t * 60 + k * 13) % 34); R.linea(x, Math.round(y0), x - 1, Math.round(y0) + 3, H('#5a7a9a')); }
  const rayo = (t > crisis && t < crisis + 0.25) || (t > americana && t < americana + 0.25);
  nubeT(ncx, ncy, t, rayo);
  if (rayo) { let x = ncx + 2, y = ncy + 8; for (const [dx, dy] of [[-3, 6], [4, 5], [-4, 6], [3, 5]]) { R.linea(x, y, x + dx, y + dy, H('#fff0a0')); R.linea(x + 1, y, x + dx + 1, y + dy, H('#f0c040')); x += dx; y += dy; } }
  R.recorte(null);
  [[-115, 40, 0], [-95, 33, 1], [-80, 41, 2]].forEach(([lo, la, i]) => { const [x, y] = PJ(lo, la).map(Math.round), a = crisis + 0.3 + i * 0.5, u = tramo(t, a - 0.2, a);
    if (u > 0) { PZ.cartucho(R, x, y + 7 - Math.round((1 - u) * 6), { color: ['azul', 'naranja', 'verde'][i], icono: ['foso', 'nave', 'flor'][i] }); }
    const v = tramo(t, a + 0.1, a + 0.3); if (v > 0) { const r = Math.round(6 * v); for (let k = -r; k <= r; k++) { R.pset(x + k, y + k, H('#e82a2a')); R.pset(x + k + 1, y + k, H('#e82a2a')); R.pset(x + k, y - k, H('#e82a2a')); R.pset(x + k + 1, y - k, H('#e82a2a')); } } });
  const fl = tramo(t, americana - 0.4, americana);
  if (fl > 0) { const [x, y] = PJ(-88, 47).map(Math.round), d = Math.round(Math.sin(t * 6) * 1.5); R.rect(x + 18 - 3, y - 6 + d, x + 18 + 3, y + 10 + d, T.C.k); R.rect(x + 18 - 2, y - 5 + d, x + 18 + 2, y + 10 + d, H('#e82a2a')); R.poligono([[x + 9, y + 10 + d], [x + 27, y + 10 + d], [x + 18, y + 20 + d]], T.C.k); R.poligono([[x + 11, y + 11 + d], [x + 25, y + 11 + d], [x + 18, y + 18 + d]], H('#e82a2a')); }
  // Japón: el sol que luce, la flecha verde y la consola nueva
  const [jx, jy] = PJ(160, 50).map(Math.round), giro = t * 0.8;
  { const [tx, ty] = PJ(139.7, 35.7).map(Math.round), pu = (t * 1.2) % 1; R.anillo(tx, ty, 2 + pu * 7, H(pu < 0.5 ? '#3ac85a' : '#8ae89a')); R.disco(tx, ty, 2, T.C.k); R.disco(tx, ty, 1.3, H('#3ac85a')); }
  for (let k = 0; k < 10; k++) { const a = giro + k * Math.PI / 5; R.linea(jx + Math.round(Math.cos(a) * 9), jy + Math.round(Math.sin(a) * 9), jx + Math.round(Math.cos(a) * 14), jy + Math.round(Math.sin(a) * 14), H('#f0a020')); }
  R.disco(jx, jy, 7, T.C.k); R.disco(jx, jy, 6, H('#f0c040')); R.disco(jx - 2, jy - 2, 2, H('#fff0a0'));
  const jp = tramo(t, americana + 0.2, japon - 0.1);
  if (jp > 0) { const [cx, cy] = PJ(150, 26).map(Math.round); PZ.consolaJaponesa(R, cx, cy + Math.round((1 - jp) * 4)); if (Math.floor(t * 5) % 2) { R.pset(cx + 17, cy - 13, T.C.blanco); R.pset(cx - 17, cy - 11, H('#fff0a0')); } }
  // el puntero: la mano entra por abajo, golpea dos veces EE. UU. y cruza el océano hasta Japón
  const golpe = (a) => Math.max(0, 1 - Math.abs(t - a) / 0.15);
  const va = tramo(t, americana + 0.35, japon + 0.1), [tx0, ty0] = PJ(-100, 37), [tx1, ty1] = PJ(140, 37);
  const px = Math.round(lerp(tx0, tx1, va)), py = Math.round(lerp(ty0, ty1, va) - Math.sin(va * Math.PI) * 18 + 3 * (golpe(crisis) + golpe(americana)));
  const hx = Math.round(lerp(236, 132, va)), hy = 170;
  const ent = tramo(t, 0, 0.6), hy2 = Math.round(hy + (1 - ent) * 30);
  R.linea(hx - 6, hy2 - 4, px, py + (1 - ent) * 30, T.C.k); R.linea(hx - 5, hy2 - 4, px + 1, py + (1 - ent) * 30, H('#8a5a2a')); R.disco(Math.round(px), Math.round(py + (1 - ent) * 30), 1.5, T.C.k);
  T.brazo(R, hx + 18, 196, hx, hy2, '#3a4a6a', -1, {});
  // las chinchetas del mapa
  for (const [x, y] of [[MX0 + 2, MY0 + 2], [MX1 - 2, MY0 + 2], [MX0 + 2, MY1 - 2], [MX1 - 2, MY1 - 2]]) { R.disco(x, y, 2, T.C.k); R.disco(x, y, 1.4, H('#c83a2a')); R.pset(x - 1, y - 1, H('#f08a8a')); }
};

// ── 2 · la tienda de Tokio: la consola nueva y la cola de niños ──
const p2 = (t) => {
  const o = { encuadre: 'tokio83' };
  T.mundo(R, t, o);
  const llega = tramo(t, P2 + 0.05, P2 + 1.4), avanza = tramo(t, consola, consola + 0.9), sale = tramo(t, consola - 0.15, consola + 1.4);
  const salta = (i) => { const a = saca + 0.1 + i * 0.08; return t > a && t < a + 0.9 ? Math.round(Math.abs(Math.sin((t - a) * 9)) * 4) : 0; };
  // la cola: el primero juega con la consola del pedestal y luego se va a comprarla; los demás avanzan un puesto
  const kids = [[EL.ninoJapones, 106], [EL.ninaKinder, 88], [EL.ninoKinder, 70], [EL.nina, 52]];
  kids.forEach(([def, x], i) => { const nx = Math.round(x + 16 * avanza); R.actor(def, nx, 160 + (i % 2), t, { dir: 1, anda: avanza > 0 && avanza < 1, salto: salta(i + 1), sonrisa: t > saca, habla: t < saca && i === 1 && parp(t, 8) && t > P2 + 1.5, sorpresa: t > saca - 0.1 && t < saca + 0.2 }); });
  // el que llega corriendo al final de la cola
  const lx = Math.round(lerp(-18, 34 + 16 * avanza, llega));
  R.actor(EL.ninoJapones, lx, 162, t, { dir: 1, anda: (llega > 0 && llega < 1) || (avanza > 0 && avanza < 1), salto: salta(5), pal: { C: H('#c83a2a') } });
  // el que juega: pulsa los botones; a «cartridge console» se va al mostrador
  const jx = Math.round(lerp(122, 226, sale));
  R.actor(EL.ninoKinder, jx, 161, t, { dir: 1, anda: sale > 0 && sale < 1, dedo: sale === 0 && Math.floor(t * 4) % 2 === 0, salto: salta(0), sonrisa: true, pal: { C: H('#3a8ae8') } });
  // el vendedor saca la caja de la consola y la enseña
  const ve = R.actor(EL.vendedorTokio, 268, 152, t, { dir: -1, sostiene: t > nintendo - 0.2 ? [254, t > saca ? 118 : 128] : false, habla: t > P2 + 0.6 && t < nintendo - 0.3 && parp(t, 7), sonrisa: t > saca });
  if (t > nintendo - 0.2) { const [mx, my] = ve.mano; cajaJP(mx - 4, my + 8, 2); if (t > saca && t < saca + 1.0) R.icono('!', 262, 106, H('#f0c040'), T.C.k); }
  T.mundoDelante(R, t, o);
};

// ── 3 · el escaparate desde la calle: se vende muy bien ──
const p3 = (t) => {
  const o = { encuadre: 'tokio83', camara: 'escaparate' };
  T.mundo(R, t, o);
  const salta = (i) => { const a = vende + i * 0.1; return t > a && t < a + 1.0 ? Math.round(Math.abs(Math.sin((t - a) * 9)) * 5) : 0; };
  const pasa = tramo(t, vende - 0.2, nadie + 0.9), px = Math.round(lerp(300, -30, pasa)), mira = pasa > 0 && pasa < 1;
  const dirA = mira ? (px < 110 ? -1 : 1) : 1;
  R.actor(EL.ninoJapones, 96, 176, t, { dir: mira ? (px < 96 ? -1 : 1) : 1, salto: salta(0), sonrisa: t > vende, habla: t > nadie && t < fin && parp(t, 8), dedo: t > P3 + 0.4 && t < vende - 0.3 });
  R.actor(EL.ninaKinder, 122, 177, t, { dir: mira ? (px < 122 ? -1 : 1) : -1, salto: salta(1), sonrisa: t > vende, habla: t > fin && t < fin + 0.9 && parp(t, 8) });
  const llega = tramo(t, P3 + 0.1, P3 + 1.1), lx = Math.round(lerp(330, 208, llega));
  R.actor(EL.ninoKinder, lx, 176, t, { dir: llega < 1 ? -1 : (mira && px < 208 ? -1 : -1), anda: llega > 0 && llega < 1, salto: salta(2), sonrisa: true, dedo: t > nadie + 0.3 && t < fin + 0.4, pal: { C: H('#3a8ae8') } });
  // el padre y el hijo que pasan con la caja de la consola
  if (pasa > 0 && pasa < 1) {
    R.actor(EL.vecino, px + 20, 179, t, { dir: -1, anda: true, sonrisa: true });
    const h = R.actor(EL.ninoJapones, px, 180, t, { dir: -1, anda: true, sostiene: [px - 4, 162], sonrisa: true, pal: { C: H('#5ab85a') } });
    const [mx, my] = h.mano; cajaJP(mx - 2, my + 6);
    if (Math.floor(t * 6) % 3 === 0) R.pset(mx - 10, my - 8, T.C.blanco);
  }
  if (t > bien - 0.1 && t < bien + 0.8) for (const x of [103, 129, 215]) R.icono('!', x, 140, H('#f0c040'), T.C.k);
  T.mundoDelante(R, t, o);
};

// ── 4 · el océano: la consola cruza hacia América ──
const cieloO = fijo(() => {
  for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(['#f6c886', '#f2b078', '#e8946c', '#c87a78', '#8a6a8e', '#5a5a8a'], 5.2 - y / 19 + Math.max(0, 1 - Math.hypot(x - 46, y - 84) / 60) * 1.4, x, y));
  // el monte de Japón al fondo, a la izquierda, con su nieve, y la costa
  R.poligono([[0, 99], [8, 90], [26, 74], [34, 71], [42, 75], [62, 92], [74, 99]], H('#6a5a7a')); R.poligono([[24, 77], [34, 71], [44, 77], [38, 79], [33, 76], [29, 79]], H('#e8dcec'));
  R.rect(0, 96, 92, 99, H('#5a4a6a'));
  R.disco(46, 84, 10, H('#fff0c0')); R.disco(46, 84, 8, H('#ffe08a'));
});
const nubeO = (cx, cy, s, k) => { const c = [['#f8dcb0', '#e8b8a0', '#c89098'], ['#f0c8a8', '#d8a098', '#b07a88'], ['#e8b8a0', '#c8908e', '#9a6a80']][k]; for (let j = 2; j >= 0; j--) for (const [dx, dy, r] of [[-10, 2, 5], [-2, 0, 7], [8, 1, 6], [16, 3, 4]]) R.disco(cx + dx * s, cy + dy * s + j, Math.max(1, r * s - j * 0.8), H(c[2 - j])); };
const p4 = (t) => {
  cieloO();
  R.recorte([0, 14, 266, 92]); for (let k = 0; k < 3; k++) { const v = [2, 4, 7][k], x = ((t * v + k * 113) % 330) - 40; nubeO(Math.round(x), [30, 48, 64][k], [0.8, 1, 1.2][k], k); } R.recorte(null);
  // el mar: franjas con olas que corren, el reflejo del sol y la espuma
  for (let y = 100; y < 180; y++) for (let x = 0; x < 320; x++) {
    const dy = y - 100, ola = Math.sin(x * 0.09 + y * 0.7 - t * 2.2) * Math.sin(x * 0.031 - y * 0.3 + t * 1.1), sol = Math.exp(-(((x - 46) / (10 + dy * 0.5)) ** 2)) * Math.exp(-dy / 50);
    let v = 3.6 - dy / 24 + ola * 0.7 + sol * 2.4;
    R.pset(x, y, tono(['#1e3a6a', '#2a4c7e', '#3a6290', '#5a7aa0', '#c88a7a', '#f8c890'], v, x, y));
    if (ola > 0.88 && (x + y) % 3 === 0) R.pset(x, y, H('#e8d8d0'));
  }
  R.rect(0, 100, 319, 100, H('#f0c8a0'));
  // el carguero: casco, cajas de la consola en cubierta, el puente a popa, la chimenea con su humo; se aleja de Japón
  const x0 = Math.round(lerp(64, 132, (t - P4) / 4.2)), bob = Math.round(Math.sin(t * 2.4) * 1.2), wl = 136 + bob;
  for (let k = 0; k < 40; k++) { const wx = x0 - 6 - k * 3, wy = wl + 2 + Math.round(Math.sin(k * 0.7 + t * 3) * 1) + Math.floor(k / 8); if (wx > 0) { R.pset(wx, wy, H('#e8e0e0')); R.pset(wx, wy + 3 + Math.floor(k / 6), H('#c8c0d0')); } }
  R.poligono([[x0, wl - 14], [x0 + 128, wl - 14], [x0 + 140, wl - 22], [x0 + 132, wl], [x0 + 6, wl]], T.C.k);
  R.poligono([[x0 + 1, wl - 13], [x0 + 128, wl - 13], [x0 + 138, wl - 20], [x0 + 131, wl - 1], [x0 + 6, wl - 1]], (x, y) => y > wl - 5 ? H('#a8282e') : H('#2a2e3a'));
  R.rect(x0 + 2, wl - 13, x0 + 130, wl - 13, H('#4a5060')); for (let i = 0; i < 8; i++) R.disco(x0 + 18 + i * 14, wl - 9, 1, H('#5a6070'));
  // las cajas: palés de cajas roja y blanca y contenedores
  for (let i = 0; i < 5; i++) { const bx = x0 + 44 + i * 17; R.rect(bx, wl - 34, bx + 15, wl - 14, T.C.k); R.rect(bx + 1, wl - 33, bx + 14, wl - 15, H(i % 2 ? '#c8a06a' : '#d8b07a')); R.rect(bx + 1, wl - 33, bx + 14, wl - 31, H('#c8303a')); R.rect(bx + 3, wl - 28, bx + 12, wl - 20, H('#f2eee2')); R.rect(bx + 4, wl - 26, bx + 11, wl - 24, H('#a8282e')); R.rect(bx + 6, wl - 25, bx + 9, wl - 25, H('#f2eee2'));
    if (i % 2 === 0) { R.rect(bx + 3, wl - 46, bx + 14, wl - 34, T.C.k); R.rect(bx + 4, wl - 45, bx + 13, wl - 35, H('#3a6aa8')); for (let j = bx + 5; j < bx + 13; j += 2) R.rect(j, wl - 44, j, wl - 36, H('#2a5a90')); } }
  // el puente a popa y la chimenea
  R.rect(x0 + 8, wl - 40, x0 + 38, wl - 14, T.C.k); R.rect(x0 + 9, wl - 39, x0 + 37, wl - 15, H('#ece8e0')); R.rect(x0 + 9, wl - 39, x0 + 37, wl - 37, H('#c8c4bc'));
  for (let i = 0; i < 5; i++) R.rect(x0 + 12 + i * 5, wl - 34, x0 + 14 + i * 5, wl - 31, H(Math.sin(t * 2 + i) > 0.6 ? '#fff0a0' : '#3a4a6a'));
  R.rect(x0 + 6, wl - 44, x0 + 40, wl - 41, T.C.k); R.rect(x0 + 7, wl - 43, x0 + 39, wl - 42, H('#ece8e0'));
  R.rect(x0 + 16, wl - 58, x0 + 26, wl - 44, T.C.k); R.rect(x0 + 17, wl - 57, x0 + 25, wl - 45, H('#c8303a')); R.rect(x0 + 17, wl - 53, x0 + 25, wl - 51, H('#f2eee2'));
  R.linea(x0 + 30, wl - 44, x0 + 30, wl - 64, T.C.k); R.linea(x0 + 30, wl - 64, x0 + 136, wl - 22, H('#3a3a44'));
  const fl = Math.floor(t * 4) % 2; R.rect(x0 + 31, wl - 64, x0 + 37, wl - 60 + fl, H('#c83a2a')); R.rect(x0 + 31, wl - 62, x0 + 37, wl - 62, H('#f2eee2'));
  // el humo de la chimenea, hacia atrás; a «cross» la sirena: un penacho de vapor blanco
  for (let k = 0; k < 7; k++) { const a = (t * 0.8 + k / 7) % 1, sx = x0 + 21 - a * 50, sy = wl - 60 - a * 16; R.disco(Math.round(sx), Math.round(sy), 2 + a * 4, H(a > 0.6 ? '#b8a0a8' : '#8a7a86')); }
  const sir = tramo(t, cruza - 0.05, cruza + 0.3) * (1 - tramo(t, cruza + 0.8, cruza + 1.4));
  if (sir > 0) for (let k = 0; k < 4; k++) R.disco(x0 + 28 + k * 3, wl - 60 - k * 4 * sir, 2 + k * sir, H('#f8f4f0'));
  // la ola de proa
  for (let k = 0; k < 6; k++) R.pset(x0 + 134 + k, wl - 2 + Math.round(Math.sin(t * 6 + k) * 1), H('#f8f0f0'));
  // las gaviotas que siguen al barco
  for (let k = 0; k < 3; k++) { const gx = Math.round(x0 + 40 + k * 26 + Math.sin(t * 1.3 + k) * 12), gy = Math.round(62 + k * 7 + Math.sin(t * 2 + k * 2) * 4), a = Math.floor(t * 5 + k) % 2;
    R.linea(gx - 3, gy - a * 2, gx, gy, H('#f8f4f0')); R.linea(gx, gy, gx + 3, gy - a * 2, H('#f8f4f0')); R.pset(gx, gy + 1, H('#3a3a44')); }
};

const efectos = [[crisis, 'trueno'], [crisis + 0.35, 'pop'], [crisis + 0.85, 'pop'], [crisis + 1.35, 'pop'], [americana + 0.05, 'golpecito'], [japon - 0.3, 'whoosh'],
  [P2 + 0.3, 'campana'], [saca + 0.1, 'palmada'], [consola + 0.1, 'bip'],
  [P3 + 0.3, 'lluvia'], [bien, 'palmada'],
  [P4 + 0.2, 'ola'], [cruza, 'vapor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4]], { efectos, año: 1983 });
''')
E['at-almacenes'] = ('Almacenes', '''// AT-ALMACENES (frase 15), 1983. Tres planos:
// 1. las tres naves numeradas por fuera, a media tarde: el gerente cruza el aparcamiento con su tablilla; a «warehouses»
//    se para, abre los brazos y los seis portones se enrollan uno tras otro: dentro, cajas hasta el techo; a «cartridges»
//    el montón de la nave 2 se viene abajo y dos cajas caen al muelle con polvo; un mozo sube cajas y pasa la carretilla;
// 2. el inserto de la mesa del gerente: la mano teclea en la calculadora; el valor de lo almacenado baja hasta 0
//    («worthless») junto a la consola llena de polvo y la caja de piezas; a «storing them costs money» la cifra se vuelve
//    roja y negativa, el rollo de papel se alarga y la pila de monedas mengua; por la ventana, el almacén con su carretilla;
// 3. el almacén con la puerta de carga: un comprador mira un cartucho, niega con la cabeza (X) y se va («impossible»);
//    el gerente se rasca la cabeza («someone…») y a «decision» señala el camión de la puerta (!); el camionero asiente
//    y la carretilla lleva el palé hacia el remolque.''', r'''
const K = (f) => en('almacenes', f);
const P2 = K(0.391), P3 = K(0.718);
const almacenes = K(0.244), cartuchos = K(0.319), nada = K(0.523), guardar = K(0.606), dinero = K(0.656);
const imposible = K(0.761), alguien = K(0.853), decision = K(0.943);
const H = hex, PZ = T.PIEZAS_AT;
const ru = (x, y, k = 0) => R.hash2(x + k * 101, y + k * 37);
const tono = (cols, v, x, y) => R.tone(cols.map(H), v, x, y);
const parp = (t, v = 7) => Math.sin(t * v) > 0;
const fijo = (dib) => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); dib(); R.usar(prev); } R.copiar(b); }; };
// la tablilla con su hoja, en la mano
const tablilla = (x, y) => { R.rect(x - 4, y - 6, x + 4, y + 5, T.C.k); R.rect(x - 3, y - 5, x + 3, y + 4, H('#a87a4a')); R.rect(x - 2, y - 4, x + 2, y + 3, H('#f4f0e0')); R.rect(x - 1, y - 7, x + 1, y - 5, H('#c8c8d0')); R.pset(x - 1, y - 2, H('#5a5a64')); R.pset(x, y, H('#5a5a64')); R.pset(x - 1, y + 2, H('#5a5a64')); };
// una caja de cartón con el dibujo del juego
const caja = (x, y, w = 14, h = 11) => { R.rect(x, y, x + w, y + h, T.C.k); R.rect(x + 1, y + 1, x + w - 1, y + h - 1, H('#c8a06a')); R.rect(x + 1, y + 1, x + w - 1, y + 2, H('#d8b47a')); R.rect(x + Math.floor(w / 2), y + 1, x + Math.floor(w / 2), y + 3, H('#8a6a3a')); R.rect(x + 3, y + 5, x + 7, y + h - 3, H('#2a2a30')); R.pset(x + 5, y + 7, H('#f0c040')); R.rect(x + w - 1, y + 1, x + w - 1, y + h - 1, H('#8a6a3a')); };

// ── 1 · los almacenes por fuera: llenos hasta el techo ──
const cieloA = fijo(() => { for (let y = 0; y < 100; y++) for (let x = 0; x < 320; x++) R.pset(x, y, tono(['#f0d0a0', '#d8d4c0', '#a8c8e0', '#8ab8e0', '#78acdc'], 4.2 - y / 16, x, y)); });
const nubeA = (cx, cy, s, k) => { const c = [['#fcf6ec', '#e8dcd0', '#c8bcb8'], ['#f4ece4', '#dccfc8', '#b8aca8'], ['#ece4dc', '#d0c4bc', '#a89c98']][k]; for (let j = 2; j >= 0; j--) for (const [dx, dy, r] of [[-10, 2, 5], [-2, 0, 7], [8, 1, 6], [16, 3, 4]]) R.disco(cx + dx * s, cy + dy * s + j, Math.max(1, r * s - j * 0.8), H(c[2 - j])); };
const NAVES = [[0, 104, 46], [108, 212, 44], [216, 320, 52]];
const PUERTAS = []; for (const [x0] of NAVES) PUERTAS.push([x0 + 10, x0 + 46], [x0 + 56, x0 + 92]);
const navesFijas = (() => { let b = null; return () => { if (!b) { b = R.nuevo(); const prev = R.usar(b); const { rect, pset, linea } = R;
  // los montes lejanos y una chimenea de fábrica
  R.poligono([[0, 74], [40, 60], [80, 68], [130, 56], [180, 66], [230, 58], [270, 70], [270, 80], [0, 80]], H('#9aa4b4'));
  rect(196, 30, 202, 62, H('#8a8a94')); for (let y = 32; y < 62; y += 6) rect(196, y, 202, y + 1, H('#b8443a'));
  // las tres naves: chapa ondulada, cubierta en diente de sierra, el número grande y dos portones con su muelle
  NAVES.forEach(([x0, x1, top], n) => {
    for (let y = top + 10; y < 148; y++) for (let x = x0; x < x1; x++) pset(x, y, (x - x0) % 4 === 0 ? H('#8a94a2') : (x - x0) % 4 === 1 ? H('#c8d0dc') : tono(['#a8b2c0', '#b2bcca', '#bcc6d2'], 1.2 + ru(x >> 3, y >> 2) * 0.8 + (y - top) / 200, x, y));
    for (let k = 0; k < 3; k++) { const sx = x0 + k * 35; R.poligono([[sx, top + 10], [sx + 26, top], [sx + 35, top + 10]], H('#7a8494')); linea(sx, top + 10, sx + 26, top, H('#5a6474')); R.poligono([[sx + 27, top + 1], [sx + 34, top + 9], [sx + 27, top + 9]], H('#a8c8e0')); }
    rect(x0, top + 10, x1 - 1, top + 12, H('#5a6474'));
    rect(x0 + 40, top + 18, x0 + 62, top + 34, T.C.k); rect(x0 + 41, top + 19, x0 + 61, top + 33, H('#e8b818'));
    R.numero(String(n + 1), x0 + 51, top + 32, { centro: true, color: H('#1a1a1e'), sombra: false });
    for (const [px0, px1] of [[x0 + 10, x0 + 46], [x0 + 56, x0 + 92]]) {
      rect(px0 - 2, 94, px1 + 2, 147, T.C.k); rect(px0, 96, px1, 146, H('#241e1a'));
      // dentro: cajas apiladas hasta arriba, cajas de consola y una consola suelta
      for (let yy = 135; yy >= 98; yy -= 12) for (let xx = px0 + 1; xx + 10 <= px1; xx += 11) { const c = ru(xx, yy) > 0.5; rect(xx, yy, xx + 10, yy + 11, T.C.k); rect(xx + 1, yy + 1, xx + 9, yy + 10, H(c ? '#c8a06a' : '#b8905a')); rect(xx + 1, yy + 1, xx + 9, yy + 2, H('#d8b47a')); if (ru(xx, yy, 2) > 0.6) { rect(xx + 3, yy + 4, xx + 7, yy + 7, H('#c8303a')); rect(xx + 4, yy + 5, xx + 6, yy + 6, H('#f2eee2')); } else rect(xx + 3, yy + 4, xx + 6, yy + 8, H('#2a2a30')); }
      rect(px0, 96, px1, 98, H('#14100c'));
      rect(px0 - 4, 146, px1 + 4, 152, H('#8a8a86')); rect(px0 - 4, 146, px1 + 4, 146, H('#b8b8b0')); rect(px0 - 4, 147, px0 - 2, 151, H('#e8b818')); rect(px1 + 2, 147, px1 + 4, 151, H('#e8b818'));
    }
    rect(x0 + 47, 120, x0 + 55, 128, H('#5a6474')); R.disco(x0 + 51, 116, 3, H('#3a3a40')); pset(x0 + 51, 117, H('#fff0a0'));
  });
  for (let y = 40; y < 152; y++) for (const x of [104, 105, 106, 107, 212, 213, 214, 215]) pset(x, y, H('#6a7080'));
  // el aparcamiento: asfalto con juntas, rayas, manchas y charcos
  for (let y = 152; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, tono(['#4a4a50', '#56565c', '#626268'], 1.2 + ru(x >> 1, y) * 1.4 + (y - 152) / 60, x, y));
  for (let x = 20; x < 320; x += 52) linea(x, 158, x - 10, 179, H('#d8d4c8'));
  for (const [x, y, r] of [[60, 170, 7], [190, 174, 5], [290, 166, 6]]) for (let i = -r; i <= r; i++) for (let j = -2; j <= 2; j++) if (i * i / (r * r) + j * j / 4 < 1) pset(x + i, y + j, H(r > 6 ? '#6a7a90' : '#2e2e34'));
  // palés y cajas sueltas junto a los muelles
  rect(96, 140, 118, 151, T.C.k); rect(97, 141, 117, 150, H('#c8a06a')); rect(96, 151, 118, 153, H('#8a6a3a')); rect(208, 142, 226, 151, T.C.k); rect(209, 143, 225, 150, H('#b8905a')); rect(206, 151, 228, 153, H('#8a6a3a'));
  // la farola del aparcamiento (debajo de la esquina de Atom)
  rect(306, 60, 308, 166, H('#3a3a40')); rect(298, 58, 312, 62, H('#3a3a40')); rect(299, 62, 304, 63, H('#fff0c0'));
  R.usar(prev); } const B = R.buf; for (let i = 0; i < B.length; i++) if (b[i]) B[i] = b[i]; }; })();
const carretilla = (x, y, d = 1) => {   // una carretilla elevadora pequeña con su palé (x: centro; y: el suelo)
  R.rect(x - 9, y - 12, x + 7, y - 3, T.C.k); R.rect(x - 8, y - 11, x + 6, y - 4, H('#e8b818')); R.rect(x - 8, y - 11, x + 6, y - 10, H('#f8d848'));
  R.rect(x - 6, y - 20, x - 5, y - 11, T.C.k); R.rect(x + 2, y - 20, x + 3, y - 11, T.C.k); R.rect(x - 6, y - 21, x + 3, y - 20, T.C.k);
  R.disco(x - 1, y - 14, 2, H('#f6c290')); R.rect(x - 2, y - 12, x, y - 10, H('#3a5aa8'));
  const fx = d > 0 ? x + 9 : x - 11; R.rect(fx, y - 22, fx + 1, y - 2, T.C.k); R.rect(d > 0 ? fx + 2 : fx - 12, y - 4, d > 0 ? fx + 14 : fx, y - 3, T.C.k);
  R.rect(d > 0 ? fx + 3 : fx - 12, y - 12, d > 0 ? fx + 13 : fx - 2, y - 5, T.C.k); R.rect(d > 0 ? fx + 4 : fx - 11, y - 11, d > 0 ? fx + 12 : fx - 3, y - 6, H('#c8a06a'));
  for (const wx of [x - 6, x + 4]) { R.disco(wx, y - 2, 2.5, T.C.k); R.pset(wx, y - 2, H('#8a8a8a')); }
};
const p1 = (t) => {
  cieloA();
  R.recorte([0, 12, 268, 60]); for (let k = 0; k < 3; k++) { const v = [2, 4, 6][k], x = ((t * v + k * 113) % 330) - 40; nubeA(Math.round(x), [22, 34, 28][k], [0.8, 1, 0.7][k], k); } R.recorte(null);
  navesFijas();
  // los portones: medio cerrados al principio; a «warehouses» se enrollan uno tras otro y enseñan las cajas
  PUERTAS.forEach(([px0, px1], i) => { const u = 0.25 + 0.75 * tramo(t, almacenes - 0.2 + i * 0.16, almacenes + 0.3 + i * 0.16), y1 = Math.round(96 + (1 - u) * 50);
    for (let y = 96; y < y1; y++) R.linea(px0, y, px1, y, (y - 96) % 4 === 3 ? H('#6a7080') : (y - 96) % 4 === 0 ? H('#c8ccd4') : H('#9aa2ae'));
    if (y1 > 96) { R.linea(px0, y1, px1, y1, T.C.k); R.rect(Math.round((px0 + px1) / 2) - 2, y1 - 2, Math.round((px0 + px1) / 2) + 2, y1 - 1, H('#3a3a40')); }
    R.rect(px0 - 2, 92, px1 + 2, 95, H('#5a6474')); });
  // en la nave 2, a «cartridges», el montón se viene abajo y dos cajas caen rodando al muelle
  const cae = tramo(t, cartuchos - 0.05, cartuchos + 0.5), pp = PUERTAS[2];
  if (t > cartuchos - 0.05) for (let k = 0; k < 2; k++) { const bx = Math.round(lerp(pp[0] + 6 + k * 14, pp[0] - 2 + k * 30, cae)), by = Math.round(lerp(104, 141 - k, cae * cae)); caja(bx, by, 10, 9); if (cae >= 1 && k === 0) PZ.cartucho(R, bx + 18, 150, { color: 'naranja', icono: 'foso' }); }
  const pol = tramo(t, cartuchos + 0.4, cartuchos + 1.4);
  if (pol > 0 && pol < 1) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI; R.disco(Math.round(pp[0] + 14 + Math.cos(a) * (6 + pol * 18)), Math.round(146 - Math.sin(a) * (3 + pol * 8)), Math.max(1, 2.5 - pol * 2), H('#d8c8a8')); }
  // el gerente cruza el aparcamiento con su tablilla, se para y abre los brazos; las cajas lo sobresaltan
  const e = tramo(t, 0.15, almacenes - 0.15), gx = Math.round(lerp(-16, 142, e));
  const brazos = t > almacenes - 0.05 && t < cartuchos - 0.1, susto = t > cartuchos + 0.3 && t < cartuchos + 1.0;
  const g = R.actor(EL.gerenteAlmacen, gx, 168, t, { dir: susto ? -1 : 1, anda: e > 0 && e < 1, brazos, sostiene: !brazos ? true : false, sorpresa: brazos || susto, salto: susto && t < cartuchos + 0.55 ? 3 : 0, habla: t > cartuchos + 1.1 && parp(t, 7) });
  if (!brazos) { const [mx, my] = g.mano; tablilla(mx + (susto ? -2 : 2), my); }
  // un mozo sube cajas al muelle de la nave 3 y la carretilla cruza por delante
  const mz = Math.floor(t / 1.6) % 2, mxx = 236 + (mz ? 0 : 6);
  R.actor(EL.operario, mxx, 152, t, { dir: mz ? 1 : -1, sostiene: true, anda: (t % 1.6) < 0.5 });
  { const [mx, my] = [mxx + (mz ? 16 : -2), 140]; R.rect(mx - 4, my - 5, mx + 4, my + 2, T.C.k); R.rect(mx - 3, my - 4, mx + 3, my + 1, H('#c8a06a')); }
  const cx = Math.round(lerp(350, -40, tramo(t, 0.6, 3.2)));
  if (cx > -40 && cx < 350) carretilla(cx, 178, -1);
};

// ── 2 · la mesa del gerente: echa cuentas ──
const mesaFija = fijo(() => {
  const { rect, pset, linea } = R;
  // la pared de bloques pintada (arriba a la derecha, enlucido liso: la esquina de Atom)
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const by = y % 10, bx = (x + (Math.floor(y / 10) % 2) * 12) % 24; const liso = x > 262 && y < 52; pset(x, y, !liso && (by === 9 || bx === 23) ? H('#9aa492') : tono(['#b4bca8', '#bcc4b0', '#c4ccb8'], 1.2 + ru(x >> 1, y >> 1) * 1.2, x, y)); }
  rect(0, 108, 319, 111, H('#6a7262'));
  // el corcho con notas y una foto
  rect(10, 22, 84, 76, T.C.k); rect(11, 23, 83, 75, H('#8a5a2a')); for (let y = 25; y < 74; y++) for (let x = 13; x < 82; x++) pset(x, y, tono(['#b8884a', '#c8985a', '#d8a86a'], 1 + ru(x, y) * 1.6, x, y));
  for (const [x, y, c] of [[16, 28, '#f4f0a0'], [40, 30, '#f4f0e0'], [62, 26, '#a8d8f0'], [20, 52, '#f4f0e0'], [46, 50, '#f8b8c8'], [66, 52, '#f4f0a0']]) { rect(x, y, x + 14, y + 16, H(c)); for (let i = 0; i < 4; i++) rect(x + 2, y + 4 + i * 3, x + 11 - (i % 2) * 3, y + 4 + i * 3, H('#7a7a8a')); R.disco(x + 7, y + 1, 1.2, H('#c83a2a')); }
  // el reloj de pared
  R.disco(110, 38, 11, T.C.k); R.disco(110, 38, 10, H('#f4f0e0')); for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; pset(Math.round(110 + Math.cos(a) * 8), Math.round(38 + Math.sin(a) * 8), H('#3a3a40')); }
  // la ventana interior al almacén (lo de dentro se pinta en cada fotograma)
  rect(146, 16, 264, 98, T.C.k); rect(147, 17, 263, 97, H('#5a6a7a'));
  // el extintor, debajo de la esquina de Atom
  rect(284, 60, 296, 96, T.C.k); rect(285, 61, 295, 95, H('#c82a2a')); rect(286, 62, 288, 92, H('#e85a4a')); rect(286, 56, 294, 60, T.C.k); linea(294, 58, 302, 70, T.C.k); linea(302, 70, 300, 86, T.C.k); rect(282, 98, 298, 100, H('#5a5a64'));
  // la mesa de madera con vetas
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) pset(x, y, y < 115 ? (y === 112 ? T.C.k : H('#b88a50')) : tono(['#6a4220', '#7a4e28', '#8a5a2e', '#9a6634'], 1.6 + Math.sin(x * 0.04 + R.vnoise(x * 0.02, y * 0.3) * 6) * 0.9 + ru(x, y) * 0.5, x, y));
  // el libro de cuentas abierto: columnas de cifras a mano y una línea roja
  R.poligono([[8, 126], [86, 124], [90, 166], [4, 168]], T.C.k); R.poligono([[9, 127], [46, 125], [47, 166], [5, 167]], H('#f4f0e0')); R.poligono([[48, 125], [85, 125], [89, 165], [49, 166]], H('#ece6d4'));
  linea(47, 125, 48, 166, H('#a89a80'));
  for (let y = 131; y < 164; y += 4) { linea(8, y, 46, y, H('#a8c0d8')); linea(50, y, 88, y, H('#a8c0d8')); }
  linea(20, 127, 20, 165, H('#e89a9a')); linea(62, 126, 63, 165, H('#e89a9a'));
  for (let y = 130; y < 162; y += 4) for (const x0 of [24, 66]) for (let i = 0; i < 4; i++) if (ru(i + x0, y) > 0.25) { pset(x0 + i * 4, y, H('#2a3a6a')); pset(x0 + i * 4 + 1, y - 1, H('#2a3a6a')); pset(x0 + i * 4 + 2, y, H('#2a3a6a')); }
  linea(64, 150, 86, 150, H('#c82a2a')); linea(64, 151, 86, 151, H('#c82a2a'));
  // el lápiz
  linea(30, 172, 58, 168, T.C.k); linea(30, 173, 58, 169, H('#f0c040')); pset(58, 168, H('#e89a9a'));
  // la consola vieja cubierta de polvo, con una telaraña
  PZ.consolaVieja(R, 128, 150, { s: 2 });
  for (let k = 0; k < 140; k++) { const x = 96 + Math.floor(ru(k, 9) * 66), y = 123 + Math.floor(ru(k, 8) * 14); if (ru(k, 7) > 0.3) pset(x, y, H(ru(k, 6) > 0.5 ? '#c8c0b0' : '#a8a090')); }
  for (let k = 0; k < 6; k++) { linea(158, 122, 158 - k * 3, 122 + 8 - k, H('#d8d8d8')); } linea(152, 124, 158, 128, H('#d8d8d8'));
  // la etiqueta de precio atada a la consola, a cero
  linea(100, 138, 92, 146, H('#c8c0a8')); rect(84, 144, 96, 152, T.C.k); rect(85, 145, 95, 151, H('#f4f0e0'));
  // la caja de piezas: joysticks, cables enrollados y una placa verde
  rect(236, 128, 304, 172, T.C.k); rect(237, 129, 303, 171, H('#c8a06a')); rect(237, 129, 303, 133, H('#8a6a3a')); R.poligono([[236, 128], [226, 116], [250, 118], [256, 128]], H('#d8b47a')); R.poligono([[304, 128], [314, 114], [292, 116], [286, 128]], H('#b8905a'));
  PZ.joystick(R, 250, 130, { inclina: -0.6 }); PZ.joystick(R, 290, 131, { inclina: 0.7 });
  for (let k = 0; k < 3; k++) R.anillo(266 + k * 3, 124, 6 - k, H('#2a2a30'));
  rect(270, 118, 286, 128, T.C.k); rect(271, 119, 285, 127, H('#2a8a4a')); for (const x of [273, 278, 283]) rect(x, 121, x + 2, 124, H('#1a1a1e')); for (let x = 271; x < 286; x += 2) pset(x, 127, H('#d8b040'));
  for (let k = 0; k < 40; k++) pset(240 + Math.floor(ru(k, 5) * 60), 136 + Math.floor(ru(k, 4) * 30), H('#a88050'));
  // la taza de café
  rect(300, 150, 314, 166, T.C.k); rect(301, 151, 313, 165, H('#e8e4dc')); rect(301, 151, 313, 153, H('#4a2a14')); R.anillo(316, 158, 3, T.C.k);
});
const p2 = (t) => {
  mesaFija();
  // por la ventana: el almacén, sus estanterías con cajas y la carretilla que pasa
  R.recorte([147, 17, 263, 97]);
  for (let y = 17; y <= 97; y++) R.linea(147, y, 263, y, R.tone([H('#4a4a52'), H('#5a5a62'), H('#6a6a72')], 1 + (y - 17) / 40, 0, y));
  for (let k = 0; k < 4; k++) { const sx = 150 + k * 30; R.linea(sx, 17, sx, 92, H('#2a4a8a')); R.linea(sx + 26, 17, sx + 26, 92, H('#2a4a8a')); for (const y of [30, 50, 70]) { R.linea(sx, y, sx + 26, y, H('#e07a2a')); for (let i = 0; i < 3; i++) { const bx = sx + 2 + i * 8, by = y - 9; R.poligono([[bx, by], [bx + 7, by], [bx + 7, y - 1], [bx, y - 1]], H(ru(i, k + y) > 0.5 ? '#c8a06a' : '#b8905a')); R.pset(bx + 3, by + 3, H('#2a2a30')); } } }
  for (let y = 88; y <= 97; y++) R.linea(147, y, 263, y, H('#8a8a86'));
  const fx = Math.round(140 + ((t * 18) % 160));
  R.poligono([[fx, 80], [fx + 14, 80], [fx + 14, 92], [fx, 92]], H('#e8b818')); R.linea(fx + 16, 70, fx + 16, 92, T.C.k); R.poligono([[fx + 17, 84], [fx + 24, 84], [fx + 24, 86], [fx + 17, 86]], T.C.k); R.disco(fx + 3, 93, 2, T.C.k); R.disco(fx + 11, 93, 2, T.C.k);
  R.poligono([[fx + 2, 72], [fx + 8, 72], [fx + 8, 80], [fx + 2, 80]], H('#3a5aa8')); R.disco(fx + 5, 70, 2, H('#f6c290'));
  for (let k = 0; k < 5; k++) R.linea(160 + k * 22, 17, 150 + k * 22 + 10, 97, H('#7a7a82'));
  R.recorte(null);
  // reflejo del cristal
  R.linea(150, 90, 178, 20, H('#9aa4b0')); R.linea(154, 92, 182, 22, H('#8a94a0'));
  // las agujas del reloj
  R.linea(110, 38, Math.round(110 + Math.cos(t * 0.5 - 1.5) * 5), Math.round(38 + Math.sin(t * 0.5 - 1.5) * 5), T.C.k); R.linea(110, 38, Math.round(110 + Math.cos(t * 3 - 1.5) * 8), Math.round(38 + Math.sin(t * 3 - 1.5) * 8), H('#c82a2a'));
  // el vapor del café
  for (let k = 0; k < 3; k++) { const a = (t * 0.7 + k / 3) % 1; R.pset(Math.round(305 + k * 2 + Math.sin(t * 3 + k) * 2), Math.round(148 - a * 18), H(a < 0.6 ? '#f4f4f4' : '#c8ccc8')); }
  // la etiqueta de la consola marca 0
  R.numero('0', 88, 151, { color: H('#c82a2a'), sombra: false });
  // la calculadora con su rollo de papel
  const negro = t > guardar - 0.1, gasto = tramo(t, guardar, P3 - 0.1);
  const papel = Math.round(10 + 14 * tramo(t, P2, nada) + 30 * gasto);
  R.rect(186, 122 - papel, 210, 122, T.C.k); R.rect(187, 123 - papel, 209, 122, H('#f4f0e4'));
  for (let y = 124 - papel; y < 121; y += 3) R.linea(190 + (y % 7), y, 206 - (y % 5), y, negro && y < 122 - papel + 30 * gasto ? H('#c82a2a') : H('#5a5a64'));
  R.disco(198, 124 - papel, 3, H('#d8d4c4'));
  R.rect(172, 120, 228, 166, T.C.k); R.rect(173, 121, 227, 165, H('#3a3a42')); R.rect(173, 121, 227, 122, H('#5a5a64'));
  R.rect(176, 125, 224, 137, T.C.k); R.rect(177, 126, 223, 136, H('#9ac88a'));
  let val, col = H('#1a3a1a');
  if (t < nada) val = String(Math.round(98000 * (1 - tramo(t, P2 + 0.2, nada)))); else if (!negro) val = '0'; else { val = '-' + Math.round(800 + 24000 * gasto); col = H('#c82a2a'); }
  if (!(t > nada && t < guardar - 0.2 && Math.floor(t * 4) % 2)) R.numero(val, 222 - val.length * 8, 135, { color: col, sombra: false });
  for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const kx = 177 + i * 12, ky = 141 + j * 6; R.rect(kx, ky, kx + 9, ky + 4, T.C.k); R.rect(kx + 1, ky + 1, kx + 8, ky + 3, i === 3 ? H('#e07a2a') : H('#c8c8d0')); }
  // la pila de monedas que mengua mientras guardar cuesta dinero
  const n = 9 - Math.floor(8 * gasto);
  for (let k = 0; k < n; k++) { R.rect(160, 164 - k * 2, 170, 165 - k * 2, T.C.k); R.rect(161, 164 - k * 2, 169, 164 - k * 2, H(k % 2 ? '#d8b040' : '#e8c858')); }
  if (gasto > 0 && gasto < 1) { const cy = 164 - n * 2 - Math.round(((t * 3) % 1) * 12); R.disco(176, cy, 2, H('#e8c858')); }
  // la mano del gerente teclea (puño canónico, brazo corto desde abajo)
  const teclea = (t > P2 + 0.15 && t < nada + 0.2) || (t > guardar - 0.2 && t < P3 - 0.2);
  const k = Math.floor(t * 5), kx = 184 + (k % 4) * 12, ky = 146 + (Math.floor(k / 4) % 3) * 6 - (teclea && (t * 5) % 1 < 0.4 ? 0 : 3);
  const hx = teclea ? kx + 14 : 236, hy = teclea ? ky : 166;
  T.brazo(R, hx + 22, 194, hx, hy, '#e8e8e0', -1, {});
  if (t > nada && t < nada + 0.8) R.icono('X', 104, 112, H('#e82a2a'), T.C.k, 2);
};

// ── 3 · el almacén con la puerta de carga: la decisión ──
const p3 = (t) => {
  const mueve = tramo(t, decision + 0.3, decision + 2.0);
  const o = { encuadre: 'almacen', icono: 'varios', carretillaX: Math.round(lerp(44, 150, mueve)), carretillaDir: 1 };
  T.tiendas(R, t, o);
  // el comprador mira un cartucho, niega con la cabeza y se marcha por la izquierda
  const vete = tramo(t, imposible + 0.5, alguien + 0.5), cx = Math.round(lerp(80, -20, vete));
  const c = R.actor(EL.comprador, cx, 160, t, { dir: vete > 0 ? -1 : 1, anda: vete > 0 && vete < 1, sostiene: vete === 0 ? [cx + 18, 140] : false, enfado: t > imposible - 0.2 && t < imposible + 0.6, triste: vete > 0 });
  if (vete === 0) { const [mx, my] = c.mano; PZ.cartucho(R, mx + 1, my + 6, { color: 'naranja', icono: 'foso' }); }
  if (t > imposible - 0.1 && t < imposible + 0.9) R.icono('X', cx + 4, 120, H('#e82a2a'), T.C.k, 1);
  // el gerente echa cuentas, se rasca la cabeza y a «decision» señala el camión
  const piensa = t > alguien - 0.1 && t < decision - 0.1, senala = t > decision - 0.05;
  const g = R.actor(EL.gerenteAlmacen, 196, 160, t, { dir: senala ? 1 : -1, dedo: piensa ? Math.floor(t * 3) % 2 === 0 : senala, sostiene: !piensa && !senala ? true : false, sorpresa: t > decision - 0.05 && t < decision + 0.3, sonrisa: t > decision + 0.3, habla: t < imposible - 0.3 && parp(t, 7) });
  if (!piensa && !senala) { const [mx, my] = g.mano; tablilla(mx - 2, my); }
  if (piensa) R.icono('?', 200, 120, H('#f0c040'), T.C.k);
  if (senala && t < decision + 1.2) R.icono('!', 200, 118 - Math.round(2 * Math.abs(Math.sin(t * 8))), H('#f0c040'), T.C.k);
  // el camionero en la puerta de carga: espera y, cuando el gerente señala, asiente y abre el portón del remolque
  R.actor(EL.camionero, 262, 158, t, { dir: -1, dedo: t > decision + 0.4 && t < decision + 1.2, sonrisa: t > decision + 0.4, habla: t < decision && t > imposible && parp(t, 5) && Math.sin(t * 0.9) > 0 });
  T.tiendasDelante(R, t, o);
};

const efectos = [[1.0, 'motor'], [almacenes, 'carro'], [cartuchos + 0.35, 'golpecito'], [cartuchos + 0.45, 'chof'],
  [P2 + 0.2, 'tecleo'], [nada, 'bip'], [guardar, 'tecleo'], [dinero + 0.2, 'maquina'],
  [imposible, 'toc'], [alguien + 0.2, 'tic'], [decision, 'brillo'], [decision + 0.4, 'motor']];
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3]], { efectos, año: 1983 });
''')
