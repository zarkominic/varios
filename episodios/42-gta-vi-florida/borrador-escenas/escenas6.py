E = {}
E['lf-movil'] = ('El techo del coche', '''// LF-MOVIL (frases 18–20), cartela «2017». Ocho planos (la barra: 2023 los tráileres, 2017 el vídeo real, 2023 la prensa, 2026 la sátira):
// 1. movil 'feed': el pulgar desliza los vídeos verticales (tienda → piscina → playa) y da un doble toque en «game»;
// 2. cayos 'cayo' (2.º uso): al ocaso, los turistas del paseo alzan el móvil en vertical en «shot on phones» y, en «scroll», lo bajan y
//    deslizan; pasa la patinadora; corta en «and one of them»;
// 3. movil 'causeway': el coche entra con la bailarina en el techo, pequeña; baila en «dancing», gira en «moving car»; doble toque en «exists»;
// 4. LOCAL la bahía de Biscayne al ocaso (2017): el puente de Miami (rascacielos, crucero en el puerto) a Miami Beach; un visor vertical con
//    su punto rojo sigue al coche blanco en «filmed»; chinchetas en «Miami» y «Miami Beach»; pelícano en el pilote, velero delante;
// 5. LOCAL la mesa de una periodista de videojuegos: el contador de compartidos sube en «spread»; en «trailer's» se enciende el otro
//    monitor con la versión del tráiler (franjas de cine); en «shot-for-shot» los dos pasan los mismos fotogramas y sale un «=» enorme;
// 6. LOCAL la entrada de cristal de unas oficinas: la reportera llama al portero en «Why»; en «hasn't said» bajan las persianas y la luz se
//    pone roja; en «always worked this way» se encienden una a una las cajas de la vitrina;
// 7. vicecity 'playa' + o.espejo (2.º uso de playa): en «exaggerates» entra el espejo de feria; en «laugh at ourselves» los dos se ríen;
// 8. tienda 'autoservicio' (2.º uso): en «renames» el empleado repinta el cartel de la ciudad (otro dibujo) y en «brands» el letrero del
//    poste da la vuelta y sale otra marca.''', r'''
const V = (f) => en('verticales', f), P = (f) => en('puente', f), S = (f) => en('satira', f);
const P2 = V(0.317), P3 = V(0.705), P4 = P(0.102), P5 = P(0.531), P6 = S(0), P7 = S(0.447), P8 = S(0.780);
const H = hex, K = H('#14101c');
// ── utilidades ──
const rn = (x, y, k = 0) => { let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(k, 982451653)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
const mez = (c1, c2, f) => { const r1 = c1 & 255, g1 = (c1 >>> 8) & 255, b1 = (c1 >>> 16) & 255;
  return (0xff000000 | (Math.round(b1 + (((c2 >>> 16) & 255) - b1) * f) << 16) | (Math.round(g1 + (((c2 >>> 8) & 255) - g1) * f) << 8) | Math.round(r1 + ((c2 & 255) - r1) * f)) >>> 0; };
const luz = (x, y, c2, f) => { if (x < 0 || y < 0 || x > 319 || y > 179) return; R.pset(x, y, mez(R.pget(x, y), c2, f)); };
const caja = (x0, y0, x1, y1, cc, borde = K) => { R.rect(x0, y0, x1, y1, borde); R.rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, cc); };
const rr = (x0, y0, x1, y1, c) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, c); };   // respeta R.recorte
const fijo = (f) => { let bf = null; return () => { if (!bf) { bf = R.nuevo(); const prev = R.usar(bf); f(); R.usar(prev); } R.copiar(bf); }; };
const ease = (u) => u * u * (3 - 2 * u);
const pulso = (t, t0, d) => (t >= t0 && t < t0 + d ? Math.sin(Math.PI * (t - t0) / d) : 0);
const trama = (x0, y0, x1, y1, c1, c2, f, k = 7) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) R.pset(x, y, rn(x, y, k) < f ? c2 : c1); };
// degradado tramado por bandas (cielos)
const degradado = (x0, y0, x1, y1, cols) => { for (let y = y0; y <= y1; y++) { const f = (y - y0) / Math.max(1, y1 - y0) * (cols.length - 1), i = Math.min(cols.length - 2, Math.floor(f)), fr = f - i;
  for (let x = x0; x <= x1; x++) R.pset(x, y, rn(x, y, 11) < fr ? cols[i + 1] : cols[i]); } };
const madera = (x0, y0, x1, y1, cols, k = 1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
  const g = Math.sin(y * 0.9 * k + Math.sin(x * 0.045 + y * 0.21) * 2.2 + rn(Math.floor(y / 7), 0, 3) * 6), n = rn(x, y, 1);
  R.pset(x, y, g > 0.82 ? cols[0] : g < -0.75 && n > 0.3 ? cols[2] : n > 0.93 ? cols[0] : cols[1]); } };
// nube de tres tonos con los colores del ocaso
const nubeO = (cx, cy, w, cs) => { const b = [[0, 0, w * 0.32], [-w * 0.32, w * 0.06, w * 0.24], [w * 0.3, w * 0.05, w * 0.26], [-w * 0.1, -w * 0.12, w * 0.26], [w * 0.14, -w * 0.08, w * 0.22]];
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx), Math.round(cy + dy + 1), Math.round(r), cs[0]);
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx), Math.round(cy + dy), Math.round(r * 0.92), cs[1]);
  for (const [dx, dy, r] of b) R.disco(Math.round(cx + dx - 1), Math.round(cy + dy - 2), Math.round(r * 0.62), cs[2]); };
const corazon = (x, y, c) => { R.rect(x - 2, y - 1, x - 1, y - 1, c); R.rect(x + 1, y - 1, x + 2, y - 1, c); R.rect(x - 2, y, x + 2, y, c); R.rect(x - 1, y + 1, x + 1, y + 1, c); R.pset(x, y + 2, c); };
// un móvil pequeño en la mano, en vertical (pantalla: 'sol' graba el ocaso con el punto rojo; 'feed' desliza rayas)
const movilMano = (mx, my, t, modo) => { const x0 = mx - 2, y0 = my - 10; caja(x0, y0, x0 + 5, y0 + 9, H('#2a2a3a'));
  if (modo === 'sol') { R.rect(x0 + 1, y0 + 1, x0 + 4, y0 + 4, H('#f08a5a')); R.rect(x0 + 1, y0 + 5, x0 + 4, y0 + 8, H('#3a6ab0')); R.rect(x0 + 2, y0 + 4, x0 + 3, y0 + 5, H('#ffe080')); if (Math.floor(t * 3) % 2) R.pset(x0 + 1, y0 + 1, H('#ff2a3a')); }
  else { R.rect(x0 + 1, y0 + 1, x0 + 4, y0 + 8, H('#f6f0ff')); const s = Math.floor(t * 6) % 3; for (let j = 0; j < 3; j++) R.rect(x0 + 1, y0 + 2 + ((j * 3 + 3 - s) % 8), x0 + 4, y0 + 2 + ((j * 3 + 3 - s) % 8), [H('#e8608a'), H('#4a9ae0'), H('#f0b040')][j]); }
  R.rect(x0 + 6, y0 + 1, x0 + 6, y0 + 9, H('#000000')); };
const gaviotas = (t, n, y0, v) => { for (let k = 0; k < n; k++) { const x = ((k * 97 + t * v * (1 + (k % 3) * 0.2)) % 380) - 30, y = y0 + (k * 13) % 22 + Math.round(Math.sin(t * 1.3 + k) * 2); R.gaviota(Math.round(x), y, t, k); } };

// ── 1. el feed: el pulgar desliza los vídeos verticales ──
const s1 = V(0.075), s2 = V(0.205), like1 = V(0.157);
const p1 = (t) => {
  const des = tramo(t, s1, s1 + 0.45) / 3 + tramo(t, s2, s2 + 0.45) / 3;
  const o = { encuadre: 'causeway', camara: 'feed', desliza: des, like: like1 };
  T.movil(R, t, o); T.movilDelante(R, t, o);
  // el pulgar entra desde abajo a la izquierda, sube para deslizar dos veces y da el doble toque en «game»
  const sw = [s1, s2].reduce((m, p0) => Math.max(m, tramo(t, p0 - 0.1, p0 + 0.18) - tramo(t, p0 + 0.22, p0 + 0.5)), 0);
  const toque = t > like1 - 0.15 && t < like1 + 0.3 ? Math.round(Math.abs(Math.sin((t - like1) * 18)) * 3) : 0;
  const entra = tramo(t, 1.45, 2.15);
  if (entra > 0.02) T.brazo(R, 52, 206, Math.round(lerp(52, 136, ease(entra))), Math.round(lerp(206, 138 - sw * 36 - toque, ease(entra))), '#3a7ad0', 1, { codo: [70, 190] });
};

// ── 2. Cayo Hueso al ocaso: los móviles en vertical ──
const alza = V(0.382), baja1 = V(0.564), baja2 = V(0.617);
const p2 = (t) => {
  const o = { encuadre: 'cayo' }; T.cayos(R, t, o);
  // la turista y el turista del paseo, de cara al sol; el vecino llega andando y se suma
  const a = tramo(t, alza - 0.25, alza + 0.1);
  const r1 = R.actor(EL.fanaLF, 186, 158, t, { dir: 1, sostiene: a > 0.5 ? (t > baja1 ? true : [204, 128]) : false, sonrisa: t > baja1 });
  if (a > 0.5) movilMano(r1.mano[0], r1.mano[1], t, t > baja1 ? 'feed' : 'sol');
  const r2 = R.actor(EL.turistaLF, 214, 158, t, { dir: 1, sostiene: a > 0.5 ? [232, 126] : false });
  if (a > 0.5) movilMano(r2.mano[0], r2.mano[1], t, 'sol');
  const w = tramo(t, P2 - 0.3, alza + 0.2), cx = Math.round(lerp(-18, 150, w));
  const a3 = tramo(t, alza + 0.3, alza + 0.6);
  const r3 = R.actor(EL.ciudadanoLF, cx, 158, t, { dir: 1, anda: w > 0 && w < 1, sostiene: a3 > 0.5 ? (t > baja2 ? true : [cx + 18, 128]) : false });
  if (a3 > 0.5) movilMano(r3.mano[0], r3.mano[1], t, t > baja2 ? 'feed' : 'sol');
  // la patinadora cruza por la calle, por delante
  const pk = tramo(t, P2 + 0.6, P3 + 0.2); if (pk > 0 && pk < 1) R.actor(EL.patinadoraLF, Math.round(lerp(330, -20, pk)), 176, t, { dir: -1, anda: true, sonrisa: true });
  T.cayosDelante(R, t, o);
};

// ── 3. el vídeo del tráiler: la bailarina sobre el techo de un coche en marcha ──
const dancing = V(0.822), gira = V(0.934), like2 = P(0.025);
const p3 = (t) => {
  const o = { encuadre: 'causeway', like: like2 };
  T.movil(R, t, o);
  const x = Math.round(lerp(92, 156, ease(tramo(t, P3, V(0.79)))));
  const c = T.f_cocheMovil(R, x, 150, t);
  const baila = t > dancing, b = Math.floor((t - dancing) * 4) % 4;
  R.actor(EL.bailarinaLF, c.techo[0] - 7, c.techo[1], t, { dir: t > gira ? -1 : 1, sonrisa: true, brazos: baila && b % 2 === 0, dedo: baila && b === 1, salto: baila && b === 2 ? 1 : 0 });
  T.movilDelante(R, t, o);
};

// ── 4. la bahía de Biscayne al ocaso (2017): el puente de Miami a Miami Beach ──
const puenteY = (x) => Math.round(152 - x * 0.1 - 7 * Math.sin(Math.PI * Math.min(1, Math.max(0, (x - 10) / 120))));
const fondoBahia = fijo(() => {
  degradado(0, 0, 319, 97, [H('#2a1e52'), H('#5a2e6e'), H('#a8466e'), H('#e8705e'), H('#f8a868'), H('#ffd890')]);
  // Miami: los rascacielos del centro, con la grúa
  const torres = [[0, 54, 14], [12, 40, 12], [26, 62, 10], [34, 34, 13], [49, 48, 11], [58, 30, 9], [69, 56, 14], [84, 44, 10], [95, 66, 12], [106, 72, 10]];
  for (const [x0, y0, w] of torres) { R.rect(x0, y0, x0 + w, 98, H('#2a2050')); R.rect(x0, y0, x0, 98, H('#4a3a78')); R.rect(x0 + w, y0, x0 + w, 98, H('#1a1438'));
    for (let y = y0 + 3; y < 96; y += 3) for (let xx = x0 + 2; xx < x0 + w - 1; xx += 2) if (rn(xx, y, 5) < 0.55) R.pset(xx, y, rn(xx, y, 6) < 0.6 ? H('#ffd878') : H('#f8a858')); }
  R.rect(40, 31, 41, 34, H('#1a1438')); R.linea(80, 44, 80, 26, H('#3a2a5a')); R.linea(66, 27, 96, 27, H('#3a2a5a')); R.linea(80, 26, 96, 27, H('#3a2a5a')); R.rect(92, 27, 93, 31, H('#3a2a5a'));
  // Miami Beach: hoteles bajos de colores con palmeras
  const hot = [[228, 82, 18, '#f4a8c0'], [247, 78, 16, '#9ae0c8'], [264, 84, 20, '#f8e098'], [285, 76, 14, '#9ac8f0'], [300, 82, 22, '#f4a8c0']];
  for (const [x0, y0, w, c] of hot) { const cc = mez(H(c), H('#6a3a7a'), 0.4); R.rect(x0, y0, x0 + w, 98, cc); R.rect(x0, y0, x0 + w, y0, mez(cc, H('#ffd890'), 0.5));
    for (let y = y0 + 3; y < 96; y += 4) for (let xx = x0 + 2; xx < x0 + w - 1; xx += 3) R.pset(xx, y, rn(xx, y, 2) < 0.5 ? H('#ffe8a0') : mez(cc, K, 0.4)); }
  for (const px of [226, 246, 282, 298, 318]) { R.linea(px, 98, px + 1, 84, H('#2a1a3a')); for (const [dx, dy] of [[-4, 2], [4, 2], [-3, -1], [3, -1], [0, -2]]) R.linea(px + 1, 84, px + 1 + dx, 84 + dy, H('#2a3a2a')); }
  // el agua de la bahía, con trama y rizos
  degradado(0, 98, 319, 179, [H('#7a4a8a'), H('#4a3a7a'), H('#2a3a6a'), H('#1e2e58')]);
  for (let k = 0; k < 340; k++) { const x = Math.floor(rn(k, 1, 9) * 316), y = 100 + Math.floor(rn(k, 2, 9) * 78); R.rect(x, y, x + 2 + (k % 3) + Math.floor((y - 100) / 20), y, rn(k, 3, 9) < 0.5 ? H('#8a5a9a') : H('#3a4a80')); }
  // el puerto (isla de Dodge) con el crucero amarrado y las grúas
  R.rect(100, 101, 206, 106, H('#4a3a5a')); R.rect(100, 101, 206, 101, H('#8a6a7a'));
  for (const gx of [104, 114]) { R.linea(gx, 101, gx, 80, H('#3a2a4a')); R.linea(gx + 4, 101, gx + 4, 80, H('#3a2a4a')); R.linea(gx - 6, 80, gx + 10, 80, H('#3a2a4a')); R.pset(gx + 2, 79, H('#ff3a3a')); }
  R.poligono([[126, 100], [190, 100], [186, 92], [130, 92]], H('#f0eef8')); R.rect(134, 84, 182, 91, H('#e8e4f0')); R.rect(140, 78, 176, 83, H('#d8d4e8'));
  R.rect(126, 99, 190, 100, H('#2a5aa8')); for (let x = 132; x < 186; x += 2) { R.pset(x, 88, H('#ffd878')); R.pset(x + 1, 95, H('#3a4a8a')); if (x < 174) R.pset(x + 6, 81, H('#ffd878')); }
  R.rect(160, 72, 166, 77, H('#2a5aa8')); R.rect(160, 72, 166, 73, H('#e84a3a'));
  // islas con palmeras y casas (Watson y Star Island)
  R.poligono([[196, 118], [262, 116], [258, 111], [204, 112]], H('#2a4a3a')); for (const px of [208, 226, 248]) { R.linea(px, 113, px, 104, H('#2a1a2a')); for (const [dx, dy] of [[-4, 2], [4, 2], [-3, -1], [3, -1]]) R.linea(px, 104, px + dx, 104 + dy, H('#1e3a2a')); }
  R.rect(232, 107, 242, 112, H('#e8c8b8')); R.rect(232, 106, 242, 107, H('#c84a3a')); R.pset(236, 109, H('#ffe080')); R.pset(239, 109, H('#ffe080'));
  // el puente: tablero en diagonal, pretil, juntas, pilares y su reflejo
  for (let x = 0; x < 320; x++) { const y = puenteY(x); R.rect(x, y - 4, x, y, H('#c8b4b8')); R.pset(x, y - 4, H('#f0dcd0')); R.pset(x, y - 5, H('#8a7a8a')); R.pset(x, y - 6, x % 3 ? H('#8a7a8a') : H('#5a4a6a'));
    R.rect(x, y + 1, x, y + 3, H('#3a2a48')); if (x % 12 === 0) R.rect(x, y - 3, x, y, H('#a8949c'));
    if (x % 18 === 6) { R.rect(x, y + 4, x + 3, Math.min(179, y + 26), H('#2a2040')); R.rect(x, y + 4, x, Math.min(179, y + 26), H('#5a4a6a')); }
    if (x % 2 === 0 && y + 30 < 180) R.pset(x, y + 30 + (x % 6 === 0 ? 1 : 0), H('#2a2048')); }
  for (let x = 6; x < 320; x += 20) { const y = puenteY(x); R.rect(x, y - 13, x, y - 6, H('#4a3a5a')); R.rect(x, y - 14, x + 2, y - 14, H('#4a3a5a')); R.pset(x + 2, y - 13, H('#fff0b0')); }
  // la baliza del canal con su pilote (el pelícano se posa encima)
  R.rect(288, 150, 294, 179, H('#5a3a22')); R.rect(288, 150, 289, 179, H('#8a5a32')); R.rect(293, 150, 294, 179, H('#3a2214')); R.rect(288, 150, 294, 151, H('#a87a4a'));
  caja(284, 154, 298, 166, H('#3a9a5a')); R.numero('7', 289, 164, { color: H('#ffffff'), sombra: false });
});
const filmed = P(0.102), d2017 = P(0.156), pinMiami = P(0.403), pinBeach = P(0.451);
const p4 = (t) => {
  fondoBahia();
  // el sol que se pone, con su halo y su reflejo que tiembla en el agua
  R.disco(212, 92, 11, H('#ffd890')); R.disco(212, 92, 8, H('#fff0b0'));
  for (let y = 100; y < 176; y += 2) { const w = Math.round(8 - (y - 100) * 0.06 + Math.sin(t * 5 + y * 0.7) * 2), d = Math.round(Math.sin(t * 3 + y) * 2); if (w > 0 && Math.abs(y - puenteY(212)) > 4) R.rect(212 - w + d, y, 212 + w + d, y, (y + Math.floor(t * 8)) % 4 < 2 ? H('#ffd890') : H('#f8a868')); }
  for (let y = 96; y < 99; y++) for (let x = 200; x < 225; x++) if (rn(x, y, 4) < 0.5) R.pset(x, y, H('#ffd890'));
  // nubes de tres tonos a tres velocidades y gaviotas (lejos de Atom y del año)
  const cs = [H('#7a3a6a'), H('#d86a7a'), H('#ffc8a0')];
  for (const [x0, y, w, v] of [[30, 50, 34, 1.6], [150, 40, 46, 1], [250, 62, 30, 2.4], [100, 66, 22, 3]]) nubeO(((x0 + t * v) % 360) - 20, y, w, cs);
  gaviotas(t, 4, 44, 9);
  // ventanas que parpadean y balizas rojas
  for (let k = 0; k < 6; k++) if (Math.floor(t * 2 + k * 1.7) % 3 === 0) R.pset([16, 38, 52, 73, 88, 100][k], [60, 46, 58, 64, 52, 78][k], H('#fff8c0'));
  for (const [bx, by] of [[40, 30], [61, 29], [86, 43]]) if (Math.floor(t * 1.5 + bx) % 2) R.pset(bx, by, H('#ff2a2a'));
  // la lancha que cruza la bahía, con su estela
  const lx = Math.round(lerp(60, 200, (t - P4) / 6)); R.rect(lx, 112, lx + 8, 114, H('#f0eef8')); R.rect(lx + 2, 110, lx + 5, 111, H('#3a6ab0')); for (let k = 1; k < 8; k++) R.pset(lx - k * 3, 113 + (k % 2), H('#d8c8e8'));
  // «Miami» y «Miami Beach»: un resplandor, un anillo que se abre y su chincheta
  const g1 = pulso(t, pinMiami - 0.1, 1.2), g2 = pulso(t, pinBeach - 0.1, 1.2);
  if (g1 > 0) for (let y = 30; y < 98; y++) for (let x = 0; x < 118; x++) if ((x + y) % 2 === 0) luz(x, y, H('#ffe8a0'), 0.22 * g1);
  if (g2 > 0) for (let y = 76; y < 98; y++) for (let x = 224; x < 320; x++) if ((x + y) % 2 === 0) luz(x, y, H('#ffe8a0'), 0.3 * g2);
  for (const [px, py, t0, c] of [[58, 72, pinMiami, H('#e8403a')], [262, 84, pinBeach, H('#3a8ae8')]]) if (t > t0 - 0.3) {
    const ra = tramo(t, t0, t0 + 0.8); if (ra > 0 && ra < 1) for (let k = 0; k < 24; k++) { const a = k * Math.PI / 12; R.pset(px + Math.round(Math.cos(a) * (4 + ra * 14)), py + 2 + Math.round(Math.sin(a) * (2 + ra * 6)), H('#ffffff')); }
    T.chincheta(R, px, py, t, c, { baja: tramo(t, t0 - 0.3, t0) }); }
  // el tráfico del puente, y el coche blanco con la bailarina
  for (let k = 0; k < 9; k++) { const dirc = k % 2 ? 1 : -1, x = Math.round(((k * 41 + t * (16 + k * 2) * dirc) % 340 + 340) % 340) - 10, y = puenteY(Math.max(0, Math.min(319, x))) - (dirc > 0 ? 6 : 8);
    const cc = [H('#e84a3a'), H('#3a6ad8'), H('#f0c040'), H('#4ab07a'), H('#2a2a3a')][k % 5]; R.rect(x, y, x + 6, y + 2, cc); R.rect(x + 1, y - 1, x + 4, y - 1, cc); R.pset(dirc > 0 ? x + 6 : x, y + 1, H('#fff0a0')); }
  const cx = Math.round(lerp(30, 250, (t - P4 + 0.4) / (P5 - P4 + 0.8))), cy = puenteY(Math.max(0, Math.min(319, cx))) - 7;
  R.rect(cx - 7, cy, cx + 7, cy + 3, K); R.rect(cx - 6, cy, cx + 6, cy + 2, H('#f8f8ff')); R.rect(cx - 3, cy - 2, cx + 3, cy - 1, H('#d8e0f0')); R.pset(cx + 6, cy + 1, H('#fff0a0')); R.pset(cx - 6, cy + 1, H('#ff4a4a'));
  R.pset(cx - 4, cy + 3, K); R.pset(cx + 4, cy + 3, K);
  const bb = Math.floor(t * 4) % 2; R.rect(cx - 1, cy - 7, cx + 1, cy - 3, H('#e85a9a')); R.rect(cx - 1, cy - 9, cx + 1, cy - 8, H('#f6c290')); R.pset(cx, cy - 10, H('#5a3a20'));
  R.linea(cx - 1, cy - 6, cx - 3, bb ? cy - 10 : cy - 7, H('#f6c290')); R.linea(cx + 1, cy - 6, cx + 3, bb ? cy - 7 : cy - 10, H('#f6c290'));
  // el visor vertical del móvil que lo graba, con su punto rojo
  const vf = ease(tramo(t, filmed, filmed + 0.35));
  if (vf > 0) { const w = Math.round(lerp(50, 16, vf)), h = Math.round(lerp(70, 26, vf)), x0 = cx - w, x1 = cx + w, y0 = cy - h - 3, y1 = cy + h - 3, cB = H('#ffffff');
    for (const [xx, yy, dx, dy] of [[x0, y0, 1, 1], [x1, y0, -1, 1], [x0, y1, 1, -1], [x1, y1, -1, -1]]) { R.rect(Math.min(xx, xx + dx * 7), yy, Math.max(xx, xx + dx * 7), yy + 1, cB); R.rect(xx, Math.min(yy, yy + dy * 7), xx + (dx > 0 ? 1 : -1), Math.max(yy, yy + dy * 7), cB); }
    if (Math.floor(t * 2.5) % 2) R.disco(x0 + 6, y0 + 6, 2, H('#ff2a3a'));
    if (t > d2017) { const e = tramo(t, d2017, d2017 + 0.3); R.numero('2017', cx, y1 + 11 - Math.round((1 - e) * 4), { centro: true, color: H('#ffffff') }); } }
  // el velero que pasa por delante y el pelícano en el pilote
  const vx = Math.round(lerp(330, 40, (t - P4) / (P5 - P4 + 0.4))), vy = 168 + Math.round(Math.sin(t * 2) * 1);
  R.poligono([[vx - 14, vy], [vx + 14, vy], [vx + 10, vy + 5], [vx - 10, vy + 5]], H('#f0eef8')); R.rect(vx - 10, vy + 4, vx + 10, vy + 5, H('#3a6ab0'));
  R.linea(vx, vy - 1, vx, vy - 26, H('#4a3a3a')); R.poligono([[vx + 1, vy - 25], [vx + 1, vy - 2], [vx + 14, vy - 2]], H('#fff8f0')); R.poligono([[vx - 1, vy - 20], [vx - 1, vy - 2], [vx - 10, vy - 2]], H('#f8b878'));
  for (let k = 1; k < 6; k++) R.rect(vx + 14 + k * 4, vy + 5 + (k % 2), vx + 16 + k * 4, vy + 5 + (k % 2), H('#c8c0e8'));
  T.b_pelicano(R, 284, 150, t, { dir: -1 });
};

// ── 5. la mesa de la periodista de videojuegos: el vídeo corre, el tráiler lo copia plano a plano ──
const spread = P(0.531) + 0.15, gaming = P(0.717), trailers = P(0.788), sfs = P(0.908), copy = P(0.959);
const fondoMesa = fijo(() => {
  // la pared: papel de rayas finas, el zócalo y el techo con su moldura
  for (let y = 0; y < 132; y++) for (let x = 0; x < 320; x++) R.pset(x, y, (x % 12 < 1) ? H('#3a5a6a') : rn(x, y, 3) < 0.08 ? H('#4a6e7e') : H('#44687a'));
  R.rect(0, 0, 319, 3, H('#2a3e4a')); R.rect(0, 4, 319, 4, H('#6a8e9a'));
  // la ventana con la persiana a medio subir (el paisaje va animado)
  caja(6, 28, 64, 100, H('#e8e4dc')); R.rect(9, 31, 61, 97, H('#87c8e8')); R.rect(4, 100, 66, 103, H('#d8d0c0')); R.rect(4, 104, 66, 104, H('#8a8478'));
  // los pósteres sin letras: el ocaso con palmera y el mando
  caja(70, 24, 98, 58, H('#f8a868')); degradado(72, 26, 96, 56, [H('#5a2e6e'), H('#e8705e'), H('#ffd890')]); R.disco(84, 46, 5, H('#fff0b0')); R.rect(72, 50, 96, 56, H('#2a3a6a'));
  R.linea(78, 56, 79, 38, H('#2a1a2a')); for (const [dx, dy] of [[-6, 3], [6, 3], [-5, -2], [5, -2], [0, -4]]) R.linea(79, 38, 79 + dx, 38 + dy, H('#2a5a3a')); R.rect(70, 24, 71, 25, H('#c8c8d0'));
  caja(108, 26, 140, 56, H('#2a2a3a')); R.rect(113, 37, 135, 45, H('#e8e8f0')); R.disco(115, 41, 4, H('#e8e8f0')); R.disco(133, 41, 4, H('#e8e8f0')); R.rect(114, 40, 118, 40, K); R.rect(116, 38, 116, 42, K); R.pset(131, 39, H('#e84a3a')); R.pset(134, 41, H('#3a8ae8')); R.pset(132, 43, H('#4ab04a')); caja(150, 30, 176, 54, H('#f8e098')); R.rect(152, 32, 174, 52, H('#3a6ab0')); R.disco(163, 42, 7, H('#f8e098')); R.disco(163, 42, 4, H('#e84a3a')); R.rect(162, 30, 164, 31, H('#c8c8d0'));
  // el reloj de pared
  R.disco(196, 40, 8, K); R.disco(196, 40, 7, H('#f8f4e8')); for (let k = 0; k < 12; k++) R.pset(196 + Math.round(Math.cos(k * Math.PI / 6) * 6), 40 + Math.round(Math.sin(k * Math.PI / 6) * 6), H('#8a8a9a'));
  // la estantería con cajas de juegos (lomos de colores sin letras), figuras y un cactus
  madera(222, 52, 316, 126, [H('#5a3a22'), H('#7a5030'), H('#9a6a3e')]);
  for (const sy of [60, 86, 112]) { R.rect(226, sy, 312, sy + 21, H('#3a2414')); }
  let x = 228; for (let k = 0; k < 28; k++) { const w = 3 + (k % 3 === 0 ? 2 : 1), sy = [60, 86][k % 2 === 0 ? 0 : 1] + 3, c = [H('#e84a3a'), H('#3a6ad8'), H('#f0c040'), H('#4ab07a'), H('#9a4ad8'), H('#f08ac0'), H('#2a2a3a')][(k * 3) % 7];
    const xx = 228 + ((k * 7) % 80); if (k < 22) { R.rect(xx, sy + 3, xx + w, sy + 17, c); R.rect(xx, sy + 3, xx, sy + 17, mez(c, H('#ffffff'), 0.3)); R.rect(xx + 1, sy + 6, xx + w - 1, sy + 7, mez(c, K, 0.4)); } }
  R.rect(232, 116, 240, 133, H('#4ab07a')); R.rect(234, 112, 238, 116, H('#4ab07a')); R.rect(244, 120, 254, 133, H('#e8c050')); R.disco(249, 117, 3, H('#f6c290')); R.rect(268, 124, 278, 133, H('#c8603a')); R.rect(270, 112, 276, 124, H('#3a9a4a')); R.pset(272, 115, H('#e8f0a0'));
  R.rect(290, 118, 306, 133, H('#2a2a3a')); R.rect(292, 120, 304, 128, H('#5a8ad8'));
  // el suelo de tarima
  madera(0, 132, 319, 179, [H('#6a4228'), H('#8a5a34'), H('#a87444')], 0.6); for (let y = 140; y < 180; y += 9) R.rect(0, y, 319, y, H('#5a3820')); caja(36, 152, 214, 176, H('#3a5a8a'), H('#22304a')); for (let y = 154; y < 175; y++) for (let x = 38; x < 213; x++) if ((x + y * 2) % 14 < 2 || (x - y * 2 + 400) % 14 < 2) R.pset(x, y, H('#e8c050')); R.rect(38, 155, 212, 155, H('#c84a3a')); R.rect(38, 173, 212, 173, H('#c84a3a')); caja(254, 146, 266, 160, H('#5a5a64')); R.rect(256, 143, 264, 145, H('#f8f4e8')); R.rect(258, 141, 262, 143, H('#f0e8d0'));
  R.rect(0, 132, 319, 134, H('#2a1a14'));
  // la mesa: tablero, faldón con vetas y patas
  madera(62, 120, 236, 126, [H('#a87a4a'), H('#c8945a'), H('#e0b070')]); R.rect(62, 119, 236, 119, H('#f0c890')); R.rect(62, 127, 236, 128, H('#4a2a16'));
  madera(70, 129, 228, 146, [H('#6a4228'), H('#8a5a34'), H('#a87444')]); R.rect(70, 146, 228, 147, H('#3a2214')); R.rect(70, 129, 71, 160, H('#3a2214')); R.rect(227, 129, 228, 160, H('#3a2214'));
  // los dos monitores (las pantallas se pintan en cada fotograma)
  for (const mx of [86, 160]) { caja(mx, 64, mx + 64, 112, H('#2a2a34')); R.rect(mx + 1, 65, mx + 63, 65, H('#4a4a58')); R.rect(mx + 28, 113, mx + 36, 117, H('#3a3a44')); R.rect(mx + 22, 117, mx + 42, 119, H('#2a2a34')); R.pset(mx + 60, 110, H('#4ae84a')); }
  // teclado, ratón, mando, taza, lámpara y papeles
  R.rect(110, 116, 150, 119, H('#2a2a34')); for (let k = 0; k < 18; k++) R.pset(112 + k * 2, 117, H('#8a8a9a'));
  R.rect(158, 116, 162, 119, H('#d8d8e0')); R.rect(180, 115, 196, 119, H('#3a3a4a')); R.pset(183, 116, H('#e84a3a')); R.pset(192, 116, H('#3a8ae8'));
  R.poligono([[64, 120], [80, 118], [84, 121], [68, 123]], H('#f8f4e8')); R.poligono([[66, 119], [82, 116], [85, 119], [69, 121]], H('#ece6d4'));
  R.rect(210, 108, 218, 119, H('#e84a3a')); R.rect(219, 111, 221, 116, H('#e84a3a')); R.rect(211, 108, 217, 109, H('#4a2a1a'));
  R.linea(74, 119, 74, 92, H('#3a3a44')); R.linea(74, 92, 80, 86, H('#3a3a44')); R.poligono([[76, 88], [86, 82], [88, 90]], H('#e8c050'));
});
const p5 = (t) => {
  fondoMesa();
  // por la ventana: el cielo con nubes, una palmera que se mece y un avión
  R.recorte([9, 31, 61, 97]);
  for (const [x0, y, w, v] of [[30, 44, 18, 2], [70, 38, 24, 1.2]]) R.nube(((x0 + t * v) % 100) + 10, y, w);
  for (let y = 78; y <= 97; y++) for (let x = 9; x <= 61; x++) R.pset(x, y, (x * 7 + y * 3) % 11 < 2 ? H('#c8b090') : y < 84 ? H('#d8c8b0') : H('#4a8a5a'));
  const sx = Math.round(Math.sin(t * 1.4) * 2); R.linea(40, 97, 42 + sx, 60, H('#6a4a2a')); R.linea(41, 97, 43 + sx, 60, H('#8a6a3a'));
  for (const [dx, dy] of [[-12, 6], [12, 6], [-10, -2], [10, -2], [0, -6], [-6, 8], [6, 8]]) R.linea(42 + sx, 60, 42 + sx + dx + Math.round(Math.sin(t * 2 + dx) * 1.5), 60 + dy, H('#2a7a3a'));
  const ax = Math.round(((t * 12) % 70) + 0); R.rect(ax, 40, ax + 4, 40, H('#f0f0f8')); R.pset(ax + 2, 39, H('#f0f0f8')); R.pset(ax, 39, H('#f0f0f8'));
  R.recorte(null);
  for (let y = 31; y < 46; y += 2) R.rect(9, y, 61, y, H('#f0ece0'));   // la persiana
  R.rect(9, 46, 61, 47, H('#c8c0b0'));
  // la aguja del reloj
  R.linea(196, 40, 196 + Math.round(Math.cos(t * 0.8) * 5), 40 + Math.round(Math.sin(t * 0.8) * 5), K); R.linea(196, 40, 196, 36, K);
  // el vapor de la taza
  for (let k = 0; k < 3; k++) { const u = ((t * 0.6 + k / 3) % 1); R.pset(214 + Math.round(Math.sin(u * 6 + k) * 2), 106 - Math.round(u * 14), u < 0.6 ? H('#e8e8f0') : H('#a8b8c0')); }
  // pantalla izquierda: el vídeo vertical (2017) con el contador de compartidos que sube
  const scr = (x0, x1, cine) => { // el mismo puente al ocaso en pequeño; cine: franjas negras del tráiler
    const fr = t > sfs && t < copy + 0.6 ? Math.floor((t - sfs) * 3) % 3 : 0, w = x1 - x0;
    R.recorte([x0, 66, x1, 110]);
    degradado(x0, 66, x1, 92, [H('#4a2a6a'), H('#c8566e'), H('#ffb070')]); R.disco(x0 + Math.round(w * 0.7), 90, 5, H('#fff0b0'));
    for (let x = x0; x < x1; x += 6) rr(x + 1, 80 + (x % 4), x + 4, 92, H('#2a2050'));
    rr(x0, 93, x1, 110, H('#2a3a6a')); rr(x0, 96, x1, 98, H('#c8b4b8')); for (let x = x0 + 2; x < x1; x += 9) rr(x, 99, x + 1, 108, H('#1e1a3a'));
    const cxx = x0 + Math.round(w * 0.32) + fr * Math.round(w * 0.12); rr(cxx - 6, 92, cxx + 6, 95, H('#f8f8ff')); rr(cxx - 3, 90, cxx + 3, 91, H('#d8e0f0')); rr(cxx - 4, 96, cxx - 3, 96, K); rr(cxx + 3, 96, cxx + 4, 96, K);
    rr(cxx, 84 - (fr === 1 ? 1 : 0), cxx + 1, 89, H('#e85a9a')); rr(cxx, 82 - (fr === 1 ? 1 : 0), cxx + 1, 83, H('#f6c290')); R.pset(fr === 2 ? cxx + 2 : cxx - 1, 84, H('#f6c290'));
    if (cine) { rr(x0, 66, x1, 72, K); rr(x0, 104, x1, 110, K); }
    R.recorte(null);
    if (t > sfs && t < copy + 0.6) R.numero(String(fr + 1), x1 - 6, 78, { color: H('#ffe060') });
  };
  // izquierda: el vídeo del móvil (vertical, con marco) y el contador
  rr(87, 65, 149, 111, H('#1a1a2a')); for (let k = 0; k < 30; k++) R.pset(88 + (k * 37) % 60, 66 + (k * 23) % 44, H('#2a2a40'));
  caja(103, 65, 133, 111, H('#000000'), H('#6a6a78')); scr(104, 132, false);
  if (t < sfs) { const n = Math.round(2000000 * ease(tramo(t, spread, gaming))); if (t > spread - 0.2) { caja(89, 100, 147, 110, H('#10121a'), H('#ffffff')); R.poligono([[92, 102], [97, 105], [92, 108]], H('#4ae8a8')); R.numero(n.toLocaleString('en-US'), 122, 109, { centro: true, color: H('#ffe070') }); }
    for (let k = 0; k < 5; k++) { const u = ((t - spread) * 0.8 + k / 5) % 1; if (t > spread && t < gaming + 0.6) corazon(92 + (k * 11) % 10, Math.round(104 - u * 34), H('#ff4a6a')); }
    for (let k = 0; k < 3; k++) { const u = ((t - spread) * 0.7 + k / 3) % 1; if (t > spread && t < gaming + 0.6) { const yy = Math.round(104 - u * 34); R.poligono([[140, yy], [146, yy + 3], [140, yy + 6]], H('#4ae8a8')); } } }
  // derecha: apagada, se enciende en «trailer's» con la versión del tráiler (franjas de cine)
  const on = tramo(t, trailers - 0.15, trailers + 0.2);
  if (on <= 0) { rr(161, 65, 223, 111, H('#141822')); R.linea(166, 70, 180, 70, H('#2a3040')); }
  else { scr(161, 223, true); if (on < 1) rr(161, 65 + Math.round(23 * on), 223, 111 - Math.round(23 * on), H('#ffffff')); }
  // el «=» enorme entre los dos monitores, en «shot-for-shot»
  const ig = tramo(t, sfs - 0.05, sfs + 0.25); if (ig > 0) { const s = Math.round(lerp(0, 14, ease(ig))) + Math.round(pulso(t, sfs + 0.25, 0.4) * 2);
    for (const yy of [76, 90]) { R.rect(155 - s, yy - 1, 155 + s, yy + 7, K); R.rect(156 - s, yy, 154 + s, yy + 6, H('#ffe040')); R.rect(156 - s, yy, 154 + s, yy + 1, H('#fff8b0')); R.rect(156 - s, yy + 6, 154 + s, yy + 6, H('#c89a20')); } }
  // la silla de oficina, girada, por delante de la mesa
  { const sx = 150; R.rect(sx - 2, 132, sx + 16, 148, K); R.rect(sx - 1, 133, sx + 15, 147, H('#2a2a3a')); R.rect(sx, 134, sx + 3, 146, H('#3a3a4e')); R.rect(sx + 6, 148, sx + 8, 156, H('#4a4a54')); R.rect(sx - 4, 156, sx + 18, 157, H('#3a3a44')); for (const wx of [sx - 4, sx + 7, sx + 18]) R.disco(wx, 159, 1, K); }
  // la periodista: señala el vídeo en «spread», se gira en «Gaming», señala el tráiler y se sorprende en «shot-for-shot»
  const giro = t > gaming;
  R.actor(EL.periodista2LF, 236, 152, t, { dir: -1, dedo: (t > spread && t < gaming - 0.2) || (t > trailers && t < sfs), habla: t > gaming && t < trailers && Math.sin(t * 9) > 0, sorpresa: t > sfs && t < copy, sonrisa: t > copy, salto: t > copy && t < copy + 0.5 ? 2 : 0 });
  // el compañero entra con su taza, se para y mira
  const w = tramo(t, P5 + 0.3, P5 + 2.6), cxp = Math.round(lerp(-18, 30, w));
  const rc = R.actor(EL.periodistaLF, cxp, 172, t, { dir: 1, anda: w > 0 && w < 1, sostiene: t > copy - 0.3 ? [cxp + 14, 150] : true, sorpresa: t > sfs + 0.2 });
  R.rect(rc.mano[0] - 1, rc.mano[1] - 5, rc.mano[0] + 3, rc.mano[1], K); R.rect(rc.mano[0], rc.mano[1] - 4, rc.mano[0] + 2, rc.mano[1] - 1, H('#f8f4e8')); R.pset(rc.mano[0] + 4, rc.mano[1] - 3, K);
};

// ── 6. la entrada de cristal que no contesta ──
const why = S(0), llama = S(0.145), calla = S(0.224), always = S(0.342);
const fondoPuerta = fijo(() => {
  // arriba, un poco de cielo tramado (bajo la barra del año, tranquilo) y la cornisa
  degradado(0, 0, 319, 17, [H('#6aa8e0'), H('#8ac0ea'), H('#b0d6f0')]);
  R.rect(0, 18, 319, 21, H('#f0e6d8')); R.rect(0, 22, 319, 23, H('#a08a7a')); for (let x = 0; x < 320; x += 6) R.rect(x, 24, x + 2, 25, H('#c8b4a4'));
  // la fachada de estuco coral con juntas horizontales y su textura
  for (let y = 26; y < 150; y++) for (let x = 0; x < 320; x++) R.pset(x, y, y % 22 === 3 ? H('#c88a7a') : y % 22 === 4 ? H('#f8d0c0') : rn(x, y, 8) < 0.1 ? H('#f0bca8') : rn(x, y, 9) < 0.07 ? H('#d89a88') : H('#e8ae9a'));
  // ventanas del primer piso con persianas, reflejo, alféizar, aparato de aire y jardinera (la esquina de Atom, lisa)
  for (const wx of [8, 50, 226]) { caja(wx, 30, wx + 32, 52, H('#7ab0d8'), H('#6a5a5a')); for (let y = 32; y < 41; y += 2) R.rect(wx + 1, y, wx + 31, y, H('#f0ece0'));
    R.linea(wx + 4, 51, wx + 14, 41, H('#c0e0f4')); R.linea(wx + 9, 51, wx + 19, 41, H('#c0e0f4')); R.rect(wx + 16, 31, wx + 16, 51, H('#6a5a5a'));
    R.rect(wx - 2, 53, wx + 34, 54, H('#f8ece0')); R.rect(wx - 2, 55, wx + 34, 55, H('#a07a6a'));
    caja(wx + 22, 57, wx + 32, 64, H('#d8d8dc'), H('#6a6a70')); for (let k = 0; k < 4; k++) R.rect(wx + 24, 58 + k * 2, wx + 30, 58 + k * 2, H('#9a9aa4'));
    R.rect(wx + 2, 56, wx + 16, 59, H('#8a5a3a')); for (let k = 0; k < 6; k++) R.disco(wx + 4 + k * 2, 55, 1, [H('#e84a6a'), H('#f8d040'), H('#3a9a4a')][k % 3]); }
  // el número de la calle en metal sobre la marquesina
  R.numero('2600', 160, 49, { centro: true, color: H('#4a4a54') });
  // la marquesina y la entrada de cristal (el vestíbulo, dentro)
  R.rect(96, 54, 224, 61, H('#3a3a44')); R.rect(96, 54, 224, 55, H('#8a8a98')); R.rect(96, 62, 224, 63, H('#2a2a30'));
  for (let x = 100; x < 222; x += 8) R.pset(x, 58, H('#fff0b0'));
  caja(106, 64, 214, 150, H('#2a3a48'), H('#3a3a44'));
  for (let y = 65; y < 150; y++) for (let x = 107; x < 214; x++) R.pset(x, y, y < 76 ? H('#3a4a5a') : y > 132 ? ((x + y) % 8 < 4 ? H('#5a6068') : H('#4a5058')) : rn(x, y, 4) < 0.05 ? H('#3a4a5c') : H('#2e3e4e'));
  for (let x = 112; x < 210; x += 16) R.rect(x, 68, x + 6, 69, H('#f8f0c8'));   // luces del techo del vestíbulo
  for (let x = 110; x < 212; x += 16) for (let y = 70; y < 90; y += 2) R.pset(x + 3, y, H('#4a5a6a'));
  R.rect(128, 112, 192, 132, H('#5a4a3a')); R.rect(128, 112, 192, 114, H('#8a7a5a')); R.rect(150, 104, 166, 112, H('#2a2a34')); R.rect(152, 106, 164, 110, H('#4a7ab0'));   // recepción y su pantalla
  R.rect(184, 96, 190, 112, H('#2a5a3a')); R.disco(187, 94, 5, H('#3a8a4a')); R.rect(114, 92, 124, 132, H('#3a3a4a')); R.rect(115, 93, 123, 99, H('#5a5a6a'));   // planta y un sillón dentro
  R.rect(158, 64, 160, 150, H('#3a3a44')); R.rect(106, 64, 108, 150, H('#3a3a44')); R.rect(212, 64, 214, 150, H('#3a3a44'));
  R.rect(150, 104, 151, 118, H('#c8c8d0')); R.rect(167, 104, 168, 118, H('#c8c8d0'));   // tiradores
  for (const [a, b] of [[112, 140], [126, 150], [168, 150], [182, 164]]) R.linea(a, 146, b + 12, 70, H('#5a7a90'));   // reflejos
  // el portero automático y la cámara
  caja(220, 120, 230, 140, H('#8a8a94')); R.rect(222, 122, 228, 128, H('#2a2a34')); for (let k = 0; k < 3; k++) R.rect(222, 131 + k * 2, 228, 131 + k * 2, H('#5a5a64'));
  R.disco(224, 68, 3, H('#2a2a34')); R.rect(222, 64, 226, 65, H('#5a5a64')); R.pset(225, 69, H('#e83a3a'));
  // la vitrina de la derecha, con su foco (las cinco cajas se encienden en la escena)
  caja(244, 72, 316, 128, H('#1e2430'), H('#5a5a64')); R.rect(246, 118, 314, 126, H('#3a3a44')); R.rect(246, 118, 314, 118, H('#6a6a78'));
  for (const fx of [262, 298]) { R.rect(fx - 2, 73, fx + 2, 75, H('#8a8a94')); }
  // la bici en su soporte, la papelera y los bolardos
  for (let k = 0; k < 3; k++) { R.rect(14 + k * 12, 136, 15 + k * 12, 150, H('#8a8a94')); R.rect(14 + k * 12, 135, 22 + k * 12, 136, H('#8a8a94')); R.rect(21 + k * 12, 136, 22 + k * 12, 150, H('#8a8a94')); }
  R.disco(22, 144, 5, K); R.disco(22, 144, 4, H('#5a5a64')); R.disco(22, 144, 1, H('#c8c8d0')); R.disco(42, 144, 5, K); R.disco(42, 144, 4, H('#5a5a64')); R.disco(42, 144, 1, H('#c8c8d0'));
  R.linea(22, 144, 30, 136, H('#3a8ad8')); R.linea(30, 136, 42, 144, H('#3a8ad8')); R.linea(30, 136, 38, 136, H('#3a8ad8')); R.linea(38, 136, 42, 144, H('#3a8ad8')); R.rect(28, 134, 32, 134, K); R.rect(37, 133, 39, 133, K);
  caja(56, 136, 64, 150, H('#4a6a4a')); R.rect(55, 134, 65, 135, H('#3a5a3a'));
  for (const bx of [98, 222]) { R.rect(bx, 140, bx + 3, 150, H('#6a6a74')); R.rect(bx, 140, bx + 3, 141, H('#e8d84a')); }
  // jardineras con palmeras enanas
  for (const jx of [70, 236]) { R.rect(jx, 136, jx + 26, 150, H('#8a8478')); R.rect(jx, 136, jx + 26, 137, H('#b0aa9c')); R.rect(jx + 2, 134, jx + 24, 136, H('#4a3424')); for (let k = 0; k < 5; k++) R.pset(jx + 4 + k * 4, 133, H('#e84a6a')); }
  // el felpudo
  R.rect(126, 150, 194, 153, H('#4a3a2a')); for (let x = 128; x < 192; x += 3) R.pset(x, 151, H('#6a5a3a'));
  // la acera de baldosas y la calle con su bordillo, la alcantarilla y el paso de cebra
  for (let y = 150; y < 166; y++) for (let x = 0; x < 320; x++) if (!(x >= 126 && x <= 194 && y <= 153)) R.pset(x, y, (x % 16 === 0 || y === 158) ? H('#9a948a') : rn(x, y, 2) < 0.1 ? H('#c0baae') : H('#b0aa9e'));
  R.rect(0, 166, 319, 167, H('#e0dace')); for (let y = 168; y < 180; y++) for (let x = 0; x < 320; x++) R.pset(x, y, rn(x, y, 5) < 0.08 ? H('#5a5a64') : H('#4a4a54'));
  for (let x = 4; x < 320; x += 24) if (x < 250 || x > 300) R.rect(x, 174, x + 10, 174, H('#e8d84a'));
  for (let x = 254; x < 300; x += 8) R.rect(x, 169, x + 4, 179, H('#e8e4dc'));
  caja(70, 166, 82, 168, H('#2a2a30'), H('#5a5a64'));
});
const p6 = (t) => {
  fondoPuerta();
  // las palmeras enanas que se mecen
  for (const jx of [83, 249]) { const sx = Math.round(Math.sin(t * 1.6 + jx) * 1.5); R.linea(jx, 134, jx + sx, 112, H('#6a4a2a')); for (const [dx, dy] of [[-10, 6], [10, 6], [-8, -1], [8, -1], [0, -5]]) R.linea(jx + sx, 112, jx + sx + dx + Math.round(Math.sin(t * 2 + dx) * 1.2), 112 + dy, H('#2a7a3a')); }
  // las persianas que bajan en «hasn't said»
  const per = ease(tramo(t, calla, calla + 0.6));
  if (per > 0) for (const [a, b] of [[109, 157], [161, 211]]) { const yb = 65 + Math.round(per * 84); for (let y = 65; y < yb; y += 2) { R.rect(a, y, b, y, H('#e0dcd0')); R.rect(a, y + 1, b, y + 1, H('#b8b2a4')); } R.rect(a, yb, b, yb, H('#8a8478')); }
  // la luz del portero: verde mientras espera, roja con la «X» cuando calla
  const espera = t > llama && t < calla, roja = t > calla;
  R.rect(223, 123, 227, 127, roja ? H('#e83a3a') : espera && Math.floor(t * 4) % 2 ? H('#4ae86a') : H('#2a3a2a'));
  if (roja && t < calla + 1.6) R.icono('X', 223, 113, H('#e83a3a'), K, 1);
  // la vitrina: las cajas se encienden una a una en «always worked this way»
  for (let k = 0; k < 5; k++) { const x0 = 250 + k * 12, on = t > always + k * 0.18;
    caja(x0, 92, x0 + 10, 117, on ? [H('#f8a868'), H('#9ac8f0'), H('#f4a8c0'), H('#9ae0c8'), H('#f8e098')][k] : H('#3a3a48'));
    if (on) { R.disco(x0 + 5, 101, 2, H('#fff0b0')); R.rect(x0 + 1, 106, x0 + 9, 116, H('#2a3a6a')); R.linea(x0 + 3, 116, x0 + 4, 104, H('#2a1a2a')); R.rect(x0 + 2, 104, x0 + 6, 104, H('#2a7a3a'));
      const g = pulso(t, always + k * 0.18, 0.5); if (g > 0) for (let y = 78; y < 118; y++) for (let x = x0 - 1; x < x0 + 12; x++) if ((x + y) % 2 === 0) luz(x, y, H('#fff0b0'), 0.35 * g); } }
  // la paloma que picotea en la acera
  const px = Math.round(40 + Math.sin(t * 0.5) * 10), pk = Math.floor(t * 3) % 3 === 0 ? 1 : 0; R.rect(px, 158, px + 5, 160, H('#8a8a9a')); R.rect(px + 4 + pk, 156 + pk, px + 6 + pk, 157 + pk, H('#6a6a7a')); R.pset(px + 7 + pk, 157 + pk, H('#e8a040')); R.pset(px + 2, 161, H('#e86a4a')); R.pset(px + 4, 161, H('#e86a4a'));
  // la reportera llega con el micrófono, llama, espera, se encoge y señala la vitrina
  const w = tramo(t, P6 - 0.2, llama - 0.4), x = Math.round(lerp(-18, 200, ease(w)));
  const pulsa = t > llama - 0.2 && t < llama + 0.5, mira = t > calla + 0.3 && t < always - 0.1, señala = t > always;
  const r = R.actor(EL.periodistaLF, x, 160, t, { dir: mira ? -1 : 1, anda: w > 0 && w < 1, sostiene: pulsa ? [221, 136] : señala ? false : true, dedo: señala, triste: mira, sorpresa: t > calla && t < calla + 0.3, sonrisa: señala });
  if (!pulsa && !señala) { const [mx, my] = r.mano; R.rect(mx, my - 6, mx, my, H('#5a5a64')); R.disco(mx, my - 7, 2, K); R.pset(mx - 1, my - 8, H('#8a8a94')); }
  if (t > llama + 0.3 && t < calla + 1.4) { const by = 116 - Math.round(pulso(t, llama + 0.3, 0.4) * 3); caja(x - 2, by - 14, x + 16, by + 4, H('#ffffff')); R.poligono([[x + 4, by + 4], [x + 9, by + 4], [x + 5, by + 8]], K); R.pset(x + 6, by + 5, H('#ffffff')); R.icono('?', x + 2, by - 12, H('#3a6ad8'), H('#a8c0e8'), 2); }
  // un coche que pasa por la calle, por delante
  const cc = tramo(t, P6 + 3.6, P6 + 5.4); if (cc > 0 && cc < 1) { const xc = Math.round(lerp(340, -50, cc)); R.rect(xc, 168, xc + 36, 176, H('#3a6ad8')); R.rect(xc + 8, 162, xc + 26, 168, H('#3a6ad8')); R.rect(xc + 10, 163, xc + 24, 167, H('#a8d0f0')); R.disco(xc + 8, 177, 3, K); R.disco(xc + 28, 177, 3, K); R.pset(xc, 171, H('#fff0a0')); }
};

// ── 7. el espejo de feria en la playa ──
const exag = S(0.531), recon = S(0.601), laugh = S(0.673);
const p7 = (t) => {
  const o = { encuadre: 'playa', espejo: ease(tramo(t, exag - 0.1, exag + 0.6)) };
  T.vicecity(R, t, o);
  const w1 = tramo(t, P7 - 0.2, exag - 0.2), w2 = tramo(t, P7, exag);
  const x1 = Math.round(lerp(-18, 92, w1)), x2 = Math.round(lerp(250, 128, w2));
  const sor = t > recon && t < laugh, rie = t > laugh, h = rie ? Math.round(Math.abs(Math.sin((t - laugh) * 9)) * 2) : 0;
  R.actor(EL.turistaLF, x1, 158, t, { dir: 1, anda: w1 > 0 && w1 < 1, sorpresa: sor, sonrisa: rie, dedo: rie && t < laugh + 0.9, salto: h });
  R.actor(EL.fanaLF, x2, 158, t, { dir: -1, anda: w2 > 0 && w2 < 1, sorpresa: sor, sonrisa: rie, brazos: rie && t > laugh + 0.5, salto: rie ? Math.round(Math.abs(Math.sin((t - laugh) * 9 + 1)) * 2) : 0 });
  // un perro de playa que corre detrás de la pelota
  const u = ((t - P7) * 0.35) % 1, bx = Math.round(lerp(20, 220, u)), by = 166 - Math.round(Math.abs(Math.sin(u * Math.PI * 4)) * 10);
  R.disco(bx + 14, by, 3, H('#f8f0f0')); R.rect(bx + 12, by - 1, bx + 16, by - 1, H('#e84a3a')); R.rect(bx + 13, by + 1, bx + 15, by + 1, H('#3a8ae8'));
  const dx = bx - 6, dy = 168, pa = Math.floor(t * 8) % 2; R.rect(dx, dy - 5, dx + 8, dy - 2, H('#c88a4a')); R.rect(dx + 7, dy - 7, dx + 10, dy - 4, H('#c88a4a')); R.pset(dx + 10, dy - 5, K); R.pset(dx + 8, dy - 8, H('#8a5a2a')); R.pset(dx - 1, dy - 6 + pa, H('#c88a4a'));
  R.rect(dx + (pa ? 0 : 1), dy - 1, dx + (pa ? 0 : 1), dy, H('#8a5a2a')); R.rect(dx + (pa ? 7 : 6), dy - 1, dx + (pa ? 7 : 6), dy, H('#8a5a2a'));
  T.vicecityDelante(R, t, o);
};

// ── 8. el autoservicio: se repintan la ciudad y la marca ──
const renames = S(0.797), cities = S(0.910), brands = S(0.957);
const glifoViejo = (x, y) => { R.rect(x + 2, y + 6, x + 4, y + 13, H('#ffffff')); R.rect(x + 6, y + 3, x + 8, y + 13, H('#ffffff')); R.rect(x + 10, y + 8, x + 12, y + 13, H('#ffffff')); R.pset(x + 7, y + 2, H('#ffffff')); };
const glifoNuevo = (x, y) => { R.rect(x + 5, y + 2, x + 8, y + 5, H('#ff8ab0')); R.pset(x + 9, y + 3, H('#ffd040')); R.rect(x + 6, y + 6, x + 6, y + 9, H('#ff8ab0')); R.rect(x + 3, y + 8, x + 10, y + 11, H('#ff8ab0')); R.rect(x + 6, y + 12, x + 6, y + 13, H('#ffd040')); R.rect(x + 8, y + 12, x + 8, y + 13, H('#ffd040')); };
const p8 = (t) => {
  const o = { encuadre: 'autoservicio' };
  T.tienda(R, t, o);
  // el letrero del poste da la vuelta en «brands» y sale otra marca (una estrella sobre azul)
  const g = tramo(t, brands - 0.1, brands + 0.6), ang = g * Math.PI * 2, sxv = Math.abs(Math.cos(ang)), nueva = g > 0.25;
  if (g > 0 || nueva) { const cx = 98, w = Math.round(19 * sxv);
    for (let y = 22; y <= 42; y++) { const c = R.pget(76, y); R.rect(79, y, 118, y, c); }
    if (w > 0) { caja(cx - w, 23, cx + w, 41, nueva ? H('#2a5ad8') : H('#d83a2a')); R.rect(cx - w + 1, 24, cx + w - 1, 25, nueva ? H('#6a9aff') : H('#ff6a4a'));
      if (sxv > 0.4) { if (nueva) { const s = Math.max(1, Math.round(7 * sxv)); R.poligono([[cx, 26], [cx + Math.round(s * 0.3), 31], [cx + s, 32], [cx + Math.round(s * 0.45), 35], [cx + Math.round(s * 0.6), 40], [cx, 37], [cx - Math.round(s * 0.6), 40], [cx - Math.round(s * 0.45), 35], [cx - s, 32], [cx - Math.round(s * 0.3), 31]], H('#ffe040')); }
        else { R.rect(cx - Math.round(8 * sxv), 28, cx + Math.round(8 * sxv), 30, H('#e8a040')); R.rect(cx - Math.round(8 * sxv), 31, cx + Math.round(8 * sxv), 33, H('#6a3a1a')); R.rect(cx - Math.round(8 * sxv), 34, cx + Math.round(8 * sxv), 36, H('#e8a040')); } } }
    if (g > 0 && g < 1) for (let k = 0; k < 6; k++) { const a = k * 1.05 + t * 3, r = 24 + g * 6; R.pset(98 + Math.round(Math.cos(a) * r), 32 + Math.round(Math.sin(a) * r * 0.5), H('#fff8b0')); } }
  // el cartel verde de la ciudad, en dos postes, con el dibujo que se repinta
  const sx0 = 254, sy0 = 108; R.rect(sx0 + 6, sy0 + 20, sx0 + 7, 162, H('#5a5a64')); R.rect(sx0 + 37, sy0 + 20, sx0 + 38, 162, H('#5a5a64'));
  caja(sx0, sy0, sx0 + 44, sy0 + 21, H('#1e7a4a'), H('#e8f0e8')); R.rect(sx0 + 2, sy0 + 2, sx0 + 42, sy0 + 19, H('#1e7a4a')); R.rect(sx0 + 2, sy0 + 2, sx0 + 42, sy0 + 2, H('#3a9a6a'));
  const pinta = tramo(t, renames + 0.1, cities), xr = Math.round(lerp(sx0 + 2, sx0 + 42, pinta));
  glifoViejo(sx0 + 4, sy0 + 3); R.numero('1896', sx0 + 31, sy0 + 15, { centro: true, color: H('#ffffff'), sombra: false });
  if (pinta > 0) { R.recorte([sx0 + 2, sy0 + 2, xr, sy0 + 19]); rr(sx0 + 2, sy0 + 2, sx0 + 42, sy0 + 19, H('#1e7a4a')); glifoNuevo(sx0 + 4, sy0 + 3); for (let k = 0; k < 5; k++) for (let x = sx0 + 22 + k * 4; x < sx0 + 24 + k * 4; x++) for (let y = sy0 + 9; y < sy0 + 16; y++) if ((x + y + k) % 3) R.pset(x, y, H('#ffffff')); R.recorte(null); }
  const brillo = pulso(t, cities, 0.6); if (brillo > 0) for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + 0.6; R.linea(sx0 + 22 + Math.round(Math.cos(a) * 26), sy0 + 10 + Math.round(Math.sin(a) * 14), sx0 + 22 + Math.round(Math.cos(a) * (26 + 6 * brillo)), sy0 + 10 + Math.round(Math.sin(a) * (14 + 4 * brillo)), H('#fff8b0')); }
  // el empleado con el rodillo en su pértiga
  const ex = 300, sube = t > renames && t < cities + 0.2 ? Math.round(Math.sin((t - renames) * 7) * 4) : 0;
  const re = R.actor(EL.empleadoLF, ex, 162, t, { dir: -1, sostiene: [ex - 6, 140], sonrisa: t > cities, sorpresa: t > brands && t < brands + 0.8 });
  const rx = xr > sx0 + 3 && t < cities + 0.2 ? xr : sx0 + 8, ry = sy0 + 10 + sube;
  R.linea(re.mano[0], re.mano[1], rx - 1, ry + 3, H('#c8a060')); R.linea(re.mano[0], re.mano[1] + 1, rx - 1, ry + 4, H('#8a6a3a'));
  R.rect(rx - 2, ry - 3, rx + 1, ry + 4, K); R.rect(rx - 1, ry - 2, rx, ry + 3, H('#ff8ab0'));
  T.tiendaDelante(R, t, o);
};

const efectos = [[s1, 'whoosh'], [like1, 'golpecito'], [s2, 'whoosh'], [alza, 'bip'], [P3 + 0.2, 'coche'], [like2, 'pop'],
  [filmed, 'bip'], [pinMiami, 'golpecito'], [trailers, 'interruptor'], [sfs, 'brillo'], [llama, 'timbre'], [calla, 'cerrojo'], [always, 'brillo'],
  [exag, 'boing'], [cities, 'brillo'], [brands, 'whoosh']];
const año = (t) => (t < P4 ? 2023 : t < gaming ? 2017 : t < P6 ? 2023 : 2026);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7], [P8, p8]], { cartela: '2017', efectos, año });
''')
