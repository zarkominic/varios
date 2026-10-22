// PIXEL ART · episodio 3 · LOS INSTRUMENTOS Y EL FINAL DE px-ep3-ojo (lo crea px-ep3-ojo; px-ep3-promesa lo usa para su
// primer fotograma). Los mismos tres instrumentos que kits/ep03-instrumentos.js (plastilina), en el lienzo de
// kits/pixel-ep03.js (480 × 270 píxeles reales, escalado ×4), con su luz (principal cálida arriba a la izquierda, contraluz
// frío a la derecha), su tramado Bayer y sus rampas.
//
//   import * as PX from '/atomo/plato/kits/pixel-ep03.js';
//   import * as INS from '/atomo/plato/kits/pixel-ep03-instrumentos.js';
//   const MIC = INS.microscopio(), ANI = INS.anillo(), TEL = INS.telescopio();   // sprites: se pintan una vez, al cargar
//   INS.pegarSprite(TEL, 240, 120);                                             // (x, y) = su ancla, en píxeles de pantalla
//
// SPRITES (capas transparentes de pixel-ep03.js con su ancla { ox, oy }; pegarSprite(s, x, y) los pega a píxel entero)
//  · microscopio() → 170 × 184, ancla en el centro del cuerpo. El de investigación, de perfil y mirando a la derecha: base y
//      columna de esmalte marfil, cabezal con dos oculares negros inclinados hacia quien mira, revólver de latón con tres
//      objetivos (el de trabajo con su anillo rojo), platina negra con la preparación de vidrio, condensador de acero,
//      mandos de enfoque negros y la lámpara de la base. .puntos: { lampara, platina, ocular } (relativos al ancla).
//  · anillo({ R = 168, k = 0.27 }) → el anillo de un acelerador visto desde arriba de tres cuartos (radio R en x; k aplasta
//      la profundidad): 28 imanes de pizarra azulada con un surco arriba y el haz ámbar dentro, bridas de latón entre ellos y
//      cuatro detectores en barril (los grandes delante y detrás, los pequeños a los lados, con la cara de anillos de
//      terracota, crema y pizarra). Se pinta con trazado de rayos por píxel (unos 150 ms). Ancla: el centro del anillo.
//      .haz(th) → [dx, dy] el punto del haz (arriba del tubo) en el ángulo th, relativo al ancla (th = 0 a la derecha,
//      π/2 delante, abajo en pantalla; −π/2 detrás). DETECTOR_CHOQUE = π/2 (el de delante).
//  · telescopio() → 260 × 200, ancla en el centro del espejo. El espacial (como el Webb), de frente y desde algo arriba: el
//      espejo de 18 hexágonos dorados con el hueco del centro, el secundario sobre sus tres puntales, el parasol de cinco
//      capas lavanda que se abren en abanico hacia las puntas y, asomando por delante, el panel solar.
//      .espejos: los centros de los 18 hexágonos (relativos al ancla), para poner destellos.
//
// EL FINAL DE px-ep3-ojo = EL PRINCIPIO DE px-ep3-promesa
//   FIN = { x: 240, y: 112, cielo: { semilla: 23, via: 0.85, nebulosa: 0.5 }, camX: 14 }: el telescopio con el ancla en
//   (FIN.x, FIN.y) sobre PX.crearCielo(FIN.cielo) dibujado con { camX: FIN.camX, quieto: true }.
//   pintarFinOjo() pinta ese fotograma (sin Atom ni post). Atom va en su sitio de presentador (PX.ATOM_SITIO) con el reloj
//   de la escena siguiente: px-ep3-ojo le pasa t − duración desde su último corte, así que en su último fotograma Atom es
//   exactamente PX.atom({ ...PX.ATOM_SITIO, t: 0, energia: 0 }), el de px-ep3-promesa en t = 0. Después, PX.presentar(t).
//
// Determinista. Coste al cargar: los tres sprites, ~0,3 s; pegarlos, < 1 ms.

import { PAL, hex, tono, clamp, mezcla, suave, vnoise, fbm, hash2, b4, mezclaColor, color, rgb, destino, en, nuevaCapa, forma, pegar, crearCielo } from './pixel-ep03.js';

const pal = (a) => a.map(hex);
export const PALI = {
  NEGRO: pal(['#06050a', '#100f17', '#1b1a25', '#292836', '#3d3c4c', '#595868', '#7d7c8c']),
  IMAN: pal(['#0d1220', '#18223a', '#263652', '#3a4f74', '#55709a', '#7c98bf', '#b2c6e2']),
  ORO: pal(['#1e0f04', '#422508', '#70440e', '#a26f1a', '#cf9b2e', '#efc75e', '#fde9a8', '#fffbe8']),
  LAVANDA: pal(['#191524', '#2e2842', '#4a4262', '#6b6287', '#9088ab', '#b7afcd', '#dcd6ec', '#f6f3fb']),
  PANEL: pal(['#05070f', '#0b1226', '#152246', '#22356a', '#36508f', '#5a78b3']),
  VIDRIO: pal(['#3d5560', '#7fa3ad', '#c3e0e4', '#f2fbfb']),
};
const LK = (() => { const v = [-0.46, -0.56, 0.69], l = Math.hypot(...v); return v.map((x) => x / l); })();

// ── sprites ─────────────────────────────────────────────────────────────────────────────────────────────────────
function sprite(w, h, ox, oy) { const c = nuevaCapa(w, h); c.ox = ox; c.oy = oy; return c; }
export function pegarSprite(s, x, y) { pegar(s, Math.round(x) - s.ox, Math.round(y) - s.oy); }

// distancias con signo (px; negativas dentro)
const caja = (cx, cy, hw, hh, r = 0, ang = 0) => (x, y) => {
  let dx = x - cx, dy = y - cy;
  if (ang) { const c = Math.cos(ang), s = Math.sin(ang); const ux = dx * c + dy * s, uy = -dx * s + dy * c; dx = ux; dy = uy; }
  const qx = Math.abs(dx) - hw + r, qy = Math.abs(dy) - hh + r;
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
};
const circulo = (cx, cy, r) => (x, y) => Math.hypot(x - cx, y - cy) - r;
const segmento = (ax, ay, bx, by, r) => (x, y) => {
  const px = x - ax, py = y - ay, dx = bx - ax, dy = by - ay;
  const h = clamp((px * dx + py * dy) / (dx * dx + dy * dy), 0, 1);
  return Math.hypot(px - dx * h, py - dy * h) - r;
};
const union = (...f) => (x, y) => { let d = Infinity; for (const g of f) d = Math.min(d, g(x, y)); return d; };

// ════════════════════════════════════════════════════════════════════════════
//  EL MICROSCOPIO
// ════════════════════════════════════════════════════════════════════════════
export function microscopio() {
  const S = sprite(170, 184, 85, 100);
  const C = PAL.CREMA, N = PALI.NEGRO, L = PAL.LATON, A = PAL.NIEBLA;
  en(S, () => {
    // la base (esmalte marfil), con el canto de abajo en sombra
    forma({ x0: 22, y0: 152, x1: 150, y1: 178, sdf: caja(86, 165, 62, 10, 7), rampa: C, lo: 0.9, hi: 4.8, grosor: 5,
      textura: (x, y, v) => v - (y > 170 ? 1.2 : 0) });
    // la lámpara en la base (vidrio, se enciende con luz())
    forma({ x0: 98, y0: 149, x1: 120, y1: 158, sdf: caja(109, 154, 10, 3.5, 2), rampa: L, lo: 2, hi: 6, grosor: 2 });
    // la columna: sube de la base al cabezal y se curva hacia delante
    forma({ x0: 28, y0: 40, x1: 76, y1: 160, sdf: union(caja(45, 112, 14, 46, 7), segmento(45, 90, 60, 52, 13)), rampa: C, lo: 1.0, hi: 4.9, grosor: 8 });
    // el brazo de la platina y el condensador
    forma({ x0: 52, y0: 102, x1: 82, y1: 118, sdf: caja(67, 110, 12, 5, 2), rampa: N, lo: 1, hi: 4.5, grosor: 3 });
    forma({ x0: 94, y0: 108, x1: 116, y1: 126, sdf: caja(105, 117, 8, 7, 2), rampa: A, lo: 0.8, hi: 4.4, grosor: 4,
      textura: (x, y, v) => v + (y === 113 || y === 120 ? -1 : 0) });
    // la platina negra
    forma({ x0: 68, y0: 98, x1: 142, y1: 112, sdf: caja(105, 105, 34, 4.5, 2), rampa: N, lo: 1.2, hi: 5, grosor: 3 });
    // los objetivos (el de atrás, el de trabajo y el de delante) y el revólver de latón
    forma({ x0: 78, y0: 66, x1: 96, y1: 92, sdf: segmento(89, 71, 83, 88, 4.2), rampa: A, lo: 0.5, hi: 3.2, grosor: 3 });
    forma({ x0: 92, y0: 68, x1: 108, y1: 98, sdf: segmento(100, 72, 100, 92, 5), rampa: A, lo: 0.9, hi: 5, grosor: 4,
      textura: (x, y, v) => v - (y > 89 ? 0.8 : 0) });
    for (let y = 84; y <= 86; y++) for (let x = 94; x <= 106; x++) {          // el anillo rojo del objetivo de trabajo
      const i = y * S.w + x; if (S.buf[i] && S.buf[i] !== A[0]) S.buf[i] = tono(PAL.TERRACOTA, 4.2 - (x - 94) * 0.28 - (y - 84) * 0.4, x, y, 0.3);
    }
    forma({ x0: 104, y0: 66, x1: 124, y1: 90, sdf: segmento(110, 71, 117, 85, 4.2), rampa: A, lo: 0.8, hi: 4.6, grosor: 3 });
    forma({ x0: 80, y0: 60, x1: 116, y1: 78, sdf: caja(98, 69, 16, 5.5, 3, 0.16), rampa: L, lo: 1.2, hi: 6, grosor: 4 });
    // el ocular de atrás, el cabezal y el de delante (con sus copas de goma)
    forma({ x0: 62, y0: 6, x1: 106, y1: 48, sdf: union(segmento(70, 42, 94, 14, 5.2), segmento(93, 15, 98, 9, 6.2)), rampa: N, lo: 0.6, hi: 3.2, grosor: 4 });
    forma({ x0: 34, y0: 34, x1: 120, y1: 68, sdf: caja(78, 51, 36, 13, 7, -0.06), rampa: C, lo: 1.1, hi: 5.2, grosor: 7 });
    forma({ x0: 70, y0: 10, x1: 118, y1: 52, sdf: union(segmento(80, 46, 104, 18, 5.2), segmento(103, 19, 109, 12, 6.2)), rampa: N, lo: 1, hi: 5, grosor: 4 });
    // los mandos de enfoque (grueso moleteado y fino de acero)
    forma({ x0: 30, y0: 104, x1: 62, y1: 136, sdf: circulo(46, 120, 12), rampa: N, lo: 1, hi: 4.6, grosor: 5,
      textura: (x, y, v, d) => (d > -3 && Math.sin(Math.atan2(y - 120, x - 46) * 14) > 0.2 ? v - 1.1 : v) });
    forma({ x0: 38, y0: 112, x1: 54, y1: 128, sdf: circulo(46, 120, 5.5), rampa: A, lo: 1, hi: 5, grosor: 3 });
    // la preparación de vidrio sobre la platina, con su muestra
    const V = PALI.VIDRIO;
    for (let x = 84; x <= 126; x++) { S.buf[99 * S.w + x] = x < 90 ? V[3] : V[2]; S.buf[100 * S.w + x] = V[1]; }
    S.buf[99 * S.w + 104] = PAL.TERRACOTA[4]; S.buf[99 * S.w + 105] = PAL.TERRACOTA[3];
  });
  S.puntos = { lampara: [109 - 85, 152 - 100], platina: [104 - 85, 99 - 100], ocular: [109 - 85, 12 - 100] };
  return S;
}

// ════════════════════════════════════════════════════════════════════════════
//  EL ANILLO DEL ACELERADOR
// ════════════════════════════════════════════════════════════════════════════
export const DETECTOR_CHOQUE = Math.PI / 2;
export function anillo({ R = 168, k = 0.27 } = {}) {
  const w = 7, hc = 4.5;                                       // medio ancho del tubo (en planta) y medio alto
  const DET = [                                                 // ángulo, radio del barril, medio largo
    { th: Math.PI / 2, r: 15, L: 21 }, { th: -Math.PI / 2, r: 15, L: 21 }, { th: 0, r: 10.5, L: 8 }, { th: Math.PI, r: 10.5, L: 8 },
  ];
  const hTop = hc + 15, hBot = hc - 15;
  const ancho = Math.ceil(2 * (R + w + 12)), alto = Math.ceil(2 * (R + w + 22) * k + (hTop - hBot) + 8);
  const cx = ancho / 2, cy = Math.round((R + w + 22) * k + hTop + 2);
  const S = sprite(ancho, alto, cx, cy);
  const LW = (() => { const v = [-0.45, 0.45, 0.78], l = Math.hypot(...v); return v.map((x) => x / l); })();   // x, z (hacia quien mira), arriba
  const RIM = (() => { const v = [0.8, -0.5, 0.3], l = Math.hypot(...v); return v.map((x) => x / l); })();
  const angDif = (a, b) => { let d = a - b; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; };
  const IM = PALI.IMAN, LA = PAL.LATON, AM = PAL.AMBAR, TE = PAL.TERRACOTA, CR = PAL.CREMA, PI_ = PALI.NEGRO;
  // ¿qué hay en (X, Z, h)? → null o { n: normal [x, z, arriba], mat, extra }
  function golpe(X, Z, h) {
    const r = Math.hypot(X, Z), th = Math.atan2(Z, X), d = r - R;
    for (const D of DET) {
      const s = r * angDif(th, D.th), q = Math.hypot(d, h - hc);
      if (Math.abs(s) <= D.L && q <= D.r) {
        const ur = [X / r, Z / r], ut = [-Z / r, X / r];
        if (Math.abs(s) > D.L - 1.2) { const sg = Math.sign(s); return { n: [ut[0] * sg, ut[1] * sg, 0], mat: 'cara', q: q / D.r }; }
        const nr = d / q, nh = (h - hc) / q;
        return { n: [ur[0] * nr, ur[1] * nr, nh], mat: 'barril', s: s / D.L, q };
      }
    }
    const e = (d / w) ** 2 + ((h - hc) / hc) ** 2;
    if (e <= 1) {
      const nr = d / (w * w), nh = (h - hc) / (hc * hc), l = Math.hypot(nr, nh);
      const seg = (((th / (2 * Math.PI)) * 28) % 1 + 1) % 1;
      return { n: [(X / r) * nr / l, (Z / r) * nr / l, nh / l], mat: seg < 0.13 ? 'brida' : 'iman', d, h };
    }
    return null;
  }
  en(S, () => {
    for (let y = 0; y < alto; y++) for (let x = 0; x < ancho; x++) {
      const X = x + 0.5 - cx;
      if (Math.abs(X) > R + 17) continue;
      let g = null;
      for (let h = hTop; h >= hBot; h -= 0.5) {
        const Z = (y + 0.5 - cy + h) / k;
        g = golpe(X, Z, h);
        if (g) break;
      }
      if (!g) continue;
      const [nx, nz, nh] = g.n;
      const lam = Math.max(0, nx * LW[0] + nz * LW[1] + nh * LW[2]), rim = Math.max(0, nx * RIM[0] + nz * RIM[1] + nh * RIM[2]);
      let c;
      if (g.mat === 'iman') {
        // el surco de arriba con el haz ámbar dentro
        if (nh > 0.82 && Math.abs(g.d) < 1.7) c = tono(AM, 3.4 + 1.2 * (1 - Math.abs(g.d) / 1.7), x, y, 0.4);
        else if (nh > 0.7 && Math.abs(g.d) < 2.8) c = IM[0];
        else c = tono(IM, 0.8 + 4.4 * lam + (rim > 0.4 ? 1.2 * (rim - 0.4) : 0), x, y, 0.3);
      } else if (g.mat === 'brida') c = tono(LA, 1.0 + 4.6 * lam, x, y, 0.3);
      else if (g.mat === 'cara') {
        const q = g.q, anillo_ = q < 0.22 ? 0 : q < 0.45 ? 1 : q < 0.62 ? 2 : q < 0.82 ? 3 : 4;
        const rampa = [PI_, TE, CR, TE, IM][anillo_];
        c = tono(rampa, (anillo_ === 0 ? 0.6 : 1.4) + 3.4 * lam, x, y, 0.3);
      } else {
        // barril: duelas de pizarra con bandas de terracota y crema
        const band = Math.abs(g.s);
        const rampa = band > 0.86 ? CR : band > 0.62 && band < 0.74 ? TE : IM;
        c = tono(rampa, 1.0 + 4.0 * lam + (rim > 0.4 ? rim - 0.4 : 0), x, y, 0.3);
        const dz = Math.atan2(g.n[2], Math.hypot(g.n[0], g.n[1]));
        if (rampa === IM && Math.abs(Math.sin(dz * 4)) < 0.12) c = IM[0];
      }
      S.buf[y * ancho + x] = c;
    }
    // contorno oscuro (se lee sobre el ojo y sobre el cielo)
    const copia = S.buf.slice();
    for (let y = 0; y < alto; y++) for (let x = 0; x < ancho; x++) {
      if (copia[y * ancho + x]) continue;
      const v = (a, b) => a >= 0 && b >= 0 && a < ancho && b < alto && copia[b * ancho + a];
      if (v(x - 1, y) || v(x + 1, y) || v(x, y - 1) || v(x, y + 1)) S.buf[y * ancho + x] = PAL.TINTA;
    }
  });
  S.R = R; S.k = k;
  S.haz = (th) => [R * Math.cos(th), R * Math.sin(th) * k - (hc + 1.5)];
  return S;
}

// ════════════════════════════════════════════════════════════════════════════
//  EL TELESCOPIO ESPACIAL
// ════════════════════════════════════════════════════════════════════════════
export function telescopio() {
  const S = sprite(260, 200, 130, 78);
  const O = PALI.ORO, LV = PALI.LAVANDA, N = PALI.NEGRO, A = PAL.NIEBLA, PN = PALI.PANEL;
  const buf = S.buf, Wd = S.w;
  const put = (x, y, c) => { if (x >= 0 && y >= 0 && x < S.w && y < S.h) buf[y * Wd + x] = c; };
  // 1) el panel solar y el cuerpo de la nave (asoman por delante del parasol)
  for (let y = 158; y <= 172; y++) for (let x = 100; x <= 160; x++) {
    const xs = x - 130, ys = y - 165;
    if (Math.abs(ys - xs * 0.05) > 6 || Math.abs(xs) > 30) continue;
    let v = 1.6 + 1.2 * (-(xs) / 30) * 0.4 + 1.0 * (ys < -4 ? 1 : 0);
    if ((x - 100) % 7 === 0 || (y - 158) % 5 === 0) v -= 1.1;
    put(x, y, tono(PN, v, x, y, 0.3));
  }
  // 2) el parasol: cinco capas que se abren en abanico hacia las puntas
  const SX = 118, SY = 24, PUNTA = 70, CYp = 128;
  const dentroCapa = (x, y, i) => {
    const dx = x + 0.5 - 130, off = i * (2.4 + 3.4 * (dx / SX) ** 2), dy = y + 0.5 - (CYp + off);
    if (Math.abs(dx) > SX) return false;
    const lim = SY * (Math.abs(dx) < PUNTA ? 1 : 1 - (Math.abs(dx) - PUNTA) / (SX - PUNTA));
    return Math.abs(dy) <= lim;
  };
  for (let y = 90; y <= 172; y++) for (let x = 6; x <= 254; x++) {
    let capa = -1;
    for (let i = 0; i < 5; i++) if (dentroCapa(x, y, i)) { capa = i; break; }
    if (capa < 0) continue;
    const dx = (x + 0.5 - 130) / SX, dy = (y + 0.5 - CYp) / SY;
    let v;
    if (capa === 0) {
      // la capa de arriba: luz de arriba a la izquierda, arrugas de la membrana y un brillo nacarado
      v = 4.4 - 0.9 * dx - 0.9 * dy;
      v += 0.55 * Math.sin((x * 0.55 + y * 1.6) * 0.32 + 3 * vnoise(x * 0.06, y * 0.12)) * suave(0.2, 0.9, vnoise(x * 0.03 + 4, y * 0.05));
      v += 1.4 * Math.exp(-(((dx + 0.25) * 1.4 - dy * 0.8) ** 2) / 0.02);
    } else {
      const borde = !dentroCapa(x, y - 1, capa) || (capa > 0 && dentroCapa(x, y - 1, capa - 1));
      v = 2.9 - 0.35 * capa - 0.6 * dx + (borde ? 1.6 : 0);
    }
    put(x, y, tono(LV, v, x, y, 0.35));
  }
  // 3) la torre del espejo
  for (let y = 98; y <= 132; y++) for (let x = 124; x <= 136; x++) put(x, y, tono(N, 1.2 + (x < 128 ? 1.4 : 0), x, y, 0));
  // 4) el espejo: 18 hexágonos dorados (tres anillos menos el del centro), algo inclinado hacia atrás
  const s = 10.6, sq = 0.86, MX = 130, MY = 78, r3 = Math.sqrt(3);
  const HEX = [];
  for (let q = -2; q <= 2; q++) for (let r = -2; r <= 2; r++) {
    const d = Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r));
    if (d === 0 || d > 2) continue;
    HEX.push([MX + s * r3 * (q + r / 2), MY + s * 1.5 * r * sq, hash2(q * 7 + 3, r * 5 + 1)]);
  }
  const enHex = (lx, ly, rr) => { const ax = Math.abs(lx), ay = Math.abs(ly / sq); return ax <= (r3 / 2) * rr && ay + ax / r3 <= rr; };
  for (let y = 40; y <= 116; y++) for (let x = 70; x <= 190; x++) {
    let k = -1, cerca = false;
    for (let i = 0; i < HEX.length; i++) {
      const lx = x + 0.5 - HEX[i][0], ly = y + 0.5 - HEX[i][1];
      if (enHex(lx, ly, s - 0.75)) { k = i; break; }
      if (enHex(lx, ly, s + 0.9)) cerca = true;
    }
    const lx0 = x + 0.5 - MX, ly0 = y + 0.5 - MY;
    if (k < 0) {
      if (cerca || enHex(lx0, ly0, s + 0.9)) put(x, y, (x + y) % 3 === 0 ? N[2] : N[1]);   // la estructura de detrás
      continue;
    }
    const [hx, hy, hv] = HEX[k];
    const lx = (x + 0.5 - hx) / s, ly = (y + 0.5 - hy) / (s * sq);
    let v = 2.2 + 1.8 * (hv - 0.5);
    v += -0.9 * (lx * 0.6 + ly * 0.8) + 0.5 * (1 - lx * lx - ly * ly);                          // cóncavo: luz arriba a la izquierda
    v += 2.6 * Math.exp(-(((lx0 * 0.62 - ly0) - 6) ** 2) / 38);                                 // la franja de reflejo del Sol
    v += 1.4 * Math.exp(-(((lx0 * 0.62 - ly0) + 26) ** 2) / 20);
    if (Math.abs(lx) + Math.abs(ly) < 0.25 && hv > 0.55) v += 1.2;
    put(x, y, tono(O, v, x, y, 0.35));
  }
  // 5) el secundario y sus tres puntales
  const SEC = [MX, MY - 6];
  const lineaS = (x0, y0, x1, y1, c, c2) => {
    const n = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)));
    for (let i = 0; i <= n; i++) { const x = Math.round(mezcla(x0, x1, i / n)), y = Math.round(mezcla(y0, y1, i / n)); put(x, y, c); if (c2) put(x + 1, y, c2); }
  };
  lineaS(MX - 44, MY + 30, SEC[0] - 2, SEC[1] + 2, A[3], A[1]);
  lineaS(MX + 44, MY + 30, SEC[0] + 2, SEC[1] + 2, A[2], A[0]);
  lineaS(MX, MY - 38, SEC[0], SEC[1] - 3, A[4], A[1]);
  for (let y = -5; y <= 5; y++) for (let x = -5; x <= 5; x++) {
    const d = Math.hypot(x, y * 1.12); if (d > 4.6) continue;
    put(SEC[0] + x, SEC[1] + y, d > 3.5 ? N[0] : tono(O, 3.8 - 0.4 * (x + y), SEC[0] + x, SEC[1] + y, 0.3));
  }
  // contorno oscuro
  const copia = buf.slice();
  for (let y = 0; y < S.h; y++) for (let x = 0; x < S.w; x++) {
    if (copia[y * Wd + x]) continue;
    const v = (a, b) => a >= 0 && b >= 0 && a < S.w && b < S.h && copia[b * Wd + a];
    if (v(x - 1, y) || v(x + 1, y) || v(x, y - 1) || v(x, y + 1)) buf[y * Wd + x] = PAL.TINTA;
  }
  S.espejos = HEX.map(([x, y]) => [x - S.ox, y - S.oy]);
  return S;
}

// ════════════════════════════════════════════════════════════════════════════
//  EL FINAL DE px-ep3-ojo (= EL PRINCIPIO DE px-ep3-promesa)
// ════════════════════════════════════════════════════════════════════════════
export const FIN = { x: 240, y: 112, cielo: { semilla: 23, via: 0.85, nebulosa: 0.5 }, camX: 14 };
let cacheFin = null;
export function pintarFinOjo() {
  if (!cacheFin) cacheFin = { cielo: crearCielo(FIN.cielo), tel: telescopio() };
  cacheFin.cielo.dibujar({ camX: FIN.camX, t: 0, quieto: true });
  pegarSprite(cacheFin.tel, FIN.x, FIN.y);
}
