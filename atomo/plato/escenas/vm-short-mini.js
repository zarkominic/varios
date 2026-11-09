// VM-SHORT-MINI · las miniaturas verticales de los tres Shorts del ep25, en los dos estilos de la prueba (noir e
// intermedia). Se pintan a 320×180 y se recortan al centro (x 110–211) para 1080×1920: lo importante va en esa franja.
//   pintarShortVM(N, { n: 1 | 2 | 3, mix })
//   1 · el libro que nadie lee (1404): una página de cerca, de pie, con la planta imposible y los signos en oro.
//   2 · el microscopio de Newbold (1921): el círculo del ocular con las grietas de tinta… y la mosca.
//   3 · la IA que no lo descifra (2019): de espaldas, alguien ante la pantalla de signos con un gran «no» rojo.
// mix: atardecer y colores saturados; sin mix: noche y un solo acento (oro, o rojo en el 3).
export function pintarShortVM(N, { n = 1, mix = false } = {}) {
  const { W, H, K, hex, set, hh, tinte, mez, poligono: P, halo, linea, elipse } = N;
  const ORO = hex('#ffcf6a'), ORO2 = hex('#fff0b8'), TINTA = hex('#4a2e14');
  const PARED = hex(mix ? '#3a2438' : '#0c0d14'), PARED2 = hex(mix ? '#46304a' : '#12141c');
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) set(x, y, hh(x >> 2, y >> 1, 11) > 0.6 ? PARED2 : PARED);
  if (mix) for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) tinte(x, y, hex('#f08a4a'), 0.25 * (y / H) ** 2);
  const signo = (x, y, k, c, s = 1) => {
    const p = (a, b) => { for (let i = 0; i < s; i++) for (let j = 0; j < s; j++) set(x + a * s + i, y + b * s + j, c); };
    const tipo = Math.floor(hh(k, 1, 21) * 5);
    if (tipo === 0) { p(0, 0); p(1, -1); p(2, 0); p(1, 1); }
    else if (tipo === 1) { p(0, 0); p(1, -1); p(2, 0); p(2, 1); p(1, 2); }
    else if (tipo === 2) { for (let j = -4; j <= 1; j++) p(1, j); p(0, -2); p(2, -3); p(3, -4); p(2, 1); p(3, 0); }
    else if (tipo === 3) { p(0, 1); p(1, 0); p(2, 0); p(3, 1); }
    else { p(0, 0); p(0, 1); p(1, 1); }
  };
  if (n === 1) {
    // ── la página del libro, de pie y grande, bajo la luz ──
    halo(160, 100, 80, 90, N.AMBAR, mix ? 0.2 : 0.3, 1.0);
    P([[112, 26], [210, 22], [214, 172], [108, 176]], (x, y) => {
      let c = mez(hex('#e8d8b0'), hex('#c8b088'), hh(x >> 2, y >> 2, 9) * 0.5);
      if (hh(x >> 3, y >> 3, 12) > 0.86) c = mez(c, hex('#a8885a'), 0.4);
      return c;
    });
    for (let y = 24; y < 176; y++) set(110, y, hex('#8a6a40'));
    // la planta imposible, grande
    const PC = 160, PV = mix ? hex('#3a8a3a') : hex('#6a5a2a'), PV2 = mix ? hex('#5ab04a') : hex('#8a7a3a'), RA = mix ? hex('#8a5a2a') : hex('#5a4228');
    elipse(PC, 150, 14, 7, RA);
    for (const a of [-16, -6, 6, 16]) { linea(PC + a * 0.4, 154, PC + a, 166, RA); linea(PC + a * 0.4 + 1, 154, PC + a + 1, 166, RA); }
    for (let k = 0; k < 80; k++) for (let w = 0; w < 3; w++) set(PC + w - 1 + Math.round(Math.sin(k * 0.12) * 5), 144 - k, PV);
    for (let k = 8, i = 0; k < 76; k += 11, i++) { const lado = i % 2 ? 1 : -1, x0 = PC + Math.round(Math.sin(k * 0.12) * 5); elipse(x0 + lado * 13, 143 - k, 13, 5, i % 2 ? PV2 : PV); }
    for (const [a, b] of [[0, -5], [-5, 0], [5, 0], [0, 5]]) elipse(PC + a, 60 + b, 4, 4, mix ? hex('#c83a3a') : ORO);
    // los renglones de signos arriba, en oro
    let k = 0;
    for (let y = 36; y < 52; y += 8) { let x = 118; while (x < 204) { signo(x, y, ++k, ORO, 1); x += 6; } }
    for (const [sx, sy] of [[124, 40], [196, 48], [132, 110], [190, 96]]) { set(sx, sy, ORO2); set(sx - 1, sy, ORO); set(sx + 1, sy, ORO); set(sx, sy - 1, ORO); set(sx, sy + 1, ORO); }
    N.cifra('1404', 160, 8, { tam: 14 });
  } else if (n === 2) {
    // ── el ocular del microscopio: grietas de tinta enormes y la mosca ──
    const CX = 160, CY = 98, RR = 46;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const d = Math.hypot(x - CX, y - CY); if (d < RR) set(x, y, mez(hex(mix ? '#f0e0b8' : '#d8c8a0'), hex(mix ? '#c8a878' : '#8a7858'), (d / RR) ** 2)); else if (d < RR + 6) set(x, y, mez(hex('#b8903a'), hex('#5a4018'), (d - RR) / 6)); }
    // el trazo de tinta grande con sus grietas
    for (let k = 0; k < 90; k++) { const a = k / 90 * Math.PI * 2.6, r = 1 - k / 140, x = CX - 8 + Math.cos(a) * 22 * r, y = CY - 6 + Math.sin(a) * 28 * r; elipse(x, y, 4 * r + 1, 4 * r + 1, TINTA); }   // una espiral de tinta (no es ninguna letra)
    for (let k = 0; k < 6; k++) { const x0 = CX - 20 + k * 7; linea(x0, CY - 30 + (k % 3) * 8, x0 + 3, CY - 20 + (k % 2) * 10, hex(mix ? '#f0e0b8' : '#d8c8a0')); }
    // la mosca, con sus alas
    const MX = CX + 22, MY = CY + 18;
    elipse(MX, MY, 5, 3.5, hex('#1a1a1a')); elipse(MX + 6, MY, 3, 3, hex('#1a1a1a'));
    elipse(MX - 2, MY - 6, 5, 3, hex(mix ? '#a8d8f0' : '#8aa8c0')); elipse(MX + 3, MY - 7, 4, 3, hex(mix ? '#c8e8ff' : '#a8c0d8'));
    set(MX + 7, MY - 1, hex('#c83a2a')); set(MX + 7, MY + 1, hex('#c83a2a'));
    for (const d of [-4, 0, 4]) { linea(MX + d, MY + 3, MX + d - 2, MY + 7, hex('#1a1a1a')); }
    // el anillo de «¡es eso!» alrededor de la mosca
    for (let a = 0; a < 80; a++) { const an = a / 80 * Math.PI * 2; set(Math.round(MX + 2 + Math.cos(an) * 13), Math.round(MY - 1 + Math.sin(an) * 12), mix ? hex('#e83a2a') : ORO); }
    N.cifra('1921', 160, 8, { tam: 14 });
  } else {
    // ── la pantalla de la IA con los signos y el gran «no» ──
    P([[104, 30], [216, 30], [216, 116], [104, 116]], hex('#1a1c24'));
    P([[108, 34], [212, 34], [212, 112], [108, 112]], hex(mix ? '#14284a' : '#0a1220'));
    let k = 0;
    for (let y = 42; y < 108; y += 7) { let x = 114; while (x < 206) { signo(x, y, ++k, hex(mix ? '#8ad0ff' : '#5a8ab0'), 1); x += 6; } }
    halo(160, 72, 70, 50, hex(mix ? '#5ab0ff' : '#3a6a9a'), 0.25);
    // el «no»: círculo rojo tachado
    const NX = 160, NY = 72, NR = 26, ROJ = hex('#e0282a');
    for (let a = 0; a < 200; a++) { const an = a / 200 * Math.PI * 2; for (let w = 0; w < 4; w++) set(Math.round(NX + Math.cos(an) * (NR - w)), Math.round(NY + Math.sin(an) * (NR - w)), ROJ); }
    for (let w = -2; w <= 2; w++) linea(NX - 18 + w, NY - 18, NX + 18 + w, NY + 18, ROJ);
    linea(152, 116, 152, 126, hex('#1a1c24')); linea(168, 116, 168, 126, hex('#1a1c24')); P([[140, 126], [180, 126], [184, 130], [136, 130]], hex('#1a1c24'));
    // la mesa y el investigador de espaldas
    P([[60, 130], [260, 130], [270, 180], [50, 180]], (x, y) => (hh(x >> 3, y, 2) > 0.5 ? hex('#2c1e16') : hex('#1e1410')));
    N.hombre({ x: 160, base: 226, s: 0.8, sombrero: false });
    N.filo({ x0: 110, x1: 210, y0: 120, y1: H, lado: 'der', yClaro: 150, color: mix ? '#5ab0ff' : '#3a6a9a', claro: mix ? '#a8e0ff' : '#7aaad8' });
    N.filo({ x0: 110, x1: 210, y0: 120, y1: H, lado: 'izq', yClaro: 150, color: '#c0402a', claro: '#ff7a5a', doble: false });
    N.cifra('2019', 160, 8, { tam: 14 });
  }
  N.granoVineta(mix ? { cx: 160, cy: 100, rx: 160, ry: 150, desde: 0.85, max: 0.4, grano: 0.04 } : { cx: 160, cy: 96, rx: 140, ry: 130, desde: 0.6, max: 0.65 });
}
