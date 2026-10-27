// Los mapas del episodio 10 con costas de verdad (geo-ov.js, Natural Earth), en el estilo de un mapa de papel de 1947
// sobre la mesa de mando: mar azul grisáceo con el agua somera más clara junto a la costa, tierra color papel con su
// contorno, retícula punteada, rosa de los vientos, y chinchetas que se clavan con su sombra.
//
//   import { albersEEUU, mapaPapel, chincheta } from '/atomo/plato/escenas/ov-mapas.js';
//   const P = albersEEUU([20, 10, 300, 170]);   // la proyección de EE. UU. dentro de esa caja
//   mapaPapel(R, t, P, { eeuu: true });
import { hex } from '/atomo/plato/kits/pixel-retro.js';
import { C } from '/atomo/plato/escenas/ov-comun.js';
import { TIERRA, EEUU_P, URSS_P, CANADA_P, MEXICO_P, EEUU48, ESTADOS } from '/atomo/plato/escenas/geo-ov.js';

const h = (x, y, k = 0) => { const s = Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
export const PAPEL = {
  mar: hex('#86a6bc'), marS: hex('#7898b0'), somera: hex('#a4c0d0'), reticula: hex('#6c8aa2'),
  tierra: hex('#e8dcbc'), tierraS: hex('#d8c8a4'), costa: hex('#4a3e34'), frontera: hex('#a8987a'),
  eeuu: hex('#8aa8d8'), eeuuS: hex('#7a98c8'), urss: hex('#d88a7a'), urssS: hex('#c8786a'), mesa: hex('#5a3a22'),
};

// Albers cónica equivalente (paralelos 29,5° y 45,5°, centro −96°, 37,5°), escalada para que los 48 estados llenen la caja
// [x0, y0, x1, y1]; o.zoom y o.centro ([lon, lat]) acercan la cámara
export function albersEEUU(caja, o = {}) {
  const r = Math.PI / 180, f1 = 29.5 * r, f2 = 45.5 * r, n = (Math.sin(f1) + Math.sin(f2)) / 2, Cc = Math.cos(f1) ** 2 + 2 * n * Math.sin(f1);
  const rho = (lat) => Math.sqrt(Cc - 2 * n * Math.sin(lat * r)) / n, rho0 = rho(37.5);
  const crudo = ([lon, lat]) => { const th = n * (lon + 96) * r, p = rho(lat); return [p * Math.sin(th), rho0 - p * Math.cos(th)]; };
  // la caja de los 48 estados en coordenadas crudas
  const [ax0, ay0] = crudo([-124.8, 49.4]), [ax1] = crudo([-66.9, 49.4]), [, ay1] = crudo([-96, 24.5]);
  const [x0, y0, x1, y1] = caja, z = o.zoom ?? 1, s = Math.min((x1 - x0) / (ax1 - ax0), (y1 - y0) / (ay0 - ay1)) * z;
  const [cx, cy] = o.centro ? crudo(o.centro) : [(ax0 + ax1) / 2, (ay0 + ay1) / 2];
  return ([lon, lat]) => { const [x, y] = crudo([lon, lat]); return [(x0 + x1) / 2 + (x - cx) * s, (y0 + y1) / 2 - (y - cy) * s]; };
}
// equirectangular para el mundo: vista [lon0, lon1, lat0, lat1]; cada polígono se mueve ±360° para caer cerca del centro
// (así se puede centrar en el Pacífico, con la URSS a la izquierda y EE. UU. a la derecha)
export function equirect(caja, vista) {
  const [x0, y0, x1, y1] = caja, [l0, l1, a0, a1] = vista;
  const P = ([lon, lat]) => [x0 + (lon - l0) / (l1 - l0) * (x1 - x0), y0 + (a1 - lat) / (a1 - a0) * (y1 - y0)];
  P.centro = (l0 + l1) / 2; return P;
}
const ajusta = (P, pol) => { if (P.centro == null) return pol; const m = pol.reduce((a, [x]) => a + x, 0) / pol.length, d = Math.round((P.centro - m) / 360) * 360; return d ? pol.map(([x, y]) => [x + d, y]) : pol; };
const pro = (P, pol) => ajusta(P, pol).map((p) => P(p).map(Math.round));

// pinta polígonos: halo de agua somera, contorno de un píxel y relleno (c puede ser una función (x, y) para texturas)
export function pintar(R, P, pols, c, o = {}) {
  const ps = pols.map((p) => pro(P, p)).filter((p) => p.some(([x, y]) => x > -40 && x < 360 && y > -40 && y < 220));
  if (o.somera) for (const p of ps) for (const [dx, dy] of [[-2, 0], [2, 0], [0, -2], [0, 2], [-1, -1], [1, 1], [-1, 1], [1, -1]]) R.poligono(p.map(([x, y]) => [x + dx, y + dy]), o.somera);
  if (o.borde !== false) for (const p of ps) for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) R.poligono(p.map(([x, y]) => [x + dx, y + dy]), o.borde ?? PAPEL.costa);
  for (const p of ps) R.poligono(p, c);
}
const trama = (a, b, k) => (x, y) => (h(x >> 1, y, k) < 0.08 ? b : a);

// el mapa de papel: o.mundo (la tierra entera, con EE. UU. en azul y la URSS en rojo), o.eeuu (los 48 estados con sus
// fronteras, Canadá y México), o.reticula (grados entre líneas), o.rosa (la rosa de los vientos en [x, y]), o.mesa (el borde
// de madera alrededor del papel, en px)
export function mapaPapel(R, t, P, o = {}) {
  const { rect, pset } = R;
  rect(0, 0, 319, 179, PAPEL.mar); for (let y = 0; y < 180; y += 2) for (let x = 0; x < 320; x++) if (h(x >> 2, y, 150) < 0.1) pset(x, y, PAPEL.marS);
  // la retícula de meridianos y paralelos, punteada
  const g = o.reticula ?? 15;
  for (let lon = -180; lon <= 360; lon += g) for (let lat = -60; lat <= 85; lat += 0.5) { const [x, y] = P([lon, lat]); if (Math.round(lat * 2) % 4 === 0) pset(Math.round(x), Math.round(y), PAPEL.reticula); }
  for (let lat = -60; lat <= 80; lat += g) for (let lon = -180; lon <= 360; lon += 0.5) { const [x, y] = P([lon, lat]); if (Math.round(lon * 2) % 4 === 0) pset(Math.round(x), Math.round(y), PAPEL.reticula); }
  if (o.mundo) {
    pintar(R, P, TIERRA, trama(PAPEL.tierra, PAPEL.tierraS, 151), { somera: PAPEL.somera });
    pintar(R, P, URSS_P, trama(PAPEL.urss, PAPEL.urssS, 152), { borde: hex('#8a3a2a') });
    pintar(R, P, EEUU_P, trama(PAPEL.eeuu, PAPEL.eeuuS, 153), { borde: hex('#2a4a8a') });
  }
  if (o.eeuu) {
    pintar(R, P, CANADA_P, trama(PAPEL.tierraS, PAPEL.tierra, 154), { somera: PAPEL.somera });
    pintar(R, P, MEXICO_P, trama(PAPEL.tierraS, PAPEL.tierra, 155), { somera: PAPEL.somera });
    pintar(R, P, EEUU48, trama(PAPEL.tierra, PAPEL.tierraS, 156), { somera: PAPEL.somera });
    for (const l of ESTADOS) for (let i = 1; i < l.length; i++) { const [ax, ay] = P(l[i - 1]), [bx, by] = P(l[i]), n = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay))); for (let k = 0; k <= n; k += 2) pset(Math.round(ax + (bx - ax) * k / n), Math.round(ay + (by - ay) * k / n), PAPEL.frontera); }
  }
  if (o.eeuu && o.relieve !== false) relieve(R, P);
  if (o.rosa) rosa(R, o.rosa[0], o.rosa[1], t);
  // el papel: manchas de uso, esquinas más oscuras, y la mesa de madera alrededor
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { const d = Math.max(Math.abs(x - 160) / 160, Math.abs(y - 90) / 90); if (d > 0.82 && h(x, y, 157) < (d - 0.82) * 4) { const c = R.pget(x, y); R.pset(x, y, ((((c & 0xfefefe) >>> 1) + (((c & 0xfcfcfc) >>> 2))) | 0xff000000) >>> 0); } }
  if (o.mesa) { const m = o.mesa; for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) if (x < m || x > 319 - m || y < m || y > 179 - m) pset(x, y, (y + Math.round(Math.sin(x * 0.05) * 2)) % 6 < 2 ? hex('#4a2e1a') : PAPEL.mesa);
    rect(m - 1, m - 1, 320 - m, m - 1, C.k); rect(m - 1, 180 - m, 320 - m, 180 - m, C.k); rect(m - 1, m - 1, m - 1, 180 - m, C.k); rect(320 - m, m - 1, 320 - m, 180 - m, C.k); }
}
// el relieve de EE. UU. a mano: los grandes ríos en azul y las cordilleras con trazos en «^»
const RIOS = [
  [[-95.2, 47.2], [-93.2, 45], [-91.2, 43.5], [-91, 40.5], [-90.2, 38.6], [-89.2, 37], [-90, 35], [-91, 33], [-91.2, 31], [-90.2, 30], [-89.4, 29.2]],
  [[-111.5, 47.5], [-108, 47.7], [-104, 48], [-101, 47.3], [-100.5, 45.5], [-98.5, 43], [-96.5, 42.5], [-95.9, 41.2], [-94.6, 39.1], [-92, 38.7], [-90.2, 38.8]],
  [[-80, 40.5], [-82.5, 38.7], [-85.7, 38.2], [-88, 37.8], [-89.1, 37]],
  [[-105.8, 40.3], [-108.5, 39], [-110, 38], [-111.5, 36.9], [-112.5, 36.2], [-114.6, 36], [-114.6, 34], [-114.7, 32.7]],
  [[-106.6, 37.5], [-106.7, 35], [-106.9, 32.3], [-106.4, 31.7], [-104.5, 29.6], [-103, 29], [-101, 29.8], [-99.5, 27.5], [-97.2, 25.9]],
  [[-117, 49], [-119.3, 46.2], [-121, 45.6], [-123.9, 46.2]],
];
const SIERRAS = [
  [[-114, 48.5], [-112, 45.5], [-110.5, 43.5], [-108, 41], [-106.5, 38.5], [-105.8, 36]],
  [[-121.2, 40.5], [-119.8, 38.2], [-118.4, 36.2]],
  [[-121.4, 48.7], [-121.7, 46.6], [-122, 44.2], [-122, 42.2]],
  [[-84.6, 34.6], [-82.2, 36.2], [-79.8, 38.2], [-77.6, 40.2], [-75.2, 41.8], [-72.6, 43.8]],
];
export function relieve(R, P) {
  const tramos = (l, paso, f) => { for (let i = 1; i < l.length; i++) { const [ax, ay] = P(l[i - 1]), [bx, by] = P(l[i]), n = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay) / paso)); for (let k = 0; k < n; k++) f(ax + (bx - ax) * k / n, ay + (by - ay) * k / n, i * 31 + k); } };
  for (const r of RIOS) tramos(r, 0.5, (x, y) => { R.pset(Math.round(x), Math.round(y), hex('#5a86b0')); });
  for (const s of SIERRAS) tramos(s, 5, (x, y, k) => { const cx = Math.round(x + (h(k, 1, 158) - 0.5) * 6), cy = Math.round(y + (h(k, 2, 158) - 0.5) * 6); R.linea(cx - 2, cy + 1, cx, cy - 2, hex('#8a7a5a')); R.linea(cx, cy - 2, cx + 2, cy + 1, hex('#b8a888')); });
}
// la rosa de los vientos: cuatro puntas largas y cuatro cortas, con el norte rojo
export function rosa(R, x, y, t) {
  const { poligono, disco, pset } = R;
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 - Math.PI / 2, l = k % 2 ? 5 : 10, w = k % 2 ? 1 : 2, px = -Math.sin(a) * w, py = Math.cos(a) * w;
    poligono([[x + px, y + py], [x + Math.cos(a) * l, y + Math.sin(a) * l], [x - px, y - py]].map(([u, v]) => [Math.round(u), Math.round(v)]), k === 0 ? C.rojo : k % 2 ? PAPEL.frontera : PAPEL.costa); }
  disco(x, y, 2, PAPEL.tierra); pset(x, y, PAPEL.costa);
}
// una chincheta clavada (o.baja 0–1: cae desde arriba con su sombra que se acerca); c: el color de la cabeza
export function chincheta(R, x, y, t, c = C.rojo, o = {}) {
  const b = o.baja ?? 1; if (b <= 0) return; const alto = Math.round((1 - b) * 26);
  R.disco(x + 2 + Math.round(alto / 3), y + 1, 2, hex('#3a3a46'));   // la sombra
  R.linea(x, y - alto, x, y - 4 - alto, C.metalD); R.disco(x, y - 6 - alto, 3, C.k); R.disco(x, y - 6 - alto, 2, c); R.pset(x - 1, y - 7 - alto, C.blanco);
  if (b >= 1 && o.pulso) { const r = 4 + Math.round(((t * 2) % 1) * 8); for (let a = 0; a < 6.28; a += 0.3) if ((a * 10 | 0) % 2) R.pset(Math.round(x + Math.cos(a) * r), Math.round(y + Math.sin(a) * r * 0.6), c); }
}
// un avión de reconocimiento en miniatura (un B-29 visto desde arriba) en (x, y), apuntando al ángulo a
export function avionMapa(R, x, y, a, c = C.k) {
  const ca = Math.cos(a), sa = Math.sin(a), q = (u, v) => [Math.round(x + u * ca - v * sa), Math.round(y + u * sa + v * ca)];
  R.linea(...q(-5, 0), ...q(5, 0), c); R.linea(...q(1, -6), ...q(1, 6), c); R.linea(...q(-4, -2), ...q(-4, 2), c); R.pset(...q(2, -3), c); R.pset(...q(2, 3), c);
}
