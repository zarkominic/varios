E = {}

# Ayudas comunes de pintura (tramas, nubes de pensar, globos, la Luna pequeña, cifras de 3 × 5), repetidas en cada escena.
AYUDAS = r'''
const { rect, pset, linea, disco, poligono } = R;
const BY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const trama = (x, y) => BY[(y & 3) * 4 + (x & 3)] / 16;
const rampa = (cs, v, x, y) => cs[Math.max(0, Math.min(cs.length - 1, Math.floor(v + trama(x, y))))];
const h2 = (x, y) => { let n = (x * 374761393 + y * 668265263) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
const H = (s) => hex(s);
const K_ = H('#1a1a26'), BL_ = H('#f4f2ea'), BS_ = H('#cfcabc');
const fondoFijo = (cache, clave, pinta) => { let b = cache[clave]; if (!b) { b = R.nuevo(); const prev = R.usar(b); R.recorte(null); pinta(); R.recorte(null); R.usar(prev); cache[clave] = b; } R.copiar(b); };
const CACHE = {};
// cifras de 3 × 5 (solo números)
const DIG = { 0: ['###', '#.#', '#.#', '#.#', '###'], 1: ['.#.', '##.', '.#.', '.#.', '###'], 2: ['###', '..#', '###', '#..', '###'], 3: ['###', '..#', '.##', '..#', '###'], 4: ['#.#', '#.#', '###', '..#', '..#'], 5: ['###', '#..', '###', '..#', '###'], 6: ['###', '#..', '###', '#.#', '###'], 7: ['###', '..#', '.#.', '.#.', '.#.'], 8: ['###', '#.#', '###', '#.#', '###'], 9: ['###', '#.#', '###', '..#', '###'] };
const cifras = (n, x, y, c) => String(n).split('').forEach((d, k) => { const g = DIG[d]; if (g) g.forEach((f, j) => { for (let i = 0; i < 3; i++) if (f[i] === '#') pset(x + k * 4 + i, y + j, c); }); });
// globo de diálogo (rectángulo redondeado con su cola hacia [cx, cy])
const globo = (x0, y0, x1, y1, cx, cy) => {
  const mx = Math.max(x0 + 5, Math.min(x1 - 5, cx));
  poligono([[mx - 4, y1 - 1], [mx + 4, y1 - 1], [cx, cy]], K_);
  rect(x0 + 1, y0, x1 - 1, y1, K_); rect(x0, y0 + 1, x1, y1 - 1, K_);
  rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, BL_); rect(x0 + 1, y1 - 2, x1 - 1, y1 - 1, BS_); rect(x0 + 1, y0 + 1, x0 + 1, y1 - 2, H('#ffffff'));
  poligono([[mx - 3, y1 - 2], [mx + 3, y1 - 2], [cx, cy - 2]], BS_);
};
// nube de pensar con tres bolitas que bajan hacia la cabeza (hx, hy); e 0–1 la hace crecer
const piensa = (cx, cy, r, hx, hy, e = 1) => {
  if (e <= 0) return;
  const rr = r * Math.min(1, e * 1.25), bolas = [[0, 0, 1], [-0.72, 0.18, 0.66], [0.72, 0.18, 0.66], [-0.38, -0.56, 0.62], [0.38, -0.56, 0.62], [0, 0.5, 0.72]];
  for (let i = 1; i <= 3; i++) { const u = 0.25 + i * 0.22; if (e > i * 0.15) { disco(lerp(cx, hx, u), lerp(cy + r, hy, u), 3.4 - i * 0.7, K_); disco(lerp(cx, hx, u), lerp(cy + r, hy, u), 2.4 - i * 0.6, BL_); } }
  for (const [dx, dy, k] of bolas) disco(cx + dx * rr, cy + dy * rr, rr * k * 0.78 + 1, K_);
  for (const [dx, dy, k] of bolas) disco(cx + dx * rr, cy + dy * rr, rr * k * 0.78, BL_);
  for (const [dx, dy, k] of bolas.slice(3, 5)) disco(cx + dx * rr - 1, cy + dy * rr - 1, rr * k * 0.3, H('#ffffff'));
};
// la Luna pequeña (con mares, cráteres y su lado de sombra)
const lunita = (cx, cy, r) => {
  disco(cx, cy, r + 1, H('#3a3a48')); disco(cx, cy, r, H('#d8d4c4')); disco(cx + r * 0.25, cy + r * 0.1, r * 0.85, H('#ece8d8'));
  disco(cx - r * 0.3, cy - r * 0.25, r * 0.28, H('#a8a494')); disco(cx + r * 0.3, cy + r * 0.3, r * 0.22, H('#b4b0a0')); disco(cx + r * 0.05, cy - r * 0.45, r * 0.15, H('#b8b4a4'));
  for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r && x < -r * 0.45 && (x + y) % 2 === 0) pset(cx + x, cy + y, H('#8a8678'));
};
// un cohete de tiza pequeño (7 × 11) que apunta a la derecha y arriba
const cohete = (x, y, c = H('#f4f2ea')) => { x = Math.round(x); y = Math.round(y); rect(x - 1, y - 3, x + 1, y + 3, c); pset(x, y - 4, H('#d84a3a')); pset(x - 1, y - 3, H('#d84a3a')); pset(x + 1, y - 3, H('#d84a3a')); pset(x - 2, y + 2, H('#d84a3a')); pset(x + 2, y + 2, H('#d84a3a')); pset(x - 2, y + 3, H('#d84a3a')); pset(x + 2, y + 3, H('#d84a3a')); pset(x, y + 4, H('#f0a030')); pset(x, y + 5, H('#f8d860')); pset(x, y - 1, H('#5a8ac8')); };
// fogonazo de cámara: estrella blanca con rayos y un velo tramado en toda la pantalla (u 0–1: 1 = el destello)
const fogonazo = (x, y, u) => {
  if (u <= 0) return;
  const r = Math.round(4 + u * 10);
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; linea(x, y, Math.round(x + Math.cos(a) * r * 1.8), Math.round(y + Math.sin(a) * r * 1.8), H('#fff8d8')); }
  disco(x, y, r * 0.7, H('#fffbe8')); disco(x, y, r * 0.4, H('#ffffff'));
  if (u > 0.6) { const n = u > 0.85 ? 2 : 4; for (let yy = 0; yy < 180; yy += 1) for (let xx = (yy % n); xx < 320; xx += n) if (((xx + yy) & 3) === 0) pset(xx, yy, H('#fffcf0')); }
};
'''

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['dc-secreto'] = ('Secreto', '''// DC-SECRETO (frase 6, marca «cajon»): 1959 → 2000. Siete planos:
// 1. carrera/redaccion/cajon (1959): el archivista, subido a su escalerilla, empuja el cajón con la carpeta de la Luna;
//    el cajón se cierra en «shelved», cuelga el candado (clic) y sale una nube de polvo; el gato espía mira desde las cajas;
// 2. carrera/observatorio: Reiffel mira por el ocular y se aparta preocupado; en su nube de pensar la Luna se ensucia de
//    polvo en «contaminating» y le cae una X roja en «study it»; Sagan señala la Luna. GAG 2: el gato sube la escalera y
//    mira por la boca del telescopio, al revés: en su globito, una Luna diminuta y su «?»;
// 3. carrera/patio57 (1959, de noche): la familia ante la Luna; en «the public» una nube de pensar con la Luna y un
//    fogonazo; en «wouldn't love» la madre se enfada («!»), el padre frunce el ceño y el niño se asusta; en «It stayed
//    secret» el padre apaga la radio y la madre se lleva al niño a casa por el porche; el gato, en la valla;
// 4. animales/archivos2004 (1999): el biógrafo pasa hojas de una pila de solicitudes viejas; en «found» levanta una, en
//    «clue» salta su «!» y la lupa grande muestra el dibujo de la Luna con su trayectoria en la hoja;
// 5. fondo local: el estudio de Reiffel en 2000, de noche: la periodista pulsa la grabadora, Reiffel, mayor, cuenta la
//    historia (globo con el cohete que va a la Luna y su destello) y señala la foto de la Luna; ella se sorprende y apunta;
// 6. fondo local: la mesa de la redacción en 2000 vista desde arriba: el fax pita y saca la hoja con el dibujo de la Luna;
//    la mano abre la carpeta de la Luna en «released» y en «public» cae encima el periódico con la Luna en portada;
// 7. fondo local: el salón de 1959 (lo que habría pasado): la familia ve en la tele al general; en «made public» la Luna
//    y su fogonazo en la pantalla; en «outcry» se levantan de un salto con sus «!», se encienden las ventanas de los
//    vecinos, suena el teléfono y la madre lo coge; el gato espía salta del sofá y huye.''', AYUDAS + r'''
const P2 = en('cajon', 0.1170), P3 = en('cajon', 0.2790), P4 = en('cajon', 0.4582), P5 = en('cajon', 0.6195), P6 = en('cajon', 0.7474), P7 = en('cajon', 0.8845);
const QUIETLY = en('cajon', 0.0687), SHELVED = en('cajon', 0.0823);
const WORRIED = en('cajon', 0.1347), CONTAM = en('cajon', 0.1633), LUNA = en('cajon', 0.2021), ANTES = en('cajon', 0.2130), STUDY = en('cajon', 0.2504);
const GENERALS = en('cajon', 0.2858), PUBLICO = en('cajon', 0.3164), WOULDNT = en('cajon', 0.3354), IDEA = en('cajon', 0.3647), STAYED = en('cajon', 0.3977), FORTY = en('cajon', 0.4331);
const BIOG = en('cajon', 0.4766), FOUND = en('cajon', 0.5181), CLUE = en('cajon', 0.5344), APPS = en('cajon', 0.5752);
const Y2000 = en('cajon', 0.6236), REIFFEL = en('cajon', 0.6528), TOLD = en('cajon', 0.6869), HIMSELF = en('cajon', 0.7181);
const PART = en('cajon', 0.7821), REPORT = en('cajon', 0.8052), RELEASED = en('cajon', 0.8311), PUBLIC = en('cajon', 0.8562);
const WORDS = en('cajon', 0.8947), MADE = en('cajon', 0.9328), OUTCRY = en('cajon', 0.9757);

// ── 1 · el cajón que se cierra (1959) ──
const EMPUJA = QUIETLY - 0.9, CLIC = SHELVED + 0.08;
const escalerilla = () => {
  const M = H('#6a4424'), ML = H('#9a6a3c'), MD = H('#3a2414');
  for (const x of [198, 216]) { rect(x, 121, x + 2, 170, MD); rect(x, 121, x, 170, ML); }
  for (const y of [134, 147, 160]) { rect(197, y, 219, y + 2, M); rect(197, y, 219, y, ML); rect(197, y + 2, 219, y + 2, MD); }
  rect(193, 118, 222, 121, M); rect(193, 118, 222, 118, ML); rect(193, 121, 222, 122, MD);
  for (let k = 0; k < 5; k++) pset(196 + k * 6, 119, H('#b8b8c0'));
  rect(200, 170, 232, 171, H('#1a1410'));
};
const p1 = (t) => {
  const cierra = tramo(t, EMPUJA, SHELVED), ab = 1 - cierra;
  const g = T.carrera(R, t, { encuadre: 'redaccion', camara: 'cajon', abre: ab, candado: false });
  const yF = g.cajon[2];
  // el gato espía, sentado en la pila de cajas, sigue el cajón con la cabeza
  T.gatoEspia(R, 296, 132, t, { dir: -1, cara: t > CLIC ? 'travieso' : 'normal' });
  escalerilla();
  // el archivista en la escalerilla: da dos golpecitos a la carpeta, empuja el cajón y se sacude las manos
  const toca = t < EMPUJA - 0.2, empuja = t >= EMPUJA - 0.2 && t < CLIC + 0.1;
  const mano = toca ? [178 - (Math.floor(t * 4) % 2) * 2, yF - 8] : empuja ? [191, yF + 12] : false;
  R.actor(EL.archivista, 197, 118, t, { dir: -1, sostiene: mano, sonrisa: t > CLIC + 0.3, dedo: t > CLIC + 0.5 && t < CLIC + 0.9, habla: toca });
  // el candado que se cuelga del tirador y se balancea al cerrarse
  if (t > CLIC) {
    const b = Math.exp(-(t - CLIC) * 3) * Math.sin((t - CLIC) * 14), cx = 150 + Math.round(b * 2), cy = yF + 22;
    rect(146, yF + 18, 154, yF + 18, H('#2a2a30'));
    for (let k = 0; k < 4; k++) { pset(cx - 3, cy - 3 + k, H('#9aa0aa')); pset(cx + 3, cy - 3 + k, H('#9aa0aa')); } rect(cx - 2, cy - 4, cx + 2, cy - 4, H('#9aa0aa'));
    rect(cx - 5, cy, cx + 5, cy + 8, H('#5a3a10')); rect(cx - 4, cy + 1, cx + 4, cy + 7, H('#c8962c')); rect(cx - 4, cy + 1, cx + 4, cy + 1, H('#f0c860')); rect(cx - 4, cy + 6, cx + 4, cy + 7, H('#8a6420'));
    pset(cx, cy + 3, K_); pset(cx, cy + 4, K_); pset(cx, cy + 5, K_);
    // el polvo del golpe: una nube gris que se abre y cae
    const u = tramo(t, CLIC, CLIC + 1.2);
    if (u < 1) for (let k = 0; k < 26; k++) { const a = k * 2.4, d = 6 + u * (14 + (k % 5) * 4); const x = Math.round(150 + Math.cos(a) * d * 1.6), y = Math.round(yF + 12 + Math.sin(a) * d * 0.5 + u * u * 16); pset(x, y, H(k % 3 ? '#b8b0a0' : '#8a8478')); if (k % 2) pset(x + 1, y, H('#d0c8b8')); }
  }
};

// ── 2 · el observatorio; gag 2: el gato mira por el telescopio al revés ──
const p2 = (t) => {
  const g = T.carrera(R, t, { encuadre: 'observatorio' });
  // el gato sube la escalera rodante y se sienta en la plataforma, de cara a la boca del telescopio
  const sube = tramo(t, P2 + 0.2, P2 + 1.9), [[ex0, ey0], [ex1, ey1]] = g.escalera;
  const GAG = ANTES - 0.1, mira = t > GAG && t < P3 - 0.2;
  if (sube < 1) T.gatoEspia(R, Math.round(lerp(ex0 - 4, ex1 + 4, sube)), Math.round(lerp(ey0, ey1 - 1, sube)), t, { anda: true, dir: 1 });
  else T.gatoEspia(R, mira ? 164 : 158, 86, t, { dir: 1, cara: mira ? 'travieso' : 'normal' });
  // Sagan, al pie de la escalera, señala la Luna y se pone serio
  R.actor(EL.sagan, 112, 158, t, { dir: 1, dedo: t > LUNA - 0.3 && t < STUDY, triste: t > STUDY - 0.2, habla: t > WORRIED && t < CONTAM });
  // Reiffel mira por el ocular y se aparta, preocupado
  const aparta = tramo(t, CONTAM - 0.2, CONTAM + 0.4);
  R.actor(EL.reiffel, Math.round(224 + aparta * 8), 158, t, { dir: -1, sorpresa: t > CONTAM && t < LUNA + 0.2, triste: t > LUNA + 0.2, habla: t > ANTES && t < STUDY + 0.5 });
  T.carreraDelante(R, t, { encuadre: 'observatorio' });
  // la nube de pensar de Reiffel: la Luna que se ensucia y la X roja
  const e = tramo(t, CONTAM - 0.35, CONTAM + 0.05);
  if (e > 0) {
    const cx = 248, cy = 64; piensa(cx, cy, 21, 236, 130, e);
    if (e >= 1) {
      lunita(cx, cy - 1, 11);
      const s = tramo(t, CONTAM, LUNA + 0.4);
      R.recorte([cx - 11, cy - 12, cx + 11, cy + 10]);
      for (let k = 0; k < 40; k++) { const a = k * 2.39, d = Math.sqrt(k / 40) * 13 * s; const x = Math.round(cx + 4 + Math.cos(a) * d), y = Math.round(cy - 2 + Math.sin(a) * d * 0.8); if (Math.hypot(x - cx, y - cy + 1) <= 11) { pset(x, y, H(k % 3 ? '#7a6a50' : '#5a4a38')); pset(x + 1, y, H('#8a7a5e')); } }
      R.recorte(null);
      if (t > STUDY) { const u = tramo(t, STUDY, STUDY + 0.15); if (u > 0.5) R.icono('X', cx - 7, cy - 8, H('#d83a2a'), H('#5a1010'), 2); }
    }
  }
  // gag: lo que ve el gato por la boca del telescopio: una Luna diminuta y su «?»
  if (mira) {
    const u = tramo(t, GAG + 0.25, GAG + 0.5);
    if (u > 0) { const bx = 146, by = 58; disco(bx, by, 8, K_); disco(bx, by, 7, H('#0e1430')); for (let k = 0; k < 6; k++) pset(bx - 5 + (k * 7) % 11, by - 4 + (k * 5) % 9, H('#8a96c8')); pset(bx + 1, by, H('#f4f0d8')); pset(bx + 2, by, H('#d8d4c4')); linea(bx + 7, by + 5, 160, 74, K_);
      if (t > GAG + 0.9) R.bocadillo(bx + 12, by - 6, { icono: '?' }); }
  }
};

// ── 3 · el patio en 1959: el público no lo habría querido ──
const p3 = (t) => {
  const radio = t < STAYED + 0.3;
  T.carrera(R, t, { encuadre: 'patio57', pitido: radio });
  // la Luna llena sobre el tejado del vecino, con su halo
  for (let r = 18; r > 11; r -= 2) R.anillo(150, 36, r, H(r > 15 ? '#1a2244' : '#2a3460'));
  lunita(150, 36, 10);
  // el gato espía en la valla
  T.gatoEspia(R, 300, 111, t, { dir: -1, cara: t > STAYED ? 'travieso' : 'normal' });
  // el niño señala la Luna; luego sube por los escalones y entra con su madre
  const vuelve = tramo(t, STAYED + 0.1, P4 - 0.3);
  let nx = 150, ny = 158, nanda = false;
  if (vuelve > 0) { nanda = vuelve < 1; const d = vuelve * 3; if (d < 1) { nx = lerp(150, 142, d); } else if (d < 2) { nx = lerp(142, 122, d - 1); ny = lerp(158, 134, d - 1); } else { nx = lerp(122, 76, d - 2); ny = 134; } }
  const dentro = vuelve > 0.97;
  const madreX = vuelve > 0.5 ? lerp(100, 72, tramo(vuelve, 0.5, 0.95)) : 100;
  if (!dentro) R.actor(EL.madre57, Math.round(madreX), 134, t, { dir: vuelve > 0.4 ? -1 : 1, anda: vuelve > 0.5 && vuelve < 0.95, enfado: t > WOULDNT && t < STAYED, dedo: t > STAYED - 0.1 && vuelve < 0.4, habla: t > STAYED - 0.1 && vuelve < 0.4 });
  if (!dentro) R.actor(EL.nino57, Math.round(nx), Math.round(ny), t, { dir: vuelve > 0 ? -1 : 1, anda: nanda, dedo: t < PUBLICO + 0.4, sorpresa: t > WOULDNT && t < STAYED + 0.2, salto: t > WOULDNT && t < WOULDNT + 0.3 ? 2 : 0 });
  // el padre, tras la mesa de la radio: escucha, frunce el ceño y apaga la radio
  const apaga = t > STAYED - 0.2 && t < STAYED + 0.5;
  R.actor(EL.padre57, 210, 158, t, { dir: -1, sostiene: apaga ? [200, 134] : false, enfado: t > WOULDNT + 0.2 && t < STAYED - 0.2, triste: t > STAYED + 0.5, habla: t > GENERALS && t < PUBLICO });
  T.carreraDelante(R, t, { encuadre: 'patio57', pitido: radio });
  // la nube de pensar de la familia: la Luna con el fogonazo
  const e = t < STAYED ? tramo(t, PUBLICO - 0.4, PUBLICO) : 1 - tramo(t, STAYED, STAYED + 0.25);
  if (e > 0) {
    const cx = 196, cy = 60; piensa(cx, cy, 18, 160, 128, e);
    if (e >= 1) { lunita(cx - 1, cy, 9); const f = tramo(t, PUBLICO + 0.1, PUBLICO + 0.4) * (1 - tramo(t, IDEA, IDEA + 0.6)); if (f > 0) { const r = 2 + f * 6; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + 0.3; linea(cx + 5, cy - 4, Math.round(cx + 5 + Math.cos(a) * r), Math.round(cy - 4 + Math.sin(a) * r), H(k % 2 ? '#f0a030' : '#fff0a0')); } disco(cx + 5, cy - 4, 2 + f * 1.5, H('#ffffff')); } }
  }
  if (t > WOULDNT && t < STAYED) R.bocadillo(Math.round(madreX) + 8, 104);
};

// ── 4 · el biógrafo encuentra la pista (1999) ──
const p4 = (t) => {
  T.animales(R, t, { encuadre: 'archivos2004', dia: 14, mes: 6 });
  const pasa = t < FOUND - 0.15, coge = tramo(t, FOUND - 0.15, FOUND + 0.25);
  const flip = pasa ? ((t - P4) * 2.2) % 1 : 0;
  const mano = pasa ? [lerp(140, 170, flip < 0.5 ? flip * 2 : 1), 138 - Math.sin(flip * Math.PI) * 4] : [lerp(150, 172, coge), lerp(140, 124, coge)];
  const a = R.actor(EL.biografo, 154, 154, t, { dir: 1, sostiene: mano, sorpresa: t > CLUE - 0.05 && t < APPS - 0.2, sonrisa: t > APPS - 0.2, habla: t > APPS });
  T.animalesDelante(R, t, { encuadre: 'archivos2004' });
  // la pila de solicitudes viejas y la pila de las ya leídas
  for (let k = 0; k < 7; k++) { rect(124 - (k % 2), 143 - k, 142 - (k % 2), 143 - k, H(k % 2 ? '#d8cca8' : '#e8dcb8')); }
  rect(124, 144, 142, 145, H('#6a5a3a'));
  const leidas = pasa ? Math.floor((t - P4) * 2.2) : 4; for (let k = 0; k < Math.min(5, leidas); k++) rect(174, 143 - k, 192, 143 - k, H(k % 2 ? '#d0c4a0' : '#e4d8b4'));
  // la hoja que pasa (se voltea en el aire)
  if (pasa && flip > 0.05 && flip < 0.95) { const u = flip, x0 = lerp(133, 183, u), w = Math.abs(Math.cos(u * Math.PI)) * 9 + 1, y = 136 - Math.sin(u * Math.PI) * 10; rect(Math.round(x0 - w), Math.round(y), Math.round(x0 + w), Math.round(y + 2), H(u < 0.5 ? '#efe4c4' : '#c8bc98')); }
  // la solicitud que levanta, con su Luna pequeña
  if (!pasa) {
    const m = a && a.mano ? a.mano : [172, 124], x = Math.round(m[0]) - 6, y = Math.round(m[1]) - 14;
    rect(x - 1, y - 1, x + 13, y + 15, H('#8a7a5a')); rect(x, y, x + 12, y + 14, H('#efe4c4'));
    for (let r = 0; r < 5; r++) linea(x + 2, y + 3 + r * 2, x + (r === 2 ? 6 : 10), y + 3 + r * 2, H('#8a8070'));
    disco(x + 9, y + 9, 2, H('#c8c0a8')); pset(x + 9, y + 9, H('#5a5648')); R.anillo(x + 9, y + 9, 3, H('#c8302a'));
  }
  // la lupa grande: la hoja de cerca, con el dibujo de la Luna y la trayectoria rodeados en rojo
  const L = tramo(t, CLUE - 0.1, CLUE + 0.2);
  if (L > 0) {
    const cx = 238, cy = 80, r = Math.round(6 + L * 22);
    for (let k = -1; k <= 1; k++) linea(cx - Math.round(r * 0.7) + k, cy + Math.round(r * 0.7), cx - r - 8 + k, cy + r + 12, H(k ? '#3a2a1a' : '#7a5a3a'));
    disco(cx, cy, r + 3, H('#2a2a30')); disco(cx, cy, r + 2, H('#c8a050')); disco(cx, cy, r, H('#f2e8cc'));
    if (L >= 1) {
      R.recorte([cx - r, cy - r, cx + r, cy + r]);
      for (let k = 0; k < 3; k++) { linea(cx - 22, cy - 18 + k * 4, cx + 14 - k * 5, cy - 18 + k * 4, H('#6a6458')); linea(cx - 22, cy - 17 + k * 4, cx + 14 - k * 5, cy - 17 + k * 4, H('#b8b0a0')); }
      lunita(cx + 8, cy + 6, 9);
      for (let k = 0; k < 8; k++) { const v = k / 8; disco(Math.round(cx - 18 + v * 22), Math.round(cy + 16 - Math.sin(v * 2.4) * 12), 0.9, H('#2a2a40')); }
      cohete(cx - 18, cy + 15);
      const rr = 12 + Math.round(Math.sin(t * 8) * 0.6); for (let d = 0; d < 2; d++) R.anillo(cx + 8, cy + 6, rr + d, H('#d02a2a'));
      R.recorte(null);
      R.anillo(cx, cy, r - 1, H('#ffffff'), 3);
    }
  }
  if (t > CLUE && t < APPS + 0.6) R.bocadillo(a && a.mano ? Math.round(a.mano[0]) - 20 : 152, 116);
};

// ── 5 · fondo local: el estudio de Reiffel en 2000 ──
const fondo5 = () => fondoFijo(CACHE, 'estudio', () => {
  const PA = ['#3a2420', '#4a2c26', '#5a342c', '#6a3e32', '#7a4a38', '#8a5640'].map(H);
  for (let y = 0; y < 96; y++) for (let x = 0; x < 320; x++) {
    let v = 2.0 + Math.max(0, 1 - Math.hypot(x - 262, (y - 60) * 1.3) / 150) * 2.4 - y / 300;
    if (x % 12 === 0) v -= 0.6; else if (x % 12 === 6) v += 0.3;
    const dx = (x % 12) - 6, dy = ((y + (Math.floor(x / 12) % 2) * 7) % 14) - 7; if (Math.abs(dx) + Math.abs(dy) === 3) v += 0.7;
    pset(x, y, rampa(PA, v, x, y));
  }
  rect(0, 0, 319, 3, H('#2a1810')); rect(0, 4, 319, 4, H('#7a5a3a'));
  // el zócalo de madera con sus cuarterones
  const MD = ['#2a1a10', '#3e2614', '#54341c', '#6a4426', '#805432'].map(H);
  for (let y = 96; y < 128; y++) for (let x = 0; x < 320; x++) { let v = 2.3 + Math.sin(x * 0.11 + Math.sin(y * 0.3) * 2) * 0.5 + (h2(x >> 2, y) - 0.5) * 0.5; const px = x % 40; if (px < 2 || y < 99 || y > 125 || (px > 4 && px < 36 && (y === 101 || y === 122))) v -= 1.2; if (px === 4 || y === 102) v += 0.9; pset(x, y, rampa(MD, v, x, y)); }
  rect(0, 94, 319, 96, H('#9a7048')); rect(0, 94, 319, 94, H('#c89a68')); rect(0, 97, 319, 97, H('#2a1a10'));
  // el suelo de tarima y la alfombra
  const SU = ['#2a1a10', '#3a2416', '#4c301c', '#5e3c22', '#704a2a'].map(H);
  for (let y = 128; y < 180; y++) for (let x = 0; x < 320; x++) { const tb = Math.floor((y - 128) / 7), xx = x + tb * 37; let v = 2.2 + (y - 128) / 60 + Math.sin(xx * 0.07 + tb) * 0.4 + (h2(xx >> 3, y) - 0.5) * 0.5; if ((y - 128) % 7 === 0 || xx % 61 === 0) v -= 1.2; pset(x, y, rampa(SU, v, x, y)); }
  for (let y = -18; y <= 18; y++) for (let x = -120; x <= 120; x++) { const q = (x / 120) ** 2 + (y / 18) ** 2; if (q > 1) continue; const cx = 160 + x, cy = 160 + y; let c = q > 0.82 ? '#6a1a1a' : q > 0.7 ? '#c8a050' : q > 0.6 ? '#8a2420' : ((Math.abs(x) % 14 < 2) || (Math.abs(y) % 6 < 1)) ? '#3a3a6a' : '#9a2a24'; if (q < 0.6 && Math.abs(Math.abs(x / 120) - Math.abs(y / 18)) < 0.06) c = '#d8b060'; pset(cx, cy, H(c)); }
  // la estantería con libros
  rect(4, 18, 58, 128, H('#2a180e')); rect(6, 20, 56, 126, H('#3e2614'));
  const LIB = ['#7a2a24', '#2a4a6a', '#3a5a32', '#8a6a2a', '#5a2a5a', '#a8763a', '#2a2a3a', '#6a6a6a'];
  for (const y of [38, 58, 78, 98, 118]) { rect(6, y, 56, y + 2, H('#5a3a1e')); rect(6, y, 56, y, H('#8a5e34'));
    let x = 8; while (x < 54) { const w = 2 + Math.floor(h2(x, y) * 3), hh = 12 + Math.floor(h2(x, y + 1) * 6); if (x + w > 55) break; const c = H(LIB[Math.floor(h2(x, y + 2) * LIB.length)]); rect(x, y - hh, x + w - 1, y - 1, c); pset(x, y - hh + 2, H('#e8d8a0')); rect(x + w - 1, y - hh, x + w - 1, y - 1, H('#1a1410')); x += w + (h2(x, y + 3) > 0.85 ? 3 : 0); } }
  disco(46, 32, 4, H('#2a6a9a')); disco(45, 31, 2, H('#4a9a5a')); rect(45, 36, 47, 37, H('#c8a050'));
  // la foto de la Luna enmarcada y un diploma (rayas, sin letras)
  rect(66, 26, 106, 62, H('#5a4010')); rect(67, 27, 105, 61, H('#c8a050')); rect(69, 29, 103, 59, H('#0c0e1c'));
  for (let k = 0; k < 14; k++) pset(70 + Math.floor(h2(k, 9) * 32), 30 + Math.floor(h2(k, 8) * 28), H('#6a7098'));
  lunita(86, 44, 11);
  rect(72, 70, 100, 88, H('#3a2a10')); rect(73, 71, 99, 87, H('#efe6cc')); for (let r = 0; r < 4; r++) linea(77, 75 + r * 3, 95, 75 + r * 3, H('#9a9078')); disco(94, 84, 2, H('#c8302a'));
  // el reloj de pared
  disco(128, 24, 7, H('#3a2414')); disco(128, 24, 6, H('#efe6cc')); for (let k = 0; k < 12; k++) pset(Math.round(128 + Math.cos(k * Math.PI / 6) * 5), Math.round(24 + Math.sin(k * Math.PI / 6) * 5), H('#3a3a3a'));
  // la ventana a Chicago de noche
  rect(148, 20, 238, 94, H('#d8d0c0')); rect(150, 22, 236, 92, H('#0a1028'));
  for (let y = 22; y <= 92; y++) for (let x = 150; x <= 236; x++) { const v = (y - 22) / 70; pset(x, y, rampa(['#0a1028', '#101a3a', '#1a2a4e', '#2a3a5e'].map(H), v * 3, x, y)); }
  for (let k = 0; k < 30; k++) pset(151 + Math.floor(h2(k, 3) * 84), 23 + Math.floor(h2(k, 4) * 30), H(h2(k, 5) > 0.6 ? '#dfe6ff' : '#7a86b8'));
  lunita(166, 32, 5);
  const ED = [[150, 70, 10], [160, 58, 8], [168, 40, 7], [175, 64, 10], [185, 50, 6], [191, 30, 7], [198, 46, 9], [207, 62, 8], [215, 54, 10], [225, 66, 12]];
  for (const [x, y, w] of ED) { rect(x, y, Math.min(236, x + w), 92, H('#0a0c18')); for (let yy = y + 2; yy < 90; yy += 3) for (let xx = x + 1; xx < Math.min(236, x + w); xx += 2) if (h2(xx, yy) > 0.55) pset(xx, yy, H(h2(xx, yy + 1) > 0.5 ? '#f0c860' : '#c8a040')); }
  rect(194, 22, 194, 92, H('#d8d0c0')); rect(150, 57, 236, 57, H('#d8d0c0')); rect(148, 92, 238, 95, H('#efe6d8'));
  // las cortinas verdes con sus pliegues
  for (const [x0, x1] of [[138, 152], [234, 248]]) for (let y = 16; y < 104; y++) for (let x = x0; x <= x1; x++) { const v = 1.6 + Math.sin((x - x0) * 1.1) * 1.1 + (y > 98 ? -0.6 : 0); pset(x, y, rampa(['#0e2a1e', '#16402c', '#20563a', '#2e6e4a'].map(H), v, x, y)); }
  rect(134, 14, 252, 16, H('#8a6a30')); disco(134, 15, 2, H('#c8a050')); disco(252, 15, 2, H('#c8a050'));
  // el radiador bajo la ventana
  rect(156, 104, 228, 124, H('#8a8478')); for (let x = 158; x < 228; x += 5) { rect(x, 105, x + 3, 123, H('#c8c0b0')); rect(x, 105, x, 123, H('#e8e0d0')); rect(x + 3, 105, x + 3, 123, H('#6a6458')); }
  // el sillón de cuero verde
  rect(270, 108, 318, 162, H('#0e2418')); rect(272, 110, 316, 140, H('#1e4a30')); rect(272, 140, 316, 160, H('#16382a')); rect(268, 126, 280, 162, H('#2a5a3c')); rect(306, 126, 318, 162, H('#2a5a3c'));
  for (const [x, y] of [[282, 118], [294, 118], [306, 118], [288, 128], [300, 128]]) { pset(x, y, H('#0a1a10')); pset(x + 1, y + 1, H('#4a8a5c')); }
  rect(272, 110, 316, 111, H('#3a7a50')); rect(274, 162, 277, 168, H('#2a1a10')); rect(308, 162, 311, 168, H('#2a1a10'));
  // la mesita con la grabadora
  rect(160, 140, 204, 143, H('#3a2414')); rect(160, 140, 204, 140, H('#8a5e34')); rect(163, 143, 166, 166, H('#2a1a10')); rect(198, 143, 201, 166, H('#2a1a10')); rect(166, 156, 198, 157, H('#3a2414'));
  rect(166, 130, 194, 140, H('#16161c')); rect(167, 131, 193, 133, H('#3a3a46')); rect(170, 134, 190, 138, H('#5a5a68'));
  rect(196, 132, 202, 140, H('#efe6d8')); rect(197, 133, 201, 135, H('#a85a2a'));
  // el flexo de pie (la pantalla)
  rect(259, 60, 260, 158, H('#3a3428')); poligono([[250, 64], [270, 64], [266, 50], [254, 50]], H('#d8b878')); linea(250, 64, 270, 64, H('#f8e0a0')); rect(252, 158, 268, 160, H('#2a2418'));
  // la planta del rincón
  rect(124, 146, 138, 160, H('#8a3a1e')); rect(124, 146, 138, 147, H('#c85a2e'));
  for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k - 4) * 0.33; linea(131, 146, Math.round(131 + Math.cos(a) * 16), Math.round(146 + Math.sin(a) * 18), H(k % 2 ? '#2a6a32' : '#3a8a42')); }
});
const p5 = (t) => {
  fondo5();
  // vida: la luz del flexo que respira, las luces de la ciudad, el avión que cruza, el péndulo de las agujas, el vapor del té
  for (let r = 22; r > 8; r -= 4) R.anillo(260, 66, r + Math.sin(t * 3) * 0.6, H(r > 16 ? '#9a6a48' : '#b8885a'), 2);
  { const x = Math.round(150 + ((t * 9) % 100)); if (x < 236) { pset(x, 28, H('#ff5040')); if (Math.floor(t * 3) % 2) pset(x + 2, 28, H('#ffffff')); } }
  for (let k = 0; k < 5; k++) { const x = 151 + Math.floor(h2(k, 21) * 80), y = 66 + Math.floor(h2(k, 22) * 24); if (Math.sin(t * 1.3 + k * 2) > 0.6) pset(x, y, H('#fff0a0')); }
  { const a = t * Math.PI / 30, b = t * Math.PI / 360 * 4; linea(128, 24, Math.round(128 + Math.sin(a) * 4), Math.round(24 - Math.cos(a) * 4), K_); linea(128, 24, Math.round(128 + Math.sin(b) * 3), Math.round(24 - Math.cos(b) * 3), H('#8a2a2a')); }
  for (let k = 0; k < 3; k++) { const u = (t * 0.6 + k / 3) % 1; pset(Math.round(199 + Math.sin(u * 6 + k) * 1.5), Math.round(130 - u * 12), H(u < 0.6 ? '#d8d0c8' : '#a89a90')); }
  // la grabadora: carretes que giran y el piloto rojo una vez pulsada
  const graba = t > P5 + 0.45;
  for (const cx of [174, 186]) { disco(cx, 136, 2.4, H('#c8c8d0')); const a = graba ? t * 6 : 0; pset(Math.round(cx + Math.cos(a) * 2), Math.round(136 + Math.sin(a) * 2), K_); }
  if (graba && Math.floor(t * 2) % 2) pset(191, 132, H('#ff3030'));
  // la periodista pulsa la tecla, escucha, se sorprende y apunta
  const pulsa = t < P5 + 0.6, apunta = t > HIMSELF - 0.2;
  R.actor(EL.periodista2000, 206, 160, t, { dir: -1, sostiene: pulsa ? [190, 131] : apunta ? [204, 141] : false, sorpresa: t > TOLD && t < HIMSELF, sonrisa: t > HIMSELF + 0.4, habla: t > P5 + 0.6 && t < REIFFEL });
  if (apunta) { const m = [204, 141]; rect(m[0] - 9, m[1] - 4, m[0] - 1, m[1] + 4, H('#2a2a34')); rect(m[0] - 8, m[1] - 3, m[0] - 2, m[1] + 3, H('#efe6d8')); for (let r = 0; r < 3; r++) linea(m[0] - 7, m[1] - 2 + r * 2, m[0] - 3 - ((Math.floor(t * 4) + r) % 3), m[1] - 2 + r * 2, H('#5a5a6a')); }
  // Reiffel, mayor, entra desde la estantería, se para y lo cuenta señalando la foto de la Luna
  const entra = tramo(t, P5, P5 + 1.1), rx = Math.round(lerp(70, 116, entra));
  R.actor(EL.reiffelMayor, rx, 160, t, { dir: t > TOLD - 0.1 && t < TOLD + 0.7 ? -1 : 1, anda: entra > 0 && entra < 1, habla: t > REIFFEL - 0.1, dedo: t > TOLD - 0.1 && t < TOLD + 0.7, sonrisa: t > HIMSELF });
  // su globo: el cohete que va a la Luna y el destello
  const gl = tramo(t, REIFFEL - 0.2, REIFFEL + 0.1);
  if (gl >= 1) {
    globo(108, 84, 154, 112, rx + 12, 134);
    lunita(144, 96, 6);
    const u = tramo(t, REIFFEL + 0.1, TOLD + 0.4);
    for (let k = 0; k < 8; k++) { const v = k / 8; if (v < u) pset(Math.round(lerp(114, 138, v)), Math.round(108 - Math.sin(v * 2.4) * 10), H('#5a5a7a')); }
    cohete(lerp(114, 136, u), 108 - Math.sin(u * 2.4) * 10);
    const f = tramo(t, TOLD + 0.4, TOLD + 0.7) * (1 - tramo(t, P6 - 0.6, P6 - 0.2));
    if (f > 0) { for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; linea(140, 94, Math.round(140 + Math.cos(a) * (3 + f * 4)), Math.round(94 + Math.sin(a) * (3 + f * 4)), H(k % 2 ? '#f0a030' : '#fff0a0')); } disco(140, 94, 2, H('#ffffff')); }
  }
};

// ── 6 · fondo local: la mesa de la redacción en 2000; el informe sale a la luz ──
const fondo6 = () => fondoFijo(CACHE, 'mesa2000', () => {
  // la mesa de roble claro vista desde arriba, con sus tablas, vetas y la luz del flexo
  const MA = ['#4a2e16', '#64421e', '#7e5a2c', '#98703a', '#b0864a', '#c49a5c'].map(H);
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 2.9 + Math.sin(x * 0.03 + Math.sin(y * 0.11 + x * 0.004) * 2.2 + y * 0.02) * 0.55 + (h2(x >> 2, y) - 0.5) * 0.5 + Math.max(0, 1 - Math.hypot(x - 150, (y - 100) * 1.3) / 150) * 1.2 - Math.max(0, (Math.abs(x - 160) - 120) / 60); if (y % 45 === 0) v -= 1.6; else if (y % 45 === 1) v += 0.5; pset(x, y, rampa(MA, v, x, y)); }
  for (const [nx, ny] of [[116, 96], [212, 168], [30, 116]]) { disco(nx, ny, 3, MA[1]); disco(nx, ny, 1.5, MA[0]); }
  // el cartapacio de cuero verde (rincón tranquilo de arriba a la derecha) con su pespunte
  for (let y = 0; y < 72; y++) for (let x = 232; x < 320; x++) pset(x, y, rampa(['#0e2018', '#14281e', '#1a3024'].map(H), 1.2 + (h2(x >> 3, y >> 3) - 0.5) * 0.4 - y / 140, x, y));
  for (let x = 234; x < 320; x += 3) pset(x, 70, H('#5a7a5a')); for (let y = 0; y < 70; y += 3) pset(234, y, H('#5a7a5a')); rect(232, 72, 319, 73, H('#0a140e'));
  // el fax beige con su teclado, la pantallita y la bandeja de papel
  rect(18, 22, 120, 68, H('#3a3428')); rect(16, 20, 118, 66, H('#d8d0bc')); rect(16, 20, 118, 21, H('#efe8d8')); rect(16, 62, 118, 66, H('#a8a090'));
  rect(26, 16, 90, 24, H('#f4f2ea')); rect(26, 16, 90, 16, H('#ffffff')); rect(24, 22, 92, 26, H('#8a8478'));
  rect(84, 28, 112, 36, H('#1a2a1a')); rect(85, 29, 111, 35, H('#5a8a4a')); cifras(2000, 89, 30, H('#1a3a14'));
  for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) { rect(86 + i * 9, 40 + j * 5, 92 + i * 9, 43 + j * 5, H('#8a8478')); rect(86 + i * 9, 40 + j * 5, 92 + i * 9, 40 + j * 5, H('#f4f0e4')); }
  rect(22, 30, 76, 58, H('#c8c0ac')); rect(24, 32, 74, 56, H('#bab29e')); rect(36, 60, 98, 62, H('#1a1a1a'));
  // el teclado beige y el ratón con su cable
  rect(8, 138, 120, 176, H('#3a3428')); rect(6, 136, 118, 174, H('#d4ccb4')); rect(6, 136, 118, 137, H('#efe8d8'));
  for (let j = 0; j < 5; j++) for (let i = 0; i < 13; i++) { if (j === 4 && i > 2 && i < 10) continue; const x = 10 + i * 8, y = 140 + j * 7; rect(x, y, x + 6, y + 5, H('#8a8270')); rect(x, y, x + 6, y + 4, H('#ece6d4')); rect(x, y, x + 6, y, H('#ffffff')); }
  rect(34, 168, 82, 172, H('#ece6d4')); rect(34, 172, 82, 172, H('#8a8270'));
  for (let k = 0; k < 30; k++) pset(Math.round(126 + k), Math.round(140 + Math.sin(k * 0.3) * 4), H('#2a2a2a'));
  rect(154, 136, 166, 154, H('#3a3428')); rect(153, 134, 165, 152, H('#d4ccb4')); rect(153, 134, 165, 141, H('#ece6d4')); rect(159, 134, 159, 141, H('#8a8270'));
  // el disquete, el CD, los clips y las notitas
  rect(176, 150, 192, 166, H('#1a1a2a')); rect(180, 150, 188, 155, H('#b8bcc8')); rect(179, 158, 189, 166, H('#efe8d8'));
  disco(214, 158, 9, H('#c8ccd8')); disco(214, 158, 8, H('#e8ecf4')); for (let a = 0; a < 6; a++) linea(214, 158, Math.round(214 + Math.cos(a) * 7), Math.round(158 + Math.sin(a) * 7), H(['#e8a8c8', '#a8d8e8', '#e8e0a0'][a % 3])); disco(214, 158, 2.5, H('#8a8a96'));
  for (const [x, y] of [[132, 26], [138, 30]]) { rect(x, y, x + 6, y + 1, H('#c8ccd8')); rect(x, y + 3, x + 6, y + 4, H('#c8ccd8')); pset(x + 6, y + 2, H('#c8ccd8')); }
  rect(140, 44, 158, 60, H('#c8b040')); rect(139, 43, 157, 59, H('#f4e070')); for (let r = 0; r < 3; r++) linea(142, 47 + r * 4, 154, 47 + r * 4, H('#8a7a30'));
  // la taza de café con su cerco
  R.anillo(206, 34, 11, H('#5a3a1e')); disco(198, 28, 10, H('#3a2414')); disco(198, 28, 9, H('#efe8e0')); disco(198, 28, 7, H('#4a2a14')); disco(196, 26, 2, H('#7a4a24')); rect(207, 24, 212, 32, H('#efe8e0')); rect(209, 26, 210, 30, H('#8a6a50'));
  // las gafas de leer y el bolígrafo
  for (const cx of [262, 280]) { R.anillo(cx, 112, 6, H('#2a2a2a')); R.anillo(cx, 112, 5, H('#5a5a5a')); }
  linea(268, 111, 274, 111, H('#2a2a2a')); linea(256, 110, 246, 100, H('#2a2a2a'));
  linea(240, 150, 290, 136, H('#1a3a8a')); linea(240, 151, 290, 137, H('#3a5aaa')); rect(288, 135, 292, 138, H('#c8c8d0'));
});
const p6 = (t) => {
  fondo6();
  // el vapor del café y el piloto del fax
  for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1; pset(Math.round(198 + Math.sin(u * 6 + k) * 3), Math.round(24 - u * 16), H(u < 0.5 ? '#f0ece4' : '#c8c0b4')); }
  const imprime = t > P6 + 0.25;
  pset(114, 52, H(imprime && Math.floor(t * 4) % 2 ? '#40ff60' : '#1a5a24')); pset(114, 53, H(imprime && Math.floor(t * 4) % 2 ? '#40ff60' : '#1a5a24'));
  // la hoja que sale del fax: las rayas y, al final, el dibujo de la Luna con su trayectoria
  const L = Math.round(tramo(t, P6 + 0.25, RELEASED + 0.2) * 58);
  if (L > 0) {
    const y0 = 63, y1 = 63 + L; for (let y = y0; y <= y1; y++) for (let x = 42; x <= 92; x++) if ((x + y) % 2 === 0) pset(x + 3, y + 2, H('#3a2414'));
    rect(42, y0, 92, y1, H('#f6f4ee')); rect(42, y0, 42, y1, H('#ffffff')); rect(92, y0, 92, y1, H('#c8c4b8'));
    for (let r = 0; r < 12; r++) { const y = y1 - 4 - r * 4; if (y > y0 + 1 && (r < 3 || r > 8)) linea(46, y, r === 5 ? 70 : 88, y, H('#6a6a72')); }
    if (L > 26) { const cy = y1 - 22; lunita(80, cy, 7); for (let k = 0; k < 7; k++) pset(50 + k * 4, cy + 10 - Math.round(Math.sin(k / 7 * 2.4) * 9), H('#2a2a40')); cohete(50, cy + 10, H('#8a8a96')); }
  }
  // la carpeta de la Luna espera en la mesa; la mano llega en «report» y la abre en «released»
  const llega = tramo(t, PART + 0.2, REPORT), abre = t > RELEASED - 0.05;
  const cx = 248, by = 124;
  for (let y = by - 1; y <= by + 2; y++) for (let x = cx - (abre ? 50 : 28); x <= cx + (abre ? 52 : 30); x++) if ((x + y) % 2 === 0) pset(x + 3, y, H('#3a2414'));
  PIEZAS_DC_carpeta(cx, by, abre);
  if (llega > 0) { const ex = abre ? cx + 50 : cx + 28, ey = by - 22; const wx = Math.round(lerp(330, ex, llega)), wy = Math.round(lerp(150, ey, llega)); T.brazo(R, Math.max(wx + 30, 332), wy + 30, wx, wy, '#3a4a6a', -1); }
  // en «public» cae sobre la mesa el periódico con la Luna en portada (sin letras: la cabecera es una barra)
  const cae = tramo(t, PUBLIC - 0.3, PUBLIC + 0.05);
  if (cae > 0) {
    const x0 = 126, y0 = Math.round(lerp(196, 100, cae)), x1 = 214, y1 = y0 + 70;
    for (let y = y0 + 2; y <= y1 + 3; y++) for (let x = x0 + 3; x <= x1 + 3; x++) if ((x + y) % 2 === 0) pset(x, y, H('#2a1a0e'));
    rect(x0, y0, x1, y1, H('#e8e4d8')); rect(x0, y0, x1, y0, H('#ffffff')); rect(x1, y0, x1, y1, H('#b8b4a8'));
    rect(x0 + 4, y0 + 4, x1 - 4, y0 + 10, H('#1a1a1e')); rect(x0 + 4, y0 + 12, x1 - 4, y0 + 12, H('#1a1a1e'));
    for (let k = 0; k < 2; k++) rect(x0 + 4, y0 + 16 + k * 5, x1 - 4 - k * 22, y0 + 18 + k * 5, H('#2a2a30'));
    rect(x0 + 4, y0 + 28, x0 + 54, y0 + 64, H('#2a2a34')); rect(x0 + 5, y0 + 29, x0 + 53, y0 + 63, H('#0e1020'));
    for (let k = 0; k < 10; k++) pset(x0 + 7 + Math.floor(h2(k, 31) * 44), y0 + 31 + Math.floor(h2(k, 32) * 30), H('#8a8aa0'));
    lunita(x0 + 40, y0 + 40, 9); for (let k = 0; k < 6; k++) pset(x0 + 10 + k * 4, y0 + 58 - Math.round(Math.sin(k / 6 * 2.2) * 12), H('#d8d8e0')); cohete(x0 + 10, y0 + 56);
    for (let r = 0; r < 9; r++) linea(x0 + 58, y0 + 29 + r * 4, x1 - 4, y0 + 29 + r * 4, H('#8a8a90'));
    if (cae >= 1 && t < PUBLIC + 0.4) for (let k = 0; k < 10; k++) { const a = k * 0.63, d = 8 + (t - PUBLIC) * 60; pset(Math.round((x0 + x1) / 2 + Math.cos(a) * d * 1.4), Math.round(y1 + Math.sin(a) * d * 0.3), H('#d8c8a8')); }
  }
};
const PIEZAS_DC_carpeta = (x, y, abierta) => { const c = T.PIEZAS_DC && T.PIEZAS_DC.carpeta; if (c) c(R, x, y, { s: 3, dibujo: 'luna', abierta }); };

// ── 7 · fondo local: lo que habría pasado en 1959: la familia ve el anuncio en la tele y estalla el escándalo ──
const fondo7 = () => fondoFijo(CACHE, 'salon59', () => {
  // la parte alta de la pared lisa y cálida, la moldura y el papel pintado turquesa con estrellitas atómicas
  for (let y = 0; y < 44; y++) for (let x = 0; x < 320; x++) pset(x, y, rampa(['#8a7a5a', '#9a8a68', '#aa9a76', '#b8a882'].map(H), 2.6 - y / 40 - Math.abs(x - 140) / 260 + (h2(x >> 2, y >> 2) - 0.5) * 0.3, x, y));
  rect(0, 44, 319, 47, H('#6a4424')); rect(0, 44, 319, 44, H('#a8743c'));
  for (let y = 48; y < 124; y++) for (let x = 0; x < 320; x++) { let v = 2.3 + Math.max(0, 1 - Math.hypot(x - 300, y - 90) / 120) * 1.1 - Math.max(0, 1 - Math.hypot(x - 66, y - 104) / 60) * -0.6; const cx = ((x + ((Math.floor((y - 48) / 18) % 2) * 10)) % 20) - 10, cy = ((y - 48) % 18) - 9; if ((cx === 0 && Math.abs(cy) < 4) || (cy === 0 && Math.abs(cx) < 4) || (Math.abs(cx) === Math.abs(cy) && Math.abs(cx) < 3 && Math.abs(cx) > 0)) v += 1.4; pset(x, y, rampa(['#1e4a4a', '#2a5e5c', '#36726e', '#46867e', '#e8d8a8'].map(H), v, x, y)); }
  rect(0, 124, 319, 130, H('#ece4d0')); rect(0, 124, 319, 124, H('#ffffff')); rect(0, 130, 319, 131, H('#8a8070'));
  // la moqueta granate con su dibujo
  for (let y = 131; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 1.6 + (y - 131) / 50 + (h2(x >> 1, y >> 1) - 0.5) * 0.5; if (((x + y * 2) % 24) < 2 || ((x - y * 2 + 480) % 24) < 2) v += 0.9; pset(x, y, rampa(['#3a1014', '#521a1e', '#6a2428', '#823232'].map(H), v, x, y)); }
  // el reloj de sol dorado
  for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; linea(128, 24, Math.round(128 + Math.cos(a) * (k % 2 ? 12 : 16)), Math.round(24 + Math.sin(a) * (k % 2 ? 12 : 16)), H(k % 2 ? '#a8823a' : '#e8c060')); }
  disco(128, 24, 6, H('#5a3a10')); disco(128, 24, 5, H('#f4ecd8'));
  // la ventana a la calle de noche, con las casas de los vecinos (sus ventanas se encienden en el plano)
  rect(176, 52, 254, 104, H('#ece4d0'));
  for (let y = 54; y <= 102; y++) for (let x = 178; x <= 252; x++) pset(x, y, rampa(['#0a1028', '#121c3e', '#1c2a52'].map(H), (y - 54) / 24, x, y));
  for (let k = 0; k < 18; k++) pset(179 + Math.floor(h2(k, 41) * 72), 55 + Math.floor(h2(k, 42) * 18), H('#c8d0f0'));
  for (const [x0, x1, top] of [[178, 210, 80], [216, 252, 76]]) { poligono([[x0 - 2, top], [(x0 + x1) / 2, top - 10], [x1 + 2, top]], H('#1a1420')); rect(x0, top, x1, 102, H('#2a2434')); }
  rect(214, 52, 216, 104, H('#ece4d0')); rect(176, 78, 254, 80, H('#ece4d0'));
  for (const [x0, x1] of [[164, 178], [252, 266]]) for (let y = 48; y < 112; y++) for (let x = x0; x <= x1; x++) pset(x, y, rampa(['#6a1a1a', '#8a2424', '#a83030', '#c84040'].map(H), 1.5 + Math.sin((x - x0) * 1.2) * 1.1 + (((x + y) % 9) === 0 ? 0.8 : 0), x, y));
  // el cuadro del barco
  rect(118, 56, 152, 82, H('#5a3a10')); rect(120, 58, 150, 80, H('#8ab0c8')); rect(120, 72, 150, 80, H('#2a5a8a')); poligono([[126, 72], [144, 72], [140, 76], [130, 76]], H('#5a2a14')); poligono([[134, 60], [134, 71], [143, 71]], H('#f4f0e0')); linea(134, 60, 134, 72, H('#3a2a1a'));
  // la tele de consola de nogal con sus patas, el altavoz y la antena de cuernos
  rect(28, 78, 114, 142, H('#2a1408')); rect(30, 80, 112, 140, H('#6a3a18')); rect(30, 80, 112, 81, H('#9a5a2a'));
  for (let y = 82; y < 140; y += 3) linea(31, y, 111, y, H('#5a3014'));
  for (const x of [34, 106]) rect(x, 140, x + 3, 150, H('#2a1408'));
  rect(38, 86, 92, 126, H('#1a1a1a'));
  rect(96, 88, 108, 132, H('#3a2010')); for (let y = 90; y < 131; y += 3) linea(97, y, 107, y, H('#c8a878'));
  for (const y of [110, 120]) { disco(102, y, 2, H('#1a1a1a')); pset(102, y - 1, H('#c8c8c8')); }
  linea(64, 78, 48, 52, H('#2a2a2a')); linea(66, 78, 86, 50, H('#2a2a2a')); disco(48, 52, 1.5, H('#c8c8c8')); disco(86, 50, 1.5, H('#c8c8c8')); rect(60, 75, 70, 78, H('#2a2a2a'));
  // la mesita con la lámpara y el teléfono negro, a la derecha
  rect(282, 128, 318, 131, H('#4a2a10')); rect(282, 128, 318, 128, H('#8a5a2a')); rect(286, 131, 289, 158, H('#2a1408')); rect(312, 131, 315, 158, H('#2a1408'));
  rect(300, 100, 302, 128, H('#c8a040')); poligono([[290, 100], [312, 100], [308, 80], [294, 80]], H('#e8d8a8')); linea(290, 100, 312, 100, H('#fff0c0'));
  // el respaldo del sofá mostaza con sus botones
  rect(138, 102, 278, 132, H('#5a3a10')); rect(140, 104, 276, 130, H('#c8962e')); rect(140, 104, 276, 106, H('#e8b850'));
  for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) { const x = 152 + i * 22, y = 112 + j * 9; pset(x, y, H('#6a4410')); pset(x + 1, y + 1, H('#e8c060')); }
  // el revistero con revistas, a la izquierda del sofá
  rect(118, 146, 134, 162, H('#5a3a10')); rect(120, 140, 126, 158, H('#c84040')); rect(126, 142, 132, 158, H('#4080c8'));
});
// delante de la familia: el asiento del sofá con sus cojines y sus brazos
const sofaDelante = () => {
  rect(134, 112, 146, 156, H('#5a3a10')); rect(135, 113, 145, 155, H('#d8a438')); rect(135, 113, 145, 115, H('#f0c860'));
  rect(270, 112, 282, 156, H('#5a3a10')); rect(271, 113, 281, 155, H('#d8a438')); rect(271, 113, 281, 115, H('#f0c860'));
  rect(146, 132, 270, 156, H('#5a3a10')); for (let i = 0; i < 3; i++) { const x0 = 147 + i * 41; rect(x0, 133, x0 + 39, 155, H('#c8962e')); rect(x0, 133, x0 + 39, 135, H('#ecbc54')); rect(x0, 152, x0 + 39, 155, H('#9a6e1e')); }
  for (const x of [150, 264]) rect(x, 156, x + 3, 162, H('#2a1408'));
};
const p7 = (t) => {
  fondo7();
  // la lámpara y la tele iluminan la habitación
  for (let r = 26; r > 10; r -= 5) R.anillo(301, 92, r, H('#c8b070'), 3);
  // la tele: el general en el atril; en «made public», la Luna con el fogonazo; las rayas de barrido
  const S_ = ['#101014', '#3a3a40', '#6a6a72', '#a8a8b0', '#e0e0e8'].map(H);
  for (let y = 87; y <= 125; y++) for (let x = 39; x <= 91; x++) { const v = 2 + Math.sin(y * 1.7 + t * 30) * 0.3 - Math.hypot(x - 65, y - 106) / 40; pset(x, y, rampa(S_, v, x, y)); }
  if (t < MADE) { rect(58, 112, 72, 125, S_[1]); rect(59, 113, 71, 114, S_[3]); disco(65, 104, 5, S_[3]); disco(65, 103, 4, S_[4]); rect(61, 97, 69, 99, S_[0]); pset(63, 103, S_[0]); pset(67, 103, S_[0]); if (Math.floor(t * 6) % 2) rect(63, 106, 67, 106, S_[0]); disco(80, 96, 4, S_[2]); }
  else { lunita(65, 104, 11); const f = 1 - tramo(t, MADE + 0.1, MADE + 1.2); if (f > 0) { for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; linea(70, 99, Math.round(70 + Math.cos(a) * (3 + (1 - f) * 8)), Math.round(99 + Math.sin(a) * (3 + (1 - f) * 8)), S_[4]); } disco(70, 99, 3, H('#ffffff')); } }
  for (let k = 0; k < 14; k++) { const u = (t * 2 + h2(k, 51)) % 1; if (u < 0.5) pset(150 + Math.floor(h2(k, 52) * 120), 108 + Math.floor(h2(k, 53) * 30), H('#a8c0d0')); }
  // las ventanas de los vecinos se encienden en «outcry», con su «!»
  for (const [x, y, d] of [[186, 88, 0.1], [228, 86, 0.35], [240, 92, 0.6]]) { const on = t > OUTCRY + d; rect(x, y, x + 6, y + 6, H(on ? '#f0c860' : '#3a3448')); if (on && t < OUTCRY + d + 1.4) R.icono('!', x, y - 1, H('#d83a2a'), H('#f0c860')); }
  // la familia: sentada viendo la tele; en «outcry» se levanta de un salto
  const sube = tramo(t, OUTCRY - 0.1, OUTCRY + 0.3), dePie = sube >= 0.5;
  const fam = [[EL.padre57, 162, 0], [EL.madre57, 198, 0.1], [EL.nino57, 236, 0.2]];
  const pinta = (d, x, k) => {
    const u = tramo(t, OUTCRY - 0.1 + k * 0.1, OUTCRY + 0.3 + k * 0.1), pie = u >= 0.5;
    let xx = x, s = pie ? Math.round(lerp(150, 168, u)) : 140;
    const tel = d === EL.madre57 ? tramo(t, OUTCRY + 1.2, OUTCRY + 2.2) : 0; if (tel > 0) xx = Math.round(lerp(x, 272, tel));
    const o = { dir: -1, habla: t < MADE && k === 2 ? false : pie, sonrisa: !pie && t < MADE, sorpresa: t > MADE && t < OUTCRY - 0.1, enfado: pie, brazos: pie && u < 1 && d !== EL.madre57 || (d === EL.nino57 && pie), dedo: d === EL.padre57 && t > OUTCRY + 0.8, anda: tel > 0 && tel < 1, salto: pie && u < 1 ? 3 : 0 };
    if (d === EL.madre57 && tel >= 1) { o.dir = 1; o.sostiene = [294, 114]; }
    return [d, xx, s, o, pie];
  };
  const est = fam.map(([d, x, k]) => pinta(d, x, k));
  for (const [d, x, s, o, pie] of est) if (!pie) R.actor(d, x, s, t, o);
  // el gato espía en el brazo del sofá: en «outcry» salta y se va corriendo
  const huye = tramo(t, OUTCRY + 0.1, OUTCRY + 1.4);
  if (huye <= 0) T.gatoEspia(R, 276, 112, t, { dir: -1, cara: t > MADE ? 'travieso' : 'normal' });
  sofaDelante();
  if (huye > 0 && huye < 1) T.gatoEspia(R, Math.round(lerp(276, 340, huye)), Math.round(lerp(112, 176, Math.min(1, huye * 2.5))), t, { anda: true, dir: 1 });
  for (const [d, x, s, o, pie] of est) if (pie) R.actor(d, x, s, t, o);
  // el teléfono negro que suena (tiembla) hasta que la madre lo coge
  const coge = t > OUTCRY + 2.2, suena = t > OUTCRY + 0.4 && !coge, tb = suena ? Math.round(Math.sin(t * 50)) : 0;
  rect(292 + tb, 120, 310 + tb, 127, H('#0e0e12')); rect(293 + tb, 121, 309 + tb, 122, H('#3a3a44')); disco(301 + tb, 124, 3, H('#e8e4d8')); disco(301 + tb, 124, 1.5, H('#1a1a1e'));
  if (!coge) { rect(291 + tb, 116, 311 + tb, 119, H('#0e0e12')); rect(292 + tb, 116, 310 + tb, 116, H('#4a4a54')); }
  else { const m = [294, 114]; rect(m[0] - 2, m[1] - 10, m[0] + 1, m[1] + 2, H('#0e0e12')); }
  if (suena) for (const s of [-1, 1]) for (let k = 0; k < 3; k++) pset(301 + s * (13 + k), 112 - k * 2, H('#f0e0a0'));
  // los «!» de la familia
  for (const [d, x, s, o, pie] of est) if (pie && t < OUTCRY + 2.6) { const y = s - 34 + Math.round(Math.sin(t * 7 + x) * 1.5); globo(x - 1, y - 18, x + 16, y, x + 7, y + 6); R.icono('!', x + 1, y - 16, H('#d83a2a'), H('#5a1010'), 2); }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5], [P6, p6], [P7, p7]], {
  año: (t) => t < P4 ? 1959 : t < P5 ? 1999 : t < P7 ? 2000 : 1959,
  efectos: [[CLIC, 'cerrojo'], [CONTAM, 'pop'], [ANTES + 0.3, 'miau'], [PUBLICO + 0.15, 'brillo'], [STAYED, 'interruptor'], [P4 - 0.5, 'puerta'],
    [P4 + 0.5, 'papel'], [CLUE, 'aviso'], [P5 + 0.45, 'interruptor'], [P6 + 0.3, 'bip'], [RELEASED, 'papel'], [PUBLIC, 'papel'], [MADE, 'boom'], [OUTCRY, 'publico'], [OUTCRY + 0.5, 'ring']],
});
''')

# ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
E['dc-gato'] = ('Gato', '''// DC-GATO (frase 7, marca «gato»), cartela «1967», barra 1967. Cinco planos:
// 1. animales/tallerCIA: un ingeniero deja la carpeta de la Luna sobre el banco («the moon was too big») y el otro
//    levanta con las pinzas el micrófono diminuto, que brilla («something very small»); el gato dormita en su cesta;
// 2. fondo local: la mesa de escucha de los sesenta: la mano pulsa la tecla del magnetofón, giran los carretes, baila la
//    aguja y los auriculares vibran («listen in»); en el corcho, las fotos de un banco y una fuente se marcan en rojo;
// 3. animales/parque: dos hombres hablan en el banco; el gato entra por el parterre, cruza la grava sin que nadie lo mire
//    y se sienta junto al banco en «a cat»; las ondas de la charla le llegan al collar;
// 4. animales/tallerCIA/mesa: las pinzas cogen el micrófono («microphone», en la lupa se ve grande), la pila se marca
//    («battery») y el cable de la antena corre por la mesa hasta la cola del gato, que se mueve tranquila («tail»);
// 5. fondo local: el estudio de fotos: el gato entra, salta al taburete con el cojín y posa con su collar; en «Acoustic
//    Kitty» la mano aprieta la pera y salta el fogonazo; el gato guiña y maúlla, y el micrófono recoge sus ondas.''', AYUDAS + r'''
const P2 = en('gato', 0.1976), P3 = en('gato', 0.3960), P4 = en('gato', 0.6457), P5 = en('gato', 0.8726);
const BIG = en('gato', 0.0400), CIA = en('gato', 0.0676), TRIED = en('gato', 0.1112), SMALL = en('gato', 0.1584);
const SIXTIES = en('gato', 0.2083), ENGINEERS = en('gato', 0.2563), LISTEN = en('gato', 0.3097), CONVERS = en('gato', 0.3462);
const BENCHES = en('gato', 0.4334), ABROAD = en('gato', 0.4530), NOTICED = en('gato', 0.5099), NOBODY = en('gato', 0.5384), ATTENTION = en('gato', 0.5731), CAT = en('gato', 0.6114);
const TINY = en('gato', 0.6955), MICRO = en('gato', 0.7080), BATTERY = en('gato', 0.7578), ANTENNA = en('gato', 0.7943), TAIL = en('gato', 0.8593);
const CAT2 = en('gato', 0.9020), THEY = en('gato', 0.9385), ACOUSTIC = en('gato', 0.9554), KITTY = en('gato', 0.9785);
const microDiminuto = (x, y) => { x = Math.round(x); y = Math.round(y); rect(x - 1, y - 1, x + 1, y + 1, H('#c8ccd8')); pset(x, y, H('#5a5e6a')); pset(x - 1, y - 1, H('#ffffff')); pset(x, y + 2, H('#3a3a48')); };

// ── 1 · el taller de la CIA ──
const DEJA = BIG + 0.2;
const p1 = (t) => {
  T.animales(R, t, { encuadre: 'tallerCIA' });
  // el gato en su cesta, tranquilo; levanta la cabeza cuando brilla el micrófono
  T.gatoEspia(R, 267, 146, t, { dir: -1, cara: t > SMALL ? 'travieso' : 'normal' });
  // el ingeniero 1 lleva la carpeta grande de la Luna y la deja en el banco
  const lleva = t < DEJA;
  const va = tramo(t, 0.4, DEJA - 0.4), i1x = Math.round(lerp(70, 40, va));
  const a1 = R.actor(EL.ingenieroCIA, i1x, 160, t, { dir: lleva ? -1 : 1, anda: va > 0 && va < 1, sostiene: lleva ? [i1x - 4, va >= 1 ? 128 : 132] : false, habla: t > CIA && t < TRIED, sorpresa: t > SMALL && t < SMALL + 0.6, sonrisa: t > SMALL + 0.6, dedo: t > TRIED && t < SMALL - 0.1 });
  // el ingeniero 2 levanta las pinzas con el micrófono diminuto
  const sube = tramo(t, TRIED - 0.2, SMALL - 0.1);
  const a2 = R.actor(EL.ingenieroCIA2, 150, 142, t, { dir: -1, sostiene: sube > 0 ? [lerp(148, 142, sube), lerp(132, 116, sube)] : false, habla: t > TRIED && t < SMALL, sonrisa: t > SMALL });
  T.animalesDelante(R, t, { encuadre: 'tallerCIA' });
  // la carpeta: en la mano y luego sobre el banco
  const c = T.PIEZAS_DC && T.PIEZAS_DC.carpeta;
  if (c) { if (lleva && a1 && a1.mano) c(R, Math.round(a1.mano[0]) - 6, Math.round(a1.mano[1]) + 10, { s: 2, dibujo: 'luna' }); else { const cae = tramo(t, DEJA, DEJA + 0.15); c(R, 20, Math.round(lerp(126, 113, cae)), { s: 2, dibujo: 'luna' }); } }
  // las pinzas y el micrófono que brilla
  if (sube > 0 && a2 && a2.mano) {
    const [mx, my] = a2.mano; linea(Math.round(mx), Math.round(my), Math.round(mx - 5), Math.round(my - 6), H('#c8ccd8')); linea(Math.round(mx + 1), Math.round(my), Math.round(mx - 4), Math.round(my - 6), H('#8a8e98'));
    microDiminuto(mx - 6, my - 8);
    if (t > SMALL - 0.15) { const u = ((t - SMALL + 0.15) * 1.4) % 1; R.anillo(Math.round(mx - 6), Math.round(my - 8), Math.round(3 + u * 9), H(u < 0.5 ? '#fff0a0' : '#c8a040')); const s = t < SMALL + 0.5; if (s) for (const [dx, dy] of [[0, -5], [0, 5], [-5, 0], [5, 0]]) pset(Math.round(mx - 6 + dx), Math.round(my - 8 + dy), H('#ffffff')); }
  }
};

// ── 2 · fondo local: la mesa de escucha ──
const fondo2 = () => fondoFijo(CACHE, 'escucha', () => {
  // la pared de bloques de hormigón pintados
  const PB = ['#2a3430', '#36423c', '#425048', '#4e5e54', '#5a6a60'].map(H);
  for (let y = 0; y < 112; y++) for (let x = 0; x < 320; x++) { const fila = Math.floor(y / 9), xx = x + (fila % 2) * 12; let v = 2.6 - y / 160 + Math.max(0, 1 - Math.hypot(x - 40, y - 100) / 120) * 1.2 + (h2(x >> 1, y >> 1) - 0.5) * 0.6; if (y % 9 === 0 || xx % 24 === 0) v -= 1.3; else if (y % 9 === 1) v += 0.4; pset(x, y, rampa(PB, v, x, y)); }
  for (let k = 0; k < 4; k++) { const x = 180 + k * 31; for (let y = 60; y < 104; y++) if (h2(k, y) > 0.4) pset(x + Math.floor(Math.sin(y * 0.2) * 1.5), y, H('#3a4640')); }
  // el corcho con sus fotos, la libreta, el mapa de costa y los hilos rojos
  rect(10, 16, 152, 98, H('#4a2e16')); rect(12, 18, 150, 96, H('#7a5430'));
  for (let y = 20; y < 95; y++) for (let x = 14; x < 149; x++) { const v = h2(x, y); pset(x, y, H(v > 0.82 ? '#8a5a2a' : v > 0.4 ? '#b4844e' : v > 0.12 ? '#a8783e' : '#c8986a')); }
  const foto = (x0, y0, x1, y1, pinta) => { rect(x0 + 1, y0 + 1, x1 + 1, y1 + 1, H('#3a2414')); rect(x0, y0, x1, y1, H('#f2eee2')); pinta(x0 + 2, y0 + 2, x1 - 2, y1 - 5); };
  foto(20, 24, 58, 54, (a, b, c, d) => { rect(a, b, c, d, H('#9ab0b8')); rect(a, b + 12, c, d, H('#7a9a6a')); disco(a + 8, b + 9, 6, H('#3a6a3a')); rect(a + 7, b + 12, a + 8, b + 18, H('#4a3424')); rect(a + 16, b + 16, a + 32, b + 17, H('#3a2a1a')); rect(a + 16, b + 13, a + 32, b + 14, H('#5a4028')); rect(a + 17, b + 18, a + 17, b + 21, H('#2a1a10')); rect(a + 31, b + 18, a + 31, b + 21, H('#2a1a10')); pset(a + 20, b + 11, H('#2a2a34')); pset(a + 20, b + 12, H('#2a2a34')); pset(a + 27, b + 11, H('#2a2a34')); pset(a + 27, b + 12, H('#2a2a34')); });
  foto(66, 28, 102, 56, (a, b, c, d) => { rect(a, b, c, d, H('#a8b8c0')); rect(a, b + 14, c, d, H('#b8a888')); for (let k = 0; k < 8; k++) pset(a + 16, b + 4 + k, H('#e8f4ff')); rect(a + 8, b + 14, a + 24, b + 17, H('#8a8a90')); rect(a + 9, b + 14, a + 23, b + 15, H('#6ab0d8')); for (let k = 0; k < 4; k++) pset(a + 4 + k * 7, b + 19, H('#6a7080')); });
  foto(110, 22, 144, 50, (a, b, c, d) => { rect(a, b, c, d, H('#c8b898')); rect(a, b, c, b + 6, H('#c83a3a')); for (let x = a; x <= c; x += 4) rect(x, b, x + 1, b + 6, H('#efe6d8')); disco(a + 16, b + 16, 4, H('#efe6d8')); rect(a + 15, b + 16, a + 16, d, H('#3a3a3a')); rect(a + 6, b + 13, a + 8, b + 17, H('#2a2a34')); disco(a + 7, b + 11, 2, H('#e8c8a0')); rect(a + 24, b + 13, a + 26, b + 17, H('#5a3a2a')); disco(a + 25, b + 11, 2, H('#e8c8a0')); });
  rect(24, 62, 82, 92, H('#3a2414')); rect(23, 61, 81, 91, H('#d8e4e8'));
  for (let y = 62; y < 91; y++) for (let x = 24; x < 81; x++) { const c = Math.sin(x * 0.18) * 6 + Math.cos(y * 0.25 + x * 0.05) * 5 + (x - 52) * 0.3 + (y - 76) * 0.8; if (c > 3) pset(x, y, H(c > 9 ? '#9ab88a' : '#b8cca0')); else if (c > 2) pset(x, y, H('#5a6a6a')); }
  for (const [x, y] of [[40, 70], [58, 80], [70, 68]]) { disco(x, y, 1.5, H('#c8302a')); }
  rect(92, 60, 142, 92, H('#3a2414')); rect(91, 59, 141, 91, H('#f4f0e0')); for (let r = 0; r < 7; r++) linea(95, 64 + r * 4, 137 - (r % 3) * 6, 64 + r * 4, H('#8a8a9a')); linea(91, 62, 141, 62, H('#d84a4a'));
  for (const [x, y] of [[39, 24], [84, 28], [127, 22], [52, 61], [116, 59]]) { disco(x, y, 2, H('#c8302a')); pset(x - 1, y - 1, H('#ff8a7a')); }
  linea(39, 24, 84, 28, H('#c8302a')); linea(84, 28, 127, 22, H('#c8302a')); linea(39, 24, 52, 61, H('#c8302a')); linea(84, 28, 116, 59, H('#c8302a'));
  // el bastidor con los receptores (diales, botones y la ventanita verde)
  rect(186, 22, 262, 106, H('#1a1c1e')); rect(188, 24, 260, 104, H('#5a5e5a'));
  for (const y of [26, 54, 80]) { rect(190, y, 258, y + 24, H('#7a807a')); rect(190, y, 258, y, H('#a8aea8')); rect(190, y + 24, 258, y + 24, H('#3a3e3a')); for (const x of [196, 252]) { disco(x, y + 4, 1.4, H('#2a2a2a')); disco(x, y + 20, 1.4, H('#2a2a2a')); } }
  rect(200, 30, 230, 46, H('#0a1a10')); rect(234, 34, 252, 42, H('#2a2a2a'));
  for (const [x, y] of [[206, 66], [222, 66], [238, 66], [210, 92], [230, 92]]) { disco(x, y, 5, H('#1a1a1a')); disco(x, y, 4, H('#3a3a3a')); pset(x, y - 3, H('#e8e8e8')); }
  rect(246, 60, 254, 72, H('#d8d0b0')); rect(242, 86, 254, 96, H('#e8e0c0'));
  // el reloj eléctrico de la pared
  disco(166, 40, 9, H('#1a1a1a')); disco(166, 40, 8, H('#efe6d8')); for (let k = 0; k < 12; k++) pset(Math.round(166 + Math.cos(k * Math.PI / 6) * 6), Math.round(40 + Math.sin(k * Math.PI / 6) * 6), H('#2a2a2a'));
  // la mesa de madera vista desde arriba y su canto
  const MA = ['#2a1a0e', '#3e2614', '#54341c', '#6a4426', '#80562e', '#966a3a'].map(H);
  for (let y = 112; y < 180; y++) for (let x = 0; x < 320; x++) { let v = 3.0 - (y - 112) / 80 + Math.sin(x * 0.04 + Math.sin(y * 0.15) * 2.4 + y * 0.03) * 0.6 + (h2(x >> 2, y) - 0.5) * 0.5 + Math.max(0, 1 - Math.hypot(x - 30, y - 130) / 90) * 1.2; if (y === 112) v = 5; pset(x, y, rampa(MA, v, x, y)); }
  rect(0, 110, 319, 111, H('#1a0e06'));
  // el flexo verde de banquero
  rect(18, 104, 52, 108, H('#1a3a24')); poligono([[16, 92], [54, 92], [50, 82], [20, 82]], H('#2a6a3a')); linea(20, 82, 50, 82, H('#4a9a5a')); rect(33, 92, 36, 112, H('#c8a050')); rect(26, 112, 44, 116, H('#a8823a')); rect(26, 112, 44, 112, H('#e8c060'));
  // la libreta con el lápiz y el cenicero
  poligono([[20, 136], [78, 132], [82, 166], [24, 170]], H('#2a1a0e')); poligono([[18, 133], [76, 129], [80, 163], [22, 167]], H('#f4f0e0')); for (let r = 0; r < 7; r++) linea(24, 140 + r * 4, 76, 136 + r * 4, H('#9ab0d0'));
  rect(70, 150, 98, 151, H('#e8c040')); rect(96, 150, 99, 151, H('#3a3a3a'));
  for (let y = -5; y <= 5; y++) for (let x = -12; x <= 12; x++) { const q = (x / 12) ** 2 + (y / 5) ** 2; if (q <= 1) pset(276 + x, 160 + y, H(q > 0.55 ? '#8a9098' : '#3a3e44')); }
  rect(276, 158, 290, 159, H('#efe6d8')); rect(289, 158, 290, 159, H('#e85a2a'));
  // la taza
  rect(294, 124, 308, 142, H('#3a2a1a')); rect(295, 125, 307, 141, H('#e8e0d0')); rect(296, 126, 306, 128, H('#5a3416')); rect(308, 129, 311, 136, H('#e8e0d0'));
  // el magnetofón (cuerpo; los carretes y la aguja van vivos)
  rect(106, 108, 210, 150, H('#1a1a1e')); rect(108, 110, 208, 148, H('#7a7068')); rect(108, 110, 208, 111, H('#a8a090')); rect(110, 138, 206, 147, H('#3a3630')); for (let y = 151; y <= 153; y++) for (let x = 108; x <= 212; x++) if ((x + y) % 2 === 0) pset(x, y, H('#2a1a0e'));
  for (let k = 0; k < 6; k++) { rect(114 + k * 12, 140, 123 + k * 12, 145, H('#d8d0c0')); rect(114 + k * 12, 145, 123 + k * 12, 145, H('#8a8478')); }
  rect(150, 116, 166, 128, H('#2a2a2a')); rect(151, 117, 165, 124, H('#e8dca8'));
  rect(176, 130, 204, 135, H('#2a2a2a')); for (let k = 0; k < 3; k++) { disco(184 + k * 8, 132, 2, H('#c8c8c8')); }
  // los auriculares y su cable
  linea(210, 136, 222, 146, K_);
});
const p2 = (t) => {
  fondo2();
  // vida: el foco del flexo, la aguja del reloj, la ventanita verde, el humo del cigarrillo y el vapor del café
  for (let r = 30; r > 10; r -= 6) R.anillo(35, 112, r + Math.sin(t * 2) * 0.5, H('#a8783e'), 3);
  { const a = t * Math.PI / 15; linea(166, 40, Math.round(166 + Math.sin(a) * 6), Math.round(40 - Math.cos(a) * 6), H('#c83a3a')); linea(166, 40, 166 + 3, 40 - 3, K_); }
  for (let x = 201; x < 230; x++) pset(x, Math.round(38 + Math.sin(x * 0.5 + t * 8) * 4 * (t > P2 + 0.5 ? 1 : 0.2)), H('#4af07a'));
  for (let k = 0; k < 6; k++) { const u = (t * 0.35 + k / 6) % 1; pset(Math.round(290 + Math.sin(u * 7 + k) * 2 + u * 4), Math.round(156 - u * 34), H(u < 0.5 ? '#c8c8c8' : '#8a8a8a')); }
  for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1; pset(Math.round(301 + Math.sin(u * 6 + k) * 2), Math.round(122 - u * 16), H('#d8d4cc')); }
  // la tecla que se pulsa, los carretes que giran y la cinta que corre
  const PLAY = P2 + 0.35, va = t > PLAY;
  for (const cx of [130, 186]) { disco(cx, 122, 13, K_); disco(cx, 122, 12, H(cx < 160 ? '#5a3a28' : '#4a3020')); disco(cx, 122, 4, H('#c8c8d0')); const a = va ? t * (cx < 160 ? 3 : 4) : 0; for (let k = 0; k < 3; k++) { const b = a + k * 2.094; linea(cx, 122, Math.round(cx + Math.cos(b) * 9), Math.round(122 + Math.sin(b) * 9), H('#9a9aa8')); } disco(cx, 122, 1.5, K_); disco(cx - 4, 118, 1.2, H('#8a6a50')); }
  linea(130, 134, 186, 134, H('#3a2a1a')); rect(156, 130, 160, 135, H('#c8c8c8'));
  if (va) { const a = -0.9 + Math.abs(Math.sin(t * 9) * Math.sin(t * 3.1)) * 1.6; linea(158, 124, Math.round(158 + Math.sin(a) * 6), Math.round(124 - Math.cos(a) * 6), H('#c82a2a')); pset(196, 114, H(Math.floor(t * 3) % 2 ? '#ff3a3a' : '#8a1a1a')); pset(197, 114, H(Math.floor(t * 3) % 2 ? '#ff3a3a' : '#8a1a1a')); } else linea(158, 124, 153, 120, H('#c82a2a'));
  rect(150, 140 + (va ? 1 : 0), 159, 145, H(va ? '#8a8478' : '#d8d0c0'));
  // los auriculares, que vibran en «listen in»
  const vib = t > LISTEN - 0.1 ? Math.round(Math.sin(t * 30)) : 0;
  { const x = 238 + vib, y = 150; for (let k = 0; k <= 14; k++) { const a = Math.PI + k / 14 * Math.PI; pset(Math.round(x + Math.cos(a) * 12), Math.round(y + Math.sin(a) * 10), H('#2a2a2a')); pset(Math.round(x + Math.cos(a) * 11), Math.round(y + Math.sin(a) * 9), H('#5a5a5a')); }
    for (const s of [-1, 1]) { disco(x + s * 12, y + 2, 5, K_); disco(x + s * 12, y + 2, 4, H('#3a3a40')); disco(x + s * 12 - 1, y + 1, 1.5, H('#7a7a84')); } }
  if (t > LISTEN - 0.1) for (let k = 0; k < 3; k++) { const u = ((t - LISTEN) * 1.2 + k / 3) % 1; for (const s of [-1, 1]) { const r = 6 + u * 12; for (let a = -0.6; a <= 0.6; a += 0.15) pset(Math.round(238 + s * 12 + s * Math.cos(a) * r), Math.round(152 + Math.sin(a) * r), H(u < 0.5 ? '#f0e8a0' : '#a89858')); } }
  // las fotos del banco y de la fuente se marcan en rojo, una tras otra
  for (const [cx, cy, t0] of [[39, 39, CONVERS - 0.1], [84, 42, CONVERS + 0.5]]) { const u = tramo(t, t0, t0 + 0.35); if (u <= 0) continue; const n = Math.round(u * 40); for (let k = 0; k < n; k++) { const a = k / 40 * Math.PI * 2 - Math.PI / 2; const x = Math.round(cx + Math.cos(a) * 23), y = Math.round(cy + Math.sin(a) * 17); pset(x, y, H('#d82a2a')); pset(x + 1, y, H('#d82a2a')); } }
  // la mano del ingeniero: pulsa la tecla y luego sube el volumen
  const vol = tramo(t, ENGINEERS, ENGINEERS + 0.5);
  const wx = t < PLAY + 0.3 ? lerp(196, 162, tramo(t, P2, PLAY)) : lerp(162, 196, vol), wy = t < PLAY + 0.3 ? lerp(196, 146 + (t > PLAY && t < PLAY + 0.25 ? 1 : 0), tramo(t, P2, PLAY)) : lerp(146, 140, vol);
  T.brazo(R, Math.round(wx) + 30, 214, Math.round(wx), Math.round(wy), '#3a4256', -1);
};

// ── 3 · el parque: nadie se fija en un gato ──
const p3 = (t) => {
  const g = T.animales(R, t, { encuadre: 'parque' });
  // los dos hombres del banco charlan por turnos
  const turno = Math.floor((t - P3) * 1.1) % 2;
  R.actor(EL.hombreBanco, 210, 154, t, { dir: 1, habla: turno === 0, dedo: turno === 0 && t > BENCHES, sonrisa: t > ATTENTION });
  R.actor(EL.hombreBanco2, 232, 154, t, { dir: -1, habla: turno === 1, sonrisa: turno === 1 });
  // el gato entra por detrás del parterre, cruza la grava y se sienta junto al banco
  const u = tramo(t, ABROAD - 0.3, CAT - 0.2);
  if (t > ABROAD - 0.3) {
    if (u < 1) { const x = u < 0.75 ? lerp(-12, 200, u / 0.75) : lerp(200, 268, (u - 0.75) / 0.25), y = u < 0.75 ? 172 : lerp(172, 162, (u - 0.75) / 0.25); T.gatoEspia(R, Math.round(x), Math.round(y), t, { anda: true, dir: 1 }); }
    else T.gatoEspia(R, 268, 162, t, { dir: -1, cara: t > CAT ? 'travieso' : 'normal' });
  }
  T.animalesDelante(R, t, { encuadre: 'parque' });
  // las ondas de la charla que le llegan al collar del gato
  if (t > CAT - 0.1) for (let k = 0; k < 3; k++) { const v = ((t - CAT) * 1.3 + k / 3) % 1, r = 4 + v * 14; for (let a = -0.5; a <= 0.5; a += 0.12) { const x = Math.round(246 + Math.cos(a) * r), y = Math.round(138 + Math.sin(a) * r + v * 8); pset(x, y, H(v < 0.5 ? '#fff8c8' : '#d8c890')); } }
  // un paseante pasa por delante, leyendo el periódico, y no mira al gato
  { const x = Math.round(lerp(330, -20, tramo(t, NOTICED - 0.6, P4 + 0.3))); if (x > -18 && x < 330) { const a = R.actor(EL.ingenieroCA, x, 176, t, { dir: -1, anda: true, sostiene: [x - 2, 160] }); if (a && a.mano) { const [mx, my] = a.mano; rect(Math.round(mx) - 9, Math.round(my) - 7, Math.round(mx) + 1, Math.round(my) + 3, H('#e8e4d8')); for (let r = 0; r < 4; r++) linea(Math.round(mx) - 8, Math.round(my) - 5 + r * 2, Math.round(mx), Math.round(my) - 5 + r * 2, H('#8a8a8a')); } } }
};

// ── 4 · la mesa del taller de cerca: micrófono, pila, antena y cola ──
const p4 = (t) => {
  T.animales(R, t, { encuadre: 'tallerCIA', camara: 'mesa' });
  // la cola del gato, que entra por la derecha y se mueve tranquila
  // el gato, tranquilo, sentado en la mesa a la derecha (cortado por el borde), mira las pinzas
  const ola = t > TAIL - 0.1 && t < TAIL + 1.0 ? Math.sin((t - TAIL) * 10) * 4 : 0;
  const colaPts = []; for (let k = 0; k <= 34; k++) { const v = k / 34; colaPts.push([Math.round(290 - v * 50), Math.round(168 + Math.sin(v * 2.6) * -10 * v + Math.sin(t * 1.6 + v * 3) * 2 * v + ola * v)]); }
  for (let k = 0; k < colaPts.length; k++) { const [x, y] = colaPts[k], g = k > 30 ? 1 : 2; disco(x, y, g + 1, H('#3a3a46')); }
  for (let k = 0; k < colaPts.length; k++) { const [x, y] = colaPts[k], g = k > 30 ? 0.8 : 1.6; disco(x, y, g, H(Math.floor(k / 4) % 2 ? '#8e8e9c' : '#5a5a68')); pset(x, y - 1, H('#b0b0bc')); }
  T.gatoEspia(R, 306, 177, t, { dir: -1, s: 3, cara: t > TAIL ? 'travieso' : 'normal' });
  // el micrófono: lo cogen las pinzas y se ve grande en la lupa
  const coge = tramo(t, MICRO - 0.3, MICRO + 0.1), mx = 181, my = Math.round(118 - coge * 4);
  if (coge > 0) { disco(mx, my + 4, 3, H('#5a4026')); microDiminuto(mx, my); }
  R.recorte([157, 85, 183, 111]);
  for (let y = 86; y <= 110; y++) for (let x = 158; x <= 182; x++) if (Math.hypot(x - 170, y - 98) < 11) { const dx = x - 170, dy = y - 98; if (Math.abs(dx) < 4 && Math.abs(dy + 1) < 4) pset(x, y, H(Math.abs(dx) < 3 && Math.abs(dy + 1) < 3 ? ((dx + dy) % 2 ? '#c8ccd8' : '#7a7e8a') : '#3a3a48')); }
  R.recorte(null);
  // las tres marcas, una por palabra: micrófono, pila y antena
  for (const [cx, cy, t0] of [[mx, my, MICRO], [228, 135, BATTERY]]) { if (t < t0) continue; const u = ((t - t0) * 1.2) % 1; R.anillo(cx, cy, Math.round(5 + u * 8), H(u < 0.5 ? '#fff0a0' : '#c8a040')); if (t < t0 + 0.4) R.anillo(cx, cy, 4, H('#ffffff')); }
  // el cable de la antena: sale de la pila y corre por la mesa hasta la cola
  const w = tramo(t, ANTENNA - 0.1, TAIL);
  if (w > 0) { const pts = []; for (let k = 0; k <= 40; k++) { const v = k / 40; const [qx, qy] = colaPts[Math.round((1 - Math.max(0, (v - 0.35) / 0.65)) * 34)]; pts.push(v < 0.35 ? [Math.round(lerp(236, 244, v / 0.35)), Math.round(lerp(137, 172, v / 0.35))] : [qx, qy + 2]); } const n = Math.round(w * 40); for (let k = 0; k < n; k++) { linea(pts[k][0], pts[k][1], pts[k + 1][0], pts[k + 1][1], H('#c83a2a')); pset(pts[k][0], pts[k][1] - 1, H('#ff8a6a')); } const [px, py] = pts[n]; disco(px, py, 1.5, H('#ffffff')); }
  // las pinzas, en la mano canónica que entra desde abajo
  const ir = tramo(t, P4, MICRO - 0.3), pila = tramo(t, BATTERY - 0.4, BATTERY);
  const wx = lerp(212, mx + 12, ir) + pila * 32, wy = lerp(196, my + 14, ir) + pila * 10;
  linea(Math.round(wx) - 7, Math.round(wy) - 7, Math.round(wx) - 13, Math.round(wy) - 13, H('#c8ccd8')); linea(Math.round(wx) - 6, Math.round(wy) - 7, Math.round(wx) - 12, Math.round(wy) - 14, H('#7a7e8a'));
  T.brazo(R, Math.round(wx) + 24, 214, Math.round(wx), Math.round(wy), '#3a4256', -1);
};

// ── 5 · fondo local: la foto oficial del gatito acústico ──
const fondo5 = () => fondoFijo(CACHE, 'estudio', () => {
  // el papel de fondo con la luz en el centro y la regla de altura
  const FO = ['#3a4450', '#4a5662', '#5a6874', '#6a7a86', '#7a8c98', '#8c9eaa'].map(H);
  for (let y = 0; y < 150; y++) for (let x = 0; x < 320; x++) { const v = 4.6 - Math.hypot(x - 170, (y - 90) * 1.4) / 52 + (h2(x >> 2, y >> 2) - 0.5) * 0.3; pset(x, y, rampa(FO, v, x, y)); }
  // las paredes del estudio a los lados (yeso verde con zócalo) y el rollo de papel arriba
  const PY = ['#2e3a34', '#38463e', '#425248', '#4c5e52'].map(H);
  for (let y = 0; y < 150; y++) for (const [x0, x1] of [[0, 95], [245, 319]]) for (let x = x0; x <= x1; x++) { let v = 1.8 - y / 220 + (h2(x >> 1, y >> 1) - 0.5) * 0.5 + (x < 96 ? (x - 60) / 120 : (260 - x) / 160); if (y > 118 && y < 122) v -= 1; if (y >= 122) v -= 0.4; pset(x, y, rampa(PY, v, x, y)); }
  rect(0, 118, 95, 119, H('#6a7a6e')); rect(245, 118, 319, 119, H('#6a7a6e'));
  for (let y = 22; y < 150; y++) { pset(96, y, H('#2a2e34')); pset(244, y, H('#2a2e34')); }
  for (let k = 0; k < 7; k++) { const x = 104 + k * 21 + Math.floor(h2(k, 1) * 8); for (let y = 24; y < 148; y++) if (h2(x, y >> 2) > 0.35) pset(x + Math.round(Math.sin(y * 0.05 + k) * 1.5), y, H('#56636e')); }
  for (let y = 136; y < 150; y++) for (let x = 97; x < 244; x++) if ((x + y) % 3 === 0) pset(x, y, H('#9aaab6'));
  rect(90, 16, 250, 22, H('#1a1c20')); rect(90, 17, 250, 18, H('#5a5e66')); rect(90, 19, 250, 19, H('#8a8e96')); for (const x of [92, 246]) { rect(x - 2, 14, x + 2, 24, H('#3a3a40')); rect(x - 1, 15, x + 1, 15, H('#9a9aa2')); }
  for (const x of [100, 238]) { rect(x - 2, 22, x + 2, 27, H('#c8a040')); rect(x - 1, 22, x + 1, 22, H('#f0d070')); }
  // el reloj de pared y el interruptor (pared de la derecha) y el cartel de pruebas de color (izquierda, sin letras)
  disco(296, 66, 8, H('#1a1a1a')); disco(296, 66, 7, H('#e8e4d8')); for (let k = 0; k < 12; k++) pset(Math.round(296 + Math.cos(k * Math.PI / 6) * 5), Math.round(66 + Math.sin(k * Math.PI / 6) * 5), H('#2a2a2a'));
  rect(250, 90, 254, 96, H('#d8d0c0')); pset(252, 92, H('#5a5a5a'));
  rect(56, 22, 88, 50, H('#1a1a1a')); for (let k = 0; k < 8; k++) rect(58 + k * 4, 24, 61 + k * 4, 36, H(['#e8e8e8', '#e8d040', '#40c8d0', '#40c040', '#c840c0', '#d04040', '#4040d0', '#1a1a1a'][k])); for (let k = 0; k < 8; k++) rect(58 + k * 4, 38, 61 + k * 4, 48, H(['#1a1a1a', '#3a3a3a', '#5a5a5a', '#7a7a7a', '#9a9a9a', '#bababa', '#dadada', '#ffffff'][k]));
  for (let y = 40; y <= 140; y += 10) { linea(112, y, 228, y, H('#c8d4dc')); cifras(140 - y, 100, y - 2, H('#e8eef2')); }
  for (let y = 45; y <= 135; y += 10) { linea(112, y, 118, y, H('#a8b4bc')); linea(222, y, 228, y, H('#a8b4bc')); }
  // el suelo de tablas
  const SU = ['#2a1a0e', '#3a2414', '#4c301a', '#5e3c22', '#704a2a'].map(H);
  for (let y = 150; y < 180; y++) for (let x = 0; x < 320; x++) { const xx = x + Math.floor((y - 150) / 6) * 23; let v = 2.6 + (y - 150) / 30 + Math.sin(xx * 0.08) * 0.4 + (h2(xx >> 2, y) - 0.5) * 0.5; if ((y - 150) % 6 === 0 || xx % 47 === 0) v -= 1.3; pset(x, y, rampa(SU, v, x, y)); }
  rect(0, 149, 319, 150, H('#1a1410'));
  // el taburete alto y su cojín de terciopelo
  rect(152, 132, 188, 136, H('#5a3416')); rect(152, 132, 188, 132, H('#9a6a3a'));
  for (const x of [156, 182]) { rect(x, 136, x + 3, 172, H('#4a2c12')); rect(x, 136, x, 172, H('#7a5028')); }
  rect(158, 156, 182, 158, H('#4a2c12'));
  rect(150, 122, 190, 132, H('#5a0e1a')); rect(151, 122, 189, 124, H('#c8304a')); rect(151, 125, 189, 130, H('#9a1a2e')); for (const x of [150, 190]) { pset(x, 133, H('#e8c060')); pset(x, 134, H('#c8a040')); }
  // la pizarrita con el número (1967 y 001)
  rect(150, 138, 190, 152, H('#2a1a0e')); rect(151, 139, 189, 151, H('#1e2420')); cifras(1967, 154, 141, H('#e8e8e0')); cifras('001', 175, 141, H('#e8e8e0')); cifras(24, 162, 147, H('#a8b0a8'));
  rect(168, 136, 168, 138, H('#c8c8c8')); rect(172, 136, 172, 138, H('#c8c8c8'));
  // la cámara de fuelle en su trípode, a la izquierda
  for (const [x0, x1] of [[34, 10], [40, 46], [46, 80]]) linea(40, 124, x1, 176, H(x0 === 40 ? '#3a2414' : '#5a3a1e'));
  rect(0, 70, 30, 124, H('#2a1a0e')); rect(2, 72, 28, 122, H('#6a4424')); rect(2, 72, 28, 74, H('#9a6a3a'));
  for (let k = 0; k < 6; k++) { const x = 30 + k * 6, h = 22 - k * 2; rect(x, 97 - h, x + 5, 97 + h, H('#1a1a1e')); rect(x, 97 - h, x + 5, 97 - h + 1, H('#3a3a40')); }
  rect(66, 82, 78, 112, H('#2a1a0e')); rect(67, 83, 77, 111, H('#5a3a1e'));
  disco(84, 97, 10, K_); disco(84, 97, 9, H('#3a3a44')); disco(84, 97, 6, H('#1a2a4a')); disco(82, 95, 2, H('#8ab0e0')); pset(86, 99, H('#4a6a9a'));
  // el reflector del flash con su bombilla
  rect(48, 52, 50, 70, H('#5a5a5a'));
  for (let y = -16; y <= 0; y++) for (let x = -20; x <= 20; x++) { const q = (x / 20) ** 2 + (y / 16) ** 2; if (q <= 1 && q > 0.15) pset(50 + x, 52 + y, H(q > 0.85 ? '#5a5e66' : x < -6 ? '#e8ecf0' : '#a8b0b8')); }
  disco(50, 46, 4, H('#e8f0f8'));
  // la lámpara de estudio a la derecha y la mesa con los cartuchos de película
  rect(258, 64, 260, 150, H('#2a2a2a')); for (const x of [244, 274]) linea(259, 150, x, 172, H('#2a2a2a'));
  for (let y = -12; y <= 12; y++) for (let x = -14; x <= 0; x++) { if (Math.hypot(x, y * 1.15) <= 14) pset(264 + x, 74 + y, H(x > -4 ? '#3a3a3a' : x > -10 ? '#7a7a7a' : '#c8c8c8')); }
  rect(282, 124, 319, 128, H('#3a2414')); rect(282, 124, 319, 124, H('#8a5e34')); rect(286, 128, 289, 172, H('#2a1a10')); rect(314, 128, 317, 172, H('#2a1a10'));
  for (const [x, c] of [[286, '#e8c040'], [296, '#c83a2a'], [306, '#e8c040']]) { rect(x, 114, x + 7, 123, H('#1a1a1a')); rect(x + 1, 115, x + 6, 122, H(c)); rect(x + 1, 118, x + 6, 119, K_); }
  // el cable de la pera que va de la cámara al suelo
  for (let k = 0; k < 30; k++) { const v = k / 30; pset(Math.round(lerp(20, 40, v)), Math.round(lerp(124, 166, v) + Math.sin(v * 3) * 4), K_); }
});
const p5 = (t) => {
  fondo5();
  // la luz de la lámpara de estudio: un cono tramado de motas sobre el taburete
  for (let k = 0; k < 30; k++) { const u = (t * 0.05 + h2(k, 3)) % 1, x = Math.round(lerp(250, 170, h2(k, 4)) + Math.sin(t + k) * 2), y = Math.round(lerp(76, 140, u)); if (Math.sin(t * 2 + k) > -0.3) pset(x, y, H('#c8d4dc')); }
  // el gato entra por la derecha, salta al cojín y posa
  const anda = tramo(t, P5, P5 + 0.9), salta = tramo(t, P5 + 0.9, P5 + 1.3);
  if (salta <= 0) T.gatoEspia(R, Math.round(lerp(340, 228, anda)), 176, t, { anda: true, dir: -1, s: 3 });
  else if (salta < 1) { const x = lerp(228, 172, salta), y = lerp(176, 122, salta) - Math.sin(salta * Math.PI) * 26; T.gatoEspia(R, Math.round(x), Math.round(y), t, { anda: true, dir: -1, s: 3 }); }
  else T.gatoEspia(R, 172, 123, t, { dir: 1, s: 3, cara: t > ACOUSTIC + 0.2 ? 'travieso' : 'normal' });
  // el maullido que recoge el micrófono del collar
  if (t > KITTY + 0.5) for (let k = 0; k < 3; k++) { const v = ((t - KITTY - 0.5) * 1.3 + k / 3) % 1, r = 4 + v * 14; for (let a = -0.6; a <= 0.6; a += 0.12) pset(Math.round(200 + Math.cos(a) * r), Math.round(100 + Math.sin(a) * r), H(v < 0.5 ? '#fff8c8' : '#c8b878')); }
  // la mano aprieta la pera en «Acoustic Kitty»
  const aprieta = t > ACOUSTIC - 0.1 && t < ACOUSTIC + 0.3;
  disco(46, 168, aprieta ? 4 : 5, H('#1a1a1a')); disco(45, 167, aprieta ? 3 : 4, H('#3a3a3a'));
  T.mano(R, 44, 172 + (aprieta ? 1 : 0), 1, '#3a4256', { sinManga: true });
  // el fogonazo del flash y el destello en la bombilla
  const f = 1 - Math.min(1, Math.abs(t - ACOUSTIC - 0.05) / 0.2);
  fogonazo(50, 46, f);
  if (t > ACOUSTIC + 0.2 && t < KITTY + 1.2) { const u = tramo(t, ACOUSTIC + 0.2, ACOUSTIC + 0.6); for (let k = 0; k < 5; k++) { const a = k * 1.26 + t; pset(Math.round(172 + Math.cos(a) * 30 * u), Math.round(96 + Math.sin(a) * 24 * u), H('#fff8d0')); } }
};

T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], {
  cartela: '1967', año: 1967,
  efectos: [[DEJA + 0.3, 'golpecito'], [SMALL, 'brillo'], [P2 + 0.35, 'interruptor'], [LISTEN, 'bip'], [CONVERS, 'lapiz'], [CAT, 'miau'],
    [MICRO, 'golpecito'], [BATTERY, 'bip'], [ANTENNA, 'brillo'], [P5 + 1.0, 'boing'], [ACOUSTIC, 'flash'], [KITTY + 0.5, 'miau']],
});
''')
