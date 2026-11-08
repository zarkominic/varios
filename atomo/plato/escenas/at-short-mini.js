// AT-SHORT-MINI · las miniaturas verticales de los tres Shorts del ep26, en los dos estilos de la prueba A/B (noir e
// intermedia). Se pintan a 320×180 y producir/short las recorta al centro (x 110–211 de 320) y las escala a 1080×1920:
// todo lo importante va en esa franja.
//   pintarShort(N, { n: 1 | 2 | 3, mix: false | true })
//   1 · el entierro (1983): un camión volquete de espaldas vacía cartuchos en la fosa bajo el foco.
//   2 · las cinco semanas (1982): de espaldas, el programador ante su terminal de noche; en la pared, un calendario con
//       un «5» grande y hojas que vuelan; tazas de café.
//   3 · la excavación (2014): el cazo de una excavadora levanta del fondo una caja de cartucho, bajo la luz de obra.
// mix: atardecer saturado y objetos de colores (la «intermedia»); sin mix: noche y un solo acento ámbar (la noir).
export function pintarShort(N, { n = 1, mix = false } = {}) {
  const { W, H, K, hex, set, get, hh, tinte, mez, poligono: P, halo, linea, SIL } = N;
  const AC = N.AMBAR, AC2 = N.AMBAR2;
  // ── el cielo y el horizonte ──
  if (mix) {
    N.cielo({ cx: 160, cy: 118, r: 210, colores: ['#2a1848', '#8a3a68', '#f08a4a'], estrellas: 24, altoEstrellas: 40, estrella: ['#ffffff', '#c8a8e8'] });
    for (let y = 70; y < 112; y++) for (let x = 0; x < W; x++) tinte(x, y, hex('#ffc070'), 0.5 * ((y - 70) / 42) ** 1.5);
  } else {
    N.cielo({ cx: 160, cy: 110, r: 220, colores: ['#05070f', '#0e1430', '#222c4c'], estrellas: 120, altoEstrellas: 100 });
  }
  const suelo = (y0, a, b, c) => {
    for (let y = y0; y < H; y++) for (let x = 0; x < W; x++) {
      const d = (y - y0) / (H - y0); let col = mez(hex(a), hex(b), d * 0.8);
      if (hh(x >> 1, y >> 1, 7) > 0.92) col = mez(col, hex(c), 0.6);
      set(x, y, col);
    }
  };
  const mesetas = (base) => {
    const M1 = hex(mix ? '#4a2a4a' : '#0b0d16'), BOR = hex(mix ? '#e89a6a' : '#1a1f33');
    for (let x = 0; x < W; x++) {
      const a = Math.round(base - 14 * (0.55 + 0.45 * Math.sin(x * 0.021 + 1.3) * Math.sin(x * 0.007 + 2.6)));
      for (let y = a; y < base + 4; y++) set(x, y, M1);
      set(x, a, BOR);
    }
  };
  const COLS = mix ? [hex('#2a2a32'), hex('#b8322a'), hex('#2a5ab0'), hex('#d8a020')] : [hex('#1a1b22'), hex('#24252e'), hex('#2e2f3a'), hex('#3a3b46')];
  const ETI = mix ? 0.22 : 0.55, ETIC = hex(mix ? '#f0e0c0' : '#4a3e2c');
  // un cartucho: estrías de agarre arriba, etiqueta, canto claro; modo 1 tumbado, 0 de pie
  const cartucho = (cx, cy, w, h, col, modo = 1) => {
    const ww = modo ? w : h, hhh = modo ? h : w;
    for (let y = 0; y < hhh; y++) for (let x = 0; x < ww; x++) {
      const px = cx + x - (ww >> 1), py = cy + y - hhh;
      let c = col;
      if (y === 0) c = mez(col, hex('#7a7a88'), 0.55);
      else if (y <= 2 && x % 2 === 0) c = mez(col, K, 0.45);
      else if (x > 0 && x < ww - 1 && y > 3 && y < hhh - 1) c = mez(col, ETIC, ETI);
      if (x === 0 || x === ww - 1) c = mez(c, K, 0.4);
      set(px, py, c);
    }
  };
  const montonCartuchos = (x0, x1, y0, y1, semilla, tam = 1) => {
    let s = semilla;
    for (let fila = 0; fila < 7; fila++) for (let i = 0; i < 12; i++) {
      s++;
      const u = (i + hh(s, 1, 2) * 0.9) / 12, v = (fila + hh(s, 2, 2) * 0.8) / 7;
      const cx = Math.round(x0 + (x1 - x0) * u), cy = Math.round(y0 + (y1 - y0) * v);
      const w = Math.round((8 + v * 5) * tam), h = Math.round((6 + v * 3) * tam);
      cartucho(cx, cy, w, h, COLS[Math.floor(hh(s, 4, 2) * 4)], hh(s, 5, 2) < 0.6 ? 1 : 0);
    }
  };
  const brillos = (x0, x1, y0, y1) => {
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const c = get(x, y), up = get(x, y - 1);
      const l = ((c >>> 16) & 255) + ((c >>> 8) & 255) + (c & 255), lu = ((up >>> 16) & 255) + ((up >>> 8) & 255) + (up & 255);
      if (l > 260 && lu < l - 60 && hh(x, y, 13) > 0.55) set(x, y, mez(c, AC2, 0.8));
    }
  };
  const foco = (px, py, haciaX, x0 = 60) => {
    for (let y = py; y < 128; y++) { set(px, y, hex('#0a0b10')); set(px + 1, y, hex('#12131a')); }
    P([[px - 8, py - 3], [px + 3, py - 4], [px + 3, py + 3], [px - 7, py + 4]], hex('#14161c'));
    for (let x = px - 7; x <= px + 2; x++) set(x, py + 4, AC2);
    for (let y = py + 5; y < H; y++) for (let x = x0; x < W; x++) {
      const d = (y - py) / (H - py), centro = px + (haciaX - px) * d, ancho = 4 + d * 70;
      const k = 1 - Math.abs(x - centro) / ancho;
      if (k > 0) tinte(x, y, AC, 0.32 * k ** 1.3 * (0.6 + 0.4 * d));
    }
    halo(px - 2, py + 4, 22, 10, AC, 0.5);
  };

  if (n === 1) {
    // ── 1 · el entierro: el volquete vacía cartuchos en la fosa ──
    mesetas(98);
    suelo(100, mix ? '#3a2230' : '#0a0b10', mix ? '#6a3e28' : '#1a1612', mix ? '#8a5a3a' : '#2a241c');
    halo(160, 110, 90, 34, AC, 0.28, 1.1);
    // la fosa
    P([[96, 132], [226, 128], [236, 180], [88, 180]], (x, y) => mez(hex(mix ? '#1a0e10' : '#040405'), hex(mix ? '#2a1810' : '#0c0a08'), hh(x >> 2, y >> 2, 5) * 0.6));
    montonCartuchos(98, 232, 140, 182, 3, 1.1);
    // el volquete, de espaldas, con la caja levantada: cartuchos que caen por el borde
    const V = hex('#07080c');
    P([[124, 128], [196, 128], [196, 112], [124, 112]], V);                     // el chasis y la trasera
    P([[118, 112], [202, 112], [196, 64], [126, 76]], V);                       // la caja levantada
    for (let x = 128; x < 194; x += 6) linea(x, 108, x + 2, 80, hex('#14161e'));
    for (const rx of [130, 186]) { P([[rx - 9, 140], [rx + 9, 140], [rx + 9, 126], [rx - 9, 126]], V); }
    for (let k = 0; k < 14; k++) {                                              // la cascada de cartuchos
      const cx = 132 + Math.floor(hh(k, 1, 31) * 58), cy = 114 + Math.floor(hh(k, 2, 31) * 24);
      cartucho(cx, cy, 9, 6, COLS[k % 4], hh(k, 3, 31) > 0.5 ? 1 : 0);
    }
    for (const lx of [128, 192]) { set(lx, 118, hex('#ff3a2a')); halo(lx, 118, 5, 3, hex('#ff3a2a'), 0.4); }   // los pilotos
    N.filoSup({ x0: 118, x1: 204, y0: 60, y1: 130, color: mix ? '#f0a060' : '#c08040', f: 0.6 });
    foco(214, 40, 160, 90);
    brillos(88, 236, 112, 180);
    N.cifra('1983', 160, 20, { tam: 20 });
  } else if (n === 2) {
    // ── 2 · las cinco semanas: el programador de espaldas ante la terminal, el calendario con el «5» ──
    const PARED = hex(mix ? '#3a2a4a' : '#0c0e16'), PARED2 = hex(mix ? '#46324e' : '#141826');
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) set(x, y, hh(x >> 2, y >> 1, 11) > 0.6 ? PARED2 : PARED);
    // la ventana de noche (o de atardecer) a la derecha, con la ciudad
    for (let y = 18; y < 92; y++) for (let x = 196; x < 246; x++) set(x, y, mix ? mez(hex('#f08a4a'), hex('#5a2a5a'), (92 - y) / 74) : mez(hex('#1c2a52'), hex('#05070f'), (92 - y) / 74));
    for (let k = 0; k < 9; k++) { const bx = 198 + k * 5 + Math.floor(hh(k, 1, 4) * 3), bh = 14 + Math.floor(hh(k, 2, 4) * 30); for (let y = 92 - bh; y < 92; y++) for (let x = bx; x < bx + 5; x++) set(x, y, (y % 4 === 0 && x % 2 === 0 && hh(x, y, 5) > 0.5) ? AC2 : hex('#0a0b12')); }
    for (let y = 16; y < 94; y++) { set(195, y, hex('#1a1c26')); set(246, y, hex('#1a1c26')); }
    for (let x = 195; x < 247; x++) { set(x, 16, hex('#1a1c26')); set(x, 93, hex('#1a1c26')); set(x, 54, hex('#1a1c26')); }
    // el calendario grande, con el «5» en rojo/acento y hojas que vuelan
    P([[130, 22], [178, 22], [178, 76], [130, 76]], hex(mix ? '#f0e8d8' : '#c8bca4'));
    P([[130, 22], [178, 22], [178, 32], [130, 32]], hex(mix ? '#b8322a' : '#6a2a20'));
    for (let x = 136; x < 176; x += 6) for (let y = 38; y < 72; y += 6) if (hh(x, y, 2) > 0.2) { set(x, y, hex('#8a8070')); set(x + 1, y, hex('#8a8070')); }
    N.cifra('5', 154, 50, { tam: 20, rampa: mix ? [hex('#ff4a3a'), hex('#d8322a'), hex('#a02018'), hex('#601010')] : N.HUESO });
    for (let k = 0; k < 7; k++) {                                               // las hojas que vuelan
      const hx = 120 + Math.floor(hh(k, 1, 8) * 90), hy = 12 + Math.floor(hh(k, 2, 8) * 50), r = hh(k, 3, 8) > 0.5;
      P(r ? [[hx, hy], [hx + 9, hy - 2], [hx + 10, hy + 6], [hx + 1, hy + 8]] : [[hx, hy], [hx + 8, hy + 2], [hx + 7, hy + 10], [hx - 1, hy + 8]], hex(mix ? '#e8dcc8' : '#8a8274'));
    }
    // la mesa y la terminal con su pantalla verde (el único brillo frío), tazas de café
    P([[60, 130], [260, 130], [270, 180], [50, 180]], (x, y) => (hh(x >> 3, y, 2) > 0.5 ? hex('#2c1e16') : hex('#1e1410')));
    P([[132, 92], [190, 92], [192, 132], [130, 132]], hex('#2a2a2e'));
    P([[138, 98], [184, 98], [184, 124], [138, 124]], hex('#0a1a0e'));
    for (let y = 102; y < 122; y += 3) for (let x = 141; x < 141 + 8 + Math.floor(hh(y, 1, 6) * 34); x++) if (x % 2) set(x, y, hex('#5aff8a'));
    halo(161, 111, 50, 30, hex('#5aff8a'), 0.18);
    for (const [cx, cy] of [[206, 136], [218, 140], [100, 138]]) { P([[cx - 4, cy - 8], [cx + 4, cy - 8], [cx + 4, cy], [cx - 4, cy]], hex(mix ? '#d8d0c0' : '#6a6458')); set(cx + 5, cy - 5, hex('#6a6458')); }
    halo(100, 120, 40, 20, AC, 0.4);                                            // el flexo
    linea(86, 130, 92, 104, hex('#1a1a20')); P([[86, 98], [104, 98], [100, 106], [90, 106]], hex('#14161c'));
    // el programador de espaldas, sin sombrero, recortado contra la pantalla
    N.hombre({ x: 160, base: 220, s: 0.78, sombrero: false });
    N.filo({ x0: 110, x1: 210, y0: 120, y1: H, lado: 'der', yClaro: 150, color: '#3aa060', claro: '#8affb0' });
    N.filo({ x0: 110, x1: 210, y0: 120, y1: H, lado: 'izq', yClaro: 150, color: mix ? '#c08040' : '#8a6030', claro: '#ffd890', doble: false });
    N.cifra('1982', 160, 8, { tam: 14 });
  } else {
    // ── 3 · la excavación: el cazo levanta una caja de cartucho ──
    mesetas(94);
    suelo(96, mix ? '#4a2a2a' : '#0c0b10', mix ? '#7a4a2a' : '#1e1812', mix ? '#9a6a3a' : '#2e2618');
    halo(160, 120, 100, 40, AC, 0.26, 1.1);
    // la pared de la fosa con capas de basura y periódicos
    for (let y = 110; y < H; y++) for (let x = 60; x < 260; x++) {
      const capa = Math.floor((y + Math.sin(x * 0.08) * 2) / 7) % 3;
      let c = [hex(mix ? '#5a3a2a' : '#1a1410'), hex(mix ? '#6a4a30' : '#221a12'), hex(mix ? '#4a3024' : '#16110e')][capa];
      if (hh(x >> 1, y >> 1, 9) > 0.9) c = hex(mix ? '#c8bca0' : '#4a4438');      // trozos de periódico
      set(x, y, c);
    }
    montonCartuchos(70, 250, 150, 182, 11, 1);
    // el brazo de la excavadora entra desde arriba a la derecha y el cazo, en el centro, con la caja encima
    const V = hex('#07080c');
    for (let k = 0; k < 5; k++) { linea(300, 10 + k, 210, 40 + k, V); linea(210, 40 + k, 176, 96 + k, V); }
    P([[146, 96], [190, 92], [196, 120], [150, 126]], V);                       // el cazo
    for (let x = 148; x < 196; x += 6) P([[x, 124], [x + 4, 124], [x + 2, 130]], V);   // los dientes
    // la caja del cartucho (con su ventana) que asoma del cazo, bien iluminada
    P([[150, 70], [182, 66], [186, 98], [154, 102]], hex(mix ? '#d8a020' : '#3a3428'));
    P([[156, 76], [178, 73], [180, 88], [158, 91]], hex(mix ? '#2a5ab0' : '#1a1b22'));
    cartucho(169, 88, 14, 9, COLS[1], 1);
    N.filoSup({ x0: 140, x1: 200, y0: 60, y1: 130, color: mix ? '#ffc070' : '#d8944a', f: 0.7 });
    halo(168, 84, 40, 30, AC2, 0.3);
    for (let k = 0; k < 10; k++) { const px = 140 + Math.floor(hh(k, 1, 7) * 60), py = 100 + Math.floor(hh(k, 2, 7) * 40); set(px, py, AC2); }  // polvo que cae
    foco(110, 30, 160, 40);
    brillos(60, 260, 140, 180);
    N.cifra('2014', 160, 20, { tam: 20 });
  }
  N.granoVineta(mix ? { cx: 160, cy: 100, rx: 160, ry: 150, desde: 0.85, max: 0.4, grano: 0.04 } : { cx: 160, cy: 96, rx: 140, ry: 130, desde: 0.6, max: 0.65 });
}
