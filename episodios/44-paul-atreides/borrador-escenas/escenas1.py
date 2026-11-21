E = {}

# ── pa-gancho (frases 1–2) ───────────────────────────────────────────────────────────────────────────────────────────
E['pa-gancho'] = ('Gancho', '''// PA-GANCHO (frases 1–2). Año 0 hasta «twelve years later», luego 12. Cinco planos; golpe en «villain» (giro+2.5):
// 1. el desierto al ocaso (general): Paul sube a la cresta de la duna de delante y se para; en «villain» asoma detrás,
//    por el horizonte, un mar de estandartes (siluetas con banderolas verde y negro) y el cielo se enrojece un instante;
//    en «his own story» Paul alza los brazos hacia ellos; en «his author» baja del cielo una pluma de escribir (el autor,
//    como objeto) y Paul la mira sorprendido; en «wrote him» la pluma escribe en la arena un trazo de tinta que va hacia
//    los estandartes; en «that way» Paul señala el trazo; en «on purpose» la pluma pone el punto final y se va, y Paul
//    echa a andar por el camino escrito; Atom (luciérnaga) se asusta con el golpe y luego sigue a la pluma;
// 2. el salón del trono (día): Shaddam en el trono, enfadado; Paul entra por la alfombra; en «father» señala arriba el
//    estandarte; en «defeat» entran dos Fremen por los lados (él trae una banderola y la planta en «emperor»; ella
//    señala al trono); Shaddam se levanta sorprendido y se va, triste, por la tarima hasta perderse tras la columna;
//    Paul sube dos peldaños;
// 3. el balcón sobre la multitud (Paul e Irulan al doble, en primer término del balcón, a propósito: más cerca de la
//    cámara que la balaustrada): Paul entra por la izquierda e Irulan por la derecha y se encuentran («daughter»,
//    sonríen); en «chants your name» la plaza entera alza los brazos, Paul también, Irulan señala a la gente, un
//    sacerdote agita una banderola y suben pétalos; en «twelve years» Paul baja los brazos y deja de sonreír;
// 4. el planeta desde el espacio, doce años después: en «later» se enciende una luz en la cara de noche y se extiende
//    por todo el planeta («holy war»); luego salen del planeta estelas de luz hacia los demás planetas del mapa de
//    estrellas, que se encienden de rojo uno a uno («billions of lives»); Atom luciérnaga se asusta y se aparta, triste;
// 5. de noche, en la repisa de roca (Paul emperador al doble, en el primer término de la repisa): mira el desierto; en
//    «saw it coming» se sorprende, señala y en la arena se abre un árbol de caminos dorados (la visión); en «couldn't
//    stop it» los caminos se vuelven rojos, él baja el brazo, triste, se da la vuelta y se aparta del borde; la loma de
//    arena avanza a lo lejos; Atom luciérnaga, triste, a su lado.''', r'''
const g = (f) => en('giro', f), m = (f) => en('imagina', f);
const P2 = m(0), P3 = m(0.2814), P4 = m(0.5006), P5 = m(0.789);
const GOLPE = g(0) + 2.5, villain = g(0.367);
const AUTOR = g(0.6372), ESCRIBE = g(0.7345), ASI = g(0.823), PUNTO = g(0.9292);
const K = hex('#17151d'), ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const hh = (a, b, k = 0) => { const s = Math.sin(a * 127.1 + b * 311.7 + k * 74.7) * 43758.5453; return s - Math.floor(s); };
const voz = (t) => E.energia ? E.energia(t) : 0;
const banderolaG = (x, y, h, t, k) => {
  const v = Math.round(Math.sin(t * 2.6 + k) * 1.5), c = k % 2 ? hex('#1f4a2c') : hex('#18181e'), cs = k % 2 ? hex('#3a7048') : hex('#3a3a46');
  R.linea(x, y, x, y - h, hex('#4a3420')); R.pset(x, y - h - 1, hex('#e8c040'));
  R.poligono([[x + 1, y - h], [x + 11 + v, y - h + 1], [x + 10 + v, y - h + 9], [x + 1, y - h + 9]], K);
  R.poligono([[x + 1, y - h + 1], [x + 10 + v, y - h + 2], [x + 9 + v, y - h + 8], [x + 1, y - h + 8]], c);
  R.linea(x + 1, y - h + 1, x + 9 + v, y - h + 2, cs); R.linea(x + 1, y - h + 8, x + 9 + v, y - h + 8, hex('#c8a030'));
  const cx = x + 5 + Math.round(v / 2), cy = y - h + 4; R.pset(cx, cy, hex('#f0c848')); R.pset(cx - 1, cy - 1, hex('#f0c848')); R.pset(cx + 1, cy - 1, hex('#f0c848')); R.pset(cx, cy + 1, hex('#c89a30'));
};
// la pluma de escribir del autor (un objeto, no una persona): (x, y) = la punta; cañón hacia arriba a la derecha,
// barbas de luz y de sombra con sus rayas, plumín de metal con su brillo y una gota de tinta
const pluma = (x, y, t) => {
  x = Math.round(x); y = Math.round(y);
  const ux = 0.5, uy = -0.87, nx = 0.87, ny = 0.5, L = 28;
  for (let s = 5; s <= L; s += 0.5) {
    const w = Math.sin(Math.PI * (s - 4) / (L - 3)) * 5 + 0.6, mece = Math.sin(t * 5 + s * 0.3) * 0.4 * (s / L);
    for (let d = -w; d <= w; d += 0.5) {
      const px = Math.round(x + ux * s + nx * (d + mece)), py = Math.round(y + uy * s + ny * (d + mece));
      const borde = Math.abs(d) > w - 0.7, raya = Math.round(s) % 3 === 0 && Math.abs(d) > 1.2;
      R.pset(px, py, borde ? K : raya ? hex('#b0a488') : d < 0 ? hex('#fbf6e8') : hex('#d8ccb0'));
    }
  }
  R.linea(x + 2, y - 3, Math.round(x + ux * (L + 2)), Math.round(y + uy * (L + 2)), hex('#9a8a62'));
  R.linea(x, y, x + 2, y - 4, hex('#3a3a46')); R.linea(x + 1, y, x + 3, y - 4, hex('#6a6a7a')); R.pset(x + 2, y - 3, hex('#c8c8d8'));
  R.pset(x, y + 1, hex('#2a1a14'));
};
// el trazo de tinta que escribe la pluma en la arena (hacia los estandartes)
const TRAZO = (u) => [158 + u * 94, 162 + Math.sin(u * 9) * 3 + u * 2];
// 1 · el desierto al ocaso: Paul en la cresta; en «villain», el mar de estandartes; luego, la pluma del autor
const p1 = (t) => {
  const o = { encuadre: 'desierto', hora: 'ocaso', t0: 0 };
  const geo = T.planeta(R, t, o);
  const hor = geo?.hor ?? 92;
  // el mar de estandartes sube por detrás del horizonte (recortado a él)
  const sube = ease(tramo(t, villain - 0.3, villain + 0.45));
  if (sube > 0) {
    R.recorte([0, 0, 319, hor]);
    for (let y = hor - 10; y <= hor; y++) for (let x = 90 + (y & 1); x < 316; x += 2) if (((x >> 1) + y) % 3 === 0) R.pset(x, y, hex('#c8603a'));
    for (let fila = 0; fila < 2; fila++) for (let k = 0; k < 13; k++) {
      const x = Math.round(104 + k * 16 + fila * 8 + hh(k, fila) * 4), ret = (hh(k, fila, 3) * 0.25 + fila * 0.1);
      const u = cl((sube - ret) / (1 - ret)); if (u <= 0) continue;
      const y = Math.round(hor + 3 - fila * 1 + (1 - u) * 26 - Math.max(0, Math.sin(t * 2 + k) * 0.6));
      R.poligono([[x - 2, y - 7], [x + 2, y - 7], [x + 3, y + 8], [x - 3, y + 8]], K); R.disco(x, y - 9, 2, K); R.pset(x - 1, y - 10, hex('#4a3020')); R.linea(x + 2, y - 6, x + 2, y + 4, hex('#3a2a20'));
      banderolaG(x + 3, y - 4, 22 + (k % 3) * 4 - fila * 5, t, k + fila);
    }
    R.recorte(null);
  }
  // el trazo de tinta, hasta donde ha llegado la pluma (en la arena, delante de los pies de Paul)
  const wu = ease(tramo(t, ESCRIBE - 0.05, PUNTO - 0.15));
  if (wu > 0) {
    for (let u = 0; u <= wu; u += 0.004) { const [x, y] = TRAZO(u).map(Math.round); R.pset(x, y + 1, hex('#6a4a2a')); R.pset(x, y, hex('#2a1a14')); R.pset(x + 1, y, hex('#2a1a14')); }
    for (let u = 0.02; u <= wu; u += 0.11) { const [x, y] = TRAZO(u).map(Math.round); R.pset(x, y, hex('#7a6a8a')); }   // brillo de la tinta fresca
  }
  const [fx, fy] = TRAZO(1).map(Math.round);
  if (t > PUNTO) { R.disco(fx + 6, fy, 2, hex('#2a1a14')); R.pset(fx + 5, fy - 1, hex('#7a6a8a')); }
  // Paul sube a la cresta y se para; alza los brazos en «his own story»; mira la pluma, señala el trazo y lo sigue
  const u = ease(tramo(t, 0.2, villain - 0.1)), sigue = ease(tramo(t, PUNTO + 0.12, PUNTO + 0.62));
  const px = Math.round(lerp(64, 132, u) + sigue * 18);
  const alza = t > g(0.45) && t < AUTOR - 0.05;
  const mira = t > AUTOR && t < ESCRIBE + 0.3;
  R.actor(T.PA.paul, px, 150, t, { dir: 1, anda: (u > 0 && u < 1) || (sigue > 0 && sigue < 1), brazos: alza, dedo: t > ASI - 0.05 && t < PUNTO, sorpresa: (t > villain && t < villain + 0.6) || mira });
  // Atom luciérnaga: se asusta con el golpe y retrocede; luego sigue a la pluma con la mirada
  const sp = tramo(t, villain, villain + 0.7), va = ease(tramo(t, ESCRIBE, PUNTO));
  const ax = lerp(lerp(210, 238, ease(sp)), 226, va) + Math.sin(t * 1.1) * 4, ay = lerp(lerp(118, 108, sp), 128, va) + Math.sin(t * 2.3) * 3;
  T.AT.luciernaga(R, ax, ay, t, { dir: -1, brillo: 0.85, cara: t > AUTOR - 0.1 && t < PUNTO ? 'sorpresa' : t > villain && t < g(0.68) - 0.6 ? 'sorpresa' : t > villain ? 'triste' : 'normal' });
  T.planetaDelante(R, t, o);
  // la pluma: baja del cielo, escribe, pone el punto y se va por arriba
  if (t > AUTOR - 0.05 && t < P2) {
    const [x0, y0] = TRAZO(0), baja = ease(tramo(t, AUTOR - 0.05, ESCRIBE - 0.05)), vete = ease(tramo(t, PUNTO + 0.1, PUNTO + 0.7));
    let x, y;
    if (t < ESCRIBE - 0.05) { x = lerp(206, x0, baja); y = lerp(-6, y0, baja) - Math.sin(baja * Math.PI) * 10; }
    else if (t < PUNTO - 0.15) { [x, y] = TRAZO(wu); y -= Math.abs(Math.sin(t * 13)) * 1.2; }
    else if (t < PUNTO + 0.1) { const d = tramo(t, PUNTO - 0.15, PUNTO); x = lerp(fx, fx + 6, d); y = fy - 3 + (d >= 1 ? 3 : -Math.sin(d * Math.PI) * 4); }
    else { x = lerp(fx + 6, 236, vete); y = lerp(fy, -40, vete); }
    if (y > 120) { const sx = Math.round(x + 4), sy = Math.round(Math.max(y + 3, 158)); for (let i = -6; i <= 6; i++) if ((i + sx) % 2 === 0) R.pset(sx + i, sy + 4, hex('#a8582a')); }
    pluma(x, y, t);
  }
  // el golpe: el cielo se enrojece un instante
  const fl = tramo(t, GOLPE - 0.25, GOLPE) * (1 - tramo(t, GOLPE, GOLPE + 0.9));
  if (fl > 0) T.tinte(R, 0, 179, [190, 40, 30], 0.28 * fl);
};
// 2 · el salón del trono (día): Paul llega por la alfombra; entran los Fremen; Shaddam se levanta y se va
const p2 = (t) => {
  const o = { encuadre: 'trono', luz: 'dia' };
  T.ciudadela(R, t, o);
  const DEFEAT = m(0.1739), EMP = m(0.2241), SE_VA = m(0.2025);
  // Shaddam: enfadado en el trono; en «defeat» se sorprende; se levanta y se va por la tarima hasta perderse tras la
  // columna de la derecha (recortado a ella)
  const sale = ease(tramo(t, SE_VA + 0.05, P3 - 0.25));
  const sx = Math.round(lerp(153, 236, sale));
  R.recorte([0, 0, 226, 179]);
  R.actor(T.PA.shaddam, sx, 122, t, { dir: 1, anda: sale > 0 && sale < 1, sorpresa: t > DEFEAT && t < SE_VA + 0.3, triste: t > SE_VA + 0.3, enfado: t > m(0.10) && t < DEFEAT });
  R.recorte(null);
  // los dos Fremen entran por los lados en «defeat»: él con la banderola, que planta en «emperor»; ella señala al trono
  const fa = ease(tramo(t, DEFEAT - 0.25, EMP - 0.05)), fxa = Math.round(lerp(-32, 22, fa)), planta = t > EMP;
  const ra = R.actor(T.PA.fremen, fxa, 150, t, { dir: 1, anda: fa > 0 && fa < 1, sostiene: planta ? undefined : true });
  if (!planta && ra?.mano) { const [mx, my] = ra.mano.map(Math.round); banderolaG(mx, my + 6, 30, t, 1); }
  if (planta) banderolaG(40, 150, 34, t, 1);
  const fb = ease(tramo(t, DEFEAT - 0.1, EMP + 0.2)), fxb = Math.round(lerp(338, 262, fb));
  R.actor(T.PA.fremenMujer, fxb, 150, t, { dir: -1, anda: fb > 0 && fb < 1, dedo: t > EMP + 0.25 && t < P3 - 0.3, enfado: t > EMP + 0.25 && t < P3 - 0.3 });
  // Paul entra por la alfombra, señala el estandarte en «father» y sube dos peldaños de la tarima
  const u = ease(tramo(t, P2 + 0.1, m(0.115))), px = Math.round(lerp(72, 138, u));
  const sube = tramo(t, SE_VA + 0.55, P3 - 0.12), s1 = ease(cl(sube * 2)), s2 = ease(cl(sube * 2 - 1));
  R.actor(T.PA.paul, Math.round(px + s1 * 3 + s2 * 3), Math.round(150 - s1 * 14 - s2 * 7), t, { dir: 1, anda: (u > 0 && u < 1) || (sube > 0 && sube < 1), dedo: t > m(0.135) && t < m(0.19), sonrisa: t > SE_VA + 0.3 });
  T.AT.luciernaga(R, 104 + Math.sin(t * 0.9) * 4, 100 + Math.sin(t * 2.1) * 3, t, { dir: -1, brillo: 0.8, cara: t > DEFEAT ? 'sorpresa' : 'normal' });
  T.ciudadelaDelante(R, t, o);
};
// 3 · el balcón: la boda y la multitud que corea (Paul e Irulan al doble, en el primer término del balcón)
const PETALOS = [hex('#d84a3a'), hex('#f0c040'), hex('#f4ecd8'), hex('#3a8a4a')];
const p3 = (t) => {
  const CORO = m(0.4047), corea = (tt) => ease(tramo(tt, CORO - 0.1, CORO + 0.4));
  const o = { encuadre: 'balcon', aclaman: corea };
  T.ciudadela(R, t, o);
  const c = corea(t);
  // pétalos que suben de la plaza cuando corean (por detrás de los del balcón; fuera de la zona de Atom y del año)
  if (c > 0) for (let k = 0; k < 70; k++) {
    if (k > 70 * c) break;
    const vel = 10 + hh(k, 2) * 12, y = Math.round(104 - ((t - CORO) * vel + hh(k, 3) * 30) % 80), x = Math.round(36 + hh(k, 1) * 236 + Math.sin(t * 1.7 + k) * 5);
    if (y < 24 || (x > 272 && y < 48)) continue;
    const col = PETALOS[k % 4], gira = Math.sin(t * 6 + k) > 0; R.rect(x, y, x + 2, y + 1, col); R.pset(gira ? x : x + 2, y + 2, K); R.pset(gira ? x + 2 : x, y - 1, hex('#fff8e8'));
  }
  // el sacerdote del culto, al fondo junto a la balaustrada: agita una banderola cuando corean
  const rs = R.actor(T.PA.sacerdotePA, 216, 132, t, { dir: -1, sostiene: c > 0.3 ? true : undefined, sonrisa: c > 0.3, habla: c > 0.3 && Math.sin(t * 7) > 0 });
  if (c > 0.3 && rs?.mano) { const [mx, my] = rs.mano.map(Math.round); banderolaG(mx + Math.round(Math.sin(t * 6) * 2), my + 5, 22, t, 0); }
  // Paul e Irulan, al doble: entran, se encuentran y sonríen; corean con la plaza; en «twelve» Paul se pone serio
  const u = ease(tramo(t, P3 + 0.05, m(0.33))), w = ease(tramo(t, P3 + 0.1, m(0.335)));
  const lp = Math.round(lerp(4, 28, u)), li = Math.round(lerp(92, 56, w)), DOCE = m(0.4783);
  T.AT.escalado(R, () => {
    R.actor(T.PA.paul, lp, 33, t, { dir: 1, anda: u > 0 && u < 1, sonrisa: u >= 1 && t < DOCE, brazos: c > 0.4 && t < DOCE - 0.1, triste: t > DOCE + 0.1 });
    R.actor(T.PA.irulan, li, 33, t, { dir: -1, anda: w > 0 && w < 1, sonrisa: w >= 1, dedo: c > 0.4 && t < DOCE + 0.2 });
  }, 112, 36, 60, 96, 2);
  T.AT.luciernaga(R, 124 + Math.sin(t * 1.2) * 6, 40 + Math.sin(t * 2.5) * 3, t, { dir: -1, brillo: 0.8, cara: t > DOCE + 0.1 ? 'triste' : c > 0.3 ? 'sonrisa' : 'normal' });
  T.ciudadelaDelante(R, t, o);
};
// 4 · el planeta desde el espacio: la guerra santa, solo luces (el planeta del decorado: centro 150,100, radio 58)
const LUCES = Array.from({ length: 90 }, (_, k) => ({ lon: hh(k, 1, 7) * 6.283, lat: (hh(k, 2, 7) - 0.5) * 2.6 }));
const SEM = { lon: 0.35, lat: 0.2 };
for (const L of LUCES) { const d = Math.acos(Math.max(-1, Math.min(1, Math.sin(L.lat) * Math.sin(SEM.lat) + Math.cos(L.lat) * Math.cos(SEM.lat) * Math.cos(L.lon - SEM.lon)))); L.d = d / Math.PI; }
const MUNDOS = [[40, 46, 3, '#8a9ab0'], [66, 140, 4, '#a07850'], [28, 98, 2, '#90a888'], [236, 60, 3, '#b0a070'], [262, 132, 4, '#7a88a8'], [292, 88, 2, '#a89090'], [222, 160, 2, '#9a9a80'], [92, 34, 2, '#88a0a0'], [214, 34, 2, '#a08aa0'], [300, 160, 3, '#90a070'], [16, 150, 3, '#a09080'], [250, 104, 2, '#8a8aa0']];
const p4 = (t) => {
  const giro = 0.03 * (t - P4);
  T.planeta(R, t, { encuadre: 'orbita', t0: P4, giro });
  const cx = 150, cy = 100, rr = 56, prog = tramo(t, m(0.5313), m(0.70)) ** 1.3;
  for (const L of LUCES) {
    const a = L.lon + giro * 1, z = Math.cos(L.lat) * Math.cos(a); if (z < 0.08) continue;
    const on = cl((prog - L.d * 0.95) * 6); if (on <= 0) continue;
    const x = Math.round(cx + rr * Math.cos(L.lat) * Math.sin(a)), y = Math.round(cy - rr * Math.sin(L.lat));
    const tw = Math.sin(t * 9 + L.lon * 20) > 0;
    if (on > 0.5) { for (const [dx, dy] of [[-1, 0], [-1, 1], [2, 0], [2, 1], [0, -1], [1, -1], [0, 2], [1, 2]]) R.pset(x + dx, y + dy, hex('#a83222')); if (tw && on > 0.8) for (const [dx, dy] of [[-2, 0], [3, 1], [1, -2], [0, 3]]) R.pset(x + dx, y + dy, hex('#6a1a16')); }
    R.rect(x, y, x + 1, y + 1, on > 0.6 ? (tw ? hex('#ffe08a') : hex('#ffb050')) : hex('#e05a30'));
    if (on > 0.8 && tw) R.pset(x, y, hex('#fff6d0'));
  }
  // de Arrakis salen estelas de luz hacia los otros planetas, que se encienden uno a uno al llegarles
  const q = tramo(t, m(0.63), m(0.79)) * (MUNDOS.length + 2);
  MUNDOS.forEach(([x, y, r, c], k) => {
    const lleg = cl((q - k) / 1.2), on = cl((q - k - 1.2) * 1.5);   // el planeta se enciende cuando le llega la estela
    if (lleg > 0 && lleg < 1) {
      const an = Math.atan2(y - cy, x - cx), sx = cx + Math.cos(an) * 60, sy = cy + Math.sin(an) * 60;
      const hx = lerp(sx, x, lleg), hy = lerp(sy, y, lleg), n = Math.max(1, Math.round(Math.hypot(hx - sx, hy - sy)));
      for (let i = 0; i <= n; i++) { const v = i / n; if (v < 0.4 && (i & 1)) continue; R.pset(Math.round(lerp(sx, hx, v)), Math.round(lerp(sy, hy, v)), v > 0.85 ? hex('#ffe08a') : v > 0.5 ? hex('#e8603a') : hex('#8a2a20')); }
      R.disco(Math.round(hx), Math.round(hy), 1, hex('#fff0b0'));
    }
    R.disco(x, y, r + 1, K); R.disco(x, y, r, hex(c)); R.pset(x - 1, y - 1, hex('#e8e8f0'));
    if (on > 0) { const pr = r + 2 + Math.round(on * 2) + (Math.floor(t * 4 + k) % 2);
      for (let i = 0; i < 24; i++) { const an = i / 24 * 6.283; R.pset(Math.round(x + Math.cos(an) * pr), Math.round(y + Math.sin(an) * pr), on > 0.5 ? hex('#e84a2a') : hex('#8a2a20')); }
      R.disco(x, y, Math.max(1, r - 1), hex('#e86a30')); R.pset(x, y, hex('#ffd070')); }
  });
  // Atom luciérnaga: mira, se asusta con la guerra santa y se aparta, triste, con los millones de vidas
  const ret = ease(tramo(t, m(0.6365), m(0.70)));
  const ax = lerp(232, 250, ret) + Math.sin(t * 0.8) * 4, ay = lerp(146, 154, ret) + Math.sin(t * 2) * 3;
  T.AT.luciernaga(R, ax, ay, t, { dir: -1, brillo: lerp(0.9, 0.6, ret), cara: t > m(0.7124) ? 'triste' : t > m(0.6365) ? 'sorpresa' : 'normal' });
};
// 5 · la repisa de roca, de noche: la visión de los caminos que no puede parar (Paul emperador al doble)
const RAMAS = (() => { const L = []; const rama = (x, y, an, len, n) => { const x1 = x + Math.cos(an) * len, y1 = y + Math.sin(an) * len * 0.5; L.push([x, y, x1, y1, n]); if (n < 4) { rama(x1, y1, an - 0.45, len * 0.75, n + 1); rama(x1, y1, an + 0.4, len * 0.72, n + 1); } }; rama(160, 120, -0.05, 30, 0); return L; })();
const p5 = (t) => {
  const o = { encuadre: 'desierto', camara: 'roca', hora: 'noche', silueta: 1, t0: P5 };
  T.planeta(R, t, o);
  const ve = tramo(t, m(0.8218), m(0.89)), roj = tramo(t, m(0.9434), m(0.98));
  if (ve > 0) {
    R.recorte([150, 66, 270, 128]);
    for (const [x0, y0, x1, y1, n] of RAMAS) {
      const u = cl(ve * 5 - n); if (u <= 0) continue;
      const xe = Math.round(lerp(x0, x1, u)), ye = Math.round(lerp(y0, y1, u));
      const c = roj > 0.5 ? hex('#8a2a2a') : (Math.floor(t * 6 + n) % 3 ? hex('#ffd060') : hex('#fff0b0'));
      R.linea(Math.round(x0), Math.round(y0), xe, ye, c); R.linea(Math.round(x0), Math.round(y0) + 1, xe, ye + 1, roj > 0.5 ? hex('#4a1a20') : hex('#a87020'));
    }
    R.recorte(null);
  }
  const alza = t > m(0.835) && t < m(0.9434);
  const vuelta = t > m(0.97), aparta = ease(tramo(t, m(0.975), m(0.975) + 0.55));
  T.AT.escalado(R, () => R.actor(T.PA.paulEmperador, Math.round(8 - aparta * 5), 31, t, { dir: vuelta ? -1 : 1, anda: aparta > 0 && aparta < 1, dedo: alza, triste: t > m(0.9434), sorpresa: t > m(0.8218) && t < m(0.845) }), 30, 34, 66, 69, 2);
  T.AT.luciernaga(R, 44 + Math.sin(t * 1.1) * 4, 90 + Math.sin(t * 2.2) * 3, t, { dir: 1, brillo: 0.7, cara: t > m(0.9434) ? 'triste' : t > m(0.8218) ? 'sorpresa' : 'normal' });
  T.planetaDelante(R, t, o);
};
const efectos = [[0.3, 'viento', { dur: 2.2 }], [GOLPE, 'boom'], [AUTOR, 'whoosh'], [ESCRIBE, 'lapiz'], [PUNTO, 'toc'], [m(0.2241), 'golpecito'], [m(0.41), 'publico', { dur: 2.2 }], [m(0.5313), 'brillo'], [m(0.6365), 'trueno'], [m(0.825), 'brillo'], [m(0.95), 'viento', { dur: 1.6 }]];
const año = (t) => (t < P4 ? 0 : 12);
T.rodar(E, R, [[0, p1], [P2, p2], [P3, p3], [P4, p4], [P5, p5]], { efectos, año });
''')

# ── pa-aviso (frases 3–4) ────────────────────────────────────────────────────────────────────────────────────────────
E['pa-aviso'] = ('Aviso', '''// PA-AVISO (frases 3–4). Año 0 (el joven Paul), 12 (el emperador), y el estudio sin año. Seis planos:
// 1. el desierto de día con la cámara a ras del suelo (el decorado del día volteado y bajado 26 px: cielo grande y
//    vivo con nubes de polvo de tres tonos a tres velocidades y un halcón que planea, la luna enorme saliendo por el
//    horizonte a la IZQUIERDA y el sol a la derecha, al revés que en pa-gancho p1): el joven Paul entra por la derecha
//    y camina por el llano hacia la luna, Atom (chibi) lo sigue; en «Paul Atreides» Atom se para y lo señala; en «you
//    know him» Paul se vuelve y Atom saluda; los dos en el tercio derecho; la loma cruza el llano y la arena vuela por
//    delante de los pies;
// 2. el laberinto de luz visto desde arriba: sobre la arena de noche, dunas en media luna en tres tonos (cara al
//    viento a la luna, cresta clara, cara de sotavento en sombra) con rizaduras, peñas con su sombra larga, arena que
//    vuela de las crestas, un ratón del desierto que salta abajo a la derecha y las huellas de Paul desde el borde;
//    Paul llega al centro («comes to the desert») y, en «prophet», alza los brazos y los caminos se encienden uno a uno;
// 3. los aposentos, de noche: Paul emperador va del diván a la ventana y mira la ciudad («his story»); Irulan se asoma
//    por la puerta; en «warning» él se vuelve, triste;
// 4. el globo del escritorio de Atom: el cartel del ojo tapado está plantado en la mesa con su palo; en «a warning»
//    Atom (al doble) lo coge por el palo y lo alza junto al globo (el cartel va con su mano); en «Dune Messiah» el
//    globo de la Tierra se vuelve de arena;
// 5. el estudio entero: Atom va a la pizarra; en «Part 3» sale un «3» de tiza y en «December 18th» la hoja de
//    calendario con el «18», que rodea con un círculo;
// 6. la mesa de cerca: Atom camina («walk into the theater»), se tapa los ojos con el cartel en «knowing nothing», lo
//    deja sobre el libro en «save this video» y guiña en «later».''', r'''
const p = (f) => en('paul', f), a = (f) => en('aviso', f);
const Q2 = p(0.4097), Q3 = p(0.7018), Q4 = a(0), Q5 = a(0.3239), Q6 = a(0.6665);
const K = hex('#17151d'), ease = (u) => u * u * (3 - 2 * u), cl = (u) => Math.max(0, Math.min(1, u));
const voz = (t) => E.energia ? E.energia(t) : 0;
const TIZA = hex('#eef0e4');
// el cartel del ojo tapado (sin letras): tarjeta blanca con borde, un ojo con pestañas y una venda oscura encima
const cartel = (x0, y0, w, hh) => {
  R.rect(x0, y0, x0 + w, y0 + hh, K); R.rect(x0 + 1, y0 + 1, x0 + w - 1, y0 + hh - 1, hex('#fbf6e8')); R.rect(x0 + 1, y0 + hh - 2, x0 + w - 1, y0 + hh - 1, hex('#e0d6bc'));
  const cx = x0 + Math.round(w / 2), cy = y0 + Math.round(hh / 2) + 1, rx = Math.round(w * 0.34), ry = Math.max(2, Math.round(hh * 0.24));
  for (let y = -ry; y <= ry; y++) for (let x = -rx; x <= rx; x++) { const e = (x / rx) ** 2 + (y / ry) ** 2; if (e <= 1) R.pset(cx + x, cy + y, e > 0.62 ? K : hex('#ffffff')); }
  R.disco(cx, cy, Math.max(1, ry - 1), hex('#3a7ad8')); R.pset(cx, cy, K);
  for (let k = -2; k <= 2; k++) R.linea(cx + k * Math.round(rx / 2.5), cy - ry - 1, cx + k * Math.round(rx / 2.2), cy - ry - 3, K);
  const bh = Math.max(2, Math.round(hh * 0.18)); R.rect(x0 + 2, cy - Math.floor(bh / 2), x0 + w - 2, cy + Math.ceil(bh / 2) - 1, hex('#2a2a36'));
  R.rect(x0 + 2, cy - Math.floor(bh / 2), x0 + w - 2, cy - Math.floor(bh / 2), hex('#4a4a5a'));
  R.linea(x0 + w - 3, cy + 1, x0 + w - 1, cy + 4, hex('#2a2a36')); R.linea(x0 + w - 4, cy + 1, x0 + w - 5, cy + 4, hex('#2a2a36'));
};
// el libro (nuestro, sin letras): tapas color arena con un halcón dorado de punto y un ojo azul
const libro = (x, y, w, h) => {
  R.rect(x, y, x + w, y + h, K); R.rect(x + 1, y + 1, x + w - 1, y + h - 2, hex('#c8a060')); R.rect(x + 1, y + h - 2, x + w - 1, y + h - 1, hex('#efe6d0'));
  R.rect(x + 1, y + 1, x + 2, y + h - 2, hex('#8a6430')); R.rect(x + 3, y + 1, x + w - 1, y + 2, hex('#dcb878'));
  const cx = x + Math.round(w / 2) + 1, cy = y + Math.round(h / 2) - 1;
  R.disco(cx, cy, Math.round(h / 4), hex('#8a5a26')); R.disco(cx, cy, Math.max(1, Math.round(h / 4) - 1), hex('#3a6ad8')); R.pset(cx, cy, hex('#a8d8ff'));
  R.linea(x + 4, y + h - 5, x + w - 3, y + h - 5, hex('#a8803e'));
  R.rect(x + 1, y + 1, x + 4, y + h - 2, hex('#7a4a1c')); R.linea(x + 2, y + 3, x + 2, y + h - 4, hex('#c89a50')); R.pset(x + 3, y + 5, hex('#e8c040')); R.pset(x + 3, y + h - 6, hex('#e8c040'));
  for (let i = 0; i < 2; i++) R.linea(x + 5, y + h - 1 + 0, x + w - 1, y + h - 1, hex('#d8ccb0'));
  R.rect(x + 3, y + h, x + w + 1, y + h + 1, hex('#3a2414'));
};
// mezcla dos colores (0xAABBGGRR): a = 0 deja c, a = 1 da d
const mezC = (c, d, a) => {
  const r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255;
  return (0xff000000 | (Math.round(b + (((d >> 16) & 255) - b) * a) << 16) | (Math.round(g + (((d >> 8) & 255) - g) * a) << 8) | Math.round(r + ((d & 255) - r) * a)) >>> 0;
};
const tibio = (c) => (c & 255) > ((c >> 16) & 255) + 8;   // el oro de los caminos y su halo
// 1 · el desierto de día con la cámara a ras del suelo: el decorado del día VOLTEADO (la luna enorme sale por la
// izquierda y el sol queda a la derecha) y BAJADO 26 px (el horizonte en y 130: un cielo grande); las 26 filas que
// faltan arriba salen de estirar las 26 primeras del cielo tramado (y 0–51 ← 0–25). Un recorrido de pantalla.
const VOLT = new Uint32Array(320 * 180);
const voltea = () => {
  const B = R.buf; VOLT.set(B);
  for (let y = 0; y < 180; y++) { const sy = y < 52 ? y >> 1 : y - 26, d = y * 320, so = sy * 320 + 319; for (let x = 0; x < 320; x++) B[d + x] = VOLT[so - x]; }
};
// nubes de polvo alto en tres tonos (sombra abajo, luz arriba a la derecha, que es donde queda el sol), borde tramado
const NUBP = [hex('#b48288'), hex('#dcb0a4'), hex('#f2d4bc'), hex('#fff6e4')];
const nubePolvo = (cx, cy, w) => {
  const hh = Math.max(3, Math.round(w * 0.15));
  for (let y = -hh; y <= hh; y++) for (let x = -Math.round(w / 2); x <= Math.round(w / 2); x++) {
    const X = Math.round(cx + x), Y = cy + y; if (X < 0 || X > 319 || Y < 24 || (X >= 270 && Y < 50)) continue;
    const e = (x / (w / 2)) ** 2 + (y / hh) ** 2 * (y < 0 ? 1 + Math.sin(x * 0.3 + cy) * 0.35 : 1.6); if (e > 1) continue;
    if (e > 0.72 && ((X + Y) & 1)) continue;
    R.pset(X, Y, NUBP[y > hh * 0.35 ? 0 : y > 0 ? 1 : (y < -hh * 0.35 && x > -w * 0.05) ? 3 : 2]);
  }
};
const q1 = (t) => {
  const o = { encuadre: 'desierto', hora: 'dia', silueta: 1, t0: 0 };
  T.planeta(R, t, o); T.planetaDelante(R, t, o);
  voltea();
  // el cielo vivo: nubes de polvo en tres alturas a tres velocidades (las altas, lentas y grandes) (el viento va a la izquierda, como la arena) y el halcón
  for (const [x0, y, w, v] of [[40, 34, 70, 0.7], [250, 40, 46, 0.7], [140, 60, 58, 1.4], [330, 66, 40, 1.4], [70, 86, 34, 2.4], [230, 98, 26, 2.4]]) nubePolvo(((x0 - t * v) % 420 + 420) % 420 - 50, y, w);
  T.halcon(R, t, 176, 46, 26);
  // el joven Paul entra por la derecha y camina hacia la luna; Atom lo sigue por detrás (los dos, en el tercio derecho)
  const u = tramo(t, 0, p(0.35)), px = Math.round(lerp(292, 214, ease(u)));
  const vuelve = t > p(0.3589);
  R.actor(T.PA.paul, px, 171, t, { dir: vuelve ? 1 : -1, anda: u > 0 && u < 1, sonrisa: vuelve });
  const para = t > p(0.0654) && t < p(0.19);
  const ua = tramo(t, 0, p(0.0654)), ub = tramo(t, p(0.19), p(0.34));
  const ax = Math.round(lerp(338, 306, ease(ua)) - lerp(0, 52, ease(ub)));
  T.AT.atom(R, ax, 174, t, { dir: -1, pose: (ua > 0 && ua < 1) || (ub > 0 && ub < 1) ? 'camina' : para ? 'senala' : vuelve ? 'saluda' : 'quieto', cara: vuelve ? 'sonrisa' : para ? 'sorpresa' : 'normal', habla: voz(t) });
  // la arena que el viento arrastra a ras del suelo, por delante de los pies (hacia la izquierda)
  for (let k = 0; k < 11; k++) {
    const v = 46 + ((k * 37) % 23) * 2, x = 330 - ((k * 71 + t * v) % 390), y = 166 + ((k * 13) % 13), L = 3 + (k % 5);
    for (let i = 0; i <= L; i++) { const X = Math.round(x + i); R.pset(X, y, mezC(R.pget(X, y), hex('#fff2d8'), 0.75 - i / L * 0.5)); }
  }
};
// 2 · el laberinto de luz desde arriba: el profeta. Sobre la arena del decorado se SUMA un relieve fijo (dunas en
// media luna: la cara al viento mira a la luna y se aclara hacia la cresta, la cresta brilla y la cara de sotavento
// cae en sombra; donde las dunas se allanan, rizaduras), en tres tonos con trama de Bayer; no toca el oro de los
// caminos (el árbol sigue siendo lo que más brilla). Un recorrido de pantalla; el campo se calcula una vez.
let RELIEVE = null;
const relieve = () => {
  if (RELIEVE) return RELIEVE;
  const F = new Int16Array(320 * 180), cres = [], BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  for (let y = 0; y < 180; y++) for (let x = 0; x < 320; x++) {
    const s = x * 0.6 + y * 0.8 + Math.sin(x * 0.045 - y * 0.03) * 12 + Math.sin(y * 0.07 + 1) * 5, ph = ((s / 44) % 1 + 1) % 1;
    const A = Math.min(1, Math.max(0, Math.sin(x * 0.021 - y * 0.017 + Math.sin(s * 0.02)) * 0.6 + 0.6));
    let v = ph < 0.7 ? -0.2 + ph / 0.7 * 0.9 : ph < 0.735 ? 1.3 : -1 + (ph - 0.735) / 0.265 * 0.6;
    v = v * A + Math.sin(x * 0.55 + y * 0.22 + Math.sin(y * 0.09 + x * 0.02) * 2.4) * (0.16 + 0.16 * (1 - A));
    let d = Math.max(-3, Math.min(4, Math.round(v * 3 + BAY[(y & 3) * 4 + (x & 3)] / 16 - 0.5))) * 9;
    if (x >= 268 && y < 50) d = Math.round(d * 0.5);   // la zona de Atom, tranquila
    F[y * 320 + x] = d;
    if (ph >= 0.7 && ph < 0.735 && A > 0.75 && (x * 7 + y * 13) % 29 === 0 && y > 24 && !(x >= 262 && y < 54)) cres.push([x, y]);
  }
  return (RELIEVE = { F, cres });
};
const cl8 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v | 0);
const aplicaRelieve = () => {
  const { F } = relieve(), B = R.buf;
  for (let i = 0; i < 57600; i++) {
    const c = B[i], r = c & 255, g = (c >> 8) & 255, b = (c >> 16) & 255, d = F[i];
    if (!d || r > b + 8) continue;
    const k = r > b - 6 ? 0.4 : 1;
    B[i] = (0xff000000 | (cl8(b + d * k) << 16) | (cl8(g + d * 0.9 * k) << 8) | cl8(r + d * 0.8 * k)) >>> 0;
  }
};
// una peña vista desde arriba: su sombra larga hacia abajo a la derecha (la luna está arriba a la izquierda) y la
// roca en cuatro tonos con su contorno
const PEN = [hex('#14121c'), hex('#2a2838'), hex('#424056'), hex('#64607c'), hex('#928eaa')];
const pena = (cx, cy, r) => {
  for (let y = cy - r; y <= cy + r * 2; y++) for (let x = cx - r; x <= cx + r * 3; x++) {
    const e = ((x - cx - r * 1.3) / (r * 1.9)) ** 2 + ((y - cy - r * 0.7) / (r * 0.85)) ** 2; if (e < 1 && !tibio(R.pget(x, y))) R.pset(x, y, mezC(R.pget(x, y), hex('#05050a'), e > 0.8 ? 0.35 : 0.6));
  }
  for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) {
    const dx = x - cx, dy = y - cy, e = (dx / r) ** 2 + (dy / (r * 0.8)) ** 2 + Math.sin(Math.atan2(dy, dx) * 4 + cx) * 0.12; if (e > 1) continue;
    const l = -(dx + dy) / r * 1.3 + (1 - e) * 0.8 + (((x * 7 + y * 11) % 5) === 0 ? -0.7 : 0);
    R.pset(x, y, e > 0.8 ? PEN[0] : PEN[Math.max(1, Math.min(4, Math.round(2 + l)))]);
  }
};
// las huellas de Paul: del borde de abajo a la izquierda hasta donde está (un hoyito oscuro con su labio a la luna)
const huellas = (hasta) => {
  const pts = []; for (let k = 0; k <= 30; k++) { const u = k / 30; pts.push([lerp(-6, 96, u), lerp(182, 168, u) + Math.sin(u * 3.1) * -5]); }
  for (let x = 98; x <= hasta; x += 2) pts.push([x, 168]);
  let acum = 0;
  for (let k = 1; k < pts.length; k++) {
    const [x0, y0] = pts[k - 1], [x1, y1] = pts[k], l = Math.hypot(x1 - x0, y1 - y0); acum += l;
    if (acum < 4.5) continue; acum = 0;
    const lado = (k >> 1) % 2 ? 1 : -1, nx = -(y1 - y0) / l, ny = (x1 - x0) / l, X = Math.round(x1 + nx * lado * 1.5), Y = Math.round(y1 + ny * lado * 1.5);
    if (tibio(R.pget(X, Y))) continue;
    for (const [dx, dy, c, al] of [[0, 0, '#04040a', 0.8], [1, 0, '#04040a', 0.7], [0, 1, '#04040a', 0.55], [1, 1, '#04040a', 0.4], [0, -1, '#9aa0c8', 0.5], [1, -1, '#9aa0c8', 0.35]]) R.pset(X + dx, Y + dy, mezC(R.pget(X + dx, Y + dy), hex(c), al));
  }
};
// el ratón del desierto (muad'dib): salta de derecha a izquierda por abajo, con su sombra
const raton = (x, y, t) => {
  const f = (t * 2.2) % 1, alto = Math.round(Math.sin(f * Math.PI) * 5), X = Math.round(x), Y = Math.round(y) - alto;
  for (let i = -2; i <= 3; i++) R.pset(X + i, Math.round(y) + 2, mezC(R.pget(X + i, Math.round(y) + 2), hex('#05050a'), 0.55));
  R.rect(X - 1, Y - 2, X + 2, Y, hex('#2a2018')); R.rect(X, Y - 2, X + 2, Y - 1, hex('#a88660')); R.pset(X + 1, Y - 2, hex('#d8bc90'));
  R.pset(X - 2, Y - 2, hex('#2a2018')); R.pset(X - 2, Y - 3, hex('#c8a878')); R.pset(X - 3, Y - 2, hex('#1a1010'));   // la cabeza, la oreja y el hocico
  R.linea(X + 3, Y - 1, X + 6, Y - 3 + (f < 0.5 ? 0 : 1), hex('#8a6a48')); R.pset(X + 7, Y - 3, hex('#e8d8b0'));   // la cola larga con su borla
  if (alto < 2) { R.pset(X - 1, Y + 1, hex('#2a2018')); R.pset(X + 2, Y + 1, hex('#2a2018')); }
};
const q2 = (t) => {
  const enc = ease(tramo(t, p(0.53), p(0.66)));
  const o = { encuadre: 'laberinto', camara: 'alto', apagados: 0.85 * (1 - enc) };
  T.sietch(R, t, o);
  aplicaRelieve();
  for (const [cx, cy, r] of [[30, 150, 8], [62, 172, 4], [292, 146, 7], [308, 122, 5]]) pena(cx, cy, r);
  // la arena que el viento levanta de las crestas (hacia abajo a la derecha), tenue
  const { cres } = relieve();
  for (let k = 0; k < cres.length; k += 3) {
    const [cx, cy] = cres[k], f = (t * 0.55 + k * 0.37) % 1;
    for (let i = 0; i < 5; i++) { const X = Math.round(cx + f * 16 + i * 1.6), Y = Math.round(cy + f * 8 + i * 0.6 + Math.sin(f * 6 + i)); const c = R.pget(X, Y); if (!tibio(c)) R.pset(X, Y, mezC(c, hex('#a4acd4'), (1 - f) * 0.55 * (1 - i / 5))); }
  }
  const u = ease(tramo(t, Q2 + 0.05, p(0.53))), px = Math.round(lerp(96, 160, u));
  huellas(px - 6);
  raton(lerp(334, 232, tramo(t, Q2 + 0.3, Q3)), 172, t);
  const pro = t > p(0.5768);
  R.actor(T.PA.paul, px, 166, t, { dir: 1, anda: u > 0 && u < 1, brazos: pro && t < p(0.68), sorpresa: pro && t < p(0.62) });
  const an = t * 1.3, va = ease(tramo(t, p(0.53), p(0.6)));
  T.AT.luciernaga(R, lerp(160 + Math.cos(an) * 42, 52 + Math.sin(t) * 3, va), lerp(112 + Math.sin(an) * 16, 150 + Math.sin(t * 2) * 2, va), t, { dir: Math.cos(an + 1.57) > 0 ? 1 : -1, brillo: 0.9, cara: pro ? 'sorpresa' : 'normal' });
  T.sietchDelante(R, t, o);
};
// 3 · los aposentos de noche: el emperador a solas
const q3 = (t) => {
  const o = { encuadre: 'aposentos' };
  T.ciudadela(R, t, o);
  const asoma = ease(tramo(t, p(0.80), p(0.84))) * (1 - ease(tramo(t, p(0.965), p(0.995))));
  R.actor(T.PA.irulan, Math.round(lerp(262, 256, asoma)), 150, t, { dir: -1, sorpresa: t > p(0.9575) && t < p(0.99) });
  const u = ease(tramo(t, Q3 + 0.1, p(0.86))), px = Math.round(lerp(76, 148, u));
  const vuelta = t > p(0.9575);
  R.actor(T.PA.paulEmperador, px, 150, t, { dir: vuelta ? -1 : 1, anda: u > 0 && u < 1, triste: vuelta, habla: 0 });
  T.AT.luciernaga(R, 177 + Math.sin(t * 1.2) * 3, 112 + Math.sin(t * 2.4) * 3, t, { dir: -1, brillo: 0.75, cara: vuelta ? 'triste' : 'normal' });
  T.ciudadelaDelante(R, t, o);
};
// 4 · el globo del escritorio: el cartel en «a warning»; la Tierra se vuelve de arena. El cartel está plantado en
// la mesa con su palo (x 205–237); en «a warning» Atom lo coge por el palo y lo alza a su lado, por debajo de la
// lámina y lejos de su cara (borde derecho ≤ 237): el palo acaba en su guante y el cartel sube y baja con él.
const palo = (x0, y0, x1, y1) => {
  R.linea(x0 - 1, y0, x1 - 1, y1, K); R.linea(x0 + 1, y0, x1 + 1, y1, K); R.linea(x0, y0 + 1, x1, y1 + 1, K);
  R.linea(x0, y0, x1, y1, hex('#b08050')); R.linea(x0, y0, Math.round((x0 + x1) / 2), Math.round((y0 + y1) / 2), hex('#dcae74'));
};
const q4 = (t) => {
  const are = ease(tramo(t, a(0.2111), a(0.2562) + 0.4));
  const o = { encuadre: 'orbita', camara: 'globo', arena: are, t0: Q4 };
  const geo = T.planeta(R, t, o);
  const alza = ease(tramo(t, a(0.075), a(0.095)));
  const mira = t > a(0.2111);
  // la mano de «sostiene» al doble, de cara a la izquierda (la misma cuenta que atom-personaje.js: 236, 120 − 2·bote)
  const bote = Math.sin(t * 2.4) > 0.6 ? 1 : 0, mx = 236, my = 120 - 2 * bote;
  const x0 = Math.round(lerp(205, mx - 31, alza)), y0 = Math.round(lerp(99, my - 34, alza) - Math.sin(alza * Math.PI) * 3);
  const bx = x0 + 16, by = y0 + 23;
  // la sombra del cartel en la mesa (se aleja y se aclara al alzarlo)
  for (let x = -12; x <= 12; x++) { const X = bx + x + Math.round(alza * 6), Y = 133 + Math.round(alza * 2); if (Math.abs(x) < 12 - alza * 6) R.pset(X, Y, mezC(R.pget(X, Y), hex('#2a1608'), 0.4 * (1 - alza * 0.6))); }
  if (alza > 0) palo(bx, by, mx, my); else palo(bx, by, bx, 132);
  cartel(x0, y0, 32, 23);
  T.AT.atom(R, 252, 132, t, { s: 2, dir: -1, pose: alza > 0 ? 'sostiene' : 'quieto', cara: mira ? 'sorpresa' : 'normal', habla: voz(t) });
  T.planetaDelante(R, t, o);
};
// 5 · el estudio entero: el «3» y la hoja del calendario con el «18» en la pizarra
const q5 = (t) => {
  const tres = a(0.4198), dic = a(0.5727), ocho = a(0.589);
  const pizarra = (R, t, [x0, y0, x1, y1]) => {
    const u3 = tramo(t, tres - 0.1, tres + 0.3);
    if (u3 > 0) R.numero('3', x0 + 20, y0 + 30, { tam: 16, color: TIZA, contorno: false, sombra: false, n: Math.ceil(u3 * 16) });
    const uc = tramo(t, dic - 0.2, dic + 0.3);
    if (uc > 0) { const cx0 = x0 + Math.round((x1 - x0) * 0.48), cy0 = y0 + 6, w = 34, h = Math.round(34 * ease(uc));
      for (let y = cy0; y <= cy0 + h; y++) { R.linea(cx0, y, cx0 + w, y, y < cy0 + 8 ? hex('#c84a3a') : hex('#f4efe2')); }
      R.linea(cx0, cy0, cx0 + w, cy0, K); R.linea(cx0, cy0 + h, cx0 + w, cy0 + h, K); R.linea(cx0, cy0, cx0, cy0 + h, K); R.linea(cx0 + w, cy0, cx0 + w, cy0 + h, K);
      for (const dx of [8, 26]) { R.linea(cx0 + dx, cy0 - 2, cx0 + dx, cy0 + 2, hex('#8a8a90')); }
      if (uc >= 1) R.numero('18', cx0 + 17, cy0 + 29, { tam: 16, centro: true, color: K, contorno: false, sombra: false, n: t > ocho ? Infinity : 8 });
      const ur = tramo(t, ocho + 0.2, ocho + 0.9);
      if (ur > 0) for (let i = 0; i <= 48 * ur; i++) { const an = -1.6 + i / 48 * 6.4; R.pset(Math.round(cx0 + 17 + Math.cos(an) * 22), Math.round(cy0 + 20 + Math.sin(an) * 17), TIZA); R.pset(Math.round(cx0 + 17 + Math.cos(an) * 23), Math.round(cy0 + 20 + Math.sin(an) * 18), TIZA); }
    }
  };
  const o = { pizarra };
  const ge = T.estudio(R, t, o);
  const u = ease(tramo(t, Q5 + 0.1, tres - 0.3));
  const x = Math.round(lerp(74, 118, u));
  const senala = (t > tres - 0.2 && t < tres + 0.8) || t > dic - 0.2;
  T.AT.atom(R, x, 166, t, { s: 2, dir: 1, pose: u > 0 && u < 1 ? 'camina' : senala ? 'senala' : 'quieto', cara: t > ocho ? 'sonrisa' : 'normal', habla: voz(t) });
  T.estudioDelante(R, t, o);
};
// 6 · la mesa de cerca: Atom se tapa los ojos con el cartel y lo deja sobre el libro
const q6 = (t) => {
  const o = { camara: 'mesa', sin: ['lupa'] };
  const ge = T.estudio(R, t, o);
  libro(172, 134, 48, 18);
  const anda = tramo(t, a(0.7067), a(0.7624)), x = Math.round(lerp(120, 146, ease(anda)));
  const tapa = t > a(0.7842);
  const d = ease(tramo(t, a(0.8758), a(0.8758) + 0.4)), deja = d >= 1;
  const r = T.AT.atom(R, x, 156, t, { s: 2, dir: 1, pose: anda > 0 && anda < 1 ? 'camina' : !deja ? 'sostiene' : t > a(0.94) ? 'senala' : 'quieto', cara: t > a(0.9632) ? 'guino' : deja ? 'sonrisa' : 'normal', habla: voz(t) });
  if (!deja && r?.mano) { const [mx, my] = r.mano.map(Math.round); const sube = tapa ? ease(tramo(t, a(0.7842), a(0.7842) + 0.25)) : 0;
    const [fx, fy] = (r.centro ?? [mx - 10, my - 16]).map(Math.round);
    let cy0 = lerp(my - 14, fy - 10, sube), cx0 = lerp(mx - 8, fx - 14, sube);
    cx0 = lerp(cx0, 181, d); cy0 = lerp(cy0, 115, d);
    if (!tapa) R.rect(mx, my - 2, mx + 1, my, hex('#7a5230'));
    cartel(Math.round(cx0), Math.round(cy0), 30, 21); }
  if (deja) cartel(181, 115, 30, 21);
};
const efectos = [[0.3, 'viento', { dur: 2.6 }], [p(0.5768), 'brillo'], [a(0.092), 'aviso'], [a(0.2111), 'vapor'], [a(0.4198), 'lapiz'], [a(0.5727), 'papel'], [a(0.589) + 0.2, 'lapiz'], [a(0.7842), 'papel'], [a(0.8758), 'toc']];
const año = (t) => (t < Q3 ? 0 : t < Q4 ? 12 : null);
T.rodar(E, R, [[0, q1], [Q2, q2], [Q3, q3], [Q4, q4], [Q5, q5], [Q6, q6]], { efectos, año });
''')
