// NOIR-MINI · ayudas comunes de las miniaturas en estilo noir (aprobado en dc-miniatura-noir.html): pixel art de cine
// negro para un público de 25–35 años. Ningún chibi ni mascota con cara; personas en silueta de proporción adulta;
// paleta oscura con un solo acento (rojo o ámbar); contraluz con filo, persianas, humo, grano y viñeta; sin palabras,
// solo cifras (R.numero con la rampa blanco hueso, nunca dorado brillante).
//
//   import { preparar } from '/atomo/plato/escenas/noir-mini.js';
//   const N = await preparar(document.getElementById('lienzo'));
//   const { R, W, H, K, hex, set, get, tinte, mez, hh, trama, poligono, elipse, halo, linea, SIL } = N;
//   N.cielo({...}); N.luna({ ..., mira: {...} }); N.persiana({...}); N.hombre({ x, base, s }); N.filo({...});
//   N.filoSup({...}); N.humo({...}); N.expediente({...}); N.selloRojo({...}); N.tachon(x0, y0, x1, y1);
//   N.esfera(...); N.racimo({...}); N.llama(x, y); N.cifra('1958', x, base); N.granoVineta(); N.listo(dibujar);
//
// Las siluetas se pintan con SIL (dos tonos casi negros); filo y filoSup buscan esos tonos (o los que diga «es») para
// ponerles el borde de luz.
//
// Todas las coordenadas van en el lienzo de 320 × 180. Las verticales (Shorts) ponen lo que cuenta en la columna
// central x 110–210, que es lo que queda al recortar 9:16 (crop=606:1080:657:0).
import { crearRoma } from '/atomo/plato/kits/pixel-roma.js';
import { hex } from '/atomo/plato/kits/pixel-retro.js';

export { hex };
export const W = 320, H = 180;
export const K = hex('#05060a');
// los dos tonos de las siluetas (el segundo, un moteado leve de tela)
export const SIL_A = hex('#07080c'), SIL_B = hex('#0e1018');
export const ROJO = hex('#e0282a'), ROJO2 = hex('#7a0c10');
export const AMBAR = hex('#ffb85a'), AMBAR2 = hex('#ffd890');
// rampa de R.numero: blanco hueso con sombra dura
export const HUESO = [hex('#f4f0e4'), hex('#d8d2c2'), hex('#a8a090'), hex('#6a6458')];
export const PAPEL = hex('#e8dcc0'), PAPEL2 = hex('#c8b894');
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

export const mez = (a, b, f) => { let r = 0; for (const sh of [0, 8, 16]) r |= (Math.round(((a >>> sh) & 255) * (1 - f) + ((b >>> sh) & 255) * f) & 255) << sh; return (0xff000000 | r) >>> 0; };
export const hh = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export const trama = (x, y) => (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
// el color de las siluetas, con su moteado
export const SIL = (x, y) => (hh(x >> 1, y >> 1, 4) > 0.85 ? SIL_B : SIL_A);
export const esSil = (c) => c === SIL_A || c === SIL_B;

export async function preparar(lienzo) {
  const R = await crearRoma(lienzo);
  const B = () => R.buf;
  const set = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < W && y >= 0 && y < H) B()[y * W + x] = c; };
  const get = (x, y) => (x >= 0 && x < W && y >= 0 && y < H ? B()[y * W + x] : K);
  const tinte = (x, y, c, f) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < W && y >= 0 && y < H) B()[y * W + x] = mez(B()[y * W + x], c, f); };
  const pinta = (c, x, y) => (typeof c === 'function' ? c(x, y) : c);

  // relleno de un polígono (lista de [x, y]); c es un color o una función (x, y) → color
  const poligono = (P, c) => { let y0 = 1e9, y1 = -1e9; for (const [, y] of P) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    for (let y = Math.max(0, Math.floor(y0)); y <= Math.min(H - 1, Math.ceil(y1)); y++) { const xs = [];
      for (let i = 0; i < P.length; i++) { const [ax, ay] = P[i], [bx, by] = P[(i + 1) % P.length]; if ((ay <= y + 0.5 && by > y + 0.5) || (by <= y + 0.5 && ay > y + 0.5)) xs.push(ax + (y + 0.5 - ay) / (by - ay) * (bx - ax)); }
      xs.sort((a, b) => a - b); for (let i = 0; i + 1 < xs.length; i += 2) for (let x = Math.ceil(xs[i] - 0.5); x <= Math.floor(xs[i + 1] - 0.5); x++) set(x, y, pinta(c, x, y)); } };
  // elipse rellena; c es un color o una función (x, y) → color
  const elipse = (cx, cy, rx, ry, c) => { for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) if (((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1) set(x, y, pinta(c, x, y)); };
  // un brillo suave (halo) que se mezcla hacia c
  const halo = (cx, cy, rx, ry, c, f, pot = 1.2) => { for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); if (d < 1) tinte(x, y, c, f * (1 - d) ** pot); } };
  // una línea de grosor 1 (o una función de pincel)
  const linea = (x0, y0, x1, y1, c, f = 1) => { const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0))); for (let k = 0; k <= n; k++) { const u = k / n, x = Math.round(x0 + (x1 - x0) * u), y = Math.round(y0 + (y1 - y0) * u); if (f >= 1) set(x, y, pinta(c, x, y)); else tinte(x, y, c, f); } };

  // cielo de noche: degradado tramado de tres tonos alrededor de (cx, cy) y estrellas (por encima de altoEstrellas)
  const cielo = ({ cx = 214, cy = 74, r = 170, colores = ['#0a1028', '#1c2a52', '#2c3c6a'], estrellas = 90, altoEstrellas = 120, x0 = 0, x1 = W, y0 = 0, y1 = H, semilla = 0, estrella = ['#ffffff', '#8a9ad0'] } = {}) => {
    const [c0, c1, c2] = colores.map(hex);
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const v = 1 - Math.min(1, Math.hypot(x - cx, y - cy) / r);
      set(x, y, v * 1.4 > trama(x, y) + 0.55 ? c2 : v * 1.4 > trama(x, y) * 0.8 ? c1 : c0); }
    for (let k = 0; k < estrellas; k++) { const x = Math.floor(hh(k + semilla, 1) * W), y = Math.floor(hh(k + semilla, 2) * altoEstrellas); if (x >= x0 && x < x1 && y >= y0 && y < y1) set(x, y, hh(k + semilla, 3) > 0.8 ? hex(estrella[0]) : hex(estrella[1])); }
  };

  // la Luna detallada: halo, disco con luz desde la izquierda, mares, cráteres; mira roja opcional
  // mira: false | { dx, dy, r, brazo, hueco }
  const luna = ({ x: LX = 214, y: LY = 74, r: LR = 62, halo: hr = 18, haloColor = '#c8d4f0', haloF = 0.35, crateres = 30, pal = ['#2a2c38', '#5a5c68', '#8a8c96', '#b8bac2', '#dcdcd8', '#f4f2e8'], mira = false } = {}) => {
    const hc = hex(haloColor);
    for (let y = LY - LR - hr; y <= LY + LR + hr; y++) for (let x = LX - LR - hr; x <= LX + LR + hr; x++) { const d = Math.hypot(x - LX, y - LY);
      if (d > LR && d < LR + hr) tinte(x, y, hc, haloF * (1 - (d - LR) / hr) ** 2); }
    const P = pal.map(hex);
    for (let y = LY - LR; y <= LY + LR; y++) for (let x = LX - LR; x <= LX + LR; x++) { const dx = (x - LX) / LR, dy = (y - LY) / LR, r2 = dx * dx + dy * dy; if (r2 > 1) continue;
      const z = Math.sqrt(1 - r2), luz = Math.max(0, -0.75 * dx - 0.35 * dy + 0.55 * z);
      const mar = (Math.sin(dx * 5.1 + 1) + Math.sin(dy * 4.3 - 2) + Math.sin((dx + dy) * 6.7)) > 0.9 ? 0.22 : 0;
      const l = 0.25 + 0.75 * luz - mar + (hh(x >> 1, y >> 1, 5) - 0.5) * 0.12;
      set(x, y, P[Math.max(0, Math.min(P.length - 1, Math.floor(l * P.length + trama(x, y) - 0.5)))]); }
    const esc = LR / 62;
    for (let k = 0; k < crateres; k++) { const a = hh(k, 7) * 6.283, rr = Math.sqrt(hh(k, 8)) * (LR - 8 * esc), cx = LX + Math.cos(a) * rr, cy = LY + Math.sin(a) * rr, cr = (1.5 + hh(k, 9) * 4) * Math.max(0.5, esc);
      for (let y = Math.floor(cy - cr - 1); y <= cy + cr + 1; y++) for (let x = Math.floor(cx - cr - 1); x <= cx + cr + 1; x++) { const d = Math.hypot(x - cx, y - cy); if (Math.hypot(x - LX, y - LY) >= LR) continue;
        if (d < cr - 0.5) tinte(x, y, K, 0.22); else if (d < cr + 0.8 && (x - cx) + (y - cy) > 0) tinte(x, y, hex('#ffffff'), 0.25); } }
    if (mira) miraRoja({ x: LX + (mira.dx ?? 8), y: LY + (mira.dy ?? -6), r: mira.r ?? 30, brazo: mira.brazo ?? 82, hueco: mira.hueco ?? 8 });
  };
  // la mira: círculo discontinuo, cruz punteada con hueco en el centro y el punto oscuro
  const miraRoja = ({ x, y, r = 30, brazo = 82, hueco = 8, color = ROJO, centro = ROJO2 }) => {
    for (let t = 0; t < 6.283; t += 0.01) { const px = Math.round(x + Math.cos(t) * r), py = Math.round(y + Math.sin(t) * r); if (Math.floor(t * 12) % 2 === 0) set(px, py, color); }
    for (let i = -brazo; i <= brazo; i++) { if (Math.abs(i) < hueco) continue; if ((i & 1) === 0) { set(x + i, y, color); set(x, y + Math.round(i * 0.85), color); } }
    for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) set(x + dx, y + dy, centro);
  };

  // sombras de persiana: bandas en diagonal; «dentro(x, y)» marca la zona de la ventana (sombra más suave) y fuera de ella
  // las franjas de luz se tiñen de «luz»
  const persiana = ({ paso = 14, ancho = 4, pendiente = 0.28, dentro = () => false, fDentro = 0.18, fFuera = 0.5, luz = '#3a4a7a', fLuz = 0.10, x0 = 0, x1 = W, y0 = 0, y1 = H, sombra = K } = {}) => {
    const lc = hex(luz);
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const b = ((y + x * pendiente) % paso), d = dentro(x, y); if (b < ancho) tinte(x, y, sombra, d ? fDentro : fFuera); else if (!d && fLuz) tinte(x, y, lc, fLuz); }
  };

  // un hombre de pie de espaldas, con sombrero de ala y gabardina: «x» es el eje del cuerpo, «base» la línea de abajo y
  // «s» la escala (con x = 88, base = 180, s = 1 es el oficial de la prueba, de 129 px de alto). Devuelve la caja.
  const hombre = ({ x: X = 88, base = 180, s = 1, color = SIL, sombrero = true } = {}) => {
    const T = ([px, py]) => [X + (px - 88) * s, base + (py - 180) * s];
    poligono([[66, 98], [80, 92], [96, 92], [110, 98], [118, 106], [122, 140], [128, 180], [48, 180], [54, 140], [58, 106]].map(T), color);
    poligono([[76, 84], [100, 84], [102, 96], [74, 96]].map(T), color);
    const e = (cx, cy, rx, ry) => { const [a, b] = T([cx, cy]); elipse(a, b, rx * s, ry * s, color); };
    e(88, 78, 10, 11);
    if (sombrero) {
      e(88, 68, 21, 3.6);
      poligono([[76, 68], [77, 54], [82, 51], [88, 53], [94, 51], [99, 54], [100, 68]].map(T), color);
      const [, yc] = T([0, 64]); const [xa] = T([77, 0]), [xb] = T([100, 0]); for (let x = Math.round(xa); x < Math.round(xb); x++) set(x, Math.round(yc), hex('#14161e'));
    }
    const [l, t] = T([48, 51]), [r, b] = T([128, 180]); return { x0: l, y0: t, x1: r, y1: b };
  };

  // filo de luz en el borde de las siluetas (los píxeles SIL_A/SIL_B): por cada fila de y0 a y1 busca el borde del lado
  // «der» (o «izq») dentro de x0..x1; por encima de yClaro usa el tono claro
  const filo = ({ x0 = 41, x1 = 134, y0 = 36, y1 = H, lado = 'der', yClaro = 70, color = '#7a98d8', claro = '#c8d8ff', es = esSil, doble = true } = {}) => {
    const F = hex(color), F2 = hex(claro), dir = lado === 'der' ? -1 : 1;
    for (let y = y0; y < y1; y++) { let xr = -1;
      if (lado === 'der') { for (let x = x1; x >= x0; x--) if (es(get(x, y))) { xr = x; break; } } else { for (let x = x0; x <= x1; x++) if (es(get(x, y))) { xr = x; break; } }
      if (xr >= 0) { set(xr, y, y < yClaro ? F2 : F); if (doble && y % 3) set(xr + dir, y, mez(get(xr + dir, y), F, 0.4)); } }
  };
  // filo por arriba (el ala del sombrero, los hombros): por cada columna x0..x1 el primer píxel de silueta entre y0 e y1
  const filoSup = ({ x0, x1, y0, y1, color = '#7a98d8', f = 0.75, es = esSil } = {}) => {
    const F = hex(color);
    for (let x = x0; x <= x1; x++) for (let y = y0; y < y1; y++) if (es(get(x, y))) { set(x, y, mez(F, get(x, y), 1 - f)); break; }
  };

  // humo que sube en espiral desde (x, y)
  const humo = ({ x, y, alto = 60, deriva = 18, amp = 5, color = '#9aa8c8', f = 0.45, f2 = 0.25, n = 40, ondas = 9 }) => {
    const c = hex(color);
    for (let k = 0; k < n; k++) { const u = k / n, px = Math.round(x + Math.sin(u * ondas) * amp + u * deriva), py = Math.round(y - u * alto); tinte(px, py, c, f * (1 - u)); tinte(px + 1, py, c, f2 * (1 - u)); }
  };

  // el expediente abierto en perspectiva (dos hojas), con renglones tachados en negro y el sello rojo; dx, dy lo desplazan
  // (en la prueba va con dx = dy = 0, sobre la mesa de abajo a la derecha)
  const expediente = ({ dx = 0, dy = 0, sello = true, tinta = '#8a7a60' } = {}) => {
    const T = ([x, y]) => [x + dx, y + dy], ti = hex(tinta);
    poligono([[196, 150], [250, 148], [254, 176], [190, 178]].map(T), (x, y) => (y > 172 + dy ? PAPEL2 : PAPEL));
    poligono([[250, 148], [304, 150], [312, 178], [254, 176]].map(T), (x, y) => (y > 172 + dy ? PAPEL2 : PAPEL));
    for (let r = 0; r < 6; r++) { const y = 154 + r * 4 + dy; for (let x = 198 + r; x < 246 - (r % 2) * 10; x++) set(x + dx, y, r === 1 || r === 4 ? K : ti);
      for (let x = 258; x < 300 - (r % 3) * 7; x++) set(x + dx, y + 1, r === 2 || r === 3 ? K : ti); if (r === 1 || r === 4) for (let x = 198 + r; x < 236; x++) set(x + dx, y + 1, K); }
    if (sello) selloRojo({ x: 288 + dx, y: 166 + dy });
  };
  // el sello: dos anillos achatados y la barra
  const selloRojo = ({ x, y, r = 8, achate = 0.6, color = ROJO, f = 0.85 }) => {
    for (let t = 0; t < 6.283; t += 0.03) for (const rr of [r, r + 1]) tinte(Math.round(x + Math.cos(t) * rr), Math.round(y + Math.sin(t) * rr * achate), color, f);
    for (let i = -7; i < 8; i++) tinte(x + i, y, color, f);
  };

  // una cifra en blanco hueso con sombra dura (R.numero); centrada en x
  const cifra = (txt, x, y, { tam = 16, centro = true, rampa = HUESO } = {}) => R.numero(txt, x, y, { tam, centro, rampa });
  // una raya roja que tacha (de grosor g), con un poco de temblor de mano
  const tachon = (x0, y0, x1, y1, { g = 2, color = ROJO, oscuro = ROJO2 } = {}) => {
    const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0));
    for (let k = 0; k <= n; k++) { const u = k / n, x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u + Math.round((hh(k, 3, 9) - 0.5) * 0.9);
      for (let j = 0; j < g; j++) set(x, y + j, color); set(x, y + g, oscuro); }
  };

  // grano de película y viñeta (centro cx, cy; radios rx, ry; empieza en «desde»)
  const granoVineta = ({ cx = 170, cy = 90, rx = 200, ry = 120, desde = 0.6, fuerza = 1.6, max = 0.75, grano = 0.07 } = {}) => {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const v = Math.hypot((x - cx) / rx, (y - cy) / ry); if (v > desde) tinte(x, y, K, Math.min(max, (v - desde) * fuerza)); const g = hh(x, y, 13); if (g > 1 - grano) tinte(x, y, hex('#ffffff'), 0.06); else if (g < grano) tinte(x, y, K, 0.12); }
  };

  // una esfera sombreada (luz desde lx, ly, normalizada), con su brillo especular: para uvas, bolas, pomos
  const esfera = (cx, cy, r, pal, { lx = -0.6, ly = -0.7, brillo = '#fff0d0', fb = 0.9, borde = K } = {}) => {
    const P = pal.map((c) => (typeof c === 'string' ? hex(c) : c)), Bc = hex(brillo), lz = Math.sqrt(Math.max(0, 1 - lx * lx - ly * ly));
    for (let y = Math.floor(cy - r - 1); y <= cy + r + 1; y++) for (let x = Math.floor(cx - r - 1); x <= cx + r + 1; x++) {
      const dx = (x + 0.5 - cx) / r, dy = (y + 0.5 - cy) / r, r2 = dx * dx + dy * dy; if (r2 > 1) continue;
      if (r2 > 0.86 && borde !== null) { set(x, y, mez(get(x, y), borde, 0.7)); continue; }
      const z = Math.sqrt(1 - r2), l = Math.max(0, dx * lx + dy * ly + z * lz);
      set(x, y, P[Math.max(0, Math.min(P.length - 1, Math.floor(l * l * P.length + trama(x, y) - 0.5)))]);
      const e = Math.hypot(dx - lx * 0.55, dy - ly * 0.55); if (e < 0.22) tinte(x, y, Bc, fb * (1 - e / 0.22)); }
  };
  // un racimo de uvas realista (sin cara): un triángulo invertido de granos que se tapan, el raspón y un tallo; cx, cy es
  // el centro de la fila de arriba; s la escala (r de los granos = 3.6 × s). Luz desde la izquierda y arriba.
  const racimo = ({ x: cx, y: cy, s = 1, pal = ['#14060f', '#2a0c22', '#47163a', '#6a2a56', '#94507a'], brillo = '#ffe0b0', filas = [5, 6, 5, 5, 4, 3, 2, 1], lx = -0.6, ly = -0.7, semilla = 1 } = {}) => {
    const r = 3.6 * s, granos = [];
    filas.forEach((n, f) => { const lado = (hh(f, 9, semilla) - 0.5) * r * 0.9; for (let i = 0; i < n; i++) { const x = cx + lado + (i - (n - 1) / 2) * r * 1.55 + (hh(f, i, semilla) - 0.5) * r * 0.9, y = cy + f * r * 1.3 + (hh(i, f, semilla + 3) - 0.5) * r * 0.7;
      granos.push([x, y, r * (0.8 + hh(i + 7, f, semilla) * 0.32), hh(i, f, semilla + 11)]); } });
    // el tallo y el raspón asoman por arriba
    const TALLO = hex('#3a2a16'), TALLO2 = hex('#6a5030');
    linea(cx, cy - r * 0.6, cx + 2 * s, cy - r * 2.4, TALLO); linea(cx + 1, cy - r * 0.6, cx + 2 * s + 1, cy - r * 2.4, TALLO2);
    linea(cx + 2 * s, cy - r * 2.4, cx + 5 * s, cy - r * 2.9, TALLO);
    // primero los de atrás (los más hondos, más oscuros), luego los de delante
    granos.sort((a, b) => a[3] - b[3]);
    const Pal = pal.map(hex);
    for (const [x, y, rr, z] of granos) { const p = z < 0.45 ? [Pal[0], Pal[0], Pal[1], Pal[2], Pal[3]] : Pal; esfera(x, y, rr, p, { lx, ly, brillo, fb: z < 0.45 ? 0.45 : 0.95 }); }
    return granos;
  };
  // una llama de vela (o de mechero): gota ámbar con el corazón claro y su halo
  const llama = (x, y, s = 1, { halo: hf = 0.35, rh = 26 } = {}) => {
    halo(x, y - 2 * s, rh * s, rh * s, AMBAR, hf, 1.6);
    poligono([[x, y - 7 * s], [x + 2 * s, y - 2 * s], [x + 1.6 * s, y + 0.6 * s], [x - 1.6 * s, y + 0.6 * s], [x - 2 * s, y - 2 * s]], hex('#ff9a30'));
    poligono([[x, y - 4.5 * s], [x + 1 * s, y - 1.4 * s], [x, y + 0.2 * s], [x - 1 * s, y - 1.4 * s]], hex('#fff2c8'));
  };

  const listo = (dibujar) => { window.__frame = async (t) => { dibujar(t); R.presentar(); }; window.__listo = true; };

  return { R, W, H, K, hex, B, set, get, tinte, mez, hh, trama, poligono, elipse, halo, linea, SIL, SIL_A, SIL_B, esSil, ROJO, ROJO2, AMBAR, AMBAR2, HUESO, PAPEL, PAPEL2,
    cielo, luna, miraRoja, persiana, hombre, filo, filoSup, humo, expediente, selloRojo, cifra, tachon, granoVineta, esfera, racimo, llama, listo };
}
