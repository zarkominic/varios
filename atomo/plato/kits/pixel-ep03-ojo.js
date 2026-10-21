// PIXEL ART · episodio 3 · EL OJO ENORME (lo crea px-ep3-hola; lo reutiliza px-ep3-ojo para su primer fotograma).
// Piezas sobre el lienzo de kits/pixel-ep03.js (480 × 270 píxeles reales, escalado ×4): dibuja en el destino actual
// del kit (la pantalla o una capa de en(capa, …)). Misma luz que el kit (principal cálida arriba a la izquierda, contraluz
// frío a la derecha), mismas rampas de piel y pelo que la persona, tramado Bayer.
//
//   import * as PX from '/atomo/plato/kits/pixel-ep03.js';
//   import * as OJO from '/atomo/plato/kits/pixel-ep03-ojo.js';
//   OJO.ojo({ cx: 240, cy: 130, a: 175, arriba: 0, abajo: 0, cosas: [...], franja: { ancho: 1 } });
//
// EL OJO — ojo(o) dibuja la pantalla ENTERA (la piel alrededor, el globo, las cosas, los párpados, las pestañas, la franja
// y la viñeta). Es el ojo izquierdo de la persona del kit visto de frente: el lagrimal a la izquierda de la pantalla, el
// rabillo (pestañas más largas) a la derecha, la ceja asomando arriba.
//   o: { cx, cy (centro del ojo: el corte de los dos párpados cerrados), a (medio ancho de la rendija, de rincón a
//        rincón, en px), arriba / abajo (cierre de cada párpado: 0 abierto · 1 cerrado sobre la franja), mirada [gx, gy]
//        (−1…1), pupila (0…1, 0,5 normal), t (solo para el brillo húmedo; nada más depende de t), cosas ([{ tipo:
//        'celula' | 'atomo' | 'galaxia', x, y, r, apagado (0…1), aparece (0…1), giro }], en píxeles de pantalla: van
//        sobre el globo y tras los párpados), franja ({ ancho 0…1 (se abre desde el centro), alto = FRANJA.alto,
//        brillo = 1 } o null), vineta (0…1, 1 por defecto), x0, y0, x1, y1 (recorte; por defecto, la pantalla) }
//   → { iris: [x, y], ri (radio del iris), bordes(x) → [yArriba, yAbajo] }
//   · Cierre: los bordes bajan/suben hacia la línea de la franja (y = cy) y se quedan a FRANJA.alto + 1 px de ella:
//     cerrados del todo (1, 1) dejan solo la franja. La inclinación del ojo abierto (el rabillo algo más alto) se
//     endereza al cerrar.
//   · Proporciones (en unidades de a): rendija abierta de 0,40 a por encima y 0,30 a por debajo del centro; iris de
//     radio RI = 0,37 a con el centro 0,03 a por debajo; pupila de 0,42 del iris (con pupila 0,5).
//
// LAS COSAS (cosa(tipo, x, y, r, { apagado, aparece, giro })): lo que se apaga tras los párpados.
//   'celula' (membrana, citoplasma, núcleo violeta con nucléolo, mitocondrias, retículo) · 'atomo' (un átomo cualquiera:
//   núcleo de pizarra y crema, tres órbitas finas y frías; NO es Atom) · 'galaxia' (espiral de dos brazos inclinada:
//   bulbo cálido, brazos azulados, carriles de polvo, nudos rosados). apagado 0…1 la deja sin luz (gris oscuro, sin halo).
//
// LA FRANJA (franja(cx, y, medioAncho, { alto, ancho, brillo })): la rendija de luz horizontal delante del ojo: núcleo
//   blanco, borde crema, halo ámbar tramado; las puntas se afinan. FRANJA = { alto: 3 } (medio alto del núcleo).
//
// MIRILLA (pegarMirilla(capa, cx, cy, R, borde)): pega una capa dentro de un círculo de radio R con el borde tramado
//   (borde px de degradado): el «zum que entra en el ojo».
//
// EL FINAL DE px-ep3-hola = EL PRIMER FOTOGRAMA DE px-ep3-ojo
//   FIN = { cx: 240, cy: 130, a: 175, arriba: 1, abajo: 1, mirada: [0, 0], pupila: 0.5, franja: { ancho: 1 } }.
//   pintarFinalHola() pinta ese fotograma sin Atom ni post. Atom va en su sitio de presentador (PX.ATOM_SITIO) con el
//   reloj de la escena siguiente: px-ep3-hola le pasa t − duración, así que en su último fotograma Atom es exactamente
//   PX.atom({ ...PX.ATOM_SITIO, t: 0, energia: 0 }) — el de px-ep3-ojo en t = 0. Después, PX.presentar(t).
//
// Coste: ojo() a pantalla completa, 15–40 ms. Determinista.

import { PAL, hex, tono, clamp, mezcla, suave, vnoise, b4, b8, mezclaColor, color, rgb, pset, destino, en, disco, luz, sombra } from './pixel-ep03.js';

const pal = (a) => a.map(hex);
export const PALO = {
  ESCLERA: pal(['#2b2026', '#4f3e45', '#7d6c70', '#a99a97', '#cdc0b8', '#e6ddd3', '#f7f1e8']),
  IRIS: pal(['#0b0606', '#1d0e09', '#33190e', '#4f2913', '#713c1a', '#975423', '#ba712f', '#d9933f', '#f1bb64']),
  PUPILA: pal(['#040306', '#0a0912', '#131225', '#1e2039']),
  CARUNCULA: pal(['#55262c', '#8a4549', '#b86866', '#dc958a', '#f3c2b1']),
  CELULA: pal(['#2a1020', '#55203a', '#8a3a55', '#bf5f72', '#e58e93', '#fbc2b8', '#fff0e6']),
  NUCLEO: pal(['#140c26', '#2a1a4d', '#46307a', '#6a4ea6', '#9278c8', '#c4aee9']),
  MITO: pal(['#3a1608', '#7a3412', '#c0601e', '#ef9440', '#ffc77e']),
  FRIO: pal(['#1d2433', '#384560', '#5f7396', '#98afd4', '#d5e4ff', '#f4f8ff']),
  PIZARRA: pal(['#15181f', '#2a303d', '#475062', '#6b778d', '#9aa6bd']),
  GAL: pal(['#0c0d1c', '#1b2140', '#2b3a6a', '#4c64a0', '#7f9bd2', '#bcd0f4', '#eef3ff']),
};
export const FRANJA = { alto: 3 };
export const PROP = { HU: 0.40, HL: 0.30, RI: 0.37, DI: 0.03, RP: 0.42 };
export const FIN = { cx: 240, cy: 130, a: 175, arriba: 1, abajo: 1, mirada: [0, 0], pupila: 0.5, franja: { ancho: 1 } };

const PIEL = PAL.PIEL, PELO = PAL.PELO;
const LK = (() => { const v = [-0.46, -0.56, 0.69], l = Math.hypot(...v); return v.map((x) => x / l); })();
const LR = (() => { const v = [0.9, -0.18, -0.4], l = Math.hypot(...v); return v.map((x) => x / l); })();

// suma luz de un color con nivel cuantizado y tramado (como luz() del kit, pero con la intensidad que se quiera)
function sumar(i, x, y, c, I) {
  const q = Math.floor(I * 4 + b4(x, y)) / 4;
  if (q <= 0) return;
  const T = destino(), p = T.buf[i]; if (!p) return;
  T.buf[i] = color((p & 255) + c[0] * q, ((p >>> 8) & 255) + c[1] * q, ((p >>> 16) & 255) + c[2] * q);
}

// ── geometría de los párpados ───────────────────────────────────────────────────────────────────────────────────
// perfil del borde de arriba / de abajo (0 en los rincones, ~1 en el pico): el de arriba alto hacia el lagrimal,
// el de abajo hacia el rabillo
const perfilU = (u) => { const q = clamp(1 - u * u, 0, 1); return Math.pow(q, 0.72) * (1 - 0.16 * u) / 1.0; };
const perfilL = (u) => { const q = clamp(1 - u * u, 0, 1); return Math.pow(q, 0.9) * (1 + 0.2 * u) / 1.02; };
export function bordesOjo({ cx, cy, a, arriba = 0, abajo = 0 }) {
  const g = FRANJA.alto + 1;
  const abU = 1 - clamp(arriba, -0.15, 1), abL = 1 - clamp(abajo, -0.15, 1);
  const inclina = 0.035 * Math.max(abU, abL);
  return (x) => {
    const u = (x - cx) / a;
    if (Math.abs(u) >= 1) return null;
    const yc = cy - a * inclina * u;
    const yU = Math.min(cy - g * Math.min(1, (1 - u * u) * 4), yc - a * PROP.HU * abU * perfilU(u) - g * (1 - abU) * Math.min(1, (1 - u * u) * 4));
    const yL = Math.max(cy + g * Math.min(1, (1 - u * u) * 4), yc + a * PROP.HL * abL * perfilL(u) + g * (1 - abL) * Math.min(1, (1 - u * u) * 4));
    return [yU, yL];
  };
}

// ── campo de alturas de la piel alrededor (unidades de a) ───────────────────────────────────────────────────────
// vU / vL: bordes de los párpados en esta columna (o null fuera de la rendija); vC: el pliegue (fijo, el del ojo abierto)
const vPliegue = (u) => -(PROP.HU * perfilU(clamp(u, -0.999, 0.999)) + 0.12) - 0.035 * u;
function alturaPiel(u, v, vU, vL, abU) {
  let h = 0;
  h -= 0.07 * Math.exp(-(u * u) / 1.6 - ((v + 0.05) * (v + 0.05)) / 0.35);                       // la cuenca
  const bu = u / 1.18, bv = (v - 0.02) / (v > 0.02 ? 0.5 : 0.66), bq = 1 - bu * bu - bv * bv;
  if (bq > 0) h += 0.1 * suave(0, 0.85, bq);                                                    // el globo bajo los párpados
  const vb = v + 0.9 - 0.12 * u;
  h += 0.12 * Math.exp(-(vb * vb) / 0.05) * Math.exp(-(u * u) / 2.6);                           // el arco de la ceja
  h += 0.1 * Math.exp(-((u - 0.25) * (u - 0.25)) / 0.8 - ((v - 1.0) * (v - 1.0)) / 0.15);        // el pómulo
  const ku = Math.exp(-Math.pow(Math.abs(u) / 1.08, 6));
  const vC = vPliegue(u);
  h -= 0.02 * (0.3 + 0.7 * abU) * Math.exp(-((v - vC) * (v - vC)) / 0.0007) * ku;              // el pliegue
  const kb = suave(1, 0.82, Math.abs(u));    // los rollos de los párpados se pierden en los rincones
  if (vU != null && v > vC && v < vU) h += 0.024 * Math.pow(Math.sin(Math.PI * (v - vC) / (vU - vC)), 0.8) * ku * kb;   // el párpado de arriba
  if (vL != null && v > vL && v < vL + 0.1) h += 0.012 * Math.sin(Math.PI * (v - vL) / 0.1) * kb;                       // el de abajo
  if (vL != null) h -= 0.014 * Math.exp(-((v - vL - 0.19) * (v - vL - 0.19)) / 0.004) * Math.exp(-((u - 0.05) * (u - 0.05)) / 0.5);   // la ojera
  return h;
}

// ── el ojo entero ────────────────────────────────────────────────────────────────────────────────────────────────
export function ojo(o = {}) {
  const { cx = FIN.cx, cy = FIN.cy, a = FIN.a, arriba = 0, abajo = 0, mirada = [0, 0], pupila = 0.5, t = 0, cosas = [], vineta = 1 } = o;
  const T = destino();
  const X0 = Math.max(0, Math.floor(o.x0 ?? 0)), Y0 = Math.max(0, Math.floor(o.y0 ?? 0)), X1 = Math.min(T.w - 1, Math.ceil(o.x1 ?? T.w - 1)), Y1 = Math.min(T.h - 1, Math.ceil(o.y1 ?? T.h - 1));
  const abU = 1 - clamp(arriba, -0.15, 1), abL = 1 - clamp(abajo, -0.15, 1);
  const bordes = bordesOjo({ cx, cy, a, arriba, abajo });
  const ri = PROP.RI * a, icx = cx + clamp(mirada[0], -1, 1) * 0.22 * a, icy = cy + PROP.DI * a + clamp(mirada[1], -1, 1) * 0.08 * a;
  const rp = ri * mezcla(0.3, 0.56, clamp(pupila, 0, 1));
  const w = X1 - X0 + 1, h = Y1 - Y0 + 1;
  // 1) la piel: alturas en la rejilla de píxeles (con un píxel de margen) y normal por diferencias
  const hw = w + 2, hh = h + 2, HF = new Float32Array(hw * hh);
  const BU = new Float32Array(w), BL = new Float32Array(w), dentroX = new Uint8Array(w);
  for (let i = 0; i < hw; i++) {
    const x = X0 + i - 1 + 0.5, b = bordes(x), u = (x - cx) / a;
    const vU = b ? (b[0] - cy) / a : null, vL = b ? (b[1] - cy) / a : null;
    if (b && i >= 1 && i <= w) { BU[i - 1] = b[0]; BL[i - 1] = b[1]; dentroX[i - 1] = 1; }
    for (let j = 0; j < hh; j++) HF[j * hw + i] = alturaPiel(u, (Y0 + j - 1 + 0.5 - cy) / a, vU, vL, abU);
  }
  const fino = a >= 60;
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const x = X0 + i, y = Y0 + j, k = (j + 1) * hw + (i + 1);
    const gx = (HF[k + 1] - HF[k - 1]) * 0.5 * a, gy = (HF[k + hw] - HF[k - hw]) * 0.5 * a;
    const n = [-gx * 1.5, -gy * 1.5, 1], nl = Math.hypot(n[0], n[1], n[2]);
    const lam = Math.max(0, (n[0] * LK[0] + n[1] * LK[1] + n[2] * LK[2]) / nl), rim = Math.max(0, (n[0] * LR[0] + n[1] * LR[1] + n[2] * LR[2]) / nl);
    const u = (x + 0.5 - cx) / a, v = (y + 0.5 - cy) / a;
    let lv = 1.9 + 3.9 * (0.1 + 0.9 * lam) + (rim > 0.35 ? Math.min(0.6, (rim - 0.35) * 1.4) : 0);
    lv -= 0.5 * suave(0.95, 2.0, Math.hypot(u * 0.75, v * 1.05));                                      // la cara se aleja de la luz
    lv -= 0.45 * Math.exp(-((v + 0.68) * (v + 0.68)) / 0.02) * Math.exp(-(u * u) / 1.4);               // sombra bajo la ceja
    if (fino) lv += 0.16 * (vnoise(x * 0.45 + 7, y * 0.45) - 0.5) + 0.1 * (vnoise(x * 1.3, y * 1.3) - 0.5);   // poros
    T.buf[y * T.w + x] = tono(PIEL, lv, x, y, 0.4);
  }
  if (a >= 24) ceja(cx, cy, a, X0, Y0, X1, Y1);
  // 2) el globo, dentro de la rendija
  const ESC = PALO.ESCLERA, IR = PALO.IRIS, PU = PALO.PUPILA;
  const brU = (i) => BU[i], brL = (i) => BL[i];
  const dentro = new Uint8Array(w * h);
  for (let i = 0; i < w; i++) {
    if (!dentroX[i]) continue;
    const x = X0 + i;
    const ya = Math.ceil(BU[i] - 0.5), yb = Math.floor(BL[i] - 0.5);
    for (let y = Math.max(Y0, ya); y <= Math.min(Y1, yb); y++) {
      const j = y - Y0; dentro[j * w + i] = 1;
      const u = (x + 0.5 - cx) / a, v = (y + 0.5 - cy - 0.02 * a) / a;
      // esfera del globo (radio 0,95 a)
      const q = clamp(1 - (u * u + v * v) / (0.95 * 0.95), 0, 1), nz = Math.sqrt(q);
      const lam = Math.max(0, (u / 0.95) * LK[0] * 0.6 + (v / 0.95) * LK[1] * 0.6 + nz * LK[2]);
      const dTop = (y + 0.5 - BU[i]) / a, dBot = (BL[i] - (y + 0.5)) / a;
      const somb = Math.exp(-dTop / 0.07) * 1.9 + Math.exp(-dBot / 0.03) * 0.5;          // sombra de los párpados y las pestañas
      let c;
      const di = Math.hypot(x + 0.5 - icx, y + 0.5 - icy);
      if (di < ri) {
        // el iris: fibras radiales, collarete ámbar, anillo límbico, luz que atraviesa la córnea (abajo a la derecha)
        const rr = di / ri, th = Math.atan2(y + 0.5 - icy, x + 0.5 - icx);
        if (di < rp) {
          let lvp = 0.4 + 0.9 * suave(0.55, 1, di / rp) * 0.4 + (fino ? 0.5 * Math.max(0, Math.cos(th - 0.8)) * suave(0.3, 0.9, di / rp) : 0);
          c = tono(PU, lvp - somb * 0.3, x, y, 0.5);
        } else {
          const s = (rr - rp / ri) / (1 - rp / ri);
          const fib = Math.sin(th * (a >= 100 ? 46 : a >= 40 ? 26 : 12) + 5 * vnoise(th * 3, rr * 6)) * 0.5 + 0.5;
          const fib2 = vnoise(th * 18, rr * 14);
          let lv = 3.1 + 1.7 * (1 - Math.abs(s - 0.38) * 1.6) + 1.1 * (fib - 0.5) + 0.9 * (fib2 - 0.5);
          lv += 1.6 * Math.exp(-((s - 0.2) * (s - 0.2)) / 0.004) * (0.6 + 0.4 * Math.sin(th * 9));       // collarete
          lv += 1.5 * Math.max(0, Math.cos(th - 0.75)) * suave(0.15, 0.6, s) * (1 - suave(0.85, 1, s)); // luz por la córnea
          lv -= 3.4 * suave(0.82, 1.0, s);                                                                // anillo límbico
          if (fino && vnoise(th * 7 + 11, s * 5) > 0.72 && s > 0.3 && s < 0.8) lv -= 1.2;                  // criptas
          c = tono(IR, lv - somb * 1.6, x, y, 0.45);
        }
      } else {
        let lv = 1.8 + 3.6 * lam + 0.6 * nz;
        lv -= 1.1 * suave(0.55, 1.0, Math.abs(u));
        if (fino) lv += 0.25 * (vnoise(x * 0.4, y * 0.4) - 0.5);
        c = tono(ESC, lv - somb, x, y, 0.5);
        // venitas rosadas hacia los rincones
        if (fino && Math.abs(u) > 0.62 && vnoise(x * 0.35 + y * 0.9, y * 0.12) > 0.83) c = mezclaColor(c, PALO.CARUNCULA[2], 0.45);
        // la carúncula del lagrimal
        const cu = (u + 0.93) / 0.08, cv = (v + 0.0) / 0.07;
        if (cu * cu + cv * cv < 1) c = tono(PALO.CARUNCULA, 2.2 + 1.6 * (1 - cu * cu - cv * cv) - somb * 0.6, x, y, 0.5);
      }
      T.buf[y * T.w + x] = c;
    }
  }
  // brillos de la córnea (la luz principal arriba a la izquierda y un reflejo pequeño a la derecha)
  const brillo = (bx, by, r, cc) => {
    for (let y = Math.floor(by - r); y <= Math.ceil(by + r); y++) for (let x = Math.floor(bx - r); x <= Math.ceil(bx + r); x++) {
      if (x < X0 || y < Y0 || x > X1 || y > Y1 || !dentro[(y - Y0) * w + (x - X0)]) continue;
      const d = Math.hypot(x + 0.5 - bx, (y + 0.5 - by) * 1.15) / r;
      if (d < 1) T.buf[y * T.w + x] = d < 0.62 ? cc : mezclaColor(cc, T.buf[y * T.w + x], 0.55);
    }
  };
  brillo(icx - ri * 0.42, icy - ri * 0.4, Math.max(1, ri * 0.15), PAL.BLANCO);
  if (ri > 14) brillo(icx + ri * 0.36, icy + ri * 0.32, Math.max(1, ri * 0.06), PALO.ESCLERA[6]);
  // 3) las cosas (tras los párpados: solo dentro de la rendija)
  if (cosas.length) {
    const T2 = { w: T.w, h: T.h, buf: new Uint32Array(T.buf) };
    for (const k of cosas) cosaEn(T2, k);
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (dentro[j * w + i]) { const p = (Y0 + j) * T.w + X0 + i; T.buf[p] = T2.buf[p]; }
  }
  // 4) los bordes de los párpados: la línea de las raíces arriba, la línea de agua abajo, la sombra sobre el globo
  const gros = a >= 110 ? 3 : a >= 50 ? 2 : 1;
  for (let i = 0; i < w; i++) {
    if (!dentroX[i]) continue;
    const x = X0 + i, u = (x + 0.5 - cx) / a;
    const yU = Math.ceil(BU[i] - 0.5), yL = Math.floor(BL[i] - 0.5);
    const gU = Math.max(1, Math.round(gros * Math.min(1, (1 - u * u) * 3 + 0.35)));
    for (let k = 0; k < gU; k++) { const y = yU - 1 + k; if (y >= Y0 && y <= Y1) T.buf[y * T.w + x] = k === 0 ? PAL.TINTA : PELO[0]; }
    { const y = yU - 1 - 1; if (y >= Y0 && y <= Y1 && gros >= 2) T.buf[y * T.w + x] = tono(PIEL, 2.6 + 0.4 * (1 - abU), x, y, 0); }    // el canto del párpado
    if (yL + 1 >= Y0 && yL + 1 <= Y1) T.buf[(yL + 1) * T.w + x] = tono(PALO.CARUNCULA, 3.3, x, yL + 1, 0.3);           // línea de agua
    if (gros >= 2 && yL + 2 >= Y0 && yL + 2 <= Y1) T.buf[(yL + 2) * T.w + x] = tono(PIEL, 2.7, x, yL + 2, 0.3);
  }
  // 5) pestañas: arriba largas y en mechones (más hacia el rabillo), abajo cortas y claras
  if (a >= 14) pestanas(cx, cy, a, bordes, abU, X0, Y0, X1, Y1, abL);
  // 6) la franja, delante
  if (o.franja && (o.franja.ancho ?? 1) > 0) franja(cx, cy, a * 0.985, o.franja);
  // 7) viñeta: la piel se apaga lejos del ojo
  if (vineta > 0) for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) {
    const d = Math.hypot((x + 0.5 - cx) / (a * 1.75), (y + 0.5 - cy) / (a * 1.1));
    const q = Math.floor(clamp((d - 0.72) * 0.9, 0, 0.6) * vineta * 5 + b4(x, y)) / 5;
    if (q > 0) { const i = y * T.w + x, p = T.buf[i], f = 1 - q; T.buf[i] = color((p & 255) * f * 0.97, ((p >>> 8) & 255) * f, ((p >>> 16) & 255) * f * 1.04); }
  }
  return { iris: [icx, icy], ri, bordes };
}

function pestanas(cx, cy, a, bordes, abU, X0, Y0, X1, Y1, abL = 1) {
  const T = destino();
  const put = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= X0 && y >= Y0 && x <= X1 && y <= Y1) T.buf[y * T.w + x] = c; };
  const N = Math.round(clamp(a * 0.42, 10, 80));
  const gr = a >= 100 ? 2 : 1;
  for (let k = 0; k < N; k++) {
    const s = k / (N - 1);
    const u = mezcla(-0.8, 0.97, Math.pow(s, 0.9)) + 0.006 * Math.sin(k * 7.3);
    const x0 = cx + u * a, b = bordes(x0); if (!b) continue;
    const y0 = b[0] - 1;
    const lat = suave(-0.7, 0.95, u);
    // en mechones de tres: las puntas se juntan
    const g = k % 3, junta = (g - 1) * -0.09;
    const L = a * (0.05 + 0.075 * lat) * (0.8 + 0.2 * Math.abs(Math.sin(k * 2.17))) * (0.6 + 0.4 * abU);
    let ang = -Math.PI / 2 + u * 0.95 + junta;
    const curva = -0.38 * Math.sign(u + 0.02) * (0.4 + lat);
    let x = x0 + 0.5, y = y0 + 0.5;
    const n = Math.max(2, Math.ceil(L));
    for (let i = 0; i < n; i++) {
      const f = i / n;
      put(x - 0.5, y - 0.5, f < 0.6 ? PAL.TINTA : PELO[f < 0.85 ? 0 : 1]);
      if (gr > 1 && f < 0.35) put(x + 0.5, y - 0.5, PAL.TINTA);
      ang += curva / n;
      x += Math.cos(ang); y += Math.sin(ang);
    }
  }
  // abajo: cortas, claras y escasas
  const Nb = Math.round(clamp(a * 0.12, 0, 22) * suave(0.05, 0.5, abL));
  for (let k = 0; k < Nb; k++) {
    const u = mezcla(-0.5, 0.92, k / Math.max(1, Nb - 1)) + 0.02 * Math.sin(k * 5.1);
    const x0 = cx + u * a, b = bordes(x0); if (!b) continue;
    const L = a * (0.022 + 0.022 * suave(-0.4, 0.9, u)) * (0.7 + 0.3 * Math.abs(Math.sin(k * 3.7))) * (0.5 + 0.5 * abL);
    const ang = Math.PI / 2 + u * 0.6;
    let x = x0 + 0.5, y = b[1] + 2.5;
    for (let i = 0; i < Math.ceil(L); i++) { put(x - 0.5, y - 0.5, i < L * 0.5 ? PELO[1] : PELO[2]); x += Math.cos(ang); y += Math.sin(ang); }
  }
}

// la ceja: pelos sueltos en un arco (de pie junto al lagrimal, tumbados hacia el rabillo)
function ceja(cx, cy, a, X0, Y0, X1, Y1) {
  const T = destino();
  const N = Math.round(clamp(a * 1.4, 30, 320));
  let sd = 9137;
  const rnd = () => { sd = (sd * 1103515245 + 12345) & 0x7fffffff; return sd / 0x7fffffff; };
  for (let k = 0; k < N; k++) {
    const u = mezcla(-1.3, 1.2, rnd());
    const vB = -0.93 + 0.12 * u + 0.09 * (u - 0.3) * (u - 0.3) * 0.5;
    const th = 0.13 * (1 - 0.55 * suave(0.2, 1.2, u)) * (1 - 0.4 * suave(-1.0, -1.3, u));
    const v = vB + (rnd() - 0.5) * th;
    const x0 = cx + u * a, y0 = cy + v * a;
    if (x0 < X0 - 20 || x0 > X1 + 20 || y0 < Y0 - 20 || y0 > Y1 + 20) continue;
    const ang = u < -0.9 ? mezcla(-1.25, -0.7, suave(-1.3, -0.9, u)) : mezcla(-0.55, 0.25, suave(-0.9, 1.1, u));
    const L = a * (0.05 + 0.03 * rnd());
    const lvl = 1.2 + 2.2 * (0.5 - (v - vB) / th) * 0.6 + 1.4 * rnd() - 0.6 * suave(0.4, 1.2, u);
    let x = x0, y = y0;
    for (let i = 0; i < Math.ceil(L); i++) {
      const X = Math.round(x), Y = Math.round(y);
      if (X >= X0 && Y >= Y0 && X <= X1 && Y <= Y1) T.buf[Y * T.w + X] = tono(PELO, lvl + (i / L) * 0.8, X, Y, 0);
      x += Math.cos(ang + i * 0.02); y += Math.sin(ang + i * 0.02);
    }
  }
}

// ── la franja de luz ────────────────────────────────────────────────────────────────────────────────────────────
export function franja(cx, y, mA, o = {}) {
  const T = destino();
  const alto = o.alto ?? FRANJA.alto, ancho = clamp(o.ancho ?? 1, 0, 1), br = o.brillo ?? 1;
  if (ancho <= 0 || br <= 0) return;
  const L = mA * ancho, yc = Math.round(y);
  const AM = rgb(PAL.AMBAR[4]), CR = rgb(PAL.CREMA[5]);
  // halo (sumado)
  const R = Math.max(6, alto * 4 + 4);
  for (let yy = yc - R; yy <= yc + R; yy++) {
    if (yy < 0 || yy >= T.h) continue;
    const dy = Math.abs(yy - yc);
    for (let x = Math.floor(cx - L - R); x <= Math.ceil(cx + L + R); x++) {
      if (x < 0 || x >= T.w) continue;
      const u = (x + 0.5 - cx) / Math.max(1, L);
      const env = Math.abs(u) < 1 ? Math.pow(1 - u * u, 0.35) : Math.max(0, 1 - (Math.abs(x + 0.5 - cx) - L) / R) * 0.2;
      const I = br * env * (0.55 * Math.exp(-dy / (alto * 1.4)) + 0.12 * Math.exp(-dy / (alto * 4)));
      if (I > 0.02) sumar(yy * T.w + x, x, yy, AM, I);
    }
  }
  // núcleo: blanco, borde crema; las puntas se afinan
  for (let x = Math.floor(cx - L); x <= Math.ceil(cx + L); x++) {
    if (x < 0 || x >= T.w) continue;
    const u = (x + 0.5 - cx) / Math.max(1, L); if (Math.abs(u) >= 1) continue;
    const th = alto * Math.pow(1 - Math.pow(Math.abs(u), 5), 0.5);
    for (let dy = -Math.ceil(th); dy <= Math.ceil(th); dy++) {
      const yy = yc + dy; if (yy < 0 || yy >= T.h) continue;
      const e = Math.abs(dy) / Math.max(0.6, th);
      if (e > 1.05) continue;
      const c = e < 0.55 ? PAL.BLANCO : e < 0.85 ? PAL.CREMA[5] : PAL.AMBAR[5];
      T.buf[yy * T.w + x] = br >= 1 ? c : mezclaColor(T.buf[yy * T.w + x], c, br);
    }
  }
}

// ── las cosas ───────────────────────────────────────────────────────────────────────────────────────────────────
function cosaEn(T2, k) { en(T2, () => cosa(k.tipo, k.x, k.y, k.r, k)); }

const apagar = (c, ap) => (ap <= 0 ? c : mezclaColor(c, mezclaColor(hex('#2a2428'), c, 0.18), clamp(ap, 0, 1) * 0.92));
export function cosa(tipo, x, y, r, o = {}) {
  const ap = clamp(o.apagado ?? 0, 0, 1), ve = clamp(o.aparece ?? 1, 0, 1);
  if (ve <= 0 || r <= 0) return;
  const rr = r * (0.55 + 0.45 * ve) * (ve < 1 ? 1 + 0.12 * Math.sin(ve * Math.PI) : 1);
  const T = destino();
  // velo oscuro detrás (se lee sobre la esclerótica clara) y halo propio
  sombra(Math.round(x), Math.round(y), rr * 1.35, rr * (tipo === 'galaxia' ? 0.8 : 1.35), 0.42 * ve);
  if (ap < 0.9) luz(Math.round(x), Math.round(y), rr * 1.6, tipo === 'celula' ? hex('#e58e93') : tipo === 'atomo' ? hex('#98afd4') : hex('#9fb4e6'), 0.22 * (1 - ap) * ve, 3);
  if (tipo === 'celula') celula(x, y, rr, ap);
  else if (tipo === 'atomo') atomoCualquiera(x, y, rr, ap, o.giro ?? 0);
  else galaxia(x, y, rr, ap, o.giro ?? -0.35);
}

function celula(cx, cy, R, ap) {
  const T = destino(), C = PALO.CELULA, N = PALO.NUCLEO, M = PALO.MITO;
  const forma = (th) => R * (1 + 0.06 * Math.sin(3 * th + 0.7) + 0.04 * Math.sin(5 * th + 2.1));
  const nx = cx - 0.16 * R, ny = cy - 0.06 * R, nr = 0.37 * R;
  const mitos = [[0.42, -0.38, 0.6], [0.5, 0.28, -0.4], [-0.15, 0.55, 0.15], [-0.55, 0.1, 1.3]];
  for (let y = Math.floor(cy - R * 1.15) - 1; y <= Math.ceil(cy + R * 1.15) + 1; y++) for (let x = Math.floor(cx - R * 1.15) - 1; x <= Math.ceil(cx + R * 1.15) + 1; x++) {
    if (x < 0 || y < 0 || x >= T.w || y >= T.h) continue;
    const dx = x + 0.5 - cx, dy = y + 0.5 - cy, d = Math.hypot(dx, dy), th = Math.atan2(dy, dx), Rf = forma(th);
    if (d > Rf + 1) continue;
    let c;
    if (d > Rf) c = C[0];                                                   // contorno
    else if (d > Rf - Math.max(1.5, R * 0.1)) c = tono(C, 4.6 + 1.3 * (-(dx + dy) / (R * 1.4)), x, y, 0.4);   // membrana
    else {
      // citoplasma translúcido con granitos
      let lv = 3.6 + 0.9 * (-(dx + dy) / (R * 1.5)) + 0.5 * (vnoise(x * 0.5, y * 0.5) - 0.5);
      const dn = Math.hypot(x + 0.5 - nx, (y + 0.5 - ny) * 1.08);
      if (dn < nr + 1.2 && dn > nr - 0.2) c = N[1];
      else if (dn < nr) {
        let ln = 2.4 + 2.0 * (-((x + 0.5 - nx) + (y + 0.5 - ny)) / (nr * 1.6)) + 0.6 * (vnoise(x * 0.7 + 3, y * 0.7) - 0.5);
        if (Math.hypot(x + 0.5 - (nx + nr * 0.25), y + 0.5 - (ny + nr * 0.15)) < nr * 0.32) ln = 0.8;       // nucléolo
        c = tono(N, ln, x, y, 0.4);
      } else {
        // retículo: dos arcos alrededor del núcleo
        const ring = Math.abs(dn - nr * 1.45) < 0.6 && Math.sin(Math.atan2(y + 0.5 - ny, x + 0.5 - nx) * 3 + 1) > 0.1;
        const ring2 = Math.abs(dn - nr * 1.85) < 0.6 && Math.sin(Math.atan2(y + 0.5 - ny, x + 0.5 - nx) * 2 - 1) > 0.3;
        if ((ring || ring2) && R >= 10) lv -= 1.3;
        c = tono(C, lv, x, y, 0.5);
        for (const [mx, my, ma] of mitos) {
          const qx = (x + 0.5 - (cx + mx * R)), qy = (y + 0.5 - (cy + my * R));
          const ux = qx * Math.cos(ma) + qy * Math.sin(ma), uy = -qx * Math.sin(ma) + qy * Math.cos(ma);
          const L = 0.17 * R, Wm = Math.max(1.2, 0.08 * R);
          const dd = Math.hypot(Math.max(Math.abs(ux) - L, 0), uy) - Wm;
          if (dd < 0) { c = tono(M, 3.2 - 1.2 * (uy / Wm) + (Math.abs(uy) < 0.6 && Math.sin(ux * 1.7) > 0 ? -1.4 : 0), x, y, 0.3); }
          else if (dd < 1) c = M[0];
        }
      }
    }
    T.buf[y * T.w + x] = apagar(c, ap);
  }
}

function atomoCualquiera(cx, cy, R, ap, giro) {
  const F = PALO.FRIO, P = PALO.PIZARRA, CR = PAL.CREMA;
  const ORB = [[0.15 + giro, 0.36], [1.2 + giro, 0.32], [-0.95 + giro, 0.3]];
  const pts = [];
  ORB.forEach(([ang, k], oi) => {
    const ca = Math.cos(ang), sa = Math.sin(ang), N = Math.ceil(R * 8);
    for (let i = 0; i < N; i++) {
      const th = (i / N) * Math.PI * 2, ex = R * Math.cos(th), ey = R * k * Math.sin(th);
      pts.push([Math.floor(cx + ex * ca - ey * sa), Math.floor(cy + ex * sa + ey * ca), Math.sin(th) * (oi % 2 ? -1 : 1)]);
    }
  });
  for (const [x, y, z] of pts) if (z < 0) pset(x, y, apagar(F[2], ap));
  // núcleo: seis bolitas de pizarra y crema
  const rn = Math.max(2, R * 0.26);
  const bolas = [[-0.35, -0.3, 1], [0.35, -0.25, 0], [0, 0.32, 1], [-0.4, 0.25, 0], [0.38, 0.3, 1], [0, -0.05, 0]];
  disco(cx, cy, rn + 1, apagar(P[0], ap));
  for (const [bx, by, tp] of bolas) {
    const X = cx + bx * rn, Y = cy + by * rn, rb = rn * 0.55;
    disco(X, Y, rb, (px, py) => {
      const d = Math.hypot(px + 0.5 - X + rb * 0.35, py + 0.5 - Y + rb * 0.35) / rb;
      const ramp = tp ? CR : P;
      return apagar(ramp[d < 0.5 ? ramp.length - 1 : d < 1 ? ramp.length - 2 : 1], ap);
    });
  }
  for (const [x, y, z] of pts) if (z >= 0) pset(x, y, apagar(F[4], ap));
  // electrones
  ORB.forEach(([ang, k], oi) => {
    const th = 1.1 + oi * 2.2, ex = R * Math.cos(th), ey = R * k * Math.sin(th);
    const X = cx + ex * Math.cos(ang) - ey * Math.sin(ang), Y = cy + ex * Math.sin(ang) + ey * Math.cos(ang);
    disco(X, Y, Math.max(1.2, R * 0.1), apagar(F[5], ap));
  });
}

function galaxia(cx, cy, R, ap, giro) {
  const T = destino(), G = PALO.GAL;
  const ca = Math.cos(giro), sa = Math.sin(giro), k = 0.46;
  const AM = rgb(PAL.CREMA[5]), AZ = rgb(G[5]), RO = rgb(hex('#f0a0b8'));
  for (let y = Math.floor(cy - R) - 1; y <= Math.ceil(cy + R) + 1; y++) for (let x = Math.floor(cx - R * 1.1) - 1; x <= Math.ceil(cx + R * 1.1) + 1; x++) {
    if (x < 0 || y < 0 || x >= T.w || y >= T.h) continue;
    const dx = x + 0.5 - cx, dy = y + 0.5 - cy;
    const lx = (dx * ca + dy * sa) / R, ly = (-dx * sa + dy * ca) / (R * k);
    const r = Math.hypot(lx, ly); if (r > 1.08) continue;
    const th = Math.atan2(ly, lx);
    const espiral = th - Math.log(Math.max(r, 0.05)) * 2.6;
    const brazo = Math.pow(0.5 + 0.5 * Math.cos(2 * espiral), 3);
    const polvo = Math.pow(0.5 + 0.5 * Math.cos(2 * espiral + 0.75), 8) * suave(0.15, 0.5, r);
    const bulbo = Math.exp(-(r * r) / 0.022);
    const disco_ = Math.exp(-r * 2.0) * (0.25 + 0.75 * brazo) * (1 - 0.55 * polvo) * (1 - suave(0.85, 1.05, r));
    const n = vnoise(x * 0.6, y * 0.6);
    const I = (bulbo * 1.5 + disco_ * 2.1 * (0.75 + 0.5 * n)) * (1 - ap * 0.85);
    if (I < 0.04) continue;
    const i = y * T.w + x;
    const mix = clamp(bulbo * 1.6, 0, 1);
    const c = [mezcla(AZ[0], AM[0], mix), mezcla(AZ[1], AM[1], mix), mezcla(AZ[2], AM[2], mix)];
    sumar(i, x, y, c, Math.min(1.1, I));
    if (brazo > 0.8 && r > 0.3 && r < 0.9 && n > 0.78 && ap < 0.6) T.buf[i] = mezclaColor(T.buf[i], color(RO[0], RO[1], RO[2]), 0.7);   // nudos rosados
    if (bulbo > 0.75 && ap < 0.5) T.buf[i] = PAL.BLANCO;
  }
}

// ── la mirilla ──────────────────────────────────────────────────────────────────────────────────────────────────
export function pegarMirilla(capa, cx, cy, R, borde = 20) {
  const T = destino();
  for (let y = 0; y < T.h; y++) for (let x = 0; x < T.w; x++) {
    const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
    const m = clamp((R - d) / Math.max(1, borde), 0, 1);
    if (m <= 0) continue;
    if (m >= 1 || b8(x, y) < m) { const c = capa.buf[y * capa.w + x]; if (c) T.buf[y * T.w + x] = c; }
  }
}

// ── el final de px-ep3-hola (= el principio de px-ep3-ojo), sin Atom ni post ─────────────────────────────────────
export function pintarFinalHola() {
  return ojo({ ...FIN, t: 0 });
}
