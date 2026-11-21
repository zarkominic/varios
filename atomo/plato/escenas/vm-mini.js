// VM-MINI · las dos miniaturas del ep25 (paso 10, prueba A/B): noir e intermedia.
//   pintarVM(N, { mix })
// Una sala de lectura de noche: sobre la mesa, el manuscrito abierto bajo la lámpara de banquero; su planta imposible y
// sus renglones de signos inventados (bucles, rizos y «gallows», nunca letras) brillan en oro; una lupa encima. De
// espaldas, a la izquierda, un hombre con sombrero que se inclina a mirarlo, recortado con el filo de la luz. Al fondo,
// librerías y una ventana alta. El año en blanco hueso: «1404».
// mix: la ventana al atardecer saturado, lomos de colores y la planta pintada en verde, azul y rojo (la «intermedia»).
export function pintarVM(N, { mix = false } = {}) {
  const { W, H, K, hex, set, get, hh, tinte, mez, poligono: P, halo, linea, elipse, SIL } = N;
  const ORO = hex('#ffcf6a'), ORO2 = hex('#fff0b8');
  // 1 · la pared y las librerías del fondo
  const PARED = hex(mix ? '#3a2438' : '#0c0d14'), PARED2 = hex(mix ? '#46304a' : '#12141c');
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) set(x, y, hh(x >> 2, y >> 1, 11) > 0.6 ? PARED2 : PARED);
  // la ventana alta de arco, al centro-derecha, con la noche o el atardecer
  const VX0 = 178, VX1 = 236, VY0 = 10, VY1 = 92;
  for (let y = VY0; y < VY1; y++) for (let x = VX0; x < VX1; x++) {
    const cx = (VX0 + VX1) / 2, r = (VX1 - VX0) / 2;
    if (y < VY0 + r && Math.hypot(x - cx, y - (VY0 + r)) > r) continue;
    const v = (y - VY0) / (VY1 - VY0);
    let c = mix ? mez(hex('#5a2a6a'), hex('#f08a4a'), v ** 1.3) : mez(hex('#05070f'), hex('#1c2a52'), v);
    if (!mix && hh(x, y, 3) > 0.985) c = hex('#c8d0f0');
    set(x, y, c);
  }
  { const cx = (VX0 + VX1) / 2;                                              // el parteluz y los plomos
    for (let y = VY0 + 6; y < VY1; y++) { set(cx, y, hex('#1a1820')); set(cx + 1, y, hex('#1a1820')); }
    for (let x = VX0; x < VX1; x++) { set(x, 52, hex('#1a1820')); set(x, VY1, hex('#1a1820')); }
    // tejados y una torre de Praga recortados al fondo
    for (let x = VX0; x < VX1; x++) { const h = 6 + Math.round(4 * Math.abs(Math.sin(x * 0.3))) + (x > 214 && x < 220 ? 22 : 0); for (let y = VY1 - h; y < VY1; y++) set(x, y, hex(mix ? '#2a1428' : '#06070c')); }
    halo(cx, 60, 60, 40, mix ? hex('#ff9a5a') : hex('#3a4a80'), mix ? 0.25 : 0.18);
  }
  // las librerías a izquierda y derecha, con lomos
  const lomos = (x0, x1, y0, y1) => {
    for (let fila = y0; fila < y1; fila += 18) {
      for (let x = x0; x < x1; x++) set(x, fila, hex('#1e140e'));
      let x = x0 + 1, k = 0;
      while (x < x1 - 2) {
        const w = 2 + Math.floor(hh(x, fila, 4) * 3), h = 12 + Math.floor(hh(x, fila, 5) * 5); k++;
        const col = mix ? [hex('#8a2a2a'), hex('#2a4a8a'), hex('#3a6a3a'), hex('#8a6a2a'), hex('#5a2a6a')][k % 5] : [hex('#1a1612'), hex('#221a14'), hex('#16141a')][k % 3];
        for (let yy = fila - h; yy < fila; yy++) for (let xx = x; xx < x + w && xx < x1; xx++) set(xx, yy, xx === x ? mez(col, K, 0.4) : col);
        if (hh(x, fila, 6) > 0.5) set(x + 1, fila - h + 3, mix ? hex('#e8c060') : hex('#4a3a20'));
        x += w + (hh(x, fila, 7) > 0.85 ? 3 : 0);
      }
    }
  };
  lomos(0, 168, 26, 120); lomos(246, 320, 26, 120);
  if (mix) for (let y = 0; y < 120; y++) for (let x = 0; x < W; x++) if (x < VX0 || x >= VX1) tinte(x, y, PARED, 0.45);
  // 2 · la mesa, en perspectiva, de nogal con su tapete
  P([[0, 118], [320, 112], [320, 180], [0, 180]], (x, y) => (hh(x >> 3, y, 2) > 0.5 ? hex('#2c1c12') : hex('#22160e')));
  P([[96, 124], [320, 118], [320, 180], [70, 180]], (x, y) => mez(hex(mix ? '#1e4a34' : '#0e2418'), hex(mix ? '#2a5a40' : '#14301e'), hh(x >> 2, y >> 2, 3)));
  // 3 · la lámpara de banquero: pantalla verde y su cono de luz sobre el libro
  const LX = 256, LY = 70;
  linea(LX, LY + 6, LX, 118, hex('#6a5020')); P([[LX - 10, 118], [LX + 10, 118], [LX + 7, 114], [LX - 7, 114]], hex('#8a6a2a'));
  P([[LX - 22, LY + 8], [LX + 22, LY + 8], [LX + 16, LY - 2], [LX - 16, LY - 2]], hex(mix ? '#2a8a4a' : '#1a5a30'));
  for (let x = LX - 21; x < LX + 22; x++) set(x, LY + 8, ORO2);
  for (let y = LY + 9; y < H; y++) for (let x = 110; x < W; x++) {
    const d = (y - LY) / (H - LY), centro = LX - 30 * d, ancho = 18 + d * 80, k = 1 - Math.abs(x - centro) / ancho;
    if (k > 0) tinte(x, y, N.AMBAR, 0.30 * k ** 1.2);
  }
  // 4 · el manuscrito abierto: dos páginas de vitela, el lomo, la planta y los renglones de signos en oro
  const BX0 = 122, BX1 = 304, BY0 = 106, BY1 = 172, LOMO = (BX0 + BX1) / 2, PC = Math.round((BX0 + LOMO) / 2);
  P([[BX0, BY0 + 2], [LOMO, BY0], [BX1, BY0 + 2], [BX1 + 4, BY1], [LOMO, BY1 + 3], [BX0 - 4, BY1]], hex('#3a2a1a'));    // la tapa
  const pagina = (x0, x1) => P([[x0, BY0 + 3], [x1, BY0 + 1], [x1 + 2, BY1 - 1], [x0 - 2, BY1 + 1]], (x, y) => {
    let c = mez(hex('#e8d8b0'), hex('#c8b088'), hh(x >> 2, y >> 2, 9) * 0.5 + Math.abs(x - LOMO) / 300);
    if (hh(x >> 3, y >> 3, 12) > 0.86) c = mez(c, hex('#a8885a'), 0.4);       // manchas
    return c;
  });
  pagina(BX0 + 1, LOMO - 1); pagina(LOMO + 1, BX1 - 1);
  for (let y = BY0 + 1; y < BY1 + 2; y++) { set(LOMO, y, hex('#8a6a40')); set(LOMO - 1, y, mez(hex('#c8b088'), K, 0.3)); }
  // la planta imposible en la página de la izquierda: raíz con patas, tallo y hojas en espiral
  const PV = mix ? hex('#3a8a3a') : hex('#6a5a2a'), PV2 = mix ? hex('#5ab04a') : hex('#8a7a3a'), RA = mix ? hex('#8a5a2a') : hex('#5a4228'), FL = mix ? hex('#c83a3a') : ORO;
  elipse(PC, 160, 9, 5, RA);
  for (const [a, b] of [[-10, 5], [-4, 7], [4, 7], [10, 5]]) linea(PC + a * 0.4, 163, PC + a, 163 + b, RA);
  for (let k = 0; k < 40; k++) { set(PC + Math.round(Math.sin(k * 0.2) * 3), 155 - k, PV); set(PC + 1 + Math.round(Math.sin(k * 0.2) * 3), 155 - k, PV); }
  for (let k = 4, i = 0; k < 36; k += 6, i++) { const lado = i % 2 ? 1 : -1, x0 = PC + Math.round(Math.sin(k * 0.2) * 3), y0 = 155 - k;
    elipse(x0 + lado * 8, y0 - 1, 8, 3, k % 4 ? PV2 : PV); }
  for (const [a, b] of [[0, -3], [-3, 0], [3, 0], [0, 3]]) elipse(PC + a, 113 + b, 2.4, 2.4, FL);
  if (mix) { elipse(PC - 24, 128, 4, 4, hex('#2a5ab0')); elipse(PC + 24, 138, 3, 3, hex('#2a5ab0')); }
  // los renglones de signos inventados: bucles «o», rizos «9», «gallows» altos; en oro, que brillan
  const signo = (x, y, k, c) => {
    const tipo = Math.floor(hh(k, 1, 21) * 5);
    if (tipo === 0) { set(x, y, c); set(x + 1, y - 1, c); set(x + 2, y, c); set(x + 1, y + 1, c); }             // bucle
    else if (tipo === 1) { set(x, y, c); set(x + 1, y - 1, c); set(x + 2, y, c); set(x + 2, y + 1, c); set(x + 1, y + 2, c); }   // rizo
    else if (tipo === 2) { for (let j = -4; j <= 1; j++) set(x + 1, y + j, c); set(x, y - 2, c); set(x + 2, y - 3, c); set(x + 3, y - 4, c); set(x + 2, y + 1, c); set(x + 3, y, c); }   // gallows: palo alto, cruzado por un trazo inclinado y con su cola (no es ninguna letra)
    else if (tipo === 3) { set(x, y + 1, c); set(x + 1, y, c); set(x + 2, y, c); set(x + 3, y + 1, c); }       // arco
    else { set(x, y, c); set(x, y + 1, c); set(x + 1, y + 1, c); }                                            // gancho
  };
  let k = 0;
  for (let y = BY0 + 8; y < BY1 - 4; y += 6) {
    let x = LOMO + 6;
    while (x < BX1 - 8) { const c = Math.hypot(x - 262, y - 140) < 26 ? ORO : mez(hex('#4a2e14'), hex('#6a4420'), hh(x, y, 4)); signo(x, y, ++k, c); x += 4 + (hh(k, 3, 21) > 0.75 ? 4 : 1); }
  }
  for (let y = BY0 + 8; y < BY0 + 14; y += 6) { let x = BX0 + 6; while (x < PC - 14) { signo(x, y, ++k, hex('#4a2e14')); x += 5; } }
  halo(LOMO + 46, 140, 62, 28, ORO, 0.24, 1.1);
  for (const [sx, sy] of [[238, 132], [262, 146], [228, 154], [276, 128]]) { set(sx, sy, ORO2); set(sx - 1, sy, ORO); set(sx + 1, sy, ORO); set(sx, sy - 1, ORO); set(sx, sy + 1, ORO); }
  // 5 · la lupa sobre los signos: aro de latón, cristal que agranda y mango
  const UX = 262, UY = 140, UR = 16;
  for (let y = UY - UR; y <= UY + UR; y++) for (let x = UX - UR; x <= UX + UR; x++) { const d = Math.hypot(x - UX, y - UY); if (d < UR - 1.5) tinte(x, y, hex('#fff6d8'), 0.18); else if (d < UR + 0.5) set(x, y, hex('#b8903a')); }
  signo(UX - 6, UY, 99, ORO2); signo(UX - 1, UY - 1, 100, ORO2); signo(UX + 4, UY, 101, ORO2);
  for (let i = 0; i < 3; i++) linea(UX + 9 + i, UY + 9, UX + 26 + i, UY + 22, hex('#3a2416'));
  set(UX - 6, UY - 7, hex('#ffffff')); set(UX - 5, UY - 8, hex('#ffffff'));
  // 6 · el hombre de espaldas que se inclina sobre el libro, recortado por el oro
  halo(110, 110, 70, 50, mix ? hex('#ff9a5a') : N.AMBAR, 0.14, 1.0);
  N.hombre({ x: 64, base: 204, s: 0.95 });
  N.filo({ x0: 6, x1: 120, y0: 40, y1: H, lado: 'der', yClaro: 140, color: '#c08040', claro: '#ffd890' });
  N.filoSup({ x0: 34, x1: 84, y0: 46, y1: 74, color: '#e0a050', f: 0.6 });
  N.filo({ x0: 0, x1: 80, y0: 70, y1: H, lado: 'izq', yClaro: 100, color: mix ? '#7a4a90' : '#4a5c96', claro: mix ? '#b07ad0' : '#7a90d0', doble: false });
  // 7 · el año y el grano
  N.cifra('1404', 62, 32, { tam: 22 });
  N.granoVineta(mix ? { cx: 190, cy: 100, rx: 240, ry: 150, desde: 0.85, max: 0.4, grano: 0.04 } : { cx: 200, cy: 110, rx: 230, ry: 140, desde: 0.65, max: 0.65 });
}
